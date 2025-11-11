export default class BootScene extends Phaser.Scene {

    constructor() {
        super('BootScene');
    }

    preload() {
        // this.load.image('logo', 'assets/logo.png');
        // this.load.image('progress_bar', 'assets/progress_bar.png');
        this.load.image('progress_base', 'assets/images/splash/progress_base.png');
        this.load.image('progress_bar', 'assets/images/splash/progress_bar.png');
        this.load.image('title', 'assets/images/menu/title.png');
        this.load.setPath('assets/spine/');
        this.load.spine('menu_page', 'menu_page.json', 'menu_page.atlas')
    }

    create() {
        this.scene.start("PreloadScene");
    }

}