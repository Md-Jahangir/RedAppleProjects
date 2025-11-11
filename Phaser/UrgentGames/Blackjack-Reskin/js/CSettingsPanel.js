function CSettingsPanel(oParentContainer) {
    var _oListener;
    var _oBg;
    var _oSettingsButBack;
    var _oSettingsButCross;
    var _oSettingsTextLogo;
    var _oSettingsCasinoLogo;
    var config;
    var _oMusicText;
    var _oMusicOnText;
    var _oMusicToggleButton;
    var _oMusicOffText;
    var _oContainer;
    var _oControlContainer;
    var _oParentContainer;

    this._init = function () {

        config = orientation_mode[getOrientation()].CSettingsPanel;

        //_oContainer
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);

        // _oControlContainer
        _oControlContainer = new createjs.Container();
        _oControlContainer.visible = false;
        _oParentContainer.addChild(_oControlContainer);

        // bg_settings 
        var oSprite = s_oSpriteLibrary.getSprite('bg_settings');
        _oBg = createBitmap(oSprite);
        _oContainer.addChild(_oBg);
        _oListener = _oBg.on("click", function () { });

        //Back button
        var oSprite = s_oSpriteLibrary.getSprite('but_back');
        _oSettingsButBack = new CGfxButton(config._oSettingsButBack.x, config._oSettingsButBack.y, oSprite, true);
        _oSettingsButBack.addEventListener(ON_MOUSE_UP, this._onBackButtonReleased, this);
        _oSettingsButBack.setVisible(false);

        // Cross button
        var oSprite = s_oSpriteLibrary.getSprite('but_cross');
        _oSettingsButCross = new CGfxButton(config._oSettingsButCross.x, config._oSettingsButCross.y, oSprite, true);
        _oSettingsButCross.addEventListener(ON_MOUSE_UP, this._onCrossButtonReleased, this);
        _oSettingsButCross.setVisible(false);

        // game_logo_name 
        var oSprite = s_oSpriteLibrary.getSprite('game_logo_name');
        _oSettingsTextLogo = new CGfxButton(config._oSettingsTextLogo.x, config._oSettingsTextLogo.y, oSprite, false);
        _oSettingsTextLogo.removeInputEnable();
        _oSettingsTextLogo.setVisible(false);

        // casino_logo
        var oSprite = s_oSpriteLibrary.getSprite('casino_logo');
        _oSettingsCasinoLogo = new CGfxButton(config._oSettingsCasinoLogo.x, config._oSettingsCasinoLogo.y, oSprite, false);
        _oSettingsCasinoLogo.removeInputEnable();
        _oSettingsCasinoLogo.setVisible(false);

        // _oMusicText 
        _oMusicText = new CTLText(
            _oControlContainer,
            config._oMusicText.x,
            config._oMusicText.y,
            config._oMusicText.width,
            config._oMusicText.height,
            config._oMusicText.fontSize,
            'left', '#8f6bc1', FONT_RED_HAT_DISPLAY_REGULAR, 1, 0, 0, 'MUSIC', true, true, true, false);

        // _oMusicOnText    
        _oMusicOnText = new CTLText(
            _oControlContainer,
            config._oMusicOnText.x,
            config._oMusicOnText.y,
            config._oMusicOnText.width,
            config._oMusicOnText.height,
            config._oMusicOnText.fontSize,
            'right', '#8f6bc1', FONT_RED_HAT_DISPLAY_REGULAR, 1, 0, 0, 'ON', true, true, true, false);

        // _oMusicToggleButton
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('toggle_button');
            _oMusicToggleButton = new CToggle(config._oMusicToggleButton.x, config._oMusicToggleButton.y, oSprite,
                s_bAudioActive,
                _oControlContainer);
            _oMusicToggleButton.addEventListener(ON_MOUSE_UP, this._onMusicTogglePressed, this);
        }
        // _oMusicOffText

        _oMusicOffText = new CTLText(
            _oControlContainer,
            config._oMusicOffText.x,
            config._oMusicOffText.y,
            config._oMusicOffText.width,
            config._oMusicOffText.height,
            config._oMusicOffText.fontSize,
            'left', '#8f6bc1', FONT_RED_HAT_DISPLAY_REGULAR, 1, 0, 0, 'OFF', true, true, true, false);

    };
    this.resize = function () {

        config = orientation_mode[getOrientation()].CSettingsPanel;

        // bg_settings
        let scaleX = NEW_WIDTH / 1920;
        let scaleY = NEW_HEIGHT / 1080;
        let totalScale = scaleX > scaleY ? scaleX : scaleY;
        _oBg.x = NEW_WIDTH / 2;
        _oBg.y = NEW_HEIGHT / 2;
        _oBg.scaleX = totalScale;
        _oBg.scaleY = totalScale;
        _oBg.regX = 1920 / 2;
        _oBg.regY = 1080 / 2;

        // but_back
        _oSettingsButBack.setScale(GAME_SCALE * config._oSettingsButBack.scale);
        _oSettingsButBack.setPosition(NEW_WIDTH * 0.1, NEW_HEIGHT * config._oSettingsButBack.stepY);

        // but_cross
        _oSettingsButCross.setScale(GAME_SCALE * config._oSettingsButCross.scale);
        _oSettingsButCross.setPosition(NEW_WIDTH * 0.9, NEW_HEIGHT * config._oSettingsButCross.stepY);

        // game_logo_name
        _oSettingsTextLogo.setScale(GAME_SCALE * config._oSettingsTextLogo.scale);
        _oSettingsTextLogo.setPosition(NEW_WIDTH / 2, NEW_HEIGHT * config._oSettingsTextLogo.stepY);

        // casino_logo
        _oSettingsCasinoLogo.setScale(GAME_SCALE * config._oSettingsCasinoLogo.scale);
        _oSettingsCasinoLogo.setPosition(NEW_WIDTH / 2, NEW_HEIGHT * config._oSettingsCasinoLogo.stepY);

        // _oMusicOnText
        _oMusicOnText.setX(NEW_WIDTH / 2);
        _oMusicOnText.setY(NEW_HEIGHT * 0.28);
        _oMusicOnText.setScale(GAME_SCALE * config._oMusicOnText.scale + 0.1);

        // _oMusicOffText
        _oMusicOffText.setX(_oMusicOnText.getX() + 130);
        _oMusicOffText.setY(NEW_HEIGHT * 0.28);
        _oMusicOffText.setScale(GAME_SCALE * config._oMusicOffText.scale + 0.1);

        // _oMusicText
        _oMusicText.setX(_oMusicOnText.getX() + config._oMusicText.stepY * GAME_SCALE);
        _oMusicText.setY(NEW_HEIGHT * 0.28);
        _oMusicText.setScale(GAME_SCALE * config._oMusicText.scale);

        // _oMusicToggleButton
        _oMusicToggleButton.setPosition(_oMusicOnText.getX() + 60, NEW_HEIGHT * 0.28);
        _oMusicToggleButton.setScale(GAME_SCALE * config._oMusicToggleButton.scale + 0.1);

    }

    this.show = function () {
        _oContainer.visible = true;
        _oControlContainer.visible = true;
        _oSettingsButBack.setVisible(true);
        _oSettingsButCross.setVisible(true);
        _oSettingsCasinoLogo.setVisible(true);
        _oSettingsTextLogo.setVisible(true);
    };

    this.unload = function () {
        _oSettingsButBack.unload();
        _oSettingsButCross.unload();
        _oMusicToggleButton.unload();
        _oBg.off("click", _oListener);
    };

    this._onMusicTogglePressed = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onCrossButtonReleased = function () {
        _oContainer.visible = false;
        _oControlContainer.visible = false;
        _oSettingsButBack.setVisible(false);
        _oSettingsButCross.setVisible(false);
        _oSettingsCasinoLogo.setVisible(false);
        _oSettingsTextLogo.setVisible(false);
    };

    this._onBackButtonReleased = function () {
        _oContainer.visible = false;
        _oControlContainer.visible = false;
        _oSettingsButBack.setVisible(false);
        _oSettingsButCross.setVisible(false);
        _oSettingsCasinoLogo.setVisible(false);
        _oSettingsTextLogo.setVisible(false);
    };

    _oParentContainer = oParentContainer;

    this._init();
}