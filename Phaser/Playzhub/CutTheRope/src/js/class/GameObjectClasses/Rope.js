import { Constant } from "../../Constant";
import MatterImage from "../../gameObjectsClass/MatterImage";
import { Utils } from "../Utils";
import RopeEnemy from "./RopeEnemy";

export default class Rope {
    constructor(scene, bodyCount, isRopeEnemy) {
        this.scene = scene;
        this.bodyCount = bodyCount
        this.constraintsArray = null;
        this.bodyArray = null;
        this.constraintsLength = null;
        this.graphics = null;
        this.isRopeEnemy = isRopeEnemy;

        this.create();
    }
    create() {
        this.cutIndex = null;
        this.constraintsArray = [];
        this.bodyArray = [];
        this.graphicsAlpha = 1;

        let newScale = Utils.getScale(1080, 1920, Constant.clientWidth, Constant.clientHeight);
        this.newScale = newScale;
        this.ropeHead1 = new MatterImage(this.scene, 0, 0, 'rope-head1', null, { isStatic: true, isSensor: true });
        this.ropeHead1.setDepth(2);
        // this.ropeHead2 = new MatterImage(this.scene, 0, 0, 'rope-head2', null, { isStatic: true, isSensor: true });

        for (let index = 0; index < this.bodyCount; index++) {
            let body = this.scene.matter.add.circle(Constant.clientWidth / 2 + this.scene.currentLevel.ropestartPos.x * newScale, Constant.clientHeight / 2 + this.scene.currentLevel.ropestartPos.y * newScale, 1 * newScale, { isStatic: false, label: 'body' + index, isSensor: true });
            body.setOnCollideWith(this.scene.ropeCutter.body, (body, collisionData) => {
                this.CollisionDetect(collisionData.bodyA.label === 'temp' ? collisionData.bodyB : collisionData.bodyA);
            });
            this.bodyArray.push(body);
        }
        this.constraintsArray.push(this.scene.matter.add.constraint(this.ropeHead1, this.bodyArray[0], 90 * newScale, 1.4, /*{ pointA: { x: 0, y: 65 } }*/));

        for (let i = 0; i < this.bodyArray.length - 1; i++) {
            let constraint = this.scene.matter.add.constraint(this.bodyArray[i], this.bodyArray[i + 1], 20 * newScale, 1.5, /*{ pointA: { x: 0, y: 0 } }*/);
            // constraint.damping = 0.2
            this.constraintsArray.push(constraint);
        }
        this.constraintsArray.push(this.scene.matter.add.constraint(this.bodyArray[this.bodyArray.length - 1], this.scene.candy, 90 * newScale, 1.4, /*{ pointA: { x: 0, y: 0 } }*/));
        if (this.isRopeEnemy === true) {
            this.ropeEnemy = new RopeEnemy(this, this.bodyArray, this.ropeHead1);
        }
    }
    CollisionDetect(body) {
        if (this.cutIndex == null && this.scene.isCutting) {
            let i = body.label;
            if (i.length == 5) {
                this.cutIndex = parseInt(i.charAt(i.length - 1));
            }
            else {
                let j = i.charAt(i.length - 2);
                let k = i.charAt(i.length - 1);
                this.cutIndex = parseInt(j + k);
            }
            this.scene.matter.world.removeConstraint(this.constraintsArray[this.cutIndex]);
            this.TransitionValueOverTime(0.5);
            this.RemoveCollision();
            if (this.isRopeEnemy === true) {
                this.ropeEnemy.StopEnemy();
            }
        }
    }
    RemoveCollision() {
        this.bodyArray.forEach(element => {
            element.isSensor = true;
        });
    }
    RemoveCandyConstraint() {
        if (this.cutIndex === null) {
            this.constraintsArray.forEach(element => {
                this.scene.matter.world.removeConstraint(element);
            });
        }
        this.graphicsAlpha = 0;
    }
    TransitionValueOverTime(durationInSeconds) {
        const initialValue = 1;
        const finalValue = 0.1;
        const steps = 10;
        let currentValue = initialValue;
        const stepValue = (initialValue - finalValue) / steps;
        const interval = durationInSeconds * 1000 / steps;
        const transitionInterval = setInterval(() => {
            currentValue -= stepValue;
            this.graphicsAlpha = currentValue.toFixed(2);
            if (currentValue < finalValue) {
                clearInterval(transitionInterval);
            }
        }, interval);
    }
    Resize(newWidth, newHeight, newScale, ropeNumber) {
        this.ropeHead1.SetScale(newScale * 0.75);
        this.ropeHead1.SetPosition((newWidth / 2) + this.scene.currentLevel.ropeHeadPosition.x[ropeNumber] * newScale, (newHeight / 2) + this.scene.currentLevel.ropeHeadPosition.y[ropeNumber] * newScale);
        // this.ropeHead2.SetScale(newScale);
        // this.ropeHead2.SetPosition(this.ropeHead1.x, this.ropeHead1.y);
        if (this.isRopeEnemy === true) {
            this.ropeEnemy.Resize(newWidth, newHeight, newScale);
        }
    }
    Onupdate() {
        if (this.isRopeEnemy) {
            this.ropeEnemy.Onupdate();
        }
        if (this.graphics != null) {
            this.graphics.clear();
        }
        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(1);
        const constraintLength = this.constraintsArray.length;
        const constraintElem = this.constraintsArray;
        for (let i = 0; i < constraintLength; i++) {
            if (this.cutIndex != i) {
                this.scene.matter.world.renderConstraint(constraintElem[i], this.graphics, 0xB2BEB5, this.graphicsAlpha, 6 * this.newScale, 1, null, 0);
            }
        }
    }
}