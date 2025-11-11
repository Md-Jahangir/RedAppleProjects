import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

type Position = { row: number, col: number }
@ccclass('InitialGridSet')
export class InitialGridSet extends Component {
    //#region -Fields
    directions = [
        { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
        { row: 0, col: -1 }, { row: 0, col: 1 },
        { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 }
    ];
    initialGridPosition = null;
    //#endregion

    //#region -OnEnable
    protected onEnable(): void {
        this.initialGridPosition = this.PlaceRandomNonAdjacentPositions();
    }
    //#endregion

    //#region -IsValidPosition
    /**
     * @param pos 
     * @returns 
     */
    IsValidPosition(pos: Position): boolean {
        return pos.row >= 0 && pos.row < 5 && pos.col >= 0 && pos.col < 5;
    }
    //#endregion

    //#region -MarkUnavailable
    /**
     * @param grid 
     * @param pos 
     */
    MarkUnavailable(grid: boolean[][], pos: Position): void {
        grid[pos.row][pos.col] = false;
        for (const direction of this.directions) {
            const newRow = pos.row + direction.row;
            const newCol = pos.col + direction.col;
            if (this.IsValidPosition({ row: newRow, col: newCol })) {
                grid[newRow][newCol] = false;
            }
        }
    }
    //#endregion

    //#region -PlacePositions
    /**
     * @param grid 
     * @param pickedPositions 
     * @param count 
     * @returns 
     */
    PlacePositions(grid: boolean[][], pickedPositions: Position[], count: number): boolean {
        if (count === 8) return true;

        const rows = this.Shuffle([0, 1, 2, 3, 4]);
        const cols = this.Shuffle([0, 1, 2, 3, 4]);

        for (let row of rows) {
            for (let col of cols) {
                if (grid[row][col]) {
                    const pos: Position = { row, col };
                    const newGrid = grid.map(row => [...row]);

                    pickedPositions.push(pos);
                    this.MarkUnavailable(newGrid, pos);

                    if (this.PlacePositions(newGrid, pickedPositions, count + 1)) {
                        return true;
                    }
                    pickedPositions.pop();
                }
            }
        }
        return false;
    }
    //#endregion

    //#region -PlaceRandomNonAdjacentPositions
    /**
     * @returns Position array..
     */
    PlaceRandomNonAdjacentPositions(): Position[] {
        const grid: boolean[][] = Array(5).fill(null).map(() => Array(5).fill(true));
        const pickedPositions: Position[] = [];
        const success = this.PlacePositions(grid, pickedPositions, 0);
        if (success) {
            return pickedPositions;
        } else {
            throw new Error("No valid placement found.");
        }
    }
    //#endregion

    //#region -Shuffle
    Shuffle<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    //#endregion
}


