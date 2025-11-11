var menuSelectedButtonBase;
var menuHomeButton;
var menuHistoryButton;
var menuLeaderBoardButton;
var menuMenuButton;
var totalRewardAmount;
var totalEarnedAmount;
var claimPrizeText;
// var totalWalletBalance;
// var walletAddButton;
// var totalLives;
var refreshButton;
var howToPlayButton;
var menuOverlay;
var tournamentScrollableGroup;
// var menuRemindButtonArray = [];
// var menuNotificationIconArray = [];
var menuJoinAndPlayButtonArray = [];
var oneTicketCheckBoxArray = [];
var twoTicketCheckBoxArray = [];
var menuStartPos = 0;
var menuIsMouseDown = false;
var numberOfticketToBuy = 0;
var numberOfTicketToBuyArray = [];
var prizePriceArray = [];
// var gameListJson;
var _menuPageTotalRewardAmount;
var _menuPageTotalEarnedAmount;

var advertisement;

var Menu = function() {};
Menu.prototype = {
    init: function() {
        Utils.ScaleManager();
    },
    preload: function() {
        if(localStorage.getItem("access_token")!=null){
            API.AdvetisementFetchAPI(localStorage.getItem("access_token"));
        }
        game.stage.disableVisibilityChange = true;
        game.time.advancedTiming = true;

    },
    create: function() {
        this.CreateMenuPage();
        API.DailyBonus(localStorage.getItem("access_token"));
        API.PrizeListFetchAPI(localStorage.getItem("access_token"));
        setTimeout(() => {
            LoadingPopup.ShowLoadingPopup();
            API.ProfileDetails(localStorage.getItem("access_token"));
            API.GameList(localStorage.getItem("access_token"));
        }, 200);

        reconnectionCreatePlayerAvoid = 0;
    },

    SetValueFromServer: function(_totalRewardAmount, _totalWalletMoney, _totalLife, _totalEarnedAmount) {
        // LoadingPopup.HideLoadingPopup();
        setTimeout(() => {
            // console.log("The Value of Total Reward Amount......................."+_totalRewardAmount+"Total Earned Amount............"+_totalEarnedAmount);
            if (_totalRewardAmount != null && _totalEarnedAmount != null) {
                totalRewardAmount.setText("Bonus Coin\n" + _totalRewardAmount);
                totalEarnedAmount.setText("Earned Coin\n" + _totalEarnedAmount);
                _menuPageTotalRewardAmount = _totalRewardAmount;
                _menuPageTotalEarnedAmount = _totalEarnedAmount;
                // console.log("The Value of Total Earned Amount......................."+_totalEarnedAmount);
                // totalWalletBalance.setText("₹ " + _totalWalleMoney);
            } else {
                totalRewardAmount.setText("0");
                totalEarnedAmount.setText("0");
                // totalWalletBalance.setText("₹ 0");
            }
            if (_totalEarnedAmount == null) {
                totalEarnedAmount.setText("0");
            }
        }, 1000);
        // totalLives.setText(_totalLife);
    },

    CreateMenuPage: function() {
        var menuBg = Utils.SpriteSettingsControl(menuBg, game.world.centerX, game.world.centerY, 'menu_bg', "true", "true", 0.5, 0.5, 1, 1, "false");
        var topArea = Utils.SpriteSettingsControl(topArea, game.world.centerX, game.world.centerY - Math.round(game.height / 2.36), 'top_area', "true", "true", 0.5, 0.5, 1, 1, "false");
        var claimBttn = Utils.ButtonSettingsControl(claimBttn, game.world.centerX, game.world.centerY - game.height / 2.7, 'claim', this.ClaimBttnPressed, null, null, this.ClaimBttnReleased, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        var claimPrizeTextStyle = { font: '30px Lato-Heavy', fill: '#08252d', align: 'center' };
        claimPrizeText = game.add.text(game.world.centerX, game.world.centerY - Math.round(game.height / 2.55), "CLAIM YOUR PRIZES\n ON 1 LAKH EARNED COINS", claimPrizeTextStyle);
        claimPrizeText.anchor.set(0.5, 0.5);

        var checkMoreTextStyle = { font: '30px Lato-Heavy', fill: '#f5e803', align: 'center' };
        var checkMoreText = game.add.text(game.world.centerX, game.world.centerY - Math.round(game.height / 2.88), "CHECK MORE", checkMoreTextStyle);
        checkMoreText.anchor.set(0.5, 0.5);
        tournamentScrollableGroup = game.add.group();
        menuJoinAndPlayButtonArray = [];


        var videoBox = Utils.SpriteSettingsControl(videoBox, game.world.centerX, game.world.centerY + Math.round(game.height / 4.5), 'adPanel', "true", "true", 0.5, 0.5, 0.88, 0.8, "false");

        var adPanelImage = Utils.SpriteSettingsControl(adPanelImage, game.world.centerX, game.world.centerY + Math.round(game.height / 4.5), 'one_pixel', "true", "true", 0.5, 0.5, 1, 1, "false");
        // var watchTextStyle = { font: '36px Lato-Medium', fill: '#fff', align: 'center' };
        //var  videoBoxImage = Utils.SpriteSettingsControl(videoBoxImage, game.world.centerX, game.world.centerY + Math.round(game.height / 5.1), 'one_pixel', "true", "true", 0.5, 0.5, 850, 400, "false");      
        // watchText = game.add.text(-270, -280, "WATCH ADS", watchTextStyle);
        // watchText.anchor.setTo(0.5);
        //videoBox.addChild(watchText);


        //Need To Be Done After Backend Implementation
        // game.load.image('', "");
        // game.load.start();
        // videoBoxImage.loadTexture('');

        var tournamentMask = game.add.graphics(0, 0);
        // tournamentMask.beginFill(0xFF3300);
        tournamentMask.drawRect(0, Math.round(game.height / 5.85), game.width, Math.round(game.height / 1.35));
        tournamentScrollableGroup.mask = tournamentMask;

        this.CreateTopItems();
        this.CreateBottomButtons();

        //Create overlay For off the input of all button when click on button
        menuOverlay = Utils.ButtonSettingsControl(menuOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.MenuOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
        menuOverlay.alpha = 0.001;
        menuOverlay.visible = false;

        setTimeout(() => {
            // LoadingPopup.ShowLoadingPopup();
            game.load.image('advertisement', advertisingImageUrl);
            game.load.start();
        }, 1000);


        setTimeout(() => {
            adPanelImage.loadTexture('advertisement');
            // LoadingPopup.HideLoadingPopup();
        }, 2000);
    },
    ClaimBttnPressed() {
        // console.log("The Claim Button Pressed.........................");
    },
    ClaimBttnReleased() {
        // console.log("The Claim Button Released.........................");
        StateTransition.TransitToClaimPopup();
    },
    CreateTouramentList: function(_gameListData) {
        // console.log("_gameListData: ", _gameListData);
        this.gameListArray = _gameListData;
        oneTicketCheckBoxArray = [];
        twoTicketCheckBoxArray = [];
        numberOfTicketToBuyArray = [];
        for (var i = 0; i < 1; i++) {
            var strtdate = _gameListData[i].gameStartTime;
            var date = this.ReturnDateFormat(strtdate);
            var time = this.ReturnTimeFormat(strtdate);
            var day = this.ReturnDayName(strtdate);
            var posX = game.world.centerX;
            var posY = (game.world.centerY - game.height / 7) + (i * (game.height / 2.6));
            this.ShowTouramentList(posX, posY, i, _gameListData[i]._id, day, time, _gameListData[i].rewardTotal, date, _gameListData[i].price);
        }
    },

    ReturnDateFormat: function(_date) {
        var monthShortNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
        ];
        var newDate = new Date(_date);
        return newDate.getDate() + ' ' + monthShortNames[newDate.getMonth()] + ' ' + newDate.getFullYear();
    },

    ReturnTimeFormat: function(_time) {
        var time = moment(_time).format("hh:mm A");
        return time;
    },

    ReturnDayName: function(_date) {
        var dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        var newDate = new Date(_date);
        return dayNames[newDate.getDay()];
    },

    ReturnPrice: function(_index, _array) {
        return _array[_index].price;
    },
    ReturnGameId: function(_index, _array) {
        return _array[_index]._id;
    },

    CreateTopItems: function() {
        this.CreateBonusRewardField();
        this.CreateEarnedRewardField();
        // this.CreateWalletField();
        // this.CreateLifeField();

        refreshButton = Utils.ButtonSettingsControl(refreshButton, game.world.centerX - Math.round(game.width / 2.4), game.world.centerY - Math.round(game.height / 2.65), 'settings', this.RefreshButtonPressed, null, null, this.RefreshButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        howToPlayButton = Utils.ButtonSettingsControl(howToPlayButton, game.world.centerX + Math.round(game.width / 2.4), game.world.centerY - Math.round(game.height / 2.65), 'how_to_play', this.HowToPlayButtonPressed, null, null, this.HowToPlayButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
    },

    CreateBonusRewardField: function() {
        // var rewardBase = Utils.SpriteSettingsControl(rewardBase, game.world.centerX - Math.round(game.width / 3.2), game.world.centerY - Math.round(game.height / 2.138), 'reward_base', "true", "true", 0.5, 0.5, 1, 1, "false");
        var rewardBase = Utils.SpriteSettingsControl(rewardBase, game.world.centerX - 280, game.world.centerY - Math.round(game.height / 2.138), 'reward_base', "true", "true", 0.5, 0.5, 1.3, 1.3, "false");
        var rewardIcon = Utils.SpriteSettingsControl(rewardIcon, -130, -3, 'reward_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
        rewardBase.addChild(rewardIcon);
        var totalRewardTextStyle = { font: '28px Lato-Medium', fill: '#fff', align: 'center' };
        totalRewardAmount = game.add.text(0, 0, "Bonus Coin\n" + "0", totalRewardTextStyle);
        totalRewardAmount.anchor.set(0.5, 0.5);
        rewardBase.addChild(totalRewardAmount);
    },
    CreateEarnedRewardField: function() {
        // var rewardBase = Utils.SpriteSettingsControl(rewardBase, game.world.centerX - Math.round(game.width / 3.2), game.world.centerY - Math.round(game.height / 2.138), 'reward_base', "true", "true", 0.5, 0.5, 1, 1, "false");
        var rewardBase = Utils.SpriteSettingsControl(rewardBase, game.world.centerX + 280, game.world.centerY - Math.round(game.height / 2.138), 'reward_base', "true", "true", 0.5, 0.5, 1.3, 1.3, "false");
        var rewardIcon = Utils.SpriteSettingsControl(rewardIcon, -130, -3, 'walletIcon', "true", "true", 0.5, 0.5, 1, 1, "false");
        rewardBase.addChild(rewardIcon);
        var totalRewardTextStyle = { font: '28px Lato-Medium', fill: '#fff', align: 'center' };
        totalEarnedAmount = game.add.text(0, 0, "Earned Coin\n" + "0", totalRewardTextStyle);
        totalEarnedAmount.anchor.set(0.5, 0.5);
        rewardBase.addChild(totalEarnedAmount);
    },

    // CreateWalletField:function(){
    // var walletBase = Utils.SpriteSettingsControl(walletBase, game.world.centerX + Math.round(game.width / 3.2), game.world.centerY - Math.round(game.height / 2.138), 'reward_base', "true", "true", 0.5, 0.5, 1, 1, "false");
    // var walletIcon = Utils.SpriteSettingsControl(walletIcon, -130, -3, 'wallet_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
    // walletBase.addChild(walletIcon);
    // totalWalletBalance = { font: '40px Lato-Medium', fill: '#fff', align: 'left' };
    // totalWalletBalance = game.add.text(-80, 0, "₹ " + "123456", totalWalletBalance);
    // totalWalletBalance.anchor.set(0, 0.5);
    // walletBase.addChild(totalWalletBalance);

    // walletAddButton = Utils.ButtonSettingsControl(walletAddButton, 156, -2, 'plus_icon', this.WalletAddbuttonPressed, null, null, this.WalletAddbuttonReleased, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
    // walletBase.addChild(walletAddButton);
    // },

    // CreateLifeField: function() {
    // var liveBase = Utils.SpriteSettingsControl(liveBase, game.world.centerX, game.world.centerY - Math.round(game.height / 2.2), 'live_slab', "true", "true", 0.5, 0.5, 1, 1, "false");
    // var lifeIcon = Utils.SpriteSettingsControl(lifeIcon, 0, -15, 'heart_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
    // liveBase.addChild(lifeIcon);
    // var totalLivesTextStyle = { font: '48px Lato-Medium', fill: '#fff', align: 'center' };
    // totalLives = game.add.text(-2, -22, "10", totalLivesTextStyle);
    // totalLives.anchor.setTo(0.5);
    // liveBase.addChild(totalLives);
    // },

    // WalletAddbuttonPressed: function() {
    //     // console.log("WalletAddbuttonPressed");
    //     Utils.ButtonScaleAnimation(walletAddButton, walletAddButton.scale.x - 0.02, menuOverlay);
    //     this.EnableDisableMenuPageButtonInput(true);
    // },
    // WalletAddbuttonReleased: function() {
    //     StateTransition.TransitToWalletPage();
    // },

    RefreshButtonPressed: function() {
        SoundManager.PlayButtonClickTypeOneSound();
        Utils.ButtonScaleAnimation(refreshButton, refreshButton.scale.x - 0.02, menuOverlay);
        this.EnableDisableMenuPageButtonInput(true);
    },
    RefreshButtonReleased: function() {
        // API.GameList(localStorage.getItem("access_token"));
        StateTransition.TransitToSettingsPage();
    },

    HowToPlayButtonPressed: function() {
        previousPage = "Menu";
        SoundManager.PlayButtonClickTypeOneSound();
        Utils.ButtonScaleAnimation(howToPlayButton, howToPlayButton.scale.x - 0.02, menuOverlay);
        this.EnableDisableMenuPageButtonInput(true);
    },
    HowToPlayButtonReleased: function() {
        StateTransition.TransitToHowToPlay();
    },

    CreateBottomButtons: function() {
        menuSelectedButtonBase = Utils.SpriteSettingsControl(menuSelectedButtonBase, game.world.centerX - game.width / 2.7, game.world.centerY + game.height / 1.8, 'selected_button_base', "true", "true", 0.5, 0.5, 1, 1, "flase");
        menuHomeButton = Utils.ButtonSettingsControl(menuHomeButton, game.world.centerX - game.width / 2.7, game.world.centerY + game.height / 2.17, 'home', this.MenuHomeButtonPressed, null, null, this.MenuHomeButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        menuHistoryButton = Utils.ButtonSettingsControl(menuHistoryButton, game.world.centerX - game.width / 7.9, game.world.centerY + game.height / 2.17, 'history', this.MenuHistoryButtonPressed, null, null, this.MenuHistoryButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        menuLeaderBoardButton = Utils.ButtonSettingsControl(menuLeaderBoardButton, game.world.centerX + game.width / 7.9, game.world.centerY + game.height / 2.17, 'leaderboard', this.MenuLeaderBoardButtonPressed, null, null, this.MenuLeaderBoardButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        menuMenuButton = Utils.ButtonSettingsControl(menuMenuButton, game.world.centerX + game.width / 2.7, game.world.centerY + game.height / 2.17, 'menu', this.MenuMenuButtonPressed, null, null, this.MenuMenuButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        this.ShowSelectedButtonBase();
    },
    ShowSelectedButtonBase: function() {
        game.add.tween(menuSelectedButtonBase).to({ y: game.world.centerY + game.height / 2.31 }, 100, Phaser.Easing.Linear.None, true, 100);
        game.add.tween(menuHomeButton).to({ y: game.world.centerY + game.height / 2.23 }, 100, Phaser.Easing.Linear.None, true, 50);
    },

    MenuHomeButtonPressed: function() {},
    MenuHomeButtonReleased: function() {},

    MenuHistoryButtonPressed: function() {
        Utils.ButtonScaleAnimation(menuHistoryButton, menuHistoryButton.scale.x - 0.02, menuOverlay);
        this.EnableDisableMenuPageButtonInput(true);
        SoundManager.PlayButtonClickTypeOneSound();
    },
    MenuHistoryButtonReleased: function() {
        StateTransition.TransitToGameHistory();
    },

    MenuLeaderBoardButtonPressed: function() {
        Utils.ButtonScaleAnimation(menuLeaderBoardButton, menuLeaderBoardButton.scale.x - 0.02, menuOverlay);
        this.EnableDisableMenuPageButtonInput(true);
        SoundManager.PlayButtonClickTypeOneSound();
    },
    MenuLeaderBoardButtonReleased: function() {
        StateTransition.TransitToLeaderBoard();
    },

    MenuMenuButtonPressed: function() {
        Utils.ButtonScaleAnimation(menuMenuButton, menuMenuButton.scale.x - 0.02, menuOverlay);
        this.EnableDisableMenuPageButtonInput(true);
        SoundManager.PlayButtonClickTypeOneSound();
    },
    MenuMenuButtonReleased: function() {
        StateTransition.TransitToProfilePage();
    },


    ShowTouramentList: function(_posX, _posY, _index, _gameId, _day, _time, _prizeAmount, _date, _ticketAmount) {
        var menuInfoBox = Utils.SpriteSettingsControl(menuInfoBox, _posX, _posY, 'dashboard_info_box', "true", "true", 0.5, 0.5, 1, 1, "false");
        menuInfoBox.inputEnabled = true;
        menuInfoBox.events.onInputDown.add(this.menuInfoBoxPressed, this);
        menuInfoBox.events.onInputUp.add(this.menuInfoBoxReleased, this);

        this.CreateMenuInfoBoxBgForScrolling(menuInfoBox);

        // var menuDayHeadingTextStyle = { font: '32px Lato-Medium', fill: '#fff', align: 'center' };
        // var menuDayTimeHeadingText = game.add.text(-380, -280, _day + " - " + _time, menuDayHeadingTextStyle);
        // menuDayTimeHeadingText.anchor.set(0, 0.5);
        // menuInfoBox.addChild(menuDayTimeHeadingText);

        // var menuRemindButtonBase = Utils.ButtonSettingsControl(menuRemindButtonBase, 280, -280, 'remind_button_base', this.MenuRemindButtonPressed, null, null, this.MenuRemindButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        // menuInfoBox.addChild(menuRemindButtonBase);
        // var remindTextStyle = { font: '28px Lato-Heavy', fill: '#000', align: 'center' };
        // var remindText = game.add.text(-15, -5, "REMIND ME", remindTextStyle);
        // remindText.anchor.setTo(0.5);
        // menuRemindButtonBase.name = _index;
        // menuRemindButtonBase.index = _gameId;
        // menuRemindButtonBase.addChild(remindText);

        // var menuNotificationIcon = Utils.SpriteSettingsControl(menuNotificationIcon, 420, -285, 'notification_on', "true", "true", 0.5, 0.5, 1, 1, "false");
        // menuInfoBox.addChild(menuNotificationIcon);
        // menuNotificationIcon.name = _index;
        // menuNotificationIcon.index = _gameId;
        // menuRemindButtonArray.push(menuRemindButtonBase);
        // menuNotificationIconArray.push(menuNotificationIcon);

        this.CreatePrizeAmountInsideInfoBox(menuInfoBox, _prizeAmount, _index, _gameId);

        // var startAtTextStyle = { font: '34px Lato-Medium', fill: '#5aefe2', align: 'center' };
        // var startAtText = game.add.text(0, -85, "STARTS AT", startAtTextStyle);
        // startAtText.anchor.setTo(0.5);
        // menuInfoBox.addChild(startAtText);

        // var calenderIcon = Utils.SpriteSettingsControl(calenderIcon, -360, -6, 'calender_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
        // menuInfoBox.addChild(calenderIcon);
        // var dateTextStyle = { font: '48px Lato-Medium', fill: '#fff', align: 'left' };
        // var menuDate = game.add.text(-310, -3, _date, dateTextStyle);
        // menuDate.anchor.setTo(0, 0.5);
        // menuInfoBox.addChild(menuDate);

        // var clockIcon = Utils.SpriteSettingsControl(clockIcon, 130, -6, 'clock_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
        // menuInfoBox.addChild(clockIcon);
        // var timeTextStyle = { font: '48px Lato-Medium', fill: '#fff', align: 'left' };
        // var menuTime = game.add.text(180, -5, _time, timeTextStyle);
        // menuTime.anchor.setTo(0, 0.5);
        // menuInfoBox.addChild(menuTime);

        this.CreateMenuInfoBoxTicketPrice(menuInfoBox, _ticketAmount);

        this.CreateOneTicketCheckBox(menuInfoBox, _index, _gameId);
        numberOfTicketToBuyArray.push(1);
        this.CreateTwoTicketsCheckBox(menuInfoBox, _index, _gameId);

        this.CreateInfoBoxJoinPlayButton(menuInfoBox, _index, _gameId);

        tournamentScrollableGroup.add(menuInfoBox);

        //this.CreateMenuScroller();

    },

    CreateMenuInfoBoxBgForScrolling: function(_menuInfoBox) {
        var menuInfoBoxBg = Utils.SpriteSettingsControl(menuInfoBoxBg, 0, 0, 'transparent_image', "true", "true", 0.5, 0.5, 300, 300, "false");
        menuInfoBoxBg.scale.x = 1400;
        menuInfoBoxBg.scale.y = 750;
        menuInfoBoxBg.alpha = 0.001;
        _menuInfoBox.addChild(menuInfoBoxBg);
    },

    CreatePrizeAmountInsideInfoBox: function(_menuInfoBox, _prizeAmount, _index, _gameId) {
        var prizeAmountTextStyle = { font: '48px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center' };
        var menuPrizeAmount = game.add.text(-380, -175, "PRIZE POOL - ₹ " + _prizeAmount, prizeAmountTextStyle);
        menuPrizeAmount.anchor.set(0, 0.5);
        menuPrizeAmount.setShadow(0, 2, '#e07e00', 0);
        _menuInfoBox.addChild(menuPrizeAmount);
        var menuNextArrowIcon = Utils.ButtonSettingsControl(menuNextArrowIcon, 370, -175, 'next_arrow', this.MenuNextArrowIconPressed, null, null, this.MenuNextArrowIconReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        menuNextArrowIcon.name = _index;
        menuNextArrowIcon.index = _gameId;
        _menuInfoBox.addChild(menuNextArrowIcon);
    },

    CreateMenuInfoBoxTicketPrice: function(_menuInfoBox, _ticketAmount) {
        var menuTicketAmountTextStyle = { font: '48px Lato-Medium', fill: '#fff', align: 'center', wordWrap: false, wordWrapWidth: 500 };
        // var menuTicketAmount = game.add.text(-170, *130* , "₹ " + _ticketAmount + " / TICKET", menuTicketAmountTextStyle);
        var menuTicketAmount = game.add.text(-170, -10, "₹ " + _ticketAmount + " / TICKET ", menuTicketAmountTextStyle);
        menuTicketAmount.anchor.set(0, 0.5);
        _menuInfoBox.addChild(menuTicketAmount);
    },

    CreateOneTicketCheckBox: function(_menuInfoBox, _index, _gameId) {
        var oneTicketCheckBox = Utils.ButtonSettingsControl(oneTicketCheckBox, -360, 125 /*-370,210*/ , 'select_box', this.OneTicketCheckBoxPressed, null, null, this.OneTicketCheckBoxReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        _menuInfoBox.addChild(oneTicketCheckBox);
        var oneTicketRightSign = Utils.SpriteSettingsControl(oneTicketRightSign, 0, 0, 'right_sign', "true", "true", 0.5, 0.5, 1, 1, "false");
        oneTicketCheckBox.addChild(oneTicketRightSign);
        var oneTicketTextStyle = { font: '36px Lato-Heavy', fill: '#5aefe2', align: 'center', wordWrap: false, wordWrapWidth: 500 };
        var oneTicketText = game.add.text(100, 0, "1 Ticket", oneTicketTextStyle);
        oneTicketText.anchor.setTo(0.5);
        oneTicketCheckBox.addChild(oneTicketText);
        oneTicketCheckBox.name = _index;
        oneTicketCheckBox.index = _gameId;
        oneTicketCheckBox.inputEnabled = false;
        oneTicketCheckBoxArray.push(oneTicketCheckBox);
    },

    CreateTwoTicketsCheckBox: function(_menuInfoBox, _index, _gameId) {
        var twoTicketCheckBox = Utils.ButtonSettingsControl(twoTicketCheckBox, 225, 125 /*235,210*/ , 'select_box', this.TwoTicketCheckBoxPressed, null, null, this.TwoTicketCheckBoxReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        _menuInfoBox.addChild(twoTicketCheckBox);
        var twoTicketRightSign = Utils.SpriteSettingsControl(twoTicketRightSign, 0, 0, 'right_sign', "true", "true", 0.5, 0.5, 1, 1, "false");
        twoTicketRightSign.visible = false;
        twoTicketCheckBox.addChild(twoTicketRightSign);
        var twoTicketTextStyle = { font: '36px Lato-Heavy', fill: '#5aefe2', align: 'center', wordWrap: false, wordWrapWidth: 500 };
        var twoTicketText = game.add.text(100, 0, "2 Ticket", twoTicketTextStyle);
        twoTicketText.anchor.setTo(0.5);
        twoTicketCheckBox.addChild(twoTicketText);
        twoTicketCheckBox.name = _index;
        twoTicketCheckBox.index = _gameId;
        twoTicketCheckBoxArray.push(twoTicketCheckBox);
    },

    CreateInfoBoxJoinPlayButton: function(_menuInfoBox, _index, _gameId) {
        var menuJoinAndPlayButton = Utils.ButtonSettingsControl(menuJoinAndPlayButton, 0, 320, 'join_button_base', this.MenuJoinAndPlayButtonPressed, null, null, this.MenuJoinAndPlayButtonReleased, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        _menuInfoBox.addChild(menuJoinAndPlayButton);
        var joinTextStyle = { font: '48px Lato-Heavy', fill: '#071f26', align: 'center', wordWrap: false, wordWrapWidth: 500 };
        // var joinText = game.add.text(0, -7, "JOIN NOW", joinTextStyle);
        var joinText = game.add.text(0, -7, "PLAY NOW", joinTextStyle);
        joinText.anchor.setTo(0.5);
        menuJoinAndPlayButton.name = _index;
        menuJoinAndPlayButton.index = _gameId;
        menuJoinAndPlayButton.addChild(joinText);
        menuJoinAndPlayButtonArray.push(menuJoinAndPlayButton);
    },


    // MenuRemindButtonPressed: function(_this) {
    //     // console.log("GameHistoryRemindButtonPressed: " + _this.name);
    //     for (var i = 0; i < menuRemindButtonArray.length; i++) {
    //         if (menuRemindButtonArray[i].name == _this.name) {
    //             Utils.ButtonScaleAnimation(menuRemindButtonArray[i], menuRemindButtonArray[i].scale.x - 0.02, menuOverlay);
    //             this.EnableDisableMenuPageButtonInput(true);
    //         } else {}
    //     }
    // },
    // MenuRemindButtonReleased: function(_this) {
    //     for (var i = 0; i < menuRemindButtonArray.length; i++) {
    //         if (menuRemindButtonArray[i].name == _this.name) {
    //             menuRemindButtonArray[i].loadTexture('remind_button_off_base');
    //             menuRemindButtonArray[i].inputEnabled = false;
    //         } else {}
    //     }
    //     for (var i = 0; i < menuNotificationIconArray.length; i++) {
    //         if (menuNotificationIconArray[i].name == _this.name) {
    //             menuNotificationIconArray[i].loadTexture('notification_off');
    //         } else {}
    //     }

    // },

    OneTicketCheckBoxPressed: function(_this) {
        for (var i = 0; i < oneTicketCheckBoxArray.length; i++) {
            oneTicketCheckBoxArray[_this.name].inputEnabled = false;
            twoTicketCheckBoxArray[_this.name].inputEnabled = true;
            oneTicketCheckBoxArray[_this.name].children[0].visible = true;
            twoTicketCheckBoxArray[_this.name].children[0].visible = false;
            numberOfTicketToBuyArray[_this.name] = 1;
        }
        SoundManager.PlayButtonClickTypeTwoSound();
    },
    OneTicketCheckBoxReleased: function(_this) {},

    TwoTicketCheckBoxPressed: function(_this) {
        for (var i = 0; i < twoTicketCheckBoxArray.length; i++) {
            twoTicketCheckBoxArray[_this.name].inputEnabled = false;
            oneTicketCheckBoxArray[_this.name].inputEnabled = true;
            oneTicketCheckBoxArray[_this.name].children[0].visible = false;
            twoTicketCheckBoxArray[_this.name].children[0].visible = true;

            numberOfTicketToBuyArray[_this.name] = 2;
        }
        SoundManager.PlayButtonClickTypeTwoSound();
    },
    TwoTicketCheckBoxReleased: function() {},

    menuInfoBoxPressed: function(_this) {
        menuStartPos = game.input.y;
        menuIsMouseDown = true;
    },
    menuInfoBoxReleased: function(_this) {
        menuIsMouseDown = false;
    },

    MenuNextArrowIconPressed: function(_this) {},
    MenuNextArrowIconReleased: function() {},

    MenuJoinAndPlayButtonPressed: function(_this) {
        for (var i = 0; i < menuJoinAndPlayButtonArray.length; i++) {
            if (menuJoinAndPlayButtonArray[i].name == _this.name) {
                Utils.ButtonScaleAnimation(menuJoinAndPlayButtonArray[i], menuJoinAndPlayButtonArray[i].scale.x - 0.02, menuOverlay);
                this.EnableDisableMenuPageButtonInput(true);
            } else {}
        }
        SoundManager.PlayButtonClickTypeOneSound();
    },
    MenuJoinAndPlayButtonReleased: function(_this) {
        var price = this.ReturnPrice(_this.name, this.gameListArray);
        var gameId = this.ReturnGameId(_this.name, this.gameListArray);
        var buttonIndex = _this.name;
        var numberOfticketToBuy = numberOfTicketToBuyArray[_this.name];
        // console.log("price: " + price);
        // console.log("gameId: " + gameId);
        // console.log("acs tkn: " + localStorage.getItem("access_token"));
        // console.log("numberOfticketToBuy: " + numberOfticketToBuy);

        API.PurchaseTicket(localStorage.getItem("access_token"), numberOfticketToBuy, gameId, price, buttonIndex);
        prizePriceArray = this.ReturnPrizePrice(_this.name, this.gameListArray);
    },
    ReturnPrizePrice: function(_index, _array) {
        var earlyFiveAmt = _array[_index].rewardJaldiFive;
        var topLineAmt = _array[_index].rewardTopLine;
        var middleLineAmt = _array[_index].rewardMiddleLine;
        var bottomLineAmt = _array[_index].rewardBottomLine;
        var fourCornerAmt = _array[_index].rewardFourCorner;
        var fullHouseAmt = _array[_index].rewardFullHouse;
        var pArray = [earlyFiveAmt, topLineAmt, middleLineAmt, bottomLineAmt, fourCornerAmt, fullHouseAmt];
        return pArray
    },

    DisableJoinButton: function(_index) {
        menuJoinAndPlayButtonArray[_index].inputEnabled = false;
        menuJoinAndPlayButtonArray[_index].alpha = 0.5;
        oneTicketCheckBoxArray[_index].inputEnabled = false;
        twoTicketCheckBoxArray[_index].inputEnabled = false;
    },

    CreateMenuScroller: function() {
        var scrollingLimit = Math.ceil(tournamentScrollableGroup.children[0].height.toFixed(2) * 1.9);
        scrollingLimit = Math.ceil(Math.ceil(tournamentScrollableGroup.height) - scrollingLimit);
        game.input.addMoveCallback(function(pointer, x, y) {
            if (menuIsMouseDown) {
                if (pointer.y > menuStartPos) {
                    if (tournamentScrollableGroup.y < 0) {
                        var temp = tournamentScrollableGroup.y + (pointer.y - menuStartPos);
                        if (temp > 0) {
                            tournamentScrollableGroup.y = 0;
                        } else {
                            tournamentScrollableGroup.y += (pointer.y - menuStartPos);
                            menuStartPos = pointer.y;
                        }
                    } else {}
                } else {}
                if (pointer.y < menuStartPos) {
                    if (tournamentScrollableGroup.y > -scrollingLimit) {
                        var temp = tournamentScrollableGroup.y - (menuStartPos - pointer.y);
                        if (temp < -scrollingLimit) {
                            tournamentScrollableGroup.y = -scrollingLimit;
                        } else {
                            tournamentScrollableGroup.y -= (menuStartPos - pointer.y);
                            menuStartPos = pointer.y;
                        }
                    } else {}
                } else {}
            } else {}
        });
    },

    EnableDisableMenuPageButtonInput: function(_status) {
        menuOverlay.visible = _status;
    },


}