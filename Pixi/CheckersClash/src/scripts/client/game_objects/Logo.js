import * as PIXI from 'pixi.js';
import { Assets, Sprite, Texture, Container, Text, TextStyle, Graphics } from 'pixi.js';
import { Constant } from '../Constant.js';

class Logo {
    constructor() {
        // Only allow one instance
        if (Logo._instance) {
            return Logo._instance;
        }
        Logo._instance = this;

        // Prepare logo sprite (not attached to stage yet)
        this.logo = Sprite.from(Constant.uiAtlas.textures['Logo']); // Replace 'ripple' with your default logo texture if needed
        this.logo.anchor.set(0.5);
    }

    /**
     * Get the singleton instance of Emoji.
     */
    static getInstance() {
        if (!Logo._instance) {
            Logo._instance = new Logo();
        }
        return Logo._instance;
    }

    // Change texture method
    static changeTexture(newTextureKey) {
        const logoData = Assets.get('texture_data');
        console.log("texture data log", logoData);

        Logo.getInstance().logo.texture = Sprite.from(logoData.textures[newTextureKey]).texture;
        Logo.getInstance().logo.visible = true;
    }

    static getSprite() {
        return Logo.getInstance().logo;
    }
}

export { Logo };
