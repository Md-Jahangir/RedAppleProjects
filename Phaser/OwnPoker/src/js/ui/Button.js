import { SelectedResolution } from "../ResolutionSelector.js";
import { Utils } from "../Utils.js";
import Text from "./Text.js";
/**
 * 
 */
class Button {
	constructor(scene, x, y, imgPreffix) {
		this.scene = scene;
		this.btnX = x;
		this.btnY = y;

		this.currentScale = null;

		this.normal = null;
		this.hover = null;
		this.disabled = null;
		this.isDisabled = false;
		this.isOpacityDownFromBegin = false;

		this.clickCallback = null;
		this.clickCallbackContext = this;
		this.clickCallbackArgs = null;

		this.createImages(imgPreffix);


	};

	createImages(imgPreffix) {
		this.normal = this.scene.add.image(this.btnX, this.btnY, imgPreffix + "_normal");
		this.hover = this.scene.add.image(this.btnX, this.btnY, imgPreffix + "_hover");
		this.disabled = this.scene.add.image(this.btnX, this.btnY, imgPreffix + "_disabled");
		this.hover.setVisible(false);
		this.disabled.setVisible(false);

		this.normal.setInteractive({ cursor: 'pointer' });
		this.normal.on("pointerover", this.onOver, this);
		this.normal.on("pointerout", this.onOut, this);
		this.normal.on("pointerup", this.onUp, this);
	};

	FlipButtonXAxis() {
		this.normal.flipX = true;
		this.hover.flipX = true;
		this.disabled.flipX = true;
	};
	FlipButtonYAxis() {
		this.normal.flipY = true;
		this.hover.flipY = true;
		this.disabled.flipY = true;
	};

	SetOpacityDown() {
		this.isOpacityDownFromBegin = true;
		this.normal.setAlpha(0.01);
		this.hover.setAlpha(0.01);
		this.disabled.setAlpha(0.01);
	};
	SetOpacityUp() {
		this.normal.setAlpha(1);
	};

	EnableClick() {
		this.normal.setInteractive({ cursor: 'pointer' });
	};
	DisableClick() {
		this.normal.removeInteractive();
	};

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
		if (this.isOpacityDownFromBegin) return;
		this.hover.setVisible(false);
		this.normal.setAlpha(1.0);
	};

	onUp() {
		if (this.isDisabled) return;
		if (this.clickCallback) {
			this.clickCallback.apply(this.clickCallbackContext, this.clickCallbackArgs);
			this.ButtonScaleTween();
			// console.log("text from js this: ", this);
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

		this.currentScale = newScale;
	};

	setDepth(_newDepth) {
		this.normal.setDepth(_newDepth);
		this.hover.setDepth(_newDepth);
		this.disabled.setDepth(_newDepth);
	}

	resize(newWidth, newHeight) {
		// let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
		let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
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
		setTimeout(() => {
			this.isDisabled = true;
			this.hover.setVisible(false);
			this.normal.setAlpha(0.01);
			this.disabled.setVisible(true);

			this.disabled.setAlpha(0.5);//FOR testing

			this.normal.removeInteractive();
		}, 50);
	};

	enable() {
		this.isDisabled = false;
		this.normal.setInteractive({ cursor: 'pointer' });
		this.hover.setVisible(false);
		this.normal.setAlpha(1.0);
		this.disabled.setVisible(false);
		this.disabled.setAlpha(1);//FOR testing

	};

	destroy() {
		this.hover.destroy();
		this.normal.destroy();
		this.disabled.destroy();
		delete this;
	};

	ButtonScaleTween() {
		this.normal.removeInteractive();

		let scaleTween = this.scene.add.tween({
			targets: [this.normal, this.hover],
			scaleX: this.currentScale * 0.95,
			scaleY: this.currentScale * 0.95,
			ease: 'Linear',
			duration: 50,
			callbackScope: this,
			onComplete: this.onCompleteHandler
		});
	};

	onCompleteHandler(tween, targets) {
		let onCom = this.scene.add.tween({
			targets: [this.normal, this.hover],
			scaleX: this.currentScale * 1,
			scaleY: this.currentScale * 1,
			ease: 'Linear',
			duration: 50,
			callbackScope: this,
			onComplete: function () {
				this.normal.setInteractive({ cursor: 'pointer' });
			}
		});
	};
}

export default Button;