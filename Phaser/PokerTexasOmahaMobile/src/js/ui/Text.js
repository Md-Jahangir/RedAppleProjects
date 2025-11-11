/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Control Text related work.
 ************************************/

import { SelectedResolution } from '../ResolutionSelector';
import { Utils } from '../Utils.js';

class Text {
  constructor(_scene, _x, _y, _params) {
    this.scene = _scene;
    this.textPosX = _x;
    this.textPosY = _y;
    this.textNormal = null;
    this.currentScale = null;

    this.CreateText(_params);
  };

  //#region - Create text
  CreateText(_params) {
    this.textNormal = this.scene.add.text(
      this.textPosX,
      this.textPosY,
      _params.text,
      {
        fontFamily: _params.fontFamily,
        fontSize: _params.fontSize,
        fontStyle: _params.fontStyle,
        color: _params.color,
        align: _params.align,
        wordWrap: _params.wordWrap !== undefined ? { width: _params.wordWrap.width } : { width: '0' },
        shadow: _params.shadow !== undefined ? {
          offsetX: _params.shadow.offsetX,
          offsetY: _params.shadow.offsetY,
          color: _params.shadow.color,
          blur: _params.shadow.blur,
          stroke: _params.shadow.stroke,
          fill: _params.shadow.fill
        } : {
          offsetX: 0,
          offsetY: 0,
          color: '#000000',
          blur: 0,
          stroke: false,
          fill: false
        }
      }
    ).setOrigin(0.5);
  };
  //#endregion

  //#region - Set text line space
  setLineSpacing(_value) {
    this.textNormal.setLineSpacing(_value);
  };
  //#endregion

  //#region - Set text of the object
  setText(_newText) {
    this.textNormal.setText(_newText);
  };
  //#endregion

  //#region - Show text 
  show() {
    this.textNormal.setVisible(true);
  };
  //#endregion

  //#region - Hide Text
  hide() {
    this.textNormal.setVisible(false);
  };
  //#endregion

  //#region - Set Scale of the text
  setScale(_newScale) {
    this.textNormal.setScale(_newScale);
    this.currentScale = _newScale;
  };
  //#endregion

  //#region - Resize text
  resize(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, _newWidth, _newHeight);
    this.textNormal.setScale(newScale);
  };
  //#endregion

  //#region - Set Position of the text
  setPosition(_newX, _newY) {
    this.textPosX = _newX;
    this.textPosY = _newY;
    this.textNormal.setPosition(this.textPosX, this.textPosY);
  };
  //#endregion

  //#region - Set origin of the text
  setOrigin(_originX, _originY) {
    this.textNormal.setOrigin(_originX, _originY);
  };
  //#endregion

  //#region - Enable the text
  disable() {
    // this.textNormal.setVisible(false);
    this.textNormal.setAlpha(0.5);
  };
  //#endregion

  //#region - Disable the text
  enable() {
    // this.textNormal.setVisible(true);
    this.textNormal.setAlpha(1);
  };
  //#endregion

  //#region - Destroy the text
  destroy() {
    this.textNormal.destroy();
    delete this;
  };
  //#endregion

  //#region - Scale Tween the text
  TextScaleTween() {
    this.scene.add.tween({
      targets: [this.textNormal],
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
      targets: [this.textNormal],
      scaleX: this.currentScale * 1,
      scaleY: this.currentScale * 1,
      ease: 'Linear',
      duration: 50,
    });
  };
  //#endregion


}

export default Text;