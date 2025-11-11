class GameLogoView {
	constructor(scene) {
		this.scene = scene;
		// this.config = this.scene.cache.json.get("resolution-config").gameLogo;
		this.config = this.scene.cache.json.get("resolution-config");

		this.logo = null;

		this.create();
	};
	//#############################################################################################
	create() {
		this.logo = this.scene.add.spine(this.scene.scale.width / 2, 0, "title_art_spine");
		this.logo.play('animation', false, 1);
		this.leftCharacter = this.scene.add.spine(this.scene.scale.width / 2, 0, "left_character_spine");
		this.leftCharacter.play('animation', true);
		this.rightCharacter = this.scene.add.spine(this.scene.scale.width / 2, 0, "right_character_spine");
		this.rightCharacter.play('animation', true);
		this.leftFire = this.scene.add.spine(this.scene.scale.width / 2, 0, "fire_spine");
		this.leftFire.play('animation', true);
		this.rightFire = this.scene.add.spine(this.scene.scale.width / 2, 0, "fire_spine");
		this.rightFire.play('animation', true);

	};
	//#############################################################################################
	show() {
		this.logo.setVisible(true);
	};
	//#############################################################################################
	hide() {
		this.logo.setVisible(false)
	};
	//#############################################################################################
	resize(newWidth, newScale, newY) {
		this.logo.setScale(newScale);
		this.logo.setPosition(newWidth / 2, newY - this.config.gameLogo.y * newScale);

		this.leftCharacter.setScale(newScale);
		this.leftCharacter.setPosition(newWidth / 2 - this.config.leftCharacter.x * newScale, newY + this.config.leftCharacter.y * newScale);
		this.rightCharacter.setScale(newScale);
		this.rightCharacter.setPosition(newWidth / 2 + this.config.rightCharacter.x * newScale, newY + this.config.rightCharacter.y * newScale);

		this.leftFire.setScale(newScale);
		this.leftFire.setPosition(newWidth / 2 - this.config.leftFire.x * newScale, newY + this.config.leftFire.y * newScale);

		this.rightFire.setScale(newScale);
		this.rightFire.setPosition(newWidth / 2 + this.config.leftFire.x * newScale, newY + this.config.leftFire.y * newScale);
	};
}

export default GameLogoView;