var databaseComponet;
cc.Class({
    extends: cc.Component,

    properties: {
        isPaused: false,
        isGameOver: false,
        gamePauseNode: cc.Node,
        gameOverNode: cc.Node,
        gameOverBackPopupNode: cc.Node,
        bubbleManagerNode: cc.Node,
        settingsPopupNode: cc.Node,
        AboutPopupNode: cc.Node,
        cannonNode: cc.Node,
        cannonNodeComponent: null,
        score: 0,
        scoreText: cc.RichText,
        gameOverScoreText: cc.RichText,
        gameOverBestScoreText: cc.RichText,
        pausePopupScoreText: cc.RichText,

        timerText: cc.RichText,
        pausePopupTimerText: cc.RichText,
        gameOverPopupTimerText: cc.RichText,
        // timerIcon:cc.Node,
        timeToLeft: 0,
        remainTime: 0,
        dangerLine: cc.Node,
        isEnterToYellowLine: false,
        isEnterToRedLine: false,
        timerBaseNode: cc.Node,
        soundManagerNode: cc.Node,
        SoundManagerComponent: null,

        collectedScore: 0,
        collectedScoreText: cc.RichText,
        singleBubbleBlaster: false,
        messageText: cc.RichText,
        systemBackPressed: false,


        gamePlayCounter: 0,
        gamePausedtime: 0,
        analyticsDataSent: false,
    },


    onLoad() {

        //For increment the time of playing the game
        this.schedule(this.timerGame, 1.0);

        this.bubbleManagerNode = this.node.getComponent("BubbleManager");
        this.SoundManagerComponent = this.soundManagerNode.getComponent("SoundManager");
        this.cannonNodeComponent = this.cannonNode.getComponent("Cannon");
        databaseComponet = this.node.parent.getComponent("Database");

        //FOR SYSYTEM BACK BUTTON
        var self = this;
        this.listener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if (cc.macro.KEY.escape) {
                    if (!self.gameOverBackPopupNode.active) {
                        self.gameOverBackPopupNode.active = !self.gameOverBackPopupNode.active;
                        self.gameOverBackPopupNode.getComponent(cc.Animation).play('BackPopupShowing');

                        self.scheduleOnce(function() {
                            cc.game.pause();
                        }, 0.4);
                        self.systemBackPressed = true;

                    }
                }
            },
        }, self.node);

    },
    onDestroy: function() {
        cc.eventManager.removeListener(this.listener);
    },

    timerGame: function() {
        // if (!self.gameOverScreenDisplayed) {
        if (!this.isPaused) {
            this.gamePlayCounter++;
        } else {
            this.gamePausedtime++;
        }
        // }
    },

    start() {
        this.UpdateScoreText();
        this.ReStartTimer();
    },

    CalculateScore: function() {
        this.score += 1;
    },

    CalculateCollectedScore: function(totalBubbleDestroyed) {

        this.collectedScoreText.string = "+" + totalBubbleDestroyed.toString();

        if (totalBubbleDestroyed >= 6 && totalBubbleDestroyed <= 8) {
            this.ShowMessageText("NICE");
            this.SoundManagerComponent.PlayNiceTextSound();
            // console.log("inside nice");
        } else if (totalBubbleDestroyed >= 9 && totalBubbleDestroyed <= 14) {
            this.ShowMessageText("EXCELLENT");
            this.SoundManagerComponent.PlayExcellentTextSound();
            // console.log("inside Excellent");
        } else if (totalBubbleDestroyed >= 15) {
            this.ShowMessageText("AWESOME");
            this.SoundManagerComponent.PlayAwesomeTextSound();
            // console.log("inside Awesome");
        }
        this.ShowCollectedScoreText();
        // console.log("final Collected score: " + finalCollectedScore);
    },

    ShowCollectedScoreText: function() {
        if (this.singleBubbleBlaster) {
            this.unschedule(this.SetCollectedScoreNodeActive);
            this.singleBubbleBlaster = false;
            this.collectedScoreText.node.active = true;

            var textAnim = new cc.ScaleTo(0.25, 1.5, 1.5);
            this.collectedScoreText.node.runAction(textAnim);

            this.schedule(this.SetCollectedScoreNodeActive, 0.7);
        }
    },

    SetCollectedScoreNodeActive: function() {
        this.collectedScoreText.node.active = false;
        this.collectedScoreText.node.scale = 1;
        this.collectedScore = 0;
    },

    ShowMessageText: function(message) {

        this.unschedule(this.SetMessageNodeActive);
        this.messageText.string = message + "!";
        this.messageText.node.active = true;
        var msgTextAnim = new cc.ScaleTo(0.8, 2, 2);
        this.collectedScoreText.node.runAction(msgTextAnim);

        this.schedule(this.SetMessageNodeActive, 2);
    },

    SetMessageNodeActive: function() {
        this.messageText.node.active = false;
        this.messageText.node.scale = 1;
    },

    UpdateScoreText: function() {
        this.scoreText.string = this.score.toString();
        this.pausePopupScoreText.string = this.score.toString();
    },

    ShowCurrentScore: function() {
        this.gameOverScoreText.string = this.score.toString();
    },

    ShowBestScore: function() {

        if (parseInt(databaseComponet.LoadData("bubble_best_score")) < this.score) {
            databaseComponet.SaveData("bubble_best_score", this.score);
        }
        this.gameOverBestScoreText.string = databaseComponet.LoadData("bubble_best_score").toString();
    },

    PauseButtonPress: function() {
        if (!this.isGameOver) {
            if (!this.isPaused) {
                this.isPaused = true;
                this.gamePauseNode.active = true;
                this.gamePauseNode.getComponent(cc.Animation).play('PausePopupComing');
                this.timerBaseNode.scale = new cc.Vec2(0, 0);
                this.cannonNodeComponent.HidePath();
                this.SoundManagerComponent.StopBgSound();
            }
        }

    },

    StartTimer: function() {
        if (!this.isPaused && !this.isGameOver) {
            if (this.remainTime != 0) {
                // --this.remainTime;
                this.remainTime--;
                var minutes = Math.floor(this.remainTime / 60);
                var seconds = Math.floor(this.remainTime - (60 * minutes));
                if (seconds < 10) {
                    this.timerText.string = "0" + minutes.toString() + ":0" + seconds.toString();
                    this.pausePopupTimerText.string = "0" + minutes.toString() + ":0" + seconds.toString();
                    this.gameOverPopupTimerText.string = "0" + minutes.toString() + ":0" + seconds.toString();
                } else {
                    this.timerText.string = "0" + minutes.toString() + ":" + seconds.toString();
                    this.pausePopupTimerText.string = "0" + minutes.toString() + ":" + seconds.toString();
                    this.gameOverPopupTimerText.string = "0" + minutes.toString() + ":" + seconds.toString();
                }

                if (this.remainTime <= 15) {
                    this.timerText.node.color = new cc.Color(255, 0, 0);
                    // this.timerIcon.color = new cc.Color(255, 0, 0);
                    this.timerText.node.getComponent(cc.Animation).play('lessThan15SecAnimation');
                    // this.timerIcon.getComponent(cc.Animation).play('lessThan15SecAnimation');
                    this.SoundManagerComponent.PlayTimerRemainderSound();
                }
            } else {
                /*this.isGameOver = true;
                this.gameOverNode.active = true;
                this.timerBaseNode.scale = new cc.Vec2(0, 0);

                this.cannonNodeComponent.bulletTwo.scale = new cc.Vec2(1, 1);
                this.cannonNodeComponent.bulletOne.scale = new cc.Vec2(1, 1);

                this.gameOverNode.getComponent(cc.Animation).play('GameOverPopupComing');
                this.cannonNodeComponent.HidePath();
                this.SoundManagerComponent.StopBgSound();
                this.SoundManagerComponent.StopTimerRemainderSound();
                this.ShowCurrentScore();
                this.ShowBestScore();*/
                this.bubbleManagerNode.fallAllBubbles();
            }
        }

    },

    gameOver: function() {
        // console.log("Game Over");
        this.isGameOver = true;
        this.scheduleOnce(this.activeGameOverPopUp, 1.0);
    },

    activeGameOverPopUp: function() {
        //Hide path marker
        this.cannonNodeComponent.HidePath();
        //this.cannonNodeComponent.bulletTwo.scale = new cc.Vec2(1, 1);
        //this.cannonNodeComponent.bulletOne.scale = new cc.Vec2(1, 1);

        //Show game over popup
        this.timerBaseNode.scale = new cc.Vec2(0, 0);
        this.gameOverNode.active = true;
        this.gameOverNode.getComponent(cc.Animation).play('GameOverPopupComing');


        this.SoundManagerComponent.StopBgSound();
        this.SoundManagerComponent.StopDangerLineOverRemainderSound();
        this.ShowCurrentScore();
        this.ShowBestScore();

        //analytics
        this.gameOverAnalytics();
    },

    gameOverAnalytics: function() {
        if (cc.sys.isNative) {
            var ob1 = {
                gameId: cc.sys.localStorage.getItem("gameId"),
                roomID: cc.sys.localStorage.getItem("roomId"),
                userId: cc.sys.localStorage.getItem("userId"),
                score: this.score, //totalScore mera game score dena parega
                // highScore: highScore, //highScore mera game score dena parega
                highScore: databaseComponet.LoadData("bubble_best_score"),
            }
            var score = JSON.stringify(ob1);
            jsb.reflection.callStaticMethod(
                "com.mxtech.videoplayer/game/GameManager", "onGameOver",
                "(Ljava/lang/String;)V", score);
        }

        this.sendAnalyticsData();

        this.unschedule(this.timerGame);
    },

    restartAnalytics: function() {
        if (cc.sys.isNative) {
            var ob1 = {
                gameId: cc.sys.localStorage.getItem("gameId"),
                roomID: cc.sys.localStorage.getItem("roomId"),
                userId: cc.sys.localStorage.getItem("userId"),
                startType: "restart",
            }
            var obj = JSON.stringify(ob1);
            jsb.reflection.callStaticMethod(
                "com.mxtech.videoplayer/game/GameManager", "onTrack",
                "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                "tag", "gameStart", obj);
        }
    },

    sendAnalyticsData: function() {
        if (!this.analyticsDataSent) {

            //game analytics
            if (cc.sys.isNative) {
                this.analyticsDataSent = true;

                // if (cc.sys.localStorage.getItem("JumpJumphighScore") == null) {
                //     cc.sys.localStorage.setItem("JumpJumphighScore", 0);
                // }
                if (parseInt(databaseComponet.LoadData("bubble_best_score")) == null) {
                    databaseComponet.SaveData("bubble_best_score", 0);
                }


                // var highScore = cc.sys.localStorage.getItem("JumpJumphighScore");
                var highScore = parseInt(databaseComponet.LoadData("bubble_best_score"));
                var ob = {
                    gameId: cc.sys.localStorage.getItem("gameId"),
                    roomID: cc.sys.localStorage.getItem("roomId"),
                    userId: cc.sys.localStorage.getItem("userId"),
                    currentScore: this.score,
                    highScore: highScore,
                    currentTime: this.gamePlayCounter,
                }
                var data = JSON.stringify(ob);
                jsb.reflection.callStaticMethod(
                    "com.mxtech.videoplayer/game/GameManager", "onTrack",
                    "(Ljava/lang/String;Ljava/lang/String;)V", "gameExit", data);

                //pause analytics
                var ob1 = {
                    gameId: cc.sys.localStorage.getItem("gameId"),
                    roomID: cc.sys.localStorage.getItem("roomId"),
                    userId: cc.sys.localStorage.getItem("userId"),
                    currentTime: this.gamePausedtime,
                }
                var data1 = JSON.stringify(ob1);
                jsb.reflection.callStaticMethod(
                    "com.mxtech.videoplayer/game/GameManager", "onTrack",
                    "(Ljava/lang/String;Ljava/lang/String;)V", "gamePause", data1
                );
            }

        }
    },

    ReStartTimer: function() {
        this.remainTime = this.timeToLeft;
        var minutes = Math.floor(this.remainTime / 60);
        var seconds = Math.floor(this.remainTime - (60 * minutes));
        if (seconds < 10) {
            this.timerText.string = "0" + minutes.toString() + ":0" + seconds.toString();
            this.pausePopupTimerText.string = "0" + minutes.toString() + ":0" + seconds.toString();
            this.gameOverPopupTimerText.string = "0" + minutes.toString() + ":0" + seconds.toString();
        } else {
            this.timerText.string = "0" + minutes.toString() + ":" + seconds.toString();
            this.pausePopupTimerText.string = "0" + minutes.toString() + ":" + seconds.toString();
            this.gameOverPopupTimerText.string = "0" + minutes.toString() + ":" + seconds.toString();
        }

        this.timerText.node.color = new cc.Color(255, 255, 255);
        this.timerText.node.getComponent(cc.Animation).stop('lessThan15SecAnimation');
        this.timerText.node.scale = 1;

        this.schedule(this.StartTimer, 1.0);
    },

});