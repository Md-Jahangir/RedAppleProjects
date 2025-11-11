import { Constant } from "./Constant";
import { SoundManager } from "./SoundManager";
export default class SplashScene extends Phaser.Scene {
    constructor() {
        super("SplashScene");
    }

    create() {
        SoundManager.PlayGameBgSound();
        this.splashContainer = this.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.exteriorBg = this.add.spine(0, 0, "spine_game_bg").setScale(1);
        this.exteriorBg.play('animation', true);
        this.overlay = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, "loading_overlay");
        this.overlay.setAlpha(0.4);
        this.playButton = this.add.image(this.exteriorBg.x + 30, this.exteriorBg.y + 350, 'play_button').setInteractive({ useHandCursor: true }).setVisible(false);
        this.playButton.setScale(0.45)
        this.playButton.on('pointerup', this.PlayButtonClicked, this);
        this.logo = this.add.spine(this.exteriorBg.x, this.exteriorBg.y - 100, "title_art_spine");
        this.logo.play('title_art_in', false);
        this.logo.on('complete', () => {
            this.playButton.setVisible(true);
            this.logo.play('loop', true);
        })

        this.checkBox = this.add.image(this.exteriorBg.x - 120, this.exteriorBg.y + 500, 'checkbox').setInteractive({ useHandCursor: true }).setScale(0.6);
        this.tick = this.add.image(this.checkBox.x, this.checkBox.y, 'tick').setVisible(false).setInteractive({ useHandCursor: true }).setScale(0.5);
        this.tickBoxText = this.add.text(
            this.checkBox.x + 30,
            this.checkBox.y + 5,
            "DON'T SHOW NEXT TIME", {
            fontFamily: "modesto-expanded",
            fontStyle: "normal",
            fontSize: "20px",
            color: '#fff'
        }
        ).setOrigin(0, 0.5);

        this.checkBox.on('pointerup', this.CheckBoxClicked, this);
        this.tick.on('pointerup', this.TickBoxClicked, this);

        this.splashContainer.add([this.exteriorBg, this.overlay, this.logo, this.playButton, this.checkBox, this.tick, this.tickBoxText])
    }
    CheckBoxClicked() {
        this.tick.setVisible(true);
        localStorage.setItem('checkbox_selected_pirates', true);
    }
    TickBoxClicked() {
        this.tick.setVisible(false);
        localStorage.setItem('checkbox_selected_pirates', false);
    }
    PlayButtonClicked() {
        SoundManager.ButtonClickSound();
        SoundManager.StopGameBgSound();
        this.playButton.setVisible(false);
        this.cameras.main.fadeOut(150, 0, 0, 0); // 1000 ms duration, RGB color (0, 0, 0)
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('GameScene');
        });
    }

}