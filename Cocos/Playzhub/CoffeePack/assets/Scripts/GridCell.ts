import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { Tray } from './Tray';

@ccclass('GridCell')
export class GridCell extends Component {
    @property(Node) trayContainer: Node = null;  // The node where trays will be placed
    tray: Tray | null = null;  // Reference to the tray in this grid cell
    gridPosition: { row: number, col: number } = { row: -1, col: -1 };
    private isEmpty: boolean = true;

    protected onLoad(): void {
        if (!this.trayContainer) {
            console.error("TrayContainer node is not assigned in the GridCell prefab!");
        }
    };

    SetGridPosition(row: number, col: number) {
        this.gridPosition.row = row;
        this.gridPosition.col = col;
    };

    GetGridPosition() {
        return this.gridPosition;
    };

    // Method to check if the tray container is empty
    isTrayContainerEmpty(): boolean {
        return this.trayContainer.children.length === 0;
    };

    // Place the tray inside the tray container, if it's empty
    placeTray(trayNode: Node): void {
        if (this.isTrayContainerEmpty()) {
            this.trayContainer.addChild(trayNode);
            trayNode.setPosition(0, 0, 0);  // Reset tray position to the center of the cell

        }
    }

    // Remove the tray from the container (called when needed)
    // removeTray(): void {
    //     if (this.trayContainer && this.trayContainer.children.length > 0) {
    //         const trayNode = this.trayContainer.children[0];
    //         trayNode.removeFromParent();
    //     }
    // }

    //#region -GetEmpty
    // GetEmpty(): boolean {
    //     return this.isEmpty;
    // }
    //#endregion

    GetGridTrayItem() {
        return this.tray;
    }

    // clearTray() {
    //     this.tray.trayItem = [];
    // }
}


