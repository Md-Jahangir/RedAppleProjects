var walletInfoBox;
var enterAmountInputField;
var addCashButton;
var havePromoCodeText;
var walletPageBackButton;
var walletPageOverlay;

var WalletPage = function() {};
WalletPage.prototype = {
        init: function() {
            Utils.ScaleManager();
        },
        preload: function() {
            game.stage.disableVisibilityChange = true;
            game.time.advancedTiming = true;
        },
        create: function() {
            this.CreateWalletPage();
        },

        update: function() {
            enterAmountInputField.update();
        },

        CreateWalletPage: function() {
            var walletPageBg = Utils.SpriteSettingsControl(walletPageBg, game.world.centerX, game.world.centerY, 'menu_bg', "true", "true", 0.5, 0.5, 1, 1, "false");
            var topArea = Utils.SpriteSettingsControl(topArea, game.world.centerX, game.world.centerY - Math.round(game.height / 2.041), 'top_area', "true", "true", 0.5, 0.5, 1, 1, "false");

            var walletHeadingTextStyle = { font: '54px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center' };
            var walletHeading = game.add.text(game.world.centerX, game.world.centerY - Math.round(this.game.height / 2.4), "WALLET", walletHeadingTextStyle);
            walletHeading.anchor.setTo(0.5);
            walletHeading.setShadow(0, 2, '#e07e00', 0);

            walletInfoBox = Utils.SpriteSettingsControl(walletInfoBox, game.world.centerX, game.world.centerY, 'wallet_info_box', "true", "true", 0.5, 0.5, 1, 1, "false");

            var walletCashHeadingTextStyle = { font: '42px Lato-Heavy', fontStyle: 'normal', fill: '#fff001', align: 'center' };
            var walletCashHeading = game.add.text(0, -600, "WALLET CASH - " + "₹  " + "00.00", walletCashHeadingTextStyle);
            walletCashHeading.anchor.set(0.5, 0.5);
            walletCashHeading.setShadow(0, 2, '#e07e00', 0);
            walletInfoBox.addChild(walletCashHeading);

            var walletPageWalletIcon = Utils.SpriteSettingsControl(walletPageWalletIcon, 190, -370, 'wallet_Page_wallet_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
            walletInfoBox.addChild(walletPageWalletIcon);

            enterAmountInputField = game.add.inputField(-230, -185, {
                font: '50px Lato-Regular',
                fill: '#5aefe2',
                fillAlpha: 0,
                fontWeight: 'normal',
                textAlign: 'center',
                width: 450,
                padding: 8,
                height: 60,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 6,
                placeHolder: 'Enter amount',
                zoom: false,
                cursorColor: '#5aefe2',
                min: 0,
                type: PhaserInput.InputType.number
            });
            walletInfoBox.addChild(enterAmountInputField);

            this.CreateStaticAmountButton();

            var minMaxAmountTextStyle = { font: '42px Lato-Regular', fill: '#7ecbcf', align: 'center' };
            minMaxAmountText = game.add.text(0, -70, "(Min Rs. 50 - Max Rs. 1000)", minMaxAmountTextStyle);
            minMaxAmountText.anchor.setTo(0.5);
            walletInfoBox.addChild(minMaxAmountText);

            addCashButton = Utils.ButtonSettingsControl(addCashButton, 0, 330, 'join_button_base', this.AddCashButtonPressed, null, null, this.AddCashButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
            walletInfoBox.addChild(addCashButton);
            var addCashTextStyle = { font: '45px Lato-Heavy', fill: '#071f26', align: 'center' };
            var addCashText = game.add.text(0, -7, "ADD CASH", addCashTextStyle);
            addCashText.anchor.setTo(0.5);
            addCashButton.addChild(addCashText);
            var addCashButtonIcon = Utils.SpriteSettingsControl(addCashButtonIcon, 280, -65, 'plus_icon', "true", "true", 0.5, 0.5, 1, 1, "false");
            addCashButton.addChild(addCashButtonIcon);

            var walletOrTextStyle = { font: '42px Lato-Heavy', fontStyle: 'normal', fill: '#fad734', align: 'center' };
            walletOrText = game.add.text(0, 480, "OR", walletOrTextStyle);
            walletOrText.anchor.setTo(0.5);
            walletInfoBox.addChild(walletOrText);

            var havePromoCodeTextStyle = { font: '39px Lato-Regular', fill: '#fad734', align: 'center' };
            havePromoCodeText = game.add.text(0, 570, "Have you promo code ?", havePromoCodeTextStyle);
            havePromoCodeText.anchor.setTo(0.5);
            havePromoCodeText.inputEnabled = true;
            havePromoCodeText.events.onInputDown.add(this.HavePromoCodeTextPressed, this);
            havePromoCodeText.events.onInputUp.add(this.HavePromoCodeTextReleased, this);
            walletInfoBox.addChild(havePromoCodeText);


            walletPageBackButton = Utils.ButtonSettingsControl(walletPageBackButton, game.world.centerX, game.world.centerY + Math.round(game.height / 2.16), 'back_button', this.WalletPageBackButtonPressed, null, null, this.WalletPageBackButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);

            //Create overlay For off the input of all button when click on button
            walletPageOverlay = Utils.ButtonSettingsControl(walletPageOverlay, game.world.centerX, game.world.centerY, 'transparentImage', this.walletPageOverlayPressed, null, null, null, "true", "true", 0.5, 0.5, 2000, 2000, this);
            walletPageOverlay.alpha = 0.001;
            walletPageOverlay.visible = false;
        },

        CreateStaticAmountButton: function() {
            var staticAmountArray = ["100", "300", "500", "1000"];
            for (var i = 0; i < staticAmountArray.length; i++) {
                var xPos = -320 + (i * 212);
                var yPos = 80;

                var staticAmountImage = Utils.ButtonSettingsControl(staticAmountImage, xPos, yPos, 'cash_base', this.StaticAmountButtonPressed, null, null, this.StaticAmountButtonReleased, "true", "true", 0.5, 0.5, 1, 1, this);
                staticAmountImage.name = staticAmountArray[i];
                walletInfoBox.addChild(staticAmountImage);
                var staticAmountStyle = { font: '31px Lato-Heavy', fill: '#000', align: 'center', wordWrap: false, wordWrapWidth: 500 };
                var staticAmount = game.add.text(-30, 7, "₹ " + staticAmountArray[i], staticAmountStyle);
                staticAmount.anchor.setTo(0.5);
                staticAmountImage.addChild(staticAmount);
            }
        },

        StaticAmountButtonPressed: function(_this) {
            // console.log("StaticAmountButtonPressed" + _this.name);
        },
        StaticAmountButtonReleased: function() {},

        AddCashButtonPressed: function() {
            // console.log("AddCashButtonPressed");
            Utils.ButtonScaleAnimation(addCashButton, addCashButton.scale.x - 0.02, walletPageOverlay);
            this.EnableDisableWalletPageButtonInput(true);
        },
        AddCashButtonReleased: function() {},

        HavePromoCodeTextPressed: function() {
            // console.log("HavePromoCodeTextPressed");
            Utils.ButtonScaleAnimation(havePromoCodeText, havePromoCodeText.scale.x - 0.02, walletPageOverlay);
            this.EnableDisableWalletPageButtonInput(true);
        },
        HavePromoCodeTextReleased: function() {},

        WalletPageBackButtonPressed: function() {
            // console.log("walletPageBackButtonPressed");
            Utils.ButtonScaleAnimation(walletPageBackButton, walletPageBackButton.scale.x - 0.02, walletPageOverlay);
            this.EnableDisableWalletPageButtonInput(true);
        },
        WalletPageBackButtonReleased: function() {
            StateTransition.TransitToMenu();
        },

        EnableDisableWalletPageButtonInput: function(status) {
            walletPageOverlay.visible = status;
        },

    } //End of WalletPage.prototype