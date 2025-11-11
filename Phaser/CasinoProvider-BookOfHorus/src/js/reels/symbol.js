
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
		this.initialTween = null;
		this.create(x, y);
		this.scene.game.events.on("evtSpinStart", this.stopWin, this);
		this.scene.game.events.on("evtForceFullyStopAnimations", this.stopWin, this);
	};

	create(x, y) {
		this.usualImg = this.scene.add.image(this.x, this.y, "symbol-" + this.id);
		this.usualImg.setMask(this.mask)
		this.usualImg.setVisible(true);
		this.winShadowAnim = this.scene.add.spine(this.x, this.y, "animation-payline");
		this.winShadowAnim.setVisible(false);
		this.winAnim = this.scene.add.spine(this.x, this.y, "animation-symbol-a");
		this.winAnim.setVisible(false);
	};
	setY(y) {
		this.y = y;
		this.usualImg.y = y;
		this.winAnim.y = y;
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
		this.usualImg.setScale(newScale);
		this.winShadowAnim.setScale(newScale);
		this.winAnim.setScale(newScale);

	};

	setPosition(newX, newY) {
		this.usualImg.setPosition(newX, newY);
		this.winShadowAnim.setPosition(newX, newY);
		this.winAnim.setPosition(newX, newY);
	};

	stopSpin() {
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
		this.winAnim.setPosition(this.x, this.y);
		let skeletonKey = `animation-symbol-${this.id}`;
		this.winAnim.setSkeleton(skeletonKey);
		this.winAnim.play("animation", false);

	}
	playShadowWin(id, x, y) {
		this.winShadowAnim.setVisible(true);
		this.winShadowAnim.play('animation', false);
		this.winShadowAnim.once('complete', () => {
			this.winShadowAnim.setVisible(false);
		})
	}
	stopWin() {
		this.usualImg.setVisible(true);
		this.winAnim.setVisible(false);
		this.winAnim.play('animation', false, 1);
	}
	stopShadowWin() {
		this.winShadowAnim.setVisible(false);
		this.winShadowAnim.play('animation', false);
	}
}

export default Symbol;