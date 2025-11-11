import { Constant } from "./Constant.js";
class CountDown {
    constructor(scene) {
        this.scene = scene;
        this.numberArray = [];
        this.initialTween = null;
    }
    CreateCountDownTaxt() {
        for (let i = 3; i >= 1; i--) {
            let obj = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 3, "C_" + i).setOrigin(0.5).setScale(
                Constant.scaleFactorX, Constant.scaleFactorY
            );
            this.numberArray.push(obj);
            obj.alpha = 0;
        }
    }
    EnableCountDown() {
        this.initialTween = this.scene.tweens.add({
            targets: this.numberArray[0],
            ease: "linear",
            duration: 1000,
            alpha: 1,
            scaleX: Constant.scaleFactorX * 2.3,
            scaleY: Constant.scaleFactorY * 2.3,
            onComplete: () => {
                this.numberArray[0].alpha = 0;
                this.numberArray[0].setScale(0)
                this.scene.tweens.add({
                    targets: this.numberArray[1],
                    ease: "linear",
                    duration: 1000,
                    alpha: 1,
                    scaleX: Constant.scaleFactorX * 2.3,
                    scaleY: Constant.scaleFactorY * 2.3,
                    onComplete: () => {
                        this.numberArray[1].alpha = 0;
                        this.numberArray[1].setScale(0)
                        this.scene.tweens.add({
                            targets: this.numberArray[2],
                            ease: "Linear",
                            duration: 1000,
                            alpha: 1,
                            scaleX: Constant.scaleFactorX * 2.3,
                            scaleY: Constant.scaleFactorY * 2.3,
                            onComplete: () => {
                                this.numberArray[2].alpha = 0;
                                this.numberArray[2].setScale(0)
                                if (!Constant.isPaused) {
                                    // console.log("!Constant.isPaused");
                                    this.scene.physics.world.enable(this.scene.monkeyPlayer.playerContainer);
                                    // this.scene.monkeyPlayer.playerContainer.body.setSize(100, 100); 
                                    // this.scene.monkeyPlayer.playerContainer.setCollideWorldBounds(true);
                                    this.scene.monkeyPlayer.playerContainer.body.setOffset(-70, -135);//6.193
                                    this.scene.monkeyPlayer.playerContainer.body.setCircle(Math.floor(Constant.game.config.height / 29));
                                }
                                this.scene.MakeTheSceneInteractive();
                                this.MakeBackButtonEnable();
                                Constant.gameStarted = true;
                            }
                        })
                    }
                })
            }
        });
    }
    MakeBackButtonEnable() {
        this.scene.ui.backButton.setInteractive({ useHandCursor: true });
        this.scene.ui.backButton.on('pointerup', this.scene.ui.OnBackButtonPress, this);
        this.scene.ui.backButton.on('pointerup', this.scene.ui.OnBackButtonRelease, this);
    }
}
export default CountDown;