import { _decorator, Animation, Button, Component, EventTouch, director, EventTarget, Label, Node, Sprite, tween, Vec3 } from 'cc';
import { GameManager } from './GameManager';
import { Score } from './Score';
import { SoundManager } from './SoundManager';
import { InfoPage } from './InfoPage';
import { PlayzhubEventHandler } from './PlayzhubEventHandler';
import { AdManager } from './AdManager';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    public event = new EventTarget();
    @property(Node) gameOverPopup: Node;
    @property(Node) gameExitPopup: Node;
    @property(Node) infoPage: Node;

    @property(Node) soundButton: Node;
    @property(Node) exitButton: Node;
    @property(Node) buyBuildingPopup: Node;
    @property(Node) specialCoinButton: Node;

    isGamePause: boolean = false;
    isGameOver: boolean = false;

    @property(Node) scoreManagerNode: Node;
    scoreManager: Score;

    timer: number = 0;
    @property(Node) timerText: Node;
    exitPopupForTween: Node = null;
    gameOverPopupForTween: Node = null;
    buyBuildingPopupForTween: Node = null;
    coinTextGameOver: Node = null;
    timeTextGameOver: Node = null;
    isTimerStart: boolean = false;
    timeOutVariable = null;

    //#region -onEnable
    protected onEnable(): void {
        this.gameOverPopup = this.node.getChildByName("GameOverPopup");
        this.gameExitPopup = this.node.getChildByName("GameQuitPopup");
        this.exitPopupForTween = this.gameExitPopup.getChildByName("popup");
        this.gameOverPopupForTween = this.gameOverPopup.getChildByName("popup");
        this.buyBuildingPopupForTween = this.buyBuildingPopup.getChildByName("popup");
        this.coinTextGameOver = this.gameOverPopupForTween.getChildByName("CoinText");
        this.timeTextGameOver = this.gameOverPopupForTween.getChildByName("TimeText");
        this.event.once("gameOver", this.OnGameOver, this);
        this.scoreManager = this.scoreManagerNode.getComponent(Score);
        this.infoPage.active = true;

        this.OnOrientationChange();
    }
    //#endregion

    //#region -start
    protected start(): void {
        this.gameOverPopup.active = false;
        this.gameExitPopup.active = false;
        this.buyBuildingPopup.active = false;
        this.soundButton.active = true;
        this.exitButton.active = true;
        this.exitButton.getComponent(Button).interactable = false;
        this.soundButton.getComponent(Button).interactable = false;
        this.specialCoinButton.getComponent(Button).interactable = false;
        // this.timer = GameManager.gameManager.timeToEnd;
        PlayzhubEventHandler.GameScoreFetch(() => {
            PlayzhubEventHandler.GameScoreUpdate(this.timer.toFixed(0), this.scoreManager.GetScore().toString());
        })

        PlayzhubEventHandler.AdStarted(() => {
            GA.GameAnalytics.addDesignEvent("ad:started");
            PlayzhubEventHandler.GamePlayPaused();
            director.pause();
        });
        // PlayzhubEventHandler.AdCompleted(() => {
        //     PlayzhubEventHandler.GamePlayResumed();
        //     director.resume();
        // })
    }
    //#endregion

    //#region -Update
    protected update(dt: number): void {
        if (this.isTimerStart && !this.isGameOver) {
            this.timer += dt;
        }
        this.TimerTextUpdate(this.timer);
    }
    //#endregion

    //#region -OnClickGamePause
    OnClickGamePause(): void {
        this.isGamePause = true;
        this.exitButton.active = false;
        this.soundButton.active = false;
        SoundManager.instance.PlayButtonSound();
        director.pause();
    }
    //#endregion

    //#region -OnClickGameResume
    OnClickGameResume(): void {
        GA.GameAnalytics.addDesignEvent('ui:quit_no_clicked');

        tween(this.exitPopupForTween).to(0.3, { scale: new Vec3(0.2, 0.2, this.exitPopupForTween.getScale().z) }, {
            easing: 'cubicOut', onStart: (_target: Node) => {
                _target.getComponent(Animation).play("AlphaClose");
            }
        }).call(() => {
            this.isGamePause = false;
            this.gameExitPopup.active = false;
            this.soundButton.getComponent(Button).interactable = true;
            this.exitButton.getComponent(Button).interactable = true;
            this.specialCoinButton.getComponent(Button).interactable = true;
        }).start();
        SoundManager.instance.PlayButtonSound();
        director.resume();
    }
    //#endregion

    //#region -OnClickGameExit
    async OnClickGameExit(): Promise<void> {
        GA.GameAnalytics.addDesignEvent('ui:back_clicked');
        await this.ShowAd();
        this.exitPopupForTween.setScale(0.1, 0.1);
        this.gameExitPopup.active = true;
        tween(this.exitPopupForTween).to(0.3, { scale: new Vec3(1, 1, this.exitPopupForTween.getScale().z) }, {
            easing: 'cubicIn', onStart: (_target: Node) => {
                _target.getComponent(Animation).play("AlphaOpen");
            }
        }).start();
        this.isGamePause = true;
        this.exitButton.getComponent(Button).interactable = false;
        this.soundButton.getComponent(Button).interactable = false;
        this.specialCoinButton.getComponent(Button).interactable = false;
        SoundManager.instance.PlayButtonSound();
        // director.pause();
    }
    //#endregion

    //#region -OnBackButtonClick
    OnBackButtonClick(): void {
        SoundManager.instance.PlayButtonSound();
        // GameManager.gameManager.SendMessage(this.scoreManager.GetScore().toString());
    }
    //#endregion

    //#region -GameQuit
    GameQuit(event: EventTouch): void {
        const currentTarget: Node = event.currentTarget;
        if (currentTarget.name === 'YesButton') {
            GA.GameAnalytics.addDesignEvent('ui:quit_yes_clicked');
        } else {
            GA.GameAnalytics.addDesignEvent('ui:menu_clicked');
        }

        SoundManager.instance.StopBackgroundMusic();
        SoundManager.instance.PlayGameEnd();
        this.isGamePause = true;
        // GameManager.gameManager.PostGameOuitToParent(this.timer.toFixed(0), this.scoreManager.GetScore().toString());
        PlayzhubEventHandler.GamePlayStopped(this.timer.toFixed(0));
        director.resume();
        director.loadScene("SplashScene");
    }
    //#endregion

    //#region -RestartGame
    async RestartGame(): Promise<void> {
        GA.GameAnalytics.addDesignEvent('ui:replay_clicked');
        const gameManager = GameManager.gameManager;
        gameManager.IncreamentOfStartButtonClicked();
        PlayzhubEventHandler.GamePlayStarted(gameManager.numberOfPlayButtonClicked);
        director.resume();
        director.loadScene("GameScene");
    }
    //#endregion

    //#region -OnGameOver
    async OnGameOver(): Promise<void> {
        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "merge_city_endless",
            undefined,
            undefined,
            this.scoreManager.GetScore()
        );

        GA.GameAnalytics.addDesignEvent("score:merge_city", this.scoreManager.GetScore());

        this.GameOverTimerAndCoinUpdate(this.timer);
        await this.ShowAd();
        this.gameOverPopupForTween.setScale(0.1, 0.1, this.gameOverPopupForTween.getScale().z);
        this.gameOverPopup.active = true;
        tween(this.gameOverPopupForTween).to(0.3, { scale: new Vec3(1, 1, this.gameOverPopupForTween.getScale().z) }, {
            easing: 'cubicIn', onStart: (_target: Node) => {
                _target.getComponent(Animation).play("AlphaOpen");
            }
        }).start();
        this.soundButton.getComponent(Button).interactable = false;
        this.exitButton.getComponent(Button).interactable = false;
        SoundManager.instance.StopBackgroundMusic();
        SoundManager.instance.PlayGameEnd();
        this.isGamePause = true;
        // GameManager.gameManager.PostGamePlayTimeToParent(this.timer.toFixed(0), this.scoreManager.GetScore().toString());
        PlayzhubEventHandler.GameScoreUpdate(this.timer.toFixed(0), this.scoreManager.GetScore().toString());
        this.timeOutVariable = setTimeout(() => {
            director.pause();
        }, 1000);
    }
    //#endregion

    //#region -OnSpecialCounUseButtonClick
    OnSpecialCounUseButtonClick(): void {
        GA.GameAnalytics.addDesignEvent('ui:building_buy_powerup_clicked');
        this.buyBuildingPopupForTween.setScale(0.1, 0.1);
        this.isGamePause = true;
        this.buyBuildingPopup.active = true;
        tween(this.buyBuildingPopupForTween).to(0.3, { scale: new Vec3(1, 1, this.buyBuildingPopupForTween.getScale().z) }, {
            easing: 'cubicIn', onStart: (_target: Node) => {
                _target.getComponent(Animation).play("AlphaOpen");
            }
        }).start();
        this.exitButton.getComponent(Button).interactable = false;
        this.soundButton.getComponent(Button).interactable = false;
        SoundManager.instance.PlayButtonSound();
    }
    //#endregion

    //#region -BuildingBuyPopCloseButton
    BuildingBuyPopCloseButton(): void {
        tween(this.buyBuildingPopupForTween).to(0.3, { scale: new Vec3(0.2, 0.2, this.buyBuildingPopupForTween.getScale().z) }, {
            easing: 'cubicOut', onStart: (_target: Node) => {
                _target.getComponent(Animation).play("AlphaClose");
            }
        }).call(() => {
            this.isGamePause = false;
            this.buyBuildingPopup.active = false;
            this.exitButton.getComponent(Button).interactable = true;
            this.soundButton.getComponent(Button).interactable = true;
        }).start();
        SoundManager.instance.PlayButtonSound();
    }
    //#endregion

    //#region -OnInfoSkip
    OnInfoSkip(): void {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_skip_clicked");
        GameManager.gameManager.CameraStartZoomEffect();
        const currentInfoPage: Node = this.infoPage.getComponent(InfoPage).GetCurrentInfoPage();
        tween(currentInfoPage).to(0.3, { scale: new Vec3(0.2, 0.2, currentInfoPage.getScale().z) }, {
            easing: 'cubicOut', onStart: (_target: Node) => {
                _target.getComponent(Animation).play("AlphaClose");
            }
        }).call(() => {
            this.infoPage.active = false;
            this.exitButton.getComponent(Button).interactable = true;
            this.soundButton.getComponent(Button).interactable = true;
            this.scheduleOnce(() => { this.specialCoinButton.getComponent(Button).interactable = true }, 5);
            // setTimeout(() => { this.specialCoinButton.getComponent(Button).interactable = true }, 5000);
            GameManager.gameManager.gameEvent.emit("infoSkiped");
        }).start();
        SoundManager.instance.PlayButtonSound();
    }
    //#endregion

    //#region -TimerTextUpdate
    TimerTextUpdate(_time: number): void {
        let minute = _time / 60;
        let second = _time % 60;

        let minutes: string = minute < 10 ? "0" + minute.toString() : minute.toString();
        let seconds = second < 10 ? "0" + second.toString() : second.toString();
        this.timerText.getComponent(Label).string = `${parseInt(minutes)} : ${parseInt(seconds)}`;
    }
    //#endregion

    //#region -GameOverTimerAndCoinUpdate
    GameOverTimerAndCoinUpdate(_time: number): void {
        let minute = _time / 60;
        let second = _time % 60;

        let minutes: string = minute < 10 ? "0" + minute.toString() : minute.toString();
        let seconds = second < 10 ? "0" + second.toString() : second.toString();
        this.timeTextGameOver.getComponent(Label).string = `${parseInt(minutes)} : ${parseInt(seconds)}`;

        this.coinTextGameOver.getComponent(Label).string = this.scoreManager.GetScore().toString();
    }
    //#endregion

    //#region -OnSoundButtonClick
    OnSoundButtonClick(): void {
        GA.GameAnalytics.addDesignEvent('ui:sound_clicked');

        SoundManager.instance.PlayButtonSound();
        SoundManager.instance.SetMute();

        if (SoundManager.instance.isMuted) {
            this.soundButton.getComponent(Sprite).spriteFrame = this.soundButton.getComponent(Button).disabledSprite;
        } else {
            this.soundButton.getComponent(Sprite).spriteFrame = this.soundButton.getComponent(Button).normalSprite;
        }

        SoundManager.instance.CheckBackgroundMusicEnable();
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

    async ShowAd(onCompleteAdsCallback?: () => void) {
        const adManager = AdManager.getInstance();
        try {
            GA.GameAnalytics.addDesignEvent('ad:requested');
            if (onCompleteAdsCallback) {
                await adManager.RequestAdAsync(1000, onCompleteAdsCallback);
            } else {
                await adManager.RequestAdAsync();
            }

            PlayzhubEventHandler.GamePlayResumed();
            console.info("Ad completed, game resumed!");
            GA.GameAnalytics.addDesignEvent("ad:completed");
            director.resume();
        } catch (e) {
            console.error("Ad error:", e);
        }
    }

    //#region -onDisable
    protected onDisable(): void {
        if (this.timeOutVariable)
            clearTimeout(this.timeOutVariable);
    }
    //#endregion
}


