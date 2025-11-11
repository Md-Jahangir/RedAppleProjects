var howToPlayBg;
var howToPlayHeaderRect;
var howToPlayAirtelLogo;
var howToPlayHomeRect;
var howToPlayHomeImage;
var howToPlayHomeText;
var howToPlayText;
var howtoplayRectangle1;
var howtoplayRectangle2;
var howtoplayRectangle3;
var howToPlayStartGameRect;
var howToPlayStartGameText1;
var howtoplayStep1Text;
var howtoplayStep2Text;
var howtoplayStep3Text;
var howtoplayStep1BoldText;
var howtoplayStep2BoldText;
var howtoplayStep3BoldText;

function CHowToPlay() {
    var _oBg;
    var _oLogo;
    var _oButPlay;
    var _oFade;
    var _oAudioToggle;
    var _oButInfo;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    var _pStartPosAudio;
    var _pStartPosInfo;
    var _pStartPosFullscreen;

    var menuBgRect;


    this._init = function() {

        howToPlayBg = createBitmap(s_oSpriteLibrary.getSprite('howToBg'));
        howToPlayBg.x = 0;
        howToPlayBg.y = 0;
        howToPlayBg.regX = 0.5;
        howToPlayBg.regY = 0.5;
        howToPlayBg.mouseEnabled = true;
        howToPlayBg.addEventListener("click", function() {});

        howToPlayHeaderRect = this.CreateRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT - 1244, 1, 1, 1, 1, '#ffffff', 1);
        howToPlayHeaderRect.shadow = new createjs.Shadow("#000000", -0, -1, 8);

        howToPlayAirtelLogo = createBitmap(s_oSpriteLibrary.getSprite('airtel'));
        howToPlayAirtelLogo.x = 54;
        howToPlayAirtelLogo.y = CANVAS_HEIGHT - (CANVAS_HEIGHT - (2 * 13));

        howToPlayHomeRect = this.CreateRect(CANVAS_WIDTH / 2 + 130, CANVAS_HEIGHT / 2 - 645, 200, 50, 10, 10, 10, 10, 'red', 1);
        howToPlayHomeRect.regX = 0.5;
        howToPlayHomeRect.regY = 0.5;
        howToPlayHomeRect.mouseEnabled;
        howToPlayHomeRect.addEventListener("click", this.howToPlayHomeRectPressed);

        howToPlayHomeImage = createBitmap(s_oSpriteLibrary.getSprite('home'));
        howToPlayHomeImage.x = CANVAS_WIDTH / 2 + 140;
        howToPlayHomeImage.y = CANVAS_HEIGHT / 2 - 635;
        howToPlayHomeImage.regX = 0.5;
        howToPlayHomeImage.regY = 0.5;

        howToPlayHomeText = new createjs.Text("Home", "20px Tondo_Std_Bd", "#ffffff");
        howToPlayHomeText.x = CANVAS_WIDTH / 2 + 205;
        howToPlayHomeText.y = CANVAS_HEIGHT / 2 - 630;
        howToPlayHomeText.regX = 0.5;
        howToPlayHomeText.regY = 0.5;

        howToPlayText = new createjs.Text("How To Play", "48px Tondo_Std_Bd", "#000000");
        howToPlayText.x = CANVAS_WIDTH / 2 - 135;
        howToPlayText.y = CANVAS_HEIGHT / 2 - 455;
        howToPlayText.regX = 0.5;
        howToPlayText.regY = 0.5;

        howToPlayBackText = createBitmap(s_oSpriteLibrary.getSprite('back'));
        howToPlayBackText.x = CANVAS_WIDTH / 2 - 325;
        howToPlayBackText.y = CANVAS_HEIGHT / 2 - 545;
        howToPlayBackText.regX = 0.5;
        howToPlayBackText.regY = 0.5;
        howToPlayBackText.mouseEnabled = true;
        howToPlayBackText.addEventListener("click", this.unload);

        howToPlayStartGameRect = this.CreateRect(CANVAS_WIDTH / 2 - 295, CANVAS_HEIGHT / 2 + 540, 600, 60, 10, 10, 10, 10, 'red', 1);
        howToPlayStartGameRect.regX = 0.5;
        howToPlayStartGameRect.regY = 0.5;
        howToPlayStartGameRect.mouseEnabled = true;
        howToPlayStartGameRect.addEventListener("click", this.unload);

        howToPlayStartGameText = new createjs.Text("Start Game", "32px Tondo_Std_Bd", "#ffffff");
        howToPlayStartGameText.x = CANVAS_WIDTH / 2 - 80;
        howToPlayStartGameText.y = CANVAS_HEIGHT / 2 + 555;
        howToPlayStartGameText.regX = 0.5;
        howToPlayStartGameText.regY = 0.5;

        howtoplayStep1BoldText = new createjs.Text("•  Step 1: Hit it Out of the Park", "28px Tondo_Std_Bd", "#000000");
        howtoplayStep1BoldText.x = CANVAS_WIDTH / 2;
        howtoplayStep1BoldText.y = CANVAS_HEIGHT / 2 - 310;
        howtoplayStep1BoldText.regX = 0.5;
        howtoplayStep1BoldText.regY = 0.5;
        howtoplayStep1BoldText.textAlign = "center";
        howtoplayStep1BoldText.textBaseline = "alphabetic";

        howtoplayStep1Text = new createjs.Text("You get only 2 overs to play daily. Like they say, timing & direction is everything! ", "28px Tondo_Std_Rg", "#000000");
        howtoplayStep1Text.x = CANVAS_WIDTH / 2;
        // howtoplayStep1Text.x = 80;
        howtoplayStep1Text.y = CANVAS_HEIGHT / 2 - 270;
        howtoplayStep1Text.regX = 0.5;
        howtoplayStep1Text.regY = 0.5;
        howtoplayStep1Text.lineWidth = 350;
        howtoplayStep1Text.textAlign = "center";
        howtoplayStep1Text.textBaseline = "alphabetic";

        howtoplayStep2BoldText = new createjs.Text("•  Step 2: Run for Rewards", "28px Tondo_Std_Bd", "#000000");
        howtoplayStep2BoldText.x = CANVAS_WIDTH / 2 - 30;
        howtoplayStep2BoldText.y = CANVAS_HEIGHT / 2 - 25;
        howtoplayStep2BoldText.regX = 0.5;
        howtoplayStep2BoldText.regY = 0.5;
        howtoplayStep2BoldText.lineWidth = 350;
        howtoplayStep2BoldText.textAlign = "center";
        howtoplayStep2BoldText.textBaseline = "alphabetic";

        howtoplayStep2Text = new createjs.Text("Burn your runs to unlock & claim rewards.   ", "28px Tondo_Std_Rg", "#000000");
        howtoplayStep2Text.x = CANVAS_WIDTH / 2;
        howtoplayStep2Text.y = CANVAS_HEIGHT / 2 + 15;
        howtoplayStep2Text.regX = 0.5;
        howtoplayStep2Text.regY = 0.5;
        howtoplayStep2Text.lineWidth = 350;
        howtoplayStep2Text.textAlign = "center";
        howtoplayStep2Text.textBaseline = "alphabetic";

        howtoplayStep3BoldText = new createjs.Text("•  Step 3: Let the Game Begin", "28px Tondo_Std_Bd", "#000000");
        howtoplayStep3BoldText.x = CANVAS_WIDTH / 2;
        howtoplayStep3BoldText.y = CANVAS_HEIGHT / 2 + 205;
        howtoplayStep3BoldText.regX = 0.5;
        howtoplayStep3BoldText.regY = 0.5;
        howtoplayStep3BoldText.textAlign = "center";
        howtoplayStep3BoldText.textBaseline = "alphabetic";

        howtoplayStep3Text = new createjs.Text("Share your score to challenge fans & family to beat your high score. ", "28px Tondo_Std_Rg", "#000000");
        howtoplayStep3Text.x = CANVAS_WIDTH / 2;
        howtoplayStep3Text.y = CANVAS_HEIGHT / 2 + 245;
        howtoplayStep3Text.regX = 0.5;
        howtoplayStep3Text.regY = 0.5;
        howtoplayStep3Text.lineWidth = 350;
        howtoplayStep3Text.textAlign = "center";
        howtoplayStep3Text.textBaseline = "alphabetic";

        s_oStage.addChild(howToPlayBg);
        s_oStage.addChild(howToPlayHeaderRect);
        s_oStage.addChild(howToPlayAirtelLogo);
        s_oStage.addChild(howToPlayHomeRect);
        s_oStage.addChild(howToPlayHomeImage);
        s_oStage.addChild(howToPlayHomeText);
        s_oStage.addChild(howToPlayText);
        s_oStage.addChild(howToPlayBackText);
        s_oStage.addChild(howtoplayRectangle1);
        s_oStage.addChild(howtoplayRectangle2);
        s_oStage.addChild(howtoplayRectangle3);
        s_oStage.addChild(howToPlayStartGameRect);
        s_oStage.addChild(howToPlayStartGameText);
        s_oStage.addChild(howtoplayStep1Text);
        s_oStage.addChild(howtoplayStep2Text);
        s_oStage.addChild(howtoplayStep3Text);
        s_oStage.addChild(howtoplayStep1BoldText);
        s_oStage.addChild(howtoplayStep2BoldText);
        s_oStage.addChild(howtoplayStep3BoldText);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);

    };
    this.CreateRect = function(x, y, width, height, radiusTL, radiusTR, radiusBR, radiusBL, color, opacity) {
        var rect = new createjs.Shape();
        rect.graphics.beginFill(color);
        rect.graphics.drawRoundRect(x, y, width, height, radiusTL, radiusTR, radiusBR, radiusBL);
        rect.graphics.endFill();
        rect.alpha = opacity;
        return rect;
    };
    this.CreateCircle = function(x, y, radius, color, opacity) {
        var cricle = new createjs.Shape();
        cricle.graphics.beginFill(color);
        cricle.graphics.drawCircle(x, y, radius);
        cricle.graphics.endFill();
        cricle.alpha = opacity;
        cricle.regX = 0.5;
        cricle.regY = 0.5;
        return cricle;
    };

    this.howToPlayHomeRectPressed = function() {
        try {
            // API.logout(token, 2);
        } catch (err) {
            console.log("The Logout Error from CHowToPlay................" + err);
            MyAirtelAppReact.close();
        }
    }

    this.unload = function() {
        s_oStage.removeAllChildren();
        var menu = CMenu();
    };

    this.refreshButtonPos = function(iNewX, iNewY) {

    };


    sizeHandler();
    this._init();
}