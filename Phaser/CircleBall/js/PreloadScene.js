export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.loadingText = null;
    }

    preload() {
        this.loadAssests();
    }

    loadAssests() {
        this.load.image('menu_bg', 'assets/menu_bg.png');
        this.load.image('button_base', 'assets/button_base.png');
        this.load.image('one_pixel_white', 'assets/one_pixel_white.png');
        this.load.image('popup_base', 'assets/popup_base.png');
        this.load.spritesheet('fireFly', 'assets/firefly_spritesheets.png', { frameWidth: 50, frameHeight: 50 });

        this.load.start();
    }

    loadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
        this.loadingText.setText("Loading: " + percentage.toFixed(2) + " %");
    }


    complete() {
        setTimeout(() => {
            this.scene.start("TitleScene");
        }, 1000);
    }

    create() {

        var logo = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 3), "logo", 0.5, 0.5, null, null);

        this.progressBar = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 1.8), "progress_bar", 0.5, 0.5, null, null);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);

        this.loadingText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.7), "Loading: ", { fontFamily: 'Bahnschrift', fontSize: '38px', fill: '#FFF', fontStyle: "normal", align: 'center' }).setOrigin(0.5, 0.5);

        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });
    }


}