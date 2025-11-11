import { SelectedResolution } from "./resolution-selector";
import { getScale } from "./utils";
import { SoundManager } from "./SoundManager";
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
        this.spineCoinsAnim = this.scene.add.spine(0, -100, "animation-coin").setVisible(false);
        this.spineBigAnim = this.scene.add.spine(0, -100, "animation-big-win").setVisible(false);
        this.spineMegaAnim = this.scene.add.spine(0, 0, "animation-epic-win").setVisible(false);
        this.spineSuperAnim = this.scene.add.spine(0, -100, "animation-ultra-win").setVisible(false);
        this.scene.game.events.on('stopWinSpines', this.StopWinSpines, this);
        // this.overLay.on('pointerup', this.StopJackpotAnimation, this);
        // this.ShowSuperWin()
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
            this.spineBigAnim.play('disappear', false);
            this.spineCoinsAnim.play('disappear', false);
            // this.spineBigAnim.setVisible(false);
            this.overLay.setVisible(false);
            // this.spineCoinsAnim.setVisible(false);
        }
        if (this.currentWinAnim == 'mega_win') {
            this.spineMegaAnim.play('disappear', false);
            this.spineCoinsAnim.play('disappear', false);
            // this.spineMegaAnim.setVisible(false);
            this.overLay.setVisible(false);
            // this.spineCoinsAnim.setVisible(false);
        }
        if (this.currentWinAnim == 'super_win') {
            this.spineSuperAnim.play('disappear', false);
            this.spineCoinsAnim.play('disappear', false);
            // this.spineSuperAnim.setVisible(false);
            this.overLay.setVisible(false);
            // this.spineCoinsAnim.setVisible(false);
        }
    }



    ShowBigWin() {
        SoundManager.BigWinSound();
        this.currentWinAnim = 'big_win';
        this.overLay.setVisible(true);

        this.spineCoinsAnim.setVisible(true);
        this.spineCoinsAnim.play('appear', false);
        this.spineCoinsAnim.once('complete', () => {
            this.spineCoinsAnim.play('loop', true);
            this.spineCoinsAnim.once('complete', () => {
                // this.spineCoinsAnim.play('disappear', false);
            })
        })

        this.spineBigAnim.setVisible(true);
        this.spineBigAnim.play('appear', false);
        this.spineBigAnim.once('complete', () => {
            this.spineBigAnim.play('idle', true);
            this.spineBigAnim.once('complete', () => {
                // this.spineBigAnim.play('disappear', false);
                // this.overLay.setVisible(false);
            })
        })
    }
    ShowMegaWin() {
        SoundManager.BigWinSound();
        this.currentWinAnim = 'mega_win';
        this.overLay.setVisible(true);

        this.spineCoinsAnim.setVisible(true);
        this.spineCoinsAnim.play('appear', false);
        this.spineCoinsAnim.once('complete', () => {
            this.spineCoinsAnim.play('loop', true);
            this.spineCoinsAnim.once('complete', () => {
                // this.spineCoinsAnim.play('disappear', true);
            })
        })

        this.spineMegaAnim.setVisible(true);
        this.spineMegaAnim.play('appear', false);
        this.spineMegaAnim.once('complete', () => {
            this.spineMegaAnim.play('idle', true);
            this.spineMegaAnim.once('complete', () => {
                // this.spineMegaAnim.play('disappear', false);
                // this.overLay.setVisible(false);
            })
        })
    }
    ShowSuperWin() {
        SoundManager.UltraWinSound();
        this.currentWinAnim = 'super_win';
        this.overLay.setVisible(true);

        this.spineCoinsAnim.setVisible(true);
        this.spineCoinsAnim.play('appear', false);
        this.spineCoinsAnim.once('complete', () => {
            this.spineCoinsAnim.play('loop', true);
            this.spineCoinsAnim.once('complete', () => {
                // this.spineCoinsAnim.play('disappear', false);
            });
        });

        this.spineSuperAnim.setVisible(true);
        this.spineSuperAnim.play('appear', false);
        this.spineSuperAnim.once('complete', () => {
            this.spineSuperAnim.play('idle', true);
            this.spineSuperAnim.once('complete', () => {
                // this.spineSuperAnim.play('disappear', false);
                // this.overLay.setVisible(false);
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