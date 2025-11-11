export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.loadAssests();
    }

    loadAssests() {

        this.load.image('one_pixel_white', 'assets/images/one_pixel_white.png');
        // this.load.image('one_pixel_black', 'assets/images/one_pixel_black.png');

        this.load.image('ball', 'assets/images/Ball.png');
        this.load.image('border','assets/images/border.png');
        this.load.image('defaultBg','assets/images/defaultBg.png');
        this.load.image('redLine','assets/images/redLine.png');
        this.load.image('soundOff','assets/images/soundOff.png');
        this.load.image('soundOn','assets/images/soundOn.png');
        this.load.image('horizontal-line','assets/images/Top_line.png');
        this.load.image('vertical-line_left','assets/images/Left_line.png');
        this.load.image('vertical-line_right','assets/images/Right_line.png');
        this.load.image('glow_line','assets/images/Full.png');

        this.load.image('bottomline','assets/images/bottomLine.png');

        this.load.image('red','assets/images/Red.png');

        for(let i = 1;i<10;i++)
        {
            this.load.image('anim'+i,'assets/images/'+i+'.png');
        }
        

        
        this.load.audio('button_click_sound', 'sounds/click.mp3');
        this.load.audio('game_over_sound', 'sounds/gameOver.mp3');
        this.load.audio('hit_sound', 'sounds/hit.mp3');
        this.load.audio('bg_music', 'sounds/bgm.mp3');

        this.load.start();
    }

    create() {
        Utils.SpriteSettingsControl(this,game.config.width/2,game.config.height/2, "logo", 0.5, 0.5, scaleFactor/2, scaleFactor/2);
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
            SoundManager.AddSound();
            SoundManager.PlayBgMusic();
            this.scene.start("TitleScene");
        }, 2000);
    }

}