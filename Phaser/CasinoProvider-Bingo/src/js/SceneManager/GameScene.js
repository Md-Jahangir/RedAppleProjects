import { Constant } from "../Constant";
import { Utils } from "../Utils";
import GameUI from "../GameUiManager/GameUI";
import { SelectedResolution } from "../ResolutionSelector";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
        console.log('------game ');
        this.selectedNumber = null;
        this.selectedNumberOfCards = null;
        this.isDrawStarted = false;
    }

    init() {

    }
    create(selectedData) {
        this.game.events.on("resize", this.Resize, this);
        this.BackGround();
        this.gameUi = new GameUI(this, selectedData.selectedNumberOfCards, selectedData.selectedNumber);
        this.Resize(window.innerWidth, window.innerHeight);
    }
    BackGround() {
        this.gameBackGround = this.add.image(0, 0, "bg_game").setOrigin(0);
    }
    Resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        this.gameBackGround.setDisplaySize(newWidth, newHeight);
        this.gameUi.Resize(newWidth, newHeight, newScale);

    }
}