//#region -Imports
import { Constant } from "../Constant";
import Car from "../gameobjects/Car";
import Paddle from "../gameobjects/Paddle";
import Terrain from "../gameobjects/Terrain";
import Egg from "../gameobjects/Egg";
import Distance from "../Distance";
import GamePause from "../popups/GamePause";
import GameOver from "../popups/GameOver";
import Dial from "../gameobjects/Dial";
import { Server } from "../Server";
import { SoundManager } from "../SoundManager";
import Button from "../Button";
import GameQuitPopUp from "../popups/GameQuitPopUp";
//#endregion

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        //#region -Variables
        this.terrain = null;
        this.egg = null;
        this.distance = null;
        this.adsHideTime = null;
        //#endregion
    }
    //#region -Create
    create() {
        this.game.events.on("resize", this.Resize, this);
        SoundManager.PlayGameBgMusic();

        //variable initialize values
        Constant.isGameOver = false;
        Constant.isPaused = false;
        Constant.isFirstResize = true;
        // Constant.advertisementCountDown = 300;

        // get colliders of physics gameobjects from json.
        Constant.colliders = this.cache.json.get("collider");

        //world collide bounds
        this.matter.world.setBounds(0, 0, Constant.gameWidth, Constant.gameHeight, 200, true, false, false, false);

        //Background
        this.backgroundgSky = this.add.tileSprite(0, 0, 1920, 1080, "bg_gamescene")
            .setOrigin(0.5, 0.5)
            .setScrollFactor(0);

        //GameObjects and Popups classes
        this.terrain = new Terrain(this);
        this.car = new Car(this, this.terrain.startPlatform);
        this.egg = new Egg(this, this.terrain.startPlatform);
        this.paddles = new Paddle(this, this.car);
        this.dial = new Dial(this, this.car);
        this.distance = new Distance(this, this.egg, window.innerWidth, window.innerHeight);
        this.gamePausePopUp = new GamePause(this, 0, 0);
        this.gameOverPopup = new GameOver(this, 0, 0, this.distance);

        //Ads Timer Text
        this.timerText = this.add.text(0, 0, "", { fontFamily: "LILITAONE", fontSize: 20 })
            .setOrigin(0.5)
            .setScrollFactor(0);
        this.adsTimerText = this.add.text(0, 0, "", { fontFamily: "LILITAONE", fontSize: 20 })
            .setOrigin(0.5)
            .setScrollFactor(0);

        //Fullscreen Buttons and callback
        // this.fullScreenButton = new Button(this, 0, 0, "full_screen", true, 0);
        // this.fullScreenButton.OnClick(this.OnFullScreenButtonClick, this);

        //BackButton
        this.backButton = new Button(this, 0, 0, "back_button");
        this.backButton.OnClick(this.OnBackButtonClicked, this);

        //QuitPopup
        this.quitPopup = new GameQuitPopUp(this, 0, 0);

        //StartTimer
        if (Server.deviceType != "browser") {
            this.CreateAdsStartTimer();
        }

        //Turned off all debug line/outline of physics objects.
        this.matter.world.debugGraphic.visible = false;

        //Initial Resize
        this.Resize(window.innerWidth, window.innerHeight);
    }
    //#endregion

    //#region -OnBackButtonClicked
    OnBackButtonClicked() {
        // try {
        //     if (Server.deviceType == "Android") {
        //         window.JSBridge.receivedFromJS("GameOver");
        //     } else if (Server.deviceType == "ios") {
        //         window.webkit.messageHandlers.jsHandler.postMessage("GameOver");
        //     } else {
        //         window.location.replace("http://dev-platform-grandgaming.s3-website-us-east-1.amazonaws.com");
        //     }
        // } catch (err) {
        //     console.log("catch error: ", err);
        // }
        this.quitPopup.VisibleOn();
    }
    //#endregion

    //#region -OnFullScreenButtonClicked
    // OnFullScreenButtonClick() {
    //     this.fullScreenButton.UpdateFullScreenFrame();
    // }
    //#endregion

    //#region - BackgroundParalax
    BackgroundParallax() {
        if (!Constant.isGameOver) {
            this.backgroundgSky.tilePositionX += this.car.body.body.velocity.x / 4;
        }
    }
    //#endregion

    //#region -CreateAdsStartTimer
    CreateAdsStartTimer() {
        this.adsStartTimerEvent = this.time.addEvent(
            {
                delay: 1000,
                callback: this.AdsStartTimerUpdate,
                callbackScope: this,
                loop: true
            }
        )
    };
    //#endregion

    //#region -AdsStartTimerUpdate
    AdsStartTimerUpdate() {
        Constant.isPaused = false;
        if (Constant.advertisementCountDown > 0) {
            Constant.advertisementCountDown--;
        }
        else {
            this.adsStartTimerEvent.paused = true;
            this.adsStartTimerEvent.remove();
            this.adsHideTime = Constant.advertisementBreakTime;
            this.CreateAdsHideTimer();
            try {
                if (Server.deviceType == "Android") {
                    window.JSBridge.receivedFromJS("ShowAds");

                } else if (Server.deviceType == "ios") {
                    window.webkit.messageHandlers.jsHandler.postMessage("ShowAds");
                }
                else {
                }
            }
            catch (err) {
                console.log("cathc err ", err);
            }
        }
    };
    //#endregion

    //#region -CreateAdsHideTimer
    CreateAdsHideTimer() {
        Constant.isPaused = true;
        this.adsHideTimerEvent = this.time.addEvent(
            {
                delay: 1000,
                callback: this.AdsHideTimerUpdate,
                callbackScope: this,
                loop: true
            }
        )
    };
    //#endregion

    //#region -AdsHideTimerUpdate
    AdsHideTimerUpdate() {
        if (this.adsHideTime > 0) {
            this.adsHideTime--;
        }
        else {
            this.adsHideTimerEvent.paused = true;
            this.adsHideTimerEvent.remove();
            this.CreateAdsStartTimer();
            Constant.advertisementCountDown = Constant.PlayerData.ads_break;
            try {
                if (Server.deviceType == "Android") {
                    window.JSBridge.receivedFromJS("HideAds");
                } else if (Server.deviceType == "ios") {
                    window.webkit.messageHandlers.jsHandler.postMessage("HideAds");
                }
                else {
                }
            }
            catch (err) {
                console.log("cathc err: ", err);
            }
        }
    };
    //#endregion

    //#region -CameraUpdate
    CameraUpdate() {
        let mainCam = this.cameras.main;
        if (!this.egg.isDestroy) {
            mainCam.centerOn(this.car.body.x, Constant.gameHeight / 1.5);
        }
    }
    //#endregion

    //#region -Update
    update() {
        if (!Constant.isPaused) {
            this.BackgroundParallax();
            this.car.ControllUpdate();
            this.distance.DistanceUpdate();
            this.CameraUpdate();
            this.dial.DialUpdate();
        }
    }
    //#endregion

    //#region -Resize
    /**
     * 
     * @param {number} newWidth 
     * @param {number} newHeight 
     */
    Resize(newWidth, newHeight) {
        //newScale
        let newScale = Constant.GetScale(1920, 1080, newWidth, newHeight);
        //Background
        this.backgroundgSky.setDisplaySize(newWidth, newHeight);
        this.backgroundgSky.setPosition(newWidth / 2, newHeight / 2);

        //GameObjects and Popups
        this.terrain.Resize(newWidth, newHeight, newScale);
        this.car.Resize(newWidth, newHeight, newScale);
        this.egg.Resize(newWidth, newHeight, newScale);
        this.gamePausePopUp.Resize(newWidth, newHeight, newScale);
        this.gameOverPopup.Resize(newWidth, newHeight, newScale);
        this.dial.Resize(newWidth, newHeight, newScale);
        this.paddles.Resize(newWidth, newHeight, newScale);
        this.distance.Resize(newWidth, newHeight, newScale);

        //Ads Timer
        this.timerText.setScale(newScale);
        this.timerText.setPosition(newWidth / 2, 125 * newScale);
        this.adsTimerText.setScale(newScale);
        this.adsTimerText.setPosition(newWidth / 2, 125 * newScale);

        //Fullscreen
        // this.fullScreenButton.Resize(this.fullScreenButton.button.displayWidth * newScale, newHeight - 100 * newScale, newScale);
        this.backButton.Resize(this.backButton.button.displayWidth * newScale, 100 * newScale, newScale);

        //quite popup
        this.quitPopup.Resize(newWidth, newHeight, newScale);

        //Checking First resize.
        if (Constant.isFirstResize) {
            Constant.isFirstResize = false;
        }
    }
    //#endregion
}


