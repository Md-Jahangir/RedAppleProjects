var menuPopupProfilePic;
var menuPopupProfileEditButton;
var freePlayButton;
var referEarnButton;
var menuPopupSettingsButton;
var menuPopuphowToPlayButton;
var menuPopupOverlay;
var menuPopupSelectedButtonBase;
var menuPopupHomeButton;
var menuPopupHistoryButton;
var menuPopupLeaderBoardButton;
var menuPopupMenuButton;
var profilePicFromServer;
var playerNameFromServer;
var phoneNumberFromServer;
var menuPopupPlayerName;
var menuPopupPhoneNumber;
var profilePageTotalReward;
// var profilePageTotalLife;
var profilePageTotalWalletAmount;


var ProfilePage = function() {};
ProfilePage.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },
        create: function() {
            this.CreateMenuPopup();
            API.ProfileDetails(localStorage.getItem("access_token"));
        },

        SetValueFromServer: function(_playerName, _phoneNumber, _profilePic, _totalRewardAmont, _totalWalletMoney, _totalLife) {
            game.load.image('profileImageName', _profilePic);
            game.load.start();
            setTimeout(() => {
                if (menuPopupPlayerName != null && menuPopupPhoneNumber != null && menuPopupProfilePic != null) {
                    LoadingPopup.HideLoadingPopup();
                    menuPopupPlayerName.setText(_playerName);
                    menuPopupPhoneNumber.setText(_phoneNumber);
                    menuPopupProfilePic.loadTexture('profileImageName');
                    profilePageTotalReward.setText("₹ " + _totalRewardAmont);
                    // profilePageTotalWalletAmount.setText("₹ " + _totalWalletMoney);
                    // profilePageTotalLife.setText(_totalLife);
                } 
                else {
                    LoadingPopup.HideLoadingPopup();
                    //menuPopupProfilePic.loadTexture('profile_pic');
                }
            }, 1000);
        },

        CreateMenuPopup: function() {
            var profilePageBg = Utils.SpriteSettingsControl(profilePageBg, game.world.centerX, game.world.centerY, 'menu_bg', "true", "true", 0.5, 0.5, 1, 1, "false");
            var topArea = Utils.SpriteSettingsControl(topArea, game.world.centerX, game.world.centerY - Math.round(game.height / 2.355), 'top_area', "true", "true", 0.5, 0.5, 1, 1, "false");

            //menuPopupSettingsButton = Utils.ButtonSettingsControl(menuPopupSettingsButton, game.world.centerX - Math.round(game.width / 2.4), game.world.centerY - Math.round(game.height / 2.64), 'settings', this.MenuPopupSettingsButtonPressed, null, null, this.MenuPopupSettingsButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            //menuPopuphowToPlayButton = Utils.ButtonSettingsControl(menuPopuphowToPlayButton, game.world.centerX + game.width / 2.4, game.world.centerY - Math.round(game.height / 2.64), 'how_to_play', this.MenuPopupHowToPlayButtonPressed, null, null, this.MenuPopupHowToPlayButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);

            var menuPopupInfoBox = Utils.SpriteSettingsControl(menuPopupInfoBox, game.world.centerX, game.world.centerY + game.height / 35, 'profile_page_base', "true", "true", 0.5, 0.5, 1, 1, "false");

            //this.CreateProfilePicture();
            this.CreateEditButtonForProfile(menuPopupInfoBox);
            this.CreatePlayerNameText(menuPopupInfoBox);
            this.CreatePhoneNumberField(menuPopupInfoBox);
            this.CreateRewardField(menuPopupInfoBox);

            // var lifeIcon = Utils.SpriteSettingsControl(lifeIcon, 0, -180, 'profile_heart', "true", "true", 0.5, 0.5, 1, 1, "false");
            // menuPopupInfoBox.addChild(lifeIcon);
            // var totalLifeBox = Utils.SpriteSettingsControl(totalLifeBox, 0, 15, 'profile_price_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            // menuPopupInfoBox.addChild(totalLifeBox);
            // var totalLifeTextStyle = { font: '37px Lato-Medium', fill: '#fff', align: 'center' };
            // profilePageTotalLife = game.add.text(-10, 5, "0", totalLifeTextStyle);
            // profilePageTotalLife.anchor.setTo(0.5);
            // totalLifeBox.addChild(profilePageTotalLife);

            // var walletIcon = Utils.SpriteSettingsControl(walletIcon, 305, -180, 'profile_wallet', "true", "true", 0.5, 0.5, 1, 1, "false");
            // menuPopupInfoBox.addChild(walletIcon);
            // var totalWalletBox = Utils.SpriteSettingsControl(totalWalletBox, 300, 15, 'profile_price_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            // menuPopupInfoBox.addChild(totalWalletBox);
            // var totalWalletTextStyle = { font: '37px Lato-Medium', fill: '#fff', align: 'center' };
            // profilePageTotalWalletAmount = game.add.text(-10, 5, "₹ " + "0", totalWalletTextStyle);
            // profilePageTotalWalletAmount.anchor.setTo(0.5);
            // totalWalletBox.addChild(profilePageTotalWalletAmount);

            // freePlayButton = Utils.ButtonSettingsControl(freePlayButton, 0, 260, 'join_button_base', this.FreePlayButtonPressed, null, null, this.FreePlayButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            // menuPopupInfoBox.addChild(freePlayButton);
            // var freePlayTextStyle = { font: '45px Lato-Heavy', fill: '#071f26', align: 'center' };
            // var freePlayText = game.add.text(-110, -7, "FREE PLAY", freePlayTextStyle);
            // freePlayText.anchor.set(0, 0.5);
            // freePlayButton.addChild(freePlayText);
            // var freePlayButtonIcon = Utils.SpriteSettingsControl(freePlayButtonIcon, -165, -35, 'free_play_icon', 0.5, "true", "true", 0.5, 0.5, 1, 1, "false");
            // freePlayButton.addChild(freePlayButtonIcon);

            // referEarnButton = Utils.ButtonSettingsControl(referEarnButton, 0, 450, 'join_button_base', this.ReferEarnButtonPressed, null, null, this.ReferEarnButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            // menuPopupInfoBox.addChild(referEarnButton);
            // var referEarnTextStyle = { font: '45px Lato-Heavy', fill: '#071f26', align: 'center' };
            // var referEarnText = game.add.text(-110, -7, "REFER & EARN", referEarnTextStyle);
            // referEarnText.anchor.set(0, 0.5);
            // referEarnButton.addChild(referEarnText);
            // var referEarnButtonIcon = Utils.SpriteSettingsControl(referEarnButtonIcon, -190, -10, 'refer_and_earn', "true", "true", 0.5, 0.5, 1, 1, "false");
            // referEarnButton.addChild(referEarnButtonIcon);

            this.CreateBottomButtons();

            // //Create overlay For off the input of all button when click on button
            menuPopupOverlay = Utils.ButtonSettingsControl(menuPopupOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.MenuPopupOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            menuPopupOverlay.alpha = 0.001;
            menuPopupOverlay.visible = false;
        },
        CreateProfilePicture: function() {
            var profileMask = game.add.graphics(0, 0);
            profileMask.beginFill(0x000000);
            profileMask.drawCircle(game.world.centerX, game.world.centerY - Math.round(game.height / 3.28), Math.round(game.height / 7.5));
            menuPopupProfilePic = Utils.SpriteSettingsControl(menuPopupProfilePic, game.world.centerX, game.world.centerY - Math.round(game.height / 3.28), 'profile_pic', "true", "true", 0.5, 0.5, 1, 1, "false");
            var menuPopupProfilePicBase = Utils.SpriteSettingsControl(menuPopupProfilePicBase, game.world.centerX, game.world.centerY - Math.round(game.height / 3.28), 'profile_base', "true", "true", 0.5, 0.5, 1, 1, "false");
            menuPopupProfilePic.mask = profileMask;
        },

        CreateEditButtonForProfile: function(_menuPopupInfoBox) {
            var menuPopupEditProfileBase = Utils.SpriteSettingsControl(menuPopupEditProfileBase, 280, -540, 'remind_button_base', "true", "true", 0.5, 0.5, 1, 1, "false");
            _menuPopupInfoBox.addChild(menuPopupEditProfileBase);
            var menuPopupEditProfileTextStyle = { font: '28px Lato-Heavy', fill: '#000', align: 'center' };
            var menuPopupEditProfileText = game.add.text(-16, -5, "EDIT PROFILE", menuPopupEditProfileTextStyle);
            menuPopupEditProfileText.anchor.setTo(0.5);
            menuPopupEditProfileBase.addChild(menuPopupEditProfileText);
            menuPopupProfileEditButton = Utils.ButtonSettingsControl(menuPopupProfileEditButton, 420, -550, 'edit_button', this.menuPopupProfileEditButtonPressed, null, null, this.menuPopupProfileEditButtonReleased, "true", "true", 0.5, 0.5, 1.2, 1.2, this);
            _menuPopupInfoBox.addChild(menuPopupProfileEditButton);
        },

        CreatePlayerNameText: function(_menuPopupInfoBox) {
            var menuPopupPlayerNameTextStyle = { font: '55px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center' };
            menuPopupPlayerName = game.add.text(0, -440, "", menuPopupPlayerNameTextStyle);
            menuPopupPlayerName.anchor.setTo(0.5);
            menuPopupPlayerName.setShadow(0, 2, '#e07e00', 0);
            _menuPopupInfoBox.addChild(menuPopupPlayerName);
        },

        CreatePhoneNumberField: function(_menuPopupInfoBox) {
            var menuPopupPhoneNumberTextStyle = { font: '40px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center' };
            menuPopupPhoneNumber = game.add.text(-10, -370, "", menuPopupPhoneNumberTextStyle);
            menuPopupPhoneNumber.anchor.setTo(0.5);
            _menuPopupInfoBox.addChild(menuPopupPhoneNumber);
        },

        CreateRewardField: function(_menuPopupInfoBox) {
            // var awardIcon = Utils.SpriteSettingsControl(awardIcon, -305, -185, 'profile_award_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
            var awardIcon = Utils.SpriteSettingsControl(awardIcon, 0, -180, 'profile_award_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
            _menuPopupInfoBox.addChild(awardIcon);
            // var awardPriceBox = Utils.SpriteSettingsControl(awardPriceBox, -300, 15, 'profile_price_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            var awardPriceBox = Utils.SpriteSettingsControl(awardPriceBox, 0, 15, 'profile_price_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            _menuPopupInfoBox.addChild(awardPriceBox);
            var profilePageTotalRewardTextStyle = { font: '37px Lato-Medium', fill: '#fff', align: 'center' };
            profilePageTotalReward = game.add.text(0, 5, "₹ " + "0", profilePageTotalRewardTextStyle);
            profilePageTotalReward.anchor.setTo(0.5);
            awardPriceBox.addChild(profilePageTotalReward);
        },

        menuPopupProfileEditButtonPressed: function() {
            Utils.ButtonScaleAnimation(menuPopupProfileEditButton, menuPopupProfileEditButton.scale.x - 0.02, menuPopupOverlay);
            this.EnableDisableMenuPopupPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        menuPopupProfileEditButtonReleased: function() {
            StateTransition.TransitToEditProfile();
        },

        MenuPopupSettingsButtonPressed: function() {
            Utils.ButtonScaleAnimation(menuPopupSettingsButton, menuPopupSettingsButton.scale.x - 0.02, menuPopupOverlay);
            this.EnableDisableMenuPopupPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        MenuPopupSettingsButtonReleased: function() {
            StateTransition.TransitToSettingsPage();
        },
        MenuPopupHowToPlayButtonPressed: function() {
            previousPage = "ProfilePage";
            Utils.ButtonScaleAnimation(menuPopuphowToPlayButton, menuPopuphowToPlayButton.scale.x - 0.02, menuPopupOverlay);
            this.EnableDisableMenuPopupPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        MenuPopupHowToPlayButtonReleased: function() {
            StateTransition.TransitToHowToPlay();
        },

        // FreePlayButtonPressed: function() {
        //     // console.log("freePlayButtonIconScale");
        //     Utils.ButtonScaleAnimation(freePlayButton, freePlayButton.scale.x - 0.02, menuPopupOverlay);
        //     this.EnableDisableMenuPopupPageButtonInput(true);
        // },
        // FreePlayButtonReleased: function() {},

        ReferEarnButtonPressed: function() {
            Utils.ButtonScaleAnimation(referEarnButton, referEarnButton.scale.x - 0.02, menuPopupOverlay);
            this.EnableDisableMenuPopupPageButtonInput(true);
        },
        ReferEarnButtonReleased: function() {},

        CreateBottomButtons: function() {
            menuPopupSelectedButtonBase = Utils.SpriteSettingsControl(menuPopupSelectedButtonBase, game.world.centerX + Math.round(game.width / 2.7), game.world.centerY + Math.round(game.height / 1.8), 'selected_button_base', "true", "true", 0.5, 0.5, 1, 1, "flase");
            menuPopupHomeButton = Utils.ButtonSettingsControl(menuPopupHomeButton, game.world.centerX - Math.round(game.width / 2.7), game.world.centerY + Math.round(game.height / 2.17), 'home', this.MenuPopupHomeButtonPressed, null, null, this.MenuPopupHomeButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            menuPopupHistoryButton = Utils.ButtonSettingsControl(menuPopupHistoryButton, game.world.centerX - Math.round(game.width / 7.9), game.world.centerY + Math.round(game.height / 2.17), 'history', this.MenuPopupHistoryButtonPressed, null, null, this.MenuPopupHistoryButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            menuPopupLeaderBoardButton = Utils.ButtonSettingsControl(menuPopupLeaderBoardButton, game.world.centerX + Math.round(game.width / 7.9), game.world.centerY + Math.round(game.height / 2.17), 'leaderboard', this.MenuPopupLeaderBoardButtonPressed, null, null, this.MenuPopupLeaderBoardButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            menuPopupMenuButton = Utils.ButtonSettingsControl(menuPopupMenuButton, game.world.centerX + Math.round(game.width / 2.7), game.world.centerY + Math.round(game.height / 2.17), 'menu', this.MenuPopupMenuButtonPressed, null, null, this.MenuPopupMenuButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            this.ShowSelectedButtonBase();
        },
        ShowSelectedButtonBase: function() {
            game.add.tween(menuPopupSelectedButtonBase).to({ y: game.world.centerY + game.height / 2.31 }, 100, Phaser.Easing.Linear.None, true, 100);
            game.add.tween(menuPopupMenuButton).to({ y: game.world.centerY + game.height / 2.23 }, 100, Phaser.Easing.Linear.None, true, 50);
        },

        MenuPopupHomeButtonPressed: function() {
            Utils.ButtonScaleAnimation(menuPopupHomeButton, menuPopupHomeButton.scale.x - 0.02, menuPopupOverlay);
            this.EnableDisableMenuPopupPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        MenuPopupHomeButtonReleased: function() {
            StateTransition.TransitToMenu();
        },

        MenuPopupHistoryButtonPressed: function() {
            Utils.ButtonScaleAnimation(menuPopupHistoryButton, menuPopupHistoryButton.scale.x - 0.02, menuPopupOverlay);
            this.EnableDisableMenuPopupPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        MenuPopupHistoryButtonReleased: function() {
            StateTransition.TransitToGameHistory();
        },

        MenuPopupLeaderBoardButtonPressed: function() {
            Utils.ButtonScaleAnimation(menuPopupLeaderBoardButton, menuPopupLeaderBoardButton.scale.x - 0.02, menuPopupOverlay);
            this.EnableDisableMenuPopupPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        MenuPopupLeaderBoardButtonReleased: function() {
            StateTransition.TransitToLeaderBoard();
        },

        MenuPopupMenuButtonPressed: function() {},
        MenuPopupMenuButtonReleased: function() {},

        EnableDisableMenuPopupPageButtonInput: function(_status) {
            menuPopupOverlay.visible = _status;
        },


    } //End of MenuPopup.prototype