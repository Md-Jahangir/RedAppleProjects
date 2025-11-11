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
        this.isMusicOn = Model.GetMusicStatus();
    };

    CreateSound() {
        this.bgMusic = Constant.game.sound.add('bg_music');
        this.buttonClickSound = Constant.game.sound.add('button_click_sound');
        this.spinButtonSound = Constant.game.sound.add('spin_button_click_sound');
        this.spinOngoingSound = Constant.game.sound.add('spin_ongoing_sound');
        this.spinStopSound = Constant.game.sound.add('spin_stop_sound');
        this.paylinesWinSound = Constant.game.sound.add('payline_wins_sound');
        this.paylinesShowingContinuous = Constant.game.sound.add('payline_showing_continously_sound');
    };

    PlayBgMusic() {
        if (this.isMusicOn == 1) {
            this.bgMusic.play();
            this.bgMusic.loop = true;
            this.bgMusic.volume = 0.5;
        }
    }

    StopBgMusic() {
        this.bgMusic.stop();
        this.bgMusic.loop = false;
    }

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

    ShowPaylineContinuouslySound() {
        if (this.isSoundOn == 1) {
            // this.paylinesShowingContinuous.stop();
            // this.paylinesShowingContinuous.loop = false;
            this.paylinesShowingContinuous.play();
            // this.paylinesShowingContinuous.loop = true;
            this.paylinesShowingContinuous.volume = 0.5;
        }
    };

    StopPaylineContinuouslySound() {
        // this.paylinesShowingContinuous.loop = false;
        this.paylinesShowingContinuous.stop();
    };



};

let sound = new SoundManager();

export { sound as SoundManager };