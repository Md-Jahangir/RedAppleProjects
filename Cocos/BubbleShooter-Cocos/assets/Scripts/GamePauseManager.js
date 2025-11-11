cc.Class({
    extends: cc.Component,

    properties: {
        bubbleGeneratorNode: cc.Node,
        bubbleGeneratorComponent: { default: null },
        gameplayManagerNode: cc.Node,
        gameplayManagerNodeComponent: null,
        cannonNode: cc.Node,
        cannonNodeComponent: null,
        soundManagerNode: cc.Node,
        SoundManagerComponent: null,
        pauseAnimation: null,
    },


    onLoad() {
        this.bubbleGeneratorComponent = this.bubbleGeneratorNode.getComponent("BubbleManager");
        this.gameplayManagerNodeComponent = this.gameplayManagerNode.getComponent("GameplayManager");
        this.cannonNodeComponent = this.cannonNode.getComponent("Cannon");
        this.SoundManagerComponent = this.soundManagerNode.getComponent("SoundManager");
        this.pauseAnimation = this.node.getComponent(cc.Animation);
    },

    start() {

    },

    RestartButtonPressed: function() {

        //analytics
        this.gameplayManagerNodeComponent.restartAnalytics();


        this.pauseAnimation.play('ClosePausePopup');

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

            /*for (var k = 0; k < this.bubbleGeneratorComponent.defaultRows.length; k++) {
                this.bubbleGeneratorComponent.defaultRows[k] = null;
            }*/
            this.bubbleGeneratorComponent.defaultRows = [];

            this.bubbleGeneratorComponent.totalRowCount = 0;
            this.bubbleGeneratorComponent.isEven = true;

            this.cannonNodeComponent.barrelNode.rotation = 0;

            this.cannonNodeComponent.DestroyAllCreatedBullets();
            this.cannonNodeComponent.createCounter = 0;
            this.cannonNodeComponent.powerUpsCounter = 1;

            this.cannonNodeComponent.CreateBullets();
            this.cannonNodeComponent.SwapBullets();
            this.cannonNodeComponent.CreateBullets();

            this.gameplayManagerNodeComponent.isPaused = false;

            this.gameplayManagerNodeComponent.score = 0;
            this.gameplayManagerNodeComponent.UpdateScoreText();
            this.gameplayManagerNodeComponent.ReStartTimer();
            this.gameplayManagerNodeComponent.dangerLine.isEnterToYellowLine = false;
            this.gameplayManagerNodeComponent.dangerLine.isEnterToRedLine = false;
            this.SoundManagerComponent.PlayBgSound();

            this.bubbleGeneratorComponent.initInitialBubbleRow();
        }, 0.3);


    },

    QuitButtonPressed: function() {
        this.pauseAnimation.play('ClosePausePopup');
        this.gameplayManagerNodeComponent.timerBaseNode.scale = new cc.Vec2(0.6666667, 0.6666667);

        this.scheduleOnce(function() {
            //for off the game pause node   
            this.node.active = false;
            //for show the back popup node
            this.gameplayManagerNodeComponent.gameOverBackPopupNode.active = true;
            this.gameplayManagerNodeComponent.gameOverBackPopupNode.getComponent(cc.Animation).play('BackPopupShowing');
        }, 0.3);
    },

    CrossButtonPressed: function() {
        // cc.director.resume();
        this.pauseAnimation.play('ClosePausePopup');
        this.gameplayManagerNodeComponent.timerBaseNode.scale = new cc.Vec2(0.6666667, 0.6666667);
        this.scheduleOnce(function() {
            //for off the pause popup
            this.node.active = false;

            this.gameplayManagerNodeComponent.isPaused = false;
            this.SoundManagerComponent.PlayBgSound();
        }, 0.3);

    },

    SettingsButtonPressed: function() {
        this.pauseAnimation.play('ClosePausePopup');

        this.scheduleOnce(function() {
            //for off the pause popup
            this.node.active = false;

            this.gameplayManagerNodeComponent.settingsPopupNode.active = true;
            this.gameplayManagerNodeComponent.settingsPopupNode.getComponent(cc.Animation).play('SettingsPopupShow');
        }, 0.3);
    },

});