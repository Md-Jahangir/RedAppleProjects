import { Constant } from "./Constant.js";
class SoundManeger {
    constructor() {
        this.bgMusic = null;
        this.boosterSound = null;
        this.jump = null;
        this.deathSound = null;
        this.isSoundOn = 1;
    }
    CreateSounds() {
        this.bgMusic = Constant.game.sound.add('Background');
        this.boosterSound = Constant.game.sound.add('Boost');
        this.jump = Constant.game.sound.add('Jump');
        this.deathSound = Constant.game.sound.add('deathSound');
    }
    PlayBgMusic() {
        if (this.isSoundOn == 1) {
            this.bgMusic.play();
        }
    }
    StopBgMusic() {
        this.bgMusic.stop();
    };
    PlayBoosterSound() {
        if (this.isSoundOn == 1) {
            this.boosterSound.play();
        }
    }
    PlayJump() {
        if (this.isSoundOn == 1) {
            this.jump.play();
        }
    }
    PlayDeathSound() {
        if (this.isSoundOn == 1) {
            this.deathSound.play();
        }
    }
    DisableSound() {
        this.isSoundOn = 0;
    }
    EnableSound() {
        this.isSoundOn = 1;
    }
}
let soundManeger = new SoundManeger();
export { soundManeger as SoundManeger };
