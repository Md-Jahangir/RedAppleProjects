var rowCounter = 0;
var PowerUpsType;

PowerUpsType = cc.Enum({
    NORMAL: 0,
    BOMB: 1,
    FIREBALL: 2,
    WILDBALL: 3
});

cc.Class({
    extends: cc.Component,

    properties: {

        BubbleType: { default: PowerUpsType.NORMAL, type: PowerUpsType },

        cannonNode: cc.Node,
        cannonNodeComponent: null,
        gameManagerComponent: null,

        bubblePrefab: cc.Prefab,
        bubblePrefabArray: [cc.Prefab],
        bubbleHolder: cc.Node,
        isBubbleFired: false,
        canvasNode: cc.Node,
        bubbleRadius: { default: 0, type: cc.Float },
        yOffset: { default: 0, type: cc.Float },
        bubbleDownWardMovementAmount: { default: 0, type: cc.Float },
        isEven: false,
        defaultBubbleYPosition: { default: 0, type: cc.Float },
        totalGeneratedRow: [],
        defaultRows: [],
        totalRowCount: 0,

        soundManagerNode: cc.Node,
        SoundManagerComponent: null,

        isGeneratingNewRow: false,
        totalDestroyedBubble: { default: 0, type: cc.Integer },
        maximumNumberOfRow: { default: 0, type: cc.Integer },

        maximumScreenwidth: { default: 0, type: cc.Float },

        isMovingSmoothly: false,
    },

    onLoad() {
        this.cannonNodeComponent = this.cannonNode.getComponent("Cannon");
        this.gameManagerComponent = this.getComponent("GameplayManager");
        this.SoundManagerComponent = this.soundManagerNode.getComponent("SoundManager");
        this.bubbleRadius = (this.maximumScreenwidth / this.maximumNumberOfRow) - 2; // 4 is the offset for perfect snapping

    },

    start() {
        this.initInitialBubbleRow();
    },

    updateTime: function() {
        this.bubbleDownWardMovementAmount += (this.bubbleDownWardMovementAmount * 0.06);
        //console.log("Update Timer"+this.bubbleDownWardMovementAmount);
    },

    update(dt) {
        //console.log(this.gameManagerComponent.isGameOver + " : "+this.isGeneratingNewRow+" : "+this.gameManagerComponent.isPaused+" : "+this.isMovingSmoothly);
        if (!this.gameManagerComponent.isGameOver && !this.isGeneratingNewRow) {
            if (!this.gameManagerComponent.isPaused && !this.isMovingSmoothly) {
                this.moveBubblesDownWard(dt * this.bubbleDownWardMovementAmount);
            }
        }
    },


    initInitialBubbleRow: function() {
        this.schedule(this.updateTime, 60, 5);
        // this.defaultBubbleYPosition = (this.canvasNode.height + this.yOffset + this.bubbleRadius);
        this.defaultBubbleYPosition = this.canvasNode.height - this.bubbleRadius;// - 200;
        /*this.createDefaultRow();
        for (var itr = 0; itr < this.defaultRows.length; itr++) {
            this.createBubbles(this.defaultRows[itr], this.defaultBubbleYPosition);
        }
        var arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this.createBubbles(arr, this.defaultBubbleYPosition);
        this.createBubbles(arr, this.defaultBubbleYPosition);*/

        var defaultRowsArray = this.getDefaultPattern();
        for (var itr = 0; itr < defaultRowsArray.length; itr++) {
            this.createBubbles(defaultRowsArray[itr], this.defaultBubbleYPosition, false, true);
        }
        this.createBubbles(this.getRandomRowPattern(), this.defaultBubbleYPosition, false, true);
    },


    createBubbles: function(row, bubbleYPos, shouldMoveSmothly = false, isFirstTime = false) {
        //var bubbleYPos = screen.height + this.yOffset + this.bubbleRadius;
        /*if (shouldMoveSmothly) {
            this.isMovingSmoothly = true;
            this.resetOtherBubbleSmoothly(bubbleYPos);
        } else {
            this.resetOtherBubblesRow(bubbleYPos);
        }*/

        if (isFirstTime && this.totalGeneratedRow.length > 0) {
            this.isMovingSmoothly = true;
        }

        this.resetOtherBubbleSmoothly(bubbleYPos);

        var rowToInterate = row.length;
        if (!this.isEven) {
            //rowToInterate -= 1;
        }
        var bubbleArray = new Array(this.maximumNumberOfRow);
        for (var itr = 0; itr < rowToInterate; itr++) {
            if (row[itr] != 0) {
                var rnd = Math.random() * 4 + 0;
                var random = parseInt(rnd);
                var bubble = cc.instantiate(this.bubblePrefabArray[random]);
                var bubbleXPos = 0; //bubbleXPos = (itr * this.bubbleRadius) + (this.bubbleRadius / 2);
                if (this.isEven) {
                    bubbleXPos = (itr * this.bubbleRadius) + (this.bubbleRadius / 2);
                } else {
                    bubbleXPos = (itr * this.bubbleRadius) + this.bubbleRadius;
                }
                bubble.position = new cc.Vec2(bubbleXPos, bubbleYPos);
                bubble.getComponent("Bubble").rowIndex = itr;
                bubble.getComponent("Bubble").isEven = this.isEven;
                this.bubbleHolder.addChild(bubble);
                //bubbleArray.push(bubble);
                bubbleArray[itr] = bubble;
                // console.log("tile Position : " + tile.position + "|| Grid position : " + gridArray[j][i]);
                //tile.getComponent("Bubble").SetBubbleId(j, i);
            }
        }
        this.totalGeneratedRow.unshift(bubbleArray);
        this.totalRowCount++;
        this.isEven = !this.isEven;
        this.setBubbleIds();
        // console.log(this.totalGeneratedRow.length);
    },

    addBubble: function(columnIndex, referenceBubble, snappableBubble) {
        snappableBubble.Scale = new cc.ScaleTo(0, 1.0, 1.0);
        var currentRowPositions = [];
        var nextRowPositions = [];
        var rowToInterate = this.maximumNumberOfRow;
        var xPos = snappableBubble.x + snappableBubble.parent.position.x;
        // Check Nearest Data for existing row
        //if (!referenceBubble.getComponent("Bubble").isEven) rowToInterate -= 1;
        var currentXPos = 0;
        var currentYPos = referenceBubble.position.y;
        for (var itr = 0; itr < rowToInterate; itr++) {
            //console.log("Is Even : "+referenceBubble.getComponent("Bubble").isEven);
            if (referenceBubble.getComponent("Bubble").isEven) {
                currentXPos = (itr * this.bubbleRadius) + (this.bubbleRadius / 2);
            } else {
                currentXPos = (itr * this.bubbleRadius) + this.bubbleRadius;
            }
            var pos = new cc.Vec2(currentXPos, currentYPos);
            currentRowPositions.push(pos);
        }
        snappableBubble.position = new cc.Vec2(xPos, currentYPos);
        // console.log("Snapple Bubble Position Existing Row: "+snappableBubble.position);
        var currentRowData = this.checkClosestBubbleData(currentRowPositions, snappableBubble.position, columnIndex - 1);
        // Check Nearest Data for Above row 
        var nextXPos = 0;
        var nextYPos = (referenceBubble.position.y - this.bubbleRadius) + this.yOffset;
        for (var itr = 0; itr < rowToInterate; itr++) {
            if (referenceBubble.getComponent("Bubble").isEven) {
                nextXPos = (itr * this.bubbleRadius) + this.bubbleRadius;
            } else {
                nextXPos = (itr * this.bubbleRadius) + (this.bubbleRadius / 2);
            }
            var pos = new cc.Vec2(nextXPos, nextYPos);
            nextRowPositions.push(pos);
        }
        snappableBubble.position = new cc.Vec2(xPos, nextYPos);
        var nextRowData = this.checkClosestBubbleData(nextRowPositions, snappableBubble.position, columnIndex);

        snappableBubble.removeFromParent();
        this.bubbleHolder.addChild(snappableBubble);
        // console.log(currentRowData," Next Row Data ", nextRowData);
        // check which reference bubble is closest from 2 different row
        var closestIndex = 0;
        var column = 0;
        if (currentRowData[0] > nextRowData[0] || currentRowData[0] == -1) {
            snappableBubble.getComponent("Bubble").isEven = !referenceBubble.getComponent("Bubble").isEven;
            snappableBubble.position = new cc.Vec2(nextXPos, nextYPos);
            closestIndex = nextRowData[2];
            column = nextRowData[1];
            snappableBubble.getComponent("Bubble").rowIndex = closestIndex;
            snappableBubble.position = new cc.Vec2(nextRowPositions[closestIndex].x, nextRowPositions[closestIndex].y);
        } else {
            snappableBubble.getComponent("Bubble").isEven = referenceBubble.getComponent("Bubble").isEven;
            snappableBubble.position = new cc.Vec2(currentXPos, currentYPos);
            closestIndex = currentRowData[2];
            column = currentRowData[1];
            snappableBubble.getComponent("Bubble").rowIndex = closestIndex;
            snappableBubble.position = new cc.Vec2(currentRowPositions[closestIndex].x, currentRowPositions[closestIndex].y);
        }
        // Snap the Bubble From Here
        //snappableBubble.getComponent("Bubble").rowIndex = closestIndex;
        //snappableBubble.position = new cc.Vec2(positionArray[closestIndex].x, positionArray[closestIndex].y);
        this.addToGeneratedBubbleArray(snappableBubble, column, closestIndex);
        this.SoundManagerComponent.PlayAddBubbleSound();
    },

    checkClosestBubbleData: function(positionArray, positionToCompare, columnIndex) {
        var data = [3];
        var closestIndex = 0;
        var distance = -1;
        //console.log("Array Count : "+positionArray.length);
        for (var itr = 0; itr < positionArray.length; itr++) {
            if (columnIndex < this.totalGeneratedRow.length && this.totalGeneratedRow[columnIndex][itr] != null) {
                //console.log("Already Occupied Position");
                continue;
            }
            var a = positionArray[itr].x - positionToCompare.x;
            var b = positionArray[itr].y - positionToCompare.y;
            if (distance < 0 || Math.sqrt(a * a + b * b) < distance) {
                //console.log("Distance : "+distance);
                distance = Math.sqrt(a * a + b * b);
                closestIndex = itr;
            }
        }
        data[0] = distance;
        data[1] = columnIndex;
        data[2] = closestIndex;
        return data;
    },

    addToGeneratedBubbleArray: function(bubbletoAdd, columnIndex, rowIndex) {
        this.totalDestroyedBubble = 0;
        if (columnIndex > (this.totalGeneratedRow.length - 1)) {
            var bubbleArray = new Array(this.maximumNumberOfRow);
            bubbleArray[rowIndex] = bubbletoAdd;
            bubbletoAdd.getComponent("Bubble").SetBubbleId(columnIndex);
            this.totalGeneratedRow.push(bubbleArray);
            //this.isEven = !this.isEven;
        } else {
            if (this.totalGeneratedRow[columnIndex][rowIndex] != null) {
                // console.log("Already Occupied Position");
            }
            this.totalGeneratedRow[columnIndex][rowIndex] = bubbletoAdd;
            bubbletoAdd.getComponent("Bubble").SetBubbleId(columnIndex);
            //console.log("Added Bubble : ",this.totalGeneratedRow[columnIndex][rowIndex].getComponent("Bubble").bubbleId);
        }

        //if fire ball
        if (bubbletoAdd.getComponent("Bubble").bubbleType == "Fire") {
            // console.log("PowerUpsType.FIREBALL");
            this.BubbleType = PowerUpsType.FIREBALL;
            this.destroyAllHorizontalBubbles(bubbletoAdd);
        }
        //if Bomb ball
        else if (bubbletoAdd.getComponent("Bubble").bubbleType == "Bomb") {
            // console.log("PowerUpsType.BOMB");
            this.BubbleType = PowerUpsType.BOMB;
            this.destroyBombBubble(bubbletoAdd);
        }
        //if Wild ball 
        else if (bubbletoAdd.getComponent("Bubble").bubbleType == "Wild") {
            // console.log("PowerUpsType.WILDBALL");
            this.BubbleType = PowerUpsType.WILDBALL;
            this.destroyWildcardBubble(bubbletoAdd);
        } else {
            // console.log("PowerUpsType.NORMAL");
            this.BubbleType = PowerUpsType.NORMAL;
            this.removeMatchedBubbles(bubbletoAdd);
        }

    },
    // End Region

    // Destroy for FireBall 
    destroyAllHorizontalBubbles: function(firedBubble) {
        var allDestroyableBubbles = [];
        var array = [];
        array.push(firedBubble);
        allDestroyableBubbles.push(firedBubble);
        var bubbleID = firedBubble.getComponent("Bubble").bubbleId;
        var indexToDestroy = (bubbleID.x - 1) <= 0 ? 0 : (bubbleID.x - 1);
        firedBubble.getComponent("Bubble").destroyBubble();
        // Add the destroyable Bubble
        for (var i = 0; i < this.totalGeneratedRow[indexToDestroy].length; i++) {
            var bubble = this.totalGeneratedRow[indexToDestroy][i];
            if (bubble != null) {
                //allDestroyableBubbles.push(bubble);
                this.totalDestroyedBubble++;
                bubble.getComponent("Bubble").destroyBubble();
            }
        }
        //this.destroyMatchedBubbles(allDestroyableBubbles);
        this.freeFallRemainingBubbles(indexToDestroy + 1);
        this.reinitiateTotalGeneratedRow();
        // this.gameManagerComponent.ShowMessageText("AWESOME");
    },

    freeFallRemainingBubbles: function(index) {
        var tempGeneratedArray = this.totalGeneratedRow.slice();
        for (var itr = index; itr < tempGeneratedArray.length; itr++) {
            for (var i = 0; i < tempGeneratedArray[itr].length; i++) {
                var bubble = tempGeneratedArray[itr][i];
                if (bubble != null) {
                    this.totalDestroyedBubble++;
                    var bubbleComponent = bubble.getComponent("Bubble");
                    bubbleComponent.isFreeFallBubbble = true;
                    this.totalDestroyedBubble++;
                    bubbleComponent.disableBubble();
                }
            }
        }
    },

    //Destroy for bomb bubble
    destroyBombBubble: function(firedBubble) {

        var allDestroyableBubbles = [];
        var tempArray = [];
        allDestroyableBubbles.push(firedBubble);
        tempArray.push(firedBubble);
        var allBubbles = this.checkWithRecursion(allDestroyableBubbles, tempArray, 0, true, 2);
        var lowestIndex = -1;
        for (var itr = 0; itr < allDestroyableBubbles.length; itr++) {
            var bubble = allDestroyableBubbles[itr].getComponent("Bubble");
            if (lowestIndex == -1 || bubble.bubbleId.x < lowestIndex) lowestIndex = bubble.bubbleId.x;
            this.totalDestroyedBubble++;
            bubble.destroyBubble();
        }
        this.findUpperIndexOfFreeBubble(lowestIndex);
        this.reinitiateTotalGeneratedRow();
        // this.gameManagerComponent.ShowMessageText("GREAT");
    },

    destroyWildcardBubble: function(wildBubble) {
        var allTempWildCardBubble = [];
        var array = [];
        array.push(wildBubble);
        allTempWildCardBubble.push(wildBubble);
        var allWildCardBubble = this.checkWithRecursion(allTempWildCardBubble, array, 0, true, 1);
        // console.log("indexToDestroy: ", allWildCardBubble);
        for (var itr = 0; itr < allWildCardBubble.length; itr++) {
            var allDestroyableBubbles = [];
            var tempArray = [];
            if (allWildCardBubble[itr] == null) {
                continue;
            }
            allDestroyableBubbles.push(allWildCardBubble[itr]);
            tempArray.push(allWildCardBubble[itr]);
            var allBubbles = this.checkWithRecursion(allDestroyableBubbles, tempArray, 0, false);
            for (var j = 0; j < allBubbles.length; j++) {
                var bubble = allBubbles[j].getComponent("Bubble");
                this.totalDestroyedBubble++;
                bubble.destroyBubble();
            }
        }
        this.findUpperIndexOfFreeBubble(0);
        this.reinitiateTotalGeneratedRow();
        // this.gameManagerComponent.ShowMessageText("NICE");
    },

    findIndexForBombDestroy: function(allDestroyableBubbles, bombIndexArray) {
        var tempArray = [];
        for (var i = 0; i < bombIndexArray.length; i++) {
            var bombIndexBubble = bombIndexArray[i].getComponent("Bubble");
            var bubbleID = bombIndexBubble.bubbleId;

            //check left index 
            var x = bubbleID.x;
            var y = bubbleID.y - 1;
            var bubble = null;
            if (y >= 0) {
                bubble = this.totalGeneratedRow[x][y];
            }
            if (bubble != null) {
                tempArray.push(bubble);
                allDestroyableBubbles.push(bubble);
            }

            //check right index
            y = bubbleID.y + 1;
            bubble = null;
            if (y < this.maximumNumberOfRow) {
                bubble = this.totalGeneratedRow[x][y];
            }
            if (bubble != null) {
                tempArray.push(bubble);
                allDestroyableBubbles.push(bubble);
            }

            //check upper left index
            x = bubbleID.x - 1;
            y = !bombIndexArray.isEven ? bubbleID.y : (bubbleID.y - 1);
            bubble = null;
            if (x >= 0 && y >= 0) {
                bubble = this.totalGeneratedRow[x][y];
            }
            if (bubble != null) {
                tempArray.push(bubble);
                allDestroyableBubbles.push(bubble);
            }

            //check upper right index
            x = bubbleID.x - 1;
            y = !bombIndexArray.isEven ? bubbleID.y + 1 : bubbleID.y;
            bubble = null;
            if (x >= 0 && y < this.maximumNumberOfRow) {
                bubble = this.totalGeneratedRow[x][y];
            }
            if (bubble != null) {
                tempArray.push(bubble);
                allDestroyableBubbles.push(bubble);
            }

            // check lower left index
            x = bubbleID.x + 1;
            y = !bombIndexArray.isEven ? bubbleID.y : bubbleID.y - 1;
            bubble = null;
            if (x < this.totalGeneratedRow.length && y >= 0) {
                bubble = this.totalGeneratedRow[x][y];
            }
            if (bubble != null) {
                tempArray.push(bubble);
                allDestroyableBubbles.push(bubble);
            }

            // check lower right index
            x = bubbleID.x + 1;
            y = !bombIndexArray.isEven ? bubbleID.y + 1 : bubbleID.y;
            bubble = null;
            if (x < this.totalGeneratedRow.length && y < this.maximumNumberOfRow) {
                bubble = this.totalGeneratedRow[x][y];
            }
            if (bubble != null) {
                tempArray.push(bubble);
                allDestroyableBubbles.push(bubble);
            }

        } //end of for loop

        return allDestroyableBubbles;
    }, //end of findIndexForBombDestroy function

    // RemoveBubble Region
    removeMatchedBubbles: function(firedBubble) {
        var allDestroyableBubbles = [];
        var array = [];
        array.push(firedBubble);
        allDestroyableBubbles.push(firedBubble);
        var allBubbles = this.checkWithRecursion(allDestroyableBubbles, array, 0);
        if (allBubbles.length > 2) {
            this.destroyMatchedBubbles(allDestroyableBubbles);
        }

    },

    checkWithRecursion: function(allDestroyableBubbles, recursiveArray, lowestIndex, checkforConnectedBubbles = false, numberOfIteration = -1) {
        var tempArray = [];
        if (numberOfIteration == 0)
            return allDestroyableBubbles;
        for (var i = 0; i < recursiveArray.length; i++) {
            var recursiveBubble = recursiveArray[i].getComponent("Bubble");
            var bubbleID = recursiveBubble.bubbleId;
            //check left index 
            var x = bubbleID.x;
            var y = bubbleID.y - 1;
            var bubble = null;
            if (y >= 0) {
                bubble = this.totalGeneratedRow[x][y];
            }
            if (bubble != null) {
                if (checkforConnectedBubbles) {
                    if (!this.isItemInArray(allDestroyableBubbles, bubble.getComponent("Bubble").bubbleId)) {
                        tempArray.push(bubble);
                        allDestroyableBubbles.push(bubble);
                    }
                } else {
                    if (recursiveArray[i].name == bubble.name && !this.isItemInArray(allDestroyableBubbles,
                            bubble.getComponent("Bubble").bubbleId)) {
                        tempArray.push(bubble);
                        allDestroyableBubbles.push(bubble);
                    }
                }
            }
            //check right index
            y = bubbleID.y + 1;
            bubble = null;
            if (y < this.maximumNumberOfRow) {
                bubble = this.totalGeneratedRow[x][y];
            }
            if (bubble != null) {
                if (checkforConnectedBubbles) {
                    if (!this.isItemInArray(allDestroyableBubbles, bubble.getComponent("Bubble").bubbleId)) {
                        tempArray.push(bubble);
                        allDestroyableBubbles.push(bubble);
                    }
                } else {
                    if (recursiveArray[i].name == bubble.name && !this.isItemInArray(allDestroyableBubbles,
                            bubble.getComponent("Bubble").bubbleId)) {
                        tempArray.push(bubble);
                        allDestroyableBubbles.push(bubble);
                    }
                }
            }
            //check upper left index
            x = bubbleID.x - 1;
            y = !recursiveBubble.isEven ? bubbleID.y : (bubbleID.y - 1);
            bubble = null;
            if (x >= 0 && y >= 0) {
                bubble = this.totalGeneratedRow[x][y];
            }
            if (bubble != null) {
                if (checkforConnectedBubbles) {
                    if (!this.isItemInArray(allDestroyableBubbles, bubble.getComponent("Bubble").bubbleId)) {
                        tempArray.push(bubble);
                        allDestroyableBubbles.push(bubble);
                    }
                } else {
                    if (recursiveArray[i].name == bubble.name && !this.isItemInArray(allDestroyableBubbles,
                            bubble.getComponent("Bubble").bubbleId)) {
                        tempArray.push(bubble);
                        allDestroyableBubbles.push(bubble);
                    }
                }
            }
            //check upper right index
            x = bubbleID.x - 1;
            y = !recursiveBubble.isEven ? bubbleID.y + 1 : bubbleID.y;
            bubble = null;
            if (x >= 0 && y < this.maximumNumberOfRow) {
                bubble = this.totalGeneratedRow[x][y];
            }
            if (bubble != null) {
                if (checkforConnectedBubbles) {
                    if (!this.isItemInArray(allDestroyableBubbles, bubble.getComponent("Bubble").bubbleId)) {
                        tempArray.push(bubble);
                        allDestroyableBubbles.push(bubble);
                    }
                } else {
                    if (recursiveArray[i].name == bubble.name && !this.isItemInArray(allDestroyableBubbles,
                            bubble.getComponent("Bubble").bubbleId)) {
                        tempArray.push(bubble);
                        allDestroyableBubbles.push(bubble);
                    }
                }
            }
            // check lower left index
            x = bubbleID.x + 1;
            y = !recursiveBubble.isEven ? bubbleID.y : bubbleID.y - 1;
            bubble = null;
            if (x < this.totalGeneratedRow.length && y >= 0) {
                bubble = this.totalGeneratedRow[x][y];
            }
            if (bubble != null) {
                if (checkforConnectedBubbles) {
                    if (!this.isItemInArray(allDestroyableBubbles, bubble.getComponent("Bubble").bubbleId)) {
                        tempArray.push(bubble);
                        allDestroyableBubbles.push(bubble);
                    }
                } else {
                    if (recursiveArray[i].name == bubble.name && !this.isItemInArray(allDestroyableBubbles,
                            bubble.getComponent("Bubble").bubbleId)) {
                        tempArray.push(bubble);
                        allDestroyableBubbles.push(bubble);
                    }
                }
            }
            // check lower right index
            x = bubbleID.x + 1;
            y = !recursiveBubble.isEven ? bubbleID.y + 1 : bubbleID.y;
            bubble = null;
            if (x < this.totalGeneratedRow.length && y < this.maximumNumberOfRow) {
                bubble = this.totalGeneratedRow[x][y];
            }
            if (bubble != null) {
                if (checkforConnectedBubbles) {
                    if (!this.isItemInArray(allDestroyableBubbles, bubble.getComponent("Bubble").bubbleId)) {
                        tempArray.push(bubble);
                        allDestroyableBubbles.push(bubble);
                    }
                } else {
                    if (recursiveArray[i].name == bubble.name && !this.isItemInArray(allDestroyableBubbles,
                            bubble.getComponent("Bubble").bubbleId)) {
                        tempArray.push(bubble);
                        allDestroyableBubbles.push(bubble);
                    }
                }
            }
        }
        if (numberOfIteration > 0) numberOfIteration--;
        if (tempArray.length > 0) {
            var newArray = tempArray.slice();
            //console.log("Pushed Element : "+ checkforConnectedBubbles +" : ", newArray);
            return this.checkWithRecursion(allDestroyableBubbles, newArray, lowestIndex, checkforConnectedBubbles, numberOfIteration);
        }
        return allDestroyableBubbles;
    },

    destroyMatchedBubbles: function(allDestroyableBubbles) {
        var lowestIndex = -1;
        for (var itr = 0; itr < allDestroyableBubbles.length; itr++) {
            var bubble = allDestroyableBubbles[itr].getComponent("Bubble");
            if (lowestIndex == -1 || bubble.bubbleId.x < lowestIndex) lowestIndex = bubble.bubbleId.x;
            this.totalDestroyedBubble++;
            bubble.destroyBubble();
            // this.gameManagerComponent.score +=1;
        }
        this.findUpperIndexOfFreeBubble(lowestIndex);
        this.reinitiateTotalGeneratedRow();
        // console.log("Score: "+this.gameManagerComponent.score);
    },

    //Find the upper index of not linked bubble
    findUpperIndexOfFreeBubble: function(startIndex) {
        var nonClusterbubbble = null;
        var nonClusterBubblesArray = [];
        startIndex = startIndex > 0 ? startIndex : startIndex + 1;
        for (var i = startIndex; i < this.totalGeneratedRow.length; i++) {
            for (var j = 0; j < this.totalGeneratedRow[i].length; j++) {
                nonClusterbubbble = this.totalGeneratedRow[i][j];
                if (nonClusterbubbble != null) {
                    if (this.checkIfNotconnected(nonClusterbubbble)) {
                        nonClusterBubblesArray.push(nonClusterbubbble);
                    }
                }
            }
        }
        if (nonClusterBubblesArray.length > 0) {
            for (var i = 0; i < nonClusterBubblesArray.length; i++) {
                var bubble = nonClusterBubblesArray[i].getComponent("Bubble");
                // console.log("Non Cluster Bubble : " + bubble.bubbleId + " name : " + bubble.name);
            }
            var bubbleArrayToCheck = nonClusterBubblesArray.slice();
            this.findAllConnectedBubbles(bubbleArrayToCheck, startIndex);
        }
    },

    // check if the there is any connected bubble with the non cluster bubble 
    findAllConnectedBubbles: function(nonClusterBubblesArray, lowestIndex) {
        for (var i = 0; i < nonClusterBubblesArray.length; i++) {
            var allDestroyableBubbles = [];
            var tempArray = [];
            if (nonClusterBubblesArray[i] == null) {
                continue;
            }
            allDestroyableBubbles.push(nonClusterBubblesArray[i]);
            tempArray.push(nonClusterBubblesArray[i]);
            var allBubbles = this.checkWithRecursion(allDestroyableBubbles, tempArray, lowestIndex, true);
            var bubble = nonClusterBubblesArray[i].getComponent("Bubble");
            // console.log("Non Cluster Bubble : " + bubble.bubbleId);

            if (this.isDestroyableBubbles(allBubbles)) {
                // console.log("isdestroy: " + allBubbles.length);
                for (var j = 0; j < allBubbles.length; j++) {
                    var bubble = allBubbles[j].getComponent("Bubble");
                    bubble.isFreeFallBubbble = true;
                    this.totalDestroyedBubble++;
                    bubble.disableBubble();
                    this.scheduleOnce(function() {
                        //Bottom line cross then play sound bubble blust
                        this.SoundManagerComponent.PlayMultipleBubbleBlustSound();
                    }, 0.6);


                }
            }
        }
    },

    isDestroyableBubbles: function(allBubbles) {
        var lowestIndex = allBubbles[0].getComponent("Bubble").bubbleId.x;
        for (var i = 0; i < allBubbles.length; i++) {
            var bubble = allBubbles[i];
            var id = bubble.getComponent("Bubble").bubbleId;
            // console.log(id.x + " : " + lowestIndex);
            if (id.x == lowestIndex) {
                // console.log("Is Connected : "+this.checkIfNotconnected(bubble));
                if (!this.checkIfNotconnected(bubble)) return false;
            }
        }
        return true;
    },

    // use recursion to check  if the connected bubble is also connected with another bubble 

    checkIfNotconnected: function(_bubble) {
        var refBubble = _bubble.getComponent("Bubble");
        var bubbleID = refBubble.bubbleId;
        //check upper left index
        var x = bubbleID.x - 1;
        var y = !refBubble.isEven ? bubbleID.y : (bubbleID.y - 1);
        var bubble = null;
        //console.log("Upper left : "+x +" , "+y);
        if (x >= 0 && y >= 0) bubble = this.totalGeneratedRow[x][y];
        if (bubble != null) return false;
        //check upper right index
        x = bubbleID.x - 1;
        y = !refBubble.isEven ? bubbleID.y + 1 : bubbleID.y;
        bubble = null;
        //console.log("Upper Right : "+x +" , "+y);
        if (x >= 0 && y < this.maximumNumberOfRow) bubble = this.totalGeneratedRow[x][y];
        if (bubble != null) return false;
        return true;
    },

    reinitiateTotalGeneratedRow: function() {
        var tempGeneratedArray = this.totalGeneratedRow.slice();
        var bubbleFound = false;
        for (var i = (tempGeneratedArray.length - 1); i > 0; i--) {
            bubbleFound = false;
            for (var j = 0; j < tempGeneratedArray[i].length; j++) {
                var bubble = tempGeneratedArray[i][j];
                if (bubble != null) {
                    bubbleFound = true;
                    break;
                }
            }
            if (!bubbleFound) {
                this.totalGeneratedRow.splice(i, 1);
            }
        }
        if (this.totalGeneratedRow.length == 0) {
            var arr = [1, 1, 1, 1, 1, 1, 1, 1];
            this.createBubbles(arr, this.defaultBubbleYPosition);
        }

        this.checkAndUpdateNumberOfRow();
        this.gameManagerComponent.CalculateCollectedScore(this.totalDestroyedBubble);
    },

    checkAndUpdateNumberOfRow: function() {
        var maximumNumberToShow = 6;
        var numberOfIteration = maximumNumberToShow - this.totalGeneratedRow.length;
        if (numberOfIteration > 0) {
            //this.isGeneratingNewRow = true;
            /*for (var itr = 0; itr < numberOfIteration; itr++) {
                this.createBubbles(this.getRandomRowPattern(), this.defaultBubbleYPosition);
            }*/
            this.schedule(function() {
                // Here `this` is referring to the component
                this.createBubbles(this.getRandomRowPattern(), this.defaultBubbleYPosition, true);
            }, 0.2, (numberOfIteration - 1), 0);

            //this.createBubbles(this.getRandomRowPattern(), this.defaultBubbleYPosition, true);
        }
    },

    // callback : function (numberOfIteration) {
    //     if (this.rowCounter == numberOfIteration) {
    //         // Cancel this timer at the sixth call-back
    //         this.isGeneratingNewRow = false;
    //         this.unschedule(this.callback);
    //     }
    //     this.createBubbles(this.getRandomRowPattern(), this.defaultBubbleYPosition);
    //     this.rowCounter++;
    // },

    isItemInArray: function(array, bubbleId) {
        for (var i = 0; i < array.length; i++) {
            // This if statement depends on the format of your array
            if (array[i].getComponent("Bubble").bubbleId.x == bubbleId.x && array[i].getComponent("Bubble").bubbleId.y == bubbleId.y) {
                return true; // Found it
            }
        }
        return false; // Not found
    },

    // End Region

    setBubbleIds: function() {
        for (var itr = 0; itr < this.totalGeneratedRow.length; itr++) {
            for (var bIndex = 0; bIndex < this.totalGeneratedRow[itr].length; bIndex++) {
                var bubbleNode = this.totalGeneratedRow[itr][bIndex];
                if (bubbleNode != null) {
                    var bubble = this.totalGeneratedRow[itr][bIndex].getComponent("Bubble");
                    bubble.SetBubbleId(itr);
                }
            }
        }
    },

    resetOtherBubblesRow: function(topPosition) {
        for (var itr = 0; itr < this.totalGeneratedRow.length; itr++) {
            for (var bIndx = 0; bIndx < this.totalGeneratedRow[itr].length; bIndx++) {
                var bubble = this.totalGeneratedRow[itr][bIndx];
                if (bubble != null) {
                    //console.log("calling from here");
                    var nextPosition = topPosition - ((itr + 1) * (this.bubbleRadius - this.yOffset));
                    bubble.position = new cc.Vec2(bubble.position.x, nextPosition);
                }
            }
        }
    },

    resetOtherBubbleSmoothly: function(topPosition) {
        for (var itr = 0; itr < this.totalGeneratedRow.length; itr++) {
            for (var bIndx = 0; bIndx < this.totalGeneratedRow[itr].length; bIndx++) {
                var bubble = this.totalGeneratedRow[itr][bIndx];
                if (bubble != null) {
                    //console.log("calling from here");
                    var nextPosition = topPosition - ((itr + 1) * (this.bubbleRadius - this.yOffset));
                    var bubbleComponent = bubble.getComponent("Bubble");
                    bubbleComponent.shouldMoveSmothly = true;
                    bubbleComponent.nextPosition = new cc.Vec2(bubble.position.x, nextPosition);
                }
            }
        }
    },

    createDefaultRow: function() {
        // var numberOfRow = parseInt(Math.random() * 4 + 3);
        var numberOfRow = 5;
        this.defaultRows = [];
        for (var itr = 0; itr < numberOfRow; itr++) {
            this.defaultRows.push(this.getRandomRowPattern());
        }

    },

    moveBubblesDownWard: function(movementAmount) {
        //this.checkTopBubbleRowPostion(this.totalGeneratedRow[0][0], movementAmount);
        for (var iteration = 0; iteration < this.totalGeneratedRow[0].length; iteration++) {
            var bubble = this.totalGeneratedRow[0][iteration];
            if (bubble != null) {
                this.checkTopBubbleRowPostion(bubble, movementAmount);
                break;
            }
        }
        for (var i = 0; i < this.totalGeneratedRow.length; i++) {
            for (var j = 0; j < this.totalGeneratedRow[i].length; j++) {
                var bubble = this.totalGeneratedRow[i][j];
                if (bubble != null) {
                    var nextPosition = bubble.position.y - movementAmount;
                    bubble.position = new cc.Vec2(bubble.position.x, nextPosition);
                }
            }
        }
        for (var itr = 0; itr < this.totalGeneratedRow[this.totalGeneratedRow.length - 1].length; itr++) {
            var bubble = this.totalGeneratedRow[this.totalGeneratedRow.length - 1][itr];
            if (bubble != null) {
                this.checkBottomBubbleRowPosition(bubble);
                break;
            }
        }
    },

    checkTopBubbleRowPostion: function(bubble, movementAmount) {

        var nextExpectedBubbleYPos = bubble.position.y - movementAmount;
        // if (nextExpectedBubbleYPos <= ((this.canvasNode.height + this.yOffset) + this.bubbleRadius / 2) ) {
        //     var defaultYPos = (nextExpectedBubbleYPos + this.bubbleRadius) - this.yOffset;
        //     this.createBubbles(this.getRandomRowPattern(), defaultYPos);
        // }

        if (nextExpectedBubbleYPos <= (this.defaultBubbleYPosition - this.bubbleRadius / 2)) {
            var defaultYPos = (nextExpectedBubbleYPos + this.bubbleRadius) - this.yOffset;
            this.createBubbles(this.getRandomRowPattern(), defaultYPos);
        }

    },

    fallAllBubbles:function() {
        /*for (var itr = 0; itr < this.totalGeneratedRow.length; itr++) {
            for (var i = 0; i < this.totalGeneratedRow[itr].length; i++) {
                var bubble = this.totalGeneratedRow[itr][i];
                if (bubble != null) {
                    var bubbleComponent = bubble.getComponent("Bubble");
                    bubbleComponent.isFreeFallBubbble = true;
                    bubbleComponent.disableBubble();
                }
            }
        }*/
        this.gameManagerComponent.gameOver();
    },

    checkBottomBubbleRowPosition: function(bubble) {

        if (bubble.position.y < (this.canvasNode.height / 3.3) && !this.gameManagerComponent.isGameOver && !this.gameManagerComponent.isPaused) {
            this.fallAllBubbles();
        } else if (bubble.position.y < this.canvasNode.height / 2.5 && !this.gameManagerComponent.isGameOver && !this.gameManagerComponent.isPaused) {
            // this.gameManagerComponent.dangerLine.color = new cc.color(255,0,0);
            // if(!this.gameManagerComponent.dangerLine.isEnterToRedLine){
            //     this.gameManagerComponent.dangerLine.isEnterToRedLine = true;
            //     this.gameManagerComponent.dangerLine.getComponent(cc.Animation).play('danger_line_animation');
            // }  
            if (!this.gameManagerComponent.systemBackPressed) {
                this.SoundManagerComponent.PlayDangerLineRemainderSound();
            }
        } else if (bubble.position.y < this.canvasNode.height / 2 && !this.gameManagerComponent.isGameOver && !this.gameManagerComponent.isPaused) {
            // this.gameManagerComponent.dangerLine.color = new cc.color(255,255,0);
            // if(!this.gameManagerComponent.dangerLine.isEnterToYellowLine){
            //     this.gameManagerComponent.dangerLine.isEnterToYellowLine = true;
            //     this.gameManagerComponent.dangerLine.getComponent(cc.Animation).play('danger_line_animation');
            // }     
            this.SoundManagerComponent.StopDangerLineOverRemainderSound();
        } else {
            // this.gameManagerComponent.dangerLine.color = new cc.color(255,255,255);
            // this.gameManagerComponent.dangerLine.getComponent(cc.Animation).stop('danger_line_animation');
            // this.gameManagerComponent.dangerLine.height = 4;
            // this.gameManagerComponent.dangerLine.isEnterToYellowLine = false;
            // this.gameManagerComponent.dangerLine.isEnterToRedLine = false;
            this.SoundManagerComponent.StopDangerLineOverRemainderSound();
        }

    },



    getRandomRowPattern: function() {
        /*var allPattern = [
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ];*/
        var allPattern = [
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        // var allPattern = [
        //     [1, 1, 1, 0, 0, 0, 0, 0],
        //     [1, 1, 1, 0, 0, 0, 0, 0],
        //     [1, 1, 1, 0, 0, 0, 0, 0],
        //     [1, 1, 1, 0, 0, 0, 0, 0],
        //     [1, 1, 1, 0, 0, 0, 0, 0],
        //     [1, 1, 1, 0, 0, 0, 0, 0],
        //     [1, 1, 1, 0, 0, 0, 0, 0]
        // ];

        return allPattern[parseInt(Math.random() * 7 + 0)];
    },

    getDefaultPattern: function() {
        var allPattern = [
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        /*var allPattern = [
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ];*/

        /*var allPattern = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ];*/

        return allPattern;
    },


});