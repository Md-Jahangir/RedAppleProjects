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

var GamePlay = function() {};
GamePlay.prototype = {
    init: function() {
        Utils.ScaleManager();
    },
    preload: function() {
        gamePage = "GameplayScreen";
    },
    render: function() {},
    create: function() {
        rotateIconClicked=false;
        objectToMove=null;
        objectSelected=false;
        gamePlayBackground = Utils.SpriteSettingsControl(gamePlayBackground, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 1280, 1280, this);
        gameplayWhiteBackground = Utils.SpriteSettingsControl(gameplayWhiteBackground, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 800, 487, this);
        gameplayWhiteBackground.tint="0x7884d3"
        sideBar = Utils.SpriteSettingsControl(sideBar, 1074, 360, 'sideBar', "true", "true", 0.5, 0.5, 0.6,0.85, this);
        sideBar.tint = "0x999999";
        //Static Items
        handIcon = Utils.ButtonSettingsControl(handIcon, 1070, 300, 'hand',this.HandIconPressed,null,null,null,"true", "true", 0.5, 0.5, 0.3, 0.3, this);
        rotateIcon = Utils.ButtonSettingsControl(rotateIcon, 1070, 470, 'rotate',this.RotateIconPressed,null,null,null, "true", "true", 0.5, 0.5, 0.3, 0.3, this);
        movableRotateIcon = Utils.SpriteSettingsControl(movableRotateIcon, 1070, 470, 'rotate',"true", "true", 0.5, 0.5, 0.2, 0.2, this);
        movableRotateIcon.visible=false;
        // playeble items
        table = Utils.ButtonSettingsControl(table, 620, 270, 'table', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.88, 0.88, this);
        table.input.pixelPerfectClick=true;
        plate1 = Utils.ButtonSettingsControl(plate1, 906.3, 187.5, 'plate', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5,1, 1, this);
        plate2 = Utils.ButtonSettingsControl(plate2, 773.5, 525, 'plate', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);
        stool1 = Utils.ButtonSettingsControl(stool1, 905, 522, 'stool',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        stool1.angle=180;
        stool2 =Utils.ButtonSettingsControl(stool2, 400, 525, 'stool',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.8, 0.8, this);
        glass = Utils.ButtonSettingsControl(glass, 707, 173, 'glass',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        cup =   Utils.ButtonSettingsControl(cup, 920, 289, 'cup', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);
        rope =  Utils.ButtonSettingsControl(rope, -1.25, -91.25, 'rope',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.78, 0.78, this);
        light =  Utils.ButtonSettingsControl(light, 622, 278, 'light',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        light.addChild(rope);
        folk1 = Utils.ButtonSettingsControl(folk1, 576, 162, 'folk',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        folk2 = Utils.ButtonSettingsControl(folk2, 474, 460, 'folk', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);
        knife1 = Utils.ButtonSettingsControl(knife1, 748.75, 426.25, 'knife',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        knife2 = Utils.ButtonSettingsControl(knife2, 284, 556, 'knife', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);        
        spoon =  Utils.ButtonSettingsControl(spoon, 942, 411, 'spoon', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);        
        frame =  Utils.ButtonSettingsControl(frame, 323.6, 317.5, 'frame', this.SelectObjectToMove,null,null,null,"true", "true", 0.5, 0.5, 0.09, 0.09, this);        
        cat =    Utils.ButtonSettingsControl(cat, 897, 442, 'cat',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.88, 0.88, this);
        cat.input.pixelPerfectClick=true
        girl =   Utils.ButtonSettingsControl(girl, 632, 473, 'girl',this.SelectObjectToMove,null,null,null, "true", "true", 0.5, 0.5, 0.88, 0.88, this);
        girl.input.pixelPerfectClick=true;
        arr=[ handIcon,rotateIcon,cat, cup, folk1,folk2, girl, glass, knife1,knife2, light,rope, plate1,plate2, spoon, table,stool1,stool2,frame];
        this.HandCursorDecide(true);
        game.input.addMoveCallback(function(pointer,x,y)
        {
            // console.log(pointer.position);
            if(rotateIconClicked==false)
            {
                if(
                        objectToMove!=null &&
                        (pointer.position.x-objectToMove.width/2)>243 && 
                        (pointer.position.y-objectToMove.height/2)>118 &&
                        (pointer.position.x+objectToMove.width/2)<1006&& 
                        (pointer.position.y+objectToMove.height/2)<602
                    )
                {
                    objectToMove.position.setTo(pointer.x,pointer.y);
                }
            }
            else
            {
                movableRotateIcon.position.setTo(pointer.x,pointer.y);
            }
        });
    },
    update:function()
    {
        
    },
    HandIconPressed:function()
    {
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
        }
    }
}