import { _decorator, Component, Label, Node, Sprite, tween, Vec3 } from 'cc';
import { GameManager } from './GameManager';
import { AnimationManager } from './utils/AnimationManger';
import { SoundManager } from './SoundManager';
import { Constant } from './Constant';
const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager extends Component {

    //#region Fields
    readonly TIMER_MODE_BASE = 30;
    readonly TURN_MODE_BASE = 3;
    readonly MAX_TIMER_MULTIPLIER = 5;

    private isTimerMode: boolean = false;
    private isTimerPaused: boolean = false;
    private maxValue: number = 0;
    private currentValue: number = 0;

    @property(Node) progressBarNode: Node | null = null;
    private progressBar: Sprite;

    @property(Node) timerIcon: Node | null = null;
    @property(Node) levelStartTimerAnimation: Node | null = null;

    @property(Node) timerBase: Node = null!;
    private timerTextLabel: Label;
    private timeBaseIcon: Node = null!;

    private startNodeParent: Node | null = null;
    numberOfStars: number = 3;

    //#endregion

    //#region Enable
    protected onEnable(): void {
        this.progressBar = this.node.children[0].getChildByName('bar').getComponent(Sprite);
        this.progressBar.fillRange = 1;
        this.startNodeParent = this.node.getChildByName("Stars");
        this.timerTextLabel = this.timerBase.getChildByName('TimeText').getComponent(Label);
        this.timeBaseIcon = this.timerBase.getChildByName('timer_icon');
    }
    //#endregion

    //#region SetScoreBarMode
    /**
     * @description  Initially Setting data according to level type.
     * @param _isTimerMode 
     * @param _maxQty 
     */
    SetScoreBarMode(_isTimerMode: boolean, _maxQty: number): void {
        this.isTimerMode = _isTimerMode;
        const baseValue = this.isTimerMode ? this.TIMER_MODE_BASE : this.TURN_MODE_BASE;

        this.maxValue = baseValue + (this.isTimerMode ? (_maxQty * this.MAX_TIMER_MULTIPLIER) : _maxQty);
        this.currentValue = this.maxValue;

        this.timerIcon.active = this.isTimerMode;
        this.timeBaseIcon.active = this.isTimerMode;
        this.EnableAllStars(3);
        this.ScoreBarUpdate();
    }
    //#endregion

    //#region TimerLevelStartAnimation
    /**
     * @description For confirm user its timer mode level.
     */
    TimerLevelStartAnimation(): void {
        AnimationManager.LevelStartTimerAnimation(this.isTimerMode, this.levelStartTimerAnimation, this.timerIcon);
        if (this.isTimerMode) SoundManager.instance.ClockSound();
    };
    //#endregion

    //#region StarTimer
    StarTimer(): void {
        this.schedule(this.TimerUpdate, 1);
    }
    //#endregion

    //#region TimerUpdate
    TimerUpdate(): void {
        if (this.isTimerPaused) return;

        if (this.currentValue <= 0 || GameManager.instance.isGameOver) {
            GameManager.instance.gameEvent.emit("game_over");
            this.StopTimer();
            return;
        }
        if (this.currentValue < Math.floor(this.maxValue * 40 / 100)) {
            tween(this.timerIcon).to(0.2, { scale: new Vec3(1.2, 1.2, 1.2) }, { easing: 'quadIn' })
                .to(0.2, { scale: new Vec3(1, 1, 1) }, { easing: 'quadOut' }).start();

            SoundManager.instance.ClockSoundOnce();
        };
        this.currentValue--;
        this.ScoreBarUpdate();
    }
    //#endregion

    //#region PauseTimer
    PauseTimer(): void {
        this.isTimerPaused = true;
    }
    //#endregion

    //#region ResumeTimer
    ResumeTimer(): void {
        this.isTimerPaused = false;
    }
    //#endregion

    //#region StopTimer
    StopTimer(): void {
        this.unschedule(this.TimerUpdate);
        this.progressBar.fillRange = 1;
    }
    //#endregion

    //#region DecreaseTurnCount
    DecreaseTurnCount(): void {
        if (this.currentValue > 0) {
            this.currentValue--;
        }

        if (this.currentValue === 0) GameManager.instance.isGameOver = true;
        this.ScoreBarUpdate();
    }
    //#endregion

    //#region ScoreBarUpdate
    ScoreBarUpdate(): void {
        let progress: number = 0;

        if (this.currentValue > 0) {
            // const t = ((this.currentValue - 0) / (this.maxValue - 0)) * (1 - 0.20) + 0.20;
            const t = this.calculateBarProgress(this.isTimerMode, this.currentValue, this.maxValue);
            const eased = Math.pow(1 - t, 1.5);
            progress = 1 - eased;
        };
        this.timerTextLabel.string = `${this.currentValue}`;
        this.progressBar.fillRange = progress;
        this.ManageStars(progress);
    }
    //#endregion

    private calculateBarProgress(_isTimerMode: boolean, _currentValue: number, _maxValue: number): number {
        return _isTimerMode ? ((_currentValue - 0) / (_maxValue - 0)) * (1 - 0.20) + 0.20 : _currentValue / _maxValue;
    }

    //#region EnableAllStars
    /**
     * @description - Enable and disable stars.
     * @param _numberOfStars 
     */
    EnableAllStars(_numberOfStars: number): void {
        this.startNodeParent.children.forEach((childStars: Node, index: number) => {
            const starNode = childStars.children[0];
            starNode.active = index < _numberOfStars;
        });
    };
    //#endregion

    //#region ManageStars
    /**
     * @description - Manage the stars based on the progress.
     * @param _progress 
     */
    ManageStars(_progress: number): void {
        if (_progress > 0.72) this.numberOfStars = 3;
        else if (_progress > 0.5) this.numberOfStars = 2;
        else if (_progress > 0.28) this.numberOfStars = 1;
        else this.numberOfStars = 0;

        if (GameManager.instance.minStarForPassCurrentLevel > this.numberOfStars) GameManager.instance.isGameOver = true

        this.EnableAllStars(this.numberOfStars);
    }
    //#endregion

    //#region StarsAchieved
    /**
     * @description Current stars achieved by player.
     * @returns 
     */
    StarsAchieved(): number {
        return this.numberOfStars;
    }
    //#endregion

    // async SaveGameDataToPlatform(_currentLevel: number): Promise<void> {
    //     if (GameManager.instance.old_currentLevelStar >= this.numberOfStars) return;

    //     const currentLevelDataString = Constant.GameData;
    //     if (!currentLevelDataString) {
    //         const levelData = {
    //             max_level: 100,
    //             levels_stars_array: [this.numberOfStars, 0]
    //         };
    //         let lifeTimeScore = Constant.GameData["life_time_score"];
    //         lifeTimeScore += this.numberOfStars * 2;
    //         Constant.GameData["life_time_score"] = lifeTimeScore;
    //         Constant.GameData["levels_stars_array"] = levelData["levels_stars_array"];
    //         console.log('1st saved game data', Constant.GameData);

    //     } else {
    //         // const levelData = JSON.parse(currentLevelDataString);
    //         const levelData = await Constant.ParseData(currentLevelDataString);
    //         const levelArrayIndex = _currentLevel - 1;
    //         levelData.levels_stars_array[levelArrayIndex] = this.numberOfStars;
    //         if (!levelData.levels_stars_array[_currentLevel] || levelData.levels_stars_array[_currentLevel] == -1) {
    //             levelData.levels_stars_array[_currentLevel] = 0;
    //         };
    //         // localStorage.setItem("levels_data", JSON.stringify(levelData));
    //         let lifeTimeScore = Constant.GameData["life_time_score"];
    //         lifeTimeScore += this.numberOfStars * 2;
    //         Constant.GameData["life_time_score"] = lifeTimeScore;
    //         Constant.GameData = levelData;
    //         console.log('saved game data', Constant.GameData);
    //     };
    //     GameManager.instance.UpdateGameState();
    // };
    async SaveGameDataToPlatform(_currentLevel: number): Promise<void> {
        if (GameManager.instance.old_currentLevelStar >= this.numberOfStars) return;

        const currentLevelDataString = Constant.GameData;
        const levelIndex = _currentLevel - 1;

        if (!currentLevelDataString) {
            //Reseting level if not getting any data.
            const levelData = {
                max_level: 100,
                levels_stars_array: []
            };
            // Initialize levels array up to current level
            for (let i = 0; i <= levelIndex; i++) {
                levelData.levels_stars_array[i] = i === levelIndex ? this.numberOfStars : 0;
            }

            const earnedStars = this.numberOfStars;
            Constant.GameData["life_time_score"] = earnedStars * 2;
            Constant.GameData["levels_stars_array"] = levelData.levels_stars_array;
            console.log('1st saved game data', Constant.GameData);
        } else {
            const levelData = await Constant.ParseData(currentLevelDataString);
            const previousStars = levelData.levels_stars_array[levelIndex] ?? 0;

            // Only update if new star count is higher
            if (this.numberOfStars > previousStars) {
                levelData.levels_stars_array[levelIndex] = this.numberOfStars;

                // Ensure the next level is unlocked (optional)
                if (!levelData.levels_stars_array[_currentLevel] || levelData.levels_stars_array[_currentLevel] == -1) {
                    levelData.levels_stars_array[_currentLevel] = 0;
                };

                const gainedStars = this.numberOfStars - previousStars;
                Constant.GameData["life_time_score"] += gainedStars * 2;
                Constant.GameData = levelData;

                console.log('Updated game data', Constant.GameData);
            } else {
                console.log('No improvement in stars. Data not changed.');
            }
        }
        GameManager.instance.UpdateGameState();
    };

    //#region OnDisable
    /**
     * @description Cocos Inbuild function.
     */
    protected onDisable(): void {
        this.unschedule(this.TimerUpdate);
    };
}