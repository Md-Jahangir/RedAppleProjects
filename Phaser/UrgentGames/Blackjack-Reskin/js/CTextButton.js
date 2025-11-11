function CTextButton(
  iXPos,
  iYPos,
  oSprite,
  szText,
  szFont,
  szColor,
  iFontSize,
  oContainer
) {
  var _bDisable;
  var _iWidth;
  var _iHeight;
  var _aCbCompleted;
  var _aCbOwner;
  var _oButton;
  var _oButtonBg;
  var _oTextBack;
  var _oText;
  var _oContainer;

  this._init = function (
    iXPos,
    iYPos,
    oSprite,
    szText,
    szFont,
    szColor,
    iFontSize,
    oContainer
  ) {
    _bDisable = false;
    _aCbCompleted = new Array();
    _aCbOwner = new Array();
    _oContainer = oContainer;

    _oButtonBg = createBitmap(oSprite);
    _iWidth = oSprite.width;
    _iHeight = oSprite.height;
    var iStepShadow = Math.ceil(iFontSize / 20);

    _oTextBack = new createjs.Text(
      szText,
      iFontSize + 'px ' + szFont,
      '#000000'
    );
    var oBounds = _oTextBack.getBounds();
    _oTextBack.textAlign = 'center';
    _oTextBack.textBaseline = 'alphabetic';
    _oTextBack.x = oSprite.width / 2 + iStepShadow;
    _oTextBack.y =
      Math.floor(oSprite.height / 2) + oBounds.height / 3 + iStepShadow + 1;

    _oText = new createjs.Text(szText, iFontSize + 'px ' + szFont, szColor);
    _oText.textAlign = 'center';
    _oText.textBaseline = 'alphabetic';
    _oText.x = oSprite.width / 2 + 2;
    _oText.y = Math.floor(oSprite.height / 2) + oBounds.height / 3 + 2;

    _oButton = new createjs.Container();
    _oButton.x = iXPos;
    _oButton.y = iYPos;
    _oButton.regX = oSprite.width / 2;
    _oButton.regY = oSprite.height / 2;
    _oButton.addChild(_oButtonBg, _oTextBack, _oText);
    _oButton.cursor = 'pointer';
    _oContainer.addChild(_oButton);

    this._initListener();
  };

  this.unload = function () {
    _oButton.off('mousedown');
    _oButton.off('pressup');

    _oContainer.removeChild(_oButton);
  };

  this.setVisible = function (bVisible) {
    _oButton.visible = bVisible;
  };

  this.enable = function () {
    _bDisable = false;
    _oText.color = '#906bc2';
  };

  this.disable = function () {
    _bDisable = true;
    _oText.color = '#906bc2';
  };

  this._initListener = function () {
    oParent = this;

    _oButton.on('mousedown', this.buttonDown);
    _oButton.on('pressup', this.buttonRelease);
  };

  this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
    _aCbCompleted[iEvent] = cbCompleted;
    _aCbOwner[iEvent] = cbOwner;
  };
  //#####################################################################################################################################
  /**
   * Plays attention animation so player will take a look at this button. Used to show available actions
   * @public
   */
  this.playAttention = function () {};

  this.buttonRelease = function () {
    if (_bDisable) {
      return;
    }

    playSound('press_but', 1, false);

    _oButton.scaleX = _oButton.scaleX - 0.1;
    _oButton.scaleY = _oButton.scaleX - 0.1;

    if (_aCbCompleted[ON_MOUSE_UP]) {
      _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
    }
  };

  this.buttonDown = function () {
    if (_bDisable) {
      return;
    }
    _oButton.scaleX = _oButton.scaleX + 0.1;
    _oButton.scaleY = _oButton.scaleX + 0.1;

    if (_aCbCompleted[ON_MOUSE_DOWN]) {
      _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
    }
  };

  this.setPosition = function (iXPos, iYPos) {
    _oButton.x = iXPos;
    _oButton.y = iYPos;
  };

  this.changeText = function (szText) {
    _oText.text = szText;
    _oTextBack.text = szText;
  };

  this.setX = function (iXPos) {
    _oButton.x = iXPos;
  };

  this.setY = function (iYPos) {
    _oButton.y = iYPos;
  };

  this.getButtonImage = function () {
    return _oButton;
  };

  this.setScale = function (newscale) {
    _oButton.scaleX = newscale;
    _oButton.scaleY = newscale;
  };

  this.getX = function () {
    return _oButton.x;
  };

  this.getY = function () {
    return _oButton.y;
  };

  //Set alpha of the button bg
  this.setAlphaOfBg = function (_amount) {
    _oButtonBg.alpha = _amount;
  };

  this.disableHitStnadText = function () {
    _oText.color = '#a39b9d';
  };
  this.enableHitStnadText = function () {
    _oText.color = '#fff';
  };

  this.enableButtonBg = function (_img) {
    _oButtonBg.image = s_oSpriteLibrary.getSprite('but_deal_select_bg');
  };
  this.disableButtonBg = function (_img) {
    _oButtonBg.image = s_oSpriteLibrary.getSprite('but_deal_bg');
  };

  this._init(
    iXPos,
    iYPos,
    oSprite,
    szText,
    szFont,
    szColor,
    iFontSize,
    oContainer
  );

  return this;
}
