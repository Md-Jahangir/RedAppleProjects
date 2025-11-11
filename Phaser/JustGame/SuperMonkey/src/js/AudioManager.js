import { Constant } from "./Constant.js";

class AudioManager {
    constructor(scene) {

        this.scene = scene;

        this.bgAudio = null;
        this.hitAudio = null;
        this.excitedAudio = null;
        this.runAudio = null;
        this.kongTransitionAudio = null;

    }

    CreateAudios() {

        this.bgAudio = Constant.game.sound.add('bg_audio');
        this.runAudio = Constant.game.sound.add('run_audio');
        this.excitedAudio = Constant.game.sound.add('excited');
        this.hitAudio = Constant.game.sound.add('hit_audio');
        this.kongTransitionAudio = Constant.game.sound.add('kong_transition');

    }

    PlayBGAudio() {

        if (localStorage.getItem("super_monkey_audio_on") == null) {
            localStorage.setItem("super_monkey_audio_on", 1);
        }

        if (localStorage.getItem("super_monkey_audio_on") == "1") {
            this.bgAudio.play();
            this.bgAudio.loop = true;
            this.bgAudio.volume = 2;
        }

    }

    StopBGAudio() {

        this.bgAudio.loop = false;
        this.bgAudio.stop();
        // game.sound.stopAll();
    }

    PlayRunAudio() {

        if (localStorage.getItem("super_monkey_audio_on") == null) {
            localStorage.setItem("super_monkey_audio_on", 1);
        }

        if (localStorage.getItem("super_monkey_audio_on") == "1") {
            this.runAudio.play();
            this.runAudio.loop = true;
            this.runAudio.volume = 2;
        }

    }

    StopRunAudio() {

        this.runAudio.loop = false;
        this.runAudio.stop();

    }

    PlayHitAudio() {

        if (localStorage.getItem("super_monkey_audio_on") == null) {
            localStorage.setItem("super_monkey_audio_on", 1);
        }
        if (localStorage.getItem("super_monkey_audio_on") == "1") {
            this.hitAudio.play();
        }

    }

    PlayExcitedAudio() {

        if (localStorage.getItem("super_monkey_audio_on") == null) {
            localStorage.setItem("super_monkey_audio_on", 1);
        }
        if (localStorage.getItem("super_monkey_audio_on") == "1") {
            this.excitedAudio.play();
        }

    }

    PlayKongTransitionAudio() {

        if (localStorage.getItem("super_monkey_audio_on") == null) {
            localStorage.setItem("super_monkey_audio_on", 1);
        }
        if (localStorage.getItem("super_monkey_audio_on") == "1") {
            this.kongTransitionAudio.play();
        }

    }

    StopAllAudios() {

        this.StopBGAudio();
        this.StopRunAudio();


    }

}
let audio = new AudioManager();

export { audio as AudioManager };