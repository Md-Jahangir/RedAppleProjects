function CInterface() {
    var _iIndexFicheSelected;
    var _aFiches;
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosHistory;
    var _pStartPosFullscreen;

    var _oButExit;
    var _oAudioToggle;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oTimeTextBack;
    var _oTimeText;
    var _oMoneyAmountText;
    var _oBetAmountText;
    var _oMaxAmountText;
    var _oMsgTitle;
    var _oDisplayBg;
    var _oSpinBut;
    var _oClearLastBet;
    var _oClearAllBet;
    var _oBetFinalsBet;
    var _oBetNeighbors;
    var _oRebetBut;
    var _oRollingText;
    var _oHistoryPanel;
    var _oBlock;

    var _oButSettings;
    var _pStartPosSettings;
    var _oButBack;
    var _pStartPosBack;
    var _oSettingsPanel;
    var _oBetVoisins;
    var _oBetTier;
    var _oBetOrphelins;

    this._init = function() {

        //Back Button
        var oSprite = s_oSpriteLibrary.getSprite('but_back');
        _pStartPosBack = { x: /*Math.round(CANVAS_WIDTH / 9)*/ 213, y: /*(Math.round(CANVAS_HEIGHT / 15))*/ 135 };
        _oButBack = new CGfxButton(_pStartPosBack.x, _pStartPosBack.y, oSprite, s_oStage);
        _oButBack.addEventListener(ON_MOUSE_UP, this._onBackPressed, this);

        //Settings Button
        var oSprite = s_oSpriteLibrary.getSprite('but_settings');
        _pStartPosSettings = { x: /*Math.round(CANVAS_WIDTH - 213)*/ 1707, y: /*(Math.round(CANVAS_HEIGHT / 15))*/ 135 };
        _oButSettings = new CGfxButton(_pStartPosSettings.x, _pStartPosSettings.y, oSprite, s_oStage);
        _oButSettings.addEventListener(ON_MOUSE_UP, this._onSettingsPressed, this);

        var oMoneyText = new createjs.Text(TEXT_MONEY, "20px " + FONT_REGULAR, "#fff");
        oMoneyText.textAlign = "left";
        oMoneyText.x = 470;
        oMoneyText.y = 105;
        s_oStage.addChild(oMoneyText);

        _oMoneyAmountText = new createjs.Text("", "33px " + FONT_REGULAR, "#fff");
        _oMoneyAmountText.textAlign = "left";
        _oMoneyAmountText.x = 470;
        _oMoneyAmountText.y = 135;
        s_oStage.addChild(_oMoneyAmountText);

        var oCurBetText = new createjs.Text(TEXT_CUR_BET, "20px " + FONT_REGULAR, "#fff");
        oCurBetText.textAlign = "left";
        oCurBetText.x = 700;
        oCurBetText.y = 105;
        s_oStage.addChild(oCurBetText);

        _oBetAmountText = new createjs.Text("", "33px " + FONT_REGULAR, "#fff");
        _oBetAmountText.textAlign = "left";
        _oBetAmountText.x = 700;
        _oBetAmountText.y = 135;
        s_oStage.addChild(_oBetAmountText);

        //MINIMUM BET
        var oMinBetText = new createjs.Text(TEXT_MIN_BET, "20px " + FONT_REGULAR, "#fff");
        oMinBetText.textAlign = "left";
        oMinBetText.x = 850;
        oMinBetText.y = 105;
        s_oStage.addChild(oMinBetText);

        var oMinAmountText = new createjs.Text(TEXT_CURRENCY + MIN_BET, "33px " + FONT_REGULAR, "#fff");
        oMinAmountText.textAlign = "left";
        oMinAmountText.x = 850;
        oMinAmountText.y = 135;
        s_oStage.addChild(oMinAmountText);

        //MAXIMUM BET
        var oMaxBetText = new createjs.Text(TEXT_MAX_BET, "20px " + FONT_REGULAR, "#fff");
        oMaxBetText.textAlign = "left";
        oMaxBetText.x = 970;
        oMaxBetText.y = 105;
        s_oStage.addChild(oMaxBetText);

        _oMaxAmountText = new createjs.Text(TEXT_CURRENCY + MAX_BET, "33px " + FONT_REGULAR, "#fff");
        _oMaxAmountText.textAlign = "left";
        _oMaxAmountText.x = 970;
        _oMaxAmountText.y = 135;
        s_oStage.addChild(_oMaxAmountText);

        var oLogo = createBitmap(s_oSpriteLibrary.getSprite('roulette_game_logo_menu'));
        oLogo.x = 305;
        oLogo.y = 640;
        oLogo.scaleX = 0.35;
        oLogo.scaleY = 0.35;
        s_oStage.addChild(oLogo);

        _oSpinBut = new CTextButton(1600, 960, s_oSpriteLibrary.getSprite('but_play_bg'), "  " + TEXT_SPIN, FONT_REGULAR, "#001755", 28, s_oStage);
        _oSpinBut.setVisible(false);
        _oSpinBut.addEventListener(ON_MOUSE_UP, this._onSpin, this);

        _oBetVoisins = new CTextButton(875, 910, s_oSpriteLibrary.getSprite('but_voisins_bg'), TEXT_VOISINS, FONT_REGULAR, "#fff", 20);
        _oBetVoisins.addEventListener(ON_MOUSE_UP, this._onBetVoisinsPressed, this);

        _oBetTier = new CTextButton(1030, 910, s_oSpriteLibrary.getSprite('but_tier_bg'), TEXT_TIER, FONT_REGULAR, "#fff", 20);
        _oBetTier.addEventListener(ON_MOUSE_UP, this._onBetTierPressed, this);

        _oBetOrphelins = new CTextButton(1165, 910, s_oSpriteLibrary.getSprite('but_orphenlins_bg'), TEXT_ORPHELINS, FONT_REGULAR, "#fff", 20);
        _oBetOrphelins.addEventListener(ON_MOUSE_UP, this._onBetOrphelinsPressed, this);

        _oBetNeighbors = new CTextButton(895, 960, s_oSpriteLibrary.getSprite('but_neighbor_bg'), TEXT_NEIGHBORS, FONT_REGULAR, "#fff", 20);
        _oBetNeighbors.addEventListener(ON_MOUSE_UP, this._onNeighborsPanel, this);

        _oBetFinalsBet = new CTextButton(1100, 960, s_oSpriteLibrary.getSprite('but_final_bg'), TEXT_FINALSBET, FONT_REGULAR, "#fff", 20);
        _oBetFinalsBet.addEventListener(ON_MOUSE_UP, this._onFinalBetShow, this);

        _oClearLastBet = new CGfxButton(300, 960, s_oSpriteLibrary.getSprite('but_clear_last'), s_oStage);
        _oClearLastBet.addEventListener(ON_MOUSE_UP, this._onClearLastBet, this);

        _oClearAllBet = new CGfxButton(435, 960, s_oSpriteLibrary.getSprite('but_clear_all'), s_oStage);
        _oClearAllBet.addEventListener(ON_MOUSE_UP, this._onClearAllBet, this);

        _oRebetBut = new CGfxButton(570, 960, s_oSpriteLibrary.getSprite('but_rebet'), s_oStage);
        _oRebetBut.disable();
        _oRebetBut.addEventListener(ON_MOUSE_UP, this._onRebet, this);

        this._initFichesBut();
        this.disableBetFiches();

        _pStartPosHistory = { x: 1620, y: 260 };
        _oHistoryPanel = new CHistory(_pStartPosHistory.x, _pStartPosHistory.y, s_oStage);


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
        _oButSettings.unload();
        _oButBack.unload();
        _oSpinBut.unload();
        _oClearLastBet.unload();
        _oClearAllBet.unload();
        _oBetFinalsBet.unload();
        _oBetNeighbors.unload();
        _oBetVoisins.unload();
        _oBetTier.unload();
        _oBetOrphelins.unload();

        _oRebetBut.unload();
        s_oInterface = null;
    };

    this.refreshButtonPos = function(iNewX, iNewY) {
        _oButBack.setPosition(_pStartPosBack.x, _pStartPosBack.y);
        _oButSettings.setPosition(_pStartPosSettings.x, _pStartPosSettings.y);
    };

    this.hideBlock = function() {
        _oBlock.visible = false;
    };

    this.showBlock = function() {
        _oBlock.visible = true;
    };

    this.enableBetFiches = function() {
        for (var i = 0; i < NUM_FICHE_VALUES; i++) {
            _aFiches[i].enable();
        }
        _oClearLastBet.enable();
        _oClearAllBet.enable();

        _oBetFinalsBet.enable();
        _oBetNeighbors.enable();
        _oBetVoisins.enable();
        _oBetTier.enable();
        _oBetOrphelins.enable();

    };

    this.disableBetFiches = function() {
        for (var i = 0; i < NUM_FICHE_VALUES; i++) {
            _aFiches[i].disable();
        }
        _oClearLastBet.disable();
        _oClearAllBet.disable();

        _oBetFinalsBet.disable();
        _oBetNeighbors.disable();
        _oBetVoisins.disable();
        _oBetTier.disable();
        _oBetOrphelins.disable();

        _oRebetBut.disable();
    };

    this.enableRebet = function() {
        _oRebetBut.enable();
    };

    this.disableRebet = function() {
        _oRebetBut.disable();
    };

    this.deselectAllFiches = function() {
        for (var i = 0; i < NUM_FICHES; i++) {
            _aFiches[i].deselect();
        }
    };

    this.enableSpin = function(bEnable) {
        _oSpinBut.setVisible(bEnable);
    };

    this._initFichesBut = function() {
        var iCurX = 120;
        var iCurY = 220;
        _aFiches = new Array();
        for (var i = 0; i < NUM_FICHES; i++) {
            var oSprite = s_oSpriteLibrary.getSprite('fiche_' + i);
            _aFiches[i] = new CFicheBut(iCurX, iCurY, oSprite);
            _aFiches[i].addEventListenerWithParams(ON_MOUSE_UP, this._onFicheSelected, this, [i]);

            iCurY += oSprite.height + 20;
        }
    };

    this.refreshTime = function(iTime) {
        var szTime = formatTime(iTime);
        _oTimeText.text = szTime;
        _oTimeTextBack.text = szTime;
    };

    this.setMoney = function(iMoney) {
        _oMoneyAmountText.text = TEXT_CURRENCY + iMoney.toFixed(2);
    };

    this.setCurBet = function(iCurBet) {
        _oBetAmountText.text = TEXT_CURRENCY + iCurBet.toFixed(2);
    };

    this.setCurMaxBet = function(iCurMaxBet) {
        _oMaxAmountText.text = TEXT_CURRENCY + iCurMaxBet.toFixed(2);
    };

    this.refreshMoney = function(iStartMoney, iMoney) {
        _oRollingText = new CRollingTextController(_oMoneyAmountText, null, iStartMoney, parseFloat(iMoney), 1000, EASE_LINEAR, TEXT_CURRENCY);
    };

    this.refreshNumExtracted = function(aNumExtracted) {
        var iLen = aNumExtracted.length - 1;
        //TAKE ONLY THE FIRST 20 NUMBERS EXTRACTED
        var iLastNum = -1;

        if (aNumExtracted.length > ROW_HISTORY - 1) {
            iLastNum = iLen - ROW_HISTORY;
        }

        var iCurIndex = 0;
        for (var i = iLen; i > iLastNum; i--) {
            switch (s_oGameSettings.getColorNumber(aNumExtracted[i])) {
                case COLOR_BLACK:
                    {
                        _oHistoryPanel.showBlack(iCurIndex, aNumExtracted[i]);
                        break;
                    }
                case COLOR_RED:
                    {
                        _oHistoryPanel.showRed(iCurIndex, aNumExtracted[i]);
                        break;
                    }
                case COLOR_ZERO:
                    {
                        _oHistoryPanel.showGreen(iCurIndex, aNumExtracted[i]);
                        break;
                    }
            }

            iCurIndex++;
        }


    };

    this.gameOver = function() {

    };

    this._onBetRelease = function(oParams) {
        var aBets = oParams.numbers;
        var iBetMult = oParams.bet_mult;
        var iBetWin = oParams.bet_win;
        if (aBets !== null) {
            s_oGame._onShowBetOnTable({ button: oParams.name, numbers: aBets, bet_mult: iBetMult, bet_win: iBetWin, num_fiches: oParams.num_fiches }, false);
        }
    };

    this._onFicheSelected = function(aParams) {
        playSound("fiche_collect", 1, false);

        this.deselectAllFiches();

        var iFicheIndex = aParams[0];

        for (var i = 0; i < NUM_FICHE_VALUES; i++) {
            if (i === iFicheIndex) {
                _iIndexFicheSelected = i;
            }
        }
    };

    this._onSpin = function() {
        this.disableBetFiches();
        this.enableSpin(false);
        s_oGame.onSpin();
    };

    this._onClearLastBet = function() {
        s_oGame.onClearLastBet();
    };

    this._onClearAllBet = function() {
        s_oGame.onClearAllBets();
    };

    this._onBetVoisinsPressed = function() {
        // console.log("_onBetVoisinsPressed");
    };
    this._onBetTierPressed = function() {
        // console.log("_onBetTierPressed");
    };
    this._onBetOrphelinsPressed = function() {
        // console.log("_onBetOrphelinsPressed");
    };

    this._onFinalBetShow = function() {
        s_oGame.onFinalBetShown();
    };

    this._onNeighborsPanel = function() {
        s_oGame.onOpenNeighbors();
    };

    this._onRebet = function() {
        _oRebetBut.disable();
        s_oGame.onRebet();
    };

    this._onSettingsPressed = function() {
        _oSettingsPanel.show();
    };
    this._onBackPressed = function() {
        s_oGame.onExit();
    };

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