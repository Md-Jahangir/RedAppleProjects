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
        this.bgImage = this.scene.add.image(0, 0, "payLinesPopupBase").setOrigin(0);
        this.baseSize = this.bgImage.displayWidth;

        this.topLogo = this.scene.add.image(0, 0, "popup_top_logo").setOrigin(0);

        this.bottomLogo = this.scene.add.image(0, 0, "popup_bottom_logo").setOrigin(0);

        this.bottomLogoMessage = this.scene.add.image(0, 0, "popup_bottom_logo_message").setOrigin(0);

        this.closeButton = new Button(this.scene, "popup-back", 0, 0);
        this.closeButton.setClickCallback(this.onClose, this);

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
    };
    //#############################################################################################
    /**
     * 
     */
    destroyContent() {
        this.bgImage.destroy();
        this.topLogo.destroy();
        this.bottomLogo.destroy();
        this.bottomLogoMessage.destroy();
        this.closeButton.destroy();
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

        this.closeButton.setScale(newScale);
        this.closeButton.setPosition(
            (newWidth - this.width * newScale) * 1.2,
            (newHeight - this.height * newScale) / 3.5
        );

        let x = this.width - this.baseSize / 1.5;
        let y = this.baseSize / 8;
        this.topLogo.setScale(newScale);
        this.topLogo.setPosition(
            (this.backgroundContainer.x + x * newScale),
            (this.backgroundContainer.y - y * newScale)
        );

        let bottomLogoX = this.width - this.baseSize / 1.8;
        let bottomLogoY = this.baseSize / 2.4;
        this.bottomLogo.setScale(newScale);
        this.bottomLogo.setPosition(
            (this.backgroundContainer.x + bottomLogoX * newScale),
            (this.backgroundContainer.y + bottomLogoY * newScale)
        );

        let bottomMsgX = this.width - this.baseSize / 1.25;
        let bottomMsgY = this.baseSize / 2;
        this.bottomLogoMessage.setScale(newScale);
        this.bottomLogoMessage.setPosition(
            (this.backgroundContainer.x + bottomMsgX * newScale),
            (this.backgroundContainer.y + bottomMsgY * newScale)
        );

        this.contentTitle.setScale(newScale);
        this.contentTitle.setPosition(this.backgroundContainer.x + (this.width * newScale) / 2, this.backgroundContainer.y + this.contentConfig.title.y * newScale);

        this.contentMessage.setScale(newScale);
        this.contentMessage.setPosition(this.backgroundContainer.x + (this.width * newScale) / 2, this.contentTitle.y + this.contentConfig.message.y * newScale);

        this.arrangeIconsAndNumbers(newScale);
    };
}

export default PopupPaylines;