var wrongPopupGroup;
var wrongPopupOverlay;
var oopsText;
var somethingWrongText;
var tryAginText;
var wrongPopupCrossButton;
var wrongPopupPrompt;

var WrongPopup = {
    CreateWrongPopup: function() {
        wrongPopupGroup = game.add.group();

        //ADD LEVEL GAME OVER POPUP OVERLAY
        wrongPopupOverlay = Utils.ButtonSettingsControl(wrongPopupOverlay, 360.0, 640.0, 'blueOverlay', this.HideWrongPopup, null, null, null, "true", "true", 0.5, 0.5, 0.6, 0.6, this);

        //ADD GAME PAUSED PROMPT
        wrongPopupPrompt = Utils.SpriteSettingsControl(wrongPopupPrompt, 360.0, 640.0, 'parentsBase', "true", "true", 0.5, 0.5, 0.6, 0.6);


        oopsText = game.add.bitmapText(360, 540, 'shootEmFont', 'Oops! ', 50);
        oopsText.anchor.set(0.5, 0.5);
        oopsText.tint = "0xffffff";

        somethingWrongText = game.add.bitmapText(360, 640, 'shootEmFont', 'Something went wrong .  \n Please try again later', 42);
        somethingWrongText.anchor.set(0.5, 0.5);
        somethingWrongText.tint = "0xffffff";


        //ADD WRONG POPUP CROSS BUTTON
        //wrongPopupCrossButton = Utils.ButtonSettingsControl(wrongPopupCrossButton, 1015, 125, 'cossButton', this.WrongPopupCrossButtonOnPress, null, null, this.WrongPopupCrossButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);


        wrongPopupGroup.add(wrongPopupOverlay);
        wrongPopupGroup.add(wrongPopupPrompt);
        wrongPopupGroup.add(oopsText);
        wrongPopupGroup.add(somethingWrongText);
        // wrongPopupGroup.add(tryAginText);
        // wrongPopupGroup.add(wrongPopupCrossButton);


        wrongPopupGroup.visible = false;
        wrongPopupGroup.alpha = 0;
    },

    ShowWrongPopup: function(text) {
        game.world.bringToTop(wrongPopupGroup);
        wrongPopupGroup.visible = true;
        somethingWrongText.setText(text);
        var tween = game.add.tween(wrongPopupGroup).to({ alpha: 1 }, 200, Phaser.Easing.Linear.Out, true);
        tween.onComplete.add(function() {
            ParentPopup.HideParentPopup();
            game.paused = true;
        });
    },

    HideWrongPopup: function() {
        game.paused = false;
        var tween = game.add.tween(wrongPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        tween.onComplete.add(function() {
            wrongPopupGroup.visible = false;
            shopBttn.visible = false;
            // closeBttn.visible = false;
            // proceedBttn.visible = false;
        });
    },


    WrongPopupOverlayOnPress: function() {

    },

    WrongPopupCrossButtonOnPress: function() {
        game.paused = false;
        buttonClickSFX.play();
        game.add.tween(wrongPopupCrossButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    WrongPopupCrossButtonOnRelease: function() {

        game.add.tween(wrongPopupCrossButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);

        setTimeout(function() {
            WrongPopup.HideWrongPopup();
        }, 100);
    },
}