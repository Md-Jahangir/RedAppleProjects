var gameplayWhiteBackground;
var gamePlayBackground;
var sideBar;
//Input Assets
var ostrich, elephant, giraffee, zebra, sajaru, pig, monkey, turtle, bear;
//collision area
var ostrichCollisonArea, elephantCollisonArea1, elephantCollisonArea2, giraffeeCollisonArea, zebraCollisonArea1, zebraCollisonArea2;
var sajaruCollisonArea1, sajaruCollisonArea2, pigCollisonArea, monkeyCollisonArea, turtleCollisonArea,turtleCollisonArea2, bearCollisonArea1, bearCollisonArea2;
var itemNumber = 0;
var isCollisionCheck = false;
var staticMonkeyBase;
//Static Elements
var staticLion1, staticLion2, staticElephant, staticOstrich, staticGiraffee, staticZebra, staticSajaru, staticPig, staticMonkey, staticTurtle, staticBear;
//claming max and min
var MaxX;
var MaxY;

var GamePlay = function() {};
GamePlay.prototype = {
    init: function() {
        Utils.ScaleManager();
        if(game.device.touch){
            game.input.mouse.stop();
        }
        var isMobile = /iPhone|iPhoneX|iPad|iPod|Android/i.test(navigator.userAgent);
        console.log("The Gameplay screen........................"+game.width+" "+game.height);

        console.log("The Gameplay screen........................"+isMobile);
    },
    preload: function() {
        gamePage = "GameplayScreen";
    },
    render: function() {},
    create: function() {
        // SoundManager.PlayGameSound(); 
        var isMobile = /iPhone|iPhoneX|iPad|iPod|Android/i.test(navigator.userAgent);
        // if(isMobile)
        // {
        //     MaxX=990;
        //     MaxY=499;
        // }
        // else
        // {
            MaxX=1160;
            MaxY=499;
        // }
        gameplayWhiteBackground = Utils.SpriteSettingsControl(gameplayWhiteBackground, 320, 180, 'whitePixel', "true", "true", 0.5, 0.5, 10000, 10000, "false");
        gamePlayBackground = Utils.SpriteSettingsControl(gamePlayBackground, 480, 280, 'backgroundImage', "true", "true", 0.5, 0.5, 1.2, 1, "false");
        sideBar = Utils.SpriteSettingsControl(sideBar, 1077, 280, 'sideBar', "true", "true", 0.5, 0.5, 1.05, 1, "false");
        sideBar.tint = "0x999999";

        //Static Items
        staticLion1 = Utils.SpriteSettingsControl(staticLion1, 420, 50, 'lion2', "true", "true", 0.5, 0.5, -0.9, 0.9, "false");
        staticLion1.animations.add('lion2Animation');
        staticLion1.animations.play('lion2Animation', 16, true);

        staticLion2 = Utils.SpriteSettingsControl(staticLion2, 550, 50, 'lion1', "true", "true", 0.5, 0.5, 0.9, 0.9, "false");
        staticLion2.animations.add('lion1Animation');
        staticLion2.animations.play('lion1Animation', 14, true);

        staticElephant = Utils.SpriteSettingsControl(staticElephant, 200, 120, 'elephant', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticElephant.animations.add('elephantAnimation');
        staticElephant.animations.play('elephantAnimation', 14, true);

        staticOstrich = Utils.SpriteSettingsControl(staticOstrich, 150, 250, 'ostrich', "true", "true", 0.5, 0.5, 0.55, 0.55, "false");
        staticOstrich.animations.add('ostrichAnimation');
        staticOstrich.animations.play('ostrichAnimation', 20, true);

        staticGiraffee = Utils.SpriteSettingsControl(staticGiraffee, 852, 230, 'giraffee', "true", "true", 0.5, 0.5, 0.7, 0.7, "false");
        staticGiraffee.animations.add('giraffeeAnimation');
        staticGiraffee.animations.play('giraffeeAnimation', 15, true);

        staticZebra = Utils.SpriteSettingsControl(staticZebra, 785, 165, 'zebra', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticZebra.animations.add('zebraAnimation');
        staticZebra.animations.play('zebraAnimation', 15, true);

        staticSajaru = Utils.SpriteSettingsControl(staticSajaru, 895, 490, 'sajaru', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticSajaru.animations.add('sajaruAnimation');
        staticSajaru.animations.play('sajaruAnimation', 16, true);

        staticPig = Utils.SpriteSettingsControl(staticPig, 440, 260, 'pig', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticPig.animations.add('pigAnimation');
        staticPig.animations.play('pigAnimation', 15, true);

        staticMonkeyBase = Utils.SpriteSettingsControl(staticMonkeyBase, 350, 375, 'monkeyBase', "true", "true", 0.5, 0.5, 1.5, 1.5, "false");
        staticMonkey = Utils.SpriteSettingsControl(staticMonkey, 352, 378, 'monkey', "true", "true", 0.5, 0.5, 0.5, 0.5, "false");
        staticMonkey.angle = -16;
        staticMonkey.animations.add('monkeyAnimation');
        staticMonkey.animations.play('monkeyAnimation', 15, true);

        staticTurtle = Utils.SpriteSettingsControl(staticTurtle, 55, 300, 'turtle', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticTurtle.animations.add('turtleAnimation');
        staticTurtle.animations.play('turtleAnimation', 18, true);

        staticBear = Utils.SpriteSettingsControl(staticBear, 380, 495, 'bear', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        staticBear.animations.add('bearAnimation');
        staticBear.animations.play('bearAnimation', 9, true);

        //Load Input Items
        ostrich = Utils.ButtonSettingsControl(ostrich, 1144, 50, 'ostrich', this.OstrichBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.5, 0.5, this);
        ostrich.input.useHandCursor = true;
        ostrich.prevX=1144;
        ostrich.prevY=50;
        ostrich.animations.add('ostrichAnimation');
        ostrich.animations.play('ostrichAnimation', 15, true);

        elephant = Utils.ButtonSettingsControl(elephant, 1044, 102, 'elephant', this.ElephantBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        elephant.input.useHandCursor = true;
        elephant.prevX=1044;
        elephant.prevY=102;
        elephant.animations.add('elephantAnimation');
        elephant.animations.play('elephantAnimation', 16, true);

        giraffee = Utils.ButtonSettingsControl(giraffee, 1144, 161, 'giraffee', this.GiraffeeBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        giraffee.input.useHandCursor = true;
        giraffee.prevX=1144;
        giraffee.prevY=161;
        giraffee.input.pixelPerfectClicked=true;
        giraffee.animations.add('giraffeeAnimation');
        giraffee.animations.play('giraffeeAnimation', 12, true);

        zebra = Utils.ButtonSettingsControl(zebra, 1030, 204, 'zebra', this.ZebraBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        zebra.input.useHandCursor = true;
        zebra.prevX=1030;
        zebra.prevY=204;
        zebra.animations.add('zebraAnimation');
        zebra.animations.play('zebraAnimation', 12, true);

        sajaru = Utils.ButtonSettingsControl(sajaru, 1124, 270, 'sajaru', this.SajaruBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        sajaru.input.useHandCursor = true;
        sajaru.prevX=1124;
        sajaru.prevY=270;
        sajaru.animations.add('sajaruAnimation');
        sajaru.animations.play('sajaruAnimation', 12, true);

        pig = Utils.ButtonSettingsControl(pig, 1034, 326, 'pig', this.PigBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        pig.input.useHandCursor = true;
        pig.prevX=1034;
        pig.prevY=326;
        pig.animations.add('pigAnimation');
        pig.animations.play('pigAnimation', 13, true);

        monkey = Utils.ButtonSettingsControl(monkey, 1144, 380, 'monkey', this.MonkeyBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.5, 0.5, this);
        monkey.input.useHandCursor = true;
        monkey.prevX=1144;
        monkey.prevY=380;
        monkey.input.pixelPerfectClicked=true;
        monkey.animations.add('monkeyAnimation');
        monkey.animations.play('monkeyAnimation', 13, true);

        turtle = Utils.ButtonSettingsControl(turtle, 1034, 430, 'turtle', this.TurtleBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);//0.8,0.8
        turtle.input.useHandCursor = true;
        turtle.prevX=1034;
        turtle.prevY=430;
        turtle.animations.add('turtleAnimation');
        turtle.animations.play('turtleAnimation', 15, true);

        bear = Utils.ButtonSettingsControl(bear, 1130, 482, 'bear', this.BearBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);//0.8,0.8
        bear.input.useHandCursor = true;
        bear.prevX=1130;
        bear.prevY=482;
        bear.animations.add('bearAnimation');
        bear.animations.play('bearAnimation', 9, true);

        //Load Collision Areas
        ostrichCollisonArea = Utils.SpriteSettingsControl(ostrichCollisonArea, 233, 250, 'transparentImage', "true", "true", 0.5, 0.5, 115, 20, "false");
        ostrichCollisonArea.alpha = 0.001;
        ostrichCollisonArea.tint="0xFFFFFF";

        elephantCollisonArea1 = Utils.SpriteSettingsControl(elephantCollisonArea1, 40, 120, 'transparentImage', "true", "true", 0.5, 0.5, 120, 5, "false");
        elephantCollisonArea1.alpha = 0.001;
        elephantCollisonArea2 = Utils.SpriteSettingsControl(elephantCollisonArea2, 5, 150, 'transparentImage', "true", "true", 0.5, 0.5, 25, 30, "false");
        elephantCollisonArea2.alpha = 0.001;

        // zebraCollisonArea1 = Utils.SpriteSettingsControl(zebraCollisonArea1, 690, 110, 'transparentImage', "true", "true", 0.5, 0.5, 30, 100, "false");
        // zebraCollisonArea1.alpha = 0.001;
        zebraCollisonArea2 = Utils.SpriteSettingsControl(zebraCollisonArea2, 810, 75, 'transparentImage', "true", "true", 0.5, 0.5, 110, 20, "false");
        zebraCollisonArea2.alpha = 0.001;

        giraffeeCollisonArea = Utils.SpriteSettingsControl(giraffeeCollisonArea, 904, 220, 'transparentImage', "true", "true", 0.5, 0.5, 1,10, "false");
        giraffeeCollisonArea.alpha = 0.001;
        giraffeeCollisonArea.angle=90;  

        sajaruCollisonArea1 = Utils.SpriteSettingsControl(sajaruCollisonArea1, 835, 360, 'transparentImage', "true", "true", 0.5, 0.5, 40, 15, "false");
        sajaruCollisonArea1.alpha = 0.001;
        // sajaruCollisonArea1.tint="0x000000";
        sajaruCollisonArea2 = Utils.SpriteSettingsControl(sajaruCollisonArea2, 860, 410, 'transparentImage', "true", "true", 0.5, 0.5, 2, 5, "false");
        sajaruCollisonArea2.alpha = 0.001;
        pigCollisonArea = Utils.SpriteSettingsControl(pigCollisonArea, 570, 230, 'transparentImage', "true", "true", 0.5, 0.5, 140, 1, "false");
        pigCollisonArea.alpha = 0.001;

        monkeyCollisonArea = Utils.SpriteSettingsControl(monkeyCollisonArea, 480, 370, 'transparentImage', "true", "true", 0.5, 0.5, 290, 1, "false");
        monkeyCollisonArea.alpha = 0.001;
        monkeyCollisonArea.inputEnabled=true;
        monkeyCollisonArea.input.pixelPerfectClicked=true;
        monkeyCollisonArea.angle=-5

        turtleCollisonArea = Utils.SpriteSettingsControl(turtleCollisonArea, 80, 405, 'transparentImage', "true", "true", 0.5, 0.5, 120, 50, "false");
        turtleCollisonArea.alpha = 0.001;
        turtleCollisonArea2 = Utils.SpriteSettingsControl(turtleCollisonArea2, 80, 505, 'transparentImage', "true", "true", 0.5, 0.5, 140, 50, "false");
        turtleCollisonArea2.alpha = 0.001;
        
        bearCollisonArea1 = Utils.SpriteSettingsControl(bearCollisonArea1, 560, 505, 'transparentImage', "true", "true", 0.5, 0.5, 220, 10, "false");
        bearCollisonArea1.alpha = 0.001;
        // bearCollisonArea2 = Utils.SpriteSettingsControl(bearCollisonArea2, 570,495, 'transparentImage', "true", "true", 0.5, 0.5, 220, 5, "false");
        bearCollisonArea2 = Utils.SpriteSettingsControl(bearCollisonArea2, 610,470, 'transparentImage', "true", "true", 0.5, 0.5, 70, 2, "false");
        bearCollisonArea2.alpha = 0.001;
        bearCollisonArea2.angle=-4;
        bearCollisonArea1.angle=-2;

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
        if (game.input.activePointer.y < 30) {
            game.input.activePointer.y = 30;
        }
        if (game.input.activePointer.y > MaxY) {
            game.input.activePointer.y = MaxY;
        }
        if (game.input.activePointer.x > MaxX) {
            game.input.activePointer.x = MaxX;
        }
        if (game.input.activePointer.x < 48) {
            game.input.activePointer.x = 48
        }
        // console.log("Mouse Pointer Position.................." + game.input.activePointer.x + "," + game.input.activePointer.y);
        switch (itemNumber) {
            case 1:
                if (ostrich.inputEnabled)
                    // ostrich.position.set(game.input.activePointer.x, game.input.activePointer.y);
                    ostrich.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));

                break;
            case 2:
                if (elephant.inputEnabled)
                    // elephant.position.set(game.input.activePointer.x, game.input.activePointer.y);
                    elephant.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));

                break;
            case 3:
                if (giraffee.inputEnabled)
                    // giraffee.position.set(game.input.activePointer.x, game.input.activePointer.y);
                    giraffee.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));

                break;
            case 4:
                if (zebra.inputEnabled)
                    // zebra.position.set(game.input.activePointer.x, game.input.activePointer.y);
                    zebra.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));

                break;
            case 5:
                if (sajaru.inputEnabled)
                    // sajaru.position.set(game.input.activePointer.x, game.input.activePointer.y);
                    sajaru.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));

                break;
            case 6:
                if (pig.inputEnabled)
                    // pig.position.set(game.input.activePointer.x, game.input.activePointer.y);
                    pig.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));

                break;
            case 7:
                if (monkey.inputEnabled)
                    // monkey.position.set(game.input.activePointer.x, game.input.activePointer.y);
                    monkey.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));

                break;
            case 8:
                if (turtle.inputEnabled)
                    // turtle.position.set(game.input.activePointer.x, game.input.activePointer.y);/
                    turtle.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((pointer.y + game.camera.position.y) / game.camera.scale.y));

                break;
            case 9:
                if (bear.inputEnabled)
                    // bear.position.set(game.input.activePointer.x, game.input.activePointer.y);
                    bear.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));

                break;
        }
    },

    moveUp: function() {
        this.CheckObjCollison(ostrich, ostrichCollisonArea, 1);

        this.CheckDoubleCollisionArea(elephant, elephantCollisonArea1, elephantCollisonArea2, 2);

        this.CheckObjCollison(giraffee, giraffeeCollisonArea, 3);

        // this.CheckDoubleCollisionArea(zebra, zebraCollisonArea1, zebraCollisonArea2, 4);
        this.CheckObjCollison(zebra, zebraCollisonArea2, 4);

        this.CheckDoubleCollisionArea(sajaru, sajaruCollisonArea1, sajaruCollisonArea2, 5);

        this.CheckObjCollison(pig, pigCollisonArea, 6);
        this.CheckObjCollison(monkey, monkeyCollisonArea, 7);
        // this.CheckObjCollison(turtle, turtleCollisonArea, 8);
        this.CheckDoubleCollisionArea(turtle, turtleCollisonArea, turtleCollisonArea2, 8);

        this.CheckDoubleCollisionArea(bear, bearCollisonArea1, bearCollisonArea2, 9);
    },

    CheckObjCollison(gameObj, collisionArea, number) {
        var name = gameObj.key;
        if (this.checkOverlap(gameObj, collisionArea)) {
            
            if(gameObj.key=="giraffee")
            {
               
                if(Math.abs(gameObj.x-giraffeeCollisonArea.x)<30 && Math.abs(gameObj.y-giraffeeCollisonArea.y)<17)
                {
                    gameObj.inputEnabled = false;
                }
                else
                {
                    this.ChangeTextureToCross(gameObj, number,name);
                }
            } 
            else if(gameObj.key=="monkey")
            {
               
                if(Math.abs(gameObj.x-monkeyCollisonArea.x)<30 || Math.abs(gameObj.y-monkeyCollisonArea.y)<20)
                {
                    gameObj.inputEnabled = false;
                }
                else
                {
                    this.ChangeTextureToCross(gameObj,number,name);
                }
            }
            else if(gameObj.key=="ostrich")
            {
                if(Math.abs(gameObj.y-ostrichCollisonArea.y)<15)
                {
                    gameObj.inputEnabled = false;
                }
                else
                {
                    this.ChangeTextureToCross(gameObj,number,name);
                }
            }
            else if(gameObj.key=="pig")
            {
               
                if(Math.abs(gameObj.y-pigCollisonArea.y)<35)
                {
                    gameObj.inputEnabled = false;
                }
                else
                {
                   this.ChangeTextureToCross(gameObj, number,name);
                }
            }
            else
            {
                gameObj.inputEnabled = false;
            }
        }
        if (!this.checkOverlap(gameObj, collisionArea) && itemNumber == number && !this.checkOverlap(gameObj, sideBar)) {
            if (!isCollisionCheck) 
            {       
                // var animName = this.ReturnAnimationName(number);
                //     console.log("animName: " + animName);
                //     var animSpeed = this.ReturnAnimationSpeed(number);
                //     console.log("animSpeed  : " + animSpeed);
                //     isCollisionCheck = true;
                //     console.log("Enter into the Close Bttn" + name);
                //     gameObj.loadTexture('crossIcon');
                //     gameObj.inputEnabled=false;
                //     setTimeout(() => {
                //         console.log("Enter into the Image Change Bttn");
                //         gameObj.loadTexture(name);
                //         gameObj.animations.play(animName, animSpeed, true);
                //         isCollisionCheck = false;
                //          this.PutObjectBack(gameObj);
                //         gameObj.inputEnabled=true;
                //         itemNumber=0;
                //     }, 500);
               this.ChangeTextureToCross(gameObj,number,gameObj.key);
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
    ChangeTextureToCross(gameObj,number,name)
    {
        var animName = this.ReturnAnimationName(number);
            console.log("animName: " + animName);
            var animSpeed = this.ReturnAnimationSpeed(number);
            console.log("animSpeed  : " + animSpeed);
            isCollisionCheck = true;
            console.log("Enter into the Close Bttn" + name);
            gameObj.loadTexture('crossIcon');
            gameObj.inputEnabled=false;
            setTimeout(() => {
                console.log("Enter into the Image Change Bttn");
                gameObj.loadTexture(name);
                gameObj.animations.play(animName, animSpeed, true);
                isCollisionCheck = false;
                 this.PutObjectBack(gameObj);
                gameObj.inputEnabled=true;
                itemNumber=0;
            }, 500);
    },
    PutObjectBack(gameObj)
    {
        gameObj.position.setTo(gameObj.prevX,gameObj.prevY);
    },
    CheckDoubleCollisionArea(gameObj, collisionArea1, collisionArea2, number) {
        var name = gameObj.key;
        if (this.checkOverlap(gameObj, collisionArea1) || this.checkOverlap(gameObj, collisionArea2)) {
            gameObj.inputEnabled = false;
        }
        if ((!this.checkOverlap(gameObj, collisionArea1) && itemNumber == number && !this.checkOverlap(gameObj, sideBar)) &&
            (!this.checkOverlap(gameObj, collisionArea2) && itemNumber == number && !this.checkOverlap(gameObj, sideBar))) {
            if (!isCollisionCheck) {
                // var animName = this.ReturnAnimationName(number);
                // console.log("animName double: " + animName);
                // var animSpeed = this.ReturnAnimationSpeed(number);
                // console.log("animSpeed double : " + animSpeed);
                // isCollisionCheck = true;
                // gameObj.loadTexture('crossIcon');
                // gameObj.inputEnabled=false;
                // setTimeout(() => {
                //     gameObj.loadTexture(name);
                //     gameObj.animations.play(animName, animSpeed, true);
                //     isCollisionCheck = false;
                //     this.PutObjectBack(gameObj);
                //     gameObj.inputEnabled=true;
                //     itemNumber=0;
                // }, 500);
                this.ChangeTextureToCross(gameObj,number,name);
            }
        }
    },


}