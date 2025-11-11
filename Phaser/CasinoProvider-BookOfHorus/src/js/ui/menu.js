import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
import Button from "./button";
import OptionsPopup from "./popups/popup-options";
import PaylinesPopup from "./popups/popup-paylines";
import PaytablePopup from "./popups/popup-paytable";
import Background from "./background"


class Menu {
    constructor(scene) {
        this.scene = scene;
        this.config = this.scene.cache.json.get("resolution-config").menu;
        this.width = this.config.width;
        this.height = this.config.height;
        this.list = [{
            text: "Settings",
            callback: this.onSettings
        },
        {
            text: "Paylines Table",
            callback: this.onPaylines
        },
        {
            text: "Regular Paytable",
            callback: this.onRegularPaytable
        },
        {
            text: "Feature Paytable",
            callback: this.onFeaturePaytable
        }
        ]
        this.texts = [];
        this.buttons = [];
        this.frame = null;
        this.isVisible = false;
        this.currentScale = 1;
        this.activeButton = '';
        // this.config = this.scene.cache.json.get("resolution-config").menu;
    };

    create() {
        // this.background = new Background(this.scene);
        this.overLayImage = this.scene.add.image(0, 0, "loading_bg").setOrigin(0).setInteractive({ useHandCursor: true });
        this.overLayImage.setVisible(false).setAlpha(0.5);
        this.bgImage = this.scene.add.image(0, 0, "popup_overlay").setOrigin(0).setInteractive({ useHandCursor: true });
        this.bgImage.setVisible(false);

        this.baseSize = this.bgImage.displayWidth;

        this.closeButton = new Button(this.scene, "close-button", 0, 0);
        this.closeButton.setClickCallback(this.onCloseCallback, this);

        this.soundButton = new Button(this.scene, "volume-button", 0, 0);
        this.soundButton.setClickCallback(this.onSoundCallback, this, 'volume-button');

        this.musicButton = new Button(this.scene, "music-button", 0, 0);
        this.musicButton.setClickCallback(this.onMusicCallback, this, "music-Button");

        this.homeButton = new Button(this.scene, "home-button", 0, 0);
        this.homeButton.setClickCallback(this.onHomeCallback, this);

        this.settingButton = new Button(this.scene, "setting-button", 0, 0);
        this.settingButton.setClickCallback(this.list[0].callback, this, this.list[0].text);

        this.infoButton = new Button(this.scene, "info-button", 0, 0);
        this.infoButton.setClickCallback(this.list[1].callback, this, this.list[1].text);

        this.regularPaytableButton = new Button(this.scene, "paytable-button", 0, 0);
        this.regularPaytableButton.setClickCallback(this.list[2].callback, this, this.list[2].text);

        // this.featurePaytableButton = new Button(this.scene, "paytable-button", 0, 0);
        // this.featurePaytableButton.setClickCallback(this.list[3].callback, this, this.list[3].text);

        this.buttons.push(this.closeButton, this.soundButton, this.musicButton, this.homeButton, this.settingButton, this.infoButton, this.regularPaytableButton);
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].hide();
        }

        let cfg = this.scene.cache.json.get("resolution-config").optionsPopup;
        this.createoptionsPopup = new OptionsPopup(this.scene, cfg, "options").create();

        cfg = this.scene.cache.json.get("resolution-config").paylinesPopup;
        this.paylinesPopup = new PaylinesPopup(this.scene, cfg, "paylines").create();

        cfg = this.scene.cache.json.get("resolution-config").regularPaytablePopup;
        this.regularPaytablePopup = new PaytablePopup(this.scene, cfg, "regularPaytable").create();

        cfg = this.scene.cache.json.get("resolution-config").featurePaytablePopup;
        this.featurePaytablePopup = new PaytablePopup(this.scene, cfg, "featurePaytable", false).create();
        this.arrange(this.scene.scale.height, 1);

        return this;
    };

    arrange(newHeight) {
        let y = newHeight - this.config.y * this.currentScale;
        this.buttons.forEach((button, index) => {
            button.setScale(this.currentScale);
            let x = this.isVisible ? this.config.showX * this.currentScale : this.config.hideX * this.currentScale;
            button.setPosition(x, y - (this.config.step * this.currentScale) * index);
        });
    };

    show(isForce = false) {

        this.isVisible = true;
        this.overLayImage.setVisible(true);
        this.bgImage.setVisible(true);
        for (let i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i];
            if (isForce) {
                button.x = this.config.showX * this.currentScale;
                text.x = this.config.showX * this.currentScale;
            } else {
                this.buttons[i].show()
            }
        }
        this.onRegularPaytable();
    };

    hide(isForce = false) {
        this.isVisible = false;
        this.overLayImage.setVisible(false);
        this.bgImage.setVisible(false);
        for (let i = this.buttons.length - 1; i >= 0; i--) {
            let button = this.buttons[i];
            if (isForce) {
                buttons.x = this.config.hideX * this.currentScale;
                text.x = this.config.hideX * this.currentScale;
            } else {
                this.buttons[i].hide();
            }
        }
    };
    onCloseCallback() {
        this.regularPaytablePopup.HideRegularPaytablePopup();
        this.paylinesPopup.HidePaylinesPopup();
        this.createoptionsPopup.HideOptionsPopup();
        this.featurePaytablePopup.HideFeaturePaytablePopup();
        this.scene.topPanel.menuButton.show();
        this.hide();

    }
    onMusicCallback() {
        if (this.musicButton.isDisabled) {
            this.musicButton.enable()
        } else {
            this.musicButton.disable()
        }
    }
    onSoundCallback() {
        if (this.soundButton.isDisabled) {
            this.soundButton.enable()
        } else {
            this.soundButton.disable()
        }
    }
    onHomeCallback() {
        this.regularPaytablePopup.HideRegularPaytablePopup();
        this.paylinesPopup.HidePaylinesPopup();
        this.createoptionsPopup.HideOptionsPopup();
        this.scene.topPanel.menuButton.show();
        this.featurePaytablePopup.HideFeaturePaytablePopup();
        this.hide();
    }

    onSettings() {
        this.createoptionsPopup.ShowOptionsPopup();
        this.paylinesPopup.HidePaylinesPopup();
        this.regularPaytablePopup.HideRegularPaytablePopup();
        this.featurePaytablePopup.HideFeaturePaytablePopup();
        this.activeButton = 'settings';
        this.SettingActive();
    };

    onPaylines() {
        this.createoptionsPopup.HideOptionsPopup();
        this.paylinesPopup.ShowPaylinesPopup();
        this.regularPaytablePopup.HideRegularPaytablePopup();
        this.featurePaytablePopup.HideFeaturePaytablePopup();
        this.activeButton = 'paylines';
        this.PaylineActive();
    };

    onRegularPaytable() {
        this.createoptionsPopup.HideOptionsPopup();
        this.paylinesPopup.HidePaylinesPopup();
        this.regularPaytablePopup.ShowRegularPaytablePopup();
        this.regularPaytablePopup.createPaytableCells();
        this.featurePaytablePopup.HideFeaturePaytablePopup();
        this.activeButton = 'regularPaytable';
        this.RegularActive();
    };

    onFeaturePaytable() {
        this.createoptionsPopup.HideOptionsPopup();
        this.paylinesPopup.HidePaylinesPopup();
        this.regularPaytablePopup.HideRegularPaytablePopup();
        this.featurePaytablePopup.ShowFeaturePaytablePopup();
        this.featurePaytablePopup.createPaytableCells();
        this.activeButton = 'featurePaytable';
        this.FeatureActive();
    };
    ResizeMenuBg(newWidth) {
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, this.bgImage.displayWidth, this.bgImage.displayHeight);
        this.bgImage.setScale(newScale);
        this.bgImage.setPosition(0, 0);
        let currentHeight = this.bgImage.displayHeight;
    }
    SettingActive() {
        this.settingButton.disabled.setVisible(true);
        this.infoButton.normal.setVisible(true);
        this.infoButton.disabled.setVisible(false);
        this.regularPaytableButton.normal.setVisible(true);
        this.regularPaytableButton.disabled.setVisible(false);
        // this.featurePaytableButton.normal.setVisible(true);
        // this.featurePaytableButton.disabled.setVisible(false);
    }
    PaylineActive() {
        this.settingButton.normal.setVisible(true);
        this.settingButton.disabled.setVisible(false);
        this.infoButton.disabled.setVisible(true);
        this.regularPaytableButton.normal.setVisible(true);
        this.regularPaytableButton.disabled.setVisible(false);
        // this.featurePaytableButton.normal.setVisible(true);
        // this.featurePaytableButton.disabled.setVisible(false);
    }
    RegularActive() {
        this.settingButton.normal.setVisible(true);
        this.settingButton.disabled.setVisible(false);
        this.infoButton.normal.setVisible(true);
        this.infoButton.disabled.setVisible(false);
        this.regularPaytableButton.disabled.setVisible(true);
        // this.featurePaytableButton.normal.setVisible(true);
        // this.featurePaytableButton.disabled.setVisible(false);
    }
    FeatureActive() {
        this.settingButton.normal.setVisible(true);
        this.settingButton.disabled.setVisible(false);
        this.infoButton.normal.setVisible(true);
        this.infoButton.disabled.setVisible(false);
        this.regularPaytableButton.normal.setVisible(true);
        this.regularPaytableButton.disabled.setVisible(false);
        // this.featurePaytableButton.disabled.setVisible(true);
    }

    resize(newWidth, newHeight) {
        let cfg = this.scene.cache.json.get("resolution-config");
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        this.currentScale = newScale;
        this.arrange(newHeight);
        // this.overLayImage.setPosition(
        //     (newWidth - this.width * newScale) / 2,
        //     (newHeight - this.height * newScale) / 2
        // );
        // this.overLayImage.setDisplaySize(this.width * newScale, this.height * newScale);
        this.bgImage.setPosition(
            (newWidth - this.width * newScale) / 2,
            (newHeight - this.height * newScale) / 2
        );
        this.bgImage.setDisplaySize(this.width * newScale, this.height * newScale);
        this.settingButton.setScale(newScale);
        this.settingButton.setPosition(
            (this.bgImage.x + cfg.menu.setting.stepX * newScale),
            (this.bgImage.y + cfg.menu.setting.stepY * newScale)
        );
        this.infoButton.setScale(newScale);
        this.infoButton.setPosition(
            (this.bgImage.x + cfg.menu.info.stepX * newScale),
            (this.bgImage.y + cfg.menu.info.stepY * newScale)
        );
        this.regularPaytableButton.setScale(newScale);
        this.regularPaytableButton.setPosition(
            (this.bgImage.x + cfg.menu.paytable.stepX * newScale),
            (this.bgImage.y + cfg.menu.paytable.stepY * newScale)
        );

        // this.featurePaytableButton.setScale(newScale);
        // this.featurePaytableButton.setPosition(
        //     (this.bgImage.x + 2.5 * (cfg.menu.paytable.stepX) * newScale),
        //     (this.bgImage.y + cfg.menu.paytable.stepY * newScale)
        // );

        this.closeButton.setScale(newScale);
        this.closeButton.setPosition(
            (newWidth - cfg.menu.close.stepX * newScale),
            (cfg.menu.close.stepY * newScale)
        );


        this.musicButton.setScale(newScale);
        this.musicButton.setPosition(
            (newWidth - cfg.menu.music.stepX * newScale),
            (cfg.menu.music.stepY * newScale)
        );
        this.soundButton.setScale(newScale);
        this.soundButton.setPosition(
            (newWidth - cfg.menu.sound.stepX * newScale),
            (cfg.menu.sound.stepY * newScale)
        )
        this.homeButton.setScale(newScale);
        this.homeButton.setPosition(
            (newWidth - cfg.menu.home.stepX * newScale),
            (cfg.menu.home.stepY * newScale)
        );
    };
};

export default Menu;