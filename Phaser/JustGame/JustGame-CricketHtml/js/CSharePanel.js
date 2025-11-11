function CSharePanel(oParentContainer) {

    var _oParentContainer;
    var _oGroup;
    var _oFade;
    var _oBg;
    var _headingText;

    var _whatsappButton;
    var _facebookButton;
    var _SharePanelExitButton;

    this._init = function() {

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oParentContainer.addChild(_oGroup);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.9;
        _oFade.on("click", function() {});
        _oGroup.addChild(_oFade);

        var oSpriteBg = s_oSpriteLibrary.getSprite('share_popup');
        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;
        _oGroup.addChild(_oBg);

        _headingText = new createjs.Text(TEXT_SHARE, " 40px " + TondoRG, "#ffffff");
        _headingText.x = CANVAS_WIDTH_HALF;
        _headingText.y = (CANVAS_HEIGHT_HALF) - 180;
        _headingText.textAlign = "center";
        _headingText.textBaseline = "middle";
        _headingText.lineWidth = 450;
        _oGroup.addChild(_headingText);

        _whatsappButton = new CGfxButton(CANVAS_WIDTH_HALF - 100, CANVAS_HEIGHT_HALF, s_oSpriteLibrary.getSprite('whatsapp_button'), _oGroup);
        _whatsappButton.addEventListener(ON_MOUSE_UP, this._whatsappButtonPressed, this);

        _facebookButton = new CGfxButton(CANVAS_WIDTH_HALF + 100, CANVAS_HEIGHT_HALF, s_oSpriteLibrary.getSprite('facebook_button'), _oGroup);
        _facebookButton.addEventListener(ON_MOUSE_UP, this.__facebookButtonPressed, this);

        _SharePanelExitButton = new CGfxButton(CANVAS_WIDTH_HALF + 200, CANVAS_HEIGHT_HALF - 190, s_oSpriteLibrary.getSprite('share_popup_cross'), _oGroup);
        _SharePanelExitButton.addEventListener(ON_MOUSE_UP, this._SharePanelExitButtonPressed, this);

    };

    this.unload = function() {
        createjs.Tween.get(_oGroup).to({ alpha: 0 }, 150, createjs.quartOut).call(function() {
           
        });
    };

    this.show = function(iScore) {
        playSound("buzzer", 1, false);
        createjs.Tween.get(_oGroup).to({ alpha: 1 }, 150, createjs.quartOut).call(function() {});
    };

    this._SharePanelExitButtonPressed = function() {
       
        s_oStage.removeAllChildren();
        _oFade.removeAllEventListeners();
        s_oMenu = new CMenu();
    };

    this._whatsappButtonPressed = function() {
        //WhatsApp
        if (s_bMobile == true) {
            //for device

            window.open("myairtel://share_social?type=whatsapp&message=I%20just%20played%20Airtel%20Cricket%20Bonanza%20and%20won%20amazing%20rewards.%20Play%20to%20win%20now&subject=&link=http://www.airtel.in/5/cricketBonanza","_blank");
            //window.open('whatsapp://send?text=' + "I just played Airtel Cricket Bonanza and won amazing rewards. Play to win now " + "http://www.airtel.in/5/cricketBonanza/");
		} else {
            window.open("myairtel://share_social?type=whatsapp&message=I%20just%20played%20Airtel%20Cricket%20Bonanza%20and%20won%20amazing%20rewards.%20Play%20to%20win%20now&subject=&link=http://www.airtel.in/5/cricketBonanza","_blank");
            //for desktop
            //window.open('https://wa.me/?text=' + "I just played Airtel Cricket Bonanza and won amazing rewards. Play to win now " + "http://www.airtel.in/5/cricketBonanza/");
		}
    };

    this.__facebookButtonPressed = function() {
        // window.open('http://www.facebook.com/sharer/sharer.php?s=100&p[title]=' + "Test" + '&p[summary]=' + "I just played Airtel Cricket Bonanza and won amazing rewards. Play to win now " + '&u=' + "http://www.airtel.in/5/cricketBonanza/" +
        //     '&p[images][0]=' + "", 'sharer', 'top=' + 100 + ',left=' + 100 + ',toolbar=0,status=0,width=' + 100 + ',height=' + 100);
        window.open("myairtel://share_social?type=fbMessenger&message=I%20just%20played%20Airtel%20Cricket%20Bonanza%20and%20won%20amazing%20rewards.%20Play%20to%20win%20now&subject=&link=http://www.airtel.in/5/cricketBonanza","_blank");
    };

    _oParentContainer = oParentContainer;

    this._init();

    return this;
}