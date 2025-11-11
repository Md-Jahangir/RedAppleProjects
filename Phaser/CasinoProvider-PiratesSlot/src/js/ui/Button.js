import { Constant } from "../Constant";
class Button {
    constructor(scene, x, y, prefix, text, style) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.imgPrefix = prefix;
        this.text = text;
        this.style = style;
        this.CreateImages(prefix)
    }
    CreateImages(prefix) {
        this.normalImg = this.scene.add.image(this.x, this.y, prefix + '_normal').setOrigin(0.5);
        this.disabledImg = this.scene.add.image(this.x, this.y, prefix + '_disabled').setOrigin(0.5);
        this.disabledImg.setVisible(false);
        this.glowImg = this.scene.add.image(this.x, this.y, prefix + '_normal').setOrigin(0.5);
        // this.glowImg.setVisible(false);
        this.gameText = this.scene.add.text(this.x, this.y - 10, this.text, this.style).setOrigin(0.5);
        this.gameText.setVisible(false);
        this.normalImg.setInteractive({useHandCursor : true});
        this.normalImg.on('pointerover', this.ButtonOver, this);
        this.normalImg.on('pointerout', this.ButtonOut, this);
    }
    ButtonOver(obj, text) {
        this.normalImg.setAlpha(0.01);
        this.glowImg.setAlpha(1);
    }
    ButtonOut(obj, text) {
        this.normalImg.setAlpha(1);
        this.glowImg.setAlpha(0.01);
    }
    HideActiveButton(obj) {
        this.normalImg.setVisible(false);
        this.gameText.setVisible(false);
        this.normalImg.removeInteractive();
    }
    ShowActiveButton() {
        this.normalImg.setVisible(true);
        this.gameText.setVisible(true);
        this.normalImg.setInteractive({ useHandCursor: true });
    }
    EnableButton() {
        this.normalImg.setAlpha(1);
        this.normalImg.setInteractive({ useHandCursor: true });
    }
    DisableButton() {
        this.normalImg.setAlpha(0.6);
        this.normalImg.removeInteractive();
    }
}
export default Button; 