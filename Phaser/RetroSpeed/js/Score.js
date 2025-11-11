class Score {
    constructor(scene) {
        this.scene = scene;
        this.scoreTxt = null;
        this.bestScoreTxt = null;
        this.score = 0;
    }
    // CreateScore() {
    //     this.score = this.scene.add.sprite(game.config.width / 2, game.config.height / 8.31, 'counter').setScale(1.1);
    //     console.log("Score");
    //     this.score.setFrame(9);
    // }
    CreateScore() {
        const style = { font: "bold 98px Courier", fill: "#ffffff", stroke: '#434', strokeThickness: 4 };
        this.scoreTxt = this.scene.add.text(game.config.width / 2.01, game.config.height / 8.31, this.score, style).setDepth(7 * scaleFactorY).setOrigin(0.5);
    }
    CreateBestScore() {
        const style = { font: "bold 68px Courier", fill: "#ffffff", stroke: '#434', strokeThickness: 2 };
        this.bestScoreTxt = this.scene.add.text(game.config.width / 2.26, game.config.height / 1.45, "Best:" + this.score, style);
        if (isMobile) {
            this.bestScoreTxt.setPosition(game.config.width / 2.53, game.config.height / 1.53);
            // this.bestScoreTxt.setScale(0.88 * scaleFactorY);
        }
    }
}
export default Score;