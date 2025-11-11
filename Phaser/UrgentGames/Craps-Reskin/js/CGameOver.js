function CGameOver() {
    var _oTextTitle;
    var _oTextMsg;
    var _ButRecharge;
    var _oButExit;
    var _oContainer;

    this._init = function() {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        oBg.x = 345;
        oBg.y = 280;
        _oContainer.addChild(oBg);

        _oTextTitle = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 170, 310, 480, 72,
            22, "center", "#fff", FONT1, 1,
            0, 0,
            languageService.getString("TEXT_NO_MONEY"),
            true, true, true,
            false);

        _oTextMsg = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 118, 360, 380, 40,
            14, "center", "#fff", FONT1, 1,
            0, 0,
            languageService.getString("TEXT_RECHARGE_MSG"),
            true, true, true,
            false);


        _ButRecharge = new CTextButton(CANVAS_WIDTH / 2 + 170, 420, s_oSpriteLibrary.getSprite('but_bg'), languageService.getString("TEXT_RECHARGE"), FONT1, "#000", 14, "center", s_oStage);
        _ButRecharge.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
        _oContainer.addChild(_ButRecharge.getSprite());

        _oButExit = new CTextButton(CANVAS_WIDTH / 2 - 30, 420, s_oSpriteLibrary.getSprite('but_bg'), languageService.getString("TEXT_EXIT"), FONT1, "#000", 14, "center", s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        _oContainer.addChild(_oButExit.getSprite());

        this.hide();
    };

    this.unload = function() {
        _ButRecharge.unload();
        _oButExit.unload();
    };

    this.show = function() {
        _oContainer.visible = true;
    };

    this.hide = function() {
        _oContainer.visible = false;
    };

    this._onRecharge = function() {
        $(s_oMain).trigger("recharge");
    };

    this._onExit = function() {
        s_oGame.onExit(true);
    };

    this._init();
}