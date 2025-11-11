var databaseComponet;
cc.Class({
    extends: cc.Component,

    properties: {
        gameplayManagerNode: cc.Node,
        gameplayManagerNodeComponent: null,
        settingsAnimation:null,
        soundOnButton:cc.Node,
        soundOffButton:cc.Node,
        soundManagerNode:cc.Node,
        SoundManagerComponent:null,
    },


    onLoad () {
        this.gameplayManagerNodeComponent = this.gameplayManagerNode.getComponent("GameplayManager");
        databaseComponet = this.node.parent.getComponent("Database");
        this.SoundManagerComponent = this.soundManagerNode.getComponent("SoundManager");
        this.settingsAnimation = this.node.getComponent(cc.Animation);
    },

    SoundOnButtonPressed:function(){
        databaseComponet.SaveData("is_sound_on",0) ;
        this.ActiveDeactiveButton();
    },

    SoundOffButtonPressed:function(){
        databaseComponet.SaveData("is_sound_on",1);
        this.ActiveDeactiveButton();
    },

    AboutButtonPressed:function(){
        this.settingsAnimation.play('SettingsPopupHide');
        this.scheduleOnce(function(){
            this.gameplayManagerNodeComponent.settingsPopupNode.active = false;

            this.gameplayManagerNodeComponent.AboutPopupNode.active = true;
            this.gameplayManagerNodeComponent.AboutPopupNode.getComponent(cc.Animation).play('AboutPopupShow');
        },0.3);
    },

    SettingsCrossButtonPressed:function(){
        this.settingsAnimation.play('SettingsPopupHide');
        this.scheduleOnce(function(){
            this.gameplayManagerNodeComponent.settingsPopupNode.active = false;
            this.gameplayManagerNodeComponent.gamePauseNode.active = true;
            this.gameplayManagerNodeComponent.gamePauseNode.getComponent(cc.Animation).play('PausePopupComing');
        },0.3);
    },

    ActiveDeactiveButton:function(){
        if (databaseComponet.LoadData("is_sound_on") == 0) {
            //sound off
            this.soundOnButton.getComponent(cc.Button).interactable = false;
            this.soundOffButton.getComponent(cc.Button).interactable = true;

        }else{
            //sound on
            this.soundOnButton.getComponent(cc.Button).interactable = true;
            this.soundOffButton.getComponent(cc.Button).interactable = false;
        }
    },

    start () {

    },

    // update (dt) {},
});
