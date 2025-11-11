var gameplayWhiteBackground;
var gamePlayBackground;
var sideBar;
//Static Elements
var handIcon;
var rotateIcon;
var cat, cup, folk1,folk2, girl, glass, knife1,knife2, light,rope, plate1,plate2, spoon, table,stool1,stool2,frame;
var arr=[];
//Input Assets
var handIconClicked,rotateIconClicked;
var objectToMove;
var objectSelected;
var movableRotateIcon;
//claming max and min
var MaxX;
var MaxY;
var GamePlay = function() {};
GamePlay.prototype = {
    init: function() {
        Utils.ScaleManager();
        if(game.device.touch){
            game.input.mouse.stop();
        }
        // window.alert("Innerwidth "+window.innerWidth+" Innerheight "+window.innerHeight+"\nScreenwidth"+window.screen.width+"Screenheight"+window.screen.height);
    },
    preload: function() {
        gamePage = "GameplayScreen";
        // console.log(window.innerWidth+" "+window.screen.width);
        // console.log(window.innerHeight+" "+window.screen.height);
    },
    render: function() {},
    create: function() {
        var isMobile = /iPhone|iPhoneX|iPad|iPod|Android/i.test(navigator.userAgent);
        if(isMobile)
        {
            MaxX=1060;
            MaxY=560;
        }
        else
        {
            MaxX=1060;
            MaxY=530;
        }
        rotateIconClicked=false;
        objectToMove=null;
        objectSelected=false;
        SoundManager.CreateSound();
        gamePlayBackground = Utils.SpriteSettingsControl(gamePlayBackground, 640, 242, 'whitePixel', "true", "true", 0.5, 0.5, 1280, 1280, this);
        gameplayWhiteBackground = Utils.SpriteSettingsControl(gameplayWhiteBackground, 600, 266, 'image', "true", "true", 0.5, 0.5, 1200, 600, this);
        // gameplayWhiteBackground.tint="0x7884d3";
        sideBar = Utils.SpriteSettingsControl(sideBar, 1132, 279, 'sideBar', "true", "true", 0.5, 0.5, 0.6,1, this);
        sideBar.tint = "0x999999";
        //Static Items
        handIcon = Utils.ButtonSettingsControl(handIcon, 1120, 182, 'hand',this.HandIconPressed,null,null,null,"true", "true", 0.5, 0.5, 0.3, 0.3, this);
        rotateIcon = Utils.ButtonSettingsControl(rotateIcon, 1120, 352, 'rotate',this.RotateIconPressed,null,null,null, "true", "true", 0.5, 0.5, 0.3, 0.3, this);
        movableRotateIcon = Utils.SpriteSettingsControl(movableRotateIcon, 1070, 352, 'rotate',"true", "true", 0.5, 0.5, 0.2, 0.2, this);
        movableRotateIcon.visible=false;
        // playeble items
        table = Utils.ButtonSettingsControl(table, 460, 152, 'table', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.88, 0.88, this);
        table.input.pixelPerfectClick=true;
        plate1 = Utils.ButtonSettingsControl(plate1, 846.3, 69.5, 'plate', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5,1, 1, this);
        plate2 = Utils.ButtonSettingsControl(plate2, 713.5, 407, 'plate', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);
        stool1 = Utils.ButtonSettingsControl(stool1, 845, 407, 'stool',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        stool1.angle=180;
        stool2 =Utils.ButtonSettingsControl(stool2, 260, 407, 'stool',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        glass = Utils.ButtonSettingsControl(glass, 647, 55, 'glass',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        cup =   Utils.ButtonSettingsControl(cup, 860, 171, 'cup', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);
        rope =  Utils.ButtonSettingsControl(rope, -1.25, -91.25, 'rope',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.78, 0.78, this);
        light =  Utils.ButtonSettingsControl(light, 462, 160, 'light',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        light.addChild(rope);
        folk1 = Utils.ButtonSettingsControl(folk1, 416, 44, 'folk',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        folk2 = Utils.ButtonSettingsControl(folk2, 414, 342, 'folk', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);
        knife1 = Utils.ButtonSettingsControl(knife1, 588.75, 308.25, 'knife',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        knife2 = Utils.ButtonSettingsControl(knife2, 124, 438, 'knife', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);        
        spoon =  Utils.ButtonSettingsControl(spoon, 762, 293, 'spoon', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);        
        frame =  Utils.ButtonSettingsControl(frame, 100, 199.5, 'frame', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.09, 0.09, this);        
        cat =    Utils.ButtonSettingsControl(cat, 837, 324, 'cat',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.88, 0.88, this);
        cat.input.pixelPerfectClick=true
        girl =   Utils.ButtonSettingsControl(girl, 472, 355, 'girl',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.88, 0.88, this);
        girl.input.pixelPerfectClick=true;
        arr=[ handIcon,rotateIcon,cat, cup, folk1,folk2, girl, glass, knife1,knife2, light,rope, plate1,plate2, spoon, table,stool1,stool2,frame];
        this.HandCursorDecide(true);
        game.input.addMoveCallback(function(pointer,x,y)
        {
            var rawX=((pointer.x + game.camera.position.x) / game.camera.scale.x);
            var rawY=((pointer.y + game.camera.position.y) / game.camera.scale.y);
            if(rotateIconClicked==false)
            {
                if(
                        objectToMove!=null &&
                        (rawX-objectToMove.width/2)>0 && 
                        (rawX+objectToMove.width/2)<MaxX&& 
                        (rawY+objectToMove.height/2)<MaxY&&
                        (rawY-objectToMove.height/2)>0
                    )
                {
                    // objectToMove.position.setTo(pointer.x,pointer.y);
                    objectToMove.position.setTo(((pointer.x + game.camera.position.x) / game.camera.scale.x),((pointer.y + game.camera.position.y) / game.camera.scale.y));
                    // console.log(pointer.x+" "+pointer.worldX);
                }
            }
            else
            {
                // movableRotateIcon.position.setTo(pointer.x,pointer.y);
                movableRotateIcon.position.setTo(((pointer.x + game.camera.position.x) / game.camera.scale.x),((pointer.y + game.camera.position.y) / game.camera.scale.y));

            }
        });
    },
    update:function()
    {
        
    },
    HandIconPressed:function()
    {
        SoundManager.PlayClickSound();
        if(rotateIconClicked)
        {
            rotateIconClicked=false;
            movableRotateIcon.visible=false;
            this.HandCursorDecide(true); 
            movableRotateIcon.position.setTo(rotateIcon.x,rotateIcon.y);
        }
    },
    RotateIconPressed:function()
    {
        // console.log("rotate icon pressed--------------------------------");
        SoundManager.PlayClickSound();
        if(!rotateIconClicked)
        {
            rotateIconClicked=true;
            this.HandCursorDecide(false);
            movableRotateIcon.visible=true;
            game.world.bringToTop(movableRotateIcon);
        }
       
    },
    HandCursorDecide:function(bool)
    {
        for(var i=0;i<arr.length;i++)
        {
            arr[i].input.useHandCursor = bool;
        }
    },
    SelectObjectToMove:function(object)
    {
        if(!rotateIconClicked)
        {
            if(!objectSelected)
            {
                objectSelected=true;
                objectToMove=object;
                SoundManager.PlayClickSound();
            }
            else
            {
                objectSelected=false;
                objectToMove=null;
            }
        }
        else
        {
            object.angle+=180;
            // console.log("rotate object -------------------------------");
            if(parseInt(object.angle)==0)
            {
                SoundManager.PlayClickSound();
            }
        }
    }
}