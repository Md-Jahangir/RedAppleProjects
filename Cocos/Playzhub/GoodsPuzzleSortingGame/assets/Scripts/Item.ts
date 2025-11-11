import { _decorator, Component, Node, Sprite, SpriteFrame, Input, Vec3, Vec2, Color, UIOpacity, EventTouch, UITransform, find } from 'cc';
import { Constant, GameEvents } from './Constant';
const { ccclass, property } = _decorator;

@ccclass('Item')
export class Item extends Component {
    private startPos: Vec3;
    sprite: Sprite = null;
    public type: string;
    public layerIndex: number = 0;
    private originalParent: Node = null;
    private originalTray: Node = null;
    private dragLayer: Node = null;
    private startWorldPos: Vec3 = null;

    public isActive: boolean = false;

    onLoad() {
        // this.EnableInputEvent();
        this.sprite = this.getComponent(Sprite);
    };
    protected onDestroy(): void {
        this.DisableInputEvent();
    };
    start(): void {
        this.originalParent = this.node.parent;
    };

    SetItem(type: string, spriteFrame: SpriteFrame) {
        this.type = type;
        if (!this.sprite) {
            this.sprite = this.getComponent(Sprite);
        }
        this.sprite.spriteFrame = spriteFrame;
    };

    EnableInputEvent() {
        this.node.on(Input.EventType.TOUCH_START, this.OnTouchStart, this)
        this.node.on(Input.EventType.TOUCH_MOVE, this.OnTouchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this.OnTouchEnd, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, this.OnTouchCancel, this);
    };
    DisableInputEvent() {
        this.node.off(Input.EventType.TOUCH_START, this.OnTouchStart, this)
        this.node.off(Input.EventType.TOUCH_MOVE, this.OnTouchMove, this);
        this.node.off(Input.EventType.TOUCH_END, this.OnTouchEnd, this);
        this.node.off(Input.EventType.TOUCH_CANCEL, this.OnTouchCancel, this);
    };

    OnTouchStart(event: EventTouch): void {
        this.startPos = this.node.getPosition();
        this.startWorldPos = this.node.getWorldPosition();

        // Store original parent
        this.originalParent = this.node.parent;
        this.originalTray = this.originalParent?.parent?.parent;

        // Find DragLayer under Canvas
        this.dragLayer = find('Canvas/GameScene/DragLayer');
        if (this.dragLayer) {
            this.dragLayer.setSiblingIndex(this.dragLayer.parent.children.length - 1);
            this.node.setParent(this.dragLayer);
            this.node.setWorldPosition(this.startWorldPos);
        }
    };

    OnTouchMove(event: EventTouch): void {
        const uiTransform = this.node.parent.getComponent(UITransform);
        const location = event.getUILocation();
        const localPos = uiTransform?.convertToNodeSpaceAR(new Vec3(location.x, location.y, 0));
        this.node.setPosition(localPos);

        Constant.event.emit(GameEvents.ON_ITEM_TOUCH_MOVE, this.node);
    };

    OnTouchEnd(): void {
        const targetTray = this.GetTrayUnderItem();

        if (targetTray) {
            const itemContainer = targetTray.getChildByName('ItemContainer');
            if (itemContainer) {
                const totalItems = itemContainer.children.reduce((count, slot) => {
                    // Count only if topmost item is active
                    const lastItem = slot.children[slot.children.length - 1];
                    const script = lastItem?.getComponent(Item);
                    return count + (script?.isActive ? 1 : 0);
                }, 0);

                if (totalItems >= 3) {
                    this.RestoreToOriginalParent();
                    return;
                }

                // First try exact drop position
                const droppedSlot = this.GetDroppedPosition(itemContainer);
                if (droppedSlot) {
                    const canDrop = this.CanDropOnSlot(droppedSlot);
                    if (canDrop) {
                        this.PlaceItemInSlot(droppedSlot, targetTray);
                        return;
                    }
                }

                // Try fallback: first available slot
                const emptySlot = this.GetFirstAvailableSlot(itemContainer);
                if (emptySlot) {
                    this.PlaceItemInSlot(emptySlot, targetTray);
                    return;
                }
            }
        }

        this.RestoreToOriginalParent();
    }

    OnTouchCancel() {
        this.RestoreToOriginalParent();
        Constant.event.emit(GameEvents.ON_ITEM_TOUCH_CANCEL, this.node);
    };

    private RestoreToOriginalParent(): void {
        if (this.originalParent) {
            // console.log("this.originalParent: ", this.originalParent.name);
            this.node.setParent(this.originalParent);
            this.node.setPosition(Vec3.ZERO); // Reset to center of original Pos
        }
    };

    GetTrayUnderItem(): Node | null {
        const trayRoot = find('Canvas/GameScene/Tray');
        if (!trayRoot) return null;

        const itemWorldPos = this.node.getWorldPosition();
        const itemWorldPos2D = new Vec2(itemWorldPos.x, itemWorldPos.y);

        for (const trayPrefab of trayRoot.children) {
            const uiTransform = trayPrefab.getComponent(UITransform);
            if (uiTransform) {
                const boundingBox = uiTransform.getBoundingBoxToWorld();
                if (boundingBox.contains(itemWorldPos2D)) {
                    return trayPrefab;
                }
            }
        }
        return null;
    };

    GetDroppedPosition(itemContainer: Node): Node | null {
        const itemWorldPos = this.node.getWorldPosition();
        const itemWorldPos2D = new Vec2(itemWorldPos.x, itemWorldPos.y);

        for (const slot of itemContainer.children) {
            const uiTransform = slot.getComponent(UITransform);
            if (uiTransform) {
                const slotRect = uiTransform.getBoundingBoxToWorld();
                if (slotRect.contains(itemWorldPos2D)) {
                    return slot;
                }
            }
        }
        return null;
    };

    GetFirstEmptySlot(itemContainer: Node): Node | null {
        for (const slot of itemContainer.children) {
            if (slot.children.length === 0) {
                return slot;
            }
        }
        return null;
    };


    GetFirstAvailableSlot(itemContainer: Node): Node | null {
        for (const slot of itemContainer.children) {
            const children = slot.children;
            if (children.length === 0) return slot;

            const topItemNode = children[children.length - 1];
            const itemScript = topItemNode.getComponent(Item);
            if (itemScript && !itemScript.isActive) {
                // Slot is visually occupied but logically empty
                return slot;
            }
        }
        return null;
    };

    CanDropOnSlot(slot: Node): boolean {
        const children = slot.children;
        if (children.length === 0) return true;

        const topItem = children[children.length - 1];
        const script = topItem.getComponent(Item);
        return script && !script.isActive; // allow if top item is inactive
    }

    // PlaceItemInSlot(slot: Node, targetTray: Node): void {
    //     this.node.setParent(slot);
    //     this.node.setPosition(Vec3.ZERO);

    //     this.scheduleOnce(() => {
    //         Constant.event.emit(GameEvents.ON_ITEM_TOUCH_END, targetTray);
    //     }, 0.3);
    // };

    PlaceItemInSlot(slot: Node, targetTray: Node): void {
        this.node.setParent(slot);
        this.node.setPosition(Vec3.ZERO);

        this.scheduleOnce(() => {
            Constant.event.emit(GameEvents.ON_ITEM_TOUCH_END, targetTray);

            // ✅ Also check original tray (source of the item)
            if (this.originalTray && this.originalTray.isValid) {
                this.CheckAndActivateBackLayer(this.originalTray);
            }
        }, 0.3);
    }


    private CheckAndActivateBackLayer(trayNode: Node): void {
        const itemContainer = trayNode.getChildByName('ItemContainer');
        if (!itemContainer) return;

        // 1. Check if any active item exists (top layer)
        let hasActiveTop = false;
        for (const slot of itemContainer.children) {
            const topItemNode = slot.children[slot.children.length - 1];
            const itemScript = topItemNode?.getComponent(Item);
            if (itemScript?.isActive) {
                hasActiveTop = true;
                break;
            }
        }

        if (hasActiveTop) return;

        // 2. No active top-layer items → activate back-layer top items
        for (const slot of itemContainer.children) {
            const children = slot.children;
            for (let i = children.length - 1; i >= 0; i--) {
                const item = children[i].getComponent(Item);
                if (item && !item.isActive) {
                    item.isActive = true;
                    item.EnableInputEvent();

                    const sprite = children[i].getComponent(Sprite);
                    const opacity = children[i].getComponent(UIOpacity) || children[i].addComponent(UIOpacity);
                    sprite.color = Color.WHITE;
                    opacity.opacity = 255;
                    break; // only top-most inactive item
                }
            }
        }

        // console.log(`✅ Back layer activated in tray: ${trayNode.name}`);
    }




}


