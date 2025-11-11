var batsmanSpriteSheet;

function CBatter(oParentContainer, iTeam) {
    var batsmanSpriteSheet;
    var _batsmanIdle;
    var _batsmanStraight;
    var _batsmanPull;
    var _batsmanCutting;

    this._init = function(oParentContainer, iTeam) {
       
        var oSpriteBatsmanAll = s_oSpriteLibrary.getSprite("batsman_all");
        var oData = {
            images: [oSpriteBatsmanAll],
			frames: { width: (oSpriteBatsmanAll.width / 29), height: oSpriteBatsmanAll.height / 5, regX: (oSpriteBatsmanAll.width / 2) / 29, regY: (oSpriteBatsmanAll.height / 2) / 5 },
            animations: {
                stand: {
                    frames: [0],
                },
                straight: {
                    frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67],
                    speed: 1.5
                },
                pull: {
                    frames: [122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141],
                    speed: 1.2
                },
                cutting: {
                    frames: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122],
                    speed: 1.4
                }

            }
        };

        batsmanSpriteSheet = new createjs.SpriteSheet(oData);

        _batsmanIdle = new createjs.Sprite(batsmanSpriteSheet, "stand");
        _batsmanIdle.scaleX = 3;
        _batsmanIdle.scaleY = 3;
        _batsmanIdle.x = BATTER_X;
        _batsmanIdle.y = BATTER_Y;
        oParentContainer.addChild(_batsmanIdle);
    };

    this.makeInvisible = function() {
        if(_batsmanPull!=null){
            _batsmanPull.stop();
            _batsmanPull.visible = false;
        }
        if(_batsmanStraight!=null){
            _batsmanStraight.stop();
            _batsmanStraight.visible = false;
        }
        if(_batsmanCutting!=null){
            _batsmanCutting.stop();
            _batsmanCutting.visible = false;
        }
        _batsmanIdle.visible = false;
        
    };

    this.makeVisible = function() {
        _batsmanIdle.visible = true;
        
    };


    this.viewStraightBatter = function() {
        _batsmanStraight = new createjs.Sprite(batsmanSpriteSheet, "straight");
        _batsmanStraight.scaleX = 3;
        _batsmanStraight.scaleY = 3;
        _batsmanStraight.x = BATTER_X;
        _batsmanStraight.y = BATTER_Y;
        oParentContainer.addChild(_batsmanStraight);
        _batsmanIdle.visible = false;
        _batsmanStraight.visible = true;
        _batsmanStraight.play();

        _batsmanStraight.addEventListener("animationend", function() {
            _batsmanStraight.stop();
            _batsmanStraight.visible = false;
            _batsmanIdle.visible = true;
        }, this);
    };

    this.viewPullBatter = function() {
        _batsmanPull = new createjs.Sprite(batsmanSpriteSheet, "pull");
        _batsmanPull.scaleX = 3;
        _batsmanPull.scaleY = 3;
        _batsmanPull.x = BATTER_X;
        _batsmanPull.y = BATTER_Y;
        oParentContainer.addChild(_batsmanPull);
        _batsmanIdle.visible = false;
        _batsmanPull.visible = true;
        _batsmanPull.play();

        _batsmanPull.addEventListener("animationend", function() {
            _batsmanPull.stop();
            _batsmanPull.visible = false;
            _batsmanIdle.visible = true;
        }, this);
    };

    this.viewCuttingBatter = function() {
        _batsmanCutting = new createjs.Sprite(batsmanSpriteSheet, "cutting");
        _batsmanCutting.scaleX = 3;
        _batsmanCutting.scaleY = 3;
        _batsmanCutting.x = BATTER_X;
        _batsmanCutting.y = BATTER_Y;
        oParentContainer.addChild(_batsmanCutting);
        _batsmanIdle.visible = false;
        _batsmanCutting.visible = true;
        _batsmanCutting.play();

        _batsmanCutting.addEventListener("animationend", function() {
            _batsmanCutting.stop();
            _batsmanCutting.visible = false;
            _batsmanIdle.visible = true;
        }, this);
    };


     s_oBatter = this;

    this._init(oParentContainer, iTeam);

}
s_oBatter = null;