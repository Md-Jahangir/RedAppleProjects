/* global Phaser */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 13-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 28-04-2025
 * @Description :- Game Title.
 ************************************/

import { Constant } from '../Constant';
import ButtonTween from '../game_objects/ButtonTween';
import { Utils } from '../Utils';
import gsap from 'gsap';
import { AudioManager } from '../media/AudioManager';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler.js';
import * as GA from 'gameanalytics';

export default class TitleScene extends Phaser.Scene {

  constructor() {
    super('TitleScene');

    this.bottomPanelContainer = null;
    this.topPanelContainer = null;
    // console.log('menu', Constant.setLevel);

  }

  create() {
    PlayzhubEventHandler.SendGameStateToGame(this.UpdateLevel.bind(this));
    PlayzhubEventHandler.ReceivedGameState(this.UpdateLevel.bind(this));
    PlayzhubEventHandler.RequestGameStateFromGame();
    PlayzhubEventHandler.RequestGameState();

    Constant.currentScene = 'TitleScene';
    Constant.game.events.on('resize', this.resize, this);
    // Constant.game.events.on('sendgamestatetogame', this.UpdateLevel, this);
    // Constant.game.events.on('gamescoreupdate', this.UpdateScore, this);
    // PlayzhubEventHandler.AdStarted(this.OnStartingAd.bind(this));
    // Constant.game.events.on('adstarted', this.OnStartingAd, this);
    // PlayzhubEventHandler.AdCompleted(this.OnAdCompleted.bind(this));
    // Constant.game.events.on('adcompleted', this.OnAdCompleted, this);
    this.AddBG();
    this.AddTitleUI();

    if (window.innerWidth > window.innerHeight) {
      const clientHeight = window.innerHeight;
      Constant.clientHeight = clientHeight;
      const clientWidth = (clientHeight / 1.77777777778);
      Constant.clientWidth = clientWidth;
      const widthOffset = (window.innerWidth / 2) - (clientWidth / 2);
      Constant.widthOffset = widthOffset;
      this.resize(clientWidth, clientHeight, widthOffset);
    }
    else {
      const clientWidth = window.innerWidth;
      Constant.clientWidth = clientWidth;

      const clientHeight = window.innerHeight;
      Constant.clientHeight = clientHeight;

      const widthOffset = 0;
      Constant.widthOffset = widthOffset;
      this.resize(clientWidth, clientHeight, widthOffset);
    }

    GA.GameAnalytics.addDesignEvent('screen:title');

  }

  // OnStartingAd() {
  //   PlayzhubEventHandler.GamePlayPaused();
  // }

  // OnAdCompleted() {
  //   PlayzhubEventHandler.GamePlayResumed();
  // }

  AddBG() {
    this.titleBg = this.add.image(0, 0, 'splash').setOrigin(0.5);
  }

  AddTitleUI() {
    //Bottom Panel
    this.bottomPanelContainer = this.add.container();
    this.playBtn = this.add.image(0, 0, 'ui', 'play').setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.bottomPanelContainer.add(this.playBtn);

    //Top Panel
    this.topPanelContainer = this.add.container();
    this.gameLogo = this.add.image(0, -200, 'logo').setOrigin(0.5);

    this.topPanelContainer.add(this.gameLogo);

    this.playBtn.on('pointerup', this.OnPressingPlayBtn, this);

  }

  OnPressingPlayBtn() {
    GA.GameAnalytics.addDesignEvent('ui:play_clicked');
    Constant.playClicked += 1;
    PlayzhubEventHandler.GamePlayStarted(Constant.playClicked);
    this.btnTween = new ButtonTween(this, this.playBtn);
    AudioManager.PlayButtonPressAudio();
    this.btnTween.btnTween.once('complete', () => {
      // if (localStorage.getItem('cake_sort') === null) {
      //   localStorage.setItem('cake_sort', 1);
      // }
      this.scene.stop('TitleScene');
      this.scene.start('MenuScene');
      // this.anim.destroy();
    });
  }

  ShowPlayButtonToScreen(_playBttnConatainer) {
    this.playBtn.setVisible(true);
    gsap.fromTo(this.playBtn,
      { scale: 1.25 },
      {
        delay: 0.15,
        duration: 0.3,
        scale: 1,
        ease: 'expo.in',
        onComplete: () => {
          this.playBtn.setInteractive({ useHandCursor: true });
          this.playBtn.postFX.addShine(1, 0.2, 2.5);
        }
      }
    );
  }

  UpdateLevel(_data) {
    console.log('Fetch data of levels', _data);

    if (_data === null) {
      Constant.gemsCollCount = 0;
      Constant.gameScore = 0;
    }
    else {
      Constant.gemsCollCount = _data.gems;
      Constant.gameScore = _data.score;
    }
  }

  UpdateScore(_data) {
    if (_data.score === null) Constant.gameScore = 0;
    else Constant.gameScore = _data.score;
  }

  resize(_newWidth, _newHeight, offsetWidth) {
    if (Constant.currentScene !== 'TitleScene') {
      return;
    }

    this.newScale = Utils.GetScale(1080, 1920, _newWidth, _newHeight);
    Constant.clientHeight = _newHeight;
    Constant.clientWidth = _newWidth;
    Constant.newScale = this.newScale;
    this.titleBg.setDisplaySize(_newWidth, _newHeight);
    this.titleBg.setPosition(
      _newWidth / 2,
      _newHeight / 2
    );

    this.topPanelContainer?.setScale(this.newScale);
    this.topPanelContainer?.setPosition(_newWidth / 2, 480 * this.newScale);

    this.bottomPanelContainer.setScale(this.newScale);
    this.bottomPanelContainer.setPosition(
      (_newWidth / 2),
      (_newHeight / 1) - (130 * this.newScale)
    );

    const camera = this.cameras.main;
    camera.x = offsetWidth;
    // camera.setBounds(0, 0, newWidth, newHeight);
    camera.setViewport(offsetWidth, 0, _newWidth, _newHeight);
  }
}