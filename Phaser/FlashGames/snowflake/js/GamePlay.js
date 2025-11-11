var gameplayWhiteBackground;
var gamePlayBackground;
var sideBar;

var straightLine;

var shape1;
var shape2;
var shape3;
var shape4;
var shape5;
var shape6;
var shape7;
var shape8;
var shape9;
var shape10;
var shape11;
var doneButton;
var rotateButton;
var snowflakeBg;

var itemNumber = 0;
var counter = 0;
var rotationButtonCounter = 0;
var rotationGroup;
var allShapesGroup;
var rotationGrouptemp;
var straightLineCollisionArea;

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

        gamePlayBackground = Utils.SpriteSettingsControl(gamePlayBackground, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 1280, 720, "false");

        snowflakeBg = Utils.SpriteSettingsControl(snowflakeBg, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 860, 600, "false");
        snowflakeBg.tint = "0x66ccff";
        snowflakeBg.visible = false;

        Snowflakes.CreateSnowFlakes();
        Snowflakes.VisibleInvisibleSnow(false);


        allShapesGroup = game.add.group();

        sideBar = Utils.SpriteSettingsControl(sideBar, 1100, 360, 'sideBar', "true", "true", 0.5, 0.5, 0.8, 2, "false");

        //Load Input Items
        shape1 = Utils.ButtonSettingsControl(shape1, 1020, 90, 'shape1', this.Shape1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape1.input.useHandCursor = true;

        shape2 = Utils.ButtonSettingsControl(shape2, 1055, 90, 'shape2', this.Shape2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape2.input.useHandCursor = true;

        shape3 = Utils.ButtonSettingsControl(shape3, 1095, 92, 'shape3', this.Shape3BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape3.input.useHandCursor = true;

        shape4 = Utils.ButtonSettingsControl(shape4, 1158, 90, 'shape4', this.Shape4BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape4.input.useHandCursor = true;

        shape5 = Utils.ButtonSettingsControl(shape5, 1030, 190, 'shape5', this.Shape5BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape5.input.useHandCursor = true;

        shape6 = Utils.ButtonSettingsControl(shape6, 1160, 190, 'shape6', this.Shape6BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape6.input.useHandCursor = true;

        shape7 = Utils.ButtonSettingsControl(shape7, 1095, 390, 'shape7', this.Shape7BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape7.input.useHandCursor = true;

        shape8 = Utils.ButtonSettingsControl(shape8, 1095, 490, 'shape8', this.Shape8BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape8.input.useHandCursor = true;

        shape9 = Utils.ButtonSettingsControl(shape9, 1095, 590, 'shape9', this.Shape9BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape9.input.useHandCursor = true;

        shape10 = Utils.ButtonSettingsControl(shape10, 1095, 190, 'shape10', this.Shape10BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape10.input.useHandCursor = true;

        shape11 = Utils.ButtonSettingsControl(shape11, 1090, 280, 'shape7', this.Shape11BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, -0.9, this);
        shape11.input.useHandCursor = true;

        allShapesGroup.add(sideBar);
        allShapesGroup.add(shape1);
        allShapesGroup.add(shape2);
        allShapesGroup.add(shape3);
        allShapesGroup.add(shape4);
        allShapesGroup.add(shape5);
        allShapesGroup.add(shape6);
        allShapesGroup.add(shape7);
        allShapesGroup.add(shape8);
        allShapesGroup.add(shape9);
        allShapesGroup.add(shape10);
        allShapesGroup.add(shape11);

        rotationGroup = game.add.group();
        rotationGroup.x = 640;
        rotationGroup.y = 360;
        rotationGroup.pivot.x = 0;
        rotationGroup.pivot.y = 0;

        //Static Items
        straightLine = Utils.SpriteSettingsControl(straightLine, 0, 0, 'straightLine', "true", "true", 0.5, 1, 1, 0.8, "false");
        rotationGroup.add(straightLine);

        // straightLineCollisionArea = Utils.SpriteSettingsControl(straightLineCollisionArea, -100, -20, 'whitePixel', "true", "true", 0.5, 0.5, 600, 500, "false");
        straightLineCollisionArea = Utils.SpriteSettingsControl(straightLineCollisionArea, 640, 330, 'whitePixel', "true", "true", 0.5, 0.5, 50, 480, "false");
        straightLineCollisionArea.alpha = 0.001;
        // straightLineCollisionArea.tint = "0x000000";

        // rotationGroup.add(straightLineCollisionArea);

        doneButton = Utils.ButtonSettingsControl(doneButton, 820, 560, 'doneButton', this.DoneBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        doneButton.input.useHandCursor = true;

        rotateButton = Utils.ButtonSettingsControl(rotateButton, 820, 560, 'rotateButton', this.RotateBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        rotateButton.input.useHandCursor = true;
        rotateButton.visible = false;


        game.canvas.addEventListener('mousedown', this.requestLock);
        game.input.addMoveCallback(this.moveDown, this);
    },

    update: function() {
        // console.log("The active pointer X.................." + (game.input.mouse.event.movementX));
    },
    Shape1BttnDown: function() {
        console.log("Shape1BttnDown");
        itemNumber = 1;
        counter++;
        console.log("counter: " + counter);
    },
    Shape2BttnDown: function() {
        itemNumber = 2;
        counter++;
    },
    Shape3BttnDown: function() {
        itemNumber = 3;
        counter++;
    },
    Shape4BttnDown: function() {
        itemNumber = 4;
        counter++;
    },
    Shape5BttnDown: function() {
        itemNumber = 5;
        counter++;
    },
    Shape6BttnDown: function() {
        itemNumber = 6;
        counter++;
    },
    Shape7BttnDown: function() {
        itemNumber = 7;
        counter++;
    },
    Shape8BttnDown: function() {
        itemNumber = 8;
        counter++;
    },
    Shape9BttnDown: function() {
        itemNumber = 9;
        counter++;
    },
    Shape10BttnDown: function() {
        itemNumber = 10;
        counter++;
    },
    Shape11BttnDown: function() {
        itemNumber = 11;
        counter++;
    },

    DoneBttnDown: function() {
        console.log("DoneBttnDown");
        allShapesGroup.visible = false;
        doneButton.visible = false;
        rotateButton.visible = true;
    },

    RotateBttnDown: function() {
        rotationButtonCounter++;
        if (rotationButtonCounter == 6) {
            rotateButton.visible = false;
            snowflakeBg.visible = true;
            Snowflakes.VisibleInvisibleSnow(true);
        }
        this.CloneOfRotationGroup();
    },

    CloneOfRotationGroup: function() {
        rotationGrouptemp = game.add.group();
        rotationGrouptemp.x = 640;
        rotationGrouptemp.y = 360;
        rotationGrouptemp.pivot.x = 0;
        rotationGrouptemp.pivot.y = 0;
        for (var i = 0; i < rotationGroup.children.length; i++) {
            var sprite = Utils.SpriteSettingsControl(sprite, rotationGroup.children[i].x, rotationGroup.children[i].y, rotationGroup.children[i].key, "true", "true", rotationGroup.children[i].anchor.x, rotationGroup.children[i].anchor.y, rotationGroup.children[i].scale.x, rotationGroup.children[i].scale.y, "false");
            rotationGrouptemp.add(sprite);
            game.world.bringToTop(sprite);
        }
        rotationGrouptemp.angle += (60 * rotationButtonCounter);
    },


    checkOverlap: function(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },
    requestLock: function() {
        console.log("ENter into the request lock");
        game.input.mouse.requestPointerLock();
    },
    moveDown: function(pointer, x, y) {

        if (game.input.activePointer.y < 40) {
            game.input.activePointer.y = 40;
        }
        if (game.input.activePointer.y > 680) {
            game.input.activePointer.y = 680;
        }
        if (game.input.activePointer.x > 1230) {
            game.input.activePointer.x = 1230;
        }
        if (game.input.activePointer.x < 50) {
            game.input.activePointer.x = 50;
        }
        // console.log("Mouse Pointer Position.................." + game.input.activePointer.x + "," + game.input.activePointer.y);
        switch (itemNumber) {
            case 1:
                if (shape1.inputEnabled)
                    shape1.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 2:
                if (shape2.inputEnabled)
                    shape2.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 3:
                if (shape3.inputEnabled)
                    shape3.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 4:
                if (shape4.inputEnabled)
                    shape4.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 5:
                if (shape5.inputEnabled)
                    shape5.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 6:
                if (shape6.inputEnabled)
                    shape6.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 7:
                if (shape7.inputEnabled)
                    shape7.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 8:
                if (shape8.inputEnabled)
                    shape8.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 9:
                if (shape9.inputEnabled)
                    shape9.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 10:
                if (shape10.inputEnabled)
                    shape10.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 11:
                if (shape11.inputEnabled)
                    shape11.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
        }
    },

    moveUp: function(_this) {
        // this.PutObjectToPlace(_this, gamePlayBackground, counter);
        this.PutObjectToPlace(_this, straightLineCollisionArea, counter);

    },

    PutObjectToPlace: function(gameObj, collisionArea, _counter) {
        var name = gameObj.key;
        if (this.checkOverlap(gameObj, collisionArea)) {
            // if (_counter == 2) {
            // counter = 0;
            allShapesGroup.removeChild(gameObj);
            rotationGroup.add(gameObj);
            gameObj.inputEnabled = false;
            gameObj.position.set(game.input.activePointer.x - rotationGroup.x, game.input.activePointer.y - rotationGroup.y);
            // }
        }
    },

    // PutObjectToPlace: function(gameObj, collisionArea, _counter) {
    //     var name = gameObj.key;
    //     if (this.checkOverlap(gameObj, collisionArea)) {
    //         if (_counter == 2) {
    //             counter = 0;
    //             allShapesGroup.removeChild(gameObj);
    //             rotationGroup.add(gameObj);
    //             gameObj.inputEnabled = false;
    //             gameObj.position.set(game.input.activePointer.x - rotationGroup.x, game.input.activePointer.y - rotationGroup.y);
    //         }
    //     }
    // },


}