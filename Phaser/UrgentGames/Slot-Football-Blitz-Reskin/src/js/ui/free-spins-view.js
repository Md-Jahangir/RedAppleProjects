class FreeSpinsView {
    constructor(scene) {
        this.scene = scene;

        this.background = null;
        this.gamesLeftBackground = null;
        this.multiplierBackground = null;

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
        this.background = this.scene.add.image(0, 0, "free-spins-bg");
        this.gamesLeftBackground = this.scene.add.image(0, 0, "games-left-bg");
        this.multiplierBackground = this.scene.add.image(0, 0, "multiplied-bg");
        this.gamesLeftText = this.scene.add.text(
            0,
            0,
            "0", {
                fontFamily: "Arial",
                fontStyle: "bold",
                fontSize: this.config.gamesLeft.fontSize,
                color: this.config.gamesLeft.fontColor
            }
        ).setOrigin(0.5);
        this.multiplierText = this.scene.add.text(
            0,
            0,
            "x1", {
                fontFamily: "Arial",
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
        this.background.setVisible(true);
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
        this.background.setVisible(false);
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
        this.multiplierText.setText(multiplierValue);
    };
    //#############################################################################################
    resize(newWidth, newScale, newX, newY, reelsWidth) {
        this.background.setScale(newScale);
        this.background.setPosition(newWidth / 2, newY - this.config.y * newScale);

        this.gamesLeftBackground.setScale(newScale);
    
        this.gamesLeftBackground.setPosition(
            (newWidth + reelsWidth) / 2 - this.gamesLeftBackground.displayWidth * 2.5,
            newY - this.config.gamesLeft.y * newScale
        );
        this.gamesLeftText.setScale(newScale);
        this.gamesLeftText.setPosition(
            this.gamesLeftBackground.x,
            this.gamesLeftBackground.y + this.config.gamesLeft.textY * newScale
        );

        this.multiplierBackground.setScale(newScale);
       
        this.multiplierBackground.setPosition(
            newX + this.multiplierBackground.displayWidth * 2.5,
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