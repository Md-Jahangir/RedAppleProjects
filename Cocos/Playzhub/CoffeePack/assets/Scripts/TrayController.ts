import { _decorator, Component, Node, Prefab, instantiate, NodePool, UITransform, Vec3, Rect } from 'cc';
import { Tray } from './Tray';

const { ccclass, property } = _decorator;
@ccclass('TrayController')
export class TrayController extends Component {

    @property(Prefab) trayPrefab: Prefab;
    trayContainer: Node;
    possibleTrayItems = [];

    protected onLoad(): void {
        this.trayContainer = this.node;
    };

    async SetTrayDataFromJson(jsonData: object) {
        this.possibleTrayItems = jsonData["tray"]["possible_tray_items"];
        await this.GenerateTableTrayGrid();
    };

    async GenerateTableTrayGrid() {
        for (let c = 0; c < 3; c++) {
            const trayNode = instantiate(this.trayPrefab);
            this.trayContainer.children[c].addChild(trayNode);

            const trayScript = trayNode.getComponent(Tray);
            const data = this.CreateRandomTrayItem();
            trayScript.SetTrayItem(data);
        }
    };

    ResetTray() {
        for (let i = 0; i < 3; i++) {
            this.trayContainer.children[i].removeAllChildren();
        }
    }

    CreateRandomTrayItem(): string[] {
        const trayData: string[] = ["", "", "", "", "", ""];
        const totalItems = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < totalItems; i++) {
            const color = this.possibleTrayItems[Math.floor(Math.random() * this.possibleTrayItems.length)];
            trayData[i] = color;
        }
        return trayData;
    };

    CheckIsTableEmpty() {
        let isAllTrayDestroyed: boolean = true;
        this.trayContainer.children.forEach((child: Node) => {
            if (child.children.length !== 0) {
                isAllTrayDestroyed = false;
            }
        });

        if (isAllTrayDestroyed) {
            this.GenerateTableTrayGrid();
        }
    };

    DisableAllTrayInput() {
        for (let c = 0; c < this.trayContainer.children.length; c++) {
            const trayNode = this.trayContainer.children[c].children[0];
            trayNode?.getComponent(Tray)?.DisableInputEvent();
        }
    };

}


