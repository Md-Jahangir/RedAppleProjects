var _oFielder = [];

function CGame(oData, iPlayerTeam, iOpponentTeam) {
    var _idleBatterWait = 0;
    var _idleBatterStrike = 0;
    var _idlePitcher = 99;
    var _iBallThrowed = 0;
    var _iPressedDir = -1;
    var _iLives;


    var _bUpdate;
    var _bWaiting = false; //0 waiting state, 1 striking state
    var _bBallThrowed = false;
    var _bMissed = false;
    var _bInput = true;
    var _bBeat = false;
    var _bStartGame;

    var _oInterface;

    var _oGameScore = null;
    var _oParent;

    var _oContainerGame;

    var _oBatter;
    var _oBowler;
    var _oTarget;
    var _oPole;

    var idleFielderState = 51;

    var _oUmpire;
    var idleUmpireState = 0;
    var _oNonStrikerBatter;

    var _oNonStrikerRunBatsman;
    var _oStrikerRunBatsman;

    // Added To Manipulate Per Frame
    var frameCount = 0;

    this._init = function(iPlayerTeam, iOpponentTeam) {
        $(s_oMain).trigger("start_session");

        setVolume("soundtrack", 0.35);

        playSound("crowd_cheering", 1, true);

        oGameplayBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oGameplayBg);

        _oContainerGame = new createjs.Container();
        s_oStage.addChild(_oContainerGame);

        _oInterface = new CInterface();

        _oBowler = new CBowler(_oContainerGame, iOpponentTeam);

        //Create Fielder call from Cfielder.js
        for (var i = 0; i < NUM_OF_FIELDER; i++) {
            _oFielder[i] = new CFielder(_oContainerGame, iOpponentTeam, FIELDER_SCALE_X[i], FIELDER_SCALE_Y[i], FIELDER_X[i], FIELDER_Y[i]);
        }

        //Create umpire
        _oUmpire = new CUmpire(_oContainerGame);


        var oSpritePole = s_oSpriteLibrary.getSprite("pole_1");
        _oPole = new CPole(CANVAS_WIDTH_HALF - 3, CANVAS_HEIGHT - 792, oSpritePole, _oContainerGame, 0.4);

        var oSpriteTarget = s_oSpriteLibrary.getSprite("ball_target");
        _oTarget = new CBallTarget(-100, -100, oSpriteTarget, _oContainerGame);
        _oTarget.setVisible(false);

        s_oBall = new CBall(_oContainerGame);
        _oBatsmanHint = new CBatsmanHint(_oContainerGame);

        this.ballResetPos();

        _iLives = LIVES;

        _oBatter = new CBatter(_oContainerGame, iPlayerTeam);
        //Non striker batter
        _oNonStrikerBatter = new CNonStrikerBatter(_oContainerGame, iPlayerTeam);

        _oStrikerRunBatsman = new CRunBatsman(_oContainerGame,STRIKER_RUN_X,STRIKER_RUN_Y,1.2,1.2);
        _oNonStrikerRunBatsman = new CRunBatsman(_oContainerGame,NON_STRIKER_RUN_X,NON_STRIKER_RUN_Y,0.6,0.6);

        var oSpritePole = s_oSpriteLibrary.getSprite("pole_0");
        _oPole = new CPole(CANVAS_WIDTH_HALF + 50, CANVAS_HEIGHT - 90, oSpritePole, _oContainerGame, 1.3);



        if (s_bMobile === false) {
            document.onkeydown = onKeyDown;
        } else {
            _oInterface.createController();
            _oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
            _oInterface.createHitArea();
        }

        _bStartGame = true;

        _oInterface.createHelpPanel();
    };

    this.launchCountdown = function() {
        var oMissed = createBitmap(s_oSpriteLibrary.getSprite('3'));
        oMissed.x = CANVAS_WIDTH / 2;
        oMissed.y = CANVAS_HEIGHT / 2;
        oMissed.regX = 40;
        oMissed.regY = 84;
        _oContainerGame.addChild(oMissed);
        playSound("countdown1", 1, false);

        createjs.Tween.get(oMissed).to({ scaleX: 1.3, scaleY: 1.3 }, (500), createjs.Ease.cubicOut).wait(500).call(function() {
            this.visible = false;
            var oMissed = createBitmap(s_oSpriteLibrary.getSprite('2'));
            oMissed.x = CANVAS_WIDTH / 2;
            oMissed.y = CANVAS_HEIGHT / 2;
            oMissed.regX = 40;
            oMissed.regY = 84;
            oMissed.scaleX = 0.7;
            oMissed.scaleY = 0.7;
            _oContainerGame.addChild(oMissed);
            playSound("countdown1", 1, false);

            createjs.Tween.get(oMissed).to({ scaleX: 1.3, scaleY: 1.3 }, (500), createjs.Ease.cubicOut).wait(500).call(function() {
                _oContainerGame.removeChild(this);
                var oMissed = createBitmap(s_oSpriteLibrary.getSprite('1'));
                oMissed.x = CANVAS_WIDTH / 2;
                oMissed.y = CANVAS_HEIGHT / 2;
                oMissed.regX = 40;
                oMissed.regY = 84;
                oMissed.scaleX = 0.7;
                oMissed.scaleY = 0.7;
                _oContainerGame.addChild(oMissed);
                playSound("countdown1", 1, 0);

                createjs.Tween.get(oMissed).to({ scaleX: 1.3, scaleY: 1.3 }, (500), createjs.Ease.cubicOut).wait(500).call(function() {
                    _oContainerGame.removeChild(this);
                    _oInterface.createAnimText(TEXT_START, 100, false, null, 300, function() {
                        _oContainerGame.removeChild(this);
                        _bUpdate = true;
                        _oInterface.setHitAreaVisible(false);
                    });
                    playSound("countdown2", 1, false);
                });
            });
        });
    };

    this._onExitHelpPanel = function() {
        _oInterface.onExitFromHelp();
        this.launchCountdown();
        $(s_oMain).trigger("start_level", 1);
    };

    //For keyboard input
    function onKeyDown(evt) {
        if (_bInput === true) {
            if (!_bBeat) {
                if (evt.keyCode === 37) { //left arrow
                    s_oGame.hitLeft();

                } else if (evt.keyCode === 38) { //up arrow
                    s_oGame.hitCenter();

                } else if (evt.keyCode === 39) { //right arrow
                    s_oGame.hitRight();

                }
            }
        }
        evt.preventDefault();
        return false;
    }

    this.hitLeft = function() {
        _iPressedDir = HIT_LEFT;
        setTimeout(() => {
            s_oBall.hitBall();
        }, 200);
        _oBatter.viewPullBatter();
        s_oGame._strike();
        s_oGame.beatDirection();
    };

    this.hitCenter = function() {
        _iPressedDir = HIT_CENTER;
        setTimeout(() => {
            s_oBall.hitBall();
        }, 200);
        _oBatter.viewStraightBatter();
        s_oGame._strike();
        s_oGame.beatDirection();
    };

    this.hitRight = function() {
        _iPressedDir = HIT_RIGHT;
        setTimeout(() => {
            s_oBall.hitBall();
        }, 250);
        _oBatter.viewCuttingBatter();
        s_oGame._strike();
        s_oGame.beatDirection();
    };


    this._strike = function() {
        _bWaiting = !_bWaiting;
        _bBeat = true;
        _oInterface.setHitAreaVisible(true);
    };

    this._ballMissed = function(isWicket) {
        _bUpdate = false;
        _bMissed = true;
        playSound("crowd_ohhh", 1, false);
        if (isWicket) {
            _oUmpire.viewOutUmpire();
            _oInterface.createAnimText(TEXT_BOWLED, 60, false, null, 700, this.afterBallMissed);
            _oPole.PlayWicketFallAnimation();
            _iLives--;
            _oInterface.refreshLivesText(_iLives);
            isWicket = false;
        } else {
            this.afterBallMissed();
            isWicket = false;
        }

        _oTarget.setVisible(false);

    };



    this.afterBallMissed = function() {
        _idleBatterWait = 0;
        if (_bWaiting) {
            s_oGame._strike();
        }
        s_oGame.changeStateTarget(false);

        _bUpdate = true;
        _bBeat = false;
        _oInterface.setHitAreaVisible(false);
    };

    this.getMissed = function() {
        return _bMissed;
    };

    this.setScore = function(iValue) {
        _iScore += Math.floor(iValue);
        _oInterface.viewScore(_iScore);
    };

    this.unload = function() {
        if (s_bMobile === false) {
            document.onkeydown = null;
        }

        _oInterface.unload();

        if (_oGameScore !== null) {
            _oGameScore.unload();
        }

        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
    };

    this.onExit = function() {
        this.unload();
        s_oMain.gotoMenu();

        setVolume("soundtrack", 1);

        stopSound("crowd_cheering");

        $(s_oMain).trigger("end_level", 1);
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
    };

    this.gameOver = function() {
        _bUpdate = false;
        _bInput = false;
        _oGameScore = CGameScore();
        _oGameScore.ShowGameScore();
    };

    this.makePlayersVisible = function(fHitValue) {
        _oBatter.makeVisible();
        _oNonStrikerBatter.makeVisible();
    };

    this._ballHitted = function(fHitValue) {
        _bUpdate = false;

        var bStrobe = false;
        playSound("applauses", 1, false);

        var iPoint = SCORE_HIT - fHitValue;

        var szText;
        if (iPoint >= POINT_TEXT_EXCELLENT) {
            //six run
            _oUmpire.viewSixUmpire();
            szText = TEXT_CONGRATULATION[4];
            // bStrobe = true;
            this.setScore(TEXT_CONGRATULATION[4]);
        } else if (iPoint >= POINT_TEXT_GREAT) {
            //four run
            _oUmpire.viewFourUmpire();
            szText = TEXT_CONGRATULATION[3];
            // bStrobe = true;
            this.setScore(TEXT_CONGRATULATION[3]);
        } else if (iPoint >= POINT_TEXT_OUT) {
            //Out
            var returnValue = s_oBall.ReturnFielder();
            var randomAnim = parseInt(Math.random() * 4 + 1);
            switch (returnValue) {
                case 0:
                    this.CheckNotOutWhenSatisfy(iPoint, szText, bStrobe);
                    break;
                case 1:
                    this.PlayFielderAnimation(randomAnim, returnValue);
                    break;
                case 2:
                    this.PlayFielderAnimation(randomAnim, returnValue);
                    break;
                case 3:
                    this.PlayFielderAnimation(randomAnim, returnValue);
                    break;
                case 4:
                    this.PlayFielderAnimation(randomAnim, returnValue);
                    break;
                default:
                    break;
            }
            if (_bRolling) {
                var rnd = Math.floor(Math.random() * 4);
                var szText = TEXT_CONGRATULATION[rnd];
                this.setScore(TEXT_CONGRATULATION[rnd]);
                if (rnd < 3) {
                    _oBatter.makeInvisible();
                    _oNonStrikerBatter.makeInvisible();
                    _oStrikerRunBatsman.viewStrikerAnimation(rnd + 1);
                    _oNonStrikerRunBatsman.viewNonStrikerAnimation(rnd + 1);
                }
            } else {
                _oInterface.createAnimText(TEXT_CATCH, 60, false, null, 1000, this.afterBallMissed);
                _iLives--;
                _oInterface.refreshLivesText(_iLives);
            }
        } else if (iPoint >= POINT_TEXT_GOOD) {
            //three run
            var szText = TEXT_CONGRATULATION[2];
            this.setScore(TEXT_CONGRATULATION[2]);
            //PLAY THE RUNERS ANIMATION
            _oBatter.makeInvisible();
            _oNonStrikerBatter.makeInvisible();
            _oStrikerRunBatsman.viewStrikerAnimation(3);
            _oNonStrikerRunBatsman.viewNonStrikerAnimation(3);
        } else if (iPoint >= POINT_TEXT_LESS_GOOD) {
            //Two run
            var szText = TEXT_CONGRATULATION[1];
            this.setScore(TEXT_CONGRATULATION[1]);
            _oBatter.makeInvisible();
            _oNonStrikerBatter.makeInvisible();
            _oStrikerRunBatsman.viewStrikerAnimation(2);
            _oNonStrikerRunBatsman.viewNonStrikerAnimation(2);
        } else {
            //One run
            var szText = TEXT_CONGRATULATION[0];
            this.setScore(TEXT_CONGRATULATION[0]);
            _oBatter.makeInvisible();
            _oNonStrikerBatter.makeInvisible();
            _oStrikerRunBatsman.viewStrikerAnimation(1);
            _oNonStrikerRunBatsman.viewNonStrikerAnimation(1);
        }
        _oInterface.createAnimText(szText, 200, bStrobe, TEXT_EXCELLENT_COLOR, 1000, this.afterBallHit);
        s_oBall.hideBall();
    };

    this.CheckNotOutWhenSatisfy = function(iPoint, szText, bStrobe) {
        if(_bRolling){
            return;
        }
        if (iPoint > 80) {
            //SIX
            _oUmpire.viewSixUmpire();
            szText = TEXT_CONGRATULATION[3];
            this.setScore(TEXT_CONGRATULATION[3]);
        } else {
            //FOUR
            _oUmpire.viewFourUmpire();
            szText = TEXT_CONGRATULATION[2];
            this.setScore(TEXT_CONGRATULATION[2]);
        }
    };

    this.PlayFielderAnimation = function(randomValue, returnValue) {
        if (randomValue == 1) {
            _oFielder[returnValue - 1].viewSideCatchFielder();
        } else if (randomValue == 2) {
            _oFielder[returnValue - 1].viewStraightCatchFielder();
        } else if (randomValue == 3) {
            _oFielder[returnValue - 1].viewJumpSideCatchFielder();
        } else if (randomValue == 4) {
            _oFielder[returnValue - 1].viewJumpStraightCatchFielder();
        }
        _oUmpire.viewOutUmpire();
    };

    this.afterBallHit = function() {
        s_oGame._restart();
        s_oBall.addVelocity();
        _bUpdate = true;
    };

    this.changeStateTarget = function(bVal) {
        _oTarget.changeState(bVal);
    };

    this.randomDir = function() {
        _iRandDir = Math.floor(Math.random() * LAUNCH_DIR_OFFSET_RANGE.length);
    };

    this.ballResetPos = function() {
        this.randomDir();

        var iRandRangeX = (Math.random() * (LAUNCH_DIR_OFFSET_RANGE[_iRandDir].max - LAUNCH_DIR_OFFSET_RANGE[_iRandDir].min)) + LAUNCH_DIR_OFFSET_RANGE[_iRandDir].min;
        var pEndPosRandom = { x: END_POINT_X_THROWN + iRandRangeX, y: END_POINT_Y_THROWN };
        PERFECT_HIT_X = pEndPosRandom.x;

        _oTarget.setPosition(pEndPosRandom.x, pEndPosRandom.y);

        s_oBall.reset(pEndPosRandom);
    };

    this.pause = function(bVal) {
        _bStartGame = !bVal;
        createjs.Ticker.paused = bVal;
    };

    this._restart = function() {
        if (_iLives <= 0) {
            this.gameOver();
        } else {
            frameCount = 0;
            this.ballResetPos();
            _oTarget.setVisible(false);
            s_oGame.changeStateTarget(false);
            s_bBounce = true;
            _bBallThrowed = false;
            _bMissed = false;
            this._strike();
            _bBeat = false;
            _oInterface.setHitAreaVisible(false);
        }
    };

    this.resetGame = function() {
        _ballCounter = 0;
        _iLives = LIVES;
        _oInterface.refreshOversText(_OVER_TEXT);
        _oInterface.refreshLivesText(_iLives);
        _iScore = 0;
        _oInterface.viewScore(_iScore);
        _bUpdate = true;
        _bWaiting = true;
        _bInput = true;
        _bBeat = false;
        this._restart();
        $(s_oMain).trigger("restart_level", 1);
    };

    this.ballMissedRestart = function() {
        if (_iLives <= 0) {
            this.gameOver();
        } else {
            this.ballResetPos();
            _bBallThrowed = false;
            if (_idleBatterStrike > 0) {
                this._strike();
            }
            _bMissed = false;
            _bBeat = false;
            _oInterface.setHitAreaVisible(false);
        }
    };

    this.beatDirection = function() {
        if (_iPressedDir === _iRandDir) {
            s_oBall.hitControl();
        }
    };

    this.update = function() {
        if (_bUpdate && _bStartGame) {

            if (_bMissed === true) {
                this.ballMissedRestart();
            }

            if (!_bBallThrowed || _idlePitcher + 1 < NUM_SPRITE_BOWLER) {
                _oBowler.hideBowler(_idlePitcher);
                if (_idlePitcher + 1 < NUM_SPRITE_BOWLER) {
                    _oBowler.viewBowler(_idlePitcher + 1);
                    _idlePitcher++;
                } else {
                    _idlePitcher = 99;
                }
                if (_idlePitcher === 150) {
                    _iBallThrowed++;
                    s_oBall.viewBall();
                    _oTarget.setVisible(true);
                    _bBallThrowed = true;
                }
            }

            if (_bBallThrowed) {
                s_oBall.update();
                _OVER_TEXT = s_oBall.CalculateOver(_ballCounter);
                _oInterface.refreshOversText(_OVER_TEXT);
            }

            if (!_bBallThrowed) {
                if (_ballCounter >= 12) {
                    this.gameOver();
                }

            }

        }
    };

    this.ShowHint = function(duration){
        _oBatsmanHint.ShowIndicatorAnimation(duration);
    };

    s_oGame = this;
    _oParent = this;

    LIVES = oData.lives;
    OFFSET_FOR_HIT = oData.offset_hit;
    OFFSET_FOR_PERFECT_HIT = oData.offset_perfect_hit;
    STEP_SPEED_BALL = oData.start_speed_ball;
    BALL_VELOCITY_ADDED = oData.ball_velocity_added;
    MAX_BALL_VELOCITY = oData.max_ball_velocity;
    SCORE_HIT = oData.score_ball_hit;
    NUM_LEVEL_FOR_ADS = oData.num_levels_for_ads;

    ALMOST_MINUS = PERFECT_HIT_Y - OFFSET_FOR_HIT;
    ALMOST_PLUS = PERFECT_HIT_Y + OFFSET_FOR_HIT;
    POINT_TEXT_EXCELLENT = SCORE_HIT - OFFSET_FOR_PERFECT_HIT + 5;

    this._init(iPlayerTeam, iOpponentTeam);
}

var s_oGame;