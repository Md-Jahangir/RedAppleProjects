var titleArt;
var Splash = function () {};
Splash.prototype = {
    init: function(){
        Utils.ScaleManager();
    },
    preload: function () {
        console.log("Enter into the Splash Preload Fucntion");

    },
    create: function () { 
        //ADD THE BACKGROUND
        //splashBg = Utils.SpriteSettingsControl(splashBg,game.world.centerX,game.world.centerY,'overlay',"true","true",0.5,0.5,0.6,0.6);

       //ADD TITLE ART ON SPLASH PAGE
       titleArt = Utils.SpriteSettingsControl(titleArt,game.world.centerX, 1280+360, 'titleArt', "true", "true", 0.5, 0.5, 1, 1);
       titleArt.animations.add('logo_animation');


       //Tween the titleArt
       setTimeout(function() {
           var tween = game.add.tween(titleArt.position).to({ x: game.world.centerX, y: game.world.centerY - 50 }, 2000, Phaser.Easing.Linear.Out, true);
           tween.onComplete.add(function() {
            titleArt.animations.play('logo_animation',20,false);
           });
       }, 1000);

        this.SetTimeOut();
    },

    render: function(){
        //  FPS debug info
        //console.log("Enter into the Render");
        // game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");
    },
    SetTimeOut: function(){
        setTimeout(() => {
            game.state.start('Menu');
            titleArt.visible = false;
        }, 7000);
    }

};