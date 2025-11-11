import { Constant } from "./Constant";
class SoundManager {
    constructor(scene) {
        //#region -Variables
        this.scene = scene;
        this.gameBgSound = null;
        this.buttonClick = null;
        this.carSound = null;
        this.eggBreakSound = null;
        this.targetComplete = null;
        //#endregion
    };

    //#region -CreateSound
    CreateSound() {
        this.gameBgSound = Constant.game.sound.add('game_bg_sound');
        this.coinCollectSound = Constant.game.sound.add("coin_collect");
        this.buttonClick = Constant.game.sound.add('button_click');
        this.gameOverSound = Constant.game.sound.add("game_over");
        this.eggBreakSound = Constant.game.sound.add('egg_breaks');
        this.targetComplete = Constant.game.sound.add('challenge_won');
    };
    //#endregion

    //#region -StopGameBgMusic
    StopGameBgMusic() {
        this.gameBgSound.stop();
    }
    //#endregion

    //#region -PlayGameBgMusic
    PlayGameBgMusic() {
        if (localStorage.getItem('sound_status_ec') == 1) {
            this.gameBgSound.play();
            this.gameBgSound.loop = true;
            this.gameBgSound.volume = 1;
        }
    }
    //#endregion

    //#region -PlayEggBrokenSound
    PlayEggBrokenSound() {
        if (localStorage.getItem('sound_status_ec') == 1) {
            this.eggBreakSound.play();
        }
    }
    //#endregion

    //#region -PLayCoinCollectSound
    PLayCoinCollectSound() {
        if (localStorage.getItem('sound_status_ec') == 1) {
            this.coinCollectSound.play();
            this.gameBgSound.volume = 0.3;
            this.coinCollectSound.on('complete', () => {
                this.gameBgSound.volume = 1;
            })
        }
    }
    //#endregion

    //#region -TargetCompleteSound
    TargetCompleteSound() {
        if (localStorage.getItem('sound_status_ec') == 1) {
            this.targetComplete.play();
            this.gameBgSound.volume = 0.3;
            this.targetComplete.on('complete', () => {
                this.gameBgSound.volume = 1;
            })
        }
    }
    //#endregion

    //#region -PlayButtonSound
    PlayButtonSound() {
        if (localStorage.getItem('sound_status_ec') == 1) {
            this.buttonClick.play();
            this.gameBgSound.volume = 0.3;
            this.buttonClick.on('complete', () => {
                this.gameBgSound.volume = 1;
            })
        }
    };
    //#endregion

    //#region -PlayGameOverSound
    PlayGameOverSound() {
        if (localStorage.getItem('sound_status_ec') == 1) {
            this.gameOverSound.play();
        }
    };
    //#endregion
}

//Global Instance
let soundmanager = new SoundManager();
export { soundmanager as SoundManager };
