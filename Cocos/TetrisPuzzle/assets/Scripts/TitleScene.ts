import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TitleScene')
export class TitleScene extends Component {

    //#region - Play button pressed
    OnPlayButtonPressed(): void {
        director.loadScene("GameScene");
    };
    //#endregion
}


