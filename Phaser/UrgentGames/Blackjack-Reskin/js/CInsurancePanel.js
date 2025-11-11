function CInsurancePanel() {
    var _oButNo;
    var _oButYes;
    var _oMsgText;
    var _oContainer;
    var oBg;
    var resultCallback = null;

    this._init = function () {

        // _oContainer
        _oContainer = new createjs.Container();
        s_oGameCon.addChild(_oContainer);
        _oContainer.visible = false;

        // oBg
        oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oContainer.addChild(oBg);

        // _oMsgText
        _oMsgText = new createjs.Text("", "50px " + FONT_GAME_1, "#fff");
        _oMsgText.lineWidth = 500;
        _oMsgText.textAlign = "center";
        _oContainer.addChild(_oMsgText);

        // _oButNo
        var oSprite = s_oSpriteLibrary.getSprite('but_deal_select_bg');
        _oButNo = new CTextButton(0, 0, oSprite, languageService.getString("textNo"), FONT_GAME_1, "#8f6bc1", 20, _oContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNoRelease, this);

        // _oButYes
        _oButYes = new CTextButton(0, 0, oSprite, languageService.getString("textYes"), FONT_GAME_1, "#8f6bc1", 20, _oContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYesRelease, this);

    };

    this.resize = function () {
        let config = orientation_mode[getOrientation()].CInsurancePanel;

        // oBg
        oBg.x = NEW_WIDTH / 2 - oBg.image.width / config.oBg.stepX * GAME_SCALE;
        oBg.y = NEW_HEIGHT / 2 - oBg.image.height / config.oBg.stepY * GAME_SCALE;
        oBg.scaleX = GAME_SCALE * config.oBg.scale;
        oBg.scaleY = GAME_SCALE * config.oBg.scale;

        // _oMsgText
        _oMsgText.x = NEW_WIDTH / 2;
        _oMsgText.y = NEW_HEIGHT / 2;
        _oMsgText.scaleX = GAME_SCALE * config._oMsgText.scale;
        _oMsgText.scaleY = GAME_SCALE * config._oMsgText.scale;

        // _oButNo
        _oButNo.setScale(GAME_SCALE * config._oButNo.scale)
        _oButNo.setPosition(NEW_WIDTH / 2 + config._oButNo.stepX * GAME_SCALE, NEW_HEIGHT / 2 + config._oButNo.stepY * GAME_SCALE)

        // _oButYes
        _oButYes.setScale(GAME_SCALE * config._oButYes.scale)
        _oButYes.setPosition(NEW_WIDTH / 2 + config._oButYes.stepX * GAME_SCALE, NEW_HEIGHT / 2 + config._oButYes.stepY * GAME_SCALE)
    }

    this.unload = function () {
        s_oGameCon.removeChild(_oContainer);
    };

    this.show = function (szMsg, callback) {
        _oMsgText.text = szMsg;
        _oContainer.visible = true;
        resultCallback = callback;
    };

    this._onButNoRelease = function () {
        _oContainer.visible = false;
        if (resultCallback) {
            resultCallback(true, false);
        }
    };

    this._onButYesRelease = function () {
        _oContainer.visible = false;
        s_oGame.onBuyInsurance()
        if (resultCallback) {
            resultCallback(true, true);
        }
    };

    this._init();
}