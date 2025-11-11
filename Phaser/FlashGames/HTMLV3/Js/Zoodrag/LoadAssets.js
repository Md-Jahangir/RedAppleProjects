var localImageURl = "Images/Zoodrag/";
var LoadAssets = {
    LoadAllAssets: function() {

        game.load.spritesheet('ostrich', localImageURl+'spritesheets/ostrich_spritesheets.png', 3160/40, 148, 40);
        game.load.spritesheet('elephant', localImageURl+'spritesheets/elephant_spritesheets.png', 5920/40, 103, 40);
        game.load.spritesheet('giraffee', localImageURl+'spritesheets/giraffee_spritesheets.png', 5040/40, 148, 40);
        game.load.spritesheet('zebra', localImageURl+'spritesheets/zebra_spritesheets.png', 5920/40, 100, 40);
        game.load.spritesheet('sajaru', localImageURl+'spritesheets/sajaru_spritesheets.png', 5920/40, 98, 40);
        game.load.spritesheet('pig', localImageURl+'spritesheets/pig_spritesheets.png', 5920/40, 105, 40);
        game.load.spritesheet('monkey', localImageURl+'spritesheets/monkey_spritesheets.png', 4440/40, 148, 40);
        game.load.spritesheet('turtle', localImageURl+'spritesheets/turtle_spritesheets.png', 5920/40, 90, 40);
        game.load.spritesheet('bear', localImageURl+'spritesheets/bear_spriteSheet.png', 128,74, 40);
        game.load.spritesheet('lion1', localImageURl+'spritesheets/lion1_spritesheets_128.png', 128, 128, 40);
        game.load.spritesheet('lion2', localImageURl+'spritesheets/lion2_spritesheets_128.png', 128, 128, 40);

        //Background Image
        game.load.image('whitePixel', 'Images/one_pixel_white.png');
        game.load.image('transparentImage', 'Images/transparentImage.png');
        game.load.image('backgroundImage', localImageURl+'bg.png');
        game.load.image('sideBar', localImageURl+'sideBar.png');
        game.load.image('crossIcon', localImageURl+'crossIcon.png');
        game.load.image('monkeyBase', localImageURl+'monkeyBase.png');
    }
}