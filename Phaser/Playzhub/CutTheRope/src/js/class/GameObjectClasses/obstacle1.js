import MatterImage from "../../gameObjectsClass/MatterImage";

export default class Obstacle1 {
    constructor(scene, obsCount, obsAngle) {
        this.scene = scene;
        this.obsCount = obsCount;
        this.obsAngle = obsAngle;
        this.obsArray = null;
        this.newScale = null;
        this.obsTween = null;
        this.create();
    }
    create() {
        this.obsArray = [];
        for (let index = 0; index < this.obsCount; index++) {
            let obs = new MatterImage(this.scene, 0, 0, 'obs1', null, { isStatic: true, isSensor: false });
            obs.setOnCollideWith(this.scene.candy.body, (body, collisionData) => {
                if (!this.scene.isGameOver) {
                    this.scene.ObstacleGameOverHandle();
                }
            });
            obs.setAngle(this.obsAngle);
            this.obsArray.push(obs);
        }
    }
    ObsTweenControl(_direction, _time, _endPos) {
        console.log('tweenData', _direction, _time, _endPos);
        this.obsTween = this.scene.tweens.add({
            targets: this.obsArray,  // Array of objects as the targets             
            x: (obj) => obj.x + (_endPos.x * this.newScale),             // Final x position for all objects
            y: (obj) => obj.y + (_endPos.y * this.newScale),             // Final y position for all objects
            duration: _time,      // Time it takes to move to the target position (in milliseconds)
            yoyo: true,          // Enable yoyo effect, objects move back to their initial positions
            repeat: -1,          // Repeat indefinitely
            ease: 'Sine.easeInOut', // Easing function for smooth transition
        });
    }
    ObsTweenRemove() {
        this.obsTween.stop();
        this.obsTween.remove();
        this.obsTween = null;
    }
    Resize(newWidth, newHeight, newScale, obsStartPos, index, _offsetX, _offsetY) {
        let offsetX = 0;
        let offsetY = 0;
        this.newScale = newScale;
        for (let i = 0; i < this.obsArray.length; i++) {
            this.obsArray[i].SetScale(newScale);
            this.obsArray[i].SetPosition(newWidth / 2 + (obsStartPos.x[index] * newScale) + (offsetX * newScale), newHeight / 2 + obsStartPos.y[index] * newScale + (offsetY * newScale));
            offsetX += _offsetX;
            offsetY += _offsetY;
        }
    }
}