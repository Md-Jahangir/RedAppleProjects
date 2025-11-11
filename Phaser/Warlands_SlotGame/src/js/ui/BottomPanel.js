import { Model } from "../Model.js";
// import { Server } from "../Server.js";
import AlertPopup from "../popups/AlertPopup.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";
import moment from "moment/moment.js";
import { ButtonScaleDownTween } from "../Utils.js";
import { ButtonScaleUpTween } from "../Utils.js";

class BottomPanel {
    constructor(scene) {
        this.scene = scene;
        this.alertPopup = null;
        Constant.game.events.on("evtDisableGUIButton", this.OnDisableGUIButton, this);
        Constant.game.events.on("evtEnableGUIButton", this.OnEnableGUIButton, this);
        Constant.game.events.on("evtAutoGameStarted", this.onAutoSpinStarted, this);
        Constant.game.events.on("evtPaylinesShowingDone", this.onResumeAutoGame, this);
        // Constant.game.events.on("evtStartFreeSpin", this.OnResumeFreeSpin, this);
        Constant.game.events.on("evtPaylinesShowingDone", this.OnResumeFreeSpin, this);


        // Constant.game.events.on("evtEnableSpinButton", this.OnEnableSpinButton, this);
        // Constant.game.events.on("evtDisableSpinButton", this.OnDisableSpinButton, this);

        this.bottomPanelContainer = null;
        this.bottomPanelBg = null;
        this.spinButton = null;
        this.spinButtonGlow = null;

        this.turboOnBase = null;
        this.turboOffBase = null;
        this.turboOffText = null;
        this.turboOnText = null;
        this.turboOnGlow = null;
        this.turboOffGlow = null;

        this.linesHeadingText = null;
        this.lineBase = null;
        this.linesNumberText = null;
        this.lineMinusButton = null;
        this.linePlusButton = null;
        this.linePlusButtonGlow = null;
        this.lineMinusButtonGlow = null;

        this.lineBetHeadingText = null;
        this.lineBetBase = null;
        this.lineBetText = null;
        this.lineBetMinusButton = null;
        this.lineBetPlusButton = null;
        this.lineBetPlusButtonGlow = null;
        this.lineBetMinusButtonGlow = null;

        this.totalBetHeadingText = null;
        this.totalBetBase = null;
        this.totalBetText = null;

        this.balanceHeadingText = null;
        this.balanceBase = null;
        this.balanceText = null;

        this.winBase = null;

        this.bigWinContainer = null;
        this.bigWinBase = null;
        this.bigWinHeadingText = null;

        this.autoplayContainer = null;
        this.autoSpinSelectedText = null;
        this.autoplayButton = null;
        this.autoplayBase = null;
        this.autoplaySpinAmountBase = null;
        this.autoplaySpinAmountText = null;
        this.autoplayMinusButton = null;
        this.autoplayPlusButton = null;
        this.autoplayHeadingText = null;
        this.targetAutoSpin = 0;
        this.autoPlayCounter = 1;


        this.maxAutoSpinAmount = 99;
        this.minAutoSpinAmount = 10;
        this.currentNumberOfAutoSpin = this.maxAutoSpinAmount;

        this.currentLineNumber = 0;
        this.maxLineNumber = 9;
        this.minLineNumber = 1;

        this.betAmountValue = null; //["0.01", "0.05", "0.10", "0.25", "0.50", "1.00"];
        this.betClickCounter = 0;
        this.currentlineBetAmount = null; //this.betAmountValue[this.betClickCounter];
        this.spaceBar = null;
        this.isSpinning = false;
        this.canSpaceKeyPressed = true;
        this.isAutoMode = false;
        this.isImmediateStop = false;
        this.totalAmountBetted = 0.0;
        this.counterBaseImage;
        this.autoPlayCounterText;
        this.autoplayButton;
        this.autoStopButton;
        this.onEnableSpinBtn = false;

        // this.isAutoPlayStarted = false;
        this.counter = 0;

        //freespin
        this.freeSpinContainer = null;
        this.freeSpinCounterBaseImage = null;
        this.isSpinStarted = false;

        this.overlay = null;
        this.create();
        this.normalSpin = null;
        this.updateScoreCounter = 0;
        this.bonusSpin = false;

        this.isDemoAnimationForFreeSpin = false;
        this.isFreeSpinStarted = false;
        this.isSpaceKeyEnable = true;
        this.totalFreeSpinWin = 0;
    };
    //#############################################################################################
    GetRandomLastWinAmount() {
        let factor = (Math.round((Math.random() * (7 - 2) + 2)));
        let amount = ((Math.random() * (0.70 - 0.02) + 0.02)).toFixed(2);
        return (amount * factor);
        // let amount = ((Math.random() * (1.50 - 0.02) + 0.02)).toFixed(2);
        // return amount;
    };
    create() {
        this.spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.alertPopup = new AlertPopup(this.scene);
        this.betAmountValue = ["0.20", "0.40", "0.60", "1.00", "2.00", "4.00", "6.00", "10.00", "20.00", "40.00"];
        this.currentlineBetAmount = parseFloat(this.betAmountValue[this.betClickCounter]).toFixed(2);

        this.bottomPanelContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1)).setScale(Constant.scaleFactor, Constant.scaleFactor);

        this.autoPlayButtonContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.autoPlayButtonContainer.depth = 3;

        // free spin base container
        this.freeSpinContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.freeSpinContainer.depth = 3;

        let bottomPanelBg = this.scene.add.image(0, 0, "bottom_panel_bg").setOrigin(0.5, 1);
        this.bottomPanelContainer.add(
            [
                bottomPanelBg,
            ]
        );

        this.CreateOverlay();
        this.CreateLogoHeadingAndTimeArea();
        this.CreateBalanceArea();
        this.CreateBetArea();
        this.CreatePlusMinusButtonForBet();
        this.CreateWinArea();
        this.CreateAutoSpinButton();
        this.CreateSpinButton();
        this.CreateStopButton();

        this.AutoPlayButtonCretation();
        this.CreateAutoCountBaseImage();
        this.CreateAutoPlayCounterText();

        //freespin
        this.CreateFreeSpinCounterbase();


        // console.log('this.scene.menuPopup.isSpacebarClicked : ', this.scene.menuPopup.isSpacebarClicked)
        this.spaceBar.on("down", this.OnSpaceBarPress, this);

        this.alertPopup.CreateAlertPopup();
    };



    CreateOverlay() {
        if (Constant.isPortrait) {
            this.overlay = this.scene.add.image(0, -1080, 'back_portrait').setOrigin(0.5, 0.5).setScale(1, 1.35).setInteractive(); //.setScale(1080, 1920);
        }
        else {
            this.overlay = this.scene.add.image(0, -540, 'background').setOrigin(0.5, 0.5).setInteractive();
        }
        this.overlay.on('pointerdown', this.OnOverlayClicked, this)
        this.overlay.visible = false;
        this.bottomPanelContainer.add(this.overlay);
    }
    OnOverlayClicked() {
        // console.log('on overlay clicked');
    }
    EnableOverlay() {
        this.overlay.visible = true;
    }
    DisableOverlay() {
        this.overlay.visible = false;
    }
    CreateFreeSpinCounterbase() {
        // console.log('enter when free spin needed');
        if (Constant.isPortrait) {
            this.freeSpinCounterBaseImage = this.scene.add.image(-10, -320, "autoPlay_counter_base").setOrigin(0.5).setScale(2.2, 2.2).setInteractive();
            this.freeSpinCounterBaseImage.on('pointerdown', this.OnCounterBaseImagePresed, this);
            this.freeSpinCounterBaseImage.on('pointerup', this.OnCounterBaseImageReleased, this);
        }
        else {
            this.freeSpinCounterBaseImage = this.scene.add.image(760, -200, "autoPlay_counter_base").setOrigin(0.5).setScale(2.2, 2.2).setInteractive();
            this.freeSpinCounterBaseImage.on('pointerdown', this.OnCounterBaseImagePresed, this);
            this.freeSpinCounterBaseImage.on('pointerup', this.OnCounterBaseImageReleased, this);
        }
        this.freeSpinCounterBaseImage.visible = false;
        this.freeSpinContainer.add(
            [this.freeSpinCounterBaseImage]
        )
    }
    FreeSpinStartedAndBaseImageActivation() {
        this.freeSpinCounterBaseImage.visible = true;
    }

    CreateAutoCountBaseImage() {
        // console.log('enter when base needed')
        if (Constant.isPortrait) {
            this.counterBaseImage = this.scene.add.image(-10, -320, "autoPlay_counter_base").setOrigin(0.5).setInteractive();
            // this.counterBaseImage.on('pointerdown', this.OnCounterBaseImagePresed, this);
            // this.counterBaseImage.on('pointerup', this.OnCounterBaseImageReleased, this);
        }
        else {
            this.counterBaseImage = this.scene.add.image(760, -200, "autoPlay_counter_base").setOrigin(0.5).setInteractive();

        }
        this.counterBaseImage.on('pointerdown', this.OnCounterBaseImagePresed, this);
        this.counterBaseImage.on('pointerup', this.OnCounterBaseImageReleased, this);

        this.counterBaseImage.visible = false;
        this.autoPlayButtonContainer.add(
            [this.counterBaseImage]
        )
    }
    OnCounterBaseImagePresed() {
        // console.log('pressed')
    }
    OnCounterBaseImageReleased() {
        // console.log('Released')
    }
    CreateAutoPlayCounterText() {
        let slash;
        let targetText;
        const limitTextStyle = { fontFamily: 'PR-Viking', fontSize: '75px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        if (Constant.isPortrait) {
            this.autoPlayCounterText = this.scene.add.text(-60, -320, this.autoPlayCounter, limitTextStyle).setOrigin(0.5).setScale(Constant.scaleFactorX * 1, Constant.scaleFactorY * 1)//.setScale(, 1);
            slash = this.scene.add.text(-5, -320, '/', limitTextStyle).setOrigin(0.5)
            targetText = this.scene.add.text(Constant.game.config.width / 19.3, -320, this.targetAutoSpin, limitTextStyle).setOrigin(0.5, 0.5);
        }
        else {
            this.autoPlayCounterText = this.scene.add.text(710, -200, this.autoPlayCounter, limitTextStyle).setOrigin(0.5).setScale(1, 1);
            slash = this.scene.add.text(755, -200, '/', limitTextStyle).setOrigin(0.5)
            targetText = this.scene.add.text(810, -200, this.targetAutoSpin, limitTextStyle).setOrigin(0.5, 0.5);
        }
        this.autoPlayCounterText.visible = false;
        slash.visible = false;
        targetText.visible = false;

        this.autoPlayButtonContainer.add(
            [this.autoPlayCounterText]
        );
        this.autoPlayButtonContainer.add(
            slash
        );
        this.autoPlayButtonContainer.add(
            targetText
        );
        // console.log('this.autoPlayButtonContainer', this.autoPlayButtonContainer)
    }
    CreateLogoHeadingAndTimeArea() {
        let currentTime = moment().format('HH:mm');
        let nordicHeadingText, timeText;
        if (Constant.isPortrait) {
            let headingTextStyle = { fontFamily: 'PR-Viking', fontSize: '40px', fill: '#fff', fontStyle: 'bold', align: 'left' };
            let timeTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '40px', fill: '#fff', fontStyle: 'bold', align: 'left' };
            nordicHeadingText = this.scene.add.text(-510, -(Constant.game.config.height * 1.03), "NORDIC'S TREASURE", headingTextStyle).setOrigin(0, 0.5);
            timeText = this.scene.add.text(-510, -(Constant.game.config.height * 1), currentTime, timeTextStyle).setOrigin(0, 0.5);
        }
        else {
            let headingTextStyle = { fontFamily: 'PR-Viking', fontSize: '30px', fill: '#fff', fontStyle: 'bold', align: 'left' };
            let timeTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '32px', fill: '#fff', fontStyle: 'bold', align: 'left' };
            nordicHeadingText = this.scene.add.text(-880, -90, "NORDIC'S TREASURE", headingTextStyle).setOrigin(0, 0.5);
            timeText = this.scene.add.text(-810, -50, currentTime, timeTextStyle).setOrigin(0, 0.5);
        }

        this.bottomPanelContainer.add(
            [
                nordicHeadingText,
                timeText,
            ]
        );
        this.UpdateTime(timeText);
    }

    UpdateTime(_timeText) {
        this.scene.time.addEvent({
            delay: 1000, // 60,000 milliseconds = 1 minute
            callback: () => {
                let currentTime = moment().format('HH:mm');
                _timeText.setText(currentTime)
            },
            callbackScope: this,
            loop: true
        });
    };

    CreateBalanceArea() {
        let headingTextStyle = { fontFamily: 'PR-Viking', fontSize: '34px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        let balanceTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '30px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        let balanceHeadingText = this.scene.add.text(-450, -90, "BALANCE (FUN)", headingTextStyle).setOrigin(0, 0.5);
        this.balanceText = this.scene.add.text(-400, -45, Model.getBalance(), balanceTextStyle).setOrigin(0, 0.5);

        this.bottomPanelContainer.add(
            [
                balanceHeadingText,
                this.balanceText,
            ]
        );
    };


    CreateWinArea() {
        let headingTextStyle = { fontFamily: 'PR-Viking', fontSize: '34px', fill: '#fff', fontStyle: 'normal', align: 'right' };
        let winHeadingText = this.scene.add.text(410, -90, "WIN (FUN)", headingTextStyle).setOrigin(1, 0.5);

        let winTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '30px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.winText = this.scene.add.text(380, -45, Model.getLastWin(), winTextStyle).setOrigin(1, 0.5);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        // let winText = this.scene.add.text(380, -45, '', winTextStyle).setOrigin(1, 0.5);
        this.bottomPanelContainer.add(
            [
                winHeadingText,
                this.winText,
            ]
        );
    };

    SetWinArea(_winAmount) {
        this.scene.bottomPanel.bottomPanelContainer.list[11].setText(_winAmount);
    };

    CreateBetArea() {
        let headingTextStyle = { fontFamily: 'PR-Viking', fontSize: '34px', fill: '#fff', fontStyle: 'normal', align: 'right' };
        let betTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '30px', fill: '#fff', fontStyle: 'bold', align: 'center' };

        let betHeadingText = this.scene.add.text(-30, -90, "BET (FUN)", headingTextStyle).setOrigin(0.5);
        this.betText = this.scene.add.text(-30, -45, Model.getBetPerLine(), betTextStyle).setOrigin(0.5);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.bottomPanelContainer.add(
            [
                betHeadingText,
                this.betText,
            ]
        );
    }

    CreatePlusMinusButtonForBet() {
        this.betPlusButton = this.scene.add.image(141, -110, "arrow_button").setOrigin(0.5).setScale(0.6);//.setScale(Constant.scaleFactorX * 0.6, Constant.scaleFactorY * 0.6);
        this.betPlusButton.setInteractive({ useHandCursor: true });
        this.betPlusButton.on("pointerdown", this.BetPlusButtonPressed, this);
        this.betPlusButton.on("pointerup", this.BetPlusButtonReleased, this);

        this.betMinusButton = this.scene.add.image(141, -35, "arrow_button").setOrigin(0.5).setScale(0.6);//.setScale(Constant.scaleFactorX * 0.6, Constant.scaleFactorY * 0.6);
        this.betMinusButton.flipY = true;
        this.betMinusButton.alpha = 0.5;
        this.betMinusButton.on("pointerdown", this.BetMinusButtonPressed, this);
        this.betMinusButton.on("pointerup", this.BetMinusButtonReleased, this);
        this.bottomPanelContainer.add(
            [
                this.betPlusButton,
                this.betMinusButton
            ]
        );

        let betPerLine = Model.getBetPerLine();
        this.ToggleBetPlusMinusButton();
    }
    BetPlusButtonPressed() {
        this.betPlusButton.setScale(0.55);
    }
    BetPlusButtonReleased() {
        this.betPlusButton.setScale(0.6);
        this.IncrementBetAmount();
        this.ToggleBetPlusMinusButton();

    }
    BetMinusButtonPressed() {
        this.betMinusButton.setScale(0.55);

    }
    BetMinusButtonReleased() {
        this.betMinusButton.setScale(0.6);
        this.DecrementBetAmount();
        this.ToggleBetPlusMinusButton();

    };

    IncrementBetAmount() {
        if (parseInt(this.currentlineBetAmount) < this.betAmountValue[this.betAmountValue.length - 1]) {
            this.betClickCounter++;
            this.currentlineBetAmount = this.betAmountValue[this.betClickCounter];
            Model.setBetPerLine(this.currentlineBetAmount);
            this.SetBetText(this.currentlineBetAmount);

            //----------------------------forBonusPopUp------------------------------
            let bounsAmt;
            bounsAmt = (this.scene.gameLogo.bonusBettingAmount * this.currentlineBetAmount).toFixed(2);
            this.scene.gameLogo.bonusPopupContainer.list[5].setText('FUN ' + bounsAmt);
        } else { }
    };

    DecrementBetAmount() {
        if (this.currentlineBetAmount > this.betAmountValue[0]) {
            this.betClickCounter--;
            this.currentlineBetAmount = this.betAmountValue[this.betClickCounter];
            Model.setBetPerLine(this.currentlineBetAmount);
            this.SetBetText(this.currentlineBetAmount);

            //----------------------------forBonusPopUp------------------------------
            let bounsAmt;
            bounsAmt = (this.scene.gameLogo.bonusBettingAmount * this.currentlineBetAmount).toFixed(2);

            this.scene.gameLogo.bonusPopupContainer.list[5].setText('FUN ' + bounsAmt);


        } else { }
    };
    ToggleBetPlusMinusButton() {
        if (parseInt(this.currentlineBetAmount) == this.betAmountValue[this.betAmountValue.length - 1]) {
            this.betPlusButton.alpha = 0.5;
            this.betPlusButton.removeInteractive();
        } else if (this.currentlineBetAmount == this.betAmountValue[0]) {
            this.betMinusButton.alpha = 0.5;
            this.betMinusButton.removeInteractive();
        } else {
            this.betPlusButton.alpha = 1;
            this.betMinusButton.alpha = 1;
            this.betPlusButton.setInteractive({ useHandCursor: true });
            this.betMinusButton.setInteractive({ useHandCursor: true });
        }
    };

    //====================================================================

    //===========================================================================
    CreateAutoSpinButton() {
        if (Constant.isPortrait) {
            this.autoSpinButton = this.scene.add.image(275, -325, "auto_spin_button").setOrigin(0.5).setScale(Constant.scaleFactor * 1.8);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        }
        else {
            this.autoSpinButton = this.scene.add.image(841, -378, "auto_spin_button").setOrigin(0.5);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        }
        this.autoSpinButton.setInteractive({ useHandCursor: true });
        this.autoSpinButton.on("pointerdown", this.AutoSpinButtonPressed, this);
        this.autoSpinButton.on("pointerup", this.AutoSpinButtonReleased, this);

        this.bottomPanelContainer.add(
            [
                this.autoSpinButton,
            ]
        );
    };

    AutoSpinButtonPressed() {
        let scaleValue;
        if (Constant.isPortrait) {
            scaleValue = 1.6;
        }
        else {
            scaleValue = 0.9;
        }
        ButtonScaleDownTween(this.scene, this.scene.bottomPanel.autoSpinButton, scaleValue);
    };
    AutoSpinButtonReleased() {
        let scaleValue;
        if (Constant.isPortrait) {
            scaleValue = 1.8;
        }
        else {
            scaleValue = 1;
        }
        ButtonScaleUpTween(this.scene, this.scene.bottomPanel.autoSpinButton, scaleValue);

        this.scene.autoPlayPopup.ShowAutoplayPopup();
        this.autoplayButton.visible = true;
        // this.betPlusButton.removeInteractive();
        // this.betMinusButton.removeInteractive();
    };

    AutoPlayButtonCretation() {
        if (Constant.isPortrait) {
            this.autoplayButton = this.scene.add.image(-10, -325, "button_star_autoplay").setOrigin(0.5).setScale(1, 1)//.setDepth(5);
        }
        else {
            this.autoplayButton = this.scene.add.image(760, -200, "button_star_autoplay").setOrigin(0.5).setScale(1, 1)//.setDepth(5);           
        }
        this.autoplayButton.setInteractive({ useHandCursor: true });
        this.autoplayButton.on('pointerdown', this.AutoPlayButtonPressed, this);
        this.autoplayButton.on('pointerup', this.AutoPlayButtonReleased, this);
        this.autoplayButton.visible = false;
        this.autoPlayButtonContainer.add(
            [
                this.autoplayButton
            ]
        );
    };

    AutoPlayButtonPressed() {
        let scaleValue;
        if (Constant.isPortrait) {
            scaleValue = 0.99;
        }
        else {
            scaleValue = 0.97;
        }
        ButtonScaleDownTween(this.scene, this.scene.bottomPanel.autoplayButton, scaleValue);
    };

    AutoPlayButtonReleased() {
        ButtonScaleUpTween(this.scene, this.scene.bottomPanel.autoplayButton, 1);
        this.counter = 0;
        // this.isAutoPlayStarted = false;
        // this.isAutoPlayStarted = true;
        this.scene.autoPlayPopup.HideAutoplayPopup();
        this.stopButton.visible = true;
        this.counterBaseImage.visible = true;
        Constant.game.events.emit("evtAutoGameStarted", this);
    };

    //===========================================================================


    //=========================================================================
    CreateSpinButton() {
        if (Constant.isPortrait) {
            this.spinButton = this.scene.add.image(-10, -200, "spin_button").setOrigin(0.5, 1);//.setScale(1);//Constant.scaleFactorX * 0.9, Constant.scaleFactorY * 0.9);
        }
        else {
            this.spinButton = this.scene.add.image(760, -200, "spin_button").setOrigin(0.5).setScale(0.9);//Constant.scaleFactorX * 0.9, Constant.scaleFactorY * 0.9);
        }

        this.spinButton.setInteractive({ useHandCursor: true });
        this.spinButton.on("pointerdown", this.SpinButtonPressed, this);
        this.spinButton.on("pointerup", this.SpinButtonReleased, this);

        this.bottomPanelContainer.add(this.spinButton);
    };

    SpinButtonPressed() {
        let scaleValue;
        if (Constant.isPortrait) {
            scaleValue = 0.99;
        }
        else {
            scaleValue = 0.97;
        }
        ButtonScaleDownTween(this.scene, this.spinButton, scaleValue);
    };
    SpinButtonReleased() {
        ButtonScaleDownTween(this.scene, this.spinButton, 1);
        this.Spin();
    };

    OnSpaceBarPress() {

        if (!this.isSpaceKeyEnable) return;
        if (!this.canSpaceKeyPressed) return;
        if (this.isSpinning) return;
        if (this.isAutoMode) return;
        if (this.isFreeSpinStarted) return;
        this.Spin();


        // if (this.isSpinStarted == false) {
        //     if (this.isAutoPlayStarted == true || this.scene.gameLogo.isBuyBonusButtonClicked == true) {
        //         // console.log(' enter when auto play started', this.isAutoPlayStarted)
        //     }
        //     else {
        //         // console.log(' enter when auto play not started')
        //         if (this.scene.menuPopup.isSpacebarClicked == true) {
        //             this.isAutoPlayStarted = false;
        //             // this.DisableButton(this.autoSpinButton);
        //             this.DisableButton(this.scene.gameLogo.buyBonusContainer.list[0]); // buy bonus button 
        //             this.Spin();
        //             // this.DisableSpaceBar();
        //             // this.scene.menuPopup.isSpacebarClicked = false; 
        //         }
        //         else {

        //         }
        //     }
        // }
        // else { }
    }
    EnableSpaceBar() {
        this.scene.input.keyboard.enabled = true;
    }
    DisableSpaceBar() {
        this.scene.input.keyboard.enabled = false;
    }
    CreateStopButton() {
        if (Constant.isPortrait) {

            this.stopButton = this.scene.add.image(275, -325, "button_stop_autoplay").setOrigin(0.5).setScale(1.45);
        }
        else {
            this.stopButton = this.scene.add.image(841, -375, "button_stop_autoplay").setOrigin(0.5);

        }
        this.stopButton.setInteractive({ useHandCursor: true });
        this.stopButton.on("pointerdown", this.StopButtonPressed, this);
        this.stopButton.on("pointerup", this.StopButtonReleased, this);
        this.stopButton.setVisible(false);

        this.bottomPanelContainer.add(
            [
                // this.stopButtonGlow,
                this.stopButton,
            ]
        );
    }

    StopButtonPressed() {
        this.stopButton.setScale(0.9);
        // this.isImmediateStop = true;
    }
    StopButtonReleased() {
        this.stopButton.setScale(1);
        this.isAutoMode = false;

        this.autoPlayCounter = 1;
        this.autoPlayButtonContainer.list[3].visible = false;
        this.autoPlayButtonContainer.list[4].visible = false;
        this.stopButton.setVisible(false);
        this.autoplayButton.visible = false;
        this.counterBaseImage.visible = false;
        this.autoPlayCounterText.visible = false;
        // if (this.scene.bottomPanel.isSpinStarted == false) {
        //     this.scene.gameLogo.EnableButtons(this.scene.gameLogo.buyBonusContainer.list[0])
        // }
    }

    //=========================================================================
    // EnableSpinButton() {
    //     this.EnableButton(this.spinButton);
    // }

    // DisableSpinButton() {
    //     this.DisableButton(this.spinButton);
    // }

    // ShowAutoSpinButton() {
    //     this.autoSpinButton.setVisible(true);
    //     this.autoStopButton.setVisible(false);
    //     this.autoSpinButtonGlow.setVisible(false);
    //     this.autoStopButtonGlow.setVisible(false);
    // }
    // HideAutoSpinButton() {
    //     this.autoSpinButton.setVisible(false);
    //     this.autoStopButton.setVisible(true);
    //     this.autoSpinButtonGlow.setVisible(false);
    //     this.autoStopButtonGlow.setVisible(false);
    // }

    // OnEnableSpinButton() {
    //     // console.log('spin biutton enables')
    //     this.onEnableSpinBtn = true;
    //     if (this.onEnableSpinBtn) {
    //         if (this.scene.gameLogo.onStartButtonPressed) {
    //             // console.log('this.scene.gameLogo.onStartButtonPressed', this.scene.gameLogo.onStartButtonPressed)
    //             if (!this.normalSpin) {
    //                 // console.log("Tap to Play")
    //                 this.scene.autoPlayPopup.buttonValue = 10;//---------------------------------------------------------------------------------
    //                 this.bonusSpin = true;
    //                 Constant.game.events.emit("evtParchmentPopupShow", "Tap To Play");
    //                 // this.counter = 0;
    //             }
    //             //  this.scene.gameLogo.onStartButtonPressed = false;
    //             else {
    //                 // this.EnableSpaceBar();
    //             }

    //         }
    //         else {

    //         }
    //     }
    //     //------------------------------
    //     if (!this.scene.gameLogo.onStartButtonPressed) {
    //         // console.log("Enable Buy Bonus")
    //         Constant.gameStarted = false;
    //         this.EnableSpinButton();
    //         this.scene.gameLogo.EnableButtons(this.scene.gameLogo.buyBonusContainer.list[0]);
    //     }
    // }
    // OnDisableSpinButton() {
    //     Constant.gameStarted = true;
    //     this.DisableSpinButton();
    // }

    OnDisableGUIButton() {
        this.DisableButton(this.spinButton);
        this.DisableButton(this.betPlusButton);
        this.DisableButton(this.betMinusButton);
        this.DisableButton(this.autoSpinButton);
        this.DisableButton(this.scene.gameLogo.buyBonusButton);
    };

    OnEnableGUIButton() {
        this.EnableButton(this.spinButton);
        this.EnableButton(this.betPlusButton);
        this.EnableButton(this.betMinusButton);
        this.EnableButton(this.autoSpinButton);
        this.EnableButton(this.scene.gameLogo.buyBonusButton);

        console.log("on enable : ", Model.getBalance());
        this.SetWinAmountText();
        this.SetBalanceText();
        // this.isSpinning = false;
        this.canSpaceKeyPressed = true;
        // this.EnableSpaceBar();
    };

    DisableButton(_button) {
        _button.setAlpha(0.5);
        _button.removeInteractive();
    }
    EnableButton(_button) {
        _button.setAlpha(1);
        _button.setInteractive({ useHandCursor: true });
    }

    //========================================================================
    // onAutoSpinStarted(_autoPlayNumber) {
    //     this.targetAutoSpin = _autoPlayNumber;

    //     this.autoPlayCounterText.visible = true;
    //     this.autoPlayButtonContainer.list[3].visible = true;
    //     this.autoPlayButtonContainer.list[4].setText(this.targetAutoSpin);
    //     this.autoPlayButtonContainer.list[4].visible = true;
    //     this.autoPlayCounterText.setText(this.autoPlayCounter);
    //     //----------------------------------------------------------------------

    //     this.autoPlayNumber = _autoPlayNumber;
    //     this.isAutoMode = true;
    //     this.isImmediateStop = false;
    //     this.Spin();
    // };
    onAutoSpinStarted() {
        this.isAutoMode = true;
        this.targetAutoSpin = this.scene.autoPlayPopup.buttonValue;
        this.autoPlayCounterText.visible = true;
        this.autoPlayButtonContainer.list[3].visible = true;
        this.autoPlayButtonContainer.list[4].setText(this.targetAutoSpin);
        this.autoPlayButtonContainer.list[4].visible = true;
        this.autoPlayCounterText.setText(this.autoPlayCounter);
        //----------------------------------------------------------------------

        // this.autoPlayNumber = this.scene.autoPlayPopup.buttonValue;
        // this.isImmediateStop = false;
        this.Spin();
    };
    onResumeAutoGame() {
        console.log("onResumeAutoGame: ");
        if (!this.isAutoMode) return;

        if (this.targetAutoSpin > this.autoPlayCounter) {
            this.autoPlayCounter += 1;
            this.autoPlayCounterText.setText(this.autoPlayCounter);
            this.Spin();
        } else if (this.targetAutoSpin == "∞") {
            this.autoPlayCounter += 1;
            this.autoPlayCounterText.setText(this.autoPlayCounter);
            this.Spin();
        }
        else {
            this.isAutoMode = false;
            this.autoPlayCounter = 1;
            this.autoPlayButtonContainer.list[3].visible = false;
            this.autoPlayButtonContainer.list[4].visible = false;
            this.stopButton.setVisible(false);
            this.autoplayButton.visible = false;
            this.counterBaseImage.visible = false;
            this.autoPlayCounterText.visible = false;
        }

    };

    OnResumeFreeSpin() {
        if (!this.scene.reelsView.isFreeSpinStarted) return;
        if (this.autoPlayCounter < this.targetAutoSpin) {
            this.autoPlayCounter += 1;
            this.autoPlayCounterText.setText(this.autoPlayCounter);
            this.FreeSpin();
        } else {
            this.scene.reelsView.isFreeSpinStarted = false;
            this.autoPlayCounter = 1;
            Constant.game.events.emit("evtShowTapToContinuePopup");
            Model.SetFreeSpinTotalWinAmount(parseFloat(this.totalFreeSpinWin).toFixed(2));
            let totalBalance = parseFloat(Model.getBalance());
            let lastWinBalance = parseFloat(parseFloat(this.totalFreeSpinWin).toFixed(2));
            let currentBalance = parseFloat(totalBalance) + parseFloat(lastWinBalance);
            Model.setBalance(parseFloat(parseFloat(currentBalance)).toFixed(2));
            Model.setLastWin(parseFloat(0).toFixed(2));
        }
    };

    HideAutoPlayContainerChildren() {
        this.autoPlayButtonContainer.list[1].setVisible(false);
        this.autoPlayCounterText.visible = false;
        this.autoPlayButtonContainer.list[3].visible = false;
        this.autoPlayButtonContainer.list[4].visible = false;
        Constant.game.events.emit("evtEnableGUIButton");
    };

    FreeSpin() {
        if (this.isSpinning) return;
        SoundManager.PlayReelSound();
        Constant.game.events.emit("evtSpinStart");
        this.isSpinning = true;
        let lastWinAmount = this.GetRandomLastWinAmount();
        Model.setLastWin(parseFloat(lastWinAmount).toFixed(2));
        setTimeout(() => {
            this.isSpinning = false;
            Constant.game.events.emit("evtSpinStop");
            // this.UpdateWinAndTotalBalance();
            // this.UpdateFreeSpinwinAmount();
        }, 2000);
    };
    // onResumeAutoGame() {
    //     if (!this.isAutoMode) {
    //         if (!this.scene.gameLogo.onStartButtonPressed) {       //  added for start button pressed 
    //             // this.EnableButton(this.autoSpinButton);
    //         }
    //         return;
    //     }
    //     else {
    //         this.isImmediateStop = false;

    //         //-------------------------------------------------------------------------
    //         if (this.autoPlayCounter == "∞") {
    //             this.autoPlayCounterText.setText("∞");
    //             this.autoPlayCounter += 1
    //             if (this.scene.reelsView.tweenBool) {
    //                 this.SetWinArea(this.scene.reelsView.tempTarget);
    //             }
    //         }
    //         //-------------------------------------------------------------------------
    //         else {
    //             this.autoPlayCounter += 1;
    //             if (this.scene.reelsView.tweenBool) {
    //                 this.SetWinArea(this.scene.reelsView.tempTarget);
    //             }

    //             if (Constant.isPortrait) {
    //                 if (this.autoPlayCounter < 10) {
    //                     this.autoPlayCounterText.setPosition(-Constant.game.config.width / 21.62, -320)
    //                 } else if (this.autoPlayCounter >= 10 && this.autoPlayCounter < 100) {
    //                     this.autoPlayCounterText.setPosition(-Constant.game.config.width / 19.62, -320)
    //                 } else if (this.autoPlayCounter == 100) {
    //                     this.autoPlayCounterText.setPosition(-Constant.game.config.width / 17.62, -320)
    //                 }
    //                 this.autoPlayCounterText.setText(this.autoPlayCounter);
    //             } else {
    //                 if (this.targetAutoSpin < 10) {
    //                     this.autoPlayButtonContainer.list[4].setPosition(800, -200)
    //                 } else if (this.targetAutoSpin >= 10 && this.targetAutoSpin < 100) {
    //                     this.autoPlayButtonContainer.list[4].setPosition(800, -200)
    //                 } else if (this.targetAutoSpin == 100) {
    //                     this.autoPlayButtonContainer.list[4].setPosition(820, -200)
    //                 }
    //                 this.autoPlayCounterText.setText(this.autoPlayCounter);
    //             }

    //         }
    //         // console.log('CheckAUtoCounter', this.autoPlayCounter, this.targetAutoSpin)
    //         if (this.autoPlayCounter > this.targetAutoSpin) {
    //             // this.scene.menuPopup.isSpacebarClicked = true;
    //             // console.log('CheckAUto', this.autoPlayCounter, this.targetAutoSpin)
    //             this.scene.bottomPanel.betPlusButton.setInteractive({ useHandCursor: true });
    //             this.scene.bottomPanel.betMinusButton.setInteractive({ useHandCursor: true });
    //             //-------------------------------------------------
    //             this.counterBaseImage.visible = false;
    //             this.autoPlayCounterText.visible = false;
    //             this.autoplayButton.visible = false;
    //             // console.log('auto play exceedes');
    //             this.isAutoMode = false;
    //             this.stopButton.visible = false;
    //             this.autoPlayCounter = 1;
    //             this.EnableButton(this.autoSpinButton);
    //             this.EnableButton(this.spinButton);
    //             // this.EnableSpaceBar();
    //             // this.scene.menuPopup.isSpacebarClicked = true; 
    //             // this.isSpinStarted = false;
    //             this.autoPlayButtonContainer.list[3].visible = false;
    //             this.autoPlayButtonContainer.list[4].visible = false;
    //             this.isAutoPlayStarted = false;
    //             this.spinButton.visible = true;
    //             this.spinButton.setAlpha(1);
    //             this.scene.gameLogo.EnableButtons(this.scene.gameLogo.buyBonusContainer.list[0]);

    //             // this.bottomPanelContainer.list[14].setAlpha(1); 
    //             if (this.scene.gameLogo.onStartButtonPressed) {
    //                 // Constant.game.events.emit("evtParchmentPopupShow", "Tap To Continue");

    //                 //------------------------------------------------------------------------------

    //                 Constant.game.events.emit("evtShowTapToContinuePopup");

    //             }

    //         }
    //         else {
    //             this.Spin();
    //         }


    //     }
    //     // }
    // };

    //========================================================================


    //====================================================================
    Spin() {
        if (this.isSpinning) return;
        Model.setLastWin(parseFloat(0).toFixed(2));
        this.SetWinAmountText();
        let totalBalance = Model.getBalance();
        let totalBetAmount = Model.getBetPerLine();
        let lastWinAmount = this.GetRandomLastWinAmount();
        Model.setLastWin(parseFloat(lastWinAmount).toFixed(2));
        if (this.scene.gameLogo.isDemoAnimationForFreeSpin) {
            let bonusAmount = Model.GetBonusAmountForDeduct(totalBetAmount);
            totalBetAmount = (parseFloat(bonusAmount).toFixed(2));
        }

        if (parseFloat(totalBalance) >= parseFloat(totalBetAmount)) {
            if (this.isSpinning) return;
            this.isSpinning = true;
            this.canSpaceKeyPressed = false;
            totalBalance -= totalBetAmount;
            Model.setBalance(totalBalance);
            this.SetBalanceText();
            Constant.game.events.emit("evtDisableGUIButton");
            SoundManager.PlayReelSound();
            Constant.game.events.emit("evtSpinStart");
            setTimeout(() => {
                this.OnSpinResults();
            }, 2000);
        } else {
            this.isAutoMode = false;
            this.autoPlayCounter = 1;
            this.alertPopup.ShowAlertPopup("Sorry ! You dont have sufficient balance");
            Constant.game.events.emit("evtEnableGUIButton");
        }
    };

    OnSpinResults() {
        this.isSpinning = false;
        Constant.game.events.emit("evtSpinStop");
        if (!this.scene.gameLogo.isDemoAnimationForFreeSpin) {
            if (!this.scene.reelsView.isFreeSpinStarted) {
                this.UpdateWinAndTotalBalance();
            }
        }
    };

    UpdateWinAndTotalBalance() {
        let totalBalance = Model.getBalance();
        let lastWinBalance = Model.getLastWin();
        let currentBalance = parseFloat(totalBalance) + parseFloat(lastWinBalance);
        Model.setBalance(parseFloat(parseFloat(currentBalance)).toFixed(2));
        // console.log("totalBalance: ", totalBalance);
        // console.log("lastWinBalance: ", lastWinBalance);
        // console.log("currentBalance: ", currentBalance);
    };

    UpdateFreeSpinwinAmount() {
        let lastWinBalance = parseFloat(Model.getLastWin());
        // console.log("lastWinBalance: ", lastWinBalance);
        this.totalFreeSpinWin = parseFloat(this.totalFreeSpinWin) + parseFloat(lastWinBalance);
        // console.log("UpdateFreeSpinwinAmount: ", this.totalFreeSpinWin);
        Model.setLastWin(parseFloat(this.totalFreeSpinWin).toFixed(2));
        this.SetWinAmountText();
    }

    //=====================================================================

    SetBetText(_betAmount) {
        this.betText.setText(_betAmount);
    }

    SetBalanceText() {
        this.balanceText.setText(parseFloat(Model.getBalance()).toFixed(2));
        // this.scene.bottomPanel.bottomPanelContainer.list[5].setText(Model.getBalance());
    }

    SetWinAmountText() {
        this.winText.setText(Model.getLastWin());
    }

};

export default BottomPanel;