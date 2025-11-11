
class Symbol {
	constructor(scene, x, y, id, mask) {
		this.scene = scene;
		this.id = id;
		this.x = x;
		this.y = y;
		this.initialY = null;
		this.mask = mask;
		this.usualImg = null;
		this.winAnim = null;
		// this.spinAnim = null;
		this.initialTween = null;
		this.create(x, y);
		this.scene.game.events.on("evtSpinStart", this.stopWin, this);
	};

	create(x, y) {
		this.payline = this.scene.add.spine(this.x, this.y, "animation-payline");
		this.payline.setVisible(false);
		this.usualImg = this.scene.add.image(this.x, this.y, "symbol-" + this.id);
		this.usualImg.setMask(this.mask)
		this.winAnim = this.scene.add.spine(this.x, this.y, "animation-symbol-bear", "animation", true);
		this.winAnim.setVisible(false);
	};
	setY(y) {
		this.y = y;
		this.usualImg.y = y;
	}
	setInitialY(y) {
		this.initialY = y;
	}
	getId() {
		return this.id;
	};
	setId(id) {
		this.id = id;
	};

	getWidth() {
		return this.usualImg.displayWidth;
	};

	getHeight() {
		return this.usualImg.displayHeight;
	};

	getPosition() {
		return this.usualImg.getCenter();
	};
	getSpineid() {
		return this.id;
	}

	setScale(newScale) {
		this.payline.setScale(newScale);
		this.usualImg.setScale(newScale);
		this.winAnim.setScale(newScale);
	};

	setPosition(newX, newY) {
		this.payline.setPosition(newX, newY);
		this.usualImg.setPosition(newX, newY);
		this.winAnim.setPosition(newX, newY);
	};

	playSpin() {
	};

	stopSpin() {
		this.payline.setVisible(false);
		this.winAnim.setVisible(false);
		this.usualImg.setVisible(true);
	};

	setSymbol(id) {
		this.id = id;
		this.usualImg.setTexture("symbol-" + this.id);
		this.usualImg.id = this.id;
		this.x = this.usualImg.x;
		this.y = this.usualImg.y;
	};

	playWin(id, x, y) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.usualImg.setVisible(false);
		this.winAnim.setVisible(true);
		this.payline.setVisible(true)
		this.winAnim.setPosition(this.x, this.y);
		let skeletonKey = `animation-symbol-${this.id}`;
		this.winAnim.setSkeleton(skeletonKey);
		this.winAnim.play("animation", false);

	}

	stopWin() {
		this.usualImg.setVisible(true);
		this.winAnim.setVisible(false);
		this.winAnim.play('animation', false);
	}
	playPayline() {
		this.payline.setVisible(true);
		this.payline.play('animation', false);
		this.payline.once('complete', () => {
			this.payline.setVisible(false);
		})
	}
	stopPayline() {
		this.payline.setVisible(false);
		this.payline.play('animation', false);
	}
}

export default Symbol;