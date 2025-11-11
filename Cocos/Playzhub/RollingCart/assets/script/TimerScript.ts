import { _decorator, Component, director, Label, Node } from 'cc';
import { DataScript } from './DataScript';
const { ccclass, property } = _decorator;

@ccclass('TimerScript')
export class TimerScript extends Component {

    @property(Node) globalData: Node;
    timerText: Label;

    protected onEnable(): void {
        this.globalData = director.getScene().getChildByName("Data");
        this.timerText = this.node.getComponent(Label);

        if (director.getScene().name == "GameScene") {
            this.globalData.getComponent(DataScript).SetUIManager(director.getScene().getChildByName("UICanvas"));
        }
    }
    update(deltaTime: number) {
        this.TimerFormat(this.globalData.getComponent(DataScript).GetTimer());
    }
    TimerFormat(_time: number): void {
        let minute = _time / 60;
        let second = _time % 60;

        let minutes: string = minute < 10 ? "0" + minute.toString() : minute.toString();
        let seconds = second < 10 ? "0" + second.toString() : second.toString();
        this.timerText.string = `Timer Left : ${parseInt(minutes)} : ${parseInt(seconds)}`;
    }
}


