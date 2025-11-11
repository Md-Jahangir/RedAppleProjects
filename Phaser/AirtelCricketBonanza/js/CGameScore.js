function CGameScore() {

    var gameScoreGroup;

    var gameScoreBg;

    var gameScoreBgHeaderRect;
    var gameScoreAirtelLogo;
    var gameScoreBgHomeRect;
    var gameScoreBgHomeImage;
    var gameScoreBgHomeText;
    var gameScoreBackButton;
	var gameScoreChallengetext2;
	
    var goodGameText;
    var gameScorerRunBg;
    var gameScorerScore;
    var gameScorerScoreText;
    var gameScorerRewardsText;

    var maskRect;

    var mouseInitialPosition;
    var menuPlayerRewardsBg;
    var menuPlayerRewardsBg2;
    var menuPlayerRewardsBg3;
    var menuPlayerRewardsBg4;
    var menuPlayerRewardsBg5;

    var _fRequestFullScreen = null;


    var scoreForReward1;
    var scoreForReward2;
    var scoreForReward3;
    var scoreForReward4;
    var scoreForReward5;
	var gameScoreBgRect;

    this._init = function() {

        API.SaveScoreData(token, _iScore);

        gameScoreGroup = new createjs.Container();
    
//--------------------------------------------------------------------------------
    maskRect = this.CreateRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 1, 1, 1, 1, '#ffffff', 0.1);
    maskRect.regX = 0.5;
    maskRect.regY = 0.5;
    maskRect.mouseEnabled = true;
//------------------------------------------------------------------------------
		gameScoreBgRect = this.CreateRect(0, 0, CANVAS_WIDTH+200, CANVAS_HEIGHT+1660, 1, 1, 1, 1, '#F8ECF0', 0.7);
        gameScoreBgRect.shadow = new createjs.Shadow("#000000", -0, -1, 8);
        gameScoreBgRect.regX = 0.5;
        gameScoreBgRect.regY = 0.5;

		gameScoreBg = createBitmap(s_oSpriteLibrary.getSprite('howToBg'));
        gameScoreBg.x = 0;
        gameScoreBg.y = 0;
        gameScoreBg.regX = 0.5;
        gameScoreBg.regY = 0.5;
        gameScoreBg.scaleY=2;
       

        gameScoreBgHeaderRect = this.CreateRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT - 1244, 1, 1, 1, 1, '#ffffff', 1);
        gameScoreBgHeaderRect.shadow = new createjs.Shadow("#000000", -0, -1, 8);
        gameScoreBgHeaderRect.regX = 0.5;
        gameScoreBgHeaderRect.regY = 0.5;

        gameScoreAirtelLogo = createBitmap(s_oSpriteLibrary.getSprite('airtel'));
        gameScoreAirtelLogo.x = CANVAS_WIDTH/2-306;
        gameScoreAirtelLogo.y = CANVAS_HEIGHT - (CANVAS_HEIGHT - (2 * 13));

        gameScoreBgHomeRect = this.CreateRect(CANVAS_WIDTH/2+130, CANVAS_HEIGHT/2-645, 200, 50, 10, 10, 10, 10, 'red', 1);
        gameScoreBgHomeRect.regX = 0.5;
        gameScoreBgHomeRect.regY = 0.5;
		gameScoreBgHomeRect.mouseEnabled;
		gameScoreBgHomeRect.addEventListener("click", this.gameScoreBgHomeRectPressed );
		
        gameScoreBgHomeImage = createBitmap(s_oSpriteLibrary.getSprite('home'));
        gameScoreBgHomeImage.x = CANVAS_WIDTH/2+140;
        gameScoreBgHomeImage.y =  CANVAS_HEIGHT/2-635;
        gameScoreBgHomeImage.regX = 0.5;
        gameScoreBgHomeImage.regY = 0.5;

        gameScoreBgHomeText = new createjs.Text("Home", "20px Tondo_Std_Bd", "#ffffff");
        gameScoreBgHomeText.x = CANVAS_WIDTH/2+205;
        gameScoreBgHomeText.y = CANVAS_HEIGHT/2-625;
        gameScoreBgHomeText.regX = 0.5;
        gameScoreBgHomeText.regY = 0.5;

        goodGameText = new createjs.Text("Your score", "48px Tondo_Std_Bd", "#000000");
        goodGameText.x = CANVAS_WIDTH/2-125;
        goodGameText.y = CANVAS_HEIGHT/2-468;
        goodGameText.regX = 0.5;
        goodGameText.regY = 0.5;

        gameScorerScoreText = new createjs.Text("runs", "56px Tondo_Std_Bd", "#000000");
        gameScorerScoreText.x = CANVAS_WIDTH/2- 60;
        gameScorerScoreText.y = CANVAS_HEIGHT/2-155;
        gameScorerScoreText.regX = 0.5;
        gameScorerScoreText.regY = 0.5;

        gameScorerScore = new createjs.Text(_iScore, "112px Tondo_Std_Bd", "#000000");
        gameScorerScore.x = CANVAS_WIDTH / 2;
        gameScorerScore.y = CANVAS_HEIGHT / 2 - 170;
        gameScorerScore.textAlign = "center";
        gameScorerScore.textBaseline = "alphabetic";


        gameScorerRunBg = createBitmap(s_oSpriteLibrary.getSprite('gameScorerRunBg'));
        gameScorerRunBg.x = CANVAS_WIDTH/2-205;
        gameScorerRunBg.y = CANVAS_HEIGHT/2-345;
        gameScorerRunBg.regX = 0.5;
        gameScorerRunBg.regY = 0.5;

        gameScorerChallengeButtonRect = this.CreateRect(CANVAS_WIDTH/2-300, CANVAS_HEIGHT/2, 600, 120, 10, 10, 10, 10, '#ffffff', 1);
        gameScorerChallengeButtonRect.regX = 0.5;
        gameScorerChallengeButtonRect.regY = 0.5;
        gameScorerChallengeButtonText = new createjs.Text("Challenge your friends", "32px Tondo_Std_Bd", "black");
        gameScorerChallengeButtonText.x = CANVAS_WIDTH/2-198;   
        gameScorerChallengeButtonText.y = CANVAS_HEIGHT/2+30;
        gameScorerChallengeButtonText.regX = 0.5;
        gameScorerChallengeButtonText.regY = 0.5;
		
		
		gameScoreChallengetext2 = new createjs.Text("Rewards worth ₹25 Lakh up for grabs", "24px Tondo_Std_Rg", "black");
        gameScoreChallengetext2.x = CANVAS_WIDTH/2-198;
        gameScoreChallengetext2.y = CANVAS_HEIGHT/2+65;
        gameScoreChallengetext2.regX = 0.5;
        gameScoreChallengetext2.regY = 0.5;


        gameScorerChallengeButtonRect.mouseEnabled = true;
        gameScorerChallengeButtonRect.addEventListener("click", this.gameScorerChallengeButtonRectPressed);


        gameScorer3starImage = createBitmap(s_oSpriteLibrary.getSprite('3star'));
        gameScorer3starImage.x =CANVAS_WIDTH/2-279;
        gameScorer3starImage.y =CANVAS_HEIGHT/2+23;
        gameScorer3starImage.regX = 0.5;
        gameScorer3starImage.regY = 0.5;

        gameScorerRewardsText = new createjs.Text("Rewards for You", "55px Tondo Regular", "#000000");
        gameScorerRewardsText.x = CANVAS_WIDTH/2-178;
        gameScorerRewardsText.y = CANVAS_HEIGHT/2+160;
        gameScorerRewardsText.regX = 0.5;
        gameScorerRewardsText.regY = 0.5;

       

        maskRect.on("pressmove", function(evt) {

            if (gameScoreGroup.y < 0) {
                if (evt.stageY > mouseInitialPosition) {
                    gameScoreGroup.y += (evt.stageY - mouseInitialPosition);
                    mouseInitialPosition = evt.stageY;
                }
            }
            if (gameScoreGroup.y > -1555) {
                if (evt.stageY < mouseInitialPosition) {
                    gameScoreGroup.y -= (mouseInitialPosition - evt.stageY);
                    mouseInitialPosition = evt.stageY;
                }
            }
        });
        maskRect.on("mousedown", function(evt) {
            mouseInitialPosition = evt.stageY;
        });

       //Reward 1----------------------------------------------------------------------
        menuPlayerRewardsBg = createBitmap(s_oSpriteLibrary.getSprite('scroll2'));
        menuPlayerRewardsBg.x =CANVAS_WIDTH/2-319;
        menuPlayerRewardsBg.y = CANVAS_HEIGHT/2+275;
        menuPlayerRewardsBg.regX = 0.5;
        menuPlayerRewardsBg.regY = 0.5;

        scoreForReward1 = (amount[rewardStatusResponseDetails["result"][0].length - 1] - _totalScore - _iScore);
        if (scoreForReward1 < 0)
            scoreForReward1 = 0;
        var currentGiftVoucherForReward1 = usedCount[rewardStatusResponseDetails["result"][0].length - 1];
        var remainingGiftVoucherForReward1 = totalCount[rewardStatusResponseDetails["result"][0].length - 1];
        var rewardWorth1 = 100;

        var reward1Text = new createjs.Text("Score " + scoreForReward1 + " more to unlock\n" + currentGiftVoucherForReward1 + "/" + remainingGiftVoucherForReward1 + " used", "24px Tondo_Std_Rg", "#ffffff");
        reward1Text.x=CANVAS_WIDTH/2-289;
        reward1Text.y = CANVAS_HEIGHT/2+300;
        reward1Text.regX = 0.5;
        reward1Text.regY = 0.5;
        reward1Text.lineHeight = 35;

        var reward1Text1 = new createjs.Text("Amazon Voucher Gift\nWorth ₹" + rewardWorth1, "32px Tondo_Std_Bd", "#ffffff");
        reward1Text1.x =CANVAS_WIDTH/2-289;
        reward1Text1.y  =CANVAS_HEIGHT/2+405;
        reward1Text1.regX = 0.5;
        reward1Text1.regY = 0.5;
        reward1Text1.lineHeight = 45;

        reward1ClaimRect = this.CreateRect(CANVAS_WIDTH/2-280, CANVAS_HEIGHT/2+520, 100, 50, 10, 10, 10, 10, '#ffffff', 1);
        reward1ClaimRect.regX = 0.5;
        reward1ClaimRect.regY = 0.5;
        reward1ClaimRectText = new createjs.Text("Claim", "28px Tondo_Std_Rg", "#4b4956");
        reward1ClaimRectText.x =CANVAS_WIDTH/2-266;
        reward1ClaimRectText.y =CANVAS_HEIGHT/2+530;
        reward1ClaimRectText.regX = 0.5;
        reward1ClaimRectText.regY = 0.5;
        if ((scoreForReward1 == 0) && (prizeStatus[rewardStatusResponseDetails["result"][0].length - 1] == "active")) {
            reward1ClaimRect.alpha = 1;
            reward1ClaimRectText.alpha = 1;
            reward1ClaimRect.mouseEnabled = true;
        } else {
            reward1ClaimRect.alpha = 0.5;
            reward1ClaimRectText.alpha = 0.5;
            reward1ClaimRect.mouseEnabled = false;
        }
        reward1ClaimRect.addEventListener("click", this.reward1ClaimPressed);

        //Reward 2-------------------------------------------------------------------------------------        
        menuPlayerRewardsBg2 = createBitmap(s_oSpriteLibrary.getSprite('scroll2'));
        menuPlayerRewardsBg2.x =CANVAS_WIDTH/2-319;
        menuPlayerRewardsBg2.y =CANVAS_HEIGHT/2+641;
        menuPlayerRewardsBg2.regX = 0.5;
        menuPlayerRewardsBg2.regY = 0.5;

        scoreForReward2 = (amount[rewardStatusResponseDetails["result"][0].length - 2] - _totalScore - _iScore);
        if (scoreForReward2 < 0)
            scoreForReward2 = 0;
        var currentGiftVoucherForReward2 = usedCount[rewardStatusResponseDetails["result"][0].length - 2];
        var remainingGiftVoucherForReward2 = totalCount[rewardStatusResponseDetails["result"][0].length - 2];
        var rewardWorth2 = 500;

        var reward2Text = new createjs.Text("Score " + scoreForReward2 + " more to unlock\n" + currentGiftVoucherForReward2 + "/" + remainingGiftVoucherForReward2 + " used", "24px Tondo_Std_Rg", "#ffffff");
        reward2Text.x = CANVAS_WIDTH/2-289;
        reward2Text.y = CANVAS_HEIGHT/2+671;
        reward2Text.regX = 0.5;
        reward2Text.regY = 0.5;
        var reward2Text2 = new createjs.Text("Amazon Voucher Gift\nWorth ₹" + rewardWorth2, "32px Tondo_Std_Bd", "#ffffff");
        reward2Text2.x = CANVAS_WIDTH/2-289;
        reward2Text2.y = CANVAS_HEIGHT/2+777;
        reward2Text2.regX = 0.5;
        reward2Text2.regY = 0.5;

        reward2ClaimRect = this.CreateRect(CANVAS_WIDTH/2-280, CANVAS_HEIGHT/2+895, 100, 50, 10, 10, 10, 10, '#ffffff', 1);
        reward2ClaimRect.regX = 0.5;
        reward2ClaimRect.regY = 0.5;
        reward2ClaimRectText = new createjs.Text("Claim", "28px Tondo_Std_Rg", "#4b4956");
        reward2ClaimRectText.x = CANVAS_WIDTH/2-266;
        reward2ClaimRectText.y = CANVAS_HEIGHT/2+907;
        reward2ClaimRectText.regX = 0.5;
        reward2ClaimRectText.regY = 0.5;
        if ((scoreForReward2 == 0) && (prizeStatus[rewardStatusResponseDetails["result"][0].length - 2] == "active")) {
            reward2ClaimRect.alpha = 1;
            reward2ClaimRectText.alpha = 1;
            reward2ClaimRect.mouseEnabled = true;
        } else {
            reward2ClaimRect.alpha = 0.5;
            reward2ClaimRectText.alpha = 0.5;
            reward2ClaimRect.mouseEnabled = false;
        }
        reward2ClaimRect.addEventListener("click", this.reward2ClaimPressed);
        //Reward 3--------------------------------------------------------------------------------


        menuPlayerRewardsBg3 = createBitmap(s_oSpriteLibrary.getSprite('scroll1'));
        menuPlayerRewardsBg3.x = CANVAS_WIDTH/2-319;
        menuPlayerRewardsBg3.y = CANVAS_HEIGHT/2+1009;
        menuPlayerRewardsBg3.regX = 0.5;
        menuPlayerRewardsBg3.regY = 0.5;

        scoreForReward3 = (amount[rewardStatusResponseDetails["result"][0].length - 3] - _totalScore -_iScore);
        if (scoreForReward3 < 0)
            scoreForReward3 = 0;
        var currentGiftVoucherForReward3 = usedCount[rewardStatusResponseDetails["result"][0].length - 3];
        var remainingGiftVoucherForReward3 = totalCount[rewardStatusResponseDetails["result"][0].length - 3];

        var reward3Text = new createjs.Text("Score " + scoreForReward3 + " more to unlock\n" + currentGiftVoucherForReward3 + "/" + remainingGiftVoucherForReward3 + " used", "24px Tondo_Std_Rg", "#ffffff");
        reward3Text.x = CANVAS_WIDTH/2-279;
        reward3Text.y =CANVAS_HEIGHT/2+1040;
        reward3Text.regX = 0.5;
        reward3Text.regY = 0.5;
        var reward3Text3 = new createjs.Text("Pepple Spirit GO HD\nSound Wireless Earbuds", "32px Tondo_Std_Bd", "#ffffff");
        reward3Text3.x =  CANVAS_WIDTH/2-279;
        reward3Text3.y = CANVAS_HEIGHT/2+1135;
        reward3Text3.regX = 0.5;
        reward3Text3.regY = 0.5;

        reward3ClaimRect = this.CreateRect(CANVAS_WIDTH/2-270,  CANVAS_HEIGHT/2+1251, 100, 50, 10, 10, 10, 10, '#ffffff', 1);
        reward3ClaimRect.regX = 0.5;
        reward3ClaimRect.regY = 0.5;
        reward3ClaimRectText = new createjs.Text("Claim", "28px Tondo_Std_Rg", "#4b4956");
        reward3ClaimRectText.x =  CANVAS_WIDTH/2-253;
        reward3ClaimRectText.y =  CANVAS_HEIGHT/2+1262;
        reward3ClaimRectText.regX = 0.5;
        reward3ClaimRectText.regY = 0.5;
        if ((scoreForReward3 == 0) && (prizeStatus[rewardStatusResponseDetails["result"][0].length - 3] == "active")) {
            reward3ClaimRect.alpha = 1;
            reward3ClaimRectText.alpha = 1;
            reward3ClaimRect.mouseEnabled = true;
        } else {
            reward3ClaimRect.alpha = 0.5;
            reward3ClaimRectText.alpha = 0.5;
            reward3ClaimRect.mouseEnabled = false;
        }
        reward3ClaimRect.addEventListener("click", this.reward3ClaimPressed);



        //Reward 4-------------------------------------------------------------------------------------        
        menuPlayerRewardsBg4 = createBitmap(s_oSpriteLibrary.getSprite('scroll3'));
        menuPlayerRewardsBg4.x =CANVAS_WIDTH/2-319;
        menuPlayerRewardsBg4.y =CANVAS_HEIGHT/2+1377;
        menuPlayerRewardsBg4.regX = 0.5;
        menuPlayerRewardsBg4.regY = 0.5;

        scoreForReward4 = (amount[rewardStatusResponseDetails["result"][0].length - 4] - _totalScore - _iScore);
        if (scoreForReward4 < 0)
            scoreForReward4 = 0;
        var currentGiftVoucherForReward4 = usedCount[rewardStatusResponseDetails["result"][0].length - 4];
        var remainingGiftVoucherForReward4 = totalCount[rewardStatusResponseDetails["result"][0].length - 4];

        var reward4Text = new createjs.Text("Score " + scoreForReward4 + " more to unlock\n" + currentGiftVoucherForReward4 + "/" + remainingGiftVoucherForReward4 + " used", "24px Tondo_Std_Rg", "#ffffff");
        reward4Text.x = CANVAS_WIDTH/2-279;
        reward4Text.y = CANVAS_HEIGHT/2+1420;
        reward4Text.regX = 0.5;
        reward4Text.regY = 0.5;

        var reward4Text4 = new createjs.Text("Timex Helix Gusto\nHRM Fitness Bands", "32px Tondo_Std_Bd", "#ffffff");
        reward4Text4.x = CANVAS_WIDTH/2-279;
        reward4Text4.y =  CANVAS_HEIGHT/2+1510;
        reward4Text4.regX = 0.5;
        reward4Text4.regY = 0.5;


        reward4ClaimRect = this.CreateRect( CANVAS_WIDTH/2-270, CANVAS_HEIGHT/2+1630, 110, 50, 10, 10, 10, 10, '#ffffff', 1);
        reward4ClaimRect.regX = 0.5;
        reward4ClaimRect.regY = 0.5;
        reward4ClaimRectText = new createjs.Text("Claim", "28px Tondo_Std_Rg", "#4b4956");
        reward4ClaimRectText.x =CANVAS_WIDTH/2-250;
        reward4ClaimRectText.y = CANVAS_HEIGHT/2+1641;
        reward4ClaimRectText.regX = 0.5;
        reward4ClaimRectText.regY = 0.5;
        if ((scoreForReward4 == 0) && (prizeStatus[rewardStatusResponseDetails["result"][0].length - 4] == "active")) {
            reward4ClaimRect.alpha = 1;
            reward4ClaimRectText.alpha = 1;
            reward4ClaimRect.mouseEnabled = true;
        } else {
            reward4ClaimRect.alpha = 0.5;
            reward4ClaimRectText.alpha = 0.5;
            reward4ClaimRect.mouseEnabled = false;
        }
        reward4ClaimRect.addEventListener("click", this.reward4ClaimPressed);

        //Reward 5-------------------------------------------------------------------------------------        
        menuPlayerRewardsBg5 = createBitmap(s_oSpriteLibrary.getSprite('scroll4'));
        menuPlayerRewardsBg5.x =  CANVAS_WIDTH/2-319;
        menuPlayerRewardsBg5.y =CANVAS_HEIGHT/2+1745;
        menuPlayerRewardsBg5.regX = 0.5;
        menuPlayerRewardsBg5.regY = 0.5;

        scoreForReward5 = 10;
        var currentGiftVoucherForReward5 = 0;
        var remainingGiftVoucherForReward5 = 10;

        var reward5Text = new createjs.Text("Top " + scoreForReward5 + " scorers\n" + currentGiftVoucherForReward5 + "/" + remainingGiftVoucherForReward5 + " used", "24px Tondo_Std_Rg", "#ffffff");
        reward5Text.x = CANVAS_WIDTH/2-279;
        reward5Text.y =  CANVAS_HEIGHT/2+1770;
        reward5Text.regX = 0.5;
        reward5Text.regY = 0.5;

        var reward5Text5 = new createjs.Text("Lloyd 32 Inch\nLED TV", "32px Tondo_Std_Bd", "#ffffff");
        reward5Text5.x = CANVAS_WIDTH/2-279;
        reward5Text5.y =CANVAS_HEIGHT/2+1870;
        reward5Text5.regX = 0.5;
        reward5Text5.regY = 0.5;

        reward5ClaimRect = this.CreateRect(CANVAS_WIDTH/2-270, CANVAS_HEIGHT/2+1984, 110, 50, 10, 10, 10, 10, '#ffffff', 1);
        reward5ClaimRect.regX = 0.5;
        reward5ClaimRect.regY = 0.5;
        reward5ClaimRectText = new createjs.Text("Claim", "28px Tondo_Std_Rg", "#4b4956");
        reward5ClaimRectText.x = CANVAS_WIDTH/2-250;
        reward5ClaimRectText.y = CANVAS_HEIGHT/2+1996;
        reward5ClaimRectText.regX = 0.5;
        reward5ClaimRectText.regY = 0.5;
        reward5ClaimRect.mouseEnabled = true;
        reward5ClaimRect.addEventListener("click", this.reward5ClaimPressed);
        //---------------------------------------------------------------------------------------------------


        termsAndConditionText = new createjs.Text("Terms And Conditions", "24px Tondo_Std_Rg", "#5a80aa");
        termsAndConditionText.x = CANVAS_WIDTH / 2;
        termsAndConditionText.y =  CANVAS_HEIGHT/2+2151;
        termsAndConditionText.textAlign = "center";
        termsAndConditionText.textBaseline = "alphabetic";
        termsAndConditionText.mouseEnabled = true;
        termsAndConditionText.addEventListener("click", this.termsAndConditionTextPressed);
		gameScoreBackButton = createBitmap(s_oSpriteLibrary.getSprite('back_to_game'));
                                 gameScoreBackButton.x = CANVAS_WIDTH / 2-325;
                                 gameScoreBackButton.y =CANVAS_HEIGHT/2-545;
                                 gameScoreBackButton.regX = 0.5;
                                 gameScoreBackButton.regY = 0.5;
                                 gameScoreBackButton.mouseEnabled = true;
                                 gameScoreBackButton.addEventListener("click", this.gameScoreBackButtonPressed);
        
        gameScoreGroup.addChild(gameScoreBgRect,
								gameScoreBg,
                                gameScoreBgHeaderRect,
                                gameScoreBgHomeRect,
                                gameScoreAirtelLogo,
                                gameScoreBgHomeRect,
                                gameScoreBgHomeImage,
                                gameScoreBgHomeText,
                                 goodGameText,
                                gameScorerRunBg,
                                gameScorerScore,
                                gameScorerScoreText,
                                gameScorerChallengeButtonRect,
                                gameScorerChallengeButtonText,
		                        gameScoreChallengetext2,
                                gameScorer3starImage,
                                gameScorerRewardsText,
                                menuPlayerRewardsBg, 
                                menuPlayerRewardsBg2, 
                                menuPlayerRewardsBg3, 
                                menuPlayerRewardsBg4, 
                                menuPlayerRewardsBg5, 
                                termsAndConditionText,
								gameScoreBackButton,
                                 reward1Text, 
                                 reward1Text1, 
                                 reward2Text, 
                                 reward2Text2, 
                                 reward3Text, 
                                 reward3Text3, 
                                 reward4Text, 
                                 reward4Text4, 
                                 reward5Text, 
                                 reward5Text5, 
                                 reward1ClaimRect, 
                                 reward1ClaimRectText,
                                 reward2ClaimRect,
                                 reward2ClaimRectText,
                                 reward3ClaimRect,
                                 reward3ClaimRectText,
                                 reward4ClaimRect,
                                 reward4ClaimRectText,
                                 reward5ClaimRect, 
                                 reward5ClaimRectText);
                                 gameScoreGroup.mask = maskRect;
                                 
								 s_oStage.addChild(maskRect);
                                 s_oStage.addChild(gameScoreGroup);
                                 

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);

    };


    this.gameScoreBackButtonPressed = function() {
        s_oStage.removeAllChildren();
        gameScoreGroup.visible = false;
        gameScoreBg.removeAllEventListeners("click", function() {});
        createjs.Tween.get(gameScoreGroup).to({ alpha: 0 }, 500).call(function() {
            s_oStage.removeChild(gameScoreGroup);
        });
        _totalScore = (parseInt(_totalScore) + parseInt(_iScore)).toString();
        _iScore = 0;
        s_oMenu = new CMenu();
    };



    this.termsAndConditionTextPressed = function() {
        s_oStage.removeAllChildren();
        var termsCondition = CTermsAndCondition();
    };

    this.howToPlayBgPressed = function() {
        s_oStage.removeAllChildren();
        var howToPlay = CHowToPlay();

    };
    this.topScorersBgPressed = function() {
        s_oStage.removeAllChildren();
        var topScorer = CTopScorer();
    };
    this.faqsBgPressed = function() {
        s_oStage.removeAllChildren();
        var faqs = CFaqs();
    };

    this.gameScorerChallengeButtonRectPressed = function() {
        _iScore = 0;
        gameScoreGroup.visible = false;
        gameScoreBg.removeAllEventListeners("click", function() {});
        createjs.Tween.get(gameScoreGroup).to({ alpha: 0 }, 500).call(function() {
            s_oStage.removeChild(gameScoreGroup);
        });
        var oSharePanel = CSharePanel(s_oStage);
        oSharePanel.show();
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
	
	this.gameScoreBgHomeRectPressed = function( ){
        try{
            API.logout(token, 4);
        }
        catch(err){
            console.log("The Logout Error from CGameScore................"+err);
            MyAirtelAppReact.close();
        }
	}
   
    this.ShowGameScore = function() {
        gameScoreGroup.visible = true;
        createjs.Tween.get(gameScoreGroup).to({ alpha: 1 }, 500).call(function() {
        });
    };
    this.unload = function() {
        gameScoreGroup.visible = false;
        gameScoreBg.removeAllEventListeners("click", function() {});
        createjs.Tween.get(gameScoreGroup).to({ alpha: 0 }, 500).call(function() {
            s_oStage.removeChild(gameScoreGroup);
        });
    };

    this.refreshButtonPos = function(iNewX, iNewY) {};

    this.resetFullscreenBut = function() {
        if (_fRequestFullScreen && screenfull.enabled) {}
    };


    this.reward1ClaimPressed = function() {
        if ((scoreForReward1 == 0) && (prizeStatus[rewardStatusResponseDetails["result"][0].length - 1] == "active")) {
            API.GetReedemPrizeResponseDetails(token, 1);
            var Cclaim = new CClaimConfirmPanel();
        }
    };

    this.reward2ClaimPressed = function() {
        if ((scoreForReward2 == 0) && (prizeStatus[rewardStatusResponseDetails["result"][0].length - 2] == "active")) {
            API.GetReedemPrizeResponseDetails(token, 2);
            var Cclaim = new CClaimConfirmPanel();
        }
    };
    this.reward3ClaimPressed = function() {
        if ((scoreForReward3 == 0) && (prizeStatus[rewardStatusResponseDetails["result"][0].length - 3] == "active")) {
            API.GetReedemPrizeResponseDetails(token, 3);
            var Cclaim = new CClaimConfirmPanel();
        }
    };

    this.reward4ClaimPressed = function() {
        if ((scoreForReward4 == 0) && (prizeStatus[rewardStatusResponseDetails["result"][0].length - 4] == "active")) {
            API.GetReedemPrizeResponseDetails(token, 4);
            var Cclaim = new CClaimConfirmPanel();
        }
    };

    this.reward5ClaimPressed = function() {
        API.GetReedemPrizeResponseDetails(token, 5);
    };


    sizeHandler();

    this._init();

    return this;
}