import { _decorator, BoxCollider2D, Color, Component, Node, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
import { GameManager } from './GameManager';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('ElementDatabase')
export class ElementDatabase extends Component {
    //#region -Fields
    private value: number | null;
    private isInteractable: boolean = false;
    private spawnPosition: Vec3 = new Vec3(0, 0, 0);

    @property(SpriteFrame) number1: SpriteFrame;
    @property(SpriteFrame) number2: SpriteFrame;
    @property(SpriteFrame) number3: SpriteFrame;
    @property(SpriteFrame) number4: SpriteFrame;
    @property(SpriteFrame) number5: SpriteFrame;
    @property(SpriteFrame) number6: SpriteFrame;
    @property(SpriteFrame) number7: SpriteFrame;
    @property(SpriteFrame) number8: SpriteFrame;
    @property(SpriteFrame) number9: SpriteFrame;

    childListArray: Node[] = [];
    parentListArray: Node[] = [];
    //#endregion

    //#region -All Interactive Related Functions.
    SetInteractable(_isInteractable: boolean): void {
        this.isInteractable = _isInteractable;
        this.isInteractable ? this.node.getComponent(Sprite).color = Color.WHITE : this.node.getComponent(Sprite).color = new Color(180, 179, 179, 255);
    }

    GetInteractable(): boolean {
        return this.isInteractable;
    }

    CheckForInteractive(): void {
        this.childListArray.length === 0 ? this.SetInteractable(true) : this.SetInteractable(false);
    }
    //#endregion

    //#region -All Value Related Functions.
    GetValue(): number {
        return this.value;
    }

    SetValue(_value: number): void {
        this.value = _value;
    }
    //#endregion

    //#region -All Texure Related Functions
    SetSprite(_spriteValue: number): void {
        this.node.getComponent(Sprite).spriteFrame = this["number" + _spriteValue];
    }
    //#endregion

    //#region -GetSprite
    GetSprite(): SpriteFrame {
        return this.node.getComponent(Sprite).spriteFrame;
    }
    //#endregion

    //#region -PlayAnimation
    PlayAnimation(_targetPosition: Vec3): void {
        this.spawnPosition = this.node.getPosition();
        let newPosition: Vec3 = new Vec3(_targetPosition.x - this.node.parent.getPosition().x, _targetPosition.y - this.node.parent.getPosition().y, this.node.parent.getPosition().z);
        tween(this.node).to(0.35, { position: newPosition, scale: new Vec3(0.4, 0.4, this.node.getScale().z) }, {
            easing: 'backIn', onComplete: () => {
                GameManager.instance.gameEvent.emit("update_slot");
                this.SetInteractable(false);
                this.SetSprite(0);
                SoundManager.instance.FruitStackSound();
            }
        }).start();
    }

    PlayUndoAnimation(): void {
        tween(this.node).to(0.35, { position: this.spawnPosition, scale: new Vec3(1, 1, this.node.getScale().z) }, {
            easing: "backOut", onStart: () => {
                this.SetInteractable(true);
                this.SetSprite(this.value);
            },
            onComplete: () => {
                SoundManager.instance.FruitStackSound();
            }
        }).start();
    }
    //#endregion

    //#region -Parent and Child
    AddParent(_object: Node): void {
        _object?.getComponent(ElementDatabase).AddChild(this.node);
        this.parentListArray.push(_object);
    }

    GetParentList(): Node[] {
        return this.parentListArray;
    }

    AddChild(_object: Node): void {
        this.childListArray.push(_object);
    }

    GetChildList(): Node[] {
        return this.childListArray;
    }

    RemoveChild(): void {
        if (this.childListArray.length === 1)
            this.childListArray = [];
        else if (this.childListArray.length > 1)
            this.childListArray.pop();
    }

    RemoveParent(): void {
        if (this.parentListArray.length > 0) {
            this.parentListArray.forEach((_parent: Node, _index: number) => {
                // if (_index === this.parentListArray.length - 1) {
                _parent?.getComponent(ElementDatabase).RemoveChild();
                _parent?.getComponent(ElementDatabase).CheckForInteractive();
                // }
            });
        }
    }
    //#endregion

    //#region -SetOnTop
    SetOnTop(_topLayerNode: Node): void {
        _topLayerNode.setPosition(this.node.parent.getPosition());
        const originalParentNode: Node = this.node.getParent();

        this.node.setParent(_topLayerNode);
        this.scheduleOnce(() => {
            this.node.setParent(originalParentNode);
        }, 0.5);
    }
    //#endregion

    ResetElement(): void {
        this.parentListArray = [];
        this.childListArray = [];
        this.spawnPosition = new Vec3(0, 0, 0);
        this.SetValue(0);
        this.SetSprite(0);
        this.SetInteractable(true);
    }
}


