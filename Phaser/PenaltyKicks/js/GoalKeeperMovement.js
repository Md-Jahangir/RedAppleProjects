import { Constant } from "./Constant.js";
class GoalKeeperMovement {
    constructor(scene) {
        this.scene = scene;
        this.goalKeeperSpineMovement = null;
        this.defaultAnimationKey = null;
        this.setSizeX;
        this.setSizeY;
        // this.setSizeXd = [1096 / 12, 1972 / 20, 2676 / 13, 3540 / 15, 3748 / 15, 3600 / 15];
        // this.setSizeYd = [1700 / 11, 1620 / 12, 1960 / 24, 1400 / 20, 1176 / 15, 1176 / 15];
        this.getKey;
    }
    CreateGoalKeeperAnimation() {
        this.goalKeeperSpineMovement = this.scene.add.spine(Constant.game.config.width / 2, Constant.game.config.height / 2.2, 'skeleton').setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.goalKeeperSpineMovement.play('idle', true);
        this.goalKeeperSpineMovement.timeScale = 1;
        // this.scene.anims.create({
        //     key: 'goalkeeper_idle',
        //     frames: this.scene.anims.generateFrameNumbers('goalkeeper_idle', { start: 0, end: 23 }),
        //     frameRate: 30,
        //     repeat: -1
        // });
        // this.scene.anims.create({
        //     key: 'goalkeeper_save_center_up',
        //     frames: this.scene.anims.generateFrameNumbers('goalkeeper_save_center_up', { start: 0, end: 24 }),
        //     frameRate: 30,
        //     repeat: 0,
        //     hideOnComplete: true
        // });
        // this.scene.anims.create({
        //     key: 'goalkeeper_save_center_down',
        //     frames: this.scene.anims.generateFrameNumbers('goalkeeper_save_center_down', { start: 0, end: 50 }),
        //     frameRate: 30,
        //     repeat: 0,
        //     hideOnComplete: true
        // });

        // this.scene.anims.create({
        //     key: 'goalkeeper_save_left',
        //     frames: this.scene.anims.generateFrameNumbers('goalkeeper_save_left', { start: 0, end: 33 }),
        //     frameRate: 30,
        //     repeat: 0,
        //     hideOnComplete: true
        // });

        // this.scene.anims.create({
        //     key: 'goalkeeper_save_right',
        //     frames: this.scene.anims.generateFrameNumbers('goalkeeper_save_right', { start: 0, end: 33 }),
        //     frameRate: 30,
        //     repeat: 0,
        //     hideOnComplete: true
        // });
        // this.scene.anims.create({
        //     key: 'goalkeeper_save_down_left',
        //     frames: this.scene.anims.generateFrameNumbers('goalkeeper_save_down_left', { start: 0, end: 33 }),
        //     frameRate: 30,
        //     repeat: 0,
        //     hideOnComplete: true
        // });
        // this.scene.anims.create({
        //     key: 'goalkeeper_save_down_right',
        //     frames: this.scene.anims.generateFrameNumbers('goalkeeper_save_down_right', { start: 0, end: 29 }),
        //     frameRate: 30,
        //     repeat: 0,
        //     hideOnComplete: true
        // });
        // this.scene.anims.create({
        //     key: 'player_kick',
        //     frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 30 }),
        //     frameRate: 30,
        //     repeat: 0,
        //     hideOnComplete: true,
        // });
        this.AnimateGoalSaver();
    }
    AnimateGoalSaver() {
        // let setPosX = Constant.game.config.width / 2;
        // let setPosY = Constant.game.config.height / 2.95;
        // this.setSizeX = 1096 / 12;
        // this.setSizeY = 1200 / 11;
        // this.defaultAnimationKey = 'goalkeeper_idle';
        // this.goalKeeperSpineMovement = this.scene.physics.add.sprite(Constant.game.config.width / 2, Constant.game.config.height / 2.95, this.defaultAnimationKey).setSize(this.setSizeX, this.setSizeY).setScale(1.6 * Constant.scaleFactorX, 1.6 * Constant.scaleFactorY).play(this.defaultAnimationKey);
        // this.goalKeeper.setCollideWorldBounds(true);
        // this.goalKeeper.setVisible(true)
        // this.goalKeeper.setImmovable(true);
        // this.goalKeeperSpineMovement.setPosition(setPosX,setPosY)
        // this.goalKeeperSpineMovement.play('idle',true);
        // this.goalKeeperSpineMovement.timeScale = 0.7;
    }
    MakeGoalSaverDisable() {
        this.goalKeeperSpineMovement.setVisible(false);
    }
    MakeGoalSaverEnable() {
        this.goalKeeperSpineMovement.setPosition(Constant.game.config.width / 2, Constant.game.config.height / 2.2);
        this.goalKeeperSpineMovement.play('idle', true);
        this.goalKeeperSpineMovement.setVisible(true);
    }
    GoalKeeperMovementAnimation() {
        console.log('GoalKeeperMovementAnimation',);

        let setPosX = [Constant.game.config.width / 2, Constant.game.config.width / 2, Constant.game.config.width / 2, Constant.game.config.width / 2, Constant.game.config.width / 2, Constant.game.config.width / 2];
        let setPosY = [Constant.game.config.height / 2.2, Constant.game.config.height / 2.2, Constant.game.config.height / 2.2, Constant.game.config.height / 2.2, Constant.game.config.height / 2.2, Constant.game.config.height / 2.2];
        this.goalKeeperSpineMovement.setVisible(true)
        let goalkeeper_save_dir = ['Save_Centre_up', 'Save_Centre_down', 'Save_left', 'Save_right', 'Save_down_left', 'Save_down_right'];
        let randomAnimationKey = Math.floor(Math.random() * 6);
        // let randomAnimationKey = 5;
        console.log('randomAnimationKey : ', goalkeeper_save_dir[randomAnimationKey])
        this.getKey = goalkeeper_save_dir[randomAnimationKey]
        this.goalKeeperSpineMovement.setPosition(setPosX[randomAnimationKey], setPosY[randomAnimationKey]);
        this.goalKeeperSpineMovement.play(this.getKey, 1);
        this.goalKeeperSpineMovement.timeScale = 1;
        this.goalKeeperSpineMovement.on('complete', () => {
            this.goalKeeperSpineMovement.play('idle', true);
        })
    }
}
export default GoalKeeperMovement;