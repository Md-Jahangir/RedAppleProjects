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

		this.customDescriptionsRegular = {
			"Wild": "Substitutes for all symbols except Bonus an Free Spin",
			"Bonus": "3 or more will give you a bonus",
			"Free Spin": "3 or more will start Free Spins"
		}
		this.customDescriptionsFeature = {
			"Wild": "Substitutes for all symbols. Will be held in place for remaining free spins"
		};
		
		this.contentConfig  = config.content;
		this.scrollerConfig = this.scene.cache.json.get("resolution-config").pageScroller;
	};
	//#############################################################################################
	/**
	 * 
	 */
	createContent() {
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

		this.scroller = new PageScroller(this.scene, this.scrollerConfig).create(
			this.backgroundContainer.x + this.scrollerConfig.x,
			this.backgroundContainer.y + this.scrollerConfig.y,
		);

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
		paytable.forEach((data, index) => {
			// new column
			if (index % 2 === 0 && index !== 0) {
				commonWidth += columnWidth;
				columnWidth = 0;
				commonHeight = 0;
			};
			let descriptionText = this.getCustomDescription(data);
			let item = new PaytableCell(this.scene, stepX + commonWidth, stepY + commonHeight, data, descriptionText);
			this.scroller.addItem(item.getContainer());
			commonHeight += stepY + item.getHeight();
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

		this.scroller.setScale(newScale);
		this.scroller.setPosition(
			this.backgroundContainer.x + this.scrollerConfig.x * newScale,
			this.backgroundContainer.y + this.scrollerConfig.y * newScale,
		);
	};
}

export default PopupPaytable;