import Phaser from "phaser";
import Background from "../ui/background";
import ReelsView from "../reels/reels-view";
import Paylines from "../ui/paylines";
import { Model } from "../model";
import BottomPanel from "../ui/bottom-panel";
import { getScale } from "../utils";
import { SelectedResolution } from "../resolution-selector";
import ScorePopup from "../ScorePopup";
import JackpotWin from "../JackpotWin";
import PopupFreeSpins from "../ui/popups/popup-free-spins";
import { SoundManager } from "../SoundManager";
/**
 *
 */

class GameMain extends Phaser.Scene {
	/**
	 *
	 */
	constructor() {
		super("game-main");
		this.background = null;
		this.betPanel = null;
		this.balancePanel = null;
		this.bottomPanel = null;
		this.spinPanel = null;
		this.reelsView = null;
		this.paylines = null;
		this.resolutionConfig = null;
		this.popups = {};
		// this.topShadow = null;
		// this.bottomShadow = null;
	};
	
	//#############################################################################################
	/**
	 *
	 */
	create() {
		SoundManager.PlayGameBgSound();
		this.game.events.on("resize", this.resize, this);
		this.resolutionConfig = this.cache.json.get("resolution-config");
		this.background = new Background(this);
		this.reelsView = new ReelsView(this);
		this.bottomPanel = new BottomPanel(this);
		this.paylines = new Paylines(this, this.reelsView);
		this.jackpotWin = new JackpotWin(this);
		this.scorePopup = new ScorePopup(this);
		// this.InitPopupFreeSpins();
		// this.topShadow = this.add.image(0, 0, "top").setOrigin(0);
		// this.bottomShadow = this.add.image(0, 0, "bottom").setOrigin(0);
		this.resize(window.innerWidth, window.innerHeight);
	};
	InitPopupFreeSpins() {
		let listOfFreeSpins = Model.getFreeSpinsData();
		let cfg = this.cache.json.get("resolution-config").freeSpinsPopup;
		this.popupFreeSpin = new PopupFreeSpins(this, cfg, "freeSpins", listOfFreeSpins.length).create();
	}
	//#############################################################################################
	/**
	 *
	 * @param {number} newWidth
	 * @param {number} newHeight
	 */
	resize(newWidth, newHeight) {
		this.background.resize(newWidth, newHeight);
		let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

		// this.topShadow.setScale(newScale);
		// this.bottomShadow.setScale(newScale);

		// this.topShadow.setPosition(newWidth/2 -	this.resolutionConfig.topShadow.x * newScale, 	this.resolutionConfig.topShadow.y * newScale);//newHeight/2 -
		// this.bottomShadow.setPosition(newWidth/2 -	this.resolutionConfig.bottomShadow.x * newScale, newHeight -	this.resolutionConfig.bottomShadow.y * newScale);

		this.reelsView.resize(newWidth, newHeight);
		this.bottomPanel.resize(newWidth, newHeight);
		this.paylines.resize(newWidth, newHeight);
		this.jackpotWin.resize(newWidth, newHeight);
		this.scorePopup.resize(newWidth, newHeight);
		for (let popupId in this.popups) {
			if (this.popups[popupId]) {
				this.popups[popupId].resize(newWidth, newHeight);
			}
		}
	};
}

export default GameMain;
