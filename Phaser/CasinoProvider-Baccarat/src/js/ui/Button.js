import { Constant } from "../Constant";
class Button {
    constructor(scene, x, y, prefix, textPrefix, textX) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.imgPrefix = prefix;
        this.textPrefix = textPrefix;
        this.textX = textX;
        this.buttonImg = null;
        this.buttonText = null;
        this.CreateImages(prefix)
    }
    CreateImages(prefix) {
        let fontStyle = { fontFamily: 'Roboto-Black', fontSize: '35px', fill: '#f9d473', fontStyle: "normal", align: 'center' };
        this.disabledBtn = this.scene.add.image(this.x, this.y, this.imgPrefix + '_disabled').setOrigin(0.5);
        this.normalBtn = this.scene.add.image(this.x, this.y, this.imgPrefix + '_normal').setOrigin(0.5).setVisible(false);
        this.normalBtn.setDepth(2)
        this.buttonText = this.scene.add.text(this.x - this.textX, this.y - 20, this.textPrefix, fontStyle);
        this.normalBtn.setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
    }
    ShowButton(obj) {
        this.buttonText.setAlpha(1);
        this.normalBtn.setVisible(true);
        this.disabledBtn.setVisible(false);
    }
    HideButton(obj) {
        this.buttonText.setAlpha(0);
        this.normalBtn.setVisible(false);
        this.disabledBtn.setVisible(false);
    }
    HideText() {
        this.buttonText.setVisible(false);
    }
    ButtonOver(obj, textObj) {
        if (!obj.visible) return;
        obj.setScale(1.05);
        if (textObj != undefined) {
            textObj.setScale(1.05);
        }
    }
    ButtonOut(obj, textObj) {
        if (!obj.visible) return;
        obj.setScale(1);
        if (textObj != undefined) {
            textObj.setScale(1);
        }

    }
    EnableButton(obj) {
        this.buttonText.setAlpha(1);
        this.disabledBtn.setVisible(false);
        this.normalBtn.setVisible(true);
    }
    DisableButton() {
        this.buttonText.setAlpha(0.5);
        this.normalBtn.setVisible(false);
        this.disabledBtn.setVisible(true);
    }
}
export default Button; 