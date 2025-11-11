import { ShuffleArr } from "../Utils.js";
import { Constant } from "../Constant";
import { SoundManager } from "../SoundManager.js";

class ReelAnimation {
    constructor(scene, x, y, initialSymbols, spinDelay) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.background = null;
        this.finalPosY = null;
        this.stop = false;
        this.counter = 0;
        this.finalPos = [];
        this.completeCounter = 0;

        this.repeatsStep = 0;
        this.stopSound = false;
        this.symbols = ShuffleArr([
            "symbol_9",
            "symbol_10",
            "symbol_a",
            "symbol_character_4",
            "symbol_character_1",
            "symbol_character_2",
            "symbol_character_3",
            "symbol_j",
            "symbol_k",
            "symbol_q",
            "symbol_scatter",
            "symbol_misterey"
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
            "Blured_misterey"
        ]);
        this.scale = 1;
        this.spinDelay = spinDelay;
        this.obj = [];
        this.animationTweenArr = [];

        let graphics = this.scene.add.graphics();
        // graphics.fillStyle(0xffffff);
        graphics.beginPath();
        //  32px radius on the corners
        graphics.fillRect(
            (this.scene.background.reelFrame.x - this.scene.background.reelFrame.displayWidth / 2.39),
            (this.scene.background.reelFrame.y - this.scene.background.reelFrame.displayHeight / 2.51),
            this.scene.background.reelFrame.displayWidth / 1.2,
            this.scene.background.reelFrame.displayHeight / 1.275
        );
        this.mask = graphics.createGeometryMask();

        this.CreateReelAnimation(initialSymbols);

    }
    CreateReelAnimation(initialSymbols) {
        this.background = this.scene.add.image(this.x, this.y, "reel_bg").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.background.setVisible(false);

        let usualImg1 = this.scene.add.image(this.x, this.y, this.symbols[Math.floor(Math.random() * (3 - 0) + 0)]).setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        usualImg1.y = -this.y / 12;
        usualImg1.initialY = -this.y / 12;
        usualImg1.setMask(this.mask);
        this.obj.push(usualImg1);

        for (let i = 0; i < 3; i++) {
            let usualImg = this.scene.add.image(this.x, this.y, this.symbols[Math.floor(Math.random() * (3 - 0) + 0)]).setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            usualImg.y = this.background.y + (i * usualImg.displayHeight / 1) + (usualImg.displayHeight / 2);
            usualImg.initialY = -this.y / 12;
            usualImg.setMask(this.mask);
            this.obj.push(usualImg);
            this.finalPos.push(this.background.y + (i * usualImg.displayHeight / 1) + (usualImg.displayHeight / 2));
        }
        this.finalPosY = this.background.y + (3 * usualImg1.displayHeight / 1) + (usualImg1.displayHeight / 2);
        // console.log("this.finalPosY -> ", this.finalPos);
        this.CreateAnimation();
    };
    CreateAnimation() {
        for (let i = 0; i < this.obj.length; i++) {

            this.obj[i].initialTween = this.scene.tweens.add({
                targets: this.obj[i],
                y: (this.obj[i].y - 40),
                ease: 'Back.In',
                duration: 200,
                callbackScope: this,
                onComplete: function () {
                    let val = this.obj[i].texture.key, name;
                    val = val.split("_");

                    name = val[1];
                    if (val.length > 2) {
                        for (let k = 2; k < val.length; k++) {
                            name = name + "_" + val[k];
                        }
                    }
                    this.obj[i].animationTween = this.scene.tweens.add({
                        targets: this.obj[i],
                        y: this.finalPosY,
                        ease: 'Quartic.InOut',
                        duration: ((550 / (this.finalPosY - this.obj[0].y)) * (this.finalPosY - this.obj[i].y)),
                        callbackScope: this,
                        repeat: -1,
                        onRepeat: function () {

                            this.obj[i].animationTween.pause();
                            if (!this.stop) {
                                // console.log("....");
                                if (this.repeatsStep == 0) {
                                    this.repeatsStep = 1;
                                }
                                this.obj[i].setTexture("Blured_" + name);
                                // this.obj[i].animationTween.targets[0].setTexture(this.bluredSymbols[Math.floor(Math.random() * ((this.bluredSymbols.length - 1) - 0) + 0)]);
                                this.obj[i].animationTween.data[0].start = this.obj[i].animationTween.targets[0].initialY;
                                this.obj[i].animationTween.data[0].current = this.obj[i].animationTween.targets[0].initialY;
                                this.obj[i].animationTween.data[0].end = this.finalPosY;
                                this.obj[i].animationTween.data[0].duration = 550;
                                this.obj[i].animationTween.data[0].totalDuration = 550;
                                this.obj[i].animationTween.resume();
                            }
                            else {
                                if (this.counter < 3) {
                                    // console.log("----", this.obj[i]);
                                    this.obj[i].setTexture(this.symbols[Math.floor(Math.random() * ((this.symbols.length - 1) - 0) + 0)]);
                                    this.obj[i].animationTween.targets[0].setTexture(this.symbols[Math.floor(Math.random() * ((this.symbols.length - 1) - 0) + 0)]);
                                    this.obj[i].animationTween.data[0].elapsed = 0;


                                    this.obj[i].animationTween.data[0].start = this.obj[0].animationTween.targets[0].initialY;
                                    this.obj[i].animationTween.data[0].end = this.finalPos[(this.finalPos.length - 1 - this.counter)];//this.finalPosY;
                                    this.obj[i].animationTween.data[0].duration = parseInt((410 / (this.finalPos[(this.finalPos.length - 1)] - this.obj[0].animationTween.targets[0].initialY)) * (this.finalPos[(this.finalPos.length - 1 - this.counter)] - this.obj[0].animationTween.targets[0].initialY));
                                    this.obj[i].animationTween.data[0].totalDuration = parseInt((410 / (this.finalPos[(this.finalPos.length - 1)] - this.obj[0].animationTween.targets[0].initialY)) * (this.finalPos[(this.finalPos.length - 1 - this.counter)] - this.obj[0].animationTween.targets[0].initialY));
                                    this.counter += 1;
                                    this.obj[i].animationTween.resume();

                                }
                                else {
                                    if (!this.stopSound) {
                                        this.stopSound = true;
                                        // console.log("kkk");
                                        this.PlayStopSpinSoundOneByOne();
                                    }
                                    if (i == 0) {
                                        // this.obj[i].y = this.obj[0].animationTween.targets[0].initialY;
                                    }
                                    this.completeCounter += 1;
                                    if (this.completeCounter == 4) {
                                        this.EndAnimation();
                                    }

                                }
                            }
                        }
                    }).pause();
                    this.obj[i].animationTween.resume();
                }
            });
            this.obj[i].initialTween.pause();
        }
    };
    EndAnimation() {
        let endCounter = 0;
        for (let i = 0; i < this.obj.length; i++) {
            this.obj[i].y += 110;
            // this.scene.tweens.add({
            //     targets: this.obj[i],
            //     y: (this.obj[i].y + 100),
            //     ease: 'Liner',
            //     duration: 300,
            //     callbackScope: this,
            //     onComplete: function () {
            this.scene.tweens.add({
                targets: this.obj[i],
                y: (this.obj[i].y - 110),
                ease: 'Back.Out',
                duration: 240,
                callbackScope: this,
                onComplete: function () {
                    endCounter += 1;
                    if (endCounter == 4) {
                        endCounter = 0;
                        // console.clear();
                        // console.log("Enable spin button");
                        // setTimeout(() => {
                        this.repeatsStep = 0;
                        this.stopSound = false;
                        // }, 500);
                    }
                }
            });
            //     }
            // });

        }
    };
    RunAnimation() {
        console.clear();
        this.stop = false;
        this.counter = 0;
        this.completeCounter = 0;
        for (let i = 0; i < this.obj.length; i++) {
            if (this.obj[i].animationTween) {
                // console.log("this.obj[i].animationTween/////////////////////");
                this.obj[i].animationTween.data[0].start = this.obj[i].y;
                this.obj[i].animationTween.data[0].current = this.obj[i].y;
                this.obj[i].animationTween.data[0].end = this.finalPosY;
                this.obj[i].animationTween.data[0].duration = ((570 / (this.finalPosY - this.obj[0].y)) * (this.finalPosY - this.obj[i].y));
                this.obj[i].animationTween.data[0].totalDuration = ((570 / (this.finalPosY - this.obj[0].y)) * (this.finalPosY - this.obj[i].y));
            }
            this.obj[i].initialTween.play();
        }
    };
    StopAnimation() {
        this.stop = true;
    };
    PlayStopSpinSoundOneByOne() {
        SoundManager.SpinStopSound();
    };
    // CreateAnimation() {
    //     for (let i = 0; i < this.obj.length; i++) {

    //         this.obj[i].initialTween = this.scene.tweens.add({
    //             targets: this.obj[i],
    //             y: (this.obj[i].y - 50),
    //             ease: 'Quad ',
    //             duration: 100,
    //             callbackScope: this,
    //             onComplete: function () {
    //                 let val = this.obj[i].texture.key, name;
    //                 // console.log("val - ", val);
    //                 val = val.split("_");

    //                 name = val[1];
    //                 if (val.length > 2) {
    //                     for (let k = 2; k < val.length; k++) {
    //                         name = name + "_" + val[k];
    //                     }
    //                 }
    //                 console.log("val - ", val);
    //                 console.log("val - ", name);
    //                 this.obj[i].setTexture("Blured_" + name);//this.bluredSymbols[Math.floor(Math.random() * ((this.bluredSymbols.length - 1) - 0) + 0)]);

    //                 this.obj[i].animationTween = this.scene.tweens.add({
    //                     targets: this.obj[i],
    //                     y: this.finalPosY,
    //                     ease: 'Quad ',
    //                     duration: ((900 / (this.finalPosY - this.obj[0].y)) * (this.finalPosY - this.obj[i].y)),
    //                     callbackScope: this,
    //                     repeat: -1,
    //                     onRepeat: function () {
    //                         this.obj[i].animationTween.pause();
    //                         if (!this.stop) {
    //                             console.log("....");
    //                             this.obj[i].animationTween.targets[0].setTexture(this.bluredSymbols[Math.floor(Math.random() * ((this.bluredSymbols.length - 1) - 0) + 0)]);
    //                             this.obj[i].animationTween.data[0].start = this.obj[i].animationTween.targets[0].initialY;
    //                             this.obj[i].animationTween.data[0].current = this.obj[i].animationTween.targets[0].initialY;
    //                             this.obj[i].animationTween.data[0].end = this.finalPosY;
    //                             this.obj[i].animationTween.data[0].duration = 850;
    //                             this.obj[i].animationTween.data[0].totalDuration = 850;
    //                             this.obj[i].animationTween.resume();
    //                         }
    //                         else {
    //                             if (this.counter < 3) {
    //                                 // console.log("----", this.obj[i]);
    //                                 this.obj[i].setTexture(this.symbols[Math.floor(Math.random() * ((this.symbols.length - 1) - 0) + 0)]);
    //                                 this.obj[i].animationTween.targets[0].setTexture(this.symbols[Math.floor(Math.random() * ((this.symbols.length - 1) - 0) + 0)]);
    //                                 this.obj[i].animationTween.data[0].elapsed = 0;


    //                                 this.obj[i].animationTween.data[0].start = this.obj[0].animationTween.targets[0].initialY;
    //                                 this.obj[i].animationTween.data[0].end = this.finalPos[(this.finalPos.length - 1 - this.counter)];//this.finalPosY;
    //                                 this.obj[i].animationTween.data[0].duration = parseInt((630 / (this.finalPos[(this.finalPos.length - 1)] - this.obj[0].animationTween.targets[0].initialY)) * (this.finalPos[(this.finalPos.length - 1 - this.counter)] - this.obj[0].animationTween.targets[0].initialY));
    //                                 this.obj[i].animationTween.data[0].totalDuration = parseInt((630 / (this.finalPos[(this.finalPos.length - 1)] - this.obj[0].animationTween.targets[0].initialY)) * (this.finalPos[(this.finalPos.length - 1 - this.counter)] - this.obj[0].animationTween.targets[0].initialY));
    //                                 this.counter += 1;
    //                                 this.obj[i].animationTween.resume();

    //                             }
    //                             else {
    //                                 if (i == 0) {
    //                                     this.obj[i].y = this.obj[0].animationTween.targets[0].initialY;
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }).pause();
    //                 this.obj[i].animationTween.resume();
    //             }
    //         });
    //         this.obj[i].initialTween.pause();
    //     }
    // };


    DisableAnimationObj() {
        this.obj.forEach(element => {
            element.visible = false;
        });
    };
    EnableAnimationObj() {
        this.obj.forEach(element => {
            element.visible = true;
        });
    };

}
export default ReelAnimation;


