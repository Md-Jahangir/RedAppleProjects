var gameplayWhiteBackground;
var gamePlayBackground;
var itemNumber = 0;
var counter = 0;

var cookiesButtonGroup;
var cookie1Button;
var cookie2Button;
var cookie3Button;

var insideCookiesGroup;
var valentineBg;
var insideCookie1;
var insideCookie2;
var insideCookie3;
var cookie1CollisonArea;
var cookie2CollisonArea;
var cookie3CollisonArea;
var yellowBallon;
var pinkBallon;

var allShapesGroup;
var sideBarLeft;
var sideBarRight;
var tube1;
var tube2;
var tube3;
var shape4;
var shape5;
var shape6;
var shape7;
var shape8;
var shape9;
var shape10;
var shape11;
var shape12;
var shape13;
var shape14;
var shape15;
var shape16;
var shape17;
var shape18;
var shape19;
var shape20;
var shape21;
var shape22;
var shape23;
var shape24;
var frost1;
var frost2;
var frost3;
var doneButton;

var cookie2CollisonArea2;

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

        cookiesButtonGroup = game.add.group();

        cookie1Button = Utils.ButtonSettingsControl(cookie1Button, 240, 360, 'cookie1', this.Cookie1BttnDown, null, null, null, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        cookie1Button.input.useHandCursor = true;

        cookie2Button = Utils.ButtonSettingsControl(cookie2Button, 590, 360, 'cookie2', this.Cookie2BttnDown, null, null, null, "true", "true", 0.5, 0.5, 0.65, 0.65, this);
        cookie2Button.input.useHandCursor = true;

        cookie3Button = Utils.ButtonSettingsControl(cookie3Button, 990, 360, 'cookie3', this.Cookie3BttnDown, null, null, null, "true", "true", 0.5, 0.5, 0.65, 0.65, this);
        cookie3Button.input.useHandCursor = true;

        cookiesButtonGroup.add(cookie1Button);
        cookiesButtonGroup.add(cookie2Button);
        cookiesButtonGroup.add(cookie3Button);

        //-------------------------------------------------------

        insideCookiesGroup = game.add.group();

        valentineBg = Utils.SpriteSettingsControl(valentineBg, 640, 360, 'valentineBg', "true", "true", 0.5, 0.5, 1, 1, "false");
        valentineBg.visible = false;

        sideBarLeft = Utils.SpriteSettingsControl(sideBarLeft, 200, 360, 'sideBar', "true", "true", 0.5, 0.5, 1, 1.7, "false");
        sideBarLeft.visible = false;
        sideBarRight = Utils.SpriteSettingsControl(sideBarRight, 1070, 360, 'sideBar', "true", "true", 0.5, 0.5, 1, 1.7, "false");
        sideBarRight.visible = false;

        pinkBallon = Utils.SpriteSettingsControl(pinkBallon, 410, 182, 'pinkBallon', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        pinkBallon.animations.add('pinkBallonAnimation');
        pinkBallon.animations.play('pinkBallonAnimation', 12, true);
        pinkBallon.visible = false;

        yellowBallon = Utils.SpriteSettingsControl(yellowBallon, 335, 195, 'yellowBallon', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        yellowBallon.animations.add('yellowBallonAnimation');
        yellowBallon.animations.play('yellowBallonAnimation', 12, true);
        yellowBallon.visible = false;

        insideCookie1 = Utils.ButtonSettingsControl(insideCookie1, 640, 360, 'cookie1', null, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        insideCookie1.input.useHandCursor = true;
        insideCookie1.visible = false;

        insideCookie2 = Utils.ButtonSettingsControl(insideCookie2, 640, 360, 'cookie2', null, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        insideCookie2.input.useHandCursor = true;
        insideCookie2.visible = false;

        insideCookie3 = Utils.ButtonSettingsControl(insideCookie3, 640, 360, 'cookie3', null, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        insideCookie3.input.useHandCursor = true;
        insideCookie3.visible = false;

        cookie1CollisonArea = Utils.SpriteSettingsControl(cookie1CollisonArea, 640, 370, 'whitePixel', "true", "true", 0.5, 0.5, 260, 430, "false");
        cookie1CollisonArea.alpha = 0.001;
        cookie1CollisonArea.visible = false;
        cookie1CollisonArea.tint = "0x000000";

        // cookie2CollisonArea = Utils.SpriteSettingsControl(cookie2CollisonArea, 650, 320, 'whitePixel', "true", "true", 0.5, 0.5, 400, 180, "false");
        cookie2CollisonArea = Utils.SpriteSettingsControl(cookie2CollisonArea, 710, 350, 'whitePixel', "true", "true", 0.5, 0.5, 350, 200, "false");
        cookie2CollisonArea.alpha = 0.001;
        cookie2CollisonArea.angle = -60;
        cookie2CollisonArea.visible = false;
        cookie2CollisonArea.tint = "0x000000";

        cookie2CollisonArea2 = Utils.SpriteSettingsControl(cookie2CollisonArea2, 520, 310, 'whitePixel', "true", "true", 0.5, 0.5, 180, 150, "false");
        cookie2CollisonArea2.alpha = 0.001;
        cookie2CollisonArea2.angle = 30;
        cookie2CollisonArea2.visible = false;
        // cookie2CollisonArea2.tint = "0x000000";

        // cookie3CollisonArea = Utils.SpriteSettingsControl(cookie2CollisonArea, 650, 320, 'whitePixel', "true", "true", 0.5, 0.5, 400, 180, "false");
        // // cookie3CollisonArea.alpha = 0.001;
        // cookie3CollisonArea.visible = false;
        // cookie3CollisonArea.tint = "0x000000";

        insideCookiesGroup.add(valentineBg);
        insideCookiesGroup.add(sideBarLeft);
        insideCookiesGroup.add(sideBarRight);
        insideCookiesGroup.add(pinkBallon);
        insideCookiesGroup.add(yellowBallon);
        insideCookiesGroup.add(insideCookie1);
        insideCookiesGroup.add(cookie1CollisonArea);
        insideCookiesGroup.add(insideCookie2);
        insideCookiesGroup.add(cookie2CollisonArea);
        insideCookiesGroup.add(cookie2CollisonArea2);
        insideCookiesGroup.add(insideCookie3);
        // insideCookiesGroup.add(cookie3CollisonArea);

        insideCookiesGroup.visible = false;

        //---------------------------------------------------------------------

        allShapesGroup = game.add.group();

        // sideBarLeft = Utils.SpriteSettingsControl(sideBarLeft, 200, 360, 'sideBar', "true", "true", 0.5, 0.5, 1, 1.7, "false");
        // sideBarRight = Utils.SpriteSettingsControl(sideBarRight, 1070, 360, 'sideBar', "true", "true", 0.5, 0.5, 1, 1.7, "false");

        tube1 = Utils.ButtonSettingsControl(tube1, 200, 120, 'tube1', this.Tube1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        tube1.input.useHandCursor = true;

        tube2 = Utils.ButtonSettingsControl(tube2, 200, 200, 'tube2', this.Tube2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        tube2.input.useHandCursor = true;

        tube3 = Utils.ButtonSettingsControl(tube3, 200, 280, 'tube3', this.Tube3BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        tube3.input.useHandCursor = true;

        shape4 = Utils.ButtonSettingsControl(shape4, 200, 500, 'shape4', this.Shape4BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        shape4.input.useHandCursor = true;

        shape5 = Utils.ButtonSettingsControl(shape5, 975, 100, 'shape5', this.Shape5BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape5.input.useHandCursor = true;

        shape6 = Utils.ButtonSettingsControl(shape6, 1050, 100, 'shape6', this.Shape6BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.85, 0.85, this);
        shape6.input.useHandCursor = true;

        shape7 = Utils.ButtonSettingsControl(shape7, 1115, 105, 'shape7', this.Shape7BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape7.input.useHandCursor = true;

        shape8 = Utils.ButtonSettingsControl(shape8, 1175, 105, 'shape8', this.Shape8BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape8.input.useHandCursor = true;

        shape9 = Utils.ButtonSettingsControl(shape9, 980, 170, 'shape9', this.Shape9BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape9.input.useHandCursor = true;

        shape10 = Utils.ButtonSettingsControl(shape10, 1070, 200, 'shape10', this.Shape10BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape10.input.useHandCursor = true;

        shape11 = Utils.ButtonSettingsControl(shape11, 1160, 170, 'shape11', this.Shape11BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.6, 0.6, this);
        shape11.input.useHandCursor = true;

        shape12 = Utils.ButtonSettingsControl(shape12, 1020, 250, 'shape12', this.Shape12BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.65, 0.65, this);
        shape12.input.useHandCursor = true;

        shape13 = Utils.ButtonSettingsControl(shape13, 1135, 250, 'shape13', this.Shape13BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.65, 0.65, this);
        shape13.input.useHandCursor = true;

        shape14 = Utils.ButtonSettingsControl(shape14, 960, 330, 'shape14', this.Shape14BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        shape14.input.useHandCursor = true;

        shape15 = Utils.ButtonSettingsControl(shape15, 1010, 360, 'shape15', this.Shape15BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        shape15.input.useHandCursor = true;

        shape16 = Utils.ButtonSettingsControl(shape16, 1055, 330, 'shape16', this.Shape16BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        shape16.input.useHandCursor = true;

        shape17 = Utils.ButtonSettingsControl(shape17, 1095, 360, 'shape17', this.Shape17BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        shape17.input.useHandCursor = true;

        shape18 = Utils.ButtonSettingsControl(shape18, 1135, 330, 'shape18', this.Shape18BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        shape18.input.useHandCursor = true;

        shape19 = Utils.ButtonSettingsControl(shape19, 1180, 360, 'shape19', this.Shape19BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        shape19.input.useHandCursor = true;

        shape20 = Utils.ButtonSettingsControl(shape20, 1000, 450, 'shape20', this.Shape20BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        shape20.input.useHandCursor = true;

        shape21 = Utils.ButtonSettingsControl(shape21, 1140, 450, 'shape21', this.Shape21BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        shape21.input.useHandCursor = true;

        shape22 = Utils.ButtonSettingsControl(shape22, 1060, 530, 'shape22', this.Shape22BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        shape22.input.useHandCursor = true;

        shape23 = Utils.ButtonSettingsControl(shape23, 1005, 620, 'shape23', this.Shape23BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        shape23.input.useHandCursor = true;

        shape24 = Utils.ButtonSettingsControl(shape24, 1140, 620, 'shape24', this.Shape24BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        shape24.input.useHandCursor = true;

        frost1 = Utils.ButtonSettingsControl(frost1, 630, 390, 'frost1', null, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        frost1.input.useHandCursor = true;
        frost1.visible = false;

        frost2 = Utils.ButtonSettingsControl(frost2, 630, 360, 'frost2', null, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        frost2.input.useHandCursor = true;
        frost2.visible = false;

        frost3 = Utils.ButtonSettingsControl(frost3, 650, 365, 'frost3', null, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        frost3.input.useHandCursor = true;
        frost3.visible = false;

        doneButton = Utils.ButtonSettingsControl(doneButton, 860, 625, 'doneButton', this.DoneBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        doneButton.input.useHandCursor = true;


        // allShapesGroup.add(sideBarLeft);
        // allShapesGroup.add(sideBarRight);
        allShapesGroup.add(tube1);
        allShapesGroup.add(tube2);
        allShapesGroup.add(tube3);
        allShapesGroup.add(shape4);
        allShapesGroup.add(shape5);
        allShapesGroup.add(shape6);
        allShapesGroup.add(shape7);
        allShapesGroup.add(shape8);
        allShapesGroup.add(shape9);
        allShapesGroup.add(shape10);
        allShapesGroup.add(shape11);
        allShapesGroup.add(shape12);
        allShapesGroup.add(shape13);
        allShapesGroup.add(shape14);
        allShapesGroup.add(shape15);
        allShapesGroup.add(shape16);
        allShapesGroup.add(shape17);
        allShapesGroup.add(shape18);
        allShapesGroup.add(shape19);
        allShapesGroup.add(shape20);
        allShapesGroup.add(shape21);
        allShapesGroup.add(shape22);
        allShapesGroup.add(shape23);
        allShapesGroup.add(shape24);
        allShapesGroup.add(frost1);
        allShapesGroup.add(frost2);
        allShapesGroup.add(frost3);
        allShapesGroup.add(doneButton);

        allShapesGroup.visible = false;


        game.canvas.addEventListener('mousedown', this.requestLock);
        game.input.addMoveCallback(this.moveDown, this);
    },

    ShowSelectedCookie: function(_cookieName, _cookieCollisionArea, _cookieCollisionArea2 = null) {
        cookiesButtonGroup.visible = false;
        insideCookiesGroup.visible = true;
        sideBarLeft.visible = true;
        sideBarRight.visible = true;
        allShapesGroup.visible = true;
        _cookieName.visible = true;
        _cookieCollisionArea.visible = true;
        if (_cookieCollisionArea2 != null) {
            _cookieCollisionArea2.visible = true;
        }

    },

    update: function() {
        // console.log("The active pointer X.................." + (game.input.mouse.event.movementX));
    },
    Cookie1BttnDown: function() {
        console.log("Cookie1BttnDown");
        this.ShowSelectedCookie(insideCookie1, cookie1CollisonArea, null);
    },
    Cookie2BttnDown: function() {
        console.log("Cookie2BttnDown");
        this.ShowSelectedCookie(insideCookie2, cookie2CollisonArea, cookie2CollisonArea2);
    },
    Cookie3BttnDown: function() {
        console.log("Cookie3BttnDown");
        // this.ShowSelectedCookie(insideCookie3, cookie3CollisonArea);
        this.ShowSelectedCookie(insideCookie3, cookie2CollisonArea, cookie2CollisonArea2);
    },

    Tube1BttnDown: function() {
        itemNumber = 1;
    },
    Tube2BttnDown: function() {
        itemNumber = 2;
    },
    Tube3BttnDown: function() {
        itemNumber = 3;
    },
    Shape4BttnDown: function() {
        itemNumber = 4;
    },
    Shape5BttnDown: function() {
        itemNumber = 5;
    },
    Shape6BttnDown: function() {
        itemNumber = 6;
    },
    Shape7BttnDown: function() {
        itemNumber = 7;
    },
    Shape8BttnDown: function() {
        itemNumber = 8;
    },
    Shape9BttnDown: function() {
        itemNumber = 9;
    },
    Shape10BttnDown: function() {
        itemNumber = 10;
    },
    Shape11BttnDown: function() {
        itemNumber = 11;
    },
    Shape12BttnDown: function() {
        itemNumber = 12;
    },
    Shape13BttnDown: function() {
        itemNumber = 13;
    },
    Shape14BttnDown: function() {
        itemNumber = 14;
    },
    Shape15BttnDown: function() {
        itemNumber = 15;
    },
    Shape16BttnDown: function() {
        itemNumber = 16;
    },
    Shape17BttnDown: function() {
        itemNumber = 17;
    },
    Shape18BttnDown: function() {
        itemNumber = 18;
    },
    Shape19BttnDown: function() {
        itemNumber = 19;
    },
    Shape20BttnDown: function() {
        itemNumber = 20;
    },
    Shape21BttnDown: function() {
        itemNumber = 21;
    },
    Shape22BttnDown: function() {
        itemNumber = 22;
    },
    Shape23BttnDown: function() {
        itemNumber = 23;
    },
    Shape24BttnDown: function() {
        itemNumber = 24;
    },


    DoneBttnDown: function() {
        console.log("DoneBttnDown");
        allShapesGroup.visible = false;
        sideBarLeft.visible = false;
        sideBarRight.visible = false;
        doneButton.visible = false;

        valentineBg.visible = true;
        pinkBallon.visible = true;
        yellowBallon.visible = true;
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
        if (game.input.activePointer.x > 1160) {
            game.input.activePointer.x = 1160;
        }
        if (game.input.activePointer.x < 90) {
            game.input.activePointer.x = 90;
        }
        // console.log("Mouse Pointer Position.................." + game.input.activePointer.x + "," + game.input.activePointer.y);
        switch (itemNumber) {
            case 1:
                if (tube1.inputEnabled)
                    tube1.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 2:
                if (tube2.inputEnabled)
                    tube2.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 3:
                if (tube3.inputEnabled)
                    tube3.position.set(game.input.activePointer.x, game.input.activePointer.y);
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
            case 12:
                if (shape12.inputEnabled)
                    shape12.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 13:
                if (shape13.inputEnabled)
                    shape13.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 14:
                if (shape14.inputEnabled)
                    shape14.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 15:
                if (shape15.inputEnabled)
                    shape15.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 16:
                if (shape16.inputEnabled)
                    shape16.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 17:
                if (shape17.inputEnabled)
                    shape17.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 18:
                if (shape18.inputEnabled)
                    shape18.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 19:
                if (shape19.inputEnabled)
                    shape19.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 20:
                if (shape20.inputEnabled)
                    shape20.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 21:
                if (shape21.inputEnabled)
                    shape21.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 22:
                if (shape22.inputEnabled)
                    shape22.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 23:
                if (shape23.inputEnabled)
                    shape23.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 24:
                if (shape24.inputEnabled)
                    shape24.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
        }
    },

    moveUp: function(_this) {
        this.PutObjectToPlace(_this, cookie1CollisonArea);
        this.PutObjectToPlaceDouble(_this, cookie2CollisonArea, cookie2CollisonArea2);
        this.PutObjectToPlaceDouble(_this, cookie2CollisonArea, cookie2CollisonArea2);
    },

    PutObjectToPlace: function(gameObj, collisionArea) {
        var name = gameObj.key;
        if (this.checkOverlap(gameObj, collisionArea)) {
            allShapesGroup.removeChild(gameObj);
            insideCookiesGroup.add(gameObj);
            gameObj.inputEnabled = false;
            gameObj.position.set(game.input.activePointer.x, game.input.activePointer.y);

            if (gameObj.key == "tube1") {
                gameObj.visible = false;
                frost1.visible = true;
                allShapesGroup.removeChild(frost1);
                insideCookiesGroup.add(frost1);
            } else if (gameObj.key == "tube2") {
                gameObj.visible = false;
                frost2.visible = true;
                allShapesGroup.removeChild(frost2);
                insideCookiesGroup.add(frost2);
            } else if (gameObj.key == "tube3") {
                gameObj.visible = false;
                frost3.visible = true;
                allShapesGroup.removeChild(frost3);
                insideCookiesGroup.add(frost3);
            }
        }
    },
    PutObjectToPlaceDouble: function(gameObj, collisionArea, collisionArea2) {
        var name = gameObj.key;
        if (this.checkOverlap(gameObj, collisionArea) || this.checkOverlap(gameObj, collisionArea2)) {
            allShapesGroup.removeChild(gameObj);
            insideCookiesGroup.add(gameObj);
            gameObj.inputEnabled = false;
            gameObj.position.set(game.input.activePointer.x, game.input.activePointer.y);

            if (gameObj.key == "tube1") {
                gameObj.visible = false;
                frost1.visible = true;
                allShapesGroup.removeChild(frost1);
                insideCookiesGroup.add(frost1);
            } else if (gameObj.key == "tube2") {
                gameObj.visible = false;
                frost2.visible = true;
                allShapesGroup.removeChild(frost2);
                insideCookiesGroup.add(frost2);
            } else if (gameObj.key == "tube3") {
                gameObj.visible = false;
                frost3.visible = true;
                allShapesGroup.removeChild(frost3);
                insideCookiesGroup.add(frost3);
            }
        }
    },


}