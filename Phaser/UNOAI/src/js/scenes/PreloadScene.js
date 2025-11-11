/* global window,setTimeout,console,document */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 28-10-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 28-10-2025
 * @Description :- Load all the assests and showing the progress bar.
 ************************************/

import Phaser from 'phaser';
import FontFaceObserver from 'fontfaceobserver';
import { Utils } from '../utils/Utils.js';
import { SelectedResolution } from '../utils/ResolutionSelector.js';
// import { Model } from '../Model.js';

export default class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
    this.progressBar = null;
    this.loadingText = null;
    this.fonts = {
      'Poppins-Regular': null,
      'Poppins-SemiBold': null,
      'Poppins-Medium': null
    };
  };

  //#region - Load all images
  preload() {
  };
  //#endregion

  //#region - Create all images
  create() {
    this.game.events.on('resize', this.resize, this);
    this.loadArray = new Array();
    const getBackground = document.getElementById('background');
    const getProgressBase = document.getElementById('progress_base');
    const getProgressBar = document.getElementById('progress_bar');
    this.loadArray.push(getBackground, getProgressBase, getProgressBar);
    for (let index = 0; index < this.loadArray.length; index++) {
      const element = this.loadArray[index];
      if (element.complete) {
        this.AddTextures(element);
      }
      else {
        element.onload = () => this.AddTextures(element);
      }
    }

    const loadingTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '42px', fill: '#FFF', fontStyle: 'normal', align: 'center' };
    this.loadingText = this.add.text(Math.round(this.scale.width / 2), Math.round(this.scale.height / 1.1), 'Loading: ', loadingTextStyle).setOrigin(0.5);
    this.LoadFonts();
    this.resize(window.innerWidth, window.innerHeight);
  };
  AddTextures(element) {
    const textureKey = element.id;
    if (!this.textures.exists(textureKey)) {
      this.textures.addImage(textureKey, element);
    }
    if (textureKey === 'background') {
      this.splashBg = this.add.image(0, 0, textureKey).setOrigin(0);
      this.ResizeBackground(window.innerWidth, window.innerHeight);
    }
    else if (textureKey === 'progress_base') {
      this.progressBase = this.add.image(0, 0, textureKey).setOrigin(0.5);
      this.ResizeProgressBase(window.innerWidth, window.innerHeight);
    }
    else if (textureKey === 'progress_bar') {
      this.progressBar = this.add.image(0, 0, 'progress_bar').setOrigin(0.5);

      this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
      this.ResizeProgressBar(window.innerWidth, window.innerHeight);
    } else {
      // eslint-disable-next-line no-console
      console.log('Element doesnt exist', element, element.id);
    }

  }
  //#endregion

  //#region - Load Fonts
  LoadFonts() {
    const propNames = Object.getOwnPropertyNames(this.fonts);
    propNames.forEach((fontName, index) => {
      const isLast = index >= propNames.length - 1;
      this.fonts[fontName] = new FontFaceObserver(fontName);
      this.fonts[fontName].load().then(this.FontLoadSuccess.bind(this, fontName, isLast), this.FontLoadError.bind(this, fontName));
    });
  };
  //#endregion

  //#region - Load font success
  FontLoadSuccess(_fontName, _isLast) {
    if (_isLast) {

      // console.log(' font load ');

      // if (Server.IsParamsMissing()) {
      //     this.scene.start("GameErrorScene");
      // } else {
      this.LoadAssests();
      // }
    }
  };
  //#endregion

  //#region - Load Font Error
  FontLoadError() { };

  //#region - Load all assests
  LoadAssests() {
    this.load.on('progress', this.LoadProgress, this);
    this.load.on('complete', this.OnComplete, { scene: this.scene });

    this.load.image('bg_menu', 'assets/images/bg_menu.png');
    this.load.image('bg_game', 'assets/images/bg_game.jpg');
    this.load.image('overlay', 'assets/images/overlay.png');
    this.load.image('popup_base', 'assets/images/popup_base.png');
    this.load.image('button_info', 'assets/images/button_info.png');
    this.load.image('button_cross', 'assets/images/button_cross.png');
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('button_back', 'assets/images/button_back.png');
    this.load.image('button_sound_on', 'assets/images/button_sound_on.png');
    this.load.image('button_sound_off', 'assets/images/button_sound_off.png');
    this.load.image('button_yes', 'assets/images/button_yes.png');
    this.load.image('button_no', 'assets/images/button_no.png');
    this.load.image('button_home', 'assets/images/button_home.png');
    this.load.image('button_replay', 'assets/images/button_replay.png');
    this.load.image('line_players', 'assets/images/line_players.png');
    this.load.spritesheet('button_play', 'assets/images/button_play.png', { frameWidth: 315, frameHeight: 120 });
    this.load.image('button_2_players', 'assets/images/button_2_players.png');
    this.load.image('button_3_players', 'assets/images/button_3_players.png');
    this.load.image('button_4_players', 'assets/images/button_4_players.png');

    this.load.image('character_1', 'assets/images/character_1.png');
    this.load.image('character_2', 'assets/images/character_2.png');
    this.load.image('character_3', 'assets/images/character_3.png');
    this.load.image('character_4', 'assets/images/character_4.png');

    this.load.image('button_uno', 'assets/images/button_uno.png');

    this.load.spritesheet('colors', 'assets/images/colors.png', { frameWidth: 103, frameHeight: 102 });
    this.load.spritesheet('cards', 'assets/images/cards.png', { frameWidth: 156, frameHeight: 242 });

    this.load.start();
  };
  //#endregion

  //#region - Load progress bar
  LoadProgress(_percentage) {

    // console.log(' progress', _percentage);

    if (this.progressBar) {
      this.progressBar.setCrop(0, 0, this.progressBar.width * _percentage, this.progressBar.height);
    }
    _percentage = _percentage * 100;
    this.loadingText.setText(`Loading: ${parseInt(_percentage)} %`);
  };
  //#endregion

  //#region - On complete event
  OnComplete() {
    setTimeout(() => {
      // Constant.game.scene.stop('PreloadScene');
      this.scene.stop('PreloadScene');
      // this.scene.start('MenuScene');
      this.scene.start('GameScene');

    }, 1000);
  };
  //#endregion

  ResizeBackground(_newWidth, _newHeight) {
    this.splashBg.setDisplaySize(_newWidth, _newHeight);
  }
  ResizeProgressBase(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, _newWidth, _newHeight);
    this.progressBase.setScale(newScale);
    this.progressBase.setPosition(
      _newWidth / 2,
      _newHeight / 1.1
    );
  }
  ResizeProgressBar(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, _newWidth, _newHeight);
    if (this.progressBar) {
      this.progressBar.setScale(newScale);
      this.progressBar.setPosition(
        _newWidth / 2,
        _newHeight / 1.102
      );
    }
  }

  //#region - Resize
  resize(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, _newWidth, _newHeight);
    if (this.splashBg) {
      this.ResizeBackground(_newWidth, _newHeight);
    }

    if (this.progressBase) {
      this.ResizeProgressBase(_newWidth, _newHeight);
    }

    if (this.progressBar) {
      this.ResizeProgressBar(_newWidth, _newHeight);
    }

    this.loadingText.setScale(newScale);
    this.loadingText.setPosition(
      _newWidth / 2,
      _newHeight / 1.07
    );
  };
  //#endregion

}