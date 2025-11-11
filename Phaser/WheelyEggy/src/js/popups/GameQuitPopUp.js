import Button from "../Button";
import { Server } from "../Server";
import { Constant } from "../Constant";
export default class GameQuitPopUp {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.create();
    }
    //#region -Create
    create() {
        this.gameQuitOverlay = this.scene.add.image(0, 0, "overlay").setOrigin(0.5)
            .setScrollFactor(0)
            .setInteractive()
            .setAlpha(0.5).setScale(1920, 1080);
        this.gameQuitContainer = this.scene.add.container(0, 0);

        this.gameQuitBase = this.scene.add.image(0, 0, "quit_base")
            .setScrollFactor(0);
        this.yesButton = new Button(this.scene, 0, 0, "quit_yes", false, null);
        this.yesButton.OnClick(this.OnYesButtonClick, this);
        this.noButton = new Button(this.scene, 0, 0, "quit_no", false, null);
        this.noButton.OnClick(this.OnNoButtonClick, this);

        // this.gameQuitContainer.add([this.gameQuitOverlay, this.gameQuitBase, this.yesButton.button, this.noButton.button]);
        this.gameQuitContainer.add([this.gameQuitBase, this.yesButton.button, this.noButton.button]);
        this.VisibleOff();
    }
    //#endregion

    //#region -VisibleOff
    VisibleOff() {
        this.gameQuitOverlay.setVisible(false);
        this.gameQuitContainer.setVisible(false);
        Constant.isPaused = false;
    }
    //#endregion

    //#region -VisibleOn
    VisibleOn() {
        this.gameQuitOverlay.setVisible(true);
        this.gameQuitContainer.setVisible(true);
        Constant.isPaused = true;
    }
    //#endregion

    //#region -OnYesButtonClick
    OnYesButtonClick() {
        try {
            if (Server.deviceType == "Android") {
                JSBridge.receivedFromJS("GameOver");
            } else if (Server.deviceType == "ios") {
                window.webkit.messageHandlers.jsHandler.postMessage("GameOver");
            } else if (Server.deviceType == "browser") {
                // window.location.replace("http://dev-platform-grandgaming.s3-website-us-east-1.amazonaws.com");
                window.location.replace("https://platform.grandgaming.com/");
            }
        } catch (err) {
            console.log("catch error: ", err);
        }
        this.VisibleOff();
    }
    //#endregion

    //#region -OnNoButtonClick
    OnNoButtonClick() {
        this.VisibleOff();
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
        this.gameQuitOverlay.setDisplaySize(newWidth, newHeight)
        // this.gameQuitOverlay.setScale(newScale * 1920);
        this.gameQuitOverlay.setPosition(newWidth / 2, newHeight / 2);

        this.gameQuitContainer.setScale(newScale)
            .setPosition(newWidth / 2, newHeight / 2);

        this.yesButton.Resize(-150, 50);
        this.noButton.Resize(150, 50);
    }
    //#endregion
}