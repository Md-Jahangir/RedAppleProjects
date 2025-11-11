import { Constant } from "./Constant.js";
class BladeObstacle {
    constructor(scene) {
        this.scene = scene;
        this.numberOfRings = 3;
        this.lastIndexOfRing = null;
        this.bladePatternArray = [];
        this.wheelArray = [];

        this.numberOfRollinRings = 2;
        this.lastIndexOfRollinBlade = null;
        this.rollinArray = [];

        this.collideRollinArray = [];
        this.tweenArray = [];
        this.tweenOne = null;
        this.tweenTwo = null;
        this.structureOneMoveBool = false;
        this.bladePassByCounter = 0;
        this.moveRollinBlade = false;
    }
    CreateFirstStructure() {
        this.lastIndexOfRing = this.numberOfRings - 1;
        for (let i = 1; i <= 3; i++) {
            let bladeGroup = this.scene.add.container(0, 0);
            let base = this.scene.add.image(0, 0, 'blade_base_' + i).setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            let blade = this.scene.add.image(0, 0, 'blade_' + i).setOrigin(0.5).setScale(Constant.scaleFactor);
            //-----physics affect------
            this.scene.physics.add.existing(blade);
            blade.body.allowGravity = false;
            blade.body.immovable = true;

            this.wheelArray.push(blade);
            //-------------------------
            bladeGroup.add(base);
            bladeGroup.add(blade);
            this.bladePatternArray.push(bladeGroup);
        }
        this.SetPositionOfTheBlades();
    };
    CreateSecondStructure() {
        this.lastIndexOfRollinBlade = this.numberOfRollinRings - 1;
        for (let i = 1; i <= 2; i++) {
            let rollInBladeGroup = this.scene.add.container(0, 0);
            let rollinBase = this.scene.add.image(0, 0, 'blade_base_' + i).setOrigin(0.5).setScale(Constant.scaleFactorX * 20, Constant.scaleFactorY * 0.3);
            let rollingBlade = this.scene.physics.add.image(0, 0, 'rollin_' + i).setOrigin(0.5)//.setScale(Constant.scaleFactorX * 0.2, Constant.scaleFactorY * 0.2);
            this.collideRollinArray.push(rollingBlade);
            //-----physics affect------
            // this.scene.physics.add.existing(rollingBlade);


            rollingBlade.body.allowGravity = false;
            rollingBlade.body.immovable = true;

            this.tweenArray.push(rollingBlade);
            //-------------------------

            rollInBladeGroup.add([
                rollinBase,
                rollingBlade
            ])

            this.rollinArray.push(rollInBladeGroup)
        }
        this.SetPositionOfRollinObs();
    }
    SetPositionOfTheBlades() {
        for (let i = 0; i < this.bladePatternArray.length; i++) {
            if (i == 0) {
                this.bladePatternArray[i].list[0].setPosition(Math.floor(Constant.game.config.width / 6.353), 0);
                this.bladePatternArray[i].list[1].setPosition(Math.floor(Constant.game.config.width / 5.4), 0);

                this.bladePatternArray[i].list[1].body.setBounce(0.2);
                this.bladePatternArray[i].list[1].body.setCircle(Math.floor(Constant.game.config.width / 3.6));
            }
            else if (i == 1) {
                this.bladePatternArray[i].list[0].setPosition(Math.floor(Constant.game.config.width / 21.6), 0);
                this.bladePatternArray[i].list[1].setPosition(Math.floor(Constant.game.config.width / 4.32), 0);

                this.bladePatternArray[i].list[1].body.setBounce(0.2);
                this.bladePatternArray[i].list[1].body.setCircle(Math.floor(Constant.game.config.width / 5));
            }
            else if (i == 2) {
                this.bladePatternArray[i].list[0].setPosition(Math.floor(Constant.game.config.width / 1.028), 0);
                this.bladePatternArray[i].list[1].setPosition(Math.floor(Constant.game.config.width / 1.27), 0);

                this.bladePatternArray[i].list[1].body.setBounce(0.2);
                this.bladePatternArray[i].list[1].body.setCircle(Math.floor(Constant.game.config.width / 8));
            }
        }
        this.ContainerSetPosition();
    }
    SetPositionOfRollinObs() {
        for (let i = 0; i < this.rollinArray.length; i++) {
            if (i == 0) {
                this.rollinArray[i].list[1].setPosition(Math.floor(Constant.game.config.width / 5.4), 0);
                this.rollinArray[i].list[0].setPosition(Math.floor(Constant.game.config.width / 5.4), 0);

                this.rollinArray[i].list[1].body.setBounce(0.2);
                this.rollinArray[i].list[1].body.setCircle(Math.floor(Constant.game.config.width / 11));
            }
            else if (i == 1) {
                this.rollinArray[i].list[0].setPosition(Math.floor(Constant.game.config.width / 6.352), 0);
                this.rollinArray[i].list[1].setPosition(Math.floor(Constant.game.config.width / 15.42), 0);

                this.rollinArray[i].list[1].body.setBounce(0.2);
                this.rollinArray[i].list[1].body.setCircle(Math.floor(Constant.game.config.width / 11));
            }
        }
        this.RollinContainerSetPosition();
        this.TweenRollinBlades();
    }
    ContainerSetPosition() {
        let randomY = this.GetRandomValue(Constant.game.config.width / 0.7714, Constant.game.config.height / 0.8727);
        for (let i = 0; i < this.bladePatternArray.length; i++) {
            if (i == 0) {
                this.bladePatternArray[i].setPosition(0, -700)
            }
            else if (i > 0) {
                this.bladePatternArray[i].setPosition(0, this.bladePatternArray[i - 1].y - randomY);
            }
        }
    }

    RollinContainerSetPosition() {
        let randomY = this.GetRandomValue(Math.floor(Constant.game.config.width / 0.4695), Math.floor(Constant.game.config.height / 0.768))
        for (let i = 0; i < this.rollinArray.length; i++) {
            if (i == 0) {
                this.rollinArray[i].setPosition(0, -Math.floor(Constant.game.config.height / 1.129))
            }
            else if (i > 0) {
                this.rollinArray[i].setPosition(0, this.rollinArray[i - 1].y - randomY);
            }
        }
    }
    TweenRollinBlades() {
        //first tween
        this.tweenOne = this.scene.tweens.add({
            targets: this.tweenArray[0],
            ease: "linear",
            duration: 2000,
            x: Math.floor(Constant.game.config.width / 1.35),
            yoyo: true,
            repeat: -1
        })

        this.tweenOne = this.scene.tweens.add({
            targets: this.tweenArray[1],
            ease: "linear",
            duration: 2000,
            x: Math.floor(Constant.game.config.width / 1.35),
            yoyo: true,
            repeat: -1
        })
    }
    MoveRollinBlades() {
        if (this.moveRollinBlade) {
            for (let i = 0; i < this.rollinArray.length; i++) {
                this.rollinArray[i].y += this.scene.upOffest;
                if (this.rollinArray[i].y > Constant.game.config.height / 0.489) {
                    let randomY = this.GetRandomValue(Math.floor(Constant.game.config.height / 0.8727), Math.floor(Constant.game.config.height / 0.568))
                    this.rollinArray[i].y = this.rollinArray[this.lastIndexOfRollinBlade].y - this.rollinArray[i].height - randomY;
                    this.lastIndexOfRollinBlade = i;
                }
            }
        }
    }
    GetRandomValue(_min, _max) {
        return Math.floor(Math.random() * (_max - _min) + _min);
    }
    MoveBladeObstacle() {
        if (this.structureOneMoveBool) {
            for (let i = 0; i < this.bladePatternArray.length; i++) {
                this.bladePatternArray[i].y += this.scene.upOffest;
                if (this.bladePatternArray[i].y > Constant.game.config.height / 0.489) {
                    this.bladePassByCounter += 1;
                    if (this.bladePassByCounter === 1) {
                        this.moveRollinBlade = true;
                    }
                    let randomY = this.GetRandomValue(Math.floor(Constant.game.config.width / 0.568), Math.floor(Constant.game.config.height / 0.8727))
                    this.bladePatternArray[i].y = this.bladePatternArray[this.lastIndexOfRing].y - this.bladePatternArray[i].height - randomY;
                    this.lastIndexOfRing = i;
                }
            }
        }
    }
    UpadteRotateTimer() {
        this.wheelArray[0].rotation += .04;
        this.wheelArray[1].rotation += .06;
        this.wheelArray[2].rotation -= 0.1;

        this.tweenArray[0].rotation += 0.1;
        this.tweenArray[1].rotation -= 0.15;
    }
}
export default BladeObstacle;