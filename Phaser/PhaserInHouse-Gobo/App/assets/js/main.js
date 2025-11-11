var game=new Phaser.Game(720,1280,Phaser.AUTO,'game'),main=function(){};
main.prototype={
    init:function()
    {
        // Utils.ScaleManager();
       
    },
    preload:function()
    {
        console.log("the function is preload and script is main");
        //......script.................................
        game.load.script('menu','App/assets/js/menu.js');
        game.load.script('splash','App/assets/js/splash.js');
        //....Menu page..................................
        game.load.image('fireball','App/assets/images/menu/fireball.png');
        game.load.image('hitball','App/assets/images/menu/hitball.png');
        game.load.image('game_name','App/assets/images/menu/game_name.png');
        game.load.image('home_indicator','App/assets/images/menu/home_indicator.png');
        game.load.image('menu_page_title','App/assets/images/menu/menu_page_title.png');
        
       //.....load splash assets.......
       game.load.image('splash_bg','App/assets/images/splash_page/splash_bg.png');
       game.load.image('splash_Play','App/assets/images/splash_page/splash_Play.png');
       game.load.image('splash_Title','App/assets/images/splash_page/splash_Title.png');
       game.load.image('one','App/assets/images/one_pixel_white.png');
    },
    create:function()
    {
        game.state.add('splash',splash);
        game.state.start('splash');
    }
};
game.state.add('main',main);
game.state.start('main');