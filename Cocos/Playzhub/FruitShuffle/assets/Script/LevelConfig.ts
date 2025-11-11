import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelConfig')
export class LevelConfig extends Component {
    stack = {
        NA: 0, // for single placement
        H: 1, // horizontal
        V: 2, // vertical
        Spider: 3, // spider shape
        spiral: 4, // spiral shape
        dynamicStack: 5,
        custom: 6
    }
    LevelData: Object = {
        "Level0": {
            totalNumberOfElements: 6,
            stackType: [0, 0, 0, 0, 0, 0],
            placingIndex: [32, 34, 36, 60, 62, 64]
        },
        "Level1": {
            totalNumberOfElements: 18,
            stackType: [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1],
            placingIndex: [31, 32, 33, 38, 38, 38, 45, 46, 47, 52, 52, 52, 59, 60, 61, 66, 66, 66]
        },
        "Level2": {
            totalNumberOfElements: 15,
            stackType: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            placingIndex: [32, 32, 32, 32, 32, 34, 34, 34, 34, 34, 36, 36, 36, 36, 36]
        },
        "Level3": {
            totalNumberOfElements: 24,
            staticPosIcon: [[new Vec3(-100, 0, 0), new Vec3(-50, 100, 0)], [new Vec3(-50, 60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 16,
                    typeOfStack: 2
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 25,
                    typeOfStack: 2
                },
                "2": {
                    numberOfPlacement: 4,
                    index: 35,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 75,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 79,
                    typeOfStack: 6,
                },
            }
        },
        "Level4": {
            totalNumberOfElements: 36,
            staticPosIcon: [[], [new Vec3(50, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 2,
                    index: 19,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 2,
                    index: 33,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 2,
                    index: 47,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "3": {
                    numberOfPlacement: 2,
                    index: 61,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "4": {
                    numberOfPlacement: 2,
                    index: 75,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "5": {
                    numberOfPlacement: 2,
                    index: 21,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 2,
                    index: 35,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 2,
                    index: 49,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 2,
                    index: 63,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 2,
                    index: 77,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 8,
                    index: 16,
                    typeOfStack: 2,
                },
                "11": {
                    numberOfPlacement: 8,
                    index: 24,
                    typeOfStack: 2,
                },
            }
        },
        "Level5": {
            totalNumberOfElements: 27,
            staticPosIcon: [[], [new Vec3(-50, -50, 0), new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 3,
                    index: 4,
                    typeOfStack: 6,
                },
                "1": {
                    numberOfPlacement: 3,
                    index: 6,
                    typeOfStack: 6,
                },
                "2": {
                    numberOfPlacement: 3,
                    index: 8,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 32,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 34,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 36,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 60,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 62,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 64,
                    typeOfStack: 6,
                },
            }
        },
        "Level6": {
            totalNumberOfElements: 45,
            staticPosIcon: [[new Vec3(100, 0, 0), new Vec3(150, 100, 0), new Vec3(100, 200, 0), new Vec3(0, 200, 0), new Vec3(-50, 100, 0), new Vec3(50, 100, 0)], []],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 73,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 25, 0),
                        new Vec3(100, 50, 0),
                        new Vec3(150, 75, 0),
                        new Vec3(200, 100, 0),
                        new Vec3(250, 125, 0)
                    ],
                },
                "1": {
                    numberOfPlacement: 8,
                    index: 16,
                    typeOfStack: 2
                },
                "2": {
                    numberOfPlacement: 7,
                    index: 46,
                    typeOfStack: 6
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 36,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 38,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 64,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 66,
                    typeOfStack: 3
                },
            }
        },
        "Level7": {
            totalNumberOfElements: 42,
            staticPosIcon: [[new Vec3(100, -100, 0)], [new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 12,
                    index: 46,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 12,
                    index: 50,
                    typeOfStack: 4,
                },
                "2": {
                    numberOfPlacement: 3,
                    index: 2,
                    typeOfStack: 6
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 15,
                    typeOfStack: 6
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 28,
                    typeOfStack: 6
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 79,
                    typeOfStack: 6
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 66,
                    typeOfStack: 6
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 53,
                    typeOfStack: 6
                },
            }
        },
        "Level8": {
            totalNumberOfElements: 36,
            staticPosIcon: [[new Vec3(-100, 0, 0), new Vec3(-50, 100, 0)], [new Vec3(-50, 60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 16,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(58.3, 50, 0),
                        new Vec3(116.6, 100, 0),
                        new Vec3(175, 100, 0),
                        new Vec3(233.2, 50, 0),
                        new Vec3(291.5, 0, 0),
                        new Vec3(350, -50, 0)
                    ],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 22,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(58.3, 50, 0),
                        new Vec3(116.6, 100, 0),
                        new Vec3(175, 100, 0),
                        new Vec3(233.2, 50, 0),
                        new Vec3(291.5, 0, 0),
                        new Vec3(350, -50, 0)
                    ],
                },
                "2": {
                    numberOfPlacement: 4,
                    index: 46,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 52,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 63,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 71,
                    typeOfStack: 3,
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 82,
                    typeOfStack: 3,
                },
            }
        },
        "Level9": {
            totalNumberOfElements: 48,
            staticPosIcon: [[], [new Vec3(50, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 2,
                    index: 16,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 2,
                    index: 30,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 2,
                    index: 44,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "3": {
                    numberOfPlacement: 2,
                    index: 58,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "4": {
                    numberOfPlacement: 2,
                    index: 72,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "5": {
                    numberOfPlacement: 2,
                    index: 18,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 2,
                    index: 32,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 2,
                    index: 46,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 2,
                    index: 60,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 2,
                    index: 74,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 5,
                    index: 21,
                    typeOfStack: 3,
                },
                "11": {
                    numberOfPlacement: 5,
                    index: 23,
                    typeOfStack: 3,
                },
                "12": {
                    numberOfPlacement: 5,
                    index: 25,
                    typeOfStack: 3,
                },
                "13": {
                    numberOfPlacement: 5,
                    index: 49,
                    typeOfStack: 3,
                },
                "14": {
                    numberOfPlacement: 5,
                    index: 53,
                    typeOfStack: 3,
                },
                "15": {
                    numberOfPlacement: 3,
                    index: 79,
                    typeOfStack: 3,
                },
            }
        },
        "Level10": {
            totalNumberOfElements: 42,
            staticPosIcon: [[], [new Vec3(50, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 24,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 50, 0),
                        new Vec3(43, 25, 0),
                        new Vec3(43, -25, 0),
                        new Vec3(0, -50, 0),
                        new Vec3(-43, -25, 0),
                        new Vec3(-43, 25, 0),
                    ]
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 52,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 50, 0),
                        new Vec3(43, 25, 0),
                        new Vec3(43, -25, 0),
                        new Vec3(0, -50, 0),
                        new Vec3(-43, -25, 0),
                        new Vec3(-43, 25, 0),
                    ]
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 80,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 50, 0),
                        new Vec3(43, 25, 0),
                        new Vec3(43, -25, 0),
                        new Vec3(0, -50, 0),
                        new Vec3(-43, -25, 0),
                        new Vec3(-43, 25, 0),
                    ]
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 17,
                    typeOfStack: 3,
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 20,
                    typeOfStack: 3,
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 59,
                    typeOfStack: 3,
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 62,
                    typeOfStack: 3,
                },
            }
        },
        "Level11": {
            totalNumberOfElements: 48,
            staticPosIcon: [[new Vec3(-100, 0, 0)], [new Vec3(-50, 50, 0), new Vec3(-50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 7,
                    index: 16,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 60, 0),
                        new Vec3(52, 30, 0),
                        new Vec3(52, -30, 0),
                        new Vec3(0, -60, 0),
                        new Vec3(-52, -30, 0),
                        new Vec3(-52, 30, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 7,
                    index: 58,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 60, 0),
                        new Vec3(52, 30, 0),
                        new Vec3(52, -30, 0),
                        new Vec3(0, -60, 0),
                        new Vec3(-52, -30, 0),
                        new Vec3(-52, 30, 0),
                    ],
                },
                "2": {
                    numberOfPlacement: 7,
                    index: 25,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 60, 0),
                        new Vec3(52, 30, 0),
                        new Vec3(52, -30, 0),
                        new Vec3(0, -60, 0),
                        new Vec3(-52, -30, 0),
                        new Vec3(-52, 30, 0),
                    ],
                },
                "3": {
                    numberOfPlacement: 7,
                    index: 67,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 60, 0),
                        new Vec3(52, 30, 0),
                        new Vec3(52, -30, 0),
                        new Vec3(0, -60, 0),
                        new Vec3(-52, -30, 0),
                        new Vec3(-52, 30, 0),
                    ],
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 20,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 22,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 48,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 4,
                    index: 50,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 4,
                    index: 77,
                    typeOfStack: 6,
                },
            }
        },
        "Level12": {
            totalNumberOfElements: 24,
            staticPosIcon: [[new Vec3(-100, 0, 0), new Vec3(-50, 100, 0)], [new Vec3(-50, 60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 33,
                    typeOfStack: 4,
                    positionArray: [new Vec3(10, -10, 0), new Vec3(20, -20, 0), new Vec3(30, -30, 0), new Vec3(40, -40, 0), new Vec3(50, -50, 0)],
                },
                "1": {
                    numberOfPlacement: 4,
                    index: 65,
                    typeOfStack: 6,
                },
                "2": {
                    numberOfPlacement: 4,
                    index: 63,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 61,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 35,
                    typeOfStack: 4,
                    positionArray: [new Vec3(10, -10, 0), new Vec3(20, -20, 0), new Vec3(30, -30, 0), new Vec3(40, -40, 0), new Vec3(50, -50, 0)],
                },
            }
        },
        "Level13": {
            totalNumberOfElements: 48,
            staticPosIcon: [[], [new Vec3(-50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 2,
                    index: 16,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 2,
                    index: 18,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 2,
                    index: 20,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "3": {
                    numberOfPlacement: 2,
                    index: 22,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "4": {
                    numberOfPlacement: 2,
                    index: 24,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "5": {
                    numberOfPlacement: 2,
                    index: 26,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "6": {
                    numberOfPlacement: 2,
                    index: 30,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 2,
                    index: 32,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 2,
                    index: 34,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 2,
                    index: 36,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 2,
                    index: 38,
                    typeOfStack: 6,
                },
                "11": {
                    numberOfPlacement: 2,
                    index: 40,
                    typeOfStack: 6,
                },
                "12": {
                    numberOfPlacement: 6,
                    index: 59,
                    typeOfStack: 3,
                },
                "13": {
                    numberOfPlacement: 6,
                    index: 61,
                    typeOfStack: 3,
                },
                "14": {
                    numberOfPlacement: 6,
                    index: 64,
                    typeOfStack: 3,
                },
                "15": {
                    numberOfPlacement: 6,
                    index: 66,
                    typeOfStack: 3,
                },
            }
        },
        "Level14": {
            totalNumberOfElements: 42,
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 17,
                    typeOfStack: 3
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 24,
                    typeOfStack: 3
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 47,
                    typeOfStack: 3
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 50,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 73,
                    typeOfStack: 1
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 77,
                    typeOfStack: 1
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 81,
                    typeOfStack: 1
                }
            }
        },
        "Level15": {
            totalNumberOfElements: 42,
            staticPosIcon: [[new Vec3(-100, 0, 0)], [new Vec3(-50, 50, 0), new Vec3(-50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 12,
                    index: 48,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 5,
                    index: 17,
                    typeOfStack: 3,
                },
                "2": {
                    numberOfPlacement: 5,
                    index: 45,
                    typeOfStack: 3,
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 73,
                    typeOfStack: 3,
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 23,
                    typeOfStack: 3,
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 51,
                    typeOfStack: 3,
                },
                "6": {
                    numberOfPlacement: 5,
                    index: 79,
                    typeOfStack: 3,
                },
            }
        },
        "Level16": {
            totalNumberOfElements: 45,
            staticPosIcon: [[new Vec3(-100, 0, 0)], [new Vec3(-50, 50, 0), new Vec3(-50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 20,
                    index: 62,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0), new Vec3(120, -60, 0), new Vec3(120, 0, 0), new Vec3(120, 60, 0), new Vec3(120, 120, 0), new Vec3(60, 120, 0), new Vec3(0, 120, 0), new Vec3(-60, 120, 0), new Vec3(-120, 120, 0), new Vec3(-120, 60, 0), new Vec3(-120, 0, 0), new Vec3(-120, -60, 0)],
                },
                "1": {
                    numberOfPlacement: 5,
                    index: 31,
                    typeOfStack: 3
                },
                "2": {
                    numberOfPlacement: 5,
                    index: 59,
                    typeOfStack: 3
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 37,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 65,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 20,
                    typeOfStack: 3
                },
            }
        },
        "Level17": {
            totalNumberOfElements: 60,
            placingConfig: {
                "0": {
                    numberOfPlacement: 5,
                    index: 17,
                    typeOfStack: 3
                },
                "1": {
                    numberOfPlacement: 5,
                    index: 19,
                    typeOfStack: 3
                },
                "2": {
                    numberOfPlacement: 5,
                    index: 21,
                    typeOfStack: 3
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 23,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 45,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 47,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 5,
                    index: 49,
                    typeOfStack: 3
                },
                "7": {
                    numberOfPlacement: 5,
                    index: 51,
                    typeOfStack: 3
                },
                "8": {
                    numberOfPlacement: 5,
                    index: 73,
                    typeOfStack: 3
                },
                "9": {
                    numberOfPlacement: 5,
                    index: 75,
                    typeOfStack: 3
                },
                "10": {
                    numberOfPlacement: 5,
                    index: 77,
                    typeOfStack: 3
                },
                "11": {
                    numberOfPlacement: 5,
                    index: 79,
                    typeOfStack: 3
                },
            }
        },
        "Level18": {
            totalNumberOfElements: 30,
            staticPosIcon: [[new Vec3(-200, 150, 0),
            new Vec3(-100, 150, 0),
            new Vec3(100, 150, 0),
            new Vec3(200, 150, 0),
            new Vec3(200, 45, 0),
            new Vec3(200, -60, 0),
            new Vec3(200, -165, 0),
            new Vec3(100, -165, 0),
            new Vec3(-100, -165, 0),
            new Vec3(-200, -165, 0),
            new Vec3(-200, -60, 0),
            new Vec3(-200, 45, 0),
            new Vec3(0, 150, 0),
            new Vec3(0, -165, 0)], [new Vec3(-150, 100, 0), // Top edge
            new Vec3(-50, 100, 0),
            new Vec3(50, 100, 0),
            new Vec3(150, 100, 0),    // Right edge
            new Vec3(150, 0, 0),
            new Vec3(150, -100, 0),  // Bottom edge
            new Vec3(50, -100, 0),
            new Vec3(-50, -100, 0),
            new Vec3(-150, -100, 0),  // Left edge
            new Vec3(-150, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 25,
                    index: 34,
                    typeOfStack: 5
                },
                "1": {
                    numberOfPlacement: 5,
                    index: 76,
                    typeOfStack: 3
                },
            }
        },
        "Level19": {
            totalNumberOfElements: 45,
            staticPosIcon: [[new Vec3(-100, 50, 0)], [new Vec3(-50, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 48,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-75, 75, 0),   // Top-left curve
                        new Vec3(-150, 0, 0),   // Left curve
                        new Vec3(-75, -75, 0),  // Bottom-left curve
                        new Vec3(0, -150, 0),   // Bottom point
                        new Vec3(75, -75, 0),   // Bottom-right curve
                        new Vec3(150, 0, 0),    // Right curve
                        new Vec3(75, 75, 0),    // Top-right curve
                        new Vec3(0, 150, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 3,
                    index: 24,
                    typeOfStack: 6,
                },
                "2": {
                    numberOfPlacement: 3,
                    index: 26,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 52,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 54,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 80,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 82,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 9,
                    index: 15,
                    typeOfStack: 2,
                },
                "8": {
                    numberOfPlacement: 9,
                    index: 17,
                    typeOfStack: 2,
                },
            }
        },
        "Level20": {
            totalNumberOfElements: 42,
            staticPosIcon: [[new Vec3(50, 100, 0)], [new Vec3(50, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 59,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 62,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 65,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 30,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 32,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 34,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 36,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 38,
                    typeOfStack: 6,
                },
            }
        },
        "Level21": {
            totalNumberOfElements: 27,
            staticPosIcon: [[new Vec3(100, 0, 0), new Vec3(100, -100, 0), new Vec3(0, -100, 0)], [new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 19,
                    typeOfStack: 4,
                    positionArray: [new Vec3(10, 20, 0), new Vec3(20, 30, 0), new Vec3(30, 40, 0), new Vec3(40, 50, 0), new Vec3(50, 60, 0)],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 22,
                    typeOfStack: 4,
                    positionArray: [new Vec3(-30, -30, 0), new Vec3(-75, -75, 0), new Vec3(-135, -90, 0), new Vec3(-205, -75, 0), new Vec3(-285, -60, 0)],
                },
                "2": {
                    numberOfPlacement: 5,
                    index: 33,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 35,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 62,
                    typeOfStack: 6,
                },
            }
        },
        "Level22": {
            totalNumberOfElements: 72,
            staticPosIcon: [[new Vec3(-100, 0, 0), new Vec3(-50, 100, 0)], [new Vec3(-50, 60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 12,
                    index: 25,
                    typeOfStack: 4,
                    positionArray: [ // Shape 2 (Scaled Down)
                        new Vec3(0, 60, 0),
                        new Vec3(20, 20, 0),
                        new Vec3(60, 20, 0),
                        new Vec3(30, 0, 0),
                        new Vec3(40, -40, 0),
                        new Vec3(0, -20, 0),
                        new Vec3(-40, -40, 0),
                        new Vec3(-30, 0, 0),
                        new Vec3(-60, 20, 0),
                        new Vec3(-20, 20, 0),
                        new Vec3(20, 20, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 12,
                    index: 67,
                    typeOfStack: 4,
                    positionArray: [ // Shape 2 (Scaled Down)
                        new Vec3(0, 60, 0),
                        new Vec3(20, 20, 0),
                        new Vec3(60, 20, 0),
                        new Vec3(30, 0, 0),
                        new Vec3(40, -40, 0),
                        new Vec3(0, -20, 0),
                        new Vec3(-40, -40, 0),
                        new Vec3(-30, 0, 0),
                        new Vec3(-60, 20, 0),
                        new Vec3(-20, 20, 0),
                        new Vec3(20, 20, 0),
                    ],
                },
                "2": {
                    numberOfPlacement: 5,
                    index: 17,
                    typeOfStack: 3
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 19,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 21,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 45,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 5,
                    index: 47,
                    typeOfStack: 3
                },
                "7": {
                    numberOfPlacement: 5,
                    index: 49,
                    typeOfStack: 3
                },
                "8": {
                    numberOfPlacement: 6,
                    index: 77,
                    typeOfStack: 1
                },
                "9": {
                    numberOfPlacement: 6,
                    index: 75,
                    typeOfStack: 1
                },
                "10": {
                    numberOfPlacement: 6,
                    index: 73,
                    typeOfStack: 1
                },
            }
        },
        "Level23": {
            totalNumberOfElements: 30,
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 30,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                        new Vec3(40, -300, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 32,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                        new Vec3(40, -300, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 34,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                        new Vec3(40, -300, 0)
                    ]
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 36,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                        new Vec3(40, -300, 0)
                    ]
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 38,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                        new Vec3(40, -300, 0)
                    ]
                },
            }
        },
        "Level24": {
            totalNumberOfElements: 36,
            staticPosIcon: [[new Vec3(0, 100, 0)], [new Vec3(60, 50, 0), new Vec3(-60, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 2,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                        new Vec3(40, -300, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 11,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                        new Vec3(40, -300, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 4,
                    index: 47,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 50,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 72,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 75,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 78,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 4,
                    index: 81,
                    typeOfStack: 6,
                },
            }
        },
        "Level25": {
            totalNumberOfElements: 66,
            staticPosIcon: [[new Vec3(-100, 0, 0), new Vec3(-50, 100, 0)], [new Vec3(-50, 60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 12,
                    index: 58,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),    // Top
                        new Vec3(30, 30, 0),   // Top-right
                        new Vec3(90, 30, 0),   // Right
                        new Vec3(45, 0, 0),    // Inner-right
                        new Vec3(60, -60, 0),  // Bottom-right
                        new Vec3(0, -30, 0),   // Bottom-inner
                        new Vec3(-60, -60, 0), // Bottom-left
                        new Vec3(-45, 0, 0),   // Inner-left
                        new Vec3(-90, 30, 0),  // Left
                        new Vec3(-30, 30, 0),
                        new Vec3(30, 30, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 12,
                    index: 67,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),    // Top
                        new Vec3(30, 30, 0),   // Top-right
                        new Vec3(90, 30, 0),   // Right
                        new Vec3(45, 0, 0),    // Inner-right
                        new Vec3(60, -60, 0),  // Bottom-right
                        new Vec3(0, -30, 0),   // Bottom-inner
                        new Vec3(-60, -60, 0), // Bottom-left
                        new Vec3(-45, 0, 0),   // Inner-left
                        new Vec3(-90, 30, 0),  // Left
                        new Vec3(-30, 30, 0),
                        new Vec3(30, 30, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 4,
                    index: 30,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 32,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 34,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 36,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 38,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 4,
                    index: 40,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 9,
                    index: 61,
                    typeOfStack: 1,
                },
                "9": {
                    numberOfPlacement: 9,
                    index: 65,
                    typeOfStack: 1,
                },
            }
        },
        "Level26": {
            totalNumberOfElements: 42,
            staticPosIcon: [[new Vec3(100, 0, 0)], [new Vec3(50, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 34,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 62,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 31,
                    typeOfStack: 2
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 32,
                    typeOfStack: 2
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 36,
                    typeOfStack: 2
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 37,
                    typeOfStack: 2
                },
            }
        },
        "Level27": {
            totalNumberOfElements: 42,
            staticPosIcon: [[new Vec3(100, 0, 0)], [new Vec3(50, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 48,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 76,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 17,
                    typeOfStack: 3
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 19,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 21,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 23,
                    typeOfStack: 3
                },
            }
        },
        "Level28": {
            totalNumberOfElements: 48,
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 3,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                    ]
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 5,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                    ]
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 7,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                    ]
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 9,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                    ]
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 59,
                    typeOfStack: 3,
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 61,
                    typeOfStack: 3,
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 63,
                    typeOfStack: 3,
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 65,
                    typeOfStack: 3,
                },
            }
        },
        "Level29": {
            totalNumberOfElements: 42,
            staticPosIcon: [[new Vec3(0, 100, 0)], [new Vec3(60, 50, 0), new Vec3(-60, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 16,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 20, 0),
                        new Vec3(100, 0, 0),
                        new Vec3(150, -20, 0),
                        new Vec3(200, 0, 0),
                        new Vec3(250, 40, 0),
                        new Vec3(300, -40, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 44,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 20, 0),
                        new Vec3(100, 0, 0),
                        new Vec3(150, -20, 0),
                        new Vec3(200, 0, 0),
                        new Vec3(250, 40, 0),
                        new Vec3(300, -40, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 72,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 20, 0),
                        new Vec3(100, 0, 0),
                        new Vec3(150, -20, 0),
                        new Vec3(200, 0, 0),
                        new Vec3(250, 40, 0),
                        new Vec3(300, -40, 0)
                    ]
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 22,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 50,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 78,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 25,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 4,
                    index: 53,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 4,
                    index: 81,
                    typeOfStack: 6,
                },
            }
        },
        "Level30": {
            totalNumberOfElements: 51,
            staticPosIcon: [[new Vec3(-100, 0, 0)], [new Vec3(-60, 60, 0), new Vec3(-60, -60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 59,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 62,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 65,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 18,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 20,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 22,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 24,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 8,
                    index: 15,
                    typeOfStack: 2,
                },
            }
        },
        "Level31": {
            totalNumberOfElements: 51,
            staticPosIcon: [[new Vec3(100, 0, 0)], [new Vec3(50, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 19,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 22,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 72,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "3": {
                    numberOfPlacement: 9,
                    index: 81,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 44,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 46,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 48,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 50,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 52,
                    typeOfStack: 6,
                },
            }
        },
        "Level32": {
            totalNumberOfElements: 48,
            staticPosIcon: [[new Vec3(100, 0, 0), new Vec3(0, -100, 0), new Vec3(100, -100, 0)], [new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 10,
                    index: 2,
                    typeOfStack: 2
                },
                "1": {
                    numberOfPlacement: 10,
                    index: 11,
                    typeOfStack: 2
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 18,
                    typeOfStack: 2
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 20,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 9,
                    index: 23,
                    typeOfStack: 2
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 62,
                    typeOfStack: 6,
                },
            }
        },
        "Level33": {
            totalNumberOfElements: 54,
            placingConfig: {
                "0": {
                    numberOfPlacement: 3,
                    index: 18,
                    typeOfStack: 3
                },
                "1": {
                    numberOfPlacement: 3,
                    index: 20,
                    typeOfStack: 3
                },
                "2": {
                    numberOfPlacement: 3,
                    index: 22,
                    typeOfStack: 3
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 24,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 60,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 26,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 5,
                    index: 62,
                    typeOfStack: 3
                },
                "7": {
                    numberOfPlacement: 5,
                    index: 64,
                    typeOfStack: 3
                },
                "8": {
                    numberOfPlacement: 5,
                    index: 66,
                    typeOfStack: 3
                },
                "9": {
                    numberOfPlacement: 5,
                    index: 68,
                    typeOfStack: 3
                },
                "10": {
                    numberOfPlacement: 5,
                    index: 28,
                    typeOfStack: 2
                },
                "11": {
                    numberOfPlacement: 9,
                    index: 16,
                    typeOfStack: 2
                },
            }
        },
        "Level34": {
            totalNumberOfElements: 66,
            staticPosIcon: [[new Vec3(-100, 50, 0)], [new Vec3(-50, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 16,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 20, 0),
                        new Vec3(30, -40, 0),
                        new Vec3(-30, -40, 0),
                        new Vec3(-50, 20, 0),
                        new Vec3(0, 60, 0)],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 19,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 20, 0),
                        new Vec3(30, -40, 0),
                        new Vec3(-30, -40, 0),
                        new Vec3(-50, 20, 0),
                        new Vec3(0, 60, 0)],
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 22,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 20, 0),
                        new Vec3(30, -40, 0),
                        new Vec3(-30, -40, 0),
                        new Vec3(-50, 20, 0),
                        new Vec3(0, 60, 0)],
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 25,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 20, 0),
                        new Vec3(30, -40, 0),
                        new Vec3(-30, -40, 0),
                        new Vec3(-50, 20, 0),
                        new Vec3(0, 60, 0)],
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 50,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 52,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 54,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 78,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 80,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 82,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 6,
                    index: 44,
                    typeOfStack: 3,
                },
                "11": {
                    numberOfPlacement: 6,
                    index: 47,
                    typeOfStack: 3,
                },
                "12": {
                    numberOfPlacement: 6,
                    index: 72,
                    typeOfStack: 3,
                },
                "13": {
                    numberOfPlacement: 6,
                    index: 75,
                    typeOfStack: 3,
                },
            }
        },
        "Level35": {
            totalNumberOfElements: 54,
            staticPosIcon: [[new Vec3(0, 100, 0)], [new Vec3(60, 50, 0), new Vec3(-60, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 25,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),   // Top-left curve
                        new Vec3(-100, 0, 0),   // Left curve
                        new Vec3(-50, -50, 0),  // Bottom-left curve
                        new Vec3(0, -100, 0),   // Bottom point
                        new Vec3(50, -50, 0),   // Bottom-right curve
                        new Vec3(100, 0, 0),    // Right curve
                        new Vec3(50, 50, 0),    // Top-right curve
                        new Vec3(0, 100, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 67,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),   // Top-left curve
                        new Vec3(-100, 0, 0),   // Left curve
                        new Vec3(-50, -50, 0),  // Bottom-left curve
                        new Vec3(0, -100, 0),   // Bottom point
                        new Vec3(50, -50, 0),   // Bottom-right curve
                        new Vec3(100, 0, 0),    // Right curve
                        new Vec3(50, 50, 0),    // Top-right curve
                        new Vec3(0, 100, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 4,
                    index: 16,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 19,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 22,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 44,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 47,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 4,
                    index: 50,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 4,
                    index: 72,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 4,
                    index: 75,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 4,
                    index: 78,
                    typeOfStack: 6,
                },
            }
        },
        "Level36": {
            totalNumberOfElements: 60,
            staticPosIcon: [[new Vec3(100, 0, 0)], [new Vec3(50, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 12,
                    index: 59,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),    // Top
                        new Vec3(30, 30, 0),   // Top-right
                        new Vec3(90, 30, 0),   // Right
                        new Vec3(45, 0, 0),    // Inner-right
                        new Vec3(60, -60, 0),  // Bottom-right
                        new Vec3(0, -30, 0),   // Bottom-inner
                        new Vec3(-60, -60, 0), // Bottom-left
                        new Vec3(-45, 0, 0),   // Inner-left
                        new Vec3(-90, 30, 0),  // Left
                        new Vec3(-30, 30, 0),   // Top-left
                        new Vec3(-30, 30, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 12,
                    index: 62,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),    // Top
                        new Vec3(30, 30, 0),   // Top-right
                        new Vec3(90, 30, 0),   // Right
                        new Vec3(45, 0, 0),    // Inner-right
                        new Vec3(60, -60, 0),  // Bottom-right
                        new Vec3(0, -30, 0),   // Bottom-inner
                        new Vec3(-60, -60, 0), // Bottom-left
                        new Vec3(-45, 0, 0),   // Inner-left
                        new Vec3(-90, 30, 0),  // Left
                        new Vec3(-30, 30, 0),   // Top-left
                        new Vec3(-30, 30, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 12,
                    index: 65,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),    // Top
                        new Vec3(30, 30, 0),   // Top-right
                        new Vec3(90, 30, 0),   // Right
                        new Vec3(45, 0, 0),    // Inner-right
                        new Vec3(60, -60, 0),  // Bottom-right
                        new Vec3(0, -30, 0),   // Bottom-inner
                        new Vec3(-60, -60, 0), // Bottom-left
                        new Vec3(-45, 0, 0),   // Inner-left
                        new Vec3(-90, 30, 0),  // Left
                        new Vec3(-30, 30, 0),   // Top-left
                        new Vec3(-30, 30, 0)
                    ]
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 16,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 18,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 21,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 23,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 30,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 32,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 35,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 37,
                    typeOfStack: 6,
                },
            }
        },
        "Level37": {
            totalNumberOfElements: 48,
            staticPosIcon: [[
                new Vec3(100, 0, 0),
                new Vec3(50, 86.6, 0),
                new Vec3(-50, 86.6, 0),
                new Vec3(-100, 0, 0),
                new Vec3(-50, -86.6, 0),
                new Vec3(50, -86.6, 0),
            ], [new Vec3(160, 0, 0),
            new Vec3(140, 100, 0),
            new Vec3(50, 180, 0),
            new Vec3(-50, 180, 0),
            new Vec3(-140, 100, 0),
            new Vec3(-160, 0, 0),
            new Vec3(-140, -100, 0),
            new Vec3(-50, -180, 0),
            new Vec3(50, -180, 0),
            new Vec3(140, -100, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 17,
                    index: 48,
                    typeOfStack: 5,
                },
                "1": {
                    numberOfPlacement: 10,
                    index: 25,
                    typeOfStack: 1
                },
                "2": {
                    numberOfPlacement: 10,
                    index: 53,
                    typeOfStack: 1
                },
                "3": {
                    numberOfPlacement: 11,
                    index: 81,
                    typeOfStack: 1
                },
            }
        },
        "Level38": {
            totalNumberOfElements: 42,
            staticPosIcon: [[new Vec3(100, 0, 0)], [new Vec3(50, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 3,
                    index: 6,
                    typeOfStack: 6
                },
                "1": {
                    numberOfPlacement: 3,
                    index: 20,
                    typeOfStack: 6
                },
                "2": {
                    numberOfPlacement: 3,
                    index: 34,
                    typeOfStack: 6
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 48,
                    typeOfStack: 6
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 62,
                    typeOfStack: 6
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 76,
                    typeOfStack: 6
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 30,
                    typeOfStack: 6
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 32,
                    typeOfStack: 6
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 44,
                    typeOfStack: 6
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 46,
                    typeOfStack: 6
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 36,
                    typeOfStack: 6
                },
                "11": {
                    numberOfPlacement: 3,
                    index: 50,
                    typeOfStack: 6
                },
                "12": {
                    numberOfPlacement: 3,
                    index: 38,
                    typeOfStack: 6
                },
                "13": {
                    numberOfPlacement: 3,
                    index: 52,
                    typeOfStack: 6
                },
            }
        },
        "Level39": {
            totalNumberOfElements: 48,
            staticPosIcon: [[new Vec3(0, 100, 0)], [new Vec3(60, 50, 0), new Vec3(-60, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 33,
                    typeOfStack: 4,
                    positionArray: [new Vec3(10, 20, 0), new Vec3(20, 30, 0), new Vec3(30, 40, 0), new Vec3(40, 50, 0), new Vec3(50, 60, 0)],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 36,
                    typeOfStack: 4,
                    positionArray: [new Vec3(-30, -30, 0), new Vec3(-75, -75, 0), new Vec3(-135, -90, 0), new Vec3(-205, -75, 0), new Vec3(-285, -60, 0)],
                },
                "2": {
                    numberOfPlacement: 4,
                    index: 61,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 64,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 7,
                    index: 29,
                    typeOfStack: 2,
                },
                "5": {
                    numberOfPlacement: 7,
                    index: 31,
                    typeOfStack: 2,
                },
                "6": {
                    numberOfPlacement: 7,
                    index: 38,
                    typeOfStack: 2,
                },
                "7": {
                    numberOfPlacement: 7,
                    index: 40,
                    typeOfStack: 2,
                },
            }
        },
        "Level40": {
            totalNumberOfElements: 63,
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 17,
                    typeOfStack: 3
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 20,
                    typeOfStack: 3
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 45,
                    typeOfStack: 3
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 48,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 73,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 76,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 9,
                    index: 24,
                    typeOfStack: 1
                },
                "7": {
                    numberOfPlacement: 9,
                    index: 52,
                    typeOfStack: 1
                },
                "8": {
                    numberOfPlacement: 9,
                    index: 80,
                    typeOfStack: 1
                }
            }
        },
        "Level41": {
            totalNumberOfElements: 33,
            staticPosIcon: [[new Vec3(100, -100, 0)], [new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 23,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 60,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 3,
                    index: 18,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 66,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 50,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 2,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 34,
                    typeOfStack: 6,
                },
            }
        },
        "Level42": {
            totalNumberOfElements: 87,
            placingConfig: {
                "0": {
                    numberOfPlacement: 11,
                    index: 3,
                    typeOfStack: 2
                },
                "1": {
                    numberOfPlacement: 11,
                    index: 5,
                    typeOfStack: 2
                },
                "2": {
                    numberOfPlacement: 11,
                    index: 7,
                    typeOfStack: 2
                },
                "3": {
                    numberOfPlacement: 9,
                    index: 11,
                    typeOfStack: 1
                },
                "4": {
                    numberOfPlacement: 9,
                    index: 25,
                    typeOfStack: 1
                },
                "5": {
                    numberOfPlacement: 9,
                    index: 39,
                    typeOfStack: 1
                },
                "6": {
                    numberOfPlacement: 9,
                    index: 53,
                    typeOfStack: 1
                },
                "7": {
                    numberOfPlacement: 9,
                    index: 67,
                    typeOfStack: 1
                },
                "8": {
                    numberOfPlacement: 9,
                    index: 81,
                    typeOfStack: 1
                }
            }
        },
        "Level43": {
            totalNumberOfElements: 48,
            staticPosIcon: [[new Vec3(-100, 0, 0), new Vec3(-50, 100, 0)], [new Vec3(-50, 60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 4,
                    index: 82,
                    typeOfStack: 6,
                },
                "1": {
                    numberOfPlacement: 4,
                    index: 80,
                    typeOfStack: 6,
                },
                "2": {
                    numberOfPlacement: 4,
                    index: 78,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 76,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 74,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 72,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 3,
                    typeOfStack: 2
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 5,
                    typeOfStack: 2
                },
                "8": {
                    numberOfPlacement: 6,
                    index: 8,
                    typeOfStack: 2
                },
                "9": {
                    numberOfPlacement: 6,
                    index: 10,
                    typeOfStack: 2
                },
            }
        },
        "Level44": {
            totalNumberOfElements: 54,
            staticPosIcon: [
                [new Vec3(0, -100, 0)],
                [new Vec3(0, -50, 0)]
            ],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 2,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 0, 0),
                        new Vec3(50, -50, 0),
                        new Vec3(50, -100, 0),
                        new Vec3(50, -150, 0),
                        new Vec3(50, -200, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 4,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 0, 0),
                        new Vec3(50, -50, 0),
                        new Vec3(50, -100, 0),
                        new Vec3(50, -150, 0),
                        new Vec3(50, -200, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 6,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 0, 0),
                        new Vec3(50, -50, 0),
                        new Vec3(50, -100, 0),
                        new Vec3(50, -150, 0),
                        new Vec3(50, -200, 0)
                    ]
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 8,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 0, 0),
                        new Vec3(50, -50, 0),
                        new Vec3(50, -100, 0),
                        new Vec3(50, -150, 0),
                        new Vec3(50, -200, 0)
                    ]
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 10,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 0, 0),
                        new Vec3(50, -50, 0),
                        new Vec3(50, -100, 0),
                        new Vec3(50, -150, 0),
                        new Vec3(50, -200, 0)
                    ]
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 45,
                    typeOfStack: 6
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 46,
                    typeOfStack: 5
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 47,
                    typeOfStack: 6
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 48,
                    typeOfStack: 5
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 49,
                    typeOfStack: 6
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 50,
                    typeOfStack: 5
                },
                "11": {
                    numberOfPlacement: 3,
                    index: 51,
                    typeOfStack: 6
                },
                "12": {
                    numberOfPlacement: 3,
                    index: 52,
                    typeOfStack: 5
                },
            }
        },
        "Level45": {
            totalNumberOfElements: 54,
            placingConfig: {
                "0": {
                    numberOfPlacement: 20,
                    index: 36,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0), new Vec3(120, -60, 0), new Vec3(120, 0, 0), new Vec3(120, 60, 0), new Vec3(120, 120, 0), new Vec3(60, 120, 0), new Vec3(0, 120, 0), new Vec3(-60, 120, 0), new Vec3(-120, 120, 0), new Vec3(-120, 60, 0), new Vec3(-120, 0, 0), new Vec3(-120, -60, 0)],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 3,
                    typeOfStack: 2
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 5,
                    typeOfStack: 2
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 59,
                    typeOfStack: 2
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 61,
                    typeOfStack: 2
                },
                "5": {
                    numberOfPlacement: 1,
                    index: 63,
                    typeOfStack: 0
                },
                "6": {
                    numberOfPlacement: 1,
                    index: 64,
                    typeOfStack: 0
                },
                "7": {
                    numberOfPlacement: 1,
                    index: 65,
                    typeOfStack: 0
                },
                "8": {
                    numberOfPlacement: 1,
                    index: 77,
                    typeOfStack: 0
                },
                "9": {
                    numberOfPlacement: 1,
                    index: 78,
                    typeOfStack: 0
                },
                "10": {
                    numberOfPlacement: 1,
                    index: 79,
                    typeOfStack: 0
                },
                "11": {
                    numberOfPlacement: 1,
                    index: 91,
                    typeOfStack: 0
                },
                "12": {
                    numberOfPlacement: 1,
                    index: 92,
                    typeOfStack: 0
                },
                "13": {
                    numberOfPlacement: 1,
                    index: 93,
                    typeOfStack: 0
                },
                "14": {
                    numberOfPlacement: 1,
                    index: 7,
                    typeOfStack: 0
                },
                "15": {
                    numberOfPlacement: 1,
                    index: 8,
                    typeOfStack: 0
                },
                "16": {
                    numberOfPlacement: 1,
                    index: 9,
                    typeOfStack: 0
                }
            }
        },
        "Level46": {
            totalNumberOfElements: 87,
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 17,
                    typeOfStack: 3
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 19,
                    typeOfStack: 3
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 21,
                    typeOfStack: 3
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 45,
                    typeOfStack: 2
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 47,
                    typeOfStack: 2
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 49,
                    typeOfStack: 2
                },
                "6": {
                    numberOfPlacement: 9,
                    index: 11,
                    typeOfStack: 1
                },
                "7": {
                    numberOfPlacement: 9,
                    index: 25,
                    typeOfStack: 1
                },
                "8": {
                    numberOfPlacement: 9,
                    index: 39,
                    typeOfStack: 1
                },
                "9": {
                    numberOfPlacement: 9,
                    index: 53,
                    typeOfStack: 1
                },
                "10": {
                    numberOfPlacement: 9,
                    index: 67,
                    typeOfStack: 1
                },
                "11": {
                    numberOfPlacement: 9,
                    index: 81,
                    typeOfStack: 1
                }
            }
        },
        "Level47": {
            totalNumberOfElements: 60,
            staticPosIcon: [[new Vec3(100, -100, 0)], [new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 30,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 33,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 36,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "3": {
                    numberOfPlacement: 9,
                    index: 39,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 58,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 61,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 64,
                    typeOfStack: 3
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 67,
                    typeOfStack: 3
                },
            }
        },
        "Level48": {
            totalNumberOfElements: 114,
            placingConfig: {
                "0": {
                    numberOfPlacement: 20,
                    index: 18,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0), new Vec3(120, -60, 0), new Vec3(120, 0, 0), new Vec3(120, 60, 0), new Vec3(120, 120, 0), new Vec3(60, 120, 0), new Vec3(0, 120, 0), new Vec3(-60, 120, 0), new Vec3(-120, 120, 0), new Vec3(-120, 60, 0), new Vec3(-120, 0, 0), new Vec3(-120, -60, 0)],
                },
                "1": {
                    numberOfPlacement: 20,
                    index: 22,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0), new Vec3(120, -60, 0), new Vec3(120, 0, 0), new Vec3(120, 60, 0), new Vec3(120, 120, 0), new Vec3(60, 120, 0), new Vec3(0, 120, 0), new Vec3(-60, 120, 0), new Vec3(-120, 120, 0), new Vec3(-120, 60, 0), new Vec3(-120, 0, 0), new Vec3(-120, -60, 0)],
                },
                "2": {
                    numberOfPlacement: 5,
                    index: 45,
                    typeOfStack: 2
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 47,
                    typeOfStack: 2
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 49,
                    typeOfStack: 2
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 51,
                    typeOfStack: 2
                },
                "6": {
                    numberOfPlacement: 9,
                    index: 11,
                    typeOfStack: 1
                },
                "7": {
                    numberOfPlacement: 9,
                    index: 25,
                    typeOfStack: 1
                },
                "8": {
                    numberOfPlacement: 9,
                    index: 39,
                    typeOfStack: 1
                },
                "9": {
                    numberOfPlacement: 9,
                    index: 53,
                    typeOfStack: 1
                },
                "10": {
                    numberOfPlacement: 9,
                    index: 67,
                    typeOfStack: 1
                },
                "11": {
                    numberOfPlacement: 9,
                    index: 81,
                    typeOfStack: 1
                }
            }
        },
        "Level49": {
            totalNumberOfElements: 99,
            staticPosIcon: [[new Vec3(-300, 0, 0), new Vec3(-200, 0, 0), new Vec3(-100, 0, 0), new Vec3(1, 0, 0), new Vec3(100, 0, 0), new Vec3(200, 0, 0), new Vec3(300, 0, 0)], [new Vec3(-250, 0, 0), new Vec3(-150, 0, 0), new Vec3(-50, 0, 0), new Vec3(50, 0, 0), new Vec3(150, 0, 0), new Vec3(250, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 14,
                    index: 19,
                    typeOfStack: 5
                },
                "1": {
                    numberOfPlacement: 14,
                    index: 47,
                    typeOfStack: 5
                },
                "2": {
                    numberOfPlacement: 14,
                    index: 75,
                    typeOfStack: 5
                },
                "3": {
                    numberOfPlacement: 12,
                    index: 25,
                    typeOfStack: 1
                },
                "4": {
                    numberOfPlacement: 12,
                    index: 39,
                    typeOfStack: 1
                },
                "5": {
                    numberOfPlacement: 11,
                    index: 53,
                    typeOfStack: 1
                },
                "6": {
                    numberOfPlacement: 11,
                    index: 67,
                    typeOfStack: 1
                },
                "7": {
                    numberOfPlacement: 11,
                    index: 81,
                    typeOfStack: 1
                },
            }
        },
        "Level50": {
            totalNumberOfElements: 72,
            placingConfig: {
                "0": {
                    numberOfPlacement: 20,
                    index: 80,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0), new Vec3(120, -60, 0), new Vec3(120, 0, 0), new Vec3(120, 60, 0), new Vec3(120, 120, 0), new Vec3(60, 120, 0), new Vec3(0, 120, 0), new Vec3(-60, 120, 0), new Vec3(-120, 120, 0), new Vec3(-120, 60, 0), new Vec3(-120, 0, 0), new Vec3(-120, -60, 0)],
                },
                "1": {
                    numberOfPlacement: 3,
                    index: 17,
                    typeOfStack: 3
                },
                "2": {
                    numberOfPlacement: 3,
                    index: 31,
                    typeOfStack: 3
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 45,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 59,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 73,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 5,
                    index: 19,
                    typeOfStack: 3
                },
                "7": {
                    numberOfPlacement: 5,
                    index: 47,
                    typeOfStack: 3
                },
                "8": {
                    numberOfPlacement: 5,
                    index: 75,
                    typeOfStack: 3
                },
                "9": {
                    numberOfPlacement: 5,
                    index: 23,
                    typeOfStack: 1
                },
                "10": {
                    numberOfPlacement: 5,
                    index: 37,
                    typeOfStack: 1
                },
                "11": {
                    numberOfPlacement: 5,
                    index: 25,
                    typeOfStack: 1
                },
                "12": {
                    numberOfPlacement: 5,
                    index: 39,
                    typeOfStack: 1
                },
            }
        },
        "Level51": {
            totalNumberOfElements: 72,
            staticPosIcon: [[new Vec3(100, 0, 0)], [new Vec3(50, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 19,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 22,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 61,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "3": {
                    numberOfPlacement: 9,
                    index: 64,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 1,
                    typeOfStack: 6
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 15,
                    typeOfStack: 6
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 29,
                    typeOfStack: 6
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 43,
                    typeOfStack: 6
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 57,
                    typeOfStack: 6
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 71,
                    typeOfStack: 6
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 11,
                    typeOfStack: 6
                },
                "11": {
                    numberOfPlacement: 3,
                    index: 25,
                    typeOfStack: 6
                },
                "12": {
                    numberOfPlacement: 3,
                    index: 39,
                    typeOfStack: 6
                },
                "13": {
                    numberOfPlacement: 3,
                    index: 53,
                    typeOfStack: 6
                },
                "14": {
                    numberOfPlacement: 3,
                    index: 67,
                    typeOfStack: 6
                },
                "15": {
                    numberOfPlacement: 3,
                    index: 81,
                    typeOfStack: 6
                },
            }
        },
        "Level52": {
            totalNumberOfElements: 54,
            staticPosIcon: [[
                new Vec3(100, 60, 0),
                new Vec3(200, 120, 0),
                new Vec3(300, 60, 0),
                new Vec3(400, 0, 0),
                new Vec3(500, -60, 0),
                new Vec3(600, -120, 0),
                new Vec3(700, -120, 0),
                new Vec3(800, -60, 0),
                new Vec3(900, 0, 0),
                new Vec3(1000, 60, 0),
                new Vec3(1100, 120, 0),
                new Vec3(1200, 60, 0),
                new Vec3(1300, 0, 0),
            ], [
                new Vec3(1, 60, 0),
                new Vec3(100, 120, 0),
                new Vec3(200, 180, 0),
                new Vec3(300, 120, 0),
                new Vec3(400, 60, 0),
                new Vec3(500, 0, 0),
                new Vec3(600, -60, 0),
                new Vec3(700, -60, 0),
                new Vec3(800, 0, 0),
                new Vec3(900, 60, 0),
                new Vec3(1000, 120, 0),
                new Vec3(1100, 180, 0),
                new Vec3(1200, 120, 0),
                new Vec3(1300, 60, 0),
            ]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 58,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 67,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 28,
                    index: 28,
                    typeOfStack: 5,
                },
                "3": {
                    numberOfPlacement: 8,
                    index: 77,
                    typeOfStack: 1,
                },
            }
        },
        "Level53": {
            totalNumberOfElements: 108,
            staticPosIcon: [[new Vec3(100, 0, 0)], [new Vec3(50, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 23,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 3,
                    index: 0,
                    typeOfStack: 6,
                },
                "2": {
                    numberOfPlacement: 3,
                    index: 14,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 28,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 42,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 56,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 70,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 16,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 30,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 44,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 58,
                    typeOfStack: 6,
                },
                "11": {
                    numberOfPlacement: 3,
                    index: 72,
                    typeOfStack: 6,
                },
                "12": {
                    numberOfPlacement: 3,
                    index: 32,
                    typeOfStack: 6,
                },
                "13": {
                    numberOfPlacement: 3,
                    index: 46,
                    typeOfStack: 6,
                },
                "14": {
                    numberOfPlacement: 3,
                    index: 60,
                    typeOfStack: 6,
                },
                "15": {
                    numberOfPlacement: 3,
                    index: 74,
                    typeOfStack: 6,
                },
                "16": {
                    numberOfPlacement: 3,
                    index: 48,
                    typeOfStack: 6,
                },
                "17": {
                    numberOfPlacement: 3,
                    index: 62,
                    typeOfStack: 6,
                },
                "18": {
                    numberOfPlacement: 3,
                    index: 76,
                    typeOfStack: 6,
                },
                "19": {
                    numberOfPlacement: 3,
                    index: 64,
                    typeOfStack: 6,
                },
                "20": {
                    numberOfPlacement: 3,
                    index: 78,
                    typeOfStack: 6,
                },
                "21": {
                    numberOfPlacement: 3,
                    index: 80,
                    typeOfStack: 6,
                },
                "22": {
                    numberOfPlacement: 6,
                    index: 13,
                    typeOfStack: 1,
                },
                "23": {
                    numberOfPlacement: 6,
                    index: 27,
                    typeOfStack: 1,
                },
                "24": {
                    numberOfPlacement: 6,
                    index: 41,
                    typeOfStack: 1,
                },
                "25": {
                    numberOfPlacement: 6,
                    index: 55,
                    typeOfStack: 1,
                },
                "26": {
                    numberOfPlacement: 6,
                    index: 69,
                    typeOfStack: 1,
                },
                "27": {
                    numberOfPlacement: 6,
                    index: 83,
                    typeOfStack: 1,
                },
            }
        },
        "Level54": {
            totalNumberOfElements: 30,
            staticPosIcon: [[new Vec3(100, 0, 0), new Vec3(0, -100, 0), new Vec3(100, -100, 0)], [new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 5,
                    index: 18,
                    typeOfStack: 6,
                },
                "1": {
                    numberOfPlacement: 5,
                    index: 20,
                    typeOfStack: 6,
                },
                "2": {
                    numberOfPlacement: 5,
                    index: 22,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 2,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 10,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 48,
                    typeOfStack: 6,
                },
            }
        },
        "Level55": {
            totalNumberOfElements: 63,
            staticPosIcon: [[
                new Vec3(300, 0, 0),
                new Vec3(285.3, 92.7, 0),
                new Vec3(242.7, 176.4, 0),
                new Vec3(176.4, 242.7, 0),
                new Vec3(92.7, 285.3, 0),
                new Vec3(0, 300, 0),
                new Vec3(-92.7, 285.3, 0),
                new Vec3(-176.4, 242.7, 0),
                new Vec3(-242.7, 176.4, 0),
                new Vec3(-285.3, 92.7, 0),
                new Vec3(-300, 0, 0),
                new Vec3(-285.3, -92.7, 0),
                new Vec3(-242.7, -176.4, 0),
                new Vec3(-176.4, -242.7, 0),
                new Vec3(-92.7, -285.3, 0),
                new Vec3(0, -300, 0),
                new Vec3(92.7, -285.3, 0),
                new Vec3(176.4, -242.7, 0),
                new Vec3(242.7, -176.4, 0),
                new Vec3(285.3, -92.7, 0)
            ], [new Vec3(-250, 0, 0), new Vec3(-150, 0, 0), new Vec3(-50, 0, 0), new Vec3(50, 0, 0), new Vec3(150, 0, 0), new Vec3(250, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 27,
                    index: 46,
                    typeOfStack: 5
                },
                "1": {
                    numberOfPlacement: 10,
                    index: 24,
                    typeOfStack: 1
                },
                "2": {
                    numberOfPlacement: 10,
                    index: 55,
                    typeOfStack: 1
                },
                "3": {
                    numberOfPlacement: 10,
                    index: 80,
                    typeOfStack: 1
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 52,
                    typeOfStack: 3
                },
            }
        },
        "Level56": {
            totalNumberOfElements: 78,
            staticPosIcon: [[new Vec3(-100, 0, 0)], [new Vec3(-60, 60, 0), new Vec3(-60, -60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 4,
                    index: 16,
                    typeOfStack: 6,
                },
                "1": {
                    numberOfPlacement: 4,
                    index: 44,
                    typeOfStack: 6,
                },
                "2": {
                    numberOfPlacement: 4,
                    index: 72,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 18,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 46,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 74,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 20,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 4,
                    index: 48,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 4,
                    index: 76,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 4,
                    index: 22,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 4,
                    index: 50,
                    typeOfStack: 6,
                },
                "11": {
                    numberOfPlacement: 4,
                    index: 78,
                    typeOfStack: 6,
                },
                "12": {
                    numberOfPlacement: 10,
                    index: 25,
                    typeOfStack: 1
                },
                "13": {
                    numberOfPlacement: 10,
                    index: 53,
                    typeOfStack: 1
                },
                "14": {
                    numberOfPlacement: 10,
                    index: 81,
                    typeOfStack: 1
                }
            }
        },
        "Level57": {
            totalNumberOfElements: 63,
            staticPosIcon: [[new Vec3(-100, 0, 0)], [new Vec3(-60, 60, 0), new Vec3(-60, -60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 25,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 53,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 81,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 16,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 44,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 72,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 19,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 4,
                    index: 47,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 4,
                    index: 75,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 4,
                    index: 22,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 4,
                    index: 50,
                    typeOfStack: 6,
                },
                "11": {
                    numberOfPlacement: 4,
                    index: 78,
                    typeOfStack: 6,
                },
            }
        },
        "Level58": {
            totalNumberOfElements: 87,
            staticPosIcon: [[new Vec3(100, 0, 0)], [new Vec3(50, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 15,
                    index: 71,
                    typeOfStack: 4,
                    positionArray: [new Vec3(5, 30, 0), new Vec3(10, 60, 0), new Vec3(15, 90, 0), new Vec3(20, 120, 0), new Vec3(25, 150, 0), new Vec3(30, 180, 0), new Vec3(35, 210, 0), new Vec3(40, 240, 0), new Vec3(50, 280, 0), new Vec3(60, 320, 0), new Vec3(75, 360, 0), new Vec3(90, 400, 0), new Vec3(105, 450, 0), new Vec3(125, 500, 0)],
                },
                "1": {
                    numberOfPlacement: 15,
                    index: 73,
                    typeOfStack: 4,
                    positionArray: [new Vec3(5, 30, 0), new Vec3(10, 60, 0), new Vec3(15, 90, 0), new Vec3(20, 120, 0), new Vec3(25, 150, 0), new Vec3(30, 180, 0), new Vec3(35, 210, 0), new Vec3(40, 240, 0), new Vec3(50, 280, 0), new Vec3(60, 320, 0), new Vec3(75, 360, 0), new Vec3(90, 400, 0), new Vec3(105, 450, 0), new Vec3(125, 500, 0)],
                },
                "2": {
                    numberOfPlacement: 3,
                    index: 75,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 77,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 79,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 81,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 62,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 64,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 66,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 49,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 51,
                    typeOfStack: 6,
                },
                "11": {
                    numberOfPlacement: 3,
                    index: 36,
                    typeOfStack: 6,
                },
                "12": {
                    numberOfPlacement: 9,
                    index: 7,
                    typeOfStack: 1,
                },
                "13": {
                    numberOfPlacement: 9,
                    index: 9,
                    typeOfStack: 1,
                },
                "14": {
                    numberOfPlacement: 9,
                    index: 11,
                    typeOfStack: 1,
                },
            }
        },
        "Level59": {
            totalNumberOfElements: 99,
            staticPosIcon: [[new Vec3(100, -100, 0)], [new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 44,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 47,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 50,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 1,
                    typeOfStack: 6
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 3,
                    typeOfStack: 6
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 5,
                    typeOfStack: 6
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 7,
                    typeOfStack: 6
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 9,
                    typeOfStack: 6
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 11,
                    typeOfStack: 6
                },
                "9": {
                    numberOfPlacement: 9,
                    index: 40,
                    typeOfStack: 1
                },
                "10": {
                    numberOfPlacement: 9,
                    index: 54,
                    typeOfStack: 1
                },
                "11": {
                    numberOfPlacement: 9,
                    index: 68,
                    typeOfStack: 1
                },
                "12": {
                    numberOfPlacement: 9,
                    index: 82,
                    typeOfStack: 1
                },
                "13": {
                    numberOfPlacement: 6,
                    index: 72,
                    typeOfStack: 3
                },
                "14": {
                    numberOfPlacement: 6,
                    index: 75,
                    typeOfStack: 3
                },
                "15": {
                    numberOfPlacement: 6,
                    index: 78,
                    typeOfStack: 3
                },
            }
        },
        "Level60": {
            totalNumberOfElements: 102,
            staticPosIcon: [[
                new Vec3(100, 0, 0),
                new Vec3(50, 86.6, 0),
                new Vec3(-50, 86.6, 0),
                new Vec3(-100, 0, 0),
                new Vec3(-50, -86.6, 0),
                new Vec3(50, -86.6, 0),
            ], [new Vec3(160, 0, 0),
            new Vec3(140, 100, 0),
            new Vec3(50, 180, 0),
            new Vec3(-50, 180, 0),
            new Vec3(-140, 100, 0),
            new Vec3(-160, 0, 0),
            new Vec3(-140, -100, 0),
            new Vec3(-50, -180, 0),
            new Vec3(50, -180, 0),
            new Vec3(140, -100, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 17,
                    index: 48,
                    typeOfStack: 5,
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 16,
                    typeOfStack: 3,
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 44,
                    typeOfStack: 3
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 72,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 24,
                    typeOfStack: 3,
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 52,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 80,
                    typeOfStack: 3
                },
                "7": {
                    numberOfPlacement: 10,
                    index: 27,
                    typeOfStack: 1
                },
                "8": {
                    numberOfPlacement: 10,
                    index: 41,
                    typeOfStack: 1
                },
                "9": {
                    numberOfPlacement: 10,
                    index: 55,
                    typeOfStack: 1
                },
                "10": {
                    numberOfPlacement: 10,
                    index: 69,
                    typeOfStack: 1
                },
                "11": {
                    numberOfPlacement: 9,
                    index: 83,
                    typeOfStack: 1
                },
            }
        },
        "Level61": {
            totalNumberOfElements: 72,
            staticPosIcon: [[
                new Vec3(-100, -100, 0),          // Bottom-left corner
                new Vec3(0, -100, 0),          // Midpoint of bottom side
                new Vec3(100, -100, 0),          // Bottom-right corner
                new Vec3(100, 0, 0),         // Midpoint of right side
                new Vec3(100, 100, 0),        // Top-right corner
                new Vec3(0, 100, 0),        // Midpoint of top side
                new Vec3(-100, 100, 0),        // Top-left corners
                new Vec3(-100, 0, 0)], [new Vec3(-50, 0, 0), new Vec3(50, 0, 0),]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 11,
                    index: 17,
                    typeOfStack: 5
                },
                "1": {
                    numberOfPlacement: 11,
                    index: 24,
                    typeOfStack: 5
                },
                "2": {
                    numberOfPlacement: 11,
                    index: 73,
                    typeOfStack: 5
                },
                "3": {
                    numberOfPlacement: 11,
                    index: 80,
                    typeOfStack: 5
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 33,
                    typeOfStack: 2
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 34,
                    typeOfStack: 2
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 35,
                    typeOfStack: 2
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 36,
                    typeOfStack: 2
                },
                "8": {
                    numberOfPlacement: 1,
                    index: 89,
                    typeOfStack: 1
                },
                "9": {
                    numberOfPlacement: 1,
                    index: 90,
                    typeOfStack: 1
                },
                "10": {
                    numberOfPlacement: 1,
                    index: 91,
                    typeOfStack: 1
                },
                "11": {
                    numberOfPlacement: 1,
                    index: 92,
                    typeOfStack: 1
                }
            }
        },
        "Level62": {
            totalNumberOfElements: 90,
            staticPosIcon: [[new Vec3(-200, 150, 0),
            new Vec3(-100, 150, 0),
            new Vec3(100, 150, 0),
            new Vec3(200, 150, 0),
            new Vec3(200, 45, 0),
            new Vec3(200, -60, 0),
            new Vec3(200, -165, 0),
            new Vec3(100, -165, 0),
            new Vec3(-100, -165, 0),
            new Vec3(-200, -165, 0),
            new Vec3(-200, -60, 0),
            new Vec3(-200, 45, 0),
            new Vec3(0, 150, 0),
            new Vec3(0, -165, 0)], []],
            placingConfig: {
                "0": {
                    numberOfPlacement: 15,
                    index: 31,
                    typeOfStack: 5
                },
                "1": {
                    numberOfPlacement: 15,
                    index: 38,
                    typeOfStack: 5
                },
                "2": {
                    numberOfPlacement: 19,
                    index: 73,
                    typeOfStack: 1
                },
                "3": {
                    numberOfPlacement: 19,
                    index: 82,
                    typeOfStack: 1
                },
                "4": {
                    numberOfPlacement: 11,
                    index: 75,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 11,
                    index: 78,
                    typeOfStack: 3
                },
            }
        },
        "Level63": {
            totalNumberOfElements: 78,
            staticPosIcon: [[new Vec3(-200, 150, 0),
            new Vec3(-100, 150, 0),
            new Vec3(100, 150, 0),
            new Vec3(200, 150, 0),
            new Vec3(200, 45, 0),
            new Vec3(200, -60, 0),
            new Vec3(200, -165, 0),
            new Vec3(100, -165, 0),
            new Vec3(-100, -165, 0),
            new Vec3(-200, -165, 0),
            new Vec3(-200, -60, 0),
            new Vec3(-200, 45, 0),
            new Vec3(0, 150, 0),
            new Vec3(0, -165, 0)], [new Vec3(-150, 100, 0), // Top edge
            new Vec3(-50, 100, 0),
            new Vec3(50, 100, 0),
            new Vec3(150, 100, 0),    // Right edge
            new Vec3(150, 0, 0),
            new Vec3(150, -100, 0),  // Bottom edge
            new Vec3(50, -100, 0),
            new Vec3(-50, -100, 0),
            new Vec3(-150, -100, 0),  // Left edge
            new Vec3(-150, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 16,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 44,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 24,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "3": {
                    numberOfPlacement: 9,
                    index: 52,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "4": {
                    numberOfPlacement: 25,
                    index: 34,
                    typeOfStack: 5
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 72,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 5,
                    index: 76,
                    typeOfStack: 3
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 80,
                    typeOfStack: 3
                },
            }
        },
        "Level64": {
            totalNumberOfElements: 102,
            staticPosIcon: [[new Vec3(100, 0, 0)], [new Vec3(50, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 48,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 76,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 15,
                    typeOfStack: 3
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 17,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 19,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 21,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 23,
                    typeOfStack: 3
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 25,
                    typeOfStack: 3
                },
                "8": {
                    numberOfPlacement: 6,
                    index: 43,
                    typeOfStack: 3
                },
                "9": {
                    numberOfPlacement: 6,
                    index: 71,
                    typeOfStack: 3
                },
                "10": {
                    numberOfPlacement: 6,
                    index: 53,
                    typeOfStack: 3
                },
                "11": {
                    numberOfPlacement: 6,
                    index: 81,
                    typeOfStack: 3
                },
                "12": {
                    numberOfPlacement: 6,
                    index: 45,
                    typeOfStack: 2
                },
                "13": {
                    numberOfPlacement: 6,
                    index: 46,
                    typeOfStack: 2
                },
                "14": {
                    numberOfPlacement: 6,
                    index: 50,
                    typeOfStack: 2
                },
                "15": {
                    numberOfPlacement: 6,
                    index: 51,
                    typeOfStack: 2
                },
            }
        },
        "Level65": {
            totalNumberOfElements: 84,
            staticPosIcon: [[new Vec3(-300, 0, 0), new Vec3(-200, 0, 0), new Vec3(-100, 0, 0), new Vec3(1, 0, 0), new Vec3(100, 0, 0), new Vec3(200, 0, 0), new Vec3(300, 0, 0)], [new Vec3(-250, 0, 0), new Vec3(-150, 0, 0), new Vec3(-50, 0, 0), new Vec3(50, 0, 0), new Vec3(150, 0, 0), new Vec3(250, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 44,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 47,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 50,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "3": {
                    numberOfPlacement: 9,
                    index: 53,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 15,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 18,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 21,
                    typeOfStack: 3
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 24,
                    typeOfStack: 3
                },
                "8": {
                    numberOfPlacement: 6,
                    index: 71,
                    typeOfStack: 3
                },
                "9": {
                    numberOfPlacement: 6,
                    index: 74,
                    typeOfStack: 3
                },
                "10": {
                    numberOfPlacement: 6,
                    index: 77,
                    typeOfStack: 3
                },
                "11": {
                    numberOfPlacement: 6,
                    index: 80,
                    typeOfStack: 3
                },
            }
        },
        "Level66": {
            totalNumberOfElements: 111,
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 24,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 52,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 80,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 15,
                    typeOfStack: 2
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 44,
                    typeOfStack: 2
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 17,
                    typeOfStack: 2
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 19,
                    typeOfStack: 3
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 21,
                    typeOfStack: 3
                },
                "8": {
                    numberOfPlacement: 6,
                    index: 47,
                    typeOfStack: 3
                },
                "9": {
                    numberOfPlacement: 6,
                    index: 49,
                    typeOfStack: 3
                },
                "10": {
                    numberOfPlacement: 6,
                    index: 75,
                    typeOfStack: 3
                },
                "11": {
                    numberOfPlacement: 6,
                    index: 77,
                    typeOfStack: 3
                },
                "12": {
                    numberOfPlacement: 10,
                    index: 27,
                    typeOfStack: 1
                },
                "13": {
                    numberOfPlacement: 10,
                    index: 55,
                    typeOfStack: 1
                },
                "14": {
                    numberOfPlacement: 10,
                    index: 83,
                    typeOfStack: 1
                },
            }
        },
        "Level67": {
            totalNumberOfElements: 90,
            staticPosIcon: [[new Vec3(0, 100, 0)], [new Vec3(60, 50, 0), new Vec3(-60, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 33,
                    typeOfStack: 4,
                    positionArray: [new Vec3(10, 20, 0), new Vec3(20, 30, 0), new Vec3(30, 40, 0), new Vec3(40, 50, 0), new Vec3(50, 60, 0)],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 36,
                    typeOfStack: 4,
                    positionArray: [new Vec3(-30, -30, 0), new Vec3(-75, -75, 0), new Vec3(-135, -90, 0), new Vec3(-205, -75, 0), new Vec3(-285, -60, 0)],
                },
                "2": {
                    numberOfPlacement: 4,
                    index: 61,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 64,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 86,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 89,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 92,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 4,
                    index: 95,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 6,
                    index: 29,
                    typeOfStack: 2,
                },
                "9": {
                    numberOfPlacement: 6,
                    index: 31,
                    typeOfStack: 2,
                },
                "10": {
                    numberOfPlacement: 6,
                    index: 38,
                    typeOfStack: 2,
                },
                "11": {
                    numberOfPlacement: 6,
                    index: 40,
                    typeOfStack: 2,
                },
                "12": {
                    numberOfPlacement: 13,
                    index: 3,
                    typeOfStack: 1,
                },
                "13": {
                    numberOfPlacement: 13,
                    index: 12,
                    typeOfStack: 1,
                },
                "14": {
                    numberOfPlacement: 4,
                    index: 21,
                    typeOfStack: 6,
                },
            }
        },
        "Level68": {
            totalNumberOfElements: 138,
            placingConfig: {
                "0": {
                    numberOfPlacement: 13,
                    index: 87,
                    typeOfStack: 4,
                    positionArray: [new Vec3(50, 0, 0), new Vec3(100, 0, 0), new Vec3(150, 0, 0), new Vec3(200, 0, 0), new Vec3(250, 0, 0), new Vec3(300, 0, 0), new Vec3(350, 0, 0), new Vec3(400, 0, 0), new Vec3(450, 0, 0), new Vec3(500, 0, 0), new Vec3(550, 0, 0), new Vec3(600, 0, 0), new Vec3(650, 0, 0)],
                },
                "1": {
                    numberOfPlacement: 13,
                    index: 3,
                    typeOfStack: 4,
                    positionArray: [new Vec3(-50, 0, 0), new Vec3(-100, 0, 0), new Vec3(-150, 0, 0), new Vec3(-200, 0, 0), new Vec3(-250, 0, 0), new Vec3(-300, 0, 0), new Vec3(-350, 0, 0), new Vec3(-400, 0, 0), new Vec3(-450, 0, 0), new Vec3(-500, 0, 0), new Vec3(-550, 0, 0), new Vec3(-600, 0, 0), new Vec3(-650, 0, 0)],
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 23,
                    typeOfStack: 2
                },
                "3": {
                    numberOfPlacement: 9,
                    index: 17,
                    typeOfStack: 2
                },
                "4": {
                    numberOfPlacement: 10,
                    index: 11,
                    typeOfStack: 1
                },
                "5": {
                    numberOfPlacement: 10,
                    index: 25,
                    typeOfStack: 1
                },
                "6": {
                    numberOfPlacement: 10,
                    index: 39,
                    typeOfStack: 1
                },
                "7": {
                    numberOfPlacement: 10,
                    index: 53,
                    typeOfStack: 1
                },
                "8": {
                    numberOfPlacement: 10,
                    index: 67,
                    typeOfStack: 1
                },
                "9": {
                    numberOfPlacement: 10,
                    index: 81,
                    typeOfStack: 1
                },
                "10": {
                    numberOfPlacement: 10,
                    index: 95,
                    typeOfStack: 1
                },
                "11": {
                    numberOfPlacement: 6,
                    index: 33,
                    typeOfStack: 3
                },
                "12": {
                    numberOfPlacement: 6,
                    index: 35,
                    typeOfStack: 3
                },
                "13": {
                    numberOfPlacement: 6,
                    index: 61,
                    typeOfStack: 3
                },
                "14": {
                    numberOfPlacement: 6,
                    index: 63,
                    typeOfStack: 3
                },
            }
        },
        "Level69": {
            totalNumberOfElements: 126,
            staticPosIcon: [[new Vec3(-100, 0, 0), new Vec3(-50, 100, 0)], [new Vec3(-50, 60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 58,
                    typeOfStack: 4,
                    positionArray: [new Vec3(10, -10, 0), new Vec3(20, -20, 0), new Vec3(30, -30, 0), new Vec3(40, -40, 0), new Vec3(50, -50, 0)],
                },
                "1": {
                    numberOfPlacement: 4,
                    index: 96,
                    typeOfStack: 6,
                },
                "2": {
                    numberOfPlacement: 4,
                    index: 94,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 92,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 90,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 88,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 86,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 60,
                    typeOfStack: 4,
                    positionArray: [new Vec3(10, -10, 0), new Vec3(20, -20, 0), new Vec3(30, -30, 0), new Vec3(40, -40, 0), new Vec3(50, -50, 0)],
                },
                "8": {
                    numberOfPlacement: 6,
                    index: 62,
                    typeOfStack: 4,
                    positionArray: [new Vec3(10, -10, 0), new Vec3(20, -20, 0), new Vec3(30, -30, 0), new Vec3(40, -40, 0), new Vec3(50, -50, 0)],
                },
                "9": {
                    numberOfPlacement: 6,
                    index: 64,
                    typeOfStack: 4,
                    positionArray: [new Vec3(10, -10, 0), new Vec3(20, -20, 0), new Vec3(30, -30, 0), new Vec3(40, -40, 0), new Vec3(50, -50, 0)],
                },
                "10": {
                    numberOfPlacement: 6,
                    index: 66,
                    typeOfStack: 4,
                    positionArray: [new Vec3(10, -10, 0), new Vec3(20, -20, 0), new Vec3(30, -30, 0), new Vec3(40, -40, 0), new Vec3(50, -50, 0)],
                },
                "11": {
                    numberOfPlacement: 6,
                    index: 16,
                    typeOfStack: 3,
                },
                "12": {
                    numberOfPlacement: 6,
                    index: 18,
                    typeOfStack: 3,
                },
                "13": {
                    numberOfPlacement: 6,
                    index: 20,
                    typeOfStack: 3,
                },
                "14": {
                    numberOfPlacement: 6,
                    index: 22,
                    typeOfStack: 3,
                },
                "15": {
                    numberOfPlacement: 6,
                    index: 24,
                    typeOfStack: 3,
                },
                "16": {
                    numberOfPlacement: 21,
                    index: 46,
                    typeOfStack: 1,
                },
                "17": {
                    numberOfPlacement: 21,
                    index: 52,
                    typeOfStack: 1,
                },
            }
        },
        "Level70": {
            totalNumberOfElements: 69,
            staticPosIcon: [[new Vec3(100, 0, 0), new Vec3(0, -100, 0), new Vec3(100, -100, 0)], [new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 5,
                    index: 18,
                    typeOfStack: 6,
                },
                "1": {
                    numberOfPlacement: 5,
                    index: 20,
                    typeOfStack: 6,
                },
                "2": {
                    numberOfPlacement: 5,
                    index: 22,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 2,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 10,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 48,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 5,
                    index: 76,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 10,
                    index: 30,
                    typeOfStack: 2
                },
                "8": {
                    numberOfPlacement: 10,
                    index: 39,
                    typeOfStack: 2
                },
                "9": {
                    numberOfPlacement: 7,
                    index: 46,
                    typeOfStack: 2
                },
                "10": {
                    numberOfPlacement: 7,
                    index: 51,
                    typeOfStack: 2
                },
            }
        },
        "Level71": {
            totalNumberOfElements: 72,
            staticPosIcon: [[new Vec3(100, 0, 0), new Vec3(100, -100, 0), new Vec3(0, -100, 0)], [new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 19,
                    typeOfStack: 4,
                    positionArray: [new Vec3(10, 20, 0), new Vec3(20, 30, 0), new Vec3(30, 40, 0), new Vec3(40, 50, 0), new Vec3(50, 60, 0)],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 22,
                    typeOfStack: 4,
                    positionArray: [new Vec3(-30, -30, 0), new Vec3(-75, -75, 0), new Vec3(-135, -90, 0), new Vec3(-205, -75, 0), new Vec3(-285, -60, 0)],
                },
                "2": {
                    numberOfPlacement: 5,
                    index: 33,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 35,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 62,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 9,
                    index: 26,
                    typeOfStack: 1
                },
                "6": {
                    numberOfPlacement: 9,
                    index: 54,
                    typeOfStack: 1
                },
                "7": {
                    numberOfPlacement: 9,
                    index: 82,
                    typeOfStack: 1
                },
                "8": {
                    numberOfPlacement: 9,
                    index: 15,
                    typeOfStack: 2
                },
                "9": {
                    numberOfPlacement: 9,
                    index: 17,
                    typeOfStack: 2
                },
            }
        },
        "Level72": {
            totalNumberOfElements: 84,
            staticPosIcon: [[new Vec3(-100, 50, 0)], [new Vec3(-50, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 12,
                    index: 16,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 12,
                    index: 19,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "2": {
                    numberOfPlacement: 12,
                    index: 22,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "3": {
                    numberOfPlacement: 12,
                    index: 25,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 44,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 46,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 48,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 50,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 52,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 54,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 72,
                    typeOfStack: 6,
                },
                "11": {
                    numberOfPlacement: 3,
                    index: 74,
                    typeOfStack: 6,
                },
                "12": {
                    numberOfPlacement: 3,
                    index: 76,
                    typeOfStack: 6,
                },
                "13": {
                    numberOfPlacement: 3,
                    index: 78,
                    typeOfStack: 6,
                },
                "14": {
                    numberOfPlacement: 3,
                    index: 80,
                    typeOfStack: 6,
                },
                "15": {
                    numberOfPlacement: 3,
                    index: 82,
                    typeOfStack: 6,
                },
            }
        },
        "Level73": {
            totalNumberOfElements: 60,
            staticPosIcon: [[new Vec3(-100, 0, 0), new Vec3(-50, 100, 0)], [new Vec3(-50, 60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 12,
                    index: 16,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 12,
                    index: 48,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "2": {
                    numberOfPlacement: 12,
                    index: 81,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 37,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 39,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 41,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 70,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 4,
                    index: 72,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 4,
                    index: 74,
                    typeOfStack: 6,
                },
            }
        },
        "Level74": {
            totalNumberOfElements: 30,
            staticPosIcon: [[new Vec3(-100, 0, 0), new Vec3(-50, 100, 0)], [new Vec3(-50, 60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 16,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(25, -50, 0),
                        new Vec3(50, -100, 0),
                        new Vec3(100, -100, 0),
                        new Vec3(150, -50, 0),
                        new Vec3(200, 0, 0),
                        new Vec3(200, 50, 0)
                    ],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 19,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(25, -50, 0),
                        new Vec3(50, -100, 0),
                        new Vec3(100, -100, 0),
                        new Vec3(150, -50, 0),
                        new Vec3(200, 0, 0),
                        new Vec3(200, 50, 0)
                    ],
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 22,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(25, -50, 0),
                        new Vec3(50, -100, 0),
                        new Vec3(100, -100, 0),
                        new Vec3(150, -50, 0),
                        new Vec3(200, 0, 0),
                        new Vec3(200, 50, 0)
                    ],
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 59,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 62,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 65,
                    typeOfStack: 6,
                },
            }
        },
        "Level75": {
            totalNumberOfElements: 48,
            staticPosIcon: [[], [new Vec3(-50, -50, 0), new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 16,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(25, 0, 0),
                        new Vec3(50, 0, 0),
                        new Vec3(75, 0, 0),
                        new Vec3(100, 0, 0),
                        new Vec3(125, 0, 0),
                        new Vec3(150, 0, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 19,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(25, 0, 0),
                        new Vec3(50, 0, 0),
                        new Vec3(75, 0, 0),
                        new Vec3(100, 0, 0),
                        new Vec3(125, 0, 0),
                        new Vec3(150, 0, 0),
                    ],
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 22,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(25, 0, 0),
                        new Vec3(50, 0, 0),
                        new Vec3(75, 0, 0),
                        new Vec3(100, 0, 0),
                        new Vec3(125, 0, 0),
                        new Vec3(150, 0, 0),
                    ],
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 46,
                    typeOfStack: 3,
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 48,
                    typeOfStack: 3,
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 50,
                    typeOfStack: 3,
                },
                "6": {
                    numberOfPlacement: 5,
                    index: 74,
                    typeOfStack: 3,
                },
                "7": {
                    numberOfPlacement: 5,
                    index: 76,
                    typeOfStack: 3,
                },
                "8": {
                    numberOfPlacement: 5,
                    index: 78,
                    typeOfStack: 3,
                },
            }
        },
        "Level76": {
            totalNumberOfElements: 45,
            staticPosIcon: [[], [new Vec3(-50, -50, 0), new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 25,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),   // Top-left curve
                        new Vec3(-100, 0, 0),   // Left curve
                        new Vec3(-50, -50, 0),  // Bottom-left curve
                        new Vec3(0, -100, 0),   // Bottom point
                        new Vec3(50, -50, 0),   // Bottom-right curve
                        new Vec3(100, 0, 0),    // Right curve
                        new Vec3(50, 50, 0),    // Top-right curve
                        new Vec3(0, 100, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 67,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),   // Top-left curve
                        new Vec3(-100, 0, 0),   // Left curve
                        new Vec3(-50, -50, 0),  // Bottom-left curve
                        new Vec3(0, -100, 0),   // Bottom point
                        new Vec3(50, -50, 0),   // Bottom-right curve
                        new Vec3(100, 0, 0),    // Right curve
                        new Vec3(50, 50, 0),    // Top-right curve
                        new Vec3(0, 100, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 3,
                    index: 2,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 4,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 6,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 30,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 32,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 34,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 58,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 60,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 62,
                    typeOfStack: 6,
                },
            }
        },
        "Level77": {
            totalNumberOfElements: 36,
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 53,
                    typeOfStack: 3,
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 17,
                    typeOfStack: 3,
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 24,
                    typeOfStack: 3,
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 44,
                    typeOfStack: 3,
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 19,
                    typeOfStack: 2,
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 22,
                    typeOfStack: 2,
                },
            }
        },
        "Level78": {
            totalNumberOfElements: 48,
            staticPosIcon: [[new Vec3(-100, 0, 0)], [new Vec3(-50, 50, 0), new Vec3(-50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 12,
                    index: 21,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 12,
                    index: 77,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "2": {
                    numberOfPlacement: 4,
                    index: 16,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 46,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 72,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 26,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 52,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 4,
                    index: 82,
                    typeOfStack: 6,
                },
            }
        },
        "Level79": {
            totalNumberOfElements: 45,
            staticPosIcon: [[new Vec3(-100, 0, 0)], [new Vec3(-50, 50, 0), new Vec3(-50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 23,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 20, 0),
                        new Vec3(100, 0, 0),
                        new Vec3(150, -20, 0),
                        new Vec3(200, 0, 0),
                        new Vec3(250, 40, 0),
                        new Vec3(300, -40, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 51,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 20, 0),
                        new Vec3(100, 0, 0),
                        new Vec3(150, -20, 0),
                        new Vec3(200, 0, 0),
                        new Vec3(250, 40, 0),
                        new Vec3(300, -40, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 79,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 20, 0),
                        new Vec3(100, 0, 0),
                        new Vec3(150, -20, 0),
                        new Vec3(200, 0, 0),
                        new Vec3(250, 40, 0),
                        new Vec3(300, -40, 0)
                    ]
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 16,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 18,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 20,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 44,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 46,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 48,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 72,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 74,
                    typeOfStack: 6,
                },
                "11": {
                    numberOfPlacement: 3,
                    index: 76,
                    typeOfStack: 6,
                },
            }
        },
        "Level80": {
            totalNumberOfElements: 48,
            staticPosIcon: [[new Vec3(-100, 0, 0)], [new Vec3(-50, 50, 0), new Vec3(-50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 3,
                    index: 16,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(25, 25, 0),
                        new Vec3(50, 50, 0),
                        new Vec3(100, 100, 0),
                    ]
                },
                "1": {
                    numberOfPlacement: 3,
                    index: 18,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(25, 25, 0),
                        new Vec3(50, 50, 0),
                        new Vec3(100, 100, 0),
                    ]
                },
                "2": {
                    numberOfPlacement: 3,
                    index: 20,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(25, 25, 0),
                        new Vec3(50, 50, 0),
                        new Vec3(100, 100, 0),
                    ]
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 22,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(25, 25, 0),
                        new Vec3(50, 50, 0),
                        new Vec3(100, 100, 0),
                    ]
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 24,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(25, 25, 0),
                        new Vec3(50, 50, 0),
                        new Vec3(100, 100, 0),
                    ]
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 45,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 47,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 49,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 51,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 53,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 6,
                    index: 74,
                    typeOfStack: 3,
                },
                "11": {
                    numberOfPlacement: 6,
                    index: 76,
                    typeOfStack: 3,
                },
                "12": {
                    numberOfPlacement: 6,
                    index: 78,
                    typeOfStack: 3,
                },
            }
        },
        "Level81": {
            totalNumberOfElements: 54,
            staticPosIcon: [[new Vec3(-100, 0, 0), new Vec3(-50, 100, 0)], [new Vec3(-50, 60, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 57,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(58.3, -50, 0),
                        new Vec3(116.6, -100, 0),
                        new Vec3(175, -100, 0),
                        new Vec3(233.2, -50, 0),
                        new Vec3(291.5, 0, 0),
                        new Vec3(350, 50, 0)
                    ],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 61,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, -50, 0),
                        new Vec3(100, -100, 0),
                        new Vec3(150, -100, 0),
                        new Vec3(200, -50, 0),
                        new Vec3(250, 0, 0),
                        new Vec3(300, 50, 0)
                    ],
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 65,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, -50, 0),
                        new Vec3(100, -100, 0),
                        new Vec3(150, -100, 0),
                        new Vec3(200, -50, 0),
                        new Vec3(250, 0, 0),
                        new Vec3(300, 50, 0)
                    ],
                },
                "3": {
                    numberOfPlacement: 4,
                    index: 44,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 4,
                    index: 46,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 4,
                    index: 48,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 4,
                    index: 50,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 4,
                    index: 52,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 4,
                    index: 54,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 4,
                    index: 19,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 4,
                    index: 21,
                    typeOfStack: 6,
                },
                "11": {
                    numberOfPlacement: 4,
                    index: 23,
                    typeOfStack: 6,
                },
            }
        },
        "Level82": {
            totalNumberOfElements: 57,
            staticPosIcon: [[new Vec3(100, 0, 0), new Vec3(0, -100, 0), new Vec3(100, -100, 0)], [new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 5,
                    index: 18,
                    typeOfStack: 6,
                },
                "1": {
                    numberOfPlacement: 5,
                    index: 20,
                    typeOfStack: 6,
                },
                "2": {
                    numberOfPlacement: 5,
                    index: 22,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 58,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 66,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 64,
                    typeOfStack: 3,
                },
                "6": {
                    numberOfPlacement: 5,
                    index: 16,
                    typeOfStack: 2,
                },
                "7": {
                    numberOfPlacement: 5,
                    index: 17,
                    typeOfStack: 2,
                },
                "8": {
                    numberOfPlacement: 5,
                    index: 24,
                    typeOfStack: 2,
                },
                "9": {
                    numberOfPlacement: 5,
                    index: 25,
                    typeOfStack: 2,
                },
                "10": {
                    numberOfPlacement: 6,
                    index: 61,
                    typeOfStack: 3,
                },
            }
        },
        "Level83": {
            totalNumberOfElements: 66,
            staticPosIcon: [[], [new Vec3(-50, -50, 0), new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 24,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 50, 0),
                        new Vec3(43, 25, 0),
                        new Vec3(43, -25, 0),
                        new Vec3(0, -50, 0),
                        new Vec3(-43, -25, 0),
                        new Vec3(-43, 25, 0),
                    ]
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 52,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 50, 0),
                        new Vec3(43, 25, 0),
                        new Vec3(43, -25, 0),
                        new Vec3(0, -50, 0),
                        new Vec3(-43, -25, 0),
                        new Vec3(-43, 25, 0),
                    ]
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 80,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 50, 0),
                        new Vec3(43, 25, 0),
                        new Vec3(43, -25, 0),
                        new Vec3(0, -50, 0),
                        new Vec3(-43, -25, 0),
                        new Vec3(-43, 25, 0),
                    ]
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 16,
                    typeOfStack: 3,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 30,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 58,
                    typeOfStack: 3,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 18,
                    typeOfStack: 3,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 32,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 6,
                    index: 60,
                    typeOfStack: 3,
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 20,
                    typeOfStack: 3,
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 34,
                    typeOfStack: 6,
                },
                "11": {
                    numberOfPlacement: 6,
                    index: 62,
                    typeOfStack: 3,
                },
                "12": {
                    numberOfPlacement: 3,
                    index: 22,
                    typeOfStack: 3,
                },
                "13": {
                    numberOfPlacement: 3,
                    index: 36,
                    typeOfStack: 6,
                },
                "14": {
                    numberOfPlacement: 6,
                    index: 64,
                    typeOfStack: 3,
                },
            }
        },
        "Level84": {
            totalNumberOfElements: 63,
            staticPosIcon: [[], [new Vec3(-50, -50, 0), new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 71,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),   // Top-left curve
                        new Vec3(-100, 0, 0),   // Left curve
                        new Vec3(-50, -50, 0),  // Bottom-left curve
                        new Vec3(0, -100, 0),   // Bottom point
                        new Vec3(50, -50, 0),   // Bottom-right curve
                        new Vec3(100, 0, 0),    // Right curve
                        new Vec3(50, 50, 0),    // Top-right curve
                        new Vec3(0, 100, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 81,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),   // Top-left curve
                        new Vec3(-100, 0, 0),   // Left curve
                        new Vec3(-50, -50, 0),  // Bottom-left curve
                        new Vec3(0, -100, 0),   // Bottom point
                        new Vec3(50, -50, 0),   // Bottom-right curve
                        new Vec3(100, 0, 0),    // Right curve
                        new Vec3(50, 50, 0),    // Top-right curve
                        new Vec3(0, 100, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 20,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),   // Top-left curve
                        new Vec3(-100, 0, 0),   // Left curve
                        new Vec3(-50, -50, 0),  // Bottom-left curve
                        new Vec3(0, -100, 0),   // Bottom point
                        new Vec3(50, -50, 0),   // Bottom-right curve
                        new Vec3(100, 0, 0),    // Right curve
                        new Vec3(50, 50, 0),    // Top-right curve
                        new Vec3(0, 100, 0)
                    ]
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 60,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 64,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 29,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 17,
                    typeOfStack: 3
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 23,
                    typeOfStack: 3
                },
                "8": {
                    numberOfPlacement: 6,
                    index: 39,
                    typeOfStack: 3
                },
            }
        },
        "Level85": {
            totalNumberOfElements: 60,
            staticPosIcon: [[new Vec3(120, 0, 0), new Vec3(0, -140, 0), new Vec3(120, -140, 0), new Vec3(0, -280, 0), new Vec3(120, -280, 0)], []],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 15,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(58.3, 50, 0),
                        new Vec3(116.6, 100, 0),
                        new Vec3(175, 100, 0),
                        new Vec3(233.2, 50, 0),
                        new Vec3(291.5, 0, 0),
                        new Vec3(350, -50, 0)
                    ],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 19,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(58.3, 50, 0),
                        new Vec3(116.6, 100, 0),
                        new Vec3(175, 100, 0),
                        new Vec3(233.2, 50, 0),
                        new Vec3(291.5, 0, 0),
                        new Vec3(350, -50, 0)
                    ],
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 23,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(58.3, 50, 0),
                        new Vec3(116.6, 100, 0),
                        new Vec3(175, 100, 0),
                        new Vec3(233.2, 50, 0),
                        new Vec3(291.5, 0, 0),
                        new Vec3(350, -50, 0)
                    ],
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 44,
                    typeOfStack: 3,
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 46,
                    typeOfStack: 3,
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 51,
                    typeOfStack: 3,
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 53,
                    typeOfStack: 3,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 72,
                    typeOfStack: 3,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 81,
                    typeOfStack: 3,
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 74,
                    typeOfStack: 3,
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 79,
                    typeOfStack: 3,
                },
                "11": {
                    numberOfPlacement: 6,
                    index: 34,
                    typeOfStack: 6,
                },
            }
        },
        "Level86": {
            totalNumberOfElements: 57,
            staticPosIcon: [[], [new Vec3(-50, -50, 0), new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 45,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 48,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 51,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 2,
                    typeOfStack: 6
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 4,
                    typeOfStack: 6
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 6,
                    typeOfStack: 6
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 8,
                    typeOfStack: 6
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 10,
                    typeOfStack: 6
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 72,
                    typeOfStack: 6
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 74,
                    typeOfStack: 6
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 76,
                    typeOfStack: 6
                },
                "11": {
                    numberOfPlacement: 3,
                    index: 78,
                    typeOfStack: 6
                },
                "12": {
                    numberOfPlacement: 3,
                    index: 80,
                    typeOfStack: 6
                },
            }
        },
        "Level87": {
            totalNumberOfElements: 66,
            staticPosIcon: [[], [new Vec3(50, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 2,
                    index: 26,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 2,
                    index: 40,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "2": {
                    numberOfPlacement: 2,
                    index: 54,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "3": {
                    numberOfPlacement: 2,
                    index: 68,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "4": {
                    numberOfPlacement: 2,
                    index: 82,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),
                        new Vec3(-100, 100, 0)
                    ]
                },
                "5": {
                    numberOfPlacement: 2,
                    index: 15,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 2,
                    index: 29,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 2,
                    index: 43,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 2,
                    index: 57,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 2,
                    index: 71,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 6,
                    index: 60,
                    typeOfStack: 1,
                },
                "11": {
                    numberOfPlacement: 6,
                    index: 62,
                    typeOfStack: 1,
                },
                "12": {
                    numberOfPlacement: 6,
                    index: 64,
                    typeOfStack: 1,
                },
                "13": {
                    numberOfPlacement: 6,
                    index: 66,
                    typeOfStack: 1,
                },
                "14": {
                    numberOfPlacement: 6,
                    index: 31,
                    typeOfStack: 3,
                },
                "15": {
                    numberOfPlacement: 5,
                    index: 19,
                    typeOfStack: 3,
                },
                "16": {
                    numberOfPlacement: 5,
                    index: 22,
                    typeOfStack: 3,
                },
                "17": {
                    numberOfPlacement: 6,
                    index: 38,
                    typeOfStack: 3,
                },
            }
        },
        "Level88": {
            totalNumberOfElements: 54,
            staticPosIcon: [[new Vec3(100, 100, 0), new Vec3(50, 200, 0), new Vec3(-50, 200, 0), new Vec3(-100, 100, 0)], [new Vec3(0, 100, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 12,
                    index: 20,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 60,
                    typeOfStack: 3,
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 62,
                    typeOfStack: 3,
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 64,
                    typeOfStack: 3,
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 31,
                    typeOfStack: 3,
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 37,
                    typeOfStack: 3,
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 71,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 81,
                    typeOfStack: 6,
                },
            }
        },
        "Level89": {
            totalNumberOfElements: 42,
            staticPosIcon: [[new Vec3(100, 100, 0), new Vec3(50, 200, 0), new Vec3(-50, 200, 0), new Vec3(-100, 100, 0)], [new Vec3(0, 100, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 5,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                    ]
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 8,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(20, -50, 0),
                        new Vec3(0, -100, 0),
                        new Vec3(-20, -150, 0),
                        new Vec3(0, -200, 0),
                        new Vec3(-40, -250, 0),
                    ]
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 72,
                    typeOfStack: 6
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 76,
                    typeOfStack: 6
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 80,
                    typeOfStack: 6
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 16,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 25,
                    typeOfStack: 3
                },
            }
        },
        "Level90": {
            totalNumberOfElements: 60,
            staticPosIcon: [[new Vec3(100, -100, 0), new Vec3(200, -200, 0)], [new Vec3(50, -50, 0), new Vec3(150, -150, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 11,
                    index: 70,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0), new Vec3(120, -60, 0), new Vec3(120, 0, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 42,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "2": {
                    numberOfPlacement: 5,
                    index: 2,
                    typeOfStack: 6
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 5,
                    typeOfStack: 6
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 8,
                    typeOfStack: 6
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 11,
                    typeOfStack: 6
                },
                "6": {
                    numberOfPlacement: 5,
                    index: 44,
                    typeOfStack: 6
                },
                "7": {
                    numberOfPlacement: 5,
                    index: 47,
                    typeOfStack: 6
                },
                "8": {
                    numberOfPlacement: 5,
                    index: 50,
                    typeOfStack: 6
                },
                "9": {
                    numberOfPlacement: 5,
                    index: 53,
                    typeOfStack: 6
                },
            }
        },
        "Level91": {
            totalNumberOfElements: 78,
            staticPosIcon: [[new Vec3(100, -100, 0), new Vec3(200, -200, 0)], [new Vec3(50, -50, 0), new Vec3(150, -150, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 12,
                    index: 57,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 12,
                    index: 60,
                    typeOfStack: 4,
                },
                "2": {
                    numberOfPlacement: 12,
                    index: 64,
                    typeOfStack: 4,
                },
                "3": {
                    numberOfPlacement: 12,
                    index: 67,
                    typeOfStack: 4,
                },
                "4": {
                    numberOfPlacement: 5,
                    index: 1,
                    typeOfStack: 6
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 3,
                    typeOfStack: 6
                },
                "6": {
                    numberOfPlacement: 5,
                    index: 5,
                    typeOfStack: 6
                },
                "7": {
                    numberOfPlacement: 5,
                    index: 7,
                    typeOfStack: 6
                },
                "8": {
                    numberOfPlacement: 5,
                    index: 9,
                    typeOfStack: 6
                },
                "9": {
                    numberOfPlacement: 5,
                    index: 11,
                    typeOfStack: 6
                },
            }
        },
        "Level92": {
            totalNumberOfElements: 60,
            staticPosIcon: [[new Vec3(100, -100, 0), new Vec3(200, -200, 0)], [new Vec3(50, -50, 0), new Vec3(150, -150, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 19,
                    typeOfStack: 4,
                    positionArray: [new Vec3(60, 0, 0), new Vec3(60, 60, 0), new Vec3(0, 60, 0), new Vec3(-60, 60, 0), new Vec3(-60, 0, 0), new Vec3(-60, -60, 0), new Vec3(0, -60, 0), new Vec3(60, -60, 0)]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 61,
                    typeOfStack: 4,
                },
                "2": {
                    numberOfPlacement: 9,
                    index: 22,
                    typeOfStack: 4,
                },
                "3": {
                    numberOfPlacement: 9,
                    index: 64,
                    typeOfStack: 4,
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 16,
                    typeOfStack: 3,
                },
                "5": {
                    numberOfPlacement: 6,
                    index: 58,
                    typeOfStack: 3,
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 25,
                    typeOfStack: 3,
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 67,
                    typeOfStack: 3,
                },
            }
        },
        "Level93": {
            totalNumberOfElements: 48,
            staticPosIcon: [[new Vec3(100, 100, 0), new Vec3(50, 200, 0), new Vec3(-50, 200, 0), new Vec3(-100, 100, 0)], [new Vec3(0, 100, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 12,
                    index: 52,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(0, 90, 0),
                        new Vec3(-30, 30, 0),
                        new Vec3(-90, 30, 0),
                        new Vec3(-45, 0, 0),
                        new Vec3(-60, -60, 0),
                        new Vec3(0, -30, 0),
                        new Vec3(60, -60, 0),
                        new Vec3(45, 0, 0),
                        new Vec3(90, 30, 0),
                        new Vec3(30, 30, 0),
                        new Vec3(-30, 30, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 30,
                    typeOfStack: 6,
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 72,
                    typeOfStack: 6,
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 34,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 76,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 23,
                    typeOfStack: 3,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 25,
                    typeOfStack: 3,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 79,
                    typeOfStack: 3,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 81,
                    typeOfStack: 3,
                },
            }
        },
        "Level94": {
            totalNumberOfElements: 42,
            staticPosIcon: [[new Vec3(100, -50, 0)], [new Vec3(50, -25, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 2,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, -25, 0),
                        new Vec3(100, -50, 0),
                        new Vec3(150, -75, 0),
                        new Vec3(200, -100, 0),
                        new Vec3(250, -125, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 28,
                    typeOfStack: 4,
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 64,
                    typeOfStack: 4,
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 38,
                    typeOfStack: 4,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 15,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 67,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 6,
                    index: 47,
                    typeOfStack: 3,
                },
                "7": {
                    numberOfPlacement: 6,
                    index: 36,
                    typeOfStack: 3,
                },
            }
        },
        "Level95": {
            totalNumberOfElements: 60,
            staticPosIcon: [[
                new Vec3(100, 0, 0),
                new Vec3(50, 86.6, 0),
                new Vec3(-50, 86.6, 0),
                new Vec3(-100, 0, 0),
                new Vec3(-50, -86.6, 0),
                new Vec3(50, -86.6, 0),
            ], [new Vec3(160, 0, 0),
            new Vec3(140, 100, 0),
            new Vec3(50, 180, 0),
            new Vec3(-50, 180, 0),
            new Vec3(-140, 100, 0),
            new Vec3(-160, 0, 0),
            new Vec3(-140, -100, 0),
            new Vec3(-50, -180, 0),
            new Vec3(50, -180, 0),
            new Vec3(140, -100, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 7,
                    index: 42,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 0, 0),
                        new Vec3(100, 0, 0),
                        new Vec3(150, 0, 0),
                        new Vec3(200, 0, 0),
                        new Vec3(250, 0, 0),
                        new Vec3(300, 0, 0),
                        new Vec3(350, 0, 0),
                        new Vec3(400, 0, 0),
                    ],
                },
                "1": {
                    numberOfPlacement: 7,
                    index: 51,
                    typeOfStack: 4
                },
                "2": {
                    numberOfPlacement: 17,
                    index: 48,
                    typeOfStack: 6
                },
                "3": {
                    numberOfPlacement: 5,
                    index: 16,
                    typeOfStack: 3
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 24,
                    typeOfStack: 3
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 71,
                    typeOfStack: 3
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 73,
                    typeOfStack: 3
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 79,
                    typeOfStack: 3
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 81,
                    typeOfStack: 3
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 18,
                    typeOfStack: 3
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 22,
                    typeOfStack: 3
                },
            }
        },
        "Level96": {
            totalNumberOfElements: 69,
            staticPosIcon: [[new Vec3(-200, 150, 0),
            new Vec3(-100, 150, 0),
            new Vec3(100, 150, 0),
            new Vec3(200, 150, 0),
            new Vec3(200, 45, 0),
            new Vec3(200, -60, 0),
            new Vec3(200, -165, 0),
            new Vec3(100, -165, 0),
            new Vec3(-100, -165, 0),
            new Vec3(-200, -165, 0),
            new Vec3(-200, -60, 0),
            new Vec3(-200, 45, 0),
            new Vec3(0, 150, 0),
            new Vec3(0, -165, 0)], [new Vec3(-150, 100, 0), // Top edge
            new Vec3(-50, 100, 0),
            new Vec3(50, 100, 0),
            new Vec3(150, 100, 0),    // Right edge
            new Vec3(150, 0, 0),
            new Vec3(150, -100, 0),  // Bottom edge
            new Vec3(50, -100, 0),
            new Vec3(-50, -100, 0),
            new Vec3(-150, -100, 0),  // Left edge
            new Vec3(-150, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 16,
                    typeOfStack: 3,
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 42,
                    typeOfStack: 3,
                },
                "2": {
                    numberOfPlacement: 5,
                    index: 72,
                    typeOfStack: 3,
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 24,
                    typeOfStack: 3,
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 54,
                    typeOfStack: 3,
                },
                "5": {
                    numberOfPlacement: 5,
                    index: 80,
                    typeOfStack: 3,
                },
                "6": {
                    numberOfPlacement: 5,
                    index: 70,
                    typeOfStack: 3,
                },
                "7": {
                    numberOfPlacement: 5,
                    index: 82,
                    typeOfStack: 3,
                },
                "8": {
                    numberOfPlacement: 25,
                    index: 48,
                    typeOfStack: 6,
                },
            }
        },
        "Level97": {
            totalNumberOfElements: 57,
            staticPosIcon: [[new Vec3(100, 50, 0)], [new Vec3(50, 50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 9,
                    index: 57,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(-50, 50, 0),   // Top-left curve
                        new Vec3(-100, 0, 0),   // Left curve
                        new Vec3(-50, -50, 0),  // Bottom-left curve
                        new Vec3(0, -100, 0),   // Bottom point
                        new Vec3(50, -50, 0),   // Bottom-right curve
                        new Vec3(100, 0, 0),    // Right curve
                        new Vec3(50, 50, 0),    // Top-right curve
                        new Vec3(0, 100, 0)
                    ]
                },
                "1": {
                    numberOfPlacement: 9,
                    index: 60,
                    typeOfStack: 4,
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 23,
                    typeOfStack: 3,
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 19,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 34,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 49,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 64,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 79,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 15,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 17,
                    typeOfStack: 6,
                },
                "10": {
                    numberOfPlacement: 6,
                    index: 25,
                    typeOfStack: 3,
                },
                "11": {
                    numberOfPlacement: 6,
                    index: 53,
                    typeOfStack: 3,
                },
            }
        },
        "Level98": {
            totalNumberOfElements: 54,
            staticPosIcon: [[new Vec3(100, -100, 0)], [new Vec3(50, -50, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 15,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(58.3, 50, 0),
                        new Vec3(116.6, 100, 0),
                        new Vec3(175, 100, 0),
                        new Vec3(233.2, 50, 0),
                        new Vec3(291.5, 0, 0),
                        new Vec3(350, -50, 0)
                    ],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 19,
                    typeOfStack: 4,
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 23,
                    typeOfStack: 4,
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 29,
                    typeOfStack: 6,
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 31,
                    typeOfStack: 6,
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 33,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 35,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 37,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 39,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 71,
                    typeOfStack: 3,
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 73,
                    typeOfStack: 3,
                },
                "11": {
                    numberOfPlacement: 3,
                    index: 75,
                    typeOfStack: 3,
                },
                "12": {
                    numberOfPlacement: 3,
                    index: 77,
                    typeOfStack: 3,
                },
                "13": {
                    numberOfPlacement: 3,
                    index: 79,
                    typeOfStack: 3,
                },
                "14": {
                    numberOfPlacement: 3,
                    index: 81,
                    typeOfStack: 3,
                },
            }
        },
        "Level99": {
            totalNumberOfElements: 66,
            staticPosIcon: [[new Vec3(100, 0, 0)], [new Vec3(50, 0, 0)]],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 30,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 20, 0),
                        new Vec3(30, -40, 0),
                        new Vec3(-30, -40, 0),
                        new Vec3(-50, 20, 0),
                        new Vec3(0, 60, 0)],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 46,
                    typeOfStack: 4
                },
                "2": {
                    numberOfPlacement: 3,
                    index: 6,
                    typeOfStack: 6
                },
                "3": {
                    numberOfPlacement: 3,
                    index: 20,
                    typeOfStack: 6
                },
                "4": {
                    numberOfPlacement: 3,
                    index: 34,
                    typeOfStack: 6
                },
                "5": {
                    numberOfPlacement: 3,
                    index: 48,
                    typeOfStack: 6
                },
                "6": {
                    numberOfPlacement: 3,
                    index: 62,
                    typeOfStack: 6
                },
                "7": {
                    numberOfPlacement: 3,
                    index: 76,
                    typeOfStack: 6
                },
                "8": {
                    numberOfPlacement: 3,
                    index: 2,
                    typeOfStack: 6
                },
                "9": {
                    numberOfPlacement: 3,
                    index: 4,
                    typeOfStack: 6
                },
                "10": {
                    numberOfPlacement: 3,
                    index: 72,
                    typeOfStack: 6
                },
                "11": {
                    numberOfPlacement: 3,
                    index: 74,
                    typeOfStack: 6
                },
                "12": {
                    numberOfPlacement: 3,
                    index: 8,
                    typeOfStack: 6
                },
                "13": {
                    numberOfPlacement: 3,
                    index: 78,
                    typeOfStack: 6
                },
                "14": {
                    numberOfPlacement: 3,
                    index: 10,
                    typeOfStack: 6
                },
                "15": {
                    numberOfPlacement: 3,
                    index: 80,
                    typeOfStack: 6
                },
                "16": {
                    numberOfPlacement: 6,
                    index: 51,
                    typeOfStack: 4
                },
                "17": {
                    numberOfPlacement: 6,
                    index: 39,
                    typeOfStack: 4
                },
            }
        },
        "Level100": {
            totalNumberOfElements: 60,
            staticPosIcon: [[new Vec3(100, 0, 0), new Vec3(150, 100, 0), new Vec3(100, 200, 0), new Vec3(0, 200, 0), new Vec3(-50, 100, 0), new Vec3(50, 100, 0)], []],
            placingConfig: {
                "0": {
                    numberOfPlacement: 6,
                    index: 58,
                    typeOfStack: 4,
                    positionArray: [
                        new Vec3(50, 20, 0),
                        new Vec3(30, -40, 0),
                        new Vec3(-30, -40, 0),
                        new Vec3(-50, 20, 0),
                        new Vec3(0, 60, 0)],
                },
                "1": {
                    numberOfPlacement: 6,
                    index: 60,
                    typeOfStack: 4,
                },
                "2": {
                    numberOfPlacement: 6,
                    index: 62,
                    typeOfStack: 4,
                },
                "3": {
                    numberOfPlacement: 6,
                    index: 64,
                    typeOfStack: 4,
                },
                "4": {
                    numberOfPlacement: 6,
                    index: 66,
                    typeOfStack: 4,
                },
                "5": {
                    numberOfPlacement: 7,
                    index: 29,
                    typeOfStack: 6,
                },
                "6": {
                    numberOfPlacement: 7,
                    index: 32,
                    typeOfStack: 6,
                },
                "7": {
                    numberOfPlacement: 7,
                    index: 35,
                    typeOfStack: 6,
                },
                "8": {
                    numberOfPlacement: 7,
                    index: 38,
                    typeOfStack: 6,
                },
                "9": {
                    numberOfPlacement: 1,
                    index: 31,
                    typeOfStack: 0,
                },
                "10": {
                    numberOfPlacement: 1,
                    index: 37,
                    typeOfStack: 0,
                },
            }
        },
    }
}