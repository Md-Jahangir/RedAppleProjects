import { Constant } from "./Constant.js";
import Overlay from "./Overlay.js";
import Buttons from "./Buttons.js";
import GameScore from "./GameScore.js";
import Popup from "./popups/Popup.js";
import { Align } from "./util/align.js";
import { AudioManager } from "./AudioManager.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler.js";
import * as GA from "gameanalytics";

class GameUI {
    constructor(scene) {

        this.scene = scene;

        this.overlay = new Overlay(this.scene);
        this.buttons = new Buttons(this.scene);
        this.gameScore = new GameScore(this.scene);
        this.popup = new Popup(this.scene);

        this.TimedEvent = null;
        this.gameTimerTxt = null;
        this.gameTimedEvent = null;
        this.scoreBoard = null;
        this.stalk = null;
        this.stopwatch = null;
        this.gamePopUpScoreContainer = null;

    }

    CreateTimerUI() {

        let timeValueTextStyle = { fontFamily: 'GROBOLD', fontSize: '45px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: Constant.round(Constant.game.config.width - 100) } };

        this.timeValueText = this.scene.add.text(0, 0, "", timeValueTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor);
        Align.placeAt(2, 22, this.timeValueText);

        // this.CreateTimer();

    }

    CreateTimer() {

        this.TimedEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: this.UpdateTime,
            callbackScope: this,
            loop: true
        });
    }

    UpdateTime() {

        if (Constant.timeToEnd > 0) {
            Constant.timeToEnd--;
            // this.timeValueText.setText(Constant.timeToEnd);
            this.DisplayTimeFormat(Constant.timeToEnd);
        } else {
            if (getMobileOperatingSystem() == "Android") {
                // console.log("The score........................" + this.score.toString());
                sendMessage("The Game End..................................");
                sendMessage("0");
            }
            if (getMobileOperatingSystem() == "iOS") {
                let postdata = {
                    score: "0",
                };
                let postmessage = JSON.stringify(postdata);
                if (typeof window.webkit !== "undefined" && typeof window.webkit.messageHandlers !== "undefined") {
                    // Your code here
                } else {
                    console.log("iOS messageHandlers not available.");
                }
                window.webkit.messageHandlers.jsHandler.postMessage(postmessage);
                window.webkit.messageHandlers.jsHandler.postMessage("The Game End.............");
            }
            this.TimedEvent.remove();
        }

    }

    DisplayTimeFormat(_time) {

        let minutes = parseInt(_time / 60, 10);
        let seconds = parseInt(_time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        this.timeValueText.setText("Time Remaining : " + minutes + ":" + seconds);

    }

    CreateGameSceneTimer() {

        this.gameTimerTxt = this.scene.add.text(0, 0, this.FormatTime(Constant.timeToEnd), { fontFamily: 'GROBOLD', fontSize: 50, fill: '#FFFFFF', align: 'Center', lineSpacing: 10 }).setOrigin(0.5).setScale(Constant.scaleFactor);;
        this.scene.aGrid.placeAtIndex(31.2, this.gameTimerTxt);

        this.gameTimedEvent = this.scene.time.addEvent({ delay: 1000, paused: false, callback: this.UpdateGameTimer, callbackScope: this, loop: true });

    }

    FormatTime(seconds) {

        // Minutes
        let partInMinutes = Constant.round(seconds / 60);
        // Seconds
        let partInSeconds = seconds % 60;
        // Adds left zeros to minutes
        partInMinutes = partInMinutes.toString().padStart(2, '0');
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        // Returns formated time
        return `${partInMinutes}:${partInSeconds}`;

    }

    UpdateGameTimer() {

        if (Constant.timeToEnd > 0) {
            Constant.timeToEnd--;
            // this.timeValueText.setText(Constant.timeToEnd);
            // this.DisplayTimeFormat(timeToEnd);
            this.gameTimerTxt.setText(this.FormatTime(Constant.timeToEnd));
        } else {
            this.scene.GameOverOnTimerComplete();
        }

    }

    CreateGamePlayUI() {

        this.ShowControlOverlay();
        this.ShowButtons();
        this.CreateScoreBoardAndTimer();
        this.ShowGameScore();
        this.ShowGameTimer();

    }

    ShowControlOverlay() {

        this.overlay.CreateControlOverlay();

    }

    ShowButtons() {

        let sceneKey = this.scene;

        this.buttons.CreateGameSceneButtons();
        this.OnInteractionWithButtons(sceneKey);

    }

    OnInteractionWithButtons(_sceneKey) {

        this.buttons.backBtn.on('pointerup', () => {
            GA.GameAnalytics.addDesignEvent("ui:back_clicked");
            console.log('backBtn......');
            AudioManager.StopBGAudio();
            AudioManager.StopRunAudio();
            this.scene.ShowAd();

            this.scene.scene.pause();
            this.scene.scene.launch('PausedScene', { sceneKeyManager: _sceneKey, timer: this.gameTimedEvent });

        });

        if (localStorage.getItem("super_monkey_audio_on") == null) {
            localStorage.setItem("super_monkey_audio_on", 1);
        }
        if (localStorage.getItem("super_monkey_audio_on") == "1") {
            this.buttons.soundBtn.setFrame(0);
            AudioManager.PlayBGAudio();
            AudioManager.PlayRunAudio();
        }
        else {
            this.buttons.soundBtn.setFrame(1);
            AudioManager.StopBGAudio();
            AudioManager.StopRunAudio();
        }

        this.buttons.soundBtn.on('pointerup', () => {
            GA.GameAnalytics.addDesignEvent("ui:sound_clicked");
            if (localStorage.getItem("super_monkey_audio_on") == "1") {
                this.buttons.soundBtn.setFrame(1);
                localStorage.setItem("super_monkey_audio_on", 2);
                AudioManager.StopBGAudio();
                AudioManager.StopRunAudio();
            }
            else {
                this.buttons.soundBtn.setFrame(0);
                localStorage.setItem("super_monkey_audio_on", 1);
                AudioManager.PlayBGAudio();
                AudioManager.PlayRunAudio();
            }
        });

    }

    CreateScoreBoardAndTimer() {

        this.scoreBoard = this.scene.add.image(0, 0, 'score_board').setScale(Constant.scaleFactor);

        // this.stopwatch = this.scene.add.image(0, 0, 'clock').setScale(Constant.scaleFactor);

        this.scene.aGrid.placeAtIndex(28, this.scoreBoard);

        this.stalk = this.scene.add.image(Constant.round(Constant.game.config.width / 2.74), Constant.round(Constant.game.config.height / 13.17), 'stalk').setScale(Constant.scaleFactor).setVisible(false);

        // this.scene.aGrid.placeAtIndex(30, this.stopwatch);

    }

    ShowGameScore() {

        this.gameScore.CreateScore();

        this.gameScore.scoreTxt.copyPosition(this.scoreBoard);

    }

    ShowGameTimer() {

        // this.CreateGameSceneTimer();

    }

    CreateQuitUI() {

        this.popup.CreateQuitPopup();

    }

    CreateGameOverUI() {

        this.popup.CreateGameOverPopup();

        this.gamePopUpScoreContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactor);
        this.scene.aGrid.placeAtIndex(218, this.gamePopUpScoreContainer);

        let finalScore = this.scene.add.text(0, 30, this.gameScore.score, { fontFamily: 'GROBOLD', fontSize: 70, fill: '#e93d45', align: 'Center', lineSpacing: 10 }).setOrigin(0.5);

        this.gamePopUpScoreContainer.add(finalScore);

        this.OnInteractionWithPopupButtons();

    }

    OnInteractionWithPopupButtons() {

        this.buttons.menuBtn.on('pointerup', () => {
            GA.GameAnalytics.addDesignEvent("ui:menu_clicked");
            this.scene.scene.stop('GameScene');
            PlayzhubEventHandler.GamePlayStopped();
            this.scene.scene.start('TitleScene');

        });

        this.buttons.replayBtn.on('pointerup', () => {
            // this.scene.adHitFrom = 'reload';
            // this.scene.ShowAd();
            GA.GameAnalytics.addDesignEvent("ui:restart_clicked");
            setTimeout(() => {
                this.scene.scene.restart('GameScene');
            }, 200);

        });

    }
}

export default GameUI;