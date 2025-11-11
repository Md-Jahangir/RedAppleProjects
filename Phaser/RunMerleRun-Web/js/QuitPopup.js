var quitPopupGroup;
var quitPopupOverlay;
var quitPopupYesButton;
var quitPopupNoButton;
var isButtonPressed = false;
// var levelPauseHeading;

var QuitPopup = {
    CreateQuitPopup: function () {
        quitPopupGroup = game.add.group();

        //ADD LEVEL GAME OVER POPUP OVERLAY
        quitPopupOverlay = Utils.ButtonSettingsControl(quitPopupOverlay, 640.0, 360.0, 'overlay', this.QuitPopupOverlayOnPress, null, null, null, "true", "true", 0.5, 0.5, 4, 4, this);

        //ADD GAME PAUSED PROMPT
        var gameQuitPrompt = Utils.SpriteSettingsControl(gameQuitPrompt, 640.0, 330.0, 'quit_bg', "true", "true", 0.5, 0.5, 1, 1);



        // ADD Yes BUTTON
        quitPopupYesButton = Utils.ButtonSettingsControl(quitPopupYesButton, 500, 515, 'quit_yes', this.QuitPopupYesButtonOnPress, null, null, this.QuitPopupYesButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        //ADD No  BUTTON TO THE PAUSE POPUP
        quitPopupNoButton = Utils.ButtonSettingsControl(quitPopupNoButton, 770, 515, 'quit_no', this.QuitPopupnoButtonOnPress, null, null, this.QuitPopupnoButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        quitPopupGroup.add(quitPopupOverlay);
        quitPopupGroup.add(gameQuitPrompt);
        quitPopupGroup.add(quitPopupYesButton);
        quitPopupGroup.add(quitPopupNoButton);

        quitPopupGroup.visible = false;
        quitPopupGroup.alpha = 0;

    },

    ShowGameQuitPopup: function () {
        game.world.bringToTop(quitPopupGroup);
        quitPopupGroup.visible = true;
        quitPopupGroup.alpha = 1;
        // game.add.tween(quitPopupGroup).to({ alpha: 1 }, 300, Phaser.Easing.Linear.Out, true);
        //FOR HIDE THE PAUSE BUTTON
        quitButton.visible = false;
        canJump = false;
    },

    HideGameQuitPopup: function () {
        var tween = game.add.tween(quitPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        tween.onComplete.add(function () {
            quitPopupGroup.visible = false;
            quitButton.visible = true;
            quitPopupYesButton.scale.set(1, 1);
            quitPopupNoButton.scale.set(1, 1);
        });
    },
    QuitPopupnoButtonOnPress() {
        game.paused = !game.paused;
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(quitPopupNoButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    QuitPopupnoButtonOnRelease() {
        game.add.tween(quitPopupNoButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        if (isGameRunning) {
            if (Database.LoadData("music_on_off") == "0") {
                SoundManager.PlayGameplayBgSound();
            }
        }

        canJump = true;
        //HIDE THE PAUSE POPUP
        this.HideGameQuitPopup();

        //SHOW THE GAMEPLAY UI
        GameplayUI.ShowGameplayUI();
    },

    QuitPopupYesButtonOnPress() {
        var currentTimeStamp = Date.now();
        var finalTime = currentTimeStamp - gameStartTime;
        Server.PostGameQuitToParent(finalTime / 1000, score);
        PlayzhubEventHandler.GamePlayStopped(finalTime / 1000)

        game.paused = !game.paused;
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(quitPopupYesButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
        isGameRunning = false;
        Character.StopCharacterWalkAnimation();
        SoundManager.StopCharacterSound();
        SoundManager.StopGameplayBgSound();
        //HIDE THE GAMEPLAY UI
        GameplayUI.HideGameplayUI();
        isSwipeActive = false;
        StateTransition.TransitToMenu();


    },
    QuitPopupYesButtonOnRelease() {
        game.add.tween(quitPopupYesButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        Block.ReArrangeBlocks();

        GameplayUI.HideGameplayUI();
        character.frame = 46;
        character.body.x = 250;
        character.body.y = 335;
        character.angle = 0;

        //TRANSIT TO MAIN MENU
        StateTransition.TransitToMenu();
    },
    QuitPopupOverlayOnPress() {

    },


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


}
