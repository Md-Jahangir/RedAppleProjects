var LoadAssets = {
    LoadAllAssets: function() {

        //Background Image
        game.load.image('whitePixel', 'assets/one_pixel_white.png');
        game.load.image('sideBar', 'assets/sprites/sideBar.png');
        game.load.image('bg', 'assets/sprites/bg.png');
        game.load.image('nextButtonBase', 'assets/sprites/next_button_base.png');
        game.load.image('blankCup', 'assets/sprites/blank_cup.png');
        game.load.image('blankSaltSpoon', 'assets/sprites/blankSaltSpoon.png');
        game.load.image('blankBakingPowdeSpoon', 'assets/sprites/blankBakingPowdeSpoon.png');

        game.load.image('staticBowl', 'assets/sprites/staticBowl.png');
        game.load.image('staticEgg', 'assets/sprites/staticEgg.png');
        game.load.image('staticButter', 'assets/sprites/staticButter.png');
        game.load.image('butterPlaced', 'assets/sprites/butterPlaced.png');
        game.load.image('eggPlaced', 'assets/sprites/eggPlaced.png');
        game.load.image('flourPlaced', 'assets/sprites/flourPlaced.png');
        game.load.image('cocoaPlaced', 'assets/sprites/cocoaPlaced.png');
        game.load.image('sugarPlaced', 'assets/sprites/sugarPlaced.png');
        game.load.image('milkPlaced', 'assets/sprites/milkPlaced.png');
        game.load.image('nutsPlaced', 'assets/sprites/nutsPlaced.png');
        game.load.image('waterPlaced', 'assets/sprites/waterPlaced.png');
        game.load.image('finalPlaced', 'assets/sprites/finalPlaced.png');

        game.load.image('bigSpoon', 'assets/sprites/bigSpoon.png');
        game.load.image('mixer', 'assets/sprites/mixer.png');
        game.load.image('rotateButton', 'assets/sprites/rotateButton.png');
        game.load.image('onButtonBase', 'assets/sprites/onButtonBase.png');


        game.load.spritesheet('cocoa', 'assets/sprites/cocoa.png', 205, 142, 24);
        game.load.spritesheet('flour', 'assets/sprites/flour.png', 205, 206, 18);
        game.load.spritesheet('sugar', 'assets/sprites/sugar.png', 205, 222, 35);
        game.load.spritesheet('milk', 'assets/sprites/milk.png', 205, 169, 20);
        game.load.spritesheet('nuts', 'assets/sprites/nuts.png', 205, 94, 17);
        game.load.spritesheet('water', 'assets/sprites/water.png', 205, 186, 21);
        game.load.spritesheet('bakingPowder', 'assets/sprites/bakingPowder.png', 205, 222, 11);
        game.load.spritesheet('salt', 'assets/sprites/salt.png', 205, 294, 17);
        game.load.spritesheet('eggSpritesheets', 'assets/sprites/eggSpritesheets.png', 205, 245, 15);
        game.load.spritesheet('butterSpritesheets', 'assets/sprites/butterSpritesheets.png', 205, 193, 30);
        game.load.spritesheet('momsBaker', 'assets/sprites/momsBaker.png', 512, 515, 14);
        game.load.spritesheet('mixerSpritesheets', 'assets/sprites/mixerSpritesheets.png', 512, 428, 15);
        game.load.spritesheet('bowlPouring', 'assets/sprites/bowlPouring.png', 512, 436, 35);
        game.load.spritesheet('ovenOn', 'assets/sprites/ovenWhenOn.png', 512, 566, 28);
        game.load.spritesheet('ovenOff', 'assets/sprites/ovenAfterOff.png', 512, 566, 23);
        game.load.spritesheet('thump', 'assets/sprites/thump.png', 615, 532, 30);
        game.load.spritesheet('yummy', 'assets/sprites/yummy.png', 720, 570, 20);


        // game.load.image('doneButton', 'assets/sprites/doneButton.png');

        // game.load.audio('endSound', 'assets/sounds/end.mp3');
        // game.load.audio('gamePlaySound', 'assets/sounds/try.mp3');
    }
}