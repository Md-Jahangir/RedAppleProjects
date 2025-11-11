import { Constant } from "../Constant.js";
import { ProgressBar } from '@pixi/ui';
import * as PIXI from 'pixi.js';
import { Assets, Sprite, Texture, Container, Text, TextStyle } from 'pixi.js';
import { sound } from '@pixi/sound';
// import ButtonTween from "../core/ButtonTween.js";
import TitleScreen from "./TitleScreen.js";
import { Logo } from "../game_objects/Logo.js";
import { PlayzhubEventHandler } from "../PlayzhubEventHandler.js";
import { AudioManager } from "../media/Audiomanager.js";
import { GameAnalytics } from "gameanalytics";


export default class LoadScreen {
    constructor() {
        Constant.currentScreen = 'LoadScreen';
        this.pBottomPanelContainer = null;

        this.initLoadScreen();

        Constant.game.addListener('resize', this.OnResize.bind(this));
        this.OnResize();
    }

    initLoadScreen() {
        this.AddPreloadAssets();
        GameAnalytics.addProgressionEvent(
            "Start",
            "game_loading"
        );
    }

    AddPreloadAssets() {
        // this.bgInstance = GameBg.getInstance();
        // GameBg.getSprite().anchor.set(0.5);
        // Constant.game.app.stage.addChild(GameBg.getSprite());

        this.topPanelContainer = new Container();
        Constant.game.app.stage.addChild(this.topPanelContainer);

        this.pBottomPanelContainer = new Container();
        Constant.game.app.stage.addChild(this.pBottomPanelContainer);

        const logo = Logo.getSprite();
        logo.position.set(0, 300);

        this.topPanelContainer.addChild(logo);


        this.progressBar = new ProgressBar({
            bg: 'progress_bg',
            fill: 'progress_fill',
            progress: 0,
        });
        // progressBar.bg.anchor.set(0.5);
        // progressBar.fill.anchor.set(0.5);
        this.progressBar.x = - 300;
        this.pBottomPanelContainer.addChild(this.progressBar);


        let style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 58,
            // fontStyle: 'italic',
            // fontWeight: 'bold',
            fill: '#ffffff',
            // stroke: { color: '#4a1850', width: 5, join: 'round' },
            // dropShadow: {
            //     color: '#000000',
            //     blur: 4,
            //     angle: Math.PI / 6,
            //     distance: 6,
            // },
            wordWrap: true,
            wordWrapWidth: 800,
        });

        this.loadingTxt = new Text({
            text: 'LOADING: ',
            style,
        });
        this.loadingTxt.anchor.set(0.5);

        this.loadingTxt.y = -45;

        this.pBottomPanelContainer.addChild(this.loadingTxt);

        this.LoadAsssets();
    }

    LoadAsssets() {
        PlayzhubEventHandler.GameLoadingStarted();
        Assets.add({ alias: 'cat_splash_skel', src: 'assets/spines/splash/cat_splash/splash_screen_cat.skel' });
        Assets.add({ alias: 'cat_splash_atlas', src: 'assets/spines/splash/cat_splash/splash_screen_cat.atlas' });
        Assets.add({ alias: 'dog_splash_skel', src: 'assets/spines/splash/dog_splash/splash_screen_dog.skel' });
        Assets.add({ alias: 'dog_splash_atlas', src: 'assets/spines/splash/dog_splash/splash_screen_dog.atlas' });
        Assets.add({ alias: 'title_skel', src: 'assets/spines/title/title_art.skel' });
        Assets.add({ alias: 'title_atlas', src: 'assets/spines/title/title_art.atlas' });
        Assets.add({ alias: 'dog_skel', src: 'assets/spines/dog/dog.skel' });
        Assets.add({ alias: 'dog_atlas', src: 'assets/spines/dog/dog.atlas' });
        Assets.add({ alias: 'cat_skel', src: 'assets/spines/cat/cat.skel' });
        Assets.add({ alias: 'cat_atlas', src: 'assets/spines/cat/cat.atlas' });
        Assets.add({ alias: 'splash_bg', src: 'assets/images/bg/splash.jpg' });
        Assets.add({ alias: 'english', src: 'assets/images/bg/english.jpg' });
        Assets.add({ alias: 'canadian', src: 'assets/images/bg/canadian.jpg' });
        Assets.add({ alias: 'international', src: 'assets/images/bg/international.jpg' });
        Assets.add({ alias: 'mode_0', src: 'assets/images/bg/mode_0.jpg' });
        Assets.add({ alias: 'mode_2', src: 'assets/images/bg/mode_2.jpg' });
        Assets.add({ alias: 'mode_1', src: 'assets/images/bg/mode_1.png' });
        Assets.add({ alias: 'match_screen', src: 'assets/images/bg/match_screen.jpg' });
        Assets.add({ alias: 'pfp_data', src: 'assets/images/atlas/pfp_data.json' });
        Assets.add({ alias: 'player_data', src: 'assets/json/player_data.json' });
        Assets.add({ alias: 'bot_data', src: 'assets/json/bot_data.json' });
        Assets.add({ alias: 'game_data', src: 'assets/images/atlas/game_data.json' })
        Assets.add({ alias: 'overlay', src: 'assets/images/overlay.png' });
        Assets.add({ alias: 'ray_overlay', src: 'assets/images/ray_overlay.png' });
        Assets.add({ alias: 'rules_base', src: 'assets/images/base/rules_base.png' });
        Assets.add({ alias: 'board', src: 'assets/images/board.png' });
        Assets.add({ alias: 'texture_data', src: 'assets/images/texture.json' });
        Assets.add({ alias: 'hl_layer_0', src: 'assets/images/highlight_layer_0.png' });
        Assets.add({ alias: 'hl_layer_1', src: 'assets/images/highlight_layer_1.png' });
        Assets.add({ alias: 'move_layer', src: 'assets/images/move_layer.png' });
        Assets.add({ alias: 'ad_icon', src: 'assets/images/ad_icon.png' });


        PIXI.Assets.load(['cat_splash_skel', 'cat_splash_atlas', 'dog_splash_skel', 'dog_splash_atlas', 'title_skel', 'title_atlas', 'dog_skel', 'dog_atlas', 'cat_skel', 'cat_atlas', 'splash_bg', 'tile_0', 'tile_1', 'board', 'game_base', 'player_data', 'hl_layer_0', 'hl_layer_1', 'move_layer', 'overlay', 'ray_overlay', 'pfp_base', 'ad_icon', 'texture_data', 'ui_data', 'english', 'canadian', 'international', 'match_screen', 'bot_data', 'pfp_data', 'game_data', 'mode_0', 'mode_1', 'mode_2', 'rules_base'], (progress) => {
            this.setProgress(progress);
        }).then(() => {
            console.log("jaaadooooooooo");

            AudioManager.CreateAudio();
            Constant.pfpAtlas = Assets.get('pfp_data');
            PlayzhubEventHandler.GameLoadingCompleted();
            new TitleScreen();
        });
    }

    setProgress(progress) {
        this.progressBar.progress = Math.floor(progress * 100);
        this.loadingTxt.text = `LOADING: ${Math.round(progress * 100)}%`;
        // progressText.text = `${progressBar.progress}%`
        // progressText.x = progressBar.width / 2 - progressText.width / 2
        if (Number(progress) === 1) {
            GameAnalytics.addProgressionEvent(
                "Complete",
                "game_loading"
            );
            Constant.game.app.stage.removeChild(this.pBottomPanelContainer);
            Constant.game.app.stage.removeChild(this.topPanelContainer);
        }
    }

    resizeTopPanelContainer() {
        this.topPanelContainer.x = Constant.game.app.screen.width / 2;
        this.topPanelContainer.y = 0;
        this.topPanelContainer.scale.set(Constant.newScale);
    }

    resizeBottomPanelContainer() {
        this.pBottomPanelContainer.x = Constant.game.app.screen.width / 2;
        this.pBottomPanelContainer.y = Constant.game.app.screen.height - 115 * Constant.newScale;
        this.pBottomPanelContainer.scale.set(Constant.newScale);
    }

    OnResize() {
        if (Constant.currentScreen !== 'LoadScreen')
            return;

        // console.log("LoadScreen UI", this, this.bg);

        let scale = Math.min(Constant.game.app.screen.width / 1080, Constant.game.app.screen.height / 1920);
        Constant.newScale = scale;

        // if (this.bg)
        this.resizeTopPanelContainer();
        this.resizeBottomPanelContainer();
        // const originalScaleX = sprite.scale.x;
        // const originalScaleY = sprite.scale.y;
        // Center the sprite on the screen

        // this.titleUIContainer.x = Constant.game.app.screen.width / 2;
        // this.titleUIContainer.y = Constant.game.app.screen.height / 2;
        // this.titleUIContainer.scale.set(Constant.newScale);
    }
}