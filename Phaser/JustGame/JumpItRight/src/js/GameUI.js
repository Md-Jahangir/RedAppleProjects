import { Constant } from "./Constant.js";
import { SoundManeger } from "./SoundManeger.js";
class GameUI {
    constructor(scene) {
        this.scene = scene;
        this.gameUIContainer = null;
        this.counterPause = 0;
        this.timerEvent = null
        this.totalDistance = 0;
        this.factor = 1.2;
        this.second = 0;

        this.backButton = null;
        this.soundOnOff = null;
        this.counter = 0;
    }
    CreateUi() {
        let scoreBg, foodText, textStyle;
        this.gameUIContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        if (this.scene.sys.game.device.os.iOS) {
            this.backButton = this.scene.add.image(-430, -815, 'back').setOrigin(0.5);
            scoreBg = this.scene.add.image(0, -805, 'Banana_Count').setOrigin(0.5);
            textStyle = { fontFamily: 'BRITANIC', fontSize: "40px", fontStyle: 'bold', align: 'center' };
            foodText = this.scene.add.text(0, -810, this.scene.food.scoreCount, textStyle).setOrigin(0.5);
            this.soundOnOff = this.scene.add.sprite(440, -815, 'Sound_on_off').setOrigin(0.5).setInteractive({ useHandCursor: true });

            this.soundOnOff.on("pointerdown", this.OnSoundButtonPressed, this);
            this.soundOnOff.on("pointerup", this.OnSoundButtonReleased, this);

        } else {
            this.backButton = this.scene.add.image(-430, -860, 'back').setOrigin(0.5);
            scoreBg = this.scene.add.image(0, -850, 'Banana_Count').setOrigin(0.5);
            textStyle = { fontFamily: 'BRITANIC', fontSize: "40px", fontStyle: 'bold', align: 'center' };
            foodText = this.scene.add.text(0, -855, this.scene.food.scoreCount, textStyle).setOrigin(0.5);
            this.soundOnOff = this.scene.add.sprite(440, -860, 'Sound_on_off').setOrigin(0.5).setInteractive({ useHandCursor: true });

            this.soundOnOff.on("pointerdown", this.OnSoundButtonPressed, this);
            this.soundOnOff.on("pointerup", this.OnSoundButtonReleased, this);
        }



        this.gameUIContainer.add([
            this.backButton,
            scoreBg,
            foodText,
            this.soundOnOff
        ]);
        this.gameUIContainer.visible = false;
    }
    EnableUI() {
        this.gameUIContainer.visible = true;
    }
    DisableUI() {
        this.gameUIContainer.visible = false;
    }
    OnSoundButtonPressed() {

    }
    OnSoundButtonReleased() {
        this.counter += 1;
        if (this.counter % 2 == 1) {
            this.soundOnOff.setFrame(1);
            SoundManeger.bgMusic.stop();
            SoundManeger.DisableSound();
            //set frame 1
        }
        else {
            this.soundOnOff.setFrame(0);
            SoundManeger.EnableSound();
            SoundManeger.bgMusic.play();
        }
    }
    OnBackButtonPress() { };
    OnBackButtonRelease() {
        Constant.isPaused = true;

        if (Constant.isPaused) {
            this.scene.monkeyPlayer.playerContainer.body.enable = false;
            this.scene.isPlateBaseBgMoving = false;
            this.scene.isBranchesTwigsMoving = false;
            this.scene.monkeyPlayer.playerContainer.list[1].play("Idle");
            // this.scene.timerEvent.paused = true;
        }
        this.scene.gamePausePopUp.EnableGamePausePopup();
    };

    OnPauseButtonPressed() { }
    OnPauseButtonReleased() {
        Constant.isPaused = true;

        if (Constant.isPaused) {
            this.scene.monkeyPlayer.playerContainer.body.enable = false;
            this.scene.isPlateBaseBgMoving = false;
            this.scene.isBranchesTwigsMoving = false;
            this.scene.monkeyPlayer.playerContainer.list[1].play("Idle");
            this.scene.timerEvent.paused = true;
        }
        this.scene.gamePausePopUp.EnableGamePausePopup();
    }
}
export default GameUI;