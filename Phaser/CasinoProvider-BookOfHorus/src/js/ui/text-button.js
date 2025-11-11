import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
import Button from "./button";
/**
 * 
 */
class TextButton extends Button {
	constructor(scene, imgPreffix, params, x, y) {
		super(scene, imgPreffix, x, y);
		this.textNormal = null;
		this.textHover = null;
		this.textDisabled = null;
		this.createText(params);
	};

	createText(params) {
		this.textNormal = this.scene.add.text(
			this.x,
			this.y,
			params.text,
			{
				fontFamily: "Arial",
				fontSize: params.fontSize,
				fontStyle: "bold",
				color: params.fontColorNormal !== undefined ? params.fontColorNormal : "#8a330d",
				align: "center",
				wordWrap: { width: this.normal.displayWidth }
			}
		).setOrigin(0.5);

		this.textHover = this.scene.add.text(
			this.x,
			this.y,
			params.text,
			{
				fontFamily: "Arial",
				fontSize: params.fontSize,
				fontStyle: "bold",
				color: params.fontColorHover ? params.fontColorHover : "#d88c43",
				align: "center",
				wordWrap: { width: this.normal.displayWidth }
			}
		).setOrigin(0.5);

		this.textDisabled = this.scene.add.text(
			this.x,
			this.y,
			params.text,
			{
				fontFamily: "Arial",
				fontSize: params.fontSize,
				fontStyle: "bold",
				color: params.fontColorDisabled ? params.fontColorDisabled : "#545454",
				align: "center",
				wordWrap: { width: this.normal.displayWidth }
			}
		).setOrigin(0.5);

		this.textHover.setVisible(false);
		this.textDisabled.setVisible(false);
	};

	setLineSpacing(value) {
		this.textNormal.setLineSpacing(value);
		this.textHover.setLineSpacing(value);
		this.textDisabled.setLineSpacing(value);
	}

	onOver() {
		if (this.isDisabled) return;
		super.onOver();
		this.textHover.setVisible(true);
		this.textNormal.setVisible(false);
	};

	onOut() {
		if (this.isDisabled) return;
		super.onOut();
		this.textHover.setVisible(false);
		this.textNormal.setVisible(true);
	};

	show() {
		super.show();
		this.textHover.setVisible(false);
		this.textNormal.setVisible(true);
	};

	hide() {
		super.hide();
		this.textHover.setVisible(false);
		this.textNormal.setVisible(false);
	};

	setScale(newScale) {
		super.setScale(newScale);
		this.textNormal.setScale(newScale);
		this.textHover.setScale(newScale);
		this.textDisabled.setScale(newScale);
	};

	resize(newWidth, newHeight) {
		super.resize(newWidth, newHeight);
		let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
		this.textNormal.setScale(newScale);
		this.textHover.setScale(newScale);
		this.textDisabled.setScale(newScale);
	}

	setPosition(newX, newY, needConsiderOrigin = true) {
		super.setPosition(newX, newY, needConsiderOrigin);
		this.textNormal.setPosition(this.normal.x, this.normal.y);
		this.textHover.setPosition(this.normal.x, this.normal.y);
		this.textDisabled.setPosition(this.normal.x, this.normal.y);
	};

	disable() {
		super.disable();
		this.textNormal.setVisible(false);
		this.textHover.setVisible(false);
		this.textDisabled.setVisible(true);
	};

	enable() {
		super.enable();
		this.textNormal.setVisible(true);
		this.textHover.setVisible(false);
		this.textDisabled.setVisible(false);
	};
}

export default TextButton;