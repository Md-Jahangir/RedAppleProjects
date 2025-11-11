class FreeSpinsView {
	constructor(scene) {
		this.scene = scene;

		this.background = null;
		this.gamesLeftBackground = null;
		this.multiplierBackground = null;

		this.freeSpinHeading = null;

		this.gamesLeftText = null;
		this.multiplierText = null;

		this.config = this.scene.cache.json.get("resolution-config").freeSpins;

		this.isVisible = false;

		this.create();
		this.hide();

		this.scene.game.events.on("evtFreeSpinShow", this.updateSpins, this);
	};
	//#############################################################################################
	/**
	 *
	 */
	create() {
		this.freeSpinHeading = this.scene.add.image(0, 0, "free_spin_heading");
		this.gamesLeftBackground = this.scene.add.image(0, 0, "games_left_base");
		this.multiplierBackground = this.scene.add.image(0, 0, "games_left_base");
		this.gamesLeftText = this.scene.add.text(
			0,
			0,
			"0",
			{
				fontFamily: "framd",
				fontStyle: "bold",
				fontSize: this.config.gamesLeft.fontSize,
				color: this.config.gamesLeft.fontColor
			}
		).setOrigin(0.5);
		this.multiplierText = this.scene.add.text(
			0,
			0,
			"x1",
			{
				fontFamily: "framd",
				fontStyle: "bold",
				fontSize: this.config.multiplier.fontSize,
				color: this.config.multiplier.fontColor
			}
		).setOrigin(0.5);
	};
	//#############################################################################################
	/**
	 *
	 */
	show() {
		this.freeSpinHeading.setVisible(true);
		this.gamesLeftBackground.setVisible(true);
		this.multiplierBackground.setVisible(true);
		this.gamesLeftText.setVisible(true);
		this.multiplierText.setVisible(true);
	};
	//#############################################################################################
	/**
	 *
	 */
	hide() {
		this.freeSpinHeading.setVisible(false);
		this.gamesLeftBackground.setVisible(false);
		this.multiplierBackground.setVisible(false);
		this.gamesLeftText.setVisible(false);
		this.multiplierText.setVisible(false);

	};
	//#############################################################################################
	/**
	 *
	 * @param {number} value
	 */
	updateSpins(gamesLeftValue, multiplierValue) {
		this.gamesLeftText.setText(gamesLeftValue);
		this.multiplierText.setText('X' + multiplierValue);
	};
	//#############################################################################################
	resize(newWidth, newScale, newX, newY, reelsWidth) {
		this.freeSpinHeading.setScale(newScale);
		this.freeSpinHeading.setPosition(newWidth / 2 - this.config.x * newScale, newY - this.config.y * newScale);

		this.gamesLeftBackground.setScale(newScale);
		this.gamesLeftBackground.setPosition(
			(this.freeSpinHeading.x + this.freeSpinHeading.displayWidth) + this.config.gamesLeft.x * newScale,
			this.freeSpinHeading.y - this.config.gamesLeft.y * newScale
		);

		this.gamesLeftText.setScale(newScale);
		this.gamesLeftText.setPosition(
			this.gamesLeftBackground.x,
			this.gamesLeftBackground.y
		);

		this.multiplierBackground.setScale(newScale);
		this.multiplierBackground.setPosition(
			(this.freeSpinHeading.x - this.freeSpinHeading.displayWidth) - this.config.multiplier.x * newScale,
			this.freeSpinHeading.y - this.config.multiplier.y * newScale
		);

		this.multiplierText.setScale(newScale);
		this.multiplierText.setPosition(
			this.multiplierBackground.x,
			this.multiplierBackground.y
		);
	};
};

export default FreeSpinsView;
