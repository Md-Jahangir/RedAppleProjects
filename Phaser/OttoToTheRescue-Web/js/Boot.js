var game = new Phaser.Game(720, 1280, Phaser.CANVAS, 'game'),Boot = function() {};
Boot.prototype = {
    init: function() {
        Utils.ScaleManager();
    },
    preload: function() {
        // console.log("Portrait");
        game.load.script('Main', 'js/Main.js');
    },
    create: function() {
        // if (game != null) {
        // SoundManager.CreateSound();
        // }

        game.state.add('Main', Main);
        game.state.start('Main');
    }
}
game.state.add('Boot', Boot);
game.state.start('Boot');