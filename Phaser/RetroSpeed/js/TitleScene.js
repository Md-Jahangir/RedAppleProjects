import Background from "./Background.js";
import Player from "./Player.js";
import GameUI from "./GameUI.js";
import { Audiomanager } from "./Audiomanager.js";
export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }
    init() {
        this.backGround = new Background(this);
        this.player = new Player(this);
        this.gameUI = new GameUI(this);
        // this.audio = new Audiomanager(this);
    }
    create() {
        this.ShowBG();
        this.ShowPlayer();
        this.TitleScreenUI();
    }
    ShowBG() {
        this.backGround.CreateBG();
        // console.log(randomNumber);
    }
    MoveBG() {
        if (randomNumber == 0) {
            this.backGround.bgOne.tilePositionY -= 5;
        }
        if (randomNumber == 1) {
            this.backGround.bgTwo.tilePositionY -= 5;
        }
        if (randomNumber == 2) {
            this.backGround.bgThree.tilePositionY -= 5;
        }
    }
    ShowPlayer() {
        this.player.CreatePlayer();
    }
    TitleScreenUI() {
        this.gameUI.CreateTitleUI();
    }
    update() {
        this.MoveBG();
    }
}