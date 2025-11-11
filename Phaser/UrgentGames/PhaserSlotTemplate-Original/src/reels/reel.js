import Phaser from "phaser";
import Symbol from "./symbol";
import { getRandomSymbols } from "../utils";
import { Model } from "../model";

class Reel {
	constructor(scene, x, y, initialSymbols, spinDelay) {
		this.scene      = scene;
		this.x          = x;
		this.y          = y;
		this.background = null;
		this.symbols    = [];
		this.config     = this.scene.cache.json.get("resolution-config");
		this.scale      = 1;
		this.spinDelay  = spinDelay;
		this.create(initialSymbols);		
	};

	create(initialSymbols) {
		this.background = this.scene.add.image(this.x, this.y, "reel-bg").setOrigin(0);
		for (let i = 0; i < initialSymbols.length; i++) {
			let symbol = new Symbol(this.scene, this.x, this.y, initialSymbols[i]);
			this.symbols.push(symbol);
		}
		this.arrange();
	};

	getSymbolPosition(index) {
		return this.symbols[index].getPosition();
	};

	getSymbolByIndex(index) {
		return this.symbols[index];
	};

	spin() {
		this.scene.time.addEvent({ delay: this.spinDelay, callback: () => {
			this.symbols.forEach((elem) => {
				elem.playSpin();
			});
		}, callbackScope: this });
	};

	stop() {
		this.scene.time.addEvent({ delay: this.spinDelay, callback: () => {
			this.symbols.forEach((elem, index) => {
				elem.stopSpin();
			});
		}, callbackScope: this });
	};

	arrange() {
		let totalHeight = 0;
		this.symbols.forEach((elem) => {
			elem.setPosition(
				this.x + (this.config.reels.width / 2) * this.scale,
				this.y + this.config.symbols.startY * this.scale + totalHeight
			);
			totalHeight += (elem.getHeight() + this.config.symbols.distance * this.scale);
		});
	};

	setScale(newScale) {
		this.scale = newScale;
		this.background.setScale(newScale);
		this.symbols.forEach((elem) => {
			elem.setScale(newScale);
		});
		this.arrange();
	};

	getWidth() {
		return this.config.reels.width * this.scale;
	};

	getHeight() {
		return this.config.reels.height * this.scale;
	};

	getPosition() {
		return new Phaser.Geom.Point(this.x, this.y);
	};

	setPosition(newX, newY) {
		this.x = newX;
		this.y = newY;
		this.background.setPosition(newX, newY);
		this.arrange();
	};

	setSymbols(newSymbols) {
		this.symbols.forEach((elem, index) => {
			elem.setSymbol(newSymbols[index]);
		});
	};
};

export default Reel;