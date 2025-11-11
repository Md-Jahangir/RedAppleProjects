/* global localStorage */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 09-09-2024.
 * @Last_Update_By :- Tanmay Mukherjee.
 * @Last_Updatd_Date :- 09-09-2024
 * @Description :- Design and handling for the seting Ui.
 ************************************/

import Button from '../ui/Button';

class SettingPopup {
  constructor(scene) {
    this.scene = scene;
    this.CreateSettingPopup();
  }
  CreateSettingPopup() {
    this.CreateOverlay();

    this.settingPopupContainer = this.scene.add.container(0, 0);
    this.settingPopupContainer.setVisible(false);
    this.settingPopupContainer.setDepth(3);

    const settingMessageTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '32px', fill: '#FFF3F2', fontStyle: 'bold', align: 'center' };
    this.settingMessageText = this.scene.add.text(0, -110, 'SETTINGS', settingMessageTextStyle).setOrigin(0.5);
    this.settingPopupBase = this.scene.add.image(0, 0, 'popup_base');
    // this.settingPopupUpperBase = this.scene.add.image(0, -110, 'popup_upper_base');
    this.settingPopupContainer.add([this.settingPopupBase, this.settingMessageText]);

    this.CreateSoundButton();
    this.CreateMusicButton();
    this.CreateCloseButton();

    this.DefaultSoundButton();
    this.DefaultMusicButton();
  };

  //#region - Create overlay
  CreateOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0);
    this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    this.overlay.setInteractive();
    this.overlay.setDepth(3);
    this.overlay.setVisible(false);
  }
  //#endregion

  //#region - Show SettingPopup
  ShowSettingPopup() {
    this.overlay.setVisible(true);
    this.settingPopupContainer.setVisible(true);
    this.soundButton.enable();
    this.soundButton.show();
    this.soundButtonText.setVisible(true);
    this.musicButton.enable();
    this.musicButton.show();
    this.musicButtonText.setVisible(true);
    this.closeButton.enable();
    this.closeButton.show();
  }
  //#endregion

  //#region - Hide SettingPopup
  HideSettingPopup() {
    this.overlay.setVisible(false);
    this.settingPopupContainer.setVisible(false);
    this.soundButton.hide();
    this.soundButtonText.setVisible(false);
    this.musicButton.hide();
    this.musicButtonText.setVisible(false);
    this.closeButton.hide();
  }
  //#endregion

  //#region - CreateSoundButton
  CreateSoundButton() {
    this.soundButton = new Button(this.scene, 0, 0, 'toggle_button', true);
    this.soundButton.setFrame(1);
    const soundButtonTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '22px', fill: '#FFF3F2', fontStyle: 'normal', align: 'center' };
    this.soundButtonText = this.scene.add.text(0, -110, 'Sound', soundButtonTextStyle).setOrigin(0, 0.5).setVisible(false);
    this.soundButton.setClickCallback(this.OnSoundButtonClicked, this);
    this.soundButton.setDepth(5);
    this.soundButtonText.setDepth(5);
    this.soundButton.hide();
  }

  OnSoundButtonClicked() {
    this.ToggleSoundButton();
  }
  ResizeSoundButton(_newWidth, _newHeight, _newScale) {
    this.soundButton.setScale(_newScale);
    this.soundButton.setPosition((_newWidth / 2) - (100 * _newScale), (_newHeight / 2));
    this.soundButtonText.setScale(_newScale);
    this.soundButtonText.setPosition(this.soundButton.x + (100 * _newScale), this.soundButton.y);
  }
  //#endregion

  CreateMusicButton() {
    this.musicButton = new Button(this.scene, 0, 0, 'toggle_button', true);
    this.musicButton.setFrame(1);
    const musicButtonTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '22px', fill: '#FFF3F2', fontStyle: 'normal', align: 'center' };
    this.musicButtonText = this.scene.add.text(0, -110, 'Music', musicButtonTextStyle).setOrigin(0, 0.5).setVisible(false);
    this.musicButton.setClickCallback(this.OnMusicButtonClicked, this);
    this.musicButton.setDepth(5);
    this.musicButtonText.setDepth(5);
    this.musicButton.hide();
  }
  OnMusicButtonClicked() {
    this.ToggleMusicButton();
  }
  ResizeMusicButton(_newWidth, _newHeight, _newScale) {
    this.musicButton.setScale(_newScale);
    this.musicButton.setPosition((_newWidth / 2) - (100 * _newScale), (_newHeight / 2) + (100 * _newScale));
    this.musicButtonText.setScale(_newScale);
    this.musicButtonText.setPosition(this.musicButton.x + (100 * _newScale), this.musicButton.y);
  }
  //#endregion

  //#region - CreateMusicButton
  CreateCloseButton() {
    this.closeButton = new Button(this.scene, 0, 0, 'close_button');
    this.closeButton.setClickCallback(this.OnCloseButtonClicked, this);
    this.closeButton.setDepth(5);
    this.closeButton.hide();
  }
  OnCloseButtonClicked() {
    this.HideSettingPopup();
  }
  ResizeCloseButton(_newWidth, _newHeight, _newScale) {
    this.closeButton.setScale(_newScale);
    this.closeButton.setPosition((_newWidth / 2) + (314.56 * _newScale), (_newHeight / 2) - (120 * _newScale));
  }
  //#endregion


  DefaultSoundButton() {
    if (localStorage.getItem('texas_poker_is_sound_on') === null) {
      localStorage.setItem('texas_poker_is_sound_on', '1');
    }
    if (localStorage.getItem('texas_poker_is_sound_on') === '1') {
      this.soundButton.setFrame(1);
    } else {
      this.soundButton.setFrame(0);
    }
  };
  ToggleSoundButton() {
    if (localStorage.getItem('texas_poker_is_sound_on') === '1') {
      localStorage.setItem('texas_poker_is_sound_on', '0');
      this.soundButton.setFrame(0);
    } else {
      localStorage.setItem('texas_poker_is_sound_on', '1');
      this.soundButton.setFrame(1);
    }
  };

  DefaultMusicButton() {
    if (localStorage.getItem('texas_poker_is_music_on') === null) {
      localStorage.setItem('texas_poker_is_music_on', '1');
    }
    if (localStorage.getItem('texas_poker_is_music_on') === '1') {
      this.musicButton.setFrame(1);
    } else {
      this.musicButton.setFrame(0);
    }
  };
  ToggleMusicButton() {
    if (localStorage.getItem('texas_poker_is_music_on') === '1') {
      localStorage.setItem('texas_poker_is_music_on', '0');
      this.musicButton.setFrame(0);
      // SoundManager.StopBgMusic();
    } else {
      localStorage.setItem('texas_poker_is_music_on', '1');
      this.musicButton.setFrame(1);
      // SoundManager.PlayBgMusic();
    }
  };

  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.settingPopupContainer.setScale(_newScale);
    this.settingPopupContainer.setPosition((_newWidth / 2), (_newHeight / 2));
    this.ResizeSoundButton(_newWidth, _newHeight, _newScale);
    this.ResizeMusicButton(_newWidth, _newHeight, _newScale);
    this.ResizeCloseButton(_newWidth, _newHeight, _newScale);
  };
  //#endregion
}
export default SettingPopup;