function CAlertPopup() {
    var _oTitle;
    var _oPopupBg;
    var _oFade;
    var _oGroup;
    var _oOkButton;


    this._init = function() {
        _oGroup = new createjs.Container();
        s_oStage.addChild(_oGroup);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.6;
        _oFade.mouseEnabled = true;
        _oFade.addEventListener("click", function() {});
        _oGroup.addChild(_oFade);

        var oSprite = s_oSpriteLibrary.getSprite('alert_box');
        _oPopupBg = createBitmap(oSprite);
        _oPopupBg.x = CANVAS_WIDTH_HALF;
        _oPopupBg.y = CANVAS_HEIGHT_HALF;
        _oPopupBg.regX = oSprite.width * 0.5;
        _oPopupBg.regY = oSprite.height * 0.5;
        _oGroup.addChild(_oPopupBg);

        _oTitle = new createjs.Text(ALERT_TEXT, "35px " + TondoRG, "#000000");
        _oTitle.textAlign = "center";
        _oTitle.lineWidth = 500;
        _oTitle.x = CANVAS_WIDTH * 0.5;
        _oTitle.y = CANVAS_HEIGHT * 0.5 - 75;
        _oGroup.addChild(_oTitle);

        var oSpriteOk = s_oSpriteLibrary.getSprite('play_button_base');
        _oOkButton = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT_HALF + 100, oSpriteOk, _oGroup);
        _oOkButton.addEventListener(ON_MOUSE_UP, this.OkButtonPressed, this);

        _oOkButtonText = new createjs.Text("OK", "35px Tondo Regular", "#ffffff");
        _oOkButtonText.x = (CANVAS_WIDTH / 2);
        _oOkButtonText.y = CANVAS_HEIGHT / 2 + 98;
        _oOkButtonText.textAlign = "center";
        _oOkButtonText.textBaseline = "alphabetic";
        _oGroup.addChild(_oOkButtonText);

    };

    this.unload = function() {
        createjs.Tween.get(_oGroup).to({ alpha: 0 }, 500, createjs.Ease.cubicIn).call(function() {
            s_oStage.removeChild(_oGroup);
        });
    };

    this.OkButtonPressed = function() {
        this.unload();
    };


    this._init();

    return this;
}