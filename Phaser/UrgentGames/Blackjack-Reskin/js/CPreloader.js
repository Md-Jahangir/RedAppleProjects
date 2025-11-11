function CPreloader() {
  var _iMaskWidth;
  var _oLoadingText;
  var _oProgressBar;
  var _oMaskPreloader;
  var _oContainer;
  var oCasinoLogo;

  this._init = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite('progress_bar', './sprites/progress_bar.png');
    s_oSpriteLibrary.addSprite(
      'casino_inhand_logo',
      './sprites/Loading-Screen.jpg'
    );
    s_oSpriteLibrary.loadSprites();

    _oContainer = new createjs.Container();
    s_oStage.addChild(_oContainer);
  };

  this.unload = function () {
    _oContainer.removeAllChildren();
  };

  this._onImagesLoaded = function () { };

  this._onAllImagesLoaded = function () {
    this.attachSprites();
    s_oMain.preloaderReady();
  };

  this.attachSprites = function () {
    // casino_inhand_logo
    var oSprite = s_oSpriteLibrary.getSprite('casino_inhand_logo');
    var oCasinoLogo = createBitmap(oSprite);
    let scaleX = NEW_WIDTH / 1920;
    let scaleY = NEW_HEIGHT / 1080;
    let totalScale = scaleX > scaleY ? scaleX : scaleY;
    oCasinoLogo.scaleX = totalScale

    oCasinoLogo.scaleY = totalScale
    oCasinoLogo.regX = 1920 / 2;
    oCasinoLogo.regY = 1080 / 2;
    oCasinoLogo.x = NEW_WIDTH / 2;
    oCasinoLogo.y = NEW_HEIGHT / 2;
    _oContainer.addChild(oCasinoLogo);

    //progress_bar
    var oSprite = s_oSpriteLibrary.getSprite('progress_bar');
    _oProgressBar = createBitmap(s_oSpriteLibrary.getSprite('progress_bar'));
    _oProgressBar.x = NEW_WIDTH / 3 - oSprite.width / 3;
    _oProgressBar.y = NEW_HEIGHT / 1.2 - oSprite.height / 1.2;
    _oContainer.addChild(_oProgressBar);

    // _oMaskPreloader
    _iMaskWidth = oSprite.width;
    _oMaskPreloader = new createjs.Shape();
    _oMaskPreloader.graphics
      .beginFill('rgba(255,0,0,0.01)')
      .drawRect(_oProgressBar.x, _oProgressBar.y, 1, 30);
    _oContainer.addChild(_oMaskPreloader);

    _oProgressBar.mask = _oMaskPreloader;

    // _oLoadingText
    if (getOrientation() == 'orientation_portrait') {
      _oLoadingText = new createjs.Text('0%', '35px ' + FONT_REGULAR, '#fff');
    } else {
      _oLoadingText = new createjs.Text('0%', '20px ' + FONT_REGULAR, '#fff');
    }
    _oLoadingText.x = NEW_WIDTH / 2
    _oLoadingText.y = NEW_HEIGHT / 1.3
    _oLoadingText.textAlign = 'center';
    _oLoadingText.textBaseline = 'middle';
    _oContainer.addChild(_oLoadingText);
  };

  this.refreshLoader = function (iPerc) {
    _oLoadingText.text = iPerc + '%';
    if (iPerc === 100) {
      s_oMain._onRemovePreloader();
      _oLoadingText.visible = false;
      _oProgressBar.visible = false;
    };
    var iNewMaskWidth = Math.floor((iPerc * _iMaskWidth) / 100);
    _oMaskPreloader.graphics.clear();
    _oMaskPreloader.graphics
      .beginFill('rgba(255,0,0,0.01)')
      .drawRect(_oProgressBar.x, _oProgressBar.y, iNewMaskWidth, 30);
  };

  this._init();
}
