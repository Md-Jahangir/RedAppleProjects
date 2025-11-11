import { Model } from "../Model.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";

class Paylines {
    constructor(scene, reelsView) {
        this.scene = scene;
        this.reelsView = reelsView;
        this.graphics = null;
        this.scale = 1;
        this.leftButtons = [];
        this.rightButtons = [];
        this.currentPaylineIndex = -1;
        this.isShowingDone = false;

        this.data = {
            left: [4, 2, 24, 20, 16, 10, 1, 11, 17, 13, 21, 5, 3],
            right: [14, 18, 12, 9, 22, 6, 7, 23, 8, 19, 25, 15]
        }

        this.colors = [
            0xfbb8f7, //1
            0xec04a9, //2
            0x0992fc, //3
            0xf2e605, //4
            0xf9a8f4, //5
            0x46da07, //6
            0x087dfa, //7
            0x49dc07, //8
            0x05e2f9, //9
            0xc46204, //10
            0x066dfa, //11
            0xf9a5f3, //12
            0x3bd405, //13
            0xf2e605, //14
            0x066bfa, //15
            0x3bd405, //16
            0xff0f32, //17
            0xec04a9, //18
            0xa13f02, //19
            0xf8cf04, //20
            0xa14002, //21
            0xf7ce02, //22
            0xff0c30, //23
            0x04e0f7, //24
            0xfbc7f8, //25
        ];

        this.create();
        this.scene.game.events.on("evtShowWonPaylines", this.onShowWonPaylines, this);
        this.scene.game.events.on("evtSpinStartClearPayLine", this.onClearPaylines, this);
    };

    create() {
        this.graphics = this.scene.add.graphics();
    };

    CreateWonText(_x, _y, _text) {
        if (this.wonText != null && this.wonTextBg != null) {
            this.wonText.destroy();
            this.wonTextBg.destroy();
            this.wonTextBg = this.scene.add.image(_x, _y + 30, "line_plus_minus_glow").setOrigin(0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
            let wonTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '50px', fill: '#000', fontStyle: 'bold', align: 'center' };
            this.wonText = this.scene.add.text(_x, _y + 30, _text, wonTextStyle).setOrigin(0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        } else {
            this.wonTextBg = this.scene.add.image(_x, _y + 30, "line_plus_minus_glow").setOrigin(0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
            let wonTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '50px', fill: '#000', fontStyle: 'bold', align: 'center' };
            this.wonText = this.scene.add.text(_x, _y + 30, _text, wonTextStyle).setOrigin(0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        }

    }

    drawPayline(index, _winText) {
        let paylinesData = Model.getPaylines();
        let payline = paylinesData[index];
        let color = this.colors[index];
        let points = [];
        payline.points.forEach((symbolIndex, reelIndex) => {
            let pos = this.reelsView.getSymbolPosition(reelIndex, symbolIndex);
            points.push(pos);
        });
        this.graphics.clear();
        this.graphics.fillStyle(color, 1.0);
        this.graphics.lineStyle(12 * Constant.scaleFactor, color, 1.0);
        this.graphics.beginPath();
        this.graphics.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            this.graphics.lineTo(points[i].x, points[i].y);
        }
        this.graphics.strokePath();
        this.CreateWonText(points[0].x, points[0].y, _winText);
    };

    clearPaylines() {
        if (this.graphics != null && this.wonText != null && this.wonTextBg != null) {
            this.graphics.clear();
            this.wonText.destroy();
            this.wonTextBg.destroy();
        }
    };

    onClearPaylines() {
        SoundManager.StopPaylineContinuouslySound();
        this.isShowingDone = false;
        this.clearPaylines();
        if (this.showPayLineTimerEvt != null) {
            this.showPayLineTimerEvt.remove();
        }
    }

    onShowWonPaylines() {
        this.currentPaylineIndex = -1;
        this.showNextPayline();

        let list = Model.getWonPaylines();
        // if (list.length > 0) {
        //     SoundManager.WinPaylineSound();
        // } 
        // let listOfFreeSpins = Model.getFreeSpinsData();
        // if (listOfFreeSpins.length > 0) {
        //     // this.DisableStopButton();
        // } else {
        //     if (list.length == 1) {
        //         SoundManager.WinPaylineSound();
        //     } else if (list.length > 1) {
        //         SoundManager.WinMultiplePaylinesSound();
        //     }
        // }
        if (list.length == 1) {
            SoundManager.WinPaylineSound();
        } else if (list.length > 1) {
            SoundManager.WinMultiplePaylinesSound();
        }
    };
    showNextPayline() {
        let list = Model.getWonPaylines();
        if (this.showPayLineTimerEvt != null) {
            this.showPayLineTimerEvt.remove();
        }
        if (this.currentPaylineIndex > list.length) {
            this.currentPaylineIndex = -1;
        }

        this.currentPaylineIndex++;

        if (this.currentPaylineIndex < list.length) {
            SoundManager.ShowPaylineContinuouslySound();
            let currentLine = list[this.currentPaylineIndex];
            let winAmount = parseFloat(currentLine.win).toFixed(2);
            this.drawPayline(currentLine.index, winAmount);
            // console.log("currentLine: ", currentLine);
            currentLine.winIndexes.forEach((elem) => {
                let reelIndex = elem;
                let symbolIndex = currentLine.points[reelIndex];
                let symbol = this.reelsView.getSymbol(reelIndex, symbolIndex);
                // console.log("symbol: ", symbol)
                symbol.playWin();
            });

        } else {
            if (!this.isShowingDone) {
                this.isShowingDone = true;
                setTimeout(() => {
                    this.scene.game.events.emit("evtPaylinesShowingDone");
                }, 1000);
            }

        }
        if (list.length > 0) {
            // this.showPayLineTimerEvt = this.scene.time.addEvent({ delay: 2000, callback: this.showNextPayline, callbackScope: this });
            this.showPayLineTimerEvt = this.scene.time.addEvent({ delay: 1000, callback: this.showNextPayline, callbackScope: this });
        } else {
            if (this.showPayLineTimerEvt != null) {
                this.showPayLineTimerEvt.remove();
            }
        }

    };

}

export default Paylines;