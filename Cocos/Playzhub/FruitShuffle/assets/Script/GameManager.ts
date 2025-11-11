import { _decorator, Animation, Component, director, EventTarget, Node, Prefab, Vec3 } from 'cc';
import { LevelConfig } from './LevelConfig';
import { SlotBoard } from './SlotBoard';
import { ElementDatabase } from './ElementDatabase';
import { ElementBoard } from './ElementBoard';
import { UIManager } from './UIManager';
import { ScoreManager } from './ScoreManager';
import { Server } from './Server';
import { SoundManager } from './SoundManager';
import { PlayzhubEventHandler } from './PlayzhubEventHandler';
import { AdManager } from './AdManager';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    //#region -Fields
    // Game Manager
    public static instance: GameManager | null = null;
    gameEvent = new EventTarget();

    //Levels
    @property(Node) levelContainer: Node | null = null;
    @property(Node) levelParent: Node = null;
    levelConfig: Object | null;
    levelData: Object | null;
    currentLevel: number | null = -1;
    maxLevel: number = 100;
    tutorialStepsCounter: number = 0;

    //MatchBoard
    @property(Node) slotBoardNode: Node | null = null;
    currentIndexForCheckMatch: number | null = null;
    elementIds: string[] = [];
    isReadyToClick: boolean = true;

    //Scripts
    slotBoard: SlotBoard | null = null;
    elementBoard: ElementBoard | null = null;
    uiManager: UIManager;
    scoreManager: ScoreManager;

    //Other Nodes and Prefabs
    @property(Prefab) iconPrefab: Prefab = null;
    @property(Node) iconPoolParent: Node = null;
    @property(Node) uiManagerNode: Node = null;
    @property(Node) scoreManagerNode: Node = null;

    private continuousMatchCounter: number = 0;
    private diamondIncreamentThreshold: number = 2;
    private diamondIncreamentInMatch: number = 1;

    timerValue: number = null;
    gameID: string = null;
    canvas = null;
    //#endregion

    //#region -OnEnable
    protected onEnable(): void {
        //Global instance
        if (GameManager.instance == null) {
            GameManager.instance = this;
        }
        // Events
        this.gameEvent.on("update_slot", this.ResetSlotSprite, this);

        // Get and Set Variables
        this.levelConfig = this.node.getComponent(LevelConfig).LevelData;
        this.slotBoard = this.slotBoardNode.getComponent(SlotBoard);
        this.elementBoard = this.levelContainer.getComponent(ElementBoard);
        this.uiManager = this.uiManagerNode.getComponent(UIManager);
        this.scoreManager = this.scoreManagerNode.getComponent(ScoreManager);
        this.canvas = document.getElementById("GameCanvas");

        //server
        try {
            this.timerValue = Server.GetTimerValue();
            this.gameID = Server.gameID;
        } catch (error) {

        } finally {
            this.timerValue ? this.timerValue = this.timerValue : this.timerValue = 180;
            this.gameID = Server.gameID;
        }
    }
    //#endregion

    //#region -start
    protected start(): void {

        SoundManager.instance.CheckBackgroundMusicEnable();
        // Initial Level and Board Setup
        setTimeout(() => {
            this.SetLevel();
            this.SetBoard();
        }, 1000);
        this.uiManager.SetShuffleValueText(this.GetCurrentShuffleValue());
        this.uiManager.SetCoinText(this.GetNumberOfCoinLeft());
        this.uiManager.SetUndoValueText(this.scoreManager.GetCurrentUndoCost());
        this.uiManager.SetDiamondText(this.GetNumberOfDiamondLeft());

        PlayzhubEventHandler.GameStateFetch(this.PostGameState.bind(this));
        PlayzhubEventHandler.GameScoreFetch((data: any) => {
            let currTime = Date.now();
            const time = (currTime - this.uiManager.initialTimer) / 1000;
            PlayzhubEventHandler.GameScoreUpdate(time.toFixed(0), this.GetNumberOfCoinLeft().toString());
        })
        PlayzhubEventHandler.AdStarted(this.OnGamePause.bind(this));
        // PlayzhubEventHandler.AdCompleted(this.OnGameResume.bind(this));

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "fruit_shuffle_endless"
        );
    }
    //#endregion

    //#region SetCurrentLevel
    SetCurrentLevel(_level: number): void {
        this.currentLevel = _level;
        // console.log("currentLevel", _level);
    }
    //#endregion

    //#region -SetBoard
    SetBoard(): void {
        // Logics
        this.elementBoard.DestroyBoardElement();
        const iconsArray: Object = this.SetLevelData(this.levelData["totalNumberOfElements"]);
        this.elementBoard.MakeBoard(this.levelParent, this.iconPrefab, this.levelData, iconsArray);
        this.uiManager.initialTimer = Date.now();
        //Animations
        this.levelParent.getComponent(Animation).play("LevelStartAnim");
        //Sounds
        SoundManager.instance.SlidingSoundEffect();
    }
    //#endregion

    //#region -SetLevel
    SetLevel(): void {
        this.elementIds = [];
        this.currentLevel < this.maxLevel ? this.currentLevel++ : this.currentLevel = this.maxLevel;
        this.levelData = this.levelConfig["Level" + this.currentLevel];
        this.uiManager.SetLevelIndicator(this.currentLevel);
        // this.slotBoard.slotArray = [];
        this.slotBoard.dummySlotArray = [];
        this.slotBoard.dummySlotArray.push(0);
        this.currentIndexForCheckMatch
        this.slotBoard.ResetSpritesAndValueOfSlots();
        this.isReadyToClick = true

        if (this.currentLevel > 0)
            this.gameEvent.emit("start_timer");
    }
    //#endregion

    //#region -Level Data Setip
    SetLevelData(_totalNumberOfIcons: number): Object {
        if (_totalNumberOfIcons < 3) return;

        const keys = this.GetKeys();
        const newObject = this.InitialObject(keys);
        const { baseAllocation, remainingElements } = this.GetBaseValue(_totalNumberOfIcons, keys.length);

        this.SetBaseValue(newObject, keys, baseAllocation);
        this.SetValueOfKeys(newObject, keys, remainingElements);

        return newObject;
    }

    GetKeys(): string[] {
        return [
            "numberOfAnarIcon",
            "numberOfAvacadoIcon",
            "numberOfAppleIcon",
            "numberOfBeetIcon",
            "numberOfKiwiIcon",
            "numberOfLichiIcon",
            "numberOfMangoIcon",
            "numberOfNimbuIcon",
            "numberOfWaterMelonIcon"
        ];
    }

    InitialObject(keys: string[]): Object {
        return keys.reduce((acc, key) => {
            acc[key] = 0;
            return acc;
        }, {});
    }

    GetBaseValue(totalElements: number, numberOfKeys: number): { baseAllocation: number; remainingElements: number } {
        const baseAllocation = Math.floor(totalElements / (3 * numberOfKeys)) * 3;
        const remainingElements = totalElements - baseAllocation * numberOfKeys;
        return { baseAllocation, remainingElements };
    }

    SetBaseValue(newObject: Object, keys: string[], baseAllocation: number): void {
        keys.forEach((key) => {
            newObject[key] = baseAllocation;
        });
    }

    SetValueOfKeys(newObject: Object, keys: string[], remainingElements: number): void {
        for (let i = 0; remainingElements >= 3 && i < keys.length; i++) {
            newObject[keys[i]] += 3;
            remainingElements -= 3;
        }
    }
    //#endregion

    //#region - Load Level/Tutorials
    LoadNextLevel(): void {
        PlayzhubEventHandler.InterimBreak();
        this.SetLevel();
        this.SetBoard();
    }

    LoadPreviousLevel(): void {
        this.elementIds = [];
        this.currentLevel > 1 ? this.currentLevel-- : this.currentLevel = 0;
        this.levelData = this.levelConfig["Level" + this.currentLevel];
        this.uiManager.SetLevelIndicator(this.currentLevel);

        this.SetBoard();
        // console.log("level", this.currentLevel);
    }

    CallTutorialNextStep(): void {
        this.uiManager.OnInvisbleTutorialButtonClick();
    }
    //#endregion

    //#region -CheckLevelComplete
    CheckLevelComplete(): void {
        let checkLevelComplete: boolean = true;
        this.levelParent.children.forEach((_cell: Node, _index: number) => {
            if (_cell.children.length > 0) {
                _cell.children.forEach((_icon: Node, _index: number) => {
                    if (_icon.getComponent(ElementDatabase).GetSprite()) {
                        checkLevelComplete = false;
                    }
                })
            }
        })
        if (checkLevelComplete) {
            this.scoreManager.CoinIncrement(10, () => {
                this.uiManager.SetCoinText(this.GetNumberOfCoinLeft());
                this.scoreManager.DiamondIncrement(1, () => {
                    this.uiManager.SetDiamondText(this.GetNumberOfDiamondLeft());
                });
            });
            this.gameEvent.emit("levelComplete", this.currentLevel);
        }
    }
    //#endregion

    //#region -Match & Reset
    SetCurrentIndexForMatch(_value: number): void {
        this.currentIndexForCheckMatch = _value;
    }

    ResetSlotSprite(): void {
        this.slotBoard.ResetSpritesAndValueOfSlots();
        const currentIndex: number = this.currentIndexForCheckMatch;
        if (this.slotBoard.IsMatch(currentIndex)) {
            this.slotBoard.CheckMatch(currentIndex);
            this.elementBoard.ClearUndoMatchArray(currentIndex);
            this.continuousMatchCounter++;
            SoundManager.instance.MatchSoundEffect();
            setTimeout(() => { this.isReadyToClick = true; this.CheckLevelComplete(); this.DiamondReward() }, 500);
        } else {
            this.continuousMatchCounter = 0;
            this.diamondIncreamentInMatch = 1;
            this.isReadyToClick = true;
            this.StackIsFull();
        }
    }

    DiamondReward(): void {
        if (this.continuousMatchCounter >= this.diamondIncreamentThreshold) {
            this.scoreManager.DiamondIncrement(this.diamondIncreamentInMatch, () => {
                this.diamondIncreamentInMatch++;
                this.uiManager.SetDiamondText(this.GetNumberOfDiamondLeft());
            });
        }
    }

    StackIsFull(): void {
        if (this.slotBoard.IsStackFull()) {
            this.isReadyToClick = false;
            this.elementIds = [];
            this.gameEvent.emit("stackFull");
        }
    }
    //#endregion

    //#region -Undo Logics
    async UndoMove(): Promise<void> {
        const currentDiamondValue: number = this.scoreManager.GetCurrentUndoCost();

        const undoAction = () => {
            let indexOfUndo: number = this.elementBoard.UndoMove(this.elementIds[this.elementIds.length - 1]);
            this.slotBoard.RemoveIcon(indexOfUndo);

            if (this.currentLevel === 0)
                this.CallTutorialNextStep();

            this.ScoreManagerAndUISetupForUndo(currentDiamondValue);
        }

        if (this.isReadyToClick && this.IsReadyForUndo() && this.GetNumberOfDiamondLeft() >= currentDiamondValue) {
            undoAction();
        } else {
            await this.ShowAd(undoAction);
        }
    }

    ScoreManagerAndUISetupForUndo(_currentDiamondValue: number): void {
        this.scoreManager.DiamondDecrement(_currentDiamondValue);
        this.scoreManager.UndoCostIncreament();
        this.uiManager.SetUndoValueText(this.scoreManager.GetCurrentUndoCost());
        this.uiManager.SetDiamondText(this.GetNumberOfDiamondLeft());
    }

    IsReadyForUndo(): boolean {
        return this.elementBoard.GetPlacedIconArrayLength() >= 1;
    }

    //#endregion

    //#region -Shuffle Logics
    async ShuffleBoard(): Promise<void> {
        const currentShuffleValue: number = this.scoreManager.GetCurrentShuffleCost();

        const shuffleAction = () => {
            this.levelParent.getComponent(Animation).play("BoardShuffleAnim");
            this.elementBoard.ShuffleGridIcons(this.levelParent);

            this.scoreManager.CoinDecrement(currentShuffleValue);
            this.scoreManager.CurrentShuffleCostIncreament();
            this.uiManager.SetShuffleValueText(this.GetCurrentShuffleValue());
            this.uiManager.SetCoinText(this.GetNumberOfCoinLeft());
        }

        if (this.isReadyToClick && this.scoreManager.GetCoin() >= currentShuffleValue) {
            shuffleAction();
        } else {
            await this.ShowAd(shuffleAction);
        }
    }
    //#endregion

    //#region -GiveLife
    GiveLife(): void {
        if (this.GetNumberOfLife() > 0) {
            this.scoreManager.CoinDecrement(10);
            this.uiManager.SetCoinText(this.GetNumberOfCoinLeft());
            for (let i: number = 0; i < 3; i++) {
                let indexOfUndo: number = this.elementBoard.UndoMove(this.elementIds[this.elementIds.length - 1]);
                this.slotBoard.RemoveIcon(indexOfUndo);
            }
        }
    }
    //#endregion

    //#region - GetNumberOfLife
    GetNumberOfLife(): number {
        return this.scoreManager.GetLife();
    }
    //#endregion

    //#region - Get & Set Undo
    GetNumberOfDiamondLeft(): number {
        return this.scoreManager.GetDiamond();
    }
    SetNumberOfUndoLeft(_undoValue: number): void {
        this.scoreManager.SetDiamond(_undoValue);
    }
    SetCurrentUndoCost(_value: number): void {
        this.scoreManager.SetCurrentUndoCost(_value);
    }
    GetUndoCurrentValue(): number {
        return this.scoreManager.GetCurrentUndoCost();
    }
    //#endregion

    //#region -Get & Set Shuffle
    GetNumberOfCoinLeft(): number {
        return this.scoreManager.GetCoin();
    }

    SetCoin(_coin: number): void {
        this.scoreManager.SetCoin(_coin);
    }

    SetCurrentShuffleCost(_value: number): void {
        this.scoreManager.SetCurrentShuffleCost(_value);
    }

    GetCurrentShuffleValue(): number {
        return this.scoreManager.GetCurrentShuffleCost();
    }
    //#endregion

    //#region OnGamePause
    OnGamePause(): void {
        GA.GameAnalytics.addDesignEvent("ad:started");
        PlayzhubEventHandler.GamePlayPaused();
        console.info('on ad started, game is paused!');
        director.pause();
    }
    //#endregion

    //#region -OnGameResume
    OnGameResume(): void {
        GA.GameAnalytics.addDesignEvent("ad:completed");
        PlayzhubEventHandler.GamePlayResumed();
        console.info('on ad completed, game is resumed!');
        director.resume();
    }
    //#endregion

    async ShowAd(onCompleteCallback?: () => void) {
        const adManager = AdManager.getInstance();
        try {
            GA.GameAnalytics.addDesignEvent('ad:requested');
            if (onCompleteCallback) {
                await adManager.RequestAdAsync(1000, onCompleteCallback);
            } else {
                await adManager.RequestAdAsync();
            }

            this.OnGameResume();
        } catch (e) {
            console.error("Ad error:", e);
        }
    }

    //#region -PostGameState
    PostGameState(): void {
        const gameData = {
            "game_score": this.GetNumberOfCoinLeft(),
            "total_levels": this.maxLevel,
            "last_level_played": this.currentLevel,
            "game_collectibles": {
                "gems": this.GetNumberOfDiamondLeft(),
                "shuffle_price": this.GetCurrentShuffleValue(),
                "step_back_price": this.GetUndoCurrentValue()
            }
        }
        PlayzhubEventHandler.GameStateUpdate(gameData);
    }
    //#endregion

    //#region -ResetLocalStorage
    ResetGameState(): void {
        this.PostGameState();

        setTimeout(() => {
            const gameData = null;
            PlayzhubEventHandler.GameStateUpdate(gameData);
        }, 20);
    }
    //#endregion

    //#region -onDisable
    protected onDisable(): void {
        GameManager.instance = null;
        this.gameEvent.off("update_slot", this.ResetSlotSprite, this);
    }
    //#endregion
}