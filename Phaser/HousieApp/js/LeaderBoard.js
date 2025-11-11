var leaderBoardOverlay;
var leaderBoardSelectedButtonBase;
var leaderBoardHomeButton;
var leaderBoardHistoryButton;
var leaderBoardLeaderBoardButton;
var leaderBoardMenuButton;
var leaderBoardInfoBox;
var firstProfilePic;
var firstWinAmount;
var firstPlayerName;
var secondProfilePic;
var secondWinAmount;
var secondPlayerName;
var thirdProfilePic;
var thirdWinAmount;
var thirdPlayerName;
var prizeBehindBase;
// var prizeTypePlayerDetailsBase;
// var prizeTypePlayerPic;
// var prizeTypePlayerName;
// var prizeTypePlayerAmount;
// var currentDate;
// var currentTime;
// var dateTimeJson;
// var LeaderboardScroller;
// var LeaderboardScrollableGroup;
// var currentDateTimeArray = [];
// var prizeTypeArray = [];

var lBoardBottomButtonsGroup;

// var leaderboardEarlyFiveWinnerName = "";
// var leaderboardTopLineWinnerName = "";
// var leaderboardMiddleLineWinnerName = "";
// var leaderboardBottomLineWinnerName = "";
// var leaderboardFourCornerWinnerName = "";
// var leaderboardFullHouseWinnerName = "";

// var leaderBoardEarlyFiveWinAmount = "";
// var leaderBoardTopLineWinAmount = "";
// var leaderBoardMiddleLineWinAmount = "";
// var leaderBoardBottomLineWinAmount = "";
// var leaderBoardFourCornerWinAmount = "";
// var leaderBoardFullHouseWinAmount = "";
// var leaderboardStartTimeArray = [];

var LeaderBoard = function() {};
LeaderBoard.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },
        create: function() {
            lBoardBottomButtonsGroup = game.add.group();
            this.CreateLeaderBoard();
            API.Leaderboard(localStorage.getItem("access_token"));
        },
        // SetValueFromServer: function(_data) {
        //     console.log("_data: ",_data);
        //     game.load.image('firtsProfileImageName', _data[0].users[0].image);
        //     game.load.image('secondProfileImageName', _data[1].users[0].image);
        //     game.load.image('thirdProfileImageName', _data[2].users[0].image);
        //     game.load.start();

        //     setTimeout(() => {
        //         LoadingPopup.HideLoadingPopup();
        //         //firstProfilePic.loadTexture('firtsProfileImageName');
        //         firstPlayerName.setText(_data[0].users[0].name);
        //         firstWinAmount.setText(_data[0].totalAmount);

        //         //secondProfilePic.loadTexture('secondProfileImageName');
        //         secondPlayerName.setText(_data[1].users[0].name);
        //         secondWinAmount.setText( _data[1].totalAmount);

        //         //thirdProfilePic.loadTexture('thirdProfileImageName');
        //         thirdPlayerName.setText(_data[2].users[0].name);
        //         thirdWinAmount.setText(_data[2].totalAmount);
        //     }, 1500);
        // },

        SetValueFromServer: function(_data) {
            // console.log("_data: ", _data);
            if (_data.length > 0) {

                setTimeout(() => {
                    LoadingPopup.HideLoadingPopup();
                    firstPlayerName.setText(_data[0].users[0].name);
                    firstWinAmount.setText(_data[0].totalAmount);

                    secondPlayerName.setText(_data[1].users[0].name);
                    secondWinAmount.setText(_data[1].totalAmount);

                    thirdPlayerName.setText(_data[2].users[0].name);
                    thirdWinAmount.setText(_data[2].totalAmount);
                }, 1500);
            } else {
                // console.log("no data");
                LoadingPopup.HideLoadingPopup();
            }

        },

        CreateLeaderBoard: function() {
            var leaderBoardBg = Utils.SpriteSettingsControl(leaderBoardBg, game.world.centerX, game.world.centerY, 'menu_bg', "true", "true", 0.5, 0.5, 1, 1, "false");
            var topArea = Utils.SpriteSettingsControl(topArea, game.world.centerX, game.world.centerY - Math.round(game.height / 2), 'top_area', "true", "true", 0.5, 0.5, 1, 1, "false");

            Utils.CreateHeadingText("MONTHLY LEADERBOARD");

            leaderBoardInfoBox = Utils.SpriteSettingsControl(leaderBoardInfoBox, game.world.centerX, game.world.centerY, 'leaderboard_box', "true", "true", 0.5, 0.5, 1, 1, "false");

            // var dayTimeHeadingTextStyle = { font: '36px Lato-Medium', fill: '#fff', align: 'center', wordWrap: false, wordWrapWidth: 500 };
            // leaderBoardDayTimeText = game.add.text(-390, -90, "WEDNESDAY " + "- " + "7" + " PM", dayTimeHeadingTextStyle);
            // leaderBoardDayTimeText.anchor.set(0, 0.5);
            // leaderBoardInfoBox.addChild(leaderBoardDayTimeText);

            this.CreateFirstPosProfile();
            this.CreateSecondPosProfile();
            this.CreateThirdPosProfile();

            // var CurrentDateTimeBase = Utils.SpriteSettingsControl(CurrentDateTimeBase, 0, 25, 'recent_time_base', "true", "true", 0.5, 0.5, 1, 1, "false");
            // leaderBoardInfoBox.addChild(CurrentDateTimeBase);

            // var currentCalenderIcon = Utils.SpriteSettingsControl(currentCalenderIcon, -350, 15, 'recent_date_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
            // leaderBoardInfoBox.addChild(currentCalenderIcon);
            // var CurrentDateStyle = { font: '45px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center' };
            // currentDate = game.add.text(-302, 18, "29 JULY 2020", CurrentDateStyle);
            // currentDate.anchor.set(0, 0.5);
            // leaderBoardInfoBox.addChild(currentDate);

            // var currentTimeIcon = Utils.SpriteSettingsControl(currentTimeIcon, 135, 15, 'recent_time_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
            // leaderBoardInfoBox.addChild(currentTimeIcon);
            // var CurrentTimeStyle = { font: '45px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center' };
            // currentTime = game.add.text(184, 18, "07:00" + " PM", CurrentTimeStyle);
            // currentTime.anchor.set(0, 0.5);
            // leaderBoardInfoBox.addChild(currentTime);

            prizeBehindBase = Utils.SpriteSettingsControl(prizeBehindBase, game.world.centerX, game.world.centerY + Math.round(game.height / 4), 'prize_type_behind_base', "true", "true", 0.5, 0.5, 1, 1, "false");

            // var strtdate = leaderboardStartTimeArray[0];
            // var date = this.ReturnDateFormat(strtdate);
            // var time = this.ReturnTimeFormat(strtdate);

            // this.CreateInactiveDateTime(date, time);
            // this.CreateInactiveDateTime(dateTimeJson);
            // this.CreatePlayerDetailsForPrizeType();
            // this.CreatePrizeBox();
            this.CreateBottomButtons();

            //Create overlay For off the input of all button when click on button
            leaderBoardOverlay = Utils.ButtonSettingsControl(leaderBoardOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.LeaderBoardOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            leaderBoardOverlay.alpha = 0.001;
            leaderBoardOverlay.visible = false;
        },

        // ReturnDateFormat: function(_date) {
        //     var monthShortNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        //         "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
        //     ];
        //     var newDate = new Date(_date);
        //     return newDate.getDate() + ' ' + monthShortNames[newDate.getMonth()] + ' ' + newDate.getFullYear();
        // },

        CreateFirstPosProfile: function() {
            var firstPosBase = Utils.SpriteSettingsControl(firstPosBase, 0, -410, '1st_pos', "true", "true", 0.5, 0.5, 1, 1, "false");
            leaderBoardInfoBox.addChild(firstPosBase);

            // var firstProfileMask = game.add.graphics(0, 0);
            // firstProfileMask.beginFill(0x000000);
            // firstProfileMask.drawCircle(2, 0, Math.round(game.height / 17));
            // firstPosBase.addChild(firstProfileMask);

            // firstProfilePic = Utils.SpriteSettingsControl(firstProfilePic, 0, 0, 'profile_pic', "true", "true", 0.5, 0.5, 0.4, 0.4, "false");
            // firstPosBase.addChild(firstProfilePic);
            // firstProfilePic.mask = firstProfileMask;

            var firstTextStyle = { font: '40px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center' };
            var firstText = game.add.text(0, 120, "1st", firstTextStyle);
            firstText.anchor.setTo(0.5);
            firstPosBase.addChild(firstText);

            var firstPlayerNameTextStyle = { font: '30px Lato-Medium', fill: '#fff', align: 'center' };
            firstPlayerName = game.add.text(0, 160, "", firstPlayerNameTextStyle);
            firstPlayerName.anchor.setTo(0.5);
            firstPosBase.addChild(firstPlayerName);

            var firstWinAmountTextStyle = { font: '33px Lato-Medium', fill: '#fff', align: 'center' };
            firstWinAmount = game.add.text(0, 200, "", firstWinAmountTextStyle);
            firstWinAmount.anchor.setTo(0.5);
            firstPosBase.addChild(firstWinAmount);

        },

        CreateSecondPosProfile: function() {
            var secondPosBase = Utils.SpriteSettingsControl(secondPosBase, -310, -390, '2nd_pos', "true", "true", 0.5, 0.5, 1, 1, "false");
            leaderBoardInfoBox.addChild(secondPosBase);

            // var secondProfileMask = game.add.graphics(0, 0);
            // secondProfileMask.beginFill(0x000000);
            // secondProfileMask.drawCircle(2, 10, Math.round(game.height / 18));
            // secondPosBase.addChild(secondProfileMask);

            // secondProfilePic = Utils.SpriteSettingsControl(secondProfilePic, 0, 5, 'profile_pic', "true", "true", 0.5, 0.5, 0.4, 0.4, "false");
            // secondPosBase.addChild(secondProfilePic);
            // secondProfilePic.mask = secondProfileMask;

            var secondTextStyle = { font: '40px Lato-Heavy', fontStyle: 'normal', fill: '#688fc7', align: 'center' };
            var secondText = game.add.text(0, 120, "2nd", secondTextStyle);
            secondText.anchor.setTo(0.5);
            secondPosBase.addChild(secondText);

            var secondPlayerNameTextStyle = { font: '30px Lato-Medium', fill: '#fff', align: 'center' };
            secondPlayerName = game.add.text(0, 160, "", secondPlayerNameTextStyle);
            secondPlayerName.anchor.setTo(0.5);
            secondPosBase.addChild(secondPlayerName);

            var secondWinAmountTextStyle = { font: '33px Lato-Medium', fill: '#fff', align: 'center' };
            secondWinAmount = game.add.text(0, 200, "", secondWinAmountTextStyle);
            secondWinAmount.anchor.setTo(0.5);
            secondPosBase.addChild(secondWinAmount);

        },

        CreateThirdPosProfile: function() {
            var thirdPosBase = Utils.SpriteSettingsControl(thirdPosBase, 310, -390, '3rd_pos', "true", "true", 0.5, 0.5, 1, 1, "false");
            leaderBoardInfoBox.addChild(thirdPosBase);

            // var thirdProfileMask = game.add.graphics(0, 0);
            // thirdProfileMask.beginFill(0x000000);
            // thirdProfileMask.drawCircle(2, 3, Math.round(game.height / 18));
            // thirdPosBase.addChild(thirdProfileMask);

            // thirdProfilePic = Utils.SpriteSettingsControl(thirdProfilePic, 0, 3, 'profile_pic', "true", "true", 0.5, 0.5, 0.4, 0.4, "false");
            // thirdPosBase.addChild(thirdProfilePic);
            // thirdProfilePic.mask = thirdProfileMask;

            var thirdTextStyle = { font: '40px Lato-Heavy', fontStyle: 'normal', fill: '#e9af60', align: 'center' };
            var thirdText = game.add.text(0, 120, "3rd", thirdTextStyle);
            thirdText.anchor.setTo(0.5);
            thirdPosBase.addChild(thirdText);

            var thirdPlayerNameTextStyle = { font: '30px Lato-Medium', fill: '#fff', align: 'center' };
            thirdPlayerName = game.add.text(0, 160, "", thirdPlayerNameTextStyle);
            thirdPlayerName.anchor.setTo(0.5);
            thirdPosBase.addChild(thirdPlayerName);

            var thirdWinAmountTextStyle = { font: '33px Lato-Medium', fill: '#fff', align: 'center' };
            thirdWinAmount = game.add.text(0, 200, "", thirdWinAmountTextStyle);
            thirdWinAmount.anchor.setTo(0.5);
            thirdPosBase.addChild(thirdWinAmount);
        },

        // CreateInactiveDateTime: function(_item) {
        //     LeaderboardScrollableGroup = game.add.group();
        //     for (var i = 0; i < _item.length; i++) {

        //         var baseXPos = game.world.centerX;
        //         var baseYPos = (game.world.centerY + Math.round(game.height / 16)) + (i * (game.world.centerY - Math.round(game.height / 2.221)));
        //         var calenderIconXPos = game.world.centerX - Math.round(game.width / 3.09);
        //         var calenderIconYPos = (game.world.centerY + Math.round(game.height / 17)) + (i * (game.world.centerY - Math.round(game.height / 2.221)));
        //         var lineYPos = (game.world.centerY + Math.round(game.height / 12)) + (i * (game.world.centerY - Math.round(game.height / 2.221)));
        //         var timeIconXPos = game.world.centerX + Math.round(game.width / 8);
        //         var timeIconYPos = (game.world.centerY + Math.round(game.height / 17)) + (i * (game.world.centerY - Math.round(game.height / 2.221)));

        //         var inactiveDateTimeBase = Utils.ButtonSettingsControl(inactiveDateTimeBase, baseXPos, baseYPos, 'recent_time_base', this.CurrentDateTimeButtonPressed, null, null, this.CurrentDateTimeButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        //         inactiveDateTimeBase.alpha = 0.01;
        //         inactiveDateTimeBase.date = _item[i].date;

        //         var inactiveCalenderIcon = Utils.SpriteSettingsControl(inactiveCalenderIcon, calenderIconXPos, calenderIconYPos, 'calender_icon', "true", "true", 0.5, 0.5, 0.75, 0.75, "flase");
        //         var inactiveDateStyle = { font: '54px Lato-Medium', fontStyle: 'normal', fill: '#5aefe2', align: 'left' };
        //         var inactiveDate = game.add.text(70, -25, _item[i].date, inactiveDateStyle);
        //         inactiveCalenderIcon.addChild(inactiveDate);

        //         var inactiveTimeIcon = Utils.SpriteSettingsControl(inactiveTimeIcon, timeIconXPos, timeIconYPos, 'clock_icon', "true", "true", 0.5, 0.5, 0.8, 0.8, "flase");
        //         var inactiveTimeStyle = { font: '54px Lato-Medium', fontStyle: 'normal', fill: '#5aefe2', align: 'left' };
        //         var inactiveTime = game.add.text(70, -25, _item[i].time + ":00" + " PM", inactiveTimeStyle);
        //         inactiveTimeIcon.addChild(inactiveTime);

        //         var inactiveLine = Utils.SpriteSettingsControl(inactiveLine, game.world.centerX, lineYPos, 'recent_time_line', "true", "true", 0.5, 0.5, 1, 1, "flase");

        //         LeaderboardScrollableGroup.add(inactiveDateTimeBase);
        //         LeaderboardScrollableGroup.add(inactiveCalenderIcon);
        //         LeaderboardScrollableGroup.add(inactiveTimeIcon);
        //         LeaderboardScrollableGroup.add(inactiveLine);

        //         inactiveDateTimeBase.time = _item[i].time;
        //         currentDateTimeArray.push(inactiveDateTimeBase);
        //     }
        //     this.CreateScroller();
        // },
        // CreateScroller: function() {
        //     LeaderboardScroller = game.add.existing(new ScrollableArea(0, 0, game.width, game.height));
        //     LeaderboardScroller.configure({
        //         horizontalScroll: false,
        //         verticalScroll: true,
        //         kineticMovement: false
        //     });
        //     var mask = game.add.graphics(0, 0);
        //     mask.beginFill(0x000000);
        //     mask.drawRect((game.world.centerX - Math.round(game.width / 2.53)),
        //         (game.world.centerY + Math.round(game.height / 32)),
        //         (game.world.centerX + Math.round(game.width / 3.5)),
        //         (game.world.centerY - Math.round(game.height / 2.65))
        //     );
        //     var image = game.add.image((game.world.centerX - Math.round(game.width / 2.53)),
        //         (game.world.centerY + Math.round(game.height / 32)),
        //         "one_pixel");
        //     image.tint = "0x000000";
        //     image.alpha = 0.001;
        //     image.scale.setTo(game.world.centerX + Math.round(game.width / 3.5), ((game.world.centerY + Math.round(game.height / 2.13)) +
        //         ((game.world.centerY - Math.round(game.height / 2.221)) * (dateTimeJson.length - 1.8))));
        //     image.mask = mask;
        //     LeaderboardScrollableGroup.mask = mask;
        //     LeaderboardScroller.addChild(image);
        //     LeaderboardScroller.addChild(LeaderboardScrollableGroup);
        //     LeaderboardScroller.start();
        //     game.world.bringToTop(LeaderboardScroller);
        //     game.world.bringToTop(prizeBehindBase);

        //     game.world.bringToTop(lBoardBottomButtonsGroup);
        // },

        // CurrentDateTimeButtonPressed: function(_this) {
        //     currentDate.setText(_this.date);
        //     currentTime.setText(_this.time + ":00" + " PM");
        //     for (var i = 0; i < currentDateTimeArray.length; i++) {
        //         if (currentDateTimeArray[i].date == _this.date) {
        //             currentDateTimeArray[i].alpha = 0.6;
        //         } else {
        //             currentDateTimeArray[i].alpha = 0.01;
        //         }
        //     }
        // },

        // CreatePrizeBox: function() {
        //     prizeTypeArray = [];

        //     for (var i = 0; i < 6; i++) {
        //         var prizeNameHeadingArray = ["Early Five", "Top Line", "Middle Line", "Bottom Line", "Four Corner", "Full House"];
        //         var prizeAmount = ["0", "0", "0", "0", "0", "0"];
        //         xPos = -280 + (parseInt(i % 3) * 280);
        //         if (i == 0) {
        //             yPos = -120;
        //         } else {
        //             yPos = -130 + (parseInt(i / 3) * 245);
        //         }
        //         var prizeBase = Utils.ButtonSettingsControl(prizeBase, xPos, yPos, 'prize_type_not_selected_base', this.PrizeButtonPressed, null, null, this.PrizeButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        //         prizeBase.name = prizeNameHeadingArray[i];
        //         prizeBehindBase.addChild(prizeBase);

        //         var prizeHeadingStyle = { font: '29px Lato-Medium', fontStyle: 'normal', fill: '#fff', align: 'center' };
        //         var prizeHeading = game.add.text(0, -20, prizeNameHeadingArray[i], prizeHeadingStyle);
        //         prizeHeading.anchor.setTo(0.5);
        //         prizeBase.addChild(prizeHeading);

        //         var prizeAmountStyle = { font: '33px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center' };
        //         prizeAmount = game.add.text(30, 18, prizeAmount[i], prizeAmountStyle);

        //         prizeAmount.anchor.set(1, 0.5);
        //         prizeBase.addChild(prizeAmount);

        //         prizeTypeArray.push(prizeBase);
        //     }
        // },

        // PrizeButtonPressed: function(_this) {
        //     for (var i = 0; i < prizeTypeArray.length; i++) {
        //         if (prizeTypeArray[i].name == _this.name) {
        //             Utils.ButtonScaleAnimation(prizeTypeArray[i], prizeTypeArray[i].scale.x - 0.02, leaderBoardOverlay);
        //             this.EnableDisableLeaderBoardPageButtonInput(true);
        //         } else {}
        //     }
        // },
        // PrizeButtonReleased: function(_this) {
        //     for (var i = 0; i < prizeTypeArray.length; i++) {
        //         if (prizeTypeArray[i].name == _this.name) {
        //             prizeTypeArray[i].loadTexture('prize_type_selected_base');
        //         } else {
        //             prizeTypeArray[i].loadTexture('prize_type_not_selected_base');
        //         }
        //     }
        //     switch (_this.name) {
        //         case "Early Five":
        //             this.ShowPlayerDetailsForPrizeType(-280, -20, leaderboardEarlyFiveWinnerName, leaderBoardEarlyFiveWinAmount, 'leaderboardEarlyFiveWinnerImage');
        //             break;

        //         case "Top Line":
        //             this.ShowPlayerDetailsForPrizeType(0, -20, leaderboardTopLineWinnerName, leaderBoardTopLineWinAmount, 'leaderboardTopLineWinnerImage');
        //             break;

        //         case "Middle Line":
        //             this.ShowPlayerDetailsForPrizeType(280, -20, leaderboardMiddleLineWinnerName, leaderBoardMiddleLineWinAmount, 'leaderboardMiddleLineWinnerImage');
        //             break;

        //         case "Bottom Line":
        //             this.ShowPlayerDetailsForPrizeType(-280, -30, leaderboardBottomLineWinnerName, leaderBoardBottomLineWinAmount, 'leaderboardBottomLineWinnerImage');
        //             break;

        //         case "Four Corner":
        //             this.ShowPlayerDetailsForPrizeType(0, -30, leaderboardFourCornerWinnerName, leaderBoardFourCornerWinAmount, 'leaderboardFourCornerWinnerImage');
        //             break;

        //         case "Full House":
        //             this.ShowPlayerDetailsForPrizeType(280, -30, leaderboardFullHouseWinnerName, leaderBoardFullHouseWinAmount, 'leaderboardFullHouseWinnerImage');
        //             break;
        //     }
        // },

        // CreatePlayerDetailsForPrizeType: function() {
        //     prizeTypePlayerDetailsBase = Utils.SpriteSettingsControl(prizeTypePlayerDetailsBase, -282, -20, 'player_details_area', "true", "true", 0.5, 0.5, 1, 1, "false");
        //     prizeBehindBase.addChild(prizeTypePlayerDetailsBase);

        //     var prizeTypeProfileMask = game.add.graphics(0, 0);
        //     prizeTypeProfileMask.beginFill(0x000000);
        //     prizeTypeProfileMask.drawCircle(-70, 40, Math.round(game.height / 22));
        //     prizeTypePlayerDetailsBase.addChild(prizeTypeProfileMask);

        //     prizeTypePlayerPic = Utils.SpriteSettingsControl(prizeTypePlayerPic, -70, 40, "profile_pic", "true", "true", 0.5, 0.5, 0.3, 0.3, "false");
        //     prizeTypePlayerDetailsBase.addChild(prizeTypePlayerPic);
        //     prizeTypePlayerPic.mask = prizeTypeProfileMask;

        //     var prizeTypePlayerStyle = { font: '33px Lato-Medium', fontStyle: 'normal', fill: '#fff001', align: 'right', wordWrap: true, wordWrapWidth: 250 };
        //     prizeTypePlayerName = game.add.text(105, -30, "Md Jahangir", prizeTypePlayerStyle);
        //     prizeTypePlayerName.anchor.setTo(1, 0.5);
        //     prizeTypePlayerDetailsBase.addChild(prizeTypePlayerName);

        //     var prizeTypePlayerAmountStyle = { font: '33px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'right' };
        //     prizeTypePlayerAmount = game.add.text(95, 20, "₹ " + "900", prizeTypePlayerAmountStyle);
        //     prizeTypePlayerAmount.anchor.set(1, 0.5);
        //     prizeTypePlayerDetailsBase.addChild(prizeTypePlayerAmount);

        //     prizeTypePlayerDetailsBase.visible = false;
        // },

        // ShowPlayerDetailsForPrizeType: function(_posX, _posY, _playerName, _amount, _playerPic) {
        //     prizeTypePlayerDetailsBase.visible = true;
        //     prizeTypePlayerDetailsBase.position.set(_posX, _posY);
        //     prizeTypePlayerPic.loadTexture(_playerPic);
        //     prizeTypePlayerName.setText(_playerName);
        //     prizeTypePlayerAmount.setText(_amount);
        // },

        CreateBottomButtons: function() {
            leaderBoardSelectedButtonBase = Utils.SpriteSettingsControl(leaderBoardSelectedButtonBase, game.world.centerX + Math.round(game.width / 7.9), game.world.centerY + Math.round(game.height / 1.8), 'selected_button_base', "true", "true", 0.5, 0.5, 1, 1, "flase");
            leaderBoardHomeButton = Utils.ButtonSettingsControl(leaderBoardHomeButton, game.world.centerX - Math.round(game.width / 2.7), game.world.centerY + Math.round(game.height / 2.17), 'home', this.LeaderBoardHomeButtonPressed, null, null, this.LeaderBoardHomeButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            leaderBoardHistoryButton = Utils.ButtonSettingsControl(leaderBoardHistoryButton, game.world.centerX - Math.round(game.width / 7.9), game.world.centerY + Math.round(game.height / 2.17), 'history', this.LeaderBoardHistoryButtonPressed, null, null, this.LeaderBoardHistoryButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            leaderBoardLeaderBoardButton = Utils.ButtonSettingsControl(leaderBoardLeaderBoardButton, game.world.centerX + Math.round(game.width / 7.9), game.world.centerY + Math.round(game.height / 2.17), 'leaderboard', this.LeaderBoardLeaderBoardButtonPressed, null, null, this.LeaderBoardLeaderBoardButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            leaderBoardMenuButton = Utils.ButtonSettingsControl(leaderBoardMenuButton, game.world.centerX + Math.round(game.width / 2.7), game.world.centerY + Math.round(game.height / 2.17), 'menu', this.LeaderBoardMenuButtonPressed, null, null, this.LeaderBoardMenuButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);

            lBoardBottomButtonsGroup.add(leaderBoardSelectedButtonBase);
            lBoardBottomButtonsGroup.add(leaderBoardHomeButton);
            lBoardBottomButtonsGroup.add(leaderBoardHistoryButton);
            lBoardBottomButtonsGroup.add(leaderBoardLeaderBoardButton);
            lBoardBottomButtonsGroup.add(leaderBoardMenuButton);

            game.world.bringToTop(lBoardBottomButtonsGroup);

            this.ShowSelectedButtonBase();
        },
        ShowSelectedButtonBase: function() {
            game.add.tween(leaderBoardSelectedButtonBase).to({ y: game.world.centerY + game.height / 2.31 }, 100, Phaser.Easing.Linear.None, true, 100);
            game.add.tween(leaderBoardLeaderBoardButton).to({ y: game.world.centerY + game.height / 2.23 }, 100, Phaser.Easing.Linear.None, true, 50);
        },

        LeaderBoardHomeButtonPressed: function() {
            Utils.ButtonScaleAnimation(leaderBoardHomeButton, leaderBoardHomeButton.scale.x - 0.02, leaderBoardOverlay);
            this.EnableDisableLeaderBoardPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        LeaderBoardHomeButtonReleased: function() {
            StateTransition.TransitToMenu();
        },

        LeaderBoardHistoryButtonPressed: function() {
            Utils.ButtonScaleAnimation(leaderBoardHistoryButton, leaderBoardHistoryButton.scale.x - 0.02, leaderBoardOverlay);
            this.EnableDisableLeaderBoardPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        LeaderBoardHistoryButtonReleased: function() {
            StateTransition.TransitToGameHistory();
        },

        LeaderBoardLeaderBoardButtonPressed: function() {},
        LeaderBoardLeaderBoardButtonReleased: function() {},

        LeaderBoardMenuButtonPressed: function() {
            Utils.ButtonScaleAnimation(leaderBoardMenuButton, leaderBoardMenuButton.scale.x - 0.02, leaderBoardOverlay);
            this.EnableDisableLeaderBoardPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        LeaderBoardMenuButtonReleased: function() {
            StateTransition.TransitToProfilePage();
        },
        EnableDisableLeaderBoardPageButtonInput: function(_status) {
            leaderBoardOverlay.visible = _status;
        },

        LeaderBoardOverlayPressed: function() {},


    } //End of LeaderBoard.prototype