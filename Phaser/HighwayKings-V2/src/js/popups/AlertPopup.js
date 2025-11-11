// import { ButtonScaleDownTween, ButtonScaleUpTween } from "../Utils.js"
import { ButtonScaleDownTween } from "../Utils.js";
import { ButtonScaleUpTween } from "../Utils.js";
import { Constant } from "../Constant.js";

class AlertPopup {
    constructor(scene) {
        this.scene = scene;
    };

    CreateAlertPopup() {
        this.alertPopupContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        this.overlay = this.scene.add.image(0, 0, "overlay").setInteractive();
        this.overlay.on("pointerdown", this.OverlayPressed, this);

        this.base = this.scene.add.image(0, 0, "popup_base");

        this.crossButton = this.scene.add.image(360, -240, "cross_button").setOrigin(0.5);
        this.crossButton.setInteractive({ useHandCursor: true });
        this.crossButton.on("pointerdown", this.CrossButtonPressed, this);
        this.crossButton.on("pointerup", this.CrossButtonReleased, this);

        let messageTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '60px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.base.width - 40 } };
        this.messageText = this.scene.add.text(0, 0, "", messageTextStyle).setOrigin(0.5);

        this.alertPopupContainer.add(this.overlay);
        this.alertPopupContainer.add(this.base);
        this.alertPopupContainer.add(this.crossButton);
        this.alertPopupContainer.add(this.messageText);

        this.alertPopupContainer.setDepth(2);
        this.alertPopupContainer.alpha = 0;

    }

    CrossButtonPressed() {
        // console.log("this.scene: ", this.scene);
        ButtonScaleDownTween(this.scene, this.scene.bottomPanel.alertPopup.crossButton, 1);
    }

    CrossButtonReleased() {
        ButtonScaleUpTween(this.scene, this.scene.bottomPanel.alertPopup.crossButton, 1);
        this.scene.bottomPanel.alertPopup.HideAlertPopup();
        window.postMessage(this.scene.bottomPanel.totalAmountBetted)
        ReactNativeWebView.postMessage(this.scene.bottomPanel.totalAmountBetted);
    }

    ShowAlertPopup(_message) {
        this.scene.bottomPanel.alertPopup.alertPopupContainer.visible = true;
        this.scene.bottomPanel.alertPopup.messageText.text = _message;
        let alphaTween = this.scene.add.tween({
            targets: [this.scene.bottomPanel.alertPopup.alertPopupContainer],
            alpha: 1,
            ease: 'Linear',
            duration: 200
        });
    }
    HideAlertPopup() {
        let alphaTween = this.scene.add.tween({
            targets: [this.scene.bottomPanel.alertPopup.alertPopupContainer],
            alpha: 0,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) { }
        });
        console.log("scene: ", this.scene)

    }

    OverlayPressed() { }

};
export default AlertPopup