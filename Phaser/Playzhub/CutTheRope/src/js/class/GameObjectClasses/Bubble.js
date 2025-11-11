import { Constant } from "../../Constant";
import MatterImage from "../../gameObjectsClass/MatterImage";
import Texture from "../../gameObjectsClass/Texture";

export default class Bubble {
    constructor(scene, _isVelocityChange) {
        this.scene = scene;
        this.bubbleIsAnim = null;
        this.bubbleIndex = null;
        this.isVelocityChange = _isVelocityChange;
        this.create();
    }
    create() {
        this.bubbleIsAnim = false;
        this.bubble = new MatterImage(this.scene, 0, 0, 'bubble', null, { isStatic: true, isSensor: true });
        this.bubble.SetOrigin(0.5);
        this.bubbleShadow = new Texture(this.scene, 0, 0, 'bubble-shadow');
        this.bubbleShadow.setOrigin(0.5, 0.45);
        this.CheckCollision();
    }
    CheckCollision() {
        this.bubble.setOnCollideWith(this.scene.candy.body, (body, collisionData) => {
            this.scene.candy.setTexture('spiderBubble').setScale(this.scene.candy.scale);
            if (this.isVelocityChange) {
                this.scene.candy.setVelocity(0, 0);
            }
            this.scene.BubbleAnimOn(this.bubbleIndex);
            this.scene.matter.world.engine.gravity.y = -(Constant.clientHeight / 9000);
            this.bubbleIsAnim = true;
            Constant.bulletSpeed = Constant.clientWidth / 154.28;
            this.bubble.destroy();
        });
    }
    Resize(newWidth, newHeight, newScale, index) {
        this.bubbleIndex = index;
        this.bubble.setScale(newScale);
        this.bubble.setPosition(newWidth / 2 + (this.scene.currentLevel.bubblePosition.x[index] * newScale), newHeight / 2 + (this.scene.currentLevel.bubblePosition.y[index] * newScale));
        this.bubbleShadow.setScale(newScale);
        this.bubbleShadow.copyPosition(this.bubble);
    }
    Onupdate() {
        if (this.bubbleIsAnim) {
            this.scene.bubbleAnimArray[this.bubbleIndex].copyPosition(this.scene.candy);
        }
    }
}