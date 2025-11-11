Boot = function() {};
Boot.prototype = {
    init: function() {
        console.log("The boot Screen.........................");
        Utils.ScaleManager();
        var isMobile = /iPhone|iPhoneX|iPad|iPod|Android/i.test(navigator.userAgent);
        if(isMobile)
        {
            console.log("isMobile "+isMobile);
            Utils.FitToScreen();
            console.log(window.screen.width+" "+window.screen.height);
            // game.camera.scale.x = 0.85;
            // game.camera.scale.y = 0.85;
        }
    },
    preload: function() {
        // game.load.image('splashScreenBg', 'assets/Splash/BG.png');
        game.load.script('Main', 'Js/Zoodrag/Main.js');
    },
    create: function() {
        console.log("The device........................"+this.game.device.desktop);
        game.state.add('Main', Main);
        game.state.start('Main');
    }
};