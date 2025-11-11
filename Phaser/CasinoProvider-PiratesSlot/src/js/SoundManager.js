// import { Model } from "./Model.js";
import { Constant } from './Constant.js';
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
        this.showPopup = null;
        this.hidePopup = null;
    };

    CreateSound(scene) {
        this.scene = scene.systems.game;
        this.gameBgSound = this.scene.sound.add('game_bg_sound');
        this.buttonClickSound = this.scene.sound.add('button_click_sound');
        this.spinButtonSound = this.scene.sound.add('spin_button_click_sound');
        this.spinStopSound = this.scene.sound.add('spin_stop_sound');
        this.paylinesWinSound = this.scene.sound.add('payline_wins_sound');
        this.reelSound = this.scene.sound.add('reel_sound');

        this.coinAnimSound = this.scene.sound.add('coin_anim_sound');
        this.coinPayoutSound = this.scene.sound.add('coin_payout');
        this.bigWinSound = this.scene.sound.add('big_win_sound');
        this.ultraWinSound = this.scene.sound.add('ultra_win_sound');
        this.updateBalanceSound = this.scene.sound.add('update_balance_sound');
        this.showPopup = this.scene.sound.add('poup_show');;
        this.hidePopup = this.scene.sound.add('popup_hide');;
    };
    ButtonClickSound() {
        if (localStorage.getItem('slot_game_is_sound_on') == 1) {
            this.buttonClickSound.play();
            this.gameBgSound.volume = 0.6;
        }
    };
    PlayGameBgSound() {
        if (localStorage.getItem('slot_game_is_music_on') == 1) {
            this.gameBgSound.play();
            this.gameBgSound.loop = true;
            this.gameBgSound.volume = 1;
        }
    }
    StopGameBgSound() {
        if (localStorage.getItem('slot_game_is_music_on') == 0) {
            this.gameBgSound.stop();
        }
    }
    PLayReelSound() {
        if (localStorage.getItem('slot_game_is_sound_on') == 1) {
            this.reelSound.play();
            this.gameBgSound.volume = 0.6;
        }
    }

    SpinButtonClickSound() {
        if (localStorage.getItem('slot_game_is_sound_on') == 1) {
            this.spinButtonSound.play();
        }
    };

    SpinStopSound() {
        if (localStorage.getItem('slot_game_is_sound_on') == 1) {
            this.spinStopSound.play();
            this.gameBgSound.volume = 0.6;
        }
    }

    WinPaylineSound() {
       if (localStorage.getItem('slot_game_is_sound_on') == 1) {
            this.paylinesWinSound.play();
            this.gameBgSound.volume = 0.6;
        }
    };

    CoinPayoutSound() {
       if (localStorage.getItem('slot_game_is_sound_on') == 1) {
            this.coinPayoutSound.play();
        }
    };
    BigWinSound() {
        if (localStorage.getItem('slot_game_is_sound_on') == 1) {
            this.bigWinSound.play();
        }
    };
    UltraWinSound() {
        if (localStorage.getItem('slot_game_is_sound_on') == 1) {
            this.ultraWinSound.play();
        }
    };
    CoinAnimationSound() {
        if (localStorage.getItem('slot_game_is_sound_on') == 1) {
            this.coinAnimSound.play();
        }
    };
    UpdateBalanceSound() {
        if (localStorage.getItem('slot_game_is_sound_on') == 1) {
            this.updateBalanceSound.play();
        }
    };
    ShowPopup(){
        if (localStorage.getItem('slot_game_is_sound_on') == 1) {
            this.showPopup.play();
        }
    }
    HidePopup(){
        if (localStorage.getItem('slot_game_is_sound_on') == 1) {
            this.hidePopup.play();
        }
    }

};
let sound = new SoundManager();

export { sound as SoundManager };