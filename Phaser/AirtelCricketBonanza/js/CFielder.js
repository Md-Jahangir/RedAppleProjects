function CFielder(oParentContainer, iTeam, scale_x, scale_y, posX, posY) {
    
    var fielderSpriteSheet;
    var _fielderIdle;
    var _fielderSideCatch;
    var _fielderStraightCatch;
    var _fielderJumpSideCatch;
    var _fielderJumpStraightCatch;

    this._init = function(oParentContainer, iTeam) {
        var oSpriteFielderAll = s_oSpriteLibrary.getSprite("fielder_all");
        var oData = {
            images: [oSpriteFielderAll],
            // width, height & registration point of each sprite
            frames: { width: (oSpriteFielderAll.width / 8), height: oSpriteFielderAll.height / 5, regX: (oSpriteFielderAll.width / 2) / 8, regY: (oSpriteFielderAll.height / 2) / 5 },
            animations: {
                stand: {
                    frames: [0],
                },
                sideCatch: {
                    frames: [1, 2, 3, 4, 5, 6, 7],
                    speed: 0.5
                },
                straightCatch: {
                    frames: [8, 9, 10, 11, 12, 13, 14, 15],
                    speed: 0.5
                },
                jumpSideCatch: {
                    frames: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
                    speed: 0.5
                },
                jumpStraightCatch: {
                    frames: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
                    speed: 0.5
                }
            }
        };

        fielderSpriteSheet = new createjs.SpriteSheet(oData);

        _fielderIdle = new createjs.Sprite(fielderSpriteSheet, "stand");
        _fielderIdle.scaleX = scale_x;
        _fielderIdle.scaleY = scale_y;
        _fielderIdle.x = posX;
        _fielderIdle.y = posY;
        oParentContainer.addChild(_fielderIdle);
    };

    this.viewSideCatchFielder = function() {
        _fielderSideCatch = new createjs.Sprite(fielderSpriteSheet, "sideCatch");
        _fielderSideCatch.scaleX = scale_x;
        _fielderSideCatch.scaleY = scale_y;
        _fielderSideCatch.x = posX;
        _fielderSideCatch.y = posY;
        oParentContainer.addChild(_fielderSideCatch);
        _fielderIdle.visible = false;
        _fielderSideCatch.visible = true;
        _fielderSideCatch.play();

        _fielderSideCatch.addEventListener("animationend", function() {
            _fielderSideCatch.stop();
            _fielderSideCatch.visible = false;
            _fielderIdle.visible = true;
        }, this);
    };

    this.viewStraightCatchFielder = function() {
        _fielderStraightCatch = new createjs.Sprite(fielderSpriteSheet, "straightCatch");
        _fielderStraightCatch.scaleX = scale_x;
        _fielderStraightCatch.scaleY = scale_y;
        _fielderStraightCatch.x = posX;
        _fielderStraightCatch.y = posY;
        oParentContainer.addChild(_fielderStraightCatch);
        _fielderIdle.visible = false;
        _fielderStraightCatch.visible = true;
        _fielderStraightCatch.play();

        _fielderStraightCatch.addEventListener("animationend", function() {
            _fielderStraightCatch.stop();
            _fielderStraightCatch.visible = false;
            _fielderIdle.visible = true;
        }, this);
    };

    this.viewJumpSideCatchFielder = function() {
        _fielderJumpSideCatch = new createjs.Sprite(fielderSpriteSheet, "jumpSideCatch");
        _fielderJumpSideCatch.scaleX = scale_x;
        _fielderJumpSideCatch.scaleY = scale_y;
        _fielderJumpSideCatch.x = posX;
        _fielderJumpSideCatch.y = posY;
        oParentContainer.addChild(_fielderJumpSideCatch);
        _fielderIdle.visible = false;
        _fielderJumpSideCatch.visible = true;
        _fielderJumpSideCatch.play();

        _fielderJumpSideCatch.addEventListener("animationend", function() {
            _fielderJumpSideCatch.stop();
            _fielderJumpSideCatch.visible = false;
            _fielderIdle.visible = true;
        }, this);
    };

    this.viewJumpStraightCatchFielder = function() {
        _fielderJumpStraightCatch = new createjs.Sprite(fielderSpriteSheet, "jumpStraightCatch");
        _fielderJumpStraightCatch.scaleX = scale_x;
        _fielderJumpStraightCatch.scaleY = scale_y;
        _fielderJumpStraightCatch.x = posX;
        _fielderJumpStraightCatch.y = posY;
        oParentContainer.addChild(_fielderJumpStraightCatch);
        _fielderIdle.visible = false;
        _fielderJumpStraightCatch.visible = true;
        _fielderJumpStraightCatch.play();

        _fielderJumpStraightCatch.addEventListener("animationend", function() {
            _fielderJumpStraightCatch.stop();
            _fielderJumpStraightCatch.visible = false;
            _fielderIdle.visible = true;
        }, this);
    };

    this._init(oParentContainer, iTeam);

}