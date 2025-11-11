/* global Phaser */
/********* Script_Details ************
 * @Original_Creator :- Tanmay Mukherjee.
 * @Created_Date :- 24-01-2024.
 * @Last_Update_By :- Tanmay Mukherjee.
 * @Last_Updatd_Date :-  24-01-2024
 * @Description :- Design and handling for the hand-cooldown-timer message.
 ************************************/

import { Utils } from '../Utils';

class HandCoolDownTimerPopup {
  constructor(scene) {
    this.scene = scene;
    this.CreateHandCoolDownTimerPopup();
  }
  CreateHandCoolDownTimerPopup() {
    // this.CreateOverlay();
    this.CreateHandCoolDownTimerPopupData();
    this.ShowHideHandCoolDownTimerPopup(false);
  }
  //#region - Create overlay
  CreateOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0);
    this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    this.overlay.setInteractive();
    this.overlay.setDepth(3);
  };
  //#endregion
  CreateHandCoolDownTimerPopupData() {
    this.timerRing = this.scene.add.image(0, 0, 'user_ring');
    this.timerBase = this.scene.add.image(0, 0, 'user_base');
    const timerMsgTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '35px', fill: '#fff', fontStyle: 'bold', align: 'center' };
    this.timerMsgText = this.scene.add.text(0, 0, 'Break Time', timerMsgTextStyle).setOrigin(0.5).setDepth(5);
    const timerValueTextStyle = { fontFamily: 'Poppins-Regular', fontSize: '50px', fill: '#fff', fontStyle: 'bold', align: 'center' };
    this.timerValueText = this.scene.add.text(0, 0, '', timerValueTextStyle).setOrigin(0.5).setDepth(5);

    this.shape = this.scene.make.graphics();
    this.shape.fillStyle(0xffffff);
    this.shape.slice(this.timerBase.x, this.timerBase.y, this.timerBase.displayWidth / 2, Phaser.Math.DegToRad(359), Phaser.Math.DegToRad(0), true);
    this.shape.fillPath();

    this.mask = this.shape.createGeometryMask();
    this.timerBase.setMask(this.mask);
  };
  ShowHideHandCoolDownTimerPopup(_status) {
    // this.overlay.setVisible(_status);
    this.timerMsgText.setVisible(_status);
    this.timerValueText.setVisible(_status);
    this.timerBase.setVisible(_status);
    this.timerRing.setVisible(_status);
    if (!_status) {
      this.remainTime = null;
      this.timerValueText.setText('');
      if (!Utils.IsEmpty(this.timeEvent)) {
        this.timeEvent.remove();
      }
    }
    else {
      this.timerValueText.setStyle({ fill: '#008000' });
    }
  };
  CreateHandCoolDownTimer() {
    if (this.remainTime > 0) {
      this.ShowHideHandCoolDownTimerPopup(true);
      this.timeEvent = this.scene.time.addEvent({
        delay: 1000,
        callback: () => { this.UpdateTimerValueText(); },
        callbackScope: this,
        repeat: -1
      });
    }

    this.counter = this.scene.tweens.addCounter({
      from: 0,
      to: 359,
      duration: this.remainTime * 1000,
      onUpdate: (tween) => {
        const t = tween.getValue();
        this.shape.clear();
        this.shape.slice(0, 0, this.timerBase.displayWidth / 2, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(270 + t), true);
        this.shape.fillPath();
      },
      onComplete: () => {
        this.ShowHideHandCoolDownTimerPopup(false);
      }
    });
  }
  UpdateTimerValueText() {
    this.remainTime--;
    this.timerValueText.setText(this.remainTime);
    if (this.remainTime <= 9) {
      this.timerValueText.setStyle({ fill: '#FF0000' });
    }
  };
  //#region - Resize
  resize(_newWidth, _newHeight, _newScale) {
    // this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.timerMsgText.setScale(_newScale);
    this.timerMsgText.setPosition((_newWidth / 2), (175 * _newScale));
    this.timerValueText.setScale(_newScale);
    this.timerValueText.setPosition(this.timerMsgText.x, this.timerMsgText.y - (75 * _newScale));
    this.timerBase.setScale(_newScale * 0.5);
    this.timerBase.copyPosition(this.timerValueText);
    this.timerRing.setScale(_newScale * 0.6);
    this.timerRing.copyPosition(this.timerValueText);
    // this.shape.setScale(_newScale);
    this.shape.copyPosition(this.timerValueText);
  };
  //#endregion
}
export default HandCoolDownTimerPopup;