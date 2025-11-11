import Button from "../ui/Button.js";
import { Model } from "../Model.js";
class AlertPopup {
    constructor(scene) {
        this.scene = scene;
        this.alertPopupContainer = null;
        this.overlay = null;
        this.base = null;

        this.CreateAlertPopup();
    };

    CreateAlertPopup() {
        this.CreateOverlay();

        this.alertPopupContainer = this.scene.add.container(0, 0);
        // this.alertPopupContainer.setVisible(false);
        this.alertPopupContainer.setDepth(5);

        this.base = this.scene.add.image(0, 0, "popup_base").setOrigin(0.5);

        let messageTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '56px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.base.displayWidth - 40 } };
        this.messageText = this.scene.add.text(this.base.x, this.base.y, "Yes get error now go to game please", messageTextStyle).setOrigin(0.5);

        this.alertPopupContainer.add([this.base, this.messageText]);

        this.CreateCrossButton();

        this.HideAlertPopup();
    };

    CreateOverlay() {
        this.overlay = this.scene.add.image(0, 0, "overlay").setOrigin(0);
        this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
        this.overlay.setInteractive();
        this.overlay.setDepth(5);
        // this.overlay.setVisible(false);
    };

    CreateCrossButton() {
        this.crossButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), "cross_button");
        this.crossButton.setClickCallback(this.OnCrossButtonClicked, this);
        this.crossButton.setDepth(5);
        // this.crossButton.hide();
    };

    OnCrossButtonClicked() {
        console.log("OnCrossButtonClicked");
        this.HideAlertPopup();
    };

    ResizeCrossButton(newWidth, newHeight, newScale) {
        this.crossButton.setScale(newScale);
        this.crossButton.setPosition(newWidth / 2 + ((this.base.width / 2 * newScale) - 25 * newScale), newHeight / 2 - ((this.base.height / 2 * newScale) - 25 * newScale));
    };

    ShowAlertPopup(_msg) {
        this.messageText.setText(_msg);
        this.overlay.setVisible(true);
        this.alertPopupContainer.setVisible(true);
        this.crossButton.show();
        this.crossButton.enable();
    };

    HideAlertPopup() {
        this.overlay.setVisible(false);
        this.alertPopupContainer.setVisible(false);
        this.crossButton.hide();

        if (this.messageText.text == "jwt expired") {
            console.log("return to login");
            this.scene.scene.stop('ChooseTableScene');
            this.scene.scene.start("SignInScene");
            Model.SetLoginStatus(false);
        }
    };

    OverlayPressed() { }

    resize(newWidth, newHeight, newScale) {
        this.overlay.setDisplaySize(newWidth, newHeight);
        this.alertPopupContainer.setScale(newScale);
        this.alertPopupContainer.setPosition((newWidth / 2), (newHeight / 2));
        this.ResizeCrossButton(newWidth, newHeight, newScale);
    };

};
export default AlertPopup