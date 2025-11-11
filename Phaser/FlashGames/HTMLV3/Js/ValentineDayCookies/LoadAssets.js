var loadImageUrl = "Images/ValentineDayCookies/"
var LoadAssets = {
    LoadAllAssets: function() {

        //Background Image
        game.load.image('whitePixel', 'Images/one_pixel_white.png');
        game.load.image('transparentImage', 'Images/transparentImage.png');

        game.load.image('cookie1', loadImageUrl+'cookie1.png');
        game.load.image('cookie2', loadImageUrl+'cookie2.png');
        game.load.image('cookie3', loadImageUrl+'cookie3.png');

        game.load.image('sideBar', loadImageUrl+'sideBar.png');

        game.load.image('tube1', loadImageUrl+'tube1.png');
        game.load.image('tube2', loadImageUrl+'tube2.png');
        game.load.image('tube3', loadImageUrl+'tube3.png');

        game.load.image('frost1', loadImageUrl+'frost1.png');
        game.load.image('frost2', loadImageUrl+'frost2.png');
        game.load.image('frost3', loadImageUrl+'frost3.png');

        game.load.image('shape4', loadImageUrl+'shape4.png');
        game.load.image('shape5', loadImageUrl+'shape5.png');
        game.load.image('shape6', loadImageUrl+'shape6.png');
        game.load.image('shape7', loadImageUrl+'shape7.png');
        game.load.image('shape8', loadImageUrl+'shape8.png');
        game.load.image('shape9', loadImageUrl+'shape9.png');
        game.load.image('shape10', loadImageUrl+'shape10.png');
        game.load.image('shape11', loadImageUrl+'shape11.png');
        game.load.image('shape12', loadImageUrl+'shape12.png');
        game.load.image('shape13', loadImageUrl+'shape13.png');
        game.load.image('shape14', loadImageUrl+'shape14.png');
        game.load.image('shape15', loadImageUrl+'shape15.png');
        game.load.image('shape16', loadImageUrl+'shape16.png');
        game.load.image('shape17', loadImageUrl+'shape17.png');
        game.load.image('shape18', loadImageUrl+'shape18.png');
        game.load.image('shape19', loadImageUrl+'shape19.png');
        game.load.image('shape20', loadImageUrl+'shape20.png');
        game.load.image('shape21', loadImageUrl+'shape21.png');
        game.load.image('shape22', loadImageUrl+'shape22.png');
        game.load.image('shape23', loadImageUrl+'shape23.png');
        game.load.image('shape24', loadImageUrl+'shape24.png');

        game.load.image('doneButton', loadImageUrl+'doneButton.png');

        game.load.image('valentineBg', loadImageUrl+'valentineBg.png');
        game.load.spritesheet('yellowBallon', loadImageUrl+'yellowBallon.png', 256, 360, 29);
        game.load.spritesheet('pinkBallon', loadImageUrl+'pinkBallon.png', 257, 350, 29);

        game.load.audio('goodJob', 'Sound/ValentineDayCookies/good_job.mp3');
        game.load.audio('backgroundSound', 'Sound/ValentineDayCookies/valentine _day _cookies_background.mp3');
    }
}