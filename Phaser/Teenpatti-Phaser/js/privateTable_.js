var PrivateTable = function () {};
var _create_table_txt;
var _join_table_txt;
PrivateTable.prototype = {
    init: function(){
        Utils.ScaleManager();
    },
    preload: function(){
        Debug.log("Enter into The Private Table Preload Function");
    },
    render: function(){
        //game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");
    },
    create: function(){
        _BG = Utils.SpriteSettingsControl(_BG,640.0,360.0,'bg_3',"true","true",0.5,0.5,0.8,0.8);
        Utils.GenerateBubble();
alert(2);
        //Create Table   
        _create_table_button  = Utils.ButtonSettingsControl(_create_table_button,640.0,635.0,'green_base',this.CreateTableBttnDownAnimation,null,null,this.CreateTableBttnUpAnimation,"true","true",0.5,0.5,0.6,0.7,this);
        _create_table_txt = Utils.TextSettingsControl(_create_table_txt,640.0,629.0,'CREATE',"true","false",0.5,0.5,0.,0.0,"Arial","bold","#ffffff","center","25px");
        
        _chooseRoomText = Utils.TextSettingsControl(_chooseRoomText,640.0,295.0,'Choose Your Room',"true","false",0.5,0.5,0.0,0.0,"Arial","bold","#ffffff","center","25px");

        //Classic card
	
        //_classics_card  = Utils.ButtonSettingsControl(_classics_card,420.0,435.0 + 30.0,'classic_card',this.ClassicCardButtonClick,this.CreateClassicCardHoverButtonClick,this.CreateClassicCardOutButtonClick,null,"true","true",0.5,0.5,0.3,0.3,this);
        //_classic_check_circle = Utils.SpriteSettingsControl(_classic_check_circle,420.0,325.0 + 30.0,'classic_check_circle',"true","true",0.5,0.5,0.5,0.5);
        //_tick_mark_for_classic = Utils.SpriteSettingsControl(_tick_mark_for_classic,420.0,325.0 + 30.0,'tick_mark',"true","true",0.5,0.5,0.5,0.5);
        //_classic_amount = Utils.TextSettingsControl(_classic_amount,420.0,518.0 + 30.0,'2 CHIPS',"true","true",0.5,0.5,0.8,0.8,"Arial","bold","#ffffff","center","25px");
        //_classic_play_text = Utils.TextSettingsControl(_classic_play_text,421.0,490.0 + 30.0,'PLAY',"true","true",0.5,0.5,0.7,0.7,"Arial","bold","#ffffff","center","25px");
	
	_classics_card  = Utils.ButtonSettingsControl(_classics_card,640.0,435.0 + 30.0,'classic_card',this.ClassicCardButtonClick,this.CreateClassicCardHoverButtonClick,this.CreateClassicCardOutButtonClick,null,"true","true",0.5,0.5,0.3,0.3,this);
        _classic_check_circle = Utils.SpriteSettingsControl(_classic_check_circle,640.0,325.0 + 30.0,'classic_check_circle',"true","true",0.5,0.5,0.5,0.5);
        _tick_mark_for_classic = Utils.SpriteSettingsControl(_tick_mark_for_classic,640.0,325.0 + 30.0,'tick_mark',"true","true",0.5,0.5,0.5,0.5);
        _classic_amount = Utils.TextSettingsControl(_classic_amount,640.0,518.0 + 30.0,'2 CHIPS',"true","true",0.5,0.5,0.8,0.8,"Arial","bold","#ffffff","center","25px");
        _classic_play_text = Utils.TextSettingsControl(_classic_play_text,641.0,490.0 + 30.0,'PLAY',"true","true",0.5,0.5,0.7,0.7,"Arial","bold","#ffffff","center","25px");
	
        //Muflis Card
        //_muflis_Card  = Utils.ButtonSettingsControl(_muflis_Card,640.0,435.0 + 30.0,'muflis_card',this.MuflisCardButtonClick,this.CreateMuflisCardHoverButtonClick,this.CreateMuflisCardOutButtonClick,null,"true","true",0.5,0.5,0.3,0.3,this);
        //_muflis_check_circle = Utils.SpriteSettingsControl(_muflis_check_circle,640.0,325.0 + 30.0,'muflis_check_circle',"true","true",0.5,0.5,0.5,0.5);
        //_tick_mark_for_muflis = Utils.SpriteSettingsControl(_tick_mark_for_muflis,640.0,325.0 + 30.0,'tick_mark',"true","true",0.5,0.5,0.5,0.5);
        //_muflis_amount = Utils.TextSettingsControl(_muflis_amount,640.0,518.0 + 30.0,'2 CHIPS',"true","true",0.5,0.5,0.8,0.8,"Arial","bold","#ffffff","center","25px");
        //_muflis_play_text = Utils.TextSettingsControl(_classic_play_text,640.0,490.0 + 30.0,'PLAY',"true","true",0.5,0.5,0.7,0.7,"Arial","bold","#ffffff","center","25px");

	//Joker Card
        //_joker_Card  = Utils.ButtonSettingsControl(_joker_Card,860.0,435.0 + 30.0,'joker_card',this.JokerCardButtonClick,this.CreateJokerCardHoverButtonClick,this.CreateJokerCardOutButtonClick,null,"true","true",0.5,0.5,0.3,0.3,this);
        //_joker_check_circle = Utils.SpriteSettingsControl(_joker_check_circle,860.0,325.0 + 30.0,'joker_check_circle',"true","true",0.5,0.5,0.5,0.5);
        //_tick_mark_for_joker = Utils.SpriteSettingsControl(_tick_mark_for_joker,860.0,325.0 + 30.0,'tick_mark',"true","true",0.5,0.5,0.5,0.5);
        //_joker_amount = Utils.TextSettingsControl(_muflis_amount,860.0,518.0 + 30.0,'2 CHIPS',"true","true",0.5,0.5,0.8,0.8,"Arial","bold","#ffffff","center","25px");
        //_joker_play_text = Utils.TextSettingsControl(_classic_play_text,860.0,490.0 + 30.0,'PLAY',"true","true",0.5,0.5,0.7,0.7,"Arial","bold","#ffffff","center","25px");
	

        //CreateTable Text
        _create_table = Utils.SpriteSettingsControl(_create_table,640.0,250.0,'create_table_text',"true","true",0.5,0.5,0.6,0.6);
        _enter_code = Utils.SpriteSettingsControl(_enter_code,500.0,158.0,'enter_code',"true","true",0.5,0.5,0.5,0.5);

        enter_code_value = game.add.inputField(350.0,132.0, {
            font: '28px Arial',
            fill: '#ffffff',
            fillAlpha: 0,
            fontWeight: 'bold',
            width: 250,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Enter Code',
            zoom: false,
            cursorColor: '#ffffff'
        });
        //JoinTable
        _join_table_button  = Utils.ButtonSettingsControl(_joker_Card,840.0,163.0,'green_base',this.JoinTableBttnDownAnimation,null,null,this.JoinTableBttnUpAnimation,"true","true",0.5,0.5,0.4,0.7);
        _join_table_txt = Utils.TextSettingsControl(_join_table_txt,840.0,156.0,'JOIN',"true","false",0.5,0.5,0.,0.0,"Arial","bold","#ffffff","center","25px");
        _join_table = Utils.SpriteSettingsControl(_join_table,640.0,80.0,'join_table_text',"true","true",0.5,0.5,0.6,0.6);
        
        _back_button = Utils.ButtonSettingsControl(_back_button,80.0,50.0,'back_button',this.BackButtonDownAnimation,null,null,this.BackButtonUpAnimation,"true","true",0.5,0.5,0.7,0.7);

        this.DisableAllCircleTickMark();
        this.ClassicCardButtonClick();
    },
    ClassicCardButtonClick: function(){
        Debug.log("Classic Card Button Click");
        this.DisableAllCircleTickMark();
        _tick_mark_for_classic.visible = true;
        //Client.AddUser();
        privateTableType = "Classic";
        gameType = "Classic";
    },
    JokerCardButtonClick: function(){
        Debug.log("Joker Card Button Click");
        this.DisableAllCircleTickMark();
        _tick_mark_for_joker.visible = true;
        //Client.AddUser();
        privateTableType = "Joker";
        gameType = "Joker";
    },
    MuflisCardButtonClick: function(){
        Debug.log("Muflis Card Button Click");
        this.DisableAllCircleTickMark();
        _tick_mark_for_muflis.visible = true;
        //Client.AddUser();
        privateTableType = "Muflis";
        gameType = "Muflis";
    },
    DisableAllCircleTickMark: function(){
        Debug.log("Enter into the Disable ALl Tick Mark");
        _tick_mark_for_classic.visible = false;
        _tick_mark_for_joker.visible = false;
        _tick_mark_for_muflis.visible = false;
    },

    //Create Table
    CreateTableBttnDownAnimation: function(){
        game.add.tween(_create_table_button.scale).to({ x: 0.55, y: 0.65}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_create_table_txt.scale).to({ x: 0.95, y: 0.95}, 100, Phaser.Easing.Linear.Out, true);
    },
    CreateTableBttnUpAnimation: function(){
        _create_table_button.inputEnabled = false;
        game.add.tween(_create_table_button.scale).to({ x: 0.6, y: 0.7}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_create_table_txt.scale).to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
           this.CreateTableButtonClick(); 
        }, 100);
    },
    CreateTableButtonClick: function(){
        Debug.log("Create Table Button Click"+privateTableType);
        if(privateTableType == "Muflis"){
            console.log("The amount............."+muflis_amount);
            if(user_amount >maxBalance){
                game_id = 2;
                API.CreatePrivateTableData(muflis_amount,game_id);
            }
        }
        else if(privateTableType == "Joker"){
            console.log("The amount............."+joker_amount);
            if(user_amount >maxBalance){
                game_id = 3;
                API.CreatePrivateTableData(joker_amount,game_id);
            }
        }
        else{
            console.log("The amount............."+classic_amount);
            if(user_amount >maxBalance){
                game_id = 1;
                API.CreatePrivateTableData(classic_amount,game_id);
            }
        }
    },

    //Join Table
    JoinTableButtonClick: function(){
        Debug.log("Join Table Button Click........." + enter_code_value.value.length);
        if(enter_code_value.value.length > 0){
            if(user_amount >maxBalance){
                API.JoinPrivateTableData();
            }
        }
        else{
            PopUp.GenerateCommonPopup("Please Enter the Room Code");
        }
    },
    JoinTableBttnDownAnimation: function(){
        //_join_table_button.inputEnabled = true;
        game.add.tween(_join_table_button.scale).to({ x: 0.35, y: 0.65}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_join_table_txt.scale).to({ x: 0.95, y: 0.95}, 100, Phaser.Easing.Linear.Out, true);
    },
    JoinTableBttnUpAnimation: function(){
        _join_table_button.inputEnabled = false;
        game.add.tween(_join_table_button.scale).to({ x: 0.4, y: 0.7}, 100, Phaser.Easing.Linear.Out, true);
        game.add.tween(_join_table_txt.scale).to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            //this.JoinTableButtonClick();
            _join_table_button.inputEnabled = true;
            Debug.log("Join Table Button Click........." + enter_code_value.value.length);
            if(enter_code_value.value.length > 0){
                API.JoinPrivateTableData();
            }
            else{
                PopUp.GenerateCommonPopup("Please Enter the Room Code");
            }
        }, 100);
    },

    CreateClassicCardHoverButtonClick: function(){
        _classics_card.tint = hoverColourCode;
    },
    CreateClassicCardOutButtonClick: function(){
        _classics_card.tint = outColourCode;
    },
    CreateJokerCardHoverButtonClick: function(){
        _joker_Card.tint = hoverColourCode;
    },
    CreateJokerCardOutButtonClick: function(){
        _joker_Card.tint = outColourCode;
    },
    CreateMuflisCardHoverButtonClick: function(){
        _muflis_Card.tint = hoverColourCode;
    },
    CreateMuflisCardOutButtonClick: function(){
        _muflis_Card.tint = outColourCode;
    },
    CreateJoinButtonHoverClick: function(){
        _join_table_button.tint = hoverColourCode;
    },
    CreateJoinButtonOutClick: function(){
        _join_table_button.tint = outColourCode;
    },

    //BackButton
    BackButtonDownAnimation: function(){
        game.add.tween(_back_button.scale).to({ x: 0.65, y: 0.65}, 100, Phaser.Easing.Linear.Out, true);
    },
    BackButtonUpAnimation: function(){
        _back_button.inputEnabled = false;
        game.add.tween(_back_button.scale).to({ x: 0.7, y: 0.7}, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(() => {
            Debug.log("Private Table Back Button Click");
            StateTransition.TransitToMenu();
        }, 100);
    },
    // BackButtonClick: function(){
    //     Debug.log("Private Table Back Button Click");
    //     StateTransition.TransitToMenu();
    // }
};
