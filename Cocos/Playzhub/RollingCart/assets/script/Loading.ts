/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 21-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 22-08-2024
 * @Description :- Preload Scene Script.
 ************************************/
import { _decorator, Component, director, Label, ProgressBar, Node, Animation, Camera, UITransform, Button, Sprite, sys } from 'cc';
import { Server } from './Server';
import { DataScript } from './DataScript';
import { SoundManager } from './SoundManager';
import { PlayzhubEventHandler } from './PlayzhubEventHandler';
import { HTML_Bridge } from '../@types/HTML-Bridge';
import GA from 'gameanalytics'

const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    //#region -Fields
    canvas = null;
    @property(Node) progressBarNode: Node = null;
    @property(Node) progressTextNode: Node = null;
    @property(Node) preloadBg: Node = null;
    @property(Node) gameLogo: Node = null;
    @property(Node) playButton: Node = null;
    @property(Camera) cameraMain: Camera = null;
    @property(Node) particleEffect: Node = null;
    @property(Node) soundButton: Node = null;
    // @property(Node) orientation: Node = null;

    @property(Node) data: Node = null;
    // @property(AudioSource) audioSource: AudioSource = null;

    progressBar: ProgressBar = null;
    progressText: Label = null;
    firstProgress: number = 2;
    progressValue: number = 0;
    isPlayParticle: Boolean = false;
    gameID: string;
    private initialized = false;
    //#endregion

    initializeAnalytics(): void {
        if (this.initialized) return;

        const GAME_KEY = 'd9222f634f9591ded41001e528620dd1';
        const SECRET_KEY = '88c9b4e0644e98f5fd98dac2b0667aefbffa17eb';

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
            this.LoadScene();
        });
    }

    //#region -OnEnable
    protected onEnable(): void {
        this.progressBar = this.progressBarNode?.getComponent(ProgressBar);
        this.progressText = this.progressTextNode?.getComponent(Label);
        this.particleEffect.active = false;

        if (director.getScene().name === "PreloadScene" && !this.data) {
            this.data = director.getScene().getChildByName("Data");
            director.addPersistRootNode(this.data);
            // director.addPersistRootNode(this.orientation);
        }
        //new
        try {
            this.data.getComponent(DataScript).SetGameID(Server.gameID);
        } catch (error) {
        } finally {
            this.data.getComponent(DataScript).SetGameID(Server.gameID);
        }

        this.canvas = document.getElementById("GameCanvas");
        this.MousePointerEffect();
        // screen.on('orientation-change', this.onOrientationChange, this);
        screen.orientation.addEventListener('change', (_data) => {
            this.OnOrientationChange()
        })
        this.OnOrientationChange();
    }
    //#endregion

    //#region -OnOrientationChange
    OnOrientationChange(): void {
        let orientation = null;
        if (director.getScene().name === 'PreloadScene') {
            orientation = director.getScene().getChildByName('Canvas').getChildByName('Orientation');
        } else {
            orientation = director.getScene().getChildByName('UICanvas').getChildByName('Orientation');
        }

        if (screen.orientation.type === 'portrait-primary') {
            orientation.active = true;
        } else {
            orientation.active = false;
        }
    }
    //#endregion

    //#region - start
    start() {
        SoundManager.instance.SetBackgroundMusicSource();
        SoundManager.instance.PlayBackgroundMusic();
        // this.BackgroundResponsive();
        // this.LoadScene();
        this.gameID = this.data.getComponent(DataScript).GetGameID();

    }
    //#endregion

    //#region -BackgroundResponsive
    BackgroundResponsive(): void {
        let bgWidth: number = this.preloadBg.getComponent(UITransform).width;
        let bgHeight: number = this.preloadBg.getComponent(UITransform).height;

        let screenRatio: number = window.innerWidth / window.innerHeight;
        let targetRatio: number = bgWidth / bgHeight;
        let differenceInSize: number = targetRatio / screenRatio;
        let scaleMultiplier: number = 1 + differenceInSize / 2;

        this.preloadBg.getComponent(UITransform).height = this.preloadBg.getComponent(UITransform).height * scaleMultiplier;
        this.preloadBg.getComponent(UITransform).width = this.preloadBg.getComponent(UITransform).width * scaleMultiplier;
    }
    //#endregion

    //#region - LoadScene
    /**
     * @description - Loading Next Coming scene.
     */
    LoadScene(): void {
        director.preloadScene("Animation", (completeTime: number, totalTime: number, items: any) => {
            let percentageOfProgress: number = completeTime / totalTime;
            this.progressValue = percentageOfProgress;
            this.ProgressBarUpdate();
        }, () => {
            setTimeout(() => {
                this.Animations();
            }, 500);
            GA.GameAnalytics.addProgressionEvent(
                "Complete",
                "game_loading"
            );
            PlayzhubEventHandler.GameLoadingCompleted();
        })
    }
    //#endregion

    //#region  - Progress Bar Update
    /**
     * @description - Update Loading Progress Bar, called continuously while loading scene.
     */
    ProgressBarUpdate(): void {
        this.progressBar.progress = this.progressValue;
        this.progressText.string = `Loading... ${Math.floor(this.progressValue * 100)}%`;
    }
    //#endregion

    //#region -Animations
    Animations(): void {
        this.progressBarNode.active = false;
        this.progressTextNode.active = false;
        this.gameLogo.getComponent(Animation).play();
        this.soundButton.getComponent(Animation).play();
        this.playButton.getComponent(Animation).play();
        setTimeout(() => {
            GA.GameAnalytics.addDesignEvent("screen:title");
            SoundManager.instance.PlayTitleArtAnimationSound();
            SoundManager.instance.PlayStartButtonAnimationSound();
            this.particleEffect.active = true;
        }, 350)
    }
    //#endregion

    //#region -OnStartButtonPressed
    OnStartButtonPressed(): void {
        GA.GameAnalytics.addDesignEvent("ui:play_clicked");
        const dataScript: DataScript = this.data?.getComponent(DataScript);
        dataScript.NumberOfPlayIncreament();
        const numberOfPlays: number = dataScript.GetNumberOfPlay();
        PlayzhubEventHandler.GamePlayStarted(numberOfPlays.toString());

        this.playButton.getComponent(Animation).play("onClickStartButtonAnimationClip");
        this.playButton.getComponent(Button).interactable = false;
        SoundManager.instance.PlayButtonClickSound();
        setTimeout(() => {
            director.loadScene("Animation");
        }, 200);
    }
    //#endregion

    //#region -MousePointerEffect
    MousePointerEffect(): void {
        this.playButton.on(Node.EventType.MOUSE_ENTER, () => {
            this.canvas.style.cursor = "pointer";
        })
        this.playButton.on(Node.EventType.MOUSE_LEAVE, () => {
            this.canvas.style.cursor = "default";
        })
        this.soundButton.children[0].on(Node.EventType.MOUSE_ENTER, () => {
            this.canvas.style.cursor = "pointer";
        })
        this.soundButton.children[0].on(Node.EventType.MOUSE_LEAVE, () => {
            this.canvas.style.cursor = "default";
        })
    }
    //#endregion

    //#region -OnSoundButtonClicked
    OnSoundButtonClicked(): void {
        GA.GameAnalytics.addDesignEvent("ui:sound_clicked");
        SoundManager.instance.SetSoundState();
        if (!SoundManager.instance.playSoundState)
            this.soundButton.children[0].getComponent(Sprite).spriteFrame = this.soundButton.children[0].getComponent(Button).disabledSprite;
        else
            this.soundButton.children[0].getComponent(Sprite).spriteFrame = this.soundButton.children[0].getComponent(Button).normalSprite;

        SoundManager.instance.PlayBackgroundMusic();
    }
    //#endregion

    //#region -SendMessage
    SendMessage(_event: string, _data: Object): void {
        let messageString = {
            event: _event,
            data: _data
        }
        if (sys.os == "Android") {
            try {
                (window as any).JSBridge.receivedFromJS(JSON.stringify(messageString));
            } catch (error) {
            }
        }
        else if (sys.os == "iOS") {
            // console.log("iOS");
            // try {
            //     const postData = {
            //         // score: _score,
            //     };
            //     const postMessage = JSON.stringify(postData);
            //     (window as any).webkit.messageHandlers.jsHandler.postMessage(postMessage);
            //     (window as any).webkit.messageHandlers.jsHandler.postMessage("The Game End.............");
            // } catch (error) {
            //     console.log("The error...............", error);
            // }
        } else {
            try {
                // (window as any).JSBridge.receivedFromJS({ _event, _data }, "*");
                // (window as any).window.parent.postMessage({ _event, _data }, "*");
                // (window as any).parent.postMessage({ _event, _data }, "*");
                window.parent.postMessage({ _event, _data }, "*");
            } catch (error) {
                // console.log("The error...............", error);
            }
        }
    }
    //#endregion

    PostGameFrequencyToParent(_numberOfPlays: string) {
        // console.log(' PostGameFrequencyToParent ');
        this.SendMessage("GameFrequency",
            {
                "game_frequency": _numberOfPlays,
                "game_id": this.gameID,
                "game_type": "HTML5",
                "game_name": "Rolling Cart"
            }
        );
    }
}


