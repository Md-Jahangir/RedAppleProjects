var uiControllerParentNode;
var databaseComponet;

cc.Class({
    extends: cc.Component,

    properties: {
        counter: { default: 0, type: cc.Integer },

    },

    onLoad: function() {
        uiControllerParentNode = this.node.parent.getComponent("UIController");
        databaseComponet = this.node.parent.getComponent("Database");
    },

    DeactiveAllTutorialPanel: function() {
        for (var i = 0; i < this.node.children.length; i++) {
            this.node.children[i].active = false;
        }
    },

    ActiveSpecificTutorialPanel: function() {
        // console.log("before The Counter......." + this.counter);
        if (this.counter < (this.node.children.length - 1)) {
            this.counter++;
            this.DeactiveAllTutorialPanel();
            this.node.children[this.counter].active = true;
        }
        // console.log("after The Counter......." + this.counter);
    },

    TutorialNextButtonPress: function() {
        this.ActiveSpecificTutorialPanel();
    },

    TutorialBackButtonPress: function() {
        // console.log(" before The counter value........" + this.counter);
        if (this.counter - this.node.children.length) {
            this.counter--;
            this.DeactiveAllTutorialPanel();
            this.node.children[this.counter].active = true;
        }
        // console.log("after The Counter......." + this.counter);
    },

    TutorialPlayButtonPress: function() {
        uiControllerParentNode.ActiveSpecificPanel(2);
        databaseComponet.SaveData("is_tutorial_shown", 1);
    },

    SkipButtonPressed:function(){
        uiControllerParentNode.ActiveSpecificPanel(2);
        databaseComponet.SaveData("is_tutorial_shown", 1);
    },

    // onLoad () {},

    start() {

    },

});