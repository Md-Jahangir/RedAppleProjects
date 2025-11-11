var shopPopupGroup;
var shopPopupBg;
var blasterGroup;
var slowDownGroup;
var bombArray = [];
var timerArray = [];
var price;
var count;
var type;

var ShopPopup = {
    //CREATE FUNCTION
    CreateShopPopup: function() {
        shopPopupGroup = game.add.group();

        shopPopupBg = Utils.ButtonSettingsControl(shopPopupBg, game.world.centerX, game.world.centerY, 'greenOverlay', null, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);
        topBar = Utils.SpriteSettingsControl(topBar, 360, 100, 'topBar', "true", "true", 0.5, 0.5, 0.6, 0.6);
        pageTitle = Utils.SpriteSettingsControl(pageTitle, 360, 160, 'pageTitle', "true", "true", 0.5, 0.5, 0.6, 0.6);
        topTxt = game.add.bitmapText(360, 145, 'shootEmFont', "SHOP", 35);
        topTxt.anchor.set(0.5, 0.5);
        backBttn = Utils.ButtonSettingsControl(backBttn, 80.0, 150.0, 'backBttn', this.BackButtonDownAnimtion, null, null, this.BackButtonUpAnimation, "true", "true", 0.5, 0.5, 0.6, 0.6, this);

        blasterGroup = game.add.group();
        slowDownGroup = game.add.group();
        blasterGroup.position.setTo(-800, 0);
        slowDownGroup.position.setTo(1000, 0);
        this.BuyItemContainer(blasterGroup, 360, 500, 'blaster_shop', "BLASTER", "Rescues all fruits in Screen...");
        this.BuyItemContainer(slowDownGroup, 360, 1000, 'slowDownShop', "SLOW DOWN", "Slow down the Speed of the \n         items in Gameplay...");

        var blasterItem_1 = this.BuyItem(200, 530, 'bombThumbnail', "5", "BLASTS", "₹ 200", 0);
        var blasterItem_2 = this.BuyItem(365, 530, 'bombThumbnail', "10", "BLASTS", "₹ 500", 1);
        var blasterItem_3 = this.BuyItem(530, 530, 'bombThumbnail', "20", "BLASTS", "₹ 1000", 2);
        blasterGroup.add(blasterItem_1);
        blasterGroup.add(blasterItem_2);
        blasterGroup.add(blasterItem_3);

        var slowDownItem_1 = this.BuyItem(200, 1030, 'clock', "5", "SLOWDOWN", "₹ 200", 3);
        var slowDownItem_2 = this.BuyItem(365, 1030, 'clock', "10", "SLOWDOWN", "₹ 500", 4);
        var slowDownItem_3 = this.BuyItem(530, 1030, 'clock', "20", "SLOWDOWN", "₹ 1000", 5);
        slowDownGroup.add(slowDownItem_1);
        slowDownGroup.add(slowDownItem_2);
        slowDownGroup.add(slowDownItem_3);

        shopPopupGroup.add(shopPopupBg);
        shopPopupGroup.add(topBar);
        shopPopupGroup.add(pageTitle);
        shopPopupGroup.add(topTxt);
        shopPopupGroup.add(backBttn);
        shopPopupGroup.add(blasterGroup);
        shopPopupGroup.add(slowDownGroup);
        shopPopupGroup.visible = false;
    },
    BuyItem: function(posX, posY, thumbnailImage, powerUpCount, powerUpName, price, buttonName) {
        // console.log("The item base..............."+item_base+"The Button name............."+buttonName);
        var item_base = Utils.ButtonSettingsControl(item_base, posX, posY, 'shopItemBase', this.BuyButtonDownAnimation, null, null, this.BuyButtonUpAnimation, "true", "true", 0.5, 0.5, 0.5, 0.5, this);
        item_base.name = buttonName;
        // console.log("The item base...............",item_base);
        var item_base_image = Utils.SpriteSettingsControl(item_base_image, -85, -80, thumbnailImage, "true", "true", 0.5, 0.5, 1, 1);
        var item_text_count = game.add.bitmapText(-40, -90, 'shootEmFont', powerUpCount, 100);
        var item_text = game.add.bitmapText(10, 50, 'shootEmFont', powerUpName, 35);
        item_text.anchor.setTo(0.5, 0.5);
        var item_buyButton_base = Utils.SpriteSettingsControl(item_buyButton_base, 5, 150, 'buyBttn', "true", "true", 0.5, 0.5, 1, 1);
        var item_buyforText = Utils.TextSettingsControl(item_buyforText, 0, 110, 'BUY FOR', "true", "false", 0.5, 0.5, 0, 0, 'Arial', '30px', "#3D0C0C", null, 180);
        var item_price = game.add.bitmapText(-30, 120, 'shootEmFont', price, 40);
        item_price.tint = "0x3D0C0C";

        item_base.addChild(item_base_image);
        item_base.addChild(item_text_count);
        item_base.addChild(item_text);
        item_base.addChild(item_buyButton_base);
        item_base.addChild(item_buyforText);
        item_base.addChild(item_price);


        bombArray[buttonName] = item_base;

        return item_base;
    },
    BuyItemContainer: function(group, posX, posY, powerupIcon, powerupText, description) {
        var shopPopupBase = Utils.SpriteSettingsControl(shopPopupBase, posX, posY, 'shopBase', "true", "true", 0.5, 0.5, 0.5, 0.5);
        var titleBase = Utils.SpriteSettingsControl(titleBase, -140, -320, 'itemTitle', "true", "true", 0.5, 0.5, 1, 1);
        var icon = Utils.SpriteSettingsControl(icon, -340, -340, powerupIcon, "true", "true", 0.5, 0.5, 1, 1);
        var text = game.add.bitmapText(-40, -335, 'shootEmFont', powerupText, 55);
        text.tint = "0x3D0C0C";
        text.anchor.setTo(0.5, 0.5);
        var descriptionText = game.add.bitmapText(-400, -230, 'shootEmFont', description, 50);
        shopPopupBase.addChild(titleBase);
        shopPopupBase.addChild(icon);
        shopPopupBase.addChild(text);
        shopPopupBase.addChild(descriptionText);
        group.add(shopPopupBase);
    },

    ButtonIndex: function(index) {
        switch (index) {
            case 0:
                price = 100;
                count = 5;
                type = "bomb";
                break;
            case 1:
                price = 200;
                count = 10;
                type = "bomb";
                break;
            case 2:
                price = 500;
                count = 20;
                type = "bomb";
                break;
            case 3:
                price = 100;
                count = 5;
                type = "timer";
                break;
            case 4:
                price = 200;
                count = 10;
                type = "timer";
                break;
            case 5:
                price = 500;
                count = 20;
                type = "timer";
                break;

        }
    },

    //SHOW HIDE POPUP
    ShowShopPopup: function() {
        game.world.bringToTop(shopPopupGroup);
        shopPopupGroup.visible = true;
        game.add.tween(blasterGroup).to({ x: 0, y: 0 }, 300, Phaser.Easing.Elastic.Out, true);
        game.add.tween(slowDownGroup).to({ x: 0, y: 0 }, 300, Phaser.Easing.Elastic.Out, true);
    },
    HideShopPopup: function() {

        var hideShopGroupTween = game.add.tween(blasterGroup).to({ x: -800, y: 0 }, 300, Phaser.Easing.Elastic.In, true);

        game.add.tween(slowDownGroup).to({ x: 1000, y: 0 }, 300, Phaser.Easing.Elastic.In, true); //game.add.tween(shopPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        hideShopGroupTween.onComplete.add(function() {
            shopPopupGroup.visible = false;
        });
    },
    //ALL BUTTON FUNCTIONALITY
    BackButtonDownAnimtion: function() {
        game.add.tween(backBttn.scale).to({ x: 0.4, y: 0.4 }, 400, Phaser.Easing.Linear.None, true);
        SoundManager.PlayButtonSFX();
    },
    BackButtonUpAnimation: function() {
        backBttn.inputEnable = false;
        game.add.tween(backBttn.scale).to({ x: 0.5, y: 0.5 }, 400, Phaser.Easing.Linear.None, true);
        setTimeout(() => {
            this.BackButtonClick();
            backBttn.inputEnable = true;
        }, 500);
    },
    BackButtonClick: function() {
        this.HideShopPopup();
    },
    BuyButtonDownAnimation: function(index) {
        // console.log("name..........."+index.name);
        game.add.tween(bombArray[index.name].scale).to({ x: 0.4, y: 0.4 }, 400, Phaser.Easing.Linear.None, true);
        SoundManager.PlayButtonSFX();
    },
    BuyButtonUpAnimation: function(index) {
        bombArray[index.name].inputEnable = false;
        game.add.tween(bombArray[index.name].scale).to({ x: 0.5, y: 0.5 }, 400, Phaser.Easing.Linear.None, true);
        setTimeout(() => {
            this.BuyButtonClick(bombArray[index.name]);
            bombArray[index.name].inputEnable = true;
        }, 500);
    },
    BuyButtonClick: function(index) {
        // bombArray[index.name].
        this.ButtonIndex(index.name);
        // console.log("type......"+type+" count......."+count);
        if (type == "bomb") {
            var bombCount = parseInt(Database.LoadData("bombCount")) + count;
            // console.log("bomb count.........."+bombCount);
            Database.SaveData("bombCount", bombCount);
        } else {
            var timerCount = parseInt(Database.LoadData("timePopupCount")) + count;
            // console.log("timer count.........."+timerCount);
            Database.SaveData("timePopupCount", timerCount);
        }
    }
}