export default class BootScene extends Phaser.Scene {

    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('splash_bg', 'assets/images/splash/splash_bg.png');
        this.load.image('logo', 'assets/images/splash/logo.png');
        this.load.image('progress_base', 'assets/images/splash/progress_base.png');
        this.load.image('progress_bar', 'assets/images/splash/progress_bar.png');
        this.load.setPath('assets/spine/');
        this.load.spine('bg_sprite', 'bg.json', 'bg.atlas');
    }

    create() {
        this.scene.start("PreloadScene");
    }

}