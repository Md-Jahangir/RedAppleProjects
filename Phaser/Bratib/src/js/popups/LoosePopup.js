import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";
class LoosePopup {
    constructor(scene) {
        this.scene = scene;
        this.loosePopupGroup = null;
        this.CreatePopup();
    };

    CreatePopup() {
        this.loosePopupGroup = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height * 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.loosePopupGroup.depth = 5;

        // this.overlay = this.scene.add.image(0, 0, "one_pixel_black").setInteractive().setScale(3000, 3000);
        this.overlay = this.scene.add.image(0, 0, "overlay").setInteractive().setScale(1.2);
        this.overlay.on("pointerdown", this.OverlayPressed, this);
        this.overlay.alpha = 0.1;

        let messageTextStyle = { fontFamily: Constant.fontName, fontSize: "105px", fill: '#fff', fontStyle: 'bold', align: 'center', stroke: '#f69f00', strokeThickness: 16 };
        this.messageText = this.scene.add.text(0, 0, Constant.looseMessage, messageTextStyle).setOrigin(0.5, 0.5);

        this.loosePopupGroup.add([this.overlay, this.messageText]);
    }

    ShowLoosePopup() {
        SoundManager.PlayLooseSound();
        let alphaTween = this.scene.add.tween({
            targets: [this.loosePopupGroup],
            y: Math.round(Constant.game.config.height / 2),
            ease: 'Linear',
            duration: 500,
            callbackScope: this,
            onComplete: function (tween) {
            }
        });
    };

    HideLoosePopup() {
        let alphaTween = this.scene.add.tween({
            targets: [this.loosePopupGroup],
            y: Math.round(Constant.game.config.height * 2),
            ease: 'Linear',
            duration: 300,
            callbackScope: this,
            onComplete: function (tween) {

            }
        });
    }

    ButtonScaleDownTween(_refImage) {
        this.scene.add.tween({
            targets: [_refImage],
            scaleX: 0.9,
            scaleY: 0.9,
            ease: 'Linear',
            duration: 50,
        });
    };
    ButtonScaleUpTween(_refImage) {
        this.scene.add.tween({
            targets: [_refImage],
            scaleX: 1,
            scaleY: 1,
            ease: 'Linear',
            duration: 50,
        });
    };

    OverlayPressed() {
        console.log("loose overlay");

    }

};

export default LoosePopup;