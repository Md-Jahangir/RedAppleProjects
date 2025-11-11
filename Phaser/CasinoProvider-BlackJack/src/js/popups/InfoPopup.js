import { Constant } from "../Constant";
import { LanguageService } from "../LanguageService";
class InfoPopup {
    constructor(scene) {
        this.scene = scene;
        this.infoPopupContainer = null;
        this.create();
    };

    create() {
        let fontStyle1 = { fontFamily: 'LuckiestGuy-Bold', fontSize: '40px', fill: '#f9d473', fontStyle: "normal", align: 'center' };
        this.infoPopupOverlay = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'info_popup_overlay').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true }).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.infoPopupContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let infoPopupBg = this.scene.add.image(0, 0, 'info_popup_bg').setOrigin(0.5).setInteractive({ useHandCursor: true });
        let dealerDrawText = this.scene.add.text(infoPopupBg.x - 120, infoPopupBg.y - 105, LanguageService.getString('textRuleDealer'), fontStyle1).setOrigin(0.5, 0.5);
        let insuranceText = this.scene.add.text(infoPopupBg.x - 305, infoPopupBg.y - 55, LanguageService.getString('textRuleInsurance'), fontStyle1).setOrigin(0.5, 0.5);
        let minBetText = this.scene.add.text(infoPopupBg.x - 230, infoPopupBg.y, LanguageService.getString('textRuleMinBet'), fontStyle1).setOrigin(0.5, 0.5);
        let maxBetText = this.scene.add.text(infoPopupBg.x - 225, infoPopupBg.y + 50, LanguageService.getString('textRuleMaxBet'), fontStyle1).setOrigin(0.5, 0.5);
        let decsUsedText = this.scene.add.text(infoPopupBg.x - 350, infoPopupBg.y + 105, LanguageService.getString('textRuleDecksUsed'), fontStyle1).setOrigin(0.5, 0.5);
        let infoPopupClose = this.scene.add.image(infoPopupBg.x + 500, infoPopupBg.y - 200, 'info_cross_button').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
        this.infoPopupContainer.add([infoPopupBg, dealerDrawText, insuranceText, minBetText, maxBetText, decsUsedText, infoPopupClose])
        infoPopupClose.on('pointerover', this.InfoButtonOver, this);
        infoPopupClose.on('pointerout', this.InfoButtonOut, this);
        infoPopupClose.on('pointerdown', this.InfoButtonDown, this);
        infoPopupClose.on('pointerup', this.InfoButtonRelease, this);
        this.infoPopupContainer.setDepth(5);
        this.HideInfoPopup();
    }
    ShowInfoPopup() {
        this.infoPopupOverlay.setVisible(true);
        this.infoPopupContainer.setVisible(true);
    }
    HideInfoPopup() {
        this.infoPopupOverlay.setVisible(false);
        this.infoPopupContainer.setVisible(false);
    }

    InfoButtonOver() {
        this.infoPopupContainer.list[6].setScale(1.1, 1.1);
    }
    InfoButtonOut() {
        this.infoPopupContainer.list[6].setScale(1, 1);
    }
    InfoButtonDown() {
        this.infoPopupContainer.list[6].setScale(1.1, 1.1);
    }
    InfoButtonRelease() {
        this.infoPopupContainer.list[6].setScale(1, 1);
        this.HideInfoPopup();
    }

}


export default InfoPopup;