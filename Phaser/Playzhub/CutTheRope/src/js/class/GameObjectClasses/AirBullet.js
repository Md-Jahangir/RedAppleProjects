import { Constant } from "../../Constant";
import MatterImage from "../../gameObjectsClass/MatterImage";
import { Utils } from "../Utils";

export default class AirBullet {
    constructor(scene, index) {
        this.scene = scene;
        this.index = index;
        this.create();
    }
    create() {

        let newScale = Utils.getScale(1080, 1920, Constant.clientWidth, Constant.clientHeight)
        this.airgunArea = new MatterImage(this.scene, 0, 0, 'one-pixel', null, { label: 'gunrange' + this.index });
        this.airgunArea.setAlpha(0).setMass(0.01);
        this.airgunArea.setScale(newScale * 20, newScale * 30);
        this.airgunArea.SetPosition(Constant.clientWidth / 2 + this.scene.currentLevel.airgunArea.x[this.index] * newScale, Constant.clientHeight / 2 + this.scene.currentLevel.airgunArea.y[this.index] * newScale);
        this.airgunArea.setVelocityX(Constant.bulletSpeed * (this.scene.currentLevel.airgunVelocity[this.index]));
        this.airgunArea.setVelocity(Constant.bulletSpeed * (this.scene.currentLevel.airgunVelocity[this.index].x), Constant.bulletSpeed * (this.scene.currentLevel.airgunVelocity[this.index].y));
        this.airgunArea.setOnCollideWith(this.scene.candy, () => {
            this.airgunArea.destroy();
            // console.log("hit bullet");
        })
        this.airGunAreaTimeOut =
            setTimeout(() => {
                this.airgunArea.destroy();
                // console.log("destroy bullet");
            }, 2000)
        Constant.game.events.once('evtGameRestart', () => {
            clearTimeout(this.airGunAreaTimeOut);
        }, this);
    }
}