// var upcomingButton;
// var upcomingText;
var playedButton;
var playedGameText;
var noDataFoundBase;
var gameHistoryHomeButton;
var gameHistoryHistoryButton;
var gameHistoryLeaderBoardButton;
var gameHistoryMenuButton;
var gameHistorySelectedButtonBase;
var gHistoryBottomButtonsGroup;
var gameHistoryOverlay;

var gameHistoryTournamentMask;
// var upcomingIsMouseDown = false;
// var upcomingStartPos = 0;
// var upcomingTournamentScrollableGroup;
// var upcomingRemindButtonArray = [];
// var upcomingNotificationIconArray = [];
// var upcomingPlayButtonArray = [];
var playedTournamentScrollableGroup;
var playedStartPos = 0;
var playedIsMouseDown = false;
// var prizePriceArray = [200, 300, 400, 500, 600, 250];

// var upcomingGameJson;

var GameHistory = function() {};
GameHistory.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },
        create: function() {
            // API.UpcomingGameList(localStorage.getItem("access_token"));
            gHistoryBottomButtonsGroup = game.add.group();
            this.CreateGameHistoryPage();
            API.PlayedGameList(localStorage.getItem("access_token"));
            // var _data = [];
            // this.CreatePlayedTournamentList(_data);
        },

        // CreateUpcomingTournamentList: function(_data) {
        //     this.upcomingListArray = _data;

        //     upcomingTournamentScrollableGroup = game.add.group();
        //     upcomingRemindButtonArray = [];
        //     upcomingNotificationIconArray = [];
        //     upcomingPlayButtonArray = [];
        //     upcomingTournamentScrollableGroup.mask = gameHistoryTournamentMask;

        //     if (_data.length > 0) {
        //         this.HideNoDataPopup();
        //         for (var i = 0; i < _data.length; i++) {
        //             var gameStatus = _data[i].status;
        //             var gameId = _data[i]._id;
        //             var totalRewardAmount = _data[i].rewardTotal;
        //             var ticketPrice = _data[i].price;

        //             var strtdate = _data[i].gameStartTime;
        //             var date = this.ReturnDateFormat(strtdate);
        //             var time = this.ReturnTimeFormat(strtdate);
        //             var day = this.ReturnDayName(strtdate);
        //             var posX = game.world.centerX;
        //             var posY = (game.world.centerY - Math.round(game.height / 6)) + (i * Math.round(game.height / 2.6));
        //             this.ShowUpcomingTournamentList(posX, posY, i, gameId, day, time, totalRewardAmount, date, ticketPrice);

        //             if (_data[i].status == "running") {
        //                 this.EnablePlayButton(i);
        //             } else {}

        //         }
        //         upcomingButton.bringToTop();
        //         playedButton.bringToTop();
        //         game.world.bringToTop(gHistoryBottomButtonsGroup);
        //     } else {
        //         this.ShowNoDataPopup();
        //         game.world.bringToTop(gHistoryBottomButtonsGroup);
        //     }
        // },

        CreatePlayedTournamentList: function(_data) {
            this.upcomingListArray = [];
            this.playedListArray = _data;
            playedTournamentScrollableGroup = game.add.group();
            playedTournamentScrollableGroup.mask = gameHistoryTournamentMask;

            if (_data.length > 0) {
                this.HideNoDataPopup();
                for (var i = 0; i < _data.length; i++) {
                    var gameId = _data[i]._id;
                    var totalRewardAmount = _data[i].rewardTotal;
                    // var ticketPrice = _data[i].price;
                    // var strtdate = _data[i].gameStartTime;
                    var ticketPrice = _data[i].gameId;
                    var strtdate = _data[i].createdAt;
                    var date = this.ReturnDateFormat(strtdate);
                    var time = this.ReturnTimeFormat(strtdate);
                    var day = this.ReturnDayName(strtdate);
                    var posX = game.world.centerX;
                    var posY = (game.world.centerY - Math.round(game.height / 6)) + (i * Math.round(game.height / 2.6));
                    this.ShowPlayedTournamentList(posX, posY, i, gameId, day, time, totalRewardAmount, date, ticketPrice);
                }
                // upcomingButton.bringToTop();
                playedButton.bringToTop();
                game.world.bringToTop(gHistoryBottomButtonsGroup);
            } else {
                this.ShowNoDataPopup();
                game.world.bringToTop(gHistoryBottomButtonsGroup);
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

        CreateGameHistoryPage: function() {
            var gameHistoryBg = Utils.SpriteSettingsControl(gameHistoryBg, game.world.centerX, game.world.centerY, 'menu_bg', "true", "true", 0.5, 0.5, 1, 1, "false");
            var topPanel = Utils.SpriteSettingsControl(topPanel, game.world.centerX, game.world.centerY - Math.round(game.height / 2.16), 'top_panel', "true", "true", 0.5, 0.5, 1, 1, "false");

            // var upcomingTextStyle = { font: '34px Lato-Heavy', fill: '#fff', align: 'center' };
            // upcomingButton = Utils.ButtonSettingsControl(upcomingButton, -267, 131, 'game_history_selected_button_base', this.UpcomingButtonPressed, null, null, this.UpcomingButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            // topPanel.addChild(upcomingButton);
            // upcomingText = game.add.text(0, -2, "UPCOMING GAME", upcomingTextStyle);
            // upcomingText.anchor.setTo(0.5);
            // upcomingText.tint = '0x071f26';
            // upcomingButton.addChild(upcomingText);

            // var playedGameTextStyle = { font: '34px Lato-Heavy', fill: '#fff', align: 'center' };
            // playedButton = Utils.ButtonSettingsControl(playedButton, 270, 131, 'game_history_not_selected_button_base', this.PlayedButtonPressed, null, null, this.PlayedButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            playedButton = Utils.ButtonSettingsControl(playedButton, 0, 136, 'game_history_selected_button_base', this.PlayedButtonPressed, null, null, this.PlayedButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            topPanel.addChild(playedButton);
            var playedGameTextStyle = { font: '34px Lato-Heavy', fill: '#071f26', align: 'center' };
            playedGameText = game.add.text(0, -3, "PLAYED GAME", playedGameTextStyle);
            playedGameText.anchor.setTo(0.5);
            playedButton.addChild(playedGameText);

            this.CreateNoDataPopup();

            gameHistoryTournamentMask = game.add.graphics(0, 0);
            // gameHistoryTournamentMask.beginFill(0xFF3300);
            gameHistoryTournamentMask.drawRect(0, game.height / 7.2, game.width, game.height / 1.3);

            this.CreateBottomButtons();

            //Create overlay For off the input of all button when click on button
            gameHistoryOverlay = Utils.ButtonSettingsControl(gameHistoryOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.GameHistoryOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            gameHistoryOverlay.alpha = 0.001;
            gameHistoryOverlay.visible = false;
        },

        // UpcomingButtonPressed: function() {
        //     // console.log("UpcomingButtonPressed");
        //     upcomingButton.loadTexture('game_history_selected_button_base');
        //     playedButton.loadTexture('game_history_not_selected_button_base');
        //     upcomingText.tint = '0x071f26';
        //     playedGameText.tint = '0xffffff';
        // },
        // UpcomingButtonReleased: function() {
        //     this.HidePlayedTournamentList();
        //     this.HideUpcomingTournamentList();
        //     // API.UpcomingGameList(localStorage.getItem("access_token"));
        // },

        PlayedButtonPressed: function() {
            // console.log("PlayedButtonPressed");
            // playedButton.loadTexture('game_history_selected_button_base');
            // playedGameText.tint = '0x071f26';
            // upcomingButton.loadTexture('game_history_not_selected_button_base');
            // upcomingText.tint = '0xffffff';
        },
        PlayedButtonReleased: function() {
            // this.HideUpcomingTournamentList();
            // this.HidePlayedTournamentList();
            // API.PlayedGameList(localStorage.getItem("access_token"));
        },

        CreateNoDataPopup: function() {
            noDataFoundBase = Utils.SpriteSettingsControl(noDataFoundBase, game.world.centerX, game.world.centerY - Math.round(game.height / 27.1), 'no_data_found_base', "true", "true", 0.5, 0.5, 1, 1, "flase");
            var noDataFoundTextStyle = { font: '48px Lato-Heavy', fill: '#ffce00', align: 'center', wordWrap: false, wordWrapWidth: 500 };
            var noDataFoundText = game.add.text(10, 20, "NO\nDATA FOUND", noDataFoundTextStyle);
            noDataFoundText.anchor.setTo(0.5);
            noDataFoundText.setShadow(0, 2, '#000', 0);
            noDataFoundBase.addChild(noDataFoundText);

            noDataFoundBase.visible = false;
        },
        ShowNoDataPopup: function() {
            noDataFoundBase.visible = true;
        },
        HideNoDataPopup: function() {
            noDataFoundBase.visible = false;
        },

        ShowPlayedTournamentList: function(_posX, _posY, _index, _gameId, _day, _time, _prizeAmount, _date, _ticketAmount) {
            var playedInfoBox = Utils.SpriteSettingsControl(playedInfoBox, _posX, _posY, 'dashboard_info_box', "true", "true", 0.5, 0.5, 1, 1, "false");
            playedInfoBox.inputEnabled = true;
            playedInfoBox.events.onInputDown.add(this.PlayedInfoBoxPressed, this);
            playedInfoBox.events.onInputUp.add(this.PlayedInfoBoxReleased, this);

            this.CreateInfoBoxBgForScrolling(playedInfoBox);

            // var playedDayHeadingTextStyle = { font: '32px Lato-Heavy', fill: '#fff', align: 'center' };
            // var playedDayTimeHeadingText = game.add.text(-380, -280, _day + " - " + _time, playedDayHeadingTextStyle);
            // playedDayTimeHeadingText.anchor.set(0, 0.5);
            // playedInfoBox.addChild(playedDayTimeHeadingText);

            // var prizeAmountTextStyle = { font: '48px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center' };
            // var playedPrizeAmount = game.add.text(-380, -175, "PRIZE POOL - ₹ " + _prizeAmount, prizeAmountTextStyle);
            // playedPrizeAmount.anchor.set(0, 0.5);
            // playedPrizeAmount.setShadow(0, 2, '#e07e00', 0);
            // playedInfoBox.addChild(playedPrizeAmount);

            this.CreateCalenderIcon(playedInfoBox, _date);
            this.CreateClockIcon(playedInfoBox, _time);
            this.CreatePlayedInfoBoxTicketAmount(playedInfoBox, _ticketAmount);

            playedTournamentScrollableGroup.add(playedInfoBox);

            this.CreatePlayedScroller();
        },

        CreateInfoBoxBgForScrolling: function(_playedInfoBox) {
            var playedInfoBoxBg = Utils.SpriteSettingsControl(playedInfoBoxBg, 0, 0, 'transparent_image', "true", "true", 0.5, 0.5, 300, 300, "false");
            playedInfoBoxBg.scale.x = 1400;
            playedInfoBoxBg.scale.y = 750;
            playedInfoBoxBg.alpha = 0.001;
            _playedInfoBox.addChild(playedInfoBoxBg);
        },

        CreateCalenderIcon: function(_playedInfoBox, _date) {
            var calenderIcon = Utils.SpriteSettingsControl(calenderIcon, -360, -6, 'calender_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
            _playedInfoBox.addChild(calenderIcon);
            var dateTextStyle = { font: '48px Lato-Medium', fill: '#fff', align: 'left' };
            var playedDate = game.add.text(-310, -3, _date, dateTextStyle);
            playedDate.anchor.setTo(0, 0.5);
            _playedInfoBox.addChild(playedDate);
        },

        CreateClockIcon: function(_playedInfoBox, _time) {
            var clockIcon = Utils.SpriteSettingsControl(clockIcon, 130, -6, 'clock_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
            _playedInfoBox.addChild(clockIcon);
            var timeTextStyle = { font: '48px Lato-Medium', fill: '#fff', align: 'left' };
            var playedTime = game.add.text(180, -3, _time, timeTextStyle);
            playedTime.anchor.setTo(0, 0.5);
            _playedInfoBox.addChild(playedTime);
        },

        CreatePlayedInfoBoxTicketAmount: function(_playedInfoBox, _ticketAmount) {
            var playedTicketAmountTextStyle = { font: '48px Lato-Medium', fill: '#fff', align: 'center', wordWrap: false, wordWrapWidth: 500 };
            var playedTicketAmount = game.add.text(-170, 130, "₹ " + _ticketAmount + " / TICKET", playedTicketAmountTextStyle);
            playedTicketAmount.anchor.set(0, 0.5);
            _playedInfoBox.addChild(playedTicketAmount);
        },

        CreatePlayedScroller: function() {
            var scrollingLimit = Math.ceil(playedTournamentScrollableGroup.children[0].height.toFixed(2) * 1.9);
            scrollingLimit = Math.ceil(Math.ceil(playedTournamentScrollableGroup.height) - scrollingLimit);
            game.input.addMoveCallback(function(pointer, x, y) {
                if (playedIsMouseDown) {
                    if (pointer.y > playedStartPos) {
                        if (playedTournamentScrollableGroup.y < 0) {
                            var temp = playedTournamentScrollableGroup.y + (pointer.y - playedStartPos);
                            if (temp > 0) {
                                playedTournamentScrollableGroup.y = 0;
                            } else {
                                playedTournamentScrollableGroup.y += (pointer.y - playedStartPos);
                                playedStartPos = pointer.y;
                            }
                        } else {}
                    } else {}
                    if (pointer.y < playedStartPos) {
                        if (playedTournamentScrollableGroup.y > -scrollingLimit) {
                            var temp = playedTournamentScrollableGroup.y - (playedStartPos - pointer.y);
                            if (temp < -scrollingLimit) {
                                playedTournamentScrollableGroup.y = -scrollingLimit;
                            } else {
                                playedTournamentScrollableGroup.y -= (playedStartPos - pointer.y);
                                playedStartPos = pointer.y;
                            }
                        } else {}
                    } else {}
                } else {}
            });
        },

        HidePlayedTournamentList: function() {
            if (playedTournamentScrollableGroup != null) {
                playedTournamentScrollableGroup.destroy();
            } else {}
        },

        PlayedInfoBoxPressed: function() {
            playedStartPos = game.input.y;
            playedIsMouseDown = true;
        },
        PlayedInfoBoxReleased: function() {
            playedIsMouseDown = false;
        },

        // ShowUpcomingTournamentList: function(_posX, _posY, _index, _gameId, _day, _time, _prizeAmount, _date, _ticketAmount) {
        //     var upcomingInfoBox = Utils.SpriteSettingsControl(upcomingInfoBox, _posX, _posY, 'dashboard_info_box', "true", "true", 0.5, 0.5, 1, 1, "false");
        //     upcomingInfoBox.inputEnabled = true;
        //     upcomingInfoBox.events.onInputDown.add(this.UpcomingInfoBoxPressed, this);
        //     upcomingInfoBox.events.onInputUp.add(this.UpcomingInfoBoxReleased, this);

        //     var upcomingInfoBoxBg = Utils.SpriteSettingsControl(upcomingInfoBoxBg, 0, 0, 'transparent_image', "true", "true", 0.5, 0.5, 300, 300, "false");
        //     upcomingInfoBoxBg.scale.x = 1400;
        //     upcomingInfoBoxBg.scale.y = 750;
        //     upcomingInfoBoxBg.alpha = 0.001;
        //     upcomingInfoBox.addChild(upcomingInfoBoxBg);

        //     var upcomingDayHeadingTextStyle = { font: '32px Lato-Heavy', fill: '#fff', align: 'center' };
        //     var upcomingDayTimeHeadingText = game.add.text(-380, -280, _day + " - " + _time, upcomingDayHeadingTextStyle);
        //     upcomingDayTimeHeadingText.anchor.set(0, 0.5);
        //     upcomingInfoBox.addChild(upcomingDayTimeHeadingText);

        //     var gameHistoryRemindButtonBase = Utils.ButtonSettingsControl(gameHistoryRemindButtonBase, 280, -280, 'remind_button_base', this.GameHistoryRemindButtonPressed, null, null, this.GameHistoryRemindButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        //     upcomingInfoBox.addChild(gameHistoryRemindButtonBase);
        //     var remindTextStyle = { font: '28px Lato-Heavy', fill: '#000', align: 'center' };
        //     var remindText = game.add.text(-15, -5, "REMIND ME", remindTextStyle);
        //     remindText.anchor.setTo(0.5);
        //     gameHistoryRemindButtonBase.name = _index;
        //     gameHistoryRemindButtonBase.index = _gameId;
        //     gameHistoryRemindButtonBase.addChild(remindText);

        //     var notificationIcon = Utils.SpriteSettingsControl(notificationIcon, 420, -285, 'notification_on', "true", "true", 0.5, 0.5, 1, 1, "false");
        //     upcomingInfoBox.addChild(notificationIcon);
        //     notificationIcon.name = _index;
        //     notificationIcon.index = _gameId;
        //     upcomingRemindButtonArray.push(gameHistoryRemindButtonBase);
        //     upcomingNotificationIconArray.push(notificationIcon);

        //     var prizeAmountTextStyle = { font: '48px Lato-Heavy', fontStyle: 'normal', fill: '#fff001' };
        //     var upcomingPrizeAmount = game.add.text(-380, -175, "PRIZE POOL - ₹ " + _prizeAmount, prizeAmountTextStyle);
        //     upcomingPrizeAmount.anchor.set(0, 0.5);
        //     upcomingPrizeAmount.setShadow(0, 2, '#e07e00', 0);
        //     upcomingInfoBox.addChild(upcomingPrizeAmount);

        //     var upcomingNextArrowIcon = Utils.ButtonSettingsControl(upcomingNextArrowIcon, 370, -175, 'next_arrow', this.UpcomingNextArrowIconPressed, null, null, this.upcomingNextArrowIconReleased, "true", "true", 0.5, 0.5, 1, 1, this);
        //     upcomingNextArrowIcon.name = _index;
        //     upcomingNextArrowIcon.index = _gameId;
        //     upcomingInfoBox.addChild(upcomingNextArrowIcon);

        //     var startAtTextStyle = { font: '34px Lato-Medium', fill: '#5aefe2', align: 'center' };
        //     var startAtText = game.add.text(0, -85, "STARTS AT", startAtTextStyle);
        //     startAtText.anchor.setTo(0.5);
        //     upcomingInfoBox.addChild(startAtText);

        //     var calenderIcon = Utils.SpriteSettingsControl(calenderIcon, -360, -6, 'calender_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
        //     upcomingInfoBox.addChild(calenderIcon);
        //     var dateTextStyle = { font: '48px Lato-Medium', fill: '#fff', align: 'left' };
        //     var upcomingDate = game.add.text(-310, -3, _date, dateTextStyle);
        //     upcomingDate.anchor.setTo(0, 0.5);
        //     // upcomingDate.anchor.setTo(0.5);
        //     upcomingInfoBox.addChild(upcomingDate);

        //     var clockIcon = Utils.SpriteSettingsControl(clockIcon, 130, -6, 'clock_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
        //     upcomingInfoBox.addChild(clockIcon);
        //     var timeTextStyle = { font: '48px Lato-Medium', fill: '#fff', align: 'left' };
        //     var upcomingTime = game.add.text(180, -3, _time, timeTextStyle);
        //     upcomingTime.anchor.setTo(0, 0.5);
        //     // upcomingTime.anchor.setTo(0.5);
        //     upcomingInfoBox.addChild(upcomingTime);

        //     var upcomingTicketAmountTextStyle = { font: '48px Lato-Medium', fill: '#fff', align: 'center', wordWrap: false, wordWrapWidth: 500 };
        //     var upcomingTicketAmount = game.add.text(-170, 130, "₹ " + _ticketAmount + " / TICKET", upcomingTicketAmountTextStyle);
        //     upcomingTicketAmount.anchor.set(0, 0.5);
        //     upcomingInfoBox.addChild(upcomingTicketAmount);

        //     var upcomingPlayButton = Utils.ButtonSettingsControl(upcomingPlayButton, 0, 320, 'join_button_base', this.UpcomingPlayButtonPressed, null, null, this.UpcomingPlayButtonReleased, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        //     upcomingInfoBox.addChild(upcomingPlayButton);
        //     var playTextStyle = { font: '48px Lato-Heavy', fill: '#071f26', align: 'center', wordWrap: false, wordWrapWidth: 500 };
        //     var playText = game.add.text(0, -7, "PLAY NOW", playTextStyle);
        //     playText.anchor.setTo(0.5);
        //     upcomingPlayButton.alpha = 0.6;
        //     upcomingPlayButton.inputEnabled = false;
        //     upcomingPlayButton.name = _index;
        //     upcomingPlayButton.index = _gameId;
        //     upcomingPlayButton.addChild(playText);
        //     upcomingPlayButtonArray.push(upcomingPlayButton);

        //     upcomingTournamentScrollableGroup.add(upcomingInfoBox);

        //     this.CreateUpcomingScroller();
        // },

        // CreateUpcomingScroller: function() {
        //     var scrollingLimit = Math.ceil(upcomingTournamentScrollableGroup.children[0].height.toFixed(2) * 1.9);
        //     scrollingLimit = Math.ceil(Math.ceil(upcomingTournamentScrollableGroup.height) - scrollingLimit);
        //     game.input.addMoveCallback(function(pointer, x, y) {
        //         if (upcomingIsMouseDown) {
        //             if (pointer.y > upcomingStartPos) {
        //                 if (upcomingTournamentScrollableGroup.y < 0) {
        //                     var temp = upcomingTournamentScrollableGroup.y + (pointer.y - upcomingStartPos);
        //                     if (temp > 0) {
        //                         upcomingTournamentScrollableGroup.y = 0;
        //                     } else {
        //                         upcomingTournamentScrollableGroup.y += (pointer.y - upcomingStartPos);
        //                         upcomingStartPos = pointer.y;
        //                     }
        //                 } else {}
        //             } else {}
        //             if (pointer.y < upcomingStartPos) {
        //                 if (upcomingTournamentScrollableGroup.y > -scrollingLimit) {
        //                     var temp = upcomingTournamentScrollableGroup.y - (upcomingStartPos - pointer.y);
        //                     if (temp < -scrollingLimit) {
        //                         upcomingTournamentScrollableGroup.y = -scrollingLimit;
        //                     } else {
        //                         upcomingTournamentScrollableGroup.y -= (upcomingStartPos - pointer.y);
        //                         upcomingStartPos = pointer.y;
        //                     }
        //                 } else {}
        //             } else {}
        //         } else {}
        //     });
        // },

        // HideUpcomingTournamentList: function() {
        //     if (upcomingTournamentScrollableGroup != null) {
        //         upcomingTournamentScrollableGroup.destroy();
        //     } else {}
        // },

        // UpcomingInfoBoxPressed: function(_this) {
        //     upcomingStartPos = game.input.y;
        //     upcomingIsMouseDown = true;
        // },
        // UpcomingInfoBoxReleased: function(_this) {
        //     upcomingIsMouseDown = false;
        // },

        // GameHistoryRemindButtonPressed: function(_this) {
        //     for (var i = 0; i < upcomingRemindButtonArray.length; i++) {
        //         if (upcomingRemindButtonArray[i].name == _this.name) {
        //             Utils.ButtonScaleAnimation(upcomingRemindButtonArray[i], upcomingRemindButtonArray[i].scale.x - 0.02, gameHistoryOverlay);
        //             this.EnableDisableGameHistoryPageButtonInput(true);
        //         } else {}
        //     }
        // },
        // GameHistoryRemindButtonReleased: function(_this) {
        //     for (var i = 0; i < upcomingRemindButtonArray.length; i++) {
        //         if (upcomingRemindButtonArray[i].name == _this.name) {
        //             upcomingRemindButtonArray[i].loadTexture('remind_button_off_base');
        //             upcomingRemindButtonArray[i].inputEnabled = false;
        //         } else {}
        //     }
        //     for (var i = 0; i < upcomingNotificationIconArray.length; i++) {
        //         if (upcomingNotificationIconArray[i].name == _this.name) {
        //             upcomingNotificationIconArray[i].loadTexture('notification_off');
        //         } else {}
        //     }
        // },

        // UpcomingNextArrowIconPressed: function(_this) {
        //     // console.log("UpcomingNextArrowIconPressed: " + _this.name);
        // },
        // upcomingNextArrowIconReleased: function() {},

        // UpcomingPlayButtonPressed: function(_this) {
        //     // console.log("upcomingPlayButton pressed");
        //     for (var i = 0; i < upcomingPlayButtonArray.length; i++) {
        //         if (upcomingPlayButtonArray[i].name == _this.name) {
        //             Utils.ButtonScaleAnimation(upcomingPlayButtonArray[i], upcomingPlayButtonArray[i].scale.x - 0.02, gameHistoryOverlay);
        //             this.EnableDisableGameHistoryPageButtonInput(true);
        //         } else {}
        //     }
        // },
        // UpcomingPlayButtonReleased: function(_this) {
        //     var gameId = this.ReturnGameId(_this.name, this.upcomingListArray);
        //     prizePriceArray = this.ReturnPrizePrice(_this.name, this.upcomingListArray);
        //     // console.log("gameId: " + gameId);
        //     // console.log("prizePriceArray: ", prizePriceArray);
        //     Client.addUser(localStorage.getItem("access_token"));
        //     Client.gameRequest(localStorage.getItem("access_token"), gameId);
        // },

        // ReturnGameId: function(_index, _array) {
        //     return _array[_index]._id;
        // },

        // ReturnPrizePrice: function(_index, _array) {
        //     var earlyFiveAmt = _array[_index].rewardJaldiFive;
        //     var topLineAmt = _array[_index].rewardTopLine;
        //     var middleLineAmt = _array[_index].rewardMiddleLine;
        //     var bottomLineAmt = _array[_index].rewardBottomLine;
        //     var fourCornerAmt = _array[_index].rewardFourCorner;
        //     var fullHouseAmt = _array[_index].rewardFullHouse;
        //     var pArray = [earlyFiveAmt, topLineAmt, middleLineAmt, bottomLineAmt, fourCornerAmt, fullHouseAmt];
        //     return pArray
        // },

        // EnablePlayButton: function(_index) {
        //     upcomingPlayButtonArray[_index].alpha = 1;
        //     upcomingPlayButtonArray[_index].inputEnabled = true;
        // },

        CreateBottomButtons: function() {
            gameHistorySelectedButtonBase = Utils.SpriteSettingsControl(gameHistorySelectedButtonBase, game.world.centerX - Math.round(game.width / 7.9), game.world.centerY + Math.round(game.height / 1.8), 'selected_button_base', "true", "true", 0.5, 0.5, 1, 1, "flase");
            gameHistoryHomeButton = Utils.ButtonSettingsControl(gameHistoryHomeButton, game.world.centerX - Math.round(game.width / 2.7), game.world.centerY + Math.round(game.height / 2.17), 'home', this.GameHistoryHomeButtonPressed, null, null, this.GameHistoryHomeButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            gameHistoryHistoryButton = Utils.ButtonSettingsControl(gameHistoryHistoryButton, game.world.centerX - Math.round(game.width / 7.9), game.world.centerY + Math.round(game.height / 2.17), 'history', this.GameHistoryHistoryButtonPressed, null, null, this.GameHistoryHistoryButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            gameHistoryLeaderBoardButton = Utils.ButtonSettingsControl(gameHistoryLeaderBoardButton, game.world.centerX + Math.round(game.width / 7.9), game.world.centerY + Math.round(game.height / 2.17), 'leaderboard', this.GameHistoryLeaderBoardButtonPressed, null, null, this.GameHistoryLeaderBoardButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            gameHistoryMenuButton = Utils.ButtonSettingsControl(gameHistoryMenuButton, game.world.centerX + Math.round(game.width / 2.7), game.world.centerY + Math.round(game.height / 2.17), 'menu', this.GameHistoryMenuButtonPressed, null, null, this.GameHistoryMenuButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);

            gHistoryBottomButtonsGroup.add(gameHistorySelectedButtonBase);
            gHistoryBottomButtonsGroup.add(gameHistoryHomeButton);
            gHistoryBottomButtonsGroup.add(gameHistoryHistoryButton);
            gHistoryBottomButtonsGroup.add(gameHistoryLeaderBoardButton);
            gHistoryBottomButtonsGroup.add(gameHistoryMenuButton);

            this.ShowSelectedButtonBase();
        },

        ShowSelectedButtonBase: function() {
            game.add.tween(gameHistorySelectedButtonBase).to({ y: game.world.centerY + game.height / 2.31 }, 100, Phaser.Easing.Linear.None, true, 100);
            game.add.tween(gameHistoryHistoryButton).to({ y: game.world.centerY + game.height / 2.23 }, 100, Phaser.Easing.Linear.None, true, 50);
        },

        GameHistoryHomeButtonPressed: function() {
            Utils.ButtonScaleAnimation(gameHistoryHomeButton, gameHistoryHomeButton.scale.x - 0.02, gameHistoryOverlay);
            this.EnableDisableGameHistoryPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        GameHistoryHomeButtonReleased: function() {
            StateTransition.TransitToMenu();
        },

        GameHistoryLeaderBoardButtonPressed: function() {
            Utils.ButtonScaleAnimation(gameHistoryLeaderBoardButton, gameHistoryLeaderBoardButton.scale.x - 0.02, gameHistoryOverlay);
            this.EnableDisableGameHistoryPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        GameHistoryLeaderBoardButtonReleased: function() {
            StateTransition.TransitToLeaderBoard();
        },

        GameHistoryMenuButtonPressed: function() {
            Utils.ButtonScaleAnimation(gameHistoryMenuButton, gameHistoryMenuButton.scale.x - 0.02, gameHistoryOverlay);
            this.EnableDisableGameHistoryPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        GameHistoryMenuButtonReleased: function() {
            StateTransition.TransitToProfilePage();
        },

        GameHistoryHistoryButtonPressed: function() {},
        GameHistoryHistoryButtonReleased: function() {},

        EnableDisableGameHistoryPageButtonInput: function(_status) {
            gameHistoryOverlay.visible = _status;
        },


    } //End of GameHistory.prototype