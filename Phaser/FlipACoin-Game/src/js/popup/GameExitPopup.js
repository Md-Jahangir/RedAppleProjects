/********* Script_Details ************
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 23-10-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 26-11-2024
 * @Description :-GameOver Popup.
 ************************************/

/* global */
export default class GameExit {
  constructor(_scene) {
    this.scene = _scene;
    this.create();
  }
  //#region -create
  create() {
    this.overlay = this.scene.add.image(0, 0, 'background')
      .setOrigin(0.5)
      .setInteractive();

    this.container = this.scene.add.container(0, 0).bringToTop();
    const gameExitDialog = ['Do you want to leave', '        the Game?'];
    this.gameExit = this.scene.add.text(0, -300, gameExitDialog, { fontFamily: 'CarosExtraBold', fontSize: 65, color: '#231440' })
      .setOrigin(0.5);

    this.yesButton = this.scene.add.image(0, 250, 'yesButtonBase')
      .setOrigin(0.5)
      .setInteractive();
    this.yesButtonText = this.scene.add.text(0, 0, 'Yes', { fontFamily: 'CarosExtraBold', fontSize: 40, color: '#231440' })
      .setOrigin(0.5, 0.5)
      .copyPosition(this.yesButton);

    this.noButton = this.scene.add.image(0, 50, 'gameStartLoadingBar')
      .setOrigin(0.5)
      .setInteractive();
    this.noButtonText = this.scene.add.text(0, 0, 'No', { fontFamily: 'CarosExtraBold', fontSize: 40 })
      .setOrigin(0.5, 0.5)
      .copyPosition(this.noButton);

    this.container.add([this.gameExit, this.yesButton, this.yesButtonText, this.noButton, this.noButtonText]);
  }
  //#endregion

  //#region -OnYesClick
  OnYesClick(_callback, _callbackscope) {
    this.yesButton.on('pointerdown', () => {
      _callback.call(_callbackscope);
    });
  }
  //#endregion

  //#region -OnNoClick
  OnNoClick(_callback, _callbackscope) {
    this.noButton.on('pointerdown', () => {
      _callback.call(_callbackscope);
    });
  }
  //#endregion

  //#region -SetVisible
  SetVisible(_isVisible) {
    this.overlay.setVisible(_isVisible);
    this.container.setVisible(_isVisible);
  }
  //#endregion

  //#region -Resize
  Resize(_width, _height, _newScale) {
    this.overlay.setDisplaySize(_width, _height)
      .setPosition(_width / 2, _height / 2);
    this.container.setScale(_newScale)
      .setPosition(_width / 2, _height / 2);
  }
  //#endregion
}