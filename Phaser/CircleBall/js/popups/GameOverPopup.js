class GameOverPopup {
    constructor(scene) {
        this.scene = scene;
    };

    CreateGameOverPopup(_score) {
        if (_score > localStorage.getItem("circle_ball_high_score")) {
            localStorage.setItem("circle_ball_high_score", _score);
        } else {
            localStorage.setItem("circle_ball_high_score", localStorage.getItem("circle_ball_high_score"));
        }

        this.gameOverPopupGroup = this.scene.add.group();

        this.overlay = Utils.SpriteSettingsControl(this.scene, 0, 0, "one_pixel_white", 0, 0, 2200, 2200, "true", this.OverlayPressed);
        this.overlay.setTint("0x000000");
        this.overlay.alpha = 0.7;

        this.base = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "popup_base", 0.5, 0.5, 1, 1);

        var gameOverTextStyle = { fontFamily: 'Bahnschrift', fontSize: '96px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.gameOverText = this.scene.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 2.5), "GAME OVER", gameOverTextStyle).setOrigin(0.5, 0.5);

        var currentScoreTextStyle = { fontFamily: 'Bahnschrift', fontSize: '44px', fill: '#fff', fontStyle: 'bold', align: 'left' };
        this.currentScoreText = this.scene.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 2.1), "CURRENT SCORE : " + _score, currentScoreTextStyle).setOrigin(0.5, 0.5);

        var highScoreTextStyle = { fontFamily: 'Bahnschrift', fontSize: '50px', fill: '#fff', fontStyle: 'bold', align: 'right' };
        this.highScoreText = this.scene.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 1.9), "HIGH SCORE : " + localStorage.getItem("circle_ball_high_score"), highScoreTextStyle).setOrigin(0.5, 0.5);

        this.replayButtonContainer = this.scene.add.container(0, 0);
        this.replayButton = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 1.4), Math.round(game.config.height / 1.65), "button_base", 0.5, 0.5, 0.8, 0.8, "true", this.ReplayButtonPressed, this.ReplayButtonReleased);
        var replayTextStyle = { fontFamily: 'Bahnschrift', fontSize: '46px', fill: '#000', fontStyle: 'bold', align: 'center' };
        this.replayText = this.scene.add.text(Math.round(game.config.width / 1.4), Math.round(game.config.height / 1.65), "REPLAY", replayTextStyle).setOrigin(0.5, 0.5);
        this.replayButtonContainer.add([this.replayButton, this.replayText]);

        this.menuButtonContainer = this.scene.add.container(0, 0);
        this.menuButton = Utils.SpriteSettingsControl(this.scene, Math.round(game.config.width / 3.5), Math.round(game.config.height / 1.65), "button_base", 0.5, 0.5, 0.8, 0.8, "true", this.MenuButtonPressed, this.MenuButtonReleased);
        var menuTextStyle = { fontFamily: 'Bahnschrift', fontSize: '46px', fill: '#000', fontStyle: 'bold', align: 'center' };
        this.menuText = this.scene.add.text(Math.round(game.config.width / 3.5), Math.round(game.config.height / 1.65), "MENU", menuTextStyle).setOrigin(0.5, 0.5);
        this.menuButtonContainer.add([this.menuButton, this.menuText]);

        this.gameOverPopupGroup.add(this.overlay);
        // this.gameOverPopupGroup.add(this.base);
        this.gameOverPopupGroup.add(this.gameOverText);
        this.gameOverPopupGroup.add(this.currentScoreText);
        this.gameOverPopupGroup.add(this.highScoreText);
        this.gameOverPopupGroup.add(this.replayButtonContainer);
        this.gameOverPopupGroup.add(this.menuButtonContainer);

        // this.gameOverPopupGroup.setVisible(false);
        this.base.setAlpha(0);
        this.scene.gameOverPopup.ShowPopup(this.base)

    }

    ShowPopup(_refImage) {
        var alphaTween = this.scene.add.tween({
            targets: [_refImage],
            alpha: 1,
            ease: 'Linear',
            duration: 500
        });
    }

    HideGameOverPopup() {
        this.gameOverPopupGroup.setVisible(false);
    }

    ReplayButtonPressed() {
        // Utils.ButtonScaleTween(this.scene, this.replayButton);
        Utils.ButtonScaleTween(this.scene, this.scene.gameOverPopup.replayButton, 0.8);
        Utils.ButtonScaleTween(this.scene, this.scene.gameOverPopup.replayText, 1);
    }

    ReplayButtonReleased() {
        setTimeout(() => {
            this.scene.gameOverPopup.HideGameOverPopup();
            game.scene.stop('GameScene');
            game.scene.start('GameScene');
        }, 100);

    }

    MenuButtonPressed() {
        Utils.ButtonScaleTween(this.scene, this.scene.gameOverPopup.menuButton, 0.8);
        Utils.ButtonScaleTween(this.scene, this.scene.gameOverPopup.menuText, 1);
    }

    MenuButtonReleased() {
        setTimeout(() => {
            this.scene.gameOverPopup.HideGameOverPopup();
            game.scene.stop('GameScene');
            game.scene.start('TitleScene');
        }, 100);

    }

    OverlayPressed() {}


};

export default GameOverPopup;