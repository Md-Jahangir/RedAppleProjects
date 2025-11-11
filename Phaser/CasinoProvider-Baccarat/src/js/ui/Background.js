import { Constant } from "../Constant";
class Background {
    constructor(scene) {
        this.scene = scene;
    };

    create() {
        if (Constant.isPortrait) {
            let background = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "bg_gameplay").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        }
        else {
            let background = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "bg_gameplay").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        }
    }


}


export default Background;