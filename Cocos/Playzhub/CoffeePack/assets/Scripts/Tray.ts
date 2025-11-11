import { _decorator, Component, EventTouch, Input, Node, Vec3, SpriteFrame, UITransform, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import { Constant, GameEvents } from './utils/Constant';
import { TrayItem } from './TrayItem';

@ccclass('Tray')
export class Tray extends Component {
    private startPos: Vec3;
    @property([SpriteFrame]) trayItemSpriteFrame: SpriteFrame[] = [];//["Blue-cup", "Brown-cup", "Green-cup", "Purple-cup", "Red-cup", "Yellow-cup"];

    trayItem: string[] = [];
    trayNode: Node;
    trayItemComponents: (TrayItem | null)[] = [];
    trayItemNodes: Node[] = [];

    isDestroyed: boolean = false;
    //01/05/2025 written
    gridX: number;
    gridY: number;
    trayUniqueKey: string;

    protected onLoad(): void {
        this.trayItem = new Array(6).fill("");
        this.EnableInputEvent();
        this.trayNode = this.node.getChildByName("Tray");
        if (this.trayNode) {
            this.trayItemComponents = this.trayNode.getComponentsInChildren(TrayItem);
            this.trayItemNodes = this.trayItemComponents.map(trayItemComp => trayItemComp.node);
        }
    };

    protected onDestroy(): void {
        this.DisableInputEvent();
    };

    SetTrayUniqueKey(_key) {
        this.trayUniqueKey = _key;
    }
    SetTrayGridPosition(x: number, y: number,) {
        this.gridX = x;
        this.gridY = y;
    };

    IsTrayEmpty(arr: string[]): boolean {
        return arr.every(item => item.trim() === "");
    }

    SetTrayItem(_data: string[]) {
        this.trayItem = _data;
        // console.log("_data: ", _data);

        // this.trayItem = [..._data];
        const isEmpty = this.IsTrayEmpty(_data);
        if (isEmpty) {
            this.node.destroy();
        } else {
            this.SetTrayItemImage();
        }
    };

    SetTrayItemImage() {
        this.trayItemComponents?.forEach((trayItemComp, index) => {
            const cupName = this.trayItem[index];
            if (cupName) {
                trayItemComp.setItem(cupName, this.trayItemSpriteFrame);
            } else {
                trayItemComp.clearItem();
            }
        });
    };

    OnTouchStart(event: EventTouch): void {
        this.startPos = this.node.getPosition();
    };

    OnDragGameObject(event: EventTouch): void {
        const uiTransform = this.node.parent.getComponent(UITransform);
        const location = event.getUILocation();
        const localPos = uiTransform.convertToNodeSpaceAR(new Vec3(location.x, location.y, 0));
        this.node.setPosition(localPos);

        Constant.event.emit(GameEvents.ON_TABLE_TRAY_TOUCH_MOVE, this.node);
    };

    OnTouchEnd() {
        Constant.event.emit(GameEvents.ON_TABLE_TRAY_TOUCH_END, this.node);
    };

    onTouchCancel() {
        Constant.event.emit(GameEvents.ON_TABLE_TRAY_TOUCH_CANCEL, this.node);
    };

    EnableInputEvent() {
        this.node.on(Input.EventType.TOUCH_START, this.OnTouchStart, this)
        this.node.on(Input.EventType.TOUCH_MOVE, this.OnDragGameObject, this);
        this.node.on(Input.EventType.TOUCH_END, this.OnTouchEnd, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    };
    DisableInputEvent() {
        this.node.off(Input.EventType.TOUCH_START, this.OnTouchStart, this)
        this.node.off(Input.EventType.TOUCH_MOVE, this.OnDragGameObject, this);
        this.node.off(Input.EventType.TOUCH_END, this.OnTouchEnd, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    };

    DestroyTray() {
        this.scheduleOnce(async () => {
            this.isDestroyed = true;
            this.node?.destroy();
        }, 0.5)
    }

    AddItem(color: string): boolean {
        if (!color || this.trayItem.length >= 6) {
            return false;
        }

        // Reject if there's already a different color
        const nonEmptyColors = this.trayItem.filter(c => c.trim() !== "");
        if (nonEmptyColors.length > 0 && nonEmptyColors[0] !== color) {
            return false;
        }

        const emptyIndex = this.trayItem.findIndex(item => item.trim() === "");
        if (emptyIndex === -1) return false;

        this.trayItem[emptyIndex] = color;
        this.SetTrayItemImage();
        return true;
    }


}