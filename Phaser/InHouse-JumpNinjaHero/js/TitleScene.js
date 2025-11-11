import Background from "./Background.js";
import Ninja from "./Ninja.js";
import Audio from "./SoundManager.js";
export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }
    init() {
        this.bg;
        this.playButton;
        this.background = new Background(this);
        this.ninja = new Ninja(this);
        this.intro = new Audio(this);
    }
    create() {
        this.ShowBG();
        this.ShowTitle();
        this.PlayAudio();
        this.ShowPlayButton();
        this.ShowPlatForm();
        this.ShowNinja();
        this.PlayRunAnimation();
    }
    ShowBG() {
        if (randomNumber == 0) {
            this.background.CreateDayBackground();
        }
        else {
            this.background.CreateNightBackgound();
        }

        // this.bg = this.add.tileSprite(game.config.width / 2, game.config.height / 2, game.config.width, game.config.height, 'night');
    }
    MoveBG() {
        if (randomNumber == 0) {
            this.background.MoveDayBackground();
        }
        else {
            this.background.MoveNightBackground();
        }
        // this.bg.tilePositionX += 5;
    }
    ShowTitle() {
        let titleText = this.add.text(game.config.width / 2.76, game.config.height / 4.32, 'Jump Ninja Hero', { fontFamily: 'Arial', fontSize: (80 * scaleFactorX, 80 * scaleFactorY), fill: '#FFFFFF', align: 'Center' }).setDepth(7);
    }
    PlayAudio() {
        this.intro.CreateSound();
        this.intro.StopGameOverAudio();
        this.intro.PlayMenuAudio();
    }
    ShowPlayButton() {
        this.playButton = this.add.image(game.config.width / 2.04, game.config.height / 2, 'playButton').setInteractive({ useHandCursor: true }).setScale(0.3 * scaleFactorX, 0.3 * scaleFactorY).setOrigin(0.5).setDepth(7);
        if (isMobile) {
            this.playButton.setScale(0.3 * scaleFactorX);
        }
        this.playButton.on('pointerdown', this.OnPointerDown, this);
    }
    OnPointerDown() {
        setTimeout(() => {
            this.playButton.setScale(0.2 * scaleFactorX)//, 0.2 * scaleFactorY);
        }, 100);
        setTimeout(() => {
            this.playButton.setScale(0.3 * scaleFactorX)//, 0.3 * scaleFactorY);
        }, 200);
        setTimeout(() => {
            this.intro.StopMenuAudio();
            this.scene.stop('TitleScene');
            this.scene.start('GameScene');
        }, 280);
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
    update() {
        this.MoveBG();
        this.MovePlatForm();
    }
}