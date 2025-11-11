import { _decorator, Component, Node, SpriteFrame, Prefab, instantiate, EventTouch, Sprite, UIOpacity, Vec3, resources, Color, Asset, find } from 'cc';
import { Constant, GameEvents } from './Constant';
import { Item } from './Item';
import { TrayController } from './TrayController';
import { UIManager } from './UIManager';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    currentLevel: number = 0;
    @property(Node) trayControllerNode: Node;
    TrayControllerScript: TrayController;
    @property(Node) uiManagerNode: Node;
    uiManagerScript: UIManager;

    protected onLoad(): void {
        Constant.event.on(GameEvents.ON_ITEM_TOUCH_END, this.OnItemDropped, this);
        Constant.event.on(GameEvents.ON_GAME_OVER, this.OnGameOver, this);
        Constant.event.on(GameEvents.ON_LEVEL_COMPLETE, this.OnLevelComplete, this);

        this.TrayControllerScript = this.trayControllerNode.getComponent(TrayController);
        this.uiManagerScript = this.uiManagerNode.getComponent(UIManager);
    };

    protected start(): void {
        this.LoadLevelJson();
    };
    LoadLevelJson() {
        resources.load("LevelData", async (err: Error, assets: Asset) => {
            if (!err) {
                Constant.RAW_JSON_FILE = assets["json"];
                this.SetLevel();
                await this.CreateBoardAndGrid();
            }
        })
    };
    SetLevel(): void {
        if (this.currentLevel < Constant.MAX_LEVEL) {
            this.currentLevel++;
        }
    };
    async CreateBoardAndGrid() {
        const levelData = Constant.RAW_JSON_FILE.Levels[0][`Level${this.currentLevel}`];
        console.log('levelData: ', levelData);

        await this.TrayControllerScript.SetDataFromJson(levelData);
        // await this.trayControllerScript.SetTrayDataFromJson(levelData);
    };


    private OnItemDropped(trayNode: Node): void {
        const itemContainer = trayNode.getChildByName('ItemContainer');
        if (!itemContainer) return;

        const slots = itemContainer.children;
        const filledSlots = slots.filter(slot => slot.children.length > 0);
        if (filledSlots.length !== 3) {
            //  Even if not matched, check if top layer is cleared by move
            return;
        }

        // Step 1: Get top item type from each filled slot
        const itemTypes = filledSlots.map(slot => {
            const topItem = slot.children[slot.children.length - 1];
            const itemComp = topItem?.getComponent(Item);
            return itemComp?.isActive ? itemComp?.type : null;
        });

        // Step 2: Check if all top items are the same and active
        const allMatch = itemTypes.every(type => type && type === itemTypes[0]);
        if (!allMatch) {
            return;
        }

        // Step 3: Match found  remove top items & activate next layer
        for (const slot of filledSlots) {
            const topItem = slot.children[slot.children.length - 1];
            topItem?.destroy();

            this.scheduleOnce(() => {
                const remainingChildren = slot.children;
                if (remainingChildren.length > 0) {
                    const nextTop = remainingChildren[remainingChildren.length - 1];
                    const nextItemComp = nextTop.getComponent(Item);
                    const sprite = nextTop.getComponent(Sprite);
                    const opacity = nextTop.getComponent(UIOpacity) || nextTop.addComponent(UIOpacity);

                    if (nextItemComp && sprite) {
                        nextItemComp.isActive = true;
                        nextItemComp.EnableInputEvent();
                        sprite.color = Color.WHITE;
                        opacity.opacity = 255;
                    }
                }
            }, 0);
        }

        console.log(` Match Found! Tray Cleared Layer: ${trayNode.name}`);

        this.scheduleOnce(() => {
            this.CheckIfGameComplete();
        }, 0.2);
    };


    // CheckIfGameComplete(): void {
    //     const trayRoot = find('Canvas/GameScene/Tray'); // adjust path if different
    //     if (!trayRoot) return;

    //     let hasItem = false;
    //     for (const tray of trayRoot.children) {
    //         const itemContainer = tray.getChildByName("ItemContainer");
    //         if (!itemContainer) continue;

    //         for (const slot of itemContainer.children) {
    //             if (slot.children.length > 0) {
    //                 hasItem = true;
    //                 break;
    //             }
    //         }

    //         if (hasItem) break;
    //     }

    //     if (!hasItem) {
    //         console.log("All trays cleared. Game complete!");
    //         Constant.event.emit(GameEvents.ON_LEVEL_COMPLETE);
    //     }
    // };


    private HasAvailableMoves(): boolean {
        const trayRoot = find('Canvas/GameScene/Tray'); // Adjust path if needed
        if (!trayRoot) return false;

        for (const tray of trayRoot.children) {
            const itemContainer = tray.getChildByName("ItemContainer");
            if (!itemContainer) continue;

            for (const slot of itemContainer.children) {
                const topItem = slot.children[slot.children.length - 1];
                if (!topItem) {
                    // Empty slot = valid move
                    return true;
                }
            }
        }

        return false; // No empty top slot found
    }


    CheckIfGameComplete(): void {
        const trayRoot = find('Canvas/GameScene/Tray'); // Adjust path if needed
        if (!trayRoot) return;

        let hasItem = false;

        for (const tray of trayRoot.children) {
            const itemContainer = tray.getChildByName("ItemContainer");
            if (!itemContainer) continue;

            for (const slot of itemContainer.children) {
                if (slot.children.length > 0) {
                    hasItem = true;
                    break;
                }
            }

            if (hasItem) break;
        }

        if (!hasItem) {
            console.log("All trays cleared. Game complete!");
            Constant.event.emit(GameEvents.ON_LEVEL_COMPLETE);
            return;
        }

        if (!this.HasAvailableMoves()) {
            console.log("No valid moves left. Game over!");
            Constant.event.emit(GameEvents.ON_GAME_OVER);
        }
    }


    OnGameOver() {
        this.uiManagerScript.ShowGameOverPopup();
    };


    OnLevelComplete() {
        this.uiManagerScript.ShowLevelCompletePopup();
    }

}




