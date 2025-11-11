import { SoundManager } from "./SoundManager";

export default class Button {
    constructor(scene, x, y, key, isSprite, frame) {
        //#region -Variables
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.key = key;
        this.isSprite = isSprite;
        this.frame = frame;
        //#endregion
        this.create();
    }
    //#region -Create
    create() {
        if (this.isSprite) {
            this.button = this.scene.add.sprite(this.x, this.y, this.key, this.frame)
                .setInteractive()
                .setScrollFactor(0);
            this.CheckLocalStrg();
        }
        else {
            this.button = this.scene.add.image(this.x, this.y, this.key)
                .setInteractive()
                .setScrollFactor(0);
        }
    }
    //#endregion

    //#region -CheckLocalStrg
    CheckLocalStrg() {
        if (this.key == 'button_music') {
            if (localStorage.getItem('sound_status_ec') == null) {
                localStorage.setItem('sound_status_ec', 1);
                this.frame = 0;
            } else {
                if (localStorage.getItem('sound_status_ec') == 1) {
                    this.button.setFrame(0);
                    this.frame = 0;
                } else {
                    this.frame = 1;
                    this.button.setFrame(1);
                }
            }
        }
    }
    //#endregion

    //#region -UpdateMusicFrame
    UpdateMusicFrame() {
        if (this.frame == 0) {
            this.button.setFrame(1);
            this.frame = 1;
            localStorage.setItem('sound_status_ec', 0);
            SoundManager.StopGameBgMusic();
            return;
        } else {
            this.button.setFrame(0);
            this.frame = 0;
            SoundManager.PlayGameBgMusic();
            localStorage.setItem('sound_status_ec', 1);
            return;
        }
    }
    //#endregion

    //#region -UpdateFullScreenFrame
    UpdateFullScreenFrame() {
        if (this.scene.scale.isFullscreen) {
            this.scene.scale.stopFullscreen();
        } else {
            this.scene.scale.startFullscreen();
        }
        if (this.frame == 0) {
            this.button.setFrame(1);
            this.frame = 1;
            return;
        } else {
            this.button.setFrame(0);
            this.frame = 0;
            return;
        }
    };
    //#endregion

    //#region -OnClick
    OnClick(callback, callbackContext) {
        this.button.on("pointerdown", () => {
            callback.call(callbackContext);
            SoundManager.PlayButtonSound();
        })
    }
    //#endregion

    //#region -SetVisible
    SetVisible(_bool) {
        this.button.SetVisible(_bool);
    }
    //#endregion

    //#region -resize
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} newScale 
     * @param {number} inCont 
     */
    Resize(x, y, newScale, inCont) {
        this.button.setScale(newScale);
        this.button.setPosition(x, y);
    }
    //#endregion
}