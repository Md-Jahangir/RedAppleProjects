function CMenu() {
  var _oBg;
  var _oFade;
  var _oButPlay;
  var oBaseLogoBg
  var _pStartPosPlayButton;
  var _oButSettings;
  var oBaseLogoBg_url;
  var _oButRules;
  var _pStartPosSettings;
  var _pStartPosBack;
  var _pStartPosTextLogo;
  var _oTextLogo;
  let config;
  var _oSettingsPanel;

  //########################################################################################################################

  this._init = function () {
    let orientation = getOrientation()


    // bg_gameplay
    var oSprite = s_oSpriteLibrary.getSprite('bg_gameplay');
    _oBg = createBitmap(oSprite);
    s_oGameCon.addChild(_oBg);

    // bg_menu_base_logo
    oBaseLogoBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu_base_logo'));
    s_oGameCon.addChild(oBaseLogoBg);
    oBaseLogoBg_url = oBaseLogoBg.image.src.match('^(.*[\\\/])')


    // but_play_bg
    var oSprite = s_oSpriteLibrary.getSprite('but_play_bg');
    _oButPlay = new CTextButton(
      0,
      0,
      oSprite,
      languageService.getString('textPlay'),
      FONT_RED_HAT_DISPLAY_BLACK,
      '#ffffff',
      36,
      s_oGameCon
    );
    _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

    // but_settings
    var oSprite = s_oSpriteLibrary.getSprite('but_settings');
    _oButSettings = new CGfxButton(0, 0, oSprite, true);
    _oButSettings.addEventListener(ON_MOUSE_UP, this._onSettingsPressed, this);

    // game_logo_name
    var oSprite = s_oSpriteLibrary.getSprite('game_logo_name');
    _oTextLogo = new CGfxButton(0, 0, oSprite, false);
    _oTextLogo.removeInputEnable();

    // _oSettingsPanel
    _oSettingsPanel = new CSettingsPanel(s_oGameCon);

    // _oFade
    _oFade = new createjs.Shape();
    _oFade.graphics
      .beginFill('black')
      .drawRect(0, 0, NEW_WIDTH, NEW_HEIGHT);
    s_oGameCon.addChild(_oFade);
    createjs.Tween.get(_oFade)
      .to({ alpha: 0 }, 400)
      .call(function () {
        _oFade.visible = false;
      });

      window.addEventListener('resize', this.resize, false);
      this.resize();
  };

  this.resize = function () {
    let config = orientation_mode[getOrientation()].CMenu;
    _oSettingsPanel.resize();
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

    // oBaseLogoBg
    if(getOrientation() == 'orientation_portrait') {
      oBaseLogoBg.image.src = `${oBaseLogoBg_url[0]}bg_menu_base_logo_mobile.png`
      let scaleX = NEW_WIDTH / 1080;
      let scaleY = NEW_HEIGHT / 1920;
      let totalScale = scaleX > scaleY ? scaleX : scaleY;
      oBaseLogoBg.scaleX = totalScale *0.9;
      oBaseLogoBg.scaleY = totalScale *0.9;
      oBaseLogoBg.regX = 1080 / 2;
      oBaseLogoBg.regY = 1920 / 2;
      oBaseLogoBg.x = NEW_WIDTH / 2;
      oBaseLogoBg.y = NEW_HEIGHT / 2;
    } else {
      oBaseLogoBg.image.src = `${oBaseLogoBg_url[0]}bg_menu_base_logo.png`
      oBaseLogoBg.scaleX = GAME_SCALE;
      oBaseLogoBg.scaleY = GAME_SCALE;
      oBaseLogoBg.regX = 1920 / 2;
      oBaseLogoBg.regY = 1080 / 2;
      oBaseLogoBg.x = NEW_WIDTH / 2;
      oBaseLogoBg.y = NEW_HEIGHT / 2;
    }    
    // _oButPlay
    if(_oButPlay) {
      _oButPlay.setScale(GAME_SCALE * config._oButPlay.scale);
      _oButPlay.setPosition(NEW_WIDTH / 2, NEW_HEIGHT * 0.9);
    }

    // _oButSettings
    if (_oButSettings) {
      _oButSettings.setScale(GAME_SCALE * config._oButSettings.scale);
      _oButSettings.setPosition(NEW_WIDTH * 0.9, NEW_HEIGHT * config._oButSettings.stepY);
    }

    //_oTextLogo
    _oTextLogo.setScale(GAME_SCALE * config._oTextLogo.scale);
    _oTextLogo.setPosition(NEW_WIDTH / 2, NEW_HEIGHT * config._oTextLogo.stepY);
  };

  this.unload = function () {
    _oButPlay.unload();
    _oButPlay = null;
    _oButSettings.unload();
    _oButSettings = null;
    s_oGameCon.removeAllChildren();
    s_oMenu = null;
  };

  this._onButPlayRelease = function () {
    this.unload();
    s_oMain.gotoGame();
    $(s_oMain).trigger('start_session');
  };

  this._onSettingsPressed = function () {
    _oSettingsPanel.show();
  };

  this._onBackPressed = function () {};

  s_oMenu = this;

  this._init();
}

var s_oMenu = null;
