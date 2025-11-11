import { Constant } from "./Constant";
import { Base } from "./util/base";
import BuyHintPopup from "./popups/BuyHintPopup";
import TutorialPopup from "./popups/TutorialPopup";
import { AlignGrid } from "./util/alignGrid";
import { AudioManager } from "./AudioManager";


export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
        this.localScore = null;
        // Constant.countHint = null;
        this.menuAseetContaiiner = null;
    }
    create() {
        console.log('menu scene');
        this.localScore = localStorage.getItem('word_search');
        if (this.localScore == null) {
            console.info("local Storage--------------")
            this.localScore = 0;
        }
        Constant.countHint = 0;
        this.bg = Base.placeImage(this, 'gBG', true, { _oX: 0, _oY: 0 }, 0, 0);
        this.bg.setDisplaySize(1080, 1920);
        this.menuAseetContaiiner = this.add.container(0, 0).setScale(Constant.scaleFactorX, 1);
        this.buyHintPopup = new BuyHintPopup(this, this.localScore, Constant.countHint, 0);
        this.menusceneScoreText = this.add.text(540, 320, 'Score   :  ' + this.localScore, { fontFamily: "FredokaOne-Regular", fontSize: 150 }).setOrigin(0.5);
        this.menusceneHintTextBase = Base.placeImage(this, 'button', false, { _oX: 0.5, _oY: 0.5 }, 540, 1920 / 3);
        this.menusceneHintTextBase.setScale(3, 1);
        this.menusceneHintText = this.add.text(540, 1920 / 3, 'Hint   :  ' + Constant.countHint, { fontFamily: "FredokaOne-Regular", fontSize: 100 }).setOrigin(0.5);
        this.hintBuyButton = Base.placeImage(this, 'button', true, { _oX: 0.5, _oY: 0.5 }, 540, 960);
        this.hintBuyButton.setScale(2, 0.8);
        this.hintBuyButtonText = this.add.text(540, 960, 'Buy Hint', { fontFamily: "FredokaOne-Regular", fontSize: 80 }).setOrigin(0.5);
        this.hintBuyButton.on('pointerup', this.HintBuyButtonFunc, this);

        this.jumpCategoryBut = Base.placeImage(this, 'button', true, { _oX: 0.5, _oY: 0.5 }, 540, 1280);
        this.jumpCategoryBut.setScale(2, 0.8);
        this.jumpCategoryButText = this.add.text(540, 1280, 'Play', { fontFamily: "FredokaOne-Regular", fontSize: 80 }).setOrigin(0.5);
        this.jumpCategoryBut.on('pointerup', this.JumpCategoryFunc, this);

        this.menuAseetContaiiner.add([this.menusceneScoreText, this.menusceneHintTextBase, this.menusceneHintText, this.hintBuyButton, this.hintBuyButtonText, this.jumpCategoryBut, this.jumpCategoryButText]);
        this.CreateGrid();
    }
    PlaceCBases() {
        let index = 0;
        for (let i = 22; i <= 77; i += 5) {
            this.catBase = Base.placeImage(this, 'wBase', true, null, 0, 0, Constant.scaleFactor);
            this.aGrid.placeAtIndex(i, this.catBase);
            let textStr = Constant.category[index];
            let textStyle = {
                fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 40, color: '#000'
            };
            this.catBase.name = textStr;
            this.catText = Base.placeText(this, textStr, { x: 0, y: 0 }, textStyle);
            this.catText.setOrigin(0.5, 0.7);
            this.aGrid.placeAtIndex(i, this.catText);
            index += 1;
            this.baseArray.push(this.catBase);
        }
        // console.log(this.baseArray);
    }
    HintBuyButtonFunc() {
        AudioManager.PlayButtonPressAudio();
        this.buyHintPopup.buyHint = 0;
        // if (this.localScore < 10) {
        //     this.buyHintPopup.buyHintsuccessBut.removeInteractive().setAlpha(0.5);
        //     this.buyHintPopup.buyHintsuccessButText.setAlpha(0.5);
        //     // this.buyHintPopup.plusHintButton.removeInteractive();
        //     // this.buyHintPopup.minusHintButton.removeInteractive();

        // }
        this.buyHintPopup.BuyHintControlFunctionality();
        // this.buyHintPopup.buyHintText.setText('0');
        this.buyHintPopup.scoreTextinPopup.setText('Score : ' + this.localScore);
        // this.buyHintPopup.minusHintButton.removeInteractive();
        this.menuAseetContaiiner.setVisible(false);
        this.buyHintPopup.buyHintpopupContainer.setVisible(true);
        // console.log('buy Hint popup open');
    }
    JumpCategoryFunc() {
        AudioManager.PlayButtonPressAudio();
        Constant.game.scene.stop('MenuScene');
        Constant.game.scene.start('CategoryScene');
    }
    CreateGrid() {
        this.aGrid = new AlignGrid({
            scene: this,
            rows: 10,
            cols: 10,
            width: this.bg.displayWidth,
            height: this.bg.displayHeight,
            startX: this.bg.x,
            startY: this.bg.y,
        });
        this.tutorialPopup = new TutorialPopup(this);
        this.tutorialPopup.ShowTutorial();
        // this.aGrid.showNumbers();
        this.CloseTutorial();
    }
    CloseTutorial() {
        this.tutorialPopup.closeBtn.on('pointerdown', () => {
            // this.scPopup.UpdateScoreonAwakePopup('Complete', 50, 40, 40, 20);
            this.tutorialPopup.HideTutorial();
            AudioManager.PlayButtonPressAudio();
            console.log('-----');
            // this.scPopup.scorePopupContainer.setVisible(true);
        });
        this.tutorialPopup.afterTutorialPlayBut.on('pointerdown', () => {
            // this.scPopup.UpdateScoreonAwakePopup('Complete', 50, 40, 40, 20);
            this.tutorialPopup.HideTutorial();
            AudioManager.PlayButtonPressAudio();
            console.log('-----');
            // this.scPopup.scorePopupContainer.setVisible(true);
        });
    }
}