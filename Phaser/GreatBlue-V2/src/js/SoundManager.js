import { Model } from "./Model.js";
import { Constant } from "./Constant.js";
class SoundManager {
    constructor() {
        this.buttonClickSound = null;
        this.spinButtonSound = null;
        this.spinStopSound = null;
        this.paylinesWinSound = null;
        this.paylinesShowingContinuous = null;
        this.isSoundOn = Model.GetSoundStatus();
    };

    CreateSound() {
        this.buttonClickSound = Constant.game.sound.add('button_click_sound');
        this.spinButtonSound = Constant.game.sound.add('spin_button_click_sound');
        this.spinStopSound = Constant.game.sound.add('spin_stop_sound');
        this.spinOngoingSound = Constant.game.sound.add('spin_ongoing_sound');
        this.paylinesWinSound = Constant.game.sound.add('payline_wins_sound');
        this.paylinesShowingContinuous = Constant.game.sound.add('payline_showing_continously_sound');
        this.paylinesWinMultipleSound = Constant.game.sound.add('payline_wins_multiple_sound');
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
    PlaySpinOngoingSound() {
        if (this.isSoundOn == 1) {
            this.spinOngoingSound.play();
            this.spinOngoingSound.loop = true;
        }
    }
    StopSpinOngoingSound() {
        this.spinOngoingSound.stop();
        this.spinOngoingSound.loop = false;
    }

    WinPaylineSound() {
        if (this.isSoundOn == 1) {
            this.paylinesWinSound.play();
        }
    };

    WinMultiplePaylinesSound() {
        if (this.isSoundOn == 1) {
            this.paylinesWinMultipleSound.play();
        }
    };

    ShowPaylineContinuouslySound() {
        if (this.isSoundOn == 1) {
            this.paylinesShowingContinuous.play();
        }
    }
    StopPaylineContinuouslySound() {
        this.paylinesShowingContinuous.loop = false;
        this.paylinesShowingContinuous.stop();
    };

};

let sound = new SoundManager();

export { sound as SoundManager };