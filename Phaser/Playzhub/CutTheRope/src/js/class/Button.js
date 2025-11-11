import Texture from "../gameObjectsClass/Texture";
import { SoundManager } from "../SoundManager";

export default class Button {
    constructor(scene, imgKey, scale) {
        this.scene = scene;
        this.imgKey = imgKey;
        this.scale = scale;
        this.clickCallback = null;
        this.clickCallbackContext = this;
        this.clickCallbackArgs = null;

        this.create();
    }
    create() {
        this.button = new Texture(this.scene, 0, 0, this.imgKey);
        this.button.setInteractive({ cursor: 'pointer' });
        this.button.on('pointerover', this.OnOver, this);
        this.button.on('pointerout', this.OnOut, this);
        this.button.on('pointerup', this.OnUp, this);
    }
    setClickcallback(callback, context = null, args = []) {
        this.clickCallback = callback;
        this.clickCallbackContext = context === null ? this : context;
        this.clickCallbackArgs = args;
    }
    OnOver() {
        this.button.setScale(this.scale * 1.2);
    }
    OnOut() {
        this.button.setScale(this.scale);
    }
    OnUp() {
        if (this.clickCallback) {
            // if (this.clickCallbackArgs == null) {
            //     this.clickCallback.apply(this.clickCallbackContext, this.clickCallbackArgs);
            // }
            SoundManager.ButtonClickSound();
            this.clickCallback.apply(this.clickCallbackContext, this.clickCallbackArgs);
        }
    }
    TouchEnable() {
        this.button.setInteractive({ cursor: 'pointer' });
    }
    TouchDisable() {
        this.button.removeInteractive();
    }
    SetScale(newScale) {
        this.scale = newScale;
        this.button.SetScale(newScale);
    }
    SetDepth(_depth) {
        this.button.SetDepth(_depth);
    }
    // OffEvent() {
    //     this.button.off('pointerover');
    //     this.button.off('pointerout');
    //     this.button.off('pointerup');
    // }
}