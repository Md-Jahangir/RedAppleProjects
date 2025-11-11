var CreditPopup = {
    CreateCreditPopup: function() {
        creditPopupGroup = game.add.group();

        //ADD CREDIT POPUP BG
        creditBg = Utils.ButtonSettingsControl(creditBg, 360.0, 640.0, 'creditBg', this.CreditBgOnPress, null, null, null, "true", "true", 0.5, 0.5, 0.6, 0.6, this);

        //ADD GAME CONTENT
        creditGameContent = Utils.SpriteSettingsControl(creditGameContent, 360.0, 750.0, 'creditContent', "true", "true", 0.5, 0.5, 0.62, 0.55);

        //ADD GAME TITLE
        creditGameTitle = Utils.SpriteSettingsControl(creditGameTitle, 360.0, 150.0, 'titleBg', "true", "true", 0.5, 0.5, 0.4, 0.4);

        //ADD CREDIT POPUP BACK BUTTON
        creditBackButton = Utils.ButtonSettingsControl(creditBackButton, 60.0, 90.0, 'backBttn', this.CreditBackButtonOnPress, null, null, this.CreditBackButtonOnRelease, "true", "true", 0.5, 0.5, 0.5, 0.5, this);

        //ADD CREDIT POPUP REDAPPLE LOGO
        creditRedappleLogo = Utils.ButtonSettingsControl(creditRedappleLogo, 150.0, 490.0, 'redAppleLogo', this.CreditRedappleLogoOnPress, null, null, this.CreditRedappleLogoOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        //ADD CREDIT POPUP KINSANE LOGO
        creditKinsaneLogo = Utils.ButtonSettingsControl(creditKinsaneLogo, 535.0, 490.0, 'kinsaneLogo', this.CreditKinsaneLogoOnPress, null, null, this.CreditKinsaneLogoOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        //ADD CREDIT POPUP TERM OF USE
        creditTermOfUse = Utils.ButtonSettingsControl(creditTermOfUse, 150.0, 1057.0, 'termAndUse', this.CreditTermOfUseOnPress, null, null, this.CreditTermOfUseOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        //ADD CREDIT POPUP PRIVACY POLICY
        creditPrivacyPolicy = Utils.ButtonSettingsControl(creditPrivacyPolicy, 560.0, 1057.0, 'privacyPolicy', this.CreditPrivacyPolicyOnPress, null, null, this.CreditPrivacyPolicyOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        creditPopupGroup.add(creditBg);
        creditPopupGroup.add(creditGameContent);
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
        var tween = game.add.tween(creditPopupGroup).to({ alpha: 1 }, 200, Phaser.Easing.Linear.Out, true);
        tween.onComplete.add(function() {
            ParentPopup.HideParentPopup();
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
        // buttonClickSFX.play();
        game.add.tween(creditBackButton.scale).to({ x: 0.45, y: 0.45 }, 100, Phaser.Easing.Linear.Out, true);
    },
    CreditBackButtonOnRelease: function() {
        game.add.tween(creditBackButton.scale).to({ x: 0.5, y: 0.5 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(function() {
            CreditPopup.HideCreditPopup();
        }, 100);
    },


    CreditRedappleLogoOnPress: function() {
        // buttonClickSFX.play();
        game.add.tween(creditRedappleLogo.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    CreditRedappleLogoOnRelease: function() {
        game.add.tween(creditRedappleLogo.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(function() {
            window.open('https://redappletech.com', "_blank");
        }, 100);
    },

    CreditKinsaneLogoOnPress: function() {
        // buttonClickSFX.play();
        game.add.tween(creditKinsaneLogo.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    CreditKinsaneLogoOnRelease: function() {
        game.add.tween(creditKinsaneLogo.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(function() {
            window.open('https://kinsane.com', "_blank");
        }, 100);
    },

    CreditTermOfUseOnPress: function() {
        // buttonClickSFX.play();
        game.add.tween(creditTermOfUse.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    CreditTermOfUseOnRelease: function() {
        game.add.tween(creditTermOfUse.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(function() {
            window.open('https://kinsane.com/games/terms-of-use', "_blank");
        }, 100);
    },

    CreditPrivacyPolicyOnPress: function() {
        // buttonClickSFX.play();
        game.add.tween(creditPrivacyPolicy.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },
    CreditPrivacyPolicyOnRelease: function() {
        game.add.tween(creditPrivacyPolicy.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(function() {
            window.open('https://kinsane.com/privacy-policy', "_blank");
        }, 100);
    },
}