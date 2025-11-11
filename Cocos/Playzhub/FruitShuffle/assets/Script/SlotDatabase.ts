import { _decorator, Component, Node, Sprite, SpriteFrame, Vec3, tween } from 'cc';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('SlotDatabase')
export class SlotDatabase extends Component {

    private isEmpty: boolean = true;
    private valueOfSlot: number = 0;

    rendererNode: Node | null = null;

    @property(SpriteFrame) number1: SpriteFrame;
    @property(SpriteFrame) number2: SpriteFrame;
    @property(SpriteFrame) number3: SpriteFrame;
    @property(SpriteFrame) number4: SpriteFrame;
    @property(SpriteFrame) number5: SpriteFrame;
    @property(SpriteFrame) number6: SpriteFrame;
    @property(SpriteFrame) number7: SpriteFrame;
    @property(SpriteFrame) number8: SpriteFrame;
    @property(SpriteFrame) number9: SpriteFrame;

    //#region -onEnable
    protected onEnable(): void {
        this.rendererNode = this.node.children[0];
    }
    //#endregion

    //#region -GetEmpty
    GetEmpty(): boolean {
        return this.isEmpty;
    }
    //#endregion

    //#region -SetEmpty
    /**
     * @param _isEmpty 
     */
    SetEmpty(_isEmpty: boolean): void {
        this.isEmpty = _isEmpty;
    }
    //#endregion

    //#region -GetValueOfSlot
    GetValueOfSlot(): number {
        return this.valueOfSlot;
    }
    //#endregion

    //#region -SetValueOfSlot
    /**
     * @param _value 
     */
    SetValueOfSlot(_value: number): void {
        this.valueOfSlot = _value;
    }
    //#endregion

    //#region -SetRenderer
    SetRenderer(_iconValue: number) {
        this.rendererNode.getComponent(Sprite).spriteFrame = this["number" + _iconValue];
    }
    //#endregion

    //#region -PlayAnimation
    PlayShiftingAnimation(): void {
        tween(this.rendererNode).to(0.35, { position: new Vec3(this.rendererNode.getPosition().x + 110, this.rendererNode.getPosition().y) }, {
            easing: 'backIn', onComplete: () => {
                this.rendererNode.setPosition(0, 0);
            }
        }).start();
    }
    //#endregion

    //#region -PlayDestroyAnimation
    PlayDestroyAnimation(): void {
        tween(this.rendererNode).to(0.35, { scale: new Vec3(0.2, 0.2) }, {
            easing: 'smooth', onComplete: () => {
                tween(this.rendererNode).to(0.35, { scale: new Vec3(1, 1) }, { easing: 'smooth' }).start();
            }
        }).start();
    }
    //#endregion
}


