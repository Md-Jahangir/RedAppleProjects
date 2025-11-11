class GameLogoView {
	constructor(scene) {
		this.scene = scene;
		this.config = this.scene.cache.json.get("resolution-config").gameLogo;
		
		this.background = null;
		this.background2 = null;

		this.create();
	};
	//#############################################################################################
	create() {
		this.background = this.scene.add.image(this.scene.scale.width / 2, 0, "game-logo");
// this.background2 = this.scene.add.image(this.scene.scale.width / 2, 0, "game-logo");
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
		this.background.setScale(newScale * 0.5);
// this.background2.setScale(newScale * 0.5);
		this.background.setPosition(newWidth / 2 - this.config.x * newScale, newY - this.config.y * newScale);
		// this.background.setPosition(newWidth / 2 - this.config.x * newScale, newY - this.config.y * newScale);
// this.background2.setPosition(newWidth / 2 + this.config.x * newScale, newY - this.config.y * newScale);
		// this.background.setPosition(newWidth / 2, newY - this.config.y * newScale);
	};
}

export default GameLogoView;