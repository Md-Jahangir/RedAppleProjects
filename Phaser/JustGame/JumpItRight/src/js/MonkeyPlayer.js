import { Constant } from "./Constant.js";
class MonkeyPlayer {
    constructor(scene) {
        this.scene = scene;
        this.normalMonkey = null;
        this.playerAnimContainer = null;
        this.dethLeft = null;
        this.dethRight = null;
        this.powerUpPlayer = null;
        this.playerPresentX = null;
        this.playerPresentY = null;

        this.leftJump = null;
        this.rightJump = null;
        this.playerStartingTween = null;
        this.playerContainer = null;
        this.forceAnim = null;
    }
    CreateMonkeyPlayer() {//1.066
        this.playerContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 1.066);
        let normalMonkeyBase = this.scene.add.image(0, -50, 'white').setOrigin(0.5).setScale(Constant.scaleFactorX * 100, Constant.scaleFactorY * 100).setAlpha(0.00001);
        this.normalMonkey = this.scene.add.spine(0, 0, 'norm_monkey')
            .setScale(Constant.scaleFactorX * 0.25, Constant.scaleFactorY * 0.25)//.setVisible(true); 
        this.normalMonkey.play("Idle", true);
        this.playerContainer.add([
            normalMonkeyBase,
            this.normalMonkey,
        ]);
    }
    NormalMonkeyAnimation() {
        this.scene.upOffest = 40;
        this.playerStartingTween = this.scene.tweens.add({
            targets: this.playerContainer,
            ease: "Linear",
            duration: 300,
            x: Math.floor(Constant.game.config.width / 2),
            y: Math.floor(Constant.game.config.height / 2),
            onComplete: () => {
                this.scene.isPlateBaseBgMoving = true;

                let myInterval = setInterval(() => {
                    this.scene.upOffest = this.scene.upOffest - 2;
                    if (this.scene.upOffest == 0) {
                        clearInterval(myInterval);
                        this.scene.countDown.EnableCountDown();
                    }
                }, 100)
            }
        })
    }
    EnableMonkeyPlayer(_xPos, _yPos) {
        // this.powerUpPlayer.setPosition(_xPos, _yPos)
        // this.powerUpPlayer.setVisible(true);
        // console.log('enable power up')
        // this.normalMonkey.play("Force");
        // this.normalMonkey.once('complete', this.OnForceAnimComplete, this);




        this.PlayForce();
        this.forceAnim.once("complete", this.OnForceAnimComplete, this);
    }
    OnForceAnimComplete() {
        if (this.scene.counterFace % 2 === 0) {
            // this.normalMonkey.play("Force_idle", true);
            this.PlayForceIdleLeft();
        }
        else if (this.scene.counterFace % 2 === 1) {
            // this.normalMonkey.play("Force_idle", true);
            this.PlayForceIdleRight();
        }
        setTimeout(() => {
            // this.playerContainer.body.enable = true;
            // this.playerContainer.visible = true;
            // this.powerUpPlayer.visible = false;
            // this.scene.upOffest = 5;

            if (Constant.isMobile) {
                if (Constant.isPortrait) {
                    this.upOffest = 8;
                }
            }
            else {
                this.upOffest = 5;
            } this.playerContainer.body.enable = true;
            this.scene.powerUpFood.powerUpFood.body.enable = true;
            this.scene.MakeSceneEnableInteractive();
            this.PlayIdle();
        }, 4000);
    }
    PlayIdle() {
        this.normalMonkey.play("Idle");
    }
    PlayRightJump() {
        this.leftJump = this.normalMonkey.play("Left_Side_Jumpnew");
    }
    PlayLeftJump() {
        this.rightJump = this.normalMonkey.play("Right_Side_Jumpnew");
    }
    PlayForce() {
        this.forceAnim = this.normalMonkey.play("Force");
    }
    PlayForceIdleLeft() {
        this.normalMonkey.play("Force_idle_Left", true);
    }
    PlayForceIdleRight() {
        this.normalMonkey.play("Force_idle_Right", true);
    }
    PlayFallLeft() {
        this.normalMonkey.play("Fall_Left", true);
    }
    PlayFallRight() {
        this.normalMonkey.play("Fall_Right", true);
    }
    PlayDeathRight() {
        this.dethRight = this.normalMonkey.play("Death_Right");
    }
    PlayDeathLeft() {
        this.dethLeft = this.normalMonkey.play("Death_left");
    }
}
export default MonkeyPlayer;