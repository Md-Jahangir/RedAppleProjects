import { Model } from "./Model.js";
import { Constant } from "./Constant.js";
class SoundManager {
    constructor() {
        this.buttonClickSound = null;
        this.spinButtonSound = null;
        this.paylinesWinSound = null;
        this.paylinesShowingContinuous = null;
        this.spinStopSound = null;
        this.isSoundOn = Model.GetSoundStatus();
    };

    CreateSound() {
        this.buttonClickSound = Constant.game.sound.add('button_click_sound');
        this.spinButtonSound = Constant.game.sound.add('spin_button_click_sound');
        this.spinStopSound = Constant.game.sound.add('spin_stop_sound');
        this.paylinesWinSound = Constant.game.sound.add('payline_wins_sound');
        this.paylinesShowingContinuous = Constant.game.sound.add('payline_showing_continously_sound');
        this.singlePayLineSound = Constant.game.sound.add('single_payline_sound');
        // this.multiplePayLineSound = Constant.game.sound.add('multiple_payline_sound');
    };

    ButtonClickSound() {
        if (this.isSoundOn == 1) {
            this.buttonClickSound.play();
        }
    };

    SpinButtonClickSound() {
        if (this.isSoundOn == 1) {
            this.spinButtonSound.play();
        }
    };

    SpinStopSound() {
        if (this.isSoundOn == 1) {
            this.spinStopSound.play();
        }
    }

    WinPaylineSound() {
        if (this.isSoundOn == 1) {
            this.paylinesWinSound.play();
        }
    };

    ShowPaylineContinuouslySound() {
        if (this.isSoundOn == 1) {
            this.paylinesShowingContinuous.play();
            this.paylinesShowingContinuous.loop = true;
            this.paylinesShowingContinuous.volume = 0.5;
        }
    }
    StopPaylineContinuouslySound() {
        this.paylinesShowingContinuous.loop = false;
        this.paylinesShowingContinuous.stop();
    };

    PlaySinglePayLineSound() {
        this.singlePayLineSound.play();
    }

    // PlayMultiplePayLineSound() {
    //     if (this.isSoundOn == 1) {
    //         this.multiplePayLineSound.play();
    //         this.multiplePayLineSound.loop = true;
    //     }
    // }
    // StopMultiplePayLineSound() {
    //     this.multiplePayLineSound.loop = false;
    //     this.multiplePayLineSound.stop();
    // };



};

let sound = new SoundManager();

export { sound as SoundManager };