/* global window,console */

/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 24-01-2025
 * @Description :- Handling the Error message when some value missing or etc.
 ************************************/
import Phaser from 'phaser';
import { SelectedResolution } from '../ResolutionSelector.js';
import { Utils } from '../Utils.js';

export default class GameErrorScene extends Phaser.Scene {

  constructor() {
    super('GameErrorScene');
    this.errorMessage = '';
  };

  //#region - Load all images
  preload() {
    this.load.image('error_logo', 'assets/images/errorScene/error_logo.png');
  };
  //#endregion

  //#region - Create all images
  create(_data) {
    this.game.events.on('resize', this.resize, this);

    // eslint-disable-next-line no-console
    console.log('Error scene data !', _data);
    if (_data) {
      if (_data.auth) {
        this.errorMessage = `Type=${_data.type}\nAuth= presents`;
      } else {
        this.errorMessage = `Type=${_data.type}\nAuth= not presents`;
      }
    }
    this.game.events.on('resize', this.resize, this);

    this.errorLogo = this.add.image(Math.round(this.scale.width / 2), Math.round(this.scale.height / 4), 'error_logo').setOrigin(0.5);
    const errorTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '65px', fill: '#FFF', fontStyle: 'normal', align: 'center' };
    this.errorText = this.add.text(0, 0, this.errorMessage, errorTextStyle).setOrigin(0.5);


    this.resize(window.innerWidth, window.innerHeight);
  };
  //#endregion

  //#region - Resize
  resize(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, _newWidth, _newHeight);

    // this.gameplayBg.setDisplaySize(newWidth, newHeight);
    this.errorLogo.setScale(newScale);
    this.errorLogo.setPosition(_newWidth / 2, _newHeight / 2);

    this.errorText.setScale(newScale);
    this.errorText.setPosition(this.errorLogo.x, this.errorLogo.y + (150 * newScale));
  };
  //#endregion
}