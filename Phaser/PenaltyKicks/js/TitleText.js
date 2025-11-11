import { Constant } from "./Constant.js";
class TitleText {
    constructor(scene) {
        this.scene = scene;
        this.goalText = null;
        this.saveText = null;
        this.missedText = null;
        this.isTitleTextAnimComplete = false;
        this.ConfetiAnim = null;
    }
    CreateTitles() {
        this.CreateGoalTitle();
        this.CreateSavedTitle();
        this.CreateMissedTitle();
    }
    CreateGoalTitle() {
        this.goalText = this.scene.add.image(Constant.game.config.width / 2, -Math.round(Constant.game.config.height / 10.8), "GOAL!").setOrigin(0.5).setScale(Constant.scaleFactorX
            * 1, Constant.scaleFactorY * 1).setDepth(2);
    }
    CreateSavedTitle() {
        this.saveText = this.scene.add.image(Constant.game.config.width / 2, -Math.round(Constant.game.config.height / 10.8), "saved!").setScale(Constant.scaleFactorX * 1,
            Constant.scaleFactorY * 1).setOrigin(0.5).setDepth(2);
    }
    CreateMissedTitle() {
        this.missedText = this.scene.add.image(Constant.game.config.width / 2, -Math.round(Constant.game.config.height / 10.8), "missed").setScale(Constant.scaleFactorX * 1,
            Constant.scaleFactorY * 1).setOrigin(0.5).setDepth(3);
    }
    CreateConfetiAnim() {
        this.ConfetiAnim = this.scene.add.spine(Constant.game.config.width / 2, Math.round(Constant.game.config.height / 1), 'confeti').setScale(Constant.scaleFactorX, Constant.scaleFactorY).setVisible(true).setDepth(4);
    }
    PlayConfetiAnimation() {
        this.ConfetiAnim.setVisible(true);
        this.ConfetiAnim.play('Confetti');
    }
    AnimateSpecificTitles(_title) {
        this.scene.tweens.add({
            targets: _title,
            ease: "linear",
            y: Math.round(Constant.game.config.height / 2),
            duration: 200,
            onComplete: () => {
                setTimeout(() => {
                    this.scene.tweens.add({
                        targets: _title,
                        y: 1140,
                        ease: "linear",
                        duration: 200,
                        onComplete: () => {
                            _title.setPosition(Math.round(Constant.game.config.width / 2), -Math.round(Constant.game.config.height / 10.8))
                            this.isTitleTextAnimComplete = true;
                        }
                    })
                }, 1000);
            }
        })
    }
}
export default TitleText;