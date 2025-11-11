import { Constant } from "./Constant";
import { Base } from "./util/base";

class GenerateRandomWords {
    constructor(scene, _alphabets, _reservedWords, _row, _hWords) {
        //Config Variables
        this.gameWidth = Constant.game.config.width;
        this.gameHeight = Constant.game.config.height;
        //Parameters Declaration.
        this.scene = scene;
        this.alphabet = _alphabets;
        this.reservedWord = _reservedWords;
        this.hWords = _hWords;
        this.allWordsArray = [];
        this.Create();
        Constant.wordTextDisplay = this.wordText;
    }
    Create() {
        console.info(" this.reservedWord------>", this.reservedWord);
        this.allWordsArray.push(...this.reservedWord);
        // this.allWordsArray.push(...this.hWords)
        // console.log("allWordsArray----->", this.allWordsArray);
        this.RandomAlphabetsFiveWords(this.allWordsArray);
        // console.log("r words===========>", this.reservedWord);
        this.ShuffledWords(this.reservedWord);
        // console.log("this.words=========>", this.words);
        this.ReverseWords();
        this.ReverseHiddenWords();
    }
    AddWordToScreen() {
        let wordBaseArray = [];
        let wordJsonArray = [];
        let x = null;
        let wrapLength = 0;
        let rowOfWordPlace = 0;
        // this.wordText = this.scene.add.container(this.gameWidth / 2, this.gameHeight / 2);
        this.wordText = this.scene.add.group(0, 0).setDepth(2);
        this.wordBaseContainer = this.scene.add.group(0, 0)//.setScale(Constant.scaleFactor)//.setSize(999, 400);
        // console.info("this.lScrollContainer--------->", this.scene.lScrollContainer.displayWidth)
        let wordGap = 0;
        // let wordOrigin = null;
        let wordCount = 0;

        for (let i = 0; i <= Constant.numberOfWordsForPlace - 1; i++) {

            let wordBase = Base.placeImage(this.scene, 'wBase', false, { _oX: 0, _oY: 0 }, 0, 0);
            wordBaseArray.push(wordBase);
            let wordFind = this.scene.add.text(0, 0, this.words[i], { fontFamily: 'FredokaOne-Regular', fontSize: 35, color: '#144479' });
            wordFind.setOrigin(-0.25, -0.15);
            wordBase.setDisplaySize(wordFind.width * 1.5, wordBase.displayHeight);
            // console.log('wordBaseArray', wordBaseArray[i].texture.key, wordFind._text, wordBaseArray[i].displayWidth);
            let wordJson = { obj: wordBaseArray[i], width: wordBaseArray[i].displayWidth, text: wordFind };
            wordJsonArray.push(wordJson);


            // if (i < 10) {
            //     if (i == 0) {
            //         wordGap = 0;
            //         this.scene.aGGrid.placeAtIndex(0.3, wordBase);
            //     }
            //     else {
            //         wrapLength = wordBaseArray[i - 1].x + (wordBaseArray[i - 1].displayWidth / 2 + wordBaseArray[i].displayWidth / 2) + 20;
            //         wordBase.setPosition(wrapLength, wordBaseArray[i - 1].y);
            //         if (wrapLength >= 860) {
            //             wrapLength = 0;
            //             rowOfWordPlace++;
            //             if (rowOfWordPlace == 1) {
            //                 this.scene.aGGrid.placeAtIndex(5.3, wordBase);
            //             }
            //             else if (rowOfWordPlace == 2) {
            //                 this.scene.aGGrid.placeAtIndex(10.3, wordBase);
            //             }
            //             else {
            //                 this.scene.aGGrid.placeAtIndex(15.3, wordBase);
            //             }
            //         }
            //     }
            // }
            // else if (i >= 3 && i < 6) {
            //     if (i == 3) {
            //         wordGap = 0;
            //         this.scene.aGGrid.placeAtIndex(5.55, wordBase);
            //     }
            //     else {
            //         wordBase.setPosition(wordBaseArray[i - 1].x + (wordBaseArray[i - 1].displayWidth / 2 + wordBaseArray[i].displayWidth / 2) + 20, wordBaseArray[i - 1].y);
            //     }

            //     wordBase.setOrigin(0.5, 0.9);
            //     wordFind.setOrigin(0.5, 1.45);

            // }
            // else if (i >= 6 && i < 9) {
            //     if (i == 6) {
            //         wordGap = 0;
            //         this.scene.aGGrid.placeAtIndex(10.55, wordBase);
            //     }
            //     else {
            //         wordBase.setPosition(wordBaseArray[i - 1].x + (wordBaseArray[i - 1].displayWidth / 2 + wordBaseArray[i].displayWidth / 2) + 20, wordBaseArray[i - 1].y);
            //     }

            //     wordBase.setOrigin(0.5, 1.5);
            //     wordFind.setOrigin(0.5, 2.6);
            // }
            // else {
            //     if (i == 9) {
            //         wordGap = 1.25;
            //     }
            //     this.scene.aGGrid.placeAtIndex(15.55 + wordGap, wordBase);
            //     wordBase.setOrigin(0.5, 2.05);
            //     wordFind.setOrigin(0.5, 3.7);
            // }
            wordBase.name = wordFind._text;
            wordBase.number = i
            wordFind.copyPosition(wordBase);

            this.wordBaseContainer.add(wordBase);
            this.wordText.add(wordFind);
            this.scene.lScrollContainer.add(wordBase);
            this.scene.lScrollContainer.add(wordFind);
        }
        let found = [];
        let startX = 0.3;
        let yPos = 50;
        this.remainingSpace = 999;
        this.finalX = 20;
        for (let index = 0; index < 10; index++) {
            // console.log('this.finalX', this.finalX, index, wordJsonArray[index].width);
            if (this.finalX + wordJsonArray[index].width < this.remainingSpace) {
                // console.log('startX + (index * wordJsonArray[index].width / 2)', startX + (index * wordJsonArray[index].width / 2));
                if (index == 0) {
                    wordJsonArray[index].obj.setPosition(this.finalX, 50);
                    wordJsonArray[index].text.setPosition(this.finalX, 50);
                    // console.log("wordJsonArray[index].text", wordJsonArray[index].text);
                    this.finalX += wordJsonArray[0].width;
                    found.push(wordJsonArray[0].obj.name);
                } else {
                    wordJsonArray[index].obj.setPosition(this.finalX, 50);
                    wordJsonArray[index].text.setPosition(this.finalX, 50);
                    found.push(wordJsonArray[index].obj.name);
                    this.finalX += wordJsonArray[index].width
                }
            }
        }
        this.finalX = 20;
        for (let i = 0; i < 10; i++) {
            if (this.finalX + wordJsonArray[i].width < this.remainingSpace) {
                let indexCheck = found.indexOf(wordJsonArray[i].obj.name);
                if (indexCheck == -1) {
                    wordJsonArray[i].obj.setPosition(this.finalX, 150);
                    wordJsonArray[i].text.setPosition(this.finalX, 150);
                    found.push(wordJsonArray[i].obj.name);
                    this.finalX += wordJsonArray[i].width
                }
            }
        }
        this.finalX = 20;
        for (let i = 0; i < 10; i++) {
            if (this.finalX + wordJsonArray[i].width < this.remainingSpace) {
                let indexCheck = found.indexOf(wordJsonArray[i].obj.name);
                if (indexCheck == -1) {
                    wordJsonArray[i].obj.setPosition(this.finalX, 250);
                    wordJsonArray[i].text.setPosition(this.finalX, 250);
                    found.push(wordJsonArray[i].obj.name);
                    this.finalX += wordJsonArray[i].width
                }
            }
        }
        // console.log('wordwidth', wordBaseArray);
        // console.log("text==========>", this.scene.lScrollContainer);
        // let found = null;
        // let startX = 0.3;
        // let yPos = 50;
        // this.remainingSpace = 950;
        // this.finalX = 50;
        // for (let index = 0; index < 10; index++) {
        //     console.log('this.finalX', this.finalX, index, wordJsonArray[index].width);
        //     if (this.finalX + wordJsonArray[index].width < this.remainingSpace) {
        //         // console.log('startX + (index * wordJsonArray[index].width / 2)', startX + (index * wordJsonArray[index].width / 2));
        //         if (index == 0) {
        //             wordJsonArray[index].obj.setPosition(this.finalX, yPos);
        //             wordJsonArray[index].text.setPosition(this.finalX, yPos);
        //             console.log("wordJsonArray[index].text", wordJsonArray[index].text);
        //             this.finalX += wordJsonArray[0].width;
        //         } else {
        //             if (rowOfWordPlace == 0) {
        //                 yPos = 50;
        //             }
        //             else if (rowOfWordPlace == 1) {
        //                 yPos = 150;
        //             }
        //             else if (rowOfWordPlace == 2) {
        //                 yPos = 250;
        //             }
        //             wrapLength = wordJsonArray[index].obj.x + (wordJsonArray[index].width) + 20;
        //             // console.log('wrapLength', wrapLength);
        //             // this.scene.aGGrid.placeAtIndex(wrapLength, wordJsonArray[index].obj);
        //             // wordBaseArray[i].setPosition(wrapLength, wordBaseArray[i - 1].y);
        //             // this.scene.a
        //             // let firstObjX = 100;
        //             let currX = wordJsonArray[index - 1].obj.x + wordJsonArray[index].width;
        //             // console.log('currX', currX);
        //             // this.remainingSpace = this.remainingSpace - wordJsonArray[index].width;
        //             wordJsonArray[index].obj.setPosition(this.finalX, yPos);
        //             wordJsonArray[index].text.setPosition(this.finalX, yPos);
        //             this.finalX += wordJsonArray[index].width
        //         }
        //         if (this.finalX + wordJsonArray[index].width >= this.remainingSpace) {
        //             rowOfWordPlace++;
        //             this.finalX = 50;
        //         }
        //     }
        // }
        // for (let i = 0; i < wordBaseArray.length; i++) {
        //     if (i == 0) {
        //         wordGap = 0;
        //         this.scene.aGGrid.placeAtIndex(0.3, wordBaseArray[i]);
        //     }
        //     else if (i > 0) {
        //         wrapLength = wordBaseArray[i - 1].x + (wordBaseArray[i - 1].displayWidth / 2 + wordBaseArray[i].displayWidth / 2) + 20;
        //         wordBaseArray[i].setPosition(wrapLength, wordBaseArray[i - 1].y);
        //         // if (wrapLength >= 700 && wrapLength <= 850 && i != 0) {
        //         //     found = wordBaseArray.findIndex((element) => element.displayWidth > 850 - wrapLength);
        //         //     if (found != null || found != undefined || found != 0) {
        //         //         wordBaseArray[found].setPosition(wrapLength, wordBaseArray[i - 1].y);
        //         //     }
        //         // }
        //         if (wrapLength >= 860) {
        //             wrapLength = 0;
        //             rowOfWordPlace++;
        //             if (rowOfWordPlace == 1) {
        //                 this.scene.aGGrid.placeAtIndex(5.3, wordBaseArray[i]);
        //             }
        //             else if (rowOfWordPlace == 2) {
        //                 this.scene.aGGrid.placeAtIndex(10.3, wordBaseArray[i]);
        //             }
        //             else {
        //                 this.scene.aGGrid.placeAtIndex(15.3 + wordGap, wordBaseArray[i]);
        //             }
        //         }

        //     }
        //     console.log(`show index${i}`, wordBaseArray[i].displayWidth);
        // }

    }
    RemoveWordsFromScreen() {
        this.scene.lScrollContainer.removeAll(true);
    }
    RandomAlphabetsFiveWords(_five) {
        this.randomlyPlacedReservedWords = [];//word list on top
        let i = this.allWordsArray.length;

        while (i > 0) {
            let randomWordPickerfive = _five[Phaser.Math.Between(0, this.allWordsArray.length - 1)];
            if (this.randomlyPlacedReservedWords.indexOf(randomWordPickerfive) == -1) {
                this.randomlyPlacedReservedWords.push(randomWordPickerfive);
                i--;
            }
        }
        // console.log('rndm', this.randomlyPlacedReservedWords);
    }
    ShuffledWords(_sWords) {//to show word list on screen
        this.words = [];
        let i = Constant.numberOfWordsForPlace;
        while (i > 0) {
            let randomWord = _sWords[Phaser.Math.Between(0, this.reservedWord.length - 1)];
            if (this.words.indexOf(randomWord) == -1) {
                this.words.push(randomWord);
                i--;
            }
        }

        this.AddWordToScreen();

        // this.CreatePanel();
    }
    ReverseWords() {
        this.chooseWord = [];//board word list
        let chooseForReverse = null;
        for (let i = 0; i < this.allWordsArray.length; i++) {
            chooseForReverse = Phaser.Math.Between(0, 1);
            if (chooseForReverse == 1) this.chooseWord.push(this.randomlyPlacedReservedWords[i]);
            else {
                this.chooseWord.push(this.randomlyPlacedReservedWords[i].split('').reverse().join(''));
            }
        }
        // console.log("board list------->", this.chooseWord);
    }
    ReverseHiddenWords() {
        this.chooseHidden = [];//board hidden word list
        let chooseForReverse = null;
        for (let i = 0; i < this.hWords.length; i++) {
            chooseForReverse = Phaser.Math.Between(0, 1);
            if (chooseForReverse == 1) this.chooseHidden.push(this.hWords[i]);
            else {
                this.chooseHidden.push(this.hWords[i].split('').reverse().join(''));
            }
        }
        // console.info("hidden gem->", this.chooseHidden);
    }
}
export default GenerateRandomWords;