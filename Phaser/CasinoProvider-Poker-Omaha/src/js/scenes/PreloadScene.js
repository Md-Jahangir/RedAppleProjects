/* global window,setTimeout,console,document */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Load all the assests and showing the progress bar.
 ************************************/

import Phaser from 'phaser';
import FontFaceObserver from 'fontfaceobserver';
import { Utils } from '../Utils.js';
import { SelectedResolution } from '../ResolutionSelector.js';
import { Model } from '../Model.js';

export default class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
    this.progressBar = null;
    this.loadingText = null;
    this.numberOfTable = 5;
    this.numberOfProfilePic = 10;
    // this.numberOfBackCard = 4;
    this.numberOfFrontCard = 4;
    this.fonts = {
      'BAHNSCHRIFT': null,
      'Poppins-Regular': null,
      'Poppins-SemiBold': null,
      'Poppins-Medium': null
    };
  };

  //#region - Load all images
  preload() {
    //SPLASH
    // this.load.image('background', 'assets/images/common/background.png');
    // this.load.image('progress_base', 'assets/images/preloadScene/progress_base.png');
    // this.load.image('progress_bar', 'assets/images/preloadScene/progress_bar.png');
    // this.load.spine('coin', 'assets/images/spine/Coin.json', 'assets/images/spine/Coin.atlas');
    // this.load.spine('confetti', 'assets/images/spine/Confetti.json', 'assets/images/spine/Confetti.atlas');
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

    // this.splashBg = this.add.image(0, 0, 'background').setOrigin(0);
    // this.progressBase = this.add.image(Math.round(this.scale.width / 2), Math.round(this.scale.height / 1.1), 'progress_base').setOrigin(0.5);
    // this.progressBar = this.add.image(Math.round(this.scale.width / 2), Math.round(this.scale.height / 1.11), 'progress_bar').setOrigin(0.5);
    const loadingTextStyle = { fontFamily: 'BAHNSCHRIFT', fontSize: '42px', fill: '#FFF', fontStyle: 'normal', align: 'center' };
    this.loadingText = this.add.text(Math.round(this.scale.width / 2), Math.round(this.scale.height / 1.1), 'Loading: ', loadingTextStyle).setOrigin(0.5);
    // this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
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

    // console.log('this.load', this.load);

    this.load.on('progress', this.LoadProgress, this);
    this.load.on('complete', this.OnComplete, { scene: this.scene });
    // this.load.on('error', this.LoadError, this);
    const cardFrameWidth = 1155 / 13;
    const cardFrameHeight = 650 / 5;
    const loadingWheelFrameWidth = 157;
    const loadingWheelFrameHeight = 157;
    const sitInArrowFrameWidth = 98 / 2;
    const sitInArrowFrameHeight = 70;
    this.load.spine('coin', 'assets/images/spine/Coin.json', 'assets/images/spine/Coin.atlas');
    this.load.spine('confetti', 'assets/images/spine/Confetti.json', 'assets/images/spine/Confetti.atlas');
    //Game Scene
    for (let i = 0; i < this.numberOfTable; i++) {
      this.load.image(`table_bg_${i}`, `assets/images/gameScene/table_bg_${i}.png`);
    }
    this.load.image('game_bg', 'assets/images/common/background.png');
    // this.load.image('table_bg', 'assets/images/gameScene/table_bg.png');
    // this.load.image('raise_popup_base', 'assets/images/gameScene/raise_popup_base.png');
    this.load.image('pot_value_base', 'assets/images/gameScene/pot_value_base.png');
    this.load.image('pot_value_chip', 'assets/images/gameScene/pot_value_chip.png');

    // this.load.image('fold_button_normal', 'assets/images/gameScene/call_button_base.png');
    // this.load.image('fold_button_hover', 'assets/images/gameScene/call_button_base.png');
    // this.load.image('fold_button_disabled', 'assets/images/gameScene/call_button_base.png');

    this.load.image('call_button_normal', 'assets/images/gameScene/call_button_base.png');
    this.load.image('call_button_hover', 'assets/images/gameScene/call_button_base.png');
    this.load.image('call_button_disabled', 'assets/images/gameScene/call_button_base.png');

    // this.load.image('check_button_normal', 'assets/images/gameScene/call_button_base.png');
    // this.load.image('check_button_hover', 'assets/images/gameScene/call_button_base.png');
    // this.load.image('check_button_disabled', 'assets/images/gameScene/call_button_base.png');

    // this.load.image('raise_button_normal', 'assets/images/gameScene/call_button_base.png');
    // this.load.image('raise_button_hover', 'assets/images/gameScene/call_button_base.png');
    // this.load.image('raise_button_disabled', 'assets/images/gameScene/call_button_base.png');

    // this.load.image('raise_button_normal', 'assets/images/gameScene/call_button_base.png');
    // this.load.image('raise_button_hover', 'assets/images/gameScene/call_button_base.png');
    // this.load.image('raise_button_disabled', 'assets/images/gameScene/call_button_base.png');

    // this.load.image('raise_popup_plus_button_normal', 'assets/images/gameScene/raise_popup_plus_button.png');
    // this.load.image('raise_popup_plus_button_hover', 'assets/images/gameScene/raise_popup_plus_button.png');
    // this.load.image('raise_popup_plus_button_disabled', 'assets/images/gameScene/raise_popup_plus_button.png');

    // this.load.image('raise_popup_minus_button_normal', 'assets/images/gameScene/raise_popup_minus_button.png');
    // this.load.image('raise_popup_minus_button_hover', 'assets/images/gameScene/raise_popup_minus_button.png');
    // this.load.image('raise_popup_minus_button_disabled', 'assets/images/gameScene/raise_popup_minus_button.png');

    this.load.image('raise_half_pot_button_normal', 'assets/images/gameScene/raise_half_pot_button.png');
    this.load.image('raise_half_pot_button_hover', 'assets/images/gameScene/raise_half_pot_button.png');
    this.load.image('raise_half_pot_button_disabled', 'assets/images/gameScene/raise_half_pot_button.png');

    this.load.image('select_raise_half_pot_button_normal', 'assets/images/gameScene/select_raise_half_pot_button.png');
    this.load.image('select_raise_half_pot_button_hover', 'assets/images/gameScene/select_raise_half_pot_button.png');
    this.load.image('select_raise_half_pot_button_disabled', 'assets/images/gameScene/select_raise_half_pot_button.png');

    this.load.image('raise_popup_cancel_button_normal', 'assets/images/gameScene/raise_popup_cancel_button.png');
    this.load.image('raise_popup_cancel_button_hover', 'assets/images/gameScene/raise_popup_cancel_button.png');
    this.load.image('raise_popup_cancel_button_disabled', 'assets/images/gameScene/raise_popup_cancel_button.png');

    // this.load.image('raise_popup_cross_button_normal', 'assets/images/gameScene/cross_button.png');
    // this.load.image('raise_popup_cross_button_hover', 'assets/images/gameScene/cross_button.png');
    // this.load.image('raise_popup_cross_button_disabled', 'assets/images/gameScene/cross_button.png');

    // this.load.image('raise_popup_correct_button_normal', 'assets/images/gameScene/correct_button.png');
    // this.load.image('raise_popup_correct_button_hover', 'assets/images/gameScene/correct_button.png');
    // this.load.image('raise_popup_correct_button_disabled', 'assets/images/gameScene/correct_button.png');

    this.load.image('leave_button_normal', 'assets/images/gameScene/leave_button.png');
    this.load.image('leave_button_hover', 'assets/images/gameScene/leave_button.png');
    this.load.image('leave_button_disabled', 'assets/images/gameScene/leave_button.png');

    this.load.image('setting_button_normal', 'assets/images/gameScene/setting_button.png');
    this.load.image('setting_button_hover', 'assets/images/gameScene/setting_button.png');
    this.load.image('setting_button_disabled', 'assets/images/gameScene/setting_button.png');

    this.load.image('waiting_sit_button_normal', 'assets/images/gameScene/waiting_sit_button.png');
    this.load.image('waiting_sit_button_hover', 'assets/images/gameScene/waiting_sit_button.png');
    this.load.image('waiting_sit_button_disabled', 'assets/images/gameScene/waiting_sit_button.png');
    this.load.audio('card', 'assets/sounds/card.mp3');

    //GAME SCENE PLAYER
    for (let i = 0; i < this.numberOfProfilePic; i++) {
      this.load.image(`profile_pic_${i}`, `assets/images/gameScene/player/profile_pic_${i}.png`);
    }
    // for (let i = 0; i < this.numberOfBackCard; i++) {
    //   this.load.image(`left_back_card_${i}`, `assets/images/gameScene/player/left_back_card_${i}.png`);
    // }
    // for (let i = 0; i < this.numberOfBackCard; i++) {
    //   this.load.image(`right_back_card_${i}`, `assets/images/gameScene/player/right_back_card_${i}.png`);
    // }
    this.load.image('sit_in_icon', 'assets/images/gameScene/player/sit_in_icon.png');
    // this.load.image('user_balance_base', 'assets/images/gameScene/player/user_balance_base.png');
    this.load.image('user_base', 'assets/images/gameScene/player/user_base.png');
    this.load.image('user_allin_decision_base', 'assets/images/gameScene/player/allin_decision_base.png');
    this.load.image('user_called_decision_base', 'assets/images/gameScene/player/call_decision_base.png');
    this.load.image('user_raised_decision_base', 'assets/images/gameScene/player/call_decision_base.png');
    this.load.image('user_check_decision_base', 'assets/images/gameScene/player/check_decision_base.png');
    this.load.image('user_fold_decision_base', 'assets/images/gameScene/player/fold_decision_base.png');
    // this.load.image('user_image', 'assets/images/gameScene/player/user_image.png');
    this.load.image('user_name_base', 'assets/images/gameScene/player/user_name_base.png');
    this.load.image('user_ring', 'assets/images/gameScene/player/user_ring.png');
    this.load.image('user_win_ring', 'assets/images/gameScene/player/win_glow_ring.png');
    this.load.image('user_win_effect', 'assets/images/gameScene/player/win_glow_effect.png');
    // this.load.image('user_role_base', 'assets/images/gameScene/player/big_blind_base.png');
    this.load.image('user_role_base', 'assets/images/gameScene/player/blind_delear_base.png');
    this.load.image('poker_chip', 'assets/images/gameScene/player/poker_chip.png');
    this.load.image('black_layer', 'assets/images/gameScene/player/black_layer.png');
    this.load.image('green_layer', 'assets/images/gameScene/player/green_layer.png');
    // this.load.image('sit_in_arrow', 'assets/images/gameScene/player/sit_in_arrow.png');
    this.load.spritesheet('sit_in_arrow', 'assets/images/gameScene/player/sit_in_arrow.png', { frameWidth: sitInArrowFrameWidth, frameHeight: sitInArrowFrameHeight });

    this.load.image('raise_base', 'assets/images/gameScene/raise_base.png');
    this.load.image('raise_bar', 'assets/images/gameScene/raise_bar.png');
    this.load.image('raise_slider', 'assets/images/gameScene/raise_slider.png');
    this.load.image('raise_slider_base', 'assets/images/gameScene/raise_slider_base.png');


    for (let i = 0; i < this.numberOfFrontCard; i++) {
      this.load.spritesheet(`front_card_${i}`, `assets/images/gameScene/player/front_card_${i}.png`, { frameWidth: cardFrameWidth, frameHeight: cardFrameHeight });
    }
    // this.load.spritesheet('card_spritesheet', 'assets/images/deck_spritesheet.png', { frameWidth: cardFrameWidth, frameHeight: cardFrameHeight });
    this.load.image('card_outline', 'assets/images/card_outline.png');

    //POPUP
    this.load.spritesheet('loading_wheel', 'assets/images/popups/loading_wheel.png', { frameWidth: loadingWheelFrameWidth, frameHeight: loadingWheelFrameHeight });
    this.load.image('overlay', 'assets/images/popups/overlay.png');
    this.load.image('popup_base', 'assets/images/popups/popup_base.png');
    // this.load.image('popup_upper_base', 'assets/images/popups/popup_upper_base.png');
    // this.load.image('cross_button_normal', 'assets/images/popups/cross_button.png');
    // this.load.image('cross_button_hover', 'assets/images/popups/cross_button.png');
    // this.load.image('cross_button_disabled', 'assets/images/popups/cross_button.png');
    this.load.image('close_button_normal', 'assets/images/popups/close_button.png');
    this.load.image('close_button_hover', 'assets/images/popups/close_button.png');
    this.load.image('close_button_disabled', 'assets/images/popups/close_button.png');
    // this.load.image('yes_button_normal', 'assets/images/popups/yes_button.png');
    // this.load.image('yes_button_hover', 'assets/images/popups/yes_button.png');
    // this.load.image('yes_button_disabled', 'assets/images/popups/yes_button.png');
    // this.load.image('no_button_normal', 'assets/images/popups/no_button.png');
    // this.load.image('no_button_hover', 'assets/images/popups/no_button.png');
    // this.load.image('no_button_disabled', 'assets/images/popups/no_button.png');
    this.load.image('poker_chip_popup', 'assets/images/popups/poker_chip_popup.png');
    this.load.image('buyin_popup_base', 'assets/images/popups/buyin_popup_base.png');
    // this.load.image('buyin_popup_line', 'assets/images/popups/buyin_popup_line.png');
    this.load.image('buy_in_amount_base', 'assets/images/popups/buy_in_amount_base.png');
    this.load.image('buy_in_minmax_amount_base_normal', 'assets/images/popups/buy_in_minmax_amount_base.png');
    this.load.image('buy_in_minmax_amount_base_hover', 'assets/images/popups/buy_in_minmax_amount_base.png');
    this.load.image('buy_in_minmax_amount_base_disabled', 'assets/images/popups/buy_in_minmax_amount_base.png');
    // this.load.image('buyin_slider_bar', 'assets/images/popups/buyin_slider_bar.png');
    // this.load.image('buyin_slider_base', 'assets/images/popups/buyin_slider_base.png');
    // this.load.image('buyin_slider_knob', 'assets/images/popups/buyin_slider_knob.png');
    // this.load.image('buyin_upper_base', 'assets/images/popups/buyin_upper_base.png');
    this.load.image('buyin_bottom_base_normal', 'assets/images/popups/buyin_bottom_base.png');
    this.load.image('buyin_bottom_base_hover', 'assets/images/popups/buyin_bottom_base.png');
    this.load.image('buyin_bottom_base_disabled', 'assets/images/popups/buyin_bottom_base.png');
    // this.load.image('slider_chip', 'assets/images/popups/slider_chip.png');
    this.load.image('chat_icon_normal', 'assets/images/popups/chat_icon.png');
    this.load.image('chat_icon_hover', 'assets/images/popups/chat_icon.png');
    this.load.image('chat_icon_disabled', 'assets/images/popups/chat_icon.png');
    this.load.image('chat_hide_button_normal', 'assets/images/popups/chat_hide_button.png');
    this.load.image('chat_hide_button_hover', 'assets/images/popups/chat_hide_button.png');
    this.load.image('chat_hide_button_disabled', 'assets/images/popups/chat_hide_button.png');
    this.load.image('send_button_normal', 'assets/images/popups/send_button.png');
    this.load.image('send_button_hover', 'assets/images/popups/send_button.png');
    this.load.image('send_button_disabled', 'assets/images/popups/send_button.png');
    this.load.image('inputText_base', 'assets/images/popups/inputText_base.png');
    this.load.image('chat_base', 'assets/images/popups/chat_base.png');
    this.load.image('chat_base_text', 'assets/images/popups/chat_base_text.png');
    this.load.spritesheet('toggle_button_normal', 'assets/images/popups/toggle_button.png', {
      frameWidth: 189 / 2, // width of a single frame
      frameHeight: 50  // height of a single frame
    });
    this.load.spritesheet('toggle_button_hover', 'assets/images/popups/toggle_button.png', {
      frameWidth: 189 / 2, // width of a single frame
      frameHeight: 50  // height of a single frame
    });
    this.load.spritesheet('toggle_button_disabled', 'assets/images/popups/toggle_button.png', {
      frameWidth: 189 / 2, // width of a single frame
      frameHeight: 50  // height of a single frame
    });


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
      // // this.scene.start("TitleScene");
      // this.scene.start('GameScene');
      // this.scene.start("GameErrorScene");
      this.scene.scene.TransitToSpecificScene();

    }, 1000);
  };
  //#endregion

  TransitToSpecificScene() {
    const type = Model.GetType();
    const auth = Model.GetAuthToken();
    switch (type) {
      case 'cash':
        this.scene.start('GameScene');
        break;
      case 'tournament':
        this.scene.start('GameScene');
        break;
      case 'replay':
        this.scene.start('ReplayHandScene');
        break;
      default:
        this.scene.start('GameErrorScene', { type, auth });
        break;
    }
  };

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
    // this.splashBg.setDisplaySize(_newWidth, _newHeight);

    if (this.progressBase) {
      this.ResizeProgressBase(_newWidth, _newHeight);
    }
    // this.progressBase.setScale(newScale);
    // this.progressBase.setPosition(
    //   _newWidth / 2,
    //   _newHeight / 1.1
    // );
    if (this.progressBar) {
      this.ResizeProgressBar(_newWidth, _newHeight);
    }
    // this.progressBar.setScale(newScale);
    // this.progressBar.setPosition(
    //   _newWidth / 2,
    //   _newHeight / 1.102
    // );

    this.loadingText.setScale(newScale);
    this.loadingText.setPosition(
      _newWidth / 2,
      _newHeight / 1.07
    );
  };
  //#endregion

}