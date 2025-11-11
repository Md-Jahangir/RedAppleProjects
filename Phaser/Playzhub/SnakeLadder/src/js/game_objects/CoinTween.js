/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 24-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 13-06-2025
 * @Description :- Coin tweens.
 ************************************/

import gsap from 'gsap';
import { Constant } from '../Constant';
// import { AudioManager } from '../media/AudioManager';

class CoinTween {
  constructor(scene, obj, callback = null) {
    this.scene = scene;
    this.gObj = obj;
    this.coinTween = null;
    this.coinToBase = null;
    this.callback = callback;
    this.destroyCoinsCount = 0;
    this.length = obj.length;

    this.TweenCoin();
  }

  TweenCoin() {
    gsap.to(this.gObj, {
      duration: 0.4,
      repeat: 0,
      scaleX: 1.7, //* Constant.newScale,
      scaleY: 1.7, //* Constant.newScale,
      stagger: 0.07,
      ease: 'none',
      onComplete: () => {
        gsap.to(this.gObj, {
          duration: 0.3,
          repeat: 0,
          scaleX: 1,// * Constant.newScale,
          scaleY: 1,// * Constant.newScale,
          // stagger: 0.07,
          ease: 'none',
        });
        this.TweenCoinToCoinBase(this.gObj);
      }
    });
  }

  TweenCoinToCoinBase(_obj) {
    let targetObject = this.scene.topGemsBaseContainer.list[1];

    const worldPos = new Phaser.Math.Vector2();
    const tempMatrix = new Phaser.GameObjects.Components.TransformMatrix();
    targetObject.getWorldTransformMatrix(tempMatrix);
    tempMatrix.transformPoint(0, 0, worldPos);

    const yourContainer = this.gObj.parentContainer;
    if (!yourContainer) {
      console.warn('yourObject must be inside a container');
    }

    const yourMatrix = new Phaser.GameObjects.Components.TransformMatrix();
    yourContainer.getWorldTransformMatrix(yourMatrix);

    yourMatrix.invert();

    const localPos = new Phaser.Math.Vector2();
    yourMatrix.transformPoint(worldPos.x, worldPos.y, localPos);

    gsap.to(this.gObj, {
      duration: 0.5,
      repeat: 0,
      x: localPos.x - targetObject.width / 2.6,
      y: localPos.y,
      stagger: 0.06,
      ease: 'none',
      onComplete: () => {
        this.checkAllElementsDestroyed(_obj);
      }
    });

  }

  checkAllElementsDestroyed() {
    this.gObj.setAlpha(0);
    this.gObj.destroy();
    if (this.callback) {
      this.callback();
    }
  }
}

export default CoinTween;

