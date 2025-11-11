import { Model } from "./Model.js";
class SoundManager {
    constructor() {
        this.buttonClickSound = null;
        this.spinButtonSound = null;
        this.paylinesWinSound = null;
        this.paylinesShowingContinuous = null;
        this.spinStopSound = null;
        this.isSoundOn = Model.GetSoundStatus();
    };

    ButtonClickSound() {
        // if (localStorage.getItem("great_blue_is_sound_on") == null) {
        //     localStorage.setItem("great_blue_is_sound_on", 1);
        // }
        // if (localStorage.getItem("great_blue_is_sound_on") == "1") {
        //     this.buttonClickSound = game.sound.add('button_click_sound');
        //     this.buttonClickSound.play();
        // }
        if (this.isSoundOn == 1) {
            this.buttonClickSound = game.sound.add('button_click_sound');
            this.buttonClickSound.play();
        }
    };

    SpinButtonClickSound() {
        // if (localStorage.getItem("great_blue_is_sound_on") == null) {
        //     localStorage.setItem("great_blue_is_sound_on", 1);
        // }
        // if (localStorage.getItem("great_blue_is_sound_on") == "1") {
        //     this.spinButtonSound = game.sound.add('spin_button_click_sound');
        //     this.spinButtonSound.play();
        // }
        if (this.isSoundOn == 1) {
            this.spinButtonSound = game.sound.add('spin_button_click_sound');
            this.spinButtonSound.play();
        }
    };

    WinPaylineSound() {
        // if (localStorage.getItem("great_blue_is_sound_on") == null) {
        //     localStorage.setItem("great_blue_is_sound_on", 1);
        // }
        // if (localStorage.getItem("great_blue_is_sound_on") == "1") {
        //     this.paylinesWinSound = game.sound.add('payline_wins_sound');
        //     this.paylinesWinSound.play();
        // }
        if (this.isSoundOn == 1) {
            this.paylinesWinSound = game.sound.add('payline_wins_sound');
            this.paylinesWinSound.play();
        }
    };

    ShowPaylineContinuouslySound() {
        // if (localStorage.getItem("great_blue_is_sound_on") == null) {
        //     localStorage.setItem("great_blue_is_sound_on", 1);
        // }
        // if (localStorage.getItem("great_blue_is_sound_on") == "1") {
        //     this.paylinesShowingContinuous = game.sound.add('payline_showing_continously_sound');
        //     this.paylinesShowingContinuous.stop();
        //     // setTimeout(() => {
        //     this.paylinesShowingContinuous.play();
        //     this.paylinesShowingContinuous.loop = true;
        //     this.paylinesShowingContinuous.volume = 0.5;
        //     // }, 500);
        // }
        if (this.isSoundOn == 1) {
            this.paylinesShowingContinuous = game.sound.add('payline_showing_continously_sound');
            this.paylinesShowingContinuous.stop();
            // setTimeout(() => {
            this.paylinesShowingContinuous.play();
            this.paylinesShowingContinuous.loop = true;
            this.paylinesShowingContinuous.volume = 0.5;
            // }, 500);
        }
    }
    StopPaylineContinuouslySound() {
        if (this.paylinesShowingContinuous != null) {
            this.paylinesShowingContinuous.loop = false;
            this.paylinesShowingContinuous.stop();
        }
    };

    SpinStopSound() {
        // if (localStorage.getItem("great_blue_is_sound_on") == null) {
        //     localStorage.setItem("great_blue_is_sound_on", 1);
        // }
        // if (localStorage.getItem("great_blue_is_sound_on") == "1") {
        //     this.spinStopSound = game.sound.add('spin_stop_sound');
        //     this.spinStopSound.play();
        // }
        if (this.isSoundOn == 1) {
            this.spinStopSound = game.sound.add('spin_stop_sound');
            this.spinStopSound.play();
        }
    }

};

let sound = new SoundManager();

export { sound as SoundManager };