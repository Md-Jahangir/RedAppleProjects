/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 22-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 23-08-2024
 * @Description :- Movement Button Class.
 ************************************/
import { _decorator, Component, Input, Node, Sprite, SpriteFrame } from 'cc';
import { PlayerScript } from './PlayerScript';
const { ccclass, property } = _decorator;

@ccclass('MoveButtons')
export class MoveButtons extends Component {
    @property(Node) leftButton: Node = null;
    @property(Node) rightButton: Node = null;
    @property(Node) player: Node = null;

    @property(SpriteFrame) leftMoveSpriteNormal: SpriteFrame;
    @property(SpriteFrame) leftMoveSpriteOver: SpriteFrame;

    @property(SpriteFrame) rightMoveSpriteNormal: SpriteFrame;
    @property(SpriteFrame) rightMoveSpriteOver: SpriteFrame;

    leftButtonSprite: Sprite;
    rightButtonSprite: Sprite;

    //#region -OnEnable
    /**
     * @description - start function for register events
     */
    protected onEnable(): void {
        this.leftButton.on(Input.EventType.TOUCH_START, this.OnLeftTouchStart, this);
        this.leftButton.on(Input.EventType.TOUCH_END, this.OnLeftTouchEnd, this);
        this.leftButton.on(Input.EventType.TOUCH_CANCEL, this.OnLeftTouchEnd, this);
        this.rightButton.on(Input.EventType.TOUCH_START, this.OnRightTouchStart, this);
        this.rightButton.on(Input.EventType.TOUCH_END, this.OnRightTouchEnd, this);
        this.rightButton.on(Input.EventType.TOUCH_CANCEL, this.OnRightTouchEnd, this);
    }
    //#endregion

    //#region - start
    start() {
        this.leftButtonSprite = this.leftButton.getComponent(Sprite);
        this.rightButtonSprite = this.rightButton.getComponent(Sprite);
    }
    //#endregion

    //#region - OnLeftTouch Start
    /**
     * @description - Action while press left button
     */
    OnLeftTouchStart(): void {
        this.leftButtonSprite.spriteFrame = this.leftMoveSpriteOver;
        this.player.getComponent(PlayerScript).WalkLeft();
    }
    //#endregion
    //#region - OnLeftTouch End
    /**
     * @description - Action while remove finger from left button
     */
    OnLeftTouchEnd() {
        this.leftButtonSprite.spriteFrame = this.leftMoveSpriteNormal;
        this.player.getComponent(PlayerScript).IdleState();
    }
    //#endregion
    //#region - OnRightTouch Start
    /**
     * @description - Action while press right button
     */
    OnRightTouchStart(): void {
        this.rightButtonSprite.spriteFrame = this.rightMoveSpriteOver;
        this.player.getComponent(PlayerScript).WalkRight();
    }
    //#endregion
    //#region - OnRightTouch End
    /**
     * @description - Action while remove finger from right button
     */
    OnRightTouchEnd(): void {
        this.rightButtonSprite.spriteFrame = this.rightMoveSpriteNormal;
        this.player.getComponent(PlayerScript).IdleState();
    }
    //#endregion
}


