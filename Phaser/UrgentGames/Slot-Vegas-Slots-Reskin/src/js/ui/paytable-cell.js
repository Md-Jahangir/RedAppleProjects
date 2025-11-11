class PaytableCell {
	constructor(scene, x, y, data, descriptionText = "") {
		this.scene  = scene;
		this.elemX  = x;
		this.elemY  = y;
		this.data   = data;		
		this.config = this.scene.cache.json.get("resolution-config").paytableCell;

		this.description = descriptionText;
		
		this.width  = this.config.width;
		this.height = this.config.height;

		this.container          = null;
		this.background         = null
		this.paytableAmount     = [];
		this.paytableMultiplier = [];
		this.symbolImg          = null;
		this.symbolShine        = null;
		this.symbolDescription  = null;

		this.create();
	};

	create() {
		this.container = this.scene.add.container(this.elemX, this.elemY);
		this.background = this.scene.add.image(0, 0, "paytable-cell").setOrigin(0);
		this.background.visible = false;
		// if (this.description !== "") {
		// 	this.symbolDescription = this.scene.add.text(
		// 		this.background.x + this.background.displayWidth / 2,
		// 		this.background.y + this.config.description.y,
		// 		this.description,
		// 		{
		// 			fontFamily: "Bahnschrift Light",
		// 			fontStyle: "Condensed",
		// 			fontSize: this.config.description.fontSize,
		// 			color: "#ffffff",
		// 			align: "center",
		// 			wordWrap: {
		// 				width: this.config.description.wordWrap
		// 			}
		// 		}
		// 	).setOrigin(0.5, 0);
		// 	this.symbolDescription.visi
		// }

		let descriptionBottomY = this.symbolDescription ? this.symbolDescription.y + this.symbolDescription.displayHeight : 0;

		let symbolY = descriptionBottomY + (this.background.displayHeight - descriptionBottomY) / 2
		this.symbolImg = this.scene.add.image(this.config.symbol.x, symbolY, "symbol-" + this.data.symbol);

		// this.symbolShine = this.scene.add.image(this.background.x, this.background.y + this.background.displayHeight / 2, "paytable-cell-shine").setOrigin(0, 0.5);

		this.container.add([this.background, this.symbolImg]);
		// this.container.add([this.background, this.symbolShine, this.symbolImg]);
		if (this.symbolDescription) this.container.add(this.symbolDescription);

		this.createTable();
		this.container.add(this.paytableAmount);
		this.container.add(this.paytableMultiplier);
	};

	createTable() {
		let values = this.data.paytable;
		for (let i = values.length - 1; i >= 0; i--) {
			if (values[i] > 0) {
				this.createRow(i, values[i]);
			}
		};
		this.arrangeTable();
	};

	createRow(count, multiplier) {
		let countText = this.scene.add.text(
			0,
			0,
			"x" + count,
			{
				fontFamily: "Bahnschrift Condensed",
				fontStyle: "Bold",
				fontSize: this.config.values.counter.fontSize,
				color: this.config.values.counter.fontColor,
				shadow: {
					offsetX: this.config.values.counter.shadowOffsetX,
					offsetY: this.config.values.counter.shadowOffsetY,
					color: "#313131",
					fill: true
				},
			}
		);
		this.paytableAmount.push(countText);

		let multiplierText = this.scene.add.text(
			0,
			0,
			"- " + multiplier,
			{
				fontFamily: "Bahnschrift Condensed",
				fontSize: this.config.values.multiplier.fontSize,
				color: this.config.values.multiplier.fontColor
			}
		);
		this.paytableMultiplier.push(multiplierText);
	};

	arrangeTable() {
		let commonHeight = 0;
		this.paytableAmount.forEach((elem) => {
			commonHeight += elem.displayHeight;
		});
		commonHeight += (this.paytableAmount.length - 1) * this.config.values.stepY;

		let startY = this.symbolImg.y - commonHeight / 2;
		let startX = this.config.values.x;
		let currentY = startY;
		console.log("startY "+startY+" currentY "+currentY);
		this.paytableAmount.forEach((elem) => {
			elem.setPosition(
				startX,
				currentY 
			);
			currentY += elem.displayHeight + this.config.values.stepY;
		});

		this.paytableMultiplier.forEach((elem, index) => {
			elem.setPosition(
				this.paytableAmount[index].x + this.config.values.multiplier.stepX,
				this.paytableAmount[index].y
			);
		});
	};

	getContainer() {
		return this.container;
	};

	getWidth() {
		return this.width;
	};

	getHeight() {
		return this.height;
	};

	setPosition(newX, newY) {
		this.container.setPosition(newX, newY);
	};

	destroy() {
		this.background.destroy();
		this.symbolImg.destroy();
		this.container.destroy();
	};
}

export default PaytableCell;