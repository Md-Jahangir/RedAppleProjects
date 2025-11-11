var isGiftPopUpVisible;
var giftgroup;
var giftPopupOverlay;
var priceGroup;
var isSendToAll = false;
var tickMark;
var freeGift = [];
var paidGift = [];
var paidCost = [];
var crossButton;
var inhand_money_text;
var Gift = {

    //#region  CreateChangePicturePopUp
    CreateChangePicturePopUp: function(){
        giftScrollManageCounter = 6;
        Debug.log("Create the Change Picture Pop Up"+giftsArray.length + "         Tick Mark ARray Length......."+giftsTickMarkArray.length);
        if(giftsArray.length > 0){
            for(var i = 0;i<giftsArray.length;i++){
                giftsArray[i] = null;
                giftsTickMarkArray[i] = null;
            }
            giftsArray.length = 0;
            giftsTickMarkArray.length = 0;
        }
        Debug.log("Create the Change Picture Pop Up.............................."+giftsArray.length + "         Tick Mark ARray Length......."+giftsTickMarkArray.length);

        giftPopupOverlay = Utils.SpriteSettingsControl(changePicturePopupOverlay,640,360,'blackOnePixel',"true","true",0.5,0.5,1280,720,"true");
        giftPopupOverlay.alpha = 0.8;

        var giftPopUpTopBar = Utils.SpriteSettingsControl(giftPopUpTopBar,640,30,'whiteOnePixel',"true","true",0.5,0.5,1280,100,"true");
        giftPopUpTopBar.tint = '0x052332';

        var paidPanelRedOverlay = Utils.SpriteSettingsControl(paidPanelRedOverlay,1070,440,'whiteOnePixel',"true","true",0.5,0.5,480,720,"true");
        paidPanelRedOverlay.tint = '0x4A84F3';

        var paidPanelOverlay = Utils.SpriteSettingsControl(paidPanelOverlay,1040,460,'blackOnePixel',"true","true",0.5,0.5,480,620,"true");
        paidPanelOverlay.alpha = 0.5;

        var paidText = Utils.TextSettingsControl(paidText,1055.0,120.0,'PAID',"true","false",0.5,0.5,0.,0.0,"Arial","bold","#ffffff","center","25px");

        crossButton = Utils.ButtonSettingsControl(crossButton, 1220, 45, 'crossButton', this.CrossButtonAnimationDown, null, null, this.CreateButtonAnimationUp, "true", "true", 0.5, 0.5, 0.5, 0.5, this);
        var giftPageHeading = Utils.TextSettingsControl(giftPageHeading,640.0,45.0,'GIFT',"true","false",0.5,0.5,0.,0.0,"Arial","bold","#ffffff","center","25px");


        var _poker_chip_text_showcase = Utils.SpriteSettingsControl(_poker_chip_text_showcase, -150.0, 65.0, 'text_showcase', "true", "true", -1.0, 1.0, 0.4, 0.5, "false");
        var poker_chip = Utils.SpriteSettingsControl(poker_chip, 50.0, 65.0, 'poker_chip', "true", "true", -1.0, 1.0, 0.5, 0.5);

        inhand_money_text = Utils.TextSettingsControl(inhand_money_text, 100.0, 60.0, parseInt(user_amount), "true", "false", -1.0, 1.0, 0., 0.0, "Arial", "bold", "#ffffff", "center", "25px");

        //var sendToAll = Utils.ButtonSettingsControl(sendToAll, 1020, 45, 'blue_base', this.HideGiftPopUp, null, null, null, "true", "true", 0.5, 0.5, 0.7, 0.5, this);
        var sendToAllTxt = Utils.TextSettingsControl(sendToAllTxt,1000.0,40.0,'SEND TO ALL',"true","false",0.5,0.5,0.,0.0,"Arial","bold","#ffffff","center","18px");

        tickMark = Utils.ButtonSettingsControl(tickMark, 890, 40, 'tick_off', this.TickMarkButtonClick, null, null, null, "true", "true", 0.5, 0.5, 0.8, 0.8, this);

        giftgroup = game.add.group();
        priceGroup = game.add.group();
        tickGroup = game.add.group();
       
        giftgroup.add(giftPopUpTopBar);
        giftgroup.add(paidPanelRedOverlay);
        giftgroup.add(paidPanelOverlay);
        giftgroup.add(paidText);

        giftgroup.add(crossButton);
        giftgroup.add(giftPageHeading);

        giftgroup.add(_poker_chip_text_showcase);
        giftgroup.add(poker_chip);
        giftgroup.add(inhand_money_text);

        //giftgroup.add(sendToAll);
        giftgroup.add(sendToAllTxt);
        giftgroup.add(tickMark);

        //this.HideGiftPopUp();
        this.CreateFreeGift();
        this.CreatePaidGift();
        this.DeactivateAllTick();
        this.AddGiftGroup();
    },
    //#endregion

    //#region  UpdateRender
    UpdateRender: function(){
        if(isGiftPopUpVisible){
            game.world.bringToTop(giftPopupOverlay);
            game.world.bringToTop(giftgroup);
            game.world.bringToTop(priceGroup);
            game.world.bringToTop(tickGroup);
        }
    },
    //#endregion

    //#region  CreateFreeGift
    CreateFreeGift: function(){
        for(var i = 0; i<freeGift.length;i++){
            if(freeGift[i] != undefined){
                if(i<=2){
                    Debug.log("Enter into the Create Gift "+freeGift[i]);
                    giftsArray.push(this.CreateGift(freeGift[i],320 + i*150,250));
                }
                else if(i<=5){
                    giftsArray.push(this.CreateGift(freeGift[i],320 + i*150,400));
                }
                else if(i<=8){
                    giftsArray.push(this.CreateGift(freeGift[i],320 + i*150,550));
                }
                else if(i<=11){
                    giftsArray.push(this.CreateGift(freeGift[i],320 + i*150,700));
                }
                else if(i<=14){
                    giftsArray.push(this.CreateGift(freeGift[i],320 + i*150,850));
                }
            }
        }

        // giftsArray.push(this.CreateGift('gift_1',320,250));
        // //giftsTickMarkArray.push(this.CreateTickMark(320,250));

        // giftsArray.push(this.CreateGift('gift_2',320 + 150,250));
        // //giftsTickMarkArray.push(this.CreateTickMark(320 + 150,250));
        
        // giftsArray.push(this.CreateGift('gift_3',470 + 150,250));
        // //giftsTickMarkArray.push(this.CreateTickMark(470 + 150,250));


        // giftsArray.push(this.CreateGift('gift_4',320,400));
        // //giftsTickMarkArray.push(this.CreateTickMark(320,400));
        // giftsArray.push(this.CreateGift('gift_5',320 + 150,400));
        // //giftsTickMarkArray.push(this.CreateTickMark(470,400));
        // giftsArray.push(this.CreateGift('gift_6',470 + 150,400));
        // //giftsTickMarkArray.push(this.CreateTickMark(470+150,400));

        // giftsArray.push(this.CreateGift('gift_7',320,550));
        // //giftsTickMarkArray.push(this.CreateTickMark(320,550));
        // giftsArray.push(this.CreateGift('gift_8',320 + 150,550));
        // //giftsTickMarkArray.push(this.CreateTickMark(320+150,550));
        // giftsArray.push(this.CreateGift('gift_9',470 + 150,550));
        //giftsTickMarkArray.push(this.CreateTickMark(470+150,550));
    },
    //#endregion

    //#region  CreatePaidGift
    CreatePaidGift: function(){
        if(paidGift.length >0){
            for(var i = 0;i<paidGift.length;i++){
                if(i <= 1){
                    giftsArray.push(this.CreateGift(paidGift[i],980 + i*150,250));
                    var poker_chip = Utils.SpriteSettingsControl(poker_chip, 950 + i*150, 287.0, 'poker_chip', "true", "true", 0.5, 0.5, 0.2, 0.2);
                    var poker_chip_text = Utils.TextSettingsControl(poker_chip_text, 990 + i*150, 290.0, paidCost[i], "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold","#ffffff", "center", "20px");
                    priceGroup.add(poker_chip);
                    priceGroup.add(poker_chip_text);
                }
                else if(i <= 3){
                    giftsArray.push(this.CreateGift(paidGift[i],980 + i*150,400));
                    var poker_chip = Utils.SpriteSettingsControl(poker_chip, 950 + i*150, 430.0, 'poker_chip', "true", "true", 0.5, 0.5, 0.2, 0.2);
                    var poker_chip_text = Utils.TextSettingsControl(poker_chip_text, 990 + i*150, 433.0, paidCost[i], "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold","#ffffff", "center", "20px");
                    priceGroup.add(poker_chip);
                    priceGroup.add(poker_chip_text);
                }
                else if(i <= 5){
                    giftsArray.push(this.CreateGift(paidGift[i],980 + i*150,550));
                    var poker_chip = Utils.SpriteSettingsControl(poker_chip, 950 + i*150, 580.0, 'poker_chip', "true", "true", 0.5, 0.5, 0.2, 0.2);
                    var poker_chip_text = Utils.TextSettingsControl(poker_chip_text, 990 + i*150, 583.0, paidCost[i], "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold","#ffffff", "center", "20px");
                    priceGroup.add(poker_chip);
                    priceGroup.add(poker_chip_text);
                }
            }
        }

        // giftsArray.push(this.CreateGift('gift_10',980,250));
        // //giftsTickMarkArray.push(this.CreateTickMark(980,250));
        // var poker_chip = Utils.SpriteSettingsControl(poker_chip, 940.0 + 15, 287.0, 'poker_chip', "true", "true", 0.5, 0.5, 0.2, 0.2);
        // var poker_chip_text = Utils.TextSettingsControl(poker_chip_text, 975.0 + 15, 290.0, '1000', "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold","#ffffff", "center", "20px");
        // priceGroup.add(poker_chip);
        // priceGroup.add(poker_chip_text);

        // giftsArray.push(this.CreateGift('gift_11',980 + 150,250));
        // //giftsTickMarkArray.push(this.CreateTickMark(980+150,250));
        // var poker_chip = Utils.SpriteSettingsControl(poker_chip, 1090.0 + 15, 287.0, 'poker_chip', "true", "true", 0.5, 0.5, 0.2, 0.2);
        // var poker_chip_text = Utils.TextSettingsControl(poker_chip_text, 1140.0, 290.0, '1000', "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold","#ffffff", "center", "20px");
        // priceGroup.add(poker_chip);
        // priceGroup.add(poker_chip_text);

        // giftsArray.push(this.CreateGift('gift_12',980,400));
        // giftsTickMarkArray.push(this.CreateTickMark(980,400));
        // var poker_chip = Utils.SpriteSettingsControl(_poker_chip, 940.0 + 15, 430.0, 'poker_chip', "true", "true", 0.5, 0.5, 0.2, 0.2);
        // var poker_chip_text = Utils.TextSettingsControl(poker_chip_text, 975.0 + 15, 433.0, '1000', "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold","#ffffff", "center", "20px");
        // priceGroup.add(poker_chip);
        // priceGroup.add(poker_chip_text);

        // giftsArray.push(this.CreateGift('gift_13',980 + 150,400));
        // giftsTickMarkArray.push(this.CreateTickMark(980+150,400));
        // poker_chip = Utils.SpriteSettingsControl(_poker_chip, 1090.0 + 15, 430.0, 'poker_chip', "true", "true", 0.5, 0.5, 0.2, 0.2);
        // var poker_chip_text = Utils.TextSettingsControl(poker_chip_text, 1140.0, 433.0, '1000', "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold","#ffffff", "center", "20px");
        // priceGroup.add(poker_chip);
        // priceGroup.add(poker_chip_text);

        // giftsArray.push(this.CreateGift('gift_14',980,550));
        // giftsTickMarkArray.push(this.CreateTickMark(980,550));
        // poker_chip = Utils.SpriteSettingsControl(_poker_chip, 940.0 + 15, 580.0, 'poker_chip', "true", "true", 0.5, 0.5, 0.2, 0.2);
        // var poker_chip_text = Utils.TextSettingsControl(poker_chip_text, 975.0 + 15, 583.0, '1000', "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold","#ffffff", "center", "20px");
        // priceGroup.add(poker_chip);
        // priceGroup.add(poker_chip_text);

        // giftsArray.push(this.CreateGift('gift_15',980 + 150,550));
        // giftsTickMarkArray.push(this.CreateTickMark(980+150,550));
        // poker_chip = Utils.SpriteSettingsControl(_poker_chip, 1090.0 + 15.0, 580.0, 'poker_chip', "true", "true", 0.5, 0.5, 0.2, 0.2);
        // var poker_chip_text = Utils.TextSettingsControl(poker_chip_text, 1140.0, 583.0, '1000', "true", "false", 0.5, 0.5, 0.0, 0.0, "Arial", "bold","#ffffff", "center", "20px");
        // priceGroup.add(poker_chip);
        // priceGroup.add(poker_chip_text);

        this.HideGiftPopUp();
    },
    //#endregion

    //#region  AddGiftGroup
    AddGiftGroup: function(){
        for(var i = 0;i<giftsArray.length;i++){
            giftgroup.add(giftsArray[i]);
        }
        for(var i = 0;i<giftsTickMarkArray.length;i++){
            //giftgroup.add(giftsTickMarkArray[i]);
            tickGroup.add(giftsTickMarkArray[i]);
        }
    },
    //#endregion

    //#region  CreateGift
    CreateGift: function(index,x, y) {  
        var createGiftGroup = game.add.group();
        var background = Utils.SpriteSettingsControl(background,x,y,'gift_base',"true","true",0.5,0.5,0.55,0.5);
        var pic = game.add.button(x, y - 20, index);
        pic.anchor.set(0.5, 0.5);
        pic.scale.set(0.3, 0.3);
        pic.events.onInputDown.add(this.PictureButtonClick,this);
        createGiftGroup.add(background);
        createGiftGroup.add(pic);
        return createGiftGroup;
    },
    //#endregion

    CreateTickMark: function(x,y){
        gift_tick_mark = game.add.sprite(x,y,'setting_tick_mark');
        gift_tick_mark.anchor.set(0, 0);
        gift_tick_mark.scale.set(1.0, 1.0);
        return gift_tick_mark;
    },

    //#region  PictureButtonClick
    PictureButtonClick: function(index){
        this.DeactivateAllTick();
        giftImageName = index.key;
        var test = giftImageName.split('_');
        Debug.log("The name of the Sprite......"+test[1]);
        //giftsTickMarkArray[test[1] - 1].visible = true;
        gift_id = (test[1]);

        Debug.log("Enter into the submit button clicked"+giftImageName);
        if(giftImageName != null){
            this.HideGiftPopUp();
            Debug.log("The Cost of the paid Gift......"+this.ReturnGiftValue(giftImageName));
            Client.SendGiftEmit(gift_id,this.ReturnGiftValue(giftImageName));
        }
        else{
            PopUp.GenerateCommonPopup('Please Select An Image \n          For Change');
        }
    },
    //#endregion

    DeactivateAllTick: function(){
        for (var i = 0; i < giftsTickMarkArray.length; i++) {
            giftsTickMarkArray[i].visible = false;
        }
    },

    //#region  HideGiftPopUp
    HideGiftPopUp: function(){
        giftgroup.visible = false;
        giftPopupOverlay.visible = false;
        priceGroup.visible = false;
        tickGroup.visible = false;
        isGiftPopUpVisible =  false;
        specificPage = "";
    },
    //#endregion

    //#region  CrossButtonnimation
    CrossButtonAnimationDown: function(){
        game.add.tween(crossButton.scale).to({ x: 0.45, y: 0.45}, 100, Phaser.Easing.Linear.Out, true);
    },
    CreateButtonAnimationUp : function(){
        game.add.tween(crossButton.scale).to({ x: 0.5, y: 0.5}, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            this.HideGiftPopUp();
        }, 100);
    },
    //#endregion

    //#region  ShowGiftPopUp
    ShowGiftPopUp: function(){
        giftgroup.visible = true;
        giftPopupOverlay.visible = true;
        priceGroup.visible = true;
        tickGroup.visible = true;
        isGiftPopUpVisible = true;
        isSendToAll = false;
        this.DeactivateAllTick();
        tickMark.loadTexture('tick_off');
        var amount = "";
        for(var i = 0;i<allPlayers.length;i++){
            if(allPlayers[i] != null){
                if(allPlayers[i].playerId == user_id){
                    amount = allPlayers[i].playerInhandMoney;
                }
                allPlayers[i].giftIcon.inputEnabled = true;
            }
        }
        Debug.log("The AMount.............."+amount);
        inhand_money_text.setText(amount);
    },
    //#endregion

    //#region  TickMarkButtonClick
    TickMarkButtonClick: function(){
        if(isSendToAll){
            isSendToAll = false;
            tickMark.loadTexture('tick_off');
        }
        else{
            isSendToAll = true;
            tickMark.loadTexture('tick_on');
        }
    },
    //#endregion

    //#region  ReturnGiftValue
    ReturnGiftValue: function(_gift_id){
        var coinValue;
        Debug.log("The Gift Id......"+_gift_id + "The PaidGift Index....."+paidGift.indexOf(_gift_id) + "The PaidCost ..........."+paidCost[paidGift.indexOf(_gift_id)]);
        if(paidGift.indexOf(_gift_id) == -1){
            coinValue = "0";
        }
        else{
            coinValue = paidCost[paidGift.indexOf(_gift_id)];
        }
        return coinValue;
    },
    //#endregion

    //#region ParseJson
    ParseJson: function(data){
        Debug.log("The data.........."+data.status);
        if(freeGift.length > 0){
            freeGift.length = 0;
        }
        if(paidGift.length > 0){
            paidGift.length = 0;
        }
        if(paidCost.length > 0){
            paidCost.length = 0;
        }
        Debug.log("The free gift Length........"+freeGift.length);
        for(var i=0;i<data.result.length;i++){
            if(data.result[i].cost == "0.00"){
                freeGift[i] = this.ReturnGiftName(data.result[i].gift_name);
                console.log("The name of free gift......."+freeGift[i] + "Length..........."+freeGift.length);
            }
            else{
                paidGift[i] = this.ReturnGiftName(data.result[i].gift_name);
                paidCost[i] = data.result[i].cost;
                console.log("The name of paid gift......."+paidGift[i]);
            }
        }
        freeGift = freeGift.filter(function(element) {
            return element !== undefined;
        });
        paidGift = paidGift.filter(function(element) {
            return element !== undefined;
        });
        paidCost = paidCost.filter(function(element) {
            return element !== undefined;
        });
        Gift.CreateChangePicturePopUp();
        Gift.ShowGiftPopUp();
    },
    //#endregion

    //#region  ReturnGiftName
    ReturnGiftName: function(giftName){
        switch(giftName){
            case "Gun":
                return "gift_1";
                break;
            case "Champaign":
                return "gift_2";
                break;
            case "Globe":
                return "gift_3";
                break;
            case "Flower":
                return "gift_4";
                break;
            case "Bell":
                return "gift_5";
                break;
            case "Book":
                return "gift_6";
                break;
            case "Candle":
                return "gift_7";
                break;
            case "Guitar":
                return "gift_8";
                break;
            case "Torch":
                return "gift_9";
                break;
            case "Scissors":
                return "gift_10";
                break;
            case "Ice Cream":
                return "gift_11";
                break;
            case "Juice":
                return "gift_12";
                break;
            case "Pen":
                return "gift_13";
                break;
            case "Key":
                return "gift_14";
                break;
            case "Gift Box":
                return "gift_15";
                break;
        }
    }
    //#endregion
};