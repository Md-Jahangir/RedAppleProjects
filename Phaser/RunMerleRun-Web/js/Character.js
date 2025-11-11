//FOR CHARACTERS
var character;
var characterWalkAnimation;
var characterHitAnimation;
var characterFallAnimation;
var starAnimationSprite;
var characterFront;
var winCharacterOverlay;
var delX;
var delY;
var standingOnBlock;

//FOR SWIPE AND JUMP THE CHARACTER
var isMouseDown = false;
var mouseStartY;
var canJump = false;
var isSwipeActive = false;

var characterAnimationSpeed;
var isDie = false;

var Character = {

    CreateCharacter: function () {
        //FOR DESTROY THE CHARACTER
        if (character != null) {
            character.destroy();
        }

        //ADD CHARACTER SPRITE
        character = Utils.SpriteSettingsControl(character, 250, 335, 'character', "true", "true", 0.5, 0.5, 1, 1);
        character.frame = 46;

        //DEVIDE THE CHARACTER's ANIMATION SPRITE SHEET INTO WALK,HIT,FALL
        var characterWalkAnimation = character.animations.add('characterWalk', [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]);
        var characterHitAnimation = character.animations.add('characterHit', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]);
        var characterJumpAnimation = character.animations.add('characterJump', [38, 39, 40, 41, 42]);

        // ENABLE PHYSICS TO THE CHARACTER OBJECTS
        game.physics.p2.enable(
            [
                character,
            ]
        );
        character.body.static = true;
        character.body.clearShapes();
        character.body.addRectangle(70, 300, 50, 30, 0);
        character.body.fixedRotation = true;
        // character.body.debug = true;
        character.body.onBeginContact.add(Character.CollisionEvent, this);

        //For Swipe
        game.input.onDown.add(Character.MouseDown, this);
        game.input.onUp.add(Character.MouseUp, this);

    },

    MouseDown: function () {
        isMouseDown = true;
        mouseStartY = game.input.y;
    },
    MouseUp: function () {
        isMouseDown = false;
    },

    SwipeDone: function () {
        var endY = game.input.y;
        if (endY < mouseStartY) {
            Character.JumpCharacter();
        }
    },

    UpdateSwipe: function () {
        if (isMouseDown == true) {
            var distY = Math.abs(game.input.y - mouseStartY);
            if (distY < 640) {
                Character.SwipeDone();
            }
        }
    },

    JumpCharacter: function () {
        Tutorial.HideJumpHint();
        isGameRunning = true;
        Database.SaveData("is_jump_hint_shown", 1);
        if (canJump) {
            if (character.body.y >= 335) {
                character.body.moveUp(1800);
                Character.StopCharacterWalkAnimation();
                Character.PlayCharacterJump();
            } else {
                setTimeout(function () {
                    if (isGameRunning) {
                        Character.StopCharacterJump();
                        // character.frame = 46;
                        Character.PlayCharacterWalkAnimation();
                    }
                }, 550)
            }
        }
    },



    //PLAY CHARACTER WALK ANIMATION
    PlayCharacterWalkAnimation: function () {
        //CHANGE THE ANIMATION SPEED LEVEL WISE
        character.animations.play('characterWalk', characterAnimationSpeed, true);
    },

    //STOP CHARACTER WALK ANIMATION
    StopCharacterWalkAnimation: function () {
        character.animations.stop('characterWalk');
        // SoundManager.StopCharacterSound();
    },

    //PLAY CHARACTER HIT ANIMATION
    PlayCharacterHit: function () {
        character.animations.play('characterHit', 35, false);
    },

    //PLAY CHARACTER FALL ANIMATION
    PlayCharacterFall: function () {
        character.animations.play('characterHit', 35, false);
    },

    //STOP CHARACTER HIT AND FALL ANIMATION
    StopCharacterHitAndFall: function () {
        character.animations.stop('characterHit');
    },

    //PLAY CHARACTER JUMP ANIMATION
    PlayCharacterJump: function () {
        character.animations.play('characterJump', 30, false);
    },
    //STOP CHARACTER JUMP ANIMATION
    StopCharacterJump: function () {
        character.animations.stop('characterJump');
    },

    // FOR MOVING THE CHARACTER
    ApplyCharacterVelocity: function () {
        character.body.velocity.x = 0.14;
    }, // END OF applyCharacterVelocity FUNCTION


    //CHECK THE COLLISION OF CHARACTER WITH BLOCKS OR OBSTACLES
    CollisionEvent: function (body, bodyB, shapeA, shapeB, equation) {

        if (body.y > character.body.y) {

            var key = body.sprite.key;
            var splitKey = key.split('_')[0];
            standingOnBlock = body;
            if (splitKey == "obstacle") {
                if (isGameRunning == true) {
                    // clearInterval(characterWalkSoundInterval);
                    game.time.events.remove(characterWalkSoundInterval);
                    pauseButton.inputEnabled = false;
                    SoundManager.StopGameplayBgSound();
                    SoundManager.StopCharacterSound();
                    Background.StopLeafAnimation();
                    Background.StopWaterAnimation();
                    Background.StopFireflyAnimation();
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
                    // FOR SHAKE THE SCREEN
                    game.camera.shake(0.02, 500);

                    isGameRunning = false;
                    isSwipeActive = false;

                    isDie = true;


                    canJump = false;
                }
            }
        }

        // if (character.body.y < 330) {
        //     // if (isGameRunning == true) {
        //     //     isGameRunning = false;
        //     // }
        // }

        // CHARCTER HIT
        if (body.y < 600) {

            if (isGameRunning == true) {

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
                isDie = true;

                isSwipeActive = false;
            }
        } // END OF HIT CHARACTER CHECKING IF STATEMENT


        // CHARCTER FALL
        if (body.y > 600) {
            if (isGameRunning == true) {
                // clearInterval(characterWalkSoundInterval);
                game.time.events.remove(characterWalkSoundInterval);
                pauseButton.inputEnabled = false;
                SoundManager.StopGameplayBgSound();
                SoundManager.StopCharacterSound();
                Background.StopLeafAnimation();
                Background.StopWaterAnimation();
                Background.StopFireflyAnimation();
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

                // STOP CHARACTER WALK ANIMATION
                Character.StopCharacterWalkAnimation();
                //PLAY FALL ANIMATION
                Character.PlayCharacterFall();

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
                isDie = true;

                isSwipeActive = false;
            }

        } // END OF FALL CHARACTER CHECKING IF STATEMENT

        if (isDie) {
            var hitTween = game.add.tween(character.position).to({ y: 600 }, 400, Phaser.Easing.Linear.In, true, 300);
            hitTween.onComplete.add(function () {
                character.visible = false;
                waterFall.visible = true;
                var anim = waterFall.animations.play('water_fall_animation', 20, false);
                anim.onComplete.add(function () {
                    waterFall.visible = false;
                    isDie = false;
                });
                GameAnalytics("addDesignEvent", "ad:requested");
                PlayzhubEventHandler.RequestAD();
                setTimeout(GameOverPopup.ShowGameOverPopup, 500);
            });
        }

        //CHARACTER HIT WHEN THE CHARACTER IS FALL DOWN THE ORIGINAL POSITION AND THE BLOCK IS ITS ORIGINAL POSITION
        if (body.y == 600 && character.body.y > 450) {
            if (isGameRunning == true) {
                clearInterval(characterWalkSoundInterval);
                pauseButton.inputEnabled = false;
                SoundManager.StopCharacterSound();
                SoundManager.StopGameplayBgSound();
                Background.StopLeafAnimation();
                Background.StopWaterAnimation();
                Background.StopFireflyAnimation();
                // // FOR PLAY GAME OVER SOUND
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

                // STOP CHARACTER WALK ANIMATION
                Character.StopCharacterWalkAnimation();
                //PLAY FALL ANIMATION
                Character.PlayCharacterFall();

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
                isDie = true;

                isSwipeActive = false;
            }

        } // END OF HIT CHARACTER CHECKING IF STATEMENT WHEN THE BLOCK IS ORIGINAL POSITION






    },




}