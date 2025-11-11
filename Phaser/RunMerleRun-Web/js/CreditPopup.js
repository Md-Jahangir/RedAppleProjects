var creditPopupGroup;
var creditBg;
var creditGameTitle;
var creditBackButton;
var creditRedappleLogo;
var creditKinsaneLogo;
var creditTermOfUse;
var creditPrivacyPolicy;

var CreditPopup = {
    CreateCreditPopup: function() {
        creditPopupGroup = game.add.group();

        //ADD CREDIT POPUP BG
        creditBg = Utils.ButtonSettingsControl(creditBg, 640.0, 360.0, 'creditBg', this.CreditBgOnPress, null, null, null, "true", "true", 0.5, 0.5, 1, 1, this);

        //ADD GAME TITLE
        creditGameTitle = Utils.SpriteSettingsControl(creditGameTitle, 660.0, 55.0, 'gameTitle', "true", "true", 0.5, 0.5, 0.35, 0.35);

        //ADD CREDIT POPUP BACK BUTTON
        creditBackButton = Utils.ButtonSettingsControl(creditBackButton, 200.0, 60.0, 'backButton', this.CreditBackButtonOnPress, null, null, this.CreditBackButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        //ADD CREDIT POPUP REDAPPLE LOGO
        creditRedappleLogo = Utils.ButtonSettingsControl(creditRedappleLogo, 210.0, 290.0, 'redAppleLogo', this.CreditRedappleLogoOnPress, null, null, this.CreditRedappleLogoOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        //ADD CREDIT POPUP KINSANE LOGO
        creditKinsaneLogo = Utils.ButtonSettingsControl(creditKinsaneLogo, 1020.0, 275.0, 'kintoonsLogo', this.CreditKinsaneLogoOnPress, null, null, this.CreditKinsaneLogoOnRelease, "true", "true", 0.5, 0.5, 0.7, 0.7, this);

        //ADD CREDIT POPUP TERM OF USE
        creditTermOfUse = Utils.ButtonSettingsControl(creditTermOfUse, 217.0, 585.0, 'termAndUse', this.CreditTermOfUseOnPress, null, null, this.CreditTermOfUseOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        //ADD CREDIT POPUP PRIVACY POLICY
        creditPrivacyPolicy = Utils.ButtonSettingsControl(creditPrivacyPolicy, 1051.0, 590.0, 'privacyPolicy', this.CreditPrivacyPolicyOnPress, null, null, this.CreditPrivacyPolicyOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        creditPopupGroup.add(creditBg);
        creditPopupGroup.add(creditGameTitle);
        creditPopupGroup.add(creditBackButton);
        creditPopupGroup.add(creditRedappleLogo);
        creditPopupGroup.add(creditKinsaneLogo);
        creditPopupGroup.add(creditTermOfUse);
        creditPopupGroup.add(creditPrivacyPolicy);

        creditPopupGroup.visible = false;
        creditPopupGroup.alpha = 0;
    },

    ShowCreditPopup: function() {
        game.world.bringToTop(creditPopupGroup);
        creditPopupGroup.visible = true;
        var tween = game.add.tween(creditPopupGroup).to({ alpha: 1 }, 300, Phaser.Easing.Linear.Out, true);
        tween.onComplete.add(function() {
            ParentsPopup.HideParentPopup();
        });
    },

    HideCreditPopup: function() {
        var tween = game.add.tween(creditPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        tween.onComplete.add(function() {
            creditPopupGroup.visible = false;
        });
    },

    CreditBgOnPress: function() {

    },

    CreditBackButtonOnPress: function() {
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(creditBackButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    CreditBackButtonOnRelease: function() {
        game.add.tween(creditBackButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);

        setTimeout(function() {
            CreditPopup.HideCreditPopup();
        }, 100);
    },


    CreditRedappleLogoOnPress: function() {
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(creditRedappleLogo.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    CreditRedappleLogoOnRelease: function() {
        game.add.tween(creditRedappleLogo.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(function() {
            window.open('https://redappletech.com', "_blank");
        }, 100);
    },

    CreditKinsaneLogoOnPress: function() {
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(creditKinsaneLogo.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    CreditKinsaneLogoOnRelease: function() {
        game.add.tween(creditKinsaneLogo.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(function() {
            window.open('https://kinsane.com', "_blank");
        }, 100);
    },

    CreditTermOfUseOnPress: function() {
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(creditTermOfUse.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    CreditTermOfUseOnRelease: function() {
        game.add.tween(creditTermOfUse.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(function() {
            window.open('https://kinsane.com/games/terms-of-use', "_blank");
        }, 100);
    },

    CreditPrivacyPolicyOnPress: function() {
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(creditPrivacyPolicy.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    CreditPrivacyPolicyOnRelease: function() {
        game.add.tween(creditPrivacyPolicy.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(function() {
            window.open('https://kinsane.com/privacy-policy', "_blank");
        }, 100);
    },




}