
cc.Class({
    extends: cc.Component,

    properties: {
        aboutAnimation:null,
        gameplayManagerNode: cc.Node,
        gameplayManagerNodeComponent: null,
    },

    onLoad () {
        this.gameplayManagerNodeComponent = this.gameplayManagerNode.getComponent("GameplayManager");
        this.aboutAnimation = this.node.getComponent(cc.Animation);
    },

    AboutCrossButtonPressed:function(){
        this.aboutAnimation.play('AboutPopupHide');
        this.scheduleOnce(function(){
            this.gameplayManagerNodeComponent.AboutPopupNode.active = false;
            this.gameplayManagerNodeComponent.settingsPopupNode.active = true;
            this.gameplayManagerNodeComponent.settingsPopupNode.getComponent(cc.Animation).play('SettingsPopupShow');
        },0.2);
    },
});
