import FontFaceObserver from "fontfaceobserver";
import Image from "../objectclass/Image";
import Text from "../objectclass/Text";
import { Utils } from "../class/Utils";
import { Client } from "../services/Client";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
        this.fonts = {
            "BAHNSCHRIFT": null
        }
    }
    preload() {
        this.load.image('bg', './assets/images/common/background.png');
        this.load.image('progress-base', './assets/images/preloadScene/progress_base.png');
        this.load.image('progress-bar', './assets/images/preloadScene/progress_bar.png');
    }
    create() {
        // Client.SetConnection();
        this.game.events.on('resize', this.Resize, this);
        this.bg = new Image(this, 0, 0, 'bg');
        this.bg.SetOrigin(0);
        let style = { fontFamily: "Poppins-Bold", fontSize: 80 };
        this.loadingText = new Text(this, 0, 0, "Loading...", style);
        this.loadingText.SetOrigin(0.5);
        this.loadingBase = new Image(this, 0, 0, 'progress-base');
        this.loadingBase.SetOrigin(0);
        this.loadingBar = new Image(this, 0, 0, 'progress-bar');
        this.loadingBar.SetOrigin(0);
        this.loadingBar.setCrop(0, 0, this.loadingBar.height);
        this.LoadFonts();


        this.Resize(window.innerWidth, window.innerHeight);
    }
    LoadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.FontLoadSuccess.bind(this, fontName, isLast), this.FontLoadError.bind(this, fontName));
        });

    }
    FontLoadSuccess(fontName, isLast) {
        if (isLast) {
            this.LoadAssets();
        }
    }
    FontLoadError(fontName) {
        console.log('error');
    }
    LoadAssets() {
        //loading bar
        this.load.on('progress', this.LoadProgress, this)
        this.load.on('complete', this.LoadComplete, { scene: this.scene });


        this.load.image('play_button_disabled', './assets/images/titleScene/play_button_disabled.png');
        this.load.image('play_button_hover', './assets/images/titleScene/play_button_hover.png');
        this.load.image('play_button_normal', './assets/images/titleScene/play_button_normal.png');

        //gamescene
        this.load.image('user_base', './assets/images/gameScene/player/user_base.png');
        this.load.image('user_balance_base', './assets/images/gameScene/player/user_balance_base.png');
        this.load.image('table_bg', './assets/images/gameScene/table_bg.png');
        this.load.image('user_card_back', './assets/images/gameScene/player/user_card_back.png');
        this.load.spritesheet("cards", "./assets/images/card_spritesheet47.png", {
            frameWidth: 2205 / 13,
            frameHeight: 1200 / 5
        });
        this.load.image('user_image', './assets/images/gameScene/player/user_image.png');
        this.load.image('user_balance_base', './assets/images/gameScene/player/user_balance_base.png');
        this.load.image('user_ring', './assets/images/gameScene/player/user_ring.png');
        this.load.image('user_dealer_base', './assets/images/gameScene/player/user_delear_base.png');
        this.load.image('small_blind_base', './assets/images/gameScene/player/small_blind_base.png');
        this.load.image('big_blind_base', './assets/images/gameScene/player/big_blind_base.png');
        for (let index = 0; index < 4; index++) {
            this.load.image('user_name_base' + index.toString(), './assets/images/gameScene/player/user_name_base' + index.toString() + '.png');
        }
        this.load.image('arrow', './assets/images/ui/arrow.png');
        //json
        this.load.json('TempPlayerData', './assets/ServerData.json');
        this.load.json('GameData', './assets/GameData.json');
        this.load.start();
    }
    LoadProgress(_percentage) {
        this.loadingBar.setCrop(0, 0, this.loadingBar.width * _percentage, this.loadingBar.height);
        _percentage = _percentage * 100;
        this.loadingText.SetText('Loading...' + _percentage.toFixed(0) + '%');
    }
    LoadComplete() {
        setTimeout(() => {
            this.scene.stop('PreloadScene');
            this.scene.start('MenuScene');
        }, 1000)
    }
    Resize(newWidth, newHeight) {
        let newScale = Utils.getScale(1920, 1080, newWidth, newHeight);
        this.bg.SetDisplay(newWidth, newHeight);
        this.loadingText.SetScale(newScale);
        this.loadingText.SetPosition(newWidth / 2, newHeight / 2 + 200 * newScale);
        this.loadingBase.SetScale(newScale);
        this.loadingBase.SetPosition(newWidth / 2 - 600 * newScale, newHeight / 2 + 350 * newScale);
        this.loadingBar.SetScale(newScale);
        this.loadingBar.SetPosition(newWidth / 2 - 600 * newScale, newHeight / 2 + 350 * newScale);
    }
}