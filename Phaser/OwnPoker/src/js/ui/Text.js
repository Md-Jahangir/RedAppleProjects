import { SelectedResolution } from "../ResolutionSelector";
import { Utils } from "../Utils.js";
/**
 * 
 */
class Text {
	constructor(scene, x, y, params) {
		this.scene = scene;
		this.textPosX = x;
		this.textPosY = y;
		this.textNormal = null;
		this.currentScale = null;

		this.createText(params);
	};

	createText(params) {
		this.textNormal = this.scene.add.text(
			this.textPosX,
			this.textPosY,
			params.text,
			{
				fontFamily: params.fontFamily,
				fontSize: params.fontSize,
				fontStyle: params.fontStyle,
				color: params.color,
				align: params.align,
				wordWrap: params.wordWrap !== undefined ? { width: params.wordWrap.width } : { width: "0" },
				shadow: params.shadow !== undefined ?
					{
						offsetX: params.shadow.offsetX,
						offsetY: params.shadow.offsetY,
						color: params.shadow.color,
						blur: params.shadow.blur,
						stroke: params.shadow.stroke,
						fill: params.shadow.fill
					}
					:
					{
						offsetX: 0,
						offsetY: 0,
						color: "#000000",
						blur: 0,
						stroke: false,
						fill: false
					}
			}
		).setOrigin(0.5);
	};

	setLineSpacing(value) {
		this.textNormal.setLineSpacing(value);
	}

	setText(newText) {
		this.textNormal.setText(newText);
	};

	show() {
		this.textNormal.setVisible(true);
	};

	hide() {
		this.textNormal.setVisible(false);
	};

	setScale(newScale) {
		this.textNormal.setScale(newScale);
		this.currentScale = newScale;
	};

	resize(newWidth, newHeight) {
		let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
		this.textNormal.setScale(newScale);
	}

	setPosition(newX, newY) {
		this.textPosX = newX;
		this.textPosY = newY;
		this.textNormal.setPosition(this.textPosX, this.textPosY);
	};

	disable() {
		// this.textNormal.setVisible(false);
		this.textNormal.setAlpha(0.35);
	};

	enable() {
		// this.textNormal.setVisible(true);
		this.textNormal.setAlpha(1);
	};

	destroy() {
		this.textNormal.destroy();
		delete this;
	};

	TextScaleTween() {
		let scaleTween = this.scene.add.tween({
			targets: [this.textNormal],
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
			targets: [this.textNormal],
			scaleX: this.currentScale * 1,
			scaleY: this.currentScale * 1,
			ease: 'Linear',
			duration: 50,
		});
	};
}

export default Text;