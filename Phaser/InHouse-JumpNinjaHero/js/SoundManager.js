class SoundManager {
    constructor(scene) {
        this.scene = scene;
        this.menuSound;
        this.gameSound;
        this.gameOverAudio;
        this.jumpDuckAudio;
    }
    CreateSound() {
        this.menuSound = this.scene.sound.add('intro');
        this.gameSound = this.scene.sound.add('game');
        this.jumpDuckAudio = this.scene.sound.add('jump_duck');
        this.gameOverAudio = this.scene.sound.add('game_over');
    }
    PlayMenuAudio() {
        this.menuSound.play();
    }
    StopMenuAudio() {
        this.menuSound.stop();
    }
    PlayGameAudio() {
        this.gameSound.loop = true;
        this.gameSound.play();
    }
    StopGameAudio() {
        this.gameSound.loop = false;
        this.gameSound.stop();
    }
    PlayJumpDuckAudio() {
        this.jumpDuckAudio.play();
    }
    PlayGameOverAudio() {
        this.gameOverAudio.play();
    }
    StopGameOverAudio() {
        this.scene.sound.stopAll();
    }
}
export default SoundManager;