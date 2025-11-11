import { Constant } from "../Constant.js";

class Popup {
    constructor(scene) {

        this.scene = scene;

        this.base = null;
        this.quitBase = null;

    }

    CreateGameOverPopup() {

        this.scene.gameUI.overlay.CreateGameoverOverlay();
        this.base = this.scene.add.image(0, 0, 'gameover_base').setScale(Constant.scaleFactor);
        this.scene.aGrid.placeAtIndex(180, this.base);
        this.scene.gameUI.buttons.CreateGameoverPopUpButtons();

    }

    CreateQuitPopup() {

        this.scene.gameUI.overlay.CreateQuitPopupOverlay();
        this.quitBase = this.scene.add.image(0, 0, 'quit_base').setScale(Constant.scaleFactor);
        this.scene.aGrid.placeAtIndex(180.1, this.quitBase);
        this.scene.gameUI.buttons.CreateQuitPopupButtons();

    }

}
export default Popup;