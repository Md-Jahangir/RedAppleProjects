/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Design and handling for Win popup.
 ************************************/

class WinPopup {
  constructor(scene) {
    this.scene = scene;
    this.winPopupContainer = null;
    this.overlay = null;
    this.winMessageText = null;
    this.winAmountText = null;

    this.winnerDataShowPosY = null;

    this.create();
  };
  //#############################################################################################

  //#region - Create all images
  create() {
    this.winnerDataShowPosY = -400;
    this.CreateOverlay();
    this.winPopupContainer = this.scene.add.container(0, 0);
    this.winPopupContainer.setVisible(false);
    this.winPopupContainer.setDepth(2);
    this.CreateWinText();
    // this.ShowWinPopup();
  };
  //#endregion

  //#region - Create Overlay
  CreateOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0);
    this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    this.overlay.setInteractive();
    this.overlay.setDepth(2);
    this.overlay.setVisible(false);
  };
  //#endregion

  //#region - Create Win text
  CreateWinText() {
    // const winMessageTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '144px', fill: '#F7B731', fontStyle: 'bold', align: 'center' };
    // this.winMessageText = this.scene.add.text(0, this.winnerDataShowPosY, 'You Win', winMessageTextStyle).setOrigin(0.5);
    // const winAmountTextStyle = { fontFamily: 'Poppins-SemiBold', fontSize: '51px', fill: '#FFF3F2', fontStyle: 'bold', align: 'center' };
    // this.winAmountText = this.scene.add.text(this.winMessageText.x + 30, this.winMessageText.y + 120, '200k', winAmountTextStyle).setOrigin(0.5);
    // this.chip = this.scene.add.image(this.winAmountText.x - 120, this.winAmountText.y - 2, 'poker_chip_popup').setOrigin(0.5).setScale(1.8);

    // this.winPopupContainer.add([this.winMessageText, this.winAmountText, this.chip]);
  };
  SetWinAmountAndName(_name, _amount) {
    this.winMessageText.setText(`${_name} WIN`);
    this.winAmountText.setText(_amount);
  }
  //#endregion

  //#region - Show Win popup
  ShowWinPopup() {
    this.winPopupContainer.setVisible(true);
    this.overlay.setVisible(true);
  };
  //#endregion

  //#region - Hide Win popup
  HideWinPopup() {
    this.winPopupContainer.setVisible(false);
    this.overlay.setVisible(false);
  };
  //#endregion

  AdjustWinnerShowData(_status) {
    if (_status) {
      this.winnerDataShowPosY = -400;
    }
    else {
      this.winnerDataShowPosY = 150;
    }
    this.winMessageText.y = this.winnerDataShowPosY;
    this.winAmountText.y = this.winMessageText.y + 120;
    this.chip.y = this.winAmountText.y - 2;
  }

  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.winPopupContainer.setScale(_newScale);
    this.winPopupContainer.setPosition((_newWidth / 2), (_newHeight / 2));
  };
  //#endregion

};

export default WinPopup;