class Constant {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
     */
    constructor() {
        this.game = null;
        this.scaleFactor = null;
        this.isMobile = null;
        this.currentAspectRatio = null;
        this.originalAspectRatio = null;
        this.currentRatio = null;
        this.suffleDeck = null;
        // this.playerArray = [];
        this.platformUrl = "https://staginglocal.redappletech.com/poker-web/";
        this.SetLanguage();
    };

    SetLanguage() {
        this.ERROR_MSG_TEXT = "Sorry ! There are some value not found...";
        this.PLAY_TEXT = "PLAY";
        this.FOLD_TEXT = "FOLD";
        this.CALL_TEXT = "CALL";
        this.CHECK_TEXT = "CHECK";
        this.RAISE_TEXT = "RAISE";
        this.ALL_IN_TEXT = "ALL IN";

    };
};
let constant = new Constant();
export { constant as Constant };