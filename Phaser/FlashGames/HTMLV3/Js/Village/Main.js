var Main = function() {};
Main.prototype = {
    init: function() {
        console.log("The main Screen.........................");
        Utils.ScaleManager();
    },
    preload: function() {
        game.load.script('GamePlay', 'Js/Village/GamePlay.js');
        LoadAssets.LoadAllAssets();
    },
    create: function() {
        SoundManager.CreateSound();
        game.state.add('GamePlay', GamePlay);
        game.state.start('GamePlay'); 
        // villageImageSequence = game.add.sprite(0, 0, 'lastImageSequece');
        // villageImageSequence.scale.set(2.3 ,1.4);//2.3x1.32
        // villageImageSequence.animations.add('run');
        // villageImageSequence.animations.play('run', 5, true);
    },
};