var isGameRunning = false;
var distance;
var score;
var counter;
var blockCounter;
// var isButtonPressed = false;
var gameStartTime = Date.now();

var Gameplay = function () { };
Gameplay.prototype = {
    init: function () {
        Utils.ScaleManager();
    },
    preload: function () {

    },

    create: function () {
        PlayzhubEventHandler.GamePlayStarted();
        gameStartTime = Date.now();
        //ENABLE THE PHYSICS SYSTEM
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setBoundsToWorld(false, false, false, false);
        game.physics.p2.gravity.y = 4500;

        game.time.advancedTiming = true;
        game.time.desiredFps = 60;
        game.time.slowMotion = 1.0;

        this.CreateAllItems();
        FakeCounter.ShowFakeCounter();
        // setTimeout(this.StartGame, 1000);

        GameAnalytics("addDesignEvent", "screen:gameplay");

        GameAnalytics("addProgressionEvent", "Start", "run_merle_run_endless");
    }, //End of create function

    update: function () {

        if (isGameRunning) {

            //APPLY X VELOCITY TO THE CHARACTER
            Character.ApplyCharacterVelocity();

            //MOVE THE BLOCKS
            Block.ShiftAllBlocks();
            // WHEN THE BLOCKS CROSS THE LEFT BOUNDARY, THEN RE-POSITION THE BLOCKS
            Block.CheckStartingBlock();

            //MOVE THE LEAF ON THE WATER
            Background.ShiftLeaf();

            // //MOVE THE FIREFLY
            // Background.ShiftFirefly();

            //MOVE THE GRASS LAYER
            Background.ShiftGrassLayer();
            //MOVE THE TREE 1 LAYER
            Background.ShiftTreeOneLayer();
            //MOVE THE LAND 1 LAYER
            Background.ShiftLandOneLayer();
            //MOVE THE STONE 1 LAYER
            Background.ShiftStoneOneLayer();
            //MOVE THE TREE 2 LAYER
            Background.ShiftTreeTwoLayer();
            //MOVE THE STONE 2 LAYER
            Background.ShiftStoneTwoLayer();
            //MOVE THE LAND 2 LAYER
            Background.ShiftLandTwoLayer();
            //MOVE THE TREE 3 LAYER
            Background.ShiftTreeThreeLayer();
            //MOVE THE HILL LAYER
            Background.ShiftHillLayer();

            //CALCULATE THE DISTANCE
            this.CalculateDistance();

            //MOVE THE OBSTACLES
            // if (!isBlockShift) {
            Obstacle.ShiftObstacle();
            // }

            if (character.body.y < 300 && !canJump) {
                if (isGameRunning == true) {
                    if (isBlockShift) {
                        game.time.events.remove(characterWalkSoundInterval);
                        pauseButton.inputEnabled = false;
                        SoundManager.StopGameplayBgSound();
                        SoundManager.StopCharacterSound();
                        Background.StopLeafAnimation();
                        Background.StopWaterAnimation();
                        Background.StopFireflyAnimation();
                        canJump = false;

                        // FOR PLAY GAME OVER SOUND
                        if (Database.LoadData("sound_on_off") == "0") {
                            setTimeout(function () {
                                hitSound.play();
                            }, 100);
                        }

                        //DISABLE THE CHARCTER AND SET TO 0
                        setTimeout(function () {
                            character.body.velocity.x = 0;
                            character.body.velocity.y = 0;
                        }, 400);

                        //STOP THE CHARACTER WALK ANIMATION
                        Character.StopCharacterWalkAnimation();
                        //PLAY HIT ANIMATION
                        Character.PlayCharacterHit();

                        // FOR INPUT DISABLE TO THE BLOCKS
                        if (isBlockShift) {
                            for (i = 0; i < numberOfBlock; i++) {
                                blockArray[i].body.velocity = 0;
                                blockArray[i].inputEnabled = false;
                            }
                        }

                        // FOR SHAKE THE SCREEN
                        game.camera.shake(0.02, 500);

                        isGameRunning = false;
                        // isDie = true;

                        isSwipeActive = false;
                    }
                    // if (isDie) {
                    //     isDie = false;
                    //     var hitTween = game.add.tween(character.position).to({ y: 600 }, 400, Phaser.Easing.Linear.In, true, 300);
                    //     hitTween.onComplete.add(function () {
                    //         character.visible = false;
                    //         waterFall.visible = true;
                    //         var anim = waterFall.animations.play('water_fall_animation', 20, false);
                    //         anim.onComplete.add(function () {
                    //             waterFall.visible = false;

                    //             setTimeout(GameOverPopup.ShowGameOverPopup, 500);

                    //             // isDie = false;
                    //         });
                    //     });
                    // }
                }
            }


        }
        //fOR Swipe
        if (isSwipeActive) {
            Character.UpdateSwipe();
        }
    },

    CreateAllItems: function () {
        //DESTROY AND CREATE THE SKY
        Background.DestroySky();
        Background.CreateSky();

        //HILL LAYER
        Background.DestroyHillLayer();
        Background.CreateHillLayer();

        //TREE 3 LAYER
        Background.DestroyTreeThreeLayer();
        Background.CreateTreeThreeLayer();

        // LAND 2 LAYER
        Background.DestroyLandTwoLayer();
        Background.CreateLandTwoLayer();

        //STONE 2 LAYER
        Background.DestroyStoneTwoLayer();
        Background.CreateStoneTwoLayer();

        //TREE 2 LAYER
        Background.DestroyTreeTwoLayer();
        Background.CreateTreeTwoLayer();

        //FIREFLY 
        // fireflyGroup = game.add.group();
        Background.DestroyFirefly();
        Background.CreateFirefly(20);

        //LAND 1 LAYER
        Background.DestroyLandOneLayer();
        Background.CreateLandOneLayer();

        //STONE 1 LAYER
        Background.DestroyStoneOneLayer();
        Background.CreateStoneOneLayer();

        //TREE 1 LAYER
        Background.DestroyTreeOneLayer();
        Background.CreateTreeOneLayer();

        //GRASS LAYER
        Background.DestroyGrassLayer();
        Background.CreateGrassLayer();

        //BLOCKS
        Block.DestroyBlocks();
        Block.CreateBlocks(60, 600);

        //WATER LAYER
        Background.DestroyWater();
        Background.CreateWater();

        Background.CreateWaterFall();

        //CHARACTER
        Character.CreateCharacter();

        //LEAF ON THE WATER
        leafGroup = game.add.group();
        Background.DestroyLeaf();
        Background.CreateLeaf(10);


        PausePopup.CreatePausePopup();
        QuitPopup.CreateQuitPopup();
        GameOverPopup.Init();
        GameOverPopup.CreateGameOverPopup();
        GameplayUI.CreateGameplayUI();
        Tutorial.GenerateUpBlockHint();
        Tutorial.GenerateDownBlockHint();
        Tutorial.GenerateJumpHint();
    },

    StartGame: function () {
        isGameRunning = true;
        isDie = false;
        distance = 0;
        counter = 1;
        blockCounter = 1;
        speed = 4;
        isBlockShift = true;
        characterAnimationSpeed = 18;
        if (Database.LoadData("music_on_off") == "0") {
            SoundManager.PlayGameplayBgSound();
        }

        //Play leaf animation
        Background.PlayLeafAnimation();

        Background.GameLoopForFireFly();

        //Play Firefly animation
        Background.PlayFireflyAnimation();

        //Play Water Animation
        Background.PlayWaterAnimation();

        //ENABLE THE CHARACTER
        character.body.static = false;
        character.body.velocity.x = 0.14;

        //SHOW THE SCORE BOARD AND PAUSE BUTTON
        GameplayUI.ShowGameplayUI();

        // FOR INPUT ENABLE TO THE BLOCKS
        if (isBlockShift) {
            for (i = 0; i < numberOfBlock; i++) {
                blockArray[i].inputEnabled = true;
            }
        }

        // PLAY CHARACTER WALK ANIMATION
        Character.PlayCharacterWalkAnimation();
        if (isGameRunning) {
            if (Database.LoadData("sound_on_off") == "0") {
                characterWalkSoundInterval = setInterval(SoundManager.PlayCharacterSound, 450);
            }
        }

    },

    CalculateDistance: function () {
        distance += speed * 1;
        score = parseInt(distance / 100);
        scoreText.text = score;

        //Increase the speed and animation speed every after 10 sec
        if (score == (counter * 10)) {
            this.IncreaseSpeed();
            counter++;
        }

        if (score == (blockCounter * 70)) {
            // if (score == 10) {
            this.EnableBlockShift();
            blockCounter++;
        }
    },
    //Increase the speed and animation speed every after 10 sec
    IncreaseSpeed: function () {
        if (speed < 25) {
            speed += 0.4;
        }
        if (characterAnimationSpeed < 100) {
            characterAnimationSpeed += 0.8;
        }
    },

    EnableBlockShift: function () {
        isBlockShift = !isBlockShift;
        // isBlockShift = false;
        //FO CREATE OBSTACLES
        if (!isBlockShift) {
            setTimeout(function () {
                canJump = true;
                for (i = 0; i < numberOfBlock; i++) {
                    blockArray[i].inputEnabled = false;
                }
                var randomTimeInterval = Utils.getRandomNumber(1000, 2500);
                createObstacleInterval = setTimeout(Obstacle.CreateObstacle, randomTimeInterval);
            }, 3500);

            isSwipeActive = true;

        } else {
            setTimeout(function () {
                for (i = 0; i < numberOfBlock; i++) {
                    blockArray[i].inputEnabled = true;
                }
            }, 800);
            setTimeout(function () {
                canJump = false;
            }, 1600);

        }
    },



}; //End of Menu.prototype