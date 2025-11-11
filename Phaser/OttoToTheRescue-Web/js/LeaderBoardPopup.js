var leaderboardPopupGroup;
var leaderboardPopupBg;
var scroller;
var horizontalScroll = false;
var verticalScroll = true;
var kineticMovement = false;
var scrollableGroup;
var leaderBoardPlayerDataCount = 10;
var createUserGroup;

var LeaderBoardPopup = function () {};
LeaderBoardPopup.prototype = {
    init: function(){
        Utils.ScaleManager();
    },
    preload: function () {
        console.log("Enter into the Menu Preload Fucntion");

    },
//CREATE FUNCTION
    //CreateLeaderboardPopup
    create: function() {
        scrollableGroup = game.add.group();
        // createUserGroup = game.add.group();
        scroller = game.add.existing(new ScrollableArea(0, 0, game.width, game.height));
        scroller.configure({
			horizontalScroll:false,
			verticalScroll:true,
			kineticMovement:true
		});
        leaderboardPopupGroup = game.add.group();
        leaderboardPopupBg = Utils.ButtonSettingsControl(leaderboardPopupBg,game.world.centerX,game.world.centerY,'greenOverlay',null,null,null,null,"true","true",0.5,0.5,1,1,this);
        topBar = Utils.SpriteSettingsControl(topBar,360,100,'topBar',"true","true",0.5,0.5,0.6,0.6);
        pageTitle = Utils.SpriteSettingsControl(pageTitle,360,160,'pageTitle',"true","true",0.5,0.5,0.6,0.6);
        topTxt = game.add.bitmapText(360, 145, 'shootEmFont', "LEADERBOARD", 35);
        topTxt.anchor.set(0.5, 0.5);
        backBttn = Utils.ButtonSettingsControl(backBttn, 80.0, 150.0, 'backBttn', this.BackButtonDownAnimtion,null,null, this.BackButtonUpAnimation, "true", "true", 0.5, 0.5, 0.6, 0.6,this);
        
        var leaderboard_top = Utils.SpriteSettingsControl(topBar,360,270,'leaderboard_top',"true","true",0.5,0.5,0.6,0.6);
        var rankText = game.add.bitmapText(-450, -70, 'shootEmFont', "RANK", 45);
        rankText.tint = "0x3D0C0C";
        var nameText = game.add.bitmapText(-55, -70, 'shootEmFont', "NAME", 45);
        nameText.tint = "0x3D0C0C";
        var scoreText = game.add.bitmapText(300, -70, 'shootEmFont', "SCORE", 45);
        scoreText.tint = "0x3D0C0C";
        
        
        leaderboard_top.addChild(rankText);
        leaderboard_top.addChild(nameText);
        leaderboard_top.addChild(scoreText);
        
        var leaderboard_bottom = Utils.SpriteSettingsControl(topBar,360,1180,'leaderboard_bottom',"true","true",0.5,0.5,0.6,0.6);
        
        
        
        leaderboardPopupGroup.add(leaderboardPopupBg);
        leaderboardPopupGroup.add(topBar);
        leaderboardPopupGroup.add(pageTitle);
        leaderboardPopupGroup.add(topTxt);
        leaderboardPopupGroup.add(backBttn);
        leaderboardPopupGroup.add(leaderboard_top);
        leaderboardPopupGroup.add(leaderboard_bottom);
        
        var mask = game.add.graphics(0,0);
        mask.drawRect(0,300,1000,800);
        var image = game.make.image(0, 0, "onepixelWhite");
        
    
        //   
        
        //this.CreateUser(360,1210,"45","ME","123456");
        // for(i=0;i<10;i++){
        //     this.CreateUser(360,350+(i*104),"45","ME","123456");
        // }
        this.InstantiateLeaderBoardData(leaderBoardPlayerDataCount);

        image.tint = "0x000000";
        image.alpha = 0.001;
        image.scale.setTo(5000,(5*leaderBoardPlayerDataCount));
        image.mask=mask;

        scrollableGroup.mask = mask;
        scroller.addChild(image);
		scroller.addChild(scrollableGroup);
        scroller.start();
        leaderboardPopupGroup.add(scroller);
        // game.world.bringToTop(scrollableGroup);
        // leaderboardPopupGroup.visible = false;
    },

    InstantiateLeaderBoardData: function(leaderBoardPlayerDataCount){
        for(i=0;i<leaderBoardPlayerDataCount;i++){
            this.CreateUser(360,350+(i*104),(i+1),"name_"+i,(i+1));
        }
        console.log("The Height of Create user Group.................."+scrollableGroup.height);
    },
    CreateUser:function(poxX,posY,rank,name,score){
        
        var leaderboard_myProfile = Utils.SpriteSettingsControl(topBar,poxX,posY,'leaderboard_Rank_base',"true","true",0.5,0.5,0.5,0.5);
        // var profilePic = Utils.SpriteSettingsControl(profilePic,-500,-12,'levelActive',"true","true",0.5,0.5,0.7,0.7);

        var profilePic = Utils.SpriteSettingsControl(profilePic,-500,-12,'levelActive',"true","true",0.5,0.5,1.0,1.0);


        var mask = game.add.graphics(0,0);
        mask.beginFill(0xffffff);
        mask.drawCircle(-500, -12, 160);

        // var mask = Utils.SpriteSettingsControl(mask,-500,-12,'photoMask',"true","true",0.5,0.5,1.0,1.0);
        // var mask = game.add.image(-581, -95, 'photoMask');

        //var bmd = game.make.bitmapData(320, 256);
        //bmd.alphaMask('levelActive', 'photoMask');
        //var pic = game.add.image(0, 0, bmd).anchor.set(0.5, 0.5);
        //var pic = this.SpriteMasking(profilePic,-550,-12,1);

        profilePic.mask = mask;

        var rank = game.add.bitmapText(-330, -55, 'shootEmFont', rank, 45);
        rank.tint = "0x3D0C0C";
        rank.anchor.set(0.5, 0.5);
        var name = game.add.bitmapText(-25, -10, 'shootEmFont', name, 45);
        name.tint = "0x3D0C0C";
        name.anchor.set(0.5, 0.5);
        var score = game.add.bitmapText(390, -30, 'shootEmFont', score, 30);
        
        leaderboard_myProfile.addChild(rank);
        leaderboard_myProfile.addChild(name);
        leaderboard_myProfile.addChild(score);
        
     
        leaderboard_myProfile.addChild(profilePic);
        leaderboard_myProfile.addChild(mask);
        // leaderboard_myProfile.addChild(pic);
        // createUserGroup.add(leaderboard_myProfile);
        scrollableGroup.add(leaderboard_myProfile);
    },
    
    // SpriteMasking: function(imageName,positionX,positionY,diameter){
    //     mask = game.add.graphics(positionX,positionY);
    //     mask.beginFill(0xffffff);
    //     mask.drawCircle(100, 100, diameter);
    //     imageName.mask = mask;
    //     return imageName;
    // },

    //SHOW HIDE POPUP
    ShowLeaderboardPopup: function(){
        this.CreateLeaderboardPopup();
        // leaderboardPopupGroup.visible = true;
        game.add.tween(leaderboardPopupGroup).to({ alpha: 1 }, 200, Phaser.Easing.Linear.Out, true);
    },
    HideLeaderboardPopup: function(){
        var hideShopGroupTween = game.add.tween(leaderboardPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        hideShopGroupTween.onComplete.add(function(){
            console.log("Enter into the Destroy function........................");
    
            scroller.removeChildren(0, scroller.children.length);
            // scroller.isScrollable = false;
            // scroller.destroy();
            // scrollableGroup.destroy();
            // leaderboardPopupGroup.destroy();
        });
    },
    //ALL BUTTON FUNCTIONALITY
    BackButtonDownAnimtion: function(){
        game.add.tween(backBttn.scale).to({ x: 0.5, y: 0.5}, 200, Phaser.Easing.Linear.None, true);
        SoundManager.PlayButtonSFX();
    },
    BackButtonUpAnimation: function(){
        backBttn.inputEnable = false;
        game.add.tween(backBttn.scale).to({ x: 0.6, y: 0.6}, 200, Phaser.Easing.Linear.None, true);
        setTimeout(() => {
           this.BackButtonClick();
           backBttn.inputEnable = true;
        }, 500);
    },
    BackButtonClick: function(){
        // this.HideLeaderboardPopup();
        StateTransition.TransitToMenu();
    }
}



