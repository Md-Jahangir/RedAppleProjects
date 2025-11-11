import { Constant } from "./Constant";
class SoundManager {
    constructor() {
        this.bgMusic = null;
        this.buttonClickSound = null;
        this.obstacleCollideSound = null;
        this.knifeAttachSound = null;
    };

    CreateSound() {
        this.bgMusic = Constant.game.sound.add('bg_music');
        this.buttonClickSound = Constant.game.sound.add('button_click_sound');
        this.knifeAttachSound = Constant.game.sound.add('knife_attach_sound');
        this.obstacleCollideSound = Constant.game.sound.add('obstacle_collide_sound');
    };

    PlayBgMusic() {
        if (localStorage.getItem("hit_it_right_is_sound_on") == null) {
            localStorage.setItem("hit_it_right_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_it_right_is_sound_on") == "1") {
            this.bgMusic.stop();
            this.bgMusic.play();
            this.bgMusic.loop = true;
            this.bgMusic.volume = 0.1;
        }
    };
    StopBgMusic() {
        this.bgMusic.stop();
    };

    PlayButtonClickSound() {
        if (localStorage.getItem("hit_it_right_is_sound_on") == null) {
            localStorage.setItem("hit_it_right_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_it_right_is_sound_on") == "1") {
            this.buttonClickSound.play();
        }
    };

    PlayKnifeAttachSound() {
        if (localStorage.getItem("hit_it_right_is_sound_on") == null) {
            localStorage.setItem("hit_it_right_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_it_right_is_sound_on") == "1") {
            this.knifeAttachSound.play();
        }
    };

    PlayObstacleCollideSound() {
        if (localStorage.getItem("hit_it_right_is_sound_on") == null) {
            localStorage.setItem("hit_it_right_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_it_right_is_sound_on") == "1") {
            this.obstacleCollideSound.play();
        }
    };
};

let sound = new SoundManager();
export { sound as SoundManager };