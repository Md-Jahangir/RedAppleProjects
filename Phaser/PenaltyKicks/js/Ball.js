import { Constant } from "./Constant.js";
import { SoundManeger } from "./SoundManeger.js";
import ControlPointCalculation from "./ControlPointCalculation.js";
import Score from "./Score.js";
import { Server } from "./Server.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler_E6.js";
class Ball {
    constructor(scene) {
        this.scene = scene;
        this.ballAnimPrev = null;
        this.ballAnimAft = null;
        this.ball = null;
        this.staticBall = null;
        this.startX = 0;
        this.startY = 0;
        this.isBallMoving = false;
        this.ballFirstEffectTween = null;
        this.threshold = 50;
        this.startTime = 0;
        this.endTime = 0;
        this.isPressed = false;
        this.endY = 0;
        this.isLeftSwipe = false;
        this.isRightSwipe = false;
        this.isUpSwipe = false;
        this.distance = 0;
        this.isShotTaken = false;
        this.ultimateY = 0;
    }
    CreateBall() {
        this.threshold = 50 * Constant.scaleFactorY;
        this.controlPointCalculation = new ControlPointCalculation(this.scene);
        this.score = new Score(this.scene);

        this.ballAnimPrev = this.scene.anims.create({
            key: 'ball_move_prev',
            frames: this.scene.anims.generateFrameNumbers('ball_', { start: 0, end: 20 }),
            frameRate: 10,
            repeat: -1
        });
        this.ballAnimAft = this.scene.anims.create({
            key: 'ball_move_aft',
            frames: this.scene.anims.generateFrameNumbers('ball_', { start: 20, end: 0 }),
            frameRate: 40,
            repeat: -1
        });

        this.staticBall = this.scene.add.sprite(Constant.game.config.width / 2, Constant.game.config.height / 1.30, 'start_ball').setOrigin(0.5, 0.5).setVisible(true);
        this.ball = this.scene.add.follower(this.scene.curve, Constant.game.config.width / 2.02, Constant.game.config.height / 1.30, 'ball_').setOrigin(0.5, 0.5).setVisible(false);



        if (Constant.isMobile) {
            this.staticBall.setScale(Constant.scaleFactorX * 0.9, Constant.scaleFactorY * 1);
            this.ball.setScale(Constant.scaleFactorX * 0.9, Constant.scaleFactorY * 1);
        }
        else {
            this.staticBall.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            this.ball.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        }


        this.scene.gameUI.bg.on('pointerup', (pointer) => { this.OnPointerUp(pointer) }, this);
        this.scene.gameUI.bg.on('pointerdown', (pointer) => { this.OnPointerDown(pointer) }, this);
        this.scene.gameUI.bg.on('pointermove', (pointer) => { this.OnPointerMove(pointer) }, this);
    }

    OnPointerDown(pointer) {
        // console.log('down x : ', pointer.downX)
        // console.log('down y : ', pointer.downY)
        this.isPressed = true;
        this.ultimateY = pointer.downY;

        this.startX = pointer.downX;
        this.startY = pointer.downY;
        this.startTime = this.scene.time.now;
    }

    OnPointerMove(pointer) {
        if (!this.isPressed)
            return;
    }

    OnPointerUp(pointer) {
        // console.log('upX , upY', pointer.x, pointer.y)
        this.endY = pointer.upY;
        this.isPressed = false;


        let swipeDistanceX = this.startX - pointer.upX;
        let swipeDistanceY = this.startY - pointer.upY;
        this.endTime = this.scene.time.now;

        this.distance = Math.round(this.startY - pointer.upY);

        this.swipeTime = this.endTime - this.startTime;

        let swipeSpeedX = 0;
        let swipeSpeedY = 0;

        if (Math.abs(swipeDistanceX) > this.threshold) {
            swipeSpeedX = swipeDistanceX / this.swipeTime;
        }

        if (Math.abs(swipeDistanceY) > this.threshold) {
            swipeSpeedY = swipeDistanceY / this.swipeTime;
        }
        // setTimeout(() => { 
        this.BallSwipeDir(this.startX, this.startY, pointer.upX, pointer.upY, swipeSpeedY);
        // }, 200);
    }
    BallSwipeDir(_startX, _startY, _endX, _endY, _swipeSpeed) {
        this.controlPointCalculation.CreateDynamicCurveArc(Math.round(_startX), Math.round(_startY), Math.round(_endX), Math.round(_endY), _swipeSpeed);
        // this.scene.goalKeeperMovement.MakeGoalSaverDisable();

        if (_endX < _startX - this.threshold) {
            this.isLeftSwipe = true;
            this.isRightSwipe = false;
            this.isUpSwipe = false;
            // console.log('left swipe') 
            this.MoveTheBallAccordingly(_startX, _startY, Math.round(_endX), Math.round(_endY), _swipeSpeed);

        } else if (_endX > _startX + this.threshold) {
            this.isRightSwipe = true;
            this.isLeftSwipe = false;
            this.isUpSwipe = false;
            // console.log('right swipe')
            this.MoveTheBallAccordingly(_startX, _startY, Math.round(_endX), Math.round(_endY), _swipeSpeed);
        }
        else if (_endY < _startY - this.threshold) {
            this.isUpSwipe = true;
            this.isRightSwipe = false;
            this.isLeftSwipe = false;
            // console.log('up swipe')
            this.MoveTheBallAccordingly(_startX, _startY, Math.round(_endX), Math.round(_endY), _swipeSpeed);
        }
    }
    /**
     * 
     * @param {float} _startPointX 
     * @param {float} _startPointY 
     * @param {float} _endPointX 
     * @param {float} _endPointY 
     * @param {float} _swipeSpeed 
     * Here I am gonna determine the speed according to the position
     */
    MoveTheBallAccordingly(_startX, _startY, _endX, _endY, _swipeSpeed) {
        // this.scene.goalKeeperMovement.MakeGoalSaverDisable();

        setTimeout(() => {
            if (this.distance >= Constant.game.config.width / 6.4 && this.ultimateY < Constant.game.config.width / 2) {     // 250
                SoundManeger.PlayBallHitSound();
                this.scene.player.PlayerAnimPlay();
                this.isShotTaken = true;
                this.EachShotEffects();
                Constant.game.events.emit('StopArrowTween');
                this.ball.startFollow({
                    duration: 900,
                    yoyo: false,
                    ease: 'Sine.easeOut',
                    alpha: 0,
                    // verticalAdjust: true
                });
                // console.log('actual end point  :  ', _endX, _endY)
                if (this.controlPointCalculation.actualEndX < Math.round(Constant.game.config.width / 5.485)) {                     // 350
                    this.ball.setScale(Constant.scaleFactorX * 0.8, Constant.scaleFactorY * 0.8);
                    // console.log("out of bound")
                    SoundManeger.PlayMissedGoalSound();
                    this.scene.tweens.add({
                        targets: this.ball,
                        ease: "Linear",
                        duration: 900,
                        scaleX: Constant.scaleFactorX * 0.2,
                        scaleY: Constant.scaleFactorY * 0.2,
                        onComplete: () => {
                            this.scene.titleText.AnimateSpecificTitles(this.scene.titleText.missedText);
                            setTimeout(() => {
                                this.ball.setVisible(false);
                            }, 75);
                            setTimeout(() => {
                                this.ResetGame1();
                            }, 700);
                        }
                    })
                }
                else if (this.controlPointCalculation.actualEndX > Math.round(Constant.game.config.width / 1.226)) {                 //1545
                    this.ball.setScale(Constant.scaleFactorX * 0.8, Constant.scaleFactorY * 0.8);
                    // console.log("out of bound")
                    SoundManeger.PlayMissedGoalSound();
                    this.scene.tweens.add({
                        targets: this.ball,
                        ease: "Linear",
                        duration: 900,
                        scaleX: Constant.scaleFactorX * 0.2,
                        scaleY: Constant.scaleFactorY * 0.2,
                        onComplete: () => {
                            this.scene.titleText.AnimateSpecificTitles(this.scene.titleText.missedText);
                            setTimeout(() => {
                                this.ball.setVisible(false);
                            }, 75);
                            setTimeout(() => {
                                this.ResetGame1();
                            }, 700);
                        }
                    })
                }
                else if (this.controlPointCalculation.actualEndY < Math.round(Constant.game.config.height / 24)) {                     // 45
                    this.ball.setScale(Constant.scaleFactorX * 0.8, Constant.scaleFactorY * 0.8);
                    // console.log("out of bound")
                    SoundManeger.PlayMissedGoalSound();
                    this.scene.tweens.add({
                        targets: this.ball,
                        ease: "Linear",
                        duration: 900,
                        scaleX: Constant.scaleFactorX * 0.2,
                        scaleY: Constant.scaleFactorY * 0.2,
                        onComplete: () => {
                            this.scene.titleText.AnimateSpecificTitles(this.scene.titleText.missedText);
                            setTimeout(() => {
                                this.ball.setVisible(false);
                            }, 75);
                            setTimeout(() => {
                                this.ResetGame1();
                            }, 700);
                        }
                    })
                }

                else {
                    this.scene.tweens.add({
                        targets: this.ball,
                        ease: "Linear",
                        duration: 200,
                        scaleX: Constant.scaleFactorX * 0.4,
                        scaleY: Constant.scaleFactorY * 0.4,
                        onComplete: () => {
                            this.PositionBasisCollision(this.controlPointCalculation.actualEndX, this.controlPointCalculation.actualEndY);
                        }
                    })
                }
            }
        }, 200);
    }
    PositionBasisCollision(_endX, _endY) {
        this.scene.tweens.add({
            targets: this.ball,
            duration: 380,
            ease: 'Linear',
            scaleX: Constant.scaleFactorX * 0.25,
            scaleY: Constant.scaleFactorY * 0.25,
            onComplete: () => {
                //perfectly working
                if (this.ball.x >= Math.round(Constant.game.config.width / 4.8) &&
                    this.ball.x <= Math.round(Constant.game.config.width / 3.9183)) {  // 400,490  
                    if (this.ball.y >= Math.round(Constant.game.config.height / 11.368) && this.ball.y <= Math.round(Constant.game.config.height / 2.097)) { //95,515
                        this.BallReflection(_endX, _endY);
                    }
                }
                else if (this.ball.x >= Math.round(Constant.game.config.width / 1.3426) && this.ball.x <= Math.round(Constant.game.config.width / 1.260)) { //1430 ,1523
                    if (this.ball.y >= Math.round(Constant.game.config.height / 11.368) && this.ball.y <= Math.round(Constant.game.config.height / 2.097)) {
                        this.BallReflection(_endX, _endY);
                    }
                }

                else if (this.ball.x > Math.round(Constant.game.config.width / 3.918) && this.ball.x < Math.round(Constant.game.config.width /
                    1.342)) { //490,1430 
                    if (this.ball.y >= Math.round(Constant.game.config.height / 11.368) && this.ball.y <= Math.round(Constant.game.config.height / 2.097)) {
                        // console.log('ball is in the upper range')
                        if (this.ball.x > Math.round(Constant.game.config.width / 3.918) && this.ball.x < Math.round(Constant.game.config.width / 2.953)) {   //490,650  
                            this.BallDoubleReflection(_endX, _endY);
                            // left back
                        }
                        else if (this.ball.x > Math.round(Constant.game.config.width / 1.511) && this.ball.x < Math.round(Constant.game.config.width / 1.3426)) {       //1270,1430
                            this.BallDoubleReflection(_endX, _endY);
                            //right back
                        }
                        else {
                            // here bounce back
                            this.BallreflectionAndScaleUp(_endX, _endY);
                        }
                    }
                    else if (this.ball.y > Math.round(Constant.game.config.height / 3.763) && this.ball.y < Math.round(Constant.game.config.height / 2.097)) {   //287,515 
                        this.BallReflectionToDownWords(_endX, _endY);
                    }
                }
                else if (this.ball.x < Math.round(Constant.game.config.width / 4.465) && this.ball.x >= Math.round(Constant.game.config.width / 5.485)) {//430,350
                    if (this.ball.y < Math.round(Constant.game.config.height / 2.0571) || this.ball.y >= Math.round(Constant.game.config.height / 21.6)) {  //525,50
                        this.BallReflectionLeftEndAndRightEnd(_endX, _endY);
                    }
                }
                else if (this.ball.x >= Math.round(Constant.game.config.width / 1.2929) && this.ball.x < Math.round(Constant.game.config.width / 1.226)) {   //1485,1565
                    if (this.ball.y < Math.round(Constant.game.config.height / 2.0571) || this.ball.y >= Math.round(Constant.game.config.height / 21.6))
                    //525,50
                    {
                        this.BallReflectionLeftEndAndRightEnd(_endX, _endY);
                    }
                }
                if (this.ball.y > Math.round(Constant.game.config.height / 24) && this.ball.y < Math.round(Constant.game.config.height / 11.368)) {//45,95
                    if (this.ball.x > Math.round(Constant.game.config.width / 5.12) && this.ball.x < Math.round(Constant.game.config.width / 1.226)) {                  //375,1565
                        this.OnUpperBudCollide(_endX, _endY);
                    }
                }
                this.score.CheckGoalScore(this.controlPointCalculation.actualEndX, this.controlPointCalculation.actualEndY);
            }
        })

    }
    BallReflection(_endX, _endY) {
        this.BallReflectionLeftOrRight(_endX, _endY);
    }
    BallReflectionLeftEndAndRightEnd(_endX, _endY) {
        this.scene.titleText.AnimateSpecificTitles(this.scene.titleText.missedText);
        if (this.isLeftSwipe) {
            this.ball.setAngle(90)
        } else {
            this.ball.setAngle(-90)
        }
        let targetX = this.isLeftSwipe ? 0 : Math.round(Constant.game.config.width / 0.994);
        let gapY = Math.floor(Constant.game.config.height / 2.25 - _endY);

        this.scene.tweens.add({
            targets: this.ball,
            ease: "Power1",
            duration: 600,
            x: targetX,
            y: this.ball.y + gapY,
            onComplete: () => {
                this.ball.setVisible(false);
                setTimeout(() => {
                    // this.ball.setVisible(false);
                    this.ResetGame();
                }, 250);
            }
        })

    }
    BallReflectionLeftOrRight(_endPosX, _endposY) {
        SoundManeger.PlayBudHitSound();

        // this.ball.setAngle(90)
        let gapY = Math.floor(Constant.game.config.height / 2.25 - _endposY);
        let distanceOffset = this.isLeftSwipe ? _endPosX + (gapY * 1.6) : _endPosX - (gapY * 1.6);
        let seconddistanceOffsetX = 0;
        let seconddistanceOffsetX1 = 0;
        let seconddistanceOffsetY = 0;
        let seconddistanceOffsetY1 = 0;
        if (this.isLeftSwipe) {
            this.ball.setAngle(90)
            seconddistanceOffsetX = this.isLeftSwipe ? distanceOffset + (100 * Constant.scaleFactorX) : distanceOffset + (100 * Constant.scaleFactorX);
            seconddistanceOffsetX1 = this.isLeftSwipe ? distanceOffset + (200 * Constant.scaleFactorX) : distanceOffset + (200 * Constant.scaleFactorX);
            seconddistanceOffsetY = this.isLeftSwipe ? _endposY + (200 * Constant.scaleFactorY) : _endposY + (200 * Constant.scaleFactorY);
            seconddistanceOffsetY1 = this.isLeftSwipe ? _endposY + (300 * Constant.scaleFactorY) : _endposY + (300 * Constant.scaleFactorY);
        } else {
            this.ball.setAngle(-90)
            seconddistanceOffsetX = distanceOffset - (100 * Constant.scaleFactorX);
            seconddistanceOffsetX1 = distanceOffset - (200 * Constant.scaleFactorX);
            seconddistanceOffsetY = _endposY + (200 * Constant.scaleFactorY);
            seconddistanceOffsetY1 = _endposY + (300 * Constant.scaleFactorY);
        }
        this.scene.tweens.add({
            targets: this.ball,
            ease: "Linear",
            duration: 800,
            x: distanceOffset,
            y: _endposY + gapY,
            onComplete: () => {
                this.ball.setAngle(0)
                // this.ResetGame();
                this.scene.tweens.add({
                    targets: this.ball,
                    ease: "Linear",
                    duration: 200,
                    x: seconddistanceOffsetX,
                    y: seconddistanceOffsetY,
                    onComplete: () => {
                        this.scene.tweens.add({
                            targets: this.ball,
                            ease: "Linear",
                            duration: 300,
                            x: seconddistanceOffsetX1,
                            y: seconddistanceOffsetY1,
                            onComplete: () => {
                                this.ball.setVisible(false);
                                setTimeout(() => {
                                    // this.ball.setVisible(false);
                                    this.ResetGame();
                                }, 250);

                            }
                        })
                    }
                })
            }
        })
    };
    BallReflectionToDownWords(_endX, _endY) {
        let randomX = Math.floor(Math.random() * (Math.round(Constant.game.cinfig.width / 27.43) - (Math.round(Constant.game.cinfig.width / 64))) + (Math.round(Constant.game.cinfig.width / 64)));
        let gap = Math.floor(Constant.game.config.height / 2.25 - this.ball.y)
        // console.log('gap : ', gap)
        if (gap >= 0) {
            if (this.isLeftSwipe) {
                this.ball.setAngle(90)
                this.scene.tweens.add({
                    targets: this.ball,
                    ease: "power1",
                    duration: 700,
                    x: this.ball.x - randomX,
                    y: this.ball.y + gap,
                    onComplete: () => {
                        this.ball.setAngle(0)
                        this.ball.setVisible(false);
                        setTimeout(() => {
                            // this.ball.setVisible(false);
                            this.ResetGame();
                        }, 250);
                    }
                })
            }
            else if (this.isRightSwipe) {
                // console.log('when right swipe lower end')
                this.ball.setAngle(-90)
                this.scene.tweens.add({
                    targets: this.ball,
                    ease: "power1",
                    duration: 700,
                    x: this.ball.x + randomX,
                    y: this.ball.y + (gap),
                    onComplete: () => {
                        this.ball.setAngle(0)
                        this.ball.setVisible(false);
                        setTimeout(() => {
                            // this.ball.setVisible(false);
                            this.ResetGame();
                        }, 250);
                    }
                })
            }
            else {
                this.scene.tweens.add({
                    targets: this.ball,
                    ease: "power1",
                    duration: 700,
                    x: this.ball.x,
                    y: this.ball.y + gap + 10,
                    onComplete: () => {
                        this.ball.setVisible(false);
                        setTimeout(() => {
                            // this.ball.setVisible(false);
                            this.ResetGame();
                        }, 250);
                    }
                })
            }
        }
    }
    BallreflectionAndScaleUp(_endX, _endY) {
        let gap = Math.floor(Constant.game.config.height / 2.25 - this.ball.y)
        this.scene.tweens.add({
            targets: this.ball,
            ease: "Linear",
            duration: 700,
            x: this.ball.x,
            y: this.ball.y + gap + 30,
            // scaleX: Constant.scaleFactorX * 0.4,
            // scaleY: Constant.scaleFactorY * 0.4,
            onComplete: () => {
                this.ball.play("ball_move_aft");
                this.ball.setVisible(false);
                setTimeout(() => {
                    // this.ball.setVisible(false);
                    this.ResetGame();
                }, 300);
            }
        })
    }
    BallDoubleReflection(_endX, _endY) {

        let distanceOffset = this.isLeftSwipe ? Math.floor(Math.random() * (Math.round(Constant.game.config.width / 3.894) - Math.round(Constant.game.config.width / 4.8)) + (Math.round(Constant.game.config.width / 4.8)))
            : Math.floor(Math.random() * ((Math.round(Constant.game.config.width / 1.260)) - (Math.round(Constant.game.config.width / 1.342))) + ((Math.round(Constant.game.config.width / 1.342))));

        let gapY = Math.floor(Constant.game.config.height / 2.25 - this.ball.y);
        this.ball.play('ball_move_aft');
        this.scene.tweens.add({
            targets: this.ball,
            ease: "Power2",
            duration: 900,
            x: distanceOffset,
            y: this.ball.y + gapY,
            onComplete: () => {
                this.ball.setVisible(false);
                setTimeout(() => {
                    // this.ball.setVisible(false);
                    this.ResetGame();
                }, 250);
            }
        })
    }
    OnUpperBudCollide(_endX, _endY) {
        SoundManeger.PlayBudHitSound();
        this.ball.setAngle(90);
        this.scene.titleText.AnimateSpecificTitles(this.scene.titleText.missedText);
        let gapY = Math.floor(Constant.game.config.height / 2.25 - this.ball.y);
        this.scene.tweens.add({
            targets: this.ball,
            ease: "Power1",
            duration: 900,
            x: this.ball.x,
            y: this.ball.y + gapY,
            onComplete: () => {
                this.ball.setAngle(0)
                this.ball.setVisible(false);
                setTimeout(() => {
                    // this.ball.setVisible(false);
                    this.ResetGame();
                }, 250);
            }
        })
    }
    ResetGame() {
        this.isShotTaken = false;
        if (this.isShotTaken == false) {
            Constant.game.events.emit('PlayArrowTween');
        }
        this.ball.play("ball_move_aft");
        this.ball.setVisible(false);
        this.staticBall.setVisible(true);
        this.ball.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.scene.goalKeeperMovement.MakeGoalSaverEnable();
        this.ShowGameOver();
    }
    ResetGame1() {
        this.isShotTaken = false;
        if (this.isShotTaken == false) {
            Constant.game.events.emit('PlayArrowTween');
        }
        this.ball.play("ball_move_aft");
        this.staticBall.setVisible(true);
        this.ball.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.scene.goalKeeperMovement.MakeGoalSaverEnable();
        this.ShowGameOver();
    }
    EachShotEffects() {
        // this.scene.PlayerAnimPlay();   
        this.staticBall.setVisible(false);
        this.ball.play("ball_move_prev");
        this.scene.camera.shake(60);
        this.scene.goalKeeperMovement.MakeGoalSaverDisable();
        this.scene.goalKeeperMovement.GoalKeeperMovementAnimation();
        // this.ball.play("ball_move");

        this.ball.setVisible(true);
        this.ball.setPosition(Constant.game.config.width / 2.02, Constant.game.config.height / 1.30)
    }
    ShowGameOver() {
        this.scene.gameUI.numberOfTurn += 1;
        this.scene.gameUI.turnText.setText(this.scene.gameUI.numberOfTurn + '/' + this.scene.gameUI.totalNumberOfTurn)

        if (this.scene.gameUI.numberOfTurn == this.scene.gameUI.totalNumberOfTurn) {
            const currentTimeStamp = Date.now();
            const finalTime = currentTimeStamp - Constant.gameStartTime;
            // Server.PostGamePlayTimeToParent(finalTime / 1000, this.scene.gameUI.score);
            PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, this.scene.gameUI.score);
            PlayzhubEventHandler.InterimBreak();
            this.scene.gameOverPopUp.EnableGameOverPopUp();
        }
    }
}
export default Ball;