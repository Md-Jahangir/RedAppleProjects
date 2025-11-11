var claimPrizeScrollableGroup;
var ticketCheckBoxArray = [];
var previousObj;
var claimPrizeId = [];
var claimServerPrizeId = [];
var quote = "\"";
var Claim = function() {};
Claim.prototype = {
    init: function() {
        Utils.ScaleManager();
    },
    preload: function() {
        claimServerPrizeId = [];
        game.stage.disableVisibilityChange = true;
        game.time.advancedTiming = true;
        ticketCheckBoxArray = [];
        claimPrizeId = [];
        for (var i = 0; i < prizeListResponse.result.length; i++) {
            game.load.image('prize_url' + i, prizeListResponse.result[i].prizeImage);
            claimServerPrizeId.push(prizeListResponse.result[i]._id);
        }
    },
    create: function() {
        var menuBg = Utils.SpriteSettingsControl(menuBg, game.world.centerX, game.world.centerY, 'menu_bg', "true", "true", 0.5, 0.5, 1, 1, "false");
        var topArea = Utils.SpriteSettingsControl(topArea, game.world.centerX, game.world.centerY - Math.round(game.height / 2.1), 'claim_top_area', "true", "true", 0.5, 0.5, 1, 1, "false");



        claimPrizeScrollableGroup = game.add.group();
        var claimPrizeMask = game.add.graphics(0, 0);
        claimPrizeMask.drawRect(0, Math.round(game.height / 5), game.width, Math.round(game.height / 1.6));
        claimPrizeScrollableGroup.mask = claimPrizeMask;

        this.CreateBonusRewardField();
        this.CreateEarnedRewardField();
        this.CreatePrizeList();
        this.CreateMenuScroller();

        var claimPrizeTextStyle = { font: '40px Lato-Heavy', fill: '#ffffff', align: 'center' };
        claimPrizeText = game.add.text(game.world.centerX, game.world.centerY - Math.round(game.height / 2.7), "Claim your prizes against on\n1 lakh earned coins.Rest of the amount of\nearned coins will be transfered to your bonus\naccount", claimPrizeTextStyle);
        claimPrizeText.anchor.set(0.5, 0.5);
        settingsBackButton = Utils.ButtonSettingsControl(settingsBackButton, game.world.centerX, game.world.centerY + Math.round(game.height / 2.16), 'back_button', this.SettingsBackButtonPressed, null, null, this.SettingsBackButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);


        var claimNowBttn = Utils.ButtonSettingsControl(claimNowBttn, game.world.centerX, game.world.centerY + Math.round(game.height / 2.7), 'join_button_base', this.ClaimBttnPressed, null, null, this.ClaimBttnReleased, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        var claimNowTextStyle = { font: '40px Lato-Heavy', fill: '#08252D', align: 'center' };
        var cliamNowBttnTxt = game.add.text(game.world.centerX, game.world.centerY + Math.round(game.height / 2.75), "CLAIM NOW", claimNowTextStyle);
        cliamNowBttnTxt.anchor.set(0.5, 0.5);

        if(_menuPageTotalRewardAmount >=100000){
            claimNowBttn.alpha=1;
            claimNowBttn.inputEnabled = true;
        }else{
            claimNowBttn.alpha=0.5;
            claimNowBttn.inputEnabled = false;
        }

        this.DisableAllRightSign();
    },
    CreatePrizeList: function() {
        for (var i = 0; i < prizeListResponse.result.length; i++) {
            this.ShowClaimPrizeListing(i);
        }
    },
    ShowClaimPrizeListing: function(_index) {
        var claimInfoBox = Utils.SpriteSettingsControl(claimInfoBox, game.world.centerX - 100, (game.world.centerY - game.height / 7) + (_index * (game.height / 3.5)), 'adPanel', "true", "true", 0.5, 0.5, 0.7, 0.7, "false");

        var transparentImage = Utils.SpriteSettingsControl(transparentImage, game.world.centerX - 100, (game.world.centerY - game.height / 7) + (_index * (game.height / 3.5)), 'prize_url' + _index, "true", "true", 0.5, 0.5, 1, 1, "false");


        claimInfoBox.inputEnabled = true;
        claimInfoBox.events.onInputDown.add(this.claimInfoBoxPressed, this);
        claimInfoBox.events.onInputUp.add(this.claimInfoBoxReleased, this);

        this.CreateMenuInfoBoxBgForScrolling(claimInfoBox);
        this.CreateOneTicketCheckBox(claimInfoBox, _index);
        claimPrizeScrollableGroup.add(claimInfoBox);
        claimPrizeScrollableGroup.add(transparentImage);
    },

    claimInfoBoxPressed: function(_this) {
        menuStartPos = game.input.y;
        menuIsMouseDown = true;
    },
    claimInfoBoxReleased: function(_this) {
        menuIsMouseDown = false;
    },
    CreateMenuInfoBoxBgForScrolling: function(_menuInfoBox) {
        var menuInfoBoxBg = Utils.SpriteSettingsControl(menuInfoBoxBg, 0, 0, 'transparent_image', "true", "true", 0.5, 0.5, 300, 300, "false");
        menuInfoBoxBg.scale.x = 1800;
        menuInfoBoxBg.scale.y = 790;
        menuInfoBoxBg.alpha = 0.00001;
        _menuInfoBox.addChild(menuInfoBoxBg);
    },
    ClaimBttnPressed: function() {

    },
    ClaimBttnReleased: function() {
        if(_menuPageTotalRewardAmount >= 100000)
        {
        if (claimPrizeId.length > 0) {
            // console.log("Enter into the Claim Button Released"+claimPrizeId.length);
            var jsonformat = "";
            var _tempArray = [];
            // jsonformat += quote;
            for (var i = 0; i < claimPrizeId.length; i++) {
                _tempArray.push(claimServerPrizeId[claimPrizeId[i]]);
                if (i < (claimPrizeId.length - 1)) {
                    jsonformat += _tempArray[i] + ",";
                } else {
                    jsonformat += _tempArray[i];
                }
            }
            // jsonformat += quote;
            // console.log("The Claim Bttn Array...............",jsonformat);
            API.ClaimPrize(jsonformat, localStorage.getItem("access_token"));
        } else {
            Alert.ShowAlert("Please Select Atleast One Item");
        }
        }
        else{
            Alert.ShowAlert("Your Earned Coin is not more than 1 lakh");
        }
    },
    // ClaimBttnReleased: function()
    // {
    //     // if(_menuPageTotalRewardAmount > 100000)
    //     // {
    //         if(claimPrizeId.length > 0)
    //         {
    //             console.log("Enter into the Claim Button Released"+claimPrizeId.length);
    //             var jsonformat = "";
    //             var _tempArray = [];
    //             // jsonformat += quote;
    //             for(var i = 0;i<claimPrizeId.length;i++){
    //                 _tempArray.push(claimServerPrizeId[claimPrizeId[i]]);
    //                 if(i < (claimPrizeId.length-1))
    //                 {
    //                     jsonformat += _tempArray[i] + ",";
    //                 }
    //                 else{
    //                     jsonformat += _tempArray[i] ;
    //                 }
    //             }
    //             // jsonformat += quote;
    //             console.log("The Claim Bttn Array...............",jsonformat);
    //             API.ClaimPrize(jsonformat,localStorage.getItem("access_token"));
    //         }
    //         else{
    //             Alert.ShowAlert("Please Select Atleast One Item");
    //         }
    //     // }
    //     // else{
    //     //     Alert.ShowAlert("Your Earned Coin is not more than 1 lakh");
    //     // }
    // },
    SettingsBackButtonPressed: function() {
        Utils.ButtonScaleAnimation(settingsBackButton, settingsBackButton.scale.x - 0.02, settingsOverlay);
        SoundManager.PlayButtonClickTypeOneSound();
    },
    SettingsBackButtonReleased: function() {
        StateTransition.TransitToMenu();
    },

    CreateBonusRewardField: function() {
        // var rewardBase = Utils.SpriteSettingsControl(rewardBase, game.world.centerX - Math.round(game.width / 3.2), game.world.centerY - Math.round(game.height / 2.138), 'reward_base', "true", "true", 0.5, 0.5, 1, 1, "false");
        var rewardBase = Utils.SpriteSettingsControl(rewardBase, game.world.centerX - 280, game.world.centerY - Math.round(game.height / 2.138), 'reward_base', "true", "true", 0.5, 0.5, 1.3, 1.3, "false");
        var rewardIcon = Utils.SpriteSettingsControl(rewardIcon, -130, -3, 'reward_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
        rewardBase.addChild(rewardIcon);
        var totalRewardTextStyle = { font: '28px Lato-Medium', fill: '#fff', align: 'center' };
        totalRewardAmount = game.add.text(0, 0, "Bonus Coin\n" + _menuPageTotalRewardAmount, totalRewardTextStyle);
        totalRewardAmount.anchor.set(0.5, 0.5);
        rewardBase.addChild(totalRewardAmount);
    },
    CreateEarnedRewardField: function() {
        // var rewardBase = Utils.SpriteSettingsControl(rewardBase, game.world.centerX - Math.round(game.width / 3.2), game.world.centerY - Math.round(game.height / 2.138), 'reward_base', "true", "true", 0.5, 0.5, 1, 1, "false");
        var rewardBase = Utils.SpriteSettingsControl(rewardBase, game.world.centerX + 280, game.world.centerY - Math.round(game.height / 2.138), 'reward_base', "true", "true", 0.5, 0.5, 1.3, 1.3, "false");
        var rewardIcon = Utils.SpriteSettingsControl(rewardIcon, -130, -3, 'walletIcon', "true", "true", 0.5, 0.5, 1, 1, "false");
        rewardBase.addChild(rewardIcon);
        var totalRewardTextStyle = { font: '28px Lato-Medium', fill: '#fff', align: 'center' };
        totalEarnedAmount = game.add.text(0, 0, "Earned Coin\n" + _menuPageTotalEarnedAmount, totalRewardTextStyle);
        totalEarnedAmount.anchor.set(0.5, 0.5);
        rewardBase.addChild(totalEarnedAmount);
    },


    CreateOneTicketCheckBox: function(_claimInfoBox, _index) {
        var oneTicketCheckBox = Utils.ButtonSettingsControl(oneTicketCheckBox, 700, 0, 'checkBox', this.TicketCheckBoxPressed, null, null, this.TicketCheckBoxReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        _claimInfoBox.addChild(oneTicketCheckBox);
        var oneTicketRightSign = Utils.SpriteSettingsControl(oneTicketRightSign, 0, 0, 'check', "true", "true", 0.5, 0.5, 1, 1, "false");
        oneTicketCheckBox.addChild(oneTicketRightSign);
        oneTicketCheckBox.name = _index;
        oneTicketCheckBox.bool = false;
        oneTicketCheckBox.id = _index;
        ticketCheckBoxArray.push(oneTicketRightSign);
    },
    DisableAllRightSign: function() {
        for (var i = 0; i < ticketCheckBoxArray.length; i++) {
            ticketCheckBoxArray[i].visible = false;
        }
    },
    TicketCheckBoxPressed: function(_this) {
        //console.log("Pressed................");
        if (previousObj) {
            if (previousObj.name == _this.name && _this.bool) {
                ticketCheckBoxArray[_this.name].visible = false;
                _this.bool = false;
                claimPrizeId.pop(_this.id);
            } else {
                if (_this.bool) {
                    ticketCheckBoxArray[_this.name].visible = false;
                    _this.bool = false;
                    claimPrizeId.pop(_this.id);
                } else {
                    ticketCheckBoxArray[_this.name].visible = true;
                    _this.bool = true;
                    claimPrizeId.push(_this.id);
                }
            }
        } else {
            _this.bool = true;
            ticketCheckBoxArray[_this.name].visible = true;
            claimPrizeId.push(_this.id);
        }
        previousObj = _this;
        // console.log("The Previous Object........................"+_this.bool);
    },
    TicketCheckBoxReleased: function() {
        //console.log("Released................");
    },
    CreateMenuScroller: function() {
        var scrollingLimit = Math.ceil(claimPrizeScrollableGroup.children[0].height.toFixed(2) * 1.9);
        scrollingLimit = Math.ceil(Math.ceil(claimPrizeScrollableGroup.height) - scrollingLimit);
        game.input.addMoveCallback(function(pointer, x, y) {
            if (menuIsMouseDown) {
                if (pointer.y > menuStartPos) {
                    if (claimPrizeScrollableGroup.y < 0) {
                        var temp = claimPrizeScrollableGroup.y + (pointer.y - menuStartPos);
                        if (temp > 0) {
                            claimPrizeScrollableGroup.y = 0;
                        } else {
                            claimPrizeScrollableGroup.y += (pointer.y - menuStartPos);
                            menuStartPos = pointer.y;
                        }
                    } else {}
                } else {}
                if (pointer.y < menuStartPos) {
                    if (claimPrizeScrollableGroup.y > -scrollingLimit) {
                        var temp = claimPrizeScrollableGroup.y - (menuStartPos - pointer.y);
                        if (temp < -scrollingLimit) {
                            claimPrizeScrollableGroup.y = -scrollingLimit;
                        } else {
                            claimPrizeScrollableGroup.y -= (menuStartPos - pointer.y);
                            menuStartPos = pointer.y;
                        }
                    } else {}
                } else {}
            } else {}
        });
    },
}