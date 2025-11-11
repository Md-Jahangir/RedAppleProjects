/* global Phaser */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 22-04-2025.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 22-04-2025
 * @Description :- Quit Popup.
 ************************************/

import { Constant } from '../Constant';
import ButtonTween from '../game_objects/ButtonTween';
import { AudioManager } from '../media/AudioManager';
import gsap from 'gsap';

class QuitPopup {
    constructor(scene) {
        this.scene = scene;
        this.quitPopupContainer = null;
        this.scaleFactor = null;
        this.baseY = -125;

        this.CreateQuitPopup();
        this.HideQuitPopup();
    }

    CreateQuitPopup() {
        this.overlay = this.scene.add.image(0, 0, 'rules_overlay').setOrigin(0.5).setInteractive().setDepth(6);
        this.quitPopupContainer = this.scene.add.container().setDepth(6);
        // console.log("the popup base", this.qPopupBase);

        let fontTextStyle = { fontFamily: 'GROBOLD', fontSize: '60px', fill: '#9b4b23', align: 'center' };
        let txt = 'Do you want to \nQuit ?';
        this.popupTxt = this.scene.add.text(this.scene.qPopupBase.x, this.baseY, txt, fontTextStyle).setOrigin(0.5);
        this.noBtn = this.scene.add.image(this.scene.qPopupBase.x - 140, (this.baseY + this.scene.qPopupBase.height / 2.5), 'ui', 'blue_button').setOrigin(0.5).setScale(0);//.setInteractive({ useHandCursor: true });
        fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '60px', fill: '#FFFFFF', align: 'center' };
        txt = 'NO';
        this.noTxt = this.scene.add.text(this.noBtn.x, this.noBtn.y - 10, txt, fontTextStyle).setOrigin(0.5).setScale(0);
        this.noTxt.setStroke('#004794', 6);
        this.yesBtn = this.scene.add.image(this.scene.qPopupBase.x + 140, (this.baseY + this.scene.qPopupBase.height / 2.5), 'ui', 'yellow_button').setOrigin(0.5).setScale(0);//.setInteractive({ useHandCursor: true });
        fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '60px', fill: '#FFFFFF', align: 'center' };
        txt = 'YES';
        this.yesTxt = this.scene.add.text(this.yesBtn.x, this.yesBtn.y - 10, txt, fontTextStyle).setOrigin(0.5).setScale(0);
        this.yesTxt.setStroke('#a73411', 6);
        this.quitPopupContainer.add([this.scene.qPopupBase, this.popupTxt, this.noBtn, this.noTxt, this.yesBtn, this.yesTxt]);

        this.scaleFactor = 0.01;
        this.overlay.setScale(0.01);
        this.quitPopupContainer.setScale(0.01);

        this.noBtn.on('pointerup', this.OnClickingNoBtn, this);
        this.yesBtn.on('pointerup', this.OnClickingYesBtn, this);
    }

    OnClickingNoBtn() {
        const btnTween = new ButtonTween(this.scene, this.noBtn, this.noTxt);
        AudioManager.PlayButtonPressAudio();
        btnTween.btnTween.once('complete', () => {
            // this.HideQuitPopup();
            this.AnimateQuitPopupToBackButton(this.ResumeGameScene);
        });
    }

    ResumeGameScene(_this) {
        _this.HideQuitPopup();
        _this.scene.events.emit('game_resumed');
    }

    StartMenuScene(_this) {
        _this.scene.events.emit('game_paused');
        _this.scene.events.off('game_paused', _this.scene.PauseAllAnims, _this.scene);
        _this.scene.events.off('game_resumed', _this.scene.ResumeAllAnims, _this.scene);
        _this.scene.tweens.killAll();
        _this.scene.time.clearPendingEvents();
        AudioManager.StopLevelMusic();
        setTimeout(() => {
            _this.scene.scene.stop('GameScene');
            _this.scene.scene.start('MenuScene');
        }, 100);
    }

    OnClickingYesBtn() {
        const btnTween = new ButtonTween(this.scene, this.yesBtn, this.yesTxt);
        AudioManager.PlayButtonPressAudio();
        // this.btnTween.btnTween.once('complete', () => {
        this.AnimateQuitPopupToBackButton(this.StartMenuScene);
        // });
    }

    HideQuitPopup() {
        (this.quitPopupContainer.exists(this.scene.qPopupBase)) ? this.quitPopupContainer.remove(this.scene.qPopupBase) : null;
        this.overlay.setVisible(false);
        this.quitPopupContainer.setVisible(false);
        this.scene.qPopupBase.setVisible(false);
        this.scene.qPopupBase.y = 0;
    }

    ShowQuitPopup() {
        this.scene.qPopupBase.y = -125;
        this.scene.qPopupBase.setVisible(true);
        this.scene.qPopupBase.name = 'quit';
        this.quitPopupContainer.addAt(this.scene.qPopupBase, 0);
        this.overlay.setVisible(true);
        this.quitPopupContainer.setVisible(true);

        this.AnimateQuitPopupToScreen();
    }

    AnimateQuitPopupToScreen() {
        this.quitPopupContainer.setPosition(Constant.backButPosX, Constant.backButPosY);
        const qPopupBase = this.scene.qPopupBase;

        qPopupBase.animationState.setAnimation(0, 'quit_appear', false);
        gsap.to(this.overlay, {
            alpha: 1,
            duration: 1,
            ease: 'power1.out'
        });// 
        gsap.timeline()
            .to(this.quitPopupContainer, {
                scaleY: 1 * Constant.newScale,
                scaleX: 1 * Constant.newScale,
                x: Constant.clientWidth / 2,
                y: Constant.clientHeight / 2,
                duration: 0.3,
                ease: 'power2.inOut',
                // }
            })
            .to(this.quitPopupContainer, {
                scaleX: 1 * Constant.newScale,
                scaleY: 1 * Constant.newScale,
                // x: Constant.clientWidth / 2,
                // y: Constant.clientHeight / 2,
                duration: 0.2,
                ease: 'power1.in',
                onComplete: () => {
                    this.scaleFactor = Constant.newScale;
                    this.AnimateButtons();
                    this.ResizeQuitPopupContainer(Constant.clientWidth, Constant.clientHeight, Constant.newScale);
                }
            });
    }

    AnimateButtons() {
        gsap.to([this.noBtn, this.noTxt, this.yesBtn, this.yesTxt], {
            delay: 0.15,
            duration: 0.3,
            scale: 1.125,
            ease: 'expo.out',
            onComplete: () => {
                gsap.to([this.noBtn, this.noTxt, this.yesBtn, this.yesTxt], {
                    duration: 0.2,
                    scale: 1,
                    ease: 'expo.in',
                    onComplete: () => {
                        this.noBtn.setInteractive({ useHandCursor: true });
                        this.yesBtn.setInteractive({ useHandCursor: true });
                    }
                });
            }
        });
    }

    AnimateQuitPopupToBackButton(callback = null) {
        gsap.to(this.overlay, {
            alpha: 0,
            duration: 1,
            ease: 'power1.out'
        });// 
        gsap.timeline()
            .to(this.quitPopupContainer, {
                scaleY: 0.9 * Constant.newScale,
                scaleX: 0.9 * Constant.newScale,
                duration: 0.2 * Constant.newScale,
                ease: 'power1.in'
            })
            .to(this.quitPopupContainer, {
                scaleX: 0.01 * Constant.newScale,
                scaleY: 0.01 * Constant.newScale,
                x: Constant.backButPosX,
                y: Constant.backButPosY - 20,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: () => {
                    this.scaleFactor = 0.01;
                    this.ResizeQuitPopupContainer(Constant.clientWidth, Constant.clientHeight, Constant.newScale);
                    this.HideQuitPopup();

                    if (callback)
                        callback(this);
                }
            });

    }

    ResizeQuitPopupContainer(_newWidth, _newHeight, newScale) {
        this.overlay.setDisplaySize(Constant.clientWidth, Constant.clientHeight);
        this.overlay.setPosition(
            _newWidth / 2, _newHeight / 2
        );

        const isMinimized = this.scaleFactor === 0.01;

        this.quitPopupContainer.setScale(isMinimized ? 0.01 : newScale);
        this.quitPopupContainer.setPosition(
            _newWidth / 2,
            _newHeight / 2
        );
    }
}

export default QuitPopup;