import { Constant } from "../Constant";
import { SoundManager } from "../SoundManager";

export default class Button {
    constructor(scene, imgKey, x, y, scaleX, scaleY, isSpriteSheet) {
        this.scene = scene;
        this.imgKey = imgKey;
        this.x = x;
        this.y = y;
        this.scale = scaleX;
        this.isSpriteSheet = isSpriteSheet;


        this.clickCallback = null;
        this.clickCallbackContext = this;
        this.clickCallbackArgs = null;

        this.create();
    }
    create() {
        if (this.isSpriteSheet) {
            this.button = this.scene.add.sprite(this.x, this.y, this.imgKey, 0);
        }
        else {
            this.button = this.scene.add.image(this.x, this.y, this.imgKey);
        }
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
            SoundManager.ButtonClickSound();
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
    SetFrame(_frame) {
        this.button.setFrame(_frame);
    }

    //#region - Show the button
    show() {
        this.button.setVisible(true);
    };
    //#endregion

    //#region - Hide the button
    hide() {
        this.button.setVisible(false);
    };
    //#endregion

}