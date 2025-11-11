import * as PIXI from 'pixi.js';
import { Assets, Sprite, Texture, Container, Text, TextStyle, Graphics } from 'pixi.js';
import gsap from 'gsap';

class Emoji {
    constructor() {
        // Only allow one instance
        if (Emoji._instance) {
            return Emoji._instance;
        }
        Emoji._instance = this;

        // Prepare emoji sprite (not attached to stage yet)
        this.emoji = Sprite.from('ripple'); // Replace 'ripple' with your default emoji texture if needed
        this.emoji.anchor.set(0.5);
        this.emoji.visible = false;
    }

    /**
     * Get the singleton instance of Emoji.
     */
    static getInstance() {
        if (!Emoji._instance) {
            Emoji._instance = new Emoji();
        }
        return Emoji._instance;
    }

    // Change texture method
    static changeTexture(newTextureKey) {
        const emojiData = Assets.get('texture_data');
        console.log("texture data log", emojiData);

        Emoji.getInstance().emoji.texture = Sprite.from(emojiData.textures[newTextureKey]).texture;
        Emoji.getInstance().emoji.visible = true;
    }

    /**
     * Triggers an emoji animation on the given display object.
     * @param {PIXI.DisplayObject} gObj
     * @param {PIXI.Container} parentContainer (ensure this, or use gObj.parent)
     */
    static animateEmoji(gObj, gameTile, parentContainer = null) {
        // Set size, position, reset alpha/scale
        // Emoji.getInstance().emoji.width = gObj.width;
        // Emoji.getInstance().emoji.height = gObj.height;
        const instance = Emoji.getInstance();
        instance.emoji.position.set(gameTile.x, gameTile.y);
        instance.emoji.width = gameTile.width;
        instance.emoji.height = gameTile.height;
        // instance.emoji.alpha = 0;
        // instance.emoji.scale.set(0.25);

        // Add to container if not already added
        // if (!this.emoji.parent) {
        //     if (parentContainer) {
        //         parentContainer.addChild(this.emoji);
        //     } else if (gObj.parent) {
        //         gObj.parent.addChild(this.emoji);
        //     }
        // }

        // Animate using GSAP
        // gsap.to(instance.emoji.scale, {
        //     x: 0.25,
        //     y: 0.25,
        //     duration: 0.50,
        //     ease: "expoScale(0.5,7,power1.out)",
        // });
        // 1. Restore to normal size and alpha
        // gsap.to(instance.emoji.scale, {
        //     x: 0.7,
        //     y: 0.7,
        //     duration: 0.30,
        //     ease: "sine.out",
        //     onComplete: () => {
        // Ensure fully visible
        instance.emoji.alpha = 1;
        // 2. Shake animation (using rotation or x wiggle)
        gsap.to(instance.emoji, {
            rotation: 0.25,       // Rotate right
            duration: 0.07,
            yoyo: true,
            repeat: 3,            // Shake a few times
            ease: "power1.inOut",
            onComplete: () => {
                gsap.to(instance.emoji, {
                    rotation: 0,     // Reset rotation smoothly
                    duration: 0.1,
                    ease: "power1.inOut",
                    onComplete: () => {
                        instance.emoji.visible = false;
                    }
                });
                // 3. Gradually scale down and fade out
                // gsap.to(instance.emoji, {
                //     scaleX: 0.2,
                //     scaleY: 0.2,
                //     alpha: 0,
                //     duration: 0.3,
                //     ease: "power2.in"
                // });
            }
        });
        // }
        // });
        // Ensure both x/y scale are controlled!
        gsap.to(instance.emoji, {
            alpha: 1,
            duration: 0.3,
            ease: "sine.out"
        });

    }

    static getSprite() {
        const instance = Emoji.getInstance();
        return instance.emoji;
    }
}

export { Emoji };
