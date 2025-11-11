import { Constant } from "../Constant.js";
import { ButtonScaleDownTween } from "../Utils.js";
import { ButtonScaleUpTween } from "../Utils.js";
import { SoundManager } from '../SoundManager.js';
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
    };


    CreateMenuPopup() {
        let base, payTableButton, infoButton, settingsButton, timeButton, soundButton, musicButton, homeButton, crossButton, overlay;

        overlay = this.scene.add.image(0, 0, "one_pixel_black").setScale(5000);
        overlay.alpha = 0.85;

        overlay.setInteractive();
        overlay.on("pointerdown", this.OverlayPressed, this);
        this.menuPopupContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.payTableContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.infoPageContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.payTableHeadingContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.infoPageHeadingContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.settingsPageHeadingContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.settingsPageContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        //#region - Top Buttons ========================//

        if (Constant.isPortrait) {
            base = this.scene.add.image(0, 180, "settings_menu_base").setOrigin(0.5).setScale(1.4, 1.3);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY * 1.05);
            payTableButton = this.scene.add.image(-164, -395, "button_paytable").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            infoButton = this.scene.add.image(-30, -395, "button_info").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            settingsButton = this.scene.add.image(95, -395, "button_game_settings").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            timeButton = this.scene.add.image(230, -395, "button_right").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            soundButton = this.scene.add.image(440, -850, "sound_button").setOrigin(0.5).setScale(1);//.setScale(Constant.scaleFactorX * 0.7, Constant.scaleFactorY * 0.7);
            musicButton = this.scene.add.image(440, -700, "music_button").setOrigin(0.5).setScale(1);//.setScale(Constant.scaleFactorX * 0.7, Constant.scaleFactorY * 0.7);
            homeButton = this.scene.add.image(-440, -850, "button_close_game").setOrigin(0.5).setScale(1);//.setScale(Constant.scaleFactorX * 0.7, Constant.scaleFactorY * 0.7);
            crossButton = this.scene.add.image(420, -320, "button_close_menu").setOrigin(0.5).setScale(1);//.setScale(Constant.scaleFactorX * 0.7, Constant.scaleFactorY * 0.7);

        }
        else {
            base = this.scene.add.image(0, -5, "settings_menu_base").setOrigin(0.5).setScale(1, 1.05);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY * 1.05);
            payTableButton = this.scene.add.image(-125, -468, "button_paytable").setOrigin(0.5).setScale(0.9).setAlpha(1);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            infoButton = this.scene.add.image(-37, -468, "button_info").setOrigin(0.5).setScale(0.9).setAlpha(0.5);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            settingsButton = this.scene.add.image(47, -466, "button_game_settings").setOrigin(0.5).setScale(0.9).setAlpha(0.5);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            timeButton = this.scene.add.image(137, -468, "button_right").setOrigin(0.5).setScale(0.9).setAlpha(0.5);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            soundButton = this.scene.add.image(840, -345, "sound_button").setOrigin(0.5).setScale(0.7).setAlpha(0.6);//.setScale(Constant.scaleFactorX * 0.7, Constant.scaleFactorY * 0.7);
            musicButton = this.scene.add.image(840, -255, "music_button").setOrigin(0.5).setScale(0.7).setAlpha(0.6);//.setScale(Constant.scaleFactorX * 0.7, Constant.scaleFactorY * 0.7);
            homeButton = this.scene.add.image(840, -165, "button_close_game").setOrigin(0.5).setScale(0.7).setAlpha(0.6);//.setScale(Constant.scaleFactorX * 0.7, Constant.scaleFactorY * 0.7);
            crossButton = this.scene.add.image(840, -438, "button_close_menu").setOrigin(0.5).setScale(0.7).setAlpha(0.6);//.setScale(Constant.scaleFactorX * 0.7, Constant.scaleFactorY * 0.7);

        }

        //#Paytable Button
        payTableButton.setInteractive({ useHandCursor: true });
        // payTableButton.on("pointerdown", this.PayTableButtonPressed, this);
        payTableButton.on("pointerup", this.PayTableButtonReleased);

        //#Info Button
        infoButton.setInteractive({ useHandCursor: true });
        // infoButton.on("pointerdown", this.InfoButtonPressed, this);
        infoButton.on("pointerup", this.InfoButtonReleased);

        //#Settings Button
        settingsButton.setInteractive({ useHandCursor: true });
        // settingsButton.on("pointerdown", this.SettingsButtonPressed, this);
        settingsButton.on("pointerup", this.SettingsButtonReleased);

        //#Time Button
        timeButton.setInteractive({ useHandCursor: true });
        // timeButton.on("pointerdown", this.TimeButtonPressed, this);
        timeButton.on("pointerup", this.TimeButtonReleased);

        //#Sound Button
        soundButton.setInteractive({ useHandCursor: true });
        soundButton.on('pointerover', this.SoundButtonOver, this);
        soundButton.on('pointerout', this.SoundButtonOut, this);
        soundButton.on("pointerdown", this.SoundButtonPressed);
        soundButton.on("pointerup", this.SoundButtonReleased);
        soundButton.setFrame(1);
        localStorage.setItem("slot_game_is_sound_on", 1);

        //#Music Button
        musicButton.setInteractive({ useHandCursor: true });
        musicButton.on('pointerover', this.MusicButtonOver, this);
        musicButton.on('pointerout', this.MusicButtonOut, this);
        musicButton.on("pointerdown", this.MusicButtonPressed);
        musicButton.on("pointerup", this.MusicButtonReleased);
        musicButton.setFrame(1);
        localStorage.setItem("slot_game_is_music_on", 1);

        //#Home Button
        homeButton.setInteractive({ useHandCursor: true });
        homeButton.on('pointerover', this.HomeButtonOver, this);
        homeButton.on('pointerout', this.HomeButtonOut, this);
        homeButton.on("pointerdown", this.HomeButtonPressed, this);
        homeButton.on("pointerup", this.HomeButtonReleased, this);

        //#Cross Button
        crossButton.setInteractive({ useHandCursor: true });
        crossButton.on('pointerover', this.CrossButtonOver, this);
        crossButton.on('pointerout', this.CrossButtonOut, this);
        crossButton.on("pointerdown", this.CrossButtonPressed, this);
        crossButton.on("pointerup", this.CrossButtonReleased, this);




        this.menuPopupContainer.add(overlay);
        this.menuPopupContainer.add(payTableButton);
        this.menuPopupContainer.add(infoButton);
        this.menuPopupContainer.add(settingsButton);
        this.menuPopupContainer.add(timeButton);
        this.menuPopupContainer.add(base);
        this.menuPopupContainer.add(crossButton);
        this.menuPopupContainer.add(soundButton);
        this.menuPopupContainer.add(musicButton);
        this.menuPopupContainer.add(homeButton);

        //#endregion

        //#region - Pay Table Creation - 
        this.CreatePayTable();
        //#endregion
        //#region - Pay Table Creation - 
        this.CreateInfoPage();
        //#endregion
        this.CreateSettingsTable();

        // console.log(this.menuPopupContainer.list);

        this.menuPopupContainer.setDepth(5);
        this.payTableContainer.setDepth(5);
        this.payTableHeadingContainer.setDepth(5);
        this.infoPageContainer.setDepth(5);
        this.infoPageHeadingContainer.setDepth(5);
        this.settingsPageContainer.setDepth(5);
        this.settingsPageHeadingContainer.setDepth(5);
        this.menuPopupContainer.alpha = 0;

        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.CreatePaytableScroller();
                this.CreateInfoScroller();
            }
        }
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
                // console.log("payTableContainer");
                this.payTableContainer.y = value;
            }
        });

        // this.scroller.enable = false;
        this.scroller.dragDistanceThreshold = 1;
        this.scroller.dragThreshold = 1;
        this.payTableGraphics.disableInteractive();
        // console.log(" this.scroller ", this.scroller);
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
        this.scene.menuPopup.EnableSeletedButton(this);
    };
    InfoButtonReleased() {
        this.scene.menuPopup.EnableSeletedButton(this);
    };
    SettingsButtonReleased() {
        this.scene.menuPopup.EnableSeletedButton(this);
    };
    TimeButtonReleased() {
        this.scene.menuPopup.EnableSeletedButton(this);
    };

    MusicButtonOver() {
        // console.log(this.scene.menuPopup.menuPopupContainer)
        this.scene.menuPopup.menuPopupContainer.each((element) => {
            let name = element.texture.key;
            if (name == 'music_button') {
                element.setAlpha(1);
            } else if (name == "sound_button" || name == "button_close_game" || name == "button_close_menu") {
                element.setAlpha(0.6);
            } else {

            }
        });
    }
    SoundButtonOver() {
        // console.log(this.scene.menuPopup.menuPopupContainer)
        this.scene.menuPopup.menuPopupContainer.each((element) => {
            let name = element.texture.key;
            // console.log(name)
            if (name == 'sound_button') {
                element.setAlpha(1);
            } else if (name == "music_button" || name == "button_close_game" || name == "button_close_menu") {
                element.setAlpha(0.6);
            } else {
                // element.setAlpha(0.6);
            }
        });
    }
    HomeButtonOver() {
        // console.log(this.scene.menuPopup.menuPopupContainer)
        this.scene.menuPopup.menuPopupContainer.each((element) => {
            let name = element.texture.key;
            // console.log(name)
            if (name == 'button_close_game') {
                element.setAlpha(1);
            } else if (name == "sound_button" || name == "music_button" || name == "button_close_menu") {
                element.setAlpha(0.6);
            } else {
                // element.setAlpha(0.6);
            }
        });
    }

    CrossButtonOver() {
        this.scene.menuPopup.menuPopupContainer.each((element) => {
            let name = element.texture.key;
            if (name == 'button_close_menu') {
                element.setAlpha(1);
            } else if (name == "sound_button" || name == "button_close_game" || name == "music_button") {
                element.setAlpha(0.6);
            } else {
            }
        });
    }

    MusicButtonOut() { };
    HomeButtonOut() { };
    SoundButtonOut() { };
    CrossButtonOut() { };

    CreateInfoPage() {
        let infoPageText, upArrow, upArrowText, downArrow, downArrowText, roundStart, roundStartText, autoPlay, autoPlayText,
            startAutoPlay, startAutoPlayText, stopAutoPlay, stopAutoPlayText, menuButton, menuButtonText, infoPageScroolButton
        if (Constant.isPortrait) {
            let infoPageTextStyle = { fontFamily: 'PR-Viking', fontSize: '55px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: this.menuPopupContainer.list[4].width - 40 } };
            let normalTextStyle = { fontFamily: 'arial', fontSize: '40px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: 390 } };

            infoPageText = this.scene.add.text(-7, -315, "INFO", infoPageTextStyle).setOrigin(0.5);
            infoPageText.alpha = 0.7;
            infoPageScroolButton = this.scene.add.image(5513, -330, "button_scroll").setOrigin(0.5).setScale(1);

            upArrow = this.scene.add.image(-240, -160, "arrow_button").setOrigin(0.5).setScale(0.5).setScale(1.2);
            upArrowText = this.scene.add.text(100, -160, "Increase bet level", normalTextStyle).setOrigin(0.5);

            downArrow = this.scene.add.image(upArrow.x, upArrow.y + 200, "arrow_button").setOrigin(0.5).setScale(1.2);
            downArrow.angle = 180;
            downArrowText = this.scene.add.text(upArrowText.x, downArrow.y, "Decrease bet level", normalTextStyle).setOrigin(0.5);

            roundStart = this.scene.add.image(upArrow.x, downArrow.y + 200, "button_start_game_round").setOrigin(0.5).setScale(1.2);
            roundStartText = this.scene.add.text(upArrowText.x, roundStart.y, "Start the game round", normalTextStyle).setOrigin(0.5);

            autoPlay = this.scene.add.image(upArrow.x, roundStart.y + 200, "auto_spin_button").setOrigin(0.5).setScale(1.2);
            autoPlayText = this.scene.add.text(upArrowText.x, autoPlay.y, "Open the Autoplay menu", normalTextStyle).setOrigin(0.5);

            startAutoPlay = this.scene.add.image(upArrow.x, autoPlay.y + 200, "button_star_autoplay").setOrigin(0.5).setScale(0.5);
            startAutoPlayText = this.scene.add.text(upArrowText.x, startAutoPlay.y, "Start Autoplay", normalTextStyle).setOrigin(0.5);

            stopAutoPlay = this.scene.add.image(upArrow.x, startAutoPlay.y + 200, "button_stop_autoplay").setOrigin(0.5).setScale(1.2);
            stopAutoPlayText = this.scene.add.text(upArrowText.x, stopAutoPlay.y, "Stop Autoplay", normalTextStyle).setOrigin(0.5);

            menuButton = this.scene.add.image(upArrow.x, stopAutoPlay.y + 200, "menu").setOrigin(0.5).setScale(1.2);
            menuButtonText = this.scene.add.text(upArrowText.x, menuButton.y, "Open the menu to access the Paytable,Settings and other options", normalTextStyle).setOrigin(0.5);

        }
        else {
            let infoPageTextStyle = { fontFamily: 'PR-Viking', fontSize: '41px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: this.menuPopupContainer.list[4].width - 40 } };
            let normalTextStyle = { fontFamily: 'arial', fontSize: '20px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: 390 } };

            infoPageText = this.scene.add.text(-7, -405, "INFO", infoPageTextStyle).setOrigin(0.5);
            infoPageText.alpha = 0.7;
            infoPageScroolButton = this.scene.add.image(513, -330, "button_scroll").setOrigin(0.5).setScale(0.65);//.setScale(Constant.scaleFactorX * 0.65, Constant.scaleFactorY * 0.65);

            upArrow = this.scene.add.image(-400, -300, "arrow_button").setOrigin(0.5).setScale(0.5);//.setScale(Constant.scaleFactorX * 0.5, Constant.scaleFactorY * 0.5);
            upArrowText = this.scene.add.text(-220, -300, "Increase bet level", normalTextStyle).setOrigin(0.5);

            downArrow = this.scene.add.image(-400, -210, "arrow_button").setOrigin(0.5).setScale(0.5);//.setScale(Constant.scaleFactorX * 0.5, Constant.scaleFactorY * 0.5);
            downArrow.angle = 180;
            downArrowText = this.scene.add.text(-217, -210, "Decrease bet level", normalTextStyle).setOrigin(0.5);

            roundStart = this.scene.add.image(-400, -120, "button_start_game_round").setOrigin(0.5).setScale(0.5);//.setScale(Constant.scaleFactorX * 0.5, Constant.scaleFactorY * 0.5);
            roundStartText = this.scene.add.text(-209, -120, "Start the game round", normalTextStyle).setOrigin(0.5);

            autoPlay = this.scene.add.image(-400, -30, "auto_spin_button").setOrigin(0.5).setScale(0.5);//.setScale(Constant.scaleFactorX * 0.5, Constant.scaleFactorY * 0.5);
            autoPlayText = this.scene.add.text(-195, -30, "Open the Autoplay menu", normalTextStyle).setOrigin(0.5);

            startAutoPlay = this.scene.add.image(-400, 60, "button_star_autoplay").setOrigin(0.5).setScale(0.24)//.setScale(0.5);//.setScale(Constant.scaleFactorX * 0.5, Constant.scaleFactorY * 0.5);
            startAutoPlayText = this.scene.add.text(-230, 60, "Start Autoplay", normalTextStyle).setOrigin(0.5);

            stopAutoPlay = this.scene.add.image(-400, 150, "button_stop_autoplay").setOrigin(0.5).setScale(0.5);//.setScale(Constant.scaleFactorX * 0.5, Constant.scaleFactorY * 0.5);
            stopAutoPlayText = this.scene.add.text(-230, 150, "Stop Autoplay", normalTextStyle).setOrigin(0.5);

            menuButton = this.scene.add.image(-400, 240, "menu").setOrigin(0.5).setScale(0.5);//.setScale(Constant.scaleFactorX * 0.5, Constant.scaleFactorY * 0.5);
            menuButtonText = this.scene.add.text(-80, 240, "Open the menu to access the Paytable,Settings and other options", normalTextStyle).setOrigin(0.5);

        }


        this.infoPageHeadingContainer.add(infoPageText);
        this.infoPageContainer.add(infoPageScroolButton);
        this.infoPageContainer.add(upArrow);
        this.infoPageContainer.add(upArrowText);
        this.infoPageContainer.add(downArrow);
        this.infoPageContainer.add(downArrowText);
        this.infoPageContainer.add(roundStart);
        this.infoPageContainer.add(roundStartText);
        this.infoPageContainer.add(autoPlay);
        this.infoPageContainer.add(autoPlayText);
        this.infoPageContainer.add(startAutoPlay);
        this.infoPageContainer.add(startAutoPlayText);
        this.infoPageContainer.add(stopAutoPlay);
        this.infoPageContainer.add(stopAutoPlayText);
        this.infoPageContainer.add(menuButton);
        this.infoPageContainer.add(menuButtonText);
        this.infoPageContainer.setVisible(false)
        this.infoPageHeadingContainer.setVisible(false)
    };
    CreatePayTable() {
        let symbol1, symbol1Text1, symbol1Text2, symbol1Text3, symbol2, symbol2Text1, symbol2Text2, symbol2Text3,
            symbol3, symbol3Text1, symbol3Text2, symbol3Text3, symbol4, symbol4Text1, symbol4Text2, symbol4Text3,
            symbol5, symbol5Text1, symbol5Text2, symbol5Text3, symbol6, symbol6Text1, symbol6Text2, symbol6Text3,
            symbol7, symbol7Text1, symbol7Text2, symbol7Text3, symbol8, symbol8Text1, symbol8Text2, symbol8Text3,
            symbol9, symbol9Text1, symbol9Text2, symbol9Text3, symbol10, symbol10Text1, symbol10Text2, symbol10Text3,
            payTableText, payTableScroolButton;
        if (Constant.isPortrait) {
            let payTableTextStyle = { fontFamily: 'PR-Viking', fontSize: '55px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: this.menuPopupContainer.list[4].width - 40 } };
            payTableText = this.scene.add.text(-7, -315, "PAYTABLE", payTableTextStyle).setOrigin(0.5);
            payTableText.alpha = 0.7;

            let symbolTextTextStyle = { fontFamily: 'arial', fontSize: '56px', fill: '#FFF', fontStyle: 'normal', align: 'center' };
            symbol1 = this.scene.add.image(-230, -70, "symbol_character_1").setOrigin(0.5).setScale(1.4);//Constant.scaleFactorX * 0.65, Constant.scaleFactorY * 0.65);
            symbol1Text1 = this.scene.add.text(150, -120, "5     FUN2.00", symbolTextTextStyle).setOrigin(0.5);
            symbol1Text2 = this.scene.add.text(150, -50, "4     FUN1.00", symbolTextTextStyle).setOrigin(0.5);
            symbol1Text3 = this.scene.add.text(150, 20, "3     FUN0.60", symbolTextTextStyle).setOrigin(0.5);

            symbol2 = this.scene.add.image(symbol1.x, symbol1.y + 350, "symbol_character_2").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX * 0.65, Constant.scaleFactorY * 0.65);
            symbol2Text1 = this.scene.add.text(symbol1Text1.x, symbol2.y - 60, "5     FUN1.50", symbolTextTextStyle).setOrigin(0.5);
            symbol2Text2 = this.scene.add.text(symbol1Text1.x, symbol2.y + 10, "4     FUN0.80", symbolTextTextStyle).setOrigin(0.5);
            symbol2Text3 = this.scene.add.text(symbol1Text1.x, symbol2.y + 80, "3     FUN0.50", symbolTextTextStyle).setOrigin(0.5); 340

            symbol3 = this.scene.add.image(symbol1.x, symbol2.y + 350, "symbol_character_3").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX * 0.65, Constant.scaleFactorY * 0.65);
            symbol3Text1 = this.scene.add.text(symbol1Text1.x, symbol3.y - 60, "5     FUN1.00", symbolTextTextStyle).setOrigin(0.5);
            symbol3Text2 = this.scene.add.text(symbol1Text1.x, symbol3.y + 10, "4     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol3Text3 = this.scene.add.text(symbol1Text1.x, symbol3.y + 80, "3     FUN0.40", symbolTextTextStyle).setOrigin(0.5);

            symbol4 = this.scene.add.image(symbol1.x, symbol3.y + 350, "symbol_character_4").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX * 0.65, Constant.scaleFactorY * 0.65);
            symbol4Text1 = this.scene.add.text(symbol1Text1.x, symbol4.y - 60, "5     FUN1.00", symbolTextTextStyle).setOrigin(0.5);
            symbol4Text2 = this.scene.add.text(symbol1Text1.x, symbol4.y + 10, "4     FUN0.50", symbolTextTextStyle).setOrigin(0.5);
            symbol4Text3 = this.scene.add.text(symbol1Text1.x, symbol4.y + 80, "3     FUN0.30", symbolTextTextStyle).setOrigin(0.5);

            symbol5 = this.scene.add.image(symbol1.x, symbol4.y + 350, "symbol_a").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX * 0.65, Constant.scaleFactorY * 0.65);
            symbol5Text1 = this.scene.add.text(symbol1Text1.x, symbol5.y - 60, "5     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol5Text2 = this.scene.add.text(symbol1Text1.x, symbol5.y + 10, "4     FUN0.40", symbolTextTextStyle).setOrigin(0.5);
            symbol5Text3 = this.scene.add.text(symbol1Text1.x, symbol5.y + 80, "3     FUN0.20", symbolTextTextStyle).setOrigin(0.5);

            symbol6 = this.scene.add.image(symbol1.x, symbol5.y + 350, "symbol_k").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX * 0.65, Constant.scaleFactorY * 0.65);
            symbol6Text1 = this.scene.add.text(symbol1Text1.x, symbol6.y - 60, "5     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol6Text2 = this.scene.add.text(symbol1Text1.x, symbol6.y + 10, "4     FUN0.40", symbolTextTextStyle).setOrigin(0.5);
            symbol6Text3 = this.scene.add.text(symbol1Text1.x, symbol6.y + 80, "3     FUN0.20", symbolTextTextStyle).setOrigin(0.5);

            symbol7 = this.scene.add.image(symbol1.x, symbol6.y + 350, "symbol_q").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX * 0.65, Constant.scaleFactorY * 0.65);
            symbol7Text1 = this.scene.add.text(symbol1Text1.x, symbol7.y - 60, "5     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol7Text2 = this.scene.add.text(symbol1Text1.x, symbol7.y + 10, "4     FUN0.40", symbolTextTextStyle).setOrigin(0.5);
            symbol7Text3 = this.scene.add.text(symbol1Text1.x, symbol7.y + 80, "3     FUN0.20", symbolTextTextStyle).setOrigin(0.5);

            symbol8 = this.scene.add.image(symbol1.x, symbol7.y + 350, "symbol_j").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX * 0.65, Constant.scaleFactorY * 0.65);
            symbol8Text1 = this.scene.add.text(symbol1Text1.x, symbol8.y - 60, "5     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol8Text2 = this.scene.add.text(symbol1Text1.x, symbol8.y + 10, "4     FUN0.40", symbolTextTextStyle).setOrigin(0.5);
            symbol8Text3 = this.scene.add.text(symbol1Text1.x, symbol8.y + 80, "3     FUN0.20", symbolTextTextStyle).setOrigin(0.5);

            symbol9 = this.scene.add.image(symbol1.x, symbol8.y + 350, "symbol_10").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX * 0.65, Constant.scaleFactorY * 0.65);
            symbol9Text1 = this.scene.add.text(symbol1Text1.x, symbol9.y - 60, "5     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol9Text2 = this.scene.add.text(symbol1Text1.x, symbol9.y + 10, "4     FUN0.40", symbolTextTextStyle).setOrigin(0.5);
            symbol9Text3 = this.scene.add.text(symbol1Text1.x, symbol9.y + 80, "3     FUN0.20", symbolTextTextStyle).setOrigin(0.5);

            symbol10 = this.scene.add.image(symbol1.x, symbol9.y + 350, "symbol_9").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX * 0.65, Constant.scaleFactorY * 0.65);
            symbol10Text1 = this.scene.add.text(symbol1Text1.x, symbol10.y - 60, "5     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol10Text2 = this.scene.add.text(symbol1Text1.x, symbol10.y + 10, "4     FUN0.40", symbolTextTextStyle).setOrigin(0.5);
            symbol10Text3 = this.scene.add.text(symbol1Text1.x, symbol10.y + 80, "3     FUN0.20", symbolTextTextStyle).setOrigin(0.5);

            payTableScroolButton = this.scene.add.image(5513, -330, "button_scroll").setOrigin(0.5).setScale(1.4);//.setScale(Constant.scaleFactorX * 0.65, Constant.scaleFactorY * 0.65);


        }
        else {
            let payTableTextStyle = { fontFamily: 'PR-Viking', fontSize: '41px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: this.menuPopupContainer.list[4] - 40 } };
            payTableText = this.scene.add.text(-7, -405, "PAYTABLE", payTableTextStyle).setOrigin(0.5);
            payTableText.alpha = 0.7;

            let symbolTextTextStyle = { fontFamily: 'arial', fontSize: '16px', fill: '#FFF', fontStyle: 'normal', align: 'center' };
            symbol1 = this.scene.add.image(-320, -250, "symbol_character_1").setOrigin(0.5).setScale(0.65);
            symbol1Text1 = this.scene.add.text(-150, -280, "5     FUN2.00", symbolTextTextStyle).setOrigin(0.5);
            symbol1Text2 = this.scene.add.text(-150, -250, "4     FUN1.00", symbolTextTextStyle).setOrigin(0.5);
            symbol1Text3 = this.scene.add.text(-150, -220, "3     FUN0.60", symbolTextTextStyle).setOrigin(0.5);

            symbol2 = this.scene.add.image(160, -250, "symbol_character_2").setOrigin(0.5).setScale(0.65);
            symbol2Text1 = this.scene.add.text(330, -280, "5     FUN1.50", symbolTextTextStyle).setOrigin(0.5);
            symbol2Text2 = this.scene.add.text(330, -250, "4     FUN0.80", symbolTextTextStyle).setOrigin(0.5);
            symbol2Text3 = this.scene.add.text(330, -220, "3     FUN0.50", symbolTextTextStyle).setOrigin(0.5);

            symbol3 = this.scene.add.image(-320, -90, "symbol_character_3").setOrigin(0.5).setScale(0.65);
            symbol3Text1 = this.scene.add.text(-150, -120, "5     FUN1.00", symbolTextTextStyle).setOrigin(0.5);
            symbol3Text2 = this.scene.add.text(-150, -90, "4     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol3Text3 = this.scene.add.text(-150, -60, "3     FUN0.40", symbolTextTextStyle).setOrigin(0.5);

            symbol4 = this.scene.add.image(160, -90, "symbol_character_4").setOrigin(0.5).setScale(0.65);
            symbol4Text1 = this.scene.add.text(330, -120, "5     FUN1.00", symbolTextTextStyle).setOrigin(0.5);
            symbol4Text2 = this.scene.add.text(330, -90, "4     FUN0.50", symbolTextTextStyle).setOrigin(0.5);
            symbol4Text3 = this.scene.add.text(330, -60, "3     FUN0.30", symbolTextTextStyle).setOrigin(0.5);

            symbol5 = this.scene.add.image(-360, 70, "symbol_a").setOrigin(0.5).setScale(0.65);
            symbol5Text1 = this.scene.add.text(-230, 100, "5     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol5Text2 = this.scene.add.text(-230, 70, "4     FUN0.40", symbolTextTextStyle).setOrigin(0.5);
            symbol5Text3 = this.scene.add.text(-230, 40, "3     FUN0.20", symbolTextTextStyle).setOrigin(0.5);

            symbol6 = this.scene.add.image(-70, 70, "symbol_k").setOrigin(0.5).setScale(0.65);
            symbol6Text1 = this.scene.add.text(65, 100, "5     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol6Text2 = this.scene.add.text(65, 70, "4     FUN0.40", symbolTextTextStyle).setOrigin(0.5);
            symbol6Text3 = this.scene.add.text(65, 40, "3     FUN0.20", symbolTextTextStyle).setOrigin(0.5);

            symbol7 = this.scene.add.image(230, 70, "symbol_q").setOrigin(0.5).setScale(0.65);
            symbol7Text1 = this.scene.add.text(365, 100, "5     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol7Text2 = this.scene.add.text(365, 70, "4     FUN0.40", symbolTextTextStyle).setOrigin(0.5);
            symbol7Text3 = this.scene.add.text(365, 40, "3     FUN0.20", symbolTextTextStyle).setOrigin(0.5);

            symbol8 = this.scene.add.image(-360, 230, "symbol_j").setOrigin(0.5).setScale(0.65);
            symbol8Text1 = this.scene.add.text(-230, 270, "5     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol8Text2 = this.scene.add.text(-230, 240, "4     FUN0.40", symbolTextTextStyle).setOrigin(0.5);
            symbol8Text3 = this.scene.add.text(-230, 210, "3     FUN0.20", symbolTextTextStyle).setOrigin(0.5);

            symbol9 = this.scene.add.image(-70, 230, "symbol_10").setOrigin(0.5).setScale(0.65);
            symbol9Text1 = this.scene.add.text(65, 270, "5     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol9Text2 = this.scene.add.text(65, 240, "4     FUN0.40", symbolTextTextStyle).setOrigin(0.5);
            symbol9Text3 = this.scene.add.text(65, 210, "3     FUN0.20", symbolTextTextStyle).setOrigin(0.5);

            symbol10 = this.scene.add.image(230, 230, "symbol_9").setOrigin(0.5).setScale(0.65);
            symbol10Text1 = this.scene.add.text(365, 270, "5     FUN0.60", symbolTextTextStyle).setOrigin(0.5);
            symbol10Text2 = this.scene.add.text(365, 240, "4     FUN0.40", symbolTextTextStyle).setOrigin(0.5);
            symbol10Text3 = this.scene.add.text(365, 210, "3     FUN0.20", symbolTextTextStyle).setOrigin(0.5);

            payTableScroolButton = this.scene.add.image(513, -330, "button_scroll").setOrigin(0.5).setScale(0.65);

        }
        this.payTableHeadingContainer.add(payTableText);

        this.payTableContainer.add(symbol1);
        this.payTableContainer.add(symbol1Text1);
        this.payTableContainer.add(symbol1Text2);
        this.payTableContainer.add(symbol1Text3);

        this.payTableContainer.add(symbol2);
        this.payTableContainer.add(symbol2Text1);
        this.payTableContainer.add(symbol2Text2);
        this.payTableContainer.add(symbol2Text3);

        this.payTableContainer.add(symbol3);
        this.payTableContainer.add(symbol3Text1);
        this.payTableContainer.add(symbol3Text2);
        this.payTableContainer.add(symbol3Text3);

        this.payTableContainer.add(symbol4);
        this.payTableContainer.add(symbol4Text1);
        this.payTableContainer.add(symbol4Text2);
        this.payTableContainer.add(symbol4Text3);

        this.payTableContainer.add(symbol5);
        this.payTableContainer.add(symbol5Text1);
        this.payTableContainer.add(symbol5Text2);
        this.payTableContainer.add(symbol5Text3);

        this.payTableContainer.add(symbol6);
        this.payTableContainer.add(symbol6Text1);
        this.payTableContainer.add(symbol6Text2);
        this.payTableContainer.add(symbol6Text3);

        this.payTableContainer.add(symbol7);
        this.payTableContainer.add(symbol7Text1);
        this.payTableContainer.add(symbol7Text2);
        this.payTableContainer.add(symbol7Text3);

        this.payTableContainer.add(symbol8);
        this.payTableContainer.add(symbol8Text1);
        this.payTableContainer.add(symbol8Text2);
        this.payTableContainer.add(symbol8Text3);

        this.payTableContainer.add(symbol9);
        this.payTableContainer.add(symbol9Text1);
        this.payTableContainer.add(symbol9Text2);
        this.payTableContainer.add(symbol9Text3);

        this.payTableContainer.add(symbol10);
        this.payTableContainer.add(symbol10Text1);
        this.payTableContainer.add(symbol10Text2);
        this.payTableContainer.add(symbol10Text3);

        this.payTableContainer.add(payTableScroolButton);
        this.payTableContainer.setVisible(false);
        this.payTableHeadingContainer.setVisible(false);
    };

    CreateSettingsTable() {
        let settingsPageTitleText, buttonUseSpaceBar, buttonUseSpaceBarText, soundEffectText, buttonSoundeffectsBar, bgMusicText, bgMusicBar, fastPlayText, bgMusicScroller, fastPlayButton, soundEffectFrequencyText, bgMusicFrequencyText, soundEffectScroller, additionalSoundFrequency = 1, bgMusicFrequency = 1;
        if (Constant.isPortrait) {
            let settingsPageTitleStyle = { fontFamily: 'PR-Viking', fontSize: '55px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: this.menuPopupContainer.list[4].width - 40 } };
            let normalTextStyle = { fontFamily: 'arial', fontSize: '35px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: 390 } };
            let normalTextStyle1 = { fontFamily: 'arial', fontSize: '30px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: 390 } };

            //settings table title text
            settingsPageTitleText = this.scene.add.text(-7, -305, "Settings", settingsPageTitleStyle).setOrigin(0.5);
            settingsPageTitleText.alpha = 0.7;
            //--------------------------

            //spacebar spritesheet 
            buttonUseSpaceBar = this.scene.add.sprite(-280, -105, "button_onof").setOrigin(0.5, 0.5).setInteractive();
            buttonUseSpaceBar.setFrame(1);
            buttonUseSpaceBar.on("pointerdown", this.OnButtonSpaceBarPress, this);
            buttonUseSpaceBarText = this.scene.add.text(-40, -105, 'Use Spacebar to play', normalTextStyle).setOrigin(0.5);
            //-------------------------

            //sound effect bar and text-------------------- 
            soundEffectText = this.scene.add.text(-215, -5, 'Sound Effects', normalTextStyle).setOrigin(0.5);
            soundEffectScroller = this.scene.rexUI.add.slider({
                x: 125,
                y: -5,
                width: 300,
                orientation: 'x',
                reverseAxis: true,
                thumb: this.scene.add.image(175, -105, "RockSoundEffect"),

            })
                .layout();
            soundEffectScroller.on('valuechange', (newValue, oldValue, scrollBar, thumb) => {
                soundEffectFrequencyText.text = parseInt(100) - parseInt(newValue * 100);
                //-----------------------------------------
                additionalSoundFrequency = (1 - (newValue * 1)).toFixed(2);
                this.ReduceFrequencyOfAdditionalSounds(additionalSoundFrequency)
                this.CheckTheAdditionalSound();
            })
            buttonSoundeffectsBar = this.scene.add.image(125, -5, 'ButtonSoundeffects').setOrigin(0.5);
            soundEffectFrequencyText = this.scene.add.text(320, -5, this.soundEffectFrequency, normalTextStyle1).setOrigin(0.5);
            //--------------------------------------

            //bg music effect bar and text
            bgMusicText = this.scene.add.text(-175, 110, 'Background Music', normalTextStyle).setOrigin(0.5);
            bgMusicScroller = this.scene.rexUI.add.slider({
                x: 125,
                y: 110,
                width: 300,
                orientation: 'x',
                reverseAxis: true,
                thumb: this.scene.add.image(175, 110, "RockSoundEffect"),//this.scene.rexUI.add.roundRectangle(0, 0, 40, 20, 10, COLOR_LIGHT),
            })
                .layout();

            bgMusicScroller.on('valuechange', (newValue, oldValue, scrollBar) => {
                bgMusicFrequencyText.text = parseInt(100) - parseInt(newValue * 100)//.toFixed(2);
                // 
                bgMusicFrequency = (1 - (newValue * 1)).toFixed(2);
                SoundManager.backgroundSound.volume = bgMusicFrequency;
            })
            bgMusicBar = this.scene.add.image(125, 110, 'ButtonBackGorundMusic').setOrigin(0.5);
            bgMusicFrequencyText = this.scene.add.text(320, 110, this.bgMusicFrequency, normalTextStyle1).setOrigin(0.5);


            fastPlayText = this.scene.add.text(-60, 220, 'Fast-Play', normalTextStyle).setOrigin(0.5);
            fastPlayButton = this.scene.add.sprite(-280, 220, "button_offon").setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
            fastPlayButton.setFrame(1);
            fastPlayButton.on("pointerdown", this.OnFastPlayButtonClicked, this);

            //added setting text into a container
            this.settingsPageHeadingContainer.add(settingsPageTitleText);
            this.settingsPageHeadingContainer.visible = false;
        }
        else {
            let settingsPageTitleStyle = { fontFamily: 'PR-Viking', fontSize: '41px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: this.menuPopupContainer.list[4].width - 40 } };
            let normalTextStyle = { fontFamily: 'arial', fontSize: '25px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: 390 } };
            let normalTextStyle1 = { fontFamily: 'arial', fontSize: '30px', fill: '#FFF', fontStyle: 'normal', align: 'center', wordWrap: { width: 390 } };

            settingsPageTitleText = this.scene.add.text(-7, -405, "Settings", settingsPageTitleStyle).setOrigin(0.5);
            settingsPageTitleText.alpha = 0.7;

            // buttonUseSpaceBar = this.scene.add.image(-280, -205, 'buttonUseSpaceBar').setOrigin(0.5);
            buttonUseSpaceBar = this.scene.add.sprite(-280, -205, "button_onof").setOrigin(0.5, 0.5).setInteractive({ cursor: 'grabbing' });
            buttonUseSpaceBar.on("pointerdown", this.OnButtonSpaceBarPress, this);
            buttonUseSpaceBarText = this.scene.add.text(-40, -205, 'Use Spacebar to play', normalTextStyle).setOrigin(0.5);

            soundEffectText = this.scene.add.text(-235, -105, 'Sound Effects', normalTextStyle).setOrigin(0.5);
            buttonSoundeffectsBar = this.scene.add.image(65, -105, 'ButtonSoundeffects').setOrigin(0.5);
            // soundEffectmarker = this.scene.add.image(-65, -105, 'RockSoundEffect').setOrigin(0.5);
            soundEffectFrequencyText = this.scene.add.text(270, -105, this.soundEffectFrequency, normalTextStyle1).setOrigin(0.5);
            // let additionalSoundFrequency = 1;

            soundEffectScroller = this.scene.rexUI.add.slider({
                x: 65,
                y: -100,
                width: 300,
                orientation: 'x',
                reverseAxis: true,
                thumb: this.scene.add.image(175, -105, "RockSoundEffect"),//this.scene.rexUI.add.roundRectangle(0, 0, 40, 20, 10, COLOR_LIGHT), 

            })
                .layout();
            soundEffectScroller.on('valuechange', (newValue, oldValue, scrollBar, thumb) => {
                // console.log('newValue : ', newValue);
                // console.log('oldValue : ', oldValue);

                soundEffectFrequencyText.text = parseInt(100) - parseInt(newValue * 100)//.toFixed(2); 
                //-----------------------------------------
                additionalSoundFrequency = (1 - (newValue * 1)).toFixed(2);
                this.ReduceFrequencyOfAdditionalSounds(additionalSoundFrequency)
                this.CheckTheAdditionalSound();
            })
            //----------------------------------------------------------- 
            bgMusicText = this.scene.add.text(-205, -5, 'Background Music', normalTextStyle).setOrigin(0.5);
            bgMusicBar = this.scene.add.image(65, -5, 'ButtonBackGorundMusic').setOrigin(0.5);
            bgMusicFrequencyText = this.scene.add.text(270, -5, this.bgMusicFrequency, normalTextStyle1).setOrigin(0.5);
            // bgMusicMarker = this.scene.add.image(-65, -5, 'rockbackmusic').setOrigin(0.5);
            //---------------------------------------------------------------
            // let bgMusicFrequency = 1;
            bgMusicScroller = this.scene.rexUI.add.slider({
                x: 65,
                y: 0,
                width: 300,
                orientation: 'x',
                reverseAxis: true,
                thumb: this.scene.add.image(175, 0, "RockSoundEffect"),//this.scene.rexUI.add.roundRectangle(0, 0, 40, 20, 10, COLOR_LIGHT),
            })
                .layout();

            bgMusicScroller.on('valuechange', (newValue, oldValue, scrollBar) => {
                // console.log('slider : ', bgMusicScroller)
                bgMusicFrequencyText.text = parseInt(100) - parseInt(newValue * 100)//.toFixed(2);
                // 
                bgMusicFrequency = (1 - (newValue * 1)).toFixed(2);
                SoundManager.backgroundSound.volume = bgMusicFrequency;
                // console.log('SoundManager.backgroundSound.volume : ', bgMusicFrequency)
                this.CheckTheBackgroundSound()
            })
            //---------------------------------------------------------------

            // fastPlaySwitch = this.scene.add.image(-280, 95, 'ButtonFastPlay').setOrigin(0.5);
            fastPlayText = this.scene.add.text(-105, 95, 'Fast-Play', normalTextStyle).setOrigin(0.5);
            // fastplaySwitch = this.scene.add.image(-300, 95, 'rock_fastplay').setOrigin(0.5);
            //---
            fastPlayButton = this.scene.add.sprite(-280, 95, "button_offon").setOrigin(0.5, 0.5).setInteractive({ cursor: 'grabbing' });
            fastPlayButton.setFrame(1)
            fastPlayButton.on("pointerdown", this.OnFastPlayButtonClicked, this);
        }


        this.settingsPageHeadingContainer.add(settingsPageTitleText);
        this.settingsPageHeadingContainer.visible = false;

        this.settingsPageContainer.add(buttonUseSpaceBar);
        this.settingsPageContainer.add(fastPlayButton);
        this.settingsPageContainer.add(buttonUseSpaceBarText);
        this.settingsPageContainer.add(soundEffectText)
        this.settingsPageContainer.add(buttonSoundeffectsBar);
        this.settingsPageContainer.add(soundEffectFrequencyText);
        this.settingsPageContainer.add(bgMusicText);
        this.settingsPageContainer.add(bgMusicBar);
        this.settingsPageContainer.add(bgMusicFrequencyText);
        this.settingsPageContainer.add(fastPlayText);
        // this.settingsPageContainer.add(spaceBarMarker);
        this.settingsPageContainer.add(soundEffectScroller);
        this.settingsPageContainer.add(bgMusicScroller);

        this.settingsPageContainer.setVisible(false);



        //###############################################################################################################


    };

    CheckTheAdditionalSound() {
        if (this.settingsPageContainer.list[5]._text == 0) {
            this.menuPopupContainer.list[7].setFrame(0)
            SoundManager.DisbaleSpinSound();
        }
        else {
            this.menuPopupContainer.list[7].setFrame(1)
            SoundManager.EnableSpinSound();
        }
    };

    CheckTheBackgroundSound() {
        // console.log('this.backgroundSound.volume : ',)
        if (this.settingsPageContainer.list[8]._text == 0) {
            this.menuPopupContainer.list[8].setFrame(0)
        }
        else {
            this.menuPopupContainer.list[8].setFrame(1)
        }
    }
    ReduceFrequencyOfAdditionalSounds(_offset) {
        SoundManager.slowReelSound.volume = _offset;

        SoundManager.thorPlaySound.volume = _offset;

        SoundManager.roll2PlaySound.volume = _offset;

        SoundManager.bonusPlaySound.volume = _offset;

        SoundManager.bonusStartSound.volume = _offset;

        SoundManager.spinSound.volume = _offset;

        SoundManager.scatterSound.volume = _offset;

        SoundManager.characater1Sound.volume = _offset;

        SoundManager.spinStopSound.volume = _offset;

        SoundManager.pelirojaSound.volume = _offset;

        SoundManager.stromSound.volume = _offset;

        SoundManager.bonusButtonSound.volume = _offset;

        SoundManager.bonusStartSound.volume = _offset;

        SoundManager.bonusPlaySound.volume = _offset;
    }
    OnButtonSpaceBarPress() {
        console.log('OnButtonSpaceBarPress');
        if (Constant.isMobile) {

        }
        else {
            this.spaceBarBtnCounter += 1;
            if (this.spaceBarBtnCounter % 2 == 1) {
                this.settingsPageContainer.list[0].setFrame(1)
                this.scene.bottomPanel.isSpaceKeyEnable = false;

                // this.isSpacebarClicked = false;
                // console.log('this.isSpacebarClicked : when cross', this.isSpacebarClicked)
                // this.scene.bottomPanel.DisableSpaceBar();
            }
            else {
                this.settingsPageContainer.list[0].setFrame(0);
                this.scene.bottomPanel.isSpaceKeyEnable = true;
                // this.isSpacebarClicked = true;
                // console.log('this.isSpacebarClicked : when not cross', this.isSpacebarClicked)
                // this.scene.bottomPanel.EnableSpaceBar();
            }
        }
    }
    OnFastPlayButtonClicked() {
        this.fastPlayBtnClicked += 1;
        if (this.fastPlayBtnClicked % 2 == 1) {
            this.settingsPageContainer.list[1].setFrame(0)
            this.isFastPlay = true;
            // console.log('this.isFastPlay : ', this.isFastPlay)
        }
        else {
            this.settingsPageContainer.list[1].setFrame(1)
            this.isFastPlay = false;
            // console.log('this.isFastPlay : ', this.isFastPlay)
        }
    }

    //--------------------------------------------
    SoundButtonPressed() {
        // console.log('this.settingsPageContainer.text2 : ', localStorage.getItem("slot_game_is_sound_on"));
        // console.log(this);
        ButtonScaleDownTween(this.scene, this, 0.69);
    };
    SoundButtonReleased() {
        ButtonScaleUpTween(this.scene, this, 0.7);

        // if (this.scene.menuPopup.soundButton.frame.name === 0) {
        //     this.scene.menuPopup.soundButton.setFrame(1);
        // }
        // else {
        //     this.scene.menuPopup.soundButton.setFrame(0);
        // }

        //--------------------------------------------
        // this.settingsPageContainer.list[15] 
        //--------------------------------------------
        this.scene.menuPopup.ToggleSoundButton(this);
    };
    MusicButtonPressed() {
        ButtonScaleDownTween(this.scene, this, 0.69);
    }; MusicButtonReleased() {
        ButtonScaleUpTween(this.scene, this, 0.7);
        // console.log(this.scene.menuPopup.musicButton.frame);
        // if (this.scene.menuPopup.musicButton.frame.name === 0) {
        //     this.scene.menuPopup.musicButton.setFrame(1);
        // }
        // else {
        //     this.scene.menuPopup.musicButton.setFrame(0);
        // }
        this.scene.menuPopup.ToggleMusicButton(this);
    };
    HomeButtonPressed() {
        ButtonScaleDownTween(this.scene, this.scene.menuPopup.homeButton, 0.69);
    };
    HomeButtonReleased() {
        ButtonScaleUpTween(this.scene, this.scene.menuPopup.homeButton, 0.7);
    };
    CrossButtonPressed() {
        // console.log("this.scene: ", this.scene);
        // ButtonScaleDownTween(this.scene, this.scene.bottomPanel.alertPopup.crossButton, 1);
        ButtonScaleDownTween(this.scene, this.scene.menuPopup.crossButton, 0.69);
    };

    CrossButtonReleased() {
        this.scene.gameLogo.menuContainer.list[1].setVisible(true);

        ButtonScaleUpTween(this.scene, this.scene.menuPopup.crossButton, 0.7);
        this.HideMenuPopup();
        this.DisableButtons();
        // this.scene.menuPopup.HideMenuPopup();
        // window.postMessage(this.scene.bottomPanel.totalAmountBetted)
        //ReactNativeWebView.postMessage(this.scene.bottomPanel.totalAmountBetted);
    };

    ShowMenuPopup(_message) {
        // console.log('menupop up show')
        let alphaTween = this.scene.add.tween({
            targets: [this.scene.menuPopup.menuPopupContainer],
            alpha: 1,
            ease: 'Linear',
            duration: 200
        });
        this.EnableSeletedButton(this.menuPopupContainer.list[1]);

    };
    HideMenuPopup() {
        let alphaTween = this.scene.add.tween({
            targets: [this.scene.menuPopup.menuPopupContainer],
            alpha: 0,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) { }
        });
        // console.log("scene: ", this.scene)
        this.DisableButtons();
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
        // _button.alpha = 1;
        this.scene.menuPopup.ShowSeletedMenuData(_button);
    };
    ShowSeletedMenuData(_this) {
        this.scene.gameLogo.menuContainer.list[1].setVisible(false);
        let name = _this.texture.key;
        // console.log("name...................... ", name);
        if (name.includes("paytable")) {

            // console.log('this.scene.gameLogo.menuContainer', this.scene.gameLogo.menuContainer)

            this.infoPageContainer.setVisible(false)
            this.infoPageHeadingContainer.setVisible(false)


            this.settingsPageHeadingContainer.setVisible(false);
            this.settingsPageContainer.setVisible(false);


            if (this.infoPageGraphics) {
                this.infoPageGraphics.disableInteractive();
            }
            this.menuPopupContainer.list[1].setAlpha(1);
            this.menuPopupContainer.list[2].setAlpha(0.5);
            this.menuPopupContainer.list[3].setAlpha(0.5);
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
            this.menuPopupContainer.list[2].setAlpha(1);
            this.menuPopupContainer.list[1].setAlpha(0.5);
            this.menuPopupContainer.list[3].setAlpha(0.5);
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

            this.menuPopupContainer.list[3].setAlpha(1);
            this.menuPopupContainer.list[1].setAlpha(0.5);
            this.menuPopupContainer.list[2].setAlpha(0.5);
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
            _this.setFrame(0);
            SoundManager.StopBackgroundSound();
            /////////////////////////////////////////////////
            // console.log("this.settingsPageContainer", this.settingsPageContainer.list[12].children[0].x)
            this.settingsPageContainer.list[12].children[0].setPosition(-65, 0);
            // bgMusicFrequencyText
            this.settingsPageContainer.list[8].setText(0);
        } else {
            localStorage.setItem("slot_game_is_music_on", 1);
            _this.setFrame(1);
            SoundManager.PlayBackgroundSound();
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
        // console.log('this---------------------------------->', this)

        if (localStorage.getItem("slot_game_is_sound_on") == 1) {

            localStorage.setItem("slot_game_is_sound_on", 0);
            _this.setFrame(0);
            // console.log('setting : ', this.settingsPageContainer.list[10].children[0]);
            if (this.settingsPageContainer.list[5]._text > 0) {


                this.settingsPageContainer.list[10].children[0].setPosition(-65, -100);
                this.settingsPageContainer.list[5].setText(0);


            }
            this.isToggledSound = false;
            // this.ToggleSoundButtonOnDrag();
            // for desk top
            if (Constant.isPortrait) {

            }
            else {
                // this.settingsPageContainer.list[11].children[0].children[0].setPosition(-50, -105);
                // this.settingsPageContainer.list[4].text = 0;
            }


            SoundManager.DisbaleSpinSound();
        } else {
            // console.log('setting : ', this.settingsPageContainer)
            localStorage.setItem("slot_game_is_sound_on", 1);
            _this.setFrame(1);

            this.isToggledSound = true;
            this.settingsPageContainer.list[10].children[0].setPosition(175, -105);
            this.settingsPageContainer.list[5].setText(100);

            // this.ToggleSoundButtonOnDrag();

            // for desk top
            if (Constant.isPortrait) {

            }
            else {
                // this.settingsPageContainer.list[11].children[0].children[0].setPosition(170, -105);
                // this.settingsPageContainer.list[4].text = 100;
            }

            SoundManager.EnableSpinSound();
        }
    };
    ToggleSoundButtonOnDrag() {
        // console.log('jsbjs', this.settingsPageContainer.list[5]._text);
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