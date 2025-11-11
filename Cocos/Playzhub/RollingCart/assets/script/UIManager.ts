/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 23-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 28-08-2024
 * @Description :- All UI Controll in one place.
 ************************************/
import { _decorator, Button, Component, director, Node, EventTarget, RichText, sys, Animation, Prefab, instantiate, Vec3, Sprite, game, log } from 'cc';
import { ScoreManager } from './ScoreManager';
import { Distance } from './Distance';
import { StarAnimation } from './StarAnimation';
import { SoundManager } from './SoundManager';
import { DataScript } from './DataScript';
import { PlayzhubEventHandler } from './PlayzhubEventHandler';
import { Server } from './Server';
import { AdManager } from './AdManager';
import GA from 'gameanalytics';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    //#region -Fields
    events = new EventTarget();
    canvas = null;
    @property(Node) exitButtonNode: Node = null;
    @property(Node) soundButtonNode: Node = null;
    @property(Node) moveButton: Node = null;

    @property(Node) scoreManger: Node = null;
    @property(Node) distanceClass: Node = null;
    @property(Node) exitPanel: Node = null;
    @property(Node) gameOverPanel: Node = null;

    @property(Node) starSpawnPoint: Node = null;
    @property(Node) starNode: Node = null;

    exitButton: Button = null;
    soundButton: Button = null;

    @property(RichText) coinText: RichText = null;
    @property(RichText) startCollectedText: RichText = null;
    @property(RichText) totalDistanceCoveredText: RichText = null;

    @property(Node) transitionSprite: Node = null;
    @property(Prefab) starPrefabs: Prefab = null;

    starArrayUI: Node[] = [];
    isSoundOn: Boolean = true;
    globalData: Node = null;
    gameID: string = null;
    totalGivenTime: number = 0;

    //#endregion

    //#region  - OnEnable
    protected onEnable(): void {
        this.events.once("GameOver", this.OnGameOver, this);
        this.exitButton = this.exitButtonNode.getComponent(Button);
        this.soundButton = this.soundButtonNode.getComponent(Button);
        //Transition effect for start scene.
        this.TransitionEffect();
        if (!SoundManager.instance.playSoundState)
            this.soundButton.node.getComponent(Sprite).spriteFrame = this.soundButton.disabledSprite;
        else
            this.soundButton.node.getComponent(Sprite).spriteFrame = this.soundButton.normalSprite;

        this.canvas = document.getElementById("GameCanvas");
        this.CursorPointerEffect();
        this.OnOrientationChange();
    }
    //#endregion

    //#region - start
    start() {
        this.globalData = director.getScene().getChildByName("Data");
        this.gameID = this.globalData.getComponent(DataScript).GetGameID();
        this.exitPanel.active = false;
        this.gameOverPanel.active = false;
        this.UIAnimation();
        this.UICoinSpawn();
        // this.totalGivenTime = this.globalData.getComponent(DataScript).GetTotalTime();
        this.globalData.getComponent(DataScript).StartTimer();

        PlayzhubEventHandler.GameScoreFetch(this.OnGameScoreFetch.bind(this));

    }
    //#endregion

    //#region -OnOrientationChange
    OnOrientationChange(): void {
        const orientation = director.getScene().getChildByName('UICanvas').getChildByName('Orientation');
        if (screen.orientation.type === 'portrait-primary') {
            orientation.active = true;
        } else {
            orientation.active = false;
        }
    }
    //#endregion

    //#region - OnExitButtonClicked
    /**
     * @description - Action of exit button clicked
     */
    async OnExitButtonClick(): Promise<void> {
        GA.GameAnalytics.addDesignEvent("ui:back_clicked");
        await this.ShowAd();
        SoundManager.instance.PlayButtonClickSound();
        this.exitPanel.active = true;
        director.pause();
    }
    //#endregion

    //#region - OnExitAccepted
    /**
     * @description - Exit from game
     */
    OnExitAccepted(): void {
        GA.GameAnalytics.addDesignEvent("ui:menu_clicked");
        SoundManager.instance.PlayButtonClickSound();
        let usedTime: number = this.globalData.getComponent(DataScript).GetTimer();
        let score: number = this.distanceClass.getComponent(Distance).GetDistanceWithStars();
        let starCollected: number = this.scoreManger.getComponent(ScoreManager).getStars();
        PlayzhubEventHandler.GamePlayStopped(usedTime.toFixed(0));
        director.resume();
        director.loadScene("PreloadScene");
    }
    //#endregion

    //#region - OnExitDenie
    /**
     * @description - On Exit Cancel
     */
    OnExitDenie(): void {
        SoundManager.instance.PlayButtonClickSound();
        director.resume();
        this.exitPanel.active = false;
    }
    //#endregion

    //#region  - OnGameOver
    /**
     * @description - Action of game over, gameover panel enabled.
     */
    async OnGameOver(): Promise<void> {
        await this.ShowAd();
        let starCollected: number = this.scoreManger.getComponent(ScoreManager).getStars();
        this.startCollectedText.string = "Star Collected : " + starCollected;
        this.totalDistanceCoveredText.string = "Distance Covered : " + this.distanceClass.getComponent(Distance).getDistance().toFixed(0) + "m";
        director.pause();
        this.gameOverPanel.active = true;
        SoundManager.instance.PlayGameOverSound();
        let usedTime: number = this.globalData.getComponent(DataScript).GetTimer();
        PlayzhubEventHandler.GameScoreUpdate(usedTime.toFixed(0), starCollected.toFixed(0))
        console.log('starCollected: ', starCollected);
        console.log('starCollected 0: ', starCollected.toFixed(0));

        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "rolling_cart_endless",
            undefined,
            undefined,
            starCollected
        );
        GA.GameAnalytics.addDesignEvent("score:rolling_cart", starCollected);
    }
    //#endregion

    //#region -OnGameScoreFetch
    /**
     * @description -Fetch by platform.
     */
    OnGameScoreFetch(): void {
        let starCollected: number = this.scoreManger.getComponent(ScoreManager).getStars();
        let usedTime: number = this.globalData.getComponent(DataScript).GetTimer();
        PlayzhubEventHandler.GameScoreUpdate(usedTime.toFixed(0), starCollected.toFixed(0))
    }
    //#endregion

    //#region  - OnSoundButtonClicked
    /**
     * @description - control sounds here.
     */
    OnSoundClick(): void {
        GA.GameAnalytics.addDesignEvent("ui:sound_clicked");
        SoundManager.instance.PlayButtonClickSound();
        SoundManager.instance.SetSoundState();
        if (!SoundManager.instance.playSoundState)
            this.soundButton.node.getComponent(Sprite).spriteFrame = this.soundButton.disabledSprite;
        else
            this.soundButton.node.getComponent(Sprite).spriteFrame = this.soundButton.normalSprite;

        SoundManager.instance.PlayBackgroundMusic();
    }
    //#endregion

    //#region -Transition Effect
    async TransitionEffect() {
        this.transitionSprite?.getComponent(Animation).play("fadeIn");
        await this.Sleep(3);
        if (this.transitionSprite)
            this.transitionSprite.active = false;
    }
    //#endregion

    //#region -Sleep
    /**
     * @description - For execution pause in async await function.
     * @param _seconds - execution pause time in second
     * @returns 
     */
    Sleep(_seconds: number) {
        return new Promise((e) => setTimeout(e, _seconds * 1000));
    }
    //#endregion

    //#region  - ScoreUpdate
    /**
     * @description - Called in Score Manger for update star qty in UI.
     * @param score - recieved stars qty from score manager.
     */
    ScoreUpdate(score: number): void {
        this.coinText.string = score.toString();
        this.starNode.getComponent(Animation).play();
    }
    //#endregion

    //#region - Restart Game
    /**
     * @description - Restart game by reload scene.
     */
    async RestartGame(): Promise<void> {
        SoundManager.instance.PlayButtonClickSound();
        // await this.ShowAd();

        const dataScript: DataScript = this.globalData?.getComponent(DataScript);
        dataScript.NumberOfPlayIncreament();
        const numberOfPlays: number = dataScript.GetNumberOfPlay();
        // this.PostGameFrequencyToParent(numberOfPlays.toString());
        PlayzhubEventHandler.GamePlayStarted(numberOfPlays.toString());

        director.resume();
        director.loadScene('GameScene');
    }
    //#endregion

    //#region -OnReplayClick
    async OnReplayClick(): Promise<void> {
        GA.GameAnalytics.addDesignEvent("ui:replay_clicked");
        SoundManager.instance.PlayButtonClickSound();
        await this.ShowAd();
        // let starCollected: number = this.scoreManger.getComponent(ScoreManager).getStars();
        // let usedTime: number = this.globalData.getComponent(DataScript).GetTimer();
        // this.PostGamePlayTimeToParent(usedTime.toFixed(0), starCollected.toFixed(0).toString());
        director.resume();
        director.loadScene('PreloadScene');
    }
    //#endregion

    //#region -UIAnimation
    UIAnimation(): void {
        this.exitButtonNode.getComponent(Animation).play();
        this.soundButton.getComponent(Animation).play();
        this.moveButton.getComponent(Animation).play();
    }
    //#endregion

    //#region -UICoinSpawn
    UICoinSpawn(): void {
        for (let i: number = 0; i < 10; i++) {
            let star: Node = instantiate(this.starPrefabs);
            star.setPosition(this.starSpawnPoint.getPosition());
            star.setParent(this.starSpawnPoint);
            star.active = false;
            this.starArrayUI.push(star);
        }
    }
    //#endregion

    //#region -CursorPointerEffect
    CursorPointerEffect(): void {
        this.canvas.style.cursor = "default";
        //exit panel
        let yesButton = this.exitPanel.getChildByName("yesButton");
        let noButton = this.exitPanel.getChildByName("noButton");
        //game over panel
        let replayButton = this.gameOverPanel.getChildByName("replayButton");
        let exitButton = this.gameOverPanel.getChildByName("ExitButton");

        let buttonArray: Node[] = [];

        buttonArray.push(this.exitButtonNode, this.soundButtonNode, this.moveButton.children[0], this.moveButton.children[1], yesButton, noButton, replayButton, exitButton);

        buttonArray.forEach((_buttons: Node, _index: number) => {
            _buttons.on(Node.EventType.MOUSE_ENTER, () => {
                this.canvas.style.cursor = "pointer";
            })
            _buttons.on(Node.EventType.MOUSE_LEAVE, () => {
                this.canvas.style.cursor = "default";
            })
        })
    }
    //#endregion

    //#region -StarCollectAnimation
    StarCollectAnimation(_starPosition: Vec3): void {
        let tempStar: Node = this.starArrayUI.shift();
        if (tempStar) {
            tempStar.active = true;
            tempStar.setPosition(new Vec3(0, _starPosition.y));
            tempStar.getComponent(StarAnimation).Play();
        }
        setTimeout(() => {
            tempStar.active = false;
            tempStar.getComponent(StarAnimation).Stop();
            this.starArrayUI.push(tempStar);
        }, 1000)
    }

    async RequestAdAsync(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                PlayzhubEventHandler.AdStarted(() => {
                    GA.GameAnalytics.addDesignEvent("ad:started");
                    PlayzhubEventHandler.GamePlayPaused();
                    console.info("Ad started, game paused!");
                    director.pause();
                });

                PlayzhubEventHandler.AdCompleted(() => {
                    GA.GameAnalytics.addDesignEvent("ad:completed");
                    PlayzhubEventHandler.GamePlayResumed();
                    console.info("Ad completed, game resumed!");
                    director.resume();
                    resolve();
                });
                Server.isListenerRegister = true;
                PlayzhubEventHandler.RequestAD();
            } catch (e) {
                reject(e);
            }
        });
    }

    async ShowAd(onClompleteAdsCallback?: () => void) {
        const adManager = AdManager.getInstance();
        try {
            GA.GameAnalytics.addDesignEvent('ad:requested');
            if (onClompleteAdsCallback) {
                await adManager.RequestAdAsync(1000, onClompleteAdsCallback);
            } else {
                await adManager.RequestAdAsync();
            }
            PlayzhubEventHandler.GamePlayResumed();
            console.info("Ad completed, game resumed!");
            director.resume();
        } catch (e) {
            console.error("Ad error:", e);
        }
    }
}


