import { Constant } from "../Constant";
import FontFaceObserver from "fontfaceobserver";
import { Server } from "../Server";
import { SoundManager } from "../SoundManager";
export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
        //#region -Variables
        this.fonts = {
            "LILITAONE": null
        }
        this.folders = {
            "bg_folder": "assets/images/background/",
            "ui_folder": "assets/images/ui/",
            "gameObjects_folder": "assets/images/gameObjects/",
            "json_folder": "assets/json/",
            "terrain_folder": "assets/images/terrain/",
            "audio_folder": "assets/audio/"
        }
        //#endregion
    }
    //#region -Preload
    preload() {
        this.load.image("bg_sky", this.folders.bg_folder + "bg_sky.png");
        this.load.image("loader_bg", this.folders.ui_folder + "loader-bg.png");
        this.load.image("loader_bar", this.folders.ui_folder + "loader-bar.png");
        this.load.image("grand_gaming_logo", this.folders.ui_folder + "grand_gaming_logo.png");
    }
    //#endregion

    //#region -Create
    create() {
        // this.backgroundgSky = this.add.image(0, 0, "bg_sky").setOrigin(0);
        this.grandGameLogo = this.add.image(0, 0, "grand_gaming_logo")
        // this.progressBase = this.add.image(0, 0, "loader_bg");
        // this.progressBar = this.add.image(0, 0, "loader_bar");
        this.loadingText = this.add.text(0, 0, "Loading...", { fontFamily: "LILITAONE", fontSize: 40 })
            .setOrigin(0.5);
        this.FontLoad();
        this.Resize(window.innerWidth, window.innerHeight);
    }
    //#endregion

    //#region -FontLoad
    FontLoad() {
        let fontProperty = Object.getOwnPropertyNames(this.fonts);
        fontProperty.forEach((_fontName, _index) => {
            let isLastFont = _index >= fontProperty.length - 1;
            this.fonts[_fontName] = new FontFaceObserver(_fontName);
            this.fonts[_fontName].load()
                .then(this.OnFontLoadSuccess.bind(this, _fontName, isLastFont),
                    this.OnFontLoadFail.bind(this, _fontName));
        });
    }
    //#endregion

    //#region -OnFontLoadSuccess
    /**
     * 
     * @param {*} _fontName 
     * @param {*} _isLastFont 
     */
    async OnFontLoadSuccess(_fontName, _isLastFont) {
        if (_isLastFont) {
            if (!Server.IsUrlParamsMissing()) {
                let responseData = await Server.VerifyGameToken();
                Constant.PlayerData = responseData.data;
                responseData != null || undefined ? this.AssetLoad() : this.scene.start("GameError");
            } else {
                console.log("Parameter missing");
            }
        }
    }
    //#endregion

    //#region -OnFontLoadFail
    OnFontLoadFail(_fontName) {
    }
    //#endregion

    //#region -AssetLoad
    AssetLoad() {
        // Ads Countdown set;
        Constant.advertisementCountDown = Constant.PlayerData.ads_break;
        //events
        this.load.on("progress", this.OnAssetsLoadingProggress, this);
        this.load.on("complete", this.OnAssetsLoadingSuccess, this);
        //terrains
        this.load.image("terrain_flat", this.folders.terrain_folder + "terrain_flat.png");
        this.load.image("terrain_start", this.folders.terrain_folder + "terrain_start.png");
        for (let i = 0; i < 4; i++) {
            this.load.image("terrain_" + i, this.folders.terrain_folder + "terrain_" + i + ".png");
        }
        //gameObjects Load section
        this.load.image("bg_gamescene", this.folders.bg_folder + "gamescene_bg.png");
        this.load.image("wheely_eggy", this.folders.ui_folder + "wheely_eggy.png");
        this.load.image("car_new", this.folders.gameObjects_folder + "car_new.png");
        this.load.image("wheel", this.folders.gameObjects_folder + "wheel.png");
        this.load.image("blockage", this.folders.gameObjects_folder + "blockage.png");
        this.load.image("paddle_idle_left", this.folders.gameObjects_folder + "paddle_idle_left.png"); //new
        this.load.image("paddle_pressed_left", this.folders.gameObjects_folder + "paddle_pressed_left.png"); //new
        this.load.image("paddle_idle_right", this.folders.gameObjects_folder + "paddle_idle_right.png"); //new
        this.load.image("paddle_pressed_right", this.folders.gameObjects_folder + "paddle_pressed_right.png"); // new
        this.load.image("boost_dial", this.folders.gameObjects_folder + "boost_dial.png");
        this.load.image("rpm_dial", this.folders.gameObjects_folder + "rpm_dial.png");
        this.load.image("dial_needle", this.folders.gameObjects_folder + "dial_needle.png");
        this.load.image("egg", this.folders.gameObjects_folder + "egg.png");
        this.load.image("egg_crack_lower", this.folders.gameObjects_folder + "egg_crack_lower.png");
        this.load.image("egg_crack_upper", this.folders.gameObjects_folder + "egg_crack_upper.png");
        this.load.image("target_flag", this.folders.gameObjects_folder + "target_flag.png"); // not change
        this.load.image("coin", this.folders.gameObjects_folder + "coin.png");
        this.load.image("coinUI", this.folders.gameObjects_folder + "coinUI.png");
        this.load.image("distance_icon", this.folders.ui_folder + "distance_icon.png");
        //ui load section
        this.load.image("baseframe_pause", this.folders.ui_folder + "baseframe_pause.png");
        this.load.image("baseframe_gameOver", this.folders.ui_folder + "baseframe_gameOver.png");
        this.load.image("button_home", this.folders.ui_folder + "button_home.png");
        this.load.spritesheet("button_music", this.folders.ui_folder + "button_music.png", { frameWidth: 138, frameHeight: 112 });

        this.load.spritesheet("full_screen", this.folders.ui_folder + "full_screen.png", { frameWidth: 138, frameHeight: 112 });

        this.load.image("button_play", this.folders.ui_folder + "button_play.png");
        this.load.image("button_pause", this.folders.ui_folder + "button_pause.png");
        this.load.image("button_replay", this.folders.ui_folder + "button_replay.png");
        this.load.image("button_resume", this.folders.ui_folder + "button_resume.png");
        this.load.image("distancebase", this.folders.ui_folder + "distancebase.png");
        this.load.image("distancebar", this.folders.ui_folder + "distancebar.png");
        this.load.image("back_button", this.folders.ui_folder + "back_button.png");

        this.load.image("overlay", this.folders.ui_folder + "one_pixel_black.png");
        this.load.image("quit_base", this.folders.ui_folder + "quit_base.png");
        this.load.image("quit_no", this.folders.ui_folder + "quit_no.png");
        this.load.image("quit_yes", this.folders.ui_folder + "quit_yes.png");
        //json collider
        this.load.json("collider", this.folders.json_folder + "EggyCarColliders.json");
        //audio
        this.load.audio("game_bg_sound", this.folders.audio_folder + "bg_music.ogg");
        this.load.audio("egg_breaks", this.folders.audio_folder + "egg_broken.ogg");
        this.load.audio("coin_collect", this.folders.audio_folder + "coin_hit.ogg");
        this.load.audio("challenge_won", this.folders.audio_folder + "challenge_won.ogg");
        this.load.audio("game_over", this.folders.audio_folder + "game_over.ogg");
        this.load.audio("button_click", this.folders.audio_folder + "button_click.mp3");
        this.load.start();
    }
    //#endregion

    //#region -OnAssetsLoadingProggress
    /**
     * 
     * @param {number} _percent 
     */
    OnAssetsLoadingProggress(_percent) {
        // this.progressBar.setCrop(0, 0, this.progressBase.width * _percent, this.progressBar.height);
        // this.loadingText.setText("Loading... " + _percent.toFixed(0) + " %");
        _percent = _percent * 100;
        this.loadingText.setText("Loading... ");
    }
    //#endregion

    //#region -OnAssetsLoadingSuccess
    OnAssetsLoadingSuccess() {
        SoundManager.CreateSound();
        setTimeout(() => {
            this.scene.stop("PreloadScene");
            this.scene.start("MenuScene");
        }, 1000);
    }
    //#endregion

    //#region -Resize
    /**
     * 
     * @param {number} newWidth 
     * @param {number} newHeight 
     */
    Resize(newWidth, newHeight) {
        let newScale = Constant.GetScale(1920, 1080, newWidth, newHeight);
        // this.backgroundgSky.setDisplaySize(newWidth, newHeight);
        this.grandGameLogo.setScale(newScale);
        this.grandGameLogo.setPosition(newWidth / 2, newHeight / 2);
        this.loadingText.setScale(newScale);
        this.loadingText.setPosition(this.grandGameLogo.x, this.grandGameLogo.y + 250 * newScale);

        // this.progressBase.setScale(newScale);
        // this.progressBase.setPosition(newWidth / 2, newHeight - (200 * newScale));
        // this.progressBar.setScale(newScale);
        // this.progressBar.copyPosition(this.progressBase);
        // this.loadingText.setScale(newScale)
        //     .setPosition(this.progressBase.x, this.progressBase.y - 40 * newScale);
    }
    //#endregion
}