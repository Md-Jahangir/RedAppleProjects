import { Constant } from "../Constant";
class Button {
    constructor(scene, x, y, prefix, text, style) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.imgPrefix = prefix;
        this.text = text;
        this.style = style;
        this.clickCallback = null;
        this.clickCallbackContext = null;
        this.clickCallbackArgs = null;
        this.isActive = false;
        this.CreateImages(prefix)
    }
    CreateImages(prefix) {
        this.buttonImg = this.scene.add.image(this.x, this.y, prefix + '_disabled').setScale(1, 1).setOrigin(0.5);
        this.gameText = this.scene.add.text(this.x, this.y - 15, this.text, this.style).setOrigin(0.5);
        this.buttonImg.on('pointerover', this.ButtonOver, this);
        this.buttonImg.on('pointerout', this.ButtonOut, this);
        this.buttonImg.on('pointerdown', this.ButtonDown, this);
        this.buttonImg.on('pointerup', this.ButtonUp, this);
    }
    ButtonOver() {
        if (!this.isActive) return;
        this.buttonImg.setScale(1.05);
        this.gameText.setScale(1.05);
    }
    ButtonOut() {
        if (!this.isActive) return;
        this.buttonImg.setScale(1);
        this.gameText.setScale(1);
    }
    ButtonDown() {

    }
    ButtonUp() {
        if (!this.isActive) return;
        if (this.clickCallback == null) return;

        this.clickCallback.apply(this.clickCallbackContext, this.clickCallbackArgs);
    }
    SetClickCallback(clickCallback, clickCallbackContext, clickCallbackArgs = null) {
        this.clickCallback = clickCallback;
        this.clickCallbackContext = clickCallbackContext;
        this.clickCallbackArgs = clickCallbackArgs;
    }
    HideButton() {
        this.isActive = false;
        this.buttonImg.setAlpha(0.6);
        this.gameText.setAlpha(0.6);
        this.buttonImg.removeInteractive();
        this.gameText.setVisible(false);
        this.buttonImg.setVisible(false);
    }
    ShowButton() {
        this.isActive = true;
        this.buttonImg.setAlpha(1);
        this.gameText.setAlpha(1);
        this.buttonImg.setVisible(true);
        this.gameText.setVisible(true);
        this.buttonImg.setInteractive({ useHandCursor: true });
    }
    EnableButton() {
        // if (this.isActive) return;
        this.buttonImg.setAlpha(1);
        this.gameText.setAlpha(1);
        this.buttonImg.setInteractive({ useHandCursor: true });
    }
    DisableButton() {
        this.buttonImg.setAlpha(0.6);
        this.gameText.setAlpha(0.6);
        this.buttonImg.removeInteractive();
    }
}
export default Button; 