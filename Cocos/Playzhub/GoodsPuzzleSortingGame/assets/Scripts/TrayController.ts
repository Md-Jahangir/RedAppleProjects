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

    protected start(): void { };

    async SetDataFromJson(_jsonData: any) {
        try {
            await this.GenerateTrayGridAndItem(_jsonData.grid);
            // await this.GenerateTrayGrid(_jsonData.grid);
        } catch (error) {
            // console.error("Error in SetDataFromJson:", error);
        }
    };

    async GenerateTrayGridAndItem(jsonData: any): Promise<void> {
        try {
            this.node.removeAllChildren();

            this.trayCellsArray = [];
            const rows = jsonData.row;
            const cols = jsonData.col;
            const maxLayers = jsonData.max_layers;
            const itemTypes: string[] = jsonData.items_name;
            const difficulty = jsonData.level_difficulty?.toLowerCase() || 'medium';
            const allSlots = await this.CreateTrayGrid(rows, cols);
            await this.ClearAllItems(allSlots);
            const layersDeistributionData = await this.CreateLayerDistribution(allSlots, itemTypes, maxLayers, difficulty);
            const slotLayers = layersDeistributionData.slotLayers;
            const itemPool = layersDeistributionData.itemPool;
            await this.CreateTrayItem(allSlots, slotLayers, itemPool, itemTypes);
            await this.EnsureNoInitialTripleItems(itemTypes);
            await this.MapSlotsToTrays();
        } catch (error) {
            // console.error('Error generating tray grid:', error);
        }
    };



    async ClearAllItems(_allSlots: Node[]): Promise<void> {
        for (let i = 0; i < _allSlots.length; i++) {
            _allSlots[i].getComponent(TrayCell)?.RemoveAllItems();
        }
    }

    async CreateTrayGrid(rows: number, cols: number): Promise<Node[]> {
        // Step 1: Create tray grid and collect slot nodes
        const allSlots: Node[] = [];
        for (let r = 0; r < rows; r++) {
            this.trayCellsArray[r] = [];
            for (let c = 0; c < cols; c++) {
                const prefabToUse = (r === 0) ? this.topTrayCellPrefab : this.bottomTrayCellPrefab;
                const trayCellNode = instantiate(prefabToUse);
                this.node.addChild(trayCellNode);

                const trayCellScript = trayCellNode.getComponent(TrayCell);
                trayCellScript?.SetGridPosition(r, c);
                trayCellScript?.SetTrayUniqueKey(`${r}_${c}`);
                this.trayCellsArray[r][c] = trayCellScript;

                const itemContainer = trayCellNode.getChildByName("ItemContainer");
                if (!itemContainer) continue;
                allSlots.push(...itemContainer.children);
            }
        }
        // Step 2: Shuffle slots randomly
        this.ShuffleArray(allSlots);

        return allSlots;
    };

    // async CreateLayerDistribution(allSlots: Node[], itemTypes: string[], maxLayers: number, difficulty: string): Promise<{ slotLayers: number[], itemPool: string[] }> {
    //     //Step 3:  Get difficulty setting and blank ratio
    //     let blankRatio = 0.3;
    //     switch (difficulty) {
    //         case 'easy': blankRatio = 0.4; break;
    //         case 'medium': blankRatio = 0.3; break;
    //         case 'hard': blankRatio = 0.1; break;
    //         case 'extreme': blankRatio = 0.05; break;
    //     }

    //     // Step 4: Randomize how many layers each slot gets (or blank)
    //     const slotLayers: number[] = [];
    //     let totalItemSpots = 0;

    //     for (let i = 0; i < allSlots.length; i++) {
    //         if (Math.random() < blankRatio) {
    //             slotLayers.push(0);
    //         } else {
    //             const layerCount = Math.floor(Math.random() * maxLayers) + 1; // 1 to maxLayers
    //             slotLayers.push(layerCount);
    //             totalItemSpots += layerCount;
    //         }
    //     }

    //     // Step 5: Create item pool (only full triplets)
    //     const maxTriplets = Math.floor(totalItemSpots / 3);
    //     const itemPool: string[] = [];

    //     for (let i = 0; i < maxTriplets; i++) {
    //         const type = itemTypes[i % itemTypes.length];
    //         itemPool.push(type, type, type);
    //     }

    //     this.ShuffleArray(itemPool);

    //     return { slotLayers, itemPool };
    // };

    async CreateLayerDistribution(allSlots: Node[], itemTypes: string[], maxLayers: number, difficulty: string): Promise<{ slotLayers: number[], itemPool: string[] }> {
        let blankRatio = 0.3;
        switch (difficulty) {
            case 'easy': blankRatio = 0.4; break;
            case 'medium': blankRatio = 0.3; break;
            case 'hard': blankRatio = 0.1; break;
            case 'extreme': blankRatio = 0.05; break;
        }

        const slotLayers: number[] = [];
        const validSlots: number[] = []; // track indexes to adjust later
        let totalItemSpots = 0;

        // Step 1: Assign layers to each slot
        for (let i = 0; i < allSlots.length; i++) {
            if (Math.random() < blankRatio) {
                slotLayers.push(0);
            } else {
                const layers = Math.floor(Math.random() * maxLayers) + 1;
                slotLayers.push(layers);
                totalItemSpots += layers;
                validSlots.push(i);
            }
        }

        // Step 2: Make totalItemSpots divisible by 3
        const excess = totalItemSpots % 3;
        if (excess !== 0) {
            let adjusted = 0;
            for (let i = validSlots.length - 1; i >= 0 && adjusted < excess; i--) {
                const idx = validSlots[i];
                if (slotLayers[idx] > 0) {
                    slotLayers[idx] -= 1;
                    totalItemSpots -= 1;
                    if (slotLayers[idx] === 0) {
                        validSlots.splice(i, 1);
                    }
                    adjusted++;
                }
            }
        }

        // Step 3: Create a perfectly divisible itemPool
        const itemPool: string[] = [];
        const totalTriplets = totalItemSpots / 3;

        // for (let i = 0; i < totalTriplets; i++) {
        //     const type = itemTypes[i % itemTypes.length];
        //     itemPool.push(type, type, type);
        // }

        const setsPerType = Math.floor(totalTriplets / itemTypes.length);
        const remainder = totalTriplets % itemTypes.length;

        for (let type of itemTypes) {
            for (let i = 0; i < setsPerType; i++) {
                itemPool.push(type, type, type);
            }
        }
        this.ShuffleArray(itemTypes);
        // for (let i = 0; i < remainder; i++) {
        //     const type = itemTypes[i];
        //     itemPool.push(type, type, type);
        // }

        const debugCount: Record<string, number> = {};
        for (const type of itemPool) {
            debugCount[type] = (debugCount[type] || 0) + 1;
        }
        console.log("Generated itemPool counts:", debugCount);

        this.testingCalulation(itemPool, [
            "milk",
            "purple_bottle",
            "ice_cream",
            "coolfy",
            "smoothy",
            "candy",
            "sand_watch",
            "green_bottle",
            "teddy"
        ])

        return { slotLayers, itemPool };
    }

    testingCalulation(itemArray: string[], stringToBeFind: string[]): void {
        const countMap: { [key: string]: number } = {};

        // Initialize counts for each string to be found
        for (const str of stringToBeFind) {
            countMap[str] = 0;
        }

        // Count occurrences in itemArray
        for (const item of itemArray) {
            if (countMap.hasOwnProperty(item)) {
                countMap[item]++;
            }
        }

        // Log the result
        for (const key of stringToBeFind) {
            console.log(`${key}: ${countMap[key]}`);
        }
    }


    async MapSlotsToTrays() {
        //Step 6: Map each slot to its tray (used later)
        const slotToTrayMap: Map<Node, Node> = new Map(); // For reverse tray lookup
        for (const trayRow of this.trayCellsArray) {
            for (const tray of trayRow) {
                const container = tray.node.getChildByName("ItemContainer");
                if (!container) continue;
                for (const slot of container.children) {
                    slotToTrayMap.set(slot, tray.node);
                }
            }
        }
    };

    // async CreateTrayItem(allSlots: Node[], slotLayers: number[], itemPool: string[], itemTypes: string[]): Promise<void> {
    //     // Step 7: Distribute items to slots based on layers
    //     let itemIndex = 0;

    //     for (let i = 0; i < allSlots.length; i++) {
    //         const slot = allSlots[i];
    //         const numLayers = slotLayers[i];

    //         for (let j = 0; j < numLayers; j++) {
    //             if (itemIndex >= itemPool.length) break;

    //             const type = itemPool[itemIndex++];
    //             const itemNode = instantiate(this.itemPrefab);
    //             const itemScript = itemNode.getComponent(Item);
    //             const spriteFrame = this.spriteMap[type];

    //             if (itemScript && spriteFrame) {
    //                 itemScript.SetItem(type, spriteFrame);
    //                 itemScript.layerIndex = numLayers - j - 1;

    //                 const sprite = itemNode.getComponent(Sprite);
    //                 const opacityComp = itemNode.getComponent(UIOpacity) || itemNode.addComponent(UIOpacity);

    //                 if (j === numLayers - 1) {
    //                     sprite.color = Color.WHITE;
    //                     opacityComp.opacity = 255;
    //                     itemScript.isActive = true;
    //                     itemScript.EnableInputEvent();
    //                 } else {
    //                     sprite.color = new Color(120, 120, 120, 255);
    //                     opacityComp.opacity = 150;
    //                     itemScript.isActive = false;
    //                     itemScript.DisableInputEvent();
    //                 }

    //                 slot.addChild(itemNode);
    //                 itemNode.setSiblingIndex(slot.children.length - 1);
    //                 itemNode.setPosition(Vec3.ZERO);
    //             }
    //         }
    //     }
    // };

    async CreateTrayItem(allSlots: Node[], slotLayers: number[], itemPool: string[], itemTypes: string[]): Promise<void> {
        let itemIndex = 0;
        const trayItemMap: Map<Node, Record<string, number>> = new Map(); // Track type count per tray

        console.log('allSlots: ', allSlots);
        console.log('itemPool: ', itemPool);

        for (let i = 0; i < allSlots.length; i++) {
            const slot = allSlots[i];
            const numLayers = slotLayers[i];
            console.log('numLayers: ', numLayers);

            // Get tray node
            const trayNode = this.GetTrayFromSlot(slot); // <- helper method you should define

            if (!trayItemMap.has(trayNode)) {
                trayItemMap.set(trayNode, {});
            }

            const trayCountMap = trayItemMap.get(trayNode);

            for (let j = 0; j < numLayers; j++) {
                const type = itemPool.shift(); // Remove from front
                if (!type) continue;

                trayCountMap[type] = (trayCountMap[type] || 0) + 1;

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

            // for (let j = 0; j < numLayers; j++) {
            //     let type: string;
            //     let attempts = 0;

            //     do {
            //         if (attempts++ > 100) break; // prevent infinite loop
            //         type = itemPool[itemIndex];
            //         const currentCount = trayCountMap[type] || 0;
            //         if (currentCount < 2) break; // Safe to assign
            //         this.ShuffleArray(itemPool); // Try reshuffling
            //     } while (true);

            //     itemPool.splice(itemIndex, 1); // Remove selected item

            //     // Update tray map
            //     trayCountMap[type] = (trayCountMap[type] || 0) + 1;

            //     const itemNode = instantiate(this.itemPrefab);
            //     const itemScript = itemNode.getComponent(Item);
            //     const spriteFrame = this.spriteMap[type];

            //     if (itemScript && spriteFrame) {
            //         itemScript.SetItem(type, spriteFrame);
            //         itemScript.layerIndex = numLayers - j - 1;

            //         const sprite = itemNode.getComponent(Sprite);
            //         const opacityComp = itemNode.getComponent(UIOpacity) || itemNode.addComponent(UIOpacity);

            //         if (j === numLayers - 1) {
            //             sprite.color = Color.WHITE;
            //             opacityComp.opacity = 255;
            //             itemScript.isActive = true;
            //             itemScript.EnableInputEvent();
            //         } else {
            //             sprite.color = new Color(120, 120, 120, 255);
            //             opacityComp.opacity = 150;
            //             itemScript.isActive = false;
            //             itemScript.DisableInputEvent();
            //         }

            //         slot.addChild(itemNode);
            //         itemNode.setSiblingIndex(slot.children.length - 1);
            //         itemNode.setPosition(Vec3.ZERO);
            //     }
            // }
        }
    };
    GetTrayFromSlot(slot: Node): Node {
        let parent = slot.parent;
        while (parent && parent.name !== "ItemContainer") {
            parent = parent.parent;
        }
        return parent?.parent; // Tray node
    };

    async EnsureNoInitialTripleItems(itemTypes: string[]) {
        for (const trayRow of this.trayCellsArray) {
            for (const tray of trayRow) {
                const itemContainer = tray.node.getChildByName("ItemContainer");
                if (!itemContainer) continue;

                const typeCount: Record<string, number> = {};

                for (const slot of itemContainer.children) {
                    const children = slot.children;
                    if (children.length > 0) {
                        const topItem = children[children.length - 1];
                        const comp = topItem.getComponent(Item);
                        if (comp && comp.isActive) {
                            typeCount[comp.type] = (typeCount[comp.type] || 0) + 1;
                        }
                    }
                }

                for (const [type, count] of Object.entries(typeCount)) {
                    if (count === 3) {
                        // Found problematic tray with 3 active of same type
                        console.warn(`Fixing triple match in tray ${tray.trayUniqueKey} for type: ${type}`);

                        for (const slot of itemContainer.children) {
                            const children = slot.children;
                            if (children.length > 0) {
                                const topItem = children[children.length - 1];
                                const comp = topItem.getComponent(Item);
                                if (comp && comp.isActive && comp.type === type) {
                                    // Replace this item with another type
                                    const newType = itemTypes.find(t => t !== type) || type;
                                    comp.SetItem(newType, this.spriteMap[newType]);
                                    comp.type = newType;
                                    break; // Only change one item
                                }
                            }
                        }

                        break;
                    }
                }
            }
        }
    }


    // async EnsureNoInitialTripleItems(itemTypes: string[]) {
    //     // Step 8: Ensure no tray starts with 3 same active items
    //     for (const trayRow of this.trayCellsArray) {
    //         for (const tray of trayRow) {
    //             const itemContainer = tray.node.getChildByName("ItemContainer");
    //             if (!itemContainer) continue;

    //             const activeTypes: string[] = [];

    //             for (const slot of itemContainer.children) {
    //                 const children = slot.children;
    //                 if (children.length > 0) {
    //                     const topItem = children[children.length - 1];
    //                     const comp = topItem.getComponent(Item);
    //                     if (comp && comp.isActive) {
    //                         activeTypes.push(comp.type);
    //                     }
    //                 }
    //             }

    //             if (activeTypes.length === 3 && activeTypes.every(t => t === activeTypes[0])) {
    //                 // Problem: All 3 same, so replace one with another type
    //                 const slot = itemContainer.children[0]; // pick first slot
    //                 const topItem = slot.children[slot.children.length - 1];
    //                 const comp = topItem?.getComponent(Item);
    //                 if (comp) {
    //                     const otherType = itemTypes.find(t => t !== comp.type) || comp.type;
    //                     comp.SetItem(otherType, this.spriteMap[otherType]);
    //                     comp.type = otherType;
    //                 }
    //             }
    //         }
    //     }
    // };

    ShuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    ResetTrayGrid() {
        this.node.removeAllChildren();
    }

    // -----------------------------------------------------

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

    //         // Step 1: Create tray grid and collect slot nodes
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

    //         // Step 2: Shuffle slots randomly
    //         this.ShuffleArray(allSlots);

    //         // Step 3: Get difficulty setting and blank ratio
    //         const difficulty = jsonData.level_difficulty?.toLowerCase() || 'medium';
    //         let blankRatio = 0.3;
    //         switch (difficulty) {
    //             case 'easy': blankRatio = 0.4; break;
    //             case 'medium': blankRatio = 0.3; break;
    //             case 'hard': blankRatio = 0.1; break;
    //             case 'extreme': blankRatio = 0.05; break;
    //         }

    //         // Step 4: Randomize how many layers each slot gets (or blank)
    //         const slotLayers: number[] = [];
    //         let totalItemSpots = 0;

    //         for (let i = 0; i < allSlots.length; i++) {
    //             if (Math.random() < blankRatio) {
    //                 slotLayers.push(0);
    //             } else {
    //                 const layerCount = Math.floor(Math.random() * maxLayers) + 1; // 1 to maxLayers
    //                 slotLayers.push(layerCount);
    //                 totalItemSpots += layerCount;
    //             }
    //         }

    //         // Step 5: Create item pool (only full triplets)
    //         const maxTriplets = Math.floor(totalItemSpots / 3);
    //         const itemPool: string[] = [];

    //         for (let i = 0; i < maxTriplets; i++) {
    //             const type = itemTypes[i % itemTypes.length];
    //             itemPool.push(type, type, type);
    //         }

    //         this.ShuffleArray(itemPool);

    //         // Step 6: Distribute items to slots based on layers
    //         let itemIndex = 0;
    //         const slotToTrayMap: Map<Node, Node> = new Map(); // For reverse tray lookup

    //         // Map each slot to its tray (used later)
    //         for (const trayRow of this.trayCellsArray) {
    //             for (const tray of trayRow) {
    //                 const container = tray.node.getChildByName("ItemContainer");
    //                 if (!container) continue;
    //                 for (const slot of container.children) {
    //                     slotToTrayMap.set(slot, tray.node);
    //                 }
    //             }
    //         }

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

    //         // Step 7: Ensure no tray starts with 3 same active items
    //         for (const trayRow of this.trayCellsArray) {
    //             for (const tray of trayRow) {
    //                 const itemContainer = tray.node.getChildByName("ItemContainer");
    //                 if (!itemContainer) continue;

    //                 const activeTypes: string[] = [];

    //                 for (const slot of itemContainer.children) {
    //                     const children = slot.children;
    //                     if (children.length > 0) {
    //                         const topItem = children[children.length - 1];
    //                         const comp = topItem.getComponent(Item);
    //                         if (comp && comp.isActive) {
    //                             activeTypes.push(comp.type);
    //                         }
    //                     }
    //                 }

    //                 if (activeTypes.length === 3 && activeTypes.every(t => t === activeTypes[0])) {
    //                     // Problem: All 3 same, so replace one with another type
    //                     const slot = itemContainer.children[0]; // pick first slot
    //                     const topItem = slot.children[slot.children.length - 1];
    //                     const comp = topItem?.getComponent(Item);
    //                     if (comp) {
    //                         const otherType = itemTypes.find(t => t !== comp.type) || comp.type;
    //                         comp.SetItem(otherType, this.spriteMap[otherType]);
    //                         comp.type = otherType;
    //                     }
    //                 }
    //             }
    //         }

    //     } catch (error) {
    //         console.error('Error generating tray grid:', error);
    //     }
    // }



}


