import gsap from "gsap";
import { Constant } from "../Constant";

class SkipPopup {
    constructor(scene) {
        this.scene = scene;
        this.skipPopupContainer = null;
        this.scaleFactor = null;

        this.createSkipPopup();
        this.hideSkipPopup();
    }

    createSkipPopup() {
        this.gameOverlay = this.scene.add.image(0, 0, 'rules_overlay').setOrigin(0.5).setInteractive().setDepth(3);
        this.skipPopupContainer = this.scene.add.container().setDepth(3);
        let fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '50px', fill: '#FFFFFF', align: 'center' };
        let txt = 'Click on a dice to discard';
        this.discardTxt = this.scene.add.text(0, 0, txt, fontTextStyle).setOrigin(0.5);
        this.skipPopupContainer.add(this.discardTxt);

        this.scaleFactor = 0.01;
        this.gameOverlay.setScale(0.01);
        this.skipPopupContainer.setScale(0.01);
    }

    animateSkipPopupToScreen() {
        gsap.to(this.gameOverlay, {
            alpha: 1,
            duration: 1,
            ease: 'power1.out'
        });

        const timeline = gsap.timeline();

        timeline
            .to(this.skipPopupContainer, {
                scaleY: 1 * Constant.newScale,
                scaleX: 1 * Constant.newScale,
                x: Constant.clientWidth / 2,
                y: Constant.clientHeight / 2,
                duration: 0.3,
                ease: 'power2.inOut'
            })
            .to(this.skipPopupContainer, {
                scaleX: 1 * Constant.newScale,
                scaleY: 1 * Constant.newScale,
                duration: 0.2,
                ease: 'power1.in',
                onComplete: () => {
                    this.scaleFactor = Constant.newScale;
                    this.resizeSkipPopup(Constant.clientWidth, Constant.clientHeight, Constant.newScale);
                    gsap.killTweensOf(this.skipPopupContainer);
                    gsap.killTweensOf(this.gameOverlay);
                    timeline.kill();
                }
            });
    }

    animateSkipPopupToSkipButton() {
        gsap.to(this.gameOverlay, {
            alpha: 0,
            duration: 1,
            ease: 'power1.out'
        });// 

        const timeline = gsap.timeline();
        timeline
            .to(this.skipPopupContainer, {
                scaleY: 0.9 * Constant.newScale,
                scaleX: 0.9 * Constant.newScale,
                duration: 0.2 * Constant.newScale,
                ease: 'power1.in'
            })
            .to(this.skipPopupContainer, {
                scaleX: 0.01 * Constant.newScale,
                scaleY: 0.01 * Constant.newScale,
                x: Constant.skipButPosX,
                y: Constant.skipButPosY - 20,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: () => {
                    this.scaleFactor = 0.01;
                    this.hideSkipPopup();
                    gsap.killTweensOf(this.skipPopupContainer);
                    gsap.killTweensOf(this.gameOverlay);
                    timeline.kill();
                }
            });
    }

    showSkipPopup() {
        this.gameOverlay.setVisible(true);
        this.skipPopupContainer.setVisible(true);

        this.animateSkipPopupToScreen();
    }

    hideSkipPopup() {
        this.gameOverlay.setVisible(false);
        this.skipPopupContainer.setVisible(false);
    }

    resizeSkipPopup(_newWidth, _newHeight, _newScale) {
        Constant.newScale = _newScale;

        this.gameOverlay.setDisplaySize(_newWidth, _newHeight);
        this.gameOverlay.setPosition(
            _newWidth / 2,
            _newHeight / 2
        );

        const isMinimized = this.scaleFactor === 0.01;

        this.skipPopupContainer.setScale(isMinimized ? 0.01 : Constant.newScale);
        this.skipPopupContainer.setPosition(
            _newWidth / 2,
            _newHeight / 2
        );
    }
}

export default SkipPopup;