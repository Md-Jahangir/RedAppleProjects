import { Constant } from "./Constant";

export default class Obstacle {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.obsIndex = null;
        this.create();

    }
    create() {
        this.tankObstacle = this.scene.physics.add.image(this.x, this.y, 'tank_obs').setScale(Constant.scaleFactor * 0.16);
        this.obsXpos = this.tankObstacle.x;
        this.obsYpos = this.tankObstacle.y;
        this.scene.physics.add.overlap(this.tankObstacle, this.scene.canon.player, this.GameOverCall, null, this);
        this.ObstacleRotation();
        for (let index = 0; index < this.scene.canon.magazineSpace; index++) {

            this.scene.physics.add.overlap(this.tankObstacle, this.scene.canon.bulletArray[index].bullet, this.ObstacleController, null, this);
        }
    }
    ObstacleRotation() {
        let distance = Phaser.Math.Distance.Between(this.tankObstacle.x, this.tankObstacle.y, this.scene.canon.player.x, this.scene.canon.player.y);
        if (distance > 200 && (this.tankObstacle.body.velocity.x != 0 || this.tankObstacle.body.velocity.y != 0)) {
            let obsAngle = Phaser.Math.Angle.Between(this.tankObstacle.x, this.tankObstacle.y, this.scene.canon.player.x, this.scene.canon.player.y);
            this.tankObstacle.rotation = obsAngle + (Math.PI / 2);
        }

    }
    GameOverCall() {
        this.scene.gamePause = true;
        this.scene.gameoverPopup.GameOverPopupShow();
        this.tankObstacle.x = this.obsXpos;
        this.tankObstacle.y = this.obsYpos;
        this.tankObstacle.setVelocity(0);
        console.log('game over');
    }

    ActiveObstacleSpeedController() {
        if ((this.tankObstacle.body.velocity.x != 0 || this.tankObstacle.body.velocity.y != 0)) {


            if (this.scene.left || this.scene.right || this.scene.down || this.scene.top) {
                this.scene.physics.moveToObject(this.tankObstacle, this.scene.canon.player, this.scene.obsSpeed);
            }
        }


    }
    ObstacleController(tank, bullet) {
        if (this.scene.obstaclepoolIndex != 0) {
            this.obsIndex = this.scene.obstaclepoolIndex;

        }
        else {
            this.obsIndex = this.scene.activeObs;

        }

        this.tankObstacle.setVelocity(0);
        if (!this.scene.gamePause &&
            (this.scene.obsArray[this.obsIndex - 1].tankObstacle.body.velocity.x == 0 || this.scene.obsArray[this.obsIndex - 1].tankObstacle.body.velocity.y == 0)) {

            this.scene.score++;

            // this.scene.paralaxObsSpeed = this.scene.obsSpeed + (this.scene.obsSpeed * (20 / 100));
            bullet.setVisible(false);
            bullet.x = -500;
            bullet.y = -500;

            this.scene.scText.setText('Score ' + this.scene.score);

            this.scene.physics.moveToObject(this.scene.obsArray[this.scene.obstaclepoolIndex].tankObstacle, this.scene.canon.player, this.scene.obsSpeed);
            this.scene.obsSpeed += 20;
            this.tankObstacle.x = this.obsXpos;
            this.tankObstacle.y = this.obsYpos;

            console.log(this.scene.obstaclepoolIndex);
            this.scene.obstaclepoolIndex++;

            if (this.scene.obstaclepoolIndex >= this.scene.activeObs) {

                this.scene.obstaclepoolIndex = 0;
            }
            console.log('obstacleHit');
        }
    }

}