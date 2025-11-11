function CTableController() {
    var _aButs;
    var _aEnlights;
    var _oContainer;

    var _aCbCompleted;
    var _aCbOwner;

    var _oBoard;
    var _pBoardPos;

    this._init = function () {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        //Board image
        // var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('board_table'));
        _oContainer.addChild(oBg);

        // var oSprite = s_oSpriteLibrary.getSprite('gameplay_board');
        // _oBoard = createBitmap(oSprite);
        // _pBoardPos = { x: CANVAS_WIDTH / 2 + 1, y: CANVAS_HEIGHT / 2 - 13 };
        // _oBoard.x = _pBoardPos.x;
        // _oBoard.y = _pBoardPos.y;
        // _oBoard.regX = oSprite.width / 2;
        // _oBoard.regY = oSprite.height / 2;
        // _oContainer.addChild(_oBoard);

        this._initEnlights();
        this._initButtonBets();

        this.setState(STATE_GAME_WAITING_FOR_BET);

        _aCbCompleted = new Array();
        _aCbOwner = new Array();
    };

    this._initEnlights = function () {
        var oBmp;
        _aEnlights = new Array();

        oBmp = new CEnlight(208, 205, s_oSpriteLibrary.getSprite('enlight_pass_line'), _oContainer);
        _aEnlights["pass_line"] = oBmp;

        oBmp = new CEnlight(490, 680, s_oSpriteLibrary.getSprite('enlight_dont_pass1'), _oContainer);
        _aEnlights["dont_pass1"] = oBmp;

        oBmp = new CEnlight(280, 150, s_oSpriteLibrary.getSprite('enlight_dont_pass2'), _oContainer);
        _aEnlights["dont_pass2"] = oBmp;

        oBmp = new CEnlight(360, 150, s_oSpriteLibrary.getSprite('enlight_dont_come'), _oContainer);
        _aEnlights["dont_come"] = oBmp;

        oBmp = new CEnlight(360, 360, s_oSpriteLibrary.getSprite('enlight_come'), _oContainer);
        _aEnlights["come"] = oBmp;

        var aPos = [{ value: 4, x: 490, y: 153 }, { value: 5, x: 620, y: 153 }, { value: 6, x: 748, y: 153 }, { value: 8, x: 878, y: 153 }, { value: 9, x: 1005, y: 153 }, { value: 10, x: 1134, y: 153 }];
        for (var i = 0; i < 6; i++) {
            oBmp = new CEnlight(aPos[i].x, aPos[i].y, s_oSpriteLibrary.getSprite('enlight_lay_bet'), _oContainer);
            _aEnlights["lay_bet" + aPos[i].value] = oBmp;

            oBmp = new CEnlight(aPos[i].x, aPos[i].y + 42, s_oSpriteLibrary.getSprite('enlight_lose_bet'), _oContainer);
            _aEnlights["lose_bet" + aPos[i].value] = oBmp;

            oBmp = new CEnlight(aPos[i].x, aPos[i].y + 60, s_oSpriteLibrary.getSprite('enlight_number'), _oContainer);
            _aEnlights["number" + aPos[i].value] = oBmp;

            oBmp = new CEnlight(aPos[i].x, aPos[i].y + 188, s_oSpriteLibrary.getSprite('enlight_lose_bet'), _oContainer);
            _aEnlights["win_bet" + aPos[i].value] = oBmp;

        }

        oBmp = new CEnlight(282, 550, s_oSpriteLibrary.getSprite('enlight_big_6'), _oContainer);
        _aEnlights["big_6"] = oBmp;

        oBmp = new CEnlight(320, 610, s_oSpriteLibrary.getSprite('enlight_big_8'), _oContainer);
        _aEnlights["big_8"] = oBmp;

        oBmp = new CEnlight(365, 550, s_oSpriteLibrary.getSprite('enlight_field'), _oContainer);
        _aEnlights["field"] = oBmp;

        var iXAny11 = 1176;
        var iYAny11 = 562;
        var iXAnyCraps = 1227;
        var iYAnyCraps = 576;
        for (var i = 0; i < 7; i++) {
            oBmp = new CEnlight(iXAny11, iYAny11, s_oSpriteLibrary.getSprite('enlight_circle'), _oContainer);
            _aEnlights["any11_" + i] = oBmp;

            oBmp = new CEnlight(iXAnyCraps, iYAnyCraps, s_oSpriteLibrary.getSprite('enlight_circle'), _oContainer);
            _aEnlights["any_craps_" + i] = oBmp;

            iYAny11 += 56;
            iYAnyCraps += 51.5;
        }

        oBmp = new CEnlight(1296, 780, s_oSpriteLibrary.getSprite('enlight_any11'), _oContainer);
        _aEnlights["any11_" + i] = oBmp;

        //ENLIGHT ANY CRAPS
        oBmp = new CEnlight(1296, 858, s_oSpriteLibrary.getSprite('enlight_any_craps'), _oContainer);
        _aEnlights["any_craps_" + i] = oBmp;

        //ENLIGHT HARDWAYS
        oBmp = new CEnlight(1296, 542, s_oSpriteLibrary.getSprite('enlight_proposition1'), _oContainer);
        _aEnlights["hardway6"] = oBmp;

        oBmp = new CEnlight(1498, 542, s_oSpriteLibrary.getSprite('enlight_proposition1'), _oContainer);
        _aEnlights["hardway10"] = oBmp;

        oBmp = new CEnlight(1296, 620, s_oSpriteLibrary.getSprite('enlight_proposition1'), _oContainer);
        _aEnlights["hardway8"] = oBmp;

        oBmp = new CEnlight(1498, 620, s_oSpriteLibrary.getSprite('enlight_proposition1'), _oContainer);
        _aEnlights["hardway4"] = oBmp;

        //ENLIGHT PROPOSITION 2
        oBmp = new CEnlight(1296, 700, s_oSpriteLibrary.getSprite('enlight_proposition2'), _oContainer);
        _aEnlights["horn3"] = oBmp;

        oBmp = new CEnlight(1430, 700, s_oSpriteLibrary.getSprite('enlight_proposition2'), _oContainer);
        _aEnlights["horn2"] = oBmp;

        oBmp = new CEnlight(1564, 700, s_oSpriteLibrary.getSprite('enlight_proposition2'), _oContainer);
        _aEnlights["horn12"] = oBmp;

        //ENLIGHT SEVEN BET
        oBmp = new CEnlight(1296, 497, s_oSpriteLibrary.getSprite('enlight_seven'), _oContainer);
        _aEnlights["seven_bet"] = oBmp;
        // oBmp.show();

    };

    this._initButtonBets = function () {
        //INIT ALL BUTTONS
        _aButs = new Array();

        var oBut;

        oBut = new CBetTableButton(672, 520, s_oSpriteLibrary.getSprite('hit_area_pass_line'), "pass_line", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["pass_line"] = oBut;

        oBut = new CBetTableButton(811, 715, s_oSpriteLibrary.getSprite('hit_area_dont_pass1'), "dont_pass1", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["dont_pass1"] = oBut;

        oBut = new CBetTableButton(322, 350, s_oSpriteLibrary.getSprite('hit_area_dont_pass2'), "dont_pass2", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["dont_pass2"] = oBut;

        oBut = new CBetTableButton(427, 255, s_oSpriteLibrary.getSprite('hit_area_dont_come'), "dont_come", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["dont_come"] = oBut;

        oBut = new CBetTableButton(748, 454, s_oSpriteLibrary.getSprite('hit_area_come'), "come", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["come"] = oBut;

        oBut = new CBetTableButton(785, 613, s_oSpriteLibrary.getSprite('hit_area_field'), "field", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["field"] = oBut;

        oBut = new CBetTableButton(428, 700, s_oSpriteLibrary.getSprite('hit_area_big_8'), "big_8", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["big_8"] = oBut;

        oBut = new CBetTableButton(339, 617, s_oSpriteLibrary.getSprite('hit_area_big_6'), "big_6", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["big_6"] = oBut;

        var aPos = [{ value: 4, x: 556, y: 175 }, { value: 5, x: 686, y: 175 }, { value: 6, x: 814, y: 175 }, { value: 8, x: 944, y: 175 }, { value: 9, x: 1072, y: 175 }, { value: 10, x: 1200, y: 175 }];
        for (var i = 0; i < 6; i++) {
            oBut = new CBetTableButton(aPos[i].x, aPos[i].y, s_oSpriteLibrary.getSprite('hit_area_lay_bet'), "lay_bet" + aPos[i].value, _oContainer);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            _aButs["lay_bet" + aPos[i].value] = oBut;

            oBut = new CBetTableButton(aPos[i].x, aPos[i].y + 32, s_oSpriteLibrary.getSprite('hit_area_lose_bet'), "lose_bet" + aPos[i].value, _oContainer);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            _aButs["lose_bet" + aPos[i].value] = oBut;

            oBut = new CBetTableButton(aPos[i].x, aPos[i].y + 103, s_oSpriteLibrary.getSprite('hit_area_number'), "number" + aPos[i].value, _oContainer);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            _aButs["number" + aPos[i].value] = oBut;

            oBut = new CBetTableButton(aPos[i].x, aPos[i].y + 175, s_oSpriteLibrary.getSprite('hit_area_lose_bet'), "win_bet" + aPos[i].value, _oContainer);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            _aButs["win_bet" + aPos[i].value] = oBut;
        }

        //HARDWAYS HIT AREAS
        var aPos1 = [{ x: 1200, y: 586 }, { x: 1200, y: 642 }, { x: 1200, y: 698 }, { x: 1200, y: 754 }, { x: 1200, y: 810 }, { x: 1200, y: 866 }, { x: 1200, y: 921 }];
        var aPos2 = [{ x: 1252, y: 600 }, { x: 1252, y: 651 }, { x: 1252, y: 702 }, { x: 1252, y: 753 }, { x: 1252, y: 805 }, { x: 1252, y: 856 }, { x: 1252, y: 907 }];
        for (var j = 0; j < 7; j++) {
            oBut = new CBetTableButton(aPos1[j].x, aPos1[j].y, s_oSpriteLibrary.getSprite('hit_area_circle'), "any11_7", _oContainer);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            _aButs["any11_" + j] = oBut;
            oBut = new CBetTableButton(aPos2[j].x, aPos2[j].y, s_oSpriteLibrary.getSprite('hit_area_circle'), "any_craps_7", _oContainer);
            oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
            if (s_bMobile === false) {
                oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
                oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
            }
            _aButs["any_craps_" + j] = oBut;
        }
        oBut = new CBetTableButton(1499, 520, s_oSpriteLibrary.getSprite('hit_area_seven'), "seven_bet", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["seven_bet"] = oBut;

        oBut = new CBetTableButton(1398, 581, s_oSpriteLibrary.getSprite('hit_area_proposition1'), "hardway6", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["hardway6"] = oBut;

        oBut = new CBetTableButton(1600, 581, s_oSpriteLibrary.getSprite('hit_area_proposition1'), "hardway10", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["hardway10"] = oBut;

        oBut = new CBetTableButton(1398, 662, s_oSpriteLibrary.getSprite('hit_area_proposition1'), "hardway8", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["hardway8"] = oBut;

        oBut = new CBetTableButton(1600, 662, s_oSpriteLibrary.getSprite('hit_area_proposition1'), "hardway4", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["hardway4"] = oBut;

        oBut = new CBetTableButton(1365, 739, s_oSpriteLibrary.getSprite('hit_area_proposition2'), "horn3", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["horn3"] = oBut;

        oBut = new CBetTableButton(1498, 739, s_oSpriteLibrary.getSprite('hit_area_proposition2'), "horn2", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["horn2"] = oBut;

        oBut = new CBetTableButton(1632, 739, s_oSpriteLibrary.getSprite('hit_area_proposition2'), "horn12", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["horn12"] = oBut;

        oBut = new CBetTableButton(1499, 819, s_oSpriteLibrary.getSprite('hit_area_any11'), "any11_7", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["any11_7"] = oBut;

        oBut = new CBetTableButton(1499, 880, s_oSpriteLibrary.getSprite('hit_area_any_craps'), "any_craps_7", _oContainer);
        oBut.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
        if (s_bMobile === false) {
            oBut.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this);
            oBut.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this);
        }
        _aButs["any_craps_7"] = oBut;
    };

    this.setState = function (iState) {
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

    this.unload = function () {
        for (var i = 0; i < _oContainer.getNumChildren(); i++) {
            var oBut = _oContainer.getChildAt(i);
            if (oBut instanceof CBetTableButton) {
                oBut.unload();
            }
        }
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this._onBetPress = function (oParams) {
        var aBets = oParams.numbers;
        if (aBets !== null) {
            if (_aCbCompleted[ON_SHOW_BET_ON_TABLE]) {
                _aCbCompleted[ON_SHOW_BET_ON_TABLE].call(_aCbOwner[ON_SHOW_BET_ON_TABLE], oParams, false);
            }
        }
    };

    this._onBetNumberOver = function (oParams) {

        var aBets = oParams.numbers;
        if (aBets !== null) {
            if (_aCbCompleted[ON_SHOW_ENLIGHT]) {
                _aCbCompleted[ON_SHOW_ENLIGHT].call(_aCbOwner[ON_SHOW_ENLIGHT], oParams);
            }
        }
    };

    this._onBetNumberOut = function (oParams) {
        var aBets = oParams.numbers;
        if (aBets !== null) {
            if (_aCbCompleted[ON_HIDE_ENLIGHT]) {
                _aCbCompleted[ON_HIDE_ENLIGHT].call(_aCbOwner[ON_HIDE_ENLIGHT], oParams);
            }
        }
    };

    this.enlight = function (szEnlight) {
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

    this.enlightOff = function (szEnlight) {
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

    this.getEnlightX = function (iNumberExtracted) {
        return _aEnlights["oEnlight_" + iNumberExtracted].getX();
    };

    this.getEnlightY = function (iNumberExtracted) {
        return _aEnlights["oEnlight_" + iNumberExtracted].getY();
    };

    this.getContainer = function () {
        return _oContainer;
    };

    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.x;
    };

    this._init();
}