import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";

/**
 * 
 */
class Switcher {
	//#############################################################################################
	constructor(scene, x, y, ballOffset, isOff = false) {
		this.scene = scene;
		this.isOff = isOff;
		this.ballOffset = ballOffset || 0;
		//this.background = null;
		this.backgroundOn = null;
		this.backgroundOff = null;
		this.ball = null;

		this.x = x;
		this.y = y;
		this.currentScale = 1;

		this.callbackOn = null;
		this.callbackOnCtx = this;
		this.callbackOff = null;
		this.callbackOffCtx = this;

		this.create();
	};
	//#############################################################################################
	create() {
		this.backgroundOff = this.scene.add.image(this.x, this.y, "switch-background-off").setOrigin(0, 0.5);
		this.backgroundOff.setInteractive();
		this.backgroundOff.on("pointerup", this.changeState, this);

		this.backgroundOn = this.scene.add.image(this.x, this.y, "switch-background-on").setOrigin(0, 0.5);

		this.ball = this.scene.add.image(this.backgroundOff.x, this.backgroundOff.y, "switch-ball");

		this.updateVisibility();

		return this;
	};
	//#############################################################################################
	updateVisibility() {
		if (this.isOff) {
			this.backgroundOn.setAlpha(0);
		} else {
			this.backgroundOn.setAlpha(1);
		}
	};
	//#############################################################################################
	resize(newWidth, newHeight) {
		let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
		this.currentScale = newScale;

		this.backgroundOff.setScale(newScale);
		this.backgroundOn.setScale(newScale);
		this.ball.setScale(newScale);

		this.setPosition(this.x * newScale, this.y * newScale);
	};
	//#############################################################################################
	setPosition(newX, newY) {
		this.x = newX;
		this.y = newY;
		this.backgroundOff.setPosition(this.x, this.y);
		this.backgroundOn.setPosition(this.x, this.y);
		this.ball.setPosition(
			this.isOff ? this.getOffPosition() : this.getOnPosition(),
			this.backgroundOff.y
		);
	};
	//#############################################################################################
	getOffPosition() {
		return this.backgroundOff.x + this.ball.displayWidth / 2 + this.ballOffset * this.currentScale;
	};
	//#############################################################################################
	getOnPosition() {
		return this.backgroundOff.x + this.backgroundOff.displayWidth - this.ball.displayWidth / 2 - this.ballOffset * this.currentScale;
	};
	//#############################################################################################
	changeState() {
		if (this.isOff) {
			this.scene.tweens.add({
				targets: this.ball,
				x: this.getOnPosition(),
				duration: 100,
				onComplete: () => {
					this.isOff = !this.isOff;
					this.updateVisibility();
					this.ball.x = this.getOnPosition();
					if (this.callbackOn) {
						this.callbackOn.apply(this.callbackOnCtx);
					}
				}
			});
			this.scene.tweens.add({
				targets: this.backgroundOn,
				alpha: 1,
				duration: 100
			});
		} else {
			this.scene.tweens.add({
				targets: this.ball,
				x: this.getOffPosition(),
				duration: 100,
				onComplete: () => {
					this.isOff = !this.isOff;
					this.updateVisibility();
					this.ball.x = this.getOffPosition();
					if (this.callbackOff) {
						this.callbackOff.apply(this.callbackOffCtx);
					}
				}
			});
			this.scene.tweens.add({
				targets: this.backgroundOn,
				alpha: 0,
				duration: 100
			});
		}
	};
	HideSwitcher() {
		this.backgroundOff.setVisible(false);
		this.backgroundOn.setVisible(false);
		this.ball.setVisible(false);
	}
	ShowSwitcher() {
		this.backgroundOff.setVisible(true);
		this.backgroundOn.setVisible(true);
		this.ball.setVisible(true);
	}
	//#############################################################################################
	setOnCallback(callback, callbackContext) {
		this.callbackOn = callback;
		this.callbackOnCtx = callbackContext;
	};
	//#############################################################################################
	setOffCallback(callback, callbackContext) {
		this.callbackOff = callback;
		this.callbackOffCtx = callbackContext;
	};
	//#############################################################################################
	destroy() {
		this.ball.destroy();
		this.backgroundOn.destroy();
		this.backgroundOff.destroy();
	};
}

export default Switcher;