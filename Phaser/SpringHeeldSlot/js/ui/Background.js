class Background {
    constructor(scene) {
        this.scene = scene;
        this.background =
            this.create();
    };

    create() {
        this.background = this.scene.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 2), "gameplay_bg").setOrigin(0.5).setScale(scaleFactorX, scaleFactorY);
        this.reelFrame = this.scene.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 2), "gameplay_frame").setOrigin(0.5).setScale(scaleFactorX, scaleFactorY);
    }

}

export default Background;