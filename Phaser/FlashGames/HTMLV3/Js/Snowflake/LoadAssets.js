var loadImageUrl = "Images/Snowflake/";
var LoadAssets = {
    LoadAllAssets: function() {

        //Background Image
        game.load.image('whitePixel', 'Images/one_pixel_white.png');
        game.load.image('snowflake', 'Images/snowflake.png');
        game.load.image('transparentImage', 'Images/transparentImage.png');
        game.load.image('sideBar', loadImageUrl+'sideBar.png');

        game.load.image('straightLine', loadImageUrl+'straightLine.png');
        game.load.image('shape1', loadImageUrl+'shape1.png');
        game.load.image('shape2', loadImageUrl+'shape2.png');
        game.load.image('shape3', loadImageUrl+'shape3.png');
        game.load.image('shape4', loadImageUrl+'shape4.png');
        game.load.image('shape5', loadImageUrl+'shape5.png');
        game.load.image('shape6', loadImageUrl+'shape6.png');
        game.load.image('shape7', loadImageUrl+'shape7.png');
        game.load.image('shape8', loadImageUrl+'shape8.png');
        game.load.image('shape9', loadImageUrl+'shape9.png');
        game.load.image('shape10', loadImageUrl+'shape10.png');
        game.load.image('doneButton', loadImageUrl+'doneButton.png');
        game.load.image('rotateButton', loadImageUrl+'rotateButton.png');
        game.load.image('snow', loadImageUrl+'snow.png');

        // game.load.audio('endSound', 'assets/sounds/end.mp3');
        // game.load.audio('gamePlaySound', 'assets/sounds/try.mp3');
    }
}