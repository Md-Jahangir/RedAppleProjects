/********* Script_Details ************
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 23-10-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 23-10-2024
 * @Description :- Coin GameObject.
 ************************************/

/* global */

export default class Coin {
  constructor(_scene) {
    this.scene = _scene;
    this.create();
  }

  //#region -create
  create() {
    this.coinObject = this.scene.add.sprite(0, 0, 'coinSheet')
      .setInteractive();
  }
  //#endregion

  //#region -OnClick
  OnClick(_callback, _callbackscope) {
    this.coinObject.on('pointerdown', () => {
      _callback.call(_callbackscope, this);
    });
  }
  //#endregion

  //#region -SetPosition
  SetPosition(_x, _y) {
    this.coinObject.setPosition(_x, _y);
  }
  //#endregion

  //#region -GetPosition
  GetPosition() {
    const xPos = this.coinObject.x;
    const yPos = this.coinObject.y;
    return { x: xPos, y: yPos };
  }
  //#endregion

  //#region -PlayAnimation
  PlayAnimation() {
    this.coinObject.play('rotate', true);
  }
  //#endregion

  //#region -StopAnimation
  StopAnimation() {
    this.coinObject.stop('rotate');
  }
  //#endregion

  //#region -SetVisible
  SetVisible(_isVisible) {
    this.coinObject.setVisible(_isVisible);
  }
  //#endregion

  //#region -DisableInteractive
  DisableInteractive() {
    this.coinObject.disableInteractive();
  }
  //#endregion

  //#region -EnableInteractive
  EnableInteractive() {
    this.coinObject.enableInteractive();
  }
  //#endregion

  //#region CoinCollectAnimation
  CoinCollectAnimation(_targetPosition) {
    this.scene.tweens.add({
      targets: this.coinObject,
      x: _targetPosition.x + 20,
      y: _targetPosition.y,
      scaleX: 0.3,
      scaleY: 0.3,
      ease: 'Linear',
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.coinObject.setPosition(0, 0);
        this.coinObject.setVisible(false);
      }
    });
  }
  //#endregion

  //#region -Resize
  Resize(_width, _height, _newScale) {
    this.coinObject.setScale(_newScale);
  }
  //#endregion
}