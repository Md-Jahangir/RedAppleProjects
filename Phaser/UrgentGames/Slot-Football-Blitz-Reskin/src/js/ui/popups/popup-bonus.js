import PopupBase from "./popup-base";
import { Model } from "../../model";
import Button from "../button";

/**
 *
 */
class PopupBonus extends PopupBase {
    /**
     *
     * @param {*} scene
     * @param {*} id
     */
    constructor(scene, config, id, amount) {
        super(scene, config, id);

        this.bonusAmount = amount;
        this.contentTitle = null;
        this.contentMessage = null;
        this.contentCoins = null;
        this.contentCoinsAmount = null;

        this.bgImage = null;
        this.titleImage = null;
        this.baseSize = null;
        this.contentConfig = config.content;
    };
    //#############################################################################################
    /**
     *
     */
    createContent() {
        this.bgImage = this.scene.add.image(0, 0, "OptionPopupBase").setOrigin(0);
        this.titleImage = this.scene.add.image(0, 0, "Amazing!").setOrigin(0.5);
        this.closeButton = new Button(this.scene, "popup-accept", 0, 0);
        this.closeButton.setClickCallback(this.onClose, this);
        this.contentTitle = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.backgroundContainer.y + this.contentConfig.title.y,
            "Wow!", {
                fontFamily: "Bahnschrift Condensed",
                fontStyle: "bold",
                fontSize: this.contentConfig.title.fontSize,
                color: this.contentConfig.title.fontColor
            }
        ).setOrigin(0.5);
        this.contentTitle.visible = false;
        this.contentMessage = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.contentTitle.y + this.contentConfig.message.y,
            "You won bonus!", {
                fontFamily: "Bahnschrift Condensed",
                fontSize: this.contentConfig.message.fontSize,
                color: this.contentConfig.message.fontColor
            }
        ).setOrigin(0.5, 0);

        this.contentCoins = this.scene.add.image(this.backgroundContainer.x * this.width / 2, this.contentMessage.y + this.contentConfig.coins.y, "coins-heap");
        this.contentCoins.visible = false;
        this.contentCoinsAmount = this.scene.add.text(
            this.backgroundContainer.x * this.width / 2,
            this.contentCoins.y + this.contentConfig.coins.text.y,
            this.bonusAmount, {
                fontFamily: "Bahnschrift Condensed",
                fontStyle: "bold",
                shadow: {
                    offsetX: this.contentConfig.coins.text.shadowOffsetX,
                    offsetY: this.contentConfig.coins.text.shadowOffsetY,
                    color: "#313131",
                    fill: true
                },
                fontSize: this.contentConfig.coins.text.fontSize,
                color: this.contentConfig.coins.text.fontColor
            }
        ).setOrigin(0.5, 0);
    };
    //#############################################################################################
    /**
     *
     */
    onClose() {
        Model.setBonus(0);
        this.scene.game.events.emit("evtBonusPopupClosed");
        super.onClose();
    };
    //#############################################################################################
    /**
     *
     */
    destroyContent() {
        this.bgImage.destroy();
        this.titleImage.destroy();
        this.closeButton.destroy();

        this.contentTitle.destroy();
        this.contentMessage.destroy();
        this.contentCoins.destroy();
        this.contentCoinsAmount.destroy();
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
            this.backgroundContainer.y + this.contentConfig.close.y * newScale,
        );
        this.bgImage.setScale(newScale);
        this.bgImage.setPosition(
            newWidth / 2 - this.bgImage.displayWidth + this.contentConfig.background.x * newScale,
            newHeight / 2 - this.bgImage.displayHeight + this.contentConfig.background.y * newScale,
        );

        this.contentTitle.setScale(newScale);
        this.contentTitle.setPosition(this.backgroundContainer.x + (this.width * newScale) / 2, this.backgroundContainer.y + this.contentConfig.title.y * newScale);

        this.contentMessage.setScale(newScale);
        this.contentMessage.setPosition(this.backgroundContainer.x + (this.width * newScale) / 2, this.contentTitle.y + this.contentConfig.message.y * newScale);

        this.contentCoins.setScale(newScale);
        this.contentCoins.setPosition(this.backgroundContainer.x + (this.width * newScale) / 2, this.contentMessage.y + this.contentConfig.coins.y * newScale);

        this.contentCoinsAmount.setScale(newScale);
        this.contentCoinsAmount.setPosition(this.backgroundContainer.x + (this.width * newScale) / 2, this.contentCoins.y + this.contentConfig.coins.text.y * newScale);
    };
}

export default PopupBonus;