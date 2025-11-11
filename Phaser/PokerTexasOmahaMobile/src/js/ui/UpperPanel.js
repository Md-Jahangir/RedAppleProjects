
/*global */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Design and Handlethe bottom section of the gameplay page.
 ************************************/
import Button from './Button.js';

class UpperPanel {
  constructor(_scene) {
    this.scene = _scene;
    this.create();
  };
  create() {
    this.CreateLeaveRoomButton();
    this.CreateSettingButton();
    this.CreateSitOutButton();
  };
  //=================== LEAVE ROOM BUTTON ================================
  //#region - Create leave button section
  CreateLeaveRoomButton() {
    this.leaveButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'leave_button');
    this.leaveButton.setClickCallback(this.OnLeaveRoomButtonClicked, this);
  };
  OnLeaveRoomButtonClicked() {
    this.scene.LeavingPopUpshow();
  };
  ResizeLeaveRoomButton(_newWidth, _newHeight, _newScale) {
    this.leaveButton.setScale(_newScale);
    this.leaveButton.setPosition((33 * _newScale) + (this.leaveButton.getWidth() * 0.5), ((139 * _newScale)) + (this.leaveButton.getHeight() * 0.5));
  };
  //#endregion
  //#################################################################

  //====================== SETTING BUTTON =============================
  //#region - Create setting button section
  CreateSettingButton() {
    this.settingButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'setting_button');
    this.settingButton.setClickCallback(this.OnSettingButtonClicked, this);
    this.settingButton.hide();
  };
  OnSettingButtonClicked() {
    this.scene.SettingPopupshow();
  };
  ResizeSettingButton(_newWidth, _newHeight, _newScale) {
    this.settingButton.setScale(_newScale);
    this.settingButton.setPosition(((_newWidth) - ((87 * _newScale) - (this.settingButton.getWidth() * 0.5))), (29 * _newScale) + (this.settingButton.getHeight() * 0.5));
  };
  //#endregion
  //#################################################################

  //====================== WAITING SIT BUTTON =============================
  //#region - Create waiting sit button section
  CreateSitOutButton() {
    this.waitingSitButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'waiting_sit_button');
    this.waitingSitButton.setClickCallback(this.OnSitOutButtonClicked, this);
  };
  OnSitOutButtonClicked() {
    this.scene.SitOut();
  };
  ResizeSitOutButton(_newWidth, _newHeight, _newScale) {
    this.waitingSitButton.setScale(_newScale);
    this.waitingSitButton.setPosition(_newWidth - (33 * _newScale) - (this.waitingSitButton.getWidth() * 0.5), ((139 * _newScale)) + (this.waitingSitButton.getHeight() * 0.5));
  };
  //#endregion
  //#################################################################

  //#region - Resize all
  resize(_newWidth, _newHeight, _newScale) {
    this.ResizeLeaveRoomButton(_newWidth, _newHeight, _newScale);
    this.ResizeSettingButton(_newWidth, _newHeight, _newScale);
    this.ResizeSitOutButton(_newWidth, _newHeight, _newScale);
  };
  //#endregion
}
export default UpperPanel;