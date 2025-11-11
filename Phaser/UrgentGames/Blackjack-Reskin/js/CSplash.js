function CSplash() {
  var _oBg;
  var _oBg_url;
  var _oFade;

  this._init = function () {
    //bg_splash

    let orientation = getOrientation()
    if (orientation == "orientation_portrait") {
      _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_splash_mobile'));
      let scaleX = NEW_WIDTH / 1080;
      let scaleY = NEW_HEIGHT / 1920;
      let totalScale = scaleX > scaleY ? scaleX : scaleY;
      _oBg.scaleX = totalScale;
      _oBg.scaleY = totalScale;
      _oBg.regX = 1080 / 2;
      _oBg.regY = 1920 / 2;
      _oBg.x = NEW_WIDTH / 2;
      _oBg.y = NEW_HEIGHT / 2;
    } else {
      _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_splash'));
      let scaleX = NEW_WIDTH / 1920;
      let scaleY = NEW_HEIGHT / 1080;
      let totalScale = scaleX > scaleY ? scaleX : scaleY;
      _oBg.scaleX = totalScale;
      _oBg.scaleY = totalScale;
      _oBg.regX = 1920 / 2;
      _oBg.regY = 1080 / 2;
      _oBg.x = NEW_WIDTH / 2;
      _oBg.y = NEW_HEIGHT / 2;
    }
    s_oGameCon.addChild(_oBg);


    // _oFade
    _oFade = new createjs.Shape();
    _oFade.graphics.beginFill('black').drawRect(0, 0, NEW_WIDTH, NEW_HEIGHT);
    s_oGameCon.addChild(_oFade);
    createjs.Tween.get(_oFade)
      .to({ alpha: 0 }, 400)
      .call(function () {
        _oFade.visible = false;
      });

    setTimeout(() => {
      this.unload();
      s_oMain.gotoMenu();
      $(s_oMain).trigger('start_session');
    }, 1000);
  };

  this.unload = function () {
    s_oGameCon.removeAllChildren();
    s_oSplash = null;
  };

  s_oSplash = this;
  this._init();
}
var s_oSplash = null;
