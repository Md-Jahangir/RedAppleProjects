class Constant {

    //#region -Level
    RAW_JSON_FILE = null;
    LEVEL_JSON = null;
    readonly MAX_LEVEL: number = 100;
    //#endregion

    //#region Scores
    readonly LOTUS_POINT_INCREAMENT: number = 20;
    readonly HINT_COST_INCREAMENT: number = 100;
    readonly BUZZIT_COST_INCREAMENT: number = 50;

    readonly BOOSTERS_HARD_LIMIT: number = 10;
    //#endregion

    readonly BUZZIT_SELECTED_TEXT: string = "Select any leaf to reveal a letter on it";

    //#region - Alphabet Container
    readonly RADIUS_OF_ALPHABET_CONTAINER: number = 145; // for calculate the positioning of alphabets place in alphabet container.
    readonly ANGLULAR_OFFSET_IN_RADIAN: number = 1.5708; // for start placing from 90 degree of the circle.
    //#endregion

    //#region -GridArea
    readonly GRID_WIDTH: number = 800;
    readonly CELL_SPACING_X: number = 10;
    readonly PADDING_VALUE: number = 100;

    readonly HINT_HIGHLIGHT_TIME = 5; // in seconds
    //#endregion

    //#region -Graphics
    // alphabet cointainer graphic.
    readonly SELECTION_GRAPHIC_LINEWIDTH = 25;
    readonly GRAPHICS_LINE_OFFSET = 50;

    // alphabet selected popup
    readonly SELECTION_POPUP_RADIUS = 50;
    readonly SELECTION_POPUP_ALPHABET_ENLARGE = 50;
    //#endregion

    //#region Animations
    BUTTON_ANIMATION_TIME_DURATION: number = 0.3;
}

export enum GAME_EVENTS {
    LEVEL_COMPLETE = 'levelcomplete',
    UPDATE_UI_SCORE = 'word_matched',
    TIME_END = "time_end",
    TIMER_PAUSE = "timer_pause",
    TIMER_RESUME = "timer_resume"
}

const constant = new Constant()
export { constant as Constant };
