function CGame(oData) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token') || 'test188';
    const mode = urlParams.get('mode');

    var _bUpdate = false;
    var _bPlayerTurn;
    var _bSplitActive;
    var _bDoubleForPlayer;
    var _bDealerLoseInCurHand = false;
    var _iInsuranceBet;
    var _iTimeElaps;
    var _iMaxBet;
    var _iMinBet;
    var _iState;
    var _iCardIndexToDeal;
    var _iDealerValueCard;
    var _iCardDealedToDealer;
    var _iCurFichesToWait;
    var _iNextCardForPlayer;
    var _iNextCardForDealer;
    var _iGameCash;
    var _iAdsCounter;

    var _aCardsDealing;
    var _aCardsInCurHandForDealer;
    var _aDealerCards;
    var _aCardDeck;
    var _aCardsInCurHandForPlayer;
    var _aCurActiveCardOffset;
    var _aCardOut;
    var _aCurDealerPattern;

    var _oStartingCardOffset;
    var _oDealerCardOffset;
    var _oReceiveWinOffset;
    var _oFichesDealerOffset;
    var _oRemoveCardsOffset;
    var _oCardContainer;

    var _oBg;
    var _oInterface;
    var _oSeat;
    var _oGameOverPanel;
    var _oMsgBox;

    this._init = function() {
        _iMaxBet = MAX_BET;
        _iMinBet = MIN_BET;
        _iState = -1;
        _iTimeElaps = 0;
        _iAdsCounter = 0;

        s_oTweenController = new CTweenController();

        var iRandBg = Math.floor(Math.random() * 4) + 1;
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game_' + iRandBg));
        s_oStage.addChild(_oBg);

        _oSeat = new CSeat();
        _oSeat.setCredit(TOTAL_MONEY);
        _oSeat.addEventListener(SIT_DOWN, this._onSitDown, this);
        _oSeat.addEventListener(RESTORE_ACTION, this._onSetPlayerActions);
        _oSeat.addEventListener(PASS_TURN, this._passTurnToDealer);
        _oSeat.addEventListener(END_HAND, this._onEndHand);
        _oSeat.addEventListener(PLAYER_LOSE, this._playerLose);

        _oCardContainer = new createjs.Container();
        s_oStage.addChild(_oCardContainer);

        _oInterface = new CInterface(TOTAL_MONEY);
        _oInterface.displayMsg(languageService.getString("textDisplayMsgSitDown"));

        this.reset(true);

        _oStartingCardOffset = new CVector2();
        _oStartingCardOffset.set(1214, 228);

        _oDealerCardOffset = new CVector2();
        _oDealerCardOffset.set(788, 180);

        _oReceiveWinOffset = new CVector2();
        _oReceiveWinOffset.set(418, 820);

        _oFichesDealerOffset = new CVector2();
        _oFichesDealerOffset.set(CANVAS_WIDTH / 2, -100);

        _oRemoveCardsOffset = new CVector2(408, 208);

        _aCurActiveCardOffset = new Array(_oSeat.getCardOffset(), _oDealerCardOffset);

        _oInterface.disableBetFiches();
        _oGameOverPanel = new CGameOver();
        _oMsgBox = new CMsgBox();

        if (_oSeat.getCredit() < s_oGameSettings.getFichesValueAt(0)) {
            this._gameOver();
            this.changeState(-1);
        } else {
            _bUpdate = true;
        }


    };

    this.unload = function() {
        _bUpdate = false;

        for (var i = 0; i < _aCardsDealing.length; i++) {
            _aCardsDealing[i].unload();
        }

        var aCards = _oSeat.getPlayerCards();
        for (var k = 0; k < aCards.length; k++) {
            aCards[k].unload();
        }

        _oInterface.unload();
        _oGameOverPanel.unload();
        _oMsgBox.unload();
        s_oStage.removeAllChildren();
    };

    this.reset = function(bFirstPlay) {
        _bPlayerTurn = true;
        _bSplitActive = false;
        _bDoubleForPlayer = false;
        _iInsuranceBet = 0;
        _iTimeElaps = 0;
        _iCardIndexToDeal = 0;

        _iDealerValueCard = 0;
        _iCardDealedToDealer = 0;
        _iCurFichesToWait = 0;
        _oSeat.reset();

        _aCardsDealing = new Array();
        _aCardsDealing.splice(0);

        _aDealerCards = new Array();
        _aDealerCards.splice(0);

        _oInterface.reset();
        _oInterface.enableBetFiches();

        serverRequests.reset(bFirstPlay, () => {}, this);
    };

    this.changeState = function(iState) {
        _iState = iState;

        switch (_iState) {
            case STATE_GAME_DEALING:
                {
                    // serverRequests.prepareDealing(_iGameCash, _oSeat.getCurBet(), function(data) {
                    _oInterface.disableButtons();
                    _oInterface.displayMsg(languageService.getString("textDisplayMsgDealing"));
                    this._dealing();
                    // }, this);
                    break;
                }
        }
    };

    this._checkIfDealerPatternCanBeUsed = function(aTmpDealerPattern) {
        for (var i = 0; i < aTmpDealerPattern.length; i++) {
            if (_aCardOut[aTmpDealerPattern[i]] > 1) {
                return false;
            }
        }

        return true;
    };

    this.attachCardToDeal = function(pStartingPoint, pEndingPoint, bDealer, iCardCount) {
        if (bDealer) {
            //DEALER CARDS
            serverRequests.getCardForDealer(function(respData) {
                let oCard = new CCard(_oStartingCardOffset.getX(), _oStartingCardOffset.getY(), _oCardContainer);
                oCard.setInfo(
                    pStartingPoint,
                    pEndingPoint,
                    respData.result.card,
                    respData.result.cardValue,
                    bDealer,
                    iCardCount
                );
                oCard.addEventListener(ON_CARD_ANIMATION_ENDING, this.cardFromDealerArrived);
                _aCardsDealing.push(oCard);
                playSound("card", 1, false);
            }, this);
        } else {
            //PLAYER CARDS
            serverRequests.getCardForPlayer(function(respData) {
                let oCard = new CCard(_oStartingCardOffset.getX(), _oStartingCardOffset.getY(), _oCardContainer);
                oCard.setInfo(
                    pStartingPoint,
                    pEndingPoint,
                    respData.result.card,
                    respData.result.cardValue,
                    bDealer,
                    iCardCount
                );
                oCard.addEventListener(ON_CARD_ANIMATION_ENDING, this.cardFromDealerArrived);
                _aCardsDealing.push(oCard);
                playSound("card", 1, false);
            }, this)
        }
    };

    this.cardFromDealerArrived = function(oCard, bDealerCard, iCount) {
        for (var i = 0; i < _aCardsDealing.length; i++) {
            if (_aCardsDealing[i] === oCard) {
                _aCardsDealing.splice(i, 1);
                break;
            }
        }

        if (bDealerCard === false) {
            _oSeat.addCardToHand(oCard);
            _oSeat.increaseHandValue(oCard.getValue());
            if (iCount > 2) {
                _oSeat.refreshCardValue();
            }
        } else {
            _iDealerValueCard += oCard.getValue();
            if (_iCardDealedToDealer > 2) {
                _oInterface.refreshDealerCardValue(_iDealerValueCard);
            }

            _aDealerCards.push(oCard);
        }

        if (iCount < 3) {
            s_oGame._dealing();
        } else {
            s_oGame._checkHand();
            if (bDealerCard === false && _bDoubleForPlayer) {
                _bDoubleForPlayer = false;
                s_oGame._onStandPlayer();
            }
        }
    };

    this._onStandPlayer = function() {
        _oSeat.stand();
    };

    this._checkHand = function() {
        var i;
        console.log("_bPlayerTurn: " + _bPlayerTurn);
        if (_bPlayerTurn) {
            console.log("player turn");
            _oSeat.checkHand();
        } else {
            serverRequests.checkDealerHand(function(responce) {
                if (!responce.result.isPlayerWin) {
                    for (i = 0; i < _oSeat.getNumHands(); i++) {
                        this._playerLose(i, responce.result.isPlayerWin, responce.result.isDealerWin);
                    }
                    // insurance bet
                    if (_iInsuranceBet > 0 && _aDealerCards.length === 2) {
                        _oSeat.increaseCredit((_iInsuranceBet * 2));
                        _iGameCash -= (_iInsuranceBet * 2);
                        _oInterface.refreshCredit(_oSeat.getCredit());
                    }
                    // update interface
                    if (responce.result.handValue !== -1 && responce.result.card === -1) {
                        _iDealerValueCard = responce.result.handValue;
                        _oInterface.refreshDealerCardValue(_iDealerValueCard);
                    }
                    // if dealer need to take card - card already in responce - just need to add it to interface
                    if (responce.result.card !== -1 && responce.result.cardValue !== -1) {
                        this.hitDealer(responce.result.card, responce.result.cardValue);
                    }
                } else if (responce.result.isPlayerWin) {
                    for (i = 0; i < _oSeat.getNumHands(); i++) {
                        this._playerWin(i, responce.result.isPlayerWin, responce.result.isDealerWin);
                    }
                } else {
                    for (i = 0; i < _oSeat.getNumHands(); i++) {
                        this.playerStandOff(i, responce.result.isPlayerWin, responce.result.isDealerWin, responce.result.isStandoff);
                    }
                }

                if (responce.result.isStandoff) {
                    for (i = 0; i < _oSeat.getNumHands(); i++) {
                        this.playerStandOff(i, responce.result.isPlayerWin, responce.result.isDealerWin, responce.result.isStandoff);
                    }
                }
            }, this);
        }
    };

    this._playerWin = function(iHand, _isPlayerWin, _isDealerWin) {
        var iMult = 1;
        if (_oSeat.getHandValue(iHand) === 21 && _oSeat.getNumCardsForHand(iHand) === 2) {
            iMult = BLACKJACK_PAYOUT;
        }

        var iTotalWin = _oSeat.getBetForHand(iHand) + parseFloat((_oSeat.getBetForHand(iHand) * iMult).toFixed(2));

        _oSeat.increaseCredit(iTotalWin);
        _iGameCash -= iTotalWin;
        if (_isPlayerWin != _isDealerWin) {
            _oSeat.showWinner(iHand, languageService.getString("textShowWinPlayer"), iTotalWin);
        }
        _oInterface.displayMsg(languageService.getString("textDisplayMsgPlayerWin"));

        _oSeat.initMovement(iHand, _oReceiveWinOffset.getX(), _oReceiveWinOffset.getY());

        if (_iDealerValueCard === 21) {
            _oSeat.initInsuranceMov(_oReceiveWinOffset.getX(), _oReceiveWinOffset.getY());
        } else {
            _oSeat.initInsuranceMov(_oFichesDealerOffset.getX(), _oFichesDealerOffset.getY());
        }
    };

    this._playerLose = function(iHand, _isPlayerWin, _isDealerWin) {
        if (_isPlayerWin != _isDealerWin || _bPlayerTurn == true) {
            _oSeat.showWinner(iHand, languageService.getString("textShowLosePlayer"), 0);
        }
        _oInterface.displayMsg(languageService.getString("textDisplayMsgPlayerLose"));

        _oSeat.initMovement(iHand, _oFichesDealerOffset.getX(), _oFichesDealerOffset.getY());

        if (_iDealerValueCard === 21) {
            _oSeat.initInsuranceMov(_oReceiveWinOffset.getX(), _oReceiveWinOffset.getY());
        } else {
            _oSeat.initInsuranceMov(_oFichesDealerOffset.getX(), _oFichesDealerOffset.getY());
        }
    };

    this.playerStandOff = function(iHand, _isPlayerWin, _isDealerWin, _isStandoff) {
        _oSeat.increaseCredit(_oSeat.getBetForHand(iHand));
        _iGameCash -= _oSeat.getBetForHand(iHand);
        if (_isPlayerWin != _isDealerWin || _isStandoff == true) {
            _oSeat.showWinner(iHand, languageService.getString("textShowStandoff"), 0);
        }
        _oInterface.displayMsg(languageService.getString("textDisplayMsgPlayerStandoff"));

        _oSeat.initMovement(iHand, _oReceiveWinOffset.getX(), _oReceiveWinOffset.getY());

        if (_iDealerValueCard === 21) {
            _oSeat.initInsuranceMov(_oReceiveWinOffset.getX(), _oReceiveWinOffset.getY());
        } else {
            _oSeat.initInsuranceMov(_oFichesDealerOffset.getX(), _oFichesDealerOffset.getY());
        }
    };

    this._dealing = function() {
        if (_iCardIndexToDeal < _aCurActiveCardOffset.length * 2) {
            //THIS CARD IS FOR THE DEALER
            if ((_iCardIndexToDeal % _aCurActiveCardOffset.length) === 1) {
                serverRequests.getCardForDealerAuto(function(respData) {
                    let oCard = new CCard(_oStartingCardOffset.getX(), _oStartingCardOffset.getY(), _oCardContainer);
                    let pStartingPoint = new CVector2(_oStartingCardOffset.getX(), _oStartingCardOffset.getY());
                    _iCardDealedToDealer++;
                    let pEndingPoint = new CVector2(_oDealerCardOffset.getX() + (CARD_WIDTH + 2) * (_iCardIndexToDeal > 1 ? 1 : 0), _oDealerCardOffset.getY());

                    oCard.setInfo(
                        pStartingPoint,
                        pEndingPoint,
                        respData.result.card,
                        respData.result.cardValue,
                        true,
                        _iCardDealedToDealer
                    );

                    if (_iCardDealedToDealer === 2) {
                        oCard.addEventListener(ON_CARD_SHOWN, this._onCardShown);
                    }

                    _aCardsDealing.push(oCard);
                    _iCardIndexToDeal++;

                    oCard.addEventListener(ON_CARD_ANIMATION_ENDING, this.cardFromDealerArrived);
                    oCard.addEventListener(ON_CARD_TO_REMOVE, this._onRemoveCard);

                    playSound("card", 1, false);
                }, this);
            } else {
                serverRequests.getCardForPlayerAuto(function(respData) {
                    let oCard = new CCard(_oStartingCardOffset.getX(), _oStartingCardOffset.getY(), _oCardContainer);
                    let pStartingPoint = new CVector2(_oStartingCardOffset.getX(), _oStartingCardOffset.getY());
                    oCard.setInfo(
                        pStartingPoint,
                        _oSeat.getAttachCardOffset(),
                        respData.result.card,
                        respData.result.cardValue,
                        false,
                        _oSeat.newCardDealed()
                    );
                    _aCardsDealing.push(oCard);
                    _iCardIndexToDeal++;

                    oCard.addEventListener(ON_CARD_ANIMATION_ENDING, this.cardFromDealerArrived);
                    oCard.addEventListener(ON_CARD_TO_REMOVE, this._onRemoveCard);

                    playSound("card", 1, false);
                }, this);
            }
        } else {
            this._checkAvailableActionForPlayer();
        }
    };

    this.hitDealer = function(dealedCard, dealedCardValue) {
        var pStartingPoint = new CVector2(_oStartingCardOffset.getX(), _oStartingCardOffset.getY());
        var pEndingPoint = new CVector2(_oDealerCardOffset.getX() + ((CARD_WIDTH + 3) * _iCardDealedToDealer), _oDealerCardOffset.getY());
        _iCardDealedToDealer++;

        let oCard = new CCard(_oStartingCardOffset.getX(), _oStartingCardOffset.getY(), _oCardContainer);
        oCard.setInfo(
            pStartingPoint,
            pEndingPoint,
            dealedCard,
            dealedCardValue,
            true,
            _iCardDealedToDealer
        );
        oCard.addEventListener(ON_CARD_ANIMATION_ENDING, this.cardFromDealerArrived);
        _aCardsDealing.push(oCard);
        playSound("card", 1, false);

        this.changeState(STATE_GAME_HITTING);
    };

    this._onEndHand = function() {
        var pRemoveOffset = new CVector2(_oRemoveCardsOffset.getX(), _oRemoveCardsOffset.getY());

        for (var i = 0; i < _aDealerCards.length; i++) {
            _aDealerCards[i].initRemoving(pRemoveOffset);
            _aDealerCards[i].hideCard();
        }

        var aCards = _oSeat.getPlayerCards();
        for (var k = 0; k < aCards.length; k++) {
            aCards[k].initRemoving(pRemoveOffset);
            aCards[k].hideCard();
        }

        _oSeat.clearText();
        _oInterface.clearDealerText();
        _iTimeElaps = 0;
        s_oGame.changeState(STATE_GAME_SHOW_WINNER);

        playSound("fiche_collect", 1, false);

        _iAdsCounter++;
        if (_iAdsCounter === AD_SHOW_COUNTER) {
            _iAdsCounter = 0;
            $(s_oMain).trigger("show_interlevel_ad");
        }
    };

    this.ficheSelected = function(iFicheValue, iFicheIndex) {
        var iCurBet = _oSeat.getCurBet();

        if (iFicheValue > _oSeat.getCredit()) {
            _oMsgBox.show(languageService.getString("textNoMoney"));
        } else if ((iCurBet + iFicheValue) > _iMaxBet) {
            _oMsgBox.show(languageService.getString("textErrorMaxBet"));
        } else {
            iCurBet += iFicheValue;
            iCurBet = Number(iCurBet.toFixed(1));

            if (mode === 'offline') {
                _oSeat.decreaseCredit(iFicheValue);
            } else {}
            _iGameCash += iFicheValue;

            _oSeat.changeBet(iCurBet);
            _oSeat.refreshFiches(iFicheValue, iFicheIndex, 0, 0);

            _oSeat.bet(iCurBet, false);
            _oInterface.enable(true, false, false, false, false);
            _oInterface.refreshCredit(_oSeat.getCredit());
        }
    };

    this._checkAvailableActionForPlayer = function() {
        serverRequests.checkAvailablePlayerActions(_oSeat.isSplitAvailable(), _bSplitActive,
            _oSeat.getCredit(), _oSeat.getCurBet(),
            function(responce) {
                let result = responce.result;

                this.changeState(-1);

                if (result.passTurn) {
                    this._passTurnToDealer();
                    return;
                }

                _oSeat.setPlayerHandValue(result.handValue);
                _oSeat.refreshCardValue();
                _oInterface.displayMsg(languageService.getString("textDisplayMsgYourAction"));
                _oInterface.enable(false, true, true, result.needActivateDouble, result.needActivateSplit);

                if (result.needInsurance) {
                    _iInsuranceBet = result.insuranceBet;
                    _oInterface.showInsurancePanel();
                }
            }, this);
    };

    this._passTurnToDealer = function() {
        if (!_bPlayerTurn) {
            return;
        }
        _bPlayerTurn = false;
        _oInterface.disableButtons();
        _aDealerCards[1].showCard();
        playSound("card", 1, false);

        _oInterface.displayMsg(languageService.getString("textDisplayMsgDealerTurn"));
    };

    this._gameOver = function() {
        _oGameOverPanel.show();
    };

    this.onFicheSelected = function(iFicheIndex, iFicheValue) {
        this.ficheSelected(iFicheValue, iFicheIndex);
    };

    this._onSetPlayerActions = function(bDeal, bHit, bStand, bDouble, bSplit) {
        _oInterface.enable(bDeal, bHit, bStand, bDouble, bSplit);
        _oSeat.refreshCardValue();
    };

    this._onSitDown = function() {
        this.changeState(STATE_GAME_WAITING_FOR_BET);
        _oInterface.enableBetFiches();
    };

    this.onDeal = function() {
        if (_iMinBet > _oSeat.getCurBet()) {
            _oMsgBox.show(languageService.getString("textErrorMinBet"));
            s_oInterface.enableBetFiches();
            s_oInterface.enable(true, false, false, false, false);
            return;
        }

        if (mode === 'offline') {} else {
            // console.log("_oSeat.getCurBet(): " + _oSeat.getCurBet());
            serverRequests.deductBetAmount(_oSeat.getCurBet(), function(responce) {
                _oSeat.setCredit(responce.balance);
                // console.log("on deal online _oSeat.getCredit(): " + _oSeat.getCredit());
                _oInterface.refreshCredit(_oSeat.getCredit());
            }, this);
        }

        this.changeState(STATE_GAME_DEALING);

        $(s_oMain).trigger("bet_placed", _oSeat.getCurBet());
    };

    this.onHit = function() {
        var pStartingPoint = new CVector2(_oStartingCardOffset.getX(), _oStartingCardOffset.getY());

        var pEndingPoint = new CVector2(_oSeat.getAttachCardOffset().getX(), _oSeat.getAttachCardOffset().getY());

        this.attachCardToDeal(pStartingPoint, pEndingPoint, false, _oSeat.newCardDealed());

        this.changeState(STATE_GAME_HITTING);
    };

    this.onStand = function() {
        _oSeat.stand();
        serverRequests.getStand();
    };

    this.onDouble = function() {
        var iDoubleBet = _oSeat.getCurBet();

        var iCurBet = iDoubleBet;
        iCurBet += iDoubleBet;

        _oSeat.doubleAction(iCurBet);
        _oSeat.changeBet(iCurBet);
        if (mode === 'offline') {
            _oSeat.decreaseCredit(iDoubleBet);
        } else {
            serverRequests.deductBetAmount(iDoubleBet, function(responce) {
                _oSeat.setCredit(responce.balance);
                // console.log("on double online _oSeat.getCredit(): " + _oSeat.getCredit());
                _oInterface.refreshCredit(_oSeat.getCredit());
            }, this);
        }
        _iGameCash += iDoubleBet;
        if (_iGameCash < (iCurBet * 2)) {
            _bDealerLoseInCurHand = false;
        }

        _oSeat.bet(iCurBet);
        _oInterface.refreshCredit(_oSeat.getCredit());
        this.onHit();

        _bDoubleForPlayer = true;
        $(s_oMain).trigger("bet_placed", iDoubleBet);
    };

    this.onSplit = function() {
        if (_iGameCash < (_oSeat.getCurBet() * 4)) {
            _bDealerLoseInCurHand = false;
        }
        _oSeat.split();

        serverRequests.getSplit(function(data) {}, this);

        this.changeState(STATE_GAME_SPLIT);
    };

    this._onSplitCardEndAnim = function() {
        var iCurBet = _oSeat.getCurBet();
        var iSplitBet = iCurBet;
        iCurBet += iSplitBet;
        _oSeat.bet(iCurBet, true);

        _bSplitActive = true;

        _oInterface.enable(false, true, true, false, false);

        _oSeat.setSplitHand();
        _oSeat.refreshCardValue();

        _oSeat.changeBet(iCurBet - iSplitBet);
        if (mode === 'offline') {
            _oSeat.decreaseCredit(iSplitBet);
        } else {
            serverRequests.deductBetAmount(iSplitBet, function(responce) {
                _oSeat.setCredit(responce.balance);
                // console.log("card animatin end online _oSeat.getCredit(): " + _oSeat.getCredit());
                _oInterface.refreshCredit(_oSeat.getCredit());
            }, this);
        }
        _iGameCash += iSplitBet;

        _oInterface.refreshCredit(_oSeat.getCredit());

        $(s_oMain).trigger("bet_placed", iSplitBet);
    };

    this.clearBets = function() {
        var iCurBet = _oSeat.getStartingBet();

        if (iCurBet > 0) {
            _oSeat.clearBet();
            _oSeat.increaseCredit(iCurBet);
            _iGameCash -= iCurBet;
            _oInterface.refreshCredit(_oSeat.getCredit());
        }
    };

    this.rebet = function() {
        this.clearBets();

        if (_oSeat.rebet()) {
            if (mode === 'offline') {

            } else {
                serverRequests.deductBetAmount(_oSeat.getCurBet(), function(responce) {
                    // console.log("responce: ", responce);
                    _oSeat.setCredit(responce.balance);
                    // console.log("rebet _oSeat.getCredit(): " + _oSeat.getCredit());
                    _oInterface.refreshCredit(_oSeat.getCredit());
                }, this);
            }
            // console.log("_oSeat.getCredit(): ", _oSeat.getCredit());
            _oInterface.refreshCredit(_oSeat.getCredit());
            _iTimeElaps = BET_TIME;
            _oInterface.disableBetFiches();
            _oInterface.enable(true, false, false, false, false);

            // console.log("_oSeat.getCurBet(): ", _oSeat.getCurBet());
            this.changeState(STATE_GAME_DEALING);
            $(s_oMain).trigger("bet_placed", _oSeat.getCurBet());
        } else {
            _oInterface.disableRebet();
        }

    };

    this.onBuyInsurance = function() {
        var iCurBet = _oSeat.getCurBet();
        iCurBet += _iInsuranceBet;
        _oSeat.insurance(iCurBet, -_iInsuranceBet, _iInsuranceBet);

        _oInterface.refreshCredit(_oSeat.getCredit());
    };

    this._onCardShown = function() {
        s_oGame._checkHand();
    };

    this._onRemoveCard = function(oCard) {
        oCard.unload();
    };

    this.onExit = function() {
        this.unload();
        $(s_oMain).trigger("save_score", [_oSeat.getCredit()]);
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event", _oSeat.getCredit());
        s_oMain.gotoMenu();

    };

    this.getState = function() {
        return _iState;
    };

    this._updateWaitingBet = function() {
        _iTimeElaps += s_iTimeElaps;
        if (_iTimeElaps > BET_TIME) {
            _iTimeElaps = 0;
        } else {
            var iCountDown = Math.floor((BET_TIME - _iTimeElaps) / 1000);
            _oInterface.displayMsg(
                languageService.getString("textMinBet") + ":" + _iMinBet + "\n" + languageService.getString("textMaxBet") + ":" + _iMaxBet,
                languageService.getString("textDisplayMsgWaitingBet") + " " + iCountDown
            );
        }
    };

    this._updateDealing = function() {
        for (var i = 0; i < _aCardsDealing.length; i++) {
            _aCardsDealing[i].update();
        }
    };

    this._updateHitting = function() {
        for (var i = 0; i < _aCardsDealing.length; i++) {
            _aCardsDealing[i].update();
        }
    };

    this._updateSplit = function() {
        _oSeat.updateSplit();
    };

    this._updateShowWinner = function() {
        _oSeat.updateFichesController(s_iTimeElaps);

        var aCards = _oSeat.getPlayerCards();
        for (var k = 0; k < aCards.length; k++) {
            aCards[k].update();
        }

        for (var j = 0; j < _aDealerCards.length; j++) {
            _aDealerCards[j].update();
        }

        _iTimeElaps += s_iTimeElaps;
        if (_iTimeElaps > TIME_END_HAND) {
            _iTimeElaps = 0;
            this.reset(false);
            _oInterface.reset();

            if (_oSeat.getCredit() < s_oGameSettings.getFichesValueAt(0)) {
                this._gameOver();
                this.changeState(-1);
            } else {
                this.changeState(STATE_GAME_WAITING_FOR_BET);
            }

            _oInterface.refreshCredit(_oSeat.getCredit());
        }
    };

    this.update = function() {
        if (_bUpdate === false) {
            return;
        }

        switch (_iState) {
            case STATE_GAME_WAITING_FOR_BET:
                {
                    this._updateWaitingBet();
                    break;
                }
            case STATE_GAME_DEALING:
                {
                    this._updateDealing();
                    break;
                }
            case STATE_GAME_HITTING:
                {
                    this._updateHitting();
                    break;
                }
            case STATE_GAME_SPLIT:
                {
                    this._updateSplit();
                    break;
                }
            case STATE_GAME_SHOW_WINNER:
                {
                    this._updateShowWinner();
                    break;
                }
        }


    };

    s_oGame = this;

    TOTAL_MONEY = oData.money;
    MIN_BET = oData.min_bet;
    MAX_BET = oData.max_bet;
    BET_TIME = oData.bet_time;
    BLACKJACK_PAYOUT = oData.blackjack_payout;
    WIN_OCCURRENCE = oData.win_occurrence;
    _iGameCash = oData.game_cash;

    AD_SHOW_COUNTER = oData.ad_show_counter;

    this._init();
}

var s_oGame;
var s_oTweenController;