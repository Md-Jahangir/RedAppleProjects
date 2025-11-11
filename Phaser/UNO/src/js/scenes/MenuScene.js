/* eslint-disable no-console */
/* global window,console */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 28-10-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 28-10-2025
 * @Description :- Control the full gameplay.
 ************************************/

import Phaser from 'phaser';
import { SelectedResolution } from '../utils/ResolutionSelector.js';
import { Utils } from '../utils/Utils.js';
import { Constant } from '../utils/Constant.js';
import Button from '../component/Button.js';
import GameSettingPopup from '../popup/GameSettingPopup.js';
import UpperPanel from '../component/UpperPanel.js';
// import InfoPopup from '../popup/InfoPopup.js';
// import QuitPopup from '../popup/QuitPopup.js';

export default class MenuScene extends Phaser.Scene {

  constructor() {
    super('MenuScene');

  };

  init() { };
  preload() {
    console.log('MENU');

  };

  //#region - Create all images
  create() {
    this.game.events.on('resize', this.resize, this);

    this.CreateMenuBg();
    this.CreateGameLogo();
    this.CreatePlayButton();
    // this.CreateInfoButton();
    this.upperPanel = new UpperPanel(this);
    this.gameSettingPopup = new GameSettingPopup(this);
    // this.infoPopup = new InfoPopup(this);
    // this.quitPopup = new QuitPopup(this);

    this.resize(window.innerWidth, window.innerHeight);
  };

  //#region - Create Bg
  CreateMenuBg() {
    this.menuBg = this.add.image(0, 0, 'bg_menu').setOrigin(0);
    const versionControlTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '20px', fill: '#FFF', fontStyle: 'normal', align: 'right' };
    this.versionControlText = this.add.text(0, 0, `V  ${Constant.VERSION_TEXT}`, versionControlTextStyle).setOrigin(0.5);
  };
  ResizeCreateMenuBg(_newWidth, _newHeight, _newScale) {
    this.menuBg.setDisplaySize(_newWidth, _newHeight);
    this.versionControlText.setScale(_newScale);
    this.versionControlText.setPosition(50 * _newScale, _newHeight - (50 * _newScale));
  };
  //#endregion

  //#region - Game logo
  CreateGameLogo() {
    this.gameLogo = this.add.image(0, 0, 'logo');
  };
  ResizeGameLogo(_newWidth, _newHeight, _newScale) {
    this.gameLogo.setScale(_newScale);
    this.gameLogo.setPosition(((_newWidth / 2)), (_newHeight / 2) - (150 * _newScale));
  };
  //#endregion

  //#region - Play button
  CreatePlayButton() {
    this.playButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height), 'button_play');
    this.playButton.setClickCallback(this.OnPlayButtonClicked, this);
  };

  OnPlayButtonClicked() {
    this.gameSettingPopup.ShowGameSettingPopup();
  };

  ResizePlayButton(_newWidth, _newHeight, _newScale) {
    this.playButton.setScale(_newScale);
    this.playButton.setPosition(((_newWidth / 2)), (_newHeight / 2) + (340 * _newScale));
  };
  //#endregion

  //#region - Info button
  // CreateInfoButton() {
  //   this.infoButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height), 'button_info');
  //   this.infoButton.setClickCallback(this.OnInfoButtonClicked, this);
  // };

  // OnInfoButtonClicked() {
  //   this.infoPopup.ShowInfoPopup();
  // };

  // ResizeInfoButton(_newWidth, _newHeight, _newScale) {
  //   this.infoButton.setScale(_newScale);
  //   this.infoButton.setPosition(((_newWidth / 2) - (850 * _newScale)), ((_newHeight / 2) - 270) * _newScale);
  // };
  //#endregion

  //#region - Resize
  resize(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, _newWidth, _newHeight);
    this.currentNewScale = newScale;
    this.ResizeCreateMenuBg(_newWidth, _newHeight, newScale);
    this.ResizeGameLogo(_newWidth, _newHeight, newScale);
    this.ResizePlayButton(_newWidth, _newHeight, newScale);
    this.upperPanel.resize(_newWidth, _newHeight, newScale);
    this.gameSettingPopup.resize(_newWidth, _newHeight, newScale);
    // this.ResizeInfoButton(_newWidth, _newHeight, newScale);
    // this.infoPopup.resize(_newWidth, _newHeight, newScale);
    // this.quitPopup.resize(_newWidth, _newHeight, newScale);

  };
  //#endregion

}