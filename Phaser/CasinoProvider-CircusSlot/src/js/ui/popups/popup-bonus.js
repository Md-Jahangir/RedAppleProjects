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
        this.contentCoinsAmount = null;
        this.closeButton = null;
        this.bgImage = null;
        this.contentConfig = config.content;
    };
    //#############################################################################################
    /**
     * 
     */
    createContent() {
        this.bgImage = this.scene.add.image(0, 0, "auto_popup_frame").setOrigin(0);

        this.logo = this.scene.add.image(0, 0, "game_logo").setOrigin(0.5);

        this.contentTitle = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.backgroundContainer.y + this.contentConfig.title.y,
            "Wow !", {
            fontFamily: "framd",
            fontStyle: "bold",
            fontSize: this.contentConfig.title.fontSize,
            color: this.contentConfig.title.fontColor
        }
        ).setOrigin(0.5);

        this.contentMessage = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.contentTitle.y + this.contentConfig.message.y,
            "You won bonus!", {
            fontFamily: "framd",
            fontSize: this.contentConfig.message.fontSize,
            color: this.contentConfig.message.fontColor
        }
        ).setOrigin(0.5, 0);

        this.contentCoinsAmount = this.scene.add.text(
            this.backgroundContainer.x * this.width / 2,
            this.contentTitle.y + this.contentConfig.coins.text.y,
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

        this.closeButton = new Button(this.scene, "accept_button", 0, 0);
        this.closeButton.setClickCallback(this.onClose, this);
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
        this.closeButton.destroy();
        this.logo.destroy();
        this.contentTitle.destroy();
        this.contentMessage.destroy();
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
        this.bgImage.setScale(newScale);
        this.bgImage.setPosition(
            newWidth / 2 - (this.bgImage.displayWidth / 2) * newScale,
            newHeight / 2 - (this.bgImage.displayHeight / 2) * newScale,
        );

        this.logo.setScale(newScale);
        this.logo.setPosition(
            this.bgImage.x + (this.bgImage.displayWidth / 2) * newScale,
            this.bgImage.y - this.contentConfig.logo.y * newScale,
        );

        this.contentTitle.setScale(newScale);
        this.contentTitle.setPosition(
            this.bgImage.x + (this.bgImage.displayWidth / 2) * newScale,
            this.bgImage.y + this.contentConfig.title.y * newScale
        );

        this.contentMessage.setScale(newScale);
        this.contentMessage.setPosition(
            this.contentTitle.x * newScale,
            this.contentTitle.y + this.contentConfig.message.y * newScale
        );

        this.contentCoinsAmount.setScale(newScale);
        this.contentCoinsAmount.setPosition(
            this.contentMessage.x * newScale,
            this.contentMessage.y + this.contentConfig.coins.text.y * newScale
        );

        this.closeButton.setScale(newScale);
        this.closeButton.setPosition(
            this.contentCoinsAmount.x * newScale,
            this.contentCoinsAmount.y + this.contentConfig.close.y * newScale,
        );
    };
}

export default PopupBonus;