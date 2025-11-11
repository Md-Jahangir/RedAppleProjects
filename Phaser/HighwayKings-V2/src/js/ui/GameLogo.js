import { Model } from "../Model.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";

class GameLogo {
    constructor(scene) {
        this.scene = scene;
        this.logo = null;
        this.leftTruck = null;
        this.rightTruck = null;
        this.backButtonBase = null;
        this.backButton = null;
        this.leftSlotNumber = null;
        this.rightSlotNumber = null;

        this.leftSlotNumberArray = [];
        this.rightSlotNumberArray = [];

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

        this.logo = this.scene.add.image(Math.round(Constant.game.config.width / 2), 0, "highway_heading_with_truck").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

        this.CreateLeftNumberPanel();
        this.CreateRightNumberPanel();
    };

    CreateLeftNumberPanel() {
        let line = Model.GetLeftPayLineNumber();
        for (let i = 0; i < 9; i++) {
            let slotNumber = this.scene.add.sprite(0, Math.round(Constant.game.config.height / 7.2) + (i * Math.round(Constant.game.config.height / 13)), "left_" + line[i]).setOrigin(0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            this.leftSlotNumberArray.push(slotNumber);
        }
    }
    CreateRightNumberPanel() {
        let line = Model.GetRightPayLineNumber();
        for (let i = 0; i < 9; i++) {
            let slotNumber = this.scene.add.sprite(Math.round(Constant.game.config.width), Math.round(Constant.game.config.height / 7.2) + (i * Math.round(Constant.game.config.height / 13)), "right_" + line[i]).setOrigin(1, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            this.rightSlotNumberArray.push(slotNumber);
        }
    }

    PlayNumberBlinkAnimation(_lineNum) {
        let leftLine = Model.GetLeftPayLineNumber();
        let rightLine = Model.GetRightPayLineNumber();
        this.leftSlotNumberArray[leftLine.indexOf(_lineNum)].play("anim_left_number_blink_" + _lineNum, true);
        this.rightSlotNumberArray[rightLine.indexOf(_lineNum)].play("anim_right_number_blink_" + _lineNum, true);
    }

    StopNumberBlinkAnimation() {
        for (let i = 0; i < this.leftSlotNumberArray.length; i++) {
            this.leftSlotNumberArray[i].anims.stop();
            this.leftSlotNumberArray[i].setFrame(0);
        }
        for (let i = 0; i < this.rightSlotNumberArray.length; i++) {
            this.rightSlotNumberArray[i].anims.stop();
            this.rightSlotNumberArray[i].setFrame(0);
        }
    }

    BackButtonPressed() {
        SoundManager.ButtonClickSound();
        this.backButtonGlow.setVisible(true);
    }
    BackButtonReleased() {
        window.postMessage("back pressed");
        // ReactNativeWebView.postMessage("back pressed");
        // this.backButtonGlow.setVisible(false);
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