import { Constant } from "../Constant";
import ButtonTween from "../game_objects/ButtonTween";
import { AudioManager } from "../media/AudioManager";
import { PlayzhubEventHandler } from "../PlayzhubEventHandler";
import gsap from "gsap";
import * as GA from "gameanalytics";

class GameoverPopup {
    constructor(scene) {
        this.scene = scene;
        this.winPopupContainer = null;
        this.losePopupContainer = null;
        this.buttonContainer = null;

        this.CreateOverlay();
        this.CreateWinPopup();
        this.CreateLosePopup();
        this.CreatePopupBtns();
        this.HideWinPopup();
        this.HideLosePopup();
        this.HidePopupBtns();
        this.HideOverlay();
    }

    CreateOverlay() {
        this.overlayOne = this.scene.add.image(0, 0, 'rules_overlay').setOrigin(0.5).setInteractive().setDepth(6);
    }

    CreateWinPopup() {
        this.winPopupContainer = this.scene.add.container().setDepth(6)//.setDepth(2);

        let fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '60px', fill: '#C46957', align: 'center' };
        let text = 0;
        this.gameScoreTxt = this.scene.add.text(0, this.scene.qPopupBase.y + 70, text, fontTextStyle).setOrigin(0.5);
        console.log("game score text", this.gameScoreTxt._text);

        this.winPopupContainer.add([this.scene.qPopupBase, this.gameScoreTxt]);
    }

    CreateLosePopup() {
        this.losePopupContainer = this.scene.add.container().setDepth(6);//.setDepth(2);

        let fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '60px', fill: '#C46957', align: 'center' };
        let text = 0;
        this.lScoreTxt = this.scene.add.text(this.scene.qPopupBase.x, this.scene.qPopupBase.y + 60, text, fontTextStyle).setOrigin(0.5);

        this.losePopupContainer.add([this.scene.qPopupBase, this.lScoreTxt]);
    }

    CreatePopupBtns() {
        this.buttonContainer = this.scene.add.container().setDepth(6);

        this.menuBtn = this.scene.add.image(this.scene.qPopupBase.x - 165, (this.scene.qPopupBase.y + this.scene.qPopupBase.height / 2.2), 'ui', 'blue_button').setOrigin(0.5).setInteractive({ useHandCursor: true }).setScale(0);
        let fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '50px', fill: '#FFFFFF', align: 'center' };
        let text = 'MENU';
        this.menuTxt = this.scene.add.text(this.menuBtn.x, this.menuBtn.y - 10, text, fontTextStyle).setOrigin(0.5).setScale(0);
        this.menuTxt.setStroke('#004794', 6);
        this.replayBtn = this.scene.add.image(this.scene.qPopupBase.x + 165, (this.scene.qPopupBase.y + this.scene.qPopupBase.height / 2.2), 'ui', 'yellow_button').setOrigin(0.5).setInteractive({ useHandCursor: true }).setScale(0);
        fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '50px', fill: '#FFFFFF', align: 'center' };
        text = 'REPLAY';
        this.replayTxt = this.scene.add.text(this.replayBtn.x + 2, this.replayBtn.y - 10, text, fontTextStyle).setOrigin(0.5).setScale(0);
        this.replayTxt.setStroke('#a73411', 6);

        this.buttonContainer.add([this.menuBtn, this.menuTxt, this.replayBtn, this.replayTxt]);

        this.menuBtn.on('pointerup', this.OnClickingMenuBtn, this);
        this.replayBtn.on('pointerup', this.OnClickingReplayBtn, this);
    }

    OnClickingMenuBtn() {
        GA.GameAnalytics.addDesignEvent('ui:menu_clicked');
        const btnTween = new ButtonTween(this.scene, this.menuBtn);
        AudioManager.PlayButtonPressAudio();
        this.scene.events.off('game_paused', this.scene.PauseAllAnims, this.scene);
        this.scene.events.off('game_resumed', this.scene.ResumeAllAnims, this.scene);
        this.scene.scene.stop('GameScene');
        this.scene.scene.start('MenuScene');
        // });
    }

    OnClickingReplayBtn() {
        GA.GameAnalytics.addDesignEvent('ui:replay_clicked');
        PlayzhubEventHandler.InterimBreak();
        const btnTween = new ButtonTween(this.scene, this.replayBtn);
        AudioManager.PlayButtonPressAudio();
        this.scene.events.off('game_paused', this.scene.PauseAllAnims, this.scene);
        this.scene.events.off('game_resumed', this.scene.ResumeAllAnims, this.scene);
        // this.btnTween.btnTween.once('complete', () => {
        PlayzhubEventHandler.RequestAD();
        // });
    }

    HideWinPopup() {
        (this.winPopupContainer.exists(this.scene.qPopupBase)) ? this.winPopupContainer.remove(this.scene.qPopupBase) : null;
        this.winPopupContainer.setVisible(false);
    }

    HideLosePopup() {
        (this.losePopupContainer.exists(this.scene.qPopupBase)) ? this.losePopupContainer.remove(this.scene.qPopupBase) : null;
        this.losePopupContainer.setVisible(false);
    }

    HidePopupBtns() {
        this.buttonContainer.setVisible(false);
    }

    ShowOverlay() {
        this.overlayOne.setVisible(true);
    }

    HideOverlay() {
        this.overlayOne.setVisible(false);
    }

    ShowWinPopup() {
        GA.GameAnalytics.addProgressionEvent(
            'Complete',
            'snake_ladder_level',
            Constant.getLevel,
            undefined,
            Constant.gameScore
        );
        GA.GameAnalytics.addDesignEvent('score:snake_ladder', Constant.gameScore);
        this.scene.qPopupBase.y = 0;
        this.scene.qPopupBase.setVisible(true);
        this.scene.qPopupBase.name = 'quit';
        this.winPopupContainer.addAt(this.scene.qPopupBase, 0);
        this.ShowOverlay();
        this.winPopupContainer.setVisible(true);
        this.ShowCongratulationAnimation();

        // console.log("the qPopupBase", this.scene.qPopupBase.animationState.timeScale);

        // this.scene.qPopupBase.animationState.timeScale = 1;

        const multiplier = (Constant.getLevel === 2) ? 2 : 1;
        Constant.gameScore += this.scene.playerArr[0].score * multiplier;
        this.SendDataToPlatform();
        AudioManager.PlayLvlCompleteAudio();
    }

    ShowPopupBtns() {
        this.buttonContainer.setVisible(true);
    }

    ShowCongratulationAnimation() {
        this.scene.qPopupBase.animationState.setAnimation(0, 'congratulation_appear', false);
        this.scene.qPopupBase.name = 'congratulation';
        this.ScoreIncrementAnimation(this.gameScoreTxt);
    }

    ScoreIncrementAnimation(_scoreTxt) {
        const startScore = 0; // or your current score
        const endScore = this.scene.playerArr[0].score; // or your target score

        const scoreObj = { value: startScore };
        _scoreTxt.setScale(1.2);

        const duration = 1.8;
        // const baseRange = 100;
        // const duration = Math.max((Math.abs(endScore - startScore) / 100) * 1.8, 0.4);

        // console.log("duration ", duration);

        const scoreTween = gsap.to(scoreObj, {
            value: endScore,
            duration: duration,
            ease: "power1.out",
            onUpdate: () => {
                _scoreTxt.text = Math.floor(scoreObj.value).toString();
            },
            onComplete: () => {
                const shrinkTween = gsap.to(_scoreTxt, {
                    delay: 0.1,
                    scaleX: 0.9,
                    scaleY: 0.9,
                    duration: 0.25,
                    ease: "power1.in",
                    onComplete: () => {
                        const bounceTween = gsap.to(_scoreTxt, {
                            scaleX: 1.2,
                            scaleY: 1.2,
                            duration: 0.25,
                            ease: "power1.out",
                            onComplete: () => {
                                // Kill all tweens and clean up
                                gsap.killTweensOf(scoreObj);
                                gsap.killTweensOf(_scoreTxt);
                                this.AnimateButtons();
                            }
                        });
                    }
                });
            }
        });
    }

    AnimateButtons() {
        this.ShowPopupBtns();
        const targets = [this.menuBtn, this.menuTxt, this.replayBtn, this.replayTxt];
        gsap.to(targets, {
            delay: 0.15,
            duration: 0.3,
            scale: 1.125,
            ease: 'expo.out',
            onComplete: () => {
                gsap.to(targets, {
                    duration: 0.2,
                    scale: 1,
                    ease: 'expo.in',
                    onComplete: () => {
                        this.menuBtn.setInteractive({ useHandCursor: true });
                        this.replayBtn.setInteractive({ useHandCursor: true });
                        gsap.killTweensOf(targets);
                    }
                });
            }
        });
    }

    ShowLosePopup() {
        GA.GameAnalytics.addProgressionEvent(
            'Fail',
            'snake_ladder_level',
            Constant.getLevel,
            undefined,
            Constant.gameScore
        );
        GA.GameAnalytics.addDesignEvent('score:snake_ladder', Constant.gameScore);
        this.scene.qPopupBase.y = 0;
        this.scene.qPopupBase.setVisible(true);
        this.scene.qPopupBase.name = 'quit';
        this.losePopupContainer.addAt(this.scene.qPopupBase, 0);
        this.ShowOverlay();
        this.losePopupContainer.setVisible(true);
        this.ShowFailAnimation();

        this.SendDataToPlatform();
        AudioManager.PlayLvlFailAudio();
    }

    ShowFailAnimation() {
        this.scene.qPopupBase.animationState.setAnimation(0, 'lost_appear', false);
        this.scene.qPopupBase.name = 'lost';
        this.ScoreIncrementAnimation(this.lScoreTxt);
    }

    SendDataToPlatform() {
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        PlayzhubEventHandler.GamePlayStopped();
        PlayzhubEventHandler.GameStateUpdate({
            'gems': Constant.gemsCollCount,
            'score': Constant.gameScore,
        });
        PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, Constant.gameScore);
        PlayzhubEventHandler.UpdateGameLevel();
    }

    ResizeGameOverPopupContainer(_newWidth, _newHeight, newScale) {
        this.overlayOne.setDisplaySize(_newWidth, _newHeight);
        this.overlayOne.setPosition(
            _newWidth / 2,
            _newHeight / 2
        );

        this.winPopupContainer?.setScale(newScale);
        this.winPopupContainer?.setPosition(_newWidth / 2, _newHeight / 2);

        this.losePopupContainer?.setScale(newScale);
        this.losePopupContainer?.setPosition(_newWidth / 2, _newHeight / 2);

        this.buttonContainer?.setScale(newScale);
        this.buttonContainer?.setPosition(_newWidth / 2, _newHeight / 2);
    }
}

export default GameoverPopup;