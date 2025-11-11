// /* eslint-disable no-console */
// /* global  console */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 29-10-2025.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 29-10-2025
 * @Description :- Design and handling for the seting Ui for game player etc.
 ************************************/

import Button from '../component/Button';
import { Constant } from '../utils/Constant';

class InfoPopup {
  constructor(scene) {
    this.scene = scene;
    this.CreateInfoPopup();
  }

  //#region - Info Popup
  CreateInfoPopup() {
    this.CreateOverlay();
    this.infoPopupContainer = this.scene.add.container(0, 0);
    this.infoPopupContainer.setVisible(false);
    this.infoPopupContainer.setDepth(4);
    this.CreateBaseAndHeading();
  };
  //#endregion

  //#region - Create overlay
  CreateOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0);
    this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    this.overlay.setInteractive();
    this.overlay.setDepth(4);
    this.overlay.setVisible(false);
  };
  //#endregion

  //#region - Base and Heading
  CreateBaseAndHeading() {
    this.infoPopupBase = this.scene.add.image(0, 0, 'popup_base');
    const headingTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '52px', fill: '#FFF', fontStyle: 'bold', align: 'center' };
    this.headingText = this.scene.add.text(0, -350, Constant.HOW_TO_PLAY, headingTextStyle).setOrigin(0.5);

    this.CreateMessageArea();

    this.CreateCloseButton();

    this.infoPopupContainer.add([this.infoPopupBase, this.headingText, this.messageText]);

  };
  //#endregion

  CreateMessageArea() {
    const messageTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '26px', fill: '#FFF', fontStyle: 'bold', align: 'center', wordWrap: { width: this.infoPopupBase.width - 40 }, };
    this.messageText = this.scene.add.text(0, 0, Constant.HOW_TO_PLAY_MESSAGE, messageTextStyle).setOrigin(0.5);

  };

  //#region - Close button
  CreateCloseButton() {
    this.closeButton = new Button(this.scene, 0, 0, 'button_cross');
    this.closeButton.setClickCallback(this.OnCloseButtonClicked, this);
    this.closeButton.setDepth(4);
    this.closeButton.hide();
  };
  OnCloseButtonClicked() {
    Constant.numberOfPlayerSelected = 0;
    this.HideInfoPopup();
  };
  ResizeCloseButton(_newWidth, _newHeight, _newScale) {
    this.closeButton.setScale(_newScale);
    this.closeButton.setPosition((_newWidth / 2) + (580 * _newScale), (_newHeight / 2) - (380 * _newScale));
  };

  HideCloseButton() {
    this.closeButton.hide();
  };
  ShowCloseButton() {
    this.closeButton.enable();
    this.closeButton.show();
  };
  //#endregion

  //#region - Show Info popup
  ShowInfoPopup() {
    this.overlay.setVisible(true);
    this.infoPopupContainer.setVisible(true);
    this.ShowCloseButton();
  }
  //#endregion

  //#region - Hide info popup 
  HideInfoPopup() {
    this.overlay.setVisible(false);
    this.infoPopupContainer.setVisible(false);
    this.HideCloseButton();
  };
  //#endregion

  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.infoPopupContainer.setScale(_newScale);
    this.infoPopupContainer.setPosition((_newWidth / 2), (_newHeight / 2));
    this.ResizeCloseButton(_newWidth, _newHeight, _newScale);

  };
  //#endregion
}
export default InfoPopup;