// import { Utils } from "./Utils.js";
// import { SoundManager } from "./SoundManager.js";
import { Align } from "./util/align.js";
import { AlignGrid } from "./util/alignGrid.js";
import { Constant } from "./Constant.js";
import GameUI from "./GameUI.js";
import { Server } from "./Server.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler.js";
import * as GA from "gameanalytics";

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
    }

    init() {

        this.gameUI = new GameUI(this);

    }

    create() {
        // PlayzhubEventHandler.AdStarted(this.OnStartingAd.bind(this));
        // PlayzhubEventHandler.AdCompleted(this.OnAdCompleted.bind(this));
        this.AddAlignGrid();
        this.CreateTitlePage();
        this.ShowTimer();
    }

    // OnStartingAd() {
    //     PlayzhubEventHandler.GamePlayPaused();
    // }

    // OnAdCompleted() {
    //     PlayzhubEventHandler.GamePlayResumed();
    // }

    AddAlignGrid() {

        this.aGrid = new AlignGrid({
            scene: this,
            rows: 19,
            cols: 19
        });
        // this.aGrid.showNumbers();
    }

    ShowTimer() {

        // this.gameUI.CreateTimerUI();

    }

    CreateTitlePage() {

        let titleBg = this.add.image(0, 0, 'loading_Bg').setScale(Constant.scaleFactor);
        Align.center(titleBg);

        this.ShowTitleButtons();

        this.ButtonsOnClick();

    }

    ShowTitleButtons() {

        this.gameUI.buttons.CreateTitleButtons();

    }

    ButtonsOnClick() {

        this.gameUI.buttons.playBtn.on('pointerup', () => {
            GA.GameAnalytics.addDesignEvent("ui:play_clicked");
            Constant.playClicked += 1;
            PlayzhubEventHandler.GamePlayStarted(Constant.playClicked);
            this.scene.stop('TitleScene');
            this.scene.start('GameTutorialScene');
        });

    }

    // CreateTimer() {
    //     this.TimedEvent = this.time.addEvent({
    //         delay: 1000,
    //         callback: this.UpdateTime,
    //         callbackScope: this,
    //         loop: true
    //     });
    // };
    // UpdateTime() {
    //     if (Constant.Constant.timeToEnd > 0) {
    //         Constant.timeToEnd--;
    //         // this.timeValueText.setText(Constant.timeToEnd);
    //         this.DisplayTimeFormat(Constant.timeToEnd);
    //     } else {
    //         if (getMobileOperatingSystem() == "Android") {
    //             // console.log("The score........................" + this.score.toString());
    //             sendMessage("The Game End..................................");
    //             sendMessage("0");
    //         }
    //         if (getMobileOperatingSystem() == "iOS") {
    //             let postdata = {
    //                 score: "0",
    //             };
    //             let postmessage = JSON.stringify(postdata);
    //             window.webkit.messageHandlers.jsHandler.postMessage(postmessage);
    //             window.webkit.messageHandlers.jsHandler.postMessage("The Game End.............");
    //         }
    //         this.TimedEvent.remove();
    //     }
    // };
    // DisplayTimeFormat(_time) {
    //     let minutes = parseInt(_time / 60, 10);
    //     let seconds = parseInt(_time % 60, 10);

    //     minutes = minutes < 10 ? "0" + minutes : minutes;
    //     seconds = seconds < 10 ? "0" + seconds : seconds;
    //     this.timeValueText.setText("Time Remain : " + minutes + ":" + seconds);
    // }

    // ShowCharacter() {
    //     this.tweens.add({
    //         targets: [this.menuCharacterContainer],
    //         x: 0,
    //         ease: 'Bounce.Out',
    //         duration: 300,
    //         delay: 100,
    //         callbackScope: this,
    //         onComplete: function (tween) {
    //             this.ShowTitle();
    //         }
    //     });
    // }

    // ShowTitle() {
    //     this.tweens.add({
    //         targets: [this.title],
    //         x: Math.round(Constant.game.config.width / 2),
    //         y: Math.round(Constant.game.config.height / 4.5),
    //         scaleX: Constant.scaleFactor * 0.8,
    //         scaleY: Constant.scaleFactor * 0.8,
    //         ease: 'Back.easeInOut',
    //         duration: 500,
    //         callbackScope: this,
    //         onComplete: function (tween) {
    //             this.character.play("throw_knife");
    //             this.character.on('animationcomplete', this.onCompleteCharacterAnimation);
    //         }
    //     });
    // }
    // onCompleteCharacterAnimation(_this, y, z) {
    //     this.scene.ThrowCharacterKnife();
    // }

    // ThrowCharacterKnife() {
    //     this.characterKnife.setVisible(true);
    //     this.tweens.add({
    //         targets: [this.characterKnife],
    //         y: -Math.round(Constant.game.config.height / 10),
    //         rotation: 15,
    //         ease: 'Sine.easeInOut',
    //         duration: 800,
    //         callbackScope: this,
    //         onComplete: function (tween) {
    //             this.ShowTitleKnife();
    //         }
    //     });
    // }

    // ShowTitleKnife() {
    //     this.tweens.add({
    //         targets: [this.titleKnife],
    //         y: Math.round(Constant.game.config.height / 5.7),
    //         ease: 'Back.easeInOut',
    //         duration: 400,
    //         callbackScope: this,
    //         onComplete: function (tween) {

    //         }
    //     });
    //     setTimeout(() => {
    //         this.JerkTheTitle();
    //     }, 230);
    // }

    // JerkTheTitle() {
    //     this.tweens.add({
    //         targets: [this.title],
    //         y: this.title.y + 20,
    //         ease: 'Back.easeIn',
    //         duration: 150,
    //         yoyo: true,
    //         callbackScope: this,
    //         onComplete: function (tween) {
    //             this.ShowPlayButton();
    //         }
    //     });
    // }

    // ShowPlayButton() {
    //     this.tweens.add({
    //         targets: [this.playButton],
    //         y: Math.round(Constant.game.config.height / 1.14),
    //         alpha: 1,
    //         ease: 'Back.easeInOut',
    //         duration: 800,
    //         callbackScope: this,
    //         onComplete: function (tween) { }
    //     });
    // }

    // PlayButtonPressed() {
    //     Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.playButton, Constant.scaleFactor);
    //     Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.playText, Constant.scaleFactor);
    //     SoundManager.PlayButtonClickSound();
    // }
    // PlayButtonReleased() {
    //     setTimeout(() => {
    //         Constant.game.scene.stop('TitleScene');
    //         Constant.game.scene.start('GameScene');
    //     }, 100);
    // }

}