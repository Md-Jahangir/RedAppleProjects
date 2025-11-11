import { Constant } from "../Constant";
class Background {
    constructor(scene) {
        this.scene = scene;
        this.background =
            this.create();
    };

    create() {
        this.background = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "gameplay_bg").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
    }

}

export default Background;