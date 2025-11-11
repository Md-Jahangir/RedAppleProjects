// import { ButtonScaleDownTween, ButtonScaleUpTween } from "../Utils.js"
import { Constant } from "../Constant.js";
import { ButtonScaleDownTween } from "../Utils.js";
import { ButtonScaleUpTween } from "../Utils.js";

class AutoPlay {
    constructor(scene) {
        this.scene = scene;
        this.numberOfAutoPlay = 0;
        // this.autoPlayNumberPosition = [
        //     { x: -335, y: -187 },
        //     { x: -166, y: -187 },
        //     { x: 0, y: -187 },
        //     { x: 165, y: -187 },
        //     { x: 330, y: -187 },
        //     { x: 0, y: -110 }
        // ];

        this.autoPlayBoxPosition = [
            { x: -335, y: -187 },
            { x: -166, y: -187 },
            { x: 0, y: -187 },
            { x: 165, y: -187 },
            { x: 330, y: -187 },
            { x: 0, y: -110 }
        ];


        this.buttonValueArray = ["5", "10", "25", "50", "100", "∞"];
        this.buttonValue = 5;
    };

    CreateAlertPopup() {
        // var sizer = new ScrollBar(this.scene, Constant.game.config);
        // this.scene.add.existing(sizer); 
        this.autoPlayContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactorX, Constant.scaleFactorX);
        let overlay = this.scene.add.image(0, 0, "one_pixel_black").setScale(5000);
        overlay.alpha = 0.85;
        overlay.setInteractive();
        overlay.on("pointerdown", this.OverlayPressed, this);

        let base = this.scene.add.image(0, 0, "autoplay_settings");

        let crossButton = this.scene.add.image(480, -292, "button_close_settings").setOrigin(0.5);
        crossButton.setInteractive({ useHandCursor: true });
        crossButton.on("pointerdown", this.CrossButtonPressed, this);
        crossButton.on("pointerup", this.CrossButtonReleased, this);

        this.autoPlayContainer.add(overlay);
        this.autoPlayContainer.add(base);
        this.autoPlayContainer.add(crossButton);
        let messageTextStyle = { fontFamily: 'PR-Viking', fontSize: '60px', fill: '#000', fontStyle: 'normal', align: 'center', wordWrap: { width: this.autoPlayContainer.list[1].width - 40 } };
        let titleText = this.scene.add.text(0, -285, "AUTOPLAY SETTINGS", messageTextStyle).setOrigin(0.5);


        let singleWinLimitTextStyle = { fontFamily: 'PR-Viking', fontSize: '30px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.autoPlayContainer.list[1].width - 40 } };
        let limitTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '30px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.autoPlayContainer.list[1].width - 40 } };

        let singleWinLimitText = this.scene.add.text(-295, 35, "SINGLE WIN LIMIT", singleWinLimitTextStyle).setOrigin(0.5);
        let singleWinLimitValueText = this.scene.add.text(-295, 130, "FUN 0.00", limitTextStyle).setOrigin(0.5);
        let winLimitText = this.scene.add.text(10, 35, "WIN LIMIT", singleWinLimitTextStyle).setOrigin(0.5);
        let winLimitValueText = this.scene.add.text(10, 130, "FUN 0.00", limitTextStyle).setOrigin(0.5);
        let lossLimitText = this.scene.add.text(305, 35, "LOSS LIMIT", singleWinLimitTextStyle).setOrigin(0.5);
        let lossLimitValueText = this.scene.add.text(305, 130, "FUN 0.00", limitTextStyle).setOrigin(0.5);

        //================================================================================================================
        this.CreationOfButton();
        this.autoPlayContainer.add(titleText);
        this.autoPlayContainer.add(singleWinLimitText);
        this.autoPlayContainer.add(singleWinLimitValueText);
        this.autoPlayContainer.add(winLimitText);
        this.autoPlayContainer.add(winLimitValueText);
        this.autoPlayContainer.add(lossLimitText);
        this.autoPlayContainer.add(lossLimitValueText);

        this.autoPlayContainer.setDepth(2);
        // this.NumberFiveTextImageReleased();
        this.autoPlayContainer.alpha = 0;

        const COLOR_PRIMARY = 0x4e342e;
        const COLOR_LIGHT = 0xffffff;
        const COLOR_DARK = 0x260e04;
        //# horizontal scroll bar
        let singleWinLimitScroller = this.scene.rexUI.add.scrollBar({
            width: 240,
            orientation: 'x',
            slider: {
                thumb: this.scene.add.image(330, -187, "rock_single_winLimit"),//this.scene.rexUI.add.roundRectangle(0, 0, 40, 20, 10, COLOR_LIGHT),
            },
        }).setPosition(-310, 218)
            .layout();
        singleWinLimitScroller.on('valuechange', (newValue, oldValue, scrollBar) => {
            singleWinLimitValueText.text = "FUN " + parseInt(newValue * 100).toFixed(2);
        })
        this.autoPlayContainer.add(singleWinLimitScroller)

        let winLimitScroller = this.scene.rexUI.add.scrollBar({
            width: 240,
            orientation: 'x',
            slider: {
                thumb: this.scene.add.image(330, -187, "rock_single_winLimit"),//this.scene.rexUI.add.roundRectangle(0, 0, 40, 20, 10, COLOR_LIGHT),
            },
        }).setPosition(-10, 218)
            .layout();

        winLimitScroller.on('valuechange', (newValue, oldValue, scrollBar) => {
            winLimitValueText.text = "FUN " + parseInt(newValue * 100).toFixed(2);
        })
        this.autoPlayContainer.add(winLimitScroller)

        let lossLimitScroller = this.scene.rexUI.add.scrollBar({
            width: 240,
            orientation: 'x',
            slider: {
                thumb: this.scene.add.image(330, -187, "rock_single_winLimit"),//this.scene.rexUI.add.roundRectangle(0, 0, 40, 20, 10, COLOR_LIGHT),
            }
        }).setPosition(290, 218)
            .layout();
        lossLimitScroller.on('valuechange', (newValue, oldValue, scrollBar) => {
            lossLimitValueText.text = "FUN " + parseInt(newValue * 100).toFixed(2);
        })
        this.autoPlayContainer.add(lossLimitScroller)
    };
    // CreationOfButton() {
    //     const limitTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '30px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.autoPlayContainer.list[1].width - 40 } };
    //     // console.log('this.autoPlayNumberPosition : ', this.autoPlayNumberPosition);
    //     for (let i = 0; i < this.autoPlayNumberPosition.length; i++) {
    //         let buttonTextContainer = this.scene.add.container(0, 0);
    //         let buttonTextImage = this.scene.add.image(this.autoPlayNumberPosition[i].x, this.autoPlayNumberPosition[i].y, 'button_selection').setOrigin(0.5);
    //         let buttonValueText = this.scene.add.text(this.autoPlayNumberPosition[i].x, this.autoPlayNumberPosition[i].y, this.buttonValueArray[i], limitTextStyle).setOrigin(0.5);
    //         buttonTextImage.setAlpha(0.001);
    //         buttonTextContainer.add(buttonTextImage);
    //         buttonTextContainer.add(buttonValueText);
    //         // console.log('this.buttonTextContainer : ', buttonTextContainer);
    //         buttonTextImage.setInteractive({ useHandCursor: true });
    //         buttonTextImage.on("pointerdown", (pointer, x, y, event) => this.OnButtonImagePressed());
    //         buttonTextImage.on("pointerup", (pointer, x, y, event) => this.OnButtonImageReleased(buttonTextContainer));
    //         this.autoPlayContainer.add(buttonTextContainer);
    //         // this.autoPlayContainer.add(buttonTextContainer);
    //         this.autoPlayContainer.list[3].list[0].setAlpha(1);
    //     }
    // };

    CreationOfButton() {
        const limitTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '30px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.autoPlayContainer.list[1].width - 40 } };
        // console.log('this.autoPlayNumberPosition : ', this.autoPlayNumberPosition);
        for (let i = 0; i < this.autoPlayBoxPosition.length; i++) {
            let buttonTextContainer = this.scene.add.container(0, 0);
            let buttonTextImage = this.scene.add.image(this.autoPlayBoxPosition[i].x, this.autoPlayBoxPosition[i].y, 'button_selection').setOrigin(0.5);
            let buttonValueText = this.scene.add.text(this.autoPlayBoxPosition[i].x, this.autoPlayBoxPosition[i].y - 4, this.buttonValueArray[i], limitTextStyle).setOrigin(0.5);
            buttonTextImage.setAlpha(0.001);
            buttonTextContainer.add(buttonTextImage);
            buttonTextContainer.add(buttonValueText);

            buttonTextImage.setInteractive({ useHandCursor: true });
            buttonTextImage.on("pointerdown", (pointer, x, y, event) => this.OnButtonImagePressed());
            buttonTextImage.on("pointerup", (pointer, x, y, event) => this.OnButtonImageReleased(buttonTextContainer));
            this.autoPlayContainer.add(buttonTextContainer);

            this.autoPlayContainer.list[3].list[0].setAlpha(1);
        }
    };


    OnButtonImagePressed() {
    };
    OnButtonImageReleased(_buttonTextContainer) {
        // console.log('OnButtonImageReleased : ', _buttonTextContainer);
        this.ResetAllButtonImage();
        _buttonTextContainer.list[0].setAlpha(1);
        this.buttonValue = _buttonTextContainer.list[1]._text;
        // console.log('buttonValue : ', this.buttonValue);
    };
    ResetAllButtonImage() {
        this.autoPlayContainer.list[3].list[0].setAlpha(0.001);
        this.autoPlayContainer.list[4].list[0].setAlpha(0.001);
        this.autoPlayContainer.list[5].list[0].setAlpha(0.001);
        this.autoPlayContainer.list[6].list[0].setAlpha(0.001);
        this.autoPlayContainer.list[7].list[0].setAlpha(0.001);
        this.autoPlayContainer.list[8].list[0].setAlpha(0.001);
    };

    CrossButtonPressed() {
        ButtonScaleDownTween(this.scene, this.scene.autoPlayPopup.crossButton, 1);
    };

    CrossButtonReleased() {
        ButtonScaleUpTween(this.scene, this.scene.autoPlayPopup.crossButton, 1);
        this.scene.autoPlayPopup.HideAutoplayPopup();
        this.scene.bottomPanel.betPlusButton.setInteractive({ useHandCursor: true });
        this.scene.bottomPanel.betMinusButton.setInteractive({ useHandCursor: true });
        //-----------------------------------------------------------------
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
        // console.log("scene: ", this.scene)

    };


    //#endregion
    OverlayPressed() { }
    AutoPlayButtonPressed() {
        // console.log('pressed');
    }
    AutoPlayButtonReleased() {
        this.scene.autoPlayPopup.HideAutoplayPopup();
        // console.log('this.bottomPanel.autoPlayButtonStop : ', this.scene.bottomPanel.autoPlayButtonStop)
        // // this.scene.bottomPanel.autoPlayButtonStop.visible = true;
        // this.scene.bottomPanel.stopButton.setVisible(true);
        // this.scene.bottomPanel.DisableButton(this.scene.bottomPanel.autoSpinButton);
        this.autoPlayContainer.list[17].setAlpha(1);
        // this.scene.bottomPanel.betPlusButton.removeInteractive();
        // this.scene.bottomPanel.betMinusButton.removeInteractive();
        // console.log('released', this.buttonValue);
        // console.log('----------------------------->', this.bottomPanel);
        // Constant.game.events.emit("evtAutoGameStarted", this.buttonValue);
    }
};
export default AutoPlay;