var LoadAssets = {
    LoadAllAssets: function() {

        game.load.spritesheet('ostrich', 'assets/allAnimals/spritesheets/ostrich_spritesheets_128.png', 128, 128, 40);
        game.load.spritesheet('elephant', 'assets/allAnimals/spritesheets/elephant_spritesheets_128.png', 128, 128, 40);
        game.load.spritesheet('giraffee', 'assets/allAnimals/spritesheets/giraffee_spritesheets_128.png', 128, 128, 40);
        game.load.spritesheet('zebra', 'assets/allAnimals/spritesheets/zebra_spritesheets_128.png', 128, 128, 40);
        game.load.spritesheet('sajaru', 'assets/allAnimals/spritesheets/sajaru_spritesheets_128.png', 128, 128, 40);
        game.load.spritesheet('pig', 'assets/allAnimals/spritesheets/pig_spritesheets_128.png', 128, 128, 40);
        game.load.spritesheet('monkey', 'assets/allAnimals/spritesheets/monkey_spritesheets_128.png', 128, 128, 40);
        game.load.spritesheet('turtle', 'assets/allAnimals/spritesheets/turtle_spritesheets_128.png', 128, 128, 40);
        game.load.spritesheet('bear', 'assets/allAnimals/spritesheets/bear_spritesheets_128.png', 128, 128, 40);
        game.load.spritesheet('lion1', 'assets/allAnimals/spritesheets/lion1_spritesheets_128.png', 128, 128, 40);
        game.load.spritesheet('lion2', 'assets/allAnimals/spritesheets/lion2_spritesheets_128.png', 128, 128, 40);

        //Background Image
        game.load.image('whitePixel', 'assets/one_pixel_white.png');
        game.load.image('backgroundImage', 'assets/allAnimals/bg.png');
        game.load.image('sideBar', 'assets/allAnimals/sideBar.png');
        game.load.image('crossIcon', 'assets/allAnimals/crossIcon.png');
        game.load.image('monkeyBase', 'assets/allAnimals/monkeyBase.png');

        // game.load.audio('endSound', 'assets/sounds/end.mp3');
        // game.load.audio('gamePlaySound', 'assets/sounds/try.mp3');
    }
}