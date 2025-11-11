function CRouletteSettings() {

    var _aFicheValues;
    var _aRedNumbers;
    var _aBlackNumbers;
    var _aFrameForBallSpin;
    var _aAttachFiches;

    this._init = function() {
        var oSprite = s_oSpriteLibrary.getSprite('hit_area_number');
        WIDTH_CELL_NUMBER = oSprite.width;
        HEIGHT_CELL_NUMBER = oSprite.height;

        this._initAttachFiches();

        _aFicheValues = new Array(0.1, 1, 5, 10, 25, 100);
        _aBlackNumbers = new Array(2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35);
        _aRedNumbers = new Array(1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36);


        _aFrameForBallSpin = new Array();

        _aFrameForBallSpin[0] = new Array();
        _aFrameForBallSpin[0][0] = 73;
        _aFrameForBallSpin[0][1] = 25;
        _aFrameForBallSpin[0][2] = 75;
        _aFrameForBallSpin[0][3] = 36;
        _aFrameForBallSpin[0][4] = 86;
        _aFrameForBallSpin[0][5] = 46;
        _aFrameForBallSpin[0][6] = 96;
        _aFrameForBallSpin[0][7] = 57;
        _aFrameForBallSpin[0][8] = 7;
        _aFrameForBallSpin[0][9] = 68;
        _aFrameForBallSpin[0][10] = 17;
        _aFrameForBallSpin[0][11] = 60;
        _aFrameForBallSpin[0][12] = 10;
        _aFrameForBallSpin[0][13] = 28;
        _aFrameForBallSpin[0][14] = 78;
        _aFrameForBallSpin[0][15] = 38;
        _aFrameForBallSpin[0][16] = 88;
        _aFrameForBallSpin[0][17] = 49;
        _aFrameForBallSpin[0][18] = 99;
        _aFrameForBallSpin[0][19] = 4;
        _aFrameForBallSpin[0][20] = 54;
        _aFrameForBallSpin[0][21] = 94;
        _aFrameForBallSpin[0][22] = 44;
        _aFrameForBallSpin[0][23] = 83;
        _aFrameForBallSpin[0][24] = 33;
        _aFrameForBallSpin[0][25] = 15;
        _aFrameForBallSpin[0][26] = 65;
        _aFrameForBallSpin[0][27] = 20;
        _aFrameForBallSpin[0][28] = 70;
        _aFrameForBallSpin[0][29] = 12;
        _aFrameForBallSpin[0][30] = 62;
        _aFrameForBallSpin[0][31] = 2;
        _aFrameForBallSpin[0][32] = 52;
        _aFrameForBallSpin[0][33] = 91;
        _aFrameForBallSpin[0][34] = 41;
        _aFrameForBallSpin[0][35] = 81;
        _aFrameForBallSpin[0][36] = 31;
        _aFrameForBallSpin[0][37] = 23;
    };

    this._initAttachFiches = function() {
        _aAttachFiches = new Array();

        //hit area number of 0 nad 00
        _aAttachFiches['bet_0'] = { x: 230, y: 277 };
        _aAttachFiches['bet_37'] = { x: 230, y: 143 };

        //hit area of all the single number(1 to 36)
        var iCurX = 313;
        var iCurY = 302;
        for (var i = 1; i < NUMBERS_TO_BET - 1; i++) {
            _aAttachFiches['bet_' + i] = { x: iCurX, y: iCurY };

            if (i % 3 === 0) {
                iCurX += WIDTH_CELL_NUMBER + 10;
                iCurY = 302;
            } else {
                iCurY -= HEIGHT_CELL_NUMBER + 12;
            }
        }

        //hit area of couple vertical area of 01,02,03 number
        _aAttachFiches["bet_0_1"] = { x: 275, y: 298 };
        _aAttachFiches["bet_0_2"] = { x: 275, y: 209 };
        _aAttachFiches["bet_3_37"] = { x: 275, y: 120 };

        //hit area of couple vertical area of all the number
        var iCurX = 350;
        var iCurY = 299;
        for (var j = 1; j < 34; j++) {
            _aAttachFiches["bet_" + j + "_" + (j + 3)] = { x: iCurX, y: iCurY };

            if (j % 3 === 0) {
                iCurX += WIDTH_CELL_NUMBER + 10;
                iCurY = 299;
            } else {
                iCurY -= HEIGHT_CELL_NUMBER + 12;
            }
        }

        //hit area of couple horizontal area of all the number
        var iCurX = 313;
        var iCurY = 255;
        var iCont = 1;
        for (var j = 1; j < 25; j++) {
            _aAttachFiches["bet_" + iCont + "_" + (iCont + 1)] = { x: iCurX, y: iCurY };

            if (j % 2 === 0) {
                iCurX += WIDTH_CELL_NUMBER + 10;
                iCurY = 254;
                iCont += 2;
            } else {
                iCurY -= HEIGHT_CELL_NUMBER + 12;
                iCont++;
            }
        }

        //hit area of triple area of number 012,0023,0200,012300
        _aAttachFiches["bet_0_1_2"] = { x: 275, y: 255 };
        _aAttachFiches["bet_2_3_37"] = { x: 275, y: 160 };
        _aAttachFiches["bet_0_2_37"] = { x: 275, y: 205 };
        _aAttachFiches["bet_0_1_2_3_37"] = { x: 275, y: 340 };

        //hit area of triple horizontal area of all the number
        var iCurX = 312;
        var iCurY = 330;
        var iCont = 1;
        for (var j = 1; j < 13; j++) {
            _aAttachFiches["bet_" + iCont + "_" + (iCont + 1) + "_" + (iCont + 2)] = { x: iCurX, y: iCurY };

            iCurX += WIDTH_CELL_NUMBER + 10;
            iCont += 3;
        }

        _aAttachFiches["bet_0_1_2_3"] = { x: 275, y: 340 };

        //hit area of QUADRUPLE  of all join position
        var iCurX = 349;
        var iCurY = 252;
        var iCont = 1;
        for (var k = 1; k < 23; k++) {
            _aAttachFiches["bet_" + iCont + "_" + (iCont + 1) + "_" + (iCont + 3) + "_" + (iCont + 4)] = { x: iCurX, y: iCurY };

            if (k % 2 === 0) {
                iCurX += WIDTH_CELL_NUMBER + 10;
                iCurY = 252;
                iCont += 2;
            } else {
                iCurY -= HEIGHT_CELL_NUMBER + 12;
                iCont++;
            }
        }

        //hit area of SESTUPLE area of all number 
        var iCurX = 350;
        var iCurY = 342;
        var iCont = 1;
        for (var k = 1; k < 12; k++) {
            _aAttachFiches["bet_" + iCont + "_" + (iCont + 1) + "_" + (iCont + 2) + "_" + (iCont + 3) + "_" + (iCont + 4) + "_" + (iCont + 5)] = { x: iCurX, y: iCurY };

            iCont += 3;
            iCurX += WIDTH_CELL_NUMBER + 10;
        }

        //hit area 2to1 down,2to1 middle,2to1 top
        _aAttachFiches["col1"] = { x: 1214, y: 298 };
        _aAttachFiches["col2"] = { x: 1214, y: 209 };
        _aAttachFiches["col3"] = { x: 1214, y: 121 };

        //hit area of 1st 12,2nd 12,3rd 12
        _aAttachFiches["first12"] = { x: 425, y: 410 };
        _aAttachFiches["second12"] = { x: 726, y: 410 };
        _aAttachFiches["third12"] = { x: 1027, y: 410 };

        //hit area half(1 to 18),even,black diamond,red diamond,odd,half(19 to 36)
        _aAttachFiches["first18"] = { x: 349, y: 547 };
        _aAttachFiches["even"] = { x: 499, y: 547 };
        _aAttachFiches["black"] = { x: 649, y: 547 };
        _aAttachFiches["red"] = { x: 799, y: 547 };
        _aAttachFiches["odd"] = { x: 949, y: 547 };
        _aAttachFiches["second18"] = { x: 1100, y: 547 };

        _aAttachFiches["oDealerWin"] = { x: CANVAS_WIDTH / 2, y: -232 };
        _aAttachFiches["oReceiveWin"] = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT + 100 };
    };

    this.generateFichesPileByIndex = function(iFichesValue) {

        var aFichesPile = new Array();
        var iValueRest;
        var iCont = _aFicheValues.length - 1;
        var iCurMaxFicheStake = _aFicheValues[iCont];

        do {
            iValueRest = iFichesValue % iCurMaxFicheStake;
            iValueRest = roundDecimal(iValueRest, 1);

            var iDivisionWithPrecision = roundDecimal(iFichesValue / iCurMaxFicheStake, 1);
            var iDivision = Math.floor(iDivisionWithPrecision);
            for (var i = 0; i < iDivision; i++) {
                aFichesPile.push(this.getFicheIndexByValue(iCurMaxFicheStake));
            }

            iCont--;
            iCurMaxFicheStake = _aFicheValues[iCont];
            iFichesValue = iValueRest;
        } while (iValueRest > 0 && iCont > -1);

        return aFichesPile;
    };

    this.getNumbersForButton = function(szName) {
        var aNumbers;
        switch (szName) {
            case "col1":
                {
                    aNumbers = new Array(1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34);
                    break;
                }

            case "col2":
                {
                    aNumbers = new Array(2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35);
                    break;
                }

            case "col3":
                {
                    aNumbers = new Array(3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36);
                    break;
                }

            case "first12":
                {
                    aNumbers = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
                    break;
                }

            case "second12":
                {
                    aNumbers = new Array(13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24);
                    break;
                }

            case "third12":
                {
                    aNumbers = new Array(25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36);
                    break;
                }

            case "first18":
                {
                    aNumbers = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18);
                    break;
                }

            case "second18":
                {
                    aNumbers = new Array(19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36);
                    break;
                }

            case "even":
                {
                    aNumbers = new Array(2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36);
                    break;
                }

            case "black":
                {
                    aNumbers = new Array(2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35);
                    break;
                }

            case "red":
                {
                    aNumbers = new Array(1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36);
                    break;
                }

            case "odd":
                {

                    aNumbers = new Array(1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35);
                    break;
                }

            case "oBetFinalsBet":
                {

                    break;
                }
        }
        return aNumbers;
    };

    this.getBetMultiplierForButton = function(szName) {
        var iBetMultiplier;
        switch (szName) {
            case "oBetFirstRow":
                {
                    iBetMultiplier = 12;
                    break;
                }

            case "oBetSecondRow":
                {
                    iBetMultiplier = 12;
                    break;
                }

            case "oBetThirdRow":
                {
                    iBetMultiplier = 12;
                    break;
                }

            case "oBetFirst12":
                {
                    iBetMultiplier = 12;
                    break;
                }

            case "oBetSecond12":
                {
                    iBetMultiplier = 12;
                    break;
                }

            case "oBetThird12":
                {
                    iBetMultiplier = 12;
                    break;
                }

            case "oBetFirst18":
                {
                    iBetMultiplier = 18;
                    break;
                }

            case "oBetSecond18":
                {
                    iBetMultiplier = 18;
                    break;
                }

            case "oBetEven":
                {
                    iBetMultiplier = 18;
                    break;
                }

            case "oBetBlack":
                {
                    iBetMultiplier = 18;
                    break;
                }

            case "oBetRed":
                {
                    iBetMultiplier = 18;
                    break;
                }

            case "oBetOdd":
                {
                    iBetMultiplier = 18;
                    break;
                }

            case "oBetFinalsBet":
                {
                    iBetMultiplier = 4;
                    break;
                }
        }

        return iBetMultiplier;
    };

    this.getBetWinForButton = function(szName) {
        var iBetWin;
        switch (szName) {
            case "oBetFirstRow":
                {
                    iBetWin = 3;
                    break;
                }

            case "oBetSecondRow":
                {
                    iBetWin = 3;
                    break;
                }

            case "oBetThirdRow":
                {
                    iBetWin = 3;
                    break;
                }

            case "oBetFirst12":
                {
                    iBetWin = 3;
                    break;
                }

            case "oBetSecond12":
                {
                    iBetWin = 3;
                    break;
                }

            case "oBetThird12":
                {
                    iBetWin = 3;
                    break;
                }

            case "oBetFirst18":
                {
                    iBetWin = 2;
                    break;
                }

            case "oBetSecond18":
                {
                    iBetWin = 2;
                    break;
                }

            case "oBetEven":
                {
                    iBetWin = 2;
                    break;
                }

            case "oBetBlack":
                {
                    iBetWin = 2;
                    break;
                }

            case "oBetRed":
                {
                    iBetWin = 2;
                    break;
                }

            case "oBetOdd":
                {
                    iBetWin = 2;
                    break;
                }

            case "oBetFinalsBet":
                {
                    iBetWin = 4;
                    break;
                }
        }

        return iBetWin;
    };

    this.getFicheValues = function(iIndex) {
        return _aFicheValues[iIndex];
    };

    this.getFicheIndexByValue = function(iValue) {
        var iIndex = 0;
        for (var i = 0; i < _aFicheValues.length; i++) {
            if (iValue === _aFicheValues[i]) {
                iIndex = i;
                break;
            }
        }
        return iIndex;
    };

    this.getColorNumber = function(iNumber) {
        var i = 0;
        for (i = 0; i < _aBlackNumbers.length; i++) {
            if (_aBlackNumbers[i] === iNumber) {
                return COLOR_BLACK;
            }
        }

        for (i = 0; i < _aRedNumbers.length; i++) {
            if (_aRedNumbers[i] === iNumber) {
                return COLOR_RED;
            }
        }

        return COLOR_ZERO;
    };

    this.getFrameForBallSpin = function(iType, iNum) {
        return _aFrameForBallSpin[iType][iNum];
    };

    this.getAttachOffset = function(szAttach) {
        return _aAttachFiches[szAttach];
    };

    this._init();
}