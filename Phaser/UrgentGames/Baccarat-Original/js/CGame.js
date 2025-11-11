function CGame(oData) {
    var _bUpdate = false;
    var _bRebetActive;
    var _iTimeElaps;
    var _iMaxBet;
    var _iState;
    var _iCardIndexToDeal;
    var _iPlayerValueCard;
    var _iDealerValueCard;
    let cardsAmount;
    var _aCardsDealing;

    var _aCurActiveCardOffset;
    var _pStartingPointCard;
    let cards;

    var _oStartingCardOffset;
    var _oDealerCardOffset;
    var _oReceiveWinOffset;
    var _oFichesDealerOffset;
    var _oRemoveCardsOffset;
    var _oCardContainer;

    var _oBg;
    var _oInterface;
    var _oSeat;
    var obj = ((languageService.getString("TEXT_BET")));

    this._init = function () {
        _iMaxBet = MAX_BET;
        _iState = -1;
        _iTimeElaps = 0;

        s_oTweenController = new CTweenController();

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);

        var oSpriteGui = s_oSpriteLibrary.getSprite('gui_bg');
        var oGuiBg = createBitmap(oSpriteGui);
        oGuiBg.y = CANVAS_HEIGHT - oSpriteGui.height;
        s_oStage.addChild(oGuiBg);

        _oCardContainer = new createjs.Container();
        s_oStage.addChild(_oCardContainer);

        _oInterface = new CInterface(TOTAL_MONEY);
        _oInterface.displayMsg(languageService.getString("TEXT_DISPLAY_MSG_WAITING_BET"), languageService.getString("TEXT_MIN_BET") + ": " + MIN_BET + "\n" + languageService.getString("TEXT_MAX_BET") + ": " + MAX_BET);

        _oSeat = new CSeat();
        _oSeat.setCredit(TOTAL_MONEY.toFixed(CURRENCY_DECIMAL));


        this.reset(false);

        _oStartingCardOffset = new CVector2();
        _oStartingCardOffset.set(1214, 228);

        _oDealerCardOffset = new CVector2();
        _oDealerCardOffset.set(CANVAS_WIDTH / 2 + 100, 230);

        _oReceiveWinOffset = new CVector2();
        _oReceiveWinOffset.set(418, 820);

        _oFichesDealerOffset = new CVector2();
        _oFichesDealerOffset.set(0, -CANVAS_HEIGHT);

        _oRemoveCardsOffset = new CVector2(454, 230);

        _aCurActiveCardOffset = new Array(_oSeat.getCardOffset(), _oDealerCardOffset);

        if (_oSeat.getCredit() < FICHES_VALUE[0]) {
            errorHandler.processByNumber(105);
            this.changeState(-1);
        } else {
            _bUpdate = true;
        }

        _pStartingPointCard = new CVector2(_oStartingCardOffset.getX(), _oStartingCardOffset.getY());

        this.changeState(STATE_GAME_WAITING_FOR_BET);
    };

    this.unload = function () {
        _bUpdate = false;

        for (var i = 0; i < _aCardsDealing.length; i++) {
            _aCardsDealing[i].unload();
        }

        _oInterface.unload();
        s_oStage.removeAllChildren();
    };

    this.reset = function (bRebet) {
        _bRebetActive = false;
        _iTimeElaps = 0;
        _iCardIndexToDeal = 0;

        _iDealerValueCard = 0;
        _iPlayerValueCard = 0;
        _oSeat.reset();

        _aCardsDealing = new Array();
        _aCardsDealing.splice(0);

        _oInterface.reset();
        _oInterface.enableBetFiches(bRebet);

    };

    //!set money from CMain - backend
    this.setMoney = function (iMoney) {
        TOTAL_MONEY = iMoney;
        oData.money = TOTAL_MONEY;

        _oSeat.setCredit(iMoney);
        _oInterface.refreshCredit(iMoney);
    };

    this.setMinMaxBet = function (minBet, maxBet) {
        MIN_BET = minBet
        MAX_BET = maxBet
    }

    this.changeState = async function (iState) {
        _iState = iState;
        if (_iState === STATE_GAME_DEALING) {

            _oInterface.disableButtons();
            _oInterface.displayMsg(languageService.getString("TEXT_DISPLAY_MSG_DEALING"), "");

            _oSeat.setCredit(_oSeat.getCredit() - _oSeat.getTotBet());
            _oInterface.refreshCredit(_oSeat.getCredit());

            const betResult = await serverRequests.placeBet(_oSeat.getBetArray());
            
            if (betResult) {
                cards = betResult.result.cardsData
                cardsAmount = cards.length
    
                this.winnerData = betResult.result.winnerData
    
                this._dealing();
            } else {
                _oInterface.enableBetFiches(false);
                _oInterface.enable(true);
            }
        }
    };

    this._showWin = async function () {

        const data = this.winnerData

        var bAnyWin = false;

        const iWinningBet = data.winner

        _iPlayerValueCard = data.playerValue
        _iDealerValueCard = data.dealerValue
        if (iWinningBet === BET_TIE) {
            if (data.aBets[BET_TIE] > 0) {
                var iWin = data.wonCoins
                this._playerWin(iWin, iWinningBet, true);
                this._playerWin(data.aBets[BET_BANKER], BET_BANKER, false);
                this._playerWin(data.aBets[BET_PLAYER], BET_PLAYER, false);

                bAnyWin = true;
                _oInterface.showWin(BET_TIE, iWin, languageService.getString("TEXT_WIN"));
            }
        } else {
            for (var i = 0; i < data.aBets.length; i++) {
                if (data.aBets[i] > 0) {
                    var iWin = 0;
                    if (iWinningBet === i) {

                        iWin = data.wonCoins
                        this._playerWin(iWin, iWinningBet, true);

                        bAnyWin = true;
                    } else {
                        this._playerLose(i, false);
                    }

                    _oInterface.showWin(i, iWin, iWin > 0 ? languageService.getString("TEXT_WIN") : languageService.getString("TEXT_NO_WIN"));
                }
            }
        }

        if (bAnyWin) {
            playSound("win", 1, false);
        } else {
            playSound("lose", 1, false);
            this._playerLose(iWinningBet, true);
        }

        setTimeout(function () { s_oGame._onEndHand(iWinningBet); }, TIME_END_HAND);
    };

    //! player win - 0,1,2 (tie, banker, player)
    this._playerWin = function (iTotWin, iBet, bShowMsg) {

        if (bShowMsg) {
            _oInterface.displayMsg(languageService.getString("TEXT_DISPLAY_MSG_PLAYER_WIN"), Object.entries(obj)[iBet][0] === BET_TIE ? languageService.getString("TEXT_DISPLAY_TIE") : languageService.getString("TEXT_OUTCOME") + " " + Object.entries(obj)[iBet][1]);
        }
        _oSeat.initMovement(iBet, _oReceiveWinOffset.getX(), _oReceiveWinOffset.getY());
    };

    //! player loss - 0,1,2 (tie, banker, player)
    this._playerLose = function (iBet, bShowMsg) {

        if (bShowMsg) {
            _oInterface.displayMsg(languageService.getString("TEXT_DISPLAY_MSG_PLAYER_LOSE"), Object.entries(obj)[iBet][0] === BET_TIE ? languageService.getString("TEXT_DISPLAY_TIE") : languageService.getString("TEXT_OUTCOME") + " " + Object.entries(obj)[iBet][1]);
        } else {
            _oSeat.initMovement(iBet, _oFichesDealerOffset.getX(), _oFichesDealerOffset.getY());
        }

    };

    this._dealing = async function () {

        const card = cards[_iCardIndexToDeal]
        var oCard = new CCard(_oStartingCardOffset.getX(), _oStartingCardOffset.getY(), _oCardContainer);

        var pEndingPoint;

        //THIS CARD IS FOR THE DEALER
        if ((_iCardIndexToDeal % _aCurActiveCardOffset.length) === 1) {

            pEndingPoint = new CVector2(_oDealerCardOffset.getX() + (CARD_WIDTH / 2) * (_iCardIndexToDeal > 1 ? 1 : 0), _oDealerCardOffset.getY());

            oCard.setInfo(
                _pStartingPointCard,
                pEndingPoint,
                card.card,
                card.cardValue,
                true,
                _iCardIndexToDeal
            );

        } else {
            oCard.setInfo(
                _pStartingPointCard,
                _oSeat.getAttachCardOffset(),
                card.card,
                card.cardValue,
                false,
                _iCardIndexToDeal
            );

            _oSeat.newCardDealed();
        }

        _aCardsDealing.push(oCard);
        _iCardIndexToDeal++;

        oCard.addEventListener(ON_CARD_ANIMATION_ENDING, this.cardFromDealerArrived);
        oCard.addEventListener(ON_CARD_TO_REMOVE, this._onRemoveCard);

        playSound("card", 1, false);

    };

    this.cardFromDealerArrived = async function (oCard, bDealerCard, iCount) {
        if (iCount < cardsAmount - 1) {
            s_oGame._dealing();
        } else {
            s_oGame._showWin();
        }

    };

    this._onEndHand = function (iWinningBet) {
        _oSeat.setCredit(_oSeat.getCredit() + this.winnerData.wonCoins);

        _oInterface.refreshCredit(_oSeat.getCredit());

        _oInterface.addHistoryRow(_iPlayerValueCard, _iDealerValueCard, iWinningBet);

        var pRemoveOffset = new CVector2(_oRemoveCardsOffset.getX(), _oRemoveCardsOffset.getY());
        for (var i = 0; i < _aCardsDealing.length; i++) {
            _aCardsDealing[i].initRemoving(pRemoveOffset);
            _aCardsDealing[i].hideCard();
        }

        _oInterface.clearCardValueText();
        _iTimeElaps = 0;
        s_oGame.changeState(STATE_GAME_SHOW_WINNER);

        playSound("fiche_collect", 1, false);

    };

    this.getBetStatus = function(amount) {
        if (amount < MIN_BET) return 1110;
        if (amount > MAX_BET) return 1111;
        if (amount > _oSeat.getCredit()) return 105;
        return 200;
    };

    this.setBet = function (iFicheValue, iFicheIndex, iTypeBet) {
        if (_bRebetActive) {
            _bRebetActive = false;
            this.clearBets();
        }

        var iTotBet = _oSeat.getTotBet();
        let betStatus = this.getBetStatus(iTotBet + iFicheValue);
        // exclude Min bet status, to allow user to place several chips with value less than MIN_BET
        if (betStatus !== 200 && betStatus !== 1110) {
            errorHandler.processByNumber(betStatus);
            return;
        }        

        iTotBet += iFicheValue;
        iTotBet = Number(iTotBet.toFixed(CURRENCY_DECIMAL));

        _oSeat.bet(iFicheValue, iTypeBet, iFicheIndex);

        _oInterface.enable(true, false, false, false, false);
        _oInterface.refreshCredit(_oSeat.getCredit());

    };

    this.onDeal = async function () {
        let betStatus = this.getBetStatus(_oSeat.getTotBet());
        if (betStatus !== 200) {
            errorHandler.processByNumber(betStatus);
            _oInterface.enableBetFiches(false);
            _oInterface.enable(true);
            return;
        }

        _oSeat.setPrevFichesValues()

        this.changeState(STATE_GAME_DEALING);
    };

    this.clearBets = function () {
        var iCurBet = _oSeat.getStartingBet();

        if (iCurBet > 0) {
            _oSeat.clearBet();
            _oInterface.refreshCredit(_oSeat.getCredit());
            var bRebet = _oSeat.checkIfRebetIsPossible();
            _oInterface.enableBetFiches(bRebet);

            $(s_oMain).trigger("clear_bet", iCurBet);
        }
    };

    this.rebet = function () {
        this.clearBets();
        var iCurBet = _oSeat.rebet();
        _oInterface.enable(true, false, false, false, false);
        _oInterface.refreshCredit(_oSeat.getCredit());
        _iTimeElaps = BET_TIME;
        _bRebetActive = true;
        this.onDeal();
    };

    this._onRemoveCard = function (oCard) {
        oCard.unload();
        _oInterface.displayMsg(languageService.getString("TEXT_DISPLAY_MSG_WAITING_BET"), languageService.getString("TEXT_MIN_BET") + ": " + MIN_BET + "\n" + languageService.getString("TEXT_MAX_BET") + ": " + MAX_BET);
    };

    this.onExit = function () {
        this.unload();

        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event", _oSeat.getCredit());
        s_oMain.gotoMenu();

    };

    this.getState = function () {
        return _iState;
    };

    this._updateDealing = function () {
        for (var i = 0; i < _aCardsDealing.length; i++) {
            _aCardsDealing[i].update();
        }
    };

    this._updateShowWinner = function () {
        _oSeat.updateFichesController(s_iTimeElaps);
        for (var k = 0; k < _aCardsDealing.length; k++) {
            _aCardsDealing[k].update();
        }

        _iTimeElaps += s_iTimeElaps;
        if (_iTimeElaps > TIME_END_HAND) {
            _iTimeElaps = 0;
            var bRebet = _oSeat.checkIfRebetIsPossible();

            this.reset(bRebet);
            _oInterface.reset();

            if (_oSeat.getCredit() < FICHES_VALUE[0]) {
                errorHandler.processByNumber(105);
                this.changeState(-1);
            } else {
                this.changeState(STATE_GAME_WAITING_FOR_BET);
            }
            _oInterface.refreshCredit(_oSeat.getCredit());
        }
    };

    this.update = function () {
        if (_bUpdate === false) {
            return;
        }

        switch (_iState) {
            case STATE_GAME_DEALING: {
                this._updateDealing();
                break;
            }
            case STATE_GAME_SHOW_WINNER: {
                this._updateShowWinner();
                break;
            }
        }
    };

    s_oGame = this;

    CURRENCY_DECIMAL = oData.currencyDecimals;
    MONEY = oData.balance;
    TOTAL_MONEY = oData.balance;
    MIN_BET = oData.minBet.toFixed(CURRENCY_DECIMAL)
    MAX_BET = oData.maxBet.toFixed(CURRENCY_DECIMAL)
    BET_TIME = oData.bet_time;
    TIME_END_HAND = oData.time_show_hand;

    this._init();
}

var s_oGame;
var s_oTweenController;

