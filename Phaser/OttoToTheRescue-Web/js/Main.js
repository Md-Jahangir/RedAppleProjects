var Main = function() {};
var text;
Main.prototype = {
    init: function() {
        Utils.ScaleManager();
    },
    preload: function() {
        console.log("Enter into the Main Preload Fucntion");
        LoadAssets.LoadAllAssets();
        game.load.script('splash', 'js/Splash.js');
        game.load.script('menu', 'js/Menu.js');
        game.load.script('levelSelection', 'js/LevelSelection.js');
        game.load.script('gameplay', 'js/Gameplay.js');
        game.load.script('leaderBoardPopup', 'js/LeaderBoardPopup.js');
        //	Progress report
        text = game.add.text(game.world.centerX - 80, game.world.centerY, 'Loading...', { fill: '#ffffff' });
        game.time.advancedTiming = true;
        if (localStorage.getItem("isMusic") == null) {
            Database.SaveData("isMusic", "1");
        }
        if (localStorage.getItem("isSound") == null) {
            Database.SaveData("isSound", "1");
        }
    },
    create: function() {
        game.state.add('Splash', Splash);
        game.state.add('Menu', Menu);
        game.state.add('LevelSelection', LevelSelection);
        game.state.add('Gameplay', Gameplay);
        game.state.add('LeaderBoardPopup', LeaderBoardPopup);
        game.state.start('Splash');
        // game.state.start('Menu');
        SoundManager.CreateSound();
    },
    render: function() {
        //  FPS debug info
        //console.log("Enter into the Render");
        // game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");
    },
};