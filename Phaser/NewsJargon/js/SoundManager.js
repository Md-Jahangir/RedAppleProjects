class SoundManager {
    constructor() {
        this.buttonClickSound = null;
        this.correctAnsSound = null;
        this.wrongAnsSound = null;
        this.clockTrickingSound = null;
    };

    PlayButtonClickSound() {
        if (localStorage.getItem("news_jargon_is_sound_on") == null) {
            localStorage.setItem("news_jargon_is_sound_on", 1);
        }
        if (localStorage.getItem("news_jargon_is_sound_on") == "1") {
            this.buttonClickSound = game.sound.add('button_click_sound');
            this.buttonClickSound.play();
        }
    };

    PlayCorrectAnswerSound() {
        if (localStorage.getItem("news_jargon_is_sound_on") == null) {
            localStorage.setItem("news_jargon_is_sound_on", 1);
        }
        if (localStorage.getItem("news_jargon_is_sound_on") == "1") {
            this.correctAnsSound = game.sound.add('correct_answer_sound');
            this.correctAnsSound.play();
        }
    };

    PlayWrongAnswerSound() {
        if (localStorage.getItem("news_jargon_is_sound_on") == null) {
            localStorage.setItem("news_jargon_is_sound_on", 1);
        }
        if (localStorage.getItem("news_jargon_is_sound_on") == "1") {
            this.wrongAnsSound = game.sound.add('wrong_answer_sound');
            this.wrongAnsSound.play();
        }
    };

    PlayClockTrickingSound() {
        if (localStorage.getItem("news_jargon_is_sound_on") == null) {
            localStorage.setItem("news_jargon_is_sound_on", 1);
        }
        if (localStorage.getItem("news_jargon_is_sound_on") == "1") {
            this.clockTrickingSound = game.sound.add('clock_ticking_sound');
            this.clockTrickingSound.play();
            this.clockTrickingSound.loop = true;
        }
    };
    StopClockTrickingSound() {
        if (this.clockTrickingSound != null) {
            this.clockTrickingSound.loop = false;
            this.clockTrickingSound.stop();
        }
    };

    // ShowPaylineContinuouslySound() {
    //     // if (localStorage.getItem("ultra888_is_sound_on") == null) {
    //     //     localStorage.setItem("ultra888_is_sound_on", 1);
    //     // }
    //     // if (localStorage.getItem("ultra888_is_sound_on") == "1") {
    //     //     this.paylinesShowingContinuous = game.sound.add('payline_showing_continously_sound');
    //     //     this.paylinesShowingContinuous.stop();
    //     //     setTimeout(() => {
    //     //         this.paylinesShowingContinuous.play();
    //     //         this.paylinesShowingContinuous.loop = true;
    //     //         this.paylinesShowingContinuous.volume = 0.5;
    //     //     }, 500);
    //     // }
    //     if (this.isSoundOn == 1) {
    //         this.paylinesShowingContinuous = game.sound.add('payline_showing_continously_sound');
    //         this.paylinesShowingContinuous.stop();
    //         setTimeout(() => {
    //             this.paylinesShowingContinuous.play();
    //             this.paylinesShowingContinuous.loop = true;
    //             this.paylinesShowingContinuous.volume = 0.5;
    //         }, 500);
    //     }
    // };

    // StopPaylineContinuouslySound() {
    //     if (this.paylinesShowingContinuous != null) {
    //         this.paylinesShowingContinuous.loop = false;
    //         this.paylinesShowingContinuous.stop();
    //     }
    // };

    // SpinStopSound() {
    //     // if (localStorage.getItem("ultra888_is_sound_on") == null) {
    //     //     localStorage.setItem("ultra888_is_sound_on", 1);
    //     // }
    //     // if (localStorage.getItem("ultra888_is_sound_on") == "1") {
    //     //     this.spinStopSound = game.sound.add('spin_stop_sound');
    //     //     this.spinStopSound.play();
    //     // }
    //     if (this.isSoundOn == 1) {
    //         this.spinStopSound = game.sound.add('spin_stop_sound');
    //         this.spinStopSound.play();
    //     }
    // }


};

let sound = new SoundManager();

export { sound as SoundManager };