// import { Model } from "../Model";
import { SoundManager } from "../SoundManager";
import { Model } from "../Model";
import { Constant } from "../Constant";
import { Server } from "../Server";
class ScorePopup {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.targetScore = 0;
        this.animationDuration = 30000;
        this.startIncreament = false;
        this.tweenDuration = null;
        this.tweenAmount = null;
        this.config = this.scene.cache.json.get('game_config').score;
        this.create();
    }
    create() {
        let fontStyle = { fontFamily: 'modesto-expanded', fontSize: '120px', fill: '#ffff00', fontStyle: 'bold', align: 'center' };
        this.scoreTextContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.spineCoinsContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);

        //-----------Add Score TExt Gradient ----------------
        this.scoreText = this.scene.add.text(0, 0, '0', fontStyle).setOrigin(0.5);
        this.scoreText.setStroke('#521500', 8);

        const gradient = this.scoreText.context.createLinearGradient(0, 0, 0, this.scoreText.height);
        gradient.addColorStop(0, '#f1de02');
        gradient.addColorStop(0.5, '#f6f34a');
        gradient.addColorStop(1, '#d7633b');
        this.scoreText.setFill(gradient);
        this.scoreTextContainer.depth = 20;
        this.scoreTextContainer.add(this.scoreText);
        this.scoreTextContainer.setVisible(false);
        //----------------Add Sprinkled Coins Animation  Spine ------------
        this.spineCoinsAnim1 = this.scene.add.spine(0, 0, "sprinkle_coins");
        this.spineCoinsContainer.add([this.spineCoinsAnim1]);
        this.spineCoinsContainer.depth = 11;
        this.spineCoinsContainer.setVisible(false);
        // this.AnimateTweenText(901.56);
    };

    AnimateTweenText(_targetScore) {
        this.targetScore = _targetScore;
        this.scoreText.setPosition(0, this.config.firstTween.y);
        this.scoreTextContainer.setVisible(true);
        this.tweenAmount = this.scene.tweens.add({
            targets: this.scoreText,
            duration: 200,
            y: this.scoreText.y + this.config.firstTween.y,
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
        // this.targetScore = 100;//parseFloat(this.targetScore);

        if (this.targetScore > 0 && this.targetScore <= 100) {
            this.tweenDuration = 4000;
            this.incrementAmount =   (this.targetScore/ 100)
        }
        else if (this.targetScore > 100 && this.targetScore <= 1000) {
            this.tweenDuration = 2000;
            this.incrementAmount = (this.targetScore/ 100);// this.targetScore / 300;
        }
        else if (this.targetScore > 1000) {
            this.tweenDuration = 100;
            this.incrementAmount =(this.targetScore/ 100);// this.targetScore / 300;
        }
        this.tweenAmount = this.scene.tweens.add({
            targets: this.scoreText,
            text: this.score.toFixed(2),
            // duration: this.tweenDuration,
            delay: 200,
            ease: 'Quad.easeInOut',
            repeat: -1,
            yoyo: false,
            onUpdate: () => {
                this.tweenAmount.pause();
                if (this.score >= this.targetScore) {
                    this.startIncreament = false;
                }
                if (!this.startIncreament) {
                    if(Server.mode == 'offline'){
                        this.scoreText.setText( this.score.toFixed(3));
                    }else{
                        this.scoreText.setText(Model.GetCurrency() + this.score.toFixed(3));
                    }
                    this.tweenAmount.pause();
                    this.FinalAnimation();
                } else {
                    this.tweenAmount.resume();
                    this.score += this.incrementAmount;
                    if(Server.mode == 'offline'){
                        this.scoreText.setText(parseFloat (this.score.toFixed(3)));
                    }else{
                        this.scoreText.setText(Model.GetCurrency() + parseFloat(this.score.toFixed(3)));
                    }
                   

                }

            }
        });
    }
    FinalAnimation() {
        this.scene.game.events.emit('stopWinSpines');
        this.startIncreament = false;
        if(Server.mode == 'offline'){
        this.scoreText.setText( parseFloat(this.targetScore).toFixed(2));
        }else{
            this.scoreText.setText(Model.GetCurrency() + parseFloat(this.targetScore).toFixed(2)); 
        }
        this.scene.tweens.add({
            targets: this.scoreText,
            duration: 200,
            scaleX: 1.4,
            scaleY: 1.4,
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
        this.scene.tweens.add({
            targets: this.scoreText,
            duration: 400,
            y: this.config.sprinkleCoin.y,
            x: this.config.sprinkleCoin.x,
            scaleX: 0.5,
            scaleY: 0.5,
            ease: 'Quad.easeInOut',
            yoyo: false,
            onComplete: () => {
                this.scoreTextContainer.setVisible(false);
                this.spineCoinsContainer.setVisible(true);
                this.spineCoinsAnim1.setPosition(this.config.sprinkleCoin.x, this.config.sprinkleCoin.y);
                this.spineCoinsAnim1.play('animation', false);
                this.spineCoinsAnim1.once('complete', () => {
                    this.scene.game.events.emit('evtPaylinesShowingDone', Model.getLastWin());
                    this.scene.game.events.emit('evtListenScoreAnimEnd');
                });
                SoundManager.CoinAnimationSound();
                this.startIncreament = false;
                this.score = 0;
                if (!this.scene.freeSpin.isFreeSpinsMode) {
                    this.scene.bottomPanel.SetLastWin(this.targetScore);
                }
                else {
                    this.scene.bottomPanel.CheckFreeSpinWinAmount(this.targetScore);
                }

            }
        })
        setTimeout(() => {
            this.scene.game.events.emit('evtGameModeCheck');
        }, 100);
    }



}
export default ScorePopup;