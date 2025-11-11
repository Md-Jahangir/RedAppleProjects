import { _decorator, Button, Color, Component, director, Node, SceneAsset, sp, Sprite, tween, Vec3, view } from 'cc';
import { GameManager } from '../GameManager';
import { AnimationManager } from '../Utils/AnimationManager';
import { Constant } from '../globals/Constant';
import { SoundManager } from '../SoundManager';
import { PlayzhubEventHandler } from '../platform_sdk/PlayzhubEventHandler';
import { Server } from '../platform_sdk/Server';
import { HTML_Bridge } from '../../@types/HTML-Bridge';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('LoadSceneScript')
export class LoadSceneScript extends Component {

    //#region -Fields
    @property(Node) startButton: Node = null;
    @property(Node) progressBaseNode: Node = null;
    @property(sp.Skeleton) backgroundSpine: sp.Skeleton = null;
    @property(Node) splashBackground: Node = null;
    progressBarSprite: Sprite;

    canvas = null;
    persistNode: Node = null;

    //Playzhub variable
    gameDataFromPlatform: Object = {
        "game_score": 0, // lotus point
        "total_levels": 0,
        "last_level_played": 0,
        "game_collectibles": {
            "time_bonus": 0,
            "bonus": 0,
            "hint": 5,
            "buzzit": 5,
            "hint_cost": 100,
            "buzzit_cost": 100
        }
    }
    private currentLevelStart: number = 0;
    private lotusPoint: number = 0;
    private timeBonus: number = 0;
    private hint: number = 5;
    private buzzit: number = 5;
    private hintCost: number = 100;
    private buzzitCost: number = 50;
    private initialized = false;
    //#endregion

    initializeAnalytics(): void {
        if (this.initialized) return;

        const GAME_KEY = '5c34927cfdd253980a8ef4279a5970b6';
        const SECRET_KEY = 'afcb8c0977eeccf0abd087faee170422cf524695';

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
            //Requesting Data from Platform
            PlayzhubEventHandler.RequestGameState();
            PlayzhubEventHandler.ReceivedGameState(this.UpdateGameVariable.bind(this));

            this.PreloadGameScene();
        });
    }
    //#region -onEnable
    protected onEnable(): void {
        this.canvas = document.getElementById('GameCanvas');
        this.startButton.active = false;
        this.progressBarSprite = this.progressBaseNode.children[0].getComponent(Sprite);
        this.startButton.on(Node.EventType.MOUSE_ENTER, () => {
            this.canvas.style.cursor = "pointer";
        })
        this.startButton.on(Node.EventType.MOUSE_LEAVE, () => {
            this.canvas.style.cursor = "default";
        })
        this.AdjustSpineScale();
        view.on('canvas-resize', this.AdjustSpineScale, this);

        //Persist Node for Sound.
        this.persistNode = director.getScene().getChildByName('PersistNode');
        director.addPersistRootNode(this.persistNode);

        screen.orientation.addEventListener('change', (_data) => {
            this.OnOrientationChange()
        })
        this.OnOrientationChange();
    }
    //#endregion

    //#region start
    protected start(): void {
        //Game Logic perform on game start.
        this.SetAnimationsOnStart();
        GA.GameAnalytics.addDesignEvent("screen:title");
    }
    //#endregion

    //#region PreloadGameScene
    /**
     * @description - Pre loading game scene for reduce time to start game after click start button.
     */
    PreloadGameScene(): void {
        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "game_loading"
        );
        PlayzhubEventHandler.GameLoadingStarted();
        director.preloadScene("GameScene", (completeCount, totalCount, items) => { // Onloading progress
            const percent = completeCount / totalCount;
            this.progressBarSprite.fillRange = percent;
        }, (err, _scene: SceneAsset) => { // Onloading Complete
            const progressBarAlpha = this.progressBaseNode.getComponent(Sprite);
            tween(progressBarAlpha).to(0.5, { color: new Color(255, 255, 255, 0) }, { easing: 'smooth' }).call(() => {
                this.startButton.active = true;
                const currPos: Vec3 = this.startButton.getPosition();
                this.startButton.setScale(0.2, 0.2, 1)
                tween(this.startButton).to(1, { position: new Vec3(currPos.x, -355, currPos.z), scale: new Vec3(1, 1, 1) }, { easing: 'backOut' }).start();;
            }).start();

            GA.GameAnalytics.addProgressionEvent(
                "Complete",
                "game_loading"
            );
            PlayzhubEventHandler.GameLoadingCompleted();
        })
    }
    //#endregion

    //#region SetAnimationsOnStart
    /**
     * @description - Splash page animation setup and control.
     */
    SetAnimationsOnStart(): void {
        this.backgroundSpine.setCompleteListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name == "appear") {
                this.backgroundSpine.setAnimation(0, "idle", true);
            }
        })
        this.backgroundSpine.setAnimation(0, 'appear', false);
    }
    //#endregion

    //#region -SetCurrentLevel
    /**
     * @description - while select level.
     * @param _currLevel 
     */
    SetCurrentLevel(_currLevel: number): void {
        this.currentLevelStart = _currLevel;
    }
    //#endregion

    //#region -OnstartButtonClick
    /**
     * @description - Go to game scene, game starts from here.
     */
    OnstartButtonClick(): void {
        GA.GameAnalytics.addDesignEvent("ui:play_clicked");
        this.startButton.getComponent(Button).interactable = false;
        Server.NumberOfPlayButtonClickedIncreament();
        PlayzhubEventHandler.GamePlayStarted(Server.numberOfPlayButtonClicked);

        AnimationManager.ButtonsInteractiveAnim(this.startButton, Constant.BUTTON_ANIMATION_TIME_DURATION, () => {
            director.loadScene("GameScene", () => {
                GameManager.instance.SetGameDataFromServer(this.currentLevelStart, this.lotusPoint, this.timeBonus, 0, this.hint, this.buzzit, this.hintCost, this.buzzitCost);
            })
        })
        SoundManager.instance.ButtonClickSound();
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

    //#region -UpdateGameVariable
    /**
     * @description - update game variable.
     * @param data 
     */
    UpdateGameVariable(data) {
        try {
            this.gameDataFromPlatform = this.ParseData(data);
            this.currentLevelStart = this.gameDataFromPlatform["last_level_played"] ? this.gameDataFromPlatform["last_level_played"] : 0;
            this.lotusPoint = this.gameDataFromPlatform["game_score"] ? this.gameDataFromPlatform["game_score"] : 0;
            this.timeBonus = this.gameDataFromPlatform["game_collectibles"]["time_bonus"] ? this.gameDataFromPlatform["game_collectibles"]["time_bonus"] : 0;
            this.hint = this.gameDataFromPlatform["game_collectibles"]["hint"] ? this.gameDataFromPlatform["game_collectibles"]["hint"] : 5
            this.buzzit = this.gameDataFromPlatform["game_collectibles"]["buzzit"] ? this.gameDataFromPlatform["game_collectibles"]["buzzit"] : 5;
            this.hintCost = this.gameDataFromPlatform["game_collectibles"]["hint_cost"] ? this.gameDataFromPlatform["game_collectibles"]["hint_cost"] : Constant.HINT_COST_INCREAMENT;
            this.buzzitCost = this.gameDataFromPlatform["game_collectibles"]["buzzit_cost"] ? this.gameDataFromPlatform["game_collectibles"]["buzzit_cost"] : Constant.BUZZIT_COST_INCREAMENT;
        } catch (error) {
            this.ResetGameData();
        }
    }
    //#endregion

    //#region ResetGameData
    /**
     * @description - Reset if game data recieve null from platform.
     */
    ResetGameData(): void {
        this.currentLevelStart = 0;
        this.lotusPoint = 0;
        this.timeBonus = 0;
        this.hint = 5;
        this.buzzit = 5;
        this.hintCost = Constant.HINT_COST_INCREAMENT;
        this.buzzitCost = Constant.BUZZIT_COST_INCREAMENT;
    }
    //#endregion

    //#region ParseData
    /**
     * @description -Converts recieved data from platform if, is not Object;
     * @param data 
     * @returns 
     */
    ParseData(data) {
        let _data = data;
        if (typeof data !== 'object') {
            _data = JSON.parse(data);
        }
        return _data;
    }
    //#endregion

    //#region AdjustSpineScale
    /**
     * @description - Spine need scale for responsive
     * @returns 
     */
    AdjustSpineScale() {
        if (!this.splashBackground) return;

        const scaleRatio = view.getVisibleSize().width / 1920;
        this.splashBackground.setScale(scaleRatio, 1, 1);
    }
    //#endregion

    //#region onDisable
    protected onDisable(): void {
        view.off('canvas-resize', this.AdjustSpineScale, this);
    }
    //#endregion
}