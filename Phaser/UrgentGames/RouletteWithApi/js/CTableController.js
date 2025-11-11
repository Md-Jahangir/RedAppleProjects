function CTableController() {
    var _aEnlights;
    var _oContainer;

    var _aCbCompleted;
    var _aCbOwner;

    var _oBoardBg;
    var _oBoardBgPos;
    var _oBoard;
    var _oBoardPos;

    this._init = function() {
        _oContainer = new createjs.Container();
        _oContainer.x = 248;
        _oContainer.y = 190;
        s_oStage.addChild(_oContainer);

        var oSprite = s_oSpriteLibrary.getSprite('board_bg');
        _oBoardBg = createBitmap(oSprite);
        _oContainer.addChild(_oBoardBg);

        var oSprite = s_oSpriteLibrary.getSprite('board_roulette_only');
        var _oBoard = createBitmap(oSprite);
        _oBoard.x = 170;
        _oBoard.y = 74;
        _oContainer.addChild(_oBoard);

        this._initEnlights();

        //INIT ALL BUTTONS
        var oBut;
        /*******************TWELVE BET***************/

        //hit area of 1st 12
        oBut = new CBetTableButton(425, 410, s_oSpriteLibrary.getSprite('hit_area_horizontal'), "first12", _oContainer, true);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area of 2nd 12
        oBut = new CBetTableButton(726, 410, s_oSpriteLibrary.getSprite('hit_area_horizontal'), "second12", _oContainer, true);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area of 3rd 12
        oBut = new CBetTableButton(1027, 410, s_oSpriteLibrary.getSprite('hit_area_horizontal'), "third12", _oContainer, true);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        /*************************SIMPLE BETS******************/

        //hit area number of 0 
        oBut = new CBetTableButton(222, 275, s_oSpriteLibrary.getSprite('hit_area_0'), "bet_0", _oContainer, false);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        // oBut.setVisible(false);

        //hit area number of 00 
        oBut = new CBetTableButton(222, 142, s_oSpriteLibrary.getSprite('hit_area_0'), "bet_37", _oContainer, false);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area of all the single number(1 to 36)
        var oSprite = s_oSpriteLibrary.getSprite('hit_area_number');
        var iCurX = 312;
        var iCurY = 298;
        for (var i = 1; i < NUMBERS_TO_BET; i++) {
            oBut = new CBetTableButton(iCurX, iCurY, oSprite, "bet_" + i, _oContainer, false);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }

            if (i % 3 === 0) {
                iCurX += WIDTH_CELL_NUMBER + 10;
                iCurY = 298;
            } else {
                iCurY -= HEIGHT_CELL_NUMBER + 11;
            }
        }

        /**********************COUPLE BET***********************/

        //hit area of couple vertical area of 0 and 1 number
        oBut = new CBetTableButton(274, 298, s_oSpriteLibrary.getSprite('hit_area_couple_vertical'), "bet_0_1", _oContainer, false);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area of couple vertical area of 0 and 2 number
        oBut = new CBetTableButton(274, 208, s_oSpriteLibrary.getSprite('hit_area_couple_vertical'), "bet_0_2_37", _oContainer, false);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area of couple vertical area of 00 and 3 number
        oBut = new CBetTableButton(274, 120, s_oSpriteLibrary.getSprite('hit_area_couple_vertical'), "bet_3_37", _oContainer, false);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area of couple vertical area of all the number
        var iCurX = 349;
        var iCurY = 299;
        for (var j = 1; j < 34; j++) {
            oBut = new CBetTableButton(iCurX, iCurY, s_oSpriteLibrary.getSprite('hit_area_couple_vertical'), "bet_" + j + "_" + (j + 3), _oContainer, false);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            if (j % 3 === 0) {
                iCurX += WIDTH_CELL_NUMBER + 10;
                iCurY = 299;
            } else {
                iCurY -= HEIGHT_CELL_NUMBER + 11;
            }
        }



        /********************COUPLE BET HORIZONTAL***********************/

        //hit area of couple horizontal area of all the number
        var iCurX = 311;
        var iCurY = 254;
        var iCont = 1;
        for (var j = 1; j < 25; j++) {
            oBut = new CBetTableButton(iCurX, iCurY, s_oSpriteLibrary.getSprite('hit_area_couple_horizontal'), "bet_" + iCont + "_" + (iCont + 1), _oContainer, false);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }

            if (j % 2 === 0) {
                iCurX += WIDTH_CELL_NUMBER + 10;
                iCurY = 254;
                iCont += 2;
            } else {
                iCurY -= HEIGHT_CELL_NUMBER + 11;
                iCont++;
            }
        }

        /*********************TRIPLE BET*******************/

        //hit area of triple area of number 0,1,2
        oBut = new CBetTableButton(274, 254, s_oSpriteLibrary.getSprite('hit_area_small'), "bet_0_1_2", _oContainer, false);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area of triple area of number 00,2,3
        oBut = new CBetTableButton(274, 164, s_oSpriteLibrary.getSprite('hit_area_small'), "bet_2_3_37", _oContainer, false);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area of triple horizontal area of all the number
        var iCurX = 311;
        var iCurY = 343;
        var iCont = 1;
        var oSprite = s_oSpriteLibrary.getSprite('hit_area_couple_horizontal');
        for (var j = 1; j < 13; j++) {
            oBut = new CBetTableButton(iCurX, iCurY, oSprite, "bet_" + iCont + "_" + (iCont + 1) + "_" + (iCont + 2), _oContainer, false);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }

            iCurX += WIDTH_CELL_NUMBER + 10;
            iCont += 3;
        }

        /******************QUADRUPLE BET******************/

        //hit area of QUADRUPLE area of number 0,00,1,2,3
        oBut = new CBetTableButton(274, 342, s_oSpriteLibrary.getSprite('hit_area_small'), "bet_0_1_2_3_37", _oContainer, false);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area of QUADRUPLE  of all join position
        var iCurX = 349;
        var iCurY = 252;
        var iCont = 1;
        for (var k = 1; k < 23; k++) {
            oBut = new CBetTableButton(iCurX, iCurY, s_oSpriteLibrary.getSprite('hit_area_small'), "bet_" + iCont + "_" + (iCont + 1) + "_" + (iCont + 3) + "_" + (iCont + 4), _oContainer, false);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }

            if (k % 2 === 0) {
                iCurX += WIDTH_CELL_NUMBER + 10;
                iCurY = 252;
                iCont += 2;
            } else {
                iCurY -= HEIGHT_CELL_NUMBER + 11;
                iCont++;
            }
        }

        /****************SESTUPLE BET**********************/
        //hit area of SESTUPLE area of all number 
        var iCurX = 350;
        var iCurY = 342;
        var iCont = 1;
        var oSprite = s_oSpriteLibrary.getSprite('hit_area_small');
        for (var k = 1; k < 12; k++) {
            oBut = new CBetTableButton(iCurX, iCurY, oSprite, "bet_" + iCont + "_" + (iCont + 1) + "_" + (iCont + 2) + "_" + (iCont + 3) + "_" + (iCont + 4) + "_" + (iCont + 5), _oContainer, false);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }

            iCont += 3;
            // iCurX += WIDTH_CELL_NUMBER + 3;
            iCurX += WIDTH_CELL_NUMBER + 10;
        }


        /****************COL BET*****************/
        //hit area 2to1 down
        oBut = new CBetTableButton(1215, 298, s_oSpriteLibrary.getSprite('hit_area_number'), "col1", _oContainer, true);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area 2to1 middle
        oBut = new CBetTableButton(1215, 209, s_oSpriteLibrary.getSprite('hit_area_number'), "col2", _oContainer, true);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area 2to1 top
        oBut = new CBetTableButton(1215, 121, s_oSpriteLibrary.getSprite('hit_area_number'), "col3", _oContainer, true);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        /****************OTHER BETS******************/
        //hit area half(1 to 18)
        oBut = new CBetTableButton(349, 547, s_oSpriteLibrary.getSprite('hit_area_horizontal_half'), "first18", _oContainer, true);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area even
        oBut = new CBetTableButton(499, 547, s_oSpriteLibrary.getSprite('hit_area_horizontal_half'), "even", _oContainer, true);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area black diamond
        oBut = new CBetTableButton(649, 547, s_oSpriteLibrary.getSprite('hit_area_color'), "black", _oContainer, true);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area red diamond
        oBut = new CBetTableButton(799, 547, s_oSpriteLibrary.getSprite('hit_area_color'), "red", _oContainer, true);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area odd
        oBut = new CBetTableButton(949, 547, s_oSpriteLibrary.getSprite('hit_area_horizontal_half'), "odd", _oContainer, true);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        //hit area half(19 to 36)
        oBut = new CBetTableButton(1100, 547, s_oSpriteLibrary.getSprite('hit_area_horizontal_half'), "second18", _oContainer, true);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }

        _aCbCompleted = new Array();
        _aCbOwner = new Array();
    };

    this._initEnlights = function() {
        var oBmp;
        _aEnlights = new Array();

        /*********************NUMBER ENLIGHT*****************/
        //showing white area when hover the mouse of 0
        oBmp = new CEnlight(175, 211, s_oSpriteLibrary.getSprite('enlight_0'), _oContainer);
        _aEnlights["oEnlight_0"] = oBmp;
        // oBmp.show();

        //showing white area when hover the mouse of 00
        oBmp = new CEnlight(173, 78, s_oSpriteLibrary.getSprite('enlight_0'), _oContainer);
        _aEnlights["oEnlight_37"] = oBmp;
        // oBmp.show();

        //showing white area when hover the mouse of a single number 1 to 36
        var iCurX = 276;
        var iCurY = 256;
        var oSprite = s_oSpriteLibrary.getSprite('enlight_number');
        for (var i = 0; i < 36; i++) {
            oBmp = new CEnlight(iCurX, iCurY, oSprite, _oContainer);
            _aEnlights["oEnlight_" + (i + 1)] = oBmp;

            if ((i + 1) % 3 === 0) {
                iCurX += oSprite.width + 1;
                iCurY = 256;
            } else {
                iCurY -= oSprite.height + 3;
            }

        }

        /*********************OTHER ENLIGHTS*****************/

        //showing white area when hover the mouse of 2to1 down
        oBmp = new CEnlight(1176, 256, s_oSpriteLibrary.getSprite('enlight_number'), _oContainer);
        _aEnlights["oEnlight_col1"] = oBmp;

        //showing white area when hover the mouse of 2to1 middle
        oBmp = new CEnlight(1176, 165, s_oSpriteLibrary.getSprite('enlight_number'), _oContainer);
        _aEnlights["oEnlight_col2"] = oBmp;

        //showing white area when hover the mouse of 2to1 top
        oBmp = new CEnlight(1176, 76, s_oSpriteLibrary.getSprite('enlight_number'), _oContainer);
        _aEnlights["oEnlight_col3"] = oBmp;

        //showing white area when hover the mouse of 1st 12
        oBmp = new CEnlight(275, 342, s_oSpriteLibrary.getSprite('enlight_horizontal'), _oContainer);
        _aEnlights["oEnlight_first12"] = oBmp;

        //showing white area when hover the mouse of 2nd 12
        oBmp = new CEnlight(575, 342, s_oSpriteLibrary.getSprite('enlight_horizontal'), _oContainer);
        _aEnlights["oEnlight_second12"] = oBmp;

        //showing white area when hover the mouse of 3rd 12
        oBmp = new CEnlight(875, 342, s_oSpriteLibrary.getSprite('enlight_horizontal'), _oContainer);
        _aEnlights["oEnlight_third12"] = oBmp;

        //showing white area when hover the mouse to 1 to 18
        oBmp = new CEnlight(275, 479, s_oSpriteLibrary.getSprite('enlight_horizontal_half'), _oContainer);
        _aEnlights["oEnlight_first18"] = oBmp;

        //showing white area when hover the mouse of even
        oBmp = new CEnlight(425, 479, s_oSpriteLibrary.getSprite('enlight_horizontal_half'), _oContainer);
        _aEnlights["oEnlight_even"] = oBmp;

        //showing white area when hover the mouse to diamond black 
        oBmp = new CEnlight(575, 479, s_oSpriteLibrary.getSprite('enlight_color'), _oContainer);
        _aEnlights["oEnlight_black"] = oBmp;

        //showing white area when hover the mouse to diamond red 
        oBmp = new CEnlight(725, 479, s_oSpriteLibrary.getSprite('enlight_color'), _oContainer);
        _aEnlights["oEnlight_red"] = oBmp;

        //showing white area when hover the mouse to odd
        oBmp = new CEnlight(875, 479, s_oSpriteLibrary.getSprite('enlight_horizontal_half'), _oContainer);
        _aEnlights["oEnlight_odd"] = oBmp;

        //showing white area when hover the mouse to 19 to 36
        oBmp = new CEnlight(1027, 479, s_oSpriteLibrary.getSprite('enlight_horizontal_half'), _oContainer);
        _aEnlights["oEnlight_second18"] = oBmp;
    };

    this.unload = function() {
        for (var i = 0; i < _oContainer.getNumChildren(); i++) {
            var oBut = _oContainer.getChildAt(i);
            if (oBut instanceof CBetTableButton) {
                oBut.unload();
            }
        }
    };

    this.addEventListener = function(iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this._onBetPress = function(oParams) {
        var aBets = oParams.numbers;
        // console.log("oParams: ", oParams);
        // console.log("aBets: " + aBets);
        if (aBets !== null) {
            if (_aCbCompleted[ON_SHOW_BET_ON_TABLE]) {
                _aCbCompleted[ON_SHOW_BET_ON_TABLE].call(_aCbOwner[ON_SHOW_BET_ON_TABLE], oParams, false);
            }
        }
    };

    this._onBetNumberOver = function(oParams) {

        var aBets = oParams.numbers;
        if (aBets !== null) {
            if (_aCbCompleted[ON_SHOW_ENLIGHT]) {
                _aCbCompleted[ON_SHOW_ENLIGHT].call(_aCbOwner[ON_SHOW_ENLIGHT], oParams);
            }
        }
    };

    this._onBetNumberOut = function(oParams) {
        var aBets = oParams.numbers;
        if (aBets !== null) {
            if (_aCbCompleted[ON_HIDE_ENLIGHT]) {
                _aCbCompleted[ON_HIDE_ENLIGHT].call(_aCbOwner[ON_HIDE_ENLIGHT], oParams);
            }
        }
    };

    this.enlight = function(szEnlight) {
        _aEnlights[szEnlight].show();
    };

    this.enlightOff = function(szEnlight) {
        _aEnlights[szEnlight].hide();
    };

    this.getEnlightX = function(iNumberExtracted) {
        return _aEnlights["oEnlight_" + iNumberExtracted].getX();
    };

    this.getEnlightY = function(iNumberExtracted) {
        return _aEnlights["oEnlight_" + iNumberExtracted].getY();
    };

    this.getContainer = function() {
        return _oContainer;
    };

    this.getX = function() {
        return _oContainer.x;
    };

    this.getY = function() {
        return _oContainer.x;
    };

    this._init();
}