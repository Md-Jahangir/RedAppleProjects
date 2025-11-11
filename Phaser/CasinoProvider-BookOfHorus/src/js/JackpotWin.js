import { SelectedResolution } from "./resolution-selector";
import { getScale } from "./utils";
// import { Model } from "./model";

class JackpotWin {
    constructor(scene) {
        this.scene = scene;
        this.currentWinAnim = '';
        this.create();
    }
    create() {
        this.overLay = this.scene.add.image(0, 0, "loading_bg").setOrigin(0).setInteractive({ useHandCursor: true }).setVisible(false)
        this.overLay.setAlpha(0.5);
        this.spineBigAnim = this.scene.add.spine(0, -100, "big_win_spine").setVisible(false);
        this.spineMegaAnim = this.scene.add.spine(0, 0, "mega_win_spine").setVisible(false);
        this.spineSuperAnim = this.scene.add.spine(0, -100, "super_win_spine").setVisible(false);
        this.spineCoinsAnim = this.scene.add.spine(0, -100, "coin-animation").setVisible(false);

        // this.overLay.on('pointerup', this.StopJackpotAnimation, this);
    }
    StopJackpotAnimation() {
        this.scene.scorePopup.FinalAnimation();
        this.StopWinSpines();
        setTimeout(() => {
            // this.scene.scorePopup.StopWinSpines();
        }, 500);
    }
    StopWinSpines() {
        if (this.currentWinAnim == 'big_win') {
            this.spineBigAnim.play('BigWin_Loop', false);
            this.spineBigAnim.setVisible(false);
            this.overLay.setVisible(false);
            this.spineCoinsAnim.setVisible(false);
        }
        if (this.currentWinAnim == 'mega_win') {
            this.spineMegaAnim.play('mega_win_loop', false);
            this.spineMegaAnim.setVisible(false);
            this.overLay.setVisible(false);
            this.spineCoinsAnim.setVisible(false);
        }
        if (this.currentWinAnim == 'super_win') {
            this.spineSuperAnim.play('SuperWin_Loop', false);
            this.spineSuperAnim.setVisible(false);
            this.overLay.setVisible(false);
            this.spineCoinsAnim.setVisible(false);
        }
    }



    ShowBigWin() {
        this.currentWinAnim = 'big_win';
        this.overLay.setVisible(true);
        this.spineBigAnim.setVisible(true);
        this.spineBigAnim.play('BigWin_Appear', false);
        this.spineBigAnim.once('complete', () => {
            this.spineBigAnim.play('BigWin_Loop', false);
            this.spineBigAnim.once('complete', () => {
                this.spineBigAnim.play('BigWin_Disappear', false);
                this.overLay.setVisible(false);
            })
        })
    }
    ShowMegaWin() {
        this.currentWinAnim = 'mega_win';
        this.overLay.setVisible(true);
        this.spineMegaAnim.setVisible(true);
        this.spineCoinsAnim.setVisible(true);
        this.spineMegaAnim.play('mega_win_appear', false);
        this.spineCoinsAnim.play('animation', false);
        this.spineMegaAnim.once('complete', () => {
            this.spineMegaAnim.play('mega_win_loop', false);
            this.spineMegaAnim.once('complete', () => {
                this.spineMegaAnim.play('mega_win_disappear', false);
                this.overLay.setVisible(false);
            })
        })
    }
    ShowSuperWin() {
        this.currentWinAnim = 'super_win';
        this.overLay.setVisible(true);
        this.spineSuperAnim.setVisible(true);
        this.spineCoinsAnim.setVisible(true);
        this.spineSuperAnim.play('SuperWin_Appear', false);
        this.spineCoinsAnim.play('animation', false);
        this.spineSuperAnim.once('complete', () => {
            this.spineSuperAnim.play('SuperWin_Loop', false);
            this.spineSuperAnim.once('complete', () => {
                this.spineSuperAnim.play('superwin_disappear', false);
                this.overLay.setVisible(false);
            })
        })
    }
    ResizePopupOverlay(newWidth, newHeight) {
        let scaleX = newWidth / this.overLay.width;
        let scaleY = newHeight / this.overLay.height;
        let totalScale = scaleX > scaleY ? scaleX : scaleY;
        this.overLay.setScale(totalScale);
        this.overLay.setPosition(0, 0);
    }
    resize(newWidth, newHeight) {
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        this.ResizePopupOverlay(newWidth, newHeight);
        this.spineBigAnim.setScale(newScale);
        this.spineBigAnim.setPosition(newWidth / 2, newHeight / 2);
        this.spineMegaAnim.setScale(newScale);
        this.spineMegaAnim.setPosition(newWidth / 2, newHeight / 2);
        this.spineSuperAnim.setScale(newScale);
        this.spineSuperAnim.setPosition(newWidth / 2, newHeight / 2);
        this.spineCoinsAnim.setScale(newScale);
        this.spineCoinsAnim.setPosition(newWidth / 2, newHeight / 2);
    }
}
export default JackpotWin;