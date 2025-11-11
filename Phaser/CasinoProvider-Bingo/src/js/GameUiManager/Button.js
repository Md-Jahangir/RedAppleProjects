import { SoundManager } from "../SoundManager";

export default class Button {
    constructor(scene, imgPrefix, config, anchor, textStr = null) {
        this.scene = scene;
        this.config = config;
        this.imgPrefix = imgPrefix;
        this.anchor = anchor;
        this.isDisabled = false;
        this.callback = null;
        this.callbackContext = null;
        this.callbackArguments = null;
        this.btnX = this.config.x;
        this.btnY = this.config.y;
        if (textStr != null) {
            this.textStr = textStr;
        }

        this.create();
    }
    create() {
        this.buttonObj = this.scene.add.image(0, 0, this.imgPrefix).setOrigin(this.anchor);
        if(this.textStr){
            this.textObj = this.scene.add.text (
                0,
                0,
                this.textStr, {
                fontFamily: "CAMBRIAB",
                fontStyle: "bold",
                fontSize: '40px',
                color: '#fff'
            }
            ).setOrigin(0.5);

        }
        this.Enable();
        this.ObjectEventsListener();
    }
    ObjectEventsListener() {
        this.buttonObj.on('pointerover', this.OnObjectOver, this);
        this.buttonObj.on('pointerout', this.OnObjectOut, this);
        this.buttonObj.on('pointerdown', this.OnObjectDown, this);
        this.buttonObj.on('pointerup', this.OnObjectUp, this);
    }
    OnObjectOver() {

    }
    OnObjectOut() {

    }
    OnObjectDown() {
        SoundManager.ButtonClickSound();
    }
    OnObjectUp() {
        if (this.callbackArguments == null) {
            this.callback.apply(this.callbackContext);
        } else {
            this.callback.apply(this.callbackContext, this.callbackArguments);
        }
    }
    SetClickCallBack(callback, callbackContext, callbackArguments = null) {
        this.callback = callback;
        this.callbackContext = callbackContext;
        this.callbackArguments = callbackArguments;
    }
    Enable() {
        this.buttonObj.setInteractive({ useHandCursor: true });
    }
    Disable() {
        this.buttonObj.removeInteractive();
    }
    Hide() {
        this.buttonObj.setVisible(false);
        if(this.textStr) this.textObj.setVisible(false);
    }
    Show() {
        this.buttonObj.setVisible(true);
        if(this.textStr) this.textObj.setVisible(true);
    }
    setPosition(newX, newY) {
        this.btnX = newX;
        this.btnY = newY;

        this.buttonObj.setPosition(this.btnX, this.btnY);
        if(this.textStr) this.textObj.setPosition(this.buttonObj.x , this.buttonObj.y);
    };
    setScale(newScale) {
        this.buttonObj.setScale(newScale);
        if(this.textStr) this.textObj.setScale(newScale);
    }

}