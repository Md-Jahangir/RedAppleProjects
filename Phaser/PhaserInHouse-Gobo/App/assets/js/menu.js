var menu =function(){};
var fireBallButton;
var hitBallButton;
var baseUrl;
var gameTitle;
var gameName;
 var gameTitle1;
menu.prototype= {

  init:function()
  {
    Utils.ScaleManager();
  },
  create : function()
    {
      console.log("gobo menu");
      game.stage.backgroundColor="0xF2F4F4";
      var title= game.add.sprite(0,0,'menu_page_title');
      // title.anchor.setTo(0.5);
      title.scale.setTo(0.65,0.5);
      var titleText= game.add.sprite(360,80,'splash_Title');
      titleText.scale.setTo(0.2,0.2);
      titleText.anchor.setTo(0.5);
      //...............................................................................
  
      gameTitle=game.add.sprite(360,400,'fireball');
      gameTitle.anchor.setTo(0.5);
      gameTitle.scale.setTo(0.6);
     gameName=game.add.sprite(360,522,'game_name');
      gameName.anchor.setTo(0.5);
      gameName.scale.setTo(0.6);
      var gameNameText=game.add.text(360,520,'FireBall',{ fill : "#ffffff",font:"50px Arial"});
      gameNameText.anchor.setTo(0.5);
      fireBallButton=game.add.group();
      fireBallButton.inputEnableChildren=true;
      fireBallButton.add(gameTitle);
      fireBallButton.add(gameName);
      fireBallButton.add(gameNameText);
     
      fireBallButton.onChildInputDown.add(this.fireBallButtonClicked,this);
      var home_indicator=game.add.sprite(360,1260,'home_indicator');
      home_indicator.anchor.setTo(0.5);
      home_indicator.scale.setTo(0.5);
      //.............................................................................................
      gameTitle1=game.add.sprite(360,800,'hitball');
      gameTitle1.anchor.setTo(0.5);
      gameTitle1.scale.setTo(0.6);
      var gameName1=game.add.sprite(360,922,'game_name');
      gameName1.anchor.setTo(0.5);
      gameName1.scale.setTo(0.6);
      var gameNameText1=game.add.text(360,920,'HitBall',{ fill : "#ffffff",font:"50px Arial"});
      gameNameText1.anchor.setTo(0.5);
      hitBallButton=game.add.group();
      hitBallButton.inputEnableChildren=true;
      hitBallButton.add(gameTitle1);
      hitBallButton.add(gameName1);
      hitBallButton.add(gameNameText1);
     
      hitBallButton.onChildInputDown.add(this.hitBallButtonClicked,this);
      baseUrl=window.location.href;
      var lastIndex=baseUrl.indexOf("GOBO");
      lastIndex+=4;
      baseUrl=baseUrl.substring(0,lastIndex);

      console.log(baseUrl);
    },
    fireBallButtonClicked:function()
    {
      console.log("fireBallButtonClicked");
       
      console.log("The Base Url.........."+baseUrl + "Window href.............."+window.location.href);
      var modifiedUrl=baseUrl+"/FireBallFinal/index.html";
      window.open(modifiedUrl,'_self');
    },
    hitBallButtonClicked:function()
    {
      console.log("hitBallButtonClicked");
      // window.location(HitBall\index.html);
      window.open(baseUrl+"/HitBall/index.html",'_self');
    }
  }
        