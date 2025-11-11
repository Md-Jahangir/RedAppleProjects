import Button from "../GameUiManager/Button";
import { Utils } from "../Utils";
import { SelectedResolution } from "../ResolutionSelector";
import PaytableData from "../GameUiManager/PaytableData";
import { Model } from "../Model";
import { SoundManager } from "../SoundManager";
export default class CardsSelectionScene extends Phaser.Scene {
    constructor() {
        // super({ key: "CardsSelectionScene" });
        super("CardsSelectionScene");
    }
    init() {
        this.selectedNumberOfCards = 4;
        this.selectedNumber = 45;
        this.coinCounter = 0;
        this.betArray = Model.GetBetsValues();
    }
    create() {
        this.game.events.on("resize", this.Resize, this);
        this.config = this.cache.json.get("game-config").cards_selection;

        this.BackGround();
        this.FullScreenButton();
        this.SoundButton();
        this.CloseButton();
        this.SelectCardsTitle();
        this.NumCardsSection();
        this.PaytableSection();
        this.NumberToExtractSection();
        this.BottomPanelSection();
        this.Resize(window.innerWidth, window.innerHeight);
    }
    BackGround() {
        this.cardsSelectionBackGround = this.add.image(0, 0, "bg_select_card").setOrigin(0);
    }
    FullScreenButton() {
        this.fullScreenButton = this.add.sprite(0, 0, 'but_fullscreen').setInteractive({ useHandCursor: true });
        this.fullScreenButton.setFrame(1);
        this.fullScreenButton.on('pointerup', this.OnFullScreenButtonClick, this);
    }
    OnFullScreenButtonClick() {
        if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
            this.fullScreenButton.setFrame(1);
            // On stop fulll screen
        } else {
            this.scale.startFullscreen();
            this.fullScreenButton.setFrame(0);
            // On start fulll screen
        }
    }
    SoundButton() {
        this.soundButton = this.add.sprite(0, 0, 'audio_icon').setInteractive({ useHandCursor: true });
        this.soundButton.setFrame(0);
        this.soundButton.on('pointerup', this.SoundButtonClicked, this);
        this.CheckLocalStorageForSound();
    }
    SoundButtonClicked() {
        if (localStorage.getItem('sound_status_bingo') == 0) {
            this.soundButton.setFrame(1);
            localStorage.setItem('sound_status_bingo', 1);
            SoundManager.StopGameBgSound();
        } else {
            this.soundButton.setFrame(0);
            localStorage.setItem('sound_status_bingo', 0);
            SoundManager.PlayGameBgSound();
        }
    }
    CheckLocalStorageForSound() {
        if (localStorage.getItem('sound_status_bingo') == null) {
            localStorage.setItem('sound_status_bingo', 0);
            SoundManager.PlayGameBgSound();
        } else {
            if (localStorage.getItem('sound_status_bingo') == 0) {
                this.soundButton.setFrame(0);
                localStorage.setItem('sound_status_bingo', 0);
                SoundManager.PlayGameBgSound();
            } else {
                this.soundButton.setFrame(1);
                localStorage.setItem('sound_status_bingo', 1);
                SoundManager.StopGameBgSound();
            }
        }
    }
    CloseButton() {
        this.closeButton = new Button(this, 'but_exit', this.config.close, 0.5);
        this.closeButton.SetClickCallBack(this.OnCloseButtonPress, this);
    }
    OnCloseButtonPress() {
        this.scene.start('SplashScene');
        this.scene.stop('CardsSelectionScene');
    }
    SelectCardsTitle() {
        this.selectCardsText = this.add.text(
            0,
            0,
            'SELECT CARDS', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '120px',
            color: '#fff'
        }
        ).setOrigin(0.5);
    }
    NumCardsSection() {
        this.numCardsBg = this.add.image(0, 0, "num_card_base").setOrigin(0);

        this.numTitleText = this.add.text(
            0,
            0,
            'NUM CARDS', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.numValueText = this.add.text(
            0,
            0,
            this.selectedNumberOfCards, {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '50px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.cardsDecrementorBg = this.add.sprite(0, 0, "but_plus").setOrigin(0).setInteractive({ useHandCursor: true });
        this.cardsIncrementorBg = this.add.sprite(0, 0, "but_plus").setOrigin(0).setInteractive({ useHandCursor: true });
        this.SetFrameOfCardDecrementor();
        // this.SetFrameOfCardIncrementor();
        Model.SetSelectedCards(this.selectedNumberOfCards);
        this.cardsDecrementorBg.on('pointerup', () => {
            this.SetDecrementorText();
            this.SetFrameOfCardDecrementor();
            this.UpdateTotalBetText();
        })
        this.cardsIncrementorBg.on('pointerup', () => {
            this.SetIncrementorText();
            this.SetFrameOfCardDecrementor();
            this.UpdateTotalBetText();
        })
        this.minusText = this.add.text(
            this.cardsDecrementorBg.x,
            this.cardsDecrementorBg.y,
            '-', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '80px',
            color: '#fff'
        }
        ).setOrigin(0.5);
        this.plusText = this.add.text(
            0,
            0,
            '+', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '80px',
            color: '#fff'
        }
        ).setOrigin(0.5);
    }
    SetDecrementorText() {
        if (this.selectedNumberOfCards > 1) {
            this.selectedNumberOfCards--;
        } else {
            return;
        }
        this.numValueText.setText(this.selectedNumberOfCards);
        Model.SetSelectedCards(this.selectedNumberOfCards);
    }
    SetIncrementorText() {
        if (this.selectedNumberOfCards < 6) {
            this.selectedNumberOfCards++;
        } else {
            return;
        }
        this.numValueText.setText(this.selectedNumberOfCards);
        Model.SetSelectedCards(this.selectedNumberOfCards);
    }
    SetFrameOfCardDecrementor() {
        if (this.selectedNumberOfCards == 1) {
            this.cardsDecrementorBg.setFrame(1);
        } else if (this.selectedNumberOfCards == 6) {
            this.cardsIncrementorBg.setFrame(1);
        }
        else {
            this.cardsDecrementorBg.setFrame(0)
            this.cardsIncrementorBg.setFrame(0);
        }

    }

    PaytableSection() {
        let config = this.config.paytable;
        this.paytableBg = this.add.image(0, 0, "paytable_base").setOrigin(0);

        this.paytableTitleText = this.add.text(
            0,
            0,
            'PAYTABLE', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.paytableData = new PaytableData(this, this.paytableBg.x, this.paytableBg.y, config, 'card_cell_small');

    }
    NumberToExtractSection() {
        this.numberToExtractBg = this.add.image(0, 0, "extract_num_base").setOrigin(0);
        this.numberToExtractText = this.add.text(
            0,
            0,
            'NUMBER TO EXTRACT', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.num_bg_1 = this.add.sprite(0, 0, "but_ball").setOrigin(0).setInteractive({ useHandCursor: true });
        this.num_text_1 = this.add.text(
            0,
            0,
            '45', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);

        this.num_bg_2 = this.add.sprite(0, 0, "but_ball").setOrigin(0).setInteractive({ useHandCursor: true });
        this.num_text_2 = this.add.text(
            0,
            0,
            '55', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);

        this.num_bg_3 = this.add.sprite(0, 0, "but_ball").setOrigin(0).setInteractive({ useHandCursor: true });
        this.num_text_3 = this.add.text(
            0,
            0,
            '65', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);

        this.num_bg_1.setFrame(1);
        this.num_bg_2.setFrame(1);
        this.num_bg_3.setFrame(1);

        this.num_bg_1.on('pointerup', this.UpdateFistNumFrame, this);
        this.num_bg_2.on('pointerup', this.UpdateSecondNumFrame, this);
        this.num_bg_3.on('pointerup', this.UpdateThirdNumFrame, this);
        this.UpdateFistNumFrame();

    }
    UpdateFistNumFrame() {
        this.selectedNumber = 45;
        this.num_bg_1.setFrame(0);
        this.num_bg_2.setFrame(1);
        this.num_bg_3.setFrame(1);
        this.paytableData.UpdateFullHousetext();
    }
    UpdateSecondNumFrame() {
        this.selectedNumber = 55;
        this.num_bg_1.setFrame(1);
        this.num_bg_2.setFrame(0);
        this.num_bg_3.setFrame(1);
        this.paytableData.UpdateAny2Linetext();
    }
    UpdateThirdNumFrame() {
        this.selectedNumber = 65;
        this.num_bg_1.setFrame(1);
        this.num_bg_2.setFrame(1);
        this.num_bg_3.setFrame(0);
        this.paytableData.UpdateAnyLinetext();
    }

    BottomPanelSection() {
        this.UserMoney();
        this.CoinUi();
        this.CoinDecreament();
        this.CoinIncreament();
        this.TotalBetUi();
        this.PlayButton();
    }
    UserMoney() {
        this.userMoneyText = this.add.text(
            0,
            0,
            'MONEY', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.userMoneyValueBg = this.add.image(0, 0, "plus_display").setOrigin(0);
        this.userMoneyValueText = this.add.text(
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
    CoinDecreament() {
        this.coinDecrementar = this.add.sprite(0, 0, 'but_plus').setInteractive({ useHandCursor: true });
        this.coinDecrementar.setFrame(1);
        this.coinMinusText = this.add.text(
            this.cardsDecrementorBg.x,
            this.cardsDecrementorBg.y,
            '-', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '80px',
            color: '#fff'
        }
        ).setOrigin(0.5);
        this.coinDecrementar.on('pointerup', () => {
            this.DecreaseCoinValueText();
            this.UpdateFrameOfDecrementor();
            this.UpdateTotalBetText();
        });
    }
    CoinIncreament() {
        this.coinIncrementar = this.add.sprite(0, 0, 'but_plus').setInteractive({ useHandCursor: true });
        this.coinIncrementar.setFrame(0);
        this.coinPlusText = this.add.text(
            0,
            0,
            '+', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '80px',
            color: '#fff'
        }
        ).setOrigin(0.5);

        this.coinIncrementar.on('pointerup', () => {
            this.IncreaseCoinValueText();
            this.UpdateFrameOfDecrementor();
            this.UpdateTotalBetText();
        });

    }
    UpdateFrameOfDecrementor() {
        const regex = /(\d+\.?\d*)(\$)/;
        const match = this.coinValueText._text.match(regex);
        if (match) {
            const valueText = match[1];
            const dollarSign = match[2];
            if (valueText == this.betArray[0]) {
                this.coinDecrementar.setFrame(1);
            }
            else if (valueText == this.betArray[this.betArray.length - 1]) {
                this.coinIncrementar.setFrame(1);
            }
            else {
                this.coinDecrementar.setFrame(0)
                this.coinIncrementar.setFrame(0);
            }
        }
    }
    IncreaseCoinValueText() {

        if (this.coinCounter < this.betArray.length - 1) {
            this.coinCounter++;
        } else {
            return;
        }
        this.coinValueText.setText(this.betArray[this.coinCounter] + Model.GetCurrency());
        Model.SetCurrentBet(this.betArray[this.coinCounter]);
    }
    DecreaseCoinValueText() {

        if (this.coinCounter > 0) {
            this.coinCounter--;
        } else {
            return;
        }
        this.coinValueText.setText(this.betArray[this.coinCounter] + Model.GetCurrency());
        Model.SetCurrentBet(this.betArray[this.coinCounter]);
    }

    CoinUi() {
        this.coinText = this.add.text(
            0,
            0,
            'COIN', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.coinValueBg = this.add.image(0, 0, "display_small").setOrigin(0);
        this.coinValueText = this.add.text(
            0,
            0,
            this.betArray[0] + Model.GetCurrency(), {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0.5);
        Model.SetCurrentBet(this.betArray[this.coinCounter]);
    }
    TotalBetUi() {
        this.totalBetText = this.add.text(
            0,
            0,
            'TOTAL BET', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.totalBetValueBg = this.add.image(0, 0, "plus_display").setOrigin(0);
        this.totalBetValueText = this.add.text(
            0,
            0,
            Model.GetCurrentBet() * Model.GetSelectedCards() + Model.GetCurrency(), {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        Model.SetTotalBet(Model.GetCurrentBet() * Model.GetSelectedCards() + Model.GetCurrency());
    }
    UpdateTotalBetText() {
        this.totalBetValueText.setText(Model.GetCurrentBet() * Model.GetSelectedCards() + Model.GetCurrency());
        Model.SetTotalBet(Model.GetCurrentBet() * Model.GetSelectedCards() + Model.GetCurrency());
    }
    PlayButton() {
        this.playButtonBg = this.add.image(0, 0, "plus_display").setOrigin(0).setInteractive({ useHandCursor: true });
        this.playButtonText = this.add.text(
            0,
            0,
            'PLAY', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }
        ).setOrigin(0);
        this.playButtonBg.on('pointerup', this.OnPlayButtonRelease, this);
    }
    OnPlayButtonRelease() {
        this.scene.stop('CardsSelectionScene');
        this.scene.start('GameScene', { selectedNumberOfCards: this.selectedNumberOfCards, selectedNumber: this.selectedNumber });
    }

    Resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

        this.cardsSelectionBackGround.setDisplaySize(newWidth, newHeight);

        this.fullScreenButton.setScale(newScale);
        this.fullScreenButton.setPosition(this.config.full_screen.x * newScale, this.config.full_screen.y * newScale);

        this.soundButton.setScale(newScale);
        this.soundButton.setPosition(newWidth - this.config.sound.x * newScale, this.config.sound.y * newScale);

        // this.closeButton.Resize(newWidth, newHeight, newScale);
        let closeConfig = this.config.close;
        this.closeButton.setScale(newScale);
        this.closeButton.setPosition(newWidth - closeConfig.x * newScale, closeConfig.y * newScale);

        this.selectCardsText.setScale(newScale);
        this.selectCardsText.setPosition(newWidth / 2 - this.config.title_text.x * newScale, this.config.title_text.y * newScale);


        this.ResizeNumCards(newWidth, newHeight, newScale);
        this.ResizeNumToExtract(newWidth, newHeight, newScale);
        this.ResizePaytable(newWidth, newHeight, newScale);
        this.ResizeUserMoney(newWidth, newHeight, newScale);
        this.ResizeCoin(newWidth, newHeight, newScale);
        this.ResizeTotalBet(newWidth, newHeight, newScale);
        this.ResizePlayButton(newWidth, newHeight, newScale);
    }
    ResizePaytable(newWidth, newHeight, newScale) {
        let config = this.config.paytable;
        this.paytableBg.setScale(newScale);
        this.paytableBg.setPosition(newWidth / 2 + config.x * newScale, newHeight / 2 - config.y * newScale);

        this.paytableTitleText.setScale(newScale);
        this.paytableTitleText.setPosition(this.paytableBg.x + config.title_text.x * newScale, this.paytableBg.y + config.title_text.y * newScale);
        this.paytableData.Resize(this.paytableBg.x, this.paytableBg.y, newScale, config);
        // console.log("this.paytableData: ", this.paytableData);
        // this.paytableData.setScale(newScale);
        // this.paytableData.setPosition(this.paytableBg.x, this.paytableBg.y);
    }
    ResizeNumCards(newWidth, newHeight, newScale) {
        let config = this.config.numcards;
        this.numCardsBg.setScale(newScale);
        this.numCardsBg.setPosition(newWidth / 2 - config.x * newScale, newHeight / 2 - config.y * newScale);

        this.numTitleText.setScale(newScale);
        this.numTitleText.setPosition(this.numCardsBg.x + config.title_text.x * newScale, this.numCardsBg.y + config.title_text.y * newScale);

        this.numValueText.setScale(newScale);
        this.numValueText.setPosition(this.numCardsBg.x + config.num_text.x * newScale, this.numCardsBg.y + config.num_text.y * newScale);

        this.cardsDecrementorBg.setScale(newScale);
        this.cardsDecrementorBg.setPosition(this.numCardsBg.x + config.minus.x * newScale, this.numCardsBg.y + config.minus.y * newScale);

        this.cardsIncrementorBg.setScale(newScale);
        this.cardsIncrementorBg.setPosition(this.numCardsBg.x + config.plus.x * newScale, this.numCardsBg.y + config.plus.y * newScale);

        this.plusText.setScale(newScale);
        this.plusText.setPosition(this.cardsIncrementorBg.x + config.plus.offsetX * newScale, this.cardsIncrementorBg.y + config.plus.offsetY * newScale);

        this.minusText.setScale(newScale);
        this.minusText.setPosition(this.cardsDecrementorBg.x + config.minus.offsetX * newScale, this.cardsDecrementorBg.y + config.minus.offsetY * newScale);

    }
    ResizeNumToExtract(newWidth, newHeight, newScale) {
        let config = this.config.number_to_extract;
        this.numberToExtractBg.setScale(newScale);
        this.numberToExtractBg.setPosition(newWidth / 2 - config.x * newScale, newHeight / 2 + config.y * newScale);

        this.numberToExtractText.setScale(newScale);
        this.numberToExtractText.setPosition(this.numberToExtractBg.x + config.title_text.x * newScale, this.numberToExtractBg.y + config.title_text.y * newScale)
        this.num_bg_1.setScale(newScale);
        this.num_bg_1.setPosition(this.numberToExtractBg.x + config.num_text1.x * newScale, this.numberToExtractBg.y + config.num_text1.y * newScale)
        this.num_text_1.setScale(newScale);
        this.num_text_1.setPosition(this.num_bg_1.x + config.num_text1.offsetX * newScale, this.num_bg_1.y + config.num_text1.offsetY * newScale)

        this.num_bg_2.setScale(newScale);
        this.num_bg_2.setPosition(this.numberToExtractBg.x + config.num_text2.x * newScale, this.numberToExtractBg.y + config.num_text2.y * newScale)
        this.num_text_2.setScale(newScale);
        this.num_text_2.setPosition(this.num_bg_2.x + config.num_text1.offsetX * newScale, this.num_bg_2.y + config.num_text1.offsetY * newScale)

        this.num_bg_3.setScale(newScale);
        this.num_bg_3.setPosition(this.numberToExtractBg.x + config.num_text3.x * newScale, this.numberToExtractBg.y + config.num_text3.y * newScale)
        this.num_text_3.setScale(newScale);
        this.num_text_3.setPosition(this.num_bg_3.x + config.num_text1.offsetX * newScale, this.num_bg_3.y + config.num_text1.offsetY * newScale)

    }
    ResizeUserMoney(newWidth, newHeight, newScale) {
        let config = this.config.bottom_panel.user_money;
        this.userMoneyText.setScale(newScale);
        this.userMoneyText.setPosition(config.title_text.x * newScale, newHeight - config.title_text.y * newScale);
        this.userMoneyValueBg.setScale(newScale);
        this.userMoneyValueBg.setPosition(config.value_bg.x * newScale, newHeight - config.value_bg.y * newScale);
        this.userMoneyValueText.setScale(newScale);
        this.userMoneyValueText.setPosition(config.value_text.x * newScale, newHeight - config.value_text.y * newScale);
    }
    ResizeCoin(newWidth, newHeight, newScale) {
        let config = this.config.bottom_panel.coin_section;
        this.coinDecrementar.setScale(newScale);
        this.coinIncrementar.setScale(newScale);
        this.coinDecrementar.setPosition(config.coin_decrement.x * newScale, newHeight - config.coin_decrement.y * newScale);
        this.coinIncrementar.setPosition(config.coin_increment.x * newScale, newHeight - config.coin_increment.y * newScale);

        this.coinText.setScale(newScale);
        this.coinValueBg.setScale(newScale);
        this.coinValueText.setScale(newScale);
        this.coinText.setPosition(config.coin.title_text.x * newScale, newHeight - config.coin.title_text.y * newScale);
        this.coinValueBg.setPosition(config.coin.coin_bg.x * newScale, newHeight - config.coin.coin_bg.y * newScale);
        this.coinValueText.setPosition(config.coin.coin_value.x * newScale, newHeight - config.coin.coin_value.y * newScale);

        this.coinPlusText.setScale(newScale);
        this.coinMinusText.setScale(newScale);
        this.coinMinusText.setPosition(this.coinDecrementar.x + config.coin_decrement.offsetX * newScale, this.coinDecrementar.y + config.coin_decrement.offsetY * newScale);
        this.coinPlusText.setPosition(this.coinIncrementar.x + config.coin_increment.offsetX * newScale, this.coinIncrementar.y + config.coin_increment.offsetY * newScale);

    }
    ResizeTotalBet(newWidth, newHeight, newScale) {
        let config = this.config.bottom_panel.total_bet;
        this.totalBetText.setScale(newScale);
        this.totalBetValueBg.setScale(newScale);
        this.totalBetValueText.setScale(newScale);
        this.totalBetText.setPosition(config.title_text.x * newScale, newHeight - config.title_text.y * newScale);
        this.totalBetValueBg.setPosition(config.total_bg.x * newScale, newHeight - config.total_bg.y * newScale);
        this.totalBetValueText.setPosition(config.total_value.x * newScale, newHeight - config.total_value.y * newScale);
    }
    ResizePlayButton(newWidth, newHeight, newScale) {
        let config = this.config.bottom_panel.play_button;
        this.playButtonBg.setScale(newScale);
        this.playButtonText.setScale(newScale);
        this.playButtonBg.setPosition(config.play_bg.x * newScale, newHeight - config.play_bg.y * newScale);
        this.playButtonText.setPosition(config.play_text.x * newScale, newHeight - config.play_text.y * newScale);
    }

}