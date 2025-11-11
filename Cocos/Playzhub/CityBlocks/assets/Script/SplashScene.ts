import { _decorator, Animation, Button, Component, director, Label, Node, randomRange, tween, UITransform, Vec3 } from 'cc';
import { Server } from './Server';
import { GameManager } from './GameManager';
import { SoundManager } from './SoundManager';
import { PlayzhubEventHandler } from './PlayzhubEventHandler';
import { HTML_Bridge } from '../@types/HTML-Bridge';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('SplashScene')
export class SplashScene extends Component {
    data: Node = null;
    timeToEnd: number = null;
    timer: number = 0;
    gameID: string = null;

    @property(Node) timerNode: Node = null;
    timerText: Label = null;
    @property(Node) playButton: Node = null;

    @property(Node) cloudStatic: Node = null;
    @property(Node) cloudDynamic: Node = null;
    @property(Node) preloadBg: Node = null;
    @property(Node) alphabets: Node = null;
    @property(Node) alphabetsArray: Node[] = [];
    alphabetsYPosition: number[] = [120, 117, 137, 132, 130, -51, -48, -48, -42.5];
    private initialized = false;

    initializeAnalytics(): void {
        if (this.initialized) return;

        const GAME_KEY = '3e232c428f0df95d8832467706801415';
        const SECRET_KEY = '3e7ae882d14b08d7c46252abd53c53293a310349';

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
        });
    }
    //#region -Enable
    protected onEnable(): void {
        this.data = director.getScene().getChildByName("Data");
        director.addPersistRootNode(this.data);

        this.timerText = this.timerNode.children[0].getComponent(Label);
        this.alphabets.children.forEach((_alphabets: Node, _index: number) => {
            _alphabets.active = false;
        })

        screen.orientation.addEventListener('change', (_data) => {
            this.OnOrientationChange()
        })
        this.OnOrientationChange();
    }
    //#endregion

    //#region -OnOrientationChange
    OnOrientationChange(): void {
        const orientation = director.getScene().getChildByName('Canvas').getChildByName('Orientation');
        if (screen.orientation.type === 'portrait-primary') {
            orientation.active = true;
            const bgWidth: number = orientation.getComponent(UITransform).width;
            const bgHeight: number = orientation.getComponent(UITransform).height;

            const screenRatio: number = screen.availWidth / screen.availHeight;
            const targetRatio: number = bgWidth / bgHeight;
            const differenceInSize: number = targetRatio / screenRatio;
            const scaleMultiplier: number = 1 + differenceInSize;

            orientation.getComponent(UITransform).setContentSize(bgWidth * scaleMultiplier, bgHeight * scaleMultiplier);
            console.log(orientation.getComponent(UITransform).width, orientation.getComponent(UITransform).height);


        } else {
            orientation.active = false;
            orientation.getComponent(UITransform).height = 1920;
            orientation.getComponent(UITransform).width = 1080;
        }
    }
    //#endregion

    //#region -Start
    start() {
        GA.GameAnalytics.addDesignEvent("screen:title");
        try {
            this.gameID = Server.gameID;
        } catch (error) {
            // console.log(error);
        } finally {
            // this.timeToEnd ? this.timeToEnd = parseFloat(Server.server.timerValue) : this.timeToEnd = 180;
        }
        // this.timer = this.timeToEnd;
        this.BackgroundResponsive();
        this.StaticCloudAnimation(this.cloudStatic);
        this.cloudDynamic.children.forEach((_cloud: Node, _index: number) => {
            this.DynamicCloudAnimation(_cloud, 10);
        })
        setTimeout(() => {
            this.AlphabetTween(0);
        }, 500);
    }
    //#endregion

    //#region -Update
    protected update(dt: number): void {
        // if (this.timer <= 0) {
        //     console.log("timeEnd");
        // }
        // else {
        //     this.timer -= dt;
        // }
        // this.TimerTextUpdate(this.timer);
    }
    //#endregion

    //#region -GetTimer
    GetTimer(): number {
        return this.timer;
    }
    //#endregion

    //#region -TimerTextUpdate
    TimerTextUpdate(_time: number): void {
        let minute = _time / 60;
        let second = _time % 60;

        let minutes: string = minute < 10 ? "0" + minute.toString() : minute.toString();
        let seconds = second < 10 ? "0" + second.toString() : second.toString();
        this.timerText.string = `${parseInt(minutes)} : ${parseInt(seconds)}`;
    }
    //#endregion

    //#region -OnStartButtonClick
    OnStartButtonClick(): void {
        GA.GameAnalytics.addDesignEvent("ui:play_clicked");
        GameManager.gameManager.IncreamentOfStartButtonClicked();
        this.SetInitialGameData(this.GetTimer());
        // GameManager.gameManager.PostGameFrequencyToParent();
        const gameManager = GameManager.gameManager;
        PlayzhubEventHandler.GamePlayStarted(gameManager.numberOfPlayButtonClicked);
        this.playButton.getComponent(Button).interactable = false;
        this.playButton.getComponent(Animation).stop();
        this.playButton.children[0].active = false;
        SoundManager.instance.PlayButtonSound();
        director.loadScene("GameScene");
    }
    //#endregion

    //#region -SetInitialGameData
    SetInitialGameData(_time: number): void {
        GameManager.gameManager.SetInitialData(this.gameID);
    }
    //#endregion

    //#region -DynamicCloudAnimation
    DynamicCloudAnimation(_targetNode: Node, _time: number): void {
        const startNodePosition: Vec3 = _targetNode.getPosition();
        tween(_targetNode)
            .to(_time, { position: new Vec3(startNodePosition.x + 100, startNodePosition.y - 150, startNodePosition.z) }, { easing: 'sineIn' })
            .to(_time, { position: startNodePosition }, { easing: 'sineOut' })
            .union()
            .repeatForever()
            .start();
    }
    //#endregion

    //#region -StaticCloudAnimation
    StaticCloudAnimation(_targetNode: Node): void {
        const startNodePosition: Vec3 = _targetNode.getPosition();
        tween(_targetNode)
            .to(10, { position: new Vec3(startNodePosition.x + 20, startNodePosition.y - 20, startNodePosition.z) })
            .to(10, { position: new Vec3(startNodePosition.x - 20, startNodePosition.y + 20, startNodePosition.z) })
            .union()
            .repeatForever()
            .start();
    }
    //#endregion

    //#region -BackgroundResponsive
    BackgroundResponsive(): void {
        const bgWidth: number = this.preloadBg.getComponent(UITransform).width;
        const bgHeight: number = this.preloadBg.getComponent(UITransform).height;

        const screenRatio: number = window.innerWidth / window.innerHeight;
        const targetRatio: number = bgWidth / bgHeight;
        const differenceInSize: number = targetRatio / screenRatio;
        const scaleMultiplier: number = 1 + differenceInSize / 2;

        // this.preloadBg.getComponent(UITransform).height = bgHeight * scaleMultiplier;
        // this.preloadBg.getComponent(UITransform).width = bgWidth * scaleMultiplier;
        this.preloadBg.setScale(scaleMultiplier, scaleMultiplier);
        this.alphabets.setScale(scaleMultiplier, scaleMultiplier);
    }
    //#endregion

    //#region -AlphabetTween
    AlphabetTween(index: number): void {
        if (index >= this.alphabetsArray.length) {
            this.PlayButtonAnimation();
            GA.GameAnalytics.addProgressionEvent(
                "Complete",
                "game_loading"
            );
            PlayzhubEventHandler.GameLoadingCompleted();
            return;
        }

        let child = this.alphabetsArray[index];
        tween(child)
            .to(0.4, { position: new Vec3(child.getPosition().x, this.alphabetsYPosition[index]) }, {
                easing: 'expoIn',
                onStart: () => {
                    setTimeout(() => {
                        child.active = true;
                    }, 100);
                }
            })
            .call(() => {
                this.AlphabetTween(index + 1);
                this.ShakeEffect();
            })
            .start();
    }
    //#endregion

    //#region -PlayButtonAnimation
    PlayButtonAnimation(): void {
        this.playButton.setScale(1, 0.5, this.playButton.getScale().z);
        tween(this.playButton).to(1, { position: new Vec3(this.playButton.getPosition().x, -372, this.playButton.getPosition().z), scale: new Vec3(1, 1, this.playButton.getScale().z) }, { easing: 'bounceIn' }).call(() => {
            this.playButton.children[0].active = true;
            this.playButton.getComponent(Animation).play();
        }).start();
    }
    //#endregion

    //#region -ShakeEffect
    ShakeEffect(): void {
        const xPos: number = randomRange(-10, 10);
        this.node.setPosition(new Vec3(xPos, -10));
        tween(this.node).to(0.2, { position: new Vec3(0, 0) }, { easing: 'bounceIn' }).start();
    }
    //#endregion
}


