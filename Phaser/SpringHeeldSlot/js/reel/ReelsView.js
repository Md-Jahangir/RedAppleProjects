import Reel from "./Reel.js";
import { GetRandomSymbols } from "../Utils.js";
import { Model } from "../Model.js";
import { SoundManager } from "../SoundManager.js";

class ReelsView {
    constructor(scene) {
        this.scene = scene;
        this.reels = [];
        this.leftX = 0;

        this.reelsCount = 5;
        this.spinDelays = [200, 400, 700, 1000, 1300];
        this.totalWidth = 0;
        this.normalStopTimeEvt = null;
        this.immediateStopTimeEvt = null;

        this.create();

        this.scene.game.events.on("evtSpinStart", this.onSpinStart, this);
        this.scene.game.events.on("evtSpinStop", this.onSpinStop, this);
        this.scene.game.events.on("evtSpinStopImmediate", this.onSpinStopImmediate, this);
    };

    create() {
        this.reelBgfalse = this.scene.add.image(0, 0, "reel_bg").setOrigin(0.5, 0).setScale(scaleFactorX, scaleFactorY);
        this.reelBgfalse.setVisible(false);
        let stepValue = parseInt(this.reelsCount / 2);
        for (let i = 0; i < this.reelsCount; i++) {
            let rndSymbols = GetRandomSymbols();
            let delay = this.spinDelays[i];
            let gapX = 0;

            let calulateFactor = i - stepValue;
            gapX = (calulateFactor * this.reelBgfalse.displayWidth) + (22 * calulateFactor * scaleFactorX)

            let xPos = Math.round(game.config.width / 2) + gapX;
            // let yPos = Math.round(game.config.height / 7.8);
            let yPos = Math.round(game.config.height / 10.0);

            let reel = new Reel(this.scene, xPos, yPos, rndSymbols, delay);
            this.reels.push(reel);
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
        this.reels.forEach((elem) => {
            elem.spin();
        });
    };

    getSymbolPosition(reelIndex, symbolIndex) {
        let reel = this.reels[reelIndex];
        return reel.getSymbolPosition(symbolIndex);
    };

    getSymbol(reelIndex, symbolIndex) {
        let reel = this.reels[reelIndex];
        return reel.getSymbolByIndex(symbolIndex);
    };

    onSpinStop() {
        SoundManager.StopPaylineContinuouslySound();
        let grid = Model.getGrid();
        this.reels.forEach((elem, index) => {
            elem.stop();

            let symbols = grid[index];
            elem.setSymbols(symbols);
        });


        if (this.normalStopTimeEvt != null) {
            this.normalStopTimeEvt.remove();
        }
        if (this.immediateStopTimeEvt != null) {
            this.immediateStopTimeEvt.remove();
        }
        this.normalStopTimeEvt = this.scene.time.addEvent({
            delay: 1500,
            callback: () => {
                this.scene.game.events.emit("evtEnableGUIButton");
                this.scene.reelsView.normalStopTimeEvt.remove();

                if (this.scene.reelsView.immediateStopTimeEvt != null) {
                    this.scene.reelsView.immediateStopTimeEvt.remove();
                }
            },
            callbackScope: this
        });
    };

    onSpinStopImmediate() {
        SoundManager.StopPaylineContinuouslySound();
        let grid = Model.getGrid();
        this.reels.forEach((elem, index) => {
            elem.stopImmediate();
            let symbols = grid[index];
            elem.setSymbols(symbols);
        });
        if (this.immediateStopTimeEvt != null) {
            this.immediateStopTimeEvt.remove();
        }
        if (this.normalStopTimeEvt != null) {
            this.normalStopTimeEvt.remove();
        }
        this.immediateStopTimeEvt = this.scene.time.addEvent({
            delay: 100,
            callback: () => {
                this.scene.reelsView.normalStopTimeEvt.remove();
                this.scene.game.events.emit("evtEnableGUIButton");
                this.scene.reelsView.immediateStopTimeEvt.remove();
            },
            callbackScope: this
        });

    };

};

export default ReelsView;