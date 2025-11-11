class PopUp {
    constructor(scene) {
        this.scene = scene;
    }
    CreatePop() {

        let bg = this.scene.add.image(game.config.width / 1.959, game.config.height / 1.9636, 'onepixel').setScale(2000 * scaleFactorX, 2000 * scaleFactorY).setAlpha(0.001).setDepth(7);
        let ribbon = this.scene.add.image(game.config.width / 1.959, game.config.height / 5.12, 'ribbon').setScale(1 * scaleFactorX, 1 * scaleFactorY).setAlpha(0.7).setDepth(7);
        console.log(scaleFactorY);
        let popUp = this.scene.add.text(game.config.width / 2.299, game.config.height / 5.6643, "Game Over !", { fontFamily: 'Arial', fontSize: (55 * scaleFactorX, 55 * scaleFactorY), fill: '#FFFFFF', align: 'Center' }).setDepth(7);
        let homeButton = this.scene.add.image(game.config.width / 27.43, game.config.height / 1.54, 'home').setDepth(7);
        let leaderButton = this.scene.add.image(game.config.width / 2.95, game.config.height / 1.588, 'leaderboard').setAlpha(0.7).setDepth(7);
        let replayButton = this.scene.add.image(game.config.width / 1.959, game.config.height / 1.588, 'replay').setAlpha(0.7).setInteractive({ useHandCursor: true }).setDepth(7);
        let ratingButton = this.scene.add.image(game.config.width / 1.4656, game.config.height / 1.588, 'rating').setAlpha(0.7).setDepth(7);
        if (isMobile) {
            homeButton.setScale(0.9 * scaleFactorX); //, 0.9 * scaleFactorY);
            leaderButton.setScale(0.9 * scaleFactorX);//, 0.9 * scaleFactorY);
            replayButton.setScale(0.9 * scaleFactorX);//, 0.9 * scaleFactorY);
            ratingButton.setScale(0.9 * scaleFactorX);//, 0.9 * scaleFactorY);
        }
        replayButton.on('pointerdown', function () {
            this.scene.scene.stop('GameScene');
            this.scene.scene.start('TitleScene');
            randomNumber = Math.floor((Math.random() * bgControlArray.length));
            console.log(randomNumber);
        });
    }
}
export default PopUp;