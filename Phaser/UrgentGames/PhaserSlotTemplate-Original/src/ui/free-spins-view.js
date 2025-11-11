/**
 * Creates and control "Free Spin" mode elements. Different games can have their own set of elements.
 * @class
 */
class FreeSpinsView {
	/**
	 * @constructs
	 * @param {Phaser.Scene} scene - the scene which this component belongs to.
	 */
	constructor(scene) {
		/**
		 * The scene which this component belongs to.
		 * @type {Phaser.Scene}
		 */
		this.scene = scene;
		/**
		 * Free spin logo. It will appear instead of game logo.
		 * @type {Phaser.GameObjects.Image}
		 */
		this.background = null;
		/**
		 * Background image for left games.
		 * @type {Phaser.GameObjects.Image}
		 */
		this.gamesLeftBackground = null;
		/**
		 * Background image multiplier.
		 * @type {Phaser.GameObjects.Image}
		 */
		this.multiplierBackground = null;
		/**
		 * Text with games left value.
		 * @type {Phaser.GameObjects.Text}
		 */
		this.gamesLeftText = null;
		/**
		 * Text with multiplier value.
		 * @type {Phaser.GameObjects.Text}
		 */
		this.multiplierText = null;
		/**
		 * Config for component.
		 * @type {Object}
		 */
		this.config = this.scene.cache.json.get("resolution-config").freeSpins;
		
		this.create();
		this.hide();

		this.scene.game.events.on("evtFreeSpinShow", this.updateSpins, this);
	};
	//#############################################################################################
	/**
	 * Creates all elements.
	 * @private
	 */
	create() {
		this.background = this.scene.add.image(0, 0, "free-spins-bg");
		this.gamesLeftBackground = this.scene.add.image(0, 0, "games-left-bg");
		this.multiplierBackground = this.scene.add.image(0, 0, "multiplied-bg");
		this.gamesLeftText = this.scene.add.text(
			0,
			0,
			"0",
			{
				fontFamily: "Bahnschrift Condensed",
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
				fontFamily: "Bahnschrift Condensed",
				fontStyle: "bold",
				fontSize: this.config.multiplier.fontSize,
				color: this.config.multiplier.fontColor
			}
		).setOrigin(0.5);
	};
	//#############################################################################################
	/**
	 * Shows all elements.
	 * @public
	 */
	show() {
		this.background.setVisible(true);
		this.gamesLeftBackground.setVisible(true);
		this.multiplierBackground.setVisible(true);
		this.gamesLeftText.setVisible(true);
		this.multiplierText.setVisible(true);
	};
	//#############################################################################################
	/**
	 * Hides all elements.
	 * @public
	 */
	hide() {
		this.background.setVisible(false);
		this.gamesLeftBackground.setVisible(false);
		this.multiplierBackground.setVisible(false);
		this.gamesLeftText.setVisible(false);
		this.multiplierText.setVisible(false);
	};
	//#############################################################################################
	/**
	 * Updates values of left gams and multiplier.
	 * @private
	 * @param {number} gamesLeftValue - new value of left games.
	 * @param {number} multiplierValue - new value of multiplier.
	 */
	updateSpins(gamesLeftValue, multiplierValue) {
		this.gamesLeftText.setText(gamesLeftValue);
		this.multiplierText.setText(multiplierValue);
	};
	//#############################################################################################
	/**
	 * Resizes and changes positions of all elements.
	 * @public
	 * @param {number} newWidth - new app width.
	 * @param {number} newScale - new values of scale.
	 * @param {number} newX - X position of reels area.
	 * @param {number} newY - Y position of reels area.
	 * @param {number} reelsWidth - width of reels area.
	 */
	resize(newWidth, newScale, newX, newY, reelsWidth) {
		this.background.setScale(newScale);
		this.background.setPosition(newWidth / 2, newY - this.config.y * newScale);

		this.gamesLeftBackground.setScale(newScale);
		this.gamesLeftBackground.setPosition(
			(newWidth + reelsWidth) / 2 - this.gamesLeftBackground.displayWidth / 2,
			newY - this.config.gamesLeft.y * newScale
		);
		this.gamesLeftText.setScale(newScale);
		this.gamesLeftText.setPosition(
			this.gamesLeftBackground.x,
			this.gamesLeftBackground.y + this.config.gamesLeft.textY * newScale
		);

		this.multiplierBackground.setScale(newScale);
		this.multiplierBackground.setPosition(
			newX + this.multiplierBackground.displayWidth / 2,
			newY - this.config.multiplier.y * newScale
		);

		this.multiplierText.setScale(newScale);
		this.multiplierText.setPosition(
			this.multiplierBackground.x,
			this.multiplierBackground.y + this.config.multiplier.textY * newScale
		);
	};
};

export default FreeSpinsView;