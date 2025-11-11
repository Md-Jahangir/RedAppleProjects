import { Constant } from "./Constant.js";

class GameScore {
    constructor(scene) {

        this.scene = scene;

        this.score = 0;
        this.bestScore = null;
        this.scoreTxt = null;

    }

    CreateScore() {

        this.scoreTxt = this.scene.add.text(0, 0, this.score, { fontFamily: 'GROBOLD', fontSize: 60, fill: '#FFFFFF', align: 'Center', lineSpacing: 10 }).setOrigin(0.5).setScale(Constant.scaleFactorY);

    }
}

export default GameScore;