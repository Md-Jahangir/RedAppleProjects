var gameplayMenuButton;
var gameplayArrowButton;
var totalClaimText;
var delearBase;
var delearSideBase;
var announceText;
var totalTicketText;
var upButton;
var downButton;
var upButtonIcon;
var downButtonIcon;
var ticketNumberImageArray = [];
var ticketNumberValueArray = [];
var prizeTypeForClaimArray = [];
var gameplayOverlay;
var ticketPanelGroup;
var ticketGroup;
var numberPlate;
var numberPlateImageArray = [];
var numberPlateNumberArray = [];
var arrowToggleCounter = false;
var gameplayMenuPanel;
var gameplayBackButton;
var gameplayProfileButton;
var gameplaySettingsButton;
var gameplayInfoButton;
var menuPanelGroup;
var menuButtonToggleCounter = false;
var timerImage;
var counterMax = 0;
var randomTimer;
var timeCounter = 0;
var randomNumberFromServer;
var announcedNumberArray = [];
var totalNumberOfClaim = 6;

var playersNormalGroup;
var playersGroup;
var playersNormalArea;
var normalPlayerProfilePic;
var normalPlayerName;
var totalNormalPlayersNumber;
var playersDetailsGroup;
var playersDetailsCrossButton;
var playerDetailsScrollableGroup;
var playerDetailsScroller;
var detailsAreaProfilePic;
var detailsAreaPlayerName;
var detailsAreaPlayerLevel;
var detailsAreaPlayerTicket;

var ticketPos = "";
var ticketValue = "";
var ticketId = "";
var ticketObject = "";
var ticketObjectArray = [];
var clickedButton = [];

var Gameplay = function() {};
Gameplay.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            ticketObjectArray = [];
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },
        create: function() {
            localStorage.setItem("is_game_playing", true);

            var gameplayBg = Utils.SpriteSettingsControl(gameplayBg, game.world.centerX, game.world.centerY, 'gameplay_bg', "true", "true", 0.5, 0.5, 1, 1, "false");
            gameplayBg.angle = 90;

            announcedNumberArray = [];
            ticketPanelGroup = game.add.group();
            ticketGroup = game.add.group();
            menuPanelGroup = game.add.group();

            //From server data
            // this.LoadImagesFromServer(totalNumberOfPlayers);
            this.CreateUserTicket(userTicketTable);
            this.CreateGameplayUI();
            SoundOptionPopup.CreateSoundOptionPopup();
            LoadingPopup.ShowLoadingPopup();

            //Create overlay For off the input of all button when click on button
            gameplayOverlay = Utils.ButtonSettingsControl(gameplayOverlay, game.world.centerX, game.world.centerY, 'transparent_image', this.GameplayOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            gameplayOverlay.alpha = 0.001;
            gameplayOverlay.visible = false;

        }, //End of Create function

        CreateUserTicket: function(_data) {
            prizeTypeForClaimArray = [];
            for (var i = 0; i < _data.length; i++) {
                var posX = game.world.centerX - Math.round(game.width / 20) - (i * (game.world.centerX + Math.round(game.width / 3.2)));
                this.CreateTicket(_data[i].ticketTable, _data[i].id, posX, i);
                //Showing the claimed and remain reward button
                this.PrizeButtonHandler(connectedRoomData);
                //Blcoked ticket showing when reconnect
                if (_data[i].block == true) {
                    this.BlockParticularTicket(_data[i].id);
                } else {}
                //Showing Submitted number when reconnect
                this.EnableTheSubmittedNumberWhenReconnect(_data[i].submitedNo);
            }
            this.CreateMaskForTicketArea();

        },

        CreateMaskForTicketArea: function() {
            var gamePlayMask = game.add.graphics(0, 0);
            // gamePlayMask.beginFill(0xFF3300);
            gamePlayMask.drawRect(Math.round(game.width / 10.5), Math.round(game.height / 20), Math.round(game.width / 1.3), Math.round(game.height / 1.1));
            ticketGroup.mask = gamePlayMask;
        },

        //For Cretae User tickets
        CreateTicket: function(_item, _ticketId, _posX, _index) {
            ticketNumberImageArray = [];
            ticketNumberValueArray = [];

            var ticketBoard = Utils.SpriteSettingsControl(ticketBoard, _posX, game.world.centerY + Math.round(game.height / 22), 'normal_ticket_board_' + _index, "true", "true", 0.5, 0.5, 1, 1, "false");
            ticketBoard.angle = 90;
            ticketBoard.index = _index;
            ticketBoard.name = _ticketId;

            this.CreateTicketNumberAndClaimButtonForticketBoard(ticketBoard, _index);

            this.CreateTicketValueAndClickableArea(_item, ticketBoard);

            ticketGroup.add(ticketBoard);
            ticketPanelGroup.add(ticketGroup);

            this.CreatePrizeTypeForClaim(_index);

            this.CreateBlockedImageAndText(ticketBoard);

            // var blockedBoardImage = Utils.ButtonSettingsControl(blockedBoardImage, -130, -11, 'one_pixel', this.blockedBoardImagePressed, null, null, this.blockedBoardImageReleased, "true", "true", 0.5, 0.5, 1076, 366, this);
            // blockedBoardImage.alpha = 0.8;
            // blockedBoardImage.tint = "0x000000";
            // ticketBoard.addChild(blockedBoardImage);
            // blockedBoardImage.inputEnabled = false;
            // blockedBoardImage.visible = false;

            // var blockedMsgTextStyle = { font: '52px Lato-Heavy', fill: '#fff', align: 'center' };
            // var blockedMsg = game.add.text(-125, 0, "You can not play with this ticket no more!", blockedMsgTextStyle);
            // blockedMsg.anchor.setTo(0.5);
            // ticketBoard.addChild(blockedMsg);
            // blockedMsg.visible = false;
        },

        CreateBlockedImageAndText: function(_ticketBoard) {
            var blockedBoardImage = Utils.ButtonSettingsControl(blockedBoardImage, -130, -11, 'one_pixel', this.blockedBoardImagePressed, null, null, this.blockedBoardImageReleased, "true", "true", 0.5, 0.5, 1076, 366, this);
            blockedBoardImage.alpha = 0.8;
            blockedBoardImage.tint = "0x000000";
            _ticketBoard.addChild(blockedBoardImage);
            blockedBoardImage.inputEnabled = false;
            blockedBoardImage.visible = false;

            var blockedMsgTextStyle = { font: '52px Lato-Heavy', fill: '#fff', align: 'center' };
            var blockedMsg = game.add.text(-125, 0, "You can not play with this ticket no more!", blockedMsgTextStyle);
            blockedMsg.anchor.setTo(0.5);
            _ticketBoard.addChild(blockedMsg);
            blockedMsg.visible = false;
        },

        blockedBoardImagePressed: function() {},
        blockedBoardImageReleased: function() {},

        CreateTicketNumberAndClaimButtonForticketBoard: function(_ticketBoard, _index) {
            var ticketNumberTextStyle = { font: '48px Lato-Heavy', fill: '#960548', align: 'center' };
            var numberOfTicketMark = game.add.text(566, -22, _index + 1, ticketNumberTextStyle);
            numberOfTicketMark.anchor.setTo(0.5);
            _ticketBoard.addChild(numberOfTicketMark);

            var ticketClaimHideButton = Utils.ButtonSettingsControl(ticketClaimHideButton, 566, 108, 'ticket_claim_button', this.TicketClaimHideButtonPressed, null, null, this.TicketClaimHideButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            _ticketBoard.addChild(ticketClaimHideButton);
            ticketClaimHideButton.index = _index;
        },

        // CreateTicketValueAndClickableArea: function(_item, _ticketBoard) {
        //     for (var i = 0; i < _item.length; i++) {
        //         var xPos = -600 + (parseInt(_item[i].pos % 9) * 117);
        //         if (_item[i].pos == 1) {
        //             var yPos = -124;
        //         } else {
        //             var yPos = -124 + (parseInt(_item[i].pos / 9) * 115);
        //         }

        //         if (_item[i].value != 0) {
        //             var img = Utils.ButtonSettingsControl(img, xPos, yPos, 'behind_number_image', this.TicketNumberButtonPressed, null, null, this.TicketNumberButtonReleased, "true", "true", 0.5, 0.5, 1.2, 1.2, this);
        //             img.alpha = 0.001;
        //             img.name = _item[i].pos;
        //             img.index = _item[i].value;
        //             // img.bool = false;

        //             var numberValue = game.add.text(xPos, yPos, _item[i].value, { font: '55px Lato-Heavy', fontStyle: 'normal', fill: '#fff', align: 'center' });
        //             numberValue.anchor.setTo(0.5);
        //             _ticketBoard.addChild(img);
        //             _ticketBoard.addChild(numberValue);

        //             ticketNumberImageArray.push(img);
        //             ticketNumberValueArray.push(numberValue);
        //         } else {}
        //     }
        // },
        // DisableAllTicketGlowImage() {
        //     for (var i = 0; i < ticketNumberImageArray.length; i++) {
        //         ticketNumberImageArray[i].alpha = 0;
        //         ticketNumberImageArray[i].bool = false;
        //     }
        //     for (var j = 0; j < ticketObjectArray.length; j++) {
        //         ticketObjectArray[j].alpha = 1;
        //     }
        // },

        CreateTicketValueAndClickableArea: function(_item, _ticketBoard) {
            for (var i = 0; i < _item.length; i++) {
                var xPos = -600 + (parseInt(_item[i].pos % 9) * 117);
                if (_item[i].pos == 1) {
                    var yPos = -124;
                } else {
                    var yPos = -124 + (parseInt(_item[i].pos / 9) * 115);
                }

                if (_item[i].value != 0) {
                    var img = Utils.ButtonSettingsControl(img, xPos, yPos, 'behind_number_image', this.TicketNumberButtonPressed, null, null, this.TicketNumberButtonReleased, "true", "true", 0.5, 0.5, 1.2, 1.2, this);
                    img.alpha = 0.001;
                    img.name = _item[i].pos;
                    img.index = _item[i].value;

                    var numberValue = game.add.text(xPos, yPos, _item[i].value, { font: '55px Lato-Heavy', fontStyle: 'normal', fill: '#fff', align: 'center' });
                    numberValue.anchor.setTo(0.5);
                    _ticketBoard.addChild(img);
                    _ticketBoard.addChild(numberValue);

                    ticketNumberImageArray.push(img);
                    ticketNumberValueArray.push(numberValue);
                } else {}
            }
        },

        EnableTheSubmittedNumberWhenReconnect: function(_submittedTicketPos) {
            for (var j = 0; j < _submittedTicketPos.length; j++) {
                for (var i = 0; i < ticketNumberImageArray.length; i++) {
                    if (ticketNumberImageArray[i].name == _submittedTicketPos[j]) {
                        ticketNumberImageArray[i].alpha = 1;
                        ticketNumberImageArray[i].inputEnabled = false;
                    } else {}
                }
            }
        },

        BlockParticularTicket: function(_blockedTicketId) {
            for (var i = 0; i < ticketGroup.length; i++) {
                if (ticketGroup.children[i].name == _blockedTicketId) {
                    for (var j = 2; j < (ticketGroup.children[i].children.length - 2); j++) {
                        // for (var j = 2; j < ticketGroup.children[i].children.length; j++) {
                        ticketGroup.children[i].children[j].inputEnabled = false;
                    }
                    for (var k = 32; k < 38; k++) {
                        ticketGroup.children[i].children[k].alpha = 0.5;
                    }
                    ticketGroup.children[i].children[38].visible = true;
                    ticketGroup.children[i].children[39].visible = true;

                } else {}
            }
        },

        // TicketNumberButtonPressed: function(_this) {
        //     // console.log("_this: ", _this);
        //     // if(randomNumberFromServer == _this.index)
        //     // {
        //     //     _this.alpha = 1;
        //     //     _this.inputEnabled = false;
        //     // }
        //     // else{
        //     //     console.log("Enter into the Else Part................................");
        //     //     _this.alpha = 1;
        //     //     setTimeout(() => {
        //     //         _this.alpha = 0;
        //     //     }, 2000);
        //     // }
        //     //_this.inputEnabled = false;
        //     // console.log("The ticket Button Pressed Before .............................."+_this.bool + "..........."+ticketObject.name+"_this.index......"+_this.name);
        //     if (ticketObject.name != _this.name) {
        //         this.DisableAllTicketGlowImage();
        //     }

        //     if (!_this.bool) {
        //         _this.bool = true;
        //         _this.alpha = 1;
        //         ticketPos = _this.name;
        //         ticketValue = _this.index;
        //         ticketId = _this.parent.name;
        //         ticketObject = _this;
        //         // console.log("ticketPos: " + ticketPos);
        //         // console.log("ticketValue: " + ticketValue);
        //     } else {
        //         _this.bool = false;
        //         _this.alpha = 0;
        //         ticketPos = "";
        //         ticketValue = "";
        //         ticketId = "";
        //         ticketObject = "";
        //     }
        //     // console.log("The ticket Button Pressed After .............................."+_this.bool);
        //     //clickedButton[this.index] = 1;
        //     // Client.submitNoAgainstRandomNoGenerate(localStorage.getItem("access_token"), ticketId, ticketPos, ticketValue);
        //     SoundManager.PlayNumberClickSound();
        // },

        TicketNumberButtonPressed: function(_this) {
            _this.alpha = 1;
            _this.inputEnabled = false;
            var ticketPos = _this.name;
            var ticketValue = _this.index;
            var ticketId = _this.parent.name;
            Client.submitNoAgainstRandomNoGenerate(localStorage.getItem("access_token"), ticketId, ticketPos, ticketValue);
            SoundManager.PlayNumberClickSound();
        },
        TicketNumberButtonReleased: function() {},

        TicketClaimHideButtonPressed: function(_this) {
            if (ticketGroup.children[_this.index].children[1].key == 'ticket_claim_button') {
                this.ShowClaimedTicketPanel(_this.index);
            } else if (ticketGroup.children[_this.index].children[1].key == 'ticket_hide_button') {
                this.ShowTicketPanel(_this.index);
            } else {}
            SoundManager.PlayButtonClickTypeOneSound();
        },
        TicketClaimHideButtonReleased: function() {},

        ShowTicketPanel: function(_index) {
            ticketGroup.children[_index].loadTexture('normal_ticket_board_' + _index);
            ticketGroup.children[_index].children[0].position.set(566, -22);
            ticketGroup.children[_index].children[1].loadTexture('ticket_claim_button');
            ticketGroup.children[_index].children[1].position.set(566, 108);
            for (var i = 2; i < ticketGroup.children[_index].children.length; i++) {
                ticketGroup.children[_index].children[i].position.y += 52;
            }
            for (var i = 2; i < ticketGroup.children[_index].children.length; i++) {
                ticketGroup.children[_index].children[i].position.y += 52;
            }
            this.HidePrizeTypeForClaim(_index);
        },

        ShowClaimedTicketPanel: function(_index) {
            ticketGroup.children[_index].loadTexture('claim_ticket_board_' + _index);
            ticketGroup.children[_index].children[0].position.set(566, -123);
            ticketGroup.children[_index].children[1].loadTexture('ticket_hide_button');
            ticketGroup.children[_index].children[1].position.set(566, 4);
            for (var i = 2; i < ticketGroup.children[_index].children.length; i++) {
                ticketGroup.children[_index].children[i].position.y -= 52;
            }
            for (var i = 2; i < ticketGroup.children[_index].children.length; i++) {
                ticketGroup.children[_index].children[i].position.y -= 52;
            }

            this.ShowPrizeTypeForClaim(_index);
        },

        CreatePrizeTypeForClaim: function(_index) {
            var prizeNameHeadingArray = ["Early Five", "Top Line", "Middle Line", "Bottom Line", "Four Corner", "Full House"];
            for (var i = 0; i < 6; i++) {
                xPos = -500 + (parseInt(i % 3) * 370);
                if (i == 0) {
                    yPos = 245;
                } else {
                    yPos = 245 + (parseInt(i / 3) * 125);
                }
                var prizeBase = Utils.ButtonSettingsControl(prizeBase, xPos, yPos, 'prize_type_not_selected_base', this.PrizeButtonPressed, null, null, this.PrizeButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
                prizeBase.name = prizeNameHeadingArray[i];
                ticketGroup.children[_index].addChild(prizeBase);

                var prizeHeadingStyle = { font: '28px Lato-Medium', fontStyle: 'normal', fill: '#fff', align: 'center' };
                var prizeHeading = game.add.text(0, -20, prizeNameHeadingArray[i], prizeHeadingStyle);
                prizeHeading.anchor.setTo(0.5);
                prizeBase.addChild(prizeHeading);

                var prizeAmountStyle = { font: '32px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center' };
                var claimedPrizeAmount = game.add.text(25, 18, prizePriceArray[i], prizeAmountStyle);
                claimedPrizeAmount.anchor.set(1, 0.5);
                prizeBase.addChild(claimedPrizeAmount);

                this.CreatePrizeClaimNotificationIcon(prizeBase);

                prizeTypeForClaimArray.push(prizeBase);
            }
            this.HidePrizeTypeForClaim(_index);
        },

        CreatePrizeClaimNotificationIcon: function(_prizeBase) {
            var prizeNotificationBase = Utils.SpriteSettingsControl(prizeNotificationBase, 115, -35, 'claim_notifiation', "true", "true", 0.5, 0.5, 1, 1, "false");
            _prizeBase.addChild(prizeNotificationBase);
            var prizeNotificationStyle = { font: '34px Lato-Heavy', fontStyle: 'normal', fill: '#fff', align: 'center' };
            var prizeNotificationNumber = game.add.text(0, 0, "1", prizeNotificationStyle);
            prizeNotificationNumber.anchor.set(0.5, 0.5);
            prizeNotificationBase.addChild(prizeNotificationNumber);
        },

        ShowPrizeTypeForClaim: function(_index) {
            for (var i = 32; i < 38; i++) {
                // for (var i = 32; i < ticketGroup.children[_index].children.length; i++) {
                ticketGroup.children[_index].children[i].visible = true;
            }
        },
        HidePrizeTypeForClaim: function(_index) {
            for (var i = 32; i < 38; i++) {
                // for (var i = 32; i < ticketGroup.children[_index].children.length; i++) {
                ticketGroup.children[_index].children[i].visible = false;
            }
        },

        PrizeButtonPressed: function(_this) {
            var rewardName = "";
            SoundManager.PlayButtonClickTypeTwoSound();
            switch (_this.name) {
                case "Early Five":
                    rewardName = "earlyFive";
                    break;
                case "Top Line":
                    rewardName = "topLine";
                    break;
                case "Middle Line":
                    rewardName = "middleLine";
                    break;
                case "Bottom Line":
                    rewardName = "bottomLine";
                    break;
                case "Four Corner":
                    rewardName = "fourCorner";
                    break;
                case "Full House":
                    rewardName = "fullHouse";
                    break;
            }
            var ticketId = _this.parent.name;
            Client.submitForReward(localStorage.getItem("access_token"), ticketId, rewardName);
        },
        PrizeButtonReleased: function() {},

        DeductNumberOfClaims: function(_data) {
            if (_data.result.Winners.earlyFive == true) {
                totalNumberOfClaim--;
            } else if (_data.result.Winners.topLine == true) {
                totalNumberOfClaim--;
            } else if (_data.result.Winners.middleLine == true) {
                totalNumberOfClaim--;
            } else if (_data.result.Winners.bottomLine == true) {
                totalNumberOfClaim--;
            } else if (_data.result.Winners.fourCorner == true) {
                totalNumberOfClaim--;
            } else if (_data.result.Winners.fullHouse == true) {
                totalNumberOfClaim--;
            } else {}
            totalClaimText.setText(totalNumberOfClaim + " Claims");
        },


        PrizeButtonHandler: function(_data) {
            this.EnableDisablePrizeButton(true);
            if (_data.result.Winners.earlyFive == true) {
                this.DisableThePrizeButtonWhenClaimed(0, 6);
                SoundManager.PlayEarlyFiveSound();
            } else {}
            if (_data.result.Winners.topLine == true) {
                this.DisableThePrizeButtonWhenClaimed(1, 7);
                SoundManager.PlayTopLineSound();
            } else {}
            if (_data.result.Winners.middleLine == true) {
                this.DisableThePrizeButtonWhenClaimed(2, 8);
                SoundManager.PlayMiddleLineSound();
            } else {}
            if (_data.result.Winners.bottomLine == true) {
                this.DisableThePrizeButtonWhenClaimed(3, 9);
                SoundManager.PlayBottomLineSound();
            } else {}
            if (_data.result.Winners.fourCorner == true) {
                this.DisableThePrizeButtonWhenClaimed(4, 10);
                SoundManager.PlayFourCornerSound();
            } else {}
            if (_data.result.Winners.fullHouse == true) {
                this.DisableThePrizeButtonWhenClaimed(5, 11);
                SoundManager.PlayFullHouseSound();
            } else {}
        },

        DisableThePrizeButtonWhenClaimed: function(_index1, _index2) {
            if (prizeTypeForClaimArray.length > 6) {
                prizeTypeForClaimArray[_index1].inputEnabled = false;
                prizeTypeForClaimArray[_index1].alpha = 0.5;
                prizeTypeForClaimArray[_index2].inputEnabled = false;
                prizeTypeForClaimArray[_index2].alpha = 0.5;
                prizeTypeForClaimArray[_index1].children[2].children[0].setText("0");
                prizeTypeForClaimArray[_index2].children[2].children[0].setText("0");
            } else {
                prizeTypeForClaimArray[_index1].inputEnabled = false;
                prizeTypeForClaimArray[_index1].alpha = 0.5;
                prizeTypeForClaimArray[_index1].children[2].children[0].setText("0");
            }
        },

        EnableDisablePrizeButton: function(_status) {
            for (var i = 0; i < prizeTypeForClaimArray.length; i++) {
                prizeTypeForClaimArray[i].inputEnabled = _status;
                if (_status) {
                    prizeTypeForClaimArray[i].alpha = 1;
                } else {
                    prizeTypeForClaimArray[i].alpha = 0.5;
                }
            }
        },

        ShowRandomNumber: function(_num) {
            if (_num != null && announceText != null) {
                setTimeout(() => {
                    SoundManager.PlayDeclaredNumberSound(_num);
                }, 100);
                randomNumberFromServer = _num;
                announceText.setText(_num);
                this.UpdateTimer();
            } else {}
        },

        UpdateTimer: function() {
            counterMax = 10;
            timeCounter = 9.5;

            timerImage = game.add.graphics(0, -22);
            delearBase.addChild(timerImage);
            game.time.events.stop();
            randomTimer = game.time.events.loop(100, this.UpdateCounter, this);
            game.time.events.start();
        },

        // UpdateCounter: function() {
        //     timerImage.clear();
        //     var timerImageScale = Math.round(game.height / 35);
        //     timerImage.lineStyle(15, 0x021e23);
        //     timerImage.arc(0, 0, timerImageScale, game.math.degToRad(-90), game.math.degToRad(-90 + (360 / counterMax) * (counterMax - timeCounter)), true);
        //     timerImage.beginFill(0x021e23);
        //     timerImage.endFill();

        //     timeCounter -= 0.1;
        //     if (timeCounter <= 0) {
        //         game.time.events.stop();
        //         game.time.events.remove(randomTimer);
        //         timerImage.clear();
        //         timerImage.destroy();
        //         timeCounter = 0;
        //         counterMax = 0;
        //         if (ticketId != "") {
        //             // console.log("Enter into the Ticket Id Section...........................");
        //             ticketObject.inputEnabled = false;
        //             ticketObjectArray.push(ticketObject);
        //             //this.EnableTicketObjArray();
        //             Client.submitNoAgainstRandomNoGenerate(localStorage.getItem("access_token"), ticketId, ticketPos, ticketValue);
        //         }
        //         Gameplay.prototype.CreateAnnouncedNumber(randomNumberFromServer, -90);
        //     } else {}
        // },

        UpdateCounter: function() {
            timerImage.clear();
            var timerImageScale = Math.round(game.height / 35);
            timerImage.lineStyle(15, 0x021e23);
            timerImage.arc(0, 0, timerImageScale, game.math.degToRad(-90), game.math.degToRad(-90 + (360 / counterMax) * (counterMax - timeCounter)), true);
            timerImage.beginFill(0x021e23);
            timerImage.endFill();

            timeCounter -= 0.1;
            if (timeCounter <= 0) {
                game.time.events.stop();
                game.time.events.remove(randomTimer);
                timerImage.clear();
                timerImage.destroy();
                timeCounter = 0;
                counterMax = 0;
                Gameplay.prototype.CreateAnnouncedNumber(randomNumberFromServer, -90);
            } else {}
        },

        CreateAnnouncedNumber: function(_number, _xPos) {
            var announcedNumberBase = Utils.SpriteSettingsControl(announcedNumberBase, _xPos, 0, 'announced_number_base', "true", "true", 0.5, 0.5, 1, 1, "false");
            delearSideBase.addChild(announcedNumberBase);
            var announcedNumberStyle = { font: '40px Lato-Heavy', fill: '#000', align: 'center' };
            var announcedNumber = game.add.text(0, 0, _number, announcedNumberStyle);
            announcedNumber.anchor.setTo(0.5);
            announcedNumberBase.addChild(announcedNumber);
            announcedNumberArray.unshift(announcedNumberBase);
            for (var i = 0; i < announcedNumberArray.length; i++) {
                if (announcedNumberArray.length > 1) {
                    this.MoveAnnouncedNumber(announcedNumberArray[i], _xPos + (i * 110));
                } else {}
            }
            if (announcedNumberArray.length > 2) {
                announcedNumberArray.pop();
            } else {}
        },

        MoveAnnouncedNumber: function(_num, _pos) {
            game.add.tween(_num).to({ x: _pos }, 500, Phaser.Easing.Linear.None, true);
        },

        CreateGameplayUI: function() {
            this.CreateTotalTicketShowingArea();
            this.CreateTotalClaimShowingArea();

            delearSideBase = Utils.SpriteSettingsControl(delearSideBase, game.world.centerX + Math.round(game.width / 2.43), game.world.centerY + Math.round(game.height / 20), 'delear_side_base', "true", "true", 0.5, 0.5, 1, 1, "false");
            delearSideBase.angle = 90;

            delearBase = Utils.SpriteSettingsControl(delearBase, -260, 20, 'delear_base', "true", "true", 0.5, 0.5, 1, 1, "false");
            delearSideBase.addChild(delearBase);

            var timerBase = Utils.SpriteSettingsControl(timerBase, 0, -18, 'timer_base', "true", "true", 0.5, 0.5, 1, 1, "false");
            delearBase.addChild(timerBase);

            var announceTextStyle = { font: '52px Lato-Heavy', fill: '#09272f', align: 'center' };
            announceText = game.add.text(0, -16, "", announceTextStyle);
            announceText.anchor.setTo(0.5);
            delearBase.addChild(announceText);

            this.CreateNormalPlayers();
            this.ShowNormalPlayers();
            this.CreateDetailsPlayers();
            this.CreateMenuPanel();
            this.CreateUpButton();
            this.CreateDownButton();

            ticketPanelGroup.add(upButton);
            ticketPanelGroup.add(downButton);

            this.EnableUpDownButton();
            this.CreateNumberPlate();
        },

        CreateTotalTicketShowingArea: function() {
            var totalTicketButton = Utils.SpriteSettingsControl(totalTicketButton, game.world.centerX + Math.round(game.width / 2.33), game.world.centerY - Math.round(game.height / 2.4), 'claim_base', "true", "true", 0.5, 0.5, 1, 1, "false");
            totalTicketButton.angle = 90;
            var totalTicketTextStyle = { font: '34px Lato-Medium', fill: '#fff', align: 'left' };
            totalTicketText = game.add.text(-90, 0, "0 Tickets", totalTicketTextStyle);
            totalTicketText.anchor.setTo(0, 0.5);
            totalTicketButton.addChild(totalTicketText);
            var totalTicketIcon = Utils.SpriteSettingsControl(totalTicketIcon, 88, 0, 'ticket_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
            totalTicketButton.addChild(totalTicketIcon);
        },

        CreateTotalClaimShowingArea: function() {
            var totalClaimButton = Utils.SpriteSettingsControl(totalClaimButton, game.world.centerX + Math.round(game.width / 2.33), game.world.centerY + Math.round(game.height / 2.4), 'claim_base', "true", "true", 0.5, 0.5, 1, 1, "false");
            totalClaimButton.angle = 90;
            var totalClaimTextStyle = { font: '34px Lato-Medium', fill: '#fff', align: 'left' };
            totalClaimText = game.add.text(-90, 0, totalNumberOfClaim + " Claims", totalClaimTextStyle);
            totalClaimText.anchor.setTo(0, 0.5);
            totalClaimButton.addChild(totalClaimText);
            var totalClaimIcon = Utils.SpriteSettingsControl(totalClaimIcon, 85, 0, 'claim_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
            totalClaimButton.addChild(totalClaimIcon);
        },
        CreateUpButton: function() {
            upButton = Utils.ButtonSettingsControl(upButton, game.world.centerX - Math.round(game.width / 2.21), game.world.centerY - Math.round(game.height / 3.95), 'inactive_button_base', this.UpButtonPressed, null, null, this.UpButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            upButton.angle = 90;
            upButton.inputEnabled = false;
            upButtonIcon = Utils.SpriteSettingsControl(upButtonIcon, 0, 8, 'inactive_button_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
            upButtonIcon.angle = 180;
            upButton.addChild(upButtonIcon);
        },
        CreateDownButton: function() {
            downButton = Utils.ButtonSettingsControl(downButton, game.world.centerX - Math.round(game.width / 2.21), game.world.centerY + Math.round(game.height / 3.95), 'inactive_button_base', this.DownButtonPressed, null, null, this.DownButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            downButton.angle = 90;
            downButton.inputEnabled = false;
            downButtonIcon = Utils.SpriteSettingsControl(downButtonIcon, 0, 8, 'inactive_button_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
            downButton.addChild(downButtonIcon);
        },

        EnableUpDownButton: function() {
            if (ticketGroup.length > 1) {
                upButton.inputEnabled = true;
                downButton.inputEnabled = true;
                upButton.loadTexture('active_button_base');
                upButtonIcon.loadTexture('active_button_icon');
                downButton.loadTexture('active_button_base');
                downButtonIcon.loadTexture('active_button_icon');
            } else {
                upButton.inputEnabled = false;
                downButton.inputEnabled = false;
                upButton.loadTexture('inactive_button_base');
                upButtonIcon.loadTexture('inactive_button_icon');
                downButton.loadTexture('inactive_button_base');
                downButtonIcon.loadTexture('inactive_button_icon');
            }
        },

        CreateMenuPanel: function() {
            menuButtonToggleCounter = false;

            gameplayMenuPanel = Utils.SpriteSettingsControl(gameplayMenuPanel, game.world.centerX + Math.round(game.width / 2.92), game.world.centerY - Math.round(game.height / 2.232), 'menu_panel', "true", "true", 0.5, 0, 1, 1, "false");
            gameplayMenuPanel.angle = 90;

            gameplayMenuButton = Utils.ButtonSettingsControl(gameplayMenuButton, game.world.centerX + Math.round(game.width / 3.93), game.world.centerY - Math.round(game.height / 2.22), 'menu_button', this.GameplayMenuButtonPressed, null, null, this.GameplayMenuButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            gameplayMenuButton.angle = 90;

            gameplayArrowButton = Utils.ButtonSettingsControl(gameplayArrowButton, game.world.centerX + Math.round(game.width / 3.93), game.world.centerY + Math.round(game.height / 2.22), 'left_arrow_button', this.GameplayArrowButtonPressed, null, null, this.GameplayArrowButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            gameplayArrowButton.angle = 90;

            gameplayBackButton = Utils.ButtonSettingsControl(gameplayBackButton, -2, 233, 'gameplay_back', this.GameplayBackButtonPressed, null, null, this.GameplayBackButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            gameplayMenuPanel.addChild(gameplayBackButton);

            gameplayProfileButton = Utils.ButtonSettingsControl(gameplayProfileButton, -2, 378, 'gameplay_profile', this.GameplayProfileButtonPressed, null, null, this.GameplayProfileButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            gameplayMenuPanel.addChild(gameplayProfileButton);

            gameplaySettingsButton = Utils.ButtonSettingsControl(gameplaySettingsButton, -2, 523, 'gameplay_settings', this.GameplaySettingsButtonPressed, null, null, this.GameplaySettingsButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            gameplayMenuPanel.addChild(gameplaySettingsButton);

            gameplayInfoButton = Utils.ButtonSettingsControl(gameplayInfoButton, -2, 668, 'info', this.GameplayInfoButtonPressed, null, null, this.GameplayInfoButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            gameplayMenuPanel.addChild(gameplayInfoButton);

            menuPanelGroup.add(gameplayMenuPanel);
            menuPanelGroup.add(gameplayMenuButton);

            gameplayMenuPanel.alpha = 0;
            gameplayMenuPanel.scale.y = 0;
        },

        ShowMenuPanel: function() {
            game.world.bringToTop(menuPanelGroup);
            game.add.tween(gameplayMenuPanel).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            game.add.tween(gameplayMenuPanel.scale).to({ y: 1 }, 400, Phaser.Easing.Linear.None, true);
            playersNormalArea.inputEnabled = false;
        },

        HideMenuPanel: function() {
            game.add.tween(gameplayMenuPanel).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
            game.add.tween(gameplayMenuPanel.scale).to({ y: 0 }, 300, Phaser.Easing.Linear.None, true);
            playersNormalArea.inputEnabled = true;
        },


        GameplayBackButtonPressed: function() {
            counterMax = 10;
            timeCounter = 0;
            SoundManager.PlayButtonClickTypeOneSound();
        },
        GameplayBackButtonReleased: function() {
            Client.leaveRoom(localStorage.getItem("access_token"));
        },

        GameplayProfileButtonPressed: function() {
            menuButtonToggleCounter = !menuButtonToggleCounter;
            this.HideMenuPanel();
            ProfilePopup.ShowProfilePopup();
            SoundManager.PlayButtonClickTypeOneSound();
        },
        GameplayProfileButtonReleased: function() {},

        GameplaySettingsButtonPressed: function() {
            menuButtonToggleCounter = !menuButtonToggleCounter;
            this.HideMenuPanel();
            SoundOptionPopup.ShowSoundOptionPopup();
            SoundManager.PlayButtonClickTypeOneSound();
        },
        GameplaySettingsButtonReleased: function() {},

        GameplayInfoButtonPressed: function() {
            SoundManager.PlayButtonClickTypeOneSound();
        },
        GameplayInfoButtonReleased: function() {},


        CreateNumberPlate: function() {
            numberPlateImageArray = [];
            numberPlateNumberArray = [];

            numberPlate = Utils.SpriteSettingsControl(numberPlate, game.world.centerX - Math.round(game.width / 8), game.world.centerY + Math.round(game.height / 1.5), 'numbers_plate', "true", "true", 0.5, 0.5, 1, 1, "false");
            numberPlate.angle = 90;

            for (var i = 0; i < 90; i++) {
                var xPos = -95 + (parseInt(i % 6) * 45);
                if (i == 0) {
                    var yPos = -280;
                } else {
                    var yPos = -280 + (parseInt(i / 6) * 40);
                }

                var img = Utils.SpriteSettingsControl(img, xPos, yPos, 'select_number_base', "true", "true", 0.5, 0.5, 1, 1, "false");
                img.name = i;
                img.index = i;
                img.visible = false;

                var numberValue = game.add.text(xPos, yPos + 1, i + 1, { font: '32px Lato-Heavy', fontStyle: 'normal', fill: '#1fbab3', align: 'center' });
                numberValue.anchor.setTo(0.5);

                numberPlate.addChild(img);
                numberPlate.addChild(numberValue);
                numberPlateImageArray.push(img);
                numberPlateNumberArray.push(numberValue);
            }
        },

        ShiftOtherItemWhenNumberPlateShowing: function() {
            game.add.tween(ticketPanelGroup).to({ y: game.world.centerY - Math.round(game.height / 1.715) }, 300, Phaser.Easing.Linear.None, true);
        },
        UnshiftOtherItemWhenNumberPlateShowing: function() {
            game.add.tween(ticketPanelGroup).to({ y: 0 }, 500, Phaser.Easing.Linear.None, true);
        },

        ShiftOtherItemWhenPlayerDetailsShowing: function() {
            game.add.tween(ticketPanelGroup).to({ y: game.world.centerY - Math.round(game.height / 2.14) }, 100, Phaser.Easing.Linear.None, true);
        },
        UnshiftOtherItemWhenPlayerDetailsShowing: function() {
            game.add.tween(ticketPanelGroup).to({ y: 0 }, 100, Phaser.Easing.Linear.None, true);
        },

        ShowNumberPlate: function() {
            game.add.tween(numberPlate).to({ y: game.world.centerY + Math.round(game.height / 2.385) }, 400, Phaser.Easing.Linear.None, true);
        },

        HideNumberPlate: function() {
            game.add.tween(numberPlate).to({ y: game.world.centerY + Math.round(game.height / 1.5) }, 500, Phaser.Easing.Linear.None, true);
        },

        ShowTheSelectedNumberInNumberPlate: function(_randomNumArray) {
            if ((_randomNumArray.length != null || _randomNumArray.length != 0) && numberPlateImageArray != null) {
                for (var i = 0; i < _randomNumArray.length; i++) {
                    if (numberPlateImageArray[_randomNumArray[i] - 1] != -1 && numberPlateNumberArray[_randomNumArray[i] - 1] != -1) {
                        numberPlateImageArray[_randomNumArray[i] - 1].visible = true;
                        numberPlateNumberArray[_randomNumArray[i] - 1].fill = '#082022';
                    }
                }
            } else {}
        },

        CreateNormalPlayers: function() {
            playersNormalGroup = game.add.group();

            playersNormalArea = Utils.ButtonSettingsControl(playersNormalArea, game.world.centerX - Math.round(game.width / 8.3), game.world.centerY - Math.round(game.height / 2.05), 'players_details_row', this.ProfilePicAreaPressed, null, null, this.ProfilePicAreaReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            playersNormalArea.angle = 90;
            var playersSideBase = Utils.SpriteSettingsControl(playersSideBase, 208, -15, 'players_side_base', "true", "true", 0.5, 0.5, 1, 1, "false");
            playersNormalArea.addChild(playersSideBase);

            var totalPlayersHeadingNumberStyle = { font: '35px Lato-Heavy', fill: '#fff', align: 'center' };
            totalNormalPlayersNumber = game.add.text(0, 0, "0" + " PLAYERS", totalPlayersHeadingNumberStyle);
            totalNormalPlayersNumber.anchor.setTo(0.5);
            totalNormalPlayersNumber.angle = 90;
            playersSideBase.addChild(totalNormalPlayersNumber);

            playersNormalGroup.add(playersNormalArea);
            playersNormalGroup.visible = false;
            ticketPanelGroup.add(playersNormalGroup);
            game.world.bringToTop(menuPanelGroup);
        },

        SetValueOfTotalTicketsAndPlayer(_totalNumberOfPlayersData, _totalPlayersTicketData) {
            if (_totalNumberOfPlayersData.length > 1) {
                totalNormalPlayersNumber.setText(_totalNumberOfPlayersData.length + " PLAYERS");
            } else {
                totalNormalPlayersNumber.setText(_totalNumberOfPlayersData.length + " PLAYER");
            }
            if (_totalPlayersTicketData > 1) {
                totalTicketText.setText(_totalPlayersTicketData + " Tickets");
            } else {
                totalTicketText.setText(_totalPlayersTicketData + " Ticket");
            }
        },

        ShowNormalPlayers: function() {
            playersNormalGroup.visible = true;
        },

        HideNormalPlayers: function() {
            playersNormalGroup.visible = false;
        },

        ProfilePicAreaPressed: function() {
            this.HideNormalPlayers();
            this.ShowDetailsPlayers();
            this.ShiftOtherItemWhenPlayerDetailsShowing();
        },
        ProfilePicAreaReleased: function() {},

        CreateDetailsPlayers: function() {
            playerDetailsScrollableGroup = game.add.group();
            playersDetailsGroup = game.add.group();

            var playersDetailsArea = Utils.SpriteSettingsControl(playersDetailsArea, game.world.centerX - Math.round(game.width / 8.1), game.world.centerY - Math.round(game.height / 2.48), 'players_details_row', "true", "true", 0.5, 0.5, 1, 1, "false");
            playersDetailsArea.angle = 90;

            playersDetailsCrossButton = Utils.ButtonSettingsControl(playersDetailsCrossButton, 170, -257, 'cross_icon', this.PlayersDetailsCrossButtonPressed, null, null, this.PlayersDetailsCrossButtonReleased, "true", "true", 0.5, 0.5, 0.9, 0.9, this);
            playersDetailsArea.addChild(playersDetailsCrossButton);

            playersDetailsGroup.add(playersDetailsArea);

            this.CreateScroller(totalNumberOfPlayers);
            this.HideDetailsPlayers();
        },


        PlayersDetailsCrossButtonPressed: function() {
            Utils.ButtonScaleAnimation(playersDetailsCrossButton, playersDetailsCrossButton.scale.x - 0.02, gameplayOverlay);
            this.EnableDisableGameplayPageButtonInput(true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        PlayersDetailsCrossButtonReleased: function() {
            this.HideDetailsPlayers();
            this.ShowNormalPlayers();
            this.UnshiftOtherItemWhenPlayerDetailsShowing();
        },

        CreateScroller: function(_data) {
            var scrollerX = (game.world.centerX - Math.round(game.width / 3));
            var scrollerY = 0;
            var scrollerWidth = Math.round(game.width / 2.16); //500
            var scrollerHeight = Math.round(game.height / 5.81); //350

            playerDetailsScroller = game.add.existing(new ScrollableArea(scrollerX, scrollerY,
                scrollerWidth,
                scrollerHeight));
            playerDetailsScroller.configure({
                horizontalScroll: true,
                verticalScroll: false,
                kineticMovement: false
            });

            this.CreatePlayerDetailsScrollerMask();

        },

        CreatePlayerDetailsScrollerMask: function() {
            var scrollMaskX = (game.world.centerX - Math.round(game.width / 3.09)); //190
            var scrollMaskY = 0;
            var scrollMaskWidth = Math.round(game.width / 2.296); //470
            var scrollMaskHeight = Math.round(game.height / 5.81); //330
            var playerDetailsScrollerMask = game.add.graphics(0, 0);
            // playerDetailsScrollerMask.beginFill(0xFF3300);
            playerDetailsScrollerMask.alpha = 0.5;
            playerDetailsScrollerMask.drawRect(scrollMaskX, scrollMaskY, scrollMaskWidth, scrollMaskHeight);

            this.CreatePlayerDetailsScrollerImageAndApplyMask(playerDetailsScrollerMask);
        },

        CreatePlayerDetailsScrollerImageAndApplyMask: function(_playerDetailsScrollerMask) {
            var scrollImageX = (game.world.centerX - Math.round(game.width / 4));
            var scrollImageY = (game.world.centerY - Math.round(game.height / 2.46));
            var scrollImageWidth = Math.round(game.width / 1.2); //900
            var scrollImageHeight = Math.round(game.height / 5.33); //360

            var playerDetailsScrollerImage = game.add.image(scrollImageX, scrollImageY, "one_pixel");
            playerDetailsScrollerImage.tint = "0x000000";
            playerDetailsScrollerImage.alpha = 0.001;
            playerDetailsScrollerImage.anchor.setTo(0.5, 0.5);
            playerDetailsScrollerImage.scale.setTo(-scrollImageWidth, scrollImageHeight);
            playerDetailsScrollerImage.mask = _playerDetailsScrollerMask;
            playerDetailsScrollableGroup.mask = _playerDetailsScrollerMask;
            playerDetailsScroller.addChild(playerDetailsScrollerImage);
            playerDetailsScroller.addChild(playerDetailsScrollableGroup);
        },

        ShowDetailsPlayers: function() {
            playersDetailsGroup.visible = true;
            playerDetailsScroller.visible = true;

            if (totalNumberOfPlayers.length > 3) {
                playerDetailsScroller.start();
            } else {}
            if (totalNumberOfPlayers.length > 4) {
                playerDetailsScrollableGroup.position.x += ((totalNumberOfPlayers.length - 3) * (game.world.centerX - game.width / 2.78));
            } else {}
            game.world.bringToTop(playersDetailsGroup);
            game.world.bringToTop(playerDetailsScroller);

        },
        HideDetailsPlayers: function() {
            playersDetailsGroup.visible = false;

            playersDetailsGroup.visible = false;
            if (totalNumberOfPlayers.length > 3) {
                playerDetailsScroller.stop();
            } else {}
            playerDetailsScroller.visible = false;
            game.world.bringToTop(playersNormalGroup);
            game.world.bringToTop(ticketPanelGroup);
            game.world.bringToTop(menuPanelGroup);
        },

        GameplayMenuButtonPressed: function() {
            Utils.ButtonScaleAnimation(gameplayMenuButton, gameplayMenuButton.scale.x - 0.02, gameplayOverlay);
            this.EnableDisableGameplayPageButtonInput(true);
            menuButtonToggleCounter = !menuButtonToggleCounter;
            SoundManager.PlayButtonClickTypeOneSound();
        },
        GameplayMenuButtonReleased: function() {
            setTimeout(() => {
                if (menuButtonToggleCounter) {
                    this.ShowMenuPanel();
                } else {
                    this.HideMenuPanel();
                }
            }, 100);
        },

        GameplayArrowButtonPressed: function() {
            Utils.ButtonScaleAnimation(gameplayArrowButton, gameplayArrowButton.scale.x - 0.02, gameplayOverlay);
            this.EnableDisableGameplayPageButtonInput(true);
            arrowToggleCounter = !arrowToggleCounter;
            SoundManager.PlayButtonClickTypeOneSound();
        },
        GameplayArrowButtonReleased: function() {
            setTimeout(() => {
                this.ToggleArrowButton();
            }, 100);
        },

        ToggleArrowButton: function() {
            if (arrowToggleCounter) {
                setTimeout(() => {
                    gameplayArrowButton.loadTexture('right_arrow_button');
                }, 100);
                this.ShowNumberPlate();
                this.ShiftOtherItemWhenNumberPlateShowing();
            } else {
                setTimeout(() => {
                    gameplayArrowButton.loadTexture('left_arrow_button');
                }, 100);
                this.HideNumberPlate();
                this.UnshiftOtherItemWhenNumberPlateShowing();
            }
        },

        UpButtonPressed: function() {
            game.add.tween(ticketGroup).to({ x: game.world.centerX + Math.round(game.width / 3.2) }, 700, Phaser.Easing.Linear.None, true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        UpButtonReleased: function() {},

        DownButtonPressed: function() {
            game.add.tween(ticketGroup).to({ x: 0 }, 700, Phaser.Easing.Linear.None, true);
            SoundManager.PlayButtonClickTypeOneSound();
        },
        DownButtonReleased: function() {},


        EnableDisableGameplayPageButtonInput: function(status) {
            gameplayOverlay.visible = status;
        },


    } //End of Gameplay.prototype