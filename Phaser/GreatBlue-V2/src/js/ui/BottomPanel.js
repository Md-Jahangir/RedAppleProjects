import { Model } from "../Model.js";
import { Server } from "../Server.js";
import AlertPopup from "../popups/AlertPopup.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";

class BottomPanel {
    constructor(scene) {
        this.scene = scene;
        this.alertPopup = null;
        this.scene.game.events.on("evtDisableGUIButton", this.OnDisableGUIButton, this);
        this.scene.game.events.on("evtEnableGUIButton", this.OnEnableGUIButton, this);
        this.scene.game.events.on("evtFreeSpinsDone", this.onResumeAutoGame, this);
        this.scene.game.events.on("evtAutoGameStarted", this.onAutoSpinStarted, this);
        this.scene.game.events.on("evtPaylinesShowingDone", this.onResumeAutoGame, this);

        this.scene.game.events.on("evtEnableSpinButton", this.OnEnableSpinButton, this);
        this.scene.game.events.on("evtDisableSpinButton", this.OnDisableSpinButton, this);

        this.scene.game.events.on("evtFreeSpinStopButton", this.OnShowFreeSpinStopButton, this);

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
        this.winText = null;

        this.bigWinContainer = null;
        this.bigWinBase = null;
        this.bigWinHeadingText = null;;

        this.autoplayContainer = null;
        this.autoSpinSelectedText = null;
        this.autoplayButton = null;
        this.autoplayBase = null;
        this.autoplaySpinAmountBase = null;
        this.autoplaySpinAmountText = null;
        this.autoplayMinusButton = null;
        this.autoplayPlusButton = null;
        this.autoplayHeadingText = null;

        this.currentLineNumber = 0;
        this.maxLineNumber = 25;
        this.minLineNumber = 1;

        this.betAmountValue = null; //["0.01", "0.05", "0.10", "0.25", "0.50", "1.00"];
        this.betClickCounter = 0;
        this.currentlineBetAmount = null; // this.betAmountValue[this.betClickCounter];

        this.isSpinning = false;
        this.isAutoMode = false;
        this.isImmediateStop = false;

        this.currentBlanace = 0;
        this.totalAmountBetted = 0.0;
        // this.responseTimer = null;

        this.create();
    };
    //#############################################################################################
    /**
     *
     */

    create() {
        this.alertPopup = new AlertPopup(this.scene);

        this.betAmountValue = Model.GetBetAmountValue();
        this.currentlineBetAmount = parseFloat(this.betAmountValue[this.betClickCounter]).toFixed(2);;
        Model.setBetPerLine(this.currentlineBetAmount);

        this.bottomPanelContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.bottomPanelBg = this.scene.add.image(0, 0, "bottom_panel_bg").setOrigin(0.5, 1);
        this.bottomPanelContainer.add(
            [
                this.bottomPanelBg,
            ]
        );

        this.CreateBalanceBase();
        this.CreateLineBase();
        this.CreateLineBetBase();
        this.CreateAutoSpinButton();
        this.CreateAutoStopButton();
        this.CreateSpinButton();
        this.CreateStopButton();
        this.CreateFreeSpinStopButton();

        this.CreateWinBase();
        this.CreateBigWinBase();

        this.alertPopup.CreateAlertPopup();
    };

    CreateLineBase() {
        let headingTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '34px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        let balanceTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '45px', fill: '#fff', fontStyle: 'bold', align: 'center' };

        this.lineBase = this.scene.add.image(-410, -112, "line_base").setOrigin(0.5);
        this.linesHeadingText = this.scene.add.text(-410, -149, "LINE", headingTextStyle).setOrigin(0.5);
        this.linesNumberText = this.scene.add.text(-410, -92, Model.GetLineNumber(), balanceTextStyle).setOrigin(0.5);

        this.lineMinusButtonGlow = this.scene.add.image(-468, -37, "line_plus_minus_glow").setOrigin(0.5);
        this.lineMinusButtonGlow.setVisible(false);
        this.lineMinusButton = this.scene.add.image(-468, -37, "line_minus_button").setOrigin(0.5);
        this.lineMinusButton.setInteractive({ useHandCursor: true });
        this.lineMinusButton.on("pointerdown", this.LineMinusButtonPressed, this);
        this.lineMinusButton.on("pointerup", this.LineMinusButtonReleased, this);

        this.linePlusButtonGlow = this.scene.add.image(-349, -37, "line_plus_minus_glow").setOrigin(0.5);
        this.linePlusButtonGlow.setVisible(false);
        this.linePlusButton = this.scene.add.image(-349, -37, "line_plus_button").setOrigin(0.5);
        this.linePlusButton.alpha = 0.5;
        this.linePlusButton.on("pointerdown", this.LinePlusButtonPressed, this);
        this.linePlusButton.on("pointerup", this.LinePlusButtonReleased, this);
        this.bottomPanelContainer.add(
            [
                this.lineBase,
                this.linesHeadingText,
                this.linesNumberText,
                this.lineMinusButtonGlow,
                this.lineMinusButton,
                this.linePlusButtonGlow,
                this.linePlusButton
            ]
        );
    }

    CreateLineBetBase() {
        let lines = Model.getLines();
        let betPerLine = Model.getBetPerLine();
        let totalBetAmount = parseFloat(lines * betPerLine).toFixed(2);

        let headingTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '32px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        let balanceTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '45px', fill: '#fff', fontStyle: 'bold', align: 'center' };

        this.lineBetBase = this.scene.add.image(-75, -112, "line_bet_base").setOrigin(0.5);
        this.lineBetHeadingText = this.scene.add.text(-76, -149, "TOTAL BET", headingTextStyle).setOrigin(0.5);
        this.lineBetText = this.scene.add.text(-75, -92, "$ " + totalBetAmount, balanceTextStyle).setOrigin(0.5);

        this.lineBetMinusButtonGlow = this.scene.add.image(-160, -37, "line_bet_plus_minus_glow").setOrigin(0.5);
        this.lineBetMinusButtonGlow.setVisible(false);
        this.lineBetMinusButton = this.scene.add.image(-160, -37, "line_bet_minus_button").setOrigin(0.5);
        this.lineBetMinusButton.alpha = 0.5;
        this.lineBetMinusButton.on("pointerdown", this.LineBetMinusButtonPressed, this);
        this.lineBetMinusButton.on("pointerup", this.LineBetMinusButtonReleased, this);

        this.lineBetPlusButtonGlow = this.scene.add.image(13, -37, "line_bet_plus_minus_glow").setOrigin(0.5);
        this.lineBetPlusButtonGlow.setVisible(false);
        this.lineBetPlusButton = this.scene.add.image(13, -37, "line_bet_plus_button").setOrigin(0.5);
        this.lineBetPlusButton.setInteractive({ useHandCursor: true });
        this.lineBetPlusButton.on("pointerdown", this.LineBetPlusButtonPressed, this);
        this.lineBetPlusButton.on("pointerup", this.LineBetPlusButtonReleased, this);
        this.bottomPanelContainer.add(
            [
                this.lineBetBase,
                this.lineBetHeadingText,
                this.lineBetText,
                this.lineBetMinusButtonGlow,
                this.lineBetMinusButton,
                this.lineBetPlusButtonGlow,
                this.lineBetPlusButton,
            ]
        );
    }

    CreateBalanceBase() {
        let headingTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '34px', fill: '#fff', fontStyle: 'normal', align: 'left' };
        let balanceTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '45px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.balanceHeadingText = this.scene.add.text(-810, -113, "BALANCE", headingTextStyle).setOrigin(0, 0.5);
        this.balanceBase = this.scene.add.image(-740, -60, "total_bet_base").setOrigin(0.5);
        this.balanceText = this.scene.add.text(-875, -60, "$ " + Model.getBalance(), balanceTextStyle).setOrigin(0, 0.5);

        this.bottomPanelContainer.add(
            [
                this.balanceHeadingText,
                this.balanceBase,
                this.balanceText,
            ]
        );
    }

    //=================================================================

    //==================================================================
    CreateWinBase() {
        this.winBase = this.scene.add.image(Math.round(Constant.game.config.width) - (40 * Constant.scaleFactorX), Math.round(Constant.game.config.height / 34), "message_base").setOrigin(1, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        let winTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '35px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.winText = this.scene.add.text(this.winBase.x - (170 * Constant.scaleFactorX), this.winBase.y + (9 * Constant.scaleFactorY), "WIN $ " + Model.getLastWin(), winTextStyle).setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

    }
    ShowWinBase() {
        this.winBase.setVisible(true);
        this.winText.setVisible(true);
    }
    HideWinBase() {
        this.winBase.setVisible(false);
        this.winText.setVisible(false);

    }

    //===================================================================

    //=================================================================
    CreateBigWinBase() {
        this.bigWinBase = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2.2), "big_win_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.bigWinBase.depth = 1;
        let bigWinHeadingTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '60px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.bigWinHeadingText = this.scene.add.text(this.bigWinBase.x, this.bigWinBase.y - (45 * Constant.scaleFactorY), "WIN", bigWinHeadingTextStyle).setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.bigWinHeadingText.depth = 1;
        let bigWinAmountTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '90px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.bigWinAmountText = this.scene.add.text(this.bigWinHeadingText.x, this.bigWinHeadingText.y + (90 * Constant.scaleFactorY), "$ 17", bigWinAmountTextStyle).setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.bigWinAmountText.depth = 1;
        this.HideBigWin();
    }
    HideBigWin() {
        this.bigWinBase.setVisible(false);
        this.bigWinHeadingText.setVisible(false);
        this.bigWinAmountText.setVisible(false);
    }
    ShowBigWin() {
        this.bigWinBase.setVisible(true);
        this.bigWinHeadingText.setVisible(true);
        this.bigWinAmountText.setVisible(true);
        this.bigWinAmountText.setText("WIN $ " + Model.getLastWin());
        let scaleTween = this.scene.add.tween({
            targets: [this.bigWinBase, this.bigWinHeadingText, this.bigWinAmountText],
            delay: 100,
            scaleX: 1.2 * Constant.scaleFactor,
            scaleY: 1.2 * Constant.scaleFactor,
            ease: 'Linear',
            duration: 400,
            repeat: -1,
            yoyo: true,
        });
    }

    //==================================================================

    //=================================================================
    CreateAutoSpinButton() {
        this.autoSpinButtonGlow = this.scene.add.image(325, -75, "auto_spin_glow").setOrigin(0.5);
        this.autoSpinButtonGlow.setVisible(false);
        this.autoSpinButton = this.scene.add.image(325, -70, "auto_spin_button").setOrigin(0.5);
        this.autoSpinButton.setInteractive({ useHandCursor: true });
        this.autoSpinButton.on("pointerdown", this.AutoSpinButtonPressed, this);
        this.autoSpinButton.on("pointerup", this.AutoSpinButtonReleased, this);
        this.bottomPanelContainer.add(
            [
                this.autoSpinButtonGlow,
                this.autoSpinButton,
            ]
        );
    }

    AutoSpinButtonPressed() {
        this.autoSpinButtonGlow.setVisible(true);
    }
    AutoSpinButtonReleased() {
        this.autoSpinButtonGlow.setVisible(false);
        this.scene.game.events.emit("evtAutoGameStarted");
        this.HideAutoSpinButton();
    }
    CreateAutoStopButton() {
        this.autoStopButtonGlow = this.scene.add.image(325, -75, "auto_spin_glow").setOrigin(0.5);
        this.autoStopButtonGlow.setVisible(false);
        this.autoStopButton = this.scene.add.image(325, -70, "stop_auto_spin_button").setOrigin(0.5);
        this.autoStopButton.setInteractive({ useHandCursor: true });
        this.autoStopButton.on("pointerdown", this.AutoStopButtonPressed, this);
        this.autoStopButton.on("pointerup", this.AutoStopButtonReleased, this);
        this.autoStopButton.setVisible(false);
        this.bottomPanelContainer.add(
            [
                this.autoStopButtonGlow,
                this.autoStopButton,
            ]
        );
    }

    AutoStopButtonPressed() {
        this.autoStopButtonGlow.setVisible(true);
        this.isAutoMode = false;
    }
    AutoStopButtonReleased() {
        this.autoStopButtonGlow.setVisible(false);
        this.ShowAutoSpinButton();

    }

    //======================================================================

    //======================================================================
    CreateSpinButton() {
        this.spinButtonGlow = this.scene.add.image(735, -75, "spin_glow").setOrigin(0.5);
        this.spinButtonGlow.setVisible(false);
        this.spinButton = this.scene.add.image(735, -70, "spin_button").setOrigin(0.5);
        this.spinButton.setInteractive({ useHandCursor: true });
        this.spinButton.on("pointerdown", this.SpinButtonPressed, this);
        this.spinButton.on("pointerup", this.SpinButtonReleased, this);
        this.bottomPanelContainer.add(
            [
                this.spinButtonGlow,
                this.spinButton,
            ]
        );
    }

    SpinButtonPressed() {
        this.spinButtonGlow.setVisible(true);
        SoundManager.StopPaylineContinuouslySound();
        this.isImmediateStop = false;

    }
    SpinButtonReleased() {
        this.spinButtonGlow.setVisible(false);
        this.Spin();
    }

    CreateStopButton() {
        this.stopButtonGlow = this.scene.add.image(735, -75, "spin_glow").setOrigin(0.5);
        this.stopButtonGlow.setVisible(false);
        this.stopButton = this.scene.add.image(735, -70, "stop_button").setOrigin(0.5);
        this.stopButton.setInteractive({ useHandCursor: true });
        this.stopButton.on("pointerdown", this.StopButtonPressed, this);
        this.stopButton.on("pointerup", this.StopButtonReleased, this);
        this.stopButton.setVisible(false);
        this.bottomPanelContainer.add(
            [
                this.stopButtonGlow,
                this.stopButton,
            ]
        );
    }

    StopButtonPressed() {
        this.isImmediateStop = true;
        this.stopButtonGlow.setVisible(true);
        this.scene.game.events.emit("evtSpinStartClearPayLine");
        SoundManager.SpinButtonClickSound();
        SoundManager.SpinStopSound();
        this.scene.game.events.emit("evtSpinStopImmediate");
        this.ShowSpinButton();
        SoundManager.StopPaylineContinuouslySound();
    }
    StopButtonReleased() {
        this.stopButtonGlow.setVisible(false);
        // this.ShowSpinButton();
        // SoundManager.StopPaylineContinuouslySound();
    }

    //==================================================================

    //=====================================================================
    CreateFreeSpinStopButton() {
        this.freeSpinStopButtonGlow = this.scene.add.image(735, -75, "spin_glow").setOrigin(0.5);
        this.freeSpinStopButtonGlow.setVisible(false);
        this.freeSpinStopButton = this.scene.add.image(735, -70, "stop_button").setOrigin(0.5);
        this.freeSpinStopButton.setInteractive({ useHandCursor: true });
        this.freeSpinStopButton.on("pointerdown", this.FreeSpinStopButtonPressed, this);
        this.freeSpinStopButton.on("pointerup", this.FreeSpinStopButtonReleased, this);
        this.freeSpinStopButton.setVisible(false);
        this.bottomPanelContainer.add(
            [
                this.freeSpinStopButtonGlow,
                this.freeSpinStopButton,
            ]
        );
    }

    FreeSpinStopButtonPressed() {
        this.isImmediateStop = true;
        this.freeSpinStopButtonGlow.setVisible(true);
        this.scene.game.events.emit("evtSpinStartClearPayLine");
        SoundManager.SpinButtonClickSound();
        SoundManager.SpinStopSound();
        this.scene.game.events.emit("evtSpinStopImmediate");
    }

    FreeSpinStopButtonReleased() {
        this.freeSpinStopButtonGlow.setVisible(false);
        SoundManager.StopPaylineContinuouslySound();
        this.HideFreeSpinStopButton();
    }

    EnableFreeSpinStopButton() {
        this.EnableButton(this.freeSpinStopButton);
    }
    DisableFreeSpinStopButton() {
        this.DisableButton(this.freeSpinStopButton);
    }
    ShowFreeSpinStopButton() {
        this.freeSpinStopButton.setVisible(true);
    }
    HideFreeSpinStopButton() {
        this.freeSpinStopButton.setVisible(false);
    }

    OnShowFreeSpinStopButton() {
        this.isImmediateStop = false;
        this.ShowFreeSpinStopButton();
        this.DisableStopButton();
    }

    //======================================================================

    //====================================================================
    ShowSpinButton() {
        this.spinButton.setVisible(true);
        this.stopButton.setVisible(false);
        this.spinButtonGlow.setVisible(false);
        this.stopButtonGlow.setVisible(false);
    }
    HideSpinButton() {
        this.spinButton.setVisible(false);
        this.stopButton.setVisible(true);
        this.spinButtonGlow.setVisible(false);
        this.stopButtonGlow.setVisible(false);
    }

    EnableSpinButton() {
        this.EnableButton(this.spinButton);
    }

    DisableSpinButton() {
        this.DisableButton(this.spinButton);
    }

    EnableStopButton() {
        this.EnableButton(this.stopButton);
    }

    DisableStopButton() {
        this.DisableButton(this.stopButton);
    }

    ShowAutoSpinButton() {
        this.autoSpinButton.setVisible(true);
        this.autoStopButton.setVisible(false);
        this.autoSpinButtonGlow.setVisible(false);
        this.autoStopButtonGlow.setVisible(false);
    }
    HideAutoSpinButton() {
        this.autoSpinButton.setVisible(false);
        this.autoStopButton.setVisible(true);
        this.autoSpinButtonGlow.setVisible(false);
        this.autoStopButtonGlow.setVisible(false);
    }

    OnEnableSpinButton() {
        this.EnableSpinButton();
    }
    OnDisableSpinButton() {
        this.DisableSpinButton();
    }

    OnDisableGUIButton() {
        this.DisableButton(this.lineMinusButton);
        this.DisableButton(this.linePlusButton);
        this.DisableButton(this.lineBetMinusButton);
        this.DisableButton(this.lineBetPlusButton);
        this.DisableButton(this.autoStopButton);
        this.DisableButton(this.autoSpinButton);
        this.HideBigWin();
    }

    OnEnableGUIButton() {
        // console.log("enable gui");
        let listOfFreeSpins = Model.getFreeSpinsData();
        if (listOfFreeSpins.length > 0) {
            this.DisableStopButton();
        } else {
            this.EnableButton(this.lineMinusButton);
            this.EnableButton(this.linePlusButton);
            this.EnableButton(this.lineBetMinusButton);
            this.EnableButton(this.lineBetPlusButton);
            this.EnableButton(this.autoStopButton);
            this.EnableButton(this.autoSpinButton);
            this.ShowSpinButton();
            this.EnableStopButton();
            //For hiding stop button during free spin 
            this.HideFreeSpinStopButton();

            this.ToggleLinesPlusMinusButton();
            this.ToggleLineBetPlusMinusButton();
            this.scene.game.events.emit("evtEnableSpinButton");
            if (Model.getLastWin() >= 10) {
                this.ShowBigWin();
            }
        }
        this.scene.game.events.emit("evtShowBlinkAnimation");
        this.scene.game.events.emit("evtShowWonPaylines");

        this.SetBalanceText();
        this.SetWinAmountText();
    }

    DisableButton(_button) {
        _button.setAlpha(0.5);
        _button.removeInteractive();
    }
    EnableButton(_button) {
        _button.setAlpha(1);
        _button.setInteractive({ useHandCursor: true });
    }

    //========================================================================
    onAutoSpinStarted() {
        this.isAutoMode = true;
        this.isImmediateStop = false;
        this.Spin();
    }

    onResumeAutoGame() {
        let totalBalance = Model.getBalance();
        let lines = Model.getLines();
        let betPerLine = Model.getBetPerLine();
        let totalBetAmount = parseFloat(lines * betPerLine).toFixed(2);

        this.isImmediateStop = false;
        if (!this.isAutoMode) return;

        let listOfFreeSpins = Model.getFreeSpinsData();
        if (listOfFreeSpins.length > 0) return;

        this.Spin();
    }

    //========================================================================

    //====================================================================

    Spin() {
        if (this.isSpinning) return;
        let totalBalance = Model.getBalance();
        let lines = Model.getLines();
        let betPerLine = Model.getBetPerLine();
        let totalBetAmount = parseFloat(lines * betPerLine).toFixed(2);
        this.totalAmountBetted += parseFloat(totalBetAmount);
        SoundManager.StopPaylineContinuouslySound();
        this.scene.game.events.emit("evtSpinStartClearPayLine");
        this.scene.gameLogo.StopNumberBlinkAnimation();
        this.HideBigWin();
        this.winText.setText("");
        SoundManager.SpinButtonClickSound();

        if (parseFloat(totalBalance) >= parseFloat(totalBetAmount)) {
            this.isSpinning = true;
            totalBalance -= totalBetAmount;
            Model.setBalance(totalBalance);
            this.SetBalanceText();

            this.scene.game.events.emit("evtSpinStart");
            this.scene.game.events.emit("evtDisableGUIButton");
            this.scene.game.events.emit("evtDisableSpinButton");
            this.CallSpinResultAPI();
        } else {
            this.alertPopup.ShowAlertPopup("Sorry ! You don't have sufficient balance");
            if (this.isAutoMode) {
                this.isAutoMode = false;
                this.ShowAutoSpinButton();
                this.scene.game.events.emit("evtSpinStartClearPayLine");
            }
        }

    }

    async CallSpinResultAPI() {
        // let spinResultData = await Server.getSpinResults();
        // if (!spinResultData.error) {
        //     this.OnSpinResults(spinResultData.data);
        // } else {}
        // let resposeTimeout = Model.GetApiRequestTimeout();
        // console.log("respose: ", resposeTimeout);

        let spinResultData = await Server.getSpinResults();
        // console.log("spinResultData: ", spinResultData);
        if (spinResultData == undefined) {
            console.log("no respose ");
            this.alertPopup.ShowAlertPopup("Technical eroor! Please goto Dashboard");
            // setTimeout(() => {
            //     this.scene.game.events.emit("evtSpinStop");
            // }, 2000);
        } else {
            if (!spinResultData.error) {
                if (spinResultData.data.status) {
                    this.OnSpinResults(spinResultData.data.result);
                } else {
                    this.alertPopup.ShowAlertPopup(spinResultData.data.msg);
                }
            } else {
                this.alertPopup.ShowAlertPopup(spinResultData.message);
            }
        }


    }

    OnSpinResults(_spinResult) {
        console.log("spin result: ", _spinResult);
        console.log("free spin: ", _spinResult.freeSpins);
        this.isSpinning = false;
        Model.setBalance(_spinResult.balanceBeforeFreeSpin);
        Model.setGrid(_spinResult.grid.grid);
        Model.setLastWin(_spinResult.lastWin);

        Model.setWonPaylines(_spinResult.grid.wonPaylines);

        Model.setBonus(_spinResult.bonus);

        if (_spinResult.freeSpins.length > 0) {
            Model.setFreeSpinsData(_spinResult.freeSpins);
            Model.SetMultiplierValue(_spinResult.freeSpinData.multiplier);
            let spinOptionArray = [];
            let multiplierOptionArray = [];
            let tempArray = [];
            spinOptionArray = _spinResult.freeSpinData.freeSpinOptions;
            multiplierOptionArray = _spinResult.freeSpinData.multiplierOptions;

            for (let i = 0; i < spinOptionArray.length; i++) {
                if (spinOptionArray[i].win == false) {
                    tempArray.push(spinOptionArray[i].spinNumber);
                }
            }
            for (let j = 0; j < multiplierOptionArray.length; j++) {
                if (multiplierOptionArray[j].win == false) {
                    tempArray.push("x" + multiplierOptionArray[j].multiplierNumber);
                }
            }
            Model.SetRemainingFreeSpinOptions(tempArray);
        } else { }

        this.HideSpinButton();
        if (this.isImmediateStop != true) {
            this.scene.game.events.emit("evtSpinStop");
        }

        // if (this.isAutoMode) {
        //     this.spinButton.setVisible(false);
        //     this.stopButton.setVisible(true);
        // }
    }

    //=====================================================================

    LinePlusButtonPressed() {
        this.linePlusButtonGlow.setVisible(true);
        SoundManager.ButtonClickSound();
    }
    LinePlusButtonReleased() {
        this.IncrementNumberOfLines();
        this.ToggleLinesPlusMinusButton();
        this.linePlusButtonGlow.setVisible(false);
    }

    LineMinusButtonPressed() {
        this.lineMinusButtonGlow.setVisible(true);
        SoundManager.ButtonClickSound();
    }
    LineMinusButtonReleased() {
        this.DecrementNumberOfLines();
        this.ToggleLinesPlusMinusButton();
        this.lineMinusButtonGlow.setVisible(false);
    }

    IncrementNumberOfLines() {
        let currentLineNumber = Model.GetLineNumber();
        if (currentLineNumber < this.maxLineNumber) {
            currentLineNumber++;
            Model.SetLineNumber(currentLineNumber);
            this.SetNumberOfLinesText(currentLineNumber);
            Model.setLines(currentLineNumber);
            let lines = Model.getLines();
            let betPerLine = Model.getBetPerLine();
            let totalBetAmount = parseFloat(lines * betPerLine).toFixed(2);
            this.SetTotalBetText(totalBetAmount);

        } else { }
    }
    DecrementNumberOfLines() {
        let currentLineNumber = Model.GetLineNumber();
        if (currentLineNumber > this.minLineNumber) {
            currentLineNumber--;
            Model.SetLineNumber(currentLineNumber);
            this.SetNumberOfLinesText(currentLineNumber);
            Model.setLines(currentLineNumber);
            let lines = Model.getLines();
            let betPerLine = Model.getBetPerLine();
            let totalBetAmount = parseFloat(lines * betPerLine).toFixed(2);
            this.SetTotalBetText(totalBetAmount);

        } else { }
    }

    ToggleLinesPlusMinusButton() {
        let currentLineNumber = Model.GetLineNumber();
        if (currentLineNumber == this.maxLineNumber) {
            this.linePlusButton.alpha = 0.5;
            this.linePlusButton.removeInteractive();
        } else if (currentLineNumber == this.minLineNumber) {
            this.lineMinusButton.alpha = 0.5;
            this.lineMinusButton.removeInteractive();
        } else {
            this.linePlusButton.alpha = 1;
            this.lineMinusButton.alpha = 1;
            this.linePlusButton.setInteractive({ useHandCursor: true });
            this.lineMinusButton.setInteractive({ useHandCursor: true });
        }
    }

    //=====================================================================


    //=======================================================================
    LineBetPlusButtonPressed() {
        this.lineBetPlusButtonGlow.setVisible(true);
        SoundManager.ButtonClickSound();
    }
    LineBetPlusButtonReleased() {
        this.IncrementBetAmount();
        this.ToggleLineBetPlusMinusButton();
        this.lineBetPlusButtonGlow.setVisible(false);
    }

    LineBetMinusButtonPressed() {
        this.lineBetMinusButtonGlow.setVisible(true);
        SoundManager.ButtonClickSound();
    }
    LineBetMinusButtonReleased() {
        this.DecrementBetAmount();
        this.ToggleLineBetPlusMinusButton();
        this.lineBetMinusButtonGlow.setVisible(false);
    }

    IncrementBetAmount() {
        if (this.currentlineBetAmount < this.betAmountValue[this.betAmountValue.length - 1]) {
            this.betClickCounter++;
            this.currentlineBetAmount = this.betAmountValue[this.betClickCounter];
            this.SetLineBetText(this.currentlineBetAmount);
            Model.setBetPerLine(this.currentlineBetAmount);
            // console.log("get pet per line: ", Model.getBetPerLine());
            let lines = Model.getLines();
            let betPerLine = Model.getBetPerLine();
            let totalBetAmount = parseFloat(lines * betPerLine).toFixed(2);
            this.SetTotalBetText(totalBetAmount);
        } else { }
    }
    DecrementBetAmount() {
        if (this.currentlineBetAmount > this.betAmountValue[0]) {
            this.betClickCounter--;
            this.currentlineBetAmount = this.betAmountValue[this.betClickCounter];
            this.SetLineBetText(this.currentlineBetAmount);
            Model.setBetPerLine(this.currentlineBetAmount);
            let lines = Model.getLines();
            let betPerLine = Model.getBetPerLine();
            let totalBetAmount = parseFloat(lines * betPerLine).toFixed(2);
            this.SetTotalBetText(totalBetAmount);
        } else { }
    }

    ToggleLineBetPlusMinusButton() {
        if (this.currentlineBetAmount == this.betAmountValue[this.betAmountValue.length - 1]) {
            this.lineBetPlusButton.alpha = 0.5;
            this.lineBetPlusButton.removeInteractive();
        } else if (this.currentlineBetAmount == this.betAmountValue[0]) {
            this.lineBetMinusButton.alpha = 0.5;
            this.lineBetMinusButton.removeInteractive();
        } else {
            this.lineBetPlusButton.alpha = 1;
            this.lineBetMinusButton.alpha = 1;
            this.lineBetPlusButton.setInteractive({ useHandCursor: true });
            this.lineBetMinusButton.setInteractive({ useHandCursor: true });
        }
    }

    //========================================================================



    //============================================================================

    SetNumberOfLinesText(_line) {
        this.linesNumberText.setText(_line);
    }

    SetLineBetText(_lineBet) {
        this.lineBetText.setText("$ " + _lineBet);
    }

    SetTotalBetText(_totalBet) {
        this.lineBetText.setText("$ " + _totalBet);
    }

    SetBalanceText() {
        this.balanceText.setText("$ " + Model.getBalance());
    }

    SetWinAmountText() {
        this.winText.setText("WIN $ " + Model.getLastWin());
    }



};

export default BottomPanel;