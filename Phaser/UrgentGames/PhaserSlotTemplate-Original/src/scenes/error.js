import Phaser from "phaser";
import {SelectedResolution} from "../resolution-selector";
import {getScale} from "../utils";

/**
 * Scene for different errors. At this moment it show same text for any error, but later it can show more
 * specific error text.
 * @class
 */
class GameError extends Phaser.Scene {	
	constructor() {
		super("game-error");
		/**
		 * Error icon.
		 * @type {Phaser.GameObjects.Image}
		 */
		this.errorLogo = null;
		/**
		 * Error text.
		 * @type {Phaser.GameObjects.Text}
		 */
		this.errorText = null;
		/**
		 * Config that hold parameters for objects on this scene.
		 * @type {Object}
		 */
		this.config = null;		
	};
	//#################################################################################################################
	/**
	 * Method that called by engine when scene creates. Creates all scene objects. Also call resize method at the end.
	 */
	create() {
		this.config = this.cache.json.get("resolution-config").error;

		this.game.events.on("resize", this.resize, this);

		this.errorLogo = this.add.image(this.scale.width / 2, this.scale.height / 2 - this.config.logo.y, "error-logo");

		this.errorText = this.add.text(
			this.scale.width / 2,
			this.errorLogo.y + this.config.text.y,
			"Sorry :-( Error happend during game loading. Please reload page",
			{
				fontFamily: "Bahnschrift",
				fontStyle: "Condensed",
				fontSize: this.config.text.fontSize,
				color: "#ffffff"
			}
		).setOrigin(0.5);

		this.resize(window.innerWidth, window.innerHeight);	
	};
	//#################################################################################################################
	/**
	 * Callback for "resize" event. Change scale and positions of all scene objects.
	 * @private
	 * @param {number} newWidth - new app width.
	 * @param {number} newHeight - new app height.
	 */
	resize(newWidth, newHeight) {
		let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
		
		this.errorLogo.setScale(newScale);
		this.errorLogo.setPosition(
			newWidth / 2,
			newHeight / 2 - this.config.logo.y * newScale
		);

		this.errorText.setScale(newScale);
		this.errorText.setPosition(
			newWidth / 2,
			this.errorLogo.y + this.config.text.y * newScale
		);
	};
}

export default GameError;