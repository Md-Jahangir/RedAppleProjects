var rulesPopUpOverlay;
var rulesGroup;
var isRulesPopUpShow = false;
var Rules = {
    GenerateRules: function(){
        var rulesPage;

        rulesGroup = game.add.group();
        rulesGroup.position.set(-500, 0);

        Debug.log("Enter into the Show Rules Section");

        rulesPopUpOverlay = game.add.sprite(640, 360, 'blackOnePixel');
        rulesPopUpOverlay.anchor.setTo(0.5, 0.5);
        rulesPopUpOverlay.scale.setTo(11280, 720);
        rulesPopUpOverlay.alpha = 0.5;
        rulesPopUpOverlay.inputEnabled = true;
        rulesPopUpOverlay.visible = false;
        rulesPopUpOverlay.events.onInputDown.add(this.HideRulesPopUp, this);

        var rulesPopupBase = game.add.sprite(-198, 360.0, 'whiteOnePixel');
        rulesPopupBase.anchor.setTo(0.5, 0.5);
        rulesPopupBase.scale.setTo(400, 720);
        rulesPopupBase.tint = 0x092a5c;

        var menuHeading = Utils.TextSettingsControl(menuHeading, -160.0, 40.0, "RULES", "true", "false", 0.5, 0.5, 0., 0.0, "Arial", "bold", "#FFFF00", "center", "30px");

        if(gameType = "Classic"){
            rulesPage = Utils.SpriteSettingsControl(rulesPage,-160.0,380.0,'classicRule',"true","true",0.5,0.5,0.32,0.38);
        }
        else if(gameType == "Muflis"){
            rulesPage = Utils.SpriteSettingsControl(rulesPage,-160.0,380.0,'muflisRule',"true","true",0.5,0.5,0.32,0.38);
        }
        else{
            rulesPage = Utils.SpriteSettingsControl(rulesPage,-160.0,380.0,'jokerRule',"true","true",0.5,0.5,0.32,0.38);
        } 

        rulesGroup.add(rulesPopUpOverlay);
        rulesGroup.add(rulesPopupBase);
        rulesGroup.add(menuHeading);
        rulesGroup.add(rulesPage);
        this.HideRulesPopUp();
    },

    ShowRulesPopUp : function(){
        rulesPopUpOverlay.visible = true;
        rulesGroup.visible = true;
        game.add.tween(rulesGroup.position).to({ x: 325, y: 0 }, 500, Phaser.Easing.Linear.Out, true);
        isRulesPopUpShow = true;
    },
    RulesBringToTop: function(){
        if(isRulesPopUpShow){
            game.world.bringToTop(rulesGroup);
        }
    },
    HideRulesPopUp : function(){
        rulesPopUpOverlay.visible = false;
        game.add.tween(rulesGroup.position).to({ x: -198, y: 0 }, 300, Phaser.Easing.Linear.Out, true);
        isRulesPopUpShow = false;
    }
}