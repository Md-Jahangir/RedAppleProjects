
export class Constant {
    private static _speedRatio: number = 1.0;
    private static _mode: string = "tutorial";
    // private static _mode: string = "medium";
    private static _highScore: number = 0;
    private static _distance: number = 0;
    private static _isMobile: boolean = false;
    private static _gameStartTime: number = 0;


    public static get speedRatio(): number {
        return this._speedRatio;
    }
    public static set speedRatio(value: number) {
        this._speedRatio = value;
        console.log("Speed ratio changed to", value);
    }

    public static get mode(): string {
        return this._mode;
    }
    public static set mode(value: string) {
        this._mode = value;
    }

    public static get highScore(): number {
        return this._highScore;
    }
    public static set highScore(value: number) {
        this._highScore = value;
        console.log("high Score", value);
    }

    public static get distance(): number {
        return this._distance;
    }
    public static set distance(value: number) {
        this._distance = value;
        console.log("distance", value);
    }

    public static get gameStartTime(): number {
        return this._gameStartTime;
    }
    public static set gameStartTime(value: number) {
        this._gameStartTime = value;
        console.log("_gameStartTime", value);
    }

    public static get isMobile(): boolean {
        return this._isMobile;
    }
    public static set isMobile(isTrue: boolean) {
        this._isMobile = isTrue;
    }
}


