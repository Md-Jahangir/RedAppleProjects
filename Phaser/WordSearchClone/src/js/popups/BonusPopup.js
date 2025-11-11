import { Constant } from "../Constant";
import { Align } from "../util/align";
import { Base } from "../util/base";

class BonusPopup {

    constructor(scene) {
        this.scene = scene;

        this.bonusContainer = null;

        this.CreateToast();
    }
    CreateToast() {
        let toastTween = null;

        let textStr = '';
        let textStyle = {
            fontFamily: 'FredokaOne-Regular', fontSize: 80, color: '#ffffff',
        };
        this.toastTxt = Base.placeText(this.scene, textStr, { x: Constant.game.config.width / 2, y: Constant.game.config.height / 2 }, textStyle).setOrigin(0.2, 0.2).setScale(Constant.scaleFactor).setVisible(false);
    }
    BonusToast(_bonusScore, _x, _y) {
        this.toastTxt.setPosition(_x, _y);
        this.toastTxt.setVisible(true);
        this.toastTxt.setText('+' + _bonusScore);

        let toastTween = this.scene.tweens.add({

            targets: this.toastTxt,
            y: - Constant.game.config.width / 1,
            alpha: 1,
            duration: 2000,
            depth: 22,
            onComplete: () => {
                // this.RemoveToastFromScreen();
                this.toastTxt.setPosition(Constant.game.config.width / 2, Constant.game.config.height / 2);
                this.toastTxt.setVisible(false);
                // this.toastTxt.setAlpha(1)
            }
        });
    }
    RemoveToastFromScreen() {
        let toastTween = this.scene.tweens.add({
            targets: this.toastTxt,
            y: - Constant.game.config.width / 3,
            alpha: 0,
            duration: 800,
            onComplete: () => {

            }
        });
    }
    ShowBonusPopup() {
        this.bg.setVisible(true);
        this.bonusContainer.setVisible(true);
    }
    HideBonusPopup() {
        this.bg.setVisible(false);
        this.bonusContainer.setVisible(false);
    }
    ShowBonusToast() {

    }
}

export default BonusPopup;