import { AlignGrid } from "./util/alignGrid";
import { Constant } from "./Constant.js";
import { SoundManeger } from "./SoundManeger.js";

export default class GameTutorialScene extends Phaser.Scene {

    constructor() {

        super("GameTutorialScene");
        // this.playButton = null;
        // this.thumbnailContainer = null;
        // this.thymbnailPlayerAnimation = null;
    }

    init() {

        this.infoBg = null;
        this.content = null;
        this.buttonGreen = null;
        this.buttonBlue = null;
        this.nxtTxt = null;
        this.skipTxt = null;
        this.counter = null;

    }

    create() {


        this.AddAlignGrid();
        this.CreateTutorialScene();

    }

    AddAlignGrid() {

        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 13
        });
        // this.aGrid.showNumbers();
    }

    CreateTutorialScene() {

        this.infoBg = this.add.image(0, 0, 'info_bg_one').setScale(Constant.scaleFactor);
        this.aGrid.placeAtIndex(71, this.infoBg);

        let shadow = this.add.image(0, 0, 'overlay').setScale(Constant.scaleFactorX * 1080);
        this.aGrid.placeAtIndex(71, shadow);

        this.content = this.add.image(0, 0, 'content_one').setScale(Constant.scaleFactor);
        this.aGrid.placeAtIndex(71, this.content);

        this.buttonGreen = this.add.image(0, 0, 'button_base_green').setScale(Constant.scaleFactor).setName("Next").setInteractive({ useHandCursor: true });
        this.buttonBlue = this.add.image(0, 0, 'button_base_blue').setScale(Constant.scaleFactor).setName("Skip").setInteractive({ useHandCursor: true });
        this.aGrid.placeAtIndex(140.8, this.buttonGreen);
        this.aGrid.placeAtIndex(131.3, this.buttonBlue);

        let howToPlayTextStyle = { fontFamily: 'BRITANIC', fontSize: "60px", fontStyle: 'bold', align: 'center' };
        this.nxtTxt = this.add.text(0, 0, "NEXT", howToPlayTextStyle).setOrigin(0.5);
        this.skipTxt = this.add.text(0, 0, "SKIP", howToPlayTextStyle).setOrigin(0.5);
        this.nxtTxt.copyPosition(this.buttonGreen);
        this.skipTxt.copyPosition(this.buttonBlue);

        this.counter = 0;

        this.InteractiveButtons();

    }

    InteractiveButtons() {

        this.buttonGreen.on('pointerup', () => {

            if (this.buttonGreen.name == 'Play') {
                this.scene.stop();
                this.scene.start('GameScene');
                Constant.game.events.emit("playerPumpUpAnimEvent");
                Constant.game.events.emit("eventsPotAnimationOnStart");

                SoundManeger.PlayBgMusic();

            }

            else {
                this.counter++;
                this.OnPressingButtons(this.counter);
            }

        });

        this.buttonBlue.on('pointerup', () => {

            if (this.buttonBlue.name == 'Skip') {
                this.scene.stop();
                this.scene.start('GameScene');
            }

            else {
                this.counter--;
                this.OnPressingButtons(this.counter);
            }

        });

    }

    OnPressingButtons(_count) {

        switch (_count) {

            case 0: this.content.setTexture('content_one');
                this.aGrid.placeAtIndex(71, this.content);
                this.skipTxt.setText("SKIP");
                this.buttonBlue.setName("Skip");
                break;

            case 1: this.infoBg.setTexture("info_bg_one");
                this.content.setTexture('content_two');
                this.aGrid.placeAtIndex(84, this.content);
                this.skipTxt.setText("PRE");
                this.buttonBlue.setName("Pre");
                break;

            case 2: this.infoBg.setTexture("info_bg_two");
                this.content.setTexture('content_three');
                this.aGrid.placeAtIndex(84, this.content);
                break;

            case 3: this.infoBg.setTexture("info_bg_one");
                this.content.setTexture('content_four');
                this.aGrid.placeAtIndex(110, this.content);
                this.nxtTxt.setText("PLAY");
                this.buttonGreen.setName("Play");
                break;

        }

    }

    update() {



    }

}