import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
import Button from "./button";
import OptionsPopup from "./popups/popup-options";
import PaylinesPopup from "./popups/popup-paylines";
import PaytablePopup from "./popups/popup-paytable";

class Menu {
	constructor(scene) {
		this.scene   = scene;
		this.list    = [
			{
				text: "Settings",
				callback: this.onSettings
			},
			{
				text: "Paylines Table",
				callback: this.onPaylines
			},
			{
				text: "Regular Paytable",
				callback: this.onRegularPaytable
			},
			{
				text: "Feature Paytable",
				callback: this.onFeaturePaytable
			}
		]
		this.texts     = [];
		this.buttons   = [];
		this.frame     = null;
		this.isVisible = false;
		this.currentScale = 1;
		this.config    = this.scene.cache.json.get("resolution-config").menu;
	};

	create() {
		for (let i = 0; i < this.list.length; i++) {
			let button = new Button(this.scene, "menu-button", 0, 0);
			button.setClickCallback(this.list[i].callback, this);
			this.buttons.push(button);
			let text = this.scene.add.text(0, 0, this.list[i].text, {
				fontFamily: "Bahnschrift Condensed",
				fontSize: this.config.fontSize,
				color: "#ffffff",
				stroke: "#000000",
				strokeThickness: this.config.strokeThickness			
			}).setOrigin(0.5);
			this.texts.push(text);
		}

		this.arrange(this.scene.scale.height, 1);

		return this;
	};

	arrange(newHeight) {
		let y = newHeight - this.config.y * this.currentScale;
		this.buttons.forEach((button, index) => {
			button.setScale(this.currentScale);
			let x = this.isVisible ? this.config.showX * this.currentScale : this.config.hideX * this.currentScale;
			button.setPosition(x, y - (this.config.step * this.currentScale) * index);
		});
		this.texts.forEach((text, index) => {
			text.setScale(this.currentScale);
			let x = this.isVisible ? this.config.showX * this.currentScale : this.config.hideX * this.currentScale;
			text.setPosition(x, y - (this.config.step * this.currentScale) * index);
		});
	};

	show(isForce = false) {
		this.isVisible = true;		
		for (let i = 0; i < this.buttons.length; i++) {
			let button = this.buttons[i];
			let text = this.texts[i];
			if (isForce) {
				button.x = this.config.showX * this.currentScale;
				text.x = this.config.showX * this.currentScale;
			} else {
				this.scene.tweens.add({
					targets: [button, text],
					x: this.config.showX * this.currentScale,
					duration: 400,
					delay: 60 * i,
					ease: "Back.easeOut"
				});
			}
		}
	};

	hide(isForce = false) {
		this.isVisible = false;
		for (let i = this.buttons.length - 1; i >= 0; i--) {
			let button = this.buttons[i];
			let text = this.texts[i];
			if (isForce) {
				buttons.x = this.config.hideX * this.currentScale;
				text.x = this.config.hideX * this.currentScale;
			} else {
				this.scene.tweens.add({
					targets: [button, text],
					x: this.config.hideX * this.currentScale,
					duration: 400,
					delay: 60 * (this.buttons.length - 1 - i),
					ease: "Back.easeIn"
				});
			}
		}
	};

	onSettings() {
		this.hide();
		let cfg = this.scene.cache.json.get("resolution-config").optionsPopup;
		new OptionsPopup(this.scene, cfg, "options").create();
	};

	onPaylines() {
		this.hide();
		let cfg = this.scene.cache.json.get("resolution-config").paylinesPopup;
		new PaylinesPopup(this.scene, cfg, "paylines").create();
	};

	onRegularPaytable() {
		console.log("regular paytable");
		this.hide();
		let cfg = this.scene.cache.json.get("resolution-config").regularPaytablePopup;
		new PaytablePopup(this.scene, cfg, "regularPaytable").create();
	};

	onFeaturePaytable() {
		console.log("feature paytable");
		this.hide();
		let cfg = this.scene.cache.json.get("resolution-config").regularPaytablePopup;
		new PaytablePopup(this.scene, cfg, "featurePaytable", false).create();
	};

	resize(newWidth, newHeight) {
		let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
		this.currentScale = newScale;
		this.arrange(newHeight);
	};
};

export default Menu;