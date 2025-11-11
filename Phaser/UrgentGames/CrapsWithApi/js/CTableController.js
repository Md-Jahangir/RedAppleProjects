function CTableController() {
    var _aButs;
    var _aEnlights;
    var _oContainer;

    var _aCbCompleted;
    var _aCbOwner;

    var _oBoard;
    var _pBoardPos;

    this._init = function() {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        //Board image
        // var oBg = createBitmap(s_oSpriteLibrary.getSprite('board_table'));
        // _oContainer.addChild(oBg);
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        _oContainer.addChild(oBg);

        var oSprite = s_oSpriteLibrary.getSprite('gameplay_board');
        _oBoard = createBitmap(oSprite);
        _pBoardPos = { x: CANVAS_WIDTH / 2 + 1, y: CANVAS_HEIGHT / 2 - 13 };
        _oBoard.x = _pBoardPos.x;
        _oBoard.y = _pBoardPos.y;
        _oBoard.regX = oSprite.width / 2;
        _oBoard.regY = oSprite.height / 2;
        _oContainer.addChild(_oBoard);

        this._initEnlights();
        this._initButtonBets();

        this.setState(STATE_GAME_WAITING_FOR_BET);

        _aCbCompleted = new Array();
        _aCbOwner = new Array();
    };

    this._initEnlights = function() {
        var oBmp;
        _aEnlights = new Array();

        //Enlight pass line when hover to the pass line in board(white bg)
        oBmp = new CEnlight(155, 267, s_oSpriteLibrary.getSprite('enlight_pass_line'), _oContainer);
        _aEnlights["pass_line"] = oBmp;

        //Enlight  dont pass horizontally when hover to the dont pass bar in board(white bg)
        oBmp = new CEnlight(280, 475, s_oSpriteLibrary.getSprite('enlight_dont_pass1'), _oContainer);
        _aEnlights["dont_pass1"] = oBmp;

        //Enlight  dont pass vertically when hover to the dont pass bar in board(white bg)
        oBmp = new CEnlight(191, 242, s_oSpriteLibrary.getSprite('enlight_dont_pass2'), _oContainer);
        _aEnlights["dont_pass2"] = oBmp;

        //Enlight dont come when hover to the dont come in board(white bg)
        oBmp = new CEnlight(226, 242, s_oSpriteLibrary.getSprite('enlight_dont_come'), _oContainer);
        _aEnlights["dont_come"] = oBmp;

        //Enlight  come when hover to the come in board(white bg)
        oBmp = new CEnlight(225, 334, s_oSpriteLibrary.getSprite('enlight_come'), _oContainer);
        _aEnlights["come"] = oBmp;

        var aPos = [{ value: 4, x: 282, y: 243 }, { value: 5, x: 340, y: 243 }, { value: 6, x: 397, y: 243 }, { value: 8, x: 453, y: 243 }, { value: 9, x: 510, y: 243 }, { value: 10, x: 567, y: 243 }];
        for (var i = 0; i < 6; i++) {
            //Enlight  lay bet when hover to the blank big space above the number 4,5 6etc in board(white bg)
            oBmp = new CEnlight(aPos[i].x, aPos[i].y, s_oSpriteLibrary.getSprite('enlight_lay_bet'), _oContainer);
            _aEnlights["lay_bet" + aPos[i].value] = oBmp;

            //Enlight  lose bet when hover to the blank small space above the number 4,5 6etc in board(white bg)
            oBmp = new CEnlight(aPos[i].x, aPos[i].y + 21, s_oSpriteLibrary.getSprite('enlight_lose_bet'), _oContainer);
            _aEnlights["lose_bet" + aPos[i].value] = oBmp;

            //Enlight  number area when hover to the number 4,5 Six 8 etc in board(white bg)
            oBmp = new CEnlight(aPos[i].x, aPos[i].y + 28, s_oSpriteLibrary.getSprite('enlight_number'), _oContainer);
            _aEnlights["number" + aPos[i].value] = oBmp;

            //Enlight  lose bet when hover to the blank small space down the number 4,5 6etc in board(white bg)
            oBmp = new CEnlight(aPos[i].x, aPos[i].y + 84, s_oSpriteLibrary.getSprite('enlight_lose_bet'), _oContainer);
            _aEnlights["win_bet" + aPos[i].value] = oBmp;

        }

        //Enlight  big 6 area when hover to the Big 6 in board(white bg)
        oBmp = new CEnlight(188, 420, s_oSpriteLibrary.getSprite('enlight_big_6'), _oContainer);
        _aEnlights["big_6"] = oBmp;

        //Enlight  big 8 area when hover to the Big 8 in board(white bg)
        oBmp = new CEnlight(202, 446, s_oSpriteLibrary.getSprite('enlight_big_8'), _oContainer);
        _aEnlights["big_8"] = oBmp;

        //Enlight  Filed area area when hover to the Field in board(white bg)
        oBmp = new CEnlight(224, 419, s_oSpriteLibrary.getSprite('enlight_field'), _oContainer);
        _aEnlights["field"] = oBmp;

        var iXAny11 = 581;
        var iYAny11 = 378;
        var iXAnyCraps = 604;
        var iYAnyCraps = 384;
        for (var i = 0; i < 7; i++) {
            //Enlight circle area when hover to 15 to 1(Down) button in rigth board(white bg)
            oBmp = new CEnlight(iXAny11, iYAny11, s_oSpriteLibrary.getSprite('enlight_circle'), _oContainer);
            _aEnlights["any11_" + i] = oBmp;

            //Enlight circle area when hover to 7 to 1(Any craps) button in rigth board(white bg)
            oBmp = new CEnlight(iXAnyCraps, iYAnyCraps, s_oSpriteLibrary.getSprite('enlight_circle'), _oContainer);
            _aEnlights["any_craps_" + i] = oBmp;

            iYAny11 += 24.5;
            iYAnyCraps += 22.5;
        }

        //Enlight box area when hover to 15 to 1(Down) button in rigth board(white bg)
        oBmp = new CEnlight(872, 467, s_oSpriteLibrary.getSprite('enlight_any11'), _oContainer);
        _aEnlights["any11_" + i] = oBmp;

        //ENLIGHT ANY CRAPS
        oBmp = new CEnlight(872, 518, s_oSpriteLibrary.getSprite('enlight_any_craps'), _oContainer);
        _aEnlights["any_craps_" + i] = oBmp;

        //ENLIGHT HARDWAYS
        //Enlight area when hover to the 9 to 1(Top) button in rigth board(white bg)
        oBmp = new CEnlight(872, 317, s_oSpriteLibrary.getSprite('enlight_proposition1'), _oContainer);
        _aEnlights["hardway6"] = oBmp;

        //Enlight area when hover to the 7 to 1(Top) button in rigth board(white bg)
        oBmp = new CEnlight(999, 317, s_oSpriteLibrary.getSprite('enlight_proposition1'), _oContainer);
        _aEnlights["hardway10"] = oBmp;

        //Enlight area when hover to the 9 to 1(Down) button in rigth board(white bg)
        oBmp = new CEnlight(872, 367, s_oSpriteLibrary.getSprite('enlight_proposition1'), _oContainer);
        _aEnlights["hardway8"] = oBmp;

        //Enlight area when hover to the 7 to 1(Down) button in rigth board(white bg)
        oBmp = new CEnlight(999, 367, s_oSpriteLibrary.getSprite('enlight_proposition1'), _oContainer);
        _aEnlights["hardway4"] = oBmp;

        //ENLIGHT PROPOSITION 2
        //Enlight area when hover to the 15 to 1(up) button in rigth board(white bg)
        oBmp = new CEnlight(872, 418, s_oSpriteLibrary.getSprite('enlight_proposition2'), _oContainer);
        _aEnlights["horn3"] = oBmp;

        //Enlight area when hover to the 30 to 1 button in rigth board(white bg)
        oBmp = new CEnlight(957.5, 418, s_oSpriteLibrary.getSprite('enlight_proposition2'), _oContainer);
        _aEnlights["horn2"] = oBmp;

        //Enlight area when hover to the 30 to 1 button in rigth board(white bg)
        oBmp = new CEnlight(1042, 418, s_oSpriteLibrary.getSprite('enlight_proposition2'), _oContainer);
        _aEnlights["horn12"] = oBmp;

        //ENLIGHT SEVEN BET
        //Enlight area when hover to the 4 to 1(Seven) button in rigth board(white bg)
        oBmp = new CEnlight(872, 290, s_oSpriteLibrary.getSprite('enlight_seven'), _oContainer);
        _aEnlights["seven_bet"] = oBmp;
    };

    this._initButtonBets = function() {
        //INIT ALL BUTTONS
        _aButs = new Array();

        var oBut;
        //hit area of pass line
        oBut = new CBetTableButton(365, 408, s_oSpriteLibrary.getSprite('hit_area_pass_line'), "pass_line", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["pass_line"] = oBut;

        //hit area of dont pass line Horizontally
        oBut = new CBetTableButton(425, 493, s_oSpriteLibrary.getSprite('hit_area_dont_pass1'), "dont_pass1", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["dont_pass1"] = oBut;

        //hit area of dont pass line Vertically
        oBut = new CBetTableButton(207, 330, s_oSpriteLibrary.getSprite('hit_area_dont_pass2'), "dont_pass2", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["dont_pass2"] = oBut;

        //hit area of dont come 
        oBut = new CBetTableButton(255, 287, s_oSpriteLibrary.getSprite('hit_area_dont_come'), "dont_come", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["dont_come"] = oBut;

        //hit area of come 
        oBut = new CBetTableButton(395, 376, s_oSpriteLibrary.getSprite('hit_area_come'), "come", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["come"] = oBut;

        //hit area of field 
        oBut = new CBetTableButton(397, 447, s_oSpriteLibrary.getSprite('hit_area_field'), "field", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["field"] = oBut;

        //hit area of Big 8
        oBut = new CBetTableButton(250, 485, s_oSpriteLibrary.getSprite('hit_area_big_8'), "big_8", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["big_8"] = oBut;

        //hit area of Big 6
        oBut = new CBetTableButton(210, 445, s_oSpriteLibrary.getSprite('hit_area_big_6'), "big_6", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["big_6"] = oBut;

        var aPos = [{ value: 4, x: 311, y: 253 }, { value: 5, x: 368, y: 253 }, { value: 6, x: 424, y: 253 }, { value: 8, x: 480, y: 253 }, { value: 9, x: 537, y: 253 }, { value: 10, x: 594, y: 253 }];
        for (var i = 0; i < 6; i++) {
            //hit area of blank big space above the number 4,5 6etc in board
            oBut = new CBetTableButton(aPos[i].x, aPos[i].y, s_oSpriteLibrary.getSprite('hit_area_lay_bet'), "lay_bet" + aPos[i].value, _oContainer);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            _aButs["lay_bet" + aPos[i].value] = oBut;

            //hit area of small blank big space above the number 4,5,6 etc in board
            oBut = new CBetTableButton(aPos[i].x, aPos[i].y + 14, s_oSpriteLibrary.getSprite('hit_area_lose_bet'), "lose_bet" + aPos[i].value, _oContainer);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            _aButs["lose_bet" + aPos[i].value] = oBut;

            //hit area of number 4,5 Six 8 etc in board
            oBut = new CBetTableButton(aPos[i].x, aPos[i].y + 45, s_oSpriteLibrary.getSprite('hit_area_number'), "number" + aPos[i].value, _oContainer);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            _aButs["number" + aPos[i].value] = oBut;

            //hit area of blank small space below the number 4, 5 6e tc in board
            oBut = new CBetTableButton(aPos[i].x, aPos[i].y + 77, s_oSpriteLibrary.getSprite('hit_area_lose_bet'), "win_bet" + aPos[i].value, _oContainer);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            _aButs["win_bet" + aPos[i].value] = oBut;
        }

        //HARDWAYS HIT AREAS
        var aPos1 = [{ x: 591, y: 387 }, { x: 591, y: 412 }, { x: 591, y: 437 }, { x: 591, y: 461 }, { x: 591, y: 485 }, { x: 591, y: 510 }, { x: 591, y: 535 }];
        var aPos2 = [{ x: 614, y: 393 }, { x: 614, y: 416 }, { x: 614, y: 439 }, { x: 614, y: 461 }, { x: 614, y: 484 }, { x: 614, y: 507 }, { x: 614, y: 530 }];
        for (var j = 0; j < 7; j++) {
            //Hit area  circle of any 11 (7 to 1)
            oBut = new CBetTableButton(aPos1[j].x, aPos1[j].y, s_oSpriteLibrary.getSprite('hit_area_circle'), "any11_7", _oContainer);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            _aButs["any11_" + j] = oBut;
            //Hit area of circle any craps
            oBut = new CBetTableButton(aPos2[j].x, aPos2[j].y, s_oSpriteLibrary.getSprite('hit_area_circle'), "any_craps_7", _oContainer);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            _aButs["any_craps_" + j] = oBut;
        }
        //Hit area of Seven
        oBut = new CBetTableButton(999, 304, s_oSpriteLibrary.getSprite('hit_area_seven'), "seven_bet", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["seven_bet"] = oBut;

        //Hit area of Hardway6 9 to 1(top) 
        oBut = new CBetTableButton(935, 343, s_oSpriteLibrary.getSprite('hit_area_proposition1'), "hardway6", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["hardway6"] = oBut;

        //Hit area of Hardway10 7 to 1(top) 
        oBut = new CBetTableButton(1063, 343, s_oSpriteLibrary.getSprite('hit_area_proposition1'), "hardway10", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["hardway10"] = oBut;

        //Hit area of Hardway8 9 to 1(Down)
        oBut = new CBetTableButton(935, 392, s_oSpriteLibrary.getSprite('hit_area_proposition1'), "hardway8", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["hardway8"] = oBut;

        //Hit area of Hardway4 7 to 1(down)
        oBut = new CBetTableButton(1063, 392, s_oSpriteLibrary.getSprite('hit_area_proposition1'), "hardway4", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["hardway4"] = oBut;

        //Hit area of Horn3 15 to 1(top)
        oBut = new CBetTableButton(914, 442, s_oSpriteLibrary.getSprite('hit_area_proposition2'), "horn3", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["horn3"] = oBut;

        //Hit area of Horn2 30 to 1(left)
        oBut = new CBetTableButton(999, 442, s_oSpriteLibrary.getSprite('hit_area_proposition2'), "horn2", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["horn2"] = oBut;

        //Hit area of Horn12 30 to 1(right)
        oBut = new CBetTableButton(1084, 442, s_oSpriteLibrary.getSprite('hit_area_proposition2'), "horn12", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["horn12"] = oBut;

        //Hit area any Horn11(Down 15 to 1)
        oBut = new CBetTableButton(999, 492, s_oSpriteLibrary.getSprite('hit_area_any11'), "any11_7", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["any11_7"] = oBut;

        //Hit area any craps(Down 7 to 1)
        oBut = new CBetTableButton(999, 530, s_oSpriteLibrary.getSprite('hit_area_any_craps'), "any_craps_7", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["any_craps_7"] = oBut;
    };

    this.setState = function(iState) {
        switch (iState) {
            case STATE_GAME_WAITING_FOR_BET:
                {
                    for (var i in _aButs) {
                        if (i === "come" || i === "dont_come") {
                            _aButs[i].setVisible(false);
                        } else {
                            _aButs[i].setVisible(true);
                        }
                    }
                    break;
                }
            case STATE_GAME_COME_POINT:
                {
                    for (var i in _aButs) {
                        if (i === "pass_line" || i === "dont_pass1" || i === "dont_pass2") {
                            _aButs[i].setVisible(false);
                        } else {
                            _aButs[i].setVisible(true);
                        }

                    }
                }
        }
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
        // console.log("oParams number: ", oParams);
        var aBets = oParams.numbers;
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
        if (szEnlight.indexOf("any11_") !== -1) {
            for (var i = 0; i < 8; i++) {
                _aEnlights["any11_" + i].show();
            }
        } else if (szEnlight.indexOf("any_craps_") !== -1) {
            for (var i = 0; i < 8; i++) {
                _aEnlights["any_craps_" + i].show();
            }
        } else {
            _aEnlights[szEnlight].show();
        }
    };

    this.enlightOff = function(szEnlight) {
        if (szEnlight.indexOf("any11_") !== -1) {
            for (var i = 0; i < 8; i++) {
                _aEnlights["any11_" + i].hide();
            }
        } else if (szEnlight.indexOf("any_craps_") !== -1) {
            for (var i = 0; i < 8; i++) {
                _aEnlights["any_craps_" + i].hide();
            }
        } else {
            _aEnlights[szEnlight].hide();
        }
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