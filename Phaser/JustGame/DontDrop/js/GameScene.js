import GameOverPopup from "../js/popups/GameOverPopup.js";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    init() {
        this.gameOverPopup = new GameOverPopup(this);
    }
    preload() {}

    create() {
        this.score = 0;
        this.isTouchStart = false;
        this.isGameOver = false;

        this.life = 0;
        this.lifeArray = [];
        this.isCollide = false;

        this.whiteBallArray = [];
        this.ballCounter = 0;
        this.ballTimedEvent = null;

        this.obstacleArray = [];
        this.obstacleCounter = 0;
        this.obstacleTimedEvent = null;

        this.CreateTopItem();

        this.CreatePlayer();
        this.CreateWhiteBall();
        this.CreateObstacle();

        this.CreateEndLine();

        this.CreateBallTimerEvent();
        this.CreateObstacleTimerEvent();

        this.CreateUserInput();

        for (var i = 0; i < this.whiteBallArray.length; i++) {
            this.physics.add.collider(this.player, this.whiteBallArray[i]);
        }

        for (var j = 0; j < this.obstacleArray.length; j++) {
            this.physics.add.collider(this.player, this.obstacleArray[j]);
        }

        this.CollisionCheckWithBall();
        this.CollisionCheckWithObstacle();

        SoundManager.PlayBgMusic();
    }

    CreateTopItem() {
        this.gameplayBg = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "gameplay_bg", 0.5, 0.5, scaleFactor, scaleFactor);

        // var scoreHeadingText = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 17), "score_heading", 0.5, 0.5, scaleFactor, scaleFactor);
        // scoreHeadingText.depth = 1

        var scoreTextStyle = { fontFamily: 'Poppins_Bold', fontSize: '84px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.scoreText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 20), this.score, scoreTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);
        this.scoreText.depth = 1

        this.backButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 14), Math.round(game.config.height / 20), "back_button", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.BackButtonPressed, this.BackButtonReleased);
        this.backButton.depth = 1

        this.soundButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 1.077), Math.round(game.config.height / 20), "sound_on", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.SoundButtonPressed, this.SoundButtonReleased);
        this.soundButton.depth = 1

        this.DefaultSoundButton();

        this.CreateLife();
    }

    CreateLife() {
        for (var i = 0; i < 3; i++) {
            var heart = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 14), Math.round(game.config.height / 7) + (i * Math.round(game.config.height / 22)), "heart", 0.5, 0.5, scaleFactor, scaleFactor);
            this.lifeArray.push(heart);
        }
    }

    BackButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.backButton, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }
    BackButtonReleased() {
        setTimeout(() => {
            game.scene.stop('GameScene');
            game.scene.start('TitleScene');
            SoundManager.StopBgMusic();
        }, 100);
    }

    SoundButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.soundButton, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }
    SoundButtonReleased() {
        this.ToggleSoundButton();
    }

    DefaultSoundButton() {
        if (localStorage.getItem("dont_drop_is_sound_on") == null) {
            localStorage.setItem("dont_drop_is_sound_on", 1);
        }
        if (localStorage.getItem("dont_drop_is_sound_on") == 1) {
            this.soundButton.setTexture("sound_on");
        } else {
            this.soundButton.setTexture("sound_off");
        }
    }
    ToggleSoundButton() {
        if (localStorage.getItem("dont_drop_is_sound_on") == 1) {
            localStorage.setItem("dont_drop_is_sound_on", 0);
            this.soundButton.setTexture("sound_off");
            SoundManager.PlayButtonClickSound();
            SoundManager.StopBgMusic();
        } else {
            localStorage.setItem("dont_drop_is_sound_on", 1);
            this.soundButton.setTexture("sound_on");
            SoundManager.PlayBgMusic();
        }
    }

    //######################################################################################
    CreateUserInput() {
        this.gameplayBg.setInteractive();
        this.gameplayBg.on('pointerdown', function(pointer) {
            var touchX = pointer.x;
            var touchY = pointer.y;
            this.isTouchStart = true;
        });

        this.gameplayBg.on('pointerup', function(pointer) {
            var touchX = pointer.x;
            var touchY = pointer.y;
            this.isTouchStart = false;
        });

        this.gameplayBg.on('pointermove', function(pointer) {
            if (this.isTouchStart && !this.isGameOver) {
                var touchX = pointer.x;
                var touchY = pointer.y;
                if (touchX > Math.round(this.scene.player.width / 2) && touchX < game.config.width - Math.round(this.scene.player.width / 2)) {
                    this.scene.player.x = touchX;
                }
            }
        });
    }

    GetRandomNumber(_min, _max) {
        var rnd = Math.floor(Math.random() * (_max - _min) + _min);
        return rnd;
    }

    CreateBallTimerEvent() {
        this.ballTimedEvent = this.time.addEvent({
            delay: this.score > 10 ? this.GetRandomNumber(500, 700) : this.GetRandomNumber(800, 1200),
            callback: this.SetRandomPositionOfBall,
            callbackScope: this,
            loop: true
        });
    }

    CreateObstacleTimerEvent() {
        this.obstacleTimedEvent = this.time.addEvent({
            delay: this.GetRandomNumber(5000, 10000),
            callback: this.SetRandomPositionOfObstacle,
            callbackScope: this,
            loop: true
        });
    }


    //######################################################################################
    CreatePlayer() {
        this.player = this.physics.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 1.3), "player").setScale(scaleFactor, scaleFactor);
        this.player.depth = 1
        this.player.setSize(440, 150, 10);
    }

    CreateWhiteBall() {
        for (var i = 0; i < 30; i++) {
            var randomNum = this.GetRandomNumber(0, 4);
            var ball = this.physics.add.sprite(0, 0, "fruit_" + randomNum).setScale(scaleFactor, scaleFactor);
            ball.setVisible(false);
            this.whiteBallArray.push(ball);
        }
    }

    SetRandomPositionOfBall() {
        if (!this.isGameOver) {
            this.isCollide = false;
            var randomXPos = this.GetRandomNumber(Math.round(game.config.width / 15.5), Math.round(game.config.width / 1.069)); //70,1010
            var randomYPos = this.GetRandomNumber(-150, 0);
            if (this.score > 10) {
                var randomSpeed = this.GetRandomNumber(600, 1000);
            } else {
                var randomSpeed = this.GetRandomNumber(1200, 1700);
            }

            if (this.ballCounter < this.whiteBallArray.length) {
                this.whiteBallArray[this.ballCounter].setVisible(true);
                this.whiteBallArray[this.ballCounter].enableBody(true, true);
                this.whiteBallArray[this.ballCounter].x = randomXPos;
                this.whiteBallArray[this.ballCounter].y = randomYPos;
                this.MoveBall(this.whiteBallArray[this.ballCounter], randomSpeed);
                this.ballCounter++;
            } else {
                this.ballCounter = 0;
            }
        }
    }

    MoveBall(_ball, _speed) {
        this.tweens.add({
            targets: [_ball],
            y: game.config.height + _ball.height,
            rotation: 5,
            duration: _speed,
            callbackScope: this,
            onComplete: function(tween) {}
        });
    }

    //######################################################################################

    //######################################################################################
    CreateObstacle() {
        for (var i = 0; i < 10; i++) {
            var obstacle = this.physics.add.sprite(0, 0, "bomb").setScale(scaleFactor, scaleFactor);
            obstacle.setVisible(false);
            this.obstacleArray.push(obstacle);
        }
    }
    SetRandomPositionOfObstacle() {
        var randomXPos = this.GetRandomNumber(Math.round(game.config.width / 15.5), Math.round(game.config.width / 1.069)); //70,1010
        var randomYPos = this.GetRandomNumber(-200, 0);
        if (this.score > 10) {
            var randomSpeed = this.GetRandomNumber(900, 1300);
        } else {
            var randomSpeed = this.GetRandomNumber(1200, 1800);
        }

        if (this.obstacleCounter < this.obstacleArray.length) {
            this.obstacleArray[this.obstacleCounter].setVisible(true);
            this.obstacleArray[this.obstacleCounter].enableBody(true, true);
            this.obstacleArray[this.obstacleCounter].x = randomXPos;
            this.obstacleArray[this.obstacleCounter].y = randomYPos;
            this.MoveObstacle(this.obstacleArray[this.obstacleCounter], randomSpeed);
            this.obstacleCounter++;
        } else {
            this.obstacleCounter = 0;
        }
    }

    MoveObstacle(_obstacle, _speed) {
        this.tweens.add({
            targets: [_obstacle],
            y: game.config.height + _obstacle.height,
            rotation: 5,
            duration: _speed,
            callbackScope: this,
            onComplete: function(tween) {}
        });
    }

    //######################################################################################

    //######################################################################################
    CollisionCheckWithBall() {
        for (var i = 0; i < this.whiteBallArray.length; i++) {
            this.physics.add.overlap(this.player, this.whiteBallArray[i], this.CollectBall, null, this);
            // this.physics.add.overlap(this.endLine, this.whiteBallArray[i], this.GameOver, null, this);
            this.physics.add.overlap(this.endLine, this.whiteBallArray[i], this.DecreaseLife, null, this);
        }
    }

    CollectBall(_player, _ball) {
        if (!this.isGameOver) {
            // console.log("collect ball");
            SoundManager.PlayBallCollectSound();
            _ball.disableBody(true, true);
            _ball.visible = false;
            this.IncrementScore();
        }

    }

    //######################################################################################

    CollisionCheckWithObstacle() {
        for (var i = 0; i < this.obstacleArray.length; i++) {
            this.physics.add.overlap(this.player, this.obstacleArray[i], this.GameOver, null, this);
            this.physics.add.overlap(this.endLine, this.obstacleArray[i], this.HideObstacle, null, this);
        }
    }

    HideObstacle(_endLine, _obstacle) {
        if (!this.isGameOver) {
            // console.log("hide obs");
            _obstacle.disableBody(true, true);
            _obstacle.visible = false;
        }
    }


    //######################################################################################
    IncrementScore() {
        this.score++;
        this.scoreText.text = this.score;
    }

    //######################################################################################

    //######################################################################################
    CreateEndLine() {
        this.endLine = this.physics.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 1), "one_pixel_white").setOrigin(0.5, 0.5).setScale(game.config.width * scaleFactor, 2 * scaleFactor);
    }

    DecreaseLife(_endline, _ball, _bool, _this) {
        if (!this.isCollide) {
            this.isCollide = true;
            this.lifeArray[this.life].destroy();
            this.life++;
            // console.log("life: " + this.life);
            if (this.life > 2) {
                this.GameOverFromLife(_endline, _ball);
            }
        }
    }

    GameOverFromLife(_endline, _ball) {
        if (!this.isGameOver) {
            SoundManager.PlayObstacleCollideSound();
            _ball.disableBody(true, true);
            _ball.visible = false;
            this.isGameOver = true;
            this.gameplayBg.disableInteractive();
            this.ballTimedEvent.remove();
            this.obstacleTimedEvent.remove();
            setTimeout(() => {
                SoundManager.StopBgMusic();
                this.gameOverPopup.CreateGameOverPopup(this.score);
            }, 200);
        }
    }

    GameOver(_endline, _item) {
        if (!this.isGameOver) {
            // console.log("game over _item: ", _item);
            SoundManager.PlayObstacleCollideSound();

            _item.disableBody(true, true);
            _item.visible = false;
            this.isGameOver = true;
            this.gameplayBg.disableInteractive();
            this.ballTimedEvent.remove();
            this.obstacleTimedEvent.remove();
            setTimeout(() => {
                SoundManager.StopBgMusic();
                this.gameOverPopup.CreateGameOverPopup(this.score);
            }, 200);
        }
    }

    //########################################################################################

    update(t, dt) {}


}