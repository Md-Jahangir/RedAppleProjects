import { _decorator, Button, Component, director, game, Node, sp, Sprite, tween, Vec3 } from 'cc';
import { GameManager } from './GameManager';
import { SoundManager } from './SoundManager';
import { Server } from './Server';
import { PlayzhubEventHandler } from './PlayzhubEventHandler';
import { HTML_Bridge } from '../@types/HTML-Bridge';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('MenuSceneScript')
export class MenuSceneScript extends Component {
    canvas = null;
    @property(Node) character: Node;
    @property(Node) titleArt: Node;
    @property(Node) startButton: Node;
    @property(Node) soundButton: Node;
    buttonArray: Node[] = [];
    // @property(Node) backButton: Node;
    presistNode: Node;
    levelData = null;
    startLevel = -1;
    startCoinValue = 10;
    startDiamondValue = 10;
    startShuffleCost = 5;
    startUndoCost = 1;

    currentLevelData = {
        "game_score": 10,
        "total_levels": 30,
        "last_level_played": 0,
        "game_collectibles": {
            "gems": 10,
            "shuffle_price": 5,
            "step_back_price": 1
        }
    }

    titleArtAnimation: sp.Skeleton;
    characterAnimation: sp.Skeleton;
    serverData = null;
    private initialized = false;

    initializeAnalytics(): void {
        if (this.initialized) return;

        const GAME_KEY = 'fda2e16f5771e1970801d7bca1b55505';
        const SECRET_KEY = '8cd0b5f87acbefdb8381f8e5c648d6177cf8b40a';

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

        await HTML_Bridge.initExternalScript('https://games.playzhub.com/sdk/PlayzhubSDk_E6_IIFE.js', () => {
            // await HTML_Bridge.initExternalScript('https://stg-games.playzhub.com/sdk/PlayzhubSDk_E6_IIFE.js', () => {
            PlayzhubEventHandler.GameLoadingStarted();
            GA.GameAnalytics.addProgressionEvent(
                "Start",
                "game_loading"
            );
            PlayzhubEventHandler.GameLoadingCompleted();
            PlayzhubEventHandler.RequestGameState();
            PlayzhubEventHandler.ReceivedGameState(this.UpdateGameVariable.bind(this));
            GA.GameAnalytics.addProgressionEvent(
                "Complete",
                "game_loading"
            );
        });
    }

    //#region -onEnable
    protected onEnable(): void {
        this.startButton.active = false;
        this.character.active = false;
        this.titleArt.active = false;
        this.canvas = document.getElementById("GameCanvas");

        // for SoundManager
        this.presistNode = director.getScene().getChildByName('PresistNode');
        director.addPersistRootNode(this.presistNode);

        screen.orientation.addEventListener('change', (_data) => {
            this.OnOrientationChange()
        })
        this.OnOrientationChange();
        this.titleArtAnimation = this.titleArt.getComponent(sp.Skeleton);
        this.characterAnimation = this.character.getComponent(sp.Skeleton);
        this.buttonArray.push(this.startButton, this.soundButton);
    }
    //#endregion

    //#region -Start
    start() {
        // PlayzhubEventHandler.RequestGameState();
        // PlayzhubEventHandler.ReceivedGameState(this.UpdateGameVariable.bind(this));
        GA.GameAnalytics.addDesignEvent("screen:title");
        SoundManager.instance.CheckBackgroundMusicEnable();
        setTimeout(() => {
            this.StartSplashAnimation();
        }, 100);
        this.MousePointerEffect();
    }
    //#endregion

    //#region -StartSplashAnimation
    StartSplashAnimation(): void {
        this.titleArtAnimation.setCompleteListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name === 'appear') {
                this.titleArtAnimation.setAnimation(0, 'loop', true);
                this.OnStartPanelAnimation(this.startButton, this.startButton.getPosition().x, -600);
            }
        })
        this.characterAnimation.setCompleteListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name === 'normal_jump') {
                this.characterAnimation.setAnimation(0, 'normal_idle', true);
            }
        })
        this.character.active = true;
        this.characterAnimation.setAnimation(0, 'normal_jump', false);
        setTimeout(() => {
            this.titleArt.active = true;
            this.titleArtAnimation.setAnimation(0, 'appear', false);
        }, 500);
    }
    //#endregion

    //#region -OnPlayButtonClick
    OnPlayButtonClick(): void {
        GA.GameAnalytics.addDesignEvent("ui:play_clicked");
        this.ButtonInteractiveAnimation(this.startButton, () => {
            Server.NumberOfPlayButtonClickedIncreament();
            PlayzhubEventHandler.GamePlayStarted(Server.numberOfPlayButtonClicked);
        }, () => {
            SoundManager.instance.ButtonClickSound();
            this.startButton.getComponent(Button).interactable = false;
            director.loadScene("GamePlay", () => {
                GameManager.instance.SetCurrentLevel(this.startLevel);
                GameManager.instance.SetCoin(this.startCoinValue);
                GameManager.instance.SetNumberOfUndoLeft(this.startDiamondValue);
                GameManager.instance.SetCurrentShuffleCost(this.startShuffleCost);
                GameManager.instance.SetCurrentUndoCost(this.startUndoCost);
            });
        });
    }
    //#endregion

    //#region -OnExitButtonClick
    OnExitButtonClick(): void {
        game.end();
    }
    //#endregion

    //#region -StartAnimation
    StartAnimation(_object: Node, _onStartTween: Function, _onCompleteTween: Function): void {
        const scaleZ = _object.getScale().z;
        _object.setScale(0.1, 0.1, scaleZ);
        _object.active = true;
        tween(_object).to(1, { scale: new Vec3(1, 1, scaleZ) }, {
            easing: 'backOut', onStart: () => {
                _onStartTween();
            }
        }).call(() => {
            _onCompleteTween();
        }).start();
    }
    //#endregion

    //#region -OnStartPanelAnimation
    OnStartPanelAnimation(_nodeForAnimation: Node, _xPos: number, _yPos: number): void {
        const currentPosExit = _nodeForAnimation.getPosition();
        _nodeForAnimation.setPosition(_xPos, _yPos, _nodeForAnimation.getPosition().z);
        _nodeForAnimation.active = true
        tween(_nodeForAnimation).to(1, { position: currentPosExit }, { easing: 'backOut' }).start();
    }
    //#endregion

    //#region -MousePointerEffect
    MousePointerEffect(): void {
        this.buttonArray.forEach((_button: Node, _index: number) => {
            _button.on(Node.EventType.MOUSE_ENTER, () => {
                this.canvas.style.cursor = "pointer";
            })
            _button.on(Node.EventType.MOUSE_LEAVE, () => {
                this.canvas.style.cursor = "default";
            })
        })
    }
    //#endregion

    //#region OnSoundButtonClicked
    OnSoundButtonClicked(): void {
        GA.GameAnalytics.addDesignEvent("ui:sound_clicked");
        this.ButtonInteractiveAnimation(this.soundButton, () => { SoundManager.instance.ButtonClickSound(); }, () => {
            if (SoundManager.instance.isMuted) {
                this.soundButton.getComponent(Sprite).spriteFrame = this.soundButton.getComponent(Button).normalSprite;
            } else {
                this.soundButton.getComponent(Sprite).spriteFrame = this.soundButton.getComponent(Button).disabledSprite;
            }
            SoundManager.instance.SetMute();
            SoundManager.instance.CheckBackgroundMusicEnable();
        });
    }
    //#endregion

    //#region -ButtonInteractiveAnimation
    ButtonInteractiveAnimation(_object: Node, _onTweenStart: Function, _onTweenComplete: Function): void {
        const scaleZ: number = _object.getScale().z;
        _object.setScale(0.8, 0.8, scaleZ);
        tween(_object).to(0.2, { scale: new Vec3(1.2, 1.2, scaleZ) }, {
            easing: 'fade', onStart: () => {
                _onTweenStart();
            }
        }).call(() => {
            _object.setScale(1, 1, scaleZ);
            _onTweenComplete();
        }).start();
    }
    //#endregion

    //#region -OnOrientationChange
    OnOrientationChange(): void {
        const orientation = director.getScene().getChildByName('Canvas').getChildByName('Orientation');
        if (screen.orientation.type === 'portrait-primary') {
            orientation.active = true;
        } else {
            orientation.active = false;
        }
    }
    //#endregion

    //#region -ListenGameState
    OnFirstTimeGameLoadGameState() {
        window.addEventListener("message", (event) => {
            if (event.data && event.data.eventName == "update-game-state") {
                // console.log("1ST runtime.objects.GameData", event.data.data)
                try {
                    this.currentLevelData = event.data.data;
                    this.startLevel = this.currentLevelData['last_level_played'];
                    this.startCoinValue = this.currentLevelData['game_score'] ? this.currentLevelData['game_score'] : 10;
                    this.startDiamondValue = this.currentLevelData['game_collectibles']['gems'] ? this.currentLevelData['game_collectibles']['gems'] : 10;
                    this.startShuffleCost = this.currentLevelData['game_collectibles']['shuffle_price'] ? this.currentLevelData['game_collectibles']['shuffle_price'] : 5;
                    this.startUndoCost = this.currentLevelData['game_collectibles']['step_back_price'] ? this.currentLevelData['game_collectibles']['step_back_price'] : 1;
                } catch (error) {
                    this.ResetGameState();
                    // console.log("error...!");
                }

            }
            else {
                this.ResetGameState();
                // console.log("1-Not found the event ")
            }
        })
        window.postMessage('game-ready');
    }
    //#endregion

    GameState(): void {
        window.addEventListener("message", (event) => {
            if (event.data && event.data.eventName == "response-game-state") {
                // console.log("2ND runtime.objects.GameData", event.data.data)
                try {
                    this.currentLevelData = event.data.data;
                    this.startLevel = this.currentLevelData['last_level_played'];
                    this.startCoinValue = this.currentLevelData['game_score'] ? this.currentLevelData['game_score'] : 10;
                    this.startDiamondValue = this.currentLevelData['game_collectibles']['gems'] ? this.currentLevelData['game_collectibles']['gems'] : 10;
                    this.startShuffleCost = this.currentLevelData['game_collectibles']['shuffle_price'] ? this.currentLevelData['game_collectibles']['shuffle_price'] : 5;
                    this.startUndoCost = this.currentLevelData['game_collectibles']['step_back_price'] ? this.currentLevelData['game_collectibles']['step_back_price'] : 1;
                } catch (error) {
                    // console.log("error.....!");
                }
            } else {
                this.ResetGameState();
                // console.log("2-Not found the event ")
            }
        })
        const eventName = 'request-game-state';
        const data = null;
        window.parent.postMessage({ eventName, data }, "*");
    }

    // UpdateGameData(event): void {
    //     try {
    //         this.currentLevelData = event.data.data;
    //         this.startLevel = this.currentLevelData['last_level_played'];
    //         this.startCoinValue = this.currentLevelData['game_score'] ? this.currentLevelData['game_score'] : 10;
    //         this.startDiamondValue = this.currentLevelData['game_collectibles']['gems'] ? this.currentLevelData['game_collectibles']['gems'] : 10;
    //         this.startShuffleCost = this.currentLevelData['game_collectibles']['shuffle_price'] ? this.currentLevelData['game_collectibles']['shuffle_price'] : 5;
    //         this.startUndoCost = this.currentLevelData['game_collectibles']['step_back_price'] ? this.currentLevelData['game_collectibles']['step_back_price'] : 1;
    //     } catch (error) {
    //         this.ResetGameState();
    //         // console.log("error...!");
    //     }
    // }

    UpdateGameVariable(data): void {
        try {
            this.currentLevelData = this.ParseData(data);
            this.startLevel = this.currentLevelData['last_level_played'];
            this.startCoinValue = this.currentLevelData['game_score'] ? this.currentLevelData['game_score'] : 10;
            this.startDiamondValue = this.currentLevelData['game_collectibles']['gems'] ? this.currentLevelData['game_collectibles']['gems'] : 10;
            this.startShuffleCost = this.currentLevelData['game_collectibles']['shuffle_price'] ? this.currentLevelData['game_collectibles']['shuffle_price'] : 5;
            this.startUndoCost = this.currentLevelData['game_collectibles']['step_back_price'] ? this.currentLevelData['game_collectibles']['step_back_price'] : 1;
        } catch (error) {
            this.ResetGameState();
        }
    }

    ParseData(data) {
        let _data = data;
        if (typeof data !== 'object') {
            _data = JSON.parse(data);
        }
        return _data;
    }

    //#region -ResetGameState
    ResetGameState(): void {
        this.startLevel = -1;
        this.startCoinValue = 10;
        this.startDiamondValue = 10;
        this.startShuffleCost = 5;
        this.startUndoCost = 1;
    }
    //#endregion
}


