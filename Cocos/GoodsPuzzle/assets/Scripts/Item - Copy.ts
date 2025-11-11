import { _decorator, Component, Node, Sprite, SpriteFrame, Input, Vec3, Vec2, EventTouch, UITransform, find } from 'cc';
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
        this.EnableInputEvent();
        this.sprite = this.getComponent(Sprite);
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

    // OnTouchEnd(): void {
    //     const targetTray = this.GetTrayUnderItem();

    //     if (targetTray) {
    //         const itemContainer = targetTray.getChildByName('ItemContainer');
    //         if (itemContainer) {

    //             // NEW: Check if the target tray is already full
    //             const totalItems = itemContainer.children.reduce((count, slot) => {
    //                 return count + (slot.children.length > 0 ? 1 : 0);
    //             }, 0);

    //             if (totalItems >= 3) {
    //                 // Tray full, restore item
    //                 this.RestoreToOriginalParent();
    //                 return;
    //             }

    //             // Try dropping to hovered slot
    //             const droppedSlot = this.GetDroppedPosition(itemContainer);
    //             if (droppedSlot && droppedSlot.children.length === 0) {
    //                 this.node.setParent(droppedSlot);
    //                 this.node.setPosition(Vec3.ZERO);
    //                 this.scheduleOnce(() => {
    //                     this.CheckForMatch(targetTray);
    //                 }, 0.5);


    //                 return;
    //             }

    //             // Try any empty slot if drop wasn't precise
    //             const emptySlot = this.GetFirstEmptySlot(itemContainer);
    //             if (emptySlot) {
    //                 this.node.setParent(emptySlot);
    //                 this.node.setPosition(Vec3.ZERO);
    //                 return;
    //             }
    //         }
    //     }
    //     // No tray found or invalid tray, restore
    //     this.RestoreToOriginalParent();
    // };

    OnTouchEnd(): void {
        const targetTray = this.GetTrayUnderItem();

        if (targetTray) {
            const itemContainer = targetTray.getChildByName('ItemContainer');
            if (itemContainer) {

                // NEW: Check if the target tray is already full
                const totalItems = itemContainer.children.reduce((count, slot) => {
                    return count + (slot.children.length > 0 ? 1 : 0);
                }, 0);

                if (totalItems >= 3) {
                    // Tray full, restore item
                    this.RestoreToOriginalParent();
                    return;
                }

                // Try dropping to hovered slot
                const droppedSlot = this.GetDroppedPosition(itemContainer);
                if (droppedSlot && droppedSlot.children.length === 0) {
                    this.node.setParent(droppedSlot);
                    this.node.setPosition(Vec3.ZERO);
                    this.scheduleOnce(() => {
                        Constant.event.emit(GameEvents.ON_ITEM_TOUCH_END, targetTray);
                        // this.CheckForMatch(targetTray);
                    }, 0.5);


                    return;
                }

                // Try any empty slot if drop wasn't precise
                const emptySlot = this.GetFirstEmptySlot(itemContainer);
                if (emptySlot) {
                    this.node.setParent(emptySlot);
                    this.node.setPosition(Vec3.ZERO);
                    Constant.event.emit(GameEvents.ON_ITEM_TOUCH_END, targetTray);
                    return;
                }
            }
        }
        // No tray found or invalid tray, restore
        this.RestoreToOriginalParent();


    };
    OnTouchCancel() {
        this.RestoreToOriginalParent();
        Constant.event.emit(GameEvents.ON_ITEM_TOUCH_CANCEL, this.node);
    };

    private RestoreToOriginalParent(): void {
        if (this.originalParent) {
            console.log("this.originalParent: ", this.originalParent.name);
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



    // private CheckForMatch(trayNode: Node): void {
    //     const itemContainer = trayNode.getChildByName('ItemContainer');
    //     if (!itemContainer) return;

    //     const slots = itemContainer.children;
    //     const filledSlots = slots.filter(slot => slot.children.length > 0);
    //     if (filledSlots.length !== 3) return; // only match if all 3 are filled

    //     // Get all item types from slots
    //     const itemTypes = filledSlots.map(slot => {
    //         const item = slot.children[0]?.getComponent(Item);
    //         return item?.type || null;
    //     });

    //     // Check if all three items are of same type
    //     const allMatch = itemTypes.every(type => type && type === itemTypes[0]);

    //     if (allMatch) {
    //         // ✅ Match found, remove all items
    //         for (const slot of filledSlots) {
    //             const item = slot.children[0];
    //             item?.destroy();
    //         }
    //         console.log(`Match Found! Tray Cleared: ${trayNode.name}`);
    //     }
    // };


}


