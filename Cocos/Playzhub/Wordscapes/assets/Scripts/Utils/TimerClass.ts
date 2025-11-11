import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../GameManager';
import { GAME_EVENTS } from '../globals/Constant';
import { UIManager } from '../UIManager';
const { ccclass, property } = _decorator;

@ccclass('TimerClass')
export class TimerClass extends Component {

    //References
    @property(Node) timerIcon: Node = null;
    uiManager: UIManager = null;

    //Local Variable
    private timer: number = 0;
    private timeEndWarning: number = 290;
    private isPaused: boolean = false;
    // timerScheduleCallback = null;

    //#region -OnEnable
    protected onEnable(): void {
        this.uiManager = this.node.parent.getComponent(UIManager);
        GameManager.instance.gameEvent.on(GAME_EVENTS.TIMER_PAUSE, this.SetPause, this);
        GameManager.instance.gameEvent.on(GAME_EVENTS.TIMER_RESUME, this.SetResume, this);
    }
    //#endregion

    //#region remainingTime
    public get remainingTime(): number {
        return this.timer;
    }
    //#endregion

    //#region -StartTimer
    /**
     * @description - Start Timer
     * @param _timerToEnd 
     */
    StartTimer(_timerToEnd: number): void {
        this.timer = _timerToEnd;
        this.timeEndWarning = this.timer * 10 / 100;
        if (this.uiManager) this.uiManager.UpdateTimerUI(this.timer);
        this.schedule(this.TimerUpdate, 1);
    }
    //#endregion

    //#region  -TimerUpdate
    /**
     * @description - Timer reducing every seconds
     */
    TimerUpdate(): void {
        if (this.isPaused) return;

        if (this.timer <= 0) {
            this.uiManager?.TimerWarningStop();
            this.unschedule(this.TimerUpdate);
            GameManager.instance.gameEvent.emit(GAME_EVENTS.TIME_END);
            return;
        }

        this.timer--;

        if (this.uiManager) {
            this.uiManager.UpdateTimerUI(this.timer);
            if (this.timer === this.timeEndWarning) this.uiManager.TimerWarningIndicator();
        }
    }
    //#endregion

    //#region - StopTimer
    /**
     * @description - Stop timer if needed.
     */
    StopTimer(): void {
        this.unschedule(this.TimerUpdate);
    }
    //#endregion

    //#region SetPause
    SetPause(): void {
        this.isPaused = true;
    }
    //#endregion

    //#region SetResume
    SetResume(): void {
        this.isPaused = false;
    }
    //#endregion
}