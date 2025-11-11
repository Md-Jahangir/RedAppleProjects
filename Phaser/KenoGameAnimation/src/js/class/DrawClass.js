import { Utils } from "../Utils.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";
import { Server } from "../Server.js";

class DrawClass {

    constructor(scene) {
        this.scene = scene;
        this.howManyNumbers = 80;
        this.numberImageNumberArray = [];
        this.numberImageArray = [];
        this.timerEvent = null;
        this.startTime = 65;

        this.message = "PICK 2 TO 10 NUMBERS\n20 BALLS DRAWN\nFROM 80";
        // this.nextDrawNumber = null;
        this.blinkNumberArray = [];
        this.previousDrawnNumberArray = [];

        this.totalDrawCounter = 0;
        this.currentDrawCounter = 0;
        this.randomNumber;
        this.usedNumbers;
        this.blinkTweenArray = [];
    }

    init() {
    }
    preload() { }

    create() {
        this.CreateBackground();
        this.CreateBase();

        this.CreateTotalAndCurrentDrawText();
        this.CreateNumberAndValue();

        this.CreateSoundOnOffButton();
        this.CreateFullScreenButton();
        this.CreateDrawText();
        this.CreatePipe();
        this.HideDrawClassObjects();

    }
    GetCurrentDrawDataFromServer(_currentDrawData) {
        if (_currentDrawData != undefined) {
            this.nextDrawId = _currentDrawData.draw_id;
            this.nextDrawNumber = _currentDrawData.number;
            this.StartTheBallToMove(this.nextDrawNumber);
            this.SetDrawNumber(this.nextDrawId);
        }

    }
    CreateBackground() {
        this.bg = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "background").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    };

    CreateBase() {
        this.mainBase = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "main_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.leftBase = this.scene.add.image(this.mainBase.x - (518 * Constant.scaleFactor), this.mainBase.y, "left_number_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    };

    CreateTotalAndCurrentDrawText() {
        let currentDrawTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '28px', fill: '#ffdd00', fontStyle: 'bold', align: 'right' };
        this.currentDrawText = this.scene.add.text(this.mainBase.x + (460 * Constant.scaleFactor), this.mainBase.y - (170 * Constant.scaleFactor), "0", currentDrawTextStyle).setOrigin(1, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let totalDrawTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '28px', fill: '#fff', fontStyle: 'bold', align: 'left' };
        this.totalDrawText = this.scene.add.text(this.currentDrawText.x + (23 * Constant.scaleFactor), this.currentDrawText.y, "/20", totalDrawTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    };

    SetCurrentDraw(_number) {
        this.currentDrawText.setText(_number);
    };

    CreateDrawText() {
        let drawHeadingTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '28px', fill: '#fff', fontStyle: 'bold', align: 'left' };
        this.drawHeadingText = this.scene.add.text(this.mainBase.x + (45 * Constant.scaleFactor), this.mainBase.y - (290 * Constant.scaleFactor), "DRAW", drawHeadingTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);

        let drawNumberTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '28px', fill: '#ffdd00', fontStyle: 'bold', align: 'left' };
        this.drawNumberText = this.scene.add.text(this.drawHeadingText.x + (45 * Constant.scaleFactor), this.drawHeadingText.y, "", drawNumberTextStyle).setOrigin(0, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    };
    SetDrawNumber(_number) {
        this.drawNumberText.setText(_number);
    };

    SetPreviousDrawnNumber(_data) {
        this.previousDrawnNumberArray = _data;
        for (let i = 0; i < this.previousDrawnNumberArray.length; i++) {
            this.BlinkNumberAnimation(this.numberImageArray[this.blinkNumberArray[i]], this.numberImageNumberArray[this.blinkNumberArray[i]]);
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
        // let selectedImageName = "";
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
            scaleX: Constant.scaleFactor * 1.5,
            scaleY: Constant.scaleFactor * 1.5,
            duration: 500,
            yoyo: true,
            y: _obj1.y,
            repeat: -1,
        });
        this.blinkTweenArray.push(this.blinkTween);
    }

    CreatePipe() {
        this.CreateBallForMove();
        this.pipeBase = this.scene.add.sprite(this.mainBase.x + (300 * Constant.scaleFactor), this.mainBase.y, "pipe").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.pipeBase.depth = 1;
        // this.pipeBase = this.scene.add.sprite(this.mainBase.x + (300 * Constant.scaleFactor), this.mainBase.y, "pipe_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.topPipe = this.scene.add.sprite(this.pipeBase.x + (1 * Constant.scaleFactor), this.mainBase.y - (230 * Constant.scaleFactor), "top_pipe").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.topPipe.depth = 2;
        this.bottomPipe = this.scene.add.sprite(this.pipeBase.x + (1 * Constant.scaleFactor), this.mainBase.y + (208 * Constant.scaleFactor), "bottom_pipe").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.bottomPipe.depth = 2;

        this.pipeGlass = this.scene.add.sprite(this.pipeBase.x, this.pipeBase.y, "pipe_glass").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.pipeGlass.depth = 3;


    };

    CreateBallForMove() {
        // this.pipeBall = this.scene.add.image(this.mainBase.x + (300 * Constant.scaleFactor), this.mainBase.y - (260 * Constant.scaleFactor), "pipe_ball").setOrigin(0.5, 0.5).setScale(0, 0);
        // this.pipeBall = this.scene.add.image(this.mainBase.x + (300 * Constant.scaleFactor), this.mainBase.y - (8 * Constant.scaleFactor), "pipe_ball").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.pipeBall = this.scene.add.image(this.mainBase.x + (300 * Constant.scaleFactor), this.mainBase.y + (250 * Constant.scaleFactor), "pipe_ball").setOrigin(0.5, 0.5).setScale(0, 0);
        this.pipeBall.depth = 2;
        let ballNumberTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '95px', fill: '#000', fontStyle: 'bold', align: 'center' };
        // this.pipeBallNumberText = this.scene.add.text(this.pipeBall.x, this.pipeBall.y, "10", ballNumberTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.pipeBallNumberText = this.scene.add.text(this.pipeBall.x, this.pipeBall.y, "", ballNumberTextStyle).setOrigin(0.5, 0.5).setScale(0, 0);
        this.pipeBallNumberText.depth = 2;

        // this.StartTheBallToMove();
    };

    GetRandomNumber() {
        this.usedNumbers = [];
        let max = 80;
        let min = 1;
        const range = max - min + 1;
        if (this.usedNumbers.length >= range) {
            throw new Error('All possible numbers have been used.');
        }
        do {
            this.randomNumber = Math.floor(Math.random() * range) + min;
        } while (this.usedNumbers.includes(this.randomNumber));
        this.usedNumbers.push(this.randomNumber);
        return this.randomNumber;
    }

    ResetUsedNumbers() {
        this.usedNumbers.length = 0;
    }
    StartTheBallToMove(_nextDrawNumber) {
        this.MoveTheBallFromDownToMiddle(_nextDrawNumber);
        this.currentDrawCounter += 1;
        this.SetCurrentDraw(this.currentDrawCounter);
    }
    StartDraw() {
        this.currentDrawCounter = 0;
        this.pipeBase.depth = 0;
        this.pipeGlass.depth = 0;
    }
    StartDrawHistorypage() {
        this.pipeBase.depth = 0;
        this.pipeGlass.depth = 0;
    }
    StopAllBlinkTween() {
        for (let i = 0; i < this.blinkTweenArray.length; i++) {
            this.blinkTweenArray[i].stop();
            this.blinkTweenArray[i].targets[0]._scaleX = Constant.scaleFactor;
            this.blinkTweenArray[i].targets[0]._scaleY = Constant.scaleFactor;
            this.blinkTweenArray[i].targets[1]._scaleX = Constant.scaleFactor;
            this.blinkTweenArray[i].targets[1]._scaleY = Constant.scaleFactor;
        }

    }
    MoveTheBallFromDownToMiddle(_number) {
        // console.log('MoveThebAll')
        this.pipeBallNumberText.setText(_number);
        this.pipeBall.setPosition(this.mainBase.x + (300 * Constant.scaleFactor), this.mainBase.y + (380 * Constant.scaleFactor));
        this.pipeBallNumberText.setPosition(this.pipeBall.x, this.pipeBall.y);
        this.pipeBall.setAlpha(0);
        this.pipeBallNumberText.setAlpha(0);

        this.pos1Tween = this.scene.tweens.add({
            targets: [this.pipeBall, this.pipeBallNumberText],
            scaleX: Constant.scaleFactor * 0.92,
            scaleY: Constant.scaleFactor * 0.92,
            alpha: 1,
            angle: -15,
            x: this.mainBase.x + (300 * Constant.scaleFactor),
            y: this.mainBase.y + (5 * Constant.scaleFactor),
            duration: 600,
            callbackScope: this,
            onComplete: this.TweenInMiddle
        });

    };
    TweenInMiddle() {
        this.pipeBall.setPosition(this.mainBase.x + (300 * Constant.scaleFactor), this.mainBase.y + (5 * Constant.scaleFactor));
        this.pipeBallNumberText.setPosition(this.pipeBall.x, this.pipeBall.y);
        let tween = this.scene.tweens.add({
            targets: [this.pipeBall, this.pipeBallNumberText],
            // delay: 50,
            angle: 10,
            yoyo: true,
            repeat: 0,
            ease: 'Linear',
            x: this.mainBase.x + (300 * Constant.scaleFactor),
            y: this.mainBase.y + (15 * Constant.scaleFactor),
            duration: 400,
            callbackScope: this,
            onComplete: this.AnimationInMiddle
        })

    };
    AnimationInMiddle() {
        this.pipeBall.setPosition(this.mainBase.x + (300 * Constant.scaleFactor), this.mainBase.y + (5 * Constant.scaleFactor));
        this.pipeBallNumberText.setPosition(this.pipeBall.x, this.pipeBall.y);
        let tween = this.scene.tweens.add({
            targets: [this.pipeBall, this.pipeBallNumberText],
            angle: 0,
            yoyo: true,
            repeat: 0,
            ease: 'Linear',
            x: this.mainBase.x + (305 * Constant.scaleFactor),
            // y : this.mainBase.y + (20 * Constant.scaleFactor),
            duration: 400,
            callbackScope: this,
            onComplete: this.MoveTheBallFromMiddleToTop()
        })

    };

    MoveTheBallFromMiddleToTop() {
        // console.log('MoveTheBallFromMiddleToTop')
        this.pipeBall.setPosition(this.mainBase.x + (300 * Constant.scaleFactor), this.mainBase.y + (5 * Constant.scaleFactor));
        this.pipeBallNumberText.setPosition(this.pipeBall.x, this.pipeBall.y);
        this.pos1Tween = this.scene.tweens.add({
            targets: [this.pipeBall, this.pipeBallNumberText],
            delay: 400,
            scaleX: 0,
            scaleY: 0,
            alpha: 0,
            // ease :"Back.in",
            y: this.mainBase.y - (390 * Constant.scaleFactor),
            duration: 400,
            callbackScope: this,
            onComplete: this.OnReachedToTop
        });
    };
    OnReachedToTop() {
        // console.log("OnReachedToTop");
        this.pipeBall.setPosition(this.mainBase.x + (300 * Constant.scaleFactor), this.mainBase.y + (380 * Constant.scaleFactor));
        this.pipeBallNumberText.setPosition(this.pipeBall.x, this.pipeBall.y);
        this.BlinkNumberAnimation(this.numberImageArray[this.nextDrawNumber - 1], this.numberImageNumberArray[this.nextDrawNumber - 1]);
        // this.StartTheBallToMove();
    }

    CreateSoundOnOffButton() {
        this.soundOnOffButton = this.scene.add.sprite(this.mainBase.x + (810 * Constant.scaleFactor), this.mainBase.y + (290 * Constant.scaleFactor), "sound_on_off_button").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.soundOnOffButton.setInteractive({ useHandCursor: true });
        this.soundOnOffButton.on("pointerdown", this.SoundButtonPressed, this);
        this.soundOnOffButton.on("pointerup", this.SoundButtonReleased, this);
    };

    SoundButtonPressed() {
        Utils.ButtonScaleTween(this, this.soundOnOffButton, Constant.scaleFactor);
    };
    SoundButtonReleased() {
        this.ToggleSoundButton();
    };

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
    };

    CreateFullScreenButton() {
        this.fullScreenButton = this.scene.add.sprite(this.mainBase.x + (870 * Constant.scaleFactor), this.mainBase.y + (290 * Constant.scaleFactor), "full_screen_button").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.fullScreenButton.setInteractive({ useHandCursor: true });
        this.fullScreenButton.on("pointerdown", this.FullScreenButtonPressed, this);
        this.fullScreenButton.on("pointerup", this.FullScreenButtonReleased, this);
    };
    FullScreenButtonPressed() {
        Utils.ButtonScaleTween(this, this.fullScreenButton, Constant.scaleFactor);
    };
    FullScreenButtonReleased() {
        this.ToggleFullScreenButton();
    };

    ToggleFullScreenButton() {
        if (this.fullScreenButton.frame.name == 0) {
            this.fullScreenButton.setFrame(1)
        } else {
            this.fullScreenButton.setFrame(0)
        }
    };
    HideDrawClassObjects() {
        this.bg.setVisible(false);
        this.mainBase.setVisible(false);
        this.leftBase.setVisible(false);
        this.currentDrawText.setVisible(false)
        this.totalDrawText.setVisible(false)
        this.drawHeadingText.setVisible(false)
        this.drawNumberText.setVisible(false)
        this.numberImageArray.forEach(element => {
            element.setVisible(false);
        });
        this.numberImageNumberArray.forEach(element => {
            element.setVisible(false);
        });
        this.pipeBase.setVisible(false)
        this.topPipe.setVisible(false)
        this.bottomPipe.setVisible(false)
        this.pipeGlass.setVisible(false)
        this.pipeBall.setVisible(false)
        this.pipeBallNumberText.setVisible(false)
        this.soundOnOffButton.setVisible(false);
        this.fullScreenButton.setVisible(false);
    }
    ShowDrawClassObjects() {
        this.bg.setVisible(true);
        this.mainBase.setVisible(true);
        this.leftBase.setVisible(true);
        this.currentDrawText.setVisible(true)
        this.totalDrawText.setVisible(true)
        this.drawHeadingText.setVisible(true)
        this.drawNumberText.setVisible(true)
        this.numberImageArray.forEach(element => {
            element.setVisible(true);
        });
        this.numberImageNumberArray.forEach(element => {
            element.setVisible(true);
        });
        this.pipeBase.setVisible(true)
        this.topPipe.setVisible(true)
        this.bottomPipe.setVisible(true)
        this.pipeGlass.setVisible(true)
        this.pipeBall.setVisible(true)
        this.pipeBallNumberText.setVisible(true)
        this.soundOnOffButton.setVisible(true);
        this.fullScreenButton.setVisible(true);
    }

    update(t, dt) {

    };

}
export default DrawClass;