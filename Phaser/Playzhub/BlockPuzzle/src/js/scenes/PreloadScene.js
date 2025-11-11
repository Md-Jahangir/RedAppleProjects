/* eslint-disable no-unused-vars */
/* global window,setTimeout,sendMessage*/

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 16-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 13-08-2025.
 * @Description :- Load all the assests and showing the progress bar.
 ************************************/

import Phaser from 'phaser';
import FontFaceObserver from 'fontfaceobserver';
import { Utils } from '../Utils.js';
// import { SelectedResolution } from '../ResolutionSelector.js';
import { Constant } from '../Constant.js';
import { AudioManager } from '../media/AudioManager';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler.js';
// import MuteConsole from '../MuteConsole.js';
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
    this.fonts = {
      'Anja Eliane': null,
      'Happy School': null,
    };
  }

  //#region - Load all images
  preload() { };
  //#endregion

  //#region - Create all images
  create() {
    Constant.currentScene = 'PreloadScene';
    this.game.events.on('resize', this.resize, this);

    this.loadArray = [];
    const getgameBg = document.getElementById('splash');
    const getLogo = document.getElementById('logo');
    const getProgressbase = document.getElementById('progress_base');
    const getProgressBar = document.getElementById('progress_bar');
    this.loadArray.push(getgameBg, getLogo, getProgressbase, getProgressBar);
    for (let index = 0; index < this.loadArray.length; index++) {
      const element = this.loadArray[index];

      if (element.complete) {
        this.loadHTMLImage(element);
      } else {
        element.onload = () => this.loadHTMLImage(element);
      }
    }

    const loadingTextStyle = { fontFamily: 'Anja Eliane', fontSize: '45px', fill: '#FFF', fontStyle: 'bold', align: 'center', bold: true };
    this.loadingText = this.add.text(0, 0, 'Loading...', loadingTextStyle).setOrigin(0.5);//.setVisible(false);
    this.loadingText.setStroke('#3c4272', 6);
    this.LoadFonts();
    this.SetClientSize();

    GA.GameAnalytics.addProgressionEvent(
      'Start',
      'game_loading'
    );
  }
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
      else if (textureKey === 'progress_base') {
        this.progressBase = this.add.image(0, 0, 'progress_base').setOrigin(0.5);
        this.ResizeProgressBase(clientWidth, clientHeight, newScale);
      }
      else if (textureKey === 'progress_bar') {
        this.progressBar = this.add.image(0, 0, 'progress_bar').setOrigin(0.5);
        this.progressBar.setCrop(0, 0, this.progressBar.height);
        this.ResizeProgressBar(clientWidth, clientHeight, newScale);
      }
    } else {
      // console.warn('Element does not have an ID:', element);
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
    this.load.on('complete', this.OnComplete, { scene: this.scene, scope: this });

    this.load.image('gameBG', 'assets/images/bg/game_bg.png');
    this.load.image('tBG', 'assets/images/bg/title_bg.png');
    this.load.image('top_mask', 'assets/images/top_mask.png');
    this.load.image('bottom_mask', 'assets/images/bottom_mask.png');
    this.load.atlas('ui', 'assets/images/ui.png', 'assets/images/ui.json');
    this.load.atlas('game_obj', 'assets/images/game_obj.png', 'assets/images/game_obj.json');
    this.load.atlas('confetti', 'assets/images/confetti.png', 'assets/images/confetti.json');
    this.load.json('levels', 'assets/json/levels.json');
    this.load.image('time_base', 'assets/images/bases/time_base.png');
    this.load.image('score_base', 'assets/images/bases/score_base.png');
    this.load.image('header', 'assets/images/bases/header.png');
    this.load.image('level_base', 'assets/images/bases/level_base.png');
    // this.load.image('trail', 'assets/images/trail.png');
    for (let i = 1; i <= 4; i++) this.load.image(`info_${i}`, `assets/images/bg/infobg_${i}.png`);
    this.load.image('quit_base', 'assets/images/bases/quit_base.png');
    this.load.image('overlay', 'assets/images/overlay.png');
    this.load.image('btn_base', 'assets/images/bases/btn_base.png');
    this.load.image('nxtBtn_base', 'assets/images/bases/next_button_base.png');
    this.load.image('reload', 'assets/images/buttons/reload.png');
    this.load.image('undo', 'assets/images/buttons/undo.png');
    this.load.image('ad_icon', 'assets/images/ad_icon.png');

    //Loading Audio
    this.load.audio('button_click', 'assets/audio/button_click.mp3');
    this.load.audio('level_fail', 'assets/audio/level_fail.mp3');
    this.load.audio('cake_placed', 'assets/audio/cake_placed.mp3');
    this.load.audio('bg_audio', 'assets/audio/game_bg_sound.mp3');
    this.load.audio('cake_selelcted', 'assets/audio/cake_selelcted.mp3');
    this.load.audio('confetti_pop', 'assets/audio/confetti_pop.mp3');
    this.load.audio('level_up', 'assets/audio/level_up.mp3');
    this.load.audio('sparkle', 'assets/audio/sparkling_sound.mp3');

    //Loading Spine
    this.load.spineBinary('level_fail_data', 'assets/spines/level_fail.skel');
    this.load.spineAtlas('level_fail_atlas', 'assets/spines/level_fail.atlas');
    this.load.spineBinary('title_data', 'assets/spines/title_art.skel');
    this.load.spineAtlas('title_atlas', 'assets/spines/title_art.atlas');
    this.load.spineBinary('cake_splash_data', 'assets/spines/cake_splash_art_animation.skel');
    this.load.spineAtlas('cake_splash_atlas', 'assets/spines/cake_splash_art_animation.atlas');
    this.load.spineBinary('leveldone_data', 'assets/spines/popup_animation.skel');
    this.load.spineAtlas('leveldone_atlas', 'assets/spines/popup_animation.atlas');

    this.load.start();
  };
  //#endregion

  //#region - Load progress bar
  LoadProgress(_percentage) {
    this.progressBar.setCrop(0, 0, this.progressBar.width * _percentage, this.progressBar.height);
    _percentage = _percentage * 100;
    this.loadingText.setText('Loading...');
  };
  //#endregion

  //#region - On complete event
  OnComplete() {
    PlayzhubEventHandler.GameLoadingCompleted();
    const scene = this.scope;
    setTimeout(() => {
      AudioManager.CreateAudio();
      if (localStorage.getItem('blockpuzzle_level') === null) {
        localStorage.setItem('blockpuzzle_level', 1);
      }
      scene.loadingText.setVisible(false);
      scene.progressBar.setVisible(false);
      scene.progressBase.setVisible(false);
      this.scene.stop('PreloadScene');
      this.scene.start('TitleScene');
    }, 1000);

    GA.GameAnalytics.addProgressionEvent(
      'Complete',
      'game_loading'
    );
  };
  //#endregion

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
    this.timeTxt.setText(`${minutes} : ${seconds}`);
  }

  ResizeBg(newWidth, newHeight) {
    this.splashBG.setDisplaySize(newWidth, newHeight);
  }
  ResizeGameLogo(newWidth, newHeight, newScale) {
    this.gameLogo.setScale(this.newScale * 0.7);
    this.gameLogo.setPosition(newWidth / 2, 250 * this.newScale);
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
    this.progressBar.setPosition(
      this.progressBase.x,
      this.progressBase.y - (4 * this.newScale)
    );
  }

  //#region - Resize
  resize(_newWidth, _newHeight, offsetWidth) {
    if (Constant.currentScene !== 'PreloadScene') {
      return;
    }

    this.newScale = Utils.GetScale(1080, 1920, _newWidth, _newHeight);

    if (this.splashBG) {
      this.ResizeBg(_newWidth, _newHeight);
    }
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

    const camera = this.cameras.main;
    camera.x = offsetWidth;
    camera.setViewport(offsetWidth, 0, _newWidth, _newHeight);
  };
  //#endregion

}