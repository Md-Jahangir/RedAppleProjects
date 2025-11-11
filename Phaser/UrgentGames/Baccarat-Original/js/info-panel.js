function InfoPanel(parentContainer) {
    this.parentContainer = parentContainer;
    this.container = null;
    this.background = null;
    this.bgClickListener = null;
    this.buttonBack = null;
    this.rules = [];
    this.gameLogo = null;
    this.companyLogo = null;

    this.positions = {};

    this.init();

    return this;
};
//#########################################################################################################################################
InfoPanel.prototype.init = function () {
    this.container = new createjs.Container();
    this.container.visible = false;
    this.parentContainer.addChild(this.container);

    let bgSprite = s_oSpriteLibrary.getSprite('bg_settings');
    this.background = createBitmap(bgSprite);
    this.background.set({
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2
    });
    this.background.set({
        regX: bgSprite.width / 2,
        regY: bgSprite.height / 2
    });
    this.background.set({ alpha: 0.95 });
    this.bgClickListener = this.background.on("click", () => { });
    this.container.addChild(this.background);

    this.createLogos();
    this.createControlButtons();
    this.createRules();
};

//#########################################################################################################################################
InfoPanel.prototype.createLogos = function () {
    this.positions["gameLogo"] = {
        x: Math.round(CANVAS_WIDTH / 2),
        y: Math.round(CANVAS_HEIGHT / 18)
    };

    this.gameLogo = this.createImage(s_oSpriteLibrary.getSprite('game_logo'), this.positions["gameLogo"]);

    this.positions["companyLogo"] = {
        x: Math.round(CANVAS_WIDTH / 2),
        y: Math.round(CANVAS_HEIGHT / 1.1)
    };

    this.companyLogo = this.createImage(s_oSpriteLibrary.getSprite('company_logo'), this.positions["companyLogo"]);

};

//#########################################################################################################################################
InfoPanel.prototype.createImage = function (sprite, position) {
    let img = createBitmap(sprite);
    img.set({
        x: position.x,
        y: position.y
    });
    img.set({
        regX: sprite.width / 2,
        regY: sprite.height / 2
    });
    this.container.addChild(img);
    return img;
}
//#########################################################################################################################################
InfoPanel.prototype.createControlButtons = function () {
    let backButtonSprite = s_oSpriteLibrary.getSprite('but_back');
    this.positions["buttonBack"] = {
        x: backButtonSprite.width * 2,
        y: Math.round(CANVAS_HEIGHT / 15)
    };

    this.buttonBack = new CGfxButton(this.positions["buttonBack"].x, this.positions["buttonBack"].y, backButtonSprite, true);
    this.buttonBack.addEventListener(ON_MOUSE_UP, this.onBackButtonReleased, this);
    this.buttonBack.setVisible(false);
};
//#########################################################################################################################################
InfoPanel.prototype.createRules = function () {
    const obj = ((languageService.getString("TEXT_RULES")));
    obj.forEach((thread) => {
        let ruleText = new createjs.Text(thread, "20px " + 'RedHatDisplay-Regular', "#ffffff");
        ruleText.textAlign = "left";
        this.container.addChild(ruleText);
        this.rules.push(ruleText);
    });
};
//#########################################################################################################################################
InfoPanel.prototype.onBackButtonReleased = function () {
    this.container.visible = false;
    this.buttonBack.setVisible(false);
};
//#########################################################################################################################################
InfoPanel.prototype.refreshButtonPos = function (x, y) {

    this.gameLogo.set({
        x: this.positions["gameLogo"].x,
        y: y + this.positions["gameLogo"].y
    });

    this.companyLogo.set({
        x: this.positions["companyLogo"].x,
        y: this.positions["companyLogo"].y
    });

    this.buttonBack.setPosition(this.positions["buttonBack"].x + x, y + this.positions["buttonBack"].y);

    let startX = CANVAS_WIDTH / 2 - 500;
    let startY = this.gameLogo.y + this.gameLogo.image.height + 50;
    let stepY = 20;

    this.rules.forEach((rule) => {
        rule.x = startX;
        rule.y = startY;
        let metrics = rule.getMetrics();
        startY += metrics.height + stepY;
    });
};
//#########################################################################################################################################
InfoPanel.prototype.show = function () {
    this.container.visible = true;
    this.buttonBack.setVisible(true);
};

// [
//     "- The dealer then deals out the cards face up—two each for the player and banker—and whichever hand totals closest to nine wins.",
//     "- If you’ve bet on the player hand and it has the closest to nine, the winnings are simply double what you bet.",
//     "- If you’ve bet on the banker hand and it wins, it pays 95 percent of your wager.",
//     "- When the cards dealt are greater than nine, you have to add the two together and drop the one (or two) to get the value.",
//     "- For example, a hand of nine and seven cards dealt would add up to 16, and with the first digit dropped, the value in the game is six.",
//     "- If either the player or banker is dealt a total of eight or nine, both the player and banker stand.",
//     "- If the player’s total is five or less, then the player will receive another card. Otherwise, the player will stand.",
//     "- If the player stands, then the banker hits on a total of 5 or less.",
//     "- The final betting option, a tie, pays out 8-to-1. Conveniently, there are also sheets at the table for you to keep track of your score."
//   ]
