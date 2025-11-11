var LoadAssets = {
    LoadAllAssets: function() {
        game.load.spritesheet('water', 'assets/sprites/water.png', 512, 512, 50);
        // game.load.spritesheet('dolphin', 'assets/sprites/dolphin.png', 256, 141, 15);
        game.load.spritesheet('dolphin', 'assets/sprites/dolphin.png', 256, 256, 16);
        game.load.spritesheet('boat', 'assets/sprites/boat.png', 256, 94, 20);

        //Background Image
        game.load.image('whitePixel', 'assets/one_pixel_white.png');
        game.load.image('moon', 'assets/sprites/moon.png');
        game.load.image('button_base', 'assets/sprites/button_base.png');
        game.load.image('bottomBackground', 'assets/sprites/bottom_bg.png');
        game.load.image('falseWater', 'assets/sprites/falseWater.png');

    }
}