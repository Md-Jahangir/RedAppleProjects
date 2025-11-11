function CSettingsPanel(oParentContainer) {
    var _oListener;
    var _oBg;

    var _oButBack;
    var _oButCross;
    var _pStartPosBack;
    var _pStartPosCross;
    var _oThemeToggleButton;
    var _pStartPosTheme;
    var _oMusicToggleButton;
    var _pStartPosMusic;

    var _oSettingsTextLogo;
    var _pStartPosSettingsTextLogo;
    var _oSettingsCasinoLogo;
    var _pStartPosSettingsCasinoLogo;

    var _oContainer;
    var _oParentContainer;

    this._init = function() {
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);


        var oSprite = s_oSpriteLibrary.getSprite('settings_panel_bg');
        _oBg = createBitmap(oSprite);
        _oBg.x = CANVAS_WIDTH / 2;
        _oBg.y = CANVAS_HEIGHT / 2;
        _oBg.regX = oSprite.width * 0.5;
        _oBg.regY = oSprite.height * 0.5;
        _oContainer.addChild(_oBg);

        _oListener = _oBg.on("click", function() {});

        //Back button
        var oSprite = s_oSpriteLibrary.getSprite('but_back');
        _pStartPosBack = { x: Math.round(CANVAS_WIDTH / 8), y: Math.round(CANVAS_HEIGHT / 6.6) };
        _oButBack = new CGfxButton(_pStartPosBack.x, _pStartPosBack.y, oSprite, _oContainer);
        _oButBack.addEventListener(ON_MOUSE_UP, this._onBackButtonPressed, this);

        // Cross button
        var oSprite = s_oSpriteLibrary.getSprite('but_cross');
        _pStartPosCross = { x: CANVAS_WIDTH - 160, y: Math.round(CANVAS_HEIGHT / 6.6) };
        _oButCross = new CGfxButton(_pStartPosCross.x, _pStartPosCross.y, oSprite, _oContainer);
        _oButCross.addEventListener(ON_MOUSE_UP, this._onCrossButtonPressed, this);

        var oThemeText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 140, CANVAS_HEIGHT * 0.4 - 100, 140, 16,
            15, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            "THEME",
            true, true, true,
            false);
        var oLightText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 110, CANVAS_HEIGHT * 0.4 - 100, 140, 16,
            15, "right", "#fff", FONT_REGULAR, 1,
            0, 0,
            "LIGHT",
            true, true, true,
            false);

        var oSprite = s_oSpriteLibrary.getSprite('toggle_button');
        _pStartPosTheme = { x: CANVAS_WIDTH / 2 + 74, y: CANVAS_HEIGHT * 0.4 - 93 };
        _oThemeToggleButton = new CToggle(_pStartPosTheme.x, _pStartPosTheme.y, oSprite, s_bIsLightTheme, _oContainer);
        _oThemeToggleButton.addEventListener(ON_MOUSE_UP, this._onThemeTogglePressed, this);

        var oDarkText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 + 118, CANVAS_HEIGHT * 0.4 - 100, 140, 16,
            15, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            "DARK",
            true, true, true,
            false);


        var oMusicText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 140, CANVAS_HEIGHT * 0.4 - 50, 140, 16,
            15, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            "MUSIC",
            true, true, true,
            false);
        var oMusicOnText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 110, CANVAS_HEIGHT * 0.4 - 50, 140, 16,
            15, "right", "#fff", FONT_REGULAR, 1,
            0, 0,
            "ON",
            true, true, true,
            false);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('toggle_button');
            _pStartPosMusic = { x: CANVAS_WIDTH / 2 + 74, y: CANVAS_HEIGHT * 0.4 - 43 };
            _oMusicToggleButton = new CToggle(_pStartPosMusic.x, _pStartPosMusic.y, oSprite, s_bAudioActive, _oContainer);
            _oMusicToggleButton.addEventListener(ON_MOUSE_UP, this._onMusicTogglePressed, this);
        }


        var oMusicOffText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 + 118, CANVAS_HEIGHT * 0.4 - 50, 140, 16,
            15, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            "OFF",
            true, true, true,
            false);

        //Craps name logo
        var oSprite = s_oSpriteLibrary.getSprite('craps_logo_big');
        _oSettingsTextLogo = createBitmap(oSprite);
        _pStartPosSettingsTextLogo = { x: Math.round(CANVAS_WIDTH / 2.05), y: (Math.round(CANVAS_HEIGHT / 1.61)) };
        _oSettingsTextLogo.x = _pStartPosSettingsTextLogo.x;
        _oSettingsTextLogo.y = _pStartPosSettingsTextLogo.y;
        _oSettingsTextLogo.regX = oSprite.width / 2;
        _oSettingsTextLogo.regY = oSprite.height / 2;
        _oSettingsTextLogo.scaleX = 0.35;
        _oSettingsTextLogo.scaleY = 0.35;
        _oContainer.addChild(_oSettingsTextLogo);

        //Casino name logo
        var oSprite = s_oSpriteLibrary.getSprite('casino_logo');
        _oSettingsCasinoLogo = createBitmap(oSprite);
        _pStartPosSettingsCasinoLogo = { x: Math.round(CANVAS_WIDTH / 2.02), y: (Math.round(CANVAS_HEIGHT / 1.21)) };
        _oSettingsCasinoLogo.x = _pStartPosSettingsCasinoLogo.x;
        _oSettingsCasinoLogo.y = _pStartPosSettingsCasinoLogo.y;
        _oSettingsCasinoLogo.regX = oSprite.width / 2;
        _oSettingsCasinoLogo.regY = oSprite.height / 2;
        _oSettingsCasinoLogo.scaleX = 0.7;
        _oSettingsCasinoLogo.scaleY = 0.7;
        _oContainer.addChild(_oSettingsCasinoLogo);
    };


    this.show = function() {
        _oContainer.visible = true;
    };

    this.unload = function() {
        _oButBack.unload();
        _oButCross.unload();
        _oThemeToggleButton.unload();
        _oMusicToggleButton.unload();
        _oBg.off("click", _oListener);
    };

    this._onThemeTogglePressed = function() {
        playSound("click", 1, false);
    };

    this._onMusicTogglePressed = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onCrossButtonPressed = function() {
        _oContainer.visible = false;
    };
    this._onBackButtonPressed = function() {
        _oContainer.visible = false;
    };

    this.refreshButtonPos = function(iNewX, iNewY) {
        _oButBack.setPosition(_pStartPosBack.x, _pStartPosBack.y);
        _oButCross.setPosition(_pStartPosCross.x, _pStartPosCross.y);
        this.setPositionOfObjects(_oSettingsTextLogo, _pStartPosSettingsTextLogo.x, _pStartPosSettingsTextLogo.y);
        this.setPositionOfObjects(_oSettingsCasinoLogo, _pStartPosSettingsCasinoLogo.x, _pStartPosSettingsCasinoLogo.y);

    };

    this.setPositionOfObjects = function(_refObj, _posX, _posY) {
        _refObj.x = _posX;
        _refObj.y = _posY;
    };

    _oParentContainer = oParentContainer;

    this._init();
}