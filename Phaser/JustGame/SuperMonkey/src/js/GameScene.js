import { AlignGrid } from "./util/alignGrid.js";
import { Constant } from "./Constant.js";
import { AudioManager } from "./AudioManager.js";
import Background from "./Background.js";
import GameUI from "./GameUI.js";
import Platform from "./Platform.js";
import Obstacles from "./Obstacles.js";
import Player from "./Player.js";
import Bananas from "./Bananas.js";
import { Server } from "./Server.js";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler.js";
import { AdSDK } from './AdSDK.js';
import * as GA from "gameanalytics";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    init() {
        Constant.score = 0;
        this.bg = new Background(this);
        this.gameUI = new GameUI(this);
        this.platform = new Platform(this);
        this.obs = new Obstacles(this);
        this.player = new Player(this);
        this.banana = new Bananas(this);

        this.bananaCollider = null;
        this.playerIsDown = null;
        this.kongTime = false;
        this.firstClickTime = 0;
        this.singleJumpBool = false;
        this.swipeActivated = false;
        this.playerIsDead = null;
        this.isGameOver = null;
        // this.gameOverPopup = new GameOverPopup(this);
        // this.quitPopup = new QuitPopup(this);
        // this.instructionPopup = new InstructionPopup(this);
        // this.scoreClassObj = new Score(this);
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
        console.log('Show ad.............');
        this.StopBGAudio();
        this.StopRunAudio();
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
    //         }, 200);
    //     } else if (this.adHitFrom === 'level_complete') {

    //     }

    // };

    // IncrementLevelAndShowAd() {
    //     this.howManyLevelsPlayed += 1;
    //     if (this.howManyLevelsPlayed === 3) {
    //         this.ShowAd();
    //         this.howManyLevelsPlayed = 0;
    //     } else { }
    // };

    RestartGameScene() {
        this.scene.stop('GameScene');
        this.scene.restart('GameScene');
    };

    create() {
        // this.InitializeAdSdk();

        Constant.gameStartTime = Date.now();
        // this.cameras.main.setZoom(0.3);
        PlayzhubEventHandler.AdStarted(this.OnStartingAd.bind(this));
        PlayzhubEventHandler.AdCompleted(this.OnAdCompleted.bind(this));
        this.ShowBg();
        this.ShowPlatform();
        this.ShowFrontBush();
        this.ShowBananas();
        this.AddAlignGrid();
        this.ShowObstacles();
        this.ShowGameUI();
        this.ShowPlayer();
        this.GameControlOverlay();

        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "super_monkey_endless"
        );
    }

    OnStartingAd() {
        GA.GameAnalytics.addDesignEvent("ad:started");
        // PlayzhubEventHandler.GamePlayPaused();
    }

    OnAdCompleted() {
        GA.GameAnalytics.addDesignEvent("ad:completed");
        // PlayzhubEventHandler.GamePlayResumed();
        // setTimeout(() => {
        //     this.RestartGameScene();
        // }, 150);
    }

    AddAlignGrid() {

        this.aGrid = new AlignGrid({
            scene: this,
            rows: 19,
            cols: 19
        });
        // this.aGrid.showNumbers();
    }

    //-------------GamePlay All Audio Functions---------------//

    PlayRunAudio() {

        AudioManager.PlayRunAudio();

    }

    PlayHitAudio() {

        AudioManager.PlayHitAudio();

    }

    PlayExcitedAudio() {

        AudioManager.PlayExcitedAudio();

    }

    PlayTransitionAudio() {

        AudioManager.PlayKongTransitionAudio();

    }

    StopBGAudio() {

        AudioManager.StopBGAudio();

    }

    StopRunAudio() {

        AudioManager.StopRunAudio();

    }

    //----------------------------------------------------//

    ShowBg() {

        this.bg.CreateBG();

    }

    ShowGameUI() {

        this.gameUI.CreateGamePlayUI();

    }

    ShowPlatform() {

        this.platform.CreatePlatform();

    }

    ShowObstacles() {

        this.obs.CreateObstacles();
        this.obs.CreateBird();

    }

    ShowFrontBush() {

        this.bg.CreateFrontBush();

    }

    ShowBananas() {

        this.banana.CreateBananas();
        this.banana.CreateSpecialBananaBox();

    }

    MoveGameObjs() {

        if (this.playerIsDown && !this.isGameOver) {
            this.bg.MoveBG();
            this.platform.MovePlatform();
            this.bg.MoveFrontBush();
            this.banana.MoveBananas();
            this.banana.MoveSpecialBox();
            this.obs.MoveObstacles();
        }

    }

    ShowPlayer() {

        this.player.CreatePlayer();

        //-------------Player & Platform Collider---------------//

        this.platform.allPlatformArray.forEach(_arrays => {

            _arrays.forEach(_platform => {

                // console.log("Platform pos------------------", _platform.x, _platform.y);

                this.physics.add.collider(this.player.monkey, _platform, this.OnCollisionWithPlatform, null, this);

                this.physics.add.collider(this.player.kong, _platform, this.OnCollisionWithPlatform, null, this);


            });
        });

        //---------------Player & Banana Collider-----------------//

        if (this.isGameOver == null) {
            this.banana.bananaContainersArray.forEach(_cont => {

                _cont.each(_banana => {

                    this.bananaCollider = this.physics.add.overlap(this.player.monkey, _banana, this.CollectBananas, null, this);

                    this.physics.add.overlap(this.player.kong, _banana, this.CollectBananas, null, this);

                });
            });
        }

        //---------------Player & Banana Collider-----------------//

        this.physics.add.collider(this.player.monkey, this.banana.specialBananaContainer.list[0], this.PlayerCollectingBox, null, this);

        //---------------Player & Bird Collider-----------------//

        if (!this.kongTime) {
            this.physics.add.collider(this.player.monkey, this.obs.birdContainer.list[0], this.PlayerCollidingObstacles, null, this);
        }

        else {
            this.physics.add.collider(this.player.kong, this.obs.birdContainer.list[0], this.PlayerCollidingObstacles, null, this);
        }

        //-------------Player & Obstacles Collider---------------//

        if (!this.kongTime) {
            this.physics.add.collider(this.player.monkey, this.obs.currObsArrayOne, this.PlayerCollidingObstacles, null, this);
            this.physics.add.collider(this.player.monkey, this.obs.currObsArrayTwo, this.PlayerCollidingObstacles, null, this);
            this.physics.add.collider(this.player.monkey, this.obs.currObsArrayThree, this.PlayerCollidingObstacles, null, this);
            this.physics.add.collider(this.player.monkey, this.obs.currObsArrayFour, this.PlayerCollidingObstacles, null, this);
        }

        else {
            this.physics.add.collider(this.player.kong, this.obs.currObsArrayOne, this.PlayerCollidingObstacles, null, this);
            this.physics.add.collider(this.player.kong, this.obs.currObsArrayTwo, this.PlayerCollidingObstacles, null, this);
            this.physics.add.collider(this.player.kong, this.obs.currObsArrayThree, this.PlayerCollidingObstacles, null, this);
            this.physics.add.collider(this.player.kong, this.obs.currObsArrayFour, this.PlayerCollidingObstacles, null, this);
        }

        //------------Player & Front Bush Collider--------------//

        if (!this.kongTime) {
            this.physics.add.overlap(this.player.monkey, this.bg.frontBushArray, this.GameOver, null, this);
        }

        else {
            this.physics.add.overlap(this.player.kong, this.bg.frontBushArray, this.GameOver, null, this);
        }

    }

    OnCollisionWithPlatform(_m, _p) {

        // console.log("Colliding");
        if (this.player.monkey.name == "isUp" && !this.kongTime) {
            this.player.monkey.name = "isDown";
            this.playerIsDown = true;
            this.player.monkey.play("Run", true);
            this.PlayRunAudio();
            this.doubleJumpCount = 0;
            // console.log(_p.x, _p.y);
        }

        else if (this.player.kong.name == "isUp" && this.kongTime) {
            this.player.kong.name = "isDown";
            this.playerIsDown = true;
            this.player.kong.play("Run", true);
            this.PlayRunAudio();
            this.doubleJumpCount = 0;
            // console.log(_p.x, _p.y);
        }

    }

    GameControlOverlay() {

        let downX, upX, downY, upY, threshold = 50;


        this.gameUI.overlay.controlOverlay.on('pointerdown', function (pointer) {

            downX = pointer.x;
            downY = pointer.y;

        });

        this.gameUI.overlay.controlOverlay.on('pointerup', function (pointer) {

            upX = pointer.x;
            upY = pointer.y;

            if (!this.kongTime) {
                this.ManagePlayerMovement(upX, downX, threshold, this.player.monkey);
            }

            else {
                this.ManagePlayerMovement(upX, downX, threshold, this.player.kong);
            }

        }, this);

    }

    getTime() {

        //make a new date object
        let d = new Date();
        //return the number of milliseconds since 1 January 1970 00:00:00.
        return d.getTime();

    }

    ManagePlayerMovement(_upX, _downX, _threshold, _player) {

        // console.log("jumpCount", this.jumpCounter);
        if (_upX < _downX - _threshold || _upX > _downX + _threshold) {
            // console.log("Swipe Activated!");
            let playerRunPosY = null;
            this.swipeActivated = true;
            if (_player.name == "isDown" && this.swipeActivated) {
                // console.log("Player", _player);
                // console.log("Player.data", _player.data);
                if (!this.kongTime) {
                    playerRunPosY = _player.y;
                    _player.play("slide", false, 1);
                    _player.body.setSize(_player.width - 155, _player.height - 9, true);
                }

                else {
                    _player.play("slide2", false, 1);
                }

                _player.once('complete', () => {
                    this.swipeActivated = false;
                    if (!this.kongTime) {
                        _player.y = playerRunPosY;
                        _player.play("Run", true);
                        _player.body.setSize(_player.width - 155, _player.height + 10, true);
                    }

                    else {
                        _player.play("Run");
                    }
                });
            }
        }

        else if (_player.name == "isDown" && !this.swipeActivated) {
            // console.log("single click");
            this.singleJumpBool = true;
            this.firstClickTime = 0;
            _player.name = "isUp";
            // console.log("Player", _player);
            // console.log("Player.data", _player.data);
            if (!this.kongTime) {
                // console.log("Moneky");
                if (Constant.isMobile) {
                    _player.body.setVelocityY(Constant.gameOptionsMobile.jumpVelMonkey);
                }

                else {
                    _player.body.setVelocityY(Constant.gameOptions.jumpVelMonkey);
                }
                _player.play("jump", false, 1);
            }
            else {
                // console.log("Kong");
                if (Constant.isMobile) {
                    _player.body.setVelocityY(Constant.gameOptionsMobile.jumpVelKong);
                }

                else {
                    _player.body.setVelocityY(Constant.gameOptions.jumpVelKong);
                }
                // _player.play("Run", false);
                _player.play("Jump", false, 1);
            }
        }

        if (this.firstClickTime == 0) {
            this.firstClickTime = this.getTime();
            return;
        }

        //get the elapsed time between clicks
        //
        let elapsed = this.getTime() - this.firstClickTime;
        //
        //if the time between clicks is less than 250 milliseconds
        //it is a doulble click
        //

        if (elapsed < 250) {
            if (this.doubleJumpCount == 0) {
                // console.log("double click");
                this.doubleJumpCount++;

                _player.name = "isUp";
                if (!this.kongTime) {
                    // console.log("Moneky");
                    if (Constant.isMobile) {
                        _player.body.setVelocityY(Constant.gameOptionsMobile.vaultVelMonkey);
                    }

                    else {
                        _player.body.setVelocityY(Constant.gameOptions.vaultVelMonkey);
                    }
                    _player.play("vault", false, 1);
                }

                else {
                    // console.log("Kong");
                    if (Constant.isMobile) {
                        _player.body.setVelocityY(Constant.gameOptionsMobile.vaultVelKong);
                    }

                    else {
                        _player.body.setVelocityY(-Constant.gameOptions.vaultVelKong);
                    }
                    _player.play("vault", false, 1);
                }
            }
        }

        //
        //reset the firstClickTime
        //
        this.firstClickTime = 0;
        // this.doubleJumpCount = 0;
        this.singleJumpBool = false;

    }

    CollectBananas(_player, _banana) {

        // console.log("collecting");
        _banana.body.enable = false;
        _banana.name = "collected";
        this.PlayExcitedAudio();
        _banana.setVisible(false);
        if (!this.kongTime) {
            this.gameUI.gameScore.score += 10;
            Constant.score += 10;
        }

        else {
            this.gameUI.gameScore.score += 20;
            Constant.score += 20;
        }

        this.gameUI.gameScore.scoreTxt.setText(this.gameUI.gameScore.score);

        if (Constant.isMobile) {
            this.TweenCollectedBananasToScoreBoard(_player.x, _player.y - Constant.round(Constant.game.config.height / 19.64));
        }

        else {
            this.TweenCollectedBananasToScoreBoard(_banana.parentContainer.x + _banana.x, _banana.parentContainer.y + _banana.y);
        }

    }

    TweenCollectedBananasToScoreBoard(_xPos, _yPos) {

        let banana = this.add.image(_xPos, _yPos, "banana").setScale(Constant.scaleFactor).setOrigin(0.5);

        this.tweens.add({
            targets: banana,
            x: this.gameUI.stalk.x,
            y: this.gameUI.stalk.y,
            duration: 500,
            ease: 'Quad.easeInOut',
            // repeat: 1,
            //     callbackScope: this,
            onComplete: function () {
                banana.destroy();
            }
        });

    }

    PlayerCollectingBox(_player, _box) {

        if (this.playerIsDead == null) {
            if (!_player.data.list.isKong) {
                // console.log("Kong Time baby!");
                _player.data.list.isKong = true;
                _box.body.enable = false;
                _player.play("PowerUp", false, 1);
                _player.on('complete', () => {
                    _player.body.allowGravity = false;
                    _player.setVisible(false);

                });
            }
            if (_player.data.list.isKong) {
                // console.log("Kong");
                this.player.kong.visible = true;
                this.PlayTransitionAudio();
                this.kongTime = true;
                this.player.kong.setPosition(_player.x, _player.y - 20);
                this.player.kong.body.allowGravity = true;
                // this.player.kong.name = "isUp";
                this.player.monkey.setPosition(0, -540);
                this.player.monkey.setOffset(this.player.monkey.x, this.player.monkey.y);
                this.player.kong.play("PowerUp", false, 1);
                this.player.kong.on('complete', () => {
                    this.player.kong.play("Run", true);
                });
            }

        }
    }

    PlayerCollidingObstacles(_player, _obs) {
        if (!this.kongTime) {
            _player.play("Hit", false, 1);
        }

        else {
            _player.play("hit", false, 1);
        }
        this.gameUI.overlay.controlOverlay.removeInteractive();
        this.StopRunAudio();
        this.PlayHitAudio();
        this.cameras.main.shake(185, 0.018);
        _player.setName('deathByHit');
        this.playerIsDead = true;
        _player.once('complete', () => {
            this.GameOver(_player, _obs);
        });

    }

    GameOver(_player, _obs) {
        this.obs.showBird.paused = true;
        this.obs.birdContainer.list[0].body.enable = false;
        this.obs.showBird.remove(false);
        this.gameUI.buttons.backBtn.removeInteractive();
        this.gameUI.buttons.soundBtn.removeInteractive();
        this.StopBGAudio();
        this.StopRunAudio();
        this.banana.bananaContainersArray.forEach(_cont => {

            _cont.each(_banana => {

                _banana.body.enable = false;

            });
        });

        if (this.isGameOver == null) {
            GA.GameAnalytics.addProgressionEvent(
                "Complete",
                "super_monkey_endless",
                undefined,
                undefined,
                Constant.score
            );

            GA.GameAnalytics.addDesignEvent("score:super_monkey", Constant.score);

            this.ShowAd();

            if (_player.name == "deathByHit") {
                const currentTimeStamp = Date.now();
                const finalTime = currentTimeStamp - Constant.gameStartTime;
                // Server.PostGamePlayTimeToParent(finalTime / 1000, Constant.score);
                PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, Constant.score);
                _player.setName("isDown");
                _obs.body.enable = false;
                // console.log("Death by Hit");
                this.playerIsDead = true;
                this.isGameOver = true;
                this.gameUI.overlay.controlOverlay.removeInteractive();
                this.gameUI.CreateGameOverUI();
                // this.CallScoreSendAPI();
            } else {
                // console.log("Death by Fall");
                const currentTimeStamp = Date.now();
                const finalTime = currentTimeStamp - Constant.gameStartTime;
                // Server.PostGamePlayTimeToParent(finalTime / 1000, Constant.score);
                PlayzhubEventHandler.GameScoreUpdate(finalTime / 1000, Constant.score);
                _obs.body.enable = false;
                this.isGameOver = true;
                _player.body.setVelocityY(1200);
                _player.removeAllListeners("Run");
                this.gameUI.overlay.controlOverlay.removeInteractive();
                setTimeout(() => {
                    this.gameUI.CreateGameOverUI();
                    // this.CallScoreSendAPI();
                }, 400);
            }
        }

    }

    GameOverOnTimerComplete() {

        this.isGameOver = true;
        this.StopRunAudio();
        this.StopBGAudio();
        if (!this.kongTime) {
            this.player.monkey.setName("Dead");
            this.player.monkey.play("Hit", false, 1);
        }

        else {
            this.player.kong.setName("Dead");
            this.player.kong.play("hit", false, 1);
            this.player.kong.removeAllListeners();
        }

        this.obs.showBird.paused = true;
        this.obs.showBird.remove(false);
        this.obs.birdContainer.list[0].body.enable = false;
        this.obs.birdContainer.list[0].destroy();
        this.gameUI.gameTimedEvent.remove();
        this.banana.bananaContainersArray.forEach(_cont => {

            _cont.each(_banana => {

                _banana.body.enable = false;

            });
        });

        this.gameUI.overlay.controlOverlay.removeInteractive();
        this.gameUI.CreateGameOverUI();

        // this.CallScoreSendAPI();

    }

    CallScoreSendAPI() {

        this.gameUI.gameTimedEvent.remove();

        if (getMobileOperatingSystem() == "Android") {
            console.log("The from game over this.score.distCovered........................" + this.gameUI.gameScore.score.toString());
            sendMessage("The Game End..................................");
            sendMessage(this.gameUI.gameScore.score.toString());
        } else if (getMobileOperatingSystem() == "iOS") {
            let postdata = {
                score: this.gameUI.gameScore.score.toString(),
            };
            let postmessage = JSON.stringify(postdata);
            window.webkit.messageHandlers.jsHandler.postMessage(postmessage);
            window.webkit.messageHandlers.jsHandler.postMessage("The Game End.............");
        } else {
            console.log("else part.................");
            this.gameUI.gameTimedEvent.remove();
            Constant.timeToEnd = Server.timerValue;

            // AudioManager.StopBGAudio();
        }
    }

    //###########################################################//

    update(t, dt) {

        this.MoveGameObjs();
        // this.banana.MoveBananas();
        // this.CheckMonkeyYPosForGameOver();

    }

}