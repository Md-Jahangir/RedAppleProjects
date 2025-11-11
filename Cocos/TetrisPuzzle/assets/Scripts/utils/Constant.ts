import { EventTarget } from "cc";

class Constant {
    event: EventTarget = new EventTarget();
    constructor() {
    }
    RAW_JSON_FILE = null;
    MAX_LEVEL = 4;
}

export enum GameEvents {
    ON_PIECE_SHAPES_TOUCH_START = 'on_piece_shapes_touch_start',
    ON_PIECE_SHAPES_TOUCH_END = 'on_piece_shapes_touch_end',
    ON_PIECE_SHAPES_TOUCH_MOVE = 'on_piece_shapes_touch_move',
    ON_PIECE_SHAPES_TOUCH_CANCEL = 'on_piece_shapes_touch_cancel',

    ON_GAME_OVER = 'on_game_over',
    ON_LEVEL_COMPLETE = 'on_level_complete',
    ON_NEXT_BUTTON_PRESSED = 'on_next_button_pressed',
    ON_UPDATE_TARGET_TRAY_UI = 'on_update_target_tray_ui',
};

let constant = new Constant();
export { constant as Constant };

