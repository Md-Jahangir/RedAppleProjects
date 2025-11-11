import MatterImage from "../../gameObjectsClass/MatterImage";

export default class BouncyObs {
    constructor(scene, _Xforce, _Yforce, _objSize, _angle) {
        this.scene = scene;
        this.xForce = _Xforce;
        this.yForce = _Yforce;
        this.objSize = _objSize;
        this.angle = _angle;
        this.currScale = null;
        this.create();
    }
    create() {
        console.log('bouncy obs');
        this.bouncyObs = new MatterImage(this.scene, 0, 0, this.objSize, null, { isStatic: true });
        this.bouncyObs.setBody({
            type: 'rectangle',
            width: 128,
            height: 64
        }, { isStatic: true });
        this.bouncyObs.setAngle(this.angle);
        this.bouncyObs.setOnCollideWith(this.scene.candy.body, (body, collisionData) => {
            if (!this.scene.isGameOver) {
                this.SpiderBounceMove();
            }
        });
    }
    SpiderBounceMove() {
        this.scene.candy.setVelocity(this.xForce * this.currScale, this.yForce * this.currScale);
    }
    Resize(newWidth, newHeight, newScale, _x, _y) {
        this.currScale = newScale;
        this.bouncyObs.setScale(newScale * 2);
        this.bouncyObs.setPosition(newWidth / 2 + _x * newScale, newHeight / 2 + _y * newScale);
    }
}