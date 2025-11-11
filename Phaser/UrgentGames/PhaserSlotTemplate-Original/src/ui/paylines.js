import {SelectedResolution} from "../resolution-selector";
import {getScale} from "../utils";
import { Model } from "../model";

class Paylines {
	constructor(scene, reelsView) {
		this.scene     = scene;
		this.reelsView = reelsView;
		this.graphics  = null;
		this.config    = this.scene.cache.json.get("resolution-config");
		this.scale     = 1;
		this.leftButtons  = [];
		this.rightButtons = [];
		this.currentPaylineIndex = -1;
		this.data = {
			left: [4, 2, 8, 6, 1, 10, 7, 9, 3, 5],
			right: [14, 12, 18, 11, 16, 17, 20, 19, 13, 15]
		}
		this.colors = [
			0x007F7F,
			0x7F4C00,
			0x65007F,
			0x7F0000,
			0x7F004C,
			0x657F00,
			0x19007F,
			0x197F00,
			0x00327F,
			0x007F33,
			0x007F7F,
			0x7F4C00,
			0x65007F,
			0x007F33,
			0x00327F,
			0x7F0000,
			0x7F004C,
			0x657F00,
			0x19007F,
			0x197F00
		];
		this.create();
		this.scene.game.events.on("evtShowWonPaylines", this.onShowWonPaylines, this);
	};
		
	create() {		
		//this.createButtons(this.data.left, this.leftButtons);
		//this.createButtons(this.data.right, this.rightButtons);
		/*this.arrangeLeft();
		this.arrangeRight();*/
		this.graphics = this.scene.add.graphics();
	};

	/*arrangeLeft(scale) {
		let reelsLeftX = this.reelsView.getX();
		let offsetX = this.config.paylines.offsetX;
		let offsetY = this.config.paylines.offsetY;
		let reelsY = this.reelsView.getY();
		let stepY = this.config.paylines.stepY;
		let totalHeight = 0;
		this.leftButtons.forEach((elem) => {
			elem.setScale(scale);
			elem.setPosition(reelsLeftX - offsetX * scale, reelsY + offsetY * scale + totalHeight);
			totalHeight += (elem.getHeight() + stepY * scale);
		});
	};

	arrangeRight(scale) {
		let reelsLeftX = this.reelsView.getX();
		let reelsWidth = this.reelsView.getWidth();
		let offsetX = this.config.paylines.offsetX;
		let offsetY = this.config.paylines.offsetY;
		let reelsY = this.reelsView.getY();
		let stepY = this.config.paylines.stepY;
		let totalHeight = 0;
		this.rightButtons.forEach((elem) => {
			elem.setScale(scale);
			elem.setPosition(reelsLeftX + reelsWidth - elem.getWidth() + offsetX * scale, reelsY + offsetY * scale + totalHeight);
			totalHeight += (elem.getHeight() + stepY * scale);
		});
	};*/

	resize(newWidth, newHeight) {
		let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
		this.scale = newScale;
		/*this.arrangeLeft(newScale);
		this.arrangeRight(newScale);*/
	};

	/*createButtons(values, buttonsHolder) {
		values.forEach((elem) => {
			let button = new TextButton(this.scene, "round-button", {
				text: elem,
				fontSize: this.config.paylines.fontSize,
				fontColorNormal: this.config.paylines.fontColorNormal,
				fontColorHover: this.config.paylines.fontColorHover
			}, 0, 0);
			button.setClickCallback(this.drawPayline, this, [elem - 1])
			buttonsHolder.push(button);
		});
	};*/

	drawPayline(index, delay = 2000) {
		let paylinesData = Model.getPaylines();
		let payline = paylinesData[index];
		let color = this.colors[index];
		let points = [];
		payline.points.forEach((symbolIndex, reelIndex) => {
			let pos = this.reelsView.getSymbolPosition(reelIndex, symbolIndex);
			points.push(pos);
		});
		this.graphics.clear();
		this.graphics.fillStyle(color, 1.0);
		this.graphics.lineStyle(this.config.paylines.lineWidth * this.scale, color, 1.0);
		this.graphics.beginPath();
		this.graphics.moveTo(points[0].x, points[0].y);
		points.forEach((elem) => {
			this.graphics.lineTo(elem.x, elem.y);
		});
		this.graphics.strokePath();
		points.forEach((elem) => {
			this.graphics.fillCircle(elem.x, elem.y, this.config.paylines.dotRadius * this.scale);
		});
		this.scene.time.addEvent({ delay: delay, callback: this.clearPaylines, callbackScope: this });
	};

	clearPaylines() {
		this.graphics.clear();
	};

	onShowWonPaylines() {
		this.currentPaylineIndex = -1;
		this.showNextPayline()
	};

	showNextPayline() {
		let list = Model.getWonPaylines();
		this.currentPaylineIndex++;
		if (this.currentPaylineIndex < list.length) {
			let currentLine = list[this.currentPaylineIndex];
			this.drawPayline(currentLine.index, 3500);
			currentLine.winIndexes.forEach((elem) => {
				let reelIndex = elem;
				let symbolIndex = currentLine.points[reelIndex];
				let symbol = this.reelsView.getSymbol(reelIndex, symbolIndex);
				symbol.playWin();
			});

			this.scene.time.addEvent({ delay: 3500, callback: this.showNextPayline, callbackScope: this });
		} else {
			this.scene.game.events.emit("evtPaylinesShowingDone");
		}
	};
}

export default Paylines;