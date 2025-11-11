var gameplayWhiteBackground;
var gamePlayBackground;
var sideBar;
//Input Assets
var ostrich, elephant, giraffee, zebra, sajaru, pig, monkey, turtle, bear;
//collision area
var ostrichCollisonArea, elephantCollisonArea1, elephantCollisonArea2, giraffeeCollisonArea, zebraCollisonArea1, zebraCollisonArea2;
var sajaruCollisonArea1, sajaruCollisonArea2, pigCollisonArea, monkeyCollisonArea, turtleCollisonArea, bearCollisonArea1, bearCollisonArea2;
var itemNumber = 0;
var isCollisionCheck = false;
var staticMonkeyBase;
//Static Elements
var staticLion1, staticLion2, staticElephant, staticOstrich, staticGiraffee, staticZebra, staticSajaru, staticPig, staticMonkey, staticTurtle, staticBear;


var GamePlay = function() {};
GamePlay.prototype = {
    init: function() {
        Utils.ScaleManager();
        console.log("The Gameplay screen........................");
    },
    preload: function() {
        gamePage = "GameplayScreen";
    },
    render: function() {},
    create: function() {
        // SoundManager.PlayGameSound(); 
        gameplayWhiteBackground = Utils.SpriteSettingsControl(gameplayWhiteBackground, 320, 180, 'whitePixel', "true", "true", 0.5, 0.5, 10000, 10000, "false");
        gamePlayBackground = Utils.SpriteSettingsControl(gamePlayBackground, 525, 360, 'backgroundImage', "true", "true", 0.5, 0.5, 1, 1, "false");
        sideBar = Utils.SpriteSettingsControl(sideBar, 1074, 360, 'sideBar', "true", "true", 0.5, 0.5, 1, 1, "false");
        sideBar.tint = "0x999999";

        //Static Items
        staticLion1 = Utils.SpriteSettingsControl(staticLion1, 450, 150, 'lion2', "true", "true", 0.5, 0.5, -0.9, 0.9, "false");
        staticLion1.animations.add('lion2Animation');
        staticLion1.animations.play('lion2Animation', 16, true);

        staticLion2 = Utils.SpriteSettingsControl(staticLion2, 570, 150, 'lion1', "true", "true", 0.5, 0.5, 0.9, 0.9, "false");
        staticLion2.animations.add('lion1Animation');
        staticLion2.animations.play('lion1Animation', 14, true);

        staticElephant = Utils.SpriteSettingsControl(staticElephant, 250, 200, 'elephant', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticElephant.animations.add('elephantAnimation');
        staticElephant.animations.play('elephantAnimation', 14, true);

        staticOstrich = Utils.SpriteSettingsControl(staticOstrich, 280, 340, 'ostrich', "true", "true", 0.5, 0.5, 0.55, 0.55, "false");
        staticOstrich.animations.add('ostrichAnimation');
        staticOstrich.animations.play('ostrichAnimation', 20, true);

        staticGiraffee = Utils.SpriteSettingsControl(staticGiraffee, 815, 290, 'giraffee', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticGiraffee.animations.add('giraffeeAnimation');
        staticGiraffee.animations.play('giraffeeAnimation', 15, true);

        staticZebra = Utils.SpriteSettingsControl(staticZebra, 895, 140, 'zebra', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticZebra.animations.add('zebraAnimation');
        staticZebra.animations.play('zebraAnimation', 15, true);

        staticSajaru = Utils.SpriteSettingsControl(staticSajaru, 895, 425, 'sajaru', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticSajaru.animations.add('sajaruAnimation');
        staticSajaru.animations.play('sajaruAnimation', 16, true);

        staticPig = Utils.SpriteSettingsControl(staticPig, 555, 335, 'pig', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticPig.animations.add('pigAnimation');
        staticPig.animations.play('pigAnimation', 15, true);

        staticMonkeyBase = Utils.SpriteSettingsControl(staticMonkeyBase, 450, 465, 'monkeyBase', "true", "true", 0.5, 0.5, 1.5, 1.5, "false");
        staticMonkey = Utils.SpriteSettingsControl(staticMonkey, 462, 468, 'monkey', "true", "true", 0.5, 0.5, 0.63, 0.63, "false");
        staticMonkey.angle = -16;
        staticMonkey.animations.add('monkeyAnimation');
        staticMonkey.animations.play('monkeyAnimation', 15, true);

        staticTurtle = Utils.SpriteSettingsControl(staticTurtle, 155, 470, 'turtle', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticTurtle.animations.add('turtleAnimation');
        staticTurtle.animations.play('turtleAnimation', 18, true);

        staticBear = Utils.SpriteSettingsControl(staticBear, 515, 580, 'bear', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticBear.animations.add('bearAnimation');
        staticBear.animations.play('bearAnimation', 9, true);

        //Load Input Items
        ostrich = Utils.ButtonSettingsControl(ostrich, 1074, 109, 'ostrich', this.OstrichBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.52, 0.52, this);
        ostrich.input.useHandCursor = true;
        ostrich.animations.add('ostrichAnimation');
        ostrich.animations.play('ostrichAnimation', 15, true);

        elephant = Utils.ButtonSettingsControl(elephant, 1074, 171, 'elephant', this.ElephantBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        elephant.input.useHandCursor = true;
        elephant.animations.add('elephantAnimation');
        elephant.animations.play('elephantAnimation', 16, true);

        giraffee = Utils.ButtonSettingsControl(giraffee, 1074, 250, 'giraffee', this.GiraffeeBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        giraffee.input.useHandCursor = true;
        giraffee.animations.add('giraffeeAnimation');
        giraffee.animations.play('giraffeeAnimation', 12, true);

        zebra = Utils.ButtonSettingsControl(zebra, 1074, 313, 'zebra', this.ZebraBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        zebra.input.useHandCursor = true;
        zebra.animations.add('zebraAnimation');
        zebra.animations.play('zebraAnimation', 12, true);

        sajaru = Utils.ButtonSettingsControl(sajaru, 1074, 369, 'sajaru', this.SajaruBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        sajaru.input.useHandCursor = true;
        sajaru.animations.add('sajaruAnimation');
        sajaru.animations.play('sajaruAnimation', 12, true);

        pig = Utils.ButtonSettingsControl(pig, 1074, 425, 'pig', this.PigBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        pig.input.useHandCursor = true;
        pig.animations.add('pigAnimation');
        pig.animations.play('pigAnimation', 13, true);

        monkey = Utils.ButtonSettingsControl(monkey, 1074, 491, 'monkey', this.MonkeyBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.63, 0.63, this);
        monkey.input.useHandCursor = true;
        monkey.animations.add('monkeyAnimation');
        monkey.animations.play('monkeyAnimation', 13, true);

        turtle = Utils.ButtonSettingsControl(turtle, 1074, 556, 'turtle', this.TurtleBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        turtle.input.useHandCursor = true;
        turtle.animations.add('turtleAnimation');
        turtle.animations.play('turtleAnimation', 15, true);

        bear = Utils.ButtonSettingsControl(bear, 1074, 611, 'bear', this.BearBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        bear.input.useHandCursor = true;
        bear.animations.add('bearAnimation');
        bear.animations.play('bearAnimation', 10, true);

        //Load Collision Areas
        ostrichCollisonArea = Utils.SpriteSettingsControl(ostrichCollisonArea, 313, 318, 'whitePixel', "true", "true", 0.5, 0.5, 35, 2, "false");
        ostrichCollisonArea.alpha = 0.001;

        elephantCollisonArea1 = Utils.SpriteSettingsControl(elephantCollisonArea1, 195, 185, 'whitePixel', "true", "true", 0.5, 0.5, 135, 40, "false");
        elephantCollisonArea1.alpha = 0.001;
        elephantCollisonArea2 = Utils.SpriteSettingsControl(elephantCollisonArea2, 150, 240, 'whitePixel', "true", "true", 0.5, 0.5, 45, 60, "false");
        elephantCollisonArea2.alpha = 0.001;

        zebraCollisonArea1 = Utils.SpriteSettingsControl(zebraCollisonArea1, 760, 160, 'whitePixel', "true", "true", 0.5, 0.5, 30, 100, "false");
        zebraCollisonArea1.alpha = 0.001;
        zebraCollisonArea2 = Utils.SpriteSettingsControl(zebraCollisonArea2, 860, 155, 'whitePixel', "true", "true", 0.5, 0.5, 140, 50, "false");
        zebraCollisonArea2.alpha = 0.001;

        giraffeeCollisonArea = Utils.SpriteSettingsControl(giraffeeCollisonArea, 890, 260, 'whitePixel', "true", "true", 0.5, 0.5, 70, 1, "false");
        giraffeeCollisonArea.alpha = 0.001;

        sajaruCollisonArea1 = Utils.SpriteSettingsControl(sajaruCollisonArea1, 840, 440, 'whitePixel', "true", "true", 0.5, 0.5, 110, 40, "false");
        sajaruCollisonArea1.alpha = 0.001;
        sajaruCollisonArea2 = Utils.SpriteSettingsControl(sajaruCollisonArea2, 900, 540, 'whitePixel', "true", "true", 0.5, 0.5, 60, 100, "false");
        sajaruCollisonArea2.alpha = 0.001;

        pigCollisonArea = Utils.SpriteSettingsControl(pigCollisonArea, 590, 312, 'whitePixel', "true", "true", 0.5, 0.5, 145, 20, "false");
        pigCollisonArea.alpha = 0.001;

        monkeyCollisonArea = Utils.SpriteSettingsControl(monkeyCollisonArea, 530, 450, 'whitePixel', "true", "true", 0.5, 0.5, 270, 1, "false");
        monkeyCollisonArea.alpha = 0.001;

        turtleCollisonArea = Utils.SpriteSettingsControl(turtleCollisonArea, 210, 505, 'whitePixel', "true", "true", 0.5, 0.5, 70, 160, "false");
        turtleCollisonArea.alpha = 0.001;

        bearCollisonArea1 = Utils.SpriteSettingsControl(bearCollisonArea1, 565, 580, 'whitePixel', "true", "true", 0.5, 0.5, 250, 5, "false");
        bearCollisonArea1.alpha = 0.001;
        bearCollisonArea2 = Utils.SpriteSettingsControl(bearCollisonArea2, 645, 555, 'whitePixel', "true", "true", 0.5, 0.5, 50, 50, "false");
        bearCollisonArea2.alpha = 0.001;

        game.canvas.addEventListener('mousedown', this.requestLock);
        game.input.addMoveCallback(this.moveDown, this);
    },
    update: function() {
        // console.log("The active pointer X.................."+(game.input.mouse.event.movementX)); 
    },
    OstrichBttnDown: function() {
        itemNumber = 1;
    },
    ElephantBttnDown: function() {
        itemNumber = 2;
    },
    GiraffeeBttnDown: function() {
        itemNumber = 3;
    },
    ZebraBttnDown: function() {
        itemNumber = 4;
    },
    SajaruBttnDown: function() {
        itemNumber = 5;
    },
    PigBttnDown: function() {
        itemNumber = 6;
    },
    MonkeyBttnDown: function() {
        itemNumber = 7;
    },
    TurtleBttnDown: function() {
        itemNumber = 8;
    },
    BearBttnDown: function() {
        itemNumber = 9;
    },

    checkOverlap: function(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },
    requestLock: function() {
        game.input.mouse.requestPointerLock();
    },
    moveDown: function(pointer, x, y) {
        if (game.input.activePointer.y < 105) {
            game.input.activePointer.y = 105;
        }
        if (game.input.activePointer.y > 610) {
            game.input.activePointer.y = 610;
        }
        if (game.input.activePointer.x > 1160) {
            game.input.activePointer.x = 1160;
        }
        if (game.input.activePointer.x < 110) {
            game.input.activePointer.x = 110;
        }
        // console.log("Mouse Pointer Position.................." + game.input.activePointer.x + "," + game.input.activePointer.y);
        switch (itemNumber) {
            case 1:
                if (ostrich.inputEnabled)
                    ostrich.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 2:
                if (elephant.inputEnabled)
                    elephant.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 3:
                if (giraffee.inputEnabled)
                    giraffee.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 4:
                if (zebra.inputEnabled)
                    zebra.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 5:
                if (sajaru.inputEnabled)
                    sajaru.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 6:
                if (pig.inputEnabled)
                    pig.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 7:
                if (monkey.inputEnabled)
                    monkey.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 8:
                if (turtle.inputEnabled)
                    turtle.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 9:
                if (bear.inputEnabled)
                    bear.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
        }
    },

    moveUp: function() {
        this.CheckObjCollison(ostrich, ostrichCollisonArea, 1);

        this.CheckDoubleCollisionArea(elephant, elephantCollisonArea1, elephantCollisonArea2, 2);

        this.CheckObjCollison(giraffee, giraffeeCollisonArea, 3);

        this.CheckDoubleCollisionArea(zebra, zebraCollisonArea1, zebraCollisonArea2, 4);

        this.CheckDoubleCollisionArea(sajaru, sajaruCollisonArea1, sajaruCollisonArea2, 5);

        this.CheckObjCollison(pig, pigCollisonArea, 6);
        this.CheckObjCollison(monkey, monkeyCollisonArea, 7);
        this.CheckObjCollison(turtle, turtleCollisonArea, 8);

        this.CheckDoubleCollisionArea(bear, bearCollisonArea1, bearCollisonArea2, 9);
    },

    CheckObjCollison(gameObj, collisionArea, number) {
        var name = gameObj.key;
        if (this.checkOverlap(gameObj, collisionArea)) {
            gameObj.inputEnabled = false;
        }
        if (!this.checkOverlap(gameObj, collisionArea) && itemNumber == number && !this.checkOverlap(gameObj, sideBar)) {
            if (!isCollisionCheck) {
                var animName = this.ReturnAnimationName(number);
                console.log("animName: " + animName);
                var animSpeed = this.ReturnAnimationSpeed(number);
                console.log("animSpeed  : " + animSpeed);
                isCollisionCheck = true;
                console.log("Enter into the Close Bttn" + name);
                gameObj.loadTexture('crossIcon');
                setTimeout(() => {
                    console.log("Enter into the Image Change Bttn");
                    gameObj.loadTexture(name);
                    gameObj.animations.play(animName, animSpeed, true);
                    isCollisionCheck = false;
                }, 500);
            }
        }
    },

    ReturnAnimationName: function(_number) {
        var name = "";
        var speed;
        switch (_number) {
            case 1:
                name = "ostrichAnimation";
                break;
            case 2:
                name = "elephantAnimation";
                break;
            case 3:
                name = "giraffeeAnimation";
                break;
            case 4:
                name = "zebraAnimation";
                break;
            case 5:
                name = "sajaruAnimation";
                break;
            case 6:
                name = "pigAnimation";
                break;
            case 7:
                name = "monkeyAnimation";
                break;
            case 8:
                name = "turtleAnimation";
                break;
            case 9:
                name = "bearAnimation";
                break;
        }
        return name;
    },
    ReturnAnimationSpeed: function(_number) {
        var speed;

        switch (_number) {
            case 1:
                speed = 15;
                break;
            case 2:
                speed = 16;
                break;
            case 3:
                speed = 12;
                break;
            case 4:
                speed = 12;
                break;
            case 5:
                speed = 12;
                break;
            case 6:
                speed = 13;
                break;
            case 7:
                speed = 13;
                break;
            case 8:
                speed = 15;
                break;
            case 9:
                speed = 10;
                break;
        }
        return speed;
    },

    CheckDoubleCollisionArea(gameObj, collisionArea1, collisionArea2, number) {
        var name = gameObj.key;
        if (this.checkOverlap(gameObj, collisionArea1) || this.checkOverlap(gameObj, collisionArea2)) {
            gameObj.inputEnabled = false;
        }
        if ((!this.checkOverlap(gameObj, collisionArea1) && itemNumber == number && !this.checkOverlap(gameObj, sideBar)) &&
            (!this.checkOverlap(gameObj, collisionArea2) && itemNumber == number && !this.checkOverlap(gameObj, sideBar))) {
            if (!isCollisionCheck) {
                var animName = this.ReturnAnimationName(number);
                console.log("animName double: " + animName);
                var animSpeed = this.ReturnAnimationSpeed(number);
                console.log("animSpeed double : " + animSpeed);
                isCollisionCheck = true;
                gameObj.loadTexture('crossIcon');
                setTimeout(() => {
                    gameObj.loadTexture(name);
                    gameObj.animations.play(animName, animSpeed, true);
                    isCollisionCheck = false;
                }, 500);
            }
        }
    },


}