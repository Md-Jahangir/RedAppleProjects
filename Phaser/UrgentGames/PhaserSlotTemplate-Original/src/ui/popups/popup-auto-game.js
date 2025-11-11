import PopupBase from "./popup-base";
import ValueSwitcher from "../value-switcher";
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
		this.contentConfig       = config.content;
	};
	//#############################################################################################
	/**
	 * 
	 */
	createContent() {
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

		this.contentMessage = this.scene.add.text(
			this.backgroundContainer.x + this.width / 2,
			this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.message.y,
			"Please choose how many games you want to play",
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
		this.scene.game.events.emit("evtAutoGameStarted", this.gamesCountSwitcher.getValue());
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
		this.contentTitle.destroy();
		this.contentMessage.destroy();
		this.gamesCountSwitcher.destroy();
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