/**
 * @typedef {Object} ButtonTextStyle
 * @property {string} font - font name.
 * @property {number} fontSize - size of font.
 * @property {string[]} fontColors - holds colors of text for states in order - NORMAL, HOVER, DOWN, DISABLED.
 * Only NORMAL state color is "must have". Other states can be null, but need to be passed.
 * @property {{x: number, y: number}} offset - point-like object with x and y offset for text. Used to correct text position inside button container if needed.
 */

/**
 * Combined text/image button with states processing. If text and text style object are not passed button will display only images like usual
 * sprite button, otherwise text will be created. Images passed in order - NORMAL, HOVER, DOWN, DISABLED. Only NORMAL state image is "must have". Other
 * states images can be null but need to be passed.
 * @param {number} x - X position of button in pixels.
 * @param {number} y - Y position of button in pixels.
 * @param {HTMLImageElement[]} images - holds sourse images for button states.
 * @param {string|null} text - optional text.
 * @param {ButtonTextStyle|null} textStyle - optional text style.
 * @returns 
 */
function Button(x, y, images, text = null, textStyle = null) {
    this.states = {
        STATE_NORMAL: 0,
        STATE_HOVER: 1,
        STATE_DOWN: 2,
        STATE_DISABLED: 3,
    };
    this.currentState = this.states.STATE_NORMAL;
    this.buttonImages = [];
    this.buttonText = null;
    this.buttonTextShadow = null;
    this.container = null;
    this.textFontColors = [];
    this.width = 0;
    this.height = 0;
    this.eventsCallbacks = {};
    this.activationEffect = null;
    
    this.init(x, y, images, text, textStyle);

    return this;
};
//#########################################################################################################################################
/**
 * Creates button container which holds created images and text for all passed states, adds button container to the stage.
 * @private
 * @param {number} x - X position of button in pixels.
 * @param {number} y - Y position of button in pixels.
 * @param {HTMLImageElement[]} images - holds sourse images for button states.
 * @param {string|null} text - optional text.
 * @param {ButtonTextStyle|null} textStyle - optional text style.
 */
Button.prototype.init = function(x, y, images, text, textStyle) {
    this.container = new createjs.Container();
    this.container.x = x;
    this.container.y = y;
    this.container.cursor = "pointer";
    s_oGameCon.addChild(this.container);

    images.forEach((image, index) => {
        if (image !== null) {
            if (index === 0) {
                this.width = image.width;
                this.height = image.height;
            }
            let btnStateImage = createBitmap(image);
            btnStateImage.regX = image.width / 2;
            btnStateImage.regY = image.height / 2;
            this.buttonImages.push(btnStateImage);
            this.container.addChild(btnStateImage);
        } else {
            this.buttonImages.push(null);
        }
    });

    if (text !== null) {
        this.textFontColors = textStyle.fontColors;

        const { fontSize, font, offset } = textStyle;
        let shadowOffset = Math.ceil(fontSize / 20);

        this.buttonText = new createjs.Text(text, fontSize + "px " + font, this.textFontColors[this.currentState]);
        this.buttonText.textAlign = "center";
        this.buttonText.textBaseline = "middle";
        this.buttonText.x = offset.x;
        this.buttonText.y = offset.y;

        this.buttonTextShadow = new createjs.Text(text, fontSize + "px " + font, "#000000");
        this.buttonTextShadow.textAlign = "center";
        this.buttonTextShadow.textBaseline = "middle";
        this.buttonTextShadow.x = this.buttonText.x + shadowOffset
        this.buttonTextShadow.y = this.buttonText.y + shadowOffset;

        this.container.addChild(this.buttonTextShadow, this.buttonText);
    };

    this.container.on("mousedown", this.onDown, this);
    this.container.on("pressup", this.onUp, this);
};
//#########################################################################################################################################
/**
 * Process mouse/pointer down event.
 * @private
 * @returns 
 */
Button.prototype.onDown = function() {
    if (this.currentState === this.states.STATE_DISABLED) {
        return;
    }
    this.container.scale = 0.9;

    this.executeCallback(ON_MOUSE_DOWN);
};
//#########################################################################################################################################
/**
 * Process mouse/pointer up event.
 * @private
 * @returns 
 */
Button.prototype.onUp = function() {
    if (this.currentState === this.states.STATE_DISABLED) {
        return;
    }

    this.stopActivationAnimation();

    this.container.scale = 1;

    playSound("press_but", 1, false);

    this.executeCallback(ON_MOUSE_UP);
};
//#########################################################################################################################################
/**
 * Executes callback by event index if callback is registered.
 * @private
 * @param {number} eventIndex - index of event, to find needed callback.
 */
Button.prototype.executeCallback = function(eventIndex) {
    if (this.eventsCallbacks[eventIndex]) {
        let callbackData = this.eventsCallbacks[eventIndex];
        callbackData.callback.call(callbackData.context);
    }
};
//#########################################################################################################################################
/**
 * Sets new position of button.
 * @public
 * @param {number} x - new X position.
 * @param {number} y - new Y position.
 */
Button.prototype.setPosition = function(x, y) {
    this.container.x = x;
    this.container.y = y;
};

Button.prototype.getX = function () {
  return this.container.x 
};
Button.prototype.getY = function () {
  return this.container.y 
};
Button.prototype.setScale = function (newscale) {
  this.container.scaleX = newscale;
  this.container.scaleY = newscale;
};

Button.prototype.setVisible = function (visible) {
  this.container.visible = visible;
};
//#########################################################################################################################################
/**
 * Sets new state for button and updates images and text.
 * @private
 * @param {number} newState - new state value. Need to be one of this.states values.
 * @returns {boolean}
 */
Button.prototype.setState = function(newState) {
    if (this.currentState === newState) return false;
    this.currentState = newState;
    this.update();
    return true;
};
//#########################################################################################################################################
/**
 * Update button images and text style accordingly to current state.
 * @private
 */
Button.prototype.update = function() {
    this.buttonImages.forEach((image, index) => {
        if (index !== this.currentState && image !== null) {
            image.visible = false;
        }
    });

    if (this.buttonImages[this.currentState]) {
        this.buttonImages[this.currentState].visible = true;
    };

    if (this.textFontColors[this.currentState]) {
        this.buttonText.color = this.textFontColors[this.currentState];
    }
};
//#########################################################################################################################################
/**
 * Disable button. Disabled button is not interactive.
 * @public
 */
Button.prototype.disable = function() {
    this.setState(this.states.STATE_DISABLED);
    this.stopActivationAnimation();
};
//#########################################################################################################################################
/**
 * Enable button.
 * @public
 */
Button.prototype.enable = function() {
    let isStateUpdated = this.setState(this.states.STATE_NORMAL);
    if (this.activationEffect && isStateUpdated) {
        this.playActivationAnimation();
    }
};
//#########################################################################################################################################
/**
 * Adds listeners for passed event index.
 * @public
 * @param {number} eventId - index of event.
 * @param {function} callback - function which need to process event.
 * @param {object} callbackContext - scope for callback function.
 */
Button.prototype.addEventListener = function(eventId, callback, callbackContext) {
    if (!this.eventsCallbacks.hasOwnProperty(eventId)) {
        this.eventsCallbacks[eventId] = {
            "callback": callback,
            "context": callbackContext
        }
    }
};
//#########################################################################################################################################
/**
 * Removes button from stage and remove container interactivity.
 * @public
 */
Button.prototype.unload = function() {
    this.container.off("mousedown");
    this.container.off("pressup");

    s_oGameCon.removeChild(this.container);
};
//#########################################################################################################################################
/**
 * Creates bitmap with activation effect and add it to container. Button not always have activation effect,
 * so it not create activation effect in constructor.
 * @public
 * @param {HTMLImageElement} image - image with activation look.
 */
Button.prototype.setActivationEffect = function(image) {
    this.activationEffect = createBitmap(image);
    this.activationEffect.regX = this.width / 2;
    this.activationEffect.regY = this.height / 2;
    this.activationEffect.alpha = 0;
    this.container.addChild(this.activationEffect);
};
//#########################################################################################################################################
/**
 * Plays activation effect. It just blink with alpha couple of times.
 * @private
 */
Button.prototype.playActivationAnimation = function() {
    // HACK: I choose such bad implementation way because "loop" property in current CreateJS version can be only true/false.
    createjs.Tween.get(this.activationEffect).to({ alpha: 1 }, 250).call(() => {
        createjs.Tween.get(this.activationEffect).to({ alpha: 0 }, 250).call(() => {
            createjs.Tween.get(this.activationEffect).to({ alpha: 1 }, 250).call(() => {
                createjs.Tween.get(this.activationEffect).to({ alpha: 0 }, 250).call(() => {
                    createjs.Tween.get(this.activationEffect).to({ alpha: 1 }, 250).call(() => {
                        createjs.Tween.get(this.activationEffect).to({ alpha: 0 }, 250).call(() => {                    
                        });    
                    });          
                });    
            });
        });    
    });
};
//#########################################################################################################################################
/**
 * Stops all animation tweens for activation effect image and sets it "alpha" to 0.
 * @private
 */
Button.prototype.stopActivationAnimation = function() {
    if (this.activationEffect) {
        createjs.Tween.removeTweens(this.activationEffect);
        this.activationEffect.alpha = 0;
    }
};
