var gameplayWhiteBackground;

var itemNumber = 0;
var counter = 0;

var firstPageItemsGroup;

var firstPageBackground;
var sideBarLeft;
var sideBarRight;

var flourText;
var flour;
var flourBlankCup;
var cocoaText;
var cocoa;
var cocoaBlankCup;
var sugarText;
var sugar;
var sugarBlankCup;
var milkText;
var milk;
var milkBlankCup;
var nutsText;
var nuts;
var nutsBlankCup;
var waterText;
var water;
var waterBlankCup;
var eggsText;
var egg1;
var egg2;
var egg3;
var eggSpritesheets;
var butterText;
var butter1;
var butter2;
var butter3;
var butter4;
var butterSpritesheets;
var bakingPowderText;
var bakingPowder1;
var bakingPowder1BlankSpoon;
var bakingPowder2;
var bakingPowder2BlankSpoon;
var saltText;
var saltBlankSpoon;
var salt;
var staticBowl;
var momsBakerText;
var bowlCollisonArea
var nextButtonBase;
var nextButtonText;
var butterPlaced;
var flourPlaced;
var cocoaPlaced;
var eggPlaced1;
var eggPlaced2;
var eggPlaced3;
var flourPlaced;
var cocoaPlaced;
var sugarPlaced;
var milkPlaced;
var nutsPlaced;
var waterPlaced;
var finalPlaced;

var blankItemName;
var placedItem;
var eggOrButterSprite;
var animationName = "";
var animationSpeed;

var secondPageItemsGroup;
var secondPageBackground;
var secondPageSideBar;
var momsBaker;
var bigSpoon;
var momsBakerCollisionArea;
var secondPageNextButtonBase;
var secondPageNextButtonText;

var thirdPageItemsGroup;
var thirdPageBackground;
var thirdPageSideBar;
var mixer;
var mixerSpritesheets;
var mixerCollisionArea;
var thirdPageNextButtonBase;
var thirdPageNextButtonText;

var fourthPageItemsGroup;
var fourthPageBackground;
var bowlPouring;
var rotateButton;
var fourthPageNextButtonBase;
var fourthPageNextButtonText;

var fifthPageItemsGroup;
var fifthPageBackground;
var ovenOn;
var ovenOff;
var onButtonBase;
var onButtonCounter = 0;
var fifthPageNextButtonBase;
var fifthPageNextButtonText;

var sixthPageItemsGroup;
var sixthPageBackground;
var thump;
var sixthPageNextButtonBase;
var sixthPageNextButtonText;
var thumpButtonBase;
var thumpButtonText;

var seventhPageItemsGroup;
var seventhPageBackground;
var yummy;

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

        firstPageItemsGroup = game.add.group();


        firstPageBackground = Utils.SpriteSettingsControl(firstPageBackground, 620, 225, 'bg', "true", "true", 0.5, 0.5, 1, 1, "false");

        staticBowl = Utils.SpriteSettingsControl(staticBowl, 640, 374, 'staticBowl', "true", "true", 0.5, 0.5, 0.7, 0.7, "false");

        eggPlaced1 = Utils.SpriteSettingsControl(eggPlaced1, 662, 430, 'eggPlaced', "true", "true", 0.5, 0.5, 0.5, 0.5, "false");
        eggPlaced1.alpha = 0.5;
        eggPlaced1.visible = false;

        eggPlaced2 = Utils.SpriteSettingsControl(eggPlaced2, 590, 420, 'eggPlaced', "true", "true", 0.5, 0.5, 0.5, 0.5, "false");
        eggPlaced2.alpha = 0.5;
        eggPlaced2.visible = false;

        eggPlaced3 = Utils.SpriteSettingsControl(eggPlaced3, 699, 403, 'eggPlaced', "true", "true", 0.5, 0.5, 0.5, 0.5, "false");
        eggPlaced3.alpha = 0.5;
        eggPlaced3.visible = false;

        butterPlaced = Utils.SpriteSettingsControl(butterPlaced, 680, 418, 'butterPlaced', "true", "true", 0.5, 0.5, 0.5, 0.5, "false");
        butterPlaced.alpha = 0.5;
        butterPlaced.visible = false;

        flourPlaced = Utils.SpriteSettingsControl(flourPlaced, 631, 415, 'flourPlaced', "true", "true", 0.5, 0.5, 1, 1, "false");
        flourPlaced.alpha = 0.5;
        flourPlaced.visible = false;

        cocoaPlaced = Utils.SpriteSettingsControl(cocoaPlaced, 636, 395, 'cocoaPlaced', "true", "true", 0.5, 0.5, 1, 1, "false");
        cocoaPlaced.alpha = 0.5;
        cocoaPlaced.visible = false;

        sugarPlaced = Utils.SpriteSettingsControl(sugarPlaced, 675, 401, 'sugarPlaced', "true", "true", 0.5, 0.5, 0.7, 0.7, "false");
        sugarPlaced.alpha = 0.5;
        sugarPlaced.visible = false;

        milkPlaced = Utils.SpriteSettingsControl(milkPlaced, 630, 380, 'milkPlaced', "true", "true", 0.5, 0.5, 1, 1, "false");
        milkPlaced.alpha = 0.5;
        milkPlaced.visible = false;

        nutsPlaced = Utils.SpriteSettingsControl(nutsPlaced, 640, 430, 'nutsPlaced', "true", "true", 0.5, 0.5, 0.5, 0.5, "false");
        nutsPlaced.alpha = 0.5;
        nutsPlaced.visible = false;

        waterPlaced = Utils.SpriteSettingsControl(waterPlaced, 640, 385, 'waterPlaced', "true", "true", 0.5, 0.5, 1, 1, "false");
        waterPlaced.alpha = 0.5;
        waterPlaced.visible = false;

        finalPlaced = Utils.SpriteSettingsControl(finalPlaced, 640, 397, 'finalPlaced', "true", "true", 0.5, 0.5, 1, 1, "false");
        finalPlaced.alpha = 0.5;
        finalPlaced.visible = false;

        momsBakerText = game.add.text(590, 355, "Mom's\nBaker", { font: 'bold 35px Arial', fill: '#ffff00' });
        nextButtonBase = Utils.ButtonSettingsControl(nextButtonBase, 640, 495, 'nextButtonBase', this.NextBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        nextButtonBase.input.useHandCursor = true;
        nextButtonText = game.add.text(-40, -23, "Next", { font: 'bold 40px Arial', fill: '#ff2400' });
        nextButtonBase.addChild(nextButtonText);
        nextButtonBase.visible = false;

        bowlCollisonArea = Utils.SpriteSettingsControl(bowlCollisonArea, 640, 240, 'transparentImage', "true", "true", 0.5, 0.5, 250, 10, "false");
        bowlCollisonArea.alpha = 0.001;

        sideBarLeft = Utils.SpriteSettingsControl(sideBarLeft, 170, 260, 'sideBar', "true", "true", 0.5, 0.5, 1.4, 1.7, "false");
        sideBarRight = Utils.SpriteSettingsControl(sideBarRight, 1051, 260, 'sideBar', "true", "true", 0.5, 0.5, 1.19, 1.7, "false");

        //-----------------------------Left side item-------------------------------
        flourText = game.add.text(55, 10, "flour", { font: 'bold 35px Arial', fill: '#6d6dfd' });
        flourBlankCup = Utils.ButtonSettingsControl(flourBlankCup, 95, 110, 'blankCup', null, null, null, null, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        flourBlankCup.visible = false;
        flour = Utils.ButtonSettingsControl(flour, 75, 150, 'flour', this.FlourBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.9, this);
        flour.input.useHandCursor = true;
        flour.animations.add('flourAnimation');

        cocoaText = game.add.text(225, 10, "cocoa", { font: 'bold 36px Arial', fill: '#6d6dfd' });
        cocoaBlankCup = Utils.ButtonSettingsControl(cocoaBlankCup, 282, 110, 'blankCup', null, null, null, null, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        cocoaBlankCup.visible = false;
        cocoa = Utils.ButtonSettingsControl(cocoa, 250, 110, 'cocoa', this.CocoaBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        cocoa.input.useHandCursor = true;
        cocoa.animations.add('cocoaAnimation');

        sugarText = game.add.text(50, 165, "sugar", { font: 'bold 35px Arial', fill: '#6d6dfd' });
        sugarBlankCup = Utils.ButtonSettingsControl(sugarBlankCup, 110, 270, 'blankCup', null, null, null, null, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        sugarBlankCup.visible = false;
        sugar = Utils.ButtonSettingsControl(sugar, 50, 330, 'sugar', this.SugarBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        sugar.input.useHandCursor = true;
        sugar.animations.add('sugarAnimation');

        milkText = game.add.text(245, 165, "milk", { font: 'bold 35px Arial', fill: '#6d6dfd' });
        milkBlankCup = Utils.ButtonSettingsControl(milkBlankCup, 290, 275, 'blankCup', null, null, null, null, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        milkBlankCup.visible = false;
        milk = Utils.ButtonSettingsControl(milk, 264, 285, 'milk', this.MilkBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        milk.input.useHandCursor = true;
        milk.animations.add('milkAnimation');

        nutsText = game.add.text(50, 330, "nuts", { font: 'bold 35px Arial', fill: '#6d6dfd' });
        nutsBlankCup = Utils.ButtonSettingsControl(nutsBlankCup, 100, 440, 'blankCup', null, null, null, null, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        nutsBlankCup.visible = false;
        nuts = Utils.ButtonSettingsControl(nuts, 58, 440, 'nuts', this.NutsBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1.1, 1.1, this);
        nuts.input.useHandCursor = true;
        nuts.animations.add('nutsAnimation');

        waterText = game.add.text(240, 330, "water", { font: 'bold 35px Arial', fill: '#6d6dfd' });
        waterBlankCup = Utils.ButtonSettingsControl(waterBlankCup, 290, 440, 'blankCup', null, null, null, null, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        waterBlankCup.visible = false;
        water = Utils.ButtonSettingsControl(water, 255, 455, 'water', this.WaterBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        water.input.useHandCursor = true;
        water.animations.add('waterAnimation');
        //------------------------------------------------------------------------------

        //-----------------------------Right side item-------------------------------

        eggsText = game.add.text(1010, 0, "eggs", { font: 'bold 35px Arial', fill: '#6d6dfd' });
        egg1 = Utils.ButtonSettingsControl(egg1, 955, 100, 'staticEgg', this.Egg1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        egg1.input.useHandCursor = true;

        egg2 = Utils.ButtonSettingsControl(egg2, 1050, 100, 'staticEgg', this.Egg2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        egg2.input.useHandCursor = true;

        egg3 = Utils.ButtonSettingsControl(egg3, 1145, 100, 'staticEgg', this.Egg3BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        egg3.input.useHandCursor = true;

        butterText = game.add.text(1010, 155, "butter", { font: 'bold 35px Arial', fill: '#6d6dfd' });
        butter1 = Utils.ButtonSettingsControl(butter1, 940, 260, 'staticButter', this.Butter1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        butter1.input.useHandCursor = true;

        butter2 = Utils.ButtonSettingsControl(butter2, 1014, 260, 'staticButter', this.Butter2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        butter2.input.useHandCursor = true;

        butter3 = Utils.ButtonSettingsControl(butter3, 1088, 260, 'staticButter', this.Butter3BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        butter3.input.useHandCursor = true;

        butter4 = Utils.ButtonSettingsControl(butter4, 1160, 260, 'staticButter', this.Butter4BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        butter4.input.useHandCursor = true;

        butterSpritesheets = Utils.SpriteSettingsControl(butterSpritesheets, 620, 310, 'butterSpritesheets', "true", "true", 0.5, 0.5, 1.3, 1.3, "false");
        butterSpritesheets.animations.add('butterAnimation');
        butterSpritesheets.visible = false;

        eggSpritesheets = Utils.SpriteSettingsControl(eggSpritesheets, 620, 290, 'eggSpritesheets', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        eggSpritesheets.animations.add('eggAnimation');
        eggSpritesheets.visible = false;

        bakingPowderText = game.add.text(925, 310, "baking Powder", { font: 'bold 35px Arial', fill: '#6d6dfd' });
        bakingPowder1BlankSpoon = Utils.ButtonSettingsControl(bakingPowder1BlankSpoon, 983, 395, 'blankBakingPowdeSpoon', null, null, null, null, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        bakingPowder1BlankSpoon.visible = false;
        bakingPowder1 = Utils.ButtonSettingsControl(bakingPowder1, 950, 440, 'bakingPowder', this.BakingPowder1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        bakingPowder1.input.useHandCursor = true;
        bakingPowder1.animations.add('bakingPowder1Animation');

        bakingPowder2BlankSpoon = Utils.ButtonSettingsControl(bakingPowder2BlankSpoon, 1134, 395, 'blankBakingPowdeSpoon', null, null, null, null, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        bakingPowder2BlankSpoon.visible = false;
        bakingPowder2 = Utils.ButtonSettingsControl(bakingPowder2, 1100, 440, 'bakingPowder', this.bakingPowder2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        bakingPowder2.input.useHandCursor = true;
        bakingPowder2.animations.add('bakingPowder2Animation');

        saltText = game.add.text(1010, 420, "salt", { font: 'bold 35px Arial', fill: '#6d6dfd' });
        saltBlankSpoon = Utils.ButtonSettingsControl(saltBlankSpoon, 1070, 485, 'blankSaltSpoon', null, null, null, null, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        saltBlankSpoon.visible = false;
        salt = Utils.ButtonSettingsControl(salt, 1020, 510, 'salt', this.SaltBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.5, 0.5, this);
        salt.input.useHandCursor = true;
        salt.animations.add('saltAnimation');


        firstPageItemsGroup.add(firstPageBackground);
        firstPageItemsGroup.add(staticBowl);
        firstPageItemsGroup.add(eggPlaced1);
        firstPageItemsGroup.add(eggPlaced2);
        firstPageItemsGroup.add(eggPlaced3);
        firstPageItemsGroup.add(butterPlaced);
        firstPageItemsGroup.add(flourPlaced);
        firstPageItemsGroup.add(cocoaPlaced);
        firstPageItemsGroup.add(sugarPlaced);
        firstPageItemsGroup.add(milkPlaced);
        firstPageItemsGroup.add(nutsPlaced);
        firstPageItemsGroup.add(waterPlaced);
        firstPageItemsGroup.add(finalPlaced);
        firstPageItemsGroup.add(momsBakerText);
        firstPageItemsGroup.add(nextButtonBase);
        firstPageItemsGroup.add(bowlCollisonArea);
        firstPageItemsGroup.add(sideBarLeft);
        firstPageItemsGroup.add(sideBarRight);
        firstPageItemsGroup.add(flourText);
        firstPageItemsGroup.add(flourBlankCup);
        firstPageItemsGroup.add(flour);
        firstPageItemsGroup.add(cocoaText);
        firstPageItemsGroup.add(cocoaBlankCup);
        firstPageItemsGroup.add(cocoa);
        firstPageItemsGroup.add(sugarText);
        firstPageItemsGroup.add(sugarBlankCup);
        firstPageItemsGroup.add(sugar);
        firstPageItemsGroup.add(milkText);
        firstPageItemsGroup.add(milkBlankCup);
        firstPageItemsGroup.add(milk);
        firstPageItemsGroup.add(nutsText);
        firstPageItemsGroup.add(nutsBlankCup);
        firstPageItemsGroup.add(nuts);
        firstPageItemsGroup.add(waterText);
        firstPageItemsGroup.add(waterBlankCup);
        firstPageItemsGroup.add(water);
        firstPageItemsGroup.add(eggsText);
        firstPageItemsGroup.add(egg1);
        firstPageItemsGroup.add(egg2);
        firstPageItemsGroup.add(egg3);
        firstPageItemsGroup.add(butterText);
        firstPageItemsGroup.add(butter1);
        firstPageItemsGroup.add(butter2);
        firstPageItemsGroup.add(butter3);
        firstPageItemsGroup.add(butter4);
        firstPageItemsGroup.add(butterSpritesheets);
        firstPageItemsGroup.add(eggSpritesheets);
        firstPageItemsGroup.add(bakingPowderText);
        firstPageItemsGroup.add(bakingPowder1BlankSpoon);
        firstPageItemsGroup.add(bakingPowder1);
        firstPageItemsGroup.add(bakingPowder2BlankSpoon);
        firstPageItemsGroup.add(bakingPowder2);
        firstPageItemsGroup.add(saltText);
        firstPageItemsGroup.add(saltBlankSpoon);
        firstPageItemsGroup.add(salt);

        // firstPageItemsGroup.visible = false;

        //--------------------------------------------------------------------
        secondPageItemsGroup = game.add.group();

        secondPageBackground = Utils.SpriteSettingsControl(secondPageBackground, 490, 255, 'bg', "true", "true", 0.5, 0.5, 1.82, 1, "false");
        secondPageSideBar = Utils.SpriteSettingsControl(sideBarRight, 1045, 300, 'sideBar', "true", "true", 0.5, 0.5, 1.1, 1.7, "false");

        momsBaker = Utils.SpriteSettingsControl(momsBaker, 490, 250, 'momsBaker', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        momsBaker.animations.add('momsBakerAnimation', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);

        bigSpoon = Utils.ButtonSettingsControl(bigSpoon, 1050, 260, 'bigSpoon', this.BigSpoonBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        bigSpoon.input.useHandCursor = true;

        momsBakerCollisionArea = Utils.SpriteSettingsControl(momsBakerCollisionArea, 500, 250, 'transparentImage', "true", "true", 0.5, 0.5, 250, 10, "false");
        momsBakerCollisionArea.alpha = 0.001;

        secondPageNextButtonBase = Utils.ButtonSettingsControl(secondPageNextButtonBase, 1045, 498, 'nextButtonBase', this.SecondPageNextBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        secondPageNextButtonBase.input.useHandCursor = true;
        secondPageNextButtonText = game.add.text(-40, -23, "Next", { font: 'bold 40px Arial', fill: '#ff2400' });
        secondPageNextButtonBase.addChild(secondPageNextButtonText);
        secondPageNextButtonBase.visible = false;

        secondPageItemsGroup.add(secondPageBackground);
        secondPageItemsGroup.add(secondPageSideBar);
        secondPageItemsGroup.add(momsBaker);
        secondPageItemsGroup.add(bigSpoon);
        secondPageItemsGroup.add(momsBakerCollisionArea);
        secondPageItemsGroup.add(secondPageNextButtonBase);

        secondPageItemsGroup.visible = false;

        //------------------------------------------------------------------------

        thirdPageItemsGroup = game.add.group();

        thirdPageBackground = Utils.SpriteSettingsControl(thirdPageBackground, 490, 240, 'bg', "true", "true", 0.5, 0.5, 2, 1, "false");
        thirdPageSideBar = Utils.SpriteSettingsControl(thirdPageSideBar, 1045, 240, 'sideBar', "true", "true", 0.5, 0.5, 1.1, 1.7, "false");

        mixerSpritesheets = Utils.SpriteSettingsControl(mixerSpritesheets, 460, 308, 'mixerSpritesheets', "true", "true", 0.5, 0.5, 0.9, 0.9, "false");
        mixerSpritesheets.animations.add('mixerAnimation', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);

        mixer = Utils.ButtonSettingsControl(mixer, 1044, 240, 'mixer', this.MixerBttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 1, 1, this);
        mixer.input.useHandCursor = true;

        mixerCollisionArea = Utils.SpriteSettingsControl(mixerCollisionArea, 500, 230, 'transparentImage', "true", "true", 0.5, 0.5, 250, 10, "false");
        mixerCollisionArea.alpha = 0.001;

        thirdPageNextButtonBase = Utils.ButtonSettingsControl(thirdPageNextButtonBase, 1050, 500, 'nextButtonBase', this.ThirdPageNextBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        thirdPageNextButtonBase.input.useHandCursor = true;
        thirdPageNextButtonText = game.add.text(-40, -23, "Next", { font: 'bold 40px Arial', fill: '#ff2400' });
        thirdPageNextButtonBase.addChild(thirdPageNextButtonText);
        thirdPageNextButtonBase.visible = false;

        thirdPageItemsGroup.add(thirdPageBackground);
        thirdPageItemsGroup.add(thirdPageSideBar);
        thirdPageItemsGroup.add(mixerSpritesheets);
        thirdPageItemsGroup.add(mixer);
        thirdPageItemsGroup.add(mixerCollisionArea);
        thirdPageItemsGroup.add(thirdPageNextButtonBase);

        thirdPageItemsGroup.visible = false;

        //--------------------------------------------------------------

        fourthPageItemsGroup = game.add.group();

        fourthPageBackground = Utils.SpriteSettingsControl(fourthPageBackground, 640, 225, 'bg', "true", "true", 0.5, 0.5, 2.5, 1, "false");

        bowlPouring = Utils.SpriteSettingsControl(bowlPouring, 720, 265, 'bowlPouring', "true", "true", 0.5, 0.5, 1.2, 1.2, "false");
        bowlPouring.animations.add('bowlPouringAnimation');

        rotateButton = Utils.ButtonSettingsControl(rotateButton, 470, 160, 'rotateButton', this.RotateBttnDown, null, null, null, "true", "true", 0.5, 0.5, 0.7, 0.7, this);
        rotateButton.input.useHandCursor = true;

        fourthPageNextButtonBase = Utils.ButtonSettingsControl(fourthPageNextButtonBase, 950, 490, 'nextButtonBase', this.FourthPageNextBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        fourthPageNextButtonBase.input.useHandCursor = true;
        fourthPageNextButtonText = game.add.text(-40, -23, "Next", { font: 'bold 40px Arial', fill: '#ff2400' });
        fourthPageNextButtonBase.addChild(fourthPageNextButtonText);
        fourthPageNextButtonBase.visible = false;

        fourthPageItemsGroup.add(fourthPageBackground);
        fourthPageItemsGroup.add(bowlPouring);
        fourthPageItemsGroup.add(rotateButton);
        fourthPageItemsGroup.add(fourthPageNextButtonBase);

        fourthPageItemsGroup.visible = false;

        //------------------------------------------------------------------

        //----------------------Fifth page------------------------------------
        fifthPageItemsGroup = game.add.group();

        fifthPageBackground = Utils.SpriteSettingsControl(fifthPageBackground, 640, 225, 'bg', "true", "true", 0.5, 0.5, 2.5, 1, "false");

        ovenOn = Utils.SpriteSettingsControl(ovenOn, 640, 228, 'ovenOn', "true", "true", 0.5, 0.5, 0.7, 0.7, "false");
        ovenOn.animations.add('ovenOnAnimation');

        ovenOff = Utils.SpriteSettingsControl(ovenOff, 640, 228, 'ovenOff', "true", "true", 0.5, 0.5, 0.7, 0.7, "false");
        ovenOff.animations.add('ovenOffAnimation');
        ovenOff.visible = false;

        onButtonBase = Utils.ButtonSettingsControl(onButtonBase, 700, 57, 'onButtonBase', this.OnBttnDown, null, null, null, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
        onButtonBase.input.useHandCursor = true;
        onButtonText = game.add.text(-27, -21, "On", { font: 'bold 35px Arial', fill: '#ff2400' });
        onButtonBase.addChild(onButtonText);

        fifthPageNextButtonBase = Utils.ButtonSettingsControl(fifthPageNextButtonBase, 1000, 490, 'nextButtonBase', this.FifthPageNextBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        fifthPageNextButtonBase.input.useHandCursor = true;
        fifthPageNextButtonText = game.add.text(-40, -23, "Next", { font: 'bold 40px Arial', fill: '#ff2400' });
        fifthPageNextButtonBase.addChild(fifthPageNextButtonText);
        fifthPageNextButtonBase.visible = false;

        fifthPageItemsGroup.add(fifthPageBackground);
        fifthPageItemsGroup.add(ovenOn);
        fifthPageItemsGroup.add(ovenOff);
        fifthPageItemsGroup.add(onButtonBase);
        fifthPageItemsGroup.add(fifthPageNextButtonBase);

        fifthPageItemsGroup.visible = false;
        //--------------------------------------------------------------------

        //------------------------Sixth page-------------------------------------
        sixthPageItemsGroup = game.add.group();

        sixthPageBackground = Utils.SpriteSettingsControl(sixthPageBackground, 640, 255, 'bg', "true", "true", 0.5, 0.5, 2.5, 1, "false");

        thump = Utils.SpriteSettingsControl(thump, 640, 195, 'thump', "true", "true", 0.5, 0.5, 1.1, 1, "false");
        thump.animations.add('thumpAnimation');

        thumpButtonBase = Utils.ButtonSettingsControl(thumpButtonBase, 400, 490, 'nextButtonBase', this.ThumpBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        thumpButtonBase.input.useHandCursor = true;
        thumpButtonText = game.add.text(-65, -23, "Thump", { font: 'bold 40px Arial', fill: '#ff2400' });
        thumpButtonBase.addChild(thumpButtonText);

        sixthPageNextButtonBase = Utils.ButtonSettingsControl(sixthPageNextButtonBase, 1000, 490, 'nextButtonBase', this.SixthPageNextBttnDown, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        sixthPageNextButtonBase.input.useHandCursor = true;
        sixthPageNextButtonText = game.add.text(-40, -23, "Next", { font: 'bold 40px Arial', fill: '#ff2400' });
        sixthPageNextButtonBase.addChild(sixthPageNextButtonText);
        sixthPageNextButtonBase.visible = false;

        sixthPageItemsGroup.add(sixthPageBackground);
        sixthPageItemsGroup.add(thump);
        sixthPageItemsGroup.add(thumpButtonBase);
        sixthPageItemsGroup.add(sixthPageNextButtonBase);

        sixthPageItemsGroup.visible = false;
        //------------------------------------------------------

        //------------------Seventh page------------------------------------------------
        seventhPageItemsGroup = game.add.group();

        seventhPageBackground = Utils.SpriteSettingsControl(seventhPageBackground, 640, 255, 'whitePixel', "true", "true", 0.5, 0.5, 1280, 605, "false");
        seventhPageBackground.tint = "0xffcc99";

        yummy = Utils.SpriteSettingsControl(yummy, 600,300, 'yummy', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        yummy.animations.add('yummyAnimation');
        yummy.animations.play('yummyAnimation', 15, true);

        seventhPageItemsGroup.add(seventhPageBackground);
        seventhPageItemsGroup.add(yummy);

        seventhPageItemsGroup.visible = false;

        //--------------------------------------------------------------


        game.canvas.addEventListener('mousedown', this.requestLock);
        game.input.addMoveCallback(this.moveDown, this);
    },


    update: function() {
        // console.log("The active pointer X.................." + (game.input.mouse.event.movementX));
    },


    FlourBttnDown: function() {
        itemNumber = 1;
        blankItemName = flourBlankCup;
        placedItem = flourPlaced;
        animationName = "flourAnimation";
        animationSpeed = 20;
    },
    CocoaBttnDown: function() {
        itemNumber = 2;
        blankItemName = cocoaBlankCup;
        placedItem = cocoaPlaced;
        animationName = "cocoaAnimation";
        animationSpeed = 20;
    },
    SugarBttnDown: function() {
        itemNumber = 3;
        blankItemName = sugarBlankCup;
        placedItem = sugarPlaced;
        animationName = "sugarAnimation";
        animationSpeed = 20;
    },
    MilkBttnDown: function() {
        itemNumber = 4;
        blankItemName = milkBlankCup;
        placedItem = milkPlaced;
        animationName = "milkAnimation";
        animationSpeed = 20;
    },
    NutsBttnDown: function() {
        itemNumber = 5;
        blankItemName = nutsBlankCup;
        placedItem = nutsPlaced;
        animationName = "nutsAnimation";
        animationSpeed = 20;
    },
    WaterBttnDown: function() {
        itemNumber = 6;
        blankItemName = waterBlankCup;
        placedItem = waterPlaced;
        animationName = "waterAnimation";
        animationSpeed = 20;
    },
    Egg1BttnDown: function() {
        itemNumber = 7;
        placedItem = eggPlaced1;
        blankItemName = null;
        eggOrButterSprite = eggSpritesheets;
        animationName = "eggAnimation";
        animationSpeed = 15;
    },
    Egg2BttnDown: function() {
        itemNumber = 8;
        placedItem = eggPlaced2;
        blankItemName = null;
        eggOrButterSprite = eggSpritesheets;
        animationName = "eggAnimation";
        animationSpeed = 15;
    },
    Egg3BttnDown: function() {
        itemNumber = 9;
        placedItem = eggPlaced3;
        blankItemName = null;
        eggOrButterSprite = eggSpritesheets;
        animationName = "eggAnimation";
        animationSpeed = 15;
    },
    Butter1BttnDown: function() {
        itemNumber = 10;
        placedItem = butterPlaced;
        blankItemName = null;
        eggOrButterSprite = butterSpritesheets;
        animationName = "butterAnimation";
        animationSpeed = 15;
    },
    Butter2BttnDown: function() {
        itemNumber = 11;
        placedItem = butterPlaced;
        blankItemName = null;
        eggOrButterSprite = butterSpritesheets;
        animationName = "butterAnimation";
        animationSpeed = 15;
    },
    Butter3BttnDown: function() {
        itemNumber = 12;
        placedItem = butterPlaced;
        blankItemName = null;
        eggOrButterSprite = butterSpritesheets;
        animationName = "butterAnimation";
        animationSpeed = 15;
    },
    Butter4BttnDown: function() {
        itemNumber = 13;
        placedItem = butterPlaced;
        blankItemName = null;
        eggOrButterSprite = butterSpritesheets;
        animationName = "butterAnimation";
        animationSpeed = 15;
    },
    BakingPowder1BttnDown: function() {
        itemNumber = 14;
        placedItem = null;
        blankItemName = bakingPowder1BlankSpoon;
        animationName = "bakingPowder1Animation";
        animationSpeed = 10;
    },
    bakingPowder2BttnDown: function() {
        itemNumber = 15;
        placedItem = null;
        blankItemName = bakingPowder2BlankSpoon;
        animationName = "bakingPowder2Animation";
        animationSpeed = 10;
    },
    SaltBttnDown: function() {
        itemNumber = 16;
        placedItem = null;
        blankItemName = saltBlankSpoon;
        animationName = "saltAnimation";
        animationSpeed = 10;
    },
    BigSpoonBttnDown: function() {
        itemNumber = 17;
    },
    MixerBttnDown: function() {
        itemNumber = 18;
    },

    NextBttnDown: function() {
        firstPageItemsGroup.visible = false;
        secondPageItemsGroup.visible = true;
    },

    SecondPageNextBttnDown: function() {
        secondPageItemsGroup.visible = false;
        thirdPageItemsGroup.visible = true;
    },
    ThirdPageNextBttnDown: function() {
        thirdPageItemsGroup.visible = false;
        fourthPageItemsGroup.visible = true;
    },
    RotateBttnDown: function() {
        rotateButton.visible = false;
        var bowlAnim = bowlPouring.animations.play('bowlPouringAnimation', 20, false);
        bowlAnim.onComplete.add(function() {
            fourthPageNextButtonBase.visible = true;
        });
    },
    FourthPageNextBttnDown: function() {
        fourthPageItemsGroup.visible = false;
        fifthPageItemsGroup.visible = true;
    },

    OnBttnDown: function() {
        onButtonCounter++;
        if (onButtonCounter == 1) {
            onButtonText.setText("Off");
            ovenOn.animations.play('ovenOnAnimation', 14, true);
        }
        if (onButtonCounter == 2) {
            onButtonText.setText("On");
            ovenOff.visible = true;
            ovenOn.animations.stop('ovenOnAnimation');
            ovenOff.animations.play('ovenOffAnimation', 12, true);
            onButtonBase.inputEnabled = false;
            fifthPageNextButtonBase.visible = true;
        }
        console.log("OnBttnDown");
    },
    FifthPageNextBttnDown: function() {
        fifthPageItemsGroup.visible = false;
        sixthPageItemsGroup.visible = true;
    },

    ThumpBttnDown: function() {
        thumpButtonBase.visible = false;
        var thumAnim = thump.animations.play('thumpAnimation', 15, false);
        thumAnim.onComplete.add(function() {
            sixthPageNextButtonBase.visible = true;
        });
    },

    SixthPageNextBttnDown: function() {
        sixthPageItemsGroup.visible = false;
        seventhPageItemsGroup.visible = true;
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
        if (game.input.activePointer.y < 0) {
            game.input.activePointer.y = 80;
        }
        if (game.input.activePointer.y > 680) {
            game.input.activePointer.y = 680;
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
                if (flour.inputEnabled)
                flour.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // flour.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 2:
                if (cocoa.inputEnabled)
                cocoa.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // cocoa.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 3:
                if (sugar.inputEnabled)
                sugar.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // sugar.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 4:
                if (milk.inputEnabled)
                milk.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // milk.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 5:
                if (nuts.inputEnabled)
                nuts.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // nuts.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 6:
                if (water.inputEnabled)
                water.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // water.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 7:
                if (egg1.inputEnabled)
                egg1.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // egg1.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 8:
                if (egg2.inputEnabled)
                egg2.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // egg2.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 9:
                if (egg3.inputEnabled)
                egg3.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // egg3.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 10:
                if (butter1.inputEnabled)
                butter1.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // butter1.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 11:
                if (butter2.inputEnabled)
                butter2.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // butter2.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 12:
                if (butter3.inputEnabled)
                butter3.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // butter3.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 13:
                if (butter4.inputEnabled)
                butter4.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // butter4.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 14:
                if (bakingPowder1.inputEnabled)
                bakingPowder1.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // bakingPowder1.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 15:
                if (bakingPowder2.inputEnabled)
                bakingPowder2.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // bakingPowder2.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 16:
                if (salt.inputEnabled)
                salt.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                    // salt.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 17:
                if (bigSpoon.inputEnabled)
                    bigSpoon.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
            case 18:
                if (mixer.inputEnabled)
                    mixer.position.set(game.input.activePointer.x, game.input.activePointer.y);
                break;
        }
    },

    moveUp: function(_this) {
        console.log("Item num: " + itemNumber);
        if (itemNumber == 18) {
            this.PlayMixerAnimation(_this, mixerCollisionArea);
        } else if (itemNumber == 17) {
            console.log("big spoon");
            this.PlayMomsBakerAnimation(_this, momsBakerCollisionArea);
        } else {
            this.PutObjectToBowl(_this, bowlCollisonArea, blankItemName, placedItem, animationName, animationSpeed, itemNumber, eggOrButterSprite);
        }
    },

    PutObjectToBowl: function(gameObj, collisionArea, _blankItemName = null, _placedItemName = null, _animationName = null, _animationSpeed = null, _itemNumber, _eggOrButterSprite = null) {
        if (this.checkOverlap(gameObj, collisionArea)) {
            if ((_itemNumber >= 1 && _itemNumber <= 6) || (_itemNumber >= 14 && _itemNumber <= 16)) {
                gameObj.position.set(640, game.input.activePointer.y - 60);
                if (_animationName != null && _animationSpeed != null) {
                    var anim = gameObj.animations.play(_animationName, _animationSpeed, false);
                    anim.onComplete.add(function() {
                        gameObj.visible = false;
                        if (_blankItemName != null) {
                            _blankItemName.visible = true;
                        }

                        if (_placedItemName != null) {
                            _placedItemName.visible = true;
                        }
                    });
                }


            } else if (_itemNumber >= 7 && _itemNumber <= 13) {
                if (_animationName != null && _eggOrButterSprite != null && _animationSpeed != null) {
                    gameObj.visible = false;
                    _eggOrButterSprite.visible = true;
                    var anim2 = _eggOrButterSprite.animations.play(_animationName, _animationSpeed, false);
                    anim2.onComplete.add(function() {
                        _eggOrButterSprite.visible = false;
                        if (_placedItemName != null) {
                            _placedItemName.visible = true;
                        }
                    });
                }
            }

            counter++;
            gameObj.inputEnabled = false;
            if (counter == 16) {
                setTimeout(() => {
                    nextButtonBase.visible = true;
                    finalPlaced.visible = true;
                }, 1000);

            }
        }
    },

    PlayMomsBakerAnimation: function(gameObj, collisionArea) {
        if (this.checkOverlap(gameObj, collisionArea)) {
            gameObj.inputEnabled = false;
            gameObj.visible = false;
            secondPageNextButtonBase.visible = true;
            var momAnim = momsBaker.animations.play('momsBakerAnimation', 20, true);
            momAnim.onComplete.add(function() {

            });
        }
    },
    PlayMixerAnimation: function(gameObj, collisionArea) {
        if (this.checkOverlap(gameObj, collisionArea)) {
            gameObj.inputEnabled = false;
            gameObj.visible = false;
            thirdPageNextButtonBase.visible = true;
            var mixerAnim = mixerSpritesheets.animations.play('mixerAnimation', 20, true);
            mixerAnim.onComplete.add(function() {

            });
        }
    },



}