/**
 * Error popup. Serve to show errors messages to player with further actions.
 * @class
 */
class ErrorPopup {
    /**
     * @constructor
     * @returns {ErrorPopup}
     */
    constructor() {
        /**
         * Popup's container.
         * @type {createjs.Container}
         */
        this.container = null;
        /**
         * X position of popup.
         * @type {number}
         */
        this.x = 0;
        /**
         * Y position of popup.
         * @type {number}
         */
        this.y = 0;
        /**
         * Width of popup's background. Used as width of whole popup.
         * @type {number}
         */
        this.width = 0;
        /**
         * Height of popup's background. Used as height of whole popup.
         * @type {number}
         */
        this.height = 0;
        /**
         * Semitransparent overlay image.
         * @type {createjs.Bitmap}
         */
        this.overlay = null;
        /**
         * Background image.
         * @type {createjs.Bitmap}
         */
        this.background = null;
        /**
         * Title text objext.
         * @type {createjs.Text}
         */
        this.title = null;
        /**
         * Description text object.
         * @type {createjs.Text}
         */
        this.description = null;
        /**
         * Action button.
         * @type {CTextButton}
         */
        this.button = null;
        /**
         * Callback called when actin button clicked by player.
         * @type {function|null}
         */
        this.actionCallback = null;
        /**
         * Scope for action button's callback.
         * @type {Object}
         */
        this.actionCallbackScope = this;

        return this;
    };
    //#####################################################################################################################################
    /**
     * Creates all stuff for popup like background, title etc.
     * @public
     * @returns {ErrorPopup}
     */
    create() {
        this.container = new createjs.Container();
        s_oStage.addChild(this.container);

        this.createOverlay();
        this.createBackground();
        this.createTitle();
        this.createDescription();
        this.createButton();

        this.hide();

        return this;
    };
    //#####################################################################################################################################
    /**
     * Creates semitransparent overlay under popup.
     * @private
     */
    createOverlay() {
        this.overlay = createBitmap(s_oSpriteLibrary.getSprite('message-box-overlay'));
        let bounds = this.overlay.getBounds();
        let scaleX = CANVAS_WIDTH / bounds.width;
        let scaleY = CANVAS_HEIGHT / bounds.height;
        this.overlay.set({ scaleX: scaleX, scaleY: scaleY });
        this.overlay.on("pressup", () => { });
        this.container.addChild(this.overlay);
    };
    //#####################################################################################################################################
    /**
     * Creates background and add it to popup's container. Fill x/y properties and calculates width/height properties.
     * @private
     */
    createBackground() {
        this.background = createBitmap(s_oSpriteLibrary.getSprite('message-box'));
        this.container.addChild(this.background);
        let bounds = this.background.getBounds();
        this.x = (CANVAS_WIDTH - bounds.width) / 2;
        this.y = (CANVAS_HEIGHT - bounds.height) / 2;
        this.width = bounds.width;
        this.height = bounds.height;
        this.background.set({ x: this.x, y: this.y });
    };
    //#####################################################################################################################################
    /**
     * Creates action button which call external callback when clicked.
     * @private
     */
    createButton() {
        this.button = new CTextButton(this.x + this.width / 2 - 60, this.y + this.height - 200, s_oSpriteLibrary.getSprite('but_game_bg'), "# Action #", FONT_GAME_1, "#fff", 20, this.container);
        this.button.addEventListener(ON_MOUSE_UP, this.onAction, this);
        this.container.addChild(this.button.getButtonImage());
    };
    //#####################################################################################################################################
    /**
     * Creates title text which contain short error name or type.
     * @private
     */
    createTitle() {
        this.title = new createjs.Text("# Title #", 40 + "px " + FONT_GAME_1, "#2d2d2d");
        this.title.textBaseline = "middle";
        this.title.textAlign = "center";
        this.title.set({ x: this.x + this.width / 2 - 65, y: this.y + 130 });
        this.container.addChild(this.title);
    };
    //#####################################################################################################################################
    /**
     * Creates description text which contain rather long and understandable description of error.
     * @private
     */
    createDescription() {
        this.description = new createjs.Text("# Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. #", 20 + "px " + FONT_GAME_1, "#ffffff");
        this.description.textBaseline = "middle";
        this.description.textAlign = "center";
        this.description.lineWidth = 550;
        this.description.lineHeight = 25;
        this.description.set({ x: this.x + this.width / 2 - 65, y: this.y + 190 });
        this.container.addChild(this.description);
    };
    //#####################################################################################################################################
    /**
     * Hides popup.
     * @public
     */
    hide() {
        this.container.visible = false;
    };
    //#####################################################################################################################################
    /**
     * Shows popups with passed messages, and sets callback for action button.
     * @public
     * @param {object} data - object with text for title, description and button.
     * @param {function} action - callback for action button.
     * @param {object} actionScope - scope for callback.
     */
    show(data, action, actionScope) {
        this.title.text = data.title;
        this.description.text = data.description;
        this.button.changeText(data.button);
        this.actionCallback = action;
        this.actionCallbackScope = actionScope;

        this.container.visible = true;
    };
    //#####################################################################################################################################
    /**
     * Hides popup, and calls external callback if it existed.
     * @private
     */
    onAction() {
        this.hide();
        if (this.actionCallback) {
            this.actionCallback.call(this.actionCallbackScope);
        }
    };
}