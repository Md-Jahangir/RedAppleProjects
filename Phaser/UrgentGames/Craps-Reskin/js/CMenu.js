function CMenu() {
    var _pStartPosPlay;

    var _oBg;
    var _oButPlay;
    var _oFade;

    this._init = function() {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('craps_logo_big');
        _oCrapsLogo = createBitmap(oSprite);
        _pStartPosCrapsLogo = { x: (CANVAS_WIDTH / 2 - 16), y: CANVAS_HEIGHT / 2 - 38 };
        _oCrapsLogo.x = _pStartPosCrapsLogo.x;
        _oCrapsLogo.y = _pStartPosCrapsLogo.y;
        _oCrapsLogo.regX = oSprite.width / 2;
        _oCrapsLogo.regY = oSprite.height / 2;
        s_oStage.addChild(_oCrapsLogo);

        //Play button
        var oSprite = s_oSpriteLibrary.getSprite('but_play_base');
        _pStartPosPlay = { x: (CANVAS_WIDTH / 2), y: CANVAS_HEIGHT - 110 };
        _oButPlay = new CTextButton(_pStartPosPlay.x, _pStartPosPlay.y, oSprite, languageService.getString("TEXT_PLAY"), FONT_SEMI_BOLD, "#000", 20, "center", s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({ alpha: 0 }, 400).call(function() { _oFade.visible = false; });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function(iNewX, iNewY) {
        _oButPlay.setPosition(_pStartPosPlay.x, _pStartPosPlay.y - iNewY);
        this.setPositionOfObjects(_oCrapsLogo, _pStartPosCrapsLogo.x, _pStartPosCrapsLogo.y);
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