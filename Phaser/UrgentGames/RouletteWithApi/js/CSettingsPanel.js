function CSettingsPanel(oParentContainer) {
    var _oListener;
    var _oBg;

    var _oSettingsButBack;
    var _pStartPosSettingsBack;
    var _oSettingsButCross;
    var _pStartPosSettingsCross;
    var _oSettingsTextLogo;
    var _pStartPosSettingsTextLogo;
    var _oSettingsCasinoLogo;
    var _pStartPosSettingsCasinoLogo;

    var _oThemeText;
    var _oLightText;
    var _oThemeToggleButton;
    var _pStartPosTheme;
    var _oDarkText;
    var _oMusicText;
    var _oMusicOnText;
    var _oMusicToggleButton;
    var _pStartPosMusic;
    var _oMusicOffText;

    var _oContainer;
    var _oParentContainer;

    this._init = function() {
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);

        // if (s_bIsLightTheme) {
        //     var oSprite = s_oSpriteLibrary.getSprite('bg_gameplay');
        // } else {
        //     var oSprite = s_oSpriteLibrary.getSprite('bg_gameplay_dark');
        // }
        var oSprite = s_oSpriteLibrary.getSprite('bg_settings');
        _oBg = createBitmap(oSprite);
        _oBg.x = CANVAS_WIDTH / 2;
        _oBg.y = CANVAS_HEIGHT / 2;
        _oBg.regX = oSprite.width * 0.5;
        _oBg.regY = oSprite.height * 0.5;
        _oBg.alpha = 0.95;
        _oContainer.addChild(_oBg);

        _oListener = _oBg.on("click", function() {});

        //Back button
        var oSprite = s_oSpriteLibrary.getSprite('but_back');
        _pStartPosSettingsBack = { x: Math.round(CANVAS_WIDTH / 9), y: Math.round(CANVAS_HEIGHT / 15) };
        _oSettingsButBack = new CGfxButton(_pStartPosSettingsBack.x, _pStartPosSettingsBack.y, oSprite, _oContainer);
        _oSettingsButBack.addEventListener(ON_MOUSE_UP, this._onBackButtonReleased, this);

        // Cross button
        var oSprite = s_oSpriteLibrary.getSprite('but_cross');
        _pStartPosSettingsCross = { x: Math.round(CANVAS_WIDTH - 213), y: Math.round(CANVAS_HEIGHT / 15) };
        _oSettingsButCross = new CGfxButton(_pStartPosSettingsCross.x, _pStartPosSettingsCross.y, oSprite, _oContainer);
        _oSettingsButCross.addEventListener(ON_MOUSE_UP, this._onCrossButtonReleased, this);

        //Roulette name logo
        var oSprite = s_oSpriteLibrary.getSprite('roulette_game_logo_menu');
        _oSettingsTextLogo = createBitmap(oSprite);
        _pStartPosSettingsTextLogo = { x: Math.round(CANVAS_WIDTH / 2), y: (Math.round(CANVAS_HEIGHT / 1.61)) };
        _oSettingsTextLogo.x = _pStartPosSettingsTextLogo.x;
        _oSettingsTextLogo.y = _pStartPosSettingsTextLogo.y;
        _oSettingsTextLogo.regX = oSprite.width / 2;
        _oSettingsTextLogo.regY = oSprite.height / 2;
        _oSettingsTextLogo.scaleX = 0.4;
        _oSettingsTextLogo.scaleY = 0.4;
        _oContainer.addChild(_oSettingsTextLogo);

        //Casino name logo
        var oSprite = s_oSpriteLibrary.getSprite('casino_logo');
        _oSettingsCasinoLogo = createBitmap(oSprite);
        _pStartPosSettingsCasinoLogo = { x: Math.round(CANVAS_WIDTH / 2), y: (Math.round(CANVAS_HEIGHT / 1.21)) };
        _oSettingsCasinoLogo.x = _pStartPosSettingsCasinoLogo.x;
        _oSettingsCasinoLogo.y = _pStartPosSettingsCasinoLogo.y;
        _oSettingsCasinoLogo.regX = oSprite.width / 2;
        _oSettingsCasinoLogo.regY = oSprite.height / 2;
        _oContainer.addChild(_oSettingsCasinoLogo);

        _oThemeText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 240, CANVAS_HEIGHT * 0.38 - 100, 140, 25,
            25, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            "THEME",
            true, true, true,
            false);
        _oLightText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT * 0.38 - 100, 140, 25,
            25, "right", "#fff", FONT_REGULAR, 1,
            0, 0,
            "LIGHT",
            true, true, true,
            false);

        var oSprite = s_oSpriteLibrary.getSprite('toggle_button');
        _pStartPosTheme = { x: CANVAS_WIDTH / 2 + 100, y: CANVAS_HEIGHT * 0.38 - 93 };
        _oThemeToggleButton = new CToggle(_pStartPosTheme.x, _pStartPosTheme.y, oSprite, s_bIsLightTheme, _oContainer);
        _oThemeToggleButton.addEventListener(ON_MOUSE_UP, this._onThemeTogglePressed, this);

        _oDarkText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 + 160, CANVAS_HEIGHT * 0.38 - 100, 140, 25,
            25, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            "DARK",
            true, true, true,
            false);


        _oMusicText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 240, CANVAS_HEIGHT * 0.4 - 30, 140, 25,
            25, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            "MUSIC",
            true, true, true,
            false);
        _oMusicOnText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT * 0.4 - 30, 140, 25,
            25, "right", "#fff", FONT_REGULAR, 1,
            0, 0,
            "ON",
            true, true, true,
            false);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('toggle_button');
            _pStartPosMusic = { x: CANVAS_WIDTH / 2 + 100, y: CANVAS_HEIGHT * 0.4 - 23 };
            _oMusicToggleButton = new CToggle(_pStartPosMusic.x, _pStartPosMusic.y, oSprite, s_bAudioActive, _oContainer);
            _oMusicToggleButton.addEventListener(ON_MOUSE_UP, this._onMusicTogglePressed, this);
        }

        _oMusicOffText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 + 160, CANVAS_HEIGHT * 0.4 - 30, 140, 25,
            25, "left", "#fff", FONT_REGULAR, 1,
            0, 0,
            "OFF",
            true, true, true,
            false);

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function(iNewX, iNewY) {
        _oSettingsButCross.setPosition(_pStartPosSettingsCross.x - iNewX, iNewY + _pStartPosSettingsCross.y);
        _oSettingsButBack.setPosition(_pStartPosSettingsBack.x + iNewX, iNewY + _pStartPosSettingsBack.y);
        this.setPositionOfObjects(_oSettingsTextLogo, _pStartPosSettingsTextLogo.x, _pStartPosSettingsTextLogo.y);
        this.setPositionOfObjects(_oSettingsCasinoLogo, _pStartPosSettingsCasinoLogo.x, _pStartPosSettingsCasinoLogo.y);
    };

    this.setPositionOfObjects = function(_refObj, _posX, _posY) {
        _refObj.x = _posX;
        _refObj.y = _posY;
    };

    this.show = function() {
        _oContainer.visible = true;
    };

    this.unload = function() {
        _oSettingsButBack.unload();
        _oSettingsButCross.unload();
        _oThemeToggleButton.unload();
        _oMusicToggleButton.unload();
        _oBg.off("click", _oListener);
    };

    this._onThemeTogglePressed = function() {
        playSound("click", 1, false);
        // s_bIsLightTheme = !s_bIsLightTheme;
        // this._toggleThemeBg();
        // s_oMain._changeTheme();
    };

    // this._toggleThemeBg = function() {
    //     if (s_bIsLightTheme) {
    //         _oBg.image = s_oSpriteLibrary.getSprite('bg_gameplay');
    //     } else {
    //         _oBg.image = s_oSpriteLibrary.getSprite('bg_gameplay_dark');
    //     }
    // };

    this._onMusicTogglePressed = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onCrossButtonReleased = function() {
        _oContainer.visible = false;
    };

    this._onBackButtonReleased = function() {
        _oContainer.visible = false;
    };


    _oParentContainer = oParentContainer;

    this._init();
}