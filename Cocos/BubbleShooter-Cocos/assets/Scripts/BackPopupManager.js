cc.Class({
    extends: cc.Component,

    properties: {
        backPopupAnimation: null,
        gameplayManagerNode: cc.Node,
        gameplayManagerNodeComponent: null,
    },

    onLoad: function() {
        this.gameplayManagerNodeComponent = this.gameplayManagerNode.getComponent("GameplayManager");
        this.backPopupAnimation = this.node.getComponent(cc.Animation);
    },

    YesButtonPressed: function() {
        this.gameplayManagerNodeComponent.sendAnalyticsData();

        this.scheduleOnce(function() {
            cc.game.end();
        }, 0.2);

    },

    GameOverNoButtonPressed: function() {
        cc.game.resume();
        this.backPopupAnimation.play('BackPopupHiding');

        if (this.gameplayManagerNodeComponent.systemBackPressed) {
            // this.gameplayManagerNodeComponent.isPaused = false;
            this.gameplayManagerNodeComponent.systemBackPressed = false;
        }
        this.scheduleOnce(function() {
            //for off the back popup
            this.node.active = false;

            if (this.gameplayManagerNodeComponent.isGameOver) {
                this.gameplayManagerNodeComponent.timerBaseNode.scale = new cc.Vec2(0.6666667, 0.6666667);
                this.gameplayManagerNodeComponent.gameOverNode.active = true;
                this.gameplayManagerNodeComponent.gameOverNode.getComponent(cc.Animation).play('GameOverPopupComing');
            }
            if (this.gameplayManagerNodeComponent.isPaused) {
                this.gameplayManagerNodeComponent.timerBaseNode.scale = new cc.Vec2(0.6666667, 0.6666667);
                this.gameplayManagerNodeComponent.gamePauseNode.active = true;
                this.gameplayManagerNodeComponent.gamePauseNode.getComponent(cc.Animation).play('PausePopupComing');
            }
        }, 0.5);

    },

});