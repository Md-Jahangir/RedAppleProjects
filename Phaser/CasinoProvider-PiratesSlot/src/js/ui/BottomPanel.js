import { Model } from "../Model.js";
import { Server } from "../Server.js";
import AlertPopup from "../popups/AlertPopup.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";
import { ButtonScaleDownTween } from "../Utils.js";
import { ButtonScaleUpTween } from "../Utils.js";

class BottomPanel {
    constructor(scene) {
        this.scene = scene;
        this.alertPopup = null;
        this.normalSpin = true;
        this.betClickCounter = 0
        this.targetAutoSpin = 0;
        this.targetFreeSpin = 0;
        this.autoPlayCounter = 1;
        this.isAutoMode = false;
        this.isImmediateStop = false;
        this.isAutoPlayStarted = false;
        this.totalWinDuringFreeSpin = 0;
        this.config = this.scene.cache.json.get("game_config").bottomPanel;
        this.create();
        this.Events();
    };
    //#############################################################################################

    create() {
        this.betAmountValue = ["0.20", "0.40", "0.60", "1.00", "2.00", "4.00", "6.00", "10.00", "20.00", "40.00"];
        this.currentlineBetAmount = parseFloat(this.betAmountValue[this.betClickCounter]).toFixed(2);
        this.bottomPanelContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.autoPlayButtonContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.autoPlayButtonContainer.depth = 15;
        this.freeSpinContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 1)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.freeSpinContainer.depth = 5;

        this.bottomPanelBg = this.scene.add.image(0, 0, "bottom_panel_bg").setOrigin(0.5, 1);
        this.bottomPanelContainer.add(
            [
                this.bottomPanelBg,
            ]
        );
        this.CreatePlusMinusButtonForBet();
        this.AutoPlayButtonCreation();
        this.CreateAutoSpinButton();
        this.CreateSpinButton();
        this.CreateBalanceArea();
        this.CreateBetArea();
        this.CreateWinArea();
        this.CreateTotalWinArea();
        this.CreateStopButton();
        this.CreateAutoCountBaseImage();
        this.CreateAutoPlayCounterText();
        this.FreeSpinCountBaseImage();
        this.FreeSpinCounterText();
    };

    Events() {
        Constant.game.events.on("evtEnableGUI", this.EnableGUI, this);
        Constant.game.events.on("evtDisableGUI", this.DisableGUI, this);
        Constant.game.events.on("evtAutoGameStarted", this.onAutoSpinStarted, this);
        Constant.game.events.on("evtPaylinesShowingDone", this.CheckGameMode, this);
        Constant.game.events.on("evtUpdateWinAmount", this.SetLastWin, this);
        // Constant.game.events.on("evtSpinStart", this.SpinButtonReleased, this);
    }
    CreateSpinButton() {
        let spinButtonGlow;
        spinButtonGlow = this.scene.add.image(760, -200, "spin_glow").setOrigin(0.5);//.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        spinButtonGlow.setVisible(false);
        this.spinButton = this.scene.add.image(760, -200, "spin_button").setOrigin(0.5).setScale(0.9);//Constant.scaleFactorX * 0.9, Constant.scaleFactorY * 0.9);
        this.spinButtonTextImg = this.scene.add.image(760, -200, "spin_button_text").setOrigin(0.5).setScale(1);//Constant.scaleFactorX * 0.9, Constant.scaleFactorY * 0.9);
        this.spinButton.on("pointerup", function () {
            this.SpinButtonReleased(this.normalSpin);
        }, this);

        this.bottomPanelContainer.add(
            [
                spinButtonGlow,
                this.spinButton,
                this.spinButtonTextImg
            ]
        );
        this.EnableGUI();
    }

    EnableGUI() {
        this.spinButton.setInteractive({ useHandCursor: true });
        this.betPlusButton.setInteractive({ useHandCursor: true });
        this.betMinusButton.setInteractive({ useHandCursor: true });
        this.autoSpinButton.setInteractive({ useHandCursor: true });
        this.scene.gameUI.EnableMenu();
    }
    DisableGUI() {
        this.spinButton.removeInteractive();
        this.betPlusButton.removeInteractive();
        this.betMinusButton.removeInteractive();
        this.autoSpinButton.removeInteractive();
        this.scene.gameUI.DisableMenu();
    }
    SpinButtonReleased(_normalSpin) {
        SoundManager.SpinButtonClickSound();
        this.DisableGUI();
        if (this.isAutoMode) {
            // if ((Model.getBetPerLine() ) < parseInt(Model.getBalance())) {
            this.autoPlayCounter--;
            this.SetTextOfAutoPlayCounter(this.autoPlayCounter);
            if (this.autoPlayCounter <= 0) {
                this.isAutoMode = false;
                // }
            } else {
                // this.isAutoMode = false;
            }
        }
        this.scene.tweens.add({
            targets: this.spinButtonTextImg,
            x: this.spinButtonTextImg.x,
            yoyo: true,
            repeat: 0,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: 350,
            ease: 'Back.In',
        })
        // this.spinButton.rotation = 1.25;
        this.scene.tweens.add({
            targets: this.spinButton,
            x: this.spinButton.x,
            yoyo: false,
            repeat: 0,
            duration: 350,
            angle: 360,
            ease: 'Linear',
            onUpdate: () => {
                // if (this.spinButton.angle > 180) {
                //     this.spinButton.angle -= 360;
                // } else if (this.spinButton.angle < -180) {
                //     this.spinButton.angle += 360;
                // }
                // this.spinButton.rotation += 360;
            },
            onComplete: () => {
                Constant.game.events.emit('evtSpinStart')
                this.DisableGUI();
                if (Server.mode == "offline") {
                    setTimeout(() => {
                        this.CallSpinResultAPI();
                    }, 1000);
                } else {
                    setTimeout(() => {
                        this.CallSpinResultAPI();
                    }, 10000);
                }
            }

        })


    }
    async CallSpinResultAPI() {
        let spinResultData = await Server.getSpinResults();
        if (spinResultData == undefined) {
            // this.EnableGUI();
        } else {
            if (!spinResultData.error) {
                if (spinResultData.data.status) {
                    this.OnSpinResults(spinResultData.data.result);
                } else {
                }
            } else {
                // this.alertPopup.ShowAlertPopup(spinResultData.message);
            }
        }
    }

    OnSpinResults(_spinResult) {
        let gridObtained = _spinResult.grid.grid;
        for (let index = 0; index < gridObtained.length; index++) {
            let symbolsArray = Model.GetSymbols();
            gridObtained[index].unshift(symbolsArray[Math.floor(Math.random() * (11 - 0) + 0)]);
            gridObtained[index].push(symbolsArray[Math.floor(Math.random() * (11 - 0) + 0)]);
        }
        this.isSpinning = false;
        Model.SetNewGrid(gridObtained);
        Model.setBalance(_spinResult.balance);
        Model.setGrid(gridObtained);
        Model.setLastWin(_spinResult.lastWin);
        Model.setWonPaylines(_spinResult.grid.wonPaylines);
        Model.setBonus(_spinResult.bonus);
        this.SetBalance();
        if (_spinResult.freeSpins.length > 0) {
            Model.setFreeSpinsData(_spinResult.freeSpins);
        }
        Constant.game.events.emit("evtSpinStop");
    }
    CreateBalanceArea() {
        let headingTextStyle = { fontFamily: 'kingsandpirates-peak', fontSize: '34px', fill: '#fdf17a', fontStyle: 'normal', align: 'center' };
        let balanceTextStyle = { fontFamily: 'kingsandpirates-peak', fontSize: '30px', fill: '#fdf17a', fontStyle: 'bold', align: 'center' };
        if (Server.mode == 'offline') {
            this.balanceHeadingText = this.scene.add.text(this.config.balanceHeadingTextX, this.config.balanceHeadingTextY, 'BALANCE (FUN)', headingTextStyle);
            this.balanceText = this.scene.add.text(this.balanceHeadingText.x + 50, this.balanceHeadingText.y + 50, Model.getBalance(), balanceTextStyle);
        } else {
            this.balanceHeadingText = this.scene.add.text(this.config.balanceHeadingTextX + this.config.offsetX, this.config.balanceHeadingTextY + this.config.offsetY, 'BALANCE', headingTextStyle);
            this.balanceText = this.scene.add.text(this.balanceHeadingText.x + 50, this.balanceHeadingText.y + 50, Model.getBalance(), balanceTextStyle);
        }
        this.bottomPanelContainer.add([this.balanceHeadingText, this.balanceText]);
    }
    SetBalance() {
        this.balanceText.setText(Model.getBalance())
    }
    CreateBetArea() {
        let headingTextStyle = { fontFamily: 'kingsandpirates-peak', fontSize: '34px', fill: '#fdf17a', fontStyle: 'normal', align: 'right' };
        let betTextStyle = { fontFamily: 'kingsandpirates-peak', fontSize: '30px', fill: '#fdf17a', fontStyle: 'bold', align: 'center' };
        if (Server.mode == 'offline') {
            this.betHeadingText = this.scene.add.text(this.config.betArea.betHeadingTextX, this.config.betArea.betHeadingTextY, "BET (FUN)", headingTextStyle);
            this.betText = this.scene.add.text(this.betHeadingText.x + 50, this.betHeadingText.y + 50, Model.getBetPerLine(), betTextStyle);
        } else {
            this.betHeadingText = this.scene.add.text(this.config.betArea.betHeadingTextX, this.config.betArea.betHeadingTextY, "BET ", headingTextStyle);
            this.betText = this.scene.add.text(this.betHeadingText.x + 50, this.betHeadingText.y + 50, Model.getBetPerLine(), betTextStyle);
        }
        this.bottomPanelContainer.add([this.betHeadingText, this.betText]);
    }
    CreatePlusMinusButtonForBet() {
        this.betPlusButton = this.scene.add.image(150, -100, "arrow_button");
        this.betPlusButton.setInteractive({ useHandCursor: true });
        this.betPlusButton.on("pointerdown", this.BetPlusButtonPressed, this);
        this.betPlusButton.on("pointerup", this.BetPlusButtonReleased, this);

        this.betMinusButton = this.scene.add.image(150, -25, "arrow_button").setOrigin(0.5).setScale(1);
        this.betMinusButton.flipY = true;
        this.betMinusButton.alpha = 0.5;
        this.betMinusButton.on("pointerdown", this.BetMinusButtonPressed, this);
        this.betMinusButton.on("pointerup", this.BetMinusButtonReleased, this);
        this.bottomPanelContainer.add([this.betPlusButton, this.betMinusButton]);
        let betPerLine = Model.getBetPerLine();
        this.ToggleBetPlusMinusButton();
    }
    BetPlusButtonPressed() {
        this.betPlusButton.setScale(0.95);
    }
    BetPlusButtonReleased() {
        this.betPlusButton.setScale(1);
        this.IncrementBetAmount();
        this.ToggleBetPlusMinusButton();

    }
    BetMinusButtonPressed() {
        this.betMinusButton.setScale(0.95);

    }
    BetMinusButtonReleased() {
        this.betMinusButton.setScale(1);
        this.DecrementBetAmount();
        this.ToggleBetPlusMinusButton();

    }

    IncrementBetAmount() {
        if (parseInt(this.currentlineBetAmount) < this.betAmountValue[this.betAmountValue.length - 1]) {
            this.betClickCounter++;
            this.currentlineBetAmount = this.betAmountValue[this.betClickCounter];
            Model.setBetPerLine(this.currentlineBetAmount);
            this.SetBetText(this.currentlineBetAmount);
        } else { }
    }
    DecrementBetAmount() {
        if (this.currentlineBetAmount > this.betAmountValue[0]) {
            this.betClickCounter--;
            this.currentlineBetAmount = this.betAmountValue[this.betClickCounter];
            Model.setBetPerLine(this.currentlineBetAmount);
            this.SetBetText(this.currentlineBetAmount);
        } else { }
    }
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
    }

    CreateAutoSpinButton() {
        this.autoSpinButton = this.scene.add.image(841, -378, "auto_spin_button").setOrigin(0.5);
        this.autoSpinButton.setInteractive({ useHandCursor: true });
        this.autoSpinButton.setInteractive({ useHandCursor: true });
        this.autoSpinButton.on("pointerdown", this.AutoSpinButtonPressed, this);
        this.autoSpinButton.on("pointerup", this.AutoSpinButtonReleased, this);
        this.bottomPanelContainer.add([this.autoSpinButton]);
    }

    AutoSpinButtonPressed() {
        if (Constant.isPortrait) {
            ButtonScaleDownTween(this.scene, this.scene.bottomPanel.autoSpinButton, 1.6);
        }
        else {
            ButtonScaleDownTween(this.scene, this.scene.bottomPanel.autoSpinButton, 0.9);
        }
        SoundManager.ShowPopup();
    }
    AutoSpinButtonReleased() {
        if (Constant.isPortrait) {
            ButtonScaleUpTween(this.scene, this.scene.bottomPanel.autoSpinButton, 1.8);
        }
        else {
            ButtonScaleUpTween(this.scene, this.scene.bottomPanel.autoSpinButton, 1);
        }
        this.scene.autoPlayPopup.ShowAutoplayPopup();
        this.autoplayButton.visible = true;
    }


    CreateWinArea() {
        let headingTextStyle = { fontFamily: 'kingsandpirates-peak', fontSize: '34px', fill: '#fdf17a', fontStyle: 'normal', align: 'right' };
        let winTextStyle = { fontFamily: 'kingsandpirates-peak', fontSize: '30px', fill: '#fdf17a', fontStyle: 'bold', align: 'center' };
        // this.winHeadingText = this.scene.add.text(365, -75, "LAST WIN", headingTextStyle).setOrigin(0.5);
        if (Server.mode == 'offline') {
            this.winHeadingText = this.scene.add.text(365, -75, "LAST WIN(FUN)", headingTextStyle).setOrigin(0.5);
            this.winText = this.scene.add.text(this.winHeadingText.x, this.winHeadingText.y + 45, '', winTextStyle).setOrigin(0.5, 0.5);
        } else {
            this.winHeadingText = this.scene.add.text(365, -75, "LAST WIN", headingTextStyle).setOrigin(0.5);
            this.winText = this.scene.add.text(this.winHeadingText.x, this.winHeadingText.y + 45, '', winTextStyle).setOrigin(0.5, 0.5);
        }
        // this.winText = this.scene.add.text(this.winHeadingText.x , this.winHeadingText.y + 45, '', winTextStyle).setOrigin(0.5, 0.5);
        this.bottomPanelContainer.add([this.winHeadingText, this.winText]);
    }
    ShowLastWin() {
        this.winText.setVisible(true);
        this.winHeadingText.setVisible(true);
    }
    HideLastWin() {
        this.winText.setVisible(false);
        this.winHeadingText.setVisible(false);
    }

    CreateTotalWinArea() {
        let headingTextStyle = { fontFamily: 'kingsandpirates-peak', fontSize: '34px', fill: '#fdf17a', fontStyle: 'normal', align: 'right' };
        this.totalWinHeadingText = this.scene.add.text(365, -75, "TOTAL WIN", headingTextStyle).setOrigin(0.5);

        let winTextStyle = { fontFamily: 'kingsandpirates-peak', fontSize: '30px', fill: '#fdf17a', fontStyle: 'bold', align: 'center' };
        this.totalWinText = this.scene.add.text(this.totalWinHeadingText.x, this.totalWinHeadingText.y + 45, '', winTextStyle).setOrigin(1, 0.5);
        this.bottomPanelContainer.add([this.totalWinHeadingText, this.totalWinText]);
        this.HideTotalWin();
    }

    ShowTotalWin() {
        this.totalWinText.setVisible(true);
        this.totalWinHeadingText.setVisible(true);
    }
    HideTotalWin() {
        this.totalWinText.setVisible(false);
        this.totalWinHeadingText.setVisible(false);
    }
    SetTotalWin(amount) {
        this.totalWinText.setText(amount);
    }
    SetBetText(_betAmount) {
        this.betText.setText(_betAmount);
    }
    ShowAutoSpinButton() {
        this.autoSpinButton.setVisible(true);
        this.stopButton.setVisible(false);
        this.autoplayButton.setVisible(false);
        this.EnableButton(this.autoSpinButton);
    }
    HideAutoSpinButton() {
        this.autoSpinButton.setVisible(false);
        this.stopButton.setVisible(true);
        this.autoplayButton.setVisible(true);
        this.HideSpinButtonUI();
    }
    ShowSpinButtonUI() {
        this.spinButton.setVisible(true);
        this.spinButtonTextImg.setVisible(true);
    }
    HideSpinButtonUI() {
        this.spinButton.setVisible(false);
        this.spinButtonTextImg.setVisible(false);
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
        this.bottomPanelContainer.add([this.stopButton]);
    }

    StopButtonPressed() {
        this.stopButton.setScale(0.9);
        this.isImmediateStop = true;
    }
    StopButtonReleased() {
        this.stopButton.setScale(1);
        this.autoPlayCounter = 0;
        // this.targetText.visible = false;
        // // this.stopButton.setVisible(false);
        // this.autoplayButton.visible = false;
        // this.counterBaseImage.visible = false;
        this.isAutoMode = false;

    }
    AutoPlayButtonCreation() {

        if (Constant.isPortrait) {
            this.autoplayButton = this.scene.add.image(-10, -325, "button_star_autoplay").setOrigin(0.5).setScale(1, 1)//.setDepth(5);
            this.autoplayButton.setInteractive({ useHandCursor: true });
            this.autoplayButton.on('pointerdown', this.AutoPlayButtonPressed, this);
            this.autoplayButton.on('pointerup', this.AutoPlayButtonReleased, this);
        }
        else {
            this.autoplayButton = this.scene.add.image(760, -200, "button_star_autoplay").setOrigin(0.5).setScale(1, 1)//.setDepth(5);
            this.autoplayButton.setInteractive({ useHandCursor: true });
            this.autoplayButton.on('pointerdown', this.AutoPlayButtonPressed, this);
            this.autoplayButton.on('pointerup', this.AutoPlayButtonReleased, this);
        }
        this.autoplayButton.visible = false;
        this.autoPlayButtonContainer.add(
            [
                this.autoplayButton
            ]
        );
    }
    AutoPlayButtonPressed() {
        if (Constant.isPortrait) {
            ButtonScaleDownTween(this.scene, this.scene.bottomPanel.autoplayButton, 0.99);
        }
        else {
            ButtonScaleDownTween(this.scene, this.scene.bottomPanel.autoplayButton, 0.97);
        }
    }
    AutoPlayButtonReleased() {
        ButtonScaleDownTween(this.scene, this.scene.bottomPanel.autoplayButton, 1);
        this.counter = 0;
        this.isAutoMode = true;
        this.scene.autoPlayPopup.HideAutoplayPopup();
        this.stopButton.visible = true;
        this.counterBaseImage.visible = true;
        this.DisableButton(this.autoSpinButton);
        this.HideAutoSpinButton();
        Constant.game.events.emit("evtAutoGameStarted", this.scene.autoPlayPopup.buttonValue);
    }

    CreateAutoCountBaseImage() {
        if (Constant.isPortrait) {
            this.counterBaseImage = this.scene.add.image(-10, -320, "autoPlay_counter_base").setOrigin(0.5).setInteractive();
        }
        else {
            this.counterBaseImage = this.scene.add.image(760, -200, "autoPlay_counter_base").setOrigin(0.5).setInteractive();

        }
        this.counterBaseImage.visible = false;
        this.autoPlayButtonContainer.add(
            [this.counterBaseImage]
        )
    }
    CreateAutoPlayCounterText() {
        let slash;
        const limitTextStyle = { fontFamily: 'PR-Viking', fontSize: '65px', fill: '#f6ff70', fontStyle: 'normal', align: 'center' };
        if (Constant.isPortrait) {
            this.targetText = this.scene.add.text(Constant.game.config.width / 19.3, -320, this.targetAutoSpin, limitTextStyle).setOrigin(0.5, 0.5);
        }
        else {
            this.targetText = this.scene.add.text(755, -200, this.targetAutoSpin, limitTextStyle).setOrigin(0.5, 0.5);
        }
        this.targetText.visible = false;
        this.autoPlayButtonContainer.add(this.targetText);
    }
    OnCounterBaseImagePresed() {
    }
    OnCounterBaseImageReleased() {
    }
    DisableButton(_button) {
        _button.setAlpha(0.5);
        _button.removeInteractive();
    }
    onAutoSpinStarted(_autoPlayNumber) {
        this.targetAutoSpin = _autoPlayNumber;
        this.counterBaseImage.visible = true;
        this.isAutoMode = true;
        this.isImmediateStop = false;
        this.targetText.setVisible(true);
        this.autoPlayCounter = _autoPlayNumber;
        this.SetTextOfAutoPlayCounter(this.targetAutoSpin);
        this.SpinButtonReleased();
    }

    SetTextOfAutoPlayCounter(_autoPlayCounter) {
        let autoPlayCounter = _autoPlayCounter;

        if (autoPlayCounter < 10) {
            this.targetText.setPosition(760, -200)
        } else if (autoPlayCounter >= 10 && autoPlayCounter < 100) {
            this.targetText.setPosition(755, -200)
        } else if (autoPlayCounter == 100) {
            this.targetText.setPosition(745, -200)
        }
        else if (autoPlayCounter == '∞') {
            this.targetText.setPosition(745, -200);
        }
        this.targetText.setText(autoPlayCounter);
    }



    FreeSpinCountBaseImage() {
        this.freeSpinCounterBaseImage = this.scene.add.image(760, -200, "autoPlay_counter_base").setOrigin(0.5)
        this.freeSpinCounterBaseImage.visible = false;
        this.autoPlayButtonContainer.add(
            [this.freeSpinCounterBaseImage]
        )
    }
    FreeSpinCounterText() {
        const limitTextStyle = { fontFamily: 'PR-Viking', fontSize: '65px', fill: '#f6ff70', fontStyle: 'normal', align: 'center' };
        this.freeSpinCounterText = this.scene.add.text(755, -200, this.targetFreeSpin, limitTextStyle).setOrigin(0.5, 0.5);
        this.freeSpinCounterText.visible = false;
        this.autoPlayButtonContainer.add(this.freeSpinCounterText);
    }

    ShowFreeSpinCounter() {
        this.freeSpinCounterBaseImage.setVisible(true);
        this.freeSpinCounterText.setVisible(true);
    }
    HideFreeSpinCounter() {
        this.freeSpinCounterBaseImage.setVisible(false);
        this.freeSpinCounterText.setVisible(false);
    }
    UpdateFreeSpinCounter(counter) {
        this.freeSpinCounterText.setText(counter);
    }
    CheckGameMode() {
        this.SetWinHeading();
        if (Model.getFreeSpinsData().length > 0 && !this.scene.freeSpin.isFreeSpinsMode) {
            let listOfFreeSpins = Model.getFreeSpinsData();
            this.ShowTotalWin();
            this.DisableGUI();
            this.scene.freeSpin.ShowFreeSpinPopup(Model.getFreeSpinsData().length);
            return;
        }
        else if (Model.getFreeSpinsData().length > 0 && this.scene.freeSpin.isFreeSpinsMode) {
            this.ShowTotalWin();
            this.HideLastWin();
            this.ShowFreeSpinCounter();
            this.DisableGUI();
            this.scene.freeSpin.onFreeSpin();
            return;
        }
        else if (this.isAutoMode) {
            this.isSpinning = false;
            this.ShowLastWin();
            this.HideTotalWin();
            this.HideFreeSpinCounter();
            this.DisableGUI();
            this.HideSpinButtonUI();
            this.SetTextOfAutoPlayCounter(this.autoGamesCount);
            this.SpinButtonReleased();
            return;
        } else {
            this.ShowAutoSpinButton()
            this.ShowSpinButtonUI();
            this.HideAutoPlayButton();
            this.HideFreeSpinCounter();
            this.EnableGUI();
            this.ShowLastWin();
            this.HideTotalWin();
            return;
        }

    }
    HideAutoPlayButton() {
        this.targetText.setVisible(false);
        this.stopButton.setVisible(false);
        this.autoplayButton.setVisible(false);
        this.counterBaseImage.setVisible(false);
    }
    SetWinHeading() {
        if (this.isFreeSpinsMode) {
            this.winHeadingText.setText('TOTAL WIN');
        } else {
            if (Server.mode == "offline") {
                this.winHeadingText.setText('LAST WIN(FUN)');
            } else {
                this.winHeadingText.setText('LAST WIN');
            }
        }
    }
    SetLastWin(_winAmountBalance) {
        if (_winAmountBalance > 0) {
            if (Server.mode == 'offline') {
                this.winText.setText(_winAmountBalance);
            } else {
                this.winText.setText(Model.GetCurrency() + ' ' + _winAmountBalance);
            }
            SoundManager.UpdateBalanceSound();
        }
    }
    CheckFreeSpinWinAmount(_amount) {
        this.totalWinDuringFreeSpin += parseFloat(_amount);
        this.SetTotalWin((parseFloat(this.totalWinDuringFreeSpin)).toFixed(2));
    }
    EnableButton(_button) {
        _button.setAlpha(1);
        _button.setInteractive({ useHandCursor: true });
    }
};

export default BottomPanel;