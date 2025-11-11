import { _decorator, Button, Component, director, EventTouch, Label, Node, ScrollView, Sprite, SpriteFrame, Tween, tween, Vec2, Vec3 } from 'cc';
import { GameManager } from '../GameManager';
import { PlayerProfile } from './PlayerProfile';
import { COIN_TYPE, Constant } from '../Constant';
import { MenuScript } from '../menu_scene/MenuScript';
import { SoundManager } from '../SoundManager';
import { AnimationManager } from '../utils/AnimationManger';
import { PlayzhubEventHandler } from '../playzhub/PlayzhubEventHandler';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('UIMultiplayer')
export class UIMultiplayer extends Component {

    @property(Label) turnIndicator: Label = null!;
    @property(Node) timerBarNode: Node = null!;
    @property(PlayerProfile) playerProfile: PlayerProfile = null!;
    @property(PlayerProfile) opponentProfile: PlayerProfile = null!;
    @property(Node) gameCompletePopup: Node = null!;
    @property(Node) gameLoosePopup: Node = null!;
    @property(Node) infoPageNode: Node = null!;
    @property(Node) exitPopup: Node = null!;
    @property([SpriteFrame]) pawnSpriteFrame: SpriteFrame[] = []; // 0-Black,1-White
    @property(Node) playerStrikerSlider: Node = null!;

    private _isGameStarted: boolean = false;
    private timerTweenAnimation: Tween<Sprite> | null = null;

    protected start(): void {
        this.gameCompletePopup.active = false;
        this.gameLoosePopup.active = false;
        this.exitPopup.active = false;
        this.InfoPopupActive(true);

        this.InfoPageSetup();

        this.scheduleOnce(() => {
            if (this.infoPageNode.active) {
                this.InfoPopupActive(false);
            }

            this.scheduleOnce(() => {
                GameManager.instance.StartSettingPawns();
            }, 0.8);
        }, 2);

        this.CursorHand(true);
    }

    StartGame(): void {
        this._isGameStarted = true;
        this.StartTimer();
        this.SetTurnIndicator(GameManager.instance.playerTurn);
    }

    //#region Profile
    initProfile(): void {
        let playerCoinColorIndex: number;
        let opponentCoinColorIndex: number;

        if (GameManager.instance.playerChoosedCoinColor === COIN_TYPE.BLACK) {
            playerCoinColorIndex = 0;
            opponentCoinColorIndex = 1;
        } else {
            playerCoinColorIndex = 1;
            opponentCoinColorIndex = 0;
        }
        this.playerProfile.initDetails(Constant.playerProfileData, this.pawnSpriteFrame[playerCoinColorIndex]);
        this.opponentProfile.initDetails(Constant.opponentProfileData, this.pawnSpriteFrame[opponentCoinColorIndex]);
        this.UpdatePlayerScoreUI(0, 0);
    }

    UpdatePlayerScoreUI(playerScore: number, opponentScore: number): void {
        this.playerProfile.setTotalStarEarned(playerScore, 9);
        this.opponentProfile.setTotalStarEarned(opponentScore, 9);
    }
    //#endregion

    //#region Turn Indicator
    SetTurnIndicator(isPlayerTurn: boolean): void {
        if (!this._isGameStarted) return;

        const turnText = isPlayerTurn ? "Your Turn" : "Opponent Turn";
        this.turnIndicator.string = turnText;

        this.playerProfile.turnEnable(isPlayerTurn);
        this.opponentProfile.turnEnable(!isPlayerTurn);

        const indicatorNode = this.turnIndicator.node;
        const originalPos = indicatorNode.getPosition();

        indicatorNode.setPosition(Vec3.ZERO);
        indicatorNode.setScale(new Vec3(2.5, 2.5, 2.5));

        tween(indicatorNode).delay(1)
            .to(0.4, {
                position: originalPos,
                scale: new Vec3(1.1, 1.1, 1.1)
            }, { easing: 'backOut' })
            .to(0.1, { scale: Vec3.ONE }, { easing: 'sineInOut' })
            .start();

        const targetScale = isPlayerTurn ? Vec3.ONE : Vec3.ZERO;
        tween(this.playerStrikerSlider)
            .to(0.2, { scale: targetScale }, { easing: 'quartOut' })
            .start();
    };
    //#endregion

    //#region InfoPageSetup
    InfoPageSetup(): void {
        const infoPage: Node = this.infoPageNode.getChildByName('page');
        const headerNode: Node = infoPage.getChildByName('Header');
        const iconNode: Node = headerNode.getChildByName('Pawn_Icon');
        const iconTextNode: Node = headerNode.getChildByName('Pawn_Text');
        const isPlayerWhite: boolean = GameManager.instance.playerChoosedCoinColor === COIN_TYPE.WHITE;
        const icon: SpriteFrame = isPlayerWhite ? this.pawnSpriteFrame[1] : this.pawnSpriteFrame[0];
        const iconText: string = isPlayerWhite ? 'White coins are yours.' : 'Black coins are yours.';

        iconNode.getComponent(Sprite).spriteFrame = icon;
        iconTextNode.getComponent(Label).string = iconText;
    }
    //#endregion

    //#region Timer
    StartTimer(): void {
        if (!this._isGameStarted) return;

        const timerBar = this.timerBarNode.getChildByName("TimerBase")?.children[0];
        if (!timerBar) return;

        const spriteComponent = timerBar.getComponent(Sprite);
        if (!spriteComponent) return;

        this.StopTimer();
        spriteComponent.fillRange = 1;

        this.timerTweenAnimation = tween(spriteComponent)
            .to(20, { fillRange: 0 }, { easing: 'linear' })
            .call(() => GameManager.instance.ManualTurnChange())
            .start();

        this.scheduleOnce(() => {
            if (GameManager.instance.playerTurn && this.infoPageNode.active) {
                this.PauseTimer();
            };
        }, 0.5);
    }

    PauseTimer(): void {
        this.timerTweenAnimation?.stop();
    }

    ResumeTimer(): void {
        this.timerTweenAnimation?.start();
    }

    StopTimer(): void {
        this.timerTweenAnimation?.stop();
        this.timerTweenAnimation = null;
    }
    //#endregion

    //#region Popups
    OnGameWinPopup(): void {
        if (this.gameCompletePopup.active) return;
        this.gameCompletePopup.active = true;
        this.infoPageNode.active = false;
        this.exitPopup.active = false;
        this.StopTimer();
        this._isGameStarted = false;

        // this.playPopupAnimation(this.gameCompletePopup, "congratulations_2", "congratulations_2_loop");
        AnimationManager.playPopupAnimation(this.gameCompletePopup, "congratulations_2", "congratulations_2_loop", (_popUp: Node) => {
            const starEarnedUI = _popUp.getChildByName('Score');
            const scoreEarned = { value: 0 };
            tween(scoreEarned).to(0.5, { value: GameManager.instance.StarsAchieved() }, {
                onUpdate(target, ratio) {
                    const currentValue = Math.floor(scoreEarned.value);
                    starEarnedUI.getComponent(Label).string = `${currentValue}`;
                },
            }).start();
        });
        this.StarRatingSaveForMultiplayer();
        SoundManager.instance.LevelCompleteSound();
    }

    async OnGameLoosePopup(): Promise<void> {
        if (this.gameLoosePopup.active) return;

        await GameManager.instance.ShowAd();

        this.gameLoosePopup.active = true;
        this.infoPageNode.active = false;
        this.exitPopup.active = false;
        this.StopTimer();
        this._isGameStarted = false;

        // this.playPopupAnimation(this.gameLoosePopup, "oops");
        AnimationManager.playPopupAnimation(this.gameLoosePopup, "oops");
        SoundManager.instance.LevelFailedSound();
    }
    //#endregion

    //#region Buttons
    OnHomeButtonClicked(): void {
        GA.GameAnalytics.addDesignEvent('ui:menu_clicked');
        const isWin = this.gameCompletePopup.active;
        const popup = isWin ? this.gameCompletePopup : this.gameLoosePopup;
        const animation = isWin ? "congratulations_2" : "oops";

        // this.reversePopupAnimation(popup, animation);
        AnimationManager.reversePopupAnimation(popup, animation);

        this.scheduleOnce(() => {
            director.loadScene("MenuScene");
        }, 1);
    }

    async OnReplayButtonClick(): Promise<void> {
        GA.GameAnalytics.addDesignEvent('ui:replay_clicked');
        const isWin = this.gameCompletePopup.active;
        const popup = isWin ? this.gameCompletePopup : this.gameLoosePopup;
        const animation = isWin ? "congratulations_2" : "oops";

        AnimationManager.reversePopupAnimation(popup, animation);

        this.scheduleOnce(() => {
            director.loadScene("MenuScene", () => {
                this.scheduleOnce(() => {
                    const canvas = director.getScene().getChildByName('Canvas');
                    const menuScript = canvas?.getChildByName('Camera')?.getComponent(MenuScript);
                    menuScript?.StartVersusMode();
                }, 0.1);
            });
        }, 1);
    }

    OnInfoButtonClicked(): void {
        if (!this._isGameStarted) return;

        const isInfoPageOpen: boolean = this.infoPageNode.active;
        this.InfoPopupActive(!isInfoPageOpen);

        if (!isInfoPageOpen) this.PauseTimer();
        else this.ResumeTimer();
    };

    async OnExitButtonClick(): Promise<void> {
        await GameManager.instance.ShowAd();
        this.exitPopup.active = true;
        AnimationManager.playPopupAnimation(this.exitPopup, 'quit', null, () => {
            this.scheduleOnce(() => { director.pause(); }, 0.2);
        });
    }

    OnExitYesButtonClick(): void {
        director.resume();
        this.exitPopup.active = false;
        this.OnGameLoosePopup();
    }

    OnExitNoButtonClick(): void {
        director.resume();
        AnimationManager.reversePopupAnimation(this.exitPopup, 'quit');
    }

    OnSoundButtonClick(_event: EventTouch): void {
        const buttonNode: Node = _event.currentTarget
        const targerButton: Button = buttonNode.getComponent(Button);
        targerButton.interactable = false;
        const soundManager = SoundManager.instance;
        soundManager.ButtonClickSound();
        soundManager.SetMute();
        AnimationManager.ButtonsInteractiveAnim(buttonNode, 0.2, () => {
            this.SetSoundSprite(buttonNode);
        });
        this.scheduleOnce(() => {
            targerButton.interactable = true;
        }, 0.5);
    }
    //#endregion

    //#region Helpers
    private SetSoundSprite(_buttonNode: Node): void {
        if (!SoundManager.instance.isMuted) {
            _buttonNode.getComponent(Sprite).spriteFrame = _buttonNode.getComponent(Button).normalSprite;
        } else {
            _buttonNode.getComponent(Sprite).spriteFrame = _buttonNode.getComponent(Button).disabledSprite;
        }
    }

    private InfoPopupActive(_active: boolean): void {
        const infoButton: Node = this.node.getChildByName('infoButton');
        const infoPage: Node = this.infoPageNode.getChildByName('page');
        const scrollView = infoPage.getComponent(ScrollView);

        if (_active) {
            this.infoPageNode.active = true;
            infoPage.setScale(new Vec3(0.3, 0.3, 1));
            infoPage.setPosition(infoButton.getPosition());

            tween(infoPage)
                .to(0.4, { scale: Vec3.ONE, position: Vec3.ZERO }, { easing: 'backOut' })
                .call(() => {
                    scrollView?.scrollTo(Vec2.ONE, 0.1);
                    const icon = infoPage.getChildByName('Header').children[0];
                    icon.setScale(Vec3.ONE);
                    tween(icon)
                        .to(0.15, { scale: new Vec3(1.2, 0.8, 1) }, { easing: 'quadOut' })
                        .to(0.15, { scale: new Vec3(0.8, 1.2, 1) }, { easing: 'quadOut' })
                        .to(0.1, { scale: new Vec3(1.1, 0.9, 1) }, { easing: 'quadOut' })
                        .to(0.1, { scale: Vec3.ONE }, { easing: 'backOut' })
                        .start();

                }).start();

        } else {
            tween(infoPage)
                .to(0.3, { scale: new Vec3(0.3, 0.3, 1), position: infoButton.getPosition() }, { easing: 'backIn' })
                .call(() => {
                    this.infoPageNode.active = false;
                }).start();
        }
    }

    CursorHand(_isEnable: boolean): void {
        const backButton: Node = this.node.getChildByName('BackButton');
        const soundButton: Node = this.node.getChildByName('SoundButton');
        const infoButton: Node = this.node.getChildByName('infoButton');
        const buttons: Node[] = [
            backButton, soundButton, infoButton
        ];

        this.AddOrRemoveCursorEvent(buttons, _isEnable);
    }

    private AddOrRemoveCursorEvent(_buttons: Node[], _isEnable: boolean): void {
        for (let i = 0; i < _buttons.length; i++) {
            const btn = _buttons[i];
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
    }
    //#endregion

    //#region StarRatingSaveForMultiplayer
    StarRatingSaveForMultiplayer(): void {
        const gameManager = GameManager.instance;
        let lifeTimeScore = Constant.GameData["life_time_score"];
        lifeTimeScore += gameManager.StarsAchieved();
        Constant.GameData["life_time_score"] = lifeTimeScore;
        let currTime = Date.now();
        const time = (currTime - gameManager.initialTimer) / 1000;
        gameManager.initialTimer = Date.now();
        const leftimeScore = Constant.GameData['life_time_score'];
        PlayzhubEventHandler.GameScoreUpdate(time.toFixed(0), leftimeScore.toString());
        gameManager.UpdateGameState();
    }
    //#endregion

    protected onDisable(): void {
        this.CursorHand(false);
    }
}