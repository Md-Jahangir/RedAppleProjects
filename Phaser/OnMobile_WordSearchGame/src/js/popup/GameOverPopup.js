/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 20-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 25-11-2024
 * @Description :- Design and handling for Gameover popup.
 ************************************/

import { Constant } from '../Constant';
import ButtonTween from '../game-objects/ButtonTween';
import { AudioManager } from '../media/AudioManager';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler';
import * as GA from 'gameanalytics';

class GameOverPopup {
  constructor(scene) {
    this.scene = scene;
    this.gameOverPopupContainer = null;

    this.CreatePopup();
    this.HideGameOverPopup();
  }

  CreatePopup() {
    this.gameOverPopupContainer = this.scene.add.container().setDepth(2);
    this.overlay = this.scene.add.image(0, 0, 'info_overlay').setOrigin(0.5).setScale(2000, 1920).setInteractive({ useHandCursor: true });
    this.gameOverBase = this.scene.add.image(0, 0, 'gameover_base').setOrigin(0.5);
    let fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '72px', fill: '#ffefd7', align: 'center', lineSpacing: 20 };
    let txt = '0';
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '52px', fill: '#ffefd7', align: 'center', lineSpacing: 20 };
    this.gameScore = this.scene.add.text(this.gameOverBase.x + 15, this.gameOverBase.y + 70, txt, fontTextStyle).setOrigin(0.5);

    //Buttons
    this.replayBtn = this.scene.add.image(this.gameOverBase.x, this.gameOverBase.y + 420, 'buy_btn_2').setOrigin(0.5).setInteractive({ useHandCursor: true });
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '50px', fill: '#ffefd7', align: 'center' };
    txt = 'REPLAY';
    this.replayBtnText = this.scene.add.text(this.replayBtn.x + 2.5, this.replayBtn.y - 10, txt, fontTextStyle).setOrigin(0.5);

    this.replayBtn.on('pointerdown', this.OnPressingReplayBtn, this);

    this.gameOverPopupContainer.add([this.overlay, this.gameOverBase, this.gameScore, this.replayBtn, this.replayBtnText]);
  }

  TweenGameOverPopupToScreen() {
    this.gameoverPopuptweenIn = this.scene.tweens.add({
      targets: this.gameOverPopupContainer,
      x: 0,
      ease: 'Linear',
      duration: 700,
      yoyo: false,
      repeat: 0,
    });
  }

  OnPressingReplayBtn() {
    GA.GameAnalytics.addDesignEvent('ui:replay_clicked');
    AudioManager.PlayButtonPressAudio();
    this.btnTween = new ButtonTween(this.scene, this.replayBtn, this.replayBtnText);
    this.scene.grid.panel.children.forEach(element => {
      if (element.type !== 'Image') {
        element.children[1].data.remove();
        if (element.children[0].data !== null) {
          element.children[0].data = null;
        }
      }
    });
    // this.scene.ResetGrid();
    const currentTimeStamp = Date.now();
    const finalTime = currentTimeStamp - Constant.gameStartTime;
    this.btnTween.btnTween.on('complete', () => {
      this.HideGameOverPopup();
      AudioManager.StopGameMusic();
      AudioManager.StopLevelMusic();
      setTimeout(() => {
        // console.log('at gameover popup');
        this.scene.events.off('scoreup');
        this.scene.events.off('levelup');
        this.scene.events.off('reset');
        PlayzhubEventHandler.GamePlayStopped(finalTime / 1000);
        this.scene.scene.stop('GameScene');
        this.scene.scene.start('MenuScene');
      }, 100);
    });
  }

  ShowGameOverPopup() {
    this.gameOverPopupContainer.setVisible(true);
    this.gameScore.setText(Constant.score);
  }

  HideGameOverPopup() {
    this.gameOverPopupContainer.setVisible(false);
  }

  ResizeGameOverPopupContainer(_newWidth, _newHeight, newScale) {
    this.gameOverPopupContainer.setScale(newScale);
    this.gameOverPopupContainer.setPosition(_newWidth / 2, _newHeight / 2);
  }
}

export default GameOverPopup;