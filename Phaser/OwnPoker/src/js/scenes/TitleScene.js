import Phaser from "phaser";
import { Constant } from "../Constant.js";
import { SelectedResolution } from "../ResolutionSelector.js";
import { Utils } from "../Utils.js";
import Button from "../ui/Button.js";
import Text from "../ui/Text.js";

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
    }

    create() {
        this.game.events.on("resize", this.resize, this);
        this.menuBg = this.add.image(0, 0, "background").setOrigin(0);

        this.playButton = new Button(this, Math.round(this.scale.width / 2), Math.round(this.scale.height / 2), "play_button");
        this.playButton.setClickCallback(this.OnPlayButtonClicked, this);

        this.playButtonText = new Text(this, this.playButton.x, this.playButton.y, {
            text: Constant.PLAY_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "50px",
            fontStyle: "bold",
            color: "#ffffff",
            align: "center",
            wordWrap: {},
            shadow: {},
        }
        );

        this.resize(window.innerWidth, window.innerHeight);
    };

    OnPlayButtonClicked() {
        this.playButtonText.TextScaleTween();
        this.scene.stop('TitleScene');
        this.scene.start("GameScene");
    };

    resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

        this.menuBg.setDisplaySize(newWidth, newHeight);

        this.playButton.setScale(newScale);
        this.playButton.setPosition(newWidth / 2, newHeight / 2);

        this.playButtonText.setScale(newScale);
        this.playButtonText.setPosition(this.playButton.x, this.playButton.y);

    };


}