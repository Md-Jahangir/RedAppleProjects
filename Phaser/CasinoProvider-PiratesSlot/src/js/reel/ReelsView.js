import Reel from "./Reel.js";
import { GetRandomSymbols } from "../Utils.js";
import { GetRandomNumber } from "../Utils.js";
// import { Model } from "../Model.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from '../Constant.js';
import SymbolDescription from '../popups/SymbolDescription.js'
import { Sound, Utils } from "phaser";
import { Model } from "../Model.js";
import BoardWheel from "../ui/BoardWheel.js";
// import ReelAnimation from './ReelAnimation.js';
class ReelsView {
    constructor(scene) {
        this.scene = scene;
        this.reels = [];
        this.leftX = 0;
        this.symbolDescription = null;
        this.reelsCount = 2;
        this.spinDelays = [400, 550, 700, 800, 850];
        this.totalWidth = 0;
        this.reelAnimationObj = [];
        this.mask = null;
        this.wheelInstance = null;


        Constant.game.events.on("evtSpinStart", this.onSpinStart, this);
        Constant.game.events.on("evtSpinStop", this.onSpinStop, this);
        this.finalTarget = 11.45;
        this.randomIndex = null;
        this.reelCounter = null;
        this.counter = 0;
        this.config = this.scene.cache.json.get("game_config");
        this.create();
    };

    create() {
        this.reelViewContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let reelFrame = this.scene.add.image(-this.config.reelView.reelFrameBg.displayWidth / 2, -(this.config.reelView.reelFrameBg.displayHeight / 2) - 80, "game_frame").setOrigin(0).setAlpha(1);
        // let reelBgfalse = this.scene.add.image(reelFrame.x, reelFrame.y, "reel_bg").setOrigin(0.5, 0).setDepth(1.1);
        // let xop = 0;
        // reelBgfalse.setVisible(false);
        this.reelViewContainer.add([reelFrame]);
        //++++++++++++++Background Frame or Bottom Frame 
        this.gameFrameContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let gameFrameBg = this.scene.add.image(0, -95, "gameplay_frame").setOrigin(0.5, 0.5).setAlpha(1);
        this.gameFrameContainer.add([gameFrameBg]);

        for (let i = 0; i < 5; i++) {
            let rndSymbols = GetRandomSymbols();
            let delay = this.spinDelays[i];
            let xPos = reelFrame.x + this.config.reelView.reelOffsetArryX[i];
            let yPos = reelFrame.y;
            let reel = new Reel(this.scene, xPos, yPos, rndSymbols, delay, false, i, this.config.repeat);
            this.reels.push(reel);
        }
        //Left and Right Wheels 
        this.wheelInstance = new BoardWheel(this.scene, reelFrame);
        this.gameFrameContainer.add([this.wheelInstance.leftWheel, this.wheelInstance.righttWheel]);
        //+++++++++++++++++Left Wood Bar
        this.leftBar = this.scene.add.image(-440, -60, "left_bar").setOrigin(0.5, 0.5).setAlpha(1);
        this.gameFrameContainer.add(this.leftBar);
        //+++++++++++++++++Right Wood Bar
        this.rightBar = this.scene.add.image(440, -60, "right_bar").setOrigin(0.5, 0.5).setAlpha(1);
        this.gameFrameContainer.add(this.rightBar);
        let gameFrameBgUpper = this.scene.add.image(0, -95, "gameplay_frame_upper").setOrigin(0.5, 0.5).setAlpha(1);

        this.gameFrameContainer.add([gameFrameBgUpper]);
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
        let i = 0
        this.scene.isFirstReelStopped = false;
        this.wheelInstance.StartSpinning();
        Constant.game.events.emit("evtUpdateWinAmount", '');
        this.reels.forEach((elem, index) => {
            setTimeout(() => {
                elem.ResumeAnimation(this.spinDelays[index]);
                SoundManager.PLayReelSound();
            }, (this.spinDelays[index]) / 2);
            i += 1;
        });
    };
    SymbolOnClick(_x, _y, _usualImage) {
        if (_usualImage.texture.key.includes('symbol_')) {
            this.symbolDescription.MakePopUpVisible(_x, _y, _usualImage);
        } else {
        }
    }

    getSymbolPosition(reelIndex, symbolIndex) {
        let reel = this.reels[reelIndex];
        return reel.getSymbolPosition(reelIndex, symbolIndex);
    };

    getSymbol(reelIndex, symbolIndex) {
        let reel = this.reels[reelIndex];
        return reel.getSymbolByIndex(reelIndex, symbolIndex);
    };

    onSpinStop() {
        this.scene.isFirstReelStopped = true;
        let i = 0
        this.reels.forEach((elem, index) => {
            setTimeout(() => {
                elem.StopAnimation()
            }, index * 800);
        });


    };




};


export default ReelsView;