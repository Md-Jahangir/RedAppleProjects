/**
 * Creates and controls each reel symbol. Symbol is a set of 3 objects - simple image with symbol
 * texture, sprite with spinning animation and sprite with payline win animation.
 * @class
 */
class Symbol {
	/**
	 * Creates symbol instance.
	 * @constructor
	 * @param {Phaser.Scene} scene - scene which current object belogs to.
	 * @param {number} x - X position of symbol.
	 * @param {number} y - Y position of symbol.
	 * @param {string} id - symbol name.
	 */
	constructor(scene, x, y, id) {
		/**
		 * Scene which current symbol belongs to.
		 * @type {Phaser.Scene}
		 */
		this.scene = scene;
		/**
		 * Symbol name.
		 * @type {string}
		 */
		this.id = id;
		/**
		 * Symbol simple image.
		 * @type {Phaser.GameObjects.Image}
		 */
		this.usualImg = null;
		/**
		 * Sprite for payline win animation.
		 * @type {Phaser.GameObjects.Sprite}
		 */
		this.winAnim = null;
		/**
		 * Sprite for spinning animation.
		 * @type {Phaser.GameObjects.Sprite}
		 */
		this.spinAnim = null;

		this.create(x, y);
	};
	//#################################################################################################################
	/**
	 * Create all images and sprites for symbol.
	 * @private
	 * @param {number} x - X position of symbol.
	 * @param {number} y - Y position of symbol.
	 */
	create(x, y) {
		this.usualImg = this.scene.add.image(x, y, "symbol-" + this.id);
		this.spinAnim = this.scene.add.sprite(x, y, "symbol-spin-animation");
		this.spinAnim.setVisible(false);
		this.winAnim = this.scene.add.sprite(x, y, "animation-symbol-" + this.id);
		this.winAnim.setVisible(false);
	};
	//#################################################################################################################
	/**
	 * Returns symbol name.
	 * @public
	 * @returns {string}
	 */
	getId() {
		return this.id;
	};
	//#################################################################################################################
	/**
	 * Returns symbol image width (with scale applied).
	 * @public
	 * @returns {number}
	 */
	getWidth() {
		return this.usualImg.displayWidth;
	};
	//#################################################################################################################
	/**
	 * Returns symbol image height (with scale applied).
	 * @public
	 * @returns {number}
	 */
	getHeight() {
		return this.usualImg.displayHeight;
	};
	//#################################################################################################################
	/**
	 * Returns position of symbol's image center (ignoring origin).
	 * @public
	 * @returns {Phaser.Geom.Point}
	 */
	getPosition() {
		return this.usualImg.getCenter();
	};
	//#################################################################################################################
	/**
	 * Apply passed scale for all symbol images.
	 * @public
	 * @param {number} newScale - new scale for symbol images.
	 */
	setScale(newScale) {
		this.usualImg.setScale(newScale);
		this.spinAnim.setScale(newScale);
		this.winAnim.setScale(newScale);
	};
	//#################################################################################################################
	/**
	 * Updates position of all symbol's images.
	 * @public
	 * @param {number} newX - new X position.
	 * @param {number} newY - new Y position.
	 */
	setPosition(newX, newY) {
		this.usualImg.setPosition(newX, newY);
		this.spinAnim.setPosition(newX, newY);
		this.winAnim.setPosition(newX, newY);
	};
	//#################################################################################################################
	/**
	 * Hide all images except spinning sprite and plays spin animation.
	 * @public
	 */
	playSpin() {
		this.usualImg.setVisible(false);
		this.winAnim.setVisible(false);
		this.spinAnim.setVisible(true);
		this.spinAnim.play("symbol-spin");
	};
	//#################################################################################################################
	/**
	 * Stops spinning animation and hide all images except static symbol image.
	 * @public
	 */
	stopSpin() {
		this.spinAnim.stop();
		this.spinAnim.setVisible(false);
		this.winAnim.setVisible(false);
		this.usualImg.setVisible(true);
	};
	//#################################################################################################################
	/**
	 * Updates symbol static texture. Also change local symbol name.
	 * @public
	 * @param {string} id - new symbol name.
	 */
	setSymbol(id) {
		this.id = id;
		this.usualImg.setTexture("symbol-" + this.id);
	};
	//#################################################################################################################
	/**
	 * Plays payline win animation for current symbol.
	 * @public
	 */
	playWin() {
		this.usualImg.setVisible(false);
		this.spinAnim.setVisible(false);
		this.winAnim.setVisible(true);
		this.winAnim.play("anim-symbol-" + this.id);
	}
}

export default Symbol;