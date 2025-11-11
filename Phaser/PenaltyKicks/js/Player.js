import { Constant } from "./Constant.js";
class Player {
    constructor(scene) {
        this.scene = scene;
    }
    CreatePlayer() {
        this.scene.anims.create({
            key: 'player_kick',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 30 }),
            frameRate: 60,
            repeat: 0,
            hideOnComplete: true,
        });
        if (Constant.isMobile) {
            this.player = this.scene.add.sprite(Constant.game.config.width / 1.50, Constant.game.config.height / 2.37, 'player').setScale(1 * Constant.scaleFactor, 1 * Constant.scaleFactor).setVisible(false);
        } else {
            this.player = this.scene.add.sprite(Constant.game.config.width / 1.50, Constant.game.config.height / 2.37, 'player').setScale(1.5 * Constant.scaleFactorX, 1.8 * Constant.scaleFactorY).setVisible(false);
        }
        this.player = this.scene.add.sprite(Constant.game.config.width / 1.50, Constant.game.config.height / 2.37, 'player').setScale(1.5 * Constant.scaleFactorX, 1.8 * Constant.scaleFactorY).setVisible(false);
        // this.player = this.scene.add.sprite(Constant.game.config.width / 1.70, Constant.game.config.height / 1.47, 'player').setVisible(false);
    }
    PlayerAnimPlay() {
        this.player.visible = true;
        this.player.play('player_kick');
    }
    PlayerDisable() {
        this.player.visible = false;
    }

}
export default Player;