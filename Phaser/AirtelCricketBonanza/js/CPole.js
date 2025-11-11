function CPole(iX, iY, oSprite, oParentContainer, iScale) {

    var _oPole;
    var _oPoleFallWicket;
    var poleSpriteSheet;
    var _oParentContainer = oParentContainer;

    this._init = function(iX, iY, oSprite, iScale) {

        var oSpritePoleAll = s_oSpriteLibrary.getSprite("wicket");
        var oData = {
            images: [oSpritePoleAll],
            // width, height & registration point of each sprite
            frames: { width: (oSpritePoleAll.width / 4), height: oSpritePoleAll.height / 6, regX: (oSpritePoleAll.width / 2) / 4, regY: (oSpritePoleAll.height / 2) / 6 },
            animations: {
                stand: {
                    frames: [0],
                },
                wicket_fall: {
                    frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
                    speed: 1
                },

            }
        };

        poleSpriteSheet = new createjs.SpriteSheet(oData);
        _oPole = new createjs.Sprite(poleSpriteSheet, "stand");
        _oPole.x = iX;
        _oPole.y = iY;
        _oPole.scaleX = iScale;
        _oPole.scaleY = iScale;
        _oPole.regX = oSprite.width * 0.5;
        _oPole.regY = oSprite.height * 0.5;
        oParentContainer.addChild(_oPole);

    };

    this.PlayWicketFallAnimation = function() {
        _oPoleFallWicket = new createjs.Sprite(poleSpriteSheet, "wicket_fall");
        _oPoleFallWicket.x = iX;
        _oPoleFallWicket.y = iY;
        _oPoleFallWicket.scaleX = iScale;
        _oPoleFallWicket.scaleY = iScale;
        _oPoleFallWicket.regX = oSprite.width * 0.5;
        _oPoleFallWicket.regY = oSprite.height * 0.5;
        oParentContainer.addChild(_oPoleFallWicket);
        _oPole.visible = false;
        _oPoleFallWicket.visible = true;
        _oPoleFallWicket.play();
        _oPoleFallWicket.addEventListener("animationend", function() {
            _oPoleFallWicket.stop();
            _oPoleFallWicket.visible = false;
            _oPole.visible = true;
        }, this);
    };

    this.getValue = function() {
        return _oPole;
    };

    this.unload = function() {
        _oParentContainer.removeChild(_oPole);
    };


    this._init(iX, iY, oSprite, iScale);

    return this;

}