class Background {
	constructor(scene) {
		this.scene = scene;
		this.background = this.scene.add.image(0, 0, "background").setOrigin(0);
	};

	resize(newWidth, newHeight) {
		let scaleX = newWidth / this.background.width;
		let scaleY = newHeight / this.background.height;
		let totalScale = scaleX > scaleY ? scaleX : scaleY;
		this.background.setScale(totalScale);
	};
}

export default Background;