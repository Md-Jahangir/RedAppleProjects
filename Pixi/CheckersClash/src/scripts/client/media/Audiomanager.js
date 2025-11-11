/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 05-05-2025.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 07-11-2025
 * @Description :- Manages audio.
 ************************************/

import { sound } from '@pixi/sound';
class AudioManager {
    constructor() {
        this.pawnPlacedSFX = null;
        this.pawnKillSFX = null;
        this.buttonPressedSFX = null;
        this.bgMusic = null;
        this.promotionSFX = null;
        this.gameWin = null;

        // this.CreateAudio();
    }

    CreateAudio() {
        // this.pawnPlacedSFX = sound.add('wooden_sfx', 'assets/audio/pawn_capture.wav');
        this.pawnKillSFX = sound.add('kill_sfx', 'assets/audio/pawn_capture.wav');
        this.buttonPressedSFX = sound.add('button_pressed', 'assets/audio/Button.mp3');
        this.bgMusic = sound.add('bgm', 'assets/audio/bg_music.wav');
        this.promotionSFX = sound.add('promotion', 'assets/audio/king_promotion.wav');
        this.gameWin = sound.add('win', 'assets/audio/game_win.wav');
        this.pawnSelect = sound.add('select', 'assets/audio/pawn_select.wav');
        this.pawnMove = sound.add('move', 'assets/audio/player_movement.mp3');
        this.gameoverSFX = sound.add('gameover', 'assets/audio/game_over.mp3');
    }

    PlayPawnSFX() {
        if (this.pawnPlacedSFX) {
            this.pawnPlacedSFX.play();
        } else {
            console.warn('Sound not loaded yet.');
        }
    }

    PlayKillSFX() {
        if (this.pawnKillSFX) {
            this.pawnKillSFX.play();
        } else {
            console.warn('Sound not loaded yet.');
        }
    }

    PlayBtnPressedSFX() {
        if (this.buttonPressedSFX) {
            this.buttonPressedSFX.play();
        } else {
            console.warn('Sound not loaded yet.');
        }
    }

    PlayBGM() {
        if (this.bgMusic) {
            this.bgMusic.loop = true;
            this.bgMusic.play();
        } else {
            console.warn('Sound not loaded yet.');
        }
    }

    StopBGM() {
        if (this.bgMusic) {
            this.bgMusic.loop = false;
            this.bgMusic.stop();
        } else {
            console.warn('Sound not loaded yet.');
        }
    }

    PlayPromotionSFX() {
        if (this.promotionSFX) {
            this.promotionSFX.play();
        } else {
            console.warn('Sound not loaded yet.');
        }
    }

    PlayGameWin() {
        if (this.gameWin) {
            this.gameWin.play();
        } else {
            console.warn('Sound not loaded yet.');
        }
    }

    PlayPawnSelect() {
        if (this.pawnSelect) {
            this.pawnSelect.play();
        } else {
            console.warn('Sound not loaded yet.');
        }
    }

    PlayPawnMove() {
        if (this.pawnMove) {
            this.pawnMove.play();
        } else {
            console.warn('Sound not loaded yet.');
        }
    }

    PlayGameOver() {
        if (this.gameoverSFX) {
            this.gameoverSFX.play();
        } else {
            console.warn('Sound not loaded yet.');
        }
    }

    PauseAll() {
        sound.pauseAll();
    }

    ResumeAll() {
        sound.resumeAll();
    }
}


const audiomanager = new AudioManager();
export { audiomanager as AudioManager };