import { _decorator, Component, director, EventTouch, instantiate, Node, PageView, Prefab, SpriteFrame, Sprite, tween, Vec3, Button, randomRangeInt, Label, Tween, sp, view } from 'cc';
import { COIN_TYPE, Constant, GAME_MODE, ProfileData } from '../Constant';
import { LevelNodeScript } from './LevelNodeScript';
import { AnimationManager } from '../utils/AnimationManger';
import { SoundManager } from '../SoundManager';
import { PlayzhubEventHandler } from '../playzhub/PlayzhubEventHandler';
import { GameManager } from '../GameManager';
import { Server } from '../playzhub/Server';
import { PlayerProfile } from '../multiplayer/PlayerProfile';
import { AssetLoader } from '../utils/AssetLoader';
import { Responsive } from '../utils/Responsive';
import { HTML_Bridge } from '../../@types/HTML-Bridge';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

enum PageState {
    START,
    VERSUS_MODE,
    CHALLENEGER_MODE,
    LOADING
};

@ccclass('MenuScript')
export class MenuScript extends Component {
    @property(Node) background: Node = null!;
    @property([SpriteFrame]) levelBaseImage: SpriteFrame[] = [];

    @property(Node) gameLogo: Node = null!;
    @property(Node) playerScore: Node = null!;

    @property(Node) challengerMode: Node = null!;
    challengerModePageView: PageView | null = null;

    @property(Node) versusMode: Node = null!;
    isMatching: boolean = false;

    @property(Node) progressBaseNode: Node = null!;
    progressBarSprite: Sprite | null = null;

    @property(Node) menuButtons: Node = null!;
    challengerButton: Node | null = null;
    versusButton: Node | null = null;

    @property(Node) soundButtonNode: Node = null!;

    playerProfile: Node | null = null;
    botProfile: Node | null = null;

    @property([SpriteFrame]) profilePictures: SpriteFrame[] = []

    private pageState: PageState = PageState.START;
    standbyTweenMap: Map<Node, Tween<Node>> = new Map();
    private initialized = false;

    initializeAnalytics(): void {
        if (this.initialized) return;

        const GAME_KEY = '8bf32fe6fbb3492dad674fa7c37638eb';
        const SECRET_KEY = '155958ca0585bef2eb496e99b1ba4cfb66c607ba';

        GA.GameAnalytics.setEnabledManualSessionHandling(false); // Let GA manage sessions
        GA.GameAnalytics.setEnabledEventSubmission(true);        // Ensure events send
        GA.GameAnalytics.configureUserId(GAME_KEY);
        GA.GameAnalytics.configureBuild('1.0.0'); // optional
        GA.GameAnalytics.setEnabledInfoLog(true); // enable debug logs
        // Initialize the SDK
        GA.GameAnalytics.initialize(GAME_KEY, SECRET_KEY);
        this.initialized = true;
        console.log('[GA] Initialized', GA);
    }
    protected async onLoad(): Promise<void> {
        this.initializeAnalytics();
        GA.GameAnalytics.addDesignEvent('game:boot');

        Responsive.Resize();
        screen.orientation.addEventListener('change', () => {
            Responsive.Resize();
        })

        this.progressBarSprite = this.progressBaseNode.children[0].getComponent(Sprite);
        this.challengerModePageView = this.challengerMode.getComponent(PageView);
        this.challengerButton = this.menuButtons.getChildByName("ChallengerModeBtn");
        this.versusButton = this.menuButtons.getChildByName("VersusModeBtn");

        this.progressBaseNode.active = false;
        Constant.gameEvents.on("load_single_player", this.LoadSinglePlayerScene, this);

        await HTML_Bridge.initExternalScript('https://games.playzhub.com/sdk/PlayzhubSDk_E6_IIFE.js', async () => {
            // await HTML_Bridge.initExternalScript('https://stg-games.playzhub.com/sdk/PlayzhubSDk_E6_IIFE.js', async () => {
            await this.GetLevelsDetailsFromPlatform();
            await this.CreateLevelTable();
        });
    };

    //#region Start
    protected async start(): Promise<void> {
        GA.GameAnalytics.addDesignEvent("screen:title");
        const persistSoundManager: Node = director.getScene().getChildByName("SoundManager");
        director.addPersistRootNode(persistSoundManager);
        this.setPageState(PageState.START);
        this.SetSoundSprite();
        this.OnMenuSceneStart();
        const playerScoreTextNode: Node = this.playerScore.getChildByName('TotalScoreCount').children[0];
        playerScoreTextNode.getComponent(Label).string = `${Constant.GameData["life_time_score"]}`;
        this.CursorHand(true);
    };
    //#endregion



    //#region CursorHand
    CursorHand(_isEnable: boolean): void {
        const buttons: Node[] = [
            this.soundButtonNode,
            this.versusButton,
            this.challengerButton,
            this.challengerMode.getChildByName('back')
        ];

        for (let i = 0; i < buttons.length; i++) {
            const btn = buttons[i];
            if (_isEnable) {
                btn.on(Node.EventType.MOUSE_ENTER, Constant.onMouseEnter, this);
                btn.on(Node.EventType.MOUSE_LEAVE, Constant.onMouseLeaveOrUp, this);
                btn.on(Node.EventType.MOUSE_UP, Constant.onMouseLeaveOrUp, this);
            } else {
                btn.off(Node.EventType.MOUSE_ENTER, Constant.onMouseEnter, this);
                btn.off(Node.EventType.MOUSE_LEAVE, Constant.onMouseLeaveOrUp, this);
                btn.off(Node.EventType.MOUSE_UP, Constant.onMouseLeaveOrUp, this);
            }
        }
    };
    //#endregion

    //#region OnMenuSceneStart
    OnMenuSceneStart(): void {
        const soundManager: SoundManager = SoundManager.instance;
        this.scheduleOnce(() => {
            soundManager.PlayBGMusic();
        }, 0.7);
    };
    //#endregion

    private setPageState(_pageState: PageState): void {
        this.pageState = _pageState;

        this.PageManagement();
    };

    private PageManagement(): void {
        this.versusMode.active = false;
        this.challengerMode.active = false;
        this.gameLogo.active = false;
        this.menuButtons.active = false;
        this.progressBaseNode.active = false;
        this.playerScore.active = false;
        this.StopStandbyTween(this.challengerButton);
        this.StopStandbyTween(this.versusButton);

        switch (this.pageState) {
            case PageState.VERSUS_MODE:
                this.versusMode.active = true;
                this.playerScore.active = true;
                AnimationManager.animatePageChildren(this.versusMode);
                this.VsModeSpinePlay();
                break;

            case PageState.CHALLENEGER_MODE:
                this.challengerMode.active = true;
                AnimationManager.animatePageChildren(this.challengerMode);
                break;

            case PageState.START:
                this.OnStartPageEnable();
                this.PlayStandbyTween(this.challengerButton);
                this.PlayStandbyTween(this.versusButton);
                break;

            case PageState.LOADING:
                this.gameLogo.active = true;
                this.gameLogo.scale = Vec3.ONE;
                this.progressBaseNode.active = true;
                tween(this.gameLogo)
                    .repeatForever(
                        tween()
                            .to(0.6, { scale: new Vec3(1.1, 1.1, 1) })
                            .to(0.6, { scale: Vec3.ONE })
                    )
                    .start();
                break;
        }
    };

    OnStartPageEnable(): void {
        this.gameLogo.active = true;
        this.gameLogo.getComponent(sp.Skeleton).setAnimation(0, 'title_art', false);
        this.menuButtons.active = true;
        this.playerScore.active = true;
        this.versusButton.setScale(0.2, 0.2, 1);
        this.challengerButton.setScale(0.2, 0.2, 1);
        this.menuButtons.children[0].setScale(0.6, 1, 1);
        tween(this.challengerButton).to(0.4, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' }).start();
        tween(this.versusButton).to(0.4, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' }).start();
        tween(this.menuButtons.children[0]).to(0.6, { scale: Vec3.ONE }, { easing: 'backOut' }).start();
    };

    private VsModeSpinePlay(): void {
        const vsLogo: Node = this.versusMode.getChildByName('Vs');
        const spineAnim = vsLogo.getComponent(sp.Skeleton);

        spineAnim.setCompleteListener(entry => {
            if (entry.animation.name === 'VS_appear') {
                spineAnim.setAnimation(0, 'VS_loop', true);
            }
        });
        spineAnim.setAnimation(0, 'VS_appear', false);
    };

    //#region LoadSinglePlayerScene
    LoadSinglePlayerScene(_startLevel: number): void {
        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "game_loading"
        );
        this.setPageState(PageState.LOADING);
        PlayzhubEventHandler.GameLoadingStarted();
        director.preloadScene('SinglePlayer', (completeCount: number, totalCount: number) => {
            const percent = completeCount / totalCount;
            this.progressBarSprite.fillRange = percent;
        }, () => {
            this.progressBaseNode.active = false;
            PlayzhubEventHandler.GameLoadingCompleted();
            GA.GameAnalytics.addProgressionEvent(
                "Complete",
                "game_loading"
            );
            director.loadScene('SinglePlayer', () => {
                const startLevel: number = _startLevel;
                GameManager.instance.currentLevel = startLevel;
                GameManager.instance.old_currentLevelStar = Constant.Levels_Star_Array[startLevel];
                GameManager.instance.gameMode = GAME_MODE.CHALLENGER;
            });
            Server.NumberOfPlayButtonClickedIncreament();
            PlayzhubEventHandler.GamePlayStarted(Server.numberOfPlayButtonClicked);
        });
    };
    //#endregion

    //#region CreateLevelTable
    async CreateLevelTable(): Promise<void> {
        const levelParentPrefab: Prefab = await AssetLoader.LoadAsset('prefabs', 'LevelPage', Prefab);
        const levelPrefab: Prefab = await AssetLoader.LoadAsset('prefabs', 'Level', Prefab);

        const maxPerParent = 9;
        const totalParents = Math.ceil(Constant.MAX_LEVEL / maxPerParent);

        let spawned = 0;
        for (let i = 0; i < totalParents; i++) {
            const parentNode = instantiate(levelParentPrefab);
            // parentNode.setScale(new Vec3(scale, 1, 1));
            this.challengerModePageView.addPage(parentNode);
            const nodesToSpawn = Math.min(maxPerParent, Constant.MAX_LEVEL - spawned);
            for (let j = 0; j < nodesToSpawn; j++) {
                const childNode = instantiate(levelPrefab);
                // childNode.setScale(scale, scale, 1);
                childNode.getComponent(LevelNodeScript).SetLevelDetails(
                    spawned + 1,
                    Constant.GameData['levels_stars_array'][spawned],
                    this.levelBaseImage
                );
                parentNode.addChild(childNode);
                spawned++;
            };
        };
        this.SetPlayerTotalStarsChallengerMode();
    };
    //#endregion

    SetPlayerTotalStarsChallengerMode(): void {
        const totalStar: number = Constant.MAX_LEVEL * 3;
        let earnedStars: number = 0;
        for (let i: number = 0; i < Constant.GameData['levels_stars_array'].length; i++) {
            const starsEarnedLevel = Constant.GameData['levels_stars_array'][i];
            if (starsEarnedLevel > 0) {
                earnedStars += starsEarnedLevel;
            }
        };

        const levelBoard: Node = this.challengerMode.getChildByName('LevelBase');
        const levelBoardText = levelBoard.getChildByName('StarCountNode').children[0];
        levelBoardText.getComponent(Label).string = `${earnedStars} / ${totalStar}`;
    };

    // async GetLevelsDetailsFromPlatform(): Promise<void> {
    //     PlayzhubEventHandler.RequestGameState();
    //     PlayzhubEventHandler.ReceivedGameState(await this.UpdateGameData.bind(this));
    // };
    async GetLevelsDetailsFromPlatform(): Promise<void> {
        return new Promise((resolve) => {
            PlayzhubEventHandler.RequestGameState();
            PlayzhubEventHandler.ReceivedGameState(async (data: any) => {
                if (data) {
                    await this.UpdateGameData(data);
                } else {
                    console.warn("Received null or undefined game state data. Using defaults.");
                    await this.UpdateGameData(null);
                }
                resolve();
            });
        });
    }
    async UpdateGameData(data: any): Promise<void> {
        let levelsStars: number[] = [];

        if (data) {
            try {
                const parsed = await Constant.ParseData(data);
                if (parsed && Array.isArray(parsed['levels_stars_array'])) {
                    levelsStars.push(...parsed['levels_stars_array']);
                }

                if (typeof parsed["life_time_score"] === "number") {
                    Constant.GameData["life_time_score"] = parsed["life_time_score"];
                } else {
                    Constant.GameData["life_time_score"] = 0;
                }

            } catch (e) {
                console.warn("Failed to parse levels_data from Platform. Using defaults.");
                Constant.GameData["life_time_score"] = 0;
            }
        } else {
            Constant.GameData["life_time_score"] = 0;
        }

        // Default value if no stars available
        if (levelsStars.length === 0) {
            levelsStars = [0];
        }

        // Ensure length matches Constant.MAX_LEVEL
        while (levelsStars.length < Constant.MAX_LEVEL) {
            levelsStars.push(-1);
        }

        // Update UI
        if (this.playerScore?.children?.[0]?.children?.[0]) {
            const playerScoreTextNode: Node = this.playerScore.children[0].children[0];
            const label = playerScoreTextNode.getComponent(Label);
            if (label) {
                label.string = `${Constant.GameData["life_time_score"]}`;
            }
        } else {
            console.warn("Unable to find playerScore label node.");
        }

        // Save stars array to GameData
        Constant.GameData['levels_stars_array'] = levelsStars;
    }

    //#region onChallengerModeButtonClick
    onChallengerModeButtonClick(_event: EventTouch): void {
        GA.GameAnalytics.addDesignEvent("ui:challenger_mode_clicked");
        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.5, () => {
            this.setPageState(PageState.CHALLENEGER_MODE);
            const levelArray = Constant.GameData['levels_stars_array'];
            const currentLevel = levelArray.indexOf(0) + 1 || levelArray.length + 1;
            const currentPage = Math.floor((currentLevel - 1) / 9);
            this.challengerModePageView.scrollToPage(currentPage, 0.5);
        });
        SoundManager.instance.ButtonClickSound();
    };
    //#endregion

    //#region onVersusModeButtonClick
    onVersusModeButtonClick(_event: EventTouch): void {
        GA.GameAnalytics.addDesignEvent("ui:versus_mode_clicked");
        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.5, () => {
            this.StartVersusMode();
        });
        SoundManager.instance.ButtonClickSound();
    };
    //#endregion

    StartVersusMode(): void {
        this.setPageState(PageState.VERSUS_MODE);
        this.PlayersProfileSetup();

        const coinType: COIN_TYPE[] = [COIN_TYPE.WHITE, COIN_TYPE.BLACK];
        this.scheduleOnce(() => {
            director.preloadScene("Game", () => {
                director.loadScene("Game", () => {
                    GameManager.instance.gameMode = GAME_MODE.VERSUS;
                    // GameManager.instance.playerChoosedCoinColor = coinType[randomRangeInt(0, coinType.length)];
                });
            });
        }, 3)
    };

    LoadScene(): void {
        if (!this.isMatching) return;

        director.loadScene('Game', () => {
            GameManager.instance.isSinglePlayer = false;
        });
    };

    //#region PlayersProfileSetup
    PlayersProfileSetup(): void {
        const playerProfileNode: Node = this.versusMode.getChildByName("PlayerProfile");
        const botProfileNode: Node = this.versusMode.getChildByName("BotProfile");

        const playerProfile: PlayerProfile = playerProfileNode.getComponent(PlayerProfile);
        playerProfile.setPlayerName("ME");
        playerProfile.setTotalStarEarned(Constant.GameData["life_time_score"]);
        playerProfile.setProfilePicture(this.profilePictures[0]);
        this.StoreProfiles(Constant.playerProfileData, this.profilePictures[0], "ME", Constant.totalPlayerStar);

        const botProfile: PlayerProfile = botProfileNode.getComponent(PlayerProfile);

        this.animateBotProfilePicture(botProfile, () => {
            const opponentName: string = Constant.DUMMY_BOT_NAME[randomRangeInt(0, Constant.DUMMY_BOT_NAME.length)];
            const opponentScore: number = randomRangeInt(0, 200);
            const opponentImage: SpriteFrame = this.profilePictures[randomRangeInt(1, this.profilePictures.length)];

            botProfile.setPlayerName(opponentName);
            botProfile.setTotalStarEarned(opponentScore);
            botProfile.setProfilePicture(opponentImage);

            this.StoreProfiles(Constant.opponentProfileData, opponentImage, opponentName, opponentScore);
        });
    };
    animateBotProfilePicture(botProfile: PlayerProfile, onComplete: Function): void {
        let index = 1;
        const interval = 0.1;
        const duration = 2.0;
        let elapsed = 0;

        const callback = () => {
            if (elapsed >= duration) {
                this.unschedule(callback);
                onComplete();
                return;
            }

            const randomSprite = this.profilePictures[index++ % this.profilePictures.length];
            botProfile.setProfilePicture(randomSprite);

            elapsed += interval;
        };

        this.schedule(callback, interval);
    };
    //#endregion

    StoreProfiles(_profile: ProfileData, _image: SpriteFrame, _name: string, _score: number): void {
        _profile.image = _image;
        _profile.name = _name;
        _profile.score = _score;
    };

    //#region OnBackButtonClick
    OnBackButtonClick(_event: EventTouch): void {
        GA.GameAnalytics.addDesignEvent("ui:back_clicked");
        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.2, () => {
            this.setPageState(PageState.START);
        });
        SoundManager.instance.ButtonClickSound();
    };
    //#endregion

    //#region OnLevelSelectionNextButtonClick
    OnLevelSelectionNextButtonClick(_event: EventTouch): void {
        GA.GameAnalytics.addDesignEvent("ui:level_next_clicked");
        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.2, () => {
            const currentPageIndex: number = this.challengerModePageView.curPageIdx;
            this.challengerModePageView.setCurrentPageIndex(currentPageIndex + 1);
        });
        SoundManager.instance.ButtonClickSound();
    };
    //#endregion

    //#region OnLevelSelectionPrevButtonClick
    OnLevelSelectionPrevButtonClick(_event: EventTouch): void {
        GA.GameAnalytics.addDesignEvent("ui:level_previous_clicked");

        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.2, () => {
            const currentPageIndex: number = this.challengerModePageView.curPageIdx;
            this.challengerModePageView.setCurrentPageIndex(currentPageIndex - 1);
        }, {
            initial_scale_x: -0.95,
            initial_scale_y: 0.95,
            final_scale_x: -1,
            final_scale_y: 1,
        });
        SoundManager.instance.ButtonClickSound();
    };
    //#endregion

    //#region OnSoundButtonClick
    OnSoundButtonClick(): void {
        GA.GameAnalytics.addDesignEvent("ui:sound_clicked");

        const targerButton: Button = this.soundButtonNode.getComponent(Button);
        targerButton.interactable = false;
        const soundManager = SoundManager.instance;
        soundManager.ButtonClickSound();
        soundManager.SetMute();
        AnimationManager.ButtonsInteractiveAnim(this.soundButtonNode, 0.2, this.SetSoundSprite.bind(this));
        this.scheduleOnce(() => {
            targerButton.interactable = true;
        }, 0.5);
    };
    SetSoundSprite(): void {
        if (!SoundManager.instance.isMuted) {
            this.soundButtonNode.getComponent(Sprite).spriteFrame = this.soundButtonNode.getComponent(Button).normalSprite;
        } else {
            this.soundButtonNode.getComponent(Sprite).spriteFrame = this.soundButtonNode.getComponent(Button).disabledSprite;
        }
    };
    //#endregion

    PlayStandbyTween(_object: Node) {
        this.StopStandbyTween(_object);

        const hoverTween = tween()
            .by(0.3, { position: new Vec3(0, 10, 0) }, { easing: 'sineOut' })
            .by(0.3, { position: new Vec3(0, -10, 0) }, { easing: 'sineIn' });

        const scaleTween = tween()
            .delay(Math.random() * 2.5 + 3)
            .to(0.2, { scale: new Vec3(1.2, 1.2, 1) }, { easing: 'quadOut' })
            .to(0.2, { scale: new Vec3(1, 1, 1) }, { easing: 'quadIn' });

        const combinedTween = tween(_object)
            .repeatForever(
                tween().parallel(
                    tween().sequence(hoverTween),
                    tween().sequence(scaleTween)
                )
            );

        this.standbyTweenMap.set(_object, combinedTween);
        combinedTween.start();
    };

    StopStandbyTween(_object: Node) {
        const existingTween = this.standbyTweenMap.get(_object);
        if (existingTween) {
            existingTween.stop();
            this.standbyTweenMap.delete(_object);
        }

        _object.setScale(Vec3.ONE);
        // _object.setPosition(_object.position.set(_object.position.x, 0, _object.position.z));
    };
    protected onDisable(): void {
        Constant.gameEvents.off("load_single_player", this.LoadSinglePlayerScene, this);
        this.CursorHand(false);
    };
}