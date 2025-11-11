import { _decorator, Component, director, Node } from 'cc';
import { Constant, GameEvents } from './Constant';
const { ccclass, property } = _decorator;

@ccclass('LevelComplete')
export class LevelComplete extends Component {
    ShowLevelCompletePopup() {
        this.node.active = true;
    };
    HideLevelCompletePopup() {
        this.node.active = false;
    };

    OnNextButtonPressed() {
        console.log("OnNextButtonPressed: ");
        Constant.event.emit(GameEvents.ON_NEXT_BUTTON_PRESSED);

    }

    OnHomeButtonPressed() {
        console.log("OnHomeButtonPressed: ");
        director.loadScene("TitleScene");

    }
}


