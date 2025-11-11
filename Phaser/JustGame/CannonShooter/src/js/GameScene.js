import { Constant } from "./Constant";
import Player from "./Player";
import Obstacle from "./Obstacle";
import GameOver from "./popups/GameOverPopup";
import { log, log2 } from "three/examples/jsm/nodes/Nodes.js";


export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');

    }
    create() {
        this.PriorityData();
        this.ParalaxControl();

        this.bg = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'paralax_bg').setDisplaySize(Constant.game.config.width, Constant.game.config.height);
        this.scText = this.add.text(Constant.game.config.width / 1.116, Constant.game.config.height / 10.8, 'Score  0', { fontFamily: 'Howli-SansOne', fontSize: 80 }).setOrigin(0.5).setScale(Constant.scaleFactor);
        this.SetBoundaryforBullets();
        this.canon = new Player(this);
        this.camera.setZoom(1);
        this.camera.setBounds(0, 0, Constant.game.config.width, Constant.game.config.height);
        this.camera.startFollow(this.canon.player, false, 0.1, 0.1, 0, 0);
        this.ObstacleController();
        this.physics.moveToObject(this.obsArray[0].tankObstacle, this.canon.player, this.obsSpeed);
        this.gameoverPopup = new GameOver(this);
        const overlay = this.add.graphics();
        overlay.fillStyle(0x00000, 1);

    }
    PriorityData() {
        this.camera = this.cameras.main
        this.left = false, this.right = false, this.down = false, this.top = false;
        this.obsArray = [];
        this.obstaclepoolIndex = 1;
        this.activeObs = 10;
        this.score = 0;
        this.obsSpeed = 100;
        this.paralaxObsSpeed = this.obsSpeed + (this.obsSpeed * (20 / 100));
        this.gamePause = false;
        this.obsX, this.obsY = null

    }
    SetBoundaryforBullets() {
        this.collider1 = this.physics.add.image(Constant.game.config.width / 2, -100, 'collider').setScale(Constant.game.config.width * Constant.scaleFactor, Constant.scaleFactor * 40);
        this.collider2 = this.physics.add.image(Constant.game.config.width / 2, Constant.game.config.height / 0.915, 'collider').setScale(Constant.game.config.width * Constant.scaleFactor, Constant.scaleFactor * 40);
        this.collider3 = this.physics.add.image(Constant.game.config.width / 0.95, Constant.game.config.height / 2, 'collider').setScale(40 * Constant.scaleFactor, Constant.scaleFactor * Constant.game.config.height);
        this.collider4 = this.physics.add.image(-100, Constant.game.config.height / 2, 'collider').setScale(40 * Constant.scaleFactor, Constant.scaleFactor * Constant.game.config.height);
    }
    ObstacleController() {
        for (let index = 0; index < this.activeObs; index++) {
            this.ObstaclePosition();

            let obs = new Obstacle(this, this.obsX, this.obsY);
            this.obsArray.push(obs);

        }
    }
    ObstaclePosition() {
        let random = parseInt(Phaser.Math.Between(1, 4));
        switch (random) {
            case 1:
                this.obsX = Phaser.Math.Between(0, Constant.game.config.width);
                this.obsY = -300;
                break;
            case 2:
                this.obsX = Phaser.Math.Between(0, Constant.game.config.width);
                this.obsY = Constant.game.config.height / 0.78;
                break;
            case 3:
                this.obsX = -300;
                this.obsY = Phaser.Math.Between(0, Constant.game.config.height);
                break;
            case 4:
                this.obsX = Constant.game.config.width / 0.86;
                this.obsY = Phaser.Math.Between(0, Constant.game.config.height);
                break;
        }
    }
    ParalaxControl() {
        let keyObj1 = this.input.keyboard.addKey('W');
        keyObj1.on('down', () => {
            this.top = true;
        }, this);
        let keyObj2 = this.input.keyboard.addKey('A');
        keyObj2.on('down', () => {
            this.left = true;
        }, this);
        let keyObj3 = this.input.keyboard.addKey('S');
        keyObj3.on('down', () => {
            this.down = true;
        }, this);
        let keyObj4 = this.input.keyboard.addKey('D');
        keyObj4.on('down', () => {
            this.right = true;
        }, this);


        keyObj1.on('up', () => {
            this.ParalaxOff();
        }, this);
        keyObj2.on('up', () => {
            this.ParalaxOff();
        }, this);
        keyObj3.on('up', () => {
            this.ParalaxOff();
        }, this);
        keyObj4.on('up', () => {
            this.ParalaxOff();
        }, this);

    }
    ParalaxOff() {
        this.left = false, this.right = false, this.down = false, this.top = false;

    }
    ParalaxOn() {
        if (this.top) {
            this.bg.tilePositionY -= 2.5;
        }
        if (this.down) {
            this.bg.tilePositionY += 2.5;
        }
        if (this.left) {
            this.bg.tilePositionX -= 2.5;
        }
        if (this.right) {
            this.bg.tilePositionX += 2.5;
        }
    }
    update() {
        if (!this.gamePause) {
            this.canon.update();
        }
        this.canon.PlayerMovement()
        // this.ParalaxOn();

        this.obsArray.forEach(element => {
            element.ActiveObstacleSpeedController();
            element.ObstacleRotation();

        });
    }
}