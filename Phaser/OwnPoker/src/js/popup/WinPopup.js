
class WinPopup {
    constructor(scene) {
        this.scene = scene;
        this.winPopupContainer = null;
        this.overlay = null;
        this.winMessageText = null;
        this.winAmountText = null;

        this.create();
    };
    //#############################################################################################
    /**
     *
     */
    create() {
        this.CreateOverlay();
        this.winPopupContainer = this.scene.add.container(0, 0);
        this.winPopupContainer.setVisible(false);
        this.winPopupContainer.setDepth(1);
        this.CreateWinText();

    };

    CreateOverlay() {
        this.overlay = this.scene.add.image(0, 0, "overlay").setOrigin(0);
        this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
        this.overlay.setInteractive();
        this.overlay.setDepth(1);
        this.overlay.setVisible(false);
    };

    CreateWinText() {
        let winMessageTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '70px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.winMessageText = this.scene.add.text(0, -400, "You Win", winMessageTextStyle).setOrigin(0.5);
        let winAmountTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '44px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.winAmountText = this.scene.add.text(this.winMessageText.x + 30, this.winMessageText.y + 80, "100", winAmountTextStyle).setOrigin(0.5);
        this.chip = this.scene.add.image(this.winAmountText.x - 70, this.winAmountText.y, "poker_chip").setOrigin(0.5).setScale(0.8);

        this.winPopupContainer.add([this.winMessageText, this.winAmountText, this.chip]);
    };
    SetWinAmountAndName(_name, _amount) {
        this.winMessageText.setText(_name + " WIN");
        this.winAmountText.setText(_amount);
    }
    ShowWinPopup() {
        this.winPopupContainer.setVisible(true);
        this.overlay.setVisible(true);
    };

    HideWinPopup() {
        this.winPopupContainer.setVisible(false);
        this.overlay.setVisible(false);

    };

    resize(newWidth, newHeight, newScale) {
        this.overlay.setDisplaySize(newWidth, newHeight);
        this.winPopupContainer.setScale(newScale);
        this.winPopupContainer.setPosition((newWidth / 2), (newHeight / 2));
    };

};

export default WinPopup;