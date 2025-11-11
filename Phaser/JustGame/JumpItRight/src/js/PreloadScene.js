import { Constant } from "./Constant.js";
import { SoundManeger } from "./SoundManeger.js";
import { Server } from "./Server.js";
export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.percentText = null;
        this.fonts = {
            "BRITANIC": null,
            "Roboto_Bold": null,
        }
    }

    preload() {

    }

    create() {
        this.loadArray = [];
        const getgameBg = document.getElementById("splash_bg");
        const getGameLogo = document.getElementById("jump_it_right");
        const getProgressbase = document.getElementById("progress_base");
        const getProgressBar = document.getElementById("progress_bar");
        this.loadArray.push(getgameBg, getGameLogo, getProgressbase, getProgressBar);
        for (let index = 0; index < this.loadArray.length; index++) {
            const element = this.loadArray[index];

            if (element.complete) {
                this.loadHTMLImage(element);
            } else {
                element.onload = () => this.loadHTMLImage(element);
            }
        }
        this.percentText = this.add.text(this.progressBar.x, this.progressBar.y + Math.floor(Constant.game.config.width / 10.8), "Loading...", { fontFamily: 'Roboto_Bold', fontSize: "40px", fontStyle: 'bold', align: 'center' }).setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.LoadFonts();
    }

    loadHTMLImage(element) {
        if (element.id) {
            const textureKey = element.id;

            if (!this.textures.exists(textureKey)) {
                this.textures.addImage(textureKey, element);
            }
            if (textureKey === "splash_bg") {
                this.splashBG = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'splash_bg').setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            } else if (textureKey === "jump_it_right") {
                this.progressBase = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) - 200, "jump_it_right").setOrigin(0.5).setScale(1.5 * Constant.scaleFactorX, 1.5 * Constant.scaleFactorY);
            }
            else if (textureKey === "progress_base") {
                this.progressBase = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) + 650, "progress_base").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            }
            else if (textureKey === "progress_bar") {
                this.progressBar = this.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) + 650, "progress_bar").setOrigin(0.5).setScale(Constant.scaleFactorX * 1.5, Constant.scaleFactorY);
                this.progressBar.setCrop(0, 0, 0, this.progressBar.height);

            }
        } else {
            console.warn("Element does not have an ID:", element);
        }
    }
    LoadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.FontLoadSuccess.bind(this, fontName, isLast), this.FontLoadError.bind(this, fontName));
        });
    }
    FontLoadSuccess(fontName, isLast) {
        if (isLast) {
            this.loadAssests();
        }
    };
    FontLoadError(fontName) { };
    loadAssests() {
        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });
        this.load.setPath('assets/images/spineOne/');
        this.load.spine('norm_monkey', 'monkey_jumping_game.json', 'monkey_jumping_game.atlas');
        this.load.spine('pot', 'pot.json', 'pot.atlas');
        this.load.setPath('');

        // Load Audio in the Cache-Manager 
        this.load.audio('Background', 'assets/audio/Background.mp3');
        this.load.audio('Boost', 'assets/audio/Boost.mp3');
        this.load.audio('Jump', 'assets/audio/Jump.mp3');
        this.load.audio('deathSound', 'assets/audio/deathSound.mp3');

        // Loads Textures in the Texture Manager
        this.load.image('Normal_Power', 'assets/images/normal_power.png');
        this.load.image('back', 'assets/images/back.png');
        this.load.spritesheet('Sound_on_off', 'assets/images/sound_on_off.png', { frameWidth: 194 / 2, frameHeight: 97 });
        this.load.image('quite_base', 'assets/images/ui/quit_popup/quit_base.png');
        this.load.image('yes', 'assets/images/ui/quit_popup/yes.png');
        this.load.image('no', 'assets/images/ui/quit_popup/no.png');
        this.load.image('gameover_base', 'assets/images/gameover_base.png');
        this.load.image('bigBannanBase', 'assets/images/bigBannanBase.png');


        this.load.image('Bust_Power', 'assets/images/bust_power.png');
        this.load.image('black', 'assets/images/black.png');
        this.load.image('white', 'assets/images/white.png');

        this.load.image('Play', 'assets/images/loading/play.png');
        this.load.image('GameBg', 'assets/images/loading/game_bg.png');


        // this.load.image('Pause_Bar', 'assets/images/Pause_Bar.png');

        for (let i = 1; i <= 3; i++) {
            this.load.image('blade_base_' + i, 'assets/images/blade_base_' + i + '.png');
        }

        this.load.image('Base', 'assets/images/base.png');
        //bladeobstacle
        for (let i = 1; i <= 3; i++) {
            this.load.image("blade_" + i, 'assets/images/blade_' + i + '.png')
        }

        this.load.image('Kolsi', 'assets/images/pot_base.png');

        //left side branch obstacle
        for (let i = 1; i <= 15; i++) {
            this.load.image("L_Brunch_obstacles_" + i, 'assets/images/L_Brunch_obstacles_' + i + '.png');
        }

        //right side branch obstacle
        for (let i = 1; i <= 10; i++) {
            this.load.image("R_Brunch_obstacles_" + i, 'assets/images/R_Brunch_obstacles_' + i + '.png');
        }

        // Left plates
        for (let i = 1; i <= 7; i++) {
            this.load.image('L_Plate_' + i, 'assets/images/L_Plate_' + i + '.png');
        }

        //right plates
        for (let i = 1; i <= 6; i++) {
            this.load.image('R_Plate_' + i, 'assets/images/R_Plate_' + i + '.png');
        }
        this.load.image('black', 'assets/images/black.png');

        //Game UI===========================================================> 


        //TitlePopUp
        this.load.image('overlay', 'assets/images/ui/Instruction_Page/overlay.png');
        // this.load.image('Setting', 'assets/images/ui/Instruction_Page/Setting.png');
        this.load.image('info_bg_one', 'assets/images/ui/Instruction_Page/info_bg_one.png');
        this.load.image('info_bg_two', 'assets/images/ui/Instruction_Page/info_bg_two.png');
        this.load.image('content_one', 'assets/images/ui/Instruction_Page/content_one.png');
        this.load.image('content_two', 'assets/images/ui/Instruction_Page/content_two.png');
        this.load.image('content_three', 'assets/images/ui/Instruction_Page/content_three.png');
        this.load.image('content_four', 'assets/images/ui/Instruction_Page/content_four.png');
        this.load.image('button_base_blue', 'assets/images/ui/Instruction_Page/button_base_blue.png');
        this.load.image('button_base_green', 'assets/images/ui/Instruction_Page/button_base_green.png');
        // this.load.image('title_Art', 'assets/images/ui/Instruction_Page/title_Art.png');

        this.load.image('Base_Brunches', 'assets/images/ui/Title_Art/base_brunches.png');
        this.load.image('Cutter_1', 'assets/images/ui/Title_Art/cutter_1.png');
        this.load.image('Cutter_2', 'assets/images/ui/Title_Art/cutter_2a.png');
        this.load.image('JUMP_IT_RIGHT_Letter', 'assets/images/ui/Title_Art/JUMP_IT_RIGHT_Letter.png');



        this.load.image('Banana_Count', 'assets/images/ui/Game_Play_Page/Banana_Count.png');
        this.load.image('Pause', 'assets/images/ui/Game_Play_Page/Pause.png');

        this.load.image('Quit', 'assets/images/ui/Game_Over_Page/Quit.png');
        this.load.image('Replay', 'assets/images/ui/Game_Over_Page/Replay.png');


        this.load.image('Rusume', 'assets/images/ui/Pause_Manu_Page/Rusume.png');


        this.load.image('C_1', 'assets/images/ui/c_1.png');
        this.load.image('C_2', 'assets/images/ui/c_2.png');
        this.load.image('C_3', 'assets/images/ui/c_3.png');
        this.load.image('Play_Page', 'assets/images/play_page.png');

        for (let i = 0; i < 5; i++) {
            this.load.image('base_' + i, 'assets/images/base/base_' + i + '.png');
        }

        for (let i = 0; i <= 2; i++) {
            this.load.image("Layer_" + i, "assets/images/transperentBase/Layer_" + i + ".png")
        }


        for (let i = 1; i < 4; i++) {
            this.load.image("rollin_" + i, 'assets/images/rollin_' + i + ".png");
        }

        //audio load--------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------------------- 

        //latest




        this.load.start();
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

    loadProgress(percentage) {
        if (this.progressBar) {
            this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
            percentage = percentage * 100;
            this.percentText.setText("Loading: " + parseInt(percentage) + " %");
        }
    }

    complete() {
        SoundManeger.CreateSounds();
        Constant.game.scene.stop('PreloadScene');
        Constant.game.scene.start("MenuScene");
    }

}