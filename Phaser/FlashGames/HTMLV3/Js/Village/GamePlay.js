var gamePlayBackground;
var sideBar;
var gameplayWhiteBackground;
//Input Assets
var bird1,bird2,duck1,duck2,pig1,pig2,sheep1,sheep2,fish1,fish2;
var birdCollisonArea,fishCollisonArea1,fishCollisonArea2,fishCollisonArea3,fishCollisonArea4,sheepCollisonArea,pigCollisonArea;
var itemNumber = 0;
var villageImageSequence;
var isCollisionCheck = false;
var alreadyCollided=false;
var GamePlay = function() {};
GamePlay.prototype = {
    init: function() {
        Utils.ScaleManager();
        if(game.device.touch){
            game.input.mouse.stop();
        }
        //console.log("The Gameplay screen........................"+game.width+" "+game.height);
    },
    preload: function() {
        gamePage = "GameplayScreen";
    },
    render: function(){
        //  FPS debug info
        // debugText = game.debug.text('FPS: ' + game.time.fps,240, 40, "#ffffff");
        // game.debug.body(sideBar, 'rgba(0, 255, 255, 0.5)');
    },
    create: function() { 
        
        SoundManager.PlayGameSound(); 
        gameplayWhiteBackground = Utils.SpriteSettingsControl(gameplayWhiteBackground, 320, 180, 'whitePixel', "true", "true", 0.5, 0.5, 10000, 10000, "false");
        gamePlayBackground = Utils.SpriteSettingsControl(gamePlayBackground, 250*2, 250, 'backgroundImage', "true", "true", 0.5, 0.5, 0.8*2, 0.81*2, "false");
        sideBar = Utils.SpriteSettingsControl(sideBar, 1098, 264, 'sideBar', "true", "true", 0.5, 0.5, 1.43, 1.55, "false");
        // gameplayWhiteBackground.inputEnabled = true;
        // gameplayWhiteBackground.input.useHandCursor = true;

        //Load Collision Areas
        birdCollisonArea = Utils.SpriteSettingsControl(birdCollisonArea, 185, 173, 'birdArea', "true", "true", 0.5, 0.5, 1.2, 1, "false");
        birdCollisonArea.alpha = 0.001;
        fishCollisonArea1 = Utils.SpriteSettingsControl(fishCollisonArea1, 60, 429, 'fishArea1', "true", "true", 0.5, 0.5, 1.85, 0.2, "false");
        // fishCollisonArea1.alpha = 0.001;
        fishCollisonArea1.alpha = 0.001;
        // fishCollisonArea1.tint = 0x000000;
        
        fishCollisonArea2 = Utils.SpriteSettingsControl(fishCollisonArea2, 690, 343, 'fishArea2', "true", "true", 0.5, 0.5, 1.3, 0.3, "false");
        // fishCollisonArea2 = Utils.SpriteSettingsControl(fishCollisonArea2, 715, 343, 'fishArea2', "true", "true", 0.5, 0.5, 1.3, 0.3, "false");
        // //fishCollisonArea2 = Utils.SpriteSettingsControl(fishCollisonArea2, 730, 343, 'fishArea2', "true", "true", 0.5, 0.5, 1.5, 0.5, "false");
        fishCollisonArea2.alpha = 0.001;
        // fishCollisonArea2.tint = 0x000000;

        fishCollisonArea3 = Utils.SpriteSettingsControl(fishCollisonArea3, 970, 330, 'fishArea3', "true", "true", 0.5, 0.5, 0.2, 0.8, "false");
        fishCollisonArea3.alpha = 0.001;
        // fishCollisonArea3.tint = 0x000000;

        fishCollisonArea4 = Utils.SpriteSettingsControl(fishCollisonArea4, 920, 330, 'fishArea3', "true", "true", 0.5, 0.5, 1.4, 1, "false");
        fishCollisonArea4.alpha = 0.001;
        // fishCollisonArea4.tint = 0x000000;

        sheepCollisonArea = Utils.SpriteSettingsControl(sheepCollisonArea, 865, 183, 'sheepArea', "true", "true", 0.5, 0.5, 0.97, 0.4, "false");
        sheepCollisonArea.alpha = 0.001;
        pigCollisonArea = Utils.SpriteSettingsControl(pigCollisonArea, 726, 473, 'pigArea', "true", "true", 0.5, 0.5, 1.32, 1.2, "false");
        pigCollisonArea.alpha = 0.001;

        //Load Input Items
        bird1 = Utils.ButtonSettingsControl(bird1, 528*2, 421, 'bird1', this.Bird1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        bird1.input.useHandCursor = true;
        bird1.prevX=(528*2);
        bird1.prevY=421;
        bird2 = Utils.ButtonSettingsControl(bird2, 570*2, 372, 'bird2', this.Bird2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        bird2.input.useHandCursor = true;
        bird2.prevX=(570*2);    
        bird2.prevY=372;
        duck1 = Utils.ButtonSettingsControl(duck1, 571*2, 277, 'duck1', this.Duck1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        duck1.input.useHandCursor = true;
        duck1.prevX=(571*2);    
        duck1.prevY=277;
        duck2 = Utils.ButtonSettingsControl(duck2, 525*2, 320, 'duck2', this.Duck2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        duck2.input.useHandCursor = true;
        duck2.prevX=(525*2);    
        duck2.prevY=320;
        pig1 = Utils.ButtonSettingsControl(pig1, 570*2, 160, 'pig1', this.Pig1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        pig1.input.useHandCursor = true;
        pig1.prevX=(570*2);    
        pig1.prevY=160;
        pig2 = Utils.ButtonSettingsControl(pig2, 525*2, 205, 'pig2', this.Pig2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, -0.8*2, 0.8*2, this);
        pig2.input.useHandCursor = true;
        pig2.prevX=(525*2);    
        pig2.prevY=205;

        sheep2 = Utils.ButtonSettingsControl(sheep2, 573*2, 55, 'sheep2', this.Sheep2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, -0.8*2, 0.8*2, this);
        sheep2.input.useHandCursor = true; 
        sheep2.prevX=(573*2);    
        sheep2.prevY=55;
        sheep1 = Utils.ButtonSettingsControl(sheep1, 525*2, 110, 'sheep2', this.Sheep1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, -0.8*2, 0.8*2, this);
        sheep1.input.useHandCursor = true;
        sheep1.prevX=(525*2);    
        sheep1.prevY=110;
        fish1 = Utils.ButtonSettingsControl(fish1, 571*2,464 , 'fish1', this.Fish1BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        fish1.input.useHandCursor = true;
        fish1.prevX=(571*2);    
        fish1.prevY=464;
        fish2 = Utils.ButtonSettingsControl(fish2, 523*2, 490, 'fish2', this.Fish2BttnDown, null, null, this.moveUp, "true", "true", 0.5, 0.5, 0.8*2, 0.8*2, this);
        fish2.input.useHandCursor = true;
        fish2.prevX=(523*2);    
        fish2.prevY=490;

        
        // game.canvas.addEventListener('mousedown', this.requestLock);
        game.input.addMoveCallback(this.moveDown, this);
    },
    update: function(){
        // //console.log("The active pointer X.................."+(game.input.mouse.event.movementX)); 
    },
    Bird1BttnDown: function(){
        // if(itemNumber!=0)
        // {  
        //     // var obj=this.ReturnObjectForRespectiveItem(itemNumber);  
        //     // //console.log(obj.key);
        //     this.PutObjectBack(this.ReturnObjectForRespectiveItem(itemNumber));
        // }
        itemNumber = 1;
    },
    Bird2BttnDown: function()
    {
        // if(itemNumber!=0)
        // {
        //     this.PutObjectBack(this.ReturnObjectForRespectiveItem(itemNumber));
        // }
        itemNumber = 2;
    },
    Duck1BttnDown: function()
    {
        // if(itemNumber!=0)
        // {
        //     this.PutObjectBack(this.ReturnObjectForRespectiveItem(itemNumber));            
        // }
        itemNumber = 3;
    },
    Duck2BttnDown: function()
    {
        // if(itemNumber!=0)
        // {
        //     this.PutObjectBack(this.ReturnObjectForRespectiveItem(itemNumber));            
        // }
        itemNumber = 4;
    },
    Fish1BttnDown: function()
    {
        // if(itemNumber!=0)
        // {
        //     this.PutObjectBack(this.ReturnObjectForRespectiveItem(itemNumber));            
        // }
        itemNumber = 5;
    },
    Fish2BttnDown: function()
    {
        // if(itemNumber!=0)
        // {
        //     this.PutObjectBack(this.ReturnObjectForRespectiveItem(itemNumber));    
        // }
        itemNumber = 6;
    },
    Sheep1BttnDown: function(){
        // //console.log("Sheep1BttnDown");
        // if(itemNumber!=0)
        // {
        //     this.PutObjectBack(this.ReturnObjectForRespectiveItem(itemNumber));            
        // }
        itemNumber = 7;
    },
    Sheep2BttnDown: function()
    {
        // if(itemNumber!=0)
        // {
        //     this.PutObjectBack(this.ReturnObjectForRespectiveItem(itemNumber));            
        // }
        itemNumber = 8;
    },
    Pig1BttnDown: function()
    {
        // if(itemNumber!=0)
        // {
        //     this.PutObjectBack(this.ReturnObjectForRespectiveItem(itemNumber));            
        // }
        itemNumber = 9;
    },
    Pig2BttnDown: function()
    {
        // if(itemNumber!=0)
        // {
        //     this.PutObjectBack(this.ReturnObjectForRespectiveItem(itemNumber));    
        // }
        itemNumber = 10;
    },

    checkOverlap: function(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
    
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },
    requestLock: function() {
        //console.log("ENter into the request lock");
        game.input.mouse.requestPointerLock();
    },
    moveDown: function(pointer,x,y) {
        if(game.input.activePointer.y < 25){
            game.input.activePointer.y = 25;
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
        // //console.log("Mouse Pointer Position.................."+game.input.activePointer.x+","+game.input.activePointer.y);
        switch(itemNumber){
            case 1:
                if(bird1.inputEnabled)
                bird1.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                // bird1.position.set(game.input.activePointer.x,game.input.activePointer.y);
                game.world.bringToTop(bird1);
                break;
            case 2:
                if(bird2.inputEnabled)
                bird2.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                // bird2.position.set(game.input.activePointer.x,game.input.activePointer.y);
                game.world.bringToTop(bird2);
                break;
            case 3:
                if(duck1.inputEnabled)
                duck1.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                // duck1.position.set(game.input.activePointer.x,game.input.activePointer.y);
                game.world.bringToTop(duck1);
                break;
            case 4:
                if(duck2.inputEnabled)
                duck2.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                // duck2.position.set(game.input.activePointer.x,game.input.activePointer.y);
                game.world.bringToTop(duck2);
                break;
            case 5:
                if(fish1.inputEnabled)
                fish1.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                // fish1.position.set(game.input.activePointer.x,game.input.activePointer.y);
                game.world.bringToTop(fish1);

                break;
            case 6:
                if(fish2.inputEnabled)
                fish2.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                // fish2.position.set(game.input.activePointer.x,game.input.activePointer.y);
                game.world.bringToTop(fish2);

                break;
            case 7:
                if(sheep1.inputEnabled)
                sheep1.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                // sheep1.position.set(game.input.activePointer.x,game.input.activePointer.y);
                game.world.bringToTop(sheep1);

                break;
            case 8:
                if(sheep2.inputEnabled)
                sheep2.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                // sheep2.position.set(game.input.activePointer.x,game.input.activePointer.y);
                game.world.bringToTop(sheep2);

                break;
            case 9:
                if(pig1.inputEnabled)
                pig1.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                // pig1.position.set(game.input.activePointer.x,game.input.activePointer.y);
                game.world.bringToTop(pig1);

                break;
            case 10:
                if(pig2.inputEnabled)
                pig2.position.setTo(((game.input.activePointer.x + game.camera.position.x) / game.camera.scale.x),((game.input.activePointer.y + game.camera.position.y) / game.camera.scale.y));
                // pig2.position.set(game.input.activePointer.x,game.input.activePointer.y);
                game.world.bringToTop(pig2);
                break;
        }
    },
    moveUp: function(){
        //console.log("move up");
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
        this.CheckFishCollisionArea(duck1,fishCollisonArea1,fishCollisonArea2,fishCollisonArea3,fishCollisonArea4,3);
        this.CheckFishCollisionArea(duck2,fishCollisonArea1,fishCollisonArea2,fishCollisonArea3,fishCollisonArea4,4);
        this.CheckFishCollisionArea(fish1,fishCollisonArea1,fishCollisonArea2,fishCollisonArea3,fishCollisonArea4,5);
        this.CheckFishCollisionArea(fish2,fishCollisonArea1,fishCollisonArea2,fishCollisonArea3,fishCollisonArea4,6);

        this.CheckObjCollison(sheep1,sheepCollisonArea,7);
        this.CheckObjCollison(sheep2,sheepCollisonArea,8);
        this.CheckObjCollison(pig1,pigCollisonArea,9);
        this.CheckObjCollison(pig2,pigCollisonArea,10);

        if(!bird1.inputEnabled && !bird2.inputEnabled && !sheep1.inputEnabled && !sheep2.inputEnabled
        && !pig1.inputEnabled && !pig2.inputEnabled && !fish1.inputEnabled && !fish2.inputEnabled && !duck1.inputEnabled && !duck2.inputEnabled)
        {
            //console.log("All Done");
            this.PlayEndVideo();
        }
    },
    CheckFishCollisionArea(gameObj,collisionArea1,collisionArea2,collisionArea3,collisionArea4,number){
        var name = gameObj.key;
        // //console.log("this.checkOverlap(gameObj, collisionArea1) "+this.checkOverlap(gameObj, collisionArea1));
        // //console.log("this.checkOverlap(gameObj, collisionArea1) "+this.checkOverlap(gameObj, collisionArea2));
        // //console.log("this.checkOverlap(gameObj, collisionArea1) "+this.checkOverlap(gameObj, collisionArea3));
        // //console.log("this.checkOverlap(gameObj,sideBar)) "+this.checkOverlap(gameObj,sideBar));
        // //console.log("CheckFishCollisionArea---------------------------"+itemNumber+" "+number);
        if(this.checkOverlap(gameObj, collisionArea4) &&!alreadyCollided)
        {
            //console.log("csccdc");
            if(gameObj.key=="duck1" ||gameObj.key=="duck2")
            {
                 alreadyCollided=true;
                //console.log("y----"+(Math.abs(gameObj.y-fishCollisonArea3.y)));
                //console.log("x----"+(Math.abs(gameObj.x-fishCollisonArea3.x)));
                if((Math.abs(gameObj.x-fishCollisonArea3.x)<100)&& (Math.abs(gameObj.y-fishCollisonArea3.y)<60))//40
                {
                    // //console.log("ok (Math.abs(gameObj.x-fishCollisonArea3.x) "+(Math.abs(gameObj.x-fishCollisonArea3.x)));
                    gameObj.inputEnabled = false;
                    
                }
                else
                {
                    // //console.log("cross");

                    this.ChangeTextureToCross(gameObj, name);
                }
            }
            else if(gameObj.key=="fish1" ||gameObj.key=="fish2")
            {
                if((Math.abs(gameObj.x-fishCollisonArea3.x)<100)&& (Math.abs(gameObj.y-fishCollisonArea3.y)<52))//40
                {
                    // //console.log("ok (Math.abs(gameObj.x-fishCollisonArea3.x) "+(Math.abs(gameObj.x-fishCollisonArea3.x)));
                    gameObj.inputEnabled = false;
                }
                else
                {
                    //console.log("cross");
                    this.ChangeTextureToCross(gameObj, name);
                }
            }
            else
            {
                gameObj.inputEnabled = false;
            }
        }
        else if (this.checkOverlap(gameObj, collisionArea1) || this.checkOverlap(gameObj, collisionArea2))
        {
            alreadyCollided=true;
            // //console.log("cdscc");            
            //console.log("y2----"+(Math.abs(gameObj.y-fishCollisonArea2.y)));
            // //console.log("y----"+(Math.abs(gameObj.y-fishCollisonArea1.y)));

            if(gameObj.key=="duck1" ||gameObj.key=="duck2")
            {
                //console.log("Cdcsdc");
                if(Math.abs(gameObj.y-fishCollisonArea1.y)<40)//40
                {
                //console.log("Cdcsdc");

                    gameObj.inputEnabled = false;
                }
                else if(Math.abs(gameObj.y-fishCollisonArea2.y)<40)//40
                {
                    //console.log("Cdcsdc");
                    gameObj.inputEnabled = false;
                }
                else
                {
                    this.ChangeTextureToCross(gameObj, name);
                }
            }
            // else if(gameObj.key=="duck1" ||gameObj.key=="duck2")
            // {
            //     if(Math.abs(gameObj.y-fishCollisonArea1.y)<40)
            //     {
            //         gameObj.inputEnabled = false;
            //     }
            //     else if(Math.abs(gameObj.y-fishCollisonArea2.y)<40)
            //     {
            //         gameObj.inputEnabled = false;
            //     }
            //     else
            //     {
            //         this.ChangeTextureToCross(gameObj, name);
            //     }
            // }
            else if(gameObj.key=="fish1" ||gameObj.key=="fish2")
            {
                if(Math.abs(gameObj.y-fishCollisonArea1.y)<40)
                {
                    gameObj.inputEnabled = false;
                }
                else if(Math.abs(gameObj.y-fishCollisonArea2.y)<40)
                {
                    gameObj.inputEnabled = false;
                }
                else
                {
                    //console.log("cross");

                    this.ChangeTextureToCross(gameObj, name);
                }
            }
            else
            {
                gameObj.inputEnabled = false;
            }
        }
        
        else if(this.checkOverlap(gameObj, collisionArea3) &&!alreadyCollided)
        {
            //console.log("csccdc");
            if(gameObj.key=="duck1" ||gameObj.key=="duck2")
            {
                 alreadyCollided=true;
                //console.log("y----"+(Math.abs(gameObj.y-fishCollisonArea3.y)));
                //console.log("x----"+(Math.abs(gameObj.x-fishCollisonArea3.x)));
                if((Math.abs(gameObj.x-fishCollisonArea3.x)<5)&& (Math.abs(gameObj.y-fishCollisonArea3.y)<75))//66
                {
                    //console.log("ok (Math.abs(gameObj.x-fishCollisonArea3.x) "+(Math.abs(gameObj.x-fishCollisonArea3.x)));
                    gameObj.inputEnabled = false;
                    
                }
                else
                {
                    //console.log("cross");

                    this.ChangeTextureToCross(gameObj, name);
                }
            }
            else if(gameObj.key=="fish1" ||gameObj.key=="fish2")
            {
                if((Math.abs(gameObj.x-fishCollisonArea3.x)<12)&& (Math.abs(gameObj.y-fishCollisonArea3.y)<66))//40
                {
                    //console.log("ok (Math.abs(gameObj.x-fishCollisonArea3.x) "+(Math.abs(gameObj.x-fishCollisonArea3.x)));
                    gameObj.inputEnabled = false;
                }
                else
                {
                    //console.log("cross");
                    this.ChangeTextureToCross(gameObj, name);
                }
            }
            else
            {
                gameObj.inputEnabled = false;
            }
        }
       
        // else if(!alreadyCollided &&this.checkOverlap(gameObj,sideBar))
        // {
        //     //console.log("got it");
        //      this.PutObjectBack(gameObj);
        // (!this.checkOverlap(gameObj, collisionArea1))
        //     ||(!this.checkOverlap(gameObj, collisionArea2))
        //     ||(!this.checkOverlap(gameObj, collisionArea3)) 
        //     && if (
            // (itemNumber == number) 
            // && (this.checkOverlap(gameObj,sideBar))
            // )
        // }
        else if (itemNumber == number)
        {
            //console.log("isCollisionCheck--------------"+isCollisionCheck);
            if(!isCollisionCheck){
                // isCollisionCheck = true;
                //console.log("Enter into the Close Bttn"+gameObj.key);
                // gameObj.loadTexture('closebttn');
                // setTimeout(() => {
                //     //console.log("Enter into the Image Change Bttn");
                //     gameObj.loadTexture(name);
                //     isCollisionCheck = false;
                //     //name = gameObj.key;
                // }, 500);
                this.ChangeTextureToCross(gameObj, name);
            }
        }
        alreadyCollided=false;
    },
    CheckObjCollison(gameObj,collisionArea,number){
        var name = gameObj.key;
        //console.log("CheckObjCollison---------------------------");
        // if(number != 3 || number != 4 || number != 5 || number != 6){
            if (this.checkOverlap(gameObj, collisionArea)){
                //console.log("entef duck");
                //gameObj.loadTexture(name);
                if(gameObj.key=="sheep1" ||gameObj.key=="sheep2")
                {
                    if(Math.abs(gameObj.y-sheepCollisonArea.y)<30)
                    {
                        gameObj.inputEnabled = false;
                    }
                    else
                    {
                        this.ChangeTextureToCross(gameObj,name);
                    }
                }
                else if(gameObj.key=="pig1" ||gameObj.key=="pig2")
                {
                    if(Math.abs(gameObj.y-pigCollisonArea.y)<30)
                    {
                        gameObj.inputEnabled = false;
                    }
                    else
                    {
                        this.ChangeTextureToCross(gameObj,name);
                    }
                }
                else if(gameObj.key=="bird1" ||gameObj.key=="bird2")
                {
                    if(Math.abs(gameObj.y-birdCollisonArea.y)<40)
                    {
                        gameObj.inputEnabled = false;
                    }
                    else if(Math.abs(gameObj.x-birdCollisonArea.x)<30)
                    {
                        gameObj.inputEnabled = false;
                    }
                    else
                    {
                        this.ChangeTextureToCross(gameObj,name);
                    }
                }
            }
            // if (!this.checkOverlap(gameObj, collisionArea) && itemNumber == number && !this.checkOverlap(gameObj,sideBar)){
            else if(itemNumber==number)    
            {
                if(!isCollisionCheck){
                    // isCollisionCheck = true;
                    //console.log("Enter into the Close Bttn");
                    // gameObj.loadTexture('closebttn');
                    // setTimeout(() => {
                        //     //console.log("Enter into the Image Change Bttn");
                        //     gameObj.loadTexture(name);
                        //     isCollisionCheck = false;
                        //     //name = gameObj.key;
                        // }, 500);
                        this.ChangeTextureToCross(gameObj,name);
                    }
            }
            // else if(this.checkOverlap(gameObj,sideBar))
            // {
            //         //console.log("this.checkOverlap(gameObj,sideBar)----"+this.checkOverlap(gameObj,sideBar));
            //         isCollisionCheck = false;
            //         itemNumber=0;
                    // this.PutObjectBack(gameObj);
            // }
        // }
    },
    PlayEndVideo(){
        SoundManager.StopGameSound();
        SoundManager.PlayVideoEndSound();
        villageImageSequence = game.add.sprite(0, 0, 'lastImageSequece');
        villageImageSequence.scale.set(2.3 ,1.4);//2.3x1.32
        villageImageSequence.animations.add('run');
        villageImageSequence.animations.play('run', 5, true);
        game.world.bringToTop(villageImageSequence);
    },
    ChangeTextureToCross(gameObj,name)
    {
        isCollisionCheck = true;
        //console.log("Enter into the Close Bttn "+name);
        gameObj.loadTexture('closebttn');
        gameObj.inputEnabled=false;
        setTimeout(() => {
            //console.log("Enter into the Image Change Bttn");
            gameObj.loadTexture(name);
            isCollisionCheck = false;
            itemNumber=0;
            // this.PutObjectBack(gameObj);
            gameObj.position.setTo(gameObj.prevX,gameObj.prevY);
            gameObj.inputEnabled=true;
            //name = gameObj.key;
        }, 500);
    },
    PutObjectBack(gameObj)
    {
        itemNumber=0;
        isCollisionCheck = true;
        gameObj.inputEnabled=false;
        gameObj.position.setTo(gameObj.prevX,gameObj.prevY);
        setTimeout(() => {
            isCollisionCheck = false;
            gameObj.inputEnabled=true;

        }, 100);
        //console.log(gameObj.prevX+" "+gameObj.prevY+" "+gameObj.key);
    },
    // ReturnObjectForRespectiveItem(number)
    // {
    //     //console.log("number "+number);
    //     switch(number)
    //     {
    //         case 1: return (bird1);
    //         case 2: return(bird2);
    //         case 3: return(duck1);
    //         case 4: return(duck2);
    //         case 5: return(fish1);
    //         case 6: return(fish2);
    //         case 7: return(sheep1);
    //         case 8: return(sheep2);
    //         case 9: return(pig1);
    //         case 10:return(pig2);
    //     }
    // }
}
