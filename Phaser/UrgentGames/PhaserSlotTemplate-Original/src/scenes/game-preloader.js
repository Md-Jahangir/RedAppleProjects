import Phaser from "phaser";
import {SelectedResolution} from "../resolution-selector";
import {getScale} from "../utils";
import { Model } from "../model";
import { Server } from "../server";
import FontFaceObserver from "fontfaceobserver";

/**
 * Initial game data from server.
 * @typedef {Object} TypeGameInitialData
 * @property {number} balance - player's balance.
 * @property {number[]} betsValues - list of possible bets values.
 * @property {TypePaylineItem[]} paylines - paylines configuration. See model.js.
 * @property {{"Regular": TypePaytableItem[], "Feature": TypePaytableItem[]}} paytable - payteble data for regular game and free spin game. See model.js.
 */

/**
 * Scene that requests all game data from server and preload assets needed for game.
 * It loads fonts first, then check "must have" URL parameters, and continue game loading if all params passed
 * or go to Error scene otherwise. 
 * @class
 */
class GamePreloader extends Phaser.Scene {
	constructor() {
		super("game-preloader");
		this.screenContainer = null;
		this.progressBar     = null;
		this.companyLogo     = null;
		this.percentsText    = null;
		this.backgroundsList = [
			"coniferous",
			"desert",
			"green-forest",
			"jungle",
			"swamp",
			"tundra"
		];
		this.fontsLoaded = 0;
		this.fonts = {
			"Bahnschrift": null
		}
	};
	//#################################################################################################################
	/**
	 * Called by engine before scene started. Here you can preload assets needed for scene, when it starts.
	 * In this scene only small set of assets preload before others - company logo and assets needed for progress bar.
	 * Please try to avoid to preload unnecessary assets in this method, because user will see nothing before assets loaded.
	 */
	preload() {
		this.cameras.main.setBackgroundColor(0x000000);
		this.load.json("resolution-config",  "assets/configs/resolutions/" + SelectedResolution.path + "/config.json");
		this.load.image("progress-bar",      "assets/images/" + SelectedResolution.path + "/loading/" + "progress-bar.png")
		this.load.image("company-logo",      "assets/images/" + SelectedResolution.path + "/logo.png");
		this.load.image("error-logo",        "assets/images/" + SelectedResolution.path + "/error.png");
	};
	//#################################################################################################################
	/**
	 * Called by engine when scene started. Here you need to create all scene objects. Assets for that objects need
	 * to be already preloaded.
	 * Here game logo draws, create progress bar and percents text. Also here starts loading of main pack of assets.
	 */
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

		this.loadFonts();

		this.resize(window.innerWidth, window.innerHeight);		
	};
	//#################################################################################################################
	/**
	 * Fill model by initial data and starts loading of assets.
	 * @private
	 * @param {TypeGameInitialData} data - initial game data from server.
	 */
	initialServerDataReceived(data) {
		Model.setBalance(data.balance);
		Model.setBetsValues(data.betsValues);
		Model.setPaylines(data.paylines);
		Model.setPaytable(data.paytable);
		this.loadAssets();
	};
	//#################################################################################################################
	/**
	 * Starts to load fonts. Fonts load through the FontFaceObserver lib. For each font own instance of observer created.
	 * Observer creates a promise that call appropriate success or error methods. 
	 * @private
	 */
	loadFonts() {
		let propNames = Object.getOwnPropertyNames(this.fonts);
		propNames.forEach((fontName, index) => {
			let isLast = index >= propNames.length - 1;
			this.fonts[fontName] = new FontFaceObserver(fontName);
			this.fonts[fontName].load().then(this.fontLoadSuccess.bind(this, fontName, isLast), this.fontLoadError.bind(this, fontName));
		});
	};
	//#################################################################################################################
	/**
	 * Calls from font observer promise when font is successfully loaded. If all fonts loaded checks URL params and
	 * continue loading if all params is passed. Goes to Error scene otherwise.
	 * @private
	 * @param {string} fontName 
	 * @param {boolean} isLast 
	 */
	fontLoadSuccess(fontName, isLast) {
		console.info("Font " + fontName + " loaded.");
		if (isLast) {			
			if (Server.isParamsMissing()) {
				this.scene.start("game-error");
			} else {
				Server.getInitialData(this.initialServerDataReceived, this);
			}			
		}
	};
	//#################################################################################################################
	/**
	 * Calls from font observer promise in case of rejection. At this moment just post error message to browser console.
	 * Later can be added reload try.
	 * @private
	 * @param {string} fontName 
	 */
	fontLoadError(fontName) {
		console.error("Font loading error: ", fontName);
	};
	//#################################################################################################################
	/**
	 * Starts main assets pack loading.
	 * @private
	 */
	loadAssets() {
		this.load.once("complete", this.loadComplete, this);
		this.load.on("progress", this.loadProgress, this);

		let config = this.cache.json.get("resolution-config");
		let frameWidth = config.symbols.frame.width;
		let frameHeight = config.symbols.frame.height;

		this.load.atlas("popup",    "assets/images/" + SelectedResolution.path + "/ui/popups/popup-atlas.png",     "assets/images/" + SelectedResolution.path + "/ui/popups/popup-atlas.json");

		// loading random background
		let rndIndex = Math.floor(Math.random() * this.backgroundsList.length);
		let imgName = this.backgroundsList[rndIndex];
		this.load.image("background",                 "assets/images/" + SelectedResolution.path + "/backgrounds/" + imgName + ".jpg");

		this.load.image("reel-bg",                    "assets/images/" + SelectedResolution.path + "/reels/reel-bg.png");
		this.load.image("free-spins-bg",              "assets/images/" + SelectedResolution.path + "/ui/free-spins/free-spins-bg.png");
		this.load.image("games-left-bg",              "assets/images/" + SelectedResolution.path + "/ui/free-spins/games-left-bg.png");
		this.load.image("multiplied-bg",              "assets/images/" + SelectedResolution.path + "/ui/free-spins/multiplied-bg.png");
		this.load.image("game-logo",                  "assets/images/" + SelectedResolution.path + "/ui/game-logo.png");
		this.load.image("bottom-panel-bg",            "assets/images/" + SelectedResolution.path + "/ui/bottom-panel-bg.png");
		this.load.image("max-button-normal",          "assets/images/" + SelectedResolution.path + "/ui/max-button-normal.png");
		this.load.image("max-button-hover",           "assets/images/" + SelectedResolution.path + "/ui/max-button-hover.png");
		this.load.image("max-button-disabled",        "assets/images/" + SelectedResolution.path + "/ui/max-button-disabled.png");
		this.load.image("auto-button-normal",         "assets/images/" + SelectedResolution.path + "/ui/auto-button-normal.png");
		this.load.image("auto-button-hover",          "assets/images/" + SelectedResolution.path + "/ui/auto-button-hover.png");
		this.load.image("auto-button-disabled",       "assets/images/" + SelectedResolution.path + "/ui/auto-button-disabled.png");
		this.load.image("spin-button-normal",         "assets/images/" + SelectedResolution.path + "/ui/spin-button-normal.png");
		this.load.image("spin-button-hover",          "assets/images/" + SelectedResolution.path + "/ui/spin-button-hover.png");
		this.load.image("spin-button-disabled",       "assets/images/" + SelectedResolution.path + "/ui/spin-button-disabled.png");
		this.load.image("options-button-normal",      "assets/images/" + SelectedResolution.path + "/ui/options-button-normal.png");
		this.load.image("options-button-hover",       "assets/images/" + SelectedResolution.path + "/ui/options-button-hover.png");
		this.load.image("options-button-disabled",    "assets/images/" + SelectedResolution.path + "/ui/options-button-normal.png");
		this.load.image("minus-button-normal",        "assets/images/" + SelectedResolution.path + "/ui/minus-button-normal.png");
		this.load.image("minus-button-hover",         "assets/images/" + SelectedResolution.path + "/ui/minus-button-hover.png");
		this.load.image("minus-button-disabled",      "assets/images/" + SelectedResolution.path + "/ui/minus-button-normal.png");
		this.load.image("plus-button-normal",         "assets/images/" + SelectedResolution.path + "/ui/plus-button-normal.png");
		this.load.image("plus-button-hover",          "assets/images/" + SelectedResolution.path + "/ui/plus-button-hover.png");
		this.load.image("plus-button-disabled",       "assets/images/" + SelectedResolution.path + "/ui/plus-button-normal.png");
		this.load.image("popup-overlay",              "assets/images/" + SelectedResolution.path + "/ui/popups/popup-overlay.png");
		this.load.image("coins-heap",                 "assets/images/" + SelectedResolution.path + "/items/coins-heap.png");
		
		this.load.image("paytable-cell",              "assets/images/" + SelectedResolution.path + "/ui/paytable-cell.png");
		this.load.image("prev-page-normal",           "assets/images/" + SelectedResolution.path + "/ui/prev-page-normal.png");
		this.load.image("prev-page-hover",            "assets/images/" + SelectedResolution.path + "/ui/prev-page-hover.png");
		this.load.image("prev-page-disabled",         "assets/images/" + SelectedResolution.path + "/ui/prev-page-disabled.png");
		this.load.image("next-page-normal",           "assets/images/" + SelectedResolution.path + "/ui/next-page-normal.png");
		this.load.image("next-page-hover",            "assets/images/" + SelectedResolution.path + "/ui/next-page-hover.png");
		this.load.image("next-page-disabled",         "assets/images/" + SelectedResolution.path + "/ui/next-page-disabled.png");
		this.load.image("page-inactive",              "assets/images/" + SelectedResolution.path + "/ui/page-inactive.png");
		this.load.image("page-active",                "assets/images/" + SelectedResolution.path + "/ui/page-active.png");
		this.load.image("paytable-cell-shine",        "assets/images/" + SelectedResolution.path + "/ui/paytable-cell-shine.png");

		this.load.image("switch-background-on",       "assets/images/" + SelectedResolution.path + "/ui/switch-background-on-normal.png");
		this.load.image("switch-background-off",      "assets/images/" + SelectedResolution.path + "/ui/switch-background-off-normal.png");
		this.load.image("switch-ball",                "assets/images/" + SelectedResolution.path + "/ui/switch-ball.png");

		this.load.image("menu-button-normal",         "assets/images/" + SelectedResolution.path + "/ui/menu-button-normal.png");
		this.load.image("menu-button-hover",          "assets/images/" + SelectedResolution.path + "/ui/menu-button-hover.png");
		this.load.image("menu-button-disabled",       "assets/images/" + SelectedResolution.path + "/ui/menu-button-normal.png");

		this.load.image("popup-close-normal",         "assets/images/" + SelectedResolution.path + "/ui/popups/popup-close-normal.png");
		this.load.image("popup-close-hover",          "assets/images/" + SelectedResolution.path + "/ui/popups/popup-close-hover.png");
		this.load.image("popup-close-disabled",       "assets/images/" + SelectedResolution.path + "/ui/popups/popup-close-normal.png");

		this.load.image("popup-accept-normal",        "assets/images/" + SelectedResolution.path + "/ui/popups/popup-accept-normal.png");
		this.load.image("popup-accept-hover",         "assets/images/" + SelectedResolution.path + "/ui/popups/popup-accept-hover.png");
		this.load.image("popup-accept-disabled",      "assets/images/" + SelectedResolution.path + "/ui/popups/popup-accept-normal.png");

		this.load.image("popup-decline-normal",       "assets/images/" + SelectedResolution.path + "/ui/popups/popup-decline-normal.png");
		this.load.image("popup-decline-hover",        "assets/images/" + SelectedResolution.path + "/ui/popups/popup-decline-hover.png");
		this.load.image("popup-decline-disabled",     "assets/images/" + SelectedResolution.path + "/ui/popups/popup-decline-normal.png");

		this.load.spritesheet("symbol-spin-animation", "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/spin.png", { frameWidth: frameWidth, frameHeight: frameHeight });

		// loading symbols and payline animations
		let symbolsList = Model.getSymbols();
		symbolsList.forEach((symbolName) => {
			this.load.image("symbol-" + symbolName, "assets/images/" + SelectedResolution.path + "/reels/symbols/" + symbolName + ".png");
			this.load.spritesheet("animation-symbol-" + symbolName, "assets/images/" + SelectedResolution.path + "/reels/symbols/animation/" + symbolName + ".png", { frameWidth: frameWidth, frameHeight: frameHeight });
		});

		// paylines icons
		for (let i = 0; i < 20; i++) {
			this.load.image("payline-icon-" + i,  "assets/images/" + SelectedResolution.path + "/paylines-icons/" + i + ".png");	
		}

		this.load.start();
	};
	//#################################################################################################################
	/**
	 * Handler for "complete" event of loader. Called when assets loading is complete. It make a small pause and then starts main game scene.
	 * @private
	 */
	loadComplete() {
		setTimeout(() => {
			this.scene.start("game-main");
		}, 1000);
	}
	//#################################################################################################################
	/**
	 * Handler for "progress" event of loader. Called by engine each time loading progress is changed. Updates progress bar cropping and text.
	 * @private
	 * @param {number} percents 
	 */
	loadProgress(percents) {
		this.progressBar.setCrop(0, 0, this.progressBar.width * percents, this.progressBar.height);
		this.percentsText.setText(Math.round(percents * 100) + "%");
	}
	//#################################################################################################################
	/**
	 * Handler for "resize" event of app. Change scale and positions of all scene objects.
	 * @private
	 * @param {number} newWidth - new app width.
	 * @param {number} newHeight - new app height.
	 */
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