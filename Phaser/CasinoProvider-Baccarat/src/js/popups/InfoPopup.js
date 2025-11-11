import { Constant } from "../Constant";
import { LanguageService } from "../LanguageService";
import { SoundManager } from "../SoundManager";
class InfoPopup {
    constructor(scene) {
        this.scene = scene;
        this.infoPopupContainer = null;
        this.infoPopupContainer1 = null;
        this.infoPopupContainer2 = null;
        this.infoPopupContainer3 = null;
        this.previousCounter = 0;
        this.nextCounter = 0;
        this.create();
    };

    create() {

        let fontStyle1 = { fontFamily: 'Roboto-Black', fontSize: '30px', fill: '#f9d473', fontStyle: "normal", align: 'center' };
        this.infoPopupOverlay = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'info_popup_overlay').setOrigin(0.5, 0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' }).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(4);
        this.infoPopupContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.infoPopupBg = this.scene.add.image(0, 0, 'info_popup_bg').setOrigin(0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
        let infoText = this.scene.add.text(this.infoPopupBg.x, this.infoPopupBg.y - 170, 'GAME RULES', fontStyle1).setOrigin(0.5, 0.5);
        this.infoPopupClose = this.scene.add.image(this.infoPopupBg.x + 515, this.infoPopupBg.y - 205, 'info_cross_button').setOrigin(0.5, 0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
        this.arrowPreviousButton = this.scene.add.image(this.infoPopupBg.x - this.infoPopupBg.displayWidth / 2, this.infoPopupBg.y, 'arrow_previous').setOrigin(0.5, 0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
        this.arrowNextButton = this.scene.add.image(this.infoPopupBg.x + this.infoPopupBg.displayWidth / 2, this.infoPopupBg.y, 'arrow_next').setOrigin(0.5, 0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
        this.infoPopupContainer.add([this.infoPopupBg, infoText, this.infoPopupClose, this.arrowPreviousButton, this.arrowNextButton]);
        this.infoPopupContainer.depth = 5;
        this.infoPopupClose.on('pointerover', this.InfoButtonOver, this);
        this.infoPopupClose.on('pointerout', this.InfoButtonOut, this);
        this.infoPopupClose.on('pointerdown', this.InfoButtonDown, this);
        this.infoPopupClose.on('pointerup', this.InfoButtonRelease, this);

        this.arrowPreviousButton.on('pointerdown', this.PreviousButtonDown, this);
        this.arrowPreviousButton.on('pointerup', this.PreviousButtonRelease, this);

        this.arrowNextButton.on('pointerdown', this.NextButtonDown, this);
        this.arrowNextButton.on('pointerup', this.NextButtonRelease, this);

        this.InfoPopupContainer1();
        this.InfoPopupContainer2();
        this.InfoPopupContainer3();
        this.HideInfoPopup();
        this.HandleRulesUiSwitch();
    }
    InfoPopupContainer1() {
        let fontStyle1 = { fontFamily: 'Roboto-Black', fontSize: '30px', fill: '#f9d473', fontStyle: "normal", align: 'center' };
        this.infoPopupContainer1 = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let bankerText = this.scene.add.text(this.infoPopupBg.x - 100, this.infoPopupBg.y - 105, ' Banker Win- Banker points are greater than Player Points', fontStyle1).setOrigin(0.5, 0.5);
        let playerText = this.scene.add.text(this.infoPopupBg.x - 95, this.infoPopupBg.y - 55, 'Player Wins- Player points are greater than Banker points', fontStyle1).setOrigin(0.5, 0.5);
        let minBetText = this.scene.add.text(this.infoPopupBg.x - 385, this.infoPopupBg.y, 'Min Bet : $ 0.1', fontStyle1).setOrigin(0.5, 0.5);
        let maxBetText = this.scene.add.text(this.infoPopupBg.x - 380, this.infoPopupBg.y + 50, 'Max Bet : $ 100', fontStyle1).setOrigin(0.5, 0.5);
        let decsUsedText = this.scene.add.text(this.infoPopupBg.x - 190, this.infoPopupBg.y + 105, '  Tie- Player Points are equal to Banker Points', fontStyle1).setOrigin(0.5, 0.5);
        this.infoPopupContainer1.add([bankerText, playerText, minBetText, maxBetText, decsUsedText]);
        this.infoPopupContainer1.depth = 5;
    }
    InfoPopupContainer2() {
        let fontStyle1 = { fontFamily: 'Roboto-Black', fontSize: '20px', fill: '#f9d473', fontStyle: "normal" };
        this.infoPopupContainer2 = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let playerTotal5 = this.scene.add.text(this.infoPopupBg.x - 150, this.infoPopupBg.y - 115, 'If the player total is 5 or less, the dealer adds a third card to the hand.', fontStyle1).setOrigin(0.5, 0.5);
        let playerTotal6 = this.scene.add.text(this.infoPopupBg.x - 195, this.infoPopupBg.y - 80, 'If the player total is 6 or 7, no additional cards are required.', fontStyle1).setOrigin(0.5, 0.5);
        let playerStands = this.scene.add.text(this.infoPopupBg.x - 50, this.infoPopupBg.y - 45, 'When the player stands, the banker receives another card on 5  or less and stands on 6 or 7.', fontStyle1).setOrigin(0.5, 0.5);
        let bankertotal2 = this.scene.add.text(this.infoPopupBg.x - 35, this.infoPopupBg.y, 'If the banker total is 2, 1, or 0 from the first two cards, the dealer adds a third card  to the hand \n regardless of the player’s hand.', fontStyle1).setOrigin(0.5, 0.5);
        let bankertotal3 = this.scene.add.text(this.infoPopupBg.x - 40, this.infoPopupBg.y + 50, '  If the banker total is 3 and the player’s third card is not an 8, the banker receives another card.', fontStyle1).setOrigin(0.5, 0.5);
        let bankertotal4 = this.scene.add.text(this.infoPopupBg.x - 45, this.infoPopupBg.y + 90, 'When the banker total is 4 and the player’s third card is 2-7, the hand receives another card.', fontStyle1).setOrigin(0.5, 0.5);
        let bankertotal5 = this.scene.add.text(this.infoPopupBg.x - 85, this.infoPopupBg.y + 120, 'When the banker total is 5 and the player’s third card is 4-7, another card is drawn.', fontStyle1).setOrigin(0.5, 0.5);
        let bankertotal6 = this.scene.add.text(this.infoPopupBg.x - 5, this.infoPopupBg.y + 150, 'If the banker total is 6 and the player’s third card is 6 or 7, another card is added to the banker hand.', fontStyle1).setOrigin(0.5, 0.5);
        let bankertotal7 = this.scene.add.text(this.infoPopupBg.x - 165, this.infoPopupBg.y + 180, 'If the banker total is 7 from the first two cards, the hand stands.', fontStyle1).setOrigin(0.5, 0.5);
        this.infoPopupContainer2.add([playerTotal5, playerTotal6, playerStands, bankertotal2, bankertotal3, bankertotal4, bankertotal5, bankertotal6, bankertotal7]);
        this.infoPopupContainer2.depth = 5;
    }
    InfoPopupContainer3() {
        this.infoPopupContainer3 = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let dealingCardsImage = this.scene.add.image(0, 25, 'dealing_cards').setOrigin(0.5);
        this.infoPopupContainer3.add([dealingCardsImage]);
        this.infoPopupContainer3.depth = 5;
    }
    ShowInfoPopup() {
        this.infoPopupOverlay.setVisible(true);
        this.infoPopupContainer.setVisible(true);
        this.infoPopupContainer1.setVisible(true);
        this.infoPopupContainer2.setVisible(false);
        this.infoPopupContainer3.setVisible(false);
        this.HandleRulesUiSwitch();
    }
    HideInfoPopup() {
        this.infoPopupOverlay.setVisible(false);
        this.infoPopupContainer.setVisible(false);
        this.infoPopupContainer1.setVisible(false);
        this.infoPopupContainer2.setVisible(false);
        this.infoPopupContainer3.setVisible(false);
        this.previousCounter = 0;
        this.nextCounter = 0;
    }

    InfoButtonOver() {
        this.infoPopupContainer.list[2].setScale(1.1, 1.1);
    }
    InfoButtonOut() {
        this.infoPopupContainer.list[2].setScale(1, 1);
    }
    InfoButtonDown() {
        SoundManager.PlaySignalButtonSound();
        this.infoPopupContainer.list[2].setScale(1.1, 1.1);
    }
    InfoButtonRelease() {
        this.infoPopupContainer.list[2].setScale(1, 1);
        this.HideInfoPopup();
    }
    HandleRulesUiSwitch() {
        if (this.nextCounter == 0) {
            this.arrowNextButton.setAlpha(1);
            this.arrowPreviousButton.setAlpha(0);
        } else if (this.nextCounter == 1) {
            this.arrowNextButton.setAlpha(1);
            this.arrowPreviousButton.setAlpha(1);
        } else {
            this.arrowNextButton.setAlpha(0);
            this.arrowPreviousButton.setAlpha(1);
        }
    }
    PreviousButtonDown() {
        SoundManager.PlaySignalButtonSound();
        this.nextCounter -= 1;
    }
    PreviousButtonRelease() {
        if (this.nextCounter == 0) {
            this.infoPopupContainer2.setVisible(false);
            this.infoPopupContainer3.setVisible(false);
            this.infoPopupContainer1.setVisible(true);
        }
        else if (this.nextCounter == 1) {
            this.infoPopupContainer1.setVisible(false);
            this.infoPopupContainer3.setVisible(false);
            this.infoPopupContainer2.setVisible(true);
            this.arrowNextButton.setAlpha(1);
            this.arrowPreviousButton.setAlpha(0);
        } else {
        }
        this.HandleRulesUiSwitch();
    }
    NextButtonDown() {
        SoundManager.PlaySignalButtonSound();
        this.nextCounter += 1;
    }
    NextButtonRelease() {
        if (this.nextCounter == 1) {
            this.infoPopupContainer1.setVisible(false);
            this.infoPopupContainer3.setVisible(false);
            this.infoPopupContainer2.setVisible(true);
        }
        else if (this.nextCounter == 2) {
            this.infoPopupContainer1.setVisible(false);
            this.infoPopupContainer2.setVisible(false);
            this.infoPopupContainer3.setVisible(true);
            // this.arrowNextButton.setAlpha(0);
            // this.arrowPreviousButton.setAlpha(1);
        } else {

        }
        this.HandleRulesUiSwitch();
    }


}


export default InfoPopup;