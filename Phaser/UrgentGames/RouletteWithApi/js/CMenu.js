function CMenu() {
    var _pStartPosAudio;
    var _pStartPosInfo;
    var _pStartPosPlay;
    var _pStartPosFullscreen;
    var _pStartPosLogo;

    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oBg;
    var _oLogo;
    var _oButPlay;
    var _oButInfo;
    var _oAudioToggle;
    var _oFade;


    this._init = function() {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_play_bg');
        _pStartPosPlay = { x: Math.round((CANVAS_WIDTH / 2)), y: (Math.round(CANVAS_HEIGHT - 180)) };
        _oButPlay = new CTextButton(_pStartPosPlay.x, _pStartPosPlay.y, oSprite, TEXT_PLAY, FONT_SEMI_BOLD, "#001755", 28);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        var oSprite = s_oSpriteLibrary.getSprite("roulette_game_logo_menu");
        _pStartPosLogo = { x: CANVAS_WIDTH / 2, y: Math.round(CANVAS_HEIGHT / 2.2) };
        _oLogo = createBitmap(oSprite);
        _oLogo.regX = oSprite.width / 2;
        _oLogo.regY = oSprite.height / 2;
        _oLogo.x = _pStartPosLogo.x;
        _oLogo.y = _pStartPosLogo.y;
        s_oStage.addChild(_oLogo);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({ alpha: 0 }, 400).call(function() { _oFade.visible = false; });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function(iNewX, iNewY) {
        _oButPlay.setPosition(_pStartPosPlay.x, _pStartPosPlay.y);
        this.setPositionOfObjects(_oLogo, _pStartPosLogo.x, _pStartPosLogo.y);
    };

    this.setPositionOfObjects = function(_refObject, _posX, _posY) {
        _refObject.x = _posX;
        _refObject.y = _posY;
    };

    this.unload = function() {
        _oButPlay.unload();
        _oButPlay = null;

        s_oStage.removeChild(_oBg);
        _oBg = null;

        s_oStage.removeChild(_oFade);
        _oFade = null;
        s_oMenu = null;
    };

    this._onButPlayRelease = function() {
        this.unload();
        s_oMain.gotoGame();

        $(s_oMain).trigger("start_session");
    };

    s_oMenu = this;

    this._init();
}

var s_oMenu = null;