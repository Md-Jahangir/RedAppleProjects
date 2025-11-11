// import { PlayzhubEventHandler } from "../../lib/PlayzhubEventHandler";
import { PlayzhubEventHandler } from "../PlayzhubEventHandler";
import Button from "../class/Button";
import { Server } from "../class/Server";
import { Constant } from "../Constant";
import { SoundManager } from "../SoundManager";

export default class LeavePopup {
    constructor(scene) {
        this.scene = scene;
        this.leavePopupContainer = null;
        this.CreateLeavepopup();
        this.CreateButton();
    }
    //#region - CreateLeavepopup
    CreateLeavepopup() {
        this.overlayBg = this.scene.add.image(0, 0, 'black-overlay').setOrigin(0).setDepth(4).setInteractive();
        this.overlayBg.setVisible(false);
        this.leavePopupContainer = this.scene.add.container(0, 0).setDepth(4);
        this.leavePopupContainer.setVisible(false);
        this.popupBase = this.scene.add.image(0, 0, 'popup-base');
        this.baseHeadText = this.scene.add.text(0, -335, 'QUIT', { fontFamily: "Poppins-Bold", fontSize: 75 }).setOrigin(0.5);
        const baseBodyTextStyle = { fontFamily: 'Poppins-Bold', fontSize: '60px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.popupBase.width - (this.popupBase.width / 2.5) } };
        this.baseBodytext = this.scene.add.text(0, -20, 'DO YOU WANT TO QUIT?', baseBodyTextStyle).setOrigin(0.5);

        this.leavePopupContainer.add([this.popupBase, this.baseHeadText, this.baseBodytext]);
    }
    //#endregion

    //#region - CreateButton
    CreateButton() {
        this.yesButton = new Button(this.scene, 'yes-but', 0, 0, 1, 1);
        this.yesButton.button.setDepth(4);
        this.yesButton.hide();
        this.yesButton.setClickcallback(this.YesButtonFunc, this);

        this.noButton = new Button(this.scene, 'no-but', 0, 0, 1, 1);
        this.noButton.button.setDepth(4);
        this.noButton.hide();
        this.noButton.setClickcallback(this.NoButtonFunc, this);
    }
    //#endregion

    //#region - YesButtonFunc
    async YesButtonFunc() {
        await this.scene.ShowAd();
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        // Server.PostGameQuitToParent(finalTime / 1000, Constant.score);
        PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, Constant.score);
        this.scene.scene.stop('GameScene');
        this.scene.scene.start('MenuScene');
    }
    //#endregion

    //#region - NoButtonFunc
    NoButtonFunc() {
        this.scene.isGamePause = false;
        if (this.scene.basketInstance.gameTimer != null) {
            this.scene.basketInstance.gameTimer.resume();
        }
        SoundManager.IsPlayGameBgMusic();
        this.ShowHidePopup(false);
    }
    //#endregion

    //#region - ShowHidePopup
    ShowHidePopup(_status) {
        this.overlayBg.setVisible(_status);
        this.leavePopupContainer.setVisible(_status);
        if (_status == true) {
            this.yesButton.show();
            this.noButton.show();
        }
        else {
            this.yesButton.hide();
            this.noButton.hide();
        }
    }
    //#endregion

    //#region - Resize
    resize(newWidth, newHeight, newScale) {
        this.overlayBg.setDisplaySize(newWidth, newHeight);
        this.leavePopupContainer.setScale(newScale);
        this.leavePopupContainer.setPosition(newWidth / 2, newHeight / 2);

        this.yesButton.SetScale(newScale);
        this.yesButton.SetPosition((newWidth / 2) + (160 * newScale), (newHeight / 2) + (250 * newScale));

        this.noButton.SetScale(newScale);
        this.noButton.SetPosition((newWidth / 2) - (160 * newScale), (newHeight / 2) + (250 * newScale));
    }
    //#endregion
}