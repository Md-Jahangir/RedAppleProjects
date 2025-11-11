var localUrlPath = "Images/UpsideCatDown/"
var LoadAssets = {
    LoadAllAssets: function() {
        //Background Image
        game.load.image('whitePixel', 'Images/one_pixel_white.png');
        game.load.image('image', 'Images/image.png');
        game.load.image('sideBar', localUrlPath+'sideBar.png');
        game.load.image('dot', localUrlPath+'dot.png');
        //Icons
        game.load.image('rotate', localUrlPath+'rotate.png');
        game.load.image('hand', localUrlPath+'hand.png');
        //
        game.load.image('cat', localUrlPath+'cat.png');
        game.load.image('cup', localUrlPath+'cup.png');
        game.load.image('folk', localUrlPath+'f1.png');

        game.load.image('frame', localUrlPath+'frame.png');
        game.load.image('girl', localUrlPath+'girl.png');
        game.load.image('glass', localUrlPath+'glass.png');
        game.load.image('knife', localUrlPath+'k1.png');
        //lamp
        game.load.image('light', localUrlPath+'light.png');
        game.load.image('rope', localUrlPath+'rope.png');
        game.load.image('plate', localUrlPath+'plate1.png');
        game.load.image('spoon', localUrlPath+'spoon.png');
        game.load.image('stool', localUrlPath+'stool1.png');
        game.load.image('table', localUrlPath+'table.png');
        //loading
        game.load.image('loadBarFill', localUrlPath+'loading/loadBarFill0001.png');
        game.load.image('loadBarFrame', localUrlPath+'loading/loadBarFrame.png');
        // game.load.image('loadingText', 'loading/loading0022.png');
        game.load.spritesheet('lodingText',localUrlPath+'loadingsprite.png',768/6,140/7,34);

        //sound
        game.load.audio('click_sound','Sound/UpsideCatDown/click_sound.mp3')
    }
}