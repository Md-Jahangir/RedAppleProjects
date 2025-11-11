import { Constant } from "../Constant";
import { ScoreManager } from "../ScoreManager";
import { Base } from "../util/base";

export default class ScorePopup {
    constructor(scene) {
        this.scene = scene;
        this.scorePopupContainer = null;
        this.resultDynamicText = null;
        this.levelScore = null;
        this.powerplayScore = null;
        this.bonusScore = null;
        this.timeBonusScore = null;
        this.totalScore = null;

        this.create();
    }
    create() {
        this.scorePopupContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactor).setVisible(false).setDepth(3);
        this.scPopupBg = this.scene.add.image(580, 960, 'instruction_popup').setScale(1, 1);
        this.scPopupHideBtn = Base.placeImage(this.scene, 'close_btn', true, null, 0, 0, null);
        this.scene.aGrid.placeAtIndex(28, this.scPopupHideBtn);
        this.resultDynamicText = this.scene.add.text(600, 600, '', { fontFamily: "FredokaOne-Regular", fontSize: 90 }).setOrigin(0.5);
        this.levelScoreText = this.scene.add.text(600, 800, '', { fontFamily: "FredokaOne-Regular", fontSize: 50 }).setOrigin(0.5);
        this.powerplayScoreText = this.scene.add.text(600, 900, '', { fontFamily: "FredokaOne-Regular", fontSize: 50 }).setOrigin(0.5);
        this.bonusScoreText = this.scene.add.text(600, 1000, '', { fontFamily: "FredokaOne-Regular", fontSize: 50 }).setOrigin(0.5);
        this.timeBonusScoreText = this.scene.add.text(600, 1100, '', { fontFamily: "FredokaOne-Regular", fontSize: 50 }).setOrigin(0.5);
        this.totalScoreText = this.scene.add.text(600, 1300, '', { fontFamily: "FredokaOne-Regular", fontSize: 70 }).setOrigin(0.5);

        this.scorePopupContainer.add([this.scPopupBg, this.scPopupHideBtn, this.resultDynamicText, this.levelScoreText, this.powerplayScoreText, this.bonusScoreText, this.timeBonusScoreText, this.totalScoreText]);
        this.scPopupHideBtn.on('pointerup', this.HideCompletePopup, this);
    }
    UpdateScoreonAwakePopup(_resultText, _levelScore, _powerplayScore, _bonusScore, _timeBonusScore) {
        this.resultDynamicText.setText(_resultText);
        this.levelScore = _levelScore;
        this.levelScoreText.setText('Level Score            : ' + this.levelScore);
        this.powerplayScore = _powerplayScore;
        this.powerplayScoreText.setText('Powerplay Score  : ' + this.powerplayScore);
        this.bonusScore = _bonusScore;
        this.bonusScoreText.setText('Bonus Score           : ' + this.bonusScore);
        this.timeBonusScore = _timeBonusScore;
        this.timeBonusScoreText.setText('Timebonus Score  : ' + this.timeBonusScore);

        this.totalScore = this.levelScore + this.powerplayScore + this.bonusScore + this.timeBonusScore;
        this.totalScoreText.setText('Total Score : ' + this.totalScore);
    }
    ShowCompletePopup() {
        this.scorePopupContainer.setVisible(true);
    }
    HideCompletePopup() {
        this.scorePopupContainer.setVisible(false);
        this.scene.scene.stop('GameScene');
        ScoreManager.score = this.totalScore;
        this.scene.scene.start('CategoryScene');
    }
}