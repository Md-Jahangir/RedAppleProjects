var faqsBg;
var faqsHeaderRect;
var faqsAirtelLogo;
var faqsHomeRect;
var faqsHomeImage;
var faqsHomeText;
var faqsBackText;
var faqsTermsAndConditionText;
var faqsIText;
var faqsHelpDeskText;
// var faqsADRectText;
// var faqsADRectText1;
// var faqsText;
// var faqsStartGameRect;
// var faqsStartGame;
// var faqsPlayerRectangle;
// var faqsStartGameText3;
// var faqsStep1Text;
// var faqsStep2Text;
// var faqsStep3Text;
function CFaqs() {

    this._init = function () {
        console.log("top scorere")
       
        faqsBg = createBitmap(s_oSpriteLibrary.getSprite('howToBg'));
        faqsBg.x=0;
        faqsBg.y=0;
        faqsBg.regX=0.5;
        faqsBg.regY=0.5;
        faqsBg.mouseEnabled = true;
        faqsBg.addEventListener("click",function(){});

        faqsHeaderRect=this.CreateRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT-1244,1,1,1,1,'#ffffff',1);
        faqsHeaderRect.shadow = new createjs.Shadow("#000000", -0, -1, 8);
        
        faqsAirtelLogo = createBitmap(s_oSpriteLibrary.getSprite('airtel'));
        faqsAirtelLogo.x=54;
        faqsAirtelLogo.y=CANVAS_HEIGHT-(CANVAS_HEIGHT-(2*13));

        faqsHomeRect=this.CreateRect(490,25,200,50,10,10,10,10,'red',1);
        faqsHomeRect.regX=0.5;
        faqsHomeRect.regY=0.5;

        faqsHomeImage = createBitmap(s_oSpriteLibrary.getSprite('home'));
        faqsHomeImage.x=500;
        faqsHomeImage.y=35;
        faqsHomeImage.regX=0.5;
        faqsHomeImage.regY=0.5;

        faqsHomeText = new createjs.Text("Home", "30px Tondo Regular", "#ffffff");
        faqsHomeText.x = 565;
        faqsHomeText.y = 35;
        faqsHomeText.regX=0.5;
        faqsHomeText.regY=0.5;
        faqsHomeText.mouseEnabled = true;
        faqsHomeText.addEventListener("click",this.unload);
        
        faqsBackText = new createjs.Text("< Back", "35px Tondo Regular", "#e40000");
        faqsBackText.x = 45;
        faqsBackText.y = 125;
        faqsBackText.regX=0.5;
        faqsBackText.regY=0.5;
     
      
        faqsStartGameRect=this.CreateRect(65,1260,600,60,10,10,10,10,'red',1);
        faqsStartGameRect.regX=0.5;
        faqsStartGameRect.regY=0.5;
        faqsStartGameRect.mouseEnabled = true;
        faqsStartGameRect.addEventListener("click",this.unload);

        faqsPlayerRectangle=this.CreateRect(59,300,600,850,10,10,10,10,'#ffffff',1);

        faqsStartGameText = new createjs.Text("Okay, Got It", "35px Tondo Regular", "#ffffff");
        faqsStartGameText.x = 280;
        faqsStartGameText.y = 1275;
        faqsStartGameText.regX=0.5;
        faqsStartGameText.regY=0.5;

        faqsText = new createjs.Text("FAQs", "48px Tondo Regular", "#3f3d50");
        faqsText.x = 290;
        faqsText.y =225;
        faqsText.regX=0.5;
        faqsText.regY=0.5;
       
        faqsTermsAndConditionText = new createjs.Text("Terms & Conditions", "30px Tondo Regular", "#5a80aa");
        faqsTermsAndConditionText.x = 120;
        faqsTermsAndConditionText.y =1185;
        faqsTermsAndConditionText.regX=0.5;
        faqsTermsAndConditionText.regY=0.5;
        faqsTermsAndConditionText.mouseEnabled = true;
        faqsTermsAndConditionText.addEventListener("click",this.TermsAndConditionPressed);
       
        faqsIText = new createjs.Text("|", "30px Bold Tondo Regular", "#5a80aa");
        faqsIText.x = 410;
        faqsIText.y =1185;
        faqsIText.regX=0.5;
        faqsIText.regY=0.5;
        

        faqsHelpDeskText = new createjs.Text("Help Desk", "30px Tondo Regular", "#5a80aa");
        faqsHelpDeskText.x = 470;
        faqsHelpDeskText.y =1185;
        faqsHelpDeskText.regX=0.5;
        faqsHelpDeskText.regY=0.5;
        faqsHelpDeskText.mouseEnabled = true;
        faqsHelpDeskText.addEventListener("click",this.faqsHelpDeskTextPressed);
        
        


        s_oStage.addChild(faqsBg);
        s_oStage.addChild(faqsHeaderRect);
        s_oStage.addChild(faqsAirtelLogo);
        s_oStage.addChild(faqsHomeRect);
        s_oStage.addChild(faqsHomeImage);
        s_oStage.addChild(faqsHomeText);
        s_oStage.addChild(faqsBackText);
        s_oStage.addChild(faqsText);
        s_oStage.addChild(faqsStartGameRect);
        s_oStage.addChild(faqsStartGameText);
  
        s_oStage.addChild(faqsPlayerRectangle);
        s_oStage.addChild(faqsTermsAndConditionText);
        s_oStage.addChild(faqsHelpDeskText);
        s_oStage.addChild(faqsIText);
        console.log("menuBgRect ");
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    
    };

    this._onAllImagesLoaded = function() {

        this.attachSprites();

        s_oMain.preloaderReady();

    };
    this.faqsHelpDeskTextPressed=function()
    {
        s_oStage.removeAllChildren();
        var helpDesk=new  CHelpDesk();
    };
    this.TermsAndConditionPressed=function()
    {
        s_oStage.removeAllChildren();
        var termsCondition=CTermsAndCondition();
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

var s_oMenu = null;