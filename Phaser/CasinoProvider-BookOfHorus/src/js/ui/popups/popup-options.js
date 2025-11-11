import PopupBase from "./popup-base";
import Switcher from "../switcher";
import Button from "../button";
import { SelectedResolution } from "../../resolution-selector";
import { SoundManager } from "../../SoundManager";
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
        this.config = config;
        this.baseSize = null;
        this.bgImage = null;
        // this.closeButton = null;
        this.contentTitle = null;
        this.musicSwitcher = null;
        this.musicTitle = null;
        this.soundsSwitcher = null;
        this.soundsTitle = null;
        this.contentConfig = config.content;
        this.bgMusicFrequency = 100;
    };
    //#############################################################################################
    /**
     * 
     */
    createContent() {
        this.bgImage = this.scene.add.image(0, 0, "popup_overlay").setOrigin(0);
        this.bgImage.setVisible(false)
        this.baseSize = this.bgImage.displayWidth;
        this.CreateBgSoundSlider();
        this.CreateBgMusicSlider();

        // this.spaceBarSwitcher = new Switcher(this.scene, this.backgroundContainer.x, this.backgroundContainer.y, this.contentConfig.musicSwitcher.ballOffset, true);
        // this.spaceBarSwitcher.setOnCallback(this.onMusicOn, this);
        // this.spaceBarSwitcher.setOffCallback(this.onMusicOff, this);
        this.contentTitle = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.backgroundContainer.y + this.contentConfig.title.y,
            "Use Spacebar To Play", {
            fontFamily: "Bahnschrift Condensed",
            fontStyle: "bold",
            fontSize: this.contentConfig.title.fontSize,
            color: this.contentConfig.title.fontColor
        }
        ).setOrigin(0.5, 0).setAlpha(0);



        this.musicTitle = this.scene.add.text(
            this.backgroundContainer.x - this.contentConfig.musicSwitcher.text.x,
            this.backgroundContainer.y - this.contentConfig.musicSwitcher.text.y,
            "Background Music", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.contentConfig.musicSwitcher.text.fontSize,
            color: this.contentConfig.musicSwitcher.text.fontColor
        }
        ).setOrigin(1, 0.5);
        this.soundsTitle = this.scene.add.text(
            this.backgroundContainer.x - this.contentConfig.soundsSwitcher.text.x,
            this.backgroundContainer.y - this.contentConfig.soundsSwitcher.text.y,
            "Sound Effects", {
            fontFamily: "Bahnschrift Condensed",
            fontSize: this.contentConfig.soundsSwitcher.text.fontSize,
            color: this.contentConfig.soundsSwitcher.text.fontColor
        }
        ).setOrigin(1, 0.5);
        // this.fastSpinSwitcher = new Switcher(this.scene, this.backgroundContainer.x, this.backgroundContainer.y, this.contentConfig.musicSwitcher.ballOffset, true);
        // this.fastSpinSwitcher.setOnCallback(this.onMusicOn, this);
        // this.fastSpinSwitcher.setOffCallback(this.onMusicOff, this);
        this.fastSpinTitle = this.scene.add.text(
            this.backgroundContainer.x + this.width / 2,
            this.backgroundContainer.y + this.contentConfig.title.y,
            "Fast Spin", {
            fontFamily: "Bahnschrift Condensed",
            fontStyle: "bold",
            fontSize: this.contentConfig.title.fontSize,
            color: this.contentConfig.title.fontColor
        }
        ).setOrigin(0.5, 0).setAlpha(0);
        this.HideOptionsPopup();
    };
    CreateBgMusicSlider() {
        let normalTextStyle1 = { fontFamily: 'arial', fontSize: this.contentConfig.frquencyMusicText.fontSize + 'px', fill: '#ffc33c', fontStyle: 'normal', align: 'center', wordWrap: { width: 390 } };
        this.musicSwitcher = this.scene.rexUI.add.slider({
            x: 0,//this.musicSwitcherBar.x,
            y: 0,//this.musicSwitcherBar.y,
            width: this.contentConfig.musicSwitcher.sliderWidth,// this.musicSwitcherBar.width,
            height: this.contentConfig.musicSwitcher.sliderHeight,// this.musicSwitcherBar.height,
            orientation: 'x',
            reverseAxis: true,
            track: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 3, 0xffc33c),//this.musicSwitcherBar,
            input: 'drag',
            thumb: this.scene.add.image(0, 0, "switch-ball").setOrigin(0),//this.scene.rexUI.add.roundRectangle(0, 0, 40, 20, 10, COLOR_LIGHT), 

        })
            .layout();
        this.bgMusicFrequencyText = this.scene.add.text(0, 0, this.bgMusicFrequency, normalTextStyle1).setOrigin(0.0);
        this.musicSwitcher.on('valuechange', (newValue, oldValue, scrollBar, thumb) => {
            this.bgMusicFrequencyText.text = parseInt(100) - parseInt(newValue * 100)//.toFixed(2); 
            if (newValue == 1) {
                this.scene.topPanel.menu.musicButton.disable();
                localStorage.setItem('music_status', 1);
                this.scene.topPanel.menu.musicButton.localStorageMusic();
            } else if (newValue < 1) {
                this.scene.topPanel.menu.musicButton.enable();
                localStorage.setItem('music_status', 0);
                this.scene.topPanel.menu.musicButton.localStorageMusic();
            }
        })

    }
    CreateBgSoundSlider() {
        let normalTextStyle1 = { fontFamily: 'arial', fontSize: this.contentConfig.frquencyMusicText.fontSize + 'px', fill: '#ffc33c', fontStyle: 'normal', align: 'center', wordWrap: { width: 390 } };
        this.soundsSwitcher = this.scene.rexUI.add.slider({
            x: 0,//this.musicSwitcherBar.x,
            y: 0,//this.musicSwitcherBar.y,
            width: this.contentConfig.musicSwitcher.sliderWidth,// this.musicSwitcherBar.width,
            height: this.contentConfig.musicSwitcher.sliderHeight,// this.musicSwitcherBar.height,
            orientation: 'x',
            reverseAxis: true,
            track: this.scene.rexUI.add.roundRectangle(100, 0, 0, 0, 3, 0xffc33c),//this.musicSwitcherBar,
            input: 'drag',
            thumb: this.scene.add.image(0, 0, "switch-ball").setOrigin(0),//this.scene.rexUI.add.roundRectangle(0, 0, 40, 20, 10, COLOR_LIGHT), 
        }).layout();
        this.bgSoundFrequencyText = this.scene.add.text(0, 0, this.bgMusicFrequency, normalTextStyle1).setOrigin(0);
        this.soundsSwitcher.on('valuechange', (newValue, oldValue, scrollBar, thumb) => {
            this.bgSoundFrequencyText.text = parseInt(100) - parseInt(newValue * 100)//.toFixed(2);
            if (newValue == 1) {
                this.scene.topPanel.menu.soundButton.disable();
                localStorage.setItem('sound_status', 1);
                this.scene.topPanel.menu.soundButton.localStorageVolume();
            } else if (newValue < 1) {
                this.scene.topPanel.menu.soundButton.enable();
                localStorage.setItem('sound_status', 0);
                this.scene.topPanel.menu.soundButton.localStorageVolume();
            }
        })
    }


    ShowOptionsPopup() {
        this.contentTitle.setVisible(true);
        // this.spaceBarSwitcher.ShowSwitcher();
        this.musicTitle.setVisible(true);
        this.soundsTitle.setVisible(true);
        this.musicSwitcher.setVisible(true);
        this.soundsSwitcher.setVisible(true);
        // this.fastSpinSwitcher.ShowSwitcher();
        this.fastSpinTitle.setVisible(true);
        this.bgMusicFrequencyText.setVisible(true);
        this.bgSoundFrequencyText.setVisible(true);
    }

    HideOptionsPopup() {
        this.contentTitle.setVisible(false);
        // this.spaceBarSwitcher.HideSwitcher();
        this.musicTitle.setVisible(false);
        this.soundsTitle.setVisible(false);
        this.musicSwitcher.setVisible(false);
        this.soundsSwitcher.setVisible(false);
        // this.fastSpinSwitcher.HideSwitcher();
        this.fastSpinTitle.setVisible(false);
        this.bgMusicFrequencyText.setVisible(false);
        this.bgSoundFrequencyText.setVisible(false);
    }
    //#############################################################################################
    onClose() {
        super.destroy();
    }
    //#############################################################################################
    /**
     * 
     */
    destroyContent() {
        // this.bgImage.destroy();
        // this.closeButton.destroy();
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
        let x = this.width - this.baseSize / 8;
        let y = this.baseSize / 5;
        this.contentTitle.setScale(newScale);
        this.contentTitle.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2 + (this.contentConfig.title.x * newScale),
            this.backgroundContainer.y + this.contentConfig.title.y * newScale
        );
        this.musicSwitcher.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2 + this.contentConfig.musicSwitcher.x * newScale,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.musicSwitcher.y * newScale
        );
        this.musicSwitcher.setScale(newScale)
        this.musicSwitcher.children[0].setScale(newScale);
        this.musicSwitcher.children[1].setScale(newScale);
        this.musicSwitcher.children[0].setPosition(
            this.musicSwitcher.x,
            this.musicSwitcher.y
        )
        this.soundsSwitcher.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2 + this.contentConfig.soundsSwitcher.x * newScale,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.soundsSwitcher.y * newScale
        );
        this.soundsSwitcher.setScale(newScale)
        this.soundsSwitcher.children[0].setScale(newScale);
        this.soundsSwitcher.children[1].setScale(newScale);
        this.soundsSwitcher.children[0].setPosition(
            this.soundsSwitcher.x,
            this.soundsSwitcher.y
        )
        // this.spaceBarSwitcher.resize(newWidth, newHeight);
        // this.spaceBarSwitcher.setPosition(
        //     this.backgroundContainer.x + (this.width * newScale) / 2 + this.contentConfig.spaceSwitcher.x * newScale,
        //     this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.spaceSwitcher.y * newScale
        // )
        this.musicTitle.setScale(newScale);
        this.musicTitle.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2 - this.contentConfig.musicSwitcher.text.x * newScale,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.musicSwitcher.text.y * newScale,
        );
        this.soundsTitle.setScale(newScale);
        this.soundsTitle.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2 - this.contentConfig.soundsSwitcher.text.x * newScale,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.soundsSwitcher.text.y * newScale,
        );
        // this.fastSpinSwitcher.resize(newWidth, newHeight);
        // this.fastSpinSwitcher.setPosition(
        //     this.backgroundContainer.x + (this.width * newScale) / 2 + this.contentConfig.fastSpinSwitcher.x * newScale,
        //     this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.fastSpinSwitcher.y * newScale
        // )
        this.fastSpinTitle.setScale(newScale);
        this.fastSpinTitle.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2 - this.contentConfig.fastSpinSwitcher.text.x * newScale,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.fastSpinSwitcher.text.y * newScale,
        );
        this.bgMusicFrequencyText.setScale(newScale);
        this.bgMusicFrequencyText.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2 + this.contentConfig.frquencyMusicText.x * newScale,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.frquencyMusicText.y * newScale,
        );
        this.bgSoundFrequencyText.setScale(newScale);
        this.bgSoundFrequencyText.setPosition(
            this.backgroundContainer.x + (this.width * newScale) / 2 + this.contentConfig.frquencySoundText.x * newScale,
            this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.frquencySoundText.y * newScale,
        );
    };
    //#############################################################################################
    onMusicOn() { };
    //#############################################################################################
    onMusicOff() { };
    //#############################################################################################
    onSoundsOn() { };
    //#############################################################################################
    onSoundsOff() { };
}

export default PopupOptions;