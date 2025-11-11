/* global Phaser */
/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 13-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 21-03-2025
 * @Description :- Game Menu.
 ************************************/

import { Utils } from '../Utils.js';
// import { SelectedResolution } from '../ResolutionSelector.js';
import { Constant } from '../Constant.js';
import ButtonTween from '../game-objects/ButtonTween';
import { AudioManager } from '../media/AudioManager.js';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler.js';
import * as GA from 'gameanalytics';

export default class MenuScene extends Phaser.Scene {

  constructor() {
    super('MenuScene');

  }

  init() {
    this.menuUIContainer = null;
    this.currentAnims = null;
    this.playBtnResizeOffset = 1130;

    Constant.score = 0;
    Constant.hintCount = 5;
    Constant.gridType = 4;
    Constant.sLvlCount = 0;
    Constant.totalLevels = 5;
  }

  preload() {

  }

  create() {
    PlayzhubEventHandler.SendGameStateToGame(this.UpdateLevel.bind(this));
    PlayzhubEventHandler.ReceivedGameState(this.UpdateLevel.bind(this));
    PlayzhubEventHandler.RequestGameStateFromGame();
    PlayzhubEventHandler.RequestGameState();
    Constant.currentScene = 'MenuScene';
    this.orgX = window.innerWidth; //originalX
    this.orgY = window.innerHeight; //originalY
    Constant.game.events.on('resize', this.resize, this);
    PlayzhubEventHandler.AdStarted(this.OnStartingAd.bind(this));
    PlayzhubEventHandler.AdCompleted(this.OnAdCompleted.bind(this));
    // Constant.game.events.on('sendgamestatetogame', this.UpdateLevel, this);
    // Constant.game.events.on('gamescoreupdate', this.UpdateScore, this);
    this.AddBG();
    this.CreateMenuUI();
    if (window.innerWidth > window.innerHeight) {
      const clientHeight = window.innerHeight;
      Constant.clientHeight = clientHeight;
      const clientWidth = (clientHeight / 1.77777777778);
      Constant.clientWidth = clientWidth;
      const widthOffset = (window.innerWidth / 2) - (clientWidth / 2);
      Constant.offsetWidth = widthOffset;
      this.resize(clientWidth, clientHeight, widthOffset);
    }
    else {
      const clientWidth = window.innerWidth;
      Constant.clientWidth = clientWidth;

      const clientHeight = window.innerHeight;
      Constant.clientHeight = clientHeight;

      const widthOffset = 0;
      Constant.offsetWidth = widthOffset;
      this.resize(clientWidth, clientHeight, widthOffset);
    }

    GA.GameAnalytics.addDesignEvent('screen:title');
  }

  OnStartingAd() {
    PlayzhubEventHandler.GamePlayPaused();
  }

  OnAdCompleted() {
    PlayzhubEventHandler.GamePlayResumed();
  }

  //#region  Game State Update 
  UpdateLevel(_data) {
    // console.log('_data at update level menu function', _data);
    if (_data === null || !_data.current_grid) {
      Constant.score = 0;
      Constant.hintCount = 5;
      Constant.gridType = 4;
      Constant.sLvlCount = 0;
      Constant.totalLevels = 5;
    }
    else {
      Constant.score = _data.game_score;
      Constant.hintCount = _data.game_collectibles.hints_used;
      Constant.gridType = _data.current_grid;
      Constant.sLvlCount = _data.sub_levels;
      Constant.totalLevels = _data.total_levels;
    }
  }

  UpdateScore(_data) {
    if (_data.score === null) {
      Constant.score = 0;
    }
    else Constant.score = _data.game_score;
  }
  //#endregion

  AddBG() {
    this.BG = this.add.image(0, 0, 'splash').setOrigin(0);
  }

  CreateMenuUI() {
    this.playBtnContainer = this.add.container().setDepth(2);
    this.playBtn = this.add.image(0, 0, 'buy_btn_2').setOrigin(0.5).setInteractive({ useHandCursor: true });
    const fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '55px', fill: '#fffffe', align: 'center' };
    const text = 'Play';
    this.pBtnText = this.add.text(this.playBtn.x + 5, this.playBtn.y - 10, text, fontTextStyle).setOrigin(0.5);
    this.pBtnText.setStroke('#557a38', 6);
    this.playBtnContainer.add([this.playBtn, this.pBtnText]);
    this.playBtnContainer.setVisible(false);

    this.anim = this.add.spine(500, 500, 'rabbit', 'jump', false);
    this.currentAnims = 'jump';

    this.anim.on('complete', () => {
      if (this.currentAnims === 'jump') {
        this.playBtnContainer.setVisible(true);
        this.TweenButtonToScreen(this.playBtnContainer);
        this.anim.play('Idle_Breathing', false);
        this.currentAnims = 'Idle_Breathing';
        this.ControlAnimation();
      }
    });

    this.playBtn.on('pointerup', this.OnPressingPlayBtn, this);
  }

  TweenButtonToScreen(_playBttnConatainer) {
    this.playBtn.setVisible(true);

    this.tween = this.tweens.add({
      targets: _playBttnConatainer,

      props: {
        y: {
          value: _playBttnConatainer.y - ((Constant.clientHeight / 2) - (500 * this.newScale)),
        }
      },
      ease: 'Bounce.easeOut',
      duration: 1500,
      yoyo: false,
      repeat: 0,
      onComplete: () => {
        this.playBtnResizeOffset = 680;
      }
    });
  }

  async ControlAnimation() {
    if (this.currentAnims === 'Idle_Breathing') {
      this.anim.play('Idle_activity', false);
      this.currentAnims = 'Idle_activity';
    } else if (this.currentAnims === 'Idle_activity') {
      this.anim.play('Idle_Breathing', false);
      this.currentAnims = 'Idle_Breathing';
    }

    // Wait for the animation to complete before continuing
    await new Promise(resolve => {
      this.anim.once('complete', resolve); // Use 'once' to prevent multiple triggers
    });

    this.ControlAnimation(); // Recursively call the function after animation ends
  }


  OnPressingPlayBtn() {
    GA.GameAnalytics.addDesignEvent('ui:play_clicked');
    this.btnTween = new ButtonTween(this, this.playBtn, this.pBtnText);
    if (localStorage.getItem('word_search') === null) {
      localStorage.setItem('word_search', 1);
    }
    AudioManager.PlayButtonPressAudio();
    Constant.playClicked += 1;
    PlayzhubEventHandler.GamePlayStarted(Constant.playClicked);
    this.btnTween.btnTween.on('complete', () => {
      setTimeout(() => {
        this.scene.stop('PreloadScene');
        this.scene.start('GameScene');
        this.anim.destroy();
      }, 100);
    });
  }

  update() {

  }

  resize(_newWidth, _newHeight, offsetWidth) {
    if (Constant.currentScene !== 'MenuScene') {
      return;
    }

    this.newScale = Utils.GetScale(1080, 1920, _newWidth, _newHeight);
    Constant.clientHeight = _newHeight;
    Constant.clientWidth = _newWidth;
    Constant.newScale = this.newScale;

    this.BG.setDisplaySize(_newWidth, _newHeight);

    this.anim.setScale(this.newScale);
    this.anim.setPosition(
      _newWidth / 2,
      (_newHeight / 2) + (590 * this.newScale)
    );

    this.playBtnContainer.setScale(this.newScale);
    this.playBtnContainer.setPosition(
      (_newWidth / 2),
      (_newHeight / 2) + (this.playBtnResizeOffset * this.newScale)
    );

    const camera = this.cameras.main;
    camera.x = offsetWidth;
    // camera.setBounds(0, 0, newWidth, newHeight);
    camera.setViewport(offsetWidth, 0, _newWidth, _newHeight);
    // console.info('offset', offsetWidth);

  }
}
