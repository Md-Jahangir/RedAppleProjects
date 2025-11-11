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
// var allShapesGroup;
var rotationGrouptemp;
var straightLineCollisionArea;

var GamePlay = function() {};
GamePlay.prototype = {
    init: function() {
        Utils.ScaleManager();
        if(game.device.touch){
            game.input.mouse.stop();
        }
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

        snowflakeBg = Utils.SpriteSettingsControl(snowflakeBg, 610, 260, 'snowflake', "true", "true", 0.5, 0.5, 1360, 600, "false");
        // snowflakeBg.tint = "0x66ccff";
    // snowflakeBg.tint = "0xe6f7ff";
        // snowflakeBg.visible = false;

        Snowflakes.CreateSnowFlakes();
        Snowflakes.VisibleInvisibleSnow(false);


        // allShapesGroup = game.add.group();

        sideBar = Utils.SpriteSettingsControl(sideBar, 1095, 280, 'sideBar', "true", "true", 0.5, 0.5, 0.8, 1.9, "false");//1095

        //Load Input Items
        shape1 = Utils.ButtonSettingsControl(shape1, 1015, 30, 'shape1', this.Shape1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape1.input.useHandCursor = true;

        shape2 = Utils.ButtonSettingsControl(shape2, 1050, 30, 'shape2', this.Shape2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape2.input.useHandCursor = true;

        shape3 = Utils.ButtonSettingsControl(shape3, 1085, 32, 'shape3', this.Shape3BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape3.input.useHandCursor = true;

        shape4 = Utils.ButtonSettingsControl(shape4, 1150, 30, 'shape4', this.Shape4BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape4.input.useHandCursor = true;

        shape5 = Utils.ButtonSettingsControl(shape5, 1025, 110, 'shape5', this.Shape5BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape5.input.useHandCursor = true;

        shape6 = Utils.ButtonSettingsControl(shape6, 1150, 110, 'shape6', this.Shape6BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape6.input.useHandCursor = true;

        shape7 = Utils.ButtonSettingsControl(shape7, 1085, 310, 'shape7', this.Shape7BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape7.input.useHandCursor = true;

        shape8 = Utils.ButtonSettingsControl(shape8, 1085, 410, 'shape8', this.Shape8BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape8.input.useHandCursor = true;

        shape9 = Utils.ButtonSettingsControl(shape9, 1085, 490, 'shape9', this.Shape9BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape9.input.useHandCursor = true;

        shape10 = Utils.ButtonSettingsControl(shape10, 1085, 110, 'shape10', this.Shape10BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape10.input.useHandCursor = true;

        shape11 = Utils.ButtonSettingsControl(shape11, 1085, 200, 'shape7', this.Shape11BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, -0.9, this);
        shape11.input.useHandCursor = true;

        // allShapesGroup.add(sideBar);
        // allShapesGroup.add(shape1);
        // allShapesGroup.add(shape2);
        // allShapesGroup.add(shape3);
        // allShapesGroup.add(shape4);
        // allShapesGroup.add(shape5);
        // allShapesGroup.add(shape6);
        // allShapesGroup.add(shape7);
        // allShapesGroup.add(shape8);
        // allShapesGroup.add(shape9);
        // allShapesGroup.add(shape10);
        // allShapesGroup.add(shape11);

        rotationGroup = game.add.group();
        rotationGroup.x = 580;
        rotationGroup.y = 280;
        rotationGroup.pivot.x = 0;
        rotationGroup.pivot.y = 0;

        //Static Items
        straightLine = Utils.SpriteSettingsControl(straightLine, 0, 0, 'straightLine', "true", "true", 0.5, 1, 1, 0.8, "false");
        rotationGroup.add(straightLine);

        // straightLineCollisionArea = Utils.SpriteSettingsControl(straightLineCollisionArea, -100, -20, 'whitePixel', "true", "true", 0.5, 0.5, 600, 500, "false");
        straightLineCollisionArea = Utils.SpriteSettingsControl(straightLineCollisionArea, 580, 150, 'transparentImage', "true", "true", 0.5, 0.5, 50, 300, "false");
        straightLineCollisionArea.alpha = 0.001;
        // straightLineCollisionArea.tint = "0x000000";

        // rotationGroup.add(straightLineCollisionArea);

        doneButton = Utils.ButtonSettingsControl(doneButton, 920, 500, 'doneButton', this.DoneBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        doneButton.input.useHandCursor = true;

        rotateButton = Utils.ButtonSettingsControl(rotateButton, 920, 470, 'rotateButton', this.RotateBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
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
        doneButton.visible = false;
        if(rotationButtonCounter==5)
        {
            Snowflakes.VisibleInvisibleSnow(true);
        }
        else
        {
            // allShapesGroup.visible = false;
            sideBar.visible = false;
            shape1.visible = false;
            shape2.visible = false;
            shape3.visible = false;
            shape4.visible = false;
            shape5.visible = false;
            shape6.visible = false;
            shape7.visible = false;
            shape8.visible = false;
            shape9.visible = false;
            shape10.visible = false;
            shape11.visible = false;
            rotationGroup.children.forEach(element => {
                element.visible=true;
            });
            rotateButton.visible = true;
        }
    },

    RotateBttnDown: function() {
        rotationButtonCounter++;
        if (rotationButtonCounter == 5) {
            rotateButton.visible = false;
            snowflakeBg.visible = true;
            snowflakeBg.tint = "0xFFFFFF";
            doneButton.visible=true;
        }
        this.CloneOfRotationGroup();
    },

    CloneOfRotationGroup: function() {
        rotationGrouptemp = game.add.group();
        rotationGrouptemp.x = 580;
        rotationGrouptemp.y = 280;
        rotationGrouptemp.pivot.x = 0;
        rotationGrouptemp.pivot.y = 0;
        for (var i = 0; i < rotationGroup.children.length; i++) 
        {            
            var sprite = Utils.SpriteSettingsControl(sprite, rotationGroup.children[i].x, rotationGroup.children[i].y, rotationGroup.children[i].key, "true", "true", rotationGroup.children[i].anchor.x, rotationGroup.children[i].anchor.y, rotationGroup.children[i].scale.x, rotationGroup.children[i].scale.y, "false");
            rotationGrouptemp.add(sprite);
            game.world.bringToTop(sprite);
            console.log(rotationGroup.children[i].x, rotationGroup.children[i].y, rotationGroup.children[i].key);
            console.log(rotationGrouptemp.children[i].x, rotationGrouptemp.children[i].y, rotationGrouptemp.children[i].key);
        }
        rotationGrouptemp.angle += (60 * rotationButtonCounter);
        console.log(rotationGrouptemp.children[0].x, rotationGrouptemp.children[0].y, rotationGrouptemp.children[0].key);
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

        if (game.input.activePointer.y < 5) {
            game.input.activePointer.y = 5;
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
                    // shape1.position.set(game.input.activePointer.x, game.input.activePointer.y);
                    shape1.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    break;
            case 2:
                if (shape2.inputEnabled)
                    shape2.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // shape2.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 3:
                if (shape3.inputEnabled)
                    shape3.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // shape3.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 4:
                if (shape4.inputEnabled)
                shape4.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // shape4.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 5:
                if (shape5.inputEnabled)
                shape5.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // shape5.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 6:
                if (shape6.inputEnabled)
                shape6.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // shape6.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 7:
                if (shape7.inputEnabled)
                shape7.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // shape7.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 8:
                if (shape8.inputEnabled)
                shape8.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // shape8.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 9:
                if (shape9.inputEnabled)
                shape9.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // shape9.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 10:
                if (shape10.inputEnabled)
                shape10.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // shape10.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 11:
                if (shape11.inputEnabled)
                shape11.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // shape11.position.set(game.input.activePointer.x, game.input.activePointer.y);
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
            // allShapesGroup.removeChild(gameObj);
        rotationGroup.add(gameObj);
            gameObj.inputEnabled = false;
            // gameObj.position.set(game.input.activePointer.x - rotationGroup.x, game.input.activePointer.y - rotationGroup.y);
            gameObj.position.set(straightLine.position.x, ((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y) - rotationGroup.y);
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