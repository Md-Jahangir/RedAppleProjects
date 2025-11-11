import { Constant } from "../../Constant";
import MatterImage from "../../gameObjectsClass/MatterImage";
import { Utils } from "../Utils";

export default class RunTimeDragRope {
    constructor(scene, _dragRopeConfig, _index, _areaRadious) {
        this.scene = scene;
        this.index = _index;
        this.dragRopeConfig = _dragRopeConfig;
        this.constraintsArray = null;
        this.bodyArray = null;
        this.constraintsLength = null;
        this.graphics = null;
        this.areaRadious = _areaRadious;
        this.create();
    }
    create() {
        let width, repeatWidth;
        let height, repeatHeight;
        if (this.dragRopeConfig.isHorizontal[this.index]) {
            width = this.dragRopeConfig.width[this.index];
            height = this.dragRopeConfig.height[this.index];

            repeatWidth = width / 2;
            repeatHeight = 1;
        }
        else {
            width = this.dragRopeConfig.height[this.index];
            height = this.dragRopeConfig.width[this.index];

            repeatWidth = 1;
            repeatHeight = height / 2;
        }

        let newScale = Utils.getScale(1080, 1920, Constant.clientWidth, Constant.clientHeight);
        this.newScale = newScale;
        this.dragRopeSlider = this.scene.add.nineslice((Constant.clientWidth / 2) + (this.dragRopeConfig.x[this.index] * newScale), (Constant.clientHeight / 2) + (this.dragRopeConfig.y[this.index] * newScale), 'slider_obj', '', width * newScale, height * newScale, repeatWidth * newScale, repeatWidth * newScale, repeatHeight * newScale, repeatHeight * newScale).setOrigin(0.5, 0.5);

        this.ropeArea = new MatterImage(this.scene, this.dragRopeSlider.x + (this.dragRopeConfig.offsetX[this.index] * newScale), this.dragRopeSlider.y + (this.dragRopeConfig.offsetY[this.index] * newScale), this.areaRadious, null, { /*isStatic: true, isSensor: true */ });
        this.ropeArea.setCircle(this.ropeArea.displayWidth / 2, { isStatic: true, isSensor: true });

        this.dragRopeHead = new MatterImage(this.scene, this.dragRopeSlider.x + (this.dragRopeConfig.offsetX[this.index] * newScale), this.dragRopeSlider.y + (this.dragRopeConfig.offsetY[this.index] * newScale), 'rope-head1', null, { isStatic: true, isSensor: true });
        this.dragRopeHead.setData('name', 'runTimeDragRopeHead' + this.index);
        this.dragRopeHead.setInteractive({ draggable: true }).setDepth(2);

        this.scene.input.on('drag', (pointer, _gameObject, _dragX, _dragY) => {
            if (_gameObject.getData('name') === 'runTimeDragRopeHead' + this.index) {
                this.scene.isRopeDragging = true;
                this.scene.ropeCutter.setPosition(0, 0);
                if (this.dragRopeConfig.isHorizontal[this.index]) {
                    _dragX = Phaser.Math.Clamp(_dragX, ((this.dragRopeConfig.widthRange.minWidth[this.index] * newScale) + _gameObject.displayWidth / 2), ((this.dragRopeConfig.widthRange.maxWidth[this.index] * newScale) - _gameObject.displayWidth / 2));
                    _gameObject.x = Math.round(_dragX);
                    this.ropeArea.x = _gameObject.x;
                }
                else {
                    _dragY = Phaser.Math.Clamp(_dragY, ((this.dragRopeConfig.widthRange.minWidth[this.index] * newScale) - _gameObject.displayWidth / 2), ((this.dragRopeConfig.widthRange.maxWidth[this.index] * newScale) + _gameObject.displayWidth / 2));
                    _gameObject.y = Math.round(_dragY);
                    this.ropeArea.x = _gameObject.x;
                }
            }
        });
        this.scene.input.on('dragend', (pointer, gameObject) => {
            console.log("Drag ended");
            this.scene.isRopeDragging = false;
        });
        this.isVisibleRope = false;
        this.ropeArea.setOnCollideWith(this.scene.candy.body, (body, collisionData) => {
            if (!this.isVisibleRope) {
                // this.scene.matter.world.pause();
                // setTimeout(() => {
                //     this.scene.matter.world.resume();
                // }, 2000);
                this.RuntimeDragRopeCreate(newScale);
                this.isVisibleRope = true;
            }
        });
    }
    RuntimeDragRopeCreate(newScale) {
        this.cutIndex = null;
        this.constraintsArray = [];
        this.bodyArray = [];
        this.graphicsAlpha = 1;

        for (let index = 0; index < this.dragRopeConfig.dragRopebodyCount[this.index]; index++) {
            let body = this.scene.matter.add.circle((this.scene.candy.x + this.dragRopeHead.x) / 2, (this.scene.candy.y + this.dragRopeHead.y) / 2, 1 * newScale, { isStatic: false, label: 'body' + index, isSensor: true });
            body.setOnCollideWith(this.scene.ropeCutter.body, (body, collisionData) => {
                this.CollisionDetect(collisionData.bodyA.label === 'temp' ? collisionData.bodyB : collisionData.bodyA);
            });
            this.bodyArray.push(body);
        }
        this.constraintsArray.push(this.scene.matter.add.constraint(this.dragRopeHead, this.bodyArray[0], 90 * newScale, 1.4, /*{ pointA: { x: 0, y: 65 } }*/));

        for (let i = 0; i < this.bodyArray.length - 1; i++) {
            let constraint = this.scene.matter.add.constraint(this.bodyArray[i], this.bodyArray[i + 1], 20 * newScale, 1.5, /*{ pointA: { x: 0, y: 0 } }*/);
            // constraint.damping = 0.2
            this.constraintsArray.push(constraint);
        }
        this.constraintsArray.push(this.scene.matter.add.constraint(this.bodyArray[this.bodyArray.length - 1], this.scene.candy, 90 * newScale, 1.4, /*{ pointA: { x: 0, y: 0 } }*/));
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
        }
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
    Resize(newWidth, newHeight, newScale) {
        this.dragRopeSlider.setSize((this.dragRopeConfig.width[this.index]) * newScale, (this.dragRopeConfig.height[this.index]) * newScale);
        this.dragRopeSlider.setPosition((newWidth / 2) + (this.dragRopeConfig.x[this.index] * newScale), (newHeight / 2) + (this.dragRopeConfig.y[this.index] * newScale))
        this.dragRopeHead.setScale(newScale);
        this.dragRopeHead.SetPosition((newWidth / 2) + ((this.dragRopeConfig.x[this.index] + this.dragRopeConfig.offsetX[this.index]) * newScale), (newHeight / 2) + ((this.dragRopeConfig.y[this.index] + this.dragRopeConfig.offsetY[this.index]) * newScale));
        this.ropeArea.setScale(newScale);
        this.ropeArea.copyPosition(this.dragRopeHead);
    }
    Onupdate() {
        if (this.isVisibleRope) {
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
}