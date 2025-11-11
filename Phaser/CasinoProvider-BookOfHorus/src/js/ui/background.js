import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
class Background {
	constructor(scene) {
		this.scene = scene;
		this.config = this.scene.cache.json.get("resolution-config");
		this.background = this.scene.add.image(0, 0, "background").setOrigin(0);
	};

	resize(newWidth, newHeight) {
		// let scaleX = newWidth / this.background.width;
		// let scaleY = newHeight / this.background.height;
		// let totalScale = Math.min(scaleX, scaleY);//scaleX > scaleY ? scaleX : scaleY;
		// this.background.setScale(totalScale);
		this.background.setDisplaySize(newWidth, newHeight);
	};
}

export default Background;