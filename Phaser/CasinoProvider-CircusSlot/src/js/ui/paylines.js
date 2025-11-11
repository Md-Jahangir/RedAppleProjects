import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
import TextButton from "./text-button";
import { Model } from "../model";
import { SoundManager } from "../SoundManager";

class Paylines {
	constructor(scene, reelsView) {
		this.scene = scene;
		this.reelsView = reelsView;
		this.graphics = null;
		this.config = this.scene.cache.json.get("resolution-config");
		this.scale = 1;
		this.currentPaylineIndex = 0;
		this.paylineIndexes = [0, 1, 2, 3, 4];
		this.spineWinArray = [];
		this.spineShadowArray = [];
		this.timedEvent = null;
		this.timedShadowEvent = null;
		this.create();
		this.scene.game.events.on("evtShowWonPaylines", this.onShowWonPaylines, this);
		this.scene.game.events.on("evtSpinStartClearPayLine", this.stopSpines, this);
		this.scene.game.events.on("evtForceFullyStopAnimations", this.stopSpinesForceFully, this);
		// this.scene.game.events.on("evtPaylinesShowingDone", this.stopSpines, this);
	};

	create() {

	};


	resize(newWidth, newHeight) {
		let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
		this.scale = newScale;
	};


	drawPayline(index, delay = 2000) {
		this.scene.time.addEvent({ delay: delay, callback: this.clearPaylines, callbackScope: this });
	};

	clearPaylines() {
		this.graphics.clear();

	};
	stopSpines() {
		if (this.timedEvent != null || this.timedEvent != undefined) {
			this.timedEvent.remove();
		}
		if (this.timedShadowEvent != null || this.timedShadowEvent != undefined) {
			this.timedShadowEvent.remove();
		}
		if (this.spineShadowArray.length > 0) {
			for (let index = 0; index < this.spineShadowArray.length; index++) {
				this.spineShadowArray[index].stopPayline();
			}
		}
		if (this.spineWinArray.length > 0) {
			for (let index = 0; index < this.spineWinArray.length; index++) {
				this.spineWinArray[index].stopWin();
			}
		}

	}
	stopSpinesForceFully() {
		this.stopSpines();
		// this.scene.game.events.emit('evtPaylinesShowingDone');
	}
	RemoveTimerEvent() {
		if (this.timedEvent != null || this.timedEvent != undefined) {
			this.timedEvent.remove();
			this.symbolsArray = [];
		}
		if (this.timedShadowEvent != null || this.timedShadowEvent != undefined) {
			this.timedShadowEvent.remove();
			this.spineShadowArray = [];
		}
	}
	onShowWonPaylines() {
		this.currentPaylineIndex = 0;
		this.spineWinArray = [];
		this.spineShadowArray = [];
		this.showNextPayline();
		this.CheckWinningStreaks();
	};

	showNextPayline() {
		let list = Model.getWonPaylines();
		if (list.length > 0) {
			if (this.currentPaylineIndex >= list.length) {

				if (this.scene.bottomPanel.isAutoMode || this.scene.bottomPanel.isFreeSpinsMode) {
					this.currentPaylineIndex = 100;
					this.stopSpines();
					setTimeout(() => {
						// this.scene.game.events.emit('evtPaylinesShowingDone', Model.getLastWin());
					}, 1000);
				}
				else {
					this.currentPaylineIndex = 0;
				}
			}
			if (this.currentPaylineIndex < list.length) {
				let currentLine = list[this.currentPaylineIndex];
				currentLine.points.forEach((elem, index) => {
					let reelIndex = index;
					let symbolIndex = currentLine.points[index] + 1;
					this.spineShadow = null;
					this.spineShadow = this.reelsView.getSymbol(reelIndex, symbolIndex);
					this.spineShadow.playPayline(this.spineShadow.usualImg.x, this.spineShadow.usualImg.y);
					this.spineShadowArray.push(this.spineShadow);
					if (this.currentPaylineIndex == list.length - 1) {
						if (this.scene.bottomPanel.isAutoMode || this.scene.bottomPanel.isFreeSpinsMode) {
							this.currentPaylineIndex = 100;
						} else {
						}
					} else {

					}

				})
				currentLine.winIndexes.forEach((elem, index) => {
					let reelIndex = elem;
					let symbolIndex = currentLine.points[elem] + 1;
					this.symbol = null;
					this.symbol = this.reelsView.getSymbol(reelIndex, symbolIndex);
					if (this.symbol.id == 'ladyMagician' || this.symbol.id == 'joker' || this.symbol.id == 'maleMagician') {
						this.delay = 3100;
						this.repeat = 1;
					} else {
						this.delay = 2200;
						this.repeat = 0;
					}
					this.symbol.playWin(this.symbol.id, this.symbol.usualImg.x, this.symbol.usualImg.y);

					// this.spineShadow = this.reelsView.getSymbol(reelIndex, symbolIndex);
					// this.spineShadow.playShadowWin(this.symbol.usualImg.x, this.symbol.usualImg.y);
					// this.spineWinArray.push(this.symbol);
					// this.spineShadowArray.push(this.spineShadow);
					if (this.currentPaylineIndex == list.length - 1) {

						if (this.scene.bottomPanel.isAutoMode || this.scene.bottomPanel.isFreeSpinsMode) {
							this.currentPaylineIndex = 100;
						} else {
							this.currentPaylineIndex = 0;
							if (index == currentLine.winIndexes.length - 1) {
								this.timedEvent = this.scene.time.addEvent({
									delay: this.delay,
									callback: () => {
										this.showNextPayline();
									}
								});
							}
						}
					} else {
						if (index == currentLine.winIndexes.length - 1) {
							this.timedEvent = this.scene.time.addEvent({
								delay: this.delay,
								callback: () => {
									this.showNextPayline();
								}
							});
						}
					}

				})
				this.currentPaylineIndex++;
			}


		} else {
			// this.scene.game.events.emit('evtPaylinesShowingDone', Model.getLastWin());
		}
	};
	CheckWinningStreaks() {
		if (Model.getLastWin() < 20 * Model.getBetPerLine() && Model.getLastWin() > 0) {
			this.scene.bottomPanel.SetLastWin(Model.getLastWin());
			this.scene.game.events.emit('evtPaylinesShowingDone', Model.getLastWin());
		}
		else if (Model.getLastWin() >= 5 * Model.getBetPerLine() && Model.getLastWin() < 100 * Model.getBetPerLine()) {
			this.scene.jackpotWin.ShowBigWin();
			this.scene.scorePopup.AnimateTweenText(Model.getLastWin());
		}
		else if (Model.getLastWin() >= 100 * Model.getBetPerLine() && Model.getLastWin() < 500 * Model.getBetPerLine()) {
			this.scene.jackpotWin.ShowSuperWin();
			this.scene.scorePopup.AnimateTweenText(Model.getLastWin());
		}
		else if (Model.getLastWin() >= 300 * Model.getBetPerLine()) {
			this.scene.jackpotWin.ShowMegaWin();
			this.scene.scorePopup.AnimateTweenText(Model.getLastWin());
		}
		else {
			this.scene.bottomPanel.SetLastWin(0);
			this.scene.game.events.emit('evtPaylinesShowingDone', Model.getLastWin());
		}
	}
}

export default Paylines;