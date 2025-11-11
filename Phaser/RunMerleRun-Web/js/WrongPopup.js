var wrongPopupGroup;
var wrongPopupOverlay;
var oopsText;
var somethingWrongText;
var tryAginText;
var wrongPopupCrossButton;


var WrongPopup = {
    CreateWrongPopup: function() {
        wrongPopupGroup = game.add.group();

        //ADD LEVEL GAME OVER POPUP OVERLAY
        wrongPopupOverlay = Utils.ButtonSettingsControl(wrongPopupOverlay, 640.0, 360.0, 'overlay', this.WrongPopupOverlayOnPress, null, null, null, "true", "true", 0.5, 0.5, 4, 4, this);

        //ADD GAME PAUSED PROMPT
        var wrongPopupPrompt = Utils.SpriteSettingsControl(wrongPopupPrompt, 640.0, 360.0, 'bigPrompt', "true", "true", 0.5, 0.5, 1, 1);


        oopsText = game.add.bitmapText(640, 300, 'riccicFreeFont', 'Oops! ', 50);
        oopsText.anchor.set(0.5, 0.5);
        oopsText.tint = "0x773713";

        somethingWrongText = game.add.bitmapText(640, 380, 'riccicFreeFont', 'Something went wrong .', 42);
        somethingWrongText.anchor.set(0.5, 0.5);
        somethingWrongText.tint = "0x773713";

        tryAginText = game.add.bitmapText(640, 440, 'riccicFreeFont', 'Please try again later', 42);
        tryAginText.anchor.set(0.5, 0.5);
        tryAginText.tint = "0x773713";

        //ADD WRONG POPUP CROSS BUTTON
        wrongPopupCrossButton = Utils.ButtonSettingsControl(wrongPopupCrossButton, 1015, 125, 'cossButton', this.WrongPopupCrossButtonOnPress, null, null, this.WrongPopupCrossButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);


        wrongPopupGroup.add(wrongPopupOverlay);
        wrongPopupGroup.add(wrongPopupPrompt);
        wrongPopupGroup.add(oopsText);
        wrongPopupGroup.add(somethingWrongText);
        wrongPopupGroup.add(tryAginText);
        wrongPopupGroup.add(wrongPopupCrossButton);


        wrongPopupGroup.visible = false;
        wrongPopupGroup.alpha = 0;
    },

    ShowWrongPopup: function() {
        game.world.bringToTop(wrongPopupGroup);
        wrongPopupGroup.visible = true;
        var tween = game.add.tween(wrongPopupGroup).to({ alpha: 1 }, 200, Phaser.Easing.Linear.Out, true);
        tween.onComplete.add(function() {
            ParentsPopup.HideParentPopup();
        });
    },

    HideWrongPopup: function() {
        var tween = game.add.tween(wrongPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        tween.onComplete.add(function() {
            wrongPopupGroup.visible = false;
        });
    },


    WrongPopupOverlayOnPress: function() {

    },

    WrongPopupCrossButtonOnPress: function() {
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(wrongPopupCrossButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    WrongPopupCrossButtonOnRelease: function() {
        game.add.tween(wrongPopupCrossButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);

        setTimeout(function() {
            WrongPopup.HideWrongPopup();
        }, 100);
    },





}