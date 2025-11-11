import { _decorator, Component, error, JsonAsset, Node, Asset, resources, UITransform, Vec3, Rect, log, director } from 'cc';
import { Constant, GameEvents } from './utils/Constant';
import { GridController } from './GridController';
import { TrayController } from './TrayController';
import { Tray } from './Tray';
import { UIManager } from './UIManager';

const { ccclass, property } = _decorator;
type Matrix = string[][];
@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node) uiManagerNode: Node;
    uiManagerScript: UIManager;
    @property(Node) trayControllerNode: Node;
    trayControllerScript: TrayController;
    @property(Node) gridControllerNode: Node;
    gridControllerScript: GridController;

    private lastHoveredGridNode: Node = null;
    currentLevel: number = 1;

    droppedTray: Tray;

    protected onLoad(): void {
        Constant.event.on(GameEvents.ON_TABLE_TRAY_TOUCH_MOVE, this.OnTrayTouchMove, this);
        Constant.event.on(GameEvents.ON_TABLE_TRAY_TOUCH_END, this.onTrayDropped, this);
        Constant.event.on(GameEvents.ON_GAME_OVER, this.OnGameOver, this);
        Constant.event.on(GameEvents.ON_LEVEL_COMPLETE, this.OnLevelComplete, this);
        Constant.event.on(GameEvents.ON_NEXT_BUTTON_PRESSED, this.OnNextButtonPressed, this);
        Constant.event.on(GameEvents.ON_UPDATE_TARGET_TRAY_UI, this.UpdateTargetTrayUI, this);

        this.uiManagerScript = this.uiManagerNode.getComponent(UIManager);
        this.trayControllerScript = this.trayControllerNode.getComponent(TrayController);
        this.gridControllerScript = this.gridControllerNode.getComponent(GridController);
    };

    start() {
        this.LoadLevelJson();
    };

    SetLevel(): void {
        if (this.currentLevel < Constant.MAX_LEVEL) {
            this.currentLevel++;
        }
    }

    async OnNextButtonPressed() {
        if (this.currentLevel == Constant.MAX_LEVEL) {
            director.loadScene("TitleScene")
        }
        await this.LoadNextLevel();
    };

    async LoadNextLevel(_isRetry?: boolean) {
        if (!_isRetry) this.SetLevel();


        const levelData = Constant.RAW_JSON_FILE.Levels[0][`Level${this.currentLevel}`];

        await this.ResetAll();
        await this.gridControllerScript.SetBoardDataFromJson(levelData);
        await this.trayControllerScript.SetTrayDataFromJson(levelData);
        await this.uiManagerScript.MakeTargetTray(levelData);
    };

    async ResetAll() {
        this.gridControllerScript.ResetGrid();
        this.trayControllerScript.ResetTray();
        this.uiManagerScript.ResetTargetTray()

        this.uiManagerScript.HideLevelCompletePopup();
        this.uiManagerScript.HideGameOverPopup();
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
    async CreateBoardAndGrid() {
        const levelData = Constant.RAW_JSON_FILE.Levels[0][`Level${this.currentLevel}`];
        await this.gridControllerScript.SetBoardDataFromJson(levelData);
        await this.trayControllerScript.SetTrayDataFromJson(levelData);
        await this.uiManagerScript.MakeTargetTray(levelData);
    };

    OnTrayTouchMove(trayNode: Node) {
        const overlapObj = this.CheckTrayOverlapWithGrid(trayNode, this.gridControllerScript);
        if (overlapObj && overlapObj.node) {
            const gridCell = overlapObj.node;
            const hoverNode = gridCell.getChildByName("HoverSprite");

            if (this.gridControllerScript.gridCells[overlapObj.row][overlapObj.col].isTrayContainerEmpty()) {
                if (hoverNode && !hoverNode.active) {
                    hoverNode.active = true;
                }
                if (this.lastHoveredGridNode && this.lastHoveredGridNode !== overlapObj.node) {
                    const prevHover = this.lastHoveredGridNode.getChildByName("HoverSprite");
                    if (prevHover) prevHover.active = false;
                }
                this.lastHoveredGridNode = overlapObj.node;
            } else {
                this.resetHoverState();
                if (hoverNode) hoverNode.active = false;
            }
        } else {
            if (this.lastHoveredGridNode) {
                const prevHover = this.lastHoveredGridNode.getChildByName("HoverSprite");
                if (prevHover) prevHover.active = false;
                this.lastHoveredGridNode = null;
            }
        }
    };

    // Reset the hover state when the tray is dropped
    resetHoverState() {
        if (this.lastHoveredGridNode) {
            const prevHover = this.lastHoveredGridNode.getChildByName("HoverSprite");
            if (prevHover) prevHover.active = false;
            this.lastHoveredGridNode = null;
        }
    };

    async onTrayDropped(trayNode: Node) {
        const overlapObj = this.CheckTrayOverlapWithGrid(trayNode, this.gridControllerScript);

        if (!overlapObj || !overlapObj.node) {
            trayNode.setPosition(new Vec3(0, 0, 0));
            return;
        }
        const trayScript = trayNode.getComponent(Tray);
        this.droppedTray = trayScript;

        const placed = await this.gridControllerScript.OnPlaceTrayOnGrid(trayNode, overlapObj.row, overlapObj.col);

        if (placed) {
            this.resetHoverState();
            trayScript.DisableInputEvent();
            trayScript.SetTrayGridPosition(overlapObj.row, overlapObj.col);
            trayScript.SetTrayUniqueKey(overlapObj.row + "_" + overlapObj.col)
            const isMatched = await this.gridControllerScript.IsMatch(overlapObj.row, overlapObj.col);
            // console.log("isMatched: ", isMatched);

            if (isMatched) {
                const matchCellList = await this.gridControllerScript.GetMatchList();
                await this.DistributeMatchingItems(matchCellList);
            }
        } else {
            trayNode.setPosition(new Vec3(0, 0, 0));
        }

        this.scheduleOnce(() => {
            this.trayControllerScript.CheckIsTableEmpty();
            const isGridFull = this.gridControllerScript.isGridFull();
            if (isGridFull) {
                Constant.event.emit(GameEvents.ON_GAME_OVER);
            }
        }, 0.3)

        const matchCellList = await this.gridControllerScript.GetMatchList();
        console.log("after matchCellList......: ", matchCellList);
        if (matchCellList.length > 0) {
            this.scheduleOnce(async () => {
                await this.DistributeMatchingItems(matchCellList);
            }, 0.4)
        }
    }

    sleep(seconds: number) {
        return new Promise((e) => setTimeout(e, seconds * 1000));
    }

    GetTheArrayIndex(storedTray) {
        const totalPreceedingTrayKay = this.gridControllerScript.GetPreceedingTrayKey();
        const arrIndex = storedTray.map(item =>
            totalPreceedingTrayKay.indexOf(item.trayUniqueKey)).filter(index => index !== -1);
        return arrIndex;
    }

    // async DistributeMatchingItems(matchCellList) {
    //     // console.log("matchCellList: ", matchCellList);

    //     let storedTrayItems: string[][] = [];
    //     let storedTray: Tray[] = [];

    //     // Collect trays and tray items from matched cells
    //     for (const cell of matchCellList) {
    //         const tray = this.gridControllerScript.ValueAt(cell.row, cell.column);
    //         if (!tray) continue;
    //         const trayItems = tray.trayItem;
    //         if (!Array.isArray(trayItems)) continue;

    //         storedTrayItems.push([...trayItems]);
    //         storedTray.push(tray);
    //     }

    //     // Sort trays based on the preceedingTrayKey
    //     storedTray.sort((a, b) => {
    //         const keyA = a.trayUniqueKey; // Make sure tray.gridKey is set when added to the grid
    //         const keyB = b.trayUniqueKey;
    //         return this.gridControllerScript.GetPreceedingTrayKey().indexOf(keyA) - this.gridControllerScript.GetPreceedingTrayKey().indexOf(keyB);
    //     });

    //     console.log("storedTrayItems: ", storedTrayItems);
    //     console.log("storedTray: ", storedTray);

    //     const matchedIndex = this.GetTheArrayIndex(storedTray);
    //     console.log("matchedIndex: ", matchedIndex);

    //     const result = this.GetColorsSortedObjectArray(storedTrayItems);
    //     console.log("result: ", result);

    //     // Sort color keys (optional - alphabetically, or based on custom order)
    //     const colorKeys = Object.keys(result).sort(); // Change `.sort()` if custom order needed
    //     console.log("colorKeys: ", colorKeys);

    //     await this.sleep(0.3); // Short delay for visual clarity if animations involved

    //     let trayIndex = 0;

    //     for (const color of colorKeys) {
    //         const colorItems = result[color];

    //         while (colorItems.length > 0 && trayIndex < storedTray.length) {
    //             const takeCount = Math.min(6, colorItems.length);
    //             const trayItems = colorItems.splice(0, takeCount); // Take up to 6 items
    //             const firstCol = trayItems[0];

    //             storedTray[trayIndex].SetTrayItem(trayItems);

    //             // If tray is filled with one uniform color, destroy it
    //             if (trayItems.length === 6 && trayItems.every(c => c === firstCol)) {
    //                 console.log("Remove the matched tray............");
    //                 storedTray[trayIndex].DestroyTray();
    //                 // Optionally update UI or goal tracking:
    //                 // Constant.event.emit(GameEvents.ON_UPDATE_TARGET_TRAY_UI, { color: firstCol, count: 1 });
    //             }

    //             trayIndex++;
    //         }
    //     }

    //     // Clear remaining trays if not filled
    //     while (trayIndex < storedTray.length) {
    //         storedTray[trayIndex]?.SetTrayItem(new Array(6).fill(""));
    //         trayIndex++;
    //     }
    // };

    async DistributeMatchingItems(matchCellList) {
        console.log("matchCellList: ", matchCellList);

        let storedTrayItems: string[][] = [];
        let storedTray: Tray[] = [];

        // Collect trays only from matched cells
        for (const cell of matchCellList) {
            const tray = this.gridControllerScript.ValueAt(cell.row, cell.column);
            if (!tray) continue;
            storedTray.push(tray);
        }

        //Sort the trays based on preceedingTrayKey
        storedTray.sort((a, b) => {
            const keyA = a.trayUniqueKey;
            const keyB = b.trayUniqueKey;
            return this.gridControllerScript.GetPreceedingTrayKey().indexOf(keyA) - this.gridControllerScript.GetPreceedingTrayKey().indexOf(keyB);
        });

        //Now collect trayItems in sorted order
        for (const tray of storedTray) {
            const trayItems = tray.trayItem;
            if (!Array.isArray(trayItems)) continue;
            storedTrayItems.push([...trayItems]);
        }

        console.log("storedTray: ", storedTray);
        console.log("storedTrayItems: ", storedTrayItems);

        const result = this.GetColorsSortedObjectArray(storedTrayItems);
        // const result = this.formatGroupedMatrix(storedTrayItems);
        console.log("result result: ", result);

        const colorKeys = Object.keys(result);
        // console.log("colorKeys: ", colorKeys);

        await this.sleep(0.3); // Short delay for visual clarity if animations involved

        let trayIndex = 0;

        for (const color of colorKeys) {
            const colorItems = result[color];

            while (colorItems.length > 0 && trayIndex < storedTray.length) {
                const takeCount = Math.min(6, colorItems.length);
                const trayItems = colorItems.splice(0, takeCount); // Take up to 6 items
                const firstCol = trayItems[0];

                storedTray[trayIndex].SetTrayItem(trayItems);

                // If tray is filled with one uniform color, destroy it
                if (trayItems.length === 6 && trayItems.every(c => c === firstCol)) {
                    console.log("Remove the matched tray............");
                    const trayKey = storedTray[trayIndex].trayUniqueKey;
                    storedTray[trayIndex].DestroyTray();
                    this.gridControllerScript.RemoveKeyFromPreceedingTray(trayKey);
                }
                trayIndex++;
            }
        }

        // Clear remaining trays if not filled
        while (trayIndex < storedTray.length) {
            if (storedTray[trayIndex]) {
                storedTray[trayIndex].SetTrayItem(new Array(6).fill(""));
                const trayKey = storedTray[trayIndex].trayUniqueKey;
                this.gridControllerScript.RemoveKeyFromPreceedingTray(trayKey);
            }
            trayIndex++;
        }
    };

    GetColorsSortedObjectArray(trayItemsList: string[][]): string[][] {
        const colorCount: { [color: string]: number } = {};
        const result: string[][] = [[], []]; // [grouped color, others]

        // Step 1: Count occurrences
        for (const tray of trayItemsList) {
            for (const item of tray) {
                if (!item) continue;
                colorCount[item] = (colorCount[item] || 0) + 1;
            }
        }

        // Step 2: Find first repeated color
        let groupedColor: string | null = null;
        for (const color in colorCount) {
            if (colorCount[color] > 1) {
                groupedColor = color;
                break;
            }
        }

        // Step 3: Distribute items
        for (const tray of trayItemsList) {
            for (const item of tray) {
                if (!item) continue;
                if (item === groupedColor) {
                    result[0].push(item); // group matched color
                } else {
                    result[1].push(item); // leave others
                }
            }
        }

        return result;
    }





    formatGroupedMatrix(matrix: Matrix): Matrix {
        const countMap: Map<string, number> = new Map();

        // Step 1: Count each normalized string
        for (const row of matrix) {
            for (const cell of row) {
                const value = cell.trim();
                if (value) {
                    const normalized = value === "Bule" ? "Blue" : value;
                    countMap.set(normalized, (countMap.get(normalized) || 0) + 1);
                }
            }
        }

        // Step 2: Create full rows for values with 3 or more
        const result: Matrix = [];
        const leftovers: string[] = [];

        for (const [key, count] of countMap.entries()) {
            if (count >= 3) {
                const row = Array(count).fill(key);
                while (row.length < 6) row.push(""); // Pad to length 6
                result.push(row);
            } else {
                for (let i = 0; i < count; i++) leftovers.push(key);
            }
        }

        // Step 3: Add leftovers as a final row, padded to 6
        if (leftovers.length > 0) {
            while (leftovers.length < 6) leftovers.push("");
            result.push(leftovers);
        }

        return result;
    }

    // // Example input
    // const inputMatrix: Matrix = [
    //     ["Red", "Blue", "", "", "", ""],
    //     ["Blue", "Red", "Red", "", "", ""],
    //     ["Blue", "Brown", "Yellow", "", "", ""]
    // ];

    // // Run
    // const output = this.formatGroupedMatrix(inputMatrix);
    // console.log(output);


    //=============================================
    //=====================================================

    // getMatchedColors(trayA: string[], trayB: string[]): string[] {
    //     const setA = new Set(trayA.filter(c => c !== ''));
    //     const setB = new Set(trayB.filter(c => c !== ''));

    //     const matchedColors: string[] = [];

    //     for (const color of setA) {
    //         if (setB.has(color)) {
    //             matchedColors.push(color);
    //         }
    //     }

    //     return matchedColors;
    // }

    CheckTrayOverlapWithGrid(trayNode: Node, gridController: any): { row: number, col: number, node: Node } | null {
        const trayWorldRect = this.GetWorldRect(trayNode, 0.8);
        const gridItems = gridController.GetAllGridItems();
        for (const gridItem of gridItems) {
            const gridWorldRect = this.GetWorldRect(gridItem.node, 0.8);
            if (trayWorldRect.intersects(gridWorldRect)) {
                return { row: gridItem.row, col: gridItem.col, node: gridItem.node };
            }
        }
        return null;
    };

    GetWorldRect(node: Node, scaleFactor: number = 1): Rect {
        const transform = node.getComponent(UITransform);
        const worldPos = node.getWorldPosition();
        const size = transform.contentSize;
        const width = size.width * scaleFactor;
        const height = size.height * scaleFactor;
        const x = worldPos.x - width / 2;
        const y = worldPos.y - height / 2;
        return new Rect(x, y, width, height);
    };

    UpdateTargetTrayUI(_data: any) {
        this.scheduleOnce(() => {
            this.uiManagerScript.SetTargetTrayColorText(_data.color, _data.count);
            const isComplete: boolean = this.uiManagerScript.CheckTargetCountFullFilled()
            if (isComplete) {
                Constant.event.emit(GameEvents.ON_LEVEL_COMPLETE);
            }
        }, 0.5)
    }

    OnGameOver() {
        this.trayControllerScript.DisableAllTrayInput();
        this.uiManagerScript.ShowGameOverPopup();
    };


    OnLevelComplete() {
        this.trayControllerScript.DisableAllTrayInput();
        this.uiManagerScript.ShowLevelCompletePopup();
    }

}


