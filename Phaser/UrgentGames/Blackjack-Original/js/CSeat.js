function CSeat() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token') || 'test188';
    const mode = urlParams.get('mode');


    var _bDoubleActive;
    var _bInsuranceActive;
    var _iCurHand;
    var _iCardDealedToPlayer;
    var _iCredit;
    var _aHands;
    var _aPlayerCards;
    var _aFichesOnTable;
    var _vAttachPos;

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
    var splitArrVal = [];

    var isSplitActive;

    this._init = function() {
        _oGroup = new createjs.Container();
        _oGroup.x = 734;
        _oGroup.y = 360;

        isSplitActive = false;
        splitArrVal = [9, 22, 35, 48, 10, 23, 36, 49, 11, 24, 37, 50, 12, 25, 38, 51];

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('seat'));
        oBg.x = 66;
        oBg.y = 175;
        _oGroup.addChild(oBg);

        _oCurBetText = new createjs.Text("", "20px " + FONT_GAME_1, "#ffde00");
        _oCurBetText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oCurBetText.x = 84;
        _oCurBetText.y = 208;
        _oCurBetText.textAlign = "right";
        _oGroup.addChild(_oCurBetText);

        _oCurSplitBetText = new createjs.Text("", "20px " + FONT_GAME_1, "#ffde00");
        _oCurSplitBetText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oCurSplitBetText.x = 175;
        _oCurSplitBetText.y = 208;
        _oCurSplitBetText.textAlign = "left";
        _oGroup.addChild(_oCurSplitBetText);

        _oCurCardValueText = new createjs.Text("", "20px " + FONT_GAME_1, "#ffffff");
        _oCurCardValueText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oCurCardValueText.x = 56;
        _oCurCardValueText.y = 105;
        _oCurCardValueText.textAlign = "right";
        _oGroup.addChild(_oCurCardValueText);

        _oCurCardSplitValueText = new createjs.Text("", "20px " + FONT_GAME_1, "#ffffff");
        _oCurCardSplitValueText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oCurCardSplitValueText.x = 138;
        _oCurCardSplitValueText.y = 105;
        _oCurCardSplitValueText.textAlign = "left";
        _oGroup.addChild(_oCurCardSplitValueText);

        _oResultText_0 = new createjs.Text("", "20px " + FONT_GAME_1, "#ffffff");
        _oResultText_0.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oResultText_0.x = 0;
        _oResultText_0.y = 240;
        _oResultText_0.textAlign = "center";
        _oGroup.addChild(_oResultText_0);

        _oResultText_1 = new createjs.Text("", "20px " + FONT_GAME_1, "#ffffff");
        _oResultText_1.shadow = new createjs.Shadow("#000000", 2, 2, 1);
        _oResultText_1.x = 150;
        _oResultText_1.y = 240;
        _oResultText_1.textAlign = "left";
        _oGroup.addChild(_oResultText_1);

        _oArrowCurPlayer = createBitmap(s_oSpriteLibrary.getSprite('arrow_hand'));
        _oArrowCurPlayer.visible = false;
        _oGroup.addChild(_oArrowCurPlayer);

        s_oStage.addChild(_oGroup);

        _oInsuranceFiches = new CVector2();
        _oInsuranceFiches.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

        _oMainFichesController = new CFichesController({ x: 834, y: 566 }, _oInsuranceFiches);

        _iCredit = 0;
        _aHands = new Array();
        _aPlayerCards = new Array();

        this.reset();

        _oCardOffset = new CVector2();
        _oCardOffset.set(64, 163);
        _vAttachPos = new CVector2(_oCardOffset.getX(), _oCardOffset.getY());

        _oSplitOffset = new CVector2();
        _oSplitOffset.set(172, 163);

        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        //Enable the bet fiches somtime later after coming to the gamplay
        setTimeout(() => {
            this._onSitDown();
        }, 600);
    };

    this.unload = function() {
        s_oStage.removeChild(_oGroup);
    };

    this.addEventListener = function(iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.reset = function() {
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

        for (var k = 0; k < _aPlayerCards.length; k++) {
            _aPlayerCards[k].unload();
        }
        _aPlayerCards = new Array();
        _aFichesOnTable = new Array();

        _oMainFichesController.addEventListener(FICHES_END_MOV, this._onFichesEndMove);
        _oSplitFichesController = null;

        this.clearText();
    };

    this.clearText = function() {
        _oCurBetText.text = "";
        _oCurSplitBetText.text = "";
        _oCurCardValueText.text = "";
        _oCurCardSplitValueText.text = "";
    };

    this.clearBet = function() {
        _oMainFichesController.reset();
        _aFichesOnTable = new Array();
        _oCurBetText.text = "";
        _aHands[_iCurHand].changeBet(0);
    };

    this.addCardToHand = function(oCard) {
        _aHands[_iCurHand].addCard(oCard);
        _aPlayerCards.push(oCard);

        oCard.addEventListener(ON_CARD_TO_REMOVE, this._onRemoveCard);
    };

    this.increaseHandValue = function(iValue) {
        currentHandValue += iValue;
        _aHands[_iCurHand].increaseHandValue(iValue);
    };

    this.setPlayerHandValue = function(value) {
        currentHandValue = value;


    };

    this.getPlayerHandValue = function() {
        return currentHandValue;
    };

    this.refreshCardValue = function() {
        console.log("refreshCardValue this.getHandValue(0) :", this.getHandValue(0));
        console.log("refreshCardValue this.getHandValue(1) :", this.getHandValue(1));
        console.log("refreshCardValue this.getPlayerHandValue(1) :", this.getPlayerHandValue(1));
        console.log("setPlayerHandValue currentHandValue: " + currentHandValue);
        // _oCurCardValueText.text = currentHandValue;
        _oCurCardValueText.text = this.getHandValue(0);
        // _oCurCardValueText.text = this.getPlayerHandValue();
        if (this.getHandValue(1) > 0) {
            _oCurCardSplitValueText.text = "" + this.getHandValue(1);
        }
    };

    this.setCredit = function(iNewCredit) {
        _iCredit = iNewCredit;
    };

    this.increaseCredit = function(iCreditToAdd) {
        _iCredit += iCreditToAdd;
    };

    this.changeBet = function(iBet) {
        _aHands[_iCurHand].changeBet(iBet);
    };

    // this.checkHand = function() {
    //     serverRequests.checkPlayerHand(_bInsuranceActive, function(responce) {
    //         console.log("checkPlayerHand response: ", responce);
    //         if (responce.result.isPassTurn) {
    //             this.checkPlayerLastHand(PASS_TURN);
    //         } else if (responce.result.isRestore) {
    //             let isDouble = responce.result.isActivateDouble;
    //             if (_aCbCompleted[RESTORE_ACTION]) {
    //                 _aCbCompleted[RESTORE_ACTION].call(_aCbOwner[RESTORE_ACTION], false, true, true, isDouble, false);
    //             }
    //         } else if (responce.result.isLose) {
    //             this.checkPlayerLastHand(PLAYER_LOSE);
    //         }
    //         this.setPlayerHandValue(responce.result.handValue);
    //         console.log("responce.result.handValue: " + responce.result.handValue);
    //         this.refreshCardValue();
    //     }, this);
    // };
    this.checkHand = function() {
        serverRequests.checkPlayerHand(_bInsuranceActive, function(responce) {
            console.log("checkPlayerHand response: ", responce);
            if (responce.result.isPassTurn) {
                this.checkPlayerLastHand(PASS_TURN);
            } else if (responce.result.isRestore) {
                let isDouble = responce.result.isActivateDouble;
                if (_aCbCompleted[RESTORE_ACTION]) {
                    _aCbCompleted[RESTORE_ACTION].call(_aCbOwner[RESTORE_ACTION], false, true, true, isDouble, false);
                }
            } else if (responce.result.isLose) {
                this.checkPlayerLastHand(PLAYER_LOSE);
            } else if (responce.result.isWin) {
                this.playerWin();
            }
            this.setPlayerHandValue(responce.result.handValue);
            // _aHands[0].setHandValue(responce.result.handValue);
            this.refreshCardValue();
        }, this);

        if (isSplitActive) {
            serverRequests.checkPlayerSplitHand(_bInsuranceActive, function(responce) {
                this.setPlayerHandValue(responce.result.handValue);
                this.refreshCardValue();

            }, this);
        }
    };

    this.checkPlayerLastHand = function(szAction) {
        _iCurHand--;
        if (_iCurHand > -1) {
            if (_aCbCompleted[RESTORE_ACTION]) {
                _aCbCompleted[RESTORE_ACTION].call(_aCbOwner[RESTORE_ACTION], false, true, true, false, false);
            }
            _oArrowCurPlayer.x = _oCardOffset.getX();
        } else {
            if (_aCbCompleted[szAction]) {
                _aCbCompleted[szAction].call(_aCbOwner[szAction], 0);
            }
            this.removeArrow();
        }
    };

    this.bet = function(iBet, bSplit) {
        if (bSplit) {
            _oCurBetText.text = languageService.serverCurrency("currencySymbol") + (iBet / 2);
            _oCurSplitBetText.text = languageService.serverCurrency("currencySymbol") + (iBet / 2);


        } else {
            _oCurBetText.text = languageService.serverCurrency("currencySymbol") + iBet;

        }
    };

    this.setSplitHand = function() {
        isSplitActive = true;
        var aSplitBet = new Array();
        for (var i = 0; i < _aFichesOnTable.length; i++) {
            aSplitBet.push(_aFichesOnTable[i]);
        }

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

    this.decreaseCredit = function(iCreditToSubtract) {
        _iCredit -= iCreditToSubtract;
    };

    this.stand = function() {
        this.checkPlayerLastHand(PASS_TURN);
    };

    this.refreshFiches = function(iFicheValue, iFicheIndex, iXPos, iYPos) {
        _aFichesOnTable.push({ value: iFicheValue, index: iFicheIndex });
        _oMainFichesController.refreshFiches(_aFichesOnTable, iXPos, iYPos);
    };

    this.initMovement = function(iHand, iEndX, iEndY) {
        var oCurFichesController = this.getFichesController(iHand);
        oCurFichesController.initMovement(iEndX, iEndY, false);
    };

    this.initInsuranceMov = function(iXPos, iYPos) {
        _oMainFichesController.initInsuranceMov(iXPos, iYPos);
    };

    this.showWinner = function(iHand, szWinner, iTotalWin) {
        console.log("szWinner: " + szWinner);
        if (iTotalWin > 0) {
            if (iHand === 0) {
                _oResultText_0.text = szWinner + ": " + iTotalWin;
            } else {
                _oResultText_1.text = szWinner + ": " + iTotalWin;
            }

            var ref = this;
            if (mode === 'offline') {

            } else {
                serverRequests.winner(iTotalWin, function(responce) {
                    ref.setCredit(responce.balance);
                });
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
            createjs.Tween.get(_oResultText_0).to({ alpha: 1 }, TIME_SHOW_FINAL_CARDS).call(function() { oParent.endWinAnim(); });
        } else {
            createjs.Tween.get(_oResultText_1).to({ alpha: 1 }, TIME_SHOW_FINAL_CARDS).call(function() { oParent.endWinAnim(); });
        }

        $(s_oMain).trigger("save_score", [_iCredit]);
    };

    this.endWinAnim = function() {
        if (_oResultText_0 && _oResultText_1) {
            _oResultText_0.text = "";
            _oResultText_1.text = "";
            if (_aCbCompleted[END_HAND]) {
                _aCbCompleted[END_HAND].call(_aCbOwner[END_HAND]);
            }
        }
    };

    this.newCardDealed = function() {
        _iCardDealedToPlayer++;
        return _iCardDealedToPlayer;
    };

    this.removeAce = function() {
        _aHands[_iCurHand].removeAce();
    };

    this.removeArrow = function() {
        _oArrowCurPlayer.visible = false;
    };

    this.doubleAction = function(iCurBet) {
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

    this.split = function() {
        _aPlayerCards[0].initSplit(new CVector2(_oGroup.x + _oCardOffset.getX(), _oGroup.y + _oCardOffset.getY()));
        _aPlayerCards[1].initSplit(new CVector2(_oGroup.x + _oSplitOffset.getX(), _oGroup.y + _oSplitOffset.getY()));
        _aPlayerCards[1].addEventListener(SPLIT_CARD_END_ANIM, this._onSplitCardEndAnim);
    };

    this.insurance = function(iCurBet, iCredit, iInsuranceBet) {
        this.changeBet(iCurBet);
        this.increaseCredit(iCredit);
        var aFichePile = _oMainFichesController.createFichesPile(iInsuranceBet, true);
        _aFichesOnTable = new Array();
        for (var k = 0; k < aFichePile.length; k++) {
            _aFichesOnTable.push({ value: aFichePile[k].value, index: aFichePile[k].index });
        }

        _bInsuranceActive = true;
    };

    this.rebet = function() {
        var iValue = _oMainFichesController.getPrevBet();
        if (iValue > _iCredit || iValue === 0) {
            return false;
        } else {
            // var ref = this;
            if (mode === 'offline') {
                this.decreaseCredit(iValue);
            } else {
                // serverRequests.deductBetAmount(iValue, function(responce) {
                //     console.log("responce: ", responce);
                //     ref.setCredit(responce.balance);
                //     console.log("ref.getCredit(): " + ref.getCredit());
                // }, this);

            }
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

    this._onSitDown = function() {
        if (_aCbCompleted[SIT_DOWN]) {
            _aCbCompleted[SIT_DOWN].call(_aCbOwner[SIT_DOWN]);
        }
    };

    this._onFichesEndMove = function() {
        if (_aCbCompleted[ASSIGN_FICHES]) {
            _aCbCompleted[ASSIGN_FICHES].call(_aCbOwner[ASSIGN_FICHES]);
        }
    };

    this._onRemoveCard = function(oCard) {
        for (var i = 0; i < _aPlayerCards.length; i++) {
            if (_aPlayerCards[i] === oCard) {
                _aPlayerCards.splice(i, 1);
                break;
            }
        }
    };

    this._onSplitCardEndAnim = function() {
        s_oGame._onSplitCardEndAnim();

        _oArrowCurPlayer.x = _oSplitOffset.getX();
        _oArrowCurPlayer.y = _oSplitOffset.getY() + 70;
        _oArrowCurPlayer.visible = true;
    };

    this.updateFichesController = function(iTime) {
        if (_oSplitFichesController) {
            _oSplitFichesController.update(iTime);
        }
        _oMainFichesController.update(iTime);
    };

    this.updateSplit = function() {
        for (var i = 0; i < _aPlayerCards.length; i++) {
            _aPlayerCards[i].update(s_iTimeElaps);
        }
    };

    this.isSplitAvailable = function() {
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

    this.getAttachCardOffset = function() {
        if (_iCurHand === 0) {

            _vAttachPos.set(_oGroup.x + _oCardOffset.getX() + ((CARD_WIDTH / 2) * _aHands[_iCurHand].getNumCards()),
                _oGroup.y + _oCardOffset.getY() - (CARD_HEIGHT / 2) * _aHands[_iCurHand].getNumCards());

        } else {
            var iXPos = _oGroup.x + _oSplitOffset.getX() + ((CARD_WIDTH / 2) * _aHands[_iCurHand].getNumCards());
            var iYPos = _oGroup.y + _oSplitOffset.getY() - (CARD_HEIGHT / 2) * _aHands[_iCurHand].getNumCards();

            _vAttachPos.set(iXPos, iYPos);
        }

        return _vAttachPos;
    };

    this.getCurBet = function() {
        return _aHands[_iCurHand].getCurBet();
    };

    this.getCredit = function() {
        return _iCredit;
    };

    this.getHandValue = function(iIndex) {
        if (iIndex > _aHands.length - 1) {
            return 0;
        }
        return _aHands[iIndex].getValue();
    };

    this.getNumHands = function() {
        return _aHands.length;
    };

    this.getNumCardsForHand = function(iIndex) {
        return _aHands[iIndex].getNumCards();
    };

    this.getBetForHand = function(iHand) {
        return _aHands[iHand].getCurBet();
    };

    this.getAces = function() {
        return _aHands[_iCurHand].getAces();
    };

    this.getFichesController = function(iHandIndex) {
        return _aHands[iHandIndex].getFichesController();
    };

    this.getCardOffset = function() {
        return _oCardOffset;
    };

    this.getPlayerCards = function() {
        return _aPlayerCards;
    };

    this.getStartingBet = function() {
        return _oMainFichesController.getValue();
    };

    this._init();
}