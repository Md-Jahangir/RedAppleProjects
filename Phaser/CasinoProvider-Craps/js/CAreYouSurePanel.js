function CAreYouSurePanel(oParentContainer) {
    var _oListener;
    var _oMsg;
    var _oButYes;
    var _oButNo;
    var _oBg;
    var _oContainer;
    var _oParentContainer;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);

        var oGraphics = new createjs.Graphics().beginFill("rgba(0,0,0,0.6)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade = new createjs.Shape(oGraphics);
        _oFade.x = 0;
        _oFade.y = 0;
        _oContainer.addChild(_oFade);
        _oListener = _oFade.on("click", function () { });

        // var oMsgBox = s_oSpriteLibrary.getSprite('msg_box');
        var oMsgBox = s_oSpriteLibrary.getSprite('popup_base');
        _oBg = createBitmap(oMsgBox);
        _oBg.x = CANVAS_WIDTH / 2;
        _oBg.y = CANVAS_HEIGHT / 2;
        _oBg.regX = oMsgBox.width * 0.5;
        _oBg.regY = oMsgBox.height * 0.5;

        // _oBg.scaleX = 1;
        // _oBg.scaleY = 0.5;
        _oContainer.addChild(_oBg);

        _oListener = _oBg.on("click", function () { });

        _oMsg = new CTLText(_oContainer,
            // CANVAS_WIDTH / 2 - 240, CANVAS_HEIGHT * 0.5 - 80, 500, 150,
            _oBg.x - 245, _oBg.y - 200, 500, 220,
            40, "center", "#000", FONT_GEORGIA, 1,
            0, 0,
            languageService.getString("TEXT_ARE_SURE"),
            true, true, true,
            false);

        // _oButYes = new CTextButton(CANVAS_WIDTH / 2 + 140, 410, s_oSpriteLibrary.getSprite('but_bg'), languageService.getString("TEXT_YES"), FONT_GEORGIA, "#000", 14, "center", s_oStage);
        _oButYes = new CGfxButton(_oBg.x + 145, _oBg.y + 170, s_oSpriteLibrary.getSprite('but_yes'), _oContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        // _oContainer.addChild(_oButYes.getSprite());

        // _oButNo = new CTextButton(CANVAS_WIDTH / 2 - 60, 410, s_oSpriteLibrary.getSprite('but_bg'), languageService.getString("TEXT_NO"), FONT_GEORGIA, "#000", 14, "center", s_oStage);
        _oButNo = new CGfxButton(_oBg.x - 145, _oBg.y + 170, s_oSpriteLibrary.getSprite('but_no'), _oContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        // _oContainer.addChild(_oButNo.getSprite());
    };


    this.show = function () {
        _oContainer.visible = true;
    };

    this.unload = function () {
        _oButNo.unload();
        _oButYes.unload();
        _oBg.off("click", _oListener);
    };

    this._onButYes = function () {
        this.unload();

        playSound("click", 1, false);
        s_oGame.onConfirmExit();
    };

    this._onButNo = function () {
        playSound("click", 1, false);
        _oContainer.visible = false;
    };

    _oParentContainer = oParentContainer;

    this._init();
}