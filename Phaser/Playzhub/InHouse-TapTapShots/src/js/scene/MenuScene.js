import { PlayzhubEventHandler } from "../PlayzhubEventHandler";
import { Constant } from "../Constant";
import { Utils } from "../Utils";
import Button from "../class/Button";
import * as GA from "gameanalytics";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
        this.randomBasket = null;
        this.isTutorial = null;
    }
    create(isTutorial) {
        Constant.activeScene = 'menu';
        this.game.events.on("resize", this.resize, this);

        // console.log('Menu Scene-----');
        this.isTutorial = isTutorial;
        this.bg = this.add.image(0, 0, 'splash_bg').setOrigin(0);
        this.gameLogo = this.add.image(0, 0, 'game_logo');
        this.shadowOverlay = this.add.image(0, 0, 'shadow_overlay').setOrigin(0);
        this.playBut = new Button(this, 'menu_play-but', 0, 0, 1, 1);
        this.playBut.setClickcallback(this.PlayButtonFunc, this);
        // console.log(this.randomBasket, '--------------');

        if (window.innerWidth > window.innerHeight) {
            let clientHeight = window.innerHeight;
            let clientWidth = (clientHeight / 1.77777777778);
            this.resize(clientWidth, clientHeight, (window.innerWidth / 2) - (clientWidth / 2));
        }
        else {
            let clientWidth = window.innerWidth;
            let clientHeight = window.innerHeight;
            this.resize(clientWidth, clientHeight, 0);
        }

        GA.GameAnalytics.addDesignEvent("screen:title");
    }
    //Menu scene to Game scene jump Function
    PlayButtonFunc() {
        GA.GameAnalytics.addDesignEvent("ui:play_clicked");
        Constant.playClicked += 1;
        // Server.PostGameFrequencyToParent(Constant.playClicked);
        PlayzhubEventHandler.GamePlayStarted(Constant.playClicked);
        this.scene.stop('MenuScene');
        this.scene.start('GameScene', this.isTutorial);
    }

    resize(newWidth, newHeight, offsetWidth) {
        if (Constant.activeScene != 'menu') return;
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.bg.setDisplaySize(newWidth, newHeight);
        this.gameLogo.setScale(newScale);
        this.gameLogo.setPosition(newWidth / 2, 300 * newScale);
        this.shadowOverlay.setDisplaySize(newWidth, newHeight);
        this.playBut.SetScale(newScale);
        this.playBut.SetPosition(newWidth / 2, newHeight - (220 * newScale));

        const camera = this.cameras.main;
        camera.x = offsetWidth;
        camera.setViewport(offsetWidth, 0, newWidth, newHeight);

    }
} 