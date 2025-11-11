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

        // this.contentTitle = null;
        this.contentMessage = null;
        this.contentCount = null;

        this.closeButton = null;
        this.bgImage = null;
        this.curtainImage = null;
        this.titleImage = null;
        this.contentConfig = config.content;
    };
    //#############################################################################################
    /**
     * 
     */
    createContent() {
        this.bgImage = this.scene.add.image(0, 0, "free_spin_popup_bg").setOrigin(0);

        this.titleImage = this.scene.add.image(0, 0, "free_spin_popup_title_art").setOrigin(0.5);

        this.curtainImage = this.scene.add.image(0, 0, "free_spin_popup_curtain").setOrigin(0);

        this.closeButton = new Button(this.scene, "accept_button", 0, 0);
        this.closeButton.setClickCallback(this.onClose, this);

        this.contentMessage = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.titleImage.y + this.contentConfig.message.y,
            "You have got         free games!", {
            fontFamily: "framd",
            fontSize: this.contentConfig.message.fontSize,
            color: this.contentConfig.message.fontColor,
            align: "center",
            fontStyle: "bold",
            stroke: '#fff',
            strokeThickness: 5,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000',
                blur: 2,
                stroke: true,
                fill: false
            },
        }
        ).setOrigin(0.5, 0);

        this.contentGamesCount = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.contentMessage.y + this.contentMessage.displayHeight + this.contentConfig.count.y,
            this.freeGamesCount, {
            fontFamily: "framd",
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
        // this.Hide();
    };
    //#############################################################################################
    /**
     * 
     */
    Hide() {
        this.bgImage.setVisible(false);
        this.titleImage.setVisible(false);
        this.curtainImage.setVisible(false);
        this.contentMessage.setVisible(false);
        this.contentGamesCount.setVisible(false);
        this.closeButton.hide();
        // this.scene.game.events.emit("evtFreeSpinsPopupClosed");
        super.onHide();
        // this.contentMessage.setVisible(false);
        // this.contentGamesCount.setVisible(false);
        // this.startGameText.setVisible(false);
    }
    Show() {
        // this.bgImage.setVisible(true);
        // this.titleImage.setVisible(true);
        // this.curtainImage.setVisible(true);
        // this.contentMessage.setVisible(true);
        // this.contentGamesCount.setVisible(true);
        this.closeButton.show();
        // this.contentMessage.setVisible(true);
        // this.contentGamesCount.setVisible(true);
        // this.startGameText.setVisible(true);
    }
    onClose() {
        // this.scene.bottomPanel.isFreeSpinsMode = true;
        this.scene.game.events.emit("evtFreeSpinsPopupClosed");
        super.onClose();
    };
    //#############################################################################################
    /**
     * 
     */
    destroyContent() {
        this.bgImage.destroy();
        this.curtainImage.destroy();
        this.titleImage.destroy();
        this.closeButton.destroy();
        this.contentMessage.destroy();
        this.contentGamesCount.destroy();
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

        // this.bgImage.setScale(newScale);
        // this.bgImage.setPosition(
        //     newWidth / 2 - (this.bgImage.displayWidth / 2) * newScale,
        //     newHeight / 2 - (this.bgImage.displayHeight / 2) * newScale,
        // );

        this.bgImage.setDisplaySize(newWidth, newHeight);

        // this.curtainImage.setScale(newScale);
        // this.curtainImage.setPosition(
        //     newWidth / 2 - (this.curtainImage.displayWidth / 2) * newScale,
        //     newHeight / 2 - (this.curtainImage.displayHeight / 2) * newScale,
        // );

        this.curtainImage.setDisplaySize(newWidth, newHeight);

        this.contentMessage.setScale(newScale);
        this.contentMessage.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2,
            this.titleImage.y + this.contentConfig.message.y * newScale
        );

        this.contentGamesCount.setScale(newScale);
        this.contentGamesCount.setPosition(
            this.backgroundContainer.x + this.contentConfig.count.x + (this.width * newScale) / 2,
            this.contentMessage.y + this.contentMessage.displayHeight + this.contentConfig.count.y * newScale
        );

        this.closeButton.setScale(newScale);
        this.closeButton.setPosition(
            this.contentGamesCount.x + this.contentConfig.close.x * newScale,
            this.contentGamesCount.y + this.contentConfig.close.y * newScale,
        );
    };
}

export default PopupFreeSpins;