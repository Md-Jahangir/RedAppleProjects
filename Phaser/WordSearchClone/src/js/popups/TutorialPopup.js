import { Constant } from "../Constant";
import { Align } from "../util/align";
import { Base } from "../util/base";
import GameTween from "../class/GameTween";
import { AudioManager } from "../AudioManager";

class TutorialPopup {

    constructor(scene) {
        this.scene = scene;

        this.tutorialContainer = null;
        this.tutorialPageContainer1 = null;
        this.tutorialPageContainer2 = null;
        this.tutorialPageContainer3 = null;
        this.arrowButControlCounter = null;
        this.buttonContainer = null;

        this.create();
    }
    create() {
        this.gameTween = new GameTween(this.scene);
        this.arrowButControlCounter = 0;
        this.bg = Base.placeImage(this.scene, 'gBG', true, { _oX: 0, _oY: 0 }, 0, 0);
        this.bg.setDisplaySize(Constant.game.config.width, Constant.game.config.height).setDepth(3);
        this.bg.setVisible(false);

        this.tutorialContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setVisible(false).setDepth(3);
        this.buttonContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setDepth(3);
        this.tutorialPageContainer1 = this.scene.add.container(0, 0);
        this.tutorialPageContainer2 = this.scene.add.container(1080, 0);
        this.tutorialPageContainer3 = this.scene.add.container(2160, 0);
        this.closeBtn = Base.placeImage(this.scene, 'close_btn', true, null, 0, 0, null);
        this.scene.aGrid.placeAtIndex(9, this.closeBtn);

        this.afterTutorialPlayBut = Base.placeImage(this.scene, 'button', true, null, 0, 0, null);
        this.scene.aGrid.placeAtIndex(98, this.afterTutorialPlayBut);
        this.afterTutorialPlayBut.setScale(Constant.scaleFactorX * 1.4, Constant.scaleFactorY * 0.7).setVisible(false);
        this.afterTutorialPlayButText = this.scene.add.text(0, 0, 'Play', { fontFamily: "FredokaOne-Regular", fontSize: 70 }).setOrigin(0.5).setVisible(false);
        this.scene.aGrid.placeAtIndex(98, this.afterTutorialPlayButText);

        this.rightButton = Base.placeImage(this.scene, 'arrow-right', true, null, 0, 0, null);
        this.rightButton.setScale(0.5);
        this.scene.aGrid.placeAtIndex(49, this.rightButton);
        this.rightButton.on('pointerup', this.RightSlideButtonFunc, this);

        this.leftButton = Base.placeImage(this.scene, 'arrow-left', true, null, 0, 0, null);
        this.leftButton.setScale(0.5).setVisible(false);
        this.scene.aGrid.placeAtIndex(40, this.leftButton);
        this.leftButton.on('pointerup', this.LeftSlideButtonFunc, this);

        this.tutorialContainer.add([this.tutorialPageContainer1, this.tutorialPageContainer2, this.tutorialPageContainer3]);
        this.buttonContainer.add([this.leftButton, this.rightButton, this.closeBtn, this.afterTutorialPlayBut, this.afterTutorialPlayButText]);
        this.PageContainer1DataSet();
        this.PageContainer2DataSet();
        this.PageContainer3DataSet();

    }
    RightSlideButtonFunc() {
        AudioManager.PlayButtonPressAudio();
        if (this.arrowButControlCounter == 0) {
            this.leftButton.setVisible(true);
        }
        if (this.arrowButControlCounter == 1) {
            this.rightButton.setVisible(false);
            this.afterTutorialPlayBut.setVisible(true);
            this.afterTutorialPlayButText.setVisible(true);
        }
        this.arrowButControlCounter++;
        this.gameTween.PositionChangeTween(this.tutorialContainer, 'Linear', this.tutorialContainer.x - 1080, 0, 200, false, 0);
        this.gameTween.tween.on('complete', () => {
            this.gameTween.tween.remove();
        });
        // console.log('right-----', this.arrowButControlCounter);
    }
    LeftSlideButtonFunc() {
        AudioManager.PlayButtonPressAudio();
        if (this.arrowButControlCounter == 2) {
            this.rightButton.setVisible(true);
        }
        if (this.arrowButControlCounter == 1) {
            this.leftButton.setVisible(false);
        }


        this.arrowButControlCounter--;
        this.gameTween.PositionChangeTween(this.tutorialContainer, 'Linear', this.tutorialContainer.x + 1080, 0, 200, false, 0);
        this.gameTween.tween.on('complete', () => {
            this.gameTween.tween.remove();
        });
        // console.log('left------', this.arrowButControlCounter);
    }
    PageContainer1DataSet() {
        let textStr = 'TUTORIAL1';
        let textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 60, color: '#fff', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };
        let tHead = Base.placeText(this.scene, textStr, { x: 0, y: 0 }, textStyle);
        this.scene.aGrid.placeAtIndex(23.2, tHead);

        textStr = 'Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun.';
        textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 25, color: '#fff', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 400, useAdvancedWrap: true }
        };
        let txt = Base.placeText(this.scene, textStr, { x: 0, y: 0 }, textStyle);
        // txt.setAdvancedWordWrap(true, 400);
        this.scene.aGrid.placeAtIndex(33, txt);

        let tutorialPageBg = this.scene.add.image(580, 960, 'instruction_popup').setScale(1, 1);


        this.tutorialPageContainer1.add([tutorialPageBg, tHead, txt]);

    }
    PageContainer2DataSet() {
        let textStr = 'TUTORIAL2';
        let textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 60, color: '#fff', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };
        let tHead = Base.placeText(this.scene, textStr, { x: 0, y: 0 }, textStyle);
        this.scene.aGrid.placeAtIndex(23.2, tHead);

        textStr = 'Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun.';
        textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 25, color: '#fff', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 400, useAdvancedWrap: true }
        };
        let txt = Base.placeText(this.scene, textStr, { x: 0, y: 0 }, textStyle);
        // txt.setAdvancedWordWrap(true, 400);
        this.scene.aGrid.placeAtIndex(33, txt);

        let tutorialPageBg = this.scene.add.image(580, 960, 'instruction_popup').setScale(1, 1);


        this.tutorialPageContainer2.add([tutorialPageBg, tHead, txt]);
    }
    PageContainer3DataSet() {
        let textStr = 'TUTORIAL3';
        let textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 60, color: '#fff', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };
        let tHead = Base.placeText(this.scene, textStr, { x: 0, y: 0 }, textStyle);
        this.scene.aGrid.placeAtIndex(23.2, tHead);

        textStr = 'Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak dikenal mengambil sebuah kumpulan teks dan mengacaknya untuk menjadi sebuah buku contoh huruf. Ia tidak hanya bertahan selama 5 abad, tapi juga telah beralih ke penataan huruf elektronik, tanpa ada perubahan apapun.';
        textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 25, color: '#fff', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 400, useAdvancedWrap: true }
        };
        let txt = Base.placeText(this.scene, textStr, { x: 0, y: 0 }, textStyle);
        // txt.setAdvancedWordWrap(true, 400);
        this.scene.aGrid.placeAtIndex(33, txt);

        let tutorialPageBg = this.scene.add.image(580, 960, 'instruction_popup').setScale(1, 1);
        this.tutorialPageContainer3.add([tutorialPageBg, tHead, txt]);
    }
    ShowTutorial() {
        this.bg.setVisible(true);
        this.tutorialContainer.setVisible(true);
        this.buttonContainer.setVisible(true);
    }
    HideTutorial() {
        this.bg.setVisible(false);
        this.tutorialContainer.setVisible(false);
        this.buttonContainer.setVisible(false);
    }
}

export default TutorialPopup;