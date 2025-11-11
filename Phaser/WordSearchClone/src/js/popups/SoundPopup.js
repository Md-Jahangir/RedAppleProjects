import { Constant } from "../Constant";
import { Align } from "../util/align";
import { Base } from "../util/base";

class SoundPopup {

    constructor(scene) {
        this.scene = scene;

        this.soundPopupContainer = null;
        this.CreateSoundPopup();
    }
    CreateSoundPopup() {
        this.bg = Base.placeImage(this.scene, 'gBG', true, { _oX: 0, _oY: 0 }, 0, 0);
        this.bg.setDisplaySize(Constant.game.config.width, Constant.game.config.height);
        this.bg.setDepth(3);
        this.bg.setVisible(false);

        this.soundPopupContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactor).setVisible(false).setDepth(3);
        this.closeBtn = Base.placeImage(this.scene, 'close_btn', true, null, 0, 0, null);
        this.scene.aGrid.placeAtIndex(18, this.closeBtn);

        this.musicbase = Base.placeImage(this.scene, 'mode', true, null, 0, 0, null);
        this.scene.aGrid.placeAtIndex(44.5, this.musicbase);

        let textStr = 'Music On';
        let textStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 70, color: '#BE132D', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };
        let mTxt = Base.placeText(this.scene, textStr, { x: 0, y: 0 }, textStyle);
        // txt.setAdvancedWordWrap(true, 400)
        mTxt.copyPosition(this.musicbase);
        mTxt.setOrigin(0.5, 0.5)

        this.musicbase.on('pointerdown', () => {
            if (mTxt.text === 'Music On')
                mTxt.setText('Music Off');
            else
                mTxt.setText('Music On');
        });

        this.soundbase = Base.placeImage(this.scene, 'mode', true, null, 0, 0, null);
        this.scene.aGrid.placeAtIndex(74.5, this.soundbase);

        let stextStr = 'Sound On';
        let stextStyle = {
            fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 70, color: '#BE132D', fontStyle: 'bold', lineSpacing: 10, wordWrap: { width: 900, useAdvancedWrap: true }
        };
        let sTxt = Base.placeText(this.scene, stextStr, { x: 0, y: 0 }, stextStyle);
        // txt.setAdvancedWordWrap(true, 400)
        sTxt.copyPosition(this.soundbase);
        sTxt.setOrigin(0.5, 0.5);

        this.soundbase.on('pointerdown', () => {
            if (sTxt.text === 'Sound On')
                sTxt.setText('Sound Off');
            else
                sTxt.setText('Sound On');
        });

        this.soundPopupContainer.add([this.closeBtn, this.musicbase, mTxt, this.soundbase, sTxt]);

    }
    ShowSoundPoup() {
        this.bg.setVisible(true);
        this.soundPopupContainer.setVisible(true);
    }
    HideSoundPopup() {
        this.bg.setVisible(false);
        this.soundPopupContainer.setVisible(false);
    }
}

export default SoundPopup;