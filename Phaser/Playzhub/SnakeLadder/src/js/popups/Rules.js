import { Constant } from "../Constant";
import gsap from "gsap";
import ButtonTween from "../game_objects/ButtonTween";
import { AudioManager } from "../media/AudioManager";
import * as GA from 'gameanalytics';

class Rules {
    constructor(scene) {
        this.scene = scene;

        this.rulesOverlay = null;
        this.rulesContainer = null;
        this.rulesButtonContainer = null;
        this.scaleFactor = null;

        this.CreateRules();
        this.HideRules();
    }

    CreateRules() {
        this.rulesOverlay = this.scene.add.image(0, 0, 'rules_overlay').setInteractive();
        // this.rulesPosY = (0 - (105 * Constant.newScale));

        this.rulesContainer = this.scene.add.container().setDepth(7);

        this.rulesBase = this.scene.add.image(0, 0, 'rules_base').setOrigin(0.5);

        this.skipBtn = this.scene.add.image(0, this.rulesBase.y + this.rulesBase.height / 2.15, 'ui', 'Got_it').setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.skipBtn.on('pointerdown', this.OnClickingSkipBtn, this);

        this.scaleFactor = 0.01;
        this.rulesOverlay.setScale(0.01 * Constant.newScale);
        this.rulesContainer.setScale(0.01 * Constant.newScale);

        this.rulesContainer.add([this.rulesBase, this.skipBtn]);

    }

    OnClickingSkipBtn() {
        GA.GameAnalytics.addDesignEvent('ui:skip_clicked');
        AudioManager.PlayButtonPressAudio();
        let skipTween = new ButtonTween(this.scene, this.skipBtn);
        skipTween.btnTween.once('complete', () => {
            // const angle = Phaser.Math.Angle.Between(this.rulesContainer.x, this.rulesContainer.y, this.scene.txtRulesContainer.x, this.scene.txtRulesContainer.y);

            gsap.to(this.rulesOverlay, {
                alpha: 0,
                ease: 'power2.out',
                duration: 1
            });

            gsap.timeline()
                .to(this.rulesContainer, {
                    scaleY: 0.9 * Constant.newScale,
                    scaleX: 0.9 * Constant.newScale,
                    duration: 0.2 * Constant.newScale,
                    // angle: angle,
                    ease: 'power1.in'
                })
                .to(this.rulesContainer, {
                    scaleX: 0.01 * Constant.newScale,
                    scaleY: 0.01 * Constant.newScale,
                    x: Constant.rulesButPosX,
                    y: Constant.rulesButPosY,
                    duration: 0.4,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        this.HideRules();
                        gsap.killTweensOf(this.rulesContainer);
                        gsap.killTweensOf(this.rulesOverlay);
                        this.scaleFactor = 0.01;
                        // setTimeout(() => {
                        this.scene.events.emit('game_resumed');
                        if (Constant.canShowRules) {
                            Constant.canShowRules = false;
                            this.scene.ShowTurn();
                        }
                        // }, 1000);
                    }
                });

        })
    }

    ShowRules() {
        this.rulesOverlay.setVisible(true);
        this.rulesContainer.setVisible(true);

        this.AnimateRulesFromRulesBtn();
    }

    HideRules() {
        this.rulesOverlay.setVisible(false);
        this.rulesContainer.setVisible(false);
    }

    AnimateRulesFromRulesBtn() {
        this.rulesContainer.setPosition(Constant.rulesButPosX, Constant.rulesButPosY);

        gsap.to(this.rulesOverlay, {
            alpha: 1,
            duration: 1,
            ease: 'power1.out'
        });// 

        gsap.timeline()
            .to(this.rulesContainer, {
                scaleX: 1 * Constant.newScale,
                scaleY: 1 * Constant.newScale,
                x: Constant.clientWidth / 2,
                y: Constant.clientHeight / 2,
                duration: 0.3,
                ease: 'power2.inOut',
            })
            .to(this.rulesContainer, {
                scaleX: 1 * Constant.newScale,
                scaleY: 1 * Constant.newScale,
                // x: Constant.clientWidth / 2,
                // y: Constant.clientHeight / 2,
                duration: 0.2,
                ease: 'power1.in',
                onComplete: () => {
                    this.scaleFactor = 1000;
                    gsap.killTweensOf(this.rulesContainer);
                    gsap.killTweensOf(this.rulesOverlay);
                    this.ResizeRulePopup(Constant.clientWidth, Constant.clientHeight, Constant.newScale);
                }
            });
    }

    ResizeRulePopup(_newWidth, _newHeight, newScale) {
        Constant.newScale = newScale;

        this.rulesOverlay?.setDisplaySize(_newWidth, _newHeight);
        this.rulesOverlay?.setPosition(_newWidth / 2, _newHeight / 2);

        if (!this.rulesContainer) return;

        const isMinimized = this.scaleFactor <= 0.05;

        this.rulesContainer.setScale(isMinimized ? 0.01 : newScale);
        this.rulesContainer.setPosition(
            _newWidth / 2,
            _newHeight / 2
        );
    }

}

export default Rules;