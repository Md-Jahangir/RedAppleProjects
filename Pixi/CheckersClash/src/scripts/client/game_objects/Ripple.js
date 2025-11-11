/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 19-05-2024.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 19-05-2024
 * @Description :- Ripple tweens.
 ************************************/

import * as PIXI from 'pixi.js';
import { Assets, Sprite, Texture, Container, Text, TextStyle, Graphics } from 'pixi.js';
import gsap from 'gsap';

class Ripple {
    constructor(obj) {
        this.ripple = null;
        this.gObj = obj;

        this.CreateRipple();
    }

    CreateRipple() {
        this.ripple = Sprite.from('ripple');

        this.ripple.anchor.set(0.5);

        this.ripple.alpha = 0;
        this.ripple.width = this.gObj.width;
        this.ripple.height = this.gObj.height;
        this.ripple.position.set(this.gObj.x, this.gObj.y);

        this.CreateRippleTween();

    }

    CreateRippleTween() {
        gsap.to(this.ripple, {
            alpha: 1,
            duration: 0.30,
            ease: "sine.out",
            onComplete: () => {
                this.ripple.alpha = 0;
            }
        });

        gsap.to(this.ripple.scale, {
            x: 2,
            y: 2,
            duration: 0.50,
            ease: "expoScale(0.5,7,power1.out)",
        });


    }

}
export default Ripple;
