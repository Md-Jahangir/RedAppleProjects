 
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Design and handling for the Leaving game.
 ************************************/

import { Client } from '../services/Client';
import Button from '../ui/Button';

class LeavingPopup {
  constructor(scene) {
    this.scene = scene;
    this.leavingPopupContainer = null;
    this.overlay = null;

    this.create();
  }
  create() {
    this.CreateOverlay();
    this.leavingPopupContainer = this.scene.add.container(0, 0);
    // this.leavingPopupContainer.setVisible(false);
    this.leavingPopupContainer.setDepth(3);

    this.leavingPopupBase = this.scene.add.image(0, 0, 'popup_base');
    const leaveMessageTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '52px', fill: '#FFF3F2', fontStyle: 'bold', align: 'center' };
    this.leaveMessageText = this.scene.add.text(this.leavingPopupBase.x, this.leavingPopupBase.y - 150, 'Do You Want to Exit ?', leaveMessageTextStyle).setOrigin(0.5);
    // this.leavingPopupUpperBase = this.scene.add.image(0, -110, 'popup_upper_base');
    this.leavingPopupContainer.add([this.leavingPopupBase, this.leaveMessageText]);

    this.CreatePopupButtons();
    this.HideLeavingPopup();
  }
  //#region - Create Overlay
  CreateOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0);
    this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    this.overlay.setInteractive();
    this.overlay.setDepth(3);
    // this.overlay.setVisible(false);
  };
  //#endregion

  //#region - Create Overlay
  CreatePopupButtons() {

    this.yesButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'buy_in_popup_yesBut');
    this.yesButton.setClickCallback(this.OnYesButtonClicked, this);
    this.yesButton.setDepth(5);
    // this.yesButton.hide();
    const yesButtonTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '36px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.yesButton.width - 10 } };
    this.yesButton.setDepth(5);
    this.yesButtonText = this.scene.add.text(this.yesButton.x, this.yesButton.y, 'Yes', yesButtonTextStyle).setOrigin(0.5).setDepth(5);

    this.noButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'buy_in_popup_noBut');
    this.noButton.setClickCallback(this.OnNoButtonClicked, this);
    this.noButton.setDepth(5);
    // this.noButton.hide();
    const noButtonTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '36px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.noButton.width - 10 } };
    this.noButton.setDepth(5);
    this.noButtonText = this.scene.add.text(this.noButton.x, this.noButton.y, 'No', noButtonTextStyle).setOrigin(0.5).setDepth(5);
  };

  OnYesButtonClicked() {
    // console.log('leave button');
    Client.LeaveRoom();
    this.HideLeavingPopup();
    // Client.DisconnectSocket();
  };

  ResizeYesButton(_newWidth, _newHeight, _newScale) {
    this.yesButton.setScale(_newScale);
    this.yesButton.setPosition((_newWidth / 2) - (150 * _newScale), (_newHeight / 2) + (71 * _newScale));
    this.yesButtonText.setScale(_newScale);
    this.yesButtonText.copyPosition(this.yesButton);
  };

  OnNoButtonClicked() {
    this.HideLeavingPopup();
  };

  ResizeNoButton(_newWidth, _newHeight, _newScale) {
    this.noButton.setScale(_newScale);
    this.noButton.setPosition((_newWidth / 2) + (150 * _newScale), (_newHeight / 2) + (71 * _newScale));
    this.noButtonText.setScale(_newScale);
    this.noButtonText.copyPosition(this.noButton);
  };
  //#endregion

  //#region - Show Loading popup
  ShowLeavingPopup() {
    this.overlay.setVisible(true);
    this.leavingPopupContainer.setVisible(true);
    this.yesButton.show();
    this.yesButton.enable();
    this.noButton.show();
    this.noButton.enable();
    this.yesButtonText.setVisible(true);
    this.noButtonText.setVisible(true);
  };
  //#endregion

  //#region - Hide Leaving popup
  HideLeavingPopup() {
    this.overlay.setVisible(false);
    this.leavingPopupContainer.setVisible(false);
    this.yesButton.hide();
    this.noButton.hide();
    this.yesButtonText.setVisible(false);
    this.noButtonText.setVisible(false);
  };
  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.leavingPopupContainer.setScale(_newScale);
    this.leavingPopupContainer.setPosition((_newWidth / 2), (_newHeight / 2));
    this.ResizeYesButton(_newWidth, _newHeight, _newScale);
    this.ResizeNoButton(_newWidth, _newHeight, _newScale);
  };
  //#endregion
}
export default LeavingPopup;