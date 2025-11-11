import { Align } from "./util/align.js";
import { AlignGrid } from "./util/alignGrid.js";
import { Constant } from "./Constant.js";
import { AudioManager } from "./AudioManager.js";
import GameUI from "./GameUI.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler.js";
import * as GA from "gameanalytics";

export default class GameTutorialScene extends Phaser.Scene {
    constructor() {
        super('GameTutorialScene');
    }
    init() {

        this.gameUI = new GameUI(this);

        this.nextBtnCounter = 0;

    }
    create() {
        PlayzhubEventHandler.AdStarted(this.OnStartingAd.bind(this));
        PlayzhubEventHandler.AdCompleted(this.OnAdCompleted.bind(this));
        this.AddAlignGrid();
        this.CreateTutorialPages();
    }

    OnStartingAd() {
        PlayzhubEventHandler.GamePlayPaused();
    }

    OnAdCompleted() {
        PlayzhubEventHandler.GamePlayResumed();
    }

    AddAlignGrid() {

        this.aGrid = new AlignGrid({
            scene: this,
            rows: 19,
            cols: 19
        });
        // this.aGrid.showNumbers();
    }

    ShowTimer() {

        this.gameUI.CreateTimerUI();

    }

    CreateTutorialPages() {

        let infoBg = this.add.image(0, 0, 'info_bg').setScale(Constant.scaleFactor);

        // if (Constant.game.device.os.iPad) {
        //     infoBg.setScale(Constant.scaleFactorY);
        // }

        Align.center(infoBg);

        let infoFog = this.add.image(0, 0, 'info_fog').setScale(1920 * Constant.scaleFactorX);
        Align.center(infoFog);

        this.ShowTutorialOverlay();

        this.ShowButtons();

        this.ShowTimer();

        this.events.on('change_overlays', this.ChangeOverlays, this);

    }

    ShowTutorialOverlay() {

        this.gameUI.overlay.CreateTutorialOverlays();

    }

    ShowButtons() {

        this.gameUI.buttons.CreateTutorialButtons();

        this.ButtonsOnClick();

    }

    ButtonsOnClick() {

        this.gameUI.buttons.nxtBtn.on('pointerup', () => {

            if (this.gameUI.buttons.nxtBtn.texture.key == "next_btn") {
                GA.GameAnalytics.addDesignEvent("ui:tutorial_next_clicked");
                this.nextBtnCounter++;
            }

            else {
                this.scene.stop('GameTutorialScene');
                this.scene.start('GameScene');
                this.StartGameBgAudio();
            }

            this.events.emit('change_overlays', this.nextBtnCounter);

        });

        this.gameUI.buttons.prevBtn.on('pointerup', () => {

            if (this.gameUI.buttons.prevBtn.texture.key == "prev_btn") {
                GA.GameAnalytics.addDesignEvent("ui:tutorial_previous_clicked");

                this.nextBtnCounter--;
            }

            else {
                GA.GameAnalytics.addDesignEvent("ui:tutorial_skip_clicked");
                this.scene.stop('GameTutorialScene');
                this.scene.start('GameScene');
            }

            this.events.emit('change_overlays', this.nextBtnCounter);
        });

    }

    StartGameBgAudio() {

        AudioManager.PlayBGAudio();

    }

    ChangeOverlays(_counter) {

        switch (_counter) {

            case 0: this.gameUI.overlay.content.setTexture('content_0');
                this.aGrid.placeAtIndex(199, this.gameUI.overlay.content);
                this.gameUI.overlay.firstDot.setTexture('focused');
                this.gameUI.overlay.secondDot.setTexture('absent');
                this.gameUI.overlay.thirdDot.setTexture('absent');
                this.gameUI.buttons.prevBtn.setTexture('skip');

                break;

            case 1: this.gameUI.overlay.content.setTexture('content_1');
                this.aGrid.placeAtIndex(219, this.gameUI.overlay.content);
                this.gameUI.overlay.firstDot.setTexture('absent');
                this.gameUI.overlay.secondDot.setTexture('focused');
                this.gameUI.overlay.thirdDot.setTexture('absent');
                this.gameUI.buttons.prevBtn.setTexture('prev_btn');
                this.gameUI.buttons.nxtBtn.setTexture('next_btn');

                break;

            case 2: this.gameUI.overlay.content.setTexture('content_2');
                this.gameUI.overlay.content.setOrigin(0.5, 0.6);
                this.aGrid.placeAtIndex(141, this.gameUI.overlay.content);
                this.gameUI.overlay.firstDot.setTexture('absent');
                this.gameUI.overlay.secondDot.setTexture('absent');
                this.gameUI.overlay.thirdDot.setTexture('focused');
                this.gameUI.buttons.prevBtn.setTexture('prev_btn');
                this.gameUI.buttons.nxtBtn.setTexture('play_button');

                break;

        }

    }

}