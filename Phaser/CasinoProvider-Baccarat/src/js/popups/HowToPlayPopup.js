import { Constant } from "../Constant";
import { SoundManager } from "../SoundManager";
class HowToPlayPopup {
    constructor(scene) {
        this.scene = scene;
        this.howToPlayPopupContainer = null;
        this.create();
    };

    create() {
        let fontStyle1 = { fontFamily: 'Roboto-Black', fontSize: '30px', fill: '#f9d473', fontStyle: "normal" };
        this.howToPlayPopupOverlay = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'info_popup_overlay').setOrigin(0.5, 0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' }).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(4);
        this.howToPlayPopupContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let infoPopupBg = this.scene.add.image(0, 0, 'info_popup_bg').setOrigin(0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
        let chooseBetsText = this.scene.add.text(infoPopupBg.x - 50, infoPopupBg.y - 105, '1.Choose Your Bets and place over the banker, player and tie area.', fontStyle1).setOrigin(0.5, 0.5);
        let hitDealText = this.scene.add.text(infoPopupBg.x - 265, infoPopupBg.y - 50, '2.Hit the deal  to finalise your bet .', fontStyle1).setOrigin(0.5, 0.5);
        let resultText = this.scene.add.text(infoPopupBg.x - 50, infoPopupBg.y + 20, '3.Wait for rounds , you can see your previous round results in the \n points history section', fontStyle1).setOrigin(0.5, 0.5);
        let chooseNewText = this.scene.add.text(infoPopupBg.x - 100, infoPopupBg.y + 105, '4.Choose New Bet if you want to play with the new bets or \n choose rebet if you want to play with the previous bets.', fontStyle1).setOrigin(0.5, 0.5);
        let gameRuleText = this.scene.add.text(infoPopupBg.x - 60, infoPopupBg.y + 170, '5.You can see game rules section for bet credit and debit rules. ', fontStyle1).setOrigin(0.5, 0.5);
        let howToPlayPopupClose = this.scene.add.image(infoPopupBg.x + 515, infoPopupBg.y - 205, 'info_cross_button').setOrigin(0.5, 0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
        this.howToPlayPopupContainer.add([infoPopupBg, chooseBetsText, hitDealText, resultText, chooseNewText, gameRuleText, howToPlayPopupClose]);
        this.howToPlayPopupContainer.depth = 5;
        howToPlayPopupClose.on('pointerover', this.HowToPlayButtonOver, this);
        howToPlayPopupClose.on('pointerout', this.HowToPlayButtonOut, this);
        howToPlayPopupClose.on('pointerdown', this.HowToPlayButtonDown, this);
        howToPlayPopupClose.on('pointerup', this.HowToPlayButtonRelease, this);
        this.HideHowToPlayPopup();
    }
    ShowHowToPlayPopup() {
        SoundManager.PlaySignalButtonSound();
        this.howToPlayPopupOverlay.setVisible(true);
        this.howToPlayPopupContainer.setVisible(true);
    }
    HideHowToPlayPopup() {
        this.howToPlayPopupOverlay.setVisible(false);
        this.howToPlayPopupContainer.setVisible(false);
    }

    HowToPlayButtonOver() {
        this.howToPlayPopupContainer.list[6].setScale(1.1, 1.1);
    }
    HowToPlayButtonOut() {
        this.howToPlayPopupContainer.list[6].setScale(1, 1);
    }
    HowToPlayButtonDown() {
        SoundManager.PlaySignalButtonSound();
        this.howToPlayPopupContainer.list[6].setScale(1.1, 1.1);
    }
    HowToPlayButtonRelease() {
        this.howToPlayPopupContainer.list[6].setScale(1, 1);
        this.HideHowToPlayPopup();
    }

}


export default HowToPlayPopup;