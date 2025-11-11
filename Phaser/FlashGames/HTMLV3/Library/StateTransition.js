var StateTransition = {
    TransitToTitleScreen: function() {
        //Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
        gamePage = "TitleScreen";
        game.state.start('TitleScreen');
        //});
    },
    TransitToNewsScreen: function() {
        //Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
        // gamePage = "NewsArticleScreen";
        game.state.start('NewsIndexScreen');
        //});
    },
    TransitToNewsArticleScreen: function() {
        gamePage = "NewsArticleScreen";
        // Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
        game.state.start('NewsArticleScreen');
        // });
    },
    TransitToPurchaseScreen: function() {
        // Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
        game.state.start('PurchaseGameScreen');
        // });
    },
    TransitToSettingsScreen: function() {
        // Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
        game.state.start('SettingScreen');
        // });
    },
    TransitToPrivacyPolicy: function() {
        // Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
        game.state.start('PrivacyScreen');
        // });
    },
    TransitToPickaPackScreen: function() {
        gamePage = "PickAPackScreen";
        game.state.start('PickAPackScreen');
    },
    TransitToPickAQuestionScreen: function() {
        gamePage = "AmountOfQuestionScreen";
        game.state.start('AmountOfQuestionScreen');
    },
    TransitToPlayerSelectScreen: function() {
        gamePage = "PlayerSelectScreen";
        game.state.start('PlayerSelectScreen');
    },
    TransitToScnarioGeneratingScreen: function() {
        game.state.start('ScenarioGeneratingScreen');
    },
    TransitToScenarioScreen: function() {
        gamePage = "ScenarioScreen";
        game.state.start('ScenarioScreen');
    },
    TransitToScoreScreen: function() {
        gamePage = "CurrentScoreScreen";
        game.state.start('CurrentScoreScreen');
    },
    TransitToFinalScoreScreen: function() {
        gamePage = "FinalScreen";
        game.state.start('FinalScreen');
    }
}