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
        // this.bgImage = null;
        this.titleText = null;
        this.baseSize = null;
        this.contentConfig = config.content;

    };
    //#############################################################################################
    /**
     * 
     */
    createContent() {
        this.popBgOverlay = this.scene.add.image(0, 0, "pop-overlay").setOrigin(0).setAlpha(0.6);
        this.popBgOverlay.setInteractive();
        this.popBg = this.scene.add.image(0, 0, "pop-bg").setOrigin(0).setInteractive({ useHandCursor: true });
        this.popBgFrame = this.scene.add.image(0, 0, "pop-bg-1").setOrigin(0);
        this.popBg.on('pointerup', this.onStartFreeSpin, this);
        this.titleText = this.scene.add.text(0, 0, "Congratulations!", {
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
        }).setOrigin(0.5);
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
            "You have got        free games!", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.contentConfig.message.fontSize,
            color: this.contentConfig.message.fontColor,
            align: "center",
        }
        ).setOrigin(0.5, 0);

        this.contentGamesCount = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.contentMessage.y + this.contentMessage.displayHeight + this.contentConfig.count.y,
            this.freeGamesCount, {
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
        this.startGameText = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.contentMessage.y + this.contentMessage.displayHeight + this.contentConfig.count.y,
            'Start Game', {
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
        this.Hide();
    };
    //#############################################################################################
    /**
     * 
     */
    onClose() {
        // this.scene.game.events.emit("evtFreeSpinsPopupClosed");
        this.Hide();
    };
    onStartFreeSpin() {
        this.scene.bottomPanel.isFreeSpinsMode = true;
        this.Hide();
        this.scene.bottomPanel.normalSpin = false;
        this.scene.bottomPanel.ShowFreeSpinCounterBase();
        this.scene.bottomPanel.SetFreeSpinCounterTextValue(this.scene.bottomPanel.freeSpinCounter);
        this.scene.bottomPanel.totalWinAmount = 0;
        this.scene.bottomPanel.CheckFreeSpinWinAmount(0);
        this.scene.game.events.emit("evtFreeSpinsPopupClosed");

        // super.destroy();
    }
    //#############################################################################################
    /**
     * 
     */
    Hide() {
        this.popBgOverlay.setVisible(false);
        this.popBg.setVisible(false);
        this.popBgFrame.setVisible(false);
        this.titleText.setVisible(false);
        this.contentTitle.setVisible(false);
        this.contentMessage.setVisible(false);
        this.contentGamesCount.setVisible(false);
        this.startGameText.setVisible(false);
    }
    Show() {
        this.popBgOverlay.setVisible(true);
        this.popBg.setVisible(true);
        this.popBgFrame.setVisible(true);
        this.titleText.setVisible(true);
        this.contentTitle.setVisible(true);
        this.contentMessage.setVisible(true);
        this.contentGamesCount.setVisible(true);
        this.startGameText.setVisible(true);
    }
    SetNumberOfFreeGames(numberOfFreeGames) {
        this.contentGamesCount.setText(numberOfFreeGames);
    }
    ResizeBgOverlay(newWidth, newHeight) {
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
        this.ResizeBgOverlay(newWidth, newHeight);
        this.popBg.setScale(newScale);
        this.popBg.setPosition(
            newWidth / 2 - this.popBg.displayWidth / 2,
            newHeight / 2 - this.popBg.displayHeight / 2,
        );
        this.popBgFrame.setPosition(
            newWidth / 2 - this.popBgFrame.displayWidth / 2,
            newHeight / 2 - this.popBgFrame.displayHeight / 2,
        );
        this.titleText.setScale(newScale);
        this.titleText.setPosition(
            this.backgroundContainer.x + this.contentConfig.titleImage.x * newScale,
            this.backgroundContainer.y + this.contentConfig.titleImage.y * newScale,
        );
        this.contentTitle.setScale(newScale);
        this.contentTitle.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2,
            this.backgroundContainer.y + this.contentConfig.title.y * newScale
        );
        this.startGameText.setScale(newScale);
        this.startGameText.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2,
            this.contentTitle.y + this.contentConfig.startGame.y * newScale
        );

        this.contentMessage.setScale(newScale);
        this.contentMessage.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2,
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