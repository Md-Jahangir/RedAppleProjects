var alertGroup;
var alertOverlay;
var alertCrossButton;

var Alert = {
    ShowAlert: function(_message, _willCrossButtonShow = null) {
        alertOverlay = Utils.ButtonSettingsControl(alertOverlay, game.world.centerX, game.world.centerY, 'one_pixel', this.AlertOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 3000, 3000, this);
        alertOverlay.tint = "0x000000";
        alertOverlay.alpha = 0.5;

        var alertBg = Utils.SpriteSettingsControl(alertBg, game.world.centerX, game.world.centerY, 'alert_box', "true", "true", 0.5, 0.5, 1, 1, "false");

        var alertTextstyle = { font: '54px Lato-Heavy', fill: '#ffffff', align: 'center', wordWrap: true, wordWrapWidth: 850 };
        var alertMessageText = game.add.text(0, -20, _message, alertTextstyle);
        alertMessageText.anchor.setTo(0.5);

        alertCrossButton = Utils.ButtonSettingsControl(alertCrossButton, 440, -320, 'cross_icon', this.AlertCrossButtonPressed, null, null, this.AlertCrossButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);

        if (gamePage == "Gameplay") {
            alertOverlay.angle = 90;
            alertBg.angle = 90;
        } else {
            alertOverlay.angle = 0;
            alertBg.angle = 0;
        }

        if (gameStatus == "offline") {
            alertCrossButton.visible = false;
        } else {
            if (_willCrossButtonShow != null && _willCrossButtonShow == false) {
                alertCrossButton.visible = false;
            } else {
                alertCrossButton.visible = true;
            }
        }

        alertGroup = game.add.group();
        alertBg.addChild(alertCrossButton);
        alertBg.addChild(alertMessageText);
        alertGroup.add(alertBg);
        SoundManager.PlayPopupShowingSound();
    },

    HideAlert: function() {
        if (alertGroup != null && alertOverlay != null && alertGroup.visible == true && alertOverlay.visible == true) {
            alertOverlay.visible = false;
            alertOverlay.destroy();
            game.add.tween(alertGroup.position).to({ y: game.height }, 200, "Linear", true).onComplete.add(function() {
                alertGroup.visible = false;
                if (alertGroup != null) {
                    alertOverlay.destroy();
                    alertGroup.destroy();
                } else {}
            });
        } else {}

    },
    AlertCrossButtonPressed: function() {
        SoundManager.PlayButtonClickTypeOneSound();
    },
    AlertCrossButtonReleased: function() {
        Alert.HideAlert();
    },
    AlertOverlayPressed: function() {}
}