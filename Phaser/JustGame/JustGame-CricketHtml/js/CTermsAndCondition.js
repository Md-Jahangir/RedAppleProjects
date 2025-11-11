var termsConditionStartGameText;

function CTermsAndCondition() {
    var termsConditionBg;
    var termsConditionHeaderRect;
    var termsConditionAirtelLogo;
    var termsConditionHomeRect;
    var termsConditionHomeImage;
    var termsConditionHomeText;
    var termsConditionBackText;
    var termsConditionText;
    var scrollContainer;
    var maskRect;
    var mouseInitialPosition;
    var termsConditionText;
    var termsConditionStartGameRect;
    // var termsConditionStartGameText;
    var termsConditionPlayerRectangle;
    var scrollAreaText;

    this._init = function() {

        termsConditionBg = createBitmap(s_oSpriteLibrary.getSprite('howToBg'));
        termsConditionBg.x = 0;
        termsConditionBg.y = 0;
        termsConditionBg.regX = 0.5;
        termsConditionBg.regY = 0.5;


        termsConditionHeaderRect = this.CreateRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT - 1244, 1, 1, 1, 1, '#ffffff', 1);
        termsConditionHeaderRect.shadow = new createjs.Shadow("#000000", -0, -1, 8);

        termsConditionAirtelLogo = createBitmap(s_oSpriteLibrary.getSprite('airtel'));
        termsConditionAirtelLogo.x = 54;
        termsConditionAirtelLogo.y = CANVAS_HEIGHT - (CANVAS_HEIGHT - (2 * 13));

        termsConditionHomeRect = this.CreateRect(CANVAS_WIDTH / 2 + 130, CANVAS_HEIGHT / 2 - 645, 200, 50, 10, 10, 10, 10, 'red', 1);
        termsConditionHomeRect.regX = 0.5;
        termsConditionHomeRect.regY = 0.5;
        termsConditionHomeRect.mouseEnabled;
        termsConditionHomeRect.addEventListener("click", this.termsConditionHomeRectPressed);

        termsConditionHomeImage = createBitmap(s_oSpriteLibrary.getSprite('home'));
        termsConditionHomeImage.x = CANVAS_WIDTH / 2 + 140;
        termsConditionHomeImage.y = CANVAS_HEIGHT / 2 - 635;
        termsConditionHomeImage.regX = 0.5;
        termsConditionHomeImage.regY = 0.5;

        termsConditionHomeText = new createjs.Text("Home", "20px Tondo_Std_Bd", "#ffffff");
        termsConditionHomeText.x = CANVAS_WIDTH / 2 + 205;
        termsConditionHomeText.y = CANVAS_HEIGHT / 2 - 635;
        termsConditionHomeText.regX = 0.5;
        termsConditionHomeText.regY = 0.5;

        termsConditionBackText = createBitmap(s_oSpriteLibrary.getSprite('back'));
        termsConditionBackText.x = CANVAS_WIDTH / 2 - 325;
        termsConditionBackText.y = CANVAS_HEIGHT / 2 - 545;
        termsConditionBackText.regX = 0.5;
        termsConditionBackText.regY = 0.5;
        termsConditionBackText.mouseEnabled = true;
        termsConditionBackText.addEventListener("click", this.unload);

        termsConditionStartGameRect = this.CreateRect(CANVAS_WIDTH / 2 - 300, CANVAS_HEIGHT / 2 + 590, 600, 60, 10, 10, 10, 10, 'red', 1);
        termsConditionStartGameRect.regX = 0.5;
        termsConditionStartGameRect.regY = 0.5;
        termsConditionStartGameRect.mouseEnabled = true;
        termsConditionStartGameRect.addEventListener("click", this.unload);

        scrollContainer = new createjs.Container();
        maskRect = this.CreateRect(CANVAS_WIDTH / 2 - 260, CANVAS_HEIGHT / 2 - 350, 1020, 920, 1, 1, 1, 1, '#ffffff', 0.05);
        maskRect.regX = 0.5;
        maskRect.regY = 0.5;
        maskRect.mouseEnabled = true;

        maskRect.on("pressmove", function(evt) {

            if (scrollContainer.y < 0) {
                if (evt.stageY > mouseInitialPosition) {
                    scrollContainer.y += (evt.stageY - mouseInitialPosition);
                    mouseInitialPosition = evt.stageY;
                }
            }
            if (scrollContainer.y > -(CANVAS_HEIGHT / 2 + 2500)) {
                if (evt.stageY < mouseInitialPosition) {
                    scrollContainer.y -= (mouseInitialPosition - evt.stageY);
                    mouseInitialPosition = evt.stageY;
                }
            }
        });
        maskRect.on("mousedown", function(evt) {
            mouseInitialPosition = evt.stageY;
        });

        scrollAreaText = new createjs.Text("1. Under the Airtel Cricket Bonanza contest, all subscribers of Bharti Airtel Limited (“Airtel”) in India are encouraged to participate for a chance to win exciting prizes (“Contest”)." +
            "\n\n2. This Contest is open to all subscribers of Airtel residing in India." +
            "\n\n3. The Contest shall open on 10 October 2019 00:00 hours (IST) and shall close on 9 November, 2019 23:59 hours (IST). (‘Contest Period’). " +
            "\n\n4. To avail a chance to win the Contest, an Airtel subscriber needs to participate in the Contest within the Contest Period, through the Airtel Thanks application, available for download on the Android Play Store and the Apple Store. The above is necessary to participate in the Contest for a subscriber to qualify as a Participant. " +
            "\n\n5. To participate, the participant will need to click on “Airtel Cricket Bonanza” in their Airtel Thanks application, which would redirect them to the homepage of the game. The Participant can play a maximum of 2 overs in a day, and the runs accumulated by the Participant will be accumulated into points." +
            "\n\n6. The Participant can bat for 2 overs, as India, and will try to score maximum runs within this period. These runs will be recorded for this player and will accumulating across matches. The Participant also has the option of playing unlimited overs for practice, but that score will not be recorded." +
            "\n\n7. The Rewards will be visible on the Homepage. One player can claim one particular reward only once, however, she/he is eligible to claim other rewards. There would be final rewards for the top 10 scorers at the end of the campaign. " +
            "\n\n8. The runs scored by any Participant will keep getting accumulated. A Participant gets to play 2 overs daily when the scores will be recorded and the corresponding rewards will be milestone-based. The player gets a choice of claiming a reward on achieving milestone. On claiming, the effective number of runs will be deducted from the player’s accumulated score." +
            "\n\n9. All winners would be called intimated within 48hours to confirm the address to dispatch the rewards, if required." +
            "\n\n10. In case of a tie for top 10 winners of the Contest, a computerized random selection will decide the winners. Airtel shall not be held liable/ obligated to answer for queries for a Participant’s entry or pertaining to winning or losing the Contest, or to the process of selecting the winners." +
            "\n\n11. At the end of the Contest Period, the top-ranking participant(s) will be contacted via call/e-mail with instructions on how to collect their bumper prize(s). The prize(s) must be collected within the deadline given in the e-mail." +
            "\n\n12. By entering into the Contest and accepting these Terms & Conditions, the participants acknowledge and consent to disclosing of their contact details to the gift logistics partner in order to be eligible for a prize under this Contest." +
            "\n\n13. In case of any ambiguity on rewards and winners, decision will be finalized at the discretion of Airtel. This decision is at the sole discretion of Airtel and shall be final and binding on the participants of the Contest. " +
            "\n\n14. The winners confirm and consent to submit their latest photographs which may be used by Airtel for promotional activities pertaining to this Contest." +
            "\n\n15. Products and Rewards depicted in photographs may be different from actual rewards received." +
            "\n\n16. In the rare case of non-availability of rewards detailed in scheme description, reward with a similar value from comparable brand may be offered." +
            "\n\n17. Income Tax liability for the Gift Tax would be with the recipient." +
            "\n\n18. The prizes given shall be the their MRP/ ex-showroom costs only, and Airtel or the logstics partner shall not be responsible for any costs/ charges/ fees applicable or imposed upon the winner in order to use the prizes. " +
            "\n\n19. These terms and conditions shall constitute an agreement between Airtel and each individual participant / winners of the Contest, and these terms shall be binding on the participants and the winners. " +
            "\n\n20. Airtel will be entitled to postpone, suspend, modify or cancel the Contest or any aspect thereof, across the entire territories of service or any part thereof, at any time before or during the Contest with or without notice, for any reason, including, but not limited to, acts of God, force majeure, technical difficulties, or any other reasons beyond Airtel’s reasonable control. If Airtel suspends or cancels the Contest in the interim, all aspects of the Contest shall be null and void. Airtel will not be liable to compensate any participant or winner for any postponement or cancellation or for any reason directly or indirectly arising out of this Contest." +
            "\n\n21. Any dispute or claim (contractual or non-contractual) arising out of or in relation to this agreement, including disputes as to its formation, will be governed by and construed in accordance with Indian laws. Subject to the point above, Airtel and the Participants submit to the exclusive jurisdiction of Courts at New Delhi alone.", "28px Tondo_Std_Rg", "#606066");
        scrollAreaText.x = CANVAS_WIDTH / 2 - 260;
        scrollAreaText.y = CANVAS_HEIGHT / 2 - 350;
        scrollAreaText.lineWidth = 550;
        scrollContainer.addChild(scrollAreaText)
        scrollContainer.mask = maskRect;

        //-----------------------------------------------------------------------------------------------
        termsConditionStartGameText = new createjs.Text("Okay, Got It", "32px Tondo_Std_Bd", "#ffffff");
        termsConditionStartGameText.x = CANVAS_WIDTH / 2;
        termsConditionStartGameText.y = CANVAS_HEIGHT / 2 + 630;
        termsConditionStartGameText.regX = 0.5;
        termsConditionStartGameText.regY = 0.5;
        termsConditionStartGameText.textAlign = "center";
        termsConditionStartGameText.textBaseline = "alphabetic";

        termsConditionText = new createjs.Text("Terms & conditions", "48px Tondo_Std_Bd", "#3f3d50");
        termsConditionText.x = CANVAS_WIDTH / 2 - 200;
        termsConditionText.y = CANVAS_HEIGHT / 2 - 445;
        termsConditionText.regX = 0.5;
        termsConditionText.regY = 0.5;

        s_oStage.addChild(termsConditionBg);
        s_oStage.addChild(termsConditionHeaderRect);
        s_oStage.addChild(termsConditionAirtelLogo);
        s_oStage.addChild(termsConditionHomeRect);
        s_oStage.addChild(termsConditionHomeImage);
        s_oStage.addChild(termsConditionHomeText);
        s_oStage.addChild(termsConditionBackText);
        s_oStage.addChild(termsConditionText);
        s_oStage.addChild(termsConditionStartGameRect);
        s_oStage.addChild(termsConditionStartGameText);
        s_oStage.addChild(termsConditionPlayerRectangle);
        s_oStage.addChild(maskRect);
        s_oStage.addChild(scrollContainer);

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
    this.TermsAndConditionShow = function() {

    };
    this.TermsAndConditionHide = function() {

    };
    this.unload = function() {
        s_oStage.removeAllChildren();
        var menu = CMenu();
    };

    this.termsConditionHomeRectPressed = function() {
        try {
            // API.logout(token, 3);
        } catch (err) {
            console.log("The Logout Error from CTermsAndCondition................" + err);
            MyAirtelAppReact.close();
        }
    }

    this.refreshButtonPos = function(iNewX, iNewY) {

    };
    this.update = function() {
        maskRect.on("pressmove", function(evt) {

            if (scrollContainer.y < 0) {
                if (evt.stageY > mouseInitialPosition) {
                    scrollContainer.y += (evt.stageY - mouseInitialPosition);
                    mouseInitialPosition = evt.stageY;
                }
            }
            if (scrollContainer.y > -4200) {
                if (evt.stageY < mouseInitialPosition) {
                    scrollContainer.y -= (mouseInitialPosition - evt.stageY);
                    mouseInitialPosition = evt.stageY;
                }
            }
        });
    };

    sizeHandler();
    this._init();
}