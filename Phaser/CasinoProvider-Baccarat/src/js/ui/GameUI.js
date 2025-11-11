import { Constant } from "../Constant";
import Signals from "./Signal";
import Cards from "./Cards";
import BetCoin from "./BetCoin";
import { Model } from "../Model";
import InfoPopup from "../popups/InfoPopup";
import { SoundManager } from "../SoundManager";
import Button from "./Button";
import HowToPlayPopup from "../popups/HowToPlayPopup";
import QuitPopup from "../popups/QuitPopup";

class GameUI {
    constructor(scene) {
        this.scene = scene;
        this.gameCards = null;
        this.betCoins = null;
        this.infoPopup = null;
        this.userSignals = null;
        this.betCoins = null;
        this.gameCards = null;
    };

    create() {
        this.BackButtonUI();
        this.CreateBalanceUI();
        this.CreateTopChipsPanel();
        this.CreateMinMaxBetPanel();
        this.CreateHowToPlayPanel();
        this.CreateInfoButtonUI();
        this.CreateSoundUI();
        this.CreatePlaceYourBetText();
        this.CreateWinningHistoryResultUi();
        this.CreateActionPanelUI();
        this.CreateBetPanelsUI();
        this.CreateGameCards();

    }
    BackButtonUI() {
        this.quitPopup = new QuitPopup(this.scene);
        this.backButtonContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.backButton = new Button(this.scene, -850, -475, 'but_back', 'back', 0);
        this.backButtonContainer.add([this.backButton.disabledBtn, this.backButton.normalBtn, this.backButton.buttonText]);
        this.backButton.HideText();
        this.backButton.EnableButton();
        this.backButton.normalBtn.on('pointerover', () => this.backButton.ButtonOver(this.backButton.normalBtn), this);
        this.backButton.normalBtn.on('pointerout', () => this.backButton.ButtonOut(this.backButton.normalBtn), this);
        this.backButton.normalBtn.on('pointerdown', () => this.BackButtonPressed(this.backButton.normalBtn), this);
        this.backButton.normalBtn.on('pointerup', () => this.BackButtonReleased(this.backButton.normalBtn), this);
    }
    CreateTopChipsPanel() {
        this.topPanelChipsBgContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.topPanelChipsBg = this.scene.add.image(0, -470, 'top_chips_bg').setOrigin(0.5, 0.5);
        this.topPanelChipsBgContainer.add(this.topPanelChipsBg)
    }
    CreateMinMaxBetPanel() {
        let fontStyle = { fontFamily: 'Roboto-Black', fontSize: '35px', fill: '#f9d473', fontStyle: "normal", align: 'center' };
        let fontStyle1 = { fontFamily: 'Roboto-Black', fontSize: '35px', fill: '#fff', fontStyle: "normal", align: 'center' };
        this.minMaxBetContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.minMaxBg = this.scene.add.image(425, -425, 'display_bg').setOrigin(0.5, 0.5);
        this.minBetText = this.scene.add.text(this.minMaxBg.x - 60, this.minMaxBg.y - 50, 'Min :', fontStyle).setOrigin(0.5, 0.5);
        this.maxBetText = this.scene.add.text(this.minMaxBg.x - 50, this.minMaxBg.y + 10, 'Max : ', fontStyle).setOrigin(0.5, 0.5);
        this.minBetTextValue = this.scene.add.text(this.minBetText.x + 100, this.minBetText.y, '$ 0.1', fontStyle1).setOrigin(0.5, 0.5);
        this.maxBetTextValue = this.scene.add.text(this.maxBetText.x + 100, this.maxBetText.y, '$ 100 ', fontStyle1).setOrigin(0.5, 0.5);
        this.minMaxBetContainer.add([this.minMaxBg, this.minBetText, this.maxBetText, this.minBetTextValue, this.maxBetTextValue]);
    }

    CreateBalanceUI() {
        let fontStyle2 = { fontFamily: 'Roboto-Black', fontSize: '40px', fill: '#f9d473', fontStyle: "normal", align: 'center' };
        this.mainBalanceContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let balanceBg = this.scene.add.image(-550, -450, 'balance_base').setOrigin(0.5, 0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
        let balanceTextValue = this.scene.add.text(balanceBg.x + 75, balanceBg.y - 13, Model.GetBalance(), fontStyle2).setOrigin(0.5, 0.5);
        this.mainBalanceContainer.add([balanceBg, balanceTextValue]);
    }
    CreateHowToPlayPanel() {
        this.howToPlayPopup = new HowToPlayPopup(this.scene);
        this.howToPlayButtonContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.howToPlayButton = new Button(this.scene, 650, -475, 'how_to_play', 'how_to_play');
        this.howToPlayButtonContainer.add([this.howToPlayButton.disabledBtn, this.howToPlayButton.normalBtn, this.howToPlayButton.buttonText]);
        this.howToPlayButton.HideText();
        this.howToPlayButton.EnableButton();
        this.howToPlayButton.normalBtn.on('pointerover', () => this.howToPlayButton.ButtonOver(this.howToPlayButton.normalBtn), this);
        this.howToPlayButton.normalBtn.on('pointerout', () => this.howToPlayButton.ButtonOut(this.howToPlayButton.normalBtn), this);
        this.howToPlayButton.normalBtn.on('pointerdown', this.HowToPlayButtonPressed, this);
        this.howToPlayButton.normalBtn.on('pointerup', this.HowToPlayButtonReleased, this);
    }
    CreateInfoButtonUI() {
        this.infoPopup = new InfoPopup(this.scene)
        this.infoButtonContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.infoButton = new Button(this.scene, 760, -475, 'info_icon', 'info');
        this.infoButtonContainer.add([this.infoButton.disabledBtn, this.infoButton.normalBtn, this.infoButton.buttonText]);
        this.infoButton.HideText();
        this.infoButton.EnableButton();
        this.infoButton.normalBtn.on('pointerover', () => this.infoButton.ButtonOver(this.infoButton.normalBtn), this);
        this.infoButton.normalBtn.on('pointerout', () => this.infoButton.ButtonOut(this.infoButton.normalBtn), this);
        this.infoButton.normalBtn.on('pointerdown', this.InfoButtonPressed, this);
        this.infoButton.normalBtn.on('pointerup', this.InfoButtonReleased, this);
    }
    CreateSoundUI() {
        this.soundButtonContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.soundButton = new Button(this.scene, 870, -475, 'sound_on', 'on', 0);
        this.soundButtonContainer.add([this.soundButton.disabledBtn, this.soundButton.normalBtn, this.soundButton.buttonText]);
        this.soundButton.HideText();
        this.soundButton.EnableButton();
        this.soundButton.normalBtn.on('pointerover', () => this.soundButton.ButtonOver(this.soundButton.normalBtn), this);
        this.soundButton.normalBtn.on('pointerout', () => this.soundButton.ButtonOut(this.soundButton.normalBtn), this);
        this.soundButton.normalBtn.on('pointerdown', () => this.SoundButtonDown(this.soundButton.normalBtn), this);
        this.soundButton.normalBtn.on('pointerup', () => this.SoundButtonRelease(this.soundButton.normalBtn), this);
        this.CheckLocalStorageForSound();
    }
    CreateActionPanelUI() {
        this.userSignals = new Signals(this.scene);
    }
    CreateBetPanelsUI() {
        this.betCoins = new BetCoin(this.scene);
    }
    CreateGameCards() {
        this.gameCards = new Cards(this.scene);
    }




    CreateWinningHistoryResultUi() {
        let fontStyle = { fontFamily: 'Roboto-Black', fontSize: '30px', fill: '#ffffff', fontStyle: "normal", align: 'center' };
        this.winningHistoryPanelContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.winningHistoryDataContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let grid = this.scene.add.image(-850, -200, 'history_bg').setOrigin(0.5);
        let gridBg = this.scene.add.image(-850, -200, 'number_board_grid').setOrigin(0.5);
        let playerBg = this.scene.add.image(gridBg.x + 30 * Constant.scaleFactor - gridBg.displayWidth / 2, gridBg.y + 15 * Constant.scaleFactor - gridBg.displayHeight / 2, 'player_bet_history_bg').setOrigin(0);
        let playerText = this.scene.add.text(playerBg.x + playerBg.displayWidth / 2, playerBg.y + playerBg.displayHeight / 2, 'P', fontStyle).setOrigin(0.5, 0.5);
        let bankerBg = this.scene.add.image(gridBg.x, gridBg.y + 15 * Constant.scaleFactor, 'banker_bet_history_bg').setOrigin(0);
        bankerBg.y -= gridBg.displayHeight / 2;
        let bankerText = this.scene.add.text(bankerBg.x + bankerBg.displayWidth / 2, bankerBg.y + bankerBg.displayHeight / 2, 'B', fontStyle).setOrigin(0.5, 0.5);
        this.winningHistoryPanelContainer.add([grid, gridBg, playerBg, playerText, bankerBg, bankerText]);
        for (let i = 1; i < 7; i++) {
            let text_0 = this.scene.add.text(playerBg.x + (playerBg.displayWidth / 2) - (10 * Constant.scaleFactor), playerBg.y + i * (playerBg.displayHeight) + (6 * Constant.scaleFactor), '', fontStyle).setOrigin(0);
            let text_1 = this.scene.add.text(bankerBg.x + bankerBg.displayWidth / 2 - (10 * Constant.scaleFactor), bankerBg.y + i * (bankerBg.displayHeight) + (6 * Constant.scaleFactor), '', fontStyle).setOrigin(0);
            this.winningHistoryDataContainer.add([text_0, text_1])
        }
        if(Constant.isMobile){
            playerBg.setPosition(gridBg.x + 55 * Constant.scaleFactor - gridBg.displayWidth / 2,gridBg.y + 20 * Constant.scaleFactor - gridBg.displayHeight / 2);
            playerText.setPosition(playerBg.x + playerBg.displayWidth / 2, playerBg.y + playerBg.displayHeight / 2);
            bankerBg.setPosition(gridBg.x ,gridBg.y + 20 * Constant.scaleFactor - gridBg.displayHeight / 2)
        }else{

        }

    }
    CreatePlaceYourBetText() {
        this.placeYourBetsContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let fontStyle = { fontFamily: 'Roboto-Black', fontSize: '30px', fill: '#ffffff', fontStyle: "normal", align: 'center' };
        this.placeYourBetsText = this.scene.add.text(0, 500, 'Pick your coins and start deal!', fontStyle).setOrigin(0.5, 0.5).setAlpha(0);
        this.placeYourBetsContainer.add(this.placeYourBetsText);
        this.tweenPlaceBetText = this.scene.tweens.add({
            targets: this.placeYourBetsText,
            yoyo: true,
            repeat: -1,
            alpha: 1,
            duration: 500
        });
        this.HidePlaceYourBets();
    }
    ShowPlaceYourBets(_text) {
        this.placeYourBetsText.setText(_text)
        this.placeYourBetsContainer.setVisible(true);
        this.tweenPlaceBetText.resume();
    }
    HidePlaceYourBets() {
        this.tweenPlaceBetText.pause();
        this.placeYourBetsContainer.setVisible(false);
    }
    CheckLocalStorageForSound() {
        console.log('localStorage.getItem()', localStorage.getItem('sound_status_baccarat'));
        if (localStorage.getItem('sound_status_baccarat') == null) {
            localStorage.setItem('sound_status_baccarat', 0);
            this.soundButton.EnableButton();
            SoundManager.PlayGameBgMusic();
        } else {
            if (localStorage.getItem('sound_status_baccarat') == 1) {
                this.soundButton.DisableButton();
                this.soundButton.disabledBtn.setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
                this.soundButton.disabledBtn.on('pointerover', () => this.soundButton.ButtonOver(this.soundButton.disabledBtn), this);
                this.soundButton.disabledBtn.on('pointerout', () => this.soundButton.ButtonOut(this.soundButton.disabledBtn), this);
                this.soundButton.disabledBtn.on('pointerdown', () => this.SoundButtonDown(this.soundButton.disabledBtn), this);
                this.soundButton.disabledBtn.on('pointerup', () => this.SoundButtonRelease(this.soundButton.disabledBtn), this);
                SoundManager.StopGameBgMusic();
            } else {
                localStorage.setItem('sound_status_baccarat', 0);
                this.soundButton.EnableButton();
                SoundManager.PlayGameBgMusic();
            }
        }
    }
    SetDataOfWinningHistory(arrayOfWinningHistory) {
        for (let index = 0; index < arrayOfWinningHistory.length; index++) {
            if (index < 6) {
                this.winningHistoryDataContainer.list[2 * index].setText(arrayOfWinningHistory[index].player);
                this.winningHistoryDataContainer.list[(2 * index) + 1].setText(arrayOfWinningHistory[index].banker);
            }
        }
    }
    SetBalanceText(balance) {
        this.mainBalanceContainer.list[1].setText(parseFloat(balance).toFixed(2));
    }


    BackButtonPressed(obj) {
        SoundManager.PlaySignalButtonSound();
    }
    BackButtonReleased(obj) {
        this.quitPopup.ShowQuitPopup();
    }
    InfoButtonPressed() {
    }
    InfoButtonReleased() {
        SoundManager.PlaySignalButtonSound();
        this.infoPopup.ShowInfoPopup();
    }
    HowToPlayButtonPressed() {
    }
    HowToPlayButtonReleased() {
        SoundManager.PlaySignalButtonSound();
        this.howToPlayPopup.ShowHowToPlayPopup();
    }
    SoundButtonDown(obj) {
        SoundManager.PlaySignalButtonSound();
    }
    SoundButtonRelease(obj) {
        if (localStorage.getItem('sound_status_baccarat') == 0) {
            obj.setTexture('sound_on_disabled');
            localStorage.setItem('sound_status_baccarat', 1);
            SoundManager.StopGameBgMusic();
        } else {
            obj.setTexture('sound_on_normal');
            localStorage.setItem('sound_status_baccarat', 0);
            SoundManager.PlayGameBgMusic();
        }
    }


}


export default GameUI;