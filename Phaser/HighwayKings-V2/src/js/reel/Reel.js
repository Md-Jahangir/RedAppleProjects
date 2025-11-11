import Symbol from "./Symbol.js";
import { SoundManager } from "../SoundManager.js";
import { GetRandomNumber } from "../Utils.js";
import { Constant } from "../Constant.js";

/**
 *
 */
class Reel {
    constructor(scene, x, y, initialSymbols, spinDelay) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.background = null;
        this.symbols = [];
        this.scale = 1;
        this.spinDelay = spinDelay;
        this.create(initialSymbols);
    };

    create(initialSymbols) {
        this.background = this.scene.add.image(this.x, this.y, "reel_bg").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        for (let i = 0; i < initialSymbols.length; i++) {
            let symbol = new Symbol(this.scene, this.background.x, this.background.y / 1.8, initialSymbols[i]);
            symbol.usualImg.y = this.background.y + (i * symbol.getHeight() + (7 * Constant.scaleFactorY));
            symbol.spinAnim.y = this.background.y + (i * symbol.getHeight() + (7 * Constant.scaleFactorY));
            symbol.winAnim.y = this.background.y + (i * symbol.getHeight() + (7 * Constant.scaleFactorY));
            this.symbols.push(symbol);
        }
    };

    getSymbolPosition(index) {
        return this.symbols[index].getPosition();
    };

    getSymbolByIndex(_index) {
        return this.symbols[_index];
    };

    spin() {
        this.scene.time.addEvent({
            callback: () => {
                this.symbols.forEach((elem) => {
                    elem.playSpin(GetRandomNumber(0, 11));
                });
            },
            callbackScope: this
        });
    };

    stop() {
        if (this.normalStopTimeEvt != null) {
            this.normalStopTimeEvt.remove();
        }
        this.normalStopTimeEvt = this.scene.time.addEvent({
            delay: this.spinDelay,
            callback: () => {
                this.symbols.forEach((elem, index) => {
                    elem.stopSpin();
                });
            },
            callbackScope: this
        });
        this.PlayStopSpinSoundOneByOne();
    };

    stopImmediate() {
        this.StopAllSound();
        if (this.normalStopTimeEvt != null) {
            this.normalStopTimeEvt.remove();
        }
        this.symbols.forEach((elem, index) => {
            elem.stopSpin();
        });
    };

    getPosition() {
        return new Phaser.Geom.Point(this.x, this.y);
    };

    setSymbols(newSymbols) {
        this.symbols.forEach((elem, index) => {
            elem.setSymbol(newSymbols[index]);
        });
    };


    PlayStopSpinSoundOneByOne() {
        this.s1 = setTimeout(() => {
            SoundManager.SpinStopSound();
        }, 200);

        this.s2 = setTimeout(() => {
            SoundManager.SpinStopSound();
        }, 400);

        this.s3 = setTimeout(() => {
            SoundManager.SpinStopSound();
        }, 700);

        this.s4 = setTimeout(() => {
            SoundManager.SpinStopSound();
        }, 1000);

        this.s5 = setTimeout(() => {
            SoundManager.SpinStopSound();
        }, 1300);
    }

    StopAllSound() {
        if (this.s1) {
            clearTimeout(this.s1);
            this.s1 = 0;
        }
        if (this.s2) {
            clearTimeout(this.s2);
            this.s2 = 0;
        }
        if (this.s3) {
            clearTimeout(this.s3);
            this.s3 = 0;
        }
        if (this.s4) {
            clearTimeout(this.s4);
            this.s4 = 0;
        }
        if (this.s5) {
            clearTimeout(this.s5);
            this.s5 = 0;
        }

    }

};

export default Reel;