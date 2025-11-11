import Reel from "./Reel.js";
import { GetRandomSymbols } from "../Utils.js";
import { Model } from "../Model.js";
import { SoundManager } from "../SoundManager.js";
import FreeSpinView from "../ui/FreeSpinView.js";
import FreeSpinPopup from "../popups/FreeSpinPopup.js";
import { Constant } from "../Constant.js";

class ReelsView {
    constructor(scene) {
        this.scene = scene;
        this.reels = [];
        this.leftX = 0;
        this.isFreeSpinsMode = false;
        this.reelsCount = 5;
        this.spinDelays = [200, 400, 700, 1000, 1300];
        this.totalWidth = 0;
        this.normalStopTimeEvt = null;
        this.immediateStopTimeEvt = null;

        this.freeSpinView = null;
        this.freeSpinPopup = null;

        this.create();

        this.scene.game.events.on("evtSpinStart", this.onSpinStart, this);
        this.scene.game.events.on("evtSpinStop", this.onSpinStop, this);
        this.scene.game.events.on("evtSpinStopImmediate", this.onSpinStopImmediate, this);
        this.scene.game.events.on("evtPaylinesShowingDone", this.ShowFreeSpinPopup, this);
        this.scene.game.events.on("evtFreeSpinsPopupClosed", this.StartFreeSpin, this);
    };

    create() {
        this.reelBgfalse = this.scene.add.image(0, 0, "reel_bg").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.reelBgfalse.setVisible(false);
        let stepValue = parseInt(this.reelsCount / 2);
        for (let i = 0; i < this.reelsCount; i++) {
            let rndSymbols = GetRandomSymbols();
            let delay = this.spinDelays[i];
            let gapX = 0;

            let calulateFactor = i - stepValue;
            gapX = (calulateFactor * this.reelBgfalse.displayWidth) + (22 * calulateFactor * Constant.scaleFactorX);
            let xPos = Math.round(Constant.game.config.width / 2) + gapX;
            let yPos = Math.round(Constant.game.config.height / 7.8);

            let reel = new Reel(this.scene, xPos, yPos, rndSymbols, delay);
            this.reels.push(reel);
        }
        this.freeSpinView = new FreeSpinView(this.scene);
    };

    DestroyFreeSpinPopup() {
        this.freeSpinPopup = null;
    }

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
    //=============================================================
    ShowFreeSpinPopup() {
        let listOfFreeSpins = Model.getFreeSpinsData();
        let multiplierValue = Model.GetMultiplierValue();
        // this.scene.game.events.emit("evtSpinStartClearPayLine");
        if (listOfFreeSpins.length > 0 && !this.isFreeSpinsMode) {
            if (this.freeSpinPopup == null) {
                console.log("show free spin popup");
                SoundManager.StopPaylineContinuouslySound();
                this.freeSpinPopup = new FreeSpinPopup(this.scene, listOfFreeSpins.length, multiplierValue);
                this.scene.game.events.emit("evtDisableGUIButton");
                this.scene.game.events.emit("evtDisableSpinButton");
            } else { }
        } else {
            this.StartFreeSpin();
        }
    }

    StartFreeSpin() {
        let listOfFreeSpins = Model.getFreeSpinsData();

        if (listOfFreeSpins.length > 0) {
            SoundManager.StopPaylineContinuouslySound();
            this.freeSpinView.ShowFreeSpinView();
            this.scene.gameLogo.HideLogo();
            this.isFreeSpinsMode = true;
            let freeSpinData = listOfFreeSpins.shift();
            let multiplierValue = Model.GetMultiplierValue();
            this.scene.game.events.emit("evtFreeSpinShow", listOfFreeSpins.length + 1, multiplierValue);
            Model.setGrid(freeSpinData.grid);
            Model.setWonPaylines(freeSpinData.wonPaylines);
            Model.setLastWin(freeSpinData.lastWin);
            Model.setBalance(freeSpinData.updatedBalance);
            this.scene.game.events.emit("evtSpinStartClearPayLine");
            this.scene.gameLogo.StopNumberBlinkAnimation();
            this.scene.bottomPanel.HideBigWin();

            this.scene.game.events.emit("evtSpinStart");
            this.scene.game.events.emit("evtDisableGUIButton");
            this.scene.game.events.emit("evtDisableSpinButton");

            this.scene.game.events.emit("evtFreeSpinStopButton");

            this.scene.time.addEvent({
                delay: 1500,
                callback: () => {
                    if (this.scene.bottomPanel.isImmediateStop != true) {
                        this.scene.game.events.emit("evtSpinStop");
                    }
                    this.scene.bottomPanel.SetBalanceText();
                },
                callbackScope: this
            });
        } else {
            this.scene.bottomPanel.SetBalanceText();
            this.isFreeSpinsMode = false;
            this.freeSpinView.HideFreeSpinView();
            this.scene.gameLogo.ShowLogo();
            this.DestroyFreeSpinPopup();
            // this.scene.game.events.emit("evtEnableGUIButton");
            // this.scene.game.events.emit("evtEnableSpinButton");
            // this.scene.game.events.emit("evtFreeSpinsDone");
        }
    }

    //=============================================================
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
                SoundManager.StopPaylineContinuouslySound();
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
            delay: 300,
            callback: () => {
                SoundManager.StopPaylineContinuouslySound();
                this.scene.reelsView.normalStopTimeEvt.remove();
                this.scene.reelsView.immediateStopTimeEvt.remove();
                this.scene.game.events.emit("evtEnableGUIButton");
            },
            callbackScope: this
        });

    };

};

export default ReelsView;