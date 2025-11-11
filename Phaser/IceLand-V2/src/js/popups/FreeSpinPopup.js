import { Constant } from "../Constant";
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

        this.CreateFreeSpinPopup();
    };

    CreateFreeSpinPopup() {
        this.freeSpinPopupContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        this.totalWinOverlay = this.scene.add.image(0, 0, "free_spin_overlay").setInteractive();
        this.totalWinOverlay.on("pointerdown", this.OverlayPressed, this);

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

        this.freeSpinPopupContainer.add(this.totalWinOverlay);
        this.freeSpinPopupContainer.add(this.base);
        this.freeSpinPopupContainer.add(this.youWinHeading);
        this.freeSpinPopupContainer.add(this.totalWinFreeSpinHeading);
        this.freeSpinPopupContainer.add(this.totalWinMultiplierHeading);
        this.freeSpinPopupContainer.add(this.totalSpinText);
        this.freeSpinPopupContainer.add(this.totalMultiplierText);
        this.freeSpinPopupContainer.add(this.crossButton);

        this.freeSpinPopupContainer.setDepth(2);
        this.freeSpinPopupContainer.setAlpha(0);
        this.freeSpinPopupContainer.setVisible(false);

        setTimeout(() => {
            this.ShowFreeSpinPopup();
        }, 300);

    }

    ShowFreeSpinPopup() {
        this.freeSpinPopupContainer.visible = true;
        let alphaTween = this.scene.add.tween({
            targets: [this.freeSpinPopupContainer],
            alpha: 1,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) { }
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

    CrossButtonPressed() { }
    CrossButtonReleased() {
        this.HideFreeSpinPopup();
        this.scene.game.events.emit("evtFreeSpinsPopupClosed");
    }

    //=====================================

    OverlayPressed() { }

};
export default FreeSpinPopup