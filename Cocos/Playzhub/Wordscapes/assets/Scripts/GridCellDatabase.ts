import { _decorator, Animation, Component, Label, Node, sp, Sprite, SpriteFrame } from 'cc';
import { Constant, GAME_EVENTS } from './globals/Constant';
import { GameManager } from './GameManager';
import { AnimationManager } from './Utils/AnimationManager';
const { ccclass, property } = _decorator;

@ccclass('GridCellDatabase')
export class GridCellDatabase extends Component {
    //#region -Fields
    private gridPosition: Object = {
        "row": null,
        "column": null
    };
    //Spriteframes
    private backgroundSprite: Sprite;
    private enabledSpriteFrame: SpriteFrame = null;
    private disabledSpriteFrame: SpriteFrame = null;

    //Alphabet
    private alphabet: string = '';
    private alphabetNode: Node;
    private alphabetText: Label;
    private alphabetOutline: Label;
    private alphabetShadow: Label;

    //Local variables
    private isVisble: boolean = false;
    private isAlphabetVisible: boolean = false;
    private isRevealed: boolean = false;

    //Hint timer
    unSheduleHintFunction = null;
    private timerGraphics: Sprite = null;
    private timerGraphicParent: Node = null;

    //Animations
    private animationComponent: Animation = null;
    private rippleSpineAnimation: sp.Skeleton = null;

    //#endregion

    //#region -onEnable
    protected onEnable(): void {
        const rootNode = this.node;

        // Get Letter Node and Its Components
        this.alphabetNode = rootNode.getChildByName('letter');
        if (this.alphabetNode) {
            this.alphabetText = this.alphabetNode.getComponent(Label);
            if (this.alphabetText) {
                const children = this.alphabetText.node.children;
                this.alphabetOutline = children[0]?.getComponent(Label);
                this.alphabetShadow = children[1]?.getComponent(Label);
                this.alphabetText.enabled = this.isAlphabetVisible;
            }
        }

        //Background Sprite
        this.backgroundSprite = rootNode.getChildByName('baseImage')?.getComponent(Sprite);

        //Animation Component
        this.animationComponent = rootNode.getComponent(Animation);
        this.rippleSpineAnimation = rootNode.getChildByName('ripple').getComponent(sp.Skeleton);

        //Timer graphics and parent
        const timerParent = rootNode.getChildByName("timerGraphicsBase");
        if (timerParent) {
            this.timerGraphics = timerParent.children[0]?.getComponent(Sprite);
            this.timerGraphicParent = this.timerGraphics?.node.parent;
            if (this.timerGraphicParent) this.timerGraphicParent.active = false;
        }
        this.SetAlphabet(''); // Initially set alphabet.

        GameManager.instance.gameEvent.on(GAME_EVENTS.LEVEL_COMPLETE, this.UnsheduleCallbacks, this);
    }
    //#endregion

    //#region -SetSpriteFrame
    /**
     * @description - Spriteframes for set Sprite
     * @param _enabledSpriteFrame 
     * @param _disabledSpriteFrame 
     */
    SetSpriteFrame(_enabledSpriteFrame: SpriteFrame, _disabledSpriteFrame: SpriteFrame): void {
        this.enabledSpriteFrame = _enabledSpriteFrame;
        this.disabledSpriteFrame = _disabledSpriteFrame;

        this.backgroundSprite.spriteFrame = this.enabledSpriteFrame;
    }
    //#endregion

    //PlayRippleAnimation
    PlayRippleAnimation(_key: string, _isLoop: boolean): void {
        this.rippleSpineAnimation.setAnimation(0, _key, _isLoop);
    }
    //#endregion

    //#region -StopRippleAnimation
    StopRippleAnimation(): void {
        this.rippleSpineAnimation.clearTracks();
        this.rippleSpineAnimation.setToSetupPose();
    }
    //#endregion

    //#region SetFontSize
    /**
     * @description - Setting font size
     * @param _size 
     */
    SetFontSize(_size: number): void {
        this.alphabetText.fontSize = _size;
        this.alphabetOutline.fontSize = _size;
        this.alphabetShadow.fontSize = _size;
        this.SetGraphicsPositionAndSize(_size);
    }
    //#endregion

    //#region -SetGraphicsPositionAndSize
    SetGraphicsPositionAndSize(_size: number): void {
        const pos = _size / 2;
        this.timerGraphicParent.setPosition(pos, -pos, 1);
        // const scale = _size / 119;
        const scale = _size / 100;
        this.timerGraphicParent.setScale(scale, scale, 1)
        this.rippleSpineAnimation.node.setScale(scale, scale, 1);
    }
    //#endregion

    //#region -SetRowAndColumn
    /**
     * @description - Setting Row and Column while spawn in grid.
     * @param _row 
     * @param _col 
     */
    SetRowAndColumn(_row: number, _col: number): void {
        this.gridPosition = {
            "row": _row,
            "column": _col
        }
    }
    //#endregion

    //#region -GetRowAndColumn
    /**
     * @description - Get current row and column.
     * @returns 
     */
    GetRowAndColumn(): Object {
        return this.gridPosition;
    }
    //#endregion

    //#region -SetAlphabet
    /**
     * @description - Set alphabet ofgrid cell for reveal words.
     * @param _alphbet 
     */
    SetAlphabet(_alphbet: string): void {
        this.alphabet = _alphbet;
        this.alphabetText.string = this.alphabet;
        this.alphabetOutline.string = this.alphabet;
        this.alphabetShadow.string = this.alphabet;
    }
    //#endregion

    //#region -ShowAlphabet
    /**
     * @description - Show alphabets
     * @param _isVisible 
     */
    ShowAlphabet(_isVisible: boolean): void {
        this.alphabetText.enabled = _isVisible;
        this.alphabetText.enabled = _isVisible;
        this.alphabetOutline.enabled = _isVisible;
        this.alphabetShadow.enabled = _isVisible;
    }
    //#endregion

    //#region IsRevealed
    /**
     * @description - Setting reveled letter.
     * @param _isRevealed - Set bool to isRevealed or not Revealed. 
     * @param _delay - How much delay for start animation.
     */
    IsRevealed(_isRevealed: boolean, _delay: number): void {
        if (_isRevealed) {
            this.isRevealed = true;
            this.scheduleOnce(() => {
                this.rippleSpineAnimation.setAnimation(0, "ripple", false);
                this.animationComponent.stop();
                this.backgroundSprite.spriteFrame = this.disabledSpriteFrame;
                this.animationComponent.play('RevealedAnimationClip');
            }, _delay / 20);
            if (this.timerGraphicParent.active) {
                this.timerGraphicParent.active = false;
            }
        } else {
            this.backgroundSprite.spriteFrame = this.enabledSpriteFrame;
            this.isRevealed = false
        }
    }
    //#endregion

    //#region -HintCell
    /**
     * @description - Only active this cell for given time, Only for hint purpose.
     */
    HintCell(): void {
        if (!this.isRevealed) {
            this.ShowAlphabet(true); // Show hint

            //Hint related animations
            this.timerGraphicParent.active = true;
            const animationEndCallback = () => {
                this.timerGraphicParent.active = false
            }
            AnimationManager.HintTimer(this.timerGraphics, Constant.HINT_HIGHLIGHT_TIME, 1, 0, animationEndCallback);
            this.animationComponent.play('RevealedAnimationClip');

            //Remove Hint
            this.unSheduleHintFunction = this.scheduleOnce(() => {
                if (!this.isRevealed)
                    this.ShowAlphabet(false);
            }, Constant.HINT_HIGHLIGHT_TIME);
        }
    }
    //#endregion

    //#region UnsheduleCallbacks
    /**
     * @description - Unsheduling call backs which will not required to call after called in scedule.
     */
    UnsheduleCallbacks(): void {
        if (this.unSheduleHintFunction)
            this.unschedule(this.unSheduleHintFunction);
    }
    //#endregion

    //#region -GetRevealed
    /**
     * @description - For check all visible grid are revealed and complete.
     * @returns isRevealed.
     */
    GetRevealed(): boolean {
        return this.isRevealed;
    }
    //#endregion

    //#region -IsVisible
    /**
     * @description - for checking visiblity of cell while check level complete. 
     * @returns visiblity of grid cell.
     */
    IsVisible(): boolean {
        return this.isVisble;
    }
    //#endregion

    //#region -SetVisible
    /**
     * @description - Visiblity control.
     * @param _isVisible 
     */
    SetVisible(_isVisible: boolean): void {
        this.isVisble = _isVisible;
        this.backgroundSprite.enabled = this.isVisble;
    }
    //#endregion

    //#region - BuzzitFocus
    IsActiveForFocus(): boolean {
        if (this.isVisble && !this.isRevealed) return true;
        else return false;
    }

    PlayFocusAnimation(): void {
        this.animationComponent.play('GridCellVibrateAnimationClip');
    }

    StopFocusAnimation(): void {
        this.animationComponent.stop();
    }
    //#endregion

    //#region -PlayDropAnimation
    /**
     * @description - While revealing letter.
     * @param _delay 
     */
    PlayDropAnimation(_delay: number): void {
        this.scheduleOnce(() => {
            this.rippleSpineAnimation.setAnimation(0, "big_ripple", false);
            this.animationComponent.play('RevealedAnimationClip');
        }, _delay / 10);
    }
    //#endregion

    //#region GetCurrentCellStatusForResume
    /**
     * @description - Getting current cell state for resume game!
     */
    GetCurrentCellStatusForResume(): void {
        const gridCurrentStates = {
            "isVisible": this.isVisble,
            "isRevealed": this.isRevealed,
        }
    }
    //#endregion

    //#region -Reset
    /**
     * @description - Reset Grid cell after used or level complete.
     */
    Reset(): void {
        this.gridPosition = {
            "row": null,
            "column": null
        };
        this.isVisble = false;
        this.isRevealed = false;
        this.SetAlphabet('');
    }
    //#endregion
}