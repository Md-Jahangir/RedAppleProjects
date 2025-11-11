import Button from "../ui/Button.js";

class SettingsPopup {
    constructor(scene) {
        this.scene = scene;
        this.settingsPopupContainer = null;
        this.overlay = null;
        this.base = null;

        this.CreateSettingsPopup();
    };

    CreateSettingsPopup() {
        this.CreateOverlay();

        this.settingsPopupContainer = this.scene.add.container(0, 0);
        // this.settingsPopupContainer.setVisible(false);
        this.settingsPopupContainer.setDepth(5);

        this.base = this.scene.add.image(0, 0, "popup_base").setOrigin(0.5);

        let messageTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '56px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.base.displayWidth - 40 } };
        this.messageText = this.scene.add.text(this.base.x, this.base.y, "Yes get error now go to game please", messageTextStyle).setOrigin(0.5);

        this.settingsPopupContainer.add([this.base, this.messageText]);

        this.CreateCrossButton();

        this.HideSettingsPopup();
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
        this.HideSettingsPopup();
    };

    ResizeCrossButton(newWidth, newHeight, newScale) {
        this.crossButton.setScale(newScale);
        this.crossButton.setPosition(newWidth / 2 + ((this.base.width / 2 * newScale) - 25 * newScale), newHeight / 2 - ((this.base.height / 2 * newScale) - 25 * newScale));
    };

    ShowSettingsPopup(_msg) {
        this.messageText.setText(_msg);
        this.overlay.setVisible(true);
        this.settingsPopupContainer.setVisible(true);
        this.crossButton.show();
        this.crossButton.enable();
    };

    HideSettingsPopup() {
        this.overlay.setVisible(false);
        this.settingsPopupContainer.setVisible(false);
        this.crossButton.hide();
    };

    OverlayPressed() { }

    resize(newWidth, newHeight, newScale) {
        this.overlay.setDisplaySize(newWidth, newHeight);
        this.settingsPopupContainer.setScale(newScale);
        this.settingsPopupContainer.setPosition((newWidth / 2), (newHeight / 2));
        this.ResizeCrossButton(newWidth, newHeight, newScale);
    };

};
export default SettingsPopup