/* global Phaser */
/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Creation_Date :- 07-02-2025.
 * @Last_Updated_By :- Swarnav.
 * @Last_Updated_Date :- 06-03-2025.
 * @Description :- Game Menu.
 ************************************/
import { Constant } from '../Constant';
import ButtonTween from '../game-objects/ButtonTween';
import { Utils } from '../Utils';
import LevelRack from '../game-objects/LevelRack.js';
import gsap from 'gsap';
import QuitPopup from '../popup/QuitPopup.js';
import { AudioManager } from '../media/AudioManager.js';
// import { PlayzhubEventHandler } from '../PlayzhubEventHandler.js';
import * as GA from 'gameanalytics';

export default class MenuScene extends Phaser.Scene {

  constructor() {
    super('MenuScene');

    this.menuUIContainer = null;
    this.topUIContainer = null;
  }

  create() {
    // PlayzhubEventHandler.AdStarted(this.OnStartingAd.bind(this));
    // PlayzhubEventHandler.AdCompleted(this.OnAdCompleted.bind(this));
    Constant.currentScene = 'MenuScene';
    Constant.game.events.on('resize', this.resize, this);
    // Constant.game.events.on('adstarted', this.OnStartingAd, this);
    // Constant.game.events.on('adcompleted', this.OnAdCompleted, this);
    // this.cameras.main.fadeIn(800);
    AudioManager.PlayLevelMusic();
    this.AddBG();
    this.AddScroller();
    // this.CreateLevelSelection();
    this.CreateTopUI();
    this.CreateBottomUI();
    this.AddQuitPopup();
    // this.CreateMenuUI();

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

    GA.GameAnalytics.addDesignEvent('screen:level');
  }

  // OnStartingAd() {
  //   PlayzhubEventHandler.GamePlayPaused();
  // }

  // OnAdCompleted() {
  //   PlayzhubEventHandler.GamePlayResumed();
  // }

  AddBG() {
    this.BG = this.add.image(0, 0, 'gameBG').setOrigin(0.5);
  }

  AddScroller() {
    this.panelContainer = this.add.container();//.setDepth(2);

    this.panel = this.rexUI.add.scrollablePanel({
      x: 540,  // Center horizontally
      y: 960, // Center vertically
      width: this.BG.width, // Make it slightly smaller than the screen width
      height: this.BG.height, // Make it slightly smaller than the screen height
      scrollMode: 'y',  // Vertical scrolling

      panel: {
        child: this.CreateLevelSelection(),
        mask: { padding: 20 }, // Ensure the mask is properly applied
      },

    }).layout();
    this.panel.setOrigin(0.5);
    this.panelContainer.add(this.panel);
    this.ShowCurrentLevel();
  }

  CreateLevelSelection() {
    // this.getLevel = localStorage.getItem('cakesort_level');
    // console.log('getlevel', this.getLevel);
    let leftToRight = true; // Start direction left to right
    const totalItems = 14; // Number of items in view
    const spacingX = 200; // Horizontal spacing
    const spacingY = 90; // Vertical spacing
    const rowHeight = 280; // Row height difference
    this.menuUIContainer = this.add.container(0, 0);
    // let maxHeight = 0;

    for (let i = 0; i < totalItems; i++) {
      this.lvlRack = new LevelRack(this, i, Constant.setLevel);
      this.menuUIContainer.add(this.lvlRack.lvlRackContainer);

      if (i === 0) {
        this.lvlRack.lvlRackContainer.setPosition(-205, 670); // First object position
      } else if ((i - 0) % 3 === 0) {
        leftToRight = !leftToRight; // Flip direction every 3 items
        this.lvlRack.lvlRackContainer.setPosition(this.menuUIContainer.list[i - 1].x, this.menuUIContainer.list[i - 1].y - rowHeight);
      } else {
        const prevRack = this.menuUIContainer.list[i - 1];
        if (leftToRight) {
          this.lvlRack.lvlRackContainer.setPosition(prevRack.x + spacingX, prevRack.y - spacingY);
        } else {
          this.lvlRack.lvlRackContainer.setPosition(prevRack.x - spacingX, prevRack.y - spacingY);
        }
      }
      // maxHeight = Math.max(maxHeight, maxHeight + 200);
    }
    // this.menuUIContainer.setSize(1000, 2000);
    return this.menuUIContainer;
  }

  ShowCurrentLevel() {
    let hlElem = null;

    if (!Constant.setLevel) hlElem = 0;
    else {
      if (Constant.setLevel > 0 && Constant.setLevel <= 6) hlElem = parseInt(Constant.setLevel) - 1;
      else hlElem = 5;
    }
    this.menuUIContainer.list[hlElem].list[0].setTexture('game_obj', 'cake_rack_2');
    if (this.menuUIContainer.list[hlElem].list[0].frame.name === 'cake_rack_2') this.menuUIContainer.list[hlElem].list[0].setInteractive({ useHandCursor: true });
    this.menuUIContainer.list[hlElem].list[2].setVisible(false);
    this.menuUIContainer.list[hlElem].list[3].setVisible(true);
    this.menuUIContainer.list[hlElem].list[1].setVisible(true);
    for (let i = 0; i < hlElem; i++) {
      this.menuUIContainer.list[i].list[0].setTexture('game_obj', 'cake_rack_2');
      this.menuUIContainer.list[i].list[2].setVisible(false);
      this.menuUIContainer.list[i].list[3].setVisible(true);
      this.menuUIContainer.list[i].list[4].setVisible(true);
    }

    this.menuUIContainer.list[hlElem].list[0].on('pointerdown', () => {
      Constant.setLevel = this.menuUIContainer.list[hlElem].list[0].name;
      GA.GameAnalytics.addDesignEvent('ui:level_clicked');
      AudioManager.StopLevelMusic();
      Constant.showTutPages = true;
      this.scene.stop('MenuScene');
      this.scene.start('GameScene');
    });

    gsap.to(this.menuUIContainer.list[hlElem].list[1], {
      delay: 0.1,
      duration: 0.6,
      alpha: 1,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut'
    });
  }

  CreateTopUI() {
    this.topUIContainer = this.add.container();

    const topMask = this.add.image(0, 200, 'top_mask').setOrigin(0.5);
    const fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '70px', fill: '#ffdf2b', align: 'center' };
    const text = 'LEVEL SELECTION';
    this.lvlSelectTxt = this.add.text(0, 265, text, fontTextStyle).setOrigin(0.5);
    this.lvlSelectTxt.setStroke('#e1731a', 6);
    this.lvlSelectTxt.setShadow(0, 6, '#e1731a', 2, true, false);

    this.backBtn = this.add.image(-435, 111, 'ui', 'back_button').setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.sndBtn = this.add.image(435, 111, 'ui', 'sound').setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.backBtn.on('pointerdown', this.OnClickingBackButton, this);
    this.sndBtn.on('pointerdown', this.OnClickingSoundButton, this);

    this.topUIContainer.add([topMask, this.lvlSelectTxt, this.backBtn, this.sndBtn]);
  }

  OnClickingBackButton() {
    GA.GameAnalytics.addDesignEvent('ui:back_clicked');
    AudioManager.PlayButtonPressAudio();
    this.bBtnTween = new ButtonTween(this, this.backBtn);
    this.bBtnTween.btnTween.on('complete', () => {
      this.quitPopup.ShowQuitPopup();
    });
  }

  OnClickingSoundButton() {
    GA.GameAnalytics.addDesignEvent('ui:sound_clicked');
    AudioManager.PlayButtonPressAudio();
    this.sBtnTween = new ButtonTween(this, this.sndBtn);
    this.sBtnTween.btnTween.on('complete', () => {
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
    });
  }

  CreateBottomUI() {
    this.bottomUIContainer = this.add.container();

    const bottomMask = this.add.image(0, -80, 'bottom_mask').setOrigin(0.5);

    this.bottomUIContainer.add(bottomMask);
  }

  AddQuitPopup() {
    this.quitPopup = new QuitPopup(this);
  }

  resize(_newWidth, _newHeight, offsetWidth) {
    if (Constant.currentScene !== 'MenuScene') {
      return;
    }

    const newScale = Utils.GetScale(1080, 1920, _newWidth, _newHeight);
    Constant.clientHeight = _newHeight;
    Constant.clientWidth = _newWidth;
    Constant.newScale = newScale;
    this.BG.setDisplaySize(_newWidth, _newHeight);
    this.BG.setPosition(
      _newWidth / 2,
      _newHeight / 2
    );

    this.panelContainer.setScale(newScale);
    this.panelContainer.setPosition(_newWidth / 2,
      _newHeight / 2);

    this.topUIContainer?.setScale(newScale);
    this.topUIContainer?.setPosition(_newWidth / 2, 0);

    this.bottomUIContainer?.setScale(newScale);
    this.bottomUIContainer?.setPosition(_newWidth / 2, (_newHeight / 1));

    this.quitPopup.ResizeQuitContainer(_newWidth, _newHeight, newScale);

    const camera = this.cameras.main;
    camera.x = offsetWidth;
    camera.setViewport(offsetWidth, 0, _newWidth, _newHeight);
  }
}

