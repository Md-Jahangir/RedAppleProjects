var loadImageUrl = "Images/Costumes/";
var LoadAssets = {
    LoadAllAssets: function() {
        //Background Image
        game.load.image('transparentImage', 'Images/transparentImage.png');
        game.load.image('whitePixel', 'Images/one_pixel_white.png');
        game.load.image('costumes', 'Images/costumes.png');

        game.load.image('bg', loadImageUrl+'bg1.png');
        // game.load.image('sideBar', 'sideBar.png');
        //Icons
        game.load.image('boy', loadImageUrl+'boy.png');
        game.load.image('girl', loadImageUrl+'girl.png');
        game.load.image('btnNext', loadImageUrl+'btnNext.png');
        game.load.image('btnDone', loadImageUrl+'btnDone.png');
        //
        game.load.image('taskbar', loadImageUrl+'taskbar.png');
        //costumes
        game.load.image('elephant1', loadImageUrl+'costumes/elephant1.png');
        game.load.image('elephant2', loadImageUrl+'costumes/elephant2.png');
        game.load.image('Giraffe1', loadImageUrl+'costumes/Giraffe1.png');
        game.load.image('Giraffe2', loadImageUrl+'costumes/Giraffe2.png');
        game.load.image('peacock1', loadImageUrl+'costumes/peacock1.png');
        game.load.image('peacock2', loadImageUrl+'costumes/peacock2.png');
        game.load.image('alien1', loadImageUrl+'costumes/alien1.png');
        game.load.image('alien2', loadImageUrl+'costumes/alien2.png');
        game.load.image('bee1', loadImageUrl+'costumes/bee1.png');
        game.load.image('bee2', loadImageUrl+'costumes/bee2.png');        
        game.load.image('butterfly1', loadImageUrl+'costumes/butterfly1.png');
        game.load.image('butterfly2', loadImageUrl+'costumes/butterfly2.png');
        game.load.image('pumpkin1', loadImageUrl+'costumes/pumpkin1.png');
        game.load.image('pumpkin2', loadImageUrl+'costumes/pumpkin2.png');
        game.load.image('robot1', loadImageUrl+'costumes/robot1.png');
        game.load.image('robot2', loadImageUrl+'costumes/robot2.png');
        //loading
        game.load.spritesheet('sprite',loadImageUrl+'sprite.png',6432/8,3924/9,70);
        //audio
        game.load.audio('does_not_matched','Sound/Costumes/does_not_matched.mp3');
        game.load.audio('matched','Sound/Costumes/matched.mp3');

    }
}