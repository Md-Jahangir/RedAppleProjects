import PopupBase from "./popup-base";
import Switcher from "../switcher";
import Button from "../button";
/**
 * 
 */
class PopupOptions extends PopupBase {
    /**
     * 
     * @param {*} scene 
     * @param {*} config 
     * @param {*} id 
     */
    constructor(scene, config, id) {
        super(scene, config, id);

        this.baseSize = null;
        this.bgImage = null;
        this.closeButton = null;
        this.contentTitle = null;
        this.musicSwitcher = null;
        this.musicTitle = null;
        this.soundsSwitcher = null;
        this.soundsTitle = null;
        this.contentConfig = config.content;
    };
    //#############################################################################################
    /**
     * 
     */
    createContent() {
        this.bgImage = this.scene.add.image(0, 0, "OptionPopupBase").setOrigin(0);
        this.baseSize = this.bgImage.displayWidth;

        this.closeButton = new Button(this.scene, "popup-close", 0, 0);
        this.closeButton.setClickCallback(this.onClose, this);

        this.contentTitle = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.backgroundContainer.y + this.contentConfig.title.y,
            "Settings", {
                fontFamily: "Bahnschrift Condensed",
                fontStyle: "bold",
                fontSize: this.contentConfig.title.fontSize,
                color: this.contentConfig.title.fontColor
            }
        ).setOrigin(0.5, 0);

        this.musicSwitcher = new Switcher(this.scene, this.backgroundContainer.x, this.backgroundContainer.y, this.contentConfig.musicSwitcher.ballOffset, true);
        this.musicSwitcher.setOnCallback(this.onMusicOn, this);
        this.musicSwitcher.setOffCallback(this.onMusicOff, this);

        this.musicTitle = this.scene.add.text(
            this.backgroundContainer.x - this.contentConfig.musicSwitcher.text.x,
            this.backgroundContainer.y - this.contentConfig.musicSwitcher.text.y,
            "Music", {
                fontFamily: "Bahnschrift Condensed",
                fontSize: this.contentConfig.musicSwitcher.text.fontSize,
                color: this.contentConfig.musicSwitcher.text.fontColor
            }
        ).setOrigin(1, 0.5);

        this.soundsSwitcher = new Switcher(this.scene, this.backgroundContainer.x, this.backgroundContainer.y, this.contentConfig.soundsSwitcher.ballOffset, true);
        this.soundsSwitcher.setOnCallback(this.onSoundsOn, this);
        this.soundsSwitcher.setOffCallback(this.onSoundsOff, this);

        this.soundsTitle = this.scene.add.text(
            this.backgroundContainer.x - this.contentConfig.soundsSwitcher.text.x,
            this.backgroundContainer.y - this.contentConfig.soundsSwitcher.text.y,
            "Sounds", {
                fontFamily: "Bahnschrift Condensed",
                fontSize: this.contentConfig.soundsSwitcher.text.fontSize,
                color: this.contentConfig.soundsSwitcher.text.fontColor
            }
        ).setOrigin(1, 0.5);
    };
    //#############################################################################################
    onClose() {
            super.destroy();
        }
        //#############################################################################################
        /**
         * 
         */
    destroyContent() {
        this.bgImage.destroy();
        this.closeButton.destroy();
        this.contentTitle.destroy();
        this.musicTitle.destroy();
        this.musicSwitcher.destroy();
        this.soundsTitle.destroy();
        this.soundsSwitcher.destroy();
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
            (newHeight - this.height * newScale) / 2
        );
        let x = this.width - this.baseSize / 8;
        let y = this.baseSize / 5;
        this.closeButton.setScale(newScale);
        this.closeButton.setPosition(
            (this.backgroundContainer.x + x * newScale),
            (this.backgroundContainer.y + y * newScale)
        );

        this.contentTitle.setScale(newScale);
        this.contentTitle.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2,
            this.backgroundContainer.y + this.contentConfig.title.y * newScale
        );

        this.musicSwitcher.resize(newWidth, newHeight);
        this.musicSwitcher.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2 + this.contentConfig.musicSwitcher.x * newScale,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.musicSwitcher.y * newScale
        );

        this.musicTitle.setScale(newScale);
        this.musicTitle.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2 - this.contentConfig.musicSwitcher.text.x * newScale,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.musicSwitcher.text.y * newScale,
        );

        this.soundsSwitcher.resize(newWidth, newHeight);
        this.soundsSwitcher.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2 + this.contentConfig.soundsSwitcher.x * newScale,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.soundsSwitcher.y * newScale
        );

        this.soundsTitle.setScale(newScale);
        this.soundsTitle.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2 - this.contentConfig.soundsSwitcher.text.x * newScale,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.soundsSwitcher.text.y * newScale,
        );
    };
    //#############################################################################################
    onMusicOn() {};
    //#############################################################################################
    onMusicOff() {};
    //#############################################################################################
    onSoundsOn() {};
    //#############################################################################################
    onSoundsOff() {};
}

export default PopupOptions;