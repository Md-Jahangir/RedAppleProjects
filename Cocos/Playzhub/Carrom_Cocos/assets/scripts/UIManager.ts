import { _decorator, Button, Component, director, EventTouch, Label, Node, ScrollView, Sprite, SpriteFrame, tween, Vec2, Vec3 } from 'cc';
import { GameManager } from './GameManager';
import { AnimationManager } from './utils/AnimationManger';
import { SoundManager } from './SoundManager';
import { PlayzhubEventHandler } from './playzhub/PlayzhubEventHandler';
import { Constant } from './Constant';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    //#region -Fields
    @property(Node) levelCompletePopup: Node | null = null;
    @property(Node) gameOverPopup: Node | null = null;
    @property(Node) gameExitPopup: Node | null = null;

    @property([SpriteFrame]) levelNumbersSpriteFrame: SpriteFrame[] = [];

    @property(Label) levelTypeText: Label | null = null;
    @property(Label) levelText: Label | null = null;

    @property(Node) soundButtonNode: Node | null = null;

    @property(Node) infoPageNode: Node = null!;
    private onLevelCompleteCount: number = 0;

    //#endregion

    //#region -onEnable
    protected onEnable(): void {
        this.levelCompletePopup.active = false;
        this.gameExitPopup.active = false;
        this.gameOverPopup.active = false;
        this.CursorHand(true);
    }
    //#endregion

    protected start(): void {
        this.SetSoundSprite();
    }

    //#region SetLevelTypeText
    /**
     * @description Set the level type text and Level text.
     * @param isTimeBased 
     */
    SetLevelTypeText(isTimeBased: boolean): void {
        let text = "MOVES LEFT";
        if (isTimeBased) text = "TIME LEFT";
        else text = "MOVES LEFT";

        this.levelTypeText.string = text;
        const levelTextString: string = `${GameManager.instance.currentLevel}`;
        this.levelText.string = levelTextString;
    }
    //#endregion

    //#region LevelCompletePopup
    LevelCompletePopup(): void {
        const gameManagerInstance: GameManager = GameManager.instance;
        const numberOfStars: number = gameManagerInstance.StarsAchieved();
        const levelSpriteParent: Node = this.levelCompletePopup.children[1].getChildByName("LevelIndicator");
        // AnimationManager.ShowPopup(this.levelCompletePopup, async () => {
        //     this.levelCompletePopup.active = true;
        // }, async () => {
        //     this.SetLevelSprites(gameManagerInstance.currentLevel.toString(), levelSpriteParent);
        //     this.SetAchievedStars(this.levelCompletePopup, numberOfStars, false);
        // });
        this.ExtraNodeActive(this.levelCompletePopup, false);
        this.levelCompletePopup.active = true;
        AnimationManager.playPopupAnimation(this.levelCompletePopup, 'congratulations', 'congratulations_loop', () => {
            this.ExtraNodeActive(this.levelCompletePopup, true);
            this.SetLevelSprites(gameManagerInstance.currentLevel.toString(), levelSpriteParent);
            this.SetAchievedStars(this.levelCompletePopup, numberOfStars, false);
        });

        let currTime = Date.now();
        const time = (currTime - gameManagerInstance.initialTimer) / 1000;
        gameManagerInstance.initialTimer = Date.now();
        const leftimeScore = Constant.GameData['life_time_score'] + (2 * numberOfStars);
        PlayzhubEventHandler.GameScoreUpdate(time.toFixed(0), leftimeScore.toString());
        PlayzhubEventHandler.UpdateGameLevel(time.toFixed(0), gameManagerInstance.currentLevel.toString(), "complete");

        SoundManager.instance.LevelCompleteSound();

        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "carrom_level",
            gameManagerInstance.currentLevel,
            undefined,
            leftimeScore
        );

        GA.GameAnalytics.addDesignEvent("score:carrom", leftimeScore);
    };

    async OnContinueButtonClick(_event: EventTouch): Promise<void> {
        GA.GameAnalytics.addDesignEvent('ui:next_clicked');
        this.onLevelCompleteCount++;
        if (this.onLevelCompleteCount % 3 === 0) {
            await GameManager.instance.ShowAd();
        }
        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.2, () => {
            this.ExtraNodeActive(this.levelCompletePopup, false);
            AnimationManager.reversePopupAnimation(this.levelCompletePopup, 'congratulations');
            this.scheduleOnce(() => GameManager.instance.LoadNextLevel(), 1);
        });
        SoundManager.instance.ButtonClickSound();
    };
    //#endregion

    //#region GameOverPopup
    async GameOverPopup(): Promise<void> {
        this.onLevelCompleteCount = 0;
        await GameManager.instance.ShowAd();
        const gameManagerInstance: GameManager = GameManager.instance;
        const numberOfStars: number = gameManagerInstance.StarsAchieved();
        this.ExtraNodeActive(this.gameOverPopup, false);
        this.gameOverPopup.active = true;
        AnimationManager.playPopupAnimation(this.gameOverPopup, 'try_again', null, () => {
            this.ExtraNodeActive(this.gameOverPopup, true);
            this.SetAchievedStars(this.gameOverPopup, numberOfStars, true);
        });

        let currTime = Date.now();
        const time = (currTime - gameManagerInstance.initialTimer) / 1000;
        gameManagerInstance.initialTimer = Date.now();
        PlayzhubEventHandler.UpdateGameLevel(time.toFixed(0), gameManagerInstance.currentLevel.toString(), "incomplete");

        SoundManager.instance.LevelFailedSound();

        const leftimeScore = Constant.GameData['life_time_score'] + (2 * numberOfStars);
        GA.GameAnalytics.addProgressionEvent(
            "Fail",
            "carrom_level",
            gameManagerInstance.currentLevel,
            undefined,
            leftimeScore
        );

        GA.GameAnalytics.addDesignEvent("score:carrom", leftimeScore);
    };

    async OnRetryButtonClick(_event: EventTouch): Promise<void> {
        GA.GameAnalytics.addDesignEvent('ui:replay_clicked');
        await GameManager.instance.ShowAd();
        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.2, () => {
            this.ExtraNodeActive(this.gameOverPopup, false);
            AnimationManager.reversePopupAnimation(this.gameOverPopup, 'try_again');
            this.scheduleOnce(() => GameManager.instance.LoadNextLevel(true), 1);
        });
        SoundManager.instance.ButtonClickSound();
    };
    //#endregion

    //#region OnBackButtonClick
    async OnBackButtonClick(_event: EventTouch): Promise<void> {
        GA.GameAnalytics.addDesignEvent('ui:back_clicked');
        await GameManager.instance.ShowAd();
        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.2, () => {
            this.gameExitPopup.active = true;
            AnimationManager.playPopupAnimation(this.gameExitPopup, 'quit', null, () => {
                this.scheduleOnce(() => { director.pause(); }, 0.2);
            });
        });
        SoundManager.instance.ButtonClickSound();
    };

    OnGameExit(_event: EventTouch): void {
        const currentTarget: Node = _event.currentTarget;
        if (currentTarget.name === 'Yes') {
            GA.GameAnalytics.addDesignEvent('ui:quit_yes_clicked');
        } else {
            GA.GameAnalytics.addDesignEvent('ui:menu_clicked');
        }
        director.resume();
        let currTime = Date.now();
        const gameManager = GameManager.instance;
        const time = (currTime - gameManager.gameStartedTimeSatmp) / 1000;
        gameManager.initialTimer = Date.now();
        PlayzhubEventHandler.GamePlayStopped(time.toFixed(0));
        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.3, () => {
            director.loadScene("MenuScene");
        });
        SoundManager.instance.ButtonClickSound();
    };

    OnRestart(): void {
        director.loadScene("SinglePlayer");
    };

    OnGameExitCancel(_event: EventTouch): void {
        GA.GameAnalytics.addDesignEvent('ui:quit_no_clicked');
        director.resume();
        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.2, () => {
            AnimationManager.reversePopupAnimation(this.gameExitPopup, 'quit');
        });
        SoundManager.instance.ButtonClickSound();
    };
    //#endregion

    //#region SetLevelSprites
    SetLevelSprites(_level: string, levelSpriteParent: Node): void {
        levelSpriteParent.children.forEach((child: Node, index: number) => {
            child.active = false;
            if (index < _level.length) {
                child.setScale(new Vec3(0.8, 0.8, 0.8));
                const digit = _level[index];
                child.getComponent(Sprite).spriteFrame = this.levelNumbersSpriteFrame[digit];
                child.active = true;

                //Tween animation: scale pop-in
                tween(child)
                    .delay(index * 0.1) // slight delay for each digit
                    .to(0.2, { scale: new Vec3(1.2, 1.2, 1.2) }, { easing: 'backOut' })
                    .to(0.1, { scale: new Vec3(1, 1, 1) })
                    .start();
            } else {
                child.active = false;
            };
        });
    };
    //#endregion

    //#region SetAchievedStars
    SetAchievedStars(popupParent: Node, numberOfStars: number, isGameOver: boolean): void {
        const popup: Node = popupParent.getChildByName('popup')
        const starNode: Node = popup.getChildByName("Stars");
        if (isGameOver) {
            const levelText: Node = popup.getChildByName('LevelText');
            levelText.children[0].getComponent(Label).string = `LEVEL ${GameManager.instance.currentLevel}`;
            tween(levelText.children[0])
                .to(0.15, { scale: new Vec3(1.2, 0.8, 1) }, { easing: 'quadOut' })
                .to(0.15, { scale: new Vec3(0.8, 1.2, 1) }, { easing: 'quadOut' })
                .to(0.1, { scale: new Vec3(1.1, 0.9, 1) }, { easing: 'quadOut' })
                .to(0.1, { scale: Vec3.ONE }, { easing: 'backOut' })
                .start();
        }

        starNode.children.forEach((child: Node, index: number) => {
            if (index < numberOfStars) {
                child.active = true;
                child.setScale(new Vec3(0, 0, 0));

                tween(child)
                    .delay(index * 0.2)
                    .to(0.2, { scale: new Vec3(1.2, 1.2, 1.2) }, { easing: 'backOut' })
                    .to(0.1, { scale: new Vec3(1, 1, 1) })
                    .start();
            } else {
                child.active = false;
            };
        });
    };
    //#endregion

    //#region OnSoundButtonClick
    OnSoundButtonClick(_event: EventTouch): void {
        GA.GameAnalytics.addDesignEvent('ui:sound_clicked');
        const targerButton: Button = this.soundButtonNode.getComponent(Button);
        targerButton.interactable = false;
        const soundManager = SoundManager.instance;
        soundManager.ButtonClickSound();
        soundManager.SetMute();
        AnimationManager.ButtonsInteractiveAnim(this.soundButtonNode, 0.2, this.SetSoundSprite.bind(this));
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
    //#endregion

    //#region InfoPage
    InfoPage(): void {
        const isInfoPageOpen: boolean = this.infoPageNode.active;

        this.InfoPopupActive(!isInfoPageOpen);

        if (!isInfoPageOpen) GameManager.instance.PauseTimer();
        else GameManager.instance.ResumeTimer();
    }
    //#endregion
    private InfoPopupActive(_active: boolean): void {
        const infoButton: Node = this.node.getChildByName('infoButton');
        const infoPage: Node = this.infoPageNode.getChildByName('page');
        const scrollView = infoPage.getComponent(ScrollView);

        if (_active) {
            this.infoPageNode.active = true;
            infoPage.setScale(new Vec3(0.3, 0.3, 1));
            infoPage.setPosition(infoButton.getPosition());

            tween(infoPage)
                .to(0.4, { scale: Vec3.ONE, position: Vec3.ZERO }, { easing: 'backOut' })
                .call(() => {
                    scrollView?.scrollTo(Vec2.ONE, 0.1);
                    const icon = infoPage.getChildByName('Header').children[0];
                    icon.setScale(Vec3.ONE);
                    tween(icon)
                        .to(0.15, { scale: new Vec3(1.2, 0.8, 1) }, { easing: 'quadOut' })
                        .to(0.15, { scale: new Vec3(0.8, 1.2, 1) }, { easing: 'quadOut' })
                        .to(0.1, { scale: new Vec3(1.1, 0.9, 1) }, { easing: 'quadOut' })
                        .to(0.1, { scale: Vec3.ONE }, { easing: 'backOut' })
                        .start();

                }).start();

        } else {
            tween(infoPage)
                .to(0.3, { scale: new Vec3(0.3, 0.3, 1), position: infoButton.getPosition() }, { easing: 'backIn' })
                .call(() => {
                    this.infoPageNode.active = false;
                }).start();
        }
    };

    //#region ExtraNodeActive
    ExtraNodeActive(_popupParent: Node, _active: boolean): void {
        const popup = _popupParent.getChildByName('popup');
        popup.children.forEach((_object: Node) => {
            _object.active = _active
        });
    }
    //#endregion

    CursorHand(_isEnable: boolean): void {
        const backButton: Node = this.node.getChildByName('BackButton');
        const infoButton: Node = this.node.getChildByName('infoButton');
        const magnetBoosterButton: Node = this.node.getChildByName('MagnetBoosterButton');
        const buttons: Node[] = [
            backButton, this.soundButtonNode, infoButton, magnetBoosterButton
        ];

        this.AddOrRemoveCursorEvent(buttons, _isEnable);
    }

    private AddOrRemoveCursorEvent(_buttons: Node[], _isEnable: boolean): void {
        for (let i = 0; i < _buttons.length; i++) {
            const btn = _buttons[i];
            if (_isEnable) {
                btn.on(Node.EventType.MOUSE_ENTER, Constant.onMouseEnter, this);
                btn.on(Node.EventType.MOUSE_LEAVE, Constant.onMouseLeaveOrUp, this);
                btn.on(Node.EventType.MOUSE_UP, Constant.onMouseLeaveOrUp, this);
            } else {
                btn.off(Node.EventType.MOUSE_ENTER, Constant.onMouseEnter, this);
                btn.off(Node.EventType.MOUSE_LEAVE, Constant.onMouseLeaveOrUp, this);
                btn.off(Node.EventType.MOUSE_UP, Constant.onMouseLeaveOrUp, this);
            }
        }
    }

    protected onDisable(): void {
        this.CursorHand(false);
    }

    //#region Not Usual
    // QueenPocketUIProfileUpdate(): void {
    //     if (GameManager.instance.playerTurn) {
    //         this.EnableQueen(true, true, true);
    //     } else {
    //         this.EnableQueen(false, true, true);
    //     }
    // }

    // QueenCoveredUIProfileUpdate(): void {
    //     if (GameManager.instance.playerTurn) {
    //         this.EnableQueen(true, false, true);
    //     } else {
    //         this.EnableQueen(false, false, true);
    //     }
    // }

    // QueenCoveredFailedUIprofileUpdate(): void {
    //     this.EnableQueen(false, false, false);
    // }

    // EnableQueen(_isPlayer: boolean, _isGreyscale: boolean, _isQueenPocket: boolean): void {
    //     // const queenCoinIconPlayer = this.playerScoreNode.getChildByName("queenIcon");
    //     // if (_isQueenPocket) {
    //     //     queenCoinIconPlayer.active = _isPlayer;
    //     //     queenCoinIconPlayer.getComponent(Sprite).color = _isGreyscale ? Color.GRAY : Color.WHITE;
    //     // } else {
    //     //     queenCoinIconPlayer.active = _isQueenPocket;
    //     // }
    // }

    // SetLevelSprites(_level: string, levelSpriteParent: Node): void {
    //     levelSpriteParent.children.forEach((child: Node, index: number) => {
    //         if (index < _level.length) {
    //             child.active = true;
    //             child.getComponent(Sprite).spriteFrame = this.levelNumbersSpriteFrame[`${_level[index]}`];
    //         } else {
    //             child.active = false;
    //         }
    //     })
    // };

}
