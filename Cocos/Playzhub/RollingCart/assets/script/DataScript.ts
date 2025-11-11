import { _decorator, Component, Node } from 'cc';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('DataScript')
export class DataScript extends Component {

    timeToEnd: number = 0;
    totalGivenTime: number = 0;
    gameID: string;
    UIManager: Node;
    isStartTimer: boolean = false;
    numberOfPlay: number = 0;

    SetTimer(_time: number): void {
        // this.timeToEnd = _time;
        // this.totalGivenTime = _time;
    }

    GetTimer(): number {
        return this.timeToEnd;
    }

    SetUIManager(_uiManager: Node): void {
        this.UIManager = _uiManager;
    }

    SetGameID(_gameid: string): void {
        this.gameID = _gameid;
    }

    GetGameID(): string {
        return this.gameID;
    }

    GetTotalTime(): number {
        return this.totalGivenTime;
    }

    StartTimer(): void {
        this.isStartTimer = true;
    }

    NumberOfPlayIncreament(): void {
        this.numberOfPlay++;
    }

    GetNumberOfPlay(): number {
        return this.numberOfPlay;
    }

    protected update(dt: number): void {
        if (this.isStartTimer) {
            this.timeToEnd += dt;
        }
    }

}


