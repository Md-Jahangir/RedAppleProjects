import { _decorator, Component, Node, Prefab, UITransform, Color, instantiate, Vec3, Layout, SpriteFrame, Sprite, Label } from 'cc';
import { GridCell } from './GridCell';
import { Utils } from './utils/Utils';
const { ccclass, property } = _decorator;

@ccclass('GridController')
export class GridController extends Component {
    @property(Prefab)
    tilePrefab: Prefab = null;
    @property gridColumns: number = 4;
    @property gridRows: number = 3;
    @property(Prefab) gridCellPrefab: Prefab;
    @property(Node) tableBg: Node;
    @property([SpriteFrame]) tableBgFrameArray: SpriteFrame[] = [];
    gridCells: GridCell[][] = [];

    //#region - Set Board image ,grid deatils from json
    async SetBoardDataFromJson(_jsonData: any) {
        try {
            this.gridRows = _jsonData.grid.row;
            this.gridColumns = _jsonData.grid.col;
            await this.CreateBoard(_jsonData);
        } catch (error) {
            console.error("Error in SetBoardDataFromJson:", error);
        }
    };
    //#endregion

    //#region - Create the board
    async CreateBoard(jsonData: any): Promise<void> {
        try {
            const bgFrame = this.tableBgFrameArray.find(sf => sf.name === jsonData.board_bg);
            if (bgFrame) {
                this.tableBg.getComponent(Sprite).spriteFrame = bgFrame;
                await this.CalculateGridStartPosition();
                await this.GenerateGrid(this.gridRows, jsonData);
                if (jsonData.target_shape) {
                    this.PlaceTargetShape(jsonData.target_shape);
                }
            } else {
            }
        } catch (error) {
            console.error("Error in CreateBoard:", error);
        }
    };
    //#endregion

    //#region - Calculate grid position to place
    async CalculateGridStartPosition(): Promise<void> {
        return new Promise((resolve) => {
            try {
                const itemSize = this.gridCellPrefab.data.getComponent(UITransform).contentSize;
                const uiComponent = this.node.getComponent(UITransform);
                const layoutComponent = this.node.getComponent(Layout);

                const tempX = this.gridRows * itemSize.x;
                const tempY = this.gridColumns * itemSize.x;
                uiComponent.width = (tempX + layoutComponent.paddingLeft);
            } catch (error) {
                console.error("Error in CalculateGridStartPosition:", error);
            }
            resolve();
        })
    };
    //#endregion

    //#region - Generate grid
    async GenerateGrid(rows: number, jsonData: any): Promise<void> {
        try {
            this.node.removeAllChildren();
            this.gridCells = [];
            for (let r = 0; r < rows; r++) {
                this.gridCells[r] = [];
                for (let c = 0; c < this.gridColumns; c++) {
                    const gridCellNode = instantiate(this.gridCellPrefab);

                    gridCellNode.children[0].getComponent(Label).string = `${r}${c}`;
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
    //#endregion

    //#region - Set any shapes in the grid first
    PlaceTargetShape(targetShapes: any[]) {
        if (!targetShapes || targetShapes.length === 0) return;

        for (const targetShape of targetShapes) {
            if (!targetShape || !targetShape.type || !targetShape.start_position) continue;

            const { type, start_position } = targetShape;
            const layout = Utils.GetShapeLayout(type);

            if (!layout || layout.length === 0) {
                continue;
            }

            const randomColor = Utils.GetRandomColor();

            for (let r = 0; r < layout.length; r++) {
                for (let c = 0; c < layout[r].length; c++) {
                    if (layout[r][c] === 1) {
                        const row = start_position.row + r;
                        const col = start_position.col + c;
                        const cell = this.gridCells[row]?.[col];
                        if (!cell) continue;
                        const shapeTile = instantiate(this.tilePrefab);
                        cell.node.addChild(shapeTile);
                        const sprite = shapeTile.getComponent(Sprite);
                        if (sprite) sprite.color = new Color(randomColor[0], randomColor[1], randomColor[2]);
                        cell.SetOccupied(true);
                    }
                }
            }
        }
    };
    //#endregion

    //#region - Check all the cell is occupied with the shpaes
    IsCellOccupied(row: number, col: number): boolean {
        if (!this.gridCells[row] || !this.gridCells[row][col]) return true;
        return !!this.gridCells[row][col].IsOccupied();
    };
    //#endregion

    //#region - Check if full the grid is occupied with shapes or not
    CheckIfGridFull(): boolean {
        try {
            for (let r = 0; r < this.gridRows; r++) {
                for (let c = 0; c < this.gridColumns; c++) {
                    const cell = this.gridCells[r]?.[c];
                    if (!cell || !cell.IsOccupied()) {
                        return false;
                    }
                }
            }
            return true;
        } catch (error) {
            console.error("Error in CheckIfGridFull:", error);
            return false;
        }
    };
    //#endregion

    //#region - Set grid is occupied to true
    MarkGridOccupied(row: number, col: number) {
        if (this.gridCells[row] && this.gridCells[row][col]) {
            this.gridCells[row][col].SetOccupied(true);
        }
    };
    //#endregion

    //#region - Get al the grid items
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
    //#endregion

    //#region - Reset the grid
    ResetGrid(): void {
        this.node.removeAllChildren();
    };
    //#endregion


}