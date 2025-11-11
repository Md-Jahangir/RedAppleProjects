import { Constant } from "./Constant.js";
import { SoundManeger } from "./SoundManeger.js";
import { Server } from "./Server.js";
export default class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene")
        this.playButton = null;
        this.thumbnailContainer = null;
        this.thymbnailPlayerAnimation = null;
    }
    init() {
    }
    preload() { }
    create() {
        let overlay = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'Play_Page').setOrigin(0.5).setScale(Constant.scaleFactorX * 1, Constant.scaleFactorY * 1);
        overlay.setInteractive();
        overlay.on("pointerdown", this.OnClickOverlay, this);
        overlay.on("pointerup", this.OnReleaseOverlay, this);
        this.playButton = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 1.2, 'Play').setOrigin(0.5);
        this.playButton.setInteractive({ useHandCursor: true });
        this.playButton.on('pointerdown', this.OnPlayButtonPressed, this);
        this.playButton.on('pointerup', this.OnPlayButtonReleased, this);

        // this.thymbnailPlayerAnimation = this.add.spine(Constant.game.config.width / 2, Constant.game.config.height / 1.7, "norm_monkey").
        //     setScale(Constant.scaleFactorX * 0.3, Constant.scaleFactorY * 0.3);
        // this.thymbnailPlayerAnimation.play("Left_Side_Jumpnew", true); 
        this.CreateRollinEffectsForBlades();

        // let timeValueTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '45px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: Math.round(Constant.game.config.width - 100) } };
        // this.timeValueText = this.add.text(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1.04), "", timeValueTextStyle).setOrigin(0.5, 0.5);
        // this.CreateTimer();

    }

    CreateTimer() {
        this.TimedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.UpdateTime,
            callbackScope: this,
            loop: true
        });
    };
    UpdateTime() {
        if (Constant.timeToEnd > 0) {
            Constant.timeToEnd--;
            this.DisplayTimeFormat(Constant.timeToEnd);
        } else {
            this.TimedEvent.remove();
            this.CallTheScoreSendAPI();
        }
    };
    DisplayTimeFormat(_time) {
        let minutes = parseInt(_time / 60, 10);
        let seconds = parseInt(_time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        this.timeValueText.setText("Time Remain : " + minutes + ":" + seconds);
    }

    CallTheScoreSendAPI() {
        if (getMobileOperatingSystem() == "Android") {
            console.log("The score........................" + this.score.toString());
            sendMessage("The Game End..................................");
            sendMessage("0");
        } else if (getMobileOperatingSystem() == "iOS") {
            var postdata = {
                score: "0",
            };
            var postmessage = JSON.stringify(postdata);
            window.webkit.messageHandlers.jsHandler.postMessage(postmessage);
            window.webkit.messageHandlers.jsHandler.postMessage("The Game End.............");
        }
        else {
            this.TimedEvent.remove();
            Constant.timeToEnd = Server.timerValue;
        }
        SoundManeger.StopBgMusic();
    };

    CreateRollinEffectsForBlades() {
        this.thumbnailContainer = this.add.container(0, 0);
        let Base_Brunches = this.add.image(Math.floor(Constant.game.config.width / 2), Math.floor(Constant.game.config.height / 4.3636), "Base_Brunches").setOrigin(0.5).setScale(Constant.scaleFactorX * 0.8, Constant.scaleFactorY * 0.8);
        let cutterOne = this.add.image(Math.floor(Constant.game.config.width / 2), Math.floor(Constant.game.config.height / 6.4), "Cutter_2").setOrigin(0.5);
        let cutterTwo = this.add.image(Math.floor(Constant.game.config.width / 3.176), Math.floor(Constant.game.config.height / 3.2), "Cutter_1").setOrigin(0.5);
        let cutterThree = this.add.image(Math.floor(Constant.game.config.width / 1.44), Math.floor(Constant.game.config.height / 3.25423), "Cutter_1").setOrigin(0.5);
        let JumpItRightText = this.add.image(Math.floor(Constant.game.config.width / 2), Math.floor(Constant.game.config.height / 4.3636), "JUMP_IT_RIGHT_Letter").setOrigin(0.5).setScale(Constant.scaleFactorX * 0.8, Constant.scaleFactorY * 0.8);

        if (Constant.isMobile) {

        }
        else {
            cutterOne.setScale(Constant.scaleFactorX * 1.3, Constant.scaleFactorY * 1.3);
            cutterTwo.setScale(Constant.scaleFactorX * 1.2, Constant.scaleFactorY * 1.2);
        }

        this.thumbnailContainer.add([
            Base_Brunches,
            cutterOne,
            cutterTwo,
            cutterThree,
            JumpItRightText
        ]);
        // this.CreateTimer();
    }

    CreateTimer() {
        this.TimedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.UpdateTime,
            callbackScope: this,
            loop: true
        });
    };
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
                window.webkit.messageHandlers.jsHandler.postMessage(postmessage);
                window.webkit.messageHandlers.jsHandler.postMessage("The Game End.............");
            }
            this.TimedEvent.remove();
        }
    };
    DisplayTimeFormat(_time) {
        let minutes = parseInt(_time / 60, 10);
        let seconds = parseInt(_time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        this.timeValueText.setText("Time Remain : " + minutes + ":" + seconds);
    }
    OnClickOverlay() { };
    OnReleaseOverlay() { };
    OnPlayButtonPressed() {
        this.playButton.scaleX = 0.8;
        this.playButton.scaleY = 0.9;
    }
    OnPlayButtonReleased() {
        Constant.playClicked += 1;
        Server.PostGameFrequencyToParent(Constant.playClicked);
        this.playButton.setScale(1);
        Constant.game.scene.stop("MenuScene");
        Constant.game.scene.start("GameTutorialScene");
    }
    update() {
        this.thumbnailContainer.list[1].rotation -= 0.05;
        this.thumbnailContainer.list[2].rotation += 0.02;
        this.thumbnailContainer.list[3].rotation += 0.09;
    }
}