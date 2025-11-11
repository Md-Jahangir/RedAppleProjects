function CWheelAnim(iX, iY) {
    var _bUpdate;
    var _bBallSpin;
    var _iWin;
    var _iCurBallSprite;
    var _iCurBallSpin;
    var _iCurWheelIndex;
    var _iFrameCont;
    var _iCurBallIndex;
    var _aWheelAnimSprites;
    var _aWheelMaskSprites;
    var _aBallPos;
    var _oBall;
    var _oCurWheelSprite;
    var _oCurWheelMaskSprite;
    var _oNumExtractedText;
    var _oResultText;
    var _oShowNumber;
    var _oNumberColorBg;
    var _oListenerClick;
    var _oContainer;

    this._init = function(iX, iY) {
        _iCurWheelIndex = 0;
        _iFrameCont = 0;
        _bBallSpin = false;

        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oListenerClick = _oContainer.on("click", function() {});
        s_oStage.addChild(_oContainer);

        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(oFade);

        var oBgWheel = createBitmap(s_oSpriteLibrary.getSprite("wheel_anim_bg"));
        oBgWheel.x = 0;
        oBgWheel.y = 0;
        _oContainer.addChild(oBgWheel);

        var oSprite = s_oSpriteLibrary.getSprite("roulette_game_logo_wheel_anim");
        var oLogo = createBitmap(oSprite);
        oLogo.regX = oSprite.width / 2;
        oLogo.regY = oSprite.height / 2;
        oLogo.x = 960; //835
        oLogo.y = 540; //400
        _oContainer.addChild(oLogo);

        _aWheelAnimSprites = new Array();
        for (var i = 0; i < NUM_MASK_BALL_SPIN_FRAMES; i++) {
            var oImage = createBitmap(s_oSpriteLibrary.getSprite('wheel_numbers_' + i));
            oImage.x = 0;
            oImage.y = 0;
            oImage.visible = false;
            _oContainer.addChild(oImage);
            _aWheelAnimSprites.push(oImage);
        }

        this._initBall();


        _oCurWheelSprite = _aWheelAnimSprites[0];
        _oCurWheelSprite.visible = true;

        _oShowNumber = new createjs.Container();
        _oShowNumber.visible = false;
        _oShowNumber.x = CANVAS_WIDTH / 2;
        _oShowNumber.y = CANVAS_HEIGHT / 2;
        _oContainer.addChild(_oShowNumber);

        var oSprite = s_oSpriteLibrary.getSprite("show_number_panel");
        var oBgShowNumber = createBitmap(oSprite);
        _oShowNumber.addChild(oBgShowNumber);

        var oData = {
            images: [s_oSpriteLibrary.getSprite("show_number_bg")],
            // width, height & registration point of each sprite
            frames: { width: 117, height: 117, regX: 58, regY: 58 },
            animations: { black: [0], red: [1], green: [2] }
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oNumberColorBg = createSprite(oSpriteSheet, "black", 58, 58, 117, 117);
        _oNumberColorBg.x = oSprite.width / 2;
        _oNumberColorBg.y = oSprite.height / 2;
        _oShowNumber.addChild(_oNumberColorBg);

        _oNumExtractedText = new createjs.Text("36", "80px " + FONT2, "#fff");
        _oNumExtractedText.textAlign = "center";
        _oNumExtractedText.textBaseline = "middle";
        _oNumExtractedText.x = oSprite.width / 2;
        _oNumExtractedText.y = oSprite.height / 2 + 7;
        _oShowNumber.addChild(_oNumExtractedText);

        var oSpriteResultBg = s_oSpriteLibrary.getSprite("but_bg");
        var oBgResult = createBitmap(oSpriteResultBg);
        oBgResult.regX = oSpriteResultBg.width / 2;
        oBgResult.x = oSprite.width / 2;
        oBgResult.y = oSprite.height - 12;
        _oShowNumber.addChild(oBgResult);

        _oResultText = new createjs.Text("", "22px " + FONT1, "#fff");
        _oResultText.textAlign = "center";
        _oResultText.textBaseline = "middle";
        _oResultText.x = oSprite.width / 2;
        _oResultText.y = oSprite.height + 35;
        _oShowNumber.addChild(_oResultText);

        _oShowNumber.regX = oSprite.width / 2;
        _oShowNumber.regY = oSprite.height / 2;
    };

    this.unload = function() {
        _oContainer.off("click", _oListenerClick);
    };

    this._initBall = function() {
        _aBallPos = new Array();
        //1 to 10
        _aBallPos.push({ x: 1375.1 - 35, y: 652.96 - 20 })
        _aBallPos.push({ x: 1385.8 - 35, y: 590.07 - 20 })
        _aBallPos.push({ x: 1387.0 - 35, y: 526.5 - 20 })
        _aBallPos.push({ x: 1378.9 - 35, y: 463.66 - 20 })
        _aBallPos.push({ x: 1361.6 - 35, y: 402.93 - 20 })
        _aBallPos.push({ x: 1335.5 - 35, y: 345.63 - 20 })
        _aBallPos.push({ x: 1301.4 - 35, y: 293.01 - 20 })
        _aBallPos.push({ x: 1260.0 - 35, y: 246.18 - 20 })
        _aBallPos.push({ x: 1212.3 - 35, y: 206.14 - 20 })
        _aBallPos.push({ x: 1159.4 - 35, y: 173.73 - 20 })

        //11 to 20
        _aBallPos.push({ x: 1102.5 - 35, y: 149.61 - 20 })
        _aBallPos.push({ x: 1042.8 - 35, y: 134.25 - 20 })
        _aBallPos.push({ x: 981.7 - 35, y: 127.92 - 20 })
        _aBallPos.push({ x: 913.67 - 35, y: 131.42 - 20 })
        _aBallPos.push({ x: 847.38 - 35, y: 146.04 - 20 })
        _aBallPos.push({ x: 784.64 - 35, y: 171.3 - 20 })
        _aBallPos.push({ x: 727.12 - 35, y: 206.43 - 20 })
        _aBallPos.push({ x: 676.37 - 35, y: 250.4 - 20 })
        _aBallPos.push({ x: 633.71 - 35, y: 301.95 - 20 })
        _aBallPos.push({ x: 600.25 - 35, y: 359.62 - 20 })

        //21 to 30
        _aBallPos.push({ x: 576.84 - 35, y: 421.78 - 20 })
        _aBallPos.push({ x: 564.04 - 35, y: 486.72 - 20 })
        _aBallPos.push({ x: 562.14 - 35, y: 552.64 - 20 })
        _aBallPos.push({ x: 571.09 - 35, y: 617.73 - 20 })
        _aBallPos.push({ x: 588.62 - 35, y: 674.97 - 20 })
        _aBallPos.push({ x: 614.49 - 35, y: 728.71 - 20 })
        _aBallPos.push({ x: 648.04 - 35, y: 777.75 - 20 })
        _aBallPos.push({ x: 688.45 - 35, y: 821.01 - 20 })
        _aBallPos.push({ x: 734.76 - 35, y: 857.54 - 20 })
        _aBallPos.push({ x: 785.85 - 35, y: 886.56 - 20 })

        //31 to 40
        _aBallPos.push({ x: 840.53 - 35, y: 907.46 - 20 })
        _aBallPos.push({ x: 897.51 - 35, y: 919.83 - 20 })
        _aBallPos.push({ x: 955.49 - 35, y: 923.45 - 20 })
        _aBallPos.push({ x: 1013.1 - 35, y: 918.31 - 20 })
        _aBallPos.push({ x: 1069.1 - 35, y: 904.58 - 20 })
        _aBallPos.push({ x: 1104.9 - 35, y: 890.31 - 20 })
        _aBallPos.push({ x: 1139.0 - 35, y: 872.55 - 20 })
        _aBallPos.push({ x: 1170.9 - 35, y: 851.52 - 20 })
        _aBallPos.push({ x: 1200.4 - 35, y: 827.45 - 20 })
        _aBallPos.push({ x: 1227.2 - 35, y: 800.62 - 20 })

        //41 to 50
        _aBallPos.push({ x: 1251.1 - 35, y: 771.32 - 20 })
        _aBallPos.push({ x: 1271.8 - 35, y: 739.88 - 20 })
        _aBallPos.push({ x: 1289.1 - 35, y: 706.64 - 20 })
        _aBallPos.push({ x: 1302.9 - 35, y: 671.94 - 20 })
        _aBallPos.push({ x: 1313.1 - 35, y: 636.17 - 20 })
        _aBallPos.push({ x: 1320.2 - 35, y: 587.22 - 20 })
        _aBallPos.push({ x: 1320.7 - 35, y: 538.19 - 20 })
        _aBallPos.push({ x: 1314.6 - 35, y: 489.95 - 20 })
        _aBallPos.push({ x: 1302.3 - 35, y: 443.35 - 20 })
        _aBallPos.push({ x: 1284.0 - 35, y: 399.19 - 20 })

        //51 to 60
        _aBallPos.push({ x: 1260.1 - 35, y: 358.21 - 20 })
        _aBallPos.push({ x: 1231.3 - 35, y: 321.06 - 20 })
        _aBallPos.push({ x: 1198.0 - 35, y: 288.34 - 20 })
        _aBallPos.push({ x: 1160.9 - 35, y: 260.54 - 20 })
        _aBallPos.push({ x: 1120.8 - 35, y: 238.06 - 20 })
        _aBallPos.push({ x: 1078.4 - 35, y: 221.2 - 20 })
        _aBallPos.push({ x: 1034.5 - 35, y: 210.17 - 20 })
        _aBallPos.push({ x: 983.91 - 35, y: 204.6 - 20 })
        _aBallPos.push({ x: 933.4 - 35, y: 206.61 - 20 })
        _aBallPos.push({ x: 884.08 - 35, y: 216.05 - 20 })

        //61 to 70
        _aBallPos.push({ x: 836.99 - 35, y: 232.63 - 20 })
        _aBallPos.push({ x: 793.15 - 35, y: 255.87 - 20 })
        _aBallPos.push({ x: 753.46 - 35, y: 285.19 - 20 })
        _aBallPos.push({ x: 718.74 - 35, y: 319.87 - 20 })
        _aBallPos.push({ x: 689.68 - 35, y: 359.11 - 20 })
        _aBallPos.push({ x: 666.85 - 35, y: 402.0 - 20 })
        _aBallPos.push({ x: 650.68 - 35, y: 447.59 - 20 })
        _aBallPos.push({ x: 641.44 - 35, y: 494.85 - 20 })
        _aBallPos.push({ x: 639.26 - 35, y: 538.22 - 20 })
        _aBallPos.push({ x: 642.85 - 35, y: 581.33 - 20 })

        //71 to 80
        _aBallPos.push({ x: 652.11 - 35, y: 623.44 - 20 })
        _aBallPos.push({ x: 666.82 - 35, y: 663.82 - 20 })
        _aBallPos.push({ x: 686.7 - 35, y: 701.79 - 20 })
        _aBallPos.push({ x: 711.37 - 35, y: 736.71 - 20 })
        _aBallPos.push({ x: 740.39 - 35, y: 767.98 - 20 })
        _aBallPos.push({ x: 773.24 - 35, y: 795.1 - 20 })
        _aBallPos.push({ x: 809.33 - 35, y: 817.6 - 20 })
        _aBallPos.push({ x: 848.04 - 35, y: 835.12 - 20 })
        _aBallPos.push({ x: 888.7 - 35, y: 847.36 - 20 })
        _aBallPos.push({ x: 921.3 - 35, y: 853.1 - 20 })

        //81 to 90
        _aBallPos.push({ x: 954.33 - 35, y: 855.49 - 20 })
        _aBallPos.push({ x: 987.44 - 35, y: 854.49 - 20 })
        _aBallPos.push({ x: 1020.3 - 35, y: 850.12 - 20 })
        _aBallPos.push({ x: 1052.6 - 35, y: 842.39 - 20 })
        _aBallPos.push({ x: 1083.9 - 35, y: 831.39 - 20 })
        _aBallPos.push({ x: 1114.1 - 35, y: 817.22 - 20 })
        _aBallPos.push({ x: 1142.7 - 35, y: 799.99 - 20 })
        _aBallPos.push({ x: 1169.4 - 35, y: 779.87 - 20 })
        _aBallPos.push({ x: 1194.1 - 35, y: 757.04 - 20 })
        _aBallPos.push({ x: 1214.4 - 35, y: 732.77 - 20 })

        //91 to 100
        _aBallPos.push({ x: 1232.3 - 35, y: 706.59 - 20 })
        _aBallPos.push({ x: 1247.4 - 35, y: 678.78 - 20 })
        _aBallPos.push({ x: 1259.8 - 35, y: 649.6 - 20 })
        _aBallPos.push({ x: 1269.2 - 35, y: 619.34 - 20 })
        _aBallPos.push({ x: 1275.5 - 35, y: 588.3 - 20 })
        _aBallPos.push({ x: 1278.8 - 35, y: 556.78 - 20 })
        _aBallPos.push({ x: 1278.8 - 35, y: 525.1 - 20 })
        _aBallPos.push({ x: 1275.8 - 35, y: 493.56 - 20 })
        _aBallPos.push({ x: 1269.6 - 35, y: 462.48 - 20 })
        _aBallPos.push({ x: 1274.0 - 35, y: 482.49 - 20 })

        _oBall = createBitmap(s_oSpriteLibrary.getSprite("ball"));
        _oBall.x = _aBallPos[0].x;
        _oBall.y = _aBallPos[0].y;
        _oContainer.addChild(_oBall);
        _iCurBallIndex = 0;
    };

    this.hide = function() {
        _oShowNumber.visible = false;
        _oContainer.visible = false;
        _iCurBallIndex = 0;
    };

    this.startSpin = function(iRandSpin, iStartFrame, iNumExtracted, iWin) {
        this.playToFrame(iStartFrame);
        _iWin = iWin;
        _iCurBallSpin = iRandSpin;
        _iCurBallSprite = 2;
        _bBallSpin = true;
        _oContainer.visible = true;

        this.setShowNumberInfo(iNumExtracted);
        _bUpdate = true;
    };

    this.setShowNumberInfo = function(iNumExtracted) {

        if (iNumExtracted === DOUBLE_ZERO) {
            iNumExtracted = "00";
        }
        _oNumExtractedText.text = iNumExtracted;
        if (_iWin > 0) {
            _oResultText.font = "19px " + FONT1;
            _oResultText.text = TEXT_YOU_WIN + " " + TEXT_CURRENCY + _iWin;
        } else {
            _oResultText.font = "22px " + FONT1;
            _oResultText.text = TEXT_YOU_LOSE;
        }


        switch (s_oGameSettings.getColorNumber(iNumExtracted)) {
            case COLOR_BLACK:
                {
                    _oNumberColorBg.gotoAndStop("black");
                    break;
                }
            case COLOR_RED:
                {
                    _oNumberColorBg.gotoAndStop("red");
                    break;
                }
            case COLOR_ZERO:
                {
                    _oNumberColorBg.gotoAndStop("green");
                    break;
                }
        }
    };

    this._showNumberExtracted = function() {
        _oShowNumber.scaleX = _oShowNumber.scaleY = 0.1;
        _oShowNumber.visible = true;
        createjs.Tween.get(_oShowNumber).to({ scaleX: 1, scaleY: 1 }, 800, createjs.Ease.cubicOut);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            if (_iWin > 0) {
                playSound("win", 1, false);
            } else {
                playSound("lose", 1, false);
            }

        }
    };

    this.playToFrame = function(iFrame) {
        _oCurWheelSprite.visible = false;
        _iCurWheelIndex = iFrame;
        _aWheelAnimSprites[_iCurWheelIndex].visible = true;
        _oCurWheelSprite = _aWheelAnimSprites[_iCurWheelIndex];
    };

    this.nextFrame = function() {
        _oCurWheelSprite.visible = false;
        _iCurWheelIndex++;
        _aWheelAnimSprites[_iCurWheelIndex].visible = true;
        _oCurWheelSprite = _aWheelAnimSprites[_iCurWheelIndex];
    };

    this._ballSpin = function() {
        _oBall.x = _aBallPos[_iCurBallIndex].x;
        _oBall.y = _aBallPos[_iCurBallIndex].y;

        _iCurBallIndex++;

        // if (_iCurBallIndex === (NUM_BALL_SPIN_FRAMES)) {
        //     _bUpdate = false;
        //     _iCurBallIndex = NUM_BALL_SPIN_FRAMES - 1;
        //     s_oGame._rouletteAnimEnded();
        //     this.hide();
        // } else if (_iCurBallIndex === NUM_BALL_SPIN_FRAMES / 2) {
        //     this._showNumberExtracted();
        // }

        if (_iCurBallIndex === (NUM_BALL_SPIN_FRAMES)) {
            this._showNumberExtracted();
            _bUpdate = false;
            _iCurBallIndex = NUM_BALL_SPIN_FRAMES - 1;
            this.setBallPosWhenStop();
            setTimeout(() => {
                this.hide();
                s_oGame._rouletteAnimEnded();
            }, 3000);
        }

    };
    this.setBallPosWhenStop = function() {
        var extractedNum = _oNumExtractedText.text;
        switch (extractedNum) {
            case 0:
            case "00":
            case 35:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y + 11;
                break;
            case 3:
            case 7:
            case 9:
            case 21:
            case 26:
            case 27:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y + 7;
                break;
            case 4:
            case 29:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y + 5;
                break;
            case 8:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y + 8;
                break;
            case 11:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y + 12;
                break;
            case 12:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y + 15;
                break;
            case 13:
            case 17:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y + 5;
                break;
            case 14:
            case 34:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y + 3;
                break;
            case 15:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y - 2;
                break;
            case 16:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y - 5;
                break;
            case 22:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y + 9;
                break;
            case 25:
            case 32:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y + 10;
                break;
            case 31:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y + 14;
                break;
            case 36:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y + 13;
                break;
            default:
                _oBall.x = _aBallPos[_iCurBallIndex].x;
                _oBall.y = _aBallPos[_iCurBallIndex].y
                break;

        }

    };

    this.isVisible = function() {
        return _oContainer.visible;
    };

    this.update = function() {
        if (_bUpdate === false) {
            return;
        }

        _iFrameCont++;

        if (_iFrameCont === 2) {
            _iFrameCont = 0;
            if (_bBallSpin) {

                this._ballSpin();

                if (_iCurWheelIndex === (NUM_MASK_BALL_SPIN_FRAMES - 1)) {
                    this.playToFrame(0);
                } else {
                    this.nextFrame();
                }
            }
        }

    };

    this._init(iX, iY);
}