import { Constant } from "../Constant";
import Button from "../Button";
import { SoundManager } from "../SoundManager";
import { Server } from "../Server";
import GameQuitPopUp from "../popups/GameQuitPopUp";
export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    //#region -Create
    create() {
        this.game.events.on("resize", this.Resize, this);
        SoundManager.PlayGameBgMusic();

        //Background
        this.backgroundgSky = this.add.image(0, 0, "bg_sky")
            .setOrigin(0);

        //GameLogo
        this.gameLogo = this.add.image(0, 0, "wheely_eggy");

        //PlayButton and callback
        this.playButton = new Button(this, 0, 0, "button_play");
        this.playButton.OnClick(this.SceneChange, this);

        //Backbutton and callback
        this.backButton = new Button(this, 0, 0, "back_button");
        this.backButton.OnClick(this.OnBackButtonClicked, this);

        //SoundButton and Callback
        this.soundButton = new Button(this, 0, 0, "button_music", true, 1);
        this.soundButton.OnClick(this.OnSoundButtonClick, this);

        //Fullscreen and callback
        // this.fullScreenButton = new Button(this, 0, 0, "full_screen", true, 0);
        // this.fullScreenButton.OnClick(this.OnFullScreenButtonClick, this);

        //QuitPopup
        this.quitPopup = new GameQuitPopUp(this, 0, 0);

        //Initial Resize
        this.Resize(window.innerWidth, window.innerHeight);
    };
    //#endregion

    //#region -OnFullScreenButtonClick
    OnFullScreenButtonClick() {
        this.fullScreenButton.UpdateFullScreenFrame();
    };
    //#endregion

    //#region -OnSoundButtonClick
    OnSoundButtonClick() {
        this.soundButton.UpdateMusicFrame();
        SoundManager.PlayGameBgMusic();
    };
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
    };
    //#endregion

    //#region -SceneChange
    SceneChange() {
        SoundManager.StopGameBgMusic();
        setTimeout(() => {
            this.scene.stop("MenuScene");
            this.scene.start("GameScene");
        }, 100);
    }
    //#endregion

    //#region -Resize
    /**
     * 
     * @param {number} newWidth 
     * @param {number} newHeight 
     */
    Resize(newWidth, newHeight) {
        //NewScale
        let newScale = Constant.GetScale(1920, 1080, newWidth, newHeight);

        //Background
        this.backgroundgSky.setDisplaySize(newWidth, newHeight);

        //GameLogo
        this.gameLogo.setScale(newScale);
        this.gameLogo.setPosition(newWidth / 2, newHeight / 3.5);

        //Buttons
        this.playButton.Resize(newWidth / 2, newHeight / 1.2, newScale);
        this.backButton.Resize(this.backButton.button.displayWidth * newScale, 100 * newScale, newScale);
        this.soundButton.Resize(newWidth - this.soundButton.button.displayWidth * newScale, 100 * newScale, newScale);
        // this.fullScreenButton.Resize(this.fullScreenButton.button.displayWidth * newScale, newHeight - 100 * newScale, newScale);
        this.quitPopup.Resize(newWidth, newHeight, newScale);
    };
    //#endregion
}