/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 13-11-2024
 * @Description :- Design and handling for the Alert message.
 ************************************/
import Button from '../ui/Button.js';
import { Client } from '../services/Client.js';
import { Constant } from '../Constant.js';

class AlertPopup {
  constructor(scene) {
    this.scene = scene;
    this.alertPopupContainer = null;
    this.overlay = null;
    this.base = null;
    this.HeadingText = null;
    this.messageText = null;
    this.CreateAlertPopup();
  };
  //#endregion

  //#region - Creat Alert popup
  CreateAlertPopup() {
    this.CreateOverlay();
    this.alertPopupContainer = this.scene.add.container(0, 0);
    this.alertPopupContainer.setDepth(5);
    this.CreateBaseAndText();
    this.CreateCrossButton();
    this.HideAlertPopup();
  };
  //#endregion

  //#region - Overlay
  CreateOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0);
    this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    this.overlay.setInteractive();
    this.overlay.setDepth(5);
  };
  //#endregion

  //#region - Base Heading Text Message Text
  CreateBaseAndText() {
    this.base = this.scene.add.image(0, 0, 'popup_base').setOrigin(0.5);
    const headingTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '56px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.base.width - 30 } };
    this.HeadingText = this.scene.add.text(this.base.x, this.base.y - 150, 'Alert !', headingTextStyle).setOrigin(0.5);
    const messageTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '40px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.base.width - 30 } };
    this.messageText = this.scene.add.text(this.base.x, this.base.y + 70, 'Yes get error now go to game please', messageTextStyle).setOrigin(0.5);
    this.alertPopupContainer.add([this.base, this.HeadingText, this.messageText]);
  };
  //#endregion

  //#region - Cross Button 
  CreateCrossButton() {
    this.crossButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'close_button');
    this.crossButton.setClickCallback(this.OnCrossButtonClicked, this);
    this.crossButton.setDepth(5);
  };
  //#endregion

  //#region - Cross Button Cliked
  OnCrossButtonClicked() {
    this.HideAlertPopup();
    if (Constant.isTournamentCompleted) {
      Client.LeaveRoom();
    }
  };
  //#endregion

  //#region - Cross Button Resize
  ResizeCrossButton(_newWidth, _newHeight, _newScale) {
    this.crossButton.setScale(_newScale);
    this.crossButton.setPosition((_newWidth / 2) + (((this.base.width / 2) * _newScale) - (80 * _newScale)), (_newHeight / 2) - (((this.base.height / 2) * _newScale) - (80 * _newScale)));
  };
  //#endregion

  //#region - Show Alert popup
  ShowAlertPopup(_msg) {
    this.messageText.setText(_msg);
    this.overlay.setVisible(true);
    this.alertPopupContainer.setVisible(true);
    this.crossButton.show();
    this.crossButton.enable();
  };
  //#endregion

  //#region - Hide Alert popup
  HideAlertPopup() {
    this.overlay.setVisible(false);
    this.alertPopupContainer.setVisible(false);
    this.crossButton.hide();
  };
  //#endregion

  OverlayPressed() { }

  //#region - Resize All
  resize(_newWidth, _newHeight, _newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.alertPopupContainer.setScale(_newScale);
    this.alertPopupContainer.setPosition((_newWidth / 2), (_newHeight / 2));
    this.ResizeCrossButton(_newWidth, _newHeight, _newScale);
  };
  //#endregion

};
export default AlertPopup;