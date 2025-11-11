function CGameOver() {
    var _oTextTitle;
    var _oTextMsg;
    var _ButRecharge;
    var _oButExit;
    var _oContainer;

    this._init = function () {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oGraphics = new createjs.Graphics().beginFill("rgba(0,0,0,0.6)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade = new createjs.Shape(oGraphics);
        _oFade.x = 0;
        _oFade.y = 0;
        _oContainer.addChild(_oFade);
        _oListener = _oFade.on("click", function () { });



        // var oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        // var oBg = createBitmap(s_oSpriteLibrary.getSprite('popup_base'));
        // oBg.x = 345;
        // oBg.y = 280;
        var oMsgBox = s_oSpriteLibrary.getSprite('popup_base');
        var oBg = createBitmap(oMsgBox);
        oBg.x = CANVAS_WIDTH / 2;
        oBg.y = CANVAS_HEIGHT / 2;
        oBg.regX = oMsgBox.width * 0.5;
        oBg.regY = oMsgBox.height * 0.5;

        _oContainer.addChild(oBg);

        _oTextTitle = new CTLText(_oContainer,
            // CANVAS_WIDTH / 2 - 170, 310, 480, 72,
            oBg.x - 250, oBg.y - 230, 510, 200,
            38, "center", "#000", FONT_GEORGIA, 1,
            0, 0,
            languageService.getString("TEXT_NO_MONEY"),
            true, true, true,
            false);

        _oTextMsg = new CTLText(_oContainer,
            // CANVAS_WIDTH / 2 - 118, 360, 380, 40,
            oBg.x - 245, oBg.y - 70, 500, 110,
            30, "center", "#000", FONT_GEORGIA, 1,
            0, 0,
            languageService.getString("TEXT_RECHARGE_MSG"),
            true, true, true,
            false);


        // _ButRecharge = new CTextButton(CANVAS_WIDTH / 2 + 170, 420, s_oSpriteLibrary.getSprite('but_bg'), languageService.getString("TEXT_RECHARGE"), FONT_GEORGIA, "#000", 14, "center", s_oStage);
        _ButRecharge = new CGfxButton(oBg.x + 145, oBg.y + 170, s_oSpriteLibrary.getSprite('but_rechange'), _oContainer);
        _ButRecharge.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
        // _oContainer.addChild(_ButRecharge.getSprite());

        // _oButExit = new CTextButton(CANVAS_WIDTH / 2 - 30, 420, s_oSpriteLibrary.getSprite('but_bg'), languageService.getString("TEXT_EXIT"), FONT_GEORGIA, "#000", 14, "center", s_oStage);
        _oButExit = new CGfxButton(oBg.x - 145, oBg.y + 170, s_oSpriteLibrary.getSprite('but_no'), _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        // _oContainer.addChild(_oButExit.getSprite());

        this.hide();
    };

    this.unload = function () {
        _ButRecharge.unload();
        _oButExit.unload();
    };

    this.show = function () {
        _oContainer.visible = true;
    };

    this.hide = function () {
        _oContainer.visible = false;
    };

    this._onRecharge = function () {
        $(s_oMain).trigger("recharge");
    };

    this._onExit = function () {
        s_oGame.onExit(true);
    };

    this._init();
}