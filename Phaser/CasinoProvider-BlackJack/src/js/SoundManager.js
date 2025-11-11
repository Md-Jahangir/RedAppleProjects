// import { Model } from "./Model.js";
import { Constant } from './Constant.js';
class SoundManager {
    constructor() {
        this.sinalButtonClickSound = null;
        this.cardSound = null;
        this.chipSound = null;
        this.winSound = null;
        this.looseSound = null;
        this.ficheCollectSound = null;
        this.gameBgSound = null;
        this.placeurBetsSound = null;
        // this.CreateSound();
    };

    CreateSound() {
        this.sinalButtonClickSound = Constant.game.sound.add('signal_button');
        this.cardSound = Constant.game.sound.add('card');
        this.chipSound = Constant.game.sound.add('chip');
        this.winSound = Constant.game.sound.add('win');
        this.looseSound = Constant.game.sound.add('lose');
        this.ficheCollectSound = Constant.game.sound.add('fiche_collect');
        this.gameBgSound = Constant.game.sound.add('game_bg_sound');
        this.placeurBetsSound = Constant.game.sound.add('place_ur_bets');
    };
    PlayGameBgSound(){
        if (localStorage.getItem('sound_status_blackjack') == 0) {
            this.gameBgSound.play();
            this.gameBgSound.loop = true;
        }
    }
    StopGameBgSound(){
            this.gameBgSound.stop();
    }
    PlayPlaceYourBets(){
        if (localStorage.getItem('sound_status_blackjack') == 0) {
            this.placeurBetsSound.play();
            this.gameBgSound.volume = 0.5;
            this.placeurBetsSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    }
    PlaySignalButtonSound() {
        if (localStorage.getItem('sound_status_blackjack') == 0) {
            this.sinalButtonClickSound.play();
            this.gameBgSound.volume = 0.5;
            this.sinalButtonClickSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    };
    PlayCardSound() {
        if (localStorage.getItem('sound_status_blackjack') == 0) {
            this.cardSound.play();
            this.gameBgSound.volume = 0.5;
            this.cardSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    };
    PlayChipSound() {
        if (localStorage.getItem('sound_status_blackjack') == 0) {
            this.chipSound.play();
            this.gameBgSound.volume = 0.5;
            this.chipSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    };

    PlayWinSound() {
        if (localStorage.getItem('sound_status_blackjack') == 0) {
            this.winSound.play();
            this.gameBgSound.volume = 0.5;
            this.winSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    };
    PlayLooseSound() {
        if (localStorage.getItem('sound_status_blackjack') == 0) {
            this.looseSound.play();
            this.gameBgSound.volume = 0.5;
            this.looseSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    };
    PLayFicheCollectSound() {
        if (localStorage.getItem('sound_status_blackjack') == 0) {
            this.ficheCollectSound.play();
            this.gameBgSound.volume = 0.5;
            this.ficheCollectSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    }
};
let sound = new SoundManager();

export { sound as SoundManager };