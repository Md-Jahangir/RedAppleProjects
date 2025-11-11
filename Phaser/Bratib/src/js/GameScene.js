import Phaser from "phaser";
import { Constant } from "./Constant.js";
import { Utils } from "./Utils.js";
import Plate from "./Plate.js";
import Incense from "./Incense.js";
import Candle from "./Candle.js";
import Flower from "./Flower.js";
import GameplayUI from "./GameplayUI.js";
import FloatPanel from "./FloatPanel.js";
import WinPopup from "./popups/WinPopup.js";
import LoosePopup from "./popups/LoosePopup.js";

import { SoundManager } from "./SoundManager.js";
import { Server } from "./Server.js";
import ContentHolder from "./ContentHolder.js";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
        this.menuUI = null;
        this.items = null;
        this.contentHolder = null;
        this.plate = null;
        this.incense = null;
        this.candle = null;
        this.gameplayUI = null;
        this.floatPanel = null;
        this.winPopup = null;
        this.loosePopup = null;

        this.finalBratibArray = [];

        this.fireworksPosArray = [
            { posX: -110, posY: -800 },
            { posX: 330, posY: -810 },
            { posX: 100, posY: -750 },
            { posX: -400, posY: -580 },
            { posX: 450, posY: -500 },
            { posX: 300, posY: -450 },
            { posX: -300, posY: -400 },
            { posX: -430, posY: -800 },
            { posX: 450, posY: -700 },
            { posX: -440, posY: -360 },
            { posX: 150, posY: -850 }
        ];
        this.allFireworksArray = [];
    };

    init() { };
    preload() { };

    async create() {
        this.CreateGameplayBg();
        this.gameplayUI = new GameplayUI(this);
        this.plate = new Plate(this);
        this.incense = new Incense(this);
        this.candle = new Candle(this);
        this.flower = new Flower(this);
        this.floatPanel = new FloatPanel(this);
        this.contentHolder = new ContentHolder(this);
        this.winPopup = new WinPopup(this);
        this.loosePopup = new LoosePopup(this);

        this.gameplayContainer = this.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.CreateLantern();
        this.CreateFireworks();
        this.CreateFloatButton();
        this.CreateCandleLightAnimation();
        this.CreateIncenseSmokeAnimation();
        this.CreateMermaidAnimation();
        this.CreateBubblesAnimation();
        this.CreateBratibMoveAnimation();

        this.gameplayUI.ShowGameplayUI();
        this.plate.ShowPlateContainer();

        this.CreateSoundButton();
        this.DefaultSoundButton();
        await Server.PostScore(0, "playing");
        await Server.PostMessage(0, "playing");

    };

    //=============================CREATE MENU================================
    CreateGameplayBg() {
        this.gameplayBg = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "decorate_bg").setOrigin(0.5);
    };

    SetGameplayBg() {
        this.gameplayBg.setTexture("splash_bg");
    }

    // CreateLantern() {
    //     this.lantern1 = this.add.sprite(-350, -850, "lantern").setOrigin(0.5);
    //     this.lantern2 = this.add.sprite(400, -750, "lantern").setOrigin(0.5);
    //     this.gameplayContainer.add([this.lantern1, this.lantern2]);

    //     this.lantern1.play("lantern_anim");
    //     this.lantern2.play("lantern_anim");
    // };

    // CreateFireworks() {
    //     this.fireworks1 = this.add.sprite(-110, -800, "fireworks").setOrigin(0.5);
    //     this.fireworks2 = this.add.sprite(250, -750, "fireworks").setOrigin(0.5);
    //     this.gameplayContainer.add([this.fireworks1, this.fireworks2]);

    //     this.fireworks1.play("fireworks_anim");
    //     setTimeout(() => {
    //         this.fireworks2.play("fireworks_anim");
    //     }, 500);
    // };
    CreateFireworks() {
        for (let i = 0; i < this.fireworksPosArray.length; i++) {
            let fireworks = this.add.sprite(this.fireworksPosArray[i].posX, this.fireworksPosArray[i].posY, "fireworks").setOrigin(0.5);
            this.gameplayContainer.add([fireworks]);
            this.allFireworksArray.push(fireworks);

            this.PlayFireworksAnimation(fireworks, (i * 300));
        }
    };
    PlayFireworksAnimation(_obj, _delay) {
        setTimeout(() => {
            if (_obj.anims != undefined) {
                _obj.play("fireworks_anim");
            }
        }, _delay);
    };
    ShowLanterAndFireworks() {
        // this.lantern1.setVisible(true);
        // this.lantern2.setVisible(true);
        // this.fireworks1.setVisible(true);
        // this.fireworks2.setVisible(true);
        for (let i = 0; i < this.allFireworksArray.length; i++) {
            this.allFireworksArray[i].setVisible(true);
        }
    };
    HideLanterAndFireworks() {
        // this.lantern1.setVisible(false);
        // this.lantern2.setVisible(false);
        // this.fireworks1.setVisible(false);
        // this.fireworks2.setVisible(false);
        for (let i = 0; i < this.allFireworksArray.length; i++) {
            this.allFireworksArray[i].setVisible(false);
        }
    };

    CreateFloatButton() {
        this.floatButton = this.add.image(0, 150, "active_play_button_base").setOrigin(0.5);
        this.floatButton.setInteractive({ useHandCursor: true });
        this.floatButton.on('pointerdown', (pointer, x, y, event) => this.OnFloatButtonPressed(this.floatButton), this);
        this.floatButton.on('pointerup', (pointer, x, y, event) => this.OnFloatButtonReleased(this.floatButton), this);
        this.floatButton.setScale(0);

        let floatTextStyle = { fontFamily: Constant.fontName, fontSize: '45px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        this.floatText = this.add.text(this.floatButton.x, this.floatButton.y - 7, Constant.floatBratibText, floatTextStyle).setOrigin(0.5, 0.5);
        this.floatText.setScale(0);

        this.gameplayContainer.add([this.floatButton, this.floatText]);
    };

    async OnFloatButtonPressed() {
        this.gameplayUI.timedEvent.remove();
        Utils.ButtonScaleTween(this, this.floatButton, 1);
        Utils.ButtonScaleTween(this, this.floatText, 1);
        this.contentHolder.SetFinalBratibPosition();
        // this.gameplayUI.SetBg();
        this.SetGameplayBg();
        this.contentHolder.HideWater();
        this.gameplayUI.HideTimerText();
        this.floatPanel.ShowFloatPanel();
        this.ShowLanterAndFireworks();
        SoundManager.PlayButtonClickSound();
        await this.CalculateScore();
        // this.winPopup.SetScore();
    };
    OnFloatButtonReleased() {
        this.HideFloatButton();
    };

    ShowFloatButton() {
        this.tweens.add({
            targets: [this.floatButton, this.floatText],
            scaleX: 1,
            scaleY: 1,
            ease: 'Back.easeOut',
            duration: 300,
            callbackScope: this,
            onComplete: function (tween) { }
        });
    };
    HideFloatButton() {
        this.tweens.add({
            targets: [this.floatButton, this.floatText],
            scaleX: 0,
            scaleY: 0,
            ease: 'Back.easeIn',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) { }
        });
    }

    CreateCandleLightAnimation() {
        this.anims.create({
            key: "candle_light_anim",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("candle_light", { start: 0, end: 8 }),
        });
    };
    CreateIncenseSmokeAnimation() {
        this.anims.create({
            key: "incense_smoke_anim",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("incense_smoke", { start: 0, end: 12 }),
        });
    };

    CreateMermaidAnimation() {
        this.anims.create({
            key: "mermaid_ripples_anim",
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("mermaid_ripples", { start: 0, end: 9 }),
        });
    };

    CreateBubblesAnimation() {
        this.anims.create({
            key: "bubbles_anim",
            frameRate: 20,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bubbles", { start: 0, end: 28 }),
        });
    };

    CreateBratibMoveAnimation() {
        this.anims.create({
            key: "bratib_move_water_anim",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bratib_move_water", { start: 0, end: 13 }),
        });
    };


    async CalculateScore() {
        let currentTime = Constant.timeToEnd;
        console.log("current score: ", currentTime);
        await Server.PostScore(currentTime, "over");
        await Server.PostMessage(currentTime, "over");
    };


    CreateSoundButton() {
        this.soundButton = this.add.image(430, -830, "sound_on").setOrigin(0.5);
        this.soundButton.setInteractive({ useHandCursor: true });
        this.soundButton.on('pointerdown', (pointer, x, y, event) => this.SoundButtonPressed(this.soundButton), this);
        this.soundButton.on('pointerup', (pointer, x, y, event) => this.SoundButtonReleased(this.soundButton), this);
        this.gameplayContainer.add(this.soundButton);
    };
    SoundButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.soundButton, 1);
        SoundManager.PlayButtonClickSound();
    };
    SoundButtonReleased() {
        this.ToggleSoundButton();
    };

    ShowSoundButton() {
        this.soundButton.setVisible(true);
    };
    HideSoundButton() {
        this.soundButton.setVisible(false);
    };

    DefaultSoundButton() {
        if (localStorage.getItem("bratib_is_sound_on") == null) {
            localStorage.setItem("bratib_is_sound_on", 1);
        }
        if (localStorage.getItem("bratib_is_sound_on") == 1) {
            this.soundButton.setTexture("sound_on");
        } else {
            this.soundButton.setTexture("sound_off");
        }
    };
    ToggleSoundButton() {
        if (localStorage.getItem("bratib_is_sound_on") == 1) {
            localStorage.setItem("bratib_is_sound_on", 0);
            this.soundButton.setTexture("sound_off");
            SoundManager.PlayButtonClickSound();
            SoundManager.StopBgMusic();
        } else {
            localStorage.setItem("bratib_is_sound_on", 1);
            this.soundButton.setTexture("sound_on");
            SoundManager.PlayBgMusic();
        }
    };


}