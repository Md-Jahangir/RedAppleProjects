function CGame(oData) {
  var oGameplayBaseBg_url;
  var _bUpdate = false;
  var _bPlayerTurn;
  var oCard
  var _bSplitActive;
  var _bDoubleForPlayer;
  var _bDealerLoseInCurHand = false;
  var _iInsuranceBet;
  var _iTimeElaps;
  var _iTimeElapsResult;
  var _iMaxBet;
  var action;
  var _iMinBet;
  var _iState;
  var _iCardIndexToDeal;
  var _iCardDealedToDealer;
  //var _iAcesForDealer;
  var _iCurFichesToWait;
  var _iNextCardForPlayer;
  var _iNextCardForDealer;
  var _iGameCash;
  var _aCardsDealing;
  var _aCardsInCurHandForDealer;
  var _aDealerCards;
  var _aCardDeck;
  var _aCardsInCurHandForPlayer;
  var _aCurActiveCardOffset;
  var _aCardOut;
  var _oStartingCardOffset;
  var _oDealerCardOffset;
  var _oReceiveWinOffset;
  var _oFichesDealerOffset;
  var _oRemoveCardsOffset;
  var _oCardContainer;
  var _oBg;
  var oGameplayBaseBg;
  var _oInterface;
  var _oSeat;
  var _oGameOverPanel;
  var _oMsgBox;
  var firstDealData = {};
  var splitData = {};
  this.lastActions = {};
  this.lastActionsUsual = {};
  this.fitchInfo = {};
  this._iDealerValueCard = 0;

  this._init = function () {
    let config = orientation_mode[getOrientation()].CGame;
    _iMaxBet = MAX_BET;
    _iMinBet = MIN_BET;
    _iState = -1;
    _iTimeElaps = 0;
    _iTimeElapsResult = 0;
    action;

    // s_oTweenController 
    s_oTweenController = new CTweenController();

    // bg_gameplay
    var oSprite = s_oSpriteLibrary.getSprite('bg_gameplay');
    _oBg = createBitmap(oSprite);
    s_oGameCon.addChild(_oBg);
    _oBg_url = _oBg.image.src.match('^(.*[\\\/])')

    // bg_gameplay_base
    oGameplayBaseBg = createBitmap(s_oSpriteLibrary.getSprite('bg_gameplay_base'));
    s_oGameCon.addChild(oGameplayBaseBg);
    oGameplayBaseBg_url = oGameplayBaseBg.image.src.match('^(.*[\\\/])')

    // _oSeat
    _oSeat = new CSeat();
    _oSeat.setCredit(TOTAL_MONEY);
    _oSeat.addEventListener(SIT_DOWN, this._onSitDown, this);
    _oSeat.addEventListener(RESTORE_ACTION, this._onSetPlayerActions);
    _oSeat.addEventListener(PASS_TURN, this._passTurnToDealer);
    _oSeat.addEventListener(END_HAND, this._onEndHand);
    _oSeat.addEventListener(PLAYER_LOSE, this._playerLose);

    // _oCardContainer
    _oCardContainer = new createjs.Container();
    s_oGameCon.addChild(_oCardContainer);

    // _oInterface
    _oInterface = new CInterface(TOTAL_MONEY);
    _oInterface.displayMsg(languageService.getString('textDisplayMsgSitDown'));

    this.reset(true);
    _oSeat.reset();
    // _oStartingCardOffset 
    _oStartingCardOffset = new CVector2();
    _oStartingCardOffset.set(NEW_WIDTH * 0.9, NEW_HEIGHT * 0.1)


    // _oDealerCardOffset 
    _oDealerCardOffset = new CVector2();
    _oDealerCardOffset.set(NEW_WIDTH / 2 + config._oDealerCardOffset.stepX * GAME_SCALE, NEW_HEIGHT / 2 + config._oDealerCardOffset.stepY * GAME_SCALE);


    //_oReceiveWinOffset
    _oReceiveWinOffset = new CVector2();
    _oReceiveWinOffset.set(418, 820);

    // _oFichesDealerOffset
    _oFichesDealerOffset = new CVector2();
    _oFichesDealerOffset.set(CANVAS_WIDTH / 2, -100);

    //_oRemoveCardsOffset
    _oRemoveCardsOffset = new CVector2(280, 170);

    //_aCurActiveCardOffset
    _aCurActiveCardOffset = new Array(_oSeat.getCardOffset(), _oDealerCardOffset);

    //_oInterface
    _oInterface.disableBetFiches();

    // _oGameOverPanel
    _oGameOverPanel = new CGameOver();

    // _oMsgBox
    _oMsgBox = new CMsgBox();

    if (_oSeat.getCredit() < s_oGameSettings.getFichesValueAt(0)) {
      this._gameOver();
      this.changeState(-1);
    } else {
      _bUpdate = true;
    }

    setVolume('soundtrack', SOUNDTRACK_VOLUME_IN_GAME);

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

  };

  this.resize = function () {

    let orientation = getOrientation()
    config = orientation_mode[getOrientation()].CGame;
    _oMsgBox.resize()
    _oGameOverPanel.resize()

    // _oBg
    let scaleX = NEW_WIDTH / 1920;
    let scaleY = NEW_HEIGHT / 1080;
    let totalScale = scaleX > scaleY ? scaleX : scaleY;
    _oBg.scaleX = totalScale;
    _oBg.scaleY = totalScale;
    _oBg.regX = 1920 / 2;
    _oBg.regY = 1080 / 2;
    _oBg.x = NEW_WIDTH / 2;
    _oBg.y = NEW_HEIGHT / 2;

    // bg_gameplay_base

    if (orientation == "orientation_portrait") {
      if(window.innerWidth === 768 || window.innerWidth === 820) { //ipad mini
        oGameplayBaseBg.image.src = `${oGameplayBaseBg_url[0]}${window.innerWidth}x${window.innerHeight}/bg_gameplay_base_mobile.png`;
      } else {
        oGameplayBaseBg.image.src = `${oGameplayBaseBg_url[0]}bg_gameplay_base_mobile.png`;
      }
       
      let scaleX = NEW_WIDTH / 1080;
      let scaleY = NEW_HEIGHT / 1920;
      let totalScale = scaleX > scaleY ? scaleX : scaleY;
      oGameplayBaseBg.scaleX = totalScale * 0.9;
      oGameplayBaseBg.scaleY = totalScale * 0.9;
      oGameplayBaseBg.regX = 1080 / 2;
      oGameplayBaseBg.regY = 1920 / 2;
      oGameplayBaseBg.x = NEW_WIDTH / 2;
      oGameplayBaseBg.y = NEW_HEIGHT / 2;
    } else {
      oGameplayBaseBg.image.src = `${oGameplayBaseBg_url[0]}bg_gameplay_base.png`
      oGameplayBaseBg.scaleX = GAME_SCALE;
      oGameplayBaseBg.scaleY = GAME_SCALE;
      oGameplayBaseBg.regX = 1920 / 2;
      oGameplayBaseBg.regY = 1080 / 2;
      oGameplayBaseBg.x = NEW_WIDTH / 2;
      oGameplayBaseBg.y = NEW_HEIGHT / 2;
    }
    // _oDealerCardOffset
    _oDealerCardOffset.set(NEW_WIDTH / 2 + config._oDealerCardOffset.stepX * GAME_SCALE, NEW_HEIGHT / 2 + config._oDealerCardOffset.stepY * GAME_SCALE);

    // Reposition Cards
    this.repositionCards()
  };

  this.repositionCards = function () {
    this.repositionDealerCards()
    this.repositionPlayerCards()
    this.repositionPlayerSplitCards()
  }
  this.repositionDealerCards = function () {

    let portraitScale = getScale(window.innerHeight, window.innerWidth);
    _oCardContainer.children.map((card) => {

      if (card.owner.splited == false && card.owner.cardOwner == 'dealer') {
        card.scaleX = portraitScale * 1.5
        card.scaleY = portraitScale * 1.5
        if (getOrientation() == 'orientation_portrait' && card.owner.cardOwner == 'dealer' && card.owner.splited == false) {
          card.x = NEW_WIDTH / 2 + (-250 * GAME_SCALE) + (100 * card.owner.order) * portraitScale;
          card.y = NEW_HEIGHT * 0.23;

        } else {
          card.scaleX = GAME_SCALE
          card.scaleY = GAME_SCALE
          if (getOrientation() == 'orientation_landscape' && card.owner.cardOwner == 'dealer' && card.owner.splited == false) {
            card.x = _oDealerCardOffset.getX() + (-100 * GAME_SCALE) + (80 * card.owner.order) * GAME_SCALE;
            card.y = _oDealerCardOffset.getY();

          }
        }
      }
    })
  }
  this.repositionPlayerCards = function () {
    let portraitScale = getScale(window.innerHeight, window.innerWidth);
    _oCardContainer.children.map((card) => {
      if (card.owner.splited == false && card.owner.cardOwner == 'player') {
        card.scaleX = portraitScale * 1.5
        card.scaleY = portraitScale * 1.5
        if (getOrientation() == 'orientation_portrait' && card.owner.cardOwner == 'player' && card.owner.splited == false) {
          card.x = _oDealerCardOffset.getX() + (-250 * GAME_SCALE) + (+100 * card.owner.order) * portraitScale;
          if(this.splitActive()) {
            card.x = card.x - 40;
          }
          adjustPlayerCard = orientation_mode[getOrientation()][`${window.innerWidth}*${window.innerHeight}`]?._oPlayerCard;
          card.y = NEW_HEIGHT * 0.64 + 1 * GAME_SCALE - (adjustPlayerCard ? adjustPlayerCard.y : 0);
        } else {
          card.scaleX = GAME_SCALE
          card.scaleY = GAME_SCALE
          if (getOrientation() == 'orientation_landscape' && card.owner.cardOwner == 'player' && card.owner.splited == false) {
            card.x = _oDealerCardOffset.getX() + (-150 * GAME_SCALE) + (+80 * card.owner.order) * GAME_SCALE;
            card.y = NEW_HEIGHT * 0.65 + 1 * GAME_SCALE
          }
        }
      }
    })
  }
  this.repositionPlayerSplitCards = function () {

    let portraitScale = getScale(window.innerHeight, window.innerWidth);
    _oCardContainer.children.map((card) => {
      if (card.owner.splited == true && card.owner.cardOwner == 'player') {
        card.scaleX = portraitScale * 1.5
        card.scaleY = portraitScale * 1.5
        if (getOrientation() == 'orientation_portrait' && card.owner.cardOwner == 'player' && card.owner.splited == true) {
          card.x = _oDealerCardOffset.getX() + (400 * GAME_SCALE) + (100 * card.owner.order) * portraitScale - 40;
          adjustPlayerCard = orientation_mode[getOrientation()][`${window.innerWidth}*${window.innerHeight}`]?._oPlayerCard;

          card.y = NEW_HEIGHT * 0.64 + 1 * GAME_SCALE - (adjustPlayerCard ? adjustPlayerCard.y : 0);

        } else {
          card.scaleX = GAME_SCALE
          card.scaleY = GAME_SCALE
          if (getOrientation() == 'orientation_landscape' && card.owner.cardOwner == 'player' && card.owner.splited == true) {
            card.x = _oDealerCardOffset.getX() + (400 * GAME_SCALE) + (80 * card.owner.order) * GAME_SCALE;
            card.y = NEW_HEIGHT * 0.65 + 1 * GAME_SCALE
          }
        }
      }
    })
  }

  this.getCardContainer = function () {
    return _oCardContainer;
  }

  this.unload = function () {
    _bUpdate = false;

    for (var i = 0; i < _aCardsDealing.length; i++) {
      _aCardsDealing[i].unload();
    }

    var aCards = _oSeat.getPlayerCards();
    for (var k = 0; k < aCards.length; k++) {
      aCards[k].unload();
    }

    _oInterface.unload();
    _oMsgBox.unload();
    _oGameOverPanel.unload();
    s_oGameCon.removeAllChildren();
  };

  this.reset = async function (bFirstPlay) {
    CARD_ORDER_DEALER = 0
    CARD_ORDER_PLAYER = 0
    CARD_ORDER_PLAYER_SPLIT = 0
    firstDealData = {};
    _bPlayerTurn = true;
    _bSplitActive = false;
    _bDoubleForPlayer = false;
    _iInsuranceBet = 0;
    _iTimeElaps = 0;
    _iTimeElapsResult = 0;
    _iCardIndexToDeal = 0;

    this._iDealerValueCard = 0;
    _iCardDealedToDealer = 0;
    //_iAcesForDealer=0;
    _iCurFichesToWait = 0;
    _oSeat.reset(!bFirstPlay)
    this.fitchInfo = {};

    if (bFirstPlay) {
      _aDealerCards = new Array();
      _aDealerCards.splice(0);
    }

    _aCardsDealing = new Array();
    _aCardsDealing.splice(0);

    _oInterface.reset();
    _oInterface.enableBetFiches();

    await serverRequests.reset(bFirstPlay)
  };

  this.changeState = function (iState) {
    _iState = iState;
  };


  this.cardFromDealerArrived = (oCard,
    bDealerCard,
    iCount,
    isForceHand,
    forceHandIndex) => {
    for (var i = 0; i < _aCardsDealing.length; i++) {
      if (_aCardsDealing[i] === oCard) {
        _aCardsDealing.splice(i, 1);
        break;
      }
    }

    if (bDealerCard === false) {
      _oSeat.addCardToHand(oCard, isForceHand, forceHandIndex);
      _oSeat.setPlayerHandValue(s_oGame.lastActions.handValue);
      _oSeat.refreshCardValue();
    } else {
      if (_iCardDealedToDealer > 2) {
        _oInterface.refreshDealerCardValue(s_oGame._iDealerValueCard);
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
    this.repositionCards()
  };

  this._onStandPlayer = function () {
    _oSeat.stand(this.lastActions);
    _bSplitActive = false
  };

  this._checkHand = async function () {
    var i;
    if (_bPlayerTurn) {
      _oSeat.checkHand(this.lastActions);
    } else {
      winAmount = 0;
      let response = await serverRequests.checkDealerHand();
      winAmount = response.winAmount;
      // update hand value
      this._iDealerValueCard = response.handValue;
      // if dealer need to take card - card already in response - just need to add it to interface
      if (response.card !== -1 && response.cardValue !== -1) {
        this.hitDealer(response.card, response.cardValue);
      } else if (
        response.isPlayerUsualHandWin === false &&
        response.isPlayerSplittedHandWin === false
      ) {
        for (i = 0; i < _oSeat.getNumHands(); i++) {
          this._playerLose(
            i,
            response.isPlayerUsualHandWin,
            response.isPlayerSplittedHandWin
          );
        }

        if (_iInsuranceBet > 0 && _aDealerCards.length === 2) {
          _oSeat.increaseCredit(_iInsuranceBet * 3);
          _iGameCash -= (_iInsuranceBet * 3);
          _oInterface.refreshCredit(_oSeat.getCredit());
        }
      } else if (
        response.isPlayerUsualHandWin ||
        response.isPlayerSplittedHandWin
      ) {
        for (i = 0; i < _oSeat.getNumHands(); i++) {
          this._playerWin(
            i,
            response.isPlayerUsualHandWin,
            response.isPlayerSplittedHandWin
          );
        }
      } else {
        for (i = 0; i < _oSeat.getNumHands(); i++) {
          this.playerStandOff(
            i,
            response.isPlayerWin,
            response.isDealerWin,
            response.isStandoff
          );
        }
      }

      //if (response.result.isStandoff) {
      if (
        response.isPlayerUsualHandStandoff ||
        response.isPlayerSplittedHandStandoff
      ) {
        for (i = 0; i < _oSeat.getNumHands(); i++) {
          this.playerStandOff(
            i,
            response.isPlayerWin,
            response.isDealerWin,
            response.isStandoff
          );
        }
      }
    }
  };

  this._playerWin = function (iHand) {
    if (
      _oSeat.getHandValue(iHand) === 21 &&
      _oSeat.getNumCardsForHand(iHand) === 2
    ) {
      _bSplitActive = false
    }
    _oSeat.increaseCredit(winAmount);
    _iGameCash -= winAmount;

    //if (_isPlayerWin != _isDealerWin) {
    _oSeat.showWinner(
      iHand,
      languageService.getString('textShowWinPlayer'),
      winAmount
    );
    //}
    _oInterface.displayMsg(
      languageService.getString('textDisplayMsgPlayerWin')
    );

    _oSeat.initMovement(
      iHand,
      _oReceiveWinOffset.getX(),
      _oReceiveWinOffset.getY()
    );

    if (this._iDealerValueCard === 21) {
      _oSeat.initInsuranceMov(
        _oReceiveWinOffset.getX(),
        _oReceiveWinOffset.getY()
      );
    } else {
      _oSeat.initInsuranceMov(
        _oFichesDealerOffset.getX(),
        _oFichesDealerOffset.getY()
      );
    }
  };

  this._playerLose = function (iHand) {
    //if (_isPlayerWin != _isDealerWin || _bPlayerTurn == true) {
    _oSeat.showWinner(
      iHand,
      languageService.getString('textShowLosePlayer'),
      0
    );
    //}
    _oInterface.displayMsg(
      languageService.getString('textDisplayMsgPlayerLose')
    );

    _oSeat.initMovement(
      iHand,
      _oFichesDealerOffset.getX(),
      _oFichesDealerOffset.getY()
    );

    if (this._iDealerValueCard === 21) {
      _oSeat.initInsuranceMov(
        _oReceiveWinOffset.getX(),
        _oReceiveWinOffset.getY()
      );
    } else {
      _oSeat.initInsuranceMov(
        _oFichesDealerOffset.getX(),
        _oFichesDealerOffset.getY()
      );
    }
    _bSplitActive = false
  };

  this.playerStandOff = function (
    iHand,
    _isPlayerWin,
    _isDealerWin,
    _isStandoff
  ) {

    const betForHandAmount = Number(_oSeat.getBetForHand(iHand))
    _oSeat.increaseCredit(betForHandAmount);
    _iGameCash -= betForHandAmount;

    //if (_isPlayerWin != _isDealerWin || _isStandoff == true) {
    _oSeat.showWinner(iHand, languageService.getString('textShowStandoff'), 0);
    //}
    _oInterface.displayMsg(
      languageService.getString('textDisplayMsgPlayerStandoff')
    );

    _oSeat.initMovement(
      iHand,
      _oReceiveWinOffset.getX(),
      _oReceiveWinOffset.getY()
    );

    if (this._iDealerValueCard === 21) {
      _oSeat.initInsuranceMov(
        _oReceiveWinOffset.getX(),
        _oReceiveWinOffset.getY()
      );
    } else {
      _oSeat.initInsuranceMov(
        _oFichesDealerOffset.getX(),
        _oFichesDealerOffset.getY()
      );
    }
  };
  this.splitActive = function () {
    return _bSplitActive
  }

  // params - card for dealing
  this._dealing = function () {

    if (_iCardIndexToDeal < _aCurActiveCardOffset.length * 2) {
      //THIS CARD IS FOR THE DEALER
      if (_iCardIndexToDeal % _aCurActiveCardOffset.length === 1) {
        CARD_ORDER_DEALER += 1
        var order = CARD_ORDER_DEALER
        let cardData = firstDealData.dealerCards.shift();
        let oCard = new CCard(
          _oStartingCardOffset.getX(),
          _oStartingCardOffset.getY(),
          _oCardContainer,
          { cardOwner: 'dealer', splited: this.splitActive(), order: order },
          this

        );

        let pStartingPoint = new CVector2(
          _oStartingCardOffset.getX(),
          _oStartingCardOffset.getY()
        );
        _iCardDealedToDealer++;
        let pEndingPoint = new CVector2(
          _oDealerCardOffset.getX() + (CARD_WIDTH / 2) * (_iCardIndexToDeal > 1 ? 1 : 0),
          _oDealerCardOffset.getY()
        );
        oCard.setInfo(
          pStartingPoint,
          pEndingPoint,
          cardData.card,
          cardData.cardValue,
          true,
          _iCardDealedToDealer
        );

        if (_iCardDealedToDealer === 2) {
          oCard.addEventListener(ON_CARD_SHOWN, this._onCardShown, this);
        }

        _aCardsDealing.push(oCard);
        _iCardIndexToDeal++;

        oCard.addEventListener(
          ON_CARD_ANIMATION_ENDING,
          this.cardFromDealerArrived
        );
        oCard.addEventListener(ON_CARD_TO_REMOVE, this._onRemoveCard);

        playSound('card', 1, false);
      } else {
        if (this.splitActive() == true) {
          CARD_ORDER_PLAYER_SPLIT += 1
          var order = CARD_ORDER_PLAYER_SPLIT
        } else {
          CARD_ORDER_PLAYER += 1
          var order = CARD_ORDER_PLAYER
        }

        let cardData = firstDealData.playerCards.shift();
        let oCard = new CCard(
          _oStartingCardOffset.getX(),
          _oStartingCardOffset.getY(),
          _oCardContainer,
          { cardOwner: 'player', splited: this.splitActive(), order: order },
          this
        );
        let pStartingPoint = new CVector2(
          _oStartingCardOffset.getX(),
          _oStartingCardOffset.getY()
        );
        oCard.setInfo(
          pStartingPoint,
          _oSeat.getAttachCardOffset(),
          cardData.card,
          cardData.cardValue,
          false,
          _oSeat.newCardDealed()
        );
        _aCardsDealing.push(oCard);
        _iCardIndexToDeal++;

        oCard.addEventListener(
          ON_CARD_ANIMATION_ENDING,
          this.cardFromDealerArrived
        );
        oCard.addEventListener(ON_CARD_TO_REMOVE, this._onRemoveCard);

        playSound('card', 1, false);
      }
    } else {
      this.updateActions();
    }
    this.repositionCards()
  };

  this.hitDealer = function (dealedCard, dealedCardValue) {
    CARD_ORDER_DEALER += 1
    var order = CARD_ORDER_DEALER
    var pStartingPoint = new CVector2(
      _oStartingCardOffset.getX(),
      _oStartingCardOffset.getY()
    );
    var pEndingPoint = new CVector2(
      _oDealerCardOffset.getX() + (CARD_WIDTH / 2) * _iCardDealedToDealer,
      _oDealerCardOffset.getY()
    );
    _iCardDealedToDealer++;
    let oCard = new CCard(
      _oStartingCardOffset.getX(),
      _oStartingCardOffset.getY(),
      _oCardContainer,
      { cardOwner: 'dealer', splited: this.splitActive(), order: order },
      this
    );
    oCard.setInfo(
      pStartingPoint,
      pEndingPoint,
      dealedCard,
      dealedCardValue,
      true,
      _iCardDealedToDealer
    );
    oCard.addEventListener(
      ON_CARD_ANIMATION_ENDING,
      this.cardFromDealerArrived
    );
    _aCardsDealing.push(oCard);
    playSound('card', 1, false);
    this.repositionCards()
    this.changeState(STATE_GAME_HITTING);
  };

  this._onResetHand = function () {
    var pRemoveOffset = new CVector2(
      _oRemoveCardsOffset.getX(),
      _oRemoveCardsOffset.getY()
    );

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
    _iTimeElapsResult = 0;
    s_oGame.changeState(STATE_GAME_CLEAR_RESULT);
  }

  this._onEndHand = function () {
    _iTimeElaps = 0;
    _iTimeElapsResult = 0;
    s_oGame.changeState(STATE_GAME_SHOW_WINNER);
    playSound('fiche_collect', 1, false);
  };

  this.ficheSelected = function (iFicheValue, iFicheIndex) {
    var iCurBet = _oSeat.getCurBet();

    if (iFicheValue > _oSeat.getCredit()) {
      _oMsgBox.show(languageService.getString('textNoMoney'));
    } else if (iCurBet + iFicheValue > _iMaxBet) {
      _oMsgBox.show(
        languageService.getString('textErrorMaxBet') + ' ' + MAX_BET
      );
    } else {
      iCurBet = parseFloat((iCurBet * 1).toFixed(2))
      iCurBet += parseFloat((iFicheValue * 1).toFixed(2));
      iCurBet = Number(iCurBet.toFixed(1));

      _iGameCash += iFicheValue;

      _oSeat.changeBet(iCurBet);
      _oSeat.refreshFiches(iFicheValue, iFicheIndex, 0, 0);

      _oSeat.bet(iCurBet, false);
      _oInterface.enable(true, false, false, false, false);
      _oInterface.refreshCredit(_oSeat.getCredit());
    }
  };

  //#################################################################################################################
  /**
   * Enable or disable action buttons (hit, stand, double, split etc). Rely on global variable lastActions.
   */
  this.updateActions = function () {
    _oSeat.setPlayerHandValue(this.lastActions.handValue);
    _oSeat.refreshCardValue();
    _oInterface.displayMsg(
      languageService.getString('textDisplayMsgYourAction')
    );
    _oInterface.enable(
      false,
      this.lastActions.needRestore,
      this.lastActions.needRestore,
      this.lastActions.needDouble,
      this.lastActions.needSplit
    );
    this._checkHand();
  };
  //#################################################################################################################
  this._passTurnToDealer = function () {
    if (!_bPlayerTurn) {
      return;
    }
    _bPlayerTurn = false;
    _oInterface.disableButtons();
    _aDealerCards[1].showCard();
    playSound('card', 1, false);

    _oInterface.displayMsg(
      languageService.getString('textDisplayMsgDealerTurn')
    );
  };

  this._gameOver = function () {
    _oGameOverPanel.show();
  };

  this.onFicheSelected = function (iFicheIndex, iFicheValue) {
    this.fitchInfo = { iFicheIndex, iFicheValue }

    if (_oSeat.isWINLoseExist()) {
      this._onResetHand()
      action = 'fiche';
      return
    } else {
      this.ficheSelected(iFicheValue, iFicheIndex);
    }
  };

  this._onSetPlayerActions = function (bDeal, bHit, bStand, bDouble, bSplit) {
    _oInterface.enable(bDeal, bHit, bStand, bDouble, bSplit);
    _oSeat.refreshCardValue();
  };

  this._onSitDown = function () {
    this.changeState(STATE_GAME_WAITING_FOR_BET);
    _oInterface.enableBetFiches();
  };

  this.onDeal = async function () {

    if (_iMinBet > _oSeat.getCurBet()) {
      _oMsgBox.show(
        languageService.getString('textErrorMinBet') + ' ' + MIN_BET
      );
      s_oInterface.enableBetFiches();
      s_oInterface.enable(true, false, false, false, false);
      return;
    }

    this.changeState(STATE_GAME_DEALING);

    _oInterface.disableButtons();
    _oInterface.displayMsg(languageService.getString('textDisplayMsgDealing'));
    _oSeat.decreaseCredit(_oSeat.getCurBet());
    _oInterface.refreshCredit(_oSeat.getCredit());

    let dealResult = await serverRequests.getFirstDeal(_oSeat.getCurBet())
    firstDealData = dealResult;

    this._iDealerValueCard = dealResult.dealerHandValue;
    this.lastActions = dealResult.actions;

    this._dealing();

    this.repositionCards()
  };

  this.onHit = function (isDouble = false) {

    if (this.lastActions.needInsurance) {
      _oInterface.showInsurancePanel(this.actionHit.bind(this, isDouble));
    } else {
      this.actionHit(isDouble, false, false);
    }

    /*var pStartingPoint = new CVector2(_oStartingCardOffset.getX(), _oStartingCardOffset.getY());
 
        var pEndingPoint = new CVector2(_oSeat.getAttachCardOffset().getX(), _oSeat.getAttachCardOffset().getY());
        this.attachCardToDeal(isDouble, pStartingPoint, pEndingPoint, false, _oSeat.newCardDealed());
 
        this.changeState(STATE_GAME_HITTING);*/
  };

  this.actionHit = async function (isDouble, isInsuranceActive, isInsuranceAccepted) {
    var pStartingPoint = new CVector2(
      _oStartingCardOffset.getX(),
      _oStartingCardOffset.getY()
    );

    var pEndingPoint = new CVector2(
      _oSeat.getAttachCardOffset().getX(),
      _oSeat.getAttachCardOffset().getY()
    );

    if (this.splitActive() == true) {
      CARD_ORDER_PLAYER_SPLIT += 1
      var order = CARD_ORDER_PLAYER_SPLIT
    } else {
      CARD_ORDER_PLAYER += 1
      var order = CARD_ORDER_PLAYER
    }

    let respData = await serverRequests.getCardForPlayer(isDouble, isInsuranceActive, isInsuranceAccepted)

    this.lastActions = respData.result.actions;
    let oCard = new CCard(
      _oStartingCardOffset.getX(),
      _oStartingCardOffset.getY(),
      _oCardContainer,
      { cardOwner: 'player', splited: this.splitActive(), order: order },
      this
    );

    if (respData.result.actions.needPassTurn == true) {
      _bSplitActive = false
    }
    oCard.setInfo(
      pStartingPoint,
      pEndingPoint,
      respData.result.card,
      respData.result.cardValue,
      false,
      _oSeat.newCardDealed()
    );

    oCard.addEventListener(
      ON_CARD_ANIMATION_ENDING,
      this.cardFromDealerArrived
    );
    _aCardsDealing.push(oCard);
    playSound('card', 1, false);

    this.repositionCards()
    this.changeState(STATE_GAME_HITTING);
  };

  this.onStand = function () {
    _bSplitActive = false
    if (this.lastActions.needInsurance) {
      _oInterface.showInsurancePanel(this.actionStand.bind(this));
    } else {
      this.actionStand(false, false);
    }
  };
  //#################################################################################################################
  /**
   * Makes Stand action.
   * @param {boolean} isInsuranceActive
   * @param {boolean} isInsuranceAccepted
   */
  this.actionStand = async function (isInsuranceActive, isInsuranceAccepted) {
    let respData = await serverRequests.getStand(
      isInsuranceActive,
      isInsuranceAccepted)
    this.lastActions = respData.result;
    _oSeat.stand(this.lastActions);
  };

  //#################################################################################################################
  this.onDouble = function () {
    var iDoubleBet = _oSeat.getCurBet();

    var iCurBet = parseFloat((iDoubleBet * 1).toFixed(2));


    iCurBet += parseFloat((iDoubleBet * 1).toFixed(2));


    _oSeat.doubleAction(iCurBet);
    _oSeat.changeBet(iCurBet);

    _oSeat.decreaseCredit(iDoubleBet);

    _iGameCash += iDoubleBet;
    if (_iGameCash < iCurBet * 2) {
      _bDealerLoseInCurHand = false;
    }

    _oSeat.bet(iCurBet);
    _oInterface.refreshCredit(_oSeat.getCredit());
    this.onHit(true);

    _bDoubleForPlayer = true;
    $(s_oMain).trigger('bet_placed', iDoubleBet);
  };
  //#################################################################################################################
  this.autoFillCardArrived = function (
    oCard,
    bDealerCard,
    iCount,
    isForceHand,
    forceHandIndex
  ) {
    for (var i = 0; i < _aCardsDealing.length; i++) {
      if (_aCardsDealing[i] === oCard) {
        _aCardsDealing.splice(i, 1);
        break;
      }
    }

    if (forceHandIndex != 1) {
      oCard.card.splited = false
    }

    _oSeat.addCardToHand(oCard, isForceHand, forceHandIndex);

    if (splitData.autoFillCards.length) {
      this.autoFillSplit();
    } else {
      _oSeat.setPlayerHandValue(splitData.splitHandValue, true, 1);
      _oSeat.setPlayerHandValue(splitData.handValue, true, 0);
      _oSeat.refreshCardValue();

      this.updateActions();
    }
    this.repositionCards()
  };

  this.autoFillSplit = function () {


    let handIndex = splitData.autoFillCards.length - 1;
    let cardData = splitData.autoFillCards.shift();

    let pStartingPoint = new CVector2(
      _oStartingCardOffset.getX(),
      _oStartingCardOffset.getY()
    );
    let pEndingPoint = new CVector2(
      _oSeat.getAttachCardOffset(true, handIndex).getX(),
      _oSeat.getAttachCardOffset(true, handIndex).getY()
    );
    if (this.splitActive() == true && handIndex == 1) {
      CARD_ORDER_PLAYER_SPLIT += 1
      var order = CARD_ORDER_PLAYER_SPLIT
    } else if (this.splitActive() == true && handIndex == 0) {
      // CARD_ORDER_PLAYER -=1
      var order = CARD_ORDER_PLAYER
    } else {
      CARD_ORDER_PLAYER += 1
      var order = CARD_ORDER_PLAYER
    }



    let oCard = new CCard(
      _oStartingCardOffset.getX(),
      _oStartingCardOffset.getY(),
      _oCardContainer,
      { cardOwner: 'player', splited: this.splitActive(), order: order },
      this
    );
    oCard.setInfo(
      pStartingPoint,
      pEndingPoint,
      cardData.card,
      cardData.cardValue,
      false,
      _oSeat.newCardDealed(),
      true,
      handIndex
    );
    oCard.addEventListener(
      ON_CARD_ANIMATION_ENDING,
      this.autoFillCardArrived,
      this
    );
    _aCardsDealing.push(oCard);
    playSound('card', 1, false);
    this.repositionCards()
    this.changeState(STATE_GAME_HITTING);
  };

  this.onSplit = async function () {

    let response = await serverRequests.getSplit()

    if (_iGameCash < _oSeat.getCurBet() * 4) {
      _bDealerLoseInCurHand = false;
    }

    splitData = response;
    this.lastActions = response.actions;
    this.lastActionsUsual = response.usualActions;
    _oSeat.split();

    this.changeState(STATE_GAME_SPLIT);

    this.repositionCards()
    _oSeat.resize()
  };

  this._onSplitCardEndAnim = function () {

    var iCurBet = _oSeat.getCurBet();

    var iSplitBet = parseFloat((iCurBet * 1).toFixed(2));

    iCurBet += parseFloat((iSplitBet * 1).toFixed(2));

    _oSeat.bet(iCurBet, true);


    _bSplitActive = true;

    _oInterface.enable(false, true, true, false, false);

    _oSeat.setSplitHand();
    _oSeat.refreshCardValue();

    _oSeat.changeBet(iCurBet - iSplitBet);

    _oSeat.decreaseCredit(iSplitBet);

    _iGameCash += iSplitBet;

    _oInterface.refreshCredit(_oSeat.getCredit());

    // use splitData to deal cards to hands
    this.autoFillSplit();

    $(s_oMain).trigger('bet_placed', iSplitBet);

  };

  this.clearBets = function () {
    var iCurBet = _oSeat.getStartingBet();
    if (iCurBet > 0) {
      _oSeat.clearBet();
      _iGameCash -= iCurBet;
      _oInterface.refreshCredit(_oSeat.getCredit());
      _oInterface.enable(false, false, false, false, false);
    }
  };

  this.isRebetAvailable = function () {
    return _oSeat.isRebetAvailable();
  };

  this.rebet = async function () {
    // check is the win hand exist

    if (_oSeat.isWINLoseExist()) {
      this._onResetHand()
      action = 'rebet';
      return
    }

    this.clearBets();
    if (_oSeat.rebet(_oInterface)) {
      // _oInterface.enable(true, false, false, false, false);
      _oInterface.refreshCredit(_oSeat.getCredit());

      _iTimeElaps = BET_TIME;
      _oInterface.disableBetFiches();
      // _oInterface.enable(true, false, false, false, false);
      _oInterface.enable(false, false, false, false, false);

      let data = await serverRequests.getFirstDeal(_oSeat.getPrevBet())

      firstDealData = data;
      this._iDealerValueCard = data.dealerHandValue;
      this.lastActions = data.actions;
      this._dealing();

      this.changeState(STATE_GAME_DEALING);
      $(s_oMain).trigger('bet_placed', _oSeat.getCurBet());
    } else {
      _oInterface.disableRebet();
    }
  };

  this.onBuyInsurance = function () {
    var iCurBet = _oSeat.getCurBet();
    _iInsuranceBet = iCurBet / 2;
    iCurBet += _iInsuranceBet;
    _oSeat.insurance(iCurBet, _iInsuranceBet, _iInsuranceBet);
    _oInterface.refreshCredit(_oSeat.getCredit());
  };

  this._onCardShown = function () {
    s_oGame._checkHand();
    _oInterface.refreshDealerCardValue(s_oGame._iDealerValueCard);
  };

  this._onRemoveCard = function (oCard) {
    oCard.unload();
  };

  this.onExit = function () {
    this.unload();
    $(s_oMain).trigger('save_score', [_oSeat.getCredit()]);
    $(s_oMain).trigger('end_session');
    $(s_oMain).trigger('share_event', _oSeat.getCredit());
    s_oMain.gotoMenu();
  };

  this.getState = function () {
    return _iState;
  };

  this._updateWaitingBet = function () {
    _iTimeElaps += s_iTimeElaps;
    if (_iTimeElaps > BET_TIME) {
      _iTimeElaps = 0;

      // if (_oSeat.getCurBet() < _iMinBet) {
      //     return;
      // }
      // _oInterface.disableBetFiches();
      // _oInterface.enable(true, false, false, false, false);
      // this.changeState(STATE_GAME_DEALING);

      // $(s_oMain).trigger("bet_placed", _oSeat.getCurBet());
    } else {
      var iCountDown = Math.floor((BET_TIME - _iTimeElaps) / 1000);
      _oInterface.displayMsg(
        languageService.getString('textMinBet') +
        ':' +
        _iMinBet +
        '\n' +
        languageService.getString('textMaxBet') +
        ':' +
        _iMaxBet,
        languageService.getString('textDisplayMsgWaitingBet') + ' ' + iCountDown
      );
    }
  };

  this._updateDealing = function () {
    for (var i = 0; i < _aCardsDealing.length; i++) {
      _aCardsDealing[i].update();
    }
  };

  this._updateHitting = function () {
    for (var i = 0; i < _aCardsDealing.length; i++) {
      _aCardsDealing[i].update();
    }
  };

  this._updateSplit = function () {
    _oSeat.updateSplit();
  };

  this._updateClearResult = function () {
    _oSeat.updateFichesController(s_iTimeElaps);
    var aCards = _oSeat.getPlayerCards();
    for (var k = 0; k < aCards.length; k++) {
      aCards[k].update();
    }
    for (var j = 0; j < _aDealerCards.length; j++) {
      _aDealerCards[j].update();
    }

    _iTimeElapsResult += s_iTimeElaps;

    if (_iTimeElapsResult > TIME_END_HAND) {
      _iTimeElapsResult = 0;
      _oSeat.resetTextAndBets();
      _aDealerCards = new Array();
      _aDealerCards.splice(0);
      if (action === 'fiche') {
        this.ficheSelected(this.fitchInfo.iFicheValue, this.fitchInfo.iFicheIndex);
        this.fitchInfo = {};
      }

      if (action === 'rebet') {
        this.rebet()
      }
      action = '';
      this.changeState(STATE_GAME_DEAL_FITCH);
    }
  }

  this._updateShowWinner = function () {
    _oSeat.updateFichesController(s_iTimeElaps);
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

  this.update = function () {
    if (_bUpdate === false) {
      return;
    }

    switch (_iState) {
      case STATE_GAME_WAITING_FOR_BET: {
        this._updateWaitingBet();
        break;
      }
      case STATE_GAME_DEALING: {
        this._updateDealing();
        break;
      }
      case STATE_GAME_HITTING: {
        this._updateHitting();
        break;
      }
      case STATE_GAME_SPLIT: {
        this._updateSplit();
        break;
      }
      case STATE_GAME_SHOW_WINNER: {
        this._updateShowWinner();
        break;
      }
      case STATE_GAME_CLEAR_RESULT: {
        this._updateClearResult();
        break;
      }
    }
  };

  s_oGame = this;

  CURRENCY_DECIMAL = oData.currencyDecimals;
  TOTAL_MONEY = Number(oData.balance);
  MIN_BET = Number(oData.minBet).toFixed(CURRENCY_DECIMAL);
  MAX_BET = Number(oData.maxBet).toFixed(CURRENCY_DECIMAL);
  DECKS_USED = oData.decksUsed ? oData.decksUsed : 1;
  BET_TIME = oData.bet_time;
  _iGameCash = oData.game_cash;

  AD_SHOW_COUNTER = oData.ad_show_counter;

  this._init();
}
var s_oGame;
var s_oTweenController;