import { Utils } from "../Utils.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";
import { Server } from "../Server.js";
// import DrawClass from "./class/DrawClass.js";
// import DrawHistory from "./class/DrawHistory.js";
// import DrawNumberHits from "./class/DrawNumberHits.js";


 class PreviousDraw  {

    constructor(scene) {
        // super("PreviosDrawScene");
        this.scene = scene ;
        this.howManyNumbers = 80;
        this.numberImageNumberArray = [];
        this.numberImageArray = [];
        this.timerEvent = null;
        this.startTime = 65;

        this.message = "PICK 1 TO 10 NUMBERS\n20 BALLS DRAWN\nFROM 80";
        this.nextDrawNumber = "78564"
        // this.timerText = null;
        this.blinkNumberArray = [];//for testing
        this.previousDrawnNumberArray = [];
    }

    init() {
        // console.log("start prev draw scn: ");
        // this.drawClass = new DrawClass(this);
        // this.drawHistory = new DrawHistory(this);
        // this.drawNumberHits = new DrawNumberHits(this);
    }
    preload() { }

    create() {
        this.GetPreviousDataFromServer();
        this.CreateBackground();
        this.CreateBase();
        this.CreateTimerBaseAndText();
        this.CreateDrawText();
        this.CreateMessageText();
        this.CreateNumberAndValue();
        this.CreateSoundOnOffButton();
        this.CreateFullScreenButton();
        this.SetDrawNumber(this.nextDrawNumber);
        this.SetMessage(this.message);
        this.HidePreviousDrawObjects();


    }
    async GetPreviousDataFromServer() {
        this.blinkNumberArray = [];
        try {
            let previousData = await Server.GetPreviousDrawData();
            if (previousData.error) {
                console.log("API call failed with error:", previousData.error);
            } else {
                let getPreviousNumberArray = previousData.last_draw.numbers_drawn.split(',').map(Number);
                for (let i = 0; i < getPreviousNumberArray.length; i++) {
                    this.blinkNumberArray.push(getPreviousNumberArray[i]);
                }
                this.SetPreviousDrawnNumber(this.blinkNumberArray);
                this.SetDrawNumber(previousData.last_draw.draw_id);
            }
        } catch (error) {
            console.log("API call failed with error:", error);
        }
    }
   
    CreateBackground() {
        this.bg = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "background").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    }

    CreateBase() {
        this.mainBase = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "main_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.leftBase = this.scene.add.image(this.mainBase.x - (518 * Constant.scaleFactor), this.mainBase.y, "left_number_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.rightBase = this.scene.add.image(this.mainBase.x + (418 * Constant.scaleFactor), this.mainBase.y, "right_message_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);


        // let pickTextStyle = { fontFamily: 'Roboto_Medium', fontSize: '42px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        // let numericTextStyle = { fontFamily: 'Roboto_Medium', fontSize: '43px', fill: '#ffdd00', fontStyle: 'normal', align: 'left' };
        // let pickText = this.scene.add.text(this.rightBase.x - (230 * Constant.scaleFactor), this.rightBase.y, "PICK", pickTextStyle).setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // let oneNumber = this.scene.add.text(pickText.x + (106 * Constant.scaleFactor), pickText.y, "1", numericTextStyle).setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // let toText = this.scene.add.text(oneNumber.x + (35 * Constant.scaleFactor), oneNumber.y, "TO", pickTextStyle).setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // let tenNumber = this.scene.add.text(toText.x + (65 * Constant.scaleFactor), toText.y, "10", numericTextStyle).setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // let numberText = this.scene.add.text(tenNumber.x + (65 * Constant.scaleFactor), tenNumber.y, "NUMBERS", pickTextStyle).setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);

        // let twentyNumber = this.scene.add.text(this.rightBase.x - (200 * Constant.scaleFactor), pickText.y + (80 * Constant.scaleFactor), "20", numericTextStyle).setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // let ballsText = this.scene.add.text(twentyNumber.x + (60 * Constant.scaleFactor), twentyNumber.y, "BALLS", pickTextStyle).setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // let drawnText = this.scene.add.text(ballsText.x + (140 * Constant.scaleFactor), ballsText.y, "DRAWN", pickTextStyle).setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // let fromText = this.scene.add.text(this.rightBase.x - (60 * Constant.scaleFactor), twentyNumber.y + (70 * Constant.scaleFactor), "FROM", pickTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // let eightyNumber = this.scene.add.text(fromText.x + (70 * Constant.scaleFactor), fromText.y, "80", numericTextStyle).setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);


    };

    CreateDrawText() {
        let drawHeadingTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '35px', fill: '#fff', fontStyle: 'bold', align: 'left' };
        this.drawHeadingText = this.scene.add.text(this.timerText.x - (55 * Constant.scaleFactor), this.timerText.y - (60 * Constant.scaleFactor), "DRAW", drawHeadingTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);

        let drawNumberTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '35px', fill: '#ffdd00', fontStyle: 'bold', align: 'left' };
        this.drawNumberText = this.scene.add.text(this.drawHeadingText.x + (60 * Constant.scaleFactor), this.drawHeadingText.y, "", drawNumberTextStyle).setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    };
    SetDrawNumber(_number) {
        this.drawNumberText.setText(_number);
    };

    CreateMessageText() {
        let messageTextStyle = { fontFamily: 'Roboto_Medium', fontSize: '42px', fill: '#fff', fontStyle: 'normal', align: 'center', lineSpacing: 20, wordWrap: { width: Math.round(this.rightBase.width - 170) } };
        this.messageText = this.scene.add.text(this.rightBase.x, this.rightBase.y + (90 * Constant.scaleFactor), "", messageTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    };
    SetMessage(_message) {
        this.messageText.setText(_message);
    };

    SetPreviousDrawnNumber(_data) {
        this.previousDrawnNumberArray = _data;
        for (let i = 0; i < this.previousDrawnNumberArray.length; i++) {
            this.BlinkNumberAnimation(this.numberImageArray[this.blinkNumberArray[i] - 1], this.numberImageNumberArray[this.blinkNumberArray[i] - 1]);
        }
    };


    CreateTimerBaseAndText() {
        this.timerBase = this.scene.add.image(this.rightBase.x, this.mainBase.y - (155 * Constant.scaleFactor), "right_timer_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);

        let timerTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '85px', fill: '#ffdd00', fontStyle: 'bold', align: 'center' };
        this.timerText = this.scene.add.text(this.timerBase.x, this.timerBase.y + (25 * Constant.scaleFactor), "00:00", timerTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    };
     CreateTimer(_timeData) {
        if(this.timerText != undefined){
            let _timerValue = _timeData.counter;
            this.timerText.setText(_timerValue)
            
        }
      
    };
    UpdateTime() {
        if (this.startTime > 0) {
            this.startTime--;
            let minutes = Math.floor(this.startTime / 60);
            let seconds = this.startTime % 60;
            if (minutes < 10) {
                minutes = `0${minutes}`;
            }
            if (seconds < 10) {
                seconds = `0${seconds}`;
            }
            this.timerText.setText(`${minutes}:${seconds}`);
        } else {
            this.timerEvent.remove();
            setTimeout(() => {
                Constant.game.scene.stop('PreviousDrawScene');
                // this.scene.start("DrawScene");
                this.drawClass.create()
            }, 500);
        }
    };

    CreateNumberAndValue() {
        let startXPos = this.leftBase.x - (350 * Constant.scaleFactor);
        let startYPos = this.leftBase.y - (253 * Constant.scaleFactor);
        let gapX = 78;
        let gapY = 70;
        let col = 8;
        let row = 10;
        let counter = 1;
        let imageName = "";
        for (let i = 0; i < col; i++) {
            for (let j = 0; j < row; j++) {
                if (counter > 40) {
                    imageName = "ball_base_type_2";
                } else {
                    imageName = "ball_base_type_1";
                }
                let xPos = startXPos + (j * gapX);
                let yPos = startYPos + (i * gapY);
                let ballImg = this.scene.add.image(xPos, yPos, imageName).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
                let numberTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '18px', fill: '#000', fontStyle: 'normal', align: 'center' };
                let numberText = this.scene.add.text(xPos, yPos, counter, numberTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
                counter++;
                this.numberImageArray.push(ballImg);
                this.numberImageNumberArray.push(numberText);
            }
        }
        console.log("this.NumberImageArray: ", this.numberImageArray);
        console.log("this.NumberImageNumberArray: ", this.numberImageNumberArray);
    };

    BlinkNumberAnimation(_obj1, _obj2) {
        this.blinkTween = this.scene.tweens.add({
            targets: [_obj1, _obj2],
            scaleX: Constant.scaleFactor * 1.4,
            scaleY: Constant.scaleFactor * 1.4,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
    }

    CreateSoundOnOffButton() {
        this.soundOnOffButton = this.scene.add.sprite(this.rightBase.x + (270 * Constant.scaleFactor), this.rightBase.y + (190 * Constant.scaleFactor), "sound_on_off_button").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // console.log("this.soundOnOffButton: ", this.soundOnOffButton);
        this.soundOnOffButton.setInteractive({ useHandCursor: true });
        this.soundOnOffButton.on("pointerdown", this.SoundButtonPressed, this);
        this.soundOnOffButton.on("pointerup", this.SoundButtonReleased, this);
    };

    SoundButtonPressed() {
        Utils.ButtonScaleTween(this, this.soundOnOffButton, Constant.scaleFactor);
    }
    SoundButtonReleased() {
        this.ToggleSoundButton();
    }

    ToggleSoundButton() {
        if (this.soundOnOffButton.frame.name == 0) {
            this.soundOnOffButton.setFrame(1)
        } else {
            this.soundOnOffButton.setFrame(0)
        }
        // if (localStorage.getItem("keno_game_animation_is_sound_on") == 1) {
        //     localStorage.setItem("keno_game_animation_is_sound_on", 0);
        //     this.soundOnOffButton.setFrame(1)
        //     // SoundManager.PlayButtonClickSound();
        //     // SoundManager.StopBgMusic();
        // } else {
        //     localStorage.setItem("keno_game_animation_is_sound_on", 1);
        //     this.soundOnOffButton.setFrame(0)
        //     // SoundManager.PlayBgMusic();
        // }
    }

    CreateFullScreenButton() {

        this.fullScreenButton = this.scene.add.sprite(this.rightBase.x + (330 * Constant.scaleFactor), this.rightBase.y + (190 * Constant.scaleFactor), "full_screen_button").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // console.log("this.fullScreenButton: ", this.fullScreenButton);
        this.fullScreenButton.setInteractive({ useHandCursor: true });
        this.fullScreenButton.on("pointerdown", this.FullScreenButtonPressed, this);
        this.fullScreenButton.on("pointerup", this.FullScreenButtonReleased, this);
    }
    FullScreenButtonPressed() {
        Utils.ButtonScaleTween(this, this.fullScreenButton, Constant.scaleFactor);
    }
    FullScreenButtonReleased() {
        this.ToggleFullScreenButton();
    }

    ToggleFullScreenButton() {
        if (this.fullScreenButton.frame.name == 0) {
            this.fullScreenButton.setFrame(1)
        } else {
            this.fullScreenButton.setFrame(0)
        }
    }
    CurrentDrawCompleted(){
    //    this.drawHistory.create();
    }
    DrawHistoryCompleted(){
        // this.drawNumberHits.create();
    }
     DrawCompleted(){
    //    this.scene.start('PreviousDrawScene')
     }
    HidePreviousDrawObjects(){
        this.bg.setVisible(false);
        this.mainBase.setVisible(false)
        this.leftBase.setVisible(false)
        this.rightBase.setVisible(false)
        this.drawHeadingText.setVisible(false)
        this.drawNumberText.setVisible(false)
        this.messageText.setVisible(false)
        this.timerBase.setVisible(false)
        this.timerText.setVisible(false);
        this.numberImageArray.forEach(element => {
            element.setVisible(false);
        });
        this.numberImageNumberArray.forEach(element => {
            element.setVisible(false);
        });
        this.soundOnOffButton.setVisible(false);
        this.fullScreenButton.setVisible(false);
    }

    ShowPreviousDrawObjects(){
        this.bg.setVisible(true);
        this.mainBase.setVisible(true)
        this.leftBase.setVisible(true)
        this.rightBase.setVisible(true)
        this.drawHeadingText.setVisible(true)
        this.drawNumberText.setVisible(true)
        this.messageText.setVisible(true)
        this.timerBase.setVisible(true)
        this.timerText.setVisible(true);
        this.numberImageArray.forEach(element => {
            element.setVisible(true);
        });
        this.numberImageNumberArray.forEach(element => {
            element.setVisible(true);
        });
        this.soundOnOffButton.setVisible(true);
        this.fullScreenButton.setVisible(true);
    }
    update(t, dt) {

    }

}
export default PreviousDraw;