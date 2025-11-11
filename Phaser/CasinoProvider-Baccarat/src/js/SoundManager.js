// import { Model } from "./Model.js";
import { Constant } from './Constant.js';
class SoundManager {
    constructor() {
        this.gameBgSound = null;
        this.sinalButtonClickSound = null;
        this.cardSound = null;
        this.chipSound = null;
        this.winSound = null;
        this.looseSound = null;
        this.ficheCollectSound = null;
        this.splashBgSound = null;
        // this.CreateSound();
    };

    CreateSound() {
        this.splashBgSound = Constant.game.sound.add('splash_bg_sound');
        this.gameBgSound = Constant.game.sound.add('game_bg_sound');
        this.sinalButtonClickSound = Constant.game.sound.add('signal_button');
        this.cardSound = Constant.game.sound.add('card');
        this.chipSound = Constant.game.sound.add('chip');
        this.winSound = Constant.game.sound.add('win');
        this.looseSound = Constant.game.sound.add('lose');
        this.ficheCollectSound = Constant.game.sound.add('fiche_collect');
        this.placeurBetsSound = Constant.game.sound.add('place_ur_bets');
    };
    StopSplashBgMusic(){
        this.splashBgSound.stop();
    }
  
    
    PlaySplashBgMusic(){
        if (localStorage.getItem('sound_status_baccarat') == 0 || localStorage.getItem('sound_status_baccarat') == null) {
            this.splashBgSound.play();
            this.splashBgSound.loop = true;
            this.splashBgSound.volume = 1;
        }
    }
   
    StopGameBgMusic(){
        this.gameBgSound.stop();
    }
  
    
    PlayGameBgMusic(){
        if (localStorage.getItem('sound_status_baccarat') == 0) {
            this.gameBgSound.play();
            this.gameBgSound.loop = true;
            this.gameBgSound.volume = 1;
        }
    }
    PlayPlaceYourBets(){
        if (localStorage.getItem('sound_status_baccarat') == 0) {
            this.placeurBetsSound.play();
            this.gameBgSound.volume = 0.5;
            this.placeurBetsSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    }
    PlaySignalButtonSound() {
        if (localStorage.getItem('sound_status_baccarat') == 0) {
            this.sinalButtonClickSound.play();
            this.gameBgSound.volume = 0.3;
            this.sinalButtonClickSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    };
    PlayCardSound() {
        if (localStorage.getItem('sound_status_baccarat') == 0) {
            this.cardSound.play();
            this.gameBgSound.volume = 0.3;
            this.cardSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    };
    PlayChipSound() {
        if (localStorage.getItem('sound_status_baccarat') == 0) {
            this.chipSound.play();
            this.gameBgSound.volume = 0.3;
            this.chipSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    };

    PlayWinSound() {
        if (localStorage.getItem('sound_status_baccarat') == 0) {
            this.winSound.play();
            this.gameBgSound.volume = 0.3;
            this.winSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    };
    PlayLooseSound() {
        if (localStorage.getItem('sound_status_baccarat') == 0) {
            this.looseSound.play();
            this.gameBgSound.volume = 0.3;
            this.looseSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    };
    PLayFicheCollectSound() {
        if (localStorage.getItem('sound_status_baccarat') == 0) {
            this.ficheCollectSound.play();
            this.gameBgSound.volume = 0.3;
            this.ficheCollectSound.on('complete', ()=>{
                this.gameBgSound.volume = 1;
            })
        }
    }
};
let sound = new SoundManager();

export { sound as SoundManager };