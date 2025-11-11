/* global setTimeout */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Control Button like click evnet scale position etc.
 ************************************/

import { SelectedResolution } from '../ResolutionSelector.js';
import { Utils } from '../Utils.js';

class Button {
  constructor(_scene, _x, _y, _imgPreffix, isSprite) {
    this.scene = _scene;
    this.btnX = _x;
    this.btnY = _y;
    this.currentScale = null;
    this.normal = null;
    this.hover = null;
    this.disabled = null;
    this.isDisabled = false;
    this.clickCallback = null;
    this.clickCallbackContext = this;
    this.clickCallbackArgs = null;
    this.isClicked = false;
    this.isSprite = isSprite;
    this.isCheck = false;

    this.CreateImages(_imgPreffix);
  };

  //#region - Create button image
  CreateImages(_imgPreffix) {
    if (this.isSprite !== null) {
      this.normal = this.scene.add.sprite(this.btnX, this.btnY, `${_imgPreffix}_normal`, 0);
      this.hover = this.scene.add.sprite(this.btnX, this.btnY, `${_imgPreffix}_hover`, 0);
      this.disabled = this.scene.add.sprite(this.btnX, this.btnY, `${_imgPreffix}_disabled`, 0);
    }
    else {
      this.normal = this.scene.add.image(this.btnX, this.btnY, `${_imgPreffix}_normal`);
      this.hover = this.scene.add.image(this.btnX, this.btnY, `${_imgPreffix}_hover`);
      this.disabled = this.scene.add.image(this.btnX, this.btnY, `${_imgPreffix}_disabled`);
    }
    this.hover.setVisible(false);
    this.disabled.setVisible(false);

    this.normal.setInteractive({ cursor: 'pointer' });
    this.normal.on('pointerover', this.onOver, this);
    this.normal.on('pointerout', this.onOut, this);
    this.normal.on('pointerdown', this.onDown, this);
    this.normal.on('pointerup', this.onUp, this);
  };
  //#endregion

  //#region - Set button callback event
  setClickCallback(callback, context = null, args = null) {
    this.clickCallback = callback;
    this.clickCallbackContext = context === null ? this : context;
    this.clickCallbackArgs = args;
  };
  //#endregion

  //#region - Show the button
  show() {
    this.normal.setVisible(true);
    this.hover.setVisible(false);
    this.disabled.setVisible(false);
  };
  //#endregion

  //#region - Hide the button
  hide() {
    this.normal.setVisible(false);
    this.hover.setVisible(false);
    this.disabled.setVisible(false);
  };
  //#endregion

  //#region - on over event
  onOver() {
    if (this.isDisabled) return;
    this.hover.setVisible(true);
    this.normal.setAlpha(0.01);
  };
  //#endregion

  //#region - on out event
  onOut() {
    if (this.isDisabled) return;
    this.hover.setVisible(false);
    this.normal.setAlpha(1.0);
  };
  //#endregion
  onDown() {
    this.isClicked = true;
  }
  //#region - on up event 
  onUp() {
    if (this.isDisabled) return;
    if (this.clickCallback && this.isClicked) {
      this.clickCallback.apply(this.clickCallbackContext, this.clickCallbackArgs);
      this.ButtonScaleTween();
    }
  };
  //#endregion

  //#region - get width of button
  getWidth() {
    return this.normal.displayWidth;
  };
  //#endregion

  //#region - Get height of button
  getHeight() {
    return this.normal.displayHeight;
  };
  //#endregion

  //#region - Set Scale of the button
  setScale(_newScale) {
    this.normal.setScale(_newScale);
    this.hover.setScale(_newScale);
    this.disabled.setScale(_newScale);

    this.currentScale = _newScale;
  };
  //#endregion

  //#region - Set depth of the button
  setDepth(_newDepth) {
    this.normal.setDepth(_newDepth);
    this.hover.setDepth(_newDepth);
    this.disabled.setDepth(_newDepth);
  };
  //#endregion

  //#region - Resize button
  resize(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, _newWidth, _newHeight);
    this.setScale(newScale);
  };
  //#endregion

  //#region - Get position of the button
  getPosition() {
    const res = {
      x: this.x,
      y: this.y
    };
    return res;
  };
  //#endregion

  set x(_value) {
    this.btnX = _value;
    this.setPosition(this.btnX, this.btnY);
  };

  get x() {
    return this.btnX;
  };

  set y(_value) {
    this.btnY = _value;
    this.setPosition(this.btnX, this.btnY);
  };

  get y() {
    return this.btnY;
  }

  //#region - Set position of button
  setPosition(_newX, _newY) {
    this.btnX = _newX;
    this.btnY = _newY;

    this.normal.setPosition(this.btnX, this.btnY);
    this.hover.setPosition(this.btnX, this.btnY);
    this.disabled.setPosition(this.btnX, this.btnY);
  };
  //#endregion

  //#region - Set Texture of button
  SetTexture(_texture) {
    this.hover.setTexture(`${_texture}_hover`);
    this.normal.setTexture(`${_texture}_normal`);
    this.disabled.setTexture(`${_texture}_disabled`);
  }
  //#endregion

  //#region - Disable button
  disable() {
    setTimeout(() => {
      this.isDisabled = true;
      this.hover.setVisible(false);
      this.normal.setAlpha(0.01);
      this.disabled.setVisible(true);

      this.disabled.setAlpha(0.5);//FOR testing

      this.normal.removeInteractive();
    }, 100);
  };
  //#endregion

  //#region - Enable button
  enable() {
    this.isDisabled = false;
    this.normal.setInteractive({ cursor: 'pointer' });
    this.hover.setVisible(false);
    this.normal.setAlpha(1.0);
    this.disabled.setVisible(false);
    this.disabled.setAlpha(1);//FOR testing
  };
  //#endregion

  //#region - Destroy button
  destroy() {
    this.hover.destroy();
    this.normal.destroy();
    this.disabled.destroy();
    delete this;
  };
  //#endregion

  //#region - Scale Tween the button
  ButtonScaleTween() {
    this.normal.removeInteractive();
    this.scene.add.tween({
      targets: [this.normal, this.hover],
      scaleX: this.currentScale * 0.95,
      scaleY: this.currentScale * 0.95,
      ease: 'Linear',
      duration: 50,
      callbackScope: this,
      onComplete: this.OnCompleteHandler
    });
  };
  //#endregion

  //#region - On complete of the tween
  OnCompleteHandler() {
    this.scene.add.tween({
      targets: [this.normal, this.hover],
      scaleX: this.currentScale * 1,
      scaleY: this.currentScale * 1,
      ease: 'Linear',
      duration: 50,
      callbackScope: this,
      onComplete: function () {
        this.normal.setInteractive({ cursor: 'pointer' });
      }
    });
  };
  //#endregion

  //#region - Frame Set if SpriteSheet
  setFrame(_frame) {
    this.normal.setFrame(_frame);
    this.hover.setFrame(_frame);
    this.disabled.setFrame(_frame);
  }
  //#endregion
}

export default Button;