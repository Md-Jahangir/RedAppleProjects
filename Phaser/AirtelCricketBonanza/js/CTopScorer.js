var topScorerBg;
var topScorerHeaderRect;
var topScorerAirtelLogo;
var topScorerHomeRect;
var topScorerHomeImage;
var topScorerHomeText;
var topScorerBackText;

var topScorerADRectImage;
var topScorerADRect;
var topScorerADRect1;
var topScorerADRectText;
var topScorerADRectText1;
var topScorerTopPlayerText;
var topScorerStartGameRect;
var topScorerStartGame;
var topScorerPlayerRectangle;
var playerNameData=[];
var playerRunData=[];
var playerName;
var playerRun;
function CTopScorer() {

    this._init = function () {
        console.log("top scorere")
       
        // //-------------------------------------
       
        topScorerBg = createBitmap(s_oSpriteLibrary.getSprite('howToBg'));
        topScorerBg.x=0;
        topScorerBg.y=0;
        topScorerBg.regX=0.5;
        topScorerBg.regY=0.5;
        topScorerBg.mouseEnabled = true;
        topScorerBg.addEventListener("click",function(){});

        topScorerHeaderRect=this.CreateRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT-1244,1,1,1,1,'#ffffff',1);
        topScorerHeaderRect.shadow = new createjs.Shadow("#000000", -0, -1, 8);
        
        topScorerAirtelLogo = createBitmap(s_oSpriteLibrary.getSprite('airtel'));
        topScorerAirtelLogo.x=54;
        topScorerAirtelLogo.y=CANVAS_HEIGHT-(CANVAS_HEIGHT-(2*13));

        topScorerHomeRect=this.CreateRect(490,25,200,50,10,10,10,10,'red',1);
        topScorerHomeRect.regX=0.5;
        topScorerHomeRect.regY=0.5;

        topScorerHomeImage = createBitmap(s_oSpriteLibrary.getSprite('home'));
        topScorerHomeImage.x=500;
        topScorerHomeImage.y=35;
        topScorerHomeImage.regX=0.5;
        topScorerHomeImage.regY=0.5;

        topScorerHomeText = new createjs.Text("Home", "30px Tondo Regular", "#ffffff");
        topScorerHomeText.x = 565;
        topScorerHomeText.y = 35;
        topScorerHomeText.regX=0.5;
        topScorerHomeText.regY=0.5;
        
        topScorerBackText = new createjs.Text("< Back", "27px Tondo Regular", "#ffffff");
        topScorerBackText.x = 55;
        topScorerBackText.y = 116;
        topScorerBackText.regX=0.5;
        topScorerBackText.regY=0.5;
        topScorerBackText.mouseEnabled = true;
        topScorerBackText.addEventListener("click",this.unload);
     
        topScorerADRect1=this.CreateRect(370,190,152,40,10,10,10,10,'#ffd255',1);
        topScorerADRectText1 = new createjs.Text("Bumper Prize", "20px Tondo Regular", "#000000");
        topScorerADRectText1.x = 395;
        topScorerADRectText1.y = 201;
        topScorerADRectText1.regX=0.5;
        topScorerADRectText1.regY=0.5;
        
        topScorerADRect=this.CreateRect(50,170,610,170,10,10,10,10,'#fffff2',1);
        topScorerADRectText = new createjs.Text("Lloyd LED Smart Wow TV", "25px Tondo Regular", "#3f3d50");
        topScorerADRectText.x = 495;
        topScorerADRectText.y = 250;
        topScorerADRectText.regX=0.5;
        topScorerADRectText.regY=0.5;
        topScorerADRectText.textAlign = 'center';
        topScorerADRectText.lineWidth =300;


        topScorerADRectImage = createBitmap(s_oSpriteLibrary.getSprite('adRect'));
        topScorerADRectImage.x=35;
        topScorerADRectImage.y=175;
        topScorerADRectImage.regX=0.5;
        topScorerADRectImage.regY=0.5;

        topScorerStartGameRect=this.CreateRect(65,1260,600,60,10,10,10,10,'red',1);
        topScorerStartGameRect.regX=0.5;
        topScorerStartGameRect.regY=0.5;

        topScorerPlayerRectangle=this.CreateRect(60,450,600,780,10,10,10,10,'#ffffff',1);
        topScorerStartGameRect.regX=0.5;
        topScorerStartGameRect.regY=0.5;
        topScorerStartGameRect.mouseEnabled = true;
        topScorerStartGameRect.addEventListener("click",this.unload);

        topScorerStartGameText = new createjs.Text("Okay, Got It", "35px Tondo Regular", "#ffffff");
        topScorerStartGameText.x = 280;
        topScorerStartGameText.y = 1275;
        topScorerStartGameText.regX=0.5;
        topScorerStartGameText.regY=0.5;

        topScorerTopPlayerText = new createjs.Text("Top 10 Scorers", "40px Tondo Regular", "#ffffff");
        topScorerTopPlayerText.x = 240;
        topScorerTopPlayerText.y =385;
        topScorerTopPlayerText.regX=0.5;
        topScorerTopPlayerText.regY=0.5;
        
        playerName=new createjs.Text("Player Name", "35px Tondo Regular", "#3f3d50");
        playerName.x = 105;
        playerName.y = 480;
        playerName.regX=0.5;
        playerName.regY=0.5;

        playerRun=new createjs.Text("Runs", "35px Tondo Regular", "#3f3d50");
        playerRun.x = 505;
        playerRun.y = 480;
        playerRun.regX=0.5;
        playerRun.regY=0.5;

        s_oStage.addChild(topScorerBg);
        s_oStage.addChild(topScorerHeaderRect);
        s_oStage.addChild(topScorerAirtelLogo);
        s_oStage.addChild(topScorerHomeRect);
        s_oStage.addChild(topScorerHomeImage);
        s_oStage.addChild(topScorerHomeText);
        s_oStage.addChild(topScorerBackText);
        s_oStage.addChild(topScorerADRect);
        s_oStage.addChild(topScorerADRectImage);
        s_oStage.addChild(topScorerADRectText);
        s_oStage.addChild(topScorerADRect1);
        s_oStage.addChild(topScorerADRectText1);
        s_oStage.addChild(topScorerStartGameRect);
        s_oStage.addChild(topScorerStartGameText);
        s_oStage.addChild(topScorerTopPlayerText);
        s_oStage.addChild(topScorerPlayerRectangle);
        s_oStage.addChild(playerName);
        s_oStage.addChild(playerRun);
        var posY=550;
        for(var i=0;i<10;i++)
        {
            playerNameData[i]=new createjs.Text("Player_"+i, "35px Tondo Regular", "#3f3d50");
            playerNameData[i].x = 105;
            playerNameData[i].y = posY;
            playerNameData[i].regX=0.5;
            playerNameData[i].regY=0.5;
            posY+=70;
            s_oStage.addChild(playerNameData[i]);
        }
        posY=550;
        for(var i=0;i<10;i++)
        {
            playerRunData[i]=new createjs.Text("879"+i, "35px Tondo Regular", "#3f3d50");
            playerRunData[i].x = 505;
            playerRunData[i].y = posY;
            playerRunData[i].regX=0.5;
            playerRunData[i].regY=0.5;
            posY+=70;
            s_oStage.addChild(playerRunData[i]);
        }
        console.log("menuBgRect ");
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