class GameLogoView {
	constructor(scene) {
		this.scene = scene;
		// this.config = this.scene.cache.json.get("resolution-config").gameLogo;
		this.config = this.scene.cache.json.get("resolution-config");

		this.background = null;
		this.background2 = null;

		this.create();
	};
	create() {
		this.logo = this.scene.add.spine(this.scene.scale.width / 2, 0, "title_art_animation");
		this.logo.play('appear', false);
		this.logo.once('complete', () => {
			this.logo.play('idle', true);
		})
	};
	show() {
		this.logo.setVisible(true);
	};
	hide() {
		this.logo.setVisible(false)
	};
	resize(newWidth, newScale, newY) {
		// this.logo.setScale(newScale);
		this.logo.setScale(newScale * 0.7);
		this.logo.setPosition(newWidth / 2 - this.config.gameLogo.x, newY - this.config.gameLogo.y * newScale);
	};
}

export default GameLogoView;