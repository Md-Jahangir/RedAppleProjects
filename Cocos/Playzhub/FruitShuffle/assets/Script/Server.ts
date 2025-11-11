import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Server')
class Server {
    urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    timerValue: string = this.urlParams.get("timer");
    gameID: string = this.urlParams.get("game_id");
    numberOfPlayButtonClicked: number = 0;

    NumberOfPlayButtonClickedIncreament(): void {
        this.numberOfPlayButtonClicked += 1;
    }

    public IsUrlParamsMissing(): boolean {
        if (!this.timerValue) {
            return true;
        }
        else {
            return false;
        }
    }

    GetTimerValue(): number {
        return parseInt(this.timerValue);
    }
}
const server = new Server()
export { server as Server }


