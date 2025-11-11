class Player {
    constructor(scene) {
        this.scene = scene;
        this.player = null;
    }
    CreatePlayer() {
        this.player = this.scene.physics.add.image(game.config.width / 2.01, game.config.height / 1.2, 'player').setScale(3.2 * scaleFactorX, 2.9 * scaleFactorY);
        if (isMobile) {
            this.player.setScale(2.9 * scaleFactorY);
        }
    }
    MovePlayerOnLeft() {
        this.player.x -= 9.6;
    }
    MovePlayerOnRight() {
        this.player.x += 9.6;
    }
}
export default Player;