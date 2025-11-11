import { _decorator, Animation, Button, Component, director, Label, Node, ProgressBar, Skeleton, sp, Sprite, tween, TweenEasing, Vec3 } from 'cc';
import { GameManager } from './GameManager';
import { SoundManager } from './SoundManager';
import { PlayzhubEventHandler } from './PlayzhubEventHandler';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    //#region -Fields
    // canvas = null;
    //References Nodes
    @property(Node) stackFullPopup: Node = null;
    @property(Node) levelCompletePopup: Node = null;
    @property(Node) gameOverPanel: Node = null;
    @property(Node) gameQuitPanel: Node = null;
    @property(Node) tutorialsNode: Node = null;
    @property(Node) settingPanel: Node = null;
    @property(Label) levelText: Label = null;
    @property(Node) helperArrow: Node = null;

    //Buttons
    @property(Node) undoButton: Node = null;
    @property(Node) shuffleButton: Node = null;
    @property(Node) soundButton: Node = null;
    @property(Node) exitButton: Node = null;

    //Texts
    @property(Label) undoValueText: Label = null;
    @property(Label) shuffleValueText: Label = null;
    @property(Label) diamondText: Label = null;
    @property(Label) coinText: Label = null;
    gameOverCoinText: Label = null;
    gameOverDiamondText: Label = null;

    //Variables
    tutorialStepsCounter: number = 0;
    isSoundOn: boolean = true;
    buttonAnimationTime: number = 0.2;

    //Timer
    @property(Node) timerNode: Node = null;
    timeProgressBar: ProgressBar;
    @property(Node) timerIcon: Node;
    totalGivenTime: number;
    time: number = 0;
    startTimer: boolean = false;
    @property(Node) diamondUI: Node = null;
    diamondProgressBar: ProgressBar;
    maxDiamond: number = 50;

    initialTimer = null;

    private onClickNextLevelBtn: number = 0;

    currentScore: number = 0;
    //#endregion

    //#region -onEnable
    protected onEnable(): void {
        //Events
        GameManager.instance.gameEvent.on("stackFull", this.StackFull, this);
        GameManager.instance.gameEvent.on("levelComplete", this.OnLevelCompletePopup, this);
        GameManager.instance.gameEvent.once("start_timer", () => { this.startTimer = true; this.initialTimer = Date.now() }, this);
        GameManager.instance.gameEvent.once("gameOver", this.GameOver, this);
        GameManager.instance.gameEvent.once("timeLow", () => {
            this.timerIcon.getComponent(Animation).play('clockAnimation');
        }, this);

        //Set Initial UI Values/Texts
        // this.canvas = document.getElementById("GameCanvas");
        this.timeProgressBar = this.timerNode.getComponent(ProgressBar);
        this.diamondProgressBar = this.diamondUI.children[0].getComponent(ProgressBar);
        this.SetShuffleValueText(GameManager.instance.GetCurrentShuffleValue());
        this.SetUndoValueText(GameManager.instance.GetUndoCurrentValue());
        this.SetDiamondText(GameManager.instance.GetNumberOfDiamondLeft());
        this.SetCoinText(GameManager.instance.GetNumberOfCoinLeft());
        //Initial Logic
        this.helperArrow.active = false;
        if (!SoundManager.instance.isMuted) {
            this.soundButton.getComponent(Sprite).spriteFrame = this.soundButton.getComponent(Button).normalSprite;
        } else {
            this.soundButton.getComponent(Sprite).spriteFrame = this.soundButton.getComponent(Button).disabledSprite;
        }
        this.timeProgressBar.progress = 0;

        this.OnOrientationChange();
    }
    //#endregion

    //#region -start
    start() {
        this.stackFullPopup.active = false;
        this.settingPanel.active = false;
        this.levelCompletePopup.active = false;
        this.gameOverPanel.active = false;
        this.gameQuitPanel.active = false;
        this.exitButton.active = false
        this.soundButton.active = false
        this.undoButton.active = false
        this.shuffleButton.active = false

        this.TutorialsFunction();
        this.CheckTutorial()

        this.totalGivenTime = GameManager.instance.timerValue;
        // this.time = this.totalGivenTime;

        //Animations top
        this.OnStartPanelAnimation(this.exitButton, this.exitButton.getPosition().x, 600);
        this.OnStartPanelAnimation(this.soundButton, this.soundButton.getPosition().x, 600);
        this.OnStartPanelAnimation(this.coinText.node.parent, this.coinText.node.parent.getPosition().x, 600);
        // this.OnStartPanelAnimation(this.timerNode.parent, this.timerNode.parent.getPosition().x, 600);
        this.OnStartPanelAnimation(this.shuffleButton, 1200, this.undoButton.getPosition().y);
        this.OnStartPanelAnimation(this.undoButton, 1200, this.undoButton.getPosition().y);
        this.OnStartPanelAnimation(this.diamondUI, -1200, this.diamondUI.getPosition().y);

        //MouseEffect
        this.MousePointerEffect();

    }
    //#endregion

    //#region -MousePointerEffect
    MousePointerEffect(): void {
        let buttonArray: Node[] = [];
        buttonArray.push(this.exitButton, this.undoButton, this.soundButton, this.shuffleButton);
        buttonArray.forEach((_button: Node, _index: number) => {
            _button.on(Node.EventType.MOUSE_ENTER, () => {
                GameManager.instance.canvas.style.cursor = "pointer";
            })
            _button.on(Node.EventType.MOUSE_LEAVE, () => {
                GameManager.instance.canvas.style.cursor = "default";
            })
        })
    }
    //#endregion

    OnStartPanelAnimation(_nodeForAnimation: Node, _xPos: number, _yPos: number): void {
        const currentPosExit = _nodeForAnimation.getPosition();
        _nodeForAnimation.setPosition(_xPos, _yPos, _nodeForAnimation.getPosition().z);
        _nodeForAnimation.active = true
        tween(_nodeForAnimation).to(1, { position: currentPosExit }, { easing: 'backOut' }).start();
    }

    //#region -update
    protected update(dt: number): void {
        // if (this.startTimer) {
        //     this.TimerUIUpdate(dt);
        // }
    }
    //#endregion

    //#region -CheckTutorial
    CheckTutorial(): void {
        setTimeout(() => {
            if (GameManager.instance.currentLevel == 0) {
                this.helperArrow.active = true;
                this.tutorialsNode.active = true;
            } else {
                this.helperArrow.active = false;
                this.tutorialsNode.active = false;
            }
        }, 2000);
    }
    //#endregion

    //#region -TutorialsFunction
    TutorialsFunction(): void {
        this.helperArrow.setParent(this.tutorialsNode.children[GameManager.instance.tutorialStepsCounter]);
        this.helperArrow.setPosition(0, 100, 0);

        this.tutorialsNode.children.forEach((_node: Node, _index: number) => {
            if (_index === GameManager.instance.tutorialStepsCounter)
                _node.children[0].active = false
            else
                _node.children[0].active = true;
        })
    }
    //#endregion

    //#region -TimerFunction
    TimerUIUpdate(_deltaTime: number): void {
        // if (this.time <= 0) {
        //     // GameManager.instance.gameEvent.emit("gameOver");
        //     this.time = this.totalGivenTime
        // } else {
        //     this.time += _deltaTime;
        //     this.timeProgressBar.progress = this.time / this.totalGivenTime;
        //     if (this.timeProgressBar.progress < 0.3) {
        //         GameManager.instance.gameEvent.emit("timeLow");
        //     }
        // }
        this.time += _deltaTime;
        // if (this.timeProgressBar.progress === 1) {
        //     GameManager.instance.gameEvent.emit("timeLow");
        // }
        // else {
        //     this.timeProgressBar.progress = this.time / this.totalGivenTime;
        // }
    }
    //#endregion

    //#region -SetLevelIndicator
    SetLevelIndicator(_level: number, _isGameCompleted?: boolean): void {
        if (_isGameCompleted) {
            this.levelText.string = `Game Completed`;
            return
        }

        if (_level === 0) {
            this.levelText.string = `Tutorial Completed`;
        } else {
            this.levelText.string = `Level : ${_level} / ${GameManager.instance.maxLevel} Completed`;
        }
    }
    //#endregion

    //#region -SetUndoValueText
    SetUndoValueText(_value: number): void {
        this.undoValueText.string = `${_value}`;
    }
    //#endregion

    //#region -SetDiamondText
    SetDiamondText(_value: number): void {
        this.UIAnimation(this.diamondText.node, 'backOut', () => { }, () => {
            this.diamondText.string = `${_value}`;
            this.diamondProgressBar.progress = _value / this.maxDiamond;
        })
    }
    //#endregion

    //#region -SetShuffleValueText
    SetShuffleValueText(_value: number): void {
        this.shuffleValueText.string = `x${_value}`;
    }
    //#endregion

    //#region -SetCoinText
    SetCoinText(_value: number): void {
        // this.coinText.string = `${_value}`;
        this.UIAnimation(this.coinText.node, 'backOut', () => { }, () => {
            this.coinText.string = `${_value}`;
        })
    }
    //#endregion

    //#region -OnShuffleButtonClick
    OnShuffleButtonClick(_clickedData): void {
        GA.GameAnalytics.addDesignEvent("ui:shuffle_clicked");
        SoundManager.instance.ShuffleButtonSound();
        try {
            this.ButtonInteractiveAnimation(_clickedData.currentTarget, () => { }, () => {
                GameManager.instance.ShuffleBoard();
            })
        } catch (error) {
            GameManager.instance.ShuffleBoard();
        }
    }
    //#endregion

    //#region -OnLevelCompletePopup
    OnLevelCompletePopup(_level: number): void {
        this.currentScore = GameManager.instance.GetNumberOfCoinLeft();
        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "fruit_shuffle_endless",
            undefined,
            undefined,
            this.currentScore
        );
        GA.GameAnalytics.addDesignEvent("score:fruit_shuffle", this.currentScore);

        setTimeout(() => {
            SoundManager.instance.LevelCompleteSound();
        }, 500)
        let currTime = 0;
        _level === 0 ? currTime = 0 : currTime = Date.now();
        const time = (currTime - this.initialTimer) / 1000;
        this.initialTimer = Date.now();
        // Server.PostGamePlayTimeToParent(time.toFixed(0), GameManager.instance.GetNumberOfCoinLeft().toString());
        // Server.PostGameLevelToParent(time.toFixed(0), _level.toString(), "complete");
        PlayzhubEventHandler.GameScoreUpdate(time.toFixed(0), GameManager.instance.GetNumberOfCoinLeft().toString());
        PlayzhubEventHandler.UpdateGameLevel(time.toFixed(0), _level.toString(), "complete");

        if (_level === GameManager.instance.maxLevel) {
            this.PopupSpinePlay(this.levelCompletePopup, "level_up_appear", "level_up_loop", "happy_jump2", "happy_idle");
            this.SetLevelIndicator(_level, true);
            GameManager.instance.ResetGameState();
            GameManager.instance.tutorialStepsCounter = 0;
        } else {
            GameManager.instance.PostGameState();
            this.PopupSpinePlay(this.levelCompletePopup, "level_up_appear", "level_up_loop", "happy_jump2", "happy_idle");
            this.SetLevelIndicator(_level);
        }
    }
    //#endregion

    //#region -OnUndoButtonClick
    OnUndoButtonClick(_clickedData): void {
        GA.GameAnalytics.addDesignEvent("ui:undo_clicked");
        SoundManager.instance.UndoButtonSound();
        try {
            this.ButtonInteractiveAnimation(_clickedData.currentTarget, () => { }, () => {
                GameManager.instance.UndoMove();
            })
        } catch (error) {
            GameManager.instance.UndoMove();
        }
    }
    //#endregion

    //#region -OnGoHomeButtonClick
    OnGoHomeButtonClick(): void {
        GA.GameAnalytics.addDesignEvent("ui:menu_clicked");
        this.StartScene("MenuScene");
    }
    //#endregion

    //#region -OnSoundButtonClick
    OnSoundButtonClick(): void {
        GA.GameAnalytics.addDesignEvent("ui:sound_clicked");
        this.ButtonInteractiveAnimation(this.soundButton, () => { SoundManager.instance.ButtonClickSound(); }, () => {
            if (SoundManager.instance.isMuted) {
                this.soundButton.getComponent(Sprite).spriteFrame = this.soundButton.getComponent(Button).normalSprite;
            } else {
                this.soundButton.getComponent(Sprite).spriteFrame = this.soundButton.getComponent(Button).disabledSprite;
            }
            SoundManager.instance.SetMute();
            SoundManager.instance.CheckBackgroundMusicEnable();
        });
    }
    //#endregion

    //#region -OnInvisbleTutorialButtonClick
    OnInvisbleTutorialButtonClick(): void {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_step_clicked");
        GameManager.instance.tutorialStepsCounter++;

        if (GameManager.instance.tutorialStepsCounter > 6) {
            GameManager.instance.tutorialStepsCounter = 2;
            this.tutorialsNode.active = false
        }

        this.TutorialsFunction();
    }
    //#endregion

    //#region -RestartGame
    async RestartGame(): Promise<void> {
        // await GameManager.instance.ShowAd();
        GA.GameAnalytics.addDesignEvent("ui:replay_clicked");
        this.OnSleepPopup(this.gameOverPanel);
        SoundManager.instance.ButtonClickSound();
        // const time = (Date.now() - this.initialTimer) / 1000;
        // Server.PostGamePlayTimeToParent(time.toFixed(0), GameManager.instance.GetNumberOfCoinLeft().toString());
        // this.StartScene("GamePlay");
        this.gameOverPanel.active = false;
        // GameManager.instance.currentLevel--;
        // GameManager.instance.SetLevel();
        // GameManager.instance.SetBoard();
        const completedLevel = GameManager.instance.currentLevel - 1;
        const coinValue = GameManager.instance.GetNumberOfCoinLeft();
        const diamondValue = GameManager.instance.GetNumberOfDiamondLeft();
        const shuffleCost = GameManager.instance.GetCurrentShuffleValue();
        const undoCost = GameManager.instance.GetUndoCurrentValue();
        director.loadScene("GamePlay", () => {
            GameManager.instance.currentLevel = completedLevel;
            GameManager.instance.SetCoin(coinValue);
            GameManager.instance.SetNumberOfUndoLeft(diamondValue);
            GameManager.instance.SetCurrentShuffleCost(shuffleCost);
            GameManager.instance.SetCurrentUndoCost(undoCost);
        })
    }
    //#endregion

    //#region -StartScene
    StartScene(_scene: string, _args?: number): void {
        director.loadScene(_scene);
    }
    //#endregion

    //#region -NextLevelButton
    async NextLevelButton(_clickedData): Promise<void> {
        GA.GameAnalytics.addDesignEvent("ui:next_clicked");
        this.onClickNextLevelBtn++;
        if (this.onClickNextLevelBtn % 3 === 0) {
            await GameManager.instance.ShowAd();
        }
        SoundManager.instance.ButtonClickSound();
        GameManager.instance.LoadNextLevel();
        // this.PopupAnimation(this.levelCompletePopup, () => { }, () => { this.levelCompletePopup.active = false; }, 'fadeOut', {
        //     initialScaleX: 1,
        //     initialScaleY: 1,
        //     finalScaleX: 0.1,
        //     finalScaleY: 0.1,
        // })
        this.OnSleepPopup(this.levelCompletePopup);
    }
    //#endregion

    PreviousLevelButton(): void {
        GameManager.instance.LoadPreviousLevel();
    }

    //#region -StackFull
    StackFull(): void {
        SoundManager.instance.StackFullSound();
        GameManager.instance.isReadyToClick = false;
        // this.PopupAnimation(this.stackFullPopup, () => { }, () => { }, 'fadeIn');
        if (GameManager.instance.GetNumberOfCoinLeft() >= 10) {
            this.PopupSpinePlay(this.stackFullPopup, "oops_appear", "oops_loop", "sad_jump", "sad_idle");
        } else {
            const coinEarned = GameManager.instance.GetNumberOfCoinLeft()
            const gameOverPanelPopup = this.gameOverPanel.getChildByName("popups");
            const coinText = gameOverPanelPopup.getChildByName("coin_txt");
            const diamondText = gameOverPanelPopup.getChildByName("diamond_txt");
            coinText.getComponent(Label).string = `${coinEarned}`;
            diamondText.getComponent(Label).string = `${GameManager.instance.GetNumberOfDiamondLeft()}`;
            this.PopupSpinePlay(this.gameOverPanel, "level_failed_appear", "level_failed_loop", "sad_jump", "sad_idle");
        }
        // this.stackFullPopup.active = true;
    }
    //#endregion

    //#region -OnGiveLifeClick
    async OnGiveLifeClick(): Promise<void> {
        GA.GameAnalytics.addDesignEvent("ui:life_clicked");
        SoundManager.instance.ButtonClickSound();
        const giveLifeAction = () => {
            GameManager.instance.GiveLife();
            GameManager.instance.isReadyToClick = true;
            this.OnSleepPopup(this.stackFullPopup);
        }
        if (GameManager.instance.GetNumberOfCoinLeft() >= 10) {
            giveLifeAction();
        } else {
            // console.log("Please buy life!");
            await GameManager.instance.ShowAd(giveLifeAction);
        }
    }
    //#endregion

    //#region -GameOver
    async GameOver(): Promise<void> {
        this.currentScore = GameManager.instance.GetNumberOfCoinLeft();
        GA.GameAnalytics.addProgressionEvent(
            "Fail",
            "fruit_shuffle_endless",
            undefined,
            undefined,
            this.currentScore
        );
        GA.GameAnalytics.addDesignEvent("score:fruit_shuffle", this.currentScore);

        await GameManager.instance.ShowAd();
        const coinEarned = GameManager.instance.GetNumberOfCoinLeft()
        const gameOverPanelPopup = this.gameOverPanel.getChildByName("popups");
        const coinText = gameOverPanelPopup.getChildByName("coin_txt");
        const diamondText = gameOverPanelPopup.getChildByName("diamond_txt");
        coinText.getComponent(Label).string = `${coinEarned}`;
        diamondText.getComponent(Label).string = `${GameManager.instance.GetNumberOfDiamondLeft()}`;
        if (this.stackFullPopup.active) {
            this.OnSleepPopup(this.stackFullPopup);
            this.PopupSpinePlay(this.gameOverPanel, "level_failed_appear", "level_failed_loop", "sad_jump", "sad_idle");
        } else {
            this.PopupSpinePlay(this.gameOverPanel, "level_failed_appear", "level_failed_loop", "sad_jump", "sad_idle");
        }
        let currTime = 0;
        const currLevel = GameManager.instance.currentLevel;
        currLevel === 0 ? currTime = 0 : currTime = Date.now();
        const time = (currTime - this.initialTimer) / 1000;
        this.initialTimer = Date.now();
        // Server.PostGameLevelToParent(time.toFixed(0), currLevel.toString(), "incomplete");
        PlayzhubEventHandler.UpdateGameLevel(time.toFixed(0), currLevel.toString(), "incomplete");
    }
    //#endregion

    //#region -OnGameResume
    OnGameResume(): void {
        // const scaleData = {
        //     initialScaleX: 1,
        //     initialScaleY: 1,
        //     finalScaleX: 0.1,
        //     finalScaleY: 0.1,
        // }
        // this.PopupAnimation(this.gameQuitPanel, () => { }, () => { this.gameQuitPanel.active = false; }, 'fadeOut', scaleData);
        // this.gameQuitPanel.active = false;
        this.OnSleepPopup(this.gameQuitPanel);
        SoundManager.instance.ButtonClickSound();
    }
    //#endregion

    //#region -onExitButtonClicked
    async onExitButtonClicked(): Promise<void> {
        GA.GameAnalytics.addDesignEvent("ui:back_clicked");
        await GameManager.instance.ShowAd();
        this.ButtonInteractiveAnimation(this.exitButton, () => {
            SoundManager.instance.ButtonClickSound();
            this.PopupSpinePlay(this.gameQuitPanel, "quit_appear", "quit_loop", "normal_jump", "normal_idle");
            SoundManager.instance.ButtonClickSound();
        }, () => { })
    }
    //#endregion

    //#region -OnGameExit
    OnGameExit(): void {
        GA.GameAnalytics.addDesignEvent("ui:menu_clicked");
        SoundManager.instance.ButtonClickSound();
        let currTime = 0;
        GameManager.instance.currentLevel === 0 ? currTime = 0 : currTime = Date.now();
        const time = (currTime - this.initialTimer) / 1000;
        this.initialTimer = Date.now();
        PlayzhubEventHandler.GamePlayStopped(this.time.toFixed(0));
        this.StartScene("MenuScene");
    }
    //#endregion

    //#region -ButtonInteractiveAnimation
    ButtonInteractiveAnimation(_object: Node, _onTweenStart: Function, _onTweenComplete: Function): void {
        const scaleZ: number = _object.getScale().z;
        _object.setScale(0.8, 0.8, scaleZ);
        tween(_object).to(this.buttonAnimationTime, { scale: new Vec3(1.2, 1.2, scaleZ) }, {
            easing: 'fade', onStart: () => {
                _onTweenStart();
            }
        }).call(() => {
            _object.setScale(1, 1, scaleZ);
            _onTweenComplete();
        }).start();
    }
    //#endregion

    //#region -UIAnimation
    UIAnimation(_object: Node, _ease: TweenEasing, _onStartTween: Function, _onTweenComplete: Function): void {
        const scaleZ: number = _object.getScale().z;
        _object.setScale(1.2, 1.2, scaleZ);

        tween(_object).to(0.5, { scale: new Vec3(1, 1, scaleZ) }, {
            easing: _ease, onStart: () => {
                _onStartTween();
            }
        }).call(() => {
            _onTweenComplete();
        }).start()
    }
    //#endregion

    //#region -PopupAnimation
    PopupAnimation(_object: Node, _onTweenStart: Function, _onTweenComplete: Function, _aminationType: string, _scaleData?: {
        initialScaleX: number,
        initialScaleY: number,
        finalScaleX: number,
        finalScaleY: number
    }): void {
        _object.active = true;
        const exitPopup: Node = _object.getChildByName('popups');
        exitPopup.getComponent(Animation).play(_aminationType);
        const scaleZ: number = exitPopup.getScale().z;

        const scaleData = _scaleData ?? { initialScaleX: 0.1, initialScaleY: 0.1, finalScaleX: 1, finalScaleY: 1 };
        const { initialScaleX, initialScaleY, finalScaleX, finalScaleY } = scaleData;

        exitPopup.setScale(initialScaleX, initialScaleY, scaleZ);
        tween(exitPopup).to(0.3, { scale: new Vec3(finalScaleX, finalScaleY, scaleZ) }, {
            easing: 'smooth', onStart: () => {
                _onTweenStart();
            }
        }).call(() => {
            _onTweenComplete();
            exitPopup.children.forEach((_node, _index) => {
                _node.setScale(0.85, 0.85, scaleZ);
                tween(_node).to(0.5, { scale: new Vec3(1, 1, scaleZ) }, { easing: 'bounceOut' }).start();
            })
        }).start();
    }
    //#endregion

    //#region -PopupSpinePlay
    PopupSpinePlay(_object: Node, _appearSpineKey: string, _loopSpineKey: string, _characterAppear: string, _characterLoop: string): void {
        _object.active = true;
        const popup: Node = _object.getChildByName('popups');
        const character = _object.getChildByName('character');
        const scaleZ: number = popup.getScale().z;
        const popupSpine = popup.getComponent(sp.Skeleton);
        const characterSpine = character.getComponent(sp.Skeleton);
        popupSpine.setCompleteListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name === _appearSpineKey) {
                this.ActiveAnimationPopup(popup, scaleZ);
            }
        })
        characterSpine.setCompleteListener((entry: sp.spine.TrackEntry) => {
            if (entry.animation.name === _characterAppear) {
                characterSpine.setAnimation(0, _characterLoop, true);
            }
        })
        popupSpine.setAnimation(0, _appearSpineKey, false);
        popupSpine.setAnimation(1, _loopSpineKey, true);
        characterSpine.setAnimation(0, _characterAppear, false);
    }
    //#endregion

    //#region -ActiveAnimationPopup
    ActiveAnimationPopup(_object: Node, _scaleZ: number): void {
        _object.children.forEach((_node, _index) => {
            _node.active = true;
            _node.setScale(0.85, 0.85, _scaleZ);
            _node.on(Node.EventType.MOUSE_ENTER, () => {
                GameManager.instance.canvas.style.cursor = "pointer";
            })
            _node.on(Node.EventType.MOUSE_LEAVE, () => {
                GameManager.instance.canvas.style.cursor = "default";
            })
            tween(_node).to(0.5, { scale: new Vec3(1, 1, _scaleZ) }, { easing: 'bounceOut' }).start();
        })
    }
    //#endregion

    OnSleepPopup(_object: Node): void {
        _object.active = false;
        const popup: Node = _object.getChildByName('popups');
        popup.children.forEach((_node, _index) => {
            _node.active = false;
            _node.off(Node.EventType.MOUSE_ENTER, () => {
                GameManager.instance.canvas.style.cursor = "pointer";
            })
            _node.off(Node.EventType.MOUSE_LEAVE, () => {
                GameManager.instance.canvas.style.cursor = "default";
            })
        })
    }

    Sleep(_seconds: number) {
        return new Promise((e) => setTimeout(e, _seconds * 1000));
    }

    //#region -OnOrientationChange
    OnOrientationChange(): void {
        const orientation = director.getScene().getChildByName('Canvas').getChildByName('Orientation');
        if (screen.orientation.type === 'portrait-primary') {
            orientation.active = true;
        } else {
            orientation.active = false;
        }
    }
    //#endregion
}