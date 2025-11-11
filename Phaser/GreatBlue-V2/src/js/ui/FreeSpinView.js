import { Model } from "../Model.js";
import { Constant } from "../Constant.js";

class FreeSpinView {
    constructor(scene) {
        this.scene = scene;
        this.freeSpinTitle = null;
        this.gamesLeftTitle = null;
        this.multipliedTitle = null;

        this.create();

        this.scene.game.events.on("evtFreeSpinShow", this.UpdateFreeSpins, this);

    };
    create() {
        // this.gamesLeftTitle = this.scene.add.image(this.freeSpinTitle.x + Math.round(game.config.width / 4.27) * currentRatio, 5, "games_left_title").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        // let gamesLeftTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '55px', fill: '#000', fontStyle: 'bold', align: 'center' };
        // this.gamesLeftText = this.scene.add.text(this.gamesLeftTitle.x, this.gamesLeftTitle.y + (Math.round(game.config.height / 15)), "1", gamesLeftTextStyle).setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        this.freeSpinTitle = this.scene.add.image(Math.round(Constant.game.config.width / 2), (10 * Constant.scaleFactorY), "free_spin_heading").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        // this.multipliedTitle = this.scene.add.image(this.freeSpinTitle.x - Math.round(game.config.width / 4.8), 0 * Constant.scaleFactorY, "multiplied_title").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        let multipliedTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '50px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.multipliedText = this.scene.add.text(this.freeSpinTitle.x - 360 * Constant.scaleFactorX, this.freeSpinTitle.y + 53 * Constant.scaleFactorY, "11", multipliedTextStyle).setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        // this.gamesLeftTitle = this.scene.add.image(this.freeSpinTitle.x + Math.round(game.config.width / 4.8), 0 * Constant.scaleFactorY, "games_left_title").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        let gamesLeftTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '50px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.gamesLeftText = this.scene.add.text(this.freeSpinTitle.x + 360 * Constant.scaleFactorX, this.freeSpinTitle.y + 51 * Constant.scaleFactorY, "11", gamesLeftTextStyle).setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        this.HideFreeSpinView();
    };

    HideFreeSpinView() {
        this.freeSpinTitle.setVisible(false);
        // this.gamesLeftTitle.setVisible(false);
        // this.multipliedTitle.setVisible(false);
        this.gamesLeftText.setVisible(false);
        this.multipliedText.setVisible(false);
    }

    ShowFreeSpinView() {
        this.freeSpinTitle.setVisible(true);
        // this.gamesLeftTitle.setVisible(true);
        // this.multipliedTitle.setVisible(true);
        this.gamesLeftText.setVisible(true);
        this.multipliedText.setVisible(true);
    }

    SetGameLeftText(_newValue) {
        this.gamesLeftText.setText(_newValue);
    }

    SetMutlipliedText(_newValue) {
        this.multipliedText.setText(_newValue);
    }

    UpdateFreeSpins(_gamesLeftValue, _multiplierValue) {
        // console.log("game left: ", _gamesLeftValue);
        // console.log("multiplied: ", _multiplierValue);
        this.SetGameLeftText(_gamesLeftValue);
        this.SetMutlipliedText(_multiplierValue);
    }

}

export default FreeSpinView;