function CCreditsPanel() {

    var _oBg;
    var _oButExit;
    var _oMsgText;
    var _oHitArea;
    var _oLink;
    var _oContainer;
    var _oListener;
    var _pStartPosExit;
    var msgText;

    this._init = function () {
        msgText = "The concept of playing craps is to roll a number (a point) with two dice and then " +
            "roll that same number again before a seven is rolled.The person at the craps table that" +
            "rolls the dice is called the “shooter”.\n\nWhen there is a number marked by the “pucks,” it" +
            "means that the number is the “point” of the game.This is the number that the shooter is" +
            "trying to make before seven rolls.\n\nIf the point is made,the puck is turned “off” and the" +
            "shooter shoots again.It is now a “come out roll.” A “come out roll” means that it is the" +
            "beginning of the game and there in no point established.\n\nIf the next number that rolls is" +
            "a 4, 5, 6, 8, 9 or 10,then that is the point of the game.The shooter again tries to shoot " +
            "the point before seven.If seven rolls before the point, we call that a “seven out.”" +
            "The shooter loses control of the dice and we give the dice to the next shooter.\n\nA new" +
            "shooter makes a point and then tries to make the point before a seven, just as the previous shooter.";


        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        // var oBgMenu = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        // _oContainer.addChild(oBgMenu);

        var oGraphics = new createjs.Graphics().beginFill("rgba(0,0,0,0.6)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade = new createjs.Shape(oGraphics);
        _oFade.x = 0;
        _oFade.y = 0;
        _oContainer.addChild(_oFade);
        _oListener = _oFade.on("click", function () { });

        // var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        var oSprite = s_oSpriteLibrary.getSprite('info_popup_base');
        _oBg = createBitmap(oSprite);
        _oBg.x = CANVAS_WIDTH / 2;
        _oBg.y = CANVAS_HEIGHT / 2;
        _oBg.regX = oSprite.width / 2;
        _oBg.regY = oSprite.height / 2;
        _oContainer.addChild(_oBg);

        // _oHitArea = new createjs.Shape();
        // _oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // _oHitArea.alpha = 0.01;
        // _oListener = _oHitArea.on("click", this._onLogoButRelease);
        // _oContainer.addChild(_oHitArea);

        var oSprite = s_oSpriteLibrary.getSprite('but_no');
        // _pStartPosExit = { x: CANVAS_WIDTH / 2 + 234, y: 254 };
        _pStartPosExit = { x: _oBg.x + 620, y: _oBg.y - 260 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);

        _oMsgText = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 590, 300, 1200, 450,
            46, "left", "#000", FONT_GEORGIA, 1,
            0, 0,
            msgText,
            true, true, true,
            false);

        // _oMsgText = new createjs.Text(languageService.getString("TEXT_CREDITS_DEVELOPED"), "26px Arial", "#ffffff");
        // _oMsgText = new createjs.Text(msgText, "26px Arial", "#ffffff");
        // _oMsgText.x = CANVAS_WIDTH / 2;
        // _oMsgText.y = 300;
        // _oMsgText.textAlign = "center";
        // _oContainer.addChild(_oMsgText);

        // oSprite = s_oSpriteLibrary.getSprite('craps_logo_big');
        // var oLogo = createBitmap(oSprite);
        // oLogo.regX = oSprite.width / 2;
        // oLogo.regY = oSprite.height / 2;
        // oLogo.x = CANVAS_WIDTH / 2;
        // oLogo.y = CANVAS_HEIGHT / 2;
        // _oContainer.addChild(oLogo);

        // _oLink = new createjs.Text(languageService.getString("TEXT_LINK"), "30px Arial", "#ffffff");
        // _oLink.x = CANVAS_WIDTH / 2;
        // _oLink.y = 444;
        // _oLink.textAlign = "center";
        // _oContainer.addChild(_oLink);
    };

    this.unload = function () {
        // _oHitArea.off("click", _oListener);

        _oButExit.unload();
        _oButExit = null;

        s_oStage.removeChild(_oContainer);
    };

    this._onLogoButRelease = function () {
        // window.open("http://www.codethislab.com/index.php?&l=en");
    };

    this._init();


};