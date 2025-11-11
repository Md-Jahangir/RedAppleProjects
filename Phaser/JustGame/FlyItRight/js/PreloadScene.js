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
        this.load.image('one_pixel_black', 'assets/one_pixel_black.png');
        this.load.image('menu_bg', 'assets/menu_bg.png');
        this.load.image('title', 'assets/title.png');
        this.load.image('button_base', 'assets/button_base.png');
        this.load.image('gameplay_bg', 'assets/gameplay_bg.png');
        this.load.image('back_button', 'assets/back_button.png');
        this.load.image('sound_on', 'assets/sound_on.png');
        this.load.image('sound_off', 'assets/sound_off.png');
        this.load.image('play_button', 'assets/play_button.png');

        this.load.image('player', 'assets/player.png');
        this.load.image('obstacle', 'assets/obstacle.png');
        this.load.image('platform', 'assets/platform.png');

        this.load.image('popup_base', 'assets/popup_base.png');
        this.load.image('gameover_heading', 'assets/gameover_heading.png');

        this.load.audio('button_click_sound', 'sounds/button_click_sound.mp3');
        this.load.audio('knife_attach_sound', 'sounds/knife_attach_sound.mp3');
        this.load.audio('obstacle_collide_sound', 'sounds/obstacle_collide_sound.mp3');
        this.load.audio('bg_music', 'sounds/bg_music.mp3');

        this.load.start();
    }

    create() {
        var logo = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 3), "logo", 0.5, 0.5, scaleFactor, scaleFactor);
        this.progressBar = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 1.4), "progress_bar", 0.5, 0.5, scaleFactor, scaleFactor);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
        this.loadingText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.33), "Loading: ", { fontFamily: 'Bahnschrift', fontSize: '46px', fill: '#FFF', fontStyle: "normal", align: 'center' }).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);

        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });
    }

    loadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
        this.loadingText.setText("Loading: " + parseInt(percentage) + " %");
    }

    complete() {
        setTimeout(() => {
            SoundManager.AddSound();
            this.scene.start("TitleScene");
            // this.scene.start("GameScene");
        }, 1000);
    }

}