import Button from "../Button";
import { Constant } from "../Constant";
import { SoundManager } from "../SoundManager";

export default class GamePause {
    constructor(scene, x, y) {
        //#region -Variables
        this.scene = scene;
        this.x = x;
        this.y = y;
        //#endregion
        this.Create();
    }
    //#region -Create
    Create() {
        this.scene.events.once("EggDestroy", () => {
            // this.pauseButton.button.setVisible(false);
            Constant.isGameOver = true;
        });
        // this.pauseButton = new Button(this.scene, 0, 0, "button_pause");
        // this.pauseButton.OnClick(this.GamePauseFunction, this);

        // this.fullScreenButton = new Button(this.scene, 0, 0, "full_screen", true, 0);
        // this.fullScreenButton.OnClick(this.OnFullScreenButtonClick, this);

        this.soundButton = new Button(this.scene, 0, 0, "button_music", true, 1);
        this.soundButton.OnClick(this.OnSoundButtonClick, this);
        this.gamePauseContainer = this.scene.add.container(0, 0)
        this.pauseOverlay = this.scene.add.image(0, 0, "baseframe_pause")
            .setScrollFactor(0)
            .setInteractive()
            .setAlpha(0.2)
            .setVisible(false);
        this.pauseBase = this.scene.add.image(0, 0, "baseframe_pause");
        this.resumeButton = new Button(this.scene, 0, 0, "button_resume", false, null);
        this.resumeButton.OnClick(this.GameResumeFunction, this);
        this.homeButton = new Button(this.scene, 0, 0, "button_home", true, 0);
        this.homeButton.OnClick(this.GoHomeFunction, this);

        //gamepause container.
        this.gamePauseContainer.add([this.pauseBase, this.resumeButton.button, this.homeButton.button])
            .setDepth(2)
            .setVisible(false)
            .setScrollFactor(0);
    }
    //#endregion

    // OnFullScreenButtonClick() {
    //     console.log("OnFullScreenButtonClick:", this);
    //     this.fullScreenButton.UpdateFullScreenFrame();
    // };

    //#region -OnSoundButtonClick
    OnSoundButtonClick() {
        this.soundButton.UpdateMusicFrame();
        SoundManager.PlayGameBgMusic();
    }
    //#endregion
    //#region -GamePause
    GamePauseFunction() {
        Constant.isPaused = true;
        this.gamePauseContainer.setVisible(true);
        this.pauseOverlay.setVisible(true);
    }
    //#endregion
    //#region -GameResume
    GameResumeFunction() {
        Constant.isPaused = false;
        this.gamePauseContainer.setVisible(false);
        this.pauseOverlay.setVisible(false);
    }
    //#endregion
    //#region -GoHome
    GoHomeFunction() {
        SoundManager.StopGameBgMusic();
        this.scene.events.off("ReadyToPoolPlatform");
        this.scene.events.off("EggDestroy");
        this.scene.events.off("GameOver");
        this.scene.game.events.off("resize");
        this.scene.scene.stop("GameScene");
        this.scene.scene.start("MenuScene");
    }
    //#endregion
    //#region -Resize
    /**
     * 
     * @param {number} newWidth 
     * @param {number} newHeight 
     * @param {number} newScale 
     */
    Resize(newWidth, newHeight, newScale) {
        // this.pauseButton.Resize(this.pauseButton.button.displayWidth * newScale, 100 * newScale, newScale);
        // this.fullScreenButton.Resize(this.fullScreenButton.button.displayWidth * newScale, 100 * newScale, newScale);
        this.pauseOverlay.setDisplaySize(newWidth * 2, newHeight * 2);
        this.pauseOverlay.setPosition(newWidth / 2, newHeight / 2);
        this.soundButton.Resize(newWidth - this.soundButton.button.displayWidth * newScale, 100 * newScale, newScale);
        this.gamePauseContainer.setScale(newScale);
        this.gamePauseContainer.setPosition(newWidth / 2, newHeight / 2);
        this.pauseBase.setPosition(0, 0);
        this.resumeButton.Resize(-120, -15);
        this.homeButton.Resize(120, -15);
    }
    //#endregion
}