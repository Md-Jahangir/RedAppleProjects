import PopupBase from "./popup-base";
import Switcher from "../switcher";
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

        this.contentTitle = null;
        this.musicSwitcher = null;
        this.musicTitle = null;
        this.soundsSwitcher = null;
        this.soundsTitle = null;
        this.popBg = null; // new bg for teh pop up
        this.contentConfig = config.content;

    };
    //#############################################################################################
    /**
     * 
     */
    createContent() {
        this.popBg = this.scene.add.image(0, 0, "pop-bg").setOrigin(0);
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
        this.contentTitle.visible = false;
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
        this.contentTitle.destroy();
        this.musicTitle.destroy();
        this.musicSwitcher.destroy();
        this.soundsTitle.destroy();
        this.soundsSwitcher.destroy();
        this.popBg.destroy();
    };
    //#############################################################################################
    /**
     * 
     * @param {*} newWidth 
     * @param {*} newHeight 
     * @param {*} newScale 
     */
    resizeContent(newWidth, newHeight, newScale) {
        this.contentTitle.setScale(newScale);
        this.contentTitle.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2,
            this.backgroundContainer.y + this.contentConfig.title.y * newScale
        );

        this.popBg.setScale(newScale);
        this.popBg.setPosition(
            newWidth / 2 - this.popBg.displayWidth + this.contentConfig.background.x * newScale,
            newHeight / 2 - this.popBg.displayHeight + this.contentConfig.background.y * newScale,
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