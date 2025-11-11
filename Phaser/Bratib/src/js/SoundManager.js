import { Constant } from "./Constant";
class SoundManager {
    constructor() {
        this.bgMusic = null;
        this.buttonClickSound = null;
        this.knifeAttachSound = null;
        this.winSound = null;
        this.looseSound = null;
    };

    CreateSound() {
        this.bgMusic = Constant.game.sound.add('bg_music');
        this.buttonClickSound = Constant.game.sound.add('button_click_sound');
        this.knifeAttachSound = Constant.game.sound.add('knife_attach_sound');
        this.winSound = Constant.game.sound.add('game_win');
        this.looseSound = Constant.game.sound.add('game_loose');
    };

    PlayBgMusic() {
        if (localStorage.getItem("bratib_is_sound_on") == null) {
            localStorage.setItem("bratib_is_sound_on", 1);
        }
        if (localStorage.getItem("bratib_is_sound_on") == "1") {
            this.bgMusic.stop();
            this.bgMusic.play();
            this.bgMusic.loop = true;
            this.bgMusic.volume = 0.7;
        }
    };
    StopBgMusic() {
        this.bgMusic.stop();
    };

    PlayButtonClickSound() {
        if (localStorage.getItem("bratib_is_sound_on") == null) {
            localStorage.setItem("bratib_is_sound_on", 1);
        }
        if (localStorage.getItem("bratib_is_sound_on") == "1") {
            this.buttonClickSound.play();
        }
    };

    PlayItemsClickSound() {
        if (localStorage.getItem("bratib_is_sound_on") == null) {
            localStorage.setItem("bratib_is_sound_on", 1);
        }
        if (localStorage.getItem("bratib_is_sound_on") == "1") {
            this.knifeAttachSound.play();
        }
    };

    PlayWinSound() {
        if (localStorage.getItem("bratib_is_sound_on") == null) {
            localStorage.setItem("bratib_is_sound_on", 1);
        }
        if (localStorage.getItem("bratib_is_sound_on") == "1") {
            this.winSound.play();
        }
    }
    PlayLooseSound() {
        if (localStorage.getItem("bratib_is_sound_on") == null) {
            localStorage.setItem("bratib_is_sound_on", 1);
        }
        if (localStorage.getItem("bratib_is_sound_on") == "1") {
            this.looseSound.play();
        }
    }

};

let sound = new SoundManager();
export { sound as SoundManager };