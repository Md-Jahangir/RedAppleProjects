import Symbol from "./Symbol.js";
import { SoundManager } from "../SoundManager.js";
import { GetRandomNumber } from "../Utils.js";
import { ShuffleArr } from "../Utils.js";
// import { GetRandomSymbols } from "../Utils.js";
import { Constant } from '../Constant.js';
// import ReelAnimation from './ReelAnimation.js';
/**
 *
 */
class Reel {
    constructor(scene, x, y, initialSymbols, spinDelay, bool, index) {
        // window.alert(Math.floor(Constant.game.config.height))
        // console.log("ReelsView2")
        this.spinDelay = spinDelay;

        this.totalTime = 700;
        this.verticalDifference = null;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.background = null;
        this.finalPosY = null;
        this.stop = false;
        this.counter = 0;
        this.finalPos = [];
        this.completeCounter = 0;
        this.randomVal = GetRandomNumber(0, 2);
        // console.log('this.randomVal : ', this.randomVal)
        this.index = index;
        // console.log('index1111', this.index)
        // this.playCounter = 0;
        this.rndNumOfSymbols = [];

        this.repeatsStep = 0;
        this.stopSound = false;
        this.symbols = ShuffleArr([
            "9",
            "10",
            "a",
            "character_4",
            "character_1",
            "character_2",
            "character_3",
            "j",
            "k",
            "q",
            "scatter",
            // "misterey"
        ]);
        this.bluredSymbols = ShuffleArr([
            "Blured_9",
            "Blured_10",
            "Blured_a",
            "Blured_character_4",
            "Blured_character_1",
            "Blured_character_2",
            "Blured_character_3",
            "Blured_j",
            "Blured_k",
            "Blured_q",
            "Blured_scatter",
            // "Blured_misterey"
        ]);
        this.scale = 1;
        this.spinDelay = spinDelay;
        this.obj = [];
        this.animationTweenArr = [];
        this.temp_bool = bool;
        this.randomSymbolsToSpawnArr = [];
        this.newSymbol = [];
        //===========================
        let graphics = this.scene.add.graphics();
        // graphics.fillStyle(0x00ffff);
        graphics.beginPath();

        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                // console.log('when portrait graphics')
                graphics.fillRect(
                    // (Constant.game.config.width / 9.9),
                    // (Constant.game.config.height / 3.2),
                    // (Constant.game.config.width / 1.27),
                    // (Constant.game.config.height / 2.65)

                    (Constant.game.config.width / 9.9),
                    (Constant.game.config.height / 3.05),
                    (Constant.game.config.width / 1.27),
                    (Constant.game.config.height / 2.85)
                );
            }
            else {
                graphics.fillRect(
                    (Constant.game.config.width / 3.606),
                    (Constant.game.config.height / 7.9),
                    (Constant.game.config.width / 2.254),
                    (Constant.game.config.height / 1.61)
                );
            }
        }
        else {
            // console.log('when Desktop graphics')
            graphics.fillRect(
                // (Constant.game.config.width / 3.606),
                // (Constant.game.config.height / 8.84),
                // (Constant.game.config.width / 2.254),
                // (Constant.game.config.height / 1.53)

                (Constant.game.config.width / 3.606),
                (Constant.game.config.height / 7.9),
                (Constant.game.config.width / 2.254),
                (Constant.game.config.height / 1.61)
            );
        }

        // graphics.fillStyle(0xff0000);
        this.mask = graphics.createGeometryMask();
        // this.mask.depth = 5;
        //=============================
        this.CreateReelAnimation();
        this.PlaySpineAnimation();

        // if (Constant.isMobile) {
        //     if (Constant.isPortrait) {
        //         // this.mystry = this.scene.add.image(this.x, this.y + Constant.game.config.height / 5.3, "misterey_symbol").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 0.98, Constant.scaleFactorY * 1.05);//* 0.93);


        //         this.slowReelAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 5.71, 'slowreel_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        //         this.slowReelAnim.play("Slowreel_Animation");


        //         this.thorAnim = this.scene.add.spine(this.x - Constant.game.config.width / 7.5, this.y - Constant.game.config.height / 9.3, 'thor_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        //         this.thorAnim.play("Thor_Animation");


        //     }
        //     else {
        //         // this.mystry = this.scene.add.image(this.x, this.y + Constant.game.config.height / 3, "misterey_symbol").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 0.98, Constant.scaleFactorY * 1.05);//* 0.93);

        //         this.slowReelAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 3.21, 'slowreel_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        //         this.slowReelAnim.play("Slowreel_Animation");

        //         this.thorAnim = this.scene.add.spine(this.x - Constant.game.config.width / 13.7, this.y - Constant.game.config.height / 5.3, 'thor_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        //         this.thorAnim.play("Thor_Animation");
        //     }
        // }
        // else {
        //     // this.mystry = this.scene.add.image(this.x, this.y + Constant.game.config.height / 3.01, "misterey_symbol").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 0.98, Constant.scaleFactorY * 1.02);//* 0.93);
        //     this.slowReelAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 3.21, 'slowreel_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        //     this.slowReelAnim.play("Slowreel_Animation");

        //     this.thorAnim = this.scene.add.spine(this.x - Constant.game.config.width / 13.7, this.y - Constant.game.config.height / 5.3, 'thor_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        //     this.thorAnim.play("Thor_Animation");

        //     // console.log('this.x : ', this.x);
        //     console.log("Thor ANimation and Slowreel NAimatin")
        //     // console.log('this.y : ', this.y + Constant.game.config.height / 3.01)
        // }
        // this.thorAnim.depth = 1;
        // this.thorAnim.alpha = 0;
        // this.thorAnim.setVisible(false);

        // this.slowReelAnim.depth = 1;
        // this.slowReelAnim.setVisible(false);



        // if (Constant.isMobile) {
        //     if (Constant.isPortrait) {
        //         // this.speed1 = (Constant.game.config.width / 20);
        //         // this.speed2 = (Constant.game.config.height / 1.4);
        //         this.speed1 = (Constant.game.config.width / 20);
        //         this.speed2 = (Constant.game.config.height / 1.4);
        //     }
        //     else {
        //         // this.speed1 = (Constant.game.config.width);
        //         // this.speed2 = (Constant.game.config.height / 1.4);
        //         // this.speed1 = 900;//Math.floor(Constant.game.config.height / 1.4);
        //         // this.speed2 = 1010;//Math.floor(Constant.game.config.height / 5);
        //         this.speed1 = (Constant.game.config.width / 20);
        //         this.speed2 = (Constant.game.config.height / 1.4);
        //     }

        // }
        // else {
        //     this.speed1 = 400;//(Constant.game.config.width / 4.8)
        //     this.speed2 = 300;//(Constant.game.config.width / 6.4)
        // }

        this.testCounter = 0;
        this.playThunder = false;

        // this.slowReelAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 1.01, 'slowreel_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        // this.slowReelAnim.play("Slowreel_");
        // this.slowReelAnim.setVisible(false);
    };
    CreateReelAnimation() {
        this.background = this.scene.add.image(this.x, this.y, "reel_bg").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.background.setVisible(false);


        let symbol1 = new Symbol(this.scene, this.x, this.y, this.symbols[Math.floor(Math.random() * (11 - 0) + 0)], this.mask);
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                symbol1.setY(this.y / 2.15);
                symbol1.setInitailY(this.y / 2.15);
            }
            else {
                symbol1.setY(-this.y * 1.4);
                symbol1.setInitailY(-this.y * 1.4);
            }
        }
        else {
            symbol1.setY(this.y / 5);
            symbol1.setInitailY(this.y / 5);
        }
        this.obj.push(symbol1);
        this.finalPos.push(this.y / 5);
        for (let i = 0; i < 3; i++) {
            let symbol = new Symbol(this.scene, this.x, this.y, this.symbols[Math.floor(Math.random() * (11 - 0) + 0)], this.mask);
            symbol.setY(this.background.y + (i * symbol.usualImg.displayHeight / 1) + (symbol.usualImg.displayHeight / 2));
            if (Constant.isMobile) {
                if (Constant.isPortrait) {
                    symbol.setInitailY(this.y / 2.15);
                }
                else {
                    symbol.setInitailY(this.y / 5);
                }
            }
            else {
                symbol.setInitailY(this.y / 5);
            }
            this.obj.push(symbol);
            this.finalPos.push(this.background.y + (i * symbol.usualImg.displayHeight / 1) + (symbol.usualImg.displayHeight / 2));
        }
        let symbol = new Symbol(this.scene, this.x, this.y, this.symbols[Math.floor(Math.random() * (11 - 0) + 0)], this.mask);
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                symbol.setY(this.y / 1.215);
                symbol.setInitailY(this.y / 2.15);
            }
            else {
                symbol.setY(this.y / 5.13);
                symbol.setInitailY(-this.y * 1.4);
            }
        }
        else {
            symbol.setY(this.background.y + (3 * symbol.usualImg.displayHeight / 1) + (symbol.usualImg.displayHeight / 2));
            symbol.setInitailY(this.y / 5);
        }
        this.obj.push(symbol);
        this.finalPos.push(this.background.y + (3 * symbol.usualImg.displayHeight / 1) + (symbol.usualImg.displayHeight / 2))
        // console.log('obj-------------->', this.obj)

        // console.log(this.background.y + (3 * symbol.usualImg.displayHeight / 1) + (symbol.usualImg.displayHeight / 2))
        this.finalPosY = this.background.y + (3 * symbol1.usualImg.displayHeight / 1) + (symbol1.usualImg.displayHeight / 2);
        // console.log('obj reff--------------->', this.finalPosY);
        // console.log('this.finalPos', this.finalPos);
        // console.log('this.obj :----------------------->', this.obj)
        this.CreateAnimation();
    };
    CreateAnimation() {

        //----------------------------------------------------------------------------------
        let firstTweenDuration, backInWidth;
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                // firstTweenDuration = Math.floor(Constant.game.config.height / 3.5) * Constant.currentRatio;
                // firstTweenDuration = Math.floor(Constant.game.config.height / 10) * Constant.currentRatio;//650;//650; //----------------------->

                // firstTweenDuration = Math.floor(Constant.game.config.height / 7) * Constant.currentRatio;//--------------------->
                // firstTweenDuration = parseInt(Math.floor(Constant.game.config.height / 3.7) * Constant.currentRatio);//.toFixed(2);
                //################
                // firstTweenDuration = parseInt(Math.floor(Constant.game.config.height / 2.28) * Constant.currentRatio);//-------------previous

                firstTweenDuration = (Math.floor(Math.floor(Constant.game.config.height / 4.8) * Constant.currentRatio)).toFixed(2);
                //################
                // console.log('firstTweenDuration : ', firstTweenDuration)
                // backInWidth = (Constant.game.config.width / 20);//-------------------->>>>

                backInWidth = (Constant.game.config.width / 20);
            }
            else {
                firstTweenDuration = (Constant.game.config.width * 0.5) * Constant.currentRatio;
                backInWidth = (Constant.game.config.width / 32);
            }
        }
        else {
            // firstTweenDuration = firstTweenDuration = (Constant.game.config.width * 0.05) * Constant.currentRatio;
            firstTweenDuration = (Constant.game.config.width * 0.2) * Constant.currentRatio;
            backInWidth = (Constant.game.config.width / 32);
        }
        // console.log(this.obj.length)
        for (let i = 0; i < this.obj.length; i++) {
            // console.log("+++++++++++++++++", this.obj)
            this.obj[i].temp = 0;
            this.obj[i].initialTween = null;
            // console.log('ttttthis.obj[', i, '].initialtween.y', this.obj[i], this.obj[i].usualImg.y - backInWidth);
            this.obj[i].initialTween = this.scene.tweens.add({
                targets: this.obj[i].usualImg,
                y: (this.obj[i].usualImg.y - backInWidth),//(this.obj[i].usualImg.y - (Constant.game.config.width / 32)),
                ease: 'Back.In',
                duration: firstTweenDuration,
                onUpdate: function () {
                    // console.log('update', _obj[i].usualImg.y, (_obj[i].usualImg.y - backInWidth), backInWidth);
                },
                callbackScope: this,
                onComplete: function () {
                    // console.log('FIrstANim this.obj[', i, '].usualImg', this.obj[i].usualImg.y);
                    // get random reel from here
                    // this.obj[i].setBlur();                    // newly added to overcome the issue of animation playing outside of the frame
                    this.SecondAnimation(i);
                }
            });
            this.obj[i].initialTween.pause();
        }
    };
    SecondAnimation(i) {
        // console.log("SecondAnimation", i);
        // console.log('fps : ', Constant.game.loop.actualFps)
        let time, time1;
        if (Constant.isMobile) {
            if (Constant.isPortrait) {

                // console.log('stop time for mob portra')

                if (/Android/i.test(navigator.userAgent)) {
                    time = parseInt((Constant.game.config.height / 2.9) * Constant.currentRatio);
                    time1 = parseInt(Math.floor(Constant.game.config.height / 3) * Constant.currentRatio);

                    // time = parseInt((Constant.game.config.height / 2.5) * Constant.currentRatio);
                    // time1 = parseInt(Math.floor(Constant.game.config.height / 2.6) * Constant.currentRatio);


                    // console.log("===>time", time);
                    // console.log("===>time1", time1);
                }
                else {
                    time = (Math.floor((Constant.game.config.height / 3.04) * Constant.currentRatio)).toFixed(2);
                    time1 = (Math.floor((Constant.game.config.height / 3.15) * Constant.currentRatio)).toFixed(2);
                    // console.log("===>time", time);
                    // console.log("===>time1", time1);
                }
            }
            else {

                // console.log('stop time for mob land')
                time = Math.floor(Constant.game.config.width * 0.9) * Constant.currentRatio;//490;//690;
                time1 = Math.floor(Constant.game.config.width * 0.85) * Constant.currentRatio;//450;//650;

            }
        }
        else {

            // console.log('stop time for desktop')
            time = Math.floor(Constant.game.config.width * 0.17) * Constant.currentRatio;//490;
            time1 = Math.floor(Constant.game.config.width * 0.16) * Constant.currentRatio;;//450;
            // time = Math.floor(Constant.game.config.width * 0.3) * Constant.currentRatio;//490;
            // time1 = Math.floor(Constant.game.config.width * 0.3) * Constant.currentRatio;;//450 
        }

        // console.log('-------duration------->', Math.floor((time / (this.finalPosY - this.obj[0].initialTween.data[0].current)) * (this.finalPosY - this.obj[i].initialTween.data[0].current)).toFixed(2))

        this.obj[i].animationTween = null;
        this.obj[i].animationTween = this.scene.tweens.add({
            targets: this.obj[i].usualImg,
            y: parseInt(this.finalPosY),
            ease: 'Linear',// 'Quartic.InOut',
            duration: Math.floor((time / (this.finalPosY - this.obj[0].initialTween.data[0].current)) * (this.finalPosY - this.obj[i].initialTween.data[0].current)).toFixed(2),
            callbackScope: this,
            repeat: -1,

            onRepeat: function () {
                this.obj[i].animationTween.pause();//----------------------if 0
                //---------------------------------------------------------------
                // console.log('is fast play : ', this.scene.menuPopup.isFastPlay)
                if (this.scene.menuPopup.isFastPlay == false) {
                    if (this.scene.reelsView.randomIndex == 0) {
                        this.scene.MakeReelsSlow(this.scene.reelsView.randomIndex);

                    }
                    else { }
                }
                //---------------------------------------------------------------


                if (!this.stop) {

                    // this.obj[i].setBlur();
                    this.obj[i].animationTween.data[0].start = this.obj[0].initialY;
                    this.obj[i].animationTween.data[0].end = this.finalPosY;
                    // console.log('startendnotstop', this.obj[i].animationTween.data[0].start, this.obj[i].animationTween.data[0].end)
                    this.obj[i].animationTween.data[0].duration = parseInt(time1);
                    this.obj[i].animationTween.data[0].totalDuration = parseInt(time1);
                    // console.log('time>>>>>>>>>>>>>', this.obj[i].animationTween.data[0].duration, this.stop)
                    this.obj[i].animationTween.resume();
                }
                else {
                    // console.log("CheckCOunter", this.counter);
                    if (this.counter < 4) {
                        // // console.log('when only three stops', this.counter)
                        // let arr = [];
                        // let rndNumOfSymbols = this.symbols[Math.floor(Math.random() * ((this.symbols.length - 1) - 0) + 0)];
                        // this.obj[i].setSymbol(rndNumOfSymbols);
                        // this.obj[i].animationTween.data[0].start = this.obj[0].initialY;
                        // this.obj[i].animationTween.data[0].end = this.finalPos[(this.counter)];
                        // console.log('NewSymbolthis.obj[', i, ']', this.obj[i].id, this.obj[i].animationTween.data[0].end);
                        // this.newSymbol.push(rndNumOfSymbols);
                        // this.obj[this.counter].id = '';
                        // this.obj[this.counter].id = this.newSymbol[this.counter];
                        // this.obj[this.counter].animationTween.targets[0].setTexture("symbol_" + this.newSymbol[this.counter])
                        // // this.obj[this.counter].animationTween.targets[0].setMask(this.mask);
                        // console.log('NewSymbol', this.obj[i].id, this.obj[i].animationTween.data[0].end);

                        // // console.log('objid++++', this.obj[this.counter].animationTween)
                        //=====================================================================================================================

                        let arr = [];
                        let rndNumOfSymbols = this.symbols[Math.floor(Math.random() * ((this.symbols.length - 1) - 0) + 0)];
                        // this.obj[i].setSymbol(rndNumOfSymbols);
                        this.obj[i].animationTween.data[0].start = this.obj[0].initialY;
                        this.obj[i].animationTween.data[0].end = this.finalPos[(this.finalPos.length - 2 - this.counter)];
                        // console.log('NewSymbolthis.obj[', i, ']', this.obj[i].id, this.obj[i].animationTween.data[0].end);
                        this.newSymbol.push(rndNumOfSymbols);
                        this.obj[this.counter].id = '';
                        this.obj[this.counter].id = this.newSymbol[this.counter];
                        this.obj[this.counter].animationTween.targets[0].setTexture("symbol_" + this.newSymbol[this.counter])

                        // if (this.counter == 0) {
                        //     this.obj[this.counter].id = '';
                        //     this.obj[this.counter].id = this.newSymbol[3];
                        //     this.obj[this.counter].animationTween.targets[0].setTexture("symbol_" + this.newSymbol[0])
                        // }
                        // else if (this.counter == 1) {
                        //     this.obj[this.counter].id = '';
                        //     this.obj[this.counter].id = this.newSymbol[2];
                        //     this.obj[this.counter].animationTween.targets[0].setTexture("symbol_" + this.newSymbol[1])
                        // }
                        // else if (this.counter == 2) {
                        //     this.obj[this.counter].id = '';
                        //     this.obj[this.counter].id = this.newSymbol[1];
                        //     this.obj[this.counter].animationTween.targets[0].setTexture("symbol_" + this.newSymbol[2])
                        // }
                        // else if (this.counter == 3) {
                        //     this.obj[this.counter].id = '';
                        //     this.obj[this.counter].id = this.newSymbol[0];
                        //     this.obj[this.counter].animationTween.targets[0].setTexture("symbol_" + this.newSymbol[3])
                        // }
                        // this.obj[this.counter].animationTween.targets[0].setMask(this.mask);
                        // console.log('NewSymbol', this.obj[i].id, this.obj[i].animationTween.data[0].end);

                        // console.log('objid++++', this.obj[this.counter].animationTween)


                        if (Constant.isMobile) {
                            if (Constant.isPortrait) {
                                let t1;
                                if (/Android/i.test(navigator.userAgent)) {
                                    // t1 = parseInt((Constant.game.config.height / 3.74) * Constant.currentRatio);
                                    t1 = parseInt((Constant.game.config.height / 1.74) * Constant.currentRatio);
                                    // console.log('t1---------------->', t1)
                                }
                                else {
                                    // t1 = parseInt((Constant.game.config.height / 2.19) * Constant.currentRatio);
                                    // window.alert('ios')

                                    // t1 = (Math.floor(Constant.game.config.height / 3.9) * Constant.currentRatio).toFixed(2);
                                    t1 = parseInt((Constant.game.config.height / 3.9) * Constant.currentRatio);
                                }
                                this.obj[i].animationTween.data[0].duration = parseInt((t1 / (this.finalPos[(this.finalPos.length - 1)] - this.obj[0].initialY)) * (this.finalPos[(this.finalPos.length - 1 - this.counter)] - this.obj[0].initialY));
                                this.obj[i].animationTween.data[0].totalDuration = parseInt((t1 / (this.finalPos[(this.finalPos.length - 1)] - this.obj[0].initialY)) * (this.finalPos[(this.finalPos.length - 1 - this.counter)] - this.obj[0].initialY));

                                // console.log('t1---------------------------->', t1);
                                // console.log(' this.obj[i].animationTween.data[0].duration : ', this.obj[i].animationTween.data[0].duration);
                            }
                            else {
                                // let t2 = Math.floor(Constant.game.config.height / 5.05);//345;
                                // let t2 = Math.floor(Constant.game.config.height * 1.5) * Constant.currentRatio;//Iphone xr

                                let t2 = parseInt(Math.floor(Constant.game.config.width * 0.68) * Constant.currentRatio);

                                this.obj[i].animationTween.data[0].duration = parseInt((t2 / (this.finalPos[(this.finalPos.length - 1)] - this.obj[0].initialY)) * (this.finalPos[(this.finalPos.length - 1 - this.counter)] - this.obj[0].initialY));
                                this.obj[i].animationTween.data[0].totalDuration = parseInt((t2 / (this.finalPos[(this.finalPos.length - 1)] - this.obj[0].initialY)) * (this.finalPos[(this.finalPos.length - 1 - this.counter)] - this.obj[0].initialY));
                                // console.log('t1---------------------------->', t1);
                                // console.log(' this.obj[i].animationTween.data[0].duration : ', this.obj[i].animationTween.data[0].duration);
                            }
                        }
                        else {
                            let t3 = Math.floor(Constant.game.config.height / 4.5);
                            this.obj[i].animationTween.data[0].duration = parseInt((t3 / (this.finalPos[(this.finalPos.length - 1)] - this.obj[0].initialY)) * (this.finalPos[(this.finalPos.length - 1 - this.counter)] - this.obj[0].initialY));

                            this.obj[i].animationTween.data[0].totalDuration = parseInt((t3 / (this.finalPos[(this.finalPos.length - 1)] - this.obj[0].initialY)) * (this.finalPos[(this.finalPos.length - 1 - this.counter)] - this.obj[0].initialY));
                            // console.log('time', this.obj[i].animationTween.data[0].duration, this.obj[i].animationTween.data[0].totalDuration)
                        }
                        this.counter += 1;
                        this.obj[i].animationTween.resume();
                    }
                    else {
                        if (this.counter == 4) {
                            this.newSymbol.push(this.obj[4].id)
                            // this.obj[4].animationTween.data[0].start = this.obj[0].initialY;
                            // this.obj[4].animationTween.data[0].end = this.finalPos[(this.counter)];
                            // let rndNumOfSymbols = this.symbols[Math.floor(Math.random() * ((this.symbols.length - 1) - 0) + 0)];
                            this.obj[4].id = this.newSymbol[4];
                            this.obj[4].animationTween.targets[0].setTexture("symbol_" + this.newSymbol[4]);
                            // console.log('this.new', this.newSymbol[4])
                            this.obj[i].animationTween.data[0].start = this.obj[0].initialY;
                            this.obj[i].animationTween.data[0].end = this.finalPos[(this.counter)];
                            // let t3 = Math.floor(Constant.game.config.height / 4.35);
                            // this.obj[4].animationTween.data[0].duration = parseInt((t3 / (this.finalPos[(this.finalPos.length - 1)] - this.obj[0].initialY)) * (this.finalPos[(this.finalPos.length - 1 - this.counter)] - this.obj[0].initialY));
                            // this.obj[4].animationTween.data[0].totalDuration = parseInt((t3 / (this.finalPos[(this.finalPos.length - 1)] - this.obj[0].initialY)) * (this.finalPos[(this.finalPos.length - 1 - this.counter)] - this.obj[0].initialY));
                            // console.log('objidd', this.newSymbol)
                            this.counter += 1;
                        }

                        if (!this.stopSound) {
                            this.stopSound = true;
                            // console.log('this.stopSound', this.stopSound)
                        }
                        this.completeCounter += 1;
                        if (this.completeCounter == 5) {
                            this.EndAnimation();
                        }
                        // }
                    }
                }
            },


        });
    };
    EndAnimation() {
        // console.log("ENdANimaton")
        // console.log('obj : ', this.game.loop.actualFps);
        this.endCounter = 0;
        let tweenDuration = 0;
        let time;
        // let arr = [1, 2, 3, 4];
        let random = GetRandomNumber(1, 4)
        // console.log('Random', random)
        // let random = 4;
        if (random == this.scene.reelsView.randomIndex) {
            if (this.index == random + 1) {
                this.thorAnim.alpha = 1;
                this.PlayThorAnim();
            }
        }
        else {
            if (this.index == random + 1) {
                this.thorAnim.alpha = 1;
                this.PlayThorAnim();
            }
        }
        if (Constant.isMobile) {
            // if (Constant.isPortrait) {
            //     time = 640;
            // }
            // else {
            time = Math.floor(Constant.game.config.height / (1080 / 750));//2.725);//640;
            // }
        }
        else {
            // time = 500;
            time = 1500;

        }
        this.PlayStopSpinSound();

        //---------------------------------------------------------------------------
        if (this.scene.menuPopup.isFastPlay == false) {
            if (this.scene.reelsView.randomIndex > 0) {
                // this.scene.reelsView.slowReelSoundBool = true;
                this.scene.MakeReelsSlow(this.scene.reelsView.randomIndex);
                // console.log("this.slowReelSoundBool0 " + this.slowReelSoundBool)
                // SoundManager.SlowReelAnimSound();
                // this.SlowReelsSound() 
            }
            else { }
        }
        //---------------------------------------------------------------------------

        for (let i = 0; i < this.obj.length; i++) {
            this.obj[i].usualImg.y += (Constant.game.config.height / 9.81);
            // console.log('lllll', this.obj[i].usualImg.texture.key, this.obj[i].usualImg.y)
            this.obj[i].temp = 0;
            this.scene.tweens.add({
                targets: this.obj[i].usualImg,
                y: (this.obj[i].usualImg.y - (Constant.game.config.height / 9.81)),
                ease: 'Back.Out',
                duration: time,
                callbackScope: this,
                onComplete: function () {
                    // console.log('Endanimation', this.obj[i])
                    // for (let i = 0; i < this.obj.length; i++) {
                    //     this.obj[i].id = '';
                    //     this.obj[i].id = this.newSymbol[i];
                    // }
                    this.endCounter += 1;
                    if (this.endCounter == 4) {
                        // console.log("Enable spin button", this.endCounter);
                        this.endCounter = 0;
                        this.repeatsStep = 0;
                        if (this.index === 4) {


                            Constant.game.events.emit("evtOnAnimationPlay");
                            if (!this.scene.gameLogo.isDemoAnimationForFreeSpin) {
                                Constant.game.events.emit("evtOnAllReelsComplete");
                            } else {
                                this.scene.gameLogo.isDemoAnimationForFreeSpin = false;
                                Constant.game.events.emit("evtParchmentPopupShow", "Tap To Continue");
                            }
                            // this.newSymbol = [];
                            // console.log(this.newSymbol, '-------')
                            this.playThunder = true;
                        }
                        // this.PlayCharacterAnimation();
                        this.stopSound = false;
                        // this.scene.tweens.add({
                        //     targets: this.thorAnim,
                        //     alpha: 0,
                        //     ease: 'Back.In',
                        //     duration: 1500,
                        //     callbackScope: this,
                        // });
                        // this.PlayThorAnim();

                        // if (Math.random() > 0.3) {
                        //   

                        //----------------------------------------
                        // setTimeout(() => {

                        // }, 500);

                        // this.PlayCharacterAnimation();
                        // this.playScatterAnimation();

                        //-----------------------------------------



                        // }
                        // else {
                        this.PlayWinAnimation();
                        // this.scene.MakeReelsSlow(this.scene.reelsView.randomIndex);
                        if (this.index === this.scene.reelsView.randomIndex) {
                            // console.log('this.index : ', this.index)
                            // if (this.scene.reelsView.randomIndex > 0 && this.scene.reelsView.randomIndex != 4) {
                            // setTimeout(() => {
                            this.scene.StopSlowReels();
                            this.StopSlowReelAnim();
                            // }, 1000);
                            // }
                        }
                        //---------------------------------------------------------------------------------------------------

                    }
                }
            });

        }
    };
    RunAnimation() {
        // console.clear();


        //--------------------------------
        this.rndNumOfSymbols = [];
        for (let i = 0; i < 3; i++) {
            this.rndNumOfSymbols.push(this.symbols[Math.floor(Math.random() * ((this.symbols.length - 1) - 0) + 0)]);
        }
        //--------------------------------
        this.testCounter++;
        this.stop = false;
        this.counter = 0;
        this.completeCounter = 0;
        this.newSymbol = [];
        for (let i = 0; i < this.obj.length; i++) {
            // if (this.obj[i].animationTween) {
            // console.log("this.obj[i].animationTween/////////////////////");
            // this.obj[i].animationTween.data[0].start = this.obj[i].y;
            // this.obj[i].animationTween.data[0].current = this.obj[i].y;
            // this.obj[i].animationTween.data[0].end = this.finalPosY;
            // this.obj[i].animationTween.data[0].elapsed = 0;
            // this.obj[i].animationTween.data[0].progress = 0;
            // this.obj[i].animationTween.data[0].duration = ((this.speed1 / (this.finalPosY - this.obj[0].usualImg.y)) * (this.finalPosY - this.obj[i].usualImg.y));
            // this.obj[i].animationTween.data[0].totalDuration = ((this.speed1 / (this.finalPosY - this.obj[0].usualImg.y)) * (this.finalPosY - this.obj[i].usualImg.y));
            // }
            // console.log('this.obj[i].initialTween : ', this.obj.length)
            // if (this.testCounter == 1) {
            // this.obj[i].id = '';
            // this.obj[i].id = this.newSymbol[i];
            this.obj[i].initialTween.play();
            // } else {
            //     console.log('Runanim', this.obj[i].initialTween.targets[0].y)
            //     this.obj[i].usualImg.y = this.obj[i].initialTween.targets[0].y
            //     this.CreateAnimation(this.obj);
            //     setTimeout(() => {
            //         this.obj[i].initialTween.play();
            //     }, 50);
            // }

        }
    };

    PlaySpineAnimation() {
        if (this.index < 5) {
            if (Constant.isMobile) {
                if (Constant.isPortrait) {
                    // this.mystry = this.scene.add.image(this.x, this.y + Constant.game.config.height / 5.3, "misterey_symbol").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 0.98, Constant.scaleFactorY * 1.05);//* 0.93);


                    this.slowReelAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 5.71, 'slowreel_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                    this.slowReelAnim.play("Slowreel_Animation");


                    this.thorAnim = this.scene.add.spine(this.x - Constant.game.config.width / 7.5, this.y - Constant.game.config.height / 9.3, 'thor_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                    this.thorAnim.play("Thor_Animation");


                }
                else {
                    // this.mystry = this.scene.add.image(this.x, this.y + Constant.game.config.height / 3, "misterey_symbol").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 0.98, Constant.scaleFactorY * 1.05);//* 0.93);

                    this.slowReelAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 3.21, 'slowreel_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                    this.slowReelAnim.play("Slowreel_Animation");

                    this.thorAnim = this.scene.add.spine(this.x - Constant.game.config.width / 13.7, this.y - Constant.game.config.height / 5.3, 'thor_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                    this.thorAnim.play("Thor_Animation");
                }
            }
            else {
                // this.mystry = this.scene.add.image(this.x, this.y + Constant.game.config.height / 3.01, "misterey_symbol").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 0.98, Constant.scaleFactorY * 1.02);//* 0.93);
                this.slowReelAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 3.21, 'slowreel_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                this.slowReelAnim.play("Slowreel_Animation");

                this.thorAnim = this.scene.add.spine(this.x - Constant.game.config.width / 13.7, this.y - Constant.game.config.height / 5.3, 'thor_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                this.thorAnim.play("Thor_Animation");

                // console.log('this.x : ', this.x);
                // console.log("Thor ANimation and Slowreel NAimatin")
                // console.log('this.y : ', this.y + Constant.game.config.height / 3.01)
            }
            this.thorAnim.depth = 1;
            this.thorAnim.alpha = 0;
            this.thorAnim.setVisible(false);

            this.slowReelAnim.depth = 1;
            this.slowReelAnim.setVisible(false);
        }
    }
    StopAnimation() {
        this.stop = true;

    };
    WinAnimation() {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];

        }
    };
    PlayStopSpinSound() {
        SoundManager.SpinStopSound();
    };
    PlayThorSymbolSound() {
        // SoundManager.PlayMatch7Sound();
        // SoundManager.PlayMisterySound();
        SoundManager.PlayThorSound();
    };
    // PlayMisterySymbolSound() {
    //     SoundManager.PlayMisterySound()
    // }
    PlayNormalMatchSound() {
        SoundManager.PlayNormalMatchSound();
    };
    SlowMotionReelSound() {
        SoundManager.PlayRolingAfterMatchSoud();
    };
    PlaySlowReelAnim() {
        // console.log("SlowReelAnim")
        // this.slowReelAnim.y = this.y + Constant.game.config.height / 3.25;
        this.slowReelAnim.setVisible(true);
        this.slowReelAnim.play("Slowreel_Animation", true);
    }
    StopSlowReelAnim() {
        this.slowReelAnim.play("Slowreel_Animation", false);
        this.slowReelAnim.setVisible(false);
    }
    PlayThorAnim() {
        // console.log("PlayThorAnimSound")
        this.thorAnim.setVisible(true);
        this.thorAnim.play('Thor_Animation', true);
        this.PlayThorSymbolSound();
        setTimeout(() => {
            this.thorAnim.play('Thor_Animation', false);
            this.thorAnim.setVisible(false);
        }, 1500);
    }
    PlayWinAnimation() {
        // let newThunderArray = [];
        //    for(let i = 0 ; i < 5 ; i++){
        // let check = Math.random().toFixed(2);
        // console.log('Play Win Animation')
        // let check = (Math.random() * (0.7-0.3) + 0.3).toFixed(2);
        // console.log('check : ', check)
        // if (check > 0.3 && check <= 0.7) {
        //     if (check > 0.3 && check <= 0.4) {

        //         this.obj[0].playWin();
        //         // this.playThunder();
        //         console.log('Thunder1')
        //     }

        //     else if (check > 0.4 && check <= 0.5) {
        //         this.obj[1].playWin();
        //         console.log('Thunder2')
        //         // this.playThunder();
        //     }
        //     else if (check > 0.5 && check <= 0.6) {
        //         this.obj[2].playWin();
        //         console.log('Thunder3')
        //         // this.playThunder();
        //     }
        //     else if (check > 0.6 && check <= 0.7) {
        //         this.obj[3].playWin();
        //         console.log('Thunder4')
        //         // this.playThunder();
        //     }

        //     this.PlayNormalMatchSound();
        // }
        // else if(check < 0.3) {
        //     // this.obj[1].playWin();
        //     console.log('Thunderless')
        //     // this.PlayNormalMatchSound();
        //     // this.playThunder();
        // }
        // else if (check > 0.7) {
        //     this.mystry.setVisible(true);
        //     console.log("Mystery")
        // }
        // else {

        // }

        //    }
        // for(let i = 0 ; i < 5 ;i++){
        this.thunderObjectArr = [];

        let check = Math.random();

        // console.log('check : ', check)

        if (check > 0.5) {
            if (Math.random() > 0.5) {
                this.obj[0].playWin();

                this.thunderObjectArr.push(this.obj[0]);
                // console.log("thunder0")
            }
            else {
                this.obj[1].playWin();
                this.thunderObjectArr.push(this.obj[4])
                // console.log("thunder1")
            }
            if (Math.random() > 0.5) {
                this.obj[2].playWin();
                this.thunderObjectArr.push(this.obj[1])
                // console.log("thunder2")
            }
            else {
                this.obj[3].playWin();
                this.thunderObjectArr.push(this.obj[2])
                // console.log("thunder3")
            }
            this.PlayNormalMatchSound();
        }
        else if (check > 0.7) {
            // this.PlayThorAnim();
        }
        else {

        }

        // }





        //----------------------------------------------------

        // let check = Math.random();
        // console.log('enter when random vaue is greter', check);
        // if (check > 0.7) {
        //     this.mystry.setVisible(true);
        //     // this.PlayMistreySymbolSound();
        //     // this.PlayMisterySymbolSound();
        // }
        // else {

        // }
        //    console.log("ThunderArr" , this.thunderObjectArr)
        Constant.game.events.emit("evtOnReelComplete", this.thunderObjectArr);
        // console.log('GenerateNUmber', this.thunderObjectArr)
        if (this.playThunder) {
            Constant.game.events.emit("evtthunderanimplay");
            this.playThunder = false;
        }
        // if(this.thunderObjectArr == '' && this.index == 4){
        //     Constant.game.events.emit("evtPaylinesShowingDone");
        // }
    };

    PlayCharacterAnimation() {
        for (let i = 0; i < this.obj.length; i++) {
            if (this.obj[i].id === "character_1" && this.obj[i].usualImg.texture.key !== "Blured_scatter") {
                // console.log('enter when match', this.obj[i].id.y);
                this.obj[i].PlayCharacterAnim();
                SoundManager.PlaySingleCharacter1Sound();
            }
        }
    }

    playScatterAnimation() {
        // console.log('this.obj : ', this.obj)
        for (let i = 0; i < this.obj.length; i++) {
            if ((this.obj[i].id == "scatter") && (this.obj[i].usualImg.texture.key !== "Blured_scatter")) {
                // console.log('this.obj[i].usualImg', this.obj[i].id);
                // console.log('this.obj[i].usualImg', this.obj[i].usualImg.texture.key);
                // console.log('enter when match', this.obj[i].id.y);
                this.obj[i].PlayScatterSpineAnim();
                SoundManager.PlayScatterSound();
            }
        }

        // console.log('obj----------------------->', this.obj);
        // for (let i = 0; i < this.obj.length; i++) {
        //     if (this.obj[i].usualImg.texture.name == "symbol_scatter") {
        //         console.log('this.obj[i].usualImg', this.obj[i]);
        //         this.obj[i].PlayScatterSpineAnim();
        //     }
        // }
    }
    StopWinAnimation() {
        this.obj.forEach(element => {
            element.stopWin();
        });
    };
    // StopCharacterAnim() {

    // }
    // StopScatterAnim() {

    // }
    //----------------------------------------
    // create(initialSymbols) {
    //     this.background = this.scene.add.image(this.x, this.y, "reel_bg").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
    //     this.background.setVisible(false);
    //     //--------------------------------------------
    //     for (let i = 0; i < initialSymbols.length; i++) {
    //         let symbol = new Symbol(this.scene, this.background.x, this.background.y, initialSymbols[i]);

    //         symbol.usualImg.y = this.background.y + (i * symbol.getHeight() / 1.07);
    //         symbol.usualImg.centerY = this.background.y + (i * symbol.getHeight() / 1.07);

    //         symbol.spinAnim.y = this.background.y + (i * symbol.getHeight() + (7 * Constant.scaleFactorY));
    //         symbol.spinAnim.centerY = this.background.y + (i * symbol.getHeight() / 1.07);


    //         this.symbols.push(symbol);
    //     }
    //     this.verticalDifference = this.symbols[0].getHeight() / 1.07;

    // };

    // getSymbolPosition(index) {
    //     return this.symbols[index].getPosition();
    // };

    // getSymbolByIndex(_index) {
    //     return this.symbols[_index];
    // };

    // spin() {
    //     this.scene.time.addEvent({
    //         delay: 900,
    //         callback: () => {
    //             this.symbols.forEach((elem) => {
    //                 elem.playSpin(GetRandomNumber(0, 10));
    //                 // elem.playSpin(GetRandomNumber(0, 11));
    //             });
    //             // this.AnimateToBelowReelView();
    //         },
    //         callbackScope: this
    //     });
    // };

    // stop() {
    //     // if (this.normalStopTimeEvt != null) {
    //     //     this.normalStopTimeEvt.remove();
    //     // }
    //     this.normalStopTimeEvt = this.scene.time.addEvent({
    //         delay: this.spinDelay,
    //         callback: () => {
    //             this.symbols.forEach((elem, index) => {
    //                 elem.stopSpin();
    //             });
    //         },
    //         callbackScope: this
    //     });
    //     this.PlayStopSpinSoundOneByOne();
    //     // this.ResetReelToTop();
    // };

    // stopImmediate() {
    //     this.StopAllSound();
    //     if (this.normalStopTimeEvt != null) {
    //         this.normalStopTimeEvt.remove();
    //     }
    //     this.symbols.forEach((elem, index) => {
    //         elem.stopSpin();
    //     });
    // };

    // getPosition() {
    //     return new Phaser.Geom.Point(this.x, this.y);
    // };

    // setSymbols(newSymbols) {
    //     // console.log("safdsa", newSymbols);
    //     this.symbols.forEach((elem, index) => {
    //         // elem.setSymbol(newSymbols[index]);
    //         elem.setSymbol(newSymbols);
    //     });
    // };


    // PlayStopSpinSoundOneByOne() {
    //     this.s1 = setTimeout(() => {
    //         SoundManager.SpinStopSound();
    //     }, 200);

    //     this.s2 = setTimeout(() => {
    //         SoundManager.SpinStopSound();
    //     }, 400);

    //     this.s3 = setTimeout(() => {
    //         SoundManager.SpinStopSound();
    //     }, 700);

    //     this.s4 = setTimeout(() => {
    //         SoundManager.SpinStopSound();
    //     }, 1000);

    //     this.s5 = setTimeout(() => {
    //         SoundManager.SpinStopSound();
    //     }, 1300);
    // };

    // StopAllSound() {
    //     if (this.s1) {
    //         clearTimeout(this.s1);
    //         this.s1 = 0;
    //     }
    //     if (this.s2) {
    //         clearTimeout(this.s2);
    //         this.s2 = 0;
    //     }
    //     if (this.s3) {
    //         clearTimeout(this.s3);
    //         this.s3 = 0;
    //     }
    //     if (this.s4) {
    //         clearTimeout(this.s4);
    //         this.s4 = 0;
    //     }
    //     if (this.s5) {
    //         clearTimeout(this.s5);
    //         this.s5 = 0;
    //     }

    // };
    // //
    // ResetReelToTop() {
    //     for (let i = 0; i < this.symbols.length; i++) {
    //         this.symbols[i].usualImg.y = -this.symbols[i].getHeight() / 1.07 - (i * this.symbols[i].getHeight() / 1.07);
    //     }
    //     // setTimeout(() => {
    //     //     this.AnimateTopToMiddleReel();
    //     // }, 1000);
    // };
    // AnimateTopToMiddleReel() {
    //     let finalPos = (this.background.y + ((this.symbols.length - 1) * this.symbols[(this.symbols.length - 1)].getHeight() / 1.07));
    //     // let finalPos = this.symbols[0].usualImg.centerY;
    //     let longestDist = (finalPos - this.symbols[(this.symbols.length - 1)].usualImg.y);
    //     let currDist = 0, currPos = 0;
    //     for (let i = 0; i < this.symbols.length; i++) {
    //         currDist = (finalPos - this.symbols[i].usualImg.y);
    //         this.scene.tweens.add({
    //             targets: this.symbols[i].usualImg,
    //             y: this.symbols[i].usualImg.centerY,
    //             ease: 'Linear',
    //             duration: ((this.totalTime / longestDist) * currDist),
    //             callbackScope: this
    //         });
    //     }
    // };
    // AnimateToBelowReelView() {
    //     let finalPos = this.reelBottomPos;//this.symbols[0].getHeight() + ((this.symbols.length) * this.symbols[0].getHeight());
    //     let dist = finalPos - this.symbols[0].usualImg.y;
    //     for (let i = 0; i < this.symbols.length; i++) {
    //         this.scene.tweens.add({
    //             targets: this.symbols[i].usualImg,
    //             y: finalPos,
    //             ease: 'Linear',
    //             duration: ((1000 / dist) * (finalPos - this.symbols[i].usualImg.y)),
    //             callbackScope: this
    //         });
    //         this.scene.tweens.add({
    //             targets: this.symbols[i].spinAnim,
    //             y: finalPos,
    //             ease: 'Linear',
    //             duration: ((1000 / dist) * (finalPos - this.symbols[i].usualImg.y)),
    //             onComplete: () => {
    //                 this.symbols[i].spinAnim.setVisible(false);
    //             },
    //             callbackScope: this
    //         });
    //         // this.symbols[i].usualImg.y = this.symbols[i].getHeight() + ((this.symbols.length) * this.symbols[i].getHeight());
    //     }
    //     // this.scene.tweens.add({
    //     //     targets: this.demo,
    //     //     y: finalPos + this.demo.height / 3,
    //     //     ease: 'Linear',
    //     //     duration: (1000),
    //     //     onComplete: () => {
    //     //     },
    //     //     callbackScope: this
    //     // });
    // };
    // ResetReelToBottom() {
    //     for (let i = 0; i < this.symbols.length; i++) {
    //         this.symbols[i].usualImg.y = this.symbols[i].getHeight() + ((this.symbols.length) * this.symbols[(this.symbols.length - 1)].getHeight());
    //     }
    //     // setTimeout(() => {
    //     //     this.AnimateToMiddleReel();
    //     // }, 1000);
    // };

};

export default Reel;