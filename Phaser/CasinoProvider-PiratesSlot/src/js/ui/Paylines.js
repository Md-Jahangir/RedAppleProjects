import { Model } from "../Model.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";

class Paylines {
    constructor(scene, reelsView) {
        this.scene = scene;
        this.reelsView = reelsView;
        this.scale = 1;
        this.leftButtons = [];
        this.rightButtons = [];
        this.currentPaylineIndex = 0;
        this.paylineIndexes = [0, 1, 2, 3, 4];
        this.isShowingDone = false;
        this.symbolsArray = [];
        this.spineWinArray = [];
        this.spineShadowArray = [];
        this.timedEvent = null;
        this.timedShadowEvent = null;
        this.symbol = null;
        this.symbolType = null;
        this.animatedSymbolType = null;
        this.highSymbolsPlayTime = 3100;
        this.lowSymbolPlayeTime = 1600;
        this.create();
    };


    create() {
        Constant.game.events.on("evtShowWonPaylines", this.onShowWonPaylines, this);
        // Constant.game.events.on("evtSpinStartClearPayLine", this.stopSpines, this);
        Constant.game.events.on("evtSpinStart", this.stopSpines, this);
        Constant.game.events.on("evtForceFullyStopAnimations", this.stopSpinesForceFully, this);
    };

    stopSpines() {
        if (this.timedEvent != null || this.timedEvent != undefined) {
            this.timedEvent.remove();
        }
        if (this.timedShadowEvent != null || this.timedShadowEvent != undefined) {
            this.timedShadowEvent.remove();
        }
        if (this.spineShadowArray.length > 0) {
            for (let index = 0; index < this.spineShadowArray.length; index++) {
                this.spineShadowArray[index].StopPaylineSpines();
            }
        }
        if (this.spineWinArray.length > 0) {
            for (let index = 0; index < this.spineWinArray.length; index++) {
                this.spineWinArray[index].StopSpine();
            }
        }

    }
    stopSpinesForceFully() {
        this.stopSpines();
        // this.scene.game.events.emit('evtPaylinesShowingDone');
    }
    RemoveTimerEvent() {
        if (this.timedEvent != null || this.timedEvent != undefined) {
            this.timedEvent.remove();
            this.symbolsArray = [];
        }
        if (this.timedShadowEvent != null || this.timedShadowEvent != undefined) {
            this.timedShadowEvent.remove();
            this.spineShadowArray = [];
        }
    }
    onShowWonPaylines() {
        this.currentPaylineIndex = 0;
        this.spineWinArray = [];
        this.spineShadowArray = [];
        this.showNextPayline();
        this.CheckWinningStreaks();
    };

    StopSpineAnimation() {
        for (let index = 0; index < this.symbolsArray.length; index++) {
            this.symbolsArray[index].StopSpine();
        }
    }
    showNextPayline() {
        let list = Model.getWonPaylines();
        if (list.length > 0) {
            if (this.currentPaylineIndex >= list.length) {

                if (this.scene.bottomPanel.isAutoMode || this.scene.bottomPanel.isFreeSpinsMode) {
                    this.currentPaylineIndex = 100;
                    this.stopSpines();
                    setTimeout(() => {
                        // this.scene.game.events.emit('evtPaylinesShowingDone', Model.getLastWin());
                    }, 1000);
                }
                else {
                    this.currentPaylineIndex = 0;
                }
            }
            if (this.currentPaylineIndex < list.length) {
                let currentLine = list[this.currentPaylineIndex];
                SoundManager.WinPaylineSound();
                this.paylineIndexes.forEach((elem, index) => {
                    let isWinIndex = null;
                    let reelIndex = elem;
                    let symbolIndex = currentLine.points[elem] + 1;
                     isWinIndex = currentLine.winIndexes[elem] ;
                   
                    this.symbol = null;
                    this.symbol = this.reelsView.getSymbol(reelIndex, symbolIndex);
                    this.spineWinArray.push(this.symbol);
                    if(index == 0){
                        if (this.symbol.id == 'hero' || this.symbol.id == 'heroine' || this.symbol.id == 'villain') {
                            this.delay = 3100;
                            this.symbolType = 'high_symbol';
                        } else {
                            this.delay = 2000; 
                            this.symbolType = 'low_symbol';
                        }
                    }
                    
                    if(isWinIndex == null){
                        this.symbol.playWin(this.symbol.id, this.symbol.usualImg.x, this.symbol.usualImg.y,'static', this.symbolType );
                    }else{
                        this.symbol.playWin(this.symbol.id, this.symbol.usualImg.x, this.symbol.usualImg.y, 'animate', this.symbolType);
                    }
                    
                    if (this.currentPaylineIndex == list.length - 1) {

                        if (this.scene.bottomPanel.isAutoMode || this.scene.bottomPanel.isFreeSpinsMode) {
                            this.currentPaylineIndex = 100;
                        } else {
                            this.currentPaylineIndex = 0;
                            if (index == currentLine.winIndexes.length - 1) {
                                this.timedEvent = this.scene.time.addEvent({
                                    delay: this.delay,
                                    callback: () => {
                                        this.showNextPayline();
                                    }
                                });
                            }
                        }
                    } else {
                        if (index == currentLine.winIndexes.length - 1) {
                            this.timedEvent = this.scene.time.addEvent({
                                delay: this.delay,
                                callback: () => {
                                    this.showNextPayline();
                                }
                            });
                        }
                    }

                })
                this.currentPaylineIndex++;
            }


        } else {
            // this.scene.game.events.emit('evtPaylinesShowingDone', Model.getLastWin());
        }
    };
    CheckWinningStreaks() {
        if (Model.getLastWin() < 20 * Model.getBetPerLine() && Model.getLastWin() > 0) {
            this.scene.bottomPanel.SetLastWin(Model.getLastWin());
            this.scene.game.events.emit('evtPaylinesShowingDone', Model.getLastWin());
        }
        else if (Model.getLastWin() >= 5 * Model.getBetPerLine() && Model.getLastWin() < 100 * Model.getBetPerLine()) {
            this.scene.jackpotWin.ShowBigWin();
            this.scene.scorePopup.AnimateTweenText(Model.getLastWin());
        }
        else if (Model.getLastWin() >= 100 * Model.getBetPerLine() && Model.getLastWin() < 500 * Model.getBetPerLine()) {
            this.scene.jackpotWin.ShowSuperWin();
            this.scene.scorePopup.AnimateTweenText(Model.getLastWin());
        }
        else if (Model.getLastWin() >= 300 * Model.getBetPerLine()) {
            this.scene.jackpotWin.ShowMegaWin();
            this.scene.scorePopup.AnimateTweenText(Model.getLastWin());
        }
        else {
            this.scene.bottomPanel.SetLastWin(0);
            this.scene.game.events.emit('evtPaylinesShowingDone', Model.getLastWin());
        }
    }
}

export default Paylines;