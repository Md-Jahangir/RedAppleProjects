/**
 * Config for game logo.
 * @typedef {Object} TypeConfigGameLogo
 * @property {number} y - Y offset from given component position.
 */

/**
 * Class that creates and controls game logo. Game logo can have fixed position on screen or can
 * have position that depends from other elements of game.
 * @class
 */
class GameLogoView {
	/**
	 * @constructs
	 * @param {Phaser.Scene} scene - scene to which this component belongs to.
	 */
	constructor(scene) {
		/**
		 * Scene to which this component belongs to.
		 * @type {Phaser.Scene}
		 */
		this.scene = scene;
		/**
		 * Config object for game logo. It defined in resolution config JSON.
		 * @type {TypeConfigGameLogo}
		 */
		this.config = this.scene.cache.json.get("resolution-config").gameLogo;
		/**
		 * Game logo image.
		 * @type {Phaser.Image}
		 */
		this.background = null;

		this.create();
	};
	//#############################################################################################
	/**
	 * Creates game logo image.
	 * @private
	 */
	create() {
		this.background = this.scene.add.image(this.scene.scale.width / 2, 0, "game-logo");
	};
	//#############################################################################################
	/**
	 * Shows game logo.
	 * @public
	 */
	show() {
		this.background.setVisible(true);
	};
	//#############################################################################################
	/**
	 * Hides game logo.
	 * @public
	 */
	hide() {
		this.background.setVisible(false)
	};	
	//#############################################################################################
	/**
	 * Scale and reposition game logo.
	 * @public
	 * @param {number} newWidth - new app width.
	 * @param {number} newScale - new scale value.
	 * @param {number} newY - new base game logo position.
	 */
	resize(newWidth, newScale, newY) {
		this.background.setScale(newScale);
		this.background.setPosition(newWidth / 2, newY - this.config.y * newScale);
	};
}

export default GameLogoView;