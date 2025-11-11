import { Constant } from "./Constant";

class Button {
    constructor(scene, imgkey, x, y) {
        this.scene = scene;
        this.imgKey = imgkey;
        this.x = x;
        this.y = y;
        this.scaleSizer = null;

        this.create(imgkey);

    }
    create(imgkey) {
        if (this.imgKey == 'but_restart' || this.imgKey == 'but_home') {
            this.scaleSizer = 1;
        }
        else {
            this.scaleSizer = Constant.scaleFactor;
        }
        this.but = this.scene.add.image(this.x, this.y, imgkey).setScale(this.scaleSizer);
        this.but.setInteractive({ useHandCursor: true });
        this.but.on('pointerover', this.onOver, this);
        this.but.on('pointerout', this.onOut, this);
        this.but.on('pointerup', this.onUp, this);
    }
    onOver() {
        this.but.setScale(this.scaleSizer * 1.2);
    }
    onOut() {
        this.but.setScale(this.scaleSizer);
    }
    onUp() {
        if (this.imgKey == 'but_play') {
            this.PlayBut();
        }
        if (this.imgKey == 'but_restart') {
            this.scene.scene.restart('GameScene');
        }
        if (this.imgKey == 'but_home') {
            this.scene.scene.stop('GameScene');
            this.scene.scene.start('MenuScene');
        }
    }

    PlayBut() {
        this.but.removeInteractive();
        this.scene.scene.stop('MenuScene');
        this.scene.scene.start('GameScene');
        // console.log('play');
    }

} export default Button;