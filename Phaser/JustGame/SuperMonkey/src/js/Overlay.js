import { Align } from "./util/align.js";
import { Constant } from "./Constant.js";

class Overlay {
    constructor(scene) {

        this.scene = scene;

        this.content = null;
        this.contentTwo = null;
        this.contentThree = null;
        this.firstDot = null;
        this.secondDot = null;
        this.thirdDot = null;
        this.controlOverlay = null;

    }

    CreateTutorialOverlays() {

        this.content = this.scene.add.image(0, 0, 'content_0').setScale(Constant.scaleFactorY);

        this.firstDot = this.scene.add.image(0, 0, 'focused').setScale(Constant.scaleFactor);
        this.secondDot = this.scene.add.image(0, 0, 'absent').setScale(Constant.scaleFactor);
        this.thirdDot = this.scene.add.image(0, 0, 'absent').setScale(Constant.scaleFactor);

        this.scene.aGrid.placeAtIndex(199, this.content);
        this.scene.aGrid.placeAtIndex(331, this.firstDot);
        this.scene.aGrid.placeAtIndex(332, this.secondDot);
        this.scene.aGrid.placeAtIndex(333, this.thirdDot);

    }

    CreateControlOverlay() {

        this.controlOverlay = this.scene.add.image(0, 0, 'control_overlay').setScale(1920 * Constant.scaleFactorX, 1080 * Constant.scaleFactorY).setAlpha(0.000001).setInteractive({ useHandCursor: true });
        Align.center(this.controlOverlay);

    }

    CreateGameoverOverlay() {

        let gameoverOverlay = this.scene.add.image(0, 0, 'shadow').setScale(1920 * Constant.scaleFactorX);
        Align.center(gameoverOverlay);

    }

    CreateQuitPopupOverlay() {

        let quitOverlay = this.scene.add.image(0, 0, 'shadow').setScale(1920 * Constant.scaleFactorX);
        Align.center(quitOverlay);

    }
}

export default Overlay;