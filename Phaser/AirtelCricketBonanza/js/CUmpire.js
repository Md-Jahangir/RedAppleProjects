function CUmpire(oParentContainer) {
    var _umpireIdle;
    var _oUmpireOut;
    var _oUmpireFour;
    var _oUmpireSix;
    var umpireSpriteSheet;

    this._init = function(oParentContainer, iTeam) {

        var oSpriteUmpireAll = s_oSpriteLibrary.getSprite("umpire_all");
        var oData = {
            images: [oSpriteUmpireAll],
            // width, height & registration point of each sprite
            frames: { width: (oSpriteUmpireAll.width / 5), height: oSpriteUmpireAll.height / 7, regX: (oSpriteUmpireAll.width / 2) / 5, regY: (oSpriteUmpireAll.height / 2) / 7 },
            animations: {
                stand: {
                    frames: [0],
                },
                out: {
                    frames: [16, 17, 18, 19, 20, 21, 22, 23, 24],
                    speed: 0.2
                },
                four: {
                    frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                    speed: 0.3
                },
                six: {
                    frames: [25, 26, 27, 28, 29, 30, 31, 32, 33],
                    speed: 0.2
                }
            }
        };

        umpireSpriteSheet = new createjs.SpriteSheet(oData);

        _umpireIdle = new createjs.Sprite(umpireSpriteSheet, "stand");
        _umpireIdle.scaleX = 0.58;
        _umpireIdle.scaleY = 0.58;
        _umpireIdle.x = UMPIRE_X;
        _umpireIdle.y = UMPIRE_Y;
        oParentContainer.addChild(_umpireIdle);

    };

    this.viewOutUmpire = function() {
        _oUmpireOut = new createjs.Sprite(umpireSpriteSheet, "out");
        _oUmpireOut.scaleX = 0.58;
        _oUmpireOut.scaleY = 0.58;
        _oUmpireOut.x = UMPIRE_X;
        _oUmpireOut.y = UMPIRE_Y;
        oParentContainer.addChild(_oUmpireOut);
        _umpireIdle.visible = false;
        _oUmpireOut.visible = true;
        _oUmpireOut.play();

        _oUmpireOut.addEventListener("animationend", function() {
            _oUmpireOut.stop();
            _oUmpireOut.visible = false;
            _umpireIdle.visible = true;
        }, this);
    };

    this.viewFourUmpire = function() {
        _oUmpireFour = new createjs.Sprite(umpireSpriteSheet, "four");
        _oUmpireFour.scaleX = 0.58;
        _oUmpireFour.scaleY = 0.58;
        _oUmpireFour.x = UMPIRE_X;
        _oUmpireFour.y = UMPIRE_Y;
        oParentContainer.addChild(_oUmpireFour);
        _umpireIdle.visible = false;
        _oUmpireFour.visible = true;
        _oUmpireFour.play();
        _oUmpireFour.addEventListener("animationend", function() {
            _oUmpireFour.stop();
            _oUmpireFour.visible = false;
            _umpireIdle.visible = true;
        }, this);
    };

    this.viewSixUmpire = function() {
        _oUmpireSix = new createjs.Sprite(umpireSpriteSheet, "six");
        _oUmpireSix.scaleX = 0.58;
        _oUmpireSix.scaleY = 0.58;
        _oUmpireSix.x = UMPIRE_X;
        _oUmpireSix.y = UMPIRE_Y;
        oParentContainer.addChild(_oUmpireSix);
        _umpireIdle.visible = false;
        _oUmpireSix.visible = true;
        _oUmpireSix.play();
        _oUmpireSix.addEventListener("animationend", function() {
            _oUmpireSix.stop();
            _oUmpireSix.visible = false;
            _umpireIdle.visible = true;
        }, this);
    };

    this._init(oParentContainer);

}