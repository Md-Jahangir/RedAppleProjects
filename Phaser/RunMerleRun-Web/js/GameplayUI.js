var gameplayUIGroup;
var pauseButton;
var quitButton;
var scoreText;


var GameplayUI = {
    CreateGameplayUI: function () {
        gameplayUIGroup = game.add.group();

        //ADD SCORE BOARD
        var scoreBoard = Utils.SpriteSettingsControl(scoreBoard, 200.0, 80.0, 'scoreBoard', "true", "true", 0.5, 0.5, 1, 1);

        //SCORE TEXT
        scoreText = game.add.bitmapText(220, 81, 'riccicFreeFont', '', 40);
        scoreText.anchor.set(0.5, 0.5);

        // ADD PAUSE BUTTON
        // pauseButton = Utils.ButtonSettingsControl(pauseButton, 1200.0, 80.0, 'pauseButton', this.PauseButtonOnPress, null, null, this.PauseButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);
        // pauseButton.inputEnabled = false;

        pauseButton = game.add.sprite(1200.0, 80.0, 'pauseButton');
        pauseButton.anchor.set(0.5, 0.5);
        pauseButton.inputEnabled = false;
        pauseButton.events.onInputDown.add(this.PauseButtonOnPress, this);
        pauseButton.events.onInputUp.add(this.PauseButtonOnRelease, this);

        quitButton = game.add.sprite(60.0, 80.0, 'backButton');
        quitButton.anchor.set(0.5, 0.5);
        quitButton.inputEnabled = false;
        quitButton.events.onInputDown.add(this.QuitButtonOnPress, this);
        quitButton.events.onInputUp.add(this.QuitButtonOnRelease, this);

        gameplayUIGroup.add(pauseButton);
        gameplayUIGroup.add(scoreBoard);
        gameplayUIGroup.add(scoreText);
        gameplayUIGroup.add(quitButton);

        gameplayUIGroup.visible = false;

    },

    PauseButtonOnPress: function () {
        GameAnalytics("addDesignEvent", "ui: pause_clicked");
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        SoundManager.StopGameplayBgSound();
        game.add.tween(pauseButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
        isSwipeActive = false;

    },

    PauseButtonOnRelease: function () {
        game.add.tween(pauseButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        SoundManager.StopGameplayBgSound();
        setTimeout(PausePopup.ShowGamePausePopup, 200)
        setTimeout(function () {
            game.paused = !game.paused;
        }, 500);
        pauseButton.inputEnabled = false;
    },
    QuitButtonOnPress: function () {
        GameAnalytics("addDesignEvent", "ui: back_clicked");
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        SoundManager.StopGameplayBgSound();
        game.add.tween(quitButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
        isSwipeActive = false;

    },

    QuitButtonOnRelease: function () {
        game.add.tween(quitButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        SoundManager.StopGameplayBgSound();
        setTimeout(QuitPopup.ShowGameQuitPopup, 200)
        setTimeout(function () {
            game.paused = !game.paused;
        }, 200);
        quitButton.inputEnabled = false;

        GameAnalytics("addDesignEvent", "ad:requested");
        PlayzhubEventHandler.RequestAD();
    },

    ShowGameplayUI: function () {
        gameplayUIGroup.visible = true;
        game.world.bringToTop(gameplayUIGroup);
        if (Database.LoadData("is_down_block_hint_shown") == "1" || Database.LoadData("is_up_block_hint_shown") == "1") {
            pauseButton.inputEnabled = true;
            quitButton.inputEnabled = true;
        }

    },

    HideGameplayUI: function () {
        gameplayUIGroup.visible = false;
    },

    DestroyGameplayUI: function () {
        if (gameplayUIGroup != null) {
            gameplayUIGroup.destroy();
        }
    },


}