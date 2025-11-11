import { Constant } from "../Constant";
import { SoundManager } from "../SoundManager";
class QuitPopup {
    constructor(scene) {
        this.scene = scene;
        this.quitPopupContainer = null;
        this.create();
    };

    create() {
        let fontStyle1 = { fontFamily: 'Roboto-Black', fontSize: '60px', fill: '#f9d473', fontStyle: "normal", align: "center" };
        let fontStyle2 = { fontFamily: 'Roboto-Black', fontSize: '50px', fill: '#f9d473', fontStyle: "normal" };
        this.quitPopupOverlay = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'info_popup_overlay').setOrigin(0.5, 0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' }).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(4);
        this.quitPopupContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let infoPopupBg = this.scene.add.image(0, 0, 'quit_base').setOrigin(0.5);
        let quitText = this.scene.add.text(infoPopupBg.x, infoPopupBg.y - 45, 'Are you sure you \n want to exit ?', fontStyle1).setOrigin(0.5, 0.5);
        let yesButton = this.scene.add.image(-150, 180, 'but_deal_normal').setOrigin(0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
        let noButton = this.scene.add.image(150, 180, 'no_button').setOrigin(0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
        let yesText = this.scene.add.text(yesButton.x, yesButton.y, 'Yes', fontStyle2).setOrigin(0.5, 0.5);
        let noText = this.scene.add.text(noButton.x, noButton.y, 'No', fontStyle2).setOrigin(0.5, 0.5);
        this.quitPopupContainer.add([infoPopupBg, quitText, yesButton, noButton, yesText, noText]);
        this.quitPopupContainer.depth = 5;
        yesButton.on('pointerover', this.YesButtonOver, this);
        yesButton.on('pointerout', this.YesButtonOut, this);
        noButton.on('pointerover', this.NoButtonOver, this);
        noButton.on('pointerout', this.NoButtonOut, this);
        yesButton.on('pointerdown', this.YesButtonDown, this);
        yesButton.on('pointerup', this.YesButtonRelease, this);
        noButton.on('pointerdown', this.NoButtonDown, this);
        noButton.on('pointerup', this.NoButtonRelease, this);
        this.HideQuitPopup();
    }
    ShowQuitPopup() {
        this.quitPopupOverlay.setVisible(true);
        this.quitPopupContainer.setVisible(true);
    }
    HideQuitPopup() {
        this.quitPopupOverlay.setVisible(false);
        this.quitPopupContainer.setVisible(false);
    }

    YesButtonOver() {
        this.quitPopupContainer.list[2].setScale(1.1, 1.1);
        this.quitPopupContainer.list[4].setScale(1.1, 1.1);
    }
    YesButtonOut() {
        this.quitPopupContainer.list[2].setScale(1, 1);
        this.quitPopupContainer.list[4].setScale(1, 1);
    }
    NoButtonOver() {
        this.quitPopupContainer.list[3].setScale(1.1, 1.1);
        this.quitPopupContainer.list[5].setScale(1.1, 1.1);
    }
    NoButtonOut() {
        this.quitPopupContainer.list[3].setScale(1, 1);
        this.quitPopupContainer.list[5].setScale(1, 1);
    }
    YesButtonDown() {
        SoundManager.PlaySignalButtonSound();
    }
    YesButtonRelease() {
        SoundManager.StopGameBgMusic();
        this.scene.scene.stop('GameScene');
        this.scene.scene.start('SplashScene');
    }
    NoButtonDown() {
        SoundManager.PlaySignalButtonSound();
    }
    NoButtonRelease() {
        this.HideQuitPopup();
    }

}


export default QuitPopup;