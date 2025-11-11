class Score {
    constructor(scene) {
        this.scene = scene;
        this.scoreTxt;
        this.bestScoreTxt;
        this.score = 0;
    }
    CreateScore() {
        if (!isMobile) {
            const style = { font: "bold 90px Papyrus", fill: "#FFFFFF", stroke: '#434', strokeThickness: 4 };
            this.scoreTxt = this.scene.add.text(game.config.width / 1.066, game.config.height / 27, this.score, style).setDepth(7);
        }
        else {
            const style = { font: "bold 40px Papyrus", fill: "#FFFFFF", stroke: '#434', strokeThickness: 4 };
            this.scoreTxt = this.scene.add.text(game.config.width / 1.066, game.config.height / 27, this.score, style).setDepth(7);
        }
    }
    CreateBestScore() {
        if (!isMobile) {
            const style = { font: "bold 90px Papyrus", fill: "#FFFFFF", stroke: '#434', strokeThickness: 4 };
            this.bestScoreTxt = this.scene.add.text(game.config.width / 2.31, game.config.height / 2.43, "Best : " + this.score, style).setAlpha(0.7).setDepth(7);
        }
        else {
            const style = { font: "bold 40px Papyrus", fill: "#FFFFFF", stroke: '#434', strokeThickness: 4 };
            this.bestScoreTxt = this.scene.add.text(game.config.width / 2.31, game.config.height / 2.43, "Best : " + this.score, style).setAlpha(0.7).setDepth(7);
        }
    }
}
export default Score;