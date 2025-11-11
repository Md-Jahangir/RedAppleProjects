/**
 * Draws background elements and control its scaling and positioning. Background can be presented not only
 * by one picture. It also can contain several elements (presented as separate textures) that have own
 * positioning and scaling logic. In case of several background components, please modify code accordingly.
 * @class
 */
class Background {
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
		 * Background image.
		 * @type {Phaser.GameObjects.Image}
		 */
		this.background = this.scene.add.image(0, 0, "background").setOrigin(0);
	};
	//#############################################################################################
	/**
	 * Resize and reposition background image. It starts from top let screen corner and scales proportionally
	 * by longest side. So it ok if some areas will be cropped. It need to cover whole client area.
	 * @public
	 * @param {number} newWidth - new app width.
	 * @param {number} newHeight - new app height.
	 */
	resize(newWidth, newHeight) {
		let scaleX = newWidth / this.background.width;
		let scaleY = newHeight / this.background.height;
		let totalScale = scaleX > scaleY ? scaleX : scaleY;
		this.background.setScale(totalScale);
	};
}

export default Background;