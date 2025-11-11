import { Constant } from "../Constant.js";
import { Model } from "../Model.js";
// import { Model } from "../Model.js";
import { SoundManager } from "../SoundManager.js";
import { ButtonScaleDownTween } from "../Utils.js";
import { ButtonScaleUpTween } from "../Utils.js";
class GameLogo {

    constructor(scene) {
        this.scene = scene;
        Constant.game.events.on('evtParchmentPopupShow', this.ShowParchementPopup, this);
        Constant.game.events.on('evtShowTapToContinuePopup', this.showTapToContinuePopup, this);

        //#################################################
        //#################################################
        this.logo = null;
        this.leftTruck = null;
        this.rightTruck = null;
        this.backButtonBase = null;
        this.backButton = null;
        this.leftSlotNumber = null;
        this.rightSlotNumber = null;
        this.buyBonusButton = null;
        this.isBuyBonusButtonClicked = false;//-------------
        this.leftSlotNumberArray = [];
        this.rightSlotNumberArray = [];
        this.tapToPlayPopupContainer = null;
        //spine anim
        this.strom_anim = null;
        this.fog_anim = null;

        this.buyBonusContainer = null;
        //bonus popup-------
        this.bonusPopupContainer = null;
        this.bonusBettingAmount = '50.00';
        this.onStartButtonPressed = false;//--------------------
        this.parchment = null;
        this.parchmentContainer = null;
        this.freeSpin = 10;

        this.mapParchment = null;

        this.create();

        // Constant.game.events.on("evtShowBlinkAnimation", this.onShowBlinkAnimation, this);

    };
    create() {
        this.CreateStromAnimation();
        this.CreateParchment();
        this.CreateTapToContinuePopUp();
        this.menuContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        if (Constant.isPortrait) {
            let logo = this.scene.add.image(0, -690, "Nordics_Treasure_logo").setOrigin(0.5).setScale(Constant.scaleFactor * 1.8);//, Constant.scaleFactorY);
            this.buyBonusContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1)).setScale(Constant.scaleFactor, Constant.scaleFactor);

            this.buyBonusButton = this.scene.add.image(-300, -330, "buy_bonus_button").setOrigin(0.5);//.setScale(Constant.scaleFactor * 1.1);//, Constant.scaleFactorY);

            this.buyBonusContainer.add(this.buyBonusButton);
            this.menuContainer.add(logo);
        }
        else {
            let logo = this.scene.add.image(-880, -480, "Nordics_Treasure_logo").setOrigin(0, 0).setScale(1);//, Constant.scaleFactorY);
            this.buyBonusContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);

            this.buyBonusButton = this.scene.add.image(-757, -30, "buy_bonus_button").setOrigin(0.5).setScale(1);//, Constant.scaleFactorY);
            this.buyBonusContainer.add(this.buyBonusButton);
            this.menuContainer.add(logo);
        }
        this.CreateMenuButton();
        this.buyBonusButton.setInteractive({ useHandCursor: true });
        this.buyBonusButton.on("pointerdown", this.BuyBonusButtonPressed, this);
        this.buyBonusButton.on("pointerup", this.BuyBonusButtonReleased, this);

        this.CreateBonusPopup();
    };
    CreateStromAnimation() {
        if (Constant.isPortrait) {
            this.strom_anim = this.scene.add.spine(Constant.game.config.width / 2, Constant.game.config.height / 4, "strom");
        }
        else {
            this.strom_anim = this.scene.add.spine(Constant.game.config.width / 2, Constant.game.config.height / 2, "strom");
        }
        this.strom_anim.play("Storm_Animation");
        this.strom_anim.setVisible(false);
    }
    PlayStromAnimation() {
        this.strom_anim.setVisible(true);
        this.strom_anim.play("Storm_Animation");
    }

    BuyBonusButtonPressed() {
        this.buyBonusContainer.list[0].setScale(0.9);
    };
    BuyBonusButtonReleased() {
        this.isBuyBonusButtonClicked = true;
        this.buyBonusContainer.list[0].visible = false; //buy bonus button visible fals;e 
        this.buyBonusContainer.list[0].setScale(1);
        this.scene.bottomPanel.EnableOverlay();
        this.bonusPopupContainer.visible = true;
        this.scene.bottomPanel.bottomPanelContainer.list[14].setAlpha(0); //this is spin button
        this.scene.bottomPanel.bottomPanelContainer.list[12].setAlpha(0); //this is auto spin button
        //Play Buy Bonus Button Sound on Button Release
        SoundManager.PlayBonusButtonSound();
    };

    //--------------creating Bonus pop up-----------------

    CreateBonusPopup() {
        // console.log("Bonus Button Popup")
        let bonusPopupBg, centralHeading, buyBonusText, scatterImg, bonusFunCost, funAmt, cancelButton, cancelText, startButton, startText;

        this.bonusPopupContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.floor(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        this.bonusPopupContainer.depth = 2;

        let bonusBuyStyle = { fontFamily: 'PR-Viking', fontSize: '60px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        let style = { fontFamily: 'PR-Viking', fontSize: '40px', fill: '#fff', fontStyle: 'normal', align: 'center' };

        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                bonusPopupBg = this.scene.add.image(0, 0, 'ilustration_portrait').setOrigin(0.5, 0.5)//.setScale(0.9, 0.9);

                centralHeading = this.scene.add.image(0, -720, 'title_portrait').setOrigin(0.5, 0.5);
                buyBonusText = this.scene.add.text(0, -720, 'Buy Bonus', bonusBuyStyle).setOrigin(0.5, 0.5);

                scatterImg = this.scene.add.image(0, -300, 'scatter_portrait').setOrigin(0.5, 0.5);

                bonusFunCost = this.scene.add.image(0, 200, 'buttonfun50.00_portrait').setOrigin(0.5, 0.5);
                funAmt = this.scene.add.text(0, 200, 'FUN ' + this.bonusBettingAmount, style).setOrigin(0.5, 0.5);

                cancelButton = this.scene.add.image(-215, 700, 'cancel_portrait').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
                cancelText = this.scene.add.text(-215, 700, 'CANCEL', style).setOrigin(0.5, 0.5);

                startButton = this.scene.add.image(210, 700, 'start_portrait').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
                startText = this.scene.add.text(210, 700, 'START', style).setOrigin(0.5, 0.5);

            }
            else {// mobile landscape
                bonusPopupBg = this.scene.add.image(0, -55, 'full_ilustration').setOrigin(0.5, 0.5);

                centralHeading = this.scene.add.image(0, -435, 'central_button_title').setOrigin(0.5, 0.5);
                buyBonusText = this.scene.add.text(0, -435, 'Buy Bonus', bonusBuyStyle).setOrigin(0.5, 0.5);

                scatterImg = this.scene.add.image(0, -165, 'scatter').setOrigin(0.5, 0.5);

                bonusFunCost = this.scene.add.image(0, 185, 'button_50fun').setOrigin(0.5, 0.5);
                funAmt = this.scene.add.text(0, 185, 'FUN ' + this.bonusBettingAmount, style).setOrigin(0.5, 0.5);

                cancelButton = this.scene.add.image(-225, 305, 'buton_right').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
                cancelText = this.scene.add.text(-225, 305, 'CANCEL', style).setOrigin(0.5, 0.5);

                startButton = this.scene.add.image(235, 305, 'button_left').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
                startText = this.scene.add.text(235, 305, 'START', style).setOrigin(0.5, 0.5);
            }
        }
        else { // desktop
            bonusPopupBg = this.scene.add.image(0, -55, 'full_ilustration').setOrigin(0.5, 0.5);

            centralHeading = this.scene.add.image(0, -435, 'central_button_title').setOrigin(0.5, 0.5);
            buyBonusText = this.scene.add.text(0, -435, 'Buy Bonus', bonusBuyStyle).setOrigin(0.5, 0.5);

            scatterImg = this.scene.add.image(0, -165, 'scatter').setOrigin(0.5, 0.5);

            bonusFunCost = this.scene.add.image(0, 185, 'button_50fun').setOrigin(0.5, 0.5);
            funAmt = this.scene.add.text(0, 185, 'FUN ' + this.bonusBettingAmount, style).setOrigin(0.5, 0.5);

            cancelButton = this.scene.add.image(-225, 305, 'buton_right').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
            cancelText = this.scene.add.text(-225, 305, 'CANCEL', style).setOrigin(0.5, 0.5);

            startButton = this.scene.add.image(235, 305, 'button_left').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
            startText = this.scene.add.text(235, 305, 'START', style).setOrigin(0.5, 0.5);
        }

        this.bonusPopupContainer.add(bonusPopupBg);
        this.bonusPopupContainer.add(centralHeading);
        this.bonusPopupContainer.add(buyBonusText);
        this.bonusPopupContainer.add(scatterImg);
        this.bonusPopupContainer.add(bonusFunCost);
        this.bonusPopupContainer.add(funAmt);
        this.bonusPopupContainer.add(cancelButton);
        this.bonusPopupContainer.add(cancelText);
        this.bonusPopupContainer.add(startButton);
        this.bonusPopupContainer.add(startText);

        this.bonusPopupContainer.list[6].on('pointerdown', this.OnCancelButtonDown, this);
        this.bonusPopupContainer.list[6].on('pointerup', this.OnCancelButtonUp, this);//cancel button

        this.bonusPopupContainer.list[8].on('pointerdown', this.OnStartButtonDown, this);
        this.bonusPopupContainer.list[8].on('pointerup', this.OnStartButtonUp, this);//start button

        this.bonusPopupContainer.visible = false;
    }
    OnCancelButtonDown() {
        // console.log('on down');
    }
    OnCancelButtonUp() {
        this.isBuyBonusButtonClicked = false;

        // console.log('clicked on cancel btn');
        this.buyBonusContainer.list[0].visible = true; // buy bonus butto visible true
        this.scene.bottomPanel.DisableOverlay();
        this.bonusPopupContainer.visible = false;
        this.scene.bottomPanel.bottomPanelContainer.list[14].setAlpha(1);
        this.scene.bottomPanel.bottomPanelContainer.list[12].setAlpha(1);
    }
    OnStartButtonDown() {
    }
    OnStartButtonUp() {
        this.scene.bottomPanel.DisableSpaceBar();
        //Play Buy Bonus Button Sound on Button Release
        SoundManager.PlayBonusButtonSound();//isStartButton
        // this.scene.bottomPanel.normalSpin = false;
        this.buyBonusContainer.list[0].visible = true;
        this.DisableButtons(this.buyBonusContainer.list[0]);
        this.onStartButtonPressed = true;
        // this.scene.bottomPanel.bonusSpin = true;
        // setTimeout(() => {
        // Constant.game.events.emit("evtEnableSpinButton");
        // }, 8000);
        this.isDemoAnimationForFreeSpin = true;
        Constant.game.events.emit("evtDisableGUIButton");

        this.scene.bottomPanel.DisableOverlay();
        this.bonusPopupContainer.visible = false;
        this.scene.bottomPanel.Spin();
        // this.scene.bottomPanel.SpinButtonReleased(this.scene.bottomPanel.normalSpin);
    };
    CreateParchment() {
        let largeSizeTextStyle = { fontFamily: 'PR-Viking', fontSize: '50px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        let smallSizeTextStyle = { fontFamily: 'PR-Viking', fontSize: '60px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        let smallerSizeTextStyle = { fontFamily: 'PR-Viking', fontSize: '45px', fill: '#fff', fontStyle: 'normal', align: 'center' };

        this.parchmentContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactorX * 0.1, Constant.scaleFactorY * 0.1).setDepth(5);

        this.parchment = this.scene.add.image(0, 0, 'parchment');
        let freeGamesText = this.scene.add.text(-10, -180, 'FREE GAMES', largeSizeTextStyle).setOrigin(0.5, 0.5);
        let nordicsTreasureText = this.scene.add.text(-100, -30, 'NORDICS TREASURE \n IS COMING', smallSizeTextStyle).setOrigin(0.5, 0.5);
        let tapToPlayText = this.scene.add.text(40, 220, "", smallerSizeTextStyle).setOrigin(0.5, 0.5);
        this.parchmentContainer.add(this.parchment);
        this.parchmentContainer.add(freeGamesText);
        this.parchmentContainer.add(nordicsTreasureText);
        this.parchmentContainer.add(tapToPlayText);

        this.parchmentContainer.setVisible(false);
    };
    ShowParchementPopup(parchmentText) {
        this.scene.bottomPanel.bonusSpin = false;
        SoundManager.TapToPlayBonusSound();
        this.parchmentContainer.alpha = 1;
        let scaleValue, angleRotation;
        this.parchmentContainer.setVisible(true);
        //set text for the particular text
        this.parchmentContainer.list[3].setText(parchmentText);

        let durationTween;
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                if (/iPhone|iPhoneX|iPod|iPad/i.test(navigator.userAgent)) {
                    scaleValue = (Math.round(Constant.game.config.width / 1080)) / 1.1;
                    angleRotation = 75;//Math.round(Constant.game.config.width / 64.5);
                    durationTween = 1000;
                } else {
                    scaleValue = Math.round(Constant.game.config.width / 1080);
                    angleRotation = 75;
                    durationTween = 800;
                }
            }
            else {
                scaleValue = Constant.scaleFactor / 1.1;
                angleRotation = 75;
                durationTween = 700;
            }
        }
        else {
            scaleValue = Constant.scaleFactor;
            angleRotation = Math.round(Constant.game.config.width / 44.5);
            durationTween = 700
        }
        let parchmentTween = this.scene.tweens.add({
            targets: this.parchmentContainer,
            ease: 'linear',
            scale: +scaleValue,
            duration: durationTween,
            onUpdate: () => {
                this.parchmentContainer.angle += angleRotation;
            },
            onComplete: () => {
                this.parchmentContainer.angle += (360 - this.parchmentContainer.angle);
                SoundManager.PlayBonusStartSound();
                this.scene.input.on('pointerdown', this.OnParchmentClick, this);
            }
        }, this);
    };

    HideParchementPopup() {
        //hide container
        this.parchmentContainer.setVisible(false);
    };

    OnParchmentClick() {
        this.scene.bottomPanel.bonusSpin == false;
        SoundManager.PlayBonusButtonSound();
        //Play Buy Bonus Tap to play Sound on Button Release
        // this.scene.bottomPanel.autoPlayButtonContainer.list[1].setVisible(true);  // counter base image
        if (this.parchmentContainer.list[3].text == "Tap To Continue") {
            this.PlayStromAnimation();
            SoundManager.PlayStromSound();
            let AfterClickTween = this.scene.tweens.add({
                targets: this.parchmentContainer,
                ease: 'linear',
                scale: +3,
                alpha: -0.3,
                duration: 500,
                onComplete: () => {
                    this.parchmentContainer.scale = 0.1;
                    this.HideParchementPopup();
                    // this.buyBonusContainer.list[0].visible = false;
                    // this.scene.autoPlayPopup.AutoPlayButtonReleased();
                    this.scene.background.PlayFogAnimation();
                    // this.scene.bottomPanel.isFreeSpinStarted = true;
                    Constant.game.events.emit("evtStartFreeSpin");

                }
            })
            this.scene.input.off('pointerdown', this.OnParchmentClick, this);
        }
        else {
            this.scene.background.StopFogAnimation();
            let AfterClickTween = this.scene.tweens.add({
                targets: this.parchmentContainer,
                ease: 'linear',
                scale: +3,
                alpha: -0.3,
                duration: 500,
                onComplete: () => {
                    this.HideParchementPopup();
                    this.parchmentContainer.scale = 0.1;
                    this.buyBonusContainer.list[0].visible = true;
                    this.EnableButtons(this.buyBonusContainer.list[0]);
                    // this.scene.bottomPanel.EnableSpinButton();
                    // this.scene.bottomPanel.autoPlayButtonContainer.list[1].setVisible(false);
                    this.onStartButtonPressed = false;
                }
            })
            this.scene.input.off('pointerdown', this.OnParchmentClick, this);
        }

    }

    //#######################################################
    CreateTapToContinuePopUp() {

        const style = { fontFamily: 'PR-Viking', fontSize: '65px', fill: '#111', fontStyle: 'normal', align: 'center' };
        this.tapToPlayPopupContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactorX * 1, Constant.scaleFactorY * 1);

        let mapParchment = this.scene.add.spine(0, 0, 'map_tap_to_play').setScale(Constant.scaleFactorX, Constant.scaleFactorY).setInteractive();
        mapParchment.removeInteractive();

        let upperText = this.scene.add.text(-350, -300, 'NORDICS CONQUER THE SEAS', style).setVisible(false);
        let lowerText = this.scene.add.text(-200, 0, 'Tap To Play', style).setVisible(false);
        this.freeSpinTotalWinText = this.scene.add.text(-100, 300, '1234', style).setVisible(false).setOrigin(0.5);

        this.tapToPlayPopupContainer.add(mapParchment);
        this.tapToPlayPopupContainer.add(upperText);
        this.tapToPlayPopupContainer.add(lowerText);
        this.tapToPlayPopupContainer.add(this.freeSpinTotalWinText);

        this.tapToPlayPopupContainer.list[0].on("pointerdown", function () {
            this.OnTapToContinuePress();
        }, this);

        this.tapToPlayPopupContainer.list[0].on("pointerup", function () {
            this.OnTapToContinueReleased();
        }, this);

        this.tapToPlayPopupContainer.depth = 2;
        this.tapToPlayPopupContainer.list[0].play("Map_Animation");
        this.tapToPlayPopupContainer.visible = false;
    }

    showTapToContinuePopup() {
        SoundManager.PlayBonusStartSound();
        this.tapToPlayPopupContainer.visible = true;
        this.tapToPlayPopupContainer.list[0].removeInteractive();
        this.tapToPlayPopupContainer.list[0].play("Map_Animation");
        this.tapToPlayPopupContainer.list[0].once('complete', this.OnMapAnimComplete, this);
    }
    OnMapAnimComplete() {
        this.tapToPlayPopupContainer.list[0].setInteractive();
        this.tapToPlayPopupContainer.list[1].visible = true;
        this.tapToPlayPopupContainer.list[2].visible = true;
        // console.log("free anim com: ", parseFloat(Model.GetFreeSpinTotalWinAmount()).toFixed(2));
        this.freeSpinTotalWinText.setText(parseFloat(Model.GetFreeSpinTotalWinAmount()).toFixed(2));
        this.freeSpinTotalWinText.visible = true;
    }

    OnTapToContinuePress() {
    }
    OnTapToContinueReleased() {
        // this.scene.bottomPanel.EnableButton(this.scene.bottomPanel.stopButton);
        this.scene.background.StopFogAnimation();
        this.tapToPlayPopupContainer.visible = false;

        // this.isBuyBonusButtonClicked = false;
        // this.buyBonusContainer.list[0].visible = true;
        // this.EnableButtons(this.buyBonusContainer.list[0]);
        // this.scene.bottomPanel.EnableSpinButton();
        // this.scene.bottomPanel.autoPlayButtonContainer.list[1].setVisible(false);
        // this.onStartButtonPressed = false;
        this.tapToPlayPopupContainer.list[1].visible = false;
        this.tapToPlayPopupContainer.list[2].visible = false;
        this.scene.bottomPanel.HideAutoPlayContainerChildren();
    }

    EnableButtons(_button) {
        _button.setAlpha(1);
        _button.setInteractive({ useHandCursor: true });
    }
    DisableButtons(_button) {
        _button.setAlpha(0.5);
        _button.removeInteractive();
    };

    CreateMenuButton() {
        if (Constant.isPortrait) {
            this.menuButton = this.scene.add.image(400, -880, "menu").setOrigin(0.5, 0).setScale(1);//(Constant.scaleFactorX * 0.7, Constant.scaleFactorY * 0.7);
        }
        else {
            this.menuButton = this.scene.add.image(840, -480, "menu").setOrigin(0.5, 0).setScale(1);//(Constant.scaleFactorX * 0.7, Constant.scaleFactorY * 0.7);
        }
        this.menuButton.setInteractive({ useHandCursor: true });
        this.menuButton.on("pointerdown", this.MenuButtonPressed, this);
        this.menuButton.on("pointerup", this.MenuButtonReleased, this);
        this.menuContainer.add(this.menuButton);
        this.menuContainer.depth = 2;
    };
    MenuButtonPressed() {
        if (Constant.isPortrait) {
            ButtonScaleDownTween(this.scene, this.scene.gameLogo.menuButton, 0.9);
        }
        else {
            ButtonScaleDownTween(this.scene, this.scene.gameLogo.menuButton, 0.9);
        }
    };
    MenuButtonReleased() {
        if (Constant.isPortrait) {
            ButtonScaleDownTween(this.scene, this.scene.gameLogo.menuButton, 1);
        }
        else {
            ButtonScaleDownTween(this.scene, this.scene.gameLogo.menuButton, 1);
        }
        this.scene.menuPopup.ShowMenuPopup();
    };
}

export default GameLogo;