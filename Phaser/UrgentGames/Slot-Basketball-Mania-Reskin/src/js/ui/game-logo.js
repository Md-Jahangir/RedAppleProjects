class GameLogoView {
    constructor(scene) {
        this.scene = scene;
        this.config = this.scene.cache.json.get("resolution-config").gameLogo;

        this.background = null;

        this.create();
    };
    //#############################################################################################
    create() {
        this.background = this.scene.add.image(this.scene.scale.width / 2, 0, "game-logo");
    };
    //#############################################################################################
    show() {
        this.background.setVisible(true);
    };
    //#############################################################################################
    hide() {
        this.background.setVisible(false)
    };
    //#############################################################################################
    resize(newWidth, newScale, newY) {
        this.background.setScale(newScale);
        this.background.setPosition(newWidth / 1.98, newY + this.config.y * newScale);
    };
}

export default GameLogoView;