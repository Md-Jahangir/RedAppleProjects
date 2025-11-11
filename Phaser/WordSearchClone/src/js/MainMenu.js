import { color } from "three/examples/jsm/nodes/Nodes.js";
import { Constant } from "./Constant";
import { Base } from "./util/base";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
        this.mode = null;
    }
    create() {
        //Background.

        this.bg = Base.placeImage(this, 'bg_' + Constant.bgTheme, false, { _oX: 0, _oY: 0 }, 0, 0);
        this.bg.setDisplaySize(Constant.game.config.width, Constant.game.config.height);

        this.LoadAssets();
        this.PlayButton();
        this.BeginerButton();
        this.IntermediateButton();
        this.ExpertButton();
        this.TextTween();
    }
    LoadAssets() {
        //PlayButton
        this.textColor = new Phaser.Display.Color(232, 19, 19);
        this.playButton = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 1.2, 'mode');
        this.playText = this.add.text(Constant.game.config.width / 2, Constant.game.config.height / 1.2, 'Choose Play Mode', { fontFamily: 'FredokaOne-Regular', fontSize: 60, color: '#e81313' }).setOrigin(0.5);

        //logo and title
        this.logo = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 4, 'logo').setScale(0.5);

        //NewUI
        this.modeButtonEasy = this.add.image(0, -180, 'mode_button').setScale(0.5).setInteractive();
        this.modeTextEasy = this.add.text(0, -180, 'Beginer', { fontFamily: 'FredokaOne-Regular', fontSize: 50 }).setOrigin(0.5);
        this.modeButtonMedium = this.add.image(0, 0, 'mode_button').setScale(0.5).setInteractive();
        this.modeTextMedium = this.add.text(0, 0, 'Intermediate', { fontFamily: 'FredokaOne-Regular', fontSize: 50 }).setOrigin(0.5);
        this.modeButtonHard = this.add.image(0, 180, 'mode_button').setScale(0.5).setInteractive();
        this.modeTextHard = this.add.text(0, 180, 'Expert', { fontFamily: 'FredokaOne-Regular', fontSize: 50 }).setOrigin(0.5);
        this.modeBaseContainer = this.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2);
        this.modeBaseContainer.add([this.modeButtonEasy, this.modeButtonMedium, this.modeButtonHard, this.modeTextEasy, this.modeTextMedium, this.modeTextHard]);
    }
    PlayButton() {
        this.playButton.on('pointerdown', function () {
            this.cameras.main.fadeOut(200);
            this.sceneChange = this.time.delayedCall(200, this.SceneChange, null, this);
        }, this);
    }
    BeginerButton() {
        this.modeButtonEasy.on('pointerdown', () => {
            this.mode = 'Beginer';
            this.playText.setText('Play ' + this.mode);
            this.playText.setColor("#2fe813");
            this.playButton.setInteractive();
        }, this);
    }
    IntermediateButton() {
        this.modeButtonMedium.on('pointerdown', () => {
            this.mode = 'Intermediate';
            this.playText.setText('Play ' + this.mode);
            this.playText.setColor("#2fe813");
            this.playButton.setInteractive();
        }, this);
    }
    ExpertButton() {
        this.modeButtonHard.on('pointerdown', () => {
            this.mode = 'Expert';
            this.playText.setText('Play ' + this.mode);
            this.playText.setColor("#2fe813");
            this.playButton.setInteractive();
        }, this);
    }
    SceneChange() {
        this.game.scene.stop('MainMenu');
        this.game.scene.start('CategoryScene', this.mode);
    }

    TextTween() {
        this.tweens.add({
            targets: this.playText,
            alpha: 0,
            duration: 1000,
            repeat: -1,
            yoyo: true
        }, this);
    }
}