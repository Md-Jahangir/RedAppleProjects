/**
 * This class implements button component. Button is a set of 3 images - for normal state, hover state and disabled state.
 * During creation in code you need to pass imgPreffix. It is string with button image, but without state.
 * It will be added during images creation. For example string "button" is passed to constructor. It will create
 * button images with names "button-normal", "button-hover" and "button-disabled". You need to be sure that images
 * with these names are loaded in game preloader.
 * NOTE: button position calculated from image center.
 * NOTE: if you don't need Disabled state, for example when you sure the button will never be disabled,
 * you can load in preloader same image for disabled and normal state.
 * @class
 */
class Button {
	/**
	 * @constructs 
	 * @param {Phaser.Scene} scene - targets scene to add the button in.
	 * @param {string} imgPreffix - button images preffix.
	 * @param {number} x - initial X position of component 
	 * @param {number} y - initial Y position of component.
	 */
	constructor(scene, imgPreffix, x, y) {
		/**
		 * Target scene this component will be added to.
		 * @type {Phaser.Scene}
		 */
		this.scene = scene;		
		/**
		 * X position of component. Named this way to avoid conflicts with getter/setter
		 * @type {number}
		 */
		this.btnX = x;
		/**
		 * Y position of component. Named this way to avoid conflicts with getter/setter.
		 * @type {number}
		 */
		this.btnY = y;
		/**
		 * Image for normal state.
		 * @type {Phaser.GameObjects.Image}
		 */
		this.normal = null;
		/**
		 * Image for hover state.
		 * @type {Phaser.GameObjects.Image}
		 */
		this.hover = null;
		/**
		 * Image for disabled state.
		 * @type {Phaser.GameObjects.Image}
		 */
		this.disabled = null;
		/**
		 * Indicates that button in disabled state
		 * @type {boolean}
		 */
		this.isDisabled = false;
		/**
		 * Callback that called when button is clicked.
		 * @type {function}
		 */
		this.clickCallback = null;
		/**
		 * Context for click callback. Normally it must be passed through setClickCallback method
		 * but if not - callback will be called with THIS context.
		 * @type {Object}
		 */
		this.clickCallbackContext = this;
		/**
		 * Array of arguments that will be passed to callback
		 * @type {[]}
		 */
		this.clickCallbackArgs = null;
				
		this.createImages(imgPreffix);		
	};
	//#############################################################################################
	/**
	 * Creates images for all states (normal, hover, disabled) and makes Normal image interactive.
	 * @private
	 * @param {string} imgPreffix - button assets preffix.
	 */
	createImages(imgPreffix) {
		this.normal = this.scene.add.image(this.btnX, this.btnY, imgPreffix + "-normal");
		this.hover = this.scene.add.image(this.btnX, this.btnY, imgPreffix + "-hover");
		this.disabled = this.scene.add.image(this.btnX, this.btnY, imgPreffix + "-disabled");
		this.hover.setVisible(false);
		this.disabled.setVisible(false);

		this.normal.setInteractive();
		this.normal.on("pointerover", this.onOver, this);
		this.normal.on("pointerout", this.onOut, this);
		this.normal.on("pointerup", this.onUp, this);
	};
	//#############################################################################################
	/**
	 * Sets click callback, context and arguments.
	 * @public
	 * @param {function} callback - handler for button click.
	 * @param {?Object} context - context for handler.
	 * @param {?[*]} args - arguments for handler.
	 */
	setClickCallback(callback, context = null, args = null) {
		this.clickCallback = callback;		
		this.clickCallbackContext = context === null ? this : context;
		this.clickCallbackArgs = args;
	};
	//############################################################################################
	/**
	 * Shows button.
	 * @public
	 */
	show() {
		this.normal.setVisible(true);
		this.hover.setVisible(false);
		this.disabled.setVisible(false);
	};
	//#############################################################################################
	/**
	 * Hides button.
	 * @public
	 */
	hide() {
		this.normal.setVisible(false);
		this.hover.setVisible(false);
		this.disabled.setVisible(false);
	};
	//#############################################################################################
	/**
	 * Handler for mouse over event. Set Hover image visible and make Normal image almost transparent.
	 * If button is in disabled state - do nothing.
	 * @private
	 */
	onOver() {
		if (this.isDisabled) return;
		this.hover.setVisible(true);
		this.normal.setAlpha(0.01);
	};
	//#############################################################################################
	/**
	 * Handler for mouse out event. Set Normal image fully visible and makes Hover image unvisible.
	 * If button is in disabled state - do nothing.
	 * @private 
	 */
	onOut() {
		if (this.isDisabled) return;
		this.hover.setVisible(false);
		this.normal.setAlpha(1.0);
	};
	//#############################################################################################
	/**
	 * Handler for mouse up event. If button is in disabled state - do nothing.
	 * If click callback was set - call it.
	 * @private 
	 */
	onUp() {
		if (this.isDisabled) return;
		if (this.clickCallback) {
			this.clickCallback.apply(this.clickCallbackContext, this.clickCallbackArgs);
		}
	};
	//#############################################################################################
	/**
	 * Returns width of button. Use Normal image for detecting width, because other states
	 * images can be bigger than Normal state.
	 * @public
	 * @returns {number}
	 */
	getWidth() {
		return this.normal.displayWidth;
	};
	//#############################################################################################
	/**
	 * Returns height of button. Use Normal image for detecting height, because other states
	 * images can be bigger than Normal state.
	 * @public
	 * @returns {number}
	 */
	getHeight() {
		return this.normal.displayHeight;
	};
	//#############################################################################################
	/**
	 * Scales all button states images.
	 * @public
	 * @param {number} newScale - new scale value.
	 */
	setScale(newScale) {
		this.normal.setScale(newScale);
		this.hover.setScale(newScale);
		this.disabled.setScale(newScale);
	};
	//#############################################################################################
	/**
	 * Returns button position.
	 * @returns {{x: number, y: number}}
	 */
	getPosition() {
		res = {
			x: this.btnX,
			y: this.btnY
		}
		return res;
	};
	//#############################################################################################
	/**
	 * Setter for X property. Changes button X position.
	 * Was added only for animations through Phaser Tweens.
	 * @public
	 */
	set x(value) {
		this.btnX = value;
		this.setPosition(this.btnX, this.btnY);
	};
	//#############################################################################################
	/**
	 * Getter for X property.
	 * Was added only for animations through Phaser Tweens.
	 * @public
	 */
	get x() {
		return this.btnX;
	};
	//#############################################################################################
	/**
	 * Setter for Y property. Changes button Y position.
	 * Was added only for animations through Phaser Tweens.
	 * @public 
	 */
	set y(value) {
		this.btnY = value;
		this.setPosition(this.btnX, this.btnY);
	};
	//#############################################################################################
	/**
	 * Getter for Y property.
	 * Was added only for animations through Phaser Tweens.
	 * @public
	 */
	get y() {
		return this.btnY;
	}
	//#############################################################################################
	/**
	 * Sets position of the button.
	 * @public
	 * @param {number} newX - new X position.
	 * @param {number} newY - new Y position.
	 */
	setPosition(newX, newY) {
		this.btnX = newX;
		this.btnY = newY;

		this.normal.setPosition(this.btnX, this.btnY);
		this.hover.setPosition(this.btnX, this.btnY);
		this.disabled.setPosition(this.btnX, this.btnY);
	};
	//#############################################################################################
	/**
	 * Disable button. Disabled button is not react on mouse events and clicks.
	 * @public
	 */
	disable() {
		this.isDisabled = true;
		this.hover.setVisible(false);
		this.normal.setAlpha(0.01);
		this.disabled.setVisible(true);
	};
	//#############################################################################################
	/**
	 * Enable button.
	 * @public
	 */
	enable() {
		this.isDisabled = false;
		this.hover.setVisible(false);
		this.normal.setAlpha(1.0);
		this.disabled.setVisible(false);
	};
	//#############################################################################################
	/**
	 * Destroys all images.
	 * @public
	 */
	destroy() {
		this.hover.destroy();
		this.normal.destroy();
		this.disabled.destroy();
	};
}

export default Button;