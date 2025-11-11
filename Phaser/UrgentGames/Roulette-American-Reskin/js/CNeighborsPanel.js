function CNeighborsPanel() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token') || '378';
    const mode = urlParams.get('mode');

    var _iNumberClicked;
    var _iIndexFicheSelected;
    var _iTotMoney;
    var _iCurBet;
    var _aNeighborsNumbers;
    var _aValueFichesInPos;
    var _aFichesAttached;
    var _aEnlights;
    var _aMcFichesAttached;
    var _aNumClicked;
    var _aTotNumClicked;
    var _aAttachOffset;
    var _oBackBut;
    var _oAttachFiche;
    var _oMoneyText;
    var _oFade;
    var _oContainerWheel;
    var _oContainer;

    this._init = function() {
        _aTotNumClicked = new Array();

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.on("click", function() {});
        _oContainer.addChild(_oFade);

        _oContainerWheel = new createjs.Container();
        _oContainerWheel.x = 500;
        _oContainerWheel.y = 80;
        _oContainer.addChild(_oContainerWheel);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('neighbor_bg'));
        _oContainerWheel.addChild(oBg);

        _oMoneyText = new createjs.Text(languageService.serverCurrency("currencySymbol") + _iTotMoney, "33px " + FONT_REGULAR, "#fff");
        _oMoneyText.textAlign = "center";
        _oMoneyText.x = 1200;
        _oMoneyText.y = 860;
        _oContainerWheel.addChild(_oMoneyText);

        //ADD ENLIGHTS
        _aEnlights = new Array();

        var oBmp = new CEnlight(496, 921, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(180);
        _aEnlights["oEnlight_0"] = oBmp;

        oBmp = new CEnlight(347, 11, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-10);
        _aEnlights["oEnlight_1"] = oBmp;

        oBmp = new CEnlight(573, 909, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(170);
        _aEnlights["oEnlight_2"] = oBmp;

        oBmp = new CEnlight(96, 174, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-47);
        _aEnlights["oEnlight_3"] = oBmp;

        oBmp = new CEnlight(823, 747, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(133);
        _aEnlights["oEnlight_4"] = oBmp;

        oBmp = new CEnlight(-3, 458, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-85);
        _aEnlights["oEnlight_5"] = oBmp;

        oBmp = new CEnlight(924, 462, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(95);
        _aEnlights["oEnlight_6"] = oBmp;

        oBmp = new CEnlight(92, 742, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-122);
        _aEnlights["oEnlight_7"] = oBmp;

        oBmp = new CEnlight(825, 177, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(57);
        _aEnlights["oEnlight_8"] = oBmp;

        oBmp = new CEnlight(344, 909, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-161);
        _aEnlights["oEnlight_9"] = oBmp;

        oBmp = new CEnlight(575, 12, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(19);
        _aEnlights["oEnlight_10"] = oBmp;

        oBmp = new CEnlight(143, 800, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-132);
        _aEnlights["oEnlight_11"] = oBmp;

        oBmp = new CEnlight(775, 122, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(48);
        _aEnlights["oEnlight_12"] = oBmp;

        oBmp = new CEnlight(275, 35, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-19);
        _aEnlights["oEnlight_13"] = oBmp;

        oBmp = new CEnlight(642, 885, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(162);
        _aEnlights["oEnlight_14"] = oBmp;

        oBmp = new CEnlight(55, 239, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-57);
        _aEnlights["oEnlight_15"] = oBmp;

        oBmp = new CEnlight(866, 683, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(124);
        _aEnlights["oEnlight_16"] = oBmp;

        oBmp = new CEnlight(2, 535, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-95);
        _aEnlights["oEnlight_17"] = oBmp;

        oBmp = new CEnlight(916, 385, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(85);
        _aEnlights["oEnlight_18"] = oBmp;

        oBmp = new CEnlight(867, 241, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(66);
        _aEnlights["oEnlight_19"] = oBmp;

        oBmp = new CEnlight(50, 677, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-113);
        _aEnlights["oEnlight_20"] = oBmp;

        oBmp = new CEnlight(916, 538, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(104);
        _aEnlights["oEnlight_21"] = oBmp;

        oBmp = new CEnlight(2, 381, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-75);
        _aEnlights["oEnlight_22"] = oBmp;

        oBmp = new CEnlight(771, 802, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(142);
        _aEnlights["oEnlight_23"] = oBmp;

        oBmp = new CEnlight(147, 118, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-38);
        _aEnlights["oEnlight_24"] = oBmp;

        oBmp = new CEnlight(649, 36, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(29);
        _aEnlights["oEnlight_25"] = oBmp;

        oBmp = new CEnlight(274, 882, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-152);
        _aEnlights["oEnlight_26"] = oBmp;

        oBmp = new CEnlight(499, -1, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(9);
        _aEnlights["oEnlight_27"] = oBmp;

        oBmp = new CEnlight(421, 920, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-171);
        _aEnlights["oEnlight_28"] = oBmp;

        oBmp = new CEnlight(715, 72, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(38);
        _aEnlights["oEnlight_29"] = oBmp;

        oBmp = new CEnlight(205, 846, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-142);
        _aEnlights["oEnlight_30"] = oBmp;

        oBmp = new CEnlight(900, 311, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(76);
        _aEnlights["oEnlight_31"] = oBmp;

        oBmp = new CEnlight(20, 609, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-104);
        _aEnlights["oEnlight_32"] = oBmp;

        oBmp = new CEnlight(898, 613, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(114);
        _aEnlights["oEnlight_33"] = oBmp;

        oBmp = new CEnlight(22, 309, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-67);
        _aEnlights["oEnlight_34"] = oBmp;

        oBmp = new CEnlight(710, 850, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(152);
        _aEnlights["oEnlight_35"] = oBmp;

        oBmp = new CEnlight(207, 72, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        oBmp.rotate(-29);
        _aEnlights["oEnlight_36"] = oBmp;

        oBmp = new CEnlight(425, -2, s_oSpriteLibrary.getSprite('neighbor_enlight'), _oContainerWheel);
        _aEnlights["oEnlight_37"] = oBmp;

        _oAttachFiche = new createjs.Container();
        _oContainerWheel.addChild(_oAttachFiche);

        //ADD BUTTON HIT AREAS
        var oSprite = s_oSpriteLibrary.getSprite('hitarea_neighbor');

        //Hit area for number 00
        var oBut = new CGfxButton(466, 87, oSprite, _oContainerWheel);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 37 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 37 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 37 });

        //Hit area for number 27
        oBut = new CGfxButton(524, 93, oSprite, _oContainerWheel);
        oBut.rotate(11.5);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 27 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 27 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 27 });

        //Hit area for number 10
        oBut = new CGfxButton(581, 107, oSprite, _oContainerWheel);
        oBut.rotate(20);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 10 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 10 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 10 });

        //Hit area for number 25
        oBut = new CGfxButton(637, 131, oSprite, _oContainerWheel);
        oBut.rotate(30);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 25 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 25 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 25 });

        //Hit area for number 29
        oBut = new CGfxButton(692, 170, oSprite, _oContainerWheel);
        oBut.rotate(38);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 29 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 29 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 29 });

        //Hit area for number 12
        oBut = new CGfxButton(735, 208, oSprite, _oContainerWheel);
        oBut.rotate(49.7);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 12 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 12 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 12 });

        //Hit area for number 8
        oBut = new CGfxButton(772, 258, oSprite, _oContainerWheel);
        oBut.rotate(58);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 8 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 8 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 8 });

        //Hit area for number 19
        oBut = new CGfxButton(800, 312, oSprite, _oContainerWheel);
        oBut.rotate(67);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 19 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 19 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 19 });

        //Hit area for number 31
        oBut = new CGfxButton(820, 370, oSprite, _oContainerWheel);
        oBut.rotate(76.5);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 31 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 31 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 31 });

        //Hit area for number 18
        oBut = new CGfxButton(830, 430, oSprite, _oContainerWheel);
        oBut.rotate(86);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 18 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 18 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 18 });

        //Hit area for number 6
        oBut = new CGfxButton(830, 493, oSprite, _oContainerWheel);
        oBut.rotate(95.5);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 6 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 6 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 6 });

        //Hit area for number 21
        oBut = new CGfxButton(820, 552, oSprite, _oContainerWheel);
        oBut.rotate(106);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 21 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 21 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 21 });

        //Hit area for number 33
        oBut = new CGfxButton(800, 611, oSprite, _oContainerWheel);
        oBut.rotate(115);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 33 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 33 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 33 });

        //Hit area for number 16
        oBut = new CGfxButton(771, 665, oSprite, _oContainerWheel);
        oBut.rotate(125);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 16 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 16 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 16 });

        //Hit area for number 4
        oBut = new CGfxButton(733, 714, oSprite, _oContainerWheel);
        oBut.rotate(133);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 4 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 4 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 4 });

        //Hit area for number 23
        oBut = new CGfxButton(685, 755, oSprite, _oContainerWheel);
        oBut.rotate(141.2);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 23 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 23 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 23 });

        //Hit area for number 35
        oBut = new CGfxButton(632, 788, oSprite, _oContainerWheel);
        oBut.rotate(150.9);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 35 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 35 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 35 });

        //Hit area for number 14
        oBut = new CGfxButton(577, 813, oSprite, _oContainerWheel);
        oBut.rotate(161);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 14 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 14 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 14 });

        //Hit area for number 2
        oBut = new CGfxButton(520, 826, oSprite, _oContainerWheel);
        oBut.rotate(172);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 2 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 2 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 2 });

        //Hit area for number 0
        oBut = new CGfxButton(460, 830, oSprite, _oContainerWheel);
        oBut.rotate(180);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 0 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 0 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 0 });

        //Hit area for number 28
        oBut = new CGfxButton(395, 828, oSprite, _oContainerWheel);
        oBut.rotate(-171);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 28 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 28 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 28 });

        //Hit area for number 9
        oBut = new CGfxButton(336, 811, oSprite, _oContainerWheel);
        oBut.rotate(-162);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 9 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 9 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 9 });

        //Hit area for number 26
        oBut = new CGfxButton(276, 788, oSprite, _oContainerWheel);
        oBut.rotate(-152);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 26 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 26 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 26 });

        //Hit area for number 30
        oBut = new CGfxButton(228, 752, oSprite, _oContainerWheel);
        oBut.rotate(-142);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 30 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 30 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 30 });

        //Hit area for number 11
        oBut = new CGfxButton(180, 709, oSprite, _oContainerWheel);
        oBut.rotate(-132);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 11 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 11 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 11 });

        //Hit area for number 7
        oBut = new CGfxButton(142, 660, oSprite, _oContainerWheel);
        oBut.rotate(-123);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 7 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 7 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 7 });

        //Hit area for number 20
        oBut = new CGfxButton(118, 606, oSprite, _oContainerWheel);
        oBut.rotate(-113);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 20 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 20 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 20 });

        //Hit area for number 32
        oBut = new CGfxButton(97, 550, oSprite, _oContainerWheel);
        oBut.rotate(-103);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 32 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 32 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 32 });

        //Hit area for number 17
        oBut = new CGfxButton(88, 490, oSprite, _oContainerWheel);
        oBut.rotate(-93);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 17 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 17 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 17 });

        //Hit area for number 5
        oBut = new CGfxButton(87, 429, oSprite, _oContainerWheel);
        oBut.rotate(-85);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 5 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 5 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 5 });

        //Hit area for number 22
        oBut = new CGfxButton(99, 366, oSprite, _oContainerWheel);
        oBut.rotate(-75);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 22 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 22 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 22 });

        //Hit area for number 34
        oBut = new CGfxButton(119, 308, oSprite, _oContainerWheel);
        oBut.rotate(-65);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 34 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 34 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 34 });

        //Hit area for number 15
        oBut = new CGfxButton(147, 255, oSprite, _oContainerWheel);
        oBut.rotate(-55);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 15 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 15 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 15 });

        //Hit area for number 3
        oBut = new CGfxButton(187, 203, oSprite, _oContainerWheel);
        oBut.rotate(-47);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 3 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 3 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 3 });

        //Hit area for number 24
        oBut = new CGfxButton(234, 165, oSprite, _oContainerWheel);
        oBut.rotate(-39);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 24 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 24 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 24 });

        //Hit area for number 36
        oBut = new CGfxButton(284, 130, oSprite, _oContainerWheel);
        oBut.rotate(-29);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 36 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 36 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 36 });

        //Hit area for number 13
        oBut = new CGfxButton(342, 107, oSprite, _oContainerWheel);
        oBut.rotate(-19);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 13 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 13 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 13 });

        //Hit area for number 1
        oBut = new CGfxButton(402, 92, oSprite, _oContainerWheel);
        oBut.rotate(-9);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, { index: 1 });
        oBut.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, { index: 1 });
        oBut.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, { index: 1 });

        this._initNeighbors();

        _oBackBut = new CGfxButton(1203, 50, s_oSpriteLibrary.getSprite('but_cross'), _oContainerWheel);
        _oBackBut.addEventListener(ON_MOUSE_UP, this.onExit, this);

        this.reset();

        this.hide();
    };

    this.unload = function() {
        _oFade.off("click", function() {});
        for (var i = 0; i < _oContainer.getNumChildren(); i++) {
            if (oBut instanceof CGfxButton) {
                var oBut = _oContainer.getChildAt(i);
                oBut.unload();
            }
        }
    };

    this.showPanel = function(iIndexFicheSelected, iMoney, iCurBet) {
        _iIndexFicheSelected = iIndexFicheSelected;

        _iTotMoney = iMoney;
        _iCurBet = iCurBet;
        _aNumClicked = new Array();

        _oMoneyText.text = languageService.serverCurrency("currencySymbol") + iMoney;
        _oContainer.visible = true;
    };

    this.hide = function() {
        _bFichesOnTable = false;
        _oContainer.visible = false;
    };

    this._initNeighbors = function() {
        _aNeighborsNumbers = new Array();
        _aNeighborsNumbers[0] = new Array(14, 2, 0, 28, 9);
        _aNeighborsNumbers[1] = new Array(36, 13, 1, 37, 27);
        _aNeighborsNumbers[2] = new Array(35, 14, 2, 0, 28);
        _aNeighborsNumbers[3] = new Array(34, 15, 3, 24, 36);
        _aNeighborsNumbers[4] = new Array(33, 16, 4, 23, 35);
        _aNeighborsNumbers[5] = new Array(32, 17, 5, 22, 34);
        _aNeighborsNumbers[6] = new Array(31, 18, 6, 21, 33);
        _aNeighborsNumbers[7] = new Array(30, 11, 7, 20, 32);
        _aNeighborsNumbers[8] = new Array(29, 12, 8, 19, 31);
        _aNeighborsNumbers[9] = new Array(0, 28, 9, 26, 30);
        _aNeighborsNumbers[10] = new Array(37, 27, 10, 25, 29);
        _aNeighborsNumbers[11] = new Array(26, 30, 11, 7, 20);
        _aNeighborsNumbers[12] = new Array(25, 29, 12, 8, 19);
        _aNeighborsNumbers[13] = new Array(24, 36, 13, 1, 37);
        _aNeighborsNumbers[14] = new Array(23, 35, 14, 2, 0);
        _aNeighborsNumbers[15] = new Array(22, 34, 15, 3, 24);
        _aNeighborsNumbers[16] = new Array(21, 33, 16, 4, 23);
        _aNeighborsNumbers[17] = new Array(20, 32, 17, 5, 22);
        _aNeighborsNumbers[18] = new Array(19, 31, 18, 6, 21);
        _aNeighborsNumbers[19] = new Array(12, 8, 19, 31, 18);
        _aNeighborsNumbers[20] = new Array(11, 7, 20, 32, 17);
        _aNeighborsNumbers[21] = new Array(18, 6, 21, 33, 16);
        _aNeighborsNumbers[22] = new Array(17, 5, 22, 34, 15);
        _aNeighborsNumbers[23] = new Array(16, 4, 23, 35, 14);
        _aNeighborsNumbers[24] = new Array(15, 3, 24, 36, 13);
        _aNeighborsNumbers[25] = new Array(27, 10, 25, 29, 12);
        _aNeighborsNumbers[26] = new Array(28, 9, 26, 30, 11);
        _aNeighborsNumbers[27] = new Array(1, 37, 27, 10, 25);
        _aNeighborsNumbers[28] = new Array(2, 0, 28, 9, 26);
        _aNeighborsNumbers[29] = new Array(10, 25, 29, 12, 8);
        _aNeighborsNumbers[30] = new Array(9, 26, 30, 11, 7);
        _aNeighborsNumbers[31] = new Array(8, 19, 31, 18, 6);
        _aNeighborsNumbers[32] = new Array(7, 20, 32, 17, 5);
        _aNeighborsNumbers[33] = new Array(6, 21, 33, 16, 4);
        _aNeighborsNumbers[34] = new Array(5, 22, 34, 15, 3);
        _aNeighborsNumbers[35] = new Array(4, 23, 35, 14, 2);
        _aNeighborsNumbers[36] = new Array(3, 24, 36, 13, 1);
        _aNeighborsNumbers[37] = new Array(13, 1, 37, 27, 10);

        //INIT ATTACH OFFSET
        _aAttachOffset = new Array();
        _aAttachOffset["oAttach_0"] = new createjs.Point(457, 855);
        _aAttachOffset["oAttach_1"] = new createjs.Point(398, 65);
        _aAttachOffset["oAttach_2"] = new createjs.Point(522, 850);
        _aAttachOffset["oAttach_3"] = new createjs.Point(169, 189);
        _aAttachOffset["oAttach_4"] = new createjs.Point(752, 735);
        _aAttachOffset["oAttach_5"] = new createjs.Point(65, 424);
        _aAttachOffset["oAttach_6"] = new createjs.Point(860, 497);
        _aAttachOffset["oAttach_7"] = new createjs.Point(123, 675);
        _aAttachOffset["oAttach_8"] = new createjs.Point(794, 245);
        _aAttachOffset["oAttach_9"] = new createjs.Point(327, 836);
        _aAttachOffset["oAttach_10"] = new createjs.Point(593, 85);
        _aAttachOffset["oAttach_11"] = new createjs.Point(165, 725);
        _aAttachOffset["oAttach_12"] = new createjs.Point(753, 193);
        _aAttachOffset["oAttach_13"] = new createjs.Point(334, 80);
        _aAttachOffset["oAttach_14"] = new createjs.Point(585, 838);
        _aAttachOffset["oAttach_15"] = new createjs.Point(130, 241);
        _aAttachOffset["oAttach_16"] = new createjs.Point(790, 680);
        _aAttachOffset["oAttach_17"] = new createjs.Point(66, 490);
        _aAttachOffset["oAttach_18"] = new createjs.Point(856, 431);
        _aAttachOffset["oAttach_19"] = new createjs.Point(825, 303);
        _aAttachOffset["oAttach_20"] = new createjs.Point(96, 615);
        _aAttachOffset["oAttach_21"] = new createjs.Point(845, 561);
        _aAttachOffset["oAttach_22"] = new createjs.Point(78, 360);
        _aAttachOffset["oAttach_23"] = new createjs.Point(700, 777);
        _aAttachOffset["oAttach_24"] = new createjs.Point(218, 145);
        _aAttachOffset["oAttach_25"] = new createjs.Point(653, 112);
        _aAttachOffset["oAttach_26"] = new createjs.Point(266, 810);
        _aAttachOffset["oAttach_27"] = new createjs.Point(530, 68);
        _aAttachOffset["oAttach_28"] = new createjs.Point(390, 850);
        _aAttachOffset["oAttach_29"] = new createjs.Point(708, 148);
        _aAttachOffset["oAttach_30"] = new createjs.Point(215, 768);
        _aAttachOffset["oAttach_31"] = new createjs.Point(846, 365);
        _aAttachOffset["oAttach_32"] = new createjs.Point(75, 553);
        _aAttachOffset["oAttach_33"] = new createjs.Point(822, 623);
        _aAttachOffset["oAttach_34"] = new createjs.Point(97, 296);
        _aAttachOffset["oAttach_35"] = new createjs.Point(646, 814);
        _aAttachOffset["oAttach_36"] = new createjs.Point(273, 107);
        _aAttachOffset["oAttach_37"] = new createjs.Point(464, 62);
    };

    this.reset = function() {
        _aValueFichesInPos = new Array();
        for (var i = 0; i < NUMBERS_TO_BET; i++) {
            _aValueFichesInPos[i] = 0;
        }

        if (_aFichesAttached) {
            for (var j = 0; j < _aFichesAttached.length; j++) {
                _oAttachFiche.removeChild(_aFichesAttached[j].getSprite());
            }
        }

        _aFichesAttached = new Array();
        _aMcFichesAttached = new Array();
        _iCurBet = 0;
        _bFichesOnTable = false;
    };

    this.clearLastBet = function() {
        if (_aTotNumClicked.length === 0) {
            return;
        }

        var iNumberSelected = _aTotNumClicked.pop();

        //RESET BET VALUE FOR THE LAST SELECTED NUMBER
        var iFicheValue = s_oGameSettings.getFicheValues(_iIndexFicheSelected);
        _aValueFichesInPos[iNumberSelected] -= iFicheValue;
        _aValueFichesInPos[iNumberSelected] = roundDecimal(_aValueFichesInPos[iNumberSelected], 1);

        //REMOVE FICHE OF THE LAST BET ON NEIGHTBOR PANEL
        var aFiches = _aMcFichesAttached[iNumberSelected];

        if (aFiches.length > 0) {
            _oAttachFiche.removeChild(aFiches[aFiches.length - 1].getSprite());
        } else {
            _aTotNumClicked = new Array();
            _aValueFichesInPos[iNumberSelected] = 0;
        }

        _aFichesAttached.pop();
        _aMcFichesAttached[iNumberSelected].pop();

        if (_aTotNumClicked.length === 0) {
            _aFichesAttached = new Array();
            _aMcFichesAttached = new Array();
            _bFichesOnTable = false;
            for (var i = 0; i < NUMBERS_TO_BET; i++) {
                _aValueFichesInPos[i] = 0;
            }
        }

        _iCurBet = 0;
    };

    this.onExit = function() {
        this.hide();
    };

    this.addFicheOnNeighborTable = function() {
        var iFicheValue = s_oGameSettings.getFicheValues(_iIndexFicheSelected);

        if ((_iCurBet + (iFicheValue * 5)) > _iTotMoney) {
            s_oGame.showMsgBox(languageService.getString("TEXT_ERROR_NO_MONEY_MSG"));
            return;
        } else if ((_iCurBet + (iFicheValue * 5)) > MAX_BET) {
            s_oGame.showMsgBox(languageService.getString("TEXT_ERROR_MAX_BET_REACHED"));
            return;
        } else {
            _iCurBet += (iFicheValue * 5);
            var iAmount = (_iTotMoney - _iCurBet);
            if (mode === 'offline') {
                _iCurBet = roundDecimal(_iCurBet, 1);
                iAmount = roundDecimal(iAmount, 1);
            } else {

            }

            _oMoneyText.text = languageService.serverCurrency("currencySymbol") + parseFloat(iAmount);
        }


        playSound("chip", 1, false);


        _aValueFichesInPos[_iNumberClicked] += iFicheValue;
        _aValueFichesInPos[_iNumberClicked] = roundDecimal(_aValueFichesInPos[_iNumberClicked], 1);

        var aFiches = s_oGameSettings.generateFichesPileByIndex(_aValueFichesInPos[_iNumberClicked]);
        aFiches.sort();

        this._removeFichesPile(_aMcFichesAttached[_iNumberClicked]);
        _aMcFichesAttached[_iNumberClicked] = new Array();

        var iXPos = _aAttachOffset["oAttach_" + _iNumberClicked].x;
        var iYPos = _aAttachOffset["oAttach_" + _iNumberClicked].y;
        for (var k = 0; k < aFiches.length; k++) {
            this._attachFichesPile(aFiches[k], _iNumberClicked, iXPos, iYPos);
            iYPos -= 5;
        }

        _aNumClicked.push(_iNumberClicked);
        var aBets = _aNeighborsNumbers[_iNumberClicked];
        s_oGame._onShowBetOnTableFromNeighbors({
            button: "oBetNeighbors",
            numbers: aBets,
            bet_mult: 5,
            bet_win: 7.2,
            value: _iIndexFicheSelected,
            num_fiches: 5,
            num_clicked: _iNumberClicked
        }, false);


        _aTotNumClicked.push(_iNumberClicked);
        _bFichesOnTable = true;
    };

    this._attachFichesPile = function(iIndexFicheSelected, iNumber, iXPos, iYPos) {
        var oFicheMc = new CFiche(iXPos, iYPos, iIndexFicheSelected, _oAttachFiche, 0.7);

        _aMcFichesAttached[iNumber].push(oFicheMc);
        _aFichesAttached.push(oFicheMc);
    };

    this._removeFichesPile = function(aFiches) {
        for (var i in aFiches) {
            _oAttachFiche.removeChild(aFiches[i].getSprite());
        }
    };

    this.searchForNumClicked = function() {
        for (var i = 0; i < _aNumClicked.length; i++) {
            if (_aNumClicked[i] === _iNumberClicked) {
                return true;
            }
        }

        return false;
    }

    this._onNeighborRelease = function(oParams) {
        _iNumberClicked = oParams.index;

        this.addFicheOnNeighborTable();
    };

    this.rebet = function(iNumClicked) {
        _iNumberClicked = iNumClicked;

        this.addFicheOnNeighborTable();
    };

    this._onNeighborOver = function(oParams) {
        var aBets = _aNeighborsNumbers[oParams.index];

        for (var i = 0; i < aBets.length; i++) {
            _aEnlights["oEnlight_" + aBets[i]].show();
        }
    };

    this._onNeighborOut = function(oParams) {
        var aBets = _aNeighborsNumbers[oParams.index];

        for (var i = 0; i < aBets.length; i++) {
            _aEnlights["oEnlight_" + aBets[i]].hide();
        }
    };

    this.isVisible = function() {
        return _oContainer.visible;
    };

    this._init();
}