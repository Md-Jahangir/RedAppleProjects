import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
import { getBaseScale } from "../utils";
import { Model } from "../model";
import { Server } from "../server";
import Button from "./button";
import ValueSwitcher from "./value-switcher";
import PopupAutoGame from "./popups/popup-auto-game";
import PopupBonus from "./popups/popup-bonus";
import PopupFreeSpins from "./popups/popup-free-spins";
import Menu from "./menu";

class TopPanel {
    constructor(scene) {
        this.scene = scene;
        this.config = this.scene.cache.json.get("resolution-config");
        this.topPanelBg = null;
        this.balanceTitleText = null;
        this.balanceValueText = null;
        this.menuButton = null;
        this.balanceBase = null;
        this.menu = null;

        // this.scene.game.events.on("evtModelChanged", this.onModelChanged, this);

        this.create();
    }
    create() {
        this.CreateTopPanelBg();
        this.CreateBalance();
        this.CreateMenuButton();
        this.menu = new Menu(this.scene).create();
    };

    resize(newWidth, newHeight) {
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight)

        this.ResizeTopPanelBg(newWidth, newScale);
        this.ResizeBalance(newWidth, newScale);
        this.ResizeMenuButton(newWidth, newScale);
        this.menu.resize(newWidth, newHeight);
    };
    showOptions() {
        // if (this.isVisible) {
        //     // this.menu.hide();
        // } else {
        this.menuButton.hide();
        this.menu.show();
        // }
    };

    CreateTopPanelBg() {
        this.topPanelBg = this.scene.add.image(0, 0, "top_panel_bg").setOrigin(0);
    };
    ResizeTopPanelBg(newWidth, newScale) {
        this.topPanelBg.setScale(newScale);
        this.topPanelBg.setPosition(0, 0);
        let currentHeight = this.topPanelBg.displayHeight;
        this.topPanelBg.setDisplaySize(newWidth, currentHeight);
    };

    CreateBalance() {
        this.balanceBase = this.scene.add.image(this.topPanelBg.x, this.topPanelBg.y, "balance_base").setOrigin(0);

        this.balanceTitleText = this.scene.add.text(
            this.topPanelBg.x + this.config.balance.x,
            this.topPanelBg.y + this.config.balance.title.y,
            "BALANCE", {
            fontFamily: "Arial",
            fontStyle: "bold",
            fontSize: this.config.balance.title.fontSize,
            color: "#fffcc6"
        }
        ).setOrigin(0.5);

        this.balanceValueText = this.scene.add.text(
            this.topPanelBg.x + this.config.balance.x,
            this.topPanelBg.y + this.config.balance.value.y,
            Model.getCurrency() + ' ' + Model.getBalance(), {
            fontFamily: "Arial",
            fontSize: this.config.balance.value.fontSize,
            color: this.config.balance.value.fontColor
        }
        ).setOrigin(0.5);
    };
    ResizeBalance(newWidth, newScale) {
        this.balanceTitleText.setScale(newScale);
        this.balanceValueText.setScale(newScale);

        let cfg = this.config.balance;
        this.balanceBase.setScale(newScale);
        this.balanceBase.setPosition(cfg.base.x * newScale, this.topPanelBg.y + cfg.base.y * newScale);
        this.balanceTitleText.setPosition(this.balanceBase.x + cfg.title.x * newScale, this.topPanelBg.y + cfg.title.y * newScale);
        this.balanceValueText.setPosition(this.balanceBase.x + cfg.value.x * newScale, this.topPanelBg.y + cfg.value.y * newScale);
    };

    CreateMenuButton() {
        this.menuButton = new Button(this.scene, "menu_button", this.topPanelBg.x, this.topPanelBg.y);
        this.menuButton.setClickCallback(this.ShowMenuPopup, this);
    };
    ResizeMenuButton(newWidth, newScale) {
        let cfg = this.config.menuButton;
        this.menuButton.setScale(newScale);
        this.menuButton.setPosition(newWidth - cfg.x * newScale, this.topPanelBg.y + cfg.y * newScale);
    };

    ShowMenuPopup() {
        this.showOptions();
    };

    SetBalanceValueText(_amount) {
        this.balanceValueText.setText(Model.getCurrency() + ' ' + _amount);
    }
}
export default TopPanel;