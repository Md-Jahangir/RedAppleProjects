import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import { GameOver } from './GameOver';
import { LevelComplete } from './LevelComplete';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    gameOverNode: Node;
    levelCompleteNode: Node;
    @property(Prefab) gameOverPrefab: Prefab;
    @property(Prefab) levelCompletePrefab: Prefab;
    @property(Prefab) targetTrayPrefab: Prefab;
    @property(Node) targetTrayParent: Node;

    gameOverScript: GameOver;
    levelCompleteScript: LevelComplete;

    protected onEnable(): void {
        this.gameOverScript = this.gameOverPrefab.data.getComponent(GameOver);
        this.levelCompleteScript = this.levelCompletePrefab.data.getComponent(LevelComplete);
    }

    async MakeTargetTray(_levelData: Object): Promise<void> {
        for (let i = 0; i < _levelData["target_tray"].length; i++) {
            const colorText: string = _levelData["target_tray"][i]["color"];
            const count: number = _levelData["target_tray"][i]["count"];
            const targetTay: Node = instantiate(this.targetTrayPrefab);
            targetTay.name = `${colorText}`;
            targetTay.setParent(this.targetTrayParent);
            targetTay.children[0].getComponent(Label).string = `${colorText}: ${count}`;
        };
    };
    ResetTargetTray() {
        this.targetTrayParent.removeAllChildren();
    }

    SetTargetTrayColorText(_color: string, _count: number): void {
        const foundNode = this.targetTrayParent.children.find(child => child.name === _color);
        if (foundNode) {
            const labelComponet = foundNode.children[0].getComponent(Label);
            const str = labelComponet.string;
            const number = parseInt(str.split(":").pop()?.trim() || "0", 10);
            console.log(number);
            if (number != 0) {
                labelComponet.string = `${_color}: ${number - _count}`;
            }
        }
    };

    CheckTargetCountFullFilled() {
        for (let i = 0; i < this.targetTrayParent.children.length; i++) {
            const label = this.targetTrayParent.children[i].children[0].getComponent(Label);
            const str = label.string;
            const number = parseInt(str.split(":").pop()?.trim() || "0", 10);

            if (number > 0) {
                return false;
            }

        }
        return true;
    }

    ShowGameOverPopup() {
        // this.gameOverScript.ShowGameOverPopup();
        this.gameOverNode = instantiate(this.gameOverPrefab);
        this.node.addChild(this.gameOverNode);
        this.gameOverNode.setPosition(0, 0, 0);
    };
    HideGameOverPopup() {
        // this.gameOverScript.HideGameOverPopup();

        if (this.gameOverNode && this.gameOverNode.isValid) {
            this.gameOverNode.destroy();
            this.gameOverNode = null;
        } else {
        }
    };

    ShowLevelCompletePopup() {
        // this.levelCompleteScript.ShowLevelCompletePopup();
        this.levelCompleteNode = instantiate(this.levelCompletePrefab);
        this.node.addChild(this.levelCompleteNode);
        this.levelCompleteNode.setPosition(0, 0, 0);

    };
    HideLevelCompletePopup() {
        // this.levelCompleteScript.HideLevelCompletePopup();

        if (this.levelCompleteNode && this.levelCompleteNode.isValid) {
            this.levelCompleteNode.destroy();
            this.levelCompleteNode = null;
        } else {
        }
    };

}


