import { Constant } from "../Constant.js";
class Background {
    constructor(scene) {
        this.scene = scene;
        this.background = null;
        this.create();
    };

    create() {
        if (Constant.isPortrait) {
            this.background = this.scene.add.spine(Constant.game.config.width / 2, Constant.game.config.height / 2, "spine_game_bg");
            this.overlay = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, "loading_overlay");
            this.overlay.setAlpha(0.4);

        }
        else {
            this.background = this.scene.add.spine(Constant.game.config.width / 2, Constant.game.config.height / 2, "spine_game_bg");
            this.overlay = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, "loading_overlay");
            this.overlay.setAlpha(0.4);

        }
        this.background.play('animation', true);
        this.background.setScale(1)
    }


}


export default Background;