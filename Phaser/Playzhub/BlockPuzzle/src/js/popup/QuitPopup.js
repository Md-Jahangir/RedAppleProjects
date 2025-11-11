/* global */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 20-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 05-03-2025
 * @Description :- Design and handling for Quit popup.
 ************************************/

import { Constant } from '../Constant';
import ButtonTween from '../game-objects/ButtonTween';
import { AudioManager } from '../media/AudioManager';
import { PlayzhubEventHandler } from '../PlayzhubEventHandler';
import gsap from 'gsap';

class QuitPopup {
  constructor(scene) {
    this.scene = scene;
    this.quitPopupContainer = null;

    this.CreateQuitPopup();
    this.HideQuitPopup();
  }

  CreateQuitPopup() {
    this.quitPopupContainer = this.scene.add.container().setDepth(2);
    this.overlay = this.scene.add.image(0, 0, 'overlay').setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.quitBase = this.scene.add.image(0, 960, 'quit_base').setOrigin(0.5);
    let fontTextStyle = { fontFamily: 'Anja Eliane', fontSize: '50px', fill: '#e5438a', align: 'center', lineSpacing: 4 };
    let txt = ' DO YOU\n WANT\n   TO QUIT ? ';
    this.quitTxt = this.scene.add.text(this.quitBase.x - 5, this.quitBase.y + 10, txt, fontTextStyle).setOrigin(0.5);
    fontTextStyle = { fontFamily: 'Happy School', fontSize: '70px', fill: '#ffdf2b', align: 'center', lineSpacing: 4 };
    txt = 'QUIT';
    this.quitHeader = this.scene.add.text(this.quitBase.x - 5, this.quitBase.y - 225, txt, fontTextStyle).setOrigin(0.5);
    this.quitHeader.setStroke('#e1731a', 9);
    this.quitHeader.setShadow(0, 4, '#57167f', 2, true, false);

    // Buttons
    this.noBtn = this.scene.add.image(this.quitBase.x - 110, this.quitBase.y + 220, 'ui', 'no').setOrigin(0.5).setScale(0);//.setInteractive({ useHandCursor: true });

    this.yesBtn = this.scene.add.image(this.noBtn.x + 225, this.noBtn.y, 'ui', 'yes').setOrigin(0.5).setScale(0);//.setInteractive({ useHandCursor: true });

    this.noBtn.on('pointerdown', this.OnPressingNoBtn, this);
    this.yesBtn.on('pointerdown', this.OnPressingYesBtn, this);

    this.quitPopupContainer.add([this.quitBase, this.quitTxt, this.quitHeader, this.noBtn, this.yesBtn]);
  }

  ShowQuitPopup() {
    this.quitPopupContainer.setVisible(true);
    this.overlay.setVisible(true);

    gsap.to([this.noBtn, this.yesBtn], {
      delay: 0.15,
      duration: 0.3,
      scale: 1.25,
      ease: 'expo.out',
      onComplete: () => {
        gsap.to([this.noBtn, this.yesBtn], {
          duration: 0.2,
          scale: 1,
          ease: 'expo.in',
          onComplete: () => {
            this.noBtn.setInteractive({ useHandCursor: true });
            this.yesBtn.setInteractive({ useHandCursor: true });
          }
        });
      }
    });

  }

  HideQuitPopup() {
    this.quitPopupContainer.setVisible(false);
    this.overlay.setVisible(false);
    setTimeout(() => {
      this.scene.input.enabled = true;
    }, 400);
  }

  OnPressingNoBtn() {
    AudioManager.PlayButtonPressAudio();
    this.btnTween = new ButtonTween(this.scene, this.noBtn);
    this.btnTween.btnTween.on('complete', () => {
      this.HideQuitPopup();
      this.scene.TimedEvent.paused = false;
      this.scene.backBtn.setInteractive({ useHandCursor: true });
    });
  }

  OnPressingYesBtn() {
    AudioManager.PlayButtonPressAudio();
    // Server.PostGameOverToParent(Server.timerValue - Constant.timeToEnd);
    // Server.PostGameOuitToParent();
    this.btnTween = new ButtonTween(this.scene, this.yesBtn);
    AudioManager.PlayButtonPressAudio();
    const currentTimeStamp = Date.now();
    const finalTime = currentTimeStamp - Constant.gameStartTime;
    this.btnTween.btnTween.on('complete', () => {
      this.scene.cameras.main.fadeOut(800);
      this.scene.events.off('first_selected');
      this.scene.events.off('same_selected');
      this.scene.events.off('target_selected');
      this.scene.events.off('move_complete');
      this.scene.scene.stop('GameScene');
      PlayzhubEventHandler.GamePlayStopped(finalTime / 1000);
      this.scene.scene.start('TitleScene');
    });

    // sendMessage(this.scene.score.toString());
    // AudioManager.PlayGameOverAudio();
  }

  ResizeQuitContainer(_newWidth, _newHeight, _newScale) {
    this.overlay.setDisplaySize(_newWidth, _newHeight);
    this.overlay.setPosition(
      _newWidth / 2,
      _newHeight / 2
    );

    this.quitPopupContainer.setScale(_newScale);
    this.quitPopupContainer.setPosition(_newWidth / 2, 0);

  }

}

export default QuitPopup;