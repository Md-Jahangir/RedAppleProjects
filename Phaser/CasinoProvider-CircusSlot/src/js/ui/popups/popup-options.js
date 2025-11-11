import PopupBase from "./popup-base";
import Switcher from "../switcher";
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

		this.contentTitle = null;
		this.musicSwitcher = null;
		this.musicTitle = null;
		this.soundsSwitcher = null;
		this.soundsTitle = null;
		this.popBg = null;// new bg for teh pop up
		this.contentConfig = config.content;

	};
	//#############################################################################################
	/**
	 * 
	 */
	createContent() {
		// this.popBg = this.scene.add.image(0, 0, "pop-bg").setOrigin(0);
		// this.popBg = this.scene.add.image(0, 0, "pop_bg").setOrigin(0);
		this.popBg = this.scene.add.spine(0, 0, "animation-menu-bg");
		this.popBg.play('animation', true);
		this.contentTitle = this.scene.add.text(
			this.backgroundContainer.x + this.width / 2,
			this.backgroundContainer.y + this.contentConfig.title.y,
			"Settings",
			{
				fontFamily: "Bahnschrift Condensed",
				fontStyle: "bold",
				fontSize: this.contentConfig.title.fontSize,
				color: this.contentConfig.title.fontColor
			}
		).setOrigin(0.5, 0);
		this.contentTitle.visible = false;

		this.musicBase = this.scene.add.image(0, 0, "music_sound_base").setOrigin(0);
		this.musicHeading = this.scene.add.image(0, 0, "music_heading").setOrigin(0);

		this.musicSwitcher = new Switcher(this.scene, this.backgroundContainer.x, this.backgroundContainer.y, this.contentConfig.musicSwitcher.ballOffset, this.contentConfig.musicSwitcher.ballOffsetY, true);
		this.musicSwitcher.setOnCallback(this.onMusicOn, this);
		this.musicSwitcher.setOffCallback(this.onMusicOff, this);
		this.CheckStateOfMusicSwitcher();

		// this.musicTitle = this.scene.add.text(
		// 	this.backgroundContainer.x - this.contentConfig.musicSwitcher.text.x,
		// 	this.backgroundContainer.y - this.contentConfig.musicSwitcher.text.y,
		// 	"Music",
		// 	{
		// 		fontFamily: "Bahnschrift Condensed",
		// 		fontSize: this.contentConfig.musicSwitcher.text.fontSize,
		// 		color: this.contentConfig.musicSwitcher.text.fontColor
		// 	}
		// ).setOrigin(1, 0.5);

		this.soundBase = this.scene.add.image(0, 0, "music_sound_base").setOrigin(0);
		this.soundHeading = this.scene.add.image(0, 0, "sounds_heading").setOrigin(0);

		this.soundsSwitcher = new Switcher(this.scene, this.backgroundContainer.x, this.backgroundContainer.y, this.contentConfig.soundsSwitcher.ballOffset, this.contentConfig.soundsSwitcher.ballOffsetY, true);
		this.soundsSwitcher.setOnCallback(this.onSoundsOn, this);
		this.soundsSwitcher.setOffCallback(this.onSoundsOff, this);
		this.CheckStateOfSoundSwitcher();

		// this.soundsTitle = this.scene.add.text(
		// 	this.backgroundContainer.x - this.contentConfig.soundsSwitcher.text.x,
		// 	this.backgroundContainer.y - this.contentConfig.soundsSwitcher.text.y,
		// 	"Sounds",
		// 	{
		// 		fontFamily: "Bahnschrift Condensed",
		// 		fontSize: this.contentConfig.soundsSwitcher.text.fontSize,
		// 		color: this.contentConfig.soundsSwitcher.text.fontColor
		// 	}
		// ).setOrigin(1, 0.5);

	};
	CheckStateOfMusicSwitcher() {
		if (localStorage.getItem('music_status_circus') == 0) {
			this.musicSwitcher.isOff = true;
			this.musicSwitcher.changeState();
		} else {
			this.musicSwitcher.isOff = false;
			this.musicSwitcher.changeState();
		}

	}
	CheckStateOfSoundSwitcher() {
		if (localStorage.getItem('sound_status_circus') == 0) {
			this.soundsSwitcher.isOff = true;
			this.soundsSwitcher.changeState();
		} else {
			this.soundsSwitcher.isOff = false;
			this.soundsSwitcher.changeState();
		}
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
		this.contentTitle.destroy();
		// this.musicTitle.destroy();
		this.musicSwitcher.destroy();
		// this.soundsTitle.destroy();
		this.soundsSwitcher.destroy();
		this.musicBase.destroy();
		this.soundBase.destroy();
		this.musicHeading.destroy();
		this.soundHeading.destroy();

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
			newWidth / 2,
			newHeight / 2,
		);

		this.musicBase.setScale(newScale);
		this.musicBase.setPosition(
			this.popBg.x - this.contentConfig.musicBase.x * newScale,
			this.popBg.y - this.contentConfig.musicBase.y * newScale,
		);
		this.musicHeading.setScale(newScale);
		this.musicHeading.setPosition(
			this.musicBase.x + this.contentConfig.musicBase.title.x * newScale,
			this.musicBase.y + this.contentConfig.musicBase.title.y * newScale,
		);

		this.musicSwitcher.resize(newWidth, newHeight);
		this.musicSwitcher.setPosition(
			// this.backgroundContainer.x + (this.width * newScale) / 2 + this.contentConfig.musicSwitcher.x * newScale,
			// this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.musicSwitcher.y * newScale
			this.musicBase.x + this.contentConfig.musicSwitcher.x * newScale,
			this.musicBase.y + this.contentConfig.musicSwitcher.y * newScale,
		);

		// this.musicTitle.setScale(newScale);
		// this.musicTitle.setPosition(
		// 	this.backgroundContainer.x + (this.width * newScale) / 2 - this.contentConfig.musicSwitcher.text.x * newScale,
		// 	this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.musicSwitcher.text.y * newScale,
		// );

		this.soundBase.setScale(newScale);
		this.soundBase.setPosition(
			this.popBg.x - this.contentConfig.soundBase.x * newScale,
			this.popBg.y - this.contentConfig.soundBase.y * newScale,
		);
		this.soundHeading.setScale(newScale);
		this.soundHeading.setPosition(
			this.soundBase.x + this.contentConfig.soundBase.title.x * newScale,
			this.soundBase.y + this.contentConfig.soundBase.title.y * newScale,
		);

		this.soundsSwitcher.resize(newWidth, newHeight);
		this.soundsSwitcher.setPosition(
			// this.backgroundContainer.x + (this.width * newScale) / 2 + this.contentConfig.soundsSwitcher.x * newScale,
			// this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.soundsSwitcher.y * newScale
			this.soundBase.x + this.contentConfig.soundsSwitcher.x * newScale,
			this.soundBase.y + this.contentConfig.soundsSwitcher.y * newScale,
		);

		// this.soundsTitle.setScale(newScale);
		// this.soundsTitle.setPosition(
		// 	this.backgroundContainer.x + (this.width * newScale) / 2 - this.contentConfig.soundsSwitcher.text.x * newScale,
		// 	this.contentTitle.y + this.contentTitle.displayHeight + this.contentConfig.soundsSwitcher.text.y * newScale,
		// );

	};
	//#############################################################################################
	onMusicOn() {
		if (localStorage.getItem('music_status_circus') == null) {
			localStorage.setItem('music_status_circus', 0);
		} else {
			localStorage.setItem('music_status_circus', 0);
			SoundManager.PlayGameBgSound();
		}
	};
	//#############################################################################################
	onMusicOff() {
		if (localStorage.getItem('music_status_circus') == null) {
			localStorage.setItem('music_status_circus', 0);
		} else {
			localStorage.setItem('music_status_circus', 1);
			SoundManager.StopGameBgSound();
		}
	};
	//#############################################################################################
	onSoundsOn() {
		if (localStorage.getItem('sound_status_circus') == null) {
			localStorage.setItem('sound_status_circus', 0);
		} else {
			localStorage.setItem('sound_status_circus', 0);
		}
	};
	//#############################################################################################
	onSoundsOff() {
		if (localStorage.getItem('sound_status_circus') == null) {
			localStorage.setItem('sound_status_circus', 0);
		} else {
			let soundStatus = localStorage.getItem('sound_status_circus');
			localStorage.setItem('sound_status_circus', 1);
		}
	};
}

export default PopupOptions;