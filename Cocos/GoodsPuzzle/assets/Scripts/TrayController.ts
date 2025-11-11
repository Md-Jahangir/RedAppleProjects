import { _decorator, Component, Node, Prefab, instantiate, UITransform, SpriteFrame, Vec3, Color, Vec2, Sprite, find, log, UIOpacity } from 'cc';
import { TrayCell } from './TrayCell';
import { Item } from './Item';
import { Constant, GameEvents } from './Constant';
const { ccclass, property } = _decorator;

@ccclass('TrayController')
export class TrayController extends Component {
    rows: number = 5;
    columns: number = 3;

    @property(Prefab) topTrayCellPrefab: Prefab;
    @property(Prefab) bottomTrayCellPrefab: Prefab;
    private trayCellsArray: TrayCell[][] = [];
    @property(Prefab) itemPrefab: Prefab;
    @property([SpriteFrame]) trayItemSpriteFrame: SpriteFrame[] = [];
    private spriteMap: Record<string, SpriteFrame> = {};

    onLoad(): void {
        for (const sprite of this.trayItemSpriteFrame) {
            this.spriteMap[sprite.name] = sprite;
        }
    };

    protected start(): void {
        // this.GenerateTray(this.rows, this.columns, "");
    };

    async SetDataFromJson(_jsonData: any) {
        try {
            await this.GenerateTrayGrid(_jsonData.grid);
        } catch (error) {
            console.error("Error in SetDataFromJson:", error);
        }
    }

    // async GenerateTrayGrid(jsonData: any): Promise<void> {
    //     try {
    //         this.node.removeAllChildren();
    //         this.trayCellsArray = [];

    //         const rows = jsonData.row;
    //         const cols = jsonData.col;
    //         const totalTrays = rows * cols;
    //         const allSlots: Node[] = [];
    //         const maxLayers = jsonData.max_layers;
    //         const itemTypes: string[] = jsonData.items_name;
    //         const difficulty = jsonData.level_difficulty?.toLowerCase() || 'medium';
    //         const slotsPerTray = 3;
    //         const totalItemPositions = totalTrays * slotsPerTray * maxLayers;

    //         // === STEP 1: Generate item list in sets of 3 ===
    //         const totalGroups = Math.floor(totalItemPositions / 3);
    //         let allItemTypes: string[] = [];

    //         for (let i = 0; i < totalGroups; i++) {
    //             const type = itemTypes[i % itemTypes.length]; // loop over available types
    //             allItemTypes.push(type, type, type);
    //         }
    //         console.log('allItemTypes: ', allItemTypes);

    //         // Optional: reduce a few positions to simulate blank spaces
    //         let blankRatio = 0.3;
    //         switch (difficulty) {
    //             case 'easy':
    //                 blankRatio = 0.3; // 30% blank
    //                 break;
    //             case 'medium':
    //                 blankRatio = 0.2; // 20% blank
    //                 break;
    //             case 'hard':
    //                 blankRatio = 0.1; // 10% blank
    //                 break;
    //             case 'extreme':
    //                 blankRatio = 0.05; // 5% blank
    //                 break;
    //             default:
    //                 blankRatio = 0.2;
    //         }

    //         const numBlanks = Math.floor(totalItemPositions * blankRatio);
    //         for (let i = 0; i < numBlanks; i++) {
    //             const removeIndex = Math.floor(Math.random() * allItemTypes.length);
    //             allItemTypes.splice(removeIndex, 1);
    //         }

    //         // Shuffle all items
    //         this.ShuffleArray(allItemTypes);


    //         for (let r = 0; r < rows; r++) {
    //             this.trayCellsArray[r] = [];
    //             for (let c = 0; c < cols; c++) {
    //                 const prefabToUse = (r === 0) ? this.topTrayCellPrefab : this.bottomTrayCellPrefab;
    //                 const trayCellNode = instantiate(prefabToUse);
    //                 this.node.addChild(trayCellNode);

    //                 const trayCellScript = trayCellNode.getComponent(TrayCell);
    //                 if (trayCellScript) {
    //                     trayCellScript.SetGridPosition(r, c);
    //                     trayCellScript.SetTrayUniqueKey(`${r}_${c}`);
    //                     this.trayCellsArray[r][c] = trayCellScript;
    //                 }
    //                 const trayItemContainer = trayCellNode.getChildByName("ItemContainer");
    //                 if (!trayItemContainer) continue;

    //                 for (const posNode of trayItemContainer.children) {
    //                     allSlots.push(posNode);
    //                 }
    //             }
    //         }

    //         let itemIndex = 0;
    //         for (let layer = maxLayers - 1; layer >= 0; layer--) {
    //             for (const slot of allSlots) {
    //                 const type = allItemTypes[itemIndex++];
    //                 if (!type) continue;

    //                 const itemNode = instantiate(this.itemPrefab);
    //                 const itemScript = itemNode.getComponent(Item);

    //                 if (itemScript) {
    //                     const spriteFrame = this.spriteMap[type]; // assume this maps type -> sprite
    //                     itemScript.SetItem(type, spriteFrame);
    //                     itemScript.layerIndex = layer;

    //                     const sprite = itemNode.getComponent(Sprite);
    //                     const opacityComp = itemNode.getComponent(UIOpacity) || itemNode.addComponent(UIOpacity);

    //                     if (layer === 0) {
    //                         // ✅ Topmost layer: fully visible + interactable
    //                         sprite.color = Color.WHITE;
    //                         opacityComp.opacity = 255;
    //                         itemScript.isActive = true;
    //                         itemScript.EnableInputEvent();
    //                     } else {
    //                         // ✅ Back layer: darker, transparent, no input
    //                         sprite.color = new Color(120, 120, 120, 255); // darker
    //                         opacityComp.opacity = 150;
    //                         itemScript.isActive = false;
    //                         itemScript.DisableInputEvent();
    //                     }

    //                     slot.addChild(itemNode);
    //                     itemNode.setSiblingIndex(slot.children.length - 1);
    //                     itemNode.setPosition(Vec3.ZERO);
    //                 }
    //             }
    //         }

    //     } catch (error) {

    //     }
    // };

    async GenerateTrayGrid(jsonData: any): Promise<void> {
        try {
            this.node.removeAllChildren();
            this.trayCellsArray = [];

            const rows = jsonData.row;
            const cols = jsonData.col;
            const totalTrays = rows * cols;
            const maxLayers = jsonData.max_layers;
            const itemTypes: string[] = jsonData.items_name;
            const slotsPerTray = 3;
            const allSlots: Node[] = [];

            // Step 1: Create tray grid and collect slot nodes
            for (let r = 0; r < rows; r++) {
                this.trayCellsArray[r] = [];
                for (let c = 0; c < cols; c++) {
                    const prefabToUse = (r === 0) ? this.topTrayCellPrefab : this.bottomTrayCellPrefab;
                    const trayCellNode = instantiate(prefabToUse);
                    this.node.addChild(trayCellNode);

                    const trayCellScript = trayCellNode.getComponent(TrayCell);
                    if (trayCellScript) {
                        trayCellScript.SetGridPosition(r, c);
                        trayCellScript.SetTrayUniqueKey(`${r}_${c}`);
                        this.trayCellsArray[r][c] = trayCellScript;
                    }

                    const trayItemContainer = trayCellNode.getChildByName("ItemContainer");
                    if (!trayItemContainer) continue;

                    for (const slotNode of trayItemContainer.children) {
                        allSlots.push(slotNode);
                    }
                }
            }

            // Step 2: Shuffle slots randomly
            this.ShuffleArray(allSlots);

            // Step 3: Get difficulty setting and blank ratio
            const difficulty = jsonData.level_difficulty?.toLowerCase() || 'medium';
            let blankRatio = 0.3;

            switch (difficulty) {
                case 'easy': blankRatio = 0.4; break;
                case 'medium': blankRatio = 0.3; break;
                case 'hard': blankRatio = 0.1; break;
                case 'extreme': blankRatio = 0.05; break;
            }

            // Step 4: Randomize how many layers each slot gets (or blank)
            const slotLayers: number[] = [];
            let totalItemSpots = 0;

            for (let i = 0; i < allSlots.length; i++) {
                if (Math.random() < blankRatio) {
                    slotLayers.push(0);
                } else {
                    const layerCount = Math.floor(Math.random() * maxLayers) + 1; // 1 to maxLayers
                    slotLayers.push(layerCount);
                    totalItemSpots += layerCount;
                }
            }

            // Step 5: Create item pool (only full triplets)
            const maxTriplets = Math.floor(totalItemSpots / 3);
            const itemPool: string[] = [];

            for (let i = 0; i < maxTriplets; i++) {
                const type = itemTypes[i % itemTypes.length];
                itemPool.push(type, type, type);
            }

            this.ShuffleArray(itemPool);

            // Step 6: Distribute items to slots based on layers
            let itemIndex = 0;
            const slotToTrayMap: Map<Node, Node> = new Map(); // For reverse tray lookup

            // Map each slot to its tray (used later)
            for (const trayRow of this.trayCellsArray) {
                for (const tray of trayRow) {
                    const container = tray.node.getChildByName("ItemContainer");
                    if (!container) continue;
                    for (const slot of container.children) {
                        slotToTrayMap.set(slot, tray.node);
                    }
                }
            }

            for (let i = 0; i < allSlots.length; i++) {
                const slot = allSlots[i];
                const numLayers = slotLayers[i];

                for (let j = 0; j < numLayers; j++) {
                    if (itemIndex >= itemPool.length) break;

                    const type = itemPool[itemIndex++];
                    const itemNode = instantiate(this.itemPrefab);
                    const itemScript = itemNode.getComponent(Item);
                    const spriteFrame = this.spriteMap[type];

                    if (itemScript && spriteFrame) {
                        itemScript.SetItem(type, spriteFrame);
                        itemScript.layerIndex = numLayers - j - 1;

                        const sprite = itemNode.getComponent(Sprite);
                        const opacityComp = itemNode.getComponent(UIOpacity) || itemNode.addComponent(UIOpacity);

                        if (j === numLayers - 1) {
                            sprite.color = Color.WHITE;
                            opacityComp.opacity = 255;
                            itemScript.isActive = true;
                            itemScript.EnableInputEvent();
                        } else {
                            sprite.color = new Color(120, 120, 120, 255);
                            opacityComp.opacity = 150;
                            itemScript.isActive = false;
                            itemScript.DisableInputEvent();
                        }

                        slot.addChild(itemNode);
                        itemNode.setSiblingIndex(slot.children.length - 1);
                        itemNode.setPosition(Vec3.ZERO);
                    }
                }
            }

            // Step 7: Ensure no tray starts with 3 same active items
            for (const trayRow of this.trayCellsArray) {
                for (const tray of trayRow) {
                    const itemContainer = tray.node.getChildByName("ItemContainer");
                    if (!itemContainer) continue;

                    const activeTypes: string[] = [];

                    for (const slot of itemContainer.children) {
                        const children = slot.children;
                        if (children.length > 0) {
                            const topItem = children[children.length - 1];
                            const comp = topItem.getComponent(Item);
                            if (comp && comp.isActive) {
                                activeTypes.push(comp.type);
                            }
                        }
                    }

                    if (activeTypes.length === 3 && activeTypes.every(t => t === activeTypes[0])) {
                        // Problem: All 3 same, so replace one with another type
                        const slot = itemContainer.children[0]; // pick first slot
                        const topItem = slot.children[slot.children.length - 1];
                        const comp = topItem?.getComponent(Item);
                        if (comp) {
                            const otherType = itemTypes.find(t => t !== comp.type) || comp.type;
                            comp.SetItem(otherType, this.spriteMap[otherType]);
                            comp.type = otherType;
                        }
                    }
                }
            }

        } catch (error) {
            console.error('Error generating tray grid:', error);
        }
    }


    // async GenerateTrayGrid(jsonData: any): Promise<void> {
    //     try {
    //         this.node.removeAllChildren();
    //         this.trayCellsArray = [];

    //         const rows = jsonData.row;
    //         const cols = jsonData.col;
    //         const totalTrays = rows * cols;
    //         const maxLayers = jsonData.max_layers;
    //         const itemTypes: string[] = jsonData.items_name;
    //         const slotsPerTray = 3;
    //         const allSlots: Node[] = [];

    //         // Step 1: Build tray grid and collect all slot nodes
    //         for (let r = 0; r < rows; r++) {
    //             this.trayCellsArray[r] = [];
    //             for (let c = 0; c < cols; c++) {
    //                 const prefabToUse = (r === 0) ? this.topTrayCellPrefab : this.bottomTrayCellPrefab;
    //                 const trayCellNode = instantiate(prefabToUse);
    //                 this.node.addChild(trayCellNode);

    //                 const trayCellScript = trayCellNode.getComponent(TrayCell);
    //                 if (trayCellScript) {
    //                     trayCellScript.SetGridPosition(r, c);
    //                     trayCellScript.SetTrayUniqueKey(`${r}_${c}`);
    //                     this.trayCellsArray[r][c] = trayCellScript;
    //                 }

    //                 const trayItemContainer = trayCellNode.getChildByName("ItemContainer");
    //                 if (!trayItemContainer) continue;

    //                 for (const slotNode of trayItemContainer.children) {
    //                     allSlots.push(slotNode);
    //                 }
    //             }
    //         }

    //         // Step 2: Shuffle allSlots to randomize item positions
    //         this.ShuffleArray(allSlots);

    //         // Step 3: Determine difficulty and blank ratio
    //         const difficulty = jsonData.level_difficulty?.toLowerCase() || 'medium';
    //         let blankRatio = 0.3;

    //         switch (difficulty) {
    //             case 'easy': blankRatio = 0.4; break;
    //             case 'medium': blankRatio = 0.3; break;
    //             case 'hard': blankRatio = 0.2; break;
    //             case 'extreme': blankRatio = 0.1; break;
    //         }

    //         // Step 4: Generate layer count per slot based on blank ratio
    //         const slotLayers: number[] = [];
    //         let totalItemSpots = 0;

    //         for (let i = 0; i < allSlots.length; i++) {
    //             if (Math.random() < blankRatio) {
    //                 slotLayers.push(0);
    //                 continue;
    //             }

    //             const layerCount = Math.floor(Math.random() * maxLayers) + 1; // At least 1 layer
    //             slotLayers.push(layerCount);
    //             totalItemSpots += layerCount;
    //         }

    //         // Step 5: Prepare item pool with only full triplets
    //         const maxTriplets = Math.floor(totalItemSpots / 3);
    //         const itemPool: string[] = [];

    //         for (let i = 0; i < maxTriplets; i++) {
    //             const type = itemTypes[i % itemTypes.length];
    //             itemPool.push(type, type, type);
    //         }

    //         this.ShuffleArray(itemPool);

    //         // Step 6: Distribute items into the slots
    //         let itemIndex = 0;

    //         for (let i = 0; i < allSlots.length; i++) {
    //             const slot = allSlots[i];
    //             const numLayers = slotLayers[i];

    //             for (let j = 0; j < numLayers; j++) {
    //                 if (itemIndex >= itemPool.length) break;

    //                 const type = itemPool[itemIndex++];
    //                 const itemNode = instantiate(this.itemPrefab);
    //                 const itemScript = itemNode.getComponent(Item);
    //                 const spriteFrame = this.spriteMap[type];

    //                 if (itemScript && spriteFrame) {
    //                     itemScript.SetItem(type, spriteFrame);
    //                     itemScript.layerIndex = numLayers - j - 1;

    //                     const sprite = itemNode.getComponent(Sprite);
    //                     const opacityComp = itemNode.getComponent(UIOpacity) || itemNode.addComponent(UIOpacity);

    //                     if (j === numLayers - 1) {
    //                         sprite.color = Color.WHITE;
    //                         opacityComp.opacity = 255;
    //                         itemScript.isActive = true;
    //                         itemScript.EnableInputEvent();
    //                     } else {
    //                         sprite.color = new Color(120, 120, 120, 255);
    //                         opacityComp.opacity = 150;
    //                         itemScript.isActive = false;
    //                         itemScript.DisableInputEvent();
    //                     }

    //                     slot.addChild(itemNode);
    //                     itemNode.setSiblingIndex(slot.children.length - 1);
    //                     itemNode.setPosition(Vec3.ZERO);
    //                 }
    //             }
    //         }

    //     } catch (error) {
    //         console.error('Error generating tray grid:', error);
    //     }
    // }





    ShuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };


}


