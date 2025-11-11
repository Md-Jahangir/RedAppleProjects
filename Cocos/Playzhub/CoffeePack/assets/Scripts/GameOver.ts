import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOver')
export class GameOver extends Component {

    ShowGameOverPopup() {
        this.node.active = true;
    };
    HideGameOverPopup() {
        this.node.active = false;
    };

    OnRetryButtonPressed() {
        console.log("OnRetryButtonPressed: ");
        director.loadScene("GameScene");

    }

    OnHomeButtonPressed() {
        console.log("OnHomeButtonPressed: ");
        director.loadScene("TitleScene");

    }
}


