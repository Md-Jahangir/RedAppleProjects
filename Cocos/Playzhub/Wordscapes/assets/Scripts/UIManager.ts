import { _decorator, Animation, Button, Color, Component, director, EventTouch, Label, Node, sp, Sprite, tween, Vec2, Vec3 } from 'cc';
import { GameManager } from './GameManager';
import { Constant, GAME_EVENTS } from './globals/Constant';
import { AnimationManager } from './Utils/AnimationManager';
import { SoundManager } from './SoundManager';
import { PlayzhubEventHandler } from './platform_sdk/PlayzhubEventHandler';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    // References
    @property(Node) hintButtonNode: Node = null;
    @property(Label) hintLabel: Label = null;
    @property(Node) hintLotusIcon: Node = null;
    hintButton: Button = null;

    @property(Node) revealHammerNode: Node = null;
    @property(Label) revealHammerLabel: Label = null;
    @property(Node) revealLotusIcon: Node = null;
    revealHammerButton: Button = null;
    revealCancelButton: Node = null;

    @property(Node) shuffleNode: Node = null;
    @property(Node) exitButtonNode: Node = null;
    @property(Node) soundButtonNode: Node = null;
    @property(Node) musicButtonNode: Node = null;

    @property(Node) scoreNode: Node = null;
    scoreLabel: Label = null;
    scoreIcon: Node = null;

    @property(Label) timerLabel: Label = null;
    @property(Node) timerIcon: Node = null;
    @property(sp.Skeleton) shuffleRipple: sp.Skeleton = null;

    //Poupus References
    @property(Node) exitPopupNode: Node = null;
    @property(Node) levelCompletePopupNode: Node = null;
    @property(Node) levelCompleteLabelsArray: Node[] = [];
    @property(Node) levelFailedLabelsArray: Node[] = [];
    @property(Node) levelFailedPopupNode: Node = null;
    @property(Node) bonusRewardsPopup: Node = null;

    //Message Broadcaster Node
    @property(Node) messageBroadcasterNode: Node | null = null;
    @property(Node) levelIndicator: Node | null = null;

    //Local
    buttonsArray: Node[] = [];
    @property(Node) tempInteractableButton: Node[] = [];
    tempBoosterValue: number[] = [];

    private onNextButtonClickCounter: number = 0;
    //#region -onEnable
    /**
     * @description - inbuild function called once after all objects enabled.
     */
    protected onEnable(): void {
        this.hintButton = this.hintButtonNode.getComponent(Button);
        this.revealHammerButton = this.revealHammerNode.getComponent(Button);
        this.revealCancelButton = this.revealHammerNode.getChildByName('cancelBtn');
        this.scoreLabel = this.scoreNode.children[0].getComponent(Label);
        GameManager.instance.gameEvent.on(GAME_EVENTS.UPDATE_UI_SCORE, this.UpdateScoreUI, this);
        GameManager.instance.gameEvent.on(GAME_EVENTS.TIME_END, this.OnLevelFailedPopup, this);
        GameManager.instance.gameEvent.on(GAME_EVENTS.LEVEL_COMPLETE, this.OnLevelCompletePopup, this)
        //Initial setup
        this.SetSoundSprite();
        this.OnStartUISetup();
        const { hintValue, buzzitValue, isFreeHint, isFreeBuzzit } = GameManager.instance.GetCurrentBoostersUpdate();
        this.UpdateBoostersCost(hintValue, buzzitValue, isFreeHint, isFreeBuzzit);
        this.LevelIndicatorUpdate();
        this.CursorArrow();

        this.OnOrientationChange();
    }
    //#endregion

    protected start(): void {
        // this.initialTimer = Date.now();
    }

    //#region CursorArrow
    CursorArrow(): void {
        this.buttonsArray = [this.hintButtonNode, this.revealHammerNode, this.shuffleNode, this.exitButtonNode, this.soundButtonNode, this.revealCancelButton];
        this.buttonsArray.push(...this.tempInteractableButton);

        this.buttonsArray.forEach((_buttonNode: Node, _index: number) => {
            _buttonNode.on(Node.EventType.MOUSE_ENTER, () => {
                GameManager.instance.canvas.style.cursor = "pointer";
            })
            _buttonNode.on(Node.EventType.MOUSE_LEAVE, () => {
                GameManager.instance.canvas.style.cursor = "default";
            })
        });
    }
    //#endregion

    //#region -UIUpdate
    OnStartUISetup(): void { // Initial UI Setup.
        this.exitPopupNode.active = false;
        this.levelCompletePopupNode.active = false;
        this.levelFailedPopupNode.active = false;
        this.revealCancelButton.active = false;
        this.messageBroadcasterNode.active = false;
        // this.CursorArrow();
    }

    UpdateScoreUI(_lotusPoint: number): void {
        this.scoreLabel.string = `${_lotusPoint}`;
    }

    UpdateTimerUI(_time: number): void {
        this.timerLabel.string = `${_time}`;
    }

    UpdateBoostersCost(_hintValue: number, _buzzitValue: number, _isFreeHint: boolean, _isFreeBuzzit: boolean): void {
        const scaleProperty = {
            initial_scale_x: 1.5,
            initial_scale_y: 1.5,
            final_scale_x: 1,
            final_scale_y: 1,
        }
        if (_isFreeHint) {
            this.hintLabel.string = `${_hintValue}/${Constant.BOOSTERS_HARD_LIMIT}`;
            this.hintLotusIcon.active = false;
        }
        else {
            this.hintLabel.string = `${_hintValue}`;
            if (!this.hintLotusIcon.active) {
                this.hintLotusIcon.active = true;
                AnimationManager.ButtonsInteractiveAnim(this.hintLotusIcon, 1, () => { }, scaleProperty);
            }
        }
        if (_isFreeBuzzit) {
            this.revealHammerLabel.string = `${_buzzitValue}/${Constant.BOOSTERS_HARD_LIMIT}`;
            this.revealLotusIcon.active = false;
        } else {
            this.revealHammerLabel.string = `${_buzzitValue}`;
            if (!this.revealLotusIcon.active) {
                this.revealLotusIcon.active = true;
                AnimationManager.ButtonsInteractiveAnim(this.revealLotusIcon, 1, () => { }, scaleProperty);
            }
        }
    }

    LevelIndicatorUpdate(): void {
        this.levelIndicator.getComponent(Label).string = `Level - ${GameManager.instance.currentLevel}`;
    }

    TimerWarningIndicator(): void {
        this.timerIcon.getComponent(Animation).play('TimerRunningOutWarning');
    }

    TimerWarningStop(): void {
        this.timerIcon.getComponent(Animation).stop();
    }
    //#endregion

    //#region -OnAlphabetShuffleClick
    /**
     * @description - Alphabets shuffle control by UI
     */
    OnAlphabetShuffleClick(): void {
        if (GameManager.instance.isGamePaused) return;

        const shuffleButtonComponent = this.shuffleNode.getComponent(Button);
        shuffleButtonComponent.interactable = false;
        GameManager.instance.ShuffleAlphabets();
        tween(this.shuffleNode.children[0]).to(1, { angle: -360 }, { easing: 'backOut' }).call(() => {
            this.shuffleNode.children[0].angle = 0;
            shuffleButtonComponent.interactable = true;
        }).start();

        if (this.shuffleRipple) this.shuffleRipple.setAnimation(0, "ripple", false);

        SoundManager.instance.AlphabetShuffleSound();
    }
    //#endregion

    //#region -OnHintButtonClick
    /**
     * @description -For reveal alphabet HINT.
     */
    OnHintButtonClick(): void {
        if (GameManager.instance.isGamePaused) return;
        GA.GameAnalytics.addDesignEvent('ui:hint_clicked');
        GameManager.instance.HintWord();
        this.scheduleOnce(() => {
            this.hintButton.interactable = true;
        }, Constant.HINT_HIGHLIGHT_TIME);
        SoundManager.instance.ButtonClickSound();
    }
    //#endregion

    //#region -OnHammerButtonClick
    /**
     * @description - Reveal alphabets using hammer.
     */
    async OnHammerButtonClick(): Promise<void> {
        if (GameManager.instance.isGamePaused) return;
        GA.GameAnalytics.addDesignEvent('ui:buzzit_powerup_clicked');
        const gameManager = GameManager.instance;
        if (gameManager.IsAbleToUseHammer()) {
            gameManager.SetReavealHammerActive(false);
        }
        else {
            await GameManager.instance.ShowAd(() => {
                gameManager.SetReavealHammerActive(false);
            });
        }

        SoundManager.instance.ButtonClickSound();
    }

    CancelHammerFunction(): void {
        if (GameManager.instance.isGamePaused) return;
        GA.GameAnalytics.addDesignEvent('ui:buzzit_powerup_cancel_clicked');
        GameManager.instance.SetReavealHammerActive(true);
        SoundManager.instance.ButtonClickSound();
    }
    //#endregions

    //#region MessageBroadcast
    MessageBroadcast(_message: string, _isVisible: boolean): void {
        const broadcasterLabel: Label = this.messageBroadcasterNode.getComponent(Label);
        broadcasterLabel.string = _message;

        // this.messageBroadcasterNode.active = _isVisible;
        AnimationManager.BroadcasterAnimation(this.messageBroadcasterNode, _isVisible);
    }
    //#endregion

    //#region -OnLevelCompletePopup
    OnLevelCompletePopup(): void {
        // Take references
        const gameManager = GameManager.instance;
        const { flowerPoint, bonusPoint, timeBonusLocal, collectedBonus } = gameManager.GetScore();
        const totalScore = flowerPoint + bonusPoint + timeBonusLocal;

        //Initialize text to set in popup
        const text = [
            `${gameManager.currentLevel}`,
            `${flowerPoint}`,
            `${timeBonusLocal}`,
            `${totalScore}`,
        ]

        //Set text in label.
        this.levelCompleteLabelsArray.forEach((child: Node, index: number) => {
            child.getComponent(Label).string = text[index];
        })
        this.TimerWarningStop();
        AnimationManager.PopupAppearAnimation(this.levelCompletePopupNode, "level_up_appear", "level_up_loop", () => { }, collectedBonus);
        //Platform
        const { lotusPoint, bonus, timeBonus, hint, buzzit, hintCost, buzzitCost, basicScore } = gameManager.GetTotalScore()
        let currTime = Date.now();
        const time = (currTime - gameManager.initialTimer) / 1000;
        gameManager.initialTimer = Date.now();
        PlayzhubEventHandler.GameScoreUpdate(time.toFixed(0), basicScore.toString());
        PlayzhubEventHandler.UpdateGameLevel(time.toFixed(0), gameManager.currentLevel.toString(), "complete");

        if (gameManager.currentLevel === Constant.MAX_LEVEL) {
            const gameData = null;
            PlayzhubEventHandler.GameStateUpdate(gameData);
        } else {
            const gameData = {
                "game_score": basicScore,
                "total_levels": Constant.MAX_LEVEL,
                "last_level_played": gameManager.currentLevel,
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
        //Sound
        SoundManager.instance.LevelCompleteSound();
        // PlayzhubEventHandler.InterimBreak();

        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "spell_bound_level",
            gameManager.currentLevel,
            undefined,
            basicScore
        );

        GA.GameAnalytics.addDesignEvent("score:spell_bound", basicScore);
    }
    //#endregion

    //#region LevelCompleteNextButton
    async LevelCompleteNextButton(_eventData): Promise<void> {
        GA.GameAnalytics.addDesignEvent('ui:next_clicked');
        this.onNextButtonClickCounter++;
        if (this.onNextButtonClickCounter % 3 == 0) {
            await GameManager.instance.ShowAd();
        }
        const targerButton: Button = _eventData.currentTarget.getComponent(Button);
        targerButton.interactable = false;
        AnimationManager.ButtonsInteractiveAnim(targerButton.node, Constant.BUTTON_ANIMATION_TIME_DURATION, () => {
            AnimationManager.PopupDisappearAnimation(this.levelCompletePopupNode, () => {
                targerButton.interactable = true;
                GameManager.instance.LoadNextLevel();
            });
        });
        SoundManager.instance.ButtonClickSound();
    }
    //#endregion

    //#region OnLevelFailedPopup
    async OnLevelFailedPopup(): Promise<void> {
        await GameManager.instance.ShowAd();
        // Take references
        const gameManager = GameManager.instance;
        gameManager.gameOver = true;
        const { flowerPoint, bonusPoint, timeBonusLocal } = gameManager.GetScore();
        const totalScore = flowerPoint + bonusPoint + timeBonusLocal;

        //Initialize text to set in popup
        const text = [
            `${flowerPoint}`,
            `${timeBonusLocal}`,
            `${totalScore}`,
        ]

        GA.GameAnalytics.addProgressionEvent(
            "Fail",
            "spell_bound_level",
            gameManager.currentLevel,
            undefined,
            gameManager.GetScore()
        );

        GA.GameAnalytics.addDesignEvent("score:spell_bound", gameManager.GetScore());

        //Set text in label.
        this.levelFailedLabelsArray.forEach((child: Node, index: number) => {
            child.getComponent(Label).string = text[index];
        })
        this.TimerWarningStop();

        // Checking is exit popup is on or off.
        if (this.exitPopupNode.active) {
            AnimationManager.PopupDisappearAnimation(this.exitPopupNode, () => {
                AnimationManager.PopupAppearAnimation(this.levelFailedPopupNode, "game_over_appear");
            });
        } else if (this.bonusRewardsPopup.active) {
            this.bonusRewardsPopup.active = false;
            AnimationManager.PopupAppearAnimation(this.levelFailedPopupNode, "game_over_appear");
        }
        else {
            AnimationManager.PopupAppearAnimation(this.levelFailedPopupNode, "game_over_appear");
        }

        //Platform
        let currTime = Date.now();
        const time = (currTime - gameManager.initialTimer) / 1000;
        gameManager.initialTimer = Date.now();
        PlayzhubEventHandler.UpdateGameLevel(time.toFixed(0), gameManager.currentLevel.toString(), "incomplete");
        //Sound
        SoundManager.instance.LevelFailedSound();
        // PlayzhubEventHandler.InterimBreak();
    }
    //#endregion

    //#region -OnRetryClick
    async OnRetryClick(_eventData): Promise<void> {
        GA.GameAnalytics.addDesignEvent('ui:replay_clicked');
        if (GameManager.instance.isGamePaused) return;

        // await GameManager.instance.ShowAd();

        const targerButton: Button = _eventData.currentTarget.getComponent(Button);
        targerButton.interactable = false;
        AnimationManager.ButtonsInteractiveAnim(_eventData.currentTarget, Constant.BUTTON_ANIMATION_TIME_DURATION, () => {
            AnimationManager.PopupDisappearAnimation(this.levelFailedPopupNode, () => {
                targerButton.interactable = true;
                GameManager.instance.LoadNextLevel(true);// This will load the same level again
            })
        });
        SoundManager.instance.ButtonClickSound();
    }
    //#endregion

    //#region -OnHomeButtonClick
    OnHomeButtonClick(_eventData): void {
        if (GameManager.instance.isGamePaused) return;
        GA.GameAnalytics.addDesignEvent('ui:menu_clicked');
        AnimationManager.ButtonsInteractiveAnim(_eventData.currentTarget, Constant.BUTTON_ANIMATION_TIME_DURATION, () => {
            director.loadScene('SplashScene');
        });
        SoundManager.instance.ButtonClickSound();
    }
    //#endregion

    //#region -OnGameExitButtonClick
    async OnGameExitButtonClick(): Promise<void> {
        GA.GameAnalytics.addDesignEvent('ui:back_clicked');
        if (GameManager.instance.isGamePaused) return;

        await GameManager.instance.ShowAd();

        const targerButton: Button = this.exitButtonNode.getComponent(Button);
        targerButton.interactable = false;
        AnimationManager.ButtonsInteractiveAnim(this.exitButtonNode, Constant.BUTTON_ANIMATION_TIME_DURATION, () => {
            AnimationManager.PopupAppearAnimation(this.exitPopupNode, "quit_appear");
            targerButton.interactable = true;
        });
        SoundManager.instance.ButtonClickSound();
    }

    OnYesButtonClick(_eventData): void {
        if (GameManager.instance.isGamePaused) return;
        GA.GameAnalytics.addDesignEvent('ui:quit_yes_clicked');
        const gameManager = GameManager.instance;
        let currTime = Date.now();
        const time = (currTime - gameManager.gameStartedTimeSatmp) / 1000;
        gameManager.initialTimer = Date.now();
        PlayzhubEventHandler.GamePlayStopped(time.toFixed(0));

        AnimationManager.ButtonsInteractiveAnim(_eventData.currentTarget, Constant.BUTTON_ANIMATION_TIME_DURATION, () => {
            director.loadScene('SplashScene');
        });
        SoundManager.instance.ButtonClickSound();
    }

    OnNoButtonClick(_eventData): void {
        if (GameManager.instance.isGamePaused) return;
        GA.GameAnalytics.addDesignEvent('ui:quit_no_clicked');
        const targerButton: Button = _eventData.currentTarget.getComponent(Button);
        targerButton.interactable = false;
        AnimationManager.ButtonsInteractiveAnim(_eventData.currentTarget, Constant.BUTTON_ANIMATION_TIME_DURATION, () => {
            AnimationManager.PopupDisappearAnimation(this.exitPopupNode)
            this.scheduleOnce(() => {
                targerButton.interactable = true;
            }, 1);
        });
        SoundManager.instance.ButtonClickSound();
    }
    //#endregion

    //#region -OnSoundButtonClick
    OnSoundButtonClick(): void {
        if (GameManager.instance.isGamePaused) return;
        GA.GameAnalytics.addDesignEvent('ui:sound_clicked');
        const targerButton: Button = this.soundButtonNode.getComponent(Button);
        targerButton.interactable = false;
        const soundManager = SoundManager.instance;
        soundManager.ButtonClickSound();
        soundManager.SetMute();
        AnimationManager.ButtonsInteractiveAnim(this.soundButtonNode, Constant.BUTTON_ANIMATION_TIME_DURATION, this.SetSoundSprite.bind(this));
        this.scheduleOnce(() => {
            targerButton.interactable = true;
        }, 0.5);
    }

    OnMusicButtonClick(): void {
        if (GameManager.instance.isGamePaused) return;
        GA.GameAnalytics.addDesignEvent('ui:music_clicked');
        const targerButton: Button = this.musicButtonNode.getComponent(Button);
        targerButton.interactable = false;
        const soundManager = SoundManager.instance;
        soundManager.ButtonClickSound();
        soundManager.SetBackgroundMusicEnable();
        AnimationManager.ButtonsInteractiveAnim(this.musicButtonNode, Constant.BUTTON_ANIMATION_TIME_DURATION, this.SetMusicSprite.bind(this));
        this.scheduleOnce(() => {
            targerButton.interactable = true;
        }, 0.5);
    }

    SetSoundSprite(): void {
        if (!SoundManager.instance.isMuted) {
            this.soundButtonNode.getComponent(Sprite).spriteFrame = this.soundButtonNode.getComponent(Button).normalSprite;
        } else {
            this.soundButtonNode.getComponent(Sprite).spriteFrame = this.soundButtonNode.getComponent(Button).disabledSprite;
        }
    }

    SetMusicSprite(): void {
        if (!SoundManager.instance.isBackgroundAudioPlaying) {
            this.musicButtonNode.getComponent(Sprite).spriteFrame = this.musicButtonNode.getComponent(Button).normalSprite;
        } else {
            this.musicButtonNode.getComponent(Sprite).spriteFrame = this.musicButtonNode.getComponent(Button).disabledSprite;
        }
    }
    //#endregion

    //#region OnExtraWordsFound
    OnExtraWordsFound(): void {
        AnimationManager.RewardPopupAppear(this.bonusRewardsPopup);
        GameManager.instance.gameEvent.emit(GAME_EVENTS.TIMER_PAUSE);
    }
    //#endregion

    //#region OnCollectButtonClick
    OnCollectButtonClick(): void {
        if (GameManager.instance.isGamePaused) return;
        GA.GameAnalytics.addDesignEvent('ui:collect_clicked');
        const bonus = this.bonusRewardsPopup.getChildByName('Popup').getChildByName("bonus");
        const gameManager = GameManager.instance;
        gameManager.BoosterIncreament(this.tempBoosterValue[0], this.tempBoosterValue[1]);

        if (this.tempBoosterValue[0] > 0)
            AnimationManager.CollectAnimation(gameManager.buzzitIcon, this.revealHammerNode, bonus.children[0].getWorldPosition());
        else
            AnimationManager.CollectAnimation(gameManager.hintIcon, this.hintButtonNode, bonus.children[1].getWorldPosition());

        this.scheduleOnce(() => {
            gameManager.UpdateBoosterOnUi();
        }, 1)

        AnimationManager.RewardPopupDisappear(this.bonusRewardsPopup);
        this.scheduleOnce(() => {
            this.bonusRewardsPopup.active = false;
        }, 1.5);

        SoundManager.instance.BoosterCollectionSound();
        SoundManager.instance.ButtonClickSound();
        GameManager.instance.gameEvent.emit(GAME_EVENTS.TIMER_RESUME);
    }
    //#endregion

    //#region -OnClickRewardIcon
    OnClickRewardIcon(event: EventTouch): void {
        if (GameManager.instance.isGamePaused) return;

        const target: Node = event.currentTarget;
        const popup: Node = this.bonusRewardsPopup.getChildByName('Popup');
        const bonusParent: Node = popup.getChildByName("bonus");
        const claimButton: Node = popup.getChildByName("ClaimButton");

        const value: number[][] = [[1, 0], [0, 1]];
        const boosterSiblingIndex: number = target.parent.getSiblingIndex();

        bonusParent.children.forEach((child: Node, index: number) => {
            if (index === boosterSiblingIndex) {
                const glowSprite = child.children[0].getComponent(Sprite)
                child.children[1].getComponent(Button).interactable = false;
                glowSprite.enabled = true;
                glowSprite.color = new Color(255, 255, 255, 0);
                tween(child).to(0.4, { scale: new Vec3(1.2, 1.2, 1) }, { easing: 'backOut' }).start();
                tween(glowSprite).to(0.4, { color: new Color(255, 255, 255, 255) }, { easing: 'fade' }).start();
            }
            else {
                const glowSprite = child.children[0].getComponent(Sprite);
                child.children[1].getComponent(Button).interactable = true;
                glowSprite.enabled = false;
                tween(child).to(0.4, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' }).start();
                tween(glowSprite).to(0.4, { color: new Color(255, 255, 255, 0) }, { easing: 'fade' }).start();
            }
        })
        this.tempBoosterValue = value[boosterSiblingIndex];
        claimButton.getComponent(Button).interactable = true;

        SoundManager.instance.ButtonClickSound();
    }
    //#endregion

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

    //#region -OnDisable
    protected onDisable(): void {
        this.buttonsArray.forEach((_buttonNode: Node, _index: number) => {
            _buttonNode.off(Node.EventType.MOUSE_ENTER)
            _buttonNode.off(Node.EventType.MOUSE_LEAVE)
        })
    }
    //#endregion
}