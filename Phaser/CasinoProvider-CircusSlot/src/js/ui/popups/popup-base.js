import { SelectedResolution } from "../../resolution-selector";
import { getScale } from "../../utils";
import Button from "../button";
/**
 *
 */
class PopupBaseUniversal {
	constructor(scene, config, id) {
		this.id = id;
		this.scene = scene;
		this.overlay = null;
		this.config = config;
		this.width = config.width;
		this.height = config.height;
		this.baseSize = 0;

		this.closeButton = null;
		this.acceptButton = null;
		this.declineButton = null;

		this.backButton = null;


		this.backgroundContainer = null;

		if (this.scene.popups[this.id]) {
			this.scene.popups[this.id].destroy();
		}
		this.scene.popups[this.id] = this;
	};

	drawBackground() {
		this.backgroundContainer = this.scene.add.container();

		let topLeft = this.scene.add.image(0, 0, "popup", "topLeft").setOrigin(0);
		this.baseSize = topLeft.displayWidth;
		topLeft.visible = false;
		let topCenter = this.scene.add.image(this.baseSize, 0, "popup", "topCenter").setOrigin(0);
		topCenter.setDisplaySize(this.width - this.baseSize * 2, this.baseSize);
		topCenter.visible = false;

		let topRight = this.scene.add.image(this.width - this.baseSize, 0, "popup", "topRight").setOrigin(0);
		topRight.visible = false;

		let middleLeft = this.scene.add.image(0, this.baseSize, "popup", "middleLeft").setOrigin(0);
		middleLeft.setDisplaySize(this.baseSize, this.height - this.baseSize * 2);
		middleLeft.visible = false;

		let middleCenter = this.scene.add.image(this.baseSize, this.baseSize, "popup", "middleCenter").setOrigin(0);
		middleCenter.setDisplaySize(this.width - this.baseSize * 2, this.height - this.baseSize * 2);
		middleCenter.visible = false;

		let middleRight = this.scene.add.image(this.width - this.baseSize, this.baseSize, "popup", "middleRight").setOrigin(0);
		middleRight.setDisplaySize(this.baseSize, this.height - this.baseSize * 2);
		middleRight.visible = false;

		let bottomLeft = this.scene.add.image(0, this.height - this.baseSize, "popup", "bottomLeft").setOrigin(0);
		bottomLeft.visible = false;

		let bottomCenter = this.scene.add.image(this.baseSize, this.height - this.baseSize, "popup", "bottomCenter").setOrigin(0);
		bottomCenter.setDisplaySize(this.width - this.baseSize * 2, this.baseSize);
		bottomCenter.visible = false;

		let bottomRight = this.scene.add.image(this.width - this.baseSize, this.height - this.baseSize, "popup", "bottomRight").setOrigin(0);
		bottomRight.visible = false;

		this.backgroundContainer.add([topLeft, topCenter, topRight, middleLeft, middleCenter, middleRight, bottomLeft, bottomCenter, bottomRight]);


	};

	create() {
		this.overlay = this.scene.add.image(0, 0, "popup_overlay").setOrigin(0);
		this.overlay.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
		this.overlay.setInteractive({ useHandCursor: true });

		this.drawBackground();

		this.createContent();

		this.createControlButtons();

		this.resize(this.scene.scale.width, this.scene.scale.height);

		return this;
	}

	createControlButtons() {
		if (this.config.hasCloseButton) {
			this.closeButton = new Button(this.scene, "decline_button", 0, 0);
			this.closeButton.setClickCallback(this.onClose, this);
		}
		if (this.config.hasAcceptButton) {
			// this.acceptButton = new Button(this.scene, "popup-accept", 0, 0);
			this.acceptButton = new Button(this.scene, "accept_button", 0, 0);
			this.acceptButton.setClickCallback(this.onAccept, this);
		}
		if (this.config.hasDeclineButton) {
			// this.declineButton = new Button(this.scene, "popup-decline", 0, 0);
			this.declineButton = new Button(this.scene, "decline_button", 0, 0);
			this.declineButton.setClickCallback(this.onDecline, this);
		}
		// this.backButton = new Button(this.scene, "back-button", 0, 0);
		this.backButton = new Button(this.scene, "back_button", 0, 0);
		this.backButton.setClickCallback(this.onClose, this);
	};

	onClose() {
		this.destroy();
	};

	onAccept() {

		this.destroy();
	};
	onHide() {
		this.overlay.setVisible(false)
	}

	onDecline() {
		this.destroy();
	};

	createContent() { };

	destroyContent() { };

	resizeContent(newWidth, newHeight, newScale) { };

	resize(newWidth, newHeight) {
		this.overlay.setDisplaySize(newWidth, newHeight);

		let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
		this.backgroundContainer.setScale(newScale);
		this.backgroundContainer.setPosition((newWidth - this.width * newScale) / 2, (newHeight - this.height * newScale) / 2);
		this.backButton.setScale(newScale);
		this.backButton.setPosition(this.backgroundContainer.x + this.config.backButton.x * newScale,
			this.backgroundContainer.y + this.config.backButton.y * newScale,
			false
		);
		if (this.closeButton) {
			let x = this.width - this.baseSize * 1.5;
			let y = this.baseSize * 1.5;
			if (this.config.closeButton) {
				x = this.config.closeButton.x,
					y = this.config.closeButton.y
			}
			this.closeButton.setScale(newScale);
			this.closeButton.setPosition(
				this.backgroundContainer.x + x * newScale,
				this.backgroundContainer.y + y * newScale,
				false
			);
		}
		if (this.acceptButton) {
			let x = this.width - this.baseSize * 2;
			let y = this.height - this.baseSize * 2;
			if (this.config.acceptButton) {
				x = this.config.acceptButton.x,
					y = this.config.acceptButton.y
			}
			this.acceptButton.setScale(newScale);
			this.acceptButton.setPosition(
				this.backgroundContainer.x + x * newScale,
				this.backgroundContainer.y + y * newScale,
				false
			);
		}
		if (this.declineButton) {
			// let x = this.baseSize * 2.5;
			// let y = this.height - this.baseSize * 2.5;
			let x = this.baseSize * 2;
			let y = this.height - this.baseSize * 2;
			if (this.config.declineButton) {
				x = this.config.declineButton.x,
					y = this.config.declineButton.y
			}
			this.declineButton.setScale(newScale);
			this.declineButton.setPosition(
				this.backgroundContainer.x + x * newScale,
				this.backgroundContainer.y + y * newScale,
				false
			);
		}

		this.resizeContent(newWidth, newHeight, newScale);
	};

	destroy() {
		this.destroyContent();
		if (this.closeButton) this.closeButton.destroy();
		if (this.acceptButton) this.acceptButton.destroy();
		if (this.declineButton) this.declineButton.destroy();
		if (this.overlay) this.overlay.destroy();
		this.backButton.destroy();
		if (this.backgroundContainer) this.backgroundContainer.destroy();
		this.scene.popups[this.id] = null;
		delete this;
	};
}

export default PopupBaseUniversal;
