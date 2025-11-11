var config;
var orientation_mode;

orientation_mode = {
  ////////////////
  // Landscape //
  //////////////
  orientation_landscape: {
    currentResolution: {
      width: 1920,
      height: 1080,
    },
    // CPreloader
    _oProgressBar: {
      x: 425,
      y: 645,
      scale: 1,
    },
    _oLoadingText: {
      x: 960,
      y: 726,
      scale: 1,
    },
    // CMenu
    CMenu: {
      oBaseLogoBg: {
        x: 0,
        y: 0,
        scale: 1,
      },
      _oButPlay: {
        x: 960,
        y: 910,
        scale: 1,
      },
      _oButSettings: {
        x: 1754,
        y: 72,
        stepY:0.07,
        scale: 1,
      },
      _oTextLogo: {
        x: 960,
        y: 68,
        stepY:0.07,
        scale: 1,
      },
    },
    // CGAME
    CGame: {
      oGameplayBaseBg: {
        x: 0,
        y: 20,
        scale: 1,
      },
      _oDealerCardOffset: {
        stepX: -50,
        stepY:-220,
      },
      _oStartingCardOffset: {
        x: 1700,
        y: 100,
      },
      _oStartingCardOffset: {},
      _oReceiveWinOffset: {},
      _oFichesDealerOffset: {},
      _oRemoveCardsOffset: {},
    },
    // CInterface
    CInterface: {
      _oTextLogo: {
        x: 960,
        y: 68,
        stepY:0.07,
        scale: 1,
      },
      _oTextBelowLogo: {
        x: 960,
        y: 524,
        scale: 1,
        stepY:35,
      },
      _oButRules: {
        x: 1590,
        y: 70,
        stepX: -175,
        stepY:0.07,
        visible: true,
        scale: 1,
      },
      _oButSettings: {
        x: 1745,
        y: 72,
        stepY:0.07,
        scale: 1,
      },
      _oButBack: {
        x: 166,
        y: 72,
        stepY:0.07,
        scale: 1, 
      },
      _oClearBetBut: {
        widthPercentage: 0.13,
        heightPercentage: 0.96,
        scale: 1,
      },
      _oCurDealerCardValueText: {
        x:10,
        y:-100,
        scale: 1.3,
      },
      _oMoneyText: {
        x: 250,
        y: -90,
        scale: 1,
      },
      _oHitBut: {
        x: -140,
        y: 945,
        scale: 1,
      },
      _oStandBut: {
        x: 140,
        y: 945,
        scale: 1,
      },
      _oRebetBut: {
        widthPercentage: 0.75,
        heightPercentage: 0.87,
        scale: 1,
      },
      _oDoubleBut: {
        x: -195,
        y: 90,
        scale: 1,
      },
      _oDealBut: {
        y: 90,
        scale: 1,
      },
      _oSplitBut: {
        x: +195,
        y: 90,
        scale: 1,
      },
      _aFiches: {
        scale: 1,
      },
      _aFichesPositions: [
        { x: 80, y: 1035 },
        { x: 155, y: 1035 },
        { x: 235, y: 1035 },
        { x: 315, y: 1035 },
        { x: 395, y: 1035 },
        { x: 475, y: 1035 },
      ],
    },
    // CSettingsPanel
    CSettingsPanel: {
      _oSettingsButBack: {
        stepY:0.07,
        scale: 1,
      },
      _oSettingsButCross: {
        stepY: 0.07,
        scale: 1,
      },
      _oSettingsTextLogo: {
        stepY:0.07,
        scale: 1,
      },
      _oSettingsCasinoLogo: {
        stepY: 0.85,
        scale: 1,
      },
      _oThemeText: {
        x: 720,
        y: 332,
        width: 140,
        height: 22,
        fontSize: 22,
        scale: 1,
        stepY: -250,
      },
      _oLightText: {
        x: 970,
        y: 332,
        width: 140,
        height: 22,
        fontSize: 22,
        scale: 1,
        stepY:520,
      },
      _oThemeToggleButton: {
        x: 1040,
        y: 332,
        scale: 0.9,
      },
      _oDarkText: {
        x: 1100,
        y: 332,
        width: 140,
        height: 22,
        fontSize: 22,
        scale: 1,
      },
      _oMusicText: {
        x: 720,
        y: 402,
        width: 140,
        height: 22,
        fontSize: 22,
        scale: 1,
        stepY: -250,
      },
      _oMusicOnText: {
        x: 970,
        y: 410,
        width: 140,
        height: 140,
        fontSize: 22,
        scale: 1,
      },
      _oMusicOffText: {
        x: 1100,
        y: 410,
        width: 140,
        height: 21,
        fontSize: 21,
        scale: 1,
      },
      _oMusicToggleButton: {
        x: 1040,
        y: 409,
        scale: 0.9,
      },
    },
    // rules-panel
    rulesPanel: {
      bgSprite: {
        x: 960,
        y: 540,
        regX: 960,
        regY: 540,
        scale: 1,
        scaleY: 1,
      },
      gameLogo: {
        x: 960,
        y: 68,
        stepY:0.07,
        scale: 1,
      },
      casinoLogo: {
        x: 960,
        y: 900,
        stepY: 0.85,
        scale: 1,
      },
      buttonBack: {
        x: 166,
        y: 72,
        stepY:0.07,
        scale: 1,
      },
      ruleText: {
        startX: 360,
        startY: 170,
        stepY: 20,
        scale: 1.1,
      },
    },
    // CSeat
    CSeat:{
      _oArrowCurPlayer:{
        scale:1,
        stepY: - 100,
      },
      _oGroup:{
         stepX: -150,
         stepY: -95,
        },
        currentBetText:{
          stepX: 0.1,
          stepY: 0.85,
          scale:1.3
        },
        _oCurCardValueText:{
          scale: 1.3,
          x: 50,
        },
        _oCurCardSplitValueText:{
          x: 400,
          scale: 1.3
        },
        _oResultGreenDot:{
          stepX: -35,
          scale:1.3,
        },
        _oResultGreenDot2:{
          stepX: -35,
          scale:1.3,
        },
        _oResultText_0:{
          stepX: 330,
          stepY:0,
          scale:1.3,
        },
        _oResultText_1:{
          stepX: 330,
          stepY:0,
          scale:1.3
        },
        _oMainFichesController:{
          initX: 834,
          initY: 566
        },
        _oCardOffset:{
          x: -110,
          y: 160
        },
        _oSplitOffset: {
          x: 380,
          y: 250,
          stepY:165,
        },
        _oCurSplitBetText:{
          stepX: 250,
          stepY: -50,
          scale: 1.3,
        },
        _oCurInsuaranceText:{
          stepX: 230,
          stepY: -110,
          scale: 1.3,
        },
        _oCurInsuaranceSplitText:{
          stepX: 310,
          stepY: -60,
          scale: 1.3,
        },
    },
    // CCard
    CCard :{
      _oCardSprite:{
        scale:1,
        stepX: -950,
        stepY: -540
      },
      _oCardContainer:{
        scale:1
      }
    },
    // CMsgBox
    CMsgBox :{
      _oBg:{
        scale:1,
        stepX:2,
        stepY:2,
      }
    },
    // CGameOver 
    CGameOver:{
      oBg:{
        stepX:2,
        stepY:2,
        scale:1,
      },
      _oButRecharge:{
        scale:1,
        stepX:200,
        stepY:200,
      },
      _oButExit:{
        scale:1,
        stepX: -200,
        stepY: 200,
      },
      _oTextTitle:{
        scale:1,
      },
    },
    // CInsurancePanel
    CInsurancePanel:{
      oBg:{
        stepX:2,
        stepY:2,
        scale:1,
      },
      _oButNo:{
        scale:1,
        stepX:200,
        stepY:200,
      },
      _oButYes:{
        scale:1,
        stepX:-200,
        stepY:200,
      },
      _oMsgText:{
        scale: 1,
      },
    },
  },
  orientation_portrait: {
    ////////////////
    // Portrait  //////////////////////////////////////////////////////////////////////////////////////////
    //////////////
    currentResolution: {
      width: 1920,
      height: 1080,
    },
    // CPreloader
    _oProgressBar: {
      x: -55,
      y: 1007,
      scale: 2,
    },
    _oLoadingText: {
      x: 480,
      y: 1207,
      scale: 2,
    },
    // CMenu
    CMenu: {
      oBaseLogoBg: {
        x: 480,
        y: 853,
        scale: 2,
      },
      _oButPlay: {
        x: 480,
        y: 1506,
        stepY: 0.08,
        scale: 2.3,
      },
      _oButSettings: {
        x: 794,
        y: 80,
        stepY: 0.08,
        scale: 2.3,
      },
      _oTextLogo: {
        x: 480,
        y: 80,
        stepY: 0.08,
        scale: 2.3,
      },
    },
    // CGAME
    CGame: {
      oGameplayBaseBg: {
        x: 480,
        y: 853,
        scale: 2,
      },
      _oDealerCardOffset: {
        stepX: -100,
        stepY: -900,
      },
    },
    // CInterface
    CInterface: {
      _oTextLogo: {
        x: 480,
        y: 80,
        stepY: 0.08,
        scale: 2.3,
      },
      _oTextBelowLogo: {
        x: 480,
        y: 80,
        scale: 2,
        stepY: 210,
      },
      _oButSettings: {
        x: 919,
        y: 72,
        stepY: 0.08,
        scale: 2.3,
      },
      _oButRules: {
        x: 770,
        y: 70,
        stepX: -250,
        stepY:0.08,
        visible: false,
        scale: 1.6,
      },
      _oButBack: {
        x: 83,
        y: 72,
        stepY: 0.08,
        scale: 2.3,
      },
      _oClearBetBut: {
        widthPercentage: 0.23,
        heightPercentage: 0.94,
        scale: 2,
      },
      _oCurDealerCardValueText: {
        x: -40,
        y: -500,
        scale: 2.6,
      },
      _oMoneyText: {
        x: 275,
        y: -290,
        scale: 2,
      },
      _oHitBut: {
        x: -350,
        y: 1427,
        scale: 2,
      },
      _oStandBut: {
        x: +350,
        y: 1427,
        scale: 2,
      },
      _oRebetBut: {
        widthPercentage: 0.5,
        heightPercentage:0.84,
        scale: 2,
      },
      _oDoubleBut: {
        x: -500,
        y: 190,
        scale: 2,
      },
      _oDealBut: {
        y: 190,
        scale: 2,
      },
      _oSplitBut: {
        x: +500,
        y: 190,
        scale: 2,
      },

      _aFichesPositions: [
        { x: 180, y: 1837 },
        { x: 330, y: 1837 },
        { x: 480, y: 1837 },
        { x: 630, y: 1837 },
        { x: 780, y: 1837 },
        { x: 930, y: 1837 },
      ],
      _aFiches: {
        scale: 2,
      },
    },
    // CSettingsPanel
    CSettingsPanel: {
      _oSettingsButBack: {
        stepY: 0.08,
        scale: 2.3,
      },
      _oSettingsButCross: {

        stepY:0.08,
        scale: 2.3,
      },
      _oSettingsTextLogo: {
        stepY: 0.08,
        scale: 2.2,
      },
      _oSettingsCasinoLogo: {
        stepY: 0.9,
        scale: 2.5,
      },
      _oThemeText: {
        x: 340,
        y: 332,
        width: 140,
        height: 22,
        fontSize: 22,
        scale: 3,
        stepY: -600,
      },
      _oLightText: {
        x: 530,
        y: 332,
        width: 140,
        height: 22,
        fontSize: 22,
        scale: 3,
        stepY:520,
      },
      _oThemeToggleButton: {
        x: 600,
        y: 339,
        scale: 1.9,
      },
      _oDarkText: {
        x: 670,
        y: 332,
        width: 140,
        height: 22,
        fontSize: 22,
        scale: 3,
      },
      _oMusicText: {
        x: 351,
        y: 402,
        width: 140,
        height: 22,
        fontSize: 22,
        scale: 3,
        stepY: -600,
      },
      _oMusicOnText: {
        x: 530,
        y: 410,
        width: 140,
        height: 140,
        fontSize: 22,
        scale: 3,
      },
      _oMusicOffText: {
        x: 670,
        y: 410,
        width: 140,
        height: 21,
        fontSize: 21,
        scale: 3,
      },
      _oMusicToggleButton: {
        x: 600,
        y: 409,
        scale: 1.9,
      },
    },
    // rules-panel
    rulesPanel: {
      bgSprite: {
        x: 960,
        y: 540,
        regX: 960,
        regY: 540,
        scale: 2,
        scaleY: 3,
      },
      gameLogo: {
        x: 480,
        y: 68,
        stepY: 0.08,
        scale: 2.2,
      },
      casinoLogo: {
        x: 480,
        y: 1607,
        stepY: 0.9,
        scale: 2.5,
      },
      buttonBack: {
        x: 166,
        y: 72,
        stepY: 0.08,
        scale: 2.3,
      },
      ruleText: {
        startX: 180,
        startY: 170,
        stepY: 20,
        scale: 1.1
      },
    },
    // CSeat
    CSeat:{
      _oArrowCurPlayer:{
        scale:2,   
        stepY: -200,
      },
      _oGroup:{
         stepX: 180,
         stepY: 500
        },
        currentBetText:{
          stepX: 0.14,
          stepY: 0.785,
          scale:2.6
        },
        _oCurSplitBetText:{
          stepX: 900,
          scale:2.6,
          stepY: 0,
        },
        _oCurCardValueText:{
          x: 50,
          scale:2.6
        },
        _oCurCardSplitValueText:{
          x: 400,
          scale:2.6
        },
        _oResultGreenDot:{
          stepX: -70,
          scale:2.6,
        },
        _oResultGreenDot2:{
          stepX: -70,
          scale:2.6,
        },       
        
        _oResultText_0:{
          stepX: 600,
          stepY:0,
          scale:2.6,
        },
        _oResultText_1:{
          stepX: 600,
          stepY:0,
          scale:2.6,
        },
        _oMainFichesController:{
          initX: 834,
          initY: 566
        },
        _oCardOffset:{
          x: -200,
          y: 450
        },
        _oSplitOffset: {
          x: 380,
          y: 250,
          stepY:450,
        },
  
        _oCurInsuaranceText:{
          stepX: 180,
          stepY: -100,
          scale: 2.6,
        },
        _oCurInsuaranceSplitText:{
          stepX: 250,
          stepY: -50,
          scale: 2.6,
        }
    },
    // CCard
    CCard :{
      _oCardSprite:{
        scale:2,
        stepX:-1000,
        stepY:-1900,
      },
      _oCardContainer:{
        scale:2
      }
    },
    // CMsgBox
    CMsgBox :{
      _oBg:{
        scale:2,
        stepX:1,
        stepY:1,
      }
    }, 
    // CGameOver 
    CGameOver:{
      oBg:{
        stepX:1,
        stepY:1,
        scale:2,
      },
      _oButRecharge:{
        scale: 2,
        stepX: 400,
        stepY: 400,
      },
      _oButExit:{
        scale: 2,
        stepX: -400,
        stepY: 400,
      },
      _oTextTitle:{
        scale: 2,
      },
    }, 
    // CInsurancePanel
    CInsurancePanel:{
      oBg:{
        stepX:1,
        stepY:1,
        scale:2,
      },
      _oButNo:{
        scale:2,
        stepX:350,
        stepY:400,
      },
      _oButYes:{
        scale:2,
        stepX:-350,
        stepY:400,
      },
      _oMsgText:{
        scale: 2,
      },
    },    
    
    // ipad mini
    "768*1024": {
      _oCurCardValueText: {
        y: -40
      },
      _oCurDealerCardValueText: {
        y: 15
      },
      _oSplitCurCardValueText: {
        y: -40
      },
      _oTextBelowLogo: {
        y: 0.79
      },
      _oMoneyText: {
        y: -10
      },
      _oPlayerCard: {
        y: 55
      }, 
      _oSplitPlayerCard: {
        y: 55
      }, 
      _oCurBetText: {
        y: 40
      },
      _oRebetBut: {
        y: 0.35,
        heightPercentage: 0.82
      }, 
      _oClearBetBut: {
        y: 15
      },
      _aFichesText: {
        y: 15
      }
    },

    // ipad air
    "820*1180": {
      _oMoneyText: {
        y: -10
      },
      _oPlayerCard: {
        y: 25
      }, 
      _oSplitPlayerCard: {
        y: 25
      }, 
      _oCurBetText: {
        y: 40
      },
      _oRebetBut: {
        y: 0.35,
        heightPercentage: 0.82
      }, 
      _oClearBetBut: {
        y: 15
      },
      _aFichesText: {
        y: 15
      }
    },
    // iphone 12 PRO
    "390*844": {
      _oMoneyText: {
        y: 10
      }
    },
    // iphone XR
    "414*896": {
      _oMoneyText: {
        y: 10
      }
    },
  },
};
