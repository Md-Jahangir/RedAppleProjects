var loadImageUrl = "Images/Cake/"
var LoadAssets = {
    LoadAllAssets: function() {

        //Background Image
        game.load.image('whitePixel', 'Images/one_pixel_white.png');
        game.load.image('transparentImage', 'Images/transparentImage.png');
        game.load.image('sideBar', loadImageUrl+'sideBar.png');
        game.load.image('bg', loadImageUrl+'bg.png');
        game.load.image('nextButtonBase', loadImageUrl+'next_button_base.png');
        game.load.image('blankCup', loadImageUrl+'blank_cup.png');
        game.load.image('blankSaltSpoon', loadImageUrl+'blankSaltSpoon.png');
        game.load.image('blankBakingPowdeSpoon', loadImageUrl+'blankBakingPowdeSpoon.png');

        game.load.image('staticBowl', loadImageUrl+'staticBowl.png');
        game.load.image('staticEgg', loadImageUrl+'staticEgg.png');
        game.load.image('staticButter', loadImageUrl+'staticButter.png');
        game.load.image('butterPlaced', loadImageUrl+'butterPlaced.png');
        game.load.image('eggPlaced', loadImageUrl+'eggPlaced.png');
        game.load.image('flourPlaced', loadImageUrl+'flourPlaced.png');
        game.load.image('cocoaPlaced', loadImageUrl+'cocoaPlaced.png');
        game.load.image('sugarPlaced', loadImageUrl+'sugarPlaced.png');
        game.load.image('milkPlaced', loadImageUrl+'milkPlaced.png');
        game.load.image('nutsPlaced', loadImageUrl+'nutsPlaced.png');
        game.load.image('waterPlaced', loadImageUrl+'waterPlaced.png');
        game.load.image('finalPlaced', loadImageUrl+'finalPlaced.png');

        game.load.image('bigSpoon', loadImageUrl+'bigSpoon.png');
        game.load.image('mixer', loadImageUrl+'mixer.png');
        game.load.image('rotateButton', loadImageUrl+'rotateButton.png');
        game.load.image('onButtonBase', loadImageUrl+'onButtonBase.png');


        game.load.spritesheet('cocoa', loadImageUrl+'cocoa.png', 205, 142, 24);
        game.load.spritesheet('flour', loadImageUrl+'flour.png', 205, 206, 18);
        game.load.spritesheet('sugar', loadImageUrl+'sugar.png', 205, 222, 35);
        game.load.spritesheet('milk', loadImageUrl+'milk.png', 205, 169, 20);
        game.load.spritesheet('nuts', loadImageUrl+'nuts.png', 205, 94, 17);
        game.load.spritesheet('water', loadImageUrl+'water.png', 205, 186, 21);
        game.load.spritesheet('bakingPowder', loadImageUrl+'bakingPowder.png', 205, 222, 11);
        game.load.spritesheet('salt', loadImageUrl+'salt.png', 205, 294, 17);
        game.load.spritesheet('eggSpritesheets', loadImageUrl+'eggSpritesheets.png', 205, 245, 15);
        game.load.spritesheet('butterSpritesheets', loadImageUrl+'butterSpritesheets.png', 205, 193, 30);
        game.load.spritesheet('momsBaker', loadImageUrl+'momsBaker.png', 512, 515, 14);
        game.load.spritesheet('mixerSpritesheets', loadImageUrl+'mixerSpritesheets.png', 512, 428, 15);
        game.load.spritesheet('bowlPouring', loadImageUrl+'bowlPouring.png', 512, 436, 35);
        game.load.spritesheet('ovenOn', loadImageUrl+'ovenWhenOn.png', 512, 566, 28);
        game.load.spritesheet('ovenOff', loadImageUrl+'ovenAfterOff.png', 512, 566, 23);
        game.load.spritesheet('thump', loadImageUrl+'thump.png', 615, 532, 30);
        game.load.spritesheet('yummy', loadImageUrl+'yummy.png', 720, 570, 20);


        // game.load.image('doneButton', 'assets/sprites/doneButton.png');

        // game.load.audio('endSound', 'assets/sounds/end.mp3');
        // game.load.audio('gamePlaySound', 'assets/sounds/try.mp3');
    }
}