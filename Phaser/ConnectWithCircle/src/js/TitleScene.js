
import { Constant } from "./Constant.js";
import GameUI from "./GameUI.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler.js";
import { Server } from "./Server.js";
import * as GA from "gameanalytics";
export default class TitleScene extends Phaser.Scene {

    constructor() {

        super("TitleScene");

    }

    init() {

        this.gameUI = new GameUI(this);
        this.menuOverlay = null
        this.playButton = null;
    }

    create() {

        this.CreateMenuPage();
        this.ShowTimer();
        // PlayzhubEventHandler.AdStarted(this.PauseGame.bind(this));
        // PlayzhubEventHandler.AdCompleted(this.ResumeGame.bind(this));
        GA.GameAnalytics.addDesignEvent("screen:title");
    }
    // PauseGame() {
    //     console.log(' Paused Game ');
    //     PlayzhubEventHandler.GamePlayPaused();
    // }

    // ResumeGame() {
    //     console.log(' Resume Game ');
    //     PlayzhubEventHandler.GamePlayResumed();
    // }

    ShowTimer() {

        // this.gameUI.CreateTimerUI();

    }



    CreateMenuPage() {
        this.menubuttonClickSound = this.sound.add('button_click_sound');
        this.menuOverlay = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'loading_bg').setScale(Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5, 0.5);
        // this.menuOverlay.setInteractive({ useHandCursor: true });
        // this.menuOverlay.on('pointerDown', this.MenuOverlayPressed, this);
        // this.menuOverlay.on('pointerUp', this.MenuOverlayReleased, this);
        this.menulogo = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2 - (Constant.game.config.height / 9), 'title').setScale(Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5, 0.5);

        this.playButton = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2 + (Constant.game.config.height / 6), 'play_button').setScale(Constant.scaleFactorX, Constant.scaleFactorY).setOrigin(0.5, 0.5);
        this.playButton.setInteractive({ useHandCursor: true });
        this.playButton.on('pointerdown', () => {
            Constant.playClicked += 1;
            // Server.PostGameFrequencyToParent(Constant.playClicked);
            // PlayzhubEventHandler.
            this.PlayButtonPressed();
        });
        this.playButton.on('pointerup', () => {
            this.PlayButtonReleased();
        });
    }
    MenuOverlayPressed() {
        // this.menubuttonClickSound.play();
    }
    MenuOverlayReleased() {
        this.menubuttonClickSound.play();
    }

    PlayButtonPressed() {
        GA.GameAnalytics.addDesignEvent("ui:play_clicked");
        this.menubuttonClickSound.play();
        // this.tweens.add({
        //     targets: [this.menuOverlay, this.playButton],
        //     duration: 600,
        //     ease: 'Linear',
        //     scaleX: 0.2,
        //     scaleY: 0.2,
        //     alpha: 0,
        //     onComplete: () => {
        //         this.tweens.add({
        //             targets: [this.menulogo, this.playButton],
        //             duration: 400,
        //             ease: 'Linear',
        //             scaleX: 0.02,
        //             scaleY: 0.02,
        //             alpha: 0,
        //             onComplete: () => {
        //                 this.menuOverlay.visible = false;
        //             },
        //             onCompleteScope: this
        //         })
        //     },
        //     onCompleteScope: this
        // })

    }
    PlayButtonReleased() {
        // StateTransition.TransitToInfo();
        this.tweens.add({
            targets: [this.menuOverlay, this.playButton, this.menulogo],
            duration: 500,
            ease: 'Linear',
            // scaleX: 0.2,
            // scaleY: 0.2,
            alpha: 0,
            onComplete: () => {
                // this.tweens.add({
                //     targets: [this.menulogo, this.playButton],
                //     delay: 500,
                //     duration: 400,
                //     ease: 'Linear',
                //     scaleX: 0.02,
                //     scaleY: 0.02,
                //     alpha: 0,
                //     onComplete: () => {
                //         this.menuOverlay.visible = false;
                //         this.scene.start('TutorialScene');
                //     },
                //     onCompleteScope: this
                // })
                this.menuOverlay.visible = false;
                this.scene.start('TutorialScene');
            },
            onCompleteScope: this
        })
        // this.scene.start('TutorialScene');
    }

    EnableDisableMenuPageButtonInput(_status) {
        // this.menuOverlay.visible = _status;
    }


}