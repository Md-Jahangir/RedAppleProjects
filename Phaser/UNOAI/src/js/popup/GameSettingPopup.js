/* eslint-disable no-unused-vars */
// /* eslint-disable no-console */
/* global  console,setTimeout */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 29-10-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 29-10-2025
 * @Description :- Design and handling for the seting Ui for game player etc.
 ************************************/

import Button from '../component/Button';
import { Constant } from '../utils/Constant';
import { Utils } from '../utils/Utils';
import { Model } from '../utils/Model';

class GameSettingPopup {
  constructor(scene) {
    this.scene = scene;
    this.CreateGameSettingPopup();
  }

  CreateGameSettingPopup() {
    this.CreateOverlay();
    this.gameSettingPopupContainer = this.scene.add.container(0, 0);
    this.gameSettingPopupContainer.setVisible(false);
    this.gameSettingPopupContainer.setDepth(3);
    this.CreatePlayerSelectionArea();
  };

  //#region - Create overlay
  CreateOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0);
    this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    this.overlay.setInteractive();
    this.overlay.setDepth(3);
    this.overlay.setVisible(false);
  };
  //#endregion

  CreatePlayerSelectionArea() {
    this.gameSettingPopupBase = this.scene.add.image(0, 0, 'popup_base');
    this.CreateCloseButton();
    const headingTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '52px', fill: '#FFF', fontStyle: 'bold', align: 'center' };
    this.headingText = this.scene.add.text(0, -250, Constant.SELECT_NUMBER_OF_PLAYERS, headingTextStyle).setOrigin(0.5);
    // this.SetHeadingText(Constant.SELECT_NUMBER_OF_PLAYERS);

    this.gameSettingPopupContainer.add([this.gameSettingPopupBase, this.headingText]);

    this.CreateNumberOfPlayersButton();

  };

  CreateNumberOfPlayersButton() {
    const centerX = Math.round(this.scene.scale.width / 2);
    const bottomY = Math.round(this.scene.scale.height);
    const buttonData = [
      { key: 'button_2_players', label: 2 },
      { key: 'button_3_players', label: 3 },
      { key: 'button_4_players', label: 4 }
    ];

    this.playerButtons = {};

    for (let i = 0; i < buttonData.length; i++) {
      const data = buttonData[i];
      const button = new Button(this.scene, centerX, bottomY, data.key);

      button.setDepth(3);
      button.hide();
      button.setClickCallback(() => this.OnPlayersNumberButtonClicked(data.label), this);

      this.playerButtons[data.label] = button;
    }
  };

  ResizeNumberOfPlayersButton(_newWidth, _newHeight, _newScale) {
    const posX = _newWidth / 2;
    const posY = (_newHeight / 2) + (50 * _newScale);

    const offsets = { 2: -330, 3: 0, 4: 330 };

    for (const label in this.playerButtons) {
      const button = this.playerButtons[label];
      const xOffset = offsets[label] * _newScale;

      button.setScale(_newScale);
      button.setPosition(posX + xOffset, posY);
    }
  };

  OnPlayersNumberButtonClicked(_this) {
    // console.log('OnPlayersNumberButtonClicked _this...........', _this);
    Model.SetNumberOfPlayersSelected(_this);
    setTimeout(() => {
      Utils.SceneTransition(this.scene, 'GameScene');
    }, 100);
  };

  CreateCloseButton() {
    this.closeButton = new Button(this.scene, 0, 0, 'button_cross');
    this.closeButton.setClickCallback(this.OnCloseButtonClicked, this);
    this.closeButton.setDepth(3);
    this.closeButton.hide();
  };
  OnCloseButtonClicked() {
    Model.SetNumberOfPlayersSelected(0);
    this.HideGameSettingPopup();
  };
  ResizeCloseButton(_newWidth, _newHeight, _newScale) {
    this.closeButton.setScale(_newScale);
    this.closeButton.setPosition((_newWidth / 2) + (580 * _newScale), (_newHeight / 2) - (380 * _newScale));
  };

  HidePlayerSelectionButtons() {
    for (const label in this.playerButtons) {
      const button = this.playerButtons[label];
      button.hide();
    }
  };

  ShowPlayerSelectionButtons() {
    for (const label in this.playerButtons) {
      const button = this.playerButtons[label];
      button.show();
      button.enable();
    }
  };

  HideCloseButton() {
    this.closeButton.hide();
  };
  ShowCloseButton() {
    this.closeButton.enable();
    this.closeButton.show();
  };

  //#region - Show SettingPopup
  ShowGameSettingPopup() {
    this.overlay.setVisible(true);
    this.gameSettingPopupContainer.setVisible(true);
    this.ShowPlayerSelectionButtons();
    this.ShowCloseButton();

  }
  //#endregion

  //#region - Hide SettingPopup
  HideGameSettingPopup() {
    this.overlay.setVisible(false);
    this.gameSettingPopupContainer.setVisible(false);
    this.HidePlayerSelectionButtons();
    this.HideCloseButton();
  };
  //#endregion

  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.gameSettingPopupContainer.setScale(_newScale);
    this.gameSettingPopupContainer.setPosition((_newWidth / 2), (_newHeight / 2));
    this.ResizeCloseButton(_newWidth, _newHeight, _newScale);
    this.ResizeNumberOfPlayersButton(_newWidth, _newHeight, _newScale);

  };
  //#endregion
}
export default GameSettingPopup;