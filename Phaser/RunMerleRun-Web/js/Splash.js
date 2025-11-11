var splashGroup;

var Splash = function () { };
Splash.prototype = {
    init: function () {
        Utils.ScaleManager();
    },
    preload: function () {

    },
    create: function () {

        Splash.prototype.CreateSplash();

        this.SetTimeOut();

    },

    CreateSplash: function () {
        splashGroup = game.add.group();
        //ADD SPLASH PAGE BACKGROUND
        var splashPageBackground = Utils.SpriteSettingsControl(splashPageBackground, 640, 360, 'overlay', "true", "true", 0.5, 0.5, 4, 4);

        //ADD TITLE ART ON SPLASH PAGE
        var titleArt = Utils.SpriteSettingsControl(titleArt, 640, 1060, 'titleArt', "true", "true", 0.5, 0.5, 1, 1);
        // titleArt.animations.add('logo_animation');

        splashGroup.add(splashPageBackground);
        splashGroup.add(titleArt);


        // //Tween the titleArt
        // setTimeout(function() {
        //     var tween = game.add.tween(titleArt.position).to({ x: 640, y: 360 }, 2000, Phaser.Easing.Linear.Out, true);
        //     tween.onComplete.add(function() {
        //         splashPageSFX.play();
        //         titleArt.animations.play('logo_animation', 22, false);
        //     });
        // }, 100);

        //Tween the titleArt
        var tween = game.add.tween(titleArt.position).to({ x: 640, y: 360 }, 2000, Phaser.Easing.Linear.Out, true, 100);
        setTimeout(function () {
            splashPageSFX.play();
        }, 1000);
        tween.onComplete.add(function () {
            titleArt.animations.play('logo_animation', 20, false);
        });
    },

    DestroySplash: function () {
        if (splashGroup != null) {
            splashGroup.destroy();
            splashPageSFX.stop();
        }
    },


    SetTimeOut: function () {
        setTimeout(this.ChangeState, 7400);
    },
    ChangeState: function () {
        StateTransition.TransitToMenu();

        setTimeout(function () {
            Splash.prototype.DestroySplash();
        }, 600);
    }
};