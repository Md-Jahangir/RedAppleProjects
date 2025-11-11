/* eslint-disable no-unused-vars */
/* global window,setTimeout,sendMessage*/

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 16-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 13-08-2025
 * @Description :- Load all the assests and showing the progress bar.
 ************************************/

import Phaser from 'phaser';
import FontFaceObserver from 'fontfaceobserver';
import { Utils } from '../Utils.js';
import { Constant } from '../Constant.js';
import ButtonTween from '../game-objects/ButtonTween.js';
import { Server } from '../Server.js';
import { AudioManager } from '../media/AudioManager';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler.js';
import * as GA from 'gameanalytics';

export default class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
    this.progressBar = null;
    this.loadingText = null;
    this.orgX = window.innerWidth; //originalX
    this.orgY = window.innerHeight; //originalY
    this.currentAnims = null;
    this.loadSuccess = false;
    this.showRabbitJump = false;
    this.isLoadingComplete = false;

    this.fonts = {
      'Fredoka-Regular': null,
      'Fredoka-Bold': null
    };
  }

  //#region - Load all images
  preload() {
    //SPLASH
    // this.LoadFonts();
    // this.load.image('splash', 'assets/images/bg/splash_bg.jpg');
    // this.load.image('loading_base', 'assets/images/progress_base.png');
    // this.load.image('loading_bar', 'assets/images/progress_bar.png');
    // this.load.image('logo', 'assets/images/icons/title.png');
    // this.load.image('error_logo', 'assets/images/error_logo.png');
    // this.load.image('time_base', 'assets/images/bases/time_base.png');
    // this.load.image('time_bar', 'assets/images/bases/time_bar.png');
    // this.load.image('clock', 'assets/images/clock.png');
    // for (let i = 1; i < 3; i++) {
    //   this.load.image(`buy_btn_${i}`, `assets/images/buttons/buy_btn_${i}.png`);
    // }
  };
  //#endregion

  //#region - Create all images
  create() {
    // this.LoadFonts();
    Constant.currentScene = 'PreloadScene';
    this.game.events.on('resize', this.resize, this);
    this.loadArray = [];
    const getgameBg = document.getElementById('splash');
    // const errorLogo = document.getElementById("error_logo");
    const getLogo = document.getElementById('logo');
    const getProgressbase = document.getElementById('progress_base');
    const getProgressBar = document.getElementById('progress_bar');
    const getBuyBtnOne = document.getElementById('buy_btn_1');
    const getBuyBtnTwo = document.getElementById('buy_btn_2');
    this.loadArray.push(getgameBg, getLogo, getProgressbase, getProgressBar, getBuyBtnOne, getBuyBtnTwo);
    for (let index = 0; index < this.loadArray.length; index++) {
      const element = this.loadArray[index];

      if (element.complete) {
        this.loadHTMLImage(element);
      } else {
        element.onload = () => this.loadHTMLImage(element);
      }
    }

    const loadingTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '45px', fill: '#FFF', fontStyle: 'bold', align: 'center', bold: true };
    this.loadingText = this.add.text(0, 0, 'Loading...', loadingTextStyle).setOrigin(0.5).setVisible(true);
    this.loadingText.setStroke('#3c4272', 6);

    this.LoadFonts();
    this.SetClientSize();


  };
  //#endregion


  SetClientSize() {
    let clientHeight, clientWidth, widthOffset;
    if (window.innerWidth > window.innerHeight) {
      clientHeight = window.innerHeight;
      Constant.clientHeight = clientHeight;
      clientWidth = (clientHeight / 1.77777777778);
      Constant.clientWidth = clientWidth;
      widthOffset = (window.innerWidth / 2) - (clientWidth / 2);
      // this.resize(clientWidth, clientHeight, widthOffset);
    }
    else {
      clientWidth = window.innerWidth;
      Constant.clientWidth = clientWidth;

      clientHeight = window.innerHeight;
      Constant.clientHeight = clientHeight;

      widthOffset = 0;

    }
    this.resize(clientWidth, clientHeight, widthOffset);
  }

  loadHTMLImage(element) {
    let clientHeight, clientWidth;
    if (window.innerWidth > window.innerHeight) {
      clientHeight = window.innerHeight;
      clientWidth = (clientHeight / 1.77777777778);
    }
    else {
      clientWidth = window.innerWidth;
      Constant.clientWidth = clientWidth;

      clientHeight = window.innerHeight;
      Constant.clientHeight = clientHeight;
    }
    const newScale = Utils.GetScale(1080, 1920, clientWidth, clientHeight);
    if (element.id) {
      const textureKey = element.id;

      // Add the HTML image as a texture in Phaser
      if (!this.textures.exists(textureKey)) {
        this.textures.addImage(textureKey, element);
      }
      if (textureKey === 'splash') {
        this.splashBG = this.add.image(0, 0, 'splash').setOrigin(0);
        this.ResizeBg(clientWidth, clientHeight);
      }
      else if (textureKey === 'logo') {
        this.gameLogo = this.add.image(0, 0, 'logo');
        this.ResizeGameLogo(clientWidth, clientHeight, newScale);
      }
      // else if (textureKey === "error_logo") {
      //   this.errorLogo = this.add.image(0, 0, 'error_logo').setOrigin(0);
      //   this.ResizeErrorLogo(clientWidth, clientHeight, newScale);
      // }
      else if (textureKey === 'progress_base') {
        this.progressBase = this.add.image(0, 0, 'progress_base').setOrigin(0.5);
        this.ResizeProgressBase(clientWidth, clientHeight, newScale);
      }
      else if (textureKey === 'progress_bar') {
        this.progressBar = this.add.image(0, 0, 'progress_bar').setOrigin(0.5);
        this.progressBar.setCrop(0, 0, this.progressBar.height);
        this.ResizeProgressBar(clientWidth, clientHeight, newScale);
      }
      // else if (textureKey === "buy_btn_1") {
      //   this.playBtn = this.add.image(0, 0, 'buy_btn_2').setOrigin(0.5);
      //   this.ResizePlayBtn(clientWidth, clientHeight, newScale);
      // }
    } else {
      console.warn('Element does not have an ID:', element);
    }
  }

  ShowTimeProgress() {
    this.tweens.add({
      targets: this.timeBar,
      width: 46,
      duration: Constant.timeToEnd * 1000,
      ease: 'linear',
      yoyo: false,
      repeat: 0,
      onUpdate: () => {
        Constant.timeBarWidth = this.timeBar.width;
      }
    });
  }

  async ControlAnimation() {
    if (this.currentAnims === 'Idle_Breathing') {
      this.anim.play('Idle_activity', false);
      this.currentAnims = 'Idle_activity';
    }
    else {
      this.anim.play('Idle_Breathing', false);
      this.currentAnims = 'Idle_Breathing';

    }
    await this.anim.on('complete', () => {
      this.ControlAnimation();
    });
  }

  LoadFonts() {

    const propNames = Object.getOwnPropertyNames(this.fonts);
    propNames.forEach((fontName, index) => {
      const isLast = index >= propNames.length - 1;
      this.fonts[fontName] = new FontFaceObserver(fontName);
      this.fonts[fontName].load().then(this.FontLoadSuccess.bind(this, fontName, isLast), this.FontLoadError.bind(this, fontName));
    });
  };

  //#region - Load font success
  FontLoadSuccess(_fontName, _isLast) {
    if (_isLast) {
      // if (Server.IsParamsMissing()) {
      //   if (Client.IsParamsMissing()) {
      //     this.scene.start("GameErrorScene");
      //     // } else {

      this.loadSuccess = true;
      this.LoadAssests();
      //     // }
    }
  };
  //#endregion

  //#region - Load Font Error
  FontLoadError() { };

  //#region - Load all assests
  LoadAssests() {
    PlayzhubEventHandler.GameLoadingStarted();
    this.load.on('progress', this.LoadProgress, this);
    this.load.on('complete', this.OnComplete, this);

    //Loading Spines
    this.load.setPath('assets/spines/');
    this.load.spine('rabbit', 'Rabit.json', 'Rabit.atlas');
    this.load.spine('rabbit_exp', 'rabbit_expression.json', 'rabbit_expression.atlas');
    this.load.spine('lvlup', 'level_up.json', 'level_up.atlas');
    this.load.spine('perfect', 'perfect.json', 'perfect.atlas');
    this.load.setPath('');
    this.load.image('gBG', 'assets/images/bg/BG.png');
    this.load.image('bBG', 'assets/images/bg/board.png');
    for (let i = 1; i < 3; i++) {
      this.load.image(`info_board_${i}`, `assets/images/bg/info_board_${i}.png`);
      this.load.image(`page_mark_${i}`, `assets/images/page_mark_${i}.png`);
    }
    for (let i = 0; i < 10; i++) {
      this.load.image(`color_box_${i}`, `assets/images/bases/color_box_${i}.png`);
    }

    this.load.image('ad_icon', 'assets/images/ad_icon.png');
    this.load.image('info_words', 'assets/images/info_words.png');
    this.load.image('info_hint', 'assets/images/info_hint.png');
    this.load.image('hBase', 'assets/images/bases/hint_count.png');
    this.load.image('lBase', 'assets/images/bases/letter_base.png');
    this.load.image('wLBase', 'assets/images/bases/word_suggestion_base.png');
    this.load.image('point_base', 'assets/images/bases/point_base.png');
    this.load.image('overlay', 'assets/images/bg/overlay.png');
    this.load.image('info_overlay', 'assets/images/bg/info_overlay.png');
    this.load.image('g_overlay', 'assets/images/bg/gameplay_overlay.png');
    this.load.json('words', 'assets/json/words.json');
    this.load.image('glow_hint', 'assets/images/glow_hint.png');
    this.load.image('arrow', 'assets/images/arrow.png');
    this.load.image('gameover_base', 'assets/images/bases/game_over.png');
    this.load.image('quit_base', 'assets/images/bases/quit.png');
    this.load.image('coin', 'assets/images/coin.png');
    this.load.image('levelup_base', 'assets/images/bases/level_up.png');
    this.load.image('alert_signal', 'assets/images/alert_signal.png');
    this.load.image('text_box', 'assets/images/bases/text_box.png');
    this.load.atlas('tut_tiles', 'assets/images/tutorial_tiles.png', 'assets/images/tutorial_tiles.json');
    this.load.image('palm', 'assets/images/palm.png');
    this.load.image('cross', 'assets/images/cross.png');

    //button assets
    this.load.image('back_btn', 'assets/images/buttons/back_button.png');
    this.load.spritesheet('sound_btn', 'assets/images/buttons/sound_onoff.png', { frameWidth: 202 / 2, frameHeight: 101 });
    this.load.image('hint_btn', 'assets/images/buttons/hint.png');

    //Loading Audio
    this.load.audio('button_click', 'assets/audio/ui_buttons.wav');
    this.load.audio('gameover_popup', 'assets/audio/gameover.mp3');
    this.load.audio('matched', 'assets/audio/matched.mp3');
    this.load.audio('bg_audio', 'assets/audio/bg_audio.mp3');
    this.load.audio('gameplay_bg', 'assets/audio/gameplay_bg.mp3');
    this.load.audio('game_btns', 'assets/audio/game_btns.wav');
    this.load.audio('lvl_complete', 'assets/audio/level_completion.mp3');
    this.load.audio('incorrect', 'assets/audio/incorrect.mp3');
    this.load.audio('playbtn_pop', 'assets/audio/playbtn_pop.mp3');
    this.load.audio('sublvl_complete', 'assets/audio/sublvl_complete.mp3');
    this.load.audio('alert_final', 'assets/audio/alert_final.wav');
    this.load.audio('coin_anim', 'assets/audio/coin_anim.mp3');


    this.load.start();
  };
  //#endregion

  //#region - Load progress bar
  LoadProgress(_percentage) {
    if (this.progressBar) this.progressBar.setCrop(0, 0, this.progressBar.width * _percentage, this.progressBar.height);

    _percentage = _percentage * 100;
    this.loadingText.setText('Loading...');
  };
  //#endregion

  //#region - On complete event
  OnComplete() {
    PlayzhubEventHandler.GameLoadingCompleted();
    setTimeout(() => {
      AudioManager.CreateAudio();
      this.scene.stop('PreloadScene');
      this.scene.start('MenuScene');
    }, 1000);
    GA.GameAnalytics.addProgressionEvent(
      'Complete',
      'game_loading'
    );
  };
  //#endregion

  TweenTitleOut() {
    this.tween = this.tweens.add({
      targets: this.gameLogo,

      props: {
        y: {
          value: this.gameLogo.y - (900 * this.newScale),
        }
      },
      ease: 'power1.out',
      duration: 500,
      yoyo: false,
      repeat: 0,
      onComplete: () => {
        // console.log('this', this.cache);
        this.showRabbitJump = true;
        this.gameLogo.destroy();

        // this.PlayRabbitAnimation();
      }
    });
  }

  CreateRabbitAnimation() {
    // console.log('creatae rabbit anim');
    this.anim = this.add.spine(0, 0, 'rabbit').setVisible(true);
    this.anim.play('jump', false);
    this.ResizeAnim();
    this.anim.once('complete', () => {
      this.anim.play('Idle_Breathing', false);
      this.currentAnims = 'Idle_Breathing';
      this.CreatePlayBtn();
      this.playBtnContainer.setVisible(true);
      // this.TweenButtonToScreen(this.playBtnContainer);
      this.ControlAnimation();
    });
  }

  CreatePlayBtn() {

    //PlayButton
    this.playBtnContainer = this.add.container().setDepth(2);
    this.playBtn = this.add.image(0, 0, 'buy_btn_2').setOrigin(0.5).setInteractive({ useHandCursor: true });
    const fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '55px', fill: '#fffffe', align: 'center' };
    const text = 'Play';
    this.pBtnText = this.add.text(this.playBtn.x + 5, this.playBtn.y - 10, text, fontTextStyle).setOrigin(0.5);
    this.pBtnText.setStroke('#557a38', 6);
    this.playBtnContainer.add([this.playBtn, this.pBtnText]);
    this.playBtnContainer.setVisible(false);
    this.ResizePlayBtn();
    this.TweenButtonToScreen(this.playBtnContainer);

    this.playBtn.on('pointerup', this.OnPressingPlayBtn, this);
  }

  ResizeAnim() {
    this.anim.setScale(this.newScale);
    this.anim.setPosition(
      Constant.clientWidth / 2,
      (Constant.clientHeight / 2) + (590 * this.newScale)
    );
  }

  ResizePlayBtn() {
    // console.log('resize play');

    this.playBtnContainer.setScale(this.newScale);
    this.playBtnContainer.setPosition(
      (Constant.clientWidth / 2),
      (Constant.clientHeight / 2) + (1130 * this.newScale)
    );
  }

  CreateTimer() {
    this.ShowTimeProgress();
    this.TimedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.UpdateTime,
      callbackScope: this,
      loop: true
    });
  }

  UpdateTime() {
    if (Constant.timeToEnd > 0) {
      Constant.timeToEnd--;
      this.DisplayTimeFormat(Constant.timeToEnd);
    } else {
      sendMessage(0);
      this.TimedEvent.remove();
    }
  }

  DisplayTimeFormat(_time) {
    let minutes = parseInt(_time / 60, 10);
    let seconds = parseInt(_time % 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    // this.timeTxt.setText(`${minutes} : ${seconds}`);
  }

  // TweenButtonToScreen(_pBtn, _pBtnTxt) {
  TweenButtonToScreen(_playBttnConatainer) {
    // console.log('TweenButtonToScreen',TweenButtonToScreen);

    // console.log('play tween');

    this.playBtn.setVisible(true);
    this.tween = this.tweens.add({
      targets: _playBttnConatainer,

      props: {
        y: {
          value: _playBttnConatainer.y - (420 * this.newScale),
        }
      },
      ease: 'Bounce.easeOut',
      duration: 1500,
      yoyo: false,
      repeat: 0,
    });
  }

  OnPressingPlayBtn() {
    this.btnTween = new ButtonTween(this, this.playBtn, this.pBtnText);
    AudioManager.PlayButtonPressAudio();
    Constant.playClicked += 1;
    Server.PostGameFrequencyToParent(Constant.playClicked);
    this.btnTween.btnTween.on('complete', () => {
      this.scene.stop('PreloadScene');
      this.scene.start('MenuScene');
      this.anim.destroy();
    });
  }

  ResizeBg(newWidth, newHeight) {
    this.splashBG.setDisplaySize(newWidth, newHeight);
  }
  ResizeGameLogo(newWidth, newHeight, newScale) {
    this.gameLogo.setScale(newScale);
    this.gameLogo.setPosition(newWidth / 2, 300 * newScale);
  }
  ResizeProgressBase(newWidth, newHeight, newScale) {
    this.progressBase.setScale(newScale);
    this.progressBase.setPosition(
      newWidth / 2,
      newHeight - (177 * this.newScale)
    );
  }
  ResizeProgressBar(newWidth, newHeight, newScale) {
    this.progressBar.setScale(newScale);
    this.progressBar.setPosition(this.progressBase.x, this.progressBase.y);
  }
  // ResizeErrorLogo(newWidth, newHeight, newScale) {
  //   this.errorLogo.setDisplaySize(newWidth, newHeight);
  // }

  //#region - Resize
  resize(_newWidth, _newHeight, offsetWidth) {
    if (Constant.currentScene !== 'PreloadScene') {
      return;
    }

    this.newScale = Utils.GetScale(1080, 1920, _newWidth, _newHeight);

    if (this.splashBG) {
      this.ResizeBg(_newWidth, _newHeight);
    }
    // if (this.errorLogo) {
    //   this.ResizeErrorLogo(_newWidth, _newHeight, this.newScale);
    // }
    if (this.gameLogo) {
      this.ResizeGameLogo(_newWidth, _newHeight, this.newScale);
    }
    if (this.progressBase) {
      this.ResizeProgressBase(_newWidth, _newHeight, this.newScale);
    }
    if (this.progressBar) {
      this.ResizeProgressBar(_newWidth, _newHeight, this.newScale);
    }

    this.loadingText.setScale(this.newScale);
    this.loadingText.setPosition(
      _newWidth / 2,
      (_newHeight) - (250 * this.newScale)
    );
    if (this.anim) {
      // console.log('spine anim');

      this.anim.setScale(this.newScale);
      this.anim.setPosition(
        _newWidth / 2,
        (_newHeight / 2) + (590 * this.newScale)
      );
    }

    // this.topPanelContainer.setScale(this.newScale);
    // this.topPanelContainer.setPosition(0, 0);
    if (this.playBtnContainer) {
      this.playBtnContainer.setScale(this.newScale);
      this.playBtnContainer.setPosition(
        (_newWidth / 2),
        (_newHeight / 2) + (1130 * this.newScale)
      );
    }

    const camera = this.cameras.main;
    camera.x = offsetWidth;
    // camera.setBounds(0, 0, newWidth, newHeight);
    camera.setViewport(offsetWidth, 0, _newWidth, _newHeight);
    // console.info('offset', offsetWidth);

    // this.ResizeSplashBg(_newWidth, _newHeight, newScale, scaleX, scaleY);
  };
  //#endregion
}