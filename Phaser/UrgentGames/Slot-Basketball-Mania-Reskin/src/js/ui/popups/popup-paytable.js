import PopupBase from "./popup-base";
import { Model } from "../../model";
import PageScroller from "../page-scroller";
import PaytableCell from "../paytable-cell";
import Button from "../button";

/**
 * 
 */
class PopupPaytable extends PopupBase {
    /**
     * 
     * @param {*} scene 
     * @param {*} id 
     */
    constructor(scene, config, id, isRegular = true) {
        super(scene, config, id);

        this.isRegular = isRegular;

        this.contentTitle = null;
        this.bgImage = null;
        this.topLogo = null;
        this.bottomLogo = null;
        this.bottomLogoMessage = null;
        this.closeButton = null;
        this.scroller = null;
        this.items = [];
        this.baseSize = null;

        this.customDescriptionsRegular = {
            "Wild": "Substitutes for all symbols except Bonus an Free Spin",
            "Bonus": "3 or more will give you a bonus",
            "Free Spin": "3 or more will start Free Spins"
        }
        this.customDescriptionsFeature = {
            "Wild": "Substitutes for all symbols. Will be held in place for remaining free spins"
        };

        this.contentConfig = config.content;
        this.scrollerConfig = this.scene.cache.json.get("resolution-config").pageScroller;
    };
    //#############################################################################################
    /**
     * 
     */
    createContent() {
        this.bgImage = this.scene.add.image(0, 0, "payLinesPopupBase").setOrigin(0);
        this.baseSize = this.bgImage.displayWidth;

        this.closeButton = new Button(this.scene, "popup-back", 0, 0);
        this.closeButton.setClickCallback(this.onClose, this);

        this.topLogo = this.scene.add.image(0, 0, "popup_top_logo").setOrigin(0);

        this.bottomLogo = this.scene.add.image(0, 0, "popup_bottom_logo").setOrigin(0);

        this.bottomLogoMessage = this.scene.add.image(0, 0, "popup_bottom_logo_message").setOrigin(0);

        this.contentTitle = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.backgroundContainer.y + this.contentConfig.title.y,
            this.isRegular ? "Regular Game Paytable" : "Free Game Paytable", {
                fontFamily: "Bahnschrift Condensed",
                fontStyle: "bold",
                fontSize: this.contentConfig.title.fontSize,
                color: this.contentConfig.title.fontColor
            }
        ).setOrigin(0.5);
        this.contentTitle.visible = false;

        this.scroller = new PageScroller(this.scene, this.scrollerConfig).create(
            this.backgroundContainer.x + this.scrollerConfig.x,
            this.backgroundContainer.y + this.scrollerConfig.y,
        );

        this.createPaytableCells();
    };
    //#############################################################################################
    createPaytableCells() {
        let paytable = this.isRegular ? Model.getRegularPaytable() : Model.getFeaturePaytable();
        let stepX = this.scrollerConfig.content.stepX;
        let stepY = this.scrollerConfig.content.stepY;
        let commonWidth = 0;
        let commonHeight = 0;
        let columnWidth = 0;
        paytable.forEach((data, index) => {
            // new column
            if (index % 3 === 0 && index !== 0) {
                commonWidth += columnWidth;
                columnWidth = 0;
                commonHeight = 0;
            };
            let descriptionText = this.getCustomDescription(data);
            let item = new PaytableCell(this.scene, stepX + commonWidth, stepY + commonHeight, data, descriptionText);
            this.scroller.addItem(item.getContainer());
            commonHeight += stepY + item.getHeight();
            columnWidth = stepX + item.getWidth();
        });
    };
    //#############################################################################################
    getCustomDescription(data) {
        let symbol = data.symbol;
        let descriptions = this.isRegular ? this.customDescriptionsRegular : this.customDescriptionsFeature;
        if (descriptions.hasOwnProperty(symbol)) {
            return descriptions[symbol];
        }
        return "";
    };
    //#############################################################################################
    /**
     * 
     */
    destroyContent() {
        this.bgImage.destroy();
        this.closeButton.destroy();
        this.topLogo.destroy();
        this.bottomLogo.destroy();
        this.bottomLogoMessage.destroy();
        this.contentTitle.destroy();
        this.scroller.destroy();
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
            (newHeight - this.height * newScale) / 3.55
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

        this.scroller.setScale(newScale);
        this.scroller.setPosition(
            this.backgroundContainer.x + this.scrollerConfig.x * newScale,
            this.backgroundContainer.y + this.scrollerConfig.y * newScale,
        );
    };
}

export default PopupPaytable;