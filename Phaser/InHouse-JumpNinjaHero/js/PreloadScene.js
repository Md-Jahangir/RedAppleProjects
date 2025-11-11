export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.percentText = null;
    }
    preload() {
        this.load.image('progressBar', 'assets/images/progress_bar.png');
    }
    create() {
        // console.log(scaleFactorX);
        this.progressBar = this.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 2), "progressBar").setOrigin(0.5).setScale(1.5 * scaleFactorX, 1.5 * scaleFactorY);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
        let percentTextStyle = { fontFamily: 'Roboto_Bold', fontSize: "45px", fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.percentText = this.add.text(this.progressBar.x, this.progressBar.y + 100, "Loading...", percentTextStyle).setOrigin(0.5).setScale(1.5 * scaleFactorX, 1.5 * scaleFactorY);
        this.LoadAssets();
    }
    LoadAssets() {
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.OnComplete, { scene: this.scene });
        this.load.setPath('assets/images/');
        this.load.image('playButton', 'play_buttons.png');
        this.load.image('sky', 'Sky.jpg');
        this.load.image('bg_two', 'bg_back_layer_02.png');
        this.load.image('bg_one', 'bg_back_layer_01.png');
        this.load.image('tree_one', 'Tree_01.png');
        this.load.image('tree_two', 'Tree_02.png');
        this.load.image('tree_three', 'Tree_03.png');
        this.load.image('leaves_one', 'Tree_back_01.png');
        this.load.image('leaves_two', 'Tree_back_02.png');
        this.load.image('leaves_three', 'Tree_back_03.png');
        this.load.image('sky_day', 'Sky_day.jpg');
        this.load.image('bg_day_two', 'bg_day_back_layer_02.png');
        this.load.image('bg_day_one', 'bg_day_back_layer_01.png');
        this.load.image('trees_day', 'front_layer.png');
        this.load.image('ground_night', 'Ground_night.jpg');
        this.load.image('ground_day', 'Ground_day.png');
        this.load.spritesheet('jump_ninja', 'jumpfall_spritesheet.png', { frameWidth: 67, frameHeight: 123 });
        this.load.spritesheet('run_ninja', 'run_spritesheet.png', { frameWidth: 79, frameHeight: 124 });
        this.load.spritesheet('dead_ninja', 'death_spritesheet.png', { frameWidth: 78.75, frameHeight: 128 });
        this.load.image('obs', 'shuriken.png');
        this.load.image('onepixel', 'onepixel.png');
        this.load.image('ribbon', 'black_ribbon.png');
        this.load.image('home', 'home.png');
        this.load.image('leaderboard', 'leaderboard.png');
        this.load.image('replay', 'replay.png');
        this.load.image('rating', 'rating.png');
        this.load.setPath('assets/audio/');
        this.load.audio('intro', 'ninja_theme.ogg');
        this.load.audio('game', 'game_theme.mp3');
        this.load.audio('jump_duck', 'jump_duck.wav');
        this.load.audio('game_over', 'game_over.mp3');
        this.load.start();
    }
    LoadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
        this.percentText.setText("Loading..." + Math.round(percentage) + "%");
    }
    OnComplete() {
        this.scene.stop('PreloadScene');
        this.scene.start('TitleScene');
    }
}