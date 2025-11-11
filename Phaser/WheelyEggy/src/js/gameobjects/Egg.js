import { Constant } from "../Constant";
import { Server } from "../Server";
import { SoundManager } from "../SoundManager";
export default class Egg {
    constructor(scene, _bojReference) {
        this.scene = scene;
        this.isDestroy = false;
        this.objReference = _bojReference;
        this.create();
    }
    //#region -Create
    create() {
        this.egg = this.scene.matter.add.image(0, 0, "egg", null, { shape: Constant.colliders.egg });
        this.lastDistanceText = this.scene.add.text(0, 0, this._distance + " m", { fontFamily: "LILITAONE", fontSize: 50 })
            .setOrigin(0.5)
            .setVisible(false);

        //Collission
        this.CheckingCollision();

        //for testing...
        // this.scene.matter.add.mouseSpring();
    }
    //#endregion

    //#region -CheckingCollision
    CheckingCollision() {
        this.scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if ((bodyA.label == "terrain" || bodyB.label == "terrain") && (bodyA.label == "egg" || bodyB.label == "egg")) {
                this.CrackingEgg();
                this.scene.events.emit("EggDestroy");
                let score = this.scene.distance.GetScore();
                setTimeout(() => {
                    this.scene.events.emit("GameOver");
                    Server.PlayerScoreUpdate(Constant.PlayerData.game_id, Constant.PlayerData.user_id, score);
                }, Constant.delayGameOver)
            }
        });
    }
    //#endregion

    //#region -CrackingEgg
    CrackingEgg() {
        SoundManager.PlayEggBrokenSound();
        this.BreakedEggSpawn();
        this.isDestroy = true;
        this.lastDistanceText.setText(this.scene.distance.GetScore() + "m");
        this.lastDistanceText.setPosition(this.egg.x - 50 * this.scale, this.egg.y - 50 * this.scale);
        this.lastDistanceText.setVisible(true);
        this.egg.destroy();
    }
    //#endregion

    //#region -BrokenEggSpawn
    BreakedEggSpawn() {
        this.crackedEggUpper = this.scene.matter.add.image(0, 0, "egg_crack_upper", null, { shape: Constant.colliders.egg_crack_upper })
            .setScale(this.scale)
            .setBounce(0.5)
            .setMass(10)
            .setPosition(this.egg.x - (this.egg.displayWidth / 2), this.egg.y)
            .setRotation(this.egg.rotation)
            .setDepth(0);
        this.crackedEggLower = this.scene.matter.add.image(0, 0, "egg_crack_lower", null, { shape: Constant.colliders.egg_crack_lower })
            .setScale(this.scale)
            .setBounce(0.5)
            .setMass(10)
            .setPosition(this.egg.x + (this.egg.displayWidth / 2), this.egg.y)
            .setRotation(this.egg.rotation)
            .setDepth(0);
    }
    //#endregion

    //#region -Resize
    Resize(newWidth, newHeight, newScale) {
        this.egg.setScale(newScale);
        this.lastDistanceText.setScale(newScale);

        if (Constant.isFirstResize) {
            this.egg.setPosition(150 * newScale, this.objReference.y - this.objReference.displayHeight / 2 - (110 * newScale));
        } else {
            this.egg.y = this.objReference.y - this.objReference.displayHeight / 2 - (110 * newScale);
        }
        this.scale = newScale;
    }
    //#endregion
}