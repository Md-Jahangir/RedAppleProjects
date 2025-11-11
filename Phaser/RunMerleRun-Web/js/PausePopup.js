var pausePopupGroup;
var pausePopupOverlay;
var pausePopupHomeButton;
var pausePopupReplayButton;
var pausePopupPlayButton;
var isButtonPressed = false;
// var levelPauseHeading;

var PausePopup = {
    CreatePausePopup: function () {
        pausePopupGroup = game.add.group();

        //ADD LEVEL GAME OVER POPUP OVERLAY
        pausePopupOverlay = Utils.ButtonSettingsControl(pausePopupOverlay, 640.0, 360.0, 'overlay', this.PausePopupOverlayOnPress, null, null, null, "true", "true", 0.5, 0.5, 4, 4, this);

        //ADD GAME PAUSED PROMPT
        var gamePausePrompt = Utils.SpriteSettingsControl(gamePausePrompt, 640.0, 330.0, 'smallPrompt', "true", "true", 0.5, 0.5, 1, 1);

        //ADD LEVEL PAUSED Heading
        var levelPauseHeading = Utils.SpriteSettingsControl(levelPauseHeading, 640.0, 240.0, 'pauseHeading', "true", "true", 0.5, 0.5, 1, 1);

        //ADD MENU BUTTON
        pausePopupHomeButton = Utils.ButtonSettingsControl(pausePopupHomeButton, 525, 600, 'menuButton', this.PausePopupHomeButtonOnPress, null, null, this.PausePopupHomeButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        // ADD REPLAY BUTTON
        pausePopupReplayButton = Utils.ButtonSettingsControl(pausePopupReplayButton, 745, 600, 'replayButton', this.PausePopupReplayButtonOnPress, null, null, this.PausePopupReplayButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        //ADD PLAY BUTTON TO THE PAUSE POPUP
        pausePopupPlayButton = Utils.ButtonSettingsControl(pausePopupPlayButton, 630, 408, 'playButton', this.PausePopupPlayButtonOnPress, null, null, this.PausePopupPlayButtonOnRelease, "true", "true", 0.5, 0.5, 0.7, 0.7, this);

        pausePopupGroup.add(pausePopupOverlay);
        pausePopupGroup.add(gamePausePrompt);
        pausePopupGroup.add(levelPauseHeading);
        pausePopupGroup.add(pausePopupHomeButton);
        pausePopupGroup.add(pausePopupReplayButton);
        pausePopupGroup.add(pausePopupPlayButton);

        pausePopupGroup.visible = false;
        pausePopupGroup.alpha = 0;
    },

    ShowGamePausePopup: function () {
        game.world.bringToTop(pausePopupGroup);
        pausePopupGroup.visible = true;
        game.add.tween(pausePopupGroup).to({ alpha: 1 }, 300, Phaser.Easing.Linear.Out, true);
        //FOR HIDE THE PAUSE BUTTON
        pauseButton.visible = false;
        canJump = false;
    },

    HideGamePausePopup: function () {
        var tween = game.add.tween(pausePopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        tween.onComplete.add(function () {
            pausePopupGroup.visible = false;
            pauseButton.visible = true;
            pausePopupHomeButton.scale.set(1, 1);
            pausePopupReplayButton.scale.set(1, 1);
            pausePopupPlayButton.scale.set(1, 1);
        });
    },

    PausePopupOverlayOnPress: function () { },

    PausePopupHomeButtonOnPress: function () {
        game.paused = !game.paused;
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(pausePopupHomeButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
        isGameRunning = false;
        Character.StopCharacterWalkAnimation();
        character.frame = 46;
        character.body.x = 250;
        character.body.y = 335;
        character.angle = 0;
        //DESTROY THE GAMEPLAY UI
        GameplayUI.DestroyGameplayUI();
        SoundManager.StopCharacterSound();
        SoundManager.StopGameplayBgSound();
        isSwipeActive = false;
    },
    PausePopupHomeButtonOnRelease: function () {
        game.add.tween(pausePopupHomeButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);

        //HIDE THE PAUSE POPUP
        this.HideGamePausePopup();

        //FOR REARRANGE THE BLOCKS
        Block.ReArrangeBlocks();

        //TRANSIT TO MAIN MENU
        StateTransition.TransitToMenu();
    },

    PausePopupReplayButtonOnPress: function () {
        game.paused = !game.paused;
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(pausePopupReplayButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
        isGameRunning = false;
        Character.StopCharacterWalkAnimation();
        character.frame = 46;
        character.body.x = 250;
        character.body.y = 335;
        character.angle = 0;
        SoundManager.StopCharacterSound();
        SoundManager.StopGameplayBgSound();
        //HIDE THE GAMEPLAY UI
        GameplayUI.HideGameplayUI();
        isSwipeActive = false;
    },
    PausePopupReplayButtonOnRelease: function () {
        game.add.tween(pausePopupReplayButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);

        //HIDE THE PAUSE POPUP
        this.HideGamePausePopup();

        //FOR REARRANGE THE BLOCKS
        Block.ReArrangeBlocks();

        //RESTART THE GAME
        setTimeout(FakeCounter.ShowFakeCounter, 1000);
    },

    PausePopupPlayButtonOnPress: function () {
        game.paused = !game.paused;
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(pausePopupPlayButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);

    },
    PausePopupPlayButtonOnRelease: function () {
        game.add.tween(pausePopupPlayButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        if (isGameRunning) {
            if (Database.LoadData("music_on_off") == "0") {
                SoundManager.PlayGameplayBgSound();
            }
        }

        canJump = true;
        //HIDE THE PAUSE POPUP
        this.HideGamePausePopup();

        //SHOW THE GAMEPLAY UI
        GameplayUI.ShowGameplayUI();
    },

}