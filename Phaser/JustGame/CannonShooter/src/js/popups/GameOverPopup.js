import { Constant } from "../Constant";
import Button from "../Button";

export default class GameOver {
    constructor(scene) {
        this.scene = scene;
        this.create();
    }
    create() {
        this.gameoverpopupBg = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'preload_bg').setDisplaySize(Constant.game.config.width, Constant.game.config.height).setVisible(false).setDepth(2);
        this.gameOverContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor).setVisible(false).setDepth(2);
        this.scoreText = this.scene.add.text(0, 0, 'Score  0', { fontFamily: 'Howli-SansOne', fontSize: 80 }).setOrigin(0.5);

        this.restartButton = new Button(this.scene, 'but_restart', -100, 200);
        this.homeButton = new Button(this.scene, 'but_home', 100, 200);
        this.gameOverContainer.add([this.scoreText, this.restartButton.but, this.homeButton.but]);

    }
    GameOverPopupShow() {
        this.scoreText.setText('Score ' + this.scene.score);
        this.gameoverpopupBg.setVisible(true);
        this.gameOverContainer.setVisible(true);
    }
}