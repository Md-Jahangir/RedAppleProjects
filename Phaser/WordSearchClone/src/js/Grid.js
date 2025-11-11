import { Constant } from "./Constant";
import { Align } from "./util/align";
import WordCheck from "./WordCheck";
import WordPlace from "./WordPlace";
import { AudioManager } from "./AudioManager";
import BuyHintPopup from "./popups/BuyHintPopup";
import { ScoreManager } from "./ScoreManager";

class Grid {
    constructor(_scene, _width, _height, _cells, _column, _alphabets, _reservedWord, _hWords) {
        //Config Variables
        this.gameWidth = Constant.game.config.width;
        this.gameHeight = Constant.game.config.height;

        //Parameter Declaration
        this.scene = _scene;
        this.width = _width;
        this.height = _height;
        this.cells = _cells;
        this.column = _column;
        this.alphabets = _alphabets;

        //Variables
        this.isGuessing = false;
        this.selectedWord = '';
        this.cellIndexContain = [];
        this.cellIndexContain.length = 0;
        this.sortedArray = [];
        this.storedCellArray = [];
        this.isHorizontal = false;
        this.isVertical = false;
        this.correctIndexArray = [];
        this.isHoriFwd = false;
        this.isHoriBwd = false;
        this.whenFwd = false;
        this.whenBwd = false
        this.gridElementsUnselect = 1;
        this.gridFPDX = null;
        this.gridFPDY = null;
        this.selectedBoardIndices = [];
        this.firstIndex = null;
        this.lastIndex = null;
        this.isShift = false;
        this.lineStartPosition = { x: 0, y: 0 };

        //Grid Sizer
        this.CreateGridSizer();
        this.WordsPlaceInGrids();
    }
    WordsPlaceInGrids() {
        this.placeWords = new WordPlace(this.scene, this.alphabets, this.scene.items.chooseWord, this.scene.items.words, this.scene.gridSizerTable, this.column, this.scene.items.chooseHidden);
        this.wordCheck = new WordCheck(this.scene, this.scene.items.words, this.selectedWord, this.cellGroup, this.cellIndexContain, this.placeWords.storingIndexOfWords, this.scene.hWordsArray);
    }
    CreateGridSizer() {
        this.cellGroup = this.scene.add.group();
        this.scene.gridSizerTable = this.scene.rexUI.add.gridSizer({
            x: this.gameWidth / 2, y: this.gameHeight / 1.845,
            width: this.width, height: this.height,
            column: this.column, row: this.column,
            columnProportions: 1, rowProportions: 1,
            space: {
                column: 3.7, row: 4,

            },
        });
        // this.scene.gridSizerTable.copyPosition(this.scene.boardBG)
        // let shape = new Phaser.Geom.Rectangle([0.5, 0.5, 47.231901914537964, 52.32051566657935]);
        // console.info("shape:", shape)

        for (let i = 0; i < this.scene.gridSizerTable.rowCount; i++) {
            for (var j = 0; j < this.scene.gridSizerTable.columnCount; j++) {
                this.scene.gridSizerTable.add(
                    this.scene.rexUI.add.label({
                        // background: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 14, 0x000ff),
                        background: this.scene.add.image(0, 0, 'lBase').setName('notHighlighted'),
                        text: this.scene.add.text(0, 0, '', { fontFamily: 'FredokaOne-Regular', color: '#5e6286', fontSize: 22, fontStyle: 'bold' }).setScale(2).setOrigin(0.1, 0.1),
                        // zone: this.scene.rexUI.add.zone(0, 0, 50, 50).setInteractive({ useHandCursor: true }),
                        space: {
                            left: 20,
                            right: 20,
                            top: 20,
                            bottom: 20,
                        },

                        align: 'center',
                    }), i, j, 'center', 0, true,
                )
            }
        }
        // console.log("  this.scene.gridSizerTable--------->", this.scene.gridSizerTable.children[]);
        this.scene.gridSizerTable.layout();
        this.scene.gridSizerTable.setDepth(2);

        this.line = this.scene.add.line(0, 0, 0, 0, 100, 100, 0x000000).setOrigin(0).setDepth(50);
        this.line.setLineWidth(100);
        this.line.visible = false;

        this.pathGraphics = this.scene.add.graphics();
        this.scene.gridSizerTable.setChildrenInteractive().on('child.down', (child) => {

            AudioManager.PlayBlockSelectionSFX();
            this.gridIndex = this.scene.gridSizerTable.childToGridIndex(child);
            // console.log('grid', child);
            this.gridFPDX = this.gridIndex.x;
            this.gridFPDY = this.gridIndex.y;
            this.indexFinder = (this.gridIndex.y * this.column) + this.gridIndex.x;
            this.pDGrid = (this.gridIndex.x * this.column) + this.gridIndex.y;

            this.cellIndexContain.push(this.indexFinder);
            this.selectedBoardIndices.push(this.pDGrid);
            // this.PredictNextGridCell(this.pDGrid);
            this.firstIndex = this.gridIndex;
            // console.log('next grid', this.gridIndex, this.firstIndex);
            // console.log('grid', child.text);
            // this.scene.clickedIndicesArray.push(this.indexFinder);
            if (this.storedCellArray.indexOf(this.indexFinder) == -1) {
                this.isGuessing = true;
            }
            if (this.isGuessing) {
                child.children[0].y -= 10;
                child.children[1].y -= 10;
                // this.cellIndexContain.push(this.indexFinder);
                this.wordCheck.selectedWord += child.text;
                this.cellGroup.add(child);
                // child.children[0].setStrokeStyle(2, 0x24f0df);
                child.children[0].setTint(0x24f0df);
                // console.log('child', child.children);
            }
        }, this.scene).on('child.over', (child) => {
            this.scene.input.motionFactor = 0.5;

            // console.info(`pointer ${child}`, child.children[1]._text, child.children[1].x, child.children[1].y)
            // console.log('On over------>this.indexFind', this.isGuessing, child);
            if (this.isGuessing) {
                child.children[0].y -= 10;
                child.children[1].y -= 10;
                AudioManager.PlayBlockSelectionSFX();
                // child.children[0].setScale(1.2);
                this.gridIndex = this.scene.gridSizerTable.childToGridIndex(child);
                this.indexFinder = (this.gridIndex.y * this.column) + this.gridIndex.x;
                this.currGrid = (this.gridIndex.x * this.column) + this.gridIndex.y;
                this.lastIndex = this.gridIndex;
                // console.log('On over------>this.indexFinde', this.gridIndex);
                // console.log("On over------>this.indexFinder", this.indexFinder, this.gridIndex.y, this.column, this.gridIndex.x);
                // console.log("Current and last and first Grid on over------>", this.gridIndex, this.lastIndex, this.firstIndex);
                // console.log("Next Grid on over------>", this.scene.gridSizerTable.children[this.nextGrid + this.column]);
                // this.scene.clickedIndicesArray.push(this.indexFinder);
                // console.log('grid over', this.indexFinder);
                if (this.storedCellArray.indexOf(this.indexFinder) == -1) {
                    if (!this.scene.diagonal) {

                        this.cellIndexContain.push(this.indexFinder);
                        // console.log(this.cellIndexContain, this.indexFinder, this.currGrid / 10);

                    }
                    // console.log('on going ');
                    // console.("IF FIRST", this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2]);
                    this.CheckDragDirection(child);

                }
            }
        }, this.scene).on('child.up', (child) => {
            // console.log('select', this.wordCheck.selectedWord);
            // child.children[0].setScale(1);
            if (this.isGuessing) {
                child.children[0].y += 10;
                child.children[1].y += 10;
            }
            this.scene.diagonal = false;
            // console.log(this.scene.diagonal, 'diagonal');
            this.WordCheckAndClear();
        }, this.scene).on('child.out', (child) => {
            if (this.isGuessing) {
                child.children[0].y += 10;
                child.children[1].y += 10;
            }
        });
        this.scene.input.on('pointerup', () => {
            this.WordCheckAndClear();
        }, this.scene)
        this.scene.input.on('gameout', () => {
            this.WordCheckAndClear();
        }, this.scene);
        this.scene.bContainer.list[1].on('pointerdown', () => {
            if (Constant.countHint >= 1) {

                this.Hinter();
            }
            else if (Constant.countHint == 0) {
                this.buyHintPopup = new BuyHintPopup(this.scene, localStorage.getItem('word_search', ScoreManager.score), Constant.countHint);
                this.buyHintPopup.scoreTextinPopup.setText('Score : ' + ScoreManager.score);
                this.buyHintPopup.BuyHintControlFunctionality();
                this.buyHintPopup.buyHintpopupContainer.setVisible(true);
                this.buyHintPopup.buyHintpopupContainer.setDepth(60);
                // this.scene.bContainer.list[1].removeInteractive();
                this.scene.ShowHintOverPopup();
            }
        }, this.scene);
    }

    CheckDragDirection(child) {
        if (this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2] == 1) {//&& this.isVertical == false && this.isDiagonal == false)) {
            // console.log('forward Horizon');
            // this.isHorizontal = true;
            // this.isVertical = false;
            // this.isDiagonal = false;
            // console.log("last Index->", this.lastIndex.y, this.firstIndex.y);
            // console.log(this.scene.diagonal, 'diagonal------');
            if (!this.scene.diagonal) {

                if (this.lastIndex.y == this.firstIndex.y) {

                    child.children[0].setTint(0x24f0df);

                    this.wordCheck.selectedWord += child.text;
                    child.children[0].name = 'highlighted';
                    this.cellGroup.add(child);
                    // console.log("cell group-->", this.cellGroup.children.entries.length);
                    this.currGrid = (this.gridIndex.x * this.column) + this.gridIndex.y;
                    this.selectedBoardIndices.push(this.currGrid);
                    // console.log('cells hled', this.selectedBoardIndices);
                    // this.PredictNextGridCell();
                    // console.info("pointerDown Grid--------->", this.pDGrid, this.currGrid);

                    if (this.pDGrid >= this.currGrid) {
                        this.scene.gridSizerTable.children[this.currGrid - this.column].children[0].setTint(0xf2f2f2);
                        this.wordCheck.selectedWord = this.wordCheck.selectedWord.slice(0, -2);
                        this.cellGroup.children.entries.splice(this.cellGroup.children.entries.length - 1, 1);
                    }

                }
            }
            else {
                // console.log(this.scene.diagonal, 'diagonal----');
            }
        }
        else if (this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2] == -1) {//&& this.isVertical == false && this.isDiagonal == false) {
            // console.log('backward Hori');
            // this.isHorizontal = true;
            // this.isVertical = false;
            // this.isDiagonal = false;
            if (!this.scene.diagonal) {

                if (this.lastIndex.y == this.firstIndex.y) {
                    child.children[0].setTint(0x24f0df);
                    this.wordCheck.selectedWord += child.text;
                    child.children[0].name = 'highlighted';
                    this.cellGroup.add(child);
                    this.currGrid = (this.gridIndex.x * this.column) + this.gridIndex.y;
                    if (this.pDGrid <= this.currGrid) {
                        this.scene.gridSizerTable.children[this.currGrid + this.column].children[0].setTint(0xf2f2f2);
                        this.wordCheck.selectedWord = this.wordCheck.selectedWord.slice(0, -2);
                        this.cellGroup.children.entries.splice(this.cellGroup.children.entries.length - 1, 1);
                    }
                }
            }
            else {
                // console.log(this.scene.diagonal, 'diagonal---');
            }

        }
        else if (this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2] == this.column) {// && !this.isHorizontal && !this.isDiagonal) {
            // console.log('Forward Vert');
            // this.isHorizontal = false;
            // this.isVertical = true;
            // this.isDiagonal = false;
            if (!this.scene.diagonal) {
                if (this.lastIndex.x == this.firstIndex.x) {
                    child.children[0].setTint(0x24f0df);
                    this.wordCheck.selectedWord += child.text;
                    child.children[0].name = 'highlighted';
                    this.cellGroup.add(child);
                    this.currGrid = (this.gridIndex.x * this.column) + this.gridIndex.y;
                    // console.log('currGrid', this.currGrid, this.currGrid + 1);
                    if (this.pDGrid >= this.currGrid) {
                        this.scene.gridSizerTable.children[this.currGrid - 1].children[0].setTint(0xf2f2f2);
                        this.wordCheck.selectedWord = this.wordCheck.selectedWord.slice(0, -2);
                        this.cellGroup.children.entries.splice(this.cellGroup.children.entries.length - 1, 1);
                    }
                }
            }
            else {
                // console.log(this.scene.diagonal, 'diagonal---');
            }
        }
        else if (this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2] == -this.column) {// && !this.isHorizontal && !this.isDiagonal) {
            // console.log('backward Vert');
            // this.isHorizontal = false;
            // this.isVertical = true;
            // this.isDiagonal = false;
            if (!this.scene.diagonal) {
                if (this.lastIndex.x == this.firstIndex.x) {
                    child.children[0].setTint(0x24f0df);
                    this.wordCheck.selectedWord += child.text;
                    child.children[0].name = 'highlighted';
                    this.cellGroup.add(child);
                    this.currGrid = (this.gridIndex.x * this.column) + this.gridIndex.y;
                    // console.log('currGrid', this.currGrid, this.currGrid - 1);
                    if (this.pDGrid <= this.currGrid) {
                        this.scene.gridSizerTable.children[this.currGrid + 1].children[0].setTint(0xf2f2f2);
                        this.wordCheck.selectedWord = this.wordCheck.selectedWord.slice(0, -2);
                        this.cellGroup.children.entries.splice(this.cellGroup.children.entries.length - 1, 1);
                    }
                }
            }
            else {
                // console.log(this.scene.diagonal, 'diagonal---');
            }
        }
        else if ((this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2] == (this.column + 1) || this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2] == (this.column + 12))) {// && !this.isHorizontal && !this.isVertical) {
            // console.log("Forward Dia LR");
            // this.isHorizontal = false;
            // this.isVertical = false;
            // this.isDiagonal = true;
            // if (abc == xyz) {
            // console.log(this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2], '1st con');
            // console.log(this.column + 1, '2nd con');
            // console.log('enter');
            if (this.scene.diagonal) {
                if (this.storedCellArray.indexOf(this.indexFinder) == -1) {
                    this.cellIndexContain.push(this.indexFinder);
                }
            }
            this.scene.diagonal = true;
            // console.log(this.scene.diagonal, 'diagonal');
            // console.log("Diagonal Fwd LR");
            child.children[0].setTint(0x24f0df);
            this.wordCheck.selectedWord += child.text;
            child.children[0].name = 'highlighted';
            this.cellGroup.add(child);
            this.currGrid = (this.gridIndex.x * this.column) + this.gridIndex.y;
            // if (this.currGrid - this.cellIndexContain[this.cellIndexContain.length - 2] == -1 || this.currGrid 
            if (this.pDGrid >= this.currGrid) {
                this.scene.gridSizerTable.children[this.currGrid - this.column - 1].children[0].setTint(0xf2f2f2);
                this.wordCheck.selectedWord = this.wordCheck.selectedWord.slice(0, -2);
                this.cellGroup.children.entries.splice(this.cellGroup.children.entries.length - 1, 1);
            }
            // }
        }
        else if (this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2] == -(this.column + 1) || this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2] == -(this.column + 12)) {// && !this.isHorizontal && !this.isVertical) {
            // console.log("Backward Dia LR");
            // this.isHorizontal = false;
            // this.isVertical = false;
            // this.isDiagonal = true;
            if (this.scene.diagonal) {
                if (this.storedCellArray.indexOf(this.indexFinder) == -1) {
                    this.cellIndexContain.push(this.indexFinder);
                }
            }
            this.scene.diagonal = true;
            // console.log(this.scene.diagonal, 'diagonal');
            child.children[0].setTint(0x24f0df);
            this.wordCheck.selectedWord += child.text;
            child.children[0].name = 'highlighted';
            this.cellGroup.add(child);
            this.currGrid = (this.gridIndex.x * this.column) + this.gridIndex.y;
            // console.log('currGrid', this.currGrid, this.currGrid - this.column);
            if (this.pDGrid <= this.currGrid) {
                this.scene.gridSizerTable.children[this.currGrid + this.column + 1].children[0].setTint(0xf2f2f2);
                this.wordCheck.selectedWord = this.wordCheck.selectedWord.slice(0, -2);
                this.cellGroup.children.entries.splice(this.cellGroup.children.entries.length - 1, 1);
            }
        }
        else if (this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2] == (this.column - 1) || this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2] == (this.column + 8)) {// && !this.isHorizontal && !this.isVertical) {
            // console.log("Forward Dia RL");
            // this.isHorizontal = false;
            // this.isVertical = false;
            // this.isDiagonal = true;
            if (this.scene.diagonal) {
                if (this.storedCellArray.indexOf(this.indexFinder) == -1) {
                    this.cellIndexContain.push(this.indexFinder);
                }
            }
            this.scene.diagonal = true;
            // console.log(this.scene.diagonal, 'diagonal');
            child.children[0].setTint(0x24f0df);
            this.wordCheck.selectedWord += child.text;
            child.children[0].name = 'highlighted';
            this.cellGroup.add(child);
            this.currGrid = (this.gridIndex.x * this.column) + this.gridIndex.y;
            // console.log('currGrid fwd', this.currGrid, this.currGrid + (this.column - 1));
            if (this.pDGrid <= this.currGrid) {
                this.scene.gridSizerTable.children[this.currGrid + (this.column - 1)].children[0].setTint(0xf2f2f2);
                this.wordCheck.selectedWord = this.wordCheck.selectedWord.slice(0, -2);
                this.cellGroup.children.entries.splice(this.cellGroup.children.entries.length - 1, 1);
            }
        }
        else if (this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2] == -(this.column - 1) || this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2] == -(this.column + 8)) {// && !this.isHorizontal && !this.isVertical) {
            // console.log("Backward Dia RL");
            // this.isHorizontal = false;
            // this.isVertical = false;
            // this.isDiagonal = true;
            // console.log(this.indexFinder - this.cellIndexContain[this.cellIndexContain.length - 2], '1st con');
            // console.log(-(this.column + 8), '2nd con');
            if (this.scene.diagonal) {
                if (this.storedCellArray.indexOf(this.indexFinder) == -1) {
                    this.cellIndexContain.push(this.indexFinder);
                }
            }
            this.scene.diagonal = true;
            // console.log(this.scene.diagonal, 'diagonal');
            child.children[0].setTint(0x24f0df);
            this.wordCheck.selectedWord += child.text;
            child.children[0].name = 'highlighted';
            this.cellGroup.add(child);
            // child.children[0].setTint(0x24f0df);
            this.currGrid = (this.gridIndex.x * this.column) + this.gridIndex.y;
            // console.log('currGrid', this.currGrid, (this.currGrid + 1) - this.column);
            if (this.pDGrid >= this.currGrid) {
                // console.log("Hello");
                this.scene.gridSizerTable.children[(this.currGrid + 1) - this.column].children[0].setTint(0xf2f2f2);
                this.wordCheck.selectedWord = this.wordCheck.selectedWord.slice(0, -2);
                this.cellGroup.children.entries.splice(this.cellGroup.children.entries.length - 1, 1);
            }
        }
    }
    Hinter() {
        AudioManager.PlayButtonPressAudio();
        this.scene.bContainer.list[1].removeInteractive();
        this.placeWords.GetWordHint();
        // this.wordCheck.HintDialog(Constant.countHint);
    }
    WordCheckAndClear() {
        this.wordCheck.GetChecked();
        //Hint Word Removing After shown
        if (this.wordCheck.wordIndex <= 9) {
            if (this.wordCheck.isMatched) {
                for (let i = 0; i < this.cellIndexContain.length; i++) {
                    this.storedCellArray.push(this.cellIndexContain[i]);
                    this.correctIndexArray.push(this.cellIndexContain[i])
                }
                this.sortedArray = this.correctIndexArray.sort();
                // console.log("sortedArray---------->", this.sortedArray);
                // console.log('cellIndexContain', this.storedCellArray, this.placeWords.storingIndexOfWords);
                for (let i = 0; i < this.placeWords.storingIndexOfWords.length; i++) {
                    let output = Align.compareArrays(this.sortedArray, this.placeWords.storingIndexOfWords[i].sort());
                    if (output) {
                        this.placeWords.storingIndexOfWords.splice(i, 1);
                        this.placeWords.hintArrayIndexCounter = 0
                        // console.info("this.placeWords.storingIndexOfWords---------------", this.placeWords.storingIndexOfWords)
                        this.correctIndexArray = [];
                        this.sortedArray = [];
                        this.cellIndexContain = [];
                        break;
                    }

                }
                // console.log("updated list------>", this.placeWords.storingIndexOfWords, this.storedCellArray);


                // this.wordCheck.selectedWordForDialog = 'Matched';
            }
        }
        else {
            if (this.wordCheck.isMatched) {
                for (let i = 0; i < this.cellIndexContain.length; i++) {
                    this.storedCellArray.push(this.cellIndexContain[i]);
                }
            }
        }


        this.wordCheck.selectedWord = "";
        this.isGuessing = false;
        this.cellGroup.children.entries.length = 0;
        this.isHorizontal = false;
        this.isVertical = false;
        this.selectedBoardIndices = [];

    }
    GetGridTableX() {
        return this.scene.gridSizerTable.x;
    }
    GetGridTableY() {
        return this.scene.gridSizerTable.y;
    }
    GetGridCurrentWidth() {
        return this.scene.gridSizerTable.displayWidth;
    }
    GetGridCurrentHeight() {
        return this.scene.gridSizerTable.displayHeight;
    }

}
export default Grid;


