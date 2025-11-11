function CMain(oData) {
  var _bUpdate;
  var _iCurResource = 0;
  var RESOURCE_TO_LOAD = 0;
  var _iState = STATE_LOADING;
  var _oData;
  var _oPreloader;
  var _oSplash;
  var _oMenu;
  var _oHelp;
  var _oGame;

  this.initContainer = function () {
    var canvas = document.getElementById('canvas');
    s_oStage = new createjs.Stage(canvas);
    createjs.Touch.enable(s_oStage);

    s_oGameCon = new createjs.Container();
    s_oStage.addChild(s_oGameCon);

    s_oUICon = new createjs.Container();
    s_oStage.addChild(s_oUICon);

    s_bMobile = jQuery.browser.mobile;
    if (s_bMobile === false) {
      s_oStage.enableMouseOver(20);
    }

    s_iPrevTime = new Date().getTime();

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', this._update);
    if (navigator.userAgent.match(/Windows Phone/i)) {
      DISABLE_SOUND_MOBILE = true;
    }

    s_oSpriteLibrary = new CSpriteLibrary();

    //ADD PRELOADER
    _oPreloader = new CPreloader();

    s_oGameSettings = new CGameSettings();
    _bUpdate = true;

  };


  this.preloaderReady = function () {
    this._loadImages();

    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
      this._initSounds();
    }
  };

  this.soundLoaded = function () {
    _iCurResource++;
    var iPerc = Math.floor((_iCurResource / RESOURCE_TO_LOAD) * 100);

    _oPreloader.refreshLoader(iPerc);

  };

  this._onRemovePreloader = async () => {
    _oPreloader.unload();

    const resp = await languageService.init();

    if (resp) {
      let initData = await serverRequests.gameInit()
      if (initData) {
        s_oSoundTrack = playSound("soundtrack", 1, true);
        initData = initData.result;
        _oGame = new CGame({ ..._oData, ...initData });
        _iState = STATE_GAME;
      }
    }
  }

  this._initSounds = function () {
    Howler.mute(!s_bAudioActive);
    s_aSoundsInfo = new Array();

    s_aSoundsInfo.push({
      path: './sounds/',
      filename: 'card',
      loop: false,
      volume: 1,
      ingamename: 'card',
    });
    s_aSoundsInfo.push({
      path: './sounds/',
      filename: 'chip',
      loop: false,
      volume: 1,
      ingamename: 'chip',
    });
    s_aSoundsInfo.push({
      path: './sounds/',
      filename: 'fiche_collect',
      loop: false,
      volume: 1,
      ingamename: 'fiche_collect',
    });
    s_aSoundsInfo.push({
      path: './sounds/',
      filename: 'press_but',
      loop: false,
      volume: 1,
      ingamename: 'press_but',
    });
    s_aSoundsInfo.push({
      path: './sounds/',
      filename: 'win',
      loop: false,
      volume: 1,
      ingamename: 'win',
    });
    s_aSoundsInfo.push({
      path: './sounds/',
      filename: 'lose',
      loop: false,
      volume: 1,
      ingamename: 'lose',
    });
    s_aSoundsInfo.push({
      path: './sounds/',
      filename: 'soundtrack',
      loop: true,
      volume: 1,
      ingamename: 'soundtrack',
    });

    RESOURCE_TO_LOAD += s_aSoundsInfo.length;

    s_aSounds = new Array();
    for (var i = 0; i < s_aSoundsInfo.length; i++) {
      this.tryToLoadSound(s_aSoundsInfo[i], false);
    }
  };

  this.tryToLoadSound = function (oSoundInfo, bDelay) {

    setTimeout(function () {
      s_aSounds[oSoundInfo.ingamename] = new Howl({
        src: [oSoundInfo.path + oSoundInfo.filename + '.mp3'],
        autoplay: false,
        preload: true,
        loop: oSoundInfo.loop,
        volume: oSoundInfo.volume,
        onload: s_oMain.soundLoaded,
        onloaderror: function (szId, szMsg) {
          for (var i = 0; i < s_aSoundsInfo.length; i++) {
            if (szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id) {
              s_oMain.tryToLoadSound(s_aSoundsInfo[i], true);
              break;
            }
          }
        },
        onplayerror: function (szId) {
          for (var i = 0; i < s_aSoundsInfo.length; i++) {
            if (szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id) {
              s_aSounds[s_aSoundsInfo[i].ingamename].once('unlock', function () {
                s_aSounds[s_aSoundsInfo[i].ingamename].play();
                if (s_aSoundsInfo[i].ingamename === "soundtrack" && s_oGame !== null) {
                  setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
                }
              });
              break;
            }
          }

        }
      });


    }, (bDelay ? 200 : 0));


  };

  this._loadImages = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite('bg_splash', './sprites/bg_splash.png');
    s_oSpriteLibrary.addSprite('bg_splash_mobile', './sprites/bg_splash_mobile.png');
    s_oSpriteLibrary.addSprite('bg_settings', './sprites/bg_settings.png');
    s_oSpriteLibrary.addSprite('bg_gameplay', './sprites/bg_gameplay.png');
    s_oSpriteLibrary.addSprite('bg_menu_base_logo', './sprites/bg_menu_base_logo.png');
    s_oSpriteLibrary.addSprite('bg_menu_base_logo_mobile', './sprites/bg_menu_base_logo_mobile.png');
    s_oSpriteLibrary.addSprite('game_logo_name', './sprites/game_logo_name.png');
    s_oSpriteLibrary.addSprite('but_play_bg', './sprites/but_play_bg.png');
    s_oSpriteLibrary.addSprite('but_settings', './sprites/but_settings.png');
    s_oSpriteLibrary.addSprite('home_icon', './sprites/home_icon.png');
    s_oSpriteLibrary.addSprite('but_back', './sprites/but_back.png');
    s_oSpriteLibrary.addSprite('but_cross', './sprites/but_cross.png');
    s_oSpriteLibrary.addSprite('toggle_button', './sprites/toggle_button.png');
    s_oSpriteLibrary.addSprite('casino_logo', './sprites/casino_logo.png');
    s_oSpriteLibrary.addSprite('bg_gameplay_base', './sprites/bg_gameplay_base.png');
    s_oSpriteLibrary.addSprite('bg_gameplay_base_mobile', './sprites/bg_gameplay_base_mobile.png');
    s_oSpriteLibrary.addSprite('bg_gameplay_base_up', './sprites/bg_gameplay_base_up.png');
    s_oSpriteLibrary.addSprite('but_clear', './sprites/but_clear.png');
    s_oSpriteLibrary.addSprite('but_reset', './sprites/but_reset.png');
    s_oSpriteLibrary.addSprite('but_deal_bg', './sprites/but_deal_bg.png');
    s_oSpriteLibrary.addSprite("message-box-overlay", "./sprites/message-box-overlay.png");
    s_oSpriteLibrary.addSprite("but_game_bg", "./sprites/but_game_bg.png");
    s_oSpriteLibrary.addSprite(
      'but_deal_select_bg',
      './sprites/but_deal_select_bg.png'
    );
    s_oSpriteLibrary.addSprite(
      'but_stand_hit_area',
      './sprites/but_stand_hit_area.png'
    );
    s_oSpriteLibrary.addSprite(
      'but_hit_hit_area',
      './sprites/but_hit_hit_area.png'
    );
    s_oSpriteLibrary.addSprite('hit_stand_bg', './sprites/hit_stand_bg.png');
    s_oSpriteLibrary.addSprite(
      'result_green_dot',
      './sprites/result_green_dot.png'
    );
    s_oSpriteLibrary.addSprite(
      'card_spritesheet',
      './sprites/card_spritesheet47.png'
    );
    s_oSpriteLibrary.addSprite('msg_box', './sprites/msg_box.png');
    s_oSpriteLibrary.addSprite(
      'below_game_logo_name',
      './sprites/below_game_logo_name.png'
    );

    // updated action buttons
    s_oSpriteLibrary.addSprite(
      'button-hit-normal',
      './sprites/buttons/button-hit-normal.png'
    );
    s_oSpriteLibrary.addSprite(
      'button-hit-disabled',
      './sprites/buttons/button-hit-disabled.png'
    );
    s_oSpriteLibrary.addSprite(
      'button-hit-glow',
      './sprites/buttons/button-hit-glow.png'
    );

    s_oSpriteLibrary.addSprite(
      'button-stand-normal',
      './sprites/buttons/button-stand-normal.png'
    );
    s_oSpriteLibrary.addSprite(
      'button-stand-disabled',
      './sprites/buttons/button-stand-disabled.png'
    );
    s_oSpriteLibrary.addSprite(
      'button-stand-glow',
      './sprites/buttons/button-stand-glow.png'
    );

    s_oSpriteLibrary.addSprite(
      'button-bottom-normal',
      './sprites/buttons/button-bottom-normal.png'
    );
    s_oSpriteLibrary.addSprite(
      'button-bottom-disabled',
      './sprites/buttons/button-bottom-disabled.png'
    );
    s_oSpriteLibrary.addSprite(
      'button-bottom-glow',
      './sprites/buttons/button-bottom-glow.png'
    );

    s_oSpriteLibrary.addSprite(
      'button-rebet-normal',
      './sprites/buttons/button-rebet-normal.png'
    );
    s_oSpriteLibrary.addSprite(
      'button-rebet-disabled',
      './sprites/buttons/button-rebet-disabled.png'
    );
    s_oSpriteLibrary.addSprite(
      'button-rebet-glow',
      './sprites/buttons/button-rebet-glow.png'
    );

    s_oSpriteLibrary.addSprite(
      'button-rules',
      './sprites/buttons/button-rules.png'
    );

    s_oSpriteLibrary.addSprite('arrow_hand', './sprites/arrow_hand.png');
    for (var i = 0; i < NUM_FICHES; i++) {
      s_oSpriteLibrary.addSprite('fiche_' + i, './sprites/fiche_' + i + '.png');
      s_oSpriteLibrary.addSprite(
        'chip_disabled_' + i,
        './sprites/chip_disabled_' + i + '.png'
      );
    }

    RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();

    s_oSpriteLibrary.loadSprites();
  };

  this._onImagesLoaded = function () {
    _iCurResource++;

    var iPerc = Math.floor((_iCurResource / RESOURCE_TO_LOAD) * 100);

    _oPreloader.refreshLoader(iPerc);

  };

  this._onAllImagesLoaded = function () { };

  this.gotoSplash = function () {
    _oSplash = new CSplash();
    _iState = STATE_SPLASH;
  };

  this.gotoMenu = async function () {
    _oMenu = new CMenu();
    _iState = STATE_MENU;
  };

  this.gotoGame = function () {
    _oGame = new CGame(_oData);
    _iState = STATE_GAME;
  };

  this.gotoHelp = function () {
    _oHelp = new CHelp();
    _iState = STATE_HELP;
  };

  this.stopUpdate = function () {
    _bUpdate = false;
    createjs.Ticker.paused = true;
    $('#block_game').css('display', 'block');

    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
      Howler.mute(true);
    }
  };

  this.startUpdate = function () {
    s_iPrevTime = new Date().getTime();
    _bUpdate = true;
    createjs.Ticker.paused = false;
    $('#block_game').css('display', 'none');

    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
      if (s_bAudioActive) {
        Howler.mute(false);
      }
    }
  };

  this._update = function (event) {
    if (!_bUpdate) {
      return;
    }
    var iCurTime = new Date().getTime();
    s_iTimeElaps = iCurTime - s_iPrevTime;
    s_iCntTime += s_iTimeElaps;
    s_iCntFps++;
    s_iPrevTime = iCurTime;

    if (s_iCntTime >= 1000) {
      s_iCurFps = s_iCntFps;
      s_iCntTime -= 1000;
      s_iCntFps = 0;
    }

    if (_iState === STATE_GAME) {
      _oGame.update();
    }

    s_oStage.update(event);
  };

  s_oMain = this;

  _oData = oData;
  ENABLE_CHECK_ORIENTATION = oData.check_orientation;
  ENABLE_FULLSCREEN = oData.fullscreen;
  SHOW_CREDITS = oData.show_credits;
  s_bAudioActive = oData.audio_enable_on_startup;

  this.initContainer();
}

var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_oDrawLayer;
var s_oStage;
var s_oGameCon;
var s_oUICon;
var s_oMain;
var s_oSpriteLibrary;
var s_oGameSettings;
var s_bFullscreen = false;
var s_aSounds;
var s_bIsLightTheme = true;
var s_aSoundsInfo;
var s_oSoundTrack = null;