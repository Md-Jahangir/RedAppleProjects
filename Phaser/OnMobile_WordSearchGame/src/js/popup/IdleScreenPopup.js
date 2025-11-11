/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 07-11-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 13-11-2024
 * @Description :- Popup to notify idle screen.
 ************************************/

import gsap from 'gsap';
import ButtonTween from '../game-objects/ButtonTween';
// import { Constant } from '../Constant';

class IdleScreenPopup {
  constructor(scene) {
    this.scene = scene;
    this.idleScreenPopupContainer = null;

    this.CreateIdleScreenPopup();
    this.HideIdlePopup();
  }

  CreateIdleScreenPopup() {
    this.idleScreenPopupContainer = this.scene.add.container().setDepth(2);

    this.alertBase = this.scene.add.image(0, 0, 'alert_signal').setOrigin(0, 0).setVisible(false);
    this.rabbitExp = this.scene.add.spine(-240, 1125, 'rabbit_exp');
    this.textBox = this.scene.add.image(-900, 0, 'text_box').setOrigin(0, 0).setAngle(360).setAlpha(0);
    this.cross = this.scene.add.image(this.textBox.x, this.textBox.y, 'cross').setOrigin(0.5, 0.5).setVisible(false).setInteractive({ useHandCursor: true });

    this.cross.on('pointerdown', this.OnPressingCrossButton, this);

    this.idleScreenPopupContainer.add([this.rabbitExp, this.textBox, this.cross]);
  }

  OnPressingCrossButton() {
    this.btnTween = new ButtonTween(this.scene, this.cross);
    this.btnTween.btnTween.on('complete', () => {
      this.HideIdlePopup();
    });
  }

  AnimateAlert() {
    this.alertBaseAnimation = gsap.fromTo(
      this.alertBase,
      {
        alpha: 1,   // Start with alpha = 1
      },
      {
        duration: 0.5,
        repeat: -1,
        alpha: 0,   // End with alpha = 0
        yoyo: true, // Reverses the animation, bringing alpha back to 1
        ease: 'none'
      }
    );
  }

  AnimateTxtBox() {
    gsap.to(this.textBox, {
      duration: 0.9,
      repeat: 0,
      alpha: 1,
      x: -50,
      y: 320,
      angle: 360,
      yoyo: true,
      ease: 'bounce.out',
      onComplete: () => {
        setTimeout(() => {
          this.cross.setPosition(this.textBox.x + 415, this.textBox.y + 50);
          this.cross.setVisible(true);
        }, 280);
      }
    });
  }

  ResizeIdleScreenPopupContainer(_newWidth, _newHeight, newScale) {
    this.alertBase.setDisplaySize(_newWidth, _newHeight);
    this.idleScreenPopupContainer.setScale(newScale);
    this.idleScreenPopupContainer.setPosition(_newWidth / 2, (_newHeight - (985 * newScale)));
  }

  ShowIdlePopup() {
    // this.alertBase.setVisible(true);
    this.idleScreenPopupContainer.setVisible(true);
    this.rabbitExp.play('Indicating', false);
    this.rabbitExp.on('complete', () => {
      this.rabbitExp.play('indicating_Loop', true);
    });
    this.AnimateAlert();
    this.AnimateTxtBox();
  }

  HideIdlePopup() {
    // this.alertBase.setVisible(false);
    this.idleScreenPopupContainer.setVisible(false);
    this.textBox.setPosition(-900, 0).setAlpha(0);
    this.cross.setVisible(false);
  }

}

export default IdleScreenPopup;
