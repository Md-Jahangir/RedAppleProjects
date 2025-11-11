import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
import Button from "./button";
import { Model } from "../model";
/**
 * 
 */
class ValueSwitcher {
	constructor(scene, x, y, values, componentParams = {}, title = null, switcherType) {
		this.scene = scene;
		this.values = values;
		this.title = title;

		this.componentParams = componentParams;

		this.x = x;
		this.y = y;

		this.currentIndex = 0;
		this.decrease = null;
		this.increase = null;
		this.valueText = null;
		this.titleText = null;
		this.currentScale = 1;

		this.onValueChangeCallback = null;
		this.onValueChangeCallbackContext = this;

		this.valueMultiplier = 1;
		this.switcherType = switcherType;
		let baseConfig = this.scene.cache.json.get("resolution-config");
		this.config = this.componentParams.configId ? baseConfig[this.componentParams.configId] : baseConfig.valueSwitcher;
		this.create();
	};

	create() {
		this.decrease = new Button(
			this.scene,
			this.componentParams.decrementImg || "minus_button",
			this.x - this.config.width / 2,
			this.y
		);
		this.decrease.setClickCallback(this.prevValue, this);
		this.increase = new Button(
			this.scene,
			this.componentParams.incrementImg || "plus_button",
			this.x + this.config.width / 2,
			this.y
		);
		this.increase.setClickCallback(this.nextValue, this);
		if (this.switcherType == 'betSwitcher') {
			this.valueText = this.scene.add.text(
				this.x,
				this.y,
				Model.getCurrency() + ' ' + this.values[this.currentIndex],
				{
					fontFamily: "Bahnschrift Condensed",
					fontStyle: "bold",
					shadow: {
						offsetX: this.config.shadowOffsetX,
						offsetY: this.config.shadowOffsetY,
						color: "#f1cc50",//#313131",
						fill: true
					},
					fontSize: this.config.fontSize,
					color: this.config.fontColor || "#ffffff"
				}
			).setOrigin(0.5);
		} else {
			this.valueText = this.scene.add.text(
				this.x,
				this.y,
				this.values[this.currentIndex],
				{
					fontFamily: "Bahnschrift Condensed",
					fontStyle: "bold",
					shadow: {
						offsetX: this.config.shadowOffsetX,
						offsetY: this.config.shadowOffsetY,
						color: "#f1cc50",//#313131",
						fill: true
					},
					fontSize: this.config.fontSize,
					color: this.config.fontColor || "#ffffff"
				}
			).setOrigin(0.5);
		}


		if (this.title) {
			this.titleText = this.scene.add.text(
				this.x,
				this.y - this.config.title.offsetY,
				this.title,
				{
					fontFamily: "Arial",
					fontSize: this.config.title.fontSize,
					color: this.config.title.fontColor || "#f1cc50"
				}
			).setOrigin(0.5);
		}

		this.setPosition(this.x, this.y);
	};

	setValueMultiplier(newMultiplier) {
		this.valueMultiplier = newMultiplier;
		let value = this.values[this.currentIndex];
		this.valueText.setText(value * this.valueMultiplier);
	};

	setValueChangeCallback(callback, callbackContext) {
		this.onValueChangeCallback = callback;
		this.onValueChangeCallbackContext = callbackContext;
	}

	nextValue() {
		this.currentIndex++;
		if (this.currentIndex >= this.values.length) {
			this.currentIndex = this.values.length - 1;
		}
		let value = this.values[this.currentIndex];
		if (this.switcherType == 'betSwitcher') {
			this.valueText.setText(Model.getCurrency() + ' ' + value * this.valueMultiplier);
		} else {
			this.valueText.setText(value * this.valueMultiplier);
		}


		if (this.onValueChangeCallback) {
			this.onValueChangeCallback.apply(this.onValueChangeCallbackContext, [value]);
		}
	};

	prevValue() {
		this.currentIndex--;
		if (this.currentIndex <= 0) {
			this.currentIndex = 0;
		}
		let value = this.values[this.currentIndex];
		if (this.switcherType == 'betSwitcher') {
			this.valueText.setText(Model.getCurrency() + ' ' + value * this.valueMultiplier);
		} else {
			this.valueText.setText(value * this.valueMultiplier);
		}

		if (this.onValueChangeCallback) {
			this.onValueChangeCallback.apply(this.onValueChangeCallbackContext, [value]);
		}
	};

	setLastValue() {
		this.currentIndex = this.values.length - 1;
		this.nextValue();
	};

	getValue() {
		return this.values[this.currentIndex];
	};

	resize(newWidth, newHeight) {
		let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

		this.currentScale = newScale;

		this.decrease.setScale(newScale);
		this.increase.setScale(newScale);
		this.valueText.setScale(newScale);

		if (this.titleText) this.titleText.setScale(newScale);

		this.setPosition(this.x * newScale, this.y * newScale);
	};

	setPosition(newX, newY) {
		this.x = newX;
		this.y = newY;

		let width = this.config.width * this.currentScale;
		if (this.componentParams.configId == 'autoGameValues') {
			let newDecreasePos = this.config.decreaseButton.x * this.currentScale;
			let newIncreasePos = this.config.increaseButton.x * this.currentScale;
			this.decrease.setPosition(this.x - newDecreasePos, this.y);
			this.increase.setPosition(this.x + newIncreasePos, this.y);
		} else {
			this.decrease.setPosition(this.x - width / 2, this.y);
			this.increase.setPosition(this.x + width * 1.3, this.y);

		}


		this.valueText.setPosition(this.x + width / 2 - (this.config.distanceX * this.currentScale), this.y + (this.config.distanceY * this.currentScale));

		if (this.titleText) {
			this.titleText.setPosition(this.x, this.y - this.config.title.offsetY * this.currentScale);
		}
	};

	destroy() {
		this.decrease.destroy();
		this.increase.destroy();
		this.valueText.destroy();
		if (this.titleText) this.titleText.destroy();
	};
	enable() {
		this.decrease.enable();
		this.increase.enable();
	}
	disable() {
		this.decrease.disable();
		this.increase.disable();
	}

	show() {
		this.decrease.show();
		this.increase.show();
		this.valueText.setVisible(true);
		this.titleText.setVisible(true);
	};

	hide() {
		this.decrease.hide();
		this.increase.hide();
		this.valueText.setVisible(false);
		this.titleText.setVisible(false);
	};
}

export default ValueSwitcher;