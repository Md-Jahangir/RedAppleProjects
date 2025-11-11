import { Constant } from "../Constant";
import Signals from "./Signal";
import Cards from "./Cards";
import BetCoin from "./BetCoin";
import { Model } from "../Model";
import InfoPopup from "../popups/InfoPopup";
import { LanguageService } from "../LanguageService";
import { Server } from "../Server";
import { SoundManager } from "../SoundManager";

class GameUI {
    constructor(scene) {
        this.scene = scene;
        this.gameCards = null;
        this.betCoins = null;
        this.userSignals = null;
        this.infoPopup = null;
        this.warningText = null;
        this.warningTween = null;
        // this.create();
    };

    create() {
        this.BackButtonUI();
        this.CreateBalanceUI();
        this.CreateTopChipsPanel();
        this.CreateActionPanelUI();
        this.CreateInstructionTweenObj();
        this.CreateBetPanelsUI();
        this.CreateGameCards();
        this.CreateInfoButtonUI();
        this.CreateSoundUI();
        this.CreateWarningPanel();
        this.CreateMinMaxBetPanel();
        this.scene.game.events.on('evtOnDisableBetBg', this.DisableBetPlaceBg, this);


    }
    BackButtonUI() {
        this.backButtonContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let backButtonNormal = this.scene.add.image(-850, -475, 'button_back_normal').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
        let backButton = this.scene.add.image(backButtonNormal.x, backButtonNormal.y, 'back_button').setOrigin(0.5, 0.5);
        this.backButtonContainer.add([backButtonNormal, backButton]);
        backButtonNormal.on('pointerover', this.BackButtonOver, this);
        backButtonNormal.on('pointerout', this.BackButtonOut, this);
        backButtonNormal.on('pointerdown', this.BackButtonDown, this);
        backButtonNormal.on('pointerup', this.BackButtonRelease, this);
    }
    CreateBalanceUI() {
        let fontStyle1 = { fontFamily: 'LuckiestGuy-Regular', fontSize: '35px', fill: '#d071f1', fontStyle: "normal", align: 'center' };
        let fontStyle2 = { fontFamily: 'LuckiestGuy-Regular', fontSize: '40px', fill: '#f9d473', fontStyle: "normal", align: 'center' };
        this.mainBalanceContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let balanceBg = this.scene.add.image(-550, -450, 'balance_base').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
        let balanceText = this.scene.add.text(balanceBg.x - 100, balanceBg.y - 23, LanguageService.getString('textBalance'), fontStyle1).setOrigin(0.5, 0.5);
        let balanceTextValue = this.scene.add.text(balanceBg.x + 75, balanceBg.y - 20, Model.GetBalance(), fontStyle2).setOrigin(0.5, 0.5);
        this.mainBalanceContainer.add([balanceBg, balanceText, balanceTextValue]);
        if (Server.mode != 'offline') {
            balanceTextValue.setText(Model.GetCurrency() + Model.GetBalance())
        }
    }

    CreateTopChipsPanel() {
        this.topPanelChipsBgContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.topPanelChipsBg = this.scene.add.image(0, -500, 'top_chips_bg').setOrigin(0.5, 0.5);
        this.topPanelChipsBgContainer.add(this.topPanelChipsBg)
    }

    CreateMinMaxBetPanel() {
        let fontStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '35px', fill: '#d071f1', fontStyle: "normal", align: 'center' };
        let fontStyle1 = { fontFamily: 'LuckiestGuy-Regular', fontSize: '35px', fill: '#f9d473', fontStyle: "normal", align: 'center' };
        this.minMaxBetContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.minMaxBg = this.scene.add.image(450, -425, 'display_bg').setOrigin(0.5, 0.5);
        this.minBetText = this.scene.add.text(this.minMaxBg.x - 60, this.minMaxBg.y - 50, 'Min :', fontStyle).setOrigin(0.5, 0.5);
        this.maxBetText = this.scene.add.text(this.minMaxBg.x - 50, this.minMaxBg.y + 10, 'Max : ', fontStyle).setOrigin(0.5, 0.5);
        this.minBetTextValue = this.scene.add.text(this.minBetText.x + 100, this.minBetText.y, '$ 1', fontStyle1).setOrigin(0.5, 0.5);
        this.maxBetTextValue = this.scene.add.text(this.maxBetText.x + 100, this.maxBetText.y, '$ 500 ', fontStyle1).setOrigin(0.5, 0.5);
        this.minMaxBetContainer.add([this.minMaxBg, this.minBetText, this.maxBetText, this.minBetTextValue, this.maxBetTextValue]);
    }

    CreateInfoButtonUI() {
        this.infoButtonContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let infoButtonNormal = this.scene.add.image(700, -475, 'button_info_normal').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
        let infoButton = this.scene.add.image(infoButtonNormal.x, infoButtonNormal.y, 'info_button').setOrigin(0.5, 0.5);
        this.infoButtonContainer.add([infoButtonNormal, infoButton]);
        infoButtonNormal.on('pointerover', this.InfoButtonOver, this);
        infoButtonNormal.on('pointerout', this.InfoButtonOut, this);
        infoButtonNormal.on('pointerdown', this.InfoButtonDown, this);
        infoButtonNormal.on('pointerup', this.InfoButtonRelease, this);
        this.infoPopup = new InfoPopup(this.scene);
    }
    CreateSoundUI() {
        this.soundButtonContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let soundButtonBg = this.scene.add.image(850, -475, 'sound_bg').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
        let soundButtonOn = this.scene.add.image(soundButtonBg.x, soundButtonBg.y, 'sound_on').setOrigin(0.5, 0.5);
        this.soundButtonContainer.add([soundButtonBg, soundButtonOn]);
        soundButtonBg.on('pointerover', this.SoundButtonOver, this);
        soundButtonBg.on('pointerout', this.SoundButtonOut, this);
        soundButtonBg.on('pointerdown', this.SoundButtonDown, this);
        soundButtonBg.on('pointerup', this.SoundButtonRelease, this);
        if (localStorage.getItem('sound_status_blackjack') == null) {
            localStorage.setItem('sound_status_blackjack', 0);
        } else {
            if (localStorage.getItem('sound_status_blackjack') == 0) {
                this.soundButtonContainer.list[1].setTexture('sound_on');
            } else {
                this.soundButtonContainer.list[1].setTexture('sound_off');
            }
        }
    }
    CreateWarningPanel() {
        let fontStyle1 = { fontFamily: 'LuckiestGuy-Regular', fontSize: '30px', fill: '#fff', fontStyle: "normal", align: 'center' };
        this.warningContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let warningText = this.scene.add.text(-1500, 400, LanguageService.getString('textErrorMaxBet'), fontStyle1).setOrigin(0.5);
        this.warningContainer.add(warningText);
        this.warningContainer.setVisible(false);
    }
    CreateTweenForWarning(text) {
        this.warningContainer.setVisible(true);
        this.warningContainer.list[0].setText(text);
        this.warningTween = this.scene.tweens.add({
            targets: [this.warningContainer.list[0]],
            ease: 'Quad.easeInOut',
            yoyo: false,
            repeat: 0,
            duration: 500,
            x: -550,
            y: 400,

            onComplete: () => {
                this.scene.tweens.add({
                    targets: [this.warningContainer.list[0]],
                    delay: 2000,
                    ease: 'Quad.easeInOut',
                    yoyo: false,
                    repeat: 0,
                    duration: 1000,
                    x: -1500,
                    y: 400,
                    onComplete: () => {
                        Constant.game.events.emit('evtShowWarningDone');
                    }
                })
            }
        }, this)
    }
    CreateInstructionTweenObj() {
        let fontStyle1 = { fontFamily: 'LuckiestGuy-Regular', fontSize: '30px', fill: '#fff', fontStyle: "normal", align: 'center' };
        this.instructionContainer = this.scene.add.container(0, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.instructionText = this.scene.add.text(50, 375, 'Pick your coins and start deal!', fontStyle1).setOrigin(0);
        this.instructionContainer.add(this.instructionText);
        this.instructionContainer.setVisible(true);
        this.CreateInstructionTween();
    }
    CreateInstructionTween() {
        this.instructionTween = this.scene.tweens.add({
            targets: [this.instructionText],
            ease: 'Quad.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 500,
            alpha: 0
        })
    }
    StopInstructionTween() {
        this.instructionTween.pause();
        this.instructionContainer.setVisible(false);
    }
    PlayInstructionTween(_text) {
        this.instructionContainer.setVisible(true);
        this.instructionText.setText(_text);
        this.instructionTween.resume();
    }
    SoundButtonOver() {
        this.soundButtonContainer.list[0].setScale(1.1, 1.1);
        this.soundButtonContainer.list[1].setScale(1.1, 1.1);
    }
    SoundButtonOut() {
        this.soundButtonContainer.list[0].setScale(1, 1);
        this.soundButtonContainer.list[1].setScale(1, 1);
    }
    SoundButtonDown() {
        // this.soundButtonContainer.list[0].setScale(1.1, 1.1);
        // this.soundButtonContainer.list[1].setScale(1.1, 1.1);
    }
    SoundButtonRelease() {
        this.soundButtonContainer.list[0].setScale(1, 1);
        this.soundButtonContainer.list[1].setScale(1, 1);
        if (localStorage.getItem('sound_status_blackjack') == 0) {
            localStorage.setItem('sound_status_blackjack', 1);
            this.soundButtonContainer.list[1].setTexture('sound_off');
            SoundManager.StopGameBgSound();
        } else {
            localStorage.setItem('sound_status_blackjack', 0);
            this.soundButtonContainer.list[1].setTexture('sound_on');
            SoundManager.PlayGameBgSound();
        }
    }
    SetBalanceText(balance) {
        this.mainBalanceContainer.list[2].setText(balance);
    }
    InfoButtonOver() {
        this.infoButtonContainer.list[0].setScale(1.1, 1.1);
        this.infoButtonContainer.list[1].setScale(1.1, 1.1);
    }
    InfoButtonOut() {
        this.infoButtonContainer.list[0].setScale(1, 1);
        this.infoButtonContainer.list[1].setScale(1, 1);
    }
    InfoButtonDown() {
        this.infoButtonContainer.list[0].setScale(1.1, 1.1);
        this.infoButtonContainer.list[1].setScale(1.1, 1.1);
    }
    InfoButtonRelease() {
        this.infoButtonContainer.list[0].setScale(1, 1);
        this.infoButtonContainer.list[1].setScale(1, 1);
        this.infoPopup.ShowInfoPopup();
    }

    CreateBetPanelsUI() {
        this.betCoins = new BetCoin(this.scene);
    }


    CreateActionPanelUI() {
        this.userSignals = new Signals(this.scene);
    }
    CreateGameCards() {
        this.gameCards = new Cards(this.scene);
    }

    DisableBetPlaceBg() {
        this.betCoins.DisableBetBase();
    }

    EnableBetPlaceBg() {
        this.betCoins.EnableBetBase()
    }
    BackButtonOver() {
        this.backButtonContainer.list[0].setScale(1.1, 1.1);
        this.backButtonContainer.list[1].setScale(1.1, 1.1);
    }
    BackButtonOut() {
        this.backButtonContainer.list[0].setScale(1, 1);
        this.backButtonContainer.list[1].setScale(1, 1);
    }
    BackButtonDown() {
        this.backButtonContainer.list[0].setScale(1.1, 1.1);
        this.backButtonContainer.list[1].setScale(1.1, 1.1);
    }
    BackButtonRelease() {
        this.scene.game.events.off('evtShowResultDone');
        this.scene.game.events.off('evtShowWarningDone');
        this.scene.game.events.off('evtOnDisableBetBg');
        this.scene.game.events.off('evtRoundEnd');
        this.backButtonContainer.list[0].setScale(1, 1);
        this.backButtonContainer.list[1].setScale(1, 1);
        this.DestroyObjects();
        this.scene.scene.stop('GameScene');
        this.scene.scene.start('SplashScene');
    }
    DestroyObjects() {
        // if (this.gameCards.tweenCards != null) {
        //     this.gameCards.tweenCards.destroy();
        // }

    }


}


export default GameUI;