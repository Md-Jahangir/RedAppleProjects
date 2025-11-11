import { Constant } from "./Constant";

class WordPlace {
    constructor(_scene, _alphabets, _randomWords, _indexWords, _grid, _row, _hiddenWords) {
        //Parameter Declare
        this.scene = _scene;
        this.alphabets = _alphabets;
        this.randomWords = _randomWords;
        this.hiddenWords = _hiddenWords;
        this.words = _indexWords;
        this.gridTable = _grid;
        this.column = _row;
        this.hintArrayIndexCounter = 0;
        this.posArray = [];

        //Calling Functions
        this.WordsSorting();
        this.TextPlace();
        this.HiddenWordPlace();
        this.FillEmptyCell();
        this.StoreLengthOfWords();
        //Text Input
        // this.inputBox = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height - 100, 'input_box');
        // this.inputTextDialog = this.scene.add.text(Constant.game.config.width / 3, Constant.game.config.height - 170, 'Enter Words').setScale(2);
        // this.inputText = this.scene.add.text(Constant.game.config.width / 2, Constant.game.config.height - 100, '').setOrigin(0.5).setScale(2);

        // this.TextInputForSearchWord();
    }

    WordsSorting() {
        // console.log('unsorted', this.randomWords);
        this.randomWords.sort((_wordA, _wordB) => _wordA.length - _wordB.length);
        this.randomWords.reverse();
        this.hiddenWords.sort((_wordA, _wordB) => _wordA.length - _wordB.length);
        this.hiddenWords.reverse();
        // console.log('sorted', this.randomWords, this.hiddenWords.length);
    }

    TextPlace() {
        this.storingIndexOfWords = [];
        this.counterOfWordPlaced = 0;
        for (let index = 0; index < Constant.numberOfWordsForPlace; index++) {
            this.storingIndexOfWords[index] = [];
        }
        for (let i = 0; i < Constant.numberOfWordsForPlace; i++) {
            let isPlaced = false;
            while (!isPlaced) {
                this.randomPattern = parseInt(Phaser.Math.Between(1, 4));
                // this.randomPattern = 4;
                this.randomRow = parseInt(Phaser.Math.Between(1, 10));
                this.randomColumn = parseInt(Phaser.Math.Between(1, 10));
                if (this.CanPlaceWord(this.randomWords[i], this.column, this.randomPattern, this.randomRow, this.randomColumn)) {
                    this.PlaceWord(this.randomWords[i], this.randomPattern);
                    isPlaced = true;
                }
            }
        }
    }
    HiddenWordPlace() {
        this.storingHiddenIndexOfWords = [];
        this.counterOfHiddenWordPlaced = 0;
        for (let index = 0; index < this.hiddenWords.length; index++) {
            this.storingHiddenIndexOfWords[index] = [];
        }
        for (let i = 0; i < this.scene.rndWordNo; i++) {
            let isPlaced = false;
            while (!isPlaced) {
                this.randomHPattern = parseInt(Phaser.Math.Between(1, 4));
                // this.randomPattern = 4;
                this.randomHRow = parseInt(Phaser.Math.Between(1, 10));
                this.randomHColumn = parseInt(Phaser.Math.Between(1, 10));
                if (this.CanPlaceWord(this.hiddenWords[i], this.column, this.randomHPattern, this.randomHRow, this.randomHColumn)) {
                    this.PlaceHWord(this.hiddenWords[i], this.randomHPattern);
                    isPlaced = true;
                }
            }
        }
    }
    CanPlaceWord(cellWord, gridLength, pattern, row, column) {
        if (pattern == 1) {
            this.startIndex = ((row - 1) * gridLength) + column;
            if (column + cellWord.length > gridLength) {
                // console.log("False");
                return false;
            }
            for (let index = 0; index < cellWord.length; index++) {
                if (this.gridTable.sizerChildren[this.startIndex + (index - 1)].children[1].text != "") {
                    return false;
                }
            }
        }
        else if (pattern == 2) {
            this.startIndex = ((row - 1) * gridLength) + column;
            if (row + cellWord.length > gridLength) {
                return false;
            }
            let i = 0;
            for (let index = 0; index < cellWord.length; index++) {
                if (this.gridTable.sizerChildren[this.startIndex + (i - 1)].children[1].text != "") {
                    // console.log("False");
                    return false;
                }
                i += this.column;
            }
        }
        else if (pattern == 3) {
            this.startIndex = ((row - 1) * gridLength) + column;
            if ((row + cellWord.length) > gridLength || (column + cellWord.length) > gridLength) {
                // console.log("False");
                return false;
            }
            let j = 0;
            for (let index = 0; index < cellWord.length; index++) {
                if (this.gridTable.sizerChildren[this.startIndex + (j - 1)].children[1].text != "") {
                    return false;
                }
                j += this.column + 1;
            }
        }
        else if (pattern == 4) {
            this.startIndex = ((row - 1) * gridLength) + column;
            if ((row + cellWord.length) > gridLength || (cellWord.length) > column) {
                return false;
            }
            let k = 0;
            for (let index = 0; index < cellWord.length; index++) {
                if (this.gridTable.sizerChildren[this.startIndex + (k - 1)].children[1].text != "") {
                    return false;
                }
                k += this.column - 1;
            }
        }
        return true;
    }
    PlaceWord(cellWord, pattern) {
        switch (pattern) {
            case 1:
                for (let index = 0; index < cellWord.length; index++) {
                    this.storingIndexOfWords[this.counterOfWordPlaced][index] = this.startIndex + (index - 1);
                    this.gridTable.sizerChildren[this.startIndex + (index - 1)].children[1].setText(cellWord[index]).setOrigin(0.5, 0.2);
                }
                this.counterOfWordPlaced++;
                break;
            case 2:
                let shiftIndex = 0;
                for (let index = 0; index < cellWord.length; index++) {
                    this.storingIndexOfWords[this.counterOfWordPlaced][index] = this.startIndex + (shiftIndex - 1);
                    this.gridTable.sizerChildren[this.startIndex + (shiftIndex - 1)].children[1].setText(cellWord[index]).setOrigin(0.5, 0.2);
                    shiftIndex += this.column;
                }
                this.counterOfWordPlaced++;
                break;
            case 3:
                let changeIndex = 0;
                for (let index = 0; index < cellWord.length; index++) {
                    this.storingIndexOfWords[this.counterOfWordPlaced][index] = this.startIndex + (changeIndex - 1);
                    this.gridTable.sizerChildren[this.startIndex + (changeIndex - 1)].children[1].setText(cellWord[index]).setOrigin(0.5, 0.2);
                    changeIndex += this.column + 1;
                }
                this.counterOfWordPlaced++;
                break;
            case 4:
                let changeIndexDiag = 0;
                for (let index = 0; index < cellWord.length; index++) {
                    this.storingIndexOfWords[this.counterOfWordPlaced][index] = this.startIndex + (changeIndexDiag - 1);
                    this.gridTable.sizerChildren[this.startIndex + (changeIndexDiag - 1)].children[1].setText(cellWord[index]).setOrigin(0.5, 0.2);
                    changeIndexDiag += 10 - 1;
                }
                this.counterOfWordPlaced++;
                break;
        }
        // console.log("HINTS--------> ", this.storingIndexOfWords);
    }
    PlaceHWord(cellWord, pattern) {
        switch (pattern) {
            case 1:
                for (let index = 0; index < cellWord.length; index++) {
                    this.storingHiddenIndexOfWords[this.counterOfHiddenWordPlaced][index] = this.startIndex + (index - 1);
                    this.gridTable.sizerChildren[this.startIndex + (index - 1)].children[1].setText(cellWord[index]).setOrigin(0.5, 0.2);
                }
                this.counterOfHiddenWordPlaced++;
                break;
            case 2:
                let shiftIndex = 0;
                for (let index = 0; index < cellWord.length; index++) {
                    this.storingHiddenIndexOfWords[this.counterOfHiddenWordPlaced][index] = this.startIndex + (shiftIndex - 1);
                    this.gridTable.sizerChildren[this.startIndex + (shiftIndex - 1)].children[1].setText(cellWord[index]).setOrigin(0.5, 0.2);
                    shiftIndex += this.column;
                }
                this.counterOfHiddenWordPlaced++;
                break;
            case 3:
                let changeIndex = 0;
                for (let index = 0; index < cellWord.length; index++) {
                    this.storingHiddenIndexOfWords[this.counterOfHiddenWordPlaced][index] = this.startIndex + (changeIndex - 1);
                    this.gridTable.sizerChildren[this.startIndex + (changeIndex - 1)].children[1].setText(cellWord[index]).setOrigin(0.5, 0.2);
                    changeIndex += this.column + 1;
                }
                this.counterOfHiddenWordPlaced++;
                break;
            case 4:
                let changeIndexDiag = 0;
                for (let index = 0; index < cellWord.length; index++) {
                    this.storingHiddenIndexOfWords[this.counterOfHiddenWordPlaced][index] = this.startIndex + (changeIndexDiag - 1);
                    this.gridTable.sizerChildren[this.startIndex + (changeIndexDiag - 1)].children[1].setText(cellWord[index]).setOrigin(0.5, 0.2);
                    changeIndexDiag += 10 - 1;
                }
                this.counterOfHiddenWordPlaced++;
                break;
        }
    }
    FillEmptyCell() {
        for (let index = 0; index < this.gridTable.sizerChildren.length; index++) {
            if (this.gridTable.sizerChildren[index].children[1].text == '') {
                let alphabet = this.alphabets[parseInt(Phaser.Math.Between(0, this.alphabets.length - 1))]
                this.gridTable.sizerChildren[index].children[1].setText(alphabet).setOrigin(0.5, 0.2);
            }
        }
    }
    StoreLengthOfWords() {
        this.maxCount = this.storingIndexOfWords.length - 1;
    }
    GetWordHint() {
        this.wordsForTweens = [];
        // let randomWordPickForHint = parseInt(Phaser.Math.Between(0, this.storingIndexOfWords.length - 1));


        // if (this.hintArrayIndexCounter <= this.maxCount) {
        Constant.countHint--;
        this.scene.rHintTxt.setText(Constant.countHint);
        // console.info("Terminator------------------------------", this.hintArrayIndexCounter);
        // for (let i = 0; i < this.storingIndexOfWords.length; i++) {

        // }
        for (let i = 0; i < this.storingIndexOfWords[this.hintArrayIndexCounter].length; i++) {
            this.wordsForTweens = this.gridTable.sizerChildren[this.storingIndexOfWords[this.hintArrayIndexCounter][i]].children[0];
            // this.gridTable.sizerChildren[this.storingIndexOfWords[randomWordPickForHint][i]].children[0].setStrokeStyle(2, 0x13cce8);
            this.HintWordTweens(this.wordsForTweens);
        }

        this.hintArrayIndexCounter++;
        if (this.hintArrayIndexCounter == this.storingIndexOfWords.length) {
            console.info("true================>")
            this.hintArrayIndexCounter = 0;
            // }
        }
        console.info("the array we need---------->", this.storingIndexOfWords)
        // this.storingIndexOfWords.splice(this.hintArrayIndexCounter, 0);
    }
    GetSearchWordForHint() {
        this.wordsForTweens = [];
        let searchedWordForPick = this.words.indexOf(this.inputText.text);
        // console.log(this.inputText.text);
        // console.log(searchedWordForPick);
        for (let i = 0; i < this.storingIndexOfWords[searchedWordForPick].length; i++) {
            // this.gridTable.sizerChildren[this.storingIndexOfWords[searchedWordForPick][i]].children[0].setStrokeStyle(2, 0x13cce8);
            this.gridTable.sizerChildren[this.storingIndexOfWords[searchedWordForPick][i]].children[0].setTint(0x13cce8);
        }
        this.storingIndexOfWords.splice(searchedWordForPick, 0);
    }
    HintWordTweens(_i) {
        this.wordTween = this.scene.tweens.add({
            targets: _i,
            alpha: 0.2,
            duration: 500,
            ease: 'Power1',
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                this.scene.gridSizerTable.setInteractive({ useHandCursor: true });
                this.scene.bContainer.list[1].setInteractive();
            }
        });
    }
    TextInputForSearchWord() {
        this.scene.input.keyboard.on('keydown', (event) => {
            let characterAllow = /^[A-Z]+$/;
            if (event.keyCode === 8 && this.inputText.text.length > 0) {
                this.inputText.text = this.inputText.text.substr(0, this.inputText.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90) && characterAllow.test(event.key) && this.inputText.text.length <= 5) {
                this.inputText.text += event.key;
            }
        }, this.scene);
    }
}
export default WordPlace;