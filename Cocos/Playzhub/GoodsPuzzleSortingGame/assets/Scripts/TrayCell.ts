import { _decorator, Component, Node, instantiate } from 'cc';
import { Item } from './Item';
const { ccclass, property } = _decorator;

@ccclass('TrayCell')
export class TrayCell extends Component {

    gridPosition: { row: number, col: number } = { row: -1, col: -1 };
    trayUniqueKey: string;

    start() {
    };

    SetGridPosition(row: number, col: number) {
        this.gridPosition.row = row;
        this.gridPosition.col = col;
    };

    GetGridPosition() {
        return this.gridPosition;
    };

    SetTrayUniqueKey(_key) {
        this.trayUniqueKey = _key;
    };

    RemoveAllItems(): void {
        const itemContainer: Node = this.node.getChildByName('ItemContainer');

        for (let i = 0; i < itemContainer.children.length; i++) {
            itemContainer.children[i].removeAllChildren();
        };
    };
}


