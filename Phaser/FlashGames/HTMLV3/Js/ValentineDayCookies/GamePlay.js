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
//
var selectedItem;
var itemSelected;
var GamePlay = function() {};
GamePlay.prototype = {
    init: function() {
        Utils.ScaleManager();
        console.log("The Gameplay screen........................");
        if(game.device.touch){
            game.input.mouse.stop();
        }
    },
    preload: function() {
        gamePage = "GameplayScreen";
    },
    render: function() {},
    create: function() {
        itemSelected=false;
        SoundManager.CreateSound(); 
        gameplayWhiteBackground = Utils.SpriteSettingsControl(gameplayWhiteBackground, 320, 180, 'whitePixel', "true", "true", 0.5, 0.5, 10000, 10000, "false");

        gamePlayBackground = Utils.SpriteSettingsControl(gamePlayBackground, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 1280, 720, "false");

        cookiesButtonGroup = game.add.group();

        cookie1Button = Utils.ButtonSettingsControl(cookie1Button, 240, 260, 'cookie1', this.Cookie1BttnDown, null, null, null, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        cookie1Button.input.useHandCursor = true;

        cookie2Button = Utils.ButtonSettingsControl(cookie2Button, 590, 260, 'cookie2', this.Cookie2BttnDown, null, null, null, "true", "true", 0.5, 0.5, 0.65, 0.65, this);
        cookie2Button.input.useHandCursor = true;

        cookie3Button = Utils.ButtonSettingsControl(cookie3Button, 990, 260, 'cookie3', this.Cookie3BttnDown, null, null, null, "true", "true", 0.5, 0.5, 0.65, 0.65, this);
        cookie3Button.input.useHandCursor = true;

        cookiesButtonGroup.add(cookie1Button);
        cookiesButtonGroup.add(cookie2Button);
        cookiesButtonGroup.add(cookie3Button);

        //-------------------------------------------------------

        insideCookiesGroup = game.add.group();

        valentineBg = Utils.SpriteSettingsControl(valentineBg, 420, 380, 'valentineBg', "true", "true", 0.5, 0.5, 1.5, 1.5, "false");
        valentineBg.visible = false;

        sideBarLeft = Utils.SpriteSettingsControl(sideBarLeft, 140, 220, 'sideBar', "true", "true", 0.5, 0.5, 1, 1.7, "false");
        sideBarLeft.visible = false;
        sideBarRight = Utils.SpriteSettingsControl(sideBarRight, 1070, 220, 'sideBar', "true", "true", 0.5, 0.5, 1, 1.7, "false");
        sideBarRight.visible = false;

        pinkBallon = Utils.SpriteSettingsControl(pinkBallon, 410, 142, 'pinkBallon', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        pinkBallon.animations.add('pinkBallonAnimation');
        pinkBallon.animations.play('pinkBallonAnimation', 12, true);
        pinkBallon.visible = false;

        yellowBallon = Utils.SpriteSettingsControl(yellowBallon, 335, 155, 'yellowBallon', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        yellowBallon.animations.add('yellowBallonAnimation');
        yellowBallon.animations.play('yellowBallonAnimation', 12, true);
        yellowBallon.visible = false;

        insideCookie1 = Utils.ButtonSettingsControl(insideCookie1, 640, 240, 'cookie1', null, null, null, null, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        insideCookie1.input.useHandCursor = true;
        insideCookie1.visible = false;

        insideCookie2 = Utils.ButtonSettingsControl(insideCookie2, 640, 240, 'cookie2', null, null, null, null, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        insideCookie2.input.useHandCursor = true;
        insideCookie2.visible = false;

        insideCookie3 = Utils.ButtonSettingsControl(insideCookie3, 640, 240, 'cookie3', null, null, null, null, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        insideCookie3.input.useHandCursor = true;
        insideCookie3.visible = false;

        cookie1CollisonArea = Utils.SpriteSettingsControl(cookie1CollisonArea, 640, 230, 'transparentImage', "true", "true", 0.5, 0.5, 260, 430, "false");
        cookie1CollisonArea.alpha = 0.001;
        cookie1CollisonArea.visible = false;
        cookie1CollisonArea.tint = "0x000000";

        // cookie2CollisonArea = Utils.SpriteSettingsControl(cookie2CollisonArea, 650, 320, 'transparentImage', "true", "true", 0.5, 0.5, 400, 180, "false");
        cookie2CollisonArea = Utils.SpriteSettingsControl(cookie2CollisonArea, 660, 220, 'transparentImage', "true", "true", 0.5, 0.5, 350, 200, "false");
        cookie2CollisonArea.alpha = 0.001;
        cookie2CollisonArea.angle = -60;
        cookie2CollisonArea.visible = false;
        cookie2CollisonArea.tint = "0x000000";

        cookie2CollisonArea2 = Utils.SpriteSettingsControl(cookie2CollisonArea2, 520, 310, 'transparentImage', "true", "true", 0.5, 0.5, 180, 150, "false");
        cookie2CollisonArea2.alpha = 0.001;
        cookie2CollisonArea2.angle = 30;
        cookie2CollisonArea2.visible = false;
        // cookie2CollisonArea2.tint = "0x000000";

        // cookie3CollisonArea = Utils.SpriteSettingsControl(cookie2CollisonArea, 650, 320, 'transparentImage', "true", "true", 0.5, 0.5, 400, 180, "false");
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

        tube1 = Utils.ButtonSettingsControl(tube1, 150, 60, 'tube1', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        tube1.input.useHandCursor = true;
        tube1.prevX=150;
        tube1.prevY=60;

        tube2 = Utils.ButtonSettingsControl(tube2, 150, 130, 'tube2', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        tube2.input.useHandCursor = true;
        tube2.prevX=150;
        tube2.prevY=130;

        tube3 = Utils.ButtonSettingsControl(tube3, 150, 210, 'tube3', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        tube3.input.useHandCursor = true;
        tube3.prevX=150;
        tube3.prevY=210;

        shape4 = Utils.ButtonSettingsControl(shape4, 150, 380, 'shape4', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape4.input.useHandCursor = true;
        shape4.prevX=150;
        shape4.prevY=380;

        shape5 = Utils.ButtonSettingsControl(shape5, 975, 30, 'shape5', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        shape5.input.useHandCursor = true;
        shape5.prevX=975;
        shape5.prevY=30;

        shape6 = Utils.ButtonSettingsControl(shape6, 1050, 30, 'shape6', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 0.85, 0.85, this);
        shape6.input.useHandCursor = true;
        shape6.prevX=1050;
        shape6.prevY=30;
        
        shape7 = Utils.ButtonSettingsControl(shape7, 1115, 35, 'shape7', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape7.input.useHandCursor = true;
        shape7.prevX=1115;
        shape7.prevY=35;

        shape8 = Utils.ButtonSettingsControl(shape8, 1165, 35, 'shape8', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape8.input.useHandCursor = true;
        shape8.prevX=1165;
        shape8.prevY=35;

        shape9 = Utils.ButtonSettingsControl(shape9, 980, 100, 'shape9', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape9.input.useHandCursor = true;
        shape9.prevX=980;
        shape9.prevY=100;

        shape10 = Utils.ButtonSettingsControl(shape10, 1070, 130, 'shape10', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        shape10.input.useHandCursor = true;
        shape10.prevX=1070;
        shape10.prevY=130;

        shape11 = Utils.ButtonSettingsControl(shape11, 1160, 100, 'shape11', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 0.6, 0.6, this);
        shape11.input.useHandCursor = true;
        shape11.prevX=1160;
        shape11.prevY=100;

        shape12 = Utils.ButtonSettingsControl(shape12, 1020, 180, 'shape12', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 0.65, 0.65, this);
        shape12.input.useHandCursor = true;
        shape12.prevX=1020;
        shape12.prevY=180;

        shape13 = Utils.ButtonSettingsControl(shape13, 1135, 180, 'shape13', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 0.65, 0.65, this);
        shape13.input.useHandCursor = true;
        shape13.prevX=1135;
        shape13.prevY=180;

        shape14 = Utils.ButtonSettingsControl(shape14, 960, 260, 'shape14', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        shape14.input.useHandCursor = true;
        shape14.prevX=960;
        shape14.prevY=260;

        shape15 = Utils.ButtonSettingsControl(shape15, 1010, 260, 'shape15', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        shape15.input.useHandCursor = true;
        shape15.prevX=1010;
        shape15.prevY=260;

        shape16 = Utils.ButtonSettingsControl(shape16, 1055, 260, 'shape16', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        shape16.input.useHandCursor = true;
        shape16.prevX=1055;
        shape16.prevY=260;

        shape17 = Utils.ButtonSettingsControl(shape17, 1095, 260, 'shape17', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        shape17.input.useHandCursor = true;
        shape17.prevX=1095;
        shape17.prevY=260;
        shape18 = Utils.ButtonSettingsControl(shape18, 1135, 260, 'shape18', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        shape18.input.useHandCursor = true;
        shape18.prevX=1135;
        shape18.prevY=260;

        shape19 = Utils.ButtonSettingsControl(shape19, 1180, 260, 'shape19', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        shape19.input.useHandCursor = true;
        shape19.prevX=1180;
        shape19.prevY=260;

        shape20 = Utils.ButtonSettingsControl(shape20, 1000, 340, 'shape20', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        shape20.input.useHandCursor = true;
        shape20.prevX=1000;
        shape20.prevY=340;
        
        shape21 = Utils.ButtonSettingsControl(shape21, 1140, 340, 'shape21', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        shape21.input.useHandCursor = true;
        shape21.prevX=1140;
        shape21.prevY=340;

        shape22 = Utils.ButtonSettingsControl(shape22, 1060, 410, 'shape22', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        shape22.input.useHandCursor = true;
        shape22.prevX=1060;
        shape22.prevY=410;

        shape23 = Utils.ButtonSettingsControl(shape23, 1005, 490, 'shape23', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        shape23.input.useHandCursor = true;
        shape23.prevX=1005;
        shape23.prevY=490;

        shape24 = Utils.ButtonSettingsControl(shape24, 1140, 490, 'shape24', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        shape24.input.useHandCursor = true;
        shape24.prevX=1140;
        shape24.prevY=490;

        frost1 = Utils.ButtonSettingsControl(frost1, 630, 260, 'frost1', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        frost1.input.useHandCursor = true;
        frost1.visible = false;
        frost1.prevX=630;
        frost1.prevY=260;

        frost2 = Utils.ButtonSettingsControl(frost2, 630, 230, 'frost2', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        frost2.input.useHandCursor = true;
        frost2.visible = false;
        frost2.prevX=630;
        frost2.prevY=230;

        frost3 = Utils.ButtonSettingsControl(frost3, 650, 235, 'frost3', this.SelectItem, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        frost3.input.useHandCursor = true;
        frost3.visible = false;
        frost3.prevX=650;
        frost3.prevY=235;

        doneButton = Utils.ButtonSettingsControl(doneButton, 860, 480, 'doneButton', this.DoneBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
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

    SelectItem:function(obj)
    {
        if(!itemSelected)
        {
            selectedItem=obj;
            itemSelected=true;

        }
        else
        {
            this.PutObjectToPlace(obj, cookie1CollisonArea);
            this.PutObjectToPlaceDouble(obj, cookie2CollisonArea, cookie2CollisonArea2);
            this.PutObjectToPlaceDouble(obj, cookie2CollisonArea, cookie2CollisonArea2);
        }
    },
    DoneBttnDown: function() {
        console.log("DoneBttnDown");
        allShapesGroup.children.forEach(element=>element.inputEnabled=false);
        insideCookiesGroup.children.forEach(element=>element.inputEnabled=false);
        allShapesGroup.visible = false;
        sideBarLeft.visible = false;
        sideBarRight.visible = false;
        doneButton.visible = false;
        tube1.visible = false;
        tube2.visible = false;
        tube3.visible = false;
        valentineBg.visible = true;
        pinkBallon.visible = true;
        yellowBallon.visible = true;
        SoundManager.PlayVideoEndSound(); 
    },

    checkOverlap: function(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    requestLock: function() {
        console.log("ENter into the request lock");
        // game.input.mouse.requestPointerLock();
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
        if(itemSelected)
        {
            if(selectedItem!=null)
            {
                selectedItem.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                // selectedItem.position.set(game.input.activePointer.x, game.input.activePointer.y);
            }
        }
        
    },

    PutObjectToPlace: function(gameObj, collisionArea) {
        var name = gameObj.key;
        if (this.checkOverlap(gameObj, collisionArea)) {
            allShapesGroup.removeChild(gameObj);
            insideCookiesGroup.add(gameObj);
            itemSelected=false;
            // gameObj.position.set(game.input.activePointer.x, game.input.activePointer.y);
            gameObj.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));

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
        else
        {
            this.PositionReset();
        }
    },
    PositionReset:function()
    {
        console.log(selectedItem.key);
        if (selectedItem.key == "frost1") 
        {
            selectedItem.visible = false;
            tube1.visible = true;
            insideCookiesGroup.removeChild(frost1);
            allShapesGroup.add(frost1);
            tube1.position.set(tube1.prevX,tube1.prevY);
            frost1.position.set(frost1.prevX,frost1.prevY);
        }
        else  if (selectedItem.key == "frost2") 
        {
            selectedItem.visible = false;
            tube2.visible = true;
            tube2.position.set(tube2.prevX,tube2.prevY);
            frost2.position.set(frost2.prevX,frost2.prevY);
            insideCookiesGroup.removeChild(frost2);
            allShapesGroup.add(frost2);
        }
        else   if (selectedItem.key == "frost3") 
        {
            selectedItem.visible = false;
            tube3.visible = true;
            tube3.position.set(tube3.prevX,tube3.prevY);
            frost3.position.set(frost3.prevX,frost3.prevY);
            insideCookiesGroup.removeChild(frost3);
            allShapesGroup.add(frost3);
        }
        selectedItem.position.set(selectedItem.prevX,selectedItem.prevY);

        // selectedItem=null;  
        itemSelected=false;
    },
    PutObjectToPlaceDouble: function(gameObj, collisionArea, collisionArea2) {
        var name = gameObj.key;
        if (this.checkOverlap(gameObj, collisionArea) || this.checkOverlap(gameObj, collisionArea2)) {
            allShapesGroup.removeChild(gameObj);
            insideCookiesGroup.add(gameObj);
            // gameObj.inputEnabled = false;
            itemSelected=false;
            // selectedItem=null;
            // gameObj.position.set(game.input.activePointer.x, game.input.activePointer.y);
            gameObj.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));

            if (gameObj.key == "tube1") {
                gameObj.visible = false;
                frost1.visible = true;
                allShapesGroup.removeChild(frost1);
                insideCookiesGroup.add(frost1);
                frost1.position.set(frost1.prevX,frost1.prevY);
            } else if (gameObj.key == "tube2") {
                gameObj.visible = false;
                frost2.visible = true;
                allShapesGroup.removeChild(frost2);
                insideCookiesGroup.add(frost2);
                frost2.position.set(frost2.prevX,frost2.prevY);
            } else if (gameObj.key == "tube3") {
                gameObj.visible = false;
                frost3.visible = true;
                allShapesGroup.removeChild(frost3);
                insideCookiesGroup.add(frost3);
                frost3.position.set(frost3.prevX,frost3.prevY);
            }
        }
    },


}