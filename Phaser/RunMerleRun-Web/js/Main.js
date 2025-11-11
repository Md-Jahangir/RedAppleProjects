Main = function () { };
var text;
var playButtonClick = 0;
var GameAnalytics;

Main.prototype = {
    init: function () {
        GameAnalytics("addDesignEvent", "game:boot");

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        game.stage.disableVisibilityChange = true;
    },
    preload: function () {
        game.load.image('titleArt', "assets/images/gui/title_art_animation.png");
        game.load.script('Story', 'js/Story.js');
        // game.load.script('Splash', 'js/Splash.js');
        game.load.script('Menu', 'js/Menu.js');
        game.load.script('Gameplay', 'js/Gameplay.js');


        GameAnalytics("addProgressionEvent", "Start", "game_loading");

    },
    create: function () {
        // try {

        //     GameAnalytics = new GameAnalyticsSDK(Server.GetGameID(), true);
        //     console.log('GameAnalytics', GameAnalytics);

        // } catch (error) {
        //     console.log(error);

        // }
        // Server.GetGameDetails()
        text = game.add.text(game.world.centerX - 80, game.world.centerY + 100, 'Loading...', { fill: '#ffffff' });
        var titleArt = Utils.SpriteSettingsControl(titleArt, game.world.centerX, game.world.centerY - 50, 'titleArt', "true", "true", 0.5, 0.5, 1, 1);
        game.state.add('Story', Story);
        // game.state.add('Splash', Splash);
        // game.state.start('Splash');
        game.state.add('Menu', Menu);

        game.state.add('Gameplay', Gameplay);
        LoadAssets.LoadAllAssets();

        GameAnalytics("addProgressionEvent", "Complete", "game_loading");
    },

};
// game.state.add('Main', Main);
// game.state.start('Main');