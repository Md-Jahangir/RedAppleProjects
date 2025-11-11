import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
class SplashScene extends Phaser.Scene {
    constructor() {
        super("splash-loader");
    }
    preload() {
        // this.load.image("play_button", "assets/images/" + SelectedResolution.path + "/loading/play_button.png");
        // this.load.image("checkbox", "assets/images/" + SelectedResolution.path + "/loading/checkbox.png");
        // this.load.image("tick", "assets/images/" + SelectedResolution.path + "/loading/tick.png");
        // this.load.setPath("assets/images/" + SelectedResolution.path + "/spines/");
        // this.load.spine("splash_logo_spine", "splash_logo_spine/title_art_exterior.json", "splash_logo_spine/title_art_exterior.atlas");
        // this.load.spine("exterior_bg_spine", "exterior_bg/bg_exterior.json", "exterior_bg/bg_exterior.atlas");
        // this.load.setPath("");
    }
    create() {
        this.config = this.cache.json.get("resolution-config");
        this.exteriorBg = this.add.spine(this.scale.width / 2, 0, "exterior_bg_spine");
        this.exteriorBg.play('animation', true);
        this.background = this.add.image(0, 0, "loading_bg").setOrigin(0);
        this.background.setAlpha(0.5)
        this.logo = this.add.spine(this.scale.width / 2, 0, "splash_logo_spine");
        this.logo.play('appear', true);
        this.logo.once('complete', () => {
            this.logo.play('idle', true);
        })

        this.playButton = this.add.image(this.scale.width / 2, 0, 'play_button').setInteractive({ useHandCursor: true })
        this.checkBox = this.add.image(this.scale.width / 2, 0, 'checkbox').setInteractive({ useHandCursor: true })
        this.tick = this.add.image(this.scale.width / 2, 0, 'tick').setVisible(false).setInteractive({ useHandCursor: true });
        this.tickBoxText = this.add.text(
            0,
            0,
            "DON'T SHOW NEXT TIME", {
            fontFamily: "Bahnschrift Condensed",
            fontStyle: "bold",
            fontSize: this.config.loading.text.fontSize,
            color: '#fff'
        }
        ).setOrigin(0, 0.5);
        this.resize(window.innerWidth, window.innerHeight);

        this.checkBox.on('pointerup', this.CheckBoxClicked, this);
        this.tick.on('pointerup', this.TickBoxClicked, this);
        this.playButton.on('pointerup', this.PlayButtonClicked, this);
    }
    CheckBoxClicked() {
        this.tick.setVisible(true);
        localStorage.setItem('checkbox_selected', true);
    }
    TickBoxClicked() {
        this.tick.setVisible(false);
        localStorage.setItem('checkbox_selected', false);
    }
    PlayButtonClicked() {
        this.playButton.setVisible(false);
        this.logo.play('disappear', false);
        this.logo.once('complete', () => {
            this.scene.start("game-main");
        })

    }
    resize(newWidth, newHeight) {
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        this.background.setDisplaySize(SelectedResolution.width, SelectedResolution.height);
        this.exteriorBg.width = newWidth;
        this.exteriorBg.height = newHeight
        this.exteriorBg.setPosition(newWidth / 2, newHeight / 2);
        this.logo.setScale(newScale);
        this.logo.setPosition(newWidth / 2, newHeight / 2);
        this.playButton.setScale(newScale);
        this.playButton.setPosition(newWidth / 2, newHeight - this.config.loading.playbtn.y);
        this.checkBox.setScale(newScale);
        this.checkBox.setPosition(newWidth / 2 - this.config.loading.checkBox.x, newHeight - this.config.loading.checkBox.y);
        this.tick.setScale(newScale);
        this.tick.setPosition(this.checkBox.x, this.checkBox.y);
        this.tickBoxText.setScale(newScale);
        this.tickBoxText.setPosition(this.tick.x + this.config.loading.tick.stepX, this.tick.y);
    }
}
export default SplashScene;