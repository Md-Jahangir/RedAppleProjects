import { _decorator, Component, Node, resources, Asset, EventTarget, Prefab, randomRangeInt, EventTouch, instantiate, director, view } from 'cc';
import { AlphabetGrid } from './AlphabetGrid';
import { Constant, GAME_EVENTS } from './globals/Constant';
import { Grid } from './Grid';
import { UIManager } from './UIManager';
import { ScoreManager } from './ScoreManager';
import { TimerClass } from './Utils/TimerClass';
import { GridCellDatabase } from './GridCellDatabase';
import { AnimationManager } from './Utils/AnimationManager';
import { SoundManager } from './SoundManager';
import { PlayzhubEventHandler } from './platform_sdk/PlayzhubEventHandler';
import { AdManager } from './Utils/AdManager';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    // Instance and events variable.
    public static instance: GameManager = null;
    gameEvent = new EventTarget();
    canvas = null;

    // References
    @property(Node) alphabetCointainerNode: Node = null;
    alphabetContainerGrid: AlphabetGrid;
    @property(Node) gridNode: Node = null;
    gridScript: Grid;
    @property(UIManager) uiManager: UIManager = null;
    @property(ScoreManager) scoreManager: ScoreManager = null;
    @property(TimerClass) time: TimerClass = null;
    @property(Prefab) tutorialPrefab: Prefab = null;
    tutorialNode: Node = null;

    //Local variables
    currentLevel: number = 0;
    gameOver: boolean = false;
    // jsonIndex: number = 0;  for future json loading optimization.
    wordsInGrid: Object = {};
    dictionaryWords: Object = {};
    selectedWords: string[] = [];
    collectedDictionaryWords: string[] = [];
    timeToEnd: number = 0;
    collectedBonus: boolean[] = [false, false];
    gameStartedTimeSatmp = null;
    initialTimer = null;
    isGamePaused: boolean = false;

    //Collect Animation
    @property(Node) buzzitButton: Node = null
    @property(Node) hintButton: Node = null;
    @property(Node) buzzitIcon: Node = null;
    @property(Node) hintIcon: Node = null;
    @property(Node) bgSpine: Node = null;
    @property(Node) buzzitCollectStartPos: Node = null;
    @property(Node) hintCollectStartPos: Node = null;

    private isListenerRegistered: boolean = false;

    //#region -onEnable
    protected onEnable(): void {
        if (GameManager.instance === null) GameManager.instance = this; // Making Singleton

        this.gameEvent.on(GAME_EVENTS.LEVEL_COMPLETE, this.OnLeveComplete, this)
        this.alphabetContainerGrid = this.alphabetCointainerNode.getComponent(AlphabetGrid);
        this.gridScript = this.gridNode.getComponent(Grid);
        this.canvas = document.getElementById("GameCanvas");
        this.SpineResize();
        view.on("canvas-resize", this.SpineResize, this);
        //Playzhub event listener.
        PlayzhubEventHandler.AdStarted(this.OnGamePause.bind(this));
        // PlayzhubEventHandler.AdCompleted(this.OnGameResume.bind(this));
        PlayzhubEventHandler.GameStateFetch(this.UpdateGameState.bind(this));
        PlayzhubEventHandler.GameScoreFetch(this.UpdateGameScore.bind(this));
    }
    //#endregion

    //#region -Start
    start() {
        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "spell_bound_endless"
        );
        if (this.currentLevel === 0) {
            this.tutorialNode = instantiate(this.tutorialPrefab);
            this.tutorialNode.setParent(director.getScene().getChildByName("Canvas"));
            this.tutorialNode.setSiblingIndex(this.tutorialNode.parent.children.length - 2);
        } else {
            if (this.tutorialNode) this.tutorialNode.destroy();
            this.LoadJson(); // Initial Level start.
        }
        SoundManager.instance.CheckBackgroundMusicEnable();
        this.gameStartedTimeSatmp = Date.now();
    }
    //#endregion

    //#region -LoadJson
    /**
     * @description - Loading only required section of json from resource folder.
     */
    LoadJson() {
        this.SetLevel();

        resources.load("Level", (err: Error, assets: Asset) => {
            Constant.RAW_JSON_FILE = assets["json"];
            this.SetVariables();
            this.alphabetContainerGrid.SpawnLetterNode();
            this.gridScript.MakeGrid();
            this.time.StartTimer(this.timeToEnd);
            AnimationManager.LevelLoadGridAnimation(this.gridNode);
            AnimationManager.LevelLoadGridAnimation(this.alphabetCointainerNode.parent);
            this.uiManager.LevelIndicatorUpdate();
            this.initialTimer = Date.now();
        });
    };
    //#endregion

    //#region LoadNextLevel
    /**
     * @description - Loading next level after level completed.
     */
    LoadNextLevel(_isRetry?: boolean): void {
        this.ResetGridAndAlphabet();
        if (!_isRetry) this.SetLevel();
        this.SetVariables()
        this.alphabetContainerGrid.SpawnLetterNode();
        this.gridScript.MakeGrid();
        this.time.StartTimer(this.timeToEnd)
        AnimationManager.LevelLoadGridAnimation(this.gridNode);
        AnimationManager.LevelLoadGridAnimation(this.alphabetCointainerNode.parent);
        this.uiManager.LevelIndicatorUpdate();
        //ForPlatform
        this.initialTimer = Date.now();
        PlayzhubEventHandler.InterimBreak();
    }
    //#endregion

    OnClickTestButton(): void {
        this.LoadNextLevel();
    };

    //#region -SetVariables
    /**
     * @description - Setting important variables.
     */
    SetVariables(): void {
        Constant.LEVEL_JSON = Constant.RAW_JSON_FILE[`Level${this.currentLevel}`];
        this.wordsInGrid = Constant.LEVEL_JSON["words"];
        this.dictionaryWords = Constant.LEVEL_JSON["extra_words"]
        this.timeToEnd = Constant.LEVEL_JSON["time_to_end"];
        this.scoreManager.ResetLocalVariables();
        this.gameOver = false;
    };
    //#endregion

    //#region -EmptyVariables
    /**
     * @description - For reset important variables after level complete for load next level data.
     */
    EmptyVariables(): void {
        Constant.LEVEL_JSON = null;
        this.wordsInGrid = {};
        this.selectedWords = [];
    };
    //#endregion

    //#region -SetLevel
    /**
     * @description - Setting/Increament Level befor load json.
     */
    SetLevel(): void {
        if (this.currentLevel < Constant.MAX_LEVEL)
            this.currentLevel++;
    };
    //#endregion

    //#region -CheckMatch
    /**
     * @description - Checking selected word in Grid.
     * @param _wordForMatch - recieved selected word from alphabet grid.
     */
    CheckMatch(_wordForMatch: string): void {
        if (this.IsMatched(_wordForMatch)) {
            const wordProperty: Object = this.GetWordProperty(_wordForMatch);
            this.gridScript.MatchCellReveal(_wordForMatch, wordProperty, true);
            this.selectedWords = this.gridScript.PushRevealedWord();
            this.scoreManager.LotusPointIncreament(Constant.LOTUS_POINT_INCREAMENT);
            this.gameEvent.emit(GAME_EVENTS.UPDATE_UI_SCORE, this.scoreManager.basicScore);
            this.scheduleOnce(() => {
                this.gridScript.CheckLevelComplete();
            }, 0.5);

            //Sound
            SoundManager.instance.WordMatchSound();
        } else if (this.IsDictionaryWord(_wordForMatch)) {
            this.collectedDictionaryWords.push(_wordForMatch);
            this.uiManager.OnExtraWordsFound();
            //Sound
            SoundManager.instance.WordMatchSound();
        } else {
            //Sound
            SoundManager.instance.WordNotMatchedSound();
        }
    }
    //#endregion

    //#region -IsMatched
    /**
     * @description - For check word match.
     * @param _word - Selected word getting from Selection grid.
     * @returns 
     */
    IsMatched(_word: string): boolean {
        const checkIfAlreadyMatched = this.selectedWords.findIndex((_value: string, _index: number) => _value === _word);
        if (checkIfAlreadyMatched !== -1) return false;
        else return this.wordsInGrid.hasOwnProperty(_word);
    }
    //#endregion

    //#region -IsDictionaryWord
    /**
     * @description -Checking is dictionary words or not, after not matched in grid words.
     * @param _word 
     * @returns 
     */
    IsDictionaryWord(_word: string): boolean {
        const checkIfAlreadyMatched = this.collectedDictionaryWords.findIndex((_value: string, _index: number) => _value === _word);
        if (checkIfAlreadyMatched !== -1) return false;
        else return this.dictionaryWords.hasOwnProperty(_word);
    }
    //#endregion

    //#region -GetWordProperty
    /**
     * @description - Getiing json/property of matched word.
     * @param _word 
     * @returns 
     */
    GetWordProperty(_word: string): Object {
        return this.wordsInGrid[`${_word}`];
    }
    //#endregion

    //#region -ResetGridAndAlphabet
    /**
     * @description -Reset for next level start.
     */
    ResetGridAndAlphabet(): void {
        //Reset Grid and alphabet contaner.
        this.SetReavealHammerActive(true);
        this.gridScript.GridCellPool();
        this.alphabetContainerGrid.AlphabetPool();
        this.EmptyVariables();
    }
    //#endregion

    //#region -ShuffleAlphabets
    /**
     * @description - Shuffle perform.
     */
    ShuffleAlphabets(): void {
        this.alphabetContainerGrid.ShuffleAlphabetContainer();
    }
    //#endregion

    //#region HintWord
    /**
     * @description - Hint word in grid for given time.
     */
    async HintWord(): Promise<void> {
        const hintAction = () => {
            this.uiManager.hintButton.interactable = false;
            const wordForHintReveal: string[] = this.GetNewWordForHintReveal();
            let randomWordIndexForHint: number = 0;
            if (wordForHintReveal.length > 1) {
                randomWordIndexForHint = randomRangeInt(0, wordForHintReveal.length);
            }
            const wordProperty: Object = this.GetWordProperty(wordForHintReveal[randomWordIndexForHint]);
            this.gridScript.MatchCellReveal(wordForHintReveal[randomWordIndexForHint], wordProperty, false);

            //Sound
            SoundManager.instance.TimerSound();
        }
        if (this.scoreManager.UseHint()) {
            hintAction();
        } else {
            // console.log("no hint left");
            await this.ShowAd(hintAction);
        }
        this.gameEvent.emit(GAME_EVENTS.UPDATE_UI_SCORE, this.scoreManager.basicScore);
        const { hintValue, isFreeHint } = this.scoreManager.GetHintValueForUI();
        const { buzzitValue, isFreeBuzzit } = this.scoreManager.GetBuzzitValueForUI();
        this.uiManager.UpdateBoostersCost(hintValue, buzzitValue, isFreeHint, isFreeBuzzit);
    }
    //#endregion

    //#region BuzzitHint
    /**
     * @description - Reveal Hammer
     * @param _eventData 
     */
    async BuzzitHint(_eventData: EventTouch): Promise<void> {
        const isActiveCell: boolean = _eventData.currentTarget?.getComponent(GridCellDatabase).IsVisible();
        if (!this.GetReavealHammerActive() && isActiveCell) {

            // if (this.scoreManager.UseBuzzit()) {
            const touchedNode: Node = _eventData?.currentTarget;
            this.gridScript.ReavealGridCell(touchedNode)
            //Sound
            SoundManager.instance.WordReveal();
            this.scoreManager.UseBuzzit()

            // }
        } else {
            this.SetReavealHammerActive(true);
        }
        this.gameEvent.emit(GAME_EVENTS.UPDATE_UI_SCORE, this.scoreManager.basicScore);
        const { hintValue, isFreeHint } = this.scoreManager.GetHintValueForUI();
        const { buzzitValue, isFreeBuzzit } = this.scoreManager.GetBuzzitValueForUI();
        this.uiManager.UpdateBoostersCost(hintValue, buzzitValue, isFreeHint, isFreeBuzzit);
    }

    EnableOrDisableGridFocus(_isPlay: boolean): void {
        this.gridScript.FocusGridCell(_isPlay);
    }
    //#endregion

    //#region GetNewWordForHintReveal
    /**
     * @description - word as string data type for hint purpose.
     * @returns word as string data type
     */
    GetNewWordForHintReveal(): string[] {
        const allWords = Object.getOwnPropertyNames(this.wordsInGrid);
        let selectWordForHint: string[] = [];
        for (let i = 0; i < allWords.length; i++) {
            if (this.selectedWords.indexOf(allWords[i]) === -1) {
                selectWordForHint.push(allWords[i]);
            }
        }
        return selectWordForHint;
    }
    //#endregion

    //#region -Set|GetRevealHammerInteractive
    /**
     * @description - Reveal Hammer button active get and set.
     * @param _isActive 
     */
    SetReavealHammerActive(_isActive: boolean): void {
        this.uiManager.revealHammerButton.interactable = _isActive;
        this.uiManager.revealCancelButton.active = !_isActive;
        this.uiManager.MessageBroadcast(Constant.BUZZIT_SELECTED_TEXT, !_isActive);
        this.gridScript.FocusGridCell(!_isActive);
    }

    GetReavealHammerActive(): boolean {
        return this.uiManager.revealHammerButton.interactable;
    }

    IsAbleToUseHammer(): boolean {
        return this.scoreManager.basicScore >= this.scoreManager.buzzitCost || this.scoreManager.buzzit > 0;
    }
    //#endregion

    //#region -GetScore
    GetScore(): { flowerPoint: number, bonusPoint: number, timeBonusLocal: number, collectedBonus: boolean[] } {
        return { flowerPoint: this.scoreManager._localLotusPoint, bonusPoint: this.scoreManager._localBonusPoint, timeBonusLocal: this.scoreManager._localTimeBonus, collectedBonus: this.collectedBonus }
    }
    //#endregion

    //#region GetTotalScore
    GetTotalScore(): { lotusPoint: number, bonus: number, timeBonus: number, hint: number, buzzit: number, hintCost: number, buzzitCost: number, basicScore: number } {
        return { lotusPoint: this.scoreManager.lotusPoint, bonus: 0, timeBonus: this.scoreManager.timeBonus, hint: this.scoreManager.hint, buzzit: this.scoreManager.buzzit, hintCost: this.scoreManager.hintCost, buzzitCost: this.scoreManager.buzzitCost, basicScore: this.scoreManager.basicScore }
    }
    //#endregion

    //#region GetCurrentBoostersUpdate
    GetCurrentBoostersUpdate(): { hintValue: number, buzzitValue: number, isFreeHint: boolean, isFreeBuzzit: boolean } {
        const { hintValue, isFreeHint } = this.scoreManager.GetHintValueForUI();
        const { buzzitValue, isFreeBuzzit } = this.scoreManager.GetBuzzitValueForUI();
        return { hintValue, buzzitValue, isFreeHint, isFreeBuzzit };
    }
    //#endregion

    //#region OnLeveComplete
    /**
     * @description - Called every level when level complted.
     */
    OnLeveComplete(): void {
        this.time.StopTimer();
        this.scoreManager.TimeBonusIncreament(this.time.remainingTime);
        this.collectedBonus = this.GetBoosterOnLevelUp()

        this.gameEvent.emit(GAME_EVENTS.UPDATE_UI_SCORE, this.scoreManager.basicScore);
        this.scheduleOnce(() => {
            if (this.collectedBonus[0]) {
                AnimationManager.CollectAnimation(this.buzzitIcon, this.buzzitButton, this.buzzitCollectStartPos.getWorldPosition());
            }
            if (this.collectedBonus[1]) {
                AnimationManager.CollectAnimation(this.hintIcon, this.hintButton, this.hintCollectStartPos.getWorldPosition());
            }
            this.scheduleOnce(() => {
                this.UpdateBoosterOnUi();
            }, 1);
            SoundManager.instance.BoosterCollectionSound();
        }, 1.8);
        this.SetReavealHammerActive(true);
    }
    //#endregion

    //#region -UpdateBoosterOnUi
    UpdateBoosterOnUi(): void {
        const { hintValue, isFreeHint } = this.scoreManager.GetHintValueForUI();
        const { buzzitValue, isFreeBuzzit } = this.scoreManager.GetBuzzitValueForUI();
        this.uiManager.UpdateBoostersCost(hintValue, buzzitValue, isFreeHint, isFreeBuzzit);
    }
    //#endregion

    //#region -GetBoosterOnLevelUp
    GetBoosterOnLevelUp(): boolean[] {
        const value: number[][] = [[0, 1], [1, 0], [1, 1]];
        const boosterIncreament: number[] = value[randomRangeInt(0, value.length)];
        const hintIncreament = boosterIncreament[0];
        const buzzitIncreament = boosterIncreament[1];
        this.BoosterIncreament(buzzitIncreament, hintIncreament);
        return [buzzitIncreament > 0, hintIncreament > 0];
    }
    //#endregion

    //#region -BoosterIncreament
    BoosterIncreament(buzzitIncreament: number, hintIncreament: number): void {
        this.scoreManager.hint += hintIncreament;
        this.scoreManager.buzzit += buzzitIncreament;
    }
    //#endregion

    //#region SetGameDataFromServer
    /**
     * @description - Recive and set data from server.
     * @param _data 
     */
    SetGameDataFromServer(_level: number, _lotusPoint: number, _timeBonus: number, _bonus: number, _hint: number, _buzzit: number, _hintCost: number, _buzzitCost: number): void {
        this.scoreManager.SetInitialValue(_lotusPoint, _timeBonus, _bonus, _hint, _buzzit, _hintCost, _buzzitCost);
        this.currentLevel = _level;
        this.UpdateBoosterOnUi();
        this.gameEvent.emit(GAME_EVENTS.UPDATE_UI_SCORE, this.scoreManager.basicScore);
    }
    //#endregion

    //#region OnGamePause
    /**
     * @description - Specially called when ad started.
     */
    OnGamePause(): void {
        GA.GameAnalytics.addDesignEvent("ad:started");
        PlayzhubEventHandler.GamePlayPaused();
        this.isGamePaused = true;
        console.info("Game is Paused!");
        director.pause();
    }
    //#endregion

    //#region OnGameResume
    /**
     * @description -Specially called when ad ended.
     */
    OnGameResume(): void {
        GA.GameAnalytics.addDesignEvent("ad:completed");
        PlayzhubEventHandler.GamePlayResumed();
        this.isGamePaused = false;
        console.info("Game is Resumed!");
        director.resume();
    }
    //#endregion

    UpdateGameState(): void {
        console.log("GameStateUpdate");
        const { lotusPoint, bonus, timeBonus, hint, buzzit, hintCost, buzzitCost, basicScore } = this.GetTotalScore();
        const gameData = {
            "game_score": basicScore,
            "total_levels": Constant.MAX_LEVEL,
            "last_level_played": this.currentLevel,
            "game_collectibles": {
                "time_bonus": timeBonus,
                "bonus": bonus,
                "hint": hint,
                "buzzit": buzzit,
                "hint_cost": hintCost,
                "buzzit_cost": buzzitCost
            }
        }
        PlayzhubEventHandler.GameStateUpdate(gameData);
    }

    UpdateGameScore(): void {
        console.log("GameScoreFetch");
        const { basicScore } = this.GetTotalScore()
        let currTime = Date.now();
        const time = (currTime - this.initialTimer) / 1000;
        // this.initialTimer = Date.now();
        PlayzhubEventHandler.GameScoreUpdate(time.toFixed(0), basicScore.toString());
    }

    async ShowAd(onCompleteAdsCallback?: () => void) {
        const adManager = AdManager.getInstance();

        try {
            GA.GameAnalytics.addDesignEvent('ad:requested');
            if (onCompleteAdsCallback) {
                await adManager.RequestAdAsync(1000, onCompleteAdsCallback);
            } else {
                await adManager.RequestAdAsync();
            }
            this.OnGameResume();
        } catch (e) {
            console.error("Ad error:", e);
        }
    }

    //#region SpineResize
    SpineResize(): void {
        if (!this.bgSpine) return;

        const scaleRatio = view.getVisibleSize().width / 1920;
        this.bgSpine.setScale(scaleRatio, 1, 1);
    }
    //#endregion

    //#region -onDisable
    protected onDisable(): void {
        this.gameEvent.off(GAME_EVENTS.LEVEL_COMPLETE);
        this.gameEvent.off(GAME_EVENTS.UPDATE_UI_SCORE);
        this.gameEvent.off(GAME_EVENTS.TIME_END)
        this.gameEvent.off(GAME_EVENTS.TIMER_PAUSE);
        this.gameEvent.off(GAME_EVENTS.TIMER_RESUME);
        view.off("canvas-resize", this.SpineResize, this);
        GameManager.instance = null;
    }
    //#endregion
}