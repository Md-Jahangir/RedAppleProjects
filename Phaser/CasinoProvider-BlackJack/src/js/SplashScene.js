import { Constant } from "./Constant";
import { SoundManager } from "./SoundManager";
export default class SplashScene extends Phaser.Scene {
    constructor() {
        super("SplashScene");
    }
    preload() {
        // this.load.image('title_art_bg', 'assets/images/loader/loader_bg.png');
        // this.load.image('checkbox', 'assets/images/loader/checkbox.png');
        // this.load.image('tick', 'assets/images/loader/tick.png');
        // this.load.setPath('assets/images/spines');
        // this.load.spine('spine_title_art', 'titleart_export/title_art.json', 'titleart_export/title_art.atlas');
        // this.load.setPath('');
    }

    create() {
        SoundManager.PlayGameBgSound();
        this.splashContainer = this.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.splashBg = this.add.image(0, 0, 'title_bg').setInteractive({ useHandCursor: true });
        this.titleArtSpine = this.add.spine(0, 50, "spine_title_art");
        this.titleArtSpine.play('animation', false);
        this.titleArtSpine.on('complete', () => {
            this.playButton = this.add.image(this.splashBg.x + 30, this.splashBg.y + 450, 'play_button').setInteractive({ useHandCursor: true });
            this.splashContainer.add(this.playButton);
            this.playButton.on('pointerup', this.PlayButtonClicked, this);
            // this.titleArtSpine.play('animation', true);
        })


        // this.playButton.setScale(0.45)
        this.checkBox = this.add.image(this.splashBg.x - 900, this.splashBg.y + 500, 'checkbox').setInteractive({ useHandCursor: true })
        this.tick = this.add.image(this.checkBox.x, this.checkBox.y, 'tick').setVisible(false).setInteractive({ useHandCursor: true });
        this.tickBoxText = this.add.text(
            this.checkBox.x + 50,
            this.checkBox.y,
            "DON'T SHOW NEXT TIME", {
            fontFamily: "kingsandpirates-peak",
            fontStyle: "bold",
            fontSize: "20px",
            color: '#fff'
        }
        ).setOrigin(0, 0.5);

        this.checkBox.on('pointerup', this.CheckBoxClicked, this);
        this.tick.on('pointerup', this.TickBoxClicked, this);
        this.splashContainer.add([this.splashBg, this.titleArtSpine, this.checkBox, this.tick, this.tickBoxText])
    }
    CheckBoxClicked() {
        this.tick.setVisible(true);
        localStorage.setItem('checkbox_selected_blackjack', true);
    }
    TickBoxClicked() {
        this.tick.setVisible(false);
        localStorage.setItem('checkbox_selected_blackjack', false);
    }
    PlayButtonClicked() {
        this.playButton.setVisible(false);
        this.scene.start("GameScene");
    }

}