import { Constant } from "../../Constant";
import MatterImage from "../../gameObjectsClass/MatterImage";

export default class MagicHat {
    constructor(scene, _hatConfig, _index) {
        this.scene = scene;
        this.hatConfig = _hatConfig;
        this.currWidth = null;
        this.currHeight = null;
        this.currScale = null;
        this.index = _index;
        this.isPortalOn = null;
        this.create();
    }
    create() {
        this.isPortalOn = true;
        this.magicHat = new MatterImage(this.scene, 0, 0, 'magic_hat', null, { isStatic: true });
        this.magicHat.setBody({
            type: 'rectangle',
            width: 100,
            height: 20,
        }, { isStatic: true, isSensor: true });
        this.magicHat.setAngle(this.hatConfig.angle[this.index]);
        this.magicHat.setOnCollideWith(this.scene.candy.body, (body, collisionData) => {
            if (this.isPortalOn) {
                const candyBody = this.scene.candy.body;
                this.isPortalOn = false;
                if (this.hatConfig.magicDirection.x[this.index] !== 0) {
                    this.HatCollisionXFunc(candyBody.velocity.x);
                }
                else {
                    this.HatCollisionYFunc(candyBody.velocity.y);
                }
                this.portalTimeOut =
                    setTimeout(() => {
                        this.isPortalOn = true;
                    }, 1000);
            }
        });
        Constant.game.events.once('evtGameRestart', () => {
            if (this.portalTimeOut !== undefined) {
                clearTimeout(this.portalTimeOut);
            }
            if (this.candyCollisionTimeout !== undefined) {
                clearTimeout(this.candyCollisionTimeout);
            }
        }, this);
    }
    HatCollisionXFunc(_velocityX) {
        // console.log('magicX');
        if (this.hatConfig.magicDirection.x[this.index] > 0) {
            if (_velocityX > 0) {
                this.HatCollisionHandle();
            }
        }
        else {
            if (_velocityX < 0) {
                this.HatCollisionHandle();
            }
        }
    }
    HatCollisionYFunc(_velocityY) {
        // console.log('magicY');
        if (this.hatConfig.magicDirection.y[this.index] > 0) {
            if (_velocityY > 0) {
                this.HatCollisionHandle();
            }
        }
        else {
            if (_velocityY < 0) {
                this.HatCollisionHandle();
            }
        }
    }
    HatCollisionHandle() {
        console.log('candy', this.scene.candy);
        if (this.scene.candy.texture.key === "spiderBubble") {
            this.scene.bubbleAnimArray.forEach(element => {
                element.setVisible(false);
            });
        }
        this.RemoveCandyConstraint();
        this.scene.candy.setVisible(false);
        this.scene.candy.setVelocity(0, 0);
        this.candyCollisionTimeout =
            setTimeout(() => {
                this.scene.candy.setPosition((this.currWidth / 2) + (this.hatConfig.reachedPos.x[this.index] * this.currScale), (this.currHeight / 2) + (this.hatConfig.reachedPos.y[this.index] * this.currScale));
                this.scene.candy.setVisible(true);
                this.scene.candy.setVelocity(this.hatConfig.reachedVelocity.x[this.index] * this.currScale, this.hatConfig.reachedVelocity.y[this.index] * this.currScale);
                if (this.scene.candy.texture.key === "spiderBubble") {
                    this.scene.bubbleAnimArray.forEach(element => {
                        element.setVisible(true);
                    });
                }
            }, 500);
    }

    RemoveCandyConstraint() {
        this.scene.RemoveCandyConstraint();
    }

    Resize(newWidth, newHeight, newScale) {
        this.currWidth = newWidth;
        this.currHeight = newHeight;
        this.currScale = newScale;
        this.magicHat.setScale(newScale * 1.5);
        this.magicHat.setPosition((newWidth / 2) + (this.hatConfig.pos.x[this.index] * newScale), (newHeight / 2) + (this.hatConfig.pos.y[this.index] * newScale));
        this.magicHat.body.position.x += (this.hatConfig.bodyOffset.x[this.index] * newScale);
        this.magicHat.body.position.y += (this.hatConfig.bodyOffset.y[this.index] * newScale);
    }
}