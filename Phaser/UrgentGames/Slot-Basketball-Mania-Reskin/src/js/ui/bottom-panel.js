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
/**
 * 
 */
class BottomPanel {
    constructor(scene) {
        this.scene = scene;
        this.config = this.scene.cache.json.get("resolution-config");
        this.panelBg = null;
        this.bottomShadow = null;
        this.topShadow = null;
        this.spinButton = null;
        this.maxButton = null;
        this.autoButton = null;
        this.optionsButton = null;
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

        this.scene.game.events.on("evtModelChanged", this.onModelChanged, this);
        this.scene.game.events.on("evtDisableGUI", this.onDisableGui, this);
        this.scene.game.events.on("evtEnableGUI", this.onEnableGui, this);
        this.scene.game.events.on("evtFreeSpinsDone", this.onResumeAutoGame, this);
        this.scene.game.events.on("evtAutoGameStarted", this.onAutoSpinStarted, this);
        this.scene.game.events.on("evtPaylinesShowingDone", this.onResumeAutoGame, this);

        this.create();
    };
    //#############################################################################################
    /**
     * 
     */
    create() {
        this.panelBg = this.scene.add.image(0, 0, "bottom-panel-bg").setOrigin(0.5);

        this.bottomShadow = this.scene.add.image(0, 0, "bottom_shadow").setOrigin(0);
        this.topShadow = this.scene.add.image(0, 0, "top_shadow").setOrigin(0);

        this.spinButton = new Button(this.scene, "spin-button", 0, 0);
        this.spinButton.setClickCallback(this.spin, this);

        this.maxButton = new Button(this.scene, "max-button", 0, 0);
        this.maxButton.setClickCallback(this.setMaxBetAndSpin, this);

        this.maxTitle = this.scene.add.text(
            0,
            0,
            "FAST SPIN", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.config.maxBetButton.title.fontSize,
            color: "#ffffff"
        }
        ).setOrigin(0.5);

        this.autoButton = new Button(this.scene, "auto-button", 0, 0);
        this.autoButton.setClickCallback(this.autoShow, this);

        this.autoTitle = this.scene.add.text(
            0,
            0,
            "AUTO SPIN", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.config.autoButton.title.fontSize,
            color: "#ffffff"
        }
        ).setOrigin(0.5);

        this.optionsButton = new Button(this.scene, "options-button", 0, 0);
        this.optionsButton.setClickCallback(this.showOptions, this);

        this.betsSwitcher = new ValueSwitcher(
            this.scene,
            this.panelBg.x + this.config.betsSwitcher.x,
            this.panelBg.y + this.config.betsSwitcher.y,
            Model.getBetsValues(), {},
            "BET"
        );
        this.betsSwitcher.setValueMultiplier(Model.getLines());
        this.betsSwitcher.setValueChangeCallback(this.onBetChange, this);

        let betValue = this.betsSwitcher.getValue();
        Model.setBetPerLine(betValue);

        this.createBalance();
        this.createLastWin();

        this.spinButtonCheck((betValue));
        this.menu = new Menu(this.scene).create();
    };
    //#############################################################################################
    /**
     * 
     */
    onModelChanged() {
        this.lastWinValueText.setText(Model.getLastWin());
        this.balanceValueText.setText(Model.getBalance());
    };
    //#############################################################################################
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
     * @param {*} value 
     */
    onBetChange(value) {
        Model.setBetPerLine(value);
        this.spinButtonCheck(value);
    };
    //#############################################################################################
    /**
     * 
     */
    onDisableGui() {
        this.maxButton.disable();
        this.autoButton.disable();
        this.spinButton.disable();
    };
    //#############################################################################################
    /**
     * 
     */
    onEnableGui() {
        this.maxButton.enable();
        this.autoButton.enable();
        this.spinButton.enable();
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


        let lines = Model.getLines();
        let betPerLine = Model.getBetPerLine();
        var totalBalance = Model.getBalance();
        let totalBet = betPerLine * lines;
        totalBalance -= totalBet;
        this.balanceValueText.setText(totalBalance.toFixed(2));

        if (this.isAutoMode) {
            this.autoGamesCount--;
            if (this.autoGamesCount <= 0) {
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
    onSpinResults(_response) {
        console.log("_response: ", _response);
        let spinResults = _response.result;
        this.isSpinning = false;
        Model.setBalance(spinResults.balance);
        Model.setGrid(spinResults.grid.grid);
        Model.setLastWin(spinResults.lastWin);
        Model.setWonPaylines(spinResults.grid.wonPaylines);
        Model.setBonus(spinResults.bonus);
        if (spinResults.freeSpins.length > 0) {
            Model.setFreeSpinsData(spinResults.freeSpins);
        };
        this.scene.game.events.emit("evtSpinStop");
        this.scene.game.events.emit("evtModelChanged");
        this.scene.game.events.emit("evtEnableGUI");
        this.spinButtonCheck(Model.getBetPerLine());
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
    };
    //#############################################################################################

    //#############################################################################################
    /**
     * 
     */
    createBalance() {
        this.balanceTitleText = this.scene.add.text(
            this.panelBg.x + this.config.balance.x,
            this.panelBg.y + this.config.balance.title.y,
            "BALANCE", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.config.balance.title.fontSize,
            color: "#ffffff"
        }
        ).setOrigin(0.5);

        this.balanceValueText = this.scene.add.text(
            this.panelBg.x + this.config.balance.x,
            this.panelBg.y + this.config.balance.value.y,
            Model.getBalance(), {
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
    //#############################################################################################
    /**
     * 
     */
    createLastWin() {
        this.lastWinTitleText = this.scene.add.text(
            this.panelBg.x,
            this.panelBg.y + this.config.lastWin.title.y,
            "WIN", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.config.lastWin.title.fontSize,
            color: "#ffffff"
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
                color: "#313131",
                fill: true
            },
            fontSize: this.config.lastWin.value.fontSize,
            color: this.config.lastWin.value.fontColor
        }
        ).setOrigin(0.5);
    };
    //#############################################################################################
    /**
     * 
     * @param {*} newWidth 
     * @param {*} newScale 
     */
    resizeBalance(newWidth, newScale) {
        this.balanceTitleText.setScale(newScale);
        this.balanceValueText.setScale(newScale);

        let x = newWidth * 0.9;
        let cfg = this.config.balance;
        this.balanceTitleText.setPosition(newWidth / 2 + cfg.title.x * newScale, this.panelBg.y + this.config.balance.title.y * newScale);
        this.balanceValueText.setPosition(newWidth / 2 + cfg.value.x * newScale, this.panelBg.y + this.config.balance.value.y * newScale);

    };
    //#############################################################################################
    /**
     * 
     * @param {*} newWidth 
     * @param {*} newScale 
     */
    resizeLastWin(newWidth, newScale) {
        this.lastWinTitleText.setScale(newScale);
        this.lastWinValueText.setScale(newScale);

        let cfg = this.config.lastWin;
        this.lastWinTitleText.setPosition(newWidth / 2 + cfg.title.x * newScale, this.panelBg.y + this.config.lastWin.title.y * newScale);
        this.lastWinValueText.setPosition(newWidth / 2 + cfg.value.x * newScale, this.panelBg.y + this.config.lastWin.value.y * newScale);

    };
    //#############################################################################################
    /**
     * 
     * @param {*} newWidth 
     * @param {*} newHeight 
     */
    resize(newWidth, newHeight) {
        let cfg;
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

        this.panelBg.setScale(newScale);

        let y = newHeight - this.config.bottomPanel.y * newScale;
        this.panelBg.setPosition(newWidth / 2, y);

        this.spinButton.setScale(newScale);
        this.spinButton.setPosition(newWidth / 2, newHeight - this.config.spinButton.y * newScale);

        cfg = this.config.maxBetButton;
        this.maxButton.setScale(newScale);
        this.maxButton.setPosition(newWidth / 2 - cfg.x * newScale, y + cfg.y * newScale);

        this.maxTitle.setScale(newScale),
            this.maxTitle.setPosition(newWidth / 2 - cfg.x * newScale, y + (cfg.y + cfg.title.y) * newScale)

        cfg = this.config.autoButton;
        this.autoButton.setScale(newScale);
        this.autoButton.setPosition(newWidth / 2 + cfg.x * newScale, y + cfg.y * newScale);

        this.autoTitle.setScale(newScale),
            this.autoTitle.setPosition(newWidth / 2 + cfg.x * newScale, y + (cfg.y + cfg.title.y) * newScale)

        this.optionsButton.setScale(newScale);
        cfg = this.config.optionsButton;
        this.optionsButton.setPosition(
            newWidth / 2 - cfg.x * newScale,
            y - cfg.y * newScale
        );

        this.bottomShadow.setScale(newScale);
        this.topShadow.setScale(newScale);

        this.topShadow.setPosition(newWidth / 2 - this.config.topShadow.x * newScale, this.config.topShadow.y * newScale); //newHeight/2 -
        this.bottomShadow.setPosition(newWidth / 2 - this.config.bottomShadow.x * newScale, newHeight - this.config.bottomShadow.y * newScale);

        this.betsSwitcher.resize(newWidth, newHeight);
        this.betsSwitcher.setPosition(
            newWidth / 2 - this.config.betsSwitcher.x * newScale,
            this.panelBg.y + this.config.betsSwitcher.y * newScale
        );

        this.resizeBalance(newWidth, newScale);
        this.resizeLastWin(newWidth, newScale);

        this.menu.resize(newWidth, newHeight);
    };
};

export default BottomPanel;