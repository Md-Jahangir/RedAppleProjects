export default class GameError extends Phaser.Scene {
    constructor() {
        super("GameError");
    }
    //#region -Create
    create() {
        this.gameErrorText = this.add.text(window.innerWidth / 2, window.innerHeight / 2, "Error!", { fontFamily: "LILITAONE", fontSize: 75 })
            .setOrigin(0.5);
    }
    //#endregion
}