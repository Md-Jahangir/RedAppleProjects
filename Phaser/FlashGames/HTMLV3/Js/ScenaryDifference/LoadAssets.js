var LoadImageUrl = "Images/ScenaryDifference/";
var LoadAssets = {
    LoadAllAssets: function() {
        //Background Image
        game.load.image('whitePixel', 'Images/one_pixel_white.png');
        game.load.image('transparentImage', 'Images/transparentImage.png');
        game.load.image('Layer1', LoadImageUrl+'Layer1.png');
        game.load.image('Layer2', LoadImageUrl+'Layer2.png');
        //Icons
        // game.load.image('blue_circle', 'blue_circle.png');
        game.load.image('ellipse60', LoadImageUrl+'ellipse60.png');
        game.load.image('ellipse', LoadImageUrl+'ellipse.png');
        // game.load.image('hand', 'assets/images/hand.png');

        //sound
        game.load.audio('goodJob', 'Sound/ScenaryDifference/good_job.mp3');
        game.load.audio('sceneryDifference_background', 'Sound/ScenaryDifference/sceneryDifference_background.mp3');
    }
}