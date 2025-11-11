// import { ButtonScaleDownTween, ButtonScaleUpTween } from "../Utils.js"
import { Constant } from "../Constant.js";
import { SoundManager } from "../SoundManager.js";
import { ButtonScaleDownTween } from "../Utils.js";
import { ButtonScaleUpTween } from "../Utils.js";

class AutoPlay {
    constructor(scene) {
        this.scene = scene;
        this.numberOfAutoPlay = 0;
        this.autoPlayNumberPosition = [
            { x: -365, y: 0 },
            { x: -185, y: 0 },
            { x: -5, y: 0 },
            { x: 175, y: 0 },
            { x: 355, y: 0 },
            { x: 0, y: 100 }
        ];
        this.buttonValueArray = ["5", "10", "25", "50", "100", "500"];
        this.buttonValue = 5;

        this.limitButtonArray = [];
    };

    CreateAutoPopup() {
        this.autoPlayContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorX);
        this.overlay = this.scene.add.image(0, 0, "one_pixel_black").setScale(5000);
        this.overlay.alpha = 0.85;
        this.overlay.setInteractive();
        this.overlay.on("pointerdown", this.OverlayPressed, this);

        this.base = this.scene.add.image(0, 0, "autoplay_base");
        this.autoplayTitleText = this.scene.add.image(0, -150, 'autoplay_title_text');

        this.crossButton = this.scene.add.image(480, -225, "button_close_settings").setOrigin(0.5);
        this.crossButton.setInteractive({ useHandCursor: true });
        this.crossButton.on("pointerdown", this.CrossButtonPressed, this);
        this.crossButton.on("pointerup", this.CrossButtonReleased, this);

        this.autoPlayContainer.add([this.overlay, this.base,  this.autoplayTitleText, this.crossButton]);
        this.CreateLimitButton();
        this.autoPlayContainer.setDepth(5);
        this.autoPlayContainer.alpha = 0;

    

    };
    CreateLimitButton() {
        for (let i = 0; i < this.autoPlayNumberPosition.length; i++) {
            let limitButtonContainer = this.scene.add.container(0, 0);
            let buttonTextImage = this.scene.add.image(this.autoPlayNumberPosition[i].x, this.autoPlayNumberPosition[i].y, 'button_selection_normal');
            buttonTextImage.setInteractive({ useHandCursor: true });
            buttonTextImage.on("pointerdown", (pointer, x, y, event) => this.OnButtonImagePressed());
            buttonTextImage.on("pointerup", (pointer, x, y, event) => this.OnButtonImageReleased(limitButtonContainer));
            let limitTextStyle = { fontFamily: 'kingsandpirates-peak', fontSize: '34px', fill: '#fbe73b', fontStyle: 'bold', align: 'center', wordWrap: { width: buttonTextImage.width - 40 } };
            let buttonValueText = this.scene.add.text(buttonTextImage.x, buttonTextImage.y , this.buttonValueArray[i], limitTextStyle).setOrigin(0.5);
            limitButtonContainer.add([buttonTextImage, buttonValueText]);
            this.limitButtonArray.push(limitButtonContainer);

            this.autoPlayContainer.add(limitButtonContainer);
        }
    };
    OnButtonImagePressed() {
    };
    OnButtonImageReleased(_buttonContainer) {
        this.ScaleSelectedButton(_buttonContainer);
    };
    ScaleSelectedButton(_obj) {
        for (let i = 0; i < this.limitButtonArray.length; i++) {
            this.limitButtonArray[i].list[0].setTexture('button_selection_normal');
        }
        // _obj.list[0].setScale(1.15);
        // _obj.list[1].setScale(1.15);
        _obj.list[0].setTexture('button_selection_glow')
        this.buttonValue = _obj.list[1]._text;
    };



    CrossButtonPressed() {
        ButtonScaleDownTween(this.scene, this.scene.autoPlayPopup.crossButton, 1);
        SoundManager.HidePopup();
    };

    CrossButtonReleased() {
        ButtonScaleUpTween(this.scene, this.scene.autoPlayPopup.crossButton, 1);
        this.scene.autoPlayPopup.HideAutoplayPopup();
        this.scene.bottomPanel.autoplayButton.visible = false;
    };

    ShowAutoplayPopup(_message) {
        this.scene.autoPlayPopup.autoPlayContainer.visible = true;
        let alphaTween = this.scene.add.tween({
            targets: [this.scene.autoPlayPopup.autoPlayContainer],
            alpha: 1,
            ease: 'Linear',
            duration: 200
        });
    };
    HideAutoplayPopup() {
        let alphaTween = this.scene.add.tween({
            targets: [this.scene.autoPlayPopup.autoPlayContainer],
            alpha: 0,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) { }
        });
    };


    OverlayPressed() { }
    AutoPlayButtonPressed() {
    }
    AutoPlayButtonReleased() {
        this.scene.autoPlayPopup.HideAutoplayPopup();
        this.scene.bottomPanel.stopButton.setVisible(true);
        this.scene.bottomPanel.DisableButton(this.scene.bottomPanel.autoSpinButton);
        this.autoPlayContainer.list[17].setAlpha(1);
        Constant.game.events.emit("evtAutoGameStarted", this.buttonValue);
    }
};
export default AutoPlay;