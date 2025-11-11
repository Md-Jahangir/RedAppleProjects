var tutorialParentNode;
var databaseComponet;

cc.Class({
    extends: cc.Component,

    properties: {
        soundManagerNode: cc.Node,
        SoundManagerComponent: null,
        gameplayManagerNode: cc.Node,
        gameplayManagerNodeComponent: null,
    },

    onLoad: function() {
        this.gameplayManagerNodeComponent = this.gameplayManagerNode.getComponent("GameplayManager");
        tutorialParentNode = this.node.parent.getComponent("UIController");
        databaseComponet = this.node.parent.getComponent("Database");
        this.SoundManagerComponent = this.soundManagerNode.getComponent("SoundManager");
        // this.SoundManagerComponent.PlayBgSound();

        //analytics
        this.configureAnalytics();
    },

    configureAnalytics: function() {
        if (cc.sys.isNative) {
            this.gameConfig = jsb.reflection.callStaticMethod(
                "com.mxtech.videoplayer/game/GameManager", "onGameInit",
                "()Ljava/lang/String;");
            this.gameConfig = JSON.parse(this.gameConfig);

            cc.sys.localStorage.setItem("roomId", this.gameConfig.roomId);
            cc.sys.localStorage.setItem("userId", this.gameConfig.userId);
            cc.sys.localStorage.setItem("gameId", this.gameConfig.gameId);
            databaseComponet.SaveData("bubble_best_score", this.gameConfig.highestScore);
        }
    },

    start: function() {
        this.SoundManagerComponent.PlayBgSound();
    },

    MenuPlayButtonPress: function() {

        //analytics
        this.callMenuAnalytics();
        tutorialParentNode.ActiveSpecificPanel(2);

    },

    callMenuAnalytics: function() {
        if (cc.sys.isNative) {
            var ob = {
                gameId: cc.sys.localStorage.getItem("gameId"),
                roomID: cc.sys.localStorage.getItem("roomId"),
                userId: cc.sys.localStorage.getItem("userId"),
                startType: "newGame",
            }

            var data = JSON.stringify(ob);
            jsb.reflection.callStaticMethod(
                "com.mxtech.videoplayer/game/GameManager", "onTrack",
                "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                "tag", "gameStart", data);
        }
    },

    SettingsButtonPressed: function() {
        this.gameplayManagerNodeComponent.settingsPopupNode.active = true;
        this.gameplayManagerNodeComponent.settingsPopupNode.getComponent(cc.Animation).play('SettingsPopupShow');
    },

    ActiveTutorialPanel: function() {

        tutorialParentNode.ActiveSpecificPanel(1);
    },

});