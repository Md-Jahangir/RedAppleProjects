/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 30-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 30-08-2024
 * @Description :- Game Manager.
 ************************************/
import { _decorator, Asset, Component, director, EventTarget, instantiate, Label, Node, Prefab, resources, screen, tween, Vec3 } from 'cc';
import { StrikerScript } from './StrikerScript';
import { COIN_TYPE, Constant, GAME_EVENTS, GAME_MODE } from './Constant';
import { CarromenDatabase } from './Database/CarromenDatabase';
import { ScoreManager } from './ScoreManager';
import { UIManager } from './UIManager';
import { BoardScript } from './BoardScript';
import { PocketHandler } from './PocketHandler';
import { PawnsHandler } from './PawnsHandler';
import { PlayzhubEventHandler } from './playzhub/PlayzhubEventHandler';
import { AIStriker } from './AIStriker';
import { AnimationManager } from './utils/AnimationManger';
import { ScoreMultiplayer } from './multiplayer/ScoreMultiplayer';
import { UIMultiplayer } from './multiplayer/UIMultiplayer';
import { SoundManager } from './SoundManager';
import { AssetLoader } from './utils/AssetLoader';
import { AdManager } from './utils/AdManager';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    //#region - Fields
    public static instance: GameManager = null;
    public gameEvent = new EventTarget();

    // Game objects
    @property(Node) playerStriker: Node = null!;
    @property(Node) enemyStriker: Node = null!;
    @property(Node) scoreManagerNode: Node = null!;
    @property(Node) uiManagerNode: Node = null!;
    @property(Node) boardParent: Node = null!;
    @property(Node) pawnParent: Node = null!;
    @property(Node) pocketParent: Node = null!;

    playerStrikerScript: StrikerScript;
    scoreManager: ScoreManager | ScoreMultiplayer;
    uiManager: UIManager | UIMultiplayer;
    boardScript: BoardScript;
    pawnScript: PawnsHandler;
    pocketScript: PocketHandler;

    tutorialsNode: Node = null;

    currentLevel = 0;
    isGameOver = false;
    isGamePause = false;
    isSinglePlayer = true;
    isTimeBasedType = false;
    minStarForPassCurrentLevel = 1;
    old_currentLevelStar = 0;
    playerTurn = true;
    aiTurn = false;
    turnChange = false;
    playerTurnSkipCounter: number = 0;
    playerChoosedCoinColor: COIN_TYPE = COIN_TYPE.WHITE;
    isQueenPocket = false;
    isQueenCovered = false;
    gameStartedTimeSatmp = null;
    initialTimer = null;
    LevelsJson: any = null;
    gameMode = GAME_MODE.VERSUS;

    @property(Node) broadcaster: Node = null!;
    //#endregion

    //#region -OnEnable
    /**
     * @description :Inbuilt Cocos Component onLoad function.
     */
    protected onLoad(): void {
        screen.on("orientation-change", () => {
            this.OnOrientationChange();
        });
        this.gameEvent.on("game_over", this.GameOver, this);
        this.gameEvent.on("level_complete", this.GameWin, this);
        this.gameEvent.on(GAME_EVENTS.TURN_CHANGE, this.CheckTurn, this);
        // Constant.gameEvents.on("queen_pocket_failed", this.QueenPocketFailed, this);
    };
    //#endregion

    //#region -onEnable
    /**
     * @description - Inbuilt Cocos Component onEnable function.
     */
    protected onEnable(): void {
        if (GameManager.instance === null) {
            GameManager.instance = this;
        }
        this.playerChoosedCoinColor = COIN_TYPE.WHITE;
        SoundManager.instance.PlayBGMusic();
    };
    //#endregion

    //#region Start
    /**
     * @description :Inbuilt Cocos Component start function.
     */
    async start() {
        await this.GettingReferences();
        if (this.currentLevel === 0 && this.gameMode === GAME_MODE.CHALLENGER) {
            const tutorialPrefab: Prefab = await AssetLoader.LoadAsset('prefabs', 'Tutorials', Prefab);
            this.tutorialsNode = instantiate(tutorialPrefab);
            this.tutorialsNode.setParent(director.getScene().getChildByName("Canvas"));
            // this.tutorialsNode.setSiblingIndex(this.tutorialNode.parent.children.length - 2);
        } else {
            if (this.tutorialsNode) this.tutorialsNode.destroy();
        }
        this.LoadJson();
        this.gameStartedTimeSatmp = Date.now();

        PlayzhubEventHandler.AdStarted(this.OnGamePause.bind(this));
        // PlayzhubEventHandler.AdCompleted(this.OnGameResume.bind(this));
        PlayzhubEventHandler.GameStateFetch(this.UpdateGameState.bind(this));
        PlayzhubEventHandler.GameScoreFetch(this.UpdateGameScore.bind(this));

        this.CheckTurn();

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "carrom_level"
        );
    };
    //#endregion

    async GettingReferences(): Promise<void> {
        if (this.gameMode === GAME_MODE.CHALLENGER) {
            this.scoreManager = this.scoreManagerNode.getComponent(ScoreManager);
            this.uiManager = this.uiManagerNode.getComponent(UIManager);
            this.pocketScript = this.pocketParent.getComponent(PocketHandler);
        } else {
            this.uiManager = this.uiManagerNode.getComponent(UIMultiplayer);
            this.scoreManager = this.scoreManagerNode.getComponent(ScoreMultiplayer);
        }
        this.pawnScript = this.pawnParent.getComponent(PawnsHandler);
        this.playerStrikerScript = this.playerStriker.getComponent(StrikerScript);
        this.boardScript = this.boardParent.getComponent(BoardScript);
    }

    //#region -OnOrientationChange
    /**
     * @description :This method is called when the screen orientation is change.
     */
    OnOrientationChange(): void {
        // console.log("orientation");
        // this.gameEvent.emit("orientation_changed");
    };
    //#endregion

    //#region LoadJson
    LoadJson(): void {
        if (this.gameMode === GAME_MODE.CHALLENGER) {
            resources.load("Level", async (er: Error | null, _data: Asset) => {
                Constant.RawLevelsJson = await _data["json"];
                this.SetLevel();
                this.SetVariablesAndUI();
                this.BoardSetup();

                this.boardScript.ResetPocketedState();
            });
        } else {
            this.playerStrikerScript.GetBoardBaseLine();
            if (this.scoreManager instanceof ScoreMultiplayer) {
                this.scoreManager.SetPlayerCoinType(this.playerChoosedCoinColor);
            }
            if (this.uiManager instanceof UIMultiplayer) {
                this.uiManager.initProfile();
                // this.uiManager.SetTurnIndicator(this.playerTurn);
            }
        };
        this.initialTimer = Date.now();
    };
    //#endregion

    StartSettingPawns(): void {
        this.pawnScript.AddInputEvent();
    }

    StartVsMode(): void {
        if (this.uiManager instanceof UIMultiplayer)
            this.uiManager.StartGame();
    }

    //#region LoadNextLevel
    async LoadNextLevel(_isRetry?: boolean): Promise<void> {
        this.boardScript.RemoveBoard();//remove board
        this.pocketScript.RemovePocket();//remove pocket
        this.pawnScript.RemovePawns();//remove coins
        this.boardScript.ResetPocketedState();
        //Create new board setup and levels.
        if (!_isRetry) this.SetLevel();

        this.SetVariablesAndUI();
        this.BoardSetup();

        this.initialTimer = Date.now();
        PlayzhubEventHandler.InterimBreak();
    };
    //#endregion

    //#region SetVariablesAndUI
    /**
     * @description Update or Set variables and UI things.
     */
    SetVariablesAndUI(): void {
        this.playerStrikerScript.isFirstTimeHitCompleted = false;
        this.isGameOver = false;

        this.LevelsJson = Constant.RawLevelsJson[`Level${this.currentLevel}`];
        const levelType: Object = this.LevelsJson["level_based_type"];
        this.isTimeBasedType = levelType["type"] === "time";
        this.minStarForPassCurrentLevel = this.LevelsJson["min_star_required"];

        if (this.gameMode === GAME_MODE.CHALLENGER) {
            if (this.scoreManager instanceof ScoreManager)
                this.scoreManager.SetScoreBarMode(this.isTimeBasedType, levelType["pawnsQty"]);

            if (this.uiManager instanceof UIManager)
                this.uiManager.SetLevelTypeText(this.isTimeBasedType);
        }

        if (this.currentLevel != 1)
            this.TimerLevelStartAnimation();
    };
    //#endregion

    //#region SetLevel
    SetLevel(): void {
        if (this.currentLevel < Constant.MAX_LEVEL && this.gameMode === GAME_MODE.CHALLENGER)
            this.currentLevel++;
        else {
            this.currentLevel = 1;
        }
    };
    //#endregion

    //#region BoardSetup
    async BoardSetup(): Promise<void> {
        //Board
        await this.CreateBoard();
        //Pocket.
        await this.pocketScript.CreatePocket(this.LevelsJson["pocket_positions"]);
        //Pawns
        await this.pawnScript.CreatePawns(this.LevelsJson["pawns_positions_black"], this.LevelsJson["pawns_positions_white"], this.LevelsJson["pawns_positions_queen"], this.LevelsJson["pawns_positions_penalty"]);
    };
    //#endregion

    //#region CreateBoard
    async CreateBoard(): Promise<void> {
        await this.boardScript.CreateBoard(this.LevelsJson["board_type"]);
        await this.playerStrikerScript.GetBoardBaseLine();
    };
    //#endregion

    //#region GetAIChoosedColor
    /**
     * @description - For Choose coin for hit by AI.
     * @returns 
     */
    GetAIChoosedColor(): string {
        if (this.playerChoosedCoinColor === COIN_TYPE.WHITE) {
            return COIN_TYPE.BLACK;
        } else {
            return COIN_TYPE.WHITE;
        }
    };
    //#endregion

    //#region PlayFocusAnimationCarrommen
    PlayFocusAnimationCarrommen(): void {
        if (this.playerTurn) {
            this.playerStrikerScript?.PlayFocus();
        }
    };
    //#endregion

    //#region TimerLevelStartAnimation
    TimerLevelStartAnimation(): void {
        if (this.scoreManager instanceof ScoreManager) this.scoreManager.TimerLevelStartAnimation();
    };
    //#endregion

    //#region -RecoverCarrommen
    /**
     * @description - Recovers a specific type of carrom coin if it is not covered.
     * @param type - The type of carrom coin to recover ('Queen' | 'White' | 'Black')
     */
    RecoverCarrommen(type?: COIN_TYPE): void {
        if (type === undefined || this.gameMode !== GAME_MODE.VERSUS) {
            for (const _coin of this.pawnParent.children) {
                if (!_coin.active) {
                    const coinDatabase = _coin.getComponent(CarromenDatabase);
                    coinDatabase.SetToDefaultPosition();
                    coinDatabase.SetPocket(false);
                    coinDatabase.StopMovement();
                    break;
                }
            };
        } else {
            let isRecovered = type === COIN_TYPE.QUEEN;

            this.pawnParent.children.some((_coin: Node) => {
                const coinDatabase = _coin.getComponent(CarromenDatabase);
                if (!_coin.active && (
                    (type === COIN_TYPE.QUEEN && coinDatabase.IsQueen()) ||
                    (type === COIN_TYPE.WHITE && coinDatabase.IsWhite() && !isRecovered) ||
                    (type === COIN_TYPE.BLACK && coinDatabase.IsBlack() && !isRecovered)
                )) {
                    coinDatabase.SetToDefaultPosition();
                    coinDatabase.SetPocket(false);
                    coinDatabase.StopMovement();
                    if (type === COIN_TYPE.WHITE || type === COIN_TYPE.BLACK) {
                        isRecovered = true;
                    };
                };
            });
            this.UpdateScore(type, true);
        };
        this.isQueenPocket = false;
    };
    ResetPocketedState(): void {
        this.boardScript.ResetPocketedState();
    }
    //#endregion

    //#region GameWin
    async GameWin(_person: string): Promise<void> {
        if (this.gameMode !== GAME_MODE.CHALLENGER) return;



        if (this.scoreManager instanceof ScoreManager) {
            this.scoreManager.StopTimer();
            this.scoreManager.SaveGameDataToPlatform(this.currentLevel);
        }
        if (this.uiManager instanceof UIManager) {
            this.uiManager.LevelCompletePopup();
            this.pocketScript.CloseMagneticBooster(0);
        }
    };
    //#endregion

    //#region GameOver
    GameOver(): void {
        if (this.gameMode !== GAME_MODE.CHALLENGER) return;
        if (this.scoreManager instanceof ScoreManager) this.scoreManager.StopTimer();

        this.isGameOver = true;

        if (this.uiManager instanceof UIManager)
            this.uiManager.GameOverPopup();
    };
    //#endregion

    //#region TimerRelated
    OnStartHit(_isFirstTimeHitCompleted: boolean): void {
        if (this.gameMode !== GAME_MODE.CHALLENGER) return;

        if (!_isFirstTimeHitCompleted && this.isTimeBasedType && this.scoreManager instanceof ScoreManager) this.scoreManager.StarTimer();
    };

    PauseTimer(): void {
        if (this.gameMode === GAME_MODE.VERSUS) {
            if (this.uiManager instanceof UIMultiplayer) {
                this.uiManager.PauseTimer();
            }
        }

        if (!this.isTimeBasedType || this.gameMode !== GAME_MODE.CHALLENGER) return;

        if (this.scoreManager instanceof ScoreManager) this.scoreManager.PauseTimer();

    };

    ResumeTimer(_isRestart?: boolean): void {
        if (this.gameMode === GAME_MODE.VERSUS) {
            if (this.uiManager instanceof UIMultiplayer) {
                _isRestart ? this.uiManager.StartTimer() : this.uiManager.PauseTimer();
            }
        }
        if (!this.isTimeBasedType || this.gameMode !== GAME_MODE.CHALLENGER) return;

        if (this.scoreManager instanceof ScoreManager) this.scoreManager?.ResumeTimer();
    };
    //#endregion

    //#region MoveRelated
    MovePlayed(): void {
        if (this.isTimeBasedType || this.gameMode !== GAME_MODE.CHALLENGER) return;

        if (this.scoreManager instanceof ScoreManager) this.scoreManager.DecreaseTurnCount();
    };
    //#endregion

    StarsAchieved(): number {
        if (this.scoreManager instanceof ScoreManager)
            return this.scoreManager.StarsAchieved();

        if (this.scoreManager instanceof ScoreMultiplayer) return this.scoreManager.GetPlayerScore();
    };

    //#region -PlayAI
    /**
     * @description - Play AI turn by calling these.
     */
    PlayAI(): void {
        this.enemyStriker.getComponent(AIStriker).PlayAIFunction();
    }
    //#endregion
    //#region -CheckTurn
    /**
     * @description - Checking turn and eneble or disable striker according to turn.
     */
    CheckTurn(): void {
        if (this.gameMode !== GAME_MODE.VERSUS) return;

        if (this.playerTurn) {
            this.playerStriker.active = true;
            this.enemyStriker.active = false;
            AnimationManager.PocketAnimation(this.playerStriker, false);
        } else {
            this.enemyStriker.active = true;
            this.playerStriker.active = false;
            this.PlayAI();
        }

        if (this.isQueenPocket && !this.isQueenCovered) this.RecoverCarrommen(COIN_TYPE.QUEEN);

        if (this.uiManager instanceof UIMultiplayer) {
            this.uiManager.SetTurnIndicator(this.playerTurn);
            this.uiManager.StartTimer();
        }

        this.ResetPocketedState();
        this.CheckWins();
    }
    //#endregion

    //#region -UpdateScore
    UpdateScore(_coinType: COIN_TYPE, _isFoul?: boolean): void {
        let playerScore: number = 0;
        let opponentScore: number = 0;

        if (this.scoreManager instanceof ScoreMultiplayer) {
            _isFoul ? this.scoreManager.Foul(_coinType) : this.scoreManager.UpdateScore(this.playerTurn, _coinType);
            playerScore = this.scoreManager.playerScore;
            opponentScore = this.scoreManager.botScore;
        }
        if (this.uiManager instanceof UIMultiplayer) {
            this.uiManager.UpdatePlayerScoreUI(playerScore, opponentScore);
        }
    };
    //#endregion

    //#region GetPlayerCoinsQuantity
    GetPlayerCoinsQuantity(_isPlayer: boolean): void {
        if (this.gameMode !== GAME_MODE.VERSUS) return;

        const coinToBeFind: COIN_TYPE = _isPlayer
            ? this.playerChoosedCoinColor
            : (this.playerChoosedCoinColor === COIN_TYPE.WHITE ? COIN_TYPE.BLACK : COIN_TYPE.WHITE);

        const coinsQuantity: number = this.PawnQuantityCounter(coinToBeFind);

        if (coinsQuantity === 0) {
            if (!this.isQueenCovered) {
                // Queen not covered yet, recover carrommen
                this.RecoverCarrommen(coinToBeFind);
                this.boardScript.ResetPocketedState();
                console.log("You need to pocket/cover queen first.");
                this.BroadCast(Constant.QueenCoverWarning);
                return;
            }

            if (this.isQueenPocket && this.isQueenCovered) {
                this.DeclareWinner(_isPlayer);
            }
        }
    }

    DeclareWinner(_isPlayer: boolean): void {
        if (this.uiManager instanceof UIMultiplayer) {
            if (_isPlayer) {
                // console.log("Player wins");
                this.uiManager.OnGameWinPopup();
                if (this.scoreManager instanceof ScoreMultiplayer) {
                    Constant.totalPlayerStar += this.scoreManager.playerScore;
                }
            } else {
                // console.log("Enemy wins");
                this.uiManager.OnGameLoosePopup();
            }
        }

        this.playerStriker.active = false;
        this.enemyStriker.active = false;
    }

    CheckWins(): void {
        if (this.gameMode !== GAME_MODE.VERSUS) return;

        const whiteQty = this.PawnQuantityCounter(COIN_TYPE.WHITE);
        const blackQty = this.PawnQuantityCounter(COIN_TYPE.BLACK);

        if (whiteQty !== 0 && blackQty !== 0) return;

        const isPlayerWin =
            (whiteQty === 0 && this.playerChoosedCoinColor === COIN_TYPE.WHITE) ||
            (blackQty === 0 && this.playerChoosedCoinColor === COIN_TYPE.BLACK);

        if (this.uiManager instanceof UIMultiplayer) {
            if (isPlayerWin) {
                this.uiManager.OnGameWinPopup();
                if (this.scoreManager instanceof ScoreMultiplayer) {
                    Constant.totalPlayerStar += this.scoreManager.playerScore;
                }
                // this.uiManager.StopTimer();
            } else {
                this.uiManager.OnGameLoosePopup();
                // this.uiManager.StopTimer();
            }
        }
    }

    PawnQuantityCounter(coinToBeFind: COIN_TYPE): number {
        return this.pawnScript.GetPawnAvailableInBoard(coinToBeFind);
    }

    ManualTurnChange(): void {
        if (this.gameMode !== GAME_MODE.VERSUS) return;

        this.SetTurnChange(true);

        if (this.playerTurn) {
            this.playerStrikerScript.TurnChange();
            this.playerTurnSkipCounter++;
        } else {
            this.enemyStriker.getComponent(AIStriker).TurnChange();
        }

        if (this.playerTurnSkipCounter >= 2 && this.uiManager instanceof UIMultiplayer) {
            this.uiManager.OnGameLoosePopup();
            this.playerStriker.active = false;
            this.enemyStriker.active = false;
        }

    };

    SetPlayerCoinColor(_coinColor: COIN_TYPE): void {
        if (_coinColor === COIN_TYPE.WHITE) {

        }
        this.playerChoosedCoinColor = _coinColor;

        // this.scheduleOnce(() => {
        //     // this.uiManager.SetUserUIProfile();
        // }, 0.5);
    };
    //#region -IsTurnChange
    /**
     * @description - For checking turn is changable or not.
     * @returns 
     */
    IsTurnChange(): boolean {
        return this.gameMode === GAME_MODE.CHALLENGER ? false : this.turnChange;
    }
    //#endregion

    //#region -SetTurnChange
    /**
     * @description - Setting turn change.
     * @param _isChange 
     */
    SetTurnChange(_isChange: boolean): void {
        if (this.gameMode !== GAME_MODE.VERSUS) return;

        this.turnChange = _isChange;
    }
    //#endregion

    //#region OnGamePause
    /**
     * @description - Specially called when ad started.
     */
    OnGamePause(): void {
        GA.GameAnalytics.addDesignEvent("ad:started");
        PlayzhubEventHandler.GamePlayPaused();
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
        console.info("Game is Resumed!");
        director.resume();
    }
    //#endregion

    UpdateGameState(): void {
        const data = Constant.GameData;
        PlayzhubEventHandler.GameStateUpdate(data);
        console.log('UpdateGameState', data);
    }

    UpdateGameScore(): void {
        console.log("GameScoreFetch");
        const starsAchieved = this.StarsAchieved()
        let currTime = Date.now();
        const time = (currTime - this.initialTimer) / 1000;
        PlayzhubEventHandler.GameScoreUpdate(time.toFixed(0), starsAchieved.toString());
    }

    async ShowAd(onCompleteAdsCallback?: () => void) {
        const adManager = AdManager.getInstance();
        try {
            GA.GameAnalytics.addDesignEvent('ad:requested');
            if (onCompleteAdsCallback) {
                await adManager.RequestAdAsync(2000, onCompleteAdsCallback);
            } else {
                await adManager.RequestAdAsync();
            }
            this.OnGameResume();
        } catch (e) {
            console.error("Ad error:", e);
        }
    }

    //#region BroadCast
    BroadCast(_text: string): void {
        const broadcaster = this.broadcaster;
        const richText = broadcaster.getComponent(Label);

        if (broadcaster.active) return;

        broadcaster.active = true;
        richText.string = _text;
        broadcaster.setScale(new Vec3(0.5, 0.5, 1));
        tween(broadcaster)
            .to(0.3, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
            .delay(0.5)
            .to(0.3, { scale: new Vec3(0.5, 0.5, 1) }, { easing: 'quadIn' })
            .call(() => {
                broadcaster.active = false;
            })
            .start();
    }
    //#endregion

    //#region -OnDisable
    /**
     * @description - Inbuilt Cocos Component onDisable function.
     */
    protected onDisable(): void {
        GameManager.instance = null;
        this.gameEvent.off("game_over", this.GameOver, this);
        this.gameEvent.off("level_complete", this.GameWin, this);
        this.gameEvent.off(GAME_EVENTS.TURN_CHANGE, this.CheckTurn, this);
    };
    //#endregion
}