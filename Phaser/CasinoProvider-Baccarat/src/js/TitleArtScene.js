import { Constant } from './Constant.js';
export default class TitleArtScene extends Phaser.Scene {

    constructor() {
        super('TitleArtScene');
        this.titleArtContainer = null;
    };

    create() {
        this.input.setDefaultCursor('url(assets/images/custom_cursor.png), pointer');
        this.titleArtContainer = this.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.TitleArtLogo();
        this.TitleArtButton();
    }
    TitleArtLogo() {
        this.titleArtLogo = this.add.image(0, 0, "title_art").setOrigin(0.5, 0.5);
        this.titleArtContainer.add(this.titleArtLogo);
    }
    TitleArtButton() {
        if (Constant.isMobile) {
            this.titleArtbutton = this.add.image(0, 350, "play_button").setOrigin(0.5, 0.5);
        } else {
            this.titleArtbutton = this.add.image(0, 415, "play_button").setOrigin(0.5, 0.5);
        }
        // this.titleArtbutton = this.add.image(0, 415, "play_button").setOrigin(0.5, 0.5);
        this.titleArtbutton.setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' });
        this.titleArtContainer.add(this.titleArtbutton);
        this.titleArtbutton.on('pointerover', this.OverPlayButton, this);
        this.titleArtbutton.on('pointerout', this.OutPlayButton, this);
        this.titleArtbutton.on('pointerdown', this.PressedPlayButton, this);
        this.titleArtbutton.on('pointerup', this.ReleasedPlayButton, this);
    }
    OverPlayButton() {
        this.titleArtContainer.list[1].setScale(1.1);
    }
    OutPlayButton() {
        this.titleArtContainer.list[1].setScale(1);
    }
    PressedPlayButton() {
        this.titleArtContainer.list[1].setScale(1.1);
    }
    ReleasedPlayButton() {
        this.titleArtContainer.list[1].setScale(1);
        this.scene.start('GameScene');
    }



}