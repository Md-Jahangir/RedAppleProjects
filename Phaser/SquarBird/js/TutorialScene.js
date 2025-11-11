import Background from "./Background.js";
import GameUI from "./GameUI.js";
export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super('TutorialScene');
    }
    init() {
        this.bg = new Background(this);
        this.gameUI = new GameUI(this);
        this.playButton = null;
    }
    create() {
        this.ShowBG();
        this.ShowTutorialUI();
        // let titleText = this.add.text(940, 380, 'Turkey Adventure', { fontFamily: 'Arial', fontSize: 80, fill: '#FFFFFF', align: 'Center' });
        // titleText.setOrigin(0.5);
        // titleText.setStroke('#000000', 4);
        // //  Apply the gradient fill.
        // const gradient = titleText.context.createLinearGradient(0, 0, 0, titleText.height);
        // gradient.addColorStop(0, '#111111');
        // gradient.addColorStop(.5, '#ffffff');
        // gradient.addColorStop(.5, '#aaaaaa');
        // gradient.addColorStop(1, '#111111');

        // titleText.setFill(gradient);
        // this.playButton = this.add.image(940, 650, 'playButton').setInteractive({ useHandCursor: true });
        // this.playButton.on('pointerdown', this.OnPointerDown, this);
        // this.playButton.on('pointerup', this.OnPointerUp, this);

    }
    ShowBG() {
        this.bg.CreateTutorialBG();
    }
    ShowTutorialUI() {
        this.gameUI.CreateInstructionScene();

    }
    OnPointerDown() {
        let tweenSmall = this.tweens.add({
            targets: this.playButton,
            scale: 0.4,
            duration: 80,
        });
        setTimeout(() => {
            this.scene.stop('TitleScene');
            this.scene.start('GameScene');
        }, 100);
    }
    OnPointerUp() {
        let tweenBig = this.tweens.add({
            targets: this.playButton,
            scale: 0.5,
            duration: 75,
        });
        setTimeout(() => {
            this.scene.stop('TitleScene');
            this.scene.start('GameScene');
        }, 100);
    }
}