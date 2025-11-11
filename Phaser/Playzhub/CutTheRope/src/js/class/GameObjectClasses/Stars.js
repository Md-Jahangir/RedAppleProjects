// import { Constant } from "../../Constant";
import MatterImage from "../../gameObjectsClass/MatterImage";
// import { Utils } from "../Utils";

export default class Stars {
    constructor(scene) {
        this.scene = scene;
        this.stars = null;
        this.currentScale = null;
        this.create();
    }
    create() {
        this.stars = [];
        // let newScale = Utils.getScale(1080, 1920, Constant.clientWidth, Constant.clientHeight);
        for (let index = 1; index <= 3; index++) {
            let star = new MatterImage(this.scene, 0, 0, 'star', null, { /*isStatic: true, isSensor: true */ });
            star.setCircle(star.displayWidth / 3, { isStatic: true, isSensor: true });
            star.setDepth(1);
            this.stars.push(star);
        }
        this.CheckCollision();
    }
    CheckCollision() {
        this.stars.forEach(element => {
            element.setOnCollideWith(this.scene.candy.body, (body, collisionData) => {
                if (!this.scene.isGameOver) {
                    // console.log('--------StarCount');
                    this.StarCollectAnim(element);
                    // Remove the collision listener after it is triggered once
                    element.setOnCollideWith(this.scene.candy.body, null);
                }
            });
        });
    }
    StarCollectAnim(_star) {
        this.scene.tweens.add({
            targets: _star,
            x: this.scene.starBar.x, // Move the star to the player's position + offset
            y: this.scene.starBar.y, // Same for the y-axis
            scaleX: 0.5 * this.currentScale, // Animate scale in the X direction (double the width)
            scaleY: 0.5 * this.currentScale, // Animate scale in the Y direction (double the height)
            duration: 500, // Duration of the tween in milliseconds
            ease: 'Power2', // Easing function (optional)
            onComplete: () => {
                if (this.scene.starCount !== -1) {
                    this.scene.starCount++;
                }
                else {
                    this.scene.starCount += 2;
                }
                this.scene.UpdateScore(this.scene.starCount);
                _star.destroy();
            }
        });
    }
    Resize(newWidth, newHeight, newScale) {
        this.currentScale = newScale;
        this.stars.forEach(element => {
            element.SetScale(newScale);
        });
        this.stars[0].SetPosition(newWidth / 2 + this.scene.currentLevel.star1.x * newScale, newHeight / 2 + this.scene.currentLevel.star1.y * newScale);
        this.stars[1].SetPosition(newWidth / 2 + this.scene.currentLevel.star2.x * newScale, newHeight / 2 + this.scene.currentLevel.star2.y * newScale);
        this.stars[2].SetPosition(newWidth / 2 + this.scene.currentLevel.star3.x * newScale, newHeight / 2 + this.scene.currentLevel.star3.y * newScale)
    }
}