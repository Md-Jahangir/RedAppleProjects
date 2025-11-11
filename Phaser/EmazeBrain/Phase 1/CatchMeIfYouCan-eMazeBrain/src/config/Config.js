export default {

  isLocal: true,

  locale: 'en',

  sizes: {
    desktop: {
      total: {
        width: 2778,
        height: 2778
      },
      safe: {
        width: 1920,
        height: 1080
      }
    },
    mobilePortrait: {
      total: {
        width: 2778,
        height: 2778
      },
      safe: {
        width: 1650,
        height: 1200
      }
    },
    mobileLandscape: {
      total: {
        width: 2778,
        height: 2778
      },
      safe: {
        width: 1920,
        height: 1060
      }
    }
  },

  TO_FIXED_VALUES: 2,
  MIN_COUNTUP_WIN: 2,

  pattern:null,
  app:null,

  SYMBOL_ANIMATION_DURATION: 1633,

  LANDINGS: {
    "bonus" : "animation"
  },

  shouldAccelerate: false,

  symbolIndexes: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11"
  ],

  symbolsNames: {
    "1" : "wild",
    "2" : "missdee",
    "3" : "daniel",
    "4" : "stopwatch",
    "5" : "carrots",
    "6" : "hearts",
    "7" : "clubs",
    "8" : "spades",
    "9" : "diamonds",
    "10" : "bonus",
    "11" : "freespin",
    "11001" : "wild",
    "11002" : "missdee",
    "11003" : "daniel",
    "11004" : "stopwatch",
    "11005" : "carrots",
    "11006" : "hearts",
    "11007" : "clubs",
    "11008" : "spades",
    "11009" : "diamonds",
    "11010" : "bonus",
    "11011" : "freespin"
  },


  symbolAnimationNames: {
    "1" : "wild",
    "2" : "hi_missdee",
    "3" : "hi_daniel",
    "4" : "hi_stopwatch",
    "5" : "hi_carrots",
    "6" : "lo_hearts",
    "7" : "lo_clubs",
    "8" : "lo_spades",
    "9" : "lo_diamonds",
    "10" : "bonus",
    "11" : "freespin"
  },

  symbolsSpines: {
    "1" : "allSymbolsAnimations",
    "2" : "allSymbolsAnimations",
    "3" : "allSymbolsAnimations",
    "4" : "allSymbolsAnimations",
    "5" : "allSymbolsAnimations",
    "6" : "allSymbolsAnimations",
    "7" : "allSymbolsAnimations",
    "8" : "allSymbolsAnimations",
    "9" : "allSymbolsAnimations",
    "10" : "allSymbolsAnimations",
    "11" : "allSymbolsAnimations"
  },

  anticipationSymbols: [
    "11"
  ],

  allowReelsToAnticipate: [0, 0, 0, 0, 1], // 0: isnt allowed; 1: is allowed

  SPECIAL_WINS : [
    {
      name: "big",
      from:10,
      to:24,
      time: 5
    },
    {
      name: "mega",
      from:25,
      to:59,
      time: 15
    },
    {
      name: "super",
      from:60,
      to: 9999999999,
      time: 24
    }
  ],

  autoSingleWinValues: ['-', 'x3', 'x5', 'x10', 'x20', 'x50', 'x100'],
  autoIncreasesValues: ['-', 'x5', 'x10', 'x15', 'x20', 'x25', 'x50', 'x100'],
  autoDecreasesValues: ['-', 'x5', 'x10', 'x15', 'x20', 'x25', 'x50', 'x100'],
  setAutospinValues: [5, 10, 20, 50, 100, 500, 1000, -1],


  realitiCheckPopup: {
    "status": 911,
    "message": "Reality Check",
    "title": "Reality Check",
    "buttons": [
      {
        "text": "Continue",
        "action": "continue"
      },
      {
        "text": "Quit",
        "action": "lobby"
      }
    ]
  },

  winLine: {
    1: {
      name: 'line1',
      y: 0,
      animationName:1,
      flipped: false
    },
    2: {
      name: 'line1',
      y: -1,
      animationName:1,
      flipped: false
    },
    3: {
      name: 'line1',
      y: 1,
      animationName:1,
      flipped: false
    },
    4: {
      name: 'line4',
      y: 0,
      animationName:4,
      flipped: false
    },
    5: {
      name: 'line4',
      y: 3,
      animationName:4,
      flipped: true
    },
    6: {
      name: 'line6',
      y: 0,
      animationName:6,
      flipped: false
    },
    7: {
      name: 'line6',
      y: 3,
      animationName:6,
      flipped: true
    },
    8: {
      name: 'line6',
      y: 2,
      animationName:6,
      flipped: true
    },
    9: {
      name: 'line6',
      y: 1,
      animationName:6,
      flipped: false
    },
    10: {
      name: 'line10',
      y: 0,
      animationName:10,
      flipped: false
    },
    11: {
      name: 'line10',
      y: 3,
      animationName:10,
      flipped: true
    },
    12: {
      name: 'line10',
      y: 2,
      animationName:10,
      flipped: true
    },
    13: {
      name: 'line10',
      y: 1,
      animationName:10,
      flipped: false
    },
    14: {
      name: 'line14',
      y: 0,
      animationName:14,
      flipped: false
    },
    15: {
      name: 'line14',
      y: 3,
      animationName:14,
      flipped: true
    },
    16: {
      name: 'line14',
      y: 2,
      animationName:14,
      flipped: true
    },
    17: {
      name: 'line14',
      y: 1,
      animationName:14,
      flipped: false
    },
    18: {
      name: 'line18',
      y: 0,
      animationName:18,
      flipped: false
    },
    19: {
      name: 'line18',
      y: 3,
      animationName:18,
      flipped: true
    },
    20: {
      name: 'line20',
      y: 0,
      animationName:20,
      flipped: false
    }
  }

}



