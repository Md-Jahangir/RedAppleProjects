/********* Script_Details ************
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 23-10-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 23-10-2024
 * @Description :-GameOver Popup.
 ************************************/

/* global */

export default class GameOver {
  constructor(_scene) {
    this.scene = _scene;
    this.create();
  }

  //#region -create
  create() {
    this.overlay = this.scene.add.image(0, 0, 'background')
      .setOrigin(0.5)
      .setInteractive();

    this.container = this.scene.add.container(0, 0);
    this.base = this.scene.add.image(0, 0, 'popup_base')
      .setOrigin(0.5);
    this.gameOverText = this.scene.add.text(0, -200, 'GameOver!', { fontFamily: 'CarosExtraBold', fontSize: 100 })
      .setOrigin(0.5);

    this.replayButton = this.scene.add.image(0, 100, 'yesButtonBase')
      .setOrigin(0.5)
      .setInteractive();
    this.replayButtonText = this.scene.add.text(0, 0, 'Replay', { fontFamily: 'CarosExtraBold', fontSize: 30 })
      .setOrigin(0.5)
      .copyPosition(this.replayButton);

    this.totalCoinCollectedText = this.scene.add.text(0, 0, '0', { fontFamily: 'CarosExtraBold', fontSize: 50 })
      .setOrigin(0.5);

    this.container.add([this.base, this.gameOverText, this.replayButton, this.replayButtonText, this.totalCoinCollectedText]);
  }
  //#endregion

  //#region -RestartScene
  OnReplayClick(_callback, _callbackscope) {
    this.replayButton.on('pointerdown', () => {
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

  //#region -SetCoinCollectedText
  SetCoinCollectedText(_value) {
    this.totalCoinCollectedText.setText(_value);
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