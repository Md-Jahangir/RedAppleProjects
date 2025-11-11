/* global window */

/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Handling the Error message when some value missing or etc.
 ************************************/
import Phaser from 'phaser';
import { Utils } from '../Utils.js';
import Text from '../ui/Text.js';

export default class GameErrorScene extends Phaser.Scene {

  constructor() {
    super('GameErrorScene');
    this.errorMessage = 'Sorry ! Timer value missing...';
  };

  //#region - Load all images
  preload() {
    this.load.image('error_logo', 'assets/images/errorScene/error_logo.png');
  };
  //#endregion

  //#region - Create all images
  create() {
    this.game.events.on('resize', this.resize, this);

    this.errorLogo = this.add.image(Math.round(this.scale.width / 2), Math.round(this.scale.height / 4), 'error_logo').setOrigin(0.5);
    this.errorText = new Text(this, this.errorLogo.x, this.errorLogo.y + 120, {
      text: this.errorMessage,
      fontFamily: 'BAHNSCHRIFT',
      fontSize: '65px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: this.scale.width - 100 },
      shadow: {},
    }
    );

    this.resize(window.innerWidth, window.innerHeight);
  };
  //#endregion

  //#region - Resize
  resize(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(1080, 1920, _newWidth, _newHeight);

    // this.gameplayBg.setDisplaySize(newWidth, newHeight);
    this.errorLogo.setScale(newScale);
    this.errorLogo.setPosition(_newWidth / 2, _newHeight / 2);

    this.errorText.setScale(newScale);
    this.errorText.setPosition(this.errorLogo.x, this.errorLogo.y + (220 * newScale));
  };
  //#endregion

}