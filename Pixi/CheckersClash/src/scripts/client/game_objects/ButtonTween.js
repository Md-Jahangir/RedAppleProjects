
/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 23-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 24-09-2024
 * @Description :- Button tweens.
 ************************************/

import { Constant } from "../Constant.js";
import gsap from "gsap";

class ButtonTween {
  constructor(scene, btn, btnTxt = null, scaleX = 0.85, scaleY = 0.85, callback = null) {
    this.scene = scene;
    this.btn = btn;
    this.btnTxt = btnTxt;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.callback = callback;
    this.btnTween = null;
    console.log("scene", this.scene, scaleX, scaleY);


    this.TweenButton();


  }

  TweenButton() {
    this.btn.eventMode = 'passive';

    this.btnTween = gsap.to(this.btn.scale, {
      x: this.scaleX,
      y: this.scaleY,
      duration: 0.12,
      ease: 'power1.in',
      onComplete: () => {
        gsap.to(this.btn.scale, {
          x: 1,
          y: 1,
          duration: 0.35,
          ease: 'elastic.out(1, 0.4)', // springy bounce-back
          onComplete: () => {
            this.btn.eventMode = 'static';
            if (this.callback)
              this.callback();
          }
        });
      }
    });
    // if (this.xtraImg !== null) {
    //   this.btnTween = this.scene.tweens.add({
    //     targets: this.xtraImg,
    //     scaleX: 0.25 * this.factor,
    //     scaleY: 0.25 * this.factor,
    //     ease: 'Linear',
    //     repeat: 0,
    //     duration: this.duration,
    //     yoyo: true,

    //   });
    // }
  }

  CheckButtonAndFunction(_btnKey) {
    switch (_btnKey) {
      case 'back_button':

        break;

      case 'hint_btn':

        break;

      default: this.btn.setInteractive({ useHandCursor: true });
        break;
    }

  }
}

export default ButtonTween;

