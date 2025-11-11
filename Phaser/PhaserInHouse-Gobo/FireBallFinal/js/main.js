var Main = function () {};
var text;
Main.prototype = {
    init: function(){
        // Utils.ScaleManager();
    },
    preload: function () {
        Debug.log(" Main preload...",'main_preload');
        //Game Play...........................................
       game.load.image('cannon_base','assets/cannon_base.png');
       game.load.image('cannon_body','assets/cannon_body.png');
       game.load.image('cannon_wheel','assets/cannon_wheel.png');
       game.load.image('cloud','assets/cloud.png');
       game.load.image('cloud_01','assets/cloud_01.png');
       game.load.image('cloud_02','assets/cloud_02.png');
       game.load.image('cloud_03','assets/cloud_03.png');
       game.load.image('obstacle','assets/obstacle.png');
       game.load.image('platform_base','assets/platform_base.png');
       game.load.image('score_line','assets/score_line.png');
       game.load.image('ball','assets/ball.png');
       game.load.image('block_01','assets/block_01.png');
       game.load.image('block_02','assets/block_02.png');
       game.load.image('block_03','assets/block_03.png');
       game.load.image('block_04','assets/block_04.png');
       game.load.image('block_05','assets/block_05.png');
       game.load.image('white','assets/one_pixel_white.png');
       game.load.image('Layer1','assets/Layer1.png');
       game.load.image('Layer2','assets/Layer2.png');
       game.load.image('overlay','assets/overlay.png');
  
       //...load game over assets..........
       game.load.image('GameOverBackground','assets/game_over/GameOverBackground.png');
       game.load.image('GameOverText','assets/game_over/GameOverText.png');
       //......................................................
       for(var i = 0;i<=16;i++)
       {
            game.load.image('background_'+i,'assets/Background/background_'+i+'.jpg');
       }
       //.............................................
     
       game.load.image('pause_buttom','assets/pause_buttom.png');
       game.load.image('back_buttom','assets/back_buttom.png');
       game.load.image('play_buttom','assets/play_buttom.png');
       //................Load Bitmap font...
       game.load.bitmapFont('riffic_free_bold','assets/font/riffic_free_bold.png','assets/font/riffic_free_bold.fnt');
        //..............hand sprite sheet..............................
        game.load.spritesheet('hand','assets/hand.png',396/2,256,2);






 },
    create:function ()
    { 
        Debug.log(" Create Fucntion...",'Main_Create');
        game.state.add('GamePlay', GamePlay);
        game.state.start('GamePlay');
    }
}
