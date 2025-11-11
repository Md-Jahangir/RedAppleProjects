/* eslint-disable no-unused-vars */
/* global Phaser */
/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 13-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 19-09-2024
 * @Description :- Game Menu.
 ************************************/
import { Constant } from '../Constant';
import ButtonTween from '../game-objects/ButtonTween';
import { Utils } from '../Utils';
import gsap from 'gsap';
import { AudioManager } from '../media/AudioManager';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler.js';
import * as GA from 'gameanalytics';

export default class TitleScene extends Phaser.Scene {

  constructor() {
    super('TitleScene');

    this.titleUIContainer = null;
    this.topUIContainer = null;

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

    // const fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '70px', fill: '#ffdf2b', align: 'center' };
    // const text = 'Victory';
    // this.txtT = this.add.text(0, 0, text, fontTextStyle).setOrigin(0.5);

    // this.input.on('pointerdown', () => {
    //   console.log('chuo');

    //   if ('vibrate' in navigator) {
    //     navigator.vibrate(200);
    //     this.txtT.x += 20;
    //   }

    // });

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
    this.titleBg = this.add.image(0, 0, 'tBG').setOrigin(0.5);
  }

  AddTitleUI() {
    this.titleUIContainer = this.add.container();

    this.splashAnim = this.add.spine(50, 285, 'cake_splash_data', 'cake_splash_atlas');
    this.splashAnim.animationState.setAnimation(0, 'appear', false);

    this.time.delayedCall(520, () => {
      AudioManager.PlaySparkleAudio();
    });

    this.splashAnim.animationState.addListener({
      complete: (entry) => {
        this.splashAnim.animationState.setAnimation(0, 'loop', true);
      }
    });

    this.titleUIContainer.add(this.splashAnim);

    //Top Panel
    this.topPanelContainer = this.add.container();
    this.titleAnim = this.add.spine(0, 240, 'title_data', 'title_atlas');
    this.titleAnim.animationState.setAnimation(0, 'title_art_appear', false);

    this.currAnims = 'title_anim';
    this.titleAnim.animationState.addListener({
      complete: (entry) => {
        if (this.currAnims === 'title_anim') {
          this.playBtnContainer.setVisible(true);
          this.ShowPlayButtonToScreen();
          this.titleAnim.animationState.setAnimation(0, 'title_art_loop', true);
          // this.titleAnim.play('title_art_loop', true);
          this.currAnims = 'title_art_loop';
        }
      }
    });

    this.topPanelContainer.add(this.titleAnim);

    //PlayButton
    this.playBtnContainer = this.add.container();
    this.playBtn = this.add.image(0, 0, 'ui', 'play_button').setOrigin(0.5);//.setScale(0.3);
    this.playBtnContainer.add(this.playBtn);
    this.playBtnContainer.setVisible(false);

    this.playBtn.on('pointerup', this.OnPressingPlayBtn, this);

  }

  OnPressingPlayBtn() {
    GA.GameAnalytics.addDesignEvent('ui:play_clicked');
    this.btnTween = new ButtonTween(this, this.playBtn);
    AudioManager.PlayButtonPressAudio();
    this.btnTween.btnTween.on('complete', () => {
      if (localStorage.getItem('cake_sort') === null) {
        localStorage.setItem('cake_sort', 1);
      }
      this.scene.stop('TitleScene');
      this.scene.start('MenuScene');
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
    // console.log('Fetch data of levels', _data);

    if (_data === null || _data.level === 100) {
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

    this.titleUIContainer.setScale(this.newScale);
    this.titleUIContainer.setPosition((_newWidth / 2),
      (_newHeight / 2));

    this.topPanelContainer?.setScale(this.newScale);
    this.topPanelContainer?.setPosition(_newWidth / 2, 0);

    this.playBtnContainer.setScale(this.newScale);
    this.playBtnContainer.setPosition(
      (_newWidth / 2),
      (_newHeight / 1) - (130 * this.newScale)
    );

    // this.txtT.setScale(this.newScale);
    // this.txtT.setPosition(_newWidth / 2, _newHeight / 2);

    const camera = this.cameras.main;
    camera.x = offsetWidth;
    // camera.setBounds(0, 0, newWidth, newHeight);
    camera.setViewport(offsetWidth, 0, _newWidth, _newHeight);
  }
}