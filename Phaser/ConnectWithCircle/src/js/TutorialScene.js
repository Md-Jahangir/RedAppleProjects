import { Constant } from "./Constant.js";
import GameUI from "./GameUI.js";
import * as GA from "gameanalytics";

export default class TutorialScene extends Phaser.Scene {

    constructor() {
        super("TutorialScene");
    }

    init() {

        this.gameUI = new GameUI(this);

    }

    create() {
        this.CreateInfoPage();
        this.CreateLifeInfoPage();
        this.SwitchPage();
        this.ShowInfoPage();
        this.ShowTimer();
    }

    ShowTimer() {

        // this.gameUI.CreateTimerUI();

    }
    CreateInfoPage() {
        this.infoShadow = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'info').setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setOrigin(0.5, 0.5).setVisible(false);

        // Constant.gameTimer = this.time.addEvent({
        //     delay: 1000, // Set the duration of the timer
        //     callback: this.TimerCallback, // Function to call when the timer completes
        //     callbackScope: this, // Scope of the callback function (the current scene)
        //     loop: true // Don't repeat the timer
        // });
        this.next = this.add.image(Constant.game.config.width / 2 + (Constant.game.config.width / 3), Constant.game.config.height - (Constant.game.config.height / 10), 'next').setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setOrigin(0.5, 0.5).setVisible(false);
        this.next.setInteractive({ useHandCursor: true });
        this.dot1 = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 1.05, 'dot1').setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setOrigin(0.5, 0.5).setVisible(false);

        if (localStorage.getItem('sound_status') == null) {
            localStorage.setItem('sound_status', 1);
        } else {
            localStorage.setItem("sound_status", 0);
        }
        // this.infoShadow.on('pointerdown', () => {
        //     this.InfoPressed();
        // });
        // this.infoShadow.on('pointerup', () => {
        //     this.InfoReleased();
        // });

    }
    CreateLifeInfoPage() {
        this.lifeInstruction = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'info2').setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setOrigin(0.5, 0.5).setVisible(false);
        this.back = this.add.image(Constant.game.config.width / 2 - (Constant.game.config.width / 3), Constant.game.config.height - (Constant.game.config.height / 10), 'backInfo').setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setOrigin(0.5, 0.5).setVisible(false);
        this.back.setInteractive({ useHandCursor: true });
        this.play = this.add.image(Constant.game.config.width / 2 + (Constant.game.config.width / 3), Constant.game.config.height - (Constant.game.config.height / 10), 'play').setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setOrigin(0.5, 0.5).setVisible(false);
        this.play.setInteractive({ useHandCursor: true });
        this.dot2 = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 1.05, 'dot2').setScale(1 * Constant.scaleFactorX, 1 * Constant.scaleFactorY).setOrigin(0.5, 0.5).setVisible(false);
    }

    InfoPressed() {

    }
    InfoReleased() {
        this.tweens.add({
            targets: [this.infoShadow],
            duration: 600,
            ease: 'Linear',
            alpha: 0,
            onComplete: () => {
                this.scene.start('GameScene');
            },
            onCompleteScope: this
        })

    }
    SwitchPage() {
        this.next.on('pointerdown', this.NextButtonPressed, this);
        this.next.on('pointerup', this.NextButtonReleased, this);

        this.back.on('pointerdown', this.BackButtonPressed, this);
        this.back.on('pointerup', this.BackButtonReleased, this);

        this.play.on('pointerdown', this.PlayButtonPressed, this);
        this.play.on('pointerup', this.PlayButtonReleased, this);
    }

    NextButtonPressed() {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_next_clicked");
    }

    NextButtonReleased() {
        this.lifeInstruction.setAlpha(1);
        this.back.setAlpha(1);
        this.play.setAlpha(1);
        this.tweens.add({
            targets: [this.infoShadow, this.next],
            duration: 600,
            ease: 'Linear',
            alpha: 0,
            onComplete: () => {
                this.HideInfoPage();
                this.ShowLifePage();
            },
            onCompleteScope: this
        })
    }

    BackButtonPressed() {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_back_clicked");

    }
    BackButtonReleased() {
        // this.ShowInfoPage();
        this.infoShadow.setAlpha(1);
        this.next.setAlpha(1);
        this.tweens.add({
            targets: [this.lifeInstruction, this.back, this.play],
            duration: 600,
            ease: 'Linear',
            alpha: 0,
            onComplete: () => {
                // this.HideLifePage();
                this.ShowInfoPage();
            },
            onCompleteScope: this
        })
    }

    PlayButtonPressed() {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_play_clicked");

    }
    PlayButtonReleased() {

        this.tweens.add({
            targets: [this.lifeInstruction, this.back, this.play, this.next, this.infoShadow],
            duration: 600,
            ease: 'Linear',
            alpha: 0,
            onComplete: () => {
                this.HideInfoPage();
                this.HideLifePage();
                this.scene.start('GameScene', { remainingTime: Constant.initialTime });
            },
            onCompleteScope: this
        })
    }

    ShowLifePage() {
        this.dot1.setVisible(false);
        this.dot2.setVisible(true);
        this.lifeInstruction.setVisible(true);
        this.back.setVisible(true);
        this.play.setVisible(true);
    }
    HideLifePage() {
        this.lifeInstruction.setVisible(false);
        this.back.setVisible(false);
        this.play.setVisible(false);
    }

    ShowInfoPage() {
        this.dot1.setVisible(true);
        this.dot2.setVisible(false);
        this.infoShadow.setVisible(true);
        this.next.setVisible(true);
    }

    HideInfoPage() {
        this.infoShadow.setVisible(false);
        this.next.setVisible(false);
    }
    TimerCallback() {
        Constant.initialTime -= 1; // Decrease the current time by 1 second
        if (Constant.initialTime < 0) {
            Constant.initialTime = 0;
        }
        // const hours = (Constant.initialTime / 3600);
        // const minutes = Math.floor((Constant.initialTime % 3600) / 60);
        // const hoursString = hours.toString().padStart(2, '0');
        // const minutesString = minutes.toString().padStart(2, '0');
        // Constant.gameTimerText.setText(Constant.initialTime);
        if (Constant.initialTime <= 0) {
        }
    }
}