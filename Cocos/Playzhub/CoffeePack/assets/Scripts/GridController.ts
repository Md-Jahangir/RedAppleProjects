import { _decorator, Component, Node, Prefab, UITransform, instantiate, Vec3, Layout, SpriteFrame, Sprite, Label } from 'cc';
import { GridCell } from './GridCell';
import { Tray } from './Tray';
const { ccclass, property } = _decorator;
import { Constant, GameEvents } from './utils/Constant';

@ccclass('GridController')
export class GridController extends Component {

    @property gridColumns: number = 4;
    @property gridRows: number = 3;
    @property(Prefab) gridCellPrefab: Prefab;
    @property(Node) tableBg: Node;
    @property([SpriteFrame]) tableBgFrameArray: SpriteFrame[] = [];
    gridCells: GridCell[][] = [];
    private preceedingTrayKey: string[] = [];

    SetPrecedingTrayKey(_key) {
        this.preceedingTrayKey.push(_key);
        console.log("this.preceedingTrayKey: ", this.preceedingTrayKey);

    };
    GetPreceedingTrayKey() {
        return this.preceedingTrayKey;
    };
    RemoveKeyFromPreceedingTray(_key) {
        console.log("remove..........._key", _key);
        this.preceedingTrayKey = this.preceedingTrayKey.filter(item => item !== _key);
        console.log("this.preceedingTrayKey after removed: ", this.preceedingTrayKey);

    };

    async SetBoardDataFromJson(_jsonData: any) {
        try {
            this.gridRows = _jsonData.grid.row;
            this.gridColumns = _jsonData.grid.col;
            await this.CreateBoard(_jsonData);
        } catch (error) {
            console.error("Error in SetBoardDataFromJson:", error);
        }
    }

    async CreateBoard(jsonData: any): Promise<void> {
        try {
            const bgFrame = this.tableBgFrameArray.find(sf => sf.name === jsonData.board_bg);
            if (bgFrame) {
                this.tableBg.getComponent(Sprite).spriteFrame = bgFrame;
                await this.CalculateGridStartPosition();
                await this.GenerateGrid(this.gridRows, jsonData);
            } else {
                console.warn("Background frame not found for:", jsonData.board_bg);
            }
        } catch (error) {
            console.error("Error in CreateBoard:", error);
        }
    }

    async CalculateGridStartPosition(): Promise<void> {
        try {
            const itemSize = this.gridCellPrefab.data.getComponent(UITransform).contentSize;
            const tableBgHeight = this.tableBg.getComponent(UITransform).height / 2;
            const posY = this.tableBg.position.y + tableBgHeight + ((itemSize.height / 2) * this.gridRows + ((this.gridRows - 3) * 6));
            this.node.setPosition(this.node.position.x, posY, 0);
        } catch (error) {
            console.error("Error in CalculateGridStartPosition:", error);
        }
    }

    async GenerateGrid(rows: number, jsonData: any): Promise<void> {
        try {
            this.node.removeAllChildren();
            for (let r = 0; r < rows; r++) {
                this.gridCells[r] = [];
                for (let c = 0; c < this.gridColumns; c++) {
                    const gridCellNode = instantiate(this.gridCellPrefab);
                    gridCellNode.children[1].getComponent(Label).string = `${r}${c}`;
                    this.node.addChild(gridCellNode);

                    const gridCellScript = gridCellNode.getComponent(GridCell);
                    if (gridCellScript) {
                        gridCellScript.SetGridPosition(r, c);
                        this.gridCells[r][c] = gridCellScript;
                    }
                }
            }
        } catch (error) {
            console.error("Error in GenerateGrid:", error);
        }
    };

    GetGridCell(_row: number, _col: number): Node {
        const index: number = _row * this.gridColumns + _col;
        return this.node.children[index];
    };

    GetAllGridItems(): { row: number, col: number, node: Node }[] {
        const items: { row: number, col: number, node: Node }[] = [];
        for (let r = 0; r < this.gridCells.length; r++) {
            for (let c = 0; c < this.gridCells[r].length; c++) {
                const cell = this.gridCells[r][c];
                if (cell?.node) {
                    items.push({ row: r, col: c, node: cell.node });
                }
            }
        }
        return items;
    };

    isGridFull(): boolean {
        return this.gridCells.every(row => row.every(cell => !cell.isTrayContainerEmpty()));
    }

    ResetGrid(): void {
        this.node.removeAllChildren();
    };

    //=============================
    async OnPlaceTrayOnGrid(trayNode: Node, row: number, col: number): Promise<boolean> {
        const targetCell = this.gridCells[row][col];
        if (targetCell.isTrayContainerEmpty()) {
            targetCell.placeTray(trayNode);
            const tray = trayNode.getComponent(Tray);
            targetCell.tray = tray;
            this.SetPrecedingTrayKey(row + "_" + col);
            return true;
        }
        return false;
    };

    //#region -ValueAt
    ValueAt(_row: number, _col: number): Tray {
        if (!this.isValidCell(_row, _col)) {
            return
        }
        return this.gridCells[_row][_col].GetGridTrayItem();
    }
    //#endregion

    isValidCell(row: number, col: number): boolean {
        return row >= 0 && col >= 0 && row < this.gridRows && col < this.gridColumns && this.gridCells[row][col].GetGridTrayItem() !== null;
    }

    async IsHorizontalCheck(_row: number, _col: number): Promise<boolean> {
        const tray = this.ValueAt(_row, _col);
        if (!tray) return false;

        const trayRight = this.ValueAt(_row, _col + 1);
        const trayLeft = this.ValueAt(_row, _col - 1);

        if (trayRight) {
            const matchRight = await this.checkMatchingColors(tray, trayRight);
            if (matchRight) return true;
        }

        if (trayLeft) {
            const matchLeft = await this.checkMatchingColors(tray, trayLeft);
            if (matchLeft) return true;
        }

        return false;
    }

    async IsVerticalCheck(_row: number, _col: number): Promise<boolean> {
        const tray = this.ValueAt(_row, _col);
        if (!tray) return false;

        const trayAbove = this.ValueAt(_row - 1, _col);
        const trayBelow = this.ValueAt(_row + 1, _col);

        if (trayAbove) {
            const matchAbove = await this.checkMatchingColors(tray, trayAbove);
            if (matchAbove) return true;
        }

        if (trayBelow) {
            const matchBelow = await this.checkMatchingColors(tray, trayBelow);
            if (matchBelow) return true;
        }

        return false;
    }
    //#endregion

    //#region -IsMatch
    async IsMatch(_row: number, _col: number): Promise<boolean> {
        return await this.IsHorizontalCheck(_row, _col) || await this.IsVerticalCheck(_row, _col);
    }
    //#endregion



    // async IsMatch(_row: number, _col: number): Promise<boolean> {
    //     const DIRECTIONS = [
    //         { dr: 0, dc: 1 },  // Right
    //         { dr: 0, dc: -1 }, // Left
    //         { dr: -1, dc: 0 }, // Up
    //         { dr: 1, dc: 0 },  // Down
    //     ];
    //     const tray = this.ValueAt(_row, _col);
    //     if (!tray) return false;

    //     for (const { dr, dc } of DIRECTIONS) {
    //         const neighbor = this.ValueAt(_row + dr, _col + dc);
    //         if (neighbor && await this.checkMatchingColors(tray, neighbor)) {
    //             return true;
    //         }
    //     }

    //     return false;
    // }

    //#region -GetMatchList
    async GetMatchList(): Promise<any> {
        let matches = [];

        for (let i = 0; i < this.gridRows; i++) {
            for (let j = 0; j < this.gridColumns; j++) {
                const tray = this.ValueAt(i, j);
                if (!tray) continue;
                if (await this.IsMatch(i, j)) {
                    matches.push({ row: i, column: j });
                }
            }
        }
        return matches;
    }
    //#endregion

    async checkMatchingColors(trayA: Tray, trayB: Tray): Promise<boolean> {
        if (!trayA?.trayItem || !trayB?.trayItem) return Promise.resolve(false);
        const commonColors = trayA.trayItem.filter(colorA =>
            colorA && trayB.trayItem.includes(colorA)
        );
        return Promise.resolve(commonColors.length > 0); // Return true if there are any common colors
    }


    //==============================================================
    // async findNeighboringTrays(row: number, col: number, trayToDrop: Tray, visited: Set<string> = new Set()): Promise<Tray[]> {
    //     const directions = [
    //         { dr: 0, dc: 1 }, { dr: 0, dc: -1 },
    //         { dr: 1, dc: 0 }, { dr: -1, dc: 0 }
    //     ];
    //     const trays: Tray[] = [];
    //     for (const { dr, dc } of directions) {
    //         const newRow = row + dr;
    //         const newCol = col + dc;
    //         if (this.isValidCell(newRow, newCol)) {
    //             const neighbor = this.gridCells[newRow][newCol];
    //             const key = `${newRow},${newCol}`;
    //             if (neighbor.tray && !visited.has(key)) {
    //                 visited.add(key);
    //                 if (await this.checkMatchingColors(trayToDrop, neighbor.tray)) {
    //                     trays.push(neighbor.tray, ...(await this.findNeighboringTrays(newRow, newCol, neighbor.tray, visited)));
    //                 }


    //             }
    //         }
    //     }
    //     return trays;
    // };

    // async getColorToIndexMap(trays: Tray[]): Promise<Record<string, number[]>> {
    //     const map: Record<string, number[]> = {};
    //     trays.forEach(tray => {
    //         tray.trayItem.forEach((color, i) => {
    //             if (color) {
    //                 if (!map[color]) map[color] = [];
    //                 map[color].push(i);
    //             }
    //         });
    //     });
    //     return map;
    // }


    // async ClearTraySlots(trays: Tray[]) {
    //     trays.forEach(tray => tray.trayItem.fill(""));
    // }


    // async FilledTrayBasedOnColor(trays: Tray[], colorMap: Record<string, number[]>) {
    //     const sortedColors = Object.entries(colorMap)
    //         .map(([color, slots]) => ({ color, count: slots.length }))
    //         .sort((a, b) => b.count - a.count);

    //     let trayIndex = 0;
    //     for (const { color } of sortedColors) {
    //         const slots = colorMap[color];
    //         let slotIndex = 0;

    //         while (slotIndex < slots.length && trayIndex < trays.length) {
    //             const tray = trays[trayIndex];
    //             for (let i = 0; i < tray.trayItem.length && slotIndex < slots.length; i++) {
    //                 tray.trayItem[i] = color;
    //                 slotIndex++;
    //             }
    //             trayIndex++;
    //         }
    //     }
    // }

    // isTrayEmpty(tray: Tray): boolean {
    //     return tray.trayItem.every(item => !item);
    // }

    // isAllSlotsSameColor(tray: Tray): string | null {
    //     const nonEmpty = tray.trayItem.filter(c => c);
    //     if (nonEmpty.length !== 6) return null;

    //     const first = nonEmpty[0];
    //     return nonEmpty.every(c => c === first) ? first : null;
    // }

    // async getMaxColorIdCount(trays: Tray[]): Promise<{ id: number, color: string, count: number }[]> {
    //     const map: Record<string, number[]> = {};
    //     trays.forEach((tray, i) => {
    //         tray.trayItem.forEach(color => {
    //             if (color) {
    //                 if (!map[color]) map[color] = new Array(trays.length).fill(0);
    //                 map[color][i]++;
    //             }
    //         });
    //     });

    //     const result: { id: number, color: string, count: number }[] = [];
    //     for (const color in map) {
    //         map[color].forEach((count, i) => {
    //             if (count > 0) result.push({ id: i, color, count });
    //         });
    //     }
    //     return result;
    // }


}