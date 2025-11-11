import Reel from "./Reel.js";
import { GetRandomSymbols } from "../Utils.js";
import { GetRandomNumber } from "../Utils.js";
// import { Model } from "../Model.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from '../Constant.js';
import SymbolDescription from '../popups/SymbolDescription.js'
import { Sound, Utils } from "phaser";
import { Model } from "../Model.js";
// import ReelAnimation from './ReelAnimation.js';
class ReelsView {
    constructor(scene) {
        // console.log("ReelsView1");
        this.scene = scene;
        this.reels = [];
        this.leftX = 0;
        this.symbolDescription = null;
        this.reelsCount = 5;
        this.spinDelays = [200, 400, 700, 1000, 1300];
        this.totalWidth = 0;
        this.normalStopTimeEvt = null;
        this.immediateStopTimeEvt = null;
        //
        // this.isWinAnimComplete = false;
        this.reelAnimationObj = [];
        this.bool = false;
        this.mask = null;
        this.create();
        Constant.game.events.on("evtSpinStart", this.onSpinStart, this);
        Constant.game.events.on("evtSpinStop", this.onSpinStop, this);
        Constant.game.events.on("evtStartFreeSpin", this.OnFreeSpinStart, this);
        Constant.game.events.on("evtOnAnimationPlay", this.PlayAllAnim, this);
        Constant.game.events.on("evtOnReelComplete", this.PlayThunderAnims, this);
        Constant.game.events.on("evtOnAllReelsComplete", this.PlayMultiplierAnim, this);
        Constant.game.events.on('evtthunderanimplay', this.ThunderAnimPlay, this);

        this.winEpoclypseCounter = 0;
        this.finalTarget = 11.45;
        this.dot = null;
        this.slowReelSoundBool = false;
        this.isAnimPlaying = false;

        this.randomIndex = null;
        this.reelCounter = null;
        this.newThunderAnimArray = [];
        this.counterThunder = 0;
        this.scoreTweenCounter = 0;
        // this.tempTarget = 0;
        this.tweenBool = false;
        this.counter = 0;
    };

    create() {
        this.symbolDescription = new SymbolDescription(this.scene);
        this.symbolDescription.CreateSymbolDescriptionPopUp();
        let reelBgfalse = this.scene.add.image(0, 0, "reel_bg").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        let xop = 0;
        reelBgfalse.setVisible(false);
        let stepValue = parseInt(this.reelsCount / 2);
        // console.log("reel---------------", stepValue);
        for (let i = 0; i < this.reelsCount; i++) {
            // let i = 0;
            let rndSymbols = GetRandomSymbols();
            let delay = this.spinDelays[i];
            let gapX = 0;

            let calulateFactor = i - stepValue;
            // gapX = (calulateFactor * this.reelBgfalse.displayWidth) + (22 * calulateFactor * Constant.scaleFactorX);
            gapX = (calulateFactor * reelBgfalse.displayWidth * 0.87);


            let xPos = Math.round(Constant.game.config.width / 2) + gapX;
            let yPos = null;
            if (Constant.isPortrait) {
                // yPos = Math.round(Constant.game.config.height / 3.2);
                yPos = Math.round(Constant.game.config.height / 3.05);
                // console.log('yPos :--------->', yPos)
            }
            else {
                // console.log('enter when desktop')
                yPos = Math.round(Constant.game.config.height / 7.8);
                // console.log('yPos :--------->', yPos)
            }
            if (i == 3) {
                let reel = new Reel(this.scene, xPos, yPos, rndSymbols, delay, true, i);
                this.reels.push(reel);
                // console.log('yPos ::::;' + yPos)
            }
            else {
                let reel = new Reel(this.scene, xPos, yPos, rndSymbols, delay, false, i);
                this.reels.push(reel);
                // console.log("Reelscount")
            }
        }
        // console.log('reels---------->', this.reels);


        for (let i = 0; i < this.reels.length; i++) {
            for (let j = 0; j < this.reels[i].obj.length; j++) {

                // if (this.reels[i].obj[j].usualImg.texture.key != "Blured_" + this.reels[i].obj[j].id) {
                //     this.reels[i].obj[j].usualImg.setInteractive();
                //     this.reels[i].obj[j].usualImg.on("pointerdown", function () {
                //         this.SymbolOnClick(Math.floor(this.reels[i].obj[j].usualImg.x), Math.floor(this.reels[i].obj[j].usualImg.y), this.reels[i].obj[j].usualImg);
                //     }, this);
                // }
                if (Constant.isPortrait) {
                    if (this.reels[i].obj[j].usualImg.y > Constant.game.config.height / 3 && this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.5) {
                        if (this.reels[i].obj[j].usualImg.texture.key != "Blured_" + this.reels[i].obj[j].id) {
                            this.reels[i].obj[j].usualImg.setInteractive();
                            this.reels[i].obj[j].usualImg.on("pointerdown", function () {
                                // this.SymbolOnClick(Math.floor(this.reels[i].obj[j].usualImg.x), Math.floor(this.reels[i].obj[j].usualImg.y), this.reels[i].obj[j].usualImg);
                            }, this);

                            this.reels[i].obj[j].usualImg.on("pointerup", function () {
                                this.SymbolOnClick(Math.floor(this.reels[i].obj[j].usualImg.x), Math.floor(this.reels[i].obj[j].usualImg.y), this.reels[i].obj[j].usualImg);
                            }, this);
                        }

                    }
                } else {
                    // console.log("h", Constant.game.config.height / 4.5, Constant.game.config.height / 1.45)
                    if (this.reels[i].obj[j].usualImg.y > Constant.game.config.height / 4.5 && this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.45) {
                        if (this.reels[i].obj[j].usualImg.texture.key != "Blured_" + this.reels[i].obj[j].id) {
                            this.reels[i].obj[j].usualImg.setInteractive();
                            this.reels[i].obj[j].usualImg.on("pointerdown", function () {
                                // this.SymbolOnClick(Math.floor(this.reels[i].obj[j].usualImg.x), Math.floor(this.reels[i].obj[j].usualImg.y), this.reels[i].obj[j].usualImg);
                            }, this);

                            this.reels[i].obj[j].usualImg.on("pointerup", function () {
                                this.SymbolOnClick(Math.floor(this.reels[i].obj[j].usualImg.x), Math.floor(this.reels[i].obj[j].usualImg.y), this.reels[i].obj[j].usualImg);
                            }, this);
                        }

                    }
                }


                // if (this.reels[i].obj[j].usualImg.texture.key != "Blured_" + this.reels[i].obj[j].id) {
                //     this.reels[i].obj[j].usualImg.setInteractive();
                //     this.reels[i].obj[j].usualImg.on("pointerdown", function () {
                //         // this.SymbolOnClick(Math.floor(this.reels[i].obj[j].usualImg.x), Math.floor(this.reels[i].obj[j].usualImg.y), this.reels[i].obj[j].usualImg);
                //     }, this);

                //     this.reels[i].obj[j].usualImg.on("pointerup", function () {
                //         this.SymbolOnClick(Math.floor(this.reels[i].obj[j].usualImg.x), Math.floor(this.reels[i].obj[j].usualImg.y), this.reels[i].obj[j].usualImg);
                //     }, this);
                // }


            }
        }



    };
    getWidth() {
        return this.totalWidth;
    };

    getHeight() {
        return this.reels[0].getHeight();
    }

    getX() {
        return this.leftX;
    };

    getY() {
        if (this.reels.length) {
            return this.reels[0].getPosition().y;
        }
        return 0;
    };

    onSpinStart() {
        this.scoreTweenCounter = 0;
        // this.isWinAnimComplete = false;
        // console.log('this.scene.gameLogo.isBuyBonusButtonClicked : ', this.scene.gameLogo.isBuyBonusButtonClicked)
        // if (this.scene.bottomPanel.isAutoPlayStarted == true) {
        for (let i = 0; i < this.reels.length; i++) {
            for (let j = 0; j < this.reels[i].obj.length; j++) {
                this.reels[i].obj[j].usualImg.removeInteractive();
            }
        }
        // }
        SoundManager.PlayReelSound();
        this.symbolDescription.symbolDescriptionContainer.visible = false;
        // console.log('this.reels : ', this.reels);
        this.scene.bottomPanel.isSpinStarted = true;
        // this.scene.bottomPanel.DisableSpaceBar();
        // this.slowReelSoundBool = true;
        // this.slowReelSoundBool = true;
        this.reelCounter = 0;
        this.newThunderAnimArray = [];
        this.randomIndex = GetRandomNumber(0, 4);
        // this.randomIndex = 3 ;
        // console.log('this.randomIndex : ', this.randomIndex)
        // let rnd;
        // let arr = [0, 1, 2, 3, 4];
        // rnd = Math.floor(Math.random() * arr.length);
        // this.randomIndex = arr[rnd];
        // console.log('this.randomIndex :---------------------> ', this.randomIndex)
        //---------------------------------------------------------------
        // console.log('this.reels : ', this.reels)
        this.reels.forEach((elem) => {
            elem.StopWinAnimation();
        });
        let i = 0
        this.reels.forEach((elem) => {
            // console.log("this reels ")
            // elem.StopWinAnimation();
            // elem.spin();
            if (Constant.isPortrait) {
                setTimeout(() => {
                    elem.RunAnimation();
                }, i * 215);
            }
            else {
                setTimeout(() => {
                    elem.RunAnimation();
                }, i * 150);
            }

            i += 1;
            // console.log('i--------------------->', i);
        });
    };
    PlayAllAnim() {
        // console.log("PlayAllAnim")
        //########################################################################################
        if (this.scene.bottomPanel.isAutoPlayStarted == false) {
            // console.log("AUtoFalse")
            for (let i = 0; i < this.reels.length; i++) {
                for (let j = 0; j < this.reels[i].obj.length; j++) {
                    if (Constant.isPortrait) {
                        if (this.reels[i].obj[j].usualImg.y > Constant.game.config.height / 3 && this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.5) {
                            this.reels[i].obj[j].usualImg.setInteractive();
                        }
                    } else {
                        // console.log("h", Constant.game.config.height / 4.5, Constant.game.config.height / 1.45)
                        if (this.reels[i].obj[j].usualImg.y > Constant.game.config.height / 4.5 && this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.45) {
                            // console.log(this.reels[i].obj[j].usualImg.y);
                            this.reels[i].obj[j].usualImg.setInteractive();
                        }
                    }
                }
            }
        }

        for (let i = 0; i < this.reels.length; i++) {
            for (let j = 0; j < this.reels[i].obj.length; j++) {
                // console.log("AutoTrue")
                if (Constant.isPortrait) {
                    if (this.reels[i].obj[j].usualImg.y > Constant.game.config.height / 3 && this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.5) {
                        if (this.reels[i].obj[j].usualImg.texture.key == "Blured_" + this.reels[i].obj[j].id) {
                            this.reels[i].obj[j].usualImg.removeInteractive();
                        }
                    }
                } else {
                    // console.log("h", Constant.game.config.height / 4.5, Constant.game.config.height / 1.45)
                    if (this.reels[i].obj[j].usualImg.y > Constant.game.config.height / 4.5 && this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.45) {
                        if (this.reels[i].obj[j].usualImg.texture.key == "Blured_" + this.reels[i].obj[j].id) {
                            this.reels[i].obj[j].usualImg.removeInteractive();
                        }
                    }
                }

            }
        }
        //######################################################################################### 

        // this.scene.bottomPanel.isSpinStarted = false;
        // let reel = new Reel(this.scene);
        // console.log()
        // if (Constant.isMobile) {
        //     if (Constant.isPortrait) {
        //         console.log('reel :----------->', reel.finalPosY)
        //     }
        //     else {
        //         console.log('reel :----------->', reel.finalPosY)
        //     }    
        // }
        this.isAnimPlaying = true;

        for (let i = 0; i < this.reels.length; i++) {
            for (let j = 0; j < this.reels[i].obj.length; j++) {// 
                // if (Constant.isPortrait) {
                // console.log(Constant.game.config.height / 2.74, Constant.game.config.height / 0.7)
                // console.log("Portrait", this.reels[i].obj[j], this.reels[i].obj[j].usualImg.y)

                if (this.reels[i].obj[j].usualImg.y > Constant.game.config.height / 2.72 && this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.5) {
                    // console.log("PLayanim")
                    this.PlayAllAnimations(i, j);

                } else {
                    if (this.reels[i].obj[j].usualImg.y > Constant.game.config.height / 4.5 && this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.52) {
                        this.PlayAllAnimations(i, j);
                    }
                }
            }
        }
        // this.NumberAnimationHeader();
    }
    PlayAllAnimations(i, j) {
        if (this.reels[i].obj[j].id === "character_1" && this.reels[i].obj[j].usualImg.texture.key != "Blured_character_1") {
            // console.log('this.reels[', i, '].obj[j] : ', this.reels[i].obj[j].id, this.reels[i].obj[j].id.y);
            // if (this.reels[i].obj[j].usualImg.y < 1320) {
            //     this.reels[i].obj[j].PlayCharacterAnim();
            //     SoundManager.PlaySingleCharacter1Sound();
            // }

            if (Constant.isPortrait) {
                if (this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.6) {
                    this.reels[i].obj[j].PlayCharacterAnim();
                    SoundManager.PlaySingleCharacter1Sound();
                }
            }
            else {
                this.reels[i].obj[j].PlayCharacterAnim();
                SoundManager.PlaySingleCharacter1Sound();
            }
        }
        else if (this.reels[i].obj[j].id === "scatter" && this.reels[i].obj[j].usualImg.texture.key != "Blured_scatter") {
            // console.log('this.reels[', i, '].obj[j] : ', this.reels[i].obj[j].id, this.reels[i].obj[j].id.y);
            if (Constant.isPortrait) {
                if (this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.6) {
                    this.reels[i].obj[j].PlayScatterSpineAnim();
                    SoundManager.PlayScatterSound();
                }
            }
            else {
                this.reels[i].obj[j].PlayScatterSpineAnim();
                SoundManager.PlayScatterSound();
            }
        }
        else if (this.reels[i].obj[j].id === "character_4" && this.reels[i].obj[j].usualImg.texture.key != "Blured_character_4") {
            // if (this.reels[i].obj[j].usualImg.y < 1320) {
            //     this.reels[i].obj[j].PlayMorenaAnim();
            //     // SoundManager.PlayScatterSound();
            // }
            // console.log('this.reels[', i, '].obj[j] : ', this.reels[i].obj[j].id, this.reels[i].obj[j].id.y);
            if (Constant.isPortrait) {
                if (this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.6) {
                    this.reels[i].obj[j].PlayMorenaAnim();
                }
            }
            else {
                this.reels[i].obj[j].PlayMorenaAnim();
            }

        }
        else if (this.reels[i].obj[j].id === "character_2" && this.reels[i].obj[j].usualImg.texture.key != "Blured_character_2") {
            // console.log('this.reels[', i, '].obj[j] : ', this.reels[i].obj[j].id, this.reels[i].obj[j].id.y);
            if (Constant.isPortrait) {
                if (this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.6) {
                    this.reels[i].obj[j].PlayPeliRojaAnim();
                    SoundManager.PlayPelirojaSound();
                }
            }
            else {
                this.reels[i].obj[j].PlayPeliRojaAnim();
                SoundManager.PlayPelirojaSound();
            }
        }
        else if (this.reels[i].obj[j].id === "character_3" && this.reels[i].obj[j].usualImg.texture.key != "Blured_character_3") {
            // if (this.reels[i].obj[j].usualImg.y < 1320) {
            //     this.reels[i].obj[j].PLayRoughBoyAnim();
            //     // SoundManager.PlayScatterSound();
            // }
            // console.log('this.reels[', i, '].obj[j] : ', this.reels[i].obj[j].id, this.reels[i].obj[j].id.y);
            if (Constant.isPortrait) {
                if (this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.6) {
                    this.reels[i].obj[j].PLayRoughBoyAnim();
                }
            }
            else {
                this.reels[i].obj[j].PLayRoughBoyAnim();
            }
        }
        else if (this.reels[i].obj[j].id === "10" && this.reels[i].obj[j].usualImg.texture.key != "Blured_10") {
            // console.log('this.reels[i].obj[j] : ', this.reels[i].obj[j].y);
            // console.log('this.reels[', i, '].obj[j] : ', this.reels[i].obj[j].id, this.reels[i].obj[j].id.y);
            if (this.reels[i].obj[j].usualImg.y < 1320) {
                this.reels[i].obj[j].PlayTenComboAnim();
            }
        }
        else if (this.reels[i].obj[j].id === "a" && this.reels[i].obj[j].usualImg.texture.key != "Blured_a") {
            // console.log('this.reels[', i, '].obj[j] : ', this.reels[i].obj[j].id, this.reels[i].obj[j].id.y);
            // console.log('this.reels[i].obj[j] : ', this.reels[i].obj[j].y);
            // if (this.reels[i].obj[j].usualImg.y < 1320) {
            //     this.reels[i].obj[j].PlayAComboAnim();
            // }

            if (Constant.isPortrait) {
                if (this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.6) {
                    this.reels[i].obj[j].PlayAComboAnim();
                }
            }
            else {
                this.reels[i].obj[j].PlayAComboAnim();
            }
        }
        else if (this.reels[i].obj[j].id === "j" && this.reels[i].obj[j].usualImg.texture.key != "Blured_j") {
            // console.log('this.reels[i].obj[j] : ', this.reels[i].obj[j].y);
            // if (this.reels[i].obj[j].usualImg.y < 1320) {
            //     this.reels[i].obj[j].PlayJComboWin();
            // }
            // console.log('this.reels[', i, '].obj[j] : ', this.reels[i].obj[j].id, this.reels[i].obj[j].id.y);
            if (Constant.isPortrait) {
                if (this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.6) {
                    this.reels[i].obj[j].PlayJComboWin();
                }
            }
            else {
                this.reels[i].obj[j].PlayJComboWin();
            }
        }
        else if (this.reels[i].obj[j].id === "k" && this.reels[i].obj[j].usualImg.texture.key != "Blured_k") {
            // console.log('this.reels[i].obj[j] : ', this.reels[i].obj[j].y);
            // if (this.reels[i].obj[j].usualImg.y < 1320) {
            //     this.reels[i].obj[j].PlayKComboWin();
            // }
            // console.log('this.reels[', i, '].obj[j] : ', this.reels[i].obj[j].id, this.reels[i].obj[j].id.y);
            if (Constant.isPortrait) {
                if (this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.6) {
                    this.reels[i].obj[j].PlayKComboWin();
                }
            }
            else {
                this.reels[i].obj[j].PlayKComboWin();
            }
        }
        else if (this.reels[i].obj[j].id === "q" && this.reels[i].obj[j].usualImg.texture.key != "Blured_q") {
            // console.log('this.reels[i].obj[j] : ', this.reels[i].obj[j].y);
            // if (this.reels[i].obj[j].usualImg.y < 1320) {
            //     this.reels[i].obj[j].PlayQComboWin();
            // }
            // console.log('this.reels[', i, '].obj[j] : ', this.reels[i].obj[j].id, this.reels[i].obj[j].id.y);
            if (Constant.isPortrait) {
                if (this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.6) {
                    this.reels[i].obj[j].PlayQComboWin();
                }
            }
            else {
                this.reels[i].obj[j].PlayQComboWin();
            }
        }
        else if (this.reels[i].obj[j].id === "9" && this.reels[i].obj[j].usualImg.texture.key != "Blured_9") {
            // console.log('this.reels[i].obj[j] : ', this.reels[i].obj[j].y);
            // if (this.reels[i].obj[j].usualImg.y < 1320) {
            //     this.reels[i].obj[j].PlayKNineComboWin();
            // }
            // console.log('this.reels[', i, '].obj[j] : ', this.reels[i].obj[j].id, this.reels[i].obj[j].id.y);
            if (Constant.isPortrait) {
                if (this.reels[i].obj[j].usualImg.y < Constant.game.config.height / 1.6) {
                    this.reels[i].obj[j].PlayKNineComboWin();
                }
            }
            else {
                this.reels[i].obj[j].PlayKNineComboWin();
            }
        }


        // this.scene.bottomPanel.EnableSpaceBar();

    }
    SymbolOnClick(_x, _y, _usualImage) {
        // console.log('_usualImage : ', _usualImage.y);
        if (_usualImage.texture.key.includes('symbol_')) {
            this.symbolDescription.MakePopUpVisible(_x, _y, _usualImage);
        } else {
            // _usualImage.removeInteractive();
        }
    }

    //#######################################################################################################
    PlayMultiplierAnim() {

        let allDigit = [];
        if (allDigit != null) {
            console.log("allDigit: ", allDigit);
        }
        let obj;
        let firstDecimal;
        let secondDecimal;
        let initialVal = 0.00;

        //newly added#########################################################
        let animContainerPosY;
        let targetPosition;
        let gapXBetweenTwoInteger = 100;


        console.log()
        //animContainer position and scale for different modes
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                animContainerPosY = Math.round(Constant.game.config.height / 1.50);
                targetPosition = Math.round(Constant.game.config.height / 1.30);
                // gapXBetweenTwoInteger = 100;
            }
            else {
                animContainerPosY = Math.round(Constant.game.config.height / 1.7);
                targetPosition = Math.round(Constant.game.config.height / 1.30);
                // gapXBetweenTwoInteger = 120;
            }
        }
        else {
            animContainerPosY = Math.round(Constant.game.config.height / 1.7);
            targetPosition = Math.round(Constant.game.config.height / 1.23);
            // gapXBetweenTwoInteger = 100;
        }


        this.animContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), animContainerPosY).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(4);

        //####################################################################


        // this.animContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);


        let targetAmount = Model.getLastWin();
        console.log("targetAmount: ", targetAmount);
        const digits = targetAmount.split('.');
        let integerPart = digits[0];
        let decimalPart = digits[1];

        //creating integer part==========================================================
        for (let i = 0; i < integerPart.length; i++) {
            if (Constant.isMobile) {
                if (Constant.isPortrait) {
                    obj = this.scene.add.sprite(-120 + (i * gapXBetweenTwoInteger), 0, 'winNumbers', 0).setVisible(false).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                    // obj.depth = 4;
                } else {
                    obj = this.scene.add.sprite(-160 + (i * gapXBetweenTwoInteger), 0, 'winNumbers', 0).setVisible(false)//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                    // obj.depth = 4;
                }
            } else {
                obj = this.scene.add.sprite(-140 + (i * gapXBetweenTwoInteger), 0, 'winNumbers', 0).setVisible(false).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                // obj.depth = 4;
            }
            // obj.depth = 3;
            allDigit.push(obj);
            this.animContainer.add(obj);
        }
        //creating dot=====================================================================
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.dot = this.scene.add.image(allDigit[allDigit.length - 1].x + gapXBetweenTwoInteger, 0, "dot").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            } else {
                this.dot = this.scene.add.image(allDigit[allDigit.length - 1].x + gapXBetweenTwoInteger, 0, "dot").setOrigin(0.5) //.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            }
        } else {
            this.dot = this.scene.add.image(allDigit[allDigit.length - 1].x + gapXBetweenTwoInteger, 0, "dot").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        }
        //===================================================================================

        allDigit.push(this.dot);
        this.animContainer.add(this.dot);
        //creating decimal part==============================================================
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                firstDecimal = this.scene.add.sprite(this.dot.x + gapXBetweenTwoInteger, 0, 'winNumbers', 0).setVisible(false).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                secondDecimal = this.scene.add.sprite(this.dot.x + 2 * (gapXBetweenTwoInteger), 0, 'winNumbers', 0).setVisible(false).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            } else {
                firstDecimal = this.scene.add.sprite(this.dot.x + gapXBetweenTwoInteger, 0, 'winNumbers', 0).setVisible(false)//.setScale(Constant.scaleFactorX, Constant.scaleFactorY); 
                secondDecimal = this.scene.add.sprite(this.dot.x + (2 * gapXBetweenTwoInteger), 0, 'winNumbers', 0).setVisible(false)//.setScale(Constant.scaleFactorX, Constant.scaleFactorY); 
            }
        } else {
            firstDecimal = this.scene.add.sprite(this.dot.x + gapXBetweenTwoInteger, 0, 'winNumbers', 0).setVisible(false).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            secondDecimal = this.scene.add.sprite(this.dot.x + 2 * (gapXBetweenTwoInteger), 0, 'winNumbers', 0).setVisible(false).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        }

        //========================================================================================

        allDigit.push(firstDecimal);
        allDigit.push(secondDecimal);
        this.animContainer.add(firstDecimal);
        this.animContainer.add(secondDecimal);

        allDigit[allDigit.length - 1].visible = true;
        allDigit[allDigit.length - 2].visible = true;
        allDigit[allDigit.length - 4].visible = true;

        let moveDownTween = this.scene.tweens.add({
            targets: this.animContainer,
            y: targetPosition,
            ease: "Linear",
            duration: 300,
            callbackScope: this,
            onComplete: function () {
                this.IncrementDigit(allDigit, digits[0], initialVal, targetAmount);
            }
        })


    };

    IncrementDigit(_allDigit, _intPart, _initialVal, _tempTar) {
        this.scoreTweenCounter++;
        let myInterval = setInterval(() => {

            if (_initialVal < (_tempTar)) {
                _initialVal += 0.01;
                this.updateScoreImage(_initialVal, _allDigit);
            }
            else {
                clearInterval(myInterval);
                let scaleTween = this.scene.tweens.add({
                    delay: 200,
                    targets: this.animContainer,
                    scale: +(Constant.scaleFactor * 1.2),
                    duration: 300,
                    ease: 'Linear',
                    onComplete: () => {
                        this.scene.tweens.add({
                            delay: 200,
                            targets: this.animContainer,
                            scale: -(Constant.scaleFactor * 1.4),
                            alpha: -0.7,
                            duration: 1000,
                            ease: 'Linear',
                            onComplete: () => {
                                this.animContainer.visible = false;
                                if (!this.isFreeSpinStarted) {
                                    Constant.game.events.emit("evtEnableGUIButton");
                                } else {
                                    // this.scene.bottomPanel.SetWinAmountText();
                                    // this.scene.bottomPanel.SetBalanceText();
                                    this.scene.bottomPanel.UpdateFreeSpinwinAmount();
                                }
                                setTimeout(() => {
                                    Constant.game.events.emit("evtPaylinesShowingDone");
                                }, 1000);
                            },
                        })
                    },
                })
            }
        }, 30);

    }
    updateScoreImage(_initialVal, _allDigit) {
        const digits = (_initialVal).toFixed(2).split('.');
        const integerPart = digits[0];
        const decimalPart = digits[1];
        if (integerPart.length == 1) {
            _allDigit[_allDigit.length - 4].setFrame(parseInt(integerPart.charAt(0)));
        }
        else if (integerPart.length == 2) {
            _allDigit[_allDigit.length - 5].setFrame(parseInt(integerPart.charAt(0)));
            _allDigit[_allDigit.length - 4].setFrame(parseInt(integerPart.charAt(1)));
            _allDigit[_allDigit.length - 5].visible = true;
        }
        _allDigit[_allDigit.length - 2].setFrame(parseInt(decimalPart.charAt(0)));
        _allDigit[_allDigit.length - 1].setFrame(parseInt(decimalPart.charAt(1)));
    };
    //#######################################################################################################

    getSymbolPosition(reelIndex, symbolIndex) {
        let reel = this.reels[reelIndex];
        return reel.getSymbolPosition(symbolIndex);
    };

    getSymbol(reelIndex, symbolIndex) {
        let reel = this.reels[reelIndex];
        return reel.getSymbolByIndex(symbolIndex);
    };

    onSpinStop() {
        if (this.scene.menuPopup.isFastPlay == false) {
            this.reels.forEach((elem, index) => {

                if (index < this.randomIndex) {
                    if (Constant.isPortrait) {
                        setTimeout(() => {
                            elem.StopAnimation();
                            if (this.reelCounter == this.randomIndex) {
                                SoundManager.SlowReelAnimSound();
                            }
                        }, index * 110);
                    }
                    else {
                        setTimeout(() => {
                            if (this.reelCounter == this.randomIndex) {
                                SoundManager.SlowReelAnimSound();
                            }
                            elem.StopAnimation();

                        }, index * 110);
                    }
                    this.reelCounter++;
                }
                else if (index < this.randomIndex + 1) {
                    setTimeout(() => {
                        elem.StopAnimation();
                    }, index * 1000);
                }
                else if (this.randomIndex == 0) {
                    SoundManager.SlowReelAnimSound();
                }
            });
            setTimeout(() => {
                SoundManager.StopReelSound();
            }, 1200);
        }
        else {
            this.reels.forEach((elem, index) => {
                elem.StopAnimation()
            });
            SoundManager.StopReelSound()
        }
    };

    PlayThunderAnims(_getArray) {
        _getArray.forEach(element => {
            if (Constant.isPortrait) {
                if (element.y <= Constant.game.config.height / 2.74 || element.y >= Constant.game.config.height / 0.7) {
                    _getArray.splice(element, 0);
                } else {
                    this.newThunderAnimArray.push(element);
                }
            } else {
                if (element.y <= Constant.game.config.height / 5.4 || element.y >= Constant.game.config.height / 1.5) {
                    _getArray.splice(element, 0);
                } else {
                    this.newThunderAnimArray.push(element);
                }
            }

        });
    };

    ThunderAnimPlay() {
        // console.log("newThunderAnimArray", this.newThunderAnimArray)
        for (let i = 0; i < this.newThunderAnimArray.length; i++) {
            setTimeout(() => {
                // console.log("Index0" , this.newThunderAnimArray[i])
                this.newThunderAnimArray[i].PlayThunderAnim();

            }, 50);

        }
        setTimeout(() => {
            for (let i = 0; i < this.newThunderAnimArray.length; i++) {
                setTimeout(() => {
                    this.newThunderAnimArray[i].PlayThunderAnimss();
                    // if( i == this.newThunderAnimArray.length -1 ){
                    if (i == this.newThunderAnimArray.length - 1) {
                        // console.log("CheckTimeout", i * 300)
                        this.newThunderAnimArray[i].PlayLastThunderAnim();
                    }

                    // }
                }, 300 * i);

            }
        }, 600);
        this.counterThunder++;
        // this.newThunderAnimArray = [];
    };

    OnFreeSpinStart() {
        this.isFreeSpinStarted = true;
        this.scene.bottomPanel.targetAutoSpin = 3;
        this.scene.bottomPanel.autoPlayButtonContainer.list[1].setVisible(true);
        this.scene.bottomPanel.autoPlayCounterText.visible = true;
        this.scene.bottomPanel.autoPlayButtonContainer.list[3].visible = true;
        this.scene.bottomPanel.autoPlayButtonContainer.list[4].setText(this.scene.bottomPanel.targetAutoSpin);
        this.scene.bottomPanel.autoPlayButtonContainer.list[4].visible = true;
        this.scene.bottomPanel.autoPlayCounterText.setText(this.scene.bottomPanel.autoPlayCounter);

        Constant.game.events.emit("evtSpinStart");
        setTimeout(() => {
            Constant.game.events.emit("evtSpinStop");
        }, 2000);
    };
};


export default ReelsView;