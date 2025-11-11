class Buttons {
    constructor(scene) {
        this.scene = scene;
        this.settingsBtn = null;
        this.homeBtn = null;
        this.achievementBtn = null;
        this.playBtn = null;
        this.pauseBtn = null;
        this.continueBtn = null;
        this.backBtn = null;
    }
    CreateButtons() {
        this.playBtn = this.scene.add.image(game.config.width / 2, game.config.height / 1.43, 'playButton').setInteractive({ useHandCursor: true });
        this.settingsBtn = this.scene.add.image(game.config.width / 3.2, game.config.height / 1.08, 'settingsButton');
        this.homeBtn = this.scene.add.image(game.config.width / 2, game.config.height / 1.08, 'homeButton');
        this.achievementBtn = this.scene.add.image(game.config.width / 1.45, game.config.height / 1.08, 'achievementButton');
        this.pauseBtn = this.scene.add.image(0, 0, 'pauseButton').setVisible(false).setInteractive({ useHandCursor: true });
    }
    CreatePausePopupButtons() {
        this.continueBtn = this.scene.add.image(game.config.width / 2, game.config.height / 2, 'continueButton').setInteractive({ useHandCursor: true });
        this.continueBtn.on('pointerup', this.InteractiveContinueButton, this);
        this.backBtn = this.scene.add.image(game.config.width / 2, game.config.height / 1.48, 'backButton').setInteractive({ useHandCursor: true });
        this.backBtn.on('pointerup', () => {
            this.scene.scene.stop();
            this.scene.scene.start('TutorialScene');
        });
        // setTimeout(() => {
        // this.scene.game.events.emit('xyz');
        // }, 1000);

    }
    InteractivePlayButton() {
        this.playBtn.on('pointerup', () => {
            this.scene.scene.stop();
            this.scene.scene.start('GameScene');
        });
    }
    InteractiveContinueButton() {
        console.log("game paused");
        isPaused = false;
        isResumed = true;
    }
}
export default Buttons;
