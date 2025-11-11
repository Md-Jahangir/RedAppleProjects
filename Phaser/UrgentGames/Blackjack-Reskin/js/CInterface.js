function CInterface(iMoney) {
  var _aFiches;
  var _oClearBetBut;
  var _oRebetBut;
  var _oDealBut;
  var _oHitBut;
  var _oStandBut;
  var _oDoubleBut;
  var _oSplitBut;
  var _oMoneyText;
  var _oCurDealerCardValueText;
  var config
  var _oTextLogo;
  var _oTextBelowLogo;
  var _oButSettings;
  var _oButRules;
  var _oButBack;
  var _oSettingsPanel;
  var rulesPanel;
  var _oInsurancePanel;
  var rebetBetY; 

  this._init = function (iMoney) {
    config = orientation_mode[getOrientation()].CInterface;

    // game_logo_name
    var oSprite = s_oSpriteLibrary.getSprite('game_logo_name');
    _oTextLogo = new CGfxButton(0, 0, oSprite, false);
    _oTextLogo.removeInputEnable();

    // below_game_logo_name
    var oSprite = s_oSpriteLibrary.getSprite('below_game_logo_name');
    _oTextBelowLogo = new CGfxButton(0, 0, oSprite, false);
    _oTextBelowLogo.removeInputEnable();

    // but_settings
    var oSprite = s_oSpriteLibrary.getSprite('but_settings');
    _oButSettings = new CGfxButton(0, 0, oSprite, true);
    _oButSettings.addEventListener(ON_MOUSE_UP, this._onSettingsPressed, this);

    // button-rules
    var oSprite = s_oSpriteLibrary.getSprite('button-rules');
    _oButRules = new Button(0, 0, [s_oSpriteLibrary.getSprite('button-rules'), null, null, null],
      languageService.getString('textRules'),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 30,
        fontColors: ['#8f6bc1', null, null, null],
        offset: { x: 0, y: 0 },
      }
    );
    _oButRules.addEventListener(ON_MOUSE_UP, this.onRulesPressed, this);

    // but_back
    var oSprite = s_oSpriteLibrary.getSprite('but_back');
    _oButBack = new CGfxButton(0, 0, oSprite, true);
    _oButBack.addEventListener(ON_MOUSE_UP, this._onBackPressed, this);

    // but_clear
    var oSprite = s_oSpriteLibrary.getSprite('but_clear');
    _oClearBetBut = new CGfxButton(0, 0, oSprite, true);
    _oClearBetBut.addEventListener(ON_MOUSE_UP, this._onButClearRelease, this);

    // _oCurDealerCardValueText
    _oCurDealerCardValueText = new createjs.Text('', '28px ' + FONT_RED_HAT_DISPLAY_REGULAR, '#fff');
    _oCurDealerCardValueText.shadow = new createjs.Shadow('#000000', 2, 2, 1);
    _oCurDealerCardValueText.textAlign = 'center';
    s_oGameCon.addChild(_oCurDealerCardValueText);
    // _oMoneyText
    _oMoneyText = new createjs.Text(
      languageService.getString('textBalance') + ' ' +
      languageService.serverCurrency('currencySymbol') + iMoney.toFixed(CURRENCY_DECIMAL), '36px ' + FONT_RED_HAT_DISPLAY_BOLD, '#fff');
    _oMoneyText.textAlign = 'center';
    s_oGameCon.addChild(_oMoneyText);

    // button-hit-normal
    var oSprite = s_oSpriteLibrary.getSprite('button-hit-normal');
    _oHitBut = new Button(config._oHitBut.x, config._oHitBut.y,
      [
        s_oSpriteLibrary.getSprite('button-hit-normal'),
        null,
        null,
        s_oSpriteLibrary.getSprite('button-hit-disabled'),
      ],
      languageService.getString('textHit'),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 26,
        fontColors: ['#fff', null, null, '#906bc2'],
        offset: { x: -10, y: 4 },
      }
    );

    // _oHitBut
    _oHitBut.setActivationEffect(s_oSpriteLibrary.getSprite('button-hit-glow'));
    _oHitBut.addEventListener(ON_MOUSE_UP, this._onButHitRelease, this);

    // _oStandBut
    _oStandBut = new Button(config._oStandBut.x, config._oStandBut.y,
      [
        s_oSpriteLibrary.getSprite('button-stand-normal'),
        null,
        null,
        s_oSpriteLibrary.getSprite('button-stand-disabled'),
      ],
      languageService.getString('textStand'),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 26,
        fontColors: ['#fff', null, null, '#906bc2'],
        offset: { x: 20, y: 4 },
      }
    );
    _oStandBut.setActivationEffect(s_oSpriteLibrary.getSprite('button-stand-glow'));
    _oStandBut.addEventListener(ON_MOUSE_UP, this._onButStandRelease, this);

    // _oRebetBut
    _oRebetBut = new Button(config._oRebetBut.x, config._oRebetBut.y,
      [
        s_oSpriteLibrary.getSprite('button-rebet-normal'),
        null,
        null,
        s_oSpriteLibrary.getSprite('button-rebet-disabled'),
      ],
      languageService.getString('textRebet'),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 20,
        fontColors: ['#fff', null, null, '#906bc2'],
        offset: { x: 0, y: 20 },
      }
    );
    _oRebetBut.setActivationEffect(s_oSpriteLibrary.getSprite('button-rebet-glow'));
    _oRebetBut.addEventListener(ON_MOUSE_UP, this._onButRebetRelease, this);

    // _oDoubleBut
    var oSprite = s_oSpriteLibrary.getSprite('but_deal_bg');
    _oDoubleBut = new Button(config._oDoubleBut.x, config._oDoubleBut.y,
      [
        s_oSpriteLibrary.getSprite('button-bottom-normal'),
        null,
        null,
        s_oSpriteLibrary.getSprite('button-bottom-disabled'),
      ],
      languageService.getString('textDouble'),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 20,
        fontColors: ['#fff', null, null, '#906bc2'],
        offset: { x: 0, y: 2 },
      }
    );
    _oDoubleBut.setActivationEffect(s_oSpriteLibrary.getSprite('button-bottom-glow'));
    _oDoubleBut.addEventListener(ON_MOUSE_UP, this._onButDoubleRelease, this);

    // _oDealBut
    _oDealBut = new Button(config._oDealBut.x, config._oDealBut.y,
      [
        s_oSpriteLibrary.getSprite('button-bottom-normal'),
        null,
        null,
        s_oSpriteLibrary.getSprite('button-bottom-disabled'),
      ],
      languageService.getString('textDeal'),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 20,
        fontColors: ['#fff', null, null, '#906bc2'],
        offset: { x: 0, y: 2 },
      }
    );
    _oDealBut.addEventListener(ON_MOUSE_UP, this._onButDealRelease, this);

    //_oSplitBut
    _oSplitBut = new Button(config._oSplitBut.x, config._oSplitBut.y,
      [
        s_oSpriteLibrary.getSprite('button-bottom-normal'),
        null,
        null,
        s_oSpriteLibrary.getSprite('button-bottom-disabled'),
      ],
      languageService.getString('textSplit'),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 20,
        fontColors: ['#fff', null, null, '#906bc2'],
        offset: { x: 0, y: 2 },
      }
    );
    _oSplitBut.setActivationEffect(s_oSpriteLibrary.getSprite('button-bottom-glow'));
    _oSplitBut.addEventListener(ON_MOUSE_UP, this._onButSplitRelease, this);

    // _aFiches
    _aFiches = new Array();
    for (var i = 0; i < NUM_FICHES; i++) {
      var aFichesValues = s_oGameSettings.getFichesValues();
      oSprite = s_oSpriteLibrary.getSprite('fiche_' + i);
      _aFiches[i] = new ChipButton(
        config._aFichesPositions[i].x,
        config._aFichesPositions[i].y,
        oSprite,
        s_oSpriteLibrary.getSprite('chip_disabled_' + i),
        s_oGameCon
      );
      _aFiches[i].addEventListenerWithParams(ON_MOUSE_UP, this._onFicheClicked, this, [aFichesValues[i], i]);
    }
    this.disableButtons();

    // _oInsurancePanel
    _oInsurancePanel = new CInsurancePanel();

    // _oSettingsPanel
    _oSettingsPanel = new CSettingsPanel(s_oGameCon);

    // rulesPanel
    rulesPanel = new RulesPanel(s_oGameCon);


    // RESIZE
    window.addEventListener('resize', this.resize);
    this.resize();
  };

  this.resize = function () {
    // RESIZE 
    _oSettingsPanel.resize();
    rulesPanel.resize();
    _oInsurancePanel.resize()

    config = orientation_mode[getOrientation()].CInterface;

    //game_logo_name
    _oTextLogo.setScale(GAME_SCALE * config._oTextLogo.scale);
    _oTextLogo.setPosition(NEW_WIDTH / 2, NEW_HEIGHT * config._oTextLogo.stepY);

    // below_game_logo_name
    if (getOrientation() == 'orientation_portrait') {
      _oTextBelowLogo.setScale(GAME_SCALE * config._oTextBelowLogo.scale);
      adjustTextBelowLogo = orientation_mode[getOrientation()][`${window.innerWidth}*${window.innerHeight}`]?._oTextBelowLogo;
      _oTextBelowLogo.setPosition(NEW_WIDTH / 2, NEW_HEIGHT / 2 * (adjustTextBelowLogo ? adjustTextBelowLogo.y: 0.86));
    } else {
      _oTextBelowLogo.setScale(GAME_SCALE * config._oTextBelowLogo.scale);
      _oTextBelowLogo.setPosition(NEW_WIDTH / 2, NEW_HEIGHT / 2 - config._oTextBelowLogo.stepY * GAME_SCALE);
    }
    // but_settings
    _oButSettings.setScale(GAME_SCALE * config._oButSettings.scale);
    _oButSettings.setPosition(NEW_WIDTH * 0.9, NEW_HEIGHT * config._oButSettings.stepY);

    // button-rules
    _oButRules.setScale(GAME_SCALE * config._oButRules.scale);
    _oButRules.setPosition(_oButSettings.getX() + config._oButRules.stepX * GAME_SCALE, NEW_HEIGHT * config._oButRules.stepY);
    _oButRules.setVisible(config._oButRules.visible);

    // but_back
    _oButBack.setScale(GAME_SCALE * config._oButBack.scale);
    _oButBack.setPosition(NEW_WIDTH * 0.1, NEW_HEIGHT * config._oButBack.stepY);

    // _oCurDealerCardValueText
    _oCurDealerCardValueText.scaleX = GAME_SCALE * config._oCurDealerCardValueText.scale;
    _oCurDealerCardValueText.scaleY = GAME_SCALE * config._oCurDealerCardValueText.scale;
    _oCurDealerCardValueText.x = NEW_WIDTH / 2 + config._oCurDealerCardValueText.x * GAME_SCALE
    

    if (getOrientation() == 'orientation_portrait') {
      adjustDealerCardValueText = orientation_mode[getOrientation()][`${window.innerWidth}*${window.innerHeight}`]?._oCurDealerCardValueText;
      _oCurDealerCardValueText.y = NEW_HEIGHT / 2 + config._oCurDealerCardValueText.y * GAME_SCALE + + (adjustDealerCardValueText ? adjustDealerCardValueText.y : 0)
    } else {
      _oCurDealerCardValueText.y = NEW_HEIGHT / 2 + config._oCurDealerCardValueText.y * GAME_SCALE
    }

    // _oRebetBut 
    _oRebetBut.setScale(GAME_SCALE * config._oRebetBut.scale);
    _oRebetBut.setPosition(NEW_WIDTH * config._oRebetBut.widthPercentage, NEW_HEIGHT * config._oRebetBut.heightPercentage);

    if (getOrientation() === 'orientation_portrait') {
      adjustRebetBut = orientation_mode[getOrientation()][`${window.innerWidth}*${window.innerHeight}`]?._oRebetBut;
      _oRebetBut.setPosition(_oRebetBut.getX(), NEW_HEIGHT * (adjustRebetBut ? adjustRebetBut.heightPercentage : config._oRebetBut.heightPercentage) + (adjustRebetBut ? adjustRebetBut.y : 0.35));
      
      rebetBetY = _oRebetBut.getY() - (adjustRebetBut ? adjustRebetBut.y: 0.35);
    } else {
      rebetBetY = _oRebetBut.getY();
    }

    // _oHitBut
    _oHitBut.setScale(GAME_SCALE * config._oHitBut.scale);
    _oHitBut.setPosition(
      _oRebetBut.getX() + config._oHitBut.x * GAME_SCALE,
      rebetBetY
    );

    // _oStandBut 
    _oStandBut.setScale(GAME_SCALE * config._oStandBut.scale);
    _oStandBut.setPosition(
      _oRebetBut.getX() + config._oStandBut.x * GAME_SCALE,
      rebetBetY
    );

    // _oDealBut
    _oDealBut.setScale(GAME_SCALE * config._oDealBut.scale);
    _oDealBut.setPosition(
      _oRebetBut.getX(),
      rebetBetY + config._oDealBut.y * GAME_SCALE
    );

    // _oDoubleBut
    _oDoubleBut.setScale(GAME_SCALE * config._oDoubleBut.scale);
    _oDoubleBut.setPosition(
      _oDealBut.getX() + config._oDoubleBut.x * GAME_SCALE,
      rebetBetY + config._oDoubleBut.y * GAME_SCALE
    );

    // _oSplitBut
    _oSplitBut.setScale(GAME_SCALE * config._oSplitBut.scale);
    _oSplitBut.setPosition(
      _oDealBut.getX() + config._oSplitBut.x * GAME_SCALE,
      rebetBetY + config._oSplitBut.y * GAME_SCALE
    );

    // but_clear
    _oClearBetBut.setScale(GAME_SCALE * config._oClearBetBut.scale);
    if (getOrientation() === 'orientation_portrait') {
      adjustClearBet = orientation_mode[getOrientation()][`${window.innerWidth}*${window.innerHeight}`]?._oClearBetBut;
      _oClearBetBut.setPosition(
        NEW_WIDTH * config._oClearBetBut.widthPercentage,
        NEW_HEIGHT * config._oClearBetBut.heightPercentage + (adjustClearBet ? adjustClearBet.y : 0)
      );
    } else {
      _oClearBetBut.setPosition(
        NEW_WIDTH * config._oClearBetBut.widthPercentage,
        NEW_HEIGHT * config._oClearBetBut.heightPercentage
      );
  
    }
   
    // _oMoneyText
    _oMoneyText.scaleX = GAME_SCALE * config._oMoneyText.scale;
    _oMoneyText.scaleY = GAME_SCALE * config._oMoneyText.scale;
    _oMoneyText.x = _oClearBetBut.getX() + config._oMoneyText.x * GAME_SCALE;
    _oMoneyText.y = _oClearBetBut.getY() + config._oMoneyText.y * GAME_SCALE;
    if (getOrientation() === 'orientation_portrait') {
      _oMoneyText.x = NEW_WIDTH / 2;
      adjustMoneyText = orientation_mode[getOrientation()][`${window.innerWidth}*${window.innerHeight}`]?._oMoneyText;
      _oMoneyText.y = rebetBetY + config._oMoneyText.y * GAME_SCALE - (adjustMoneyText ? adjustMoneyText.y : 0);
    }

    // _aFiches
    for (var i = 0; i < NUM_FICHES; i++) {
      _aFiches[i].setScale(GAME_SCALE * config._aFiches.scale);
      _aFiches[i].imgDisabled.scaleX = GAME_SCALE * config._aFiches.scale;
      _aFiches[i].imgDisabled.scaleY = GAME_SCALE * config._aFiches.scale;
      if (getOrientation() == 'orientation_portrait') {
        adjustFichesText = orientation_mode[getOrientation()][`${window.innerWidth}*${window.innerHeight}`]?._aFichesText;
        _aFiches[i].setPosition(
          _oClearBetBut.getX() + config._aFichesPositions[i].x * GAME_SCALE,
          NEW_HEIGHT * 0.94 + (adjustFichesText ? adjustFichesText.y : 0)
        );
      } else {
        _aFiches[i].setPosition(
          _oClearBetBut.getX() + config._aFichesPositions[i].x * GAME_SCALE,
          NEW_HEIGHT * 0.96
        );
      }
     
    }
  }

  this.unload = function () {
    s_oGameCon.removeChild(_oMoneyText);
    s_oInterface = null;
  };

  this.setPositionOfObjects = function (_refObject, _posX, _posY) {
    _refObject.x = _posX;
    _refObject.y = _posY;
  };

  this.reset = function () {
    this.disableButtons();
  };

  this.enableBetFiches = function () {
    for (var i = 0; i < NUM_FICHES; i++) {
      _aFiches[i].enable();
    }
    _oClearBetBut.enable();
    if (s_oGame.isRebetAvailable()) {
      _oRebetBut.enable();
    } else {
      _oRebetBut.disable();
    }
  };

  this.disableBetFiches = function () {
    for (var i = 0; i < NUM_FICHES; i++) {
      _aFiches[i].disable();
    }
    _oClearBetBut.disable();
    _oRebetBut.disable();
  };

  this.disableRebet = function () {
    _oRebetBut.disable();
  };


  this.disableButtons = function () {
    _oDealBut.disable();
    _oHitBut.disable();
    _oStandBut.disable();
    _oDoubleBut.disable();
    _oSplitBut.disable();
  };

  this.enable = function (bDealBut, bHit, bStand, bDouble, bSplit) {
    if (bDealBut) {
      _oDealBut.enable();
    } else {
      _oDealBut.disable();
    }

    if (bHit) {
      _oHitBut.enable();
    } else {
      _oHitBut.disable();
    }

    if (bStand) {
      _oStandBut.enable();
    } else {
      _oStandBut.disable();
    }

    if (bDouble) {
      _oDoubleBut.enable();
    } else {
      _oDoubleBut.disable();
    }

    if (bSplit) {
      _oSplitBut.enable();
    } else {
      _oSplitBut.disable();
    }
  };

  this.refreshCredit = function (iMoney) {

    _oMoneyText.text =
      languageService.getString('textBalance') +
      ' ' +
      languageService.serverCurrency('currencySymbol') +
      parseFloat(iMoney).toFixed(CURRENCY_DECIMAL);
  };

  this.refreshDealerCardValue = function (iDealerValue) {
    _oCurDealerCardValueText.text = '' + iDealerValue;
  };

  this.displayMsg = function (szMsg, szMsgBig) { };

  /**
   * Shows Insurance panel.
   * @public
   * @param {function} callback - callback wich will be called with panel results.
   * @param {object} callbackContext - context for callback.
   */
  this.showInsurancePanel = function (callback) {
    _oInsurancePanel.show(languageService.getString('textInsurance'), callback);
  };

  this.clearDealerText = function () {
    _oCurDealerCardValueText.text = '';
  };

  this._onFicheClicked = function (aParams) {
    s_oGame.onFicheSelected(aParams[1], aParams[0]);
  };

  this._onButClearRelease = function () {
    s_oGame.clearBets();
  };

  this._onButRebetRelease = function () {
    this.disableButtons();
    s_oGame.rebet();
  };

  this._onButHitRelease = function () {
    this.disableButtons();
    s_oGame.onHit();
  };

  this._onButStandRelease = function () {

    this.disableButtons();
    s_oGame.onStand();
  };

  this._onButDealRelease = function () {
    this.disableBetFiches();
    this.disableButtons();
    s_oGame.onDeal();
  };

  this._onButDoubleRelease = function () {
    this.disableButtons();
    s_oGame.onDouble();
  };

  this._onButSplitRelease = function () {

    this.disableButtons();
    s_oGame.onSplit();


  };

  this._onSettingsPressed = function () {
    _oSettingsPanel.show();
  };

  this.onRulesPressed = function () {
    rulesPanel.show();
  };

  this._onBackPressed = function () {
    s_oGame.onExit();
  };


  s_oInterface = this;

  this._init(iMoney);

  return this;
  var _aFiches;
  var _oClearBetBut;
  var _oRebetBut;
  var _oDealBut;
  var _oHitBut;
  var _oStandBut;
  var _oDoubleBut;
  var _oSplitBut;
  var _oMoneyText;
  var _oCurDealerCardValueText;
  var _pStartPosExit;
  var _oButExit;
  var _oTextLogo;
  var _pStartPosTextLogo;
  var _oTextBelowLogo;
  var _pStartPosTextBelowLogo;
  var _oButSettings;
  var _oButRules;
  var _pStartPosSettings;
  var _oButBack;
  var _pStartPosBack;
  var _oSettingsPanel;
  var rulesPanel;
  var _pStartPosClearBut;
  var _pStartPosRebetBut;
  var _pFichesPos;
  var _pMoneyTextPos;
  var _pDealbutPos;
  var _pStandHitButClickAreaPos;
  var _oInsurancePanel;

  this._init = function (iMoney) {
    var oSprite = s_oSpriteLibrary.getSprite('game_logo_name');
    _pStartPosTextLogo = { x: Math.round(CANVAS_WIDTH / 2), y: (Math.round(CANVAS_HEIGHT / 16)) };
    // _pStartPosTextLogo = { x: Math.round(CANVAS_WIDTH / 2), y: (Math.round(CANVAS_HEIGHT / 22)) };
    _oTextLogo = new CGfxButton(_pStartPosTextLogo.x, _pStartPosTextLogo.y, oSprite, false);
    _oTextLogo.removeInputEnable();

    var oSprite = s_oSpriteLibrary.getSprite('below_game_logo_name');
    // _pStartPosTextBelowLogo = { x: Math.round(CANVAS_WIDTH / 2), y: (Math.round(CANVAS_HEIGHT / 10)) };
    _pStartPosTextBelowLogo = { x: Math.round(CANVAS_WIDTH / 2), y: (Math.round(CANVAS_HEIGHT / 2.06)) };
    _oTextBelowLogo = new CGfxButton(_pStartPosTextBelowLogo.x, _pStartPosTextBelowLogo.y, oSprite, false);
    _oTextBelowLogo.removeInputEnable();

    var oSprite = s_oSpriteLibrary.getSprite('home_icon');
    _pStartPosExit = { x: CANVAS_WIDTH - 60, y: (Math.round(CANVAS_HEIGHT / 15)) };
    _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
    _oButExit.addEventListener(ON_MOUSE_UP, this.gameExit, this);

    var oSprite = s_oSpriteLibrary.getSprite('but_settings');
    _pStartPosSettings = { x: Math.round(CANVAS_WIDTH - 140), y: (Math.round(CANVAS_HEIGHT / 15)) };
    _oButSettings = new CGfxButton(_pStartPosSettings.x, _pStartPosSettings.y, oSprite, true);
    _oButSettings.addEventListener(ON_MOUSE_UP, this._onSettingsPressed, this);

    var oSprite = s_oSpriteLibrary.getSprite('button-rules');
    _pStartPosRules = { x: CANVAS_WIDTH - 300, y: (Math.round(CANVAS_HEIGHT / 15) - 2) };
    _oButRules = new Button(
      _pStartPosRules.x,
      _pStartPosRules.y,
      [s_oSpriteLibrary.getSprite('button-rules'), null, null, null],
      languageService.getString("textRules"),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 30,
        fontColors: ["#8f6bc1", null, null, null],
        offset: { x: 0, y: 0 }
      }
    );
    _oButRules.addEventListener(ON_MOUSE_UP, this.onRulesPressed, this);

    var oSprite = s_oSpriteLibrary.getSprite('but_back');
    _pStartPosBack = { x: (oSprite.width * 2), y: (Math.round(CANVAS_HEIGHT / 15)) };
    _oButBack = new CGfxButton(_pStartPosBack.x, _pStartPosBack.y, oSprite, true);
    _oButBack.addEventListener(ON_MOUSE_UP, this._onBackPressed, this);

    var oSprite = s_oSpriteLibrary.getSprite('but_clear');
    // _pStartPosClearBut = { x: 295, y: CANVAS_HEIGHT - 60 };
    _pStartPosClearBut = { x: 295, y: CANVAS_HEIGHT - 45 };
    _oClearBetBut = new CGfxButton(_pStartPosClearBut.x, _pStartPosClearBut.y, oSprite, true);
    _oClearBetBut.addEventListener(ON_MOUSE_UP, this._onButClearRelease, this);

    _oCurDealerCardValueText = new createjs.Text("", "28px " + FONT_RED_HAT_DISPLAY_REGULAR, "#fff");
    _oCurDealerCardValueText.shadow = new createjs.Shadow("#000000", 2, 2, 1);
    _oCurDealerCardValueText.x = 960;
    // _oCurDealerCardValueText.y = 450;
    // _oCurDealerCardValueText.y = 470;
    _oCurDealerCardValueText.y = 460;
    _oCurDealerCardValueText.textAlign = "center";
    s_oStage.addChild(_oCurDealerCardValueText);

    _oMoneyText = new createjs.Text(languageService.getString("textBalance") + " " + languageService.serverCurrency("currencySymbol") + iMoney.toFixed(CURRENCY_DECIMAL), "36px " + FONT_RED_HAT_DISPLAY_BOLD, "#fff");
    // _pMoneyTextPos = { x: 540, y: CANVAS_HEIGHT - 140 }
    _pMoneyTextPos = { x: 540, y: CANVAS_HEIGHT - 125 }
    _oMoneyText.x = _pMoneyTextPos.x;
    _oMoneyText.y = _pMoneyTextPos.y;
    _oMoneyText.textAlign = "center";
    s_oStage.addChild(_oMoneyText);

    _pStandHitButClickAreaPos = { x: 1245, y: CANVAS_HEIGHT - 135 };

    var oSprite = s_oSpriteLibrary.getSprite('button-hit-normal');

    _oHitBut = new Button(
      _pStandHitButClickAreaPos.x,
      _pStandHitButClickAreaPos.y,
      [s_oSpriteLibrary.getSprite('button-hit-normal'), null, null, s_oSpriteLibrary.getSprite('button-hit-disabled')],
      languageService.getString("textHit"),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 26,
        fontColors: ["#fff", null, null, "#906bc2"],
        offset: { x: -10, y: 4 }
      }
    );
    _oHitBut.setActivationEffect(s_oSpriteLibrary.getSprite('button-hit-glow'));
    _oHitBut.addEventListener(ON_MOUSE_UP, this._onButHitRelease, this);

    _oStandBut = new Button(
      _pStandHitButClickAreaPos.x + 280,
      _pStandHitButClickAreaPos.y,
      [s_oSpriteLibrary.getSprite('button-stand-normal'), null, null, s_oSpriteLibrary.getSprite('button-stand-disabled')],
      languageService.getString("textStand"),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 26,
        fontColors: ["#fff", null, null, "#906bc2"],
        offset: { x: 20, y: 4 }
      }
    );
    _oStandBut.setActivationEffect(s_oSpriteLibrary.getSprite('button-stand-glow'));
    _oStandBut.addEventListener(ON_MOUSE_UP, this._onButStandRelease, this);

    _pStartPosRebetBut = { x: 1388, y: CANVAS_HEIGHT - 134 };
    _oRebetBut = new Button(
      _pStartPosRebetBut.x,
      _pStartPosRebetBut.y,
      [s_oSpriteLibrary.getSprite('button-rebet-normal'), null, null, s_oSpriteLibrary.getSprite('button-rebet-disabled')],
      languageService.getString("textRebet"),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 20,
        fontColors: ["#fff", null, null, "#906bc2"],
        offset: { x: 0, y: 20 }
      }
    );
    _oRebetBut.setActivationEffect(s_oSpriteLibrary.getSprite('button-rebet-glow'));
    _oRebetBut.addEventListener(ON_MOUSE_UP, this._onButRebetRelease, this);

    _pDealbutPos = { x: 1190, y: CANVAS_HEIGHT - 45 };
    var oSprite = s_oSpriteLibrary.getSprite('but_deal_bg');

    _oDoubleBut = new Button(
      _pDealbutPos.x,
      _pDealbutPos.y,
      [s_oSpriteLibrary.getSprite('button-bottom-normal'), null, null, s_oSpriteLibrary.getSprite('button-bottom-disabled')],
      languageService.getString("textDouble"),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 20,
        fontColors: ["#fff", null, null, "#906bc2"],
        offset: { x: 0, y: 2 }
      }
    );
    _oDoubleBut.setActivationEffect(s_oSpriteLibrary.getSprite('button-bottom-glow'));
    _oDoubleBut.addEventListener(ON_MOUSE_UP, this._onButDoubleRelease, this);

    _oDealBut = new Button(
      _pDealbutPos.x,
      _pDealbutPos.y,
      [s_oSpriteLibrary.getSprite('button-bottom-normal'), null, null, s_oSpriteLibrary.getSprite('button-bottom-disabled')],
      languageService.getString("textDeal"),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 20,
        fontColors: ["#fff", null, null, "#906bc2"],
        offset: { x: 0, y: 2 }
      }
    );
    _oDealBut.setActivationEffect(s_oSpriteLibrary.getSprite('button-bottom-glow'));
    _oDealBut.addEventListener(ON_MOUSE_UP, this._onButDealRelease, this);

    _oSplitBut = new Button(
      _pDealbutPos.x + 390,
      _pDealbutPos.y,
      [s_oSpriteLibrary.getSprite('button-bottom-normal'), null, null, s_oSpriteLibrary.getSprite('button-bottom-disabled')],
      languageService.getString("textSplit"),
      {
        font: FONT_RED_HAT_DISPLAY_REGULAR,
        fontSize: 20,
        fontColors: ["#fff", null, null, "#906bc2"],
        offset: { x: 0, y: 2 }
      }
    );
    _oSplitBut.setActivationEffect(s_oSpriteLibrary.getSprite('button-bottom-glow'));
    _oSplitBut.addEventListener(ON_MOUSE_UP, this._onButSplitRelease, this);

    //SET FICHES BUTTON
    // _pFichesPos = [{ x: 387, y: 1020 }, { x: 462, y: 1020 }, { x: 537, y: 1020 }, { x: 612, y: 1020 }, { x: 687, y: 1020 }, { x: 762, y: 1020 }];
    _pFichesPos = [{ x: 387, y: 1035 }, { x: 462, y: 1035 }, { x: 537, y: 1035 }, { x: 612, y: 1035 }, { x: 687, y: 1035 }, { x: 762, y: 1035 }];
    _aFiches = new Array();
    for (var i = 0; i < NUM_FICHES; i++) {
      var aFichesValues = s_oGameSettings.getFichesValues();
      oSprite = s_oSpriteLibrary.getSprite('fiche_' + i);
      //_aFiches[i] = new CGfxButton(_pFichesPos[i].x, _pFichesPos[i].y, oSprite, s_oStage);
      _aFiches[i] = new ChipButton(_pFichesPos[i].x, _pFichesPos[i].y, oSprite, s_oSpriteLibrary.getSprite('chip_disabled_' + i), s_oStage);
      _aFiches[i].addEventListenerWithParams(ON_MOUSE_UP, this._onFicheClicked, this, [aFichesValues[i], i]);
    }

    _oInsurancePanel = new CInsurancePanel();

    FICHE_WIDTH = oSprite.width;

    this.disableButtons();

    _oSettingsPanel = new CSettingsPanel(s_oStage);
    rulesPanel = new RulesPanel(s_oStage);

    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };

  this.gameExit = function () {
    window.top.location = window.location;
    _oButExit.unload();
    window.location.href = window.location.href;
  }

  this.unload = function () {
    s_oStage.removeChild(_oMoneyText);
    s_oInterface = null;
  };

  this.refreshButtonPos = function (iNewX, iNewY) {
    _oSettingsPanel.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    rulesPanel.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    _oButSettings.setPosition(_pStartPosSettings.x - iNewX, iNewY + _pStartPosSettings.y);
    _oButExit.setPosition(_pStartPosExit.x - iNewX, _pStartPosExit.y + iNewY);
    _oButRules.setPosition(_pStartPosRules.x - iNewX, iNewY + _pStartPosRules.y);
    _oButBack.setPosition(_pStartPosBack.x + iNewX, iNewY + _pStartPosBack.y);
    _oTextLogo.setPosition(_pStartPosTextLogo.x, iNewY + _pStartPosTextLogo.y);
    // _oTextBelowLogo.setPosition(_pStartPosTextBelowLogo.x, iNewY + _pStartPosTextBelowLogo.y);
    _oTextBelowLogo.setPosition(_pStartPosTextBelowLogo.x, _pStartPosTextBelowLogo.y);
    _oClearBetBut.setPosition(_pStartPosClearBut.x, _pStartPosClearBut.y - iNewY);
    _oRebetBut.setPosition(_pStartPosRebetBut.x, _pStartPosRebetBut.y - iNewY);
    _oDoubleBut.setPosition(_pDealbutPos.x, _pDealbutPos.y - iNewY);
    _oDealBut.setPosition(_pDealbutPos.x + 195, _pDealbutPos.y - iNewY);
    _oSplitBut.setPosition(_pDealbutPos.x + 390, _pDealbutPos.y - iNewY);
    _oHitBut.setPosition(_pStandHitButClickAreaPos.x, _pStandHitButClickAreaPos.y - iNewY);
    _oStandBut.setPosition(_pStandHitButClickAreaPos.x + 280, _pStandHitButClickAreaPos.y - iNewY);

    for (var i = 0; i < NUM_FICHES; i++) {
      _aFiches[i].setPosition(_pFichesPos[i].x, _pFichesPos[i].y - iNewY);
    }
    this.setPositionOfObjects(_oMoneyText, _pMoneyTextPos.x, _pMoneyTextPos.y - iNewY);
    //this.setPositionOfObjects(_oHitStandBase, _pHitStandBasePos.x, _pHitStandBasePos.y - iNewY);

    s_oGame.refreshPos(s_iOffsetX, s_iOffsetY);
  };

  this.setPositionOfObjects = function (_refObject, _posX, _posY) {
    _refObject.x = _posX;
    _refObject.y = _posY;
  };

  this.reset = function () {
    this.disableButtons();
  };

  this.enableBetFiches = function () {
    for (var i = 0; i < NUM_FICHES; i++) {
      _aFiches[i].enable();
    }
    _oClearBetBut.enable();
    if (s_oGame.isRebetAvailable()) {
      _oRebetBut.enable();
    } else {
      _oRebetBut.disable();
    }
  };

  this.disableBetFiches = function () {
    for (var i = 0; i < NUM_FICHES; i++) {
      _aFiches[i].disable();
    }
    _oClearBetBut.disable();
    _oRebetBut.disable();
  };

  this.disableRebet = function () {
    _oRebetBut.disable();
  };

  this.disableButtons = function () {
    _oDealBut.disable();
    _oHitBut.disable();
    _oStandBut.disable();
    _oDoubleBut.disable();
    _oSplitBut.disable();
    //_oDealBut.disableButtonBg();
    //_oDoubleBut.disableButtonBg();
    //_oSplitBut.disableButtonBg();

    //_oHitBut.disableHitStnadText();
    //_oStandBut.disableHitStnadText();
  };

  this.enable = function (bDealBut, bHit, bStand, bDouble, bSplit) {
    if (bDealBut) {
      _oDealBut.enable();
      //_oDealBut.enableButtonBg();
    } else {
      _oDealBut.disable();
      //_oDealBut.disableButtonBg();
    }

    if (bHit) {
      _oHitBut.enable();
      //_oHitBut.enableHitStnadText();
    } else {
      _oHitBut.disable();
      //_oHitBut.disableHitStnadText();
    }

    if (bStand) {
      _oStandBut.enable();
      //_oStandBut.enableHitStnadText();
    } else {
      _oStandBut.disable();
      //_oStandBut.disableHitStnadText();
    }

    if (bDouble) {
      _oDoubleBut.enable();
      //_oDoubleBut.enableButtonBg();
    } else {
      _oDoubleBut.disable();
      //_oDoubleBut.disableButtonBg();
    }

    if (bSplit) {
      _oSplitBut.enable();
      //_oSplitBut.enableButtonBg();
    } else {
      _oSplitBut.disable();
      //_oSplitBut.disableButtonBg();
    }
  };

  this.refreshCredit = function (iMoney) {
    _oMoneyText.text = languageService.getString("textBalance") + " " + languageService.serverCurrency("currencySymbol") + parseFloat(iMoney).toFixed(CURRENCY_DECIMAL);
  };

  this.refreshDealerCardValue = function (iDealerValue) {
    _oCurDealerCardValueText.text = "" + iDealerValue;
  };

  this.displayMsg = function (szMsg, szMsgBig) { };

  /**
   * Shows Insurance panel.
   * @public
   * @param {function} callback - callback wich will be called with panel results.
   * @param {object} callbackContext - context for callback.
   */
  this.showInsurancePanel = function (callback) {
    _oInsurancePanel.show(languageService.getString("textInsurance"), callback);
  };

  this.clearDealerText = function () {
    _oCurDealerCardValueText.text = "";
  };

  this._onFicheClicked = function (aParams) {
    s_oGame.onFicheSelected(aParams[1], aParams[0]);
  };

  this._onButClearRelease = function () {
    s_oGame.clearBets();
  };

  this._onButRebetRelease = function () {
    this.disableButtons(); //
    s_oGame.rebet();
  };

  this._onButHitRelease = function () {
    this.disableButtons();
    s_oGame.onHit();
  };

  this._onButStandRelease = function () {
    this.disableButtons();
    s_oGame.onStand();
  };

  this._onButDealRelease = function () {
    this.disableBetFiches();
    this.disableButtons();
    s_oGame.onDeal();
  };

  this._onButDoubleRelease = function () {
    this.disableButtons();
    s_oGame.onDouble();
  };

  this._onButSplitRelease = function () {
    this.disableButtons();
    s_oGame.onSplit();
  };

  this._onSettingsPressed = function () {
    _oSettingsPanel.show();
  };

  this.onRulesPressed = function () {
    rulesPanel.show();
  };

  this._onBackPressed = function () {
    s_oGame.onExit();
  };

  s_oInterface = this;

  this._init(iMoney);

  return this;
}

var s_oInterface = null;