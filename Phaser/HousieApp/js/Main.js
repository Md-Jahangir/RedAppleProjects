// var gamePage = "";
var previousPage = "";

var Main = function() {};
Main.prototype = {
    init: function() {
        Utils.ScaleManager();
    },
    preload: function() {
        Phaser.Device.whenReady(function() {
            game.plugins.add(PhaserInput.Plugin);
        });
        //Running game in background------------------------------
        game.stage.disableVisibilityChange = true;
        game.time.advancedTiming = true;

        game.load.script('SplashPage', 'js/SplashPage.js');
        game.load.script('Login', 'js/Login.js');
        game.load.script('ForgotPassword', 'js/ForgotPassword.js');
        game.load.script('SignUp', 'js/SignUp.js');
        game.load.script('Otp', 'js/Otp.js');
        game.load.script('ResetPassword', 'js/ResetPassword.js');
        game.load.script('HowToPlay', 'js/HowToPlay.js');
        game.load.script('EditProfile', 'js/EditProfile.js');
        game.load.script('SettingsPage', 'js/SettingsPage.js');
        game.load.script('ProfilePage', 'js/ProfilePage.js');
        game.load.script('WalletPage', 'js/WalletPage.js');
        game.load.script('LeaderBoard', 'js/LeaderBoard.js');
        game.load.script('Menu', 'js/Menu.js');
        game.load.script('GameHistory', 'js/GameHistory.js');
        game.load.script('Gameplay', 'js/Gameplay.js');
        game.load.script('Claim','js/Claim.js');

        var text = game.add.text(game.world.centerX, game.world.centerY, "Loading...", { font: '60px Lato-Regular', fill: '#ffffff' });
        text.anchor.setTo(0.5);

        LoadAssets.LoadAllAssets();
    },

    create: function() {
        game.state.add('SplashPage', SplashPage);
        game.state.add('Login', Login);
        game.state.add('SignUp', SignUp);
        game.state.add('ForgotPassword', ForgotPassword);
        game.state.add('Otp', Otp);
        game.state.add('ResetPassword', ResetPassword);
        game.state.add('HowToPlay', HowToPlay);
        game.state.add('EditProfile', EditProfile);
        game.state.add('SettingsPage', SettingsPage);
        game.state.add('ProfilePage', ProfilePage);
        game.state.add('WalletPage', WalletPage);
        game.state.add('LeaderBoard', LeaderBoard);
        game.state.add('Menu', Menu);
        game.state.add('GameHistory', GameHistory);
        game.state.add('Gameplay', Gameplay);
        game.state.add('Claim',Claim);
        game.state.start('SplashPage');

        SoundManager.CreateSound();

    },

};