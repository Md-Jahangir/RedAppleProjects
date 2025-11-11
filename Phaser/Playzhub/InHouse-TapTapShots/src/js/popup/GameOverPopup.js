import Button from "../class/Button";
import { Constant } from "../Constant";
import * as GA from "gameanalytics";

export default class GameOverPopup {
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
        this.baseHeadText = this.scene.add.text(0, -335, 'Over', { fontFamily: "Poppins-Bold", fontSize: 75 }).setOrigin(0.5);
        const scoreTextStyle = { fontFamily: 'Poppins-Bold', fontSize: '60px', fill: '#fff', fontStyle: 'normal', align: 'center', wordWrap: { width: this.popupBase.width - (this.popupBase.width / 2.5) } };
        this.scoreText = this.scene.add.text(0, -20, "SCORE : ", scoreTextStyle).setOrigin(0.5);

        this.leavePopupContainer.add([this.popupBase, this.baseHeadText, this.scoreText]);
    }
    //#endregion

    //#region - CreateButton
    CreateButton() {
        this.menuButton = new Button(this.scene, 'menu-but', 0, 0, 1, 1);
        this.menuButton.button.setDepth(4);
        this.menuButton.hide();
        this.menuButton.setClickcallback(this.MenuButtonFunc, this);

        this.replayButton = new Button(this.scene, 'replay-but', 0, 0, 1, 1);
        this.replayButton.button.setDepth(4);
        this.replayButton.hide();
        this.replayButton.setClickcallback(this.ReplayButtonFunc, this);
        // this.adImg = this.scene.add.image(0, 0, 'ad-img').setDepth(4).setVisible(false);
    }
    //#endregion

    //#region - MenuButtonFunc
    MenuButtonFunc() {
        GA.GameAnalytics.addDesignEvent("ui:menu_clicked");
        this.scene.RestartGame();
        // this.scene.scene.stop('GameScene');
        // this.scene.scene.start('MenuScene', { isTutorial: false });
    }
    //#endregion

    //#region - ReplayButtonFunc
    async ReplayButtonFunc() {
        GA.GameAnalytics.addDesignEvent("ui:restart_clicked");
        // await this.scene.ShowAd();
        // this.scene.RestartGame();
        // this.scene.adHitFrom = 'reload';
        this.ShowHidePopup(false);
        this.scene.scene.stop('GameScene');
        this.scene.scene.start('GameScene', { isTutorial: false });
    }
    //#endregion

    //#region - ShowHidePopup
    ShowHidePopup(_status) {
        this.overlayBg.setVisible(_status);
        this.leavePopupContainer.setVisible(_status);
        // this.adImg.setVisible(_status);
        if (_status == true) {
            this.menuButton.show();
            this.replayButton.show();
            this.scoreText.setText('SCORE : ' + Constant.score)
        }
        else {
            this.menuButton.hide();
            this.replayButton.hide();
        }
    }
    //#endregion

    //#region - Resize
    resize(newWidth, newHeight, newScale) {
        this.overlayBg.setDisplaySize(newWidth, newHeight);
        this.leavePopupContainer.setScale(newScale);
        this.leavePopupContainer.setPosition(newWidth / 2, newHeight / 2);

        this.menuButton.SetScale(newScale);
        this.menuButton.SetPosition((newWidth / 2) + (160 * newScale), (newHeight / 2) + (250 * newScale));

        this.replayButton.SetScale(newScale);
        this.replayButton.SetPosition((newWidth / 2) - (160 * newScale), (newHeight / 2) + (250 * newScale));
        // this.adImg.setScale(newScale);
        // this.adImg.setPosition((newWidth / 2) - (35 * newScale), (newHeight / 2) + (185 * newScale));
    }
    //#endregion
}