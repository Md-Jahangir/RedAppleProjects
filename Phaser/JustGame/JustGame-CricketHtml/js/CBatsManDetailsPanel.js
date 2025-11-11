function CBatsManDetailsPanel(oParentContainer) {

    var _oParentContainer;
    var _oGroup;
    var _oFade;
    var _oBg;
    var _headingText;
    var _headingTextUnderline;
    var _nameHeadingText;
    var _statusHeadingText;
    var _scoreHeadingText;
    var _4sHeadingText;
    var _6sHeadingText;
    var _nameHeadingTextUnderline;
    var _batsmanDetailsExitButton;

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

        _headingText = new createjs.Text(TEXT_BATSMAN_DETAILS, " 40px " + FONT2, "#ffffff");
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

        _statusHeadingText = new createjs.Text(TEXT_STATUS, " 25px " + FONT2, "#ffffff");
        _statusHeadingText.x = CANVAS_WIDTH_HALF - 50;
        _statusHeadingText.y = (CANVAS_HEIGHT_HALF) - 330;
        _statusHeadingText.textAlign = "center";
        _statusHeadingText.textBaseline = "middle";
        _statusHeadingText.lineWidth = 450;
        _oGroup.addChild(_statusHeadingText);

        _scoreHeadingText = new createjs.Text(TEXT_SCORE, " 25px " + FONT2, "#ffffff");
        _scoreHeadingText.x = CANVAS_WIDTH_HALF + 90;
        _scoreHeadingText.y = (CANVAS_HEIGHT_HALF) - 330;
        _scoreHeadingText.textAlign = "center";
        _scoreHeadingText.textBaseline = "middle";
        _scoreHeadingText.lineWidth = 450;
        _oGroup.addChild(_scoreHeadingText);

        _4sHeadingText = new createjs.Text(TEXT_NUM_4, " 25px " + FONT2, "#ffffff");
        _4sHeadingText.x = CANVAS_WIDTH_HALF + 200;
        _4sHeadingText.y = (CANVAS_HEIGHT_HALF) - 330;
        _4sHeadingText.textAlign = "center";
        _4sHeadingText.textBaseline = "middle";
        _4sHeadingText.lineWidth = 450;
        _oGroup.addChild(_4sHeadingText);

        _6sHeadingText = new createjs.Text(TEXT_NUM_6, " 25px " + FONT2, "#ffffff");
        _6sHeadingText.x = CANVAS_WIDTH_HALF + 290;
        _6sHeadingText.y = (CANVAS_HEIGHT_HALF) - 330;
        _6sHeadingText.textAlign = "center";
        _6sHeadingText.textBaseline = "middle";
        _6sHeadingText.lineWidth = 450;
        _oGroup.addChild(_6sHeadingText);

        _nameHeadingTextUnderline = createBitmap(oSpriteUnderline);
        _nameHeadingTextUnderline.x = CANVAS_WIDTH_HALF - 360;
        _nameHeadingTextUnderline.y = CANVAS_HEIGHT_HALF - 310;
        _nameHeadingTextUnderline.scaleX = 720;
        _nameHeadingTextUnderline.scaleY = 2;
        _oGroup.addChild(_nameHeadingTextUnderline);

        _batsmanDetailsExitButton = new CGfxButton(CANVAS_WIDTH_HALF + 325, CANVAS_HEIGHT_HALF - 400, s_oSpriteLibrary.getSprite('but_exit'), _oGroup);
        _batsmanDetailsExitButton.addEventListener(ON_MOUSE_UP, this._BatsmanDetailsExitButtonPressed, this);

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

    this._BatsmanDetailsExitButtonPressed = function() {
        s_oGame.pause(false);
        this.unload();
        _oFade.removeAllEventListeners();
    };

    _oParentContainer = oParentContainer;

    this._init();

    return this;
}