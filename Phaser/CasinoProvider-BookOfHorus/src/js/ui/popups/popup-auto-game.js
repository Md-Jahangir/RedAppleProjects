import PopupBase from "./popup-base";
import ValueSwitcher from "../value-switcher";
import { Model } from "../../model";
import Button from "../button";
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

        this.contentTitle = null;
        this.contentMessage = null;
        this.gamesCountSwitcher = null;

        this.popBg = null; // new bg for teh pop up
        this.popBgFrame = null;
        this.titleImage = null;
        this.config = config;
        this.contentConfig = config.content;
    };
    //#############################################################################################
    /**
     *
     */
    createContent() {
        this.popBgOverlay = this.scene.add.image(0, 0, "pop-overlay").setOrigin(0).setAlpha(0.6);
        this.popBgOverlay.setInteractive();
        this.popBg = this.scene.add.image(0, 0, "pop-bg").setOrigin(0);
        this.popBgFrame = this.scene.add.image(0, 0, "pop-bg-1").setOrigin(0);
        this.contentTitle = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.backgroundContainer.y + this.contentConfig.title.y,
            "Auto Game", {
            fontFamily: "Bahnschrift Condensed",
            fontStyle: "bold",
            fontSize: this.contentConfig.title.fontSize,
            color: this.contentConfig.title.fontColor
        }
        ).setOrigin(0.5, 0);
        this.contentTitle.visible = false;
        this.contentMessage = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.message.y,
            "please choose how many games \n you want to play", {
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
            this.popBg.x,
            this.popBg.y + this.contentConfig.gamesCount.y,
            [5, 10, 15, 20, 25],
            {
                decrementImg: "minus_button",
                incrementImg: "plus_button",
                configId: "autoGameValues"
            },
            "", 'autoGame'
        );
        this.createControlButtons();
    };
    //#############################################################################################
    /**
     *
     */
    createControlButtons() {
        if (this.config.hasCloseButton) {
        }
        if (this.config.hasAcceptButton) {
            this.acceptButton = new Button(this.scene, "popup-accept", 0, 0);
            this.acceptButton.setClickCallback(this.onAccept, this);
        }
        if (this.config.hasDeclineButton) {
            this.declineButton = new Button(this.scene, "popup-decline", 0, 0);
            this.declineButton.setClickCallback(this.onDecline, this);
        }
    };
    onAccept() {
        if ((this.gamesCountSwitcher.getValue() * this.scene.bottomPanel.betsSwitcher.valueMultiplier) >
            parseInt(Model.getBalance())) {
        } else {
            this.scene.bottomPanel.normalSpin = false;
            this.scene.bottomPanel.ShowAutoCounterBase();
            this.scene.bottomPanel.SetAutoCounterTextValue(this.gamesCountSwitcher.getValue());
            this.scene.game.events.emit("evtAutoGameStarted", this.gamesCountSwitcher.getValue());
        }
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
        this.popBg.destroy();
        this.popBgFrame.destroy();
        this.popBgOverlay.destroy()
        // this.titleImage.destroy();
    };
    ResizePopupOverlay(newWidth, newHeight) {
        let scaleX = newWidth / this.popBgOverlay.width;
        let scaleY = newHeight / this.popBgOverlay.height;
        let totalScale = scaleX > scaleY ? scaleX : scaleY;
        this.popBgOverlay.setScale(totalScale);
        this.popBgOverlay.setPosition(0, 0);
    }
    //#############################################################################################
    /**
     *
     * @param {*} newWidth
     * @param {*} newHeight
     * @param {*} newScale
     */
    resizeContent(newWidth, newHeight, newScale) {
        this.ResizePopupOverlay(newWidth, newHeight);
        this.popBg.setScale(newScale);
        this.popBg.setPosition(
            newWidth / 2 - this.popBg.displayWidth + this.contentConfig.background.x * newScale,
            newHeight / 2 - this.popBg.displayHeight + this.contentConfig.background.y * newScale,
        );
        this.popBgFrame.setScale(newScale);
        this.popBgFrame.setPosition(
            newWidth / 2 - this.popBg.displayWidth + this.contentConfig.frame.x * newScale,
            newHeight / 2 - this.popBg.displayHeight + this.contentConfig.frame.y * newScale,
        );

        this.contentTitle.setVisible(true);
        this.contentTitle.setScale(newScale);
        this.contentTitle.setPosition(
            this.popBg.x + (this.popBg.width * newScale) / 2,
            this.popBg.y + this.contentConfig.title.y * newScale
        );
        this.contentMessage.setScale(newScale);
        this.contentMessage.setPosition(
            this.popBg.x + (this.popBg.width * newScale) / 2,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.message.y * newScale
        );

        this.gamesCountSwitcher.resize(newWidth, newHeight);
        this.gamesCountSwitcher.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 1.9,
            this.contentMessage.y + this.contentMessage.displayHeight + this.contentConfig.gamesCount.y * newScale
        );
        this.acceptButton.setScale(newScale);
        this.acceptButton.setPosition(
            this.popBg.x + (this.popBg.width * newScale) / 1.4,
            this.popBg.y + this.contentConfig.acceptbutton.y * newScale
        );

        this.declineButton.setScale(newScale);
        this.declineButton.setPosition(
            this.popBg.x + (this.popBg.width * newScale) / 4,
            this.popBg.y + this.contentConfig.acceptbutton.y * newScale
        );
    };
}

export default PopupAutoGame;