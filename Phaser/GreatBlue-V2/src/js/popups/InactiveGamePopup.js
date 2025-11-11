import { ButtonScaleDownTween } from "../Utils.js";
import { ButtonScaleUpTween } from "../Utils.js";
import { Constant } from "../Constant.js";

class InactiveGamePopup {
    constructor(scene, _message) {
        this.scene = scene;
        this.CreateInactiveGamePopup(_message)
    };

    CreateInactiveGamePopup(_message) {
        this.inactiveGamePopupContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        this.overlay = this.scene.add.image(0, 0, "overlay").setInteractive();
        this.overlay.on("pointerdown", this.OverlayPressed, this);

        this.base = this.scene.add.image(0, 0, "popup_base");

        this.crossButton = this.scene.add.image(360, -240, "cross_button").setOrigin(0.5);
        this.crossButton.setInteractive({ useHandCursor: true });
        this.crossButton.on("pointerdown", this.CrossButtonPressed, this);
        this.crossButton.on("pointerup", this.CrossButtonReleased, this);

        let messageTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '60px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.base.width - 40 } };
        this.messageText = this.scene.add.text(0, 0, _message, messageTextStyle).setOrigin(0.5);

        this.inactiveGamePopupContainer.add(this.overlay);
        this.inactiveGamePopupContainer.add(this.base);
        this.inactiveGamePopupContainer.add(this.crossButton);
        this.inactiveGamePopupContainer.add(this.messageText);

        this.inactiveGamePopupContainer.setDepth(2);
        this.inactiveGamePopupContainer.alpha = 0;

        setTimeout(() => {
            this.ShowInactiveGamePopup(_message);
        }, 300);

    }

    CrossButtonPressed() {
        console.log("this.scene: ", this.scene);
        ButtonScaleDownTween(this.scene, this.scene.inactiveGamePopup.crossButton, 1);
    }

    CrossButtonReleased() {
        ButtonScaleUpTween(this.scene, this.scene.inactiveGamePopup.crossButton, 1);
        this.scene.inactiveGamePopup.HideInactiveGamePopup();
        window.postMessage(0)
        ReactNativeWebView.postMessage(0);
    }

    ShowInactiveGamePopup(_message) {
        this.scene.inactiveGamePopup.inactiveGamePopupContainer.visible = true;
        this.scene.inactiveGamePopup.messageText.text = _message;
        let alphaTween = this.scene.add.tween({
            targets: [this.scene.inactiveGamePopup.inactiveGamePopupContainer],
            alpha: 1,
            ease: 'Linear',
            duration: 200
        });
    }
    HideInactiveGamePopup() {
        let alphaTween = this.scene.add.tween({
            targets: [this.scene.inactiveGamePopup.inactiveGamePopupContainer],
            alpha: 0,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) {
                this.inactiveGamePopupContainer.destroy();
            }
        });

    }

    OverlayPressed() { }

};
export default InactiveGamePopup