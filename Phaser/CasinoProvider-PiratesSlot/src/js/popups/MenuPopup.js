import { Constant } from "../Constant.js";
import { ButtonScaleDownTween } from "../Utils.js";
import { ButtonScaleUpTween } from "../Utils.js";
import { SoundManager } from '../SoundManager.js';
import Button from "../ui/Button.js";
import { Model } from "../Model.js";
class MenuPopup {
    constructor(scene) {
        this.scene = scene;
        this.scroller = null;
        this.scroller1 = null;
        this.soundEffectFrequency = 100;
        this.bgMusicFrequency = 100;
        this.spaceBarBtnCounter = 0;
        this.fastPlayBtnClicked = 0;
        this.isSpacebarClicked = true;
        this.isFastPlay = false;
        this.isToggledSound = true;
        this.CreateMenuPopup();
        this.CheckSoundStatus();
        this.CheckMusicStatus();
    };
    CheckSoundStatus() {
        if (localStorage.getItem("slot_game_is_sound_on") == null) {
            this.soundButton.setFrame(1);
            this.soundEffectScroller.children[0].setPosition(175, -105);
            this.soundEffectFrequencyText.setText(100);
            localStorage.setItem("slot_game_is_sound_on", 1);
        } else {
            if (localStorage.getItem("slot_game_is_sound_on") == 0) {
                this.soundButton.setFrame(0);
                this.soundEffectScroller.children[0].setPosition(-65, -105);
                this.soundEffectFrequencyText.setText(0);
                localStorage.setItem("slot_game_is_sound_on", 0);
            } else {
                this.soundButton.setFrame(1);
                this.soundEffectScroller.children[0].setPosition(175, -105);
                this.soundEffectFrequencyText.setText(100);
                localStorage.setItem("slot_game_is_sound_on", 1);
            }
        }
    }
    CheckMusicStatus() {
        if (localStorage.getItem("slot_game_is_music_on") == null) {
            this.musicButton.setFrame(1);
            this.bgMusicScroller.children[0].setPosition(175, 0);
            this.bgMusicFrequencyText.setText(100);
            localStorage.setItem("slot_game_is_music_on", 1);
        } else {
            if (localStorage.getItem("slot_game_is_music_on") == 0) {
                this.musicButton.setFrame(0);
                this.bgMusicScroller.children[0].setPosition(-65, 0);
                this.bgMusicFrequencyText.setText(100);
                localStorage.setItem("slot_game_is_music_on", 0);
            } else {
                this.musicButton.setFrame(1);
                this.bgMusicScroller.children[0].setPosition(175, 0);
                this.bgMusicFrequencyText.setText(100);
                localStorage.setItem("slot_game_is_music_on", 1);
            }
        }
    }

    CreateMenuPopup() {
        this.overlay = this.scene.add.image(0, 0, "popup_bg_game").setScale(1);
        this.overlay.setInteractive();
        this.overlay.on("pointerdown", this.OverlayPressed, this);
        this.menuPopupContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(3);
        if (Constant.isMobile) {
            this.payTableContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) + 50).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(3);
        } else {
            this.payTableContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) + 100).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(3);
        }
        if (Constant.isMobile) {
            this.infoPageContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) + 50).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(3);
        } else {
            this.infoPageContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) + 100).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(3);
        }
        this.payTableHeadingContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(3);
        this.infoPageHeadingContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(3);
        this.settingsPageHeadingContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) + 100).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(3);
        this.payLineContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) + 100).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(3);

        if (Constant.isMobile) {
            this.settingsPageContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) + 50).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(3);
            this.settingsPageHeadingContainer.y -= 50;
        } else {
            this.settingsPageContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2) + 100).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(3);
        }

        this.base = this.scene.add.image(-100, -30, "settings_menu_base").setOrigin(0.5).setScale(1);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY * 1.05);
        this.payTableButton = this.scene.add.image(-225, -375, "paytable_button_normal");
        this.infoButton = this.scene.add.image(-70, -375, "info_button_normal");
        this.settingsButton = this.scene.add.image(85, -375, "settings_button_normal");
        this.payLineButton = this.scene.add.image(235, -375, "payline_button_normal");
        this.soundButton = this.scene.add.image(840, -345, "sound_button");
        this.musicButton = this.scene.add.image(840, -255, "music_button");
        this.homeButton = this.scene.add.image(840, -165, "home_button_normal");
        this.crossButton = this.scene.add.image(840, -438, "close_button_normal");


        this.payTableButton.setInteractive({ useHandCursor: true });
        this.payTableButton.on("pointerup", this.PayTableButtonReleased, this);

        this.infoButton.setInteractive({ useHandCursor: true });
        this.infoButton.on("pointerup", this.InfoButtonReleased, this);

        this.settingsButton.setInteractive({ useHandCursor: true });
        this.settingsButton.on("pointerup", this.SettingsButtonReleased, this);

        this.payLineButton.setInteractive({ useHandCursor: true });
        this.payLineButton.on("pointerup", this.PayLineButtonReleased, this);

        this.soundButton.setInteractive({ useHandCursor: true });
        this.soundButton.on('pointerover', this.SoundButtonOver, this);
        this.soundButton.on('pointerout', this.SoundButtonOut, this);
        this.soundButton.on("pointerdown", this.SoundButtonPressed, this);
        this.soundButton.on("pointerup", this.SoundButtonReleased, this);



        this.musicButton.setInteractive({ useHandCursor: true });
        this.musicButton.on('pointerover', this.MusicButtonOver, this);
        this.musicButton.on('pointerout', this.MusicButtonOut, this);
        this.musicButton.on("pointerdown", this.MusicButtonPressed, this);
        this.musicButton.on("pointerup", this.MusicButtonReleased, this);



        this.homeButton.setInteractive({ useHandCursor: true });
        this.homeButton.on('pointerover', this.HomeButtonOver, this);
        this.homeButton.on('pointerout', this.HomeButtonOut, this);
        this.homeButton.on("pointerdown", this.HomeButtonPressed, this);
        this.homeButton.on("pointerup", this.HomeButtonReleased, this);

        this.crossButton.setInteractive({ useHandCursor: true });
        this.crossButton.on('pointerover', this.CrossButtonOver, this);
        this.crossButton.on('pointerout', this.CrossButtonOut, this);
        this.crossButton.on("pointerdown", this.CrossButtonPressed, this);
        this.crossButton.on("pointerup", this.CrossButtonReleased, this);
        this.menuPopupContainer.add([this.overlay, this.base, this.payTableButton, this.infoButton, this.settingsButton, this.payLineButton, this.crossButton, this.soundButton, this.musicButton, this.homeButton]);
        this.EnableSeletedButton(this.payTableButton);
        this.CreatePayTable();
        this.CreateInfoPage();
        this.CreateSettingsTable();
        this.CreatePaylineInfo();
        this.menuPopupContainer.setVisible(false)
    };
    CreatePaytableScroller() {
        this.payTableGraphics = this.scene.add.graphics();
        // this.payTableGraphics.fillStyle(0xf00fff);
        let x, y, w, h;

        const slidingDeceleration = 0;
        const backDeceleration = 0;
        this.payTableGraphics.beginPath();
        if (Constant.isPortrait) {
            x = 0;
            y = (Constant.game.config.height / 2.8);
            w = (Constant.game.config.width / 1);//1.27);
            h = (Constant.game.config.height / 2.1);
            this.payTableGraphics.fillRect(x, y, w, h);
        }
        else {
            this.payTableGraphics.fillRect(
                (Constant.game.config.width / 3.606),
                (Constant.game.config.height / 8.84),
                (Constant.game.config.width / 2.254),
                (Constant.game.config.height / 1.53)
            );
        }
        this.payTableGraphics.setDepth(3);
        this.payTableGraphics.setInteractive(new Phaser.Geom.Rectangle(x, y, w, h),
            Phaser.Geom.Rectangle.Contains);
        this.mask = this.payTableGraphics.createGeometryMask();
        this.payTableContainer.setMask(this.mask)


        this.scroller = this.scene.plugins.get('rexscrollerplugin').add(this.payTableGraphics, {
            bounds: [
                ((y) - this.payTableContainer.getBounds().height / 1.55),
                (y + (h / 3.3))
            ],
            value: (y + (h / 3.3)),
            slidingDeceleration: slidingDeceleration,
            backDeceleration: backDeceleration,

            valuechangeCallback: (value) => {
                this.payTableContainer.y = value;
            }
        });

        // this.scroller.enable = false;
        this.scroller.dragDistanceThreshold = 1;
        this.scroller.dragThreshold = 1;
        this.payTableGraphics.disableInteractive();
    };
    CreateInfoScroller() {
        this.infoPageGraphics = this.scene.add.graphics();
        // this.infoPageGraphics.fillStyle(0xffffff);
        let x, y, w, h;
        x = 0;//(Constant.game.config.width / 45);
        y = (Constant.game.config.height / 2.8);
        w = (Constant.game.config.width / 1);
        h = (Constant.game.config.height / 2.1);
        const slidingDeceleration1 = 0;
        const backDeceleration1 = 0;
        this.infoPageGraphics.beginPath();
        if (Constant.isPortrait) {
            this.infoPageGraphics.fillRect(
                x,
                y,
                w,
                h
            );
        }
        else {
            this.infoPageGraphics.fillRect(
                (Constant.game.config.width / 3.606),
                (Constant.game.config.height / 8.84),
                (Constant.game.config.width / 2.254),
                (Constant.game.config.height / 1.53)
            );
        }
        this.infoPageGraphics.setDepth(3);
        this.infoPageGraphics.setInteractive(new Phaser.Geom.Rectangle(x, y, w, h),
            Phaser.Geom.Rectangle.Contains);
        this.mask1 = this.infoPageGraphics.createGeometryMask();
        this.infoPageContainer.setMask(this.mask1);
        this.scroller1 = this.scene.plugins.get('rexscrollerplugin').add(this.infoPageGraphics, {
            bounds: [
                ((y) - this.infoPageContainer.getBounds().height / 4.6),
                (y + (h / 3.3))
            ],
            value: (y + (h / 3.3)),
            slidingDeceleration: slidingDeceleration1,
            backDeceleration: backDeceleration1,

            valuechangeCallback: (value) => {
                this.infoPageContainer.y = Math.floor(value);
            }
        });
        this.scroller1.dragDistanceThreshold = 1;
        this.scroller1.dragThreshold = 1;
        this.infoPageGraphics.disableInteractive();
    };
    PayTableButtonReleased() {
        SoundManager.ButtonClickSound();
        this.EnableSeletedButton(this.payTableButton);
    };
    InfoButtonReleased() {
        SoundManager.ButtonClickSound();
        this.EnableSeletedButton(this.infoButton);
    };
    SettingsButtonReleased() {
        SoundManager.ButtonClickSound();
        this.EnableSeletedButton(this.settingsButton);
    };
    PayLineButtonReleased() {
        SoundManager.ButtonClickSound();
        this.EnableSeletedButton(this.payLineButton);
    }

    MusicButtonOver() {
    }
    SoundButtonOver() {
    }
    HomeButtonOver() {
        this.homeButton.setTexture('home_button_glow');
    }

    CrossButtonOver() {
        this.crossButton.setTexture('close_button_glow');
    }

    MusicButtonOut() { };
    HomeButtonOut() {
        this.homeButton.setTexture('home_button_normal');
    };
    SoundButtonOut() { };
    CrossButtonOut() {
        this.crossButton.setTexture('close_button_normal');
    };

    CreateInfoPage() {
        let infoPageText, upArrow, upArrowText, downArrow, downArrowText, roundStart, roundStartText, autoPlay, autoPlayText,
            startAutoPlay, startAutoPlayText, stopAutoPlay, stopAutoPlayText, menuButton, menuButtonText, infoPageScroolButton
        let infoPageTextStyle = { fontFamily: 'PR-Viking', fontSize: '41px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: this.menuPopupContainer.list[4].width - 40 } };
        let normalTextStyle = { fontFamily: 'arial', fontSize: '20px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: 390 } };

        infoPageText = this.scene.add.text(-7, -255, "INFO", infoPageTextStyle).setOrigin(0.5);
        infoPageText.alpha = 1;
        infoPageScroolButton = this.scene.add.image(513, -330, "button_scroll").setOrigin(0.5).setScale(0.65).setVisible(false);

        upArrow = this.scene.add.image(-400, -300, "arrow_button").setOrigin(0.5).setScale(0.5);
        upArrowText = this.scene.add.text(-220, -300, "Increase bet level", normalTextStyle).setOrigin(0.5);

        downArrow = this.scene.add.image(-400, -210, "arrow_button").setOrigin(0.5).setScale(0.5);
        downArrow.angle = 180;
        downArrowText = this.scene.add.text(-217, -210, "Decrease bet level", normalTextStyle).setOrigin(0.5);

        roundStart = this.scene.add.image(-400, -120, "button_start_game_round").setOrigin(0.5).setScale(0.25);
        roundStartText = this.scene.add.text(-209, -120, "Start the game round", normalTextStyle).setOrigin(0.5);

        autoPlay = this.scene.add.image(-400, -30, "auto_spin_button").setOrigin(0.5).setScale(0.5);
        autoPlayText = this.scene.add.text(-195, -30, "Open the Autoplay menu", normalTextStyle).setOrigin(0.5);

        startAutoPlay = this.scene.add.image(-400, 60, "button_star_autoplay").setOrigin(0.5).setScale(0.30)//.setScale(0.5);
        startAutoPlayText = this.scene.add.text(-230, 60, "Start Autoplay", normalTextStyle).setOrigin(0.5);

        stopAutoPlay = this.scene.add.image(-400, 150, "button_stop_autoplay").setOrigin(0.5).setScale(0.5);
        stopAutoPlayText = this.scene.add.text(-230, 150, "Stop Autoplay", normalTextStyle).setOrigin(0.5);

        menuButton = this.scene.add.image(-400, 240, "menu_button_normal").setOrigin(0.5).setScale(0.5);
        menuButtonText = this.scene.add.text(-150, 240, "Open the menu to access the Paytable,Settings and other options", normalTextStyle).setOrigin(0.5);
        this.infoPageHeadingContainer.add(infoPageText);
        this.infoPageContainer.add([infoPageScroolButton, upArrow, upArrowText, downArrow, downArrowText, roundStart, roundStartText, autoPlay, autoPlayText, startAutoPlay, startAutoPlayText, stopAutoPlay, stopAutoPlayText, menuButton, menuButtonText]);
        this.infoPageContainer.setVisible(false)
        this.infoPageHeadingContainer.setVisible(false)
    };
    CreatePayTable() {
        const getX = [-370, -100, 185, -370, -100, 185, -370, -100, 185, -370, -100, 185, -370,];
        const getY = [-250, -250, -250, -60, -60, -60, 130, 130, 130, -250, -250, -250, -60];
        const getRegularPaytableData = Model.getRegularPaytable();
        console.log('get Regular', getRegularPaytableData);
        let symbolTextTextStyle = { fontFamily: 'Roboto', fontSize: '26px', fill: '#ffc844', fontStyle: 'bold', align: 'center' };
        let symbolTextTextStyle1 = { fontFamily: 'Roboto', fontSize: '26px', fill: '#FFF', fontStyle: 'bold', align: 'center' };
        let payTableTextStyle = { fontFamily: 'PR-Viking', fontSize: '41px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: this.menuPopupContainer.list[4] - 40 } };
        let payTableText = this.scene.add.text(-70, -275, "PAYTABLE", payTableTextStyle);
        payTableText.alpha = 1;
        getRegularPaytableData.forEach((element, index) => {
            const paytableCont = this.scene.add.container(0, 0);
            if (index < 9) {  
                let paytableElement = this.scene.add.image(getX[index], getY[index], "symbol_" + getRegularPaytableData[index].symbol).setScale(0.65);
                let paytableText1 = this.scene.add.text(paytableElement.x + 70, paytableElement.y - 70, "x5 -", symbolTextTextStyle);
                let paytableText2 = this.scene.add.text(paytableElement.x + 70, paytableElement.y - 30, "x4 -", symbolTextTextStyle);
                let paytableText3 = this.scene.add.text(paytableElement.x + 70, paytableElement.y + 10, "x3 -", symbolTextTextStyle);
                let paytableText4 = this.scene.add.text(paytableElement.x + 70, paytableElement.y + 50, "x2 -", symbolTextTextStyle);
                let paytableValueText1 = this.scene.add.text(paytableText1.x + 50, paytableText1.y, getRegularPaytableData[index].paytable[4], symbolTextTextStyle1).setOrigin(0);
                let paytableValueText2 = this.scene.add.text(paytableText2.x + 50, paytableText2.y, getRegularPaytableData[index].paytable[3], symbolTextTextStyle1).setOrigin(0);
                let paytableValueText3 = this.scene.add.text(paytableText3.x + 50, paytableText3.y, getRegularPaytableData[index].paytable[2], symbolTextTextStyle1).setOrigin(0);
                let paytableValueText4 = this.scene.add.text(paytableText4.x + 50, paytableText4.y, getRegularPaytableData[index].paytable[1], symbolTextTextStyle1).setOrigin(0);
                paytableCont.add([paytableElement, paytableText1, paytableText2, paytableText3, paytableText4, paytableValueText1, paytableValueText2, paytableValueText3, paytableValueText4]);
            } else {
                let paytableElement = this.scene.add.image(getX[index], getY[index], "symbol_" + getRegularPaytableData[index].symbol).setScale(0.65);
                let paytableText1 = this.scene.add.text(paytableElement.x + 70, paytableElement.y - 70, "x5 -", symbolTextTextStyle);
                let paytableText2 = this.scene.add.text(paytableElement.x + 70, paytableElement.y - 30, "x4 -", symbolTextTextStyle);
                let paytableText3 = this.scene.add.text(paytableElement.x + 70, paytableElement.y + 10, "x3 -", symbolTextTextStyle);
                let paytableText4 = this.scene.add.text(paytableElement.x + 70, paytableElement.y + 50, "x2 -", symbolTextTextStyle);
                let paytableValueText1 = this.scene.add.text(paytableText1.x + 50, paytableText1.y, getRegularPaytableData[index].paytable[4], symbolTextTextStyle1).setOrigin(0);
                let paytableValueText2 = this.scene.add.text(paytableText2.x + 50, paytableText2.y, getRegularPaytableData[index].paytable[3], symbolTextTextStyle1).setOrigin(0);
                let paytableValueText3 = this.scene.add.text(paytableText3.x + 50, paytableText3.y, getRegularPaytableData[index].paytable[2], symbolTextTextStyle1).setOrigin(0);
                let paytableValueText4 = this.scene.add.text(paytableText4.x + 50, paytableText4.y, getRegularPaytableData[index].paytable[1], symbolTextTextStyle1).setOrigin(0);
                paytableCont.add([paytableElement, paytableText1, paytableText2, paytableText3, paytableText4, paytableValueText1, paytableValueText2, paytableValueText3, paytableValueText4]);
            }
            this.payTableContainer.add(paytableCont);
        });
        this.leftscroll = this.scene.add.image(-400, +355, "arrow_button").setAngle(-90).setInteractive({ useHandCursor: true });
        this.rightscroll = this.scene.add.image(350, +355, "arrow_button").setAngle(90).setInteractive({ useHandCursor: true });
        this.payTableHeadingContainer.add([this.leftscroll, this.rightscroll]);
        this.leftscroll.on('pointerup', this.ShowPrevPaytable, this);
        this.rightscroll.on('pointerup', this.ShowNextPaytable, this);
        this.payTableHeadingContainer.add(payTableText);
        this.payTableContainer.setVisible(false);
        this.payTableHeadingContainer.setVisible(false);
    };
    ShowPrevPaytable() {
        this.payTableContainer.list.forEach((element, index) => {
            if (index < 9) {
                element.setVisible(true);
            } else {
                element.setVisible(false);
            }
        });
    }
    ShowNextPaytable() {
        this.payTableContainer.list.forEach((element, index) => {
            if (index >= 9 && index < 13) {
                element.setVisible(true);
            } else {
                element.setVisible(false);
            }
        });
    }

    CreateSettingsTable() {
        let settingsPageTitleStyle = { fontFamily: 'PR-Viking', fontSize: '41px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: this.menuPopupContainer.list[4].width - 40 } };
        let normalTextStyle = { fontFamily: 'arial', fontSize: '25px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: 390 } };
        let normalTextStyle1 = { fontFamily: 'arial', fontSize: '30px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: 390 } };
        this.settingsPageTitleText = this.scene.add.text(-7, -305, "Settings", settingsPageTitleStyle).setOrigin(0.5);
        this.buttonUseSpaceBar = this.scene.add.sprite(-280, -205, "button_onof").setOrigin(0.5, 0.5).setInteractive({ cursor: 'grabbing' }).setAlpha(0);
        // buttonUseSpaceBar.on("pointerdown", this.OnButtonSpaceBarPress, this);
        this.buttonUseSpaceBarText = this.scene.add.text(-40, -205, 'Use Spacebar to play', normalTextStyle).setOrigin(0.5).setAlpha(0);
        this.soundEffectText = this.scene.add.text(-235, -105, 'Sound Effects', normalTextStyle).setOrigin(0.5);
        this.buttonSoundeffectsBar = this.scene.add.image(65, -105, 'ButtonSoundeffects').setOrigin(0.5);
        this.soundEffectFrequencyText = this.scene.add.text(270, -105, this.soundEffectFrequency, normalTextStyle1).setOrigin(0.5);
        this.soundEffectScroller = this.scene.rexUI.add.slider({
            x: 65,
            y: -108,
            width: 300,
            orientation: 'x',
            reverseAxis: true,
            thumb: this.scene.add.image(175, -105, "RockSoundEffect"),

        })
            .layout();
        this.soundEffectScroller.on('valuechange', (newValue, oldValue, scrollBar, thumb) => {
            this.soundEffectFrequencyText.text = parseInt(100) - parseInt(newValue * 100)//.toFixed(2); 
            let additionalSoundFrequency = (1 - (newValue * 1)).toFixed(2);
            this.ReduceFrequencyOfAdditionalSounds(additionalSoundFrequency)
            this.CheckTheAdditionalSound();
        })
        this.bgMusicText = this.scene.add.text(-205, -5, 'Background Music', normalTextStyle).setOrigin(0.5);
        this.bgMusicBar = this.scene.add.image(65, -5, 'ButtonBackGorundMusic').setOrigin(0.5);
        this.bgMusicFrequencyText = this.scene.add.text(270, -5, this.bgMusicFrequency, normalTextStyle1).setOrigin(0.5);
        this.bgMusicScroller = this.scene.rexUI.add.slider({
            x: 65,
            y: -8,
            width: 300,
            orientation: 'x',
            reverseAxis: true,
            thumb: this.scene.add.image(175, 0, "RockSoundEffect"),//this.scene.rexUI.add.roundRectangle(0, 0, 40, 20, 10, COLOR_LIGHT),
        })
            .layout();

        this.bgMusicScroller.on('valuechange', (newValue, oldValue, scrollBar) => {
            bgMusicFrequencyText.text = parseInt(100) - parseInt(newValue * 100)//.toFixed(2);
            let bgMusicFrequency = (1 - (newValue * 1)).toFixed(2);
            SoundManager.backgroundSound.volume = bgMusicFrequency;
            this.CheckTheBackgroundSound()
        })
        this.fastPlayText = this.scene.add.text(-105, 95, 'Fast-Play', normalTextStyle).setOrigin(0.5).setAlpha(0);
        this.fastPlayButton = this.scene.add.sprite(-280, 95, "button_offon").setOrigin(0.5, 0.5).setInteractive({ cursor: 'grabbing' }).setAlpha(0);
        this.fastPlayButton.setFrame(1)
        // fastPlayButton.on("pointerdown", this.OnFastPlayButtonClicked, this);
        this.settingsPageHeadingContainer.add(this.settingsPageTitleText);
        this.settingsPageHeadingContainer.visible = false;
        this.settingsPageContainer.add([this.buttonUseSpaceBar, this.buttonUseSpaceBarText, this.fastPlayButton, this.soundEffectText, this.buttonSoundeffectsBar, this.soundEffectFrequencyText, this.bgMusicText, this.bgMusicBar, this.bgMusicFrequencyText, this.fastPlayText, this.soundEffectScroller, this.bgMusicScroller]);

        this.settingsPageContainer.setVisible(false);

    }

    CreatePaylineInfo() {
        let normalTextStyle = { fontFamily: 'PR-Viking', fontSize: '41px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: this.menuPopupContainer.list[4].width - 40 } };
        this.payLineHeadText = this.scene.add.text(-100, -375, 'PAYLINES', normalTextStyle);
        let count = 0;
        let maxItems = 20;
        let itemsPerRow = 4;
        let startX = -340;
        let startY = -280;
        let xOffset = 210;
        let yOffset = 120;

        for (let index = 0; index < maxItems; index++) {
            let xPosition = startX + (index % itemsPerRow) * xOffset;
            let yPosition = startY + Math.floor(index / itemsPerRow) * yOffset;
            const element = this.scene.add.image(xPosition, yPosition, 'payline-icon-' + index);
            this.payLineContainer.add(element);
        }
        this.payLineContainer.add(this.payLineHeadText)
        this.payLineContainer.setVisible(false);
    }
    CheckTheAdditionalSound() {
        if (this.settingsPageContainer.list[5]._text == 0) {
            this.menuPopupContainer.list[7].setFrame(0)
        }
        else {
            this.menuPopupContainer.list[7].setFrame(1)
        }
    }
    CheckTheBackgroundSound() {
        if (this.settingsPageContainer.list[8]._text == 0) {
            this.menuPopupContainer.list[8].setFrame(0)
        }
        else {
            this.menuPopupContainer.list[8].setFrame(1)
        }
    }
    ReduceFrequencyOfAdditionalSounds(_offset) {
    }
    OnButtonSpaceBarPress() {
        if (Constant.isMobile) {

        }
        else {
            this.spaceBarBtnCounter += 1;
            if (this.spaceBarBtnCounter % 2 == 1) {
                this.settingsPageContainer.list[0].setFrame(1)
                this.isSpacebarClicked = false;
                // this.scene.bottomPanel.DisableSpaceBar();
            }
            else {
                this.settingsPageContainer.list[0].setFrame(0)
                this.isSpacebarClicked = true;
                // this.scene.bottomPanel.EnableSpaceBar();
            }
        }
    }
    OnFastPlayButtonClicked() {
        this.fastPlayBtnClicked += 1;
        if (this.fastPlayBtnClicked % 2 == 1) {
            this.settingsPageContainer.list[1].setFrame(0)
            this.isFastPlay = true;
        }
        else {
            this.settingsPageContainer.list[1].setFrame(1)
            this.isFastPlay = false;
        }
    }

    SoundButtonPressed() {
    };
    SoundButtonReleased() {
        SoundManager.ButtonClickSound();
        this.ToggleSoundButton(this);
    };
    MusicButtonPressed() {
    };
    MusicButtonReleased() {
        SoundManager.ButtonClickSound();
        this.ToggleMusicButton(this);
    };
    HomeButtonPressed() {
        SoundManager.HidePopup();
    };
    HomeButtonReleased() {
        SoundManager.ButtonClickSound();
        this.scene.gameUI.menuContainer.setVisible(true);
        SoundManager.ButtonClickSound();
        this.HideMenuPopup();
        this.DisableButtons();
    };
    CrossButtonPressed() {
        SoundManager.HidePopup();
    };

    CrossButtonReleased() {
        this.scene.gameUI.menuContainer.setVisible(true);
        SoundManager.ButtonClickSound();
        this.HideMenuPopup();
        this.DisableButtons();
    };

    ShowMenuPopup(_message) {
        this.menuPopupContainer.setVisible(true);
        let alphaTween = this.scene.add.tween({
            targets: [this.menuPopupContainer],
            alpha: 1,
            ease: 'Linear',
            duration: 200
        });
        this.EnableSeletedButton(this.payTableButton);
        this.ShowPaytableContainer();
    };
    HideMenuPopup() {
        let alphaTween = this.scene.add.tween({
            targets: [this.menuPopupContainer],
            alpha: 0,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) { }
        });
        this.DisableButtons();
        this.menuPopupContainer.setVisible(false)
    };
    DisableButtons() {
        this.payTableContainer.setVisible(false);
        this.payTableHeadingContainer.setVisible(false)
        this.infoPageContainer.setVisible(false)
        this.infoPageHeadingContainer.setVisible(false);
        this.settingsPageContainer.setVisible(false);
        this.settingsPageHeadingContainer.setVisible(false);

        if (this.payTableGraphics && this.infoPageGraphics) {
            this.payTableGraphics.disableInteractive();
            this.infoPageGraphics.disableInteractive();
        }
    };
    EnableSeletedButton(_button) {
        if (_button.texture.key == "paytable_button_normal") {
            this.payTableButton.setTexture('paytable_button_glow');
            this.settingsButton.setTexture('settings_button_normal');
            this.infoButton.setTexture('info_button_normal');
            this.payLineButton.setTexture('payline_button_normal');
            this.ShowPaytableContainer();
        }
        else if (_button.texture.key == "settings_button_normal") {
            this.payTableButton.setTexture('paytable_button_normal');
            this.settingsButton.setTexture('settings_button_glow');
            this.infoButton.setTexture('info_button_normal');
            this.payLineButton.setTexture('payline_button_normal');
            this.ShowSettingsContainer();
        }
        else if (_button.texture.key == "info_button_normal") {
            this.payTableButton.setTexture('paytable_button_normal');
            this.settingsButton.setTexture('settings_button_normal');
            this.infoButton.setTexture('info_button_glow');
            this.payLineButton.setTexture('payline_button_normal');
            this.ShowInfoContainer();
        }
        else if (_button.texture.key == "payline_button_normal") {
            this.payLineButton.setTexture('payline_button_glow');
            this.payTableButton.setTexture('paytable_button_normal');
            this.settingsButton.setTexture('settings_button_normal');
            this.infoButton.setTexture('info_button_normal');
            this.ShowPaylineContainer();
        }
    };
    DisbleSeletedButton(_button) {
    };
    ShowPaytableContainer() {
        this.ShowPrevPaytable();
        this.payTableHeadingContainer.setVisible(true);
        this.payTableContainer.setVisible(true);
        this.settingsPageHeadingContainer.setVisible(false);
        this.settingsPageContainer.setVisible(false);
        this.infoPageHeadingContainer.setVisible(false);
        this.infoPageContainer.setVisible(false);
        this.payLineContainer.setVisible(false);
    }
    ShowPaylineContainer() {
        this.payTableHeadingContainer.setVisible(false);
        this.payTableContainer.setVisible(false);
        this.settingsPageHeadingContainer.setVisible(false);
        this.settingsPageContainer.setVisible(false);
        this.infoPageHeadingContainer.setVisible(false);
        this.infoPageContainer.setVisible(false);
        this.payLineContainer.setVisible(true);
    }
    ShowSettingsContainer() {
        this.payTableHeadingContainer.setVisible(false);
        this.payTableContainer.setVisible(false);
        this.settingsPageHeadingContainer.setVisible(true);
        this.settingsPageContainer.setVisible(true);
        this.infoPageHeadingContainer.setVisible(false);
        this.infoPageContainer.setVisible(false);
        this.payLineContainer.setVisible(false);
    }
    ShowInfoContainer() {
        this.payTableHeadingContainer.setVisible(false);
        this.payTableContainer.setVisible(false);
        this.settingsPageHeadingContainer.setVisible(false);
        this.settingsPageContainer.setVisible(false);
        this.infoPageHeadingContainer.setVisible(true);
        this.infoPageContainer.setVisible(true);
        this.payLineContainer.setVisible(false);
    }

    ShowSeletedMenuData(_this) {
        this.scene.gameUI.menuContainer.setVisible(false);
        let name = _this.texture.key;
        if (name.includes("settings_menu_base")) {
        }
        if (name.includes("paytable") || name.includes("settings_menu_base")) {


            this.infoPageContainer.setVisible(false)
            this.infoPageHeadingContainer.setVisible(false)


            this.settingsPageHeadingContainer.setVisible(false);
            this.settingsPageContainer.setVisible(false);


            if (this.infoPageGraphics) {
                this.infoPageGraphics.disableInteractive();
            }
            this.menuPopupContainer.list[2].setAlpha(1);
            this.menuPopupContainer.list[3].setAlpha(0.5);
            this.menuPopupContainer.list[4].setAlpha(0.5);
            this.payTableContainer.setVisible(true);
            this.payTableHeadingContainer.setVisible(true);
            if (this.payTableGraphics) {
                this.payTableGraphics.setInteractive();
            }
        }
        else if (name.includes("info")) {
            this.payTableContainer.setVisible(false);
            this.payTableHeadingContainer.setVisible(false);

            this.settingsPageHeadingContainer.setVisible(false);
            this.settingsPageContainer.setVisible(false);

            if (this.payTableGraphics) {
                this.payTableGraphics.disableInteractive();
            }
            this.menuPopupContainer.list[3].setAlpha(1);
            this.menuPopupContainer.list[2].setAlpha(0.5);
            this.menuPopupContainer.list[4].setAlpha(0.5);
            this.infoPageContainer.setVisible(true)
            this.infoPageHeadingContainer.setVisible(true);
            if (this.infoPageGraphics) {
                this.infoPageGraphics.setInteractive();
            }
        }
        else if (name.includes("button_game_settings")) {
            this.infoPageContainer.setVisible(false);
            this.infoPageHeadingContainer.setVisible(false);
            this.payTableContainer.setVisible(false);
            this.payTableHeadingContainer.setVisible(false);

            this.menuPopupContainer.list[4].setAlpha(1);
            this.menuPopupContainer.list[2].setAlpha(0.5);
            this.menuPopupContainer.list[3].setAlpha(0.5);
            this.settingsPageContainer.setVisible(true);
            this.settingsPageHeadingContainer.setVisible(true);
        }
    };

    DefaultMusicButton() {
        if (localStorage.getItem("slot_game_is_music_on") == null) {
            localStorage.setItem("slot_game_is_music_on", 1);
        }
        if (localStorage.getItem("slot_game_is_music_on") == 1) {
            this.musicButton.setFrame(1);
        } else {
            this.musicButton.setFrame(0);
        }
    };
    ToggleMusicButton(_this) {
        if (localStorage.getItem("slot_game_is_music_on") == 1) {
            localStorage.setItem("slot_game_is_music_on", 0);
            this.musicButton.setFrame(0);
            SoundManager.StopGameBgSound();
            this.settingsPageContainer.list[12].children[0].setPosition(-65, 0);
            this.settingsPageContainer.list[8].setText(0);
        } else {
            localStorage.setItem("slot_game_is_music_on", 1);
            this.musicButton.setFrame(1);
            SoundManager.PlayGameBgSound();
            this.settingsPageContainer.list[12].children[0].setPosition(175, 0);
            this.settingsPageContainer.list[8].setText(100);
        }
    };

    DefaultSoundButton() {
        if (localStorage.getItem("slot_game_is_sound_on") == null) {
            localStorage.setItem("slot_game_is_sound_on", 1);
        }
        if (localStorage.getItem("slot_game_is_sound_on") == 1) {
            this.soundButton.setFrame(1);
        } else {
            this.soundButton.setFrame(0);
        }
    };
    ToggleSoundButton(_this) {
        if (localStorage.getItem("slot_game_is_sound_on") == 1) {
            localStorage.setItem("slot_game_is_sound_on", 0);
            this.soundButton.setFrame(0);
            if (this.settingsPageContainer.list[5]._text > 0) {
                this.settingsPageContainer.list[10].children[0].setPosition(-65, -100);
                this.settingsPageContainer.list[5].setText(0);
            }
            this.isToggledSound = false;
        } else {
            localStorage.setItem("slot_game_is_sound_on", 1);
            this.soundButton.setFrame(1);
            this.isToggledSound = true;
            this.settingsPageContainer.list[10].children[0].setPosition(175, -105);
            this.settingsPageContainer.list[5].setText(100);
        }
    };
    ToggleSoundButtonOnDrag() {
        if (this.settingsPageContainer.list[5]._text > 0) {
            if (this.isToggledSound == true) {
                this.settingsPageContainer.list[10].children[0].setPosition(175, -105);
                this.settingsPageContainer.list[5].setText(100);
            }
            else {
                this.settingsPageContainer.list[10].children[0].setPosition(-65, -100);
                this.settingsPageContainer.list[5].setText(0);
            }
        }
    }
    OverlayPressed() { };

};
export default MenuPopup;