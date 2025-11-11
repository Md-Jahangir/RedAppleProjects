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

    gameOverScript: GameOver;
    levelCompleteScript: LevelComplete;

    protected onEnable(): void {
        this.gameOverScript = this.gameOverPrefab.data.getComponent(GameOver);
        this.levelCompleteScript = this.levelCompletePrefab.data.getComponent(LevelComplete);
    }


    ShowGameOverPopup() {
        this.gameOverNode = instantiate(this.gameOverPrefab);
        this.node.addChild(this.gameOverNode);
        this.gameOverNode.setPosition(0, 0, 0);
    };
    HideGameOverPopup() {
        if (this.gameOverNode && this.gameOverNode.isValid) {
            this.gameOverNode.destroy();
            this.gameOverNode = null;
        } else {
        }
    };

    ShowLevelCompletePopup() {
        this.levelCompleteNode = instantiate(this.levelCompletePrefab);
        this.node.addChild(this.levelCompleteNode);
        this.levelCompleteNode.setPosition(0, 0, 0);

    };
    HideLevelCompletePopup() {
        if (this.levelCompleteNode && this.levelCompleteNode.isValid) {
            this.levelCompleteNode.destroy();
            this.levelCompleteNode = null;
        } else {
        }
    };

}


