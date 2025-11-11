// import { getScale } from "./Module";
import { Constant } from "../Constant";
import { Utils } from "../Utils";
import { SelectedResolution } from "../ResolutionSelector";
class SplashScene extends Phaser.Scene {
    constructor() {
        super("SplashScene");
    }
    preload() {
        this.load.image('splash_bg', 'assets/images/game-ui/bg_splash.png');
        this.load.image('but_play', 'assets/images/game-ui/but_play.png');
        this.load.image('checkbox', 'assets/images/loader/checkbox.png');
        this.load.image('tick', 'assets/images/loader/tick.png');
        // this.load.setPath('assets/images/spines/');
        // this.load.spine('spine_splash', 'craps_splash_export/splash_screen.json', 'craps_splash_export/splash_screen.atlas');
        // this.load.setPath('');
    }
    create() {
        this.game.events.on("resize", this.resize, this);
        this.config = this.cache.json.get("game-config");
        this.exteriorBg = this.add.image(0, 0, "splash_bg").setOrigin(0);
        // this.titleArtSpine = this.add.spine(this.scale.width / 2, this.scale.height / 2, "spine_splash");
        // this.titleArtSpine.play('appear', false);
        // this.titleArtSpine.on('complete', () => {
        //     this.titleArtSpine.play('Ideal', true);
        // })
        this.titleArt = this.add.image(this.scale.width / 2, this.scale.height / 2, "title");
        this.playButton = this.add.image(0, 0, 'but_play').setInteractive({ useHandCursor: true });
        this.playButton.on('pointerup', this.PlayButtonClicked, this);


        this.checkBox = this.add.image(this.scale.width / 2, 0, 'checkbox').setInteractive({ useHandCursor: true })
        this.tick = this.add.image(this.scale.width / 2, 0, 'tick').setVisible(false).setInteractive({ useHandCursor: true });
        this.tickBoxText = this.add.text(
            0,
            0,
            "DON'T SHOW NEXT TIME", {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '20px',
            color: '#fff'
        }
        ).setOrigin(0, 0.5);

        this.checkBox.on('pointerup', this.CheckBoxClicked, this);
        this.tick.on('pointerup', this.TickBoxClicked, this);

        this.resize(window.innerWidth, window.innerHeight);
    }
    CheckBoxClicked() {
        this.tick.setVisible(true);
        localStorage.setItem('checkbox_selected_bingo', true);
    }
    TickBoxClicked() {
        this.tick.setVisible(false);
        localStorage.setItem('checkbox_selected_bingo', false);
    }
    PlayButtonClicked() {
        this.playButton.setVisible(false);
        // this.titleArtSpine.setVisible(false);
        this.scene.stop("SplashScene");
        this.scene.start("CardsSelectionScene");
        this.game.events.off("resize");

    }
    resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        this.exteriorBg.setDisplaySize(newWidth, newHeight);
        this.titleArt.setScale(newScale);
        this.titleArt.setPosition(this.exteriorBg.displayWidth / 2, newHeight / 2 - (this.config.splash.title.y * newScale));
        this.playButton.setScale(newScale);
        this.playButton.setPosition(this.exteriorBg.displayWidth / 2, newHeight - (this.config.splash.play.y * newScale));
        this.checkBox.setScale(newScale);
        this.checkBox.setPosition(this.config.splash.checkBox.x * newScale, newHeight - this.config.splash.checkBox.y * newScale);
        this.tick.setScale(newScale);
        this.tick.setPosition(this.checkBox.x, this.checkBox.y);
        this.tickBoxText.setScale(newScale);
        this.tickBoxText.setPosition(this.checkBox.x + (this.config.splash.tickBoxText.stepX) * newScale, this.checkBox.y);
    }
}
export default SplashScene;