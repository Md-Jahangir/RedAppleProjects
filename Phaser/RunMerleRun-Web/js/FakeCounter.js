var soundButton;
var fakePopupOverlay;

var FakeCounter = {
    CreateFakeCounterText: function(numberText, timeDelay) {

        setTimeout(function() {
            var tempText = game.add.bitmapText(640, 360, 'riccicFreeFont', numberText, 300);
            tempText.anchor.set(0.5, 0.5);
            tempText.scale.set(0, 0);
            tempText.alpha = 0;

            game.add.tween(tempText).to({ alpha: 1 }, 300, Phaser.Easing.Linear.Out, true, 500);
            var firstTween = game.add.tween(tempText.scale).to({ x: 0.5, y: 0.5 }, 300, Phaser.Easing.Linear.Out, true, 500);
            firstTween.onComplete.add(function() {
                var secondTween = game.add.tween(tempText.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Linear.Out, true, 500);
                var secondTween = game.add.tween(tempText).to({ alpha: 0 }, 300, Phaser.Easing.Linear.Out, true, 500);
                secondTween.onComplete.add(function() {
                    tempText.destroy();
                });
            });

        }, timeDelay);


    },

    ShowFakeCounter: function() {
        //ADD FAKE COUNTER POPUP OVERLAY
        fakePopupOverlay = Utils.ButtonSettingsControl(fakePopupOverlay, 640.0, 360.0, 'overlay', this.FakePopupOverlayOverlayOnPress, null, null, null, "true", "true", 0.5, 0.5, 4, 4, this);
        for (var i = 4; i >= 1; i--) {
            if (i == 1) {
                FakeCounter.CreateFakeCounterText("GO", 4400);
            } else if (i == 2) {
                FakeCounter.CreateFakeCounterText(i - 1, 3200);
            } else {
                FakeCounter.CreateFakeCounterText(i - 1, 8000 + (-i * 2000));
            }
        }
        setTimeout(() => {
            fakePopupOverlay.destroy();
            Gameplay.prototype.StartGame();
        }, 6400);
    },

    FakePopupOverlayOverlayOnPress: function() {

    },


}