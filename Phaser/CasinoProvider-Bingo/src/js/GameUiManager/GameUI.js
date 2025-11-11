import { Constant } from "../Constant";
import { Utils } from "../Utils";
import Cards from "./Cards";
import TopCellContainer from "./TopCellContainer";
import Tube from "./Tube-Extractor";
import Button from "./Button";
import BottomPanel from "./BottomPanel";
import QuitPopup from "../popup/QuitPopup";
import PaytablePopup from "../popup/PaytablePopup";
import { SoundManager } from "../SoundManager";
export default class GameUI {
    constructor(scene, selectedNumberOfCards, selectedNumber) {
        this.scene = scene;
        this.selectedNumber = selectedNumber;
        this.selectedNumberOfCards = selectedNumberOfCards;
        this.config = this.scene.cache.json.get("game-config");
        this.cardsArray = [];
        this.topCellContainer = null;
        this.bingoCardsArray = [];
        this.totalWinScore = 0;
        this.numbersExtractedArray = [];
        this.create();
    }
    create() {
        this.EventHandler();
        this.FullScreenButton();
        this.SoundButton();
        this.CardsCreate();
        this.TopCellContainer();
        this.CreateTubeExtractor();
        this.CreateBottomPanel();
        this.QuitPopup();
        this.CloseButton();
        this.InfoButton();
        this.PaytablePopup();
    }
    EventHandler() {
        this.scene.game.events.on('evtFirstCardHighlightShow', this.FirstCardShow, this);
        this.scene.game.events.on('evtSecondCardHighlightShow', this.SecondCardShow, this);
        this.scene.game.events.on('evtOnGameStarted', this.StartTheDraw, this);
        this.scene.game.events.on('evtDisableGUI', this.DisableGUI, this);
        this.scene.game.events.on('evtEnableGUI', this.EnableGUI, this);

    }
    StartTheDraw() {
        if (this.scene.isDrawStarted) return;
        this.drawNumCounter = 0;
        this.topCellContainer.ResetTopCellsContainer();
        if (this.cardsArray.length > 0) {
            for (let index = 0; index < this.cardsArray.length; index++) {
                this.cardsArray[index].ResetCards();
                this.cardsArray[index].HideCardHighlights();
            }
        }
        this.GenerateRandomBalls();
        this.DrawNextBall();
        this.DrawNextPreviewBall();


    }
    DrawNextBall() {
        if (this.drawNumCounter < this.selectedNumber) {
            this.tubeExtractor.DrawNextBall(this.numbersExtractedArray[this.drawNumCounter], this.DrawNextBall, this);
            this.UpdateTopContainerCells(this.numbersExtractedArray[this.drawNumCounter], this.selectedNumber);
          
        }

    }
    DrawNextPreviewBall(){
        if (this.drawNumCounter < this.selectedNumber) {
            this.tubeExtractor.DrawNextPreviewBall(this.numbersExtractedArray[this.drawNumCounter], this.DrawNextPreviewBall, this);
            this.drawNumCounter++;
            this.tubeExtractor.SetCountdownText(this.drawNumCounter);
        }
    }
    FullScreenButton() {
        this.fullScreenButton = this.scene.add.sprite(0, 0, 'but_fullscreen').setInteractive({ useHandCursor: true });
        this.fullScreenButton.setFrame(1);
        this.fullScreenButton.on('pointerup', this.OnFullScreenButtonClick, this);
    }
    InfoButton() {
        let config = this.scene.cache.json.get("game-config").paytable;
        this.paytableButton = new Button(this.scene, 'but_paytable', config, 0.5);
        this.paytableButton.SetClickCallBack(this.OnPaytableButtonPress, this);
    }
    OnPaytableButtonPress() {
        this.paytablePopup.Show();
    }
    SoundButton() {
        this.soundButton = this.scene.add.sprite(0, 0, 'audio_icon').setInteractive({ useHandCursor: true })
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
        let config = this.scene.cache.json.get("game-config").cards_selection;
        this.closeButton = new Button(this.scene, 'but_exit', config.close, 0.5);
        this.closeButton.SetClickCallBack(this.OnCloseButtonPress, this);
    }
    OnFullScreenButtonClick() {
        if (this.scene.scale.isFullscreen) {
            this.scene.scale.stopFullscreen();
            this.fullScreenButton.setFrame(1);
        } else {
            this.scene.scale.startFullscreen();
            this.fullScreenButton.setFrame(0);
        }
    }
    OnCloseButtonPress() {
        this.quitPopup.Show();
    }
    QuitPopup() {
        this.quitPopup = new QuitPopup(this.scene);
    }
    PaytablePopup() {
        this.paytablePopup = new PaytablePopup(this.scene);
    }
    CardsCreate() {
        for (let index = 0; index < this.selectedNumberOfCards; index++) {
            const element = new Cards(this.scene, this.selectedNumberOfCards, this.selectedNumber, index);
            this.cardsArray.push(element);
        }
    }
    TopCellContainer() {
        this.topCellContainer = new TopCellContainer(this.scene);
    }
    CreateTubeExtractor() {
        this.tubeExtractor = new Tube(this.scene, this.selectedNumber);
    }
    CreateBottomPanel() {
        this.bottomPanel = new BottomPanel(this.scene);
    }
    GenerateRandomBalls() {
        let numbers = Array.from({ length: 90 }, (_, i) => i + 1);
        numbers = this.ShuffleArray(numbers);
        for (let index = 0; index < this.selectedNumber; index++) {
            let randomBallsNumber = Math.floor(Math.random() * 90) + 1;
            numbers.pop(randomBallsNumber);
            this.numbersExtractedArray.push(randomBallsNumber);
        }
    }
    ShuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    UpdateTopContainerCells(randomBallsNumber, index) {
        this.topCellContainer.UpdateCells(randomBallsNumber);
        this.LoopThroughCards(randomBallsNumber, index);

        if (index == this.selectedNumber) {
            for (let i = 0; i < this.bingoCardsArray.length; i++) {
                this.cardsArray[i].ResumeTween(this.bingoCardsArray[i]);
                let amountWinInEachCard = this.cardsArray[i].CheckBingosMade();
                this.totalWinScore += amountWinInEachCard;
            }

            this.bottomPanel.UpdateWinText(this.totalWinScore);
            this.scene.game.events.emit('evtEnableGUI');
        }
    }
    LoopThroughCards(randomBallsNumber, index) {
        for (let i = 0; i < this.cardsArray.length; i++) {
            this.UpdateCards(randomBallsNumber, index, i);
        }
    }
    UpdateCards(randomBallsNumber, index, i) {
        this.cardsArray[i].UpdateCardCellsFrame(randomBallsNumber, i);
    }
    FirstCardShow(_index) {
        this.cardsArray[_index].ShowCard1Highlight();
    }
    SecondCardShow(_cardIndex, _cellIndex) {
        this.cardsArray[_cardIndex].ShowCard2Highlight(_cellIndex);
        if (!this.bingoCardsArray.includes(_cardIndex)) {
            this.bingoCardsArray.push(_cardIndex);
        } else {
            return;
        }
    }
    EnableGUI() {
        this.totalWinScore = 0;
        this.closeButton.Enable();
        this.paytableButton.Enable();
        this.bottomPanel.EnableBottomPanel();
    }
    DisableGUI() {
        this.closeButton.Disable();
        this.paytableButton.Disable();
        this.bottomPanel.DisbleBottomPanel();
    }
    Resize(newWidth, newHeight, newScale) {
        let config = this.scene.cache.json.get("game-config").cards_selection;
        this.fullScreenButton.setScale(newScale);
        this.fullScreenButton.setPosition(config.full_screen.x * newScale, config.full_screen.y * newScale);

        this.soundButton.setScale(newScale);
        this.soundButton.setPosition(newWidth - config.sound.x * newScale, config.sound.y * newScale);

        let closeConfig = this.config.cards_selection.close;
        this.closeButton.setScale(newScale);
        this.closeButton.setPosition(newWidth - closeConfig.x * newScale, closeConfig.y * newScale);

        for (let index = 0; index < this.cardsArray.length; index++) {
            let cardIndex = `cards_${this.selectedNumberOfCards}`;
            let config = this.config.cards_creator[cardIndex];
            this.cardsArray[index].Resize(newWidth, newHeight, newScale, config);
        }
        this.topCellContainer.Resize(newWidth, newHeight, newScale);
        this.tubeExtractor.Resize(newWidth, newHeight, newScale);
        this.bottomPanel.Resize(newWidth, newHeight, newScale);
        this.quitPopup.Resize(newWidth, newHeight, newScale);

        let paytableConfig = this.config.paytable;
        this.paytableButton.setScale(newScale);
        this.paytableButton.setPosition(paytableConfig.x * newScale, paytableConfig.y * newScale);

        this.paytablePopup.Resize(newWidth, newHeight, newScale);
    }
}