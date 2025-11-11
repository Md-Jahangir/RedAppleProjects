import { Constant } from "./Constant";
import { Align } from "./util/align";
import Strikethrough from "./Strikethrough";
import { ScoreManager } from "./ScoreManager";
import { AudioManager } from "./AudioManager";

class WordCheck {
    constructor(_scene, _word, _selectedWord, _cellGroup, _cellIndex, _hintIndexContain, _hWord) {
        //Parameter Declare
        this.scene = _scene;
        this.words = _word;
        this.selectedWord = _selectedWord;
        this.cellGroup = _cellGroup;
        this.cellIndexContain = _cellIndex;
        this.hintIndexContainer = _hintIndexContain;
        this.hiddenWords = _hWord;
        this.wordsListArray = [];
        this.create();
        //Variables
        this.isMatched = false;
        this.wordIndexRemove = null;
        // Constant.score = 0;
        this.count = 0;
        this.bWordCounter = 0;
        this.selectedWordForDialog = null;
        this.colorArray = [0x42A5F5, 0xFFEB3B, 0xEC407A, 0xD4E157, 0x2196F3, 0x66BB6A, 0x78909C, 0xF44336, 0xFFCA28, 0x03A9F4, 0xAB47BC, 0x00BCD4, 0xFFEE58]
        Align.shuffleArray(this.colorArray);
        // this.randomNumbers = Align.generateUniqueRandomNumbers(10, 0, 10);
        // this.wordsOnGrid = this.scene.grid.placeWords.storingIndexOfWords;

        //DialogText
        this.dialogText = this.scene.add.text(Constant.game.config.width / 2, Constant.game.config.height / 2, 'Correct!', { fontFamily: 'FredokaOne-Regular', fontSize: 200, color: '#3DD942' }).setOrigin(0.5).setScale(0);

    }
    create() {
        this.wordsListArray.push(...this.words);
        this.wordsListArray.push(...this.hiddenWords);
        // console.info("wordList", this.wordsListArray)
    }
    RemoveScoreText() {
        this.scoreCountText.destroy();
    }
    CheckWord() {
        // console.info("array list--->", this.wordsListArray)
        let scrollCIndex = null;
        this.wordIndex = this.wordsListArray.indexOf(this.selectedWord);
        this.hiddenCheckIndex = this.hiddenWords.indexOf(this.selectedWord);
        // console.info("hidden word----------", this.hiddenCheckIndex)
        if (this.hiddenCheckIndex != -1) {//for hidden word points
            // ScoreManager.bonusScore += 10;
            this.bWordCounter += 1;
            ScoreManager.AddBonusScore(this.bWordCounter);
            this.scene.bonusPopup.BonusToast(ScoreManager.bonusScore, this.cellGroup.children.x);
            this.scene.scoreCountText.setText(ScoreManager.score);
            this.scene.retryContainer.list[3].setText('Score: ' + ScoreManager.score);
        }
        if (this.wordIndex != -1) {
            // console.log("newwords----->", this.words, this.wordIndex);
            this.isMatched = true;
            // console.log("cell index contain---------", this.scene.grid.cellIndexContain);
            // this.scene.grid.isHoriFwd = false;
            // this.scene.grid.isHoriBwd = false;
            // this.scene.grid.placeWords.storingIndexOfWords.forEach((element) => {

            // console.log("words======>", this.wordIndex, Constant.wordTextDisplay);
            if (this.wordIndex <= 9) {
                Constant.wordTextDisplay.children.entries[this.wordIndex].clearTint();

                Constant.wordTextDisplay.children.entries[this.wordIndex].setStyle({ fill: '#394666' });
                this.scene.lScrollContainer.getByName(Constant.wordTextDisplay.children.entries[this.wordIndex]._text).setTexture('wDoneBase');
                ScoreManager.AddScore();

                this.scene.scoreCountText.setText(ScoreManager.score);
                this.scene.retryContainer.list[3].setText('Score: ' + ScoreManager.score);

                if (this.wordIndex == 0) {
                    scrollCIndex = this.wordIndex + 1;
                }
                else {
                    scrollCIndex = (this.wordIndex * 2) + 1;
                }

                // console.log("scrollCIndex", this.scene.lScrollContainer.list[scrollCIndex - 1]);
                // this.scene.lScrollContainer.list[scrollCIndex].setOrigin(0.5, 0.5);
                this.strike = new Strikethrough(this.scene, this.scene.lScrollContainer.list[scrollCIndex].x, this.scene.lScrollContainer.list[scrollCIndex].y, this.scene.lScrollContainer.list[scrollCIndex].width, this.scene.lScrollContainer.list[scrollCIndex], this.scene.lScrollContainer.list[scrollCIndex - 1]);

                this.hintIndexContainer.splice(this.wordIndex, 0);
            }
            else {

            }
        }
        else {
            this.isMatched = false;
            this.scene.grid.cellIndexContain = [];
        }
        // this.DialogFunction();
        if (this.isMatched) {
            AudioManager.PlayWordMatchedAudio();

            let color = this.colorArray[this.count];
            this.count++;

            for (let i = 0; i < this.cellGroup.children.entries.length; i++) {
                //Words are correctly matched  to the cells.
                this.cellGroup.children.entries[i].getElement('background').setTexture('cLBlock')
                this.cellGroup.children.entries[i].getElement('background').setTint(color);
                this.cellGroup.children.entries[i].getElement('text').setStyle({ fill: '#ffffff' });
                this.scene.grid.gridElementsUnselect = 1;
                if (this.wordIndex > 9)
                    this.scene.bonusPopup.BonusToast(ScoreManager.bonusScore, this.cellGroup.children.entries[i].x, this.cellGroup.children.entries[i].y);
                else {
                    if (Constant.isPowerPlay) {
                        this.scene.powerPlay.PowerToast(ScoreManager.powerPlayIncreasedVal, this.cellGroup.children.entries[i].x, this.cellGroup.children.entries[i].y)
                    }
                }
            }
            if (this.wordIndex <= 9) {
                // console.info("wordIndex----------", this.wordIndex);
                if (ScoreManager.matchedWordCount == 10) {
                    this.scene.scoreCountText.setText(ScoreManager.score);
                    // localStorage.setItem('word_search', ScoreManager.score);
                    // console.info("time diff------->", Constant.setTimeLimit - this.scene.timeLeft);
                    this.scene.GridReset();
                }
                else if (ScoreManager.matchedWordCount == 20) {

                    AudioManager.PlayGameOverAudio();
                    let timeDiff = this.scene.timeLeft
                    ScoreManager.score += timeDiff;
                    ScoreManager.timeBonusScore += timeDiff;
                    // localStorage.setItem('word_search', ScoreManager.score);
                    this.scene.scoreCountText.setText(ScoreManager.score);
                    this.scene.completeRound.UpdateScoreonAwakePopup("Complete", ScoreManager.normalScore, ScoreManager.powerPlayScore, ScoreManager.bonusScore, ScoreManager.timeBonusScore);
                    this.scene.completeRound.ShowCompletePopup();
                }
            }
        }
        else if (!this.isMatched) {
            // console.log("Here at is Match false", this.cellGroup);
            // console.log("cellGroup-------->", this.cellGroup);
            for (let i = 0; i < this.cellGroup.children.entries.length; i++) {
                this.cellGroup.children.entries[i].getElement('background').setTint(0xf2f2f2);
                this.cellIndexContain.length = 0;
                this.scene.grid.gridElementsUnselect = 1;
            }
        }
    }
    GetChecked() {
        return this.CheckWord();
    }
    DialogFunction() {
        let letterScale = 1;
        if (this.isMatched) {
            //Words are correctly matched 
            // this.dialogText.setText('Correct!');
            letterScale = 1;
        }
        else if (this.selectedWordForDialog == 'Matched') { this.dialogText.setText('Already Matched!'); letterScale = 0.5; this.selectedWordForDialog = '' }
        // else { this.dialogText.setText('Incorrect!'); letterScale = 1; }
        // this.scene.tweens.add({
        //     targets: this.dialogText,
        //     scale: letterScale,
        //     ease: Phaser.Math.Easing.Back.InOut,
        //     duration: 500,
        //     yoyo: true,
        //     onComplete: () => {
        //         this.dialogText.setText('')
        //         this.scene.gridSizerTable.input.enabled = true;
        //         this.scene.homeButtonGameScene.setInteractive();
        //     }
        // }, this.scene);
    }
    HintDialog(_numberOfCount) {
        this.dialogText.setText(_numberOfCount + ' More Hint Left');
        if (_numberOfCount == 0) this.dialogText.setText('No More Hint Left');
        this.scene.tweens.add({
            targets: this.dialogText,
            scale: 0.5,
            ease: Phaser.Math.Easing.Quintic.InOut,
            duration: 750,
            yoyo: true,
            onComplete: () => {
                this.dialogText.setText('')
                this.scene.gridSizerTable.setInteractive({ useHandCursor: true });
                this.scene.bContainer.list[1].setInteractive()
                // this.scene.homeButtonGameScene.setInteractive({ useHandCursor: true });
            }
        }, this.scene);
    }
}

export default WordCheck;