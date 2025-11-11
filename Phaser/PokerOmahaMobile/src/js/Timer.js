/* eslint-disable no-console */
/* global Phaser,console */
/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Timer with image for player turn in gameplay.
 ************************************/
import { Model } from './Model.js';
import { getCurrentTimestampMillis } from './timeLib.js';
class Timer {
  constructor(_scene, _x, _y) {
    this.scene = _scene;
    this.x = _x;
    this.y = _y;
    // this.blackLayer = this.scene.add.sprite(_x, _y, 'black_layer');
    this.redLayer = this.scene.add.sprite(0, 0, 'green_layer');

    this.shape = this.scene.make.graphics();
    this.shape.fillStyle(0xffffff);
    this.shape.slice(this.redLayer.x, this.redLayer.y, this.redLayer.displayWidth / 2, Phaser.Math.DegToRad(359), Phaser.Math.DegToRad(0), true);
    this.shape.fillPath();

    this.mask = this.shape.createGeometryMask();
    this.redLayer.setMask(this.mask);

    this.seconds = 0;
    this.currentActionTime = 0;

    this.timeEvent = _scene.time.addEvent({
      delay: 1000,
      callback: this.TimeEventCallback,
      callbackScope: this,
      repeat: -1
    });
    this.timeEvent.paused = true;

    // this.counter = {};

    this.HideTimer();
  }

  //#region - Time evnet callback for timer
  TimeEventCallback() {
    this.seconds--;
    if (this.seconds === 0) {
      this.seconds = this.currentActionTime;
      this.timeEvent.paused = true;
      this.shape.clear();
      this.shape.slice(this.redLayer.x, this.redLayer.y, this.redLayer.displayWidth / 2, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(270), true);
      this.shape.fillPath();
      this.HideTimer();
    }
  };
  //#endregion
  //#region - Layer Scale Adjust
  AdjustLayer(_scale) {
    // this.blackLayer.setScale(_scale);
    this.redLayer.setScale(_scale);
  }
  //#endregion

  //#region - Show timer on top
  ShowOnTop() {
    // this.blackLayer.setDepth(2);
    this.redLayer.setDepth(2);
  };
  //#endregion

  //#region - Show timer
  ShowTimer(_seconds) {
    // this.blackLayer.setVisible(true);
    if (this.counter !== undefined) {
      // console.log('this.counter not undefined...........', this.counter);
      this.counter.pause();
      this.counter.stop();
      this.counter.remove();
      this.counter.destroy();
      this.counter = undefined;
    }
    this.redLayer.setVisible(true);
    this.timeEvent.paused = true;
    this.StartTimer(_seconds);
  };
  //#endregion

  //#region - Hide timer
  HideTimer() {
    // this.blackLayer.setVisible(false);
    if (this.counter !== undefined) {
      // console.log('this.counter not undefined...........', this.counter);
      this.counter.pause();
      this.counter.stop();
      this.counter.remove();
      this.counter.destroy();
      this.counter = undefined;
    }
    this.redLayer.setVisible(false);
    this.timeEvent.paused = true;
  };
  //#endregion

  GetCurrentTimeStamp(_endTime) {
    if (((Model.GetGameTurnTime() + 2) * 1000) < Math.abs(_endTime - getCurrentTimestampMillis())) {
      return Model.GetGameTurnTime() * 1000;
    }
    return Math.abs(_endTime - getCurrentTimestampMillis());
  };

  //#region - Start timer
  StartTimer(_endTime) {
    const delay = this.GetCurrentTimeStamp(_endTime);
    const currentSeconds = (delay / 1000);
    console.log('currentSeconds: ', currentSeconds);
    let startDegree = null;
    // startDegree = (currentSeconds >= Constant.GAME_TURN_TIME) ? 0 : 359 - (currentSeconds * (359 / Constant.GAME_TURN_TIME));
    startDegree = (currentSeconds >= Model.GetGameTurnTime()) ? 0 : 359 - (currentSeconds * (359 / Model.GetGameTurnTime()));
    this.currentActionTime = currentSeconds;
    this.counter = {};
    this.timeEvent.paused = false;
    this.seconds = currentSeconds;
    this.counter = this.scene.tweens.addCounter({
      from: startDegree,
      to: 359,
      duration: this.seconds * 1000,
      onUpdate: (tween) => {
        const t = tween.getValue();
        this.shape.clear();
        this.shape.slice(0, 0, this.redLayer.displayWidth / 2, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(270 + t), true);
        this.shape.fillPath();
      },
      onComplete: () => {
        this.HideTimer();
        // Constant.game.events.emit('evtUserTimeEnd');
      }
    });
  };
  //#endregion

  //#region - Pause Timer
  PauseTimer() {
    this.timeEvent.paused = true;
    if (this.counter !== undefined) {
      this.counter.pause();
    }
  };
  //#endregion

  //#region - Resume timer
  ResumeTimer() {
    this.timeEvent.paused = false;
    if (this.counter !== undefined) {
      this.counter.resume();
    }
  };
  //#endregion

  //#region - Resize all
  resize(_newWidth, _newHeight, _newScale) {
    // this.blackLayer.setScale(_newScale);
    // this.blackLayer.setPosition(((_newWidth / 2) + this.x) * _newScale, ((_newHeight / 2) + this.y) * _newScale);
    // if (_islocalPlayer) {
    //   this.shape.setScale(_newScale * 1.3);
    // }
    // else {
    //   this.shape.setScale(_newScale);
    // }
    // this.redLayer.setPosition((_newWidth / 2) + (this.x * _newScale), (_newHeight / 2) + (this.y * _newScale));
    this.shape.setScale(_newScale);
    this.shape.setPosition((_newWidth / 2) + (this.x * _newScale), (_newHeight / 2) + (this.y * _newScale));
  };
  //#endregion
}


export default Timer;