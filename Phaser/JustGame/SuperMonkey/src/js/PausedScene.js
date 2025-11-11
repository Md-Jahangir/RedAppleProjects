import { AlignGrid } from "./util/alignGrid.js";
import GameUI from "./GameUI.js";
import { Server } from "./Server.js";
import { Constant } from "./Constant.js";

export default class PausedScene extends Phaser.Scene {
    constructor() {

        super('PausedScene');

    }
    init() {

        // console.log("scene.key", data.sceneKeyManager);
        this.gameUI = new GameUI(this);

    }

    create(data) {

        this.AddAlignGrid();
        this.ShowQuitPopup(data.sceneKeyManager, data.timer);

    }

    AddAlignGrid() {

        this.aGrid = new AlignGrid({
            scene: this,
            rows: 19,
            cols: 19
        });
        // this.aGrid.showNumbers();
    }

    ShowQuitPopup(_sceneKey, _timer) {

        this.gameUI.CreateQuitUI();

        // console.log(_sceneKey);

        this.OnInteractionWithButtons(_sceneKey, _timer);

    }

    OnInteractionWithButtons(_sceneKey, _timer) {


        // console.log(_sceneKey);

        this.gameUI.buttons.yesBtn.on('pointerup', () => {

            // _timer.remove();
            // _sceneKey.CallScoreSendAPI();
            const currentTimeStamp = Date.now();
            const finalTime = currentTimeStamp - Constant.gameStartTime;
            // Server.PostGameQuitToParent(finalTime / 1000, Constant.score);
            this.scene.stop();
            this.scene.stop(_sceneKey);
            this.scene.start('TitleScene');

        });

        this.gameUI.buttons.noBtn.on('pointerup', () => {

            this.scene.stop();
            this.scene.resume(_sceneKey);

        });

    }

}