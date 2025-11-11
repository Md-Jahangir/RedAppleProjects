/* global  */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updated_Date :- 29-10-2025
 * @Description :- Universal Button class supporting both spritesheet (3 frames) and single image (1 frame)
 ************************************/

import { SelectedResolution } from '../utils/ResolutionSelector.js';
import { Utils } from '../utils/Utils.js';

class Button {
  constructor(_scene, _x, _y, _imgKey) {
    this.scene = _scene;
    this.btnX = _x;
    this.btnY = _y;
    this.currentScale = 1;
    this.isDisabled = false;
    this.isClicked = false;
    this.clickCallback = null;
    this.clickCallbackContext = this;
    this.clickCallbackArgs = null;

    this.frameCount = this.GetFrameCount(_imgKey);
    this.CreateImage(_imgKey);
  };

  //#region - Detect if key has multiple frames
  GetFrameCount(_imgKey) {
    const texture = this.scene.textures.get(_imgKey);
    if (!texture) return 1;

    // If spritesheet, frameTotal > 1
    const frames = Object.keys(texture.frames);
    // The first frame key is '__BASE' for single images
    return frames.length > 1 ? frames.length : 1;
  }
  //#endregion

  //#region - Create button image
  CreateImage(_imgKey) {
    const frameIndex = this.frameCount > 1 ? 0 : null;

    // Use sprite if multi-frame, otherwise image
    if (this.frameCount > 1) {
      this.normal = this.scene.add.sprite(this.btnX, this.btnY, _imgKey, frameIndex);
    } else {
      this.normal = this.scene.add.image(this.btnX, this.btnY, _imgKey);
    }

    this.normal.setInteractive({ cursor: 'pointer' });

    this.normal.on('pointerover', this.onOver, this);
    this.normal.on('pointerout', this.onOut, this);
    this.normal.on('pointerdown', this.onDown, this);
    this.normal.on('pointerup', this.onUp, this);
  };
  //#endregion

  //#region - Set click callback
  setClickCallback(callback, context = null, args = null) {
    this.clickCallback = callback;
    this.clickCallbackContext = context === null ? this : context;
    this.clickCallbackArgs = args;
  };
  //#endregion

  //#region - Show / Hide
  show() {
    this.normal.setVisible(true);
  };
  hide() {
    this.normal.setVisible(false);
  };
  //#endregion

  //#region - Hover / Out
  onOver() {
    if (this.isDisabled) return;
    if (this.frameCount > 1) this.normal.setFrame(1); // hover

    this.scene.tweens.add({
      targets: this.normal,
      scaleX: this.currentScale * 1.05,
      scaleY: this.currentScale * 1.05,
      duration: 100,
      ease: 'Linear'
    });
  };

  onOut() {
    if (this.isDisabled) return;
    if (this.frameCount > 1) this.normal.setFrame(0); // normal

    this.scene.tweens.add({
      targets: this.normal,
      scaleX: this.currentScale,
      scaleY: this.currentScale,
      duration: 100,
      ease: 'Linear'
    });
  };
  //#endregion

  //#region - Pointer down / up
  onDown() {
    if (this.isDisabled) return;
    this.isClicked = true;
    this.scene.tweens.add({
      targets: this.normal,
      scaleX: this.currentScale * 0.95,
      scaleY: this.currentScale * 0.95,
      duration: 50,
      ease: 'Linear'
    });
  }

  onUp() {
    if (this.isDisabled || !this.isClicked) return;
    this.isClicked = false;
    this.ButtonScaleTween();

    if (this.clickCallback) {
      this.clickCallback.apply(this.clickCallbackContext, this.clickCallbackArgs);
    }
  };
  //#endregion

  //#region - Scale / Depth / Position
  setScale(_newScale) {
    this.currentScale = _newScale;
    this.normal.setScale(_newScale);
  };

  setDepth(_newDepth) {
    this.normal.setDepth(_newDepth);
  };

  resize(_newWidth, _newHeight) {
    const newScale = Utils.GetScale(SelectedResolution.width, SelectedResolution.height, _newWidth, _newHeight);
    this.setScale(newScale);
  };

  setPosition(_newX, _newY) {
    this.btnX = _newX;
    this.btnY = _newY;
    this.normal.setPosition(this.btnX, this.btnY);
  };

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
  };
  //#endregion

  //#region - Disable / Enable
  disable() {
    this.isDisabled = true;
    if (this.frameCount > 2) {
      this.normal.setFrame(2); // disabled frame
      this.normal.setAlpha(1);
    } else {
      this.normal.setAlpha(0.5); // faded effect for single image
    }
    this.normal.removeInteractive();
  };

  enable() {
    this.isDisabled = false;
    if (this.frameCount > 1) {
      this.normal.setFrame(0); // back to normal
      this.normal.setAlpha(1);
    } else {
      this.normal.setAlpha(1);
    }
    this.normal.setInteractive({ cursor: 'pointer' });
  };
  //#endregion

  //#region - Destroy
  destroy() {
    this.normal.destroy();
    delete this;
  };
  //#endregion

  //#region - Change Texture (for dynamic icons like sound on/off)
  setTexture(_newKey, _frame = 0) {
    if (!this.scene.textures.exists(_newKey)) {
      return;
    }

    // Update image key and frame
    this.normal.setTexture(_newKey, _frame);
    this.frameCount = this.GetFrameCount(_newKey);
  }
  //#endregion

  //#region - Click scale tween
  ButtonScaleTween() {
    this.normal.removeInteractive();
    this.scene.tweens.add({
      targets: this.normal,
      scaleX: this.currentScale * 0.95,
      scaleY: this.currentScale * 0.95,
      ease: 'Linear',
      duration: 50,
      callbackScope: this,
      onComplete: this.OnCompleteHandler
    });
  };

  OnCompleteHandler() {
    this.scene.tweens.add({
      targets: this.normal,
      scaleX: this.currentScale,
      scaleY: this.currentScale,
      ease: 'Linear',
      duration: 50,
      callbackScope: this,
      onComplete: () => {
        if (!this.isDisabled) {
          this.normal.setInteractive({ cursor: 'pointer' });
        }
      }
    });
  };
  //#endregion
}

export default Button;
