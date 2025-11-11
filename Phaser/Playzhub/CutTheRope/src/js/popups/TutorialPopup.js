import Button from "../class/Button";
import { Utils } from "../class/Utils";
import { Constant } from "../Constant";
import Texture from "../gameObjectsClass/Texture";

export default class TutorialPopup {
    constructor(scene) {
        this.scene = scene;
        this.tutorialPopupContainer = null;
        this.currentPageIndex = 1;
        this.currentScale = null;
        this.create();
    }
    create() {
        this.currentScale = Utils.getScale(1080, 1920, Constant.clientWidth, Constant.clientHeight);
        this.tutorialBg = new Texture(this.scene, 0, 0, 'tut_bg');
        this.tutorialBg.setDepth(4);
        this.tutorialBg.SetInteractive();
        this.tutorialPopupContainer = this.scene.add.container(0, 0).setDepth(4);
        this.AddImageOnContainer();
        this.tutAnim = this.scene.add.spine(0, -600, 'tutorial_anim').setDepth(4);
        this.tutorialPopupContainer.add(this.tutAnim);
        this.tutAnim.setAnimation(0, 'hand_cut', true);
        this.skipButton = new Button(this.scene, 'skip_but', 1);
        this.skipButton.button.SetOrigin(0.5);
        this.skipButton.setClickcallback(this.SkipButFunc, this, null);
        this.preButton = new Button(this.scene, 'pre_but', 1);
        this.preButton.button.SetOrigin(0.5);
        this.preButton.button.setVisible(false);
        this.preButton.setClickcallback(this.PreButFunc, this, null);
        this.nextButton = new Button(this.scene, 'next_but', 1);
        this.nextButton.button.SetOrigin(0.5);
        this.nextButton.setClickcallback(this.NextButFunc, this, null);
        this.VisibleControl(false);
    }
    SkipButFunc() {
        this.VisibleControl(false);
        this.scene.RopeCutControl();
    }
    PreButFunc() {
        // this.tutorialPopupContainer.x -= 1080 * this.currentScale;
        this.TutorialContainerTween(-1080 * this.currentScale)
        this.currentPageIndex -= 1;
        this.PreAndNextButControl(this.currentPageIndex);
    }
    NextButFunc() {
        // this.tutorialPopupContainer.x += 1080 * this.currentScale;
        this.TutorialContainerTween(1080 * this.currentScale)
        this.currentPageIndex += 1;
        this.PreAndNextButControl(this.currentPageIndex);
    }
    VisibleControl(_isVisible) {
        this.tutorialBg.setVisible(_isVisible);
        this.tutorialPopupContainer.setVisible(_isVisible);
        this.nextButton.button.setVisible(_isVisible);
        if (this.currentPageIndex !== 1) {
            this.preButton.button.setVisible(_isVisible);
        }
        this.skipButton.button.setVisible(_isVisible);
    }
    PreAndNextButControl(_pageIndex) {
        // this.preButton.button.setVisible(this.tutorialPopupContainer.x > 540 * this.currentScale);
        // this.nextButton.button.setVisible(this.tutorialPopupContainer.x < 4860 * this.currentScale);
        switch (_pageIndex) {
            case 1:
                this.tutAnim.x = 0
                this.tutAnim.y = -600
                this.preButton.button.setVisible(false)
                break;
            case 2:
                this.tutAnim.x = -1080
                this.tutAnim.y = -600
                this.preButton.button.setVisible(true)
                break;
            case 3:
                this.tutAnim.x = -2220
                this.tutAnim.y = -500
                break;
            case 4:
                this.tutAnim.x = -3200
                this.tutAnim.y = -600
                this.nextButton.button.setVisible(true);
                break;
            case 5:
                this.tutAnim.x = -4500
                this.tutAnim.y = -600
                this.nextButton.button.setVisible(false);
                break;
        }
    }
    TutorialContainerTween(_posX) {
        this.scene.tweens.add({
            targets: this.tutorialPopupContainer,
            x: this.tutorialPopupContainer.x + _posX,
            duration: 1500,
            ease: 'Power2',
            // Callback when the tween starts
            onStart: () => {
                this.preButton.TouchDisable();
                this.nextButton.TouchDisable();
            },
            // Callback when the tween completes
            onComplete: () => {
                this.preButton.TouchEnable();
                this.nextButton.TouchEnable();
            }
        });
    }
    AddImageOnContainer() {
        let widthFactor = 0;
        for (let index = 1; index <= 5; index++) {
            const element = this.scene.add.image(widthFactor, 0, 'tut_0' + index);
            this.tutorialPopupContainer.add(element);
            widthFactor -= 1080;
        }
    }
    Resize(_newWidth, _newHeight, _newScale) {
        this.currentScale = _newScale;
        this.tutorialBg.SetDisplay(_newWidth, _newHeight);
        this.tutorialPopupContainer.setScale(_newScale);
        this.tutorialPopupContainer.setPosition(_newWidth / 2, _newHeight / 2);
        this.skipButton.button.setDepth(4);
        this.skipButton.SetScale(_newScale);
        this.skipButton.button.setPosition(_newWidth - 115 * _newScale, 150 * _newScale);
        this.preButton.button.setDepth(4);
        this.preButton.SetScale(_newScale);
        this.preButton.button.setPosition(115 * _newScale, _newHeight - 115 * _newScale);
        this.nextButton.button.setDepth(4);
        this.nextButton.SetScale(_newScale);
        this.nextButton.button.setPosition(_newWidth - 115 * _newScale, _newHeight - 115 * _newScale);
    }
}