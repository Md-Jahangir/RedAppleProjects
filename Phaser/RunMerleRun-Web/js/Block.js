var blockArray = [];
var numberOfBlock = 12
var i;
var blockWidth;
var startBlockIndex = 0;
var lastBlockIndex = numberOfBlock - 1;
var block;
var behindBlockOverlay;
var firstUpBlock = -1;
var firstDownBlock = -1;
var speed;


var Block = {

    //Create the Blocks
    CreateBlocks: function(xPos, yPos) {
        for (i = 0; i < numberOfBlock; i++) {
            // blockArray[i] = Utils.SpriteSettingsControl(blockArray[i], xPos + i * (124), yPos, 'block', "true", "true", 0.5, 0.5, 1, 1);
            blockArray[i] = Utils.ButtonSettingsControl(blockArray[i], xPos + i * (124), yPos, 'block', null, null, null, this.GotoOriginalPosition, "true", "true", 0.5, 0.5, 1, 1, this);
            game.physics.p2.enable([blockArray[i]]);
            blockArray[i].body.static = true;
            blockArray[i].body.clearShapes();
            blockArray[i].body.addRectangle(122, 230, 0, 30);
            // blockArray[i].body.debug = true;

        } // END OF FOR LOOP
        blockWidth = blockArray[0].width;
    },

    //FOR MOVE THE BLOCKS
    ShiftAllBlocks: function() {
        for (i = 0; i < numberOfBlock; i++) {
            blockArray[i].body.x -= speed;

            if (!isBlockShift) {
                if (blockArray[i].body.x <= -50) {
                    if (blockArray[i].body.y > 600 || blockArray[i].body.y < 600) {
                        blockArray[i].body.y = 600;

                    }
                }
            }

            if (firstUpBlock == i && blockArray[firstUpBlock].body.x < 800) { //1210) {
                if (Database.LoadData("is_up_block_hint_shown") == "0") {
                    isGameRunning = false;
                    Character.StopCharacterWalkAnimation();
                    character.frame = 46;
                    SoundManager.StopCharacterSound();
                    Tutorial.ShowUpBlockHint();
                }
            }

            if (firstDownBlock == i && blockArray[firstDownBlock].body.x < 800) { //1210) {
                if (Database.LoadData("is_down_block_hint_shown") == "0") {
                    isGameRunning = false;
                    Character.StopCharacterWalkAnimation();
                    character.frame = 46;
                    SoundManager.StopCharacterSound();
                    Tutorial.ShowDownBlockHint();
                }
            }

        } //END OF FOR LOOP

    }, // END OF ShiftAllBlocks FUNCTION

    // WHEN THE BLOCKS CROSS THE LEFT BOUNDARY, THEN RE-POSITION THE BLOCKS AND CREATE BLANK SPACES
    CheckStartingBlock: function() {
        var startBlockBody = blockArray[startBlockIndex].body;
        if (startBlockBody.x < -63) {
            startBlockBody.x = (blockArray[lastBlockIndex].body.x + (blockWidth - 1));

            lastBlockIndex = startBlockIndex;

            startBlockIndex++;
            if (startBlockIndex > (numberOfBlock - 1)) {
                startBlockIndex = 0;
            }

            //FOR CHECKING IF THE BLOCK WILL SHIFT UP/DOWN OR NOT\
            if (isBlockShift) {
                //DESTROY THE OBSTACLES
                for (var i = 0; i < obstaclesArray.length; i++) {
                    if (obstaclesArray[i] != null && obstaclesArray[i].body.x < -100) {
                        obstaclesArray[i].destroy();
                        obstaclesArray[i] = null;
                    }
                    // if (obstaclesArray[i].body.x < -100) {
                    //     Obstacle.DestroyObstacle();
                    // }
                }
                // Obstacle.DestroyObstacle();

                var randomNumber = Math.random();
                if (randomNumber < 0.45 && blockArray[lastBlockIndex].body.y > 535) {
                    // SHIFT UP
                    if (firstUpBlock == -1) {
                        firstUpBlock = lastBlockIndex;
                    }
                    blockArray[lastBlockIndex].body.y -= 65;
                } else if (randomNumber > 0.55 && blockArray[lastBlockIndex].body.y < 665) {
                    // SHIFT DOWN
                    if (firstDownBlock == -1) {
                        firstDownBlock = lastBlockIndex;
                    }
                    blockArray[lastBlockIndex].body.y += 65;
                }
            }

        } // END OF LEFT BOUNDARY CROSS CHECK IF STATEMENT

    }, // END OF checkStartingBlock FUNCTION


    // FOR MOVING THE BLOCKS TO THE ORIGINAL POSITION WHEN THE BLOCKS ARE EITHER IN DOWN OR UP
    GotoOriginalPosition: function(target) {
        //WHEN THE BLOCKS ARE NOT IN ORIGINAL POSITION THEN MOVE THEM IN ORIGINAL POSITION AND-
        //MOVE THE ORIGINAL BLOCKS TO THE EITHER UP OR DOWN
        if (Database.LoadData("sound_on_off") == "0") {
            blockClickSFX.play();
            blockClickSFX.volume = 1;
        }

        //FOR CHECKING AND CLICK ON THE BLOCK WHICH IS EITHER UP OR DOWN AND HIDE HINT
        if (firstUpBlock != -1 && firstUpBlock != -2 && target == blockArray[firstUpBlock]) {
            isGameRunning = true;
            Character.PlayCharacterWalkAnimation();
            firstUpBlock = -2;
            Tutorial.HideUpBlockHint();
            Database.SaveData("is_up_block_hint_shown", 1);
        }
        if (firstDownBlock != -1 && firstDownBlock != -2 && target == blockArray[firstDownBlock]) {
            isGameRunning = true;
            Character.PlayCharacterWalkAnimation();
            firstDownBlock = -2;
            Tutorial.HideDownBlockHint();
            Database.SaveData("is_down_block_hint_shown", 1);
        }

        //SEND THE BLOCK TO THE ORIGINAL POSITION WITH ANIMATION
        if (target.body.y == 600) {
            var random = Math.random();
            if (isGameRunning == true) {
                if (random < 0.5) {
                    game.add.tween(target.body).to({ y: 665 }, 250, Phaser.Easing.Linear.Out, true);
                } else {
                    game.add.tween(target.body).to({ y: 535 }, 250, Phaser.Easing.Linear.Out, true);

                }

            }
        } else {
            game.add.tween(target.body).to({ y: 600 }, 250, Phaser.Easing.Linear.Out, true);

        }

    }, // END OF gotoOriginalPosition FUNCTION

    // FOR RE-ARRANGE THE BLOCKS WHEN GAME OVER
    ReArrangeBlocks: function() {
        for (i = 0; i < numberOfBlock; i++) {
            blockArray[i].body.x = 63 + i * (124);
            blockArray[i].body.y = 600;
        }
        startBlockIndex = 0;
        lastBlockIndex = numberOfBlock - 1;
    }, // END OF reArrangeBlocks FUNCTION

    //FOR DESTROY THE BLOCKS
    DestroyBlocks: function() {
        for (i = 0; i < numberOfBlock; i++) {
            if (blockArray[i] != null) {
                blockArray[i].destroy();
            }
        }
    }, //END OF DestroyBlocks FUNCTION


}