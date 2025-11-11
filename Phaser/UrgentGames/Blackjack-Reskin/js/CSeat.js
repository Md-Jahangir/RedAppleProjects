function CSeat() {
    var _bDoubleActive;
    var _bInsuranceActive;
    var _iCurHand;
    var _iCardDealedToPlayer;
    var _iCredit;
    var _aHands;
    var _aPlayerCards;
    var _aFichesOnTable;
    var _vAttachPos;
    var isSplitActive;
    var _oGroup;
    var _oCurCardValueText;
    var _oCurCardSplitValueText;
    var _oCurBetText;
    var _oCurSplitBetText;
    var _oInsuranceFiches;
    var _oCardOffset;
    var _oSplitOffset;
    var _oResultText_0;
    var _oResultText_1;
    var _oArrowCurPlayer;
    var _oMainFichesController;
    var _oSplitFichesController;
    var _aCbCompleted;
    var _aCbOwner;
    let currentHandValue = 0;
    var _oResultGreenDot;
    var _oCurInsuaranceText;
    var _oCurInsuaranceSplitText;
    var splitArrVal = [];

    this._init = function () {

        let config = orientation_mode[getOrientation()].CSeat;

        splitArrVal = [9, 22, 35, 48, 10, 23, 36, 49, 11, 24, 37, 50, 12, 25, 38, 51];
        isSplitActive = false;

        // _oGroup
        _oGroup = new createjs.Container();

        //_oCurBetText
        _oCurBetText = new createjs.Text("", "26px " + FONT_RED_HAT_DISPLAY_REGULAR, "#fff");
        _oCurBetText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oGroup.addChild(_oCurBetText);

        // _oCurCardValueText
        _oCurCardValueText = new createjs.Text("", "28px " + FONT_RED_HAT_DISPLAY_REGULAR, "#ffffff");
        _oCurCardValueText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oCurCardValueText.textAlign = "center";
        _oGroup.addChild(_oCurCardValueText);

        // _oCurSplitBetText
        _oCurSplitBetText = new createjs.Text("", "26px " + FONT_RED_HAT_DISPLAY_REGULAR, "#fff");
        _oCurSplitBetText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oCurSplitBetText.textAlign = "left";
        _oGroup.addChild(_oCurSplitBetText);

        // _oCurCardSplitValueText
        _oCurCardSplitValueText = new createjs.Text("", "28px " + FONT_RED_HAT_DISPLAY_REGULAR, "#ffffff");
        _oCurCardSplitValueText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oCurCardSplitValueText.textAlign = "left";
        _oGroup.addChild(_oCurCardSplitValueText);

        //_oResultGreenDot
        _oResultGreenDot = createBitmap(s_oSpriteLibrary.getSprite('result_green_dot'));
        _oResultGreenDot.visible = false;
        _oGroup.addChild(_oResultGreenDot);

        //_oResultGreenDot2
        _oResultGreenDot2 = createBitmap(s_oSpriteLibrary.getSprite('result_green_dot'));
        _oResultGreenDot2.visible = false;
        _oGroup.addChild(_oResultGreenDot2);

        // _oResultText_0
        _oResultText_0 = new createjs.Text("", "25px " + FONT_RED_HAT_DISPLAY_REGULAR, "#ffffff");
        _oResultText_0.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oResultText_0.textAlign = "left";
        _oGroup.addChild(_oResultText_0);

        // _oResultText_1
        _oResultText_1 = new createjs.Text("", "25px " + FONT_RED_HAT_DISPLAY_REGULAR, "#ffffff");
        _oResultText_1.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oResultText_1.textAlign = "left";
        _oGroup.addChild(_oResultText_1);

        // _oArrowCurPlayer
        _oArrowCurPlayer = createBitmap(s_oSpriteLibrary.getSprite('arrow_hand'));
        _oArrowCurPlayer.visible = false;
        _oGroup.addChild(_oArrowCurPlayer);
        s_oGameCon.addChild(_oGroup);

        // _oInsuranceFiches
        _oInsuranceFiches = new CVector2();
        _oInsuranceFiches.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

        // _oCurInsuaranceText
        _oCurInsuaranceText = new createjs.Text("", "26px " + FONT_RED_HAT_DISPLAY_REGULAR, "#fff");
        _oCurInsuaranceText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oCurInsuaranceText.textAlign = "center";
        _oGroup.addChild(_oCurInsuaranceText);

        // _oCurInsuaranceSplitText 
        _oCurInsuaranceSplitText = new createjs.Text("", "26px " + FONT_RED_HAT_DISPLAY_REGULAR, "#fff");
        _oCurInsuaranceSplitText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oCurInsuaranceSplitText.textAlign = "center";
        _oGroup.addChild(_oCurInsuaranceSplitText);

        // _oMainFichesController
        let cfg = orientation_mode[getOrientation()].CSeat._oMainFichesController;
        _oMainFichesController = new CFichesController({ x: cfg.initX, y: cfg.initY }, _oInsuranceFiches);

        // _oCardOffset
        _oCardOffset = new CVector2();
        _oCardOffset.set(NEW_WIDTH / 2 + config._oCardOffset.x * GAME_SCALE, NEW_HEIGHT / 2 + config._oCardOffset.y * GAME_SCALE);

        // _vAttachPos
        _vAttachPos = new CVector2(_oCardOffset.getX(), _oCardOffset.getY());

        // _oSplitOffset
        _oSplitOffset = new CVector2();

        // _aCbCompleted
        _aCbCompleted = new Array();

        // _aCbOwner
        _aCbOwner = new Array();

        //Enable the bet fiches somtime later after coming to the gamplay
        setTimeout(() => {
            this._onSitDown();
        }, 600);

        // _iCredit
        _iCredit = 0;

        // _aHands
        _aHands = new Array();

        // _aPlayerCards
        _aPlayerCards = new Array();

        this.reset();

        // RESIZE
        window.addEventListener('resize', this.resize, false);
        this.resize();

    };//##############################################################################################
    this.resize = function () {
        let config = orientation_mode[getOrientation()].CSeat;
        let cfg;

        //_oCurBetText
        cfg = config.currentBetText;

        _oCurBetText.scaleX = cfg.scale * GAME_SCALE;
        _oCurBetText.scaleY = cfg.scale * GAME_SCALE;
        if (getOrientation() == 'orientation_portrait') {
            _oCurBetText.x = NEW_WIDTH * cfg.stepX;
            adjustCurBetText = orientation_mode[getOrientation()][`${window.innerWidth}*${window.innerHeight}`]?._oCurBetText;
            _oCurBetText.y = NEW_HEIGHT * cfg.stepY - (adjustCurBetText ? adjustCurBetText.y : 0);
        } else {
            _oCurBetText.x = NEW_WIDTH * cfg.stepX;
            _oCurBetText.y = NEW_HEIGHT * cfg.stepY;
        }
        

        // _oCurCardValueText
        cfg = config._oCurCardValueText
        _oCurCardValueText.scaleX = cfg.scale * GAME_SCALE;
        _oCurCardValueText.scaleY = cfg.scale * GAME_SCALE;
        _oCurCardValueText.x = NEW_WIDTH / 2 - cfg.x * GAME_SCALE
        
        if (getOrientation() == 'orientation_portrait') {
            adjustCurCardValueText = orientation_mode[getOrientation()][`${window.innerWidth}*${window.innerHeight}`]?._oCurCardValueText;
            _oCurCardValueText.y = NEW_HEIGHT / 2 + (adjustCurCardValueText ? adjustCurCardValueText.y : 0)
          } else {
            _oCurCardValueText.y = NEW_HEIGHT / 2;
          }
        
        // _oCurSplitBetText
        cfg = config._oCurSplitBetText
        _oCurSplitBetText.scaleX = cfg.scale * GAME_SCALE;
        _oCurSplitBetText.scaleY = cfg.scale * GAME_SCALE;
        _oCurSplitBetText.x = _oCurBetText.x + cfg.stepX * GAME_SCALE
        _oCurSplitBetText.y = _oCurBetText.y + cfg.stepY * GAME_SCALE;

        // _oCurCardSplitValueText
        cfg = config._oCurCardSplitValueText
        _oCurCardSplitValueText.scaleX = cfg.scale * GAME_SCALE;
        _oCurCardSplitValueText.scaleY = cfg.scale * GAME_SCALE;
        _oCurCardSplitValueText.x = NEW_WIDTH / 2 + cfg.x * GAME_SCALE
        
        if (getOrientation() == 'orientation_portrait') {
            adjustSplitCurCardValueText = orientation_mode[getOrientation()][`${window.innerWidth}*${window.innerHeight}`]?._oSplitCurCardValueText;
            _oCurCardSplitValueText.y = NEW_HEIGHT / 2 + (adjustSplitCurCardValueText ? adjustSplitCurCardValueText.y : 0)
          } else {
            _oCurCardSplitValueText.y = NEW_HEIGHT / 2;
          }

        // _oCurInsuaranceText
        cfg = config._oCurInsuaranceText
        _oCurInsuaranceText.scaleX = cfg.scale * GAME_SCALE;
        _oCurInsuaranceText.scaleY = cfg.scale * GAME_SCALE;
        _oCurInsuaranceText.x = _oCurBetText.x + cfg.stepX;
        _oCurInsuaranceText.y = _oCurBetText.y + cfg.stepY

        // _oCurInsuaranceSplitText 
        cfg = config._oCurInsuaranceSplitText
        _oCurInsuaranceSplitText.scaleX = cfg.scale * GAME_SCALE;
        _oCurInsuaranceSplitText.scaleY = cfg.scale * GAME_SCALE;
        _oCurInsuaranceSplitText.x = _oCurSplitBetText.x + cfg.stepX;
        _oCurInsuaranceSplitText.y = _oCurSplitBetText.y + cfg.stepY

        // _oResultText_0
        cfg = config._oResultText_0;
        _oResultText_0.scaleX = cfg.scale * GAME_SCALE;
        _oResultText_0.scaleY = cfg.scale * GAME_SCALE;
        _oResultText_0.x = _oCurBetText.x + cfg.stepX * GAME_SCALE;
        _oResultText_0.y = _oCurBetText.y;

        // _oResultText_1
        cfg = config._oResultText_1;
        _oResultText_1.scaleX = cfg.scale * GAME_SCALE;
        _oResultText_1.scaleY = cfg.scale * GAME_SCALE;
        _oResultText_1.x = _oCurSplitBetText.x + cfg.stepX * GAME_SCALE;
        _oResultText_1.y = _oCurSplitBetText.y;

        //_oResultGreenDot
        cfg = config._oResultGreenDot;
        _oResultGreenDot.x = _oResultText_0.x + cfg.stepX * GAME_SCALE;
        _oResultGreenDot.y = _oResultText_0.y;
        _oResultGreenDot.scaleX = GAME_SCALE * cfg.scale;
        _oResultGreenDot.scaleY = GAME_SCALE * cfg.scale;


        //_oResultGreenDot2
        cfg = config._oResultGreenDot2;
        _oResultGreenDot2.x = _oResultText_1.x + cfg.stepX * GAME_SCALE;
        _oResultGreenDot2.y = _oResultText_1.y;
        _oResultGreenDot2.scaleX = GAME_SCALE * cfg.scale;
        _oResultGreenDot2.scaleY = GAME_SCALE * cfg.scale;

        // _oCardOffset
        _oCardOffset.set(NEW_WIDTH / 2 + config._oCardOffset.x * GAME_SCALE, NEW_HEIGHT / 2 + config._oCardOffset.y * GAME_SCALE);

        // _oSplitOffset
        cfg = config._oSplitOffset
        _oSplitOffset.set(_oCurCardSplitValueText.x + 25, _oCurCardSplitValueText.y + cfg.stepY * GAME_SCALE)

        // _oArrowCurPlayer
        cfg = config._oArrowCurPlayer
        _oArrowCurPlayer.scaleX = cfg.scale * GAME_SCALE;
        _oArrowCurPlayer.scaleY = cfg.scale * GAME_SCALE;
        if (_iCurHand == 0) {
            _oArrowCurPlayer.x = _oCurCardValueText.x
            _oArrowCurPlayer.y = _oCurBetText.y + cfg.stepY * GAME_SCALE
        } else if (_iCurHand == 1) {
            _oArrowCurPlayer.x = _oCurCardSplitValueText.x
            _oArrowCurPlayer.y = _oCurBetText.y + cfg.stepY * GAME_SCALE
        }
    }
    this.unload = function () {
        s_oGameCon.removeChild(_oGroup);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.reset = function (isWinHold) {
        // remove all card objects from container
        if (!isWinHold) {
            let cardContainer = s_oGame.getCardContainer()
            if (cardContainer) {
                cardContainer.children = [];
            }

            for (var k = 0; k < _aPlayerCards.length; k++) {
                _aPlayerCards[k].unload();
            }
            _aPlayerCards = new Array();

            this.clearText()
        }

        _iCurHand = 0;
        _iCardDealedToPlayer = 0;
        _bDoubleActive = false;
        _bInsuranceActive = false;
        currentHandValue = 0;
        isSplitActive = false;
        for (var i = 0; i < _aHands.length; i++) {
            _aHands[i].getFichesController().reset();
        }

        _aHands = new Array();
        var oHand = new CHandController(_oCardOffset, _oMainFichesController);
        _aHands.push(oHand);

        _aFichesOnTable = new Array();

        _oMainFichesController.addEventListener(FICHES_END_MOV, this._onFichesEndMove);
        _oSplitFichesController = null;

        _oCurBetText.text = "";
        _oCurSplitBetText.text = "";
    };

    this.resetTextAndBets = function () {
        let cardContainer = s_oGame.getCardContainer()
        if (cardContainer) {
            cardContainer.children = [];
        }

        for (var k = 0; k < _aPlayerCards.length; k++) {
            _aPlayerCards[k].unload();
        }
        _aPlayerCards = new Array();

        this.clearText()

        _iCurHand = 0;
        _iCardDealedToPlayer = 0;
        _bDoubleActive = false;
        _bInsuranceActive = false;
        currentHandValue = 0;
        isSplitActive = false;
        for (var i = 0; i < _aHands.length; i++) {
            _aHands[i].getFichesController().reset();
        }

        _aHands = new Array();
        var oHand = new CHandController(_oCardOffset, _oMainFichesController);
        _aHands.push(oHand);

        _aFichesOnTable = new Array();

        _oMainFichesController.addEventListener(FICHES_END_MOV, this._onFichesEndMove);
        _oSplitFichesController = null;

        _oResultText_0.text = "";
        _oResultText_1.text = "";
        _oResultGreenDot.visible = false;
        _oResultGreenDot2.visible = false;
    }

    this.clearText = function () {
        _oCurBetText.text = "";
        _oCurSplitBetText.text = "";
        _oCurCardValueText.text = "";
        _oCurCardSplitValueText.text = "";
        _oCurInsuaranceText.text = "";
        _oCurInsuaranceSplitText.text = "";
    };

    this.clearBet = function () {
        _iCurHand = 0;
        _oMainFichesController.reset();
        _aFichesOnTable = new Array();
        _oCurBetText.text = "";
        _aHands[_iCurHand].changeBet(0);
    };

    this.addCardToHand = function (oCard, isForceHand = false, forceHandIndex) {
        _aHands[isForceHand ? forceHandIndex : _iCurHand].addCard(oCard);
        _aPlayerCards.push(oCard);
        oCard.addEventListener(ON_CARD_TO_REMOVE, this._onRemoveCard);
    };

    this.increaseHandValue = function (iValue, isForceHand = false, forceHandIndex) {
        currentHandValue += iValue;
        _aHands[isForceHand ? forceHandIndex : _iCurHand].increaseHandValue(iValue);
    };

    this.setPlayerHandValue = function (value, isForceHand = false, forceHandIndex) {
        currentHandValue = value;
        //if (_iCurHand != -1) {
        _aHands[isForceHand ? forceHandIndex : _iCurHand].setHandValue(value);
        //}
    };

    this.getPlayerHandValue = function () {
        return currentHandValue;
    };

    this.refreshCardValue = function () {
        _oCurCardValueText.text = this.getHandValue(0);
        if (this.getHandValue(1) > 0) {
            _oCurCardSplitValueText.text = "" + this.getHandValue(1);
        }
    };

    this.setCredit = function (iNewCredit) {
        _iCredit = iNewCredit;
    };

    this.increaseCredit = function (iCreditToAdd) {

        _iCredit += iCreditToAdd;
    };

    this.changeBet = function (iBet) {

        _aHands[_iCurHand].changeBet(iBet);
    };

    this.checkHand = function (lastActions) {
        // check for "restore" or "pass turn".
        if (lastActions.needPassTurn) {
            this.checkPlayerLastHand(PASS_TURN);
        } else if (lastActions.needRestore) {
            if (_aCbCompleted[RESTORE_ACTION]) {
                _aCbCompleted[RESTORE_ACTION].call(_aCbOwner[RESTORE_ACTION], false, true, true, lastActions.needDouble, lastActions.needSplit);
            }
        } else if (lastActions.isLose) {
            this.checkPlayerLastHand(PLAYER_LOSE);
        }
    };

    this.playerWin = function () {
        for (i = 0; i < this.getNumHands(); i++) {
            s_oGame._playerWin(i, true, false);
        }
        this.removeArrow();
    };

    this.checkPlayerLastHand = function (szAction, restoreActions = null) {
        _iCurHand--;
        if (_iCurHand > -1) {
            if (_aCbCompleted[RESTORE_ACTION]) {
                let needRestore = restoreActions ? restoreActions.needRestore : true;
                let needDouble = restoreActions ? restoreActions.needDouble : false;
                _aCbCompleted[RESTORE_ACTION].call(_aCbOwner[RESTORE_ACTION], false, needRestore, needRestore, needDouble, false);
            }
            _oArrowCurPlayer.x = _oCardOffset.getX();
            // check new hand in case of 21 natural
            s_oGame.lastActions = s_oGame.lastActionsUsual;
            this.checkHand(s_oGame.lastActions);
        } else {
            if (_aCbCompleted[szAction]) {
                _aCbCompleted[szAction].call(_aCbOwner[szAction], 0);
            }
            this.removeArrow();
        }
    };

    this.bet = function (iBet, bSplit) {

        iBet = Number(iBet).toFixed(CURRENCY_DECIMAL)

        if (bSplit) {
            _oCurBetText.text = languageService.getString("textHandBet") + " " + languageService.serverCurrency("currencySymbol") + (Number(iBet / 2).toFixed(CURRENCY_DECIMAL));
            _oCurSplitBetText.text = languageService.getString("textHandBet") + " " + languageService.serverCurrency("currencySymbol") + (Number(iBet / 2).toFixed(CURRENCY_DECIMAL));
        } else {
            _oCurBetText.text = languageService.getString("textHandBet") + " " + languageService.serverCurrency("currencySymbol") + iBet;
        }
    };

    this.setSplitHand = function () {
        var aSplitBet = new Array();
        for (var i = 0; i < _aFichesOnTable.length; i++) {
            aSplitBet.push(_aFichesOnTable[i]);
        }
        isSplitActive = true;
        _oSplitFichesController = new CFichesController({ x: 950, y: 566 }, _oInsuranceFiches);
        _oSplitFichesController.refreshFiches(aSplitBet, 0, 0, false);
        _oSplitFichesController.addEventListener(_oSplitFichesController.FICHES_END_MOV, this._onFichesEndMove);
        var oHand = new CHandController(_oSplitOffset, _oSplitFichesController);
        _aHands.push(oHand);

        _aHands[1].addCard(_aHands[0].getCard(1));
        _aHands[0].removeCard(1);
        _aHands[1].setHandValue(_aHands[0].getValue());

        _iCurHand = _aHands.length - 1;
    };

    this.decreaseCredit = function (iCreditToSubtract) {
        _iCredit -= iCreditToSubtract;
    };

    this.stand = function (actions) {

        this.checkPlayerLastHand(PASS_TURN, actions);
    };

    this.refreshFiches = function (iFicheValue, iFicheIndex, iXPos, iYPos) {
        _aFichesOnTable.push({ value: iFicheValue, index: iFicheIndex });
        _oMainFichesController.refreshFiches(_aFichesOnTable, iXPos, iYPos);
    };

    this.initMovement = function (iHand, iEndX, iEndY) {
        var oCurFichesController = this.getFichesController(iHand);
        oCurFichesController.initMovement(iEndX, iEndY, false);
    };

    this.initInsuranceMov = function (iXPos, iYPos) {
        _oMainFichesController.initInsuranceMov(iXPos, iYPos);
    };

    this.showWinner = function (iHand, szWinner, iTotalWin) {
        if (iTotalWin > 0) {
            if (iHand === 0) {
                _oResultText_0.text = szWinner + " $" + iTotalWin;
            } else {
                _oResultText_1.text = szWinner + " $" + iTotalWin;
            }

            playSound("win", 1, false);

        } else {
            if (iHand === 0) {
                _oResultText_0.text = szWinner;
            } else {
                _oResultText_1.text = szWinner;
            }

            playSound("lose", 1, false);
        }

        var oParent = this;

        if (iHand === 0) {
            createjs.Tween.get(_oResultText_0).to({ alpha: 1 }, TIME_SHOW_FINAL_CARDS).call(function () { oParent.endWinAnim(); });
            _oResultGreenDot.visible = true;
        } else {
            createjs.Tween.get(_oResultText_1).to({ alpha: 1 }, TIME_SHOW_FINAL_CARDS).call(function () { oParent.endWinAnim(); });
            _oResultGreenDot2.visible = true;
        }

        $(s_oMain).trigger("save_score", [_iCredit]);
    };

    this.endWinAnim = function () {
        if (_oResultText_0 && _oResultText_1 && _oResultGreenDot) {
            if (_aCbCompleted[END_HAND]) {
                _aCbCompleted[END_HAND].call(_aCbOwner[END_HAND]);
            }
        }
    };

    this.isWINLoseExist = function () {
        if (_oResultGreenDot.visible || _oResultText_1.text) {
            return true
        } else {
            return false;
        }
    }

    this.newCardDealed = function () {
        _iCardDealedToPlayer++;
        return _iCardDealedToPlayer;
    };

    this.removeAce = function () {
        _aHands[_iCurHand].removeAce();
    };

    this.removeArrow = function () {
        _oArrowCurPlayer.visible = false;
    };

    this.doubleAction = function (iCurBet) {
        _aHands[_iCurHand].changeBet(iCurBet);

        var aDoubleBet = new Array();
        for (var i = 0; i < _aFichesOnTable.length; i++) {
            aDoubleBet.push(_aFichesOnTable[i]);
        }

        if (_aHands.length > 1) {
            if (_iCurHand === 1) {
                _oSplitFichesController.refreshFiches(aDoubleBet, 0, 40);
            } else {
                _oMainFichesController.refreshFiches(aDoubleBet, 0, 40);
            }
        } else {
            _oMainFichesController.refreshFiches(aDoubleBet, 0, 40);
        }
    };

    this.split = function () {
        _aPlayerCards[0].initSplit(new CVector2(_oGroup.x + _oCardOffset.getX(), _oGroup.y + _oCardOffset.getY()));
        _aPlayerCards[1].initSplit(new CVector2(_oGroup.x + _oSplitOffset.getX(), _oGroup.y + _oSplitOffset.getY()));
        _aPlayerCards[1].card.splited = true
        CARD_ORDER_PLAYER_SPLIT += 1
        _aPlayerCards[1].card.order = CARD_ORDER_PLAYER_SPLIT
        _aPlayerCards[1].addEventListener(SPLIT_CARD_END_ANIM, this._onSplitCardEndAnim);

    };

    this.showInsuranceText = function (_currentInsuarnceBet) {
        _oCurInsuaranceText.text = "+ " + languageService.serverCurrency("currencySymbol") + Number(_currentInsuarnceBet).toFixed(CURRENCY_DECIMAL);
        _oCurInsuaranceText.visible = true;
        if (isSplitActive) {
            _oCurInsuaranceSplitText.text = "+ " + languageService.serverCurrency("currencySymbol") + Number(_currentInsuarnceBet).toFixed(CURRENCY_DECIMAL);
            _oCurInsuaranceSplitText.visible = true;
        }
    };

    this.hideInsuranceText = function () {
        _oCurInsuaranceText.visible = false;
        _oCurInsuaranceSplitText.visible = false;
    };

    this.insurance = function (iCurBet, iCredit, iInsuranceBet) {
        this.changeBet(iCurBet);
        this.decreaseCredit(iCredit)
        var aFichePile = _oMainFichesController.createFichesPile(iInsuranceBet, true);
        _aFichesOnTable = new Array();
        for (var k = 0; k < aFichePile.length; k++) {
            _aFichesOnTable.push({ value: aFichePile[k].value, index: aFichePile[k].index });
        }

        this.showInsuranceText(iInsuranceBet);
        _bInsuranceActive = true;
    };

    this.getPrevBet = function () {
        return _oMainFichesController.getPrevBet();
    };

    this.isRebetAvailable = function () {
        let prevBetValue = _oMainFichesController.getPrevBet();

        if (prevBetValue > _iCredit || prevBetValue === 0) {
            return false;
        };

        return true;
    };

    this.rebet = function (_oInterface) {
        var iValue = _oMainFichesController.getPrevBet();

        if (iValue > _iCredit || iValue === 0) {
            return false;
        } else {
            this.decreaseCredit(iValue);
            var ref = this;

            this.changeBet(iValue);

            var aFichePile = _oMainFichesController.createFichesPile(iValue, false);
            _aFichesOnTable = new Array();
            for (var k = 0; k < aFichePile.length; k++) {
                _aFichesOnTable.push({ value: aFichePile[k].value, index: aFichePile[k].index });
            }

            this.bet(iValue, false);
            return true;
        }

    };

    this._onSitDown = function () {
        if (_aCbCompleted[SIT_DOWN]) {
            _aCbCompleted[SIT_DOWN].call(_aCbOwner[SIT_DOWN]);
        }
    };

    this._onFichesEndMove = function () {
        if (_aCbCompleted[ASSIGN_FICHES]) {
            _aCbCompleted[ASSIGN_FICHES].call(_aCbOwner[ASSIGN_FICHES]);
        }
    };

    this._onRemoveCard = function (oCard) {
        for (var i = 0; i < _aPlayerCards.length; i++) {
            if (_aPlayerCards[i] === oCard) {
                _aPlayerCards.splice(i, 1);
                break;
            }
        }
    };

    this._onSplitCardEndAnim = function () {
        s_oGame._onSplitCardEndAnim();

        // _oArrowCurPlayer.x = _oSplitOffset.getX() - 12 * GAME_SCALE;
        // _oArrowCurPlayer.y = _oSplitOffset.getY() + 110 * GAME_SCALE;

        let config = orientation_mode[getOrientation()].CSeat;
        cfg = config._oArrowCurPlayer
        _oArrowCurPlayer.scaleX = config._oArrowCurPlayer.scale * GAME_SCALE;
        _oArrowCurPlayer.scaleY = config._oArrowCurPlayer.scale * GAME_SCALE;
        if (_iCurHand == 0) {
            _oArrowCurPlayer.x = _oCurCardValueText.x
            _oArrowCurPlayer.y = _oCurBetText.y + config._oArrowCurPlayer.stepY * GAME_SCALE
        } else if (_iCurHand == 1) {
            _oArrowCurPlayer.x = _oCurCardSplitValueText.x
            _oArrowCurPlayer.y = _oCurBetText.y + config._oArrowCurPlayer.stepY * GAME_SCALE
        }
        _oArrowCurPlayer.visible = true;
    };

    this.updateFichesController = function (iTime) {
        if (_oSplitFichesController) {
            _oSplitFichesController.update(iTime);
        }
        _oMainFichesController.update(iTime);
    };

    this.updateSplit = function () {
        for (var i = 0; i < _aPlayerCards.length; i++) {
            _aPlayerCards[i].update(s_iTimeElaps);

        }

    };

    this.isSplitAvailable = function () {
        if (!_aPlayerCards[0] || !_aPlayerCards[1]) {
            return false;
        }

        if (Math.abs(_aPlayerCards[0].getFotogram() - _aPlayerCards[1].getFotogram()) % 13 === 0) {
            return true;
        } else if (splitArrVal.includes(_aPlayerCards[0].getFotogram()) && splitArrVal.includes(_aPlayerCards[1].getFotogram())) {
            return true;
        } else {
            return false;
        }
    };

    this.getAttachCardOffset = function (isForceHand = false, forceHandIndex) {
        let currentHand = isForceHand ? forceHandIndex : _iCurHand;
        let offsetX = currentHand === 0 ? _oCardOffset.getX() : _oSplitOffset.getX();
        let offsetY = currentHand === 0 ? _oCardOffset.getY() : _oSplitOffset.getY();

        var xPos = _oGroup.x + offsetX + ((CARD_WIDTH / 2) * _aHands[currentHand].getNumCards());
        var yPos = _oGroup.y + offsetY;
        _vAttachPos.set(xPos, yPos);


        return _vAttachPos;
    };

    this.getCurBet = function () {
        return _aHands[_iCurHand].getCurBet();
    };

    this.getCredit = function () {
        return _iCredit;
    };

    this.getHandValue = function (iIndex) {
        if (iIndex > _aHands.length - 1) {
            return 0;
        }
        return _aHands[iIndex].getValue();
    };

    this.getNumHands = function () {
        return _aHands.length;
    };

    this.getNumCardsForHand = function (iIndex) {
        return _aHands[iIndex].getNumCards();
    };

    this.getBetForHand = function (iHand) {
        return _aHands[iHand].getCurBet();
    };

    this.getAces = function () {
        return _aHands[_iCurHand].getAces();
    };

    this.getFichesController = function (iHandIndex) {
        return _aHands[iHandIndex].getFichesController();
    };

    this.getCardOffset = function () {
        return _oCardOffset;
    };

    this.getPlayerCards = function () {
        return _aPlayerCards;
    };

    this.getStartingBet = function () {
        return _oMainFichesController.getValue();
    };

    this._init();
}