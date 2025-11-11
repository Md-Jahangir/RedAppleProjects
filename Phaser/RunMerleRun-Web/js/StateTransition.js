var StateTransition = {
    TransitToMenu: function () {
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function () {
            game.state.start('Menu');
        });
    },
    TransitToStory: function () {
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function () {
            game.state.start('Story');
        });
    },

    TransitToGamePlay: function () {
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function () {
            game.state.start('Gameplay');
        });
    },

}