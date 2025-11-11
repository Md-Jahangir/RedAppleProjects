var sky;
var water;
var waterFall;

var leafGroup;
var leafArray = [];
var leafEndIndex;
var leafMinNumber = 1;
var leafMaxNumber = 3;
var leafGapMin = 100;
var leafGapMax = 800;

var fireflyArray = [];
var firefly;
var gameLoop;
var returnFireflyTween;
var moveFireflyTween;

// var fireflyGroup;
// var fireflyEndIndex;
// var fireflyGapMin = 50;
// var fireflyGapMax = 300;

var grassGroup;
var treeOneGroup;
var landOneGroup;
var stoneOneGroup;
var treeTwoGroup;
var stoneTwoGroup;
var landTwoGroup;
var treeThreeGroup;
var hillGroup;


var Background = {

    //CREATE THE SKY  
    CreateSky: function () {
        sky = Utils.SpriteSettingsControl(sky, 640.0, 272.0, 'sky', "true", "true", 0.5, 0.5, 1280, 1);
        game.world.sendToBack(sky);
    },

    //DESTROY THE SKY  
    DestroySky: function () {
        if (sky != null) {
            sky.destroy();
        }
    },

    //CREATE THE WATER
    CreateWater: function () {
        // water = Utils.SpriteSettingsControl(sky, 640.0, 728.0, 'water', "true", "true", 0.5, 0.5, 1280, 1);
        water = Utils.SpriteSettingsControl(sky, 640.0, 680.0, 'water', "true", "true", 0.5, 0.5, 1.2, 1.4);
        water.animations.add('water_animation');
        // water.animations.play("water_animation", 2, true);
    },

    PlayWaterAnimation: function () {
        water.animations.play("water_animation", 3, true);
    },
    StopWaterAnimation: function () {
        water.animations.stop("water_animation");
    },

    //DESTROY THE WATER
    DestroyWater: function () {
        if (water != null) {
            water.destroy();
        }
    },

    //CREATE THE WATER FALL ANIMATION
    CreateWaterFall: function () {
        waterFall = Utils.SpriteSettingsControl(waterFall, 200.0, 630.0, 'waterFall', "true", "true", 0.5, 0.5, 1, 1);
        waterFall.animations.add('water_fall_animation');
        waterFall.visible = false;

    },
    //DESTROY THE WATER FALL ANIMATION
    DestroyWater: function () {
        if (waterFall != null) {
            waterFall.destroy();
        }
    },

    //CREATE LEAF ON THE WATER
    CreateLeaf: function (count) {
        leafEndIndex = count - 1;
        leafArray = [];
        var i;
        var randomNumber;
        var prevRandomNumber;
        var temp;

        for (i = 0; i < count; i++) {
            do {
                randomNumber = Utils.getRandomNumber(leafMinNumber, leafMaxNumber);
            } while (i > 0 && randomNumber == prevRandomNumber);
            prevRandomNumber = randomNumber;

            if (randomNumber == 3) {
                temp = Utils.SpriteSettingsControl(temp, 0, 0, 'waterLeaf_03', "true", "true", 0, 1, 1, 1);
                temp.name = "waterLeaf_03";

                // temp.animations.play('leafAnimation', 10, true);

            } else {
                temp = Utils.SpriteSettingsControl(temp, 0, 0, 'waterLeaf_' + Utils.getZeroPaddedString(randomNumber), "true", "true", 0, 1, 1, 1);
            }

            leafArray.push(temp);
            leafGroup.add(temp);

            // REPOSITION
            if (i == 0) {
                leafArray[i].x = Utils.getRandomNumber(leafGapMin, leafGapMax);
            } else {
                leafArray[i].x = leafArray[i - 1].x + leafArray[i - 1].width + Utils.getRandomNumber(leafGapMin, leafGapMax);
            }
            // leafArray[i].y = 710;
            leafArray[i].y = Utils.getRandomNumber(705, 725);
        }
    },
    PlayLeafAnimation: function () {
        for (var i = 0; i < leafArray.length; i++) {
            if (leafArray[i].name == "waterLeaf_03") {
                leafArray[i].animations.add('leafAnimation');
                leafArray[i].animations.play('leafAnimation', 10, true);
            }
        }
    },
    StopLeafAnimation: function () {
        for (var i = 0; i < leafArray.length; i++) {
            if (leafArray[i].name == "waterLeaf_03") {
                leafArray[i].animations.stop('leafAnimation');
            }
        }
    },
    //MOVE THE LEAF ON THE WATER
    ShiftLeaf: function () {
        for (var i = 0; i < leafArray.length; i++) {
            leafArray[i].x -= speed * 1.09;

            if (leafArray[i].x < -leafArray[i].width) {
                leafArray[i].x = leafArray[leafEndIndex].x + leafArray[leafEndIndex].width + Utils.getRandomNumber(leafGapMin, leafGapMax);
                leafEndIndex = i;
            }
        }
    },

    //DESTROY THE LEAF ON THE WATER
    DestroyLeaf: function () {
        for (var i = 0; i < leafArray.length; i++) {
            if (leafArray[i] != null) {
                leafArray[i].destroy();
            }
            leafArray = [];
        }

    },

    // CreateFirefly: function(count) {
    //     fireflyEndIndex = count - 1;
    //     fireflyArray = [];
    //     var i;
    //     var temp;

    //     for (i = 0; i < count; i++) {
    //         temp = Utils.SpriteSettingsControl(temp, 0, 0, 'firefly', "true", "true", 0.5, 0.5, 1, 1);
    //         // temp.animations.add('fireflyAnimation');
    //         // temp.animations.play('fireflyAnimation', 15, true);

    //         fireflyArray.push(temp);
    //         fireflyGroup.add(temp);

    //         // REPOSITION
    //         if (i == 0) {
    //             fireflyArray[i].x = Utils.getRandomNumber(fireflyGapMin, fireflyGapMax);
    //         } else {
    //             fireflyArray[i].x = fireflyArray[i - 1].x + fireflyArray[i - 1].width + Utils.getRandomNumber(fireflyGapMin, fireflyGapMax);
    //         }

    //         fireflyArray[i].y = Utils.getRandomNumber(80, 360);
    //     }
    // },

    // PlayFireflyAnimation: function() {
    //     for (var i = 0; i < fireflyArray.length; i++) {
    //         // if (leafArray[i].name == "waterLeaf_03") {
    //         fireflyArray[i].animations.add('fireflyAnimation');
    //         fireflyArray[i].animations.play('fireflyAnimation', 15, true);
    //         // }
    //     }
    // },
    // StopFireflyAnimation: function() {
    //     for (var i = 0; i < fireflyArray.length; i++) {
    //         // if (leafArray[i].name == "waterLeaf_03") {
    //         fireflyArray[i].animations.stop('fireflyAnimation');
    //         // }
    //     }
    // },

    CreateFirefly: function (count) {
        for (var i = 0; i < count; i++) {
            var randomY = Math.random() * 400 + 0;
            var randomX = Math.random() * 1280 + 0;
            firefly = Utils.SpriteSettingsControl(firefly, randomX + (i * 100), randomY + (i * 100), 'firefly', "true", "true", 0.5, 0.5, 0.7, 0.7);
            firefly.animations.add('fireflyAnimation');
            // firefly.animations.play('fireflyAnimation', 10, true);
            // firefly = game.add.sprite(randomX + (i * 100), randomY + (i * 100), 'firefly');
            // firefly.anchor.set(0.5, 0.5);
            // var randomValue = Math.random(0.5, 0.8);
            // firefly.scale.set(randomValue, randomValue);
            // firefly.tint = "0xff38b6";
            fireflyArray.push(firefly);
        }
        this.GameLoopForFireFly();
    },
    GameLoopForFireFly: function () {
        this.MoveFirefly();
        gameLoop = game.time.events.loop(50000, this.MoveFirefly, this);
    },

    PlayFireflyAnimation: function () {
        for (var i = 0; i < fireflyArray.length; i++) {
            fireflyArray[i].animations.play('fireflyAnimation', 10, true);
        }
    },


    MoveFirefly: function () {
        for (var i = 0; i < fireflyArray.length; i++) {
            var randomY = Math.random() * 1120 - 400;
            var randomX = Math.random() * 1680 - 400;
            moveFireflyTween = game.add.tween(fireflyArray[i].position).to({ x: randomX, y: randomY }, 20000, Phaser.Easing.Linear.Out, true);
            moveFireflyTween.onComplete.add(this.ReturnFirefly, this);
        }
    },

    ReturnFirefly: function () {
        for (var i = 0; i < fireflyArray.length; i++) {
            var randomY = Math.random() * 1120 - 400;
            var randomX = Math.random() * 1680 - 400;
            returnFireflyTween = game.add.tween(fireflyArray[i].position).to({ x: randomX, y: randomY }, 20000, Phaser.Easing.Linear.Out, true);
        }
    },

    StopFireflyAnimation: function () {
        for (var i = 0; i < fireflyArray.length; i++) {
            fireflyArray[i].animations.stop('fireflyAnimation');
        }
        // moveFireflyTween.stop();
        // returnFireflyTween.pause();
        game.time.events.remove(gameLoop);
    },

    // ShiftFirefly: function() {
    //     for (var i = 0; i < fireflyArray.length; i++) {
    //         fireflyArray[i].x -= speed * 0.9;

    //         if (fireflyArray[i].x < -fireflyArray[i].width) {
    //             fireflyArray[i].x = fireflyArray[fireflyEndIndex].x + fireflyArray[fireflyEndIndex].width + Utils.getRandomNumber(fireflyGapMin, fireflyGapMax);
    //             fireflyEndIndex = i;
    //         }
    //     }
    // },

    DestroyFirefly: function () {
        for (var i = 0; i < fireflyArray.length; i++) {
            if (fireflyArray[i] != null) {
                fireflyArray[i].destroy();
            }
            fireflyArray = [];
        }
    },

    //CREATE GRASS LAYER
    CreateGrassLayer: function () {
        grassGroup = game.add.group();

        // ADD BACKGROUND ONE
        var grassOne = Utils.SpriteSettingsControl(grassOne, 0, 0, 'grass', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND TWO
        var grassTwo = Utils.SpriteSettingsControl(grassTwo, 4952, 0, 'grass', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND THREE
        var grassThree = Utils.SpriteSettingsControl(grassThree, 9904, 0, 'grass', "true", "true", 0.5, 0.5, 1, 1);

        grassGroup.add(grassOne);
        grassGroup.add(grassTwo);
        grassGroup.add(grassThree);

        grassGroup.position.set(0, 305);
    },

    //MOVE THE GRASS LAYER
    ShiftGrassLayer: function () {
        grassGroup.x -= speed * 0.95;

        if (grassGroup.x < -4952) {
            grassGroup.x = 0;
        }
    },

    // DESTROY THE GRASS LAYER
    DestroyGrassLayer: function () {
        if (grassGroup != null) {
            grassGroup.destroy();
        }
    },

    //CREATE TREE 1 LAYER
    CreateTreeOneLayer: function () {
        treeOneGroup = game.add.group();

        // ADD BACKGROUND ONE
        var treeOne = Utils.SpriteSettingsControl(treeOne, 0, 0, 'treeOne', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND TWO
        var treeTwo = Utils.SpriteSettingsControl(treeTwo, 5107, 0, 'treeOne', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND THREE
        var treeThree = Utils.SpriteSettingsControl(treeThree, 10214, 0, 'treeOne', "true", "true", 0.5, 0.5, 1, 1);

        treeOneGroup.add(treeOne);
        treeOneGroup.add(treeTwo);
        treeOneGroup.add(treeThree);

        treeOneGroup.position.set(0, 320);
    },

    //MOVE TREE 1 LAYER
    ShiftTreeOneLayer: function () {
        treeOneGroup.x -= speed * 0.9;

        if (treeOneGroup.x < -5107) {
            treeOneGroup.x = 0;
        }
    },
    //DESTROY TREE 1 LAYER
    DestroyTreeOneLayer: function () {
        if (treeOneGroup != null) {
            treeOneGroup.destroy();
        }
    },

    //CREATE STONE 1 LAYER
    CreateStoneOneLayer: function () {
        stoneOneGroup = game.add.group();

        // ADD BACKGROUND ONE
        var stoneOne = Utils.SpriteSettingsControl(stoneOne, 0, 0, 'stoneOne', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND TWO
        var stoneTwo = Utils.SpriteSettingsControl(stoneTwo, 3542, 0, 'stoneOne', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND THREE
        var stoneThree = Utils.SpriteSettingsControl(stoneThree, 7084, 0, 'stoneOne', "true", "true", 0.5, 0.5, 1, 1);

        stoneOneGroup.add(stoneOne);
        stoneOneGroup.add(stoneTwo);
        stoneOneGroup.add(stoneThree);

        stoneOneGroup.position.set(0, 405);
    },

    //MOVE STONE 1 LAYER
    ShiftStoneOneLayer: function () {
        stoneOneGroup.x -= speed * 0.85;

        if (stoneOneGroup.x < -3542) {
            stoneOneGroup.x = 0;
        }
    },
    //DESTROY STONE 1 LAYER
    DestroyStoneOneLayer: function () {
        if (stoneOneGroup != null) {
            stoneOneGroup.destroy();
        }
    },

    //CREATE TREE 2 LAYER
    CreateTreeTwoLayer: function () {
        treeTwoGroup = game.add.group();

        // ADD BACKGROUND ONE
        var treeOne = Utils.SpriteSettingsControl(treeOne, 0, 0, 'treeTwo', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND TWO
        var treeTwo = Utils.SpriteSettingsControl(treeTwo, 4728, 0, 'treeTwo', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND THREE
        var treeThree = Utils.SpriteSettingsControl(treeThree, 9456, 0, 'treeTwo', "true", "true", 0.5, 0.5, 1, 1);

        treeTwoGroup.add(treeOne);
        treeTwoGroup.add(treeTwo);
        treeTwoGroup.add(treeThree);

        treeTwoGroup.position.set(0, 255);
    },

    //MOVE TREE 2 LAYER
    ShiftTreeTwoLayer: function () {
        treeTwoGroup.x -= speed * 0.8;

        if (treeTwoGroup.x < -4728) {
            treeTwoGroup.x = 0;
        }
    },
    //DESTROY TREE 2 LAYER
    DestroyTreeTwoLayer: function () {
        if (treeTwoGroup != null) {
            treeTwoGroup.destroy();
        }
    },

    //CREATE LAND 1 LAYER
    CreateLandOneLayer: function () {
        landOneGroup = game.add.group();

        // ADD BACKGROUND ONE
        var landOne = Utils.SpriteSettingsControl(landOne, 0, 0, 'landOne', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND TWO
        var landTwo = Utils.SpriteSettingsControl(landTwo, 3681, 0, 'landOne', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND THREE
        var landThree = Utils.SpriteSettingsControl(landThree, 7362, 0, 'landOne', "true", "true", 0.5, 0.5, 1, 1);

        landOneGroup.add(landOne);
        landOneGroup.add(landTwo);
        landOneGroup.add(landThree);

        landOneGroup.position.set(0, 435);
    },

    //MOVE LAND 1 LAYER
    ShiftLandOneLayer: function () {
        landOneGroup.x -= speed * 0.8;

        if (landOneGroup.x < -3681) {
            landOneGroup.x = 0;
        }
    },
    //DESTROY LAND 1 LAYER
    DestroyLandOneLayer: function () {
        if (landOneGroup != null) {
            landOneGroup.destroy();
        }
    },

    //CREATE STONE 2 LAYER
    CreateStoneTwoLayer: function () {
        stoneTwoGroup = game.add.group();

        // ADD BACKGROUND ONE
        var stoneOne = Utils.SpriteSettingsControl(stoneOne, 0, 0, 'stoneTwo', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND TWO
        var stoneTwo = Utils.SpriteSettingsControl(stoneTwo, 3856, 0, 'stoneTwo', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND THREE
        var stoneThree = Utils.SpriteSettingsControl(stoneThree, 7712, 0, 'stoneTwo', "true", "true", 0.5, 0.5, 1, 1);

        stoneTwoGroup.add(stoneOne);
        stoneTwoGroup.add(stoneTwo);
        stoneTwoGroup.add(stoneThree);

        stoneTwoGroup.position.set(0, 200);
    },

    //MOVE STONE 2 LAYER
    ShiftStoneTwoLayer: function () {
        stoneTwoGroup.x -= speed * 0.65;

        if (stoneTwoGroup.x < -3856) {
            stoneTwoGroup.x = 0;
        }
    },
    //DESTROY STONE 2 LAYER
    DestroyStoneTwoLayer: function () {
        if (stoneTwoGroup != null) {
            stoneTwoGroup.destroy();
        }
    },


    //CREATE TREE 2 LAYER
    CreateTreeThreeLayer: function () {
        treeThreeGroup = game.add.group();

        // ADD BACKGROUND ONE
        var treeOne = Utils.SpriteSettingsControl(treeOne, 0, 0, 'treeThree', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND TWO
        var treeTwo = Utils.SpriteSettingsControl(treeTwo, 3701, 0, 'treeThree', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND THREE
        var treeThree = Utils.SpriteSettingsControl(treeThree, 7402, 0, 'treeThree', "true", "true", 0.5, 0.5, 1, 1);

        treeThreeGroup.add(treeOne);
        treeThreeGroup.add(treeTwo);
        treeThreeGroup.add(treeThree);

        treeThreeGroup.position.set(0, 200);
    },

    //MOVE TREE 2 LAYER
    ShiftTreeThreeLayer: function () {
        treeThreeGroup.x -= speed * 0.6;

        if (treeThreeGroup.x < -3701) {
            treeThreeGroup.x = 0;
        }
    },
    //DESTROY TREE 2 LAYER
    DestroyTreeThreeLayer: function () {
        if (treeThreeGroup != null) {
            treeThreeGroup.destroy();
        }
    },

    //CREATE LAND 2 LAYER
    CreateLandTwoLayer: function () {
        landTwoGroup = game.add.group();

        // ADD BACKGROUND ONE
        var landOne = Utils.SpriteSettingsControl(landOne, 0, 0, 'landTwo', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND TWO
        var landTwo = Utils.SpriteSettingsControl(landTwo, 4785, 0, 'landTwo', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND THREE
        var landThree = Utils.SpriteSettingsControl(landThree, 9570, 0, 'landTwo', "true", "true", 0.5, 0.5, 1, 1);

        landTwoGroup.add(landOne);
        landTwoGroup.add(landTwo);
        landTwoGroup.add(landThree);

        landTwoGroup.position.set(0, 345);
    },

    //MOVE LAND 2 LAYER
    ShiftLandTwoLayer: function () {
        landTwoGroup.x -= speed * 0.55;

        if (landTwoGroup.x < -4785) {
            landTwoGroup.x = 0;
        }
    },
    //DESTROY LAND 2 LAYER
    DestroyLandTwoLayer: function () {
        if (landTwoGroup != null) {
            landTwoGroup.destroy();
        }
    },


    //CREATE GRASS LAYER
    CreateHillLayer: function () {
        hillGroup = game.add.group();

        // ADD BACKGROUND ONE
        var hillOne = Utils.SpriteSettingsControl(hillOne, 0, 0, 'hill', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND TWO
        var hillTwo = Utils.SpriteSettingsControl(hillTwo, 4779, 0, 'hill', "true", "true", 0.5, 0.5, 1, 1);
        // ADD BACKGROUND THREE
        var hillThree = Utils.SpriteSettingsControl(hillThree, 9558, 0, 'hill', "true", "true", 0.5, 0.5, 1, 1);

        hillGroup.add(hillOne);
        hillGroup.add(hillTwo);
        hillGroup.add(hillThree);

        hillGroup.position.set(0, 200);
    },

    //MOVE THE HILL LAYER
    ShiftHillLayer: function () {
        hillGroup.x -= speed * 0.5;

        if (hillGroup.x < -4779) {
            hillGroup.x = 0;
        }
    },

    //DESTROY THE HILL LAYER
    DestroyHillLayer: function () {
        if (hillGroup != null) {
            hillGroup.destroy();
        }
    },


}