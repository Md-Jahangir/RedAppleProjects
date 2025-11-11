class SoundManager {
    constructor() {
        this.buttonClickSound = null;
        this.spinButtonSound = null;
        this.paylinesWinSound = null;
        this.paylinesShowingContinuous = null;
        this.spinStopSound = null;
        this.reelSound = null;
        this.gameBgSound = null;
        this.coinPayoutSound = null;
        this.coinAnimSound = null;
        this.bigWinSound = null;
        this.ultraWinSound = null;
        this.updateBalanceSound = null;

    };

    CreateSound(scene) {
        this.scene = scene.systems.game;
        this.gameBgSound = this.scene.sound.add('game_bg_sound');
        this.buttonClickSound = this.scene.sound.add('button_click_sound');
        this.spinButtonSound = this.scene.sound.add('spin_button_click_sound');
        this.spinStopSound = this.scene.sound.add('spin_stop_sound');
        this.paylinesWinSound = this.scene.sound.add('payline_wins_sound');
        this.paylinesShowingContinuous = this.scene.sound.add('payline_showing_continously_sound');
        this.singlePayLineSound = this.scene.sound.add('single_payline_sound');
        this.reelSound = this.scene.sound.add('reel_sound');

        this.coinAnimSound = this.scene.sound.add('coin_anim_sound');
        this.coinPayoutSound = this.scene.sound.add('coin_payout');
        this.bigWinSound = this.scene.sound.add('big_win_sound');
        this.ultraWinSound = this.scene.sound.add('ultra_win_sound');
        this.updateBalanceSound = this.scene.sound.add('update_balance_sound');


        // this.multiplePayLineSound = Constant.game.sound.add('multiple_payline_sound');
    };

    ButtonClickSound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.buttonClickSound.play();
            this.gameBgSound.volume = 0.6;
        }
    };
    PlayGameBgSound() {
        if (localStorage.getItem('music_status_circus') == 0) {
            this.gameBgSound.play();
            this.gameBgSound.loop = true;
            this.gameBgSound.volume = 1;
        }
    }
    StopGameBgSound() {
        if (localStorage.getItem('music_status_circus') == 1) {
            this.gameBgSound.stop();
        }
    }
    PLayReelSound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.reelSound.play();
            this.gameBgSound.volume = 0.6;
        }
    }

    SpinButtonClickSound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.spinButtonSound.play();
        }
    };

    SpinStopSound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.spinStopSound.play();
            this.gameBgSound.volume = 0.6;
        }
    }

    WinPaylineSound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.paylinesWinSound.play();
            this.gameBgSound.volume = 0.6;
        }
    };

    ShowPaylineContinuouslySound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.paylinesShowingContinuous.play();
            // this.paylinesShowingContinuous.loop = true;
            this.paylinesShowingContinuous.volume = 0.5;
            this.gameBgSound.volume = 0.6;
        }
    }
    StopPaylineContinuouslySound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.paylinesShowingContinuous.loop = false;
            this.paylinesShowingContinuous.stop();
        }
    };

    PlaySinglePayLineSound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.singlePayLineSound.play();
            this.gameBgSound.volume = 0.6;
        }
    }
    CoinPayoutSound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.coinPayoutSound.play();
        }
    };
    BigWinSound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.bigWinSound.play();
        }
    };
    UltraWinSound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.ultraWinSound.play();
        }
    };
    CoinAnimationSound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.coinAnimSound.play();
        }
    };
    UpdateBalanceSound() {
        if (localStorage.getItem('sound_status_circus') == 0) {
            this.updateBalanceSound.play();
        }
    };

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