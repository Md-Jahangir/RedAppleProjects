import { Constant } from "../Constant";
import { Base } from "../util/base";
import BuyHintDynamicControl from "../class/BuyHintDynamicControl";
import { AudioManager } from "../AudioManager";
import { ScoreManager } from "../ScoreManager";

export default class BuyHintPopup {
    constructor(scene, localScore, localHint, sceneManager) {
        this.scene = scene;
        this.buyHintpopupContainer = null;
        this.buyHint = null;
        //for reuse score and hint if user not buy hint 
        this.reuseLocalsc = localScore;
        this.reuseLocalhint = localHint;
        this.sceneManager = sceneManager;
        this.create();
    }
    create() {
        this.buyHintpopupContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setVisible(false);
        this.hintBuyPopupBase = this.scene.add.image(580, 960, 'instruction_popup').setScale(1, 1);

        // //plus button add for buy hint
        // this.plusHintButton = Base.placeImage(this.scene, 'arrow-right', true, { _oX: 0.5, _oY: 0.5 }, 850, 960);
        // this.plusHintButton.setScale(0.5 * Constant.scaleFactor);
        // this.plusHintButton.on('pointerup', this.PlusHintButtonFunc, this);

        // //minus button add for buy hint
        // this.minusHintButton = Base.placeImage(this.scene, 'arrow-left', false, { _oX: 0.5, _oY: 0.5 }, 300, 960);
        // this.minusHintButton.setScale(0.5 * Constant.scaleFactor);
        // this.minusHintButton.on('pointerup', this.MinusHintButtonFunc, this);


        // this.buyHintText = this.scene.add.text(575, 960, '0', { fontFamily: "FredokaOne-Regular", fontSize: 80 }).setOrigin(0.5);
        this.scoreTextinPopup = this.scene.add.text(575, 560, 'Score : ' + this.scene.localScore, { fontFamily: "FredokaOne-Regular", fontSize: 80 }).setOrigin(0.5);
        //popup close button
        this.popupCancelBut = Base.placeImage(this.scene, 'close_btn', true, null, 950, 460, null);
        this.popupCancelBut.on('pointerup', this.PopupEndFunc, this);
        this.buyHintpopupContainer.add([this.hintBuyPopupBase, this.scoreTextinPopup, this.popupCancelBut]);
        this.BuyHintOptionsInstance();
    }

    BuyHintOptionsInstance() {
        this.buy10Hint = new BuyHintDynamicControl(this, this.scene, 0, 100, 10);
        this.buy5Hint = new BuyHintDynamicControl(this, this.scene, -250, 50, 5);
        this.buy3Hint = new BuyHintDynamicControl(this, this.scene, -500, 30, 3);
    }
    BuyHintControlFunctionality() {
        if (this.scene.localScore < 100 || ScoreManager.score < 100) {
            this.buy10Hint.ControlInteractivity(false, 0.5)
        }
        else {
            this.buy10Hint.ControlInteractivity(true, 1)
        }
        if (this.scene.localScore < 50 || ScoreManager.score < 50) {
            this.buy5Hint.ControlInteractivity(false, 0.5)
        }
        else {
            this.buy5Hint.ControlInteractivity(true, 1)
        }
        if (this.scene.localScore < 30 || ScoreManager.score < 30) {
            this.buy3Hint.ControlInteractivity(false, 0.5)
        }
        else {
            this.buy3Hint.ControlInteractivity(true, 1)
        }

    }

    //popup close button functionality
    PopupEndFunc() {
        AudioManager.PlayButtonPressAudio();
        // this.scene.localScore = this.reuseLocalsc;
        // Constant.countHint = this.reuseLocalhint;
        // this.scene.menusceneHintText.setText('Hint   :  ' + Constant.countHint);
        // this.scene.menusceneScoreText.setText('Score   :  ' + this.scene.localScore);
        this.buyHintpopupContainer.setVisible(false);
        if (this.sceneManager == 0) {
            this.scene.menuAseetContaiiner.setVisible(true);

        }

    }

    //plus hint button functionality
    // PlusHintButtonFunc() {
    //     this.buyHint++;
    //     this.scene.localScore -= 10;
    //     this.CheckHintBuy();
    //     // console.log('plus', this.scene.localScore);
    // }
    // //minus hint button functionality
    // MinusHintButtonFunc() {
    //     this.buyHint--;
    //     this.scene.localScore += 10;
    //     this.CheckHintBuy();
    //     // console.log('minus', this.scene.localScore);
    // }
    // //plus and minus button control
    // CheckHintBuy() {
    //     this.buyHintText.setText(this.buyHint);
    //     this.scoreTextinPopup.setText('Score : ' + this.scene.localScore)
    //     if (this.scene.localScore < 10) {
    //         this.plusHintButton.removeInteractive();
    //     }
    //     else {
    //         this.plusHintButton.setInteractive();
    //     }
    //     if (this.buyHint <= 0) {
    //         this.minusHintButton.removeInteractive();
    //     }
    //     else {
    //         this.minusHintButton.setInteractive();
    //     }
    // }
}