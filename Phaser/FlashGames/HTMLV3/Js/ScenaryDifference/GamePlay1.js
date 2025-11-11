// var gameplayWhiteBackground;
var gamePlayBackground;
var layer1;
var layer2;
var findTheDifferenceText;
var counterText;
var counter;
//Clickable area
var layer1Cloud;
var layer2Cloud;
var layer1Monkey;
var layer2Monkey;
var layer1Umbrella;
var layer2Umbrella;
var layer1BowOncat;
var layer2BowOncat;
var layer1Bag;
var layer2Bag;
var layer1DogUmbrella;
var layer2DogUmbrella;
var layer1LadyBug;
var layer2LadyBug;
var layer1MonkeyHat;
var layer2MonkeyHat;
var layer1HatOnMonkey;
var layer2HatOnMonkey;
var layer1MonkeyColour;
var layer2MonkeyColour;
//
var firstClicked;
var secondClicked;

var GamePlay = function() {};
GamePlay.prototype = {
    init: function() {
        Utils.ScaleManager();
    },
    preload: function() {
        gamePage = "GameplayScreen";
    },
    render: function() {},
    create: function()
    {
        firstClicked=secondClicked=null;
        counter=10;
        SoundManager.CreateSound(); 
        gamePlayBackground = Utils.SpriteSettingsControl(gamePlayBackground, 640, 360, 'whitePixel', "true", "true", 0.5, 0.5, 1280, 1280, this);
        layer1 = Utils.ButtonSettingsControl(layer1, 300, 250, 'Layer1',null,null,null,null,"true", "true", 0.5, 0.5, 0.4, 0.4, this);
        layer1.inputEnabled=true;
        layer1.input.useHandCursor=true;
        layer2 = Utils.ButtonSettingsControl(layer2, 920, 250, 'Layer2',null,null,null,null, "true", "true", 0.5, 0.5, 0.4, 0.4, this);
        layer2.inputEnabled=true;
        // layer2.input.useHandCursor=true;
        findTheDifferenceText=game.add.text(500,0,"Find The Differences - ","Arial 20px black");
        counterText=game.add.text(790,0,counter,"Arial 20px black");game.width/2

        layer1Cloud = Utils.ButtonSettingsControl(layer1Cloud, 85, 85, 'ellipse',this.ObjectClicked,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);
        layer1Cloud.alpha=0;
        layer1Cloud.input.useHandCursor=true;
        layer1Cloud.name="layer1Cloud";

        layer2Cloud = Utils.SpriteSettingsControl(layer2Cloud, 705, 85, 'ellipse',"true", "true", 0.5, 0.5, 1, 1, this);
        layer2Cloud.alpha=0;
        layer2Cloud.name="layer2Cloud";

        layer1Monkey = Utils.ButtonSettingsControl(layer1Monkey, 50, 305, 'ellipse',this.ObjectClicked,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);
        layer1Monkey.alpha=0;
        layer1Monkey.angle=90;
        layer1Monkey.input.useHandCursor=true;
        layer1Monkey.name="layer1Monkey";

        layer2Monkey = Utils.SpriteSettingsControl(layer2Monkey, 674, 305, 'ellipse',"true", "true", 0.5, 0.5, 1, 1, this);
        layer2Monkey.alpha=0;
        layer2Monkey.angle=90;
        layer2Monkey.name="layer2Monkey";

        layer1Umbrella = Utils.ButtonSettingsControl(layer1Umbrella, 272, 422, 'ellipse60', this.ObjectClicked,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);
        layer1Umbrella.alpha=0;
        layer1Umbrella.angle=90;
        layer1Umbrella.input.useHandCursor=true;
        layer1Umbrella.name="layer1Umbrella";

        layer2Umbrella = Utils.SpriteSettingsControl(layer2Umbrella, 892, 422, 'ellipse60',"true", "true", 0.5, 0.5, 1, 1, this);
        layer2Umbrella.alpha=0;
        layer2Umbrella.angle=90;
        layer2Umbrella.name="layer2Umbrella";

        layer1BowOncat = Utils.ButtonSettingsControl(layer1BowOncat, 484, 347, 'ellipse60',this.ObjectClicked,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        layer1BowOncat.alpha=0;
        layer1BowOncat.input.useHandCursor=true;
        layer1BowOncat.name="layer1BowOncat";

        layer2BowOncat = Utils.SpriteSettingsControl(layer2BowOncat, 1105, 345, 'ellipse60', "true", "true", 0.5, 0.5, 1, 1, this);
        layer2BowOncat.alpha=0;
        layer2BowOncat.name="layer2BowOncat";

        layer1Bag = Utils.ButtonSettingsControl(layer1Bag, 300, 280, 'ellipse',this.ObjectClicked,null,null,null, "true", "true", 0.5, 0.5, 1, 1, this);
        layer1Bag.alpha=0;
        layer1Bag.angle=90;
        layer1Bag.input.useHandCursor=true;
        layer1Bag.name="layer1Bag";

        layer2Bag = Utils.SpriteSettingsControl(layer2Bag, 930, 280, 'ellipse', "true", "true", 0.5, 0.5, 1, 1, this);
        layer2Bag.alpha=0;
        layer2Bag.angle=90;
        layer2Bag.name="layer2Bag";

        layer1DogUmbrella = Utils.ButtonSettingsControl(layer1DogUmbrella, 430, 105, 'ellipse',this.ObjectClicked,null,null,null,"true", "true", 0.5, 0.5, 1.2, 1, this);
        layer1DogUmbrella.alpha=0;      
        layer1DogUmbrella.input.useHandCursor=true;
        layer1DogUmbrella.name="layer1DogUmbrella";

        layer2DogUmbrella = Utils.SpriteSettingsControl(layer2DogUmbrella, 1050, 105, 'ellipse',"true", "true", 0.5, 0.5, 1.2, 1, this);
        layer2DogUmbrella.alpha=0;
        layer2DogUmbrella.name="layer2DogUmbrella";

        layer1LadyBug = Utils.ButtonSettingsControl(layer1LadyBug, 550, 315, 'ellipse60',this.ObjectClicked,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);
        layer1LadyBug.alpha=0;   
        layer1LadyBug.angle=90;
        layer1LadyBug.input.useHandCursor=true;
        layer1LadyBug.name="layer1LadyBug";

        layer2LadyBug = Utils.SpriteSettingsControl(layer2LadyBug, 1171, 315, 'ellipse60',"true", "true", 0.5, 0.5, 1, 1, this);
        layer2LadyBug.alpha=0;
        layer2LadyBug.angle=90;
        layer2LadyBug.name="layer2LadyBug";

        layer1MonkeyHat = Utils.ButtonSettingsControl(layer1MonkeyHat, 335, 365, 'ellipse60',this.ObjectClicked,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);
        layer1MonkeyHat.alpha=0;
        layer1MonkeyHat.input.useHandCursor=true;
        layer1MonkeyHat.name="layer1MonkeyHat";

        layer2MonkeyHat = Utils.SpriteSettingsControl(layer2MonkeyHat, 955, 365, 'ellipse60', "true", "true", 0.5, 0.5, 1, 1, this);
        layer2MonkeyHat.alpha=0;
        layer2MonkeyHat.name="layer2MonkeyHat";

        layer1HatOnMonkey = Utils.ButtonSettingsControl(layer1HatOnMonkey, 228, 335, 'ellipse60',this.ObjectClicked,null,null,null,"true", "true", 0.5, 0.5, 1, 1 , this);
        layer1HatOnMonkey.alpha=0;
        layer1HatOnMonkey.input.useHandCursor=true;
        layer1HatOnMonkey.name="layer1HatOnMonkey";

        layer2HatOnMonkey = Utils.SpriteSettingsControl(layer2HatOnMonkey, 845, 335, 'ellipse60', "true", "true", 0.5, 0.5, 1,1, this);
        layer2HatOnMonkey.alpha=0;
        layer2HatOnMonkey.name="layer2HatOnMonkey";

        layer1MonkeyColour = Utils.ButtonSettingsControl(layer1MonkeyColour, 197, 255, 'ellipse',this.ObjectClicked,null,null,null,"true", "true", 0.5, 0.5, 1, 1, this);
        layer1MonkeyColour.alpha=0;  
        layer1MonkeyColour.angle=90;
        layer1MonkeyColour.input.useHandCursor=true;
        layer1MonkeyColour.name="layer1MonkeyColour";

        layer2MonkeyColour = Utils.SpriteSettingsControl(layer2MonkeyColour, 825, 255, 'ellipse', "true", "true", 0.5, 0.5, 1, 1, this);
        layer2MonkeyColour.alpha=0;
        layer2MonkeyColour.angle=90;
        layer2MonkeyColour.name="layer2MonkeyColour";

    },
    update:function()
    {
        // game.canvas.style.cursor = "url('assets/cursor.png'), pointer";
    },
    ObjectClicked:function(object)
    {
        // if(firstClicked!=null)
        // {
        //     if(this.CheckClickedLayers(object.name,"layer2")!=null)
        //     {
        //         if(this.returnNameOfTheItem(firstClicked.name,"layer1")==this.returnNameOfTheItem(object.name,"layer2"))
        //         {
        //             firstClicked.alpha=1;
        //             object.alpha=1;   
        //             counter-=1; 
        //             counterText.setText(counter);                
        //         }
        //         firstClicked=null;
        //     }
        // }
        // else    
        // {
        //     if(this.CheckClickedLayers(object.name,"layer1")!=null)
        //     {
        //        firstClicked=object;
        //     }
        // }
        console.log(object.name+" "+this.returnNameOfTheItem(object.name,"layer2"));
        switch(object.name)
        {
            
            case "layer1Cloud":     layer1Cloud.alpha=1;
                                    layer1Cloud.inputEnabled=false;
                                    layer2Cloud.alpha=1;
                                    console.log("fdffa");
                                    break;
            case "layer1Monkey":    layer1Monkey.alpha=1;
                                    layer1Monkey.inputEnabled=false;
                                    layer2Monkey.alpha=1;
                                    break;
            case "layer1Umbrella":  layer1Umbrella.alpha=1;
                                    layer1Umbrella.inputEnabled=false;
                                    layer2Umbrella.alpha=1;
                                    break;
            case "layer1BowOncat":  layer1BowOncat.alpha=1;
                                    layer1BowOncat.inputEnabled=false;
                                    layer2BowOncat.alpha=1;
                                    break;
            case "layer1Bag":       layer1Bag.alpha=1;
                                    layer1Bag.inputEnabled=false;
                                    layer2Bag.alpha=1;
                                    break;
            case "layer1DogUmbrella":layer1DogUmbrella.alpha=1;
                                    layer1DogUmbrella.inputEnabled=false;
                                    layer2DogUmbrella.alpha=1;
                                    break;
            case "layer1MonkeyHat":layer1MonkeyHat.alpha=1;
                                    layer1MonkeyHat.inputEnabled=false;
                                    layer2MonkeyHat.alpha=1;
                                    break;
            case "layer1HatOnMonkey":layer1HatOnMonkey.alpha=1;
                                    layer1HatOnMonkey.inputEnabled=false;
                                     layer2HatOnMonkey.alpha=1;
                                     break;
            case "layer1MonkeyColour":layer1MonkeyColour.alpha=1;
                                    layer1MonkeyColour.inputEnabled=false;
                                      layer2MonkeyColour.alpha=1;
                                      break;
            case "layer1Umbrella":layer1Umbrella.alpha=1;
                                  layer1Umbrella.inputEnabled=false;
                                  layer2Umbrella.alpha=1;
                                    break;
            case "layer1LadyBug":layer1LadyBug.alpha=1;
                                 layer1LadyBug.inputEnabled=false;
                                 layer2LadyBug.alpha=1;
                                    break;
        }
        if(counter!=0)
        {
            counter-=1; 
            counterText.setText(counter);
            if(counter==0)
            {
                SoundManager.PlayGoodJobSound();
                SoundManager.PlayBackgroundSound();
            }
        }      
    },
    CheckClickedLayers:function(item,nameOfTheLayer)
    {
        var first= item.indexOf(nameOfTheLayer);
        if(first==-1)
        return null;
        else    
        return first;
    },
    
    returnNameOfTheItem:function(item,splitItem)
    {
        name=item.split(splitItem);
        return name;
    },
}