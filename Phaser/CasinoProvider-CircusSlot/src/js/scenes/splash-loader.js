import { SelectedResolution } from "../resolution-selector";
import { getScale } from "../utils";
class SplashScene extends Phaser.Scene {
    constructor() {
        super("splash-loader");
    }
    preload() {

    }
    create() {
        this.game.events.on("resize", this.resize, this);
        this.config = this.cache.json.get("resolution-config");
        this.exteriorBg = this.add.spine(this.scale.width / 2, 0, "animation-bg");
        this.exteriorBg.play('animation', true);

        this.logo = this.add.spine(this.scale.width / 2, 0, "title_art_animation");
        this.logo.play('appear', true);
        this.logo.on('complete', () => {
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

        this.checkBox.on('pointerup', this.CheckBoxClicked, this);
        this.tick.on('pointerup', this.TickBoxClicked, this);
        this.playButton.on('pointerup', this.PlayButtonClicked, this);
        this.resize(window.innerWidth, window.innerHeight);
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
        this.logo.play('disappear', true);
        this.logo.once('complete', () => {
            this.logo.setVisible(false);
            // this.scene.stop("splash-loader");
            this.scene.start("game-main");
        })

    }
    resize(newWidth, newHeight) {
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        this.exteriorBg.width = newWidth * newScale;
        this.exteriorBg.height = newHeight * newScale;
        this.exteriorBg.setPosition(newWidth / 2, newHeight / 2);
        this.logo.width = newWidth * newScale;
        this.logo.height = newHeight * newScale;
        this.logo.setPosition(newWidth / 2, newHeight / 2 - this.config.loading.logo.offsetY);
        this.playButton.setScale(newScale);
        this.playButton.setPosition(this.logo.x, this.logo.y + this.config.loading.playbtn.y);
        this.checkBox.setScale(newScale);
        this.checkBox.setPosition(this.config.loading.checkBox.x * newScale, newHeight - this.config.loading.checkBox.y * newScale);
        this.tick.setScale(newScale);
        this.tick.setPosition(this.checkBox.x, this.checkBox.y);
        this.tickBoxText.setScale(newScale);
        this.tickBoxText.setPosition(this.checkBox.x + this.config.loading.tickBoxText.stepX, this.checkBox.y);
    }
}
export default SplashScene;