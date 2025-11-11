function CMsgBox() {
    var _oBg;
    var _oMsgText;
    var _oMsgTextBack;
    var _oGroup;

    this._init = function () {

        // msg_box
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));

        // _oMsgTextBack
        _oMsgTextBack = new createjs.Text("", "34px " + FONT_RED_HAT_DISPLAY_REGULAR, "#000");
        _oMsgTextBack.textAlign = "center";
        _oMsgTextBack.lineWidth = 550;
        _oMsgTextBack.lineHeight = 50;
        _oMsgTextBack.textBaseline = "middle";

        // _oMsgText
        _oMsgText = new createjs.Text("", "34px " + FONT_RED_HAT_DISPLAY_REGULAR, "#ffffff");
        _oMsgText.textAlign = "center";
        _oMsgText.lineWidth = 550;
        _oMsgText.lineHeight = 50;
        _oMsgText.textBaseline = "middle";

        // _oGroup
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible = false;
        _oGroup.addChild(_oBg, _oMsgTextBack, _oMsgText);
        s_oGameCon.addChild(_oGroup);

    };
    this.resize = function () {

        let config = orientation_mode[getOrientation()].CMsgBox;

        // _oBg
        _oBg.x = NEW_WIDTH / 2 - _oBg.image.width / config._oBg.stepX * GAME_SCALE;
        _oBg.y = NEW_HEIGHT / 2 - _oBg.image.height / config._oBg.stepY * GAME_SCALE;
        _oBg.scaleX = GAME_SCALE * config._oBg.scale;
        _oBg.scaleY = GAME_SCALE * config._oBg.scale;

        // _oMsgTextBack
        _oMsgTextBack.x = NEW_WIDTH / 2;
        _oMsgTextBack.y = NEW_HEIGHT / 2;
        _oMsgTextBack.scaleX = GAME_SCALE;
        _oMsgTextBack.scaleY = GAME_SCALE;

        // _oMsgText
        _oMsgText.x = _oMsgTextBack.x;
        _oMsgText.y = _oMsgTextBack.y;
        _oMsgText.scaleX = GAME_SCALE;
        _oMsgText.scaleY = GAME_SCALE;

    }

    this.unload = function () {
        _oGroup.off("mousedown", this._onExit);
    };

    this._initListener = function () {
        _oGroup.on("mousedown", this._onExit);
    };

    this.show = function (szMsg) {
        _oMsgTextBack.text = szMsg;
        _oMsgText.text = szMsg;

        _oGroup.visible = true;

        var oParent = this;
        createjs.Tween.get(_oGroup).to({ alpha: 1 }, 500).call(function () { oParent._initListener(); });
        setTimeout(function () { oParent._onExit(); }, 3000);
    };

    this._onExit = function () {
        if (_oGroup.visible) {
            _oGroup.off("mousedown");
            _oGroup.visible = false;
        }

    };

    this._init();

    return this;
}