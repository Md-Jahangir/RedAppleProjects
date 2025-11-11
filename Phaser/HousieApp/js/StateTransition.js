var StateTransition = {
    TransitToLogin: function() {
        gamePage = "Login";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('Login');
        });
    },

    TransitToSignUp: function() {
        gamePage = "SignUp";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('SignUp');
        });
    },

    TransitToForgotPassword: function() {
        gamePage = "ForgotPassword";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('ForgotPassword');
        });
    },

    TransitToOtp: function() {
        gamePage = "Otp";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('Otp');
        });
    },

    TransitToResetPassword: function() {
        gamePage = "ResetPassword";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('ResetPassword');
        });
    },

    TransitToHowToPlay: function() {
        gamePage = "HowToPlay";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('HowToPlay');
        });
    },

    TransitToWalletPage: function() {
        gamePage = "WalletPage";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('WalletPage');
        });
    },

    TransitToGameHistory: function() {
        gamePage = "GameHistory";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('GameHistory');
        });
    },
    TransitToLeaderBoard: function() {
        gamePage = "LeaderBoard";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('LeaderBoard');
        });
    },
    TransitToProfilePage: function() {
        gamePage = "ProfilePage";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('ProfilePage');
        });
    },
    TransitToEditProfile: function() {
        gamePage = "EditProfile";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('EditProfile');
        });
    },
    TransitToSettingsPage: function() {
        gamePage = "SettingsPage";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('SettingsPage');
        });
    },

    TransitToMenu: function() {
        gamePage = "Menu";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 200, 0, function() {
            game.state.start('Menu');
        });
    },

    TransitToGameplay: function() {
        gamePage = "Gameplay";
        localStorage.setItem("page_name", gamePage);
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 500, 0, function() {
            game.state.start('Gameplay');
        });
    },
    TransitToClaimPopup: function()
    {
        gamePage = "ClaimPopup";
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 500, 0, function() {
            game.state.start('Claim');
        });
    },

}