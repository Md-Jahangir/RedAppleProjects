//FOR PLAY BUTTON HINT
var playButtonHintGroup;
var handClickHint;

//FOR UP/DOWN BLOCK HINT
var upBlockHintGroup;
var downBlockHintGroup;
var upArrowHint;
var downArrowHint;

//FOR JUMP HINT
var JumpHintGroup;
var jumpHint;

var Tutorial = {
    //FOR GENERATE PLAY BUTTON HINT
    GeneratePlayButtonHint: function () {
        //ADD GROUP
        playButtonHintGroup = game.add.group();

        //ADD HAND ANIMATION
        handClickHint = Utils.SpriteSettingsControl(handClickHint, 0, 0, 'handClickHint', "true", "true", 0.5, 0.5, 0.8, 0.8);
        handClickHint.animations.add('handClick_animation');
        handClickHint.x = playButton.x + 60;
        handClickHint.y = playButton.y - 150;

        playButtonHintGroup.add(handClickHint);
        playButtonHintGroup.visible = false;

    }, //END OF GeneratePlayButtonHint FUNCTION

    //FOR SHOW THE PLAY BUTTON HINT
    ShowPlayButtonHint: function () {
        game.world.bringToTop(playButtonHintGroup);
        playButtonHintGroup.visible = true;

        handClickHint.animations.play('handClick_animation', 3, true);
        settingButton.inputEnabled = false;
        // parentsButton.inputEnabled = false;

    }, //END OF ShowPlayButtonHint FUNCTION

    //FOR HIDE THE PLAY BUTTON HINT AND ENABLE THE OTHERS BUTTON
    HidePlayButtonHint: function () {
        playButtonHintGroup.visible = false;
        settingButton.inputEnabled = true;
        // parentsButton.inputEnabled = true;

        Database.SaveData("is_play_button_hint_shown", 1);

    }, //END OF HidePlayButtonHint FUNCTION

    //FOR GENERATE THE JUMP HINT
    GenerateJumpHint: function () {
        JumpHintGroup = game.add.group();
        JumpHintGroup.position.set(0, 0);

        //ADD HAND HINTS
        jumpHint = Utils.SpriteSettingsControl(jumpHint, 430, 430, 'singleHandSprite', "true", "true", 0.5, 0.5, 0.7, 0.7);

        JumpHintGroup.add(jumpHint);
        JumpHintGroup.visible = false;


    }, //END OF GenerateJumpHint FUNCTION

    //FOR SHOWING THE JUMP HINT
    ShowJumpHint: function () {
        game.world.bringToTop(JumpHintGroup);
        JumpHintGroup.visible = true;
        pauseButton.inputEnabled = false;

        var tween = game.add.tween(jumpHint.position).to({ y: 150 }, 1000, Phaser.Easing.Linear.Out, true, 500, -1);
        tween.yoyo(true, 500);
    }, //END OF ShowJumpHint FUNCTION

    //FOR HIDE THE JUMP HINT
    HideJumpHint: function () {
        JumpHintGroup.visible = false;
        pauseButton.inputEnabled = true;
    }, //END OF HideJumpHint FUNCTION

    //FOR GENERATE UP BLOCK HINT
    GenerateUpBlockHint: function () {
        //ADD GROUP
        upBlockHintGroup = game.add.group();

        //ADD ARROW HINTS
        upArrowHint = Utils.SpriteSettingsControl(upArrowHint, 0, 0, 'arrowHint', "true", "true", 0.5, 0.5, 3.5, 3.5);
        upArrowHint.angle = -54;
        upArrowHint.animations.add('upArrow_animation');
        upArrowHint.x = 800; //1210;
        upArrowHint.y = 320;
        upArrowHint.tint = '0xd62736';

        upBlockHintGroup.add(upArrowHint);

        upBlockHintGroup.visible = false;

    }, //END OF GenerateUpBlockHint FUNCTION

    //FOR SHOW UP BLOCK HINT
    ShowUpBlockHint: function () {
        game.world.bringToTop(upBlockHintGroup);
        upBlockHintGroup.visible = true;
        upArrowHint.animations.play('upArrow_animation', 20, true);
        pauseButton.inputEnabled = false;
    }, //END OF ShowUpBlockHint FUNCTION

    //FOR HIDE THE UP BLOCK HINT
    HideUpBlockHint: function () {
        upBlockHintGroup.visible = false;
        pauseButton.inputEnabled = true;
    }, //END OF HideUpBlockHint FUNCTION


    //FOR GENERATE DOWN BLOCK HINT
    GenerateDownBlockHint: function () {
        //ADD GROUP
        downBlockHintGroup = game.add.group();

        //ADD ARROW HINTS
        downArrowHint = Utils.SpriteSettingsControl(downArrowHint, 0, 0, 'arrowHint', "true", "true", 0.5, 0.5, 3.5, 3.5);
        downArrowHint.angle = 125;
        downArrowHint.animations.add('downArrow_animation');
        downArrowHint.x = 800; //1210;
        downArrowHint.y = 710;
        downArrowHint.tint = '0xd62736';

        downBlockHintGroup.add(downArrowHint);
        downBlockHintGroup.visible = false;

    }, //END OF GenerateDownBlockHint FUNCTION

    //FOR SHOW DOWN BLOCK HINT
    ShowDownBlockHint: function () {
        game.world.bringToTop(upBlockHintGroup);
        downBlockHintGroup.visible = true;
        downArrowHint.animations.play('downArrow_animation', 20, true);
        pauseButton.inputEnabled = false;
    }, //END OF ShowDownBlockHint FUNCTION

    //FOR HIDE THE DOWN BLOCK HINT
    HideDownBlockHint: function () {
        downBlockHintGroup.visible = false;
        pauseButton.inputEnabled = true;
    }, //END OF HideDownBlockHint FUNCTION

}