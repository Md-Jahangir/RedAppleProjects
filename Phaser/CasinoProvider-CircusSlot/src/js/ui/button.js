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
		this.normal.on("pointerover", this.onOver, this);
		this.normal.on("pointerout", this.onOut, this);
		this.normal.on("pointerup", this.onUp, this);
	};
	localStorageVolume() {
		if (localStorage.getItem('sound_status_circus') == null) {
			localStorage.setItem('sound_status_circus', 0);
		} else {
			let soundStatus = localStorage.getItem('sound_status_circus');
			if (soundStatus == 0) {
				this.enable();
			} else {
				this.disable();
			}
		}
	}
	localStorageMusic() {
		if (localStorage.getItem('music_status_circus') == null) {
			localStorage.setItem('music_status_circus', 0);
			SoundManager.PlayGameBgSound();
		} else {
			let musicStatus = localStorage.getItem('music_status_circus');
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
		this.clickCallback = callback;
		this.clickCallbackContext = context === null ? this : context;
		this.clickCallbackArgs = args;
	};

	show() {
		this.normal.setVisible(true);
		this.hover.setVisible(false);
		this.disabled.setVisible(false);
	};

	hide() {
		this.normal.setVisible(false);
		this.hover.setVisible(false);
		this.disabled.setVisible(false);
	};

	onOver() {
		if (this.isDisabled) return;
		this.hover.setVisible(true);
		this.normal.setAlpha(0.01);
	};

	onOut() {
		if (this.isDisabled) return;
		this.hover.setVisible(false);
		this.normal.setAlpha(1.0);
	};

	onUp() {
		if (this.isDisabled) return;
		if (this.clickCallback) {
			SoundManager.ButtonClickSound();
			this.clickCallback.apply(this.clickCallbackContext, this.clickCallbackArgs);
		}
	};

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
		this.normal.setAlpha(0.01);
		this.disabled.setVisible(true);
	};

	enable() {
		this.isDisabled = false;
		this.hover.setVisible(false);
		this.normal.setAlpha(1.0);
		this.disabled.setVisible(false);
	};

	destroy() {
		this.hover.destroy();
		this.normal.destroy();
		this.disabled.destroy();
		delete this;
	};
}

export default Button;