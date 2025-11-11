import { Constant } from "../Constant";
import { SoundManager } from "../SoundManager";
class WarningPopup {
    constructor(scene) {
        this.scene = scene;
        this.warningPopupContainer = null;
        this.create();
    };

    create() {
        let fontStyle1 = { fontFamily: 'Roboto-Black', fontSize: '35px', fill: '#f9d473', fontStyle: "normal", align: "center" };
        let fontStyle2 = { fontFamily: 'Roboto-Black', fontSize: '50px', fill: '#f9d473', fontStyle: "normal" };
        this.warningpOverlay = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'info_popup_overlay').setOrigin(0.5, 0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' }).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(4);
        this.warningPopupContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.warnPopupBg = this.scene.add.image(0, 0, 'message_box').setOrigin(0.5);
        this.warnText = this.scene.add.text(this.warnPopupBg.x, this.warnPopupBg.y, '', fontStyle1).setOrigin(0.5, 0.5);
        this.warnClose = this.scene.add.image(this.warnPopupBg.x + 235, this.warnPopupBg.y - 225, 'info_cross_button').setOrigin(0.5, 0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
        this.closeWarnButton = this.scene.add.image(0, 0, 'message_box').setOrigin(0.5);
        this.warningPopupContainer.add([this.warnPopupBg, this.warnText, this.warnClose]);
        this.warnClose.on('pointerover', this.WarnCloseButtonOver, this);
        this.warnClose.on('pointerout', this.WarnCloseButtonOut, this);
        this.warnClose.on('pointerdown', this.WarnCloseButtonDown, this);
        this.warnClose.on('pointerup', this.WarnCloseButtonRelease, this);
        this.warningPopupContainer.depth = 5;
        this.HideWarnPopup();
    }
    ShowWarnPopup(text) {
        this.warningpOverlay.setVisible(true);
        this.warnText.setText(text);
        this.warningPopupContainer.setVisible(true);

    }
    HideWarnPopup() {
        this.warningpOverlay.setVisible(false);
        this.warningPopupContainer.setVisible(false);
    }
    WarnCloseButtonOver() {
        this.warnClose.setScale(1.1, 1.1);
    }
    WarnCloseButtonOut() {
        this.warnClose.setScale(1, 1);
    }
    WarnCloseButtonDown() {
        SoundManager.PlaySignalButtonSound();
        this.warnClose.setScale(1.1, 1.1);
    }
    WarnCloseButtonRelease() {
        this.warnClose.setScale(1, 1);
        this.HideWarnPopup();
    }



}


export default WarningPopup;