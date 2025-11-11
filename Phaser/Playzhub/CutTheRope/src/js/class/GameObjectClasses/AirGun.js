// import MatterImage from "../gameObjectsClass/MatterImage";
import AirBullet from "./AirBullet";

export default class AirGun {
    constructor(scene, index) {
        this.scene = scene;
        this.index = index;
        this.create();
    }
    create() {
        // this.airgunArea = new MatterImage(this.scene, 0, 0, 'one-pixel', null, { isStatic: true, label: 'gunrange' + this.index });
        // this.airgunArea.setAlpha(0.2);
        // this.airgun = new MatterImage(this.scene, 0, 0, 'air-gun', null, { isSensor: true, isStatic: true });
        this.airgun = this.scene.add.spine(0, 0, 'baloon_anim');
        this.airgun.setAnimation(0, 'Ballon_idle', true);
        this.airgun.setAngle(this.scene.currentLevel.airgunAngle[this.index]).setInteractive();
        this.airgun.on('pointerup', () => {
            let airBullet = new AirBullet(this.scene, this.index);
            this.airgun.setAnimation(0, 'baloon_effect', false);
            this.airgun.on('complete', () => {
                this.airgun.setAnimation(0, "Ballon_idle", true);
                this.airgun.off('complete', null, this);
            }, this);
        })
    }
    Resize(newWidth, newHeight, newScale) {
        this.airgun.setScale(newScale);
        this.airgun.setPosition(newWidth / 2 + this.scene.currentLevel.airgunposition.x[this.index] * newScale, newHeight / 2 + this.scene.currentLevel.airgunposition.y[this.index] * newScale);
        // this.airgunArea.setScale(newScale * 100, newScale * 20);
        // this.airgunArea.SetPosition(newWidth / 2 + this.scene.currentLevel.airgunArea.x[this.index] * newScale, newHeight / 2 + this.scene.currentLevel.airgunArea.y[this.index] * newScale);
    }
    OnUpdate() {

    }
}