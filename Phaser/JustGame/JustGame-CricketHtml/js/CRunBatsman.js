function CRunBatsman(oParentContainer,posX,posY,scale) {
    var nonStrikerRun;
    var strikerRun;
    var runBatsmanSpriteSheet;
    var strikerAnimCounter = 0;
    var nonStrikerAnimCounter = 0;
    var strikerScale = 1.2;
    var nonStrikerScale = 0.6;
    var timeDuration =300;

    this._init = function(oParentContainer, ) {

        var oSpriteRunBatsman = s_oSpriteLibrary.getSprite("run_batsman");
        var oData = {
            images: [oSpriteRunBatsman],
            // width, height & registration point of each sprite
            frames: { width: (oSpriteRunBatsman.width / 8), height: oSpriteRunBatsman.height / 4, regX: (oSpriteRunBatsman.width / 2) / 8, regY: (oSpriteRunBatsman.height / 2) / 4 },
            animations: {
                striker: {
                    frames: [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                    speed: 1
                },
                nonStriker: {
                    frames: [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                    speed: 1
                },
            }
        };

        runBatsmanSpriteSheet = new createjs.SpriteSheet(oData);

    };

    this.viewNonStrikerAnimation = function(counter) {
        nonStrikerRun = new createjs.Sprite(runBatsmanSpriteSheet, "nonStriker");
        nonStrikerRun.scaleX = scale;
        nonStrikerRun.scaleY = scale;
        nonStrikerRun.x = posX;
        nonStrikerRun.y = posY;
        oParentContainer.addChild(nonStrikerRun);
        nonStrikerRun.visible = true;
        nonStrikerRun.play();

        nonStrikerRun.addEventListener("animationend", function() {
        }, this);
        if (counter == 1) {
            this.createNonStrikerSingleRunTween();
        } else if (counter == 2) {
            this.createNonStrikerDoubleRunTween();
        } else if (counter == 3) {
            this.createNonStrikerTripleRunTween();
        }
    };

    this.viewStrikerAnimation = function(counter) {
        strikerRun = new createjs.Sprite(runBatsmanSpriteSheet, "striker");
        strikerRun.scaleX = scale;
        strikerRun.scaleY = scale;
        strikerRun.x = posX;
        strikerRun.y = posY;
        oParentContainer.addChild(strikerRun);
        strikerRun.visible = true;
        strikerRun.play();

        strikerRun.addEventListener("animationend", function() {
        }, this);

        if (counter == 1) {
            this.createStrikerSingleRunTween();
        } else if (counter == 2) {
            this.createStrikerDoubleRunTween();
        } else if (counter == 3) {
            this.createStrikerTripleRunTween();
        }
    };

    this.createStrikerSingleRunTween = function(counter) {
        createjs.Tween.get(strikerRun).to({ x: NON_STRIKER_RUN_X  , y:  NON_STRIKER_RUN_Y}, timeDuration, createjs.Ease.linear.out).call(function() {
            s_oGame.makePlayersVisible();
            strikerRun.visible = false;
        });
        createjs.Tween.get(strikerRun).to({ scaleX: nonStrikerScale, scaleY: nonStrikerScale }, timeDuration, createjs.Ease.linear.out).call(function() {

        });
    };
    this.createStrikerDoubleRunTween = function() {
        createjs.Tween.get(strikerRun).to({ x: NON_STRIKER_RUN_X  , y:  NON_STRIKER_RUN_Y}, timeDuration, createjs.Ease.linear.out).
                to({ x: STRIKER_RUN_X  , y:  STRIKER_RUN_Y}, timeDuration, createjs.Ease.linear.out).call(function() {
            s_oGame.makePlayersVisible();
            strikerRun.visible = false;
        });
        createjs.Tween.get(strikerRun).to({ scaleX: nonStrikerScale, scaleY: nonStrikerScale }, timeDuration, createjs.Ease.linear.out).
        to({ scaleX: strikerScale, scaleY: strikerScale }, timeDuration, createjs.Ease.linear.out).call(function() {

        });
    };
    this.createStrikerTripleRunTween = function() {
        createjs.Tween.get(strikerRun).to({ x: NON_STRIKER_RUN_X  , y:  NON_STRIKER_RUN_Y}, timeDuration, createjs.Ease.linear.out).
                to({ x: STRIKER_RUN_X  , y:  STRIKER_RUN_Y}, timeDuration, createjs.Ease.linear.out).
                to({ x: NON_STRIKER_RUN_X  , y:  NON_STRIKER_RUN_Y}, timeDuration, createjs.Ease.linear.out).call(function() {
            s_oGame.makePlayersVisible();
            strikerRun.visible = false;
        });
                createjs.Tween.get(strikerRun).to({ scaleX: nonStrikerScale, scaleY: nonStrikerScale }, timeDuration, createjs.Ease.linear.out).
        to({ scaleX: strikerScale, scaleY: strikerScale }, timeDuration, createjs.Ease.linear.out).to({ scaleX: nonStrikerScale, scaleY: nonStrikerScale }, timeDuration, createjs.Ease.linear.out).call(function() {

        });
    };

    this.createNonStrikerSingleRunTween = function(counter) {
        createjs.Tween.get(nonStrikerRun).to({ x: STRIKER_MODIFIED_X  , y:  STRIKER_RUN_Y}, timeDuration, createjs.Ease.linear.out).call(function() {
            s_oGame.makePlayersVisible();
            nonStrikerRun.visible = false;
        });
        createjs.Tween.get(nonStrikerRun).to({ scaleX: strikerScale, scaleY: strikerScale }, timeDuration, createjs.Ease.linear.out).call(function() {

        });
    };
    this.createNonStrikerDoubleRunTween = function() {
        createjs.Tween.get(nonStrikerRun).to({ x: STRIKER_MODIFIED_X  , y:  STRIKER_RUN_Y}, timeDuration, createjs.Ease.linear.out).
                to({ x: NON_STRIKER_RUN_X  , y:  NON_STRIKER_RUN_Y}, timeDuration, createjs.Ease.linear.out).call(function() {
            s_oGame.makePlayersVisible();
            nonStrikerRun.visible = false;
        });
        createjs.Tween.get(nonStrikerRun).to({ scaleX: strikerScale, scaleY: strikerScale }, timeDuration, createjs.Ease.linear.out).
        to({ scaleX: nonStrikerScale, scaleY: nonStrikerScale }, timeDuration, createjs.Ease.linear.out).call(function() {

        });
    };
    this.createNonStrikerTripleRunTween = function() {
        createjs.Tween.get(nonStrikerRun).to({ x: STRIKER_MODIFIED_X  , y:  STRIKER_RUN_Y}, timeDuration, createjs.Ease.linear.out).
                to({ x: NON_STRIKER_RUN_X  , y:  NON_STRIKER_RUN_Y}, timeDuration, createjs.Ease.linear.out).
                to({ x: STRIKER_MODIFIED_X  , y:  STRIKER_RUN_Y}, timeDuration, createjs.Ease.linear.out).call(function() {
            s_oGame.makePlayersVisible();
            nonStrikerRun.visible = false;
        });
        createjs.Tween.get(nonStrikerRun).to({ scaleX: strikerScale, scaleY: strikerScale }, timeDuration, createjs.Ease.linear.out).
        to({ scaleX: nonStrikerScale, scaleY: nonStrikerScale }, timeDuration, createjs.Ease.linear.out).to({ scaleX: strikerScale, scaleY: strikerScale }, timeDuration, createjs.Ease.linear.out).call(function() {

        });
    };


    this._init(oParentContainer);

}