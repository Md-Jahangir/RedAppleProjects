function CInterface() {
    var _iIndexFicheSelected;
    var _szLastMsgHelp;
    var _aFiches;
    var _pStartPosExit;
    var _pStartPosSettings;
    var _oButExit;
    // var _oButSettings;
    var _oMoneyAmountText;
    var _oBetAmountText;
    var _oHelpText;
    var _oRollBut;
    var _pRollButPos;
    var _oClearAllBet;
    var _oRollingText;
    var _oBlock;
    var _selectedFichesNum;
    var _oSettingsPanel;

    var _oAudioToggle;
    var _pStartPosAudio;
    var _oButInfo;
    var _pStartPosInfo;

    this._init = function () {

        // //Back button
        // var oSprite = s_oSpriteLibrary.getSprite('but_back');
        // _pStartPosExit = { x: Math.round(CANVAS_WIDTH / 8), y: Math.round(CANVAS_HEIGHT / 6.6) };
        // _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        // _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        //Info button
        var oSprite = s_oSpriteLibrary.getSprite('but_info');
        _pStartPosInfo = { x: Math.round(CANVAS_WIDTH / 20), y: Math.round(CANVAS_HEIGHT / 12) };
        _oButInfo = new CGfxButton(_pStartPosInfo.x, _pStartPosInfo.y, oSprite, s_oStage);
        _oButInfo.addEventListener(ON_MOUSE_UP, this._onCredits, this);


        //Back button
        var oSprite = s_oSpriteLibrary.getSprite('but_close');
        _pStartPosExit = { x: Math.round(CANVAS_WIDTH / 1.05), y: Math.round(CANVAS_HEIGHT / 12) };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        //Audio button
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = { x: _pStartPosExit.x - 150, y: _pStartPosExit.y };
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            // _oAudioToggle = new CGfxButton(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        // Settings button
        // var oSprite = s_oSpriteLibrary.getSprite('but_settings');
        // _pStartPosSettings = { x: CANVAS_WIDTH - 160, y: Math.round(CANVAS_HEIGHT / 6.6) };
        // _oButSettings = new CGfxButton(_pStartPosSettings.x, _pStartPosSettings.y, oSprite, s_oStage);
        // _oButSettings.addEventListener(ON_MOUSE_UP, this._onSettingButtonPressed, this);

        var moneyBase = createBitmap(s_oSpriteLibrary.getSprite('money_base'));
        moneyBase.x = Math.round(CANVAS_WIDTH / 3);
        moneyBase.y = Math.round(CANVAS_HEIGHT / 32);
        s_oStage.addChild(moneyBase);

        //Show my money
        var oMoneyTextPos = {
            // x: Math.round(CANVAS_WIDTH / 3.5),
            // y: Math.round(CANVAS_HEIGHT / 7.8)
            x: moneyBase.x + 70,
            y: moneyBase.y + 15
        };
        var oMoneyText = new CTLText(s_oStage,
            oMoneyTextPos.x, oMoneyTextPos.y, 150, 22,
            18, "left", "#fff", FONT_GEORGIA, 1,
            0, 0,
            languageService.getString("TEXT_MONEY"),
            true, true, false,
            false);

        var _oMoneyAmountTextPos = {
            x: moneyBase.x + 50,
            y: moneyBase.y + 50
        };
        _oMoneyAmountText = new CTLText(s_oStage,
            _oMoneyAmountTextPos.x, _oMoneyAmountTextPos.y, 150, 22,
            20, "left", "#fff", FONT_CAMBRIAB, 1,
            0, 0,
            " ",
            true, true, false,
            false);
        //Show current bet
        var oCurBetTextPos = {
            // x: Math.round(CANVAS_WIDTH / 1.7),
            // y: Math.round(CANVAS_HEIGHT / 7.8)
            x: moneyBase.x + 265,
            y: moneyBase.y + 15
        };
        var oCurBetText = new CTLText(s_oStage,
            oCurBetTextPos.x, oCurBetTextPos.y, 150, 22,
            18, "left", "#fff", FONT_GEORGIA, 1,
            0, 0,
            languageService.getString("TEXT_CUR_BET"),
            true, true, false,
            false);

        var _oBetAmountTextPos = {
            // x: Math.round(CANVAS_WIDTH / 1.7),
            // y: Math.round(CANVAS_HEIGHT / 6.4)
            x: moneyBase.x + 272,
            y: moneyBase.y + 50
        };
        _oBetAmountText = new CTLText(s_oStage,
            _oBetAmountTextPos.x, _oBetAmountTextPos.y, 150, 22,
            20, "left", "#fff", FONT_CAMBRIAB, 1,
            0, 0,
            " ",
            true, true, false,
            false);

        //Min Bet Text
        var oMinBetTextPos = {
            // x: Math.round(CANVAS_WIDTH / 1.438),
            // y: Math.round(CANVAS_HEIGHT / 7.8)
            x: moneyBase.x + 420,
            y: moneyBase.y + 15
        };
        var oMinBetText = new CTLText(s_oStage,
            oMinBetTextPos.x, oMinBetTextPos.y, 150, 22,
            18, "left", "#fff", FONT_GEORGIA, 1,
            0, 0,
            languageService.getString("TEXT_MIN_BET") + " : ",
            true, true, false,
            false);

        var oMinBetAmountTextPos = {
            // x: Math.round(CANVAS_WIDTH / 1.438),
            // y: Math.round(CANVAS_HEIGHT / 6.4)
            x: moneyBase.x + 510,
            y: moneyBase.y + 15

        };
        var oMinBetAmountText = new CTLText(s_oStage,
            oMinBetAmountTextPos.x, oMinBetAmountTextPos.y, 150, 22,
            20, "left", "#fff", FONT_CAMBRIAB, 1,
            0, 0, languageService.serverCurrency("currencySymbol") + MIN_BET,
            true, true, false,
            false);

        //Max Bet text
        var oMaxBetTextPos = {
            // x: Math.round(CANVAS_WIDTH / 1.333),
            // y: Math.round(CANVAS_HEIGHT / 7.8)
            x: moneyBase.x + 420,
            y: moneyBase.y + 50
        };
        var oMaxBetText = new CTLText(s_oStage,
            oMaxBetTextPos.x, oMaxBetTextPos.y, 150, 22,
            18, "left", "#fff", FONT_GEORGIA, 1,
            0, 0,
            languageService.getString("TEXT_MAX_BET") + " : ",
            true, true, false,
            false);

        var oMaxBetAmountTextPos = {
            // x: Math.round(CANVAS_WIDTH / 1.333),
            // y: Math.round(CANVAS_HEIGHT / 6.4)
            x: moneyBase.x + 515,
            y: moneyBase.y + 50
        };
        var oMaxBetAmountText = new CTLText(s_oStage,
            oMaxBetAmountTextPos.x, oMaxBetAmountTextPos.y, 150, 22,
            20, "left", "#fff", FONT_CAMBRIAB, 1,
            0, 0, languageService.serverCurrency("currencySymbol") + MAX_BET,
            true, true, false,
            false);



        //Message text 
        // _oHelpText = new CTLText(s_oStage,
        //     692, 310, 170, 80,
        //     20, "center", "#00ffa9", FONT_GEORGIA, 1,
        //     0, 0,
        //     languageService.getString("TEXT_WAITING_BET"),
        //     true, true, true,
        //     false);

        var oHelpBg = createBitmap(s_oSpriteLibrary.getSprite('display_bg'));
        oHelpBg.x = Math.round(CANVAS_WIDTH / 1.45);
        oHelpBg.y = Math.round(CANVAS_HEIGHT / 3.5);
        s_oStage.addChild(oHelpBg);

        _oHelpText = new CTLText(s_oStage,
            oHelpBg.x + 45, oHelpBg.y + 35, 220, 80,
            24, "center", "#ffde00", FONT_GEORGIA, 1,
            0, 0,
            languageService.getString("TEXT_WAITING_BET"),
            true, true, true,
            false);


        _szLastMsgHelp = languageService.getString("TEXT_WAITING_BET");

        //Roll out button after place the bet
        // _pRollButPos = { x: Math.round(CANVAS_WIDTH / 1.4), y: Math.round(CANVAS_HEIGHT / 1.2) };
        // _oRollBut = new CTextButton(_pRollButPos.x, _pRollButPos.y, s_oSpriteLibrary.getSprite('but_roll'), languageService.getString("TEXT_ROLL"), FONT_GEORGIA, "#000", 20, "center", s_oStage);
        _pRollButPos = { x: Math.round(CANVAS_WIDTH / 1.28), y: Math.round(CANVAS_HEIGHT / 5) };
        _oRollBut = new CGfxButton(_pRollButPos.x, _pRollButPos.y, s_oSpriteLibrary.getSprite('but_roll'), s_oStage);
        _oRollBut.disable();
        _oRollBut.addEventListener(ON_MOUSE_UP, this._onRoll, this);

        //Clear all bet button
        // Math.round(CANVAS_WIDTH / 1.75);
        // Math.round(CANVAS_HEIGHT / 1.26)
        _oClearAllBet = new CGfxButton(Math.round(CANVAS_WIDTH / 1.75), Math.round(CANVAS_HEIGHT / 1.18), s_oSpriteLibrary.getSprite('but_clear_all'), s_oStage);
        _oClearAllBet.addEventListener(ON_MOUSE_UP, this._onClearAllBet, this);

        this._initFichesBut();

        _iIndexFicheSelected = 0;
        _aFiches[_iIndexFicheSelected].select();
        var oGraphics = new createjs.Graphics().beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oBlock = new createjs.Shape(oGraphics);
        _oBlock.on("click", function () { });
        _oBlock.visible = false;
        s_oStage.addChild(_oBlock);

        _oSettingsPanel = new CSettingsPanel(s_oStage);

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
        }
        _oButInfo.unload();
        _oButExit.unload();
        // _oButSettings.unload();
        _oRollBut.unload();
        _oClearAllBet.unload();
        s_oInterface = null;
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, _pStartPosAudio.y + iNewY);
        }
        _oRollBut.setPosition(_pRollButPos.x, _pRollButPos.y);
        _oButExit.setPosition(_pStartPosExit.x - iNewX, _pStartPosExit.y + iNewY);
        _oButInfo.setPosition(_pStartPosInfo.x + iNewX, _pStartPosInfo.y + iNewY);
        // _oButSettings.setPosition(_pStartPosSettings.x, _pStartPosSettings.y);
        _oSettingsPanel.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.setPositionOfObjects = function (_refObject, _posX, _posY) {
        _refObject.x = _posX;
        _refObject.y = _posY;
    };

    this.hideBlock = function () {
        _oBlock.visible = false;
    };

    this.showBlock = function () {
        _oBlock.visible = true;
    };

    this.enableBetFiches = function () {
        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i].enable();
        }
    };

    this.enableClearButton = function () {
        _oClearAllBet.enable();
    };

    this.disableBetFiches = function () {
        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i].disable();
        }
    };

    this.disableClearButton = function () {
        _oClearAllBet.disable();
    };

    this.deselectAllFiches = function () {
        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i].deselect();
        }
    };

    this.enableRoll = function (bEnable) {
        if (bEnable) {
            _oRollBut.enable();
        } else {
            _oRollBut.disable();
        }

    };

    this._initFichesBut = function () {

        var chipsBase = createBitmap(s_oSpriteLibrary.getSprite('chips_base'));
        chipsBase.x = Math.round(CANVAS_WIDTH / 7.3);
        chipsBase.y = Math.round(CANVAS_HEIGHT / 1.27);
        s_oStage.addChild(chipsBase);

        //SET FICHES BUTTON
        // var iCurX = 300;
        // var iCurY = 640;
        var iCurX = chipsBase.x + 91;
        var iCurY = chipsBase.y + 58;
        _aFiches = new Array();
        _selectedFichesNum = new Array();

        for (var i = 0; i < NUM_FICHES; i++) {
            //Bet coin/fiche 6 type
            var oSprite = s_oSpriteLibrary.getSprite('fiche_new_' + i);

            _aFiches[i] = new CFicheBut(iCurX, iCurY, oSprite);
            _aFiches[i].addEventListenerWithParams(ON_MOUSE_UP, this._onFicheSelected, this, [i]);

            iCurX += oSprite.width + 0;
        }
    };

    this.setMoney = function (iMoney) {
        _oMoneyAmountText.refreshText(languageService.serverCurrency("currencySymbol") + parseFloat(iMoney).toFixed(languageService.serverCurrency("currencyDecimils")));
    };

    this.refreshMoney = function (iStartMoney, iMoney) {
        _oRollingText = new CRollingTextController(_oMoneyAmountText.getText(), null, iStartMoney, parseFloat(iMoney), 4000, EASE_LINEAR, languageService.serverCurrency("currencySymbol"));
    };

    this.setCurBet = function (iCurBet) {
        _oBetAmountText.refreshText(languageService.serverCurrency("currencySymbol") + iCurBet.toFixed(languageService.serverCurrency("currencyDecimils")));
    };

    this.refreshMsgHelp = function (szText, bLastState) {
        _oHelpText.refreshText(szText);
        if (bLastState) {
            _szLastMsgHelp = szText;
        }
    };

    this.clearMsgHelp = function () {
        _oHelpText.refreshText(_szLastMsgHelp);
    };

    this._onBetRelease = function (oParams) {
        var aBets = oParams.numbers;

        if (aBets !== null) {
            s_oGame._onShowBetOnTable({ button: oParams.name }, false);
        }
    };

    this._onFicheSelected = function (aParams) {
        playSound("fiche_collect", 1, false);

        this.deselectAllFiches();
        var iFicheIndex = aParams[0];
        for (var i = 0; i < NUM_FICHES; i++) {
            if (i === iFicheIndex) {
                _iIndexFicheSelected = i;
            }
        }
    };

    this._onRoll = function () {
        this.disableBetFiches();
        this.enableRoll(false);
        s_oGame.onRoll();
    };

    this._onClearAllBet = function () {
        s_oGame.onClearAllBets();
    };

    this._onExit = function () {
        s_oGame.onExit(false);
    };

    this._onSettingButtonPressed = function () {
        _oSettingsPanel.show();
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this.getCurFicheSelected = function () {
        return _iIndexFicheSelected;
    };

    this.isBlockVisible = function () {
        return _oBlock.visible;
    };

    this._onCredits = function () {
        new CCreditsPanel();
    };

    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;;