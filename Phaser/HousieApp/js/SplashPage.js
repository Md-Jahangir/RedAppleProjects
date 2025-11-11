var loadingFill;
var loadingTimer;

var SplashPage = function() {};
SplashPage.prototype = {
    init: function() {
        Utils.ScaleManager();

        gamePage = "SplashPage";
        localStorage.setItem("page_name", gamePage);
    },
    preload: function() {},

    create: function() {
        // if (localStorage.getItem("is_app_launch_first_time") == null || localStorage.getItem("is_app_launch_first_time") == "true") {
        //     //Call api for understand that app uninstalled and re installed
        //     console.log("App launch first time");
        // } else {}
        this.CreateSplashPage();
    },

    CreateSplashPage: function() {
        var splashBg = Utils.SpriteSettingsControl(splashBg, game.world.centerX, game.world.centerY, 'splash_bg', "true", "true", 0.5, 0.5, 1, 1, "false");

        var loadingBase = Utils.SpriteSettingsControl(loadingBase, game.world.centerX, game.world.centerY + Math.round(game.height / 3), 'loading_base', "true", "true", 0.5, 0.5, 1, 1, "false");
        loadingFill = Utils.SpriteSettingsControl(loadingFill, -260, -19, 'loading_fill', "true", "true", 0, 0, 0, 1, "false");
        loadingBase.addChild(loadingFill);

        var loadingTextstyle = { font: '55px Lato-Heavy', fill: '#ffffff', fontStyle: "normal", align: 'center', wordWrap: false, wordWrapWidth: 200 };
        var loadingText = game.add.text(game.world.centerX, game.world.centerY + Math.round(game.height / 3.5), "Loading . . . ", loadingTextstyle);
        loadingText.anchor.setTo(0.5);

        loadingTimer = game.time.events.loop(100, this.LoadingBar, this);

        API.StateList();
    },

    LoadingBar: function() {
        if ((loadingFill.scale.x + 0.09) < 1.04) {
            loadingFill.scale.x += 0.09;
        } else {
            game.time.events.remove(loadingTimer);
            if (localStorage.getItem("logged_in") == null || localStorage.getItem("logged_in") == "false") {
                StateTransition.TransitToLogin();
            } else {
                StateTransition.TransitToMenu();
            }
        }
    }

}