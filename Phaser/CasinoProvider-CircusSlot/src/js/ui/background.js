class Background {
	constructor(scene) {
		this.scene = scene;
		this.background = this.scene.add.spine(0, 0, 'animation-bg');//this.scene.add.image(0, 0, "background").setOrigin(0);
		this.background.play('animation', true);
	};

	resize(newWidth, newHeight) {
		let scaleX = newWidth / this.background.width;
		let scaleY = newHeight / this.background.height;
		let totalScale = scaleX > scaleY ? scaleX : scaleY;
		this.background.setPosition(newWidth / 2, newHeight / 2);
	};
}

export default Background;