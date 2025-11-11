import PopupBase from "./popup-base";

/**
 *
 */
class PopupPaylines extends PopupBase {
	/**
	 *
	 * @param {*} scene
	 * @param {*} id
	 */
	constructor(scene, config, id) {
		super(scene, config, id);

		this.contentTitle = null;
		this.contentMessage = null;
		this.popBg = null;// new bg for teh pop up
		//
		// this.topLogo = null;
		// this.bottomLogo = null;
		// this.bottomText = null;
		//
		this.iconsRows = 4;
		this.iconsCols = 5;

		this.icons = [];
		this.numbers = [];

		this.contentConfig = config.content;
	};
	//#############################################################################################
	/**
	 *
	 */
	createContent() {
		// this.popBg = this.scene.add.image(0, 0, "pop-bg-1").setOrigin(0);
		// this.popBg = this.scene.add.image(0, 0, "pop_bg").setOrigin(0);
		this.popBg = this.scene.add.spine(0, 0, "animation-menu-bg");
		this.popBg.play('animation', true);
		this.contentTitle = this.scene.add.text(
			this.backgroundContainer.x + this.width / 2,
			this.backgroundContainer.y + this.contentConfig.title.y,
			"Paylines Table",
			{
				fontFamily: "Bahnschrift Condensed",
				fontStyle: "bold",
				fontSize: this.contentConfig.title.fontSize,
				color: this.contentConfig.title.fontColor
			}
		).setOrigin(0.5);
		this.contentTitle.visible = false;
		this.contentMessage = this.scene.add.text(
			this.backgroundContainer.x + this.width / 2,
			this.contentTitle.y + this.contentConfig.message.y,
			"Always active 20 paylines. Only highest win pays per line. Win combinations pay left to right",
			{
				fontFamily: "Bahnschrift Condensed",
				align: "center",
				fontSize: this.contentConfig.message.fontSize,
				color: this.contentConfig.message.fontColor,
				wordWrap: {
					width: this.contentConfig.message.wordWrap,
				}
			}
		).setOrigin(0.5, 0);
		this.contentMessage.visible = false;
		this.createIconsAndNumbers();
		this.arrangeIconsAndNumbers(1);
		// this.topLogo = this.scene.add.image(0, 0, "popUp-logo-top").setOrigin(0.5);
		// this.bottomLogo = this.scene.add.image(0, 0, "popUp-logo-bottom").setOrigin(0.5);
		// this.bottomText = this.scene.add.image(0, 0, "popUp-text").setOrigin(0.5);
	};

	createIconsAndNumbers() {
		for (let rowIndex = 0; rowIndex < this.iconsRows; rowIndex++) {
			let row = [];
			let rowNumbers = [];
			for (let colIndex = 0; colIndex < this.iconsCols; colIndex++) {
				let icon = this.scene.add.image(0, 0, "payline-icon-" + (colIndex + rowIndex * this.iconsCols));
				row.push(icon);
				let number = this.scene.add.text(0, 0, colIndex + rowIndex * this.iconsCols + 1, {
					fontFamily: "Bahnschrift Condensed",
					fontSize: this.contentConfig.icons.fontSize,
					color: "#ffffff",
				}).setOrigin(1, 0.5);
				rowNumbers.push(number);
			}
			this.icons.push(row);
			this.numbers.push(rowNumbers);
		}
	};

	arrangeIconsAndNumbers(newScale) {
		let cfg = this.contentConfig.icons;
		let startX = this.backgroundContainer.x + cfg.startX * newScale;
		let startY = this.contentMessage.y + this.contentMessage.displayHeight + cfg.startY * newScale;
		for (let rowIndex = 0; rowIndex < this.iconsRows; rowIndex++) {
			for (let colIndex = 0; colIndex < this.iconsCols; colIndex++) {
				let icon = this.icons[rowIndex][colIndex];
				icon.setScale(newScale);
				icon.setPosition(
					startX + cfg.iconWidth * newScale * colIndex + cfg.stepX * newScale * colIndex,
					startY + cfg.iconHeight * newScale * rowIndex + cfg.stepY * newScale * rowIndex
				);
				let number = this.numbers[rowIndex][colIndex];
				number.setScale(newScale);
				number.setPosition(icon.x - icon.displayWidth / 2 - cfg.textOffsetX * newScale, icon.y);
			}
		}
	};
	//#############################################################################################
	/**
	 *
	 */
	destroyContent() {
		this.contentTitle.destroy();
		this.contentMessage.destroy();
		this.popBg.destroy();
		this.icons.forEach((row) => {
			row.forEach((icon) => {
				icon.destroy();
			});
		});
		this.numbers.forEach((row) => {
			row.forEach((number) => {
				number.destroy();
			});
		});
		this.icons = [];
		this.numbers = [];
		// this.topLogo.destroy();
		// this.bottomLogo.destroy();
		// this.bottomText.destroy();
	};
	//#############################################################################################
	/**
	 *
	 * @param {*} newWidth
	 * @param {*} newHeight
	 * @param {*} newScale
	 */
	resizeContent(newWidth, newHeight, newScale) {
		this.contentTitle.setScale(newScale);
		this.contentTitle.setPosition(this.backgroundContainer.x + (this.width * newScale) / 2, this.backgroundContainer.y + this.contentConfig.title.y * newScale);

		this.contentMessage.setScale(newScale);
		this.contentMessage.setPosition(this.backgroundContainer.x + (this.width * newScale) / 2, this.contentTitle.y + this.contentConfig.message.y * newScale);
		this.popBg.setScale(newScale);
		this.popBg.setPosition(
			newWidth / 2,
			newHeight / 2,
		);
		this.arrangeIconsAndNumbers(newScale);
		// this.topLogo.setScale(newScale);
		// this.bottomLogo.setScale(newScale);
		// this.bottomText.setScale(newScale);
		// this.topLogo.setPosition((this.width * newScale) / 1.2 - (this.bottomLogo.displayWidth * newScale), (this.height * newScale) / 5.5);
		// this.bottomLogo.setPosition(newWidth / 2 - (this.bottomLogo.displayWidth * newScale) / 10, newHeight - (this.bottomLogo.displayHeight * newScale) / 2.3);
		// this.bottomText.setPosition(newWidth / 2 - (this.bottomText.displayWidth * newScale) / 25, newHeight - (this.bottomText.displayHeight * newScale) * 2.5);

	};
}

export default PopupPaylines;
