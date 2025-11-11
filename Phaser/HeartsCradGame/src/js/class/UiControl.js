
import { Constant } from "../Constant";
import Image from "../objectclass/Image";
import Text from "../objectclass/Text";
import Button from "./Button";

export default class UiControl {
    constructor(scene) {
        this.scene = scene;
        this.create();
    }
    create() {
        this.passingCardArrow = new Image(this.scene, 0, 0, 'arrow');
        this.passingCardArrow.setVisible(false);
        let textureKeys = ["play_button_normal", "play_button_hover", "play_button_disabled"];
        this.passButton = new Button(this.scene, 0, 0, textureKeys);
        this.passButton.setClickCallback(this.PassButtonFunc, this, null);
        let passButstyle = { fontFamily: "Poppins-Bold", fontSize: 40 };
        this.passButText = new Text(this.scene, 0, 0, "Pass", passButstyle);
        this.passButText.setOrigin(0.5);
        let waitPassstyle = { fontFamily: "Poppins-Bold", fontSize: 40 };
        this.waitPassText = new Text(this.scene, 0, 0, "Wait for Other Player Pass", waitPassstyle);
        this.waitPassText.SetVisible(false);
        this.waitPassText.setOrigin(0.5);
        this.PassButtonVisible(false);
    }
    PassButtonFunc() {
        this.PassButtonVisible(false);
        this.scene.allPlayerArray[0].userCardsInstance.isThreeCardPass = true;
        this.waitPassText.SetVisible(true);
        this.arrowTween.remove();
        this.passingCardArrow.setVisible(false);
        setTimeout(() => {
            for (let index = 1; index < this.scene.allPlayerArray.length; index++) {
                this.scene.allPlayerArray[index].userCardsInstance.TempOponentCardSelectforPass();
            }
        }, 1000)
        this.scene.AllPlayerThreeCardPass();
    }
    PassButtonVisible(isTrue) {
        this.passButton.setVisible(isTrue);
        this.passButText.SetVisible(isTrue);
    }
    PassCardsPopUp(angle, _x, _y) {
        this.passingCardArrow.setVisible(true).setAngle(angle);
        this.arrowTween = this.scene.tweens.add({
            targets: this.passingCardArrow,
            duration: 500,
            props: {
                x: {
                    value: _x,
                },
                y: {
                    value: _y,
                },
            },
            yoyo: true,
            ease: "Linear",
            repeat: -1,
        });
    }

    Resize(newWidth, newHeight, newScale) {
        this.passingCardArrow.SetScale(newScale);
        this.passingCardArrow.SetPosition(newWidth / 2, newHeight / 2);
        this.passButton.SetScale(newScale);
        this.passButton.SetPosition(newWidth / 2, newHeight / 2 + 100 * newScale);
        this.passButText.SetScale(newScale);
        this.passButText.SetPosition(this.passButton.x, this.passButton.y);
        this.waitPassText.SetScale(newScale);
        this.waitPassText.SetPosition(this.passButton.x, this.passButton.y);
    }
}