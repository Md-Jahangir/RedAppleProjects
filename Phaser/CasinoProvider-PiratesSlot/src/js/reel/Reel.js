import Symbol from "./Symbol.js";
import { SoundManager } from "../SoundManager.js";
import { GetRandomNumber } from "../Utils.js";
import { ShuffleArr } from "../Utils.js";
// import { GetRandomSymbols } from "../Utils.js";
import { Constant } from '../Constant.js';
import { Model } from "../Model.js";
// import ReelAnimation from './ReelAnimation.js';
/**
 *
 */
class Reel {
    constructor(scene, x, y, initialSymbols, spinDelay, bool, index, repeat) {
        this.symbolContainer = null;
        this.spineContainer = null;
        this.symbolArray = [];
        this.spinDelay = spinDelay;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.initialSymbolContainerY = null;
        this.background = null;
        this.finalPosY = null;

        this.finalPos = [];
        this.stop = false;
        this.counter = 0;
        this.completeCounter = 0;
        this.isFirstPlay = false;
        this.index = index;
        this.repeat = repeat.regularSpin[this.index];
        this.stopSound = false;
        this.durationArray = [326, 244, 163, 82, 1];
        this.durationArrayMobile = [165, 138, 163, 82, 1];
        this.symbols = ShuffleArr([
            "a",
            "q",
            "k",
            "j",
            "bomb",
            "gun",
            "anchor",
            "hero",
            "heroine",
            "hook",
            "letter",
            "octopus",
            "villain",
        ]);
        this.scale = 1;
        this.spinDuration = spinDelay;
        this.spinDistance = null;
        this.spinSpeed = null;
        this.obj = [];


        this.CreateReel();
    };

    CreateReel() {
        this.graphics = this.scene.add.graphics();
        this.graphics.beginPath();
        this.config = this.scene.cache.json.get("game_config");
        this.graphics.fillRect(
            (Constant.game.config.width / 19.2),
            (Constant.game.config.height / 13.5),
            (Constant.game.config.width / 1.47),
            (Constant.game.config.height / 1.45)
        );
        this.graphics.fillStyle(0xff00ff, 1);
        this.mask = this.graphics.createGeometryMask();
        this.container = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.symbolContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.spineContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.background = this.scene.add.image(this.x + 7, this.y + 10, "reel_bg").setOrigin(0, 0);
        this.container.add(this.background);
        // this.container.setDepth(1);
        for (let i = 0; i < 5; i++) {
            let symbol = new Symbol(this.scene, this.background.x, this.background.y + 10 + (this.config.reelView.reelIndexArray[i] * this.config.symbol.displayHeight), this.symbols[Math.floor(Math.random() * (11 - 0) + 0)], this.mask);
            symbol.setInitialY(this.y + 10 + (this.config.reelView.reelIndexArray[i] * this.config.symbol.displayHeight));
            symbol.setFinalPosY(this.y + 10 + (this.config.reelView.reelIndexArray[i] * this.config.symbol.displayHeight));
            this.initialSymbolContainerY = Constant.game.config.height / 2;
            this.symbolContainer.add(symbol.usualImg);
            this.spineContainer.add([symbol.symbolSpine, symbol.paylineSpine]);
            this.symbolArray.push(symbol);
            // this.symbolContainer.depth = 3;
            // this.spineContainer.depth = 4;
            this.finalPosY = this.y + (4 * this.config.symbol.displayHeight);
        }
        this.CreateBackInTween();
    };
    CreateBackInTween() {
        this.backInTween = this.scene.tweens.add({
            targets: this.symbolContainer,
            props: {
                y: {
                    value: '-=' + this.config.symbol.displayHeight,
                    duration: this.spinDelay,
                    ease: 'Back.In',
                }
            },
            repeat: 0,
            onComplete: () => {
                this.isFirstPlay = true;
                this.CreateBackOutTween();
            }
        });
        this.backInTween.pause();
    }
    CreateBackOutTween() {
        // this.FadeOutCamera();
        // console.log(' symbol COntaine', this.symbolContainer.postFX, this.symbolContainer);
        // this.symbolContainer.preFX.addBlur(1, 0, 0, 0, 0xffffff, 6);
        this.backOutTween = this.scene.tweens.add({
            targets: this.symbolContainer,
            ease: 'Linear',
            props: {
                y: {
                    value: "+=" + this.config.symbol.displayHeight,
                    duration: 85,
                    // ease: 'Power0',
                }
            },
            repeat: -1,
            onRepeat: (tween) => {
                if (!this.stop) {
                    // for (let i = 0; i < 5; i++) {
                    let randomSymbol = this.symbols[Math.floor(Math.random() * (11 - 0) + 0)];
                    const target = this.symbolContainer;
                    tween.updateTo('y', target.y + this.config.symbol.displayHeight, true);
                    target.last.y = target.first.y - this.config.symbol.displayHeight;
                    const symbol = target.last;
                    symbol.setVisible(true).setTexture('symbol_' + randomSymbol);
                    target.moveTo(symbol, 0);
                    // target.setDepth(0.1);

                    // const spineTarget = this.spineContainer;
                    // tween.updateTo('y', target.y + this.config.symbol.displayHeight, true);
                    // target.last.y = target.first.y - this.config.symbol.displayHeight;
                    // const symbol = target.last;
                    // console.log('symbol', symbol);
                    // symbol.setVisible(true).setTexture('symbol_' + randomSymbol);
                    // target.moveTo(symbol, 0);
                    // this.backOutTween.targets[0].list[i].setTexture('symbol_' + randomSymbol);
                    // target.first.y = target.last.y - this.config.symbol.displayHeight;
                    // target.first.setVisible(true).setTexture('symbol_' + randomSymbol);
                    // target.moveTo(target.first, 4);

                }
                else {
                    const gridModel = Model.GetNewGrid();
                    const reelData = gridModel[this.index];
                    reelData.forEach((symbolId, index) => {
                        const symbolSprite = this.symbolContainer.list[index];
                        symbolSprite.setTexture(`symbol_${symbolId}`).setVisible(true);
                        this.symbolArray[index].UpdateSpine(symbolId);
                    });
                    this.backOutTween.pause();
                    this.EndAnimation();
                }
            }
        });

    }
    FadeOutCamera() {
        let width = 800;
        let height = 600;
        let fadeOutRect = this.scene.add.rectangle(width / 2, height / 2, width, height, 0x000000);
        fadeOutRect.setAlpha(0); // Start fully transparent

        // Tween the alpha value to 1 (fully opaque) over 1 second
        this.scene.tweens.add({
            targets: fadeOutRect,
            alpha: 0.4,
            duration: 10000,
            onComplete: () => {
                // Start the next scene after the fade-out completes
            }
        });
    }
    EndAnimation() {
        for (let i = 0; i < 5; i++) {
            if (i == 0) {
                this.symbolContainer.y += this.config.symbol.displayHeight;
            }
            this.endTween = this.scene.tweens.add({
                targets: this.symbolContainer,
                props: {
                    y: {
                        value: '-=' + this.config.symbol.displayHeight,
                        duration: (this.spinDelay),
                    }
                },
                // ease: 'Back.out',
                repeat: 0,
                onComplete: () => {
                    SoundManager.SpinStopSound()
                    this.completeCounter++;
                    this.stop = false;
                    if (this.completeCounter == 5) {
                        this.scene.game.events.emit('evtUpdateRotationValue', 0.5, 6 - this.index, 6 - this.index - 1)
                        if (this.index == 4) {
                            this.scene.wheelRotationBool = false;
                            this.completeCounter = 0;
                            Constant.game.events.emit('evtShowWonPaylines');
                            Constant.game.events.emit("evtUpdateWinAmount", Model.getLastWin());
                        }
                    }

                }
            });
        }
    }
    ResumeAnimation(spinDelay) {
        this.completeCounter = 0;
        if (!this.isFirstPlay) {
            this.backInTween.resume();
        } else {
            this.backInTween = this.scene.tweens.add({
                targets: this.symbolContainer,
                props: {
                    y: {
                        value: '-=' + this.config.symbol.displayHeight,
                        duration: this.spinDelay,
                        ease: 'Back.In',
                    }
                },
                repeat: 0,
                onComplete: () => {
                    this.CreateBackOutTween();
                }
            });
        }


    }

    StopAnimation() {
        this.stop = true;
    };



    getSymbolPosition(index, reelIndex) {
        return this.obj[index].getPosition();
    };
    getPosition() {
        return new Phaser.Geom.Point(this.x, this.y);
    };
    getSymbolByIndex(reelIndex, symbolIndex) {
        return this.symbolArray[symbolIndex];
    };

    StopWinAnimation() {
        this.obj.forEach(element => {
            element.stopWin();
        });
    };


};
export default Reel;