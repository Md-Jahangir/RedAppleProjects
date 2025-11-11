var game = new Phaser.Game( 720,1280, Phaser.CANVAS, 'game'),Boot = function() {};
Boot.prototype = {
    init: function() {
        Debug.log(" Game Mode...",'Boot_init');
        Utils.ScaleManager();
    },
    preload: function() {
        Debug.log(" Game Mode...",'Boot_preload');        
        game.load.script('Main', 'js/main.js');
        game.load.script('GamePlay','js/GamePlay.js');
    },
    create: function() {
        game.state.add('Main', Main);
        game.state.start('Main');
    }
};
game.state.add('Boot', Boot);
game.state.start('Boot');