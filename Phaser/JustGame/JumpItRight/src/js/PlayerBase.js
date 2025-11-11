import { Constant } from "./Constant.js";
class playerBase {
    constructor(scene) {
        this.scene = scene;
        this.playerbaseArray = [];
        this.potTweening = null;
        this.potFireAnim = null;
        // Constant.game.events.on("eventsPotAnimationOnStart", this.EffectOnPot, this);
    }
    CreateBaseImage() {
        // this.scene.input.on('pointerdown', this.MovePlayerBase, this);

        let base = this.scene.physics.add.image(Constant.game.config.width / 2, Math.floor(Constant.game.config.height / 1.2075), 'Base').setOrigin(0.5, 0);
        base.body.allowGravity = false;
        base.body.immovable = true;
        base.body.setSize((base.width), (base.height), true);
        base.setOffset(0, Constant.game.config.height / 21.33);

        let pot = this.scene.add.spine(Constant.game.config.width / 2, Math.floor(Constant.game.config.height / 1), "pot").setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.playerbaseArray.push(base);
        this.playerbaseArray.push(pot);
    }
    EffectOnPot() {
        // this.scene.upOffest = 30;
        // this.potTweening = this.scene.tweens.add({
        //     targets: this.playerbaseArray[1],
        //     ease: "Expo.Out",
        //     duration: 300,
        //     scaleX: Constant.scaleFactorX * 0.6,
        //     scaleY: Constant.scaleFactorY * 0.6,
        //     onComplete: () => {
        //         this.playerbaseArray[1].setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        //         this.scene.isPlateBaseBgMoving = true;

        //         let myInterval = setInterval(() => {
        //             this.scene.upOffest = this.scene.upOffest - 2;
        //             if (this.scene.upOffest == 0) {
        //                 clearInterval(myInterval);
        //                 this.scene.countDown.EnableCountDown();
        //             }
        //         }, 100);
        //     }
        // })


        this.potFireAnim = this.playerbaseArray[1].play("Pot_Fire");
        setTimeout(() => {
            this.scene.monkeyPlayer.NormalMonkeyAnimation();
        }, 600);
    }
    MovePlayerBase() {
        this.playerbaseArray.forEach(elem => {
            elem.y += this.scene.upOffest;
        });
    }
}
export default playerBase;