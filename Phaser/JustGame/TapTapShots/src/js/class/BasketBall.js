// import { Constant } from "../Constant";
import { Utils } from "../Utils";

export default class BasketBall {
    constructor(scene) {
        this.scene = scene;
        this.velocityX = null;
        this.angularSpeed = null;
        this.newScale = null;
        this.newScaleX = null;
        this.newScaleY = null;
        this.newWidth = null;
        this.newHeight = null;
        this.create();
    }
    create() {
        //First Width,Height,Scale Initialize
        this.newWidth = window.innerWidth;
        this.newHeight = window.innerHeight
        this.newScale = Utils.getScale(1080, 1920, this.newWidth, this.newHeight);
        //Ball Physics Component Declare
        this.velocityX = Math.round(this.newWidth / 90);
        // this.velocityY = -38;
        this.velocityY = -Math.round(this.newHeight / 50);
        this.angularSpeed = 0.1;
        this.ball = this.scene.matter.add.image(this.newWidth / 2, this.newHeight - 640 * this.newScale, 'ball', null, { /*plugin: wrapBounds*/ }).setScale(this.newScale).setDepth(2);
        this.ball.setCircle(55 * this.newScale);
        // this.ball.setSleepEvents(true, true);
        this.ball.setBounce(0.7);
        this.ball.setMass(this.newHeight / 128);
        this.ballShadow = this.scene.add.image(this.newWidth / 2, this.newHeight - 92 * this.newScale, 'ball-shadow').setScale(this.newScale).setDepth(1);
        //Particle Effect Control
        this.bubble = this.scene.add.particles(0, 0, 'bubble', {
            lifespan: {
                onEmit: (particle, key, t, value) => Phaser.Math.Percent(this.ball.body.speed, 0, 300) * 5000
            },
            alpha: {
                onEmit: (particle, key, t, value) => Phaser.Math.Percent(this.ball.body.speed, 0, 300) * 4000
            },
            scale: { start: 0.1 * this.newScale, end: 0 },
            frequency: 150,
            blendMode: 'ADD'
        });
        this.bubble.startFollow(this.ball);
        this.scene.bg.on('pointerup', this.BallControl, this);
        // this.scene.matter.add.mouseSpring();
    }
    //Ball on Click Functionality Handle
    BallControl() {
        if (!this.scene.istimeOver && !this.scene.isgameOver) {
            this.ball.setAwake();
            // console.log("vel x: ", this.velocityX);
            // console.log("vel y: ", this.velocityY * this.newScaleY);
            // console.log("newScale y: ", this.newScale);
            // this.ball.setVelocity(this.velocityX, this.velocityY * this.newScaleY).setAngularVelocity(this.angularSpeed);
            // console.log(this.velocityX, this.newScale);
            this.ball.setVelocity(this.velocityX, this.velocityY).setAngularVelocity(this.angularSpeed);
        }

    }
    //Ball Direction Control When Basket is change
    BallDirectionControl() {
        switch (this.scene.basketPos) {
            case 1:
                this.velocityX = Math.round(this.newWidth / 90);
                this.angularSpeed = 0.1;

                break;
            case 2:
                this.velocityX = -Math.round(this.newWidth / 90);
                this.angularSpeed = -0.1;
                break;
        }
    }
    OnUpdate() {
        if (this.ball.body.isSleeping) {
            switch (this.scene.basketPos) {
                case 1:
                    this.ball.body.constraintImpulse.x = 2 * this.newScale;
                    break;
                case 2:
                    this.ball.body.constraintImpulse.x = -2 * this.newScale;
                    break;
            }
        }
        //Ball in World Bound Control Always
        if (this.ball.x > this.newWidth + (50 * this.newScale)) {
            this.ball.x = -(40 * this.newScale);
        } else if (this.ball.x < -(50 * this.newScale)) {
            this.ball.x = this.newWidth + (40 * this.newScale);
        }
    }
    //Ball Shadow Control 
    ShadowEffect() {
        this.ballShadow.x = this.ball.x;
        let scaleCal = (this.ball.y) / (this.newHeight - (96 * this.newScale));
        scaleCal = Phaser.Math.Clamp(scaleCal, 0.1, 1);
        this.ballShadow.setScale(scaleCal * this.newScale);
    }
    resize(newWidth, newHeight, newScale) {
        this.newScale = newScale;
        // this.newScaleX = Utils.getScaleX(1080, newWidth);
        // this.newScaleY = Utils.getScaleY(1920, newHeight);
        this.newWidth = newWidth;
        this.newHeight = newHeight;
        this.ballShadow.y = newHeight - 92 * newScale;
        this.ball.setScale(newScale).setMass(this.newHeight / 128);
        this.ball.setPosition(this.newWidth / 2, this.newHeight - 640 * this.newScale);
    }
}
