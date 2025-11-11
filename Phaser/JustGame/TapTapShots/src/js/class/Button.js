import { Constant } from "../Constant";

export default class Button {
    constructor(scene, imgKey, x, y, scaleX, scaleY) {
        this.scene = scene;
        this.imgKey = imgKey;
        this.x = x;
        this.y = y;
        this.scale = scaleX;


        this.clickCallback = null;
        this.clickCallbackContext = this;
        this.clickCallbackArgs = null;
        this.create();
    }
    create() {
        this.button = this.scene.add.image(this.x, this.y, this.imgKey);
        this.button.setInteractive();
        this.button.on('pointerover', this.OnOver, this);
        this.button.on('pointerout', this.OnOut, this);
        this.button.on('pointerup', this.OnUp, this);
    }
    setClickcallback(callback, context = null, args = null) {
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
            if (this.clickCallbackArgs == null) {
                this.clickCallback.apply(this.clickCallbackContext, this.clickCallbackArgs);
            }
        }
    }
    SetScale(newScale) {
        this.button.setScale(newScale);
        this.scale = newScale;
    }
    SetPosition(x, y) {
        this.button.setPosition(x, y);
    }

}