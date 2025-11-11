import GameOverPopup from "../js/popups/GameOverPopup.js";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
        this.gameOverPopup = null;
        this.leftSide = false;
        this.isGameOver = false;
        this.score = 0;
        this.ball = null;
        this.enemyGroup = null;
    }

    init() {
        this.gameOverPopup = new GameOverPopup(this);
    };
    preload() {}

    create() {
        this.leftSide = false;
        this.isGameOver = false;
        this.score = 0;
        this.flyPosX = [100, 350, 700, 950, 150, 400, 750, 1000, 100, 350, 700, 950, 150, 400, 750, 1000, 90, 95, 90, 95, 1010, 1015, 1010, 1015];
        this.flyPosY = [100, 100, 100, 100, 300, 300, 300, 300, 1600, 1600, 1600, 1600, 1800, 1800, 1800, 1800, 550, 800, 1050, 1350, 550, 800, 1050, 1350];
        this.fireFlyArray = [];

        this.CreateFireFly();

        this.GenerateTextureAsset();

        this.CreateUpperCircle();
        this.CreateLowerCircle();
        this.CreateBall();
        this.ControllBallSpeed();

        this.enemyGroup = this.add.group();

        this.CreateScore();
    }

    CreateFireFly() {
        for (var i = 0; i < this.flyPosX.length; i++) {
            var fly = this.add.sprite(this.flyPosX[i], this.flyPosY[i], 'fireFly').setOrigin(0.5, 0.5);
            this.anims.create({
                key: 'fireFlyAnimation',
                frames: this.anims.generateFrameNumbers('fireFly', {
                    start: 0,
                    end: 23
                }),
                frameRate: 8,
                repeat: -1
            });

            fly.play('fireFlyAnimation');
            this.fireFlyArray.push(fly);
        }
    }

    //Show the score part
    CreateScore() {
        var scoreHeadingTextStyle = { fontFamily: 'Bahnschrift', fontSize: '56px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.scoreHeadingText = this.add.text(Math.round(game.config.width / 2.3), Math.round(game.config.height / 12), "SCORE  : ", scoreHeadingTextStyle).setOrigin(0.5, 0.5);

        var scoreTextStyle = { fontFamily: 'Bahnschrift', fontSize: '65px', fill: '#fff', fontStyle: 'bold', align: 'left' };
        this.scoreText = this.add.text(Math.round(game.config.width / 1.75), Math.round(game.config.height / 12), this.score, scoreTextStyle).setOrigin(0.5, 0.5);
    }

    //Generate the assets for the circle,ball
    GenerateTextureAsset() {
        let actualSize = gameOptions.circleRadius + gameOptions.circleStrokeWidth;
        let assetsGraphics = this.make.graphics();
        //Circle
        assetsGraphics.lineStyle(gameOptions.circleStrokeWidth, 0xffffff);
        assetsGraphics.strokeCircle(actualSize, actualSize, gameOptions.circleRadius);
        assetsGraphics.generateTexture("circle", 2 * actualSize, 2 * actualSize);
        //ball
        assetsGraphics.clear();
        assetsGraphics.fillStyle(0x00ff00);
        assetsGraphics.fillCircle(gameOptions.ballRadius, gameOptions.ballRadius, gameOptions.ballRadius);
        assetsGraphics.generateTexture("ball", 2 * gameOptions.ballRadius, 2 * gameOptions.ballRadius);
        //enemyBall
        assetsGraphics.clear();
        assetsGraphics.fillStyle(0xff0000);
        assetsGraphics.fillCircle(gameOptions.ballRadius, gameOptions.ballRadius, gameOptions.ballRadius);
        assetsGraphics.generateTexture("enemyball", 2 * gameOptions.ballRadius, 2 * gameOptions.ballRadius);
    }

    //Create up circle
    CreateUpperCircle() {
        this.upperCircle = this.add.sprite(game.config.width / 2, game.config.height / 2 - gameOptions.circleDistance / 2, "circle");
    }

    //Create down circle
    CreateLowerCircle() {
        this.lowerCircle = this.add.sprite(game.config.width / 2, game.config.height / 2 + gameOptions.circleDistance / 2, "circle");
    }

    //Create the ball
    CreateBall() {
        this.ball = this.add.sprite(this.upperCircle.x, this.upperCircle.y - gameOptions.circleRadius, "ball");
        this.ball.radians = -Math.PI / 2;
        this.ball.speed = gameOptions.ballSpeed[1];
    }

    //When press and hold the speed of the ball will be 0
    ControllBallSpeed() {
        this.input.on("pointerdown", function() {
            this.ball.speed = gameOptions.ballSpeed[0];
        }, this);
        this.input.on("pointerup", function() {
            this.ball.speed = gameOptions.ballSpeed[1];
        }, this);
    }

    //Move the ball
    MoveBall(_dt) {
        this.ball.radians += this.ball.speed * _dt / 1000;
        this.ball.x = this.upperCircle.x + gameOptions.circleRadius * Math.cos(this.ball.radians);
        this.ball.y = this.upperCircle.y + gameOptions.circleRadius * Math.sin(this.ball.radians);
    }

    //Create enemy ball
    CreateEnemyBall() {
        let previousLeftSide = this.leftSide;
        this.leftSide = this.ball.x < game.config.width / 2;
        if (previousLeftSide && !this.leftSide) {
            let randomAngle = Phaser.Math.FloatBetween(0, Math.PI * 2);
            let randomSpeed = Phaser.Math.FloatBetween(gameOptions.enemySpeedRange[0], gameOptions.enemySpeedRange[1]);
            let enemy = this.add.sprite(this.lowerCircle.x + gameOptions.circleRadius * Math.cos(randomAngle), this.lowerCircle.y + gameOptions.circleRadius * Math.sin(randomAngle), "enemyball");
            enemy.speed = randomSpeed;
            enemy.radians = randomAngle;
            this.enemyGroup.add(enemy);

            this.score++;
            this.scoreText.setText(this.score);
        }
    }

    //Move the enemy ball
    MoveEnemyBall(_dt) {
        this.enemyGroup.children.iterate(function(enemy) {
            enemy.radians += enemy.speed * _dt / 1000;
            enemy.x = this.lowerCircle.x + gameOptions.circleRadius * Math.cos(enemy.radians);
            enemy.y = this.lowerCircle.y + gameOptions.circleRadius * Math.sin(enemy.radians);
        }, this);
    }

    //When touch ball with enemy ball
    CheckCollisionWithEnemy() {
        this.enemyGroup.children.iterate(function(enemy) {
            if (Phaser.Math.Distance.Between(this.ball.x, this.ball.y, enemy.x, enemy.y) < gameOptions.ballRadius * 2) {
                this.isGameOver = true;
                this.ball.speed = 0;
                this.cameras.main.shake(300);
                for (var i = 0; i < this.fireFlyArray.length; i++) {
                    this.fireFlyArray[i].stop('fireFlyAnimation');
                }
                setTimeout(() => {
                    this.gameOverPopup.CreateGameOverPopup(this.score);
                }, 500);
            }
        }, this);
    }

    update(t, dt) {
        if (!this.isGameOver) {
            this.MoveBall(dt);
            this.CreateEnemyBall();
            this.MoveEnemyBall(dt);
            this.CheckCollisionWithEnemy();
        }
    }


}