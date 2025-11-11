class Background {
    constructor(scene) {
        this.scene = scene;
        this.bgOne = null;
        this.bgTwo = null;
        this.bgThree = null;
        this.speed = 13;
    }
    CreateBG() {
        if (randomNumber == 0) {
            this.bgOne = this.scene.add.tileSprite(game.config.width / 2.01, game.config.height / 5.4, 1650, 1920, 'bgOne').setScale(1.17 * scaleFactorX, 1 * scaleFactorY);
            if (isMobile) {
                this.bgOne.setScale(0.8 * scaleFactorX, 1.7 * scaleFactorY)
            }
        }
        if (randomNumber == 1) {
            this.bgTwo = this.scene.add.tileSprite(game.config.width / 2.01, game.config.height / 5.4, 1650, 1920, 'bgTwo').setScale(1.17 * scaleFactorX, 1 * scaleFactorY);
            if (isMobile) {
                this.bgTwo.setScale(0.8 * scaleFactorX, 1.7 * scaleFactorY)
            }
        }
        if (randomNumber == 2) {
            this.bgThree = this.scene.add.tileSprite(game.config.width / 2.01, game.config.height / 5.4, 1650, 1920, 'bgThree').setScale(1.17 * scaleFactorX, 1 * scaleFactorY);
            if (isMobile) {
                this.bgThree.setScale(0.8 * scaleFactorX, 1.7 * scaleFactorY)
            }
        }
    }
    MoveBG() {
        if (randomNumber == 0) {
            this.bgOne.tilePositionY -= this.speed;
        }
        if (randomNumber == 1) {
            this.bgTwo.tilePositionY -= this.speed;
        }
        if (randomNumber == 2) {
            this.bgThree.tilePositionY -= this.speed;
        }
    }
}
export default Background;