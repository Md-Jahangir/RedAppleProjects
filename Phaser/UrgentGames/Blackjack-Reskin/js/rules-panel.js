var config;
function RulesPanel(parentContainer) {
    this.parentContainer = parentContainer;
    this.container = null;
    this.background = null;
    this.bgClickListener = null;
    this.gameLogo = null;
    this.casinoLogo = null;
    this.buttonBack = null;
    this.rules = [];
    config = orientation_mode[getOrientation()].rulesPanel;

    this.positions = {};
    this.init();

    return this;
};
//#########################################################################################################################################
RulesPanel.prototype.init = function () {
    this.container = new createjs.Container();
    this.container.visible = false;
    this.parentContainer.addChild(this.container);

    let scaleX = NEW_WIDTH / 1920;
    let scaleY = NEW_HEIGHT / 1080;
    let totalScale = scaleX > scaleY ? scaleX : scaleY;

    let bgSprite = s_oSpriteLibrary.getSprite('bg_settings');
    this.background = createBitmap(bgSprite);

    this.background.set({
        x: NEW_WIDTH / 2,
        y: NEW_HEIGHT / 2,
    });
    this.background.set({
        regX: 1920 / 2,
        regY: 1080 / 2,
    });
    this.background.set({ alpha: 0.95 });
    this.background.set({ scaleX: totalScale, scaleY: totalScale })

    this.bgClickListener = this.background.on("click", () => { });
    this.container.addChild(this.background);

    this.createLogos();
    this.createControlButtons();
    this.createRules();
};
//#########################################################################################################################################
RulesPanel.prototype.createLogos = function () {

    this.positions['gameLogo'] = {
        x: config.gameLogo.x,
        y: config.gameLogo.y,
    };
    this.positions['casinoLogo'] = {
        x: config.casinoLogo.x,
        y: config.casinoLogo.y,
    };

    this.gameLogo = this.createImage(s_oSpriteLibrary.getSprite('game_logo_name'), this.positions["gameLogo"]);
    this.casinoLogo = this.createImage(s_oSpriteLibrary.getSprite('casino_logo'), this.positions["casinoLogo"]);

};
//#########################################################################################################################################
RulesPanel.prototype.createImage = function (sprite, position) {
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


RulesPanel.prototype.createControlButtons = function () {
    let backButtonSprite = s_oSpriteLibrary.getSprite('but_back');

    this.positions["buttonBack"] = {
        x: config.buttonBack.x,
        y: config.buttonBack.y
    };
    this.buttonBack = new CGfxButton(this.positions["buttonBack"].x, this.positions["buttonBack"].y, backButtonSprite, true);
    this.buttonBack.addEventListener(ON_MOUSE_UP, this.onBackButtonReleased, this);
    this.buttonBack.setVisible(false);
};
//#########################################################################################################################################
RulesPanel.prototype.createRules = function () {
    let ids = [
        { id: "textRuleDealer", values: [] },
        { id: "textRuleInsurance", values: [] },
        { id: "textRuleMinBet", values: [Number(MIN_BET).toFixed(CURRENCY_DECIMAL), languageService.serverCurrency("currencySymbol")] },
        { id: "textRuleMaxBet", values: [Number(MAX_BET).toFixed(CURRENCY_DECIMAL), languageService.serverCurrency("currencySymbol")] },
        { id: "textRuleDecksUsed", values: [DECKS_USED] }
    ];

    ids.forEach((data) => {
        let langText = languageService.getString(data.id);
        data.values.forEach((value, index) => {
            langText = langText.replace("%" + index, value);
        });
        let ruleText = new createjs.Text(langText, "30px " + FONT_RED_HAT_DISPLAY_REGULAR, "#ffffff");
        ruleText.textAlign = "left";
        this.container.addChild(ruleText);
        this.rules.push(ruleText);
    });
};
//#########################################################################################################################################
RulesPanel.prototype.onBackButtonReleased = function () {
    this.container.visible = false;
    this.buttonBack.setVisible(false);
};
//#########################################################################################################################################

RulesPanel.prototype.resize = function () {
    let config = orientation_mode[getOrientation()].rulesPanel;

    // bg_Settings
    let scaleX = NEW_WIDTH / 1920;
    let scaleY = NEW_HEIGHT / 1080;
    let totalScale = scaleX > scaleY ? scaleX : scaleY;
    this.background.x = NEW_WIDTH / 2;
    this.background.y = NEW_HEIGHT / 2;
    this.background.scaleX = totalScale;
    this.background.scaleY = totalScale;

    // casinoLogo
    this.casinoLogo.x = NEW_WIDTH / 2;
    this.casinoLogo.y = NEW_HEIGHT * config.casinoLogo.stepY;
    this.casinoLogo.scaleX = GAME_SCALE * config.casinoLogo.scale;
    this.casinoLogo.scaleY = GAME_SCALE * config.casinoLogo.scale

    // gameLogo
    this.gameLogo.x = NEW_WIDTH / 2;
    this.gameLogo.y = NEW_HEIGHT * config.gameLogo.stepY;
    this.gameLogo.scaleX = GAME_SCALE * config.gameLogo.scale;
    this.gameLogo.scaleY = GAME_SCALE * config.gameLogo.scale;

    // but_back
    this.buttonBack.setScale(GAME_SCALE * config.buttonBack.scale);
    this.buttonBack.setPosition(NEW_WIDTH * 0.1, NEW_HEIGHT * config.buttonBack.stepY);

    // ruleText
    let startX = NEW_WIDTH * 0.2
    let startY = NEW_HEIGHT * 0.2
    let stepY = 0
    this.rules.forEach((rule) => {
        rule.x = startX;
        rule.y = startY;
        rule.scaleX = config.ruleText.scale * GAME_SCALE
        rule.scaleY = config.ruleText.scale * GAME_SCALE
        let metrics = rule.getMetrics();
        startY += metrics.height + stepY;
    });
}

//#########################################################################################################################################
RulesPanel.prototype.show = function () {
    this.container.visible = true;
    this.buttonBack.setVisible(true);

};
