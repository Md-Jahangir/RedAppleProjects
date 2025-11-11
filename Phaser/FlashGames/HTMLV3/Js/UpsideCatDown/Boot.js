Boot = function() {};
Boot.prototype = {
    init: function() {
        console.log("The boot Screen.........................");
        Utils.ScaleManager();
        var isMobile = /iPhone|iPhoneX|iPad|iPod|Android/i.test(navigator.userAgent);

        if(isMobile)
        {
            Utils.FitToScreen();
            // game.camera.scale.x = 0.85;
            // game.camera.scale.y = 0.85;
        }
    },
    preload: function() {
        // game.load.image('splashScreenBg', 'assets/Splash/BG.png');
        game.load.script('Main', 'Js/UpsideCatDown/Main.js');
    },
    create: function() {
        console.log("The device........................"+this.game.device.desktop);
        // game.capture = game.plugins.add(Phaser.Plugin.Capture);
        game.state.add('Main', Main);
        game.state.start('Main');
    }
};