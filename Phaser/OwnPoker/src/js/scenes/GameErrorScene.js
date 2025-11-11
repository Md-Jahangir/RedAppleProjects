import Phaser from "phaser";
import { SelectedResolution } from "../ResolutionSelector.js";
import { Utils } from "../Utils.js";
import Text from "../ui/Text.js";
import { Constant } from "../Constant.js";

export default class GameErrorScene extends Phaser.Scene {

    constructor() {
        super('GameErrorScene');
        this.errorMessage = "Sorry ! There are some value not found...";
    };

    preload() {
        this.load.image('error_logo', 'assets/images/errorScene/error_logo.png');
    };

    create() {
        this.game.events.on("resize", this.resize, this);

        this.errorLogo = this.add.image(Math.round(this.scale.width / 2), Math.round(this.scale.height / 4), "error_logo").setOrigin(0.5);
        this.errorText = new Text(this, this.errorLogo.x, this.errorLogo.y + 120, {
            text: Constant.ERROR_MSG_TEXT,
            fontFamily: "BAHNSCHRIFT",
            fontSize: "65px",
            fontStyle: "bold",
            color: "#ffffff",
            align: "center",
            wordWrap: { width: this.scale.width - 100 },
            shadow: {},
        }
        );

        this.resize(window.innerWidth, window.innerHeight);
    };

    resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);

        // this.gameplayBg.setDisplaySize(newWidth, newHeight);
        this.errorLogo.setScale(newScale);
        this.errorLogo.setPosition(newWidth / 2, newHeight / 2);

        this.errorText.setScale(newScale);
        this.errorText.setPosition(this.errorLogo.x, this.errorLogo.y + 120 * newScale);

    };

}