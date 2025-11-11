import { Constant } from "./Constant";
import GameUI from "./GameUI.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler.js";
import { Server } from "./Server.js";
import { AdSDK } from './AdSDK.js';
// import AdManager from "../lib/AdManager.js";
import AdManager from "./AdManager.js";
import * as GA from "gameanalytics";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        this.gameUI = new GameUI(this);
        this.rotationSpeed = 1;
        this.angleRange = [25, 155];
        this.visibleTargets = 7;
        this.bgColors = [0x2c294A, 0x952749, 0x0c1931, 0x58610E, 0x392257, 0x283D52];
        this.gameOverText = null;
        this.bestScore = null;
        this.scoretext = null
        this.shadowImage = null;
        this.quitButton = null;
        this.noButton = null;
        this.yesButton = null;
        this.arm = null;
        this.gameOverScoreText = null;
        this.gamebgSound = null;
        this.buttonClickSound = null;
        this.ballConnectSound = null;
        this.sound = null;
        this.soundStatus = null;
        this.distanceFromTarget = null;

        this.howManyLevelsPlayed = 0;
        this.adHitFrom = '';
    }

    //#region -init
    init() {
        this.ballDistance = 203;
        this.checkBallConnectDistance = 90;
        this.timerPause = 1;
        this.gameBg = null;
        this.timerStartLimit = 0;
        this.rotationCounter = 0;
        this.timer = 10;
        this.timerLoop;

        this.scoreCount = 0;
        this.finalScoreCount = 0;

        this.balls = [];
        this.rotatingBall = 1;
        this.saveRotationSpeed;
        this.isPaused = false;
        this.soundCounter = 0;

        this.gameCounter = 0;
        this.randomgameBg = 1;

        this.totalLife = [];
        this.livesRemain = 3;
    }
    //#endregion

    // InitializeAdSdk() {
    //     this.HideAdDiv();
    //     this.adSdk = new AdSDK({
    //         injectionElementId: Constant.adDivId,
    //         apiKey: Constant.adApiKey
    //     });

    //     this.adSdk.onStatus((status) => {
    //         this.OnGetStatus(status);
    //     });

    //     this.adSdk.onError((error) => {
    //         this.OnGetError();
    //     });
    // };

    // OnGetError() {
    //     setTimeout(() => {
    //         console.log('OnGetError');
    //         this.ControlFunctionalityOnAdStatus();
    //     }, 1000);
    // }

    // OnGetStatus(_status) {
    //     switch (_status.type) {
    //         case 'click':
    //             console.log('case click');
    //             break;

    //         case 'loaded':
    //             console.log('case loaded');
    //             break;

    //         case 'started':
    //             console.log('case started');
    //             break;

    //         case 'firstQuartile':
    //             console.log('case firstQuartile');
    //             break;

    //         case 'midpoint':
    //             console.log('case midpoint');
    //             break;

    //         case 'thirdQuartile':
    //             console.log('case thirdQuartile');
    //             break;

    //         case 'complete':
    //             console.log('case complete');
    //             this.ControlFunctionalityOnAdStatus();
    //             break;

    //         case 'allAdsCompleted':
    //             console.log('case allAdsCompleted');

    //             break;

    //         case 'paused':
    //             console.log('case paused');
    //             break;

    //         case 'skip':
    //             console.log('case skip');
    //             this.ControlFunctionalityOnAdStatus();
    //             break;

    //         case 'manuallyEnded':
    //             console.log('case manuallyEnded');
    //             this.ControlFunctionalityOnAdStatus();
    //             break;

    //         default:
    //             break;
    //     }
    // };

    async ShowAd() {

        const adManager = AdManager.getInstance();
        try {
            GA.GameAnalytics.addDesignEvent("ad:requested");
            await adManager.RequestAdAsync();
            // this.ResumeGame();
            // adManager.requestAdAsync().then(() => {
            // });

        } catch (e) {
            console.error("Ad error:", e);
        }
        // this.ShowAdDiv();
        // this.adSdk.showAd();

    };

    // ShowAdDiv() {
    //     const adContainer = document.getElementById('applixir-ad-container');
    //     adContainer.style.display = 'block';
    // };

    // HideAdDiv() {
    //     const adContainer = document.getElementById('applixir-ad-container');
    //     if (adContainer) {
    //         adContainer.innerHTML = '';
    //     }
    //     adContainer.style.display = 'none';
    // };

    // async ControlFunctionalityOnAdStatus() {
    //     // console.log(' ControlFunctionalityOnAdStatus', this.adHitFrom);
    //     // if (this.adHitFrom === 'reload') {
    //     //     setTimeout(() => {
    //     //         this.RestartGameScene();
    //     //     }, 100);
    //     // } else if (this.adHitFrom === 'complete') {

    //     // }
    //     await this.ShowAd();
    //     this.RestartGameScene();

    // };

    // async IncrementLevelAndShowAd() {
    //     this.howManyLevelsPlayed += 1;
    //     if (this.howManyLevelsPlayed === 3) {
    //         await this.ShowAd();
    //         this.howManyLevelsPlayed = 0;
    //     } else { }
    // };

    //#region create
    create(data) {
        // this.InitializeAdSdk();

        Constant.playClicked++;
        // PlayzhubEventHandler.AdStarted(this.PauseGame.bind(this));
        // PlayzhubEventHandler.AdCompleted(this.ResumeGame.bind(this));
        PlayzhubEventHandler.AdStarted(this.OnAdStarted.bind(this));
        PlayzhubEventHandler.AdCompleted(this.OnAdCompleted.bind(this));

        PlayzhubEventHandler.GamePlayStarted(Constant.playClicked);
        this.ballDistance = this.ballDistance * Constant.scaleFactor;
        this.checkBallConnectDistance = this.checkBallConnectDistance * Constant.scaleFactor;
        Constant.gameStartTime = Date.now();
        this.remainingTime = data.remainingTime;
        this.rotationSpeed = 4;
        this.gameCounter++;
        if (this.gameCounter == 1) {
            this.gamebgSound = this.sound.add('bg_music');
            this.buttonClickSound = this.sound.add('button_click_sound');
            this.ballConnectSound = this.sound.add('ball_connect');
        }
        this.timer = 10;

        if (this.gameCounter == 1) {
            this.gameBg = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'loading_bg').setScale(1.2 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
        } else {
            this.randomgameBg = this.GetRandomNumber();
            this.gameBg = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'bg_' + this.randomgameBg).setScale(1.2 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
        }
        this.gameBg.setInteractive({ useHandCursor: true });
        if (localStorage.getItem('sound_status') == null) {
            localStorage.setItem('sound_status', 1);
        } else {
            localStorage.setItem("sound_status", 0);
        }
        let scoreFontStyle = { fontFamily: 'Aileron-Black', fontSize: "62px", fill: '#fff', fontStyle: 'bold', align: 'center', lineSpacing: 10 };

        // if (this.sys.game.device.os.iOS) {
        //     this.scoretext = this.add.text(Constant.game.config.width / 2, Constant.game.config.height / 2 - (Constant.game.config.height / 2.4), "score : " + this.scoreCount, scoreFontStyle).setScale(1 * Constant.scaleFactorY).setOrigin(0.5);
        // } else {
        // }
        this.scoretext = this.add.text(Constant.game.config.width / 2, Constant.game.config.height / 2 - (Constant.game.config.height / 2.2), "score : " + this.scoreCount, scoreFontStyle).setScale(1 * Constant.scaleFactorY).setOrigin(0.5);
        this.CreateGameOverText();
        this.CreateGameOverScoreText();
        this.InitiateGame();
        this.CreateLifeLeftText();

        this.gameplayOverlay = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'transparent_image').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
        this.gameplayOverlay.setInteractive({ useHandCursor: true });
        this.gameplayOverlay.alpha = 0.001;
        this.gameplayOverlay.visible = false;
        // if (this.sys.game.device.os.iOS) {
        //     this.backbutton = this.add.image(Constant.game.config.width / 2 - (Constant.game.config.width / 2.8), Constant.game.config.height / 2 - (Constant.game.config.height / 2.5), 'back').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
        // } else {
        // }
        this.backbutton = this.add.image(Constant.game.config.width / 2 - (Constant.game.config.width / 2.8), Constant.game.config.height / 2 - (Constant.game.config.height / 2.2), 'back').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5);

        this.backbutton.alpha = 1;
        this.backbutton.setInteractive({ useHandCursor: true });
        this.backbutton.on('pointerdown', this.BackButtonPressed, this);
        this.backbutton.on('pointerup', this.BackButtonReleased, this);

        // if (this.sys.game.device.os.iOS) {
        //     this.soundButton = this.add.sprite(Constant.game.config.width / 2 + (Constant.game.config.width / 2.7), Constant.game.config.height / 2 - (Constant.game.config.height / 2.5), 'sound').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
        // } else {
        // }
        this.soundButton = this.add.sprite(Constant.game.config.width / 2 + (Constant.game.config.width / 2.7), Constant.game.config.height / 2 - (Constant.game.config.height / 2.2), 'sound').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
        this.soundButton.setInteractive({ useHandCursor: true })
        this.soundButton.on('pointerdown', this.SoundButtonPressed, this)
        this.soundButton.on('pointerup', this.SoundButtonReleased, this)
        if (localStorage.getItem("sound_status") == 0) {
            this.soundButton.setFrame(0)
            // 
        } else {
            this.soundButton.setFrame(1)
        }
        this.soundButton.alpha = 1;
        this.shadowImage = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'infoShadow').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
        this.quitButton = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'quit').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
        this.noButton = this.add.image(Constant.game.config.width / 2 - (Constant.game.config.width / 4.4), Constant.game.config.height / 2 + (Constant.game.config.height / 4.8), 'no').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
        this.yesButton = this.add.image(Constant.game.config.width / 2 + (Constant.game.config.width / 4.4), Constant.game.config.height / 2 + (Constant.game.config.height / 4.8), 'yes').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
        this.shadowImage.visible = false;
        this.quitButton.visible = false;
        this.noButton.visible = false;
        this.yesButton.visible = false;
        if (localStorage.getItem('sound_status') == 0) {
            this.PlayBgSound();
        }
        this.base = this.add.image(Constant.game.config.width / 2, Constant.game.config.height - (Constant.game.config.height / 24), 'base').setScale(Constant.scaleFactorX, 1 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
        // this.stopWatch = this.add.image(this.base.x - (Constant.game.config.width / 2.5), this.base.y, 'stopwatch').setScale( 1 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
        for (let i = 0; i < 3; i++) {
            let totalLife = this.add.image(0, 0, 'lifefull').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5);
            totalLife.setPosition(this.base.x + (Constant.game.config.width / 4) + (i * (totalLife.displayWidth * 1.2)), this.base.y);
            totalLife.setData({ lifeRemain: i });
            this.totalLife.push(totalLife);
        }

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "connect_ball_endless"
        );
    };
    //#endregion

    //#region -Timer Related Function
    CreateTimer() {
        this.TimedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.UpdateTime,
            callbackScope: this,
            loop: true
        });
    };
    UpdateTime() {
        if (Constant.timeToEnd > 0) {
            Constant.timeToEnd--;
            this.DisplayTimeFormat(Constant.timeToEnd);
        } else {
            this.StopGameSounds();
            // this.CallScoreSendAPI();
        }
    };
    DisplayTimeFormat(_time) {
        let minutes = parseInt(_time / 60, 10);
        let seconds = parseInt(_time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        this.gameTimerText.setText(minutes + ":" + seconds);
    }
    //#endregion

    //#region -InitGame
    InitiateGame() {
        this.destroy = false;
        this.changeBall = false;
        this.saveRotationSpeed = this.rotationSpeed;
        this.tintColor = this.bgColors[Phaser.Math.Between(0, this.bgColors.length - 1)];
        this.tintColor2 = this.bgColors[this.randomgameBg - 1];
        this.targetArray = [];
        this.steps = 0;
        this.rotatingDirection = Phaser.Math.Between(0, 1);
        this.gameGroup = this.add.container();
        this.targetGroup = this.add.container();
        this.ballGroup = this.add.container();
        this.gameGroup.add(this.targetGroup);
        this.gameGroup.add(this.ballGroup);
        this.arm = this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 4 * 2.7, "arm").setScale(Constant.scaleFactorY);
        this.arm.setOrigin(0, 0.5);
        this.ballGroup.add(this.arm)
        this.balls = [
            this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 4 * 2.7, "ball").setScale(Constant.scaleFactorY),
            this.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, "ball").setScale(Constant.scaleFactorY)
        ]
        this.balls[0].setOrigin(0.5);
        this.balls[1].setOrigin(0.5);
        this.ballGroup.add(this.balls[0]);
        this.ballGroup.add(this.balls[1]);
        this.rotationAngle = 0;
        this.rotatingBall = 1;
        this.target = this.add.image(0, 0, "target").setScale(Constant.scaleFactorY);
        this.target.setOrigin(0.5);
        if (this.gameCounter == 1) {
            this.target.setTint('0x302748');
        } else {
            this.target.setTint(this.tintColor2);
        }
        this.target.x = this.balls[0].x;
        this.target.y = this.balls[0].y;
        this.targetGroup.add(this.target);
        this.targetArray.push(this.target);
        this.gameBg.on('pointerdown', this.ChangeBall, this);
        for (let i = 0; i < this.visibleTargets; i++) {
            this.scoreCount = 0;
            this.AddTarget();
        }
        let timeStyle = {
            fontFamily: 'Aileron-Regular', fontSize: "62px", fill: '#fff', fontStyle: 'bold', align: 'center', lineSpacing: 10
        };
        this.gameTimerText = this.add.text(Constant.game.config.width / 6.5, (Constant.game.config.height / 1.06), "", timeStyle).setScale(1 * Constant.scaleFactorY);
        this.gameTimerText.depth = 2;
        // this.CreateTimer();

    }
    //#endregion

    //#region -Life Related Function
    CreateLifeLeftText() {
        let _lifeRemain = 3;
        var lifeLeftStyle = { fontFamily: 'Aileron-Black', fontSize: "62px", fill: '#fff', fontStyle: 'bold', align: 'center', lineSpacing: 14, wordSpacing: 20 };
        this.lifeLeftText = this.add.text(Constant.game.config.width / 2 - Constant.game.config.height, Constant.game.config.height / 2, `${_lifeRemain}   Life   Left !`, lifeLeftStyle).setOrigin(0.5).setScale(Constant.scaleFactorX);
    }
    ShowLifeLeftText(_lifeRemain) {
        this.lifeLeftText.setText(`${_lifeRemain} Life Left !`);
        this.tweens.add({
            targets: [this.lifeLeftText],
            duration: 1000,
            ease: 'Linear',
            x: Constant.game.config.width / 2,
            onComplete: () => {
                this.tweens.add({
                    targets: [this.lifeLeftText],
                    duration: 600,
                    delay: 800,
                    ease: 'Linear',
                    x: Constant.game.config.width + Constant.game.config.width / 2,
                    onComplete: () => {
                        this.lifeLeftText.setPosition(Constant.game.config.width / 2 - Constant.game.config.height, Constant.game.config.height / 2);
                        this.isPaused = false;
                    },
                    onCompleteScope: this
                })
            },
            onCompleteScope: this
        })
    }
    //#endregion
    SetTimerText(_timeCountdown) {
        this.stopWatch.setText(_timeCountdown);
    }

    //#region -ChangeBall
    ChangeBall() {
        if (!this.isPaused) {
            if (localStorage.getItem("sound_status") == 0) {
                this.PlayButtonClickSound();
            }
            this.destroy = false;
            this.distanceFromTarget = Phaser.Math.Distance.Between(this.balls[this.rotatingBall].x, this.balls[this.rotatingBall].y, this.targetArray[1].x, this.targetArray[1].y);
            if (this.distanceFromTarget < this.checkBallConnectDistance) {
                this.ContinueGame();
            } else {
                this.GameOver();
            }
        }
    }
    //#endregion

    //#region -ContinueGame
    ContinueGame() {
        this.rotatingDirection = Phaser.Math.Between(0, 1);
        this.tweens.add({
            targets: this.targetArray[0],
            duration: 500,
            ease: 'Cubic.Out',
            alpha: 0,
            onComplete: function (e) {
                e.destroy();
            },
            onCompleteScope: this
        })
        this.targetArray.shift();
        this.arm.setPosition(this.balls[this.rotatingBall].x, this.balls[this.rotatingBall].y)
        this.rotatingBall = 1 - this.rotatingBall;
        this.rotationAngle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(
            this.balls[1 - this.rotatingBall].x,
            this.balls[1 - this.rotatingBall].y,
            this.balls[this.rotatingBall].x,
            this.balls[this.rotatingBall].y
        )) - 90;
        this.arm.angle = this.rotationAngle + 90;

        this.UpdateBallsVisibility();
        this.ChangeBallSpeed();
        this.UpdateScoreCount();
        this.AddTarget();
        if (localStorage.getItem("sound_status") == 0) {
            this.PlayBallCollideSound();
        }

    }
    //#endregion

    //#region -Ball Visible and Speed
    UpdateBallsVisibility() {
        for (let i = 0; i < this.targetArray.length; i++) {
            this.targetArray[i].alpha += 1 / 7;
        }
    }
    ChangeBallSpeed() {
        if (this.steps > 21) {
            this.saveRotationSpeed = 4.5;
        } else if (this.steps > 42) {
            this.saveRotationSpeed = 5;
        }
        else if (this.steps > 84) {
            this.saveRotationSpeed = 6;
        }
        else if (this.steps > 120) {
            this.saveRotationSpeed = 7;
        }
        else if (this.steps > 120) {
            this.saveRotationSpeed = 7.5;
        }
    }
    //#endregion

    //#region -UpdateScoreCount
    UpdateScoreCount() {
        this.scoreCount = this.scoreCount + 1;
        this.scoretext.setText("score :" + this.scoreCount);
        this.gameOverScoreText.setText("SCORE : " + this.scoreCount)
        this.gameOverScoreText.depth = 2;
    }
    //#endregion

    //#region -AddTarget
    AddTarget() {
        this.steps++;
        this.startX = this.targetArray[this.targetArray.length - 1].x;
        this.startY = this.targetArray[this.targetArray.length - 1].y;
        this.target = this.add.image(0, 0, "target").setScale(Constant.scaleFactorY);
        this.randomAngle = Phaser.Math.Between(this.angleRange[0] + 90, this.angleRange[1] + 90);
        this.target.setOrigin(0.5);
        if (this.gameCounter == 1) {
            this.target.tint = 0x302748;
        } else {
            this.target.tint = this.tintColor2;
        }
        this.target.x = this.startX + this.ballDistance * Math.sin(Phaser.Math.DegToRad(this.randomAngle));
        this.target.y = this.startY + this.ballDistance * Math.cos(Phaser.Math.DegToRad(this.randomAngle));
        this.target.alpha = 1 - this.targetArray.length * (1 / 7);
        let style = {
            font: "bold 50px Arial",
            fill: "#" + this.tintColor.toString(16),
            align: "center"
        };
        let text = this.add.text(0, 0, this.steps.toString(), style).setScale(Constant.scaleFactorY);;
        text.setOrigin(0.5);
        text.visible = false;
        this.targetGroup.add(this.target);
        this.targetArray.push(this.target);
    }
    //#endregion

    //#region GameOver & FinishGame
    GameOver() {
        this.livesRemain--;
        if (this.livesRemain > 0) {
            this.isPaused = true;
            this.ShowLifeLeftText(this.livesRemain);
            this.totalLife.forEach(element => {
                if (element.data.list.lifeRemain == this.livesRemain) {
                    element.setTexture('lifedown');
                }
            });
        } else {

            GA.GameAnalytics.addProgressionEvent(
                "Fail",
                "connect_ball_endless",
                undefined,  // progression02
                undefined,  // progression03
                this.scoreCount
            );
            GA.GameAnalytics.addProgressionEvent(
                "Complete",
                "connect_ball_endless",
                undefined,
                undefined,
                this.scoreCount
            );

            GA.GameAnalytics.addDesignEvent("score:connect_ball", this.scoreCount);

            const currentTimeStamp = Date.now();
            const finalTime = currentTimeStamp - Constant.gameStartTime;
            // Server.PostGamePlayTimeToParent(finalTime / 1000, this.scoreCount);
            PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, this.scoreCount);
            PlayzhubEventHandler.InterimBreak();
            // this.TimedEvent.remove();
            // this.CallScoreSendAPI();
            this.FinishGame();
        }
    }
    FinishGame() {
        // await this.ShowAd();
        this.ShowAd();
        this.ShowGameOverText();
        this.ShowGameOverScore();
        this.backbutton.removeInteractive();
        this.input.off('pointerdown', this.ChangeBall, this);
        this.gameBg.removeInteractive()
        this.saveRotationSpeed = 0;
        this.arm.destroy();
        this.tweens.add({
            targets: this.balls[1 - this.rotatingBall, this.scoretext],
            duration: 1000,
            ease: 'Cubic.Out',
            alpha: 0,
        })
        this.tweens.add({
            targets: this.balls[1],
            duration: 1000,
            ease: 'Cubic.Out',
            alpha: 0,
            onComplete: () => {
            },
            onCompleteScope: this
        })
    };
    //#endregion

    //#region -CallScoreSendAPI
    CallScoreSendAPI() {
        this.StopBgSound()
        if (getMobileOperatingSystem() == "Android") {
            // sendMessage("The Game End..................................");
            // sendMessage(this.scoreCount.toString());
        }
        if (getMobileOperatingSystem() == "iOS") {
            let postdata = {
                score: this.scoreCount.toString(),
            };
            let postmessage = JSON.stringify(postdata);
            window.webkit.messageHandlers.jsHandler.postMessage(postmessage);
            window.webkit.messageHandlers.jsHandler.postMessage("The Game End.............");
        } else {
            this.TimedEvent.remove();
            this.FinishGame();
        }
    };
    //#endregion

    //#region -GameOver Text 
    CreateGameOverText() {
        var gameOverTextstyle = { fontFamily: 'Aileron-Black', fontSize: "72px", fill: '#fff', fontStyle: 'bold', align: 'center', lineSpacing: 10 };
        this.gameOverText = this.add.text(Constant.game.config.width / 2, Constant.game.config.height / 2 - (Constant.game.config.height / 5), "GAME OVER !", gameOverTextstyle).setScale(Constant.scaleFactorY);
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.alpha = 0;
        this.gameOverText.depth = 2;
        this.menuButton = this.add.image((Constant.game.config.width / 2) - (Constant.game.config.width / 5), (Constant.game.config.height / 1.3), 'menu').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5).setVisible(false);
        this.menuButton.setInteractive({ useHandCursor: true });
        this.menuButton.depth = 2;
        this.replayButton = this.add.image((Constant.game.config.width / 2) + (Constant.game.config.width / 5), Constant.game.config.height / 1.3, 'replay').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5).setVisible(false);
        this.replayButton.setInteractive({ useHandCursor: true });
        this.replayButton.depth = 2;
        // this.adButton = this.add.image(this.replayButton.x + this.replayButton.displayWidth / 2 - 15 * Constant.scaleFactorX, this.replayButton.y - this.replayButton.displayHeight / 2, 'ad_icon').setScale(1 * Constant.scaleFactorY).setOrigin(0.5, 0.5).setVisible(false);
        // this.adButton.depth = 2;
    }
    CreateGameOverScoreText() {
        var gameOverScoreTextstyle = { fontFamily: 'Aileron-Regular', fontSize: "52px", fill: '#fff', fontStyle: 'bold', align: 'center', lineSpacing: 10 };
        this.gameOverScoreText = this.add.text(Constant.game.config.width / 2, Constant.game.config.height / 2 - (Constant.game.config.height / 16), "SCORE :" + this.scoreCount, gameOverScoreTextstyle).setScale(Constant.scaleFactorY);
        this.gameOverScoreText.depth = 2;
        this.gameOverScoreText.setOrigin(0.5);
        this.gameOverScoreText.alpha = 0;
    }

    ShowGameOverText() {
        this.StopGameSounds();
        this.tweens.add({
            targets: this.gameOverText,
            duration: 700,
            ease: 'Linear',
            scaleX: Constant.scaleFactorY * 1.1,
            scaleY: Constant.scaleFactorY * 1.1,
            alpha: 1,
        })
        this.menuButton.setVisible(true);
        this.replayButton.setVisible(true);
        // this.adButton.setVisible(true);
        this.menuButton.on('pointerdown', function () {
            this.livesRemain = 3;
            this.isPaused = false;
            this.totalLife = [];
            this.scene.stop('GameScene');
            this.scene.start('TitleScene');
        }, this);
        this.replayButton.on('pointerdown', async function () {
            // this.adHitFrom = 'reload'
            // await this.ShowAd();
            this.isPaused = false;
            this.totalLife = [];
            this.scoreCount = 0;
            this.livesRemain = 3;
            this.scene.restart();
        }, this);
    }

    RestartGameScene() {
        this.isPaused = false;
        this.totalLife = [];
        this.scoreCount = 0;
        this.livesRemain = 3;
        this.scene.restart();
    };

    ShowGameOverScore() {
        this.tweens.add({
            targets: this.gameOverScoreText,
            duration: 700,
            ease: 'Linear',
            scaleX: Constant.scaleFactorY * 1.1,
            scaleY: Constant.scaleFactorY * 1.1,
            alpha: 1,
        })
    }
    //#endregion

    //#region -GetRandomNumber
    GetRandomNumber() {
        let rnd = Math.floor(Math.random() * (6 - 1)) + 1;
        return rnd;
    }
    //#endregion

    //#region -Sounds
    PlayButtonClickSound() {
        this.buttonClickSound.play();
    }
    PlayBallCollideSound() {
        this.ballConnectSound.play();
    }
    PlayBgSound() {
        this.gamebgSound.play();
    }
    StopButtonClickSound() {
        this.buttonClickSound.stop();
    }
    StopBgSound() {
        this.gamebgSound.stop();
    }
    StopballCollideSound() {
        this.ballConnectSound.stop();
    }
    //#endregion

    //#region -BackButton Logics
    EnableDisableGameplayPageButtonInput(status) {
        this.gameplayOverlay.visible = status;
    }
    BackButtonPressed() {
        GA.GameAnalytics.addDesignEvent("ui:back_clicked");
        if (localStorage.getItem("sound_status") !== 0) {
            this.StopButtonClickSound()
        } else {
            this.PlayButtonClickSound();
        }
        this.StopGameSounds();
    }
    BackButtonReleased() {
        this.ShowAd();
        this.isPaused = true;
        this.gameBg.removeInteractive();
        this.ShowQuitPopup();
    }
    //#endregion

    //#region -ShowQuitPopup
    ShowQuitPopup() {
        this.shadowImage.visible = true;
        this.quitButton.visible = true;
        this.noButton.visible = true;
        this.yesButton.visible = true;
        this.noButton.setInteractive({ useHandCursor: true });
        this.yesButton.setInteractive({ useHandCursor: true });
        this.noButton.on('pointerdown', this.ResumeGame, this);
        this.yesButton.on('pointerdown', this.EndGame, this);
    }
    //#endregion

    OnAdStarted() {
        console.log('OnAdStarted');
        GA.GameAnalytics.addDesignEvent("ad:started");
        this.PauseGame();
    };
    OnAdCompleted() {
        console.log('OnAdCompleted');
        GA.GameAnalytics.addDesignEvent("ad:completed");
    };

    //#region pause game 
    PauseGame() {
        console.log('PauseGame: ');
        this.isPaused = true;
        this.gameBg.removeInteractive();
        PlayzhubEventHandler.GamePlayPaused();
    };
    //#region -Resume & EndGame
    ResumeGame() {
        console.log('ResumeGame: ');
        this.PlayBgSound();
        this.isPaused = false;
        this.gameBg.setInteractive({ useHandCursor: true });
        this.shadowImage.visible = false;
        this.quitButton.visible = false;
        this.noButton.visible = false;
        this.yesButton.visible = false;
        this.noButton.inputEnabled = false;
        this.yesButton.inputEnabled = false;
        PlayzhubEventHandler.GamePlayResumed();
    }

    EndGame() {
        const currentTimeStamp = Date.now();
        const finalTime = currentTimeStamp - Constant.gameStartTime;
        // Server.PostGameQuitToParent(finalTime / 1000, this.steps);
        PlayzhubEventHandler.GamePlayStopped(finalTime / 1000);
        this.isPaused = false;
        this.scoreCount = 0;
        this.gameBg.setInteractive({ useHandCursor: true });
        // this.TimedEvent.remove();
        // this.CallScoreSendAPI();
        this.scene.stop('GameScene');
        Constant.game.scene.start('TitleScene')
    }
    //#endregion

    //#region -SoundButton Logics
    SoundButtonPressed() {
        GA.GameAnalytics.addDesignEvent("ui:sound_clicked");
    }
    SoundButtonReleased() {
        if (localStorage.getItem("sound_status") == 0) {
            localStorage.setItem("sound_status", 1);
            this.soundButton.setFrame(1);
            this.StopGameSounds();
        } else {
            localStorage.setItem("sound_status", 0);
            this.soundButton.setFrame(0);
            this.PlayGameSounds()
        }
    }
    //#endregion

    //#region -Game Sounds
    StopGameSounds() {
        this.StopBgSound();
        this.StopButtonClickSound();
        this.StopballCollideSound();
    }
    PlayGameSounds() {
        this.PlayBgSound();
        this.PlayButtonClickSound();
        this.PlayBallCollideSound();
    }
    //#endregion

    //#region -Update
    update(t, dt) {
        if (!this.isPaused) {
            this.distanceFromTarget = Phaser.Math.Distance.Between(this.balls[this.rotatingBall].x, this.balls[this.rotatingBall].y, this.targetArray[1].x, this.targetArray[1].y);
            if (this.distanceFromTarget > this.checkBallConnectDistance && this.destroy && this.steps > this.visibleTargets) {
                this.GameOver();
            }
            this.rotationAngle = (this.rotationAngle + this.saveRotationSpeed * (this.rotatingDirection * 2 - 1)) % 360;
            this.arm.angle = this.rotationAngle + 90;
            this.balls[this.rotatingBall].x = this.balls[1 - this.rotatingBall].x - this.ballDistance * Math.sin(Phaser.Math.DegToRad(this.rotationAngle));
            this.balls[this.rotatingBall].y = this.balls[1 - this.rotatingBall].y + this.ballDistance * Math.cos(Phaser.Math.DegToRad(this.rotationAngle));
            this.distanceX = this.balls[1 - this.rotatingBall].x - Constant.game.config.width / 2;
            this.distanceY = this.balls[1 - this.rotatingBall].y - Constant.game.config.height / 4 * 2.7;
            this.gameGroup.x = Phaser.Math.Interpolation.Linear([this.gameGroup.x, -this.distanceX], 0.05);
            this.gameGroup.y = Phaser.Math.Interpolation.Linear([this.gameGroup.y, -this.distanceY], 0.05);

        }
    }
    //#endregion
}