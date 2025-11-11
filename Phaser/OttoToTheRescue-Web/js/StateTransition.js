var StateTransition = {
    TransitToMenu: function() {
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('Menu');
        });
    },
    TransitToLevelSelection: function() {
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('LevelSelection');
        });
    },
    TransitToGamePlay: function() {
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('Gameplay');
        });
    },
    TransitToInstruction: function() {
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('Instruction');
        });
    },
    TransitToLeaderBoard: function() {
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('LeaderBoardPopup');
        });
    },
}