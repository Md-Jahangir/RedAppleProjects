var game = new Phaser.Game( 720,1280, Phaser.CANVAS, 'game'),Boot = function() {};
Boot.prototype = {
    init: function() {
        Debug.log('init ','Boot ');
        Utils.ScaleManager();
    },
    preload: function() {
        Debug.log('preload ','Boot ');
        game.load.script('Main', 'assets/js/main.js');
        game.load.script('GamePlay','assets/js/GamePlay.js');
        game.load.script('tutorial','assets/js/tutorial.js');
    },
    create: function() {
        game.state.add('Main', Main);
        game.state.start('Main');
      
    }
};
game.state.add('Boot', Boot);
game.state.start('Boot');