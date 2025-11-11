import { Constant } from "./Constant";
import { Align } from "./util/align";
import { AlignGrid } from "./util/alignGrid";
import { Base } from "./util/base";
import Grid from "./Grid";
import GenerateRandomWords from "./GenerateRandomWords";
import HintOverPopup from "./popups/HintOverPopup";
import TutorialPopup from "./popups/TutorialPopup";
import SoundPopup from "./popups/SoundPopup";
import LevelCompletionPopup from "./popups/LevelCompletionPopup";
import BonusPopup from "./popups/BonusPopup";
import { AudioManager } from "./AudioManager";
import PowerPlayPopup from "./popups/PowerPlayPopup";
import { ScoreManager } from "./ScoreManager";
import SettingsPopup from "./popups/SettingsPopup";
import ScorePopup from "./popups/ScorePopup";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
        //Grid Variables
        this.noOfCells = null;
        this.column = null;
        this.tableWidth = null;
        this.tableHeight = null;
        this.diagonal = null;
        this.clickedIndicesArray = [];
        this.hTxtArray = [];
    }
    init() {
        Constant.gameState = 'playing';
        this.gameWidth = Constant.game.config.width;
        this.gameHeight = Constant.game.config.height;
        this.timeLeft = Constant.setTimeLimit;

        this.devCScore = 0;
        this.hWordCount = null;
        this.lvlCount = 1;
        this.bContainer = null;
        this.iContainer = null;
    }
    create(_cat) {

        this.diagonal = false;
        this.cameras.main.fadeIn(200);
        // console.log(_cat);
        this.ReservingWords(_cat);
        this.alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // this.jsonWordList = this.cache.json.get('word_category');
        // // this.reservedWords = ['HAPPY', 'MARCH', 'WORD', 'APPLE', 'ARROW', 'PLAY', 'CLAY', 'SMART', 'RED', 'AND', 'ANT', 'CAR', 'CAT', 'DOG'];
        // this.reservedWords = this.jsonWordList[_cat].pairs;
        // console.log(this.reservedWords);

        this.GridSettings();
        //BG
        this.CreateBG();
        //Grid
        this.CreateGameGrid();
        this.CreateTutorialGrid();
        //UI
        this.CreateGameUI(_cat);

        this.SettingPopupsInstance();
        this.TutorialPopUpInstance();

        //Making Grid
        this.items = new GenerateRandomWords(this, this.alphabets, this.reservedWords[+(Constant.wordWaveCount) - 1], this.column, this.hWordsArray);
        this.grid = new Grid(this, this.tableWidth, this.tableHeight, this.noOfCells, this.column, this.alphabets, this.reservedWords);
        //Making Board Grid
        // this.CreateBoardGrid()
        // this.createPanel();
        this.CreateScrollingWList(this.wListBase.x, this.wListBase.y, this.wListBase.displayHeight);

        //Making Popups
        // this.tutorialPopup = new TutorialPopup(this);
        this.hintOverPopup = new HintOverPopup(this);
        this.soundPopup = new SoundPopup(this);
        this.levelCompletePopup = new LevelCompletionPopup(this);
        this.levelCompletePopup.ShowLevelCompletionPopup('Game Starts in....', null);
        this.gameTime.paused = true;
        this.StartTime();
        this.bonusPopup = new BonusPopup(this);
        this.powerPlay = new PowerPlayPopup(this);
        this.completeRound = new ScorePopup(this);
        //Game Functions.
        this.CreateAssets();
        this.UIButtonsInteraction();

        this.CloseTutoriaGame();
    }

    StartTime() {
        setTimeout(() => {
            this.gameTime.paused = false;
            this.levelCompletePopup.cTimer = 3;
        }, 4000)
    }
    CreateBG() {
        this.bg = Base.placeImage(this, 'gBG', false, { _oX: 0, _oY: 0 }, 0, 0);
        this.bg.setDisplaySize(Constant.game.config.width, Constant.game.config.height);
    }
    CreateTutorialGrid() {
        this.aGrid = new AlignGrid({
            scene: this,
            rows: 10,
            cols: 10,
            width: this.bg.displayWidth,
            height: this.bg.displayHeight,
            startX: this.bg.x,
            startY: this.bg.y,
        });
        // this.aGrid.showNumbers();
    }
    CreateGameGrid() {
        this.aGGrid = new AlignGrid({
            scene: this,
            rows: 15,
            cols: 5,
            width: this.bg.displayWidth,
            height: this.bg.displayHeight,
            startX: this.bg.x,
            startY: this.bg.y,

        });
        // this.aGGrid.showNumbers();
    }
    CreateGameUI(_cat) {
        this.bContainer = this.add.container(60, -75).setScale(Constant.scaleFactor);

        this.boardBG = Base.placeImage(this, 'bBG', false, { _oX: 0.5, _oY: 0.54 }, 0, 0);
        this.boardBG.setDepth(2);
        this.aGGrid.placeAtIndex(42, this.boardBG);
        // this.boardBG.setTint(0x00ff00);
        // this.boardBG.setVisible(false);
        this.boardBG.setDisplaySize(Constant.game.config.width / 1.05, Constant.game.config.height / 1.85);
        // boardBG.setDisplaySize(Constant.game.config.width, Constant.game.config.height);

        this.tBase = Base.placeImage(this, 'cBase', false, null, 0, 0);
        this.aGGrid.placeAtIndex(4, this.tBase);
        this.tBase.setFlipX(true);

        this.tIcon = Base.placeImage(this, 'time', false, { _oX: 1.3, _oY: 0 }, 0, 0);
        this.aGGrid.placeAtIndex(4, this.tIcon);

        let textStr = this.FormatTime(this.timeLeft);
        let textStyle = {
            fontFamily: 'FredokaOne-Regular', fontSize: 47
        };
        this.timeText = Base.placeText(this, textStr, { x: 0, y: 0 }, textStyle).setOrigin(0.2, -0.43).setScale(Constant.scaleFactor);
        this.aGGrid.placeAtIndex(4, this.timeText);
        this.gameTime = this.time.addEvent({
            delay: 1000,
            paused: false,
            callback: this.SetTimer,
            callbackScope: this,
            loop: true,
        }, this);

        this.cBase = Base.placeImage(this, 'cBase', false, null, 0, 0);
        this.aGGrid.placeAtIndex(0, this.cBase);

        this.cIcon = Base.placeImage(this, 'coin', false, { _oX: 0.9, _oY: -0.1 }, 0, 0);
        this.aGGrid.placeAtIndex(0, this.cIcon);

        textStr = ScoreManager.score;
        textStyle = {
            fontFamily: 'FredokaOne-Regular', fontSize: 50
        };

        this.scoreCountText = Base.placeText(this, textStr, { x: 0, y: 0 }, textStyle);
        this.scoreCountText.setScale(Constant.scaleFactor);
        this.aGGrid.placeAtIndex(0.15, this.scoreCountText);
        this.scoreCountText.setOrigin(0, -0.43);

        for (let i = 0; i < 3; i++) {
            let hintButton = Base.placeImage(this, 'button', true, { _oX: 0.5, _oY: 0.3 }, 0, 0);
            hintButton.setDisplaySize(hintButton.displayWidth * 0.8, hintButton.displayHeight * 0.8);

            this.bContainer.add(hintButton);
            if (i == 0) {
                this.aGGrid.placeAtIndex(65.48, hintButton);
                // icons.copyPosition(hintButton);
            }
            else {
                hintButton.setPosition(this.bContainer.list[i - 1].x + this.bContainer.list[i - 1].displayWidth + 5, this.bContainer.list[i - 1].y);
                hintButton.setOrigin(this.bContainer.list[i - 1].originX - 0.5, this.bContainer.list[i - 1].originY);
            }
        }

        let iTutorial = Base.placeImage(this, 'tutorial', true, { _oX: 0.5, _oY: 0.2 }, 0, 0);
        iTutorial.copyPosition(this.bContainer.list[0]);
        iTutorial.setDisplaySize(iTutorial.displayWidth * 0.8, iTutorial.displayHeight * 0.8);
        let iHint = Base.placeImage(this, 'hint', false, { _oX: -0.4, _oY: 0.2 }, 0, 0);
        iHint.copyPosition(this.bContainer.list[1]);
        iHint.setDisplaySize(iHint.displayWidth * 0.8, iHint.displayHeight * 0.8);
        let iSettings = Base.placeImage(this, 'settings', true, { _oX: -1.3, _oY: 0.2 }, 0, 0);
        iSettings.copyPosition(this.bContainer.list[2]);
        iSettings.setDisplaySize(iSettings.displayWidth * 0.8, iSettings.displayHeight * 0.8);

        let rHintBase = Base.placeImage(this, 'hBase', false, { _oX: 0.3, _oY: 1 }, 0, 0);
        this.aGGrid.placeAtIndex(67, rHintBase);
        rHintBase.setDisplaySize(rHintBase.displayWidth * 0.8, rHintBase.displayHeight * 0.8);

        textStr = Constant.countHint;
        textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 40, color: '#1e2c52', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };
        this.rHintTxt = Base.placeText(this, textStr, { x: 0, y: 0 }, textStyle);
        this.rHintTxt.setScale(Constant.scaleFactor);
        // this.aGGrid.placeAtIndex(67, this.rHintTxt);
        this.rHintTxt.copyPosition(rHintBase);
        this.rHintTxt.setOrigin(0.1, 1.45);
        this.rHintTxt.setDisplaySize(this.rHintTxt.displayWidth * 0.8, this.rHintTxt.displayHeight * 0.8);

        this.bContainer.add([iTutorial, iHint, iSettings, rHintBase, this.rHintTxt]);
        iSettings.on('pointerup', this.IsettingsButtonFunc, this);
        iTutorial.on('pointerup', this.ItutorialButtonFunction, this);

        textStr = _cat.toUpperCase();
        // console.log("textStr".toUpperCase());
        textStyle = {
            fontFamily: 'FredokaOne-Regular', fontSize: 55, color: '#ebfdfe', fontStyle: 'bold'
        };
        let catName = Base.placeText(this, textStr, { x: 0, y: 0 }, textStyle);
        catName.setScale(Constant.scaleFactor);
        catName.setOrigin(0.5, 0.5);
        this.aGGrid.placeAtIndex(7, catName);

        textStr = 'LEVEL ' + Constant.wordWaveCount;
        // console.log("textStr".toUpperCase());
        textStyle = {
            fontFamily: 'FredokaOne-Regular', fontSize: 35, color: '#80bdff'
        };
        this.lvlTxt = Base.placeText(this, textStr, { x: 0, y: 0 }, textStyle);
        this.lvlTxt.setScale(Constant.scaleFactor);
        this.lvlTxt.setOrigin(0.5, 2);
        this.aGGrid.placeAtIndex(7, this.lvlTxt);

        this.wListBase = Base.placeImage(this, 'wLBase', false, { _oX: 0.5, _oY: 0.5 }, 0, 0);
        this.aGGrid.placeAtIndex(17, this.wListBase);

        this.lScrollContainer = this.add.container().setScale(Constant.scaleFactor).setSize(999, 400);

        for (let i = 0; i < this.hWordsArray.length; i++) {
            textStr = this.hWordsArray[i];
            // console.log("textStr".toUpperCase());
            textStyle = {
                fontFamily: 'FredokaOne-Regular', fontSize: 35, color: '#FFFF00'
            };
            let hTxt = Base.placeText(this, textStr, { x: 0, y: 0 }, textStyle);
            hTxt.setScale(Constant.scaleFactor);
            hTxt.setOrigin(0.5, 0.5);
            this.aGGrid.placeAtIndex(1 + i, hTxt);
            this.hTxtArray.push(hTxt);
        }
        // textStr = this.hWordsArray;
        // // console.log("textStr".toUpperCase());
        // textStyle = {
        //     fontFamily: 'FredokaOne-Regular', fontSize: 35, color: '#80bdff'
        // };
    }
    IsettingsButtonFunc() {
        AudioManager.PlayButtonPressAudio();
        // console.log('setting popup');
        this.settingPopup.ShowVisible();

    }
    ItutorialButtonFunction() {
        AudioManager.PlayButtonPressAudio();
        this.tutorialPopup.ShowTutorial();
        this.gameTime.paused = true;
    }
    CloseTutoriaGame() {
        this.tutorialPopup.closeBtn.on('pointerdown', () => {
            // this.scPopup.UpdateScoreonAwakePopup('Complete', 50, 40, 40, 20);
            AudioManager.PlayButtonPressAudio();
            this.tutorialPopup.HideTutorial();
            this.gameTime.paused = false;
            // console.log('-----');
            // this.scPopup.scorePopupContainer.setVisible(true);
        });
        this.tutorialPopup.afterTutorialPlayBut.on('pointerdown', () => {
            // this.scPopup.UpdateScoreonAwakePopup('Complete', 50, 40, 40, 20);
            AudioManager.PlayButtonPressAudio();
            this.tutorialPopup.HideTutorial();
            this.gameTime.paused = false;
            // console.log('-----');
            // this.scPopup.scorePopupContainer.setVisible(true);
        });
        this.tutorialPopup.closeBtn.on('pointerup', () => {
            // console.log('wfrgadaeysdfgdfudefuiwef');
        })
    }
    CreateScrollingWList(_x, _y, _ht) {
        this.scrollablePanel = this.rexUI.add.scrollablePanel({
            x: _x, y: _y - 45,
            height: _ht,
            // originX: 0.5,
            // originY: 0,

            scrollMode: 'y',

            background: this.wListBase,


            panel: {
                child: this.lScrollContainer,

                mask: { padding: 1, },
            },

            // slider: {
            //     track: this.rexUI.add.roundRectangle({ width: 20, radius: 10, color: 0x260e04 }),
            //     thumb: this.rexUI.add.roundRectangle({ radius: 13, color: 0x7b5e57 })
            // },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

        })
            .layout()

        // this.aGGrid.placeAtIndex(17, scrollablePanel);
        // scrollablePanel.setOrigin(0, 9)

    }
    CreateBoardGrid() {
        this.bGrid = new AlignGrid({
            scene: this,
            rows: 15,
            cols: 5,
            width: this.boardBG.displayWidth,
            height: this.boardBG.displayHeight,
            startX: this.boardBG.x,
            startY: this.boardBG.y,

        });
        // this.bGrid.showNumbers();
    }
    UIButtonsInteraction() {
        // this.bContainer.list[2].on('pointerup', () => { this.StartSoundMenu(); }, this);
        // this.bContainer.list[0].on('pointerup', () => { this.StartTutorial(); }, this);
    }
    GridSettings() {
        this.noOfCells = 64;
        this.column = 10;
        this.tableWidth = 950;
        this.tableHeight = 950;
    }
    ReservingWords(_cat) {
        // console.log(_cat);
        let cat = _cat;
        this.rndWordNo = Phaser.Math.Between(1, 3);
        // console.info("rnd----->", this.rndWordNo);
        this.jsonWordList = this.cache.json.get('word_category');
        this.jsonWords = this.jsonWordList[cat].pairs;
        this.hiddenWords = this.jsonWordList[cat].hidden;
        console.log("hidden--->", this.hiddenWords);
        Align.shuffleArray(this.jsonWords);
        Align.shuffleArray(this.hiddenWords);
        this.reservedWords = [];
        this.hWordsArray = [];
        for (let i = 0; i < this.rndWordNo; i++) {
            this.hWordsArray.push(this.hiddenWords.shift());
        }
        // console.info("array we need---->", this.hWordsArray, this.hiddenWords)

        for (let index = 0; index < 2; index++) {
            this.reservedWords[index] = [];
            // this.hWordsArray[index] = [];
        }

        for (let i = 0; i < 20; i++) {
            if (i < 10) {
                this.reservedWords[0].push(this.jsonWords[i]);
            }
            else if (i >= 10 && i < 20) {
                this.reservedWords[1].push(this.jsonWords[i]);
            }
            // else {
            //     this.reservedWords[2].push(this.jsonWords[i]);
            // }
        }
        // this.hWordsArray.push(this.hiddenWords);
        // for (let i = 0; i < 6; i++) {
        //     if (i < 3) {
        //         this.hWordsArray[0].push(this.hiddenWords[i]);
        //     } else {
        //         this.hWordsArray[1].push(this.hiddenWords[i]);
        //     }
        // }
        // console.log("chupa rustom--->", this.hWordsArray[0]);
    }
    CreateAssets() {
        this.retrybase = this.add.image(0, 0, 'gBG').setDisplaySize(this.gameWidth, this.gameHeight).setAlpha(1);
        this.retrybutton = this.add.image(0, 250, 'but_restart').setInteractive({ useHandCursor: true });
        // Loose Asset
        this.looseTextBar = this.add.text(0, -125, 'You Loose!', { fontFamily: 'FredokaOne-Regular', fontSize: 100 }).setOrigin(0.5).setScale(Constant.scaleFactor);
        let textStr = 'Score: ' + Constant.score;
        let textStyle = {
            fontFamily: 'FredokaOne-Regular', fontSize: 85
        };
        let scoreTxt = Base.placeText(this, textStr, { x: 0, y: 30 }, textStyle).setOrigin(0.5).setScale(Constant.scaleFactor);

        // this.homeButton = this.add.image(-100, 100, 'music_btn').setInteractive({ useHandCursor: true });

        this.retryContainer = this.add.container(this.gameWidth / 2, this.gameHeight / 2);
        this.retryContainer.add([this.retrybase, this.retrybutton, this.looseTextBar, scoreTxt]).setVisible(false);
    }
    GridReset() {
        console.info("GridReset before If");
        if (Constant.wordWaveCount < 3) {
            console.info("GridReset after If");
            Constant.wordWaveCount++;
            this.lvlTxt.setText('LEVEL ' + Constant.wordWaveCount);
            this.items.RemoveWordsFromScreen();
            // this.grid.wordCheck.RemoveScoreText();
            this.gridSizerTable.destroy();
            this.bContainer.list[1].removeAllListeners();
            this.hWordsArray = [];
            this.hTxtArray.forEach(words => {
                words.destroy();
            });
            this.grid.wordCheck.bWordCounter = 0;
            this.hTxtArray = [];
            this.rndWordNo = Phaser.Math.Between(1, 3);
            for (let i = 0; i < this.rndWordNo; i++) {
                this.hWordsArray.push(this.hiddenWords.shift());
            }
            for (let i = 0; i < this.hWordsArray.length; i++) {
                let textStr = this.hWordsArray[i];
                // console.log("textStr".toUpperCase());
                let textStyle = {
                    fontFamily: 'FredokaOne-Regular', fontSize: 35, color: '#ffff00'
                };
                let hTxt = Base.placeText(this, textStr, { x: 0, y: 0 }, textStyle);
                hTxt.setScale(Constant.scaleFactor);
                hTxt.setOrigin(0.5, 0.5);
                this.aGGrid.placeAtIndex(1 + i, hTxt);
                this.hTxtArray.push(hTxt);
            }
            // console.info("reserved words in gamescene---------->", this.reservedWords[+(Constant.wordWaveCount) - 1]);
            this.levelCompletePopup.levelPopupContainer.list[2].setText('LEVEL 1 Score: ' + '' + ScoreManager.score);
            this.levelCompletePopup.ShowLevelCompletionPopup('Wait for Next Level....', 'Score: ' + ScoreManager.score);
            this.items = new GenerateRandomWords(this, this.alphabets, this.reservedWords[+(Constant.wordWaveCount) - 1], this.column, this.hWordsArray);
            this.grid = new Grid(this, this.tableWidth, this.tableHeight, this.noOfCells, this.column, this.alphabets, this.reservedWords[+(Constant.wordWaveCount) - 1]);
        } else {
            this.gameTime.paused = false;
            // this.GameWin();
            this.completeRound.UpdateScoreonAwakePopup("You Win!", ScoreManager.normalScore, ScoreManager.powerPlayScore, ScoreManager.bonusScore, ScoreManager.timeBonusScore);
            this.completeRound.ShowCompletePopup();
        }
    }
    StartSoundMenu() {
        this.soundPopup.ShowSoundPoup();
        this.CloseSoundPopup();
    }
    StartTutorial() {
        this.tutorialPopup.ShowTutorial();
        this.CloseTutorial();
    }
    CloseTutorial() {
        this.tutorialPopup.tutorialContainer.list[0].on('pointerdown', () => {
            this.tutorialPopup.HideTutorial();
        })
    }
    CloseSoundPopup() {
        this.soundPopup.soundPopupContainer.list[0].on('pointerdown', () => {
            this.soundPopup.HideSoundPopup();
        })
    }
    ShowHintOverPopup() {
        this.hintOverPopup.CreateHintOverPopup();
    }
    LoosePopUp() {
        // if (this.timeLeft == 0) {
        Constant.gameState = 'over';
        this.retryContainer.setVisible(true).setDepth(3);
        this.looseTextBar.setText('You Loose!');
        this.bg.setDepth(1.5);
        Constant.wordWaveCount = 1;
        Constant.countHint = 20;
        this.hTxtArray = [];
        this.retrybutton.on('pointerup', () => {
            this.retryContainer.destroy();
            this.scene.stop('CategoryScene');
            this.scene.stop('GameScene');
            this.scene.stop();
            Constant.score = 0;
            this.scene.start('CategoryScene');
        });
    }
    SettingPopupsInstance() {
        this.settingPopup = new SettingsPopup(this, false, false);
    }
    TutorialPopUpInstance() {
        this.tutorialPopup = new TutorialPopup(this);
        this.tutorialPopup.HideTutorial();
    }

    GameWin() {
        // if (Constant.score >= (Constant.numberOfWordsForPlace * 10)) {
        Constant.gameState = 'over';
        this.retryContainer.setVisible(true).setDepth(3);
        this.looseTextBar.setText('You Win!');
        this.bg.setDepth(1.5);
        this.gameTime.remove();
        this.hTxtArray = [];
        Constant.wordWaveCount = 1;
        Constant.countHint = 20;

        this.retrybutton.on('pointerdown', () => {
            this.retryContainer.setVisible(false).setDepth(0);
            this.scene.stop('GameScene');
            Constant.score = 0;
            this.scene.stop('CategoryScene');
            this.scene.start('CategoryScene');
        }, this);
    }
    FormatTime(seconds) {
        // Minutes
        let partInMinutes = Constant.round(seconds / 60);
        // Seconds
        let partInSeconds = seconds % 60;
        // Adds left zeros to minutes
        partInMinutes = partInMinutes.toString().padStart(2, '0');
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        // Returns formated time
        return `${partInMinutes}:${partInSeconds}`;
    }
    SetTimer() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.timeText.setText(this.FormatTime(this.timeLeft));
            if (this.timeLeft == 440) {//440
                this.powerPlay.ShowPowerPlayNotifPopup();
                // this.gameTime.paused = true;
            }
            else if (this.timeLeft == 20) {
                this.timeText.setColor('#fd7673');
                this.tweens.add({
                    targets: this.timeText,
                    alpha: 0,
                    duration: 500,
                    ease: "Power1",
                    repeat: -1,
                    yoyo: true
                }, true);
            }
        }
        else {
            this.gameTime.remove();
            // this.LoosePopUp();
            this.completeRound.UpdateScoreonAwakePopup("Time's Up", ScoreManager.normalScore, ScoreManager.powerPlayScore, ScoreManager.bonusScore, ScoreManager.timeBonusScore);
            this.completeRound.ShowCompletePopup();
        }

    }
}