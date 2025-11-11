/* global setTimeout */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 30-10-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 30-10-2025
 * @Description :- Design and handling for the Quit game.
 ************************************/

import { Constant } from '../utils/Constant';
import Button from '../component/Button';
import { Utils } from '../utils/Utils';

class QuitPopup {
  constructor(scene) {
    this.scene = scene;
    this.quitPopupContainer = null;
    this.overlay = null;

    this.CreateQuitPopup();
  }

  //#region - Quit Popup
  CreateQuitPopup() {
    this.CreateOverlay();
    this.quitPopupContainer = this.scene.add.container(0, 0);
    this.quitPopupContainer.setVisible(false);
    this.quitPopupContainer.setDepth(5);
    this.CreateBaseAndHeading();
  };
  //#endregion

  //#region - Create Overlay
  CreateOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0);
    this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    this.overlay.setInteractive();
    this.overlay.setDepth(5);
    this.overlay.setVisible(false);
  };
  //#endregion

  //#region - Base and Heading
  CreateBaseAndHeading() {
    this.quitPopupBase = this.scene.add.image(0, 0, 'popup_base').setScale(0.7);
    const headingTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '52px', fill: '#FFF', fontStyle: 'bold', align: 'center' };
    this.headingText = this.scene.add.text(0, -210, Constant.QUIT_HEADING, headingTextStyle).setOrigin(0.5);
    this.CreateMessageArea();

    this.CreateYesButton();
    this.CreateNoButton();

    this.quitPopupContainer.add([this.quitPopupBase, this.headingText, this.messageText]);

  };
  //#endregion

  CreateMessageArea() {
    const messageTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '48px', fill: '#FFF', fontStyle: 'bold', align: 'center' };
    this.messageText = this.scene.add.text(0, -60, Constant.DO_YOU_WANT_QUIT, messageTextStyle).setOrigin(0.5);
  };

  //#region - Yes button
  CreateYesButton() {
    this.yesButton = new Button(this.scene, 0, 0, 'button_yes');
    this.yesButton.setClickCallback(this.OnYesButtonClicked, this);
    this.yesButton.setDepth(5);
    this.yesButton.hide();
  };
  OnYesButtonClicked() {
    this.HideQuitPopup();
    setTimeout(() => {
      Utils.SceneTransition(this.scene, 'MenuScene');
    }, 200);
  };
  ResizeYesButton(_newWidth, _newHeight, _newScale) {
    this.yesButton.setScale(_newScale);
    this.yesButton.setPosition((_newWidth / 2) - (180 * _newScale), (_newHeight / 2) + (130 * _newScale));
  };
  //#endregion

  //#region - No button
  CreateNoButton() {
    this.noButton = new Button(this.scene, 0, 0, 'button_no');
    this.noButton.setClickCallback(this.OnNoButtonClicked, this);
    this.noButton.setDepth(5);
    this.noButton.hide();
  };
  OnNoButtonClicked() {
    this.HideQuitPopup();
  };
  ResizeNoButton(_newWidth, _newHeight, _newScale) {
    this.noButton.setScale(_newScale);
    this.noButton.setPosition((_newWidth / 2) + (180 * _newScale), (_newHeight / 2) + (130 * _newScale));
  };
  //#endregion


  //#region - Show Quit popup
  ShowQuitPopup() {
    this.overlay.setVisible(true);
    this.quitPopupContainer.setVisible(true);
    this.yesButton.show();
    this.noButton.show();
  };
  //#endregion

  //#region - Hide Quit popup
  HideQuitPopup() {
    this.overlay.setVisible(false);
    this.quitPopupContainer.setVisible(false);
    this.yesButton.hide();
    this.noButton.hide();

  };
  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.quitPopupContainer.setScale(_newScale);
    this.quitPopupContainer.setPosition((_newWidth / 2), (_newHeight / 2));
    this.ResizeYesButton(_newWidth, _newHeight, _newScale);
    this.ResizeNoButton(_newWidth, _newHeight, _newScale);
  };
  //#endregion
}
export default QuitPopup;