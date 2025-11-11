import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
import { SoundManager } from "../SoundManager";
/**
 * 
 */
class Button {
	constructor(scene, imgPreffix, x, y) {
		this.scene = scene;

		this.btnX = x;
		this.btnY = y;

		this.normal = null;
		this.hover = null;
		this.disabled = null;
		this.isDisabled = false;

		this.clickCallback = null;
		this.clickCallbackContext = this;
		this.clickCallbackArgs = null;
		this.createImages(imgPreffix);


	};

	createImages(imgPreffix) {
		this.normal = this.scene.add.image(this.btnX, this.btnY, imgPreffix + "-normal");
		this.hover = this.scene.add.image(this.btnX, this.btnY, imgPreffix + "-hover");
		this.disabled = this.scene.add.image(this.btnX, this.btnY, imgPreffix + "-disabled");
		this.hover.setVisible(false);
		this.disabled.setVisible(false);

		this.normal.setInteractive({ useHandCursor: true });
		this.disabled.setInteractive({ useHandCursor: true });
		this.normal.on("pointerover", this.onOver, this);
		this.normal.on("pointerout", this.onOut, this);
		this.normal.on("pointerup", this.onUp, this);
		this.disabled.on("pointerup", this.onDisabledUp, this);
		if (imgPreffix == 'volume-button') {
			this.localStorageVolume();
		}
		if (imgPreffix == 'music-button') {
			this.localStorageMusic();
		}
	};
	localStorageVolume() {
		if (localStorage.getItem('sound_status') == null) {
			localStorage.setItem('sound_status', 0);
		} else {
			let soundStatus = localStorage.getItem('sound_status');
			if (soundStatus == 0) {
				this.enable();
			} else {
				this.disable();
			}
		}
	}
	localStorageMusic() {
		if (localStorage.getItem('music_status') == null) {
			localStorage.setItem('music_status', 0);
			SoundManager.PlayGameBgSound();
		} else {
			let musicStatus = localStorage.getItem('music_status');
			if (musicStatus == 0) {
				SoundManager.PlayGameBgSound();
				this.enable();
			} else {
				SoundManager.StopGameBgSound();
				this.disable();
			}
		}
	}

	setClickCallback(callback, context = null, args = null) {
		this.normalSpin = true;
		this.clickCallback = callback;
		this.clickCallbackContext = context === null ? this : context;
		this.clickCallbackArgs = args;
		console.log('this.clickCallbackContext', this.clickCallbackContext);
	};

	show() {
		if (this.isDisabled) {
			this.normal.setVisible(false);
			this.hover.setVisible(false);
			this.disabled.setVisible(true);
		} else {
			this.normal.setVisible(true);
			this.hover.setVisible(false);
			this.disabled.setVisible(false);
		}
	};

	hide() {
		this.normal.setVisible(false);
		this.hover.setVisible(false);
		this.disabled.setVisible(false);
	};

	onOver() {
		this.hover.setVisible(true);
	};

	onOut() {
		this.hover.setVisible(false);
	};

	onUp() {
		if (this.clickCallback) {
			SoundManager.ButtonClickSound();
			if (this.clickCallbackArgs == null) {
				this.clickCallback.apply(this.clickCallbackContext, this.clickCallbackArgs);
				console.log('this.clickCallback', this.clickCallback, this.clickCallbackContext);
			}
			else if (this.clickCallbackArgs == 'Regular Paytable') {
				this.clickCallback.apply(this.clickCallbackContext);
				this.disabled.setVisible(true);
			}
			else if (this.clickCallbackArgs == 'Feature Paytable') {
				this.clickCallback.apply(this.clickCallbackContext);
				this.disabled.setVisible(true);
			}
			else if (this.clickCallbackArgs == 'Paylines Table') {
				this.clickCallback.apply(this.clickCallbackContext);
				this.disabled.setVisible(true);
			}
			else if (this.clickCallbackArgs == 'Settings') {
				this.clickCallback.apply(this.clickCallbackContext);
				this.disabled.setVisible(true);
			}
			else if (this.clickCallbackArgs == 'volume-button') {
				localStorage.setItem('sound_status', 1);
				this.localStorageVolume();

			}
			else if (this.clickCallbackArgs == 'music-Button') {
				localStorage.setItem('music_status', 1);
				SoundManager.StopGameBgSound();
				this.localStorageMusic();
			}

			else if (this.clickCallbackArgs != null) {
				SoundManager.ButtonClickSound();
			}
			// const argsToPass = this.clickCallbackArgs ? [...this.clickCallbackArgs] : [];
			// this.clickCallback.call(this.clickCallbackContext, ...argsToPass);
		}

		// this.disabled.setVisible(true);
	};
	onDisabledUp() {
		// if (this.disabled.texture.key == 'spin_button-disabled') {
		// 	this.scene.game.events.emit("evtStopSpineForceFully");
		// }
		if (this.disabled.texture.key == 'volume-button-disabled') {
			localStorage.setItem('sound_status', 0);
			this.localStorageVolume();
		}
		if (this.disabled.texture.key == 'music-button-disabled') {
			localStorage.setItem('music_status', 0);
			this.localStorageMusic();
			// SoundManager.PlayGameBgSound();
		}
	}

	getWidth() {
		return this.normal.displayWidth;
	};

	getHeight() {
		return this.normal.displayHeight;
	};

	setScale(newScale) {
		this.normal.setScale(newScale);
		this.hover.setScale(newScale);
		this.disabled.setScale(newScale);
	};

	resize(newWidth, newHeight) {
		let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
		this.setScale(newScale);
	}

	getPosition() {
		res = {
			x: this.x,
			y: this.y
		}
		return res;
	};

	set x(value) {
		this.btnX = value;
		this.setPosition(this.btnX, this.btnY);
	};

	get x() {
		return this.btnX;
	};

	set y(value) {
		this.btnY = value;
		this.setPosition(this.btnX, this.btnY);
	};

	get y() {
		return this.btnY;
	}

	setPosition(newX, newY) {
		this.btnX = newX;
		this.btnY = newY;

		this.normal.setPosition(this.btnX, this.btnY);
		this.hover.setPosition(this.btnX, this.btnY);
		this.disabled.setPosition(this.btnX, this.btnY);
	};

	disable() {
		this.isDisabled = true;
		this.hover.setVisible(false);
		this.normal.setVisible(false);
		this.disabled.setVisible(true);
	};

	enable() {
		this.isDisabled = false;
		this.hover.setVisible(false);
		this.disabled.setVisible(false);
		this.normal.setVisible(true);
	};

	destroy() {
		this.hover.destroy();
		this.normal.destroy();
		this.disabled.destroy();
		delete this;
	};
}

export default Button;