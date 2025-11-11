var Player = function(){
    this.playerId = 0;
    this.playerName = "NONE";
    this.playerInhandMoney = 0;
    this.playerSprite = "NONE";
    this.bootAmount = 0;
    this.sittingIndex = "";
    this.groupName =  "";
    this.card = [];
    this.seeCard = [];

    this.dealerIcon = "";
    this.giftIcon = "";
    this.onlineUser = "";
    this.onlineUserInhandMoneyTextShowcase = "";
    this.onlineUserInhandMoneyIcon = "";
    this.crownIcon = "";
    this.timerImage = "";
    this.timerImagePosX = "";
    this.timerImagePosY = "";
    this.decisionText = "";
    this.decisionBase = "";
    this.bootAmountText = "";
    this.bootAmountBase = "";
    this.userName = "";
    this.packBase = "";
    this.nameText = "";
    this.desicionText = "";
    this.bootAmountText = "";
    this.decisionText = "";
    this.decisionTextValue = "";
    this.pokerChip = "";
    this.inhandMoneyText = "";
    this.playerOnlineRing = "";
    this.playerPosX = "";
    this.playerPosY = "";
    this.spriteMaking = "";
    this.sideShowGlow = "";
    this.smallCrownImage = "";
    this.timerCounter = 0;
    this.isDead = false;
    // this.angle = { min: 0, max: 0 };

    this.CreatePlayer = function(playerPosX,playerPosY,dealerIconPosx,dealerIconPosY,giftIconPosX,giftIconPosY,
                            namePosX,namePosY,timerImagePosX,timerImagePosY,decisionImagePosX,decisionImagePosY,
                            decisionTextX,decisionTextY,bootAmountImagePosX,bootAmountImagePosY,bootAmountTextPosX,bootAmountTextPosY,bootIconPosX,bootIconPosY,
                            inhandMoneyBasePosx,inhandMoneyBasePosY,inhandMoneyPosX,inhandMoneyPosY,crownPosX,crownPosY,packBaseX,packBaseY,inhandMoneyTextPosX,inhandMoneyTextPosY,playerType,
                            smallCrownImagePosX,smallCrownImagePosY){
        // giftSenderPosX = playerPosX;
        // giftSenderPosY = playerPosY;
        this.playerPosX = playerPosX;
        this.playerPosY = playerPosY;
        Debug.log("Inside Create Player ........."+Database.user_image);
        if(playerType == "Online"){
            this.onlineUser = Utils.SpriteSettingsControl(this.onlineUser,playerPosX,playerPosY,this.playerSprite,"true","true",0.5,0.5,0.5,0.5);
            this.spriteMaking = Utils.SpriteMasking(this.onlineUser,playerPosX,playerPosY,168);
            this.playerOnlineRing = Utils.SpriteSettingsControl(this.playerOnlineRing,playerPosX,playerPosY,'user_ring',"true","true",0.5,0.5,0.5,0.5);
            this.onlineUserInhandMoneyTextShowcase = Utils.SpriteSettingsControl(this.onlineUserInhandMoneyTextShowcase,inhandMoneyBasePosx + 20,inhandMoneyBasePosY,'inHandMoneyHolder',"true","true",0.5,0.5,0.5,0.5);
            this.dealerIcon = Utils.SpriteSettingsControl(this.dealerIcon,dealerIconPosx,dealerIconPosY,'delaer_icon',"true","true",0.5,0.5,0.55,0.55);
            //this.giftIcon = Utils.SpriteSettingsControl(this.giftIcon,giftIconPosX,giftIconPosY,'gift_icon',"true","true",0.5,0.5,0.65,0.65);
            this.giftIcon = Utils.ButtonSettingsControl(this.giftIcon,giftIconPosX,giftIconPosY,'gift_icon',this.GiftButtonClick,null,null,null,"true","true",0.5,0.5,0.75,0.75,this);
            this.decisionBase = Utils.SpriteSettingsControl(this.decisionBase,decisionImagePosX,decisionImagePosY,'decision_image',"true","true",0.5,0.5,0.6,0.6);
            this.packBase = Utils.SpriteSettingsControl(this.packBase,packBaseX,packBaseY,'pack_image',"true","true",0.5,0.5,0.55,0.55);
            this.onlineUserInhandMoneyIcon = Utils.SpriteSettingsControl(this.onlineUserInhandMoneyIcon,inhandMoneyPosX,inhandMoneyPosY,'chaal_limit_icon',"true","true",0.5,0.5,0.7,0.7);
            this.inhandMoneyText = Utils.TextSettingsControl(this.inhandMoneyText,inhandMoneyTextPosX,inhandMoneyTextPosY,this.playerInhandMoney,"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","21px");
            this.crownIcon = Utils.SpriteSettingsControl(this.crownIcon,crownPosX,crownPosY,'crown_image',"true","true",0.5,0.5,1.0,1.0);
            this.smallCrownImage = Utils.SpriteSettingsControl(this.smallCrownImage,smallCrownImagePosX,smallCrownImagePosY,'smallCrownImage',"true","true",0.5,0.5,0.5,0.5);
        }               
        else{
            this.onlineUser = Utils.SpriteSettingsControl(this.onlineUser,playerPosX,playerPosY,this.playerSprite,"true","true",0.5,0.5,0.45,0.45);
            this.spriteMaking = Utils.SpriteMasking(this.onlineUser,playerPosX,playerPosY,136);
            this.playerOnlineRing = Utils.SpriteSettingsControl(this.playerOnlineRing,playerPosX,playerPosY,'user_ring',"true","true",0.5,0.5,0.43,0.43);
            this.onlineUserInhandMoneyTextShowcase = Utils.SpriteSettingsControl(this.onlineUserInhandMoneyTextShowcase,inhandMoneyBasePosx,inhandMoneyBasePosY,'text_showcase',"true","true",0.5,0.5,0.3,0.3);
            this.dealerIcon = Utils.SpriteSettingsControl(this.dealerIcon,dealerIconPosx,dealerIconPosY,'delaer_icon',"true","true",0.5,0.5,0.45,0.45);
          //  this.giftIcon = Utils.SpriteSettingsControl(this.giftIcon,giftIconPosX,giftIconPosY,'gift_icon',"true","true",0.5,0.5,0.55,0.55);
            this.giftIcon = Utils.ButtonSettingsControl(this.giftIcon,giftIconPosX,giftIconPosY,'gift_icon',this.GiftButtonClick,null,null,null,"true","true",0.5,0.5,0.65,0.65,this);   
            this.decisionBase = Utils.SpriteSettingsControl(this.decisionBase,decisionImagePosX,decisionImagePosY,'decision_image',"true","true",0.5,0.5,0.5,0.5);
            this.packBase = Utils.SpriteSettingsControl(this.packBase,packBaseX,packBaseY,'pack_image',"true","true",0.5,0.5,0.45,0.45);
            this.onlineUserInhandMoneyIcon = Utils.SpriteSettingsControl(this.onlineUserInhandMoneyIcon,inhandMoneyPosX,inhandMoneyPosY,'chaal_limit_icon',"true","true",0.5,0.5,0.3,0.3);
            this.inhandMoneyText = Utils.TextSettingsControl(this.inhandMoneyText,inhandMoneyTextPosX,inhandMoneyTextPosY,this.playerInhandMoney,"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","20px");    
            this.crownIcon = Utils.SpriteSettingsControl(this.crownIcon,crownPosX,crownPosY,'crown_image',"true","true",0.5,0.5,0.8,0.8);
            this.smallCrownImage = Utils.SpriteSettingsControl(this.smallCrownImage,smallCrownImagePosX,smallCrownImagePosY,'smallCrownImage',"true","true",0.5,0.5,0.4,0.4);
        }
        Debug.log("The Boot Amount........."+this.bootAmount);
        this.bootAmountBase = Utils.SpriteSettingsControl(this.bootAmountBase,bootAmountImagePosX,bootAmountImagePosY,'text_showcase',"true","true",0.5,0.5,0.25,0.25);
        if(this.playerName.length > 5){
            this.playerName = this.playerName.substring(0,5) + "...";
            this.nameText = Utils.TextSettingsControl(this.nameText,namePosX,namePosY,this.playerName,"true","false",0.5,0.5,0.,0.0,"Arial","","#ffffff","center","20px");
        }
        else{
            this.nameText = Utils.TextSettingsControl(this.nameText,namePosX,namePosY,this.playerName,"true","false",0.5,0.5,0.,0.0,"Arial","","#ffffff","center","20px");
        }
        this.bootAmountText = Utils.TextSettingsControl(this.bootAmountText,bootAmountTextPosX,bootAmountTextPosY,parseInt(this.bootAmount),"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","16px");
        this.decisionText = Utils.TextSettingsControl(this.decisionText,decisionTextX,decisionTextY,this.decisionTextValue,"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","16px");
        this.pokerChip = Utils.SpriteSettingsControl(this.pokerChip,bootIconPosX,bootIconPosY,'poker_chip',"true","true",0.5,0.5,0.25,0.25);

        this.timerImagePosX = timerImagePosX;
        this.timerImagePosY = timerImagePosY;

        this.EnableDisableAllBootAmount(false);
        this.EnableDisableAllDecisionBase(false);
        // if(gameType == "Classic"){
        //     this.EnableDisableCrownIcon(false);
        // }
        // else{
        this.EnableDisableCrownIcon(false);
        // }
        this.EnableDisableDealerIcon(false);
        this.EnableDisablePackDecision(false);
        this.EnableDisableSmallCrownImage(false);

        if(playerType == "Online"){
            Debug.log("Enter into The Online User................");
            this.EnableDisableInHandMoney(true);
            this.EnableDisableGiftIcon(false);
        }
        else{
            this.EnableDisableGiftIcon(false);
            this.EnableDisableInHandMoney(false);
        }
        isGiftIconTopShown = true;
        this.groupName = game.add.group();
        // this.groupName.position.setTo(0.5,0.5);
        // this.groupName.anchor.set(0.5,0.5);
        this.AddToGroup();
        if(playerType == "Online"){
            this.CreateGlow(playerPosX,playerPosY-10,0.45);
        }
        else{
            this.CreateGlow(playerPosX,playerPosY-10,0.35);
        }
        this.EnableDisableGlow(false);
        // this.isDead = false;
        Debug.log("The Boot Amount of GameType......."+gameType + "BootAmount........"+this.bootAmount);
        //this.SetTimeOut();
    }
    this.UpdateCounter = function(){
        this.timerCounter++;
        //counter++;
    }
    this.InhandMoneyToTop = function(){
        //console.log("Enter into the InHand Money Top...........................................................");
        //if(isCrownTopRender){
            game.world.bringToTop(this.onlineUserInhandMoneyTextShowcase);
            game.world.bringToTop(this.onlineUserInhandMoneyIcon);
            game.world.bringToTop(this.inhandMoneyText);
            game.world.bringToTop(this.smallCrownImage);
        //}
    }
    this.UpdateTimer = function(diameter) {
        //Debug.log("Enter into the Update TImer............."+this.timerImagePosX + "Psotion Y.........."+this.timerImagePosY);
        if(isPlayerTimerCreate){
            this.angle = { min: 0, max: 0 };
            this.timerImage = game.add.graphics(0,0);
            var tween = game.add.tween(this.angle).to({ max: 360 }, waitingTimeInterval - 2000, "Linear", true, 0, 0, false);
            this.timerCounter = 0;
            //counter = 0;
            game.time.events.loop(1000, this.UpdateCounter, this);
            game.time.events.start();
            isPlayerTimerCreate = false;
        }
        if(this.timerImage != null){
            this.timerImage.clear();
            //console.log("Waiting TimeInterval..........."+seconds);
            // this.timerImage.lineStyle(2, 0x78eaff);
            // this.timerImage.alpha = 0.6;
            //if (timeElapsed <= totalTime) {
                if(this.timerCounter >= 15){
                // if(counter >= 15){
                    //console.log("Waiting TimeInterval..........."+waitingTimeInterval);
                    this.timerImage.lineStyle(2,0xff0000);//0x78eaff); 
                    this.timerImage.beginFill(0xff0000)//0x78eaff);
                    SoundManager.PlayTimeEndNotificationSound();
                }
                else{
                    this.timerImage.lineStyle(2, 0xd5b001);
                    this.timerImage.beginFill(0xd5b001);
                }
            //}
            this.timerImage.alpha = 0.6;
            // this.timerImage.beginFill(0x78eaff);
            this.timerImage.arc(this.timerImagePosX, this.timerImagePosY, diameter, 0, game.math.degToRad(this.angle.max), true, 128);
            this.timerImage.endFill();
            //this.timerImage.z = 8;
            return game.math.degToRad(this.angle.max);
        }
        // if(counter == 20){
        //     game.time.events.stop();
        // }
    }
    this.EnableDisableSmallCrownImage = function(isShow){
        // if(!this.isDead){
            this.smallCrownImage.visible = isShow;
            return this.smallCrownImage;
        // }
    }
    this.EnableDisableDealerIcon = function(isShow){
        this.dealerIcon.visible = isShow;
        isDealerIconTopShow = isShow;
    }
    this.EnableDisableCrownIcon = function(isShow){
        this.crownIcon.visible = isShow;
    }
    this.EnableDisableTimerImage = function(isShow){
        this.timerImage.visible = isShow;
    }
    this.EnableDisablePackDecision = function(isShow){
        console.log("Enter into the Pack Decision base");
        this.packBase.visible = isShow;
        this.decisionText.visible = isShow;
    }
    this.EnableDisableInHandMoney = function(isShow){
        this.onlineUserInhandMoneyTextShowcase.visible = isShow;
        this.onlineUserInhandMoneyIcon.visible = isShow;
        this.inhandMoneyText.visible = isShow;
    }
    this.EnableDisableAllDecisionBase = function(isShow){
        console.log("Enter into the Other Decision base");
        this.decisionBase.visible = isShow;
        this.decisionText.visible = isShow;
    }
    this.UpdateDecisionTextValue = function(){
        this.decisionText.setText(this.decisionTextValue);
    }
    this.EnableDisableAllBootAmount = function(isShow){
        this.pokerChip.visible = isShow;
        this.bootAmountBase.visible = isShow;
        this.bootAmountText.visible = isShow;
    }
    this.EnableDisableGlow = function(isShow){
        this.sideShowGlow.visible = isShow;
    }
    this.AddToGroup = function(){
        this.groupName.add(this.onlineUser);
        this.groupName.add(this.spriteMaking);
        this.groupName.add(this.playerOnlineRing);
        // this.groupName.add(this.onlineUserInhandMoneyTextShowcase);
        // this.groupName.add(this.onlineUserInhandMoneyIcon);
        //this.groupName.add(this.dealerIcon);
        //this.groupName.add(this.giftIcon);
        this.groupName.add(this.decisionBase);
        this.groupName.add(this.packBase);
        this.groupName.add(this.bootAmountBase);
        this.groupName.add(this.nameText);
        this.groupName.add(this.bootAmountText);
        this.groupName.add(this.decisionText);

        this.groupName.add(this.pokerChip);
        // this.groupName.add(this.inhandMoneyText);
        this.groupName.add(this.crownIcon);
        
    }
    this.CollectBootAmountAnimation = function() {
        Debug.log("The Animation");

        var bootAmountBase = game.add.tween(this.bootAmountBase).to({ x: _pot_amount_text_showcase.x, y: _pot_amount_text_showcase.y }, 800, Phaser.Easing.Linear.Out, true);
        bootAmountBase.onComplete.add(this.CompleteBootAmountCollection, this);

        var bootIconTween = game.add.tween(this.pokerChip).to({ x: _pot_amount_icon.x + 50, y: _pot_amount_icon.y }, 800, Phaser.Easing.Linear.Out, true);
        bootIconTween.onComplete.add(this.CompleteBootAmountCollection, this);

        this.bootAmountText.setText(onlineServerEvent.GameAmount(gameType));
        var bootAmountTextTween = game.add.tween(this.bootAmountText).to({ x: _pot_amount.x, y: _pot_amount.y }, 800, Phaser.Easing.Linear.Out, true);
        bootAmountTextTween.onComplete.add(this.CompleteBootAmountCollection, this);
    }
    this.CompleteBootAmountCollection = function(){
        Debug.log("ENter into the complete boot amount colllection");
        this.EnableDisableAllBootAmount(false);
    }
    this.HideTimer = function(){
        this.timerImage.visible = false;
    }
    // this.SetTimeOut = function(){
    //     setTimeout(function(){isPlayerTimer = false;},4000);
    // }
    this.UpdatePlayerInHandMoney = function(playerInHandMoney){
        console.log("Update Player In Hand Money in Player........"+playerInHandMoney);
        this.playerInhandMoney = playerInHandMoney;
        user_amount = playerInHandMoney;
        this.inhandMoneyText.setText(playerInHandMoney);
        console.log("User Amount........"+user_amount);
    }
    this.GiftButtonClick = function(){
        //Gift.ShowGiftPopUp();
        if(user_amount > giftLimit){
            specificPage = "GiftPage";
            API.GiftAPI();
            gift_to_id = this.playerId;
            this.giftIcon.inputEnabled = false;
            // giftReceiverPosX = this.playerPosX;
            // giftReceiverPosY = this.playerPosY;
            console.log("The Gift To_id..........."+gift_to_id + "Gift Click Player Pos...........X" + this.playerPosX + "Gift CLick Player Pos Y........"+this.playerPosY);
        }
        else{
            PopUp.GenerateCommonPopup('You have not enough Balance for gift');
        }
    }
    this.EnableDisableGiftIcon = function(isShow){
        this.giftIcon.visible = isShow;
        isGiftIconTopShown = isShow;
    }
    this.ShowGiftIconToTop = function() {
        if (isGiftIconTopShown) {
          //  Debug.log("Enter into the Gift Icon Renderer");
            game.world.bringToTop(this.giftIcon);
        }
    }
    this.ShowDealerIcon = function(){
        if(isDealerIconTopShow){
           // Debug.log("Enter into the Dealer Icon Renderer");
            game.world.bringToTop(this.dealerIcon);
        }
    }
    // this.ShowCrownImageTop = function(){
    //     game.world.bringToTop(this.smallCrownImage);
    // }
    this.CreateGlow = function(playerPosX,playerPosY,scale){
        this.sideShowGlow = game.add.sprite(playerPosX, playerPosY, 'sideshowglow');
        this.sideShowGlow.anchor.setTo(0.5,0.5);
        this.sideShowGlow.scale.setTo(scale,scale);
        var anim = this.sideShowGlow.animations.add('anim');
        this.sideShowGlow.animations.play('anim',20, true);
    }
    this.SetAllPlayerBootAmountPosition = function(baseAmountImagePosX,baseAmountImagePosY,bootIconPosX,bootIconPosY,
                                                    baseAmountTextPosX,baseAmountTextPosY){
        
        this.bootAmountBase.position.set(baseAmountImagePosX,baseAmountImagePosY);
        this.pokerChip.position.set(bootIconPosX,bootIconPosY);
        this.bootAmountText.position.set(baseAmountTextPosX,baseAmountTextPosY);
    }
}
