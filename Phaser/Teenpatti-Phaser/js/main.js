var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game'), Main = function () {};
var text;
var gameState = "";
var gameStatus = "";
Phaser.Device.whenReady(function () {
    game.plugins.add(PhaserInput.Plugin);
    //game.plugins.add(PhaserInput.Plugin);
});
Main.prototype = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.fullScreenScaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        if(localStorage.getItem("soundOnOff") == null){
            Database.SaveData("soundOnOff","1");
        }
        gameState = "Main";
    },
    preload: function () {
        Debug.log("Enter into the Main Preload Fucntion");
        //   game.load.crossOrigin = true;
        game.load.script('splash','js/splash.js');
        game.load.script('menu','js/menu.js');
        game.load.script('privateTable','js/privateTable.js');
        game.load.script('classic','js/classic.js');
        game.load.script('joker','js/joker.js');
        game.load.script('muflis','js/muflis.js');
        //game.time.advancedTiming = true;
        //	Progress report
        text = game.add.text(game.world.centerX-80, game.world.centerY, 'Loading, Please wait...', { fill: '#ffffff'});
        // game.load.image('blackOnePixel', 'assets/Common/one_pixel_black.png');
        // game.load.image('loadingWheel', 'assets/Common/loading_wheel.png');
        LoadAssets.LoadAllAssets();
        //Loading.ShowLoadingPopUp();
        // game.load.onLoadStart.add(this.loadStart, this);
        // game.load.onFileComplete.add(this.fileComplete, this);
        // game.load.onLoadComplete.add(this.loadComplete, this);
    },
    // render: function(){
    //     //  FPS debug info
    //     console.log("Enter into the Render");
    //     game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");
    // },
    create: function () {
        game.state.add('Splash',Splash);
        game.state.add('Menu',Menu);
        game.state.add('PrivateTable',PrivateTable);
        game.state.add('Classic',Classic);
        game.state.add('Joker',Joker);
        game.state.add('Muflis',Muflis);
        Debug.log("The windows Url.............."+window.location.href);
        parseUserId = this.ParseUrl(window.location.href);
        //parseUserId = this.ParseUrl("https://www.foo.com/?user_id=3");
        if(parseUserId != null){
            Debug.log("The User id from Url........."+parseUserId.user_id);
            //game.state.start('Menu');
            game.state.start('Splash');
            Database.SaveData("user_id",parseUserId.user_id);
            user_id = Database.LoadData("user_id");
        }
        else{
            Debug.log("The User id is not found");
            PopUp.GenerateCommonPopup('The user id not found');
        }
        //Loading.ShowLoadingPopUp();
    },
    ParseUrl: function(url){
        var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

        if (query === url || query === "") return;

        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);

            if (!parms.hasOwnProperty(n)) parms[n] = [];
                parms[n].push(nv.length === 2 ? v : null);
        }
        return parms;
    },
    loadStart: function(){
        Debug.log("Start The Load");
        LoadAssets.LoadAllAssets();
    },
    fileComplete: function(){
        Debug.log("Load file Complete");
    },
    loadComplete: function(){
        Debug.log("Load Complete");
        text.visible = false;
    }
};
game.state.add('Main', Main);
game.state.start('Main');
