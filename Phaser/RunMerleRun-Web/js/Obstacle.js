var maxObstacles = 10;
var obstaclesArray = [null, null, null, null, null, null];
var isBlockShift = true;
var index;
var createObstacleInterval;

var Obstacle = {

    GetAvailableIndexForObstacle: function () {
        for (i = 0; i < maxObstacles; i++) {
            if ((obstaclesArray[i] == null)) {
                return i;
            }
        }
        return -1;
    },

    CreateObstacle: function () {
        if (isGameRunning && !isBlockShift) {
            var randomObstacles = Utils.getRandomNumber(1, 3);
            index = Obstacle.GetAvailableIndexForObstacle();
            if (index != -1) {
                obstaclesArray[index] = Utils.SpriteSettingsControl(obstaclesArray[index], 1350.0, 460.0, 'obstacle_' + Utils.getZeroPaddedString(randomObstacles), "true", "true", 0.5, 1, 1, 1);
                obstaclesArray[index].name = 'obstacle';

                game.physics.p2.enable([obstaclesArray[index]]);
                obstaclesArray[index].body.static = true;
                obstaclesArray[index].body.clearShapes();
                obstaclesArray[index].body.addRectangle(50, 90, 0, 15, 0);
                // obstaclesArray[index].body.debug = true;
            }

            var randomTimeInterval = Utils.getRandomNumber(2000, 3500);
            createObstacleInterval = setTimeout(Obstacle.CreateObstacle, randomTimeInterval);
        }
    },

    ShiftObstacle: function () {
        for (i = 0; i < maxObstacles; i++) {
            if (obstaclesArray[i] != null) {
                obstaclesArray[i].body.x -= speed;

                // if (!isBlockShift) {
                if (obstaclesArray[i].body.x < -100) {
                    obstaclesArray[i].destroy();
                    obstaclesArray[i] = null;
                }
                // }
            }
        }
        if (!isBlockShift) {
            if (Database.LoadData("is_jump_hint_shown") == "0") {
                for (var i = 0; i < obstaclesArray.length; i++) {
                    if (obstaclesArray[i] != null) {
                        if (obstaclesArray[i].name == 'obstacle' && obstaclesArray[i].body.x < 500) {
                            isGameRunning = false;
                            Character.StopCharacterWalkAnimation();
                            SoundManager.StopCharacterSound();
                            Tutorial.ShowJumpHint();
                        }
                    }
                }
            }
        }
    },

    DestroyObstacle: function () {
        clearTimeout(createObstacleInterval);
        for (i = 0; i < maxObstacles; i++) {
            if (obstaclesArray[i] != null) {
                obstaclesArray[i].destroy();
                obstaclesArray[i] = null;
            }
        }
    },


}