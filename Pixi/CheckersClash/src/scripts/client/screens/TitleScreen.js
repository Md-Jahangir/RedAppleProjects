import { Constant } from "../Constant.js";
import * as PIXI from 'pixi.js';
import { Sprite, Assets, Texture, Container, Text, TextStyle } from 'pixi.js';
import ButtonTween from "../game_objects/ButtonTween.js";
import MenuScreen from "./MenuScreen.js";
import { Logo } from "../game_objects/Logo.js";
import { Culler, Rectangle } from "pixi.js";
import { AudioManager } from "../media/Audiomanager.js";
import { GameAnalytics } from "gameanalytics";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { GameBg } from "../game_objects/GameBg.js";


export default class TitleScreen {
    constructor() {
        Constant.currentScreen = 'TitleScreen';

        // this.bg = bg;
        this.titleUIContainer = null;

        this.initTitleScreen();

        Constant.game.addListener('resize', this.OnResize.bind(this));
        this.OnResize();
    }

    initTitleScreen() {
        this.CreateTitleUI();
        GameAnalytics.addDesignEvent('screen:title');
    }

    CreateTitleUI() {
        GameBg.getSprite().anchor.set(0.5);
        Constant.game.app.stage.addChild(GameBg.getSprite());

        this.midPanelContainer = new Container();
        Constant.game.app.stage.addChild(this.midPanelContainer);

        const catSplashSpine = Spine.from({
            skeleton: 'cat_splash_skel',
            atlas: 'cat_splash_atlas'
        });
        catSplashSpine.state.clearTracks();
        catSplashSpine.position.set(280, -80)
        catSplashSpine.state.setAnimation(0, 'splash_page', true);

        const dogSplashSpine = Spine.from({
            skeleton: 'dog_splash_skel',
            atlas: 'dog_splash_atlas'
        });
        dogSplashSpine.state.clearTracks();
        dogSplashSpine.position.set(-250, 450)
        dogSplashSpine.state.setAnimation(0, 'splash_page', true);

        this.rayOverlay = Sprite.from('ray_overlay');
        this.rayOverlay.anchor.set(0.5);
        Constant.game.app.stage.addChild(this.rayOverlay);

        this.midPanelContainer.addChild(catSplashSpine, dogSplashSpine);

        this.titleUIContainer = new Container();
        Constant.game.app.stage.addChild(this.titleUIContainer);
        // Sprite.from(emojiData.textures[newTextureKey]).texture

        this.playBtn = Sprite.from(Constant.uiAtlas.textures['play']);
        this.playBtn.anchor.set(0.5);
        this.playBtn.eventMode = 'none';
        this.playBtn.cursor = 'pointer';
        this.playBtn.visible = false;
        this.playBtn.position.set(0, -250);

        this.topPanelContainer = new Container();
        Constant.game.app.stage.addChild(this.topPanelContainer);
        this.logo = Spine.from({
            skeleton: 'title_skel',
            atlas: 'title_atlas',
        });
        this.logo.position.set(0, 300);
        this.logo.state.clearTracks();
        this.logo.state.setAnimation(0, 'title_art', false);

        this.topPanelContainer.addChild(this.logo);

        this.titleUIContainer.addChild(this.playBtn);

        this.playBtn.on('pointerup', this.OnClickingPlayBtn, this);
        this.switchLogoAnim();
    }

    OnClickingPlayBtn() {
        GameAnalytics.addDesignEvent('ui:play_clicked');
        AudioManager.PlayBtnPressedSFX();
        this.btnTween = new ButtonTween(this, this.playBtn, null, 0.85, 0.85, this.SwitchScreen.bind(this));
    }

    switchLogoAnim() {
        this.logo.state.addListener({
            complete: (entry) => {
                if (entry.animation.name === 'title_art') {
                    console.log("china");

                    // After 'walk' completes, switch to 'idle' and loop it
                    this.logo.state.setAnimation(0, 'LOOP', true);
                    this.playBtn.visible = true;
                    this.playBtn.eventMode = 'static';
                }
            }
        });
    }

    SwitchScreen() {
        Constant.game.app.stage.removeChild(this.titleUIContainer, this.midPanelContainer, this.topPanelContainer, this.rayOverlay);
        new MenuScreen()
    }

    resizeOverlay() {
        this.rayOverlay.x = Constant.game.app.screen.width / 2;
        this.rayOverlay.y = Constant.game.app.screen.height / 2;
        if (Constant.game.app.screen.width > Constant.game.app.screen.height) {
            this.rayOverlay.width = 1080;
            this.rayOverlay.height = 1920;
            this.rayOverlay.scale.set(Constant.newScale)
        }
        else {
            this.rayOverlay.width = Constant.game.app.screen.width;
            this.rayOverlay.height = Constant.game.app.screen.height;
            // bg.scale.set(1, 1);
        }
    }

    resizeTopPanelContainer() {
        this.topPanelContainer.x = Constant.game.app.screen.width / 2;
        this.topPanelContainer.y = 0;
        this.topPanelContainer.scale.set(Constant.newScale);
    }

    resizeBg() {
        GameBg.resize();
    }

    OnResize() {
        this.resizeBg();
        if (Constant.currentScreen !== 'TitleScreen')
            return;

        let scale = Math.min(Constant.game.app.screen.width / 1080, Constant.game.app.screen.height / 1920);
        Constant.newScale = scale;

        this.resizeOverlay();

        this.midPanelContainer.x = Constant.game.app.screen.width / 2;
        this.midPanelContainer.y = Constant.game.app.screen.height / 2;
        this.midPanelContainer.scale.set(Constant.newScale);

        this.titleUIContainer.x = Constant.game.app.screen.width / 2;
        this.titleUIContainer.y = Constant.game.app.screen.height / 1;
        this.titleUIContainer.scale.set(Constant.newScale);

        this.resizeTopPanelContainer();
    }
}
