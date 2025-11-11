// import { Constant } from "../Constant";
import { Utils } from "../Utils";

export default class Basket {
    constructor(scene) {
        this.scene = scene;
        //Game reuse Varriable declare
        this.validScoringcounter = null;
        this.score = null;
        this.basketIndicator = null;
        this.randomHeight = 0;
        this.randomHeightLeft = 0;
        this.netBodyTweenCount = null;
        this.newScale = null;
        this.newWidth = null;
        this.newHeight = null;
        this.previousWidth = null;
        this.timer = null;
        this.create();
    }
    create() {
        //First Width,Height,Scale Initialize
        this.newWidth = window.innerWidth;
        this.newHeight = window.innerHeight
        this.newScale = Utils.getScale(1080, 1920, this.newWidth, this.newHeight);
        //Game reuse Varriable value declare
        this.validScoringcounter = 0;
        this.netBodyTweenCount = 0;
        this.score = 0;
        this.basketIndicator = 1;
        this.timer = 10000;
        this.timerBase = this.scene.add.image(0, 0, 'loading-base').setDepth(4).setOrigin(0, 0.5);
        this.timerBody = this.scene.add.nineslice(0, 0, 'loading-bar', 0, 538, 6, 6).setDepth(4).setOrigin(0, 0.5);
        // console.log(this.timerBody, 'nine slice');
        this.scoreText = this.scene.add.text(0, 0, this.score, { fontFamily: "Poppins-Bold", fontSize: 100 }).setOrigin(0.5).setDepth(4);
        this.RightBasket();
        this.LeftBasket();
    }
    //Right Basket Create
    RightBasket() {
        this.basketStand1 = this.scene.matter.add.image(0, 0, 'basket-right', null, { isStatic: true, shape: this.scene.basketColliderJson.right_basket_board });
        this.basketBackPiece1 = this.scene.matter.add.image(0, 0, 'basket-piece1', null, { isStatic: true, isSensor: true, shape: this.scene.basketColliderJson.right_ring_back }).setDepth(1);
        this.basketFrontPiece1 = this.scene.matter.add.image(0, 0, 'basket1', null, { isStatic: true, isSensor: true, shape: this.scene.basketColliderJson.right_ring_front }).setDepth(3);

        this.RightBasketScoreChecker();
    }
    //Right Basket Score Checker Add
    RightBasketScoreChecker() {

        this.scChecker1 = this.scene.matter.add.image(0, 0, 'one-pixel', null, { restitution: 0.9, isStatic: true, isSensor: true }).setAlpha(0);

        this.scChecker1.setOnCollideWith(this.scene.basketBallInstance.ball.body, (body, collisionData) => {
            if (this.scene.basketPos == 1) {
                if (this.validScoringcounter > 0) {
                    this.validScoringcounter = 1;
                }
                else {
                    this.validScoringcounter++;
                }
            }
        });
        this.scChecker2 = this.scene.matter.add.image(0, 0, 'one-pixel', null, { restitution: 0.9, isStatic: true, isSensor: true }).setAlpha(0);
        this.scChecker2.setOnCollideWith(this.scene.basketBallInstance.ball.body, (body, collisionData) => {
            if (this.scene.basketPos == 1) {

                if (this.validScoringcounter == 1) {
                    this.validScoringcounter++;
                }
            }
        });
        this.scChecker3 = this.scene.matter.add.image(0, 0, 'one-pixel', null, { restitution: 0.9, isStatic: true, isSensor: true }).setAlpha(0);
        this.scChecker3.setOnCollideWith(this.scene.basketBallInstance.ball.body, (body, collisionData) => {
            if (this.scene.basketPos == 1) {

                if (this.validScoringcounter == 2) {
                    this.score++;
                    this.UpdateScoreText();
                    setTimeout(() => {
                        this.scene.basketPos = Phaser.Math.Between(1, 2);
                        this.scene.basketBallInstance.BallDirectionControl();
                        this.scene.isDetectScore = false;
                        this.RightBasketTween();
                        this.TimerControl();
                        this.validScoringcounter = 0;
                    }, 300);
                    // console.log('score', this.score);
                } else {
                    this.validScoringcounter = 0;

                    // console.log(this.scene.basketBallInstance.ball.body.speed);
                }
            }
        });
    }
    //Right Basket Visible Control
    RightBasketVisibleOn() {
        this.randomHeight = (Phaser.Math.Between(-500, 100)) * this.newScale;
        this.basketStand1.y = (this.newHeight / 2 - 88 * this.newScale) + (this.randomHeight * this.newScale);
        this.basketBackPiece1.y = (this.newHeight / 2 - 5 * this.newScale) + (this.randomHeight * this.newScale);
        this.basketFrontPiece1.y = (this.newHeight / 2) + (this.randomHeight * this.newScale);
        this.scChecker1.y = (this.newHeight / 2 - 80 * this.newScale) + (this.randomHeight * this.newScale);
        this.scChecker2.y = (this.newHeight / 2 + 50 * this.newScale) + (this.randomHeight * this.newScale);
        this.scChecker3.y = (this.newHeight / 2 + 118 * this.newScale) + (this.randomHeight * this.newScale);
    };
    //Right Basket Tween
    RightBasketTween() {
        let offsetWidth = 400 * this.newScale;
        this.scene.gameTween.SmoothTransitionOutofCanvas('Linear', "+=" + offsetWidth.toString(), "+=0", 1000, false, 0, this.basketStand1, this.basketBackPiece1, this.basketFrontPiece1, this.basketColliderLeft1, this.basketColliderRight1, this.scChecker1, this.scChecker2, this.scChecker3);
        this.scene.gameTween.tween.on('complete', () => {
            // console.log('outofCanvas');
            this.scene.gameTween.tween.remove();
            this.BasketVisibleControl(offsetWidth);
        });
    }
    //Left Basket Add
    LeftBasket() {
        this.basketStand2 = this.scene.matter.add.image(0, 0, 'basket-left', null, { isStatic: true, isSensor: true, shape: this.scene.basketColliderJson.left_basket_board });
        this.basketBackPiece2 = this.scene.matter.add.image(0, 0, 'basket-piece2', null, { isStatic: true, isSensor: true, shape: this.scene.basketColliderJson.left_ring_back }).setDepth(1);
        this.basketFrontPiece2 = this.scene.matter.add.image(0, 0, 'basket2', null, { isStatic: true, isSensor: true, shape: this.scene.basketColliderJson.left_ring_front }).setDepth(3);
        this.LeftBasketScoreChecker();
    }
    //Left Basket Score Checker Add
    LeftBasketScoreChecker() {
        this.scChecker4 = this.scene.matter.add.image(0, 0, 'one-pixel', null, { restitution: 0.9, isStatic: true, isSensor: true }).setAlpha(0);
        this.scChecker4.setOnCollideWith(this.scene.basketBallInstance.ball.body, (body, collisionData) => {
            if (this.scene.basketPos == 2) {

                if (this.validScoringcounter > 0) {
                    this.validScoringcounter = 1;
                }
                else {
                    this.validScoringcounter++;
                }
            }
        });
        this.scChecker5 = this.scene.matter.add.image(0, 0, 'one-pixel', null, { restitution: 0.9, isStatic: true, isSensor: true }).setAlpha(0);
        this.scChecker5.setOnCollideWith(this.scene.basketBallInstance.ball.body, (body, collisionData) => {
            if (this.scene.basketPos == 2) {

                if (this.validScoringcounter == 1) {
                    this.validScoringcounter++;
                }
            }
        });
        this.scChecker6 = this.scene.matter.add.image(0, 0, 'one-pixel', null, { restitution: 0.9, isStatic: true, isSensor: true }).setAlpha(0);
        this.scChecker6.setOnCollideWith(this.scene.basketBallInstance.ball.body, (body, collisionData) => {
            if (this.scene.basketPos == 2) {

                if (this.validScoringcounter == 2) {
                    this.score++;
                    this.UpdateScoreText();
                    setTimeout(() => {
                        this.scene.basketPos = Phaser.Math.Between(1, 2);
                        this.scene.basketBallInstance.BallDirectionControl();
                        this.LeftBasketTween();
                        this.TimerControl();
                        this.validScoringcounter = 0;
                    }, 300)
                    // console.log('score', this.score);
                } else {
                    this.validScoringcounter = 0;
                }
            }
        });
    }
    //Left Basket Tween 
    LeftBasketTween() {
        let offsetWidth = 400 * this.newScale;
        this.scene.gameTween.SmoothTransitionOutofCanvas('Linear', "-=" + offsetWidth.toString(), "+=0", 1000, false, 0, this.basketStand2, this.basketBackPiece2, this.basketFrontPiece2, this.basketColliderLeft2, this.basketColliderRight2, this.scChecker4, this.scChecker5, this.scChecker6);
        this.scene.gameTween.tween.on('complete', () => {

            this.scene.gameTween.tween.remove();
            this.BasketVisibleControl(offsetWidth);
        });
    }
    //Left Basket Visible Control
    LeftBasketVisibleOn() {
        this.randomHeightLeft = (Phaser.Math.Between(-100, 700)) * this.newScale;
        this.basketStand2.y = (this.newHeight / 2 - 480 * this.newScale) + (this.randomHeightLeft * this.newScale);
        this.basketBackPiece2.y = (this.newHeight / 2 - 411 * this.newScale) + (this.randomHeightLeft * this.newScale);
        this.basketFrontPiece2.y = (this.newHeight / 2 - 401 * this.newScale) + (this.randomHeightLeft * this.newScale);
        this.scChecker4.y = (this.newHeight / 2 - 480 * this.newScale) + (this.randomHeightLeft * this.newScale);
        this.scChecker5.y = (this.newHeight / 2 - 348 * this.newScale) + (this.randomHeightLeft * this.newScale);
        this.scChecker6.y = (this.newHeight / 2 - 279 * this.newScale) + (this.randomHeightLeft * this.newScale);
    };
    //Score Text Update
    UpdateScoreText() {
        this.scoreText.setText(this.score);
    }
    //Timer UI Control
    TimerControl() {
        switch (this.score) {
            case 1:
                this.TimerTween();
                break;

            default:
                this.TimerTweenRestartAfterScore();
                this.scene.basketBallInstance.ball.body.timeScale = 1;
                break;
        }
    }
    //Timer Tween Control
    TimerTween() {
        this.gameTimer = this.scene.tweens.add({
            targets: this.timerBody,
            width: 0,
            duration: this.timer,
            ease: 'Linear',
            yoyo: false,
            repeat: 0,
        });
        this.gameTimer.on('complete', () => {
            this.gameTimer.remove();
            this.scene.pauseBut.button.setVisible(false);
            this.scene.istimeOver = true;
            this.scene.basketBallInstance.ball.body.timeScale = 0.4;
            this.scene.basketBallInstance.ball.setMass(window.innerWidth / 9.6);
        })
    }
    //Timer Tween Restart Control
    TimerTweenRestartAfterScore() {
        if (!this.scene.istimeOver) {
            this.gameTimer.stop();
            this.gameTimer.remove();
        }
        else {
            this.scene.pauseBut.button.setVisible(true);
            this.scene.istimeOver = false;
        }
        this.timerBody.width = 538;
        // console.log('restart tween');
        this.TimerTween();
    }
    // Which basket visible that functionality control
    BasketVisibleControl(offsetWidth) {

        switch (this.scene.basketPos) {
            case 1:
                this.ShowHideBasket();
                this.scene.gameTween.SmoothTransitionInCanvas('Linear', "-=" + offsetWidth.toString(), "+=0", 1000, false, 0, this.basketStand1, this.basketBackPiece1, this.basketFrontPiece1, this.basketColliderLeft1, this.basketColliderRight1, this.scChecker1, this.scChecker2, this.scChecker3);
                this.scene.gameTween.tweenIn.on('complete', () => {
                    this.scene.gameTween.tweenIn.remove();
                });
                this.basketIndicator = 1;
                break;

            case 2:
                this.ShowHideBasket();
                this.scene.gameTween.SmoothTransitionInCanvas('Linear', "+=" + offsetWidth.toString(), "+=0", 1000, false, 0, this.basketStand2, this.basketBackPiece2, this.basketFrontPiece2, this.basketColliderLeft2, this.basketColliderRight2, this.scChecker4, this.scChecker5, this.scChecker6);
                this.scene.gameTween.tweenIn.on('complete', () => {
                    this.scene.gameTween.tweenIn.remove();
                });
                this.basketIndicator = 2;
                break;
        }
    }
    // Show & Hide Baskets functionality
    ShowHideBasket() {

        switch (this.basketIndicator + this.scene.basketPos) {
            case 2:
                this.RightBasketVisibleOn();
                break;
            case 3:
                if (this.basketIndicator == 1) {

                    this.LeftBasketVisibleOn();
                }
                else {
                    this.RightBasketVisibleOn();
                }
                break;
            case 4:
                this.LeftBasketVisibleOn();
                break;
        }

    }

    resize(newWidth, newHeight, newScale) {
        this.newWidth = newWidth;
        this.newHeight = newHeight
        this.newScale = newScale;

        this.timerBase.setScale(newScale);
        this.timerBase.setPosition(newWidth / 2 - 300 * newScale, 192 * newScale);
        this.timerBody.setScale(newScale);
        this.timerBody.setPosition(this.timerBase.x + 5 * newScale, this.timerBase.y);
        this.scoreText.setScale(newScale);
        this.scoreText.setPosition(newWidth / 2, newHeight / 6);

        if (this.scene.basketPos == 1) {

            //right basket
            this.basketStand1.setScale(newScale);
            this.basketStand1.setPosition(newWidth - 71 * newScale, newHeight / 2 - 88 * newScale + this.randomHeight * newScale);
            this.basketBackPiece1.setScale(newScale);
            this.basketBackPiece1.setPosition(newWidth - 157 * newScale, newHeight / 2 - 5 * newScale + this.randomHeight * newScale);
            this.basketFrontPiece1.setScale(newScale);
            this.basketFrontPiece1.setPosition(newWidth - 193 * newScale, newHeight / 2 + this.randomHeight * newScale);
            this.scChecker1.setScale(newScale * 100, newScale * 10);
            this.scChecker1.setPosition(newWidth - 190 * newScale, newHeight / 2 - 80 * newScale + this.randomHeight * newScale);
            this.scChecker2.setScale(newScale * 50, newScale * 10);
            this.scChecker2.setPosition(newWidth - 190 * newScale, newHeight / 2 + 50 * newScale + this.randomHeight * newScale);
            this.scChecker3.setScale(newScale * 100, newScale * 50);
            this.scChecker3.setPosition(newWidth - 190 * newScale, newHeight / 2 + 118 * newScale + this.randomHeight * newScale);
            // leftBasket
            this.basketStand2.setScale(newScale);
            this.basketStand2.setPosition(-(337.5 * newScale), newHeight / 2 - 480 * newScale + this.randomHeightLeft * newScale);
            this.basketBackPiece2.setScale(newScale);
            this.basketBackPiece2.setPosition(-(234.78 * newScale), newHeight / 2 - 411 * newScale + this.randomHeightLeft * newScale);
            this.basketFrontPiece2.setScale(newScale);
            this.basketFrontPiece2.setPosition(-(209.70 * newScale), newHeight / 2 - 401 * newScale + this.randomHeightLeft * newScale);
            this.scChecker4.setScale(newScale * 100, newScale * 10);
            this.scChecker4.setPosition(-(203.77 * newScale), newHeight / 2 - 480 * newScale + this.randomHeightLeft * newScale);
            this.scChecker5.setScale(newScale * 50, newScale * 10);
            this.scChecker5.setPosition(-(203.77 * newScale), newHeight / 2 - 348 * newScale + this.randomHeightLeft * newScale);
            this.scChecker6.setScale(newScale * 100, newScale * 50);
            this.scChecker6.setPosition(-(203.77 * newScale), newHeight / 2 - 279 * newScale + this.randomHeightLeft * newScale);
        }
        else if (this.scene.basketPos == 2) {
            //right basket
            this.basketStand1.setScale(newScale);
            this.basketStand1.setPosition((newWidth - 71 * newScale) + (400 * this.newScale), newHeight / 2 - 88 * newScale + this.randomHeight * newScale);
            this.basketBackPiece1.setScale(newScale);
            this.basketBackPiece1.setPosition((newWidth - 157 * newScale) + (400 * this.newScale), newHeight / 2 - 5 * newScale + this.randomHeight * newScale);
            this.basketFrontPiece1.setScale(newScale);
            this.basketFrontPiece1.setPosition((newWidth - 193 * newScale) + (400 * this.newScale), newHeight / 2 + this.randomHeight * newScale);
            this.scChecker1.setScale(newScale * 100, newScale * 10);
            this.scChecker1.setPosition((newWidth - 190 * newScale) + (400 * this.newScale), newHeight / 2 - 80 * newScale + this.randomHeight * newScale);
            this.scChecker2.setScale(newScale * 50, newScale * 10);
            this.scChecker2.setPosition((newWidth - 190 * newScale) + (400 * this.newScale), newHeight / 2 + 50 * newScale + this.randomHeight * newScale);
            this.scChecker3.setScale(newScale * 100, newScale * 50);
            this.scChecker3.setPosition((newWidth - 190 * newScale) + (400 * this.newScale), newHeight / 2 + 118 * newScale + this.randomHeight * newScale);
            // leftBasket
            this.basketStand2.setScale(newScale);
            this.basketStand2.setPosition(-(337.5 * newScale) + (400 * this.newScale), newHeight / 2 - 480 * newScale + this.randomHeightLeft * newScale);
            this.basketBackPiece2.setScale(newScale);
            this.basketBackPiece2.setPosition(-(234.78 * newScale) + (400 * this.newScale), newHeight / 2 - 411 * newScale + this.randomHeightLeft * newScale);
            this.basketFrontPiece2.setScale(newScale);
            this.basketFrontPiece2.setPosition(-(209.70 * newScale) + (400 * this.newScale), newHeight / 2 - 401 * newScale + this.randomHeightLeft * newScale);
            this.scChecker4.setScale(newScale * 100, newScale * 10);
            this.scChecker4.setPosition(-(203.77 * newScale) + (400 * this.newScale), newHeight / 2 - 480 * newScale + this.randomHeightLeft * newScale);
            this.scChecker5.setScale(newScale * 50, newScale * 10);
            this.scChecker5.setPosition(-(203.77 * newScale) + (400 * this.newScale), newHeight / 2 - 348 * newScale + this.randomHeightLeft * newScale);
            this.scChecker6.setScale(newScale * 100, newScale * 50);
            this.scChecker6.setPosition(-(203.77 * newScale) + (400 * this.newScale), newHeight / 2 - 279 * newScale + this.randomHeightLeft * newScale);
        }
    }
}