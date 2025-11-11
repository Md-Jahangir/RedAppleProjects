function CGameOver() {
    var oBg;
    var _oTextTitle;
    var _oButRecharge;
    var _oButExit;
    var _oContainer;

    this._init = function() {

        var orientation = getOrientation();

        // _oContainer
        _oContainer = new createjs.Container();
        s_oGameCon.addChild(_oContainer);
        _oContainer.on("click", function() {});


        // oBg
        oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oContainer.addChild(oBg);

        // _oTextTitle
        _oTextTitle = new createjs.Text(languageService.getString("textNoMoney"), "32px " + FONT_GAME_1, "#fff");
        _oTextTitle.textAlign = "center";
        _oTextTitle.lineWidth = 500;
        _oTextTitle.lineHeight = 50;
        _oTextTitle.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        _oContainer.addChild(_oTextTitle);

        // _oButRecharge
        _oButRecharge = new CTextButton(0,0,
            s_oSpriteLibrary.getSprite('but_deal_select_bg'),
            languageService.getString("textRecharge"),
            FONT_GAME_1,
            "#8f6bc1",
            20,
            _oContainer
        );
        _oButRecharge.addEventListener(ON_MOUSE_UP, this._onExit, this);

        // _oButExit
        _oButExit = new CTextButton(0,0,
            s_oSpriteLibrary.getSprite('but_deal_select_bg'),
            languageService.getString("textExit"),
            FONT_GAME_1,
            "#8f6bc1",
            20,
            _oContainer
        );
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        this.hide();
    };
    this.resize = function(){
    
    let config = orientation_mode[getOrientation()].CGameOver;
                
    // oBg
    oBg.x = NEW_WIDTH  / 2 - oBg.image.width / config.oBg.stepX * GAME_SCALE ;
    oBg.y = NEW_HEIGHT / 2  - oBg.image.height / config.oBg.stepY  * GAME_SCALE;
    oBg.scaleX = GAME_SCALE * config.oBg.scale ;
    oBg.scaleY = GAME_SCALE * config.oBg.scale ;
    
    // _oTextTitle
    _oTextTitle.x = NEW_WIDTH /2;
    _oTextTitle.y = NEW_HEIGHT /2;
    _oTextTitle.scaleX = GAME_SCALE * config._oTextTitle.scale;
    _oTextTitle.scaleY = GAME_SCALE * config._oTextTitle.scale;

    // _oButRecharge
    _oButRecharge.setScale(GAME_SCALE * config._oButRecharge.scale)
    _oButRecharge.setPosition(NEW_WIDTH /2 + config._oButRecharge.stepX * GAME_SCALE ,NEW_HEIGHT/2 + config._oButRecharge.stepY *GAME_SCALE)

    
    // _oButExit
    _oButExit.setScale(GAME_SCALE * config._oButExit.scale)
    _oButExit.setPosition(NEW_WIDTH /2 + config._oButExit.stepX * GAME_SCALE ,NEW_HEIGHT/2 + config._oButExit.stepY *GAME_SCALE)



  }
    
    this.unload = function() {
        _oButRecharge.unload();
        _oButExit.unload();
        _oContainer.off("click", function() {})
        
    };

    this.show = function() {
        _oContainer.visible = true;
    };

    this.hide = function() {
        _oContainer.visible = false;
    };

    this._onRecharge = function() {
        $(s_oMain).trigger("recharge");

    };

    this._onExit = function() {
        s_oGame.onExit();
    };

    this._init();
}