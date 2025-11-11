import { Model } from "../Model.js";
import { Constant } from "../Constant.js";

class FreeSpinPopup {
    constructor(scene, _spinCount, _multiplier) {
        this.scene = scene;
        this.freeSpinPopupContainer = null;
        this.bg = null;
        this.spinHeading = null;
        this.spinAmountText = null;
        this.multiplierHeading = null;
        this.multiplierAmountText = null;
        this.pickShellText = null;
        this.scatterClickCounter = 0;
        this.scatterArray = [];
        this.scatterTextArray = [];
        this.pressedScatterArray = [];
        this.totalSpinCount = _spinCount;
        this.totalMultiplierCount = _multiplier;


        this.scatterPos = [{ x: -680, y: 355 }, { x: -200, y: 355 }, { x: 45, y: 105 }, { x: 315, y: 355 }, { x: 670, y: 105 }];
        this.CreateFreeSpinPopup();

        this.CreateTotalWinPopup();
    };

    CreateFreeSpinPopup() {
        this.scatterClickCounter = 0;
        this.freeSpinPopupContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        this.bg = this.scene.add.image(0, 0, "free_spin_bg").setInteractive();
        this.bg.on("pointerdown", this.OverlayPressed, this);

        let pickShellTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '100px', fill: '#fff', stroke: '#ff8dc8', strokeThickness: 5, fontStyle: 'bold', align: 'center' };
        this.pickShellText = this.scene.add.text(0, -170, "PICK 2 SHELLS", pickShellTextStyle).setOrigin(0.5);
        this.pickShellText.setAlpha(0);


        let amountTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '86px', fill: '#fff', stroke: '#ff8dc8', strokeThickness: 2, fontStyle: 'bold', align: 'center' };
        this.spinHeading = this.scene.add.image(375, -460, "spins_heading");
        this.spinAmountText = this.scene.add.text(this.spinHeading.x, this.spinHeading.y + 80, "0", amountTextStyle).setOrigin(0.5);
        this.multiplierHeading = this.scene.add.image(725, -460, "multiplier_heading");
        this.multiplierAmountText = this.scene.add.text(this.multiplierHeading.x, this.multiplierHeading.y + 80, "0", amountTextStyle).setOrigin(0.5);

        this.freeSpinPopupContainer.add(this.bg);
        this.freeSpinPopupContainer.add(this.pickShellText);
        this.freeSpinPopupContainer.add(this.spinHeading);
        this.freeSpinPopupContainer.add(this.multiplierHeading);
        this.freeSpinPopupContainer.add(this.spinAmountText);
        this.freeSpinPopupContainer.add(this.multiplierAmountText);

        let _this = this;
        for (let i = 0; i < 5; i++) {
            let scatter = this.scene.add.sprite(this.scatterPos[i].x, this.scatterPos[i].y, "scatter_spritesheet")
            scatter.name = i;
            this.scatterArray.push(scatter);
            scatter.setInteractive({ useHandCursor: true });
            scatter.on("pointerdown", (pointer, x, y, event) => _this.ScatterPressed(scatter));

            this.freeSpinPopupContainer.add(scatter);

            let scatterValueTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '95px', fill: '#3ab9ff', stroke: '#1f3bcd', strokeThickness: 5, fontStyle: 'bold', align: 'center' };
            let scatterValueText = this.scene.add.text(this.scatterPos[i].x, this.scatterPos[i].y - 100, "x" + i, scatterValueTextStyle).setOrigin(0.5);
            scatterValueText.setVisible(false);
            scatterValueText.setAlpha(0);
            this.scatterTextArray.push(scatterValueText);
            this.freeSpinPopupContainer.add(scatterValueText);
        }

        this.freeSpinPopupContainer.setDepth(2);
        this.freeSpinPopupContainer.alpha = 0;

        setTimeout(() => {
            this.ShowFreeSpinPopup();
        }, 300);

    }

    ShowPickShellText() {
        this.pickShellText.setVisible(true);
        let pickShellAlphaTween = this.scene.add.tween({
            targets: [this.pickShellText],
            delay: 100,
            alpha: 1,
            ease: 'Linear',
            duration: 200,
        });
    }
    HidePickShellText() {
        this.pickShellText.setVisible(false);
    }

    ShowFreeSpinPopup() {
        this.freeSpinPopupContainer.visible = true;
        let alphaTween = this.scene.add.tween({
            targets: [this.freeSpinPopupContainer],
            alpha: 1,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) {
                this.ShowPickShellText();
            }
        });
    }
    HideFreeSpinPopup() {
        let alphaTween = this.scene.add.tween({
            targets: [this.freeSpinPopupContainer],
            alpha: 0,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) {
                this.DestroySpinPopupContainer();
            }
        });
    }

    DestroySpinPopupContainer() {
        this.freeSpinPopupContainer.destroy();
        delete this;
    }

    ScatterPressed(_this) {
        this.scatterClickCounter++;
        if (this.scatterClickCounter <= 2) {
            if (this.scatterClickCounter == 1) {
                this.SetMultiplierValueWhenClicked(_this.name);
            } else if (this.scatterClickCounter == 2) {
                this.SetSpinValueWhenClicked(_this.name);
            }
            this.scatterArray[_this.name].removeInteractive();
            this.scatterArray[_this.name].play("anim_scatter_open");
            this.scatterArray[_this.name].on("animationcomplete", function () {
                this.scene.reelsView.freeSpinPopup.ShowScatterText(this.scene.reelsView.freeSpinPopup.scatterTextArray[_this.name]);
            });
            this.pressedScatterArray.push(_this.name);
        } else { }

        if (this.scatterClickCounter == 2) {
            this.DeactiveScatterButton();
            this.SetTotalWinText();
            setTimeout(() => {
                this.HidePickShellText();
                this.ShowOtherScatterText()
            }, 900);
        }
    }

    ShowScatterText(_text) {
        _text.setVisible(true);
        let scatterTextAlphaTween = this.scene.add.tween({
            targets: [_text],
            alpha: 1,
            ease: 'Linear',
            duration: 500,
        });
    }

    DeactiveScatterButton() {
        for (let i = 0; i < this.scatterArray.length; i++) {
            this.scatterArray[i].removeInteractive();
        }
    }
    ShowOtherScatterText() {
        let remainingOptionArray = Model.GetRemainingFreeSpinOptions();
        let tempArr = [];
        for (let i = 0; i < this.scatterTextArray.length; i++) {
            if (this.pressedScatterArray[0] != i && this.pressedScatterArray[1] != i) {
                tempArr.push(this.scatterTextArray[i]);
            }
        }
        for (let i = 0; i < tempArr.length; i++) {
            tempArr[i].setText(remainingOptionArray[i]);
            tempArr[i].setStroke('#1f3bcd', 5);
            tempArr[i].setFill('#113951');
            tempArr[i].setVisible(true);
            tempArr[i].setAlpha(1);
            tempArr[i].y += 10;
        }

        setTimeout(() => {
            this.ShowTotalWinPopup();
        }, 1000);
    }

    SetTotalWinText() {
        this.spinAmountText.setText(this.totalSpinCount);
        this.multiplierAmountText.setText(this.totalMultiplierCount);
    }

    SetMultiplierValueWhenClicked(_index) {
        this.scatterTextArray[_index].setText("x" + this.totalMultiplierCount);
    }
    SetSpinValueWhenClicked(_index) {
        this.scatterTextArray[_index].setText(this.totalSpinCount);
    }


    //================================

    CreateTotalWinPopup() {
        this.totalWinPopupContainer = this.scene.add.container(0, 0);

        this.totalWinOverlay = this.scene.add.image(0, 0, "free_spin_overlay");

        this.base = this.scene.add.image(0, 0, "free_spin_popup_base");

        this.youWinHeading = this.scene.add.image(0, -220, "you_win_heading");

        let freeSpinHeadingTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '40px', fill: '#ff0000', stroke: '#ff8dc8', strokeThickness: 1, fontStyle: 'bold', align: 'center' };
        this.totalWinFreeSpinHeading = this.scene.add.text(-140, -100, "FREE SPINS : ", freeSpinHeadingTextStyle).setOrigin(0.5);

        let multiplierHeadingTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '40px', fill: '#ff0000', stroke: '#ff8dc8', strokeThickness: 1, fontStyle: 'bold', align: 'center' };
        this.totalWinMultiplierHeading = this.scene.add.text(-140, 0, "MULTIPLIER : ", multiplierHeadingTextStyle).setOrigin(0.5);

        let totalSpinTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '70px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.totalSpinText = this.scene.add.text(100, -100, this.totalSpinCount, totalSpinTextStyle).setOrigin(0.5);
        this.totalMultiplierText = this.scene.add.text(100, 0, this.totalMultiplierCount, totalSpinTextStyle).setOrigin(0.5);

        this.crossButton = this.scene.add.image(0, 180, "continue_button");
        this.crossButton.setInteractive({ useHandCursor: true });
        this.crossButton.on("pointerdown", this.CrossButtonPressed, this);
        this.crossButton.on("pointerup", this.CrossButtonReleased, this);

        this.totalWinPopupContainer.add(this.totalWinOverlay);
        this.totalWinPopupContainer.add(this.base);
        this.totalWinPopupContainer.add(this.youWinHeading);
        this.totalWinPopupContainer.add(this.totalWinFreeSpinHeading);
        this.totalWinPopupContainer.add(this.totalWinMultiplierHeading);
        this.totalWinPopupContainer.add(this.totalSpinText);
        this.totalWinPopupContainer.add(this.totalMultiplierText);
        this.totalWinPopupContainer.add(this.crossButton);

        this.freeSpinPopupContainer.add(this.totalWinPopupContainer);

        this.totalWinPopupContainer.setDepth(3);
        this.totalWinPopupContainer.setAlpha(0);
        this.totalWinPopupContainer.setVisible(false);

    }
    ShowTotalWinPopup() {
        this.totalWinPopupContainer.visible = true;
        let alphaTween = this.scene.add.tween({
            targets: [this.totalWinPopupContainer],
            alpha: 1,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) { }
        });
    }

    CrossButtonPressed() { }
    CrossButtonReleased() {
        this.HideFreeSpinPopup();
        this.scene.game.events.emit("evtFreeSpinsPopupClosed");
    }

    //=====================================

    OverlayPressed() { }

};
export default FreeSpinPopup