/********* Script_Details ************
 * @Original_Creator :- Tanmay Mukherjee.
 * @Created_Date :- 04-10-2024.
 * @Last_Update_By :- Tanmay Mukherjee.
 * @Last_Updatd_Date :-  04-10-2024
 * @Description :- Design and handling for the Alert message.
 ************************************/

import Button from '../ui/Button.js';
class TournamentStageOverPopup {
  constructor(scene) {
    this.scene = scene;
    this.tournamentStageOverContainer = null;
    this.overlay = null;
    this.base = null;

    this.CreateTournamentStageOverPopup();
  }

  //#region - Creat TournamentStageOver popup
  CreateTournamentStageOverPopup() {
    this.CreateOverlay();

    this.tournamentStageOverContainer = this.scene.add.container(0, 0);
    this.tournamentStageOverContainer.setDepth(5);

    this.base = this.scene.add.image(0, 0, 'popup_base').setOrigin(0.5);
    // this.upperBase = this.scene.add.image(0, -110, 'popup_upper_base');
    const messageTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '45px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.base.width - 10 } };
    this.messageText = this.scene.add.text(this.base.x, this.base.y + 35, '', messageTextStyle).setOrigin(0.5);
    this.messageCounter = this.scene.add.text(this.base.x, this.base.y - 110, '', messageTextStyle).setOrigin(0.5);

    this.tournamentStageOverContainer.add([this.base, this.messageText, this.messageCounter]);

    this.CreateCrossButton();

    this.HideTournamentStageOverPopup();
  };
  //#endregion

  //#region - Create overlay
  CreateOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0);
    this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    this.overlay.setInteractive();
    this.overlay.setDepth(5);
    // this.overlay.setVisible(false);
  };
  //#endregion

  //#region - Create cross button section
  CreateCrossButton() {
    this.crossButton = new Button(this.scene, Math.round(this.scene.scale.width / 2), Math.round(this.scene.scale.height), 'close_button');
    this.crossButton.setClickCallback(this.OnCrossButtonClicked, this);
    this.crossButton.setDepth(5);
  };

  OnCrossButtonClicked() {
    // console.log('Coming Soon');
  };

  ResizeCrossButton(_newWidth, _newHeight, _newScale) {
    this.crossButton.setScale(_newScale);
    this.crossButton.setPosition((_newWidth / 2) + (((this.base.width / 2) * _newScale) - (40 * _newScale)), (_newHeight / 2) - (((this.base.height / 2) * _newScale) - (50 * _newScale)));
  };
  //#endregion

  //#region - Show Alert popup
  ShowTournamentStageOverPopup(_msg) {
    this.messageText.setText(_msg);
    this.overlay.setVisible(true);
    this.tournamentStageOverContainer.setVisible(true);
    // this.crossButton.show();
    // this.crossButton.enable();
  };
  //#endregion

  //#region - Hide Alert popup
  HideTournamentStageOverPopup() {
    this.overlay.setVisible(false);
    this.tournamentStageOverContainer.setVisible(false);
    this.crossButton.hide();
  };
  //#endregion

  //#region - Update StageOver Counter
  UpdateStageOverCounter(_counter) {
    this.messageCounter.setText(_counter);
  }
  //#endregion


  OverlayPressed() { }

  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.tournamentStageOverContainer.setScale(_newScale);
    this.tournamentStageOverContainer.setPosition((_newWidth / 2), (_newHeight / 2));
    this.ResizeCrossButton(_newWidth, _newHeight, _newScale);
  };
  //#endregion
}
export default TournamentStageOverPopup;