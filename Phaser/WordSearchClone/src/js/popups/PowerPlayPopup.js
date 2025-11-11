import { Constant } from "../Constant";
import { Align } from "../util/align";
import { Base } from "../util/base";

class PowerPlayPopup {
    constructor(scene) {
        this.scene = scene;
        this.powerPlayNotifConatiner = null;
        this.powerPlayContainer = null;
        this.powerPlayTimeLeft = 30;
        this.powerPlayCountdown = 5;
        this.posX = this.scene.grid.GetGridTableX();
        this.posY = this.scene.grid.GetGridTableY();
        this.gridWidth = this.scene.grid.GetGridCurrentWidth();
        this.gridHeight = this.scene.grid.GetGridCurrentHeight();
        this.CreatePowerPlayStartNotifPopup();
        this.create();
        // this.PowerPlayTimer();
    }
    CreatePowerPlayStartNotifPopup() {
        this.powerPlayNotifConatiner = this.scene.add.container(0, 0).setScale(Constant.scaleFactor).setVisible(false).setDepth(3);

        let bg = Base.placeImage(this.scene, 'instruction_popup', false, { _oX: 0.5, _oY: 0.5 }, Constant.game.config.width / 2, 100);
        bg.setDisplaySize(500, 150);
        // this.scene.aGGrid.placeAtIndex(37, bg);
        let textStr = this.powerPlayCountdown;
        let textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 40, color: '#fd7673', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };

        let timeText = Base.placeText(this.scene, textStr, { x: Constant.game.config.width / 2, y: 100 }, textStyle).setScale(Constant.scaleFactor);
        // this.scene.aGGrid.placeAtIndex(51.9, timeText);
        this.countDownTime = this.scene.time.addEvent({
            delay: 1000,
            callback: this.SetTimer,
            callbackScope: this,
            repeat: -1,
            paused: true,
        }, this);

        textStr = 'PowerPlay Starts in.....';
        textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 40, color: '#fff', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };
        let powerPlayStartNotifTxt = Base.placeText(this.scene, textStr, { x: Constant.game.config.width / 2, y: 60 }, textStyle);
        powerPlayStartNotifTxt.setOrigin(0.5);
        // console.info("this gamescene-------->", this.scene.aGGrid)
        // this.scene.aGGrid.placeAtIndex(20.9, powerPlayStartNotifTxt);
        this.powerPlayNotifConatiner.add([bg, timeText, powerPlayStartNotifTxt]);
    }
    create() {
        let textStr = '';
        let textStyle = {
            fontFamily: 'FredokaOne-Regular', fontSize: 80, color: '#ffffff',
        };
        this.ppToastTxt = Base.placeText(this.scene, textStr, { x: Constant.game.config.width / 2, y: Constant.game.config.height / 2 }, textStyle).setOrigin(0.2, 0.2).setScale(Constant.scaleFactor).setVisible(false);

        this.bg = Base.placeImage(this.scene, 'instruction_popup', true, { _oX: 0.5, _oY: 0.5 }, Constant.game.config.width / 2, 100);
        this.bg.setDisplaySize(500, 150).setDepth(3);
        this.bg.setVisible(false);

        this.powerPlayContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactor).setVisible(false).setDepth(3);
        textStr = 'Power Play';
        textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 40, color: '#fff', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };
        let tHead = Base.placeText(this.scene, textStr, { x: 0, y: 0 }, textStyle);
        // this.scene.aGrid.placeAtIndex(4.5, tHead);
        tHead.setPosition(Constant.game.config.width / 2, 60).setOrigin(0.5);

        this.powerPlayTimeText = this.scene.add.text(Constant.game.config.width / 2, 110, 'TimeLeft: ' + this.FormatTime(this.powerPlayTimeLeft), { fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 40, color: '#fff', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true } }).setOrigin(0.5);

        this.powerPlayContainer.add([this.bg, tHead, this.powerPlayTimeText]);


    }
    SetTimer() {
        if (this.powerPlayCountdown > 1) {
            this.powerPlayCountdown--;
            this.powerPlayNotifConatiner.list[1].setText(this.powerPlayCountdown);
        } else if (this.powerPlayCountdown == 1) {
            this.powerPlayNotifConatiner.list[1].setText("GO");
            this.countDownTime.paused = true;
        }
        if (this.powerPlayNotifConatiner.list[1].text == "GO") {
            setTimeout(() => {
                // this.gameTime.reset();
                this.HidePowerPlayNotifPopup();
                this.ShowPowerPlayPopup();
                this.PowerPlayTimer();
                this.Graphics();
            }, 500);

        }
    }
    ShowPowerPlayNotifPopup() {
        this.powerPlayNotifConatiner.setVisible(true);
        this.countDownTime.paused = false;
    }
    HidePowerPlayNotifPopup() {
        this.powerPlayNotifConatiner.setVisible(false);
    }
    ShowPowerPlayPopup() {
        // console.info("Power Play on");
        Constant.isPowerPlay = true;
        this.bg.setVisible(true);
        this.powerPlayContainer.setVisible(true);
    }
    HidePowerPlayPopup() {
        // console.info("Power Play off");
        this.powerPlayContainer.setVisible(false);
    }
    PowerPlayTimer() {
        this.powerPlayTime = this.scene.time.addEvent({
            delay: 1000,
            paused: false,
            callback: () => {
                this.UpadteTimer();
            },
            callbackScope: this.scene,
            loop: true,
        }, this.scene);
    }
    StartTimer() {
        this.powerPlayTime.start();
    }
    UpadteTimer() {
        if (this.powerPlayTimeLeft > 0) {
            this.powerPlayTimeLeft--;
            this.powerPlayTimeText.setText('TimeLeft: ' + this.FormatTime(this.powerPlayTimeLeft));
        }
        else {
            this.HidePowerPlayPopup();
            Constant.isPowerPlay = false;
            this.scene.gameTime.paused = false;
        }
    }
    FormatTime(seconds) {
        // Minutes
        let partInMinutes = Constant.round(seconds / 60);
        // Seconds
        let partInSeconds = seconds % 60;
        // Adds left zeros to minutes
        partInMinutes = partInMinutes.toString().padStart(2, '0');
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        // Returns formated time
        return `${partInMinutes}:${partInSeconds}`;
    }
    PowerToast(_bonusScore, _x, _y) {
        // console.log("bonus score:........... ", _bonusScore)
        this.ppToastTxt.setPosition(_x, _y);
        this.ppToastTxt.setVisible(true);
        this.ppToastTxt.setText('+' + _bonusScore);

        let toastTween = this.scene.tweens.add({

            targets: this.ppToastTxt,
            // x: Constant.game.config.width / 2,
            y: - Constant.game.config.width / 1,
            alpha: 1,
            duration: 2000,
            depth: 50,
            onComplete: () => {
                this.ppToastTxt.setPosition(Constant.game.config.width / 2, Constant.game.config.height / 2);
                this.ppToastTxt.setVisible(false);
            }
        });
        // toastTween.setDepth(50);
    }
    Graphics() {
        this.radius = this.gridWidth;
        //graphics
        this.graphics = this.scene.add.graphics();
        this.graphics.fillStyle(0xffff00, 1);
        this.graphics.fillRect(this.posX, this.posY, this.gridWidth * 1.2, this.gridHeight * 1.2);
        this.graphics.fillStyle(0xff00ff, 1);
        //mask
        this.maskRect = this.scene.add.rectangle(this.posX, this.posY, this.gridWidth + 100, this.gridHeight + 80, { tl: 10, tr: 10, bl: 10, br: 10 }, 0x000000).setVisible(false);
        // this.maskRect = new RoundRectangleCanvas(this.posX, this.posY, this.gridWidth + 100, this.gridHeight + 80, { tl: 10, tr: 10, bl: 10, br: 10 }, 0x000000);
        this.mask = this.maskRect.createGeometryMask();
        this.graphics.setMask(this.mask);
        //tween
        this.graphicsTween = null;
        this.graphicsTween = this.scene.tweens.addCounter({
            from: 0.625,
            to: -0.375,
            duration: 30000,
            onUpdate: (tween) => {
                const t = tween.getValue();
                this.graphics.clear();
                this.graphics.fillStyle(0xffff00, 2);
                this.graphics.slice(this.posX, this.posY, this.radius, Phaser.Math.DegToRad(360 * t), Phaser.Math.DegToRad(-135), true);
                this.graphics.setAlpha(1);
                this.graphics.fillPath();
            }
        })
    }

}

export default PowerPlayPopup;