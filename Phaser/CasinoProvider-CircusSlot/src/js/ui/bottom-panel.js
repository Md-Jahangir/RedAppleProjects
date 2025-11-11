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
        this.maxButton = null;
        this.autoButton = null;
        this.betsSwitcher = null;
        this.menu = null;
        this.maxTitle = null;
        this.autoTitle = null;

        this.balanceTitleText = null;
        this.balanceValueText = null;

        this.lastWinTitleText = null;
        this.lastWinValueText = null;

        this.isSpinning = false;
        this.isAutoMode = false;
        this.autoGamesCount = 0;

        this.isFreeSpinsMode = false;
        this.freeSpinCounter = 0;
        this.totalWinAmount = 0;

        this.scene.game.events.on("evtModelChanged", this.onModelChanged, this);
        this.scene.game.events.on("evtDisableGUI", this.onDisableGui, this);
        this.scene.game.events.on("evtEnableGUI", this.onEnableGui, this);
        this.scene.game.events.on("evtAutoGameStarted", this.onAutoSpinStarted, this);
        this.scene.game.events.on("evtPaylinesShowingDone", this.CheckGameMode, this);
        this.scene.game.events.on("evtFreeSpinsPopupClosed", this.onFreeSpin, this);

        this.create();
    };
    //#############################################################################################
    /**
     *
     */
    create() {
        this.CreatePanelBg();
        this.CreateFastSpinButton();
        this.CreateAutoSpinButton();

        this.CreateSpinButton();
        this.CreateAutoCounterButton();
        this.CreateMenuButton();
        this.CreateBetArea();
        // this.betsSwitcher.setValueMultiplier(Model.getLines());
        this.betsSwitcher.setValueChangeCallback(this.onBetChange, this);
        let betValue = this.betsSwitcher.getValue();
        Model.setBetPerLine(betValue);
        this.CreateBalanceArea();
        this.CreateLastWinArea();
        this.CreateTotalWin();
        this.spinButtonCheck((betValue));
        this.menu = new Menu(this.scene).create();

    };
    //#############################################################################################
    CreatePanelBg() {
        this.panelBg = this.scene.add.image(0, 0, "bottom_panel").setOrigin(0);
    };
    ResizePanelBg(newWidth, newHeight, newScale) {
        this.panelBg.setScale(newScale);
        let y = newHeight - this.config.bottomPanel.y * newScale;
        this.panelBg.setPosition(newWidth / 2 - this.config.bottomPanel.x * newScale, y);
        let currentHeight = this.panelBg.displayHeight;
        // this.panelBg.setDisplaySize(newWidth * 0.7, currentHeight);
        // this.panelBg.setDisplaySize(newWidth, currentHeight);
    };

    CreateMenuButton() {
        this.menuButton = new Button(this.scene, "menu_button", 0, 0);
        this.menuButton.setClickCallback(this.showOptions, this);
        this.menuButtonTitle = this.scene.add.text(
            0,
            0,
            "MENU", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.config.menuButton.title.fontSize,
            color: "#f4dc33",
            fontStyle: "bold",
            shadow: {
                offsetX: this.config.menuButton.title.shadowOffsetX,
                offsetY: this.config.menuButton.title.shadowOffsetY,
                color: "#000000",
                fill: true
            },
        }
        ).setOrigin(0.5);
    };
    ResizeMenuButton(newWidth, newHeight, newScale) {
        this.menuButton.setScale(newScale);
        this.menuButton.setPosition(
            this.panelBg.x + this.config.menuButton.x * newScale,
            this.panelBg.y + this.config.menuButton.y * newScale
        );
        this.menuButtonTitle.setScale(newScale),
            this.menuButtonTitle.setPosition(
                this.menuButton.x - this.config.menuButton.title.x * newScale,
                this.menuButton.y - this.config.menuButton.title.y * newScale
            );
    };

    CreateBetArea() {
        this.betBase = this.scene.add.image(this.panelBg.x, this.panelBg.y, "bet_last_win_base").setOrigin(0);

        this.betsSwitcher = new ValueSwitcher(
            this.scene,
            this.panelBg.x + this.config.betsSwitcher.x,
            this.panelBg.y + this.config.betsSwitcher.y,
            Model.getBetsValues(), {},
            "BET"
        );
    };
    ResizeBetArea(newWidth, newHeight, newScale) {
        this.betBase.setScale(newScale);
        this.betBase.setPosition(
            newWidth / 2 - this.config.betBase.x * newScale,
            this.panelBg.y + this.config.betBase.y * newScale
        );

        this.betsSwitcher.resize(newWidth, newHeight);
        this.betsSwitcher.setPosition(
            newWidth / 2 - this.config.betsSwitcher.x * newScale,
            this.panelBg.y + this.config.betsSwitcher.y * newScale
        );
    };

    CreateFastSpinButton() {
        this.maxButton = new Button(this.scene, "fast_button", 0, 0);
        this.maxButton.setClickCallback(this.setMaxBetAndSpin, this);

        this.maxTitle = this.scene.add.text(
            0,
            0,
            "FAST\nSPIN", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.config.fastSpinButton.title.fontSize,
            color: "#f4dc33",
            fontStyle: "bold",
            shadow: {
                offsetX: this.config.fastSpinButton.title.shadowOffsetX,
                offsetY: this.config.fastSpinButton.title.shadowOffsetY,
                color: "#000000",
                fill: true
            }
        }
        ).setOrigin(0.5);

    };
    ResizeFastSpinButton(newWidth, newHeight, newScale) {
        this.maxButton.setScale(newScale);
        this.maxButton.setPosition(
            newWidth / 2 - this.config.fastSpinButton.x * newScale,
            this.panelBg.y + this.config.fastSpinButton.y * newScale
        );

        this.maxTitle.setScale(newScale),
            this.maxTitle.setPosition(
                this.maxButton.x - this.config.fastSpinButton.title.x * newScale,
                this.maxButton.y - this.config.fastSpinButton.title.y * newScale
            );
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
        this.autoButton = new Button(this.scene, "auto_button", 0, 0);
        this.autoButton.setClickCallback(this.autoShow, this);

        this.autoTitle = this.scene.add.text(
            0,
            0,
            "AUTO\nSPIN", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.config.autoSpinButton.title.fontSize,
            color: "#f4dc33",
            fontStyle: "bold",
            shadow: {
                offsetX: this.config.autoSpinButton.title.shadowOffsetX,
                offsetY: this.config.autoSpinButton.title.shadowOffsetY,
                color: "#000000",
                fill: true
            }
        }
        ).setOrigin(0.5);
    };
    ResizeAutoSpinButton(newWidth, newHeight, newScale) {
        this.autoButton.setScale(newScale);
        this.autoButton.setPosition(
            newWidth / 2 + this.config.autoSpinButton.x * newScale,
            this.panelBg.y + this.config.autoSpinButton.y * newScale
        );

        this.autoTitle.setScale(newScale);
        this.autoTitle.setPosition(
            this.autoButton.x - this.config.autoSpinButton.title.x * newScale,
            this.autoButton.y - this.config.autoSpinButton.title.y * newScale
        );
    };
    CreateAutoCounterButton() {
        this.autoCounterButton = this.scene.add.image(0, 0, 'auto_spin_counter_normal').setInteractive({ useHandCursor: true });

        this.autoCounterText = this.scene.add.text(
            0,
            0,
            "", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.config.autoSpinButton.value.fontSize,
            color: "#000000",
            fontStyle: "bold",
            shadow: {
                offsetX: this.config.autoSpinButton.title.shadowOffsetX,
                offsetY: this.config.autoSpinButton.title.shadowOffsetY,
                color: "#000000",
                // fill: true
            }
        }
        ).setOrigin(0.5);
        this.HideAutoCounterButton();
        this.autoCounterButton.on('pointerup', this.StopAutoCounterGame, this);
    };
    HideAutoCounterButton() {
        this.autoCounterButton.setVisible(false);
        this.autoCounterText.setVisible(false);
    }
    ShowAutoCounterButton(gamesCountSwitcher) {
        this.autoCounterButton.setVisible(true);
        this.autoCounterText.setVisible(true);
    }
    EnableAutoCounter() {
        this.autoCounterButton.setInteractive({ useHandCursor: true });
        this.autoCounterButton.setTexture('auto_spin_counter_normal');
    }
    DisableAutoCounter() {
        this.autoCounterButton.removeInteractive();
        this.autoCounterButton.setTexture('auto_spin_counter_disable');
    }
    SetAutoGameCounter(gamesCountSwitcher) {
        this.autoCounterText.setText(gamesCountSwitcher);
    }

    StopAutoCounterGame() {
        this.isAutoMode = false;
        this.autoGamesCount = 0;
        this.HideAutoCounterButton();
    }
    ResizeAutoCounterButton(newWidth, newHeight, newScale) {
        this.autoCounterButton.setScale(newScale);
        this.autoCounterButton.setPosition(
            newWidth / 2, this.panelBg.y + this.config.spinButton.y * newScale
        );

        this.autoCounterText.setScale(newScale);
        this.autoCounterText.setPosition(
            newWidth / 2, this.panelBg.y + this.config.spinButton.y * newScale
        );
    };
    CreateLastWinArea() {
        this.lastWinBase = this.scene.add.image(this.panelBg.x, this.panelBg.y, "bet_last_win_base").setOrigin(0);

        this.lastWinTitleText = this.scene.add.text(
            this.panelBg.x,
            this.panelBg.y + this.config.lastWin.title.y,
            "LAST WIN", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.config.lastWin.title.fontSize,
            color: "#f4dc33",
            fontStyle: "bold",
            shadow: {
                offsetX: this.config.lastWin.title.shadowOffsetX,
                offsetY: this.config.lastWin.title.shadowOffsetY,
                color: "#000000",
                fill: true
            }
        }
        ).setOrigin(0.5);

        this.lastWinValueText = this.scene.add.text(
            this.panelBg.x,
            this.panelBg.y + this.config.lastWin.value.y,
            Model.getLastWin(), {
            fontFamily: "Bahnschrift Condensed",
            fontStyle: "bold",
            shadow: {
                offsetX: this.config.lastWin.value.shadowOffsetX,
                offsetY: this.config.lastWin.value.shadowOffsetY,
                color: "#fff9cb",
                fill: true
            },
            fontSize: this.config.lastWin.value.fontSize,
            color: this.config.lastWin.value.fontColor
        }
        ).setOrigin(0.5);
    };
    HideLastWin() {
        this.lastWinBase.setVisible(false);
        this.lastWinTitleText.setVisible(false);
        this.lastWinValueText.setVisible(false);
    }
    ShowLastWin() {
        this.lastWinBase.setVisible(true);
        this.lastWinTitleText.setVisible(true);
        this.lastWinValueText.setVisible(true);
    }
    SetLastWin(_amount) {
        if (_amount > 0) {
            this.lastWinValueText.setText(Model.getCurrency() + ' ' + _amount);
            this.balanceValueText.setText(Model.getCurrency() + ' ' + Model.getBalance());
        }

    }
    ResizeLastWinArea(newWidth, newHeight, newScale) {
        this.lastWinBase.setScale(newScale);
        this.lastWinBase.setPosition(
            newWidth / 2 + this.config.lastWinBase.x * newScale,
            this.panelBg.y + this.config.lastWinBase.y * newScale
        );

        this.lastWinTitleText.setScale(newScale);
        this.lastWinValueText.setScale(newScale);

        this.lastWinTitleText.setPosition(
            this.lastWinBase.x + this.config.lastWin.title.x * newScale,
            this.lastWinBase.y - this.config.lastWin.title.y * newScale
        );
        this.lastWinValueText.setPosition(
            this.lastWinBase.x + this.config.lastWin.value.x * newScale,
            this.lastWinBase.y + this.config.lastWin.value.y * newScale
        );
    };
    CreateTotalWin() {
        this.totalWinBase = this.scene.add.image(this.panelBg.x, this.panelBg.y, "bet_total_win_base").setOrigin(0);

        this.totalWinTitleText = this.scene.add.text(
            this.panelBg.x,
            this.panelBg.y + this.config.lastWin.title.y,
            "TOTAL WIN", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.config.lastWin.title.fontSize,
            color: "#f4dc33",
            fontStyle: "bold",
            shadow: {
                offsetX: this.config.lastWin.title.shadowOffsetX,
                offsetY: this.config.lastWin.title.shadowOffsetY,
                color: "#000000",
                fill: true
            }
        }
        ).setOrigin(0.5);

        this.totalWinValueText = this.scene.add.text(
            this.panelBg.x,
            this.panelBg.y + this.config.lastWin.value.y,
            '', {
            fontFamily: "Bahnschrift Condensed",
            fontStyle: "bold",
            shadow: {
                offsetX: this.config.lastWin.value.shadowOffsetX,
                offsetY: this.config.lastWin.value.shadowOffsetY,
                color: "#fff9cb",
                fill: true
            },
            fontSize: this.config.lastWin.value.fontSize,
            color: this.config.lastWin.value.fontColor
        }
        ).setOrigin(0.5);
        this.HideTotalWin();
    };
    SetTotalWin(_amount) {
        this.totalWinValueText.setText(Model.getCurrency() + ' ' + _amount);
        this.balanceValueText.setText(Model.getCurrency() + ' ' + Model.getBalance());
        SoundManager.UpdateBalanceSound();
    }
    HideTotalWin() {
        this.totalWinBase.setVisible(false);
        this.totalWinTitleText.setVisible(false);
        this.totalWinValueText.setVisible(false);
    }
    ShowTotalWin() {
        this.totalWinBase.setVisible(true);
        this.totalWinTitleText.setVisible(true);
        this.totalWinValueText.setVisible(true);
    }
    ResizeTotalWin(newWidth, newHeight, newScale) {
        let cfg = this.config.lastWin;
        this.totalWinBase.setScale(newScale);
        this.totalWinBase.setPosition(
            newWidth / 2 + this.config.lastWinBase.x * newScale,
            this.panelBg.y + this.config.lastWinBase.y * newScale
        );

        this.totalWinTitleText.setScale(newScale);
        this.totalWinValueText.setScale(newScale);

        this.totalWinTitleText.setPosition(
            this.lastWinBase.x + this.config.lastWin.title.x * newScale,
            this.lastWinBase.y - this.config.lastWin.title.y * newScale
        );
        this.totalWinValueText.setPosition(
            this.lastWinBase.x + this.config.lastWin.value.x * newScale,
            this.lastWinBase.y + this.config.lastWin.value.y * newScale
        );
    };

    CreateBalanceArea() {
        this.balanceBase = this.scene.add.image(this.panelBg.x, this.panelBg.y, "balance_base").setOrigin(0);

        this.balanceTitleText = this.scene.add.text(
            this.panelBg.x + this.config.balance.x,
            this.panelBg.y + this.config.balance.title.y,
            "BALANCE", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.config.balance.title.fontSize,
            color: "#f4dc33",
            fontStyle: "bold",
            shadow: {
                offsetX: this.config.balance.title.shadowOffsetX,
                offsetY: this.config.balance.title.shadowOffsetY,
                color: "#000000",
                fill: true
            }
        }
        ).setOrigin(0.5);

        this.balanceValueText = this.scene.add.text(
            this.panelBg.x + this.config.balance.x,
            this.panelBg.y + this.config.balance.value.y,
            Model.getCurrency() + ' ' + Model.getBalance(), {
            fontFamily: "Bahnschrift Condensed",
            fontStyle: "bold",
            shadow: {
                offsetX: this.config.balance.value.shadowOffsetX,
                offsetY: this.config.balance.value.shadowOffsetY,
                color: "#313131",
                fill: true
            },
            fontSize: this.config.balance.value.fontSize,
            color: this.config.balance.value.fontColor
        }
        ).setOrigin(0.5);
    };
    SetBalance(_amount) {
        this.balanceValueText.setText(Model.getCurrency() + ' ' + _amount);
    }
    ResizeBalanceArea(newWidth, newHeight, newScale) {
        this.balanceBase.setScale(newScale);
        this.balanceBase.setPosition(
            newWidth / 2 + this.config.balanceBase.x * newScale,
            this.panelBg.y + this.config.balanceBase.y * newScale
        );

        this.balanceTitleText.setScale(newScale);
        this.balanceValueText.setScale(newScale);

        this.balanceTitleText.setPosition(
            this.balanceBase.x + this.config.balance.title.x * newScale,
            this.balanceBase.y - this.config.balance.title.y * newScale
        );
        this.balanceValueText.setPosition(
            this.balanceBase.x + this.config.balance.value.x * newScale,
            this.balanceBase.y + this.config.balance.value.y * newScale
        );

    };

    //#############################################################################################
    /**
     *
     */
    onModelChanged() {
        // this.lastWinValueText.setText(Model.getLastWin());
        // this.balanceValueText.setText(Model.getBalance());
    };
    //#############################################################################################
    /**
     *
     * @param {*} value
     */
    onBetChange(value) {
        Model.setBetPerLine(value);
        this.spinButtonCheck(value);
    };
    /**
     *
     */
    spinButtonCheck(betAmount) {
        if ((betAmount * this.betsSwitcher.valueMultiplier) > parseInt(Model.getBalance())) {
            this.onDisableGui();
        } else {
            this.onEnableGui();
        }
    }
    //#############################################################################################
    /**
     *
     */
    onDisableGui() {
        this.maxButton.disable();
        this.autoButton.disable();
        this.spinButton.disable();
        this.menuButton.disable();
        this.betsSwitcher.increase.disable();
        this.betsSwitcher.decrease.disable();
        // this.DisableAutoCounter();

    };
    //#############################################################################################
    /**
     *
     */
    onEnableGui() {
        this.maxButton.enable();
        this.autoButton.enable();
        this.spinButton.enable();
        this.menuButton.enable();
        this.betsSwitcher.increase.enable();
        this.betsSwitcher.decrease.enable();
        // this.EnableAutoCounter();
    }
    //#############################################################################################
    /**
     *
     */
    spin() {
        if (this.isSpinning) return;
        this.isSpinning = true;
        this.scene.game.events.emit("evtSpinStart");
        this.scene.game.events.emit("evtDisableGUI");
        SoundManager.SpinButtonClickSound();
        let lines = Model.getLines();
        let betPerLine = Model.getBetPerLine();
        var totalBalance = Model.getBalance();
        let totalBet = betPerLine * lines;
        totalBalance -= totalBet;
        this.balanceValueText.setText(totalBalance.toFixed(2));

        if (this.isAutoMode) {
            if ((Model.getBetPerLine() * this.betsSwitcher.valueMultiplier) < parseInt(Model.getBalance())) {
                this.autoGamesCount--;
                if (this.autoGamesCount <= 0) {
                    this.isAutoMode = false;
                }
            } else {
                this.isAutoMode = false;
            }
        }
        Server.getSpinResults(this.onSpinResults, this);
    };
    //#############################################################################################
    /**
     *
     * @param {*} spinResults
     */
    onSpinResults(response) {
        let spinResults = response.data.result;
        // this.isSpinning = false;
        let newGrid = spinResults.grid.grid;
        for (let index = 0; index < newGrid.length; index++) {
            let symbolsArray = Model.getSymbols();
            newGrid[index].unshift(symbolsArray[Math.floor(Math.random() * (11 - 0) + 0)]);
            newGrid[index].push(symbolsArray[Math.floor(Math.random() * (11 - 0) + 0)]);
        }
        Model.setNewGrid(newGrid);
        Model.setBalance(parseFloat(spinResults.balance));
        Model.setGrid(spinResults.grid.grid);
        Model.setLastWin(parseFloat(spinResults.lastWin).toFixed(2));
        Model.setWonPaylines(spinResults.grid.wonPaylines);
        Model.setBonus(spinResults.bonus);
        if (spinResults.freeSpins.length > 0) {
            Model.setFreeSpinsData(spinResults.freeSpins);
            Model.setFreeSpinMultiplier(spinResults.freeSpinData.multiplier);
            this.freeSpinCounter = spinResults.freeSpins.length - 1;
            this.scene.reelsView.freeSpinsView.updateSpins(spinResults.freeSpins.length - 1, Model.getFreeSpinMultiplier());
        };
        this.scene.game.events.emit("evtSpinStop");
        this.scene.game.events.emit("evtModelChanged");
        // this.scene.game.events.emit("evtEnableGUI");

    };
    //#############################################################################################
    /**
     *
     */
    autoShow() {
        let cfg = this.scene.cache.json.get("resolution-config").autoGamePopup;
        new PopupAutoGame(this.scene, cfg, "autoGame").create();
    };
    //#############################################################################################
    onAutoSpinStarted(gamesCount) {
        this.autoGamesCount = gamesCount;
        this.isAutoMode = true;
        this.ShowAutoCounterButton();
        this.SetAutoGameCounter(this.autoGamesCount);
        this.spin();
    };
    //#############################################################################################
    onResumeAutoGame() {
        if (!this.isAutoMode) return;

        let listOfFreeSpins = Model.getFreeSpinsData();
        if (listOfFreeSpins.length > 0) return;

        let bonus = Model.getBonus();
        if (bonus > 0) return;

        this.spin();
    };
    //#############################################################################################
    /**
     *
     */
    setMaxBetAndSpin() {
        if (this.isSpinning) return;
        this.betsSwitcher.setLastValue();
        this.spin();
    };
    //#############################################################################################
    showOptions() {
        if (this.menu.isVisible) {
            this.menu.hide();
        } else {
            this.menu.show();
        }
        /*let cfg = this.scene.cache.json.get("resolution-config").optionsPopup;
        new OptionsPopup(this.scene, cfg, "options").create();*/

        /*let cfg = this.scene.cache.json.get("resolution-config").bonusPopup;
        new PopupBonus(this.scene, cfg, "test", 500).create();*/

        /*let cfg = this.scene.cache.json.get("resolution-config").freeSpinsPopup;
        new PopupFreeSpins(this.scene, cfg, "test", 8).create();*/
    };
    //#############################################################################################

    //#############################################################################################
    /**
     *
     * @param {*} newWidth
     * @param {*} newHeight
     */
    resize(newWidth, newHeight) {
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

        this.ResizePanelBg(newWidth, newHeight, newScale);
        this.ResizeMenuButton(newWidth, newHeight, newScale);
        this.ResizeBetArea(newWidth, newHeight, newScale);
        this.ResizeFastSpinButton(newWidth, newHeight, newScale);
        this.ResizeAutoSpinButton(newWidth, newHeight, newScale);
        this.ResizeSpinButton(newWidth, newHeight, newScale);
        this.ResizeLastWinArea(newWidth, newHeight, newScale);
        this.ResizeTotalWin(newWidth, newHeight, newScale);
        this.ResizeBalanceArea(newWidth, newHeight, newScale);
        this.ResizeAutoCounterButton(newWidth, newHeight, newScale);

        this.menu.resize(newWidth, newHeight);
    };
    CheckGameMode() {
        if (Model.getFreeSpinsData().length > 0 && !this.isFreeSpinsMode) {
            let listOfFreeSpins = Model.getFreeSpinsData();
            let cfg = this.scene.cache.json.get("resolution-config").freeSpinsPopup;
            this.popupFreeSpin = new PopupFreeSpins(this.scene, cfg, "freeSpins", listOfFreeSpins.length).create();
            this.scene.bottomPanel.isFreeSpinsMode = true;
            this.HideLastWin();
            this.ShowTotalWin();
            this.onDisableGui();
            return;
        }
        else if (Model.getFreeSpinsData().length > 0 && this.isFreeSpinsMode) {
            this.DisableAutoCounter();
            this.onFreeSpin();
            return;
        }
        else if (this.isAutoMode) {
            this.scene.reelsView.freeSpinsView.hide();
            this.scene.reelsView.gameLogoView.show();
            this.HideTotalWin();
            this.ShowLastWin();
            this.onDisableGui();
            this.EnableAutoCounter();
            this.SetAutoGameCounter(this.autoGamesCount);
            this.isSpinning = false;
            this.spin();
            return;
        } else {
            // this.onEnableGui();
            if (!this.isAutoMode) {
                this.scene.reelsView.freeSpinsView.hide();
                this.scene.reelsView.gameLogoView.show();
                this.HideTotalWin();
                this.ShowLastWin();
                this.HideAutoCounterButton();
            }
            this.scene.reelsView.freeSpinsView.hide();
            this.scene.reelsView.gameLogoView.show();
            this.HideTotalWin();
            this.ShowLastWin();
            this.spinButtonCheck(Model.getBetPerLine());
            return;
        }

    }

    onFreeSpin() {
        let listOfFreeSpins = Model.getFreeSpinsData();
        if (listOfFreeSpins.length > 0 && this.freeSpinCounter >= 0 && this.isFreeSpinsMode) {
            SoundManager.SpinButtonClickSound();
            if (this.freeSpinCounter == 0) {
                this.scene.reelsView.gameLogoView.show();
                this.isFreeSpinsMode = false;
            }
            this.scene.reelsView.freeSpinsView.updateSpins(this.freeSpinCounter, Model.getFreeSpinMultiplier());
            this.scene.reelsView.gameLogoView.hide();
            this.scene.reelsView.freeSpinsView.show();
            let newGrid = listOfFreeSpins[this.freeSpinCounter].grid;
            for (let index = 0; index < newGrid.length; index++) {
                let symbolsArray = Model.getSymbols();
                newGrid[index].unshift(symbolsArray[Math.floor(Math.random() * (11 - 0) + 0)]);
                newGrid[index].push(symbolsArray[Math.floor(Math.random() * (11 - 0) + 0)]);
            }
            Model.setNewGrid(newGrid);
            Model.setWonPaylines(listOfFreeSpins[this.freeSpinCounter].wonPaylines);
            Model.setLastWin(listOfFreeSpins[this.freeSpinCounter].lastWin);
            this.scene.game.events.emit("evtSpinStart");
            listOfFreeSpins.pop(listOfFreeSpins[this.freeSpinCounter]);
            setTimeout(() => {
                this.scene.reelsView.onSpinStop();
            }, 3000);
            this.freeSpinCounter--;

        } else {

            this.HideTotalWin();
        }
    };
    CheckFreeSpinWinAmount(_amount) {
        this.totalWinAmount += _amount;
        this.SetTotalWin((parseFloat(this.totalWinAmount)).toFixed(2));
    }
};

export default BottomPanel;