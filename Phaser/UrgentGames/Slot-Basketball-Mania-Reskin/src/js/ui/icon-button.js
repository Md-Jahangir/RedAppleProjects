import {SelectedResolution} from "../resolution-selector";
import {getScale} from "../utils";
import Button from "./button";
/**
 * 
 */
class IconButton extends Button {
	constructor(scene, imgPreffix, iconImgNormal, iconImgHover, x, y) {
		super(scene, imgPreffix, x, y);
		this.iconNormal = null;
		this.iconHover = null;
		this.createIcons(iconImgNormal, iconImgHover);
	};

	createIcons(iconImgNormal, iconImgHover) {
		this.iconNormal = this.scene.add.image(this.x, this.y, iconImgNormal);
		this.iconHover = this.scene.add.image(this.x, this.y, iconImgHover);
		this.iconHover.setVisible(false);
	};

	onOver() {
		super.onOver();
		this.iconHover.setVisible(true);
		this.iconNormal.setVisible(false);
	};

	onOut() {
		super.onOut();
		this.iconHover.setVisible(false);
		this.iconNormal.setVisible(true);
	};

	setScale(newScale) {
		super.setScale(newScale);
		this.iconNormal.setScale(newScale);
		this.iconHover.setScale(newScale);
	};

	resize(newWidth, newHeight) {
		super.resize(newWidth, newHeight);
		let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
		this.iconNormal.setScale(newScale);
		this.iconHover.setScale(newScale);
	}

	setPosition(newX, newY, needConsiderOrigin = true) {
		super.setPosition(newX, newY, needConsiderOrigin);
		this.iconNormal.setPosition(this.normal.x, this.normal.y);
		this.iconHover.setPosition(this.normal.x, this.normal.y);
	};
}

export default IconButton;