import { Constant } from "./Constant";

class SoundManager {
    constructor() {
        this.gameBgSound = null;
    }
    CreateSound() {
        this.buttonClick = Constant.game.sound.add('click-sound');
        this.gameBgSound = Constant.game.sound.add('bg-music');
    }

    ButtonClickSound() {
        if (localStorage.getItem('SoundButtonFrame') == 0) {
            this.buttonClick.play();
            this.gameBgSound.volume = 0.3;
            this.buttonClick.on('complete', () => {
                this.gameBgSound.volume = 1;
            })
        }
    }
    StopGameBgMusic() {
        this.gameBgSound.stop();
    }
    IsPlayGameBgMusic() {
        if (localStorage.getItem('SoundButtonFrame') == 0) {
            this.gameBgSound.play();
            this.gameBgSound.loop = true;
            this.gameBgSound.volume = 1;
        }
        else {
            this.gameBgSound.stop();
        }
    }
}
let soundmanager = new SoundManager();
export { soundmanager as SoundManager }