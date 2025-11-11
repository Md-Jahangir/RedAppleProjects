import Platform from "./Platform.js";
import Overlay from "./Overlay.js";
import Buttons from "./Buttons.js";
import PopUp from "./PopUp.js";
class GameUI {
    constructor(scene) {
        this.scene = scene;
        this.platform = new Platform(this.scene);
        this.overlay = new Overlay(this.scene);
        this.buttons = new Buttons(this.scene);
        this.popUp = new PopUp(this.scene);
        this.counter = 0;
    }
    CreateInstructionScene() {
        this.platform.CreateTutorialPlatform();
        this.overlay.CreateOverlay();
        let instructionBox = this.scene.add.image(game.config.width / 2, game.config.height / 2.18, 'instruction_box');
        let title = this.scene.add.image(game.config.width / 2.02, game.config.height / 9.6, 'title').setScale(0.6 * scaleFactorX, 0.6 * scaleFactorY);
        this.buttons.CreateButtons();
        this.buttons.InteractivePlayButton();
    }
    CreateGameScene() {
        this.overlay.CreateGameControlsOverlay();
        this.buttons.CreateButtons();
        this.buttons.playBtn.setVisible(false);
        this.buttons.homeBtn.setVisible(false);
        this.buttons.achievementBtn.setVisible(false);
        this.buttons.settingsBtn.setPosition(game.config.width / 10.2, game.config.height / 17.08);
        this.buttons.pauseBtn.setPosition(game.config.width / 1.11, game.config.height / 17.08).setVisible(true).setInteractive({ useHandCursor: true });
        this.buttons.pauseBtn.on('pointerup', () => {
            this.popUp.CreatePausePopUp();
            isResumed = false;
            isPaused = true;
        });
    }
    CreateGameResumeScene() {

    }
}
export default GameUI;