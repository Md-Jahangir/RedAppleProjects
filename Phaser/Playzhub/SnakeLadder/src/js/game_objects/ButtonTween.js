
/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 23-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 24-09-2024
 * @Description :- Button tweens.
 ************************************/

// import { Constant } from '../Constant';

class ButtonTween {
  constructor(scene, btn, btnTxt = null, xtraImg = null, scaleX = 0.85, scaleY = 0.85, duration = 150, factor = 1) {
    this.scene = scene;
    this.btn = btn;
    this.btnTxt = btnTxt;
    this.xtraImg = xtraImg;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.originalScaleX = btn.scaleX;
    this.originalScaleY = btn.scaleY;
    this.duration = duration;
    this.factor = factor;
    this.btnTween = null;
    this.TweenButton();
  }

  TweenButton() {
    this.btn.removeInteractive();

    this.btnTween = this.scene.tweens.add({
      targets: [this.btn, this.btnTxt],
      scaleX: this.scaleX * this.factor,
      scaleY: this.scaleY * this.factor,
      ease: 'Linear',
      repeat: 0,
      duration: this.duration,
      yoyo: true,
      onComplete: () => {
        this.CheckButtonAndFunction(this.btn.frame.name);
      }
    });
  }

  CheckButtonAndFunction(_btnKey) {
    switch (_btnKey) {
      // case 'back_button':

      //   break;

      case 'hint_btn':

        break;

      default: this.btn.setInteractive({ useHandCursor: true });
        break;
    }

  }
}

export default ButtonTween;

