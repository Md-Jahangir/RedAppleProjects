// import { Model } from "../Model";
import { getScale } from "./utils";
import { SelectedResolution } from "./resolution-selector";
import { Model } from "./model";
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
        // this.scoreGlowSpine = this.scene.add.spine(0, 0, 'score_glow_spine');
        // this.scoreGlowSpine.play('animation', true);
        this.scoreText = this.scene.add.text(0, 0, '0', fontStyle).setOrigin(0.5);
        this.scoreText.setStroke('#521500', 8);
        const gradient = this.scoreText.context.createLinearGradient(0, 0, 0, this.scoreText.height);
        gradient.addColorStop(0, '#f1de02');
        gradient.addColorStop(0.5, '#f6f34a');
        // gradient.addColorStop(0.5, '#813E1A');
        // b65e24
        // this.scoreText.postFX.addGlow(0x8B410C, 10.2, 10.2, false, 10, 2);
        // this.scoreText.setShadow(4, 4, '#8B410C', 2, true, true);
        gradient.addColorStop(1, '#d7633b');
        this.scoreText.setFill(gradient);
        this.scoreText.setVisible(false);
    };
    // createCurve() {
    //     path = new Phaser.Curves.Path(1500, 500);
    //     path.lineTo(700, 500);
    //     path.splineTo([745, 256, 550, 145, 300, 250, 260, 450, 50, 500]);
    //     path.lineTo(-100, 500);
    //     const text = this.add.dynamicBitmapText(0, 0, 'desyrel', 'Phaser 3', 64);

    //     text.setDisplayCallback(this.positionOnPath);

    //     const graphics = this.add.graphics();

    //     graphics.lineStyle(1, 0xffffff, 1);

    //     path.draw(graphics, 128);
    // }
    // positionOnPath(data) {
    //     var pathVector = path.getPoint(t + ((6 - data.index) * 0.04));

    //     if (pathVector) {
    //         data.x = pathVector.x;
    //         data.y = pathVector.y;
    //     }

    //     return data;
    // }
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
        this.startIncreament = true;
        this.targetScore = parseFloat(this.targetScore);

        if (this.targetScore > 0 && this.targetScore <= 10) {
            this.tweenDuration = 50;
            this.incrementAmount = this.targetScore / 150;
        } else if (this.targetScore > 10 && this.targetScore <= 100) {
            this.tweenDuration = 150;
            this.incrementAmount = this.targetScore / 150;
        }
        else if (this.targetScore > 100) {
            this.tweenDuration = 350;
            this.incrementAmount = this.targetScore / 150;
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
                this.scene.tweens.add({
                    targets: this.scoreText,
                    duration: 200,
                    scaleX: newScale * 0.6,
                    scaleY: newScale * 0.6,
                    ease: 'Quad.easeInOut',
                    repeat: 0,
                    yoyo: true,
                    delay: 500,
                    onComplete: () => {
                        this.startIncreament = false;
                        this.score = 0;
                        this.scoreText.setVisible(false);

                        if (!this.scene.bottomPanel.isFreeSpinsMode) {
                            this.scene.bottomPanel.SetLastWin(this.targetScore);
                        } else {
                            this.scene.bottomPanel.CheckFreeSpinWinAmount(this.targetScore);
                        }
                        this.scene.game.events.emit('evtPaylinesShowingDone', Model.getLastWin());
                        if (this.scene.bottomPanel.freeSpinCounter == 0) {
                            this.scene.bottomPanel.isFreeSpinsMode = false;
                            this.scene.bottomPanel.HideFreeSpinCounterBase();
                            this.scene.bottomPanel.onEnableGui();
                        }
                        // this.scene.jackpotWin.StopWinSpines();
                        this.resize(window.innerWidth, window.innerHeight);

                    }
                })

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
        // this.scoreGlowSpine.setScale(newScale);
        // this.scoreGlowSpine.setPosition(newWidth / 2 + 50, newHeight / 2 + 220)
    }

}
export default ScorePopup;