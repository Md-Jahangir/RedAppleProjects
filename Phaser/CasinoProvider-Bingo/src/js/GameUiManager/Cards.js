import { Constant } from "../Constant";
import { Model } from "../Model";
import Cells from "./Cells";
export default class Cards {
    constructor(scene, selectedNumberOfCards, selectedNumber, index) {
        this.scene = scene;
        this.selectedNumber = selectedNumber;
        this.selectedNumberOfCards = selectedNumberOfCards;
        this.index = index;
        this.cellArray = [];
        this.config = this.scene.cache.json.get("game-config");
        this.bingoCardIndex = null;
        this.cardScore = 0;
        this.create();
    }
    create() {
        this.scene.game.events.on('evtSecondCardHighlightShow', this.BingoCompleted, this);
        this.cardImage = this.scene.add.image(0, 0, 'card_bg').setOrigin(0);
        // this.cardImage2 = this.scene.add.image(0, 0, 'card_highlight_2').setOrigin(0);
        this.CreateCardHighlights();
        this.CreateCells();
        this.HideCardHighlights();
    }
    CreateCardHighlights() {
        this.cardImage1 = this.scene.add.image(0, 0, 'card_highlight_1').setOrigin(0);
        this.cardImage2 = this.scene.add.image(0, 0, 'card_highlight_2').setOrigin(0);
    }
    HideCardHighlights() {
        this.cardImage1.setVisible(false);
        this.cardImage2.setVisible(false);
    }
    ShowCard1Highlight() {
        if (this.cardImage2.visible) return;
        this.cardImage1.setVisible(true);
        this.cardImage2.setVisible(false);
    }
    ShowCard2Highlight(_cellIndex) {
        this.cardImage1.setVisible(false);
        this.cardImage2.setVisible(true);
        this.cellArray[_cellIndex].UpdateBingoCellsFrame();
    }
    TweenCard2Highlight() {
        this.secondcardTween = this.scene.tweens.add({
            targets: this.cardImage2,
            alpha: 0.5,
            duration: 500,
            ease: 'Power1',
            yoyo: true,
            repeat: -1
        })
        this.PauseTweenCard2();
    }
    PauseTweenCard2() {
        this.secondcardTween.pause();
    }
    ResumeTween() {
        this.secondcardTween.resume();
    }
    CreateCells() {
        let cellIndex = 0;
        let numbers = Array.from({ length: 90 }, (_, i) => i + 1);
        numbers = this.ShuffleArray(numbers);
        for (let index = 0; index < 27; index++) {
            if (index % 9 == 0) {
                let indices = this.GetRandomIndices(9, 5);
                let newCellsRow = new Cells(this.scene, this.cardImage.x, this.cardImage.y, cellIndex);
                cellIndex++;
                this.cellArray.push(newCellsRow);

                for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                    if (indices.includes(cellIndex)) {
                        let number = numbers.pop();
                        newCellsRow.SetText(cellIndex, number.toString());
                        newCellsRow.SetMatchedNumberFrame(cellIndex);
                    }
                }
            }

        }
    }
    ShuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    GetRandomIndices(max, count) {
        let indices = [];
        while (indices.length < count) {
            let randomIndex = Math.floor(Math.random() * max);
            if (!indices.includes(randomIndex)) {
                indices.push(randomIndex);
            }
        }
        return indices;
    }
    UpdateBingoCellsFrame(_bingoCardsArray) {
        if (_bingoCardsArray.length == 0) return;
        for (let i = 0; i < this.cellArray.length; i++) {
            this.cellArray[i].UpdateBingoCellsFrame(i);
        }
    }
    UpdateCardCellsFrame(randomBallsNumber, index) {
        for (let i = 0; i < this.cellArray.length; i++) {
            this.cellArray[i].UpdateCellsFrame(randomBallsNumber, index, i);
        }
    }
    BingoCompleted(index) {
        this.bingoCardIndex = index;
    }
    CheckBingosMade() {
        let filledRowsCount = 0;

        for (let index = 0; index < this.cellArray.length; index++) {
            const element = this.cellArray[index];
            if (element.CheckCellsFilled()) {
                filledRowsCount++;
            }
        }

        this.UpdateScore(filledRowsCount, Model.GetCurrentBet() / Model.GetSelectedCards());
    }
    UpdateScore(filledRowsCount, betPlacedAmount) {
        if (filledRowsCount > 0 && filledRowsCount <= this.paytableValues.length) {
            this.cardScore = betPlacedAmount * this.paytableValues[filledRowsCount - 1];
        } else {
            this.cardScore = 0;
        }
        console.log(`cardScore updated: ${this.cardScore}`);
        return this.cardScore;
    }
    ResetCards() {
        for (let index = 0; index < this.cellArray.length; index++) {
            this.cellArray[index].ResetCells();
        }
    }
    Resize(newWidth, newHeight, newScale, config) {
        this.cardImage.setScale(newScale * config.scale);
        this.cardImage.setPosition(newWidth / 2 + (config.startX + config.offsets[this.index].offsetX) * newScale, newHeight / 2 + (config.startY + config.offsets[this.index].offsetY) * newScale);
        this.cardImage1.setScale(newScale * config.scale);
        this.cardImage1.setPosition(newWidth / 2 + (config.startX + config.offsets[this.index].offsetX + config.offsets[this.index].highlightOffsetX) * newScale, newHeight / 2 + (config.startY + config.offsets[this.index].offsetY + config.offsets[this.index].highlightOffsetY) * newScale);
        this.cardImage2.setScale(newScale * config.scale);
        this.cardImage2.setPosition(newWidth / 2 + (config.startX + config.offsets[this.index].offsetX + config.offsets[this.index].highlightOffsetX) * newScale, newHeight / 2 + (config.startY + config.offsets[this.index].offsetY + config.offsets[this.index].highlightOffsetY) * newScale);

        for (let i = 0; i < this.cellArray.length; i++) {
            let cellConfig = this.config.cells_creator.cells[i];
            this.cellArray[i].Resize(newWidth, newHeight, newScale, config.scale, this.cardImage.x, this.cardImage.y, cellConfig);
        }
    }
}