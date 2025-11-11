export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.loadingText = null;
    }
    init() {

    }
    preload() {
        this.loadAssests();
    }

    loadAssests() {
        //MENU 
        this.load.image('title', 'assets/images/menu/title.png');

        //GAMEPLAY
        this.load.image('gameplay_bg', 'assets/images/gameplay/gameplay_bg.png');
        this.load.image('back_button', 'assets/images/gameplay/back_button.png');
        this.load.image('sound_off', 'assets/images/gameplay/sound_off.png');
        this.load.image('sound_on', 'assets/images/gameplay/sound_on.png');
        this.load.image('blue_egg', 'assets/images/gameplay/blue_egg.png');
        this.load.image('yellow_egg', 'assets/images/gameplay/yellow_egg.png');

        //POPUP
        this.load.image('quit_base', 'assets/images/popup/quit_base.png');
        this.load.image('yes_button', 'assets/images/popup/yes_button.png');
        this.load.image('no_button', 'assets/images/popup/no_button.png');
        this.load.spritesheet('hand', 'assets/images/popup/hand.png', { frameWidth: 256, frameHeight: 256 });

        this.load.image('one_pixel_white', 'assets/one_pixel_white.png');
        this.load.image('one_pixel_black', 'assets/one_pixel_black.png');
        this.load.image('button_base', 'assets/button_base.png');
        this.load.image('popup_base', 'assets/popup_base.png');
        this.load.image('gameover_heading', 'assets/gameover_heading.png');

        //AUDIO
        this.load.audio('button_click_sound', 'sounds/button_click_sound.mp3');
        this.load.audio('knife_attach_sound', 'sounds/knife_attach_sound.mp3');
        this.load.audio('obstacle_collide_sound', 'sounds/obstacle_collide_sound.mp3');
        this.load.audio('bg_music', 'sounds/bg_music.mp3');

        // SPINE
        this.LoadSpineAssets();

        this.load.start();
    }

    LoadSpineAssets() {
        // SPINE
        this.load.setPath('assets/spine/');
        this.load.spine('menu_blue_turtle', 'splash page blue turtle.json', 'splash page blue turtle.atlas')
        this.load.spine('menu_yellow_turtle', 'splash page yellow turtle.json', 'splash page yellow turtle.atlas')
        this.load.spine('blue_turtle', 'Blue turtle.json', 'Blue turtle.atlas')
        this.load.spine('yellow_turtle', 'yellow turtle.json', 'yellow turtle.atlas')
        this.load.spine('play_button', 'play_button.json', 'play_button.atlas')
        this.load.spine('menu_bubbles', 'bubbles.json', 'bubbles.atlas')
    }

    create() {
        let bg = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "splash_bg", 0.5, 0.5, scaleFactor, scaleFactor);
        let logo = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 3.3), "logo", 0.5, 0.5, scaleFactor, scaleFactor);

        this.progressBase = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 1.35), "progress_base", 0.5, 0.5, scaleFactor, scaleFactor);
        this.progressBar = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 1.35), "progress_bar", 0.5, 0.5, scaleFactor, scaleFactor);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
        this.loadingText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.29), "Loading : ", { fontFamily: 'aAbstractGroovy', fontSize: '35px', fill: '#baa6ff', fontStyle: "normal", align: 'center' }).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);

        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });
    }

    loadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
        this.loadingText.setText("Loading : " + parseInt(percentage) + " %");
    }

    complete() {
        setTimeout(() => {
            SoundManager.AddSound();
            this.scene.start("TitleScene");
            // this.scene.start("GameScene");
        }, 1000);
    }

}