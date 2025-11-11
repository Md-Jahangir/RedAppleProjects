import Button from "./Button";
import { Model } from "../Model";
import { SoundManager } from "../SoundManager";
export default class BottomPanel {
    constructor(scene) {
        this.scene = scene;
        this.config = this.scene.cache.json.get("game-config").bottom_panel;
        this.create();
    }
    create() {
        this.UserMoney();
        this.Coin();
        this.Win();
        this.BuyCards();
        this.TotalBetUi();
        this.StartButton();
    }
    UserMoney() {
        this.userMoneyText = this.scene.add.text(
            0,
            0,
            'MONEY', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.userMoneyValueBg = this.scene.add.image(0, 0, "plus_display").setOrigin(0);
        this.userMoneyValueText = this.scene.add.text(
            0,
            0,
            '5000$', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
    }
    SetMoneyText() {
        // this.userMoneyValueText.setText(Model.GetBalance() + Model.GetCurrency());
    }
    Coin() {
        this.coinText = this.scene.add.text(
            0,
            0,
            'COIN', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.coinValueBg = this.scene.add.image(0, 0, "display_small").setOrigin(0);
        this.coinValueText = this.scene.add.text(
            0,
            0,
            Model.GetCurrentBet() + Model.GetCurrency(), {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
    }
    SetCoinText() {
        // this.coinValueText.setText(Model.GetBalance() + Model.GetCurrency());
    }
    Win() {
        this.winText = this.scene.add.text(
            0,
            0,
            'WIN', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.winValueBg = this.scene.add.image(0, 0, "plus_display").setOrigin(0);
        this.winValueText = this.scene.add.text(
            0,
            0,
            '0', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
    }
    SetWinText() {
        // this.winValueText.setText(Model.GetTotalWin() + Model.GetCurrency());
    }
    BuyCards() {

        this.buyCardsBg = this.scene.add.image(0, 0, "plus_display").setOrigin(0).setInteractive({ useHandCursor: true });//new Button(this.scene, 'plus_display', this.config.buy_cards, 0.5);
        this.buyCardsBg.on('pointerup', this.OnBuyPress, this);
        this.buyCardsText = this.scene.add.text(
            0,
            0,
            'BUY CARDS', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }).setOrigin(0);
    }
    OnBuyPress() {
        if (!this.scene.isDrawStarted) {
            this.scene.scene.stop('GameScene');
            this.scene.scene.start('CardsSelectionScene');
        }

    }
    TotalBetUi() {
        this.totalBetText = this.scene.add.text(
            0,
            0,
            'TOTAL BET', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.totalBetValueBg = this.scene.add.image(0, 0, "plus_display").setOrigin(0);
        this.totalBetValueText = this.scene.add.text(
            0,
            0,
            Model.GetTotalBet(), {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
    }
    SetTotalBetText() {
        // this.totalBetValueText.setText(Model.GetBalance() + Model.GetCurrency());
    }
    StartButton() {
        this.startButtonBg = this.scene.add.image(0, 0, "plus_display").setOrigin(0).setInteractive({ useHandCursor: true });
        this.startButtonText = this.scene.add.text(
            0,
            0,
            'START', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.startButtonBg.on('pointerup', this.OnStartButtonRelease, this);
    }
    OnStartButtonRelease() {
        this.scene.game.events.emit('evtDisableGUI');
        this.scene.game.events.emit('evtOnGameStarted');
    }
    EnableBottomPanel() {
        this.buyCardsBg.setInteractive({ useHandCursor: true });
        this.startButtonBg.setInteractive({ useHandCursor: true });
    }
    DisbleBottomPanel() {
        this.buyCardsBg.removeInteractive();
        this.startButtonBg.removeInteractive();
    }
    UpdateWinText(_totalWin) {
        if(_totalWin > 0) SoundManager.WinSound();
        this.winValueText.setText(_totalWin + Model.GetCurrency());
    }
    Resize(newWidth, newHeight, newScale) {
        this.ResizeUserMoney(newWidth, newHeight, newScale);
        this.ResizeTotalBet(newWidth, newHeight, newScale);
        this.ResizeCoin(newWidth, newHeight, newScale);
        this.ResizeWin(newWidth, newHeight, newScale);
        this.ResizeBuyCards(newWidth, newHeight, newScale);
        this.ResizeStartButton(newWidth, newHeight, newScale);
    }
    ResizeUserMoney(newWidth, newHeight, newScale) {
        let config = this.config.user_money;
        this.userMoneyText.setScale(newScale);
        this.userMoneyText.setPosition(config.title_text.x * newScale, newHeight - config.title_text.y * newScale);
        this.userMoneyValueBg.setScale(newScale);
        this.userMoneyValueBg.setPosition(config.value_bg.x * newScale, newHeight - config.value_bg.y * newScale);
        this.userMoneyValueText.setScale(newScale);
        this.userMoneyValueText.setPosition(config.value_text.x * newScale, newHeight - config.value_text.y * newScale);
    }
    ResizeCoin(newWidth, newHeight, newScale) {
        let config = this.config.coin;

        this.coinText.setScale(newScale);
        this.coinValueBg.setScale(newScale);
        this.coinValueText.setScale(newScale);
        this.coinText.setPosition(config.title_text.x * newScale, newHeight - config.title_text.y * newScale);
        this.coinValueBg.setPosition(config.coin_bg.x * newScale, newHeight - config.coin_bg.y * newScale);
        this.coinValueText.setPosition(config.coin_value.x * newScale, newHeight - config.coin_value.y * newScale);
    }
    ResizeWin(newWidth, newHeight, newScale) {
        let config = this.config.win;

        this.winText.setScale(newScale);
        this.winValueBg.setScale(newScale);
        this.winValueText.setScale(newScale);
        this.winText.setPosition(config.title_text.x * newScale, newHeight - config.title_text.y * newScale);
        this.winValueBg.setPosition(config.win_bg.x * newScale, newHeight - config.win_bg.y * newScale);
        this.winValueText.setPosition(config.win_value.x * newScale, newHeight - config.win_value.y * newScale);
    }

    ResizeTotalBet(newWidth, newHeight, newScale) {
        let config = this.config.total_bet;
        this.totalBetText.setScale(newScale);
        this.totalBetValueBg.setScale(newScale);
        this.totalBetValueText.setScale(newScale);
        this.totalBetText.setPosition(config.title_text.x * newScale, newHeight - config.title_text.y * newScale);
        this.totalBetValueBg.setPosition(config.total_bg.x * newScale, newHeight - config.total_bg.y * newScale);
        this.totalBetValueText.setPosition(config.total_value.x * newScale, newHeight - config.total_value.y * newScale);
    }
    ResizeStartButton(newWidth, newHeight, newScale) {
        let config = this.config.start_button;
        this.startButtonBg.setScale(newScale);
        this.startButtonText.setScale(newScale);
        this.startButtonBg.setPosition(config.start_bg.x * newScale, newHeight - config.start_bg.y * newScale);
        this.startButtonText.setPosition(config.start_text.x * newScale, newHeight - config.start_text.y * newScale);
    }
    ResizeBuyCards(newWidth, newHeight, newScale) {
        // this.buyCardsBg.Resize(newWidth, newHeight, newScale);
        let config = this.config.buy_cards;
        this.buyCardsBg.setScale(newScale);
        this.buyCardsText.setScale(newScale);
        this.buyCardsBg.setPosition(config.buy_bg.x * newScale, newHeight - config.buy_bg.y * newScale);
        this.buyCardsText.setPosition(config.buy_text.x * newScale, newHeight - config.buy_text.y * newScale);
    }
}