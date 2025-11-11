import { Model } from "../Model.js";
import { SoundManager } from "../SoundManager.js";

class Paylines {
    constructor(scene, reelsView) {
        this.scene = scene;
        this.reelsView = reelsView;
        this.graphics = null;
        this.scale = 1;
        this.leftButtons = [];
        this.rightButtons = [];
        this.currentPaylineIndex = -1;
        this.data = {
            left: [4, 6, 2, 8, 1, 9, 3, 7, 5],
            right: [4, 6, 2, 8, 1, 9, 3, 7, 5]
        }
        this.isShowingDone = false;
        this.colors = [
            0x4ddd07,
            0x05e5f9,
            0xfab4f6,
            0xf4eb05,
            0xff1038,
            0xf105c1,
            0x0782fb,
            0xf8d004,
            0xaa4804,
        ];

        this.create();
        this.scene.constant.game.events.on("evtShowWonPaylines", this.onShowWonPaylines, this);
        this.scene.constant.game.events.on("evtSpinStartClearPayLine", this.onClearPaylines, this);
    };


    create() {
        this.graphics = this.scene.add.graphics();
    };

    CreateWonText(_x, _y, _text) {
        if (this.wonText != null && this.wonTextBg != null) {
            this.wonText.destroy();
            this.wonTextBg.destroy();
            this.wonTextBg = this.scene.add.image(_x, _y + 30, "line_plus_minus_glow").setOrigin(0.5).setScale(scaleFactor, scaleFactor);
            let wonTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '50px', fill: '#000', fontStyle: 'bold', align: 'center' };
            this.wonText = this.scene.add.text(_x, _y + 30, _text, wonTextStyle).setOrigin(0.5).setScale(scaleFactor, scaleFactor);
        } else {
            this.wonTextBg = this.scene.add.image(_x, _y + 30, "line_plus_minus_glow").setOrigin(0.5).setScale(scaleFactor, scaleFactor);
            let wonTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '50px', fill: '#000', fontStyle: 'bold', align: 'center' };
            this.wonText = this.scene.add.text(_x, _y + 30, _text, wonTextStyle).setOrigin(0.5).setScale(scaleFactor, scaleFactor);
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
        this.graphics.lineStyle(12 * scaleFactor, color, 1.0);
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
        //     SoundManager.ShowPaylineContinuouslySound();
        // }
        if (list.length == 1) {
            SoundManager.PlaySinglePayLineSound();
        } else if (list.length > 1) {
            SoundManager.ShowPaylineContinuouslySound();
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
            let currentLine = list[this.currentPaylineIndex];
            this.drawPayline(currentLine.index, currentLine.win);
            currentLine.winIndexes.forEach((elem) => {
                let reelIndex = elem;
                let symbolIndex = currentLine.points[reelIndex];
                let symbol = this.reelsView.getSymbol(reelIndex, symbolIndex);
                symbol.playWin();
            });
        } else {
            setTimeout(() => {
                console.log("Payline")
                this.scene.constant.game.events.emit("evtPaylinesShowingDone");
            }, 1000);

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