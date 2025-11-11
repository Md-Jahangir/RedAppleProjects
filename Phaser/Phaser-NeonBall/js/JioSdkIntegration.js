export default class JioSdkIntegration{
    constructor() {
        /* JIO SDK 2.0 integration */
        var jioConf = { "autoControl": ["volume", "exit"], "gameName": "neonball", "gameVersion": "1.0.0" };
        window.jioSDK = new Jiogames(jioConf);
        document.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(e) {
        switch (e.key) {
            case "0":
                if (game.paused) {
                    console.log("gameResumed");
                    banner.setText("");
                    music && music.play();
                    game && game.gameResumed();
                } 
                else {
                    console.log("gamePaused");
                    banner.setText("Game paused");
                    music && music.pause();
                    game && game.gamePaused();
                }
                break;
            default:
                break;
        }
    }

    /* JIO ads related code */
    cacheAds = function() {
        VMAX.jioSDK_adId = "neonball"; // <ins ads id in index.html
        VMAX.jioSDK_adReady = false;
        console.log("calling cache Jio Ad")
        VMAX.cacheAd(VMAX.jioSDK_adId);
        VMAX.onAdReady = function(AdPlacementId) {
            VMAX.jioSDK_adReady = true;
            console.log("VMAX: onAdReady");
        }
        VMAX.onAdError = function(AdPlacementId, errorCode) {
            console.log("VMAX: onAdError: ", errorCode);
            VMAX.jioSDK_adReady = false;
        }
        VMAX.onAdClose = function(AdPlacementId) {
            console.log("onAdClose");
            setTimeout(function() {
                console.log("VMAX: onAdClose");
                cacheAds(); // call cache on every ad close and get prepared for next ad
            }, 3000);
        }
    }


    /* JIO ads related code */
    cacheAds = function() {
        VMAX.jioSDK_adId = "neonball"; // <ins ads id in index.html
        VMAX.jioSDK_adReady = false;
        console.log("calling cache Jio Ad")
        VMAX.cacheAd(VMAX.jioSDK_adId);
        VMAX.onAdReady = function(AdPlacementId) {
            VMAX.jioSDK_adReady = true;
            console.log("VMAX: onAdReady");
        }
        VMAX.onAdError = function(AdPlacementId, errorCode) {
            console.log("VMAX: onAdError: ", errorCode);
            VMAX.jioSDK_adReady = false;
        }
        VMAX.onAdClose = function(AdPlacementId) {
            console.log("onAdClose");
            setTimeout(function() {
                console.log("VMAX: onAdClose");
                cacheAds(); // call cache on every ad close and get prepared for next ad
            }, 3000);
        }
    }

    showAds = function() { // use this showAds func in your game levels/game over or maintain your ad frequency when to show ads
        if(VMAX.jioSDK_adReady){
            VMAX.showAd(VMAX.jioSDK_adId);
            console.log("showing ads on id: ", VMAX.jioSDK_adId);
        }
    }
    /* JIO SDK integration ends */
}