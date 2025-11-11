import { Constant } from "./Constant.js";

class Player {
    constructor(scene) {

        this.scene = scene;

        this.monkey = null;
        this.kong = null;

    }

    CreatePlayer() {

        this.monkey = this.scene.add.spine(Constant.round(Constant.game.config.width / 7.6), Constant.round(Constant.game.config.height / 1.65), 'monkey').setScale(Constant.scaleFactor).setName("isUp");

        this.monkey.setData({ isKong: false });
        // console.log("  this.monkey", this.monkey);

        // console.log("Player pos-------------", this.monkey.x, this.monkey.y);

        this.scene.physics.add.existing(this.monkey);

        this.monkey.body.setSize(this.monkey.width - 155, this.monkey.height + 10, true);

        if (!Constant.isMobile) {
            this.monkey.setOffset(this.monkey.body.x + Constant.round(Constant.game.config.width / 15.36), this.monkey.body.y - Constant.round(Constant.game.config.height / 4.32));
        }

        else {
            this.monkey.setOffset(this.monkey.body.x + Constant.round(Constant.game.config.width / 15.36));
        }

        this.monkey.body.allowGravity = true;

        this.monkey.play('Idle', true);

        this.kong = this.scene.add.spine(0, -540, 'kong').setScale(Constant.scaleFactor).setName("isUp").setVisible(true);
        // this.monkey.setData({ form: "kong" });

        this.scene.physics.add.existing(this.kong);

        this.kong.body.setSize(this.kong.width, this.kong.height - 15, true);

        this.kong.body.allowGravity = false;

    }

}
export default Player;