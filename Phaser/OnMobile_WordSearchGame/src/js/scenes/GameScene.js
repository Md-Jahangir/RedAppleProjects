/* eslint-disable no-unused-vars */
/* global window,console */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 20-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 22-11-2024
 * @Description :- Control the full gameplay.
 ************************************/

import Phaser from 'phaser';
// import { SelectedResolution } from '../ResolutionSelector.js';
import { AdSDK } from '../AdSDK.js';
import { Utils } from '../Utils.js';
import { Constant } from '../Constant.js';
import Grid from '../grid/Grid.js';
import IdleScreenPopup from '../popup/IdleScreenPopup.js';
import InfoPopup from '../popup/InfoPopup.js';
import LevelUpPopup from '../popup/LevelUpPopup.js';
import GameOverPopup from '../popup/GameOverPopup.js';
import QuitPopup from '../popup/QuitPopup.js';
import ButtonTween from '../game-objects/ButtonTween.js';
import { AudioManager } from '../media/AudioManager';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler.js';
import * as GA from 'gameanalytics';

export default class GameScene extends Phaser.Scene {

  constructor() {
    super('GameScene');
  };

  init() {
    // this.gridType = 4;
    this.column = null;
    this.row = null;
    this.tableHeight = null;
    this.tableWidth = null;
    this.tableWidth = null;
    this.jsonWordList = null;
    this.searchListArray = [];
    this.wordsDumpedArray = [];
    this.uiContainer = null;
    this.cat = null;
    this.gridTxtFontSize = null;
    // this.hintCount = null;
    this.hintIndexCounter = -1;
    // this.sLvlCount = 0;
    // this.score = 0;
    this.timer = 0;
    this.TimedEvent = null;
    this.idleThreshold = 20000; // 20 seconds of inactivity
    this.lastInteractionTime = 0;
    this.isIdle = null;
    this.gameState = null;
    this.timerShown = false;
    this.dragDirCheckArray = [];
    this.isTweenActive = false;

    this.howManyLevelsPlayed = 0;
    this.adHitFrom = '';

    this.eventEmitter = new Phaser.Events.EventEmitter();
  };

  // InitializeAdSdk() {
  //   this.HideAdDiv();
  //   this.adSdk = new AdSDK({
  //     injectionElementId: Constant.adDivId,
  //     apiKey: Constant.adApiKey
  //   });

  //   this.adSdk.onStatus((status) => {
  //     this.OnGetStatus(status);
  //   });

  //   this.adSdk.onError((error) => {
  //     this.OnGetError();
  //   });
  // };

  // OnGetError() {
  //   setTimeout(() => {
  //     console.log('OnGetError');
  //     this.ControlFunctionalityOnAdStatus();
  //   }, 1000);
  // }

  // OnGetStatus(_status) {
  //   switch (_status.type) {
  //     case 'click':
  //       console.log('case click');
  //       break;

  //     case 'loaded':
  //       console.log('case loaded');
  //       break;

  //     case 'started':
  //       console.log('case started');
  //       break;

  //     case 'firstQuartile':
  //       console.log('case firstQuartile');
  //       break;

  //     case 'midpoint':
  //       console.log('case midpoint');
  //       break;

  //     case 'thirdQuartile':
  //       console.log('case thirdQuartile');
  //       break;

  //     case 'complete':
  //       console.log('case complete');
  //       this.ControlFunctionalityOnAdStatus();
  //       break;

  //     case 'allAdsCompleted':
  //       console.log('case allAdsCompleted');

  //       break;

  //     case 'paused':
  //       console.log('case paused');
  //       break;

  //     case 'skip':
  //       console.log('case skip');
  //       this.ControlFunctionalityOnAdStatus();
  //       break;

  //     case 'manuallyEnded':
  //       console.log('case manuallyEnded');
  //       this.ControlFunctionalityOnAdStatus();
  //       break;

  //     default:
  //       break;
  //   }
  // };

  async ShowAd() {
    // this.ShowAdDiv();
    // this.adSdk.showAd();
    console.log('show ad......');

    GA.GameAnalytics.addDesignEvent('ad:requested');
    // PlayzhubEventHandler.RequestAD();
    await this.RequestAdAsync(2000);
    this.ControlFunctionalityOnAdStatus();
  };

  async RequestAdAsync(timeoutMs = 2000, onAdCompleteCallback) {
    return new Promise((resolve) => {
      let started = false;
      let finished = false;
      let timeoutId = null;

      const startedCallback = () => {
        started = true;
      };

      const completedCallback = () => {
        cleanup();
        resolve();
      };

      const cleanup = () => {
        if (finished) return;
        finished = true;

        if (onAdCompleteCallback) {
          onAdCompleteCallback();
        }
        clearTimeout(timeoutId);
        this.eventEmitter.off('AdStarted', startedCallback);
        this.eventEmitter.off('AdCompleted', completedCallback);
      };

      timeoutId = setTimeout(() => {
        if (!started) {
          cleanup();
          resolve();
        }
      }, timeoutMs);

      this.eventEmitter.on('AdStarted', startedCallback);
      this.eventEmitter.on('AdCompleted', completedCallback);

      PlayzhubEventHandler.RequestAD();
    });
  };

  // ShowAdDiv() {
  //   const adContainer = document.getElementById('applixir-ad-container');
  //   adContainer.style.display = 'block';
  // };

  // HideAdDiv() {
  //   const adContainer = document.getElementById('applixir-ad-container');
  //   if (adContainer) {
  //     adContainer.innerHTML = ''; // This removes all child nodes from the container
  //   }
  //   adContainer.style.display = 'none';
  // };

  ControlFunctionalityOnAdStatus() {
    if (this.adHitFrom === 'hint') {
      this.adHitFrom = '';
      setTimeout(() => {
        this.ShowHintsAfterAd();
      }, 100);
    } else if (this.adHitFrom === 'level_complete') {

    }
  };

  IncrementLevelAndShowAd() {
    this.howManyLevelsPlayed += 1;
    if (this.howManyLevelsPlayed === 3) {
      this.ShowAd();
      this.howManyLevelsPlayed = 0;
    } else { }
  };

  create() {
    // this.InitializeAdSdk();

    Constant.gameStartTime = Date.now();
    // this.score = 0;
    Constant.currentScene = 'GameScene';
    this.orgX = window.innerWidth; //originalX
    this.orgY = window.innerHeight; //originalY
    Constant.game.events.on('resize', this.resize, this);
    PlayzhubEventHandler.AdStarted(this.OnStartingAd.bind(this));
    PlayzhubEventHandler.AdCompleted(this.OnAdCompleted.bind(this));
    this.cameras.main.fadeIn(800);
    AudioManager.PlayLevelMusic();
    this.CreateGameEvents();
    this.CreateGameplayBg();
    this.CreateOverlay();
    this.AddAllPopups();
    this.GridSettings(Constant.gridType);
    this.WordsSettings();
    this.GetWords();
    this.CreateGrid();
    this.CreateGameUI();
    this.ShowPopup();
    this.CreateWordList();
    //resize
    this.GameResize();

    GA.GameAnalytics.addProgressionEvent(
      'Start',
      'word_search_level'
    );
  }

  OnStartingAd() {
    GA.GameAnalytics.addDesignEvent('ad:started');
    PlayzhubEventHandler.GamePlayPaused();
    this.sound.setMute(true);
    this.TimedEvent.paused = true;
  }

  OnAdCompleted() {
    GA.GameAnalytics.addDesignEvent('ad:completed');
    PlayzhubEventHandler.GamePlayResumed();
    this.TimedEvent.paused = false;
    this.sound.setMute(false);

    this.ControlFunctionalityOnAdStatus();
  }

  GameResize() {
    if (window.innerWidth > window.innerHeight) {
      const clientHeight = window.innerHeight;
      Constant.clientHeight = clientHeight;
      const clientWidth = (clientHeight / 1.77777777778);
      Constant.clientWidth = clientWidth;
      const widthOffset = (window.innerWidth / 2) - (clientWidth / 2);
      this.resize(clientWidth, clientHeight, widthOffset);
    }
    else {
      const clientWidth = window.innerWidth;
      Constant.clientWidth = clientWidth;

      const clientHeight = window.innerHeight;
      Constant.clientHeight = clientHeight;

      const widthOffset = 0;
      this.resize(clientWidth, clientHeight, widthOffset);
    }
  }

  CheckIdleScreen() {
    if (this.gameState === 'playing') {
      this.lastInteractionTime = this.time.now; // Initialize here
      this.input.on('pointermove', this.resetIdleTimer, this);

      this.time.addEvent({
        delay: 1000, // Check every second
        callback: this.updateIdleTimer,
        callbackScope: this,
        loop: true
      });
    }
  }

  resetIdleTimer() {
    if (this.gameState === 'playing') {
      this.lastInteractionTime = this.time.now; // Update last interaction time
      this.isIdle = null;
    }
  }

  updateIdleTimer() {
    const idleTime = this.time.now - this.lastInteractionTime;

    if (idleTime > this.idleThreshold && this.isIdle === null) {
      this.isIdle = true; // Mark as idle
      this.idleScreenPopup.ShowIdlePopup(); // Show the popup
    }

    if (this.isIdle && this.gameState !== 'playing') {
      this.isIdle = false; // Reset idle state if no longer playing
    }
  }

  CreateGameEvents() {
    // this.events.on('receiveddata', this.CreateGameUI, this);
    this.events.on('levelup', this.RemoveGrid, this);
    this.events.on('reset', this.ResetGrid, this);
    this.events.on('scoreup', this.AddScore, this);
  }

  CreateGameplayBg() {
    this.gameplayBg = this.add.image(0, 0, 'gBG').setOrigin(0);
  }

  CreateOverlay() {
    this.overlay = this.add.image(0, 0, 'g_overlay').setOrigin(0).setInteractive({ useHandCursor: true });//.setVisible(false);
  }

  AddAllPopups() {
    this.idleScreenPopup = new IdleScreenPopup(this);
    this.levelPopup = new LevelUpPopup(this);
    this.gameoverPopup = new GameOverPopup(this);
    this.quitPopup = new QuitPopup(this);

    // setTimeout(() => {
    //   this.gameoverPopup.ShowGameOverPopup();
    // }, 500);
  }

  GridSettings(_gridType) {
    console.log('_gridType', _gridType);

    this.column = _gridType;
    this.row = _gridType;
  }

  WordsSettings() {
    switch (this.row) {
      case 4: this.cat = '4Grid';
        this.gridTxtFontSize = 60;
        break;

      case 5: this.cat = '5Grid';
        this.gridTxtFontSize = 55;
        break;

      case 6: this.cat = '6Grid';
        this.gridTxtFontSize = 50;
        break;

      case 7: this.cat = '7Grid';
        this.gridTxtFontSize = 40;
        break;

      case 8: this.cat = '8Grid';
        this.gridTxtFontSize = 35;
        break;

      default:
        break;
    }
  }

  GetWords() {

    this.jsonWordList = this.cache.json.get('words');
    this.jsonWords = this.jsonWordList[this.cat].pairs;
  }

  CreateGrid() {
    this.uniqueRndNum = this.generateUniqueRandomNumbers(9, 1, 9);

    this.grid = new Grid(this, this.tableWidth, this.column, this.row, this.jsonWords, this.gridTxtFontSize);

    this.grid.panel.setVisible(false);
    this.storedIndices = this.grid.placeWords.storingIndexOfWords;
    this.boardGrid = this.grid.boardGrid;
    if (Constant.sLvlCount !== 20) {
      Constant.sLvlCount += 1;
    }

    this.grid.BoardResize(Constant.clientWidth, Constant.clientHeight, Constant.newScale);

  }

  generateUniqueRandomNumbers(count, min, max) {
    const numbers = [];

    if (count > max - min + 1) {
      throw new Error('The count is larger than the possible number of unique values.');
    }

    while (numbers.length < count) {
      const randNum = this.generateRandomNumber(min, max);

      if (!numbers.includes(randNum)) {
        numbers.push(randNum);
      }
    }

    return numbers;
  }

  generateRandomNumber(_min, _max) {
    const rnd = Phaser.Math.Between(_min, _max);
    return rnd;
  }

  CreateGameUI() {
    //topPanel
    this.topPanelContainer = this.add.container();
    this.backButton = this.add.image((120 - 540), 140, 'back_btn').setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.pointBase = this.add.image(this.backButton.x + 425, this.backButton.y, 'point_base').setOrigin(0.5);
    let fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '35px', fill: '#ffffff', align: 'center' };
    this.scoreTxt = this.add.text(this.pointBase.x + 15, this.pointBase.y - 3, Constant.score, fontTextStyle).setOrigin(0.5);
    this.scoreTxt.setStroke('#8a2309', 6);
    // this.timeBase = this.add.image(this.pointBase.x + 345, this.pointBase.y, 'time_base').setOrigin(0.5);
    // this.timeBar = this.add.nineslice(this.timeBase.x - (this.timeBase.width / 2), this.timeBase.y, 'time_bar', 0, Constant.timeBarWidth, 48, 0);
    // this.timeBar.setOrigin(0, 0.5);
    // this.clock = this.add.image(this.timeBase.x - (this.timeBase.width / 2), this.timeBase.y, 'clock').setOrigin(0.5);
    // fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '35px', fill: '#ffefd7', align: 'center' };
    // this.timeTxt = this.add.text(this.timeBase.x + 7, this.timeBase.y, '', fontTextStyle).setOrigin(0.5);
    // this.timeTxt.setStroke('#8e271f', 6);
    this.soundButton = this.add.sprite(this.pointBase.x + 425, this.backButton.y, 'sound_btn').setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.CreateTimer();

    this.topPanelContainer.add([this.backButton, this.pointBase, this.scoreTxt, this.soundButton]);

    //bottomPanel
    // this.hintCount = 5;
    this.bottomPanelContainer = this.add.container();
    this.hintButton = this.add.image(355, -215, 'hint_btn').setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.hintCBase = this.add.image(this.hintButton.x + 65, this.hintButton.y - 60, 'hBase').setOrigin(0.5);
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '35px', fill: '#ffffff', align: 'center' };
    this.hintCText = this.add.text(this.hintCBase.x + 2, this.hintCBase.y - 2.5, Constant.hintCount, fontTextStyle).setOrigin(0.5);
    this.hintCText.setStroke('#5b2fb6', 6);

    this.bottomPanelContainer.add([this.hintButton, this.hintCBase, this.hintCText]);

    this.backButton.on('pointerup', this.OnPressingBackBtn, this);
    this.soundButton.on('pointerup', this.OnPressingSoundBtn, this);
    this.hintButton.on('pointerup', this.OnPressingHintBtn, this);
    // this.GameResize();
  }

  ShowAdIcon() {
    this.hintCBase.setTexture('ad_icon');
    this.hintCText.setVisible(false);
  }

  ShowTimeProgress() {
    this.tweens.add({
      targets: this.timeBar,
      width: 49,
      duration: Constant.timeToEnd * 1000,
      ease: 'linear',
      yoyo: false,
      repeat: 0,
      onUpdate: () => {
        Constant.timeBarWidth = this.timeBar.width;
      }
    });
  }

  CreateTimer() {
    this.TimedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.UpdateTime,
      callbackScope: this,
      loop: true
    });
    // setTimeout(() => {
    //   this.ShowTimeProgress();
    // }, 100);
  }

  UpdateTime() {
    if (Constant.timeToEnd > 0) {
      Constant.timeToEnd--;
      this.DisplayTimeFormat(Constant.timeToEnd);
      if (Constant.timeToEnd === 60) {
        this.gameState = 'climax';
        AudioManager.PlayFinalAlertPopupAudio();
        this.idleScreenPopup.ShowIdlePopup();
        this.idleScreenPopup.alertBase.setVisible(true);
        setTimeout(() => {
          this.idleScreenPopup.HideIdlePopup();
        }, 3200);
      }
    }
    else if (Constant.timeToEnd === 0) {
      // Server.PostGamePlayTimeToParent(Server.timerValue - Constant.timeToEnd);
      // this.TimedEvent.remove();
      // this.idleScreenPopup.alertBase.setVisible(false);
      // this.ShowGameOver();
      // AudioManager.PlayGameOverAudio();
    }
  }

  DisplayTimeFormat(_time) {
    if (!this.timerShown) {
      this.timerShown = true;
      this.ShowTimeProgress();
    }

    let minutes = parseInt(_time / 60, 10);
    let seconds = parseInt(_time % 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    this.timeTxt.setText(`${minutes} : ${seconds}`);
  }

  ShowPopup() {
    this.infoPopup = new InfoPopup(this);
    this.infoPopup.ShowInfo();
  }

  CreateWordList() {

    this.wLContainer = this.add.container();
    this.wLBase = this.add.image(0, -(this.grid.panel.height / 2) + 30, 'wLBase').setOrigin(0.5);
    // this.wLBase.width = 100;
    // const scaleX = 875 / this.wLBase.width;
    // this.wLBase.setScale(scaleX, this.wLBase.scaleY); // Keep the height scale unchanged
    this.wLBase.displayWidth = 770;


    this.wLContainer.add(this.wLBase);
    this.positionWordsOnWLBase();
  }

  positionWordsOnWLBase() {
    const emptyArrayIndex = this.storedIndices.findIndex(arr => arr.length === 0);
    if (emptyArrayIndex !== -1) {
      this.storedIndices.splice(emptyArrayIndex, 1);
    }

    const baseWidth = this.wLBase.displayWidth;
    const baseHeight = this.wLBase.displayHeight;
    this.words = this.grid.placeWords.allPlacedWords;

    let wordGap = 40; // Gap between words
    const extraGapOnNewLine = 50; // Extra gap for the first word on each new line
    const fixedIndentation = 150; // Fixed space for the start of every line

    const totalWords = this.words.length;
    let dynamicLineHeight = Math.max(30, Math.min(80, baseHeight / totalWords));

    const requiredHeight = 2 * (dynamicLineHeight + wordGap);
    if (baseHeight < requiredHeight) {
      return;
    }

    const usableWidth = baseWidth - wordGap;
    const startX = -(usableWidth / 2) + fixedIndentation;
    let currentX = startX;
    let currentY = -(baseHeight / 2) + dynamicLineHeight + wordGap;

    this.lines = [];
    let currentLine = [];
    this.searchListArray = [];

    this.words.forEach((wordObj) => {
      const word = wordObj.word;
      const wordWidth = this.getWordWidth(word);

      if (currentX + wordWidth > usableWidth / 2) {
        this.lines.push(currentLine);
        currentLine = [];
        currentX = startX + extraGapOnNewLine;
        currentY += dynamicLineHeight + wordGap;
      }

      currentLine.push({ word, wordWidth, x: currentX, y: currentY });
      currentX += wordWidth + wordGap;
    });

    this.lines.push(currentLine);

    // Adjust line gap for multiple lines
    if (this.lines.length > 1) {
      dynamicLineHeight *= 1; // Adjust line height for tighter spacing
      wordGap *= 0.6; // Reduce word gap slightly
    }

    // Diminish line gap further if there are two lines and the last line has only one word
    if (this.lines.length === 2 && this.lines[1].length === 1) {
      wordGap *= 0.3; // Further reduce the word gap for the last line with only one word
    }

    // Shift all lines upward slightly for better alignment (upward shift)
    if (this.lines.length > 1) {
      const totalTextHeight = (this.lines.length * dynamicLineHeight) + ((this.lines.length - 1) * (wordGap));
      const availableVerticalSpace = baseHeight - totalTextHeight;
      const upwardShift = availableVerticalSpace / 12; // Apply a smaller upward shift

      // Apply upward shift to all words
      this.lines.forEach(line => {
        line.forEach(wordObj => {
          wordObj.y -= upwardShift; // Apply upward shift to move lines higher
        });
      });
    }

    // Center-align the last line if needed
    const lastLine = this.lines[this.lines.length - 1];
    const previousLine = this.lines[this.lines.length - 2];

    if (previousLine && lastLine.length < previousLine.length) {
      const totalLastLineWidth = lastLine.reduce((acc, wordObj) => acc + wordObj.wordWidth + wordGap, -wordGap);
      let centerX = -(usableWidth / 2) + ((usableWidth - totalLastLineWidth) / 2);
      lastLine.forEach(wordObj => {
        wordObj.x = centerX;
        centerX += wordObj.wordWidth + wordGap;
      });
    }

    // Check the number of lines and set font size accordingly
    const fontSize = this.lines.length > 2 ? 35 : 37;

    // Render the words on the screen
    this.lines.flat().forEach(wordObj => {
      const textObj = this.add.text(
        this.wLBase.x + wordObj.x,
        this.wLBase.y + wordObj.y,
        wordObj.word,
        {
          fontFamily: 'Fredoka-Bold',
          fontSize: fontSize, // Dynamic font size
          color: '#ffefd7',
          fontStyle: 'bold',
        }
      ).setOrigin(0.5);
      this.searchListArray.push(textObj);
      this.wLContainer.add(textObj);
    });

    this.wLContainer.setVisible(false);
  }

  getWordWidth(word) {
    const text = this.add.text(0, 0, word, { fontFamily: 'Fredoka-Bold', fontSize: 35 });
    const fixedWordWidth = 100; // Set a fixed word width (in pixels)

    // This constrains the text within the specified width, cutting off any overflow
    text.setFixedSize(fixedWordWidth, text.height);
    const wordWidth = text.width * 1.5;
    text.destroy(); // Clean up the text object
    return wordWidth;
  }

  OnPressingBackBtn() {
    GA.GameAnalytics.addDesignEvent('ui:back_clicked');
    AudioManager.PauseGameMusic();
    this.btnTween = new ButtonTween(this, this.backButton, null);
    AudioManager.PlayGameButtonPressAudio();
    this.ShowAd();
    this.btnTween.btnTween.on('complete', () => {
      AudioManager.PlayLevelMusic();
      this.quitPopup.ShowQuitPopup();
      // this.quitPopup.TweenQuitPopupToScreen(0);
    });
  }

  OnPressingSoundBtn() {
    GA.GameAnalytics.addDesignEvent('ui:sound_clicked');
    this.btnTween = new ButtonTween(this, this.soundButton, null);
    AudioManager.PlayGameButtonPressAudio();
    if (this.soundButton.frame.name === 0) {
      this.soundButton.setFrame(1);
      localStorage.setItem('word_search', 0);
      AudioManager.PauseGameMusic();
    }
    else {
      this.soundButton.setFrame(0);
      localStorage.setItem('word_search', 1);
      if (AudioManager.gameplayBG.isPaused) {
        if (this.gameState === 'playing') AudioManager.ResumeGameMusic();
      }
      else {
        if (this.gameState === 'playing') AudioManager.PlayGameMusic();
      }
    }
  }

  OnPressingHintBtn() {
    GA.GameAnalytics.addDesignEvent('ui:hint_clicked');
    this.btnTween = new ButtonTween(this, this.hintButton, null);
    if (Constant.hintCount > 0 && this.storedIndices.length !== 0) {
      AudioManager.PlayGameButtonPressAudio();
      Constant.hintCount--;
      if (this.storedIndices.length > 1) {
        this.hintIndexCounter = (this.hintIndexCounter + 1) % this.storedIndices.length;
      } else {
        this.hintIndexCounter = 0;
      }
      this.hintCText.setText(Constant.hintCount);
      this.GetWordIndices();
    } else {
      this.adHitFrom = 'hint';
      this.ShowAd();
    }
  }

  // HandleHint() {
  //   if (this.storedIndices.length > 1) {
  //     this.hintIndexCounter = (this.hintIndexCounter + 1) % this.storedIndices.length;
  //   } else {
  //     this.hintIndexCounter = 0;
  //   }
  //   this.GetWordIndices();
  // }

  ShowHintsAfterAd() {
    if (this.storedIndices.length !== 0) {
      // this.btnTween = new ButtonTween(this, this.hintButton, null);
      AudioManager.PlayGameButtonPressAudio();
      if (this.storedIndices.length > 1) {
        this.hintIndexCounter = (this.hintIndexCounter + 1) % this.storedIndices.length;
      } else {
        this.hintIndexCounter = 0;
      }
      this.GetWordIndices();
    }
  };

  GetWordIndices() {
    console.log('GetWordIndices');

    // this.hintButton.removeInteractive();
    for (let i = 0; i < this.storedIndices[this.hintIndexCounter].length; i++) {
      this.wordsForTweens = this.boardGrid.sizerChildren[this.storedIndices[this.hintIndexCounter][i]].children[0];
      this.TweenWordLetters(this.wordsForTweens);
    }
  }

  DisableHintButton() {
    this.hintButton.removeInteractive();
    this.hintButton.setAlpha(0.5);
    this.hintCBase.setAlpha(0.5);
    this.hintCText.setAlpha(0.5);
  };
  EnableHintButton() {
    this.hintButton.setInteractive();
    this.hintButton.setAlpha(1);
    this.hintCBase.setAlpha(1);
    this.hintCText.setAlpha(1);
  };

  TweenWordLetters(_letter) {
    console.log('TweenWordLetters');
    this.DisableHintButton();
    this.wordTween = this.tweens.add({
      targets: _letter,
      alpha: 0.2,
      duration: 500,
      ease: 'Power1',
      yoyo: true,
      repeat: 2,
      onComplete: () => {
        this.EnableHintButton();
        _letter.setAlpha(1);
        if (Constant.hintCount === 0) {
          this.ShowAdIcon();
        }
        // if (Constant.hintCount === 0) {
        //   // this.hintButton.removeInteractive();
        //   // this.hintButton.setAlpha(0.5);
        //   // this.hintCBase.setAlpha(0.5);
        //   // this.hintCText.setAlpha(0.5);
        // }
        // else {
        //   // this.hintButton.setInteractive();
        //   this.EnableHintButton();
        //   _letter.setAlpha(1);
        // }
      }
    });
  }

  AddScore() {
    Constant.score += 10;
    this.scoreTxt.setText(Constant.score);
  }

  RemoveGrid() {

    this.grid.panel.children.forEach(element => {
      if (element.type !== 'Image') {
        element.children[1].data.remove();
        if (element.children[0].data !== null) {
          element.children[0].data = null;
        }
      }
    });
    if (Constant.gridType < 8 && Constant.sLvlCount === 20) {
      GA.GameAnalytics.addProgressionEvent(
        'Complete',
        'word_search_level',
        Constant.sLvlCount,
        undefined,
        Constant.score
      );

      GA.GameAnalytics.addDesignEvent('score:word_search', Constant.score);

      Constant.gridType++;
      Constant.sLvlCount = 0;
      this.levelPopup.levelScoreTxt.setText(Constant.score);
      this.gameState = null;
      Constant.totalLevels = 5;
      PlayzhubEventHandler.GameStateUpdate({
        'current_grid': Constant.gridType,
        'sub_levels': Constant.sLvlCount,
        'game_collectibles': {
          'hints_used': Constant.hintCount,
        },
        'total_levels': Constant.totalLevels,
        'game_score': Constant.score
      });
      const currentTimeStamp = Date.now();
      const finalTime = currentTimeStamp - Constant.gameStartTime;
      PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, Constant.score);
      AudioManager.PauseGameMusic();
      this.levelPopup.ShowPopup();
      this.hintButton.removeInteractive();
      AudioManager.PlayLvlCompleteAudio();
      setTimeout(() => {
        this.levelPopup.RemoveLvlPopup();
        this.hintButton.setInteractive({ useHandCursor: true });
      }, 3400);
    }
    else {
      if (Constant.gridType === 8 && Constant.sLvlCount === 20) {
        GA.GameAnalytics.addProgressionEvent(
          'Complete',
          'word_search_level',
          Constant.sLvlCount,
          undefined,
          Constant.score
        );

        GA.GameAnalytics.addDesignEvent('score:word_search', Constant.score);
        // console.log('sLvlCount at else if of RemoveGrid', Constant.sLvlCount);
        PlayzhubEventHandler.GameStateUpdate({
          'current_grid': Constant.gridType,
          'sub_levels': Constant.sLvlCount,
          'game_collectibles': {
            'hints_used': Constant.hintCount,
          },
          'total_levels': Constant.totalLevels,
          'game_score': Constant.score
        });
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, Constant.score);
        setTimeout(() => {
          PlayzhubEventHandler.GameStateUpdate({
            'current_grid': null,
            'sub_levels': null,
            'game_collectibles': {
              'hints_used': null,
            },
            'total_levels': null,
            'game_score': null
          });
          const currentTimeStamp = Date.now();
          const finalTime = currentTimeStamp - Constant.gameStartTime;
          PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, null);
        }, 20);
        this.gameState = null;
        this.ShowGameOver();
        AudioManager.PlayGameOverAudio();
      }
      else {
        GA.GameAnalytics.addProgressionEvent(
          'Complete',
          'word_search_level',
          Constant.sLvlCount,
          undefined,
          Constant.score
        );

        GA.GameAnalytics.addDesignEvent('score:word_search', Constant.score);

        Constant.totalLevels = 5;
        PlayzhubEventHandler.GameStateUpdate({
          'current_grid': Constant.gridType,
          'sub_levels': Constant.sLvlCount,
          'game_collectibles': {
            'hints_used': Constant.hintCount,
          },
          'total_levels': Constant.totalLevels,
          'game_score': Constant.score
        });
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, Constant.score);
        this.levelPopup.subLvlCount.setText(`${Constant.sLvlCount}/20`);
        this.gameState = null;
        AudioManager.PauseGameMusic();
        this.levelPopup.ShowSubLvlPopup();
        this.hintButton.removeInteractive();
        AudioManager.PlaySubLvlCompleteAudio();
        this.adHitFrom = 'level_complete';
        setTimeout(() => {
          this.IncrementLevelAndShowAd();
        }, 500);
        setTimeout(() => {
          this.levelPopup.RemoveSubLvlPopup();
          this.hintButton.setInteractive({ useHandCursor: true });
        }, 3400);
      }
    }
  }

  ShowGameOver() {
    this.gameoverPopup.ShowGameOverPopup();
    this.wordsDumpedArray = [];
    this.searchListArray = [];
    Constant.gridType = 0;
  }

  DestroyWordsDumped() {
    this.wordsDumpedArray.forEach(_e => {
      _e.destroy();
    });
  }

  ResetGrid() {
    Constant.gameStartTime = Date.now();
    this.DestroyWordsDumped();
    this.wordsDumpedArray = [];
    this.searchListArray = [];
    this.grid.panel.removeAllListeners();
    // Now destroy the panel safely
    // Remove panel listeners before destroying it
    this.grid.RemovePanelListeners();
    // Now destroy the panel
    this.grid.panel.destroy();
    this.GridSettings(Constant.gridType);
    this.WordsSettings();
    this.GetWords();
    this.CreateGrid();
    if (AudioManager.gameplayBG.isPaused) AudioManager.ResumeGameMusic();
    else AudioManager.PlayGameMusic();
    // this.grid.BoardResize(Constant.clientWidth, Constant.clientWidth, Constant.newScale);
    this.positionWordsOnWLBase();
    this.grid.panel.setVisible(true);
    this.wLContainer.setVisible(true);
  }

  resize(_newWidth, _newHeight, offsetWidth) {
    if (Constant.currentScene !== 'GameScene') {
      return;
    }

    const newScale = Utils.GetScale(1080, 1920, _newWidth, _newHeight);
    Constant.clientHeight = _newHeight;
    Constant.clientWidth = _newWidth;
    Constant.newScale = newScale;


    this.gameplayBg.setDisplaySize(_newWidth, _newHeight);
    this.grid.BoardResize(_newWidth, _newHeight, newScale);
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.infoPopup.ResizeInfoContainers(_newWidth, _newHeight, newScale);
    this.idleScreenPopup.ResizeIdleScreenPopupContainer(_newWidth, _newHeight, newScale);
    this.topPanelContainer?.setScale(newScale);
    this.bottomPanelContainer?.setScale(newScale);
    if (getMobileOperatingSystem() === 'iOS') {
      this.topPanelContainer?.setPosition(_newWidth / 2, (90 * newScale));
      this.bottomPanelContainer?.setPosition(_newWidth / 2, (_newHeight / 1) - (90 * newScale));
    } else {
      this.topPanelContainer?.setPosition(_newWidth / 2, 0);
      this.bottomPanelContainer?.setPosition(_newWidth / 2, (_newHeight / 1));
    }
    this.wLContainer.setScale(newScale);
    this.wLContainer.setPosition(_newWidth / 2, _newHeight / 2);
    this.levelPopup.ResizeLevelPopupCOntainer(_newWidth, _newHeight, newScale);
    this.quitPopup.ResizeQuitContainer(_newWidth, _newHeight, newScale);
    this.gameoverPopup.ResizeGameOverPopupContainer(_newWidth, _newHeight, newScale);

    const camera = this.cameras.main;
    camera.x = offsetWidth;
    // camera.setBounds(0, 0, newWidth, newHeight);
    camera.setViewport(offsetWidth, 0, _newWidth, _newHeight);
  }
  //########################################################################################

}