import { _decorator, EventTarget, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

export type ProfileData = {
    image: SpriteFrame,
    name: string,
    score: number
}

@ccclass('Constant')
class Constant {

    gameEvents = new EventTarget();
    Levels_Star_Array: number[] = [];
    readonly MAX_LEVEL: number = 100;

    playerProfileData: ProfileData = {
        image: null,
        name: "",
        score: 0
    };
    opponentProfileData: ProfileData = {
        image: null,
        name: "",
        score: 0
    };

    GameData: Object = {
        "max_level": this.MAX_LEVEL,
        "life_time_score": 0,
        "levels_stars_array": [0]
    };

    totalPlayerStar: number = 0;
    FoulText: string = 'FOUL!';
    QueenCoverWarning: string = 'You need to pocket queen first.';

    // RawScoreJson = null;
    RawLevelsJson = null;
    //#region -Board Constant
    readonly BASELINE_WIDTH = 600;
    //#endregion

    //#region -Striker Constant
    readonly STRIKER_FORCE = 2;
    readonly MAX_FORCE_MAGNITUDE = 2000;

    readonly MAX_STRIKER_BASELINE_CLAMP = 0.8;
    readonly MIN_STRIKER_BASELINE_CLAMP = 0.2;
    readonly MAX_ARROW_SCALE = 4.5;
    readonly ARROW_SCALE_MULTIPLIER = 0.005;
    readonly RADIAN_DEGREE_90 = 1.5708;
    readonly STRIKER_DIAMETER = 45;

    readonly MIN_APPLY_FORCE = 100;
    //#endregion

    //#region -AI
    readonly EXTENDED_ANGLE_POS_X = 150;
    readonly BASLINE_CLAMP_X = 250;
    readonly MAX_PLACE_ATTEMPT = 10;
    //#endregion

    //#region -GameLogics
    readonly MIN_VELOCITY_FOR_TURN_CHANGE = 0.1;

    readonly DUMMY_BOT_NAME: string[] = [
        "Alex Morgan",
        "Jamie Brooks",
        "Taylor Reed",
        "Jordan Ellis",
        "Casey Bennett",
        "Riley Carter",
        "Morgan Blake",
        "Sam Harper",
        "Avery Quinn",
        "Drew Walker",
        "Logan Hayes",
        "Reese Mitchell",
        "Cameron Scott",
        "Devon Parker",
        "Skylar James"
    ];;
    readonly onMouseEnter = () => {
        document.body.style.cursor = 'pointer';
    };

    readonly onMouseLeaveOrUp = () => {
        document.body.style.cursor = 'default';
    };

    async ParseData(data: any) {
        let _data = data;
        if (typeof data !== 'object') {
            _data = JSON.parse(data);
        }
        return _data;
    };
}

//#region -GameEvents
/**
 * @description - Events for Gamplay logics.
 */
export enum GAME_EVENTS {
    TURN_CHANGE = 'turn_change',
    FAUL = 'faul',
    QUEEN_POCKET = 'queen_pocket',
    QUEEN_COVERED = 'queen_covered',
    ORIENTATION_CHANGED = "orientation_changed"
}
//#endregion

export enum GAME_MODE {
    CHALLENGER = "challenger",
    VERSUS = "versus"
}

//#region -CoinType
/**
 * @description - Type of coin.
 */
export enum COIN_TYPE {
    WHITE = "White",
    BLACK = "Black",
    QUEEN = "Queen",
    PENALTY_PAWN = "Penalty_Pawn"
}

const constant = new Constant()
export { constant as Constant }

