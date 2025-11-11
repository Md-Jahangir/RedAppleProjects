function CBowlersDetailsPanel(oParentContainer) {

    var _oParentContainer;
    var _oGroup;
    var _oFade;
    var _oBg;
    var _headingText;
    var _headingTextUnderline;
    var _nameHeadingText;
    var _overHeadingText;
    var _runHeadingText;
    var _wicketHeadingText;
    var _nameHeadingTextUnderline;
    var _bowlersDetailsExitButton;

    this._init = function() {

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oParentContainer.addChild(_oGroup);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;
        _oFade.on("click", function() {});
        _oGroup.addChild(_oFade);

        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF + 25;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;
        _oBg.scaleX = 1.5;
        _oBg.scaleY = 1.8;
        _oGroup.addChild(_oBg);

        _headingText = new createjs.Text(TEXT_BOWLERS_DETAILS, " 40px " + FONT2, "#ffffff");
        _headingText.x = CANVAS_WIDTH_HALF;
        _headingText.y = (CANVAS_HEIGHT_HALF) - 400;
        _headingText.textAlign = "center";
        _headingText.textBaseline = "middle";
        _headingText.lineWidth = 450;
        _oGroup.addChild(_headingText);

        var oSpriteUnderline = s_oSpriteLibrary.getSprite('one_pixel');
        _headingTextUnderline = createBitmap(oSpriteUnderline);
        _headingTextUnderline.x = CANVAS_WIDTH_HALF - 200;
        _headingTextUnderline.y = CANVAS_HEIGHT_HALF - 380;
        _headingTextUnderline.scaleX = 400;
        _headingTextUnderline.scaleY = 5;
        _oGroup.addChild(_headingTextUnderline);

        _nameHeadingText = new createjs.Text(TEXT_NAME, " 25px " + FONT2, "#ffffff");
        _nameHeadingText.x = CANVAS_WIDTH_HALF - 260;
        _nameHeadingText.y = (CANVAS_HEIGHT_HALF) - 330;
        _nameHeadingText.textAlign = "center";
        _nameHeadingText.textBaseline = "middle";
        _nameHeadingText.lineWidth = 450;
        _oGroup.addChild(_nameHeadingText);

        _overHeadingText = new createjs.Text(TEXT_OVER, " 25px " + FONT2, "#ffffff");
        _overHeadingText.x = CANVAS_WIDTH_HALF - 50;
        _overHeadingText.y = (CANVAS_HEIGHT_HALF) - 330;
        _overHeadingText.textAlign = "center";
        _overHeadingText.textBaseline = "middle";
        _overHeadingText.lineWidth = 450;
        _oGroup.addChild(_overHeadingText);

        _runHeadingText = new createjs.Text(TEXT_RUN, " 25px " + FONT2, "#ffffff");
        _runHeadingText.x = CANVAS_WIDTH_HALF + 90;
        _runHeadingText.y = (CANVAS_HEIGHT_HALF) - 330;
        _runHeadingText.textAlign = "center";
        _runHeadingText.textBaseline = "middle";
        _runHeadingText.lineWidth = 450;
        _oGroup.addChild(_runHeadingText);

        _wicketHeadingText = new createjs.Text(TEXT_WICKET, " 25px " + FONT2, "#ffffff");
        _wicketHeadingText.x = CANVAS_WIDTH_HALF + 250;
        _wicketHeadingText.y = (CANVAS_HEIGHT_HALF) - 330;
        _wicketHeadingText.textAlign = "center";
        _wicketHeadingText.textBaseline = "middle";
        _wicketHeadingText.lineWidth = 450;
        _oGroup.addChild(_wicketHeadingText);

        // _6sHeadingText = new createjs.Text(TEXT_NUM_6, " 25px " + FONT2, "#ffffff");
        // _6sHeadingText.x = CANVAS_WIDTH_HALF + 290;
        // _6sHeadingText.y = (CANVAS_HEIGHT_HALF) - 330;
        // _6sHeadingText.textAlign = "center";
        // _6sHeadingText.textBaseline = "middle";
        // _6sHeadingText.lineWidth = 450;
        // _oGroup.addChild(_6sHeadingText);

        _nameHeadingTextUnderline = createBitmap(oSpriteUnderline);
        _nameHeadingTextUnderline.x = CANVAS_WIDTH_HALF - 360;
        _nameHeadingTextUnderline.y = CANVAS_HEIGHT_HALF - 310;
        _nameHeadingTextUnderline.scaleX = 720;
        _nameHeadingTextUnderline.scaleY = 2;
        _oGroup.addChild(_nameHeadingTextUnderline);

        _bowlersDetailsExitButton = new CGfxButton(CANVAS_WIDTH_HALF + 325, CANVAS_HEIGHT_HALF - 400, s_oSpriteLibrary.getSprite('but_exit'), _oGroup);
        _bowlersDetailsExitButton.addEventListener(ON_MOUSE_UP, this._bowlersDetailsExitButton, this);

    };

    this.unload = function() {
        createjs.Tween.get(_oGroup).to({ alpha: 0 }, 150, createjs.quartOut).call(function() {
            _oParentContainer.removeChild(_oGroup, _oFade);
        });
    };

    this.show = function(iScore) {
        playSound("buzzer", 1, false);
        createjs.Tween.get(_oGroup).to({ alpha: 1 }, 150, createjs.quartOut).call(function() {
            s_oGame.pause(true);
        });
    };

    this._bowlersDetailsExitButton = function() {
        s_oGame.pause(false);
        this.unload();
        _oFade.removeAllEventListeners();
    };

    _oParentContainer = oParentContainer;

    this._init();

    return this;
}