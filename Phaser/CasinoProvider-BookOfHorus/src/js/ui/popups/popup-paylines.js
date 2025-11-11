import PopupBase from "./popup-base";
import Button from "../button";

/**
 * 
 */
class PopupPaylines extends PopupBase {
    /**
     * 
     * @param {*} scene 
     * @param {*} id 
     */
    constructor(scene, config, id) {
        super(scene, config, id);

        this.bgImage = null;
        this.topLogo = null;
        this.bottomLogo = null;
        this.bottomLogoMessage = null;
        this.closeButton = null;
        this.contentTitle = null;
        this.contentMessage = null;
        this.baseSize = null;
        this.iconsRows = 4;
        this.iconsCols = 5;

        this.icons = [];
        this.numbers = [];

        this.contentConfig = config.content;
    };
    //#############################################################################################
    /**
     * 
     */
    createContent() {
        this.bgImage = this.scene.add.image(0, 0, "popup_overlay").setOrigin(0).setAlpha(0);
        this.baseSize = this.bgImage.displayWidth;
        this.contentTitle = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.backgroundContainer.y + this.contentConfig.title.y,
            "Paylines Table", {
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
            "Always active 20 paylines. Only highest win pays per line. Win combinations pay left to right", {
            fontFamily: "Bahnschrift Condensed",
            align: "center",
            fontSize: this.contentConfig.message.fontSize,
            color: this.contentConfig.message.fontColor,
            wordWrap: {
                width: this.contentConfig.message.wordWrap,
            }
        }
        ).setOrigin(0.5, 0);
        this.contentMessage.visible = false;
        this.createIconsAndNumbers();
        this.arrangeIconsAndNumbers(1);
    };

    createIconsAndNumbers() {
        for (let rowIndex = 0; rowIndex < this.iconsRows; rowIndex++) {
            let row = [];
            let rowNumbers = [];
            for (let colIndex = 0; colIndex < this.iconsCols; colIndex++) {
                let icon = this.scene.add.image(0, 0, "payline-icon-" + (colIndex + rowIndex * this.iconsCols));
                row.push(icon);
                let number = this.scene.add.text(0, 0, colIndex + rowIndex * this.iconsCols + 1, {
                    fontFamily: "Bahnschrift Condensed",
                    fontSize: this.contentConfig.icons.fontSize,
                    color: "#ffffff",
                }).setOrigin(1, 0.5);
                rowNumbers.push(number);
            }
            this.icons.push(row);
            this.numbers.push(rowNumbers);
        }
    };

    arrangeIconsAndNumbers(newScale) {
        let cfg = this.contentConfig.icons;
        let startX = this.backgroundContainer.x + cfg.startX * newScale;
        let startY = this.contentMessage.y + this.contentMessage.displayHeight + cfg.startY * newScale;
        for (let rowIndex = 0; rowIndex < this.iconsRows; rowIndex++) {
            for (let colIndex = 0; colIndex < this.iconsCols; colIndex++) {
                let icon = this.icons[rowIndex][colIndex];
                icon.setScale(newScale);
                icon.setPosition(
                    startX + cfg.iconWidth * newScale * colIndex + cfg.stepX * newScale * colIndex,
                    startY + cfg.iconHeight * newScale * rowIndex + cfg.stepY * newScale * rowIndex
                );
                let number = this.numbers[rowIndex][colIndex];
                number.setScale(newScale);
                number.setPosition(icon.x - icon.displayWidth / 2 - cfg.textOffsetX * newScale, icon.y);
            }
        }
        this.HidePaylinesPopup();
    };
    //#############################################################################################
    /**
     * 
     */
    destroyContent() {
        this.bgImage.destroy();
        // this.topLogo.destroy();
        // this.bottomLogo.destroy();
        // this.bottomLogoMessage.destroy();
        // this.closeButton.destroy();
        this.contentTitle.destroy();
        this.contentMessage.destroy();
        this.icons.forEach((row) => {
            row.forEach((icon) => {
                icon.destroy();
            });
        });
        this.numbers.forEach((row) => {
            row.forEach((number) => {
                number.destroy();
            });
        });
        this.icons = [];
        this.numbers = [];
    };

    HidePaylinesPopup() {
        this.contentTitle.setVisible(false);
        this.contentMessage.setVisible(false);
        this.icons.forEach(element => {
            element.forEach(element => {
                element.setVisible(false);
            });
        });
        this.numbers.forEach(element => {
            element.forEach(element => {
                element.setVisible(false);
            });
        });
    }

    ShowPaylinesPopup() {
        this.contentTitle.setVisible(true);
        this.contentMessage.setVisible(true);
        this.icons.forEach(element => {
            element.forEach(element => {
                element.setVisible(true);
            });
        });
        this.numbers.forEach(element => {
            element.forEach(element => {
                element.setVisible(true);
            });
        });
    }
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
            (newWidth - this.width * newScale) / 2,
            (newHeight - this.height * newScale) / 1.8
        );
        let x = this.width - this.baseSize / 1.5;
        let y = this.baseSize / 8;
        this.contentTitle.setScale(newScale);
        this.contentTitle.setPosition(this.backgroundContainer.x + (this.width * newScale) / 2, this.backgroundContainer.y + this.contentConfig.title.y * newScale);

        this.contentMessage.setScale(newScale);
        this.contentMessage.setPosition(this.backgroundContainer.x + (this.width * newScale) / 2, this.contentTitle.y + this.contentConfig.message.y * newScale);

        this.arrangeIconsAndNumbers(newScale);
    };
}

export default PopupPaylines;