/* global */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 20-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 22-11-2024
 * @Description :- Design and handling for Quit popup.
 ************************************/

import { Constant } from '../Constant';
import ButtonTween from '../game-objects/ButtonTween';
import { AudioManager } from '../media/AudioManager';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler';

class QuitPopup {
  constructor(scene) {
    this.scene = scene;
    this.quitPopupContainer = null;

    this.CreateQuitPopup();
    this.HideQuitPopup();
  }

  CreateQuitPopup() {
    this.quitPopupContainer = this.scene.add.container().setDepth(2);
    this.overlay = this.scene.add.image(0, 960, 'info_overlay').setOrigin(0.5).setScale(2000, 1920).setInteractive({ useHandCursor: true });
    this.quitBase = this.scene.add.image(0, 960, 'quit_base').setOrigin(0.5);
    let fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '65px', fill: '#ffefd7', align: 'center', lineSpacing: 20 };
    // let txt = 'Do you want\n to Quit ? ';
    // this.quitTxt = this.scene.add.text(this.quitBase.x - 5, this.quitBase.y - 20, txt, fontTextStyle).setOrigin(0.5);

    //Buttons
    this.noBtn = this.scene.add.image(this.quitBase.x - 170, this.quitBase.y + 400, 'buy_btn_1').setOrigin(0.5).setInteractive({ useHandCursor: true });
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '50px', fill: '#ffefd7', align: 'center' };
    let txt = 'No';
    this.noBtnText = this.scene.add.text(this.noBtn.x + 5, this.noBtn.y - 10, txt, fontTextStyle).setOrigin(0.5);

    this.yesBtn = this.scene.add.image(this.noBtn.x + 350, this.noBtn.y, 'buy_btn_2').setOrigin(0.5).setInteractive({ useHandCursor: true });
    fontTextStyle = { fontFamily: 'Fredoka-Bold', fontSize: '50px', fill: '#ffefd7', align: 'center' };
    txt = 'Yes';
    this.yesBtnText = this.scene.add.text(this.yesBtn.x + 5, this.yesBtn.y - 10, txt, fontTextStyle).setOrigin(0.5);

    this.noBtn.on('pointerdown', this.OnPressingNoBtn, this);
    this.yesBtn.on('pointerdown', this.OnPressingYesBtn, this);

    this.quitPopupContainer.add([this.overlay, this.quitBase, this.noBtn, this.noBtnText, this.yesBtn, this.yesBtnText]);
  }

  ShowQuitPopup() {
    this.quitPopupContainer.setVisible(true);
  }

  HideQuitPopup() {
    this.quitPopupContainer.setVisible(false);
    setTimeout(() => {
      this.scene.input.enabled = true;
    }, 400);
  }

  TweenQuitPopupToScreen(_x, _btnTxt) {
    this.scene.tweens.add({
      targets: this.quitPopupContainer,
      x: _x,
      ease: 'Linear',
      duration: 700,
      yoyo: false,
      repeat: 0,
      onComplete: () => {
        if (_btnTxt === 'No') {
          this.HideQuitPopup();
          this.ResizeQuitContainer(Constant.clientWidth, Constant.clientHeight, Constant.newScale);
          this.scene.backButton.setInteractive({ useHandCursor: true });
        }
      }
    });
  }

  OnPressingNoBtn() {
    this.btnTween = new ButtonTween(this.scene, this.noBtn, this.noBtnText);
    AudioManager.PlayButtonPressAudio();
    this.btnTween.btnTween.on('complete', () => {
      this.HideQuitPopup();
      AudioManager.StopLevelMusic();
      this.scene.backButton.setInteractive({ useHandCursor: true });
      AudioManager.ResumeGameMusic();
    });
  }

  OnPressingYesBtn() {
    AudioManager.PlayButtonPressAudio();
    this.btnTween = new ButtonTween(this.scene, this.yesBtn, this.yesBtnText);
    if (this.scene.grid.panel.children) {
      this.scene.grid.panel.children.forEach(element => {
        if (element.type !== 'Image') {
          element.children[1].data.remove();
          if (element.children[0].data !== null) {
            element.children[0].data = null;
          }
        }
      });
    }
    // this.scene.ResetGrid();
    const currentTimeStamp = Date.now();
    const finalTime = currentTimeStamp - Constant.gameStartTime;
    this.btnTween.btnTween.on('complete', () => {
      this.scene.events.off('scoreup');
      this.scene.events.off('levelup');
      this.scene.events.off('reset');
      PlayzhubEventHandler.GamePlayStopped(finalTime / 1000);
      this.scene.scene.stop('GameScene');
      this.scene.scene.start('MenuScene');
    });
  }

  ResizeQuitContainer(_newWidth, _newHeight, _newScale) {
    this.quitPopupContainer.setScale(_newScale);
    this.quitPopupContainer.setPosition(_newWidth / 2, 0);
  }

}

export default QuitPopup;