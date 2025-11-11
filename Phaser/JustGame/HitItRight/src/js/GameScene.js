import GameOverPopup from "../js/popups/GameOverPopup.js";
import QuitPopup from "../js/popups/QuitPopup.js";
import InstructionPopup from "../js/popups/InstructionPopup.js";
import Score from "../js/Score.js";
import { Utils } from "./Utils.js";
import { SoundManager } from "./SoundManager.js";
import { Constant } from "./Constant.js";
import { Server } from "./Server.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler.js";
import * as GA from "gameanalytics";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
        this.howManyLevelsPlayed = 0;
        this.adHitFrom = '';
    }

    init() {
        this.gameOverPopup = new GameOverPopup(this);
        this.quitPopup = new QuitPopup(this);
        this.instructionPopup = new InstructionPopup(this);
        this.scoreClassObj = new Score(this);
        this.tweenKnifePos = 0;
        this.howManyLevelsPlayed = 0;
        this.adHitFrom = '';
    }
    preload() { }

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

    ShowAd() {
        // this.ShowAdDiv();
        // this.adSdk.showAd();
        // console.log('ShowAd called');
        GA.GameAnalytics.addDesignEvent("ad:requested");
        PlayzhubEventHandler.RequestAD();
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

    // ControlFunctionalityOnAdStatus() {
    //     console.log(' ControlFunctionalityOnAdStatus', this.adHitFrom);
    //     if (this.adHitFrom === 'reload') {
    //         setTimeout(() => {
    //             this.RestartGameScene();
    //         }, 100);
    //     } else if (this.adHitFrom === 'level_complete') {

    //     }

    // };

    IncrementLevelAndShowAd() {
        this.ShowAd();
    };

    RestartGameScene() {
        this.scene.stop('GameScene');
        this.scene.restart('GameScene');
    };

    create() {
        // this.InitializeAdSdk();

        Constant.playClicked++;
        PlayzhubEventHandler.GamePlayStarted(Constant.playClicked);
        PlayzhubEventHandler.AdCompleted(this.ResumeGame.bind(this));
        PlayzhubEventHandler.AdStarted(this.PauseGame.bind(this));
        Constant.gameStartTime = Date.now();
        Constant.activeScene = 'game';
        this.game.events.on("resize", this.resize, this);

        this.isGameOver = false;
        this.canThrow = true;
        this.currentRotationSpeed = Constant.gameOptions.rotationSpeed;
        this.newRotationSpeed = Constant.gameOptions.rotationSpeed;
        this.score = 0;
        this.knifeCounter = 0;
        this.knifeBasketArray = [];
        this.knifeStandKnifeArray = [];
        this.standKnifePos = [{ x: Math.round(Constant.game.config.width / 10.3), y: Math.round(Constant.game.config.height / 1.11) },
        { x: Math.round(Constant.game.config.width / 6.53), y: Math.round(Constant.game.config.height / 1.123) },
        { x: Math.round(Constant.game.config.width / 5.11), y: Math.round(Constant.game.config.height / 1.132) },
        { x: Math.round(Constant.game.config.width / 4.14), y: Math.round(Constant.game.config.height / 1.1252) },
        { x: Math.round(Constant.game.config.width / 3.42), y: Math.round(Constant.game.config.height / 1.113) },
        { x: Math.round(Constant.game.config.width / 1.421), y: Math.round(Constant.game.config.height / 1.11) },
        { x: Math.round(Constant.game.config.width / 1.322), y: Math.round(Constant.game.config.height / 1.123) },
        { x: Math.round(Constant.game.config.width / 1.247), y: Math.round(Constant.game.config.height / 1.132) },
        { x: Math.round(Constant.game.config.width / 1.178), y: Math.round(Constant.game.config.height / 1.1252) },
        { x: Math.round(Constant.game.config.width / 1.116), y: Math.round(Constant.game.config.height / 1.113) }
        ];
        this.standKnifeAngle = [-17, -11, 0, 11, 17, -17, -11, 0, 11, 17];

        this.woodXpos = [Math.round(Constant.game.config.width / 2) - 100, Math.round(Constant.game.config.width / 2) - 50, Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.width / 2) + 50, Math.round(Constant.game.config.width / 2) + 100];
        this.woodRotation = [25, 23, 18, 21, 24];
        this.woodSpeed = [1000, 930, 900, 970, 950];
        this.woodFiveArray = [];
        this.woodArray = [];
        this.woodCounter = 0;

        this.CreateTopItem();

        this.knifeGroup = this.add.group();
        this.obstacleGroup = this.add.group();

        this.CreateKnife();
        this.CreateTarget();
        this.CreateObstcle();

        this.CreateWoodenPiece();

        this.CreateKnifeBasket();
        this.CreateKnifeStand();

        this.CreateUserInput();
        this.CreateTimerEvent();

        SoundManager.PlayBgMusic();

        this.instructionPopup.CreateInstructionPopup();

        if (Constant.timeToEnd != 0) {
        } else { }
        if (window.innerWidth >= (window.innerHeight / 1.7777777)) {
            let clientHeight = window.innerHeight;
            let clientWidth = (clientHeight / 1.77777777778);
            this.resize(clientWidth, clientHeight, (window.innerWidth / 2) - (clientWidth / 2));
        }
        else {
            let clientWidth = window.innerWidth;
            let clientHeight = window.innerHeight;
            this.resize(clientWidth, clientHeight, 0);
        }

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "hit_it_right_endless"
        );
    }
    PauseGame() {
        GA.GameAnalytics.addDesignEvent("ad:started");
        // console.log(' Paused Game ');
        // PlayzhubEventHandler.GamePlayPaused();
    }

    ResumeGame() {
        GA.GameAnalytics.addDesignEvent("ad:completed");
        // console.log(' Resume Game ');
        // PlayzhubEventHandler.GamePlayResumed();
        // setTimeout(() => {
        //     this.RestartGameScene();
        // }, 150);
    }

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
            // Server.PostGameOverToParent(Server.timerValue);
            // this.CallTheScoreSendAPI();
        }
    };
    DisplayTimeFormat(_time) {
        let minutes = parseInt(_time / 60, 10);
        let seconds = parseInt(_time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        // this.timeValueText.setText("Time Remain : " + minutes + ":" + seconds);
    };


    CreateTopItem() {
        this.gameplayBg = this.add.image(0, 0, "gameplay_bg").setOrigin(0);
        let scoreTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '90px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.scoreText = this.add.text(0, 0, Constant.score, scoreTextStyle);
        this.backButton = this.add.image(0, 0, "back_button").setOrigin(0.5);
        this.backButton.setInteractive({ useHandCursor: true });
        this.backButton.on('pointerdown', this.BackButtonPressed, this);
        this.backButton.on('pointerup', this.BackButtonReleased, this);
        this.soundButton = this.add.image(0, 0, "sound_on").setOrigin(0.5);
        this.soundButton.setInteractive({ useHandCursor: true });
        this.soundButton.on('pointerdown', this.SoundButtonPressed, this);
        this.soundButton.on('pointerup', this.SoundButtonReleased, this);
        this.DefaultSoundButton();
    }

    BackButtonPressed() {
        if (!this.isGameOver) {
            let newScale = Utils.getScale(1080, 1920, window.innerWidth, window.innerHeight);
            Utils.ButtonScaleTween(this, this.backButton, newScale);
            SoundManager.PlayButtonClickSound();
        }
    }
    BackButtonReleased() {
        if (!this.isGameOver) {
            GA.GameAnalytics.addDesignEvent("ui:back_clicked");
            this.ShowAd();
            setTimeout(() => {
                this.quitPopup.ShowQuitPopup();
                SoundManager.StopBgMusic();
                this.isGameOver = true;
            }, 100);
        }

    }

    SoundButtonPressed() {
        if (!this.isGameOver) {
            let newScale = Utils.getScale(1080, 1920, window.innerWidth, window.innerHeight);
            Utils.ButtonScaleTween(this, this.soundButton, newScale);
            SoundManager.PlayButtonClickSound();
        }
    }
    SoundButtonReleased() {
        if (!this.isGameOver) {
            GA.GameAnalytics.addDesignEvent("ui:sound_clicked");
            this.ToggleSoundButton();
        }
    }

    DefaultSoundButton() {
        if (localStorage.getItem("hit_it_right_is_sound_on") == null) {
            localStorage.setItem("hit_it_right_is_sound_on", 1);
        }
        if (localStorage.getItem("hit_it_right_is_sound_on") == 1) {
            this.soundButton.setTexture("sound_on");
        } else {
            this.soundButton.setTexture("sound_off");
        }
    }
    ToggleSoundButton() {
        if (localStorage.getItem("hit_it_right_is_sound_on") == 1) {
            localStorage.setItem("hit_it_right_is_sound_on", 0);
            this.soundButton.setTexture("sound_off");
            SoundManager.PlayButtonClickSound();
            SoundManager.StopBgMusic();
        } else {
            localStorage.setItem("hit_it_right_is_sound_on", 1);
            this.soundButton.setTexture("sound_on");
            SoundManager.PlayBgMusic();
        }
    }

    CreateUserInput() {
        this.gameplayBg.setInteractive();
        this.gameplayBg.on("pointerdown", this.ThrowKnife, this);
    }

    GetRandomNumber(_min, _max) {
        let rnd = Math.floor(Math.random() * (_max - _min) + _min);
        return rnd;
    }

    //######################################################################################
    CreateTarget() {
        if (this.target != null) {
            this.target.destroy();
        } else { }

        this.target = this.add.sprite(0, 0, "target");
        this.target.depth = 1;
        this.target.setAlpha(0);

        this.anims.create({
            key: "hit_target",
            frameRate: 30,
            frames: this.anims.generateFrameNumbers("target", { start: 1, end: 10 }),
        });

        this.targetBreak = this.add.sprite(0, 0, "target_break");
        this.targetBreak.depth = 1;
        this.targetBreak.setVisible(false);
        this.anims.create({
            key: "break_target",
            frameRate: 20,
            frames: this.anims.generateFrameNumbers("target_break", { start: 0, end: 14 }),
        });
        this.tweens.add({
            targets: [this.target],
            alpha: 1,
            duration: 300,
        });
    }

    RotateTheTarget(_t, _dt) {
        this.target.angle += this.currentRotationSpeed;
        this.currentRotationSpeed = Phaser.Math.Linear(this.currentRotationSpeed, this.newRotationSpeed, _dt / 1000);
    }

    CreateTimerEvent() {
        let timedEvent = this.time.addEvent({
            delay: Constant.gameOptions.changeTime,
            callback: this.ChangeRotationSpeed,
            callbackScope: this,
            loop: true
        });
    }
    ChangeRotationSpeed() {
        let sign = Phaser.Math.Between(0, 1) == 0 ? -1 : 1;
        let variation = Phaser.Math.FloatBetween(-Constant.gameOptions.rotationVariation, Constant.gameOptions.rotationVariation);
        this.newRotationSpeed = (this.currentRotationSpeed + variation) * sign;
        this.newRotationSpeed = Phaser.Math.Clamp(this.newRotationSpeed, -Constant.gameOptions.maxRotationSpeed, Constant.gameOptions.maxRotationSpeed);
    }

    //######################################################################################


    //######################################################################################
    CreateKnife() {
        this.knife = this.add.image(0, 0, "knife").setOrigin(0.5);
        setTimeout(() => {
        }, 200);
    }
    CreateKnifeAnimation() {

        let newScale = Utils.getScale(1080, 1920, window.innerWidth, window.innerHeight);
        this.tweens.add({
            targets: [this.knife],
            y: (this.knife.y - this.tweenKnifePos),//(this.knife.y - 20),
            duration: 500,
            callbackScope: this,
            yoyo: true,
            repeat: -1,
            delay: 50,
            onUpdate: (tween) => {

            },
            onComplete: function (tween) { }
        });
    }

    ThrowKnife() {
        if (this.canThrow) {
            this.canThrow = false;
            this.tweens.add({
                targets: [this.knife],
                y: this.target.y + 10,
                duration: Constant.gameOptions.throwSpeed,
                callbackScope: this,
                onComplete: function (tween) {
                    let isLegalHit = true;

                    let children = this.knifeGroup.getChildren();
                    for (let i = 0; i < children.length; i++) {
                        if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, children[i].impactAngle)) < Constant.gameOptions.minAngle) {
                            isLegalHit = false;
                            this.isGameOver = true;
                            break;
                        }
                    }

                    let obstacle = this.obstacleGroup.getChildren();
                    for (let i = 0; i < obstacle.length; i++) {
                        if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, 180 - obstacle[i].startAngle)) < Constant.gameOptions.minAngle && !obstacle[i].hit) {
                            isLegalHit = false;
                            this.isGameOver = true;
                            break;
                        }
                    }

                    this.DisableKnifeFromBasket();
                    if (isLegalHit) {


                        SoundManager.PlayKnifeAttachSound();
                        this.SelectAndFallFiveWoodenPiece();
                        this.target.play("hit_target");
                        this.canThrow = true;
                        let clientHeight;
                        let clientWidth;
                        if (window.innerWidth >= (window.innerHeight / 1.7777777)) {
                            clientHeight = window.innerHeight;
                            clientWidth = (clientHeight / 1.77777777778);
                        }
                        else {
                            clientWidth = window.innerWidth;
                            clientHeight = window.innerHeight;
                        }
                        let newScale = Utils.getScale(1080, 1920, clientWidth, clientHeight);
                        let knife = this.add.sprite(this.knife.x, this.target.y, "knife");
                        knife.setScale(newScale);
                        knife.impactAngle = this.target.angle;
                        this.knifeGroup.add(knife);
                        this.IncrementScore();
                        this.knife.setScale(newScale);
                        this.knife.setPosition(clientWidth / 2, clientHeight - 450 * newScale);
                    }
                    else {
                        //Throw the knife to downwards
                        SoundManager.PlayObstacleCollideSound();
                        this.canThrow = false;
                        this.gameplayBg.disableInteractive();
                        this.tweens.add({
                            targets: [this.knife],
                            y: Constant.game.config.height + this.knife.height,
                            rotation: 5,
                            duration: Constant.gameOptions.throwSpeed * 4,
                            callbackScope: this,
                            onComplete: function (tween) {
                                SoundManager.StopBgMusic();
                                this.knife.destroy();
                                setTimeout(() => {
                                    const currentTimeStamp = Date.now();
                                    const finalTime = currentTimeStamp - Constant.gameStartTime;
                                    PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, this.score);
                                    PlayzhubEventHandler.InterimBreak();

                                    GA.GameAnalytics.addProgressionEvent(
                                        "Fail",
                                        "hit_it_right_endless",
                                        undefined,  // progression02
                                        undefined,  // progression03
                                        this.score
                                    );

                                    GA.GameAnalytics.addDesignEvent("score:run", this.score);

                                    this.gameOverPopup.ShowGameOverPopup(this.score);
                                    this.ShowAd();
                                }, 100);
                            }
                        });
                    }
                }
            });
        }
    };

    IncrementScore() {
        this.score++;
        this.scoreText.text = this.score;
    };

    RotateTheKnifeWithTarget() {
        let newScale = Utils.getScale(1080, 1920, window.innerWidth, window.innerHeight);
        let children = this.knifeGroup.getChildren();
        for (let i = 0; i < children.length; i++) {
            children[i].angle += this.currentRotationSpeed;

            let radians = Phaser.Math.DegToRad(children[i].angle + 90);
            children[i].x = this.target.x + (this.target.width / 2 * newScale) * Math.cos(radians);
            children[i].y = this.target.y + (this.target.width / 2 * newScale) * Math.sin(radians);
        }
    }

    //######################################################################################


    //######################################################################################

    CreateObstcle() {
        if (this.score > 9) {
            let howMany = this.GetRandomNumber(1, 4);
            for (let i = 0; i < howMany; i++) {
                let imgNum = this.GetRandomNumber(0, 2);
                let imageName;
                if (imgNum == 0) {
                    imageName = "obstacle_0";

                } else {
                    imageName = "obstacle_1";
                }
                let obstacleAngle = Phaser.Math.Between(0, 360);
                let radians = Phaser.Math.DegToRad(obstacleAngle - 90);
                this.obstacle = this.add.sprite(0, 0, imageName);

                let clientHeight;
                let clientWidth;
                if (window.innerWidth >= (window.innerHeight / 1.7777777)) {
                    clientHeight = window.innerHeight;
                    clientWidth = (clientHeight / 1.77777777778);
                }
                else {
                    clientWidth = window.innerWidth;
                    clientHeight = window.innerHeight;
                }
                let newScale = Utils.getScale(1080, 1920, clientWidth, clientHeight);
                this.obstacle.setScale(newScale);
                this.obstacle.flipY = true;
                this.obstacle.setOrigin(0.5, 1);
                this.obstacle.angle = obstacleAngle;
                this.obstacle.startAngle = obstacleAngle;
                this.obstacle.hit = false;
                this.obstacleGroup.add(this.obstacle);
            }
        }
    }

    RotateTheObstacleWithTarget() {
        let newScale = Utils.getScale(1080, 1920, window.innerWidth, window.innerHeight);
        for (let i = 0; i < this.obstacleGroup.getChildren().length; i++) {
            if (!this.obstacleGroup.children.entries[i].hit) {
                this.obstacleGroup.children.entries[i].angle += this.currentRotationSpeed;
                let radians = Phaser.Math.DegToRad(this.obstacleGroup.children.entries[i].angle - 90);
                if (this.obstacleGroup.children.entries[i].texture.key == "obstacle_0") {
                    this.obstacleGroup.children.entries[i].x = this.target.x + (this.target.width / 3 * newScale) * Math.cos(radians);
                    this.obstacleGroup.children.entries[i].y = this.target.y + (this.target.width / 3 * newScale) * Math.sin(radians);
                } else {
                    this.obstacleGroup.children.entries[i].x = this.target.x + (this.target.width / 4 * newScale) * Math.cos(radians);
                    this.obstacleGroup.children.entries[i].y = this.target.y + (this.target.width / 4 * newScale) * Math.sin(radians);
                }
            } else { }
        }
    }

    //######################################################################################

    //######################################################################################
    CreateKnifeStand() {
        if (this.knifeStand != null) {
            this.knifeStand.destroy();
        } else { }
        this.knifeStand = this.add.image(0, 0, "knife_stand").setOrigin(0, 0.5);

        for (let i = 0; i < 10; i++) {
            let knifeBase = this.add.image(0, 0, "knife_stand_knife_base").setOrigin(0.5);
            this.knifeStandKnifeArray.push(knifeBase);
        }
    }

    CreateKnifeBasket() {
        for (let i = 0; i < 10; i++) {
            let knife = this.add.image(0, 0, "stand_knife").setOrigin(0.5);
            knife.setAlpha(1);
            this.knifeBasketArray.push(knife);
        }
    }

    AnimCom() {
        this.target.destroy();
        this.obstacleGroup.clear(true);

        if (this.obstacleGroup && this.obstacleGroup.children.entries.length != 0) {
            this.obstacleGroup.clear(true);
        }


        this.knifeCounter = 0;
        this.knifeBasketArray = [];
        this.knifeGroup.clear(true);
        this.woodCounter = 0;

        let widthOffset;

        GA.GameAnalytics.addProgressionEvent(
            "Complete",
            "hit_it_right_endless",
            "level_1",
            undefined,
            this.score
        );
        setTimeout(() => {
            // this.IncrementLevelAndShowAd();

            this.CreateKnifeBasket();
            this.CreateTarget();
            this.CreateObstcle();
            if (window.innerWidth >= (window.innerHeight / 1.7777777)) {
                let clientHeight = window.innerHeight;
                let clientWidth = (clientHeight / 1.77777777778);
                this.resize(clientWidth, clientHeight, (window.innerWidth / 2) - (clientWidth / 2));
            }
            else {
                let clientWidth = window.innerWidth;
                let clientHeight = window.innerHeight;
                this.resize(clientWidth, clientHeight, 0);
            }

            this.gameplayBg.setInteractive();
        }, 500);
    };
    DisableKnifeFromBasket() {
        for (let i = 0; i < this.knifeBasketArray.length; i++) {
            if (this.knifeCounter < 10) {
                this.knifeBasketArray[this.knifeCounter].destroy();
            } else { }
        }

        this.knifeCounter++;

        if (this.knifeCounter >= 10) {
            this.gameplayBg.disableInteractive();
            if (!this.isGameOver) {
                setTimeout(() => {
                    this.target.setVisible(false);
                    for (let i = 0; i < this.knifeGroup.length; i++) {
                        this.knifeGroup[i].setVisible(false);
                    }
                    this.knifeGroup.clear(true);
                }, 100);
                setTimeout(() => {
                    this.targetBreak.setVisible(true);
                    this.targetBreak.play("break_target");
                    this.targetBreak.on('animationcomplete', this.AnimCom, this);
                }, 200);
            }
        }
    };

    CreateWoodenPiece() {
        for (let i = 0; i < 20; i++) {
            let rnd = this.GetRandomNumber(0, 3);
            let woodPiece = this.add.sprite(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2.75), "shape_" + rnd).setScale(Constant.scaleFactor, Constant.scaleFactor);
            woodPiece.setAlpha(0);
            this.woodArray.push(woodPiece);
        }
    };

    SelectAndFallFiveWoodenPiece() {
        this.woodFiveArray = [];
        if (this.woodCounter == this.woodArray.length) {
            this.woodCounter = 0;
        }
        if (this.woodCounter < this.woodArray.length) {
            for (let j = 0; j < 5; j++) {
                this.woodFiveArray.push(this.woodArray[this.woodCounter]);
                this.woodCounter++;
            }
        } else { }
        this.FallWoodenPiece();
    };

    FallWoodenPiece() {
        for (let i = 0; i < this.woodFiveArray.length; i++) {
            this.woodFiveArray[i].setAlpha(1);
            this.tweens.add({
                targets: this.woodFiveArray[i],
                x: this.woodXpos[i],
                y: Math.round(Constant.game.config.height / 1.3),
                rotation: this.woodRotation[i],
                alpha: 0,
                ease: 'Sine.easeInOut',
                duration: this.woodSpeed[i],
                callbackScope: this,
                onComplete: this.TweenOnComplete,
            });
        }
    };

    TweenOnComplete(_tween, _target, _image) {
        _target[0].setPosition(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2.75));
    };

    //########################################################################################

    update(t, dt) {
        if (!this.isGameOver) {
            this.RotateTheTarget(t, dt);
            this.RotateTheKnifeWithTarget();
            this.RotateTheObstacleWithTarget();
        }
    }
    resize(newWidth, newHeight, offsetWidth) {
        if (Constant.activeScene != 'game') return;
        let knifeOffsetXFromStand = 70;
        let knifeOffsetStartX = 100;

        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        const camera = this.cameras.main;
        camera.x = offsetWidth;
        camera.setViewport(offsetWidth, 0, newWidth, newHeight);
        this.gameplayBg.setDisplaySize(newWidth, newHeight);
        this.scoreText.setScale(newScale);
        this.scoreText.setPosition(newWidth / 2 - 20 * newScale, 50 * newScale);
        this.backButton.setScale(newScale);
        this.backButton.setPosition(newWidth / 2 - 440 * newScale, 85 * newScale);
        this.soundButton.setScale(newScale);
        this.soundButton.setPosition(newWidth / 2 + 440 * newScale, 90 * newScale);

        this.knifeStand.setScale(newScale);
        this.knifeStand.setPosition(newWidth / 2 - 425 * newScale, newHeight - 200 * newScale);
        this.tweenKnifePos = 20 * newScale;
        for (let index = 0; index < this.knifeStandKnifeArray.length; index++) {
            const element = this.knifeStandKnifeArray[index];
            element.setScale(newScale);
            element.setPosition(this.knifeStand.x + (knifeOffsetStartX * newScale) + index * (knifeOffsetXFromStand * newScale), this.knifeStand.y);
        }

        for (let index = 0; index < this.knifeBasketArray.length; index++) {
            const element = this.knifeBasketArray[index];
            element.setScale(newScale);
            element.setPosition(this.knifeStand.x + (knifeOffsetStartX * newScale) + index * (knifeOffsetXFromStand * newScale), this.knifeStand.y);
        }

        this.target.setScale(newScale);
        this.targetBreak.setScale(newScale);

        this.target.setPosition(newWidth / 2, 450 * newScale);
        this.targetBreak.setPosition(newWidth / 2, 450 * newScale);

        this.knife.setScale(newScale);
        this.knife.setPosition(newWidth / 2, newHeight - 450 * newScale);

        this.instructionPopup.Resize(newWidth, newHeight, offsetWidth);
        this.gameOverPopup.Resize(newWidth, newHeight, offsetWidth);
        this.quitPopup.Resize(newWidth, newHeight, offsetWidth)

    }
    ScaleObstacleGroup() {
        if (window.innerWidth >= (window.innerHeight / 1.7777777)) {
            let clientHeight = window.innerHeight;
            let clientWidth = (clientHeight / 1.77777777778);
        }
        else {
            let clientWidth = window.innerWidth;
            let clientHeight = window.innerHeight;
        }
        let newScale = Utils.getScale(1080, 1920, clientWidth, clientHeight);
        for (let index = 0; index < this.obstacleGroup.length; index++) {
            const element = this.obstacleGroup[index];
            element.setScale(newScale)

        }
    }


}