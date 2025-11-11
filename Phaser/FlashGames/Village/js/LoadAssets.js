var LoadAssets = {
    LoadAllAssets: function() {

        //LastImageSequence
        // for (var i = 0; i < 10; i++) {
        //     game.load.image('lastImageSequece' + (i+1), 'assets/LastImageSequence/' + (i+1) + '.png');
        // }
        game.load.spritesheet('lastImageSequece', 'assets/lastImageSequence/lastImageSequence.png', 539,379,25);
        //Load All Collision Target
        game.load.image('birdArea', 'assets/collisonTarget/birdArea.png');
        game.load.image('sheepArea', 'assets/collisonTarget/sheepArea.png');
        game.load.image('fishArea1', 'assets/collisonTarget/fishArea1.png');
        game.load.image('fishArea2', 'assets/collisonTarget/fishArea2.png');
        game.load.image('pigArea', 'assets/collisonTarget/pigArea.png');
        game.load.image('sideBar', 'assets/collisonTarget/sideBar.png');
        
        //Load All Input Assets Load
        game.load.image('bird1', 'assets/inputAsset/bird1.png'); 
        game.load.image('bird2', 'assets/inputAsset/bird2.png'); 
        game.load.image('duck1', 'assets/inputAsset/duck1.png'); 
        game.load.image('duck2', 'assets/inputAsset/duck2.png'); 
        game.load.image('fish1', 'assets/inputAsset/fish1.png'); 
        game.load.image('fish2', 'assets/inputAsset/fish2.png'); 
        game.load.image('pig1', 'assets/inputAsset/pig1.png'); 
        game.load.image('pig2', 'assets/inputAsset/pig2.png'); 
        game.load.image('sheep1', 'assets/inputAsset/sheep1.png'); 
        game.load.image('sheep2', 'assets/inputAsset/sheep2.png'); 
        game.load.image('closebttn', 'assets/inputAsset/closeIcon.png'); 
         
        //Background Image
        game.load.image('backgroundImage','assets/background.png');
        game.load.image('whitePixel','assets/one_pixel_white.png');

        game.load.audio('endSound', 'assets/sounds/end.mp3');
        game.load.audio('gamePlaySound', 'assets/sounds/try.mp3');
    }
}