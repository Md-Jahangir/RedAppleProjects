var gameOverPopupGroup;
var gameOverPopupOverlay;
var gameOverPopupHomeButton;
var gameOverPopupReplayButton;
// var gameOverHeading;

var GameOverPopup = {
    Init: function () {
        console.log("events registered");

        PlayzhubEventHandler.AdStarted();
        PlayzhubEventHandler.AdCompleted();
    },

    CreateGameOverPopup: function () {
        gameOverPopupGroup = game.add.group();

        //ADD GAME OVER POPUP OVERLAY
        gameOverPopupOverlay = Utils.ButtonSettingsControl(gameOverPopupOverlay, 640.0, 360.0, 'overlay', this.GameOverPopupOverlayOnPress, null, null, null, "true", "true", 0.5, 0.5, 4, 4, this);

        //ADD GAME OVER PROMPT
        var gameOverPrompt = Utils.SpriteSettingsControl(gameOverPrompt, 640.0, 330.0, 'smallPrompt', "true", "true", 0.5, 0.5, 1, 1);

        //ADD GAME OVER HEADING
        var gameOverHeading = Utils.SpriteSettingsControl(gameOverHeading, 640.0, 240.0, 'tryAgainHeading', "true", "true", 0.5, 0.5, 1, 1);

        //ADD GAME OVER SCORE FLAG
        var gameOverFlag = Utils.SpriteSettingsControl(gameOverFlag, 625.0, 360.0, 'scoreFlag', "true", "true", 0.5, 0.5, 1, 1);

        //YOUR SCORE TEXT
        yourScoreText = game.add.bitmapText(560, 430, 'riccicFreeFont', 'YOUR SCORE         : ', 18);
        yourScoreText.anchor.set(0.5, 0.5);
        yourScoreText.tint = "0x3b1b05";

        //CURRENT SCORE VALUE TEXT
        currentScoreValue = game.add.bitmapText(713, 430, 'riccicFreeFont', '123456', 35);
        currentScoreValue.anchor.set(0.5, 0.5);
        currentScoreValue.tint = "0x773c11";

        //HIGHEST SCORE TEXT
        highestScoreText = game.add.bitmapText(560, 475, 'riccicFreeFont', 'HIGHEST SCORE    : ', 18);
        highestScoreText.anchor.set(0.5, 0.5);
        highestScoreText.tint = "0x3b1b05";

        //HIGEST SCORE VALUE TEXT
        highestScoreValue = game.add.bitmapText(720, 475, 'riccicFreeFont', '', 40);
        highestScoreValue.anchor.set(0.5, 0.5);
        highestScoreValue.tint = "0x773c11";

        //ADD GAME OVER MENU BUTTON
        gameOverPopupHomeButton = Utils.ButtonSettingsControl(gameOverPopupHomeButton, 525, 600, 'menuButton', this.GameOverPopupHomeButtonOnPress, null, null, this.GameOverPopupHomeButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        // ADD GAME OVER REPLAY BUTTON
        gameOverPopupReplayButton = Utils.ButtonSettingsControl(gameOverPopupReplayButton, 745, 600, 'replayButton', this.GameOverPopupReplayButtonOnPress, null, null, this.GameOverPopupReplayButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);


        gameOverPopupGroup.add(gameOverPopupOverlay);
        gameOverPopupGroup.add(gameOverPrompt);
        gameOverPopupGroup.add(gameOverHeading);
        gameOverPopupGroup.add(gameOverFlag);
        gameOverPopupGroup.add(yourScoreText);
        gameOverPopupGroup.add(currentScoreValue);
        gameOverPopupGroup.add(highestScoreText);
        gameOverPopupGroup.add(highestScoreValue);
        gameOverPopupGroup.add(gameOverPopupHomeButton);
        gameOverPopupGroup.add(gameOverPopupReplayButton);

        gameOverPopupGroup.visible = false;
        gameOverPopupGroup.alpha = 0;
    },

    ShowGameOverPopup: function () {
        GameAnalytics("addProgressionEvent", "Complete", "run_merle_run_endless", undefined, undefined, score);
        GameAnalytics("addDesignEvent", "score:run_merle_run", score);

        var currentTimeStamp = Date.now();
        var finalTime = currentTimeStamp - gameStartTime;
        // Server.PostGamePlayTimeToParent(finalTime / 1000, score);
        PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, score)
        game.world.bringToTop(gameOverPopupGroup);
        gameOverPopupGroup.visible = true;
        if (Database.LoadData("sound_on_off") == "0") {
            gameOverSFX.play();
        }
        clearInterval(characterWalkSoundInterval);
        game.add.tween(gameOverPopupGroup).to({ alpha: 1 }, 300, Phaser.Easing.Linear.Out, true);

        currentScoreValue.text = score;
        var highScore = Database.LoadData("high_score");

        if (score > highScore) {
            highestScoreValue.setText(score);
            Database.SaveData("high_score", score);
        } else {
            highestScoreValue.setText(highScore);
        }
    },

    HideGameOverPopup: function () {
        var tween = game.add.tween(gameOverPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        tween.onComplete.add(function () {
            gameOverPopupGroup.visible = false;
            gameOverPopupReplayButton.inputEnabled = true;
        });
    },

    GameOverPopupOverlayOnPress: function () {
    },
    GameOverPopupHomeButtonOnPress: function () {
        GameAnalytics("addDesignEvent", "ui: menu_clicked");

        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        SoundManager.StopGameplayBgSound();
        game.add.tween(gameOverPopupHomeButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    GameOverPopupHomeButtonOnRelease: function () {
        game.add.tween(gameOverPopupHomeButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);

        //FOR REARRANGE THE BLOCKS
        Block.ReArrangeBlocks();

        //HIDE DISTANCE AND PAUSE BUTTON
        GameplayUI.HideGameplayUI();

        //HIDE THE GAME OVER POPUP
        GameOverPopup.HideGameOverPopup();

        //REPOSITION THE CHRACTER
        character.frame = 46;
        character.body.x = 250;
        character.body.y = 335;
        character.angle = 0;

        //TRANSIT TO MAIN MENU
        StateTransition.TransitToMenu();
    },

    GameOverPopupReplayButtonOnPress: function () {
        GameAnalytics("addDesignEvent", "ui: replay_clicked");
        // if (!isButtonPressed) {
        game.add.tween(gameOverPopupReplayButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);

        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        SoundManager.StopGameplayBgSound();
    },
    GameOverPopupReplayButtonOnRelease: function () {
        game.add.tween(gameOverPopupReplayButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        gameOverPopupReplayButton.inputEnabled = false;
        //FOR REARRANGE THE BLOCKS
        Block.ReArrangeBlocks();
        //FOR DESTROY THE OBSTACLES
        Obstacle.DestroyObstacle();

        //HIDE DISTANCE AND PAUSE BUTTON
        GameplayUI.HideGameplayUI();

        //HIDE THE GAME OVER POPUP
        GameOverPopup.HideGameOverPopup();

        //REPOSITION THE CHRACTER
        character.visible = true;
        character.frame = 46;
        character.body.x = 250;
        character.body.y = 335;
        character.angle = 0;

        isBlockShift = true;
        game.state.start('Gameplay');
        // game.physics.arcade.collide(character, blocks, null, null, this);
        //Fire AD
        // PlayzhubEventHandler.RequestAD();
        // setTimeout(Gameplay.StartGame, 800);
    },

    OnAdStarted: function () {
        console.log("OnAdStarted");
        GameAnalytics("addDesignEvent", "ad:started");
        // PlayzhubEventHandler.GamePlayPaused();
    },

    OnAdCompleted: function () {
        console.log("OnAdCompleted");
        GameAnalytics("addDesignEvent", "ad:completed");
        // PlayzhubEventHandler.GamePlayResumed();
        //RESTART THE GAME
        // setTimeout(FakeCounter.ShowFakeCounter, 800);
    },

}