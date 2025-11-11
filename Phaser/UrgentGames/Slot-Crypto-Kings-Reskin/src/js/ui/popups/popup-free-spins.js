import PopupBase from "./popup-base";
import Button from "../button";
/**
 *
 */
class PopupFreeSpins extends PopupBase {
    /**
     *
     * @param {*} scene
     * @param {*} id
     */
    constructor(scene, config, id, count) {
        super(scene, config, id);

        this.freeGamesCount = count;

        this.contentTitle = null;
        this.contentMessage = null;
        this.contentCount = null;
        this.closeButton = null;
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
        this.bgImage = this.scene.add.image(0, 0, "pop-bg").setOrigin(0);
        this.titleImage = this.scene.add.image(0, 0, "Congratulations!").setOrigin(0.5);
        this.closeButton = new Button(this.scene, "popup-accept", 0, 0);
        this.closeButton.setClickCallback(this.onClose, this);
        this.baseSize = this.bgImage.displayWidth;

        this.contentTitle = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.backgroundContainer.y + this.contentConfig.title.y,
            "Free Games!", {
                fontFamily: "Bahnschrift Condensed",
                fontStyle: "bold",
                fontSize: this.contentConfig.title.fontSize,
                color: this.contentConfig.title.fontColor
            }
        ).setOrigin(0.5, 0);
        this.contentTitle.visible = false;

        this.contentMessage = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.contentTitle.y + this.contentConfig.message.y,
            "You have got         free games!", {
                fontFamily: "Bahnschrift Condensed",
                fontSize: this.contentConfig.message.fontSize,
                color: this.contentConfig.message.fontColor,
                align: "center",
            }
        ).setOrigin(0.5, 0);

        this.contentGamesCount = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.contentMessage.y + this.contentMessage.displayHeight + this.contentConfig.count.y,
            "     " + this.freeGamesCount, {
                fontFamily: "Bahnschrift Condensed",
                fontStyle: "bold",
                shadow: {
                    offsetX: this.contentConfig.count.shadowOffsetX,
                    offsetY: this.contentConfig.count.shadowOffsetY,
                    color: "#313131",
                    fill: true
                },
                fontSize: this.contentConfig.count.fontSize,
                color: this.contentConfig.count.fontColor
            }
        ).setOrigin(0.5, 0);
    };
    //#############################################################################################
    /**
     *
     */
    onClose() {
        this.scene.game.events.emit("evtFreeSpinsPopupClosed");
        super.onClose();
    };
    //#############################################################################################
    /**
     *
     */
    destroyContent() {
        this.bgImage.destroy();
        this.titleImage.destroy();
        this.contentTitle.destroy();
        this.contentMessage.destroy();
        this.contentGamesCount.destroy();
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
            this.backgroundContainer.y + this.contentConfig.close.y * newScale,
        );
        this.bgImage.setScale(newScale);
        this.bgImage.setPosition(
            newWidth / 2 - this.bgImage.displayWidth + this.contentConfig.background.x * newScale,
            newHeight / 2 - this.bgImage.displayHeight + this.contentConfig.background.y * newScale,
        );

        this.contentTitle.setScale(newScale);
        this.contentTitle.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2,
            this.backgroundContainer.y + this.contentConfig.title.y * newScale
        );

        this.contentMessage.setScale(newScale);
        this.contentMessage.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 1.8,
            this.contentTitle.y + this.contentConfig.message.y * newScale
        );

        this.contentGamesCount.setScale(newScale);
        this.contentGamesCount.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2,
            this.contentMessage.y + this.contentMessage.displayHeight + this.contentConfig.count.y * newScale
        );
    };
}

export default PopupFreeSpins;