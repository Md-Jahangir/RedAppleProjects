import Phaser from "phaser";
import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
import { Model } from "../model";
import { Server } from "../server";
import FontFaceObserver from "fontfaceobserver";

class GamePreloader extends Phaser.Scene {
	constructor() {
		super("game-preloader");
		this.screenContainer = null;
		this.progressBar = null;
		this.companyLogo = null;
		this.percentsText = null;
		// this.backgroundsList = [
		// 	"coniferous",
		// 	"desert",
		// 	"green-forest",
		// 	"jungle",
		// 	"swamp",
		// 	"tundra"
		// ];
		this.backgroundsList = [
			"Background_1",
			"Background_2",
			"Background_3",
		];
		this.fontsLoaded = 0;
		this.fonts = {
			"Bahnschrift": null
		}
	};

	preload() {
		// preload assets for loading screen
		this.cameras.main.setBackgroundColor(0x000000);
		this.load.json("resolution-config", "assets/configs/resolutions/" + SelectedResolution.path + "/config.json");
		this.load.image("progress-bar", "assets/images/" + SelectedResolution.path + "/loading/" + "progress-bar.png")
		this.load.image("company-logo", "assets/images/" + SelectedResolution.path + "/logo.png");
		this.load.image("error-logo", "assets/images/" + SelectedResolution.path + "/error.png");
	};

	create() {
		let config = this.cache.json.get("resolution-config");

		this.game.events.on("resize", this.resize, this);

		this.companyLogo = this.add.image(this.scale.width / 2, this.scale.height / 2 - config.loading.logo.y, "company-logo");

		this.progressBar = this.add.image(this.scale.width / 2, this.companyLogo.y + config.loading.logo.stepAfter, "progress-bar");
		this.progressBar.setCrop(0, 0, 0, this.progressBar.displayHeight);

		this.percentsText = this.add.text(
			this.scale.width / 2,
			this.progressBar.y + config.loading.text.y,
			"",
			{
				fontFamily: "Bahnschrift",
				fontStyle: "Condensed",
				fontSize: config.loading.text.fontSize,
				color: "#ffffff"
			}
		).setOrigin(0.5);

		// Server.getInitialData(this.initialServerDataReceived, this);
		this.loadFonts();

		this.resize(window.innerWidth, window.innerHeight);
	};

	initialServerDataReceived(response) {
		let data = response.result;
		Model.setBalance(data.balance);
		Model.setBetsValues(data.betsValues);
		Model.setPaylines(data.paylines);
		Model.setPaytable(data.paytable);
		// this.loadFonts();
		this.loadAssets();
	};
	//#############################################################################################
	loadFonts() {
		let propNames = Object.getOwnPropertyNames(this.fonts);
		propNames.forEach((fontName, index) => {
			let isLast = index >= propNames.length - 1;
			this.fonts[fontName] = new FontFaceObserver(fontName);
			this.fonts[fontName].load().then(this.fontLoadSuccess.bind(this, fontName, isLast), this.fontLoadError.bind(this, fontName));
		});
	};
	//#############################################################################################
	fontLoadSuccess(fontName, isLast) {
		// console.info("Font " + fontName + " loaded.");
		if (isLast) {
			// this.loadAssets();
			if (Server.isParamsMissing()) {
				this.scene.start("game-error");
			} else {
				Server.getInitialData(this.initialServerDataReceived, this);
			}
		}
	};
	//#############################################################################################
	fontLoadError(fontName) {
		console.error("Font loading error: ", fontName);
	};

	loadAssets() {
		this.load.once("complete", this.loadComplete, this);
		this.load.on("progress", this.loadProgress, this);

		let config = this.cache.json.get("resolution-config");
		let frameWidth = config.symbols.frame.width;
		let frameHeight = config.symbols.frame.height;

		this.load.atlas("popup", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-atlas.png", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-atlas.json");

		// loading random background
		let rndIndex = Math.floor(Math.random() * this.backgroundsList.length);
		let imgName = this.backgroundsList[rndIndex];
		// let imgName = this.backgroundsList[0];
		this.load.image("background", "assets/images/" + SelectedResolution.path + "/backgrounds/" + imgName + ".png");
		// this.load.image("background",                             "assets/images/" + SelectedResolution.path + "/backgrounds/" + imgName + ".jpg");

		this.load.image("reel-bg", "assets/images/" + SelectedResolution.path + "/reels/reel-bg.png");
		this.load.image("free-spins-bg", "assets/images/" + SelectedResolution.path + "/ui/free-spins/free-spins-bg.png");
		this.load.image("games-left-bg", "assets/images/" + SelectedResolution.path + "/ui/free-spins/games-left-bg.png");
		this.load.image("multiplied-bg", "assets/images/" + SelectedResolution.path + "/ui/free-spins/multiplied-bg.png");
		this.load.image("game-logo", "assets/images/" + SelectedResolution.path + "/ui/game-logo.png");
		this.load.image("bottom-panel-bg", "assets/images/" + SelectedResolution.path + "/ui/bottom-panel-bg.png");
		this.load.image("max-button-normal", "assets/images/" + SelectedResolution.path + "/ui/max-button-normal.png");
		this.load.image("max-button-hover", "assets/images/" + SelectedResolution.path + "/ui/max-button-hover.png");
		this.load.image("max-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/max-button-disabled.png");
		this.load.image("auto-button-normal", "assets/images/" + SelectedResolution.path + "/ui/auto-button-normal.png");
		this.load.image("auto-button-hover", "assets/images/" + SelectedResolution.path + "/ui/auto-button-hover.png");
		this.load.image("auto-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/auto-button-disabled.png");
		this.load.image("spin-button-normal", "assets/images/" + SelectedResolution.path + "/ui/spin-button-normal.png");
		this.load.image("spin-button-hover", "assets/images/" + SelectedResolution.path + "/ui/spin-button-hover.png");
		this.load.image("spin-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/spin-button-disabled.png");
		this.load.image("options-button-normal", "assets/images/" + SelectedResolution.path + "/ui/options-button-normal.png");
		this.load.image("options-button-hover", "assets/images/" + SelectedResolution.path + "/ui/options-button-hover.png");
		this.load.image("options-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/options-button-normal.png");
		this.load.image("minus-button-normal", "assets/images/" + SelectedResolution.path + "/ui/minus-button-normal.png");
		this.load.image("minus-button-hover", "assets/images/" + SelectedResolution.path + "/ui/minus-button-hover.png");
		this.load.image("minus-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/minus-button-normal.png");
		this.load.image("plus-button-normal", "assets/images/" + SelectedResolution.path + "/ui/plus-button-normal.png");
		this.load.image("plus-button-hover", "assets/images/" + SelectedResolution.path + "/ui/plus-button-hover.png");
		this.load.image("plus-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/plus-button-normal.png");
		this.load.image("popup-overlay", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-overlay.png");
		this.load.image("coins-heap", "assets/images/" + SelectedResolution.path + "/items/coins-heap.png");

		this.load.image("paytable-cell", "assets/images/" + SelectedResolution.path + "/ui/paytable-cell.png");
		this.load.image("prev-page-normal", "assets/images/" + SelectedResolution.path + "/ui/prev-page-normal.png");
		this.load.image("prev-page-hover", "assets/images/" + SelectedResolution.path + "/ui/prev-page-hover.png");
		this.load.image("prev-page-disabled", "assets/images/" + SelectedResolution.path + "/ui/prev-page-disabled.png");
		this.load.image("next-page-normal", "assets/images/" + SelectedResolution.path + "/ui/next-page-normal.png");
		this.load.image("next-page-hover", "assets/images/" + SelectedResolution.path + "/ui/next-page-hover.png");
		this.load.image("next-page-disabled", "assets/images/" + SelectedResolution.path + "/ui/next-page-disabled.png");
		this.load.image("page-inactive", "assets/images/" + SelectedResolution.path + "/ui/page-inactive.png");
		this.load.image("page-active", "assets/images/" + SelectedResolution.path + "/ui/page-active.png");
		this.load.image("paytable-cell-shine", "assets/images/" + SelectedResolution.path + "/ui/paytable-cell-shine.png");


		this.load.image("switch-background-on", "assets/images/" + SelectedResolution.path + "/ui/switch-background-on-normal.png");
		this.load.image("switch-background-off", "assets/images/" + SelectedResolution.path + "/ui/switch-background-off-normal.png");
		this.load.image("switch-ball", "assets/images/" + SelectedResolution.path + "/ui/switch-ball.png");

		this.load.image("menu-button-normal", "assets/images/" + SelectedResolution.path + "/ui/menu-button-normal.png");
		this.load.image("menu-button-hover", "assets/images/" + SelectedResolution.path + "/ui/menu-button-hover.png");
		this.load.image("menu-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/menu-button-normal.png");

		this.load.image("popup-close-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-close-normal.png");
		this.load.image("popup-close-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-close-hover.png");
		this.load.image("popup-close-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-close-normal.png");

		this.load.image("popup-accept-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-accept-normal.png");
		this.load.image("popup-accept-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-accept-normal.png");
		this.load.image("popup-accept-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-accept-normal.png");

		this.load.image("popup-decline-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-decline-normal.png");
		this.load.image("popup-decline-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-decline-normal.png");
		this.load.image("popup-decline-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/popup-decline-normal.png");

		// this.load.image("popup-bg",                   "assets/images/" + SelectedResolution.path + "/ui/popups/popup-bg.png");
		// reels bg
		this.load.image("reels-bg", "assets/images/" + SelectedResolution.path + "/reels/reels-bg.png");

		this.load.image("popUp-logo-top", "assets/images/" + SelectedResolution.path + "/ui/popups/top-logo.png");
		this.load.image("popUp-logo-bottom", "assets/images/" + SelectedResolution.path + "/ui/popups/bottom-logo.png");
		this.load.image("popUp-text", "assets/images/" + SelectedResolution.path + "/ui/popups/top-text.png");
		// sound button

		this.load.image("VolumeOff-button-hover", "assets/images/" + SelectedResolution.path + "/ui/Volume-Off-Hover.png");
		this.load.image("VolumeOff-button-normal", "assets/images/" + SelectedResolution.path + "/ui/Volume-OFF-normal.png");
		this.load.image("VolumeOff-button--disabled", "assets/images/" + SelectedResolution.path + "/ui/Volume-OFF-normal.png");
		this.load.image("VolumeOn-button-hover", "assets/images/" + SelectedResolution.path + "/ui/Volume-On-Hover.png");
		this.load.image("VolumeOn-button-normal", "assets/images/" + SelectedResolution.path + "/ui/Volume-On-Normal.png");
		this.load.image("VolumeOn-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/Volume-On-Normal.png");
		//shadow
		this.load.image("top", "assets/images/" + SelectedResolution.path + "/ui/top.png");
		this.load.image("bottom", "assets/images/" + SelectedResolution.path + "/ui/bottom.png");
		// pop new bg
		this.load.image("pop-bg", "assets/images/" + SelectedResolution.path + "/ui/popups/pop-bg.png");
		this.load.image("pop-bg-1", "assets/images/" + SelectedResolution.path + "/ui/popups/pop-bg-1.png");
		this.load.image("back-button-normal", "assets/images/" + SelectedResolution.path + "/ui/popups/back-button-normal.png");
		this.load.image("back-button-hover", "assets/images/" + SelectedResolution.path + "/ui/popups/back-button-hover.png");
		this.load.image("back-button-disabled", "assets/images/" + SelectedResolution.path + "/ui/popups/back-button-hover.png");

		// pop title image
		this.load.image("AutoGame", "assets/images/" + SelectedResolution.path + "/ui/popups/AutoGame.png");
		this.load.image("Amazing!", "assets/images/" + SelectedResolution.path + "/ui/popups/Amazing!.png");
		this.load.image("Congratulations!", "assets/images/" + SelectedResolution.path + "/ui/popups/Congratulations!.png");

		// this.load.image("symbol-Ball",           "assets/images/" + SelectedResolution.path + "/reels/symbols/Ball.png");
		// this.load.image("symbol-Bonus",       "assets/images/" + SelectedResolution.path + "/reels/symbols/Bonus.png");
		// this.load.image("symbol-Field",       "assets/images/" + SelectedResolution.path + "/reels/symbols/Field.png");
		// this.load.image("symbol-Gloves",   "assets/images/" + SelectedResolution.path + "/reels/symbols/Gloves.png");
		// this.load.image("symbol-Goal",       "assets/images/" + SelectedResolution.path + "/reels/symbols/Goal.png");
		// this.load.image("symbol-Score Board", "assets/images/" + SelectedResolution.path + "/reels/symbols/ScoreBoard.png");
		// this.load.image("symbol-Free Spin",   "assets/images/" + SelectedResolution.path + "/reels/symbols/FreeSpin.png");
		// this.load.image("symbol-Shoes",      "assets/images/" + SelectedResolution.path + "/reels/symbols/Shoes.png");
		// this.load.image("symbol-Strike",       "assets/images/" + SelectedResolution.path + "/reels/symbols/Strike.png");
		// this.load.image("symbol-Trophy",           "assets/images/" + SelectedResolution.path + "/reels/symbols/Trophy.png");
		// this.load.image("symbol-Whistle",           "assets/images/" + SelectedResolution.path + "/reels/symbols/Whistle.png");
		// this.load.image("symbol-Wild",        "assets/images/" + SelectedResolution.path + "/reels/symbols/Wild.png");
		this.load.image("symbol-BagOfCoins", "assets/images/" + SelectedResolution.path + "/reels/symbols/BagOfCoins.png");
		this.load.image("symbol-Bonus", "assets/images/" + SelectedResolution.path + "/reels/symbols/Bonus.png");
		this.load.image("symbol-Cards", "assets/images/" + SelectedResolution.path + "/reels/symbols/Cards.png");
		this.load.image("symbol-Clubs", "assets/images/" + SelectedResolution.path + "/reels/symbols/Clubs.png");
		this.load.image("symbol-Coin", "assets/images/" + SelectedResolution.path + "/reels/symbols/Coin.png");
		this.load.image("symbol-Crown", "assets/images/" + SelectedResolution.path + "/reels/symbols/Crown.png");
		this.load.image("symbol-Free Spin", "assets/images/" + SelectedResolution.path + "/reels/symbols/FreeSpin.png");
		this.load.image("symbol-Diamonds", "assets/images/" + SelectedResolution.path + "/reels/symbols/Diamonds.png");
		this.load.image("symbol-Hearts", "assets/images/" + SelectedResolution.path + "/reels/symbols/Hearts.png");
		this.load.image("symbol-Money", "assets/images/" + SelectedResolution.path + "/reels/symbols/Money.png");
		this.load.image("symbol-Spades", "assets/images/" + SelectedResolution.path + "/reels/symbols/Spades.png");
		this.load.image("symbol-Wild", "assets/images/" + SelectedResolution.path + "/reels/symbols/Wild.png");

		this.load.spritesheet("symbol-spin-animation", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/spin.png", { frameWidth: frameWidth, frameHeight: frameHeight });

		//symbols winning animation
		this.load.spritesheet("animation-symbol-BagOfCoins", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/BagOfCoins.png", { frameWidth: frameWidth, frameHeight: frameHeight });
		this.load.spritesheet("animation-symbol-Bonus", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/Bonus.png", { frameWidth: frameWidth, frameHeight: frameHeight });
		this.load.spritesheet("animation-symbol-Cards", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/Cards.png", { frameWidth: frameWidth, frameHeight: frameHeight });
		this.load.spritesheet("animation-symbol-Clubs", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/Clubs.png", { frameWidth: frameWidth, frameHeight: frameHeight });
		this.load.spritesheet("animation-symbol-Coin", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/Coin.png", { frameWidth: frameWidth, frameHeight: frameHeight });
		this.load.spritesheet("animation-symbol-Crown", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/Crown.png", { frameWidth: frameWidth, frameHeight: frameHeight });
		this.load.spritesheet("animation-symbol-Free Spin", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/FreeSpin.png", { frameWidth: frameWidth, frameHeight: frameHeight });
		this.load.spritesheet("animation-symbol-Diamonds", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/Diamonds.png", { frameWidth: frameWidth, frameHeight: frameHeight });
		this.load.spritesheet("animation-symbol-Hearts", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/Hearts.png", { frameWidth: frameWidth, frameHeight: frameHeight });
		this.load.spritesheet("animation-symbol-Money", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/Money.png", { frameWidth: frameWidth, frameHeight: frameHeight });
		this.load.spritesheet("animation-symbol-Spades", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/Spades.png", { frameWidth: frameWidth, frameHeight: frameHeight });
		this.load.spritesheet("animation-symbol-Wild", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/Wild.png", { frameWidth: frameWidth, frameHeight: frameHeight });

		// paylines icons
		this.load.image("payline-icon-0", "assets/images/" + SelectedResolution.path + "/paylines-icons/0.png");
		this.load.image("payline-icon-1", "assets/images/" + SelectedResolution.path + "/paylines-icons/1.png");
		this.load.image("payline-icon-2", "assets/images/" + SelectedResolution.path + "/paylines-icons/2.png");
		this.load.image("payline-icon-3", "assets/images/" + SelectedResolution.path + "/paylines-icons/3.png");
		this.load.image("payline-icon-4", "assets/images/" + SelectedResolution.path + "/paylines-icons/4.png");
		this.load.image("payline-icon-5", "assets/images/" + SelectedResolution.path + "/paylines-icons/5.png");
		this.load.image("payline-icon-6", "assets/images/" + SelectedResolution.path + "/paylines-icons/6.png");
		this.load.image("payline-icon-7", "assets/images/" + SelectedResolution.path + "/paylines-icons/7.png");
		this.load.image("payline-icon-8", "assets/images/" + SelectedResolution.path + "/paylines-icons/8.png");
		this.load.image("payline-icon-9", "assets/images/" + SelectedResolution.path + "/paylines-icons/9.png");
		this.load.image("payline-icon-10", "assets/images/" + SelectedResolution.path + "/paylines-icons/10.png");
		this.load.image("payline-icon-11", "assets/images/" + SelectedResolution.path + "/paylines-icons/11.png");
		this.load.image("payline-icon-12", "assets/images/" + SelectedResolution.path + "/paylines-icons/12.png");
		this.load.image("payline-icon-13", "assets/images/" + SelectedResolution.path + "/paylines-icons/13.png");
		this.load.image("payline-icon-14", "assets/images/" + SelectedResolution.path + "/paylines-icons/14.png");
		this.load.image("payline-icon-15", "assets/images/" + SelectedResolution.path + "/paylines-icons/15.png");
		this.load.image("payline-icon-16", "assets/images/" + SelectedResolution.path + "/paylines-icons/16.png");
		this.load.image("payline-icon-17", "assets/images/" + SelectedResolution.path + "/paylines-icons/17.png");
		this.load.image("payline-icon-18", "assets/images/" + SelectedResolution.path + "/paylines-icons/18.png");
		this.load.image("payline-icon-19", "assets/images/" + SelectedResolution.path + "/paylines-icons/19.png");

		this.load.start();
	};

	loadComplete() {
		setTimeout(() => {
			this.scene.start("game-main");
		}, 1000);
	}

	loadProgress(percents) {
		this.progressBar.setCrop(0, 0, this.progressBar.width * percents, this.progressBar.height);
		this.percentsText.setText(Math.round(percents * 100) + "%");
	}

	resize(newWidth, newHeight) {
		let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
		let config = this.cache.json.get("resolution-config");

		this.companyLogo.setScale(newScale);
		this.companyLogo.setPosition(
			newWidth / 2,
			newHeight / 2 - config.loading.logo.y * newScale
		);

		this.progressBar.setScale(newScale);
		this.progressBar.setPosition(
			newWidth / 2,
			this.companyLogo.y + config.loading.logo.stepAfter * newScale
		);

		this.percentsText.setScale(newScale);
		this.percentsText.setPosition(
			newWidth / 2,
			this.progressBar.y + config.loading.text.y * newScale
		);
	};
}

export default GamePreloader;
