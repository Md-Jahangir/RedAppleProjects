cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        var physicManager = cc.director.getPhysicsManager();
        physicManager.enabled = true;
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;

        this.ActiveSpecificPanel(0);
    },

    DeactiveAllPanel: function() {
        for (var i = 0; i < this.node.children.length; i++) {
            this.node.children[i].active = false;
        }
    },

    ActiveSpecificPanel: function(index) {
        this.DeactiveAllPanel();
        this.node.children[index].active = true;
    },

});