import { Constant } from "./Constant";

class AudioManager {

    constructor() {
        this.button = null;
        this.selection = null;
        this.win = null;
        this.gameOver = null;
    }
    CreateAudio() {
        this.button = Constant.game.sound.add('button_click');
        this.selection = Constant.game.sound.add('selection');
        this.win = Constant.game.sound.add('matched');
        this.gameOver = Constant.game.sound.add('gameover_popup');
    }
    PlayButtonPressAudio() {
        this.button.play();
    }
    PlayBlockSelectionSFX() {
        this.selection.play();
    }
    PlayWordMatchedAudio() {
        this.win.play();
    }
    PlayGameOverAudio() {
        this.gameOver.play();
    }

}

let audiomanager = new AudioManager();
export { audiomanager as AudioManager };