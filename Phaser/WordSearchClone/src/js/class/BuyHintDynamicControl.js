import { Constant } from "../Constant";
import { Base } from "../util/base";
import { AudioManager } from "../AudioManager";
import { ScoreManager } from "../ScoreManager";

export default class BuyHintDynamicControl {
    constructor(scene, gamescene, _height, _coin, _hint) {
        this.scene = scene;
        this.gamescene = gamescene;
        this.offsetHeight = _height;
        this.coin = _coin;
        this.hint = _hint
        this.create();
    }
    create() {
        // console.log('dynamic option');
        this.dynamicBuyHintContainer = this.gamescene.add.container(0, 0);
        this.scene.buyHintpopupContainer.add(this.dynamicBuyHintContainer);
        //user buy a hint button 
        this.buyHintsuccessBut = Base.placeImage(this.gamescene, 'button', true, { _oX: 0.5, _oY: 0.5 }, 770, 1260 + this.offsetHeight);
        this.buyHintsuccessBut.setScale(Constant.scaleFactorX, Constant.scaleFactorY * 0.6);
        this.buyHintsuccessBut.on('pointerup', this.BuyHintFunc, this);
        this.buyHintsuccessButText = this.gamescene.add.text(775, 1250 + this.offsetHeight, 'Buy', { fontFamily: "FredokaOne-Regular", fontSize: 70 }).setOrigin(0.5);
        //show price of a hint 
        this.showMinimumBuyAmountBase = Base.placeImage(this.gamescene, 'button', false, { _oX: 0.5, _oY: 0.5 }, 420, 1260 + this.offsetHeight);
        this.showMinimumBuyAmountBase.setScale(Constant.scaleFactorX * 1.8, Constant.scaleFactorY * 0.6);
        this.showMinimumBuyAmountText = this.gamescene.add.text(450, 1260 + this.offsetHeight, this.coin + ' = ' + this.hint, { fontFamily: "FredokaOne-Regular", fontSize: 50 }).setOrigin(0.5);
        //hintbuy icon
        this.coinIcon = Base.placeImage(this.gamescene, 'coin', false, { _oX: 0.5, _oY: 0.5 }, 300, 1260 + this.offsetHeight);

        this.dynamicBuyHintContainer.add([this.buyHintsuccessBut, this.buyHintsuccessButText, this.showMinimumBuyAmountBase, this.showMinimumBuyAmountText, this.coinIcon]);
    }
    // if user buy hint after hitting buy button functionality
    BuyHintFunc() {
        if (this.scene.sceneManager == 0) {
            AudioManager.PlayButtonPressAudio();
            Constant.countHint += this.hint;
            this.gamescene.localScore -= this.coin;
            this.gamescene.menusceneHintText.setText('Hint   :  ' + Constant.countHint);
            this.gamescene.menusceneScoreText.setText('Score   :  ' + this.gamescene.localScore);
            this.scene.buyHintpopupContainer.setVisible(false);
            this.gamescene.menuAseetContaiiner.setVisible(true);
        }
        else {
            AudioManager.PlayButtonPressAudio();
            Constant.countHint += this.hint;
            ScoreManager.score -= this.coin;
            localStorage.setItem('word_search', ScoreManager.score);
            this.scene.buyHintpopupContainer.setVisible(false);
            this.scene.scene.scoreCountText.setText(ScoreManager.score);
            this.scene.scene.rHintTxt.setText(Constant.countHint);
        }
    }

    ControlInteractivity(_interactive, _alpha) {
        if (_interactive) {
            this.buyHintsuccessBut.setInteractive();
        }
        else {
            this.buyHintsuccessBut.removeInteractive();
        }
        this.buyHintsuccessBut.setAlpha(_alpha);
        this.buyHintsuccessButText.setAlpha(_alpha);
        this.showMinimumBuyAmountBase.setAlpha(_alpha);
        this.showMinimumBuyAmountText.setAlpha(_alpha);
        this.coinIcon.setAlpha(_alpha);

    }
}