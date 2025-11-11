import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GridCell')
export class GridCell extends Component {

    gridPosition: { row: number, col: number } = { row: -1, col: -1 };
    private isOccupied: boolean = false;

    protected onLoad(): void {

    };

    //#region - Set Grid Position
    SetGridPosition(row: number, col: number) {
        this.gridPosition.row = row;
        this.gridPosition.col = col;
    };
    //#endregion

    //#region - Get Grid Position
    GetGridPosition() {
        return this.gridPosition;
    };
    //#endregion

    //#region - Return if grid is occupied
    IsOccupied(): boolean {
        return this.isOccupied;
    };
    //#endregion

    //#region - Set grid to occupied
    SetOccupied(value: boolean = true) {
        this.isOccupied = value;
    }
    //#endregion

}


