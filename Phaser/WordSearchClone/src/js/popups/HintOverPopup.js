import { Constant } from "../Constant";
import { Align } from "../util/align";
import { Base } from "../util/base";

class HintOverPopup {

    constructor(scene) {
        this.scene = scene;
    }

    CreateHintOverPopup() {

        this.bg = Base.placeImage(this.scene, 'bg_' + Constant.bgTheme, false, { _oX: 0, _oY: 0 }, 0, 0);
        this.bg.setDisplaySize(Constant.game.config.width, Constant.game.config.height);
        this.bg.setVisible(false);

        let hintText = this.scene.add.text(Constant.game.config.width / 2, Constant.game.config.height / 2, 'Hint Over', { fontFamily: 'FredokaOne-Regular', fontSize: 100, color: '#e81313' }).setOrigin(0.5);

        setTimeout(() => {
            hintText.setVisible(false);
        }, 1500);


    }
}

export default HintOverPopup;