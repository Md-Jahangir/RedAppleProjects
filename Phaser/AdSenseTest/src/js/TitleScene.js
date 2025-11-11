import { Utils } from "./Utils.js";
import { SoundManager } from "./SoundManager.js";
import { Constant } from "./Constant.js";
import { Server } from "./Server.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler.js";

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
        this.menuContainerX = 0;
        this.scaleBeforeResize = 0;
        this.characterX = 0;
        this.characterY = 0;
        this.titleX = 200;
        this.titleY = 450;
        this.titleKnifeX = 50;
        this.titleKnifeY = 2000;
        this.finalKnifeX = 0;
        this.finalKnifeY = 600;
        this.playButtonX = 0;
        this.playButtonY = 620;
        this.titleKnifePos = { x: 0, y: -100 };
        this.titlePos = { x: 0, y: 0 };
        this.characterPos = { x: 650, y: 625 };
        this.characterKnifePos = { x: 190, y: 850 };
        this.hasAnime = false;
        this.titleScale = 0.1;
    }

    create() {

        // ima.init('https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&impl=s&gdfp_req=1&env=vp&output=vast');


        PlayzhubEventHandler.AdCompleted(this.PauseGame.bind(this));
        PlayzhubEventHandler.AdStarted(this.ResumeGame.bind(this));
        // window.addEventListener("message", (event) => {
        //     if (event.data.eventName == "update-game-state") {
        //         console.log("runtime.objects.GameData", event.data.data)
        //     }
        //     else
        //         console.log("Not found the event ")
        // })
        // window.postMessage('game-ready');
        Constant.activeScene = 'title';
        this.game.events.on("resize", this.resize, this);

        this.menuBg = this.add.image(0, 0, "splash_bg").setOrigin(0);

        // this.titleKnife = Utils.SpriteSettingsControl(this, Math.round(Constant.game.config.width / 2.06), -Math.round(Constant.game.config.height / 6.3), "title_knife", 0.5, 0.5, Constant.scaleFactor, Constant.scaleFactor);
        this.titleKnife = this.add.image(0, 0, "title_knife").setOrigin(0.5, 1);
        this.titleKnife.setAlpha(0);

        // this.title = Utils.SpriteSettingsControl(this, Math.round(Constant.game.config.width / 2.9), Math.round(Constant.game.config.height / 1.8), "title", 0.5, 0.5, Constant.scaleFactor, Constant.scaleFactor);
        // this.title.setScale(0, 0);
        this.title = this.add.image(0, 0, "title").setOrigin(0.5);
        this.title.setAlpha(0);
        this.characterGlow = this.add.image(0, 0, "character_glow").setOrigin(0.5);
        // this.menuCharacterContainer = this.add.container(0, 0);

        // this.characterShadow = Utils.SpriteSettingsControl(this, Math.round(Constant.game.config.width / 2.45), Math.round(Constant.game.config.height / 1.27), "character_shadow", 0.5, 0.5, Constant.scaleFactor, Constant.scaleFactor);
        this.characterShadow = this.add.image(0, 0, "character_shadow").setOrigin(0.5);

        // this.character = this.add.sprite(Math.round(Constant.game.config.width / 2.5), Math.round(Constant.game.config.height / 1.55), "menu_character").setScale(Constant.scaleFactor, Constant.scaleFactor).setOrigin(0.5, 0.5);
        this.character = this.add.sprite(0, 0, "menu_character").setOrigin(0.5);
        this.anims.create({
            key: "throw_knife",
            frameRate: 30,
            frames: this.anims.generateFrameNumbers("menu_character", { start: 0, end: 12 }),
        });

        // this.characterKnife = Utils.SpriteSettingsControl(this, Math.round(Constant.game.config.width / 3.18), Math.round(Constant.game.config.height / 1.88), "menu_character_knife", 0.5, 0.5, Constant.scaleFactor, Constant.scaleFactor);
        // this.characterKnife.setVisible(false);
        this.characterKnife = this.add.image(0, 0, "menu_character_knife").setOrigin(0.5);
        this.characterKnife.setAlpha(0);
        // this.menuCharacterContainer.add(this.characterShadow);
        // this.menuCharacterContainer.add(this.character);
        // this.menuCharacterContainer.add(this.characterKnife);

        // this.menuCharacterContainer.add([this.characterShadow, this.character, this.characterKnife]);



        // this.playButton = Utils.SpriteSettingsControl(this, Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 4), "play_button", 0.5, 0.5, Constant.scaleFactor, Constant.scaleFactor, "true", this.PlayButtonPressed, this.PlayButtonReleased);
        this.playButton = this.add.image(0, 0, "play_button").setOrigin(0.5);
        this.playButton.setAlpha(0);
        this.playButton.setInteractive({ useHandCursor: true });
        this.playButton.on('pointerdown', this.PlayButtonPressed, this);
        this.playButton.on('pointerup', this.PlayButtonReleased, this);

        let timeRemainTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '45px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: Math.round(Constant.game.config.width - 100) } };
        // this.timeRemainText = this.add.text(0, 0, "Time Remain : ", timeRemainTextStyle).setOrigin(0.5);

        let timeValueTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '45px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: Math.round(Constant.game.config.width - 100) } };
        // this.timeValueText = this.add.text(0, 0, "", timeValueTextStyle).setOrigin(0.5);

        if (Constant.timeToEnd != 0) {
            // this.CreateTimer();
        } else { }
        if (window.innerWidth >= (window.innerHeight / 1.7777777)) {
            let clientHeight = window.innerHeight;
            let clientWidth = (clientHeight / 1.77777777778);
            // this.playButtonX = clientWidth / 2;
            this.playButtonY = clientHeight / 2;
            this.resize(clientWidth, clientHeight, (window.innerWidth / 2) - (clientWidth / 2));
        }
        else {
            let clientWidth = window.innerWidth;
            let clientHeight = window.innerHeight;
            // this.playButtonX = clientWidth / 2;
            this.playButtonY = clientHeight / 2;
            this.resize(clientWidth, clientHeight, 0);
        }
        this.ShowCharacter();
    };
    PauseGame() {
        console.log(' Paused Game ');
        PlayzhubEventHandler.GamePlayPaused();
    }

    ResumeGame() {
        PlayzhubEventHandler.GamePlayResumed();
        console.log(' Resume Game ');
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
            // this.CallTheScoreSendAPI();
        }
    };
    DisplayTimeFormat(_time) {
        let minutes = parseInt(_time / 60, 10);
        let seconds = parseInt(_time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        this.timeValueText.setText(minutes + ":" + seconds);
    };

    CallTheScoreSendAPI() {
        try {
            if (getMobileOperatingSystem() == "Android") {
                // console.log("Android");
                sendMessage("The Game End..................................");
                sendMessage("0");
            } else if (getMobileOperatingSystem() == "iOS") {
                // console.log("iOS");
                var postdata = {
                    score: "0",
                };
                var postmessage = JSON.stringify(postdata);
                window.webkit.messageHandlers.jsHandler.postMessage(postmessage);
                window.webkit.messageHandlers.jsHandler.postMessage("The Game End.............");
            }
            else {
                // console.log("desktop");
            }
        } catch (err) {
            console.log("err: ", err);
        }
        SoundManager.StopBgMusic();
        if (this.TimedEvent != null) {
            this.TimedEvent.remove();
        }
        Constant.timeToEnd = Server.timerValue;
    };

    ShowCharacter() {
        this.tweens.add({
            targets: [this.character],
            x: this.characterX,
            // y: this.characterY,
            ease: 'Bounce.Out',
            duration: 300,
            delay: 100,
            onComplete: () => {
                this.characterPos.x = 100;
                // this.characterPos.y = this.characterY;

                this.ShowTitle();
            },
            onCompleteScope: this
        });
    }

    ShowTitle() {
        let clientWidth;
        let clientHeight;
        if (window.innerWidth >= (window.innerHeight / 1.7777777)) {
            clientHeight = window.innerHeight;
            clientWidth = (clientHeight / 1.77777777778);
        }
        else {
            clientWidth = window.innerWidth;
            clientHeight = window.innerHeight;
        }
        let newScale = Utils.getScale(1080, 1920, clientWidth, clientHeight);
        // console.log('clientWidth', clientWidth / 2, window.innerWidth);

        // this.titlePos.x = this.character.x - this.titleX;
        // this.titlePos.y = this.character.y - this.titleY;
        // this.title.setPosition(this.titlePos.x, this.titlePos.y);
        // this.title.setScale(newScale * 0.1);
        this.title.setAlpha(1);
        // this.title.setPosition(clientWidth / 2 - 150 * newScale, clientHeight / 2);
        this.tweens.add({
            targets: [this.title],
            x: clientWidth / 2,
            y: clientHeight / 2 - 450 * newScale,
            scaleX: newScale * 0.8,
            scaleY: newScale * 0.8,
            ease: 'Back.easeInOut',
            duration: 500,
            onComplete: () => {
                this.titleScale = 0.8;
                this.hasAnime = true;
                this.character.play("throw_knife");
                this.character.on('animationcomplete', this.onCompleteCharacterAnimation, this);
            },
            onCompleteScope: this
        });
    }
    onCompleteCharacterAnimation(y, z) {
        this.characterKnife.setAlpha(1);
        this.ThrowCharacterKnife();
    }

    ThrowCharacterKnife() {

        let newScaleY = Utils.getScaleY(1920, window.innerHeight);
        this.characterKnife.setVisible(true);
        this.tweens.add({
            targets: [this.characterKnife],
            y: - 200 * newScaleY,
            rotation: 15,
            ease: 'Sine.easeInOut',
            duration: 600,
            callbackScope: this,
            onComplete: function (tween) {
                this.characterKnife.setAlpha(0)
                this.ShowTitleKnife();
            }
        });
    }

    ShowTitleKnife() {
        this.titleKnife.setAlpha(1);
        let clientHeight = window.innerHeight;
        let clientWidth = (clientHeight / 1.77777777778);
        let newScale = Utils.getScale(1080, 1920, clientWidth, clientHeight);
        this.tweens.add({
            targets: [this.titleKnife],
            x: this.title.x - 10 * newScale,
            y: this.title.y - 25 * newScale,
            ease: 'Back.easeInOut',
            duration: 400,
            callbackScope: this,
            onComplete: () => {
                this.finalKnifeX = this.title.x - 10;
                this.finalKnifeY = this.title.y - 100;
                // this.titleKnifePos.x = this.title.x;
                // this.titleKnifePos.y = this.title.y - 100 * newScale;
                this.titleX = 0;
                this.titleY = 950;
                this.titleKnifeX = 10;
                this.titleKnifeY = 25;
            }
        });
        setTimeout(() => {
            this.JerkTheTitle();
        }, 230);
    }

    JerkTheTitle() {
        this.tweens.add({
            targets: [this.title],
            y: this.title.y + 20,
            ease: 'Back.easeIn',
            duration: 150,
            yoyo: true,
            onCompleteScope: this,
            onComplete: function (tween) {
                this.ShowPlayButton();
            }
        });
    }

    ShowPlayButton() {
        let clientHeight = window.innerHeight;
        let clientWidth = (clientHeight / 1.77777777778);
        let newScale = Utils.getScale(1080, 1920, clientWidth, clientHeight);
        this.tweens.add({
            targets: [this.playButton],
            y: clientHeight - 150 * newScale,
            alpha: 1,
            ease: 'Back.easeInOut',
            duration: 800,
            onCompleteScope: this,
            onComplete: () => {
                this.playButtonY = 150;
            }
        });
    }

    PlayButtonPressed() {
        let clientHeight = window.innerHeight;
        let clientWidth = (clientHeight / 1.77777777778);
        let newScale = Utils.getScale(1080, 1920, clientWidth, clientHeight);
        Utils.ButtonScaleTween(this, this.playButton, newScale);
        Utils.ButtonScaleTween(this, this.playText, newScale);
        SoundManager.PlayButtonClickSound();
    }
    PlayButtonReleased() {
        // setTimeout(() => {
        //     Constant.game.scene.stop('TitleScene');
        //     this.scene.start('GameScene');
        // }, 100);

        // ima.showRewardedAd((success) => {
        //     if (success) {
        //         this.add.text(300, 400, 'Ad watched! Reward unlocked.', { fontSize: '20px' });
        //         // TODO: give player coins / continue / bonus
        //     } else {
        //         this.add.text(300, 400, 'Ad failed or skipped.', { fontSize: '20px' });
        //     }
        // });

        requestAndPlayAd(() => {
            startGameContent.call(this);
        });
    }
    resize(newWidth, newHeight, offsetWidth) {
        if (Constant.activeScene != 'title') return;
        const camera = this.cameras.main;
        camera.x = offsetWidth;
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        let newScaleY = Utils.getScaleY(1920, newHeight);
        this.menuBg.setDisplaySize(newWidth, newHeight);
        // Hit it right title logo final tween target x and y --------------

        this.finalKnifeX = this.title.x - 10 * newScale;

        // Hit it right character final tween target x and y --------------
        this.characterX = newWidth / 2 - 100 * newScale;
        this.characterY = newHeight - 625 * newScaleY;



        // Hit it right animation knife  final tween target x and y --------------



        this.characterGlow.setScale(newScale);
        this.characterGlow.setPosition(newWidth / 2, newHeight - 450 * newScaleY);
        // this.timeRemainText.setScale(newScale);
        // this.timeRemainText.setPosition(newWidth / 2 - 90 * newScale, 100 * newScale);
        // this.timeValueText.setScale(newScale);
        // this.timeValueText.setPosition(newWidth / 2 + 150 * newScale, 100 * newScale);
        this.character.setScale(newScale);
        this.character.setPosition(newWidth / 2 - this.characterPos.x * newScale, this.characterGlow.y - 200 * newScale);
        this.titlePos.x = newWidth / 2 - this.titleX * newScale;
        this.titlePos.y = this.characterGlow.y - this.titleY * newScale;
        this.title.setScale(this.titleScale * newScale);
        if (this.hasAnime) {
            this.title.setPosition(newWidth / 2, 510 * newScale);
        } else {
            this.title.setPosition(this.titlePos.x, this.titlePos.y);
        }

        this.characterShadow.setScale(newScale);
        this.characterShadow.setPosition(this.character.x, this.character.y + 200 * newScale);

        this.characterKnife.setScale(newScale);
        this.characterKnife.setPosition(newWidth / 2 - this.characterKnifePos.x * newScale, newHeight - this.characterKnifePos.y * newScaleY);
        // this.title.setPosition(newWidth / 2, this.finalTitleY);

        this.titleKnifePos.x = this.title.x - this.titleKnifeX * newScale;
        this.titleKnifePos.y = this.title.y - this.titleKnifeY * newScale;
        this.titleKnife.setScale(newScale);
        // console.log('newScale', newScale, this.titleKnife.scale);

        this.titleKnife.setPosition(this.titleKnifePos.x, this.titleKnifePos.y);

        this.playButtonX = newWidth / 2;
        this.playButton.setScale(newScale);
        this.playButton.setPosition(this.playButtonX, newHeight - this.playButtonY * newScale);

        this.scaleBeforeResize = newScale;
        camera.setViewport(offsetWidth, 0, newWidth, newHeight);
    }

}