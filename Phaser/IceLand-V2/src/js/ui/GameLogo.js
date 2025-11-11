import { Model } from "../Model.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";

class GameLogo {
    constructor(scene) {
        this.scene = scene;
        this.logo = null;
        this.leftTruck = null;
        this.rightTruck = null;
        this.backButton = null;
        this.backButtonGlow = null;
        this.leftSlotNumber = null;
        this.rightSlotNumber = null;
        // this.totalAmountBetted = "500";

        this.slotNumberArray = [];
        this.create();

        this.scene.game.events.on("evtShowBlinkAnimation", this.onShowBlinkAnimation, this);
    };
    create() {
        this.backButtonGlow = this.scene.add.image(Math.round(Constant.game.config.width / 25), Math.round(Constant.game.config.height / 19), "back_glow").setOrigin(0.5).setScale(Constant.scaleFactor);
        this.backButtonGlow.setVisible(false);
        this.backButton = this.scene.add.image(Math.round(Constant.game.config.width / 25), Math.round(Constant.game.config.height / 19), "gameplay_back_button").setOrigin(0.5).setScale(Constant.scaleFactor);
        this.backButton.setInteractive({ useHandCursor: true });
        this.backButton.on("pointerdown", this.BackButtonPressed, this);
        this.backButton.on("pointerup", this.BackButtonReleased, this);

        this.logo = this.scene.add.image(Math.round(Constant.game.config.width / 2), (35 * Constant.scaleFactorY), "ice_land_heading").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        this.CreateLeftNumberPanel();
        this.CreateRightNumberPanel();
    };

    HideLogo() {
        this.logo.setVisible(false);
    }
    ShowLogo() {
        this.logo.setVisible(true);
    }

    CreateLeftNumberPanel() {
        let line = Model.GetLeftPayLineNumber();
        for (let i = 0; i < 25; i++) {
            let slotNumber = this.scene.add.sprite(0, Math.round(Constant.game.config.height / 9) + (i * Math.round(Constant.game.config.height / 35)), "number_" + line[i]).setOrigin(0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            this.slotNumberArray.push(slotNumber);
        }
    }
    CreateRightNumberPanel() {
        let line = Model.GetRightPayLineNumber();
        for (let i = 0; i < 25; i++) {
            let slotNumber = this.scene.add.sprite(Math.round(Constant.game.config.width), Math.round(Constant.game.config.height / 9) + (i * Math.round(Constant.game.config.height / 35)), "number_" + line[i]).setOrigin(1, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            this.slotNumberArray.push(slotNumber);
        }
    }

    PlayNumberBlinkAnimation(_lineNum) {
        let totalLine = Model.GetTotalPayLineNumber();
        this.slotNumberArray[totalLine.indexOf(_lineNum)].play("anim_number_blink_" + _lineNum, true);
    }

    StopNumberBlinkAnimation() {
        for (let i = 0; i < this.slotNumberArray.length; i++) {
            this.slotNumberArray[i].anims.stop();
            this.slotNumberArray[i].setFrame(0);
        }
    }

    BackButtonPressed() {
        this.backButtonGlow.setVisible(true);
        SoundManager.ButtonClickSound();
    }
    BackButtonReleased() {
        this.backButtonGlow.setVisible(false);
        // console.log("total betted: ",this.scene.bottomPanel.totalAmountBetted)
        // window.postMessage("back pressed")
        // ReactNativeWebView.postMessage("back pressed");
        window.postMessage(this.scene.bottomPanel.totalAmountBetted)
        ReactNativeWebView.postMessage(this.scene.bottomPanel.totalAmountBetted);
    }

    onShowBlinkAnimation() {
        let wonPaylines = Model.getWonPaylines();
        if (wonPaylines.length > 0) {
            for (let i = 0; i < wonPaylines.length; i++) {
                let lineIndex = wonPaylines[i].index;
                this.PlayNumberBlinkAnimation(lineIndex + 1);
            }
        }
    }

}

export default GameLogo;