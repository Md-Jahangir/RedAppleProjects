
var scrollContainer;

function CMenu() {
    var menuRewardsForYouText;
    var menuBgHeaderRect;
    var menuAirtelLogo;
    var menuBgHomeRect;
    var menuBgHomeImage;
    var menuBgHomeText;

    var menuBgWelcomeText;
    var menuBgYourScoreText;
    var menuBgWelcomeNameText;
    var menuBgYourScore;
    var howToPlayBg;
    var howToPlayImage;
    var howToPlayText;

    var topScorersBg;
    var topScorersImage;
    var topScorersText;
    var faqsBg;
    var faqsImage;
    var faqsText;
    var menuPlayerSelectionBg;
    var menuPlayerRewardsBg;
    var helpDeskText;
    var termsAndConditionText;
    var deviderText;

    var _oPlayButtonBase;
    var _oPlayButtonText;

    var container;
    var scrollerWindow1;
    var indiaVsSpouthAfricaText;
    var southAfricaFlag;
    var indiaFlag;

    var _fRequestFullScreen = null;
    var menuBgRect;

    var _oFade;

    // var scrollContainer;
    var maskRect;
    var mouseInitialPosition;
    var menuPlayerRewardsBg;
    var menuPlayerRewardsBg2;
    var menuPlayerRewardsBg3;
    var menuPlayerRewardsBg4;
    var menuPlayerRewardsBg5;

    var scoreForReward1;
    var scoreForReward2;
    var scoreForReward3;
    var scoreForReward4;
    var scoreForReward5;

    var reward1ClaimRect;
    var reward1ClaimRectText;
    var reward2ClaimRect;
    var reward2ClaimRectText;
    var reward3ClaimRect;
    var reward3ClaimRectText;
    var reward4ClaimRect;
    var reward4ClaimRectText;
    var reward5ClaimRect;
    var reward5ClaimRectText;

	var bonanzaLogo;
    this._init = function() {
        _iActivePlayerTeam = 0;
        _iActiveOpponentTeam = TEXT_TEAM.length - 1;
		
		scrollContainer = new createjs.Container();
        maskRect = this.CreateRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 1, 1, 1, 1, '#ffffff', 0.05);
        maskRect.regX = 0.5;
        maskRect.regY = 0.5;
        maskRect.mouseEnabled = true;
        //-------

        menuBgRect = createBitmap(s_oSpriteLibrary.getSprite('howToBg'));
        menuBgRect.x = 0;
        menuBgRect.y = 0;
        menuBgRect.regX = 0.5;
        menuBgRect.regY = 0.5;
		 menuBgRect.scaleY=2;

        menuBgHeaderRect = this.CreateRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT - 1244, 1, 1, 1, 1, '#ffffff', 1);
        menuBgHeaderRect.shadow = new createjs.Shadow("#000000", -0, -1, 8);

        menuAirtelLogo = createBitmap(s_oSpriteLibrary.getSprite('airtel'));
        menuAirtelLogo.x = CANVAS_WIDTH / 2 - 306;
        menuAirtelLogo.y = CANVAS_HEIGHT - (CANVAS_HEIGHT - (2 * 13));

		menuBgHomeRect = this.CreateRect( CANVAS_WIDTH / 2+130, CANVAS_HEIGHT/2-645, 200, 50, 10, 10, 10, 10, 'red', 1);
        menuBgHomeRect.regX = 0.5;
        menuBgHomeRect.regY = 0.5;
		menuBgHomeRect.mouseEnabled = true;
		menuBgHomeRect.addEventListener( "click", this.menuBgHomeImageButtonPressed );
        menuBgHomeImage = createBitmap(s_oSpriteLibrary.getSprite('home'));
        menuBgHomeImage.x = CANVAS_WIDTH/2+140;
        menuBgHomeImage.y = CANVAS_HEIGHT/2-635;
        menuBgHomeImage.regX = 0.5;
        menuBgHomeImage.regY = 0.5;
		
		menuBgHomeText = new createjs.Text("Home", "20px Tondo_Std_Bd", "#ffffff");
        menuBgHomeText.x =  CANVAS_WIDTH/2+245;
        menuBgHomeText.y = CANVAS_HEIGHT/2-615;
		menuBgHomeText.textAlign = "center";
        menuBgHomeText.textBaseline = "alphabetic";

        
       menuBgWelcomeText = new createjs.Text("Welcome", "24px "+TondoRG, "#000000");
        menuBgWelcomeText.x =  CANVAS_WIDTH/2-305;
        menuBgWelcomeText.y =  CANVAS_HEIGHT/2-545;
        menuBgWelcomeText.regX = 0.5;
        menuBgWelcomeText.regY = 0.5;

       menuBgYourScoreText = new createjs.Text("Your runs", "24px Tondo_Std_Rg", "#000000");
        menuBgYourScoreText.x =  CANVAS_WIDTH/2+205;
        menuBgYourScoreText.y =CANVAS_HEIGHT/2-545;
        menuBgYourScoreText.regX = 0.5;
        menuBgYourScoreText.regY = 0.5;

        menuBgYourScore = new createjs.Text(_totalScore, "40px Tondo_Std_Bd", "#000000");
        menuBgYourScore.x = CANVAS_WIDTH/2+210;
        menuBgYourScore.y = CANVAS_HEIGHT/2-515;
        menuBgYourScore.regX = 0.5;
        menuBgYourScore.regY = 0.5;

        menuBgWelcomeNameText = new createjs.Text("YOU", "40px Tondo_Std_Bd", "#000000");
        menuBgWelcomeNameText.x = CANVAS_WIDTH/2-300;
        menuBgWelcomeNameText.y = CANVAS_HEIGHT/2-515;
        menuBgWelcomeNameText.regX = 0.5;
        menuBgWelcomeNameText.regY = 0.5;

        menuPlayerSelectionBg = createBitmap(s_oSpriteLibrary.getSprite('teamselectionbg'));
        menuPlayerSelectionBg.x = CANVAS_WIDTH/2-325;
        menuPlayerSelectionBg.y = CANVAS_HEIGHT/2-455;
        menuPlayerSelectionBg.regX = 0.5;
        menuPlayerSelectionBg.regY = 0.5;
		
		bonanzaLogo = createBitmap(s_oSpriteLibrary.getSprite('bonanza_logo'));
		bonanzaLogo.x = CANVAS_WIDTH/2-120;
		bonanzaLogo.y = CANVAS_HEIGHT/2-440;
		bonanzaLogo.regX = 0.5;
        bonanzaLogo.regY = 0.5;


        howToPlayBg = this.CreateCircle(CANVAS_WIDTH/2-160,  CANVAS_HEIGHT/2+80, 55, '#ffffff', 0.5);
        howToPlayImage = createBitmap(s_oSpriteLibrary.getSprite('how_to_play'));
        howToPlayImage.x = CANVAS_WIDTH/2-188;
        howToPlayImage.y =CANVAS_HEIGHT/2+48;
        howToPlayImage.regX = 0.5;
        howToPlayImage.regY = 0.5;
        howToPlayText = new createjs.Text("How To Play", "24px Tondo_Std_Rg", "#000000");
        howToPlayText.x =CANVAS_WIDTH/2-160;
        howToPlayText.y = CANVAS_HEIGHT/2+165;
        howToPlayText.regX = 0.5;
        howToPlayText.regY = 0.5;
        howToPlayText.textAlign = "center";
        howToPlayText.textBaseline = "alphabetic";
        howToPlayBg.mouseEnabled = true;
        howToPlayBg.addEventListener("click", this.howToPlayBgPressed);


        faqsBg = this.CreateCircle( CANVAS_WIDTH/2+155, CANVAS_HEIGHT/2+75, 55, '#ffffff', 0.5);
        faqsImage = createBitmap(s_oSpriteLibrary.getSprite('faqs'));
        faqsImage.x = CANVAS_WIDTH/2+120;
        faqsImage.y = CANVAS_HEIGHT/2+45;
        faqsImage.regX = 0.5;
        faqsImage.regY = 0.5;
        faqsText = new createjs.Text("FAQs", "24px Tondo_Std_Rg", "#000000");
        faqsText.x = CANVAS_WIDTH/2+160;
        faqsText.y = CANVAS_HEIGHT/2+155;
        faqsText.regX = 0.5;
        faqsText.regY = 0.5;
        faqsText.textAlign = "center";
        faqsText.textBaseline = "alphabetic";
        faqsBg.mouseEnabled = true;
        faqsBg.addEventListener("click", this.faqsBgPressed);

        menuRewardsForYouText = new createjs.Text("Rewards For You", "40px Tondo_Std_Bd", "#4b4956");
        menuRewardsForYouText.x = CANVAS_WIDTH/2;
        menuRewardsForYouText.y = CANVAS_HEIGHT/2+240;
        menuRewardsForYouText.regX = 0.5;
        menuRewardsForYouText.regY = 0.5;
        menuRewardsForYouText.textAlign = "center";
        menuRewardsForYouText.textBaseline = "alphabetic";
        
        maskRect.on("pressmove", function(evt) {

            if (scrollContainer.y < 0) {
                if (evt.stageY > mouseInitialPosition) {
                    console.log("move"+mouseInitialPosition-evt.stageY);
                    scrollContainer.y += (evt.stageY - mouseInitialPosition);
                    mouseInitialPosition = evt.stageY;
                }
            }
            if (scrollContainer.y > -(CANVAS_HEIGHT/2+885)) {
                if (evt.stageY < mouseInitialPosition) {
                    console.log("move"+evt.stageY - mouseInitialPosition);
                    scrollContainer.y -= (mouseInitialPosition - evt.stageY);
                    mouseInitialPosition = evt.stageY;
                }
            }
        });
        maskRect.on("mousedown", function(evt) {
            mouseInitialPosition = evt.stageY;
        });

       //Reward 1----------------------------------------------------------------------
        menuPlayerRewardsBg = createBitmap(s_oSpriteLibrary.getSprite('scroll2'));
        menuPlayerRewardsBg.x =  CANVAS_WIDTH/2-319;
        menuPlayerRewardsBg.y = CANVAS_HEIGHT/2+275;
        menuPlayerRewardsBg.regX = 0.5;
        menuPlayerRewardsBg.regY = 0.5;

        scoreForReward1 = (amount[rewardStatusResponseDetails["result"][0].length - 1] - _totalScore);
        if (scoreForReward1 < 0)
            scoreForReward1 = 0;
        var currentGiftVoucherForReward1 = usedCount[rewardStatusResponseDetails["result"][0].length - 1];
        var remainingGiftVoucherForReward1 = totalCount[rewardStatusResponseDetails["result"][0].length - 1];
        var rewardWorth1 = 100;

        var reward1Text = new createjs.Text("Score " + scoreForReward1 + " more to unlock\n" + currentGiftVoucherForReward1 + "/" + remainingGiftVoucherForReward1 + " used", "24px Tondo_Std_Rg", "#ffffff");
        reward1Text.x = CANVAS_WIDTH/2-289;
        reward1Text.y = CANVAS_HEIGHT/2+300;
        reward1Text.regX = 0.5;
        reward1Text.regY = 0.5;
        reward1Text.lineHeight = 35;

        var reward1Text1 = new createjs.Text("Amazon Voucher Gift\nWorth ₹" + rewardWorth1, "32px Tondo_Std_Bd", "#ffffff");
        reward1Text1.x = CANVAS_WIDTH/2-289;
        reward1Text1.y = CANVAS_HEIGHT/2+405;
        reward1Text1.regX = 0.5;
        reward1Text1.regY = 0.5;
        reward1Text1.lineHeight = 45;

        reward1ClaimRect = this.CreateRect(CANVAS_WIDTH/2-280, CANVAS_HEIGHT/2+520, 100, 50, 10, 10, 10, 10, '#ffffff', 1);
        reward1ClaimRect.regX = 0.5;
        reward1ClaimRect.regY = 0.5;
        reward1ClaimRectText = new createjs.Text("Claim", "28px Tondo_Std_Bd", "#4b4956");
        reward1ClaimRectText.x = CANVAS_WIDTH/2-268;
        reward1ClaimRectText.y = CANVAS_HEIGHT/2+532;
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
        menuPlayerRewardsBg2.x = CANVAS_WIDTH/2-319;
        menuPlayerRewardsBg2.y = CANVAS_HEIGHT/2+641;
        menuPlayerRewardsBg2.regX = 0.5;
        menuPlayerRewardsBg2.regY = 0.5;

        scoreForReward2 = (amount[rewardStatusResponseDetails["result"][0].length - 2] - _totalScore);
        if (scoreForReward2 < 0)
            scoreForReward2 = 0;
        var currentGiftVoucherForReward2 = usedCount[rewardStatusResponseDetails["result"][0].length - 2];
        var remainingGiftVoucherForReward2 = totalCount[rewardStatusResponseDetails["result"][0].length - 2];
        var rewardWorth2 = 500;

        var reward2Text = new createjs.Text("Score " + scoreForReward2 + " more to unlock\n" + currentGiftVoucherForReward2 + "/" + remainingGiftVoucherForReward2 + " used", "24px Tondo_Std_Rg", "#ffffff");
        reward2Text.x =  CANVAS_WIDTH/2-289;
        reward2Text.y = CANVAS_HEIGHT/2+681;
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
        reward2ClaimRectText = new createjs.Text("Claim", "28px Tondo_Std_Bd", "#4b4956");
        reward2ClaimRectText.x = CANVAS_WIDTH/2-268;
        reward2ClaimRectText.y =CANVAS_HEIGHT/2+909;
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

        scoreForReward3 = (amount[rewardStatusResponseDetails["result"][0].length - 3] - _totalScore);
        if (scoreForReward3 < 0)
            scoreForReward3 = 0;
        var currentGiftVoucherForReward3 = usedCount[rewardStatusResponseDetails["result"][0].length - 3];
        var remainingGiftVoucherForReward3 = totalCount[rewardStatusResponseDetails["result"][0].length - 3];

        var reward3Text = new createjs.Text("Score " + scoreForReward3 + " more to unlock\n" + currentGiftVoucherForReward3 + "/" + remainingGiftVoucherForReward3 + " used", "24px Tondo_Std_Rg", "#ffffff");
        reward3Text.x =CANVAS_WIDTH/2-279;
        reward3Text.y = CANVAS_HEIGHT/2+1040;
        reward3Text.regX = 0.5;
        reward3Text.regY = 0.5;
        var reward3Text3 = new createjs.Text("Pepple Spirit GO HD\nSound Wireless Earbuds", "32px Tondo_Std_Bd", "#ffffff");
        reward3Text3.x = CANVAS_WIDTH/2-279;
        reward3Text3.y = CANVAS_HEIGHT/2+1135;
        reward3Text3.regX = 0.5;
        reward3Text3.regY = 0.5;

        reward3ClaimRect = this.CreateRect(CANVAS_WIDTH/2-270, CANVAS_HEIGHT/2+1251, 100, 50, 10, 10, 10, 10, '#ffffff', 1);
        reward3ClaimRect.regX = 0.5;
        reward3ClaimRect.regY = 0.5;
        reward3ClaimRectText = new createjs.Text("Claim", "28px Tondo_Std_Bd", "#4b4956");
        reward3ClaimRectText.x = CANVAS_WIDTH/2-256;
        reward3ClaimRectText.y =CANVAS_HEIGHT/2+1264;
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
        menuPlayerRewardsBg4.y = CANVAS_HEIGHT/2+1377;
        menuPlayerRewardsBg4.regX = 0.5;
        menuPlayerRewardsBg4.regY = 0.5;

        scoreForReward4 = (amount[rewardStatusResponseDetails["result"][0].length - 4] - _totalScore);
        if (scoreForReward4 < 0)
            scoreForReward4 = 0;
        var currentGiftVoucherForReward4 = usedCount[rewardStatusResponseDetails["result"][0].length - 4];
        var remainingGiftVoucherForReward4 = totalCount[rewardStatusResponseDetails["result"][0].length - 4];

        var reward4Text = new createjs.Text("Score " + scoreForReward4 + " more to unlock\n" + currentGiftVoucherForReward4 + "/" + remainingGiftVoucherForReward4 + " used", "24px Tondo_Std_Rg", "#ffffff");
        reward4Text.x = CANVAS_WIDTH/2-279;
        reward4Text.y =CANVAS_HEIGHT/2+1420;
        reward4Text.regX = 0.5;
        reward4Text.regY = 0.5;

        var reward4Text4 = new createjs.Text("Timex Helix Gusto\nHRM Fitness Bands", "32px Tondo_Std_Bd", "#ffffff");
        reward4Text4.x =CANVAS_WIDTH/2-279;
        reward4Text4.y = CANVAS_HEIGHT/2+1510;
        reward4Text4.regX = 0.5;
        reward4Text4.regY = 0.5;


        reward4ClaimRect = this.CreateRect(CANVAS_WIDTH/2-270,  CANVAS_HEIGHT/2+1630, 110, 50, 10, 10, 10, 10, '#ffffff', 1);
        reward4ClaimRect.regX = 0.5;
        reward4ClaimRect.regY = 0.5;
        reward4ClaimRectText = new createjs.Text("Claim", "28px Tondo_Std_Bd", "#4b4956");
        reward4ClaimRectText.x = CANVAS_WIDTH/2-256;
        reward4ClaimRectText.y = CANVAS_HEIGHT/2+ 1643;
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
        menuPlayerRewardsBg5.x = CANVAS_WIDTH/2-319;
        menuPlayerRewardsBg5.y = CANVAS_HEIGHT/2+1745;
        menuPlayerRewardsBg5.regX = 0.5;
        menuPlayerRewardsBg5.regY = 0.5;

        scoreForReward5 = 10;
        var currentGiftVoucherForReward5 = 0;
        var remainingGiftVoucherForReward5 = 10;

        var reward5Text = new createjs.Text("Top " + scoreForReward5 + " scorers\n" + currentGiftVoucherForReward5 + "/" + remainingGiftVoucherForReward5 + " used", "24px Tondo_Std_Rg", "#ffffff");
        reward5Text.x = CANVAS_WIDTH/2-279;
        reward5Text.y = CANVAS_HEIGHT/2+1770;
        reward5Text.regX = 0.5;
        reward5Text.regY = 0.5;

        var reward5Text5 = new createjs.Text("Lloyd 32 Inch\nLED TV", "32px Tondo_Std_Bd", "#ffffff");
        reward5Text5.x = CANVAS_WIDTH/2-279;
        reward5Text5.y =  CANVAS_HEIGHT/2+1870;
        reward5Text5.regX = 0.5;
        reward5Text5.regY = 0.5;

        reward5ClaimRect = this.CreateRect(CANVAS_WIDTH/2-270,  CANVAS_HEIGHT/2+1984, 110, 50, 10, 10, 10, 10, '#ffffff', 1);
        reward5ClaimRect.regX = 0.5;
        reward5ClaimRect.regY = 0.5;
        reward5ClaimRectText = new createjs.Text("Claim", "28px Tondo_Std_Bd", "#4b4956");
        reward5ClaimRectText.x = CANVAS_WIDTH/2-256;
        reward5ClaimRectText.y =  CANVAS_HEIGHT/2+1998;
        reward5ClaimRectText.regX = 0.5;
        reward5ClaimRectText.regY = 0.5;
        reward5ClaimRect.mouseEnabled = true;
        reward5ClaimRect.addEventListener("click", this.reward5ClaimPressed);

        termsAndConditionText = new createjs.Text("Terms And conditions", "24px Tondo_Std_Rg", "#5a80aa");
        termsAndConditionText.x = CANVAS_WIDTH / 2;
        termsAndConditionText.y = CANVAS_HEIGHT/2+2151;
        termsAndConditionText.textAlign = "center";
        termsAndConditionText.textBaseline = "alphabetic";
        termsAndConditionText.mouseEnabled = true;
        termsAndConditionText.addEventListener("click", this.termsAndConditionTextPressed);

        scrollContainer.addChild(menuPlayerRewardsBg, menuPlayerRewardsBg2, menuPlayerRewardsBg3, menuPlayerRewardsBg4, menuPlayerRewardsBg5, termsAndConditionText, reward1Text, reward1Text1, reward2Text, reward2Text2, reward3Text, reward3Text3, reward4Text, reward4Text4, reward5Text, reward5Text5, reward1ClaimRect, reward1ClaimRectText, reward2ClaimRect, reward2ClaimRectText, reward3ClaimRect, reward3ClaimRectText, reward4ClaimRect, reward4ClaimRectText, reward5ClaimRect, reward5ClaimRectText);
        scrollContainer.mask = maskRect;
       
		indiaVsSpouthAfricaText = new createjs.Text("IND V SA", "72px "+TondoBD, "#ffffff");
        indiaVsSpouthAfricaText.x = CANVAS_WIDTH/2;
        indiaVsSpouthAfricaText.y = CANVAS_HEIGHT/2-210;
        indiaVsSpouthAfricaText.textAlign = "center";
        indiaVsSpouthAfricaText.textBaseline = "alphabetic";

        indiaFlag = createBitmap(s_oSpriteLibrary.getSprite('indiaflag'));
        indiaFlag.x = CANVAS_WIDTH / 2-269;
        indiaFlag.y = CANVAS_HEIGHT/2-277;
        indiaFlag.regX = 0.5;
        indiaFlag.regY = 0.5;

        southAfricaFlag = createBitmap(s_oSpriteLibrary.getSprite('southafricalogo'));
        southAfricaFlag.x = CANVAS_WIDTH / 2+156;
        southAfricaFlag.y = CANVAS_HEIGHT/2-271;
        southAfricaFlag.regX = 0.5;
        southAfricaFlag.regY = 0.5;
	

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(_oFade);
        createjs.Tween.get(_oFade).to({ alpha: 0 }, 1000).call(function() {
            _oFade.visible = false;
        });

       scrollContainer.addChild(menuPlayerRewardsBg, 
                                 menuPlayerRewardsBg2, 
                                 menuPlayerRewardsBg3, 
                                 menuPlayerRewardsBg4, 
                                 menuPlayerRewardsBg5, 
                                 termsAndConditionText, 
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
                                 reward5ClaimRectText,
                                 menuBgRect,
                                 menuBgHeaderRect,
                                 menuAirtelLogo,
                                 menuBgHomeRect,
                                 menuBgHomeImage,
                                 menuBgHomeText,
                                 menuBgWelcomeText,
                                 menuBgYourScoreText,
                                 menuBgYourScore,
                                 menuBgWelcomeNameText,
                                 menuPlayerSelectionBg,
                                 howToPlayBg,
                                 howToPlayImage,
                                 howToPlayText,
                                 faqsBg,
                                 faqsImage,
                                 faqsText,
                                 menuRewardsForYouText,
                                 indiaVsSpouthAfricaText,
                                 indiaFlag,
                                 southAfricaFlag,
                                 _oPlayButtonBase,
								 bonanzaLogo);
        scrollContainer.mask = maskRect;


            var oSprite = s_oSpriteLibrary.getSprite('play_button_base');
            _oPlayButtonBase = new CGfxButton((CANVAS_WIDTH / 2), CANVAS_HEIGHT / 2 - 90, oSprite,scrollContainer);
            _oPlayButtonBase.addEventListener(ON_MOUSE_UP, this._onPlayButtonRelease, this);
            _oPlayButtonText = new createjs.Text("Play Now", "38px Tondo Regular", "#ffffff");
            _oPlayButtonText.x = (CANVAS_WIDTH / 2);
            _oPlayButtonText.y = CANVAS_HEIGHT / 2 - 90;
            _oPlayButtonText.textAlign = "center";
            _oPlayButtonText.textBaseline = "alphabetic";
            scrollContainer.addChild(_oPlayButtonText);
            if(isPlayed == 1){
                _oPlayButtonBase.mouseEnabled=false;
				_oPlayButtonBase.alpha= .2;
                _oPlayButtonText.alpha=.2;
            }
            else
            {
                _oPlayButtonBase.mouseEnabled=true;
                _oPlayButtonBase.alpha=1;
                _oPlayButtonText.alpha=1;
            }

		s_oStage.addChild(maskRect);
        s_oStage.addChild(scrollContainer);
        

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);

    };

    this.loadUrl = function(newLocation) {
        window.location = newLocation;
        return false;
    }
	
	this.update = function () {
        maskRect.on("pressmove", function(evt) {

            if (scrollContainer.y < 0) {
                if (evt.stageY > mouseInitialPosition) {
                    scrollContainer.y += (evt.stageY - mouseInitialPosition);
                    mouseInitialPosition = evt.stageY;
                }
            }
            if (scrollContainer.y > -1555) {
                if (evt.stageY < mouseInitialPosition) {
                    scrollContainer.y -= (mouseInitialPosition - evt.stageY);
                    mouseInitialPosition = evt.stageY;
                }
            }
        });
        maskRect.on("mousedown", function(evt) {
            mouseInitialPosition = evt.stageY;
        });
    };

    this.reward1ClaimPressed = function() {
        if ((scoreForReward1 == 0) && (prizeStatus[rewardStatusResponseDetails["result"][0].length - 1] == "active")) {
            API.GetReedemPrizeResponseDetails(token, 1);
            var Cclaim = new CClaimConfirmPanel();
            reward1ClaimRect.alpha = 1;
            reward1ClaimRectText.alpha = 1;
        } else {
            reward1ClaimRect.alpha = 0.5;
            reward1ClaimRectText.alpha = 0.5;
        }
    };

    this.reward2ClaimPressed = function() {
        if ((scoreForReward2 == 0) && (prizeStatus[rewardStatusResponseDetails["result"][0].length - 2] == "active")) {
            API.GetReedemPrizeResponseDetails(token, 2);
            var Cclaim = new CClaimConfirmPanel();
            reward2ClaimRect.alpha = 1;
            reward2ClaimRectText.alpha = 1;
        } else {
            reward2ClaimRect.alpha = 0.5;
            reward2ClaimRectText.alpha = 0.5;
        }
    };
    this.reward3ClaimPressed = function() {
        if ((scoreForReward3 == 0) && (prizeStatus[rewardStatusResponseDetails["result"][0].length - 3] == "active")) {
            API.GetReedemPrizeResponseDetails(token, 3);
            var Cclaim = new CClaimConfirmPanel();
            reward3ClaimRect.alpha = 1;
            reward3ClaimRectText.alpha = 1;
        } else {
            reward3ClaimRect.alpha = 0.5;
            reward3ClaimRectText.alpha = 0.5;
        }

    };

    this.reward4ClaimPressed = function() {
        if ((scoreForReward4 == 0) && (prizeStatus[rewardStatusResponseDetails["result"][0].length - 4] == "active")) {
            API.GetReedemPrizeResponseDetails(token, 4);
            var Cclaim = new CClaimConfirmPanel();
            reward4ClaimRect.alpha = 1;
            reward4ClaimRectText.alpha = 1;
        } else {
            reward4ClaimRect.alpha = 0.5;
            reward4ClaimRectText.alpha = 0.5;
        }
    };

    this.reward5ClaimPressed = function() {
        API.GetReedemPrizeResponseDetails(token, 5);
    };

    

    this._onPlayButtonRelease = function() {
		
		API.CheckPlayed(token);
    };

	this.menuBgHomeImageButtonPressed = function()
	{
        try{
            API.logout( token, 1 );
        }
        catch(err){
            console.log("The Logout Error from CMenu................"+err);
            MyAirtelAppReact.close();
        }
	}
	
    this.termsAndConditionTextPressed = function() {
        s_oStage.removeAllChildren();
        var termsCondition = CTermsAndCondition();
    };

    this.howToPlayBgPressed = function() {
        s_oStage.removeAllChildren();
        var howToPlay = new CHowToPlay();

    };
    this.topScorersBgPressed = function() {
        s_oStage.removeAllChildren();
        var topScorer = CTopScorer();
    };
    this.faqsBgPressed = function() {
        s_oStage.removeAllChildren();

        window.location.href = "https://www.airtelcricketbonanza.com/faqs.html?token="+token+"&secret="+secretKey;
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

    this.unload = function() {
        _oFade.visible = false;
        s_oStage.removeAllChildren();
        s_oMenu = null;
    };

    this.refreshButtonPos = function(iNewX, iNewY) {};

    this.resetFullscreenBut = function() {
        if (_fRequestFullScreen && screenfull.enabled) {}
    };
    sizeHandler();

    s_oMenu = this;

    this._init();

}

var s_oMenu = null;