import { EventTarget } from "cc";

class Constant {
    event: EventTarget = new EventTarget();
    constructor() {
    }
    RAW_JSON_FILE = null;
    MAX_LEVEL = 4;
}

export enum GameEvents {
    ON_TABLE_TRAY_TOUCH_END = 'on_table_tray_touch_end',
    ON_TABLE_TRAY_TOUCH_MOVE = 'on_table_tray_touch_move',
    ON_TABLE_TRAY_TOUCH_CANCEL = 'on_table_tray_touch_cancel',
    ON_GAME_OVER = 'on_game_over',
    ON_LEVEL_COMPLETE = 'on_level_complete',
    ON_NEXT_BUTTON_PRESSED = 'on_next_button_pressed',
    ON_UPDATE_TARGET_TRAY_UI = 'on_update_target_tray_ui',
};

let constant = new Constant();
export { constant as Constant };

