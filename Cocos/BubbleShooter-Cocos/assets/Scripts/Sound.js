
cc.Class({
    extends: cc.Component,

    properties: {
        soundManagerNode:cc.Node,
        soundManagerComponent:null,
    },

    onLoad () {
        this.soundManagerComponent = this.soundManagerNode.getComponent("SoundManager");
        if (this.soundManagerComponent.getCurrentValue("is_sound_on") == 0) {
            this.node.getComponent(cc.Toggle).isChecked = true;
        } else {
            this.node.getComponent(cc.Toggle).isChecked = false;
        }
    },

    buttonClicked:function () {
        var toggleVal = this.node.getComponent(cc.Toggle).isChecked;
        var value = toggleVal ? 0 : 1;
        this.soundManagerComponent.updateSoundStatus(value);
    }
    
});
