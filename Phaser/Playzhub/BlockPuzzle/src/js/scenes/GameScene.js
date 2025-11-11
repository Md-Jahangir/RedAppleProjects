/* global window,console */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 09-12-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 27-03-2025
 * @Description :- Control the full gameplay.
 ************************************/

import Phaser from 'phaser';
import { Utils } from '../Utils.js';
import { Constant } from '../Constant.js';
import { AudioManager } from '../media/AudioManager';
import InfoPopup from '../popup/InfoPopup.js';
import BlockContainer from '../game-objects/BlockContainer.js';
import ButtonTween from '../game-objects/ButtonTween.js';
import gsap from 'gsap';
import QuitPopup from '../popup/QuitPopup.js';
import LevelUpPopup from '../popup/LevelUpPopup.js';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler.js';
// import { AdSDK } from '../AdSDK.js';
import * as GA from 'gameanalytics';

export default class GameScene extends Phaser.Scene {

  constructor() {
    super('GameScene');
  }

  init(_replayData) {
    this.topPanelContainer = null;
    this.bottomPanelContainer = null;
    this.score = 0;
    this.timer = 0;
    this.TimedEvent = null;
    this.fContainer = null;
    this.fContainerNum = null;
    this.containerTypeArray = [];
    this.selectedBlockIconsArray = null;
    this.tempArray = [];
    this.contCompleted = null;
    this.normalAnimCal = true;
    this.iconWidth = Constant.iconWidth;
    this.contMoveHistArray = [];
    this.iconMoveHistArray = [];
    this.holdersArr = [];
    this.elemArray = [];
    this.isReplay = _replayData.isReplay || null;
    Constant.movesCount = 0;
    this.animationCompCheck = null;
    this.floatCounter = null;
    this.animState = null;
    this.isProcessing = null;

    this.howManyLevelsPlayed = 0;
    this.adHitFrom = '';
  };
  // InitializeAdSdk() {
  //   this.HideAdDiv();
  //   // this.adSdk = new AdSDK({
  //   //   gameId: 9451,// Constant.adGameId,
  //   //   zoneId: 2050,//Constant.adZoneId,
  //   //   accountId: 8837,// Constant.adAccountId,
  //   //   injectionElementId: 'applixir-ad-container'//Constant.adInjectectionDivId
  //   // });

  //   this.adSdk = new AdSDK({
  //     injectionElementId: Constant.adDivId,
  //     apiKey: Constant.adApiKey
  //   });
  //   // console.log('ad sdk: ', this.adSdk);

  //   this.adSdk.onStatus((status) => {
  //     // console.log('Main: Ad Status =>', status);
  //     this.OnGetStatus(status);
  //   });

  //   this.adSdk.onError((error) => {
  //     console.error('Main: Ad Error =>', error);
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

  // ControlFunctionalityOnAdStatus() {
  //   this.TimedEvent.paused = false;
  //   if (this.adHitFrom === 'reload' || this.adHitFrom === 'level_failed') {
  //     console.log(' reload or level_failed');
  //     this.scene.restart({ 'isReplay': this.isReplay });
  //   } else if (this.adHitFrom === 'undo') {
  //     console.log(' undo');
  //     this.HandleUndoMove();
  //   } else if (this.adHitFrom === 'level_complete') {
  //     console.log(' level_complete');
  //   }
  // };

  ShowAd() {
    // this.ShowAdDiv();
    // this.adSdk.showAd();
    GA.GameAnalytics.addDesignEvent('ad:requested');
    PlayzhubEventHandler.RequestAD();
  };

  // ShowAdDiv() {
  //   const adContainer = document.getElementById('applixir-ad-container');
  //   adContainer.style.display = 'block';
  // };

  // HideAdDiv() {
  //   const adContainer = document.getElementById('applixir-ad-container');
  //   if (adContainer) {
  //     adContainer.innerHTML = '';
  //   }
  //   adContainer.style.display = 'none';
  // };


  shoIncrementLevelAndShowAd() {
    this.howManyLevelsPlayed += 1;
    if (this.howManyLevelsPlayed === 3) {
      this.ShowAd();
      this.howManyLevelsPlayed = 0;
    } else { }
  };

  preload() { };

  create() {
    // this.InitializeAdSdk();
    if (this.isReplay) {
      PlayzhubEventHandler.SendGameStateToGame(this.UpdateLevel.bind(this));
      PlayzhubEventHandler.ReceivedGameState(this.UpdateLevel.bind(this));
      PlayzhubEventHandler.RequestGameStateFromGame();
      PlayzhubEventHandler.RequestGameState();
    }
    Constant.gameStartTime = Date.now();
    gsap.registerPlugin(MotionPathPlugin);
    PlayzhubEventHandler.GamePlayStarted();
    Constant.currentScene = 'GameScene';
    this.orgX = window.innerWidth; //originalX
    this.orgY = window.innerHeight; //originalY
    Constant.game.events.on('resize', this.resize, this);
    PlayzhubEventHandler.AdStarted(this.OnStartingAd.bind(this));
    PlayzhubEventHandler.AdCompleted(this.OnAdCompleted.bind(this));
    this.cameras.main.fadeIn(800);
    AudioManager.PlayLevelMusic();
    this.CreateGameplayBg();
    this.CreateGameUI();
    this.CreateGameContainer();
    this.CreateBlockContainers();
    this.CreateGameEvents();
    this.AddAllPopups();
    this.AddConfetti();

    //resize
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

    GA.GameAnalytics.addProgressionEvent(
      'Start',
      'cake_sort_level'
    );
  }

  UpdateLevel(_data) {
    console.log('Fetch data of levels at gamescene', _data);

    if (data === null || _data.level === 100) {
      Constant.setLevel = 0;
      Constant.currUndoCount = 5;
      Constant.gameScore = 0;
    }
    else {
      Constant.setLevel = _data.level;
      Constant.gameScore = _data.score;
      if (_data.undo) {
        Constant.currUndoCount = _data.undo;
      }
      else {
        Constant.currUndoCount = 5;
      }
    }
  }

  OnStartingAd() {
    GA.GameAnalytics.addDesignEvent('ad:started');
    PlayzhubEventHandler.GamePlayPaused();
    this.TimedEvent.paused = true;
    // AudioManager.PauseGameMusic();
    this.sound.setMute(true);
  }

  OnAdCompleted() {
    GA.GameAnalytics.addDesignEvent('ad:completed');
    PlayzhubEventHandler.GamePlayResumed();
    this.TimedEvent.paused = false;
    // AudioManager.ResumeGameMusic();
    this.sound.setMute(false);
  }

  CreateGameEvents() {
    this.events.on('first_selected', this.AnimateIconMovement, this);
    this.events.on('same_selected', this.AnimateIconMovementOnSameSelection, this);
    this.events.on('target_selected', this.CheckIconMovementToTarget, this);
    this.events.on('move_complete', this.CheckOnMoveComplete, this);
  }

  AddAllPopups() {
    this.tutorialPopup = new InfoPopup(this);
    if (Constant.showTutPages) {
      this.tutorialPopup.ShowInfo();
    }
    else this.CreateTimer();

    this.quitPopup = new QuitPopup(this);
    this.levelPopup = new LevelUpPopup(this);
  }

  CreateGameplayBg() {
    this.gameplayBg = this.add.sprite(0, 0, 'gameBG').setOrigin(0.5);//.setScale(0.2);
  }

  CreateGameUI() {
    //Top Panel
    this.topPanelContainer = this.add.container();

    const header = this.add.image(0, 50, 'header').setOrigin(0.5);
    const levelBase = this.add.image(header.x, header.y + 115, 'level_base').setOrigin(0.5);
    const scoreBase = this.add.image(header.x - 180, header.y - 25, 'score_base').setOrigin(0.5);
    let fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '42px', fill: '#ffffff', align: 'center', lineSpacing: 20 };
    this.scoreTxt = this.add.text(scoreBase.x + 15, scoreBase.y, Constant.gameScore, fontTextStyle).setOrigin(0.5);
    this.scoreTxt.setStroke('#ca7d5c', 6);
    const timeBase = this.add.image(header.x + 180, header.y - 25, 'time_base').setOrigin(0.5);
    fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '42px', fill: '#ffffff', align: 'center', lineSpacing: 20 };
    this.timerTxt = this.add.text(timeBase.x + 30, timeBase.y, '', fontTextStyle).setOrigin(0.5);
    this.timerTxt.setStroke('#ca7d5c', 6);
    this.backBtn = this.add.image(scoreBase.x - 260, scoreBase.y, 'ui', 'back_button').setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.sndBtn = this.add.image(timeBase.x + 260, timeBase.y, 'ui', 'sound').setOrigin(0.5).setInteractive({ useHandCursor: true });
    fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '42px', fill: '#e5438a', align: 'center', lineSpacing: 20 };
    let txt = `LEVEL ${Constant.setLevel}`;
    this.lvlTxt = this.add.text(levelBase.x, levelBase.y - 4, txt, fontTextStyle).setOrigin(0.5);

    this.backBtn.on('pointerdown', this.OnClickingBackButton, this);
    this.sndBtn.on('pointerdown', this.OnClickingSoundButton, this);

    this.topPanelContainer.add([header, levelBase, scoreBase, this.scoreTxt, timeBase, this.timerTxt, this.backBtn, this.sndBtn, this.lvlTxt]);

    //Bottom Panel
    this.bottomPanelContainer = this.add.container();

    this.undoBtn = this.add.image(-65, 0, 'undo').setAlpha(0.5).setOrigin(0.5);
    this.undoBtn.name = 'undo_button';
    fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '42px', fill: '#ffffff', align: 'center', lineSpacing: 20 };
    txt = `${Constant.currUndoCount} / 5`;
    this.undoCountTxt = this.add.text(this.undoBtn.x + 50, this.undoBtn.y - 5, txt, fontTextStyle).setOrigin(0.5).setAlpha(0.5);//.setVisible(true);
    this.undoCountTxt.setStroke('#3c9511', 6);
    // this.scoreCake = this.add.image(this.undoBtn.x + 15, this.undoBtn.y - 5, 'game_obj', 'cake').setScale(0.4).setOrigin(0.5);//.setVisible(false);
    this.adBtnForUndo = this.add.image(this.undoCountTxt.x, this.undoCountTxt.y, 'ad_icon').setOrigin(0.5).setVisible(false);

    if (Constant.currUndoCount !== -10) this.adBtnForUndo.setVisible(false);
    else {
      this.ChangeUndoBtn();
    }
    this.reload = this.add.image(this.undoBtn.x + (this.undoBtn.width / 2) + 85, this.undoBtn.y, 'reload').setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.adBtn = this.add.image(this.reload.x + (this.reload.width / 1.7), this.reload.y - (this.reload.height / 6), 'ad_icon').setOrigin(0.5).setScale(0.9);

    this.undoBtn.on('pointerdown', this.OnClickingUndo, this);
    this.reload.on('pointerdown', this.OnClickingReload, this);

    this.bottomPanelContainer.add([this.undoBtn, this.undoCountTxt, this.adBtnForUndo, this.reload, this.adBtn]);

  }

  CreateTimer() {
    this.TimedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.UpdateTime,
      callbackScope: this,
      loop: true,
      pause: true,
    });
  }

  UpdateTime() {
    if (Constant.timeToEnd > 0) {
      Constant.timeToEnd--;
      this.DisplayTimeFormat(Constant.timeToEnd);
      if (Constant.timeToEnd === 0) {
        this.TimedEvent.remove();
        this.events.off('first_selected');
        this.events.off('same_selected');
        this.events.off('target_selected');
        this.events.off('move_complete');
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        PlayzhubEventHandler.UpdateGameLevel(finalTime / 1000, Constant.setLevel, 'incomplete');
        PlayzhubEventHandler.GameStateUpdate({
          'level': Constant.setLevel,
          'undo': Constant.currUndoCount,
          'score': Constant.gameScore
        });
        AudioManager.StopLevelMusic();
        AudioManager.PlayLvlFailAudio();
        this.ShowAd();
        this.levelPopup.ShowLvlFailPopup();
      }
    }
  }

  DisplayTimeFormat(_time) {
    let minutes = parseInt(_time / 60, 10);
    let seconds = parseInt(_time % 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    this.timerTxt.setText(`${minutes} : ${seconds}`);
  }

  OnClickingBackButton() {
    GA.GameAnalytics.addDesignEvent('ui: back_clicked');
    AudioManager.PlayButtonPressAudio();
    this.TimedEvent.paused = true;
    // this.bBtnTween = new ButtonTween(this, this.backBtn);
    // this.bBtnTween.btnTween.on('complete', () => {
    this.ShowAd();
    this.quitPopup.ShowQuitPopup();
    // });
  }

  OnClickingSoundButton() {
    GA.GameAnalytics.addDesignEvent('ui: sound_clicked');
    AudioManager.PlayButtonPressAudio();
    this.sBtnTween = new ButtonTween(this, this.sndBtn);

    if (this.sndBtn.frame.name === 'sound') {
      localStorage.setItem('cake_sort', 0);
      this.sndBtn.setTexture('ui', 'sound_off');
      AudioManager.PauseGameMusic();
    }
    else {
      localStorage.setItem('cake_sort', 1);
      this.sndBtn.setTexture('ui', 'sound');
      AudioManager.ResumeGameMusic();
    }
  }

  OnClickingUndo() {
    GA.GameAnalytics.addDesignEvent('ui: undo_clicked');
    this.adHitFrom = 'undo';
    AudioManager.PlayButtonPressAudio();
    Constant.movesCount += 1;
    console.log('this.undoBtn: ', this.undoBtn);

    // this.btnTween = new ButtonTween(this, this.undoBtn, this.undoCountTxt, this.scoreCake);
    this.btnTween = new ButtonTween(this, this.undoBtn, this.undoCountTxt, this.adBtnForUndo, 0.85, 0.85, 150, 1, false);
    this.btnTween.btnTween.on('complete', () => {
      this.RemoveInteractiveFromUndo();

      if (this.undoBtn.name === 'undo_button') {
      } else {
        this.ShowAd();
      }
      this.HandleUndoMove();

      if (Constant.currUndoCount > 0 && Constant.currUndoCount !== 1) {
        Constant.currUndoCount--;
        this.undoCountTxt.setText(`${Constant.currUndoCount} / 5`);
      }
      else {
        this.ChangeUndoBtn();
        // if (Constant.gameScore > 10) {
        //   Constant.gameScore -= 10;
        //   this.scoreTxt.setText(Constant.gameScore);
        // }
      }

    });
  }

  HandleUndoMove() {
    if (Constant.movesCount <= 5) {
      this.UndoLastMove();
    }
    else {
      this.contMoveHistArray = [];
      this.iconMoveHistArray = [];
    }
  };

  ChangeUndoBtn() {
    this.undoBtn.name = 'ad_button';
    Constant.currUndoCount = -10;
    this.adBtnForUndo.setVisible(true);
    // if (this.undoCountTxt.style.fontSize !== '32px') {
    // this.undoCountTxt.x += 32;
    // this.undoCountTxt.setStyle({ fontSize: '32px' });
    // }
    this.undoCountTxt.setText(Constant.currUndoCount);
    this.undoCountTxt.setVisible(false);
  }

  UndoLastMove() {
    if (this.contMoveHistArray.length < 1) return;
    const targetContainer = this.contMoveHistArray[this.contMoveHistArray.length - 1][0];
    const targetElemArr = this.iconMoveHistArray[this.iconMoveHistArray.length - 1].reverse();

    for (let i = 0; i < targetElemArr.length; i++) {
      const element = targetElemArr[i];

      const path = [...element.path[element.path.length - 1]].reverse();
      if (element.breakPosX[element.breakPosX.length - 1] !== null) {
        path.push({ x: element.breakPosX[element.breakPosX.length - 1], y: element.breakPosY[element.breakPosY.length - 1] });
      }
      const lastX = element.lastPosX[element.lastPosX.length - 1];
      const lastY = element.lastPosY[element.lastPosY.length - 1];
      path.push({ x: lastX, y: lastY });

      gsap.to(element, {
        duration: 0.3,
        motionPath: { path: path, type: 'linear' },
        ease: 'power1.inOut',
        onUpdate: function () {
          if (this.progress() >= 0.4) {
            targetContainer.add(element);
            this.vars.onUpdate = null;
          }
        },
        onComplete: () => {
          element.data.list.posX = lastX - 12.5;
          element.data.list.posY = lastY;
          element.lastPosX.pop();
          element.lastPosY.pop();
          element.breakPosX.pop();
          element.breakPosY.pop();
          element.path.pop();
          this.contMoveHistArray[this.contMoveHistArray.length - 1][0].data.list.iconNum = this.contMoveHistArray[this.contMoveHistArray.length - 1][0].list.length - 1;
          this.contMoveHistArray[this.contMoveHistArray.length - 1][1].data.list.iconNum = this.contMoveHistArray[this.contMoveHistArray.length - 1][1].list.length - 1;
          if (i === targetElemArr.length - 1) {
            this.contMoveHistArray.pop();
            this.iconMoveHistArray.pop();

            if (this.contMoveHistArray.length === 0) {
              this.RemoveInteractiveFromUndo();
            }
            else {
              if (Constant.gameScore > 0 || Constant.currUndoCount > 0) {
                if (this.contMoveHistArray.length > 0 && Constant.movesCount < 5) {
                  this.MakeUndoInteractive();
                }
              }
              else { }
            }
          }
        }
      });
    }
  }

  OnClickingReload() {
    GA.GameAnalytics.addDesignEvent('ui: reload_clicked');
    this.adHitFrom = 'reload';
    AudioManager.PlayButtonPressAudio();
    this.btnTween = new ButtonTween(this, this.reload, null, this.adBtn, 0.85, 0.85, 150, 1, true);
    this.btnTween.btnTween.on('complete', () => {

      Constant.showTutPages = false;
      this.isReplay = false;
      this.events.off('first_selected');
      this.events.off('same_selected');
      this.events.off('target_selected');
      this.events.off('move_complete');
      this.input.enabled = false;

      this.ShowAd();
      this.scene.restart({ 'isReplay': this.isReplay });
    });
  }

  CreateGameContainer() {
    this.gameContainer = this.add.container();
  }

  AddConfetti() {
    this.confettiContainer = this.add.container();
    this.emitter = this.add.particles(0, 0, 'confetti', {
      frame: ['circle_1', 'circle_2', 'circle_3', 'star_1', 'star_2', 'star_3', 'star_4', 'star_5', 'star_6', 'star_7', 'star_8', 'star_9', 'star_10'],
      lifespan: 1400, // Keeps full motion from rise to fall
      speed: { min: 620, max: 1000 },
      angle: { min: -100, max: -80 }, // Spreads confetti a bit more
      gravityY: 1400, // Slightly reduced fall speed
      accelerationY: -150, // Initial push before gravity takes over
      scale: { start: 0.8, end: 0 },
      rotate: { min: -180, max: 180 },
      frequency: -1,
      emitting: false
    });
    this.confettiContainer.add(this.emitter);
  }

  CreateBlockContainers() {
    this.getLevel = Constant.setLevel;
    // console.log('getLevel', Constant.setLevel);

    this.gameData = this.cache.json.get('levels');

    this.containerNum = this.gameData[this.getLevel].num;
    if (this.containerNum === 11) Constant.gameContScaleFactor = 0.85;
    else Constant.gameContScaleFactor = 1;
    this.iconType = this.gameData[this.getLevel].iconTypes;
    this.firstRow = this.gameData[this.getLevel].firstRow;

    for (let i = 0; i < this.containerNum; i++) {
      this.jsonData = this.gameData[this.getLevel].containers[i];
      this.holders = this.jsonData.divisions;
      this.holdersArr.push(this.holders);
      this.maxHolders = this.jsonData.maxdivisions;
      this.iconData = this.gameData[this.getLevel].iconBlocks.patterns[i];
      this.flipIconData = this.gameData[this.getLevel].iconBlocks.secpatterns[i] ?? null;
      if (i < this.firstRow) {
        this.iconPosY = this.gameData[this.getLevel].iconBlocks.posY[0];
      }
      else {
        this.iconPosY = this.gameData[this.getLevel].iconBlocks.posY[1];
        // console.log('else this.iconPosY', this.gameData[this.getLevel].iconBlocks.posY[1]);
      };

      this.blockContainer = new BlockContainer(this, this.jsonData.x, this.jsonData.y, i, this.holders, this.maxHolders, this.iconData, this.flipIconData, this.iconPosY);

      this.gameContainer.add(this.blockContainer.blockContainer);
    }

    Constant.timeToEnd = 0;
    const sum = this.holdersArr.reduce((acc, num) => acc + num, 0);
    Constant.timeToEnd = this.startTime = sum * 4;
    this.holdersArr = [];
  }

  AnimateIconMovement(_matchedElements, _fContainer) {
    this.animState = 'playing';
    this.fContainer = _fContainer;

    AudioManager.PlayCakeSelectedAudio();
    this.gameContainer.list.forEach(element => {
      if (element.list[0].name !== 'completed') element.list[0].removeInteractive();
    });
    this.RemoveInteractiveFromUndo();

    if (parseInt(this.fContainer.name) < this.firstRow) this.fRowNum = 1;
    else this.fRowNum = 2;

    if (_matchedElements.length > 0) {
      // console.log('Matching elements:', _matchedElements);
    } else {
      // console.log('No matching elements found.');
    }
    this.stopAnimations();
    this.tweensArr = [];
    this.floatTimeline = gsap.timeline();
    this.swingTimeline = gsap.timeline();
    const movementTweens = [];
    _matchedElements.forEach((element, i) => {
      // Calculate target Y position **(No Storing Reset Position)**
      const targetY = this.fContainer.list[0].y -
        (this.fContainer.list[0].height / 1.5) +
        (i * (_matchedElements[i].height / 2.4));
      element.bfrSwingPosX = element.x;
      element.bfrSwingPosY = targetY;
      // console.log('targetY first', this.fContainer, targetY);
      movementTweens.push(new Promise(resolve => {
        gsap.to(element, {
          duration: 0.15,
          y: targetY, // Move UP to position
          ease: 'power1.out',
          onComplete: resolve // Mark this tween as completed
        });
      }));
    });
    Promise.all(movementTweens).then(() => {
      const checkExistence = setInterval(() => {
        if (this.floatCounter === _matchedElements.length) {
          this.floatCounter = null;
          this.animState = null;
          this.isProcessing = false;
          this.gameContainer.list.forEach(element => {
            if (element.list[0].name !== 'completed') element.list[0].setInteractive({ useHandCursor: true });
          });
          clearInterval(checkExistence); // Stop checking after the first success
        }
      }, 100); // Check every 100ms

      this.selectedBlockIconsArray = _matchedElements;

      _matchedElements.forEach((element, index) => {
        // Floating effect
        this.floatCounter++;
        const floatAnim = gsap.to(element, {
          duration: gsap.utils.random(0.8, 1.4),
          y: `+=${index % 2 === 0 ? 4 : -4}`,
          x: `+=${index % 2 === 0 ? 2 : -2}`,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1 // ✅ Infinite animation
        });

        // Pendulum swing effect
        const swingAnim = gsap.to(element, {
          duration: gsap.utils.random(0.7, 0.9),
          rotation: index % 2 === 0 ? '+=0.15' : '-=0.15',
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1 // ✅ Infinite animation
        });
        this.tweensArr.push({ element, floatAnim, swingAnim });
      });
    });
  }

  stopAnimations() {
    if (this.tweensArr && this.tweensArr.length > 0) {
      this.tweensArr.forEach(({ element, floatAnim, swingAnim }) => {
        floatAnim.kill();
        swingAnim.kill();

        gsap.to(element, {
          rotation: 0,
          duration: 0.05, // Smooth return to original angle
          ease: 'power2.out',
          onComplete: () => {
            element.setPosition(element.bfrSwingPosX, element.bfrSwingPosY);
            queueMicrotask(() => {
              if (typeof callback === 'function') {
                callback();
              }
            });
          }
        });
      });
      this.tweensArr = [];
    }
  }

  AnimateIconMovementOnSameSelection(_bool = null) {
    this.stopAnimations();
    const sameSelectedBool = _bool;
    this.animState = 'playing';
    for (let i = this.selectedBlockIconsArray.length - 1; i >= 0; i--) {
      const targetY = this.selectedBlockIconsArray[i].data.list.posY;
      gsap.to(this.selectedBlockIconsArray[i], {
        duration: 0.4, //+ (0.1 * (_matchedElements.length - 1 - i)), // Slight delay for sequential animation
        y: targetY, // Move to calculated position
        ease: 'back.in', // Smooth easing
        onComplete: () => {
          AudioManager.PlayCakePalacedAudio();
          if (sameSelectedBool !== true) {
            this.selectedBlockIconsArray[i].lastPosX.pop();
            this.selectedBlockIconsArray[i].lastPosY.pop();
          }
          if (i === 0) {
            this.selectedBlockIconsArray = null;
            this.animState = null;
            this.containerTypeArray = [];
            this.isProcessing = false;
            setTimeout(() => {
              this.gameContainer.list.forEach(element => {
                if (element.list[0].name !== 'completed') element.list[0].setInteractive({ useHandCursor: true });
              });
            }, 50);
            if (this.contMoveHistArray.length > 0) {
              this.MakeUndoInteractive();
            }
          }
        }
      });
    }
  }

  CheckIconMovementToTarget(_container) {
    this.gameContainer.list.forEach(element => {
      if (element.list[0].name !== 'completed') element.list[0].removeInteractive();
    });

    this.animState = 'playing';
    this.stopAnimations();
    this.selectedBlockIconsArray.forEach(element => {
      element.lastPosX.push(element.data.list.posX + 12.5);
      element.lastPosY.push(element.data.list.posY);
    });


    if (this.selectedBlockIconsArray[0]?.name !== _container.list[_container.list.length - 1].name && _container.list.length > 1) {
      this.isProcessing = false;
      const checkExistence = setInterval(() => {
        if (this.isProcessing) return;
        this.isProcessing = true;
        this.events.emit('same_selected');
        clearInterval(checkExistence); // Stop checking after the first success

      }, 100);
    }
    else {
      this.getNextIconIndex = this.selectedBlockIconsArray.length + 1;
      // if (this.fContainer.list[this.fContainer.list.length - this.getNextIconIndex].flipKey) this.RevealNextIcon(this.fContainer.list, _container);
      this.AnimateIconMovementToTarget(_container);
    }
  }

  RevealNextIcon(_fContainerArray) {
    let startNum = null;
    const fContainerArray = _fContainerArray;
    if (fContainerArray.length > this.getNextIconIndex) startNum = fContainerArray.length - this.getNextIconIndex;
    else startNum = 1;

    if (fContainerArray[startNum].flipKey === fContainerArray[startNum - 1].flipKey) {

      fContainerArray[startNum].setTexture('game_obj', fContainerArray[startNum].flipKey).setName(fContainerArray[startNum].flipKey);

      fContainerArray[startNum - 1].setTexture('game_obj', fContainerArray[startNum].flipKey).setName(fContainerArray[startNum].flipKey);
      fContainerArray[startNum].flipKey = fContainerArray[startNum - 1].flipKey = null;
    }
    else {
      fContainerArray[startNum].setTexture('game_obj', fContainerArray[startNum].flipKey);
      fContainerArray[startNum].setName(fContainerArray[startNum].flipKey);
      fContainerArray[startNum].flipKey = null;
    }
  }

  AnimateIconMovementToTarget(_container) {
    this.sContainer = _container;

    if (_container.list.length === 1 || this.selectedBlockIconsArray[0].name === _container.list[_container.list.length - 1].name) {
      const remSpace = (_container.data.list.maxIcon - _container.data.list.iconNum);
      if (remSpace === 0) {
        this.isProcessing = false;
        const checkExistence = setInterval(() => {

          if (this.isProcessing) return;
          this.isProcessing = true;
          this.events.emit('same_selected');
          clearInterval(checkExistence); // Stop checking after the first success

        }, 100);
      }
      else if (remSpace > 0) {
        // console.log('space', remSpace);
        if (this.fContainer.list[this.fContainer.list.length - this.getNextIconIndex].flipKey) {
          this.RevealNextIcon(this.fContainer.list);
        }
        let contArray = [this.fContainer, _container];
        if (this.contMoveHistArray.length <= 5) {
          this.contMoveHistArray.push(contArray);
        }
        else {
          this.contMoveHistArray.shift();
          this.contMoveHistArray.push(contArray);
        }
        contArray = [];
        if (parseInt(_container.name) < this.firstRow) this.baseY = this.gameData[this.getLevel].iconBlocks.posY[0];
        else this.baseY = this.gameData[this.getLevel].iconBlocks.posY[1];
        this.iterations = Math.min(remSpace, this.selectedBlockIconsArray.length);
        this.lastIconPosY = _container.list?.[_container.list.length - 1]?.data?.list?.posY ?? (this.baseY + this.iconWidth);
        if (parseInt(_container.name) < this.firstRow) this.sRowNum = 1;
        else this.sRowNum = 2;
        this.Animation(_container);
      }
    }
  }

  Animation(_container) {
    if (this.sRowNum < this.fRowNum) {
      this.normalAnimCal = false;
    }
    else this.normalAnimCal = true;
    const timeline = gsap.timeline();

    for (let i = 1; i < this.iterations; i++) {
      gsap.to(this.selectedBlockIconsArray[i], {
        duration: 0.25, // Short duration for quicker motion
        x: this.selectedBlockIconsArray[0].x,
        y: this.selectedBlockIconsArray[0].y,
        ease: 'power1.out',
      });
    }

    if (!this.normalAnimCal) {
      this.AnimateToUpperRow(timeline, _container);
    }
    else this.UsualAnimation(timeline, _container);
  }

  AnimateToUpperRow(timeline, _container) {
    this.fContainerNum = parseInt(this.fContainer.name);
    this.fTargetObj = this.gameContainer.list[this.fContainerNum - this.firstRow].list[0];

    this.rIconHeight = (this.fTargetObj.height / 2) + (this.selectedBlockIconsArray[0].height);
    timeline.add(() => {
      for (let i = 0; i < this.iterations; i++) {
        const element = this.selectedBlockIconsArray[i]; // Store reference
        gsap.to(element, {
          delay: i * 0.05,
          duration: 0.3, // Short duration for quicker motion
          y: this.fTargetObj.y - this.rIconHeight,
          ease: 'power1.out',
          onComplete: () => {
            if (!this.selectedBlockIconsArray.includes(element)) return; // Prevent accessing undefined
            if (element.breakPosX.length <= 5 && element.breakPosY.length <= 5) {
              element.breakPosX.push(this.fTargetObj.x);
              element.breakPosY.push(this.fTargetObj.y);
            }
            else {
              element.breakPosX.shift();
              element.breakPosY.shift();
              element.breakPosX.push(this.fTargetObj.x);
              element.breakPosY.push(this.fTargetObj.y);
            }
            const movedElement = this.selectedBlockIconsArray.splice(this.selectedBlockIconsArray.indexOf(element), 1)[0]; // Remove the first element
            this.tempArray.push(movedElement); // Add it to tempArray
            _container.add(movedElement);
            if (i === this.iterations - 1) this.AnimateToNewContainer(_container);
          }
        });
      }
    });
  }

  UsualAnimation(timeline, _container) {
    let delayBy = null;
    if (this.selectedBlockIconsArray[0].x > _container.list[0].x) {
      this.rIconWidth = -this.selectedBlockIconsArray[0].width / 2;
    } else {
      this.rIconWidth = this.selectedBlockIconsArray[0].width / 2;
    }

    for (let i = 0; i < this.iterations; i++) {
      if (i > 0) delayBy = 0.02 * i;
      else delayBy = 0;
      const element = this.selectedBlockIconsArray[i]; // Store reference
      if (!element) continue;

      const startX = element.x;
      const startY = element.y - 60;
      const endX = _container.list[0].x + 12.5;
      const endY = this.lastIconPosY - (this.iconWidth * (i + 1));

      const midX = (_container.list[0].x) - this.rIconWidth;
      const midY = Math.min(startY, endY) - 60; // Curve peaks 50px above

      const path = [
        { x: startX, y: startY },   // Start point
        { x: midX, y: midY },       // Highest control point for inverse U shape
        { x: endX, y: endY }        // End point
      ];

      if (!this.selectedBlockIconsArray.includes(element)) return;
      gsap.to(element, {
        delay: delayBy,
        duration: 0.4,
        stagger: 0.1,
        motionPath: {
          path: path,
          type: 'linear', // Smooth curve motion
        },
        ease: 'power1.inOut',
        onUpdate: function () {
          const progress = this.progress();

          if (progress >= 0.4) { // Adjust threshold for earlier appearance
            _container.add(element);
            this.vars.onUpdate = null; // Prevent multiple calls
          }
        },
        onComplete: () => {
          AudioManager.PlayCakePalacedAudio();
          element.data.list.posX = _container.list[0].x;
          element.data.list.posY = this.lastIconPosY - (this.iconWidth * (i + 1));
          const index = this.selectedBlockIconsArray.indexOf(element);
          if (index !== -1) {
            const movedElement = this.selectedBlockIconsArray.splice(index, 1)[0];
            this.tempArray.push(movedElement);
          }
          if (element.path.length <= 5 && element.breakPosX.length <= 5) {
            element.path.push(path);
            element.breakPosX.push(null);
            element.breakPosY.push(null);
          }
          else {
            element.path.shift();
            element.breakPosX.shift();
            element.breakPosY.shift();
            element.path.push(path);
            element.breakPosX.push(null);
            element.breakPosY.push(null);
          }
          this.elemArray.push(element);

          if (i === this.iterations - 1) {
            this.AddIconsinHistoryArr();
            _container.data.list.iconNum = _container.list.length - 1;
            this.fContainer.data.list.iconNum = this.fContainer.list.length - 1;
            this.tempArray = [];
            this.containerTypeArray = [];
            this.elemArray = [];
            this.animationCompCheck = null;
            this.isProcessing = false;
            if (this.selectedBlockIconsArray.length === 0) {
              this.animationCompCheck = true;
            }
            else {
              this.animationCompCheck = false;
            }
            const checkExistence = setInterval(() => {
              if (this.isProcessing) return;
              this.isProcessing = true;
              this.events.emit('move_complete');
              clearInterval(checkExistence); // Stop checking after the first success
            }, 100);

            if (this.selectedBlockIconsArray.length > 0) {
              this.fContainer.data.list.iconNum = this.fContainer.list.length - 1;
              const checkExistence = setInterval(() => {

                if (this.isProcessing) return;
                this.isProcessing = true;
                this.events.emit('same_selected');
                clearInterval(checkExistence); // Stop checking after the first success

              }, 100);
            }
          }
        }
      });
    }
  }

  AnimateToNewContainer(_container) {
    let delayBy = null;
    if (this.tempArray[0].x > _container.list[0].x) {
      this.rIconWidth = -this.tempArray[0].width / 2;
    } else {
      this.rIconWidth = this.tempArray[0].width / 2;
    }

    for (let i = 0; i < this.iterations; i++) {
      if (i > 0) delayBy = 0.02 * i;
      else delayBy = 0;
      const element = this.tempArray[i]; // Store reference
      if (!element) continue;

      const startX = element.x;
      const startY = element.y - 60;
      const endX = _container.list[0].x + 12.5;
      const endY = this.lastIconPosY - (this.iconWidth * (i + 1));

      // Midpoint for the inverted U shape
      const midX = (_container.list[0].x) - this.rIconWidth;
      const midY = Math.min(startY, endY) - 60; // Curve peaks 50px above

      const path = [
        { x: startX, y: startY },   // Start point
        { x: midX, y: midY },       // Highest control point for inverse U shape
        { x: endX, y: endY }        // End point
      ];

      // Prevent accessing undefined elements
      if (!this.tempArray.includes(element)) return;
      gsap.to(element, {
        delay: delayBy,
        duration: 0.4,
        stagger: 0.1,
        motionPath: {
          path: path,
          type: 'linear', // Smooth curve motion
        },
        ease: 'power1.inOut',
        onComplete: () => {
          AudioManager.PlayCakePalacedAudio();
          element.data.list.posX = _container.list[0].x;
          element.data.list.posY = this.lastIconPosY - (this.iconWidth * (i + 1));
          if (element.path.length <= 5) element.path.push(path);
          else {
            element.path.shift();
            element.path.push(path);
          }
          this.elemArray.push(element);

          if (i === this.iterations - 1) {
            this.AddIconsinHistoryArr();
            _container.data.list.iconNum = _container.list.length - 1;
            this.fContainer.data.list.iconNum = this.fContainer.list.length - 1;
            this.tempArray = [];
            this.containerTypeArray = [];
            this.elemArray = [];
            this.animationCompCheck = null;
            this.isProcessing = false;
            if (this.selectedBlockIconsArray.length === 0) {
              this.animationCompCheck = true;
            }
            else {
              this.animationCompCheck = false;
            }
            const checkExistence = setInterval(() => {

              if (this.isProcessing) return;
              this.isProcessing = true;
              this.events.emit('move_complete');
              clearInterval(checkExistence); // Stop checking after the first success

            }, 100);
            if (this.selectedBlockIconsArray.length > 0) {
              this.fContainer.data.list.iconNum = this.fContainer.list.length - 1;
              const checkExistence = setInterval(() => {
                if (this.isProcessing) return;
                this.isProcessing = true;
                this.events.emit('same_selected');
                clearInterval(checkExistence); // Stop checking after the first success

              }, 100); // Check every 100ms
            }
          }
        }
      });
    }
  }

  AddIconsinHistoryArr() {
    if (this.iconMoveHistArray.length <= 5) {
      this.iconMoveHistArray.push(this.elemArray);
    }
    else {
      this.iconMoveHistArray.shift();
      this.iconMoveHistArray.push(this.elemArray);
    }
  }

  CheckOnMoveComplete() {
    this.isProcessing = false;
    if (this.animationCompCheck) {
      new Promise(resolve => {
        setTimeout(() => {
          this.gameContainer.list.forEach(element => {
            if (element.list[0].name !== 'completed') {
              element.list[0].setInteractive({ useHandCursor: true });
            }
          });
          resolve(); // Resolve the Promise after the timeout
        }, 10);
      }).then(() => {
        this.animState = null;
        this.ChecksOnMoveComplete();
      });
    }
  }
  ChecksOnMoveComplete() {
    if (this.contMoveHistArray.length > 0) {
      if (Constant.movesCount < 5) {
        if (Constant.currUndoCount > 0) {
          this.MakeUndoInteractive();
        }
        else {
          if (Constant.gameScore > 0) {
            this.MakeUndoInteractive();
          }
          else {
            this.RemoveInteractiveFromUndo();
          }
        }
      }
    }

    this.gameContainer.list.forEach(elementContainer => {
      if (elementContainer.data.list.iconNum === elementContainer.data.list.maxIcon) {
        this.children = elementContainer.list; // Assuming `elementContainer.list` contains the child elements
        let allSameName = true; // Flag to check if all names are the same
        let firstName = null;

        this.children.forEach((element, index) => {
          if (index >= 1) {
            if (firstName === null) {
              firstName = element.name; // Initialize the reference name
            }
            if (element.name !== firstName) {
              allSameName = false; // Set the flag to false if names differ
            }
          }
        });

        if (allSameName && this.children[0].input) {
          this.children[0].removeInteractive();
          this.CleanInstanceArrays();
          this.children[0].setName('completed');
          this.children.forEach(element => {
            element.setTint(0x555555); // Adjust the value (0 to 1) for desired opacity
          });
          this.emitter.setPosition(this.children[0].x + 15, this.children[0].y + 90);
          AudioManager.PlayConfettiAudio();
          setTimeout(() => {
            this.emitter.explode(50);
          }, 100);
          this.RemoveInteractiveFromUndo();
          this.contCompleted += 1;
          Constant.gameScore += 40;
          this.scoreTxt.setText(Constant.gameScore);
        } else { }
      }
    });

    if (this.contCompleted === this.iconType) {
      this.contCompleted = null;
      this.TimedEvent.remove();
      PlayzhubEventHandler.InterimBreak();
      setTimeout(() => {
        this.RemoveInteractiveFromUndo();
        setTimeout(() => {
          AudioManager.PlayLvlCompleteAudio();
          this.levelPopup.ShowLevelUpPopup(Constant.setLevel);
          const currentTimeStamp = Date.now();
          const finalTime = currentTimeStamp - Constant.gameStartTime;
          PlayzhubEventHandler.UpdateGameLevel(finalTime / 1000, Constant.setLevel, 'complete');
          if (Constant.setLevel <= 100) {
            Constant.setLevel += 1;
          }
          PlayzhubEventHandler.GameStateUpdate({
            'level': Constant.setLevel,
            'undo': Constant.currUndoCount,
            'score': Constant.gameScore
          });
          this.ResetLevel();

          // this.adHitFrom = 'level_complete';
          // setTimeout(() => {
          //   this.IncrementLevelAndShowAd();
          // }, 500);
        }, 400);
      }, 1000);
    }
  }


  CleanInstanceArrays() {
    this.contMoveHistArray = [];
    this.iconMoveHistArray = [];
    this.gameContainer.list.forEach(elementContainer => {
      elementContainer.list.forEach(elem => {
        if (elem.path) {
          elem.breakPosX = [];
          elem.breakPosY = [];
          elem.path = [];
          elem.lastPosX = [];
          elem.lastPosY = [];
        }
      });
    });
  }

  MakeUndoInteractive() {
    this.undoBtn.setAlpha(1);
    this.adBtnForUndo.setAlpha(1);
    this.undoCountTxt.setAlpha(1);
    this.undoBtn.setInteractive({ useHandCursor: true });
  }

  RemoveInteractiveFromUndo() {
    this.undoBtn.setAlpha(0.5);
    this.adBtnForUndo.setAlpha(0.5);
    this.undoCountTxt.setAlpha(0.5);
    this.undoBtn.removeInteractive();
  }

  ResetLevel() {
    this.containerTypeArray = [];
    this.selectedBlockIconsArray = null;
    this.tempArray = [];
    this.contCompleted = null;
    this.jsonData = null;
    this.holders = null;
    this.maxHolders = null;
    this.iconData = null;
    this.blockContainer = null;
    Constant.movesCount = 0;
    this.gameContainer.list.forEach(parentElement => {
      parentElement.list.forEach(childElement => {
        if (childElement.data) {
          childElement.data.remove();
          childElement.data = null; // Clear reference to avoid memory leaks\
          childElement.destroy();
        }
        // Destroy the child element
        else {
          childElement.destroy();
        }
      });
      parentElement.destroy();
    });

    this.gameContainer.list = [];

    setTimeout(() => {
      this.CreateBlockContainers();
      this.ResizeGameContAndConfetti();
      this.lvlTxt.setText(`LEVEL ${Constant.setLevel}`);
      this.scoreTxt.setText(Constant.gameScore);
    }, 100);
  }

  ResizeGameContAndConfetti() {
    this.gameContainer.setScale(Constant.gameContScaleFactor * Constant.newScale);
    this.gameContainer.setPosition(
      (Constant.clientWidth / 2),
      (Constant.clientHeight / 2)
    );

    this.confettiContainer.setScale(Constant.newScale * Constant.gameContScaleFactor);
    this.confettiContainer.setPosition(
      (Constant.clientWidth / 2),
      (Constant.clientHeight / 2)
    );
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
    this.gameplayBg.setPosition(
      _newWidth / 2,
      _newHeight / 2
    );
    this.topPanelContainer.setScale(newScale);

    this.bottomPanelContainer.setScale(newScale);

    this.topPanelContainer?.setPosition(_newWidth / 2, (90 * newScale));
    this.bottomPanelContainer?.setPosition(_newWidth / 2, (_newHeight / 1) - (115 * newScale));

    this.ResizeGameContAndConfetti();

    this.tutorialPopup.ResizeInfoContainers(_newWidth, _newHeight, newScale);
    this.quitPopup.ResizeQuitContainer(_newWidth, _newHeight, newScale);
    this.levelPopup.ResizeLevelPopupContainer(_newWidth, _newHeight, newScale);

    const camera = this.cameras.main;
    camera.x = offsetWidth;
    camera.setViewport(offsetWidth, 0, _newWidth, _newHeight);
  }
  //########################################################################################
}