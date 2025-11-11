var Main = function() {};
Main.prototype = {
    init: function() {
        console.log("The main Screen.........................");
        Utils.ScaleManager();
    },
    preload: function() {
        game.load.script('GamePlay', 'Js/Snowflake/GamePlay.js');
        LoadAssets.LoadAllAssets();
    },
    create: function() {
        SoundManager.CreateSound();
        game.state.add('GamePlay', GamePlay);
        game.state.start('GamePlay');
    },
};