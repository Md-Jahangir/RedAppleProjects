function CAreYouSurePanel(oParentContainer) {
    var _oListener;
    var _oMsg;
    var _oButYes;
    var _oButNo;
    var _oBg;
    var _oContainer;
    var _oParentContainer;

    this._init = function() {
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);

        var oMsgBox = s_oSpriteLibrary.getSprite('msg_box');
        _oBg = createBitmap(oMsgBox);
        _oBg.x = CANVAS_WIDTH / 2;
        _oBg.y = CANVAS_HEIGHT / 2;
        _oBg.regX = oMsgBox.width * 0.5;
        _oBg.regY = oMsgBox.height * 0.5;
        _oContainer.addChild(_oBg);

        _oListener = _oBg.on("click", function() {});

        _oMsg = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 190, CANVAS_HEIGHT * 0.5 - 80, 480, 80,
            30, "center", "#fff", FONT1, 1,
            0, 0,
            languageService.getString("TEXT_ARE_SURE"),
            true, true, true,
            false);

        _oButYes = new CTextButton(CANVAS_WIDTH / 2 + 140, 410, s_oSpriteLibrary.getSprite('but_bg'), languageService.getString("TEXT_YES"), FONT1, "#000", 14, "center", s_oStage);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        _oContainer.addChild(_oButYes.getSprite());

        _oButNo = new CTextButton(CANVAS_WIDTH / 2 - 60, 410, s_oSpriteLibrary.getSprite('but_bg'), languageService.getString("TEXT_NO"), FONT1, "#000", 14, "center", s_oStage);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        _oContainer.addChild(_oButNo.getSprite());
    };


    this.show = function() {
        _oContainer.visible = true;
    };

    this.unload = function() {
        _oButNo.unload();
        _oButYes.unload();
        _oBg.off("click", _oListener);
    };

    this._onButYes = function() {
        this.unload();

        playSound("click", 1, false);
        s_oGame.onConfirmExit();
    };

    this._onButNo = function() {
        playSound("click", 1, false);
        _oContainer.visible = false;
    };

    _oParentContainer = oParentContainer;

    this._init();
}