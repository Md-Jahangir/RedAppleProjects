import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
import { Model } from "../model";
import { Server } from "../server";
import Button from "./button";
import ValueSwitcher from "./value-switcher";
import PopupAutoGame from "./popups/popup-auto-game";
import PopupBonus from "./popups/popup-bonus";
import PopupFreeSpins from "./popups/popup-free-spins";
import Menu from "./menu";
import { SoundManager } from "../SoundManager";
/**
 *
 */
class BottomPanel {
    constructor(scene) {
        this.scene = scene;
        this.config = this.scene.cache.json.get("resolution-config");
        this.panelBg = null;
        this.spinButton = null;
        this.fastSpinButton = null;
        this.autoButton = null;
        this.betsSwitcher = null;
        this.menu = null;
        this.lastWinValueText = null;
        this.isSpinning = false;
        this.isAutoMode = false;
        this.autoGamesCount = 0;
        this.isFreeSpinsMode = false;
        this.freeSpinCounter = 0;
        this.normalSpin = true;
        this.totalWinAmount = 0;

        this.create();
        this.EventsHandler();
    };
    EventsHandler() {
        this.scene.game.events.on("evtModelChanged", this.onModelChanged, this);
        this.scene.game.events.on("evtDisableGUI", this.onDisableGui, this);
        this.scene.game.events.on("evtEnableGUI", this.onEnableGui, this);
        this.scene.game.events.on("evtAutoGameStarted", this.onAutoSpinStarted, this);
        this.scene.game.events.on("evtPaylinesShowingDone", this.CheckGameMode, this);
        this.scene.game.events.on("evtFreeSpinsPopupClosed", this.onFreeSpin, this);
        // this.scene.game.events.on('evtGameModeCheck', this.CheckGameMode, this);
    }
    create() {
        this.CreatePanelBg();
        this.CreateBetArea();
        let betValue = this.betsSwitcher.getValue();
        Model.setBetPerLine(betValue);
        this.CreateSpinBase();
        this.CreateFastSpinButton();
        this.CreateSpinButton();
        this.CreateAutoSpinButton();
        this.CreateLastWin();
        this.CreateTotalWin();
        // this.spinButtonCheck((betValue));
        this.AutoFeatureCounterButton();
        this.FreeSpinCounterButton();

    };

    CreateBetArea() {
        this.betBase = this.scene.add.image(this.panelBg.x, this.panelBg.y, "bet_base").setOrigin(0);
        this.betsSwitcher = new ValueSwitcher(
            this.scene,
            this.panelBg.x + this.config.betsSwitcher.x,
            this.panelBg.y + this.config.betsSwitcher.y,
            Model.getBetsValues(), {},
            "", 'betSwitcher'
        );
        this.betsSwitcher.setValueChangeCallback(this.onBetChange, this);
    };


    onBetChange(value) {
        Model.setBetPerLine(value);
        this.spinButtonCheck(value);
    };
    ResizeBetArea(newWidth, newHeight, newScale) {
        let cfg = this.config.betBase;
        this.betBase.setScale(newScale);
        this.betBase.setPosition(cfg.x * newScale, this.panelBg.y + cfg.y * newScale);
        this.betsSwitcher.resize(newWidth, newHeight);
        this.betsSwitcher.setPosition(
            this.panelBg.x + this.config.betsSwitcher.x * newScale,
            this.panelBg.y + this.config.betsSwitcher.y * newScale
        );
    };

    CreateSpinBase() {
        this.spinBase = this.scene.add.image(this.panelBg.x, this.panelBg.y, "spin_base").setOrigin(0.5);
    };
    ResizeSpinBase(newWidth, newHeight, newScale) {
        this.spinBase.setScale(newScale);
        this.spinBase.setPosition(newWidth / 2, this.panelBg.y + this.config.spinBase.y * newScale);
    };

    CreateFastSpinButton() {
        this.fastSpinButton = new Button(this.scene, "fast_spin_button", 0, 0);
        this.fastSpinButton.setClickCallback(this.setMaxBetAndSpin, this);
    };
    ResizeFastSpinButton(newWidth, newHeight, newScale) {
        let cfg = this.config.fastSpinButton;
        let y = newHeight - this.config.bottomPanel.y * newScale;
        this.fastSpinButton.setScale(newScale);
        this.fastSpinButton.setPosition(newWidth / 2 - cfg.x * newScale, y + cfg.y * newScale);

    };

    CreateSpinButton() {
        this.spinButton = new Button(this.scene, "spin_button", 0, 0);
        this.spinButton.setClickCallback(this.spin, this);
    };
    ResizeSpinButton(newWidth, newHeight, newScale) {
        this.spinButton.setScale(newScale);
        this.spinButton.setPosition(newWidth / 2, this.panelBg.y + this.config.spinButton.y * newScale);
    };

    CreateAutoSpinButton() {
        this.autoButton = new Button(this.scene, "auto_spin_button", 0, 0);
        this.autoButton.setClickCallback(this.autoShow, this);
    };
    autoShow() {
        let cfg = this.scene.cache.json.get("resolution-config").autoGamePopup;
        new PopupAutoGame(this.scene, cfg, "autoGame").create();
    };
    ResizeAutoSpinButton(newWidth, newHeight, newScale) {
        let cfg = this.config.autoButton;
        let y = newHeight - this.config.bottomPanel.y * newScale;
        this.autoButton.setScale(newScale);
        this.autoButton.setPosition(newWidth / 2 + cfg.x * newScale, y + cfg.y * newScale);
    };

    CreateLastWin() {
        this.lastWinBase = this.scene.add.image(this.panelBg.x, this.panelBg.y, "last_win_base").setOrigin(1, 0);

        this.lastWinValueText = this.scene.add.text(
            this.lastWinBase.x,
            this.lastWinBase.y + this.config.lastWin.value.y,
            Model.getLastWin(), {
            fontFamily: "Arial",
            fontStyle: "bold",
            fontSize: this.config.lastWin.value.fontSize,
            color: this.config.lastWin.value.fontColor
        }
        ).setOrigin(0.5);
    };

    ResizeLastWin(newWidth, newScale) {
        let cfg = this.config.lastWin;
        this.lastWinBase.setScale(newScale);
        // this.lastWinBase.setPosition(newWidth / 2 + cfg.base.x * newScale, this.panelBg.y + cfg.base.y * newScale);
        this.lastWinBase.setPosition(newWidth - cfg.base.x * newScale, this.panelBg.y + cfg.base.y * newScale);

        this.lastWinValueText.setScale(newScale);
        this.lastWinValueText.setPosition(this.lastWinBase.x + this.config.lastWin.value.x * newScale, this.lastWinBase.y + this.config.lastWin.value.y * newScale)
    };
    SetLastWin(_amount) {
        if (_amount > 0) {
            this.lastWinValueText.setText(Model.getCurrency() + ' ' + _amount.toFixed(2));
        }
        else if (_amount == '' && _amount !== 0) {
            this.lastWinValueText.setText('');
        }
        else if (_amount == 0) {
            this.lastWinValueText.setText(0);
        }


    }
    SetTotalWin(_amount) {
        if (_amount != '') {
            this.totalWinValueText.setText('');
        } else {
            this.totalWinValueText.setText(Model.getCurrency() + _amount.toFixed(2));
        }

    }

    CreateTotalWin() {
        this.totalWinBase = this.scene.add.image(this.panelBg.x, this.panelBg.y, "total_win_base").setOrigin(1, 0);

        this.totalWinValueText = this.scene.add.text(
            this.totalWinBase.x,
            this.totalWinBase.y + this.config.lastWin.value.y,
            Model.getLastWin(), {
            fontFamily: "Arial",
            fontStyle: "bold",
            fontSize: this.config.lastWin.value.fontSize,
            color: this.config.lastWin.value.fontColor
        }
        ).setOrigin(0.5);
        this.HideTotalWin();
    };
    HideTotalWin() {
        this.totalWinBase.setVisible(false);
        this.totalWinValueText.setVisible(false);
    }
    ShowTotalWin() {
        this.totalWinBase.setVisible(true);
        this.totalWinValueText.setVisible(true);
    }
    ResizeTotalWin(newWidth, newScale) {
        let cfg = this.config.lastWin;
        this.totalWinBase.setScale(newScale);
        // this.totalWinBase.setPosition(newWidth / 2 + cfg.base.x * newScale, this.panelBg.y + cfg.base.y * newScale);
        this.totalWinBase.setPosition(newWidth - cfg.base.x * newScale, this.panelBg.y + cfg.base.y * newScale);

        this.totalWinValueText.setScale(newScale);
        this.totalWinValueText.setPosition(this.totalWinBase.x + this.config.lastWin.value.x * newScale, this.totalWinBase.y + this.config.lastWin.value.y * newScale)
    };
    onModelChanged() {
        this.lastWinValueText.setText(Model.getCurrency() + Model.getLastWin());
        this.scene.topPanel.SetBalanceValueText(Model.getCurrency() + Model.getBalance());
    };

    spinButtonCheck(betAmount) {
        if ((betAmount * this.betsSwitcher.valueMultiplier) > parseInt(Model.getBalance())) {
            this.onDisableGui();
        } else {
            this.onEnableGui();
        }
    }
    AutoFeatureCounterButton() {
        this.autoCounterBase = this.scene.add.image(this.panelBg.x, this.panelBg.y, "auto_spin_counter_base").setInteractive({ useHandCursor: true });
        this.autoCounterBase.on('pointerup', this.StopAutoCounterGame, this);
        this.currentCounterValueText = this.scene.add.text(
            0,
            0,
            '', {
            fontFamily: "Arial",
            fontStyle: "bold",
            fontSize: this.config.lastWin.value.fontSize,
            color: this.config.lastWin.value.fontColor
        }
        ).setOrigin(0.5);
        this.HideAutoCounterBase();
    }
    StopAutoCounterGame() {
        this.isAutoMode = false;
        this.autoGamesCount = 0;
        this.HideAutoCounterBase();
    }
    ResizeAutoCounterBase(newWidth, newHeight, newScale) {
        this.autoCounterBase.setScale(newScale);
        this.autoCounterBase.setPosition(newWidth / 2, this.panelBg.y + this.config.spinButton.y * newScale);
        this.currentCounterValueText.setScale(newScale);
        this.currentCounterValueText.setPosition(this.autoCounterBase.x, this.autoCounterBase.y);
    };
    HideAutoCounterBase() {
        this.autoCounterBase.setVisible(false);
        this.currentCounterValueText.setVisible(false);
    }
    ShowAutoCounterBase() {
        this.autoCounterBase.setVisible(true);
        this.currentCounterValueText.setVisible(true);
    }
    SetAutoCounterTextValue(counter) {
        this.currentCounterValueText.setText(counter)
    }

    FreeSpinCounterButton() {
        this.freeSpinCounterBase = this.scene.add.image(this.panelBg.x, this.panelBg.y, "free_spin_counter_base").setInteractive();

        this.currentFreeSpinValueText = this.scene.add.text(
            0,
            0,
            '', {
            fontFamily: "Arial",
            fontStyle: "bold",
            fontSize: this.config.lastWin.value.fontSize,
            color: this.config.lastWin.value.fontColor
        }
        ).setOrigin(0.5);
        this.HideFreeSpinCounterBase();
    }
    ResizeFreeSpinCounterBase(newWidth, newHeight, newScale) {
        this.freeSpinCounterBase.setScale(newScale);
        this.freeSpinCounterBase.setPosition(newWidth / 2, this.panelBg.y + this.config.spinButton.y * newScale);
        this.currentFreeSpinValueText.setScale(newScale);
        this.currentFreeSpinValueText.setPosition(this.freeSpinCounterBase.x, this.freeSpinCounterBase.y);
    };
    HideFreeSpinCounterBase() {
        this.freeSpinCounterBase.setVisible(false);
        this.currentFreeSpinValueText.setVisible(false);
    }
    ShowFreeSpinCounterBase() {
        this.freeSpinCounterBase.setVisible(true);
        this.currentFreeSpinValueText.setVisible(true);
    }
    SetFreeSpinCounterTextValue(counter) {
        this.currentFreeSpinValueText.setText(counter)
    }
    onDisableGui() {
        this.fastSpinButton.disable();
        this.autoButton.disable();
        this.spinButton.disable();
        this.betsSwitcher.disable();
        this.scene.topPanel.menuButton.disable();
    };

    onEnableGui() {
        this.fastSpinButton.enable();
        this.autoButton.enable();
        this.spinButton.enable();
        this.betsSwitcher.enable();
        this.scene.topPanel.menuButton.enable();
    }
    spin() {
        if (this.isSpinning) return;
        this.normalSpin = true;
        this.scene.game.events.emit("evtSpinStartClearPayLine");
        this.scene.game.events.emit("evtSpinStart");
        this.scene.game.events.emit("evtDisableGUI");
        SoundManager.SpinButtonClickSound();
        this.isSpinning = true;
        let lines = Model.getLines();
        let betPerLine = Model.getBetPerLine();
        var totalBalance = Model.getBalance();
        let totalBet = betPerLine * lines;
        totalBalance -= totalBet;
        this.SetLastWin('')
        this.scene.topPanel.SetBalanceValueText(totalBalance.toFixed(2));
        if (this.isAutoMode) {
            this.normalSpin = false;
            this.autoGamesCount--;
            // this.ShowAutoCounterBase();
            this.SetAutoCounterTextValue(this.autoGamesCount);
            if (this.autoGamesCount <= 0) {
                this.isAutoMode = false;
                this.normalSpin = true;
                this.HideAutoCounterBase();
            }
        }
        Server.getSpinResults(this.onSpinResults, this);
    };

    onSpinResults(response) {
        let spinResults = response.data.result;
        this.isSpinning = false;
        let newGrid = spinResults.grid.grid;
        for (let index = 0; index < newGrid.length; index++) {
            let symbolsArray = Model.getSymbols();
            newGrid[index].unshift(symbolsArray[Math.floor(Math.random() * (11 - 0) + 0)]);
            newGrid[index].push(symbolsArray[Math.floor(Math.random() * (11 - 0) + 0)]);
        }
        Model.setBalance(parseFloat(spinResults.balance));
        Model.setGrid(spinResults.grid.grid);
        Model.setNewGrid(newGrid);

        Model.setWonPaylines(spinResults.grid.wonPaylines);
        Model.setBonus(spinResults.bonus);
        this.HideTotalWin();
        if (spinResults.freeSpins.length > 0) {
            Model.setFreeSpinsData(spinResults.freeSpins);
            Model.setFreeSpinMultiplier(spinResults.freeSpinData.multiplier);
            this.freeSpinCounter = spinResults.freeSpins.length;
            let freeSpinValue = spinResults.freeSpinData.freeSpinOptions.filter(freeSpinValue => freeSpinValue.win == true);
            this.scene.popupFreeSpin.SetNumberOfFreeGames(freeSpinValue[0].spinNumber);
            // setTimeout(() => {
            //     this.scene.popupFreeSpin.SetNumberOfFreeGames(freeSpinValue[0].spinNumber);
            //     this.scene.popupFreeSpin.Show();
            // }, 1000 * (spinResults.grid.wonPaylines.length + 1));
        } else {
            Model.setLastWin((parseFloat(spinResults.lastWin)));
        }
        this.scene.game.events.emit("evtSpinStop");

    };


    onAutoSpinStarted(gamesCount) {
        this.autoGamesCount = gamesCount;
        this.isAutoMode = true;
        this.spin();
    };
    setMaxBetAndSpin() {
        if (this.isSpinning) return;
        this.betsSwitcher.setLastValue();
        this.spin();
    };

    resize(newWidth, newHeight) {
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        this.ResizeBottomPanelBg(newWidth, newHeight, newScale);
        this.ResizeBetArea(newWidth, newHeight, newScale);
        this.ResizeSpinBase(newWidth, newHeight, newScale);
        this.ResizeFastSpinButton(newWidth, newHeight, newScale);
        this.ResizeSpinButton(newWidth, newHeight, newScale);
        this.ResizeAutoSpinButton(newWidth, newHeight, newScale);
        this.ResizeLastWin(newWidth, newScale);
        this.ResizeTotalWin(newWidth, newScale);
        this.ResizeAutoCounterBase(newWidth, newHeight, newScale);
        this.ResizeFreeSpinCounterBase(newWidth, newHeight, newScale);

    };

    CreatePanelBg() {
        this.panelBg = this.scene.add.image(0, 0, "bottom_panel_bg").setOrigin(0);
    };
    ResizeBottomPanelBg(newWidth, newHeight, newScale) {
        this.panelBg.setScale(newScale);
        let y = newHeight - this.config.bottomPanel.y * newScale;
        this.panelBg.setPosition(0, y);
        let currentHeight = this.panelBg.displayHeight;
        this.panelBg.setDisplaySize(newWidth, currentHeight);
    };


    showPopups() {
        let bonus = Model.getBonus();
        if (bonus > 0) {
            let cfg = this.scene.cache.json.get("resolution-config").bonusPopup;
            new PopupBonus(this.scene, cfg, "bonus", bonus).create();
        } else {
            let listOfFreeSpins = Model.getFreeSpinsData();
            if (listOfFreeSpins.length > 0 && !this.isFreeSpinsMode) {
                let cfg = this.scene.cache.json.get("resolution-config").freeSpinsPopup;
                new PopupFreeSpins(this.scene, cfg, "freeSpins", listOfFreeSpins.length).create();
            } else {
                this.onFreeSpin();
            }
        }
    }
    CheckGameMode() {
        if (Model.getFreeSpinsData().length > 0 && !this.isFreeSpinsMode) {
            this.scene.popupFreeSpin.Show();
            return;
        }
        else if (Model.getFreeSpinsData().length > 0 && this.isFreeSpinsMode) {
            this.onFreeSpin();
            return;
        }
        else if (this.isAutoMode) {
            this.spin();
            return;
        } else {
            this.scene.game.events.emit("evtEnableGUI");
            return;
        }

    }


    onFreeSpin() {
        let listOfFreeSpins = Model.getFreeSpinsData();
        if (listOfFreeSpins.length > 0 && this.freeSpinCounter >= 0 && this.isFreeSpinsMode) {
            SoundManager.SpinButtonClickSound();
            this.freeSpinCounter--;
            this.SetFreeSpinCounterTextValue(this.freeSpinCounter);
            this.ShowTotalWin();
            this.onDisableGui();
            this.scene.game.events.emit("evtSpinStartClearPayLine");
            this.scene.game.events.emit("evtFreeSpinShow", this.freeSpinCounter, Model.getFreeSpinMultiplier());
            let newGrid = listOfFreeSpins[this.freeSpinCounter].grid;
            for (let index = 0; index < newGrid.length; index++) {
                let symbolsArray = Model.getSymbols();
                newGrid[index].unshift(symbolsArray[Math.floor(Math.random() * (11 - 0) + 0)]);
                newGrid[index].push(symbolsArray[Math.floor(Math.random() * (11 - 0) + 0)]);
            }
            Model.setNewGrid(newGrid);
            Model.setWonPaylines(listOfFreeSpins[this.freeSpinCounter].wonPaylines);
            Model.setLastWin(Math.floor(Math.random() * (100 - 2) * 2));//listOfFreeSpins[this.freeSpinCounter].lastWin
            this.scene.game.events.emit("evtSpinStart");
            listOfFreeSpins.pop(listOfFreeSpins[this.freeSpinCounter]);
            setTimeout(() => {
                this.scene.reelsView.onSpinStop();
                // if (this.freeSpinCounter == 0) {
                //     this.isFreeSpinsMode = false;
                //     this.HideFreeSpinCounterBase();
                //     // this.HideTotalWin();
                //     this.onEnableGui();
                //     return;
                // }
            }, 3000);
        } else {
            this.HideTotalWin();
        }
    };

    CheckWinAmount(_amount) {
        if (_amount < 20 * Model.getBetPerLine() && _amount > 0) {
            this.SetLastWin(_amount);
            this.CheckGameMode();
        } else if (_amount >= 20 * Model.getBetPerLine() && _amount < 60 * Model.getBetPerLine()) {
            this.scene.jackpotWin.ShowBigWin();
            this.scene.scorePopup.AnimateTweenText(_amount);
        }
        else if (_amount >= 60 * Model.getBetPerLine() && _amount < 300 * Model.getBetPerLine()) {
            this.scene.jackpotWin.ShowSuperWin();
            this.scene.scorePopup.AnimateTweenText(_amount);
        }
        else if (_amount >= 300 * Model.getBetPerLine()) {
            this.scene.jackpotWin.ShowMegaWin();
            this.scene.scorePopup.AnimateTweenText(_amount);
        }
        else {
            this.SetLastWin(0);
            this.CheckGameMode();
        }

    }
    CheckFreeSpinWinAmount(_amount) {
        this.totalWinAmount += _amount;
        this.SetTotalWin(this.totalWinAmount);
    }
};

export default BottomPanel;