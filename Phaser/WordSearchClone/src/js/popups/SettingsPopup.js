
import { Constant } from "../Constant";
import { Base } from "../util/base";
import { AudioManager } from "../AudioManager";

export default class SettingsPopup {
    constructor(scene, isSound, isMusic) {
        this.scene = scene;
        this.settingsPopupContainer = null;
        this.isSound = isSound;
        this.isMusic = isMusic;
        this.create();
    }
    create() {

        this.settingsPopupContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setDepth(3).setVisible(false);

        this.bg = Base.placeImage(this.scene, 'gBG', true, { _oX: 0, _oY: 0 }, 0, 0);
        this.bg.setDisplaySize(Constant.game.config.width, Constant.game.config.height);

        this.popupBase = this.scene.add.image(580, 960, 'instruction_popup').setScale(1, 1);

        //music on off button add
        this.musicText = this.scene.add.text(400, 800, 'Music :', { fontFamily: "FredokaOne-Regular", fontSize: 60 }).setOrigin(0.5);
        this.musiconoffButton = this.scene.add.image(700, 800, 'toggle', 0).setInteractive();
        this.musiconoffButton.on('pointerup', this.MusicFunc, this);

        //sound on off button add
        this.soundText = this.scene.add.text(400, 1000, 'Sound :', { fontFamily: "FredokaOne-Regular", fontSize: 60 }).setOrigin(0.5);
        this.soundonoffButton = this.scene.add.image(700, 1000, 'toggle', 0).setInteractive();
        this.soundonoffButton.on('pointerup', this.SoundFunc, this);

        this.closeBtn = Base.placeImage(this.scene, 'close_btn', true, null, 0, 0, null);
        this.scene.aGrid.placeAtIndex(28, this.closeBtn);
        this.closeBtn.on('pointerup', this.HideVisible, this);


        this.settingsPopupContainer.add([this.bg, this.popupBase, this.musicText, this.soundText, this.closeBtn, this.musiconoffButton, this.soundonoffButton]);
    }
    //popup visible function control
    ShowVisible() {
        this.scene.gameTime.paused = true;
        this.settingsPopupContainer.setVisible(true);
    }
    //popup hide function control
    HideVisible() {
        AudioManager.PlayButtonPressAudio();
        this.settingsPopupContainer.setVisible(false);
        this.scene.gameTime.paused = false;
    }
    //sound button function
    SoundFunc() {
        AudioManager.PlayButtonPressAudio();
        if (this.isSound) {
            this.soundonoffButton.setFrame(0);
            this.isSound = false;
        }
        else {
            this.soundonoffButton.setFrame(1);
            this.isSound = true;
        }
    }
    //music on off function
    MusicFunc() {
        AudioManager.PlayButtonPressAudio();
        if (this.isMusic) {
            this.musiconoffButton.setFrame(0);
            this.isMusic = false;
        }
        else {
            this.musiconoffButton.setFrame(1);
            this.isMusic = true;
        }
    }
}