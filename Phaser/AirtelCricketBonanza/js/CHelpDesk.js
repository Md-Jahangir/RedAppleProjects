var CHelpDeskBg;
var CHelpDeskBgHeaderRect;
var CHelpDeskBgAirtelLogo;
var CHelpDeskBgHomeRect;
var CHelpDeskBgHomeImage;
var CHelpDeskBgHomeText;
var CHelpDeskBgGameRect;
var CHelpDeskBgGameText;
var CHelpDeskBgHeaderContentText;
var CHelpDeskBgHeaderText;
var CHelpDeskEmailText;
var CHelpDeskContactText;
var CHelpDeskBgText;

function CHelpDesk() {
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
    

    this._init = function () {
        CHelpDeskBg = createBitmap(s_oSpriteLibrary.getSprite('howToBg'));
        CHelpDeskBg.x=0;
        CHelpDeskBg.y=0;
        CHelpDeskBg.regX=0.5;    
        CHelpDeskBg.regY=0.5;
        
        CHelpDeskBgHeaderRect=this.CreateRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT-1244,1,1,1,1,'#ffffff',1);
        CHelpDeskBgHeaderRect.shadow = new createjs.Shadow("#000000", -0, -1, 8);
        
        CHelpDeskBgAirtelLogo = createBitmap(s_oSpriteLibrary.getSprite('airtel'));
        CHelpDeskBgAirtelLogo.x=54;
        CHelpDeskBgAirtelLogo.y=CANVAS_HEIGHT-(CANVAS_HEIGHT-(2*13));

        CHelpDeskBgHomeRect=this.CreateRect(490,25,200,50,10,10,10,10,'red',1);
        CHelpDeskBgHomeRect.regX=0.5;
        CHelpDeskBgHomeRect.regY=0.5;

        CHelpDeskBgHomeImage = createBitmap(s_oSpriteLibrary.getSprite('home'));
        CHelpDeskBgHomeImage.x=500;
        CHelpDeskBgHomeImage.y=35;
        CHelpDeskBgHomeImage.regX=0.5;
        CHelpDeskBgHomeImage.regY=0.5;

        CHelpDeskBgHomeText = new createjs.Text("Home", "30px Tondo Regular", "#ffffff");
        CHelpDeskBgHomeText.x = 565;
        CHelpDeskBgHomeText.y = 35;
        CHelpDeskBgHomeText.regX=0.5;
        CHelpDeskBgHomeText.regY=0.5;
        
        
        CHelpDeskBgBackText = new createjs.Text("< Back", "35px Tondo Regular", "#FF0000");
        CHelpDeskBgBackText.x = 45;
        CHelpDeskBgBackText.y = 125;
        CHelpDeskBgBackText.regX=0.5;
        CHelpDeskBgBackText.regY=0.5;
        CHelpDeskBgBackText.mouseEnabled = true;
        CHelpDeskBgBackText.addEventListener("click",this.unload);
        
        CHelpDeskBgGameRect=this.CreateRect(65,1260,600,60,10,10,10,10,'red',1);
        CHelpDeskBgGameRect.regX=0.5;
        CHelpDeskBgGameRect.regY=0.5;
        CHelpDeskBgGameRect.mouseEnabled = true;
        CHelpDeskBgGameRect.addEventListener("click",this.unload);

        CHelpDeskBgText = new createjs.Text("Back to Game", "35px Tondo Regular", "#ffffff");
        CHelpDeskBgText.x = 275;
        CHelpDeskBgText.y = 1275;
        CHelpDeskBgText.regX=0.5;
        CHelpDeskBgText.regY=0.5;

        CHelpDeskBgHeaderText = new createjs.Text("Helpdesk", "55px Tondo Regular", "#3f3d50");
        CHelpDeskBgHeaderText.x = 260;
        CHelpDeskBgHeaderText.y = 275;
        CHelpDeskBgHeaderText.regX=0.5;
        CHelpDeskBgHeaderText.regY=0.5;

        CHelpDeskBgHeaderContentText = new createjs.Text("For any assistance or queries,please reach out to us Monday to Friday, between 10 AM - 6 PM.", "30px Tondo Regular center", "#606066");
        CHelpDeskBgHeaderContentText.x = 60;
        CHelpDeskBgHeaderContentText.y = 370;
        CHelpDeskBgHeaderContentText.regX=0.5;
        CHelpDeskBgHeaderContentText.regY=0.5;
        CHelpDeskBgHeaderContentText.lineWidth=588;

        CHelpDeskContactText = new createjs.Text("0120-4602911", "30px Tondo Regular", "#606066");
        CHelpDeskContactText.x = 370;
        CHelpDeskContactText.y =675;
        CHelpDeskContactText.regX=0.5;
        CHelpDeskContactText.regY=0.5;
        CHelpDeskContactText.textAlign = 'center';
        CHelpDeskContactText.lineWidth =50;

        CHelpDeskEmailText = new createjs.Text("info@aircricketbonanza.in", "30px Tondo Regular", "#606066");
        CHelpDeskEmailText.x = 370;
        CHelpDeskEmailText.y =935;
        CHelpDeskEmailText.regX=0.5;
        CHelpDeskEmailText.regY=0.5;
        CHelpDeskEmailText.textAlign = 'center';
        CHelpDeskEmailText.lineWidth =50;



        s_oStage.addChild(CHelpDeskBg);
        s_oStage.addChild(CHelpDeskBgHeaderRect);
        s_oStage.addChild(CHelpDeskBgAirtelLogo);
        s_oStage.addChild(CHelpDeskBgHomeRect);
        s_oStage.addChild(CHelpDeskBgHomeImage);
        s_oStage.addChild(CHelpDeskBgHomeText);
        s_oStage.addChild(CHelpDeskBgBackText);
        s_oStage.addChild(CHelpDeskBgGameRect);
        s_oStage.addChild(CHelpDeskBgText);
        s_oStage.addChild(CHelpDeskBgGameText);
        s_oStage.addChild(CHelpDeskBgHeaderText);
        s_oStage.addChild(CHelpDeskBgHeaderContentText);
        s_oStage.addChild(CHelpDeskContactText);
        s_oStage.addChild(CHelpDeskEmailText);
        console.log("help desk ");
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);

    };
    this.CreateRect=function(x,y,width,height,radiusTL,radiusTR ,radiusBR ,radiusBL,color,opacity)
    {
        var  rect = new createjs.Shape();
        rect.graphics.beginFill(color);
        //   rect.graphics.drawRect(50, 100, 120, 120);
        rect.graphics.drawRoundRect ( x,y,width,height,radiusTL,radiusTR,radiusBR,radiusBL);
        rect.graphics.endFill();
        rect.alpha=opacity;
        // var blurFilter = new createjs.BlurFilter(5, 5, 1);
        // rect.filters = [blurFilter];
        console.log("create rect");
        return rect;
    };
    this.CreateCircle=function(x,y,radius,color,opacity)
    {
        var cricle = new createjs.Shape();
        cricle.graphics.beginFill(color);
        cricle.graphics.drawCircle(x, y, radius);
        cricle.graphics.endFill();
        cricle.alpha=opacity;
        cricle.regX=0.5;
        cricle.regY=0.5;
        console.log("create circle");
        return cricle;
    };
    this.unload = function () {
        s_oStage.removeAllChildren();
        var menu= CMenu();
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
       
    };

    
	sizeHandler();
     this._init();
}

// var s_oMenu = null;