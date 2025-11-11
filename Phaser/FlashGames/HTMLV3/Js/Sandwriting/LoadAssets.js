var loadImageUrl = "Images/Sandwriting/";
var LoadAssets = {
    LoadAllAssets: function() {
        game.load.spritesheet('water', loadImageUrl+'water.png', 512, 512, 50);
        // game.load.spritesheet('dolphin', 'dolphin.png', 256, 141, 15);
        game.load.spritesheet('dolphin', loadImageUrl+'dolphin.png', 256, 256, 16);
        game.load.spritesheet('boat', loadImageUrl+'boat.png', 256, 94, 20);

        //Background Image
        game.load.image('whitePixel', 'Images/one_pixel_white.png');
        game.load.image('skyblue', 'Images/skyblue.png');
        game.load.image('moon', loadImageUrl+'moon.png');
        game.load.image('button_base', loadImageUrl+'button_base.png');
        game.load.image('bottomBackground', loadImageUrl+'bottom_bg.png');
        game.load.image('falseWater', loadImageUrl+'falseWater.png');
        //
        game.load.audio('sea_sound','Sound/Sandwriting/sea_sound.mp3');
    }
}