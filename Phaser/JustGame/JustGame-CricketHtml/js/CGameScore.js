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

        // API.SaveScoreData(token, _iScore);

        gameScoreGroup = new createjs.Container();

        //--------------------------------------------------------------------------------
        maskRect = this.CreateRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 1, 1, 1, 1, '#ffffff', 0.1);
        maskRect.regX = 0.5;
        maskRect.regY = 0.5;
        maskRect.mouseEnabled = true;
        //------------------------------------------------------------------------------
        gameScoreBgRect = this.CreateRect(0, 0, CANVAS_WIDTH + 200, CANVAS_HEIGHT + 1660, 1, 1, 1, 1, '#F8ECF0', 0.7);
        gameScoreBgRect.shadow = new createjs.Shadow("#000000", -0, -1, 8);
        gameScoreBgRect.regX = 0.5;
        gameScoreBgRect.regY = 0.5;

        gameScoreBg = createBitmap(s_oSpriteLibrary.getSprite('howToBg'));
        gameScoreBg.x = 0;
        gameScoreBg.y = 0;
        gameScoreBg.regX = 0.5;
        gameScoreBg.regY = 0.5;
        gameScoreBg.scaleY = 2;


        // gameScoreBgHeaderRect = this.CreateRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT - 1244, 1, 1, 1, 1, '#ffffff', 1);
        // gameScoreBgHeaderRect.shadow = new createjs.Shadow("#000000", -0, -1, 8);
        // gameScoreBgHeaderRect.regX = 0.5;
        // gameScoreBgHeaderRect.regY = 0.5;

        // gameScoreAirtelLogo = createBitmap(s_oSpriteLibrary.getSprite('airtel'));
        // gameScoreAirtelLogo.x = CANVAS_WIDTH / 2 - 306;
        // gameScoreAirtelLogo.y = CANVAS_HEIGHT - (CANVAS_HEIGHT - (2 * 13));

        // gameScoreBgHomeRect = this.CreateRect(CANVAS_WIDTH / 2 + 130, CANVAS_HEIGHT / 2 - 645, 200, 50, 10, 10, 10, 10, 'red', 1);
        // gameScoreBgHomeRect.regX = 0.5;
        // gameScoreBgHomeRect.regY = 0.5;
        // gameScoreBgHomeRect.mouseEnabled;
        // gameScoreBgHomeRect.addEventListener("click", this.gameScoreBgHomeRectPressed);

        // gameScoreBgHomeImage = createBitmap(s_oSpriteLibrary.getSprite('home'));
        // gameScoreBgHomeImage.x = CANVAS_WIDTH / 2 + 140;
        // gameScoreBgHomeImage.y = CANVAS_HEIGHT / 2 - 635;
        // gameScoreBgHomeImage.regX = 0.5;
        // gameScoreBgHomeImage.regY = 0.5;

        // gameScoreBgHomeText = new createjs.Text("Home", "20px Tondo_Std_Bd", "#ffffff");
        // gameScoreBgHomeText.x = CANVAS_WIDTH / 2 + 205;
        // gameScoreBgHomeText.y = CANVAS_HEIGHT / 2 - 625;
        // gameScoreBgHomeText.regX = 0.5;
        // gameScoreBgHomeText.regY = 0.5;

        goodGameText = new createjs.Text("Your score", "48px Tondo_Std_Bd", "#000000");
        goodGameText.x = CANVAS_WIDTH / 2 - 125;
        goodGameText.y = CANVAS_HEIGHT / 2 - 468;
        goodGameText.regX = 0.5;
        goodGameText.regY = 0.5;

        gameScorerScoreText = new createjs.Text("runs", "56px Tondo_Std_Bd", "#000000");
        gameScorerScoreText.x = CANVAS_WIDTH / 2 - 60;
        gameScorerScoreText.y = CANVAS_HEIGHT / 2 - 155;
        gameScorerScoreText.regX = 0.5;
        gameScorerScoreText.regY = 0.5;

        gameScorerScore = new createjs.Text(_iScore, "112px Tondo_Std_Bd", "#000000");
        gameScorerScore.x = CANVAS_WIDTH / 2;
        gameScorerScore.y = CANVAS_HEIGHT / 2 - 170;
        gameScorerScore.textAlign = "center";
        gameScorerScore.textBaseline = "alphabetic";


        gameScorerRunBg = createBitmap(s_oSpriteLibrary.getSprite('gameScorerRunBg'));
        gameScorerRunBg.x = CANVAS_WIDTH / 2 - 205;
        gameScorerRunBg.y = CANVAS_HEIGHT / 2 - 345;
        gameScorerRunBg.regX = 0.5;
        gameScorerRunBg.regY = 0.5;

        // gameScorerChallengeButtonRect = this.CreateRect(CANVAS_WIDTH / 2 - 300, CANVAS_HEIGHT / 2, 600, 120, 10, 10, 10, 10, '#ffffff', 1);
        // gameScorerChallengeButtonRect.regX = 0.5;
        // gameScorerChallengeButtonRect.regY = 0.5;
        // gameScorerChallengeButtonText = new createjs.Text("Challenge your friends", "32px Tondo_Std_Bd", "black");
        // gameScorerChallengeButtonText.x = CANVAS_WIDTH / 2 - 198;
        // gameScorerChallengeButtonText.y = CANVAS_HEIGHT / 2 + 30;
        // gameScorerChallengeButtonText.regX = 0.5;
        // gameScorerChallengeButtonText.regY = 0.5;


        // gameScoreChallengetext2 = new createjs.Text("Rewards worth ₹25 Lakh up for grabs", "24px Tondo_Std_Rg", "black");
        // gameScoreChallengetext2.x = CANVAS_WIDTH / 2 - 198;
        // gameScoreChallengetext2.y = CANVAS_HEIGHT / 2 + 65;
        // gameScoreChallengetext2.regX = 0.5;
        // gameScoreChallengetext2.regY = 0.5;


        // gameScorerChallengeButtonRect.mouseEnabled = true;
        // gameScorerChallengeButtonRect.addEventListener("click", this.gameScorerChallengeButtonRectPressed);


        // gameScorer3starImage = createBitmap(s_oSpriteLibrary.getSprite('3star'));
        // gameScorer3starImage.x = CANVAS_WIDTH / 2 - 279;
        // gameScorer3starImage.y = CANVAS_HEIGHT / 2 + 23;
        // gameScorer3starImage.regX = 0.5;
        // gameScorer3starImage.regY = 0.5;

        // gameScorerRewardsText = new createjs.Text("Rewards for You", "55px Tondo Regular", "#000000");
        // gameScorerRewardsText.x = CANVAS_WIDTH / 2 - 178;
        // gameScorerRewardsText.y = CANVAS_HEIGHT / 2 + 160;
        // gameScorerRewardsText.regX = 0.5;
        // gameScorerRewardsText.regY = 0.5;



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




        termsAndConditionText = new createjs.Text("Terms And Conditions", "24px Tondo_Std_Rg", "#5a80aa");
        termsAndConditionText.x = CANVAS_WIDTH / 2;
        termsAndConditionText.y = CANVAS_HEIGHT / 2 + 2151;
        termsAndConditionText.textAlign = "center";
        termsAndConditionText.textBaseline = "alphabetic";
        termsAndConditionText.mouseEnabled = true;
        termsAndConditionText.addEventListener("click", this.termsAndConditionTextPressed);

        gameScoreBackButton = createBitmap(s_oSpriteLibrary.getSprite('back_to_game'));
        // gameScoreBackButton.x = CANVAS_WIDTH / 2 - 325;
        // gameScoreBackButton.y = CANVAS_HEIGHT / 2 - 545;
        gameScoreBackButton.x = CANVAS_WIDTH / 2 - 100;
        gameScoreBackButton.y = CANVAS_HEIGHT / 2 + 545;
        gameScoreBackButton.regX = 0.5;
        gameScoreBackButton.regY = 0.5;
        gameScoreBackButton.mouseEnabled = true;
        gameScoreBackButton.addEventListener("click", this.gameScoreBackButtonPressed);

        gameScoreGroup.addChild(gameScoreBgRect,
            gameScoreBg,
            // gameScoreBgHeaderRect,
            // gameScoreBgHomeRect,
            // gameScoreAirtelLogo,
            // gameScoreBgHomeRect,
            // gameScoreBgHomeImage,
            // gameScoreBgHomeText,
            goodGameText,
            gameScorerRunBg,
            gameScorerScore,
            gameScorerScoreText,
            // gameScorerChallengeButtonRect,
            // gameScorerChallengeButtonText,
            // gameScoreChallengetext2,
            // gameScorer3starImage,
            // gameScorerRewardsText,
            // menuPlayerRewardsBg,
            // menuPlayerRewardsBg2,
            // menuPlayerRewardsBg3,
            // menuPlayerRewardsBg4,
            // menuPlayerRewardsBg5,
            termsAndConditionText,
            gameScoreBackButton);

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

    this.gameScoreBgHomeRectPressed = function() {
        try {
            // API.logout(token, 4);
        } catch (err) {
            console.log("The Logout Error from CGameScore................" + err);
            MyAirtelAppReact.close();
        }
    }

    this.ShowGameScore = function() {
        gameScoreGroup.visible = true;
        createjs.Tween.get(gameScoreGroup).to({ alpha: 1 }, 500).call(function() {});
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

    sizeHandler();

    this._init();

    return this;
}