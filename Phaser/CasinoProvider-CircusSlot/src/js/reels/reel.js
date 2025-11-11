import Phaser from "phaser";
import Symbol from "./symbol";
import { getRandomSymbols } from "../utils";
import { Model } from "../model";
import { SelectedResolution } from "../resolution-selector";
import { SoundManager } from "../SoundManager";
import { getScale } from "../utils";

class Reel {
	constructor(scene, x, y, initialSymbols, spinDelay, index) {
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.background = null;
		this.symbols = [];
		this.config = this.scene.cache.json.get("resolution-config");
		this.scale = 1;
		this.spinDelay = spinDelay;
		this.reelIndex = index;
		this.posIndex = [-1, 0, 1, 2, 3];
		this.finalPositionY = null;
		this.stopReel = false;
		this.counter = 0;
		this.completeCounter = 0;
		this.endCounter = 0;
		this.repeatsStep = 0;
		this.finalPosArray = [];
		this.symbolContainer = null;
		this.spineContainer = null;
		this.isFirstPlay = false;
		this.durationArray = [326, 244, 163, 82, 1];
		this.create(initialSymbols);
	};

	create(initialSymbols) {
		this.background = this.scene.add.image(this.x, this.y, "reel_bg_" + this.reelIndex).setOrigin(0);
		this.symbolContainer = this.scene.add.container(SelectedResolution.width / 2, SelectedResolution.height / 2).setScale(1, 1);
		this.spineContainer = this.scene.add.container(SelectedResolution.width / 2, SelectedResolution.height / 2).setScale(1, 1);
		this.graphics = this.scene.add.graphics();
		this.graphics.beginPath();
		this.graphics.fillRect(
			this.background.x,
			this.background.y,
			(this.background.displayWidth),
			((this.background.displayHeight * 0.96))
		);
		this.graphics.fillStyle(0xff00ff, 0);
		this.mask = this.graphics.createGeometryMask();
		for (let i = 0; i < initialSymbols.length; i++) {
			this.spineobjArray = [];
			let symbol = new Symbol(this.scene, this.background.x, this.background.y, initialSymbols[i], this.mask);
			this.symbols.push(symbol);
			this.symbolContainer.add(symbol.usualImg);
			this.spineContainer.add(symbol.winAnim);
			if (i == initialSymbols.length - 1) {
				this.finalPositionY = this.background.y + this.background.displayHeight;
			}
		}
		this.arrange();
		setTimeout(() => {
			this.CreateAnimationTween(initialSymbols);
		}, 200);

	};
	CreateAnimationTween() {
		let symbolConfig = this.scene.cache.json.get("resolution-config").symbols;
		this.backInTween = this.scene.tweens.add({
			targets: this.symbolContainer,
			props: {
				y: {
					value: '-=' + symbolConfig.frame.height,
					duration: this.spinDelay,
					ease: 'Back.In',
				}
			},
			repeat: 0,
			onComplete: () => {
				this.isFirstPlay = true;
				this.SecondAnimation();
			}
		});
		this.backInTween.pause();
	}
	SecondAnimation(index) {
		let symbolConfig = this.scene.cache.json.get("resolution-config").symbols;
		this.backOutTween = this.scene.tweens.add({
			targets: this.symbolContainer,
			props: {
				y: {
					value: "+=" + symbolConfig.frame.height,
					duration: 75
				}
			},
			ease: 'Linear',
			repeat: -1,
			onRepeat: () => {
				if (!this.stop) {
					for (let i = 0; i < 5; i++) {
						let symbolList = Model.getSymbols();
						let randomSymbol = symbolList[Math.floor(Math.random() * (11 - 0) + 0)];
						this.backOutTween.targets[0].list[i].setTexture('symbol-' + randomSymbol);
					}

				}
				else {
					let gridModel = Model.getNewGrid();
					for (let i = gridModel.length - 1; i >= 0; i--) {
						let getSymbol = gridModel[this.reelIndex][i];
						this.backOutTween.targets[0].list[i].setTexture('symbol-' + getSymbol);
						this.symbols[i].setSymbol(getSymbol);
						this.symbols[i].setId(getSymbol);
					}
					this.backOutTween.pause();
					this.EndAnimation();
				}
			}
		});
	}
	EndAnimation() {

		let symbolConfig = this.scene.cache.json.get("resolution-config").symbols;
		for (let i = 0; i < 5; i++) {
			if (i == 0) {
				this.symbolContainer.y += symbolConfig.frame.height;
			}
			this.endTween = this.scene.tweens.add({
				targets: this.symbolContainer,
				props: {
					y: {
						value: '-=' + symbolConfig.frame.height,
						duration: (this.spinDelay),
					}
				},
				repeat: 0,
				onComplete: () => {
					SoundManager.SpinStopSound()
					this.completeCounter++;
					this.stop = false;
					if (this.completeCounter == 5) {
						if (this.reelIndex == 4) {
							this.completeCounter = 0;
							this.scene.game.events.emit('evtShowWonPaylines');
							this.scene.bottomPanel.isSpinning = false;
						}
					}

				}
			});
		}
	}
	ResumeAnimation(spinDelay) {
		let symbolConfig = this.scene.cache.json.get("resolution-config").symbols;
		if (!this.isFirstPlay) {
			this.backInTween.resume();
		} else {
			this.backInTween = this.scene.tweens.add({
				targets: this.symbolContainer,
				props: {
					y: {
						value: '-=' + symbolConfig.frame.height,
						duration: this.spinDelay,
						ease: 'Back.In',
					}
				},
				repeat: 0,
				onComplete: () => {
					this.SecondAnimation();
				}
			});
		}

	}
	getSymbolPosition(index, reelIndex) {
		return this.obj[index].getPosition();
	};
	getPosition() {
		return new Phaser.Geom.Point(this.x, this.y);
	};
	getSymbolByIndex(reelIndex, symbolIndex) {
		return this.symbols[symbolIndex];
	};
	StopAnimation() {
		this.stop = true;
	};

	arrange() {
		let totalHeight = 0;
		this.finalPosArray = [];
		this.symbols.forEach((elem, index) => {
			elem.setPosition(
				this.background.x + this.background.displayWidth / 2,
				this.background.y + this.posIndex[index] * (this.background.displayHeight / 3) + this.config.symbols.startY * this.scale
			);
			elem.setInitialY(this.background.y + this.posIndex[0] * (this.background.displayHeight / 3) + this.config.symbols.startY * this.scale);
			elem.setY(this.background.y + this.posIndex[index] * (this.background.displayHeight / 3) + this.config.symbols.startY * this.scale);
			this.finalPosArray.push(elem.y);
			totalHeight += (elem.getHeight() + this.config.symbols.distance * this.scale);
			this.finalPositionY = this.background.y + this.background.displayHeight + (this.config.symbols.startY * this.scale);

		});
		this.symbolContainer.setPosition(0, 0);
		this.spineContainer.setPosition(0, 0);
		this.mask.geometryMask.setPosition(this.background.x, this.background.y + 10);
	};

	arrangeGrahics() {
		this.graphics = null;
		this.graphics = this.scene.add.graphics();
		this.graphics.beginPath();
		this.graphics.fillRect(
			(this.background.x),
			(this.background.y + 10),
			(this.background.displayWidth),
			((this.background.displayHeight) * 0.98)
		);
		this.graphics.fillStyle(0xff00ff, 0.3);
		this.mask = this.graphics.createGeometryMask();
	}

	setScale(newScale) {
		this.scale = newScale;
		this.background.setScale(newScale);
		this.graphics.setScale(newScale);
		this.symbols.forEach((elem) => {
			elem.setScale(newScale);
		});
		this.arrange();
	};

	getWidth() {
		return this.background.displayWidth;
	};

	getHeight() {
		return this.background.displayHeight;
	};
	setPosition(newX, newY) {
		this.x = newX;
		this.y = newY;
		this.background.setPosition(newX, newY);
		this.graphics.setPosition(newX, newY);

		this.arrange();
	};
};

export default Reel;