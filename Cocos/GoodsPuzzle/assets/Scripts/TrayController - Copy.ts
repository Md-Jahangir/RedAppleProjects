import { _decorator, Component, Node, Prefab, instantiate, UITransform, SpriteFrame, Vec3, Vec2, Sprite, find, log } from 'cc';
import { TrayCell } from './TrayCell';
import { Item } from './Item';
import { Constant, GameEvents } from './Constant';
const { ccclass, property } = _decorator;

@ccclass('TrayController')
export class TrayController extends Component {
    columns: number = 3;
    rows: number = 5;
    @property(Prefab) topTrayCellPrefab: Prefab;
    @property(Prefab) bottomTrayCellPrefab: Prefab;
    trayCellsArray: TrayCell[][] = [];
    @property(Prefab) itemPrefab: Prefab;
    @property([SpriteFrame]) trayItemSpriteFrame: SpriteFrame[] = [];

    onLoad(): void {

    };

    protected start(): void {
        // this.GenerateTray(this.rows, this.columns, "");
    };

    async GenerateTray(rows: number, cols: number, jsonData: any): Promise<void> {
        try {
            this.node.removeAllChildren();
            this.trayCellsArray = [];

            const totalTrays = rows * cols;
            const allSlots: Node[] = [];

            // Step 1: Instantiate trays and collect slot references
            for (let r = 0; r < rows; r++) {
                this.trayCellsArray[r] = [];
                for (let c = 0; c < cols; c++) {
                    const prefabToUse = (r === 0) ? this.topTrayCellPrefab : this.bottomTrayCellPrefab;
                    const trayCellNode = instantiate(prefabToUse);
                    this.node.addChild(trayCellNode);

                    const trayCellScript = trayCellNode.getComponent(TrayCell);
                    if (trayCellScript) {
                        trayCellScript.SetGridPosition(r, c);
                        trayCellScript.SetTrayUniqueKey(r + "_" + c);
                        this.trayCellsArray[r][c] = trayCellScript;
                    }

                    const trayItemContainer = trayCellNode.getChildByName("ItemContainer");
                    if (!trayItemContainer) continue;

                    for (const posNode of trayItemContainer.children) {
                        allSlots.push(posNode);
                    }
                }
            }

            // Step 2: Setup item triplets (limit by item type count)
            const totalItemTypes = this.trayItemSpriteFrame.length;
            const maxTriplets = Math.min(Math.floor(allSlots.length / 3), totalItemTypes);
            const selectedTypes = this.ShuffleArray(this.trayItemSpriteFrame).slice(0, maxTriplets);

            const allItemsToPlace: { type: string; spriteFrame: SpriteFrame }[] = [];
            for (const spriteFrame of selectedTypes) {
                const type = spriteFrame.name;
                allItemsToPlace.push({ type, spriteFrame }, { type, spriteFrame }, { type, spriteFrame });
            }

            // Step 3: Map trays to slot references
            const traySlotMap: Map<Node, Node[]> = new Map();
            for (const slotNode of allSlots) {
                const trayNode = slotNode.parent?.parent;
                if (!trayNode) continue;
                if (!traySlotMap.has(trayNode)) traySlotMap.set(trayNode, []);
                traySlotMap.get(trayNode)!.push(slotNode);
            }

            const trayList = Array.from(traySlotMap.keys());
            const trayItemTypes: Map<Node, Set<string>> = new Map();
            for (const trayNode of trayList) {
                trayItemTypes.set(trayNode, new Set());
            }

            // Step 4: Place items, one per tray for each triplet
            const shuffledItems = this.ShuffleArray(allItemsToPlace);
            for (const itemInfo of shuffledItems) {
                let placed = false;
                for (const trayNode of this.ShuffleArray(trayList)) {
                    const typeSet = trayItemTypes.get(trayNode)!;
                    const availableSlots = traySlotMap.get(trayNode)!;

                    if (typeSet.has(itemInfo.type)) continue; // Already has this type
                    if (availableSlots.length === 0) continue;

                    const slotNode = availableSlots.pop();
                    if (!slotNode) continue;

                    const itemNode = instantiate(this.itemPrefab);
                    const itemScript = itemNode.getComponent(Item);
                    if (itemScript) {
                        itemScript.sprite = itemNode.getComponent(Sprite);
                        itemScript.SetItem(itemInfo.type, itemInfo.spriteFrame);
                    }

                    slotNode.addChild(itemNode);
                    itemNode.setPosition(Vec3.ZERO);
                    typeSet.add(itemInfo.type);
                    placed = true;
                    break;
                }

                if (!placed) {
                    console.warn(`Couldn't place item of type ${itemInfo.type}. Skipping.`);
                }
            }

            // Optionally: leave some trays empty (up to 20%)
            // You can add this logic after triplets are placed

        } catch (error) {
            console.error("Error in GenerateTray:", error);
        }
    };


    ShuffleArray<T>(array: T[]): T[] {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    };

}


