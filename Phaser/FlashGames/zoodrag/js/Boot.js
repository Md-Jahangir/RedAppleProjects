Boot = function() {};
Boot.prototype = {
    init: function() {
        console.log("The boot Screen.........................");
        Utils.ScaleManager();
    },
    preload: function() {
        // game.load.image('splashScreenBg', 'assets/Splash/BG.png');
        game.load.script('Main', 'js/Main.js');
    },
    create: function() {
        console.log("The device........................"+this.game.device.desktop);
        game.state.add('Main', Main);
        game.state.start('Main');
    }
};