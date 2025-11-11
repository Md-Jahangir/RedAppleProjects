var pathArray = [];
var pathCount = 30;
var markerTimer = 0;
var pathMarkerGap = 100;
// var screenWidth = 360;
var screenWidth = 335;
var defaultDistanceToSpwanPoint = 0.0;

var firstPhaseCompleted = false;
var secondPhaseCompleted = false;
var repeatPhase = false;


cc.Class({
    extends: cc.Component,

    properties: {
        canvasNode: cc.Node,
        leftMaxAngle: 0,
        rightMaxAngle: 0,

        bulletOne: null,
        bulletTwo: null,

        bulletArray: [cc.Prefab],
        powerUpsArray: [cc.Prefab],
        pathPrefab: cc.Prefab,

        pathPointNode: cc.Node,
        barrelNode: cc.Node,
        secondaryBubbleSpawnPoint: cc.Node,
        primaryBubbleSpawnPoint: cc.Node,
        bubbleSpawnNode: cc.Node,
        bubbleHolder: cc.Node,

        bubbleGeneratorNode: cc.Node,
        bubbleGeneratorComponent: { default: null },
        gameplayManagerNode: cc.Node,
        gameplayManagerNodeComponent: null,
        pathAngle: { default: 0, type: cc.Float },
        allCreatedBulletArray: [],
        createCounter: 0,
        isCannonMoving: false,
        isPathShown: false,

        powerUpsCounter: 0,
        //powerUpsMinRange: 0,
        //powerUpsMaxRange: 0,
        powerUpsRange: 0,
        totalCollectedPowerUps: [],
    },


    onLoad() {
        this.bubbleGeneratorComponent = this.bubbleGeneratorNode.getComponent("BubbleManager");
        this.gameplayManagerNodeComponent = this.gameplayManagerNode.getComponent("GameplayManager");

        this.canvasNode.on(cc.Node.EventType.TOUCH_START, this.MousePressed, this);
        this.canvasNode.on(cc.Node.EventType.TOUCH_MOVE, this.MoveCannon, this, false);
        this.canvasNode.on(cc.Node.EventType.TOUCH_END, this.TouchEnded, this);
    },

    start() {
        // this.powerUpsRange = parseInt(Math.random() * (this.powerUpsMaxRange - this.powerUpsMinRange) + this.powerUpsMinRange);
        // console.log("this.powerUpsRange: " + this.powerUpsRange);
        this.CreateBullets();
        this.SwapBullets();
        this.CreateBullets();

        defaultDistanceToSpwanPoint = Math.sqrt(Math.pow(this.primaryBubbleSpawnPoint.position.x - this.barrelNode.position.x, 2) + Math.pow(this.primaryBubbleSpawnPoint.position.y - this.barrelNode.position.y, 2));

    },

    MousePressed: function(event) {
        if (!this.gameplayManagerNodeComponent.isGameOver && !this.bubbleGeneratorComponent.isMovingSmoothly) {
            if (!this.gameplayManagerNodeComponent.isPaused && !this.bubbleGeneratorComponent.isBubbleFired) {
                this.isPathShown = true;
                this.DrwaPath();
                this.isCannonMoving = true;
                this.MoveCannon(event, true);
            }
        }
    },

    MoveCannon: function(event, actionNeeded) {
        if (!this.gameplayManagerNodeComponent.isGameOver && !this.bubbleGeneratorComponent.isMovingSmoothly) {
            if (!this.gameplayManagerNodeComponent.isPaused && !this.bubbleGeneratorComponent.isBubbleFired) {
                if (!this.isPathShown) {
                    this.isPathShown = true;
                    this.DrwaPath();
                    this.isCannonMoving = true;
                    this.MoveCannon(event, true);
                }
                var mPos = event.getLocation();
                //var pos = this.node.convertTouchToNodeSpace(event);
                var pos = this.node.convertTouchToNodeSpace(event);
                // var deltaX = pos.x - this.barrelNode.position.x;
                // var deltaY = this.barrelNode.position.y - pos.y;
                var deltaX = pos.x - this.barrelNode.position.x;// - this.node.position.x;
                var deltaY = this.barrelNode.position.y - pos.y;

                var mouseAngle = this.ConvertRadianToDegree(Math.atan2(deltaY, deltaX));

                if (mouseAngle < 0) {
                    mouseAngle = 90 + (mouseAngle);
                }

                if (mouseAngle > this.rightMaxAngle)
                    mouseAngle = this.rightMaxAngle;
                if (mouseAngle < -this.leftMaxAngle)
                    mouseAngle = -this.leftMaxAngle;

                this.isCannonMoving = false;
                if (mouseAngle >= -this.leftMaxAngle && mouseAngle <= this.rightMaxAngle) {

                    this.barrelNode.stopAllActions();
                    if (actionNeeded) {
                        var rotateTo = cc.rotateTo(0.35, mouseAngle);
                        this.barrelNode.runAction(rotateTo);
                        this.pathAngle = 90 - this.barrelNode.rotation;
                        this.isCannonMoving = true;
                        this.barrelNode.runAction(new cc.Sequence(rotateTo, cc.callFunc(this.EnablecannonMoving, this)));
                    } else {
                        this.barrelNode.rotation = mouseAngle;
                    }
                }
            }
        }
    },

    TouchEnded: function() {
        if (!this.isCannonMoving && !this.bubbleGeneratorComponent.isMovingSmoothly) {
            if (!this.isPathShown) {
                return;
            }
            this.FireBullets();
            this.unschedule(this.TouchEnded);
        } else {
            this.schedule(this.TouchEnded, 0.1);
        }
    },

    EnablecannonMoving: function() {
        this.isCannonMoving = false;
    },

    FireBullets: function() {
        this.isPathShown = false;

        if (!this.isPathShown) {
            this.DestroyPath();
        }

        if (!this.gameplayManagerNodeComponent.isGameOver && !this.isCannonMoving) {
            if (!this.gameplayManagerNodeComponent.isPaused && !this.bubbleGeneratorComponent.isBubbleFired) {
                this.HidePath();
                var bubble = this.bulletTwo.getComponent("Bubble");
                bubble.isFired = true;
                this.gameplayManagerNodeComponent.singleBubbleBlaster = true;
                this.bubbleGeneratorComponent.isBubbleFired = true;
                bubble.initialAngle = (90 - this.barrelNode.rotation);

                this.SwapBullets();
                this.CreateBullets();
            }
        }

    },

    DestroyAllCreatedBullets: function() {
        if (this.allCreatedBulletArray != null) {
            for (var i = 0; i < this.allCreatedBulletArray.length; i++) {
                if (this.allCreatedBulletArray[i] != null) {
                    this.allCreatedBulletArray[i].destroy();
                }
            }
        }
    },

    CreateBullets: function() {
        // this.createCounter++;
        // if (this.createCounter % 20) {
        //     this.bulletOne = cc.instantiate(this.GetRandomBullet());
        // } else {
        //     this.bulletOne = cc.instantiate(this.GetRandomPowerUps());
        // }
        // this.bulletOne.getComponent("Bubble").cannonBubble = true;
        // this.secondaryBubbleSpawnPoint.addChild(this.bulletOne);
        // this.bulletOne.position = new cc.v2(100, 50);
        // this.allCreatedBulletArray.push(this.bulletOne);


        if (this.gameplayManagerNodeComponent.score <= 60 && !firstPhaseCompleted) {
            // Generate All PowerUps Bubble Array for 1st Phase
            firstPhaseCompleted = true;
            this.totalCollectedPowerUps = [0, 1, 2, 2];
            this.totalCollectedPowerUps = this.shuffle(this.totalCollectedPowerUps);
            //console.log("Shuffled Array", this.totalCollectedPowerUps);
        } else if (this.gameplayManagerNodeComponent.score > 60 &&
            this.gameplayManagerNodeComponent.score <= 150 && !secondPhaseCompleted) {
            // Generate All PowerUps Bubble Array for 2nd Phase
            secondPhaseCompleted = true;
            this.totalCollectedPowerUps = [0, 1, 1, 2, 2];
            this.totalCollectedPowerUps = this.shuffle(this.totalCollectedPowerUps);
        } else if (this.gameplayManagerNodeComponent.score > 150 && !repeatPhase) {
            // Generate All PowerUps Bubble Array for 3rd Phase onwards
            repeatPhase = true;
            this.totalCollectedPowerUps = [0, 0, 1, 1, 2, 2];
            this.totalCollectedPowerUps = this.shuffle(this.totalCollectedPowerUps);
        }
        if (this.gameplayManagerNodeComponent.score > (150 + this.powerUpsCounter * this.powerUpsRange)) {
            repeatPhase = false;
            this.powerUpsCounter++;
        }
        var generatedPowerUps = this.getPowerUps();

        /*if (this.gameplayManagerNodeComponent.score >= this.powerUpsCounter * this.powerUpsRange) {
            console.log("this.gameplayManagerNodeComponent.score : " + this.gameplayManagerNodeComponent.score);
            this.bulletOne = cc.instantiate(this.GetRandomPowerUps());
            this.powerUpsCounter++;
        } else {
            this.bulletOne = cc.instantiate(this.GetRandomBullet());
        }*/
        if (generatedPowerUps == null) {
            this.bulletOne = cc.instantiate(this.GetRandomBullet());
        } else {
            this.bulletOne = generatedPowerUps;
        }
        this.bulletOne.getComponent("Bubble").cannonBubble = true;
        this.secondaryBubbleSpawnPoint.addChild(this.bulletOne);
        this.bulletOne.position = new cc.v2(100, 50);
        this.allCreatedBulletArray.push(this.bulletOne);
    },

    getPowerUps: function() {
        var rndm = Math.random();
        if (this.totalCollectedPowerUps.length <= 0) {
            return null;
        }
        if (rndm < 0.25) {
            var popedValue = this.totalCollectedPowerUps.pop();
            var bubble = cc.instantiate(this.powerUpsArray[popedValue]);
            return bubble;
        }
        return null;
    },

    shuffle: function(arra1) {
        var ctr = arra1.length,
            temp, index;

        // While there are elements in the array
        while (ctr > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * ctr);
            // Decrease ctr by 1
            ctr--;
            // And swap the last element with it
            temp = arra1[ctr];
            arra1[ctr] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    },

    SwapBullets: function() {
        this.bulletTwo = this.bulletOne;
        this.bulletTwo.removeFromParent();
        this.bulletTwo.runAction(new cc.Spawn(cc.moveTo(0.2, cc.v2(0, 0)), cc.scaleTo(0.4, 2.5, 2.5)));
        this.primaryBubbleSpawnPoint.addChild(this.bulletTwo);;
    },

    ExchangeBullets: function() {
        if (!this.gameplayManagerNodeComponent.isGameOver) {
            if (!this.gameplayManagerNodeComponent.isPaused) {
                var tempBullet;
                tempBullet = this.bulletTwo;
                this.bulletTwo = this.bulletOne;
                this.bulletOne = tempBullet;

                this.bulletTwo.removeFromParent();
                // this.bulletTwo.runAction(new cc.Spawn(cc.moveTo(0.5, cc.v2(0, 0)), cc.scaleTo(0.4, 2, 2)));
                this.bulletTwo.runAction(new cc.Spawn(cc.moveTo(0.2, cc.v2(0, 0)), cc.scaleTo(0.4, 2.5, 2.5)));
                this.primaryBubbleSpawnPoint.addChild(this.bulletTwo);
                this.bulletTwo.position = new cc.v2(0, 0);

                this.bulletOne.removeFromParent();
                // this.bulletOne.runAction(new cc.Spawn(cc.moveTo(0.5, cc.v2(0, 0)), cc.scaleTo(0.4, 1, 1)));
                this.bulletOne.runAction(new cc.Spawn(cc.moveTo(0.2, cc.v2(0, 0)), cc.scaleTo(0.4, 1, 1)));
                this.secondaryBubbleSpawnPoint.addChild(this.bulletOne);
                this.bulletOne.position = new cc.v2(0, 0);
            }

        }

    },

    GetRandomBullet: function() {
        var rnd = Math.random() * 4 + 0;
        var random = parseInt(rnd);
        return this.bulletArray[random];
    },

    GetRandomPowerUps: function() {
        var rnd = Math.random() * 3 + 0;
        var random = parseInt(rnd);

        return this.powerUpsArray[random];
    },

    ConvertRadianToDegree: function(_angle) {
        return _angle * (180 / Math.PI);
    },

    DrwaPath: function() {
        this.DestroyPath();
        pathArray = [];
        for (var i = 0; i < pathCount; i++) {
            pathArray[i] = cc.instantiate(this.pathPrefab);
            pathArray[i].getComponent(cc.Sprite).spriteFrame = this.primaryBubbleSpawnPoint.children[0].children[0].getComponent(cc.Sprite).spriteFrame;
            this.pathPointNode.addChild(pathArray[i]);
        }

        this.ShowPath();
    },



    DestroyPath: function() {
        for (var i = 0; i < pathArray.length; i++) {
            pathArray[i].destroy();
        }
    },

    GetCannonAngle: function() {
        var deg2rad = (Math.PI / 180);
        var cannonAngle = deg2rad * (90 - this.barrelNode.rotation);
        return cannonAngle;
    },

    HidePath: function() {
        for (var i = 0; i < pathArray.length; i++) {
            pathArray[i].active = false;
        }
    },

    ShowPath: function() {
        for (var i = 0; i < pathArray.length; i++) {
            pathArray[i].active = true;
        }
    },

    PathMarkerAnimation: function() {
        markerTimer = 0.75;

        var startIndexToInvisible = pathCount;
        var cannonAngle = this.barrelNode.rotation;

        for (var i = 0; i < pathArray.length; i++) {
            pathArray[i].rotation = cannonAngle;
            pathArray[i].x = i * pathMarkerGap * Math.cos(this.GetCannonAngle()) * markerTimer;
            pathArray[i].y = i * pathMarkerGap * Math.sin(this.GetCannonAngle()) * markerTimer;
            if (pathArray[i].x > screenWidth) {
                pathArray[i].rotation = (90 + (90 - pathArray[i].rotation));
                pathArray[i].x = 2 * screenWidth - pathArray[i].x;
            } else if (pathArray[i].x < -screenWidth) {
                pathArray[i].rotation = (90 - (pathArray[i].rotation - 90));
                pathArray[i].x = (Math.abs(pathArray[i].x + screenWidth) * 2) + pathArray[i].x;
            }
            if (!this.shouldVisible(pathArray[i])) {
                startIndexToInvisible = i;
            }
            if (i >= startIndexToInvisible) {
                pathArray[i].active = false;
            } else {
                pathArray[i].active = true;
            }
        }
    },

    shouldVisible: function(pathNode) {
        return !this.checkForIntersection(pathNode);
    },

    checkForIntersection: function(pathNode) {
        for (var i = (this.bubbleGeneratorComponent.totalGeneratedRow.length - 1); i >= 0; i--) {
            for (var j = 0; j < this.bubbleGeneratorComponent.totalGeneratedRow[i].length; j++) {
                var bubble = this.bubbleGeneratorComponent.totalGeneratedRow[i][j];
                if (bubble != null) {
                    // Check for intersections
                    if (this.circleIntersection(pathNode.position.x + pathNode.parent.position.x,
                            pathNode.position.y + pathNode.parent.position.y,
                            25,
                            bubble.position.x,
                            bubble.position.y,
                            25)) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    circleIntersection: function(x1, y1, r1, x2, y2, r2) {
        // Calculate the distance between the centers
        var dx = x1 - x2;
        var dy = y1 - y2;
        var len = Math.sqrt(dx * dx + dy * dy);
        if (len < r1 + r2) {
            // Circles intersect
            return true;
        }

        return false;
    },

    update(dt) {
        if (!this.gameplayManagerNodeComponent.isGameOver) {
            if (this.bulletTwo != null && this.bulletOne != null) {
                this.bulletTwo.position = new cc.Vec2(0, 0);
                this.bulletOne.position = new cc.Vec2(0, 0);
            }
            if (!this.gameplayManagerNodeComponent.isGameOver && this.isPathShown) {
                if (!this.gameplayManagerNodeComponent.isPaused) {
                    this.PathMarkerAnimation();
                }
            }
        }
    },

});