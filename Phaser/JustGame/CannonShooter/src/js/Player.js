import { Constant } from "./Constant";
import Bullet from "./Bullet";

export default class Player {
    constructor(scene) {
        this.scene = scene;
        this.magazineSpace = 80;
        this.bulletArray = [];
        this.bulletIndex = 0;
        this.create();
    }
    create() {
        this.mousePointer = this.scene.input.activePointer;
        this.PlayerProperties();
        this.BulletMagazine();
        this.BulletFire();
    }
    update() {
        this.ChangeAngle(this.mousePointer);
    }

    PlayerProperties() {

        this.shape = this.scene.add.circle(Constant.game.config.width / 2, Constant.game.config.height / 2, 200, 0xffffff);

        this.playerBody = this.scene.physics.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'player_body').setScale(Constant.scaleFactor * 1).setDepth(1);
        this.player = this.scene.physics.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'player_head').setScale(Constant.scaleFactor * 1).setDepth(1).setOrigin(0, 0.5);
        this.player.setCollideWorldBounds(true).setSize(this.playerBody.width, this.playerBody.height);
        this.playerBody.setCollideWorldBounds(true);

        this.mask = this.shape.createBitmapMask();
        this.playerBody.mask = this.mask;

        const graphics = this.scene.add.graphics();
        graphics.lineStyle(2, 0xfffffff);
        graphics.strokeRect(Constant.game.config.width / 2.2, Constant.game.config.height / 2.5, 200, 200);

    }
    ChangeAngle(pointer) {

        let playerAngle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.worldX, pointer.worldY);
        this.player.rotation = playerAngle;
    }
    BulletMagazine() {
        for (let index = 0; index < this.magazineSpace; index++) {

            let bullet = new Bullet(this.scene, this);
            this.bulletArray.push(bullet);
        }
    }
    BulletFire() {
        this.scene.input.on('pointerdown', () => {
            if (!this.scene.gamePause) {
                this.bulletArray[this.bulletIndex].OnVisible();
                this.bulletArray[this.bulletIndex].SetFirePos();
                this.scene.physics.moveTo(this.bulletArray[this.bulletIndex].bullet, this.mousePointer.x, this.mousePointer.y, 1000);
                this.bulletIndex++;
                if (this.bulletIndex >= this.bulletArray.length - 1) {
                    this.bulletIndex = 0;
                }
            }

        }, this);
    }
    PlayerMovement() {
        if (this.scene.top) {
            this.player.y -= 2;
            this.playerBody.y -= 2;
            this.shape.y -= 2;


        }
        if (this.scene.down) {
            this.player.y += 2;
            this.playerBody.y += 2;
            this.shape.y += 2;
        }
        if (this.scene.left) {
            this.player.x -= 2;
            this.playerBody.x -= 2;
            this.shape.x -= 2;

        }
        if (this.scene.right) {
            this.player.x += 2;
            this.playerBody.x += 2;
            this.shape.x += 2;
        }
    }
}

