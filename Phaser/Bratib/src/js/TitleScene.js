import { Utils } from "./Utils.js";
import { SoundManager } from "./SoundManager.js";
import { Constant } from "./Constant.js";
import Phaser from "phaser";
import { Server } from "./Server.js";

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
        this.menuPageContainer = null;
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
    }

    create() {
        let menuBg = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "splash_bg").setOrigin(0.5);
        this.menuPageContainer = this.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);

        // let menuBg = this.add.image(0, 0, "splash_bg").setOrigin(0.5);
        // this.menuPageContainer.add(menuBg);

        this.CreateFireworksAnimation();
        // this.CreateLantern();
        this.CreateFireworks();

        let imageName;
        if (Server.language == "eng") {
            imageName = "logo_english";
        } else {
            imageName = "logo_khamer";
        }
        this.logo = this.add.image(1000, -686, imageName).setOrigin(0.5);

        this.mermaidGlow = this.add.image(-1000, 112, "mermaid_glow").setOrigin(0.5).setScale(0.8);
        this.mermaidCharacter = this.add.image(-1000, 107, "mermaid").setOrigin(0.5).setScale(0.8);

        this.CreateSoundButton();

        this.playButton = this.add.image(0, 717, "active_play_button_base").setOrigin(0.5);
        this.playButton.setInteractive({ useHandCursor: true });
        this.playButton.on('pointerdown', (pointer, x, y, event) => this.PlayButtonPressed(this.playButton), this);
        this.playButton.on('pointerup', (pointer, x, y, event) => this.PlayButtonReleased(this.playButton), this);
        this.playButton.setScale(0);
        // let playTextStyle = { fontFamily: 'Kh_KoulenL', fontSize: '45px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        let playTextStyle = { fontFamily: Constant.fontName, fontSize: '45px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        this.playText = this.add.text(this.playButton.x, this.playButton.y - 7, Constant.playText, playTextStyle).setOrigin(0.5);
        this.playText.setScale(0);

        this.menuPageContainer.add(
            [
                this.logo,
                this.mermaidGlow,
                this.mermaidCharacter,
                this.soundButton,
                this.playButton,
                this.playText,
            ]
        );

        this.ShowLogo();
        this.DefaultSoundButton();
        SoundManager.PlayBgMusic();
    };

    // CreateLantern() {
    //     let lantern1 = this.add.sprite(-350, -850, "lantern").setOrigin(0.5);
    //     let lantern2 = this.add.sprite(400, -750, "lantern").setOrigin(0.5);
    //     this.menuPageContainer.add([lantern1, lantern2]);

    //     this.anims.create({
    //         key: "lantern_anim",
    //         frameRate: 8,
    //         repeat: -1,
    //         frames: this.anims.generateFrameNumbers("lantern", { start: 0, end: 17 }),
    //     });

    //     lantern1.play("lantern_anim");
    //     lantern2.play("lantern_anim");
    // };

    CreateFireworks() {
        for (let i = 0; i < this.fireworksPosArray.length; i++) {
            let fireworks = this.add.sprite(this.fireworksPosArray[i].posX, this.fireworksPosArray[i].posY, "fireworks").setOrigin(0.5);
            this.menuPageContainer.add([fireworks]);
            this.allFireworksArray.push(fireworks);

            this.PlayFireworksAnimation(fireworks, (i * 300));
        }
    };
    CreateFireworksAnimation() {
        this.anims.create({
            key: "fireworks_anim",
            frameRate: 20,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("fireworks", { start: 0, end: 45 }),
        });
    };
    PlayFireworksAnimation(_obj, _delay) {
        setTimeout(() => {
            if (_obj.anims != undefined) {
                _obj.play("fireworks_anim");
            }
        }, _delay);

    };
    // CreateFireworks() {
    //     let fireworks1 = this.add.sprite(-110, -800, "fireworks").setOrigin(0.5);
    //     let fireworks2 = this.add.sprite(330, -780, "fireworks").setOrigin(0.5);
    //     this.menuPageContainer.add([fireworks1, fireworks2]);

    //     this.anims.create({
    //         key: "fireworks_anim",
    //         frameRate: 20,
    //         repeat: -1,
    //         frames: this.anims.generateFrameNumbers("fireworks", { start: 0, end: 45 }),
    //     });

    //     fireworks1.play("fireworks_anim");
    //     setTimeout(() => {
    //         fireworks2.play("fireworks_anim");
    //     }, 500);
    // };

    ShowLogo() {
        this.tweens.add({
            targets: [, this.logo],
            x: 0,
            ease: 'Back.easeOut',
            duration: 500,
            callbackScope: this,
            onComplete: function (tween) {
                this.ShowMermaid();
            }
        });
    };

    ShowMermaid() {
        this.tweens.add({
            targets: [, this.logo, this.mermaidCharacter, this.mermaidGlow],
            x: 0,
            ease: 'Back.easeOut',
            duration: 500,
            callbackScope: this,
            onComplete: function (tween) {
                this.ShowMermaidGlow();
                this.ShowPlayButton();
            }
        });
    };

    ShowMermaidGlow() {
        this.tweens.add({
            targets: [this.mermaidGlow],
            scaleX: 0.77,
            scaleY: 0.77,
            ease: 'Linear',
            duration: 1000,
            repeat: -1,
            yoyo: true,
            callbackScope: this,
            onComplete: function (tween) {
                this.ShowTitle();
            }
        });
    };

    ShowPlayButton() {
        this.tweens.add({
            targets: [this.playButton, this.playText],
            scaleX: 1,
            scaleY: 1,
            ease: 'Back.easeOut',
            duration: 300,
            callbackScope: this,
            onComplete: function (tween) { }
        });
    };

    PlayButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.playButton, 1);
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.playText, 1);
        SoundManager.PlayButtonClickSound();
    }
    PlayButtonReleased() {
        setTimeout(() => {
            Constant.game.scene.stop('TitleScene');
            Constant.game.scene.start('GameScene');
        }, 100);
    };

    CreateSoundButton() {
        this.soundButton = this.add.image(430, -830, "sound_on").setOrigin(0.5);
        this.soundButton.setInteractive({ useHandCursor: true });
        this.soundButton.on('pointerdown', (pointer, x, y, event) => this.SoundButtonPressed(this.soundButton), this);
        this.soundButton.on('pointerup', (pointer, x, y, event) => this.SoundButtonReleased(this.soundButton), this);
    };
    SoundButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.soundButton, 1);
        SoundManager.PlayButtonClickSound();
    };
    SoundButtonReleased() {
        this.ToggleSoundButton();
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