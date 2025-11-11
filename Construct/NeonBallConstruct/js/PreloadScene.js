export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.loadAssests();
    }

    loadAssests() {

        // this.load.image('one_pixel_white', 'assets/images/one_pixel_white.png');
        // this.load.image('one_pixel_black', 'assets/images/one_pixel_black.png');

        this.load.image('ball', 'assets/images/Ball.png');
        this.load.image('border','assets/images/border.png');
        this.load.image('defaultBg','assets/images/defaultBg.png');
        this.load.image('redLine','assets/images/redLine.png');
        this.load.image('soundOff','assets/images/soundOff.png');
        this.load.image('soundOn','assets/images/soundOn.png');

        for(let i = 1;i<10;i++)
        {
            this.load.image('anim'+i,'assets/images/'+i+'.png');
        }
        

        
        // this.load.audio('button_click_sound', 'sounds/button_click_sound.mp3');
        // this.load.audio('knife_attach_sound', 'sounds/knife_attach_sound.mp3');
        // this.load.audio('obstacle_collide_sound', 'sounds/obstacle_collide_sound.mp3');
        // this.load.audio('bg_music', 'sounds/bg_music.mp3');

        this.load.start();
    }

    create() {
        Utils.SpriteSettingsControl(this,game.config.width/2,game.config.height/2, "logo", 0.5, 0.5, scaleFactor/2, scaleFactor/2);
        // this.progressBar = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 1.4), "progress_bar", 0.5, 0.5, scaleFactor, scaleFactor);
        // this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
        // this.loadingText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.33), "Loading: ", { fontFamily: 'Bahnschrift', fontSize: '46px', fill: '#FFF', fontStyle: "normal", align: 'center' }).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);

        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });
    }

    loadProgress(percentage) {
        // this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        // percentage = percentage * 100;
        // this.loadingText.setText("Loading: " + parseInt(percentage) + " %");
    }

    complete() {
        setTimeout(() => {
            // SoundManager.AddSound();
            this.scene.start("TitleScene");
        }, 2000);
    }

}