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
            left: [4, 8, 13, 16, 2, 15, 22, 21, 18, 24, 10, 6, 1, 7, 11, 25, 19, 20, 23, 14, 3, 17, 12, 9, 5],
            right: [26, 29, 31, 38, 40, 42, 44, 49, 46, 36, 34, 33, 50, 32, 35, 37, 47, 48, 45, 43, 41, 39, 30, 28, 27]
        }

        this.colors = [
            0xff0000, //1
            0xe60041, //2
            0xcf0074, //3
            0xaa00a9, //4
            0x7200ad, //5
            0x5200b0, //6
            0x3900b2, //7
            0x1906b6, //8
            0x0a3cad, //9
            0x015ea6, //10
            0x00999a, //11
            0x00b064, //12
            0x00ce00, //13
            0x61e500, //14
            0x9df000, //15
            0xcbf800, //16
            0xffff00, //17
            0xffea00, //18
            0xffd500, //19
            0xffbf00, //20
            0xff9300, //21
            0xff7300, //22
            0xff4700, //23
            0xfe00f0, //24
            0x059ee6, //25
            0xff0000, //26
            0xe60041, //27
            0xcf0074, //28
            0xaa00a9, //29
            0x7200ad, //30
            0x5200b0, //31
            0x3900b2, //32
            0x1906b6, //33
            0x0a3cad, //34
            0x015ea6, //35
            0x00999a, //36
            0x00b064, //37
            0x00ce00, //38
            0x61e500, //39
            0x9df000, //40
            0xcbf800, //41
            0xffff00, //42
            0xffea00, //43
            0xffd500, //44
            0xffbf00, //45
            0xff9300, //46
            0xff7300, //47
            0xff4700, //48
            0xfe00f0, //49
            0x059ee6 //50
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
        this.graphics.depth = 2;
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
        this.showNextPayline()

        let list = Model.getWonPaylines();
        if (list.length > 0) {
            SoundManager.WinPaylineSound();
            // SoundManager.ShowPaylineContinuouslySound();
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

            currentLine.winIndexes.forEach((elem) => {
                let reelIndex = elem;
                let symbolIndex = currentLine.points[reelIndex];
                let symbol = this.reelsView.getSymbol(reelIndex, symbolIndex);
                symbol.playWin();
            });
        } else {
            // setTimeout(() => {
            //     this.scene.game.events.emit("evtPaylinesShowingDone");
            // }, 1000);
            if (!this.isShowingDone) {
                this.isShowingDone = true;
                setTimeout(() => {
                    this.scene.game.events.emit("evtPaylinesShowingDone");
                }, 1000);
            }
        }
        if (list.length > 0) {
            this.showPayLineTimerEvt = this.scene.time.addEvent({ delay: 1000, callback: this.showNextPayline, callbackScope: this });
        } else {
            if (this.showPayLineTimerEvt != null) {
                this.showPayLineTimerEvt.remove();
            }
        }
    };

}

export default Paylines;