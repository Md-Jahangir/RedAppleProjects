class GameCompletePopup {
    constructor(scene) {
        this.scene = scene;
    }

    CreateCompletePopup() {
        this.popupGroup = this.scene.add.container(Math.round(window.phaserGame.game.config.width / 2), Math.round(window.phaserGame.game.config.height / 2));
        this.base = this.scene.add.image(0, 0, 'popup_base').setOrigin(0.5).setScale(window.phaserGame.scaleFactorX);

        let completeTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '80px', fill: '#000', fontStyle: 'bold', align: 'center' };
        this.completeText = this.scene.add.text(0, -200, 'GAME COMPLETE', completeTextStyle).setOrigin(0.5).setScale(window.phaserGame.scaleFactorX);

        this.replayButtonContainer = this.scene.add.container(220, 400);
        this.replayButton = this.scene.add.image(0, 0, 'button_base').setOrigin(0.5).setScale(window.phaserGame.scaleFactorX);
        var replayTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '46px', fill: '#000', fontStyle: 'bold', align: 'center' };
        this.replayText = this.scene.add.text(0, 0, 'REPLAY', replayTextStyle).setOrigin(0.5).setScale(window.phaserGame.scaleFactorX);
        this.replayButtonContainer.add([this.replayButton, this.replayText]);
        this.replayButton.setInteractive({ useHandCursor: true });
        this.replayButton.on('pointerdown', this.ReplayButtonPressed, this);
        this.replayButton.on('pointerup', this.ReplayButtonReleased, this);

        this.menuButtonContainer = this.scene.add.container(-220, 400);
        this.menuButton = this.scene.add.image(0, 0, 'button_base').setOrigin(0.5).setScale(window.phaserGame.scaleFactorX);
        var menuTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '46px', fill: '#000', fontStyle: 'bold', align: 'center' };
        this.menuText = this.scene.add.text(0, 0, 'MENU', menuTextStyle).setOrigin(0.5, 0.5).setScale(window.phaserGame.scaleFactorX, window.phaserGame.scaleFactorX);
        this.menuButtonContainer.add([this.menuButton, this.menuText]);
        this.menuButton.setInteractive({ useHandCursor: true });
        this.menuButton.on('pointerdown', this.MenuButtonPressed, this);
        this.menuButton.on('pointerup', this.MenuButtonReleased, this);

        this.popupGroup.add(this.base);
        this.popupGroup.add(this.completeText);
        this.popupGroup.add(this.replayButtonContainer);
        this.popupGroup.add(this.menuButtonContainer);

        this.popupGroup.setDepth(2);
        this.HideCompletePopup();
    }

    ShowCompletePopup() {
        this.popupGroup.setVisible(true);
    }

    HideCompletePopup() {
        this.popupGroup.setVisible(false);
    }

    ReplayButtonPressed() {}
    ReplayButtonReleased() {
        setTimeout(() => {
            this.scene.gameCompletePopup.HideCompletePopup();
            window.phaserGame.game.scene.stop('GameScene');
            window.phaserGame.game.scene.start('GameScene');
        }, 100);
    }

    MenuButtonPressed() {}
    MenuButtonReleased() {
        setTimeout(() => {
            this.scene.gameCompletePopup.HideCompletePopup();
            window.phaserGame.game.scene.stop('GameScene');
            window.phaserGame.game.scene.start('TitleScene');
        }, 100);
    }

}

export default GameCompletePopup;
