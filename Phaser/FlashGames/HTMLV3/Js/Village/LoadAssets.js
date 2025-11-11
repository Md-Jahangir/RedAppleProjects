var localImageURl = "Images/Village/"
var LoadAssets = {
    LoadAllAssets: function() {

        //LastImageSequence
        // for (var i = 0; i < 10; i++) {
        //     game.load.image('lastImageSequece' + (i+1), 'assets/LastImageSequence/' + (i+1) + '.png');
        // }
        game.load.spritesheet('lastImageSequece', localImageURl+'lastImageSequence/lastImageSequence.png', 539,379,25);
        //Load All Collision Target
        game.load.image('birdArea', localImageURl+'collisonTarget/birdArea.png');
        game.load.image('sheepArea', localImageURl+'collisonTarget/sheepArea.png');
        game.load.image('fishArea1', localImageURl+'collisonTarget/fishArea1.png');
        game.load.image('fishArea2', localImageURl+'collisonTarget/fishArea2.png');
        game.load.image('fishArea3', localImageURl+'collisonTarget/fishArea3.png');
        game.load.image('pigArea', localImageURl+'collisonTarget/pigArea.png');
        game.load.image('sideBar', localImageURl+'collisonTarget/sideBar.png');
        
        //Load All Input Assets Load
        game.load.image('bird1', localImageURl+'inputAsset/bird1.png'); 
        game.load.image('bird2', localImageURl+'inputAsset/bird2.png'); 
        game.load.image('duck1', localImageURl+'inputAsset/duck1.png'); 
        game.load.image('duck2', localImageURl+'inputAsset/duck2.png'); 
        game.load.image('fish1', localImageURl+'inputAsset/fish1.png'); 
        game.load.image('fish2', localImageURl+'inputAsset/fish2.png'); 
        game.load.image('pig1', localImageURl+'inputAsset/pig1.png'); 
        game.load.image('pig2', localImageURl+'inputAsset/pig2.png'); 
        game.load.image('sheep1', localImageURl+'inputAsset/sheep1.png'); 
        game.load.image('sheep2', localImageURl+'inputAsset/sheep2.png'); 
        game.load.image('closebttn', localImageURl+'inputAsset/closeIcon.png'); 
         
        //Background Image
        game.load.image('backgroundImage',localImageURl+'background.png');
        game.load.image('whitePixel','Images/one_pixel_white.png');
        game.load.image('transparentImage','Images/transparentImage.png');

        game.load.audio('endSound', 'Sound/Village/end.mp3');
        game.load.audio('gamePlaySound', 'Sound/Village/try.mp3');
    }
}