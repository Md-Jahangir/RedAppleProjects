import PopupBase from "./popup-base";
import ValueSwitcher from "../value-switcher";
import Button from "../button";
import { Model } from "../../model";
/**
 *
 */
class PopupAutoGame extends PopupBase {
	/**
	 *
	 * @param {*} scene
	 * @param {*} id
	 */
	constructor(scene, config, id) {
		super(scene, config, id);

		this.contentTitle        = null;
		this.contentMessage      = null;
		this.gamesCountSwitcher  = null;
		this.closeButton = null;
    this.bgImage = null;
    this.titleImage = null
		this.contentConfig       = config.content;
	};
	//#############################################################################################
	/**
	 *
	 */
	createContent() {
		this.bgImage = this.scene.add.image(0, 0, "OptionPopupBase").setOrigin(0);
        		this.titleImage = this.scene.add.image(0, 0, "AutoGame").setOrigin(0.5);
        		this.closeButton = new Button(this.scene, "popup-close", 0, 0);
            this.closeButton.setClickCallback(this.onClose, this);
        		this.baseSize = this.bgImage.displayWidth;

		this.contentTitle = this.scene.add.text(
			this.backgroundContainer.x + this.width / 2,
			this.backgroundContainer.y + this.contentConfig.title.y,
			"Auto Game",
			{
				fontFamily: "Bahnschrift Condensed",
				fontStyle: "bold",
				fontSize: this.contentConfig.title.fontSize,
				color: this.contentConfig.title.fontColor
			}
		).setOrigin(0.5, 0);
	this.contentTitle.visible=false;
		this.contentMessage = this.scene.add.text(
			this.backgroundContainer.x + this.width / 2,
			this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.message.y,
			"GAMES COUNT",
			{
				fontFamily: "Bahnschrift Condensed",
				fontSize: this.contentConfig.message.fontSize,
				color: this.contentConfig.message.fontColor,
				align: "center",
				wordWrap: {
					width: this.contentConfig.message.wordWrap,
				}
			}
		).setOrigin(0.5, 0);

		this.gamesCountSwitcher = new ValueSwitcher(
			this.scene,
			this.backgroundContainer.x,
			this.backgroundContainer.y + this.contentConfig.gamesCount.y,
			[5, 10, 15, 20, 25],
			{
				decrementImg: "minus-button",
				incrementImg: "plus-button",
				configId: "autoGameValues"
			},
			""
		);
	};
	//#############################################################################################
	/**
	 *
	 */
	onAccept() {
		// this.scene.game.events.emit("evtAutoGameStarted", this.gamesCountSwitcher.getValue());
	 if((this.gamesCountSwitcher.getValue()*this.scene.bottomPanel.betsSwitcher.valueMultiplier)>
	 parseInt(Model.getBalance()))
			 {
					 // this.scene.bottomPanel.maxButton.disable();
		 // this.scene.bottomPanel.autoButton.disable();
		 // this.scene.bottomPanel.spinButton.disable();
			 }
			 else
			 {
					 // this.scene.bottomPanel.scene.maxButton.enable();
					 // this.scene.bottomPanel.scene.autoButton.enable();
					 // this.scene.bottomPanel.scene.spinButton.enable();
							this.scene.game.events.emit("evtAutoGameStarted", this.gamesCountSwitcher.getValue());
			 }
		// this.scene.game.events.emit("evtAutoGameStarted", this.gamesCountSwitcher.getValue());
		super.destroy();
	};
	//#############################################################################################
	onDecline() {
		super.destroy();
	}
	//#############################################################################################
	/**
	 *
	 */
	destroyContent() {
		this.bgImage.destroy();
		 this.titleImage.destroy();
		this.contentTitle.destroy();
		this.contentMessage.destroy();
		this.gamesCountSwitcher.destroy();
		   this.closeButton.destroy();
	};
	//#############################################################################################
	/**
	 *
	 * @param {*} newWidth
	 * @param {*} newHeight
	 * @param {*} newScale
	 */
	resizeContent(newWidth, newHeight, newScale) {
		this.titleImage.setScale(newScale);
					this.titleImage.setPosition(
				this.backgroundContainer.x + this.contentConfig.titleImage.x * newScale,
				this.backgroundContainer.y + this.contentConfig.titleImage.y * newScale,
			);
			this.closeButton.setScale(newScale);
					this.closeButton.setPosition(
				this.backgroundContainer.x + this.contentConfig.close.x * newScale,
				this.backgroundContainer.y - this.contentConfig.close.y * newScale,
			);
			this.bgImage.setScale(newScale);
			this.bgImage.setPosition(
				newWidth/2 - this.bgImage.displayWidth  + this.contentConfig.background.x * newScale,
				newHeight/2 - this.bgImage.displayHeight  + this.contentConfig.background.y * newScale,
			);
		this.contentTitle.setScale(newScale);
		this.contentTitle.setPosition(
			this.backgroundContainer.x + (this.width * newScale) / 2,
			this.backgroundContainer.y + this.contentConfig.title.y * newScale
		);

		this.contentMessage.setScale(newScale);
		this.contentMessage.setPosition(
			this.backgroundContainer.x + (this.width * newScale) / 2,
			this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.message.y * newScale
		);

		this.gamesCountSwitcher.resize(newWidth, newHeight);
		this.gamesCountSwitcher.setPosition(
			this.backgroundContainer.x + (this.width * newScale) / 2,
			this.contentMessage.y + this.contentMessage.displayHeight + this.contentConfig.gamesCount.y * newScale
		);
	};
}

export default PopupAutoGame;
