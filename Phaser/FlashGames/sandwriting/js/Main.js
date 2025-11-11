var Main = function() {};
Main.prototype = {
    init: function() {
        console.log("The main Screen.........................");
        Utils.ScaleManager();
    },
    preload: function() {
        Phaser.Device.whenReady(function() {
            game.plugins.add(PhaserInput.Plugin);
        });
        game.load.script('GamePlay', 'js/GamePlay.js');
        LoadAssets.LoadAllAssets();

    },
    create: function() {
        SoundManager.CreateSound();
        game.state.add('GamePlay', GamePlay);
        game.state.start('GamePlay');
    },
};