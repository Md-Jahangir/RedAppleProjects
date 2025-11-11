import PopupBase from "./popup-base";
import { Model } from "../../model";
import PageScroller from "../page-scroller";
import PaytableCell from "../paytable-cell";

/**
 *
 */
class PopupPaytable extends PopupBase {
	/**
	 *
	 * @param {*} scene
	 * @param {*} id
	 */
	constructor(scene, config, id, isRegular = true) {
		super(scene, config, id);

		this.isRegular = isRegular;

		this.contentTitle = null;
		this.scroller     = null;
		this.items        = [];
		this.popBg				 = null;// new bg for teh pop up
		//
		this.topLogo = null;
		this.bottomLogo = null;
		this.bottomText = null;
		//
		this.customDescriptionsRegular = {
			"Wild": "Substitutes for all symbols except Bonus an Free Spin",
			"Bonus": "3 or more will give you a bonus",
			"Free Spin": "3 or more will start Free Spins"
		}
		this.customDescriptionsFeature = {
			"Wild": "Substitutes for all symbols. Will be held in place for remaining free spins"
		};

		this.contentConfig  = config.content;
		console.log("this.contentConfig ",this.contentConfig);
		this.scrollerConfig = this.scene.cache.json.get("resolution-config").pageScroller;
	};
	//#############################################################################################
	/**
	 *
	 */
	createContent() {
		this.popBg = this.scene.add.image(0, 0, "pop-bg-1").setOrigin(0);
		this.contentTitle = this.scene.add.text(
			this.backgroundContainer.x + this.width / 2,
			this.backgroundContainer.y + this.contentConfig.title.y,
			this.isRegular ? "Regular Game Paytable" : "Free Game Paytable",
			{
				fontFamily: "Bahnschrift Condensed",
				fontStyle: "bold",
				fontSize: this.contentConfig.title.fontSize,
				color: this.contentConfig.title.fontColor
			}
		).setOrigin(0.5);
		this.contentTitle.visible = false;
		this.scroller = new PageScroller(this.scene, this.scrollerConfig).create(
			this.backgroundContainer.x + this.scrollerConfig.x,
			this.backgroundContainer.y + this.scrollerConfig.y,
		);
		this.topLogo  = this.scene.add.image(0,0,     "popUp-logo-top").setOrigin(0.5);
		this.bottomLogo  = this.scene.add.image(0,0, "popUp-logo-bottom").setOrigin(0.5);
		this.bottomText  = this.scene.add.image(0,0, "popUp-text").setOrigin(0.5);
		this.createPaytableCells();
	};
	//#############################################################################################
	createPaytableCells() {

		let paytable = this.isRegular ? Model.getRegularPaytable() : Model.getFeaturePaytable();
		let stepX = this.scrollerConfig.content.stepX;
		let stepY = this.scrollerConfig.content.stepY;
		let commonWidth = 0;
		let commonHeight = 0;
		let columnWidth = 0;
		console.log("paytable ",paytable);
		paytable.forEach((data, index) => {
			// new column
			// if (index % 2 === 0 && index !== 0) {
				console.log("index "+index);
				if (index % 3 === 0 && index !== 0) {
				commonWidth += columnWidth;
				columnWidth = 0;
				commonHeight = 0;
			};
			let descriptionText = this.getCustomDescription(data);
			let item = new PaytableCell(this.scene, stepX + commonWidth, stepY + commonHeight, data, descriptionText);
			this.scroller.addItem(item.getContainer());
			commonHeight += (stepY + item.getHeight())/2;
			columnWidth = stepX + item.getWidth();
		});
	};
	//#############################################################################################
	getCustomDescription(data) {
		let symbol = data.symbol;
		let descriptions = this.isRegular ? this.customDescriptionsRegular : this.customDescriptionsFeature;
		if (descriptions.hasOwnProperty(symbol)) {
			return descriptions[symbol];
		}
		return "";
	};
	//#############################################################################################
	/**
	 *
	 */
	destroyContent() {
		this.contentTitle.destroy();
		this.scroller.destroy();
		this.popBg.destroy();
		this.topLogo.destroy();
		this.bottomLogo.destroy();
		this.bottomText.destroy();
	};
	//#############################################################################################
	/**
	 *
	 * @param {*} newWidth
	 * @param {*} newHeight
	 * @param {*} newScale
	 */
	resizeContent(newWidth, newHeight, newScale) {
		this.contentTitle.setScale(newScale);
		this.contentTitle.setPosition(this.backgroundContainer.x + (this.width * newScale) / 2, this.backgroundContainer.y + this.contentConfig.title.y * newScale);
		this.popBg.setScale(newScale,newScale);
		// this.popBg.setScale(newScale * 1.2,newScale * 1.5);
		this.popBg.setPosition(
			newWidth/2 - this.popBg.displayWidth  + this.contentConfig.background.x * newScale,
			newHeight/2 - this.popBg.displayHeight  + this.contentConfig.background.y * newScale,
		);
		this.scroller.setScale(newScale);
		this.scroller.setPosition(
			this.backgroundContainer.x + this.scrollerConfig.x * newScale,
			this.backgroundContainer.y + this.scrollerConfig.y * newScale,
		);
		this.topLogo.setScale(newScale);
		this.bottomLogo.setScale(newScale);
		this.bottomText.setScale(newScale);
console.log("this.config ",this.config);
		// this.topLogo.setPosition(newWidth/2 - this.topLogo.displayWidth + this.config.topLogo.x,newHeight/2 - this.topLogo.displayHeight + this.config.topLogo.y);
		// this.bottomLogo.setPosition(newWidth/2 - this.bottomLogo.displayWidth + this.config.bottomLogo.x,newHeight/2 - this.bottomLogo.displayHeight + this.config.bottomLogo.y);
		// this.bottomText.setPosition(newWidth/2 - this.bottomText.displayWidth + this.config.bottomText.x,newHeight/2 - this.bottomText.displayHeight + this.config.bottomText.y);
		this.topLogo.setPosition( (this.width * newScale) / 1.3 - (this.bottomLogo.displayWidth * newScale),(this.height * newScale) / 5.8);
				this.bottomLogo.setPosition(newWidth/2 - (this.bottomLogo.displayWidth * newScale)/10 ,newHeight - (this.bottomLogo.displayHeight * newScale)/2.3);
				this.bottomText.setPosition(newWidth/2 - (this.bottomText.displayWidth * newScale)/25 ,newHeight - (this.bottomText.displayHeight * newScale)*2.5);

	};
}

export default PopupPaytable;
