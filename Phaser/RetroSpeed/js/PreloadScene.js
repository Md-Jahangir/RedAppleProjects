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
        this.load.image('bgOne', 'bg-sheet0.png');
        this.load.image('bgTwo', 'bg-sheet1.png');
        this.load.image('bgThree', 'bg-sheet2.png');
        this.load.image('player', 'car-truck1.png');
        this.load.image('obs_carOne', 'car-truck2.png');
        this.load.image('obs_carTwo', 'car-truck3.png');
        this.load.image('obs_carThree', 'car-truck4.png');
        this.load.image('obs_carFour', 'car-truck5.png');
        this.load.image('title', 'logo-sheet0.png');
        this.load.image('play_button', 'play-sheet0.png');
        this.load.image('title', 'logo-sheet0.png');
        this.load.image('share', 'fb-sheet0.png');
        this.load.image('tap', 'tap-sheet0.png');
        this.load.image('overlay', 'overlay.png');
        this.load.image('game_over', 'gameover-sheet0.png');
        this.load.spritesheet('counter', 'counter.png', { frameWidth: 50, frameHeight: 75 });
        this.load.image('score', 'score-sheet0.png');
        this.load.image('enter', 'fullscreen.png');
        this.load.image('exit', 'fullscreen_exit.png');
        this.load.setPath('assets/audio/');
        this.load.audio('click', 'click.wav');
        this.load.audio('vroom', 'car_engine.wav');
        this.load.audio('crash', 'stop.wav');
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