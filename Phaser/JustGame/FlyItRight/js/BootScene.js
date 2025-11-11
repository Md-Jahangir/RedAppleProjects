export default class BootScene extends Phaser.Scene {

    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('progress_bar', 'assets/progress_bar.png');
    }

    create() {
        this.scene.start("PreloadScene");
    }

}