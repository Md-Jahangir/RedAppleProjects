import { Utils } from "./Utils";

export default class ErrorScene extends Phaser.Scene {
    constructor() {
        super("ErrorScene");
        this.errorMessage = "Sorry ! Timer value not found...";
    }
    create() {
        console.log('error scene');
        this.game.events.on("resize", this.resize, this);
        this.errorText = this.add.text(0, 0, this.errorMessage, { fontFamily: "Poppins-Bold", fontSize: 50 }).setOrigin(0.5);
        this.resize(window.innerWidth, window.innerHeight);
    }
    resize(newWidth, newHeight) {
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.errorText.setScale(newScale);
        this.errorText.setPosition(newWidth / 2, newHeight / 2);
    }
}
