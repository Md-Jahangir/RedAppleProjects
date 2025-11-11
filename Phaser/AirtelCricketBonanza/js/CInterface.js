function CInterface() {
    var _oAudioToggle;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    var _oBatsmanDetailsButton;
    var _pStartPosBatsmanDetailsButton;

    var _oBowlersButton;
    var _pStartPosBowlersButton;


    var _oSpriteBall;
    var _oScoreText;
    var _oScoreText1;
    var _oBallText1;

    var _overText;
    var _overHeadingText;
    var _pStartPositionBallForOverHeadingText;

    var _oScoreBoard;
    var _oController = null;

    var _oPause;
    var _oHelpPanel = null;
    var _oHitArea = null;

    var _pStartPosScore;
    var _pStartPosBall;
    var _pStartPositionScoreText;
    var _pStartPositionScore;
    var _pStartPositionBallText;

    var _pStartPositionBallForOverText;

    var _pStartPosExit;
    var _pStartPosPause;

    var _iStep;

    var _pStartPositionRun;
    var _oRunText;


    this._init = function() {

        // //Exit button
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = { x: CANVAS_WIDTH - (oSprite.height / 2) - 220, y: (oSprite.height / 2) + 185 };
        
        //Pause button
        var oSprite = s_oSpriteLibrary.getSprite('but_pause');
        _pStartPosPause = { x: _pStartPosExit.x - oSprite.height - 195, y: _pStartPosExit.y };
        
        //Sound on off button
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = { x: _pStartPosPause.x - oSprite.height + 552, y: _pStartPosExit.y - 160 };

            _pStartPosFullscreen = { x: _pStartPosAudio.x - oSprite.width / 2 - 10, y: _pStartPosAudio.y };
        } else {
            _pStartPosFullscreen = { x: _pStartPosPause.x - oSprite.height - 10, y: _pStartPosExit.y };
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (ENABLE_FULLSCREEN === false) {
            _fRequestFullScreen = false;
        }

        var oSpriteScore = s_oSpriteLibrary.getSprite('score_panel');
        _pStartPosScore = { x: (CANVAS_WIDTH / 2) - 205, y: 60 };
        _oScoreBoard = createBitmap(oSpriteScore);
        _oScoreBoard.x = _pStartPosScore.x;
        _oScoreBoard.y = _pStartPosScore.y;
        _oScoreBoard.regX = oSpriteScore.width * 0.5;
        _oScoreBoard.regY = oSpriteScore.height * 0.5;

        s_oStage.addChild(_oScoreBoard);

        _pStartPositionRun = { x: (CANVAS_WIDTH / 2) - 310, y:(CANVAS_HEIGHT/2)- 619 };
        _oRunText = new createjs.Text("Run", "25px " + TondoRG, "#ffffff");
        _oRunText.x = _pStartPositionRun.x;
        _oRunText.y = _pStartPositionRun.y;
        _oRunText.textAlign = "left";
        _oRunText.textBaseline = "alphabetic";
        s_oStage.addChild(_oRunText);

        _pStartPositionScore = { x: (CANVAS_WIDTH / 2) - 140, y: (CANVAS_HEIGHT/2)- 619 };
        _oScoreText1 = new createjs.Text("0/", "25px " + TondoRG, "#ffffff");
        _oScoreText1.x = _pStartPositionScore.x;
        _oScoreText1.y = _pStartPositionScore.y;
        _oScoreText1.textAlign = "right";
        _oScoreText1.textBaseline = "alphabetic";
        s_oStage.addChild(_oScoreText1);

        _pStartPositionBallText = { x: (CANVAS_WIDTH / 2) - 140, y: (CANVAS_HEIGHT/2)- 619 };
        _oBallText1 = new createjs.Text(10 - LIVES, "25px " + TondoRG, "#ffffff");
        _oBallText1.x = _pStartPositionBallText.x;
        _oBallText1.y = _pStartPositionBallText.y;
        _oBallText1.textAlign = "left";
        _oBallText1.textBaseline = "alphabetic";
        s_oStage.addChild(_oBallText1);

        //OVER HEADING TEXT SHOWING
        _pStartPositionBallForOverHeadingText = { x: (CANVAS_WIDTH / 2) - 310, y: (CANVAS_HEIGHT/2)- 583 };
        _overHeadingText = new createjs.Text("Over", "24px " + TondoRG, "#ffffff");
        _overHeadingText.x = _pStartPositionBallForOverHeadingText.x;
        _overHeadingText.y = _pStartPositionBallForOverHeadingText.y;
        _overHeadingText.textAlign = "left";
        _overHeadingText.textBaseline = "alphabetic";
        s_oStage.addChild(_overHeadingText);

        //OVER TEXT SHOWING
        _pStartPositionBallForOverText = { x: (CANVAS_WIDTH / 2) - 175, y: (CANVAS_HEIGHT/2)- 583 };
        _overText = new createjs.Text(_OVER_TEXT, "25px " + TondoRG, "#ffffff");
        _overText.x = _pStartPositionBallForOverText.x;
        _overText.y = _pStartPositionBallForOverText.y;
        _overText.textAlign = "left";
        _overText.textBaseline = "alphabetic";
        s_oStage.addChild(_overText);

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);

        _ballCounter = 0;
        _OVER_TEXT = "0.0";
        this.refreshOversText(_OVER_TEXT);
    };

    this.unload = function() {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        }

        if (s_bMobile) {
            _oHitArea.removeAllEventListeners();
            _oController.unload();
        }

        s_oInterface = null;
    };

    this.refreshButtonPos = function(iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        }

        _oScoreBoard.x = _pStartPosScore.x + iNewX;
        _oScoreBoard.y = _pStartPosScore.y + iNewY;

        _oScoreText1.x = _pStartPositionScore.x + iNewX;
        _oBallText1.x = _pStartPositionBallText.x + iNewX;

        if (_oController !== null) {
            var oPosLeft = _oController.getStartPositionControlLeft();
            _oController.setPositionControlLeft(oPosLeft.x + iNewX, oPosLeft.y - iNewY);

            var oPosRight = _oController.getStartPositionControlRight();
            _oController.setPositionControlRight(oPosRight.x - iNewX, oPosRight.y - iNewY);
        }
    };

    this.createController = function() {
        _oController = new CController();
    };

    this.createHitArea = function() {
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        _oHitArea.on("click", function() {});
        s_oStage.addChild(_oHitArea);
    };

    this.setHitAreaVisible = function(bVal) {
        if (_oHitArea !== null)
            _oHitArea.visible = bVal;
    };

    this.createAnimText = function(szText, iSize, bStrobo, aColors, iTime, oFunction) {
        var oContainer = new createjs.Container();
        oContainer.scaleX = 0;
        oContainer.scaleY = 0;

        var oTextStroke = new createjs.Text(szText, iSize + "px " + TondoRG, "#000");
        oTextStroke.x = 0;
        oTextStroke.y = -30;
        oTextStroke.textAlign = "center";
        oTextStroke.textBaseline = "middle";
        oTextStroke.outline = 4;
        oContainer.addChild(oTextStroke);

        var oText = new createjs.Text(szText, iSize + "px " + TondoRG, "#ffffff");
        oText.x = 0;
        oText.y = -30;
        oText.textAlign = "center";
        oText.textBaseline = "middle";
        oContainer.addChild(oText);

        oContainer.x = CANVAS_WIDTH_HALF;
        oContainer.y = CANVAS_HEIGHT_HALF;

        if (bStrobo) {
            _iStep = 0;
            s_oInterface.strobeText(oText, aColors);
        }
        s_oStage.addChild(oContainer);

        createjs.Tween.get(oContainer).to({ scaleX: 1, scaleY: 1 }, iTime, createjs.Ease.cubicOut).call(function() {
            createjs.Tween.get(oContainer).wait(300).to({ scaleX: 0, scaleY: 0 }, iTime, createjs.Ease.cubicOut).call(function() {
                if (bStrobo) {
                    createjs.Tween.removeTweens(oText);
                }
                oFunction();
                s_oStage.removeChild(oContainer);
            });
        });
    };

    this.strobeText = function(oText, aColors) {
        createjs.Tween.get(oText).wait(30).call(function() {
            if (_iStep < aColors.length - 1) {
                _iStep++;
            } else {
                _iStep = 0;
            }
            oText.color = aColors[_iStep];
            s_oInterface.strobeText(oText, aColors);
        });
    };

    this.animBallHit = function() {
        var oSpriteHit = s_oSpriteLibrary.getSprite("hit_msg");
        var oHit = createBitmap(oSpriteHit);
        oHit.x = CANVAS_WIDTH_HALF;
        oHit.y = CANVAS_HEIGHT_HALF;
        oHit.regX = oSpriteHit.width * 0.5;
        oHit.regY = oSpriteHit.height * 0.5;
        oHit.scaleX = 0;
        oHit.scaleY = 0;

        s_oStage.addChild(oHit);

        createjs.Tween.get(oHit).to({ scaleX: 1, scaleY: 1 }, (500), createjs.Ease.cubicOut).wait(800).call(function() {
            s_oGame.afterBallHit();
            s_oStage.removeChild(oHit);
        });
    };

    this.viewScore = function(iValue) {
        _oScoreText1.text = iValue + "/";
    };

    this.refreshLivesText = function(iLives) {
        _oBallText1.text = 10 - iLives;
    };

    this.refreshOversText = function(overtext) {
        _overText.text = overtext;
    };

    this.createHelpPanel = function() {
        _oHelpPanel = new CHelpPanel(0, 0, s_oSpriteLibrary.getSprite("share_popup"));
    };

    this._onButRestartRelease = function() {
        s_oGame.restartGame();
    };

    this.onExitFromHelp = function() {
        if (_oHelpPanel !== null)
            _oHelpPanel.unload();
    };

    this.unloadPause = function() {
        _oPause.unload();
        _oPause = null;
    };

    // this.onButPauseRelease = function() {
    //     _oPause = new CPause();
    // };

    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onBatsmanDetailsButtonPressed = function() {
        var oBatsmanDeatils = new CBatsManDetailsPanel(s_oStage);
        oBatsmanDeatils.show();
    };
    this._onBowlersDetailsButtonPressed = function() {
        var oBowlersDeatils = new CBowlersDetailsPanel(s_oStage);
        oBowlersDeatils.show();
    };

    this.HowToPlayButtonPressed = function() {
    };

    this.resetFullscreenBut = function() {
        if (_fRequestFullScreen && screenfull.enabled) {
        }
    };

    this._onFullscreenRelease = function() {
        if (s_bFullscreen) {
            _fCancelFullScreen.call(window.document);
        } else {
            _fRequestFullScreen.call(window.document.documentElement);
        }

        sizeHandler();
    };


    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;