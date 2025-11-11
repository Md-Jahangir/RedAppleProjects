var gamePlayBackground;
var sideBar;
var gameplayWhiteBackground;
//Input Assets
var bird1,bird2,duck1,duck2,pig1,pig2,sheep1,sheep2,fish1,fish2;
var birdCollisonArea,fishCollisonArea1,fishCollisonArea2,sheepCollisonArea,pigCollisonArea;
var itemNumber = 0;
var villageImageSequence;
var isCollisionCheck = false;

var GamePlay = function() {};
GamePlay.prototype = {
    init: function() {
        Utils.ScaleManager();
        console.log("The Gameplay screen........................");
    },
    preload: function() {
        gamePage = "GameplayScreen";
    },
    render: function(){
        //  FPS debug info
        // debugText = game.debug.text('FPS: ' + game.time.fps,240, 40, "#ffffff");
    },
    create: function() {   
        SoundManager.PlayGameSound(); 
        gameplayWhiteBackground = Utils.SpriteSettingsControl(gameplayWhiteBackground, 320, 180, 'whitePixel', "true", "true", 0.5, 0.5, 10000, 10000, "false");
        gamePlayBackground = Utils.SpriteSettingsControl(gamePlayBackground, 250*2, 180*2, 'backgroundImage', "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, "false");
        sideBar = Utils.SpriteSettingsControl(sideBar, 570*2, 180*2, 'sideBar', "true", "true", 0.5, 0.5, 1*2, 0.8*2, "false");
        // gameplayWhiteBackground.inputEnabled = true;
        // gameplayWhiteBackground.input.useHandCursor = true;
        //Load Input Items
        bird1 = Utils.ButtonSettingsControl(bird1, 532*2, 222*2, 'bird1', this.Bird1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        bird1.input.useHandCursor = true;
        bird2 = Utils.ButtonSettingsControl(bird2, 594*2, 251*2, 'bird2', this.Bird2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        bird2.input.useHandCursor = true;

        duck1 = Utils.ButtonSettingsControl(duck1, 591*2, 210*2, 'duck1', this.Duck1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        duck1.input.useHandCursor = true;
        duck2 = Utils.ButtonSettingsControl(duck2, 535*2, 177*2, 'duck2', this.Duck2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        duck2.input.useHandCursor = true;

        pig1 = Utils.ButtonSettingsControl(pig1, 591*2, 160*2, 'pig1', this.Pig1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        pig1.input.useHandCursor = true;
        pig2 = Utils.ButtonSettingsControl(pig2, 535*2, 127*2, 'pig2', this.Pig2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, -0.8*2, 0.8*2, this);
        pig2.input.useHandCursor = true;

        sheep1 = Utils.ButtonSettingsControl(sheep1, 536*2, 79*2, 'sheep1', this.Sheep1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        sheep1.input.useHandCursor = true;
        sheep2 = Utils.ButtonSettingsControl(sheep2, 593*2, 108*2, 'sheep2', this.Sheep2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, -0.8*2, 0.8*2, this);
        sheep2.input.useHandCursor = true;

        fish1 = Utils.ButtonSettingsControl(fish1, 591*2, 286*2, 'fish1', this.Fish1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        fish1.input.useHandCursor = true;
        fish2 = Utils.ButtonSettingsControl(fish2, 533*2, 264*2, 'fish2', this.Fish2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        fish2.input.useHandCursor = true;

        //Load Collision Areas
        birdCollisonArea = Utils.SpriteSettingsControl(birdCollisonArea, 95*2, 125*2, 'birdArea', "true", "true", 0.5, 0.5, 1.4, 1.2, "false");
        birdCollisonArea.alpha = 0.001;
        fishCollisonArea1 = Utils.SpriteSettingsControl(fishCollisonArea1, 105, 506, 'fishArea1', "true", "true", 0.5, 0.5, 1.85, 0.2, "false");
        fishCollisonArea1.alpha = 0.001;
        // fishCollisonArea1.tint = 0x000000;
        
        fishCollisonArea2 = Utils.SpriteSettingsControl(fishCollisonArea2, 730, 440, 'fishArea2', "true", "true", 0.5, 0.5, 1.65, 0.4, "false");
        fishCollisonArea2.alpha = 0.001;
        // fishCollisonArea2.tint = 0x000000;

        sheepCollisonArea = Utils.SpriteSettingsControl(sheepCollisonArea, 440*2, 140*2, 'sheepArea', "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, "false");
        sheepCollisonArea.alpha = 0.001;
        pigCollisonArea = Utils.SpriteSettingsControl(pigCollisonArea, 348*2, 283*2, 'pigArea', "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, "false");
        pigCollisonArea.alpha = 0.001;
        // game.canvas.addEventListener('mousedown', this.requestLock);
        game.input.addMoveCallback(this.moveDown, this);
    },
    update: function(){
        // console.log("The active pointer X.................."+(game.input.mouse.event.movementX)); 
    },
    Bird1BttnDown: function(){
        itemNumber = 1;
    },
    Bird2BttnDown: function(){
        itemNumber = 2;
    },
    Duck1BttnDown: function(){
        itemNumber = 3;
    },
    Duck2BttnDown: function(){
        itemNumber = 4;
    },
    Fish1BttnDown: function(){
        itemNumber = 5;
    },
    Fish2BttnDown: function(){
        itemNumber = 6;
    },
    Sheep1BttnDown: function(){
        itemNumber = 7;
    },
    Sheep2BttnDown: function(){
        itemNumber = 8;
    },
    Pig1BttnDown: function(){
        itemNumber = 9;
    },
    Pig2BttnDown: function(){
        itemNumber = 10;
    },

    checkOverlap: function(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
    
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },
    requestLock: function() {
        console.log("ENter into the request lock");
        game.input.mouse.requestPointerLock();
    },
    moveDown: function(pointer,x,y) {
        if(game.input.activePointer.y < 105){
            game.input.activePointer.y = 105;
        }
        if(game.input.activePointer.y > 610){
            game.input.activePointer.y = 610;
        }
        if(game.input.activePointer.x > 1222){
                game.input.activePointer.x = 1222;
        }
        if(game.input.activePointer.x < 35){
            game.input.activePointer.x = 35;
        }
        // console.log("Mouse Pointer Position.................."+game.input.activePointer.x+","+game.input.activePointer.y);
        switch(itemNumber){
            case 1:
                if(bird1.inputEnabled)
                    bird1.position.set(game.input.activePointer.x,game.input.activePointer.y);
                break;
            case 2:
                if(bird2.inputEnabled)
                    bird2.position.set(game.input.activePointer.x,game.input.activePointer.y);
                break;
            case 3:
                if(duck1.inputEnabled)
                duck1.position.set(game.input.activePointer.x,game.input.activePointer.y);
                break;
            case 4:
                if(duck2.inputEnabled)
                duck2.position.set(game.input.activePointer.x,game.input.activePointer.y);
                break;
            case 5:
                if(fish1.inputEnabled)
                fish1.position.set(game.input.activePointer.x,game.input.activePointer.y);
                break;
            case 6:
                if(fish2.inputEnabled)
                fish2.position.set(game.input.activePointer.x,game.input.activePointer.y);
                break;
            case 7:
                if(sheep1.inputEnabled)
                sheep1.position.set(game.input.activePointer.x,game.input.activePointer.y);
                break;
            case 8:
                if(sheep2.inputEnabled)
                sheep2.position.set(game.input.activePointer.x,game.input.activePointer.y);
                break;
            case 9:
                if(pig1.inputEnabled)
                pig1.position.set(game.input.activePointer.x,game.input.activePointer.y);
                break;
            case 10:
                if(pig2.inputEnabled)
                pig2.position.set(game.input.activePointer.x,game.input.activePointer.y);
                break;
        }
    },
    moveUp: function(){
        this.CheckObjCollison(bird1,birdCollisonArea,1);
        this.CheckObjCollison(bird2,birdCollisonArea,2);

        // this.CheckObjCollison(duck1,fishCollisonArea1,3);
        // this.CheckObjCollison(duck2,fishCollisonArea1,4);
        // this.CheckObjCollison(fish1,fishCollisonArea1,5);
        // this.CheckObjCollison(fish2,fishCollisonArea1,6);

        // this.CheckObjCollison(duck1,fishCollisonArea2,3);
        // this.CheckObjCollison(duck2,fishCollisonArea2,4);
        // this.CheckObjCollison(fish1,fishCollisonArea2,5);
        // this.CheckObjCollison(fish2,fishCollisonArea2,6);
        this.CheckFishCollisionArea(duck1,fishCollisonArea1,fishCollisonArea2,3);
        this.CheckFishCollisionArea(duck2,fishCollisonArea1,fishCollisonArea2,4);
        this.CheckFishCollisionArea(fish1,fishCollisonArea1,fishCollisonArea2,5);
        this.CheckFishCollisionArea(fish2,fishCollisonArea1,fishCollisonArea2,6);

        this.CheckObjCollison(sheep1,sheepCollisonArea,7);
        this.CheckObjCollison(sheep2,sheepCollisonArea,8);
        this.CheckObjCollison(pig1,pigCollisonArea,9);
        this.CheckObjCollison(pig2,pigCollisonArea,10);

        if(!bird1.inputEnabled && !bird2.inputEnabled && !sheep1.inputEnabled && !sheep2.inputEnabled
        && !pig1.inputEnabled && !pig2.inputEnabled && !fish1.inputEnabled && !fish2.inputEnabled && !duck1.inputEnabled && !duck2.inputEnabled)
        {
            console.log("All Done");
            this.PlayEndVideo();
        }
    },
    CheckFishCollisionArea(gameObj,collisionArea1,collisionArea2,number){
        var name = gameObj.key;
        if (this.checkOverlap(gameObj, collisionArea1) || this.checkOverlap(gameObj, collisionArea2)){
            gameObj.inputEnabled = false;
        }
        if ((!this.checkOverlap(gameObj, collisionArea1) && itemNumber == number && !this.checkOverlap(gameObj,sideBar))&&
            (!this.checkOverlap(gameObj, collisionArea2) && itemNumber == number && !this.checkOverlap(gameObj,sideBar))){
            if(!isCollisionCheck){
                isCollisionCheck = true;
                console.log("Enter into the Close Bttn"+name);
                gameObj.loadTexture('closebttn');
                setTimeout(() => {
                    console.log("Enter into the Image Change Bttn");
                    gameObj.loadTexture(name);
                    isCollisionCheck = false;
                    //name = gameObj.key;
                }, 500);
            }
        }
    },
    CheckObjCollison(gameObj,collisionArea,number){
        var name = gameObj.key;
        // if(number != 3 || number != 4 || number != 5 || number != 6){
            if (this.checkOverlap(gameObj, collisionArea)){
                //gameObj.loadTexture(name);
                gameObj.inputEnabled = false;
            }
            if (!this.checkOverlap(gameObj, collisionArea) && itemNumber == number && !this.checkOverlap(gameObj,sideBar)){
                if(!isCollisionCheck){
                    isCollisionCheck = true;
                    console.log("Enter into the Close Bttn"+name);
                    gameObj.loadTexture('closebttn');
                    setTimeout(() => {
                        console.log("Enter into the Image Change Bttn");
                        gameObj.loadTexture(name);
                        isCollisionCheck = false;
                        //name = gameObj.key;
                    }, 500);
                }
            }
        // }
    },
    PlayEndVideo(){
        SoundManager.StopGameSound();
        SoundManager.PlayVideoEndSound();
        villageImageSequence = game.add.sprite(0, 39*2, 'lastImageSequece');
        villageImageSequence.animations.add('run');
        villageImageSequence.animations.play('run', 5, true);
        villageImageSequence.scale.set(0.93*2,0.75*2);
    },
}
