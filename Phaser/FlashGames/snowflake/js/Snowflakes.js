var numberOfSnow = 20;
var snowArray = [];

var Snowflakes = {
    CreateSnowFlakes: function() {
        for (var i = 0; i < numberOfSnow; i++) {
            var randomX = Math.random() * 750 + 260;
            var randomY = Math.random() * (-600) + 0;
            var snow = Utils.SpriteSettingsControl(snow, randomX, randomY, 'snow', "true", "true", 0.5, 0.5, 0.4, 0.4);
            snowArray.push(snow);
            this.MoveSnow();
        }

    }, //End of SnowFlakes function

    MoveSnow: function() {
        for (var i = 0; i < snowArray.length; i++) {
            var rndSpeed = Math.random() * 4000 + 6000;
            var snowTween = game.add.tween(snowArray[i].position).to({
                y: 650
            }, rndSpeed, Phaser.Easing.Linear.Out, true, 0, -1);
            snowTween.onComplete.add(this.RearrangeSnow, this);
        }
    },

    RearrangeSnow: function() {
        for (var i = 0; i < snowArray.length; i++) {
            var randomX = Math.random() * 750 + 260;
            var rndSpeed = Math.random() * 4000 + 6000;
            var tween = game.add.tween(snowArray[i].position).to({
                x: randomX,
                y: 0
            }, rndSpeed, Phaser.Easing.Linear.Out, true, 0, -1);
        }
    },

    VisibleInvisibleSnow: function(_status) {
        for (var i = 0; i < snowArray.length; i++) {
            snowArray[i].visible = _status;
        }
    },
}