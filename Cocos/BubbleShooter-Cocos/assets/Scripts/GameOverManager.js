cc.Class({
    extends: cc.Component,

    properties: {
        bubbleGeneratorNode: cc.Node,
        bubbleGeneratorComponent: { default: null },
        cannonNode: cc.Node,
        cannonNodeComponent: null,
        gameplayManagerNode: cc.Node,
        gameplayManagerNodeComponent: null,
        soundManagerNode: cc.Node,
        SoundManagerComponent: null,
        gameOverAnimation: null,
    },


    onLoad() {
        this.bubbleGeneratorComponent = this.bubbleGeneratorNode.getComponent("BubbleManager");
        this.cannonNodeComponent = this.cannonNode.getComponent("Cannon");
        this.gameplayManagerNodeComponent = this.gameplayManagerNode.getComponent("GameplayManager");
        this.SoundManagerComponent = this.soundManagerNode.getComponent("SoundManager");
        this.gameOverAnimation = this.node.getComponent(cc.Animation);
    },

    start() {},

    RestartButtonPressed: function() {

        this.gameOverAnimation.play('GameOverPopupClose');



        this.scheduleOnce(function() {
            //for off the game over popup
            this.node.active = false;
            this.gameplayManagerNodeComponent.timerBaseNode.scale = new cc.Vec2(0.6666667, 0.6666667);

            for (var i = 0; i < this.bubbleGeneratorComponent.totalGeneratedRow.length; i++) {
                for (var j = 0; j < this.bubbleGeneratorComponent.totalGeneratedRow[i].length; j++) {
                    var bubble = this.bubbleGeneratorComponent.totalGeneratedRow[i][j];
                    if (bubble != null) {
                        bubble.destroy();
                    }
                }
            }
            this.bubbleGeneratorComponent.totalGeneratedRow = [];

            for (var k = 0; k < this.bubbleGeneratorComponent.defaultRows.length; k++) {
                this.bubbleGeneratorComponent.defaultRows[k] = null;
            }
            this.bubbleGeneratorComponent.defaultRows = [];

            this.bubbleGeneratorComponent.totalRowCount = 0;
            this.bubbleGeneratorComponent.isEven = true;

            this.bubbleGeneratorComponent.initInitialBubbleRow();
            this.cannonNodeComponent.barrelNode.rotation = 0;

            this.cannonNodeComponent.DestroyAllCreatedBullets();
            this.cannonNodeComponent.createCounter = 0;
            this.cannonNodeComponent.powerUpsCounter = 1;

            this.cannonNodeComponent.CreateBullets();
            this.cannonNodeComponent.SwapBullets();
            this.cannonNodeComponent.CreateBullets();

            this.gameplayManagerNodeComponent.isGameOver = false;

            this.gameplayManagerNodeComponent.score = 0;
            this.gameplayManagerNodeComponent.UpdateScoreText();
            this.gameplayManagerNodeComponent.ReStartTimer();
            this.gameplayManagerNodeComponent.dangerLine.isEnterToYellowLine = false;
            this.gameplayManagerNodeComponent.dangerLine.isEnterToRedLine = false;
            this.SoundManagerComponent.PlayBgSound();
        }, 0.3);


        //analytics
        this.gameplayManagerNodeComponent.restartAnalytics();
    },

    QuitButtonPressed: function() {
        this.gameOverAnimation.play('GameOverPopupClose');
        this.scheduleOnce(function() {
            //for off the game over popup
            this.node.active = false;

            this.gameplayManagerNodeComponent.timerBaseNode.scale = new cc.Vec2(0.6666667, 0.6666667);

            this.gameplayManagerNodeComponent.gameOverBackPopupNode.active = true;
            this.gameplayManagerNodeComponent.gameOverBackPopupNode.getComponent(cc.Animation).play('BackPopupShowing');
        }, 0.3);
    },

    CrossButtonPressed: function() {
        this.gameOverAnimation.play('GameOverPopupClose');

        this.scheduleOnce(function() {
            this.gameplayManagerNodeComponent.timerBaseNode.scale = new cc.Vec2(0.6666667, 0.6666667);
            this.node.active = false;
            for (var i = 0; i < this.bubbleGeneratorComponent.totalGeneratedRow.length; i++) {
                for (var j = 0; j < this.bubbleGeneratorComponent.totalGeneratedRow[i].length; j++) {
                    var bubble = this.bubbleGeneratorComponent.totalGeneratedRow[i][j];
                    if (bubble != null) {
                        bubble.destroy();
                    }
                }
            }
            this.bubbleGeneratorComponent.totalGeneratedRow.length = 0;

            for (var k = 0; k < this.bubbleGeneratorComponent.defaultRows.length; k++) {
                this.bubbleGeneratorComponent.defaultRows[k] = null;
            }
            this.bubbleGeneratorComponent.defaultRows.length = 0;

            this.bubbleGeneratorComponent.totalRowCount = 0;

            this.bubbleGeneratorComponent.initInitialBubbleRow();
            this.cannonNodeComponent.barrelNode.rotation = 0;

            this.cannonNodeComponent.DestroyAllCreatedBullets();
            this.cannonNodeComponent.createCounter = 0;
            this.cannonNodeComponent.powerUpsCounter = 1;
            this.cannonNodeComponent.CreateBullets();
            this.cannonNodeComponent.SwapBullets();
            this.cannonNodeComponent.CreateBullets();

            this.gameplayManagerNodeComponent.score = 0;
            this.gameplayManagerNodeComponent.UpdateScoreText();
            this.gameplayManagerNodeComponent.ReStartTimer();
            this.gameplayManagerNodeComponent.dangerLine.isEnterToYellowLine = false;
            this.gameplayManagerNodeComponent.dangerLine.isEnterToRedLine = false;
            this.SoundManagerComponent.PlayBgSound();
            this.gameplayManagerNodeComponent.isGameOver = false;

        }, 0.4);
    },

});