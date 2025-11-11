import MatterImage from "../../gameObjectsClass/MatterImage";

export default class Frog {
    constructor(scene, gameOption) {
        this.scene = scene;
        this.gameOption = gameOption;
        this.currentScale = null;
        this.create();
    }
    create() {
        this.frog = new MatterImage(this.scene, 0, 0, 'frog', null, { /*isStatic: true, shape: this.chamaeleonShape*/ });
        // this.frog.setCircle(this.frog.displayWidth * 4, { isStatic: true, isSensor: true });
        this.frog.setRectangle(this.frog.displayWidth * 5, this.frog.displayHeight * 4, { isStatic: true, isSensor: true });
        this.frog.body.label = 'chamaeleon';
        this.chamaeleon = this.scene.add.spine(0, 0, 'game_anim');
        this.chamaeleon.setAnimation(0, 'idle', true);

        // this.frontBush = new MatterImage(this.scene, 0, 0, 'front-bush', null, { isStatic: true, isSensor: true });
        // this.frontBush.setOrigin(0.5, 1)

        this.CheckCollision();
    }
    CheckCollision() {
        this.frog.setOnCollideWith(this.scene.candy.body, (body, collisionData) => {
            if (!this.scene.isGameOver) {
                this.scene.CheckGameOver();
                this.CandyAnim();
                this.chamaeleon.setAnimation(0, "eating", false);
                this.chamaeleon.on('complete', () => {
                    this.chamaeleon.setAnimation(0, "chew", true);
                    this.chamaeleon.off('complete', null, this);
                }, this);
            }
            // if (!this.scene.isGameOver) {
            //     // this.scene.isGameOver = true;
            //     this.scene.matter.world.pause();
            //     // this.scene.GameOverPopup.VisibleControl(true, this.scene.starCount, this.scene.level);
            //     this.scene.stars[this.scene.level] = Math.max(this.scene.stars[this.scene.level], this.scene.starCount);
            //     if (this.scene.stars[this.scene.level + 1] != undefined && this.scene.stars[this.scene.level + 1] == -1 && (this.scene.level < 9)) {
            //         this.scene.stars[this.scene.level + 1] = 0;
            //     }
            //     localStorage.setItem(this.gameOption.localStorageName, this.scene.stars.toString());
            // }
        });
    }
    CandyAnim() {
        this.scene.RopeVisibleCntrol();
        this.scene.tweens.add({
            targets: this.scene.candy, // The object you're applying the tween to
            x: this.chamaeleon.x,                  // New x position
            y: this.chamaeleon.y - (210 * this.currentScale),                  // New y position
            scaleX: 0.5 * this.currentScale,               // New scale for the X axis (double size)
            scaleY: 0.5 * this.currentScale,               // New scale for the Y axis (double size)
            duration: 500,          // Duration of the tween (in milliseconds)
            ease: 'Power2',          // Easing function for smooth transition
            onComplete: () => {      // Optional callback function when tween finishes
                this.scene.candy.setVisible(false);
            }
        });
    }
    Resize(newWidth, newHeight, newScale) {
        this.currentScale = newScale;
        this.frog.setScale((newScale * 0.1), (newScale * 0.1));
        this.frog.SetPosition(newWidth / 2 + this.scene.currentLevel.frogPosition.x * newScale, newHeight / 2 + this.scene.currentLevel.frogPosition.y * newScale);
        this.chamaeleon.setScale(newScale);
        this.chamaeleon.setPosition(newWidth / 2 + this.scene.currentLevel.frogPosition.x * newScale, newHeight / 2 + ((this.scene.currentLevel.frogPosition.y + 150) * newScale));
        // this.frontBush.setScale(newScale);
        // this.frontBush.SetPosition(newWidth / 2, newHeight);
    }
}