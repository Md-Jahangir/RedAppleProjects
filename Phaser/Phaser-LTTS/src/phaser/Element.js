import ElementThumb from './ElementThumb.js';
import { StateManager } from './StateManager.js';

class Element {
    constructor(_elementObject, _scene) {
        this.elem = null;
        this.scene = _scene;
        this.CreateElements(_elementObject);
        this.elementThumb = new ElementThumb(_scene);
    }

    CreateElements(_elementObject) {
        // console.log('The element object.............', _elementObject);
        this.elem = this.scene.physics.add.sprite(0, 0, '').setOrigin(0.5).setScale(window.phaserGame.scaleFactorX * 1).setImmovable(true);
        this.elem.elementId = _elementObject.id;
        this.elem.imageType = _elementObject.imageType;
        this.elem.imageName = _elementObject.imageName;
        this.elem.xPos = _elementObject.x;
        this.elem.yPos = _elementObject.y;
        this.elem.elementScaleFactor = _elementObject.scalefactor;
        this.elem.frameWidth = _elementObject.frameWidth;
        this.elem.frameHeight = _elementObject.frameHeight;
        this.elem.interactions = _elementObject.interactions;
        this.elem.currentState = _elementObject.currentState;
        this.elem.states = _elementObject.states;
        this.elem.animationName = _elementObject.animationName;
        this.elem.startFrame = _elementObject.startFrame;
        this.elem.endFrame = _elementObject.endFrame;
        this.elem.animationFrameRate = _elementObject.animationFrameRate;
        this.elem.animationRepeat = _elementObject.animationRepeat;
        this.elem.currentFrame = _elementObject.currentFrame;
        this.elem.dropFrame = _elementObject.dropFrame;
        this.elem.normalStateFrame = _elementObject.normalStateFrame;
        this.elem.blinkStateFrame = _elementObject.blinkStateFrame;
        this.elem.indicatorMessage = _elementObject.indicatorMessage;
        this.elem.localState = _elementObject.localState;

        this.elem.setPosition(this.elem.xPos, this.elem.yPos);
        this.elem.setTexture(this.elem.imageName);
        this.elem.setScale(this.elem.elementScaleFactor);
        this.elem.setSize(this.elem.frameWidth, this.elem.frameHeight);

        this.elem.setInteractive();
        this.elem.on('pointerdown', this.OnButtonClick, this);

        if (this.elem.imageType.includes('spriteSheet')) {
            //SET FRAME FOR THE ELEMENTS
            this.elem.setFrame(this.elem.currentFrame);

            //SET ANIMATION FOR THE ELEMENTS
            if (this.elem.animationName !== '') {
                this.scene.anims.create({
                    key: this.elem.animationName,
                    frameRate: this.elem.animationFrameRate,
                    repeat: this.elem.animationRepeat,
                    frames: this.scene.anims.generateFrameNumbers(this.elem.imageName, {
                        start: this.elem.startFrame,
                        end: this.elem.endFrame
                    }),
                });
            }
        }
        // console.log('this: ', this);
        this.UpdateState(this.elem.currentState, this.elem.xPos, this.elem.yPos);

        return this.elem;
    }

    AddPhysics(_player) {
        const collider = this.scene.physics.add.collider(this.elem, _player, () => {
            this.scene.elementManager.selectedElement = this;
            if (this.elem.elementId.includes('videoHitSpot')) {
                this.scene.physics.world.removeCollider(collider);
                this.scene.modalManager.ShowModal('VIDEO INTRO');
            }
            // if (this.scene.elementManager.pickedElement == null) {
            //     // console.log('element player colision check :: ', element);
            //     this.scene.elementManager.selectedElement = this;
            //     if (this.elem.elementId.includes('videoHitSpot')) {
            //         this.elem.body.enable = false;
            //         this.scene.ShowVideoModal();
            //     }
            // }
        });
    }

    PickItem() {
        // console.log('pick item');
        // if (this.elem.interactivityEvent == 'pickup') {
        //     console.log('pickup');
        // }
        if (this.scene.elementManager.pickedElement == null) {
            const interactions = this.elem.interactions[this.elem.currentState].i;
            for (let i = 0; i < interactions.length; i++) {
                if (interactions[i].interactivityEvent === 'pickup') {
                    // console.log('pickup');
                    this.scene.elementManager.selectedElement.elem.visible = false;
                    this.scene.elementManager.selectedElement.elem.body.enable = false;
                    this.scene.elementManager.pickedElement = this.scene.elementManager.selectedElement;
                    StateManager.addElementToBag(this.scene.elementManager.selectedElement.elem.elementId);
                    if (this.scene.elementManager.selectedElement.elem.dropFrame) {
                        this.scene.elementManager.selectedElement.elem.setFrame(
                            this.scene.elementManager.selectedElement.elem.dropFrame
                        );
                    }
                    this.elementThumb.show(
                        this.scene.elementManager.selectedElement.elem.elementId,
                        this.scene.elementManager.selectedElement.elem.dropFrame
                    );
                }
            }
        }
    }

    DropItem() {
        // console.log('drop item');
        /* eslint-disable */
        if (this.scene.elementManager.pickedElement) {
            this.scene.elementManager.pickedElement.elem.visible = true;
            this.scene.elementManager.pickedElement.elem.body.enable = true;
            this.scene.elementManager.pickedElement.elem.x = this.scene.localPlayer.x * (1 / 1.8);
            this.scene.elementManager.pickedElement.elem.y = this.scene.localPlayer.y * (1 / 1.8);
            this.scene.children.bringToTop(this.scene.localPlayer);
            StateManager.removeElementFromBag(
                this.scene.elementManager.pickedElement.elem.elementId,
                this.scene.elementManager.pickedElement.elem.x,
                this.scene.elementManager.pickedElement.elem.y
            );
            this.elementThumb.hide();
        }
        this.scene.elementManager.pickedElement = null;
        this.scene.elementManager.selectedElement = null;
    }

    OnButtonClick() {
        // console.log('creating modal');
        const interactions = this.elem.interactions[this.elem.currentState].i;
        for (let i = 0; i < interactions.length; i++) {
            if (interactions[i].interactivity === 'click' && interactions[i].interactivityEvent === 'ShowModal') {
                // console.log('show modal');
                this.scene.modalManager.ShowModal(interactions[i].interactivityEventData);
            }
        }
    }

    PlayAnimation() {
        // console.log('anima play');
        this.elem.play(this.elem.animationName);
    }

    PlayBlinkAnimation() {
        // console.log('this.elem.blinkStateFrame:  :', this.elem.blinkStateFrame);
        if (this.elem.imageType.includes('spriteSheet')) {
            // if (this.elem.animationName !== '' && this.elem.blinkStateFrame !== '') {
            if (this.elem.animationName !== '' && this.elem.blinkStateFrame.length > 0) {
                this.elem.play(this.elem.animationName);
            }
        }
    }
    StopBlinkAnimation() {
        this.elem.anims.stop();
    }

    SetFrame(_index) {
        this.elem.setFrame(_index);
    }

    ToggleFrame() {
        // let currentFrame = this.elem.currentFrame;
        // this.elem.setframe(1);
        // console.log('this.elem');
        // console.log('currentFrame', currentFrame);
        // if (currentFrame == 0) {
        //     currentFrame = 1;
        // } else {
        //     currentFrame = 0;
        // }
        // this.SetFrame(currentFrame);
    }

    ShowElements() {
        this.elem.setVisible(true);
    }

    HideElements() {
        this.elem.setVisible(false);
    }

    EnableBodyOfElement() {
        this.elem.body.enable = true;
    }

    DisableBodyOfElement() {
        this.elem.body.enable = false;
    }

    UpdateState(_newState, _x, _y) {
        this.elem.currentState = _newState;
        this.elem.xPos = _x;
        this.elem.yPos = _y;
        this.elem.setPosition(_x, _y);

        let closeStates = ['close', 'show', 'plug', 'dropped', 'forgotPassword', 'installationDate', 'maidenName', 'revertUpdate']
            // if (this.elem.currentState.includes('close') ||
            //     this.elem.currentState.includes('show') ||
            //     this.elem.currentState.includes('plug')) {

        if (closeStates.includes(this.elem.currentState)) {
            this.elem.setFrame(this.elem.currentFrame);
            this.EnableBodyOfElement();
            this.PlayBlinkAnimation();
            if (this.elem.currentState.includes('show') || this.elem.currentState.includes('dropped')) {
                this.ShowElements();
            }
        } else {
            this.elem.setFrame(this.elem.normalStateFrame);
            if (this.elem.currentState.includes('hide') || this.elem.currentState.includes('picked')) {
                this.HideElements();
                this.DisableBodyOfElement();
            }
            if (this.elem.elementId.includes('door')) {
                this.DisableBodyOfElement();
            }
            if (this.elem.elementId.includes('top_left_door')) {
                this.DisableBodyOfElement();
                this.HideElements();
            }
            this.StopBlinkAnimation();
        }
    }

    UpdateLocallyState() {
        if (this.elem.currentState.includes('show')) {
            this.elem.setFrame(this.elem.normalStateFrame);
            this.HideElements();
            this.DisableBodyOfElement();
        }
        this.StopBlinkAnimation();
    }

    SetBlinkStateFrame(_index) {
        this.elem.setframe(_index);
    }
    SetNormalStateFrame(_index) {
        this.elem.setframe(_index);
    }
}
export default Element;
