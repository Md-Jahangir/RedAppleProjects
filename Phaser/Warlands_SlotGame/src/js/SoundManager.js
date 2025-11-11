// import { Model } from "./Model.js";
import { Constant } from './Constant.js';
class SoundManager {
    constructor() {
        this.buttonClickSound = null;
        this.spinButtonSound = null;
        this.paylinesWinSound = null;
        this.paylinesShowingContinuous = null;
        this.spinSound = null;
        this.spinStopSound = null;
        this.backgroundSound = null;
        this.characater1Sound = null;
        // this.spinStopSound = null;
        this.isSoundOn = 1;// Model.GetSoundStatus();
        this.scatterSound = null;
        this.bonusButtonSound = null;
        this.bonusStartSound = null;
        this.bonusPlaySound = null;
        // this.roll2PlaySound = null;
        // this.roll1PlaySound = null;
        // this.slowReelSound = null;
        this.slowReelSound = null;
        this.roll2PlaySound = null;
        this.thorPlaySound = null;
        this.pelirojaSound = null;
        this.stromSound = null;
    };

    CreateSound() {
        // this.buttonClickSound = Constant.game.sound.add('button_click_sound');
        // this.spinButtonSound = Constant.game.sound.add('spin_button_click_sound');
        // this.spinStopSound = Constant.game.sound.add('spin_stop_sound');
        this.normalMatchSound = Constant.game.sound.add('normal_match');
        this.match7Sound = Constant.game.sound.add('match7');
        this.rollingAfterMatchSound = Constant.game.sound.add('roll_after_matching');

        this.backgroundSound = Constant.game.sound.add('background_sound');
        this.spinSound = Constant.game.sound.add('spin_sound');
        this.spinStopSound = Constant.game.sound.add('spin_stop_sound');
        this.characater1Sound = Constant.game.sound.add('character1');
        this.scatterSound = Constant.game.sound.add('hammermp3');
        // <<<<<<< HEAD
        this.bonusButtonSound = Constant.game.sound.add('bonus_button_sound');
        this.bonusStartSound = Constant.game.sound.add('bonus_start_sound');
        this.bonusPlaySound = Constant.game.sound.add('bonus_play_sound');
        this.roll2PlaySound = Constant.game.sound.add('roll2');

        this.slowReelSound = Constant.game.sound.add('slowreel_sound');
        this.thorPlaySound = Constant.game.sound.add('thor2');

        this.pelirojaSound = Constant.game.sound.add('peliroja');

        this.stromSound = Constant.game.sound.add('strom');
        //############

        // =======

        // this.bonusButtonSound = Constant.game.sound.add('bonus_button_sound');
        // this.bonusStartSound = Constant.game.sound.add('bonus_start_sound');
        // this.bonusPlaySound = Constant.game.sound.add('bonus_play_sound');
        // >>>>>>> 6954df1be7c0cf4fb40d526973a3bcd79cd1eeec
    };
    PlayNormalMatchSound() {
        if (this.isSoundOn == 1) {
            this.normalMatchSound.play();
        }
    };
    PlayMatch7Sound() {
        if (this.isSoundOn == 1) {
            this.match7Sound.play();
        }
    };
    PlayRolingAfterMatchSoud() {
        if (this.isSoundOn == 1) {
            this.rollingAfterMatchSound.play();
        }
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
            this.spinStopSound.volume = 1;

        }
    };

    WinPaylineSound() {
        if (this.isSoundOn == 1) {
            this.paylinesWinSound.play();
            this.paylinesWinSound.volume = 1;

        }
    };

    ShowPaylineContinuouslySound() {
        if (this.isSoundOn == 1) {
            this.paylinesShowingContinuous.play();
            this.paylinesShowingContinuous.loop = true;
            this.paylinesShowingContinuous.volume = 1;
        }
    }
    StopPaylineContinuouslySound() {
        this.paylinesShowingContinuous.loop = false;
        this.paylinesShowingContinuous.stop();
    };

    PlaySinglePayLineSound() {
        if (this.isSoundOn == 1) {
            this.singlePayLineSound.play();
            this.singlePayLineSound.volume = 1;
        }
    };
    PlaySingleCharacter1Sound() {
        if (this.isSoundOn == 1) {
            this.characater1Sound.play();
            this.characater1Sound.volume = 1;

        }
    };
    PlayScatterSound() {
        if (this.isSoundOn == 1) {
            this.scatterSound.play();
            this.scatterSound.volume = 1;

        }
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
    PlayReelSound() {
        if (this.isSoundOn == 1) {
            this.spinSound.play();
            this.spinSound.loop = true;
            this.spinSound.volume = 3;

        }
    };
    StopReelSound() {
        if (this.isSoundOn == 1) {
            this.spinSound.stop();
        }
    };
    PlayBackgroundSound() {
        this.backgroundSound.play();
        this.backgroundSound.loop = true;
        this.backgroundSound.volume = 1;
    };
    StopBackgroundSound() {
        this.backgroundSound.pause();

    };
    PlayReelStopSound() {
        // this.spinStopSound.play();
    };
    DisbaleSpinSound() {
        this.isSoundOn = 0;
    };
    EnableSpinSound() {
        this.isSoundOn = 1;
    };


    PlayBonusButtonSound() {
        // console.log("PlayBonusButtonSound")
        if (this.isSoundOn == 1) {
            this.bonusButtonSound.play();
            this.bonusButtonSound.volume = 1;
        }
    }
    PlayBonusStartSound() {
        // console.log("PlayBonusStartSound");
        if (this.isSoundOn == 1) {
            this.bonusStartSound.play();
            this.bonusStartSound.volume = 1;
        }
    }
    TapToPlayBonusSound() {
        // console.log("TapToPlayBonusSound");

        if (this.isSoundOn == 1) {
            this.bonusPlaySound.play();
            this.bonusPlaySound.volume = 1;
        }
    }
    PlayMisterySound() {
        if (this.isSoundOn == 1) {
            this.roll2PlaySound.play();
            this.roll2PlaySound.volume = 1;
        }
    }
    PlayThorSound() {
        if (this.isSoundOn == 1) {
            this.thorPlaySound.play();
            this.thorPlaySound.volume = 1;
        }
    }

    // PlaySlowReelSound(){
    //     this.roll1PlaySound.play();
    // }
    SlowReelAnimSound() {
        if (this.isSoundOn == 1) {
            this.slowReelSound.play();
            this.slowReelSound.volume = 1;
        }
    }
    StopSlowReelsSound() {
        if (this.isSoundOn == 1) {
            this.slowReelSound.stop();
        }
    }
    PlayPelirojaSound() {
        if (this.isSoundOn == 1) {
            this.pelirojaSound.play();
            this.pelirojaSound.volume = 1;
        }
    }
    PlayStromSound() {
        if (this.isSoundOn == 1) {
            this.stromSound.play();
            this.stromSound.volume = 1;
        }
    }
    // PlayMisterySound() {
    //     this.roll2PlaySound.play();
    // }

    // SlowReelAnimSound() {
    //     this.slowReelSound.play();
    // }
    // PlayMisterySound() {
    //     this.roll2PlaySound.play();
    // }
};
let sound = new SoundManager();

export { sound as SoundManager };