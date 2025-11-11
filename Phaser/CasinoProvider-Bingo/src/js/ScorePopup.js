// import { Model } from "../Model";
import { SelectedResolution } from "./resolution-selector";
// import { SoundManager } from "./SoundManager";
class ScorePopup {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.targetScore = 0;
        this.animationDuration = 30000;
        this.startIncreament = false;
        this.tweenDuration = null;
        this.tweenAmount = null;
        this.config = this.scene.cache.json.get("resolution-config");
        this.create();
    }
    create() {
        this.scene.game.events.on("evtUpdateBalance", this.ResetWinningAmount, this);
        let fontStyle = { fontFamily: 'modesto-expanded', fontSize: this.config.score.fontSize, fill: '#ffff00', fontStyle: 'bold', align: 'center' };
        this.scoreText = this.scene.add.text(0, 0, '0', fontStyle).setOrigin(0.5);
        this.scoreText.setStroke('#521500', 8);
        this.spineCoinsAnim = this.scene.add.spine(0, -100, "animation-sprinkle").setVisible(false);
        const gradient = this.scoreText.context.createLinearGradient(0, 0, 0, this.scoreText.height);
        gradient.addColorStop(0, '#f1de02');
        gradient.addColorStop(0.5, '#f6f34a');
        gradient.addColorStop(1, '#d7633b');
        this.scoreText.setFill(gradient);
        this.scoreText.setVisible(false);
    };

    AnimateTweenText(_targetScore) {
        this.targetScore = _targetScore;
        this.scoreText.setVisible(true);
        this.tweenAmount = this.scene.tweens.add({
            targets: this.scoreText,
            duration: 200,
            y: this.scoreText.y - this.config.score.firstTween.y,
            ease: 'Linear',
            repeat: 0,
            yoyo: false,
            onComplete: () => {
                this.AnimateScore();
            }
        })
    }
    AnimateTweenAgain() {
        this.tweenAmount = this.scene.tweens.add({
            targets: this.scoreText,
            duration: 100,
            ease: 'Linear',
            repeat: 0,
            scaleX: 1.5,
            scaleY: 1.5,
            delay: 1000,
            yoyo: false,
            onComplete: () => {
                this.scoreText.setScale(1);

            }
        })
    }
    AnimateScore() {
        setTimeout(() => {
            SoundManager.CoinPayoutSound();
        }, 600);
        this.startIncreament = true;
        this.targetScore = parseFloat(this.targetScore);

        if (this.targetScore > 0 && this.targetScore <= 10) {
            this.tweenDuration = 400;
            this.incrementAmount = this.targetScore / 300;
        } else if (this.targetScore > 10 && this.targetScore <= 100) {
            this.tweenDuration = 400;
            this.incrementAmount = this.targetScore / 300;
        }
        else if (this.targetScore > 100) {
            this.tweenDuration = 400;
            this.incrementAmount = this.targetScore / 300;
        }
        this.tweenAmount = this.scene.tweens.add({
            targets: this.scoreText,
            text: this.score.toFixed(2),
            duration: this.tweenDuration,
            ease: 'Quad.easeInOut',
            repeat: -1,
            yoyo: false,
            onUpdate: () => {
                this.tweenAmount.pause();
                if (this.score >= this.targetScore) {
                    this.startIncreament = false;
                }
                if (!this.startIncreament) {
                    this.scoreText.setText(Model.getCurrency() + this.score.toFixed(3));
                    this.tweenAmount.pause();
                    this.FinalAnimation();
                } else {
                    this.tweenAmount.resume();
                    this.score += this.incrementAmount;
                    this.scoreText.setText(Model.getCurrency() + parseFloat(this.score.toFixed(3)));

                }

            }
        });
    }
    FinalAnimation() {
        this.scene.game.events.emit('stopWinSpines');
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, this.newWidth, this.newHeight);
        this.startIncreament = false;
        this.scoreText.setText(Model.getCurrency() + this.targetScore.toFixed(2));
        this.scene.tweens.add({
            targets: this.scoreText,
            duration: 200,
            scaleX: newScale * 1.2,
            scaleY: newScale * 1.2,
            ease: 'Quad.easeInOut',
            repeat: 0,
            yoyo: true,
            delay: 500,
            onComplete: () => {
                this.scoreText.setScale(1);
                this.TweenTowardsWinBase();
            }
        })
    }
    TweenTowardsWinBase() {
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, this.newWidth, this.newHeight);
        this.scene.tweens.add({
            targets: this.scoreText,
            duration: 400,
            y: this.scene.bottomPanel.lastWinValueText.y,
            x: this.scene.bottomPanel.lastWinValueText.x,
            scaleX: newScale * 0.4,
            scaleY: newScale * 0.4,
            ease: 'Quad.easeInOut',
            yoyo: false,
            onComplete: () => {
                this.scoreText.setVisible(false);
                this.spineCoinsAnim.setVisible(true);
                this.startIncreament = false;
                this.score = 0;
                if (!this.scene.bottomPanel.isFreeSpinsMode) {
                    this.scene.bottomPanel.SetLastWin(this.targetScore);
                }
                else {
                    this.scene.bottomPanel.CheckFreeSpinWinAmount(this.targetScore);
                }
                this.spineCoinsAnim.play('animation', false);
                SoundManager.CoinAnimationSound();
                this.spineCoinsAnim.once('complete', () => {
                    this.scene.game.events.emit('evtPaylinesShowingDone', Model.getLastWin());
                    this.resize(window.innerWidth, window.innerHeight);
                });
            }
        })
        setTimeout(() => {
            this.scene.game.events.emit('evtGameModeCheck');
        }, 100);
    }
    ResetWinningAmount() {
        // this.targetScore = 0;
        // this.score = 0;
        // this.scoreText.setText(this.targetScore);
        // this.startIncreament = false;

    }
    resize(newWidth, newHeight) {
        this.newWidth = newWidth;
        this.newHeight = newHeight;
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        this.scoreText.setScale(newScale);
        this.scoreText.setPosition(newWidth / 2, newHeight + this.config.score.y);
        this.spineCoinsAnim.setScale(newScale);
        this.spineCoinsAnim.setPosition(
            newWidth / 2 + this.config.coinSprinkle.x * newScale,
            this.scene.bottomPanel.panelBg.y + this.config.coinSprinkle.y * newScale
        )
    }

}
export default ScorePopup;