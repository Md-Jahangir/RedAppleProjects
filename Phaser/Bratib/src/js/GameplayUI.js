
import { Constant } from "./Constant";
import { Utils } from "./Utils";
import { SoundManager } from "./SoundManager";

class GameplayUI {
    constructor(scene) {
        this.scene = scene;
        this.gameplayUIContainer = null;
        this.bottomButtonContainer = null;
        this.panelShowingName = "incense";
        this.create();
    };

    create() {
        this.gameplayUIContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2)).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.gameplayUIContainer = this.scene.add.container(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2));
        this.bottomButtonContainer = this.scene.add.container(0, 1520).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // this.CreateBg();
        this.CreateTimerSectionText();
        this.CreateBottomButton();
        this.HideGameplayUI();

    };
    // CreateBg() {
    //     this.gameplayBg = this.scene.add.image(0, 0, "decorate_bg").setOrigin(0.5).setScale(Constant.scaleFactor);
    //     this.gameplayUIContainer.add(this.gameplayBg);
    // };
    // SetBg() {
    //     this.gameplayBg.setTexture("splash_bg");
    // }

    CreateTimerSectionText() {
        let timeLeftTextStyle = { fontFamily: Constant.fontName, fontSize: '43px', fill: '#fff', fontStyle: 'normal', lineSpacing: 10, align: 'center' };
        this.timeLeftHeadingText = this.scene.add.text(0, - 870, Constant.timeLeftText, timeLeftTextStyle).setOrigin(0.5, 0.5);
        let timeTextStyle = { fontFamily: Constant.fontName, fontSize: '105px', fill: '#fff', fontStyle: 'normal', lineSpacing: 10, align: 'center' };
        this.timerText = this.scene.add.text(this.timeLeftHeadingText.x, this.timeLeftHeadingText.y + 100, "00:00", timeTextStyle).setOrigin(0.5, 0.5);
        let selectYourHeadingTextStyle = { fontFamily: Constant.fontName, fontSize: '43px', fill: '#fff', fontStyle: 'normal', lineSpacing: 10, align: 'center' };
        this.selectYourHeadingText = this.scene.add.text(this.timerText.x, this.timerText.y + 155, Constant.selectYourBratibText, selectYourHeadingTextStyle).setOrigin(0.5, 0.5);
        this.lineBase = this.scene.add.image(this.selectYourHeadingText.x, this.selectYourHeadingText.y + 32, "message_line_base").setOrigin(0.5);

        this.gameplayUIContainer.add([this.timeLeftHeadingText, this.timerText, this.lineBase, this.selectYourHeadingText]);
    };
    // CreateTimerSectionText() {
    //     let timeLeftTextStyle = { fontFamily: Constant.fontName, fontSize: '43px', fill: '#fff', fontStyle: 'normal', lineSpacing: 10, align: 'center' };
    //     this.timeLeftHeadingText = this.scene.add.text(0, - 800, Constant.timeLeftText, timeLeftTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor);
    //     let timeTextStyle = { fontFamily: Constant.fontName, fontSize: '105px', fill: '#fff', fontStyle: 'normal', lineSpacing: 10, align: 'center' };
    //     this.timerText = this.scene.add.text(this.timeLeftHeadingText.x, this.timeLeftHeadingText.y + 100, "00:00", timeTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor);
    //     let selectYourHeadingTextStyle = { fontFamily: Constant.fontName, fontSize: '43px', fill: '#fff', fontStyle: 'normal', lineSpacing: 10, align: 'center' };
    //     this.selectYourHeadingText = this.scene.add.text(this.timerText.x, this.timerText.y + 155, Constant.selectYourBratibText, selectYourHeadingTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor);
    //     this.lineBase = this.scene.add.image(this.selectYourHeadingText.x, this.selectYourHeadingText.y + 32, "message_line_base").setOrigin(0.5).setScale(Constant.scaleFactor);

    //     this.gameplayUIContainer.add([this.timeLeftHeadingText, this.timerText, this.lineBase, this.selectYourHeadingText]);
    // };
    ShowTimerText() {
        this.timeLeftHeadingText.setVisible(true);
        this.timerText.setVisible(true);
    }
    HideTimerText() {
        this.timeLeftHeadingText.setVisible(false);
        this.timerText.setVisible(false);
    }

    CreateTimer() {
        this.timedEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: this.UpdateTime,
            callbackScope: this,
            loop: true
        });
    };
    UpdateTime() {
        if (Constant.timeToEnd > 0) {
            Constant.timeToEnd--;
            this.DisplayTimeFormat(Constant.timeToEnd);
        } else {
            this.timedEvent.remove();
            this.scene.contentHolder.HideWater();
            this.HideTimerText();
            this.scene.ShowLanterAndFireworks();
            this.HideSelectYourBratibText();
            this.scene.plate.HidePlateContainer();
            // this.scene.incense.HideIncensePanleContainer();
            // this.scene.candle.HideCandlePanleContainer();
            // this.scene.flower.HideFlowerPanleContainer();

            this.scene.incense.HideAllIncenseObjects();
            this.scene.candle.HideAllCandleObjects();
            this.scene.flower.HideAllFlowerObjects();
            this.scene.HideFloatButton();
            // this.SetBg();
            this.scene.SetGameplayBg();
            this.scene.floatPanel.ShowFloatPanel();
            this.scene.contentHolder.SetFinalBratibPosition();
        }
    };
    DisplayTimeFormat(_time) {
        let minutes = parseInt(_time / 60, 10);
        let seconds = parseInt(_time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        this.timerText.setText(minutes + ":" + seconds);
    }


    HideSelectYourBratibText() {
        this.selectYourHeadingText.setVisible(false);
        this.lineBase.setVisible(false);
    };

    ShowGameplayUI() {
        this.scene.HideLanterAndFireworks();
        this.gameplayUIContainer.setVisible(true);
        this.CreateTimer();
    }
    HideGameplayUI() {
        this.gameplayUIContainer.setVisible(false);

    }

    CreateBottomButton() {
        this.CreateIncenseButton();
        this.CreateCandleButton();
        this.CreateFlowerButton();
        this.gameplayUIContainer.add([this.bottomButtonContainer]);
    };
    ShowBottomButton() {
        let posTween = this.scene.add.tween({
            targets: [this.bottomButtonContainer],
            y: 820,
            ease: 'Linear',
            duration: 300,
            callbackScope: this,
            onComplete: function (tween) {
                this.scene.incense.ShowIncensePanleContainer();
            }
        });
    };
    HideBottomButton() {
        let posTween = this.scene.add.tween({
            targets: [this.bottomButtonContainer],
            y: 1520,
            ease: 'Linear',
            duration: 300,
            callbackScope: this,
            onComplete: function (tween) {

            }
        });
    };

    ActiveInactiveBottomSelectedButton(_obj, _text, _icon) {
        this.incenseButton.setInteractive({ useHandCursor: true });
        this.candleButton.setInteractive({ useHandCursor: true });
        this.flowerButton.setInteractive({ useHandCursor: true });

        this.incenseButton.setTexture("inactive_candle_button_base");
        this.candleButton.setTexture("inactive_candle_button_base");
        this.flowerButton.setTexture("inactive_candle_button_base");
        this.incenseText.alpha = 0.5;
        this.candleText.alpha = 0.5;
        this.flowerText.alpha = 0.5;
        this.incenseIcon.setTexture("button_incense_inactive");
        this.candleIcon.setTexture("button_candle_inactive");
        this.flowerIcon.setTexture("button_flower_inactive");

        _obj.setTexture("active_candle_button_base");
        _icon.setTexture("button_" + _obj.name + "_active");
        _obj.removeInteractive();
        _text.alpha = 1;
    };

    ShowHidePanel() {
        switch (this.panelShowingName) {
            case "incense":
                this.scene.incense.HideIncensePanleContainer();
                break;
            case "candle":
                this.scene.candle.HideCandlePanleContainer();
                break;
            case "flower":
                this.scene.flower.HideFlowerPanleContainer();
                break;
        }
    }

    CreateIncenseButton() {
        // this.incenseButton = this.scene.add.image(-320, 0, "active_candle_button_base").setOrigin(0.5).setScale(Constant.scaleFactor);
        this.incenseButton = this.scene.add.image(-320, 0, "active_candle_button_base").setOrigin(0.5);
        this.incenseButton.on('pointerdown', (pointer, x, y, event) => this.OnIncenseButtonPressed(this.incenseButton), this);
        this.incenseButton.on('pointerup', (pointer, x, y, event) => this.OnIncenseButtonReleased(this.incenseButton), this);
        this.incenseButton.name = "incense";
        // this.incenseIcon = this.scene.add.image(this.incenseButton.x, this.incenseButton.y - 15, "button_incense_active").setOrigin(0.5).setScale(Constant.scaleFactor);
        this.incenseIcon = this.scene.add.image(this.incenseButton.x, this.incenseButton.y - 15, "button_incense_active").setOrigin(0.5);
        let incenseTextStyle = { fontFamily: Constant.fontName, fontSize: '32px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        // this.incenseText = this.scene.add.text(this.incenseButton.x, this.incenseButton.y + 95, Constant.incenseText, incenseTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor);
        this.incenseText = this.scene.add.text(this.incenseButton.x, this.incenseButton.y + 95, Constant.incenseText, incenseTextStyle).setOrigin(0.5, 0.5);

        this.bottomButtonContainer.add([this.incenseButton, this.incenseIcon, this.incenseText]);
    };
    OnIncenseButtonPressed(_obj) {
        Utils.ButtonScaleTween(this.scene, this.incenseButton, 1);
        Utils.ButtonScaleTween(this.scene, this.incenseText, 1);

        // this.ActiveInactiveBottomSelectedButton(this.incenseButton, this.incenseText);
        this.ActiveInactiveBottomSelectedButton(this.incenseButton, this.incenseText, this.incenseIcon);
        this.ShowHidePanel();
        this.scene.incense.ShowIncensePanleContainer();
        this.panelShowingName = "incense";
        SoundManager.PlayButtonClickSound();
    };

    OnIncenseButtonReleased() {

    };

    CreateCandleButton() {
        // this.candleButton = this.scene.add.image(0, 0, "inactive_candle_button_base").setOrigin(0.5).setScale(Constant.scaleFactor);
        this.candleButton = this.scene.add.image(0, 0, "inactive_candle_button_base").setOrigin(0.5);
        this.candleButton.setInteractive({ useHandCursor: true });
        this.candleButton.on('pointerdown', (pointer, x, y, event) => this.OnCandleButtonPressed(this.candleButton), this);
        this.candleButton.on('pointerup', (pointer, x, y, event) => this.OnCandleButtonReleased(this.candleButton), this);
        this.candleButton.name = "candle";
        // this.candleIcon = this.scene.add.image(this.candleButton.x, this.candleButton.y - 15, "button_candle_inactive").setOrigin(0.5).setScale(Constant.scaleFactor);
        this.candleIcon = this.scene.add.image(this.candleButton.x, this.candleButton.y - 15, "button_candle_inactive").setOrigin(0.5);
        let candleTextStyle = { fontFamily: Constant.fontName, fontSize: '32px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        // this.candleText = this.scene.add.text(this.candleButton.x, this.candleButton.y + 95, Constant.candleText, candleTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor);
        this.candleText = this.scene.add.text(this.candleButton.x, this.candleButton.y + 95, Constant.candleText, candleTextStyle).setOrigin(0.5, 0.5);
        this.candleText.alpha = 0.5;
        this.bottomButtonContainer.add([this.candleButton, this.candleIcon, this.candleText]);
    };
    OnCandleButtonPressed(_obj) {
        Utils.ButtonScaleTween(this.scene, this.candleButton, 1);
        Utils.ButtonScaleTween(this.scene, this.candleText, 1);
        Utils.ButtonScaleTween(this.scene, this.candleIcon, 1);

        // this.ActiveInactiveBottomSelectedButton(this.candleButton, this.candleText);
        this.ActiveInactiveBottomSelectedButton(this.candleButton, this.candleText, this.candleIcon);
        this.ShowHidePanel();
        this.scene.candle.ShowCandlePanleContainer();
        this.panelShowingName = "candle";
        SoundManager.PlayButtonClickSound();
    };
    OnCandleButtonReleased() {

    };

    CreateFlowerButton() {
        // this.flowerButton = this.scene.add.image(320, 0, "inactive_candle_button_base").setOrigin(0.5).setScale(Constant.scaleFactor);
        this.flowerButton = this.scene.add.image(320, 0, "inactive_candle_button_base").setOrigin(0.5);
        this.flowerButton.setInteractive({ useHandCursor: true });
        this.flowerButton.on('pointerdown', (pointer, x, y, event) => this.OnFlowerButtonPressed(this.flowerButton), this);
        this.flowerButton.on('pointerup', (pointer, x, y, event) => this.OnFlowerButtonReleased(this.flowerButton), this);
        this.flowerButton.name = "flower";
        // this.flowerIcon = this.scene.add.image(this.flowerButton.x, this.flowerButton.y - 15, "button_flower").setOrigin(0.5);
        // this.flowerIcon = this.scene.add.image(this.flowerButton.x, this.flowerButton.y - 15, "button_flower_inactive").setOrigin(0.5).setScale(Constant.scaleFactor);
        this.flowerIcon = this.scene.add.image(this.flowerButton.x, this.flowerButton.y - 15, "button_flower_inactive").setOrigin(0.5);
        let flowerTextStyle = { fontFamily: Constant.fontName, fontSize: '32px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        // this.flowerText = this.scene.add.text(this.flowerButton.x, this.flowerButton.y + 95, Constant.flowerText, flowerTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor);
        this.flowerText = this.scene.add.text(this.flowerButton.x, this.flowerButton.y + 95, Constant.flowerText, flowerTextStyle).setOrigin(0.5, 0.5);
        this.flowerText.alpha = 0.5;
        this.bottomButtonContainer.add([this.flowerButton, this.flowerIcon, this.flowerText]);
    };
    OnFlowerButtonPressed() {
        Utils.ButtonScaleTween(this.scene, this.flowerButton, 1);
        Utils.ButtonScaleTween(this.scene, this.flowerText, 1);
        Utils.ButtonScaleTween(this.scene, this.flowerIcon, 1);

        // this.ActiveInactiveBottomSelectedButton(this.flowerButton, this.flowerText);
        this.ActiveInactiveBottomSelectedButton(this.flowerButton, this.flowerText, this.flowerIcon);
        this.ShowHidePanel();
        this.scene.flower.ShowFlowerPanleContainer();
        this.panelShowingName = "flower";
        SoundManager.PlayButtonClickSound();
    };
    OnFlowerButtonReleased() {

    };

}

export default GameplayUI;