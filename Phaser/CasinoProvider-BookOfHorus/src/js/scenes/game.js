import Phaser from "phaser";
import Background from "../ui/background";
import ReelsView from "../reels/reels-view";
import Paylines from "../ui/paylines";
import { Model } from "../model";
import BottomPanel from "../ui/bottom-panel";
import { getScale } from "../utils";
import { SelectedResolution } from "../resolution-selector";
import TopPanel from "../ui/TopPanel";
import { SoundManager } from "../SoundManager";
import JackpotWin from "../JackpotWin";
import ScorePopup from "../ScorePopup";
import PopupFreeSpins from "../ui/popups/popup-free-spins";

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
		this.topPanel = null;
		this.spinPanel = null;
		this.reelsView = null;
		this.paylines = null;
		this.jackpotWin = null;
		this.scorePopup = null;
		this.popupFreeSpin = null;
		this.popups = {};

	};
	//#############################################################################################
	/**
	 *
	 */

	//#############################################################################################
	/**
	 *
	 */
	create() {
		// this.input.on('pointerup', () => {
		// 	this.game.events.emit('evtForceFullyStopAnimations')
		// })
		SoundManager.PlayGameBgSound();
		if (this.scale.height > this.scale.width) {
			this.currentAspectRatio = (this.scale.width / this.scale.height);
			this.originalAspectRatio = (SelectedResolution.width / SelectedResolution.height);
			this.currentRatio = (this.currentAspectRatio / this.originalAspectRatio);
		} else {
			this.currentAspectRatio = (this.scale.height / this.scale.width);
			this.originalAspectRatio = (SelectedResolution.height / SelectedResolution.width);
			this.currentRatio = (this.currentAspectRatio / this.originalAspectRatio);
		}

		// this.cameras.main.setZoom(0.6);
		this.game.events.on("resize", this.resize, this);
		this.background = new Background(this);
		this.reelsView = new ReelsView(this);
		this.bottomPanel = new BottomPanel(this);
		this.topPanel = new TopPanel(this);
		this.paylines = new Paylines(this, this.reelsView);
		this.jackpotWin = new JackpotWin(this);
		this.scorePopup = new ScorePopup(this);
		this.InitPopupFreeSpins();


		this.resize(window.innerWidth, window.innerHeight);
		// this.bigWin = this.add.spine(600, 400, 'big_win_spine')
		// this.bigWin.play('BigWin_Appear', true);
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
		this.reelsView.resize(newWidth, newHeight);
		this.bottomPanel.resize(newWidth, newHeight);
		this.topPanel.resize(newWidth, newHeight);
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
