function CInterface() {
    var _iIndexFicheSelected;
    var _szLastMsgHelp;
    var _aFiches;
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;
    var _pStartPosSettings;
    var _oAudioToggle;

    var _oButExit;
    var _oButSettings;

    var _oMoneyAmountText;
    var _oBetAmountText;

    var _oMsgTitle;
    var _oHelpText;
    var _oDisplayBg;
    var _oRollBut;
    var _pRollButPos;

    var _oClearAllBet;
    var _oRollingText;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    var _oBlock;

    var _selectedFichesNum;
    var ficheValuesForText;
    var _oSettingsPanel;

    this._init = function() {

        //Back button
        var oSprite = s_oSpriteLibrary.getSprite('but_back');
        _pStartPosExit = { x: Math.round(CANVAS_WIDTH / 8), y: Math.round(CANVAS_HEIGHT / 6.6) };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        // Settings button
        var oSprite = s_oSpriteLibrary.getSprite('but_settings');
        _pStartPosSettings = { x: CANVAS_WIDTH - 160, y: Math.round(CANVAS_HEIGHT / 6.6) };
        _oButSettings = new CGfxButton(_pStartPosSettings.x, _pStartPosSettings.y, oSprite, s_oStage);
        _oButSettings.addEventListener(ON_MOUSE_UP, this._onSettingButtonPressed, this);

        // ficheValuesForText = [0.1, 1, 5, 10, 25, 100];

        //Show my money
        var oMoneyTextPos = {
            x: Math.round(CANVAS_WIDTH / 3.5),
            y: Math.round(CANVAS_HEIGHT / 7.8)
        };
        var oMoneyText = new CTLText(s_oStage,
            // 260, 73, 140, 16,
            oMoneyTextPos.x, oMoneyTextPos.y, 140, 16,
            12, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            TEXT_MONEY,
            true, true, false,
            false);

        var _oMoneyAmountTextPos = {
            x: Math.round(CANVAS_WIDTH / 3.5),
            y: Math.round(CANVAS_HEIGHT / 6.4)
        };
        _oMoneyAmountText = new CTLText(s_oStage,
            // 260, 93, 150, 22,
            _oMoneyAmountTextPos.x, _oMoneyAmountTextPos.y, 150, 22,
            22, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            " ",
            true, true, false,
            false);

        //Show current bet
        var oCurBetTextPos = {
            x: Math.round(CANVAS_WIDTH / 1.6),
            y: Math.round(CANVAS_HEIGHT / 7.8)
        };
        var oCurBetText = new CTLText(s_oStage,
            // 815, 75, 140, 16,
            oCurBetTextPos.x, oCurBetTextPos.y, 140, 16,
            12, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            TEXT_CUR_BET,
            true, true, false,
            false);

        var _oBetAmountTextPos = {
            x: Math.round(CANVAS_WIDTH / 1.6),
            y: Math.round(CANVAS_HEIGHT / 6.4)
        };
        _oBetAmountText = new CTLText(s_oStage,
            // 815, 95, 150, 22,
            _oBetAmountTextPos.x, _oBetAmountTextPos.y, 150, 22,
            22, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            " ",
            true, true, false,
            false);

        //Min Bet Text
        var oMinBetTextPos = {
            x: Math.round(CANVAS_WIDTH / 1.438),
            y: Math.round(CANVAS_HEIGHT / 7.8)
        };
        var oMinBetText = new CTLText(s_oStage,
            // 910, 75, 140, 16,
            oMinBetTextPos.x, oMinBetTextPos.y, 140, 16,
            12, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            TEXT_MIN_BET,
            true, true, false,
            false);

        var oMinBetAmountTextPos = {
            x: Math.round(CANVAS_WIDTH / 1.438),
            y: Math.round(CANVAS_HEIGHT / 6.4)
        };
        var oMinBetAmountText = new CTLText(s_oStage,
            // 910, 95, 140, 22,
            oMinBetAmountTextPos.x, oMinBetAmountTextPos.y, 140, 22,
            22, "left", "#fff", FONT_REGULAR, 1,
            0, 0, TEXT_CURRENCY + MIN_BET,
            true, true, false,
            false);

        //Max Bet text
        var oMaxBetTextPos = {
            x: Math.round(CANVAS_WIDTH / 1.333),
            y: Math.round(CANVAS_HEIGHT / 7.8)
        };
        var oMaxBetText = new CTLText(s_oStage,
            // 980, 75, 140, 16,
            oMaxBetTextPos.x, oMaxBetTextPos.y, 140, 16,
            12, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            TEXT_MAX_BET,
            true, true, false,
            false);

        var oMaxBetAmountTextPos = {
            x: Math.round(CANVAS_WIDTH / 1.333),
            y: Math.round(CANVAS_HEIGHT / 6.4)
        };
        var oMaxBetAmountText = new CTLText(s_oStage,
            // 980, 95, 140, 22,
            oMaxBetAmountTextPos.x, oMaxBetAmountTextPos.y, 140, 22,
            22, "left", "#fff", FONT_REGULAR, 1,
            0, 0, TEXT_CURRENCY + MAX_BET,
            true, true, false,
            false);

        //Message text 
        _oHelpText = new CTLText(s_oStage,
            692, 310, 170, 80,
            20, "center", "#00ffa9", FONT_REGULAR, 1,
            0, 0,
            TEXT_WAITING_BET,
            true, true, true,
            false);


        _szLastMsgHelp = TEXT_WAITING_BET;

        //Roll out button after place the bet
        _pRollButPos = { x: Math.round(CANVAS_WIDTH / 1.4), y: Math.round(CANVAS_HEIGHT / 1.2) };
        _oRollBut = new CTextButton(_pRollButPos.x, _pRollButPos.y, s_oSpriteLibrary.getSprite('but_play_base'), TEXT_ROLL, FONT_SEMI_BOLD, "#000", 20, "center", s_oStage);
        _oRollBut.disable();
        _oRollBut.addEventListener(ON_MOUSE_UP, this._onRoll, this);

        //Clear all bet button
        // _oClearAllBet = new CGfxButton(645, 645, s_oSpriteLibrary.getSprite('but_clear_all'), s_oStage);
        _oClearAllBet = new CGfxButton(645, 640, s_oSpriteLibrary.getSprite('but_clear_all'), s_oStage);
        _oClearAllBet.addEventListener(ON_MOUSE_UP, this._onClearAllBet, this);

        this._initFichesBut();

        _iIndexFicheSelected = 0;
        _aFiches[_iIndexFicheSelected].select();
        var oGraphics = new createjs.Graphics().beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oBlock = new createjs.Shape(oGraphics);
        _oBlock.on("click", function() {});
        _oBlock.visible = false;
        s_oStage.addChild(_oBlock);

        _oSettingsPanel = new CSettingsPanel(s_oStage);


        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function() {
        _oButExit.unload();
        _oButSettings.unload();
        _oRollBut.unload();
        _oClearAllBet.unload();
        s_oInterface = null;
    };

    this.refreshButtonPos = function(iNewX, iNewY) {
        _oRollBut.setPosition(_pRollButPos.x, _pRollButPos.y);
        _oButExit.setPosition(_pStartPosExit.x, _pStartPosExit.y);
        _oButSettings.setPosition(_pStartPosSettings.x, _pStartPosSettings.y);
        _oSettingsPanel.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.setPositionOfObjects = function(_refObject, _posX, _posY) {
        _refObject.x = _posX;
        _refObject.y = _posY;
    };

    this.hideBlock = function() {
        _oBlock.visible = false;
    };

    this.showBlock = function() {
        _oBlock.visible = true;
    };

    this.enableBetFiches = function() {
        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i].enable();
        }
    };

    this.enableClearButton = function() {
        _oClearAllBet.enable();
    };

    this.disableBetFiches = function() {
        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i].disable();
        }
    };

    this.disableClearButton = function() {
        _oClearAllBet.disable();
    };

    this.deselectAllFiches = function() {
        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i].deselect();
        }
    };

    this.enableRoll = function(bEnable) {
        if (bEnable) {
            _oRollBut.enable();
        } else {
            _oRollBut.disable();
        }

    };

    this._initFichesBut = function() {
        // Side chip box bg
        var oFicheBg = createBitmap(s_oSpriteLibrary.getSprite('chip_box'));
        oFicheBg.x = 82;
        oFicheBg.y = 94;
        s_oStage.addChild(oFicheBg);
        oFicheBg.visible = false;

        //SET FICHES BUTTON
        var iCurX = 300;
        var iCurY = 640;
        _aFiches = new Array();
        _selectedFichesNum = new Array();

        for (var i = 0; i < NUM_FICHES; i++) {
            //Bet coin/fiche 6 type
            // var oSprite = s_oSpriteLibrary.getSprite('fiche_' + i);
            var oSprite = s_oSpriteLibrary.getSprite('fiche_new_' + i);
            // var oSprite = s_oSpriteLibrary.getSprite('fiche_base');

            _aFiches[i] = new CFicheBut(iCurX, iCurY, oSprite);
            _aFiches[i].addEventListenerWithParams(ON_MOUSE_UP, this._onFicheSelected, this, [i]);

            // _selectedFichesNum[i] = new CTLText(s_oStage,
            //     iCurX - 85, iCurY - 39, 170, 80,
            //     18, "center", "#fff", FONT_REGULAR, 1,
            //     0, 0,
            //     ficheValuesForText[i],
            //     true, true, true,
            //     false);
            // iCurY += oSprite.height + 25;
            // iCurX += oSprite.width + 8;
            iCurX += oSprite.width + 12;


        }
    };

    this.setMoney = function(iMoney) {
        // _oMoneyAmountText.refreshText(iMoney.toFixed(2) + TEXT_CURRENCY);
        _oMoneyAmountText.refreshText(TEXT_CURRENCY + iMoney.toFixed(2));
    };

    this.refreshMoney = function(iStartMoney, iMoney) {
        _oRollingText = new CRollingTextController(_oMoneyAmountText.getText(), null, iStartMoney, parseFloat(iMoney), 4000, EASE_LINEAR, TEXT_CURRENCY);
    };

    this.setCurBet = function(iCurBet) {
        // _oBetAmountText.refreshText(iCurBet.toFixed(2) + TEXT_CURRENCY);
        _oBetAmountText.refreshText(TEXT_CURRENCY + iCurBet.toFixed(2));
    };

    this.refreshMsgHelp = function(szText, bLastState) {
        _oHelpText.refreshText(szText);
        if (bLastState) {
            _szLastMsgHelp = szText;
        }
    };

    this.clearMsgHelp = function() {
        _oHelpText.refreshText(_szLastMsgHelp);
    };

    this._onBetRelease = function(oParams) {
        var aBets = oParams.numbers;

        if (aBets !== null) {
            s_oGame._onShowBetOnTable({ button: oParams.name }, false);
        }
    };

    this._onFicheSelected = function(aParams) {
        playSound("fiche_collect", 1, false);

        // console.log("aParams: ", aParams);
        // console.log("_selectedFichesNum: ", _selectedFichesNum);
        this.deselectAllFiches();
        var iFicheIndex = aParams[0];
        for (var i = 0; i < NUM_FICHES; i++) {
            if (i === iFicheIndex) {
                _iIndexFicheSelected = i;
            }
        }
    };

    this._onRoll = function() {
        this.disableBetFiches();
        this.enableRoll(false);
        s_oGame.onRoll();
    };

    this._onClearAllBet = function() {
        s_oGame.onClearAllBets();
    };

    this._onExit = function() {
        s_oGame.onExit(false);
    };

    this._onSettingButtonPressed = function() {
        console.log("setting button pressed");
        _oSettingsPanel.show();
    };

    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    // this.resetFullscreenBut = function() {
    //     // if (_fRequestFullScreen && screenfull.isEnabled) {
    //     //     _oButFullscreen.setActive(s_bFullscreen);
    //     // }
    // };

    // this._onFullscreenRelease = function() {
    //     if (s_bFullscreen) {
    //         _fCancelFullScreen.call(window.document);
    //     } else {
    //         _fRequestFullScreen.call(window.document.documentElement);
    //     }

    //     sizeHandler();
    // };

    this.getCurFicheSelected = function() {
        return _iIndexFicheSelected;
    };

    this.isBlockVisible = function() {
        return _oBlock.visible;
    };

    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;;