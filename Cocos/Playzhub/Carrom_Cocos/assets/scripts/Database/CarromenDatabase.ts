import { _decorator, CCBoolean, Component, director, Node, RigidBody2D, Sprite, tween, Vec2, Vec3 } from 'cc';
import { AnimationManager } from '../utils/AnimationManger';
const { ccclass, property } = _decorator;

@ccclass('CarromenDatabase')
export class CarromenDatabase extends Component {
    //#region -Fields
    @property(CCBoolean) private isBlack: boolean;
    @property(CCBoolean) private isWhite: boolean;
    @property(CCBoolean) private isQueen: boolean;
    @property(CCBoolean) private isPenaltyPawn: boolean;
    private isPocketable: boolean = false;
    @property(CCBoolean) private isPocket: boolean = false;
    private rigidBody: RigidBody2D = null;

    private originalPosition: Vec3 = Vec3.ZERO;
    //#endregion

    //#region -start
    protected start(): void {
        this.rigidBody = this.node.getComponent(RigidBody2D);
        this.originalPosition = this.node.getPosition().clone();
    }
    //#endregion

    //#region -IsBlack
    IsBlack(): boolean {
        return this.isBlack;
    }
    //#endregion

    //#region -IsWhite
    IsWhite(): boolean {
        return this.isWhite;
    }
    //#endregion

    IsChoosedColor(_color: string): boolean {
        if (_color === 'White') {
            return this.IsWhite() || this.IsQueen();
        } else {
            return this.IsBlack() || this.IsQueen();
        }
    }

    //#region -IsQueen
    IsQueen(): boolean {
        return this.isQueen;
    }
    //#endregion

    IsPenaltyPawn(): boolean {
        return this.isPenaltyPawn;
    }

    //#region -IsPocketable
    IsPocketable(): boolean {
        return this.isPocketable;
    }
    //#endregion

    //#region -IsPocket
    IsPocket(): boolean {
        return this.isPocket;
    }
    //#endregion

    //#region -SetPocket
    SetPocket(_isPocket: boolean, pocketNode?: Node): void {
        this.isPocket = _isPocket;
        AnimationManager.PocketAnimation(this.node, this.isPocket, pocketNode);
    };
    //#endregion

    SetToDefaultPosition(): void {
        this.node.setPosition(this.originalPosition);
    }

    //#region FocusAnimation
    /**
     * @description - Animation for target coins.
     */
    FocusAnimation(): void {
        if (!this.IsPocket()) {
            const zScale = this.node.getScale().z;
            this.node.setScale(1.05, 1.05, zScale);
            tween(this.node).to(0.5, { scale: new Vec3(1, 1, zScale) }, { easing: 'bounceOut' }).start();
        }
    }
    //#endregion

    //#region -StopMovement
    StopMovement(): void {
        if (this.rigidBody)
            this.rigidBody.linearVelocity = new Vec2(Vec2.ZERO);
    }
    //#endregion
}


