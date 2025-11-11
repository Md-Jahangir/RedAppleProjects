import { Constant } from "../Constant";
import { Align } from "../util/align";
import { Base } from "../util/base";

class LevelCompletionPopup {

    constructor(scene) {
        this.scene = scene;

        this.levelPopupContainer = null;
        this.cTimer = 3;

        this.CreateLevelCompletionPopup();
    }

    CreateLevelCompletionPopup() {

        this.bg = Base.placeImage(this.scene, 'gBG', true, { _oX: 0, _oY: 0 }, 0, 0);
        this.bg.setDisplaySize(Constant.game.config.width, Constant.game.config.height).setAlpha(0.1);
        // this.bg.setVisible(false);
        this.bg.setDepth(3);

        this.levelPopupContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactor).setVisible(false).setDepth(3);
        this.base = Base.placeImage(this.scene, 'instruction_popup', false, 0.5, Constant.game.config.width / 2, Constant.game.config.height / 2);

        let textStr = this.cTimer;
        let textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 55, color: '#fff', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };

        let timeText = Base.placeText(this.scene, textStr, { x: 0, y: 0 }, textStyle).setScale(Constant.scaleFactor);
        this.scene.aGGrid.placeAtIndex(32, timeText);
        // timeText.setPosition(500, 500).setOrigin(4);
        this.gameTime = this.scene.time.addEvent({
            delay: 1000,
            callback: this.SetTimer,
            callbackScope: this,
            repeat: -1,
            paused: true,
        }, this);

        textStr = 'Next Level Starts in....';
        textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 50, color: '#fff', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };
        this.pHead = Base.placeText(this.scene, textStr, { x: 0.5, y: 0.5 }, textStyle);
        // console.info("this gamescene-------->", this.scene.aGGrid)
        this.scene.aGGrid.placeAtIndex(20.6, this.pHead);

        textStr = 'LEVEL 1 Score: ';
        textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 55, color: '#fff', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };
        this.score = Base.placeText(this.scene, textStr, { x: 0.5, y: 0.5 }, textStyle);

        this.scene.aGGrid.placeAtIndex(41.5, this.score);

        this.levelPopupContainer.add([this.base, timeText, this.pHead, this.score]);

    }
    SetTimer() {
        if (this.cTimer > 1) {
            this.cTimer--;
            this.levelPopupContainer.list[1].setText(this.cTimer);
        } else if (this.cTimer == 1) {
            this.levelPopupContainer.list[1].setText("GO");
            this.gameTime.paused = true;
        }
        if (this.levelPopupContainer.list[1].text == "GO") {
            setTimeout(() => {
                // this.gameTime.reset();
                this.HideLevelCompletionPopup();
            }, 500);
        }
    }
    countdownComplete() {
        console.log('-----------');
        this.HideLevelCompletionPopup();
    }

    ShowLevelCompletionPopup(_text, score) {
        this.pHead.setText(_text);
        this.score.setText(score);
        this.bg.setVisible(true);
        this.levelPopupContainer.setVisible(true);
        this.gameTime.paused = false;
    }

    HideLevelCompletionPopup() {
        this.bg.setVisible(false);
        this.levelPopupContainer.setVisible(false);
    }
}

export default LevelCompletionPopup;