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
        if (window.innerWidth > window.innerHeight) {
            let clientHeight = window.innerHeight;
            let clientWidth = (clientHeight / 1.77777777778);
            this.resize(clientWidth, clientHeight, (window.innerWidth / 2) - (clientWidth / 2));
        }
        else {
            let clientWidth = window.innerWidth;
            let clientHeight = window.innerHeight;
            this.resize(clientWidth, clientHeight, 0);
        }
    }
    resize(newWidth, newHeight, offsetWidth) {
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.errorText.setScale(newScale);
        this.errorText.setPosition(newWidth / 2, newHeight / 2);

        const camera = this.cameras.main;
        camera.x = offsetWidth;
        // camera.setBounds(0, 0, newWidth, newHeight);
        camera.setViewport(offsetWidth, 0, newWidth, newHeight);
    }
}
