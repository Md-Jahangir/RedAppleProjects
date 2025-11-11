import { Constant } from "../Constant";
import { SoundManager } from "../SoundManager";
export default class Cells {
    constructor(scene, cardImageX, cardImageY, index) {
        this.scene = scene;
        this.cardImageX = cardImageX;
        this.cardImageY = cardImageY;
        this.cellSpritesArray = [];
        this.frameCount = 0;
        this.cellIndex = index;
        this.isBingoMade = false;
        this.create();
    }
    create() {
        for (let index = 0; index < 9; index++) {
            let cellObject = { cellImg: null, cellTxt: null }
            let cellImage = this.scene.add.image(0, 0, 'card_cell').setOrigin(0.5);
            cellImage.setFrame(0);
            let cellText = this.scene.add.text(
                0,
                0,
                '', {
                fontFamily: "CAMBRIAB",
                fontStyle: "bold",
                fontSize: '30px',
                color: '#000'
            }
            ).setOrigin(0.5);
            cellObject.cellImg = cellImage;
            cellObject.cellTxt = cellText;
            this.cellSpritesArray.push(cellObject);
        }
    }
    GetCellImg(_cellIndex) {
        for (let index = 0; index < this.cellSpritesArray.length; index++) {
            if (_cellIndex == index) {
                return this.cellSpritesArray[index].cellImg;
            }
        }
    }
    GetCellText(_cellIndex) {
        for (let index = 0; index < this.cellSpritesArray.length; index++) {
            if (_cellIndex == index) {
                return this.cellSpritesArray[index].cellTxt;
            }
        }
    }
    SetText(cellIndex, _text) {
        let cellText = this.GetCellText(cellIndex);
        cellText.setText(_text);
    }
    UpdateBingoCellsFrame() {
        for (let index = 0; index < this.cellSpritesArray.length; index++) {
            if (this.cellSpritesArray[index].cellImg.frame.name == 2) {
                this.SetBingoFrame(index);
            }
        }
    }
    UpdateCellsFrame(randomBallsNumber, cardIndex) {
        for (let index = 0; index < this.cellSpritesArray.length; index++) {
            if (this.cellSpritesArray[index].cellTxt._text == randomBallsNumber && this.cellSpritesArray[index].cellImg.frame.name == 1) {
                this.SetNearBingoFrame(index);
            }
        }
        let currentFramesPattern = this.CalCurrFramesLengthInArray(cardIndex);
        if (currentFramesPattern == 4) {
            this.scene.game.events.emit('evtFirstCardHighlightShow', cardIndex, this.cellIndex);
        }
        if (currentFramesPattern == 5) {
            this.isBingoMade = true;
            this.scene.game.events.emit('evtSecondCardHighlightShow', cardIndex, this.cellIndex);
            SoundManager.WinRowSound();
        }
    }
    CheckCellsFilled() {
        return this.isBingoMade;
    }
    Resize(newWidth, newHeight, newScale, scaleMultiplier, _newX, _newY, cellConfig) {
        this.cardImageX = _newX;
        this.cardImageY = _newY;
        for (let index = 0; index < this.cellSpritesArray.length; index++) {
            let getCellImg = this.GetCellImg(index);
            let getCellText = this.GetCellText(index);
            getCellImg.setScale(newScale * scaleMultiplier);
            getCellText.setScale(newScale * scaleMultiplier);
            getCellImg.setPosition(this.cardImageX + (index * getCellImg.displayWidth) + cellConfig.offsetX * newScale * scaleMultiplier, this.cardImageY + cellConfig.offsetY * newScale * scaleMultiplier);
            getCellText.setPosition(getCellImg.x, getCellImg.y);
        }
    }
    SetMatchedNumberFrame(cellIndex) {
        let cellImg = this.GetCellImg(cellIndex);
        cellImg.setFrame(1);
    }
    SetNearBingoFrame(_index) {
        let cellImg = this.GetCellImg(_index);
        cellImg.setFrame(2);
    }
    SetBingoFrame(_index) {
        let cellImg = this.GetCellImg(_index);
        cellImg.setFrame(3);
    }
    ResetCells() {
        this.isBingoMade = false;
        for (let index = 0; index < this.cellSpritesArray.length; index++) {
            if (this.cellSpritesArray[index].cellImg.frame.name == 2) this.cellSpritesArray[index].cellImg.setFrame(1);
        }
    }

    CalCurrFramesLengthInArray(index) {
        this.frameCount = 0;
        for (let index = 0; index < this.cellSpritesArray.length; index++) {
            if (this.cellSpritesArray[index].cellImg.frame.name == 2) {
                this.frameCount++;
            }
        }
        return this.frameCount;
    }
}
