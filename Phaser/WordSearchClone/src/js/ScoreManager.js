import { Constant } from "./Constant";

class ScoreManager {
    constructor() {
        this.score = 0;
        this.normalScore = 0;
        this.bonusScore = 0;
        this.powerPlayScore = 0;
        this.timeBonusScore = 0;
        this.matchedWordCount = 0;
        this.powerPlayIncreasedVal = 20;
    }
    AddScore() {
        if (Constant.isPowerPlay) {
            this.score += 20;
            this.normalScore += 10;
            this.powerPlayScore += 20;
            this.matchedWordCount++;
        }
        else {
            this.score += 10;
            this.normalScore += 10;

            this.matchedWordCount++;
        }
    }
    AddBonusScore(_bonus) {
        // console.log("Score bonus-------------", _bonus);
        if (_bonus == 1) {
            this.bonusScore += 20;
            this.score += 20;
        }
        else if (_bonus == 2) {
            this.bonusScore += 35;
            this.score += 35;
        }
        else {
            this.bonusScore += 60;
            this.score += 60;
        }
    }
}
let scoreManager = new ScoreManager();
export { scoreManager as ScoreManager };