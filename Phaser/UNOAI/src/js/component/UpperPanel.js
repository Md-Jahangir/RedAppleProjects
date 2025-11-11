
// /* eslint-disable no-undef */

/*global localStorage*/
// /* eslint-disable no-console */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 30-10-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 30-10-2025
 * @Description :- Design and Handle the Upper section of the gameplay page.
 ************************************/

import Button from './Button.js';
import InfoPopup from '../popup/InfoPopup.js';
import QuitPopup from '../popup/QuitPopup.js';

class UpperPanel {
  constructor(_scene) {
    this.scene = _scene;
    this.create();
  }
  create() {
    this.CreateBackButton();
    this.CreateInfoButton();
    this.CreateSoundButton();

    this.infoPopup = new InfoPopup(this.scene);
    this.quitPopup = new QuitPopup(this.scene);
  };

  //#region - Back button
  CreateBackButton() {
    this.backButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'button_back');
    this.backButton.setClickCallback(this.OnBackButtonClicked, this);
    this.ShowHideBackButton();
  };

  OnBackButtonClicked() {
    this.quitPopup.ShowQuitPopup();
  };

  ResizeBackButton(_newWidth, _newHeight, _newScale) {
    this.backButton.setScale(_newScale);
    this.backButton.setPosition((80 * _newScale), (70 * _newScale));
  };

  ShowHideBackButton() {
    if (this.scene.scene.key === 'GameScene') {
      this.backButton.show();
    } else {
      this.backButton.hide();
    }
  }
  //#endregion

  //#region - Info button
  CreateInfoButton() {
    this.infoButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'button_info');
    this.infoButton.setClickCallback(this.OnInfoButtonClicked, this);
    this.ShowHideInfoButton();
  };

  OnInfoButtonClicked() {
    this.infoPopup.ShowInfoPopup();
  };

  ResizeInfoButton(_newWidth, _newHeight, _newScale, _sceneName) {
    let xOffset = null;
    if (_sceneName.scene.key === 'GameScene') {
      xOffset = 200;
    } else {
      xOffset = 80;
    }
    this.infoButton.setScale(_newScale);
    this.infoButton.setPosition((xOffset * _newScale), (70 * _newScale));
  };

  ShowHideInfoButton() {
    if (this.scene.scene.key === 'GameScene') {
      this.infoButton.hide();
    } else {
      this.infoButton.show();
    }
  }
  //#endregion

  //#region - Sound button
  CreateSoundButton() {
    this.soundButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'button_sound_on');
    this.soundButton.setClickCallback(this.OnSoundButtonClicked, this);
    this.DefaultSoundButton();
  };

  OnSoundButtonClicked() {
    this.ToggleSoundButton();
  };

  ResizeSoundButton(_newWidth, _newHeight, _newScale) {
    this.soundButton.setScale(_newScale);
    this.soundButton.setPosition(_newWidth - (90 * _newScale), (70 * _newScale));
  };

  DefaultSoundButton() {
    if (localStorage.getItem('uno_is_sound_on') === null) {
      localStorage.setItem('uno_is_sound_on', '1');
    }
    if (localStorage.getItem('uno_is_sound_on') === '1') {
      this.soundButton.setTexture('button_sound_on');
    } else {
      this.soundButton.setTexture('button_sound_off');
    }
  };
  ToggleSoundButton() {
    if (localStorage.getItem('uno_is_sound_on') === '1') {
      localStorage.setItem('uno_is_sound_on', '0');
      this.soundButton.setTexture('button_sound_off');
    } else {
      localStorage.setItem('uno_is_sound_on', '1');
      this.soundButton.setTexture('button_sound_on');
    }
  };

  //#endregion

  //#################################################################


  //#region - Resize all
  resize(_newWidth, _newHeight, _newScale) {
    this.ResizeBackButton(_newWidth, _newHeight, _newScale);
    this.ResizeInfoButton(_newWidth, _newHeight, _newScale, this.scene);
    this.ResizeSoundButton(_newWidth, _newHeight, _newScale);
    this.infoPopup.resize(_newWidth, _newHeight, _newScale);
    this.quitPopup.resize(_newWidth, _newHeight, _newScale);
  };
  //#endregion
}
export default UpperPanel;