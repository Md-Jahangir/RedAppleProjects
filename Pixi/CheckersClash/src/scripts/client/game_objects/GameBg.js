import { Texture, logDebugTexture, Sprite } from 'pixi.js';
import { Constant } from '../Constant.js';

class GameBg {
    static instance;

    constructor() {
        if (GameBg.instance) {
            return GameBg.instance;
        }
        this.bg = Sprite.from('splash_bg');
        // console.log("this.bg", this.bg);

        GameBg.instance = this;
    }

    static getInstance() {
        if (!GameBg.instance) {
            GameBg.instance = new GameBg();
        }
        return GameBg.instance;
    }

    // Change texture method
    static changeTexture(newTexturePath) {
        console.log("newT", newTexturePath);

        GameBg.getInstance().bg.texture = Texture.from(newTexturePath);
        GameBg.getInstance().bg.visible = true;
    }

    // Resize method
    static resize() {
        let scale = Math.min(Constant.game.app.screen.width / 1080, Constant.game.app.screen.height / 1920);
        GameBg.getInstance().bg.x = Constant.game.app.screen.width / 2;
        GameBg.getInstance().bg.y = Constant.game.app.screen.height / 2;
        if (Constant.game.app.screen.width > Constant.game.app.screen.height) {
            GameBg.getInstance().bg.width = 1080;
            GameBg.getInstance().bg.height = 1920;
            GameBg.getInstance().bg.scale.set(scale)
        }
        else {
            GameBg.getInstance().bg.width = Constant.game.app.screen.width;
            GameBg.getInstance().bg.height = Constant.game.app.screen.height;
            // bg.scale.set(1, 1);
        }
    }

    static getSprite() {
        return GameBg.getInstance().bg;
    }
}

export { GameBg };
