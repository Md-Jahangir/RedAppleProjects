import Background from "./Background.js";
import Ninja from "./Ninja.js";
import Controls from "./Controls.js";
export default class GameTutorialScene extends Phaser.Scene {
    constructor() {
        super('GameTutorialScene');
    }
    init() {
        this.background = new Background(this);
        this.ninja = new Ninja(this);
        this.control = new Controls(this);
    }
    create() {
        this.ShowBG();
        this.ShowPlatForm();
        this.ShowNinja();
        this.PlayRunAnimation();
        this.ShowSceneLogos();
    }
    ShowBG() {
        if (randomNumber == 0) {
            this.background.CreateDayBackground();
        }
        else {
            this.background.CreateNightBackgound();
        }
    }
    MoveBG() {
        if (randomNumber == 0) {
            this.background.MoveDayBackground();
        }
        else {
            this.background.MoveNightBackground();
        }
    }
    ShowPlatForm() {
        if (randomNumber == 0) {
            this.background.CreateDayPlatform();
        }
        else {
            this.background.CreateNightPlatform();
        }
    }
    MovePlatForm() {
        if (randomNumber == 0) {
            this.background.MoveDayPlatform();
        }
        else {
            this.background.MoveNightPlatform();
        }
    }
    ShowNinja() {
        this.ninja.CreateNinja();
    }
    PlayRunAnimation() {
        this.ninja.CreateAnimations();
        this.ninja.ninja.play('run_start');
    }
    ShowSceneLogos() {
        let howToPlatText = this.add.image(game.config.width / 1.959, game.config.height / 5.12, 'how_to_play').setDepth(7).setScale(1.5 * scaleFactorX, 1.5 * scaleFactorY);
        let leftHand = this.add.image(game.config.width / 12.989, game.config.height / 1.09, 'left_hand').setDepth(7).setScale(1 * scaleFactorX, 1 * scaleFactorY);
        let rightHand = this.add.image(game.config.width / 1.09, game.config.height / 1.1, 'right_hand').setDepth(7).setScale(1 * scaleFactorX, 1 * scaleFactorY);
        let leftBox = this.add.image(game.config.width / 4.989, game.config.height / 2.1, 'left_box').setDepth(7).setScale(1.3 * scaleFactorX, 1.3 * scaleFactorY);
        let rightBox = this.add.image(game.config.width / 1.28, game.config.height / 2.3, 'right_box').setDepth(7).setScale(0.9 * scaleFactorX, 0.9 * scaleFactorY);
        let crossButton = this.add.image(game.config.width / 1.04, game.config.height / 13.3, 'cross').setDepth(7).setScale(0.6 * scaleFactorX, 0.6 * scaleFactorY).setInteractive({ useHandCursor: true });
        crossButton.on('pointerup', this.OnPointerUp, this);
    }
    OnPointerUp() {
        this.scene.stop('GameTutorialScene');
        this.scene.start('GameScene');
    }
    update() {
        this.MoveBG();
        this.MovePlatForm();
    }
}