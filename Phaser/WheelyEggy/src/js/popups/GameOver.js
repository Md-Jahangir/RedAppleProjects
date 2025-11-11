import Button from "../Button";
import { SoundManager } from "../SoundManager";
export default class GameOver {
    constructor(scene, x, y, total_distance) {
        //#region -Variables
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.totalDistance = total_distance;
        //#endregion
        this.Create();
        this.Events();
    }
    //#region -Create
    Create() {
        this.gameOverContainer = this.scene.add.container(0, 0);
        this.gameOverOverlay = this.scene.add.image(0, 0, "baseframe_pause")
            .setScrollFactor(0)
            .setInteractive()
            .setAlpha(0.2)
            .setVisible(false);
        this.gameOverBase = this.scene.add.image(0, 0, "baseframe_gameOver")
            .setScrollFactor(0);
        this.gameOverText = this.scene.add.text(0, -150, "GameOver!", { fontFamily: "LILITAONE", fontSize: 100 })
            .setOrigin(0.5)
        this.scoreDisplayText = this.scene.add.text(0, 0, this.totalDistance + " m", { fontFamily: "LILITAONE", fontSize: 80 })
            .setOrigin(0.5)
        this.replayButton = new Button(this.scene, 0, 0, "button_replay", false, null);
        this.replayButton.OnClick(this.OnReplayButtonClick, this);
        this.homeButton = new Button(this.scene, 0, 0, "button_home", false, null);
        this.homeButton.OnClick(this.OnHomeButtonClick, this);

        //add to container
        this.gameOverContainer.add([this.gameOverBase, this.gameOverText, this.scoreDisplayText, this.replayButton.button, this.homeButton.button])
            .setDepth(2)
            .setVisible(false)
            .setScrollFactor(0);
    }
    //#endregion

    //#region -OnReplayButtonClick
    OnReplayButtonClick() {
        this.scene.events.off("ReadyToPoolPlatform");
        this.scene.scene.stop("GameScene");
        this.scene.scene.start("GameScene");
    }
    //#endregion

    //#region -OnHomeButtonClick
    OnHomeButtonClick() {
        this.scene.events.off("ReadyToPoolPlatform");
        this.scene.game.events.off("resize");
        this.scene.events.off("EggDestroy");
        this.scene.events.off("GameOver");
        this.scene.scene.stop("GameScene");
        this.scene.scene.start("MenuScene");
    }
    //#endregion

    //#region -Show
    Show() {
        this.scoreDisplayText.setText(this.totalDistance.GetScore() + " m");
        this.gameOverContainer.setVisible(true);
        this.gameOverOverlay.setVisible(true);
    }
    //#endregion

    //#region -Hide
    Hide() {
        this.gameOverOverlay.setVisible(false);
        this.gameOverContainer.setVisible(false);
    }
    //#endregion

    //#region -Events
    Events() {
        this.scene.events.on("GameOver", () => {
            SoundManager.PlayGameOverSound();
            this.Show();
        });
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
        this.gameOverOverlay.setDisplaySize(newWidth * 2, newHeight * 2);
        this.gameOverOverlay.setPosition(newWidth / 2, newHeight / 2);
        this.gameOverContainer.setScale(newScale);
        this.gameOverContainer.setPosition(newWidth / 2, newHeight / 2);
        this.replayButton.Resize(-120, 110);
        this.homeButton.Resize(120, 110);
    }
    //#endregion
}