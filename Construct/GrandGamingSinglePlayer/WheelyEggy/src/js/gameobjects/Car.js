import { Constant } from "../Constant";

export default class Car {
    constructor(scene, _refObject) {
        //#region -Variables
        this.scene = scene;
        this.refObject = _refObject;
        this.paddle = {
            "left": false,
            "right": false,
        }
        this.maxSpeed = 1;
        this.maxSpeedBackward = this.maxSpeed * 0.75;
        this.acceleration = this.maxSpeed / 50;
        this.accelerationBackward = this.acceleration * 0.75;
        this.damping = 0.1;

        this.width = 283;
        this.height = 124;
        this.wheelOffset = {
            "x": 75,
            "y": 65,
        }
        this.frontWheelOffset = this.width * 0.5 - this.wheelOffset.x;
        this.rearWheelOffset = -this.width * 0.5 + this.wheelOffset.x;
        this.wheelRadius = 41.5;
        //#endregion
        this.Events();
        this.create();
    }
    //#region -Create
    create() {
        //car body
        this.body = this.scene.matter.add.image(0, 0, "car_new", null, { shape: Constant.colliders.car_new });
        //wheels
        this.frontWheel = this.scene.matter.add.image(0, 0, "wheel")
            .setBody(
                {
                    type: 'circle',
                    radius: this.wheelRadius
                },
                {
                    label: 'carBody',
                    density: 0.0015,
                    friction: 0.7,
                })
        this.rearWheel = this.scene.matter.add.image(0, 0, "wheel")
            .setBody(
                {
                    type: 'circle',
                    radius: this.wheelRadius
                },
                {
                    label: 'carBody',
                    density: 0.0015,
                    friction: 0.7,
                })
        //wheels joint
        this.constraintA = this.scene.matter.add.constraint(this.body.body, this.frontWheel.body, 0, 0.12, { pointA: { x: this.frontWheelOffset, y: this.wheelOffset.y } });
        this.constraintB = this.scene.matter.add.constraint(this.body.body, this.rearWheel.body, 0, 0.12, { pointA: { x: this.rearWheelOffset, y: this.wheelOffset.y } });
    }
    //#endregion

    //#region -Events
    Events() {
        this.scene.events.once("EggDestroy", () => {
            this.EggDestoyEvent();
        })
    }
    //#endregion

    //#region -EggDestroyEvent
    EggDestoyEvent() {
        this.ChangeTimeScale(0.2);
        setTimeout(() => {
            this.ChangeTimeScale(1);
        }, Constant.delayGameOver)
    }
    //#endregion

    //#region -ChangeTimeScale
    /**
     * 
     * @param {number} _value - scale value.
     */
    ChangeTimeScale(_value) {
        this.frontWheel.body.timeScale = _value;
        this.rearWheel.body.timeScale = _value;
        this.body.body.timeScale = _value;
    }
    //#endregion

    //#region -ControlUpdate
    ControllUpdate() {
        if (this.paddle.left && !Constant.isPaused) { //back
            let speed = this.frontWheel.body.angularSpeed <= 0 ? this.maxSpeedBackward / 10 : this.frontWheel.body.angularSpeed + this.accelerationBackward;
            if (speed >= this.maxSpeedBackward) speed = this.maxSpeedBackward;
            this.scene.matter.setAngularVelocity(this.frontWheel.body, -speed);
            this.scene.matter.setAngularVelocity(this.rearWheel.body, -speed);
        }
        else if (this.paddle.right && !Constant.isPaused) { //forward
            let speed = this.rearWheel.body.angularSpeed <= 0 ? this.maxSpeed / 10 : this.rearWheel.body.angularSpeed + this.acceleration;
            if (speed >= this.maxSpeed) speed = this.maxSpeed;
            this.scene.matter.setAngularVelocity(this.rearWheel.body, speed);
            this.scene.matter.setAngularVelocity(this.frontWheel.body, speed);
        }
    }
    //#endregion

    //#region -Resize
    /**
     * 
     * @param {number} newWidth 
     * @param {number} newHeight 
     * @param {number} newScale 
     */
    Resize(newWidth, newHeight, newScale) {
        this.x = 150 * newScale;
        this.y = this.refObject.y - this.refObject.displayHeight / 2 - (30 * newScale);

        this.width = 283 * newScale;
        this.height = 140 * newScale;
        this.wheelOffset = {
            "x": 75 * newScale,
            "y": 70 * newScale,
        }
        this.frontWheelOffset = this.width / 2 - this.wheelOffset.x;
        this.rearWheelOffset = -this.width / 2 + this.wheelOffset.x;
        this.wheelRadius = 41.5 * newScale;

        this.body.setScale(newScale);
        this.frontWheel.setScale(newScale);
        this.rearWheel.setScale(newScale);

        if (Constant.isFirstResize) {
            this.body.setPosition(this.x, this.y);
            this.frontWheel.setPosition(this.x + this.frontWheelOffset, this.y + this.wheelOffset.y);
            this.rearWheel.setPosition(this.x + this.rearWheelOffset, this.y + this.wheelOffset.y);

        } else {
            this.body.y = this.y;
            this.frontWheel.y = this.y + this.wheelOffset.y;
            this.rearWheel.y = this.y + this.wheelOffset.y;
        }
        this.constraintA.pointA = { x: this.frontWheelOffset, y: this.wheelOffset.y };
        this.constraintB.pointA = { x: this.rearWheelOffset, y: this.wheelOffset.y };
    }
    //#endregion
}