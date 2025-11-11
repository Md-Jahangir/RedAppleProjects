var StateTransition = {
    TransitToMenu: function(){
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('Menu');
        });
    },
    TransitToGamePlay: function(){
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('GamePlay');
            
         });
    },
    TransitToSplash: function(){
            Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
                baseUrl=window.location.href;
                var lastIndex=baseUrl.indexOf("GOBO");
                lastIndex+=4;
                baseUrl=baseUrl.substring(0,lastIndex);
                // window.open(baseUrl,'_self');
                // window.open("file:///android_asset/GOBO/index.html",'_self');
                window.open("http://game.redappletech.info/GOBO/index.html",'_self');
                
             });
    },
    // TransitToGamePlayDelay: function(){
    //     Phaser.Plugin.Fade.prototype.fadeOut(0x000, 3000, 0, function() {
    //         game.state.start('GamePlay');
            
    //     });
    // },
   /*  TransitToSetting: function(){
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('Settings');
        }); 
    },
    TranitToInfo: function(){
        Phaser.Plugin.Fade.prototype.fadeOut(0x000, 750, 0, function() {
            game.state.start('Info');
        }); 
    }, */
}