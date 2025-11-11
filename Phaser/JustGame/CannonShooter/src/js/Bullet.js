import { Constant } from "./Constant";
export default class Bullet {
    constructor(scene, playerScene) {
        this.scene = scene;
        this.playerScene = playerScene;
        this.create();
    }
    create() {
        this.bullet = this.scene.physics.add.image(-500, -500, 'bullet').setVisible(false).setScale(0.02 * Constant.scaleFactor);
        this.scene.physics.add.overlap(this.bullet, [this.scene.collider1, this.scene.collider2, this.scene.collider3, this.scene.collider4], this.BulletHandler, null, this);

    }
    OnVisible() {
        this.bullet.setVisible(true);

    }
    OffVisible() {
    }
    BulletHandler() {

        if (!this.scene.gamePause) {
            this.OffVisible();
            this.RePositionBullet();
        }

    }
    SetFirePos() {

        this.bullet.x = this.playerScene.player.x + Math.cos(this.playerScene.player.rotation) * (Constant.game.config.width / 48);
        this.bullet.y = this.playerScene.player.y + Math.sin(this.playerScene.player.rotation) * (Constant.game.config.height / 27);

    }
    RePositionBullet() {
        this.bullet.x = -500;
        this.bullet.y = -500;
        this.bullet.setVelocity(0);
        console.log('hit');
    }
}