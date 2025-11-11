var screenWidth = 335;
cc.Class({
    extends: cc.Component,

    properties: {
        gameManagerComponent: null,
        bubbleManagerComponent: null,

        // bubbleId: { default: new cc.Vec2(-1, -1), type: cc.Vec2 },
        bubbleId: new cc.Vec2(-1, -1),
        bubbleType: cc.String,
        isChecked: false,
        cannonBubble: false,
        bubbleScaling: false,
        isFired: false,
        isEven: false,
        movementSpeed: { default: 60, type: cc.Float },
        initialAngle: { default: 0, type: cc.Float },
        rowIndex: { default: 0, type: cc.Integer },
        rb: { default: null, type: cc.RigidBody },
        isFreeFallBubbble: false,

        bubbleAudioSource: null,
        multipleBlustSound: { default: null, type: cc.AudioClip },
        matchedBlustSound: { default: null, type: cc.AudioClip },
        singleAddbubbleSound: { default: null, type: cc.AudioClip },
        // soundManagerNode:cc.Node,
        SoundManagerComponent: null,

        animationPlay: false,

        // Add these below variables to move the bubble smoothly to destination
        nextPosition: {default:cc.Vec2(0, 0)},
        shouldMoveSmothly:false,
        smothMovementSpeed: {default:400, type:cc.Float},
    },

    onLoad() {
        // screenWidth = cc.size(cc.visibleRect.width/2);
        var soundManagerNode = cc.find("Canvas/AudioManager");
        this.SoundManagerComponent = soundManagerNode.getComponent("SoundManager");
        var gameplayNode = cc.find("Canvas/MainCamera/GamePlay");
        this.bubbleManagerComponent = gameplayNode.getComponent("BubbleManager");
        this.gameManagerComponent = gameplayNode.getComponent("GameplayManager");
        this.rb = this.node.getComponent(cc.RigidBody);
        this.node.children[1].active = false;
        // console.log("The bubble node.................."+this.node);
        this.bubbleAudioSource = this.node.getComponent(cc.AudioSource);

        this.setDefaultSize();

    },

    setDefaultSize:function () {
        this.node.width = this.bubbleManagerComponent.maximumScreenwidth / this.bubbleManagerComponent.maximumNumberOfRow;
        this.node.height = this.node.width;
        this.node.children[0].width = this.node.width;
        this.node.children[0].height = this.node.height;
        if (this.bubbleType == "Bomb") {
            this.node.children[0].width += 44;
            this.node.children[0].height += 72;
        }
    },

    SetBubbleId: function(colIndex) {
        this.bubbleId.x = colIndex;
        this.bubbleId.y = this.rowIndex;
        cc.RigidBody.enable = false;
    },

    update(dt) {
        
        if (this.gameManagerComponent.isGameOver) {
            this.isFreeFallBubbble = true;
            //this.disableBubble();
        }

        if (this.isFired && this.bubbleManagerComponent.isBubbleFired) { // && !this.gameManagerComponent.isGameOver
            this.updateBubblePosition(dt);
            if (!this.bubbleScaling) {
                this.bubbleScaling = true;
                var movePath = new cc.ScaleTo(0.1, 1.0, 1.0);
                this.node.runAction(movePath);
            }
        }
        if (this.isFreeFallBubbble) {
            this.freeFallBubble(dt);
        }
        if (this.shouldMoveSmothly) {
            //console.log("Node Position : "+this.node.position);
            this.node.position = new cc.Vec2(this.node.position.x, this.node.position.y - dt* this.smothMovementSpeed);
            if (this.node.position.y <= this.nextPosition.y) {
                //console.log("Bubble ID : "+this.bubbleId + " : "+this.bubbleManagerComponent.totalGeneratedRow.length);
                if (this.bubbleId.x == (this.bubbleManagerComponent.totalGeneratedRow.length - 1))  this.bubbleManagerComponent.isMovingSmoothly = false;
                this.shouldMoveSmothly = false;
                this.node.position = this.nextPosition;
            }
        }


    },

    updateBubblePosition: function(dt) {
        var deg2rad = (Math.PI / 180);
        var angleInRad = deg2rad * this.initialAngle;
        var cosAngle = Math.cos(angleInRad);
        var sinAngle = Math.sin(angleInRad);
        this.node.x += this.movementSpeed * cosAngle * (dt * 30);
        this.node.y += this.movementSpeed * sinAngle * (dt * 30);

        if (this.node.x >= screenWidth) {
            this.initialAngle = (90 + (90 - this.initialAngle));
            this.node.x = screenWidth;
        } else if (this.node.x < -screenWidth) {
            this.initialAngle = (90 - (this.initialAngle - 90));
            this.node.x = -screenWidth;
        }

        this.checkForIntersection();
        this.destroyBubbleOnceCrossTheScreen();
    },

    destroyBubbleOnceCrossTheScreen: function() {
        var offset = 30;
        var bubbleRelativeYPosition = (this.node.position.y + this.node.parent.position.y);
        if (bubbleRelativeYPosition > (this.bubbleManagerComponent.defaultBubbleYPosition + offset)) {
            console.log("Destroy Upper Level Bubble");
            this.bubbleManagerComponent.isBubbleFired = false;
            this.node.destroy();
        }
    },

    checkForIntersection: function() {
        var intersectedBubbles = [];
        for (var i = 0; i < this.bubbleManagerComponent.totalGeneratedRow.length; i++) {
            for (var j = 0; j < this.bubbleManagerComponent.totalGeneratedRow[i].length; j++) {
                var bubble = this.bubbleManagerComponent.totalGeneratedRow[i][j];
                if (bubble != null) {
                    // Check for intersections
                    if (this.circleIntersection(this.node.position.x + this.node.parent.position.x,
                            this.node.position.y + this.node.parent.position.y,
                            this.node.width/2,
                            bubble.position.x,
                            bubble.position.y,
                            this.node.height/2)) {
                        intersectedBubbles.push(bubble);
                    }
                }
            }
        }
        if (intersectedBubbles.length > 0) {
            this.snapBubble(intersectedBubbles);
        }
    },

    snapBubble: function(intersectedBubbles) {
        this.isFired = false;
        var lowestIndex = -1;
        var referenceBubbleNode = null;
        for (var itr = 0; itr < intersectedBubbles.length; itr++) {
            //console.log(itr);
            var otherBubble = intersectedBubbles[itr].getComponent("Bubble");
            if (lowestIndex == -1) {
                lowestIndex = otherBubble.bubbleId.x;
                referenceBubbleNode = intersectedBubbles[itr];
            } else if (lowestIndex > otherBubble.bubbleId.colIndex) {
                lowestIndex = otherBubble.bubbleId.x;
                referenceBubbleNode = intersectedBubbles[itr];
            }
        }
        //console.log("Index to Snap : " + lowestIndex + " : " + referenceBubbleNode.position);
        this.bubbleManagerComponent.addBubble(lowestIndex + 1, referenceBubbleNode, this.node);
        this.bubbleManagerComponent.isBubbleFired = false;
    },

    // Check if two circles intersect
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

    destroyBubble: function() {
        this.disableBubble();
        // Destroy this bubble
        this.ShowScoreAnimation(15);
        if (this.bubbleManagerComponent.BubbleType == 0) {
            this.SoundManagerComponent.PlayMultipleBubbleBlustSound();
            // console.log("normal");
        } else if (this.bubbleManagerComponent.BubbleType == 1) {
            this.SoundManagerComponent.PlayBombBlustSound();
            // console.log("bomb");
        } else if (this.bubbleManagerComponent.BubbleType == 2) {
            this.SoundManagerComponent.PlayFireBallBlustSound();
            // console.log("fire");
        } else if (this.bubbleManagerComponent.BubbleType == 3) {
            this.SoundManagerComponent.PlayWildBallBlustSound();
            // console.log("wild");
        }
    },

    disableBubble: function() {
        // this.bubbleManagerComponent.totalGeneratedRow[this.bubbleId.x][this.bubbleId.y].node.childern[0].active = true;
        if (this.bubbleManagerComponent.totalGeneratedRow[this.bubbleId.x][this.bubbleId.y] != null)
            this.bubbleManagerComponent.totalGeneratedRow[this.bubbleId.x][this.bubbleId.y] = null;

        if (!this.gameManagerComponent.isGameOver) {
            this.gameManagerComponent.CalculateScore();
            this.gameManagerComponent.UpdateScoreText();

            //this.gameManagerComponent.CalculateCollectedScore();
            //this.gameManagerComponent.ShowCollectedScoreText();
        }

    },

    freeFallBubble: function(_dt) {
        if (this.node.y < 520) {
            // this.node.y = 0;
            // this.node.children[0].rotation = 0;
            if (!this.animationPlay) {
                this.node.children[0].getComponent(cc.Animation).play("BlastAnimation");
                this.animationPlay = true;
            }

            this.scheduleOnce(function() {
                this.node.destroy();
            }, 10);

        } else {
            this.node.y -= this.movementSpeed * (_dt * 15);
            this.node.children[0].rotation += _dt * 90;
        }
    },

    ShowScoreAnimation: function(_delayTime) {
        // this.node.children[1].active = true;
        this.node.children[0].getComponent(cc.Animation).play("BlastAnimation");

        this.scheduleOnce(function() {
            this.node.destroy();
        }, _delayTime);
    },


})