import { Constant } from "./Constant";
import base from "./util/base";

export default class TutorialScene extends Phaser.Scene {

    constructor() {
        super('TutorialScene');
        // this.base = new base(this)

    }
    create() {

        let playButton = this.base.placeImage('play', true, null, Constant.game.config.width / 2, Constant.game.config.height / 2);

        playButton.on('pointerup', () => {
            this.scene.stop();
            this.scene.start('CategoryScene');
        });

    }
    update() {

    }
}