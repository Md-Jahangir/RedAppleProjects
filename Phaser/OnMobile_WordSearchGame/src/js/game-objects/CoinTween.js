
/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 24-09-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 24-09-2024
 * @Description :- Coin tweens.
 ************************************/

import gsap from 'gsap';
import { Constant } from '../Constant';
import { AudioManager } from '../media/AudioManager';

class CoinTween {
  constructor(scene, obj, callback) {
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
    // const startScale = 0 * Constant.newScale;
    // const targetScale = 1 * Constant.newScale;

    gsap.to(this.gObj, {
      duration: 0.3,
      repeat: 0,
      scaleX: 0.7 * Constant.newScale,
      scaleY: 0.7 * Constant.newScale,
      stagger: 0.07,
      ease: 'none',
      onComplete: () => {
        gsap.to(this.gObj, {
          duration: 0.4,
          repeat: 0,
          scaleX: 1 * Constant.newScale,
          scaleY: 1 * Constant.newScale,
          // stagger: 0.07,
          ease: 'none',
        });
      }
    });

    // First tween for a gentle scale-down effect
    // this.coinTween = this.scene.tweens.add({
    //       targets: this.gObj,
    //       props: {
    //         scaleX: {
    //           value: 0.5 * Constant.newScale,
    //         },
    //         scaleY: {
    //           value: 0.5 * Constant.newScale,
    //         },
    //       },
    //       ease: 'Quad.easeInOut', // Use a gradual easing function
    //       repeat: 0,
    //       duration: 250, // Increased duration for a slower, smoother effect
    //       delay: this.scene.tweens.stagger(130), // Reduced delay for immediate and fluid start
    //       onUpdate: (tween, target) => {
    //         // Get the current progress of the tween (between 0 and 1)
    //         const progress = tween.progress;

    //         // Lerp the scale values using Phaser.Math.Linear or a simple linear interpolation
    //         target.scaleX = Phaser.Math.Linear(startScale, targetScale, progress);
    //         target.scaleY = Phaser.Math.Linear(startScale, targetScale, progress);
    //       },
    //       onComplete: () => {
    //         // Second tween for a more noticeable bounce effect
    //         this.scene.tweens.add({
    //           targets: this.gObj,
    //           props: {
    //             scaleX: {
    //               value: 0.5 * Constant.newScale,
    //             },
    //             scaleY: {
    //               value: 0.5 * Constant.newScale,
    //             },
    //           },
    //           ease: 'Quad.easeInOut',
    //           repeat: 0,
    //           duration: 150,

    //           //   onComplete: () => {
    //           //     this.TweenCoinToCoinBase(this.gObj);
    //           //   }
    //         });
    //       }

    //     });
    setTimeout(() => {
      this.TweenCoinToCoinBase(this.gObj);
    }, 550);
  }

  TweenCoinToCoinBase(_obj) {
    AudioManager.PlayCoinAnimAudio();

    // console.log("gerer");
    const child = this.scene.topPanelContainer.list[1];

    // Create a temporary matrix to get world position
    const worldMatrix = new Phaser.GameObjects.Components.TransformMatrix();
    this.scene.topPanelContainer.getWorldTransformMatrix(worldMatrix);

    // Get child's world position, adjusting for width to start at left edge
    const worldX = (worldMatrix.tx + ((child.x - (child.width / 2.7)) * this.scene.topPanelContainer.scaleX));
    const worldY = (worldMatrix.ty + (child.y * this.scene.topPanelContainer.scaleY));


    gsap.to(_obj, {
      duration: 0.3,
      repeat: 0,
      x: worldX,
      y: worldY,
      stagger: 0.06,
      ease: 'none',
      onComplete: () => {
        _obj.forEach(element => {
          element.destroy();
        });
        this.checkAllElementsDestroyed(_obj);
      }
    });

    // console.log("");

    // const startScale = 0;
    // this.coinTween = this.scene.tweens.add({
    //   targets: _obj,
    //   // x: this.scene.pointBase.x - (this.scene.pointBase.width / 2.7),
    //   // y: this.scene.pointBase.y,

    //   scaleX: 0.5 * Constant.newScale,
    //   scaleY: 0.5 * Constant.newScale,
    //   delay: 100,
    //   ease: 'Circ.easeInOut',
    //   repeat: 0,
    //   duration: 120,
    //   delay: this.scene.tweens.stagger(200),
    //   onComplete: () => {
    //     _obj.forEach(element => {
    //       element.destroy();
    //     });
    //     this.checkAllElementsDestroyed(_obj);
    //   }
    // });
  }

  checkAllElementsDestroyed(_obj) {
    const allDestroyed = _obj.every(element => element === null || !element.scene); // Check if each element is destroyed

    if (allDestroyed) {
      // All elements are destroyed, execute the callback here
      if (this.callback) {
        this.callback(); // Call the callback function
      }
    }
  }
}

export default CoinTween;

