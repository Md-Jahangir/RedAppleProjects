var StateTransition = {
    TransitToMenu: function(){
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('Menu');
        });
    },
    TransitToClassic: function(){
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('Classic');
        });
    },
    TransitToMuflis: function(){
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('Muflis');
        });
    },
    TransitToJoker: function(){
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('Joker');
        });
    },
    TransitToPrivateTable: function(){
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('PrivateTable');
        });
    }
}