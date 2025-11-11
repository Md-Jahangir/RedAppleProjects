var config;

function CGfxButton(iXPos, iYPos, oSprite) {
    this._bDisable;
    this._iWidth;
    this._iHeight;
    this._aCbCompleted;
    this._aCbOwner;
    this._aParams = [];
    this._oButton;

    this._init(iXPos, iYPos, oSprite);

    return this;
};

CGfxButton.prototype._init = function(iXPos, iYPos, oSprite) {
    this._bDisable = false;
    this._aCbCompleted = new Array();
    this._aCbOwner = new Array();

    this._iWidth = oSprite.width;
    this._iHeight = oSprite.height;

    this._oButton = createBitmap(oSprite);
    this._oButton.x = iXPos;
    this._oButton.y = iYPos;

  this._oButton.regX = oSprite.width / 2;
  this._oButton.regY = oSprite.height / 2;
  this._oButton.cursor = 'pointer';
  s_oGameCon.addChild(this._oButton);

  this._initListener();
};

CGfxButton.prototype.unload = function () {
  this._oButton.off('mousedown', this.buttonDown);
  this._oButton.off('pressup', this.buttonRelease);

  s_oGameCon.removeChild(this._oButton);
};

CGfxButton.prototype.setVisible = function (bVisible) {
  this._oButton.visible = bVisible;
};

CGfxButton.prototype._initListener = function () {
  this._oButton.on('mousedown', this.buttonDown, this);
  this._oButton.on('pressup', this.buttonRelease, this);
};

CGfxButton.prototype.addEventListener = function (
  iEvent,
  cbCompleted,
  cbOwner
) {
  this._aCbCompleted[iEvent] = cbCompleted;
  this._aCbOwner[iEvent] = cbOwner;
};

CGfxButton.prototype.addEventListenerWithParams = function (
  iEvent,
  cbCompleted,
  cbOwner,
  aParams
) {
  this._aCbCompleted[iEvent] = cbCompleted;
  this._aCbOwner[iEvent] = cbOwner;
  this._aParams = aParams;
};

CGfxButton.prototype.buttonRelease = function () {
  config = orientation_mode[getOrientation()].CInterface;
  if (this._bDisable) {
    return;
  }

  playSound('press_but', 1, false);

  this._oButton.scaleX = config._aFiches.scale * GAME_SCALE;
  this._oButton.scaleY = config._aFiches.scale * GAME_SCALE;

  if (this._aCbCompleted[ON_MOUSE_UP]) {
    this._aCbCompleted[ON_MOUSE_UP].call(
      this._aCbOwner[ON_MOUSE_UP],
      this._aParams
    );
  }
};

CGfxButton.prototype.buttonDown = function () {
  config = orientation_mode[getOrientation()].CInterface;
  if (this._bDisable) {
    return;
  }
  this._oButton.scaleX = config._aFiches.scale * 0.9 * GAME_SCALE;
  this._oButton.scaleY = config._aFiches.scale * 0.9 * GAME_SCALE;

  if (this._aCbCompleted[ON_MOUSE_DOWN]) {
    this._aCbCompleted[ON_MOUSE_DOWN].call(
      this._aCbOwner[ON_MOUSE_DOWN],
      this._aParams
    );
  }
};
CGfxButton.prototype.setScale = function (newscale) {
  this._oButton.scaleX = newscale;
  this._oButton.scaleY = newscale;
};

CGfxButton.prototype.setPosition = function (iXPos, iYPos) {
  this._oButton.x = iXPos;
  this._oButton.y = iYPos;
};

CGfxButton.prototype.setX = function (iXPos) {
  this._oButton.x = iXPos;
};

CGfxButton.prototype.setY = function (iYPos) {
  this._oButton.y = iYPos;
};

CGfxButton.prototype.enable = function () {
  this._bDisable = false;

    this._oButton.filters = [];

  this._oButton.cache(0, 0, this._iWidth, this._iHeight);
};

CGfxButton.prototype.disable = function () {
  this._bDisable = true;

  var matrix = new createjs.ColorMatrix()
    .adjustSaturation(-100)
    .adjustBrightness(40);
  this._oButton.filters = [new createjs.ColorMatrixFilter(matrix)];
  this._oButton.cache(0, 0, this._iWidth, this._iHeight);
};

CGfxButton.prototype.getButtonImage = function () {
  return this._oButton;
};

CGfxButton.prototype.getX = function () {
  return this._oButton.x;
};

CGfxButton.prototype.getY = function () {
  return this._oButton.y;
};

CGfxButton.prototype.removeInputEnable = function () {
  this._bDisable = true;
  this._oButton.cursor = '';
};
