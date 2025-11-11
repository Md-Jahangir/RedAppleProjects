Potrait = function() {};
var text;
var screenRotate;
var backgroundImage;
Potrait.prototype = {
    init: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload: function() {
        //	Progress report
        game.load.image('background_Image','assets/images/gui/overlay.png');
        game.load.image('screen_Rotation','assets/images/screen_rotation.png');
        text = game.add.text(120,680, 'Please Rotate The Screen', { fill: '#ffffff', fontSize: "40px"});
        text.fontWeight = 'bold';
    },
    create: function() {
        backgroundImage = game.add.sprite(360,640,'background_Image');
        backgroundImage.anchor.setTo(0.5,0.5);
        backgroundImage.scale.setTo(2.0,2.0);
        screenRotate = game.add.sprite(280,480,'screen_Rotation');
    },

};